import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RobotControlComponent} from "./components/robot-control/robot-control.component";
import {PositionDisplayComponent} from "./components/position-display/position-display.component";
import { FormsModule }        from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RobotControlComponent,
    PositionDisplayComponent
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
