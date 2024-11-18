import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MODAL_TOKEN, ModalProvider } from '@core';

@Component({
  selector: 'lib-winner-modal',
  templateUrl: './winner-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class WinnerModalComponent {
  @Input({ required: true }) winner: string = '';

  private readonly modalProvider: ModalProvider = inject(MODAL_TOKEN);

  closeModal(): void {
    this.modalProvider.dismissModal();
  }
}
