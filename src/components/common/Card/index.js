import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CardItem from './CardItem'

const useStyles = makeStyles(theme => ({
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

const useStylesTheme = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		maxWidth: 752,
	},
	demo: {
		backgroundColor: theme.palette.background.paper,
	},
}))


export default function MediaCard(props) {

	const [secondary, setSecondary] = React.useState(false)
	const { products } = props
	const classes = useStyles()
	const classesTheme = useStylesTheme()

	console.log('122331', products)
	return (
		<Card className={classes.card}>
			<FormGroup row>
				<FormControlLabel
					control={
						<Checkbox
							checked={secondary}
							onChange={event => setSecondary(event.target.checked)}
							value="secondary"
						/>
					}
					label="Enable secondary text"
				/>
			</FormGroup>
			<CardActionArea>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						Correct order list
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						<div className={classesTheme.demo}>
							<List>
								{
									products.order.map(itemList => {
										return <CardItem itemList={itemList} classes={classes} secondary={secondary} />
									})
								}
							</List>
						</div>
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary">
					Share
				</Button>
				<Button size="small" color="primary">
					Learn More
				</Button>
			</CardActions>

		</Card>
	)
}