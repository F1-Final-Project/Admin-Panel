import {colors, makeStyles} from '@material-ui/core'export default makeStyles(theme => ({    '@global': {        html: {            fontSize: '18px',        },        body: {            backgroundColor: theme.palette.common.white,        },    },    grow: {    	transformOrigin: '50% -200%'	},    paper: {        marginTop: theme.spacing(8),        display: 'flex',        flexDirection: 'column',        alignItems: 'center',    },    avatar: {        margin: theme.spacing(1),        backgroundColor: colors.blue[600],    },}))