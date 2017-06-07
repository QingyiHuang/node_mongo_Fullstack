var Index = require('../app/controllers/index.js')
var User = require('../app/controllers/user.js')
var Passage = require('../app/controllers/passage.js')
var Comment = require('../app/controllers/comment.js')
var Category = require('../app/controllers/category.js')
var AboutUs = require('../app/controllers/aboutus.js')
var NoFound = require('../app/controllers/NoFound.js')

module.exports = function(app){
	//登录信息处理
	app.use(function(req,res,next){
		//拿到session里的user
		var _user = req.session.user;
		app.locals.user = _user;
		return next();
	})

/*********路由************/
	//index 主页
	app.get('/',Index.index)

	//user路由
	app.post('/user/signup',User.signup)
	app.post('/user/signin',User.signin)
	app.get('/signin',User.showSignin)
	app.get('/signup',User.showSignup)
	app.get('/user/logout',User.logout)
	app.get('/admin/user/list',User.signinRequired,User.adminRequired,User.list)//要访问userlist要先验证登陆然后要验证权限
	app.delete('/admin/user/list',User.signinRequired,User.adminRequired,User.userDel);

	//内容主题路由
	app.get('/passage/:id',Passage.detail)
	app.get('/admin/passage/new',User.signinRequired,User.adminRequired,Passage.new)//后台录入
	app.get('/admin/passage/update/:id',User.signinRequired,User.adminRequired,Passage.update)//admin update 后台更新页面 匹配到：ID
	app.post('/admin/passage',User.signinRequired,User.adminRequired,Passage.save)//adminpost---拿到后台录入页post过来的数据
	app.get('/admin/passage/list',User.signinRequired,User.adminRequired,Passage.list)
	app.delete('/admin/passage/list',User.signinRequired,User.adminRequired,Passage.del);

	//评论和回复路由
	app.post('/user/comment',User.signinRequired,Comment.save)

	//分类路由
	app.get('/admin/category/new', User.signinRequired, User.adminRequired, Category.new)
	app.post('/admin/category', User.signinRequired, User.adminRequired, Category.save)
	app.get('/admin/category/list', User.signinRequired, User.adminRequired, Category.list)

	//分类详情路由
	app.get('/results',Index.results)

	//查询路由
	app.get('/search',Index.search)

	//aboutUs请求
	app.get('/aboutUs',AboutUs.aboutus)

	//404请求
	app.get('*',NoFound.noFound)
}