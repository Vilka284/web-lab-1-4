function user_in_room(is_in_room){

    var code = window.location.href.split('#')[0].split('/');
    code = code[code.length - 1];
    $.ajax({
            method: "POST",
            url: '/user_in_room',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({
                'is_in_room': is_in_room,
                'id_user': localStorage.getItem('id_user'),
                'code': code,
            }),
            dataType: "json",
            headers: {"auth_token": localStorage.getItem('auth_token')},
            success: function (data) {
                console.log(data);
            },
            statusCode: {
                400: function (data) {
                    console.log(data);
                }
            },
            error: function (err) {
                console.log(err);
            }
    });
}

document.onunload = function a() {
    user_in_room(0);
};

document.onload = function b() {
    user_in_room(1);
};