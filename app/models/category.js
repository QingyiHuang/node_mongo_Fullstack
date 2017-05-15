var mongoose = require('mongoose');
//引入模式schema里面的Schema导出模块
var CategorySchema = require('../schemas/category.js');
//利用mongoose封装的函数传入模式编译成模型
var Category = mongoose.model('Category',CategorySchema);
//将模型构造函数导出
module.exports = Category;