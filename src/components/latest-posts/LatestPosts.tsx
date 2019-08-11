import * as React from 'react';
import {useStaticQuery, graphql, Link} from 'gatsby';

interface IQueryResponse {
  allMarkdownRemark: {
    totalCount: number;
    edges: {
      node: {
        excerpt: string;
        frontmatter: {
          title: string;
          description: string;
        }
        fields: {
          slug: string;
        }
      }
    }[]
  }
}

export const LatestPosts: React.FC = () => {
  const {allMarkdownRemark} = useStaticQuery<IQueryResponse>(graphql`
  {
    allMarkdownRemark(filter: {fields: {draft: {eq: false}, isSeriesMeta: {eq: false}}}, sort: {fields: frontmatter___date, order: DESC}, limit: 10) {
      totalCount
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
  `)

  const {edges} = allMarkdownRemark

  return (<>
    <div>Latest Posts</div>
    <div>{
      edges.map(({node}) => (<Link to={node.fields.slug}>{node.frontmatter.title}</Link>))
    }</div>
  </>)
} 