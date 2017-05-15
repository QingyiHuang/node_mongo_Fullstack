$(function() {
  $('.comment').click(function(e) {
    var target = $(this)
    var toId = target.data('tid')
    var commentId = target.data('cid')

    if ($('#toId').length > 0) {
      $('#toId').val(toId)
    }
    else {
      $('<input>').attr({
        type: 'hidden',
        id: 'toId',
        name: 'comment[tid]',
        value: toId
      }).appendTo('#commentForm')
    }

    if ($('#commentId').length > 0) {
      $('#commentId').val(commentId)
    }
    else {
      $('<input>').attr({
        type: 'hidden',
        id: 'commentId',
        name: 'comment[cid]',
        value: commentId
      }).appendTo('#commentForm')
    }
  })
  //-点击回复改变样式
  var replyDom = document.getElementsByClassName('replyComment');
  var i;
  for (i = 0;i < replyDom.length; i++){
    replyDom[i].onclick = function(e){
      var replyButton = document.getElementsByClassName('replyButton')[0];
      replyButton.innerHTML='提交回复内容';
    }
  }


})
