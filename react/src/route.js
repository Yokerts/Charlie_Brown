import React, {Component, Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';

import App from './components/App';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Usuario from './components/Usuario/Usuario';
import Estandar from './components/Estandar/Estandar';
import Pagina404 from './components/Pagina404/Pagina404';
import Administrador from "./components/Administrador/Administrador";

class AppRoutes extends Component {
	
	render() {
		return (
			<Fragment>
				<App>
					<Switch>
						
						<Route exact path="/" component={Login}/>
						
						<Route exact path="/login" component={Login}/>
						
						<Route exact path="/home" component={Home}/>
						
						<Route exact path="/home/:nombre" component={Home}/>
						
						<Route exact path="/administrador" component={Administrador}/>
						
						<Route exact path="/estandar" component={Estandar}/>

						<Route exact path="/usuario" component={Usuario}/>

						<Route component={Pagina404}/>
					
					</Switch>
				</App>
			</Fragment>
		);
	}
}

export default AppRoutes;
