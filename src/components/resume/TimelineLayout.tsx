import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  noWrap: {
    whiteSpace: 'nowrap'
  },
  root: {
    display: 'grid',
    gridTemplateColumns: '64px 1fr',
    gridTemplateRows: '1fr',
    gridColumnGap: theme.spacing(3),
  }
}));

export const TimelineLayout: React.FC<{start: string, end?: string}> = ({start, end, children}) => {
  const {noWrap, root} = useStyles();

  return (
    <div className={root}>
      <Typography component="div" variant="body1">
          <div className={noWrap}>{start}{end ? ' -' : ''}</div>
          {end ? <div>{end}</div> : ''}
      </Typography>
      <div>
        {children}
      </div>
    </div>
  );
}