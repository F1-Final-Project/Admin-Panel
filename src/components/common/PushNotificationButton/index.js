import React from 'react'
import Button from '@material-ui/core/Button'
import { initializePush, sendTokenToServerDelete } from '../../../push/initialize'

export default () => {

	return (
		<React.Fragment>
			<Button color="primary" onClick={() => initializePush()}>
				Подписатся на Push notification
			</Button>
			<Button color="primary" onClick={() => sendTokenToServerDelete()}>
				Отписатся на Push notification
			</Button>
		</React.Fragment>
	)
}