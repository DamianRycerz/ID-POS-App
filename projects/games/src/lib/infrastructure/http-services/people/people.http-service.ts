import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { PersonDTO } from './person.dto';

export class PeopleHttpService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  getPerson(peopleId: number): Observable<PersonDTO> {
    return this.httpClient.get<PersonDTO>(
      `https://www.swapi.tech/api/people/${peopleId}`
    );
  }
}
