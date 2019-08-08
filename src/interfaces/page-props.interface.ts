import {PageRendererProps} from 'gatsby';
import { PageQuery } from './page-query.interface';

export type PageProps<T={}> = {data: PageQuery<T>, uri: string, path: string} & PageRendererProps;