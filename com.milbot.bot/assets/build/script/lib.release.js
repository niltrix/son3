Function.Empty = function () {};
Function.prototype.bind = function (a) {
    var c = this;
    return function () {
        return c.apply(a, arguments)
    }
};
Function.prototype.delay = function (a) {
    isNaN(a) || setTimeout(this, a)
};
Function.prototype.only = function (a, c) {
    function b() {
        0 < d && e.apply(this, arguments);
        0 === --d && c && c(b)
    }
    var d = a,
        e = this;
    return b
};
String.prototype.format = function () {
    var a = arguments;
    return this.replace(/\{(\d+)\}/g, function (c, b) {
        return a[b]
    })
};
String.format = function () {
    if (0 == arguments.length) return null;
    for (var a = arguments[0], c = 1; c < arguments.length; c++) a = a.replace("{" + (c - 1) + "}", arguments[c]);
    return a
};
(function (a) {
    function c(a, c) {
        for (var b in c) a[b] = c[b];
        return a
    }
    function b() {}
    function d() {}
    a.extend = c;
    a.namespace = function () {
        for (var a = arguments, c = window, b = 0, d, k; b < a.length; b++) if (d = a[b], d.indexOf(".")) {
            k = d.split(".");
            for (d = 0; d < k.length; d++) c[k[d]] = c[k[d]] || {}, c = c[k[d]]
        } else c[d] = c[d] || {};
        return c
    };
    a.Class = function (a, g) {
        function f() {
            this.init.apply(this, arguments)
        }
        "undefined" === typeof g && (g = a, a = null);
        f.superclass = a;
        f.subclasses = [];
        if (a) b.prototype = a.prototype, f.prototype = new b, a.subclasses.push(f);
        c(f.prototype, g);
        if (!f.prototype.init) f.prototype.init = d;
        return f.prototype.constructor = f
    }
})(window);
(function (a) {
    a.include = function (a, b) {
        function d(a) {
            for (var c = a.length, d = 0; d < c; d++) if (!e[a[d]]) return;
            g || (g = !0, b && b())
        }
        for (var e = {}, g = !1, f = a.length, j = 0; j < f; j++)(function () {
            var b = a[j],
                f = b;
            window.CONFIG && !window.CONFIG.RELEASE && (f += "?t=" + +new Date);
            var g = document.createElement("script");
            g.src = f;
            g.type = "text/javascript";
            g.charset = "utf-8";
            g.defer = !0;
            document.getElementsByTagName("head").item(0).appendChild(g);
            g.addEventListener ? g.addEventListener("load", function () {
                e[b] = !0;
                d(a)
            }, !1) : g.attachEvent("onreadystatechange", function () {
                e[b] = !0;
                d(a)
            })
        })()
    }
})(window);

function callbackChain() {
    function a() {
        (fn = b[c++]) && fn(a)
    }
    var c = 0,
        b = arguments;
    a()
}
namespace("ui");
(function (a, c) {
    a.View = Class({
        init: function (a) {
            this.dom = c(a)
        },
        show: function () {
            try {
                this.dom.show()
            } catch (a) {}
        },
        hide: function () {
            try {
                this.dom.hide()
            } catch (a) {}
        },
        remove: function () {
            this.dom.remove()
        },
        onComplete: function () {},
        isVisible: function () {
            return this.dom.is(":visible")
        }
    });
    a.SubView = Class(a.View, {
        init: function (c, b) {
            a.View.prototype.init.call(this, c);
            this.container = b
        },
        close: function () {
            this.onClose();
            this.container.remove(this)
        },
        onClose: function () {}
    });
    var b = {},
        d = {},
        e = {},
        g = !1;
    a.defineSubView = function (a, c) {
        b[a] = c
    };
    a.setSubViewCache = function (a) {
        g = !0;
        e = a
    };
    a.SubViewContainer = Class(a.View, {
        init: function (c) {
            this.views = [];
            a.View.prototype.init.call(this, c)
        },
        preprocessHtml: function (a, c) {
            return c
        },
        loadHTMLFile: function (a, b) {
            var d = this,
                h = e[a] || "";
            g ? (h = d.preprocessHtml(a, h), b(h)) : c.get(a + ".html", function (c) {
                h = d.preprocessHtml(a, c);
                d.preprocessHtml(a, h);
                b(h)
            })
        },
        loadHTML: function (a, b) {
            var e = d[a];
            e ? b(e.clone()) : this.loadHTMLFile(a, function (e) {
                d[a] = c(e);
                b(d[a].clone());
                g || (d[a] = null)
            })
        },
        loadJS: function (a, c) {
            var d = b[a];
            d ? c(d) : include([a + ".js"], function () {
                d = b[a];
                c(d);
                g || (b[a] = null)
            })
        },
        load: function (c, b) {
            var d = this;
            d.loadJS(c, function (e) {
                d.loadHTML(c, function (c) {
                    var f = new a.SubView(c, d);
                    d.add(f);
                    e.apply(f);
                    setTimeout(function () {
                        b && b(f);
                        f.onComplete()
                    }, 0)
                })
            })
        },
        remove: function (a) {
            for (var c in this.views) this.views[c] == a && (a.hide(), this.views.splice(c, 1), a.dispose && a.dispose(), a.remove())
        },
        add: function (a) {
            this.views.push(a);
            this.dom.append(a.dom)
        },
        getCount: function () {
            return this.views.length
        }
    });
    a.TranslationSubViewContainer = Class(a.SubViewContainer, {
        init: function (c, b) {
            this.markers = b;
            a.SubViewContainer.prototype.init.call(this, c)
        },
        preprocessHtml: function (a, c) {
            var b = this;
            b.markers && (c = c.replace(/<\!--BEGIN:LNG:(\d+)--\>([\s\S]*?)<\!--END:LNG--\>/g, function (c, d, e) {
                try {
                    var g = b.markers[a][parseInt(d, 10)];
                    return g ? g : e
                } catch (o) {
                    return e
                }
            }));
            return c
        }
    })
})(ui, jQuery);
var defineSubView = ui.defineSubView,
    localVars = [],
    Utils = {
        replaceInput: function (a, c) {
            var b = document.createElement("input");
            b.setAttribute("type", c);
            b.setAttribute("name", a.getAttribute("name"));
            b.setAttribute("id", a.getAttribute("id"));
            b.setAttribute("class", a.getAttribute("class"));
            b.setAttribute("style", a.getAttribute("style"));
            a.parentNode.replaceChild(b, a)
        },
        jsonToString: function (a) {
            switch (typeof a) {
            case "string":
                return '"' + a.replace(/(["\\])/g, "\\$1") + '"';
            case "array":
                return "[" + a.map(this.jsonToString).join(",") + "]";
            case "object":
                if (a instanceof Array) {
                    for (var c = [], b = a.length, d = 0; d < b; d++) c.push(this.jsonToString(a[d]));
                    return "[" + c.join(",") + "]"
                }
                if (null == a) return "null";
                c = [];
                for (b in a) c.push(this.jsonToString(b) + ":" + this.jsonToString(a[b]));
                return "{" + c.join(",") + "}";
            case "number":
                return a;
            case !1:
                return a
            }
        },
        stringToJSON: function (a) {
            return eval("(" + a + ")")
        },
        hasLocalStorage: function () {
            try {
                if ("undefined" == typeof localStorage || !window.localStorage) return !1
            } catch (a) {
                return !1
            }
            return !0
        },
        hasSessionStorage: function () {
            try {
                if ("undefined" == typeof sessionStorage || !window.sessionStorage) return !1
            } catch (a) {
                return !1
            }
            return !0
        },
        hasStorage: function () {
            try {
                if ("undefined" == typeof sessionStorage || "undefined" == typeof localStorage || !window.localStorage || !window.sessionStorage) return !1
            } catch (a) {
                return !1
            }
            return !0
        },
        isNoStorage: !1,
        setCookie: function (a, c, b) {
            try {
                var c = this.jsonToString(c),
                    d = new Date;
                d.setTime(d.getTime() + 864E5 * b);
                document.cookie = a + "=" + escape(c) + ";expires=" + d.toGMTString()
            } catch (e) {}
            return !1
        },
        _setLocal: function (a, c) {
            c = this.jsonToString(c);
            localStorage.removeItem(a);
            localStorage.setItem(a, c)
        },
        _setNoStorage: function (a, c) {
            localVars[a] = c
        },
        getCookie: function (a) {
            try {
                var c = document.cookie.match(RegExp("(^| )" + a + "=([^;]*)(;|$)"));
                if (null != c) return this.stringToJSON(unescape(c[2]))
            } catch (b) {}
            return null
        },
        _getLocal: function (a) {
            try {
                var c = localStorage.getItem(a);
                if (c) return this.stringToJSON(c)
            } catch (b) {}
            return null
        },
        _getNoStorage: function (a) {
            return localVars[a]
        },
        delCookie: function (a) {
            var c = new Date;
            c.setTime(c.getTime() - 6E4);
            document.cookie = a + "=;expires=" + c.toGMTString();
            return !1
        },
        _delLocal: function (a) {
            localStorage.removeItem(a)
        },
        _delNoStorage: function (a) {
            localVars[a] = null
        },
        validateStorage: function () {
            var a = this.getCookie("key");
            null != a && ("undefined" == typeof a.user || "undefined" == typeof a.server || "undefined" == typeof a.key || "undefined" == typeof a.referer || "undefined" == typeof a.refercode) && this.delCookie("key")
        },
        timeString2: function (a) {
            var c = parseInt(a / 86400);
            return 0 < c ? c + "+ " + LNG.DAYS : this.timeString(a)
        },
        timeString: function (a) {
            var c = parseInt(a / 3600),
                b = parseInt(a % 3600 / 60);
            return this.timeStr(c, b, a % 60)
        },
        timeStr: function (a, c, b) {
            a = (9 >= a ? "0" : "") + (a + ":");
            a = 9 >= c ? a + ("0" + c + ":") : a + (c + ":");
            return 9 >= b ? a + ("0" + b) : a + b
        },
        ftime: function (a, c) {
            var b = {
                "M+": a.getMonth() + 1,
                "d+": a.getDate(),
                "h+": a.getHours(),
                "m+": a.getMinutes(),
                "s+": a.getSeconds(),
                "q+": Math.floor((a.getMonth() + 3) / 3),
                S: a.getMilliseconds()
            };
            /(y+)/.test(c) && (c = c.replace(RegExp.$1, (a.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (var d in b) RegExp("(" + d + ")").test(c) && (c = c.replace(RegExp.$1, 1 == RegExp.$1.length ? b[d] : ("00" + b[d]).substr(("" + b[d]).length)));
            return c
        },
        addCss: function (a, c) {
            var b = document,
                d = b.getElementsByTagName("head")[0],
                b = b.createElement("link");
            b.setAttribute("rel", "stylesheet");
            b.setAttribute("type", "text/css");
            b.setAttribute("href", c);
            b.setAttribute("id", a);
            d.appendChild(b)
        },
        removeCss: function (a) {
            var c = document,
                b = c.getElementsByTagName("head")[0],
                a = c.getElementById(a);
            null != a && b.removeChild(a)
        },
        getFlag: function (a) {
            return "img/flag/" + a + ".gif"
        },
        getHeroRankImage: function (a, c) {
            return "img/hero/" + c + a + ".png"
        },
        getTechImage: function (a) {
            return "img/tech/" + a + ".png"
        },
        getBuildingImage: function (a) {
            return "img/building/" + a + ".png"
        },
        getHeroImage: function (a) {
            return "img/hero/" + a + ".jpg"
        },
        getItemImage: function (a) {
            return "img/item/" + a + ".png"
        },
        getSoldierImage: function (a, c) {
            return "img/soldier/" + c + "_" + a + ".jpg"
        },
        getGuideImage: function (a) {
            return "img/map/b" + a + ".png"
        },
        cacheImage: function (a) {
            window.__cachedImages = window.__cachedImages || {};
            var c = window.__cachedImages[a];
            if (!c) c = new Image, c.src = a, window.__cachedImages[a] = c;
            return c
        },
        loadImage: function (a, c) {
            var b = new Image;
            b.onload = function () {
                a.css("background-image", "url(" + c + ")")
            };
            b.src = c
        },
        loadImage2: function (a, c) {
            var b = new Image;
            b.onload = function () {
                a.attr("src", c)
            };
            b.src = c
        },
        trim: function (a) {
            return a.replace(/(^\s*)|(\s*$)/g, "")
        },
        QueryString: function (a) {
            return (a = location.search.match(RegExp("[?&]" + a + "=([^&]*)(&?)", "i"))) ? a[1] : a
        },
        QueryString2Cookie: function () {
            hu = window.location.search.substring(1);
            if (null != hu && "" != hu) {
                gy = hu.split("&");
                for (i = 0; i < gy.length; i++) if (ft = gy[i].split("="), "undefined" != typeof ft[1] && null != ft[1] && "" != ft[1]) {
                    var a = unescape(ft[1]);
                    try {
                        this.setCookie(ft[0], this.stringToJSON(a))
                    } catch (c) {}
                }
            }
        },
        parseInt: function (a, c) {
            var b = parseInt(a);
            return isNaN(b) ? c : b
        },
        prepare: function (a, c, b, d) {
            function e() {
                if (c()) return b(), d && g.hide(), !0;
                if (d) return g.show(), !1
            }
            var g = $(d);
            a(e);
            e()
        }
    };
(function (a) {
    var c = /iphone/gi.test(navigator.appVersion),
        b = /ipad/gi.test(navigator.appVersion),
        d = /android/gi.test(navigator.appVersion);
    window.isIphone = c;
    window.isAndroid = d;
    window.isIpad = b;
    jQuery.fn.touch = c || b || d ?
    function (a) {
        return a ? this.bind("touchend", a) : this.trigger("touchend")
    } : function (a) {
        return a ? this.bind("click", a) : this.trigger("click")
    };
    jQuery.attrFn && (jQuery.attrFn.touch = !0);
    if (a.hasStorage()) a.setCookie = a._setLocal, a.getCookie = a._getLocal, a.delCookie = a._delLocal;
    else if (c || b) a.setCookie = a._setNoStorage, a.getCookie = a._getNoStorage, a.delCookie = a._delNoStorage, a.isNoStorage = !0;
    if (window.JSON) a.jsonToString = window.JSON.stringify, a.stringToJSON = window.JSON.parse
})(Utils);

function EventManager() {
    this.events = []
}
EventManager.prototype = {
    bind: function (a, c) {
        if (a && a.constructor && a.constructor == String && c && c.constructor && c.constructor == Function) {
            var b = this.events[a];
            b || (b = this.events[a] = []);
            for (var d = b.length; d--;) if (b[d] == c) return !1;
            b.push(c);
            return !0
        }
        return !1
    },
    unbind: function (a, c) {
        if (a && a.constructor && a.constructor == String) if (c) {
            if (c && c.constructor && c.constructor == Function) {
                var b = this.events[a];
                if (b && b.length) {
                    for (var d = b.length; d--;) if (b[d] == c) {
                        b.splice(d, 1);
                        break
                    }
                    return !0
                }
            }
        } else return delete this.events[a], !0;
        return !1
    },
    trigger: function (a) {
        var c;
        if (a && a.constructor && a.constructor == String && (c = this.events[a]) && c.length) {
            var b, d = 0;
            b = arguments.length;
            if (1 == b) for (; b = c[d++];) b();
            else if (2 == b) for (; b = c[d++];) b(arguments[1]);
            else if (3 == b) for (; b = c[d++];) b(arguments[1], arguments[2]);
            else if (4 == b) for (; b = c[d++];) b(arguments[1], arguments[2], arguments[3]);
            else if (5 == b) for (; b = c[d++];) b(arguments[1], arguments[2], arguments[3], arguments[4]);
            else if (6 == b) for (; b = c[d++];) b(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            else if (7 == b) for (; b = c[d++];) b(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
            else {
                for (var e = [], d = 1; d < b; d++) e.push(arguments[d]);
                for (; b = c[d++];) b.apply(document, e)
            }
            return !0
        }
        return !1
    },
    async: function () {
        var a = this,
            c = arguments;
        setTimeout(function () {
            a.trigger.apply(a, c)
        }, 0)
    },
    async2: function (timeout) {
        var a = this,
            c = arguments;
        setTimeout(function () {
            a.trigger.apply(a, c)
        }, a)
    },
    count: function (a) {
        return (a = this.events[a]) ? a.length : 0
    },
    getProxy: function () {
        return new DisposeableEventManagerProxy(this)
    }
};

function DisposeableEventManagerProxy(a) {
    this.msgslot = a;
    this.msgs = [];
    var c = a.trigger,
        b = a.async;
    this.trigger = function () {
        c.apply(a, arguments)
    };
    this.async = function () {
        b.apply(a, arguments)
    }
}
DisposeableEventManagerProxy.prototype = {
    bind: function (a, c) {
        var b = this.msgslot.bind(a, c);
        b && this.msgs.push([a, c]);
        return b
    },
    unbind: function (a, c) {
        var b = this.msgslot,
            d = this.msgs;
        if (c && c.constructor && c.constructor == Function) {
            for (var b = b.unbind(a, c), e = d.length; 0 <= --e;) d[e][0] == a && d[e][1] == c && d.splice(e, 1);
            return b
        }
        for (e = this.msgs.length; e--;) d[e][0] == a && (b.unbind(a, d[e][1]), d.splice(e, 1));
        return !0
    },
    dispose: function () {
        for (var a = this.msgs, c = this.msgslot, b = a.length; b--;) c.unbind(a[b][0], a[b][1]);
        this.msgs = this.msgslot = null
    }
};

function CooldownManager(a, c) {
    this.cdlist = [];
    this.cdlist_hash = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];
    this.reloadtimer = this.ticktimer = null;
    this.ema = a;
    this.url = CONFIG.MYHOST + CONFIG.FUNC_CDINFO;
    this.key = c;
    var b = this;
    b.tickDelegate = function () {
        b.tick()
    };
    b.reloadDelegate = function () {
        b.reload()
    };
    b.ajaxCallbackDelegate = function (a) {
        b.ajaxCallback(a)
    }
}
(function () {
    CooldownManager.prototype = {
        init: function (a, c) {
            if (this.cityid != a) return this.cityid = a, this.clear(), this.add(c), this
        },
        add: function (a) {
            if (a) {
                for (var c = (new Date).getTime(), b = a.length; 0 <= --b;) {
                    var d = a[b];
                    if (0 > d.secs) d.secs = 0;
                    d.end = c + 1E3 * d.secs;
                    this.cdlist.push(d);
                    this.cdlist_hash[d.cdtype].push(d)
                }
                this.countdown();
                this.ema.async("cdupdate")
            }
        },
        clear: function () {
            this.cdlist = [];
            this.cdlist_hash = [
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                []
            ]
        },
        tick: function () {
            for (var a = this.ema, c = this.cdlist, b = c.length, d = (new Date).getTime(); b--;) {
                var e = c[b],
                    g = Math.ceil((e.end - d) / 1E3);
                0 <= g && a.trigger(this.getTickEventId(e.cdtype, e.target), g)
            }
            this.ticktimer = setTimeout(this.tickDelegate, 1E3)
        },
        countdown: function () {
            this.reloadtimer && clearTimeout(this.reloadtimer);
            this.ticktimer && clearTimeout(this.ticktimer);
            if (0 != this.cdlist.length) {
                for (var a = this.cdlist, c = (new Date).getTime(), b = a[a.length - 1], d = a.length - 2; 0 <= d; d--) a[d].end < b.end && (b = a[d]);
                a = b.end - c;
                864E5 < a && (a = 864E5);
                0 > a && (a = 0);
                this.reloadtimer = setTimeout(this.reloadDelegate, a);
                this.tick()
            }
        },
        ajaxCallback: function (a) {
            var c = a.ret.cdlist;
            userinfo.money = a.ret.money;
            userinfo.grade = a.ret.grade;
            refreshUserInfo();
            for (var a = this.ema, b = c.length; 0 <= --b;) 0 >= c[b].secs && c.splice(b, 1);
            var d = [],
                e = null,
                g = !1,
                f;
            for (f in this.cdlist) {
                e = this.cdlist[f];
                g = !1;
                for (b = c.length; b--;) if (c[b].id == e.id && c[b].cdtype == e.cdtype) {
                    g = !0;
                    break
                }
                g || d.push(e)
            }
            this.clear();
            this.add(c);
            a.trigger("beginCDTimeup", d);
            for (f = 0; f < d.length;) c = d[f], a.trigger(this.getDoneEventId(c.cdtype, c.target)), f++;
            a.trigger("endCDTimeup", d)
        },
        reload: function (a) {
            if ("number" == typeof a && a != this.cityid) this.cityid = a, this.clear();
            this.ticktimer && clearTimeout(this.ticktimer);
            ajaxCall(this.url, {
                key: this.key,
                city: this.cityid
            }, this.ajaxCallbackDelegate, function () {}, !1)
        },
        getList: function (a) {
            return !a ? this.cdlist : this.cdlist_hash[a]
        },
        calcleftsec: function (a) {
            var c = (new Date).getTime();
            return Math.ceil((a.end - c) / 1E3)
        },
        getTickEventId: function (a, c) {
            return "CD:TICK:" + (a + ":" + c)
        },
        getDoneEventId: function (a, c) {
            return "CD:DONE:" + (a + ":" + c)
        },
        forceNotify: function (a) {
            if (this.cdlist) for (var c = this.ema, b = this.cdlist, d = b.length, e = (new Date).getTime(); d--;) {
                var g = b[d],
                    f = Math.ceil((g.end - e) / 1E3);
                if (!a || a == g.cdtype) 0 > f && (f = 0), c.trigger(this.getTickEventId(g.cdtype, g.target), f)
            }
        },
        changeSecs: function (a, c) {
            0 > c && (c = 0);
            for (var b = this.cdlist.length, d = (new Date).getTime(); b--;) if (this.cdlist[b].id == a) {
                this.cdlist[b].end = d + 1E3 * c;
                this.cdlist[b].secs = c;
                this.countdown();
                break
            }
        },
        getCD: function (a, c) {
            for (var b = this.cdlist.length; b--;) if (this.cdlist[b].cdtype == a && this.cdlist[b].target == c) return this.cdlist[b];
            return null
        }
    }
})();
(function () {
    function a() {
        this.msgtemp = []
    }
    a.prototype = {
        scrollable: 1,
        trace: function (a) {
            this.write(this.makearray(arguments).join(" "))
        },
        assert: function (a, b) {
            a || alert("Assert Failed:" + b)
        },
        makearray: function (a) {
            for (var b = -1, d = []; ++b < a.length;) {
                var e = a[b];
                d.push("object" === typeof e ? Utils.jsonToString(e) : e)
            }
            return d
        },
        _write: function (a) {
            var b = [];
            b.push("<div>");
            b.push(this.ftime(new Date, "hh:mm:ss Sms"));
            b.push("> ");
            b.push(a.replace("<", "&lt;").replace(">", "&gt;"));
            b.push("</div>");
            this.pnl.append(b.join(""));
            this.scrollable && this.container.scrollTop(this.pnl.height())
        },
        write: function (a) {
            var b = [];
            b.push("<div>");
            b.push(this.ftime(new Date, "hh:mm:ss Sms"));
            b.push("> ");
            b.push(a.replace("<", "&lt;").replace(">", "&gt;"));
            b.push("</div>");
            this.msgtemp.push(b.join(""))
        },
        init: function (a, b) {
            this.container = b;
            this.pnl = a;
            this.pnl.append(this.msgtemp.join(""));
            this.write = this._write
        },
        ftime: function (a, b) {
            var d = {
                "M+": a.getMonth() + 1,
                "d+": a.getDate(),
                "h+": a.getHours(),
                "m+": a.getMinutes(),
                "s+": a.getSeconds(),
                "q+": Math.floor((a.getMonth() + 3) / 3),
                S: a.getMilliseconds()
            };
            /(y+)/.test(b) && (b = b.replace(RegExp.$1, (a.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (var e in d) RegExp("(" + e + ")").test(b) && (b = b.replace(RegExp.$1, 1 == RegExp.$1.length ? d[e] : ("00" + d[e]).substr(("" + d[e]).length)));
            return b
        },
        toggle: function () {
            return this.scrollable ^= 1
        }
    };
    window.Debug = new a;
    $(function () {
        var a = $('<div id="debug" style="position:absolute; top:0px; right:0px; background-color:gray;font-size:12px; float:right; width:480px; height:320px;-webkit-user-select:text;-moz-user-select:text"></div>'),
            b = $('<div style="position:absolute;"></div>'),
            d = $('<div style="position:absolute;right:20px; background-color:white;"><button id="scroll">�쒏�譯싧뒯</button><button id="close">�녜뿭</button></div>'),
            e = $('<div style="position:relative; width:100%; z-index:2"></div'),
            g = $('<div style="position:relative;  width:100%;overflow:auto;"></div>'),
            f = $('<button style="position:absolute">DEBUG</button>');
        0 < window.location.href.indexOf("debug") ? (a.append(e), a.append(g), g.append(b), e.append(d), $(document.body).append(a), window.Debug.init(b, g), e = function () {
            a.width($(window).width() - 480);
            a.height($(window).height());
            g.width(a.width());
            g.height(a.height())
        }, $(window).resize(e), b.scroll(function () {
            d.css("top", d.scrollTop())
        }), d.find("#scroll").click(function () {
            d.find("#scroll").html(window.Debug.toggle() ? "�쒏�譯싧뒯" : "�ゅ뒯譯싧뒯")
        }), d.find("#close").hide(), e()) : CONFIG._DEBUGCONSOLE ? (a.css("z-index", 100), a.append(e), a.append(g), g.append(b), e.append(d), a.hide(), f.show(), $(document.body).append(a), $(document.body).append(f), window.Debug.init(b, g), e = function () {
            a.width($(window).width());
            a.height($(window).height());
            g.width(a.width());
            g.height(a.height());
            f.css("z-index", 100);
            f.css("top", 0);
            f.css("right", 0)
        }, $(window).resize(e), e(), b.scroll(function () {
            d.css("top", d.scrollTop())
        }), d.find("#scroll").click(function () {
            d.find("#scroll").html(window.Debug.toggle() ? "�쒏�譯싧뒯" : "�ゅ뒯譯싧뒯")
        }), d.find("#close").click(function () {
            a.hide();
            f.show()
        }), f.click(function () {
            a.show();
            f.hide()
        })) : window.Debug.write = function () {}
    })
})();
(function () {
    if (!window.translate) window.translate = function () {
        for (var a = [], c = arguments, b = c[0], d = 0, e = /\%s/, g = [], f = e.exec(b); f; f = e.exec(b)) g.push(b.substr(0, "%" == f[0][0] ? f.index : f.index)), g.push("%s"), b = b.substr(f.index + f[0].length);
        g.push(b);
        for (b = 0; b < g.length; ++b)(e = g[b]) && "%s" === e ? (e = c[++d], void 0 === e ? a.push("%s") : a.push(e)) : a.push(e);
        return a.join("")
    }
})();
(function () {
    function a(a, c) {
        var g;
        this.element = "object" == typeof a ? a : document.getElementById(a);
        this.wrapper = this.element.parentNode;
        this.element.style.webkitTransitionProperty = "-webkit-transform";
        this.element.style.webkitTransitionTimingFunction = "cubic-bezier(0,0,0.25,1)";
        this.element.style.webkitTransitionDuration = "0";
        this.element.style.webkitTransform = m + "0,0" + l;
        this.options = {
            bounce: b,
            momentum: b,
            checkDOMChanges: !0,
            topOnDOMChanges: !1,
            hScrollbar: b,
            vScrollbar: b,
            fadeScrollbar: d || e || !f,
            shrinkScrollbar: d || e || !f,
            desktopCompatibility: !1,
            overflow: "hidden",
            snap: !1
        };
        if ("object" == typeof c) for (g in c) this.options[g] = c[g];
        if (this.options.desktopCompatibility) this.options.overflow = "hidden";
        this.wrapper.style.overflow = this.options.overflow;
        this.refresh();
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", this, !1);
        if (f || this.options.desktopCompatibility) this.element.addEventListener(j, this, !1), this.element.addEventListener(k, this, !1), this.element.addEventListener(h, this, !1);
        this.options.checkDOMChanges && this.element.addEventListener("DOMSubtreeModified", this, !1)
    }
    function c(a, c, b, d) {
        this.dir = a;
        this.fade = b;
        this.shrink = d;
        this.uid = ++n;
        this.bar = document.createElement("div");
        a = "position:absolute;top:0;left:0;-webkit-transition-timing-function:cubic-bezier(0,0,0.25,1);pointer-events:none;-webkit-transition-duration:0;-webkit-transition-delay:0;-webkit-transition-property:-webkit-transform;z-index:10;background:rgba(0,0,0,0.5);-webkit-transform:" + m + "0,0" + l + ";" + ("horizontal" == a ? "-webkit-border-radius:3px 2px;min-width:6px;min-height:5px" : "-webkit-border-radius:2px 3px;min-width:5px;min-height:6px");
        this.bar.setAttribute("style", a);
        this.wrapper = document.createElement("div");
        a = "-webkit-mask:-webkit-canvas(scrollbar" + this.uid + this.dir + ");position:absolute;z-index:10;pointer-events:none;overflow:hidden;opacity:0;-webkit-transition-duration:" + (b ? "300ms" : "0") + ";-webkit-transition-delay:0;-webkit-transition-property:opacity;" + ("horizontal" == this.dir ? "bottom:2px;left:2px;right:7px;height:5px" : "top:2px;right:2px;bottom:7px;width:5px;");
        this.wrapper.setAttribute("style", a);
        this.wrapper.appendChild(this.bar);
        c.appendChild(this.wrapper)
    }
    a.prototype = {
        x: 0,
        y: 0,
        enabled: !0,
        handleEvent: function (a) {
            switch (a.type) {
            case j:
                this.touchStart(a);
                break;
            case k:
                this.touchMove(a);
                break;
            case h:
                this.touchEnd(a);
                break;
            case "webkitTransitionEnd":
                this.transitionEnd();
                break;
            case "orientationchange":
            case "resize":
                this.refresh();
                break;
            case "DOMSubtreeModified":
                this.onDOMModified(a)
            }
        },
        onDOMModified: function (a) {
            var c = this;
            a.target.parentNode == c.element && (setTimeout(function () {
                c.refresh()
            }, 0), c.options.topOnDOMChanges && (0 != c.x || 0 != c.y) && c.scrollTo(0, 0, "0"))
        },
        refresh: function () {
            var a = this.x,
                b = this.y;
            this.scrollWidth = this.wrapper.clientWidth;
            this.scrollHeight = this.wrapper.clientHeight;
            this.scrollerWidth = this.element.offsetWidth;
            this.scrollerHeight = this.element.offsetHeight;
            this.maxScrollX = this.scrollWidth - this.scrollerWidth;
            this.maxScrollY = this.scrollHeight - this.scrollerHeight;
            this.directionY = this.directionX = 0;
            if (this.scrollX) if (0 <= this.maxScrollX) a = 0;
            else if (this.x < this.maxScrollX) a = this.maxScrollX;
            if (this.scrollY) if (0 <= this.maxScrollY) b = 0;
            else if (this.y < this.maxScrollY) b = this.maxScrollY;
            if (this.options.snap) this.maxPageX = -Math.floor(this.maxScrollX / this.scrollWidth), this.maxPageY = -Math.floor(this.maxScrollY / this.scrollHeight), b = this.snap(a, b), a = b.x, b = b.y;
            if (a != this.x || b != this.y) this.setTransitionTime("0"), this.setPosition(a, b, !0);
            this.scrollX = this.scrollerWidth > this.scrollWidth;
            this.scrollY = !this.scrollX || this.scrollerHeight > this.scrollHeight;
            if (this.options.hScrollbar && this.scrollX) this.scrollBarX = this.scrollBarX || new c("horizontal", this.wrapper, this.options.fadeScrollbar, this.options.shrinkScrollbar), this.scrollBarX.init(this.scrollWidth, this.scrollerWidth);
            else if (this.scrollBarX) this.scrollBarX = this.scrollBarX.remove();
            if (this.options.vScrollbar && this.scrollY && this.scrollerHeight > this.scrollHeight) this.scrollBarY = this.scrollBarY || new c("vertical", this.wrapper, this.options.fadeScrollbar, this.options.shrinkScrollbar), this.scrollBarY.init(this.scrollHeight, this.scrollerHeight);
            else if (this.scrollBarY) this.scrollBarY = this.scrollBarY.remove()
        },
        setPosition: function (a, b, c) {
            this.x = a;
            this.y = b;
            this.element.style.webkitTransform = m + this.x + "px," + this.y + "px" + l;
            c || (this.scrollBarX && this.scrollBarX.setPosition(this.x), this.scrollBarY && this.scrollBarY.setPosition(this.y))
        },
        setTransitionTime: function (a) {
            a = a || "0";
            this.element.style.webkitTransitionDuration = a;
            if (this.scrollBarX) this.scrollBarX.bar.style.webkitTransitionDuration = a, this.scrollBarX.wrapper.style.webkitTransitionDuration = b && this.options.fadeScrollbar ? "300ms" : "0";
            if (this.scrollBarY) this.scrollBarY.bar.style.webkitTransitionDuration = a, this.scrollBarY.wrapper.style.webkitTransitionDuration = b && this.options.fadeScrollbar ? "300ms" : "0"
        },
        touchStart: function (a) {
            var b;
            if (!("INPUT" == a.target.tagName || "SELECT" == a.target.tagName || "A" == a.target.tagName)) if (f && a.preventDefault(), a.stopPropagation(), this.enabled) {
                this.scrolling = !0;
                this.moved = !1;
                this.dist = 0;
                this.setTransitionTime("0");
                if (this.options.momentum || this.options.snap) if (b = new WebKitCSSMatrix(window.getComputedStyle(this.element).webkitTransform), b.e != this.x || b.f != this.y) document.removeEventListener("webkitTransitionEnd", this, !1), this.setPosition(b.e, b.f), this.moved = !0;
                this.touchStartX = f ? a.changedTouches[0].pageX : a.pageX;
                this.scrollStartX = this.x;
                this.touchStartY = f ? a.changedTouches[0].pageY : a.pageY;
                this.scrollStartY = this.y;
                this.scrollStartTime = a.timeStamp;
                this.directionY = this.directionX = 0
            }
        },
        touchMove: function (a) {
            var b = f ? a.changedTouches[0].pageX : a.pageX,
                c = f ? a.changedTouches[0].pageY : a.pageY,
                d = this.scrollX ? b - this.touchStartX : 0,
                e = this.scrollY ? c - this.touchStartY : 0,
                g = this.x + d,
                l = this.y + e;
            if (this.scrolling) {
                a.stopPropagation();
                this.touchStartX = b;
                this.touchStartY = c;
                if (0 <= g || g < this.maxScrollX) g = this.options.bounce ? Math.round(this.x + d / 3) : 0 <= g || 0 <= this.maxScrollX ? 0 : this.maxScrollX;
                if (0 <= l || l < this.maxScrollY) l = this.options.bounce ? Math.round(this.y + e / 3) : 0 <= l || 0 <= this.maxScrollY ? 0 : this.maxScrollY;
                5 < this.dist ? (this.setPosition(g, l), this.moved = !0, this.directionX = 0 < d ? -1 : 1, this.directionY = 0 < e ? -1 : 1) : this.dist += Math.abs(d) + Math.abs(e)
            }
        },
        touchEnd: function (a) {
            var b = a.timeStamp - this.scrollStartTime,
                c = f ? a.changedTouches[0] : a,
                d, e;
            d = 0;
            e = this.x;
            var g = this.y;
            if (this.scrolling) if (this.scrolling = !1, this.moved) if (!this.options.snap && 250 < b) {
            	this.resetPosition();
            }
            else {
                this.options.momentum && (a = !0 === this.scrollX ? this.momentum(this.x - this.scrollStartX, b, this.options.bounce ? -this.x + this.scrollWidth / 5 : -this.x, this.options.bounce ? this.x + this.scrollerWidth - this.scrollWidth + this.scrollWidth / 5 : this.x + this.scrollerWidth - this.scrollWidth) : {
                    dist: 0,
                    time: 0
                }, c = !0 === this.scrollY ? this.momentum(this.y - this.scrollStartY, b, this.options.bounce ? -this.y + this.scrollHeight / 5 : -this.y, this.options.bounce ? (0 > this.maxScrollY ? this.y + this.scrollerHeight - this.scrollHeight : 0) + this.scrollHeight / 5 : this.y + this.scrollerHeight - this.scrollHeight) : {
                    dist: 0,
                    time: 0
                }, d = Math.max(Math.max(a.time, c.time), 1), e = this.x + a.dist, g = this.y + c.dist);
                if (this.options.snap) a = this.snap(e, g), e = a.x, g = a.y, d = Math.max(a.time, d);
                this.scrollTo(e, g, d + "ms")
            } else if (this.resetPosition(), f) {
                for (d = c.target; 1 != d.nodeType;) d = d.parentNode;
                d.style.pointerEvents = "auto";
                if ("SELECT" != d.tagName && "INPUT" != d.tagName && "TEXTAREA" != d.tagName) e = document.createEvent("MouseEvents"), e.initMouseEvent("click", !0, !0, a.view, 1, c.screenX, c.screenY, c.clientX, c.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, 0, null), e._fake = !0, d.dispatchEvent(e)
            }
        },
        transitionEnd: function () {
            document.removeEventListener("webkitTransitionEnd", this, !1);
            this.resetPosition()
        },
        resetPosition: function () {
            var a = this.x,
                b = this.y;
            if (0 <= this.x) {
            	a = 0;
            } else if (this.x < this.maxScrollX) { 
            	a = this.maxScrollX;
            }
            if (0 <= this.y || 0 < this.maxScrollY) { 
            	b = 0;
            } else if (this.y < this.maxScrollY) {
            	b = this.maxScrollY;
            }
            
            if (a != this.x || b != this.y) {
            	this.scrollTo(a, b);
            } else {
                if (this.moved) this.onScrollEnd(), this.moved = !1;
                this.scrollBarX && this.scrollBarX.hide();
                this.scrollBarY && this.scrollBarY.hide()
            }
        },
        snap: function (a, b) {
            var c, a = 0 < this.directionX ? Math.floor(a / this.scrollWidth) : 0 > this.directionX ? Math.ceil(a / this.scrollWidth) : Math.round(a / this.scrollWidth);
            this.pageX = -a;
            a *= this.scrollWidth;
            if (0 < a) a = this.pageX = 0;
            else if (a < this.maxScrollX) this.pageX = this.maxPageX, a = this.maxScrollX;
            b = 0 < this.directionY ? Math.floor(b / this.scrollHeight) : 0 > this.directionY ? Math.ceil(b / this.scrollHeight) : Math.round(b / this.scrollHeight);
            this.pageY = -b;
            b *= this.scrollHeight;
            if (0 < b) b = this.pageY = 0;
            else if (b < this.maxScrollY) this.pageY = this.maxPageY, b = this.maxScrollY;
            c = Math.round(Math.max(500 * (Math.abs(this.x - a) / this.scrollWidth), 500 * (Math.abs(this.y - b) / this.scrollHeight)));
            return {
                x: a,
                y: b,
                time: c
            }
        },
        scrollTo: function (a, b, c) {
            this.x == a && this.y == b ? this.resetPosition() : (this.moved = !0, this.setTransitionTime(c || "350ms"), this.setPosition(a, b), "0" === c || "0s" == c || "0ms" == c ? this.resetPosition() : document.addEventListener("webkitTransitionEnd", this, !1))
        },
        scrollToPage: function (a, b, c) {
            if (!this.options.snap) this.pageX = -Math.round(this.x / this.scrollWidth), this.pageY = -Math.round(this.y / this.scrollHeight);
            "next" == a ? a = ++this.pageX : "prev" == a && (a = --this.pageX);
            "next" == b ? b = ++this.pageY : "prev" == b && (b = --this.pageY);
            a = -a * this.scrollWidth;
            b = -b * this.scrollHeight;
            b = this.snap(a, b);
            a = b.x;
            b = b.y;
            this.scrollTo(a, b, c || "500ms")
        },
        scrollToElement: function (a, b) {
            if (a = "object" == typeof a ? a : this.element.querySelector(a)) {
                var c = this.scrollX ? -a.offsetLeft : 0,
                    d = this.scrollY ? -a.offsetTop : 0;
                if (0 <= c) c = 0;
                else if (c < this.maxScrollX) c = this.maxScrollX;
                if (0 <= d) d = 0;
                else if (d < this.maxScrollY) d = this.maxScrollY;
                this.scrollTo(c, d, b)
            }
        },
        scrollToElement2: function (a, b, c) {
            if (a = "object" == typeof a ? a : this.element.querySelector(a)) {
                var d = this.scrollX ? -a.offsetLeft : 0,
                    a = this.scrollY ? -a.offsetTop : 0;
                if (0 > b + this.maxScrollY) this.maxScrollY = -b;
                if (0 <= d) d = 0;
                else if (d < this.maxScrollX) d = this.maxScrollX;
                if (0 <= a) a = 0;
                else if (a < this.maxScrollY) a = this.maxScrollY;
                this.scrollTo(d, a, c)
            }
        },
        momentum: function (a, b, c, d) {
            var b = 1E3 * (Math.abs(a) / b),
                e = b * b / 2.5 / 1E3,
                g = 0;
            0 < a && e > c ? (b = b * c / e / 2.5, e = c) : 0 > a && e > d && (b = b * d / e / 2.5, e = d);
            g = b / 1.2;
            return {
                dist: Math.round(e * (0 > a ? -1 : 1)),
                time: Math.round(g)
            }
        },
        onScrollEnd: function () {},
        destroy: function (a) {
            window.removeEventListener("onorientationchange" in window ? "orientationchange" : "resize", this, !1);
            this.element.removeEventListener(j, this, !1);
            this.element.removeEventListener(k, this, !1);
            this.element.removeEventListener(h, this, !1);
            document.removeEventListener("webkitTransitionEnd", this, !1);
            this.options.checkDOMChanges && this.element.removeEventListener("DOMSubtreeModified", this, !1);
            if (this.scrollBarX) this.scrollBarX = this.scrollBarX.remove();
            if (this.scrollBarY) this.scrollBarY = this.scrollBarY.remove();
            a && this.wrapper.parentNode.removeChild(this.wrapper);
            return null
        }
    };
    c.prototype = {
        init: function (a, b) {
            var c;
            if ("horizontal" == this.dir) {
                if (this.maxSize != this.wrapper.offsetWidth) this.maxSize = this.wrapper.offsetWidth, c = document.getCSSCanvasContext("2d", "scrollbar" + this.uid + this.dir, this.maxSize, 5), c.fillStyle = "rgb(0,0,0)", c.beginPath(), c.arc(2.5, 2.5, 2.5, Math.PI / 2, -Math.PI / 2, !1), c.lineTo(this.maxSize - 2.5, 0), c.arc(this.maxSize - 2.5, 2.5, 2.5, -Math.PI / 2, Math.PI / 2, !1), c.closePath(), c.fill()
            } else if (this.maxSize != this.wrapper.offsetHeight) this.maxSize = this.wrapper.offsetHeight, c = document.getCSSCanvasContext("2d", "scrollbar" + this.uid + this.dir, 5, this.maxSize), c.fillStyle = "rgb(0,0,0)", c.beginPath(), c.arc(2.5, 2.5, 2.5, Math.PI, 0, !1), c.lineTo(5, this.maxSize - 2.5), c.arc(2.5, this.maxSize - 2.5, 2.5, 0, Math.PI, !1), c.closePath(), c.fill();
            this.size = Math.max(Math.round(this.maxSize * this.maxSize / b), 6);
            this.maxScroll = this.maxSize - this.size;
            this.toWrapperProp = this.maxScroll / (a - b);
            this.bar.style["horizontal" == this.dir ? "width" : "height"] = this.size + "px"
        },
        setPosition: function (a) {
            "1" != this.wrapper.style.opacity && this.show();
            a = Math.round(this.toWrapperProp * a);
            0 > a ? (a = this.shrink ? a + 3 * a : 0, 7 > this.size + a && (a = -this.size + 6)) : a > this.maxScroll && (a = this.shrink ? a + 3 * (a - this.maxScroll) : this.maxScroll, 7 > this.size + this.maxScroll - a && (a = this.size + this.maxScroll - 6));
            a = "horizontal" == this.dir ? m + a + "px,0" + l : m + "0," + a + "px" + l;
            this.bar.style.webkitTransform = a
        },
        show: function () {
            if (b) this.wrapper.style.webkitTransitionDelay = "0";
            this.wrapper.style.opacity = "1"
        },
        hide: function () {
            if (b) this.wrapper.style.webkitTransitionDelay = "350ms";
            this.wrapper.style.opacity = "0"
        },
        remove: function () {
            this.wrapper.parentNode.removeChild(this.wrapper);
            return null
        }
    };
    var b = "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix,
        d = /iphone/gi.test(navigator.appVersion),
        e = /ipad/gi.test(navigator.appVersion),
        g = /android/gi.test(navigator.appVersion),
        f = d || e || g,
        j = f ? "touchstart" : "mousedown",
        k = f ? "touchmove" : "mousemove",
        h = f ? "touchend" : "mouseup",
        m = "translate" + (b ? "3d(" : "("),
        l = b ? ",0)" : ")",
        n = 0;
    window.iScroll = a
})();
var Effect = {
    zoom1: function () {},
    zoom: function (a, c, b, d, e, g, f) {
        var d = "number" == typeof d && 0 < d ? d : 1E3,
            j = (b - c) / d,
            k = 0 <= b - c,
            h = ["-webkit-transform", "-moz-transform"],
            m = (new Date).getTime();
        (function () {
            if (f) for (var b = ["-webkit-transform-origin", "-moz-transform-origin"], c = 0; c < b.length; c++) a.css(b[c], f.left + " " + f.top)
        })();
        (function () {
            var f;
            g && g();
            f = (new Date).getTime() - m;
            f = 0 == f ? c : f >= d ? b : c + j * f;
            for (var n = 0; n < h.length; n++) a.css(h[n], "scale(" + f + ")");
            !k && f > b || k && f < b ? setTimeout(arguments.callee, 50) : $.isFunction(e) && setTimeout(e, 50)
        })()
    },
    typer: function (a, c, b, d, e) {
        function g() {
            m ? l < f.length ? (a.html(f.slice(0, l).join("")), l++, n = setTimeout(arguments.callee, b)) : (a.html(c), m = !1, n = setTimeout(arguments.callee, 2 * b)) : $.isFunction(d) && d()
        }
        c = "string" == typeof c ? c : a.html();
        c = "string" == typeof c ? c : "";
        b = b || 20;
        e = "boolean" == typeof d ? d : "boolean" == typeof e ? e : !1;
        a.html("");
        for (var f = [], j = !0, k = 0; k < c.length; k++) {
            var h = c.charAt(k);
            j ? (e ? /[a-zA-Z0-9]/.test(h) ? 0 == f.length ? f.push(h) : f[f.length - 1] += h : f.push(h) : f.push(h), j = "<" !== h) : (f[f.length - 1] += h, j = ">" === h)
        }
        var m = !1,
            l = 0,
            n = 0;
        return {
            data: f,
            run: function () {
                m || (m = !0, a.show(), g())
            },
            end: function () {
                0 != n && (clearTimeout(n), n = 0);
                l = f.length - 1
            }
        }
    },
    SelectProxy: function () {
        function a(a) {
            var b = this;
            this.dom.panel = a.hide();
            this.dom.template_face = a.find(".selectproxy_panel_face");
            this.dom.template_item = a.find(".selectproxy_panel_content .selectproxy_panel_item");
            this.dom.move = a.find(".move");
            this.dom.panel.find("#selectproxy_panel_selected").click(function () {
                b.hidePop();
                if (b.data.newIndex != b.data.nowIndex) b.data.nowFace.find(".selectproxy_panel_face_text").html(b.data.nowSelect.options[b.data.newIndex].text), b.data.nowSelect.selectedIndex = b.data.newIndex, setTimeout(function () {
                    $(b.data.nowSelect).change()
                }, 25);
                return !1
            });
            this.dom.panel.find("#selectproxy_panel_cancel").click(function () {
                b.hidePop();
                return !1
            })
        }
        a.prototype = {
            dom: {
                panel: null,
                move: null,
                template_face: null,
                template_item: null
            },
            data: {
                cache: [],
                nowSelect: null,
                nowSelectBlock: null,
                nowIndex: -1,
                newIndex: -1,
                nowFace: null,
                iscroll: null
            },
            selectChange: function () {
                var a = this;
                if (a.data.newIndex != a.data.nowIndex || 0 > a.data.nowIndex) a.data.nowFace.find(".selectproxy_panel_face_text").html(a.data.nowSelect.options[a.data.newIndex].text), a.data.nowSelect.selectedIndex = a.data.newIndex, setTimeout(function () {
                    $(a.data.nowSelect).change()
                }, 25)
            },
            setIscroll: function () {
                this.data.iscroll && this.data.iscroll.destroy();
                this.data.iscroll = new iScroll(this.dom.move[0], {
                    desktopCompatibility: !0
                })
            },
            showPop: function (a, b) {
                function d(a, b) {
                    var c = e.dom.template_item.clone().removeClass("template").show();
                    c.find(".selectproxy_panel_item_text").html(a);
                    var d = c.find(".selectproxy_panel_item_no_checked");
                    if (e.data.nowIndex == b) d.removeClass().addClass("selectproxy_panel_item_checked"), e.data.nowSelectBlock = d;
                    /iphone/gi.test(navigator.appVersion);
                    /ipad/gi.test(navigator.appVersion);
                    /android/gi.test(navigator.appVersion);
                    c.click(function () {
                        e.data.nowSelectBlock.removeClass("selectproxy_panel_item_checked").addClass("selectproxy_panel_item_no_checked");
                        e.data.nowSelectBlock = d.removeClass("selectproxy_panel_item_no_checked").addClass("selectproxy_panel_item_checked");
                        e.data.newIndex = b;
                        setTimeout(function () {
                            e.dom.panel.hide();
                            e.selectChange()
                        }, 25)
                    });
                    return c
                }
                var e = this;
                this.dom.move.empty();
                var g = a[0].options;
                this.data.nowIndex = a[0].selectedIndex;
                this.data.nowSelect = this.data.newIndex = a[0];
                this.data.nowFace = b;
                for (var f = null, j = 0; j < g.length; j++) f = d(g[j].text, j), this.dom.move.append(f);
                f && f.css("border-bottom", "solid 0px");
                this.dom.panel.show();
                setTimeout(function () {
                    e.setIscroll()
                })
            },
            hidePop: function () {
                this.dom.panel.hide()
            },
            proxySelect: function (a) {
                if (!a || !a.nodeType) return null;
                var b = this.getCache(a);
                if (b) {
                    var d = b[1];
                    0 <= a.selectedIndex ? d.find(".selectproxy_panel_face_text").html(a.options[a.selectedIndex].text) : d.find(".selectproxy_panel_face_text").html("---")
                } else {
                    var e = this,
                        g = $(a),
                        d = this.dom.template_face.clone().removeClass("template");
                    d.insertBefore(g);
                    0 <= a.selectedIndex ? d.find(".selectproxy_panel_face_text").html(a.options[a.selectedIndex].text) : d.find(".selectproxy_panel_face_text").html("---");
                    d.css("width", g.width() + "px").click(function () {
                        e.showPop(g, d);
                        return !1
                    });
                    d[0].className = d[0].className + " " + a.className;
                    d[0].style.cssText += a.style.cssText;
                    this.data.cache.push([g, d]);
                    d.show();
                    g.hide()
                }
                return d
            },
            proxyAllSelect: function () {
                var a = this;
                $(document).find("select").each(function () {
                    a.proxySelect(this)
                })
            },
            getCache: function (a, b) {
                for (var d = this.data.cache, e = 0; e < d.length; e++) {
                    var g = d[e];
                    if (g[0][0] == a) return b && d.splice(e, 1), g
                }
                return null
            },
            clearProxy: function (a) {
                if (a) {
                    if (a = this.getCache(a, !0)) a[0].show(), a[1].hide().remove()
                } else {
                    for (var b = this.data.cache, d = 0; d < b.length; d++) a = b[d], a[0].show(), a[1].hide().remove();
                    b.length = 0
                }
            }
        };
        return a
    }()
};