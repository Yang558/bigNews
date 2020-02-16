$(function () {
    // 日期插件
    jeDate("#testico", {
        format: "YYYY-MM-DD",
        isTime: false,
        isinitVal: true,
        zIndex: 20999, //弹出层的层级高度
        minDate: "2014-09-19 00:00:00",
    });

    // 富文本编辑器
    var E = window.wangEditor;
    var editor = new E('#editor');
    editor.create();

    // 头像预览
    $('#inputCover').on('change', function () {
        var file1 = this.files[0];
        var url1 = URL.createObjectURL(file1);
        $('.article_cover').attr('src', url1)
    });

    // 文章类别
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (backData) {
            if (backData.code == 200) {
                var resHtml = template('article_cate_temp', backData);
                $('.category').html(resHtml);
            }
        }
    });

    // 发表按钮
    $('.btn-release').on('click', function (e) {
        e.preventDefault();
        var form1 = document.querySelector('form');
        var fd = new FormData(form1);
        fd.append('content', editor.txt.html());
        fd.append('state', '已发布');
        $.ajax({
            type: 'post',
            url: BigNew.article_publish,
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                if (backData.code == 200) {
                    alert('发表成功~~');
                    window.location.href = './article_list.html'
                }
            }

        })
    });

    // 草稿按钮
    $('.btn-draft').on('click', function (e) {
        e.preventDefault();
        var form1 = document.querySelector('form');
        var fd = new FormData(form1);
        fd.append('content', editor.txt.html());
        // fd.append('state', '已发布');
        $.ajax({
            type: 'post',
            url: BigNew.article_publish,
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                if (backData.code == 200) {
                    alert('发表成功~~');
                    window.location.href = './article_list.html'
                }
            }

        })
    })
});