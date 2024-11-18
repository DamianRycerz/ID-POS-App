import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  IsShowWinnerActiveQueryHandler,
  SetPersonAttributesCommandHandler,
  SetShipDataCommandHandler,
  ShowWinnerCommandHandler
} from '../../../application/handlers';
import { MODAL_TOKEN, ModalProvider, PlayerEnum } from '@core';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Observable, switchMap, take } from 'rxjs';
import { GameHistory } from '../../../infrastructure/storages';
import { WinnerModalComponent } from '../winner-modal/winner-modal.component';

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
    IsShowWinnerActiveQueryHandler
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
  private readonly modalProvider: ModalProvider = inject(MODAL_TOKEN);

  readonly isShowWinnerActive$: Observable<boolean> = this.isShowWinnerActiveQueryHandler.isShowWinnerActive();

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
    this.showWinnerCommandHandler
      .show()
      .pipe(
        take(1),
        switchMap((result) => this.showWinnerModal(result))
      )
      .subscribe();
  }

  private showWinnerModal(result: GameHistory) {
    const winner = result.playerOneScore > result.playerTwoScore ? 'Gracz 1' : 'Gracz 2';

    return this.modalProvider.showModal({
      component: WinnerModalComponent,
      cssClass: 'present-modal',
      componentProps: { winner: winner }
    });
  }
}
