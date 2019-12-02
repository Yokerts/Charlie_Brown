import {HttpRequest} from '../../settings/Libs/Libs';

class PagosService {

    static all = (item) => {
        let params = {
            id_usuario: item.id_usuario
        };
        return new Promise((resolve, reject) => {
            HttpRequest.post('_pago_datos', params).then((response) => {
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
            HttpRequest.post('_pago_xid', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    static add = (item) => {
        let params = {
            id_usuario: item.id_usuario,
            id_cargo: item.id_cargo,
            monto_pago: item.monto_pago,
            fecha_pago: item.fecha_pago,
        };
        return new Promise((resolve, reject) => {
            HttpRequest.post('_pago_agregar', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    };
}

export default PagosService;