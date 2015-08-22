$(document).ready(function() {

	$("button").click(function() {

		// Shell of Data to Send to Server
		var data = {
			type: null,
			command: null
		}

		// Data to Send is Encoded in Button Data
		if ($(this).hasClass('preset')) {
			data.type = 'preset';
			data.command = $(this).data('preset');
		} else if ($(this).hasClass('action')) {
			data.type = 'action';
			data.command = $(this).data('action');
		} else {
			return;
		}

		// Make the Request
		// We don't really care about success, although something on error would probably be a good idea.
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