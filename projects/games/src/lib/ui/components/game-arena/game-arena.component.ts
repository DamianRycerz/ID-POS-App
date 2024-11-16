import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-game-arena',
  templateUrl: './game-arena.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class GameArenaComponent {}
