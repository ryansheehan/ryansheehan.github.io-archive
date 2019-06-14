import React from "react"
import { graphql, Link as GatsbyLink } from "gatsby"
import { PageProps } from '../interfaces/page-props.interface';
import {makeStyles} from '@material-ui/styles'
import {Typography, Paper, Container, Theme, Link} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto auto',
    minHeight: '600px',
    paddingTop: theme.spacing(4),
    justifyItems: 'center',
    alignItems: 'flex-start'
  },
  container: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center'
  }
}));

const NotFoundPage: React.FC<PageProps> = ({data}) => {
  const {root, container} = useStyles();

  return (
    <Container className={container}>
      <Paper className={root}>
        <div>
          <Typography variant="h1" align="center" gutterBottom>Not Found</Typography>
          <Typography variant="body1" align="center">You just hit a route that doesn&#39;t exist... the sadness.</Typography>
        </div>
        <Link component={GatsbyLink} to="/">Go Home</Link>
      </Paper>
    </Container>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
