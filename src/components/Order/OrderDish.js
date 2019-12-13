import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import DeleteItemOrderButton from './Buttons/DeleteItemOrderButton'
import UpdateItemOrderButton from './Buttons/UpdateItemOrderButton'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
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

export default function OrderDish(props) {
	const {item, index, order, updateOrderItemChange, expanded, handleChange}=props;
	const classes = useStyles();

	const updateItemIngredients=(ingredient)=> (event) => {
		if (event.target.checked) {
			item.ingredients.push(ingredient);
			item.additionalIngredients=item.additionalIngredients.filter((item) => {
				return item._id !== ingredient._id
			})
		} else
		{
			item.additionalIngredients.push(ingredient);
			item.ingredients= item.ingredients.filter((item) => {
				return item._id !== ingredient._id
			})
		}
	};

	const submitItemChange=()=>{
		const newItem = {
			title: item.title,
			description: item.description,
			ingredients: item.ingredients,
			additionalIngredients: item.additionalIngredients,
			price: item.price,
			weight: item.weight,
		}
		updateOrderItemChange(newItem);
	};

	return (
		<ExpansionPanel expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
			<ExpansionPanelSummary
				aria-controls={`panel${index}bh-content`}
				id={`panel${index}bh-header`}
			>
				<Grid container justify="space-between">
					<Typography className={classes.heading}>{item.title}</Typography>
					<p>{item.price} $</p>
					<DeleteItemOrderButton order={order} item={item}/>
				</Grid>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<Grid container justify="space-between">
					<Typography component={'span'}>
						{(item.ingredients).map((ingredient)=>
							<div key={ingredient._id}>
								<FormControlLabel
									control={
										<Checkbox
											defaultChecked
											onChange={updateItemIngredients(ingredient)}
											color="primary"
										/>
									}
									label={ingredient.title}
								/>
							</div>
						)}
					</Typography>
					<Typography component={'span'}>
						{(item.additionalIngredients).map((ingredient)=>
							<div key={ingredient._id}>
								<FormControlLabel
									control={
										<Checkbox
											onChange={updateItemIngredients(ingredient)}
											color="primary"
										/>
									}
									label={ingredient.title}
								/>
							</div>
						)}
					</Typography>
					<UpdateItemOrderButton submitItemChange={submitItemChange}/>
				</Grid>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
}

