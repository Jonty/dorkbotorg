	function openW_size(url,name,w,h) {
		window.open(url,name,"width="+w+",height="+h+",scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no");
	}
	function openW_size_fix(url,name,w,h) {
		window.open(url,name,"width="+w+",height="+h+",scrollbars=no,resizable=no,toolbar=no,menubar=no,location=no,status=no");
	}
	function openW_size_fix_move(url,name,w,h,x,y) {
		_w = window.open(url,name,"width="+w+",height="+h+",scrollbars=no,resizable=yes,toolbar=no,menubar=no,location=no,status=no");
		_w.moveTo(x,y);
		_w.focus();
	}
function openW_full(url,name) {
	w = window.open(url,name,"scrollbars=no,resizable=yes,width=" + window.screen.width + ",height=" + window.screen.height);
	w.moveTo(0,0);
	w.focus();
}
