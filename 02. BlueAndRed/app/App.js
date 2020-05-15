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
System.register("Physics", [], function (exports_1, context_1) {
    "use strict";
    var Physics;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
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
            exports_1("Physics", Physics);
        }
    };
});
System.register("GameObjects", [], function (exports_2, context_2) {
    "use strict";
    var Point, DrawablePoint, Circle, GameBall, PlayerControlledBall, Item, Rectangle;
    var __moduleName = context_2 && context_2.id;
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
            exports_2("Point", Point);
            DrawablePoint = /** @class */ (function (_super) {
                __extends(DrawablePoint, _super);
                function DrawablePoint(x, y, ctx) {
                    var _this = _super.call(this, x, y) || this;
                    _this.colorValue = "#ccc";
                    _this.canvasCTX = ctx;
                    return _this;
                }
                DrawablePoint.prototype.draw = function () {
                    this.canvasCTX.fillStyle = this.colorValue;
                    this.canvasCTX.fillRect(1, 1, 1, 1);
                };
                return DrawablePoint;
            }(Point));
            exports_2("DrawablePoint", DrawablePoint);
            Circle = /** @class */ (function (_super) {
                __extends(Circle, _super);
                function Circle(x, y, radius, ctx) {
                    var _this = _super.call(this, x, y, ctx) || this;
                    _this.CIRCLE_CALC = 2 * Math.PI;
                    _this.colorValue = "#000";
                    _this.redValue = "#a00";
                    _this.blueValue = "#00a";
                    _this.radius = radius;
                    return _this;
                }
                Circle.prototype.draw = function () {
                    this.canvasCTX.beginPath();
                    this.canvasCTX.arc(this.x, this.y, this.radius, 0, this.CIRCLE_CALC);
                    this.canvasCTX.stroke();
                    this.canvasCTX.fillStyle = this.colorValue;
                    this.canvasCTX.fill();
                };
                return Circle;
            }(DrawablePoint));
            exports_2("Circle", Circle);
            GameBall = /** @class */ (function (_super) {
                __extends(GameBall, _super);
                function GameBall(x, y, radius, ctx) {
                    var _this = _super.call(this, x, y, radius, ctx) || this;
                    _this.static = false;
                    _this.weight = 1;
                    _this.speed = 5;
                    _this.defeated = false;
                    _this.destination = new Point(_this.randomizeDestination(1), _this.randomizeDestination(1));
                    return _this;
                }
                GameBall.prototype.randomizeDestination = function (x) {
                    return Math.random() * x * this.speed;
                };
                GameBall.prototype.calculateCollision = function (physics) {
                    this.move();
                    if (!this.static) {
                        this.calculateCollisionsWithCanvas();
                        this.calculateCollisionsWithGameObject(physics);
                    }
                };
                GameBall.prototype.move = function () {
                    this.x += this.destination.x;
                    this.y += this.destination.y;
                };
                GameBall.prototype.calculateCollisionsWithGameObject = function (physics) {
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
                GameBall.prototype.clamp = function (value, min, max) {
                    if (value < min)
                        return min;
                    if (value > max)
                        return max;
                    return value;
                };
                GameBall.prototype.calculateCollisionsWithCanvas = function () {
                    this.HandleXCanvas();
                    this.HandleYCanvas();
                };
                GameBall.prototype.HandleYCanvas = function () {
                    if ((this.destination.y + this.y) + this.radius > this.canvasCTX.canvas.height) {
                        this.y = this.canvasCTX.canvas.height - this.radius;
                        this.destination.y = this.randomizeDestination(-1);
                    }
                    else if ((this.destination.y + this.y) - this.radius < 0) {
                        this.y = 0 + this.radius;
                        this.destination.y = this.randomizeDestination(1);
                    }
                };
                GameBall.prototype.HandleXCanvas = function () {
                    if ((this.destination.x + this.x) + this.radius > this.canvasCTX.canvas.width) {
                        this.x = this.canvasCTX.canvas.width - this.radius;
                        this.destination.x = this.randomizeDestination(-1);
                    }
                    else if ((this.destination.x + this.x) - this.radius < 0) {
                        this.x = 0 + this.radius;
                        this.destination.x = this.randomizeDestination(1);
                    }
                };
                GameBall.prototype.randomizeColor = function () {
                    if (this.defeated) {
                        return;
                    }
                    else
                        switch (Math.round(Math.random())) {
                            case 0:
                                this.setColor(this.redValue);
                                break;
                            case 1:
                                this.setColor(this.blueValue);
                                break;
                            default: return;
                        }
                };
                GameBall.prototype.setColor = function (colorValue) {
                    this.colorValue = colorValue;
                };
                return GameBall;
            }(Circle));
            exports_2("GameBall", GameBall);
            PlayerControlledBall = /** @class */ (function (_super) {
                __extends(PlayerControlledBall, _super);
                function PlayerControlledBall(x, y, radius, ctx, speed) {
                    var _this = _super.call(this, x, y, radius, ctx) || this;
                    _this.static = false;
                    _this.weight = 1;
                    _this.eaten = 0;
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
                                _this.eat(b);
                            }
                        }
                    });
                };
                PlayerControlledBall.prototype.eat = function (ball) {
                    if (this.colorValue == ball.colorValue && ball.defeated == false) {
                        ball.defeated = true;
                        ball.setColor("#fff");
                        this.eaten++;
                    }
                    else {
                        if (ball.defeated == false)
                            this.defeated = true;
                    }
                };
                return PlayerControlledBall;
            }(GameBall));
            exports_2("PlayerControlledBall", PlayerControlledBall);
            Item = /** @class */ (function (_super) {
                __extends(Item, _super);
                function Item() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Item;
            }(Circle));
            exports_2("Item", Item);
            Rectangle = /** @class */ (function () {
                function Rectangle(X, Y) {
                    this.X = X;
                    this.Y = Y;
                    this.U = new Point(Y.x, X.y);
                    this.V = new Point(X.x, Y.y);
                }
                return Rectangle;
            }());
            exports_2("Rectangle", Rectangle);
        }
    };
});
System.register("Controller", ["GameObjects"], function (exports_3, context_3) {
    "use strict";
    var GameObjects_1, Controller;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (GameObjects_1_1) {
                GameObjects_1 = GameObjects_1_1;
            }
        ],
        execute: function () {
            Controller = /** @class */ (function () {
                function Controller(canvasCTX) {
                    var _this = this;
                    this.playerControlledBall = new GameObjects_1.PlayerControlledBall(canvasCTX.canvas.width / 2, canvasCTX.canvas.height / 2, 30, canvasCTX, 0.1);
                    window.
                        addEventListener('deviceorientation', (function (event) {
                        _this.onDeviceOrientationChange(event);
                    }), true);
                }
                Controller.prototype.onDeviceOrientationChange = function (e) {
                    this.playerControlledBall.destination =
                        new GameObjects_1.Point(e.alpha * this.playerControlledBall.speed, e.beta * this.playerControlledBall.speed);
                };
                Controller.prototype.update = function () {
                    this.playerControlledBall.x += this.playerControlledBall.destination.x;
                    this.playerControlledBall.y += this.playerControlledBall.destination.y;
                };
                return Controller;
            }());
            exports_3("Controller", Controller);
        }
    };
});
System.register("Timer", [], function (exports_4, context_4) {
    "use strict";
    var Timer;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            Timer = /** @class */ (function () {
                function Timer() {
                }
                Timer.prototype.update = function () {
                    this.deltaTime = (Date.now() - this.previousDate) / 1000;
                    this.previousDate = Date.now();
                };
                Timer.prototype.addTime = function (value) {
                    this.timeLeft += value;
                    return this.timeLeft;
                };
                return Timer;
            }());
            exports_4("Timer", Timer);
        }
    };
});
System.register("Renderer", [], function (exports_5, context_5) {
    "use strict";
    var Renderer;
    var __moduleName = context_5 && context_5.id;
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
            exports_5("Renderer", Renderer);
        }
    };
});
System.register("Game", ["Controller", "Timer", "Renderer", "GameObjects", "Physics"], function (exports_6, context_6) {
    "use strict";
    var Controller_1, Timer_1, Renderer_1, GameObjects_2, Physics_1, State, Game;
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
            function (GameObjects_2_1) {
                GameObjects_2 = GameObjects_2_1;
            },
            function (Physics_1_1) {
                Physics_1 = Physics_1_1;
            }
        ],
        execute: function () {
            (function (State) {
                State[State["MENU"] = 0] = "MENU";
                State[State["RUNNING"] = 1] = "RUNNING";
                State[State["WON"] = 2] = "WON";
                State[State["LOST"] = 3] = "LOST";
            })(State || (State = {}));
            exports_6("State", State);
            Game = /** @class */ (function () {
                function Game() {
                    this.state = State.RUNNING;
                    this.todefeat = 0;
                    this.timeDisplay = "timer";
                    this.timeBeforeChangeDisplay = "timer2";
                    this.result = "result";
                    this.rendererDisplay = "gameView";
                    this.timePassed = 0;
                    this.setup();
                }
                Game.prototype.setup = function () {
                    this.renderer = new Renderer_1.Renderer(this.rendererDisplay);
                    this.element_timeBeforeChangeDisplay = document.
                        querySelector("#" + this.timeBeforeChangeDisplay);
                    this.element_timeDisplay = document.
                        querySelector("#" + this.timeDisplay);
                    this.element_result = document.
                        querySelector("#" + this.result);
                    this.timer = new Timer_1.Timer();
                    this.physics = new Physics_1.Physics();
                    for (var i = 20; i < 200; i += 20) {
                        this.AddBall(i, i);
                        this.todefeat++;
                    }
                    this.controller = new Controller_1.Controller(this.renderer.canvasCTX);
                    this.renderer.addObjectToDraw(this.controller.playerControlledBall);
                    this.physics.addObjectToHandle(this.controller.playerControlledBall);
                };
                Game.prototype.AddBall = function (x, y) {
                    var ball = new GameObjects_2.GameBall(x, y, 10, this.renderer.canvasCTX);
                    this.renderer.addObjectToDraw(ball);
                    this.physics.addObjectToHandle(ball);
                };
                Game.prototype.start = function () {
                    this.howLongSinceColorChanged = 0;
                    this.RandomizeColorOnObjects();
                    this.update();
                };
                Game.prototype.restart = function () {
                    this.setup();
                };
                Game.prototype.update = function () {
                    if (this.state === State.RUNNING) {
                        this.timer.update();
                        this.objectColors();
                        this.controller.update();
                        this.physics.update();
                        this.renderer.update();
                        this.checkWinConditions();
                        this.checkLoseConditions();
                        if (isNaN(this.timePassed))
                            this.timePassed = 0;
                        this.timePassed += this.timer.deltaTime;
                        this.element_timeDisplay.innerHTML = "" + this.timePassed.toFixed(1);
                        window.requestAnimationFrame(this.update.bind(this));
                    }
                };
                Game.prototype.checkWinConditions = function () {
                    if (this.controller.playerControlledBall.eaten >= this.todefeat) {
                        this.state = State.WON;
                        this.element_result.innerHTML = "Won";
                    }
                };
                Game.prototype.checkLoseConditions = function () {
                    if (this.controller.playerControlledBall.defeated == true) {
                        this.state = State.LOST;
                        this.element_result.innerHTML = "Lost";
                    }
                };
                Game.prototype.objectColors = function () {
                    if (isNaN(this.howLongSinceColorChanged)) {
                        this.howLongSinceColorChanged = 0;
                    }
                    if (this.howLongSinceColorChanged >= 10) {
                        this.RandomizeColorOnObjects();
                        this.howLongSinceColorChanged = 0;
                    }
                    else
                        this.howLongSinceColorChanged = this.howLongSinceColorChanged + this.timer.deltaTime;
                    var b = 10 - this.howLongSinceColorChanged;
                    this.element_timeBeforeChangeDisplay.innerHTML = b.toFixed(2) + "";
                };
                Game.prototype.RandomizeColorOnObjects = function () {
                    this.renderer.objectsToDraw.forEach(function (element) {
                        var b = element;
                        b.randomizeColor();
                    });
                };
                Game.prototype.pause = function () {
                    if (this.state === State.RUNNING)
                        this.state = State.MENU;
                    else
                        this.state = State.RUNNING;
                };
                return Game;
            }());
            exports_6("Game", Game);
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