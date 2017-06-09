import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelpcatPage } from './helpcat';

@NgModule({
  declarations: [
    HelpcatPage,
  ],
  imports: [
    IonicPageModule.forChild(HelpcatPage),
  ],
  exports: [
    HelpcatPage
  ]
})
export class HelpcatPageModule {}
