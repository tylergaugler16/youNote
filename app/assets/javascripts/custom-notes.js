$(document).ready(function(){
	moveDescription();
	$pathname = window.location.pathname.toString();

	if($pathname.match(/^\/notes\/\d+/)){
		watchChanges();
	}
	else {console.log("not the right url");}
});

watchChanges = function(){
	$('.update-note').on('click', function(e){
		e.preventDefault();
		updateNote(true);
	});

	setInterval(function(){ 
		updateNote(false); 
	}, 60000);

	$('#hide-description').on('click',function(){
		moveDescription();
	});

	$('#note-content').on('keydown', function(e){
	
	});

	$('#font-size').change(function(){
		changeFontSize();
	});

	$('#embolden').on('click', function(){
		document.execCommand('bold');
	});

	$('#italicize').on('click', function(){
		document.execCommand('italic');
	});

	$('#underline').on('click',function(){
		document.execCommand('underline');
	});

	$('#create-table').on('click',function(){	
		insertTable();
	});

	$('#hide-note-settings').on('click', function(){
		moveSettings();
	});

	$('#public-checkbox').on('change', function(){
		moveCheckNotification();
	});
}

updateNote = function(should_notify){
	var regExp 		= /^\/notes\/(\d+)/;
	var noteId 		= regExp.exec($pathname)[1];
	var $title 		= $('.note-title-header').text();
	var $content 	= $('#note-content').html();
	var $public_val	= $('#public-checkbox').is(':checked');

		$.ajax({
			type: "patch",
			url: '/notes/'+noteId,
			dataType: 'json',
			data: { note: {title: $title , content: $content, public: $public_val }, id: noteId},
			success: function(data){
				if(should_notify){ alertUser(); }
			},
			failure: function(){
				console.log('didnt work');
			}
		});
}
alertUser= function(){
	if(! $('.alert').length ){
		$('.navbar').after("<div class='alert alert-success' >"+
										"<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>" +
					  					"<strong>Updated Note!</strong>" + 
										"</div>");
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
	$('#note-content').css('font-size', parseInt(value));
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
	if ($('#public-checkbox').is(':checked')){
		$('#check-for-public').css('visibility', 'visible');
		$('#message-for-public').css('visibility','visible');
	}
	else{
		$('#check-for-public').css('visibility', 'hidden');
		$('#message-for-public').css('visibility','hidden');
	}
	updateNote(true);
}

insertTable = function(){
	console.log("inserting table");
	var rows= parseInt($('#table-rows').val());
	var columns = parseInt($('#table-columns').val());
	var table= "<table class=\" table table-bordered\"  contenteditable>";
	for(i= 0; i<rows; i++){

		if(i==0){ 
			table=table.concat("<thead><tr>");
			for(t=0;t<columns;t++){
				table= table.concat("<th>Header</th>")
			}
			table= table.concat("</tr> </thead> <tbody>");
		}
		table=table.concat("<tr>");
		for(c=0;c<columns;c++){
			table=table.concat("<td>value</td>");
		}
		table=table.concat("</tr>");
	}
	table=table.concat("</tbody></table>");

	$('#note-content').append(table);
}





