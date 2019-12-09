import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteItemOrderButton from './Buttons/DeleteItemOrderButton'
import UpdateItemOrderButton from './Buttons/UpdateItemOrderButton'

const ExpansionPanel = withStyles({
	root: {
		border: '1px solid rgba(0, 0, 0, .125)',
		boxShadow: 'none',
		'&:not(:last-child)': {
			borderBottom: 0,
		},
		'&:before': {
			display: 'none',
		},
		'&$expanded': {
			margin: 'auto',
		},
	},
	expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
	root: {
		backgroundColor: 'rgba(0, 0, 0, .03)',
		borderBottom: '1px solid rgba(0, 0, 0, .125)',
		marginBottom: -1,
		minHeight: 56,
		'&$expanded': {
			minHeight: 56,
		},
	},
	content: {
		'&$expanded': {
			margin: '12px 0',
		},
	},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiExpansionPanelDetails);

export default function OrderDish(props) {
	const [expanded, setExpanded] = React.useState(false);
	const {item, index, order, updateOrderItemChange}=props;

	const handleChange = panel => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

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
	}
	const submitItemChange=()=>{
		const newItem = {
			title: item.title,
			description: item.description,
			ingredients: item.ingredients,
			additionalIngredients: item.additionalIngredients,
			price: item.price, 																				//there should be a price recount
			weight: item.weight,
		}
		updateOrderItemChange(newItem)
	}
	return (
		<>{item?(
			<ExpansionPanel square expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
				<ExpansionPanelSummary aria-controls={`panel${index}d-content`} id="panel1d-header">
					<Grid
						container
						justify="space-between"
					>
						<Typography component={'span'}>{item.title}</Typography>
						<DeleteItemOrderButton order={order} item={item}/>
					</Grid>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Typography component={'span'} >
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
					<div>
						<UpdateItemOrderButton handleClick={submitItemChange}/>
					</div>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		): null
		}</>
	);
}