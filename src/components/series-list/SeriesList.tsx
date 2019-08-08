import React from "react";
import { useStaticQuery, graphql } from "gatsby"

export const SeriesList = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const {title} = data.site.siteMetadata;
  
  return (
    <div>
      SeriesList Component {title} 
    </div>
  )
}
