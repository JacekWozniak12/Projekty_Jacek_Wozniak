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
System.register("GameObjects", [], function (exports_1, context_1) {
    "use strict";
    var Point, DrawablePoint, Circle, Ball, PlayerControlledBall, Item, Rectangle;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Point = /** @class */ (function () {
                function Point(x, y) {
                    this.x = x;
                    this.y = y;
                }
                Point.prototype.calculateDistance = function (to) {
                    return Math.sqrt(Math.pow(to.x - this.x, 2) + Math.pow(to.y - this.y, 2));
                };
                return Point;
            }());
            exports_1("Point", Point);
            DrawablePoint = /** @class */ (function (_super) {
                __extends(DrawablePoint, _super);
                function DrawablePoint(x, y, ctx) {
                    var _this = _super.call(this, x, y) || this;
                    _this.canvasCTX = ctx;
                    return _this;
                }
                DrawablePoint.prototype.draw = function () {
                    this.canvasCTX.fillRect(25, 25, 100, 100);
                };
                return DrawablePoint;
            }(Point));
            exports_1("DrawablePoint", DrawablePoint);
            Circle = /** @class */ (function (_super) {
                __extends(Circle, _super);
                function Circle(x, y, radius, ctx) {
                    var _this = _super.call(this, x, y, ctx) || this;
                    _this.CIRCLE_CALC = 2 * Math.PI;
                    _this.radius = radius;
                    return _this;
                }
                Circle.prototype.draw = function () {
                    this.canvasCTX.beginPath();
                    this.canvasCTX.arc(this.x, this.y, this.radius, 0, this.CIRCLE_CALC);
                    this.canvasCTX.stroke();
                };
                return Circle;
            }(DrawablePoint));
            exports_1("Circle", Circle);
            Ball = /** @class */ (function (_super) {
                __extends(Ball, _super);
                function Ball(x, y, radius, ctx) {
                    var _this = _super.call(this, x, y, radius, ctx) || this;
                    _this.static = false;
                    _this.weight = 1;
                    _this.speed = 5;
                    _this.destination = new Point(_this.randomizeDestination(1), _this.randomizeDestination(1));
                    return _this;
                }
                Ball.prototype.randomizeDestination = function (x) {
                    return Math.random() * x * this.speed;
                };
                Ball.prototype.calculateCollision = function (physics) {
                    this.move();
                    if (!this.static) {
                        this.calculateCollisionsWithCanvas();
                        this.calculateCollisionsWithGameObject(physics);
                    }
                };
                Ball.prototype.move = function () {
                    this.x += this.destination.x;
                    this.y += this.destination.y;
                };
                Ball.prototype.calculateCollisionsWithGameObject = function (physics) {
                    var _this = this;
                    physics.objectsToHandle.forEach(function (element) {
                        if (_this == element) {
                        }
                        else {
                            var a = element.calculateDistance(new Point(_this.x, _this.y));
                            var b = element;
                            if (Math.abs(a) - _this.radius - b.radius <= 0) {
                                console.log(a);
                                _this.destination.x = _this.clamp(_this.x - element.x, -1, 1);
                                _this.destination.y = _this.clamp(_this.y - element.y, -1, 1);
                            }
                        }
                    });
                };
                Ball.prototype.clamp = function (value, min, max) {
                    if (value < min)
                        return min;
                    if (value > max)
                        return max;
                    return value;
                };
                Ball.prototype.calculateCollisionsWithCanvas = function () {
                    this.HandleXCanvas();
                    this.HandleYCanvas();
                };
                Ball.prototype.HandleYCanvas = function () {
                    if ((this.destination.y + this.y) + this.radius > this.canvasCTX.canvas.height) {
                        this.y = this.canvasCTX.canvas.height - this.radius;
                        this.destination.y = this.randomizeDestination(-1);
                    }
                    else if ((this.destination.y + this.y) - this.radius < 0) {
                        this.y = 0 + this.radius;
                        this.destination.y = this.randomizeDestination(1);
                    }
                };
                Ball.prototype.HandleXCanvas = function () {
                    if ((this.destination.x + this.x) + this.radius > this.canvasCTX.canvas.width) {
                        this.x = this.canvasCTX.canvas.width - this.radius;
                        this.destination.x = this.randomizeDestination(-1);
                    }
                    else if ((this.destination.x + this.x) - this.radius < 0) {
                        this.x = 0 + this.radius;
                        this.destination.x = this.randomizeDestination(1);
                    }
                };
                return Ball;
            }(Circle));
            exports_1("Ball", Ball);
            PlayerControlledBall = /** @class */ (function (_super) {
                __extends(PlayerControlledBall, _super);
                function PlayerControlledBall(x, y, radius, ctx, speed) {
                    var _this = _super.call(this, x, y, radius, ctx) || this;
                    _this.static = false;
                    _this.weight = 1;
                    _this.speed = speed;
                    _this.destination = new Point(0, 0);
                    return _this;
                }
                PlayerControlledBall.prototype.calculateCollision = function (physics) {
                    if (!this.static) {
                        this.calculateCollisionsWithCanvas();
                        this.calculateCollisionsWithGameObject(physics);
                    }
                };
                PlayerControlledBall.prototype.calculateCollisionsWithCanvas = function () {
                    if ((this.destination.x + this.x) + this.radius > this.canvasCTX.canvas.width)
                        this.x = this.canvasCTX.canvas.width - this.radius;
                    else if ((this.destination.x + this.x) - this.radius < 0)
                        this.x = 0 + this.radius;
                    if ((this.destination.y + this.y) + this.radius > this.canvasCTX.canvas.height)
                        this.y = this.canvasCTX.canvas.height - this.radius;
                    else if ((this.destination.y + this.y) - this.radius < 0)
                        this.y = 0 + this.radius;
                };
                PlayerControlledBall.prototype.calculateCollisionsWithGameObject = function (physics) {
                    var _this = this;
                    physics.objectsToHandle.forEach(function (element) {
                        if (_this == element) {
                        }
                        else {
                            var a = element.calculateDistance(new Point(_this.x, _this.y));
                            var b = element;
                            if (Math.abs(a) - _this.radius - b.radius <= 0) {
                                b.destination.x = _this.clamp(element.x - _this.x, -1, 1);
                                b.destination.y = _this.clamp(element.y - _this.y, -1, 1);
                            }
                        }
                    });
                };
                return PlayerControlledBall;
            }(Ball));
            exports_1("PlayerControlledBall", PlayerControlledBall);
            Item = /** @class */ (function (_super) {
                __extends(Item, _super);
                function Item() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Item;
            }(Circle));
            exports_1("Item", Item);
            Rectangle = /** @class */ (function () {
                function Rectangle(X, Y) {
                    this.X = X;
                    this.Y = Y;
                    this.U = new Point(Y.x, X.y);
                    this.V = new Point(X.x, Y.y);
                }
                return Rectangle;
            }());
            exports_1("Rectangle", Rectangle);
        }
    };
});
System.register("Controller", ["GameObjects"], function (exports_2, context_2) {
    "use strict";
    var GameObjects_1, Controller;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (GameObjects_1_1) {
                GameObjects_1 = GameObjects_1_1;
            }
        ],
        execute: function () {
            Controller = /** @class */ (function () {
                function Controller(x, y) {
                    var _this = this;
                    this.playerControlledBall =
                        new GameObjects_1.PlayerControlledBall(x, y, 50, null, 0.01);
                    window.
                        addEventListener('deviceorientation', (function (event) {
                        _this.onDeviceOrientationChange(event);
                    }), true);
                }
                Controller.prototype.setCanvasCTX = function (canvasCTX) {
                    this.playerControlledBall.canvasCTX = canvasCTX;
                };
                Controller.prototype.onDeviceOrientationChange = function (e) {
                    console.log(this);
                    this.playerControlledBall.destination =
                        new GameObjects_1.Point((e.alpha) * this.playerControlledBall.speed * 4, (e.beta - 75) * this.playerControlledBall.speed * 6);
                };
                Controller.prototype.update = function () {
                    this.playerControlledBall.x += this.playerControlledBall.destination.x;
                    this.playerControlledBall.y += this.playerControlledBall.destination.y;
                };
                return Controller;
            }());
            exports_2("Controller", Controller);
        }
    };
});
System.register("Timer", [], function (exports_3, context_3) {
    "use strict";
    var Timer;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            Timer = /** @class */ (function () {
                function Timer() {
                }
                Timer.prototype.AddTime = function (value) {
                    this.timeLeft += value;
                    return this.timeLeft;
                };
                return Timer;
            }());
            exports_3("Timer", Timer);
        }
    };
});
System.register("Renderer", [], function (exports_4, context_4) {
    "use strict";
    var Renderer;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            Renderer = /** @class */ (function () {
                function Renderer(canvasName) {
                    this.screenSize = { x: 800, y: 600 };
                    this.getCanvas(canvasName);
                    this.setCanvasSize();
                    this.objectsToDraw = new Array();
                }
                Renderer.prototype.getCanvas = function (canvasName) {
                    this.canvas = document.querySelector("#" + canvasName);
                    this.canvasCTX = this.canvas.getContext('2d');
                };
                Renderer.prototype.setCanvasSize = function () {
                    this.canvas.width = this.screenSize.x;
                    this.canvas.height = this.screenSize.y;
                };
                Renderer.prototype.addObjectToDraw = function (object) {
                    this.objectsToDraw.push(object);
                };
                Renderer.prototype.start = function () {
                    var _this = this;
                    this.objectsToDraw.forEach(function (element) {
                        element.canvasCTX = _this.canvasCTX;
                    });
                };
                Renderer.prototype.update = function () {
                    this.refresh();
                    this.objectsToDraw.forEach(function (element) {
                        element.draw();
                    });
                };
                ;
                Renderer.prototype.refresh = function () {
                    this.canvasCTX.
                        clearRect(0, 0, this.screenSize.x, this.screenSize.y);
                };
                return Renderer;
            }());
            exports_4("Renderer", Renderer);
        }
    };
});
System.register("Generator", [], function (exports_5, context_5) {
    "use strict";
    var Generator;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
            Generator = /** @class */ (function () {
                function Generator() {
                }
                Generator.prototype.generate = function (amount) {
                    while (amount > 0) {
                        amount--;
                        alert(amount);
                    }
                };
                Generator.prototype.spawnPlayer = function (position) {
                };
                return Generator;
            }());
            exports_5("Generator", Generator);
        }
    };
});
System.register("Game", ["Controller", "Timer", "Renderer", "Generator", "GameObjects"], function (exports_6, context_6) {
    "use strict";
    var Controller_1, Timer_1, Renderer_1, Generator_1, GameObjects_2, Game, Physics;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (Controller_1_1) {
                Controller_1 = Controller_1_1;
            },
            function (Timer_1_1) {
                Timer_1 = Timer_1_1;
            },
            function (Renderer_1_1) {
                Renderer_1 = Renderer_1_1;
            },
            function (Generator_1_1) {
                Generator_1 = Generator_1_1;
            },
            function (GameObjects_2_1) {
                GameObjects_2 = GameObjects_2_1;
            }
        ],
        execute: function () {
            Game = /** @class */ (function () {
                function Game() {
                    this.state = {
                        MENU: 0, RUNNING: 1, WON: 2, LOST: 3
                    };
                    this.renderer = new Renderer_1.Renderer("gameView");
                    this.timer = new Timer_1.Timer();
                    this.physics = new Physics();
                    this.controller = new Controller_1.Controller(this.renderer.screenSize.x / 2, this.renderer.screenSize.y / 2);
                    this.controller.setCanvasCTX(this.renderer.canvasCTX);
                    this.renderer.addObjectToDraw(this.controller.playerControlledBall);
                    this.physics.addObjectToHandle(this.controller.playerControlledBall);
                    var ball = new GameObjects_2.Ball(5, 5, 10, this.renderer.canvasCTX);
                    this.renderer.addObjectToDraw(ball);
                    this.physics.addObjectToHandle(ball);
                    this.generator = new Generator_1.Generator();
                }
                Game.prototype.start = function () {
                    this.update();
                };
                Game.prototype.update = function () {
                    this.controller.update();
                    this.physics.update();
                    this.renderer.update();
                    window.requestAnimationFrame(this.update.bind(this));
                };
                return Game;
            }());
            exports_6("Game", Game);
            Physics = /** @class */ (function () {
                function Physics() {
                    this.objectsToHandle = new Array();
                }
                Physics.prototype.addObjectToHandle = function (object) {
                    this.objectsToHandle.push(object);
                };
                Physics.prototype.update = function () {
                    var _this = this;
                    this.objectsToHandle.forEach(function (element) {
                        element.calculateCollision(_this);
                    });
                };
                ;
                return Physics;
            }());
            exports_6("Physics", Physics);
        }
    };
});
System.register("App", ["Game"], function (exports_7, context_7) {
    "use strict";
    var Game_1;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (Game_1_1) {
                Game_1 = Game_1_1;
            }
        ],
        execute: function () {
            window.onload = function () {
                var game = new Game_1.Game();
                game.start();
            };
        }
    };
});
//# sourceMappingURL=App.js.map