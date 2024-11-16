import { inject } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { ModalOptions } from '@ionic/angular';

export class IonModalService {
  private readonly modalController: ModalController = inject(ModalController);

  public modalInstances: HTMLIonModalElement[] = [];

  async showModal(opts: ModalOptions): Promise<HTMLIonModalElement> {
    const modal: HTMLIonModalElement = await this.modalController.create(opts);
    await modal.present();
    this.modalInstances.push(modal);
    return modal;
  }

  dismissModal(): Promise<boolean> {
    return this.modalController.dismiss();
  }
}
