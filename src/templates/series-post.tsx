import * as React from 'react';
import { graphql, Link } from 'gatsby';
import { PageContext } from '../interfaces/context-props.interface';
import { PageProps } from '../interfaces/page-props.interface';
import { IMarkdownRemark, IAllMarkdownRemark } from '../interfaces/markdownRemark.interface';

interface ISeriesPostContext {
  slug: string;
}

interface ISeriesFields {
  fields: {
    slug: string;
  }
}

interface IPageProps {
  main: IMarkdownRemark,
  series: IAllMarkdownRemark<ISeriesFields>
}

type SeriesPostProps = PageProps<IPageProps> & PageContext<ISeriesPostContext>;

const SeriesPostTemplate: React.FC<SeriesPostProps> = ({data}) => {
  const {html, frontmatter} = data.main;
  const {title} = frontmatter;

  return (<>
    <h1>{title}</h1>
    <div dangerouslySetInnerHTML={{ __html: html }}/>
    <h2>Posts</h2>
    <ul>{
      data.series.edges.map(({node}) => (
        <li><Link to={node.fields.slug}>{node.frontmatter.title}</Link></li>
      ))
    }</ul>
  </>);
}

export default SeriesPostTemplate;

export const pageQuery = graphql`
query SeriestBySlug($slug: String!) {
  site {
    siteMetadata {
      title
      author
    }
  }
  main: markdownRemark(fields: {slug: {eq: $slug}}) {
    id
    html
    frontmatter {
      title
      date(formatString: "MMMM DD, YYYY")
      description
    }
  }
  series: allMarkdownRemark(filter: {fields: {series: {eq: $slug}, isSeriesMeta: {eq: false}}}) {
    edges {
      node {
        excerpt(pruneLength: 160)
        frontmatter {
          title
          description
        }
        fields {
          slug
        }
      }
    }
  }
}
`;
