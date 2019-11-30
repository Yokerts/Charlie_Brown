import {HttpRequest} from '../../settings/Libs/Libs';

class SexoService {
	
	static get = () => {
		let params = {};
		return new Promise((resolve, reject) => {
			HttpRequest.get('_sexos', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	static all = () => {
		let params = {};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_sexo_datos', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	
	static show = (item) => {
		let params = {
			id_cat_sexo: item.id_cat_sexo
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_sexo_xid', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	
	static create = (form) => {
		let params = {
			id_cat_sexo: null,
			sexo: form.sexo,
			activo: form.activo,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_sexo_agregar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	
	static update = (form) => {
		let params = {
			id_cat_sexo: form.id_cat_sexo,
			sexo: form.sexo,
			activo: form.activo,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_sexo_editar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	
	static delete = (item) => {
		let params = {
			id_cat_sexo: item.id_cat_sexo
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_sexo_eliminar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	
}

export default SexoService;
