$(function () {

   var myPage = 1;
    function getData(mypage,callBack) {
        $.ajax({
            type: 'get',
            url: BigNew.comment_list,
            data: {
                page: mypage,
                perpage: 3
            },
            success: function (backData) {
                if (backData.code == 200) {
                    var resHtml = template('comment_temp', backData);
                    $('tbody').html(resHtml);

                    if (callBack != null && backData.data.data.length !=0) {
                        callBack(backData);
                    } else if (backData.data.data.length == 0 && backData.data.totalPage == myPage-1) {
                        myPage -=1;
                        $('.pagination').twbsPagination('changeTotalPages',backData.data.totalPage,myPage)
                    }
                }
            }
        });
    };

    getData(1,function(backData){
        $('#pagination').twbsPagination({
            totalPages:backData.data.totalPage,
            visiblePages: 5,
            first:'首页',
            prev:'上一页',
            next:'下一页',
            last:'尾页',
            onPageClick: function(event,page){
                myPage = page;
                getData(page,null)
            }
        })
    });

    // 批准
    $('tbody').on('click', '.btn-info', function () {
        var commentId = $(this).attr('data-id');
        $.ajax({
            type: 'post',
            url: BigNew.comment_pass,
            data: {
                id: commentId
            },
            success: function (backData) {
                console.log(backData);

                if (backData.code == 200) {
                    alert('已批准');
                    getData(myPage,null);
                }
            }
        })
    });

    // 拒绝
    $('tbody').on('click', '.btn-warning', function () {
        var commentId = $(this).attr('data-id');
        $.ajax({
            type: 'post',
            url: BigNew.comment_reject,
            data: {
                id: commentId
            },
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    alert('已拒绝~~');
                    getData(myPage,null);
                }
            }
        })
    });

    // 删除
    $('tbody').on('click', '.btn-danger', function () {
        var commentId = $(this).attr('data-id');
        $.ajax({
            type: 'post',
            url: BigNew.comment_delete,
            data: {
                id: commentId
            },
            success: function (backData) {
                console.log(backData);
                if (confirm('你确定要删除吗?')) {
                    alert('已删除~~');
                    getData(myPage,function(backData){
                        $('.pagination').twbsPagination('changeTotalPages',backData.data.totalPage,myPage)
                    });
                }
            }
        })
    });


})