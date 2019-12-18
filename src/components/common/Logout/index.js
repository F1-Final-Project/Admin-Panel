import React from 'react'
import {useStyles} from './style'
import AuthService from "../../../services/AuthService";

export default function ActiveOrderButton() {
    const classes=useStyles();

    const handleClick = () => {
        new AuthService().logOut();
        setTimeout(() => {window.location.href = '/'}, 0)
    };

    return(
            <span className={classes.icon}
                onClick={handleClick} >
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABL0lEQVRIie2UMUvDQBiG3y/nrIu0B+quEmcpFkLsKPgzAkHya1KM/R0OThoaihYcG8S9BVPj0h9w9zkJIZie9FoXfbf77sn7cHcQ4D+GUHVRZtcXmvUAhL0V+2bkcNDqRndfA6e6q6FvLMoBYF9rGlQHTh2wKAcAEHCwTLD22AmYxwAWmxI8tb2ow0p0AbxvQnBcpIkr/TBnJXpNEhvBDgn1UAzjE+mHuVDsAfxWh7aMNUxnbe/q0YTt+tFrOYovtcZzdW4+AWkyMktiPgFoNM/6TZslM/ekF00+0vhQabqtAzZvsGAlzqUXTYo0cZWgIQC5TsGL9MO8SBOXhLoH0PoO+sEVNaYzz/pjQB0B2G6CbAQAcGoCfv1fNLMtZGDaKCCHAxsJA1OHKFj1+z+aT9r1Xfy9rxI7AAAAAElFTkSuQmCC">
                </img>
            </span>
    )
}