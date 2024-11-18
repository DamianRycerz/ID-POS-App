import { EXPORT_TO_FILE, ExportToFileProvider } from '@core';
import { inject } from '@angular/core';
import { GameHistory, GamesHistoryStorage } from '../../../infrastructure/storages';
import { map, Observable, take, tap } from 'rxjs';

export class ExportGamesHistoryCommandHandler {
  private readonly exportToFileProvider: ExportToFileProvider = inject(EXPORT_TO_FILE);
  private readonly gamesHistoryStorage: GamesHistoryStorage = inject(GamesHistoryStorage);

  export(): Observable<void> {
    return this.gamesHistoryStorage.gameHistory$.pipe(
      take(1),
      tap((games: GameHistory[]) => {
        const headers: string[] = ['Player 1 Points', 'Player 2 Points'];
        const rows: number[][] = games.map((game: GameHistory) => [game.playerOneScore, game.playerTwoScore]);
        const fileName: string = 'game-history.csv';

        return this.exportToFileProvider.exportToCSV(headers, rows, fileName);
      }),
      map(() => void 0)
    );
  }
}
