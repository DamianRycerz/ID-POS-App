import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MODAL_TOKEN, ModalProvider } from '../../tokens';

@Component({
  selector: 'lib-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class ErrorModalComponent {
  @Input({ required: true }) errorMessage: string = '';

  private readonly modalProvider: ModalProvider = inject(MODAL_TOKEN);

  closeModal(): void {
    this.modalProvider.dismissModal();
  }
}
