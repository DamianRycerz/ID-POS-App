import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  IsShowWinnerActiveQueryHandler,
  SetPersonAttributesCommandHandler,
  SetShipDataCommandHandler,
  ShowWinnerCommandHandler
} from '../../../application/handlers';
import { PlayerEnum } from '@core';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

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
    this.showWinnerCommandHandler.show().subscribe();
  }
}
