import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
/**
 * @description: Request list interface parameters
 */
export type DemoParams = BasicPageParams;

export interface DemoListItem {
  count: number;
  next: null;
  previous: null;
  results: [];
}

/**
 * @description: Request list return value
 */
export type DemoListGetResultModel = BasicFetchResult<DemoListItem>;
