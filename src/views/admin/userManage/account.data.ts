import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'account',
    width: 120,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '角色',
    dataIndex: 'role',
    width: 200,
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '用户名',
    component: 'Input',
    required: true,
  },
  {
    field: 'number',
    label: '学号',
    component: 'Input',
    required: true,
  },
  {
    label: '角色',
    field: 'role',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '管理员',
          value: 0,
        },
        {
          label: '普通用户',
          value: 1,
        },
        {
          label: '学院领导',
          value: 2,
        },
      ],
    },
    required: true,
  },
  {
    field: 'department',
    label: '所属部门',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '网宣办',
          value: 'wxb',
        },
        {
          label: '电院',
          value: 'dy',
        },
      ],
    },
    required: true,
  },
];
