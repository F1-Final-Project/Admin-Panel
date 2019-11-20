import React, { useContext } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Paper from '@material-ui/core/Paper'
import Draggable from 'react-draggable'
import { makeStyles } from '@material-ui/core/styles'
import { Context } from '../../../context/tableContext'

const useStyles = makeStyles(theme => ({

}))

function PaperComponent(props) {
	return (
		<Draggable cancel={'[class*="MuiDialogContent-root"]'}>
			<Paper {...props} />
		</Draggable>
	);
}

export default function AlertDialog(props) {

	const { dispatch, handleDeleteItem, } = useContext(Context)
	const { open, openDeleteModal, openCreateItem } = props.data


	return (
		<div>
			<Dialog
				open={open || openDeleteModal || openCreateItem}
				// onClose={open || openDeleteModal}
				PaperComponent={PaperComponent}
				aria-labelledby="draggable-dialog-title"
			>
				{props.children}
			</Dialog>
		</div>
	);
}


