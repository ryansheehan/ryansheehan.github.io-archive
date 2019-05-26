import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, Typography, Divider, Icon } from '@material-ui/core';
import { ICompanyInfo } from '../../interfaces/resume/resume.interface';
import { TimelineLayout } from './TimelineLayout';

const useStyles = makeStyles((theme: Theme) =>({
  root: {

  },
  notesContainer: {
    marginTop: theme.spacing(1),
    display: 'grid',
    gridAutoRows: 'auto',
    gridTemplateColumns: 'auto 1fr',
  },
  experienceBlock: {
    marginTop: theme.spacing(3)
  }
}))

export const ExperienceList: React.FC<{experience: ICompanyInfo[]}> = ({experience}) => {
  const {root, notesContainer, experienceBlock} = useStyles();

  return (
    <div className={root}>
      <Typography variant="h5" color="textPrimary">Experience</Typography>
      <Divider />
      <div>
        {experience.map(({start, end, company, title, notes}) =>
        <div key={`${start}-${end}`} className={experienceBlock}>
          <TimelineLayout start={start} end={end}>
            <Typography variant="subtitle2">{title}</Typography>
            <Typography component="div" variant="caption">{company}</Typography>
            <Typography component="div" variant="body2">
              {
                notes.map(note =>
                <div className={notesContainer} key={note}>
                  <Icon style={{fontSize:'.75rem', lineHeight:'1.43'}}>arrow_right</Icon>
                  <div>{note}</div>
                </div>)
              }
            </Typography>
          </TimelineLayout>
        </div>
        )}
      </div>
    </div>
  );
}