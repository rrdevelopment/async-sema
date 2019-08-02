'use strict';
var __extends =
	(this && this.__extends) ||
	(function() {
		var extendStatics = function(d, b) {
			extendStatics =
				Object.setPrototypeOf ||
				({ __proto__: [] } instanceof Array &&
					function(d, b) {
						d.__proto__ = b;
					}) ||
				function(d, b) {
					for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
				};
			return extendStatics(d, b);
		};
		return function(d, b) {
			extendStatics(d, b);
			function __() {
				this.constructor = d;
			}
			d.prototype =
				b === null
					? Object.create(b)
					: ((__.prototype = b.prototype), new __());
		};
	})();
var __awaiter =
	(this && this.__awaiter) ||
	function(thisArg, _arguments, P, generator) {
		return new (P || (P = Promise))(function(resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: new P(function(resolve) {
							resolve(result.value);
					  }).then(fulfilled, rejected);
			}
			step(
				(generator = generator.apply(thisArg, _arguments || [])).next()
			);
		});
	};
var __generator =
	(this && this.__generator) ||
	function(thisArg, body) {
		var _ = {
				label: 0,
				sent: function() {
					if (t[0] & 1) throw t[1];
					return t[1];
				},
				trys: [],
				ops: []
			},
			f,
			y,
			t,
			g;
		return (
			(g = { next: verb(0), throw: verb(1), return: verb(2) }),
			typeof Symbol === 'function' &&
				(g[Symbol.iterator] = function() {
					return this;
				}),
			g
		);
		function verb(n) {
			return function(v) {
				return step([n, v]);
			};
		}
		function step(op) {
			if (f) throw new TypeError('Generator is already executing.');
			while (_)
				try {
					if (
						((f = 1),
						y &&
							(t =
								op[0] & 2
									? y['return']
									: op[0]
									? y['throw'] ||
									  ((t = y['return']) && t.call(y), 0)
									: y.next) &&
							!(t = t.call(y, op[1])).done)
					)
						return t;
					if (((y = 0), t)) op = [op[0] & 2, t.value];
					switch (op[0]) {
						case 0:
						case 1:
							t = op;
							break;
						case 4:
							_.label++;
							return { value: op[1], done: false };
						case 5:
							_.label++;
							y = op[1];
							op = [0];
							continue;
						case 7:
							op = _.ops.pop();
							_.trys.pop();
							continue;
						default:
							if (
								!((t = _.trys),
								(t = t.length > 0 && t[t.length - 1])) &&
								(op[0] === 6 || op[0] === 2)
							) {
								_ = 0;
								continue;
							}
							if (
								op[0] === 3 &&
								(!t || (op[1] > t[0] && op[1] < t[3]))
							) {
								_.label = op[1];
								break;
							}
							if (op[0] === 6 && _.label < t[1]) {
								_.label = t[1];
								t = op;
								break;
							}
							if (t && _.label < t[2]) {
								_.label = t[2];
								_.ops.push(op);
								break;
							}
							if (t[2]) _.ops.pop();
							_.trys.pop();
							continue;
					}
					op = body.call(thisArg, _);
				} catch (e) {
					op = [6, e];
					y = 0;
				} finally {
					f = t = 0;
				}
			if (op[0] & 5) throw op[1];
			return { value: op[0] ? op[1] : void 0, done: true };
		}
	};
var __importDefault =
	(this && this.__importDefault) ||
	function(mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
var events_1 = __importDefault(require('events'));
function arrayMove(src, srcIndex, dst, dstIndex, len) {
	for (var j = 0; j < len; ++j) {
		dst[j + dstIndex] = src[j + srcIndex];
		src[j + srcIndex] = void 0;
	}
}
function pow2AtLeast(n) {
	n = n >>> 0;
	n = n - 1;
	n = n | (n >> 1);
	n = n | (n >> 2);
	n = n | (n >> 4);
	n = n | (n >> 8);
	n = n | (n >> 16);
	return n + 1;
}
function getCapacity(capacity) {
	return pow2AtLeast(Math.min(Math.max(16, capacity), 1073741824));
}
// Deque is based on https://github.com/petkaantonov/deque/blob/master/js/deque.js
// Released under the MIT License: https://github.com/petkaantonov/deque/blob/6ef4b6400ad3ba82853fdcc6531a38eb4f78c18c/LICENSE
var Deque = /** @class */ (function() {
	function Deque(capacity) {
		this._capacity = getCapacity(capacity);
		this._length = 0;
		this._front = 0;
		this.arr = [];
	}
	Deque.prototype.push = function(item) {
		var length = this._length;
		this.checkCapacity(length + 1);
		var i = (this._front + length) & (this._capacity - 1);
		this.arr[i] = item;
		this._length = length + 1;
		return length + 1;
	};
	Deque.prototype.pop = function() {
		var length = this._length;
		if (length === 0) {
			return void 0;
		}
		var i = (this._front + length - 1) & (this._capacity - 1);
		var ret = this.arr[i];
		this.arr[i] = void 0;
		this._length = length - 1;
		return ret;
	};
	Deque.prototype.shift = function() {
		var length = this._length;
		if (length === 0) {
			return void 0;
		}
		var front = this._front;
		var ret = this.arr[front];
		this.arr[front] = void 0;
		this._front = (front + 1) & (this._capacity - 1);
		this._length = length - 1;
		return ret;
	};
	Object.defineProperty(Deque.prototype, 'length', {
		get: function() {
			return this._length;
		},
		enumerable: true,
		configurable: true
	});
	Deque.prototype.checkCapacity = function(size) {
		if (this._capacity < size) {
			this.resizeTo(getCapacity(this._capacity * 1.5 + 16));
		}
	};
	Deque.prototype.resizeTo = function(capacity) {
		var oldCapacity = this._capacity;
		this._capacity = capacity;
		var front = this._front;
		var length = this._length;
		if (front + length > oldCapacity) {
			var moveItemsCount = (front + length) & (oldCapacity - 1);
			arrayMove(this.arr, 0, this.arr, oldCapacity, moveItemsCount);
		}
	};
	return Deque;
})();
var ReleaseEmitter = /** @class */ (function(_super) {
	__extends(ReleaseEmitter, _super);
	function ReleaseEmitter() {
		return (_super !== null && _super.apply(this, arguments)) || this;
	}
	return ReleaseEmitter;
})(events_1.default);
function isFn(x) {
	return typeof x === 'function';
}
function defaultInit() {
	return '1';
}
var Sema = /** @class */ (function() {
	function Sema(nr, _a) {
		var _b = _a === void 0 ? {} : _a,
			_c = _b.initFn,
			initFn = _c === void 0 ? defaultInit : _c,
			pauseFn = _b.pauseFn,
			resumeFn = _b.resumeFn,
			_d = _b.capacity,
			capacity = _d === void 0 ? 10 : _d;
		var _this = this;
		if (isFn(pauseFn) !== isFn(resumeFn)) {
			throw new Error(
				'pauseFn and resumeFn must be both set for pausing'
			);
		}
		this.nrTokens = nr;
		this.free = new Deque(nr);
		this.waiting = new Deque(capacity);
		this.releaseEmitter = new ReleaseEmitter();
		this.noTokens = initFn === defaultInit;
		this.pauseFn = pauseFn;
		this.resumeFn = resumeFn;
		this.paused = false;
		this.releaseEmitter.on('release', function(token) {
			var p = _this.waiting.shift();
			if (p) {
				p.resolve(token);
			} else {
				if (_this.resumeFn && _this.paused) {
					_this.paused = false;
					_this.resumeFn();
				}
				_this.free.push(token);
			}
		});
		for (var i = 0; i < nr; i++) {
			this.free.push(initFn());
		}
	}
	Sema.prototype.acquire = function() {
		return __awaiter(this, void 0, void 0, function() {
			var token;
			var _this = this;
			return __generator(this, function(_a) {
				token = this.free.pop();
				if (token !== void 0) {
					return [2 /*return*/, token];
				}
				return [
					2 /*return*/,
					new Promise(function(resolve, reject) {
						if (_this.pauseFn && !_this.paused) {
							_this.paused = true;
							_this.pauseFn();
						}
						_this.waiting.push({
							resolve: resolve,
							reject: reject
						});
					})
				];
			});
		});
	};
	Sema.prototype.release = function(token) {
		this.releaseEmitter.emit('release', this.noTokens ? '1' : token);
	};
	Sema.prototype.drain = function() {
		var a = new Array(this.nrTokens);
		for (var i = 0; i < this.nrTokens; i++) {
			a[i] = this.acquire();
		}
		return Promise.all(a);
	};
	Sema.prototype.nrWaiting = function() {
		return this.waiting.length;
	};
	return Sema;
})();
exports.Sema = Sema;
function RateLimit(rps, _a) {
	var _b = _a === void 0 ? {} : _a,
		_c = _b.timeUnit,
		timeUnit = _c === void 0 ? 1000 : _c,
		_d = _b.uniformDistribution,
		uniformDistribution = _d === void 0 ? false : _d;
	var sema = new Sema(uniformDistribution ? 1 : rps);
	var delay = uniformDistribution ? timeUnit / rps : timeUnit;
	return function rl() {
		return __awaiter(this, void 0, void 0, function() {
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						return [4 /*yield*/, sema.acquire()];
					case 1:
						_a.sent();
						setTimeout(function() {
							return sema.release();
						}, delay);
						return [2 /*return*/];
				}
			});
		});
	};
}
exports.RateLimit = RateLimit;
