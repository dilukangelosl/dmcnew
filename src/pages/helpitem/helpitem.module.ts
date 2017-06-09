import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelpitemPage } from './helpitem';

@NgModule({
  declarations: [
    HelpitemPage,
  ],
  imports: [
    IonicPageModule.forChild(HelpitemPage),
  ],
  exports: [
    HelpitemPage
  ]
})
export class HelpitemPageModule {}
