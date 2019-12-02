import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import UsuarioService from "../../../services/Usuario/UsuarioService";
import PagoService from "../../../services/Pagos/PagosService";
import MesesService from "../../../services/Meses/MesesService";
import moment from "moment";


class ModalPago extends Component {

	state = {};

	constructor(props) {
		super(props);
		this.state = {
			open: false,

			id_usuario: '',
			id_cat_mes: '',
			id_cargo: '',
			mes: '',

			cat_meses: []
		};
	}

	open = () => {
		let item = this.props.item;
		this.setState({
			open: true,
			id_cargo: item.id_cargo || '',
			id_usuario: item.id_usuario || '',
			fecha_pago: item.fecha_pago || '',
			monto_pago: item.monto_pago || '',
			dia_formato: moment(item.fecha_pago).format("DD MMMM YYYY") || '',
		});
		if (item.id_cat_sexo > 0) {
			this.show(item);
		}
	};

	close = () => {
		this.setState({
			open: false,

			id_cat_mes: '',

		});
	};


	show = (item) => {
		UsuarioService.show(item).then(response => {
			this.setState({
				id_usuario: response.data.id_usuario || '',
				id_cat_sexo: response.data.id_cat_sexo || '',
			});
		}).catch(error => {
			alert(error.mensaje);
		});
	};

	save = () => {
		this.pago();
		// if (this.state.id_usuario > 0) {
		//     this.update();
		// } else {
		//     this.create();
		// }
	};

	pago = () => {
		console.log(this.state);
		PagoService.add(this.state).then(response => {
			alert(response.mensaje);
			this.close();
		}).catch(error => {
			alert(error.mensaje);
		});
	};

	update = () => {
		UsuarioService.update(this.state).then(response => {
			alert(response.mensaje);
			this.props.RefrechList();
			this.close();
		}).catch(error => {
			alert(error.mensaje);
		});
	};



	render() {
		return (
			<div>

				<span onClick={this.open}>
					{this.props.componente}
				</span>

				<Dialog
					open={this.state.open}
					onClose={() => this.close()}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					maxWidth="sm"
				>

					<DialogTitle>
						Cargo
					</DialogTitle>

					<DialogContent>
						<Grid container spacing={2}>

							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								<label>Seguro que desea realizar el de la fecha: <strong>{this.state.dia_formato}</strong> por la cantidad de: <strong>${this.state.monto_cargo}</strong></label>
							</Grid>

						</Grid>
					</DialogContent>

					<DialogActions>
						<Button variant="contained" onClick={() => this.close()}>
							Cancelar
						</Button>
						<Button variant="contained" color="primary" onClick={() => this.save()} autoFocus>
							Aceptar
						</Button>
					</DialogActions>

				</Dialog>
			</div>
		);
	};

}

ModalPago.propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.number.isRequired,
		PropTypes.oneOf([null]).isRequired,
	]),
	tipo: PropTypes.string.isRequired,
	item: PropTypes.object.isRequired,
	componente: PropTypes.element.isRequired
};

export default ModalPago;
