$(function () {
    var value1 = window.location.search.split('=')[0];
    var value2 = window.location.search.split('=')[1];
    if (value1 == '') {
        window.location.href = '../index.html';
    } else if (value1 == '?id') {
        $.ajax({
            url: 'http://localhost:8080/api/v1/index/search',
            data: {
                type: value2
            },
            success: function (backData) {
                // console.log(backData); 
                if (backData.data.data.length > 0) {
                    $('.list_title>h3').text(backData.data.data[0].category);
                    var resHtml = template('list_temp', backData);
                    $('div.left_con.setfr').html('<div class="list_title"><h3>' + backData.data.data[0].category + '</h3></div>' + resHtml);
                } else {
                    $('div.left_con.setfr').html('<div class="list_title"><h3>没有数据~~</h3></div>');
                }
            }
        });

    } else {
        var value2 = decodeURI(value2);
        $.ajax({
            url: 'http://localhost:8080/api/v1/index/search',
            data: {
                key: value2
            },
            success: function (backData) {
               if (backData.code == 200) {
                var resHtml = template('list_temp', backData);
                $('div.left_con.setfr').html('<div class="list_title"><h3>搜索词：'+ value2+ '</h3></div>' + resHtml);
               };
            }
        });
    }
});