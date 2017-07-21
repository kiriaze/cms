export default class Auth {

	constructor(endpoint) {

		this.WPAPI		= require('wpapi');
		this.endpoint   = endpoint;

		this.authenticated = false;
		
	}

	userLoggedIn() {

		return this.authenticated;

	}

	authenticate(username, password) {

		this.username = username || localStorage.username;
		this.password = password || localStorage.password;

		// authenticate
		// requires https://github.com/WP-API/Basic-Auth
		this.wp	= new this.WPAPI({
			endpoint: this.endpoint,
			username: this.username, // ...
			password: this.password, // ...
			auth: true // while deving, basic auth
		});

		this.authenticated = true;

		return this;

	}

	validatePermissions() {

		return new Promise(resolve => {

			this.wp.users().me().then( (data) => {
				
				// console.log('sucess: ', data);

				this.storeToken();

				resolve();

			}).catch( (err) => {
				// handle error
				console.log(err, err.data.status);
			});

		});

	}

	storeToken() {
		localStorage.username = this.username;
		localStorage.password = this.password;
	}

	checkToken() {
		return localStorage.username && localStorage.password;
	}

}