import {HttpRequest} from '../../settings/Libs/Libs';

class CargoService {


    static all = (item) => {
        let params = {
            "monto_cargo": item.monto_cargo || 0,
            "fecha_cargo": item.fecha_cargo || ''
        };
        return new Promise((resolve, reject) => {
            HttpRequest.post('_cargo_agregar', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    static xid = (item) => {
        let params = {
            id_cat_sexo: item.id_cat_sexo
        };
        return new Promise((resolve, reject) => {
            HttpRequest.post('_cargo_xid', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    };
}

export default CargoService;
