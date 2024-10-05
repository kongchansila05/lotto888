$(document).ready(function($) {
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
$.ajax({
    url: '/getip.php', // Adjust the path to your server-side script
    type: 'GET',
    dataType: 'json',
    success: function (response) {
     Cookies.set("ipadd", response.ip);

    },
    error: function () {
        // console.log('Error fetching IP address');
    }
});

$('#spanLoginID').text(getCookie("username"));
$('.spanLoginID').text(getCookie("username"));
$('.spanLoginNAME').text(getCookie("userplay"));
$('.spanLoginDATE').text(getCookie("date"));
$('.spanLoginCURRENCY').text(getCookie("currency"));
$('.spanLoginIP').text(getCookie("ipadd"));
});