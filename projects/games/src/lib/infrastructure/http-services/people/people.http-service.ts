import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { PersonDTO } from './person.dto';

export class PeopleHttpService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  getPerson(peopleId: number): Observable<PersonDTO> {
    return this.httpClient.get<PersonDTO>(`https://www.swapi.tech/api/people/${peopleId}`).pipe(
      catchError(() => {
        console.error('TWOJA KARTA JEST PUSTA');

        return EMPTY;
      })
    );
  }
}
