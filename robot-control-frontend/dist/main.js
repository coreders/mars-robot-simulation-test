(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\coren\IdeaProjects\mars-robot-simulation-test\robot-control-frontend\src\main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "JTsz":
/*!*******************************************!*\
  !*** ./src/app/services/robot.service.ts ***!
  \*******************************************/
/*! exports provided: RobotService, RobotPosition, RobotCommand */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RobotService", function() { return RobotService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RobotPosition", function() { return RobotPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RobotCommand", function() { return RobotCommand; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _robot_simulator_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./robot-simulator.service */ "hR0m");




class RobotService {
    /**
     * The current implementation simply injects a local client-side RobotSimulator, a remote implementation might also be used to call a backend simulator
     * @param simulator
     */
    constructor(simulator) {
        this.simulator = simulator;
        this.commandsHistory = [];
        this.outputs = [];
        this.log = [];
        this.isPlaced = false;
        this.robotPositionObservable = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    getCommandsHistory() {
        return this.commandsHistory;
    }
    getOutputs() {
        return this.outputs;
    }
    executeCommand(command) {
        let commandStr = command.toString();
        this.commandsHistory.push(commandStr);
        this.log.push("[" + new Date() + "] >> " + commandStr);
        let output = this.simulator.executeCommand(commandStr);
        if (output && output.length > 0) {
            this.outputs.push(output);
            this.log.push("[" + new Date() + "] << " + output);
            this.robotPositionObservable.next(this.parsePosition(output));
        }
        if (command.type == "PLACE") {
            this.isPlaced = true;
        }
    }
    getCommandTypes() {
        return this.simulator.commandTypes.filter(type => (type == "PLACE") != this.isPlaced);
    }
    getMaxGridPosition() {
        return this.simulator.maxGridPosition;
    }
    getDirections() {
        return this.simulator.directions;
    }
    initNewCommand() {
        let command = new RobotCommand();
        if (this.isPlaced) {
            command.type = "MOVE";
        }
        return command;
    }
    parsePosition(report) {
        let robotPosition = new RobotPosition();
        let parsed_report = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\w+)\s*$/.exec(report);
        if (parsed_report) {
            robotPosition.xPosition = +parsed_report[1];
            robotPosition.yPosition = +parsed_report[2];
            robotPosition.direction = parsed_report[3];
        }
        return robotPosition;
    }
}
RobotService.ɵfac = function RobotService_Factory(t) { return new (t || RobotService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_robot_simulator_service__WEBPACK_IMPORTED_MODULE_2__["RobotSimulator"])); };
RobotService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: RobotService, factory: RobotService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RobotService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _robot_simulator_service__WEBPACK_IMPORTED_MODULE_2__["RobotSimulator"] }]; }, null); })();
class RobotPosition {
    constructor() {
        this.xPosition = 0;
        this.yPosition = 0;
        this.direction = "NORTH";
    }
}
class RobotCommand {
    constructor() {
        this.type = "PLACE";
        this.xPosition = 0;
        this.yPosition = 0;
        this.direction = "NORTH";
    }
    toString() {
        if (this.type == "PLACE") {
            return this.type + " " + this.xPosition + ", " + this.yPosition + ", " + this.direction;
        }
        else {
            return this.type;
        }
    }
}


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_gui_control_gui_control_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/gui-control/gui-control.component */ "xPno");
/* harmony import */ var _components_manual_control_manual_control_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/manual-control/manual-control.component */ "YMbw");




class AppComponent {
    constructor() {
        this.title = 'robot-control-frontend';
        this.active = 'gui';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 5, vars: 0, consts: [[1, "row"], [1, "col-6"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "gui-control");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "manual-control");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_components_gui_control_gui_control_component__WEBPACK_IMPORTED_MODULE_1__["GuiControlComponent"], _components_manual_control_manual_control_component__WEBPACK_IMPORTED_MODULE_2__["ManualControlComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "YMbw":
/*!***********************************************************************!*\
  !*** ./src/app/components/manual-control/manual-control.component.ts ***!
  \***********************************************************************/
/*! exports provided: ManualControlComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManualControlComponent", function() { return ManualControlComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_robot_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/robot.service */ "JTsz");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");






function ManualControlComponent_p_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const command_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", command_r4, " ");
} }
function ManualControlComponent_option_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const type_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", type_r5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](type_r5);
} }
function ManualControlComponent_div_12_option_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const dir_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", dir_r7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](dir_r7);
} }
function ManualControlComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Where will the spaceship drop the robot ? ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "label", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "X ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "input", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "label", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Y ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "input", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "label", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Direction ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "select", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function ManualControlComponent_div_12_Template_select_change_15_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r8.changeDirection($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, ManualControlComponent_div_12_option_16_Template, 2, 2, "option", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("max", ctx_r2.robot.getMaxGridPosition());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r2.commandForm.xPosition);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("max", ctx_r2.robot.getMaxGridPosition());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r2.commandForm.yPosition);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r2.commandForm.direction);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r2.robot.getDirections());
} }
function ManualControlComponent_p_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const out_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", out_r10, " ");
} }
class ManualControlComponent {
    constructor(robot) {
        this.robot = robot;
        this.commandForm = new _services_robot_service__WEBPACK_IMPORTED_MODULE_1__["RobotCommand"]();
    }
    executeCommand() {
        this.robot.executeCommand(this.commandForm);
        this.commandForm = this.robot.initNewCommand();
    }
    changeType(event) {
        if (event.target) {
            this.commandForm.type = event.target.value;
        }
    }
    changeDirection(event) {
        if (event.target) {
            this.commandForm.direction = event.target.value;
        }
    }
}
ManualControlComponent.ɵfac = function ManualControlComponent_Factory(t) { return new (t || ManualControlComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_robot_service__WEBPACK_IMPORTED_MODULE_1__["RobotService"])); };
ManualControlComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ManualControlComponent, selectors: [["manual-control"]], decls: 24, vars: 6, consts: [[1, "card", "m-2"], [1, "card-header"], [1, "list-group", "list-group-flush"], [1, "list-group-item"], [1, "scrollable"], [4, "ngFor", "ngForOf"], [1, "row"], [1, "col-6"], [1, "browser-default", "custom-select", 3, "disabled", "ngModel", "change"], [3, "value", 4, "ngFor", "ngForOf"], ["class", "col-12", 4, "ngIf"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [3, "value"], [1, "col-12"], [1, "p-1"], [1, "p-1", "form-group", "row"], ["for", "x", 1, "col-3"], ["id", "x", "type", "number", "min", "0", 1, "form-control", "col-9", 3, "max", "ngModel"], ["for", "y", 1, "col-3"], ["id", "y", "type", "number", "min", "0", 1, "form-control", "col-9", 3, "max", "ngModel"], ["for", "direction", 1, "col-3"], [1, "col-9"], ["id", "direction", 1, "browser-default", "custom-select", 3, "ngModel", "change"]], template: function ManualControlComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Robot commands ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "ul", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "li", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, ManualControlComponent_p_6_Template, 2, 1, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "li", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "select", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function ManualControlComponent_Template_select_change_10_listener($event) { return ctx.changeType($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, ManualControlComponent_option_11_Template, 2, 2, "option", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, ManualControlComponent_div_12_Template, 17, 6, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ManualControlComponent_Template_button_click_15_listener() { return ctx.executeCommand(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Execute");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " Robot outputs ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "ul", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "li", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, ManualControlComponent_p_23_Template, 2, 1, "p", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.robot.getCommandsHistory().reverse());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx.robot.isPlaced)("ngModel", ctx.commandForm.type);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.robot.getCommandTypes());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.commandForm.type == "PLACE");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.robot.getOutputs().reverse());
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_forms_forms_x"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"]], styles: [".scrollable[_ngcontent-%COMP%]{\r\n  overflow-y: auto;\r\n  height: 30vh;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hbnVhbC1jb250cm9sLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBZ0I7RUFDaEIsWUFBWTtBQUNkIiwiZmlsZSI6Im1hbnVhbC1jb250cm9sLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc2Nyb2xsYWJsZXtcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIGhlaWdodDogMzB2aDtcclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ManualControlComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'manual-control',
                templateUrl: './manual-control.component.html',
                styleUrls: ['./manual-control.component.css']
            }]
    }], function () { return [{ type: _services_robot_service__WEBPACK_IMPORTED_MODULE_1__["RobotService"] }]; }, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "1kSV");
/* harmony import */ var _components_manual_control_manual_control_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/manual-control/manual-control.component */ "YMbw");
/* harmony import */ var _components_gui_control_gui_control_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/gui-control/gui-control.component */ "xPno");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "3Pt+");








class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
        _components_manual_control_manual_control_component__WEBPACK_IMPORTED_MODULE_4__["ManualControlComponent"],
        _components_gui_control_gui_control_component__WEBPACK_IMPORTED_MODULE_5__["GuiControlComponent"]], imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
                    _components_manual_control_manual_control_component__WEBPACK_IMPORTED_MODULE_4__["ManualControlComponent"],
                    _components_gui_control_gui_control_component__WEBPACK_IMPORTED_MODULE_5__["GuiControlComponent"]
                ],
                imports: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "hR0m":
/*!*****************************************************!*\
  !*** ./src/app/services/robot-simulator.service.ts ***!
  \*****************************************************/
/*! exports provided: RobotSimulator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RobotSimulator", function() { return RobotSimulator; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


const north = "NORTH";
const east = "EAST";
const south = "SOUTH";
const west = "WEST";
class RobotSimulator {
    constructor() {
        this.commandTypes = ["MOVE", "LEFT", "RIGHT", "REPORT", "PLACE"];
        this.directions = [north, east, south, west];
        this.maxGridPosition = 4;
        this.activeRobot = new Robot(this.maxGridPosition, this.directions);
    }
    executeCommand(command) {
        let parsed_place_command = /^\s*PLACE\s+(\d)\s*,\s*(\d)\s*,\s*(\w+)\s*$/.exec(command);
        var result = null;
        if (parsed_place_command) {
            this.activeRobot.place(+parsed_place_command[1], +parsed_place_command[2], parsed_place_command[3]);
        }
        else if (this.activeRobot.isPlaced) {
            if (command == "MOVE") {
                this.activeRobot.move();
            }
            else if (command == "LEFT") {
                this.activeRobot.left();
            }
            else if (command == "RIGHT") {
                this.activeRobot.right();
            }
            else if (command == "REPORT") {
                result = this.activeRobot.report();
            }
        }
        return result;
    }
}
RobotSimulator.ɵfac = function RobotSimulator_Factory(t) { return new (t || RobotSimulator)(); };
RobotSimulator.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: RobotSimulator, factory: RobotSimulator.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RobotSimulator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
class Robot {
    constructor(maxGridPosition, directions) {
        this.maxGridPosition = maxGridPosition;
        this.directions = directions;
        this.x = 0;
        this.y = 0;
        this.direction = north;
        this.isPlaced = false;
    }
    place(x, y, direction) {
        let succeeded = this.to(x, y, direction);
        if (succeeded) {
            this.isPlaced = true;
        }
    }
    isValidPosition(x, y, direction) {
        return 0 <= x
            && 0 <= y
            && x <= this.maxGridPosition
            && y <= this.maxGridPosition
            && this.directions.includes(direction);
    }
    to(x, y, direction = this.direction) {
        if (this.isValidPosition(x, y, direction)) {
            this.x = x;
            this.y = y;
            this.direction = direction;
            return true;
        }
        else {
            return false;
        }
    }
    report() {
        return this.x + ", " + this.y + ", " + this.direction;
    }
    left() {
        let currentDirectionIndex = this.directions.indexOf(this.direction);
        if (currentDirectionIndex == 0) {
            this.direction = this.directions[this.directions.length - 1];
        }
        else {
            this.direction = this.directions[currentDirectionIndex - 1];
        }
    }
    right() {
        let currentDirectionIndex = this.directions.indexOf(this.direction);
        this.direction = this.directions[(currentDirectionIndex + 1) % this.directions.length];
    }
    move() {
        if (this.direction == north) {
            this.to(this.x, this.y + 1);
        }
        else if (this.direction == south) {
            this.to(this.x, this.y - 1);
        }
        else if (this.direction == east) {
            this.to(this.x + 1, this.y);
        }
        else if (this.direction == west) {
            this.to(this.x - 1, this.y);
        }
    }
}


/***/ }),

/***/ "xPno":
/*!*****************************************************************!*\
  !*** ./src/app/components/gui-control/gui-control.component.ts ***!
  \*****************************************************************/
/*! exports provided: GuiControlComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuiControlComponent", function() { return GuiControlComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_robot_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/robot.service */ "JTsz");



const _c0 = ["canvas"];
class GuiControlComponent {
    constructor(robot) {
        this.robot = robot;
        this.canvas = null;
        this.renderingContext = null;
        robot.robotPositionObservable.subscribe(value => {
            this.displayRobotPosition(value);
        });
    }
    ngOnInit() {
        if (this.canvas) {
            this.canvas.nativeElement.height = this.canvas.nativeElement.width;
            this.renderingContext = this.canvas.nativeElement.getContext('2d');
            this.redrawGrid();
        }
    }
    redrawGrid() {
        var _a;
        (_a = this.renderingContext) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        let spaceBetweenGridLines = this.getSpaceBetweenGridLines();
        for (var i = 0; i < this.robot.getMaxGridPosition(); i++) {
            this.drawLine((i + 1) * spaceBetweenGridLines, (i + 1) * spaceBetweenGridLines, 0, 1);
            this.drawLine(0, 1, (i + 1) * spaceBetweenGridLines, (i + 1) * spaceBetweenGridLines);
        }
    }
    getSpaceBetweenGridLines() {
        return 1.0 / (this.robot.getMaxGridPosition() + 1.0);
    }
    drawLine(xPercentStart, xPercentEnd, yPercentStart, yPercentEnd) {
        if (this.renderingContext && this.canvas) {
            const __ret = this.mapPercentCoordinateToPixel(xPercentStart);
            this.renderingContext.strokeStyle = '#FFFFFF50';
            this.renderingContext.lineCap = 'round';
            this.renderingContext.lineJoin = "round";
            this.renderingContext.moveTo(this.mapPercentCoordinateToPixel(xPercentStart), this.mapPercentCoordinateToPixel(yPercentStart));
            this.renderingContext.lineTo(this.mapPercentCoordinateToPixel(xPercentEnd), this.mapPercentCoordinateToPixel(yPercentEnd));
            this.renderingContext.stroke();
        }
    }
    mapPercentSizeToPixel(percentValue) {
        var result = 0;
        if (this.canvas) {
            var squareSideInPixels = this.canvas.nativeElement.width;
            var drawZonePercents = 0.7;
            var drawZoneSizeInPixels = squareSideInPixels * drawZonePercents;
            result = percentValue * drawZoneSizeInPixels;
        }
        return result;
    }
    mapPercentCoordinateToPixel(percentValue) {
        var result = 0;
        if (this.canvas) {
            var squareSideInPixels = this.canvas.nativeElement.width;
            var drawZonePercents = 0.7;
            var drawStart = ((1 - drawZonePercents) / 2) * squareSideInPixels;
            result = drawStart + this.mapPercentSizeToPixel(percentValue);
        }
        return result;
    }
    displayRobotPosition(position) {
        let renderingContext = this.renderingContext;
        if (renderingContext) {
            this.redrawGrid();
            let spaceBetweenGridLines = this.getSpaceBetweenGridLines();
            let margin = 0.1;
            let xPercents = (position.xPosition + margin) * spaceBetweenGridLines;
            let yPercents = ((this.robot.getMaxGridPosition() - position.yPosition) + margin) * spaceBetweenGridLines;
            let sizePercents = spaceBetweenGridLines * (1 - 2 * margin);
            let xPixels = this.mapPercentCoordinateToPixel(xPercents);
            let yPixels = this.mapPercentCoordinateToPixel(yPercents);
            let sizeInPixels = this.mapPercentSizeToPixel(sizePercents);
            if (renderingContext) {
                var image = document.createElement("img");
                image.onload = function () {
                    if (renderingContext)
                        renderingContext.drawImage(image, xPixels, yPixels, sizeInPixels, sizeInPixels);
                };
                image.src = './assets/robot-' + position.direction + '.png';
            }
        }
    }
}
GuiControlComponent.ɵfac = function GuiControlComponent_Factory(t) { return new (t || GuiControlComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_robot_service__WEBPACK_IMPORTED_MODULE_1__["RobotService"])); };
GuiControlComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GuiControlComponent, selectors: [["gui-control"]], viewQuery: function GuiControlComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_c0, true);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.canvas = _t.first);
    } }, decls: 6, vars: 0, consts: [[1, "card", "m-2"], [1, "card-header"], [1, "mars-canvas"], ["canvas", ""]], template: function GuiControlComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Last known robot position ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "canvas", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".mars-canvas[_ngcontent-%COMP%] {\n  width: 40vw;\n  height: 40vw;\n  background-image: url('mars.svg');\n  background-size: 100%;\n  background-repeat: no-repeat;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImd1aS1jb250cm9sLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGlDQUE0QztFQUM1QyxxQkFBcUI7RUFDckIsNEJBQTRCO0FBQzlCIiwiZmlsZSI6Imd1aS1jb250cm9sLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWFycy1jYW52YXMge1xuICB3aWR0aDogNDB2dztcbiAgaGVpZ2h0OiA0MHZ3O1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJ3NyYy9hc3NldHMvbWFycy5zdmcnKTtcbiAgYmFja2dyb3VuZC1zaXplOiAxMDAlO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GuiControlComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'gui-control',
                templateUrl: './gui-control.component.html',
                styleUrls: ['./gui-control.component.css']
            }]
    }], function () { return [{ type: _services_robot_service__WEBPACK_IMPORTED_MODULE_1__["RobotService"] }]; }, { canvas: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['canvas', { static: true }]
        }] }); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map