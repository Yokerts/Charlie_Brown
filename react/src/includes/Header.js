import React, {Component, Fragment} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {HomeOutlined, ListAltOutlined, MenuOutlined, PersonOutlined} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import $State, {ReactLocalStorageService} from '../settings/Libs/Libs';
import Drawer from "@material-ui/core/Drawer";
import Hidden from '@material-ui/core/Hidden';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PropTypes from 'prop-types';


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

    Administrador = () => {
        $State.go(this.props, 'administrador', {});
    };

    Estandar = () => {
        $State.go(this.props, 'estandar', {});
    };

    render() {

        let Usr = ReactLocalStorageService.get('Usr') || {};

        return (
            <Fragment>
                <AppBar style={{background: '#424242'}} position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.openMenu}>
                            <MenuOutlined/>
                        </IconButton>
                        <Typography variant="h6" style={{flexGrow: 1}}>
                            Charlie Brown
                        </Typography>
                        <Button color="inherit" onClick={this.Login}>Login</Button>
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.menu} onClose={this.closeMenu}>

                    <div style={{
                        height: '100px',
                        width: '300px',
                        textAlign: 'center',
                        padding: '20px',
                        background: '#424242',
                        color: 'white'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            fontSize: '20px',
                            textTransform: 'capitalize'
                        }}>
                            {Usr.username}
                        </div>
                    </div>

                    <List>
                        <ListItem button onClick={this.Home}>
                            <ListItemIcon>
                                <PersonOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Usuario'}/>
                        </ListItem>

                        {Usr.id_cat_tipo_permiso == 1 ? <ListItem button onClick={this.Administrador}>
                                <ListItemIcon>
                                    <ListAltOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Rol Administrador'}/>
                            </ListItem> :
                            <ListItem button onClick={this.Estandar}>
                                <ListItemIcon>
                                    <ListAltOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Rol Estandar'}/>
                            </ListItem>
                        }
                    </List>
                </Drawer>
            </Fragment>
        );
    }
}

export default Header;
