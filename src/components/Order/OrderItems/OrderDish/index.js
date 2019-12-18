import React from 'react'
import Typography from '@material-ui/core/Typography/index'
import Grid from '@material-ui/core/Grid/index'
import FormControlLabel from '@material-ui/core/FormControlLabel/index'
import DeleteItemOrderButton from '../../Buttons/DeleteItemOrderButton'
import UpdateItemOrderButton from '../../Buttons/UpdateItemOrderButton'
import {useStyles, ColorCheckbox} from './style'
import ExpansionPanel from '@material-ui/core/ExpansionPanel/index'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/index'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/index'
import Box from '@material-ui/core/Box'

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
		<ExpansionPanel className={classes.panel} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
			<Box border={1} borderColor='#7a6c5b' borderRadius={5}>
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
			</Box>
			<ExpansionPanelDetails>
				<Grid container justify="space-between">
					<Typography component={'span'}>
						{(item.ingredients).map((ingredient)=>
							<div key={ingredient._id}>
								<FormControlLabel
									control={
										<ColorCheckbox
											defaultChecked
											onChange={updateItemIngredients(ingredient)}
											color='default'
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
										<ColorCheckbox
											onChange={updateItemIngredients(ingredient)}
											color='default'
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

