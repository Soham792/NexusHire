"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "_ssr_lib_firebase_ts";
exports.ids = ["_ssr_lib_firebase_ts"];
exports.modules = {

/***/ "(ssr)/./lib/firebase.ts":
/*!*************************!*\
  !*** ./lib/firebase.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   firebaseAuth: () => (/* binding */ firebaseAuth),\n/* harmony export */   googleProvider: () => (/* binding */ googleProvider)\n/* harmony export */ });\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"(ssr)/./node_modules/firebase/app/dist/index.mjs\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ \"(ssr)/./node_modules/firebase/auth/dist/index.mjs\");\n\n\nconst firebaseConfig = {\n    apiKey: \"AIzaSyD6OBxkWZ-RtfPVl-KZyMfkiUSB3e2kNmc\",\n    authDomain: \"nexushire-40793.firebaseapp.com\",\n    projectId: \"nexushire-40793\",\n    storageBucket: \"nexushire-40793.firebasestorage.app\",\n    messagingSenderId: \"92830996147\",\n    appId: \"1:92830996147:web:50bbaba60d4c8a128e02c6\"\n};\nconst app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApps)().length ? (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApps)()[0] : (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);\nconst firebaseAuth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)(app);\nconst googleProvider = new firebase_auth__WEBPACK_IMPORTED_MODULE_1__.GoogleAuthProvider();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9saWIvZmlyZWJhc2UudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFxRDtBQUNNO0FBRTNELE1BQU1JLGlCQUFpQjtJQUNyQkMsUUFBUUMseUNBQXdDO0lBQ2hERyxZQUFZSCxpQ0FBNEM7SUFDeERLLFdBQVdMLGlCQUEyQztJQUN0RE8sZUFBZVAscUNBQStDO0lBQzlEUyxtQkFBbUJULGFBQW9EO0lBQ3ZFVyxPQUFPWCwwQ0FBdUM7QUFDaEQ7QUFFQSxNQUFNYSxNQUFNbEIscURBQU9BLEdBQUdtQixNQUFNLEdBQUduQixxREFBT0EsRUFBRSxDQUFDLEVBQUUsR0FBR0QsMkRBQWFBLENBQUNJO0FBRXJELE1BQU1pQixlQUFlbkIsc0RBQU9BLENBQUNpQixLQUFJO0FBQ2pDLE1BQU1HLGlCQUFpQixJQUFJbkIsNkRBQWtCQSxHQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dXNoaXJlLy4vbGliL2ZpcmViYXNlLnRzPzVkMjEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5pdGlhbGl6ZUFwcCwgZ2V0QXBwcyB9IGZyb20gJ2ZpcmViYXNlL2FwcCdcbmltcG9ydCB7IGdldEF1dGgsIEdvb2dsZUF1dGhQcm92aWRlciB9IGZyb20gJ2ZpcmViYXNlL2F1dGgnXG5cbmNvbnN0IGZpcmViYXNlQ29uZmlnID0ge1xuICBhcGlLZXk6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FQSV9LRVksXG4gIGF1dGhEb21haW46IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FVVEhfRE9NQUlOLFxuICBwcm9qZWN0SWQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX1BST0pFQ1RfSUQsXG4gIHN0b3JhZ2VCdWNrZXQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX1NUT1JBR0VfQlVDS0VULFxuICBtZXNzYWdpbmdTZW5kZXJJZDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRklSRUJBU0VfTUVTU0FHSU5HX1NFTkRFUl9JRCxcbiAgYXBwSWQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FQUF9JRCxcbn1cblxuY29uc3QgYXBwID0gZ2V0QXBwcygpLmxlbmd0aCA/IGdldEFwcHMoKVswXSA6IGluaXRpYWxpemVBcHAoZmlyZWJhc2VDb25maWcpXG5cbmV4cG9ydCBjb25zdCBmaXJlYmFzZUF1dGggPSBnZXRBdXRoKGFwcClcbmV4cG9ydCBjb25zdCBnb29nbGVQcm92aWRlciA9IG5ldyBHb29nbGVBdXRoUHJvdmlkZXIoKVxuIl0sIm5hbWVzIjpbImluaXRpYWxpemVBcHAiLCJnZXRBcHBzIiwiZ2V0QXV0aCIsIkdvb2dsZUF1dGhQcm92aWRlciIsImZpcmViYXNlQ29uZmlnIiwiYXBpS2V5IiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FQSV9LRVkiLCJhdXRoRG9tYWluIiwiTkVYVF9QVUJMSUNfRklSRUJBU0VfQVVUSF9ET01BSU4iLCJwcm9qZWN0SWQiLCJORVhUX1BVQkxJQ19GSVJFQkFTRV9QUk9KRUNUX0lEIiwic3RvcmFnZUJ1Y2tldCIsIk5FWFRfUFVCTElDX0ZJUkVCQVNFX1NUT1JBR0VfQlVDS0VUIiwibWVzc2FnaW5nU2VuZGVySWQiLCJORVhUX1BVQkxJQ19GSVJFQkFTRV9NRVNTQUdJTkdfU0VOREVSX0lEIiwiYXBwSWQiLCJORVhUX1BVQkxJQ19GSVJFQkFTRV9BUFBfSUQiLCJhcHAiLCJsZW5ndGgiLCJmaXJlYmFzZUF1dGgiLCJnb29nbGVQcm92aWRlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./lib/firebase.ts\n");

/***/ })

};
;