var Comment = require('../models/comment')
// comment
exports.save = function(req, res) {
  //拿到请求体comment
  var _comment = req.body.comment
  var passageId = _comment.passage

  if (_comment.cid) {//如果得到cid 则进入回复环节，拿到要评论的id
    Comment.findById(_comment.cid, function(err, comment) {
      var reply = {//放入具体回复内容
        from: _comment.from,//谁回复的
        to: _comment.tid,//回复给谁
        content: _comment.content//回复内容
      }

      comment.reply.push(reply)//push一条数据

      comment.save(function(err, comment) {//保存回复
        if (err) {
          console.log(err)
        }

        res.redirect('/passage/' + passageId)
      })
    })
  }
  else {
    //新建模型传入请求道德comment
    var comment = new Comment(_comment)
    //保存起来
    comment.save(function(err, comment) {
      if (err) {
        console.log(err)
      }
      //页面刷新掉返回原页面
      res.redirect('/passage/' + passageId)
    })
  }
}