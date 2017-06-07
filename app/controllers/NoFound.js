var path = require('path')

exports.noFound = function(req,res){
	res.sendFile(path.join(__dirname+'/../views/pages/404.html'));
}