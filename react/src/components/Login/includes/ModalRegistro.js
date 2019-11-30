import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import UsuarioService from "../../../services/Usuario/UsuarioService";
import SexoService from "../../../services/Sexo/SexoService";
import EstadosService from "../../../services/Estados/EstadosService";
import TipoPermisoService from "../../../services/TipoPermiso/TipoPermisoService";
import useMediaQuery from '@material-ui/core/useMediaQuery';

class ModalRegistro extends Component {

    state = {};

    constructor() {
        super();
        this.state = {
            open: false,

            id_usuario: '',
            id_cat_sexo: '',
            id_cat_estado: '',
            id_cat_tipo_permiso: '',
            username: '',
            password: '',
            nombre: '',
            apellido_paterno: '',
            apellido_materno: '',
            saldo: '',
            email: '',
            telefono: '',
            direccion: '',
            foto_base64: '',
            foto_base64Tipo: '',
            foto_archivo: '',
            foto_formato: '',

            cat_sexo: [],
            cat_estado: [],
            cat_tipo_permiso: [],

        };
    }

    open = () => {
        let item = this.props.item;
        this.setState({
            open: true,

            id_usuario: item.id_usuario || '',
            id_cat_sexo: item.id_cat_sexo || '',
            id_cat_estado: item.id_cat_estado || '',
            id_cat_tipo_permiso: item.id_cat_tipo_permiso || '',
            saldo: item.saldo || '',
            email: item.email || '',
            telefono: item.telefono || '',
            direccion: item.direccion || '',
            username: item.username || '',
            password: item.password || '',
            nombre: item.nombre || '',
            apellido_paterno: item.apellido_paterno || '',
            apellido_materno: item.apellido_materno || '',

            foto_base64: '',
            foto_base64Tipo: '',
            foto_archivo: '',
            foto_formato: '',
        });
        if (item.id_cat_sexo > 0) {
            this.show(item);
        }
        SexoService.get().then(response => {
            this.setState({
                cat_sexo: response.data
            })
        }).catch(error => {
            alert(error.mensaje);
        })
        EstadosService.get().then(response => {
            this.setState({
                cat_estado: response.data
            })
        }).catch(error => {
            alert(error.mensaje);
        })
        TipoPermisoService.get().then(response => {
            this.setState({
                cat_tipo_permiso: response.data
            })
        }).catch(error => {
            alert(error.mensaje);
        })
    };

    close = () => {
        this.setState({
            open: false,

            id_usuario: '',
            id_cat_sexo: '',
            id_cat_estado: '',
            username: '',
            password: '',
            nombre: '',
            saldo: '',
            tipo_permiso: '',
            email: '',
            telefono: '',
            direccion: '',
            apellido_paterno: '',
            apellido_materno: '',

            foto_base64: '',
            foto_base64Tipo: '',
            foto_archivo: '',
            foto_formato: '',
        });
    };


    show = (item) => {
        UsuarioService.show(item).then(response => {
            this.setState({
                id_usuario: response.data.id_usuario || '',
                id_cat_sexo: response.data.id_cat_sexo || '',
                id_cat_estado: response.data.id_cat_estado || '',
                id_cat_tipo_permiso: response.data.id_cat_tipo_permiso || '',
                username: response.data.username || '',
                password: response.data.password || '',
                nombre: response.data.nombre || '',
                apellido_paterno: response.data.apellido_paterno || '',
                apellido_materno: response.data.apellido_materno || '',
                saldo: response.data.saldo || '',
                email: response.data.email || '',
                telefono: response.telefono,
                direccion: response.direccion,
                foto_base64: '',
                foto_base64Tipo: '',
                foto_archivo: response.data.foto_archivo || '',
                foto_formato: response.data.foto_formato || '',
            });
        }).catch(error => {
            alert(error.mensaje);
        });
    };

    save = () => {
        if (this.state.id_usuario > 0) {
            this.update();
        } else {
            this.create();
        }
    };

    create = () => {
        UsuarioService.create(this.state).then(response => {
            alert(response.mensaje);
            this.props.RefrechList();
            this.close();
        }).catch(error => {
            alert(error.mensaje);
        });
    };

    update = () => {
        UsuarioService.update(this.state).then(response => {
            alert(response.mensaje);
            this.props.RefrechList();
            this.close();
        }).catch(error => {
            alert(error.mensaje);
        });
    };




    render() {
        return (
            <div>

				<span onClick={this.open}>
					{this.props.componente}
				</span>

            <Dialog
                    open={this.state.open}
                    onClose={() => this.close()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="md"
            >

                    <DialogTitle>
                        Registro
                    </DialogTitle>

                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={6} md={6} lg={4} xl={4}>
                                <TextField
                                    select
                                    label="Rol"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    SelectProps={{
                                        native: true,
                                        MenuProps: {},
                                    }}
                                    value={this.state.id_cat_tipo_permiso}
                                    onChange={(e) => {
                                        this.setState({
                                            id_cat_tipo_permiso: e.target.value
                                        })
                                    }}
                                    disabled={this.props.tipo === 'view'}
                                >
                                    <option value={''}>&nbsp;</option>
                                    {this.state.cat_tipo_permiso.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.tipo_permiso}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={6} sm={6} md={6} lg={4} xl={4}>
                                <TextField
                                    label="Usuario"
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    value={this.state.username}
                                    onChange={(e) => {
                                        this.setState({
                                            username: e.target.value
                                        });
                                    }}
                                    disabled={this.props.tipo === 'view'}
                                />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6} lg={4} xl={4}>
                                <TextField
                                    label="Contraseña"
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    value={this.state.password}
                                    onChange={(e) => {
                                        this.setState({
                                            password: e.target.value
                                        });
                                    }}
                                    disabled={this.props.tipo === 'view'}
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
                                    select
                                    label="Sexo"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    SelectProps={{
                                        native: true,
                                        MenuProps: {},
                                    }}
                                    value={this.state.id_cat_sexo}
                                    onChange={(e) => {
                                        this.setState({
                                            id_cat_sexo: e.target.value
                                        })
                                    }}
                                    disabled={this.props.tipo === 'view'}
                                >
                                    <option value={''}>&nbsp;</option>
                                    {this.state.cat_sexo.map((item, index) => (
                                        <option key={index} value={item.id_cat_sexo}>
                                            {item.sexo}
                                        </option>
                                    ))}
                                </TextField>
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
                                    select
                                    label="Estado"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    SelectProps={{
                                        native: true,
                                        MenuProps: {},
                                    }}
                                    value={this.state.id_cat_estado}
                                    onChange={(e) => {
                                        this.setState({
                                            id_cat_estado: e.target.value
                                        })
                                    }}
                                    disabled={this.props.tipo === 'view'}
                                >
                                    <option value={''}>&nbsp;</option>
                                    {this.state.cat_estado.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.estado}
                                        </option>
                                    ))}
                                </TextField>
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

                        </Grid>
                    </DialogContent>

                    <DialogActions>
                        <Button variant="contained" onClick={() => this.close()}>
                            Cerrar
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => this.save()} autoFocus>
                            Crear
                        </Button>
                    </DialogActions>

                </Dialog>
            </div>
        );
    };
}

ModalRegistro.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.oneOf([null]).isRequired,
    ]),
    tipo: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    componente: PropTypes.element.isRequired
};

export default ModalRegistro;
