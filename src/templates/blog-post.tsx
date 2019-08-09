import React from "react"
import { Link, graphql } from "gatsby"
import { MarkdownPageProps } from '../interfaces/markdownRemark.interface';
import { PageContext } from '../interfaces/context-props.interface';

interface ISeriesLink {
  link: string;
  title: string;
}

interface IBlogPostContext {
  slug: string;
  previous: ISeriesLink;
  next: ISeriesLink;
}

type BlogPostProps = MarkdownPageProps & PageContext<IBlogPostContext>;

const BlogPostTemplate: React.FC<BlogPostProps> = ({ data, pageContext }) => {
  const { html, frontmatter } = data.markdownRemark;
  const { title, date } = frontmatter;

  const {previous, next} = pageContext;

  return (<>
    <h1>title: {title}</h1>
    <h5>date: {date}</h5>
    <div dangerouslySetInnerHTML={{ __html: html }} />
    <div>
      <div>{
        previous && (
          <Link to={previous.link} rel="prev">← {previous.title}</Link>
        )
      }</div>
      <div>{
        next && (
          <Link to={next.link} rel="next">{next.title} →</Link>
        )
      }</div>
    </div>
  </>);
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
