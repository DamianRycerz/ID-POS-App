import {
  PeopleHttpService,
  PersonDTO,
} from '../../../infrastructure/http-services';
import { inject } from '@angular/core';
import { CurrentGameStorage } from '../../../infrastructure/storages';
import { map, switchMap } from 'rxjs';
import { PlayerEnum } from '@core';

export class SetPlayerDataCommandHandler {
  private readonly peopleHttpService: PeopleHttpService =
    inject(PeopleHttpService);
  private readonly currentGameStorage: CurrentGameStorage =
    inject(CurrentGameStorage);

  setPlayerData(selectedPlayer: PlayerEnum) {
    const randomId: number = Math.floor(Math.random() * 100);

    return this.peopleHttpService.getPerson(randomId).pipe(
      map((person: PersonDTO) => this.mapToPlayerData(person)),
      switchMap((data) =>
        this.currentGameStorage.patchPlayerResult(data, selectedPlayer)
      )
    );
  }

  private mapToPlayerData(person: PersonDTO) {
    return {
      weight: +person.result.properties.mass,
      height: +person.result.properties.height,
    };
  }
}
