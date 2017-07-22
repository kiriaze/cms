import styles from './style.scss';

export default function(data) {
	
	let template = `<div class="hero">
						<h2>${data.heading}</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur laudantium recusandae itaque libero velit minus ex reiciendis veniam. Eligendi modi sint delectus beatae nemo provident ratione maiores, voluptatibus a tempore!</p>
					</div>`;

					return template;

}