import React, {useState} from 'react';
import { graphql } from 'gatsby';
// import Helmet from 'react-helmet';
// import { mainTheme } from '../themes/main.theme';
import { makeStyles } from '@material-ui/styles';
import {
  Switch,
  Paper,
  // CssBaseline,
  Theme,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import { ResumeHeader } from '../components/resume/ResumeHeader';
import { TypographyDemo } from '../components/resume/TypographyDemo';
import { IResume } from '../interfaces/resume/resume.interface';
import { PersonalInfo } from '../components/resume/PersonalInfo';
import { SkillList } from '../components/resume/SkillsList';
import { ExperienceList } from '../components/resume/ExperienceList';
import { EducationList } from '../components/resume/EducationList';

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
    section: {
      marginTop: theme.spacing(2)
    },
    header: {
      gridArea: 'header'
    },
    main: {
      gridArea: 'main',
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto auto auto',
      gridRowGap: theme.spacing(1),
      padding: theme.spacing(2),
    },
    side: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.primary.light,
      gridArea: 'side',
      display: 'grid',
      gridTemplateColumns: 'auto',
      gridAutoRows: 'auto',
      gridRowGap: theme.spacing(1),
      alignContent: 'flex-start'
    },
  }
});

const Resume: React.FC<ResumeProps> = ({data}) => {
  const {root, resume, header, main, side, section} = useStyles();
  const [showTypography, setShowTypography] = useState(false);

  const {
    name,
    title,
    personalInfo,
    summary,
    education,
    experience,
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
            <Typography variant="body2">{summary}</Typography>
            <ExperienceList experience={experience} />
            <EducationList education={education} />
          </div>
          <div className={side}>
            <PersonalInfo personalInfo={personalInfo} />
            <SkillList skills={skills} />
          </div>
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
    experience {
      company
      title
      start
      end
      notes
    }
    skills {
      category
      skills { name level }
    }
  }
}

`;