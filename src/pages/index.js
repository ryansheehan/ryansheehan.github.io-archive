import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const {site, posts, projects} = data;
    const siteTitle = site.siteMetadata.title


    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`, `software engineering`, `software development`]}
        />
        <Bio />
        <h2>Latest Posts</h2>
        {posts.edges.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </div>
          )
        })}
        <h2>Projects</h2>
        <ul>
          {projects.edges.map(({node}) => <li>{node.frontmatter.title}</li>)}
        </ul>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
query {
  site {
    siteMetadata {
      title
    }
  }
  posts: allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC }
    filter: {
      fields: {
        draft: { eq: false }
        isProjectSummary: { eq: false }
      }
    }
    limit: 3
  ) {
    edges {
      node {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
  projects: allMarkdownRemark(
    sort: { fields: [frontmatter___title], order: DESC }
    filter: {
      fields: {
        isProjectSummary: { eq: true }
      }
    }
  ) {
    edges {
      node {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
}
`
