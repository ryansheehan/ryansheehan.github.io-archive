import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Theme } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme) => ({
  root: {
    padding: '0 24px',
    backgroundColor: theme.palette.primary.dark
  }
}))

export const ResumeHeader: React.FC<{name: string, title: string}> =
({name, title}) => {
  const {root} = useStyle();

  return (
    <div className={root}>
      <Typography variant="h2" color="textSecondary">{name}</Typography>
      <Typography variant="subtitle1" color="textSecondary">{title}</Typography>
    </div>
  );
}