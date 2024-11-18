import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClearGamesHistoryCommandHandler, GetGamesHistoryQueryHandler } from '../../../application/handlers';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { GameHistoryModel } from '../../../application/models/game-history.model';

@Component({
  selector: 'lib-games-history',
  templateUrl: './games-history.component.html',
  styleUrls: ['./games-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgForOf, AsyncPipe, NgIf, NgClass],
  providers: [GetGamesHistoryQueryHandler, ClearGamesHistoryCommandHandler]
})
export class GamesHistoryComponent {
  private readonly getGamesHistoryQueryHandler: GetGamesHistoryQueryHandler = inject(GetGamesHistoryQueryHandler);
  private readonly clearGamesHistoryCommandHandler: ClearGamesHistoryCommandHandler = inject(
    ClearGamesHistoryCommandHandler
  );

  readonly history$: Observable<GameHistoryModel> = this.getGamesHistoryQueryHandler.history();

  clearGamesHistory(): void {
    this.clearGamesHistoryCommandHandler.clear();
  }
}
