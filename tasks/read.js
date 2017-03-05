// 传入url地址返回对象数组
var request = require('request');
var iconv = require('iconv-lite');
var debug = require('debug')('crawl:read');
var cheerio = require('cheerio');
exports.movie = function (url, callback) {
    // 请求网页内容
    request({url, encoding: null}, function (err, res, body) {
        // 实现一个转码，把gbk编码的buffer转成utf8格式的字符串
        body = iconv.decode(body, 'gbk');
        // 把此响应体字符转换成$对象
        var $ = cheerio.load(body);
        var movies = [];
        $('.keyword .list-title').each(function () {
            // 把当前对象转成jQuery对象
            var $me = $(this);
            var movie = {
                name: $me.text(),
                url: $me.attr('href')
            };
            debug(`读到电影：${movie.name}`);
            movies.push(movie);
        });
        callback(err,movies);
    })
};
/*
exports.movie('http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1', function (err, movies) {
    console.log(movies)
});*/
