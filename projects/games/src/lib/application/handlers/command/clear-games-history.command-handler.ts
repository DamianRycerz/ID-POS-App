import { GamesHistoryStorage } from '../../../infrastructure/storages';
import { inject } from '@angular/core';

export class ClearGamesHistoryCommandHandler {
  private readonly gamesHistoryStorage: GamesHistoryStorage = inject(GamesHistoryStorage);

  clear(): void {
    this.gamesHistoryStorage.clearHistory();
  }
}
