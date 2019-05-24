import React from 'react';
import { IPersonalInfo } from '../../interfaces/resume/resume.interface';
import { Typography, Divider, Link, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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

export const PersonalInfo: React.FC<{personalInfo: IPersonalInfo}> =
({personalInfo}) => {

  const {root, label, value, iconLabel} = useStyles();

  const {address, email, phone, website, social} = personalInfo;
  const location = `${address.city}, ${address.state}`;

  return (
    <div className={root}>
      <Typography className={label} variant="h5" align="left">Personal Info</Typography>
      <Divider variant="middle" style={{marginBottom: '8px'}}/>

      <Typography className={label} variant="subtitle2" align="left">
        <div className={iconLabel}>
          <Icon fontSize="small">location_on</Icon>
          <span>Location</span>
        </div>
      </Typography>
      <Typography className={value} variant="body2" align="left">
        <Link href="https://www.google.com/maps/dir/Prosper,+TX+75078//@33.2362947,-96.8361294,13z/data=!4m9!4m8!1m5!1m1!1s0x864c3f677146866f:0x19e803820966f487!2m2!1d-96.80111!2d33.2362278!1m0!3e0" target="_blank">{location}</Link>
      </Typography>

      <Typography className={label} variant="subtitle2" align="left">
        <div className={iconLabel}>
          <Icon fontSize="small">phone</Icon>
          <span>Phone</span>
        </div>
      </Typography>
      <Typography className={value} variant="body2" align="left">
        <Link href={`tel:+1${phone}`}>{`${phone.substr(0,3)}.${phone.substr(3,3)}.${phone.substr(6)}`}</Link>
      </Typography>

      <Typography className={label} variant="subtitle2" align="left">
        <div className={iconLabel}>
          <Icon fontSize="small">mail</Icon>
          <span>Email</span>
        </div>
      </Typography>
      <Typography className={value} variant="body2" align="left">
        <Link href={`mailto:${email}`}>{email}</Link>
      </Typography>
    </div>
  );
};