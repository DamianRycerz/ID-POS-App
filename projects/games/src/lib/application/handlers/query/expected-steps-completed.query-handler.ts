import { CurrentGameStorage, PlayerData } from '../../../infrastructure/storages';
import { inject } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { ExpectedStepsCompletedModel } from '../../models';

export class ExpectedStepsCompletedQueryHandler {
  private readonly currentGameStorage: CurrentGameStorage = inject(CurrentGameStorage);

  isCompleted(): Observable<ExpectedStepsCompletedModel> {
    return combineLatest([this.currentGameStorage.playerOne$, this.currentGameStorage.playerTwo$]).pipe(
      map(([playerOne, playerTwo]: [PlayerData, PlayerData]) => {
        return {
          playerOneAttributes: !!playerOne.weight && !!playerOne.height,
          playerTwoAttributes: !!playerTwo.weight && !!playerTwo.height,
          playerOneCrew: !!playerOne.crew,
          playerTwoCrew: !!playerTwo.crew
        };
      })
    );
  }
}
