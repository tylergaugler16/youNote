
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
	$('.update-note').on('click', function(){
		console.log("watching changes..");
		updateNote();
	});

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
	console.log("creating table");	
		insertTable();
		
		// $(table).appendTo('')
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
	var $content= $('#note-content').html();
	var $public_val= $('#public-checkbox').is(':checked');
	console.log($public_val);

		$.ajax({
			type: "patch",
			url: '/notes/'+noteId,
			dataType: 'json',
			data: { note: {title: $title , content: $content, public: $public_val }, id: noteId},
			success: function(data){
				console.log("Data: "+ data[0]);
				alertUser();
				

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

insertTable = function(){
	console.log("inserting table");
	var rows= parseInt($('#table-rows').val());
	var columns = parseInt($('#table-columns').val());
	var table= "<table class=\" table table-bordered\"  contenteditable>";

	console.log(columns);


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





