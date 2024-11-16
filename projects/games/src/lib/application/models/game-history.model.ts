import { GameHistory } from '../../infrastructure/storages';

export interface TotalWinModel {
  readonly playerOneTotalWin: number;
  readonly playerTwoTotalWin: number;
}

export interface GameHistoryModel {
  readonly games: GameHistory[];
  readonly totalWin: TotalWinModel;
}
