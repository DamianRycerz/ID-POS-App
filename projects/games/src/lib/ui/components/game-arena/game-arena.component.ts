import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  ExpectedStepsCompletedQueryHandler,
  IsShowWinnerActiveQueryHandler,
  SetPersonAttributesCommandHandler,
  SetShipDataCommandHandler,
  ShowWinnerCommandHandler
} from '../../../application/handlers';
import { MODAL_TOKEN, ModalProvider, PlayerEnum } from '@core';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { GameHistory } from '../../../infrastructure/storages';
import { WinnerModalComponent } from '../winner-modal/winner-modal.component';
import { ExpectedStepsCompletedModel } from '../../../application/models';

@Component({
  selector: 'lib-game-arena',
  templateUrl: './game-arena.component.html',
  styleUrls: ['./game-arena.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, NgIf, NgClass],
  providers: [
    SetPersonAttributesCommandHandler,
    SetShipDataCommandHandler,
    ShowWinnerCommandHandler,
    IsShowWinnerActiveQueryHandler,
    ExpectedStepsCompletedQueryHandler
  ]
})
export class GameArenaComponent {
  private readonly setPersonAttributesCommandHandler: SetPersonAttributesCommandHandler = inject(
    SetPersonAttributesCommandHandler
  );
  private readonly setShipDataCommandHandler: SetShipDataCommandHandler = inject(SetShipDataCommandHandler);
  private readonly showWinnerCommandHandler: ShowWinnerCommandHandler = inject(ShowWinnerCommandHandler);
  private readonly isShowWinnerActiveQueryHandler: IsShowWinnerActiveQueryHandler =
    inject(IsShowWinnerActiveQueryHandler);
  private readonly expectedStepsCompletedQueryHandler: ExpectedStepsCompletedQueryHandler = inject(
    ExpectedStepsCompletedQueryHandler
  );
  private readonly modalProvider: ModalProvider = inject(MODAL_TOKEN);

  readonly isShowWinnerActive$: Observable<boolean> = this.isShowWinnerActiveQueryHandler.isShowWinnerActive();

  readonly expectedStepsCompleted$: Observable<ExpectedStepsCompletedModel> =
    this.expectedStepsCompletedQueryHandler.isCompleted();

  setPlayer1Attiributes(): void {
    this.setPersonAttributesCommandHandler.setAttributes(PlayerEnum.PLAYER_ONE).subscribe();
  }

  setPlayer2Attributes(): void {
    this.setPersonAttributesCommandHandler.setAttributes(PlayerEnum.PLAYER_TWO).subscribe();
  }

  setPlayer1ShipData(): void {
    this.setShipDataCommandHandler.setShipData(PlayerEnum.PLAYER_ONE).subscribe();
  }

  setPlayer2ShipData(): void {
    this.setShipDataCommandHandler.setShipData(PlayerEnum.PLAYER_TWO).subscribe();
  }

  showWinner(): void {
    this.showWinnerCommandHandler.show().subscribe((result: GameHistory) => this.showWinnerModal(result));
  }

  private showWinnerModal(result: GameHistory) {
    const winner: string = result.playerOneScore > result.playerTwoScore ? 'Gracz 1' : 'Gracz 2';

    return this.modalProvider.showModal({
      component: WinnerModalComponent,
      cssClass: 'present-modal',
      componentProps: { winner: winner }
    });
  }
}
