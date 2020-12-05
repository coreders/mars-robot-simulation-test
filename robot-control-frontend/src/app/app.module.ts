import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ManualControlComponent} from "./components/manual-control/manual-control.component";
import {GuiControlComponent} from "./components/gui-control/gui-control.component";
import { FormsModule }        from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ManualControlComponent,
    GuiControlComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
