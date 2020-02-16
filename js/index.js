$(function () {
    // 最新资讯ajax
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/index/latest',
        success: function (backData) {
            if (backData.code == 200) {
                var resHtml = template('latest_temp', backData);
                $('.common_news').html(resHtml);
            }
        }
    });

    // 热点图新闻
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/index/hotpic',
        success: function (backData) {
            if (backData.code == 200) {
                var resHtml = template('hotpic_temp', backData);
                $('.focus_list').html(resHtml);
            }
        }
    });

    // 一周热门排行
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/index/rank',
        success: function (backData) {
            if (backData.code == 200) {
                for (var i = 0; i < backData.data.length; i++) {
                    $('.hotrank_list>li').eq(i).children('a').text(backData.data[i].title)
                    $('.hotrank_list>li').eq(i).children('a').attr('href', './article.html?id=' + backData.data[i].id)
                };
            }
        }
    });

    // 最新评论
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/index/latest_comment',
        success: function (backData) {
            if (backData.code == 200) {
                var resHtml = template('comment_temp', backData);
                $('.comment_list').html(resHtml)
            }
        }
    })

    // 焦点关注
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/index/attention',
        success: function (backData) {
            if (backData.code == 200) {
                var resHtml = template('attention_temp', backData);
                $('.guanzhu_list').html(resHtml);
            }
        }
    })
})