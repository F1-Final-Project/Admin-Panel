import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './../style'

export default function Dish({dish, recipeDish}) {
    const dispatch = useDispatch();

    const classes = useStyles();
    let counterIngredient=0, counterAddIngredient=0;

    const onRecipeIngredients=(ingredient, index)=> {
        if(recipeDish) {
            if (!recipeDish.ingredients.find((item) => item.title === ingredient.title)) {
                counterIngredient= counterIngredient+1;
                if(counterIngredient===1){
                    return (
                        <div key={ingredient._id}>
                            <Typography className={classes.content} variant="body2" component="p">add</Typography>
                            <li key={ingredient._id+index.toString()} className={classes.content}>{ ingredient.title}</li>
                        </div>)
                } else {
                    return (
                        <li key={ingredient._id+index.toString()} className={classes.content}>{ ingredient.title}</li>
                    )}
            }
        }
    };

    const onRecipeAddIngredients=(ingredient, index)=> {
        if(recipeDish) {
            if(!recipeDish.additionalIngredients.find((item)=>item.title===ingredient.title)) {
                counterAddIngredient= counterAddIngredient+1;
                if(counterAddIngredient===1){
                    return (
                        <div key={ingredient._id}>
                        <Typography className={classes.content} variant="body2" component="p">remove</Typography>
                        <li key={ingredient._id+index.toString()} className={classes.content}>{ ingredient.title}</li>
                        </div>)
                } else {
                    return (
                        <li key={ingredient._id+index.toString()} className={classes.content}>{ ingredient.title}</li>
                    )}
            }
        }
    };

     return(
         <>
             <Typography className={classes.title} gutterBottom variant="h5" component="h3">{dish.title}</Typography>
             <Typography className={classes.content} variant="body2" component="p">weight: {dish.weight} gr</Typography>
             {dish.ingredients.map((ingredient, index)=>onRecipeIngredients(ingredient, index))}
             {dish.additionalIngredients.map((ingredient, index)=>onRecipeAddIngredients(ingredient, index))}
         </>
     )
}