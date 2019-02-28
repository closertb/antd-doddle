import { userStatus } from '../../configs/constants';

export const editFields = {
  status: {
    key: 'status',
    name: '状态',
    required: true,
    type: 'select',
    enums: userStatus
  }
};