export interface BasePageResult<T> {
  count: number;
  page?: number;
  limit?: number;
  items: T[];
}
