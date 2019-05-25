import React, {useState} from 'react';
import { graphql } from 'gatsby';
// import Helmet from 'react-helmet';
// import { mainTheme } from '../themes/main.theme';
import { makeStyles } from '@material-ui/styles';
import {
  Switch,
  Paper,
  // CssBaseline,
  Divider,
  Theme,
  Container,
  Grid,
} from '@material-ui/core';
import { ResumeHeader } from '../components/resume/ResumeHeader';
import { TypographyDemo } from '../components/resume/TypographyDemo';
import { IResume } from '../interfaces/resume/resume.interface';
import { PersonalInfo } from '../components/resume/PersonalInfo';
import { SkillList } from '../components/resume/SkillsList';

interface ResumeProps {
  data: {
    resumeYaml: IResume;
  };
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      // display: 'flex',
      // flexFlow: 'column nowrap',
      // alignItems: 'center',
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
      padding: `${theme.spacing(2)}px`,
      backgroundColor: theme.palette.primary.light,
      gridArea: 'side',
    }
  }
});

const Resume: React.FC<ResumeProps> = ({data}) => {
  const {root, resume, header, main, side} = useStyles();
  const [showTypography, setShowTypography] = useState(false);

  const {
    name,
    title,
    personalInfo,
    // summary,
    // education,
    skills
  } = data.resumeYaml;


  return (
    <React.Fragment>
      <Switch checked={showTypography} onChange={() => setShowTypography(!showTypography)} />
      {showTypography ? <TypographyDemo /> : ''}
      <Container className={root}>
        <Paper className={resume}>
          <div className={header}>
            <ResumeHeader name={name} title={title} />
          </div>
          <div className={main}>
          </div>
          <Grid className={side} direction="column" justify="space-around" alignItems="stretch">
            <PersonalInfo personalInfo={personalInfo} />
            <SkillList skills={skills} />
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  )
}

export default Resume;


export const pageQuery = graphql`
{
  resumeYaml {
    name
    title
    personalInfo {
      address { city state zip }
      email
      phone
      website
      social { github linkedin }
    }
    summary
    education {
      school
      degree
      graduation
    }
    skills {
      category
      skills { name level }
    }
  }
}

`;