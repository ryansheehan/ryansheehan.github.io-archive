import React, { useState, useEffect } from 'react';
import {makeStyles} from '@material-ui/styles';
import {
  Theme,
  Icon,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  meter: {
    whiteSpace: 'nowrap',
    '&>*': {
      marginRight: theme.spacing(0.7),
    },
    '&>*:last-child': {
      marginRight: '0'
    }
  },
  grey: {
    opacity: 0.4
  },
  dot: {
  }
}));

export const SkillMeter: React.FC<{level: number, size?: number, classNames?: string}> = ({level, size=14, classNames}) => {
  const {meter, dot, grey} = useStyles();
  const [dotClassNames, setDotClassNames] = useState<string[]>([]);
  useEffect(() => {
    const names = [];
    for(let i =0, on=dot, off=`${dot} ${grey}`; i < 5; i++) {
      names[i] = i < level ? on : off;
    }
    setDotClassNames(names);
  })

  return (
    <div className={`${meter} ${classNames}`}>
      {dotClassNames.map((className, i) => <Icon key={i} style={{
        fontSize: `${size}px`,
      }} className={className}>lens</Icon>)}
    </div>
  );
}