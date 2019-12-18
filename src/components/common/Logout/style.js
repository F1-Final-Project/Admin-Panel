import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

 export const useStyles = makeStyles(theme => ({
    icon:{
        margin: 5,
        '&:hover': {
            cursor: 'pointer',
        },
    },
}));
