import {
  CurrentGameStorage,
  PlayerData,
} from '../../../infrastructure/storages';
import { inject } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

export class IsShowWinnerActiveQueryHandler {
  private readonly currentGameStorage: CurrentGameStorage =
    inject(CurrentGameStorage);

  isShowWinnerActive(): Observable<boolean> {
    return combineLatest([
      this.currentGameStorage.playerOne$,
      this.currentGameStorage.playerTwo$,
    ]).pipe(
      map(([playerOne, playerTwo]: [PlayerData, PlayerData]) => {
        const isPlayerComplete = (player: PlayerData): boolean => {
          return !!player.weight && !!player.height && !!player.crew;
        };

        return isPlayerComplete(playerOne) && isPlayerComplete(playerTwo);
      })
    );
  }
}
