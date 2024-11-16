import { GameHistory, GamesHistoryStorage } from '../../../infrastructure/storages';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GameHistoryModel, TotalWinModel } from '../../models/game-history.model';

const historyMock = [
  { playerOneScore: 12, playerTwoScore: 23 },
  { playerOneScore: 677, playerTwoScore: 333 },
  { playerOneScore: 12, playerTwoScore: 23 },
  { playerOneScore: 677, playerTwoScore: 333 },
  { playerOneScore: 12, playerTwoScore: 23 },
  { playerOneScore: 677, playerTwoScore: 333 },
  { playerOneScore: 12, playerTwoScore: 23 },
  { playerOneScore: 12, playerTwoScore: 23 },
  { playerOneScore: 677, playerTwoScore: 333 },
  { playerOneScore: 12, playerTwoScore: 23 },
  { playerOneScore: 677, playerTwoScore: 333 },
  { playerOneScore: 12, playerTwoScore: 23 },
  { playerOneScore: 677, playerTwoScore: 333 },
  { playerOneScore: 12, playerTwoScore: 23 },
  { playerOneScore: 12, playerTwoScore: 23 },
  { playerOneScore: 12, playerTwoScore: 23 },
  { playerOneScore: 12, playerTwoScore: 23 },
  { playerOneScore: 12, playerTwoScore: 23 }
];

export class GetGamesHistoryQueryHandler {
  private readonly gamesHistoryStorage: GamesHistoryStorage = inject(GamesHistoryStorage);

  history(): Observable<GameHistoryModel> {
    return this.gamesHistoryStorage.gameHistory$.pipe(
      map(() => historyMock),
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
