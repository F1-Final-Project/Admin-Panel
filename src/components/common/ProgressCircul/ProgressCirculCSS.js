import withStyles from '@material-ui/core/styles/withStyles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core'

export const CssCircularProgress = withStyles({
	colorSecondary: {
		color: '#E9C294'
	},

})(CircularProgress)

export const useStyles = makeStyles({
	layoutProgress: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
})