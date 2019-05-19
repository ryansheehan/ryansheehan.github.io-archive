import React from 'react';
import { graphql } from 'gatsby';
import classNames from 'classnames/bind';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const MainPage: React.FunctionComponent<any> = ({data}) => {
  const { title, email } = data.site.siteMetadata;

  return (
    <div className={cx('mainPageContainer')}>
      <h1>{title}</h1>
      <div>Coming soon!</div>
      <div>Contact <a href={`mailto:${email}`}>{email}</a></div>
    </div>
  );
};

export default MainPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        email
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fields: {
          draft: { eq: false }
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