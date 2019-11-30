import React, {Component, Fragment} from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import $State, {FieldsJs} from '../../settings/Libs/Libs';
import LoginService from "../../services/Login/LoginService";

import loginImage from '../../assets/fondo_ini.jpg';
import ModalRegistro from "./includes/ModalRegistro";

import {AddOutlined} from "@material-ui/icons";



class Login extends Component {
	
	state = {};


	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
		};
	}
	
	login = () => {
		LoginService.Login(this.state).then(response => {
			$State.go(this.props, 'home', {nombre: response.data.username})
		}).catch(error => {
			console.log(error);
			alert(error.mensaje)
		});
	};

	registro = () => {
		$State.go(this.props, 'registro')
	};



	render() {
		const url_fondo = loginImage;

		return (
			<Fragment>
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
					style={{height: '100vh', source: {require: '../../assets/fondo_ini.jpg'} }}
				>
					<Grid item xs={8} sm={6} md={3} lg={3} xl={3}>
						<Card>
							<CardContent>
								
								<Grid container>
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
										<Typography color="textSecondary" gutterBottom>
											Login
										</Typography>
									</Grid>
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
										<TextField
											label="Usuario"
											type="text"
											margin="normal"
											variant="outlined"
											fullWidth
											onChange={(e) => {
												this.setState({
													username: e.target.value
												});
											}}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
										<TextField
											label="Contraseña"
											type="password"
											autoComplete="current-password"
											margin="normal"
											variant="outlined"
											fullWidth
											onChange={(e) => {
												this.setState({
													password: e.target.value
												});
											}}
										/>
									</Grid>
								</Grid>
							
							</CardContent>
							<CardActions>
								<ModalRegistro
									tipo={'add'}
									item={{}}
									RefrechList={this.RefrechList}
									componente={<Button variant="contained">Registro </Button>}
								/>
								<Button variant="contained" color="primary" onClick={() => this.login()}>Login</Button>

							</CardActions>
						</Card>
					</Grid>
				</Grid>
			
			</Fragment>
		);
	}
}

export default Login;
