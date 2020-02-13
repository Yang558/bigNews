$(function(){
    $.ajax({
        type:'get',
        url:BigNew.category_list,
        success:function(backData) {
            console.log(backData);
            if(backData.code == 200 ) {
             var resHtml =   template("article_cate_temp",backData)
                $('tbody').html(resHtml);
            }
        }
    })
})