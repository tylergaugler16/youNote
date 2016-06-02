jQuery ->
	if $('#infinite-scrolling').size() > 0
		$('.pagination').css 'display': 'none'
		$(window).on 'scroll', ->
			more_notes_url = $('.pagination a.next_page').attr('href')
			console.log(more_notes_url)
			if more_notes_url && $(window).scrollTop() > $(document).height() - $(window).height() - 160
				$.ajaxSetup({
    				cache: true
				});
				$('.pagination').html('<img src="/assets/ajax-loader.gif" alt="Loading..." title="Loading..."/>')
				$('#ajax-gif').html('<img src="/assets/ajax-loader.gif" alt="Loading..." title="Loading..."/>')
				$.getScript more_notes_url
		return
	return