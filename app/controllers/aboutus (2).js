var path = require('path')

exports.aboutus = function(req,res){
	res.sendFile(path.join(__dirname+'/../views/pages/aboutUs.html'));
}