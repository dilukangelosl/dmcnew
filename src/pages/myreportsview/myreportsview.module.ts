import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyreportsviewPage } from './myreportsview';

@NgModule({
  declarations: [
    MyreportsviewPage,
  ],
  imports: [
    IonicPageModule.forChild(MyreportsviewPage),
  ],
  exports: [
    MyreportsviewPage
  ]
})
export class MyreportsviewPageModule {}
