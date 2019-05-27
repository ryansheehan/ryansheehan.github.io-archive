import React from 'react';
import {
  Typography,
  Divider,
  makeStyles,
  Theme
} from '@material-ui/core';
import { ISkillCategory } from '../../interfaces/resume/resume.interface';
import { SkillMeter } from './SkillMeter';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridAutoRows: 'auto',
      gridRowGap: theme.spacing(1)
    },
    skillList: {
      display: 'grid',
      gridTemplateRows: 'auto auto',
      gridTemplateColumns: 'auto auto',
      gridRowGap: theme.spacing(0.5),
    },
    skillMeter: {
      justifySelf: 'right'
    },
    skillGroup: {
      marginTop: theme.spacing(1)
    }
  }
});

export const SkillList: React.FC<{skills: ISkillCategory[]}> =
({skills: categories}) => {

  const {root, skillGroup, skillList, skillMeter} = useStyles();

  return (
    <div className={root}>
      {
        categories.map(({category, skills}) =>
          <div key={category}>
            <Typography variant="h5" align="left" color="textPrimary">{category}</Typography>
            <Divider/>
            <div key={name} className={skillGroup}>
            {
              skills.map(({name, level}) =>
                <Typography component="div" variant="body2">
                  <div className={skillList}>
                    <div>{name}</div>
                    <SkillMeter classNames={skillMeter} size={10} level={level}/>
                  </div>
                </Typography>
              )
            }
            </div>
          </div>
        )
      }
    </div>
  );
}