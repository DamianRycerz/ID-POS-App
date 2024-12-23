import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { PlayerData } from './player-data.model';
import { PlayerEnum } from '@core';

const INIT_STATE: PlayerData = {
  weight: 0,
  height: 0,
  crew: 0
};

export class CurrentGameStorage {
  private readonly playerOneSubject: BehaviorSubject<PlayerData> = new BehaviorSubject<PlayerData>(INIT_STATE);
  private readonly playerTwoSubject: BehaviorSubject<PlayerData> = new BehaviorSubject<PlayerData>(INIT_STATE);

  readonly playerOne$: Observable<PlayerData> = this.playerOneSubject.asObservable();
  readonly playerTwo$: Observable<PlayerData> = this.playerTwoSubject.asObservable();

  patchPlayerResult(data: Partial<PlayerData>, selectedPLayer: PlayerEnum) {
    const selectedSubject: Record<PlayerEnum, BehaviorSubject<PlayerData>> = {
      [PlayerEnum.PLAYER_ONE]: this.playerOneSubject,
      [PlayerEnum.PLAYER_TWO]: this.playerTwoSubject
    };

    const actualValues: PlayerData = selectedSubject[selectedPLayer].value;

    return selectedSubject[selectedPLayer].asObservable().pipe(
      take(1),
      tap(() => selectedSubject[selectedPLayer].next({ ...actualValues, ...data }))
    );
  }

  clear(): void {
    this.playerOneSubject.next(INIT_STATE);
    this.playerTwoSubject.next(INIT_STATE);
  }
}
