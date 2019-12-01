import {HttpRequest} from '../../settings/Libs/Libs';

class SaldoService {

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
