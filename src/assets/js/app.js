// accept hot module reloading
if ( module.hot ) {
	module.hot.accept();
}

import '../scss/style.scss';
// import '../scss/styleguide.scss';
// import '../../views/modules/style.scss';

import jQuery from 'jquery';

// // import mods script.js, which imports the associated style.scss
// // then inject to dom
// let data = {
// 	heading: 'job'
// };
// import HeroTemplate from '../../views/modules/heroes/hero/script';
// let template = HeroTemplate(data);
// document.write(template);


///////////////////////////////////////////////////////////////////////

// wp
import '../../views/modules/cms/script.js';

// views
import LoginTemplate from '../../views/modules/cms/login/template.js';
import FormTemplate from '../../views/modules/cms/form/template.js';

// Router

import Router from './router.js';

// hijack anchors
$(document).on('click', 'a', (e) => {
	e.preventDefault();
	// prob ignore target=new/_blank
	Router.navigate($(e.currentTarget).attr('href'));
});

Router.route('/', (e) => {
	fetch('index.html')
		.then((response) => {
			return response.text();
		})
		.then((markup) => {
			// console.log(markup);
			let $markup = $(markup).find('.app').html();
			$('.app').html($markup);
		})
		.catch(function(err) {
			// Error :(
		});
});

// js template injection
Router.route('/login', () => {

	let data = {};
	let template = new LoginTemplate(data);

	$('.app').html(template.template);

});

// js template injection
Router.route('/add-post', () => {

	// load template and pass data into template
	// router usage: if page load corresponding template?
	let data = {
		heading: 'foo'
	};

	let template = new FormTemplate(data);

	$('.app').html(template.template);

});

// page routing markup injection
Router.route('/$slug', (slug) => {
	
	// console.log(slug);
	// pageTransition();

	// new age ajax
	fetch(slug + '.html')
		.then((response) => {
			return response.text();
		})
		.then((markup) => {
			// console.log(markup);
			let $markup = $(markup).find('.app').html();
			$('.app').html($markup);
		})
		.catch(function(err) {
			// Error :(
		});
});

Router.start();