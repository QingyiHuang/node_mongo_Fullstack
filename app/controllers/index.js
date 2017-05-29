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
exports.results = function(req,res){
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

//查询
exports.search = function(req,res){
  var q = req.query.q
  var page = parseInt(req.query.p, 10) || 0
  var count = 2
  var index = page * count

    passage
      .find({title: new RegExp(q + '.*', 'i')})
      .exec(function(err, passages) {
        if (err) {
          console.log(err)
        }
        var search = passages.slice(index, index + count)

        res.render('search', {
          title: '查询页面',
          keyword: q,
          currentPage: (page + 1),
          query: 'q=' + q,
          totalPage: Math.ceil(passages.length / count),
          passages: search
        })
      })
}
