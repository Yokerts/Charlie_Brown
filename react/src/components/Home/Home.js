import React, {Component, Fragment} from 'react';

import Header from "../../includes/Header";
import UsuarioService from "../../services/Usuario/UsuarioService";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {ReactLocalStorageService} from "../../settings/Libs/Libs";

class Home extends Component {

    state = {};

    constructor(props) {
        super(props);
        this.state = {
            params: props.match.params,
        };
        this.RefrechList();
    }

    RefrechList = () => {
        this.all();
    };

    all = () => {
        let Usr = ReactLocalStorageService.get('Usr') || {};
        let params = {
            id_usuario: Usr.id_usuario
        };
        UsuarioService.show(params).then(response => {
            this.setState({
                lista: response.data,
                apellido_materno: response.data.apellido_materno,
                apellido_paterno: response.data.apellido_paterno,
                direccion: response.data.direccion,
                email: response.data.email,
                id_cat_estado: response.data.id_cat_estado,
                id_cat_sexo: response.data.id_cat_sexo,
                id_cat_tipo_permiso: response.data.id_cat_tipo_permiso,
                nombre: response.data.nombre,
                rfc: response.data.rfc,
                saldo: response.data.saldo,
                telefono: response.data.telefono,
                username: response.data.username
            });
        }).catch(error => {
            this.setState({
                lista: []
            });
            alert(error.mensaje);
        });
    };


    render() {

        const {params} = this.props.match;


        return (
            <Fragment>

                <Header {...this.props}/>
                {
                    JSON.stringify(this.state.params, null, 2)
                }

                <div style={{margin: "20px"}}>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>

                        <Grid item xs={6} sm={6} md={6} lg={4} xl={4}>
                            <TextField
                                label="Usuario"
                                type="text"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                value={this.state.username}
                                onBlur={()=>this.props.actions.updateInput}
                                onChange={(e) => {
                                    this.setState({
                                        username: e.target.value
                                    });
                                }}
                            />
                        </Grid>

                        <Grid item xs={6} sm={6} md={6} lg={4} xl={4}>
                            <TextField
                                label="Nombre(s)"
                                type="text"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                value={this.state.nombre}
                                onChange={(e) => {
                                    this.setState({
                                        nombre: e.target.value
                                    });
                                }}
                                disabled={this.props.tipo === 'view'}
                            />
                        </Grid>

                        <Grid item xs={6} sm={6} md={6} lg={4} xl={4}>
                            <TextField
                                label="Apellido paterno"
                                type="text"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                value={this.state.apellido_paterno}
                                onChange={(e) => {
                                    this.setState({
                                        apellido_paterno: e.target.value
                                    });
                                }}
                                disabled={this.props.tipo === 'view'}
                            />
                        </Grid>

                        <Grid item xs={6} sm={6} md={6} lg={4} xl={4}>
                            <TextField
                                label="Apellido materno"
                                type="text"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                value={this.state.apellido_materno}
                                onChange={(e) => {
                                    this.setState({
                                        apellido_materno: e.target.value
                                    });
                                }}
                                disabled={this.props.tipo === 'view'}
                            />
                        </Grid>

                        <Grid item xs={6} sm={6} md={6} lg={4} xl={4}>
                            <TextField
                                label="Teléfono"
                                type="numeric"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                value={this.state.telefono}
                                onChange={(e) => {
                                    this.setState({
                                        telefono: e.target.value
                                    });
                                }}
                                disabled={this.props.tipo === 'view'}
                            />
                        </Grid>

                        <Grid item xs={6} sm={6} md={6} lg={4} xl={4}>
                            <TextField
                                label="Email"
                                type="text"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                value={this.state.email}
                                onChange={(e) => {
                                    this.setState({
                                        email: e.target.value
                                    });
                                }}
                                disabled={this.props.tipo === 'view'}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <TextField
                                label="Dirección"
                                type="text"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                value={this.state.direccion}
                                onChange={(e) => {
                                    this.setState({
                                        direccion: e.target.value
                                    });
                                }}
                                disabled={this.props.tipo === 'view'}
                            />
                        </Grid>

                        <Grid item xs={6} sm={6} md={6} lg={4} xl={4}>
                            <TextField
                                label="Saldo"
                                type="text"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                value={this.state.saldo}
                                onChange={(e) => {
                                    this.setState({
                                        saldo: e.target.value
                                    });
                                }}
                                disabled={this.props.tipo === 'view'}
                            />
                        </Grid>

                        <Grid item xs={6} sm={6} md={6} lg={4} xl={4}>
                            <TextField
                                label="RFC"
                                type="text"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                value={this.state.rfc}
                                onChange={(e) => {
                                    this.setState({
                                        rfc: e.target.value
                                    });
                                }}
                                disabled={this.props.tipo === 'view'}
                            />
                        </Grid>

                        <Grid item xs={6} sm={6} md={6} lg={4} xl={4}>
                            <Button style={{margin: '25px'}} color="primary" variant="contained">
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </div>

            </Fragment>
        );
    }
}

export default Home;
