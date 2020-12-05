import {Injectable} from '@angular/core';


const north = "NORTH"
const east = "EAST"
const south = "SOUTH"
const west = "WEST"

@Injectable({
  providedIn: 'root'
})
export class RobotSimulator {
  commandTypes: string[] = ["MOVE", "LEFT", "RIGHT", "REPORT", "PLACE"]

  directions: string[] = [north, east, south, west]
  maxGridPosition: number = 4;

  private activeRobot: Robot = new Robot(this.maxGridPosition, this.directions)


  executeCommand(command: string): string | null {
    let parsed_place_command = /^\s*PLACE\s+(\d)\s*,\s*(\d)\s*,\s*(\w+)\s*$/.exec(command)
    var result = null
    if (parsed_place_command) {
      this.activeRobot.place(+parsed_place_command[1], +parsed_place_command[2], parsed_place_command[3])
    } else if(this.activeRobot.isPlaced) {
      if (command == "MOVE") {
        this.activeRobot.move()
      } else if (command == "LEFT") {
        this.activeRobot.left()
      } else if (command == "RIGHT") {
        this.activeRobot.right()
      } else if (command == "REPORT") {
        result = this.activeRobot.report()
      }
    }
    return result
  }
}

class Robot {
  constructor(private maxGridPosition: number, private directions: string[]) {

  }

  private x : number = 0
  private y : number = 0
  private direction : string = north
  isPlaced : boolean = false

  place(x: number, y: number, direction: string) {
    let succeeded = this.to(x, y, direction)
    if(succeeded) {
      this.isPlaced = true
    }
  }

  private isValidPosition(x: number, y: number, direction: string) : boolean {
    return 0 <= x
      && 0 <= y
      && x <= this.maxGridPosition
      && y <= this.maxGridPosition
      && this.directions.includes(direction)
  }

  private to(x: number, y: number, direction: string = this.direction) : boolean {
    if(this.isValidPosition(x, y, direction)) {
      this.x = x
      this.y = y
      this.direction = direction
      return true
    } else {
      return false
    }
  }

  report() : string {
    return this.x + ", " + this.y + ", " + this.direction
  }

  left() {
    let currentDirectionIndex = this.directions.indexOf(this.direction)
    if(currentDirectionIndex == 0) {
      this.direction = this.directions[this.directions.length - 1]
    } else {
      this.direction = this.directions[currentDirectionIndex - 1]
    }
  }

  right() {
    let currentDirectionIndex = this.directions.indexOf(this.direction)
    this.direction = this.directions[(currentDirectionIndex + 1 ) % this.directions.length]
  }

  move() {
    if(this.direction == north) {
      this.to(this.x, this.y +1)
    } else if(this.direction == south) {
      this.to(this.x, this.y -1)
    } else if(this.direction == east) {
      this.to(this.x+1, this.y)
    } else if(this.direction == west) {
      this.to(this.x-1, this.y)
    }
  }
}

