import {HttpRequest} from '../../settings/Libs/Libs';

class SaldoService {

    static all = (item) => {
        let params = {
            id_usuario: item.id_usuario || '',
            fecha_inicio: item.fecha_inicio || '',
            fecha_fin: item.fecha_fin || ''
        };
        return new Promise((resolve, reject) => {
            HttpRequest.post('_saldo_datos', params).then((response) => {
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
            HttpRequest.post('_saldo_agregar', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    };
}

export default SaldoService;
