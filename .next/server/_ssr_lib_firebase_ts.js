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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   firebaseAuth: () => (/* binding */ firebaseAuth),\n/* harmony export */   googleProvider: () => (/* binding */ googleProvider)\n/* harmony export */ });\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"(ssr)/./node_modules/firebase/app/dist/index.mjs\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ \"(ssr)/./node_modules/firebase/auth/dist/index.mjs\");\n\n\nconst firebaseConfig = {\n    apiKey: \"AIzaSyD6OBxkWZ-RtfPVl-KZyMfkiUSB3e2kNmc\",\n    authDomain: \"nexushire-40793.firebaseapp.com\",\n    projectId: \"nexushire-40793\",\n    storageBucket: \"nexushire-40793.firebasestorage.app\",\n    messagingSenderId: \"92830996147\",\n    appId: \"1:92830996147:web:50bbaba60d4c8a128e02c6\"\n};\nconst app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApps)().length ? (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApps)()[0] : (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);\nconst firebaseAuth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)(app);\nconst googleProvider = new firebase_auth__WEBPACK_IMPORTED_MODULE_1__.GoogleAuthProvider();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9saWIvZmlyZWJhc2UudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFxRDtBQUNNO0FBRTNELE1BQU1JLGlCQUFpQjtJQUNyQkMsUUFBUUMseUNBQXdDO0lBQ2hERyxZQUFZSCxpQ0FBNEM7SUFDeERLLFdBQVdMLGlCQUEyQztJQUN0RE8sZUFBZVAscUNBQStDO0lBQzlEUyxtQkFBbUJULGFBQW9EO0lBQ3ZFVyxPQUFPWCwwQ0FBdUM7QUFDaEQ7QUFFQSxNQUFNYSxNQUFNbEIscURBQU9BLEdBQUdtQixNQUFNLEdBQUduQixxREFBT0EsRUFBRSxDQUFDLEVBQUUsR0FBR0QsMkRBQWFBLENBQUNJO0FBRXJELE1BQU1pQixlQUFlbkIsc0RBQU9BLENBQUNpQixLQUFJO0FBQ2pDLE1BQU1HLGlCQUFpQixJQUFJbkIsNkRBQWtCQSxHQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dXNoaXJlLy4vbGliL2ZpcmViYXNlLnRzPzVkMjEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5pdGlhbGl6ZUFwcCwgZ2V0QXBwcyB9IGZyb20gJ2ZpcmViYXNlL2FwcCdcclxuaW1wb3J0IHsgZ2V0QXV0aCwgR29vZ2xlQXV0aFByb3ZpZGVyIH0gZnJvbSAnZmlyZWJhc2UvYXV0aCdcclxuXHJcbmNvbnN0IGZpcmViYXNlQ29uZmlnID0ge1xyXG4gIGFwaUtleTogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRklSRUJBU0VfQVBJX0tFWSxcclxuICBhdXRoRG9tYWluOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GSVJFQkFTRV9BVVRIX0RPTUFJTixcclxuICBwcm9qZWN0SWQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX1BST0pFQ1RfSUQsXHJcbiAgc3RvcmFnZUJ1Y2tldDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRklSRUJBU0VfU1RPUkFHRV9CVUNLRVQsXHJcbiAgbWVzc2FnaW5nU2VuZGVySWQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX01FU1NBR0lOR19TRU5ERVJfSUQsXHJcbiAgYXBwSWQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FQUF9JRCxcclxufVxyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwcygpLmxlbmd0aCA/IGdldEFwcHMoKVswXSA6IGluaXRpYWxpemVBcHAoZmlyZWJhc2VDb25maWcpXHJcblxyXG5leHBvcnQgY29uc3QgZmlyZWJhc2VBdXRoID0gZ2V0QXV0aChhcHApXHJcbmV4cG9ydCBjb25zdCBnb29nbGVQcm92aWRlciA9IG5ldyBHb29nbGVBdXRoUHJvdmlkZXIoKVxyXG4iXSwibmFtZXMiOlsiaW5pdGlhbGl6ZUFwcCIsImdldEFwcHMiLCJnZXRBdXRoIiwiR29vZ2xlQXV0aFByb3ZpZGVyIiwiZmlyZWJhc2VDb25maWciLCJhcGlLZXkiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfRklSRUJBU0VfQVBJX0tFWSIsImF1dGhEb21haW4iLCJORVhUX1BVQkxJQ19GSVJFQkFTRV9BVVRIX0RPTUFJTiIsInByb2plY3RJZCIsIk5FWFRfUFVCTElDX0ZJUkVCQVNFX1BST0pFQ1RfSUQiLCJzdG9yYWdlQnVja2V0IiwiTkVYVF9QVUJMSUNfRklSRUJBU0VfU1RPUkFHRV9CVUNLRVQiLCJtZXNzYWdpbmdTZW5kZXJJZCIsIk5FWFRfUFVCTElDX0ZJUkVCQVNFX01FU1NBR0lOR19TRU5ERVJfSUQiLCJhcHBJZCIsIk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FQUF9JRCIsImFwcCIsImxlbmd0aCIsImZpcmViYXNlQXV0aCIsImdvb2dsZVByb3ZpZGVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./lib/firebase.ts\n");

/***/ })

};
;