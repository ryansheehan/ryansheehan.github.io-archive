import React from 'react';
import { graphql, Link as GatsbyLink } from 'gatsby';
import { makeStyles } from '@material-ui/styles';
import {
  Theme,
  Typography,
  Container,
  Link,
  Paper,
} from '@material-ui/core';
import { PageProps } from '../interfaces/page-props.interface';
import { ParticleField } from '../components/particle-field/ParticleField';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    minHeight: '600px',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    // filter: 'opacity(20%) blur(10px)'
  }
}));


const MainPage: React.FC<PageProps> = ({data}) => {
  const {title, email} = data.site.siteMetadata;
  const {paper} = useStyles();

  const colorFn = () => [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256),];

  return (
    <>
      <div style={{display: 'flex', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: -100}}>
        <ParticleField backgroundColor={0x0a0a0a} speed={[0.0025, 0.005]} colorFn={colorFn}/>        
      </div>
      <Container>
        <Paper className={paper}>
          <Typography variant="h1" align="center" gutterBottom>{title}</Typography>
          <Typography align="center" component="div">
            <p>This site is under construction.</p>
            <p>Contact <Link href={`mailto:${email}`}>{email}</Link> for more information.</p>
          </Typography>
          <Typography align="center" variant="subtitle2">Looking for my <Link component={GatsbyLink} to="/resume">resume</Link>?</Typography>
        </Paper>
      </Container>
    </>
  )
}

export default MainPage;

// export const pageQuery = graphql`
//   query {
//     site {
//       siteMetadata {
//         title
//         email
//       }
//     }
//     allMarkdownRemark(
//       sort: { fields: [frontmatter___date], order: DESC }
//       filter: {
//         fields: {
//           draft: { eq: false }
//         }
//       }
//     ) {
//       edges {
//         node {
//           excerpt
//           fields {
//             slug
//           }
//           frontmatter {
//             date(formatString: "MMMM DD, YYYY")
//             title
//             description
//           }
//         }
//       }
//     }
//   }
// `

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        email
      }
    }
  }
`;