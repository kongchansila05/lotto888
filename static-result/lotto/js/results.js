$(function() {

    initKenoResult()
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

    ResultContent(dateFrom);
}


function ResultContent(dateFrom) {

    $("#divLoading").css("display", "inline-block");

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": api + "keno/round_result/?table=lotto5d&page_size=500&date=" + (dateFrom),
        "method": "GET",
        "headers": {
            "Authorization": "sid " + $.cookie("sid"),
            "Content-Type": "application/json",
        },
        "processData": false
    }

    // console.log(settings);

    $.ajax(settings).done(function(response) {

            console.log(response);

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

    for (var i = 0; i < data.length; i++) {

        tblcontent_row = '<tr class="main_table_odd">';

        tblcontent_row += '<td>{0}</td>'.format(i + 1);

        tblcontent_row += '<td>{0}</td>'.format(data[i].round_date);


        tblcontent_row += '<td>#{0}</td>'.format(data[i].roundId);


        tblcontent_row += '<td>{0}</td>'.format(data[i].num_sum);

        detail = '';
        detail1 = '{0},{1},{2},{3},{4},'.format(data[i].num01, data[i].num02, data[i].num03, data[i].num04, data[i].num05)
        detail2 = '{0},{1},{2},{3},{4},'.format(data[i].num06, data[i].num07, data[i].num08, data[i].num09, data[i].num10)
        detail3 = '{0},{1},{2},{3},{4},'.format(data[i].num11, data[i].num12, data[i].num13, data[i].num14, data[i].num15)
        detail4 = '{0},{1},{2},{3},{4}'.format(data[i].num16, data[i].num17, data[i].num18, data[i].num19, data[i].num20)

        detail = detail1 + detail2 + detail3 + detail4;

        tblcontent_row += '<td>{0}</td>'.format(detail);

        bonus = ''
        if (data[i].bonus_num != '')
            bonus = '{0} (+{1})'.format(data[i].bonus_num, data[i].bonus_odd)

        tblcontent_row += '<td>{0}</td>'.format(bonus);


        tblcontent_row += '<td>{0}</td>'.format(data[i].num_overunder);


        // tblcontent_row += '<td>{0}</td>'.format(data[i].num_oddeven);


        tblcontent_row += '<td>{0}</td>'.format(data[i].num_range);


        // tblcontent_row += '<td>{0}</td>'.format(data[i].num_01_10);


        // tblcontent_row += '<td>{0}</td>'.format(data[i].num_11_20);


        // tblcontent_row += '<td>{0}</td>'.format(data[i].num_21_30);


        // tblcontent_row += '<td>{0}</td>'.format(data[i].num_31_40);


        // tblcontent_row += '<td>{0}</td>'.format(data[i].num_41_50);


        // tblcontent_row += '<td>{0}</td>'.format(data[i].num_51_60);


        // tblcontent_row += '<td>{0}</td>'.format(data[i].num_61_70);


        // tblcontent_row += '<td>{0}</td>'.format(data[i].num_71_80);


        // tblcontent_row += '<td>{0}</td>'.format(data[i].num_smallest);


        // tblcontent_row += '<td>{0}</td>'.format(data[i].num_biggest);


        // tblcontent_row += '<td>{0}</td>'.format(data[i].num_71_80);
        // tblcontent_row += '<td>';

        tblcontent_row += "</tr>"

        $("#tbody-result").append(tblcontent_row);
    }

}


// date picker calendar
function initKenoResult() {
    _addEventDatePicker();
    _addEventGetReport();


    if ($.trim($("#txtDateFrom").val()) == "")
        $("#txtDateFrom").val(getDateString(new Date()));

    // get result button click
    $("#btnGetResult").click(function(e) {

        var dateFrom = $("#txtDateFrom")
            .datepicker()
            .val();

        ResultContent(dateFrom);

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
        buttonImage: "/static/user_portal/assets/icon_v2.gif",
        dateFormat: 'dd-mm-yy',
        buttonImageOnly: true,
        yearRange: "-8:+1"
    });
    // $("#txtDateTo").datepicker({
    //   showOn: "both",
    //   buttonImage: "/static/user_portal/assets/icon_v2.gif",
    //   dateFormat: 'dd-mm-yy',
    //   buttonImageOnly: true,
    //   yearRange: "-8:+1"
    // });
}

function _addEventGetReport() {
    $("#btnGetResultToday").click(function(e) {
        var dt = new Date();
        $("#txtDateFrom").val(getDateString(dt));
        // $("#txtDateTo").val(getDateString(dt));
        $("#btnGetResult").click();
    });
    $("#btnGetResultYesterday").click(function(e) {
        var dt = new Date();
        dt.setDate(dt.getDate() - 1);
        $("#txtDateFrom").val(getDateString(dt));
        // $("#txtDateTo").val(getDateString(dt));
        $("#btnGetResult").click();
    });
}