console.log("inside custom-notes.js");


$(document).ready(function(){
	moveDescription();
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

	$('#hide-description').on('click',function(){
		moveDescription();
	});

	$('#font-size').change(function(){
		console.log('i wanna change da font');
		changeFontSize();
	});

	$('#hide-note-settings').on('click', function(){
		moveSettings();
	});

	$('#public-checkbox').on('change', function(){
		moveCheckNotification();
	});
		
}

updateNote = function(){
	console.log("making ajax request!");
	var regExp= /^\/notes\/(\d+)/;
	var noteId= regExp.exec($pathname)[1];
	var $title= $('.note-title-header').text();
	var $content= $('#note_content').val();
	var $public_val= $('#public-checkbox').is(':checked');
	console.log($public_val);

		$.ajax({
			type: "patch",
			url: '/notes/'+noteId,
			dataType: 'json',
			data: { note: {title: $title , content: $content, public: $public_val }, id: noteId},
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
	if( $('.note-title-header').val() != new_title ){
		console.log("tring to change title");
		$('.note-title-header').html(new_title);
	}
}

moveDescription = function(){
	console.log('hiding description');
	if( $('.description').css('display') != 'none'){
		$('.description').css('display','none');
		$('#description-message').css('display','none');
		$('#hide-description').find('span').removeClass('glyphicon-minus').addClass('glyphicon-plus') ; 
	}
	else {
		$('.description').css('display','block');
		$('#description-message').css('display','inline');
		$('#hide-description').find('span').removeClass('glyphicon-plus').addClass('glyphicon-minus') ; 
	}
	
}

changeFontSize= function(){
	var value= $('#font-size').val();
	$('#note_content').css('font-size', parseInt(value));
}

moveSettings = function(){
	if( $('.note-settings').css('display') != 'none' ){
		$('.note-settings').css('display','none');
	}
	else {
		$('.note-settings').css('display','block');
		
	}
}

moveCheckNotification = function(){
	console.log("trying to change notif");
	if ($('#public-checkbox').is(':checked')){
		console.log("yeet");
		$('#check-for-public').css('visibility', 'visible');
		$('#message-for-public').css('visibility','visible');
	}
	else{
		$('#check-for-public').css('visibility', 'hidden');
		$('#message-for-public').css('visibility','hidden');
	}
}





