$(function () {
    // 调用函数获取用户基本信息
    getUserInfo()

    var layer = layui.layer
    // 实现退出功能
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/login.html'
            // 关闭 confirm 询问框
            layer.close(index);
        })
    })
})

// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                // 请求失败
                return layui.layer.msg('用户信息获取失败！')
            }
            // 调用 renderAvatar 函数渲染用户的头像
            renderAvatar(res.data)
        },
        // complete: function (res) {
        //     console.log('执行了complete回调函数');
        //     console.log(res.responseJSON);
        //     在complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //          1. 强制清空token
        //         localStorage.removeItem('token')
        //          2. 强制跳转到登录页
        //         location.href = '/login.html'
        //     }
        // }
    })
}

// 渲染用户的头像
function renderAvatar(user) {
    // 1.获取用户昵称
    var name = user.nickname || user.username
    // 2. 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文字头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
    
}