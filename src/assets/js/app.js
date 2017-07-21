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
// import {element} from '../../views/modules/heroes/hero/script';
// document.write(element);

// import '../../views/modules/heroes/hero/template.twig'; // requires twig-loader


///////////////////////////////////////////////////////////////////////

// wp
import '../../views/modules/cms/script.js';

// views
import FormTemplate from '../../views/modules/cms/form/template.js';

// Router

import Router from './router.js';

$(document).on('click', 'a', (e) => {
	e.preventDefault();
	// prob ignore target=new/_blank
	Router.navigate($(e.currentTarget).attr('href'));
});

Router.route('/', (e) => {
	console.log('home');
});

Router.route('/add-post', () => {

	// load template and pass data into template
	// router usage: if page load corresponding template?
	let data = {
		heading: 'foo'
	};

	let template = new FormTemplate(data);

	$('.app').html(template.template);

});

Router.route('/$slug', (slug) => {
	
	console.log(slug);
	// pageTransition();

	// new age ajax
	fetch(slug + '.html', {method: 'get'})
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