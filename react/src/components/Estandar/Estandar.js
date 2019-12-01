import React, {Component, Fragment} from 'react';

import UsuarioService from "../../services/Usuario/UsuarioService";
import Header from "../../includes/Header";

import {AddOutlined, DeleteOutlined, EditOutlined, SearchOutlined} from '@material-ui/icons';

import BotonFlotante from "../../includes/BotonFlotante";
import ModalUsuario from "./includes/ModaUsuario";
import {CONFIG} from "../../settings/Config/Config";
import {ReactLocalStorageService} from "../../settings/Libs/Libs";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Button from '@material-ui/core/Button';

class Estandar extends Component {

    state = {};

    constructor(props) {
        super(props);
        this.state = {
            params: props.match.params,

            lista_saldos: [],
            lista_cargos: [],

            mes_inicio: new Date(),
            mes_fin: new Date(),
        };
        this.all();
    }

    RefrechList = () => {
        this.all();
    };

    all = () => {
        UsuarioService.all().then(response => {
            this.setState({
                lista_saldos: response.data,
            });
        }).catch(error => {
            this.setState({
                lista_saldos: []
            });
            alert(error.mensaje);
        });

        let Usr = ReactLocalStorageService.get('Usr') || {};
        let params = {
            id_usuario: Usr.id_usuario
        };
        UsuarioService.show(params).then(response => {
            this.setState({
                saldo_total: response.data.saldo
            });
        }).catch(error => {
            this.setState({
                lista: []
            });
            alert(error.mensaje);
        });
    };

    delete = (item) => {
        UsuarioService.delete(item).then(response => {
            alert(response.mensaje);
            this.RefrechList();
        }).catch(error => {
            alert(error.mensaje);
        });
    };

    render() {

        const {params} = this.props.match;

        return (
            <Fragment>

                <Header {...this.props}/>

                <div style={{padding: '15px'}}>
                    <Grid container direction="row" justify="left" alignItems="center" spacing={2}>

                        <Grid item xs={4} sm={12} md={4} lg={2} xl={2}>
                            <div style={{textAlign: "center"}}>

                                <TextField
                                    label="Saldo Total"
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}
                                    fullWidth
                                    value={this.state.saldo_total}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={4} sm={12} md={4} lg={2} xl={2}>
                            <div style={{textAlign: "right"}}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Fecha de cargo"
                                        value={this.state.mes_inicio}
                                        onChange={(e, value) => {
                                            console.log(value);
                                            this.updateDate(value)
                                        }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                        </Grid>
                        <Grid item xs={4} sm={12} md={4} lg={2} xl={2}>
                            <div style={{textAlign: "right"}}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Fecha de cargo"
                                        value={this.state.mes_fin}
                                        onChange={(e, value) => {
                                            console.log(value);
                                            this.updateDate(value)
                                        }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                        </Grid>

                        <Grid item xs={4} sm={12} md={4} lg={2} xl={2}>
                            <div style={{textAlign: "left"}}>
                                <Button style={{margin: '', width: '100%'}} onClick={() => this.getSaldo()} color="default" variant="contained">
                                    Consultar Saldo
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={4} sm={12} md={4} lg={2} xl={2}>
                            <div style={{textAlign: "left"}}>
                                <Button style={{margin: '', width: '100%'}} onClick={() => this.addPagos()} color="primary" variant="contained">
                                    Realizar Pago
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={4} sm={12} md={4} lg={2} xl={2}>
                            <div style={{textAlign: "left"}}>
                                <Button style={{margin: '', width: '100%'}} onClick={() => this.getPagos()} color="secondary" variant="contained">
                                    Mis Pagos
                                </Button>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                            {
                                this.state.lista_saldos ? (
                                    <table style={{width: '100%'}} border={1}>
                                        <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Monto</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.lista_saldos.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.fecha_saldo}</td>
                                                <td>{item.monto_saldo}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                ) : (<h1>Mujer</h1>)}
                        </Grid>

                    </Grid>
                </div>

            </Fragment>
        );
    }
}

export default Estandar;
