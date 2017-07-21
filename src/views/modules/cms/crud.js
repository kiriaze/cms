import config from '../../../../config.js';

export default class Crud {
	
	constructor(wp){
		this.wp         = wp;
	}

	create(data) {

		this.wp.posts().create({
			// "title" and "content" are the only required properties
			title: data['title'],
			content: data['content'],
			// Post will be created as a draft by default if a specific "status"
			// is not specified
			status: 'publish'
		}).then( (response) => {
			// "response" will hold all properties of your newly-created post,
			// including the unique `id` the post was assigned on creation
			console.log( response.id );
		});

	}
	
	read() {

		return new Promise(resolve => {

			this.wp.posts().then( (data) => {
				// do something with the returned posts
				// console.log(data);
				resolve(data);

				// let title	= data[0].title.rendered,
				// 	content	= data[0].content.rendered,
				// 	imgID   = data[0].featured_media,
				// 	imgURL,
				// 	img;

				// if ( imgID )
				// this.wp.media().id(imgID)
				// 	.then( (media) => {
				// 		// console.log(media);
				// 	})
				// 	.catch( (err) => {
				// 		console.log('no image');
				// 	});

				// // then send another get request and cache it
				// // localstorage solution below, otherwise use php to write to data dir
				// if ( ! localStorage.posts ) {
				// 	localStorage.posts = JSON.stringify(data);
				// }

			}).catch( (err) => {
				// handle error
				console.log(err);
			});

		})

	}

	update(id, data, cb) {

		// .id() must be used to specify the post we are updating
		this.wp.posts().id(id).update({
			title: data['title'],
			content: data['content'],
			categories: data['categories'], // cat ids: [1,2]
			tags: data['tags'], // tag ids: [1,2]
			// Set the post live (assuming it was "draft" before)
			status: 'publish',
			// taxonomies
			// custom meta
		}).then( (response) => {
			// console.log( response );
			cb(response);
		});
	}

	delete(id) {
		this.wp.posts().id(id).delete({
			force: true
		}).then( (response) => {
			// console.log( response );
		});
	}

}