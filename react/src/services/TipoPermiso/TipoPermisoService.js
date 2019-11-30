import {HttpRequest} from '../../settings/Libs/Libs';

class TipoPermisoService {

    static get = () => {
        let params = {};
        return new Promise((resolve, reject) => {
            HttpRequest.get('_tipo_permisos', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    static all = () => {
        let params = {};
        return new Promise((resolve, reject) => {
            HttpRequest.post('_datos', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    static show = (item) => {
        let params = {
            id_cat_tipo_permiso: item.id_cat_tipo_permiso
        };
        return new Promise((resolve, reject) => {
            HttpRequest.post('_tipo_permiso_xid', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    static create = (form) => {
        let params = {
            id_cat_tipo_permiso: null,
            tipo_permiso: form.tipo_permiso,
            activo: form.activo,
        };
        return new Promise((resolve, reject) => {
            HttpRequest.post('_tipo_permiso_agregar', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    static update = (form) => {
        let params = {
            id_cat_tipo_permiso: form.id_cat_tipo_permiso,
            tipo_permiso: form.tipo_permiso,
            activo: form.activo,
        };
        return new Promise((resolve, reject) => {
            HttpRequest.post('_tipo_permiso_editar', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    static delete = (item) => {
        let params = {
            id_cat_tipo_permiso: item.id_cat_tipo_permiso
        };
        return new Promise((resolve, reject) => {
            HttpRequest.post('_tipo_permiso_eliminar', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    };

}

export default TipoPermisoService;
