var passage = require('../models/passage.js')
var _underscore = require('underscore')

	//detail page
exports.detail = function (req,res) {
	//匹配到_id的值 通过req.params拿到id  (params是对body query 路由的三种方式的封装)
	var id = req.params.id
	//通过这个id来查询，这个方法在schema里面已经定义好
	passage.findById(id,function(err,passage){
		res.render('detail',{
			title:passage.title,
			passage:passage
		});
	});
}

	//admin page 后台录入页面
exports.new = function (req,res) {
	res.render('admin',{
		title:'后台录入页面',
		passage:{
			title:'',
			editor:'',
			summary:'',
			time:'',
			file:'',
			flash:'',
			poster:''
		}
	})
}

	//admin update 后台更新页面 匹配到：ID
exports.update = function(req,res){
	var id = req.params.id;
	if(id){//如果存在这通过moduls拿到数据传入给admin页面
		passage.findById(id,function(err,passage){
			res.render('admin',{
				title:'后台更新页面',
				passage:passage
			})
		})
	}
}


	//adminpost---拿到后台录入页post过来的数据
exports.save = function(req,res){
	//拿到_id
	var id = req.body.passage._id;
	//拿到对象
	var passageObj = req.body.passage;
	var _passage = null;
	//如果拿到的id与数据库中id匹配 即已经存在
	if(id !=='undefined'){
		//进行更新
		passage.findById(id,function(err,passage){
			if(err){
				console.log(err)
			}
	 		//用新对象里的字段替换老的字段
			_passage = _underscore.extend(passage,passageObj);
			_passage.save(function(err,passage){
				if(err){
					console.log(err);
				}
				//重定向
				res.redirect('/passage/'+passage._id);
			});
		});
	}else{ //添加新的数据
		_passage = new passage({
			title:passageObj.title,
			editor:passageObj.editor,
			summary:passageObj.summary,
			time:passageObj.time,
			file:passageObj.file,
			poster:passageObj.poster,
			flash:passageObj.flash
		})

		_passage.save(function(err,passage){
			if(err){
				console.log(err);
			}
			//重定向
			res.redirect('/passage/'+passage._id);
		});
	}
}

	//list页面就是将数据库里的数据呈现出来，直接fetch

exports.list = function (req,res) {

	passage.fetch(function(err,passages){
		if(err){
			console.log(err)
		}
		res.render('list',{
			title:'列表页',
			passages:passages
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
