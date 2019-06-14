import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Theme, Icon, Fab } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme) => ({
  root: {
    padding: `${theme.spacing(2)}px`,
    backgroundColor: theme.palette.primary.dark,
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridTemplateRows: '1fr 1fr',
    gridTemplateAreas: `
      "title icon"
      "subtitle icon"
    `,
    alignItems: 'center'
  },
  download: {
    gridArea: 'icon',
    '@media print': {
      display: 'none'
    }
  },
  mainTitle: {
    gridArea: 'title'
  },
  subtitle: {
    gridArea: 'subtitle',
  }
}))

export const ResumeHeader: React.FC<{name: string, title: string}> =
({name, title}) => {
  const {root, mainTitle, download, subtitle} = useStyle();

  return (
    <div className={root}>
      <Typography className={mainTitle} variant="h2" color="textSecondary">{name}</Typography>
      <Typography className={subtitle} variant="subtitle1" color="textSecondary">{title}</Typography>
      <Fab className={download} href="resume.pdf" target="_blank">
        <Icon>save_alt</Icon>
      </Fab>
    </div>
  );
}