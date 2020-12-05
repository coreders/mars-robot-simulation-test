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
  public rawTextControl: boolean = false
  textCommand: string = ''

  constructor(public robot: RobotService) { }

  executeCommand() {
    this.robot.executeCommand(this.commandForm)
    if(this.automaticReport && this.commandForm.type != "REPORT") {
      this.executeCommandByName("REPORT");
    }
    this.commandForm = this.robot.initNewCommand()
  }

  executeRawTextCommand() {
    this.robot.executeTextCommand(this.textCommand)
    this.textCommand = ''
    this.commandForm = this.robot.initNewCommand()
  }

  executeCommandByName(type: string ) {
    let reportCommand = new RobotCommand();
    reportCommand.type = type
    this.robot.executeCommand(reportCommand)
    if(this.automaticReport && type != "REPORT") {
      this.executeCommandByName("REPORT");
    }
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

