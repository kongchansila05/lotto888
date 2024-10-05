$(function() {});
// clear control
function clear() {
    // $("#txtYourPassword").val("");
    // $(".msg_yourpassword").css("display", "none");

    $("#txtPassword").val("");
    $("#txtConfirmPassword").val("");
    $("#txtPassword").focus();
    $(".msg_password").css("display", "none");
    $(".msg_confirmpassword").css("display", "none");
}

// validation
function validation() {
    valid = false;

    if (!$("#txtPassword").val()) {
        $(".msg_password").text("Required Field !");
        $(".msg_password").css("display", "block");
        valid = false;
    } else {
        if (($("#txtPassword").val().length >= 6 && $("#txtPassword").val().length < 24)) {
            $(".msg_password").css("display", "none");
            valid = true;
        } else {
            $(".msg_password").text("");
            $(".msg_password").text("Min >= 6 and Max <24");
            $(".msg_password").css("display", "block");
            valid = false;
        }
    }

    if (!$("#txtConfirmPassword").val()) {
        $(".msg_confirmpassword").text("Required Field !");
        $(".msg_confirmpassword").css("display", "block");
        valid = false;
    } else {
        if (($("#txtConfirmPassword").val().length >= 6 && $("#txtConfirmPassword").val().length < 24)) {
            if ($("#txtConfirmPassword").val() == $("#txtPassword").val()) {
                $(".msg_confirmpassword").css("display", "none");
                valid = true;
            } else {
                $(".msg_confirmpassword").text("Not Match Field !");
                $(".msg_confirmpassword").css("display", "block");
                $(".msg_password").text("Not Match Field !");
                $(".msg_password").css("display", "block");
                valid = false;
            }
        } else {
            $(".msg_confirmpassword").text("Not Match Field !");
            $(".msg_confirmpassword").css("display", "block");
            $(".msg_password").text("Not Match Field !");
            $(".msg_password").css("display", "block");
            valid = false;
        }

        // if(($("#txtConfirmPassword").val().length > 6 && $("#txtYourPassword").val().length < 24)){

        // }else{
        //     $(".msg_confirmpassword").text("Min > 6 and Max <24");
        //     $(".msg_confirmpassword").css("display", "block");
        //     valid = false;
        // }
    }

    return valid;
}

// function clear
function doClear() {
    clear();
}

// function submit
function doSubmit() {
    console.log(validation());

    if (validation() && $("#txtPassword").val() != '') {
        $("#betLoading").css("display", "block");

        frm_data = {
            "password": $("#txtPassword").val()
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
                noty(
                    $.extend(defaultNotyConfigure, {
                        text: data.message,
                        type: "success"
                    })
                );
                // Redirect to login page
                // window.location.href = "/";

            },
            error: function(error) {
                console.log(error);
                $("#betLoading").css("display", "none");
                noty(
                    $.extend(defaultNotyConfigure, {
                        text: error.responseJSON['message'],
                        type: "error"
                    })
                );
            }
        });


    }
}