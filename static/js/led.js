$(document).ready(function() {

	$("button").click(function() {

		var data = {
			type: null,
			command: null
		}

		if ($(this).hasClass('preset')) {
			data.type = 'preset';
			data.command = $(this).data('preset');
		} else if ($(this).hasClass('action')) {
			data.type = 'action';
			data.command = $(this).data('action');
		} else {
			return;
		}

		$.ajax({
			url: "http://localhost:8080/action",
			type: "POST",
			data: data,
			error: function(e) {
				console.log(e);
			}
		})


	});

})