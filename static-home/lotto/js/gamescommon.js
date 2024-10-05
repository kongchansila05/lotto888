function refreshPart(cmd, self) {
    var port = $(self);
    port.hide();
    var mrktAj = {
        150: 'keno',
        160: 'baccarat',
        170: 'dragon',
        210: 'sedie',
        220: 'fish',
        221: 'shr_fish',
        230: 'sicbo',
        231: 'shr_sicbo',
        240: 'baibuu',
        250: 'ngauham',
        270: 'abc',
        290: 'three',
        300: 'txc',
        310: 'doden',
        320: 'animal',
        330: 'caribbean',
        400: 'fanTan',
        420: 'e_dragon',
        500: 'cockfight',
        560: 'monkey',
        570: 'balloon',
        590: 'mole',
        610: 'pingpong'
    };
    var _a = mrktAj[mrkt];
    var params = {
        _a: _a,
        _b: 'aj',
        cmd: cmd
    };
    ajax(params, function(obj) {
        if (obj.sts != 'OK') {
            alert("gamescommon.js refreshPart failed");
            return;
        }
        var info = obj.info;
        if (cmd == 'getRecentOrders') {
            var orders = info.orders;
            $("#secRecent").html(_getHTMLRecent(orders));
        } else if (cmd == 'getCredit') {
            $("#spanBetCredit").text(format(info.bet_credit));
            $("#spanOutstanding").text(format(info.outstanding));
            if (_a != "keno") $("#txtHiddenBetCredit").val(info.bet_credit);
        }
        port.show();
    })
}


// -------------------------  Keno Start  --------------------------------

function getKenoGameTitle(productID, time) {
    return "#" + productID + "&nbsp;" + time.substring(time.length - 8, time.length - 3);
}

function showProductKeno(title, sum, result) {
    //  var flash = _getHTMLFlashKenoResult(title,sum,result);
    //  _showSnapshot(title,80,780,386,flash);

    var divKenoSnapshot = $('<div></div>');
    $('body').append(divKenoSnapshot);
    divKenoSnapshot.html('<canvas id="kenoCanvas" width="777" height="356" style="border: 1px solid #000000;"></canvas>');
    divKenoSnapshot.load('./?_a=keno&_s=' + SID + '&cmd=kenoResult', {
        game: title,
        detail: result
    });
    _showSnapshot(title, 80, 780, 386, divKenoSnapshot.html());
}

function _getHTMLFlashKenoResult(title, sum, result) {
    var ret = "";
    var odds = _getKenoOdds();
    ret = '<object id="kenoResult" name="kenoResult" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,45,0" width="780" height="355" align="middle" >';
    ret = ret + '<param name="allowScriptAccess" value="sameDomain" />';
    ret = ret + '<param name="movie" value="keno_result.swf?' + __vers.swf.keno_rst + '" />';
    ret = ret + '<param name="flashVars" value="title=' + title + '&sum=' + sum + '&result=' + result + '&odds=' + odds + '&lang=' + lang + '&lang_ver=' + __vers.lang.swf + '" />';
    ret = ret + '<param name="quality" value="high" />';
    ret = ret + '<param name="wmode" value="opague">';
    ret = ret + '<embed name="kenoResult" id="kenoResult" src="keno_result.swf?' + __vers.swf.keno_rst + '" flashVars="lang=' + lang + '&lang_ver=' + __vers.lang.swf + '&title=' + title + '&sum=' + sum + '&result=' + result + '&odds=' + odds + '" align="middle" quality="high" wmode="opaque" allowscriptaccess="sameDomain" width="779" height="355" swliveconnect="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
    ret = ret + '</object>';
    return ret;
}

function _getKenoOdds() {
    // tmp
    return "1.950,1.950,1.950,1.950,3.700,3.700,3.700,3.700,9.200,4.600,2.300,4.600,9.200,2.000,2.700,3.800,3.800,2.700,2.000,5.000,1.600,4.000,15.000,5.000,1.600,4.000,15.000,5.000,1.600,4.000,15.000,5.000,1.600,4.000,15.000,5.000,1.600,4.000,15.000,5.000,1.600,4.000,15.000,5.000,1.600,4.000,15.000,5.000,1.600,4.000,15.000";
}

// -------------------------  Keno End  --------------------------------



// -------------------------  Baccarat Start  --------------------------------


function getTitleCasinoDragon(table, shoe, game) {
    return jsI18N["TableAbbr"] + table + "&nbsp;" + jsI18N["ShoeAbbr"] + shoe + "&nbsp;" + jsI18N["GameAbbr"] + game;
}

function showProductBaccarat(id, prod, rst_detail, rst, dt, status, date, table_seq, shoe, game) {
    var productResultBaccarat = status == 4 ? "Cancelled" : _getProductResultBaccarat(rst, rst_detail);
    var title = "Snapshot: [" + dt + "] " + prod + " " + productResultBaccarat;
    date = date.replace(/\-/g, "");
    var img = status == 4 ? "<div class='tag_cancelled'></div>" : "";
    //if(id>=5000000)
    img += "<img id='imgSnapshot' border=0 height=100% width=100% src='" + snapshotApi + "&mrkt=160" + "&date=" + date + "&table_seq=" + table_seq + "&shoe=" + shoe + "&game=" + game + "' />";
    //else img += "<img id='imgSnapshot' border=0 height=100% width=100% src='"+"snapshot.php?f="+screendump +"&rnd="+Math.random()+"' />";
    _showSnapshot(title, 80, 640, 480, img);
}

function _getProductResultBaccarat(result, detail) {
    if (!detail || detail == "" || detail > 0) return "";
    try {
        var rst_detail_ = detail.split(';');
        var banker = rst_detail_[0].split(',');
        var player = rst_detail_[1].split(',');
        var rst_detail1 = jsI18N["BankerAbbr"] + ": " + cards[banker[0]] + cards2[banker[1]] + "," + cards[banker[2]] + cards2[banker[3]];
        if (banker[4] > 0) rst_detail1 = rst_detail1 + "," + cards[banker[4]] + cards2[banker[5]];
        if (result == 1) {
            rst_detail1 = "<font style='border:1px solid blue;'>" + rst_detail1 + "</font>";
        }
        var rst_detail2 = jsI18N["PlayerAbbr"] + ": " + cards[player[0]] + cards2[player[1]] + "," + cards[player[2]] + cards2[player[3]];
        if (player[4] > 0) rst_detail2 = rst_detail2 + "," + cards[player[4]] + cards2[player[5]];
        if (result == 2) {
            rst_detail2 = "<font style='border:1px solid blue;'>" + rst_detail2 + "</font>";
        }
        var ttl = "" + '&nbsp;' + rst_detail2 + "&nbsp;&nbsp;" + rst_detail1;
        return ttl;
    } catch (e) {
        return "";
    }
    return "";
}


// -------------------------  Baccarat End  --------------------------------


// -------------------------  Dragon Start  --------------------------------


function showProductDragon(id, prod, rst_detail, rst, dt, status, date, table_seq, shoe, game) {
    var productResultDragon = status == 4 ? "Cancelled" : _getProductResultDragon(rst, rst_detail);
    var title = "Snapshot: [" + dt + "] " + prod + " " + productResultDragon;
    var img = status == 4 ? "<div class='tag_cancelled'></div>" : "";
    date = date.replace(/\-/g, "");
    img += "<img id='imgSnapshot' border=0 height=100% width=100% src='" + snapshotApi + "&mrkt=170&date=" + date + "&table_seq=" + table_seq + "&shoe=" + shoe + "&game=" + game + "' />";
    _showSnapshot(title, 80, 640, 480, img);
}

function _getProductResultDragon(result, detail) {
    if (!detail || detail == "" || detail > 0) return "";

    try {
        var rst_detail_ = detail.split(';');
        var banker = rst_detail_[0].split(',');
        var player = rst_detail_[1].split(',');
        var rst_detail1 = jsI18N["TigerAbbr"] + ": " + cards[banker[0]] + cards2[banker[1]];
        if (result == 1) {
            rst_detail1 = "<font style='border:1px solid blue;'>" + rst_detail1 + "</font>";
        }
        var rst_detail2 = jsI18N["DragonAbbr"] + ": " + cards[player[0]] + cards2[player[1]];
        if (result == 2) {
            rst_detail2 = "<font style='border:1px solid blue;'>" + rst_detail2 + "</font>";
        }
        var ttl = "" + '&nbsp;' + rst_detail2 + "&nbsp;&nbsp;" + rst_detail1;
        return ttl;
    } catch (e) {
        return "";
    }
    return "";
}

// -------------------------  Dragon End  --------------------------------


// -------------------------  BaiBuu Start  --------------------------------

function showBaiBuuPoker(rst, rsDetail, rsJackpot, closeTime, sn) {
    $("#divSnapshot").attr('style', 'z-index:10;background:#19431e;width:618px');
    var title = "",
        content = "";
    var rsI18n = {
        1: jsI18N.Banker,
        2: jsI18N.Player,
        3: jsI18N.Tie
    };
    var clBanker = {
        0: 'pokerSmall',
        1: 'pokerSmall',
        2: 'pokerBig',
        3: 'pokerBig'
    };
    var clPlayer = {
        0: 'pokerBig',
        1: 'pokerBig',
        2: 'pokerSmall',
        3: 'pokerSmall'
    };
    var clPoker = {
        0: 'row',
        1: 'row',
        2: 'row2',
        3: 'rowBig'
    };
    rst = rst.split(',');
    var jackpot = rsJackpot.split(';');
    var closeTimeTemp = closeTime.split(" ");
    var dateTemp = closeTimeTemp[0].split("-");
    title = '[' + dateTemp[1] + dateTemp[2] + '#' + fillZero(sn, 4) + ' ' + closeTimeTemp[1] + '] ' + jsI18N.Result + ': ' + rsI18n[rst[0]] + ' ' + rsI18n[rst[1]] + ' ' + rsI18n[rst[2]];
    var str = [],
        detail = rsDetail.split(';');
    for (var i = 0; i < 4; i++) {
        var dt = detail[i].split(',');
        var cl = (i == 0 ? clBanker : clPlayer);
        var flag = jackpot[i];
        if (flag > 1) {
            cl = clPoker;
        } else {
            if (i == 0) dt = [dt[4], dt[5], dt[6], dt[7], dt[0], dt[1], dt[2], dt[3]];
        }
        str[i] = '<div class="pokers"><div class="' + cl[0] + '"><span class="poker' + dt[1] + '_' + dt[0] + '" style="background-position:left top;"></span></div><div class="' + cl[1] + '"><span class="poker' + dt[3] + '_' + dt[2] + '" style="background-position:left top;"></span></div><div class="' + cl[2] + '"><span class="poker' + dt[5] + '_' + dt[4] + '"></span></div><div class="' + cl[3] + '"><span class="poker' + dt[7] + '_' + dt[6] + '"></span></div></div>';
    }
    content = '<table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td colspan=3 style="text-align:center;padding-top:8px;">' + str[0] + '</td></tr><tr><td class="showSnapshot"><div class="result">' + rsI18n[rst[0]] + (rst[0] == 3 ? '' : ' 01') + '</div>' + str[1] + '</td><td class="showSnapshot"><div class="result">' + rsI18n[rst[1]] + (rst[1] == 3 ? '' : ' 02') + '</div>' + str[2] + '</td><td class="showSnapshot"><div class="result">' + rsI18n[rst[2]] + (rst[2] == 3 ? '' : ' 03') + '</div>' + str[3] + '</td></tr>';
    _showSnapshot(title, 280, 618, 368, content);
}

// -------------------------  BaiBuu End  --------------------------------


// -------------------------  ABC Start  --------------------------------

function showABCPoker(rst, rsDetail, pair, closeTime, sn) {
    $("#divSnapshot").attr('style', 'z-index:10;background:#19431e;');
    var title = "",
        content = "";
    var rsI18n = {
        1: 'A',
        2: 'B',
        3: 'C',
        4: 'Tie'
    };
    var rsPair = {
        0: "",
        1: 'Yes',
        2: 'No'
    };
    var closeTimeTemp = closeTime.split(" ");
    var dateTemp = closeTimeTemp[0].split("-");
    title = '[' + dateTemp[1] + dateTemp[2] + '#' + fillZero(sn, 4) + ' ' + closeTimeTemp[1] + '] ';
    var str = "",
        detail = rsDetail.split(';');
    for (var i = 0; i < 2; i++) {
        var dt = detail[i].split(',');
        str += '<div class="pokersABC"><div class=""><span class="pokerABC' + dt[1] + '_' + dt[0] + '" id="porker_margin' + '_' + i + '"></span></div></div>';
    }
    str += '<div class="result_pair">' + jsI18N.Result + ': ' + rsI18n[rst] + '&nbsp;&nbsp;&nbsp;&nbsp;Pair: ' + rsPair[pair] + '</div>';
    content = '<table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td colspan=3 style="text-align:center;padding-top:60px;"><div class="showPokerAll">' + str + '</div></td></tr>';
    _showSnapshot(title, 280, 480, 290, content);
}

// -------------------------  ABC End  --------------------------------


// -------------------------  NgauHam Start  --------------------------------

function showNgauHamPoker(rst, rsDetail, rsJackpot, closeTime, sn) {
    $("#divSnapshot").attr('style', 'z-index:10;background:#19431e;width:618px');
    var title = "",
        content = "";
    var rsI18n = {
        1: jsI18N.Banker,
        2: jsI18N.Player,
        3: jsI18N.Tie
    };
    rst = rst.split(',');
    var closeTimeTemp = closeTime.split(" ");
    var dateTemp = closeTimeTemp[0].split("-");
    title = '[' + dateTemp[1] + dateTemp[2] + '#' + fillZero(sn, 4) + ' ' + closeTimeTemp[1] + '] ' + jsI18N.Result + ': ' + rsI18n[rst[0]] + ' ' + rsI18n[rst[1]] + ' ' + rsI18n[rst[2]];
    var str = [],
        detail = rsDetail.split(';');
    var clPoker1 = ['first', 'two', 'three', 'four', 'five'];
    var clPoker0 = ['five', 'four', 'three', 'two', 'first'];
    for (var i = 0; i < 4; i++) {
        var dt = detail[i].split(',');
        var tmp = 0;
        for (var j = 5; j < 10;) {
            if (dt[j] > 9) tmp += 10;
            else tmp += 1 * dt[j];
            j += 2;
        }
        var flag = tmp % 10 == 0 ? 0 : 1;
        var cl = flag > 0 ? 'pokersInPlatoon' : 'pokersAcquiescence';
        var clPoker = clPoker1;
        if (i == 0) {
            dt = [dt[8], dt[9], dt[6], dt[7], dt[4], dt[5], dt[2], dt[3], dt[0], dt[1]];
            clPoker = clPoker0;
        }
        str[i] = (i == 0 ? '<div class="pokerArea">' : '') + '<div class="' + cl + '"><div class="' + clPoker[0] + '"><span class="poker' + dt[1] + '_' + dt[0] + '"></span></div><div class="' + clPoker[1] + '"><span class="poker' + dt[3] + '_' + dt[2] + '"></span></div><div class="' + clPoker[2] + '"><span class="poker' + dt[5] + '_' + dt[4] + '"></span></div><div class="' + clPoker[3] + '"><span class="poker' + dt[7] + '_' + dt[6] + '"></span></div><div class="' + clPoker[4] + '"><span class="poker' + dt[9] + '_' + dt[8] + '"></span></div></div>' + (i == 0 ? '</div>' : '');
    }
    content = '<table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td colspan=3 style="text-align:center;padding-top:8px;">' + str[0] + '</td></tr><tr><td class="showSnapshot"><div class="result">' + rsI18n[rst[0]] + (rst[0] == 3 ? '' : ' 01') + '</div>' + str[1] + '</td><td class="showSnapshot"><div class="result">' + rsI18n[rst[1]] + (rst[1] == 3 ? '' : ' 02') + '</div>' + str[2] + '</td><td class="showSnapshot"><div class="result">' + rsI18n[rst[2]] + (rst[2] == 3 ? '' : ' 03') + '</div>' + str[3] + '</td></tr>';
    _showSnapshot(title, 280, 618, 368, content);
}

// -------------------------  NgauHam End  --------------------------------


// -------------------------  Three Start  --------------------------------


function showThreePoker(rst, rsTie, rsDetail, rsTK, closeTime, sn) {
    $("#divSnapshot").attr('style', 'z-index:10;background:#19431e;');
    var title = "",
        content = "";
    var rsI18n = {
        1: jsI18N.Banker,
        2: jsI18N.Player,
        3: jsI18N.Tie
    };
    var isI18n = {
        0: jsI18N.Noo,
        1: jsI18N.Yes
    };

    rst = rst.split(',');
    rsTie = rsTie.split(',');
    rsTK = rsTK.split(',');
    var closeTimeTemp = closeTime.split(" ");
    var dateTemp = closeTimeTemp[0].split("-");
    title = '[' + dateTemp[1] + dateTemp[2] + '#' + fillZero(sn, 4) + ' ' + closeTimeTemp[1] + '] ' + jsI18N.Result + ': ' + rsI18n[rst[0]] + ' ' + rsI18n[rst[1]] + ' ' + rsI18n[rst[2]];
    var str = [],
        detail = rsDetail.split(';');
    for (var i = 0; i < 4; i++) {
        var dt = detail[i].split(',');
        if (i == 0) {
            str[i] = '<div class="cardframe" id="threeBankerPoker"><div class="big poker' + dt[1] + '_' + dt[0] + '"></div><div class="poker' + dt[3] + '_' + dt[2] + '"></div><div class="poker' + dt[5] + '_' + dt[4] + '"></div></div>';
        } else {
            str[i] = '<div class="cardframe"><div class="poker' + dt[1] + '_' + dt[0] + '"></div><div class="poker' + dt[3] + '_' + dt[2] + '"></div><div class="big poker' + dt[5] + '_' + dt[4] + '"></div></div>';
        }
    }
    content = '<table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td colspan=3 style="text-align:center;padding-top:22px;padding-bottom:15px;">' + str[0] + '</td></tr><tr><td class="showSnapshot">' + str[1] + '</td><td class="showSnapshot">' + str[2] + '</td><td class="showSnapshot">' + str[3] + '</td></tr><tr><td ><div class="result">' + jsI18N.Result + ': ' + rsI18n[rst[0]] + ' ' + rsI18n[rst[1]] + ' ' + rsI18n[rst[2]] + '</div></td><td><div class="result">' + jsI18N.Tie + ': ' + isI18n[rsTie[0]] + ' ' + isI18n[rsTie[1]] + ' ' + isI18n[rsTie[2]] + '</div></td><td><div class="result">' + jsI18N.ThreeKnights + ': ' + isI18n[rsTK[0]] + ' ' + isI18n[rsTK[1]] + ' ' + isI18n[rsTK[2]] + ' ' + isI18n[rsTK[3]] + '</div></td></tr>';

    _showSnapshot(title, 280, 618, 320, content);
}

// -------------------------  Three End  --------------------------------


// -------------------------  Txc Start  --------------------------------

function showTxcPoker(rsBS, rsPoint, rsDetail, closeTime, sn) {
    $("#divSnapshot").attr('style', 'z-index:10;background:#19431e;width:400px');
    var title = "",
        content = "",
        pokerPostfix = "";
    var rstBS = {
        1: 'Small Win',
        2: 'Small Win Half(Old)',
        3: 'Big Win',
        4: 'Big Win Half(Old)',
        5: 'Tie(Old)',
        6: 'Lose',
        7: 'Small Tie',
        8: 'Big Tie'
    };
    var closeTimeTemp = closeTime.split(" ");
    var dateTemp = closeTimeTemp[0].split("-");
    title = '[' + dateTemp[1] + dateTemp[2] + '#' + fillZero(sn, 4) + ' ' + closeTimeTemp[1] + ']';
    var dt = rsDetail.split(',');
    var len = dt.length;
    content += '<div class="carduots poker' + dt[1] + '_' + dt[0] + '" id="txcPokerTitle">';
    if (len == 2) {
        content += '</div>';
    } else if (len == 4) {
        pokerPostfix = ((dt[3] < 10) ? ('0' + dt[3]) : dt[3]) + '_0' + dt[2];
        content += '<img src=images/poker/smallPoker/poker' + pokerPostfix + '.gif></div>';
    }
    content += '<div class="txcPokerText">' + jsI18N.Result + ': ' + rstBS[rsBS] + '&nbsp;&nbsp;&nbsp;&nbsp;' + jsI18N.TXCPoint + ': ' + rsPoint + '</div>';
    _showSnapshot(title, 280, 480, 290, content);
}


// -------------------------  Txc End  --------------------------------


// -------------------------  DoDen Start  --------------------------------

function showDoDenPoker(rsPoint, rsShape, closeTime, sn) {
    $("#divSnapshot").attr('style', 'z-index:10;background:#19431e;');
    var rsShapeType = {
        1: jsI18N.Spade,
        2: jsI18N.Heart,
        3: jsI18N.Club,
        4: jsI18N.Diamond
    };
    var title = "",
        content = "",
        pokerPostfix = "";
    var closeTimeTemp = closeTime.split(" ");
    var dateTemp = closeTimeTemp[0].split("-");
    title = '[' + dateTemp[1] + dateTemp[2] + '#' + fillZero(sn, 4) + ' ' + closeTimeTemp[1] + '] ';

    content += '<div style="padding-top:60px;"><div style="height:100px;background-position:center top;" class="poker' + (rsPoint < 10 ? '0' + rsPoint : rsPoint) + '_0' + rsShape + '"></div></div>';
    content += '<div style="text-align:center;margin-top:10px;color:white;">' + jsI18N.DoDenPoint + ': ' + rsPoint + '&nbsp;&nbsp;&nbsp;&nbsp;' + jsI18N.Shape + ': ' + rsShapeType[rsShape] + '</div>';
    _showSnapshot(title, 280, 480, 290, content);
}

// -------------------------  DoDen End  --------------------------------


// -------------------------  Animal Start  --------------------------------

function showAnimalSignsPoker(result, closeTime, sn) {
    $("#divSnapshot").attr('style', 'z-index:10;background:#055838;');
    var rs = result.split(',');
    var rsi18n = {
        1: jsI18N.Rat,
        2: jsI18N.Ox,
        3: jsI18N.Tiger,
        4: jsI18N.Rabbit,
        5: jsI18N.AnimalDragon,
        6: jsI18N.Snake,
        7: jsI18N.Horse,
        8: jsI18N.Goat,
        9: jsI18N.Monkey,
        10: jsI18N.Rooster,
        11: jsI18N.Dog,
        12: jsI18N.Boar
    };
    var title = "",
        content = "",
        pokerPostfix = "";
    var closeTimeTemp = closeTime.split(" ");
    var dateTemp = closeTimeTemp[0].split("-");
    title = '[' + dateTemp[1] + dateTemp[2] + '#' + fillZero(sn, 4) + ' ' + closeTimeTemp[1] + '] '

    content += '<div style="padding:60px 0 0 75px;height:100px;">';
    for (var i = 0; i < 3; i++) {
        content += '<span style="margin:0 7px;height:95px;width:95px;float:left;background-repeat:no-repeat;background-position:center center;" class="as-img' + (rs[i] >= 10 ? rs[i] : '0' + rs[i]) + '"></span>';
    }
    content += '</div><div style="text-align:center;margin-top:10px;color:white;">' + jsI18N.Result + ': ' + rsi18n[rs[0]] + ', ' + rsi18n[rs[1]] + ', ' + rsi18n[rs[2]] + '</div>';
    _showSnapshot(title, 280, 480, 290, content);
}

// -------------------------  Animal End  --------------------------------


// -------------------------  SeDie Start  --------------------------------

function showSeDieProduct(rs, detail, closeTime, sn) {
    $("#divSnapshot").attr('style', 'z-index:10;background:#BCCFF9;');
    var title = "",
        content = "";
    var dtType = {
        0: 'white',
        1: 'black'
    };
    var closeTimeTemp = closeTime.split(" ");
    var dateTemp = closeTimeTemp[0].split("-");
    title = '[' + dateTemp[1] + dateTemp[2] + '#' + fillZero(sn, 4) + ' ' + closeTimeTemp[1] + ']';
    var dt = detail.split(',');
    content += '<div style="padding:80px 0 0 76px;">';
    for (var i = 0; i < 4; i++) {
        content += '<span class="Se' + dtType[dt[i]] + '"></span>';
        // --- (GZF)span标签 替换 img ---  content += '<img src="images/games_ui/xocdia/se_'+dtType[dt[i]]+'.png" />';
    }
    content += '</div>';
    content += '<div style="text-align:center;margin-top:10px;">' + jsI18N.Result + ': ' + rs + '</div>';
    _showSnapshot(title, 280, 480, 290, content);
}

// -------------------------  SeDie End  --------------------------------


// -------------------------  SHR Xoc Dia Start  --------------------------------

function showProductSHRXocDia(result, closeTime, date, tableSeq, game) {
    var title = "Snapshot: [" + closeTime + "]  " + result;
    date = date.replace(/\-/g, "");
    var img = "<img id='imgSnapshot' border=0 height=100% width=100% src='" + snapshotApi + "&mrkt=210&date=" + date + "&table_seq=" + tableSeq + "&game=" + game + "' />";
    _showSnapshot(title, 80, 640, 480, img);
}

// -------------------------  SHR Xoc Dia End  --------------------------------

// -------------------------  Fish Start  --------------------------------

function showFishProduct(rs, result, closeTime, sn) {
    $("#divSnapshot").attr('style', 'z-index:10;background:#BCCFF9;');
    var title = "",
        content = "";
    var closeTimeTemp = closeTime.split(" ");
    var dateTemp = closeTimeTemp[0].split("-");
    title = '[' + dateTemp[1] + dateTemp[2] + '#' + fillZero(sn, 4) + ' ' + closeTimeTemp[1] + ']';
    var dt = rs.split(',');
    content += '<div style="text-align: center; padding-top:30px;">';
    for (var i = 0; i < 3; i++) {
        content += '<div style="float:left;" class="types0' + dt[i] + '"></div>';
    }
    content += '</div>';
    content += '<div style="text-align:center;margin:10px 0;">' + jsI18N.Result + ': ' + result + '</div>';
    _showSnapshot(title, 280, 480, 290, content);
}

// -------------------------  Fish End  --------------------------------

// -------------------------  SHRFish Start  --------------------------------

function showProductSHRFish(closeTime, date, tableSeq, game) {
    var title = "Snapshot: [" + closeTime + "]";
    date = date.replace(/\-/g, "");
    var img = "<img id='imgSnapshot' border=0 height=281 width=500 src='" + snapshotApi + "&mrkt=220&date=" + date + "&table_seq=" + tableSeq + "&game=" + game + "' />";
    _showSnapshot(title, 80, 500, 281, img);
}

// -------------------------  SHRFish End  --------------------------------

// -------------------------  SicBo Start  --------------------------------

function showSicBoProduct(rs, detail, closeTime) {
    $("#divSnapshot").attr('style', 'z-index:10;background:#BCCFF9;');
    var title = "",
        content = "";
    title = '[' + closeTime + ']';
    var dt = detail.split(',');
    content += '<div style="text-align: center; padding-top:50px;">';
    for (var i = 0; i < 3; i++) {
        content += '<img style="margin:0 5px;" src="images/games_ui/sicbo/DiceB0' + dt[i] + '.gif" />';
    }
    content += '</div>';
    content += '<div style="text-align:center;margin:10px 0;">' + jsI18N.Result + ': ' + rs + '</div>';
    _showSnapshot(title, 280, 480, 290, content);
}

// -------------------------  SicBo End  --------------------------------


// -------------------------  ShrSicBo Start  --------------------------------

function showProductShrSicBo(result, resultDetail, closeTime, date, tableSeq, game) {
    var title = "Snapshot: [" + closeTime + "]  " + result;
    date = date.replace(/\-/g, "");
    //var img = status == 4 ? "<div class='tag_cancelled'></div>" : "";
    var img = "<img id='imgSnapshot' border=0 height=281 width=500 src='" + snapshotApi + "&mrkt=230&date=" + date + "&table_seq=" + tableSeq + "&game=" + game + "' />";
    _showSnapshot(title, 80, 500, 281, img);
}

// -------------------------  ShrSicBo End  --------------------------------


// -------------------------  Caribbean Start  --------------------------------

function showCaribbeanPoker(rs, banker, player, closeTime, jackpot, hand, sn) {
    $("#divSnapshot").attr('style', 'z-index:10;background:#19431e;');
    var title = "",
        content = "";
    var rsI18n = {
            1: jsI18N.BankerWin,
            2: jsI18N.PlayerWin,
            3: jsI18N.Tie
        },
        jackpotType = {
            1: jsI18N.RoyalFlush,
            2: jsI18N.StraightFlush,
            3: jsI18N.FourOfAKind,
            4: jsI18N.FullHouse,
            5: jsI18N.Flush
        };
    if (jackpot == 1 || jackpot == 2 || jackpot == 3 || jackpot == 4 || jackpot == 5) jackpot = ', ' + ((rs == 1 || rs == 3 || hand == 2) ? jsI18N.Player + ' ' : '') + jackpotType[jackpot];
    else jackpot = '';
    var closeTimeTemp = closeTime.split(" ");
    var dateTemp = closeTimeTemp[0].split("-");
    title = '[' + dateTemp[1] + dateTemp[2] + '#' + fillZero(sn, 4) + ' ' + closeTimeTemp[1] + '] ' + jsI18N.Result + ': ' + (hand == 2 ? jsI18N.Banker + ' ' + jsI18N.NoHand : rsI18n[rs]);
    var str = [];
    for (var i = 0; i < 2; i++) {
        var detail;
        if (i == 0) detail = banker;
        else detail = player;
        var dt = detail.split(',');
        if (i == 0) {
            str[i] = '<div class="cardframe" id="threeBankerPoker" style="width:240px;"><div class="big poker' + dt[9] + '_' + dt[8] + '"></div><div class="poker' + dt[7] + '_' + dt[6] + '"></div><div class="poker' + dt[5] + '_' + dt[4] + '"></div><div class="poker' + dt[3] + '_' + dt[2] + '"></div><div class="poker' + dt[1] + '_' + dt[0] + '"></div></div>';
        } else {
            str[i] = '<div class="cardframe" style="width:240px;"><div class="poker' + dt[1] + '_' + dt[0] + '"></div><div class="poker' + dt[3] + '_' + dt[2] + '"></div><div class="poker' + dt[5] + '_' + dt[4] + '"></div><div class="poker' + dt[7] + '_' + dt[6] + '"></div><div class="big poker' + dt[9] + '_' + dt[8] + '"></div></div>';
        }
    }
    content = '<table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td style="text-align:center;padding-top:22px;">' + str[0] + '</td></tr><tr><td><div class="result">' + (hand == 2 ? jsI18N.Banker + ' ' + jsI18N.NoHand : rsI18n[rs]) + jackpot + '</div></td></tr><tr><td>' + str[1] + '</td></tr>';

    _showSnapshot(title, 280, 618, 320, content);
}

// -------------------------  Caribbean End  --------------------------------


function showProductSHRRoulette(rst, dt, status, date, table_seq, game) {
    var title = "Snapshot: [" + dt + "]  " + (status == 4 ? "Cancelled" : rst);
    date = date.replace(/\-/g, "");
    var img = status == 4 ? "<div class='tag_cancelled'></div>" : "";
    img += "<img id='imgSnapshot' border=0 height=100% width=100% src='" + snapshotApi + "&mrkt=260&date=" + date + "&table_seq=" + table_seq + "&game=" + game + "' />";
    _showSnapshot(title, 80, 640, 480, img);
}



// -------------------------  Common Start  --------------------------------

function _showSnapshot(title, left, width, height, content) {
    var html = [],
        idx = 0,
        o = $("#divSnapshot");
    html[idx++] = '<table class="modalTable2" border="0" cellpadding="0" cellspacing="0" class="" width="100%">';
    html[idx++] = '<tr><th class="main_table_header" style="text-align:left;height:22px;">' + title + '</th></tr>';
    html[idx++] = '<tr><td>' + content + '</td></tr>';
    html[idx++] = '</table>';
    o.html(html.join(''));
    openModal('divSnapshot', false, true);
}

// -------------------------  End  --------------------------------

function getMrktAJFileName(mrkt) { //主要是game类型的游戏,其他的等之后需要再补充
    var arrMarket = js234Constant.market.code;
    var _a = '';

    if (mrkt == arrMarket.Keno) _a = "keno";
    else if (mrkt == arrMarket.Baccarat) _a = "baccarat";
    else if (mrkt == arrMarket.SHRBaccarat) _a = "shr_baccarat";
    else if (mrkt == arrMarket.Dragon) _a = "dragon";
    else if (mrkt == arrMarket.Dragon2) _a = "shr_dragon";
    else if (mrkt == arrMarket.Slot) _a = "slot";
    else if (mrkt == arrMarket.SeDie) _a = "sedie";
    else if (mrkt == arrMarket.SHRXocDia) _a = "shr_xocdia";
    else if (mrkt == arrMarket.Fish) _a = "fish";
    else if (mrkt == arrMarket.SHRFish) _a = "shr_fish";
    else if (mrkt == arrMarket.SicBo) _a = "sicbo";
    else if (mrkt == arrMarket.SHRSicBo) _a = "shr_sicbo";
    else if (mrkt == arrMarket.BaiBuu) _a = "baibuu";
    else if (mrkt == arrMarket.NgauHam) _a = "ngauham";
    else if (mrkt == arrMarket.Roulette) _a = "roulette";
    else if (mrkt == arrMarket.SHRRoulette) _a = "shr_roulette";
    else if (mrkt == arrMarket.ABC) _a = "abc";
    else if (mrkt == arrMarket.ThreePictures) _a = "three";
    else if (mrkt == arrMarket.Txc) _a = "txc";
    else if (mrkt == arrMarket.DoDen) _a = "doden";
    else if (mrkt == arrMarket.AnimalSigns) _a = "animal";
    else if (mrkt == arrMarket.CSP) _a = "caribbean";
    else if (mrkt == arrMarket.FanTan) _a = "fan_tan";
    else if (mrkt == arrMarket.EDragon) _a = "e_dragon";
    else if (mrkt == arrMarket.EBaccarat) _a = "e_baccarat";
    else if (mrkt == arrMarket.Cockfight) _a = "cockfight";
    else if (mrkt == arrMarket.MagicCup) _a = "cup";
    else if (mrkt == arrMarket.FingerPlay) _a = "finger";
    else if (mrkt == arrMarket.SwimmingRace) _a = "swimming";

    return _a;
}