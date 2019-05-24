import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {Typography, Divider} from '@material-ui/core';
import { ISkillCategory } from '../../interfaces/resume/resume.interface';

const SkillCategory: React.FC<ISkillCategory> = ({category}) => {
  return (
    <div>
      <Typography variant="subtitle2" align="left">{category}</Typography>
    </div>
  );
}

export const SkillList: React.FC<{skills: ISkillCategory[]}> =
({skills}) => {

  return (
    <div>
      <Typography variant="h5" align="center" color="textPrimary">Skills</Typography>
      <Divider variant="middle" style={{marginBottom: '8px'}}/>
      {}
    </div>
  );
}