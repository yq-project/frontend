import { FormSchema } from '/@/components/Form';

const basicOptions: LabelValueOptions = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
];

const storeTypeOptions: LabelValueOptions = [
  {
    label: '一周',
    value: '1',
  },
  {
    label: '一个月',
    value: '2',
  },
  {
    label: '永久',
    value: '2',
  },
];

export const taskSchemas: FormSchema[] = [
  {
    field: 't1',
    component: 'Select',
    label: '公告类别',
    componentProps: {
      options: basicOptions,
    },
    required: true,
  },
  {
    field: 't2',
    component: 'Select',
    label: '显示天数',
    required: true,
    componentProps: {
      options: storeTypeOptions,
    },
    colProps: {
      offset: 2,
    },
  },
  {
    field: 't3',
    component: 'Input',
    label: '公告标题',
    required: true,
    colProps: {
      offset: 2,
    },
  },
];
