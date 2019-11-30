import React, {Component, Fragment} from 'react';
import SexoService from "../../services/Sexo/SexoService";
import MesesService from "../../services/Meses/MesesService";
import Header from "../../includes/Header";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {AddOutlined, DeleteOutlined, EditOutlined, SearchOutlined} from '@material-ui/icons';
import BotonFlotante from "../../includes/BotonFlotante";
import ModalSexo from "./includes/ModalAdministrador";

class Administrador extends Component {

    state = {};

    constructor(props) {
        super(props);
        this.state = {
            params: props.match.params,
            lista: [],
            id_cat_mes: '',
            cat_meses: [],
        };
        this.all();
        this.meses();
    }

    RefrechList = () => {
        this.all();
    };

    all = () => {
        SexoService.all().then(response => {
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

    render() {

        const {params} = this.props.match;

        return (
            <Fragment>

                <Header {...this.props}/>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
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
                                    this.setState({
                                        id_cat_mes: e.target.value
                                    })
                                }}
                                disabled={this.props.tipo === 'view'}
                            >
                                <option value={''}>&nbsp;</option>
                                {this.state.cat_meses.map((item, index) => (
                                    <option key={index} value={item.id_cat_meses}>
                                        {item.mes}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <Button variant="contained" color="primary" onClick={() => this.close()}>
                                Cargar Mensualidad
                            </Button>
                        </Grid>
                    </Grid>


                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <table style={{width: '100%'}} border={1}>
                            <thead>
                            <tr>
                                <th>id_cat_sexo</th>
                                <th>sexo</th>
                                <th>activo</th>
                                <th>acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.lista.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id_cat_sexo}</td>
                                    <td>{item.sexo}</td>
                                    <td>{item.activo}</td>
                                    <td>
                                        <DeleteOutlined onClick={() => this.delete(item)}/>

                                        <ModalSexo
                                            tipo={'edit'}
                                            item={item || {}}
                                            RefrechList={this.RefrechList}
                                            componente={<EditOutlined/>}
                                        />

                                        <ModalSexo
                                            tipo={'view'}
                                            item={item || {}}
                                            RefrechList={this.RefrechList}
                                            componente={<SearchOutlined/>}
                                        />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                    </Grid>
                </Grid>

                <ModalSexo
                    tipo={'add'}
                    item={{}}
                    RefrechList={this.RefrechList}
                    componente={<BotonFlotante icono={<AddOutlined/>}/>}
                />

            </Fragment>
        );
    }
}

export default Administrador;
