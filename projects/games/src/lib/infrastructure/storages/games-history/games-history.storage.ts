import { BehaviorSubject, map, Observable, take, tap } from 'rxjs';
import { GameHistory } from './game-history.model';

export class GamesHistoryStorage {
  private readonly gameHistorySubject: BehaviorSubject<GameHistory[]> = new BehaviorSubject<GameHistory[]>([]);

  readonly gameHistory$: Observable<GameHistory[]> = this.gameHistorySubject.asObservable();

  addResult(result: GameHistory): Observable<GameHistory> {
    return this.gameHistory$.pipe(
      take(1),
      tap((actual: GameHistory[]) => this.gameHistorySubject.next([...actual, result])),
      map(() => result)
    );
  }

  clearHistory(): void {
    this.gameHistorySubject.next([]);
  }
}
