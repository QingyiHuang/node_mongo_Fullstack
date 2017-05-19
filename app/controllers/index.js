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
				categories:categories
		})
	})
}

//详情分类
exports.search = function(req,res){
	var catId = req.query.category
	Category
		.find({_id:catId})//分类从数据库get
		.populate({path:'passages'})
		.exec(function(err,categories){
			//如果发生异常，打印出来
			if(err){
				console.log(err)
			}
			//渲染index 传入查询到的分类赋值给index的模板
			res.render('results',{
				title:'分类详情',
				category:categories[0]
		})
	})
}