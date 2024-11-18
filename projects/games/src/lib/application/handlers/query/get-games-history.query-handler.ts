import { GameHistory, GamesHistoryStorage } from '../../../infrastructure/storages';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GameHistoryModel, TotalWinModel } from '../../models';

export class GetGamesHistoryQueryHandler {
  private readonly gamesHistoryStorage: GamesHistoryStorage = inject(GamesHistoryStorage);

  history(): Observable<GameHistoryModel> {
    return this.gamesHistoryStorage.gameHistory$.pipe(
      map((games: GameHistory[]) => {
        const { playerOneTotalWin, playerTwoTotalWin } = this.calculateTotalWin(games);

        return {
          games: games,
          totalWin: {
            playerOneTotalWin: playerOneTotalWin,
            playerTwoTotalWin: playerTwoTotalWin
          }
        };
      })
    );
  }

  private calculateTotalWin(games: GameHistory[]): TotalWinModel {
    const playerOneTotalWin: number = games.filter(
      (game: GameHistory) => game.playerOneScore > game.playerTwoScore
    ).length;

    const playerTwoTotalWin: number = games.filter(
      (game: GameHistory) => game.playerTwoScore > game.playerOneScore
    ).length;

    return { playerOneTotalWin, playerTwoTotalWin };
  }
}
