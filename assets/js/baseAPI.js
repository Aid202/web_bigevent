// 注意： 每次调用 $.GET 或 $.post 或 $.ajax 时候，
// 会先调用 ajaxPrefilter 函数
// 在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) { 
    console.log(options.url);

    options.url = 'http://www.liulongbin.top:3007' + options.url
    
    console.log(options.url);
})