import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
	card: {
		maxWidth: 345,
	},
	media: {
		height: 140,
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
}))

export const useStylesTheme = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		maxWidth: 752,
	},
	demo: {
		backgroundColor: theme.palette.background.paper,
	},
}))
