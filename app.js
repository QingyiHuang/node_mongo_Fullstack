//加载node的express框架,path静态文件引入
//表单初始化body-parser
//引入mongoose工具
//引入我们建立的mongoDB数据模型passage和user 一个是存储网站的基本数据模型一个是用户的注册登录
//(我们定义的PassageSchema通过mongoose编译生成的数据mongoDB数据模型passage)
var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')//浏览器缓存中间件
var session = require('express-session')//客户端会在cookie里面保存一个session的id
var mongoose = require('mongoose')
var mongoStore = require('connect-mongo')(session)//reset
var logger = require('morgan')
var port = process.env.PORT || 3000//设置端口3000
var app = express();//启动web服务器
//用mongoose连接本地mongoDB，完成数据库连接,数据库名为shumei
//mongodb 默认端口为27017
//消除警报
mongoose.Promise = global.Promise
var dbUrl = 'mongodb://localhost:27017/shumei';
mongoose.connect(dbUrl)
/*  mongoose 简要知识点补充
* mongoose模块构建在mongodb之上，提供了Schema[模式]、Model[模型]和Document[文档]对象，用起来更为方便。
* Schema对象定义文档的结构（类似表结构），可以定义字段和类型、唯一性、索引和验证。
* Model对象表示集合中的所有文档。
* Document对象作为集合中的单个文档的表示。
* mongoose还有Query和Aggregate对象，Query实现查询，Aggregate实现聚合。
* */
console.log('MongoDB 连接成功！')

app.locals.moment = require('moment'); // 载入moment模块，格式化日期

app.set('views','./app/views/pages')//设置视图根目录
app.set('view engine','jade')//设置默认模板引擎
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended:true}))
app.use(cookieParser())
app.use(session({
	secret:'shumei',
	store: new mongoStore({//-引入的connect-mongo 用mongodb来实现用户持久会话
		url:dbUrl,
		collection:'sessions'
	}),
	resave:false,
	saveUninitialized:true
}))

//拿到env开发环境
if('development' === app.get('env')){
	app.set('showStackError',true)//打印错误信息
	app.use(logger(':method :url :status'))
	app.locals.pretty = true; //让网页源码缩进
	mongoose.set('debug',true)
}

/*********传入编写路由部分**********/
require('./config/routes')(app)//在require的routes里传入express()

app.listen(port)//监听3000这个端口
console.log('3000这个端口启动')
