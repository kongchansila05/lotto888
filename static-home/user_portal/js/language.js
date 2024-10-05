// $(document).ready(function($) {

function csrfSafeMethod(method) {
    return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = $.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie("csrftoken");

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

$("#btnlanguage").on("click", function(e) {
    switch_language('kh');
});

function switch_language(code) {

    data = {
        'code': code
    }

    var settings = {
        async: true,
        crossDomain: true,
        url: "/switch_language/",
        method: "POST",
        processData: true,
        data: data
    };

    console.log(settings);

    $.ajax(settings)
        .done(function(response) {

            Cookies.set('language', code);

            location.reload();

        })
        .fail(function(response) {

            console.log("Response Data Message : ", response);

        })

}

// })