export var Pagination = {
  PN: 'pageNo',
  PS: 'pageSize'
};
export default function setPaginationParam(_ref) {
  var PN = _ref.PN,
      PS = _ref.PS;
  Pagination.PN = PN;
  Pagination.PS = PS;
}