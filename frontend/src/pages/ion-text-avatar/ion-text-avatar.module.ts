import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonTextAvatar } from './ion-text-avatar';

@NgModule({
  declarations: [
    IonTextAvatar,
  ],
  imports: [
    IonicPageModule.forChild(IonTextAvatar),
  ],
})
export class IonTextAvatarPageModule {}
