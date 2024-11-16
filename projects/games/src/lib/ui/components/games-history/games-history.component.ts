import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GetGamesHistoryQueryHandler } from '../../../application/handlers';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { GameHistoryModel } from '../../../application/models/game-history.model';

@Component({
  selector: 'lib-games-history',
  templateUrl: './games-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgForOf, AsyncPipe, NgIf],
  providers: [GetGamesHistoryQueryHandler],
})
export class GamesHistoryComponent {
  private readonly getGamesHistoryQueryHandler: GetGamesHistoryQueryHandler =
    inject(GetGamesHistoryQueryHandler);

  readonly history$: Observable<GameHistoryModel> =
    this.getGamesHistoryQueryHandler.history();
}
