import { PeopleHttpService } from '../../../infrastructure/http-services';
import { inject } from '@angular/core';
import { CurrentGameStorage } from '../../../infrastructure/storages';

export class SetPlayerDataCommandHandler {
  private readonly peopleHttpService: PeopleHttpService =
    inject(PeopleHttpService);
  private readonly currentGameStorage: CurrentGameStorage =
    inject(CurrentGameStorage);

  setPlayerData() {}
}
