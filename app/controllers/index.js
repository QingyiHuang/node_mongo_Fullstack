var passage = require('../models/passage')
var Category = require('../models/category')
//index 
exports.index = function(req,res){

	Category
		.find({})//所有分类从数据库get
		.populate({path:'passages',options:{limit:6}})
		.exec(function(err,categories){
			//如果发生异常，打印出来
			if(err){
				console.log(err)
			}
			//渲染index 传入查询到的passages赋值给index的模板
			res.render('index',{
				title:'慕课网',
				categories:categories
		})
	})
}