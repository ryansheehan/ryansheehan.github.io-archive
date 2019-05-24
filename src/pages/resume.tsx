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
      backgroundColor: theme.palette.primary.light,
      gridArea: 'side',
      // width: '200px'
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
      <div className={root}>
        {showTypography ? <TypographyDemo /> : ''}
        <Paper className={resume}>
          <div className={header}>
            <ResumeHeader name={name} title={title} />
          </div>
          <div className={main}>
            <div style={{height: '40px'}}></div>
            <Divider variant="middle"/>
          </div>
          <div className={side}>
            <PersonalInfo personalInfo={personalInfo} />
            <SkillList skills={skills} />
          </div>
        </Paper>
      </div>
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