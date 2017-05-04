var passage = require('../models/passage')

//index 
exports.index = function(req,res){
		//调用模型，回调中拿到我们的数据passages
	passage.fetch(function(err,passages){
		//如果发生异常，打印出来
		if(err){
			console.log(err)
		}
		//渲染index 传入查询到的passages赋值给index的模板
		res.render('index',{
			title:'黄卿怡的BLOG',
			passages:passages
		})
	})
}