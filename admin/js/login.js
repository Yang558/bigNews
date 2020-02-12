$(function () {
    $('.input_sub').on('click', function (e) {
        e.preventDefault();
        let userName = $('.input_txt').val().trim();
        let passWord = $('.input_pass').val().trim();

        if (userName == '' || passWord == '') {
            // alert('账号密码不能为空~~');
            // $('#myModal').modal('账号密码不能为空！！')
            $('.modal-body').text('账号密码不能为空~~')
            $('#myModal').modal();
            return;
        };
        $.ajax({
            type: 'post',
            url: BigNew.user_login,
            data: {
                username: userName,
                password: passWord
            },
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    $('.modal-body').text(backData.msg)
                    $('#myModal').modal();
                    $('#myModal').on('hidden.bs.modal', function (e) {
                        localStorage.setItem('token',backData.token);
                        window.location.href = './index.html'
                      })
                    
                } else {
                    $('.modal-body').text(backData.msg)
                    $('#myModal').modal();
                }
            }
        })


    })
})