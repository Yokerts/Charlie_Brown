import React, {Component, Fragment} from 'react';
import SexoService from "../../services/Sexo/SexoService";
import UsuarioService from "../../services/Usuario/UsuarioService";
import MesesService from "../../services/Meses/MesesService";
import Header from "../../includes/Header";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {AddOutlined, DeleteOutlined, EditOutlined, SearchOutlined} from '@material-ui/icons';
import BotonFlotante from "../../includes/BotonFlotante";
import ModalSexo from "./includes/ModalAdministrador";
import ModalAdministrador from "./includes/ModalAdministrador";
import ModalCargo from "./includes/ModalCargo";
import ModalSaldo from "./includes/ModalSaldo";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


class Administrador extends Component {


    state = {};

    constructor(props) {
        super(props);
        this.state = {
            params: props.match.params,
            lista: [],
            id_cat_mes: '',
            cat_meses: [],

            hoy: new Date(),
        };
        this.all();
        this.meses();
    }

    RefrechList = () => {
        this.all();
    };

    all = () => {
        UsuarioService.allEstandar().then(response => {
            this.setState({
                lista: response.data
            });
        }).catch(error => {
            this.setState({
                lista: []
            });
            alert(error.mensaje);
        });
    };

    meses = () => {
        MesesService.get().then(response => {
            this.setState({
                cat_meses: response.data
            });
        }).catch(error => {
            this.setState({
                cat_meses: []
            });
            alert(error.mensaje);
        });
    };

    delete = (item) => {
        SexoService.delete(item).then(response => {
            alert(response.mensaje);
            this.RefrechList();
        }).catch(error => {
            alert(error.mensaje);
        });
    };

    check_mes = (item) => {
        var mes = "";
        for (var x = 0; x < this.state.cat_meses.length; x++) {
            if (this.state.cat_meses[x].id == item) {
                mes = this.state.cat_meses[x].mes
            }
        }

        this.setState({
            mes: mes
        })
        return mes;
    }


    updateDate = (date) => {
        this.setState({
            mes: date.toString(),
            hoy: new Date(date)
        })
    }


    render() {

        const {params} = this.props.match;


        return (
            <Fragment>

                <Header {...this.props}/>

                <Grid container direction="row" justify="center" alignItems="center" spacing={2}>

                    <Grid item xs={4} sm={12} md={6} lg={6} xl={6}>
                        <div style={{textAlign: "right"}}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Fecha de cargo"
                                    value={this.state.hoy}
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
                    {/*<Grid item xs={4} sm={12} md={4} lg={4} xl={4}>
                        <div style={{textAlign: "center"}}>
                            <TextField
                                select
                                label="Mes"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                SelectProps={{
                                    native: true,
                                    MenuProps: {},
                                }}
                                value={this.state.id_cat_mes}
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    this.setState({
                                        id_cat_mes: e.target.value
                                    })
                                    this.check_mes(e.target.value);
                                }}
                                disabled={this.props.tipo === 'view'}
                            >
                                <option value={''}>&nbsp;</option>
                                {this.state.cat_meses.map((item, index) => (
                                    <option key={index} value={item.id}>
                                        {item.mes}
                                    </option>
                                ))}
                            </TextField>
                        </div>
                    </Grid>*/}
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <div style={{textAlign: "left"}}>
                            <ModalCargo
                                tipo={'add'}
                                item={{id_cat_mes: this.state.id_cat_mes, mes: this.state.mes} || {}}
                                RefrechList={this.RefrechList}
                                componente={<Button style={{margin: '25px'}} color="primary" variant="contained">Cargar
                                    Mensualidad General </Button>}
                            />
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <table style={{width: '100%'}} border={1}>
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Usuario</th>
                                <th>Nombre</th>
                                <th>Apellido Paterno</th>
                                <th>Apellido Materno</th>
                                <th>Teléfono</th>
                                <th>Email</th>
                                <th>Saldo</th>
                                <th>Cargar</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.lista.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id_usuario}</td>
                                    <td>{item.username}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.apellido_paterno}</td>
                                    <td>{item.apellido_materno}</td>
                                    <td>{item.telefono}</td>
                                    <td>{item.email}</td>
                                    <td>{item.saldo}</td>
                                    <td>
                                        <Grid container direction="row" justify="center" alignItems="center"
                                              spacing={2}>

                                            <Grid item xs={6} sm={12} md={6} lg={6} xl={6}>
                                                <div style={{textAlign: "center"}}>
                                                    <ModalCargo
                                                        tipo={'add'}
                                                        item={{
                                                            id_cat_mes: this.state.id_cat_mes,
                                                            mes: this.state.mes,
                                                            id_usuario: this.state.id_usuario
                                                        } || {}}
                                                        RefrechList={this.RefrechList}
                                                        componente={<Button style={{margin: '5px'}} color="primary"
                                                                            variant="contained">
                                                            Mensualidad
                                                        </Button>}
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={6} sm={12} md={6} lg={6} xl={6}>
                                                <div style={{textAlign: "left"}}>
                                                    <ModalSaldo
                                                        tipo={'add'}
                                                        item={{
                                                            nombre: item.nombre,
                                                            apellido_paterno: item.apellido_paterno,
                                                            apellido_materno: item.apellido_materno,
                                                            id_cat_mes: this.state.id_cat_mes,
                                                            mes: this.state.mes,
                                                            id_usuario: item.id_usuario
                                                        } || {}}
                                                        RefrechList={this.RefrechList}
                                                        componente={<Button style={{margin: '5px'}} color="secondary"
                                                                            variant="contained">
                                                            Saldo </Button>}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                    </Grid>
                </Grid>

            </Fragment>
        );
    }
}

export default Administrador;
