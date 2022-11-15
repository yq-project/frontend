export interface GrowCardItem {
  icon: string;
  title: string;
  value: number;
  total: number;
  color: string;
  action: string;
}

export const growCardList: GrowCardItem[] = [
  {
    title: '舆情数（昨日上传）',
    icon: 'visit-count|svg',
    value: 5,
    total: 1000,
    color: 'green',
    action: '日',
  },
  {
    title: '舆情数（最近一周）',
    icon: 'total-sales|svg',
    value: 30,
    total: 1000,
    color: 'blue',
    action: '周',
  },
  {
    title: '舆情数（最近一月）',
    icon: 'download-count|svg',
    value: 100,
    total: 1000,
    color: 'orange',
    action: '月',
  },
  {
    title: '舆情数（最近一年）',
    icon: 'transaction|svg',
    value: 800,
    total: 1000,
    color: 'purple',
    action: '年',
  },
];
