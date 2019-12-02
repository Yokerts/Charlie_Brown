import {HttpRequest} from '../../settings/Libs/Libs';

class UsuarioService {
	
	static all = () => {
		let params = {};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_usuario_datos', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	static allEstandar = () => {
		let params = {
			id_cat_tipo_permiso: 2
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_usuario_permiso_datos', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	static show = (item) => {
		let params = {
			id_usuario: item.id_usuario
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_usuario_xid', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	
	static create = (form) => {
		let params = {
			id_usuario: null,
			id_cat_sexo: form.id_cat_sexo,
			id_cat_estado: form.id_cat_estado,
			id_cat_tipo_permiso: form.id_cat_tipo_permiso,
			username: form.username,
			password: form.password,
			nombre: form.nombre,
			apellido_paterno: form.apellido_paterno,
			apellido_materno: form.apellido_materno,
			email: form.email,
			telefono: form.telefono,
			direccion: form.direccion,
			saldo: form.saldo,
			foto_archivo: form.foto_archivo,
			foto_formato: form.foto_formato,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_usuario_agregar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	
	static update = (form) => {
		let params = {
			id_usuario: form.id_usuario,
			id_cat_sexo: form.id_cat_sexo,
			id_cat_estado: form.id_cat_estado,
			id_cat_tipo_permiso: form.id_cat_tipo_permiso,
			username: form.username,
			password: form.password,
			nombre: form.nombre,
			apellido_paterno: form.apellido_paterno,
			apellido_materno: form.apellido_materno,
			email: form.email,
			telefono: form.telefono,
			direccion: form.direccion,
			saldo: form.saldo,
			rfc: form.rfc,
			foto_archivo: form.foto_archivo,
			foto_formato: form.foto_formato,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_usuario_editar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	
	static delete = (item) => {
		let params = {
			id_usuario: item.id_usuario
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_usuario_eliminar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	
}

export default UsuarioService;
