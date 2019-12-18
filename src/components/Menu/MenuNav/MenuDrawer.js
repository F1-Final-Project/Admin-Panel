import IconButton from '@material-ui/core/IconButton/index'
import ChevronRightIcon from '@material-ui/core/SvgIcon/SvgIcon'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import clsx from 'clsx'
import Divider from '@material-ui/core/Divider/index'
import List from '@material-ui/core/List/index'
import ListItemIcon from '@material-ui/core/ListItemIcon/index'
import ListItemText from '@material-ui/core/ListItemText/index'
import React from 'react'
import {useStyles, ColorDrawer, ColorListItem} from './styleDrawer'
import { useTheme } from '@material-ui/core/styles/index';

export default function MenuDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();

  const {categories, open, handleDrawerClose, getDishes}=props;

  return(
    <ColorDrawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      open={open}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {categories.map((item, index) => (
          <ColorListItem button key={item._id} onClick={()=>{getDishes(item)}}>
            <ListItemIcon>
              <img src={item.icon} alt='icon'/>
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ColorListItem>
        ))}
      </List>
    </ColorDrawer>
  );
}