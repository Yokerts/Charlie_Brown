import React, {Component, Fragment} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {HomeOutlined, ListAltOutlined, MenuOutlined, PersonOutlined} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import $State, {ReactLocalStorageService} from '../settings/Libs/Libs';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

class Header extends Component {
	
	state = {};
	
	constructor(props) {
		super(props);
		this.state = {
			menu: false
		};
	}
	
	openMenu = () => {
		this.setState({
			menu: true
		})
	};
	
	closeMenu = () => {
		this.setState({
			menu: false
		})
	};
	
	Login = () => {
		$State.go(this.props, 'login', {});
	};
	
	Home = () => {
		$State.go(this.props, 'home', {});
	};
	
	Sexo = () => {
		$State.go(this.props, 'sexo', {});
	};
	
	Usuario = () => {
		$State.go(this.props, 'usuario', {});
	};
	
	render() {
		
		let Usr = ReactLocalStorageService.get('Usr') || {};
		
		return (
			<Fragment>
				<AppBar position="static">
					<Toolbar>
						<IconButton edge="start" color="inherit" aria-label="menu" onClick={this.openMenu}>
							<MenuOutlined/>
						</IconButton>
						<Typography variant="h6" style={{flexGrow: 1}}>
							News
						</Typography>
						<Button color="inherit" onClick={this.Login}>Login</Button>
					</Toolbar>
				</AppBar>
				<Drawer open={this.state.menu} onClose={this.closeMenu}>
					
					<div style={{
						height: '150px',
						width: '300px',
						textAlign: 'center',
						padding: '20px',
						background: '#3f51b5',
						color: 'white'
					}}>
						{Usr.username}
					</div>
					
					<List>
						<ListItem button onClick={this.Home}>
							<ListItemIcon>
								<HomeOutlined/>
							</ListItemIcon>
							<ListItemText primary={'Principal'}/>
						</ListItem>
						<ListItem button onClick={this.Sexo}>
							<ListItemIcon>
								<ListAltOutlined/>
							</ListItemIcon>
							<ListItemText primary={'Sexo'}/>
						</ListItem>
						<ListItem button onClick={this.Usuario}>
							<ListItemIcon>
								<PersonOutlined/>
							</ListItemIcon>
							<ListItemText primary={'Usuario'}/>
						</ListItem>
					</List>
				
				</Drawer>
			</Fragment>
		);
	}
}

export default Header;
