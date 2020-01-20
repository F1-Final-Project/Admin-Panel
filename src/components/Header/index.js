import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import CssBaseline from '@material-ui/core/CssBaseline'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Slide from '@material-ui/core/Slide'
import { useStyles, CssAppBar, CssFab, TableIconButton, CssMenuAdmin } from './HeaderCss'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import ScrollTop from './ScrollTop'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'

import AccountCircle from '@material-ui/icons/AccountCircle'
import ListAltIcon from '@material-ui/icons/ListAlt'

import MenuItem from '@material-ui/core/MenuItem'
import { Link } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
import AuthService from '../../services/AuthService'

function HideOnScroll(props) {
	const { children, window } = props
	const trigger = useScrollTrigger({ target: window ? window() : undefined })

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	)
}

export default function HideAppBar(props) {
	const classes = useStyles()

	const { headerRef } = props

	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)


	const handleMenu = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const location = window.location.pathname

	return (
		<React.Fragment>
			<div id="back-to-top-anchor"/>
			<CssBaseline/>
			<HideOnScroll {...props}>
				<CssAppBar id="back-to-top-anchor" ref={headerRef}>
					<Toolbar className={classes.headerToolBar}>
						<div>
							<Link className={classes.headerLink} to={'/menu'}>
								<Tooltip title="Go to menu" aria-label="go to menu">
									<TableIconButton
										aria-label="account of current user"
										aria-controls="menu-appbar"
										aria-haspopup="true"
										onClick={handleMenu}
										color="inherit"
									>
										<ListAltIcon/>
									</TableIconButton>
								</Tooltip>
							</Link>
							<CssMenuAdmin
								id="menu-appbar-admin-panel"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={open}
								onClose={handleClose}
							><Link className={classes.headerLink} to={'/login'}><MenuItem
								onClick={() => {
									new AuthService().logOut()
									handleClose()
								}}>Logout</MenuItem></Link>
								<Link className={classes.headerLink} to={'/createUser'}><MenuItem onClick={handleClose}>Creat
									User</MenuItem></Link>
							</CssMenuAdmin>
						</div>
						{location === '/kitchen' ? (
								<Link className={classes.headerLink} to={'/admin-panel'}>
									<Tooltip title="Go to admin-page" aria-label="go to admin-page">
										<TableIconButton
											aria-label="account of current user"
											aria-controls="menu-appbar"
											aria-haspopup="true"
											onClick={handleMenu}
											color="inherit"
										>
											<BusinessCenterIcon/>
										</TableIconButton>
									</Tooltip>
								</Link>) :
							(<Link className={classes.headerLink} to={'/kitchen'}>
								<Tooltip title="Go to cook" aria-label="go to cook">
									<TableIconButton
										aria-label="account of current user"
										aria-controls="menu-appbar"
										aria-haspopup="true"
										onClick={handleMenu}
										color="inherit"
									>
										<RestaurantMenuIcon/>
									</TableIconButton>
								</Tooltip>
							</Link>)}
						<TableIconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AccountCircle/>
						</TableIconButton>

					</Toolbar>
				</CssAppBar>
			</HideOnScroll>
			<Toolbar/>
			<ScrollTop {...props}>
				<CssFab color="secondary" size="small" aria-label="scroll back to top">
					<KeyboardArrowUpIcon/>
				</CssFab>
			</ScrollTop>
		</React.Fragment>
	)
}

