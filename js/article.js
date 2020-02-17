$(function () {
    var articleId = window.location.search.split('=')[1];
    // 文章内容
    if (articleId == undefined) {
        window.location.href = '../index.html'
    } else {
        $.ajax({
            type: 'get',
            url: 'http://localhost:8080/api/v1/index/article',
            data: {
                id: articleId
            },
            success: function (backData) {
                if (backData.code == 200) {
                    $('.breadcrumb').children('a').eq(1).text(backData.data.category)
                    $('.article_title').text(backData.data.title);
                    $('.article_con').html(backData.data.content);

                    if (backData.data.prev != null) {
                        $('.article_links>a').eq(0).text(backData.data.prev.title);
                        $('.article_links>a').eq(0).attr('href', '../article.html?id=' + backData.data.prev.id);
                    } else {
                        $('.article_links>a').eq(0).text('没有上一篇~~');
                    }

                    if (backData.data.next != null) {
                        $('.article_links>a').eq(1).text(backData.data.prev.title);
                        $('.article_links>a').eq(1).attr('href', '../article.html?id=' + backData.data.prev.id);
                    } else {
                        $('.article_links>a').eq(1).text('没有下一篇~~');
                    }

                    var resHtml = template('info', backData);
                    $('.article_info').html(resHtml);
                }
            }
        })
    };

    // 文章评论
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/index/get_comment',
        data: {
            articleId: articleId
        },
        success: function (backData) {
            var resHtml = template('comment_temp', backData);
            $('.comment_list_con').html(resHtml);

        }
    });

    // 评论发表按钮
    $('.comment_sub').on('click', function (e) {
        e.preventDefault();
        var comment_name = $('.comment_name').val().trim();
        var comment_input = $('.comment_input').val().trim();
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/index/post_comment',
            data: {
                author: comment_name,
                content: comment_input,
                articleId: articleId,
            },
            success: function (backData) {
                alert('发表成功~~');
            }
        })
    });


})