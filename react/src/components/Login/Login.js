import React, {Component, Fragment} from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import $State, {FieldsJs} from '../../settings/Libs/Libs';
import LoginService from "../../services/Login/LoginService";

import fondo_ini from '../../assets/fondo_ini.jpg';
import {ReactComponent as Usericon} from '../../assets/user-icon.svg';
import ModalRegistro from "./includes/ModalRegistro";

import {AddOutlined} from "@material-ui/icons";
import {rgbToHex} from "@material-ui/core/styles";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({

    cssOutlinedInput: {
        "&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline": {
            borderColor: "#FF986E" //hovered
        },
        "&$cssFocused $notchedOutline": {
            borderColor: "#FF986E" //focused
        }
    },
    notchedOutline: {},
    cssFocused: {},
    error: {},
    disabled: {}

});

class Login extends Component {

    state = {};


    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
        };
    }

    login = () => {
        LoginService.Login(this.state).then(response => {
            $State.go(this.props, 'home', {nombre: response.data.username})
        }).catch(error => {
            console.log(error);
            alert(error.mensaje)
        });
    };

    registro = () => {
        $State.go(this.props, 'registro')
    };


    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{height: '100vh', backgroundSize: 'cover', backgroundImage: `url(${fondo_ini})`}}
                >
                    <Grid item xs={8} sm={6} md={6} lg={6} xl={6}>
                        <Card style={{
                            padding: '20px',
                            background: `rgba(${255}, ${255}, ${255}, ${.8})`,
                            borderRadius: '20px'
                        }}>
                            <CardContent>

                                <Grid container>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Typography color="textSecondary" style={{
                                            marginBottom: '20px',
                                            textAlign: 'center',
                                            fontSize: '3rem',
                                            fontFamily: 'Fredericka the Great'
                                        }}>
                                            Charlie Brown
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                        <TextField
                                            label="Usuario"
                                            placeholder="Usuario"
                                            type="text"
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                classes: {
                                                    root: classes.cssOutlinedInput,
                                                    focused: classes.cssFocused,
                                                    notchedOutline: classes.notchedOutline,
                                                }
                                            }}
                                            onChange={(e) => {
                                                this.setState({
                                                    username: e.target.value
                                                });
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                        <div style={{textAlign: 'center'}}>
                                            <Usericon/>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                        <TextField
                                            label="Contraseña"
                                            placeholder="Contraseña"
                                            type="password"
                                            autoComplete="current-password"
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                classes: {
                                                    root: classes.cssOutlinedInput,
                                                    focused: classes.cssFocused,
                                                    notchedOutline: classes.notchedOutline,
                                                }
                                            }}
                                            onChange={(e) => {
                                                this.setState({
                                                    password: e.target.value
                                                });
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                            </CardContent>
                            <CardActions>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    spacing={4}
                                >
                                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                        <ModalRegistro
                                            tipo={'add'}
                                            item={{}}
                                            RefrechList={this.RefrechList}
                                            componente={<Button fullWidth variant="contained">Registro</Button>}
                                        />

                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                        <Button variant="contained" fullWidth color="primary"
                                                onClick={() => this.login()}>Iniciar Sesión</Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>

            </Fragment>
        );
    }
}


export default withStyles(styles)(Login);