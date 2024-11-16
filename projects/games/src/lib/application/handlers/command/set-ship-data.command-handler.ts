import {
  ShipDTO,
  ShipsHttpService,
} from '../../../infrastructure/http-services';
import { inject } from '@angular/core';
import { CurrentGameStorage } from '../../../infrastructure/storages';
import { EMPTY, of, switchMap } from 'rxjs';
import { PlayerEnum } from '@core';

export class SetShipDataCommandHandler {
  private readonly shipsHttpService: ShipsHttpService =
    inject(ShipsHttpService);
  private readonly currentGameStorage: CurrentGameStorage =
    inject(CurrentGameStorage);

  setShipData(selectedPlayer: PlayerEnum) {
    const randomId: number = Math.floor(Math.random() * 100);

    return this.shipsHttpService.getShipData(randomId).pipe(
      switchMap((ship: ShipDTO) => {
        const crew: number = +ship.result.properties.crew;

        if (!crew) {
          console.error('NA STATKU NIE MA ZALOGI! Sprobuj jeszcze raz');
          return EMPTY;
        }

        return of(crew);
      }),
      switchMap((crew: number) =>
        this.currentGameStorage.patchPlayerResult({ crew }, selectedPlayer)
      )
    );
  }
}
