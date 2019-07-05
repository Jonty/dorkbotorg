

/**
 * Some events that are initialized during page load.
 */
$(document).ready(function(){

	// Make 'suggested tags' clickable in 'new entry' screen.
	$("a[@rel=tag]").click( function(tag){ 

		var keywords = $('#f_keywords').val();
		var tagfield = $('#f_tag').val();
		var tag = $(this).html();		
		
		if (keywords=="") {
			$('#f_keywords').val(tag);
		} else {
			$('#f_keywords').val(keywords + ", " + tag);
		}
	
	});
  

	// Make 'suggested tags'clickable in 'add tag' dialogs.
	$("a[@rel=dialogtag]").click( function(tag){ 
    	do_submit_tag($(this).html(), $('#f_link').val());
	});
  

	// Add calendar popups to all inputs with class 'date-picker'
	$('input.date-picker').datePicker({startDate:'01/01/1900', endDate:'31/12/2099'});
	$.datePicker.setDateFormat('mdy', '-');
	
	
	// Make all textareas with class='resizeable' automagically resizeable
	makeResizeable();

});



// browser identification
var agt = navigator.userAgent.toLowerCase();
var is_ie = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
var is_gecko = (agt.indexOf('gecko') != -1);
var is_opera = (agt.indexOf("opera") != -1);
var is_safari = (agt.indexOf("safari") != -1);


// Textarea resizer variables.
var startpos, diffpos=0, currentresizer = "", currentheight="", resizehandled=false;


// Make all textareas with class='resizeable' automagically resizeable
function makeResizeable() {
	
	$('.resizable').each(function(i) {

		var width = $(this).width();
		if ($.browser.mozilla) { width = width + 8; }
		$(this).after("<div class='resizer' style='width:" + width + "px;' title='Drag me..'></div>");

		$(this).next().mousedown( function(e) { 
			
			startpos = e.pageY;
			currentresizer = $(this).prev();	
			currentheight = $(currentresizer).height();
			resizehandled = true;	
		
			// Make the document trigger on mouseup, to stop resizing of textarea's. We bind this event only when one
			// of the resizers is clicked. 
			$(document).mouseup(function() {
				resizehandled = false;
			});	

			// Resize the textarea if 'resizehandled' is true. We bind this event only when one
			// of the resizers is clicked.
			$(document).mousemove(function(e) {
				if (resizehandled) {		
					curpos = e.pageY;
					diffpos = startpos - curpos;
					if (diffpos > -800 && diffpos < 400) {
						$(currentresizer).height(currentheight - diffpos + 'px');
					}
				}
			});		
					
		});	
		
	});

	
}



/**
 * Make the 'all' link in suggested tags fetch all tags..
 */
function getalltags(path) {
	
	$.ajax({
		type: "POST",
		url: path+"ajaxhelper.php",
		data: "function=getalltags",
		success: function(fetchedhtml) {
			$("#suggestedtags").html(fetchedhtml);
		},
		error: function() {
			alert("Error fetching tags.")
		}
		
	});
	
}




/**
 * Switch stuff..
 */
function moveOver(from,to) {
	// Move them over
	for (var i=0; i<from.options.length; i++) {
		var o = from.options[i];
		if (o.selected) {
			to.options[to.options.length] = new Option( o.text, o.value, false, false);
			}
		}
	// Delete them from original
	for (var i=(from.options.length-1); i>=0; i--) {
		var o = from.options[i];
		if (o.selected) {
			from.options[i] = null;
			}
		}

	sortSelect(from);
	sortSelect(to);

	from.selectedIndex = -1;
	to.selectedIndex = -1;
}

function sortSelect(obj) {
	var o = new Array();
	if (obj.options==null) { return; }
	for (var i=0; i<obj.options.length; i++) {
		o[o.length] = new Option( obj.options[i].text, obj.options[i].value, obj.options[i].defaultSelected, obj.options[i].selected) ;
		}
	if (o.length==0) { return; }
	o = o.sort(
		function(a,b) {
			if ((a.text+"") < (b.text+"")) { return -1; }
			if ((a.text+"") > (b.text+"")) { return 1; }
			return 0;
			}
		);

	for (var i=0; i<o.length; i++) {
		obj.options[i] = new Option(o[i].text, o[i].value, o[i].defaultSelected, o[i].selected);
		}
	}


	function selectAll() {

		var elts = document.getElementsByTagName('select');

		// do this for all <select>'s in document.
	    for (var i = 0; i < elts.length; i++) {

	    	// if the size > 1, meaning it's a multi-box, instead of a normal select..
	    	if(elts[i].size > 1 ) {

				// for each <select>, we now select all the options
				for (var j = 0; j < elts[i].length; j++) {
					elts[i].options[j].selected = 1;
				}
	    	}
		}
	}


	function open_preview(code) {
  window.open("entry.php?id="+code,"preview","toolbar=yes, status=yes, location=yes, scrollbars=yes, resizable=yes, width=600, height=450");
}

function open_win(url, title, params) {
  if (window.open(url, title, params)) {
	} else {
		alert("popup was blocked by your browser");
		document.getElementById("note").innerHTML = "<div style=\"border:1px solid #999; padding: 4px;\" click <a href=\'"+url+"\' onclick=\'window.open(\""+url+"\", \""+title+"\", \""+params+"\");return false;\'>here</a> to open the requested window.</div>";
	}
}


function setCheckboxes(the_form, do_check) {
	var elts      =  document.getElementsByTagName("input");
	var elts_cnt  = (typeof(elts.length) != "undefined") ? elts.length : 0;
	if (elts_cnt) {
		for (var i = 0; i < elts_cnt; i++) {
			elts[i].checked = do_check;
		}
	} else {
		elts.checked = do_check;
     }
    return true;
}


function setRadiobuttons(the_form, value) {
	var elts      =  document.getElementsByTagName("input");
	var elts_cnt  = (typeof(elts.length) != "undefined") ? elts.length : 0;

	if (elts_cnt) {
		for (var i = 0; i < elts_cnt; i++) {
			if (elts[i].value==value) {
				elts[i].checked = true;
			}
		}
	} else {
		elts.checked = do_check;
     }
    return true;
}


/**
 * Send Spamreport ping for a comment.
 */
function openReportComment(session, entry, number, link) {
	window.open("includes/spamping.php?type=comment&session=" +
			session + "&entry=" + entry + "&n=" + number ,
			"spamping", "toolbar=no,location=no,resizable=yes,scrollbars=yes,width=460,height=230");

	// redirect after half a second. ought to be enough to ensure the popup is loaded first.
	setTimeout('self.location="'+link+'"', 500);
}


/**
 * Send Spamreport ping for a trackback.
 */
function openReportTrackback(session, entry, number, link) {
	window.open("includes/spamping.php?type=trackback&session=" +
			session + "&entry=" + entry + "&n=" + number ,
			"spamping", "toolbar=no,location=no,resizable=yes,scrollbars=yes,width=460,height=230");

	// redirect after half a second. ought to be enough to ensure the popup is loaded first.
	setTimeout('self.location="'+link+'"', 500);

}
