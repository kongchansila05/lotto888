var __flag_debug = 0; //跟下面的__vers配合,如果是在调试,则__vers中的各版本号用一个随机数表示
var __random_ver = __flag_debug ? Math.round(Math.random() * 1000000) : 2;
//此变量尽量别用缩写(比如声明变量:var imgv = __vers.img),因为处于试用阶段,以后还可能进行改进,不用缩写就可以方便到时候进行文件搜索
var __vers = {
    lang: {
        swf: 6 + __random_ver
    },
    swf: {
        keno: 5 + __random_ver,
        keno_live: 2 + __random_ver,
        keno_rst: 1 + __random_ver,
        baccarat: 20 + __random_ver,
        dragon: 20 + __random_ver,
        slot: 20
    },
    img: 4 + __random_ver
}
var jtplCache = 1; //0, 1, 设为0时,浏览器只要运行过下面这个函数一次,再重启浏览器之后,原来的缓存(假如原来有相关文件的缓存的话)就会被浏览器删除了
var jsWeekday = {
    abbr: ["MondayAbbr", "TuesdayAbbr", "WednesdayAbbr", "ThursdayAbbr", "FridayAbbr", "SaturdayAbbr", "SundayAbbr"]
}
var jsMon = {
    abbr: ["JanuaryAbbr", "FebruaryAbbr", "MarchAbbr", "AprilAbbr", "MayAbbr", "JuneAbbr", "JulyAbbr", "AugustAbbr", "SeptemberAbbr", "OctoberAbbr", "NovemberAbbr", "DecemberAbbr"]
}

var js234Constant = {
    userLevel: {
        "code": {
            "Vendor": "12",
            "Senior": "13",
            "Master": "14",
            "Agent": "15",
            "Member": "16",
            "Sub": "20"
        },
        "name": {
            "12": "Vendor",
            "13": "Senior",
            "14": "Master",
            "15": "Agent",
            "16": "Member",
            "20": "Sub"
        },
        "i18n_name": {
            "12": "Vendor",
            "13": "SeniorMasterAgent",
            "14": "MasterAgent",
            "15": "Agent",
            "16": "Member"
        },
        "upline": {
            "12": "1",
            "13": "12",
            "14": "13",
            "15": "14",
            "16": "15"
        },
        "downline": {
            "1": "12",
            "12": "13",
            "13": "14",
            "14": "15",
            "15": "16",
            "8": "12"
        }
    },
    userStatus: {
        "code": {
            "Active": "1",
            "Suspended": "2",
            "Inactive": "3"
        },
        "name": {
            "1": "Active",
            "2": "Suspended",
            "3": "Inactive"
        }
    },
    market: {
        code: {
            common: 2,
            LottoVietnam: 130,
            LottoCambodia: 140,
            SHLottVietnam: 136,
            SHLottCambodia: 137,
            Keno: 150,
            Baccarat: 160,
            SHRBaccarat: 161,
            Dragon: 170,
            Dragon2: 171,
            Sports: 180,
            Slot: 190,
            SeDie: 210,
            SHRXocDia: 211,
            Fish: 220,
            SHRFish: 221,
            SicBo: 230,
            SHRSicBo: 231,
            BaiBuu: 240,
            NgauHam: 250,
            Roulette: 260,
            SHRRoulette: 261,
            ABC: 270,
            LottoTH: 280,
            ThreePictures: 290,
            Txc: 300,
            DoDen: 310,
            AnimalSigns: 320,
            CSP: 330,
            FanTan: 400,
            EBaccarat: 410,
            EDragon: 420,
            Vietlott4D: 460,
            Vietlott645: 470,
            Cockfight: 500,
            MagicCup: 510,
            FingerPlay: 520,
            SwimmingRace: 530,
            Digger: 540,
            Monkey: 560,
            Balloon: 570,
            Mole: 590,
            Pingpong: 610,
            BinaryOptions: 600
        },
        i18nName: {
            130: 'LottoVietnam',
            140: 'LottoCambodia',
            136: 'SHLottVietnam',
            137: 'SHLottCambodia',
            150: 'Keno',
            160: 'Baccarat',
            161: 'SHRBaccarat',
            170: 'Dragon',
            171: 'SHRDragon',
            180: 'Sports',
            190: 'Slot',
            210: 'SeDie',
            211: 'SHRXocDia',
            220: 'Fish',
            221: 'SHRFish',
            230: 'SicBo',
            231: 'SHRSicBo',
            240: 'BaiBuu',
            250: 'NgauHam',
            260: 'Roulette',
            261: 'SHRRoulette',
            270: 'ABC',
            280: 'LottoThailand',
            290: 'ThreePictures',
            300: 'TXC',
            310: 'DoDen',
            320: 'AnimalSigns',
            330: 'CSP',
            400: 'FanTan',
            410: 'EBaccarat',
            420: 'EDragon',
            460: 'VietlottMax4D',
            470: 'VietlottMega645',
            500: 'Cockfight',
            600: 'BinaryOptions',
            510: 'MagicCup',
            520: 'FingerPlay',
            530: 'SwimmingRace',
            540: 'Digger',
            570: 'Balloon',
            590: 'Mole',
            560: 'Monkey',
            610: 'Pingpong'
        }
    },
    source: {
        NOT_CONFIRM: 0,
        SMS: 1,
        XOSO: 2,
        MINHNGOC: 3,
        BY_HAND: 9
    },
    sheetNoLen: 6,
    kenoType: {
        name: {
            1: "Over",
            2: "Under",
            3: "Odd",
            4: "Even",
            5: "OverOdd",
            6: "UnderOdd",
            7: "OverEven",
            8: "UnderEven",
            11: "210_695",
            12: "696_763",
            13: "764_855",
            14: "856_923",
            15: "924_1410",
            21: "Min1_2",
            22: "Min3_5",
            23: "MinGT6",
            31: "MaxLT75",
            32: "Max76_78",
            33: "Max79_80",
            111: "Win1_1",
            112: "2or3_1",
            113: "4Above_1",
            114: "None_1",
            121: "Win1_2",
            122: "2or3_2",
            123: "4Above_2",
            124: "None_2",
            131: "Win1_3",
            132: "2or3_3",
            133: "4Above_3",
            134: "None_3",
            141: "Win1_4",
            142: "2or3_4",
            143: "4Above_4",
            144: "None_4",
            151: "Win1_5",
            152: "2or3_5",
            153: "4Above_5",
            154: "None_5",
            161: "Win1_6",
            162: "2or3_6",
            163: "4Above_6",
            164: "None_6",
            171: "Win1_7",
            172: "2or3_7",
            173: "4Above_7",
            174: "None_7",
            181: "Win1_8",
            182: "2or3_8",
            183: "4Above_8",
            184: "None_8"
        },
        code: {
            over: "1",
            under: "2",
            odd: "3",
            even: "4",
            overodd: "5",
            underodd: "6",
            overeven: "7",
            undereven: "8",
            '210-695': "11",
            '696-763': "12",
            '764-855': "13",
            '856-923': "14",
            '924-1410': "15",
            '1-2': "21",
            '3-5': "22",
            '>=6': "23",
            '<=75': "31",
            '76-78': "32",
            '79-80': "33",
            win1_1: "111",
            '2or3_1': "112",
            '4above_1': "113",
            none_1: "114",
            win1_2: "121",
            '2or3_2': "122",
            '4above_2': "123",
            none_2: "124",
            win1_3: "131",
            '2or3_3': "132",
            '4above_3': "133",
            none_3: "134",
            win1_4: "141",
            '2or3_4': "142",
            '4above_4': "143",
            none_4: "144",
            win1_5: "151",
            '2or3_5': "152",
            '4above_5': "153",
            none_5: "154",
            win1_6: "161",
            '2or3_6': "162",
            '4above_6': "163",
            none_6: "164",
            win1_7: "171",
            '2or3_7': "172",
            '4above_7': "173",
            none_7: "174",
            win1_8: "181",
            '2or3_8': "182",
            '4above_8': "183",
            none_8: "184"
        }
    },
    slotType: {
        name: {
            1: 'SlotJewel',
            2: 'SlotFruit',
            3: 'SlotBeauty'
        }
    },
    xocDiaType: {
        name: {
            0: 0,
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: "ManyWhite",
            6: "ManyBlack",
            7: "Odd",
            8: "Even"
        }
    },
    fishType: {
        name: {
            1: "Deer",
            2: "Calabash",
            3: "Chicken",
            4: "FishType",
            5: "Crab",
            6: "Prawn"
        }
    },
    sicboType: {
        name: {
            21: "Big",
            22: "Small",
            23: "Odd",
            24: "Even"
        }
    },
    shrSicboType: {
        name: {
            21: "Big",
            22: "Small",
            23: "Odd",
            24: "Even",
            25: "TypeTriple",
            31: "TypeOne",
            32: "TypeTwo",
            33: "TypeThree",
            34: "TypeFour",
            35: "TypeFive",
            36: "TypeSix"
        }
    },
    animalType: {
        name: {
            1: 'Rat',
            2: 'Ox',
            3: 'Tiger',
            4: 'Rabbit',
            5: 'AnimalDragon',
            6: 'Snake',
            7: 'Horse',
            8: 'Goat',
            9: 'Monkey',
            10: 'Rooster',
            11: 'Dog',
            12: 'Boar'
        }
    },
    cockfightType: {
        name: {
            R: 'Red',
            B: 'Blue',
            T: 'Tie'
        }
    },
    cupType: {
        name: {
            1: 'A',
            2: 'B',
            3: 'C'
        }
    },
    fingerType: {
        name: {
            1: 'TypeLeft',
            2: 'TypeRight'
        }
    },
    swimmingType: {
        name: {
            1: 'Turtle',
            2: 'Nemo',
            3: 'Dory',
            4: 'Zebra'
        }
    },
    abcType: {
        name: {
            1: 'A',
            2: 'B',
            3: 'C',
            4: 'Tie',
            5: 'Pair'
        }
    },
    balloonType: {
        name: {
            1: 'Purple',
            2: 'Blue',
            3: 'Red'
        }
    },
    moleType: {
        name: {
            1: 'A',
            2: 'B',
            3: 'C',
            4: 'D',
            5: 'E'
        }
    },
    monkeyType: {
        name: {
            12: '12',
            13: '13',
            14: '14',
            15: '15',
            16: '16',
            23: '23',
            24: '24',
            25: '25',
            26: '26',
            34: '34',
            35: '35',
            36: '36',
            45: '45',
            46: '46',
            56: '56'
        }
    },
    pingpongType: {
        name: {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9
        }
    }
};

//lotto 是否开放打印功能的参数 0:close  1:open
var jsLottoPrint = {
    130: 1,
    140: 1,
    280: 0
};

var jsAccount2888Constant = {
    account2888_cookies_expires_days: 30
};

var jsBaccaratConstant = {
    type: {
        i18nName: {
            "B": "Banker",
            "P": "Player",
            "T": "Tie",
            "BP": "BankerPair",
            "PP": "PlayerPair",
            "BG": "Big",
            "SM": "Small",
            "NT": "NotTie",
            "NP": "NoPair",
            "PE": "PairExist"
        }
        //"B6":"BankerSix",
    }
};

var jsSHRBaccaratConstant = {
    type: {
        i18nName: {
            "B": "Banker",
            "P": "Player",
            "T": "Tie",
            "BG": "Big",
            "SM": "Small",
            "PE": "PairExist",
            "BP": "BankerPair",
            "PP": "PlayerPair"
        }
        //"B6":"BankerSix",
    }
};

var jsDragonConstant = {
    type: {
        i18nName: {
            "B": "TigerType",
            "P": "DragonType",
            "D": "Pair"
        }
    }
};

var jsSHRDragonConstant = {
    type: {
        i18nName: {
            "P": "TigerType",
            "B": "DragonType",
            "D": "Pair"
        }
    }
};

var jsEDragonConstant = {
    type: {
        i18nName: {
            "B": "DragonType",
            "P": "TigerType",
            "D": "Pair"
        }
    }
};

var jsCockfightConstant = {
    type: {
        i18nName: {
            "R": "Red",
            "B": "Blue",
            "T": "Tie"
        }
    }
};

var jsSportsConst = {
    parlay: {
        min: 2,
        max: 15,
        combo_count: {
            2: {
                2: 1
            },
            3: {
                2: 3,
                3: 1
            },
            4: {
                2: 6,
                3: 4,
                4: 1
            },
            5: {
                2: 10,
                3: 10,
                4: 5,
                5: 1
            },
            6: {
                2: 15,
                3: 20,
                4: 15,
                5: 6,
                6: 1
            },
            7: {
                2: 21,
                3: 35,
                4: 35,
                5: 21,
                6: 7,
                7: 1
            },
            8: {
                2: 28,
                3: 56,
                4: 70,
                5: 56,
                6: 28,
                7: 8,
                8: 1
            },
            9: {
                2: 36,
                3: 84,
                4: 126,
                5: 126,
                6: 84,
                7: 36,
                8: 9,
                9: 1
            },
            10: {
                2: 45,
                3: 120,
                4: 210,
                5: 252,
                6: 210,
                7: 120,
                8: 45,
                9: 10,
                10: 1
            },
            11: {
                2: 55,
                3: 165,
                4: 330,
                5: 462,
                6: 462,
                7: 330,
                8: 165,
                9: 55,
                10: 11,
                11: 1
            },
            12: {
                2: 66,
                3: 220,
                4: 495,
                5: 792,
                6: 924,
                7: 792,
                8: 495,
                9: 220,
                10: 66,
                11: 12,
                12: 1
            },
            13: {
                2: 78,
                3: 286,
                4: 715,
                5: 1287,
                6: 1716,
                7: 1716,
                8: 1287,
                9: 715,
                10: 286,
                11: 78,
                12: 13,
                13: 1
            },
            14: {
                2: 91,
                3: 364,
                4: 1001,
                5: 2002,
                6: 3003,
                7: 3432,
                8: 3003,
                9: 2002,
                10: 1001,
                11: 364,
                12: 91,
                13: 14,
                14: 1
            },
            15: {
                2: 105,
                3: 455,
                4: 1365,
                5: 3003,
                6: 5005,
                7: 6435,
                8: 6435,
                9: 5005,
                10: 3003,
                11: 1365,
                12: 455,
                13: 105,
                14: 15,
                15: 1
            }
        }
    },
    type: {
        soccer: 1,
        basketball: 2
    },
    page_matches: 100,
    event: {
        early: 1,
        today: 2,
        running: 3,
        parlay_early: 4,
        parlay_today: 5,
        all: [1, 2, 3, 4, 5]
    },
    refresh_time: {
        //单位：秒
        odds: {
            1: 90,
            2: 30,
            3: 15,
            4: 90,
            5: 30
        },
        match_more: 200,
        match_count: 300000 //单位:毫秒
    },
    cookie: {
        sports_general: {
            expire: 30,
            name: 'sports_general'
        }
    },
    display: {
        odds: {
            code: {
                hk: 1,
                ma: 2,
                eur: 3,
                id: 4
            },
            name: {
                1: ['hk', 'HongKongAbbr', 'HongKong'],
                2: ['ma', 'MalaysiaAbbr', 'Malaysia'],
                3: ['eur', 'EuropeAbbr', 'Europe'],
                4: ['id', 'IndonesiaAbbr', 'Indonesia']
            }
        },

        need_3_col_leagues: 30
    },
    product: {
        type_name: {
            11: 'Handicap',
            12: 'FirstHalfHandicap',
            21: 'OverUnder',
            22: 'FirstHalfOverUnder',
            31: '1X2',
            32: 'FirstHalf1X2',
            41: 'TotalGoal',
            51: 'OddEven',
            61: 'HalfTimeFullTime',
            71: 'FirstGoal',
            72: 'LastGoal',
            81: "CorrectScore"
        }
    },
    match: {
        stage: {
            STAGE_1: 1,
            FHT_2: 2,
            HT_3: 3,
            LHT_4: 4
        }
    },
    betType: {
        11: 'Handicap',
        12: 'FirstHalfHandicap',
        21: 'OverUnder',
        22: 'FirstHalfOverUnder',
        31: '1X2',
        32: 'FirstHalf1X2',
        33: 'DoubleChance',
        41: 'TotalGoal',
        42: 'FirstTotalGoal',
        51: 'OddEven',
        52: 'FirstOddEven',
        53: 'HTAndFTOddEven',
        61: 'HalfTimeFullTime',
        71: 'FirstGoal',
        72: 'LastGoal',
        81: 'CorrectScore',
        82: 'FirstHalfCorrectScore',
        83: 'SecondHalfCorrectScore',
        99: 'SportsParlay'
    },
    sort_type: {
        league: 1,
        time: 2
    },
    sport_type: {
        all: [0, 1, 2]
    }
}

var jsSlotConst = {
    type: {
        1: "Regular",
        2: "Free"
    },
    game: {
        1: "spinwin",
        2: "fruit",
        3: "beauty"
    },
    code: {
        spinwin: 1,
        fruit: 2,
        beauty: 3
    }
};

var betSource = {
    0: '',
    1: 'Web',
    2: 'Web New',
    4: 'Web Flash',
    8: 'Touch'
};
''.sub
cards = ['', "&#9824;", "<font class='redFont'>&#9829;</font>", "&#9827;", "<font class='redFont'>&#9830;</font>"];
cards2 = ['', "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

//把 {a:'1', b:'2', ...} 这种对象的值用分隔符 glue 连接成一个字符串
//glue 只能是单字符
function join(glue, obj) {
    var str = '';
    for (var i in obj) {
        str += obj[i] + glue
    }
    str = str.substr(0, str.length - 1);
    return str;
}

function getOneFieldArray(objArray, field) {
    var arr = []
    for (var i in objArray) {
        var obj = objArray[i]
        arr.push(obj[field])
    }
    return arr
}

function getValidatorAttr(datatype) {
    var i18n = window.jsi18n || window.jsI18N || {}
    switch (datatype) {
        case 'double':
        case 'formatdouble':
            return ' require="true" datatype="' + datatype + '" msg="' + i18n.MSGDoubleRequired + '"';
        default:
            return ' require="true" datatype="require" msg="' + i18n.MSGCannotBeEmpty + '"';
    }
}

//增加了flagExceptionCallback 参数,是为了出现后台抛异常时能继续调用callback,由于不敢保证此改动不影响其他地方，所以加此参数  -- by LYH 2014-02-10
function ajax(params, callback, flagExceptionCallback, url) {
    if (!url || url == undefined) {
        url = './?';
    }
    return $.ajmega({
        enc: true, // false 不能用,将会出现错误,比如,当params.a=={}时,在php边将会解析成 params.a=="[object object]" (注意,这是一个字符串)
        url: url,
        running: 0,
        data: params,
        //type :'GET',
        //timeout: 7000,
        complete: function(XMLHttpRequest, flagOK) {
            this.running = 0;
        },
        beforeSend: function(XMLHttpRequest) {
            this.running = 1;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            unblockScreen();
            var errno = errorThrown ? errorThrown.number : '';
            if (errno) {
                if (errno > 1000) {
                    var target = window
                    while (target.parent != target) {
                        target = target.parent
                    }
                    target.location = "./?_a=member&error=" + errno;
                    return;
                }
            }
            // 屏蔽空错误信息弹出，因为快速点菜单时若有ajax调用未返回也会出错，不过错误信息为空
            if (errorThrown && errorThrown.message)
                if (errorThrown.message != null && errorThrown.message != "") alert(errorThrown.message);
                else if (XMLHttpRequest.responseText != null && XMLHttpRequest.responseText != "") alert(XMLHttpRequest.responseText);
        },
        success: function(XMLHttpRequest, obj, textStatus) {
            if (obj["errmsg"]) {
                al(obj["errmsg"]);
                if (flagExceptionCallback) callback(obj);
                return;
            }
            if (obj["sess_fail"]) {
                top.location = '/';
                return;
            }
            if (!obj["sts"]) {
                //        alert("[RETURN VALUE ERROR] sts not found");
                return;
            }
            if (obj['errcode'] == '9999') { //9999表示重复提交，loading层不消失，直接在这里进行unblockScreen
                unblockScreen();
                return;
            }
            callback(obj);
        }
    });
}

/*  params url  必须是这样的:?key1=val1&key2=val2 ...
 *  params _window  parent/window
 *  params target   _blank/_self/_parent/_top/framename
 *  google有一个保护机制，防止重复提交表单，如果action的值相同，chrome只能提交一次，目前系统主要是登出用到这个函数和sports注单，slot用到
 *  sports注单和slot都是用到跳转新页面的，所以要加上random，否则只能点一次，后面再点也不会再跳转的了
 */
function redirectByForm(url, _window, target) {
    if (!_window) _window = window
    var method = 'post'
    if (window.isDev) {
        method = 'get'
    }
    if (!target) target = "_self ";
    var document = _window.document;
    var idx = url.search(/\?/);
    url = url.substr(idx + 1, url.length - idx - 1).split('&');
    var random = (target == "_blank" || target == "games_group" || target == "report_group") ? Math.round(Math.random() * 100) : "";
    var len = url.length,
        form = '<form id="formRedirect" method="' + method + '" style="display: none" action="?' + random + '" target=' + target + '>'
    for (var i = 0; i < len; i++) {
        var param = url[i].split('=')
        form += '<input type="hidden" name="' + param[0] + '" value="' + param[1] + '"/>'
    }
    form += '</form>'
    $(document).find("body").append(form);
    if ($(document).find("#formRedirect")[0] == undefined) $(document).find("#formRedirect").submit();
    else $(document).find("#formRedirect")[0].submit();
    $(document).find("#formRedirect").remove();
}

//这个函数会把远程拿回来的形如[{'id':0, 'name':1}, [1, 'jonson'], [2, 'jonson2'], [3, 'jonson3']]的数组转换成
//[{id:1, name:'jonson'}, {id:2, name:'jonson2'}, {id:3, name:'jonson3'}]的形式,方便操作,这部分功能跟php的transform函数相对应
function transform(list, name) {
    if (list == null || list == undefined || !list) return [];
    if (!name) name = ''
    var t1 = new Date(),
        size = 0
    var fields = list.fields,
        data = list.data,
        rt = [];
    if (list.fields) {
        var len = data.length,
            i = 0,
            countField = (len > 1) ? data[0].length : count(fields);
        var ff = [];
        for (var f in fields) {
            ff[fields[f]] = f; //此种转换是为了提高性能
        }

        while (i < len) {
            var tmp = {},
                row = data[i],
                j = 0
            while (j < countField)
                tmp[ff[j]] = row[j++];
            rt[i] = tmp

            i++
        }
    }

    //cf('size = '  + size)
    //  var t2 = new Date()
    //  t1 = t1.getSeconds() + "." + t1.getMilliseconds()
    //  t2 = t2.getSeconds() + "." +  t2.getMilliseconds()
    //  if (name == true) al('transform t1 = ' + t1 + "   t2 = " + t2 + '    \ntime = ' + (t2-t1))
    return rt;
}

var getArray = transform

//以下的al, cf, co都是用于调试的函数
//进行json格式转换后再alert
function al() {
    var rt = getJsonMsg_(arguments);
    alert(rt);
}

function l() {
    var rt = getJsonMsg_(arguments);
    if (window.console) {
        if (console.log) console.log(rt);
    } else {
        $('body').append('<div>' + rt + '</div>');
    }
}

//任意个参数,每个参数如果不是基本类型的话,都会先进行json转换
//点击弹出窗口的"取消"之后,后面的c函数将会不起作用
function cf() {
    var rt = getJsonMsg_(arguments);
    if (!confirm(rt)) {
        cf = function() {};
    }
}

function getJsonMsg_(arr) {
    var rt = ''
    for (var i = 0; i < arr.length; i++) {
        var msg = arr[i]
        if (typeof msg != 'string' && typeof msg != 'number' &&
            typeof msg != 'undefined' && typeof msg != 'boolean')
            rt += '|' + $.toJSON(msg) + "|   ";
        else rt += '|' + msg + "|   ";
    }
    return rt;
}

function jsDebug(obj) {
    cf(obj);
}

function writeJsLog(fileName, msg) {
    var params = {
        _a: 'common',
        _b: 'aj',
        cmd: 'writeJsLog',
        file_name: fileName,
        msg: msg
    }
    ajax(params, function() {})
}

//如果msg是一个js对象,那么会进行简单的缩进之后才显示
function co(msg) {
    if (typeof msg != 'string' && typeof msg != 'number' && typeof msg != 'undefined' && typeof msg != 'boolean') msg = $.toJSON(msg)
    var i = 2;
    msg = msg.replace(/(\w+(\.\w+)?:)?(\{|\[)/g, function(s, p1, p2, p3) {
        var str = '\n' + strClone(' ', i) + p1 + p3;
        i += 2;
        return str;
    })

    // msg = msg.replace(/(\}|\])/g, function(s, p1) {
    //   var str = '\n' + strClone(' ', i) + p1;
    //   i -= 2;
    //return str;
    // })

    if (!confirm(msg)) {
        co = function() {}
    }
}

function swap(arr, index1, index2) {
    if (arr.length <= 1 || index1 < 0 || index2 < 0) return;
    var tmp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = tmp
}

function arrayRemove(arr, item) {
    var len = arr.length,
        i = 0,
        index = -1
    while (i < len) {
        if (arr[i] == item) index = i
        i++
    }
    if (index == -1) return false;
    arr.splice(index, 1)
    return index;
}

function mousePosition(ev) {
    ev = ev || window.event;
    return {
        x: ev.screenX,
        y: ev.screenY
    };
}

//只能用来合并到深度1。 比如{a:1}，属性a的尝试就为1， {a:{b:1}}, b的深度为2
//可以合并任意个对象
//合并后得到的对象是一个复制品,而不是引用
function mergeObj(objArr) {
    var obj1 = cloneObj(objArr[0]),
        len = objArr.length
    for (var i = 1; i < len; i++) {
        var obj = cloneObj(objArr[i])
        for (var attr in obj) {
            obj1[attr] = obj[attr]
        }
    }
    return obj1;
}

//复制自定义的简单对象,例如 {a:{}, b:{}}, 对象里面可以任意嵌套
function cloneObj(obj) {
    if (!obj) return {}
    var obj1 = $.toJSON(obj)
    eval('obj1 = ' + obj1)
    return obj1
}

function appendSelectMenu(id, data) {
    var select = $("#" + id);
    var text = "";
    for (var key in data) {
        text = data[key];
        select.append('<option value = "' + key + '">' + text + '</option>');
    }
}

function buildSelectMenu(id, data) {
    var select = $("#" + id).empty();
    var text = "";
    var options = ''
    for (var key in data) {
        text = data[key];
        options += '<option value = "' + key + '">' + text + '</option>'
    }
    select.html(options)
}

function buildSelectMenuWithI18N(id, data) {
    var select = $("#" + id);
    var text = "";
    for (var key in data) {
        text = data[key];
        var textStr = '';
        if (isNumber(text * 1)) {
            textStr = text;
        } else {
            textStr = jsI18N[text];
        }
        select.append('<option value = "' + key + '">' + textStr + '</option>');
    }
}

Number.prototype.myToFixed = function(len) {
    var tmp = (this > 0 ? 0.5 : -0.5);
    return (parseInt(this * Math.pow(10, len) + tmp, 10) / Math.pow(10, len)).toFixed(len);
}

/** 格式化数字，#,###.##；负数用红色, 默认是显示小数后两位, len为小数点后的位数 */
function format(num, len) {
    if (!len && len != 0) len = 2
    var oldNum = num;
    try {
        num = 1 * num;
        num = String(num.myToFixed(len));
        if (num == 'NaN') num = oldNum;
        var re = /(-?\d+)(\d{3})/;
        while (re.test(num)) num = num.replace(re, "$1,$2");
        if (num.charAt(0) == '-') num = '<font class="redFont">' + num + '</font>';
        return num;
    } catch (e) {
        return num;
    }
}

/** 格式化数字，#,###.##；默认是显示小数后两位, len为小数点后的位数 */
function formatNoRed(num, len) {
    if (!len && len != 0) len = 2
    var oldNum = num;
    try {
        num = 1 * num;
        num = String(num.myToFixed(len));
        if (num == 'NaN') num = oldNum;
        var re = /(-?\d+)(\d{3})/;
        while (re.test(num)) num = num.replace(re, "$1,$2");
        return num;
    } catch (e) {
        return num;
    }
}

/** 格式化数字，#,### */
function format2(num) {
    try {
        num = 1 * num;
        num = String(num.myToFixed(0));
        var re = /(-?\d+)(\d{3})/;
        while (re.test(num)) num = num.replace(re, "$1,$2");
        if (num.charAt(0) == '-') num = '<font class="redFont">' + num + '</font>';
        return num;
    } catch (e) {
        return num;
    }
}

/** 格式化数字，如果是小数则最多保留2位，如果是整数则返回整数 */
function format3(num) {
    try {
        var src = 1 * num;
        num = String(src.myToFixed(0));
        if (1 * num == src) return format2(src);
        num = String(src.myToFixed(1));
        if (1 * num == src) return format(src, 1);
        return format(src, 2);
    } catch (e) {
        return num;
    }
}

function isNumber(str) {
    if (/^-?\d+\.?\d*$/.test(str)) return true
    return false
}

/** 去除字符串中的空格, 此函数对ie无效 */
function trim(str) {
    if (typeof str == 'number') return str;
    return str.replace(/\s+/g, "");
}

/** 同format，但零返回空 */
function formatNoZero(num) {
    if (num == "" || num == 0) return '';
    return format(num);
}

/** 同format2，但零返回空 */
function format2NoZero(num) {
    if (num == "" || num == 0) return '';
    return format2(num);
}

function unformat(num) {
    if (typeof num != "string") {
        return num;
    }
    var rt = "";
    for (var i = 0; i < num.length; i++) {
        var c = num.charAt(i);
        if (c != ',') rt = rt + c;
    }
    return 1 * rt;
}

/**
 * 测试当前输入是否为浮点数字，注意会有个中间状态，比如 '12.' 也是返回 true的;
 * @param val
 * @returns {boolean}
 */
function testFloatNumber(val) {
    var regex = /^(0|[0-9]+\.|[0-9]+\.[0-9]*[1-9][0-9]*|[0-9]*[1-9][0-9]*\.[0-9]+|[0-9]*[1-9][0-9]*)$/g;
    var regex2 = /^[0-9]+\.$/g;
    return regex.test(val) || regex2.test(val);
}

/** 在n前补0，直到长度达到len */
function fillZero(n, len) {
    var s = n + "";
    while (s.length < len) s = '0' + s;
    return s;
}

/** 计算n的阶乘 */
function factorial(n) {
    if (n == 0) return 1;
    var t = 1;
    for (var i = 2; i <= n; i++) t = t * i;
    return t;
}

/** 数字串s的排列，s中的数字可重复 */
function rank(s) {
    //alert(s);
    var r = new Array();
    var t = factorial(s.length);
    for (var i = 0; i <= 9; i++) r[i] = 0;
    // IE BUGGY: 用 s[i]的写法，在某些IE8下会返回undefine，导致计算错误，所以要用charAt
    for (var i = 0; i < s.length; i++) {
        r[1 * s.charAt(i)]++;
        //alert($.toJSON(r));
    }
    for (var i = 0; i <= 9; i++) {
        if (r[i] > 1) t = t / factorial(r[i]);
    }
    return t;
}

function count(obj) {
    if (typeof obj != 'object') {
        return 0;
    }
    var count = 0;
    for (var i in obj) {
        count++;
    }
    return count;
}

//用于检验obj是否为空, {} || null || undefined 都是空
function isEmpty(obj) {
    var type = typeof obj;
    if (type == 'undefined') return true;
    if (type != 'object') return false;
    if (obj == null) return true;
    for (var i in obj) {
        return false;
    }
    return true;
}

function getDateDiff(date1, date2) {
    var re = /^(\d{4})\S(\d{1,2})\S(\d{1,2})$/;
    var dt1, dt2;
    if (re.test(date1)) {
        dt1 = new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3);
    }
    if (re.test(date2)) {
        dt2 = new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3);
    }
    return Math.abs(Math.floor((dt2 - dt1) / (1000 * 60 * 60 * 24)));
}

function getDateString(dt) {
    var yy = dt.getFullYear(),
        mm = dt.getMonth() + 1,
        dd = dt.getDate();
    return yy + "-" + ((mm < 10) ? "0" : "") + mm + "-" + ((dd < 10) ? "0" : "") + dd;
}

function replaceHtml(el, html) {
    var oldEl = typeof el === "string" ? $("#" + el)[0] : el;
    /*@cc_on // Pure innerHTML is slightly faster in IE
          oldEl.innerHTML = html;
          return oldEl;
      @*/
    var newEl = oldEl.cloneNode(false);
    newEl.innerHTML = html;
    oldEl.parentNode.replaceChild(newEl, oldEl);
    /* Since we just removed the old element from the DOM, return a reference
      to the new element, which can be used to restore variable references. */
    return newEl;
}

function getHTMLTitle(title, colspan) {
    return '<tr class="main_table_title"><th colspan=' + colspan + '>&nbsp;' + title + '</th></tr>';
}

/* callback: 转页事件被触发后,需要调用的函数
 * attrPage: 当前页数变量的名称, 必须是参数obj的一个属性, 默认值是 'gpage'
 * params: 以数组的方式把attrCallback函数需要的参数传递过来,目前数组元素只接受类型是基本数据类型的变量
 * obj: 一般可以不传这个参数, 默认是使用window这个全局变量的
 **/
function getHTMLFooterNew(count, size, page, callback, attrPage, params, obj) {
    if (!obj) obj = window
    if (!params) params = []
    if (!attrPage || attrPage == '') attrPage = 'gpage'
    var pages = Math.floor((count - 1) / size) + 1;
    window.__footer = {
        eventFooterChange: function(self) {
            var val = $(self).val();
            if (/^[1-9]\d*$/.test(val) && val <= pages && val > 0) obj[attrPage] = val * 1;
            //  val > 0 && val <=pages && (obj[attrPage] = val*1);
        },
        eventFooterClick: function(type) {
            switch (type) {
                case 1:
                    if (obj[attrPage] != 1) {
                        obj[attrPage] = 1;
                        callback.apply(obj, params);
                    }
                    break;
                case 2:
                    if (obj[attrPage] != 1) {
                        obj[attrPage] -= 1;
                        callback.apply(obj, params);
                    }
                    break;
                case 3:
                    if (obj[attrPage] != pages) {
                        obj[attrPage] += 1;
                        callback.apply(obj, params);
                    }
                    break;
                case 4:
                    if (obj[attrPage] != pages) {
                        obj[attrPage] = pages;
                        callback.apply(obj, params);
                    }
                    break;
                case 5:
                    if (obj[attrPage] != page) {
                        callback.apply(obj, params);
                    }
                    break;
            }
        }
    }
    var strOnclick = 'onclick="__footer.eventFooterClick(';
    var html = '<table id="tblFooter" border="0" cellpadding="0" cellspacing="1"  class="main_table"><tr class = "main_table_even"><td align="center">' +
        jsI18N.PagingFooterRecordPrefix + count + jsI18N.PagingFooterRecord + '&nbsp;&nbsp;&nbsp;' +
        jsI18N.PagingFooterPagePrefix + page + '/' + pages + jsI18N.PagingFooterPage + '&nbsp;&nbsp;&nbsp;' +
        '<a ' + strOnclick + '1)" href="javascript:void(0)" class = "link1">' + jsI18N.PagingFooterPageFirst + '</a>&nbsp;&nbsp;\
  <a ' + strOnclick + '2)" href="javascript:void(0)" class = "link1">' + jsI18N.PagingFooterPagePrev + '</a>&nbsp;&nbsp;\
  <a ' + strOnclick + '3)" href="javascript:void(0)" class = "link1">' + jsI18N.PagingFooterPageNext + '</a>&nbsp;&nbsp;\
  <a ' + strOnclick + '4)" href="javascript:void(0)" class = "link1">' + jsI18N.PagingFooterPageLast + '</a>&nbsp;&nbsp;\
  <input onchange="__footer.eventFooterChange(this)"  size=2 maxlength=3  class="input2">&nbsp;\
    <a ' + strOnclick + '5)"  href="javascript:void(0)" class = "link1">' + jsI18N.PagingFooterPageJump + '</a>' +
        '</td></tr></table>';
    return html;
}

//suffix为在同一个页面上需要区分多种分页而添加的后缀
function getHTMLFooter(count, size, page, suffix) {
    if (!suffix) suffix = ''
    var pages = Math.floor((count - 1) / size) + 1;
    var html = '<table id="tblFooter" border="0" cellpadding="0" cellspacing="1"  class="main_table"><tr class = "main_table_even"><td align="center">' +
        jsI18N.PagingFooterRecordPrefix + count + jsI18N.PagingFooterRecord + '&nbsp;&nbsp;&nbsp;' +
        jsI18N.PagingFooterPagePrefix + page + '/' + pages + jsI18N.PagingFooterPage + '&nbsp;&nbsp;&nbsp;' +
        '<a id="lnkFooterFirst' + suffix + '" href="javascript:void(0)" class = "link1">' + jsI18N.PagingFooterPageFirst + '</a>&nbsp;&nbsp;' +
        '<a id="lnkFooterPrev' + suffix + '" href="javascript:void(0)" class = "link1">' + jsI18N.PagingFooterPagePrev + '</a>&nbsp;&nbsp;' +
        '<a id="lnkFooterNext' + suffix + '" href="javascript:void(0)" class = "link1">' + jsI18N.PagingFooterPageNext + '</a>&nbsp;&nbsp;' +
        '<a id="lnkFooterLast' + suffix + '" href="javascript:void(0)" class = "link1">' + jsI18N.PagingFooterPageLast + '</a>&nbsp;&nbsp;' +
        '<input id="txtJump' + suffix + '" size=2 maxlength=3  class="input2">&nbsp;<a id="lnkFooterJump' + suffix + '" href="javascript:void(0)" class = "link1">' + jsI18N.PagingFooterPageJump + '</a>' +
        '</td></tr></table>';
    return html;
}

/** 给分页链接加上事件，需要页面上已经有分页链接和txtHiddenPage， suffix为在同一个页面上需要区分多种分页而添加的后缀*/
function addEventFooter(pages, callback, suffix) {
    if (!suffix) suffix = '';
    $("#lnkFooterFirst" + suffix).click(function() {

        if ($("#txtHiddenPage" + suffix).val() != 1) {
            $("#txtHiddenPage" + suffix).val(1);
            callback();
        }
    });
    $("#lnkFooterPrev" + suffix).click(function() {
        if ($("#txtHiddenPage" + suffix).val() != 1) {
            $("#txtHiddenPage" + suffix).val($("#txtHiddenPage" + suffix).val() - 1);
            callback();
        }
    });
    $("#lnkFooterNext" + suffix).click(function() {
        if ($("#txtHiddenPage" + suffix).val() != pages) {
            $("#txtHiddenPage" + suffix).val(1 * $("#txtHiddenPage" + suffix).val() + 1);
            callback();
        }
    });
    $("#lnkFooterLast" + suffix).click(function() {
        if ($("#txtHiddenPage" + suffix).val() != pages) {
            $("#txtHiddenPage" + suffix).val(pages);
            callback();
        }
    });
    $("#lnkFooterJump" + suffix).click(function() {
        var txtJump = $("#txtJump" + suffix).val().trim();
        if (txtJump > 0 && txtJump != " " && $("#txtHiddenPage" + suffix).val() != txtJump && txtJump <= pages && /^[1-9]\d*$/.test(txtJump)) {
            $("#txtHiddenPage" + suffix).val(txtJump);
            callback();
        }
    });
}

function getEventFooterForPage(count, size, callback) {
    var pages = Math.floor((count - 1) / size) + 1;
    addEventFooter(pages, function() {
        callback();
    });
}

function blockScreen() {
    $.blockUI({
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        }
    });
}

function unblockScreen() {
    $.unblockUI();
}

function message(info, callback) {
    if (info == undefined) info = 'undefined';
    var options = {
        buttons: {
            OK: true
        },
        prefix: 'cleanblue',
        top: '30%'
    };
    if (callback) options.callback = callback;
    $.prompt(info, options);
}

function errorMessage(code) {
    message(jsI18N["Error" + code]);
}

function errorMessageEx(code, ex) {
    message(jsI18N["Error" + code] + ex);
}


//<add-by-zxt>
/*
参数说明:
positionID 表要创建到的位置,string类型
tableID 表的id属性的值,string类型
style 要创建的表的各种属性及值,具体请看例子
head、body、foot 创建表的thead，tbody，tfoot所需要用到的数据，具体请看后面的例子
一个style的例子:
tableStyle = {width:"100%",border:"0",align:"center",cellpadding:"0",cellspacing:"1","class":"main_table_bg"};
mode 值为0或没写这个参数时，将会一行一行地添加；值为1时，将是先构建好字符串形式的全部行，然后一次性把表生成。
 */
function createTable(positionID, tableID, style, head, body, foot, mode) {
    var table = '<table id = "' + tableID + '" ' + style2Str(style) + '"><thead></thead><tbody></tbody><tfoot></tfoot></table>';
    if (!mode) mode = 0;
    if (mode == 0) {
        $("#" + positionID).html(table);
        createComponent(tableID, head, "thead", "th", mode);
        createComponent(tableID, body, "tbody", "td", mode);
        createComponent(tableID, foot, "tfoot", "td", mode);
    } else if (mode == 1) {
        var head = createComponent(tableID, head, "thead", "th", mode);
        var body = createComponent(tableID, body, "tbody", "td", mode);
        var foot = createComponent(tableID, foot, "tfoot", "td", mode);
        table = '<table id = "' + tableID + '" ' + style2Str(style) + '"><thead>' + head + '</thead><tbody>' + body + '</tbody><tfoot>' + foot + '</tfoot></table>';
        $("#" + positionID).html(table);

    }
}

/*直接一行一行地创建tbody*/
function createTbody(tableID, body) {
    createTableComponent(tableID, body, "tbody", "td", 0);
}

/*得到tbody的字符串形式*/
function getTbody(tableID, body) {
    return createTableComponent(tableID, body, "tbody", "td", 1);
}

/*
参数说明：	
一个componentObj的例子:			
body = [{
			//colstyle中的每个元素的属性,如下面的第二个属性(4),表示从它前面那个属性(2)开始(不包括第4列)的列直到它自己的列为止,
			//列从1开始计数。colstyle的最后一个属性必须是最后一列，且属性必须从小到大，如:{2:,5:,7:,8:}
			colstyle:{2:{rowspan:2,"class":"main_table_header2"},4:{colspan:3},5:{},6:{rowspan:2,"class":"main_table_header2"}},
			content:[jsI18N['No'],jsI18N['Company'],"2D","3D","4D",jsI18N['Function']],
			trstyle:{"class":"main_table_header"}
		},
		{
			colstyle:{7:{}},
			//下面这个数组可以只定义其中的某些下标代表的值,下标对应相应的行,从0开始,跟content对应，若数组某个元素未设定，则表示该元素对应的单元格的属性为空
			//用于设定每列都不相同的一些属性，比如id之类
			dynamicattribute:[{'class':'main_table_header2'}, ... ], 
			content:[jsI18N['Head'],jsI18N['Last'],jsI18N['Roll'],jsI18N['Head'],jsI18N['Last'],jsI18N['Roll'],jsI18N['Roll']],
			trstyle:{"class":"main_table_header"}
		}]
其他参数过于简单，请看createTable调用本函数的参数即可知晓
 */
function createTableComponent(tableID, componentObj, componentName, colType, mode) {
    if (mode == 0) {
        var component = $("#" + tableID + " " + componentName);
    } else {
        var component = "";
    }
    for (var i = 0; i < componentObj.length; i++) {
        if (!('colstyle' in componentObj[i])) {
            componentObj[i].colstyle = {};
        }
        if (!('trstyle' in componentObj[i])) {
            componentObj[i].trstyle = {};
        }
        if (!('content' in componentObj[i]))
            componentObj[i].content = [];
        var contents = componentObj[i].content;
        var dynamicAttrs = null;
        if ("dynamicattribute" in componentObj[i]) {
            dynamicAttrs = componentObj[i].dynamicattribute;
        }
        var j = 0;
        var tr = '<tr' + style2Str(componentObj[i].trstyle) + '>';
        for (col in componentObj[i].colstyle) {

            var colstyle = componentObj[i].colstyle[col];

            for (; j < parseInt(col); j++) {
                var dynamicAttr = {};

                if (dynamicAttrs != null && dynamicAttrs[j] != undefined)
                    dynamicAttr = dynamicAttrs[j];

                var content = "";
                if (contents.length != 0 && contents[j] != undefined)
                    content = contents[j];

                tr = tr + '<' + colType + style2Str(colstyle) + style2Str(dynamicAttr) + '>' + content + '</' + colType + '>';
            }
        }
        tr = tr + '</tr>';
        if (mode == 0)
            $(component).append(tr);
        else
            component = component + tr;
    }
    if (mode == 1) return component;
}

function createTbodyTr(tbody, tr) {
    tr = buildTr(tr, "td");
    $(tbody).append(tr);
}

function buildTr(tr, colType) {
    var trStr = '<tr' + style2Str(tr.trstyle) + '>';

    if (!('colstyle' in tr)) {
        tr.colstyle = {};
    }
    if (!('trstyle' in tr)) {
        tr.trstyle = {};
    }
    if (!('content' in tr))
        tr.content = [];
    var contents = tr.content;
    var dynamicAttrs = null;
    if ("dynamicattribute" in tr) {
        dynamicAttrs = tr.dynamicattribute;
    }

    var j = 0;
    for (col in tr.colstyle) {

        var colstyle = tr.colstyle[col];

        for (; j < parseInt(col); j++) {
            var dynamicAttr = {};

            if (dynamicAttrs != null && dynamicAttrs[j] != undefined)
                dynamicAttr = dynamicAttrs[j];

            var content = "";
            if (contents.length != 0 && contents[j] != undefined)
                content = contents[j];

            trStr += '<' + colType + style2Str(colstyle) + style2Str(dynamicAttr) + '>' + content + '</' + colType + '>';
        }
    }
    trStr += '</tr>';
    return trStr;
}

function style2Str(style) {
    var styleStr = "";
    for (var s in style) {
        styleStr = styleStr + ' ' + s + '="' + style[s] + '" ';
    }
    return styleStr;
}

/* todo 写上注释 */
function getTrs(contents) {
    var attr = null,
        trs = new Array(),
        count = 0,
        len = contents.length
    for (var i = 0; i < len; i++) { // in contents) {
        var content = contents[i],
            tag = content[3] || "td"
        trs[count++] = '<tr '
        trs[count++] = content[0]
        trs[count++] = '>'
        for (var j in content[1]) {
            var reg = /\$(\d{1,2})/g
            if (content[2][j]) {
                if (reg.test(content[2][j])) {
                    recursionReplace(j, content[2], reg)
                }
            }
            if (content[2][j] != '' && !content[2][j]) attr = attr
            else attr = content[2][j]
            if (reg.test(content[1][j])) {
                recursionReplace(j, content[1], reg)
            }
            trs[count++] = '<'
            trs[count++] = tag
            trs[count++] = ' '
            trs[count++] = attr
            trs[count++] = '>'
            trs[count++] = content[1][j]
            trs[count++] = '</'
            trs[count++] = tag
            trs[count++] = '>'
        }
        trs[count++] = "</tr>"
    }
    return trs.join('').replace(/{space(\d+)}/g, function(s, p1) {
        return strClone("&nbsp;", p1)
    })
}

function recursionReplace(i, strs, reg) {
    strs[i] = strs[i].replace(reg, function(s, p1) {
        return strs[p1]
    })
    if (reg.test(strs[i])) {
        recursionReplace(i, strs, reg)
    }
}
/*必须是edit事件处理函数里面第一条执行的语句‘
 *适用于这样的tr:<tr><td></td>...<td><a></a></td></tr>
 * */
function addCancel(tr) {
    var trClone = $(tr).clone(true);
    var table = $(tr).parent().parent();
    var tdLast = $(tr).find("td:last");
    $(tdLast).append('<span id = "spanCancel">&nbsp;/&nbsp;</span><a href = "javascript:void(0)" id = "aCancel" class="link1">' + jsI18N['Cancel'] + '</a>');
    var cancel = $(tdLast).find("a[id=aCancel]");
    $(cancel).unbind();
    $(cancel).click(function() {
        $(tr).before(trClone);
        $(tr).remove();
        $(table).tableHover();
    });
}

function removeCancel() {
    $("#spanCancel").remove();
    $("#aCancel").remove();
}

function hideCancel() {
    $("#spanCancel").hide();
    $("#aCancel").hide();
}

function showCancel() {
    $("#spanCancel").show();
    $("#aCancel").show();
}

function buildSelect(selectID, options, valueKey, textKey) {
    var sel = $("#" + selectID).empty(),
        html = ''
    for (var i = 0; i < options.length; i++) {
        html += '<option value="' + options[i][valueKey] + '">' + options[i][textKey] + '</option>'
    }
    sel.html(html)
}

/* 适用于单行多列的菜单生成 */
function buildTopMenuTd(topMenuConfig, tr) {
    var menus = topMenuConfig.menus;
    var tdCommon = '<td width=2 align="center" nowrap></td>';
    var params = {},
        tdStyle = {},
        td = '<td align = "center" nowrap>',
        url = '';
    for (var i in menus) {
        params = menus[i].params;
        url = topMenuConfig.url_common;
        for (var key in params) {
            url += "&" + key + "=" + params[key];
        }
        tr.append(td + '<a href = "' + url + '" target = "' + topMenuConfig.target + '">' + menus[i].text + '</a></td>');
        if ('td_style' in menus[i]) {
            tdStyle = menus[i].td_style;
        }
        for (var key in tdStyle) {
            tr.find("td:last").attr(key, tdStyle[key]);
        }
        if (topMenuConfig.has_blank_col) tr.append(tdCommon);
    }
}

/* 适用于单行多列的菜单生成 */
function buildTopMenu(topMenuConfig, tags, flag) {
    if (!window.flagDev && window.flagDev != 0) window.flagDev = 1;
    if (!flag) flag = window.flagDev;
    tags.empty();
    var menus = topMenuConfig.menus;
    var params = {},
        style = {},
        url = '';
    var tag = 'li';
    if (topMenuConfig.tag) tag = topMenuConfig.tag;

    if (topMenuConfig.order) {
        var order = topMenuConfig.order;
        var hasOrder = true;
    } else {
        order = topMenuConfig.menus;
        hasOrder = false;
    }
    for (var idx in order) {
        if (hasOrder) var i = order[idx];
        else i = idx;
        if (!menus[i]) continue;
        if (!flag && menus[i].isdev) continue;
        params = menus[i].params;
        url = topMenuConfig.url_common;
        for (var key in params) {
            url += "&" + key + "=" + params[key];
        }
        var target = menus[i].target != undefined && menus[i].target != null && menus[i].target != '' ? menus[i].target : topMenuConfig.target;
        tags.append('<' + tag + '><a mrkt="' + params['mrkt'] + '" href = "' + url + '" target = "' + target + '">' + menus[i].text + '</a></' + tag + '>');
        if ('style' in menus[i]) {
            style = menus[i].style;
        }
        for (key in style) {
            tags.find(tag + ":last").attr(key, style[key]);
        }
    }
}

//替换掉cookie不支持的字符
function replaceCookieIllegalSymbol(str) {
    /* &0   (空格)
     * &1  ;
     * &2  ，
     * &3  \
     * &4  "
     * &5  <
     * &6 >
     * &7 :
     * &8 {
     * &9 }
     **/
    return str = str.replace(/ /g, "&0").replace(/;/g, "&1").replace(/,/g, "&2").replace(/\\/g, "&3")
        .replace(/"/g, "&4").replace(/</g, "&5").replace(/>/g, "&6").replace(/:/g, "&7").replace(/{/g, "&8").replace(/}/g, "&9")
}

//还原cookie中被替换掉的字符
function restoreCookieIllegalSymbol(str) {
    return str = str.replace(/&0/g, " ").replace(/&1/g, ";").replace(/&2/g, ",").replace(/&3/g, "\\")
        .replace(/&4/g, "\"").replace(/&5/g, "<").replace(/&6/g, ">").replace(/&7/g, ":").replace(/&8/g, "{").replace(/&9/g, "}")
}

function setCookie(c_name, value, expiredays) {
    var cookie_path = window.location.pathname;
    cookie_path = cookie_path.substring(0, cookie_path.lastIndexOf('/') + 1);

    var exdate = new Date((new Date()).getTime() + expiredays * 24 * 60 * 60000);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : (";expires=" + exdate.toGMTString())) + "; path=" + cookie_path;

}

function getCookie(c_name) {
    try {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                var c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                var rt = unescape(document.cookie.substring(c_start, c_end));
                return rt;
            }
        }
    } catch (e) {
        return '';
    }
    return "";
}

/*
 * visible  1为可见, 0为隐藏
 * 只传一个参数的话, 就是改变相应元素的可见状态(可见->隐藏, 隐藏->可见)
 * 只传两个参数的话, 就是根据第二个参数硬性决定由key决定的元素是可见还是隐藏
 * 传三个参数的话, 就不解释了, 太简单了, 反而不知怎样说
 **/
function show(key, visible, vo) {
    if (!vo) vo = gSectionVisible;
    //不传参数,则把所有vo中指定的selector按指定的状态显示或隐藏
    if (!key) {
        for (var i in vo) {
            var o = $(vo[i][0]);
            if (o.length == 0) continue;
            if (vo[i][1]) o.show();
            else o.hide();
        }
        return;
    }
    key = key.toLowerCase();
    var o = $(vo[key][0]);

    //只传一个参数,则往相反的方向改变显示状态:隐藏=>显示,显示=>隐藏。并保持这个状态
    if (visible == undefined || visible == null) {
        if (o.length == 0) return;
        vo[key][1] = !vo[key][1];
        if (vo[key][1]) o.show();
        else o.hide();
        return;
    }

    //只传两个参数,则按指定的状态显示或隐藏
    vo[key][1] = (visible == 1);
    if (o.length == 0) return;
    if (vo[key][1]) o.show();
    else o.hide();
}

//str 要被复制的字符串
//n  要复制的次数
function strClone(str, n) {
    var rt = ''
    for (var i = 0; i < n; i++) {
        rt += str
    }
    return rt
}

jtplCountTest = 1
//jtplSrc = 'jtpl/sports-more-type.htm'
//注意:不能修改这个函数定义的参数T的名称
function parseJtpl(txt, T, src) {
    if (!T) T = {} //防止未传T时出错, 主要是在下面有些代码 T[s[0]],在T未定义的时候会出错
    //此变量的设置主要是为了模板中使用{t.xxx}跟{T.xxx}有同样的效果,即不区分大小写
    //但是尽量别用t, 这只是为了兼容之前的某些已经写好的代码
    var t = T;
    var winAuto = window
    if (!winAuto.jtplSrc) jtplSrc = "nothing"
    if (!winAuto.jtplCountTest) jtplCountTest = 1
    //cf("parse begin")
    //for (var i in T) {
    // eval('var ' + i + ' = ' + 'T[i];')
    //}
    //var jsi18n = winAuto.jsi18n   //主要是为了减少对全局变量的查找,提高性能
    var oldTxt = txt; //此变量用于性能测试, 不然循环再多次也只会执行一次有效的循环
    var time = 0.0000,
        lenTest = 1,
        t1 = new Date(),
        jtplSrc = winAuto.jtplSrc //性能测试时用于计算时间
    if (src == jtplSrc) lenTest = jtplCountTest;
    //cf(lenTest)
    for (i = 0; i < lenTest; i++) {
        txt = oldTxt
        //if(src == jtplSrc) cf("status  " + status)
        txt = txt.replace(/\n|\r/g, '')
        //cf("loop parse begin")
        //循环解析
        txt = txt.replace(/{for\s+(\w+(\.\w+)*)\s*}(.*?){\/for}/g, function(s, p1, p2, p3) {
            var tmpP1 = p1.split('.'),
                tmp, error = false,
                tmpLen = tmpP1.length;
            tmpP1[0] == 't' && (tmp = t);
            tmpP1[0] == 'T' && (tmp = T);
            //原先是采用tmp=eval(tmpP1[0])的写法,但那样影响性能,现在改成这种形式,性能比原来提高一倍以上
            (!tmp) && (tmp = T[tmpP1[0]] || winAuto[tmpP1[0]]);
            for (var i = 1; i < tmpLen; i++) {
                if (!tmp) {
                    error = true
                    break;
                }
                tmp = tmp[tmpP1[i]]
            }
            if (!error) {
                var len = tmp,
                    text = ''
                tmp = ''
                for (i = 0; i < len; i++) {
                    text = p3.replace(/\{\w+\}/g, i)
                    tmp += text
                }
                return tmp;
            } else {
                p3 = p3.replace(/\{(\w+)\}/g, '$1')
                return p3
            }
        })
        //cf("loop parse end")
        var regExp = /{\w+(\.\w+)*}/



        /*//测试中的另一种替换算法,理论上应该比原来的优,但实质上却比原来的差,现在估计原因在于txt.replace()不进行全局替换时,
         //会不断地创建新的String对象(这个对象至少跟txt的大小一样), 还有就是字符串分割时,由于不能使用指针,导致每次分割都创建了新的
         //String对象,并且赋值过程极有可能是采用逐个字符循环赋值的方法,导致性能大大下降
          var index = 0, oldIndex = 0, txt1 = "";
          oldIndex = txt.search(regExp);
          while(index != -1) {
            //if(src == jtplSrc) cf("old " + oldIndex)

            txt = txt.replace(/{\w+(\.\w+)*}/, function(s) {
              //cf(s)
              s = s.substr(1, s.length-2).split('.')
              var tmp = s[0], len = s.length
              for (var i = 1; i < len; i++) {
                //cf(tmp)
                if (!eval(tmp)) break
                tmp += "['" + s[i] + "']"
              }
              eval('tmp = ' + tmp)
              if (!tmp && s[0] == 'jsi18n') tmp = s[len-1]
              else if (!tmp) tmp = 'nbsp'
              //cf(tmp)
              return tmp
            })

            //if(src == jtplSrc) cf("replace    " + txt)
            index = txt.search(regExp);
            //if(src == jtplSrc) cf("new " + index)
            if (index - oldIndex > 0) {
              //切割字符串,切除已经完全解析的部分
              //if(src == jtplSrc) cf("txtsub    " +  txt.substring(0, oldIndex))
              txt1 += txt.slice(0, oldIndex)
              txt = txt.slice(oldIndex, txt.length)
              oldIndex = index - oldIndex
            } else {
              oldIndex = index
            }
            //if(src == jtplSrc) cf("txt1    " + txt1)
            //if(src == jtplSrc) cf("txt    " + txt)
          }
         */
        var reg = /{\w+(\.\w+)*}/g
        while (txt.search(regExp) != -1) {
            txt = txt.replace(reg, function(s) {
                //cf(s)
                s = s.substr(1, s.length - 2).split('.')
                var tmp, len = s.length;
                s[0] == 't' && (tmp = t);
                s[0] == 'T' && (tmp = T);
                (!tmp) && (tmp = T[s[0]] || winAuto[s[0]]);
                for (var i = 1; i < len; i++) {
                    if (!tmp) break;
                    tmp = tmp[s[i]]
                }

                if (!tmp && s[0] == 'jsi18n') tmp = s[len - 1]
                else if (!tmp) tmp = '_nbsp_'
                return tmp
            })
        }
        /* 函数解析替换
        txt = txt.replace(/{(\w+)\(((.*)(,.*)*)\)}/, function(s, p1, p2) {
          var fun = T[p1] || window[p1]
          var param = p2.split(',')
          cf(fun, param)
          return fun.apply(window, param)
        })
         */
        txt = txt.replace(/_nbsp_/g, '')
        //if(i == 299) cf(123)
    }

    //性能测试时用于计算时间
    var t2 = new Date()
    t1 = t1.getSeconds() + "." + t1.getMilliseconds()
    t2 = t2.getSeconds() + "." + t2.getMilliseconds()
    time += (t2 - t1)
    if (src == jtplSrc) al(time)
    //al(t2 + "   " + t1 + "   " + (t2-t1))
    return txt;
}

/* 参数说明
 * selector: string类型, 用于jquery()的参数,获取到的模板文本将会以某种方式嵌入到这个selector所代表的标签中
 * src: string类型, 模板文本的来源, 暂时只能接受另一文件传过来的文本, 而不能取自本文件的某个标签文本, 该文件必须是.htm类型, 例子: jtpl/user-tpl.htm
 * fun: function类型, 模板文件加载成功之后,要执行的函数
 * params: 用于模板和fun的参数, 假如模板中有 {product.11.1}, 而product并不是全局变量, 那么就要以params = {product:product}的形式把 product变量传递进去
 *  
 *  术语说明(后面解说会用到):
 *    模板变量:　{jsi18n.hi}, {pt.1.3.a} 等等, 均为模板变量
 *    模板变量的嵌套级别: 模板变量里面有几层, 则算做几级, 如 {a.1}为0级, {a.{i}}为1级
 *    循环模板:  {for length}....{/for}
 *    循环变量:   {for pa.length} {pa.{i}}  {/for},  {pa.{i}}就叫循环变量(其实跟模板变量是同样形式的,只不过在循环解析阶段就会被解析成0级)
 *    对象本身及各属性的级别:  a = {b:{c:123}}, a为对象本身, 是第一级, b和c分别为第二和么三级属性
 *    全局变量和window的关系: 定义了一个全局变量 a = 3, 则window.a 就是指刚刚定义的这个a变量,
 *                          如果直接写 a, 则a为第一级, 如果写成window.a, 则a为第二级
 *
 *  禁止事项(主要是为了性能,不然可以用try{}catch(){}结构进行容错):
 *    对象的第一级不能未定义或为null以及其他会抛出异常的值,
 *    根据术语说明中讲到的,
 *                      或a未定义,直接写{a},是不允许且会出错的, 而写成{window.a}, 则是允许且不会出错的
 *                      或a已定义,直接写{a},或写成{window.a},都是允许且不会出错的
 *
 *  使用方法:
 *    解析的总体顺序: 解析循环模板->解析模板变量
 *    解析循环模板: 此阶段的目标是把循环模板去掉, 当然会按循环次数做相应的操作, 并且把循环中的一些循环变量转变成0级模板变量
 *
 *    解析模板变量
 *    以  {jsi18n.{more.type}}  为例子,
 *    首先,
 *    1)会找到最里层的花括号{}, 把more.type变成more['type'], 即是说除开第一级, 其他的级别的字段都会变成 ['xxx'] 的形式
 *    假如 more.type 的值为 "Hello", 则进行第一次替换之后,
 *    将会变成  {jsi18n.Hello}, 这样, 又回到了步骤 1)的过程
 *
 *  实现上述解析功能的函数说明:
 *  parseJtpl(txt, params, i18n)
 *  参数
 *  txt: string类型, 模板文件转化成的文本字符串, 在type为2的情况下, 需要手工接收这个参数
 *  params: object类型, 来自jtpl的第四个参数, 模板中需要用到的局部变量(或对象)所集合而成的对象, 这个参数只在type为2的情况下才需要设置
 *        例如:模板中要用到三个对象, {abc.1}, {bcd.2}, {cde.3}, 假如abc、bcd、cde来自x、y、z三个对象, 则param为{abc:x, bcd:y, cde:z}
 *
 *
 */
function jtpl(selector, src, fun, params) {
    var jtplCache = window.jtplCache //&& 0
    //null和undefined的顺序不能改变,因为null是用来测试对象的,而undefined是用来测试一个变量(可能是方法之类的东西)是否未被定义
    if (jtplCache == null || jtplCache == undefined) jtplCache = false;
    if (!params) params = {}
    if (!fun) fun = function() {}
    $.ajax({
        url: src,
        cache: jtplCache,
        //ifModified :true,
        success: function(responseText) {
            responseText = parseJtpl(responseText, params, src)
            //cf(responseText)
            if (selector == 'body') {
                $(selector).prepend('<div id="divJtpl"/>') //添加一个div主要是为了使用下面的replaceHtml
                replaceHtml('divJtpl', responseText);
                //        var div = $(selector).find('div')
                //        div[0].innerHTML = (responseText)
            } else replaceHtml($(selector)[0], responseText);
            fun(params)
        }
    })
}
//</add-by-zxt>

/*<适用于marketLotto>*/
function buildCompanyWeekdaySelect(selID, date, mrkt) {
    if (!mrkt) mrkt = 130;
    var params = {
        _a: "lotto3",
        _b: "aj",
        cmd: "getCompanyByDate",
        date: date
    };
    ajax(params, function(obj) {
        var companys = obj['info']['result'];
        var select = $("#" + selID);
        $(select).html("");
        $(select).append('<option value="">' + jsI18N['All'] + '</option>');
        for (var c in companys) {
            var company = companys[c];
            $(select).append('<option value="' + company['code'] + '">' + company['name'] + '</option>');
        }
    });
}

function buildAllCompanySelect(selID, mrkt) {
    if (!mrkt) mrkt = 130;
    var params = {
        _a: "setting",
        _b: "aj",
        cmd: "getAllCompany",
        mrkt: mrkt
    };
    ajax(params, function(obj) {
        var companys = obj['info']['result'];
        var select = $("#" + selID);
        $(select).html("");
        $(select).append('<option value="">' + jsI18N['All'] + '</option>');
        for (var c in companys) {
            var company = companys[c];
            $(select).append('<option value="' + company['code'] + '">' + company['name'] + '</option>');
        }
    });
}

function hasPrivilege(prvlCode, privilege) {
    return ((privilege & prvlCode) != 0);
}

function fixBetAid(currency) {
    if (currency == "VND") {
        $("#btnBetAid1").val("+10");
        $("#btnBetAid2").val("+50");
        $("#btnBetAid3").val("+100");
        $("#btnBetAid4").val("+500");
        $("#btnBetAid5").val("+1000");
        $("#btnBetAid6").val("+2000");
        $("#btnBetAid7").val("+5000");
    } else if (currency == "RIEL") {
        $("#btnBetAid1").val("1000");
        $("#btnBetAid2").val("5000");
        $("#btnBetAid3").val("10000");
        $("#btnBetAid4").val("50000");
        $("#btnBetAid5").val("100000");
        $("#btnBetAid6").val("200000");
        $("#btnBetAid7").val("500000");
    } else if (currency == "THB") {
        $("#btnBetAid1").val("+30");
        $("#btnBetAid2").val("+150");
        $("#btnBetAid3").val("+300");
        $("#btnBetAid4").val("+600");
        $("#btnBetAid5").val("+1500");
        $("#btnBetAid6").val("+3000");
        $("#btnBetAid7").val("+15000");
    } else if (currency == "EUR") {
        $("#btnBetAid1").val("+1");
        $("#btnBetAid2").val("+5");
        $("#btnBetAid3").val("+10");
        $("#btnBetAid4").val("+20");
        $("#btnBetAid5").val("+50");
        $("#btnBetAid6").val("+100");
        $("#btnBetAid7").val("+500");
    } else {
        $("#btnBetAid1").val("+1");
        $("#btnBetAid2").val("+5");
        $("#btnBetAid3").val("+10");
        $("#btnBetAid4").val("+20");
        $("#btnBetAid5").val("+50");
        $("#btnBetAid6").val("+100");
        $("#btnBetAid7").val("+500");
    }
}

function fixBetAid2(currency) {
    if (currency == "VND") {
        $("input[id^=btnBetVal1]").val("10").attr("v", "10");
        $("input[id^=btnBetVal2]").val("50").attr("v", "50");
        $("input[id^=btnBetVal3]").val("100").attr("v", "100");
        $("input[id^=btnBetVal4]").val("500").attr("v", "500");
        $("input[id^=btnBetVal5]").val("1000").attr("v", "1000");
        $("input[id^=btnBetVal6]").val("2000").attr("v", "2000");
        $("input[id^=btnBetVal7]").val("5000").attr("v", "5000");
    } else if (currency == "RIEL") {
        $("input[id^=btnBetVal1]").val("1K").attr("v", "1000");
        $("input[id^=btnBetVal2]").val("5K").attr("v", "5000");
        $("input[id^=btnBetVal3]").val("10K").attr("v", "10000");
        $("input[id^=btnBetVal4]").val("50K").attr("v", "50000");
        $("input[id^=btnBetVal5]").val("100K").attr("v", "100000");
        $("input[id^=btnBetVal6]").val("200K").attr("v", "200000");
        $("input[id^=btnBetVal7]").val("500K").attr("v", "500000");
    } else if (currency == "THB") {
        $("input[id^=btnBetVal1]").val("30").attr("v", "30");
        $("input[id^=btnBetVal2]").val("150").attr("v", "150");
        $("input[id^=btnBetVal3]").val("300").attr("v", "300");
        $("input[id^=btnBetVal4]").val("600").attr("v", "600");
        $("input[id^=btnBetVal5]").val("1500").attr("v", "1500");
        $("input[id^=btnBetVal6]").val("3000").attr("v", "3000");
        $("input[id^=btnBetVal7]").val("15000").attr("v", "15000");
    } else if (currency == "IDR") {
        $("input[id^=btnBetVal1]").val("10").attr("v", "10");
        $("input[id^=btnBetVal2]").val("50").attr("v", "50");
        $("input[id^=btnBetVal3]").val("100").attr("v", "100");
        $("input[id^=btnBetVal4]").val("500").attr("v", "500");
        $("input[id^=btnBetVal5]").val("1000").attr("v", "1000");
        $("input[id^=btnBetVal6]").val("2000").attr("v", "2000");
        $("input[id^=btnBetVal7]").val("5000").attr("v", "5000");
    } else {
        $("input[id^=btnBetVal1]").val("1").attr("v", "1");
        $("input[id^=btnBetVal2]").val("5").attr("v", "5");
        $("input[id^=btnBetVal3]").val("10").attr("v", "10");
        $("input[id^=btnBetVal4]").val("20").attr("v", "20");
        $("input[id^=btnBetVal5]").val("50").attr("v", "50");
        $("input[id^=btnBetVal6]").val("100").attr("v", "100");
        $("input[id^=btnBetVal7]").val("500").attr("v", "500");
    }
}

/** NOTE: xWin plugin has been modified to fulfill our requirement. 
 TODO: 已经没有用到了 */
function showVideoSnapshot(tab, screendump, title) {
    var img = "<img id='imgSnapshot' border=0 height=100% width=100% src='" + "snapshot.php?f=" + screendump + "&rnd=" + Math.random() + "' />";
    $("#divSnapshot").xWin({
        show: "si",
        //start: "center",
        title: title,
        top: 80 + document.body.scrollTop,
        left: 80,
        width: 640,
        height: 480,
        resizable: "no",
        content: img,
        status: "mega"
    });
}

/*生成一个货币选择的下拉框的带有html标记的字符串
 *currencys：string--待选货币
 *defaultCurrency：缺省的货币
 * */
function selCurrency(currencys, defaultCurrency) {
    var currencys = currencys.split(',');
    var selCur = '<select id = "selCurrency">';

    for (var cu in currencys) {
        if (currencys[cu] == defaultCurrency) {
            selCur += '<option value = "' + currencys[cu] + '" selected = "selected">' + currencys[cu] + '</option>';
        } else {
            selCur += '<option value = "' + currencys[cu] + '">' + currencys[cu] + '</option>';
        }
    }
    selCur += '</select>';
    return selCur;
}

function diffTime(time1, time2) {
    var r1 = time1.split(" "),
        r2 = time2.split(" ");
    var d1 = r1[0].split("-"),
        t1 = r1[1].split(":"),
        d2 = r2[0].split("-"),
        t2 = r2[1].split(":");
    var f1 = new Date(d1[0], d1[1] - 1, d1[2], t1[0], t1[1], t1[2]),
        f2 = new Date(d2[0], d2[1] - 1, d2[2], t2[0], t2[1], t2[2]);
    return (f1.getTime() - f2.getTime()) / 1000;
}


function removeErrorInputClass() {
    $("span[class=errorTip]").remove();
    $("input").removeClass("errorInput");
}

function initCalendar(id) {
    $("#" + id).datepicker({
        showOn: 'both',
        buttonImage: 'images/calendar/icon_v2.gif',
        buttonImageOnly: true
    });
}

function bindMenuEvent(ul, idx) {
    var items = ul.find("a"),
        length = items.length,
        selected = 0;
    if (idx >= 0 && idx <= length) {
        selected = idx;
    }
    items.eq(selected).attr("class", "hover");
    for (var i = 0; i < length; i++) {
        items.eq(i).click(function() {
            $(this).parent().parent().find(".hover").attr("class", "");
            $(this).attr("class", "hover");
        });
    }
}

function checkPassword(obj, compareLen) {
    $('.errorTip').remove();
    obj.removeClass('errorInput');
    if (!compareLen) compareLen = 8;
    var str = obj.val();
    var len = str.replace(/[^\x00-\xff]/g, "**").length;
    var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);

    //验证不重复的字符是否大于或等于6个
    var strArr = str.split("");
    strArr.sort();
    var result = [];
    var tempStr = "";
    for (var i in strArr) {
        if (strArr[i] != tempStr) {
            result.push(strArr[i]);
            tempStr = strArr[i];
        } else {
            continue;
        }
    }
    if (reg.test(str) && len >= compareLen && result.join('').length >= 6) {
        return true;
    } else {
        obj.addClass('errorInput');
        obj.after('<span class="errorTip">' + jsI18N.MSGInvalid + '</span>');
        return false;
    }
}

function closeWin() {
    window.opener = null;
    window.open('', '_self');
    window.close();
}

//把lottoth放在lotto之后
function sortMrktsForLottoTH(mrkts) {
    var rt = [],
        haveLottoTH = 0;
    for (var n in mrkts) {
        if (mrkts[n] == 280) haveLottoTH = 1;
    }
    for (var m in mrkts) {
        var mrkt = mrkts[m];
        if (mrkt == 280 && haveLottoTH == 0) continue;
        if (mrkt > 149 && haveLottoTH) {
            rt.push('280');
            haveLottoTH = 0;
            if (mrkt != 280) rt.push(mrkts[m]);
        } else rt.push(mrkts[m]);
    }
    return rt;
}

//mobj形式为[[a,b],[c,d]];
//把b,d分别放在a,c之后,如[[149,280],[150,350],[149,340]]
function sortMrktsForGames(mrkts, mobj) {
    var rt, haveGame, lmrkt = '';
    for (var i in mobj) {
        haveGame = 0, rt = [];
        for (var n in mrkts) {
            if (mrkts[n] == mobj[i][1]) {
                haveGame = 1;
                break;
            }
        }
        for (var m in mrkts) {
            var mrkt = mrkts[m];
            if (mrkt == mobj[i][1] && haveGame == 0) continue;
            if (mrkt > mobj[i][0] && haveGame && lmrkt.indexOf(mrkt) == -1) {
                rt.push(mobj[i][1] + '');
                lmrkt += mobj[i][1] + ' ';
                haveGame = 0;
                if (mrkt != mobj[i][1]) rt.push(mrkts[m]);
            } else rt.push(mrkts[m]);
        }
        mrkts = rt;
    }
    return rt;
}

function sortMrktsByMarketType(mrkts) {
    var lotto = [];
    var sports = [];
    var liveGames = [];

    var games = [];
    var tmpMrkt = {
        1: lotto,
        2: sports,
        3: liveGames,
        4: games
    };
    var temIndex = 0;
    for (var n in mrkts) {
        if (n == 130 || n == 140 || n == 280 || n == 460 || n == 470) lotto.push(n);
        else if (n == 180) sports.push(n);
        else if (n == 160 || n == 170 || n == 151 || n == 211 || n == 221 || n == 231 || n == 261 || n == 171 || n == 161) liveGames.push(n);
        else games.push(n);
    }

    var tmp = new Array();
    for (var n in tmpMrkt) {
        for (var m in tmpMrkt[n]) {
            tmp.push(tmpMrkt[n][m]);
        }
    }
    var index = -1;
    for (var i = 0; i < tmp.length; i++) {
        if (tmp[i] == '161') {
            index = i;
            break;
        }
    }
    if (index > -1) {
        tmp.splice(index, 1);
        tmp.splice(index + 1, 0, '161')
    }

    return tmp;
}

//Report Result 格子最后一行空的部分用色块填充
function addMrktA(str, mrktLen) {
    var count = mrktLen % 8 + 1,
        addMrktALen = 6 - mrktLen % 6;
    if (addMrktALen != 6) {
        for (var i = 0; i < addMrktALen; i++) {
            str += '<a class="bg-cocle0' + count + '"><span style="visibility:hidden;">...</span></a>';
            if (count >= 8) count = 1;
            else count++;
        }
    }
    return str;
}

/* 
	绑定按钮动作:Today, Yesterday, This Week, Last Week, ThisMonth, LastMonth
	当按钮使用前缀时，对应的输入框也要使用相同的前缀
*/
function addDateSearchEvent(prefix, suffix) {
    if (typeof(prefix) == 'undefined') {
        prefix = '';
    }
    if (typeof(suffix) == 'undefined') {
        suffix = '';
    }
    var _btnSearch = "#btn" + prefix + "Search" + suffix;
    var _btnToday = "#btn" + prefix + "SearchToday" + suffix;
    var _btnYesterday = "#btn" + prefix + "SearchYesterday" + suffix;
    var _btnThisWeek = "#btn" + prefix + "SearchThisWeek" + suffix;
    var _btnLastWeek = "#btn" + prefix + "SearchLastWeek" + suffix;
    var _btnThisMonth = "#btn" + prefix + "SearchThisMonth" + suffix;
    var _btnLastMonth = "#btn" + prefix + "SearchLastMonth" + suffix;
    var _dateFrom = "#txt" + prefix + "DateFrom" + suffix;
    var _dateTo = "#txt" + prefix + "DateTo" + suffix;

    $(_btnToday).length > 0 && $(_btnToday).unbind().click(function(e) {
        var dt = new Date();
        $(_dateFrom).val(getDateString(dt));
        $(_dateTo).val(getDateString(dt));
        $(_btnSearch).click();
    });
    $(_btnYesterday).length > 0 && $(_btnYesterday).unbind().click(function(e) {
        var dt = new Date();
        dt.setDate(dt.getDate() - 1);
        $(_dateFrom).val(getDateString(dt));
        $(_dateTo).val(getDateString(dt));
        $(_btnSearch).click();
    });
    $(_btnThisWeek).length > 0 && $(_btnThisWeek).unbind().click(function(e) {
        var dt = new Date();
        var today = getDateString(dt);
        dt.setDate(dt.getDate() - ((dt.getDay() == 0) ? 7 : dt.getDay()) + 1);
        $(_dateFrom).val(getDateString(dt));
        $(_dateTo).val(today);
        $(_btnSearch).click();
    });
    $(_btnLastWeek).length > 0 && $(_btnLastWeek).unbind().click(function(e) {
        var dt = new Date();
        dt.setDate(dt.getDate() - ((dt.getDay() == 0) ? 7 : dt.getDay()) + 1);
        dt.setDate(dt.getDate() - 7);
        var first = getDateString(dt);
        dt.setDate(dt.getDate() + 6);
        var last = getDateString(dt);
        $(_dateFrom).val(first);
        $(_dateTo).val(last);
        $(_btnSearch).click();
    });
    $(_btnThisMonth).length > 0 && $(_btnThisMonth).unbind().click(function(e) {
        var dt = new Date();
        var today = getDateString(dt);
        dt.setDate(1);
        $(_dateFrom).val(getDateString(dt));
        $(_dateTo).val(today);
        $(_btnSearch).click();
    });
    $(_btnLastMonth).length > 0 && $(_btnLastMonth).unbind().click(function(e) {
        var dt = new Date();
        dt.setDate(1);
        dt.setMonth(dt.getMonth() - 1)
        var first = getDateString(dt);
        dt.setMonth(dt.getMonth() + 1);
        dt.setDate(dt.getDate() - 1);
        var last = getDateString(dt);
        $(_dateFrom).val(first);
        $(_dateTo).val(last);
        $(_btnSearch).click();
    });
}

//统一绑定输入框的动作
//id是一个字符串: #txtXXX,$txtXXX2,...
function eventInputKeyDown(id, callback) {
    $(id).unbind().keydown(function(e) {
        if (e.keyCode == 13) {
            callback();
            var _currId = '#' + $(this).attr('id');
            $(_currId).unbind('keydown');
            setTimeout(function() {
                eventInputKeyDown(_currId, callback);
            }, 1000);
        }
    });
}

//防止操作过快，限制1秒内只能点击一次,1秒之后解除disabled
function disableBtn(obj, time) {
    if (time == undefined) {
        time = 1000;
    }
    $(obj).attr('disabled', true);
    setTimeout(function() {
        enableBtn(obj);
    }, time);
}

function enableBtn(obj) {
    $(obj).attr('disabled', false);
}

//使用a标签来模拟button时，一定要包含href属性，才能调用这个函数
function chkHrefExists(obj) {
    var _href = $(obj).attr('href');
    if (_href == undefined) {
        return false;
    }
    return true;
}

function disableLink(obj) {
    var _href = $(obj).attr('href');
    $(obj).removeAttr('href');
    setTimeout(function() {
        enableLink(obj, _href);
    }, 1000);
}

function enableLink(obj, href) {
    $(obj).attr('href', href);
}

function loadJS(url, callback) {
    if (typeof url == 'string') url = [url];
    else if (typeof url != 'array') return;
    var len = url.length,
        idx = 0;
    runAjax();

    function runAjax() {
        var ignore = false;
        $("script").each(function() {
            var src = $(this).attr('src');
            if (url[idx] == src) {
                ignore = true;
            }
        });
        if (ignore) return;
        $.ajax({
            url: url[idx],
            cache: false,
            dataType: "script",
            success: function() {
                if (++idx >= len) {
                    if (typeof callback == 'function') {
                        callback();
                    }
                    return;
                }
                runAjax();
            }
        });
    }
}

//声音播放
function playSound(id, song) {
    var a = $("#" + id);
    a.attr('src', "./flash/" + song + ".mp3?2");
    a[0].play();
}

function stopSound(id) {
    $("#" + id)[0].pause();
}

function thisMovie(movieName) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
        return window[movieName];
    } else {
        return document[movieName];
    }
}

//function openModal(id,setting,flagShowClose){
//	if(!id) id = 'divEditModal';
//	if(!setting) setting = {};
//	removeErrorInputClass();
//	var obj = $("#"+id),_css = {modalClass:'commonModal',showClose:flagShowClose ? flagShowClose : false,custom:{minWidth:'500px',minHeight:'100px'}};
//	$("body").removeClass('body-webkit-touch');
//	obj.modal($.extend(_css,setting));
//}

function openModal(id, setting, flagShowClose) {
    if (!id) id = 'divEditModal';
    if (!setting) setting = {};
    removeErrorInputClass();
    var obj = $("#" + id),
        _css = {
            modalClass: 'commonModal',
            showClose: flagShowClose ? flagShowClose : false,
            custom: {
                minWidth: '500px',
                minHeight: '100px'
            }
        };
    //	var obj = $("#"+id),_css = {showClose:flagShowClose ? flagShowClose : false,custom:{minWidth:'500px',minHeight:'100px'}};

    var itv = window.setInterval(function() {
        if (obj.height() > 30) {
            $("body").removeClass('body-webkit-touch');
            obj.modal($.extend(_css, setting));
            window.clearInterval(itv);
        }
    }, 100);
}

$.fn.modalClose = function() {
    $("body").addClass('body-webkit-touch');
    $.modal.close();
};

function closeModal() {
    $("body").addClass('body-webkit-touch');
    $.modal.close();
}

function menuLevel1ResizeListener() {
    var $w = $(window);
    $w.resize(function() {
        $(window.parent.document).find(".tdMenuLevel1").attr('height', 85 + $("#navigator").find(".nav").height());
    });
    $w.resize();
}

function menuLevel2ResizeListener() {
    var $w = $(window);
    $w.resize(function() {
        var h = $("#navigator").find(".sub").height();
        $(window.parent.document).find(".tdMenuLevel2").attr('height', h > 50 ? h / 26 * 26 : 26); //需要计算h>50是因为测试firefox时拿到的是35而不是26
    });
    $w.resize();
}

function initI18N(i18n) {
    window.jsI18N = $.extend(window.jsI18N, i18n);
}

function in_array(val, arr) {
    for (var i in arr) {
        if (arr[i] == val) {
            return true;
        }
    }
    return false;
}

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

function isIOS() {
    var u = navigator.userAgent
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    return isIOS;
}

//使用语言包
function i18n(key) {
    if (!jsI18N) return key;
    if ($.type(key) == 'number') return key;
    if (!key) return '';
    if (typeof(jsI18N[key]) != 'undefined') {
        return jsI18N[key];
    }
    return key;
}