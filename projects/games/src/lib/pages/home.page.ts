import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameArenaComponent } from '../ui/components';
import { CurrentGameStorage } from '../infrastructure/storages';
import { PeopleHttpService } from '../infrastructure/http-services';

@Component({
  selector: 'lib-home',
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [GameArenaComponent],
  providers: [CurrentGameStorage, PeopleHttpService],
})
export class HomePage {}
