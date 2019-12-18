import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import Paper from '@material-ui/core/Paper'
import Draggable from 'react-draggable'
import PropTypes from 'prop-types'
import { useStyles } from './ModalCSS'


function PaperComponent(props) {
	const classes = useStyles()
	return (
		<Draggable cancel={'[class*="MuiDialogContent-root"]'}>
			<Paper {...props} style={{backgroundColor: '#212121'}}/>
		</Draggable>
	)
}

export default function AlertDialog(props) {

	const {
		openEditModal,
		openDeleteModal,
		openCreateModal,
		openCreateListModal,
	} = props.data

	return (
		<div>
			<Dialog
				open={openEditModal
				|| openDeleteModal
				|| openCreateModal
				|| openCreateListModal}                                																													//состояния для открытия модального окна
				PaperComponent={PaperComponent}
				aria-labelledby="draggable-dialog-title"
			>
				{
					props.children        																																												//принимает элементы для отображения
				}
			</Dialog>
		</div>
	)
}

AlertDialog.propTypes = {
	openEditModal: PropTypes.bool,
	openDeleteModal: PropTypes.bool,
	openCreateModal: PropTypes.bool,
	openCreateListModal: PropTypes.bool,
}


