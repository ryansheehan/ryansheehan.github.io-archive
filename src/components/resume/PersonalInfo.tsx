import React from 'react';
import { IPersonalInfo } from '../../interfaces/resume/resume.interface';
import { Typography, Divider, Link, Icon, IconButton, SvgIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Github from '../../images/github-1.svg';
import LinkedIn from '../../images/linkedin-3.svg';

const useStyles = makeStyles({
  root: {
  },
  label: {
    margin: '0 16px'
  },
  value: {
    margin: '0 0 8px 24px'
  },
  iconLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    '& > .material-icons': {
      margin: '0 0.1em 0 0'
    },
  },
});

const LabeledData: React.FC<{header: string; iconName: string;}> = ({header, iconName, children}) => {
  const {label, value, iconLabel} = useStyles();
  return (
    <>
      <Typography className={label} variant="subtitle2" align="left">
        <div className={iconLabel}>
          <Icon fontSize="small">{iconName}</Icon>
          <span>{header}</span>
        </div>
      </Typography>
      <Typography className={value} variant="body2" align="left" color="textPrimary">
        {children}
      </Typography>
    </>
  );
}

export const PersonalInfo: React.FC<{personalInfo: IPersonalInfo}> =
({personalInfo}) => {

  const {root, label} = useStyles();

  const {address, email, phone, website, social} = personalInfo;
  const location = `${address.city}, ${address.state}`;

  return (
    <div className={root}>
      <Typography className={label} variant="h5" align="left">Personal Info</Typography>
      <Divider variant="middle" style={{marginBottom: '8px'}}/>

      <LabeledData header="Location" iconName="location_on">
        <Link href="https://www.google.com/maps/dir/Prosper,+TX+75078//@33.2362947,-96.8361294,13z/data=!4m9!4m8!1m5!1m1!1s0x864c3f677146866f:0x19e803820966f487!2m2!1d-96.80111!2d33.2362278!1m0!3e0" target="_blank" color="inherit">{location}</Link>
      </LabeledData>

      <LabeledData header="Phone" iconName="phone">
        <Link href={`tel:+1${phone}`} color="inherit">{`${phone.substr(0,3)}.${phone.substr(3,3)}.${phone.substr(6)}`}</Link>
      </LabeledData>

      <LabeledData header="Email" iconName="email">
        <Link href={`mailto:${email}`} color="inherit">{email}</Link>
      </LabeledData>

      <LabeledData header="Website" iconName="web">
        <Link href={website} color="inherit">{website.substr(8)}</Link>
      </LabeledData>

      <Divider variant="middle" style={{margin: '8px 0 0 0'}} />
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <IconButton href={social.github}>
          <Github/>
        </IconButton>
        <IconButton href={social.linkedin}>
          <LinkedIn/>
        </IconButton>
      </div>
    </div>
  );
};