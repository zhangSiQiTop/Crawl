/*
 * 1. 写一个read模块，用来传入url地址，返回都区后的对象数组
 * 2. 把上面的对象数组保存到数据库中mongodb
 */
var read = require('./read').movie;
var write = require('./write').movie;
var async = require('async');
var debug = require('debug')('crawl:main');
var url = 'http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1';
var Movie = require('../model').Movie;
async.waterfall([
    // 在保存之前全部清空数据
    function (callback) {
        Movie.remove({}, callback)
    },
    function (data,callback) {
        read(url, callback)
    },
    function (movies, callback) {
        write(movies, callback)
    }
], function (err, result) {
    debug('全部任务执行完毕');

});