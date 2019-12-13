import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	test: {
		alignItems: 'flex-start',
		flexWrap: 'wrap',
		alignContent: 'center',
	},
	rootTest: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
	gridOrder: {
		display: 'grid',
		gridGap: '20px',
		gridTemplateColumns: 'repeat(auto-fill, minmax(250px,1fr))',
		gridAutoRows: '20px'
	},

}))