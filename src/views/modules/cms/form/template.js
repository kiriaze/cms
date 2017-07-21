// example js template

export default class FormTemplate {
	
	constructor(data){

		this.template = `<form class="edit-form">
			<h2>${data.heading}</h2>
			<fieldset>
				<div class="row">
					<label>Post Title</label>
					<input name="title" type="text">
				</div>
				<div class="row">
					<label>Image</label>
					<a href="javascript:;" class="btn open-mm">Media Manager</a>
					<img src="" class="img-preview">
					<input name="select-image" type="hidden">
				</div>
				<div class="row">
					<label>Post Content</label>
					<textarea name="content" id="post-content" cols="30" rows="10"></textarea>
				</div>
				<div class="row">
					<button type="submit">Submit</button>
				</div>
			</fieldset>
		</form>`;

	}

}