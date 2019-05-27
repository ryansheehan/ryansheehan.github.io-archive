import React, { useState, useEffect } from 'react';
import {makeStyles} from '@material-ui/styles';
import {
  Theme,
  Icon,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  meter: {
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
  // const [skillWord, setSkillWord] = useState('none');
  // useEffect(() => {
  //   switch(level) {
  //     case 1: setSkillWord('Interested'); break;
  //     case 2: setSkillWord('Basic'); break;
  //     case 3: setSkillWord('Intermediate'); break;
  //     case 4: setSkillWord('Advanced'); break;
  //     case 5: setSkillWord('Expert'); break;
  //   }
  // });
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