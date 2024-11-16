import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SetPlayerDataCommandHandler } from '../../../application/handlers';
import { PlayerEnum } from '@core';

@Component({
  selector: 'lib-game-arena',
  templateUrl: './game-arena.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
  providers: [SetPlayerDataCommandHandler],
})
export class GameArenaComponent {
  private readonly setPlayerDataCommandHandler: SetPlayerDataCommandHandler =
    inject(SetPlayerDataCommandHandler);

  setPlayer1() {
    this.setPlayerDataCommandHandler
      .setPlayerData(PlayerEnum.PLAYER_ONE)
      .subscribe();
  }

  setPlayer2() {
    this.setPlayerDataCommandHandler
      .setPlayerData(PlayerEnum.PLAYER_TWO)
      .subscribe();
  }
}
