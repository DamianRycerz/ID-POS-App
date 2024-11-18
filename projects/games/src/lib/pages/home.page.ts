import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameArenaComponent, GamesHistoryComponent } from '../ui/components';
import { CurrentGameStorage, GamesHistoryStorage } from '../infrastructure/storages';
import { PeopleHttpService, ShipsHttpService } from '../infrastructure/http-services';

@Component({
  selector: 'lib-home',
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [GameArenaComponent, GamesHistoryComponent],
  providers: [CurrentGameStorage, GamesHistoryStorage, PeopleHttpService, ShipsHttpService]
})
export class HomePage {}
