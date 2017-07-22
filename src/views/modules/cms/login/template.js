// example js template

export default class FormTemplate {
	
	constructor(data){

		this.template = `<form action="" class="login-form">
							<input type="text" name="username" placeholder="Username">
							<input type="password" name="password" placeholder="password">
							<button class="button" type="submit">Login</button>
						</form>`;
	}
	
}