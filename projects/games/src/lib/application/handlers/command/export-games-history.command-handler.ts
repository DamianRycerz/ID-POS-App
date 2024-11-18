import { EXPORT_TO_FILE, ExportToFileProvider } from '@core';
import { inject } from '@angular/core';
import { GameHistory, GamesHistoryStorage } from '../../../infrastructure/storages';
import { map, Observable, tap } from 'rxjs';

export class ExportGamesHistoryCommandHandler {
  private readonly exportToFileProvider: ExportToFileProvider = inject(EXPORT_TO_FILE);
  private readonly gamesHistoryStorage: GamesHistoryStorage = inject(GamesHistoryStorage);

  export(): Observable<void> {
    return this.gamesHistoryStorage.gameHistory$.pipe(
      tap((games: GameHistory[]) => {
        const headers = ['Player 1 Points', 'Player 2 Points'];
        const rows = games.map((game) => [game.playerOneScore, game.playerTwoScore]);
        const fileName = 'game-history.csv';

        return this.exportToFileProvider.exportToCSV(headers, rows, fileName);
      }),
      map(() => void 0)
    );
  }
}
