var User = require('../models/user.js')

//signup
exports.showSignup = function(req,res){
	res.render('signup',{
		title:'用户注册',
	})
}
//signin
exports.showSignin = function(req,res){
	res.render('signin',{
		title:'用户登录',
	})
}

//signup
exports.signup = function(req,res){
	//req.body 拿到表单里的user对象，还可以用 req.param('user')
	var _user = req.body.user;
	//mongodb 不允许name值重复
	User.find({name:_user.name},function(err,user){
		if(err){
			console.log(err)
		}
		if(user.name){ 
			return res.redirect('/signin')
		}else{
			var user = new User(_user)
			user.save(function(err,user){
				if(err){
					console.log(err)
				}
				//完成逻辑后重定向
				res.redirect('/')
			})
		}
	})
}

//signin page
exports.signin = function(req,res){
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;

	User.findOne({name:name},function(err,user){
		if(err){
			console.log(err)
		}
		if(!user){
			return ('用户名或者密码错误')
			return res.redirect('/signup')
		}
//这个密码对比逻辑我们在schema里面
		user.comparePassword(password,function(err,isMatch){
			if(err){
				console.log(err)
			}
			if(isMatch){
				//将用户登录状态加载到内存
				//session 服务器客户端会话
				req.session.user = user;
				return res.redirect('/')
			}
			else{
				return res.redirect('/signin')
			}
		})
	})
}

//logout登出
exports.logout = function(req,res){
	delete req.session.user
	//delete app.locals.user
	res.redirect('/')
}

//userlist page
exports.list = function(req,res){
	User.fetch(function(err,users){
		if(err){
			console.log(err)
		}
		res.render('userlist',{
			title:'用户列表页面',
			users:users
		})
	})
}

//midware for user
exports.signinRequired = function(req,res,next){
	var user = req.session.user

	if(!user){
		return res.redirect('/signin')
	}
	next()
}

exports.adminRequired = function(req,res,next){
	var user = req.session.user

	if(user.role<=10){
		return res.redirect('/signin')
	}
	next()
}
//user del
exports.userDel = function (req, res) {
	   var id = req.query.id;//拿到请求id
	   if (id) {//存在
	       user.remove({_id: id}, function (err, user) {
	           if (err) {
	               res.json({success: 0});
	           } else {
	               res.json({success: 1});
	           }
	       });
	   }
}