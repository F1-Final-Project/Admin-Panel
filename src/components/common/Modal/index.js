import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import Paper from '@material-ui/core/Paper'
import Draggable from 'react-draggable'


function PaperComponent(props) {
	return (
		<Draggable cancel={'[class*="MuiDialogContent-root"]'}>
			<Paper {...props} />
		</Draggable>
	);
}

export default function AlertDialog(props) {

	const { openEditModal, openDeleteModal, openCreateModal } = props.data

	return (
		<div>
			<Dialog
				open={openEditModal || openDeleteModal || openCreateModal}
				PaperComponent={PaperComponent}
				aria-labelledby="draggable-dialog-title"
			>
				{props.children}
			</Dialog>
		</div>
	);
}


