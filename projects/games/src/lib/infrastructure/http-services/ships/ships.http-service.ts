import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, Observable, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { ShipDTO } from './ship.dto';
import { ErrorModalComponent, MODAL_TOKEN, ModalProvider } from '@core';

export class ShipsHttpService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly modalProvider: ModalProvider = inject(MODAL_TOKEN);

  getShipData(shipId: number): Observable<ShipDTO> {
    return this.httpClient
      .get<ShipDTO>(`https://www.swapi.tech/api/starships/${shipId}`)
      .pipe(catchError(() => this.errorMessage()));
  }

  private errorMessage(): Observable<never> {
    return this.modalProvider
      .showModal({
        component: ErrorModalComponent,
        cssClass: 'present-modal',
        componentProps: { errorMessage: 'Twój statek się rozbił. Spróbuj jeszcze raz' }
      })
      .pipe(switchMap(() => EMPTY));
  }
}
