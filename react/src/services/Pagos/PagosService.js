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

    static add = (item) => {
        let params = {
            id_usuario: item.id_usuario,
            monto_saldo: item.monto_saldo,
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