import { ShipDTO, ShipsHttpService } from '../../../infrastructure/http-services';
import { inject } from '@angular/core';
import { CurrentGameStorage } from '../../../infrastructure/storages';
import { EMPTY, map, Observable, of, switchMap } from 'rxjs';
import { ErrorModalComponent, MODAL_TOKEN, ModalProvider, PlayerEnum } from '@core';

export class SetShipDataCommandHandler {
  private readonly shipsHttpService: ShipsHttpService = inject(ShipsHttpService);
  private readonly currentGameStorage: CurrentGameStorage = inject(CurrentGameStorage);
  private readonly modalProvider: ModalProvider = inject(MODAL_TOKEN);

  setShipData(selectedPlayer: PlayerEnum): Observable<void> {
    const randomId: number = Math.floor(Math.random() * 100);

    return this.shipsHttpService.getShipData(randomId).pipe(
      switchMap((ship: ShipDTO) => {
        const crew: number = +ship.result.properties.crew;

        if (!crew) return this.errorMessage();

        return of(crew);
      }),
      switchMap((crew: number) => this.currentGameStorage.patchPlayerResult({ crew }, selectedPlayer)),
      map(() => void 0)
    );
  }

  private errorMessage(): Observable<never> {
    return this.modalProvider
      .showModal({
        component: ErrorModalComponent,
        cssClass: 'present-modal',
        componentProps: { errorMessage: 'Na statku nie ma załogi. Spróbuj jeszcze raz' }
      })
      .pipe(switchMap(() => EMPTY));
  }
}
