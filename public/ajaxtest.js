function loadXMLDoc()
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{
		//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		// IE6, IE5 浏览器执行代码
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			document.getElementById("ts").innerHTML=xmlhttp.responseText;
		}
	}

	xmlhttp.open("GET","../app/controllers/user.js",true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	console.log(xmlhttp)
	xmlhttp.send();
}