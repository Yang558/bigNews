$(function () {
    $.ajax({
        type: 'get',
        url: BigNew.user_detail,
        success: function (backData) {
            if (backData.code == 200) {
                for (var key in backData.data) {
                    $('input.' + key).val(backData.data[key]);
                };
                $('img.user_pic').attr('src', backData.data.userPic)
            }
        }
    });


    $('#exampleInputFile').on('change', function () {
        var file1 = this.files[0];
        var url = URL.createObjectURL(file1);
        $('img.user_pic').attr('src', url);
    });

    $('.btn-edit').on('click', function (e) {
        e.preventDefault();
        var form1 = document.querySelector('form');
        var fd = new FormData(form1);
        $.ajax({
            type: 'post',
            url: BigNew.user_edit,
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                // console.log(backData);
                if (backData.code == 200) {
                    alert('修改成功~~');

                    parent.window.location.reload();
                    // $.ajax({
                    //     type: 'get',
                    //     url: window.BigNew.user_info,
                    //     success: function (backData) {
                    //         //在子页面获取父页面上的标签,前面加上parent. 
                    //         //显示个人信息了...
                    //         parent.$('.user_info>img').attr('src', backData.data.userPic);
                    //         parent.$('.user_info>span>i').text(backData.data.nickname);
                    //         parent.$('.user_center_link>img').attr('src', backData.data.userPic);
                    //     }
                    // });
                }

            }
        })
    })


})

