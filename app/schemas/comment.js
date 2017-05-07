var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId//获取mongoose.Schema的主键

//设计评论模型
//评论人，评论时间，评论内容 ，对哪块内容进行的评论
var commentSchema = new Schema({
	//引用,存入passageid通过ref找到关联的模型(Populate方法)
	passage:{type:ObjectId,ref:'passage'},
	from:{type:ObjectId,ref:'user'},//评论来自
	reply:[{//互相回复就是多对多用数组，对当前评论下的各种小评论(回复给谁，谁回复的)
		from:{type:ObjectId,ref:'user'},
		to:{type:ObjectId,ref:'user'},//评论给
		content:String
	}],
	content:String,//评论类容
	// meta 更新或录入数据的时间记录
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
});

//表示每次存储数据之前都先调用这个方法
commentSchema.pre('save',function(next){
	//判断如果是新添加的
	if(this.isNew){
		//创建时间为当前时间
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		//更新时间为当前时间
		this.meta.updateAt = Date.now();
	}
	//将存储流程走下去，用next();
	next()
})

//静态方法，数据库经过模型编译后这方法才能使用
commentSchema.statics = {
	//fetch方法，取出数据库中所有数据
	fetch:function(cb) {
		return this
			.find({})
			//按更新事件排序
			.sort('meta.updateAt')
			//回调方法
			.exec(cb)	
	},
	//查询单条数据
	findById:function(id,cb){
		return this
			.findOne({_id:id})
			.exec(cb)
	}
}

module.exports = commentSchema