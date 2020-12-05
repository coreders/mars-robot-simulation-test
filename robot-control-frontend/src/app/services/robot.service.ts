import { Injectable } from '@angular/core';
import {RobotSimulator} from "./robot-simulator.service";

@Injectable({
  providedIn: 'root'
})
export class RobotService {
  private commandsHistory: string[] = []
  private outputs: string[] = []
  public isPlaced : boolean = false

  constructor(private simulator : RobotSimulator) { }

  getCommandsHistory() {
    return this.commandsHistory
  }

  getOutputs() {
    return this.outputs
  }

  executeCommand(command: RobotCommand) {

    this.commandsHistory.push(command.toString())
    let output = this.simulator.executeCommand(command.toString())
    if(output && output.length > 0) {
      this.outputs.push(output)
    }
    if(command.type == "PLACE") {
      this.isPlaced = true
    }
  }

  getCommandTypes() {
    return this.simulator.commandTypes.filter(type => (type == "PLACE") != this.isPlaced )
  }

  getMaxGridPosition() {
    return this.simulator.maxGridPosition
  }

  getDirections() {
    return this.simulator.directions
  }

  initNewCommand() {
    let command = new RobotCommand()
    if(this.isPlaced) {
      command.type = "MOVE"
    }
    return command;
  }
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
