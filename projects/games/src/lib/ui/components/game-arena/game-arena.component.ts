import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  SetPersonAttributesCommandHandler,
  SetShipDataCommandHandler,
} from '../../../application/handlers';
import { PlayerEnum } from '@core';

@Component({
  selector: 'lib-game-arena',
  templateUrl: './game-arena.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
  providers: [SetPersonAttributesCommandHandler, SetShipDataCommandHandler],
})
export class GameArenaComponent {
  private readonly setPersonAttributesCommandHandler: SetPersonAttributesCommandHandler =
    inject(SetPersonAttributesCommandHandler);
  private readonly setShipDataCommandHandler: SetShipDataCommandHandler =
    inject(SetShipDataCommandHandler);

  setPlayer1Attiributes() {
    this.setPersonAttributesCommandHandler
      .setAttributes(PlayerEnum.PLAYER_ONE)
      .subscribe();
  }

  setPlayer2Attributes() {
    this.setPersonAttributesCommandHandler
      .setAttributes(PlayerEnum.PLAYER_TWO)
      .subscribe();
  }

  setPlayer1ShipData() {
    this.setShipDataCommandHandler
      .setShipData(PlayerEnum.PLAYER_ONE)
      .subscribe();
  }

  setPlayer2ShipData() {
    this.setShipDataCommandHandler
      .setShipData(PlayerEnum.PLAYER_TWO)
      .subscribe();
  }
}
