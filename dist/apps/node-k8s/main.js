/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const app_controller_1 = __webpack_require__(5);
const app_service_1 = __webpack_require__(8);
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(app_service_1.BodyLoggerMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const db_actions_sdk_1 = __webpack_require__(6);
const app_service_1 = __webpack_require__(8);
const express_1 = __webpack_require__(12);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
        this.db = appService.db();
    }
    getData() {
        return this.appService.getData();
    }
    async getAllUsers(request) {
        common_1.Logger.debug('request body => ', request.body);
        common_1.Logger.log('Request headers => ', request.headers);
    }
    async createNewUser(body, res) {
        try {
            const { username, password } = body;
            const already_user = await this.db.users.findUnique({
                where: { username: username },
            });
            if (already_user)
                throw new Error('A_USER_WITH_THIS_USERNAME_ALREADY_EXISTS');
            const new_user = await this.db.users.create({
                data: {
                    username: username,
                    password: password,
                },
            });
            await this.db.carts.create({
                data: {
                    user_id: new_user.id,
                },
            });
            const auth_token = this.appService.createAuthToken({
                id: new_user.id,
                username: new_user.username,
                role: 'user',
                'https://hasura.io/jwt/claims': {
                    'x-hasura-user-id': new_user.id,
                    'x-hasura-default-role': 'user',
                    'x-hasura-role': 'user',
                },
            }, process.env.JWT_TOKEN);
            return res.json({ accessToken: auth_token });
        }
        catch (err) {
            const error = err;
            res.statusCode = 400;
            return res.json({
                message: error.message,
                extensions: { path: 'users', code: 400 },
            });
        }
    }
    async login(body, res) {
        try {
            const { username, password } = body;
            const already_user = await this.db.users.findUnique({
                where: { username: username, password: password },
            });
            if (!already_user)
                throw new Error('NO_USER_EXISTS_WITH_THIS_USERNAME_AND_PASSWORD');
            const auth_token = this.appService.createAuthToken({
                id: already_user.id,
                username: already_user.username,
                role: 'user',
                'https://hasura.io/jwt/claims': {
                    'x-hasura-user-id': already_user.id,
                    'x-hasura-default-role': 'user',
                    'x-hasura-role': 'user',
                },
            }, process.env.JWT_TOKEN);
            return res.json({ accessToken: auth_token });
        }
        catch (err) {
            const error = err;
            res.statusCode = 400;
            return res.json({
                message: error.message,
                extensions: { path: 'users', code: 400 },
            });
        }
    }
};
exports.AppController = AppController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
tslib_1.__decorate([
    (0, common_1.Get)('/users'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof Request !== "undefined" && Request) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "getAllUsers", null);
tslib_1.__decorate([
    (0, common_1.Post)('/new-user'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof db_actions_sdk_1.Create_New_User_In !== "undefined" && db_actions_sdk_1.Create_New_User_In) === "function" ? _c : Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AppController.prototype, "createNewUser", null);
tslib_1.__decorate([
    (0, common_1.Post)('/login'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof db_actions_sdk_1.Login_In !== "undefined" && db_actions_sdk_1.Login_In) === "function" ? _f : Object, typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], AppController.prototype, "login", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(7), exports);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BodyLoggerMiddleware = exports.AppService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const client_1 = __webpack_require__(9);
const lodash_1 = __webpack_require__(10);
const jwt = tslib_1.__importStar(__webpack_require__(11));
let AppService = class AppService {
    getData() {
        return { message: 'Hello API' };
    }
    db() {
        const db = new client_1.PrismaClient();
        return db;
    }
    createAuthToken(data, token) {
        try {
            const payload = {
                id: data.id,
                username: data.username,
                role: data.role,
                'https://hasura.io/jwt/claims': {
                    'x-hasura-user-id': data.id,
                    'x-hasura-default-role': data.role,
                    'x-hasura-role': data.role,
                    'x-hasura-allowed-roles': ['user'],
                },
            };
            const authToken = jwt.sign(payload, token, {
                expiresIn: '1d',
            });
            return authToken;
        }
        catch (e) {
            console.log('error', e);
            return e.message;
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);
let BodyLoggerMiddleware = class BodyLoggerMiddleware {
    use(req, res, next) {
        req.body = (0, lodash_1.get)(req.body, 'input.input');
        next();
    }
};
exports.BodyLoggerMiddleware = BodyLoggerMiddleware;
exports.BodyLoggerMiddleware = BodyLoggerMiddleware = tslib_1.__decorate([
    (0, common_1.Injectable)()
], BodyLoggerMiddleware);


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("express");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;