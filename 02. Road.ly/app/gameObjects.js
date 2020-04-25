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
//# sourceMappingURL=gameObjects.js.map