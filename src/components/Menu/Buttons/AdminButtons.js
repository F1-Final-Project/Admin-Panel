import React from 'react'
import {Link} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import {TableIconButton} from "../../Header/HeaderCss";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import useStyles from './../MenuNav/styleAppBar'

export default function AdminButtons() {
    const classes = useStyles();

    return(
        <>
            <Link className={classes.headerLink} to={'/admin-panel'}>
                <Tooltip title="Go to admin-page" aria-label="go to admin-page">
                    <TableIconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"

                        color="inherit"
                    >
                        <BusinessCenterIcon/>
                    </TableIconButton>
                </Tooltip>
            </Link>
            <Link className={classes.headerLink} to={'/kitchen'}>
                <Tooltip title="Go to cook" aria-label="go to cook">
                    <TableIconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"

                        color="inherit"
                    >
                        <RestaurantMenuIcon/>
                    </TableIconButton>
                </Tooltip>
            </Link>
        </>
    )
}