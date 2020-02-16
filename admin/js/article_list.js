// $(function () {
//     $.ajax({
//         type: 'get',
//         url: BigNew.category_list,
//         success: function (backData) {
//             // console.log(backData);
//             if (backData.code == 200) {
//                 var resHtml = template('category_temp', backData);
//                 $('#selCategory').html(resHtml);


//             }
//         }
//     });








//     $.ajax({
//         type: 'get',
//         url: BigNew.article_query,
//         data: {
//             type: $('#selCategory').val(),
//             state: $('#selStatus').val(),
//             page: 1,
//             perpage: 6
//         },
//         success: function (backData) {
//             if (backData.code == 200) {
//                 var resHtml = template('articleList_temp', backData);
//                 $('tbody').html(resHtml);


//                 $('#pagination-demo').twbsPagination({
//                     totalPages: backData.data.totalPages,
//                     visiblePages: 7,
//                     first: '首页',
//                     prev: '上一页',
//                     next: '下一页',
//                     last: '尾页',
//                     onPageClick: function (event, page) {
//                         $('#page-content').text('Page ' + page);
//                     }
//                 });

//                 $('#pagination-demo').twbsPagination('changeTotalPages', backData.data.totalPages, 1)
//             }
//         }
//     });

//     $('#btnSearch').on('click', function (e) {
//         e.preventDefault();
//         $.ajax({
//             type: 'get',
//             url: BigNew.article_query,
//             data: {
//                 type: $('#selCategory').val(),
//                 state: $('#selStatus').val(),
//                 page: 1,
//                 perpage: 6
//             },
//             success: function (backData) {
//                 if (backData.code == 200) {
//                     $('#pagination-demo').twbsPagination('changeTotalPages', backData.data.totalPages, 1)
//                     var resHtml = template('articleList_temp', backData);
//                     $('tbody').html(resHtml);
//                     console.log(backData);
//                 }
//             }
//         })
//     })
// })


$(function () {

    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (backData) {
            // console.log(backData);
            if (backData.code == 200) {
                var resHtml = template('category_temp', backData);
                $('#selCategory').html(resHtml);


            }
        }
    });


    var myPage = 1;
    function getData(myPage, callback) {
        $.ajax({
            type: 'get',
            // url:BigNew.category_list,
            url: BigNew.article_query,
            data: {
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: myPage,
                perpage: 2

            },
            success: function (backData) {

                console.log(backData);

                if (backData.code == 200) {
                    var resHtml = template('articleList_temp', backData);
                    $('tbody').html(resHtml);

                    if (backData.data.totalPage != 0 && callback != null) {
                        callback(backData);
                        $('#pagination-demo').show();
                        $('#pagination-demo').next().hide();

                    } else if (backData.data.totalPage == 0) {
                        $('#pagination-demo').hide();
                        $('#pagination-demo').next().show();

                    };
                }
            }
        })
    }


    getData(1, function (backData) {
        $('#pagination-demo').twbsPagination({
            totalPages: backData.data.totalPage,
            visiblePages: 7,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function (event, page) {
                myPage = page;
                getData(page, null);
            }
        })
    });

    $('#btnSearch').on('click', function (e) {
        e.preventDefault();
        getData(1, function (backData) {
            $('#pagination-demo').twbsPagination('changeTotalPages', backData.data.totalPage, 1);
        })
    });

    $('tbody').on('click', '.delete', function () {
        if (confirm('你确定要删除吗？')) {
            var articleId = $(this).attr('data-id');
            $.ajax({
                type: 'post',
                url: BigNew.article_delete,
                data: {
                    id: articleId
                },
                success: function (backData) {
                    if (backData.code == 204) {
                        getData(myPage, function (backData) {
                            // console.log(backData.data.totalPages);
                            // console.log(myPage);
                            
                            if (backData.data.totalPage == myPage || myPage == 1) {
                                $('#pagination-demo').twbsPagination('changeTotalPages', backData.data.totalPage, myPage);
                            } else {
                            
                                $('#pagination-demo').twbsPagination('changeTotalPages', backData.data.totalPage, myPage-1);
                            }
                        });
                        // getData(myPage,null);

                    }
                }
            })
        }
    })
})