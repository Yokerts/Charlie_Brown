import React, {Component, Fragment} from 'react';

import UsuarioService from "../../services/Usuario/UsuarioService";
import Header from "../../includes/Header";

import {AddOutlined, DeleteOutlined, EditOutlined, SearchOutlined} from '@material-ui/icons';

import BotonFlotante from "../../includes/BotonFlotante";
import ModalUsuario from "./includes/ModaUsuario";
import {CONFIG} from "../../settings/Config/Config";

class Usuario extends Component {
	
	state = {};
	
	constructor(props) {
		super(props);
		this.state = {
			params: props.match.params,
			
			lista: [],
		};
		this.all();
	}
	
	RefrechList = () => {
		this.all();
	};
	
	all = () => {
		UsuarioService.all().then(response => {
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
				
				<table style={{width: '100%'}} border={1}>
					<thead>
					<tr>
						<th>id_usuario</th>
						<th>foto</th>
						<th>id_cat_sexo</th>
						<th>username</th>
						<th>password</th>
						<th>nombre</th>
						<th>apellido_paterno</th>
						<th>apellido_materno</th>
						<th>acciones</th>
					</tr>
					</thead>
					<tbody>
					{this.state.lista.map((item, index) => (
						<tr key={index}>
							<td>{item.id_usuario}</td>
							<td>
								<img src={CONFIG.src + item.foto} alt={item.id_usuario}
								     style={{width: '50px', height: '50px'}}/>
							</td>
							<td>{item.id_cat_sexo}</td>
							<td>{item.username}</td>
							<td>{item.password}</td>
							<td>{item.nombre}</td>
							<td>{item.apellido_paterno}</td>
							<td>{item.apellido_materno}</td>
							<td>
								<DeleteOutlined onClick={() => this.delete(item)}/>
								
								<ModalUsuario
									tipo={'edit'}
									item={item || {}}
									RefrechList={this.RefrechList}
									componente={<EditOutlined/>}
								/>
								
								<ModalUsuario
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
				
				<ModalUsuario
					tipo={'add'}
					item={{}}
					RefrechList={this.RefrechList}
					componente={<BotonFlotante icono={<AddOutlined/>}/>}
				/>
			
			</Fragment>
		);
	}
}

export default Usuario;
