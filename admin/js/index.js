$(function () {
    $.ajax({
        type: 'get',
        url: BigNew.user_info,
        // headers:{
        //     'Authorization':localStorage.getItem('token')
        // },
        success: function (backData) {
            // console.log(backData);
            $('.user_info>img').attr('src', backData.data.userPic)
            $('.user_center_link>img').attr('src', backData.data.userPic)
            $('.user_info>span').text(backData.data.nickname)
        }
    })

    $('.logout').on('click', function (e) {
        e.preventDefault();
        localStorage.removeItem('token');
        alert('退出成功~~')
        window.location.href = './login.html'
    })


    $('.menu>div.level01').on('click',function(){
        $(this).addClass('active').siblings('div').removeClass('active');

        if ($(this).index() == 1) {
            $('ul.level02').slideToggle();
            $(this).find('b').toggleClass('rotate0');

            $('ul.level02>li:eq(0)').trigger('click')
        }
    });


    $('ul.level02>li').on('click',function(){
        $(this).addClass('active').siblings('li').removeClass('active')
    })











    // let xhr = new XMLHttpRequest();
    // xhr.open('get','http://localhost:8080/api/v1/admin/user/info');
    // xhr.setRequestHeader('Authorization',localStorage.getItem('token'));
    // xhr.onload = function(){
    //     console.log(xhr.response);

    // };
    // xhr.send();
})