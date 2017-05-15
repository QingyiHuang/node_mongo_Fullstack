// 处理删除数据的逻辑
$(function () {
    //拿到文章删除按钮
    $('.delPassage').click(function (e) {
        var target = $(e.target);//this.target当前点击的按钮
        var id = target.data('id');
        var tr = $('.item-id-' + id);//拿到list页面中对应那行

        $.ajax({
            type: 'DELETE', // 异步请求类型：删除
            url: '/admin/passage/list?id=' + id,
        })
        //删除以后服务器返回一个状态台
        .done(function (results) {
            if (results.success === 1) {
                if (tr.length > 0) {//如果这行有东西就remove掉
                    tr.remove();
                }
            }
        });
    });
    //拿到用户删除按钮
    $('.delUser').click(function (e) {
        var target = $(e.target);//this.target当前点击的按钮
        var id = target.data('id');
        var tr = $('.item-id-' + id);//拿到list页面中对应那行

        $.ajax({
            type: 'DELETE', // 异步请求类型：删除
            url: '/admin/user/list?id=' + id,
        })
        //删除以后服务器返回一个状态台
        .done(function (results) {
            if (results.success === 1) {
                if (tr.length > 0) {//如果这行有东西就remove掉
                    tr.remove();
                }
            }
        });
    });
});