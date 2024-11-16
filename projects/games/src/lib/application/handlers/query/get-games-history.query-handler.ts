import {
  GameHistory,
  GamesHistoryStorage,
} from '../../../infrastructure/storages';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export class GetGamesHistoryQueryHandler {
  private readonly gamesHistoryStorage: GamesHistoryStorage =
    inject(GamesHistoryStorage);

  history(): Observable<GameHistory[]> {
    return this.gamesHistoryStorage.gameHistory$;
  }
}
