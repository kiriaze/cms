export default class Form {
	
	constructor(wp, crud, mm){

		this.wp				= wp;
		this.crud			= crud;
		this.mm				= mm;
		
		this.$el			= $('.edit-form');
		this.$imgPreview	= this.$el.find('.img-preview');
		this.$inputs		= this.$el.find('input:not([type="hidden"]), textarea');
		this.$selectImage	= this.$el.find('input[name="select-image"]');

	}
	
	get(postID) {

		// form
		this.wp.posts().id(postID)
			.then( (data) => {

				
				let p = {
					title: data.title.rendered,
					content: $(data.content.rendered).text()
				};

				let imgID     = data.featured_media,
					imgURL;

				// this.wp.media().id(imgID)
				// 	.then( (media) => {
				// 		imgURL = media.source_url;
				// 		this.$imgPreview.attr('src', imgURL);
				// 		this.$inputs.each((k,v) => {
				// 			let name = $(v).attr('name');
				// 			let val  = p[name];
				// 			$(v).val(val);
				// 		});
				// 	});

				this.$inputs.each((k,v) => {
					let name = $(v).attr('name');
					let val  = p[name];
					$(v).val(val);
				});

			});

	}
	
	post() {
		
		this.$el.off('submit').on('submit', (e) => {

			e.preventDefault();
			
			let $this	= $(e.currentTarget);
			let data	= {};
			
			// iterate over input values
			this.$inputs.each((k,v) => {
				let val = $(v).val();
				if ( ! val ) return;
				data[$(v).attr('name')] = val;
			});

			// update post
			this.crud.create( data, (postID) => {

				// attach media to post
				// upload is handled via mediaManager
				this.wp.posts().id( postID ).update({
					featured_media: this.$selectImage.val()
				}).then( () => {
					console.log('image attached to postID: ', postID);
				});
				
			});

		});

	}

	update(postID) {
		
		this.$el.off('submit').on('submit', (e) => {

			e.preventDefault();
			
			let $this	= $(e.currentTarget);
			let data	= {};
			
			// iterate over input values
			this.$inputs.each((k,v) => {
				let val = $(v).val();
				if ( ! val ) return;
				data[$(v).attr('name')] = val;
			});

			// update post
			this.crud.update(postID, data, () => {

				// attach media to post
				// upload is handled via mediaManager
				this.wp.posts().id( postID ).update({
					featured_media: this.$selectImage.val()
				}).then( () => {
					console.log('image attached to postID: ', postID);
				});
				
			});

		});

	}

}