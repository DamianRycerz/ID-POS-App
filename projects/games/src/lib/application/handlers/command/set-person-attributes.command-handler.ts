import { PeopleHttpService, PersonDTO } from '../../../infrastructure/http-services';
import { inject } from '@angular/core';
import { CurrentGameStorage } from '../../../infrastructure/storages';
import { EMPTY, map, Observable, of, switchMap } from 'rxjs';
import { ErrorModalComponent, MODAL_TOKEN, ModalProvider, PlayerEnum } from '@core';
import { PersonAttributesModel } from '../../models';

export class SetPersonAttributesCommandHandler {
  private readonly peopleHttpService: PeopleHttpService = inject(PeopleHttpService);
  private readonly currentGameStorage: CurrentGameStorage = inject(CurrentGameStorage);
  private readonly modalProvider: ModalProvider = inject(MODAL_TOKEN);

  setAttributes(selectedPlayer: PlayerEnum): Observable<void> {
    const randomId: number = Math.floor(Math.random() * 100);

    return this.peopleHttpService.getPerson(randomId).pipe(
      map((person: PersonDTO) => this.mapToPlayerData(person)),
      switchMap((data: PersonAttributesModel) => {
        if (!data.weight || !data.height) return this.errorMessage();

        return of(data);
      }),
      switchMap((data: PersonAttributesModel) => this.currentGameStorage.patchPlayerResult(data, selectedPlayer)),
      map(() => void 0)
    );
  }

  private mapToPlayerData(person: PersonDTO): PersonAttributesModel {
    return {
      weight: +person.result.properties.mass,
      height: +person.result.properties.height
    };
  }

  private errorMessage(): Observable<never> {
    return this.modalProvider
      .showModal({
        component: ErrorModalComponent,
        cssClass: 'present-modal',
        componentProps: { errorMessage: 'Twoja postać jest niekompletna. Spróbuj jeszcze raz' }
      })
      .pipe(switchMap(() => EMPTY));
  }
}
