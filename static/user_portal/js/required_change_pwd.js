$(function() {});
// clear control
function clear() {
    $("#txtNewPassword").val("");
    $("#txtNewPasswordConfirm").val("");
    $("#txtNewPassword").focus();
}

// validation
function validation() {
    valid = false;
    msg = '';

    if (!$("#txtNewPassword").val()) {
        msg = 'Password is required';
        valid = false;
    } else {
        if (($("#txtNewPassword").val().length >= 6 && $("#txtNewPassword").val().length < 24)) {
            valid = true;
        } else {
            msg = 'Password minimun >= 6 and maximumn < 24';
            valid = false;
        }
    }

    if (!$("#txtNewPasswordConfirm").val()) {
        msg = 'Confirm Password is required';
        valid = false;
    } else {
        if (($("#txtNewPasswordConfirm").val().length >= 6 && $("#txtNewPasswordConfirm").val().length < 24)) {
            if ($("#txtNewPasswordConfirm").val() == $("#txtNewPassword").val()) {
                valid = true;
            } else {
                msg = 'Password is not matched';
                valid = false;
            }
        } else {
            msg = 'Confirm Password minimun >= 6 and maximumn < 24';
            valid = false;
        }

    }

    $.prompt(msg, {
        title: "Status",
        buttons: {
            "OK": true
        },
        overlayspeed: "fast",
        prefix: 'cleanblue',
        top: '30%',
        submit: function(e, v, m, f) {

            if (v == true) {

                $("#txtNewPassword").focus();

            }
        }

    });

    return valid;
}

// function clear
function doClear() {
    clear();
}

// function submit
function doSubmit() {
    console.log(validation());

    if (validation() && $("#txtNewPassword").val() != '') {
        $("#betLoading").css("display", "block");

        frm_data = {
            "password": $("#txtNewPassword").val(),
            'required_change': 'False'
        };

        $.ajax({
            url: api + "user-auth/user_change_pwd/",
            type: "POST",
            async: "true",
            crossDomain: "true",
            headers: {
                Authorization: "sid " + $.cookie("sid")
            },
            data: frm_data,
            success: function(data) {

                console.log(data);
                $("#betLoading").css("display", "none");

                var mobile_mode = $.cookie("is_mobile");

                if (mobile_mode == true)
                    window.location.href = "/lotto/";
                else
                    window.location.href = "/lotto/";

            },
            error: function(error) {

                console.log(error);

                $("#betLoading").css("display", "none");

                $.prompt(error.responseJSON['message'], {
                    title: "Status",
                    buttons: {
                        "OK": true
                    },
                    overlayspeed: "fast",
                    prefix: 'cleanblue',
                    top: '30%',
                    submit: function(e, v, m, f) {

                        if (v == true) {

                            $("#txtNewPassword").focus();

                        }
                    }

                });

            }
        });


    }
}

function _disagreeLogOut() {
    window.location.href = "/";
}