import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { ShipDTO } from './ship.dto';

export class ShipsHttpService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  getShipData(shipId: number): Observable<ShipDTO> {
    return this.httpClient.get<ShipDTO>(`https://www.swapi.tech/api/starships/${shipId}`).pipe(
      catchError(() => {
        console.error('TWOJ STATEK SIE ROZBIL');

        return EMPTY;
      })
    );
  }
}
