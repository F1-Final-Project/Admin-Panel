import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
    '@global': {
        html: {
            fontSize: '17px',
        },
    },
    paper: {
        color: '#7a6c5b',
        marginTop: theme.spacing(7),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    h1: {
        color: '#E9C294'
    }
}));




