"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _errors = require("../utils/errors");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)(); //Create Page

router.post("/", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var page;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return req.context.Page.create({
              name: req.body.name
            })["catch"](function (error) {
              return next(error);
            });

          case 2:
            page = _context.sent;
            return _context.abrupt("return", res.send(page));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()); //Get all pages or query pages based on ?param=param

router.get("/", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var pages;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("get");

            if (!(Object.keys(req.query).length !== 0)) {
              _context2.next = 8;
              break;
            }

            console.log(req.query);
            _context2.next = 5;
            return req.context.Page.findOne({
              include: {
                model: req.context.Box
              },
              order: [[req.context.Box, "position", "ASC"]],
              where: _objectSpread({}, req.query)
            })["catch"](next);

          case 5:
            pages = _context2.sent;
            _context2.next = 11;
            break;

          case 8:
            _context2.next = 10;
            return req.context.Page.findAll()["catch"](function (error) {
              return new _errors.NotFoundError(error);
            });

          case 10:
            pages = _context2.sent;

          case 11:
            return _context2.abrupt("return", res.send(pages));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
router.get("/:pageId", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var page;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log(req.query);
            _context3.next = 3;
            return req.context.Page.findAll({
              where: {
                id: req.params.pageId
              }
            })["catch"](function (error) {
              return new _errors.NotFoundError(error);
            });

          case 3:
            page = _context3.sent;
            return _context3.abrupt("return", res.send(page));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}()); //update page

router.put("/:pageId", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var updatedPage;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return req.context.Page.update(req.body, {
              where: {
                id: req.params.pageId
              }
            })["catch"](function (error) {
              return new _errors.NotFoundError(error);
            });

          case 2:
            updatedPage = _context4.sent;
            return _context4.abrupt("return", res.send(updatedPage));

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}()); //Delete page

router["delete"]("/:pageId", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
    var result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return req.context.Page.destroy({
              where: {
                id: req.params.pageId
              }
            })["catch"](next);

          case 2:
            result = _context5.sent;
            return _context5.abrupt("return", res.send(true));

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x11, _x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;