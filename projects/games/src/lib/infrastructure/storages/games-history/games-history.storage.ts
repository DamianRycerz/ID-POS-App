import { BehaviorSubject, map, Observable, take, tap } from 'rxjs';
import { GameHistory } from './game-history.model';

export class GamesHistoryStorage {
  private readonly gameHistorySubject: BehaviorSubject<GameHistory[]> = new BehaviorSubject<GameHistory[]>([]);

  readonly gameHistory$: Observable<GameHistory[]> = this.gameHistorySubject.asObservable();

  constructor() {
    this.gameHistory$.subscribe((x) => console.log(x));
  }

  addResult(result: GameHistory): Observable<void> {
    return this.gameHistory$.pipe(
      take(1),
      tap((actual) => this.gameHistorySubject.next([...actual, result])),
      map(() => void 0)
    );
  }

  clearHistory(): void {
    this.gameHistorySubject.next([]);
  }
}
