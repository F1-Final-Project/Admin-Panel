import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import TextField from '@material-ui/core/TextField'



export default function MediaCard(props) {

	const { itemList, classes, secondary } = props
	const [valueInput, setValueInput] = useState(itemList)

	return (
			<ListItem>
				<ListItemText
					primary={itemList.title}
					secondary={secondary ?
						<TextField
							id="standard-number"
							label="Number"
							type="number"
							className={classes.textField}
							InputLabelProps={{
								shrink: true,
							}}
							margin="normal"
							value={itemList.price}
							secondary={secondary ? 'Secondary text' : null}
						/>
						: null}
				/>
				<ListItemSecondaryAction>
					<IconButton edge="end" aria-label="delete">
						<DeleteIcon/>
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
	)
}