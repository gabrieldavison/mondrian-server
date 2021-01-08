"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var db = require("../models/index");

var boxContent = "\n# This is a box\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet purus et malesuada vehicula. Maecenas ullamcorper, enim vel ornare pretium, sapien ligula lacinia justo, et molestie ante quam at risus.\n\nPhasellus at quam vel est aliquam hendrerit. Suspendisse non lacus pellentesque, semper dui vitae, finibus libero. Donec congue maximus commodo. Fusce porttitor luctus ultrices. Curabitur tempus lacus eu vestibulum posuere. Integer tincidunt, arcu vel rutrum elementum, orci nunc dignissim diam, efficitur viverra risus neque ac massa. Donec aliquet sagittis tempor.\n";

var createSeedData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var page1, page2, box1, box2, box3, box4, box5, box6;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return db.Page.create({
              name: "page1"
            });

          case 2:
            page1 = _context.sent;
            _context.next = 5;
            return db.Page.create({
              name: "page2"
            });

          case 5:
            page2 = _context.sent;
            _context.next = 8;
            return db.Box.create({
              content: boxContent,
              position: 1,
              PageId: 1
            });

          case 8:
            box1 = _context.sent;
            _context.next = 11;
            return db.Box.create({
              content: boxContent,
              position: 2,
              PageId: 1
            });

          case 11:
            box2 = _context.sent;
            _context.next = 14;
            return db.Box.create({
              content: boxContent,
              position: 3,
              PageId: 1
            });

          case 14:
            box3 = _context.sent;
            _context.next = 17;
            return db.Box.create({
              content: boxContent,
              position: 1,
              PageId: 2
            });

          case 17:
            box4 = _context.sent;
            _context.next = 20;
            return db.Box.create({
              content: boxContent,
              position: 2,
              PageId: 2
            });

          case 20:
            box5 = _context.sent;
            _context.next = 23;
            return db.Box.create({
              content: boxContent,
              position: 3,
              PageId: 2
            });

          case 23:
            box6 = _context.sent;

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createSeedData() {
    return _ref.apply(this, arguments);
  };
}();

var _default = createSeedData;
exports["default"] = _default;