import React, {Component, Fragment} from 'react';

import UsuarioService from "../../services/Usuario/UsuarioService";
import PagoService from "../../services/Pagos/PagosService";
import CargoService from "../../services/Cargo/CargoService";
import SaldoService from "../../services/Saldo/SaldoService";
import Header from "../../includes/Header";
import {ReactLocalStorageService} from "../../settings/Libs/Libs";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Button from '@material-ui/core/Button';
import moment from 'moment';


class Estandar extends Component {

    state = {};

    constructor(props) {
        super(props);
        let Usr = ReactLocalStorageService.get('Usr') || {};

        this.state = {
            params: props.match.params,

            lista_saldos: [],
            lista_cargos: [],
            lista_pagos: [],
            id_usuario: Usr.id_usuario,
            fecha_inicio: new Date(),
            fecha_fin: new Date(),
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

        let params = {
            id_usuario: this.state.id_usuario
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
        this.listSaldos();
    };

    listSaldos = (item) => {
        let params = {
            id_usuario: this.state.id_usuario
        };
        if (item){
            params = {
                id_usuario: this.state.id_usuario,
                fecha_inicio: this.state.fecha_inicio,
                fecha_fin: this.state.fecha_fin
            };
        }
        SaldoService.all(params).then(response => {
            this.setState({
                lista_pagos: [],
                lista_saldos: response.data,
                lista_cargos: []
            });
        }).catch(error => {
            this.setState({
                lista_pagos: []
            });
            alert(error.mensaje);
        });
    }

    listCargos = () => {
        let params = {
            id_usuario: this.state.id_usuario
        };
        CargoService.get(params).then(response => {
            this.setState({
                lista_pagos: [],
                lista_saldos: [],
                lista_cargos: response.data
            });
        }).catch(error => {
            this.setState({
                lista_pagos: []
            });
            alert(error.mensaje);
        });
    }

    listPagos = (item) => {
        let params = {
            id_usuario: this.state.id_usuario
        };
        if (item){
            params = {
                id_usuario: this.state.id_usuario,
                fecha_inicio: this.state.fecha_inicio,
                fecha_fin: this.state.fecha_fin
            };
        }
        PagoService.all(params).then(response => {
            this.setState({
                lista_cargos: [],
                lista_saldos: [],
                lista_pagos: response.data
            });
        }).catch(error => {
            this.setState({
                lista_pagos: []
            });
            alert(error.mensaje);
        });
    }

    pagos = () => {
        let params = {
            id_usuario: this.state.id_usuario
        };
        PagoService.add(params).then(response => {
            this.setState({
                lista_pagos: response.data
            });
        }).catch(error => {
            this.setState({
                lista_saldos: []
            });
            alert(error.mensaje);
        });
    }

    delete = (item) => {
        UsuarioService.delete(item).then(response => {
            alert(response.mensaje);
            this.RefrechList();
        }).catch(error => {
            alert(error.mensaje);
        });
    };

    updateDate = (date) => {
        this.setState({
            fecha_inicio: date.toString()
        })
    }

    updateDate2 = (date) => {
        this.setState({
            fecha_fin: date.toString()
        })
    }

    render() {

        const {params} = this.props.match;

        return (
            <Fragment>

                <Header {...this.props}/>

                <div style={{padding: '15px'}}>
                    <Grid container direction="row"  alignItems="center" spacing={2}>

                        <Grid item xs={4} sm={12} md={4} lg={2} xl={2}>
                            <div style={{textAlign: "center"}}>

                                <TextField
                                    label="Saldo Total"
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    disabled
                                    fullWidth
                                    defaultValue="0.0"
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
                                        value={this.state.fecha_inicio}
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
                                        value={this.state.fecha_fin}
                                        onChange={(e, value) => {
                                            console.log(value);
                                            this.updateDate2(value)
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
                                <Button style={{margin: '', width: '100%'}} onClick={() => this.listSaldos(true)}
                                        color="default" variant="contained">
                                    Consultar Saldo
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={4} sm={12} md={4} lg={2} xl={2}>
                            <div style={{textAlign: "left"}}>
                                <Button style={{margin: '', width: '100%'}} onClick={() => this.addPagos()}
                                        color="primary" variant="contained">
                                    Realizar Pago
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={4} sm={12} md={4} lg={2} xl={2}>
                            <div style={{textAlign: "left"}}>
                                <Button style={{margin: '', width: '100%'}} onClick={() => this.listPagos()}
                                        color="secondary" variant="contained">
                                    Mis Pagos
                                </Button>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            {
                                this.state.lista_saldos.length > 0 ? (
                                    <label>Saldos {moment(this.state.fecha_inicio).format('DD/MM/YYYY') == moment(this.state.fecha_fin).format('DD/MM/YYYY') ?
                                        moment(this.state.fecha_inicio).format('DD/MM/YYYY')  :  moment(this.state.fecha_fin).format('DD/MM/YYYY') +' - '+ moment(this.state.fecha_fin).format('DD/MM/YYYY')}
                                    </label>
                                ) : this.state.lista_cargos.length > 0 ? (
                                    <label>Cargos</label>
                                ) : (
                                    <label>Pagos</label>
                                )
                            }

                            {
                                this.state.lista_saldos.length > 0 ? (
                                    <table style={{marginTop: '10px', width: '100%'}} border={1}>
                                        <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Monto</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.lista_saldos.length > 0 ? this.state.lista_saldos.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.fecha_saldo}</td>
                                                <td>{item.monto_saldo}</td>
                                            </tr>
                                        )) : <tr>
                                            <td>Sin registro</td>
                                            <td>Sin registro</td>
                                        </tr>
                                        }
                                        </tbody>
                                    </table>
                                ) : this.state.lista_cargos.length > 0 ? (
                                    <table style={{marginTop: '10px', width: '100%'}} border={1}>
                                        <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Monto</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.lista_cargos.length > 0 ? this.state.lista_cargos.map((item, index) => (
                                            <tr key={index}>
                                                <td>{moment(item.fecha_cargo).format("DD MMMM YYYY")}</td>
                                                <td>{item.monto_saldo}</td>
                                            </tr>
                                        )) : <tr>
                                            <td>Sin registro</td>
                                            <td>Sin registro</td>
                                        </tr>
                                        }
                                        </tbody>
                                    </table>
                                ) : (
                                    <table style={{marginTop: '10px', width: '100%'}} border={1}>
                                        <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Monto</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.lista_pagos.length > 0 ? this.state.lista_pagos.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.fecha_saldo}</td>
                                                <td>{item.monto_saldo}</td>
                                            </tr>
                                        )) : <tr>
                                            <td>Sin registro</td>
                                            <td>Sin registro</td>
                                        </tr>
                                        }
                                        </tbody>
                                    </table>
                                )
                            }
                        </Grid>

                    </Grid>
                </div>

            </Fragment>
        );
    }
}

export default Estandar;
