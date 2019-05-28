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
      textAlign: 'right'
    },
    skillGroup: {
      marginTop: theme.spacing(1),
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridAutoRows: 'auto',
      gridRowGap: theme.spacing(0.5),
    },
    skillCategory: {

    },
    '@media print': {
      skillCategory: {
        // pageBreakInside: 'avoid'
      },
      skillGroup: {
        // pageBreakInside: 'avoid'
      }
    }
  }
});

export const SkillList: React.FC<{skills: ISkillCategory[]}> = ({skills: categories}) => {

  const {skillGroup, skillList, skillMeter, skillCategory} = useStyles();
  const getSkillLevelName = (level: number) => {
    let name = 'none';
    switch(level) {
      case 1: name = 'Interested'; break;
      case 2: name = 'Learning'; break;
      case 3: name = 'Intermediate'; break;
      case 4: name = 'Advanced'; break;
      case 5: name = 'Expert'; break;
    }
    return name;
  }

  return (<>{categories.map(({category, skills}) =>
    <div key={category} className={skillCategory}>
      <Typography variant="h5" align="left" color="textPrimary">{category}</Typography>
      <Divider/>
      <Typography component="div" variant="body2">
        <div className={skillGroup}>
        {
          skills.map(({name, level}) =>
            <div  key={name} className={skillList}>
              <div>{name}</div>
              <div>
                <SkillMeter classNames={skillMeter} size={10} level={level}/>
                <Typography component="div" variant="caption" align="right">{getSkillLevelName(level)}</Typography>
              </div>
            </div>
          )
        }
        </div>
      </Typography>
    </div>
  )}</>);
}