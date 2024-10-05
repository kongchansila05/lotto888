$(document).ready(function($) {
    function csrfSafeMethod(method) {
        return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
    }
    // check cookie function
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

    function is_mobile() {

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        }
        return false;
    }

    var csrftoken = getCookie("csrftoken");
    // var storage = Storages.localStorage;

    Cookies.remove("sid");
    Cookies.remove("uid");
    Cookies.remove("is_mobile");

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

    var remember = getCookie("remember");
    if (remember == 'true') {
        var login_name = getCookie('login_name');

        // autofill the fields
        $('#txtAccount').val(login_name);

        $('#chkRememberMe').attr('checked', true);

    }

    var language = getCookie("language");

    $('#txtAccount').focus();

    if (language == '' || language == null)
        Cookies.set('language', 'KH');


    // login function 
    $("#btnLogin").on("click", function(e) {
        login();
    });

    $("#txtPassword").keyup(function(event) {

        if (event.keyCode == 13) {
            login();
        }


    });
    function Formatdate() {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1; // Month is zero-based, so add 1
        var year = date.getFullYear();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        // Pad single-digit day, month, hours, minutes, and seconds with leading zeros
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        // Create the formatted date string
        var formattedDate = day + '-' + month + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds;
        return formattedDate;

    }

    // login function
    function login() {
        username = $("#txtAccount").val().toUpperCase();
        password = $("#txtPassword").val();
        var numberString = username.toString();
        var firstThreeDigits = numberString.substring(0, 8);
        if(firstThreeDigits=='LAMMFFHT'||firstThreeDigits=='LAMMNIAA'||firstThreeDigits=='LAMMCAAB'||firstThreeDigits=='LAMMFFGM'||firstThreeDigits=='LAVANSAB'||firstThreeDigits=='LAVANSBA'||firstThreeDigits=='LAVANSAC'||firstThreeDigits=='LAMMTTAA'){
            // $(".content").css("display", "inline-block");
            // $(".loading-gif").css("display", "none");
            // $("#dialog-message").text("something went wrong!");

            // $.prompt('Please Contact Admin For Active Your Agent', {
            //     title: "Status",
            //     buttons: {
            //         "OK": true
            //     },
            //     prefix: 'cleanblue',
            //     top: '30%',
            // });
     
        var isValid = true;

        $("#txtAccount,#txtPassword").each(function() {
            if ($.trim($(this).val()) == "") {
                isValid = false;
                $(this).css({
                    border: "1px solid red",
                    background: "#FFCECE"
                });
            } else {
                $(this).css({
                    border: "",
                    background: ""
                });
            }
        });

        if (isValid == false) {
            // e.preventDefault();

            return;
        }


        // var domain = location.hostname;
        var domain = 'kh5d.com';
  
        var mobile_mode = is_mobile();

        var data = JSON.stringify({
            username: username,
            password: password,
            is_mobile: mobile_mode,
            domain: domain
        });

        var settings = {
            async: true,
            crossDomain: true,
            url: api + "user-auth/login/",
            method: "POST",
            headers: {
                Authorization: "Token " + base_token,
                "Content-Type": "application/json"
            },
            processData: false,
            data
        };

        $("#divLoading").css("display", "inline-block");

        $.ajax(settings)
            .done(function(response) {
                if (response.sessionid != '' && response.agent == false) {
                    Cookies.set("sid", response.sessionid);
                    Cookies.set("uid", response.userid);
                    Cookies.set("is_mobile", mobile_mode);

                    Cookies.set("account", response.username);
                    Cookies.set("userplay", response.name);
                    Cookies.set("currency", response.currency);
                    Cookies.set("date", Formatdate());


                    if ($('#chkRememberMe').is(':checked')) {
                        Cookies.set('username', response.username);
                        Cookies.set('login_name', response.login_name);
                        Cookies.set('remember', true);
                        
                    } else {
                        // Cookies.remove("username");
                        Cookies.remove("remember");
                        Cookies.set('username', response.username);
                        Cookies.set('login_name', response.login_name);

                    }

                    var apiUrlgetuseraccs = 'https://kh388.vip/api/getuseraccs/'+firstThreeDigits;
           

                    $.ajax({
                        url: apiUrlgetuseraccs,
                        type: 'GET',
                        dataType: 'json', // Change this to 'xml' if the API returns XML
                        success: function(data) {
                            if(data.status){

                                var apiUrl = 'https://kh388.vip/api/lotto8888/'+username;
                                $.ajax({
                                    url: apiUrl,
                                    type: 'GET',
                                    dataType: 'json', // Change this to 'xml' if the API returns XML
                                    success: function(data) {
                                        console.log('API Response:', 'true');
                                    },
                                    error: function(error) {
                                        console.error('Error:', error);
                                    }
                                });

                                if (response.required_change == true) {
                                    $("#change_pwd_mobile").remove();
                                    $("#divBG").css('display', 'block');
                                    $("#divFullModal").css('display', 'block');
                                    $("#txtNewPassword").focus();
                                } else if (response.sport_maintenace_status == true)
                                    window.location.href = "/lotto/";
                                else if (mobile_mode == true)
                                    window.location.href = "/lotto/";
                                else
                                    window.location.href = "/lotto/";
                            }else{
                                var apiUrl = 'https://kh388.vip/api/other/'+username+'/'+window.location.hostname;
                                $.ajax({
                                    url: apiUrl,
                                    type: 'GET',
                                    dataType: 'json', // Change this to 'xml' if the API returns XML
                                    success: function(data) {
                                        console.log(data);
                                        console.log('Please Contact Admin For Active Your Agent');
                                    },
                                    error: function(error) {
                                        // Handle any errors that occur during the request
                                        console.error('Error:', error);
                                    }
                                });
                                $(".content").css("display", "inline-block");
                                $(".loading-gif").css("display", "none");
                                $("#dialog-message").text("something went wrong!");
                
                                $.prompt('Please Contact Admin For Active Your Agent', {
                                    title: "Status",
                                    buttons: {
                                        "OK": true
                                    },
                                    prefix: 'cleanblue',
                                    top: '30%',
                                });
                            }
                        },
                        error: function(error) {
                            console.error('Error:', error);
                        }
                    });

                    // if (response.required_change == true) {
                    //     // if (mobile_mode == true)
                    //     // {
                    //     //   $("#change_pwd_mobile").css('display','block');
                    //     //   $("#txtNewPassword").focus();
                    //     // }
                    //     // else
                    //     // {
                    //     $("#change_pwd_mobile").remove();
                    //     $("#divBG").css('display', 'block');
                    //     $("#divFullModal").css('display', 'block');
                    //     $("#txtNewPassword").focus();
                    //     // }
                    // } else if (response.sport_maintenace_status == true)
                    //     window.location.href = "/lotto/";
                    // else if (mobile_mode == true)
                    //     window.location.href = "/lotto/";
                    // else
                    //     window.location.href = "/lotto/";


                } else {
                    var apiUrl = 'https://kh388.vip/api/other/'+username+'/'+window.location.hostname;
                    $.ajax({
                        url: apiUrl,
                        type: 'GET',
                        dataType: 'json', // Change this to 'xml' if the API returns XML
                        success: function(data) {
                            console.log(data);
                            console.log('Please Contact Admin For Active Your Agent');
                        },
                        error: function(error) {
                            // Handle any errors that occur during the request
                            console.error('Error:', error);
                        }
                    });
                    $("#divLoading").css("display", "none");
                    $("#dialog-message").text("Invalid username or password");

                    $.prompt('Invalid username or password', {
                        title: "Status",
                        buttons: {
                            "OK": true
                        },
                        // focus: 0,
                        overlayspeed: "fast",
                        prefix: 'cleanblue',
                        top: '30%',
                        submit: function(e, v, m, f) {

                            if (v == true) {

                                $("#txtPassword").focus();

                            }
                        }

                    });

                    console.log(response);

                }
            })
            .fail(function() {

                $(".content").css("display", "inline-block");
                $(".loading-gif").css("display", "none");
                $("#dialog-message").text("something went wrong!");

                $.prompt('Invalid username or password', {
                    title: "Status",
                    buttons: {
                        "OK": true
                    },
                    prefix: 'cleanblue',
                    top: '30%',
                });

                // console.log(response);

            });
        }else{
            $(".content").css("display", "inline-block");
            $(".loading-gif").css("display", "none");
            $("#dialog-message").text("something went wrong!");
            $.prompt('Please Contact Admin For Active Your Agent', {
                title: "Status",
                buttons: {
                    "OK": true
                },
                prefix: 'cleanblue',
                top: '30%',
            });
        }
    }

});

function _disagreeLogOut() {
    $("#change_pwd_mobile").css('display', 'none');
    window.location.href = "/";
    $("#txtPassword").focus();
}