import { Injectable } from '@angular/core';
import {RobotSimulator} from "./robot-simulator.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RobotService {
  private commandsHistory: string[] = []
  private outputs: string[] = []
  private log: string[] = []
  public robotPositionObservable = new Subject<RobotPosition>();

  /**
   * The current implementation simply injects a local client-side RobotSimulator, a remote implementation might also be used to call a backend simulator
   * @param simulator
   */
  constructor(private simulator : RobotSimulator) {

  }

  getCommandsHistory() {
    return this.commandsHistory
  }

  getOutputs() {
    return this.outputs
  }

  executeCommand(command: RobotCommand) {
    let commandStr = command.toString();
    this.executeTextCommand(commandStr)
  }

  private addLog(log: string) {
    this.log.push("[" + new Date().toISOString() + "] " + log)
  }

  getCommandTypes() {
    return this.simulator.commandTypes.filter(type => (type == "PLACE") != this.simulator.isPlaced() )
  }

  getMaxGridPosition() {
    return this.simulator.maxGridPosition
  }

  getDirections() {
    return this.simulator.directions
  }

  initNewCommand() {
    let command = new RobotCommand()
    if(this.simulator.isPlaced()) {
      command.type = "MOVE"
    }
    return command;
  }

  private parsePosition(report: string) {
    let robotPosition = new RobotPosition();

    let parsed_report = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\w+)\s*$/.exec(report)
    if(parsed_report) {
      robotPosition.xPosition = +parsed_report[1]
      robotPosition.yPosition = +parsed_report[2]
      robotPosition.direction = parsed_report[3]
    }
    return robotPosition;
  }

  getLogs() {
    return this.log
  }

  executeTextCommand(textCommand: any) {
    this.commandsHistory.push(textCommand)
    this.addLog(">> " + textCommand);

    let output = this.simulator.executeCommand(textCommand)
    if(output && output.length > 0) {
      this.outputs.push(output)
      this.addLog("<< " + output);

      this.robotPositionObservable.next(this.parsePosition(output))
    }
  }
}


export class RobotPosition {
  public xPosition: number = 0
  public yPosition: number = 0
  public direction: string = "NORTH"
}


export class RobotCommand {
  public type: string = "PLACE"
  public xPosition: number = 0
  public yPosition: number = 0
  public direction: string = "NORTH"


  toString() {
    if(this.type == "PLACE") {
      return this.type + " " + this.xPosition + ", " + this.yPosition + ", " + this.direction
    } else {
      return this.type
    }
  }
}
