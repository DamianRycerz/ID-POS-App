import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { PlayerData } from './player-data.model';

const INIT_STATE: PlayerData = {
  weight: 0,
  height: 0,
  crew: 0,
};

export class CurrentGameStorage {
  private readonly playerOneSubject: BehaviorSubject<PlayerData> =
    new BehaviorSubject<PlayerData>(INIT_STATE);
  private readonly playerTwoSubject: BehaviorSubject<PlayerData> =
    new BehaviorSubject<PlayerData>(INIT_STATE);

  readonly playerOne$: Observable<PlayerData> =
    this.playerOneSubject.asObservable();
  readonly playerTwo$: Observable<PlayerData> =
    this.playerOneSubject.asObservable();

  constructor() {
    this.playerOne$.subscribe((x) => console.log(x));
    this.playerTwo$.subscribe((x) => console.log(x));
  }

  patchPlayerResult(data: Partial<PlayerData>, selectedPLayer: PlayerEnum) {
    const selectedSubject: Record<PlayerEnum, BehaviorSubject<PlayerData>> = {
      [PlayerEnum.PLAYER_ONE]: this.playerOneSubject,
      [PlayerEnum.PLAYER_TWO]: this.playerTwoSubject,
    };

    const actualValues: PlayerData = selectedSubject[selectedPLayer].value;

    return of(void 0).pipe(
      tap(() =>
        selectedSubject[selectedPLayer].next({ ...actualValues, ...data })
      )
    );
  }
}

enum PlayerEnum {
  PLAYER_ONE = 'PLAYER_ONE',
  PLAYER_TWO = 'PLAYER_TWO',
}