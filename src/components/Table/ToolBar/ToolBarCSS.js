import { makeStyles } from '@material-ui/core/styles'
import { lighten } from '@material-ui/core'

export const useToolbarStyles = makeStyles(theme => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
		borderTop: '1px solid #E9C294',
		borderLeft: '1px solid #E9C294',
		borderRight: '1px solid #E9C294',
	},
	highlight:
		theme.palette.type === 'light'
			? {
				color: theme.palette.secondary.main,
				backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			}
			: {
				color: theme.palette.text.primary,
				backgroundColor: theme.palette.secondary.dark,
			},
	title: {
		flex: '1 1 100%',
	},
}))