"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _errors = require("../utils/errors");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)(); //Create box

router.post("/", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var box;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return req.context.Box.create(req.body)["catch"](function (error) {
              return new _errors.BadRequestError(error);
            });

          case 2:
            box = _context.sent;
            return _context.abrupt("return", res.send(box));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // Get all boxes

router.get("/", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var boxes;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return req.context.Box.findAll()["catch"](function (error) {
              return new _errors.NotFoundError(error);
            });

          case 2:
            boxes = _context2.sent;
            return _context2.abrupt("return", res.send(boxes));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); //Get specific box

router.get("/:boxId", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var box;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return req.context.Box.findAll({
              where: {
                id: req.params.boxId
              }
            })["catch"](function (error) {
              return new _errors.NotFoundError(error);
            });

          case 2:
            box = _context3.sent;
            return _context3.abrupt("return", res.send(box));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); //Update box

router.put("/:boxId", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var updatedBox;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return req.context.Box.update(req.body, {
              where: {
                id: req.params.boxId
              }
            })["catch"](function (error) {
              return new _errors.NotFoundError(error);
            });

          case 2:
            updatedBox = _context4.sent;
            return _context4.abrupt("return", res.send(updatedBox));

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()); //Update multiple boxes, takes an array of boxes.

router.put("/", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var updatedBoxes;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log("multiple boxes");
            console.log(req.body);
            updatedBoxes = req.body.forEach( /*#__PURE__*/function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(box) {
                var updatedBox;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return req.context.Box.update(box, {
                          where: {
                            id: box.id
                          }
                        })["catch"](function (error) {
                          return new _errors.NotFoundError(error);
                        });

                      case 2:
                        updatedBox = _context5.sent;

                      case 3:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x11) {
                return _ref6.apply(this, arguments);
              };
            }());
            return _context6.abrupt("return", res.send(updatedBoxes));

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()); //Delete box

router["delete"]("/:boxId", /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res, next) {
    var result;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return req.context.Box.destroy({
              where: {
                id: req.params.boxId
              }
            })["catch"](next);

          case 2:
            result = _context7.sent;
            return _context7.abrupt("return", res.send(true));

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x12, _x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;