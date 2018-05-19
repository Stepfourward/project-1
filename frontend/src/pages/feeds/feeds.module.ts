import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedsPage } from './feeds';
import { SwingModule } from 'angular2-swing';

@NgModule({
  declarations: [
    FeedsPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedsPage),
    SwingModule
  ],
})
export class FeedsPageModule {}
