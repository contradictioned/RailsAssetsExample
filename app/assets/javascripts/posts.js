$( document ).ready(function() {
  // credits to http://stackoverflow.com/questions/11338592/how-can-i-bind-to-the-change-event-of-a-textarea-in-jquery
	$("#post_content").first().on('input propertychange', function() {
		var input = this.value;
		var md = markdown.toHTML(input);
		$("#preview").html(md);
	});
});