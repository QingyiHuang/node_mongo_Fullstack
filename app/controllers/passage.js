var passage = require('../models/passage.js')
var Comment = require('../models/comment.js')
var Category = require('../models/category.js')
var _underscore = require('underscore')
var path = require('path')

	//detail page
exports.detail = function (req,res) {
	//匹配到_id的值 通过req.params拿到id  (params是对body query 路由的三种方式的封装)
	var id = req.params.id
	//通过这个id来查询，这个方法在schema里面已经定义好
	passage.findById(id,function(err,passage){
		//与视频相关的评论也拿到
		Comment
			//找到评论文章
			.find({passage:id})
			//populate拿到关联的user name
			.populate('from','name')
			.populate('reply.from reply.to','name')
			.exec(function(err,comments){
				console.log(comments)
				res.render('detail',{
					title:passage.title,
					passage:passage,
					comments:comments
				})
			})
	})
}

	//admin new page 后台录入页面
exports.new = function(req, res) {
  Category.find({}, function(err, categories) {
    res.render('admin', {
      title: '后台录入页',
      categories: categories,
      passage: {}
    })
  })
}

	//admin update 后台更新页面 匹配到：ID
exports.update = function(req,res){
	var id = req.params.id;

  if(id){
    passage.findById(id,function(err,passage){
      Category.find({},function(err,categories){
        res.render('admin',{
          title:"后台更新页面",
          passage:passage,
          categories:categories
        })
      })
    })
  }
	
}


	//adminpost---拿到后台录入页post过来的数据
exports.save = function(req, res) {
  var id = req.body.passage._id
  var passageObj = req.body.passage
  var _passage

  if (req.poster) {
    passageObj.poster = req.poster
  }

  if (id) {
    passage.findById(id, function(err, passage) {
      if (err) {
        console.log(err)
      }

      _passage = _underscore.extend(passage, passageObj)
      _passage.save(function(err, passage) {
        if (err) {
          console.log(err)
        }

        res.redirect('/passage/' + passage._id)
      })
    })
  }
  else {
    _passage = new passage(passageObj)

    var categoryId = passageObj.category
    var categoryName = passageObj.categoryName

    _passage.save(function(err, passage) {
      if (err) {
        console.log(err)
      }
      if (categoryId) {
        Category.findById(categoryId, function(err, category) {
          category.passages.push(passage._id)

          category.save(function(err, category) {
            res.redirect('/passage/' + passage._id)
          })
        })
      }
      else if (categoryName) {
        var category = new Category({
          name: categoryName,
          passages: [passage._id]
        })

        category.save(function(err, category) {
          passage.category = category._id
          passage.save(function(err, passage) {
            res.redirect('/passage/' + passage._id)
          })
        })
      }
    })
  }
}

	//list页面就是将数据库里的数据呈现出来，直接fetch

exports.list = function(req, res) {
  passage.find({})
    .populate('category', 'name')
    .exec(function(err, passages) {
      if (err) {
        console.log(err)
      }

      res.render('list', {
        title: '列表页',
        passages: passages
      })
    })
}
	//delete 请求的路由
exports.del = function (req, res) {
	   var id = req.query.id;//拿到请求id
	   if (id) {//存在
	       passage.remove({_id: id}, function (err, passage) {
	           if (err) {
	               console.log(err);
	           } else {
	               res.json({success: 1});
	           }
	       });
	   }
}
