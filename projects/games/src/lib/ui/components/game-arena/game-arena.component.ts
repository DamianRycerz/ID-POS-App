import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SetPersonAttributesCommandHandler } from '../../../application/handlers';
import { PlayerEnum } from '@core';

@Component({
  selector: 'lib-game-arena',
  templateUrl: './game-arena.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
  providers: [SetPersonAttributesCommandHandler],
})
export class GameArenaComponent {
  private readonly setPersonAttributesCommandHandler: SetPersonAttributesCommandHandler =
    inject(SetPersonAttributesCommandHandler);

  setPlayer1() {
    this.setPersonAttributesCommandHandler
      .setAttributes(PlayerEnum.PLAYER_ONE)
      .subscribe();
  }

  setPlayer2() {
    this.setPersonAttributesCommandHandler
      .setAttributes(PlayerEnum.PLAYER_TWO)
      .subscribe();
  }
}
