import { PeopleHttpService, PersonDTO } from '../../../infrastructure/http-services';
import { inject } from '@angular/core';
import { CurrentGameStorage } from '../../../infrastructure/storages';
import { EMPTY, map, Observable, of, switchMap } from 'rxjs';
import { PlayerEnum } from '@core';
import { PersonAttributesModel } from '../../models';

export class SetPersonAttributesCommandHandler {
  private readonly peopleHttpService: PeopleHttpService = inject(PeopleHttpService);
  private readonly currentGameStorage: CurrentGameStorage = inject(CurrentGameStorage);

  setAttributes(selectedPlayer: PlayerEnum): Observable<void> {
    const randomId: number = Math.floor(Math.random() * 100);

    return this.peopleHttpService.getPerson(randomId).pipe(
      map((person: PersonDTO) => this.mapToPlayerData(person)),
      switchMap((data: PersonAttributesModel) => {
        if (!data.weight || !data.height) {
          // zakladam ze w zasadach gry 0 jest postacia niekompletna i nalezy powtorzyc losowanie
          console.error('TWOJA POSTAC JEST NIEKOMPLETNA');
          return EMPTY;
        }

        return of(data);
      }),
      switchMap((data: PersonAttributesModel) => this.currentGameStorage.patchPlayerResult(data, selectedPlayer)),
      map(() => void 0)
    );
  }

  private mapToPlayerData(person: PersonDTO) {
    return {
      weight: +person.result.properties.mass,
      height: +person.result.properties.height
    };
  }
}
