import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

class ProjectPostsTemplate extends React.Component {
  render() {
    const project = this.props.data.markdownRemark;
    const posts = this.props.data.allMarkdownRemark.edges;
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={project.frontmatter.title}
          description={project.frontmatter.description}
        />
        <h1>{project.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {/* {post.frontmatter.date} */}
        </p>
        {/* <div dangerouslySetInnerHTML={{ __html: post.html }} /> */}
        <ul>
          {posts.map(post => <li>{JSON.stringify(post.node.frontmatter.title)}</li>)}
        </ul>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default ProjectPostsTemplate

export const pageQuery = graphql`
query ProjectPostBySlug($slug: String!, $project: String!) {
  site {
    siteMetadata {
      title
      author
    }
  }
  markdownRemark(fields: { slug: { eq: $slug } }) {
    id
    frontmatter {
      title
      description
    }
  }
	allMarkdownRemark(
    filter: {
      fields: {
        project: {eq: $project}
        isProjectSummary: {eq: false}
      }
      frontmatter: {
        draft: {eq: false}
      }
    }
    sort: { fields: [frontmatter___date], order: DESC }
  ) {
    edges {
      node {
        id
        excerpt(pruneLength: 160)
        fields {
          slug
        }
        frontmatter {
          title
          date
          description
        }
      }
    }
  }
}
`
