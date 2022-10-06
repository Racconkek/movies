import { SortDirection, SortType } from './constants';

export interface Sort {
  type: SortType;
  direction: SortDirection;
}
