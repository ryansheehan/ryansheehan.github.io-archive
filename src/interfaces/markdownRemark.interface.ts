export interface IMarkdownRemark {
  id: string;
  excerpt: string;
  html: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    date: string;
    title: string;
    description: string;
  }
}

export interface IAllMarkdownRemark {
  edges: {
    node: IMarkdownRemark;
  }[];
}