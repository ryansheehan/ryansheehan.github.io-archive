import React from 'react';
import { graphql } from 'gatsby';
import { makeStyles } from '@material-ui/styles';
import {
  Paper,
  Theme,
  Container,
  Typography,
} from '@material-ui/core';
import { ResumeHeader } from '../components/resume/ResumeHeader';
import { IResume } from '../interfaces/resume/resume.interface';
import { PersonalInfo } from '../components/resume/PersonalInfo';
import { SkillList } from '../components/resume/SkillsList';
import { ExperienceList } from '../components/resume/ExperienceList';
import { EducationList } from '../components/resume/EducationList';

import './resume.scss'

interface ResumeProps {
  data: {
    resumeYaml: IResume;
  };
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {

    },
    resume: {
      minHeight: '800px',
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
    '@media print': {
      resume: {
        // height: '100%'
      },
      main: {
        alignContent: 'flex-start',
      },
    },
  }
});

const Resume: React.FC<ResumeProps> = ({data}) => {
  const {root, resume, header, main, side} = useStyles();

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