import React from 'react';
import { MD5 } from '../../utils/yamd5';

export const NoImageOption = {
  NotFound: '404',
  MysteryPerson: 'mp',
  Geometric: 'identicon',
  Monster: 'monsterid',
  Cartoon: 'wavatar',
  Bit8: 'retro',
  Robot: 'robohash',
  Blank: 'blank',
};

export interface GravatarProps {
  email: string;
  size: number;
  noImageOption: typeof NoImageOption
}

export const Gravatar: React.FunctionComponent<GravatarProps> = ({email, size=80, noImageOption=undefined, ...props}) => {
  const hash = MD5.hashStr(email);
  const imgSize = Math.max(1, Math.min(2048, size));

  return (
    <img {...props} alt={email} src={`https://www.gravatar.com/avatar/${hash}?s=${imgSize}${noImageOption ? `&d=${noImageOption}` : ''}`} />
  )
}
