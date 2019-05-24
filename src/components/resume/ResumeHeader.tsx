import React from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Typography, Icon, Link, Theme } from '@material-ui/core';

// const resumeHeaderStyles = makeStyles({
//   resumeHeader: {
//     display: 'grid',
//     gridTemplateRows: 'auto auto',
//     gridTemplateColumns: 'max-content',
//     justifyContent: 'center',
//   },
//   iconLabel: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     '& > .material-icons': {
//       margin: '0 0.1em 0 0'
//     },
//   },
//   contactInfoContainer: {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr 1fr',
//     border: '2px solid black',
//   }
// })
// export const ResumeHeader: React.FC<{name: string, location: string, email: string, phone: string}> =
// ({name, location, email, phone}) => {
//   const {resumeHeader, iconLabel, contactInfoContainer} = resumeHeaderStyles();

//   return (
//     <div className={resumeHeader}>
//       <Typography variant="h1" display="block" align="center" gutterBottom>{name}</Typography>
//       <Typography variant="subtitle1" align="center">
//         <div className={contactInfoContainer}>
//           <div className={iconLabel}>
//             <Icon fontSize="small">phone</Icon>
//             <Link href={`tel:+1${phone}`}>{`${phone.substr(0,3)}.${phone.substr(3,3)}.${phone.substr(6)}`}</Link>
//           </div>
//           <div className={iconLabel}>
//             <Icon fontSize="small">mail</Icon>
//             <Link href={`mailto:${email}`}>{email}</Link>
//           </div>
//           <div className={iconLabel}>
//             <Icon fontSize="small">location_on</Icon>
//             <Link href="https://www.google.com/maps/dir/Prosper,+TX+75078//@33.2362947,-96.8361294,13z/data=!4m9!4m8!1m5!1m1!1s0x864c3f677146866f:0x19e803820966f487!2m2!1d-96.80111!2d33.2362278!1m0!3e0" target="_blank">{location}</Link>
//           </div>
//         </div>
//       </Typography>
//     </div>
//   );
// }

const useStyle = makeStyles({
  root: {
    padding: '0 24px'
  }
})

export const ResumeHeader: React.FC<{name: string, title: string}> =
({name, title}) => {
  const {root} = useStyle();
  const theme = useTheme<Theme>();

  return (
    <div className={root} style={{
      backgroundColor: theme.palette.primary.dark,
    }}>
      <Typography variant="h2" color="textSecondary">{name}</Typography>
      <Typography variant="subtitle1" color="textSecondary">{title}</Typography>
    </div>
  );
}