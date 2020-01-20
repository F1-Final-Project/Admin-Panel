import React from 'react'
import {useStyles} from './style'
import AuthService from "../../../services/AuthService";
import Tooltip from "@material-ui/core/Tooltip";
import {TableIconButton} from "../../Header/HeaderCss";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {Link} from "react-router-dom";

export default function ActiveOrderButton() {
    const classes=useStyles();

    return(
        <Link className={classes.headerLink} to={'/login'}>
            <Tooltip title="Logout" aria-label="Logout">
                <TableIconButton
                    aria-label="Logout"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={()=>new AuthService().logOut()}
                    color="inherit"
                >
                    <ExitToAppIcon/>
                </TableIconButton>
            </Tooltip>
        </Link>
    )
}