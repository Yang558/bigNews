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


    // let xhr = new XMLHttpRequest();
    // xhr.open('get','http://localhost:8080/api/v1/admin/user/info');
    // xhr.setRequestHeader('Authorization',localStorage.getItem('token'));
    // xhr.onload = function(){
    //     console.log(xhr.response);

    // };
    // xhr.send();
})