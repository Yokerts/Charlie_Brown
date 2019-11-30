import {HttpRequest} from '../../settings/Libs/Libs';

class EstadosService {

    static get = () => {
        let params = {};
        return new Promise((resolve, reject) => {
            HttpRequest.get('_estados', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    static all = () => {
        let params = {};
        return new Promise((resolve, reject) => {
            HttpRequest.post('_estados_datos', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    static show = (item) => {
        let params = {
            id_cat_estado: item.id_cat_estado
        };
        return new Promise((resolve, reject) => {
            HttpRequest.post('_estados_xid', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    static create = (form) => {
        let params = {
            id_cat_estado: null,
            estado: form.estado,
            activo: form.activo,
        };
        return new Promise((resolve, reject) => {
            HttpRequest.post('_estados_agregar', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    static update = (form) => {
        let params = {
            id_cat_estado: form.id_cat_estado,
            estado: form.estado,
            activo: form.activo,
        };
        return new Promise((resolve, reject) => {
            HttpRequest.post('_estados_editar', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    static delete = (item) => {
        let params = {
            id_cat_estado: item.id
        };
        return new Promise((resolve, reject) => {
            HttpRequest.post('_estados_eliminar', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    };

}

export default EstadosService;
