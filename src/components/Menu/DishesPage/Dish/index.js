import React from 'react'
import useStyles from './style'
import Card from '@material-ui/core/Card/index'
import CardActionArea from '@material-ui/core/CardActionArea/index'
import CardContent from '@material-ui/core/CardContent/index'
import CardMedia from '@material-ui/core/CardMedia/index'
import Typography from '@material-ui/core/Typography/index'
import Grid from '@material-ui/core/Grid/index'
import Box from '@material-ui/core/Box'

export default function Dish(props) {
	const {item, dishes, addDishToOrder}=props;
	const classes = useStyles();

	return (
		<>
			<div>
				<Typography className={classes.typography} key={item._id} gutterBottom variant="h4" component="h4">{item.title}</Typography>
				<Grid container justify="center">
					{(dishes.filter((i) => i.category._id===item._id)).map((dish) =>
						<Box  key={dish._id} className={classes.box} border={1} borderColor='#7a6c5b' borderRadius={4}>
							<Card key={dish._id} className={classes.card}>
								<CardActionArea onClick={(event)=>{addDishToOrder(dish,event)}}>
									<CardMedia
										component="img"
										alt="Dish"
										height="200"
										image={dish.img}
									/>
									<CardContent>
										<Typography className={classes.title} gutterBottom variant="h5" component="h2">
											{dish.title}
										</Typography>
										<Typography className={classes.description} variant="body2" component="p">
											{dish.description}
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</Box>
						)
					}
				</Grid>
			</div>
		</>
	);
}