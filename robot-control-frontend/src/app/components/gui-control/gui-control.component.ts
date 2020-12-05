import { Component } from '@angular/core';
import {RobotService} from "../../services/robot.service";

@Component({
  selector: 'gui-control',
  templateUrl: './gui-control.component.html',
  styleUrls: []
})
export class GuiControlComponent {
  constructor(private robot: RobotService) { }
}
