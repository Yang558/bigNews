$(function(){
    $.ajax({
        type:'get',
        url:BigNew.user_detail,
        success:function(backData) {
            if (backData.code == 200) {
                for (var key in backData.data) {
                    $('input.'+key).val(backData.data[key]);
                };
                $('img.user_pic').attr('src',backData.data.userPic)
            }
        }
    })
})