import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby"

interface IStaticQueryResponse {
  allMarkdownRemark: {
    totalCount: number;
    edges: {node: {
      excerpt: string;
      frontmatter: {
        title: string;
        description: string;
      }
      fields: {
        slug: string;
      }
    }}[]
  }
}

export const SeriesList = () => {
  const data = useStaticQuery<IStaticQueryResponse>(graphql`
    query {
      allMarkdownRemark(filter: {fields: {draft: {eq: false}, isSeriesMeta: {eq: true}}}) {
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
  `);

  const {totalCount, edges} = data.allMarkdownRemark;
  
  return (<>
    <div>Series Count: {totalCount}</div>
    <div>{
      edges.map(edge => (<Link key={edge.node.fields.slug} to={`/${edge.node.fields.slug}`}>{
        edge.node.frontmatter.title
      }</Link>))
    }</div>
  </>)
}
