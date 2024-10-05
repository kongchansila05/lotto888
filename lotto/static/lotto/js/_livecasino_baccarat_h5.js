var betTypeSymbol = ["B", "P", "T", "BP", "PP", "NT", "NP", "PE", "BG", "SM"]; // B6
var tmBA = null,
    tmRO = null,
    enableButton = true;
var bigTable = 0;
var betLimit = {
    "min": 1,
    "max": 0
};
var orderType = jsBaccaratConstant.type.i18nName;
var betLimitMax = {},
    betLimitMin = 0;
var gMaxResultedProductIDArr = {
    1: 0,
    2: 0,
    3: 0
};
var tmRO2 = null;

var videoSettingNew = null;
var videoObj = {};

window.g = (document.getElementById) ? (function(obj) {
    return document.getElementById(obj);
}) : ((document.all) ? (function(obj) {
    return document.all[obj];
}) : (function(obj) {
    return null;
}));

function rdt(table) { //TMP.solution
    var ie = (navigator.appName.indexOf("Microsoft") != -1) ? "" : "_nie_";
    return g("fRoad" + ie + table);
}

var submitTokenArr = {};
/**
 * @param table: table
 * @param flag: 0 小台; 1 大台
 */
function doPlaceBet(table, flag) {
    var t = (flag == 0) ? table : 4;
    var orders = [];
    var product_id = prd_ids[table];
    var betAmount = 0;
    var isOutLimit = 0;
    for (var i in betTypeSymbol) {
        var type = betTypeSymbol[i];
        var val = $('#betval_' + t + "_B_" + type + "0").val();
        val = 1 * val;
        if (val > 0) {
            // 校验bet_limit_min/max
            if (val < betLimit["min"] || val > betLimitMax[type]) {
                if (val > betLimitMax[type]) {
                    $("#betval_" + t + "_B_" + type + "0").val(betLimitMax[type]);
                } else if (val < betLimit["min"]) {
                    $("#betval_" + t + "_B_" + type + "0").val(betLimit["min"]);
                }
                isOutLimit = 1;
                continue;
            }
            betAmount = betAmount + val;
            orders.push({
                prd_id: product_id,
                type: type,
                amount: val
            });
        }
    }
    if (isOutLimit == 1) {
        errorMessageEx(1302, "");
        return false;
    }
    if (orders == "") return;

    var params = {
        _b: "aj",
        _a: "baccarat",
        cmd: "placeOrders",
        orders: orders,
        bet_amount: betAmount,
        unique_token: submitTokenArr[table],
        table: table
    };

    if (table && table > 0) {
        var dc = (g_prod_info[table]["ftDC"]);
        if (dc > -2) { //tricks
        } else {
            message("Table " + table + " Closed");
            return;
        }
    }

    var betAmountArr = [];
    for (var j = 0; j < orders.length; j++) {
        betAmountArr.push(orders[j]["type"]);
        betAmountArr.push(orders[j]["amount"]);
    }
    $("#txtHiddenBetAmountPrev" + table).val(betAmountArr);

    blockScreen();
    if (betAmount > $("#txtHiddenBetCredit").val()) {
        unblockScreen();
        errorMessage(1300);
        return;
    }

    ajax(params, function(obj) {
        unblockScreen();
        submitTokenArr[table] = obj['unique_token'];
        if (obj['sts'] != 'OK') {
            if (obj['errcode'] && jsI18N['Error' + obj['errcode']]) {
                errorMessage(obj['errcode']);
            } else {
                message(jsI18N['MSGSubmitFail']);
            }
            return;
        }
        var info = obj['info'];
        $("#spanResultBetAmount_" + t).html(format(betAmount));
        $("#spanResultAcceptedAmount_" + t).html(format(info["accepted_bet"]));
        if (betAmount > info["accepted_bet"]) {
            $("#spanResultAcceptedAmount_" + t).css('color', 'red');
        } else {
            $("#spanResultAcceptedAmount_" + t).css('color', '#ffd200')
        }
        $("#divBetResult_" + t).fadeIn();
        hideBetResultAfterSeconds(t, 2);

        //    var info=obj['info'];
        //    $.prompt("<font size=5 class='greenFont'>"+jsI18N["Table"]+" "+table+"</font><br><br><font size=3>"+jsI18N["BetPromptBetAmount"]+"</font><font size=5>"+format(betAmount)+"</font><br><br><font size=3>"+jsI18N["BetPromptAcceptBet"]+"</font><font "+(betAmount>info["accepted_bet"]?"color=red":"")+" size=5>"+format(info["accepted_bet"])+"</font><br>", {
        //      buttons:{
        //        OK:true
        //      },
        //      prefix:'cleanblue',
        //      top:'40%'
        //    });

        _showBetAmountPrev(flag);
        updateBalance();
        $("input[id^=betval_" + t + "]").val("");
        $("input[id^=betval_" + t + "]").hide();
    });
}

var hideTimeoutArr = [];

function hideBetResultAfterSeconds(table, seconds) {
    if (hideTimeoutArr[table] != undefined && hideTimeoutArr[table] != null) {
        window.clearTimeout(hideTimeoutArr[table]);
    }
    hideTimeoutArr[table] = window.setTimeout(function() {
        $("#divBetResult_" + table).fadeOut();
    }, seconds * 1000);
}

/** 暂不使用 */
/**
function _getProductResult2(result,result_pair,result_big_small) {
	if (!(result>0)) return "";
	var a="<font color='gray'>";
	var b="<font color='red'>";
	var c="</font>";

	var rt="";
	if (result==1) { rt=rt+b+"B"+c+a+"PT"+c+b+"NT"+c; }
	if (result==2) { rt=rt+a+"B"+c+b+"P"+c+a+"T"+c+b+"NT"+c; }
	if (result==3) { rt=rt+a+"BP"+c+b+"T"+c+a+"NT"+c; }
	rt=rt+" ";
	if (result_pair==1) { rt=rt+b+"BP"+c+a+"PPNP"+c+b+"PE"+c; }
	if (result_pair==2) { rt=rt+a+"BP"+c+b+"PP"+c+a+"NP"+c+b+"PE"+c; }
	if (result_pair==3) { rt=rt+b+"BPPP"+c+a+"NP"+c+b+"PE"+c; }
	if (result_pair==4) { rt=rt+a+"BPPP"+c+b+"NP"+c+a+"PE"+c; }
	rt=rt+" ";
	if (result_big_small==7) { rt=rt+b+"BG"+c+a+"SM"+c; }
	if (result_big_small==6) { rt=rt+a+"BG"+c+b+"SM"+c; }
	return rt;
}
*/

function _getHTMLRecent(orders) {
    if (!orders) return "";
    var ss = "";
    var prev = "";
    var t = 0,
        refresh = 0;
    for (var i = 0; i < orders.length && t < 20; i++) {
        var order = orders[i];
        if (order.status == 9) continue;
        var title = getTitleCasinoDragon(order.table_seq, order.shoe, order.game);

        if (title != prev) {
            var flag = order["product_status"] == 2;
            ss += "<tr class='title'><td colspan=3>" + (flag ? "<a href=\"javascript:showProductBaccarat('" + order['remote_id'] + "','" + title + "','" + order["result_detail"] + "','" + order["result"] + "','" + order['close_time'] + "','" + order['status'] + "','" + order['date'] + "','" + order['table_seq'] + "','" + order['shoe'] + "','" + order['game'] + "')\">" : "") + title + (flag ? "</a>" : "") + "</td></tr>";
            prev = title;
            t++;
        }
        ss += "<tr " + ((order["status"] == 2) ? "style='text-decoration: line-through'" : "") + "><td align='center' width=35% nowrap class='txt'>" + jsI18N[orderType[order['type']]] + "</td><td align='right' nowrap class='txt'>" + order['amount'] + "x" + order['odds'] + " =</td><td align='right' nowrap class='txtRight'>&nbsp;";
        ss += (order["status"] == 2) ? format(order["amount"]) : ((order["status"] == 1) ? format(order["return_amount"]) : "???");
        ss += "</td></tr>";
        t++;
        if (order["status"] == 7)
            refresh = 1;
    }
    if (ss != "") ss = "<table id='list' style='font-size:8pt' width=100%>" + ss + "</table>";
    return ss;
}

function updateBalance() {
    var params = {
        _b: "aj",
        _a: "baccarat",
        cmd: "getBalance"
    };
    ajax(params, function(obj) {
        //alert($.toJSON(obj));
        var sts = obj['sts'];
        if (sts != "OK") {
            message(jsI18N['MSGGetDataFail']);
            return;
        }
        var info = obj['info'];
        if (info['UUID'] != null) {
            $("#ftULID").html("<a title='header=[] body=[" + info['UUID'] + "]'>" + info['LOGIN_ID'] + "</a>");
        }
        $("#spanBetCredit").html(format(info["bet_credit"]));
        $("#spanOutstanding").html(format(info["outstanding"]));
        $("#txtHiddenBetCredit").val(info["bet_credit"]);

        var orders = info['orders'];

        $("#secRecent").html(_getHTMLRecent(orders));
        if ($("#spanOutstanding").html() != 0) {
            try {
                window.clearTimeout(tmRO);
            } catch (e) {}
            tmRO = window.setTimeout(function() {
                updateBalance();
            }, 5000);
        }
    });
}

/** 生成视频的flash
 * param table_seq: 台号(1-3)
 * param flagBigTable: 是否大台 1是 0否
 * param flagHall: 是否大厅 1是 0否 (为1时，table_seq无效)
 * param channel: flagHall为0时有效，目前只支持1/2两个频道
 */
function genVideoFlash(tab, flagBigTable, flagHall, channel) {
    if (!videoSetting.setting[tab]) return;
    initVideoCall(tab, 1);
}

function _addEvent() {
    var _eventEnter = function(i) {
        if (bigTable == i) return;
        $("#tabBigTable").show();
        $("div[id^='tabTable']").hide();
        if (bigTable == 0) {
            try {
                for (var x = 1; x <= 3; x++) {
                    if (videoObj[x] != undefined && videoObj[x] != null) {
                        videoObj[x].stop();
                        videoObj[x] = null;
                    }
                }
                thisMovie('objVideo1').stop();
                thisMovie('objVideo2').stop();
                thisMovie('objVideo3').stop();
            } catch (e) {}
        }
        if (thisMovie('objVideo4') && thisMovie('objVideo4').stop) {
            thisMovie('objVideo4').stop();
        }

        $("#divPokerModalShow").hide();
        $("#ftCount4").html("");
        $("#ftDC4").html(jsI18N["Waiting"]);
        $("td[id^=tdPokerPlayer]").html("");
        $("td[id^=tdPokerBanker]").html("");
        $("table[id^=tblPoker]").removeClass("redBackground");
        $("#ftPrevTable").html("");
        $("#ftPrev4").html("");
        $("#ftT4").html(i);
        $("#ftX4").html("?");
        $("#ftY4").html("?");
        //$("#divVideo4").html("");
        $("#spBigTableCount1").show();
        $("#spBigTableCount2").show();
        $("#spBigTableCount3").show();
        $("#spBigTableCount" + i).hide();
        $("#btnBigTable1").parent().removeClass("hover");
        $("#btnBigTable2").parent().removeClass("hover");
        $("#btnBigTable3").parent().removeClass("hover");
        $("#btnBigTable" + i).parent().addClass("hover");
        $("#btnBigTable1").removeClass("current");
        $("#btnBigTable2").removeClass("current");
        $("#btnBigTable3").removeClass("current");
        $("#btnBigTable" + i).addClass("current");
        $("input[id^=btnClearBet]").click();
        _showBetAmountPrev(1, prd_ids[i]);
        enableButton = false;
        if (videoSettingNew != undefined && videoSettingNew != null && videoSettingNew['angle'][i] != undefined) {
            $("#divVideo4").hide();
            $("#divVideoContent4").show();
            var config = {};
            config['server'] = videoSettingNew['server']['url'];
            config['angle'] = videoSettingNew['angle'][i];
            config['play'] = true;

            if (hasTips && availableTips == '1') {
                config['tip'] = {
                    allow: true,
                    chip: videoSettingNew['chip'],
                    tip_text: jsI18N['Tips'],
                    tip_cancel_text: jsI18N['Cancel'],
                    params: {
                        table_seq: i,
                        mrkt: 160,
                        _b: 'aj',
                        _a: 'money',
                        cmd: 'tips'
                    },
                    callback: function() {
                        updateBalance()
                    }
                }
            }
            if (videoObj[4] != undefined && videoObj[4] != null) {
                videoObj[4].destroyNew();
                videoObj[4] = null;
            }

            var player = new OnlineVideo.init(config, 'divVideoContent4', 4);
            videoObj[4] = player;
            //player.play();
            enableButtons();
        } else {
            enableButtons(); //TODO 临时加上这行代码，在手机上由于不支持Flash,会导致大台切换不成功
            $("#divVideoContent4").hide();
            $("#divVideo4").show();
            genVideoFlash(i);
        }
        bigTable = i;
        initBigTableRoad(i);

        //下面的代码是为了实现在小台出结果后，马上切换到大台，大台也能显示结果
        $("#ul_rst_1_4").removeClass('betZoneHeaderResult2');
        $("#ul_rst_2_4").removeClass('betZoneHeaderResult2');
        $("#ul_rst_3_4").removeClass('betZoneHeaderResult2');
        $("#ul_rst_notTie_4").removeClass('betZoneHeaderResult2');
        $("#ul_rstp_1_4").removeClass('betZoneHeaderResult2');
        $("#ul_rstp_2_4").removeClass('betZoneHeaderResult2');
        $("#ul_rstp_3_4").removeClass('betZoneHeaderResult2');
        $("#ul_rstp_4_4").removeClass('betZoneHeaderResult2');
        $("#ul_rstbs_6_4").removeClass('betZoneHeaderResult2');
        $("#ul_rstbs_7_4").removeClass('betZoneHeaderResult2');
        if (g_current_result[i] && g_current_result[i]['rst'] > 0) {
            if (g_current_result[i]['player'] && g_current_result[i]['banker']) _showPoker(g_current_result[i]['player'], g_current_result[i]['banker'], g_current_result[i]['rst']);
            _setTableSetting(i, g_current_result[i]['rst'], g_current_result[i]['rstp'], g_current_result[i]['rstbs']);
        }
    }

    $("#btnEnter1").click(function(e) {
        _eventEnter(1);
    });
    $("#btnEnter2").click(function(e) {
        _eventEnter(2);
    });
    $("#btnEnter3").click(function(e) {
        _eventEnter(3);
    });
    $("#btnBigTable1").click(function(e) {
        if (enableButton) {
            if (bigTable != 1) $("td[id^=td_big_rst]").removeClass("betZoneHeaderResult");
            $("#divBetResult_4").hide();
            _eventEnter(1);
        }

    });
    $("#btnBigTable2").click(function(e) {
        if (enableButton) {
            if (bigTable != 2) $("td[id^=td_big_rst]").removeClass("betZoneHeaderResult");
            $("#divBetResult_4").hide();
            _eventEnter(2);
        }
    });
    $("#btnBigTable3").click(function(e) {
        if (enableButton) {
            if (bigTable != 3) $("td[id^=td_big_rst]").removeClass("betZoneHeaderResult");
            $("#divBetResult_4").hide();
            _eventEnter(3);
        }
    });

    $("#btnRefresh" + 1).click(function(e) {
        disableBtn(this);
        clearSmallTable(1);
    });
    $("#btnRefresh" + 2).click(function(e) {
        disableBtn(this);
        clearSmallTable(2);
    });
    $("#btnRefresh" + 3).click(function(e) {
        disableBtn(this);
        clearSmallTable(3);
    });

    // 给三个小桌的按钮加上响应事件
    $("#btnPlaceBet1_0").click(function(e) {
        disableBtn(this);
        doPlaceBet(1, 0);
    });
    $("#btnClearBet1_0").click(function(e) {
        $("input[id^=betval_1]").val("").hide();
    });
    $("#btnPlaceBet2_0").click(function(e) {
        disableBtn(this);
        doPlaceBet(2, 0);
    });
    $("#btnClearBet2_0").click(function(e) {
        $("input[id^=betval_2]").val("").hide();
    });
    $("#btnPlaceBet3_0").click(function(e) {
        disableBtn(this);
        doPlaceBet(3, 0);
    });
    $("#btnClearBet3_0").click(function(e) {
        $("input[id^=betval_3]").val("").hide();
    });

    // 给大桌的按钮加上响应事件
    $("#btnPlaceBet4_0").click(function(e) {
        if (bigTable > 0) {
            disableBtn(this);
            doPlaceBet(bigTable, 1);
        }
    });
    $("#btnRepeatBet1_0").click(function(e) {
        _getBetAmountPrev(1, 0);
    });
    $("#btnRepeatBet2_0").click(function(e) {
        _getBetAmountPrev(2, 0);
    });
    $("#btnRepeatBet3_0").click(function(e) {
        _getBetAmountPrev(3, 0);
    });
    $("#btnRepeatBet4_0").click(function(e) {
        _getBetAmountPrev(bigTable, 1);
    });
    $("#btnClearBet4_0").click(function(e) {
        $("input[id^=betval_4]").val("").hide();
    });

    //给下注按钮（筹码）加上响应事件
    $("input[id^=btnBetVal]").click(function() {
        var val = $(this).attr("v");
        if (val > 0) $("#txtHiddenAmount").val(val);
        else $("#txtHiddenAmount").val(0);
        $("input[id^=btnBetVal]").removeClass("buttonBet2");
        $("input[id^=" + $(this).attr('id').substr(0, 10) + "]").addClass("buttonBet2");
    });

    // 给所有录入框加上弹出下注协助区事件
    $("div[id^=divBetVal_]").click(function() {
        var input = $(this).find("input");
        if (!$("#txtHiddenAmount").val()) return;
        else if ($("#txtHiddenAmount").val() == 0) {
            input.val(0);
            input.hide();
            return;
        }
        input.val(1 * input.val() + 1 * $("#txtHiddenAmount").val()).show();
    });

    // 在录入框中按回车后，触发Buy按钮

    $(document).keydown(function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
        }
    });
    $(document).keyup(function(e) {
        if (e.keyCode == 13) {
            if (bigTable > 0) {
                $("#btnPlaceBet4_0")[0].click();
            } else {
                $("#btnPlaceBet1_0")[0].click();
                $("#btnPlaceBet2_0")[0].click();
                $("#btnPlaceBet3_0")[0].click();
            }
        }
    });

    $("#btnBack").click(function(e) {
        $("input[id^=betval_1]").hide();
        $("input[id^=betval_2]").hide();
        $("input[id^=betval_3]").hide();
        $("#txtHiddenIsFirst").val(1);
        _showBetAmountPrev(0);
        bigTable = 0;
        $("#tabBigTable").hide();
        $("#divPokerModalShow").hide();
        //$("#divVideo4").html("");
        $("#ftPrevTable").html("");
        $("#ftPrev4").html("");
        $("#ftT4").html("?");
        $("#ftX4").html("?");
        $("#ftY4").html("?");
        $("#ftDC4").html(jsI18N["Waiting"]);
        $("div[id^='tabTable']").show();
        $("#btnRefresh1").click();
        $("#btnRefresh2").click();
        $("#btnRefresh3").click();
        if (thisMovie('objVideo4').stop) {
            thisMovie('objVideo4').stop();
        }
        //		if (navigator.appVersion.indexOf("Chrome") != -1) {
        window.setTimeout(function() {
            initSmallVideo()
        }, 1000);
        //		}
    });

}

function init() {
    var params = {
        _b: "aj",
        _a: "baccarat",
        cmd: "init",
        isIOS: false
    };
    ajax(params, function(obj) {
        //alert($.toJSON(obj));
        var sts = obj['sts'];
        if (sts != "OK") {
            message(jsI18N['MSGInitFail']);
            return;
        }
        var info = obj['info'];
        formatSetting(info.video);
        submitTokenArr = info.unique_token;
        videoSettingNew = info.video_new;
        initSmallVideo();
        _addEvent();
        $("#spanToday").text(info["today"] + " " + info["currency"]);
        var limitMax = info["limit_max"];
        if (info['out_of_winlimit'] == 1) {
            $("#trOverWinLimitTips").show();
            $('input[id^=btnPlaceBet]').unbind();
            betLimit["min"] = 0;
            limitMax = {
                "B": 0,
                "P": 0,
                "T": 0,
                "BP": 0,
                "PP": 0,
                "NT": 0,
                "NP": 0,
                "PE": 0,
                "BG": 0,
                "SM": 0
            };
            //		_getBetLimit(limitMax, 0);
        } else {
            betLimit["min"] = 1 * info["bet_limit_min"];
            betLimitMin = 1 * info["bet_limit_min"];
            //		_getBetLimit(limitMax, 1*info["bet_limit_min"]);
        }
        betLimitMax = limitMax;
        for (var i = 1; i < 4; i++) {
            var betAmountArr = [];
            for (var j = 0; j < betTypeSymbol.length; j++) {
                betAmountArr.push(betTypeSymbol[j]);
                betAmountArr.push("");
            }
            //			$("#txtHiddenBetAmountPrev"+i).val(betAmountArr);
        }
        //   fixBetAid(info["currency"]);
        fixBetAid2(info["currency"]);

        $("#btnBetVal2_1").click();
        updateBalance();
    });
}

function formatSetting(obj) {
    videoSetting = {
        "server": obj.server,
        "setting": {},
        "chip": obj.chip,
        "game": {}
    };
    var bet_credit = obj.bet_credit;
    obj = obj.setting
    for (var i in obj) {
        if (!videoSetting.setting[obj[i].table_seq]) videoSetting.setting[obj[i].table_seq] = {};
        if (!videoSetting.setting[obj[i].table_seq][obj[i].type]) videoSetting.setting[obj[i].table_seq][obj[i].type] = [];
        videoSetting.setting[obj[i].table_seq][obj[i].type].push(obj[i]);
        if (!videoSetting.game[obj[i].table_seq]) videoSetting.game[obj[i].table_seq] = {};
        videoSetting.game[obj[i].table_seq]['market_id'] = mrkt;
        videoSetting.game[obj[i].table_seq]['currency'] = currency;
        videoSetting.game[obj[i].table_seq]['isTips'] = hasTips;
        videoSetting.game[obj[i].table_seq]['available_tips'] = availableTips;
        videoSetting.game[obj[i].table_seq]['table_seq'] = obj[i].table_seq;
        videoSetting.game[obj[i].table_seq]['id'] = SID;
        videoSetting.game[obj[i].table_seq]['bet_credit'] = bet_credit;
    }
}

function initSmallVideo() {
    for (var i = 1; i <= 3; i++) {
        if (videoSettingNew != undefined && videoSettingNew != null && videoSettingNew['angle'][i] != undefined) {
            $("#divVideo" + i).hide();
            $("#divVideoContent" + i).show();
            var config = {};
            config['server'] = videoSettingNew['server']['url'];
            config['angle'] = videoSettingNew['angle'][i];
            if (hasTips && availableTips == '1') {
                config['tip'] = {
                    allow: true,
                    chip: videoSettingNew['chip'],
                    tip_text: jsI18N['Tips'],
                    tip_cancel_text: jsI18N['Cancel'],
                    params: {
                        table_seq: i,
                        mrkt: 160,
                        _b: 'aj',
                        _a: 'money',
                        cmd: 'tips'
                    },
                    callback: function() {
                        updateBalance()
                    }
                }
            }
            if (videoObj[i] != undefined && videoObj[i] != null) {
                videoObj[i].destroyNew();
                videoObj[i] = null;
            }

            var player = new OnlineVideo.init(config, 'divVideoContent' + i, i);
            videoObj[i] = player;
        } else {
            if (!videoSetting.setting[i]) continue;
            $("#divVideoContent" + i).hide();
            $("#divVideo" + i).show();
            initVideoCall(i, 2);
        }
    }
}

function initVideoCall(i, flag) {
    var tab = flag == 1 ? 4 : i,
        time = 0;
    var dc = window.setInterval(function() {
        if (time++ < 10) {
            if (thisMovie('objVideo' + tab).initConfig && thisMovie('objVideo' + tab).start) {
                thisMovie('objVideo' + tab).initConfig(videoSetting.server, videoSetting.setting[i][flag], videoSetting.chip, videoSetting.game[i]);
                thisMovie('objVideo' + tab).start(flag == 1 ? true : false, "enableButtons");
                window.clearInterval(dc);
            }
        } else {
            window.clearInterval(dc);
        }
    }, 1000);
    //  try {
    //    if(time++ < 10) {
    //      thisMovie('objVideo'+tab).initConfig(videoSetting.server,videoSetting.setting[i][flag]);
    //      thisMovie('objVideo'+tab).start(false);
    //    }
    //  } catch(e) {
    //    window.setTimeout(function() {
    //      initVideoCall(i,flag);
    //    },1000);
    //  }
}

function enableButtons() {
    enableButton = true;
}

function initGamesBetLimit() {
    _getBetLimit();
}

function _getBetLimit() {
    $("#divLoading").show();
    var html = "",
        tr = "",
        i18n = {
            "B": "Banker",
            "P": "Player",
            "T": "Tie",
            "BP": "BankerPair",
            "PP": "PlayerPair",
            "NT": "NotTie",
            "NP": "NoPair",
            "PE": "PairExist",
            "BG": "Big",
            "SM": "Small"
        };
    for (var key in betLimitMax) {
        betLimit["max"] = betLimitMax;
        var limit = format2(betLimitMin) + "-" + format2(betLimitMax[key]);
        tr += '<tr align=left><td width=80px>' + jsI18N[i18n[key]] + '</td><td width=120px>' + limit + '</td></tr>';
        //		$("#tdBetLimit_4" + "_" + key).text(limit);
    }
    html += '<table id = "tblMain" width=200px cellspacing="0" cellpadding="0" border=0>' + tr + '</table>';
    $("#divGamesBetLimit").html(html);
    $("#divLoading").hide();
}

function _getBetAmountPrev(table, flag) {
    var t = (flag == 1) ? 4 : table;
    $("input[id^=betval_" + t + "_]").val(0).hide();
    var amountStr = $("#txtHiddenBetAmountPrev" + table).val();
    if (amountStr) {
        var amountArr = amountStr.split(',');
        $("input[id^=betval_" + table + "_]").val("");
        for (var i = 0; i < amountArr.length;) {
            $("#betval_" + t + "_B_" + amountArr[i] + "0").val(amountArr[i + 1]).show();
            i += 2;
        }
    }
}

function _showBetAmountPrev(flag, prdID) {
    if (!prdID) {
        if (!(prd_ids[1] > 0) && !(prd_ids[2] > 0) && !(prd_ids[3] > 0)) return;
        prdID = prd_ids[1] + ',' + prd_ids[2] + ',' + prd_ids[3];
    }
    var params = {
        _b: "aj",
        _a: "baccarat",
        cmd: "getCurrentBetAmount",
        prd_id: prdID
    };
    ajax(params, function(obj) {
        //alert($.toJSON(obj));
        var sts = obj['sts'];
        if (sts != 'OK') {
            alert("Get Data Error");
            return;
        }
        var rs = obj['info']['result'];
        for (var tab = 1; tab < 5; tab++) {
            for (var j = 0; j < betTypeSymbol.length; j++) {
                $("#betAmount_" + tab + "_" + betTypeSymbol[j] + "0").html("");
            }
        }
        if (flag == 1) {
            for (var n = 0; n < rs.length; n++) {
                if (rs[n]['table_seq'] == bigTable) {
                    var r = rs[n];
                    if (1 * r["amount"] > 0) $("#betAmount_4_" + r['type'] + "0").html(format3(r["amount"]));
                }
            }
        } else {
            for (var j = 0; j < rs.length; j++) {
                var t = rs[j];
                if (1 * t["amount"] > 0) $("#betAmount_" + t['table_seq'] + "_" + t['type'] + "0").html(format3(t["amount"]));
            }
        }
    });
}

a_dc = [];
a_x_loaded = new Array(0, 0, 0, 0, 0);
a_y_loaded = new Array(0, 0, 0, 0, 0);
prd_ids = [0, 0, 0, 0];

g_prod_info = [
    [],
    [],
    [],
    []
]; //TODO 全局缓存，当前product info，与页面显示的同步
g_current_result = {
    '1': {
        'rst': 0,
        'rstp': 0,
        'rstbs': 0,
        'result_detail': '',
        'banker': 0,
        'player': 0
    },
    '2': {
        'rst': 0,
        'rstp': 0,
        'rstbs': 0,
        'result_detail': '',
        'banker': 0,
        'player': 0
    },
    3: {
        'rst': 0,
        'rstp': 0,
        'rstbs': 0,
        'result_detail': '',
        'banker': 0,
        'player': 0
    }
};

/**
 * @param table
 * @param x: shoe
 * @param y: game
 * @param rst: result (1 banker win, 2 player win, 3 draw, -1 no result)
 * @param rstp: result of pairs (1 banker pair, 2 player pair, 3 banker&player pair, 4 no pair)
 * @param rstbs
 * @param rst_detail
 * @param prd_id
 */
function processRS(table, x, y, rst, rstp, rstbs, rst_detail, prd_id, closeTime, now, rstLen) {
    g_current_result[table]['rst'] = rst;
    g_current_result[table]['rstp'] = rstp;
    g_current_result[table]['rstbs'] = rstbs;
    g_current_result[table]['rst_detail'] = rst_detail;
    try {
        // games in one shoe should not exceed 66
        if (y > 66) return;
        if (y == 1 && a_y_loaded[table] > 0) {
            $("#btnRefresh" + table)[0].click();
            if (bigTable > 0 && table == bigTable) {
                clearBigTableGrid();
                resetMoveCanvasLocation();
                initBigTableGrid();
            }
            return;
        } else {
            if (a_x_loaded[table] > 0) {
                //OK
            } else {
                if (y != 1) return;
            }
            g_prod_info[table]['ftY'] = y;
            $("#ftY" + table).html("" + y);
            if (table == bigTable) $("#ftY4").html("" + y);
        }
        g_prod_info[table]['ftX'] = x;
        $("#ftX" + table).html("" + x);
        if (table == bigTable) $("#ftX4").html("" + x);
        if (rst > 0) {
            if (x == a_x_loaded[table] && y <= a_y_loaded[table]) {
                return;
            }
            a_x_loaded[table] = x;
            a_y_loaded[table] = y;

            //新路纸
            y--;
            var color = '';
            var row = y % 6,
                col = Math.floor(y / 6),
                text = ''; //露珠

            try {
                var previnfo = "";
                var tableTemp = table;
                if (rst_detail != "") {
                    var rst_detail_ = rst_detail.split(';');
                    var banker = rst_detail_[0].split(',');
                    var player = rst_detail_[1].split(',');
                    var rst_detail1 = jsI18N["BankerAbbr"] + ": " + cards[banker[0]] + " " + cards2[banker[1]] + "," + cards[banker[2]] + " " + cards2[banker[3]];
                    if (banker[4] > 0) rst_detail1 = rst_detail1 + "," + cards[banker[4]] + " " + cards2[banker[5]];
                    var rst_detail2 = jsI18N["PlayerAbbr"] + ": " + cards[player[0]] + " " + cards2[player[1]] + "," + cards[player[2]] + " " + cards2[player[3]];
                    if (player[4] > 0) rst_detail2 = rst_detail2 + "," + cards[player[4]] + " " + cards2[player[5]];

                    if (rst == 1) {
                        rst_detail1 = "<font class='result_detail_card'>" + rst_detail1 + "</font>";
                        text = 'B';
                        color = _COLOR_RED;
                    } else if (rst == 2) {
                        rst_detail2 = "<font class='result_detail_card'>" + rst_detail2 + "</font>";
                        text = 'P';
                        color = _COLOR_BLUE;
                    } else {
                        text = 'T';
                        color = _COLOR_GREEN;
                    }
                    previnfo = "" + jsI18N["ShoeAbbr"] + x + ' ' + jsI18N["GameAbbr"] + (y + 1) + '&nbsp;&nbsp;' + rst_detail2 + "&nbsp;&nbsp;" + rst_detail1;
                }
                g_current_result[table]['player'] = player;
                g_current_result[table]['banker'] = banker;
                if (bigTable > 0) {
                    if (table == bigTable) {
                        $("#ftPrevTable").html(table);
                        _getTableSetting(function() {
                            $("#ftPrev4").html(previnfo);
                            //    _getPoker(player, banker, rst);
                            if ($("#txtHiddenIsFirst").val() == 0 && gMaxResultedProductIDArr[table] == prd_id) {
                                if (player && banker) _showPoker(player, banker, rst);
                                $("li[id^=betAmount_" + table + "_]").text("");
                                $("li[id^=betAmount_4_]").text("");
                                _setTableSetting(table, rst, rstp, rstbs);
                            }
                            $("#ftPrev" + table).html(previnfo);
                            drawBigTableRoad(y, rst, rstp, rst_detail, table);
                        }, tableTemp);
                    }
                } else {
                    _getTableSetting(function() {
                        if ($("#txtHiddenIsFirst").val() == 0 && gMaxResultedProductIDArr[table] == prd_id) {
                            $("li[id^=betAmount_" + table + "_]").text("");
                            $("li[id^=betAmount_4_]").text("");
                            _setTableSetting(table, rst, rstp, rstbs);
                        }
                        $("#ftPrev" + table).html(previnfo);
                        //Plate
                        drawCommonCircle(roadObj[table].ctx_plate, col, row, color, text);
                        if (rstp == 1) drawCommonRect(roadObj[table].ctx_plate, col, row, _COLOR_RED, 1);
                        else if (rstp == 2) drawCommonRect(roadObj[table].ctx_plate, col, row, _COLOR_BLUE, 1);
                        else if (rstp == 3) {
                            drawCommonRect(roadObj[table].ctx_plate, col, row, _COLOR_BLUE, 1);
                            drawCommonRect(roadObj[table].ctx_plate, col, row, _COLOR_RED, 1);
                        }
                        //Big
                        checkAutoMove(roadObj[table].canvas_big, roadObj[table].r_col, y + 2, rstLen);

                        var numText = getResultNum(rst_detail, rst);

                        if (y == 0 && rst == 3) { //当第一个结果为和时的处理方式
                            roadObj[table].r_first_col = -1;
                            roadObj[table].pre_result = 3;
                            return;
                        } else if (roadObj[table].pre_result == rst && roadObj[table].pre_result != 3) { //从第二个结果开始, 只有当第二个结果和上一个结果相等时才跳转到这里
                            if (rst == 3) { //当结果为和时,画标志跳出,不再向下画圈圈
                                if (rstp == 1) drawCommonRect(roadObj[table].ctx_big, roadObj[table].r_col, roadObj[table].r_row, _COLOR_RED, 0);
                                else if (rstp == 2) drawCommonRect(roadObj[table].ctx_big, roadObj[table].r_col, roadObj[table].r_row, _COLOR_BLUE, 0);
                                else if (rstp == 3) {
                                    drawCommonRect(roadObj[table].ctx_big, roadObj[table].r_col, roadObj[table].r_row, _COLOR_BLUE, 0);
                                    drawCommonRect(roadObj[table].ctx_big, roadObj[table].r_col, roadObj[table].r_row, _COLOR_RED, 0);
                                }
                                drawCommonGreenRect(roadObj[table].ctx_big, roadObj[table].r_col, roadObj[table].r_row);
                                return;
                            } else {
                                if (roadObj[table].r_row < r_row_max && !roadObj[table].rArray[roadObj[table].r_row + 1][roadObj[table].r_col] && !roadObj[table].flag_turn_right) { //判断能否往下画圈圈
                                    roadObj[table].rArray[++roadObj[table].r_row][roadObj[table].r_col] = rst; //对应放入结果
                                } else { //不能向下时就往右偏移画圈圈
                                    roadObj[table].flag_turn_right = true;
                                    roadObj[table].rArray[roadObj[table].r_row][++roadObj[table].r_col] = rst;
                                }
                                drawCommonRoundText(roadObj[table].ctx_big, roadObj[table].r_col, roadObj[table].r_row, color, numText);
                                if (rstp == 1) drawCommonRect(roadObj[table].ctx_big, roadObj[table].r_col, roadObj[table].r_row, _COLOR_RED, 0);
                                else if (rstp == 2) drawCommonRect(roadObj[table].ctx_big, roadObj[table].r_col, roadObj[table].r_row, _COLOR_BLUE, 0);
                                else if (rstp == 3) {
                                    drawCommonRect(roadObj[table].ctx_big, roadObj[table].r_col, roadObj[table].r_row, _COLOR_BLUE, 0);
                                    drawCommonRect(roadObj[table].ctx_big, roadObj[table].r_col, roadObj[table].r_row, _COLOR_RED, 0);
                                }
                            }
                        } else if (roadObj[table].pre_result != rst) { //当第一个结果不为和, 还有换行时才跳转到这里
                            if (rst == 3) {
                                if (rstp == 1) drawCommonRect(roadObj[table].ctx_big, roadObj[table].r_col, roadObj[table].r_row, _COLOR_RED, 0);
                                else if (rstp == 2) drawCommonRect(roadObj[table].ctx_big, roadObj[table].r_col, roadObj[table].r_row, _COLOR_BLUE, 0);
                                else if (rstp == 3) {
                                    drawCommonRect(roadObj[table].ctx_big, roadObj[table].r_col, roadObj[table].r_row, _COLOR_BLUE, 0);
                                    drawCommonRect(roadObj[table].ctx_big, roadObj[table].r_col, roadObj[table].r_row, _COLOR_RED, 0);
                                }
                                drawCommonGreenRect(roadObj[table].ctx_big, roadObj[table].r_col, roadObj[table].r_row);
                                return;
                            } else {
                                roadObj[table].r_row = 0;
                                roadObj[table].flag_turn_right = false;
                                if (y != 0) roadObj[table].r_col = ++roadObj[table].r_first_col;
                                drawCommonRoundText(roadObj[table].ctx_big, roadObj[table].r_col, roadObj[table].r_row, color, numText);

                                if (rstp == 1) drawCommonRect(roadObj[table].ctx_big, roadObj[table].r_col, roadObj[table].r_row, _COLOR_RED, 0);
                                else if (rstp == 2) drawCommonRect(roadObj[table].ctx_big, roadObj[table].r_col, roadObj[table].r_row, _COLOR_BLUE, 0);
                                else if (rstp == 3) {
                                    drawCommonRect(roadObj[table].ctx_big, roadObj[table].r_col, roadObj[table].r_row, _COLOR_BLUE, 0);
                                    drawCommonRect(roadObj[table].ctx_big, roadObj[table].r_col, roadObj[table].r_row, _COLOR_RED, 0);
                                }

                                roadObj[table].rArray[roadObj[table].r_row][roadObj[table].r_col] = rst;
                            }
                        }
                        roadObj[table].pre_result = rst; //此条件是第二局以上出现和的情况下不记录为和的结果

                        //此处存储无限制行大路
                        if (roadObj[table].curr_col == roadObj[table].r_col || roadObj[table].flag_turn_right) {
                            roadObj[table].roadCountObj[roadObj[table].curr_col] += 1;
                            roadObj[table].askRoadCountObj[roadObj[table].curr_col] += 1;
                        } else if (roadObj[table].curr_col != roadObj[table].r_col) {
                            roadObj[table].roadCountObj[roadObj[table].r_col] = roadObj[table].row_count;
                            roadObj[table].askRoadCountObj[roadObj[table].r_col] = roadObj[table].row_count; //此处不能直接对对象赋值,因为其中一个改变另一个随之跟着改变
                            roadObj[table].curr_col = roadObj[table].r_col;
                            roadObj[table].row_count = 1;
                        }

                        //****************  画大眼仔, n = const_1_coefficient  *******************//
                        checkAutoMove(roadObj[table].canvas_bigEye, roadObj[table].eye_col, y + 2, rstLen);
                        if ((roadObj[table].r_row > 0 && roadObj[table].curr_col > 0) || (roadObj[table].r_row == 0 && roadObj[table].curr_col > 1)) { //当有结果出现在第二行第二列或者第一行第三列才画
                            roadObj[table].eye_result = commonGetResult(roadObj[table].roadCountObj, roadObj[table].curr_col, roadObj[table].r_row, const_1_coefficient);
                            color = roadObj[table].eye_result == 1 ? _COLOR_BLUE : _COLOR_RED;
                            var dataObj = commonSetLocation(roadObj[table].eye_pre_result, roadObj[table].eye_result, roadObj[table].eye_col, roadObj[table].eye_row, roadObj[table].eye_arr, roadObj[table].eye_flag_turn_right, roadObj[table].eye_index, roadObj[table].eye_first_col);
                            roadObj[table].eye_col = dataObj.col, roadObj[table].eye_row = dataObj.row, roadObj[table].eye_arr = dataObj.arr, roadObj[table].eye_flag_turn_right = dataObj.flag_turn_right, roadObj[table].eye_first_col = dataObj.first_col;
                            roadObj[table].eye_pre_result = roadObj[table].eye_result;
                            roadObj[table].eye_index++;
                            drawCommonRound(roadObj[table].ctx_bigEye, roadObj[table].eye_col, roadObj[table].eye_row, color);
                        }
                        if (roadObj[table].curr_col > 0) {
                            clearSmallAskRoadResultArea(table); //清理预测路纸
                            var askResultPlayer = getAskRoadResult(2, const_1_coefficient, table);
                            var askResultBanker = getAskRoadResult(1, const_1_coefficient, table);
                            drawSmallAskRoadBigEye(askResultPlayer, askResultBanker, table);
                        }

                        //****************  画小路, n = const_1_coefficient * 2  *******************//
                        checkAutoMove(roadObj[table].canvas_small, roadObj[table].small_col, y + 2, rstLen);
                        if ((roadObj[table].r_row > 0 && roadObj[table].curr_col > 1) || (roadObj[table].r_row == 0 && roadObj[table].curr_col > 2)) { //当有结果出现在第二行第三列或者第一行第四列才画
                            roadObj[table].small_result = commonGetResult(roadObj[table].roadCountObj, roadObj[table].curr_col, roadObj[table].r_row, const_1_coefficient * 2);
                            color = roadObj[table].small_result == 1 ? _COLOR_BLUE : _COLOR_RED;
                            var dataObj = commonSetLocation(roadObj[table].small_pre_result, roadObj[table].small_result, roadObj[table].small_col, roadObj[table].small_row, roadObj[table].small_arr, roadObj[table].small_flag_turn_right, roadObj[table].small_index, roadObj[table].small_first_col);
                            roadObj[table].small_col = dataObj.col, roadObj[table].small_row = dataObj.row, roadObj[table].small_arr = dataObj.arr, roadObj[table].small_flag_turn_right = dataObj.flag_turn_right, roadObj[table].small_first_col = dataObj.first_col;
                            roadObj[table].small_pre_result = roadObj[table].small_result;
                            roadObj[table].small_index++;
                            drawCommonFillRound(roadObj[table].ctx_small, roadObj[table].small_col, roadObj[table].small_row, color);
                        }
                        if (roadObj[table].curr_col > 1) {
                            var askResultPlayer = getAskRoadResult(2, const_1_coefficient * 2, table);
                            var askResultBanker = getAskRoadResult(1, const_1_coefficient * 2, table);
                            drawSmallAskRoadSmall(askResultPlayer, askResultBanker, table);
                        }

                        //****************  曱甴路roach, n = const_1_coefficient * 3  *******************//
                        checkAutoMove(roadObj[table].canvas_roach, roadObj[table].roach_col, y + 2, rstLen);

                        if ((roadObj[table].r_row > 0 && roadObj[table].curr_col > 2) || (roadObj[table].r_row == 0 && roadObj[table].curr_col > 3)) { //当有结果出现在第二行第四列或者第一行第五列才画
                            roadObj[table].roach_result = commonGetResult(roadObj[table].roadCountObj, roadObj[table].curr_col, roadObj[table].r_row, const_1_coefficient * 3);
                            color = roadObj[table].roach_result == 1 ? _COLOR_BLUE : _COLOR_RED;
                            var dataObj = commonSetLocation(roadObj[table].roach_pre_result, roadObj[table].roach_result, roadObj[table].roach_col, roadObj[table].roach_row, roadObj[table].roach_arr, roadObj[table].roach_flag_turn_right, roadObj[table].roach_index, roadObj[table].roach_first_col);
                            roadObj[table].roach_col = dataObj.col, roadObj[table].roach_row = dataObj.row, roadObj[table].roach_arr = dataObj.arr, roadObj[table].roach_flag_turn_right = dataObj.flag_turn_right, roadObj[table].roach_first_col = dataObj.first_col;
                            roadObj[table].roach_pre_result = roadObj[table].roach_result;
                            roadObj[table].roach_index++;
                            drawCommonObliqueLine(roadObj[table].ctx_roach, roadObj[table].roach_col, roadObj[table].roach_row, roadObj[table].roach_result);
                        }
                        if (roadObj[table].curr_col > 2) {
                            var askResultPlayer = getAskRoadResult(2, const_1_coefficient * 3, table);
                            var askResultBanker = getAskRoadResult(1, const_1_coefficient * 3, table);
                            drawSmallAskRoadRoach(askResultPlayer, askResultBanker, table);
                        }
                    }, tableTemp);
                }
                if ($("#txtHiddenIsFirst").val() == 0) updateBalance();
            } catch (e) {}
        } else {
            if (rst < 0) {
                var curinfo = "";
                if (closeTime > 0) {
                    var dc = closeTime - now;
                    if (dc > 0) {
                        if (!(g_prod_info[table]['ftDC'] > 0) || !a_dc[table] || Math.abs(g_prod_info[table]['ftDC'] - dc) > 1) {
                            if (a_dc[table]) {
                                try {
                                    window.clearInterval(a_dc[table]);
                                } catch (e) {}
                                try {
                                    a_dc[table] = null;
                                } catch (e) {}
                            }
                            g_prod_info[table]['ftDC'] = dc;
                            $("#ftDC" + table).html(jsI18N["PleaseBet"]);
                            $("#ftCount" + table).removeClass();
                            $("#spBigTableCount" + table).removeClass();
                            if (dc == 10) playSound('baccaratGameSound', 'sound');
                            if (dc > 9) {
                                $("#spBigTableCount" + table).addClass("text_n");
                                $("#ftCount" + table).addClass("text_n");
                            } else {
                                $("#spBigTableCount" + table).addClass("text_y");
                                $("#ftCount" + table).addClass("text_y");
                            }
                            $("#ftCount" + table).html("" + dc);
                            $("#spBigTableCount" + table).html("(" + dc + ")");
                            if (table == bigTable) {
                                $("#ftDC4").html(jsI18N["PleaseBet"]);
                                $("#ftCount4").removeClass();
                                if (dc > 9) {
                                    $("#ftCount4").addClass("text_n");
                                } else {
                                    $("#ftCount4").addClass("text_y");
                                }
                                $("#ftCount4").html("" + dc);
                            }
                            var tm_new = window.setInterval(function() {
                                var old_dc = 1 * g_prod_info[table]['ftDC'];
                                if (old_dc > 0) {
                                    dc = old_dc - 1;
                                    //$("#ftDC"+table).html(jsI18N["PleaseBet"]);
                                    $("#ftCount" + table).removeClass();
                                    $("#spBigTableCount" + table).removeClass();
                                    if (dc == 10)
                                        playSound('baccaratGameSound', 'sound');
                                    if (dc < 10) {
                                        $("#spBigTableCount" + table).addClass("text_y");
                                        $("#ftCount" + table).addClass("text_y");
                                    } else {
                                        $("#spBigTableCount" + table).addClass("text_n");
                                        $("#ftCount" + table).addClass("text_n");
                                    }
                                    $("#ftCount" + table).html("" + dc);
                                    $("#spBigTableCount" + table).html("(" + dc + ")");
                                    g_prod_info[table]['ftDC'] = dc;
                                    if (table == bigTable) {
                                        $("#ftDC4").html(jsI18N["PleaseBet"]);
                                        $("#ftCount4").removeClass();
                                        if (dc < 10) {
                                            $("#ftCount4").addClass("text_y");
                                        } else {
                                            $("#ftCount4").addClass("text_n");
                                        }
                                        $("#ftCount4").html("" + dc);
                                    }
                                } else {
                                    curinfo = jsI18N["StopBet"];
                                    g_prod_info[table]['ftDC'] = old_dc;
                                    $("#ftDC" + table).html("" + curinfo);
                                    $("#ftCount" + table).html("");
                                    $("#spBigTableCount" + table).html("");
                                    if (table == bigTable) {
                                        $("#ftDC4").html("" + curinfo);
                                        $("#ftCount4").html("");
                                    }
                                    try {
                                        window.clearInterval(tm_new);
                                    } catch (e) {}
                                    try {
                                        tm_new = null;
                                    } catch (e) {}
                                }
                            }, 1000);
                            a_dc[table] = tm_new;
                        }
                    } else {
                        dc = jsI18N["Waiting"];
                        g_prod_info[table]['ftDC'] = dc;
                        $("#ftDC" + table).html("" + dc);
                        $("#ftCount" + table).html("");
                        $("#spBigTableCount" + table).html("");
                        if (table == bigTable) {
                            $("#ftDC4").html("" + dc);
                            $("#ftCount4").html("");
                        }
                    }
                }

                //	else{
                //		dc=jsI18N["Waiting"]+"...";
                //		g_prod_info[table]['ftDC']=0;
                //		$("#ftDC"+table).html(""+dc);
                //		$("#ftCount"+table).html("");
                //		if (table==bigTable) $("#ftDC4").html(""+dc);
                //	}
                if (prd_id > 0) prd_ids[table] = prd_id;
            } else {
                if (rst != 0) {
                    //alert("rst="+rst+"?");
                } else {
                    curinfo = jsI18N["Table"] + table + " " + jsI18N["Shoe"] + x + " " + jsI18N["Game"] + y + " Cancelled for " + rst_detail;
                }
            }
            //$("#ftInfo"+table).html(""+curinfo);
        }
    } catch (e) {
        //alert("ErrCode37");
    }

    // 如果新画一个Big，则画对应的BigEye/Small/Roach
    /*_getTableSetting(function(){
      if(_drawRoadBig(table,rst,rstp)){
        _drawRoadBigEye(table);
        _drawRoadSmall(table);
        _drawRoadRoach(table);
      }
    }, table);*/
}

function _titleChangeBG(table, rst, rstp, rstbs) {
    if (bigTable > 0 && bigTable != table) return;
    var titleID = [],
        rstID = '',
        notTieID = '',
        rstpID = '',
        rstbsID = '',
        cla = '',
        cla2 = '',
        t = 0;
    if (bigTable == 0) {
        cla = "betZoneHeaderResult2";
        cla2 = "betZoneHeaderResult3";
        t = table;
        /*		if(rst == 1 || rst == 2) {
			rstID = "ul_rst_"+rst+"_"+table;
			notTieID = "ul_rst_notTie_"+table;
		}
		if(rst == 3) {
			rstID = "ul_rst_3_"+table;
		}
		if(rstp > 0) {
			rstpID = "ul_rstp_"+rstp+"_"+table;
		}
		if(rstbs > 0) {
			rstbsID = "ul_rstbs_"+rstbs+"_"+table;			
		}
                */
    } else if (bigTable > 0 && bigTable == table) {
        cla = "betZoneHeaderResult2";
        cla2 = "betZoneHeaderResult2";
        t = 4;
    }
    if (rst == 1 || rst == 2) {
        rstID = "ul_rst_" + rst + "_" + t;
        notTieID = "ul_rst_notTie_" + t;
    }
    if (rst == 3) {
        rstID = "ul_rst_3_" + t;
    }
    if (rstp > 0) {
        if (rstp == 1 || rstp == 2 || rstp == 3) titleID.push("ul_rstp_3_" + t);
        if (rstp == 3) {
            titleID.push("ul_rstp_1_" + t);
            titleID.push("ul_rstp_2_" + t);
        } else rstpID = "ul_rstp_" + rstp + "_" + t;
    }
    if (rstbs > 0) {
        rstbsID = "ul_rstbs_" + rstbs + "_" + t;
    }
    titleID.push(rstID);
    if (notTieID) titleID.push(notTieID);
    titleID.push(rstpID);
    titleID.push(rstbsID);
    _changeTitleClass(titleID, cla, cla2, 1);
    window.setTimeout(function() {
        _changeTitleClass(titleID, cla, cla2, 0);
    }, 7000);
}

function _changeTitleClass(titleID, cla, cla2, flag) {
    if (titleID.length > 0) {
        for (var i in titleID) {
            var claTemp = cla;
            var tlID = titleID[i];
            if (tlID.substring(0, 9) == "ul_rst_3_" || tlID.substring(0, 14) == "ul_rst_notTie_" || tlID.substring(0, 11) == "ul_rstbs_7_" || tlID.substring(0, 11) == "ul_rstbs_6_") {
                claTemp = cla2;
            }
            $("#" + tlID).removeClass(claTemp);
            if (flag == 1) {
                $("#" + tlID).addClass(claTemp);
            }
        }
    }
}
/*
function _getTableDelay(callback, table) {
  _getTableSetting(callback, table);
}
*/
function _setTableSetting(i, rs, rsp, rsbs) {
    //  _getTableSetting(function(){
    _titleChangeBG(i, rs, rsp, rsbs);
    //  }, i);
}

function _getTableSetting(callback, table) {
    callback();
}

/**
 * 根据结果显示牌
 */
function _getPoker(player, banker, rst) {
    var ieHeight = (navigator.appName.indexOf("Microsoft") != -1) ? "35px" : "39px";
    var style = 'style="filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=1);-webkit-transform:rotate(90deg);-moz-transform:rotate(90deg);"',
        styleAdd = "padding-left: 23px;height:" + ieHeight + ";line-height:" + ieHeight + ";",
        styleAdd2 = "padding-left: 23px;height:35px;line-height:35px;";
    var namePlayer = [],
        nameBanker = [];
    $("#tdPokerPlayerAdd").attr("style", styleAdd).empty();
    $("#tdPokerBankerAdd").attr("style", styleAdd).empty();
    namePlayer.push((1 * player[0] - 1) * 13 + 1 * player[1]);
    namePlayer.push((1 * player[2] - 1) * 13 + 1 * player[3]);
    if (player[4] > 0) {
        $("#tdPokerPlayerAdd").attr("style", styleAdd2).html('<img src="images/poker/' + ((1 * player[4] - 1) * 13 + 1 * player[5]) + '.gif" width="35" ' + style + '/>');
    }
    nameBanker.push((1 * banker[0] - 1) * 13 + 1 * banker[1]);
    nameBanker.push((1 * banker[2] - 1) * 13 + 1 * banker[3]);
    if (banker[4] > 0) {
        $("#tdPokerBankerAdd").attr("style", styleAdd2).html('<img src="images/poker/' + ((1 * banker[4] - 1) * 13 + 1 * banker[5]) + '.gif" width="35" ' + style + '/>');
    }
    for (var i = 0; i < 2; i++) {
        $("#tdPokerPlayer" + i).html('<img src="images/poker/' + namePlayer[i] + '.gif" width="44" height="46" />');
        $("#tdPokerBanker" + i).html('<img src="images/poker/' + nameBanker[i] + '.gif" width="44" height="46" />');
    }
    var rstClassID = {
        1: "#tblPokerBanker",
        2: "#tblPokerPlayer"
    };
    $("table[id^=tblPoker]").removeClass("redBackground");
    $(rstClassID[rst]).addClass("redBackground");
}

//测试代码
//var gameCount = 48, productID = 285788, resultLen = 0;;
////var game = {'shoe':'7','game':'53','result':'1','result_detail':'3,2;1,5','product_id':'285788','close_time':'1412200850'};
//function addNewResult(){
//	if(gameCount > 58)  gameCount = 1;
//	processRS(3,11,gameCount,1,4,7,'3,10,3,12,1,10;4,5,2,9,1,1',productID,'1412200850','',resultLen);
//	gameCount ++;
//	productID ++;
//}
//
//function initResult(){
//	window.setTimeout(function(){
//		resultLen = 1;
//		addNewResult();
//		initResult();
//	},6000);
//}

function mainLoop() {
    var params = {
        _b: "aj",
        _a: "baccarat",
        cmd: "readProductFromMemory",
        x1: a_x_loaded[1],
        y1: a_y_loaded[1],
        x2: a_x_loaded[2],
        y2: a_y_loaded[2],
        x3: a_x_loaded[3],
        y3: a_y_loaded[3]
    };
    ajax(params, function(obj) {
        if (obj.sts != "OK") {
            mainLoop();
            return;
        }
        var info = obj["info"];
        var now = info["t_now"];
        var table = info["table"];
        var resultLen = 0;
        setMaxResultedProductID(table);
        for (var i in table) {
            var data = table[i];
            //      var rs = "", rsp = "", rsbs = "";
            for (var j in data) {
                var game = data[j];
                // game => [$game, $result, $result_pair, $result_big_small, $result_detail, $product_id, $close_time, $shoe]
                if (game[7] != a_x_loaded[i] || Number(game[0]) > a_y_loaded[i]) {
                    if (game[1] > 0) {
                        resultLen = data.length;
                        resultObj[i].push(game);
                    } else resultLen = 0;
                    processRS(i, game[7], Number(game[0]), game[1], game[2], game[3], game[4], game[5], game[6], now, resultLen);
                }
            }
            /*     if(rs > 0) {
                   $("li[id^=betAmount_"+i+"_]").text("");
                   $("li[id^=betAmount_4_]").text("");
                   //		_titleChangeBG(i,rs,rsp,rsbs);
                   _setTableSetting(i,rs,rsp,rsbs);
                 }*/
        }
        if ($("#txtHiddenIsFirst").val() == 1) {
            $("#txtHiddenIsFirst").val(0);
            _showBetAmountPrev(0);
        }
        window.setTimeout(function() {
            mainLoop();
        }, 3000);
    });
}

function setMaxResultedProductID(result) {
    for (var j in result) {
        var rs = result[j];
        for (var k in rs) {
            var row = rs[k];
            if (row[1] > 0 && row[5] * 1 > gMaxResultedProductIDArr[j]) {
                gMaxResultedProductIDArr[j] = row[5] * 1;
            }
        }
    }
}

/**
 * 根据结果显示电子牌
 */
function _showPoker(player, banker, rst) {
    var namePlayer = [],
        nameBanker = [];
    $("#tdPokerModalPlayerAdd").empty();
    $("#tdPokerModalBankerAdd").empty();
    $("#tdPokerModalPlayer").empty();
    $("#tdPokerModalBanker").empty();
    for (var i = 0; i < 4;) {
        namePlayer.push((1 * player[i] - 1) * 13 + 1 * player[i + 1]);
        nameBanker.push((1 * banker[i] - 1) * 13 + 1 * banker[i + 1]);
        i = i + 2;
    }
    $("#tdPokerModalPlayer").html('<img src="images/poker/' + namePlayer[1] + '.gif" width="100" />&nbsp;<img src="images/poker/' + namePlayer[0] + '.gif" width="100" />');
    $("#tdPokerModalBanker").html('<img src="images/poker/' + nameBanker[1] + '.gif" width="100" />&nbsp;<img src="images/poker/' + nameBanker[0] + '.gif" width="100" />');
    if (player[4] > 0) {
        $("#tdPokerModalPlayerAdd").html('<img src="images/poker/' + ((1 * player[4] - 1) * 13 + 1 * player[5]) + '.gif" width="100" />');
    }
    if (banker[4] > 0) {
        $("#tdPokerModalBankerAdd").html('<img src="images/poker/' + ((1 * banker[4] - 1) * 13 + 1 * banker[5]) + '.gif" width="100" />');
    }
    /*var rstClassID = {
      1:"tdPokerModalBanker",
      2:"tdPokerModalPlayer"
    };
    $("td[id^=tdPokerModal]").removeClass("redBackground");
    $('td[id^='+rstClassID[rst]+']').addClass("redBackground");*/
    _myModal("divPokerModalShow");
    window.setTimeout(function() {
        $("#divPokerModalShow").hide();
    }, 7000);
}

function _myModal(id, modalStyle) {
    if (!modalStyle) {
        modalStyle = {
            "top": 92,
            "width": "450px",
            "height": "240px",
            "left": "10"
        };
    }
    var style, top, left, width, height;
    _setModalStyle(modalStyle);
    _clickModal();

    function _clickModal() {
        var idMain = document.getElementById('main');
        var h = (idMain.offsetHeight > document.body.clientHeight) ? idMain.offsetHeight : document.body.clientHeight;
        var w = (idMain.offsetWidth > document.body.clientWidth) ? idMain.offsetWidth : document.body.clientWidth;
        w = (document.body.scrollWidth > w) ? (document.body.scrollWidth) : (w) //IE6,FireFox和Google中的计算方法不同
        style = 'position: absolute; top: ' + top + 'px; left: ' + left + 'px; width: ' + width + '; overflow-y: auto; height: ' + height + ';z-index:200';
        $("#" + id).attr('style', style);
        $("#" + id).show();
    }
    //点击关闭Modal
    $("#aCloseModal").click(function() {
        $("#" + id).hide();
    });
    //设置属性，如果为空则采用默认值
    function _setModalStyle(modalStyle) {
        top = modalStyle.top;
        width = modalStyle.width;
        height = modalStyle.height;
        left = modalStyle.left;
    }
}

var isAnimate = false,
    dragging = false,
    speed = 0,
    lastX, round_space, curX;
var roadObj = {},
    resultObj = {},
    bigRoadObj = {},
    askRoadColorObj = {
        1: _COLOR_BLUE,
        2: _COLOR_RED
    };

function initCanvas() {
    //小窗区域
    initSmallTable();
    initBigTable();
}

/*----------------------------------------------大窗口路纸专用------------------------------------------- */
function initBigTableRoad(table) {
    var resultArr = resultObj[table]; // resultObj 因为在切换大桌的时候还需要用到因此不能清掉
    //拿完结果之后 roadObj 不相关其他桌的可以全部清掉 因为3张大桌全部共用其中某一个桌的就可以了, 拿来用时都要先重置掉里面的所有参数
    resetSmallTable(table, false);
    resetMoveCanvasLocation();
    clearBigTableGrid();
    initBigTableGrid();
    for (var i in resultArr) {
        // game => [$game, $result, $result_pair, $result_big_small, $result_detail, $product_id, $close_time, $shoe]
        var game = resultArr[i],
            index = game[0],
            result = game[1],
            result_pair = game[2],
            result_detail = game[4];
        index--;
        drawBigTableRoad(index, result, result_pair, result_detail, table);
    }
}

function drawBigTableRoad(i, result, result_pair, result_detail, table) {
    var row = i % 6,
        col = Math.floor(i / 6),
        color = '',
        text = '';
    //画圆  露珠
    if (result == 1) {
        color = _COLOR_RED;
        text = 'B';
        drawCircle(bigRoadObj.ctx_circle, col, row, color, text);
        if (result_pair == 1) drawCircleRect(bigRoadObj.ctx_circle, col, row, _COLOR_RED, 1);
        else if (result_pair == 2) drawCircleRect(bigRoadObj.ctx_circle, col, row, _COLOR_BLUE, 0);
        else if (result_pair == 3) {
            drawCircleRect(bigRoadObj.ctx_circle, col, row, _COLOR_BLUE, 0);
            drawCircleRect(bigRoadObj.ctx_circle, col, row, _COLOR_RED, 1);
        }
    } else if (result == 2) {
        color = _COLOR_BLUE;
        text = 'P';
        drawCircle(bigRoadObj.ctx_circle, col, row, color, text);
        if (result_pair == 1) drawCircleRect(bigRoadObj.ctx_circle, col, row, _COLOR_RED, 1);
        else if (result_pair == 2) drawCircleRect(bigRoadObj.ctx_circle, col, row, _COLOR_BLUE, 0);
        else if (result_pair == 3) {
            drawCircleRect(bigRoadObj.ctx_circle, col, row, _COLOR_BLUE, 0);
            drawCircleRect(bigRoadObj.ctx_circle, col, row, _COLOR_RED, 1);
        }
    } else {
        text = 'T';
        drawCircle(bigRoadObj.ctx_circle, col, row, _COLOR_GREEN, text);
        if (result_pair == 1) drawCircleRect(bigRoadObj.ctx_circle, col, row, _COLOR_RED, 1);
        else if (result_pair == 2) drawCircleRect(bigRoadObj.ctx_circle, col, row, _COLOR_BLUE, 0);
        else if (result_pair == 3) {
            drawCircleRect(bigRoadObj.ctx_circle, col, row, _COLOR_BLUE, 0);
            drawCircleRect(bigRoadObj.ctx_circle, col, row, _COLOR_RED, 1);
        }
    }
    //处理大路到临界列自动移动
    if (roadObj[table].r_col > 32) autoMove(bigRoadObj.canvas_round, -121, -121, 1000);
    //画大圈圈  大路
    var numText = getResultNum(result_detail, result);

    if (i == 0 && result == 3) { //当第一个结果为和时的处理方式
        roadObj[table].r_first_col = -1;
        roadObj[table].pre_result = 3;
        return;
    } else if (roadObj[table].pre_result == result && roadObj[table].pre_result != 3) { //从第二个结果开始, 只有当第二个结果和上一个结果相等时才跳转到这里
        if (result == 3) { //当结果为和时,画标志跳出,不再向下画圈圈
            if (result_pair == 1) drawRoundRect(bigRoadObj.ctx_round, roadObj[table].r_col, roadObj[table].r_row, _COLOR_RED, 1);
            else if (result_pair == 2) drawRoundRect(bigRoadObj.ctx_round, roadObj[table].r_col, roadObj[table].r_row, _COLOR_BLUE, 0);
            else if (result_pair == 3) {
                drawRoundRect(bigRoadObj.ctx_round, roadObj[table].r_col, roadObj[table].r_row, _COLOR_BLUE, 0);
                drawRoundRect(bigRoadObj.ctx_round, roadObj[table].r_col, roadObj[table].r_row, _COLOR_RED, 1);
            }
            drawRoundGreenRect(bigRoadObj.ctx_round, roadObj[table].r_col, roadObj[table].r_row);
            return;
        }
        if (roadObj[table].r_row < r_row_max && !roadObj[table].rArray[roadObj[table].r_row + 1][roadObj[table].r_col] && !roadObj[table].flag_turn_right) { //判断能否往下画圈圈
            roadObj[table].rArray[++roadObj[table].r_row][roadObj[table].r_col] = result; //对应放入结果
        } else { //不能向下时就往右偏移画圈圈
            roadObj[table].flag_turn_right = true;
            roadObj[table].rArray[roadObj[table].r_row][++roadObj[table].r_col] = result;
        }
        drawBigRound(bigRoadObj.ctx_round, roadObj[table].r_col, roadObj[table].r_row, color, numText);
        if (result_pair == 1) drawRoundRect(bigRoadObj.ctx_round, roadObj[table].r_col, roadObj[table].r_row, _COLOR_RED, 1);
        else if (result_pair == 2) drawRoundRect(bigRoadObj.ctx_round, roadObj[table].r_col, roadObj[table].r_row, _COLOR_BLUE, 0);
        else if (result_pair == 3) {
            drawRoundRect(bigRoadObj.ctx_round, roadObj[table].r_col, roadObj[table].r_row, _COLOR_BLUE, 0);
            drawRoundRect(bigRoadObj.ctx_round, roadObj[table].r_col, roadObj[table].r_row, _COLOR_RED, 1);
        }
    } else if (roadObj[table].pre_result != result) { //当第一个结果不为和, 还有换行时才跳转到这里
        if (result == 3) {
            if (result_pair == 1) drawRoundRect(bigRoadObj.ctx_round, roadObj[table].r_col, roadObj[table].r_row, _COLOR_RED, 1);
            else if (result_pair == 2) drawRoundRect(bigRoadObj.ctx_round, roadObj[table].r_col, roadObj[table].r_row, _COLOR_BLUE, 0);
            else if (result_pair == 3) {
                drawRoundRect(bigRoadObj.ctx_round, roadObj[table].r_col, roadObj[table].r_row, _COLOR_BLUE, 0);
                drawRoundRect(bigRoadObj.ctx_round, roadObj[table].r_col, roadObj[table].r_row, _COLOR_RED, 1);
            }
            drawRoundGreenRect(bigRoadObj.ctx_round, roadObj[table].r_col, roadObj[table].r_row);
            return;
        }
        roadObj[table].r_row = 0;
        roadObj[table].flag_turn_right = false;
        if (i != 0) roadObj[table].r_col = ++roadObj[table].r_first_col;
        drawBigRound(bigRoadObj.ctx_round, roadObj[table].r_col, roadObj[table].r_row, color, numText);
        if (result_pair == 1) drawRoundRect(bigRoadObj.ctx_round, roadObj[table].r_col, roadObj[table].r_row, _COLOR_RED, 1);
        else if (result_pair == 2) drawRoundRect(bigRoadObj.ctx_round, roadObj[table].r_col, roadObj[table].r_row, _COLOR_BLUE, 0);
        else if (result_pair == 3) {
            drawRoundRect(bigRoadObj.ctx_round, roadObj[table].r_col, roadObj[table].r_row, _COLOR_BLUE, 0);
            drawRoundRect(bigRoadObj.ctx_round, roadObj[table].r_col, roadObj[table].r_row, _COLOR_RED, 1);
        }
        roadObj[table].rArray[roadObj[table].r_row][roadObj[table].r_col] = result;
    }
    roadObj[table].pre_result = result;

    //此处存储无限制行大路
    if (roadObj[table].curr_col == roadObj[table].r_col || roadObj[table].flag_turn_right) {
        roadObj[table].roadCountObj[roadObj[table].curr_col] += 1;
        roadObj[table].askRoadCountObj[roadObj[table].curr_col] += 1;
    } else if (roadObj[table].curr_col != roadObj[table].r_col) {
        roadObj[table].roadCountObj[roadObj[table].r_col] = roadObj[table].row_count;
        roadObj[table].askRoadCountObj[roadObj[table].r_col] = roadObj[table].row_count; //此处不能直接对对象赋值,因为其中一个改变另一个随之跟着改变
        roadObj[table].curr_col = roadObj[table].r_col;
        roadObj[table].row_count = 1;
    }

    //处理大眼仔、小路到临界列自动移动
    if (roadObj[table].eye_col > 32 || roadObj[table].small_col > 32) autoMove(bigRoadObj.canvas_roundL, -60, -60, 1000);
    //****************  画大眼仔, n = const_1_coefficient  *******************//
    if ((roadObj[table].r_row > 0 && roadObj[table].curr_col > 0) || (roadObj[table].r_row == 0 && roadObj[table].curr_col > 1)) { //当有结果出现在第二行第二列或者第一行第三列才画大眼仔
        roadObj[table].eye_result = commonGetResult(roadObj[table].roadCountObj, roadObj[table].curr_col, roadObj[table].r_row, const_1_coefficient);
        color = roadObj[table].eye_result == 1 ? _COLOR_BLUE : _COLOR_RED;
        var dataObj = commonSetLocation(roadObj[table].eye_pre_result, roadObj[table].eye_result, roadObj[table].eye_col, roadObj[table].eye_row, roadObj[table].eye_arr, roadObj[table].eye_flag_turn_right, roadObj[table].eye_index, roadObj[table].eye_first_col);
        roadObj[table].eye_col = dataObj.col, roadObj[table].eye_row = dataObj.row, roadObj[table].eye_arr = dataObj.arr, roadObj[table].eye_flag_turn_right = dataObj.flag_turn_right, roadObj[table].eye_first_col = dataObj.first_col;
        roadObj[table].eye_pre_result = roadObj[table].eye_result;
        roadObj[table].eye_index++;
        drawSmallRound(bigRoadObj.ctx_roundL, roadObj[table].eye_col, roadObj[table].eye_row, color);
    }
    if (roadObj[table].curr_col > 0) {
        clearBigAskRoadResultArea(); //清理预测路纸  //TODO
        var askResultPlayer = getAskRoadResult(2, const_1_coefficient, table);
        var askResultBanker = getAskRoadResult(1, const_1_coefficient, table);
        drawAskRoadBigEye(askResultPlayer, askResultBanker);
    }

    //****************  画小路, n = const_1_coefficient * 2 *******************//
    if ((roadObj[table].r_row > 0 && roadObj[table].curr_col > 1) || (roadObj[table].r_row == 0 && roadObj[table].curr_col > 2)) { //当有结果出现在第二行第三列或者第一行第四列才画大眼仔
        roadObj[table].small_result = commonGetResult(roadObj[table].roadCountObj, roadObj[table].curr_col, roadObj[table].r_row, const_1_coefficient * 2);
        color = roadObj[table].small_result == 1 ? _COLOR_BLUE : _COLOR_RED;
        var dataObj = commonSetLocation(roadObj[table].small_pre_result, roadObj[table].small_result, roadObj[table].small_col, roadObj[table].small_row, roadObj[table].small_arr, roadObj[table].small_flag_turn_right, roadObj[table].small_index, roadObj[table].small_first_col);
        roadObj[table].small_col = dataObj.col, roadObj[table].small_row = dataObj.row, roadObj[table].small_arr = dataObj.arr, roadObj[table].small_flag_turn_right = dataObj.flag_turn_right, roadObj[table].small_first_col = dataObj.first_col;
        roadObj[table].small_pre_result = roadObj[table].small_result;
        roadObj[table].small_index++;
        drawSmallCircle(bigRoadObj.ctx_roundL, roadObj[table].small_col, roadObj[table].small_row + 6, color);
    }
    if (roadObj[table].curr_col > 1) {
        var askResultPlayer = getAskRoadResult(2, const_1_coefficient * 2, table);
        var askResultBanker = getAskRoadResult(1, const_1_coefficient * 2, table);
        drawAskRoadSmall(askResultPlayer, askResultBanker);
    }

    //处理曱甴路到临界列自动移动
    if (roadObj[table].roach_col > 32) autoMove(bigRoadObj.canvas_roundR, -60, -60, 1000);
    //****************  画曱甴路roach, n = const_1_coefficient * 3 ********************//
    if ((roadObj[table].r_row > 0 && roadObj[table].curr_col > 2) || (roadObj[table].r_row == 0 && roadObj[table].curr_col > 3)) { //当有结果出现在第二行第四列或者第一行第五列才画大眼仔
        roadObj[table].roach_result = commonGetResult(roadObj[table].roadCountObj, roadObj[table].curr_col, roadObj[table].r_row, const_1_coefficient * 3);
        var dataObj = commonSetLocation(roadObj[table].roach_pre_result, roadObj[table].roach_result, roadObj[table].roach_col, roadObj[table].roach_row, roadObj[table].roach_arr, roadObj[table].roach_flag_turn_right, roadObj[table].roach_index, roadObj[table].roach_first_col);
        roadObj[table].roach_col = dataObj.col, roadObj[table].roach_row = dataObj.row, roadObj[table].roach_arr = dataObj.arr, roadObj[table].roach_flag_turn_right = dataObj.flag_turn_right, roadObj[table].roach_first_col = dataObj.first_col;
        roadObj[table].roach_pre_result = roadObj[table].roach_result;
        roadObj[table].roach_index++;
        bigRoadObj.ctx_roundR.drawImage(roachImgObj['small'][roadObj[table].roach_result], 2 + roadObj[table].roach_col * 7.5, 1.5 + (roadObj[table].roach_row + 6) * 7.5);
    }
    if (roadObj[table].curr_col > 2) {
        var askResultPlayer = getAskRoadResult(2, const_1_coefficient * 3, table);
        var askResultBanker = getAskRoadResult(1, const_1_coefficient * 3, table);
        drawAskRoadRoach(askResultPlayer, askResultBanker);
    }
}

function initBigTable() {
    //左边区域  绘制背景
    bigRoadObj.canvas_circle = document.getElementById('circle');
    bigRoadObj.ctx_circle = bigRoadObj.canvas_circle.getContext("2d");
    //右边上区域
    bigRoadObj.canvas_round = document.getElementById('round');
    bigRoadObj.ctx_round = bigRoadObj.canvas_round.getContext("2d");
    //右边左下区域
    bigRoadObj.canvas_roundL = document.getElementById('roundL');
    bigRoadObj.ctx_roundL = bigRoadObj.canvas_roundL.getContext("2d");
    //右边右下区域
    bigRoadObj.canvas_roundR = document.getElementById('roundR');
    bigRoadObj.ctx_roundR = bigRoadObj.canvas_roundR.getContext("2d");

    bigRoadObj.canvas_ask = document.getElementById('askRoad');
    bigRoadObj.ctx_ask = bigRoadObj.canvas_ask.getContext("2d");
    bigRoadObj.ctx_ask.fillStyle = _COLOR_WHITE;
    bigRoadObj.ctx_ask.fillRect(0, 0, bigRoadObj.canvas_ask.width, bigRoadObj.canvas_ask.height);
    drawAskRoadArea();

    addEvent(bigRoadObj.canvas_round);
    addEvent(bigRoadObj.canvas_roundL);
    addEvent(bigRoadObj.canvas_roundR);
}

function resetMoveCanvasLocation() {
    bigRoadObj.canvas_round.style.left = '-1px';
    bigRoadObj.canvas_roundL.style.left = '0px';
    bigRoadObj.canvas_roundR.style.left = '-1px';
}

function initBigTableGrid() {
    bigRoadObj.ctx_circle.fillStyle = _COLOR_WHITE; // 背景颜色
    bigRoadObj.ctx_circle.fillRect(0, 0, bigRoadObj.canvas_circle.width - 2, bigRoadObj.canvas_circle.height);
    bigRoadObj.ctx_circle.lineWidth = 1; // 格子边框大小

    bigRoadObj.ctx_round.fillStyle = _COLOR_WHITE;
    bigRoadObj.ctx_round.fillRect(2, 0, bigRoadObj.canvas_round.width - 1, bigRoadObj.canvas_round.height);
    bigRoadObj.ctx_round.lineWidth = 1;

    bigRoadObj.ctx_roundL.fillStyle = _COLOR_WHITE;
    bigRoadObj.ctx_roundL.fillRect(2, 0, bigRoadObj.canvas_roundL.width - 1, bigRoadObj.canvas_roundL.height);
    bigRoadObj.ctx_roundL.lineWidth = 1;

    bigRoadObj.ctx_roundR.fillStyle = _COLOR_WHITE;
    bigRoadObj.ctx_roundR.fillRect(2, 0, bigRoadObj.canvas_roundR.width - 1, bigRoadObj.canvas_roundR.height);
    bigRoadObj.ctx_roundR.lineWidth = 1;

    drawCircleGrid(bigRoadObj.ctx_circle);
    drawRoundGrid(bigRoadObj.ctx_round);
    drawRoundButtomGrid(bigRoadObj.ctx_roundL);
    drawRoundButtomGrid(bigRoadObj.ctx_roundR);
}

function clearBigTableGrid() {
    //清空画布
    bigRoadObj.ctx_circle.clearRect(0, 0, bigRoadObj.canvas_circle.width, bigRoadObj.canvas_circle.height);
    bigRoadObj.ctx_round.clearRect(0, 0, bigRoadObj.canvas_round.width, bigRoadObj.canvas_round.height);
    bigRoadObj.ctx_roundL.clearRect(0, 0, bigRoadObj.canvas_roundL.width, bigRoadObj.canvas_roundL.height);
    bigRoadObj.ctx_roundR.clearRect(0, 0, bigRoadObj.canvas_roundR.width, bigRoadObj.canvas_roundR.height);
    clearBigAskRoadResultArea();
}

/*----------------------------------------------公共函数------------------------------------------------ */
function addEvent(canvas) {
    canvas.addEventListener("mousedown", onMouseDown, false);
    if (canvas.id == 'circle' || canvas.id == 'round' || canvas.id == 'roundL' || canvas.id == 'roundR') canvas.addEventListener("mousemove", onMouseMove, false);
    else canvas.addEventListener("mousemove", onMouseMoveCommon, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener("mouseout", onMouseUp, false);
}

function onMouseDown(evt) {
    dragging = true;
    //在一开始保存点击的位置。
    lastX = evt.clientX;
    curX = evt.target.style.left; //获取当前canvas的位置
    curX = curX.substr(0, curX.length - 2) * 1; //转换为数字
    //设置鼠标样式。
    evt.target.style.cursor = "move";
}

function onMouseMove(evt) {
    if (dragging && !isAnimate) {
        isAnimate = true;
        //计算改变的像素值
        var dx = evt.clientX - lastX;
        lastX = evt.clientX;
        if (dx < -25) dx = -25;
        else if (dx > 25) dx = 25;
        speed += 1 * dx;
        round_space = (evt.target.id == 'round' ? _ROUND_PANEL_WIDTH : _ROUND_LR_PANEL_WIDTH) - evt.target.width;
        if (speed >= -1) speed = evt.target.id == 'roundL' ? 0 : -1; //-1, 0, -1
        else if (speed <= round_space) speed = round_space;
        $('#' + evt.target.id).animate({
            left: speed
        }, 30, function() {
            isAnimate = false;
        });
    }
}

function onMouseUp(evt) {
    evt.target.style.cursor = "default";
    dragging = false;
}

//处理路纸到临界列自动移动
function autoMove(canvas, distance, maxDistance, delay) {
    var first_space = canvas.style.left;
    distance = distance < maxDistance ? maxDistance : distance;
    if (first_space != distance + 'px') {
        isAnimate = true;
        $('#' + canvas.id).animate({
            left: distance
        }, delay, function() {
            isAnimate = false;
        });
    }
}

function getResultNum(str, rst) {
    if (rst > 2) return;
    var detailArr = str.split(';'),
        arr = detailArr[rst - 1].split(',');
    var numText = formatBaccaratNum(arr[1]) + formatBaccaratNum(arr[3]) + formatBaccaratNum(arr[5]);
    numText = numText.toString();
    if (numText.length > 1) numText = numText.substr(1);
    return numText;
}

function formatBaccaratNum(num) {
    return num > 9 ? 0 : Number(num);
}

/*----------------------------------------------小窗口路纸专用------------------------------------------- */
function initSmallTable() {
    initFormatSmallTableObj();
    initRoadBtnSelect();

    drawSmallTableGrid(1);
    drawSmallTableGrid(2);
    drawSmallTableGrid(3);

    addSmallTableEvent(1);
    addSmallTableEvent(2);
    addSmallTableEvent(3);
}

function initFormatSmallTableObj() {
    for (var i = 1; i < 4; i++) {
        var tableObj = {};
        //大路
        tableObj.r_col = 0;
        tableObj.r_row = 0;
        tableObj.r_first_col = 0;
        tableObj.flag_turn_right = false;
        //大眼仔
        tableObj.eye_col = 0;
        tableObj.eye_row = 0;
        tableObj.eye_result = 0;
        tableObj.eye_pre_result = 0;
        tableObj.eye_flag_turn_right = false;
        tableObj.eye_index = 0;
        tableObj.eye_first_col = 0;
        //小路
        tableObj.small_col = 0;
        tableObj.small_row = 0;
        tableObj.small_result = 0;
        tableObj.small_pre_result = 0;
        tableObj.small_flag_turn_right = false;
        tableObj.small_index = 0;
        tableObj.small_first_col = 0;
        //曱甴路
        tableObj.roach_col = 0;
        tableObj.roach_row = 0;
        tableObj.roach_result = 0;
        tableObj.roach_pre_result = 0;
        tableObj.roach_flag_turn_right = false;
        tableObj.roach_index = 0;
        tableObj.roach_first_col = 0;

        tableObj.row_count = 1;
        tableObj.curr_col = -1;
        tableObj.roadCountObj = {};
        tableObj.askRoadCountObj = {};

        tableObj.pre_result = 0;
        tableObj.rArray = [];
        tableObj.eye_arr = [];
        tableObj.small_arr = [];
        tableObj.roach_arr = [];

        tableObj.rArray = init2DimensionArray(6, r_col_max);
        tableObj.eye_arr = init2DimensionArray(6, r_col_max);
        tableObj.small_arr = init2DimensionArray(6, r_col_max);
        tableObj.roach_arr = init2DimensionArray(6, r_col_max);

        //小窗口
        tableObj.canvas_plate = document.getElementById('Plate' + i);
        tableObj.ctx_plate = tableObj.canvas_plate.getContext("2d");

        tableObj.canvas_big = document.getElementById('Big' + i);
        tableObj.ctx_big = tableObj.canvas_big.getContext("2d");

        tableObj.canvas_bigEye = document.getElementById('BigEye' + i);
        tableObj.ctx_bigEye = tableObj.canvas_bigEye.getContext("2d");

        tableObj.canvas_small = document.getElementById('Small' + i);
        tableObj.ctx_small = tableObj.canvas_small.getContext("2d");

        tableObj.canvas_roach = document.getElementById('Roach' + i);
        tableObj.ctx_roach = tableObj.canvas_roach.getContext("2d");

        tableObj.canvas_ask = document.getElementById('AskRoad' + i);
        tableObj.ctx_ask = tableObj.canvas_ask.getContext("2d");

        roadObj[i] = tableObj;

        var arr = [];
        resultObj[i] = arr; //此对象要来装载各桌的结果
    }
}

function initRoadBtnSelect() {
    $('#btnRoad1_1').addClass("buttonRoadSelect");
    $('#btnRoad2_1').addClass("buttonRoadSelect");
    $('#btnRoad3_1').addClass("buttonRoadSelect");
    //Table1
    $("a[id^=btnRoad1]").click(function() {
        $("a[id^=btnRoad1]").removeClass("buttonRoadSelect");
        var btn = $("a[id=" + $(this).attr('id').substr(0, 10) + "]");
        btn.addClass("buttonRoadSelect");
        $('div[id^=divRoad1]').hide();
        $('#divRoad1_' + $(this).attr('id').substr(9, 10)).show();
    });
    //Table2
    $("a[id^=btnRoad2]").click(function() {
        $("a[id^=btnRoad2]").removeClass("buttonRoadSelect");
        var btn = $("a[id=" + $(this).attr('id').substr(0, 10) + "]");
        btn.addClass("buttonRoadSelect");
        $('div[id^=divRoad2]').hide();
        $('#divRoad2_' + $(this).attr('id').substr(9, 10)).show();
    });
    //Table3
    $("a[id^=btnRoad3]").click(function() {
        $("a[id^=btnRoad3]").removeClass("buttonRoadSelect");
        var btn = $("a[id=" + $(this).attr('id').substr(0, 10) + "]");
        btn.addClass("buttonRoadSelect");
        $('div[id^=divRoad3]').hide();
        $('#divRoad3_' + $(this).attr('id').substr(9, 10)).show();
    });
}

function checkAutoMove(canvas, col, curGame, rstLen) {
    if (bigTable > 0) return;
    if (rstLen > 1 && curGame == rstLen && col > 9) {
        autoMove(canvas, (Math.floor(col / 2) - 3) * _SMALL_AUTO_MOVE_DISTANCE, _SMALL_AUTO_MOVE_DISTANCE_MAX, _SMALL_AUTO_MOVE_TIME);
    } else if (rstLen == 1 && col > 9) {
        autoMove(canvas, (Math.floor(col / 2) - 3) * _SMALL_AUTO_MOVE_DISTANCE, _SMALL_AUTO_MOVE_DISTANCE_MAX, _SMALL_AUTO_MOVE_TIME);
    }
}

function onMouseMoveCommon(evt) {
    if (dragging) {
        //计算改变的像素值
        var dx = evt.clientX - lastX; //evt.offsetX || evt.layerX || evt.clientX
        lastX = evt.clientX;
        if (dx < -35) dx = -35;
        else if (dx > 35) dx = 35;
        curX += 1 * dx;
        if (curX >= 0) curX = 0;
        else if (curX <= -650) curX = -650;
        evt.target.style.left = curX + 'px';
    }
}

function clearSmallTable(table) {
    resetSmallTable(table, true);
    roadObj[table].ctx_plate.clearRect(0, 0, roadObj[table].canvas_plate.width, roadObj[table].canvas_plate.height);
    roadObj[table].ctx_big.clearRect(0, 0, roadObj[table].canvas_big.width, roadObj[table].canvas_big.height);
    roadObj[table].ctx_bigEye.clearRect(0, 0, roadObj[table].canvas_bigEye.width, roadObj[table].canvas_bigEye.height);
    roadObj[table].ctx_small.clearRect(0, 0, roadObj[table].canvas_small.width, roadObj[table].canvas_small.height);
    roadObj[table].ctx_roach.clearRect(0, 0, roadObj[table].canvas_roach.width, roadObj[table].canvas_roach.height);
    clearSmallAskRoadArea(table);
    resetSmallMoveCanvasLocation(table);
    drawSmallTableGrid(table);
}

function resetSmallTable(table, bol) {
    roadObj[table].r_col = 0;
    roadObj[table].r_row = 0;
    roadObj[table].r_first_col = 0;
    roadObj[table].flag_turn_right = false;
    //大眼仔
    roadObj[table].eye_col = 0;
    roadObj[table].eye_row = 0;
    roadObj[table].eye_result = 0;
    roadObj[table].eye_pre_result = 0;
    roadObj[table].eye_flag_turn_right = false;
    roadObj[table].eye_index = 0;
    roadObj[table].eye_first_col = 0;
    //小路
    roadObj[table].small_col = 0;
    roadObj[table].small_row = 0;
    roadObj[table].small_result = 0;
    roadObj[table].small_pre_result = 0;
    roadObj[table].small_flag_turn_right = false;
    roadObj[table].small_index = 0;
    roadObj[table].small_first_col = 0;
    //曱甴路
    roadObj[table].roach_col = 0;
    roadObj[table].roach_row = 0;
    roadObj[table].roach_result = 0;
    roadObj[table].roach_pre_result = 0;
    roadObj[table].roach_flag_turn_right = false;
    roadObj[table].roach_index = 0;
    roadObj[table].roach_first_col = 0;

    roadObj[table].row_count = 1;
    roadObj[table].curr_col = -1;
    roadObj[table].roadCountObj = {};
    roadObj[table].askRoadCountObj = {};

    roadObj[table].pre_result = 0;
    roadObj[table].rArray = [];
    roadObj[table].eye_arr = [];
    roadObj[table].small_arr = [];
    roadObj[table].roach_arr = [];

    roadObj[table].rArray = init2DimensionArray(6, r_col_max);
    roadObj[table].eye_arr = init2DimensionArray(6, r_col_max);
    roadObj[table].small_arr = init2DimensionArray(6, r_col_max);
    roadObj[table].roach_arr = init2DimensionArray(6, r_col_max);

    if (bol) {
        resultObj[table] = [];

        a_x_loaded[table] = 0;
        a_y_loaded[table] = 0;
        g_prod_info[table] = [];
        $("#ftY" + table).html("?");
        $("#txtHiddenIsFirst").val(1);
    }
}

function resetSmallMoveCanvasLocation(table) {
    roadObj[table].canvas_big.style.left = '0px';
    roadObj[table].canvas_bigEye.style.left = '0px';
    roadObj[table].canvas_small.style.left = '0px';
    roadObj[table].canvas_roach.style.left = '0px';
}

function drawSmallTableGrid(table) {
    drawCommonGrid(roadObj[table].ctx_plate, 11);
    drawCommonGrid(roadObj[table].ctx_big, 42);
    drawCommonGrid(roadObj[table].ctx_bigEye, 42);
    drawCommonGrid(roadObj[table].ctx_small, 42);
    drawCommonGrid(roadObj[table].ctx_roach, 42);
    drawCommonAskArea(table);
}

function addSmallTableEvent(table) {
    addEvent(roadObj[table].canvas_big);
    addEvent(roadObj[table].canvas_bigEye);
    addEvent(roadObj[table].canvas_small);
    addEvent(roadObj[table].canvas_roach);
}

function drawCommonGrid(ctx_common, grid_cols) {
    ctx_common.fillStyle = _COLOR_WHITE; // 背景颜色
    ctx_common.fillRect(0, 0, _SMALL_COMMON_PANEL_WIDTH - 2, _SMALL_COMMON_PANEL_HEIGHT);
    ctx_common.lineWidth = 1; // 格子边框大小

    var grid_rows = 6,
        grid_width = 21,
        rect_width = grid_cols * grid_width,
        rect_height = 130;
    ctx_common.strokeStyle = _COLOR_GRID; // 格子颜色
    ctx_common.beginPath(); // 开始边框描绘
    for (var row = 0; row <= grid_cols; row++) { // 画竖线
        var x = 3.5 + row * grid_width;
        ctx_common.moveTo(x, 3);
        ctx_common.lineTo(x, rect_height);
    }
    for (var col = 0; col <= grid_rows; col++) { // 画横线
        var y = 3.5 + col * grid_width;
        ctx_common.moveTo(3, y);
        ctx_common.lineTo(rect_width + 4, y);
    }
    ctx_common.stroke();
    ctx_common.closePath();
}

function drawCommonCircle(ctx_common, col, row, circleColor, circleText) {
    ctx_common.fillStyle = circleColor;
    ctx_common.beginPath();
    ctx_common.arc(14 + col * 21, 14 + row * 21, 9, 0, Math.PI * 2, true);
    ctx_common.fill();

    ctx_common.font = "14px Verdana"; //16px Georgia
    ctx_common.fillStyle = _COLOR_WHITE;
    ctx_common.fillText(circleText, 9.5 + col * 21, 19 + row * 21);
    ctx_common.closePath();
}

function drawCommonRoundText(ctx_common, col, row, roundColor, roundText) {
    ctx_common.strokeStyle = roundColor;
    ctx_common.lineWidth = 2;
    ctx_common.beginPath();
    ctx_common.arc(14 + col * 21, 14 + row * 21, 7.5, 0, Math.PI * 2, true);
    ctx_common.stroke();

    ctx_common.font = "12px Arial"; //16px Georgia
    ctx_common.fillStyle = roundColor;
    ctx_common.fillText(roundText, 9.5 + col * 21, 19 + row * 21);
    ctx_common.closePath();
}

function drawCommonRound(ctx_common, col, row, roundColor) {
    ctx_common.strokeStyle = roundColor;
    ctx_common.lineWidth = 2;
    ctx_common.beginPath();
    ctx_common.arc(14 + col * 21, 14 + row * 21, 7.5, 0, Math.PI * 2, true);
    ctx_common.stroke();
    ctx_common.closePath();
}

function drawCommonFillRound(ctx_common, col, row, roundColor) {
    ctx_common.fillStyle = roundColor;
    ctx_common.beginPath();
    ctx_common.arc(14 + col * 21, 14 + row * 21, 7.5, 0, Math.PI * 2, true);
    ctx_common.fill();
    ctx_common.closePath();
}

function drawCommonObliqueLine(context, col, row, rst) {
    context.drawImage(roachImgObj['big'][rst], 8 + col * 21, 8 + row * 21);
}

function drawCommonRect(ctx_common, col, row, rectColor, bolY) {
    var startX = rectColor == _COLOR_RED ? 18 : 6;
    ctx_common.fillStyle = rectColor;
    ctx_common.fillRect(startX + col * 21, 13 * bolY + 5 + row * 21, 4.5, 4.5);
    ctx_common.lineWidth = 1;
    ctx_common.strokeStyle = _COLOR_WHITE;
    ctx_common.strokeRect(startX - 0.5 + col * 21, 13 * bolY + 4.5 + row * 21, 5, 5);
    ctx_common.closePath();
}

function drawCommonGreenRect(ctx_common, col, row) {
    ctx_common.fillStyle = _COLOR_WHITE;
    ctx_common.fillRect(4 + col * 21, 18.5 + row * 21, 19, 5);
    ctx_common.fillStyle = _COLOR_GREEN;
    ctx_common.fillRect(5 + col * 21, 20 + row * 21, 18, 3);
    ctx_common.closePath();
}

function drawAskRoadArea() {
    bigRoadObj.ctx_ask.font = 'bold 15px Arial'; //18px Georgia
    bigRoadObj.ctx_ask.fillStyle = '#ff6600';
    bigRoadObj.ctx_ask.textAlign = 'center';
    bigRoadObj.ctx_ask.beginPath();
    bigRoadObj.ctx_ask.fillText(jsI18N['NextGame'], 94, 16);

    bigRoadObj.ctx_ask.font = '18px Arial';
    bigRoadObj.ctx_ask.fillStyle = _COLOR_BLUE;
    bigRoadObj.ctx_ask.arc(20, 34, 12, 0, Math.PI * 2, true);
    bigRoadObj.ctx_ask.fill();
    bigRoadObj.ctx_ask.fillStyle = _COLOR_WHITE;
    bigRoadObj.ctx_ask.fillText('P', 20, 40);
    bigRoadObj.ctx_ask.closePath();

    bigRoadObj.ctx_ask.fillStyle = _COLOR_RED;
    bigRoadObj.ctx_ask.beginPath();
    bigRoadObj.ctx_ask.arc(20, 60, 12, 0, Math.PI * 2, true);
    bigRoadObj.ctx_ask.fill();
    bigRoadObj.ctx_ask.fillStyle = _COLOR_WHITE;
    bigRoadObj.ctx_ask.fillText('B', 20, 66);

    bigRoadObj.ctx_ask.font = 'bold 12px Arial';
    bigRoadObj.ctx_ask.textAlign = 'left';
    bigRoadObj.ctx_ask.fillStyle = '#362700';
    var playerTxt = jsI18N['Player'] == 'Player' ? 'PLAYER' : jsI18N['Player'];
    var bankerTxt = jsI18N['Banker'] == 'Banker' ? 'BANKER' : jsI18N['Banker'];
    bigRoadObj.ctx_ask.fillText(playerTxt, 45, 38);
    bigRoadObj.ctx_ask.fillText(bankerTxt, 45, 64);
    bigRoadObj.ctx_ask.closePath();
}

function clearBigAskRoadResultArea() {
    bigRoadObj.ctx_ask.clearRect(100, 19, bigRoadObj.canvas_ask.width - 100, bigRoadObj.canvas_ask.height - 19);
    bigRoadObj.ctx_ask.fillStyle = _COLOR_WHITE;
    bigRoadObj.ctx_ask.fillRect(100, 19, bigRoadObj.canvas_ask.width - 100, bigRoadObj.canvas_ask.height - 19);
}

function drawAskRoadBigEye(rst1, rst2) {
    bigRoadObj.ctx_ask.lineWidth = 2;
    bigRoadObj.ctx_ask.strokeStyle = askRoadColorObj[rst1];
    bigRoadObj.ctx_ask.beginPath();
    bigRoadObj.ctx_ask.arc(115, 34, 8, 0, Math.PI * 2, true);
    bigRoadObj.ctx_ask.stroke();
    bigRoadObj.ctx_ask.closePath();

    bigRoadObj.ctx_ask.strokeStyle = askRoadColorObj[rst2];
    bigRoadObj.ctx_ask.beginPath();
    bigRoadObj.ctx_ask.arc(115, 60, 8, 0, Math.PI * 2, true);
    bigRoadObj.ctx_ask.stroke();
    bigRoadObj.ctx_ask.closePath();
}

function drawAskRoadSmall(rst1, rst2) {
    bigRoadObj.ctx_ask.fillStyle = askRoadColorObj[rst1];
    bigRoadObj.ctx_ask.beginPath();
    bigRoadObj.ctx_ask.arc(145, 34, 8, 0, Math.PI * 2, true);
    bigRoadObj.ctx_ask.fill();
    bigRoadObj.ctx_ask.closePath();

    bigRoadObj.ctx_ask.fillStyle = askRoadColorObj[rst2];
    bigRoadObj.ctx_ask.beginPath();
    bigRoadObj.ctx_ask.arc(145, 60, 8, 0, Math.PI * 2, true);
    bigRoadObj.ctx_ask.fill();
    bigRoadObj.ctx_ask.closePath();
}

function drawAskRoadRoach(rst1, rst2) {
    bigRoadObj.ctx_ask.drawImage(roachImgObj['big'][rst1], 165, 27);

    bigRoadObj.ctx_ask.drawImage(roachImgObj['big'][rst2], 165, 53);
}

function getAskRoadResult(askResult, n, table) {
    var result = 0;
    if (roadObj[table].pre_result == askResult) {
        roadObj[table].askRoadCountObj[roadObj[table].curr_col] = roadObj[table].askRoadCountObj[roadObj[table].curr_col] + 1;
        result = commonGetResult(roadObj[table].askRoadCountObj, roadObj[table].curr_col, roadObj[table].r_row + 1, n);
        roadObj[table].askRoadCountObj[roadObj[table].curr_col] = roadObj[table].askRoadCountObj[roadObj[table].curr_col] - 1; //还原结果
    } else {
        roadObj[table].askRoadCountObj[roadObj[table].curr_col + 1] = 1;
        result = commonGetResult(roadObj[table].askRoadCountObj, roadObj[table].curr_col + 1, 0, n);
        roadObj[table].askRoadCountObj[roadObj[table].curr_col + 1] = 0;
    }
    return result;
}

//小台
function drawCommonAskArea(table) {
    roadObj[table].ctx_ask.fillStyle = _COLOR_WHITE; // 背景颜色
    roadObj[table].ctx_ask.fillRect(0, 0, roadObj[1].canvas_ask.width, roadObj[1].canvas_ask.height);

    roadObj[table].ctx_ask.font = '18px Arial';
    roadObj[table].ctx_ask.textAlign = 'center';
    roadObj[table].ctx_ask.fillStyle = _COLOR_BLUE;
    roadObj[table].ctx_ask.arc(90, 20, 12, 0, Math.PI * 2, true);
    roadObj[table].ctx_ask.fill();
    roadObj[table].ctx_ask.fillStyle = _COLOR_WHITE;
    roadObj[table].ctx_ask.fillText('P', 90, 26);
    roadObj[table].ctx_ask.closePath();

    roadObj[table].ctx_ask.fillStyle = _COLOR_RED;
    roadObj[table].ctx_ask.beginPath();
    roadObj[table].ctx_ask.arc(150, 20, 12, 0, Math.PI * 2, true);
    roadObj[table].ctx_ask.fill();
    roadObj[table].ctx_ask.fillStyle = _COLOR_WHITE;
    roadObj[table].ctx_ask.fillText('B', 150, 26);

    roadObj[table].ctx_ask.font = 'bold 12px Arial';
    roadObj[table].ctx_ask.fillStyle = '#362700';
    var playerTxt = jsI18N['Player'] == 'Player' ? 'PLAYER' : jsI18N['Player'];
    var bankerTxt = jsI18N['Banker'] == 'Banker' ? 'BANKER' : jsI18N['Banker'];
    roadObj[table].ctx_ask.fillText(playerTxt, 89, 50);
    roadObj[table].ctx_ask.fillText(bankerTxt, 149, 50);
    roadObj[table].ctx_ask.closePath();
}

function clearSmallAskRoadArea(table) {
    roadObj[table].ctx_ask.clearRect(0, 0, roadObj[table].canvas_ask.width, roadObj[table].canvas_ask.height);
}

function clearSmallAskRoadResultArea(table) {
    roadObj[table].ctx_ask.clearRect(70, 56, 110, 75);
    roadObj[table].ctx_ask.fillStyle = _COLOR_WHITE;
    roadObj[table].ctx_ask.fillRect(70, 56, 110, 75);
}

function drawSmallAskRoadBigEye(rst1, rst2, table) {
    roadObj[table].ctx_ask.lineWidth = 2;
    roadObj[table].ctx_ask.strokeStyle = askRoadColorObj[rst1];
    roadObj[table].ctx_ask.beginPath();
    roadObj[table].ctx_ask.arc(90, 70, 8, 0, Math.PI * 2, true);
    roadObj[table].ctx_ask.stroke();
    roadObj[table].ctx_ask.closePath();

    roadObj[table].ctx_ask.strokeStyle = askRoadColorObj[rst2];
    roadObj[table].ctx_ask.beginPath();
    roadObj[table].ctx_ask.arc(150, 70, 8, 0, Math.PI * 2, true);
    roadObj[table].ctx_ask.stroke();
    roadObj[table].ctx_ask.closePath();
}

function drawSmallAskRoadSmall(rst1, rst2, table) {
    roadObj[table].ctx_ask.fillStyle = askRoadColorObj[rst1];
    roadObj[table].ctx_ask.beginPath();
    roadObj[table].ctx_ask.arc(90, 95, 8, 0, Math.PI * 2, true);
    roadObj[table].ctx_ask.fill();
    roadObj[table].ctx_ask.closePath();

    roadObj[table].ctx_ask.fillStyle = askRoadColorObj[rst2];
    roadObj[table].ctx_ask.beginPath();
    roadObj[table].ctx_ask.arc(150, 95, 8, 0, Math.PI * 2, true);
    roadObj[table].ctx_ask.fill();
    roadObj[table].ctx_ask.closePath();
}

function drawSmallAskRoadRoach(rst1, rst2, table) {
    roadObj[table].ctx_ask.drawImage(roachImgObj['big'][rst1], 84, 110);

    roadObj[table].ctx_ask.drawImage(roachImgObj['big'][rst2], 144, 110);
}