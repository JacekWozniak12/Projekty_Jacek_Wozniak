var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game = /** @class */ (function () {
    function Game() {
        this.timer = new Timer();
        this.controller = new Controller();
    }
    Game.prototype.Start = function () {
        // generate level
        this.GameLoop();
    };
    Game.prototype.GameLoop = function () {
        window.requestAnimationFrame(this.GameLoop);
    };
    Game.prototype.Finish = function () {
        // handle finish state
    };
    Game.prototype.Pause = function () {
    };
    return Game;
}());
var Renderer = /** @class */ (function () {
    function Renderer() {
    }
    return Renderer;
}());
var Controller = /** @class */ (function () {
    function Controller() {
        this.PlayerControlledBall = { x: 0, y: 0, radius: 10, speed: 1 };
        window.addEventListener('deviceorientation', this.onDeviceOrientationChange);
    }
    Controller.prototype.onDeviceOrientationChange = function (e) {
        this.ConsoleLogData(e);
    };
    Controller.prototype.ConsoleLogData = function (e) {
        console.log(e.alpha, e.beta, e.gamma);
    };
    return Controller;
}());
var Point = /** @class */ (function () {
    function Point() {
    }
    Point.prototype.CalculateDistance = function (to) {
        return 0;
    };
    return Point;
}());
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Circle;
}(Point));
var PlayerControlledBall = /** @class */ (function (_super) {
    __extends(PlayerControlledBall, _super);
    function PlayerControlledBall() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PlayerControlledBall;
}(Circle));
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Item;
}(Circle));
var Timer = /** @class */ (function () {
    function Timer() {
    }
    Timer.prototype.AddTime = function (value) {
        this.timeLeft += value;
        return this.timeLeft;
    };
    return Timer;
}());
//# sourceMappingURL=game.js.map