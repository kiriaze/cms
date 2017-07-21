// wp api

// ToDo:
// write to data dir different json endpoints; e.g. /wp-json/wp/v2/pages || /wp-json/wp/v2/posts
// each having their own json file
// on update/create, re write local json files
// reference local json for read and render, both interface and template rendering

// concept:
// 1. use localstorage to store json and render templates with twig
// 2. use php to store json response into data dir locally and render with twig
// 3. use both, circumstantial - php templates for templates that need live changes on server reading from json, which php can create, and twig for flat content

import styles from './style.scss';

import config from '../../../../config.js';

import Crud from './crud.js';
import Form from './form/script.js';
import mediaManager from './media-manager/media-manager.js';

import Auth from './auth.js';

import FormTemplate from './form/template.js';

class CMS {

	constructor(){

		this.endpoint		= config.wpEndpoint;
		this.auth			= new Auth(this.endpoint);
		
		this.$loginForm		= $('.login-form');
		this.$editForm		= $('.edit-form');
		this.$logout		= $('.logout');
		
		this.$getPosts		= $('.get-posts');
		this.$addPost		= $('.add-post');
		this.$editPost		= $('.edit-post');
		this.$deletePost	= $('.delete-post');

		// 
		// load template and pass data into template
		// router usage: if page load corresponding template?
		let data = {
			heading: 'foo'
		};
		let template = new FormTemplate(data);
		$('.app').append(template.template);

		// 

		if ( this.auth.userLoggedIn() ) {

			this.init();

		} else if (this.auth.checkToken()) {

			this.auth.authenticate().validatePermissions().then(() => {
				this.init();
			});

		} else {

			this.$editForm.hide();
			this.$loginForm.show();

			this.$loginForm.on('submit', (e) => {
				
				e.preventDefault();

				let username = this.$loginForm.find('input[name=username]').val(),
					password = this.$loginForm.find('input[name=password]').val();

				this.auth.authenticate(username, password).validatePermissions().then(() => {
					this.init();
				});

			});

		}

		// // from crud.js read
		// console.log(JSON.parse(localStorage.posts));
		
	}

	init() {

		this.$loginForm.hide();
		this.$editForm.show();
		this.$logout.show();

		this.wp		= this.auth.wp;
		this.crud	= new Crud(this.wp);
		this.mm		= new mediaManager(this.wp);

		// post edit form
		this.form = new Form(this.wp, this.crud, this.mm);

		this.addEventListeners();

	}

	_getPosts() {

		this.crud.read().then((data) => {
			
			console.log('getting posts..');
			
			let output = `<ul class="post-list">`;
			
			data.forEach((elem) => {
				// console.log(elem);
				output += `<li><a href="javascript:;" class="edit-post" data-id="${elem.id}">${elem.title.rendered}</a></li>`;
			});
			
			output += `</ul>`;
			
			$('#main').append(output);

			//
			$('#main').find('.edit-post').on('click', (e) => {
				let id = $(e.currentTarget).data('id');
				this._editPost(id);
			});

		});

	}

	_addPost() {
		console.log('adding post');
		this.form.post();
	}
	
	_editPost(id) {
		// console.log(id);
		this.form.get(id);
	}

	_deletePost() {

	}

	_logout(e) {

		localStorage.removeItem('username');
		localStorage.removeItem('password');
		location.reload(true);

	}

	addEventListeners() {
		// 
		this._logout		= this._logout.bind(this);
		this._getPosts		= this._getPosts.bind(this);
		this._addPost		= this._addPost.bind(this);
		this._deletePost	= this._deletePost.bind(this);

		// 
		this.$logout.on('click', this._logout);
		this.$getPosts.on('click', this._getPosts);
		this.$addPost.on('click', this._addPost);
		this.$deletePost.on('click', this._deletePost);

	}
	

}

new CMS;