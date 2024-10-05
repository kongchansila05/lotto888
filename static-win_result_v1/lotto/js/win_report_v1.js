$(function() {

    initKenoWinResult()
    onload();
});


String.prototype.format = function() {
    var str = this;
    for (var i = 0; i < arguments.length; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        str = str.replace(reg, arguments[i]);
    }
    return str;
};


function format_datetime_long(str) {
    var d = moment(str, moment.ISO_8601);
    return d.format("DD/MM/YYYY");
}

function format_datetime_long_for_filter(str) {
    var d = moment(str, moment.ISO_8601);
    return d.format("YYYY-MM-DD");
}

function format_datetime_short(str) {
    var d = moment(str, moment.ISO_8601);
    return d.format("HH:MM");
}


function onload() {

    var dateFrom = $("#txtDateFrom")
        .datepicker()
        .val();

    var dateTo = $("#txtDateTo")
        .datepicker()
        .val();

    ResultContent(dateFrom, dateTo);
}

function get_winlose_color(amt) {
    if (amt < 0)
        return 'color:red'

    return 'color:blue'
}

function ResultContent(dateFrom, ToDate) {

    $("#divLoading").css("display", "inline-block");

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": api + "keno/bet_list_v1/?bet_option={2}&fdate={0}&tdate={1}&page_size=4000".format(dateFrom, ToDate, 'lotto5d'),
        "method": "GET",
        "headers": {
            "Authorization": "sid " + $.cookie("sid"),
            "Content-Type": "application/json",
        },
        "processData": false
    }

    // console.log(settings);

    $.ajax(settings).done(function(response) {

            // console.log(response);

            data = response['results'];

            add_data_table(data);

            $('#divLoading').css("display", "none");

        })
        .fail(function() {
            console.log(response);
            $('#divLoading').css("display", "none");
        });
}

function add_data_table(data) {

    $("#tbody-result").empty();

    total_amt = 0;

    for (var i = 0; i < data.length; i++) {

        row = data[i];

        total_amt += row.winLoss;

        tblcontent_row = '<tr class="main_table_odd">';

        tblcontent_row += '<td>{0}</td>'.format(i + 1);

        tblcontent_row += '<td>{0}</td>'.format(row.id);

        tblcontent_row += '<td>{0}</td>'.format(row.created_datetime);

        tblcontent_row += '<td>{0}</td>'.format(row.report_date);

        tblcontent_row += '<td>{0}</td>'.format(row.name);

        tblcontent_row += '<td>{0}</td>'.format(row.login_username);

        // tblcontent_row += '<td>{0}</td>'.format(row.game_name);
        tblcontent_row += '<td>{0}</td>'.format('Lotto8888');


        tblcontent_row += '<td>{0}</td>'.format(row.roundId);

        tblcontent_row += '<td>{0}</td>'.format(row.result);

        tblcontent_row += '<td>{0}</td>'.format(row.bet_type);

        tblcontent_row += '<td>{0}</td>'.format(row.currency);

        if (row.bet_type == 'jackpot') {
            tblcontent_row += '<td>';
            tblcontent_row += '<a href="javascript:void(0)"';
            tblcontent_row += 'onclick="show_betdetail({0},this)" style="color:#900;text-decoration:underline;">{1}'.format(row.id, row.bet_value);
            tblcontent_row += '</a>';
            tblcontent_row += '</td>';
        } else {
            tblcontent_row += '<td>{0}</td>'.format(row.bet_value);
        }

        tblcontent_row += '<td>{0}</td>'.format(row.amount);

        tblcontent_row += '<td>{0}</td>'.format(row.odds);

        tblcontent_row += '<td>{0}</td>'.format(row.bonus);

        if (row.winLoss < 0)
            tblcontent_row += '<td><span style="color:red">{0}</span></td>'.format(row.winLoss);
        else
            tblcontent_row += '<td><span style="color:blue">{0}</span></td>'.format(row.winLoss);


        // tblcontent_row += '<td>{0}</td>'.format(data[i].num_71_80);
        // tblcontent_row += '<td>';

        tblcontent_row += "</tr>"

        $("#tbody-result").append(tblcontent_row);
    }


    $("#fbody-result").empty();

    if (data.length > 0) {

        tblcontent_row = '<tr class="main_table_foonterT">';

        tblcontent_row += '<td colspan="15">Total</td>';

        tblcontent_row += '<td align="center"><span style="{1}">{0}</span></td>'.format(financial(total_amt), get_winlose_color(total_amt));

        tblcontent_row += '</tr>';

        $("#fbody-result").append(tblcontent_row);

    }

}


// date picker calendar
function initKenoWinResult() {
    _addEventDatePicker();
    _addEventGetReport();


    if ($.trim($("#txtDateFrom").val()) == "")
        $("#txtDateFrom").val(getDateString(new Date()));

    if ($.trim($("#txtDateTo").val()) == "")
        $("#txtDateTo").val(getDateString(new Date()));

    // get result button click
    $("#btnGetResult").click(function(e) {

        var dateFrom = $("#txtDateFrom")
            .datepicker()
            .val();

        var dateTo = $("#txtDateTo")
            .datepicker()
            .val();

        ResultContent(dateFrom, dateTo);

    });
}

function getDateString(dt) {
    var yy = dt.getFullYear(),
        mm = dt.getMonth() + 1,
        dd = dt.getDate();
    return (dd < 10 ? "0" : "") + dd + "-" + (mm < 10 ? "0" : "") + mm + "-" + yy;
}


function _addEventDatePicker() {
    $("#txtDateFrom").datepicker({
        showOn: "both",
        buttonImage: "/static-win_result_v1/user_portal/assets/icon_v2.gif",
        dateFormat: 'dd-mm-yy',
        buttonImageOnly: true,
        yearRange: "-8:+1"
    });
    $("#txtDateTo").datepicker({
        showOn: "both",
        buttonImage: "/static-win_result_v1/user_portal/assets/icon_v2.gif",
        dateFormat: 'dd-mm-yy',
        buttonImageOnly: true,
        yearRange: "-8:+1"
    });
}

function _addEventGetReport() {
    $("#btnGetResultToday").click(function(e) {
        var dt = new Date();
        $("#txtDateFrom").val(getDateString(dt));
        $("#txtDateTo").val(getDateString(dt));
        $("#btnGetResult").click();
    });
    $("#btnGetResultYesterday").click(function(e) {
        var dt = new Date();
        dt.setDate(dt.getDate() - 1);
        $("#txtDateFrom").val(getDateString(dt));
        $("#txtDateTo").val(getDateString(dt));
        $("#btnGetResult").click();
    });
}


function close_betdetail() {
    $("#betdetail").hide();
}

function show_betdetail(bet_id, self) {

    var offset = $(self).offset();
    var position = $(self).position();

    var scroll_top = $('.main_sport_content').scrollTop();

    var top = position.top + scroll_top;

    // console.log(position.top,scroll_top);

    $("#betdetail").css("top", (top + 20));
    $("#betdetail").css("left", 860);


    $('#divLoadingDetail').css("display", "block");
    $("#tdetail").html('');

    $("#parlay_title").text('JackPot {0}'.format($(self).text()))

    $("#betdetail").show();

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": api + "keno/betdetail/?bet_id=" + bet_id,
        "method": "GET",
        "headers": {
            "Authorization": "sid " + $.cookie("sid"),
            "Content-Type": "application/json",
        },
        "processData": false
    }

    // console.log(settings);

    $.ajax(settings).done(function(response) {

            data = new Array();
            data = response['details']

            console.log(data);

            option_html = '';

            for (var i = 0; i < data.length; i++) {

                tblcontent_row = '<tr class="main_table_odd">';
                tblcontent_row += '<td style="font-size:13px;width:50px">{0}</td>'.format(i + 1);

                tblcontent_row += '<td style="font-size:13px;width:150px;">';
                tblcontent_row += '{0}'.format(data[i].bet_value);
                tblcontent_row += '</td>';

                tblcontent_row += '<td style="font-size:13px;width:50px;">';
                tblcontent_row += '{0}'.format(data[i].odds);
                tblcontent_row += '</td>';

                color = 'color:red';
                if (data[i].status.toLowerCase() == 'win')
                    color = 'color:blue';
                tblcontent_row += '<td style="font-size:13px;width:50px;{1}">{0}</td>'.format(data[i].status, color);

                tblcontent_row += '</tr>';

                option_html += tblcontent_row;

            }

            $("#tdetail").html(option_html);

            $('#divLoadingDetail').css("display", "none");


        })
        .fail(function() {

            console.log(response);
        });

}