"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/candidate/profile/route";
exports.ids = ["app/api/candidate/profile/route"];
exports.modules = {

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "worker_threads":
/*!*********************************!*\
  !*** external "worker_threads" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("worker_threads");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:stream");

/***/ }),

/***/ "node:stream/web":
/*!**********************************!*\
  !*** external "node:stream/web" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("node:stream/web");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcandidate%2Fprofile%2Froute&page=%2Fapi%2Fcandidate%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcandidate%2Fprofile%2Froute.ts&appDir=D%3A%5CJobPortal%5Cnexushire%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CJobPortal%5Cnexushire&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcandidate%2Fprofile%2Froute&page=%2Fapi%2Fcandidate%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcandidate%2Fprofile%2Froute.ts&appDir=D%3A%5CJobPortal%5Cnexushire%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CJobPortal%5Cnexushire&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_JobPortal_nexushire_app_api_candidate_profile_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/candidate/profile/route.ts */ \"(rsc)/./app/api/candidate/profile/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/candidate/profile/route\",\n        pathname: \"/api/candidate/profile\",\n        filename: \"route\",\n        bundlePath: \"app/api/candidate/profile/route\"\n    },\n    resolvedPagePath: \"D:\\\\JobPortal\\\\nexushire\\\\app\\\\api\\\\candidate\\\\profile\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_JobPortal_nexushire_app_api_candidate_profile_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/candidate/profile/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZjYW5kaWRhdGUlMkZwcm9maWxlJTJGcm91dGUmcGFnZT0lMkZhcGklMkZjYW5kaWRhdGUlMkZwcm9maWxlJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGY2FuZGlkYXRlJTJGcHJvZmlsZSUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDSm9iUG9ydGFsJTVDbmV4dXNoaXJlJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1EJTNBJTVDSm9iUG9ydGFsJTVDbmV4dXNoaXJlJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNnQjtBQUM3RjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL25leHVzaGlyZS8/N2IzZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJEOlxcXFxKb2JQb3J0YWxcXFxcbmV4dXNoaXJlXFxcXGFwcFxcXFxhcGlcXFxcY2FuZGlkYXRlXFxcXHByb2ZpbGVcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2NhbmRpZGF0ZS9wcm9maWxlL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvY2FuZGlkYXRlL3Byb2ZpbGVcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2NhbmRpZGF0ZS9wcm9maWxlL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiRDpcXFxcSm9iUG9ydGFsXFxcXG5leHVzaGlyZVxcXFxhcHBcXFxcYXBpXFxcXGNhbmRpZGF0ZVxcXFxwcm9maWxlXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9jYW5kaWRhdGUvcHJvZmlsZS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcandidate%2Fprofile%2Froute&page=%2Fapi%2Fcandidate%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcandidate%2Fprofile%2Froute.ts&appDir=D%3A%5CJobPortal%5Cnexushire%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CJobPortal%5Cnexushire&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/candidate/profile/route.ts":
/*!********************************************!*\
  !*** ./app/api/candidate/profile/route.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PUT: () => (/* binding */ PUT)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var _lib_models_CandidateProfile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/models/CandidateProfile */ \"(rsc)/./lib/models/CandidateProfile.ts\");\n/* harmony import */ var _lib_nim__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/nim */ \"(rsc)/./lib/nim.ts\");\n\n\n\n\n\nasync function GET() {\n    const session = await (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.auth)();\n    if (!session || session.user.role !== \"candidate\") {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Unauthorized\"\n        }, {\n            status: 401\n        });\n    }\n    await (0,_lib_db__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n    const profile = await _lib_models_CandidateProfile__WEBPACK_IMPORTED_MODULE_3__[\"default\"].findOne({\n        userId: session.user.id\n    }).lean();\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(profile || {});\n}\nasync function PUT(req) {\n    const session = await (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.auth)();\n    if (!session || session.user.role !== \"candidate\") {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Unauthorized\"\n        }, {\n            status: 401\n        });\n    }\n    try {\n        const body = await req.json();\n        await (0,_lib_db__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n        // Build a text blob for embedding\n        const skillsText = (body.skills || []).map((s)=>s.name).join(\", \");\n        const expText = (body.experience || []).map((e)=>`${e.title} at ${e.company}: ${e.description}`).join(\". \");\n        const textBlob = `${body.headline || \"\"} ${skillsText} ${expText} ${body.bio || \"\"}`;\n        let embedding = [];\n        try {\n            embedding = await (0,_lib_nim__WEBPACK_IMPORTED_MODULE_4__.generateEmbedding)(textBlob);\n        } catch  {\n            console.warn(\"Embedding generation failed, skipping\");\n        }\n        // Calculate profile strength\n        let strength = 0;\n        if (body.headline) strength += 10;\n        if (body.bio) strength += 10;\n        if ((body.skills || []).length > 0) strength += 20;\n        if ((body.experience || []).length > 0) strength += 25;\n        if ((body.education || []).length > 0) strength += 15;\n        if ((body.projects || []).length > 0) strength += 10;\n        if (body.resumeUrl) strength += 10;\n        const profile = await _lib_models_CandidateProfile__WEBPACK_IMPORTED_MODULE_3__[\"default\"].findOneAndUpdate({\n            userId: session.user.id\n        }, {\n            ...body,\n            embedding,\n            profileStrength: strength\n        }, {\n            new: true,\n            upsert: true\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(profile);\n    } catch (err) {\n        console.error(\"Profile update error:\", err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to update profile\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NhbmRpZGF0ZS9wcm9maWxlL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBMEM7QUFDVDtBQUNEO0FBQzRCO0FBQ2Y7QUFFdEMsZUFBZUs7SUFDcEIsTUFBTUMsVUFBVSxNQUFNTCwrQ0FBSUE7SUFDMUIsSUFBSSxDQUFDSyxXQUFXQSxRQUFRQyxJQUFJLENBQUNDLElBQUksS0FBSyxhQUFhO1FBQ2pELE9BQU9SLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUFlLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ3BFO0lBQ0EsTUFBTVQsbURBQVNBO0lBQ2YsTUFBTVUsVUFBVSxNQUFNVCxvRUFBZ0JBLENBQUNVLE9BQU8sQ0FBQztRQUFFQyxRQUFRUixRQUFRQyxJQUFJLENBQUNRLEVBQUU7SUFBQyxHQUFHQyxJQUFJO0lBQ2hGLE9BQU9oQixxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDRyxXQUFXLENBQUM7QUFDdkM7QUFFTyxlQUFlSyxJQUFJQyxHQUFZO0lBQ3BDLE1BQU1aLFVBQVUsTUFBTUwsK0NBQUlBO0lBQzFCLElBQUksQ0FBQ0ssV0FBV0EsUUFBUUMsSUFBSSxDQUFDQyxJQUFJLEtBQUssYUFBYTtRQUNqRCxPQUFPUixxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBZSxHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNwRTtJQUVBLElBQUk7UUFDRixNQUFNUSxPQUFPLE1BQU1ELElBQUlULElBQUk7UUFDM0IsTUFBTVAsbURBQVNBO1FBRWYsa0NBQWtDO1FBQ2xDLE1BQU1rQixhQUFhLENBQUNELEtBQUtFLE1BQU0sSUFBSSxFQUFFLEVBQUVDLEdBQUcsQ0FBQyxDQUFDQyxJQUF3QkEsRUFBRUMsSUFBSSxFQUFFQyxJQUFJLENBQUM7UUFDakYsTUFBTUMsVUFBVSxDQUFDUCxLQUFLUSxVQUFVLElBQUksRUFBRSxFQUNuQ0wsR0FBRyxDQUFDLENBQUNNLElBQStELENBQUMsRUFBRUEsRUFBRUMsS0FBSyxDQUFDLElBQUksRUFBRUQsRUFBRUUsT0FBTyxDQUFDLEVBQUUsRUFBRUYsRUFBRUcsV0FBVyxDQUFDLENBQUMsRUFDbEhOLElBQUksQ0FBQztRQUNSLE1BQU1PLFdBQVcsQ0FBQyxFQUFFYixLQUFLYyxRQUFRLElBQUksR0FBRyxDQUFDLEVBQUViLFdBQVcsQ0FBQyxFQUFFTSxRQUFRLENBQUMsRUFBRVAsS0FBS2UsR0FBRyxJQUFJLEdBQUcsQ0FBQztRQUVwRixJQUFJQyxZQUFzQixFQUFFO1FBQzVCLElBQUk7WUFDRkEsWUFBWSxNQUFNL0IsMkRBQWlCQSxDQUFDNEI7UUFDdEMsRUFBRSxPQUFNO1lBQ05JLFFBQVFDLElBQUksQ0FBQztRQUNmO1FBRUEsNkJBQTZCO1FBQzdCLElBQUlDLFdBQVc7UUFDZixJQUFJbkIsS0FBS2MsUUFBUSxFQUFFSyxZQUFZO1FBQy9CLElBQUluQixLQUFLZSxHQUFHLEVBQUVJLFlBQVk7UUFDMUIsSUFBSSxDQUFDbkIsS0FBS0UsTUFBTSxJQUFJLEVBQUUsRUFBRWtCLE1BQU0sR0FBRyxHQUFHRCxZQUFZO1FBQ2hELElBQUksQ0FBQ25CLEtBQUtRLFVBQVUsSUFBSSxFQUFFLEVBQUVZLE1BQU0sR0FBRyxHQUFHRCxZQUFZO1FBQ3BELElBQUksQ0FBQ25CLEtBQUtxQixTQUFTLElBQUksRUFBRSxFQUFFRCxNQUFNLEdBQUcsR0FBR0QsWUFBWTtRQUNuRCxJQUFJLENBQUNuQixLQUFLc0IsUUFBUSxJQUFJLEVBQUUsRUFBRUYsTUFBTSxHQUFHLEdBQUdELFlBQVk7UUFDbEQsSUFBSW5CLEtBQUt1QixTQUFTLEVBQUVKLFlBQVk7UUFFaEMsTUFBTTFCLFVBQVUsTUFBTVQsb0VBQWdCQSxDQUFDd0MsZ0JBQWdCLENBQ3JEO1lBQUU3QixRQUFRUixRQUFRQyxJQUFJLENBQUNRLEVBQUU7UUFBQyxHQUMxQjtZQUFFLEdBQUdJLElBQUk7WUFBRWdCO1lBQVdTLGlCQUFpQk47UUFBUyxHQUNoRDtZQUFFTyxLQUFLO1lBQU1DLFFBQVE7UUFBSztRQUc1QixPQUFPOUMscURBQVlBLENBQUNTLElBQUksQ0FBQ0c7SUFDM0IsRUFBRSxPQUFPbUMsS0FBSztRQUNaWCxRQUFRMUIsS0FBSyxDQUFDLHlCQUF5QnFDO1FBQ3ZDLE9BQU8vQyxxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBMkIsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDaEY7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL25leHVzaGlyZS8uL2FwcC9hcGkvY2FuZGlkYXRlL3Byb2ZpbGUvcm91dGUudHM/ZWVmMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcbmltcG9ydCB7IGF1dGggfSBmcm9tICdAL2xpYi9hdXRoJ1xuaW1wb3J0IGNvbm5lY3REQiBmcm9tICdAL2xpYi9kYidcbmltcG9ydCBDYW5kaWRhdGVQcm9maWxlIGZyb20gJ0AvbGliL21vZGVscy9DYW5kaWRhdGVQcm9maWxlJ1xuaW1wb3J0IHsgZ2VuZXJhdGVFbWJlZGRpbmcgfSBmcm9tICdAL2xpYi9uaW0nXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBhdXRoKClcbiAgaWYgKCFzZXNzaW9uIHx8IHNlc3Npb24udXNlci5yb2xlICE9PSAnY2FuZGlkYXRlJykge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnVW5hdXRob3JpemVkJyB9LCB7IHN0YXR1czogNDAxIH0pXG4gIH1cbiAgYXdhaXQgY29ubmVjdERCKClcbiAgY29uc3QgcHJvZmlsZSA9IGF3YWl0IENhbmRpZGF0ZVByb2ZpbGUuZmluZE9uZSh7IHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkIH0pLmxlYW4oKVxuICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24ocHJvZmlsZSB8fCB7fSlcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBVVChyZXE6IFJlcXVlc3QpIHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGF1dGgoKVxuICBpZiAoIXNlc3Npb24gfHwgc2Vzc2lvbi51c2VyLnJvbGUgIT09ICdjYW5kaWRhdGUnKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdVbmF1dGhvcml6ZWQnIH0sIHsgc3RhdHVzOiA0MDEgfSlcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcS5qc29uKClcbiAgICBhd2FpdCBjb25uZWN0REIoKVxuXG4gICAgLy8gQnVpbGQgYSB0ZXh0IGJsb2IgZm9yIGVtYmVkZGluZ1xuICAgIGNvbnN0IHNraWxsc1RleHQgPSAoYm9keS5za2lsbHMgfHwgW10pLm1hcCgoczogeyBuYW1lOiBzdHJpbmcgfSkgPT4gcy5uYW1lKS5qb2luKCcsICcpXG4gICAgY29uc3QgZXhwVGV4dCA9IChib2R5LmV4cGVyaWVuY2UgfHwgW10pXG4gICAgICAubWFwKChlOiB7IHRpdGxlOiBzdHJpbmc7IGNvbXBhbnk6IHN0cmluZzsgZGVzY3JpcHRpb246IHN0cmluZyB9KSA9PiBgJHtlLnRpdGxlfSBhdCAke2UuY29tcGFueX06ICR7ZS5kZXNjcmlwdGlvbn1gKVxuICAgICAgLmpvaW4oJy4gJylcbiAgICBjb25zdCB0ZXh0QmxvYiA9IGAke2JvZHkuaGVhZGxpbmUgfHwgJyd9ICR7c2tpbGxzVGV4dH0gJHtleHBUZXh0fSAke2JvZHkuYmlvIHx8ICcnfWBcblxuICAgIGxldCBlbWJlZGRpbmc6IG51bWJlcltdID0gW11cbiAgICB0cnkge1xuICAgICAgZW1iZWRkaW5nID0gYXdhaXQgZ2VuZXJhdGVFbWJlZGRpbmcodGV4dEJsb2IpXG4gICAgfSBjYXRjaCB7XG4gICAgICBjb25zb2xlLndhcm4oJ0VtYmVkZGluZyBnZW5lcmF0aW9uIGZhaWxlZCwgc2tpcHBpbmcnKVxuICAgIH1cblxuICAgIC8vIENhbGN1bGF0ZSBwcm9maWxlIHN0cmVuZ3RoXG4gICAgbGV0IHN0cmVuZ3RoID0gMFxuICAgIGlmIChib2R5LmhlYWRsaW5lKSBzdHJlbmd0aCArPSAxMFxuICAgIGlmIChib2R5LmJpbykgc3RyZW5ndGggKz0gMTBcbiAgICBpZiAoKGJvZHkuc2tpbGxzIHx8IFtdKS5sZW5ndGggPiAwKSBzdHJlbmd0aCArPSAyMFxuICAgIGlmICgoYm9keS5leHBlcmllbmNlIHx8IFtdKS5sZW5ndGggPiAwKSBzdHJlbmd0aCArPSAyNVxuICAgIGlmICgoYm9keS5lZHVjYXRpb24gfHwgW10pLmxlbmd0aCA+IDApIHN0cmVuZ3RoICs9IDE1XG4gICAgaWYgKChib2R5LnByb2plY3RzIHx8IFtdKS5sZW5ndGggPiAwKSBzdHJlbmd0aCArPSAxMFxuICAgIGlmIChib2R5LnJlc3VtZVVybCkgc3RyZW5ndGggKz0gMTBcblxuICAgIGNvbnN0IHByb2ZpbGUgPSBhd2FpdCBDYW5kaWRhdGVQcm9maWxlLmZpbmRPbmVBbmRVcGRhdGUoXG4gICAgICB7IHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkIH0sXG4gICAgICB7IC4uLmJvZHksIGVtYmVkZGluZywgcHJvZmlsZVN0cmVuZ3RoOiBzdHJlbmd0aCB9LFxuICAgICAgeyBuZXc6IHRydWUsIHVwc2VydDogdHJ1ZSB9XG4gICAgKVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHByb2ZpbGUpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1Byb2ZpbGUgdXBkYXRlIGVycm9yOicsIGVycilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0ZhaWxlZCB0byB1cGRhdGUgcHJvZmlsZScgfSwgeyBzdGF0dXM6IDUwMCB9KVxuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiYXV0aCIsImNvbm5lY3REQiIsIkNhbmRpZGF0ZVByb2ZpbGUiLCJnZW5lcmF0ZUVtYmVkZGluZyIsIkdFVCIsInNlc3Npb24iLCJ1c2VyIiwicm9sZSIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInByb2ZpbGUiLCJmaW5kT25lIiwidXNlcklkIiwiaWQiLCJsZWFuIiwiUFVUIiwicmVxIiwiYm9keSIsInNraWxsc1RleHQiLCJza2lsbHMiLCJtYXAiLCJzIiwibmFtZSIsImpvaW4iLCJleHBUZXh0IiwiZXhwZXJpZW5jZSIsImUiLCJ0aXRsZSIsImNvbXBhbnkiLCJkZXNjcmlwdGlvbiIsInRleHRCbG9iIiwiaGVhZGxpbmUiLCJiaW8iLCJlbWJlZGRpbmciLCJjb25zb2xlIiwid2FybiIsInN0cmVuZ3RoIiwibGVuZ3RoIiwiZWR1Y2F0aW9uIiwicHJvamVjdHMiLCJyZXN1bWVVcmwiLCJmaW5kT25lQW5kVXBkYXRlIiwicHJvZmlsZVN0cmVuZ3RoIiwibmV3IiwidXBzZXJ0IiwiZXJyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/candidate/profile/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.config.ts":
/*!****************************!*\
  !*** ./lib/auth.config.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authConfig: () => (/* binding */ authConfig)\n/* harmony export */ });\n// Edge-compatible auth config (no mongoose imports)\nconst authConfig = {\n    pages: {\n        signIn: \"/login\",\n        error: \"/login\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.role = user.role;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    },\n    providers: [],\n    session: {\n        strategy: \"jwt\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC5jb25maWcudHMiLCJtYXBwaW5ncyI6Ijs7OztBQUVBLG9EQUFvRDtBQUM3QyxNQUFNQSxhQUE2QjtJQUN4Q0MsT0FBTztRQUNMQyxRQUFRO1FBQ1JDLE9BQU87SUFDVDtJQUNBQyxXQUFXO1FBQ1QsTUFBTUMsS0FBSSxFQUFFQyxLQUFLLEVBQUVDLElBQUksRUFBRTtZQUN2QixJQUFJQSxNQUFNO2dCQUNSRCxNQUFNRSxFQUFFLEdBQUdELEtBQUtDLEVBQUU7Z0JBQ2xCRixNQUFNRyxJQUFJLEdBQUcsS0FBY0EsSUFBSTtZQUNqQztZQUNBLE9BQU9IO1FBQ1Q7UUFDQSxNQUFNSSxTQUFRLEVBQUVBLE9BQU8sRUFBRUosS0FBSyxFQUFFO1lBQzlCLElBQUlBLE9BQU87Z0JBQ1RJLFFBQVFILElBQUksQ0FBQ0MsRUFBRSxHQUFHRixNQUFNRSxFQUFFO2dCQUMxQkUsUUFBUUgsSUFBSSxDQUFDRSxJQUFJLEdBQUdILE1BQU1HLElBQUk7WUFDaEM7WUFDQSxPQUFPQztRQUNUO0lBQ0Y7SUFDQUMsV0FBVyxFQUFFO0lBQ2JELFNBQVM7UUFBRUUsVUFBVTtJQUFNO0lBQzNCQyxRQUFRQyxRQUFRQyxHQUFHLENBQUNDLGVBQWU7QUFDckMsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25leHVzaGlyZS8uL2xpYi9hdXRoLmNvbmZpZy50cz82ODZlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTmV4dEF1dGhDb25maWcgfSBmcm9tICduZXh0LWF1dGgnXG5cbi8vIEVkZ2UtY29tcGF0aWJsZSBhdXRoIGNvbmZpZyAobm8gbW9uZ29vc2UgaW1wb3J0cylcbmV4cG9ydCBjb25zdCBhdXRoQ29uZmlnOiBOZXh0QXV0aENvbmZpZyA9IHtcbiAgcGFnZXM6IHtcbiAgICBzaWduSW46ICcvbG9naW4nLFxuICAgIGVycm9yOiAnL2xvZ2luJyxcbiAgfSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgdG9rZW4uaWQgPSB1c2VyLmlkXG4gICAgICAgIHRva2VuLnJvbGUgPSAodXNlciBhcyBhbnkpLnJvbGVcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlblxuICAgIH0sXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcbiAgICAgIGlmICh0b2tlbikge1xuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZCBhcyBzdHJpbmdcbiAgICAgICAgc2Vzc2lvbi51c2VyLnJvbGUgPSB0b2tlbi5yb2xlIGFzIHN0cmluZ1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlc3Npb25cbiAgICB9LFxuICB9LFxuICBwcm92aWRlcnM6IFtdLCAvLyBwb3B1bGF0ZWQgaW4gYXV0aC50c1xuICBzZXNzaW9uOiB7IHN0cmF0ZWd5OiAnand0JyB9LFxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcbn1cbiJdLCJuYW1lcyI6WyJhdXRoQ29uZmlnIiwicGFnZXMiLCJzaWduSW4iLCJlcnJvciIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwidXNlciIsImlkIiwicm9sZSIsInNlc3Npb24iLCJwcm92aWRlcnMiLCJzdHJhdGVneSIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.config.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   auth: () => (/* binding */ auth),\n/* harmony export */   handlers: () => (/* binding */ handlers),\n/* harmony export */   signIn: () => (/* binding */ signIn),\n/* harmony export */   signOut: () => (/* binding */ signOut)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var _lib_models_User__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/lib/models/User */ \"(rsc)/./lib/models/User.ts\");\n/* harmony import */ var _lib_auth_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/lib/auth.config */ \"(rsc)/./lib/auth.config.ts\");\n\n\n\n\n\n\n\nconst { handlers, auth, signIn, signOut } = (0,next_auth__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n    ..._lib_auth_config__WEBPACK_IMPORTED_MODULE_6__.authConfig,\n    providers: [\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID ?? \"\",\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? \"\"\n        }),\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) return null;\n                await (0,_lib_db__WEBPACK_IMPORTED_MODULE_4__.connectDB)();\n                const user = await _lib_models_User__WEBPACK_IMPORTED_MODULE_5__.UserModel.findOne({\n                    email: credentials.email\n                }).lean();\n                if (!user || !user.passwordHash) return null;\n                const valid = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().compare(credentials.password, user.passwordHash);\n                if (!valid) return null;\n                return {\n                    id: user._id.toString(),\n                    email: user.email,\n                    name: user.name,\n                    role: user.role,\n                    image: user.image ?? null\n                };\n            }\n        })\n    ],\n    callbacks: {\n        ..._lib_auth_config__WEBPACK_IMPORTED_MODULE_6__.authConfig.callbacks,\n        async signIn ({ user, account }) {\n            if (account?.provider === \"google\") {\n                await (0,_lib_db__WEBPACK_IMPORTED_MODULE_4__.connectDB)();\n                const existing = await _lib_models_User__WEBPACK_IMPORTED_MODULE_5__.UserModel.findOne({\n                    email: user.email\n                });\n                if (!existing) {\n                    await _lib_models_User__WEBPACK_IMPORTED_MODULE_5__.UserModel.create({\n                        email: user.email,\n                        name: user.name,\n                        image: user.image,\n                        role: \"candidate\",\n                        provider: \"google\"\n                    });\n                }\n            }\n            return true;\n        }\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBZ0M7QUFDeUI7QUFDVjtBQUNsQjtBQUNPO0FBQ1M7QUFDQztBQUV2QyxNQUFNLEVBQUVPLFFBQVEsRUFBRUMsSUFBSSxFQUFFQyxNQUFNLEVBQUVDLE9BQU8sRUFBRSxHQUFHVixxREFBUUEsQ0FBQztJQUMxRCxHQUFHTSx3REFBVTtJQUNiSyxXQUFXO1FBQ1RULHNFQUFNQSxDQUFDO1lBQ0xVLFVBQVVDLFFBQVFDLEdBQUcsQ0FBQ0MsZ0JBQWdCLElBQUk7WUFDMUNDLGNBQWNILFFBQVFDLEdBQUcsQ0FBQ0csb0JBQW9CLElBQUk7UUFDcEQ7UUFDQWhCLDJFQUFXQSxDQUFDO1lBQ1ZpQixNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQVE7Z0JBQ3ZDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDekIsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELGFBQWFJLFVBQVUsT0FBTztnQkFDMUQsTUFBTW5CLGtEQUFTQTtnQkFDZixNQUFNcUIsT0FBTyxNQUFNcEIsdURBQVNBLENBQUNxQixPQUFPLENBQUM7b0JBQUVOLE9BQU9ELFlBQVlDLEtBQUs7Z0JBQUMsR0FBR08sSUFBSTtnQkFDdkUsSUFBSSxDQUFDRixRQUFRLENBQUNBLEtBQUtHLFlBQVksRUFBRSxPQUFPO2dCQUN4QyxNQUFNQyxRQUFRLE1BQU0xQix1REFBYyxDQUFDZ0IsWUFBWUksUUFBUSxFQUFZRSxLQUFLRyxZQUFZO2dCQUNwRixJQUFJLENBQUNDLE9BQU8sT0FBTztnQkFDbkIsT0FBTztvQkFDTEUsSUFBSU4sS0FBS08sR0FBRyxDQUFDQyxRQUFRO29CQUNyQmIsT0FBT0ssS0FBS0wsS0FBSztvQkFDakJGLE1BQU1PLEtBQUtQLElBQUk7b0JBQ2ZnQixNQUFNVCxLQUFLUyxJQUFJO29CQUNmQyxPQUFPVixLQUFLVSxLQUFLLElBQUk7Z0JBQ3ZCO1lBQ0Y7UUFDRjtLQUNEO0lBQ0RDLFdBQVc7UUFDVCxHQUFHOUIsd0RBQVVBLENBQUM4QixTQUFTO1FBQ3ZCLE1BQU0zQixRQUFPLEVBQUVnQixJQUFJLEVBQUVZLE9BQU8sRUFBRTtZQUM1QixJQUFJQSxTQUFTQyxhQUFhLFVBQVU7Z0JBQ2xDLE1BQU1sQyxrREFBU0E7Z0JBQ2YsTUFBTW1DLFdBQVcsTUFBTWxDLHVEQUFTQSxDQUFDcUIsT0FBTyxDQUFDO29CQUFFTixPQUFPSyxLQUFLTCxLQUFLO2dCQUFDO2dCQUM3RCxJQUFJLENBQUNtQixVQUFVO29CQUNiLE1BQU1sQyx1REFBU0EsQ0FBQ21DLE1BQU0sQ0FBQzt3QkFDckJwQixPQUFPSyxLQUFLTCxLQUFLO3dCQUNqQkYsTUFBTU8sS0FBS1AsSUFBSTt3QkFDZmlCLE9BQU9WLEtBQUtVLEtBQUs7d0JBQ2pCRCxNQUFNO3dCQUNOSSxVQUFVO29CQUNaO2dCQUNGO1lBQ0Y7WUFDQSxPQUFPO1FBQ1Q7SUFDRjtBQUNGLEdBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh1c2hpcmUvLi9saWIvYXV0aC50cz9iZjdlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCBmcm9tICduZXh0LWF1dGgnXG5pbXBvcnQgQ3JlZGVudGlhbHMgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFscydcbmltcG9ydCBHb29nbGUgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9nb29nbGUnXG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJ1xuaW1wb3J0IHsgY29ubmVjdERCIH0gZnJvbSAnQC9saWIvZGInXG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tICdAL2xpYi9tb2RlbHMvVXNlcidcbmltcG9ydCB7IGF1dGhDb25maWcgfSBmcm9tICdAL2xpYi9hdXRoLmNvbmZpZydcblxuZXhwb3J0IGNvbnN0IHsgaGFuZGxlcnMsIGF1dGgsIHNpZ25Jbiwgc2lnbk91dCB9ID0gTmV4dEF1dGgoe1xuICAuLi5hdXRoQ29uZmlnLFxuICBwcm92aWRlcnM6IFtcbiAgICBHb29nbGUoe1xuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSUQgPz8gJycsXG4gICAgICBjbGllbnRTZWNyZXQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfU0VDUkVUID8/ICcnLFxuICAgIH0pLFxuICAgIENyZWRlbnRpYWxzKHtcbiAgICAgIG5hbWU6ICdjcmVkZW50aWFscycsXG4gICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICBlbWFpbDogeyBsYWJlbDogJ0VtYWlsJywgdHlwZTogJ2VtYWlsJyB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogJ1Bhc3N3b3JkJywgdHlwZTogJ3Bhc3N3b3JkJyB9LFxuICAgICAgfSxcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xuICAgICAgICBpZiAoIWNyZWRlbnRpYWxzPy5lbWFpbCB8fCAhY3JlZGVudGlhbHM/LnBhc3N3b3JkKSByZXR1cm4gbnVsbFxuICAgICAgICBhd2FpdCBjb25uZWN0REIoKVxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoeyBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwgfSkubGVhbigpXG4gICAgICAgIGlmICghdXNlciB8fCAhdXNlci5wYXNzd29yZEhhc2gpIHJldHVybiBudWxsXG4gICAgICAgIGNvbnN0IHZhbGlkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoY3JlZGVudGlhbHMucGFzc3dvcmQgYXMgc3RyaW5nLCB1c2VyLnBhc3N3b3JkSGFzaClcbiAgICAgICAgaWYgKCF2YWxpZCkgcmV0dXJuIG51bGxcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpZDogdXNlci5faWQudG9TdHJpbmcoKSxcbiAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgIGltYWdlOiB1c2VyLmltYWdlID8/IG51bGwsXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGNhbGxiYWNrczoge1xuICAgIC4uLmF1dGhDb25maWcuY2FsbGJhY2tzLFxuICAgIGFzeW5jIHNpZ25Jbih7IHVzZXIsIGFjY291bnQgfSkge1xuICAgICAgaWYgKGFjY291bnQ/LnByb3ZpZGVyID09PSAnZ29vZ2xlJykge1xuICAgICAgICBhd2FpdCBjb25uZWN0REIoKVxuICAgICAgICBjb25zdCBleGlzdGluZyA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHsgZW1haWw6IHVzZXIuZW1haWwgfSlcbiAgICAgICAgaWYgKCFleGlzdGluZykge1xuICAgICAgICAgIGF3YWl0IFVzZXJNb2RlbC5jcmVhdGUoe1xuICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgICAgICBpbWFnZTogdXNlci5pbWFnZSxcbiAgICAgICAgICAgIHJvbGU6ICdjYW5kaWRhdGUnLFxuICAgICAgICAgICAgcHJvdmlkZXI6ICdnb29nbGUnLFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSxcbiAgfSxcbn0pXG5cbmRlY2xhcmUgbW9kdWxlICduZXh0LWF1dGgnIHtcbiAgaW50ZXJmYWNlIFNlc3Npb24ge1xuICAgIHVzZXI6IHtcbiAgICAgIGlkOiBzdHJpbmdcbiAgICAgIHJvbGU6IHN0cmluZ1xuICAgICAgbmFtZT86IHN0cmluZyB8IG51bGxcbiAgICAgIGVtYWlsPzogc3RyaW5nIHwgbnVsbFxuICAgICAgaW1hZ2U/OiBzdHJpbmcgfCBudWxsXG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJDcmVkZW50aWFscyIsIkdvb2dsZSIsImJjcnlwdCIsImNvbm5lY3REQiIsIlVzZXJNb2RlbCIsImF1dGhDb25maWciLCJoYW5kbGVycyIsImF1dGgiLCJzaWduSW4iLCJzaWduT3V0IiwicHJvdmlkZXJzIiwiY2xpZW50SWQiLCJwcm9jZXNzIiwiZW52IiwiR09PR0xFX0NMSUVOVF9JRCIsImNsaWVudFNlY3JldCIsIkdPT0dMRV9DTElFTlRfU0VDUkVUIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsInVzZXIiLCJmaW5kT25lIiwibGVhbiIsInBhc3N3b3JkSGFzaCIsInZhbGlkIiwiY29tcGFyZSIsImlkIiwiX2lkIiwidG9TdHJpbmciLCJyb2xlIiwiaW1hZ2UiLCJjYWxsYmFja3MiLCJhY2NvdW50IiwicHJvdmlkZXIiLCJleGlzdGluZyIsImNyZWF0ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectDB: () => (/* binding */ connectDB),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nif (!MONGODB_URI) {\n    throw new Error(\"MONGODB_URI environment variable is not set\");\n}\nconst cached = global.mongoose ?? {\n    conn: null,\n    promise: null\n};\nglobal.mongoose = cached;\nasync function connectDB() {\n    if (cached.conn) return cached.conn;\n    if (!cached.promise) {\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, {\n            bufferCommands: false\n        });\n    }\n    cached.conn = await cached.promise;\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectDB);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUErQjtBQUUvQixNQUFNQyxjQUFjQyxRQUFRQyxHQUFHLENBQUNGLFdBQVc7QUFFM0MsSUFBSSxDQUFDQSxhQUFhO0lBQ2hCLE1BQU0sSUFBSUcsTUFBTTtBQUNsQjtBQVdBLE1BQU1DLFNBQXdCQyxPQUFPTixRQUFRLElBQUk7SUFBRU8sTUFBTTtJQUFNQyxTQUFTO0FBQUs7QUFDN0VGLE9BQU9OLFFBQVEsR0FBR0s7QUFFWCxlQUFlSTtJQUNwQixJQUFJSixPQUFPRSxJQUFJLEVBQUUsT0FBT0YsT0FBT0UsSUFBSTtJQUVuQyxJQUFJLENBQUNGLE9BQU9HLE9BQU8sRUFBRTtRQUNuQkgsT0FBT0csT0FBTyxHQUFHUix1REFBZ0IsQ0FBQ0MsYUFBYTtZQUM3Q1UsZ0JBQWdCO1FBQ2xCO0lBQ0Y7SUFFQU4sT0FBT0UsSUFBSSxHQUFHLE1BQU1GLE9BQU9HLE9BQU87SUFDbEMsT0FBT0gsT0FBT0UsSUFBSTtBQUNwQjtBQUVBLGlFQUFlRSxTQUFTQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dXNoaXJlLy4vbGliL2RiLnRzPzFkZjAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJ1xuXG5jb25zdCBNT05HT0RCX1VSSSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJIVxuXG5pZiAoIU1PTkdPREJfVVJJKSB7XG4gIHRocm93IG5ldyBFcnJvcignTU9OR09EQl9VUkkgZW52aXJvbm1lbnQgdmFyaWFibGUgaXMgbm90IHNldCcpXG59XG5cbmludGVyZmFjZSBNb25nb29zZUNhY2hlIHtcbiAgY29ubjogdHlwZW9mIG1vbmdvb3NlIHwgbnVsbFxuICBwcm9taXNlOiBQcm9taXNlPHR5cGVvZiBtb25nb29zZT4gfCBudWxsXG59XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgdmFyIG1vbmdvb3NlOiBNb25nb29zZUNhY2hlIHwgdW5kZWZpbmVkXG59XG5cbmNvbnN0IGNhY2hlZDogTW9uZ29vc2VDYWNoZSA9IGdsb2JhbC5tb25nb29zZSA/PyB7IGNvbm46IG51bGwsIHByb21pc2U6IG51bGwgfVxuZ2xvYmFsLm1vbmdvb3NlID0gY2FjaGVkXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25uZWN0REIoKTogUHJvbWlzZTx0eXBlb2YgbW9uZ29vc2U+IHtcbiAgaWYgKGNhY2hlZC5jb25uKSByZXR1cm4gY2FjaGVkLmNvbm5cblxuICBpZiAoIWNhY2hlZC5wcm9taXNlKSB7XG4gICAgY2FjaGVkLnByb21pc2UgPSBtb25nb29zZS5jb25uZWN0KE1PTkdPREJfVVJJLCB7XG4gICAgICBidWZmZXJDb21tYW5kczogZmFsc2UsXG4gICAgfSlcbiAgfVxuXG4gIGNhY2hlZC5jb25uID0gYXdhaXQgY2FjaGVkLnByb21pc2VcbiAgcmV0dXJuIGNhY2hlZC5jb25uXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3REQlxuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiTU9OR09EQl9VUkkiLCJwcm9jZXNzIiwiZW52IiwiRXJyb3IiLCJjYWNoZWQiLCJnbG9iYWwiLCJjb25uIiwicHJvbWlzZSIsImNvbm5lY3REQiIsImNvbm5lY3QiLCJidWZmZXJDb21tYW5kcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./lib/models/CandidateProfile.ts":
/*!****************************************!*\
  !*** ./lib/models/CandidateProfile.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CandidateProfileModel: () => (/* binding */ CandidateProfileModel),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst CandidateProfileSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    userId: {\n        type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.ObjectId,\n        ref: \"User\",\n        required: true,\n        unique: true\n    },\n    headline: {\n        type: String,\n        default: \"\"\n    },\n    location: {\n        type: String,\n        default: \"\"\n    },\n    githubUrl: String,\n    portfolioUrl: String,\n    linkedinUrl: String,\n    skills: [\n        {\n            skill: String,\n            proficiency: {\n                type: String,\n                enum: [\n                    \"beginner\",\n                    \"intermediate\",\n                    \"advanced\",\n                    \"expert\"\n                ]\n            },\n            yearsOfExp: Number\n        }\n    ],\n    experience: [\n        {\n            title: String,\n            company: String,\n            startDate: String,\n            endDate: String,\n            current: Boolean,\n            description: String\n        }\n    ],\n    education: [\n        {\n            degree: String,\n            institution: String,\n            year: String,\n            field: String\n        }\n    ],\n    projects: [\n        {\n            name: String,\n            description: String,\n            techStack: [\n                String\n            ],\n            url: String\n        }\n    ],\n    resumeS3Key: String,\n    resumeText: String,\n    embedding: {\n        type: [\n            Number\n        ],\n        default: []\n    },\n    profileStrength: {\n        type: Number,\n        default: 0\n    },\n    resumeImprovementTips: [\n        String\n    ],\n    recentInteractionSkills: {\n        type: [\n            String\n        ],\n        default: []\n    }\n}, {\n    timestamps: true\n});\nCandidateProfileSchema.index({\n    embedding: \"2dsphere\"\n});\nconst CandidateProfileModel = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).CandidateProfile ?? mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"CandidateProfile\", CandidateProfileSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CandidateProfileModel);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9kZWxzL0NhbmRpZGF0ZVByb2ZpbGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUE0RDtBQXFENUQsTUFBTUUseUJBQXlCLElBQUlELDRDQUFNQSxDQUFvQjtJQUMzREUsUUFBUTtRQUFFQyxNQUFNSCw0Q0FBTUEsQ0FBQ0ksS0FBSyxDQUFDQyxRQUFRO1FBQUVDLEtBQUs7UUFBUUMsVUFBVTtRQUFNQyxRQUFRO0lBQUs7SUFDakZDLFVBQVU7UUFBRU4sTUFBTU87UUFBUUMsU0FBUztJQUFHO0lBQ3RDQyxVQUFVO1FBQUVULE1BQU1PO1FBQVFDLFNBQVM7SUFBRztJQUN0Q0UsV0FBV0g7SUFDWEksY0FBY0o7SUFDZEssYUFBYUw7SUFDYk0sUUFBUTtRQUFDO1lBQ1BDLE9BQU9QO1lBQ1BRLGFBQWE7Z0JBQUVmLE1BQU1PO2dCQUFRUyxNQUFNO29CQUFDO29CQUFZO29CQUFnQjtvQkFBWTtpQkFBUztZQUFDO1lBQ3RGQyxZQUFZQztRQUNkO0tBQUU7SUFDRkMsWUFBWTtRQUFDO1lBQ1hDLE9BQU9iO1lBQVFjLFNBQVNkO1lBQVFlLFdBQVdmO1lBQVFnQixTQUFTaEI7WUFDNURpQixTQUFTQztZQUFTQyxhQUFhbkI7UUFDakM7S0FBRTtJQUNGb0IsV0FBVztRQUFDO1lBQUVDLFFBQVFyQjtZQUFRc0IsYUFBYXRCO1lBQVF1QixNQUFNdkI7WUFBUXdCLE9BQU94QjtRQUFPO0tBQUU7SUFDakZ5QixVQUFVO1FBQUM7WUFBRUMsTUFBTTFCO1lBQVFtQixhQUFhbkI7WUFBUTJCLFdBQVc7Z0JBQUMzQjthQUFPO1lBQUU0QixLQUFLNUI7UUFBTztLQUFFO0lBQ25GNkIsYUFBYTdCO0lBQ2I4QixZQUFZOUI7SUFDWitCLFdBQVc7UUFBRXRDLE1BQU07WUFBQ2tCO1NBQU87UUFBRVYsU0FBUyxFQUFFO0lBQUM7SUFDekMrQixpQkFBaUI7UUFBRXZDLE1BQU1rQjtRQUFRVixTQUFTO0lBQUU7SUFDNUNnQyx1QkFBdUI7UUFBQ2pDO0tBQU87SUFDL0JrQyx5QkFBeUI7UUFBRXpDLE1BQU07WUFBQ087U0FBTztRQUFFQyxTQUFTLEVBQUU7SUFBQztBQUN6RCxHQUFHO0lBQUVrQyxZQUFZO0FBQUs7QUFFdEI1Qyx1QkFBdUI2QyxLQUFLLENBQUM7SUFBRUwsV0FBVztBQUFXO0FBRTlDLE1BQU1NLHdCQUNYaEQsd0RBQWUsQ0FBQ2tELGdCQUFnQixJQUNoQ2xELHFEQUFjLENBQW9CLG9CQUFvQkUsd0JBQXVCO0FBRS9FLGlFQUFlOEMscUJBQXFCQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dXNoaXJlLy4vbGliL21vZGVscy9DYW5kaWRhdGVQcm9maWxlLnRzP2U4ZDQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlLCB7IFNjaGVtYSwgRG9jdW1lbnQsIE1vZGVsIH0gZnJvbSAnbW9uZ29vc2UnXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNraWxsIHtcbiAgc2tpbGw6IHN0cmluZ1xuICBwcm9maWNpZW5jeTogJ2JlZ2lubmVyJyB8ICdpbnRlcm1lZGlhdGUnIHwgJ2FkdmFuY2VkJyB8ICdleHBlcnQnXG4gIHllYXJzT2ZFeHA/OiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRXhwZXJpZW5jZSB7XG4gIHRpdGxlOiBzdHJpbmdcbiAgY29tcGFueTogc3RyaW5nXG4gIHN0YXJ0RGF0ZTogc3RyaW5nXG4gIGVuZERhdGU/OiBzdHJpbmdcbiAgY3VycmVudDogYm9vbGVhblxuICBkZXNjcmlwdGlvbjogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUVkdWNhdGlvbiB7XG4gIGRlZ3JlZTogc3RyaW5nXG4gIGluc3RpdHV0aW9uOiBzdHJpbmdcbiAgeWVhcjogc3RyaW5nXG4gIGZpZWxkPzogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb2plY3Qge1xuICBuYW1lOiBzdHJpbmdcbiAgZGVzY3JpcHRpb246IHN0cmluZ1xuICB0ZWNoU3RhY2s6IHN0cmluZ1tdXG4gIHVybD86IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDYW5kaWRhdGVQcm9maWxlIGV4dGVuZHMgRG9jdW1lbnQge1xuICBfaWQ6IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkXG4gIHVzZXJJZDogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWRcbiAgaGVhZGxpbmU6IHN0cmluZ1xuICBsb2NhdGlvbjogc3RyaW5nXG4gIGdpdGh1YlVybD86IHN0cmluZ1xuICBwb3J0Zm9saW9Vcmw/OiBzdHJpbmdcbiAgbGlua2VkaW5Vcmw/OiBzdHJpbmdcbiAgc2tpbGxzOiBJU2tpbGxbXVxuICBleHBlcmllbmNlOiBJRXhwZXJpZW5jZVtdXG4gIGVkdWNhdGlvbjogSUVkdWNhdGlvbltdXG4gIHByb2plY3RzOiBJUHJvamVjdFtdXG4gIHJlc3VtZVMzS2V5Pzogc3RyaW5nXG4gIHJlc3VtZVRleHQ/OiBzdHJpbmdcbiAgZW1iZWRkaW5nOiBudW1iZXJbXVxuICBwcm9maWxlU3RyZW5ndGg6IG51bWJlclxuICByZXN1bWVJbXByb3ZlbWVudFRpcHM6IHN0cmluZ1tdXG4gIHJlY2VudEludGVyYWN0aW9uU2tpbGxzOiBzdHJpbmdbXVxuICBjcmVhdGVkQXQ6IERhdGVcbiAgdXBkYXRlZEF0OiBEYXRlXG59XG5cbmNvbnN0IENhbmRpZGF0ZVByb2ZpbGVTY2hlbWEgPSBuZXcgU2NoZW1hPElDYW5kaWRhdGVQcm9maWxlPih7XG4gIHVzZXJJZDogeyB0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SWQsIHJlZjogJ1VzZXInLCByZXF1aXJlZDogdHJ1ZSwgdW5pcXVlOiB0cnVlIH0sXG4gIGhlYWRsaW5lOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogJycgfSxcbiAgbG9jYXRpb246IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiAnJyB9LFxuICBnaXRodWJVcmw6IFN0cmluZyxcbiAgcG9ydGZvbGlvVXJsOiBTdHJpbmcsXG4gIGxpbmtlZGluVXJsOiBTdHJpbmcsXG4gIHNraWxsczogW3tcbiAgICBza2lsbDogU3RyaW5nLFxuICAgIHByb2ZpY2llbmN5OiB7IHR5cGU6IFN0cmluZywgZW51bTogWydiZWdpbm5lcicsICdpbnRlcm1lZGlhdGUnLCAnYWR2YW5jZWQnLCAnZXhwZXJ0J10gfSxcbiAgICB5ZWFyc09mRXhwOiBOdW1iZXIsXG4gIH1dLFxuICBleHBlcmllbmNlOiBbe1xuICAgIHRpdGxlOiBTdHJpbmcsIGNvbXBhbnk6IFN0cmluZywgc3RhcnREYXRlOiBTdHJpbmcsIGVuZERhdGU6IFN0cmluZyxcbiAgICBjdXJyZW50OiBCb29sZWFuLCBkZXNjcmlwdGlvbjogU3RyaW5nLFxuICB9XSxcbiAgZWR1Y2F0aW9uOiBbeyBkZWdyZWU6IFN0cmluZywgaW5zdGl0dXRpb246IFN0cmluZywgeWVhcjogU3RyaW5nLCBmaWVsZDogU3RyaW5nIH1dLFxuICBwcm9qZWN0czogW3sgbmFtZTogU3RyaW5nLCBkZXNjcmlwdGlvbjogU3RyaW5nLCB0ZWNoU3RhY2s6IFtTdHJpbmddLCB1cmw6IFN0cmluZyB9XSxcbiAgcmVzdW1lUzNLZXk6IFN0cmluZyxcbiAgcmVzdW1lVGV4dDogU3RyaW5nLFxuICBlbWJlZGRpbmc6IHsgdHlwZTogW051bWJlcl0sIGRlZmF1bHQ6IFtdIH0sXG4gIHByb2ZpbGVTdHJlbmd0aDogeyB0eXBlOiBOdW1iZXIsIGRlZmF1bHQ6IDAgfSxcbiAgcmVzdW1lSW1wcm92ZW1lbnRUaXBzOiBbU3RyaW5nXSxcbiAgcmVjZW50SW50ZXJhY3Rpb25Ta2lsbHM6IHsgdHlwZTogW1N0cmluZ10sIGRlZmF1bHQ6IFtdIH0sXG59LCB7IHRpbWVzdGFtcHM6IHRydWUgfSlcblxuQ2FuZGlkYXRlUHJvZmlsZVNjaGVtYS5pbmRleCh7IGVtYmVkZGluZzogJzJkc3BoZXJlJyB9KVxuXG5leHBvcnQgY29uc3QgQ2FuZGlkYXRlUHJvZmlsZU1vZGVsOiBNb2RlbDxJQ2FuZGlkYXRlUHJvZmlsZT4gPVxuICBtb25nb29zZS5tb2RlbHMuQ2FuZGlkYXRlUHJvZmlsZSA/P1xuICBtb25nb29zZS5tb2RlbDxJQ2FuZGlkYXRlUHJvZmlsZT4oJ0NhbmRpZGF0ZVByb2ZpbGUnLCBDYW5kaWRhdGVQcm9maWxlU2NoZW1hKVxuXG5leHBvcnQgZGVmYXVsdCBDYW5kaWRhdGVQcm9maWxlTW9kZWxcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIlNjaGVtYSIsIkNhbmRpZGF0ZVByb2ZpbGVTY2hlbWEiLCJ1c2VySWQiLCJ0eXBlIiwiVHlwZXMiLCJPYmplY3RJZCIsInJlZiIsInJlcXVpcmVkIiwidW5pcXVlIiwiaGVhZGxpbmUiLCJTdHJpbmciLCJkZWZhdWx0IiwibG9jYXRpb24iLCJnaXRodWJVcmwiLCJwb3J0Zm9saW9VcmwiLCJsaW5rZWRpblVybCIsInNraWxscyIsInNraWxsIiwicHJvZmljaWVuY3kiLCJlbnVtIiwieWVhcnNPZkV4cCIsIk51bWJlciIsImV4cGVyaWVuY2UiLCJ0aXRsZSIsImNvbXBhbnkiLCJzdGFydERhdGUiLCJlbmREYXRlIiwiY3VycmVudCIsIkJvb2xlYW4iLCJkZXNjcmlwdGlvbiIsImVkdWNhdGlvbiIsImRlZ3JlZSIsImluc3RpdHV0aW9uIiwieWVhciIsImZpZWxkIiwicHJvamVjdHMiLCJuYW1lIiwidGVjaFN0YWNrIiwidXJsIiwicmVzdW1lUzNLZXkiLCJyZXN1bWVUZXh0IiwiZW1iZWRkaW5nIiwicHJvZmlsZVN0cmVuZ3RoIiwicmVzdW1lSW1wcm92ZW1lbnRUaXBzIiwicmVjZW50SW50ZXJhY3Rpb25Ta2lsbHMiLCJ0aW1lc3RhbXBzIiwiaW5kZXgiLCJDYW5kaWRhdGVQcm9maWxlTW9kZWwiLCJtb2RlbHMiLCJDYW5kaWRhdGVQcm9maWxlIiwibW9kZWwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/models/CandidateProfile.ts\n");

/***/ }),

/***/ "(rsc)/./lib/models/User.ts":
/*!****************************!*\
  !*** ./lib/models/User.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   UserModel: () => (/* binding */ UserModel),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst UserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    email: {\n        type: String,\n        required: true,\n        unique: true,\n        lowercase: true\n    },\n    name: {\n        type: String,\n        required: true\n    },\n    passwordHash: {\n        type: String\n    },\n    image: {\n        type: String\n    },\n    role: {\n        type: String,\n        enum: [\n            \"candidate\",\n            \"recruiter\"\n        ],\n        required: true\n    },\n    provider: {\n        type: String,\n        enum: [\n            \"credentials\",\n            \"google\"\n        ],\n        default: \"credentials\"\n    }\n}, {\n    timestamps: true\n});\nconst UserModel = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User ?? mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", UserSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserModel);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9kZWxzL1VzZXIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUE0RDtBQWE1RCxNQUFNRSxhQUFhLElBQUlELDRDQUFNQSxDQUFRO0lBQ25DRSxPQUFPO1FBQUVDLE1BQU1DO1FBQVFDLFVBQVU7UUFBTUMsUUFBUTtRQUFNQyxXQUFXO0lBQUs7SUFDckVDLE1BQU07UUFBRUwsTUFBTUM7UUFBUUMsVUFBVTtJQUFLO0lBQ3JDSSxjQUFjO1FBQUVOLE1BQU1DO0lBQU87SUFDN0JNLE9BQU87UUFBRVAsTUFBTUM7SUFBTztJQUN0Qk8sTUFBTTtRQUFFUixNQUFNQztRQUFRUSxNQUFNO1lBQUM7WUFBYTtTQUFZO1FBQUVQLFVBQVU7SUFBSztJQUN2RVEsVUFBVTtRQUFFVixNQUFNQztRQUFRUSxNQUFNO1lBQUM7WUFBZTtTQUFTO1FBQUVFLFNBQVM7SUFBYztBQUNwRixHQUFHO0lBQUVDLFlBQVk7QUFBSztBQUVmLE1BQU1DLFlBQ1hqQix3REFBZSxDQUFDbUIsSUFBSSxJQUFJbkIscURBQWMsQ0FBUSxRQUFRRSxZQUFXO0FBRW5FLGlFQUFlZSxTQUFTQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dXNoaXJlLy4vbGliL21vZGVscy9Vc2VyLnRzP2I0YWIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlLCB7IFNjaGVtYSwgRG9jdW1lbnQsIE1vZGVsIH0gZnJvbSAnbW9uZ29vc2UnXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVVzZXIgZXh0ZW5kcyBEb2N1bWVudCB7XG4gIF9pZDogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWRcbiAgZW1haWw6IHN0cmluZ1xuICBuYW1lOiBzdHJpbmdcbiAgcGFzc3dvcmRIYXNoPzogc3RyaW5nXG4gIGltYWdlPzogc3RyaW5nXG4gIHJvbGU6ICdjYW5kaWRhdGUnIHwgJ3JlY3J1aXRlcidcbiAgcHJvdmlkZXI6ICdjcmVkZW50aWFscycgfCAnZ29vZ2xlJ1xuICBjcmVhdGVkQXQ6IERhdGVcbn1cblxuY29uc3QgVXNlclNjaGVtYSA9IG5ldyBTY2hlbWE8SVVzZXI+KHtcbiAgZW1haWw6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSwgdW5pcXVlOiB0cnVlLCBsb3dlcmNhc2U6IHRydWUgfSxcbiAgbmFtZTogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXG4gIHBhc3N3b3JkSGFzaDogeyB0eXBlOiBTdHJpbmcgfSxcbiAgaW1hZ2U6IHsgdHlwZTogU3RyaW5nIH0sXG4gIHJvbGU6IHsgdHlwZTogU3RyaW5nLCBlbnVtOiBbJ2NhbmRpZGF0ZScsICdyZWNydWl0ZXInXSwgcmVxdWlyZWQ6IHRydWUgfSxcbiAgcHJvdmlkZXI6IHsgdHlwZTogU3RyaW5nLCBlbnVtOiBbJ2NyZWRlbnRpYWxzJywgJ2dvb2dsZSddLCBkZWZhdWx0OiAnY3JlZGVudGlhbHMnIH0sXG59LCB7IHRpbWVzdGFtcHM6IHRydWUgfSlcblxuZXhwb3J0IGNvbnN0IFVzZXJNb2RlbDogTW9kZWw8SVVzZXI+ID1cbiAgbW9uZ29vc2UubW9kZWxzLlVzZXIgPz8gbW9uZ29vc2UubW9kZWw8SVVzZXI+KCdVc2VyJywgVXNlclNjaGVtYSlcblxuZXhwb3J0IGRlZmF1bHQgVXNlck1vZGVsXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJTY2hlbWEiLCJVc2VyU2NoZW1hIiwiZW1haWwiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJ1bmlxdWUiLCJsb3dlcmNhc2UiLCJuYW1lIiwicGFzc3dvcmRIYXNoIiwiaW1hZ2UiLCJyb2xlIiwiZW51bSIsInByb3ZpZGVyIiwiZGVmYXVsdCIsInRpbWVzdGFtcHMiLCJVc2VyTW9kZWwiLCJtb2RlbHMiLCJVc2VyIiwibW9kZWwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/models/User.ts\n");

/***/ }),

/***/ "(rsc)/./lib/nim.ts":
/*!********************!*\
  !*** ./lib/nim.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EMBED_DIMS: () => (/* binding */ EMBED_DIMS),\n/* harmony export */   cosineSimilarity: () => (/* binding */ cosineSimilarity),\n/* harmony export */   generateEmbedding: () => (/* binding */ generateEmbedding)\n/* harmony export */ });\n/* harmony import */ var openai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! openai */ \"(rsc)/./node_modules/openai/index.mjs\");\n\nconst nimClient = new openai__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n    apiKey: process.env.NVIDIA_NIM_API_KEY,\n    baseURL: \"https://integrate.api.nvidia.com/v1\"\n});\nconst EMBED_MODEL = \"nvidia/llama-nemotron-embed-1b-v2\";\nconst EMBED_DIMS = 768;\nasync function generateEmbedding(text) {\n    try {\n        const response = await nimClient.embeddings.create({\n            model: EMBED_MODEL,\n            input: text.slice(0, 8000)\n        });\n        return response.data[0].embedding;\n    } catch (err) {\n        console.error(\"NIM embedding error, falling back to zeros:\", err);\n        // Fallback: return zero vector (matching will degrade but app won't crash)\n        return new Array(EMBED_DIMS).fill(0);\n    }\n}\nfunction cosineSimilarity(a, b) {\n    if (!a?.length || !b?.length || a.length !== b.length) return 0;\n    let dot = 0, normA = 0, normB = 0;\n    for(let i = 0; i < a.length; i++){\n        dot += a[i] * b[i];\n        normA += a[i] * a[i];\n        normB += b[i] * b[i];\n    }\n    const denom = Math.sqrt(normA) * Math.sqrt(normB);\n    return denom === 0 ? 0 : dot / denom;\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbmltLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMkI7QUFFM0IsTUFBTUMsWUFBWSxJQUFJRCw4Q0FBTUEsQ0FBQztJQUMzQkUsUUFBUUMsUUFBUUMsR0FBRyxDQUFDQyxrQkFBa0I7SUFDdENDLFNBQVM7QUFDWDtBQUVBLE1BQU1DLGNBQWM7QUFDcEIsTUFBTUMsYUFBYTtBQUVaLGVBQWVDLGtCQUFrQkMsSUFBWTtJQUNsRCxJQUFJO1FBQ0YsTUFBTUMsV0FBVyxNQUFNVixVQUFVVyxVQUFVLENBQUNDLE1BQU0sQ0FBQztZQUNqREMsT0FBT1A7WUFDUFEsT0FBT0wsS0FBS00sS0FBSyxDQUFDLEdBQUc7UUFDdkI7UUFDQSxPQUFPTCxTQUFTTSxJQUFJLENBQUMsRUFBRSxDQUFDQyxTQUFTO0lBQ25DLEVBQUUsT0FBT0MsS0FBSztRQUNaQyxRQUFRQyxLQUFLLENBQUMsK0NBQStDRjtRQUM3RCwyRUFBMkU7UUFDM0UsT0FBTyxJQUFJRyxNQUFNZCxZQUFZZSxJQUFJLENBQUM7SUFDcEM7QUFDRjtBQUVPLFNBQVNDLGlCQUFpQkMsQ0FBVyxFQUFFQyxDQUFXO0lBQ3ZELElBQUksQ0FBQ0QsR0FBR0UsVUFBVSxDQUFDRCxHQUFHQyxVQUFVRixFQUFFRSxNQUFNLEtBQUtELEVBQUVDLE1BQU0sRUFBRSxPQUFPO0lBQzlELElBQUlDLE1BQU0sR0FBR0MsUUFBUSxHQUFHQyxRQUFRO0lBQ2hDLElBQUssSUFBSUMsSUFBSSxHQUFHQSxJQUFJTixFQUFFRSxNQUFNLEVBQUVJLElBQUs7UUFDakNILE9BQU9ILENBQUMsQ0FBQ00sRUFBRSxHQUFHTCxDQUFDLENBQUNLLEVBQUU7UUFDbEJGLFNBQVNKLENBQUMsQ0FBQ00sRUFBRSxHQUFHTixDQUFDLENBQUNNLEVBQUU7UUFDcEJELFNBQVNKLENBQUMsQ0FBQ0ssRUFBRSxHQUFHTCxDQUFDLENBQUNLLEVBQUU7SUFDdEI7SUFDQSxNQUFNQyxRQUFRQyxLQUFLQyxJQUFJLENBQUNMLFNBQVNJLEtBQUtDLElBQUksQ0FBQ0o7SUFDM0MsT0FBT0UsVUFBVSxJQUFJLElBQUlKLE1BQU1JO0FBQ2pDO0FBRXFCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dXNoaXJlLy4vbGliL25pbS50cz8yZGFhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPcGVuQUkgZnJvbSAnb3BlbmFpJ1xuXG5jb25zdCBuaW1DbGllbnQgPSBuZXcgT3BlbkFJKHtcbiAgYXBpS2V5OiBwcm9jZXNzLmVudi5OVklESUFfTklNX0FQSV9LRVksXG4gIGJhc2VVUkw6ICdodHRwczovL2ludGVncmF0ZS5hcGkubnZpZGlhLmNvbS92MScsXG59KVxuXG5jb25zdCBFTUJFRF9NT0RFTCA9ICdudmlkaWEvbGxhbWEtbmVtb3Ryb24tZW1iZWQtMWItdjInXG5jb25zdCBFTUJFRF9ESU1TID0gNzY4XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZW5lcmF0ZUVtYmVkZGluZyh0ZXh0OiBzdHJpbmcpOiBQcm9taXNlPG51bWJlcltdPiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBuaW1DbGllbnQuZW1iZWRkaW5ncy5jcmVhdGUoe1xuICAgICAgbW9kZWw6IEVNQkVEX01PREVMLFxuICAgICAgaW5wdXQ6IHRleHQuc2xpY2UoMCwgODAwMCksIC8vIE5JTSBoYXMgaW5wdXQgbGVuZ3RoIGxpbWl0c1xuICAgIH0pXG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGFbMF0uZW1iZWRkaW5nXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ05JTSBlbWJlZGRpbmcgZXJyb3IsIGZhbGxpbmcgYmFjayB0byB6ZXJvczonLCBlcnIpXG4gICAgLy8gRmFsbGJhY2s6IHJldHVybiB6ZXJvIHZlY3RvciAobWF0Y2hpbmcgd2lsbCBkZWdyYWRlIGJ1dCBhcHAgd29uJ3QgY3Jhc2gpXG4gICAgcmV0dXJuIG5ldyBBcnJheShFTUJFRF9ESU1TKS5maWxsKDApXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvc2luZVNpbWlsYXJpdHkoYTogbnVtYmVyW10sIGI6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgaWYgKCFhPy5sZW5ndGggfHwgIWI/Lmxlbmd0aCB8fCBhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiAwXG4gIGxldCBkb3QgPSAwLCBub3JtQSA9IDAsIG5vcm1CID0gMFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICBkb3QgKz0gYVtpXSAqIGJbaV1cbiAgICBub3JtQSArPSBhW2ldICogYVtpXVxuICAgIG5vcm1CICs9IGJbaV0gKiBiW2ldXG4gIH1cbiAgY29uc3QgZGVub20gPSBNYXRoLnNxcnQobm9ybUEpICogTWF0aC5zcXJ0KG5vcm1CKVxuICByZXR1cm4gZGVub20gPT09IDAgPyAwIDogZG90IC8gZGVub21cbn1cblxuZXhwb3J0IHsgRU1CRURfRElNUyB9XG4iXSwibmFtZXMiOlsiT3BlbkFJIiwibmltQ2xpZW50IiwiYXBpS2V5IiwicHJvY2VzcyIsImVudiIsIk5WSURJQV9OSU1fQVBJX0tFWSIsImJhc2VVUkwiLCJFTUJFRF9NT0RFTCIsIkVNQkVEX0RJTVMiLCJnZW5lcmF0ZUVtYmVkZGluZyIsInRleHQiLCJyZXNwb25zZSIsImVtYmVkZGluZ3MiLCJjcmVhdGUiLCJtb2RlbCIsImlucHV0Iiwic2xpY2UiLCJkYXRhIiwiZW1iZWRkaW5nIiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwiQXJyYXkiLCJmaWxsIiwiY29zaW5lU2ltaWxhcml0eSIsImEiLCJiIiwibGVuZ3RoIiwiZG90Iiwibm9ybUEiLCJub3JtQiIsImkiLCJkZW5vbSIsIk1hdGgiLCJzcXJ0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/nim.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@auth","vendor-chunks/next-auth","vendor-chunks/jose","vendor-chunks/oauth4webapi","vendor-chunks/formdata-node","vendor-chunks/preact","vendor-chunks/preact-render-to-string","vendor-chunks/@panva","vendor-chunks/node-fetch","vendor-chunks/openai","vendor-chunks/web-streams-polyfill","vendor-chunks/event-target-shim","vendor-chunks/agentkeepalive","vendor-chunks/form-data-encoder","vendor-chunks/abort-controller","vendor-chunks/ms","vendor-chunks/humanize-ms"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcandidate%2Fprofile%2Froute&page=%2Fapi%2Fcandidate%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcandidate%2Fprofile%2Froute.ts&appDir=D%3A%5CJobPortal%5Cnexushire%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CJobPortal%5Cnexushire&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();