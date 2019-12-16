import { makeStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import Checkbox from '@material-ui/core/Checkbox'

export const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		borderWidth: '2',
		borderColor: '#7a6c5b',
	},
	panel:{
		color: '#82796d',
		backgroundColor: '#212121',
		backgroundImage: 'repeating-linear-gradient(-45deg, #232324, #232324 2px, transparent 2px, transparent 5px)',
	},
	heading: {
		fontSize: theme.typography.pxToRem(20),
		flexBasis: '33.33%',
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
}));

export const ColorCheckbox = withStyles(theme => ({
		root:{
			color: '#E9C294',
		},
}))(Checkbox);