import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, Observable, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { PersonDTO } from './person.dto';
import { ErrorModalComponent, MODAL_TOKEN, ModalProvider } from '@core';

export class PeopleHttpService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly modalProvider: ModalProvider = inject(MODAL_TOKEN);

  getPerson(peopleId: number): Observable<PersonDTO> {
    return this.httpClient
      .get<PersonDTO>(`https://www.swapi.tech/api/people/${peopleId}`)
      .pipe(catchError(() => this.errorMessage()));
  }

  private errorMessage(): Observable<never> {
    return this.modalProvider
      .showModal({
        component: ErrorModalComponent,
        cssClass: 'present-modal',
        componentProps: { errorMessage: 'Twoja karta jest pusta. Spróbuj jeszcze raz' }
      })
      .pipe(switchMap(() => EMPTY));
  }
}
