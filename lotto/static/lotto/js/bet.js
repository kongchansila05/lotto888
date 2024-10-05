$(function() {

    bet_object = {};
    result_odd = {};

    get_result_odd();

    update_recent_transaction();

    var cur_chat_view = 'overunder';

    var has_bet = false;

});

$(document).ready(function() {

    // ProcessOverUnderTable();

    ProcessLottoTable();

});

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function kenoOpenModal(event) {

    if (result_odd == "")
        return

    $("#btnBet").attr("disabled", false);
    $("#btnBetnPrint").attr("disabled", false);
    $('#divLoading-bet').css("display", "none");

    bet_object = {};

    roundId = $("#period-before").text();
    bet_value = $(event).attr('data-bet');
    bet_type = $(event).attr('data-bet-type');

    betinfo_value = $(event).attr("betinfo-value");
    betinfo_range = $(event).attr("betinfo-range");

    if (roundId == "#" || roundId == "")
        return

    round_status = $("#round_status").val();

    if (round_status == 1)
        return

    bet_object = {
        'bet_value': bet_value,
        'bet_type': bet_type,
        'roundId': roundId,
        'amount': 0,
        'estimate_payout': 0,
        'odds': 0,
        'bet_option': 'lotto5d',
        'tableId': 6
    }

    // console.log(bet_object);

    $("#period").text('{0}'.format(roundId));

    $("#bet_range").text(betinfo_range);
    $("#bet_value").text(betinfo_value);

    $("#bet_value_kh").text(betinfo_value);
    var lang = getCookie("language").toLowerCase();
    if (lang == 'kh') {
        if (betinfo_value == 'Under')
            $("#bet_value_kh").text("តូច");
        else if (betinfo_value == 'Over')
            $("#bet_value_kh").text("ធំ");
    }

    $("#bet_odd").text(get_odd(bet_type, bet_value) + 1);
    time = $("#timer-display").text().substring(6, 18);
    $("#bet_time").text(time);

    $("#keno-amount").val("");
    $(".net-amount").text("");
    $(".keno-bet-modal").show();

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $("#keno-amount").trigger('blur');
    } else {
        $("#keno-amount").focus();
    }

}

function kenoCloseModal() {
    $(".keno-bet-modal").hide();
}

function resetBet() {

    $("#keno-amount").val("");
    $("#keno-amount").focus();

    update_max_payout();
}

function kenoBet(value) {

    var amt = $("#keno-amount").val()

    amt = amt == "" ? 0 : amt;

    amt = parseInt(amt) + parseInt(value);

    $("#keno-amount").val(amt);

    update_max_payout();

}

function get_result_odd() {

    $.ajax({
        url: api + "keno/result_odd/?page_size=200",
        type: "GET",
        async: "true",
        crossDomain: "true",
        headers: {
            Authorization: "sid " + $.cookie("sid")
        },
        success: function(data) {
            // console.log(data);
            result_odd = data['results'];
        },
        error: function(error) {
            console.log(error);
            window.location.href = "/";
        }
    });

}


function update_recent_transaction() {

    $.ajax({
        url: api + "keno/recent_transaction/?table=lotto5d",
        type: "GET",
        async: "true",
        crossDomain: "true",
        headers: {
            Authorization: "sid " + $.cookie("sid")
        },
        success: function(data) {

            // console.log(data);

            last_game = data['last_game'];
            var last_game_sort = helper.arr.multisort(last_game, ['k_round'], ['DESC']);
            add_data_to_last_game(last_game_sort);

            pending_bets = data['pending_bets']
            var pending_bets_sort = helper.arr.multisort(pending_bets, ['roundId', 'id'], ['DESC', 'DESC']);
            add_data_to_pending_list(pending_bets_sort);

            // ProcessRangeTable();

            $("#header-info").text("{0} {1}".format(data['servertime'], data['currency']));

        },
        error: function(error) {
            console.log(error);
            window.location.href = "/";
        }
    });

}

function add_data_to_last_game(last_game_data) {

    // item_row = 1;
    for (var i = 0; i < last_game_data.length; i++) {

        row = last_game_data[i];

        $("#result-now-{0}".format(i + 1)).text("{0}#{1} {2}".format(row.date, row.k_round, row.time));

        $("#result-total-{0}".format(i + 1)).text("{0}".format(row.result.num_sum));

    }

}

function add_data_to_pending_list(pending_bets) {

    has_bet = false;

    $("#betListNow").empty();

    var roundId = 0;

    var lang = getCookie("language").toLowerCase();

    // console.log(pending_bets.length);

    for (var i = 0; i < pending_bets.length; i++) {

        var li = '';
        row = pending_bets[i];

        bet_type = "";
        if (row.bet_type.substring(0, 4) == "fre_") {
            bet_type = "[" + row.bet_type.replace('fre_', "") + "]";
        } else if (row.bet_type == 'number') {
            bet_type = '[Num] ';
        }

        bet_value = row.bet_value;
        if (lang == 'kh') {
            if (row.bet_value == 'Under')
                bet_value = 'តូច';
            else if (row.bet_value == "Over")
                bet_value = 'ធំ';
            else if (row.bet_value == "210-695")
                bet_value = '1';
            else if (row.bet_value == "696-763")
                bet_value = '2';
            else if (row.bet_value == "764-855")
                bet_value = '3';
            else if (row.bet_value == "856-923")
                bet_value = '4';
            else if (row.bet_value == "924-1410")
                bet_value = '5';
        }
        bet_item = bet_type + bet_value

        if (roundId != row.roundId) {
            print_all_img = '<img style="height:13px;float:right;margin-top:3px;padding-right:7px;" src="/static/lotto/images/printer_b.svg"/>'
            print_all_str = '<a style="color:blue;font-weight:bold;text-decoration:underline;" ';
            print_all_str += 'href="#" ';
            print_all_str += 'onclick="ibc_print_invoice_all({0},0)" class="btn-print-order">{1}</a>'.format(row.roundId, print_all_img)
            // print_all_str += '</a>';


            print_win_img = '<img style="height:13px;float:right;margin-top:3px;padding-right:0px;" src="/static/lotto/images/printer_green.svg"/>'
            print_win_str = '<a style="color:blue;font-weight:bold;text-decoration:underline;" ';
            print_win_str += 'href="#" ';
            print_win_str += 'onclick="ibc_print_invoice_all({0},1)" class="btn-print-order">{1}</a>'.format(row.roundId, print_win_img);
            // print_win_str += '</a>';


            li += "<li><p class='round'>Lotto {0}  {1} {2}</p></li>".format(row.roundId, print_all_str, print_win_str);
        }
        roundId = row.roundId;

        li += "<li>";

        li += "<p class='type-game'>{0} </p>".format(bet_item);

        if (row.cal_status == "pending") {
            has_bet = true;

            print_img = '<img style="height:13px;float:right;margin-top:3px;padding-right:5px;" src="/static/lotto/images/printer_b.svg"/>'

            print_str = '<a style="color:blue;font-weight:bold;text-decoration:underline;"';
            print_str += 'href="#" data-pk="{0}" ';
            print_str += 'onclick="ibc_print_invoice({0})" class="btn-print-order{0}">{1}</a>'.format(row.id, print_img)
            print_str += '</a>';

            // print_str = print_str.format(row.id)

            li += "<p class='bet-item'>{0}x{1}=</p>".format(ibc_amt_format_cur(row.amount, currency), row.odds + 1);
            li += "<p class='bet-winlose'>???</p>";
            li += "{0}".format(print_str);
        } else {
            if (row.winlose_status.toLowerCase() == 'win') {
                li += "<p class='bet-item'>{0}x{1}=</span> </p>".format(ibc_amt_format_cur(row.amount, currency), row.odds + 1);
                li += "<p class='bet-winlose'><span style='color:blue'>{0}</span> </p>".format(ibc_amt_format_cur(row.winLoss + row.amount, currency));
            } else {
                li += "<p class='bet-item'>{0}x{1}=</span> </p>".format(ibc_amt_format_cur(row.amount, currency), row.odds + 1);
                li += "<p class='bet-winlose'><span style='color:red'>0</span> </p>";
            }
        }

        li += "</li>";

        $("#betListNow").append(li);

    }

}

function get_odd(bet_type, bet_value) {

    var type;

    if (bet_type == 'fre_1_10')
        type = "fre";
    else if (bet_type == 'fre_11_20')
        type = "fre";
    else if (bet_type == 'fre_21_30')
        type = "fre";
    else if (bet_type == 'fre_31_40')
        type = "fre";
    else if (bet_type == 'fre_41_50')
        type = "fre";
    else if (bet_type == 'fre_51_60')
        type = "fre";
    else if (bet_type == 'fre_61_70')
        type = "fre";
    else if (bet_type == 'fre_71_80')
        type = "fre";
    else if (bet_type == 'number')
        type = "num"
    else
        type = bet_type

    key = type + '_' + bet_value

    // console.log(key,result_odd.length);

    for (var i = 0; i < result_odd.length; i++) {

        row = result_odd[i];

        // console.log(row.key,key);

        if (row.key == key) {
            return parseFloat(row.odd);
        }

    }

    return 0;

}

$("#keno-amount").keyup(function(event) {

    update_max_payout();

});

function update_max_payout() {

    var amt = $("#keno-amount").val()

    amt = parseFloat(amt == "" ? 0 : amt);

    odd = get_odd(bet_object.bet_type, bet_object.bet_value);

    odd = parseFloat(odd);

    bet_object.estimate_payout = (amt * odd) + amt;

    $(".net-amount").text(financial(bet_object.estimate_payout));

}

// place bet
function placeBet() {


    $('#btnBet').prop('disabled', true);
    // $('.btn-modal-bet').attr('disabled', true);

    var amt = $("#keno-amount").val()
    amt = parseFloat(amt == "" ? 0 : amt);

    if (amt == 0) {
        $('#btnBet').prop('disabled', false);
        return
    }


    $("#keno-amount").attr("disabled", "disabled");
    $("#btnBet").attr("disabled", true);
    $("#btnBet").prop("disabled", true);
    $('#divLoading-bet').css("display", "block");



    if (amt > 0) {

        odd = get_odd(bet_object.bet_type, bet_object.bet_value);
        odd = parseFloat(odd);

        bet_object.estimate_payout = (amt * odd) + amt;
        bet_object.amount = amt;
        bet_object.odds = odd

        data = JSON.stringify(bet_object);

        // console.log(data);

        var settings = {
            async: true,
            crossDomain: true,
            url: api + "keno/place_bet/",
            method: "POST",
            headers: {
                Authorization: "sid " + $.cookie("sid"),
                "Content-Type": "application/json"
            },
            processData: false,
            data: data
        };

        $.ajax(settings)
            .done(function(response) {

                // console.log("Response Data Message : ",response);

                update_recent_transaction();

                $(".keno-bet-modal").hide();

                $("#divBetList").css("display", "inline-block");

                // message(response.message);

                // $.prompt(response.message, 
                //   {
                //     title: "Bet Status",
                //     buttons: {
                //         "OK": true
                //     },
                //     prefix: 'cleanblue',
                //   top: '30%',
                //   });

                noty($.extend(defaultNotyConfigure, {
                    text: "Bet transaction is successfully created!",
                    type: 'success'
                }));

                // console.log(response.responseText);
                $("#betLoading").css("display", "none");
                // $("#btnBet").prop("disabled", false);
                $("#btnBet").attr("disabled", false);
                $("#keno-amount").removeAttr("disabled");
                $('#divLoading-bet').css("display", "none");

                $('#btnBet').prop('disabled', true);

            })
            .fail(function(response) {

                // console.log("Response Data Message : ",response);

                data = response.responseJSON;
                code = data.code
                msg = '';

                // console.log(code);

                msg = data.message;

                $.prompt(msg, {
                    title: "Bet Status",
                    buttons: {
                        "OK": true
                    },
                    prefix: 'cleanblue',
                    top: '30%',
                });


                $("#betLoading").css("display", "none");
                // $("#btnBet").prop("disabled", false);
                $("#btnBet").attr("disabled", false);
                $("#keno-amount").removeAttr("disabled");
                $('#divLoading-bet').css("display", "none");
                $('#btnBet').prop('disabled', false);
            });
    }

};


// place bet
function placeBetnPrint() {


    $('#btnBetnPrint').prop('disabled', true);
    // $('.btn-modal-bet').attr('disabled', true);

    var amt = $("#keno-amount").val()
    amt = parseFloat(amt == "" ? 0 : amt);

    if (amt == 0) {
        $('#btnBetnPrint').prop('disabled', false);
        return
    }


    $("#keno-amount").attr("disabled", "disabled");
    $("#btnBetnPrint").attr("disabled", true);
    $("#btnBetnPrint").prop("disabled", true);
    $('#divLoading-bet').css("display", "block");



    if (amt > 0) {

        odd = get_odd(bet_object.bet_type, bet_object.bet_value);
        odd = parseFloat(odd);

        bet_object.estimate_payout = (amt * odd) + amt;
        bet_object.amount = amt;
        bet_object.odds = odd

        data = JSON.stringify(bet_object);

        // console.log(data);

        var settings = {
            async: true,
            crossDomain: true,
            url: api + "keno/place_bet/",
            method: "POST",
            headers: {
                Authorization: "sid " + $.cookie("sid"),
                "Content-Type": "application/json"
            },
            processData: false,
            data: data
        };

        $.ajax(settings)
            .done(function(response) {

                // console.log("Response Data Message : ",response);

                update_recent_transaction();

                $(".keno-bet-modal").hide();

                $("#divBetList").css("display", "inline-block");

                bet_id = response.message;

                $.get("/lotto/bet_invoice/?bet_id={0}".format(bet_id), function(data) {
                    $('.invoice').html(data);
                    $('.invoice').printThis();
                })


                // noty($.extend(defaultNotyConfigure, {text: "Bet transaction is successfully created!", type: 'success'}));

                console.log(response.message);

                $("#betLoading").css("display", "none");
                // $("#btnBet").prop("disabled", false);
                $("#btnBetnPrint").attr("disabled", false);
                $("#keno-amount").removeAttr("disabled");
                $('#divLoading-bet').css("display", "none");

                $('#btnBetnPrint').prop('disabled', true);

            })
            .fail(function(response) {

                // console.log("Response Data Message : ",response);

                data = response.responseJSON;
                code = data.code
                msg = '';

                // console.log(code);

                msg = data.message;

                $.prompt(msg, {
                    title: "Bet Status",
                    buttons: {
                        "OK": true
                    },
                    prefix: 'cleanblue',
                    top: '30%',
                });


                $("#betLoading").css("display", "none");
                // $("#btnBet").prop("disabled", false);
                $("#btnBetnPrint").attr("disabled", false);
                $("#keno-amount").removeAttr("disabled");
                $('#divLoading-bet').css("display", "none");
                $('#btnBetnPrint').prop('disabled', false);
            });
    }

};

function ibc_print_invoice(bet_id) {

    // console.log('print');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

        window.open("/lotto/bet_invoice/?bet_id={0}".format(bet_id));

    } else {
        $.get("/lotto/bet_invoice/?bet_id={0}".format(bet_id), function(data) {
            $('.invoice').html(data);
            $('.invoice').printThis();
        })
    }

}

function ibc_print_invoice_all(roundId, win_all) {

    if (win_all == 1) {
        round_status = $("#round_status").val();
        if (round_status == 1)
            return
    }

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

        window.open("/lotto/bet_invoice_all/?roundId={0}&win_all={1}".format(roundId, win_all));

    } else {
        $.get("/lotto/bet_invoice_all/?roundId={0}&win_all={1}".format(roundId, win_all), function(data) {
            $('.invoice').html(data);
            $('.invoice').printThis();
        })
    }

}

$(".allownumericwithoutdecimal").on("keypress keyup blur", function(event) {
    $(this).val($(this).val().replace(/[^\d].+/, ""));
    if ((event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }
});

$("#refresh_game").click(function() {

    if ($("#timer").text() == "0")
        return
    refresh_img = 'url(/static/keno/images/games/refresh.png) center no-repeat';
    loading_img = 'url(/static/keno/images/games/match_loading.gif) center no-repeat';

    $("#refresh_game").css('background', loading_img);


    $.ajax({
        url: api + "keno/recent_transaction/?table=lotto5d",
        type: "GET",
        async: "true",
        crossDomain: "true",
        headers: {
            Authorization: "sid " + $.cookie("sid")
        },
        success: function(data) {

            // console.log(data);

            last_game = data['last_game'];
            var last_game_sort = helper.arr.multisort(last_game, ['k_round'], ['DESC']);
            add_data_to_last_game(last_game_sort);


            $("#header-info").text("{0} {1}".format(data['servertime'], data['currency']));

            $("#refresh_game").css('background', refresh_img);

        },
        error: function(error) {
            console.log(error);
            $("#refresh_game").css('background', refresh_img);
        }

    });


})

$("#refresh_bet").click(function() {

    if ($("#timer").text() == "0")
        return

    refresh_img = 'url(/static/keno/images/games/refresh.png) center no-repeat';
    loading_img = 'url(/static/keno/images/games/match_loading.gif) center no-repeat';

    $("#refresh_bet").css('background', loading_img);


    $.ajax({
        url: api + "keno/recent_transaction/?table=lotto5d",
        type: "GET",
        async: "true",
        crossDomain: "true",
        headers: {
            Authorization: "sid " + $.cookie("sid")
        },
        success: function(data) {

            pending_bets = data['pending_bets']
            var pending_bets_sort = helper.arr.multisort(pending_bets, ['roundId', 'id'], ['DESC', 'DESC']);
            add_data_to_pending_list(pending_bets_sort);

            $("#header-info").text("{0} {1}".format(data['servertime'], data['currency']));

            $("#refresh_bet").css('background', refresh_img);

        },
        error: function(error) {
            console.log(error);
            $("#refresh_bet").css('background', refresh_img);
        }

    });


})

$("#refresh_balance").click(function() {

    if ($("#timer").text() == "0")
        return

    refresh_img = 'url(/static/keno/images/games/refresh.png) center no-repeat';
    loading_img = 'url(/static/keno/images/games/match_loading.gif) center no-repeat';

    $("#refresh_balance").css('background', loading_img);


    $.ajax({
        url: api + "keno/recent_transaction/?table=lotto5d",
        type: "GET",
        async: "true",
        crossDomain: "true",
        headers: {
            Authorization: "sid " + $.cookie("sid")
        },
        success: function(data) {

            // console.log(data);

            last_game = data['last_game'];
            var last_game_sort = helper.arr.multisort(last_game, ['k_round'], ['DESC']);
            add_data_to_last_game(last_game_sort);

            pending_bets = data['pending_bets']
            var pending_bets_sort = helper.arr.multisort(pending_bets, ['roundId', 'id'], ['DESC', 'DESC']);
            add_data_to_pending_list(pending_bets_sort);

            $("#header-info").text("{0} {1}".format(data['servertime'], data['currency']));

            $("#refresh_balance").css('background', refresh_img);

        },
        error: function(error) {
            console.log(error);
            $("#refresh_balance").css('background', refresh_img);
        }

    });


})

function ProcessOverUnderTable() {

    $.ajax({
        url: api + "keno/get_overunder_table/?table=lotto5d",
        type: "GET",
        async: "true",
        crossDomain: "true",
        headers: {
            Authorization: "sid " + $.cookie("sid")
        },
        success: function(data) {

            // console.log(data);

            add_data_to_history_overunder(data);

        },
        error: function(error) {
            console.log(error);
            // window.location.href = "/";
        }
    });


}

function add_data_to_history_overunder(data) {

    reset_table();
    cur_chat_view = 'overunder';

    column = 1;
    row = 1;

    for (var c = data.length - 1; c >= 0; c--) {

        item_col = data[c];
        row = 1;

        // console.log(column,row);

        exceed_column = column;

        for (var r = item_col.length - 1; r >= 0; r--) {

            // console.log(column,exceed_column,row);

            item_row = item_col[r]

            $("#{0}-{1}".format(exceed_column, row)).append($('<span class="h_{0}"></span>'.format(item_row.toLowerCase())))

            row = row + 1;

            if (row > 6) {
                row = 6;
                exceed_column = exceed_column + 1;
            }

        }
        column = column + 1;

    }


}

function ProcessOddEvenTable() {

    // if ($("#timer").text() == "0")
    //   return 

    $.ajax({
        url: api + "keno/get_oddeven_table/?table=lotto5d",
        type: "GET",
        async: "true",
        crossDomain: "true",
        headers: {
            Authorization: "sid " + $.cookie("sid")
        },
        success: function(data) {

            // console.log(data);

            add_data_to_history_oddeven(data);

        },
        error: function(error) {
            console.log(error);
        }
    });


}

function add_data_to_history_oddeven(data) {

    reset_table();
    cur_chat_view = 'oddeven';

    column = 1;
    row = 1;

    for (var c = data.length - 1; c >= 0; c--) {

        item_col = data[c];
        row = 1;

        // console.log(column,row);

        exceed_column = column;

        for (var r = item_col.length - 1; r >= 0; r--) {

            // console.log(column,exceed_column,row);

            item_row = item_col[r]

            // console.log('#{0}-{1}'.format(exceed_column,row));

            $("#{0}-{1}".format(exceed_column, row)).append($('<span class="h_{0}"></span>'.format(item_row.toLowerCase())))

            row = row + 1;

            if (row > 6) {
                row = 6;
                exceed_column = exceed_column + 1;
            }

        }
        column = column + 1;

    }


}

function ProcessParlayTable() {

    // if ($("#timer").text() == "0")
    //   return 

    $.ajax({
        url: api + "keno/get_parlay_table/?table=lotto5d",
        type: "GET",
        async: "true",
        crossDomain: "true",
        headers: {
            Authorization: "sid " + $.cookie("sid")
        },
        success: function(data) {

            // console.log(data);

            add_data_to_history_parlay(data);

        },
        error: function(error) {
            console.log(error);
        }
    });


}

function add_data_to_history_parlay(data) {

    reset_table();
    cur_chat_view = 'parlay';

    column = 1;
    row = 1;

    for (var c = data.length - 1; c >= 0; c--) {

        item_col = data[c];
        row = 1;

        // console.log(column,row);

        exceed_column = column;

        for (var r = item_col.length - 1; r >= 0; r--) {

            // console.log(column,exceed_column,row);

            item_row = item_col[r]

            $("#{0}-{1}".format(exceed_column, row)).append($('<span class="h_{0}"></span>'.format(item_row.toLowerCase())))

            row = row + 1;

            if (row > 6) {
                row = 6;
                exceed_column = exceed_column + 1;
            }

        }
        column = column + 1;

    }


}

function ProcessRangeTable() {

    // if ($("#timer").text() == "0")
    //   return 

    $.ajax({
        url: api + "keno/get_range_table/?table=lotto5d",
        type: "GET",
        async: "true",
        crossDomain: "true",
        headers: {
            Authorization: "sid " + $.cookie("sid")
        },
        success: function(data) {

            // console.log(data);

            add_data_to_history_range_table2(data);

        },
        error: function(error) {
            console.log(error);
        }
    });


}

function range_to_ordinary_num(value) {

    if (value == '210-695')
        return '1st'
    else if (value == '696-763')
        return '2nd'
    else if (value == '764-855')
        return '3rd'
    else if (value == '856-923')
        return '4th'
    else if (value == '924-1410')
        return '5th'


}

function add_data_to_history_range_table2(data) {

    reset_table_table2();
    // cur_chat_view = 'range';

    column = 1;
    row = 1;

    for (var c = data.length - 1; c >= 0; c--) {

        item_col = data[c];
        row = 1;

        // console.log(column,row);

        exceed_column = column;

        for (var r = item_col.length - 1; r >= 0; r--) {

            // console.log(column,exceed_column,row);

            item_row = range_to_ordinary_num(item_col[r])

            $("#{0}-{1}-2".format(exceed_column, row)).append($('<span class="h_{0}"></span>'.format(item_row)))

            row = row + 1;

            if (row > 6) {
                row = 6;
                exceed_column = exceed_column + 1;
            }

        }
        column = column + 1;

    }


}

function ProcessSmallestTable() {

    // if ($("#timer").text() == "0")
    //   return 

    $.ajax({
        url: api + "keno/get_smallest_table/?table=lotto5d",
        type: "GET",
        async: "true",
        crossDomain: "true",
        headers: {
            Authorization: "sid " + $.cookie("sid")
        },
        success: function(data) {

            // console.log(data);

            add_data_to_history_smallest(data);

        },
        error: function(error) {
            console.log(error);
        }
    });


}

function add_data_to_history_smallest(data) {

    reset_table();
    cur_chat_view = 'smallest';

    column = 1;
    row = 1;

    for (var c = data.length - 1; c >= 0; c--) {

        item_col = data[c];
        row = 1;

        // console.log(column,row);

        exceed_column = column;

        for (var r = item_col.length - 1; r >= 0; r--) {

            // console.log(column,exceed_column,row);

            item_row = item_col[r]

            if (item_row == '1-2')
                item_row = 'small_1_2';
            else if (item_row == '3-5')
                item_row = 'small_3_5'
            else
                item_row = 'small_6'


            $("#{0}-{1}".format(exceed_column, row)).append($('<span class="h_{0}"></span>'.format(item_row)))

            if (row >= 6)
                exceed_column = exceed_column + 1;

            row = row + 1;

        }
        column = column + 1;

    }


}

function ProcessBiggestTable() {

    // if ($("#timer").text() == "0")
    //   return 

    $.ajax({
        url: api + "keno/get_biggest_table/?table=lotto5d",
        type: "GET",
        async: "true",
        crossDomain: "true",
        headers: {
            Authorization: "sid " + $.cookie("sid")
        },
        success: function(data) {

            // console.log(data);

            add_data_to_history_biggest(data);

        },
        error: function(error) {
            console.log(error);
        }
    });


}

function add_data_to_history_biggest(data) {

    reset_table();
    cur_chat_view = 'biggest';

    column = 1;
    row = 1;

    for (var c = data.length - 1; c >= 0; c--) {

        item_col = data[c];
        row = 1;

        // console.log(column,row);

        exceed_column = column;

        for (var r = item_col.length - 1; r >= 0; r--) {

            // console.log(column,exceed_column,row);

            item_row = item_col[r]

            if (item_row == '<=75')
                item_row = 'big_75';
            else if (item_row == '76-78')
                item_row = 'big_76_78'
            else
                item_row = 'big_79_80'


            $("#{0}-{1}".format(exceed_column, row)).append($('<span class="h_{0}"></span>'.format(item_row)))

            row = row + 1;

            if (row > 6) {
                row = 6;
                exceed_column = exceed_column + 1;
            }

        }
        column = column + 1;

    }


}

function reset_table() {

    $("#tdhistory").empty();

    html = '';
    html += '<tr class="history-row-1">';
    html += '<td id="1-1"></td>';
    html += '<td id="2-1"></td>';
    html += '<td id="3-1"></td>';
    html += '<td id="4-1"></td>';
    html += '<td id="5-1"></td>';
    html += '<td id="6-1"></td>';
    html += '<td id="7-1"></td>';
    html += '<td id="8-1"></td>';
    html += '<td id="9-1"></td>';
    html += '<td id="10-1"></td>';
    html += '<td id="11-1"></td>';
    html += '<td id="12-1"></td>';
    html += '<td id="13-1"></td>';
    html += '<td id="14-1"></td>';
    html += '<td id="15-1"></td>';
    html += '<td id="16-1"></td>';
    html += '<td id="17-1"></td>';
    html += '<td id="18-1"></td>';
    html += '<td id="19-1"></td>';
    html += '<td id="20-1"></td>';
    html += '</tr>';


    html += '<tr class="history-row-2">';
    html += '<td id="1-2"></td>';
    html += '<td id="2-2"></td>';
    html += '<td id="3-2"></td>';
    html += '<td id="4-2"></td>';
    html += '<td id="5-2"></td>';
    html += '<td id="6-2"></td>';
    html += '<td id="7-2"></td>';
    html += '<td id="8-2"></td>';
    html += '<td id="9-2"></td>';
    html += '<td id="10-2"></td>';
    html += '<td id="11-2"></td>';
    html += '<td id="12-2"></td>';
    html += '<td id="13-2"></td>';
    html += '<td id="14-2"></td>';
    html += '<td id="15-2"></td>';
    html += '<td id="16-2"></td>';
    html += '<td id="17-2"></td>';
    html += '<td id="18-2"></td>';
    html += '<td id="19-2"></td>';
    html += '<td id="20-2"></td>';
    html += '</tr>';


    html += '<tr class="history-row-3">';
    html += '<td id="1-3"></td>';
    html += '<td id="2-3"></td>';
    html += '<td id="3-3"></td>';
    html += '<td id="4-3"></td>';
    html += '<td id="5-3"></td>';
    html += '<td id="6-3"></td>';
    html += '<td id="7-3"></td>';
    html += '<td id="8-3"></td>';
    html += '<td id="9-3"></td>';
    html += '<td id="10-3"></td>';
    html += '<td id="11-3"></td>';
    html += '<td id="12-3"></td>';
    html += '<td id="13-3"></td>';
    html += '<td id="14-3"></td>';
    html += '<td id="15-3"></td>';
    html += '<td id="16-3"></td>';
    html += '<td id="17-3"></td>';
    html += '<td id="18-3"></td>';
    html += '<td id="19-3"></td>';
    html += '<td id="20-3"></td>';
    html += '</tr>';


    html += '<tr class="history-row-4">';
    html += '<td id="1-4"></td>';
    html += '<td id="2-4"></td>';
    html += '<td id="3-4"></td>';
    html += '<td id="4-4"></td>';
    html += '<td id="5-4"></td>';
    html += '<td id="6-4"></td>';
    html += '<td id="7-4"></td>';
    html += '<td id="8-4"></td>';
    html += '<td id="9-4"></td>';
    html += '<td id="10-4"></td>';
    html += '<td id="11-4"></td>';
    html += '<td id="12-4"></td>';
    html += '<td id="13-4"></td>';
    html += '<td id="14-4"></td>';
    html += '<td id="15-4"></td>';
    html += '<td id="16-4"></td>';
    html += '<td id="17-4"></td>';
    html += '<td id="18-4"></td>';
    html += '<td id="19-4"></td>';
    html += '<td id="20-4"></td>';
    html += '</tr>';

    html += '<tr class="history-row-5">';
    html += '<td id="1-5"></td>';
    html += '<td id="2-5"></td>';
    html += '<td id="3-5"></td>';
    html += '<td id="4-5"></td>';
    html += '<td id="5-5"></td>';
    html += '<td id="6-5"></td>';
    html += '<td id="7-5"></td>';
    html += '<td id="8-5"></td>';
    html += '<td id="9-5"></td>';
    html += '<td id="10-5"></td>';
    html += '<td id="11-5"></td>';
    html += '<td id="12-5"></td>';
    html += '<td id="13-5"></td>';
    html += '<td id="14-5"></td>';
    html += '<td id="15-5"></td>';
    html += '<td id="16-5"></td>';
    html += '<td id="17-5"></td>';
    html += '<td id="18-5"></td>';
    html += '<td id="19-5"></td>';
    html += '<td id="20-5"></td>';
    html += '</tr>';

    html += '<tr class="history-row-6">';
    html += '<td id="1-6"></td>';
    html += '<td id="2-6"></td>';
    html += '<td id="3-6"></td>';
    html += '<td id="4-6"></td>';
    html += '<td id="5-6"></td>';
    html += '<td id="6-6"></td>';
    html += '<td id="7-6"></td>';
    html += '<td id="8-6"></td>';
    html += '<td id="9-6"></td>';
    html += '<td id="10-6"></td>';
    html += '<td id="11-6"></td>';
    html += '<td id="12-6"></td>';
    html += '<td id="13-6"></td>';
    html += '<td id="14-6"></td>';
    html += '<td id="15-6"></td>';
    html += '<td id="16-6"></td>';
    html += '<td id="17-6"></td>';
    html += '<td id="18-6"></td>';
    html += '<td id="19-6"></td>';
    html += '<td id="20-6"></td>';
    html += '</tr>';


    $("#tdhistory").append(html);


}

function reset_table_table2() {

    $("#tdhistory-2").empty();

    html = '';
    html += '<tr class="history-row-1-2">';
    html += '<td id="1-1-2"></td>';
    html += '<td id="2-1-2"></td>';
    html += '<td id="3-1-2"></td>';
    html += '<td id="4-1-2"></td>';
    html += '<td id="5-1-2"></td>';
    html += '<td id="6-1-2"></td>';
    html += '<td id="7-1-2"></td>';
    html += '<td id="8-1-2"></td>';
    html += '<td id="9-1-2"></td>';
    html += '<td id="10-1-2"></td>';
    html += '<td id="11-1-2"></td>';
    html += '<td id="12-1-2"></td>';
    html += '<td id="13-1-2"></td>';
    html += '<td id="14-1-2"></td>';
    html += '<td id="15-1-2"></td>';
    html += '<td id="16-1-2"></td>';
    html += '<td id="17-1-2"></td>';
    html += '<td id="18-1-2"></td>';
    html += '<td id="19-1-2"></td>';
    html += '<td id="20-1-2"></td>';
    html += '</tr>';


    html += '<tr class="history-row-2-2">';
    html += '<td id="1-2-2"></td>';
    html += '<td id="2-2-2"></td>';
    html += '<td id="3-2-2"></td>';
    html += '<td id="4-2-2"></td>';
    html += '<td id="5-2-2"></td>';
    html += '<td id="6-2-2"></td>';
    html += '<td id="7-2-2"></td>';
    html += '<td id="8-2-2"></td>';
    html += '<td id="9-2-2"></td>';
    html += '<td id="10-2-2"></td>';
    html += '<td id="11-2-2"></td>';
    html += '<td id="12-2-2"></td>';
    html += '<td id="13-2-2"></td>';
    html += '<td id="14-2-2"></td>';
    html += '<td id="15-2-2"></td>';
    html += '<td id="16-2-2"></td>';
    html += '<td id="17-2-2"></td>';
    html += '<td id="18-2-2"></td>';
    html += '<td id="19-2-2"></td>';
    html += '<td id="20-2-2"></td>';
    html += '</tr>';


    html += '<tr class="history-row-3-2">';
    html += '<td id="1-3-2"></td>';
    html += '<td id="2-3-2"></td>';
    html += '<td id="3-3-2"></td>';
    html += '<td id="4-3-2"></td>';
    html += '<td id="5-3-2"></td>';
    html += '<td id="6-3-2"></td>';
    html += '<td id="7-3-2"></td>';
    html += '<td id="8-3-2"></td>';
    html += '<td id="9-3-2"></td>';
    html += '<td id="10-3-2"></td>';
    html += '<td id="11-3-2"></td>';
    html += '<td id="12-3-2"></td>';
    html += '<td id="13-3-2"></td>';
    html += '<td id="14-3-2"></td>';
    html += '<td id="15-3-2"></td>';
    html += '<td id="16-3-2"></td>';
    html += '<td id="17-3-2"></td>';
    html += '<td id="18-3-2"></td>';
    html += '<td id="19-3-2"></td>';
    html += '<td id="20-3-2"></td>';
    html += '</tr>';


    html += '<tr class="history-row-4-2">';
    html += '<td id="1-4-2"></td>';
    html += '<td id="2-4-2"></td>';
    html += '<td id="3-4-2"></td>';
    html += '<td id="4-4-2"></td>';
    html += '<td id="5-4-2"></td>';
    html += '<td id="6-4-2"></td>';
    html += '<td id="7-4-2"></td>';
    html += '<td id="8-4-2"></td>';
    html += '<td id="9-4-2"></td>';
    html += '<td id="10-4-2"></td>';
    html += '<td id="11-4-2"></td>';
    html += '<td id="12-4-2"></td>';
    html += '<td id="13-4-2"></td>';
    html += '<td id="14-4-2"></td>';
    html += '<td id="15-4-2"></td>';
    html += '<td id="16-4-2"></td>';
    html += '<td id="17-4-2"></td>';
    html += '<td id="18-4-2"></td>';
    html += '<td id="19-4-2"></td>';
    html += '<td id="20-4-2"></td>';
    html += '</tr>';

    html += '<tr class="history-row-5-2">';
    html += '<td id="1-5-2"></td>';
    html += '<td id="2-5-2"></td>';
    html += '<td id="3-5-2"></td>';
    html += '<td id="4-5-2"></td>';
    html += '<td id="5-5-2"></td>';
    html += '<td id="6-5-2"></td>';
    html += '<td id="7-5-2"></td>';
    html += '<td id="8-5-2"></td>';
    html += '<td id="9-5-2"></td>';
    html += '<td id="10-5-2"></td>';
    html += '<td id="11-5-2"></td>';
    html += '<td id="12-5-2"></td>';
    html += '<td id="13-5-2"></td>';
    html += '<td id="14-5-2"></td>';
    html += '<td id="15-5-2"></td>';
    html += '<td id="16-5-2"></td>';
    html += '<td id="17-5-2"></td>';
    html += '<td id="18-5-2"></td>';
    html += '<td id="19-5-2"></td>';
    html += '<td id="20-5-2"></td>';
    html += '</tr>';

    html += '<tr class="history-row-6-2">';
    html += '<td id="1-6-2"></td>';
    html += '<td id="2-6-2"></td>';
    html += '<td id="3-6-2"></td>';
    html += '<td id="4-6-2"></td>';
    html += '<td id="5-6-2"></td>';
    html += '<td id="6-6-2"></td>';
    html += '<td id="7-6-2"></td>';
    html += '<td id="8-6-2"></td>';
    html += '<td id="9-6-2"></td>';
    html += '<td id="10-6-2"></td>';
    html += '<td id="11-6-2"></td>';
    html += '<td id="12-6-2"></td>';
    html += '<td id="13-6-2"></td>';
    html += '<td id="14-6-2"></td>';
    html += '<td id="15-6-2"></td>';
    html += '<td id="16-6-2"></td>';
    html += '<td id="17-6-2"></td>';
    html += '<td id="18-6-2"></td>';
    html += '<td id="19-6-2"></td>';
    html += '<td id="20-6-2"></td>';
    html += '</tr>';


    $("#tdhistory-2").append(html);


}

function ProcessLottoTable() {

    // if ($("#timer").text() == "0")
    //   return 

    $.ajax({
        url: api + "keno/get_lotto_table/?table=lotto5d",
        type: "GET",
        async: "true",
        crossDomain: "true",
        headers: {
            Authorization: "sid " + $.cookie("sid")
        },
        success: function(data) {

            // console.log(data);

            data_ou = data['overunder'];
            data_range = data['range'];

            add_data_to_history_overunder(data_ou);

            add_data_to_history_range_table2(data_range);

        },
        error: function(error) {
            console.log(error);
        }
    });


}


function auto_refresh_table() {


    ProcessLottoTable();

    // if (cur_chat_view == 'overunder')
    //   ProcessOverUnderTable();
    // else if (cur_chat_view == 'oddeven')
    //   ProcessOddEvenTable();
    // else if (cur_chat_view == 'parlay')
    //   ProcessParlayTable();
    // else if (cur_chat_view == 'range')
    //   ProcessRangeTable();
    // else if (cur_chat_view == 'smallest')
    //   ProcessSmallestTable();
    // else if (cur_chat_view == 'biggest')
    //   ProcessBiggestTable();



}


if (typeof helper == 'undefined') {
    var helper = {};
}

helper.arr = {
    /**
     * Function to sort multidimensional array
     * 
     * <a href="/param">@param</a> {array} [arr] Source array
     * <a href="/param">@param</a> {array} [columns] List of columns to sort
     * <a href="/param">@param</a> {array} [order_by] List of directions (ASC, DESC)
     * @returns {array}
     */
    multisort: function(arr, columns, order_by) {
        if (typeof columns == 'undefined') {
            columns = []
            for (x = 0; x < arr[0].length; x++) {
                columns.push(x);
            }
        }

        if (typeof order_by == 'undefined') {
            order_by = []
            for (x = 0; x < arr[0].length; x++) {
                order_by.push('ASC');
            }
        }

        function multisort_recursive(a, b, columns, order_by, index) {
            var direction = order_by[index] == 'DESC' ? 1 : 0;

            var is_numeric = !isNaN(+a[columns[index]] - +b[columns[index]]);


            var x = is_numeric ? +a[columns[index]] : a[columns[index]].toLowerCase();
            var y = is_numeric ? +b[columns[index]] : b[columns[index]].toLowerCase();



            if (x < y) {
                return direction == 0 ? -1 : 1;
            }

            if (x == y) {
                return columns.length - 1 > index ? multisort_recursive(a, b, columns, order_by, index + 1) : 0;
            }

            return direction == 0 ? 1 : -1;
        }

        return arr.sort(function(a, b) {
            return multisort_recursive(a, b, columns, order_by, 0);
        });
    }
};