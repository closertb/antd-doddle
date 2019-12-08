export const Pagination = {
  PN: 'pageNo',
  PS: 'pageSize'
};

export default function setPaginationParam({ PN, PS }) {
  Pagination.PN = PN;
  Pagination.PS = PS;
}