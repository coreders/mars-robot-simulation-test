import { Component } from '@angular/core';
import {RobotService} from "../../services/robot.service";
import {RobotCommand} from "../../services/robot.service";

@Component({
  selector: 'manual-control',
  templateUrl: './manual-control.component.html',
  styleUrls: ['./manual-control.component.css']
})
export class ManualControlComponent {
  public commandForm: RobotCommand = new RobotCommand();

  constructor(public robot: RobotService) { }

  executeCommand() {
    this.robot.executeCommand(this.commandForm)
    this.commandForm = this.robot.initNewCommand()
  }

  changeType(event: Event) {
    if(event.target) {
      this.commandForm.type = (<HTMLInputElement>event.target).value
    }
  }

  changeDirection(event: Event) {
    if(event.target) {
      this.commandForm.direction = (<HTMLInputElement>event.target).value
    }
  }
}

