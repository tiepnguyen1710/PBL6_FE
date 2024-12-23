export default interface PaginatedData<T> {
  first: number;
  last: number;
  limit: number;
  total: number;
  data: T[];
}

export interface PageDataRequest {
  page: number;
  limit: number;
}
