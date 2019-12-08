"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setPaginationParam;
exports.Pagination = void 0;
var Pagination = {
  PN: 'pageNo',
  PS: 'pageSize'
};
exports.Pagination = Pagination;

function setPaginationParam(_ref) {
  var PN = _ref.PN,
      PS = _ref.PS;
  Pagination.PN = PN;
  Pagination.PS = PS;
}