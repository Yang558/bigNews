$(function(){
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (backData) {
            // console.log(backData);
            if (backData.code == 200) {
             var resHtml =  template('category_temp',backData);
             $('#selCategory').html(resHtml);
            }
        }
    });
    $.ajax({
        type:'get',
        url:BigNew.article_query,
        data:{
            type:$('#selCategory').val(),
            state:$('#selStatus').val(),
            page:1,
            perpage:6
        },
        success:function(backData){
            if(backData.code == 200) {
               var resHtml =  template('articleList_temp',backData);
               $('tbody').html(resHtml);
            }
        }
    })
})