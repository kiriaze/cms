// accept hot module reloading
if ( module.hot ) {
	module.hot.accept();
}

import '../scss/style.scss';
// import '../scss/styleguide.scss';
// import '../../views/modules/style.scss';

import jQuery from 'jquery';


// import mods script.js, which imports the associated style.scss
// then inject to dom
import {element} from '../../views/modules/heroes/hero/script';
document.write(element);

// import '../../views/modules/heroes/hero/template.twig'; // requires twig-loader



///////////////////////////////////////////////////////////////////////

// wp
import '../../views/modules/cms/script.js';


// // barba pjax
// import Barba from 'barba.js';
// Barba.Pjax.start();
// <div id="barba-wrapper">
//   <div class="barba-container">
//     ...Put here the content you wish to change between pages...
//   </div>
// </div>