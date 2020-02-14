$(function () {
    getData();
    function getData() {
        $.ajax({
            type: 'get',
            url: BigNew.category_list,
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    var resHtml = template("article_cate_temp", backData)
                    $('tbody').html(resHtml);
                }
            }
        });
    }



    $('#myModal').on('show.bs.modal', function (e) {
        // $('#xinzeng')
        if (e.relatedTarget == $('#xinzengfenlei')[0]) {
            $('#myModalLabel').text('新增分类');
            $('#btnAddOrEdit').text('新增').addClass('btn-primary').removeClass('btn-success');

        } else {
            $('#myModalLabel').text('编辑分类');
            $('#btnAddOrEdit').text('编辑').addClass('btn-success').removeClass('btn-primary');
            $('#recipient-name').val($(e.relatedTarget).parent().prev().prev().text().trim());
            $('#message-text').val($(e.relatedTarget).parent().prev().text().trim());
            $('#categoryId').val($(e.relatedTarget).attr('data-id'));
        }
    });

    $('#btnAddOrEdit').on('click', function () {
        if ($(this).hasClass('btn-primary')) {
            var catgoreName = $('#recipient-name').val().trim();
            var catgoreSlug = $('#message-text').val().trim();

          
            $.ajax({
                type: 'post',
                url: BigNew.category_add,
                data: {
                    name: catgoreName,
                    slug: catgoreSlug
                },
                success: function (backData) {
                    // alert('新增成功~~')
                    $('#myModal').modal('hide');
                    alert('新增成功~~')
                    getData();

                    $('#recipient-name').val('')
                    $('#message-text').val('')
                }
            })
        } else {
            // var id = $('#categoryId').val().trim();
            // var catgoreName = $('#recipient-name').val().trim();
            // var catgoreSlug = $('#message-text').val().trim();

            var data = $('#myModal form').serialize();

            $.ajax({
                type: 'post',
                url: BigNew.category_edit,
                // data: {
                //     id: id,
                //     name: catgoreName,
                //     slug: catgoreSlug
                // },
                data:data,
                success: function (backData) {
                    if (backData.code == 200) {
                        $('#myModal').modal('hide');
                        alert('编辑成功~~')
                        getData();
                        var catgoreName = $('#recipient-name').val('');
                        var catgoreSlug = $('#message-text').val('');
                    }
                }
            })
        }
    });

    $('.btn-cancel').on('click',function(){
        $('#myModal form')[0].reset();
    });
    
    $('tbody').on('click','.btn-danger',function(){
        if (confirm('确定要删除？')) {
            var categoryId =$(this).attr('data-id');
            $.ajax({
                type:'post',
                url:BigNew.category_delete,
                data:{
                    id:categoryId
                },
                success:function(backData){
                    if (backData.code == 204) {
                        getData();
                    }
                }
            })
        }
    })

})