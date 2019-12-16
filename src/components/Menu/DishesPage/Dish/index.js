import React from 'react'
import useStyles from './style'
import Card from '@material-ui/core/Card/index'
import CardActionArea from '@material-ui/core/CardActionArea/index'
import CardContent from '@material-ui/core/CardContent/index'
import CardMedia from '@material-ui/core/CardMedia/index'
import Typography from '@material-ui/core/Typography/index'
import Grid from '@material-ui/core/Grid/index'

export default function Dish(props) {
	const {item, dishes, addDishToOrder}=props;
	const classes = useStyles();

	return (
		<>
			<div>
				<Typography className={classes.typography} key={item._id} gutterBottom variant="h3" component="h2">{item.title}</Typography>
				<Grid container justify="center">
					{(dishes.filter((i) => i.category._id===item._id)).map((dish) =>
							<Card key={dish._id} className={classes.card}>
								<CardActionArea onClick={(event)=>{addDishToOrder(dish,event)}}>
									<CardMedia
										component="img"
										alt="Dish"
										height="200"
										image={dish.img}
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="h2">
											{dish.title}
										</Typography>
										<Typography variant="body2" color="textSecondary" component="p">
											{dish.description}
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						)
					}
				</Grid>
			</div>
		</>
	);
}