import { PageProps } from './page-props.interface';

export interface IMarkdownRemark {
  id: string;
  excerpt: string;
  html: string;
  frontmatter: {
    date: string;
    title: string;
    description: string;
  }
}

export interface IAllMarkdownRemark<T = {}> {
  edges: {
    node: IMarkdownRemark & T;
  }[];
}

export type MarkdownPageProps = PageProps<{markdownRemark: IMarkdownRemark}>;