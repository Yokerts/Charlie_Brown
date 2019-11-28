const protocol = window.location.protocol;
const hostname = window.location.hostname;
const port = window.location.port;

let a, s;

switch (hostname) {
	case 'localhost':
	case '127.0.0.1':
		a = 'http://127.0.0.1:8000/api/';
		s = 'http://127.0.0.1:8000/';
		break;
	default:
		a = protocol + '//api' + hostname + '/public/api/';
		s = protocol + '//api' + hostname + '/public/';
}

const api = a;
const src = s;

const basename = hostname === 'localhost' ? (Number(port) === 3000 || Number(port) === 3001 || Number(port) === 3002 || Number(port) === 3003 ? '' : '/reactjs/build/') : '/';

export const CONFIG = {
	prefix: 'reactjs',
	api: api,
	src: src,
	basename: basename,
	debug: true,
};
