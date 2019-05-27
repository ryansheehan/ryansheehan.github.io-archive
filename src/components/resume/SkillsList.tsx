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
    skillList: {
      display: 'grid',
      gridTemplateRows: 'auto',
      gridTemplateColumns: 'auto auto',
      gridRowGap: theme.spacing(0.5),
    },
    skillMeter: {
      justifySelf: 'right'
    },
    skillGroup: {
      marginTop: theme.spacing(1),
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridAutoRows: 'auto',
      gridRowGap: theme.spacing(0.5),
    }
  }
});

export const SkillList: React.FC<{skills: ISkillCategory[]}> = ({skills: categories}) => {

  const {skillGroup, skillList, skillMeter} = useStyles();

  return (<>{categories.map(({category, skills}) =>
    <div key={category}>
      <Typography variant="h5" align="left" color="textPrimary">{category}</Typography>
      <Divider/>
      <Typography component="div" variant="body2">
        <div key={name} className={skillGroup}>
        {
          skills.map(({name, level}) =>
            <div className={skillList}>
              <div>{name}</div>
              <SkillMeter classNames={skillMeter} size={10} level={level}/>
            </div>
          )
        }
        </div>
      </Typography>
    </div>
  )}</>);
}