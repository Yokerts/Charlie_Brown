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
import BoxSelectFile from "../../../includes/BoxSelectFile";
import SexoService from "../../../services/Sexo/SexoService";

class ModalSexo extends Component {
	
	state = {};
	
	constructor() {
		super();
		this.state = {
			open: false,
			
			id_usuario: '',
			id_cat_sexo: '',
			username: '',
			password: '',
			nombre: '',
			apellido_paterno: '',
			apellido_materno: '',
			
			foto_base64: '',
			foto_base64Tipo: '',
			foto_archivo: '',
			foto_formato: '',
			
			cat_sexo: [],
		};
	}
	
	open = () => {
		let item = this.props.item;
		this.setState({
			open: true,
			
			id_usuario: item.id_usuario || '',
			id_cat_sexo: item.id_cat_sexo || '',
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
		SexoService.all().then(response => {
			this.setState({
				cat_sexo: response.data
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
			username: '',
			password: '',
			nombre: '',
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
				username: response.data.username || '',
				password: response.data.password || '',
				nombre: response.data.nombre || '',
				apellido_paterno: response.data.apellido_paterno || '',
				apellido_materno: response.data.apellido_materno || '',
				
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
				>
					
					<DialogTitle>
						Modal usuario
					</DialogTitle>
					
					<DialogContent>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								<BoxSelectFile
									FormatAccepted={["image/png", "image/jpeg"]}
									MegaByte={5}
									// button={(
									// 	<AddOutlined/>
									// )}
									label={(
										<p>Foto</p>
									)}
									style={{
										color: 'black',
										height: '115px'
									}}
									item={{
										base64: this.state.foto_base64,
										base64Tipo: this.state.foto_base64Tipo,
										archivo: this.state.foto_archivo,
										formato: this.state.foto_formato,
									}}
									onChange={(r) => {
										this.setState({
											foto_base64: r.base64,
											foto_base64Tipo: r.base64Tipo,
											foto_archivo: r.archivo,
											foto_formato: r.formato,
										});
									}}
									showSnackBars={() => {
									}}
									disabled={this.state.tipo === 'view'}
								/>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
								<TextField
									label="ID"
									type="text"
									margin="normal"
									variant="outlined"
									fullWidth
									disabled={true}
									value={this.state.id_usuario}
								/>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
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
							<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
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
							<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
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
							<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
								<TextField
									label="Naombre"
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
							<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
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
							<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
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
						</Grid>
					</DialogContent>
					
					<DialogActions>
						<Button onClick={() => this.close()} color="primary">
							Cerrar
						</Button>
						<Button onClick={() => this.save()} color="primary" autoFocus>
							Crear
						</Button>
					</DialogActions>
				
				</Dialog>
			</div>
		);
	};
}


ModalSexo.propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.number.isRequired,
		PropTypes.oneOf([null]).isRequired,
	]),
	tipo: PropTypes.string.isRequired,
	item: PropTypes.object.isRequired,
	RefrechList: PropTypes.func.isRequired,
	componente: PropTypes.element.isRequired
};

export default ModalSexo;
