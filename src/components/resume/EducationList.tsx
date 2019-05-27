import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, Typography, Divider } from '@material-ui/core';
import { ISchool } from '../../interfaces/resume/resume.interface';
import { TimelineLayout } from './TimelineLayout';

const useStyles = makeStyles((theme: Theme) => ({
  root: {

  },
  educationBlock: {
    marginTop: theme.spacing(3)
  }
}))

export const EducationList: React.FC<{education: ISchool[]}> = ({education}) => {
  const {root, educationBlock} = useStyles();

  return (
    <div className={root}>
      <Typography variant="h5" color="textPrimary">Education</Typography>
      <Divider />
      <div>
        {
          education.map(({school, degree, graduation}) =>
          <div className={educationBlock} key={school}>
            <TimelineLayout start={graduation}>
              <Typography variant="subtitle2">{degree}</Typography>
              <Typography component="div" variant="caption">{school}</Typography>
            </TimelineLayout>
          </div>)
        }
      </div>
    </div>
  )
}