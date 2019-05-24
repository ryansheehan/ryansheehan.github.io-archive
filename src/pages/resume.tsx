import React, {useState} from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import {
  Switch,
  Paper,
} from '@material-ui/core';

import { mainTheme } from '../themes/main.theme';
import { ResumeHeader } from '../components/resume/ResumeHeader';
import { TypogrpahyDemo } from '../components/resume/TypographyDemo';
import { IResume } from '../interfaces/resume/resume.interface';
import { PersonalInfo } from '../components/resume/PersonalInfo';

interface ResumeProps {
  data: {
    resumeYaml: IResume;
  };
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
  },
  resume: {
    minHeight: '800px',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridTemplateRows: 'auto 1fr',
    gridTemplateAreas: `
      "header header"
      "main side"
    `,
  },
  header: {
    gridArea: 'header'
  },
  main: {
    gridArea: 'main'
  },
  side: {
    gridArea: 'side',
    width: '200px'
  }
});

const Resume: React.FC<ResumeProps> = ({data}) => {
  const {root, resume, header, main, side} = useStyles();
  const [showTypography, setShowTypography] = useState(false);

  const {
    name,
    title,
    personalInfo,
    summary,
    education
  } = data.resumeYaml;


  return (
    <ThemeProvider theme={mainTheme}>
      <Switch checked={showTypography} onChange={() => setShowTypography(!showTypography)} />
      <div className={root}>
        <Helmet>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500|Roboto+Slab:400" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Helmet>
        {showTypography ? <TypogrpahyDemo /> : ''}
        <Paper className={resume}>
          <div className={header}>
            <ResumeHeader name={name} title={title} />
          </div>
          <div className={main}></div>
          <div className={side} style={{
            backgroundColor: mainTheme.palette.primary.light
          }}>
            <PersonalInfo personalInfo={personalInfo} />
          </div>
        </Paper>
      </div>
    </ThemeProvider>
  )
}

export default Resume;


export const pageQuery = graphql`
{
  resumeYaml {
    name
    title
    personalInfo {
      address { city state }
      email
      phone
      website
      social { github }
    }
    summary
    education {
      school
      degree
      graduation
    }
  }
}

`;