import React from 'react';
import {
  Typography,
  Divider,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  makeStyles,
  Theme
} from '@material-ui/core';
import { ISkillCategory } from '../../interfaces/resume/resume.interface';

const useStyles = makeStyles((theme: Theme) => {
  const removeMarginPadding = {
    margin: 0,
    padding: 0
  }

  return {
    categoriesList: {
      width: '100%',
      maxWidth: 360,
    },
    categoryListItem: {
      ...removeMarginPadding,
      lineHeight: 1.58
    },
    nested: {
      ...removeMarginPadding,
      paddingLeft: theme.spacing(2),
    }
  }
});

export const SkillList: React.FC<{skills: ISkillCategory[]}> =
({skills: categories}) => {

  const {nested, categoriesList, categoryListItem} = useStyles();

  return (
    <div>
      <Typography variant="h5" align="left" color="textPrimary">Skills</Typography>
      <Divider/>
      <List dense
            disablePadding
            className={categoriesList}
            // component="div"
      >{
        categories.map(({category, skills}) =>
          <ListItem key={category}
                    // component="div"
                    className={categoryListItem}
                    disableGutters
          >
            <List dense
                  // component="div"
                  disablePadding
                  subheader={
                    <ListSubheader  disableGutters
                                    color="inherit"
                                    className={categoryListItem}
                                    // component="div"
                    >{category}</ListSubheader>
                  }
            >{
              skills.map(({name}) =>
                <ListItem key={name}
                          // component="div"
                          disableGutters
                          className={nested}
                >
                  <ListItemText>{name}</ListItemText>
                </ListItem>
              )
            }</List>
          </ListItem>
        )
      }</List>
    </div>
  );
}