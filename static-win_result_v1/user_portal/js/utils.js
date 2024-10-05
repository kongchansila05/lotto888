if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != "undefined" ? args[number] : match;
        });
    };
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

function message_confirm(info, callback) {
    if (info == undefined) info = 'undefined';
    var options = {
        buttons: {
            OK: true,
            Cancel: false
        },
        prefix: 'cleanblue',
        top: '30%'
    };
    if (callback) options.callback = callback;
    $.prompt(info, options);
}



function casa_format_datetime_long(str) {
    /* 2010-01-01T05:06:07   2016-12-19T13:29:45.382Z   */
    var d = moment(str, moment.ISO_8601);
    return d.format("DD-MM-YY h:m A");
}

function ibc_date_format(str) {
    var d = moment(str, moment.ISO_8601);
    return d.format("DD-MM-YYYY");
}

var defaultNotyConfigure = {
    text: "Default text!",
    dismissQueue: true,
    layout: "topCenter",
    maxVisible: 3,
    theme: "defaultTheme",
    type: "info",
    timeout: 5000,
    closeWith: ["click"],
    killer: true,
    animation: {
        open: "animated fadeInDown"
    }
};

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

function is_mobile() {

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    }
    return false;
}

function csrfSafeMethod(method) {
    return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
}

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

// function use in main
/**
 * string format regular expression
 */
if (!String.prototype.format) {
    String.prototype.format = function() {
        var str = this;
        for (var i = 0; i < arguments.length; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            str = str.replace(reg, arguments[i]);
        }
        return str;
    };
}

/**
 * convert string date to date format
 * 2010-01-01T05:06:07   2016-12-19T13:29:45.382Z
 * @param {*} str date string
 */
function format_datetime_long(str) {
    var d = moment(str, moment.ISO_8601);
    return d.format("DD/MM HH:mm ");
}

/** convert float 0.0 to 0.00 */
function financial(x) {
    if (x == "")
        return "";

    return Number.parseFloat(x).toFixed(2);
}

function ibc_amt_format(x) {

    nmb = Number.parseFloat(x).toFixed(2);

    return nmb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ibc_amt_format_cur(x, currency) {

    if (x == "" || x == "undefined" || x == null)
        return "";

    nmb = Number.parseFloat(x).toFixed(0);

    if (currency == "USD")
        nmb = Number.parseFloat(x).toFixed(2);

    return nmb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * get current date
 */
function getCurrentDate() {
    var fullDate = new Date();
    var twoDigitMonth =
        fullDate.getMonth().length + 1 === 1 ?
        fullDate.getMonth() + 1 :
        "0" + (fullDate.getMonth() + 1);
    var currentDate =
        fullDate.getDate() + "-" + twoDigitMonth + "-" + fullDate.getFullYear();
    return currentDate;
}



(function($) {
    $.fn.hasScrollBar = function() {
        var e = this.get(0);
        return {
            vertical: e.scrollHeight > e.clientHeight,
            horizontal: e.scrollWidth > e.clientWidth
        };
    };
})(jQuery);
/*
    match time 
 */
function matchTime(hour, minute) {
    date_match = "";
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (hour == 1 || hour == 2) {
        date_match = "{0}H {1}'".format(
            hour,
            minute
        );
    } else if (hour == 0) {
        date_match = "Live";
    } else if (hour == 5) {
        date_match = "Half Time";
    } else if (hour == 10) {
        date_match = "Extra Time";
    } else if (hour == 11) {
        date_match = "Penalty";
    }

    return date_match;

}

function matchTimev2(timer, period) {

    if (timer == "Live")
        return "Live";

    if (timer == "" || timer == null)
        return period;

    if (parseInt(timer) < 10)
        return '0' + timer + "'";

    return timer + "'";

}
/*
 * JS Storage Plugin
 *
 * Copyright (c) 2016 Julien Maurel
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 * https://github.com/julien-maurel/js-storage
 *
 * Version: 1.0.1
 */
!(function(e) {
    var t = !1;
    if (
        ("function" == typeof define && define.amd && (define(e), (t = !0)),
            "object" == typeof exports && ((module.exports = e()), (t = !0)), !t)
    ) {
        var r = window.Storages,
            o = (window.Storages = e());
        o.noConflict = function() {
            return (window.Storages = r), o;
        };
    }
})(function() {
    function e() {
        var e,
            t,
            r,
            o,
            n,
            i = this._type,
            s = arguments.length,
            a = window[i],
            f = arguments,
            c = f[0];
        if (1 > s) throw new Error("Minimum 1 argument must be given");
        if (Array.isArray(c)) {
            t = {};
            for (o in c)
                if (c.hasOwnProperty(o)) {
                    e = c[o];
                    try {
                        t[e] = JSON.parse(a.getItem(e));
                    } catch (h) {
                        t[e] = a.getItem(e);
                    }
                }
            return t;
        }
        if (1 != s) {
            try {
                t = JSON.parse(a.getItem(c));
            } catch (h) {
                throw new ReferenceError(c + " is not defined in this storage");
            }
            for (o = 1; s - 1 > o; o++)
                if (((t = t[f[o]]), void 0 === t))
                    throw new ReferenceError(
                        [].slice.call(f, 1, o + 1).join(".") +
                        " is not defined in this storage"
                    );
            if (Array.isArray(f[o])) {
                (r = t), (t = {});
                for (n in f[o]) f[o].hasOwnProperty(n) && (t[f[o][n]] = r[f[o][n]]);
                return t;
            }
            return t[f[o]];
        }
        try {
            return JSON.parse(a.getItem(c));
        } catch (h) {
            return a.getItem(c);
        }
    }

    function t() {
        var e,
            t,
            r,
            o,
            n = this._type,
            i = arguments.length,
            s = window[n],
            a = arguments,
            f = a[0],
            h = a[1],
            l = isNaN(h) ? {} : [];
        if (1 > i || (!c(f) && 2 > i))
            throw new Error(
                "Minimum 2 arguments must be given or first parameter must be an object"
            );
        if (c(f)) {
            for (o in f)
                f.hasOwnProperty(o) &&
                ((e = f[o]),
                    c(e) || this.alwaysUseJson ?
                    s.setItem(o, JSON.stringify(e)) :
                    s.setItem(o, e));
            return f;
        }
        if (2 == i)
            return (
                "object" == typeof h || this.alwaysUseJson ?
                s.setItem(f, JSON.stringify(h)) :
                s.setItem(f, h),
                h
            );
        try {
            (r = s.getItem(f)), null != r && (l = JSON.parse(r));
        } catch (u) {}
        for (r = l, o = 1; i - 2 > o; o++)
            (e = a[o]),
            (t = isNaN(a[o + 1]) ? "object" : "array"),
            (!r[e] ||
                ("object" == t && !c(r[e])) ||
                ("array" == t && !Array.isArray(r[e]))) &&
            ("array" == t ? (r[e] = []) : (r[e] = {})),
            (r = r[e]);
        return (r[a[o]] = a[o + 1]), s.setItem(f, JSON.stringify(l)), l;
    }

    function r() {
        var e,
            t,
            r,
            o,
            n = this._type,
            i = arguments.length,
            s = window[n],
            a = arguments,
            f = a[0];
        if (1 > i) throw new Error("Minimum 1 argument must be given");
        if (Array.isArray(f)) {
            for (r in f) f.hasOwnProperty(r) && s.removeItem(f[r]);
            return !0;
        }
        if (1 == i) return s.removeItem(f), !0;
        try {
            e = t = JSON.parse(s.getItem(f));
        } catch (c) {
            throw new ReferenceError(f + " is not defined in this storage");
        }
        for (r = 1; i - 1 > r; r++)
            if (((t = t[a[r]]), void 0 === t))
                throw new ReferenceError(
                    [].slice.call(a, 1, r).join(".") + " is not defined in this storage"
                );
        if (Array.isArray(a[r]))
            for (o in a[r]) a[r].hasOwnProperty(o) && delete t[a[r][o]];
        else delete t[a[r]];
        return s.setItem(f, JSON.stringify(e)), !0;
    }

    function o(e) {
        var t,
            o = s.call(this);
        for (t in o) o.hasOwnProperty(t) && r.call(this, o[t]);
        if (e)
            for (t in d.namespaceStorages)
                d.namespaceStorages.hasOwnProperty(t) && a(t);
    }

    function n() {
        var t,
            r = arguments.length,
            o = arguments,
            i = o[0];
        if (0 == r) return 0 == s.call(this).length;
        if (Array.isArray(i)) {
            for (t = 0; t < i.length; t++)
                if (!n.call(this, i[t])) return !1;
            return !0;
        }
        try {
            var a = e.apply(this, arguments);
            Array.isArray(o[r - 1]) || (a = {
                totest: a
            });
            for (t in a)
                if (
                    a.hasOwnProperty(t) &&
                    !((c(a[t]) && h(a[t])) || (Array.isArray(a[t]) && !a[t].length)) &&
                    a[t]
                )
                    return !1;
            return !0;
        } catch (f) {
            return !0;
        }
    }

    function i() {
        var t,
            r = arguments.length,
            o = arguments,
            n = o[0];
        if (1 > r) throw new Error("Minimum 1 argument must be given");
        if (Array.isArray(n)) {
            for (t = 0; t < n.length; t++)
                if (!i.call(this, n[t])) return !1;
            return !0;
        }
        try {
            var s = e.apply(this, arguments);
            Array.isArray(o[r - 1]) || (s = {
                totest: s
            });
            for (t in s)
                if (s.hasOwnProperty(t) && (void 0 === s[t] || null === s[t]))
                    return !1;
            return !0;
        } catch (a) {
            return !1;
        }
    }

    function s() {
        var t = this._type,
            r = arguments.length,
            o = window[t],
            n = [],
            i = {};
        if (((i = r > 0 ? e.apply(this, arguments) : o), i && i._cookie)) {
            var s = Cookies.get();
            for (var a in s)
                s.hasOwnProperty(a) && "" != a && n.push(a.replace(i._prefix, ""));
        } else
            for (var f in i) i.hasOwnProperty(f) && n.push(f);
        return n;
    }

    function a(e) {
        if (!e || "string" != typeof e)
            throw new Error("First parameter must be a string");
        v
            ?
            (window.localStorage.getItem(e) || window.localStorage.setItem(e, "{}"),
                window.sessionStorage.getItem(e) ||
                window.sessionStorage.setItem(e, "{}")) :
            (window.localCookieStorage.getItem(e) ||
                window.localCookieStorage.setItem(e, "{}"),
                window.sessionCookieStorage.getItem(e) ||
                window.sessionCookieStorage.setItem(e, "{}"));
        var t = {
            localStorage: l({}, d.localStorage, {
                _ns: e
            }),
            sessionStorage: l({}, d.sessionStorage, {
                _ns: e
            })
        };
        return (
            "undefined" != typeof Cookies &&
            (window.cookieStorage.getItem(e) ||
                window.cookieStorage.setItem(e, "{}"),
                (t.cookieStorage = l({}, d.cookieStorage, {
                    _ns: e
                }))),
            (d.namespaceStorages[e] = t),
            t
        );
    }

    function f(e) {
        var t = "jsapi";
        try {
            return window[e] ?
                (window[e].setItem(t, t), window[e].removeItem(t), !0) :
                !1;
        } catch (r) {
            return !1;
        }
    }

    function c(e) {
        var t, r;
        return e && "[object Object]" === g.call(e) ?
            (t = y(e)) ?
            ((r = w.call(t, "constructor") && t.constructor),
                "function" == typeof r && p.call(r) === m) :
            !0 :
            !1;
    }

    function h(e) {
        var t;
        for (t in e) return !1;
        return !0;
    }

    function l() {
        for (var e = 1, t = arguments[0]; e < arguments.length; e++) {
            var r = arguments[e];
            for (var o in r) r.hasOwnProperty(o) && (t[o] = r[o]);
        }
        return t;
    }
    var u = {},
        g = u.toString,
        w = u.hasOwnProperty,
        p = w.toString,
        m = p.call(Object),
        y = Object.getPrototypeOf,
        d = {},
        S = "ls_",
        _ = "ss_",
        v = f("localStorage"),
        k = {
            _type: "",
            _ns: "",
            _callMethod: function(e, t) {
                t = Array.prototype.slice.call(t);
                var r = [],
                    o = t[0];
                return (
                    this._ns && r.push(this._ns),
                    "string" == typeof o &&
                    -1 !== o.indexOf(".") &&
                    (t.shift(), [].unshift.apply(t, o.split("."))), [].push.apply(r, t),
                    e.apply(this, r)
                );
            },
            alwaysUseJson: !1,
            get: function() {
                return this._callMethod(e, arguments);
            },
            set: function() {
                var e = arguments.length,
                    r = arguments,
                    o = r[0];
                if (1 > e || (!c(o) && 2 > e))
                    throw new Error(
                        "Minimum 2 arguments must be given or first parameter must be an object"
                    );
                if (c(o) && this._ns) {
                    for (var n in o)
                        o.hasOwnProperty(n) && this._callMethod(t, [n, o[n]]);
                    return o;
                }
                var i = this._callMethod(t, r);
                return this._ns ? i[o.split(".")[0]] : i;
            },
            remove: function() {
                if (arguments.length < 1)
                    throw new Error("Minimum 1 argument must be given");
                return this._callMethod(r, arguments);
            },
            removeAll: function(e) {
                return this._ns ?
                    (this._callMethod(t, [{}]), !0) :
                    this._callMethod(o, [e]);
            },
            isEmpty: function() {
                return this._callMethod(n, arguments);
            },
            isSet: function() {
                if (arguments.length < 1)
                    throw new Error("Minimum 1 argument must be given");
                return this._callMethod(i, arguments);
            },
            keys: function() {
                return this._callMethod(s, arguments);
            }
        };
    if ("undefined" != typeof Cookies) {
        window.name || (window.name = Math.floor(1e8 * Math.random()));
        var O = {
            _cookie: !0,
            _prefix: "",
            _expires: null,
            _path: null,
            _domain: null,
            setItem: function(e, t) {
                Cookies.set(this._prefix + e, t, {
                    expires: this._expires,
                    path: this._path,
                    domain: this._domain
                });
            },
            getItem: function(e) {
                return Cookies.get(this._prefix + e);
            },
            removeItem: function(e) {
                return Cookies.remove(this._prefix + e, {
                    path: this._path
                });
            },
            clear: function() {
                var e = Cookies.get();
                for (var t in e)
                    e.hasOwnProperty(t) &&
                    "" != t &&
                    ((!this._prefix && -1 === t.indexOf(S) && -1 === t.indexOf(_)) ||
                        (this._prefix && 0 === t.indexOf(this._prefix))) &&
                    Cookies.remove(t);
            },
            setExpires: function(e) {
                return (this._expires = e), this;
            },
            setPath: function(e) {
                return (this._path = e), this;
            },
            setDomain: function(e) {
                return (this._domain = e), this;
            },
            setConf: function(e) {
                return (
                    e.path && (this._path = e.path),
                    e.domain && (this._domain = e.domain),
                    e.expires && (this._expires = e.expires),
                    this
                );
            },
            setDefaultConf: function() {
                this._path = this._domain = this._expires = null;
            }
        };
        v ||
            ((window.localCookieStorage = l({}, O, {
                    _prefix: S,
                    _expires: 3650
                })),
                (window.sessionCookieStorage = l({}, O, {
                    _prefix: _ + window.name + "_"
                }))),
            (window.cookieStorage = l({}, O)),
            (d.cookieStorage = l({}, k, {
                _type: "cookieStorage",
                setExpires: function(e) {
                    return window.cookieStorage.setExpires(e), this;
                },
                setPath: function(e) {
                    return window.cookieStorage.setPath(e), this;
                },
                setDomain: function(e) {
                    return window.cookieStorage.setDomain(e), this;
                },
                setConf: function(e) {
                    return window.cookieStorage.setConf(e), this;
                },
                setDefaultConf: function() {
                    return window.cookieStorage.setDefaultConf(), this;
                }
            }));
    }
    return (
        (d.initNamespaceStorage = function(e) {
            return a(e);
        }),
        v ?
        ((d.localStorage = l({}, k, {
                _type: "localStorage"
            })),
            (d.sessionStorage = l({}, k, {
                _type: "sessionStorage"
            }))) :
        ((d.localStorage = l({}, k, {
                _type: "localCookieStorage"
            })),
            (d.sessionStorage = l({}, k, {
                _type: "sessionCookieStorage"
            }))),
        (d.namespaceStorages = {}),
        (d.removeAllStorages = function(e) {
            d.localStorage.removeAll(e),
                d.sessionStorage.removeAll(e),
                d.cookieStorage && d.cookieStorage.removeAll(e),
                e || (d.namespaceStorages = {});
        }),
        (d.alwaysUseJsonInStorage = function(e) {
            (k.alwaysUseJson = e),
            (d.localStorage.alwaysUseJson = e),
            (d.sessionStorage.alwaysUseJson = e),
            d.cookieStorage && (d.cookieStorage.alwaysUseJson = e);
        }),
        d
    );
});

/**
 * jQuery printPage Plugin
 * @version: 1.0
 * @author: Cedric Dugas, http://www.position-absolute.com
 * @licence: MIT
 * @desciption: jQuery page print plugin help you print your page in a better way
 */

(function($) {
    $.fn.printPage = function(options) {
        // EXTEND options for this button
        var pluginOptions = {
            attr: "href",
            url: false,
            message: "Please wait while we create your document"
        };
        $.extend(pluginOptions, options);

        this.on("click", function() {
            loadPrintDocument(this, pluginOptions);
            return false;
        });

        /**
         * Load & show message box, call iframe
         * @param {jQuery} el - The button calling the plugin
         * @param {Object} pluginOptions - options for this print button
         */
        function loadPrintDocument(el, pluginOptions) {
            $("body").append(components.messageBox(pluginOptions.message));
            $("#printMessageBox").css("opacity", 0);
            $("#printMessageBox").animate({
                opacity: 1
            }, 300, function() {
                addIframeToPage(el, pluginOptions);
            });
        }
        /**
         * Inject iframe into document and attempt to hide, it, can't use display:none
         * You can't print if the element is not dsplayed
         * @param {jQuery} el - The button calling the plugin
         * @param {Object} pluginOptions - options for this print button
         */
        function addIframeToPage(el, pluginOptions) {
            var url = pluginOptions.url ?
                pluginOptions.url :
                $(el).attr(pluginOptions.attr);

            if (!$("#printPage")[0]) {
                $("body").append(components.iframe(url));
                $("#printPage").on("load", function() {
                    printit();
                });
            } else {
                $("#printPage").attr("src", url);
            }
        }
        /*
         * Call the print browser functionnality, focus is needed for IE
         */
        function printit() {
            frames["printPage"].focus();
            frames["printPage"].print();
            unloadMessage();
        }
        /*
         * Hide & Delete the message box with a small delay
         */
        function unloadMessage() {
            $("#printMessageBox")
                .delay(1000)
                .animate({
                    opacity: 0
                }, 700, function() {
                    $(this).remove();
                });
        }
        /*
         * Build html compononents for thois plugin
         */
        var components = {
            iframe: function(url) {
                return (
                    '<iframe id="printPage" name="printPage" src=' +
                    url +
                    ' style="position:absolute;top:0px; left:0px;width:0px; height:0px;border:0px;overfow:none; z-index:-1"></iframe>'
                );
            },
            messageBox: function(message) {
                return (
                    "<div id='printMessageBox' style='\
          position:fixed;\
          top:50%; left:50%;\
          text-align:center;\
          margin: -60px 0 0 -155px;\
          width:310px; height:120px; font-size:16px; padding:10px; color:#222; font-family:helvetica, arial;\
          opacity:0;\
          background:#fff url(data:image/gif;base64,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) center 40px no-repeat;\
          border: 6px solid #555;\
          border-radius:8px; -webkit-border-radius:8px; -moz-border-radius:8px;\
          box-shadow:0px 0px 10px #888; -webkit-box-shadow:0px 0px 10px #888; -moz-box-shadow:0px 0px 10px #888'>\
          " +
                    message +
                    "</div>"
                );
            }
        };
    };
})(jQuery);

!(function(e, t) {
    "function" == typeof define && define.amd ?
        define([], t) :
        "object" == typeof exports ?
        (module.exports = t()) :
        (e.sortable = t());
})(this, function() {
    "use strict";
    var e,
        t,
        n,
        r = [],
        a = [],
        o = function(e, t, n) {
            return void 0 === n ?
                e && e.h5s && e.h5s.data && e.h5s.data[t] :
                ((e.h5s = e.h5s || {}),
                    (e.h5s.data = e.h5s.data || {}),
                    (e.h5s.data[t] = n),
                    void 0);
        },
        i = function(e) {
            e.h5s && delete e.h5s.data;
        };
    switch (!0) {
        case "matches" in window.Element.prototype:
            n = "matches";
            break;
        case "mozMatchesSelector" in window.Element.prototype:
            n = "mozMatchesSelector";
            break;
        case "msMatchesSelector" in window.Element.prototype:
            n = "msMatchesSelector";
            break;
        case "webkitMatchesSelector" in window.Element.prototype:
            n = "webkitMatchesSelector";
    }
    var s = function(e, t) {
            if (!t) return Array.prototype.slice.call(e);
            for (var r = [], a = 0; a < e.length; ++a)
                "string" == typeof t && e[a][n](t) && r.push(e[a]),
                t.indexOf(e[a]) !== -1 && r.push(e[a]);
            return r;
        },
        l = function(e, t, n) {
            if (e instanceof Array)
                for (var r = 0; r < e.length; ++r) l(e[r], t, n);
            else
                e.addEventListener(t, n),
                (e.h5s = e.h5s || {}),
                (e.h5s.events = e.h5s.events || {}),
                (e.h5s.events[t] = n);
        },
        d = function(e, t) {
            if (e instanceof Array)
                for (var n = 0; n < e.length; ++n) d(e[n], t);
            else
                e.h5s &&
                e.h5s.events &&
                e.h5s.events[t] &&
                (e.removeEventListener(t, e.h5s.events[t]), delete e.h5s.events[t]);
        },
        c = function(e, t, n) {
            if (e instanceof Array)
                for (var r = 0; r < e.length; ++r) c(e[r], t, n);
            else e.setAttribute(t, n);
        },
        f = function(e, t) {
            if (e instanceof Array)
                for (var n = 0; n < e.length; ++n) f(e[n], t);
            else e.removeAttribute(t);
        },
        p = function(e) {
            var t = e.getClientRects()[0];
            return {
                left: t.left + window.scrollX,
                top: t.top + window.scrollY
            };
        },
        h = function(e) {
            d(e, "dragstart"),
                d(e, "dragend"),
                d(e, "selectstart"),
                d(e, "dragover"),
                d(e, "dragenter"),
                d(e, "drop");
        },
        u = function(e) {
            d(e, "dragover"), d(e, "dragenter"), d(e, "drop");
        },
        g = function(e, t) {
            (e.dataTransfer.effectAllowed = "move"),
            e.dataTransfer.setData("text", ""),
                e.dataTransfer.setDragImage &&
                e.dataTransfer.setDragImage(t.draggedItem, t.x, t.y);
        },
        m = function(e, t) {
            return (
                t.x || (t.x = parseInt(e.pageX - p(t.draggedItem).left)),
                t.y || (t.y = parseInt(e.pageY - p(t.draggedItem).top)),
                t
            );
        },
        v = function(e) {
            return {
                draggedItem: e
            };
        },
        y = function(e, t) {
            var n = v(t);
            (n = m(e, n)), g(e, n);
        },
        b = function(e) {
            i(e), f(e, "aria-dropeffect");
        },
        E = function(e) {
            f(e, "aria-grabbed"), f(e, "draggable"), f(e, "role");
        },
        w = function(e, t) {
            return (
                e === t ||
                (void 0 !== o(e, "connectWith") &&
                    o(e, "connectWith") === o(t, "connectWith"))
            );
        },
        x = function(e, t) {
            var n,
                r = [];
            if (!t) return e;
            for (var a = 0; a < e.length; ++a)
                (n = e[a].querySelectorAll(t)),
                (r = r.concat(Array.prototype.slice.call(n)));
            return r;
        },
        I = function(e) {
            var t = o(e, "opts") || {},
                n = s(e.children, t.items),
                r = x(n, t.handle);
            u(e), b(e), d(r, "mousedown"), h(n), E(n);
        },
        A = function(e) {
            var t = o(e, "opts"),
                n = s(e.children, t.items),
                r = x(n, t.handle);
            c(e, "aria-dropeffect", "move"), c(r, "draggable", "true");
            var a = (document || window.document).createElement("span");
            "function" != typeof a.dragDrop ||
                t.disableIEFix ||
                l(r, "mousedown", function() {
                    if (n.indexOf(this) !== -1) this.dragDrop();
                    else {
                        for (var e = this.parentElement; n.indexOf(e) === -1;)
                            e = e.parentElement;
                        e.dragDrop();
                    }
                });
        },
        C = function(e) {
            var t = o(e, "opts"),
                n = s(e.children, t.items),
                r = x(n, t.handle);
            c(e, "aria-dropeffect", "none"),
                c(r, "draggable", "false"),
                d(r, "mousedown");
        },
        S = function(e) {
            var t = o(e, "opts"),
                n = s(e.children, t.items),
                r = x(n, t.handle);
            h(n), d(r, "mousedown"), u(e);
        },
        D = function(e) {
            return e.parentElement ?
                Array.prototype.indexOf.call(e.parentElement.children, e) :
                0;
        },
        L = function(e) {
            return !!e.parentNode;
        },
        O = function(e) {
            if ("string" != typeof e) return e;
            var t = document.createElement("div");
            return (t.innerHTML = e), t.firstChild;
        },
        W = function(e, t) {
            e.parentElement.insertBefore(t, e);
        },
        M = function(e, t) {
            e.parentElement.insertBefore(t, e.nextElementSibling);
        },
        N = function(e) {
            e.parentNode && e.parentNode.removeChild(e);
        },
        T = function(e, t) {
            var n = document.createEvent("Event");
            return t && (n.detail = t), n.initEvent(e, !1, !0), n;
        },
        k = function(e, t) {
            a.forEach(function(n) {
                w(e, n) && n.dispatchEvent(t);
            });
        },
        P = function(n, i) {
            var d = String(i);
            return (
                (i = (function(e) {
                    var t = {
                        connectWith: !1,
                        placeholder: null,
                        dragImage: null,
                        disableIEFix: !1,
                        placeholderClass: "sortable-placeholder",
                        draggingClass: "sortable-dragging",
                        hoverClass: !1
                    };
                    for (var n in e) t[n] = e[n];
                    return t;
                })(i)),
                "string" == typeof n && (n = document.querySelectorAll(n)),
                n instanceof window.Element && (n = [n]),
                (n = Array.prototype.slice.call(n)),
                n.forEach(function(n) {
                    if (/enable|disable|destroy/.test(d)) return void P[d](n);
                    (i = o(n, "opts") || i), o(n, "opts", i), S(n);
                    var f,
                        h,
                        u = s(n.children, i.items),
                        m = i.placeholder;
                    if (
                        (m ||
                            (m = document.createElement(
                                /^ul|ol$/i.test(n.tagName) ? "li" : "div"
                            )),
                            (m = O(m)),
                            m.classList.add.apply(m.classList, i.placeholderClass.split(" ")), !n.getAttribute("data-sortable-id"))
                    ) {
                        var v = a.length;
                        (a[v] = n),
                        c(n, "data-sortable-id", v),
                            c(u, "data-item-sortable-id", v);
                    }
                    if (
                        (o(n, "items", i.items),
                            r.push(m),
                            i.connectWith && o(n, "connectWith", i.connectWith),
                            A(n),
                            c(u, "role", "option"),
                            c(u, "aria-grabbed", "false"),
                            i.hoverClass)
                    ) {
                        var b = "sortable-over";
                        "string" == typeof i.hoverClass && (b = i.hoverClass),
                            l(u, "mouseenter", function() {
                                this.classList.add(b);
                            }),
                            l(u, "mouseleave", function() {
                                this.classList.remove(b);
                            });
                    }
                    l(u, "dragstart", function(r) {
                            r.stopImmediatePropagation(),
                                i.dragImage ?
                                (g(r, {
                                        draggedItem: i.dragImage,
                                        x: 0,
                                        y: 0
                                    }),
                                    console.log(
                                        "WARNING: dragImage option is deprecated and will be removed in the future!"
                                    )) :
                                y(r, this),
                                this.classList.add(i.draggingClass),
                                (e = this),
                                c(e, "aria-grabbed", "true"),
                                (f = D(e)),
                                (t = parseInt(window.getComputedStyle(e).height)),
                                (h = this.parentElement),
                                k(n, T("sortstart", {
                                    item: e,
                                    placeholder: m,
                                    startparent: h
                                }));
                        }),
                        l(u, "dragend", function() {
                            var a;
                            e &&
                                (e.classList.remove(i.draggingClass),
                                    c(e, "aria-grabbed", "false"),
                                    (e.style.display = e.oldDisplay),
                                    delete e.oldDisplay,
                                    r.forEach(N),
                                    (a = this.parentElement),
                                    k(n, T("sortstop", {
                                        item: e,
                                        startparent: h
                                    })),
                                    (f === D(e) && h === a) ||
                                    k(
                                        n,
                                        T("sortupdate", {
                                            item: e,
                                            index: s(a.children, o(a, "items")).indexOf(e),
                                            oldindex: u.indexOf(e),
                                            elementIndex: D(e),
                                            oldElementIndex: f,
                                            startparent: h,
                                            endparent: a
                                        })
                                    ),
                                    (e = null),
                                    (t = null));
                        }),
                        l([n, m], "drop", function(t) {
                            var a;
                            w(n, e.parentElement) &&
                                (t.preventDefault(),
                                    t.stopPropagation(),
                                    (a = r.filter(L)[0]),
                                    M(a, e),
                                    e.dispatchEvent(T("dragend")));
                        });
                    var E = function(a) {
                        if (w(n, e.parentElement))
                            if (
                                (a.preventDefault(),
                                    a.stopPropagation(),
                                    (a.dataTransfer.dropEffect = "move"),
                                    u.indexOf(this) !== -1)
                            ) {
                                var o = parseInt(window.getComputedStyle(this).height),
                                    l = D(m),
                                    d = D(this);
                                if (
                                    (i.forcePlaceholderSize && (m.style.height = t + "px"), o > t)
                                ) {
                                    var c = o - t,
                                        f = p(this).top;
                                    if (l < d && a.pageY < f + c) return;
                                    if (l > d && a.pageY > f + o - c) return;
                                }
                                void 0 === e.oldDisplay && (e.oldDisplay = e.style.display),
                                    (e.style.display = "none"),
                                    l < d ? M(this, m) : W(this, m),
                                    r
                                    .filter(function(e) {
                                        return e !== m;
                                    })
                                    .forEach(N);
                            } else
                                r.indexOf(this) !== -1 ||
                                s(this.children, i.items).length ||
                                (r.forEach(N), this.appendChild(m));
                    };
                    l(u.concat(n), "dragover", E), l(u.concat(n), "dragenter", E);
                }),
                n
            );
        };
    return (
        (P.destroy = function(e) {
            I(e);
        }),
        (P.enable = function(e) {
            A(e);
        }),
        (P.disable = function(e) {
            C(e);
        }),
        P
    );
});
//# sourceMappingURL=html.sortable.min.js.map