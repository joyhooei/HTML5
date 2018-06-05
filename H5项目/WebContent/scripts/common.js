//------------------------get location url param
function get_query_string(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return  unescape(r[2]);
	return null;
}
function get_query_string_zh(name)
{
	var LocString=String(window.document.location.href);
	var rs = new RegExp("(^|)"+name+"=([^/&]*)(/&|$)","gi").exec(LocString), tmp;
	if(tmp=rs){
		return tmp[2];
	}
	return "";
}
