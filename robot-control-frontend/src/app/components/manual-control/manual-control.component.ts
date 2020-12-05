import { Component } from '@angular/core';
import {RobotService} from "../../services/robot.service";

@Component({
  selector: 'manual-control',
  templateUrl: './manual-control.component.html',
  styleUrls: []
})
export class ManualControlComponent {
  constructor(private robot: RobotService) { }
}
