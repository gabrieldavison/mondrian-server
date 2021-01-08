"use strict";

require("dotenv/config");

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _page = _interopRequireDefault(require("./routes/page"));

var _box = _interopRequireDefault(require("./routes/box"));

var _createSeedData = _interopRequireDefault(require("./utils/createSeedData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var db = require("./models/index");

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req.context = {
              Page: db.Page,
              Box: db.Box
            };
            next();

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
app.use("/pages", _page["default"]);
app.use("/boxes", _box["default"]);
app.get("*", function (req, res, next) {
  var error = new Error("".concat(req.ip, " tried to access ").concat(req.originalUrl));
  error.statusCode = 301;
  next(error);
});
app.use(function (error, req, res, next) {
  if (!error.statusCode) error.statusCode = 500;

  if (error.statusCode === 301) {
    return res.status(301).redirect("/not-found");
  }

  return res.status(error.statusCode).json({
    error: error.toString()
  });
});
console.log(process.env.ERASE_DB, "erase");
var eraseDatabaseOnSync = process.env.ERASE_DB === "true";
console.log(eraseDatabaseOnSync, "type");
db.sequelize.sync({
  force: eraseDatabaseOnSync
}).then(function () {
  if (eraseDatabaseOnSync) {
    (0, _createSeedData["default"])();
  }

  app.listen(process.env.PORT, function () {
    return console.log("Example app listening on port ".concat(process.env.PORT, "!"));
  });
});