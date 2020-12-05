import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RobotPosition, RobotService} from "../../services/robot.service";

const gridColor = '#FFFFFF30';

@Component({
  selector: 'position-display',
  templateUrl: './position-display.component.html',
  styleUrls: ['./position-display.component.css']
})
export class PositionDisplayComponent implements OnInit {



    @ViewChild('canvas', { static: true })
    public canvas: ElementRef<HTMLCanvasElement> | null  = null;

    private renderingContext: CanvasRenderingContext2D | null  = null;

    constructor(private robot: RobotService) {
      robot.robotPositionObservable.subscribe(value => {
        this.displayRobotPosition(value);
      })
    }

    ngOnInit(): void {
      if(this.canvas) {
        this.canvas.nativeElement.height = this.canvas.nativeElement.width

        this.renderingContext = this.canvas.nativeElement.getContext('2d');

        this.redrawGrid();

      }
    }

  private redrawGrid() {
    this.renderingContext?.clearRect(0, 0, this.canvas!!.nativeElement.width, this.canvas!!.nativeElement.height)

    let spaceBetweenGridLines = this.getSpaceBetweenGridLines()
    for (var i = 0; i < this.robot.getMaxGridPosition(); i++) {
      this.drawLine((i + 1) * spaceBetweenGridLines, (i + 1) * spaceBetweenGridLines, 0, 1);
      this.drawLine(0, 1, (i + 1) * spaceBetweenGridLines, (i + 1) * spaceBetweenGridLines);
    }
  }

  private getSpaceBetweenGridLines() {
    return 1.0 / (this.robot.getMaxGridPosition() + 1.0);
  }

  private drawLine(xPercentStart: number, xPercentEnd: number, yPercentStart: number, yPercentEnd: number) {
      if (this.renderingContext && this.canvas) {
        const __ret = this.mapPercentCoordinateToPixel(xPercentStart);
        this.renderingContext.strokeStyle = gridColor;
        this.renderingContext.lineCap = 'round';
        this.renderingContext.lineJoin = "round";

        this.renderingContext.moveTo(this.mapPercentCoordinateToPixel(xPercentStart), this.mapPercentCoordinateToPixel(yPercentStart));
        this.renderingContext.lineTo(this.mapPercentCoordinateToPixel(xPercentEnd), this.mapPercentCoordinateToPixel(yPercentEnd));
        this.renderingContext.stroke();
      }
    }

  private mapPercentSizeToPixel(percentValue: number) {
    var result = 0
    if(this.canvas) {
      var squareSideInPixels = this.canvas.nativeElement.width;
      var drawZonePercents = 0.7
      var drawZoneSizeInPixels = squareSideInPixels * drawZonePercents

      result = percentValue * drawZoneSizeInPixels
    }
    return result
  }

  private mapPercentCoordinateToPixel(percentValue: number) {
      var result = 0
      if(this.canvas) {
        var squareSideInPixels = this.canvas.nativeElement.width;
        var drawZonePercents = 0.7
        var drawStart = ((1 - drawZonePercents) / 2) * squareSideInPixels

        result = drawStart + this.mapPercentSizeToPixel(percentValue)
      }
      return result
  }

  private displayRobotPosition(position: RobotPosition) {
    let renderingContext = this.renderingContext;
    if(renderingContext) {
      this.redrawGrid()

      let spaceBetweenGridLines = this.getSpaceBetweenGridLines()

      let margin = 0.1

      let xPercents = (position.xPosition + margin) * spaceBetweenGridLines
      let yPercents = ((this.robot.getMaxGridPosition() - position.yPosition) + margin) * spaceBetweenGridLines
      let sizePercents = spaceBetweenGridLines * (1 - 2*margin)

      let xPixels = this.mapPercentCoordinateToPixel(xPercents)
      let yPixels = this.mapPercentCoordinateToPixel(yPercents)
      let sizeInPixels = this.mapPercentSizeToPixel(sizePercents)

      if(renderingContext) {
        var image = document.createElement("img");
        image.onload=function(){
          if(renderingContext)
            renderingContext.drawImage(image, xPixels, yPixels, sizeInPixels, sizeInPixels)
        }
        image.src='./assets/robot-'+position.direction+'.png'
      }

    }
  }
}
