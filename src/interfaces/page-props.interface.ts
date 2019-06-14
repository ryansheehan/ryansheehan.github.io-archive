import {PageRendererProps} from 'gatsby';
import { IPageQuery } from './page-query.interface';

export type PageProps = {data: IPageQuery} & PageRendererProps;