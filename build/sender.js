"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var libphonenumber_js_1 = require("libphonenumber-js");
var venom_bot_1 = require("venom-bot");
var Sender = /** @class */ (function () {
    function Sender() {
        this.receiverSuffix = "@c.us";
        this.connected = false;
        this.initialize();
    }
    Sender.prototype.initialize = function () {
        var _this = this;
        var qrCode = function (base64QrImg, asciiQr, attempts, urlCode) {
            _this.qrCode = { base64QrImg: base64QrImg, asciiQr: asciiQr, attempts: attempts, urlCode: urlCode };
        };
        var status = function (statusSession) {
            var on = ['isLogged', 'qrReadSuccess', 'chatsAvailable'];
            _this.connected = on.includes(statusSession);
        };
        var start = function (client) {
            _this.client = client;
            _this.client.onStateChange(function (state) {
                console.log({ state: state });
                _this.connected = state === venom_bot_1.SocketState.CONNECTED;
            });
        };
        (0, venom_bot_1.create)('push-notification', qrCode, status)
            .then(function (client) { return start(client); })
            .catch(console.error);
    };
    Object.defineProperty(Sender.prototype, "qr", {
        get: function () {
            return this.qrCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sender.prototype, "isConnected", {
        get: function () {
            return this.connected;
        },
        enumerable: false,
        configurable: true
    });
    Sender.prototype.sendText = function (to, body) {
        return __awaiter(this, void 0, void 0, function () {
            var phoneNumber, send;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(0, libphonenumber_js_1.isValidNumber)(to, "BR")) {
                            throw new Error("Invalid phone number");
                        }
                        phoneNumber = (0, libphonenumber_js_1.parsePhoneNumber)(to, "BR").format('E.164').replace('+', '');
                        phoneNumber = phoneNumber.includes(this.receiverSuffix)
                            ? phoneNumber
                            : "".concat(phoneNumber).concat(this.receiverSuffix);
                        return [4 /*yield*/, this.client.sendText(phoneNumber, body)];
                    case 1:
                        send = _a.sent();
                        return [2 /*return*/, send];
                }
            });
        });
    };
    Sender.prototype.sendClause = function (to) {
        return __awaiter(this, void 0, void 0, function () {
            var phoneNumber, send;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(0, libphonenumber_js_1.isValidNumber)(to, "BR")) {
                            throw new Error("Invalid phone number");
                        }
                        phoneNumber = (0, libphonenumber_js_1.parsePhoneNumber)(to, "BR").format('E.164').replace('+', '');
                        phoneNumber = phoneNumber.includes(this.receiverSuffix)
                            ? phoneNumber
                            : "".concat(phoneNumber).concat(this.receiverSuffix);
                        return [4 /*yield*/, this.client.sendFile(phoneNumber, './src/assets/clausula_garantti.doc', 'Clausula Garantti', 'text/plain')];
                    case 1:
                        send = _a.sent();
                        return [2 /*return*/, send];
                }
            });
        });
    };
    return Sender;
}());
exports.default = Sender;
