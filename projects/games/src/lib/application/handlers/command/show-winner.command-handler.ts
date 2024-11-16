import {
  CurrentGameStorage,
  GameHistory,
  GamesHistoryStorage,
  PlayerData,
} from '../../../infrastructure/storages';
import { inject } from '@angular/core';
import { combineLatest, map, Observable, switchMap, take, tap } from 'rxjs';

export class ShowWinnerCommandHandler {
  private readonly currentGameStorage: CurrentGameStorage =
    inject(CurrentGameStorage);
  private readonly gamesHistoryStorage: GamesHistoryStorage =
    inject(GamesHistoryStorage);

  show(): Observable<void> {
    return combineLatest([
      this.currentGameStorage.playerOne$,
      this.currentGameStorage.playerTwo$,
    ]).pipe(
      take(1),
      map(([playerOne, playerTwo]: [PlayerData, PlayerData]) => {
        return {
          plyerOne: this.calculatePoints(playerOne),
          playerTwo: this.calculatePoints(playerTwo),
        };
      }),
      switchMap((result: GameHistory) =>
        this.gamesHistoryStorage.addResult(result)
      ),
      tap(() => this.currentGameStorage.clear())
    );
  }

  private calculatePoints(player: PlayerData): number {
    return player.weight * player.height + player.crew;
  }
}
