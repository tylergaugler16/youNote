console.log("inside custom-notes.js");


$(document).ready(function(){
	$pathname = window.location.pathname.toString();
	console.log("path: "+$pathname);
	

	if($pathname.match(/^\/notes\/\d+/)){
		watchChanges();
	}
	else {console.log("not the right url");}


});

watchChanges = function(){
	//if changes call
	$('input[type=submit]').on('click', function(){
		console.log("watching changes..");
		updateNote();
	});
		
}

updateNote = function(){
	console.log("making ajax request!");
	var regExp= /^\/notes\/(\d+)/;
	var noteId= regExp.exec($pathname)[1];
	var $title= $('#note_title').val();
	var $content= $('#note_content').val();

		$.ajax({
			type: "patch",
			url: '/notes/'+noteId,
			dataType: 'json',
			data: { note: {title: $title , content: $content}, id: noteId },
			success: function(data){
				console.log("Data: "+ data[0]);
				changeTitle($title);
				alertUser();
				

			},
			failure: function(){
				console.log('didnt work');
			}

		});

}

alertUser= function(){
	if(! $('.alert').length ){
		$('.space').after("<div class='alert alert-success' >"+
										"<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
					  					"<strong>Updated Note!</strong>" + 
									"</div>");
	}
	
}

changeTitle= function(new_title){
	console.log("changeTitle function");
	console.log(new_title);
	console.log($('#note_title').val());
	if( $('.note-title-header').val() != new_title ){
		console.log("tring to change title");
		$('.note-title-header').html(new_title);
	}
}





