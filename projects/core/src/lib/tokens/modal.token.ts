import { inject, InjectionToken } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { ModalOptions } from '@ionic/angular';
import { IonModalService } from '../services';

export const MODAL_TOKEN: InjectionToken<ModalProvider> =
  new InjectionToken<ModalProvider>('MODAL_TOKEN', {
    factory: (): ModalProvider => {
      const modalService: IonModalService = inject(IonModalService);

      return {
        showModal(opts: ModalOptions) {
          return from(modalService.showModal(opts)).pipe(map(() => void 0));
        },

        dismissModal(): Observable<void> {
          return from(modalService.dismissModal()).pipe(map(() => void 0));
        },
      };
    },
  });

export interface ModalProvider {
  showModal(opts: ModalOptions): Observable<void>;
  dismissModal(): Observable<void>;
}
