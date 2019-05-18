import { IMarkdownRemark } from './markdownRemark.interface';

export interface IBlogPostPageContext {
  slug: string;
  previous: IMarkdownRemark;
  next: IMarkdownRemark;
}