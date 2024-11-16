import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameArenaComponent } from '../ui/components';
import {
  CurrentGameStorage,
  GamesHistoryStorage,
} from '../infrastructure/storages';
import {
  PeopleHttpService,
  ShipsHttpService,
} from '../infrastructure/http-services';
import { GamesHistoryComponent } from '../ui/components/games-history/games-history.component';

@Component({
  selector: 'lib-home',
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [GameArenaComponent, GamesHistoryComponent],
  providers: [
    CurrentGameStorage,
    GamesHistoryStorage,
    PeopleHttpService,
    ShipsHttpService,
  ],
})
export class HomePage {}
