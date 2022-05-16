$(function () {
    var form = layui.form

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $('[name=oldpwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        repwd: function (value) {
            if (value !== $('[name=newpwd]').val()) {
                return '两次密码不一致'
            }
        }

    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        console.log(1);
        $.ajax({
            method: 'PATCH',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    console.log(3);
                    return layui.layer.msg('更新密码失败')
                }
                layui.layer.msg('更新密码成功')
                console.log(2);
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})