import React from 'react'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { useStyles } from '../HeaderCss'
import Zoom from '@material-ui/core/Zoom'



export default function ScrollTop(props) {
	const { children, window } = props
	const classes = useStyles()

	const trigger = useScrollTrigger({ target: window ? window() : undefined })

	const handleClick = event => {

		const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor')
		if (anchor) {
			anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
		}
	}

	return (
		<Zoom in={trigger}>
			<div onClick={handleClick} role="presentation" className={classes.root}>
				{children}
			</div>
		</Zoom>
	)
}