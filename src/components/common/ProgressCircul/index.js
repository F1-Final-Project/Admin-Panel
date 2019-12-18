import React from 'react'
import { useStyles, CssCircularProgress, } from './ProgressCirculCSS'


export default () => {
	const classes = useStyles()
	return (
		<div className={classes.layoutProgress}>
			<CssCircularProgress color="secondary"/>
		</div>
	)
}