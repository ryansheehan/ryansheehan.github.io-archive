import { IDataSite } from './site.interface';

export interface IPageQuery {
  site: IDataSite
}

export type PageQuery<T = {}> = IPageQuery & T
