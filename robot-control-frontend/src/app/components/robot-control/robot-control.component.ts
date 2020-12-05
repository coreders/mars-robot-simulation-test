import { Component } from '@angular/core';
import {RobotService} from "../../services/robot.service";
import {RobotCommand} from "../../services/robot.service";

@Component({
  selector: 'robot-control',
  templateUrl: './robot-control.component.html',
  styleUrls: ['./robot-control.component.css']
})
export class RobotControlComponent {
  public commandForm: RobotCommand = new RobotCommand();

  public automaticReport: boolean = true

  constructor(public robot: RobotService) { }

  executeCommand() {
    this.robot.executeCommand(this.commandForm)
    if(this.automaticReport && this.commandForm.type != "REPORT") {
      let reportCommand = new RobotCommand();
      reportCommand.type = "REPORT"
      this.robot.executeCommand(reportCommand)
    }
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

  toggleAutomaticReports() {
    this.automaticReport = !this.automaticReport
  }
}

