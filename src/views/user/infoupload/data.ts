import { FormSchema } from '/@/components/Form';

const departmentOptions: LabelValueOptions = [
  {
    label: '电院',
    value: '电院',
  },
  {
    label: '后勤',
    value: '后勤',
  },
];

const TypeOptions: LabelValueOptions = [
  {
    label: '生活',
    value: '生活',
  },
  {
    label: '科研',
    value: '科研',
  },
  {
    label: '疫情',
    value: '疫情',
  },
];

export const schemas: FormSchema[] = [
  {
    field: 'subject',
    component: 'Input',
    label: '主题',
    required: true,
  },
  {
    field: 'content',
    component: 'InputTextArea',
    label: '内容',
    required: true,
  },
  {
    field: 'infoUrl',
    component: 'Input',
    label: '链接',
    required: true,
  },
  {
    field: 'department',
    component: 'Select',
    label: '涉及单位',
    componentProps: {
      options: departmentOptions,
    },
    required: true,
  },
  {
    field: 'infoType',
    component: 'Select',
    label: '信息种类',
    componentProps: {
      options: TypeOptions,
    },
    required: true,
  },
  {
    field: 'tip',
    component: 'Input',
    label: '备注',
    required: true,
  },
];
