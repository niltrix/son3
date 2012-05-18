defineSubView("f_ally", function () {
    function w(a, h, y) {
        if (null != H) for (var p = 0; p < H.length; p++) {
            var e = H[p];
            if (e.id == a) {
                e.gpower = h;
                e.team = y;
                break
            }
        }
    }
    function s(a) {
        $("#f_all_team_apply_gid").val(a);
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY, {
            key: key,
            id: a
        }, function (a) {
            $("#f_ally_team_apply select").empty().unbind();
            for (var h = 0; h < a.ret.team.length; h++) $("#f_ally_team_apply select").append('<option value="f_ally_team_apply' + a.ret.team[h].id + '">' + a.ret.team[h].name + "</option>");
            $("#f_ally_team_apply").show();
            window.selectProxy.proxySelect($("#f_ally_team_apply select")[0])
        });
        return !1
    }
    
    function n(a, h) {
        if (1 == a) return f.title1;
        if (2 == a) return f.title2;
        var y;
        if (3 == h) y = f.title3;
        else if (4 == h) y = f.title4;
        else if (5 == h) y = f.title5;
        3 == a ? y += " " + LNG.GUILDTEAMLEADER : 4 == a ? y += " " + LNG.GUILDTEAMELITE : 5 == a && (y += " " + LNG.GUILDTEAMMEMBER);
        return y
    }
    function v() {
        pnlLoading.show();
        $("#f_ally_my_new_list").empty().unbind();
        null != l && $.each(l, function (a, h) {
            var y = '<div style="position:relative;height:30px;"><ul class="reshead" style="position: absolute; left: 0px; top: 0px"><li><input style="position:relative;top:0px;" id="f_ally_my_new_sel' + a + '" type="checkbox"/></li><li id="f_ally_my_new_selp' + a + '"><em class="race' + h.nation + '"></em><b>' + h.name + '</b></li><li><em class="lv"></em><b>' + h.level + '</b></li></ul><div class="font12" style="position: absolute; left: 170px; top: 8px"><strong>' + LNG.ALLY_TEAM + "</strong>&nbsp;<b>" + (3 == h.team ? f.title3 : 4 == h.team ? f.title4 : 5 == h.team ? f.title5 : "Unknown") + '</b></div><table class="font12" style="position: absolute; left: 300px; top: 0px;" cellpadding=0 cellspacing=0><tr><td valign="middle" height="30px" width="170px">' + h.info + "</td></tr></table></div>";
            $("#f_ally_my_new_list").append(y);
            $("#f_ally_my_new_selp" + a).click(function () {
                var h = "#f_ally_my_new_sel" + a;
                !0 == $(h).attr("checked") ? $(h).attr("checked", !1) : $(h).attr("checked", !0)
            })
        });
        $("#f_ally_page").hide();
        $("#f_ally_my_new_content").show();
        $("#f_ally_my_new_content_bts").show();
        $("#f_ally_my_new_content_bts").removeClass("minusbutton").addClass("plusbutton");
        $("#f_ally_my_new_content_op").hide();
        null != i && (i.refresh(), i.setPosition(0, 0));
        pnlLoading.hide()
    }
    function c(a) {
        $("#f_ally_my_member_func" + a).hide();
        $("#f_ally_my_member_disp" + a).removeClass("minusbutton").addClass("plusbutton");
        M = null
    }
    function k(a, h, y, p) {
        return a.gpower == h && a.team == y ? '<option value="' + p + '" selected>' + n(h, y) + "</option>" : '<option value="' + p + '">' + n(h, y) + "</option>"
    }
    function g() {
        pnlLoading.show();
        $("#f_ally_my_member_list").empty().unbind();
        null != H && $.each(H, function (a, h) {
            var y = "undefined" != typeof h.live && 0 == h.live ? ' style="color: #AFC7C7;"' : "",
                e = '<div style="position:relative;height:30px;"><ul class="reshead" style="position: absolute; left: 0px; top: 0px;"><li><b' + y + ">" + h.nick + '</b></li><li><em class="lv"></em><b' + y + ">" + h.level + "</b></li>";
            "undefined" != typeof h.pvp && (e += '<li><em class="pvp"></em><b' + y + ">" + h.pvp + "</b></li>");
            "undefined" != typeof h.on && 1 == h.on && (e += '<li><em style="background-image: url(img/bg/info.png); background-repeat: no-repeat; background-position: center center;"></em></li>');
            e += "</ul>";
            e = 2 < userinfo.gpower || 1 == h.gpower ? e + ('<div class="font12" style="position: absolute; left: 220px; top: 8px"><b>' + n(h.gpower, h.team) + "</b></div>") : e + ('<div id="f_ally_my_member_setrole' + h.id + '" class="font12" style="position: absolute; left: 220px; top: 8px"><img src="img/button/drop_down.png"/><b style="position:relative;top:-3px;">' + n(h.gpower, h.team) + "</b></div>");
            h.id != userinfo.id && (e += '<div class="plusbutton" id="f_ally_my_member_disp' + h.id + '" style="position: absolute; left: 420px; top: 0px;"></div><div id="f_ally_my_member_func' + h.id + '" style="position: absolute; left: 140px; top: 1px; display:none;">', 2 >= userinfo.gpower && 1 != h.gpower && (e += '<div id="f_ally_my_member_del' + h.id + '" class="funcbutton" style="position:absolute; left:0px;top:0px;">' + LNG.KICK_OUT + "</div>"), e += '<div class="funcbutton" style="position:absolute; left:70px;top:0px;" id="f_ally_my_member_fav' + h.id + '">' + LNG.ADD_FAV + '</div><div class="funcbutton" style="position:absolute; left:140px;top:0px;" id="f_ally_my_member_mail' + h.id + '">' + LNG.SEND_MAIL + '</div><div class="funcbutton" style="position:absolute; left:210px;top:0px;" id="f_ally_my_member_detail' + h.id + '">' + LNG.LORD_INFO + "</div></div>");
            e += '<div class="font12" style="position: absolute; left: 360px; top: 8px">' + h.rep + "</div>";
            $("#f_ally_my_member_list").append(e + "</div>");
            2 >= userinfo.gpower && 1 != h.gpower && $("#f_ally_my_member_setrole" + h.id).click(function () {
                var a = $("#f_ally_my_member_selrole p select");
                a.empty();
                1 == userinfo.gpower && a.append(k(h, 1, 1, "1"));
                a.append(k(h, 2, 2, "2"));
                for (var y = 3; 6 > y; y++) {
                    a.append(k(h, 3, y, y.toString()));
                    for (var e = 4; 6 > e; e++) a.append(k(h, e, y, y.toString() + e.toString()))
                }
                $("#f_ally_my_member_selrole_id").val(h.id);
                $("#f_ally_my_member_selrole p b").text(h.nick);
                if (i) i.enabled = !1;
                $("#f_ally_my_member_selrole").show();
                window.selectProxy.proxySelect($("#f_ally_my_member_selrole select")[0])
            });
            h.id != userinfo.id && ($("#f_ally_my_member_disp" + h.id).click(function () {
                if ($("#f_ally_my_member_disp" + h.id).hasClass("plusbutton")) {
                    var a = h.id;
                    null != M && M != a && c(M);
                    M = a;
                    $("#f_ally_my_member_func" + a).show();
                    $("#f_ally_my_member_disp" + a).removeClass("plusbutton").addClass("minusbutton")
                } else c(h.id);
                return !1
            }), $("#f_ally_my_member_detail" + h.id).click(function () {
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETOTHERINFO, {
                    key: key,
                    id: h.id
                }, function (a) {
                    showUserInfo(a.ret.user)
                });
                return !1
            }), $("#f_ally_my_member_mail" + h.id).click(function () {
                GlobalNav.WriteMail(h.nick);
                return !1
            }), $("#f_ally_my_member_fav" + h.id).click(function () {
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
                    key: key,
                    nick: h.nick
                }, function (a) {
                    showInfo(translate(LNG.ADDFAVDONE, a.ret.friend.nick))
                });
                return !1
            }), 2 >= userinfo.gpower && 1 != h.gpower && $("#f_ally_my_member_del" + h.id).click(function () {
                if (2 < userinfo.gpower || 1 == h.gpower) return showInfo(LNG.ERROR.CLIENT.NOTAUTHORIZED), !1;
                showConfirm(translate(LNG.GUILDDELCONFIRM, h.nick), function () {
                    pnlLoading.show();
                    ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
                        key: key,
                        delid: h.id
                    }, function () {
                        pnlLoading.show();
                        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
                            key: key,
                            page: F
                        }, function (a) {
                            H = a.ret.member;
                            p = Math.ceil(f.guild.num / a.ret.size);
                            g()
                        });
                        showInfo(LNG.SUCCESS)
                    })
                });
                return !1
            }))
        });
        1 < p ? ($("#f_ally_page").show(), 1 >= F ? $("#f_ally_page_left").hide() : $("#f_ally_page_left").show(), F >= p ? $("#f_ally_page_right").hide() : $("#f_ally_page_right").show(), $("#f_ally_page_num").text(F + "/" + p)) : $("#f_ally_page").hide();
        $("#f_ally_my_member_list").show();
        null != i && (i.refresh(), i.setPosition(0, 0));
        pnlLoading.hide()
    }
    function a(a) {
        $("#f_ally_member_list_func" + a).hide();
        $("#f_ally_member_list_disp" + a).removeClass("minusbutton").addClass("plusbutton");
        D = null
    }
    function t() {
        pnlLoading.show();
        $("#f_ally_member_list_disp").empty().unbind();
        null != O && $.each(O, function (h, y) {
            var e = '<div style="position:relative;height:30px;"><ul class="reshead" style="position: absolute; left: 0px; top: 0px"><li><em class="race' + y.nation + '"></em><b>' + y.nick + '</b></li><li><em class="lv"></em><b>' + y.level + "</b></li></ul>",
                e = e + ('<div class="font12" style="position: absolute; left: 190px; top: 8px"><b>' + translate(y.role, LNG.GUILDTEAMLEADER) + "</b></div>"),
                e = e + ('<div class="plusbutton" id="f_ally_member_list_disp' + y.id + '" style="position: absolute; left: 420px; top: 0px;"></div><div id="f_ally_member_list_func' + y.id + '" style="position: absolute; left: 140px; top: 1px; display:none;">'),
                e = e + ('<div class="funcbutton" style="position:absolute; left:70px;top:0px;" id="f_ally_member_list_fav' + y.id + '">' + LNG.ADD_FAV + '</div><div class="funcbutton" style="position:absolute; left:140px;top:0px;" id="f_ally_member_list_mail' + y.id + '">' + LNG.SEND_MAIL + '</div><div class="funcbutton" style="position:absolute; left:210px;top:0px;" id="f_ally_member_list_detail' + y.id + '">' + LNG.LORD_INFO + "</div></div>");
            $("#f_ally_member_list_disp").append(e + "</div>");
            $("#f_ally_member_list_disp" + y.id).click(function () {
                if ($("#f_ally_member_list_disp" + y.id).hasClass("plusbutton")) {
                    var h = y.id;
                    null != D && D != h && a(D);
                    D = h;
                    $("#f_ally_member_list_func" + h).show();
                    $("#f_ally_member_list_disp" + h).removeClass("plusbutton").addClass("minusbutton")
                } else a(y.id);
                return !1
            });
            $("#f_ally_member_list_detail" + y.id).click(function () {
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETOTHERINFO, {
                    key: key,
                    id: y.id
                }, function (a) {
                    showUserInfo(a.ret.user)
                });
                return !1
            });
            $("#f_ally_member_list_mail" + y.id).click(function () {
                GlobalNav.WriteMail(y.nick);
                return !1
            });
            $("#f_ally_member_list_fav" + y.id).click(function () {
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
                    key: key,
                    nick: y.nick
                }, function (a) {
                    showInfo(translate(LNG.ADDFAVDONE, a.ret.friend.nick))
                });
                return !1
            })
        });
        h = $("#f_ally_page").is(":visible");
        $("#f_ally_page").hide();
        $("#f_ally_member_list").show();
        null != i && (i.refresh(), i.setPosition(0, 0));
        pnlLoading.hide()
    }
    function u(a) {
        $("#f_ally_list_more" + a).removeClass("minusbutton").addClass("plusbutton");
        $("#f_ally_list_info" + a).hide();
        $("#f_ally_apply" + a).hide();
        y = null
    }
    function b() {
        $("#f_ally_list_disp").empty().unbind();
        null != z && $.each(z, function (a, h) {
            var e = '<div class="font12" style="position:relative;height:55px"><ul class="reshead"><li><em class="guild" style="background-image:url(' + Utils.getFlag(h.flag) + ');"></em><b>' + h.name + '</b></li></ul><strong style="position:absolute; left:130px;top:8px;">' + h.num + "/" + h.max + '</strong><strong style="position:absolute;left:200px;top:8px;">' + h.score + '</strong><div style="position:absolute; left:6px;top:26px;height:30px;overflow:hidden;">' + h.intro + "</div>",
                e = 1 == h.state ? e + ('<strong style="position:absolute; left:300px;top:10px;">' + LNG.YES + "</strong>") : e + ('<strong style="position:absolute; left:300px;top:10px;">' + LNG.NO + "</strong>"),
                p = !1,
                e = e + ('<div id="f_ally_list_info' + h.id + '" class="funcbutton" style="left: 350px; top:2px; display:none;">' + LNG.ALLY_INFO + '</div><div id="f_ally_list_more' + h.id + '" class="plusbutton" style="left: 420px; top:1px;"></div>');
            0 == userinfo.guildid && 1 == h.state && h.num < h.max && (p = !0, e += '<div id="f_ally_apply' + h.id + '" class="funcbutton" style="left: 270px; top:2px; display:none;">' + LNG.ALLY_APPLY + "</div>");
            $("#f_ally_list_disp").append(e + "</div>");
            $("#f_ally_list_more" + h.id).click(function () {
                if ($("#f_ally_list_more" + h.id).hasClass("plusbutton")) {
                    var a = h.id;
                    null != y && y != a && u(y);
                    y = a;
                    $("#f_ally_list_more" + a).removeClass("plusbutton").addClass("minusbutton");
                    $("#f_ally_list_info" + a).show();
                    $("#f_ally_apply" + a).show()
                } else u(h.id);
                return !1
            });
            $("#f_ally_list_info" + h.id).click(function () {
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
                    key: key,
                    id: h.id
                }, function (a) {
                    O = a.ret.member;
                    $("#f_ally_list").hide();
                    $("#f_ally_member_list_title1").html('<ul class="reshead"><li><em class="guild" style="background-image:url(' + Utils.getFlag(h.flag) + ');"></em><b>' + h.name + "</b></li></ul>");
                    t()
                });
                return !1
            });
            p && $("#f_ally_apply" + h.id).click(function () {
                return s(h.id)
            })
        });
        1 < A ? ($("#f_ally_page").show(), 1 >= G ? $("#f_ally_page_left").hide() : $("#f_ally_page_left").show(), G >= A ? $("#f_ally_page_right").hide() : $("#f_ally_page_right").show(), $("#f_ally_page_num").text(G + "/" + A)) : $("#f_ally_page").hide();
        null != i && (i.refresh(), i.setPosition(0, 0))
    }
    function B(a) {
        for (var a = a.split(","), h = "", y = 0; y < a.length; y++) h = "" == h ? a[y] : h + ('&nbsp;<font style="color:white">|</font>&nbsp;' + a[y]);
        return h
    }
    function m() {
        $("#f_ally_my_info_quota").text(f.quota[0] + "/" + f.quota[1]);
        $("#f_ally_my_info_cd").text(Utils.timeString2(f.quota[2]));
        $("#f_ally_my_info_flag").attr("src", Utils.getFlag(f.guild.flag));
        $("#f_ally_my_info_name").text(f.guild.name);
        $("#f_ally_my_info_score").text(f.guild.score);
        $("#f_ally_my_info_member").text(f.guild.num + "/" + f.guild.max);
        $("#f_ally_my_info_state").text(1 == f.guild.state ? LNG.GUILDOPEN : LNG.GUILDCLOSE);
        $("#f_ally_my_quit").text(1 == userinfo.gpower ? LNG.GUILDDISBAND : LNG.GUILDQUIT);
        $("#f_ally_my_info_intro").text(f.guild.intro);
        $("#f_ally_my_info_title1").text(f.title1);
        $("#f_ally_my_info_title2").text(f.title2);
        $("#f_ally_my_info_title3").text(f.title3 + " " + LNG.GUILDTEAMLEADER);
        $("#f_ally_my_info_title4").text(f.title4 + " " + LNG.GUILDTEAMLEADER);
        $("#f_ally_my_info_title5").text(f.title5 + " " + LNG.GUILDTEAMLEADER);
        $("#f_ally_my_info_name1").html(B(f.name1));
        null == f.name2 || "" == f.name2 ? $("#f_ally_my_info_name2").html("N/A") : $("#f_ally_my_info_name2").html(B(f.name2));
        null == f.name3 || "" == f.name3 ? $("#f_ally_my_info_name3").html("N/A") : $("#f_ally_my_info_name3").html(B(f.name3));
        null == f.name4 || "" == f.name4 ? $("#f_ally_my_info_name4").html("N/A") : $("#f_ally_my_info_name4").html(B(f.name4));
        null == f.name5 || "" == f.name5 ? $("#f_ally_my_info_name5").html("N/A") : $("#f_ally_my_info_name5").html(B(f.name5));
        null != i && (i.refresh(), i.setPosition(0, 0))
    }
    function C() {
        null == f || L ? (L = !1, pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
            key: key
        }, function (a) {
            f = a.ret;
            m()
        })) : m()
    }
    function d() {
        null == z ? (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY, {
            key: key,
            page: G
        }, function (a) {
            pnlLoading.show();
            z = a.ret.guild;
            A = a.ret.max;
            b();
            pnlLoading.hide()
        })) : b()
    }
    function E() {
        $("#f_ally_tech_info_progress").hide();
        $("#f_ally_tech_info_no_active").hide();
        $("#f_ally_tech_info_req").hide();
        $("#f_ally_tech_info_donate").hide();
        $("#f_ally_tech_info_activate").hide();
        $("#f_ally_tech_info_cd1").hide();
        if (N) {
            $("#f_ally_tech_info_level").text(N[0]);
            $("#f_ally_tech_info_progress b").text(N[1]);
            $("#f_ally_tech_info_progress span").text(N[3]);
            var a = Utils.parseInt(N[3], 0);
            0 < a ? $("#f_ally_tech_info_progress label").text(Math.floor(100 * N[1] / a)) : $("#f_ally_tech_info_progress label").text("0");
            $("#f_ally_tech_info_progress").show();
            0 < N[4] ? ($("#f_ally_tech_info_cd1").text(Utils.timeString2(N[4])), $("#f_ally_tech_info_cd1").show()) : $("#f_ally_tech_info_donate").show()
        }
    }
    function o() {
        var a = LNG.ALLY_TECH[J],
            h = K[5][J - 1];
        $("#f_ally_tech_info_title").text(a.name);
        $("#f_ally_tech_info_level").text(h[1]);
        $("#f_ally_tech_info_desc").text(a.desc);
        0 == h[0] && 5 > h[1] ? (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
            key: key,
            op: "techinfo",
            techid: J
        }, function (a) {
            N = a.ret;
            E()
        })) : ($("#f_ally_tech_info_progress").hide(), $("#f_ally_tech_info_no_active").hide(), $("#f_ally_tech_info_req").hide(), $("#f_ally_tech_info_donate").hide(), $("#f_ally_tech_info_activate").hide(), $("#f_ally_tech_info_cd1").hide(), 1 == h[0] ? ($("#f_ally_tech_info_no_active").show(), (1 == userinfo.gpower || 2 == userinfo.gpower) && $("#f_ally_tech_info_activate").show()) : 2 == h[0] && ($("#f_ally_tech_info_req span").text(a.req), $("#f_ally_tech_info_req").show()));
        $("#f_ally_tech_info").show()
    }
    function q() {
        if (null != K) {
            $("#f_ally_my_hall_level").text(K[0]);
            $("#f_ally_my_hall_resgold b").text(K[1] + "/" + K[2]);
            var a = Utils.parseInt(K[2], 0);
            0 < a ? $("#f_ally_my_hall_percent").text(Math.floor(100 * K[1] / a)) : $("#f_ally_my_hall_percent").text("0");
            0 < K[4] ? ($("#f_ally_my_hall_cd1 p").text(Utils.timeString2(K[4])), $("#f_ally_my_hall_upgrade").hide()) : $("#f_ally_my_hall_upgrade").show()
        }
        for (a = 1; a <= K[5].length; a++) {
            var h = K[5][a - 1];
            0 == h[0] ? ($("#f_ally_my_hall_t" + a + "_level b").text(h[1]), $("#f_ally_my_hall_t" + a + "_level").show()) : $("#f_ally_my_hall_t" + a + "_level").hide();
            0 < h[2] || 5 <= h[1] ? $("#f_ally_my_hall_t" + a + " p").css("color", "white") : $("#f_ally_my_hall_t" + a + " p").css("color", LNG.ALLY_TECH_STATUS[h[0]].color)
        }
    }
    function x(a, h, y) {
        function e() {
            var r = Math.ceil(Math.pow(I, 1.5)),
                r = r > b ? b : r,
                r = p + h * r;
            0 < h && r > y || 0 > h && r < y ? (S = !1, clearInterval(T), a.value = y) : a.value = r;
            I++
        }
        S = !0;
        var p = Utils.parseInt(a.value, 0),
            b = Math.abs(y - p),
            I = 1;
        e();
        1 < b && setTimeout(function () {
            clearInterval(T);
            S && (T = setInterval(e, 100))
        }, 300)
    }
    function j() {
        S = !1;
        clearInterval(T);
        timer = null
    }
    var i = null,
        f = null,
        l = null,
        z = null,
        G = 1,
        A = 0,
        e = $("#f_sample_html_script"),
        r = $(e.parent().get(0));
    r.bind("dispose", function () {
        null != i && (i.destroy(!1), i = null);
        window.selectProxy.clearProxy($("#f_ally_my_member_selrole select")[0]);
        r.unbind("dispose", arguments.callee);
        r = null
    });
    var H = null,
        F = 1,
        p = 0,
        L = !1,
        M = null,
        D = null,
        O = null,
        h = !1,
        y = null;
    $("#f_ally_my_new_content_bts").click(function () {
        $("#f_ally_my_new_content_bts").hasClass("plusbutton") ? ($("#f_ally_my_new_content_bts").removeClass("plusbutton").addClass("minusbutton"), $("#f_ally_my_new_content_op").show()) : ($("#f_ally_my_new_content_bts").removeClass("minusbutton").addClass("plusbutton"), $("#f_ally_my_new_content_op").hide())
    });
    $("#f_sample_tab1").click(function () {
        $("#f_sample_tab1").hasClass("tab_inactive") && ($("#wrapper").css("height", "225px"), $("#f_sample_tab1").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_search").show(), $("#f_ally_list").show(), $("#f_ally_create").hide(), $("#f_ally_my").hide(), $("#f_ally_my_info_content").hide(), $("#f_ally_my_set_content").hide(), $("#f_ally_my_member_content").hide(), $("#f_ally_my_new_content").hide(), $("#f_ally_my_new_content_bts").hide(), $("#f_ally_my_new_content_op").hide(), $("#f_ally_page").hide(), $("#f_ally_my_hall_info").hide(), d());
        return !1
    });
    $("#f_sample_tab2").click(function () {
        $("#f_sample_tab2").hasClass("tab_inactive") && ($("#wrapper").css("height", "200px"), $("#f_sample_tab2").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_info_content").show(), $("#f_ally_my").show(), $("#f_ally_my_set_content").hide(), $("#f_ally_my_member_content").hide(), $("#f_ally_my_new_content").hide(), $("#f_ally_my_new_content_bts").hide(), $("#f_ally_my_new_content_op").hide(), $("#f_ally_search").hide(), $("#f_ally_my_info").removeClass("tab_inactive").addClass("tab_active"), $("#f_ally_my_member").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_new").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_set").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_hall").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_list").hide(), $("#f_ally_member_list").hide(), $("#f_ally_page").hide(), 0 != userinfo.guildid ? ($("#f_ally_create").hide(), $("#f_ally_my").show(), 2 < userinfo.gpower && ($("#f_ally_my_set").hide(), 3 < userinfo.gpower && $("#f_ally_my_new").hide()), C()) : ($("#f_ally_create").show(), $("#f_ally_my").hide()));
        return !1
    });
    $("#f_sample_close").click(function () {
        $("#f_ally_member_list").is(":visible") ? ($("#f_ally_member_list").hide(), $("#f_ally_list").show(), h && $("#f_ally_page").show(), null != i && (i.refresh(), i.setPosition(0, 0))) : showCity();
        return !1
    });
    var I = 1;
    $("#f_ally_create_flag_left").click(function () {
        1 < I ? I-- : I = 127;
        $("#f_ally_create_flag").attr("src", Utils.getFlag(I));
        return !1
    });
    $("#f_ally_create_flag_right").click(function () {
        127 > I ? I++ : I = 1;
        $("#f_ally_create_flag").attr("src", Utils.getFlag(I));
        return !1
    });
    $("#f_ally_my_set_flag_left").click(function () {
        1 < I ? I-- : I = 127;
        $("#f_ally_my_set_flag").attr("src", Utils.getFlag(I));
        return !1
    });
    $("#f_ally_my_set_flag_right").click(function () {
        127 > I ? I++ : I = 1;
        $("#f_ally_my_set_flag").attr("src", Utils.getFlag(I));
        return !1
    });
    $("#f_ally_create_confirm").click(function () {
        if (0 == userinfo.guildid) {
            var a = encodeURIComponent(Utils.trim($("#f_ally_create_name").val()));
            if (null == a || "" == a) return showInfo(LNG.ERROR.CLIENT.EMPTYALLYNAME), !1;
            var h = Utils.trim($("#f_ally_create_intro").val());
            180 < h.length && (h = h.substr(0, 180));
            h = encodeURIComponent(h);
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_CREATE, {
                key: key,
                name: a,
                flag: I,
                info: h
            }, function (a) {
                f = a.ret;
                userinfo.guildid = f.guild.id;
                userinfo.guild = f.guild.name;
                userinfo.gpower = 1;
                userinfo.gflag = f.guild.flag;
                refreshUserInfo();
                C();
                $("#f_sample_tab2 a").text(LNG.GUILDTITLEMY);
                $("#f_ally_create").hide();
                $("#f_ally_my").show()
            })
        }
        return !1
    });
    $("#f_ally_search_bt").click(function () {
        pnlLoading.show();
        G = 1;
        var a = encodeURIComponent(Utils.trim($("#f_ally_name").val())),
            h = CONFIG.MYHOST + CONFIG.FUNC_ALLY;
        null != a && "" != a ? ajaxCall(h, {
            key: key,
            page: G,
            name: a
        }, function (a) {
            z = a.ret.guild;
            A = a.ret.max;
            b()
        }) : ajaxCall(h, {
            key: key,
            page: G
        }, function (a) {
            z = a.ret.guild;
            A = a.ret.max;
            b()
        });
        return !1
    });
    $("#f_ally_page_left").click(function () {
        if ($("#f_sample_tab1").hasClass("tab_active")) if (1 < G) {
            pnlLoading.show();
            G -= 1;
            var a = encodeURIComponent(Utils.trim($("#f_ally_name").val())),
                h = CONFIG.MYHOST + CONFIG.FUNC_ALLY;
            null != a && "" != a ? ajaxCall(h, {
                key: key,
                page: G,
                name: a
            }, function (a) {
                z = a.ret.guild;
                A = a.ret.max;
                b()
            }) : ajaxCall(h, {
                key: key,
                page: G
            }, function (a) {
                z = a.ret.guild;
                A = a.ret.max;
                b()
            })
        } else $("#f_ally_page_left").hide();
        else $("#f_ally_my_member").hasClass("tab_active") && 1 < F && (F -= 1, pnlLoading.show(), h = CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, ajaxCall(h, {
            key: key,
            page: F
        }, function (a) {
            H = a.ret.member;
            p = Math.ceil(f.guild.num / a.ret.size);
            g()
        }));
        return !1
    });
    $("#f_ally_page_right").click(function () {
        if ($("#f_sample_tab1").hasClass("tab_active")) if (G < A) {
            pnlLoading.show();
            G += 1;
            var a = encodeURIComponent(Utils.trim($("#f_ally_name").val())),
                h = CONFIG.MYHOST + CONFIG.FUNC_ALLY;
            null != a && "" != a ? ajaxCall(h, {
                key: key,
                page: G,
                name: a
            }, function (a) {
                z = a.ret.guild;
                A = a.ret.max;
                b()
            }) : ajaxCall(h, {
                key: key,
                page: G
            }, function (a) {
                z = a.ret.guild;
                A = a.ret.max;
                b()
            })
        } else $("#f_ally_page_right").hide();
        else $("#f_ally_my_member").hasClass("tab_active") && F < p && (F += 1, pnlLoading.show(), h = CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, ajaxCall(h, {
            key: key,
            page: F
        }, function (a) {
            H = a.ret.member;
            p = Math.ceil(f.guild.num / a.ret.size);
            g()
        }));
        return !1
    });
    $("#f_ally_my_info").click(function () {
        $("#f_ally_my_info").hasClass("tab_inactive") && ($("#f_ally_my_hall").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_info").removeClass("tab_inactive").addClass("tab_active"), $("#f_ally_my_member").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_new").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_set").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_page").hide(), $("#f_ally_my_set_content").hide(), $("#f_ally_my_member_content").hide(), $("#f_ally_my_new_content").hide(), $("#f_ally_my_new_content_bts").hide(), $("#f_ally_my_new_content_op").hide(), $("#f_ally_my_info_content").show(), $("#f_ally_my_quit").show(), $("#f_ally_my_mail").hide(), $("#f_ally_my_hall_info").hide(), C());
        return !1
    });
    $("#f_ally_my_member").click(function () {
        $("#f_ally_my_member").hasClass("tab_inactive") && ($("#f_ally_my_hall").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_member").removeClass("tab_inactive").addClass("tab_active"), $("#f_ally_my_info").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_new").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_set").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_set_content").hide(), $("#f_ally_my_member_content").show(), $("#f_ally_my_new_content").hide(), $("#f_ally_my_new_content_bts").hide(), $("#f_ally_my_new_content_op").hide(), $("#f_ally_my_info_content").hide(), $("#f_ally_my_quit").hide(), $("#f_ally_my_mail").show(), $("#f_ally_my_hall_info").hide(), pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
            key: key,
            page: F
        }, function (a) {
            H = a.ret.member;
            p = Math.ceil(f.guild.num / a.ret.size);
            g()
        }), null != i && (i.refresh(), i.setPosition(0, 0)));
        return !1
    });
    $("#f_ally_my_new").click(function () {
        $("#f_ally_my_new").hasClass("tab_inactive") && ($("#f_ally_my_hall").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_new").removeClass("tab_inactive").addClass("tab_active"), $("#f_ally_my_member").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_info").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_set").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_set_content").hide(), $("#f_ally_my_member_content").hide(), $("#f_ally_my_new_content").show(), $("#f_ally_my_new_content_bts").show(), $("#f_ally_my_new_content_op").hide(), $("#f_ally_my_info_content").hide(), $("#f_ally_my_quit").hide(), $("#f_ally_my_mail").hide(), $("#f_ally_my_hall_info").hide(), pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
            key: key,
            act: 3
        }, function (a) {
            l = a.ret.app;
            v()
        }), null != i && (i.refresh(), i.setPosition(0, 0)));
        return !1
    });
    var J = 0,
        N = null;
    $("#f_ally_my_hall_t1_info").click(function () {
        J = 1;
        o()
    });
    $("#f_ally_my_hall_t2_info").click(function () {
        J = 2;
        o()
    });
    $("#f_ally_my_hall_t3_info").click(function () {
        J = 3;
        o()
    });
    $("#f_ally_my_hall_t4_info").click(function () {
        J = 4;
        o()
    });
    $("#f_ally_my_hall_t5_info").click(function () {
        J = 5;
        o()
    });
    $("#f_ally_my_hall_t6_info").click(function () {
        J = 6;
        o()
    });
    $("#f_ally_my_hall_t7_info").click(function () {
        J = 7;
        o()
    });
    $("#f_ally_my_hall_t8_info").click(function () {
        J = 8;
        o()
    });
    $("#f_ally_my_hall_t9_info").click(function () {
        J = 9;
        o()
    });
    $("#f_ally_my_hall_t10_info").click(function () {
        J = 10;
        o()
    });
    $("#f_ally_my_hall_t11_info").click(function () {
        J = 11;
        o()
    });
    $("#f_ally_my_hall_t12_info").click(function () {
        J = 12;
        o()
    });
    $("#f_ally_my_hall_t13_info").click(function () {
        J = 13;
        o()
    });
    $("#f_ally_my_hall_t14_info").click(function () {
        J = 14;
        o()
    });
    $("#f_ally_my_hall_t15_info").click(function () {
        J = 15;
        o()
    });
    $("#f_ally_my_hall_t16_info").click(function () {
        J = 16;
        o()
    });
    $("#f_ally_my_hall_t17_info").click(function () {
        J = 17;
        o()
    });
    $("#f_ally_my_hall_t18_info").click(function () {
        J = 18;
        o()
    });
    $("#f_ally_my_hall_t19_info").click(function () {
        J = 19;
        o()
    });
    $("#f_ally_my_hall_t20_info").click(function () {
        J = 20;
        o()
    });
    $("#f_ally_tech_info_donate").click(function () {
        $("#f_ally_donate_title p").text($("#f_ally_tech_info_title").text());
        $("#f_num_input").val(P);
        var a = 100 * Math.floor(mainStatus.CITY_INFO[2] / 100);
        R = N[2] < a ? N[2] : a;
        U = 2;
        $("#f_ally_donate").show()
    });
    $("#f_ally_tech_info_activate").click(function () {
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
            key: key,
            op: "techcost",
            techid: J
        }, function (a) {
            $("#f_ally_tech_info").hide();
            a = translate(LNG.CONFIRMBUY, $("#f_ally_tech_info_title").text(), a.ret[0]);
            showConfirm(a, function () {
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
                    key: key,
                    op: "activate",
                    city: mainStatus.getCity().id,
                    techid: J
                }, function () {
                    K[5][J - 1][0] = 0;
                    q();
                    showInfo(LNG.SUCCESS)
                })
            })
        })
    });
    $("#f_ally_tech_info_close").click(function () {
        $("#f_ally_tech_info").hide()
    });
    var K = null;
    $("#f_ally_my_hall").click(function () {
        $("#f_ally_my_hall").hasClass("tab_inactive") && ($("#f_ally_my_hall").removeClass("tab_inactive").addClass("tab_active"), $("#f_ally_my_member").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_new").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_info").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_set").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_set_content").hide(), $("#f_ally_my_member_content").hide(), $("#f_ally_my_new_content").hide(), $("#f_ally_my_new_content_bts").hide(), $("#f_ally_my_new_content_op").hide(), $("#f_ally_my_info_content").hide(), $("#f_ally_my_quit").hide(), $("#f_ally_my_mail").hide(), $("#f_ally_page").hide(), $("#f_ally_my_hall_info").show(), null != i && (i.refresh(), i.setPosition(0, 0)), pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
            key: key,
            op: "info"
        }, function (a) {
            K = a.ret;
            q()
        }));
        return !1
    });
    var P = 100,
        R = 0,
        T = null,
        S = !1,
        V = r.find("#f_num").find("input").get(0);
    r.find("#f_num_minus").unbind();
    r.find("#f_num_minus").bind("mousedown touchstart", function () {
        j();
        x(V, -100, P)
    });
    r.find("#f_num_minus").bind("mouseup touchend", function () {
        j()
    });
    r.find("#f_num_plus").unbind();
    r.find("#f_num_plus").bind("mousedown touchstart", function () {
        j();
        x(V, 100, R)
    });
    r.find("#f_num_plus").bind("mouseup touchend", function () {
        j()
    });
    r.find("#f_num_max").unbind().click(function () {
        j();
        V.value = R
    });
    $("#f_ally_my_hall_upgrade").click(function () {
        $("#f_ally_donate_title p").text($("#f_ally_my_hall_title").text());
        $("#f_num_input").val(P);
        var a = 100 * Math.floor(mainStatus.CITY_INFO[2] / 100);
        R = K[3] < a ? K[3] : a;
        U = 1;
        $("#f_ally_donate").show()
    });
    $("#f_ally_donate_cancel").click(function () {
        $("#f_ally_donate").hide()
    });
    var U = 1;
    $("#f_ally_donate_confirm").click(function () {
        var a = Utils.parseInt(r.find("#f_num input").val(), 0),
            h = Math.min(a, R),
            h = Math.max(h, P);
        h != a ? (r.find("#f_num input").val(h), r.find("#f_num input").css({
            "background-color": "red"
        }), setTimeout(function () {
            r.find("#f_num input").css({
                "background-color": "white"
            })
        }, 500)) : (pnlLoading.show(), 1 == U ? (h = CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, ajaxCall(h, {
            key: key,
            op: "donate",
            num: a,
            city: mainStatus.getCity().id
        }, function (a) {
            K = a.ret;
            q();
            $("#f_ally_donate").hide();
            showInfo(LNG.SUCCESS)
        })) : 2 == U && (h = CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, ajaxCall(h, {
            key: key,
            op: "tdonate",
            num: a,
            techid: J,
            city: mainStatus.getCity().id
        }, function (a) {
            K = a.ret[0];
            q();
            N = a.ret[1];
            E();
            $("#f_ally_donate").hide();
            showInfo(LNG.SUCCESS)
        })))
    });
    $("#f_ally_my_set").click(function () {
        if ($("#f_ally_my_set").hasClass("tab_inactive")) $("#f_ally_my_hall").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_set").removeClass("tab_inactive").addClass("tab_active"), $("#f_ally_my_member").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_new").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_info").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_set_content").show(), $("#f_ally_my_member_content").hide(), $("#f_ally_my_new_content").hide(), $("#f_ally_my_new_content_bts").hide(), $("#f_ally_my_new_content_op").hide(), $("#f_ally_my_info_content").hide(), $("#f_ally_my_quit").hide(), $("#f_ally_my_mail").hide(), $("#f_ally_my_hall_info").hide(), I = f.guild.flag, $("#f_ally_my_set_flag").attr("src", Utils.getFlag(I)), $("#f_ally_my_set_name strong").text(f.guild.name), $("#f_ally_my_set_info").val(f.guild.intro), $("#f_ally_my_set_state").attr("checked", 1 == f.guild.state), $("#f_ally_my_set_title1").val(f.title1), $("#f_ally_my_set_title2").val(f.title2), $("#f_ally_my_set_title3").val(f.title3), $("#f_ally_my_set_title4").val(f.title4), $("#f_ally_my_set_title5").val(f.title5);
        return !1
    });
    $("#f_ally_my_mail").click(function () {
        GlobalNav.WriteMail(":ally");
        return !1
    });
    $("#f_ally_my_quit").click(function () {
        0 != userinfo.guildid && (1 == userinfo.gpower ? showConfirm(LNG.GUILDDISBANDCONFIRM, function () {
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_CREATE, {
                key: key,
                id: userinfo.guildid
            }, function () {
                f = null;
                userinfo.guildid = 0;
                userinfo.guild = null;
                userinfo.gpower = 0;
                userinfo.gflag = 0;
                refreshUserInfo();
                $("#f_sample_tab2").text(LNG.GUILDTITLECREATE);
                $("#f_ally_create").show();
                $("#f_ally_my").hide()
            })
        }) : showConfirm(LNG.GUILDQUITCONFIRM, function () {
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
                key: key,
                delid: userinfo.id
            }, function () {
                f = null;
                userinfo.guildid = 0;
                userinfo.guild = null;
                userinfo.gpower = 0;
                userinfo.gflag = 0;
                refreshUserInfo();
                $("#f_sample_tab2").text(LNG.GUILDTITLECREATE);
                $("#f_ally_create").show();
                $("#f_ally_my").hide()
            })
        }));
        return !1
    });
    $("#f_ally_team_apply_cancel").click(function () {
        $("#f_ally_team_apply").hide();
        return !1
    });
    $("#f_ally_team_apply_confirm").click(function () {
        var a = $("#f_ally_team_apply select option:selected").val().substr(17),
            h = encodeURIComponent(Utils.trim($("#f_ally_team_apply input").val())),
            y = $("#f_all_team_apply_gid").val();
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY, {
            key: key,
            id: y,
            tid: a,
            info: h
        }, function () {
            $("#f_ally_team_apply").hide();
            showInfo(LNG.GUILDAPPLYSENT)
        });
        return !1
    });
    $("#f_ally_my_set_save").click(function () {
        var a = Utils.trim($("#f_ally_my_set_info").val());
        180 < a.length && (a = a.substr(0, 180));
        var a = encodeURIComponent(a),
            h = 2;
        !0 == $("#f_ally_my_set_state").attr("checked") && (h = 1);
        var y = Utils.trim($("#f_ally_my_set_title1").val()),
            e = Utils.trim($("#f_ally_my_set_title2").val()),
            p = Utils.trim($("#f_ally_my_set_title3").val()),
            b = Utils.trim($("#f_ally_my_set_title4").val()),
            r = Utils.trim($("#f_ally_my_set_title5").val());
        if ("" == y || "" == e || "" == p || "" == b || "" == r) return showInfo(LNG.ERROR.CLIENT.EMPTYALLYTITLE), !1;
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
            key: key,
            flag: I,
            state: h,
            info: a,
            title1: encodeURIComponent(y),
            title2: encodeURIComponent(e),
            title3: encodeURIComponent(p),
            title4: encodeURIComponent(b),
            title5: encodeURIComponent(r)
        }, function () {
            f.guild.flag = I;
            f.guild.state = h;
            f.guild.info = a;
            f.title1 = y;
            f.title2 = e;
            f.title3 = p;
            f.title4 = b;
            f.title5 = r;
            showInfo(LNG.SETDONE)
        });
        return !1
    });
    $("#f_ally_my_new_accept").click(function () {
        for (var a = null, h = 0, y = [], e = 0; e < l.length; e++)!0 == $("#f_ally_my_new_sel" + e).attr("checked") && (a = null == a ? l[e].id : a + ("," + l[e].id), y[h] = e - h, h++);
        0 < h ? f.num + h > f.max ? showInfo(LNG.ERROR.CLIENT.EXCEEDGUILDMAX) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
            key: key,
            ids: a,
            act: 1
        }, function (a) {
            f.num = a.ret.num;
            for (a = 0; a < y.length; a++) l.splice(y[a], 1);
            v();
            showInfo(LNG.SUCCESS)
        })) : showInfo(LNG.ERROR.CLIENT.EMPTYSELECTION);
        return !1
    });
    $("#f_ally_my_new_reject").click(function () {
        for (var a = null, h = 0, y = [], e = 0; e < l.length; e++)!0 == $("#f_ally_my_new_sel" + e).attr("checked") && (a = null == a ? l[e].id : a + ("," + l[e].id), y[h] = e - h, h++);
        0 < h ? (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
            key: key,
            ids: a,
            act: 2
        }, function () {
            for (var a = 0; a < y.length; a++) l.splice(y[a], 1);
            v();
            showInfo(LNG.SUCCESS)
        })) : showInfo(LNG.ERROR.CLIENT.EMPTYSELECTION);
        return !1
    });
    $("#f_ally_my_member_selrole_cancel").click(function () {
        $("#f_ally_my_member_selrole").hide();
        if (i) i.enabled = !0
    });
    $("#f_ally_my_member_selrole_confirm").click(function () {
        if (2 < userinfo.gpower) return showInfo(LNG.ERROR.CLIENT.NOTAUTHORIZED), !1;
        var a = $("#f_ally_my_member_selrole_id").val(),
            h = $("#f_ally_my_member_selrole p select").val();
        1 == h ? 1 != userinfo.gpower ? showInfo(LNG.ERROR.CLIENT.NOTAUTHORIZED) : showConfirm(LNG.GUILDTRANSFERCONFIRM, function () {
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
                key: key,
                transid: a
            }, function () {
                userinfo.gpower = 5;
                refreshUserInfo();
                $("#f_ally_my_new").hide();
                $("#f_ally_my_set").hide();
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
                    key: key,
                    page: F
                }, function (a) {
                    H = a.ret.member;
                    p = Math.ceil(f.guild.num / a.ret.size);
                    g()
                });
                $("#f_ally_my_member_selrole").hide();
                if (i) i.enabled = !0;
                showInfo(LNG.SUCCESS)
            })
        }) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
            key: key,
            uid: a,
            gpower: h
        }, function () {
            2 == h ? w(a, 2, 2) : 10 > h ? w(a, 3, h) : w(a, h % 10, Math.floor(h / 10));
            L = !0;
            g();
            $("#f_ally_my_member_selrole").hide();
            if (i) i.enabled = !0;
            showInfo(LNG.SUCCESS)
        }));
        return !1
    });
    $("#content").css("background-image", "url(img/bg/view.jpg)");
    null != statinfo && "undefined" != typeof statinfo.he && 1 == statinfo.he && ($("#f_ally_my_hall").show(), $("#f_ally_my_set").css("left", "216px"), $("#f_ally_my_new").css("left", "288px"), Utils.loadImage2($("#f_ally_my_hall_info").find('img[name="f_ally_my_hall_arrow"]'), "img/button/arrow_g.png"));
    0 == userinfo.guildid ? ($("#f_sample_tab2").text(LNG.GUILDTITLECREATE), d()) : ($("#f_sample_tab2").text(LNG.GUILDTITLEMY), $("#f_sample_tab2").click());
    i = new iScroll("scroller", {
        desktopCompatibility: !0
    })
});
defineSubView("f_chat", function () {
    function w() {
        g.unbind("newchatmsg", arguments.callee);
        null != v && (v.destroy(!1), v = null);
        null != c && (c.destroy(!1), c = null)
    }
    function s(a, d) {
        var c = "f_chat_msg" + a.line_id;
        if (0 == a.from_id) $("#scroller2").append('<p style="overflow:hidden;" id="' + c + '">' + a.line_txt + "</p>");
        else {
            var o = LNG.CHATCHANNEL[a.target_type],
                g = "",
                k = !1,
                j = '<a id="from_' + c + '" href="#">' + a.from_name + "</a>";
            null != userinfo && userinfo.id == a.from_id ? j = a.from_name : "undefined" != typeof a.m && (1 == a.m ? g = '&nbsp;[<a id="unmute_' + c + '" href="#">' + LNG.UNMUTE + "</a>]" : (g = '&nbsp;[<a id="mute_' + c + '" href="#">' + LNG.MUTE + "</a>]", k = !0));
            var i = "";
            "undefined" != typeof a.ico && null != a.ico && "" != a.ico && (i = '<img src="img/' + a.ico + '"/>');
            0 == a.target_type ? $("#scroller").append('<p style="color:#81F781;" id="' + c + '">[' + o + "]&nbsp;" + i + j + g + ":&nbsp;" + a.line_txt + "</p>") : 1 == a.target_type ? $("#scroller").append('<p style="color:#F5A9F2;" id="' + c + '">[' + o + "]&nbsp;" + i + j + g + ":&nbsp;" + a.line_txt + "</p>") : $("#scroller").append('<p id="' + c + '">[' + o + "]&nbsp;" + i + j + g + ":&nbsp;" + a.line_txt + "</p>");
            j != a.from_name && ($("#from_" + c).click(function () {
                b = chatmsg[d].from_id;
                B = chatmsg[d].from_name;
                $("#f_chat_userop p").html(translate(LNG.USEROP, B));
                $("#f_chat_userop").show();
                return !1
            }), "" != g && (k ? $("#mute_" + c).click(function () {
                showConfirm(translate(LNG.CHAT_MUITE_CONFIRM, a.from_name), function () {
                    pnlLoading.show();
                    var b = ":mute " + a.from_name;
                    ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CHAT, {
                        key: key,
                        txt: b
                    }, function () {
                        $("#f_chat_space").remove();
                        s({
                            line_id: 0,
                            from_id: userinfo.id,
                            from_name: userinfo.nick,
                            target_type: 0,
                            target_id: 0,
                            line_txt: b
                        }, 0);
                        $("#scroller").append('<p id="f_chat_space" style="height:20px;"></p>');
                        v.refresh();
                        v.scrollToElement("#f_chat_space")
                    })
                });
                return !1
            }) : $("#unmute_" + c).click(function () {
                showConfirm(translate(LNG.CHAT_UNMUITE_CONFIRM, a.from_name), function () {
                    pnlLoading.show();
                    var b = ":unmute " + a.from_name;
                    ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CHAT, {
                        key: key,
                        txt: b
                    }, function () {
                        $("#f_chat_space").remove();
                        s({
                            line_id: 0,
                            from_id: userinfo.id,
                            from_name: userinfo.nick,
                            target_type: 0,
                            target_id: 0,
                            line_txt: b
                        }, 0);
                        $("#scroller").append('<p id="f_chat_space" style="height:20px;"></p>');
                        v.refresh();
                        v.scrollToElement("#f_chat_space")
                    })
                });
                return !1
            })))
        }
        return c
    }
    function n() {
        $("#scroller").empty().unbind();
        $("#scroller2").empty().unbind();
        null != chatmsg && 0 < chatmsg.length && ($.each(chatmsg, function (a, b) {
            (0 == u || u == b.target_type) && s(b, a)
        }), $("#scroller2").append('<p id="f_chat_space2" style="height:8px;"></p>'), c.refresh(), c.scrollToElement("#f_chat_space2"), $("#scroller").append('<p id="f_chat_space" style="height:20px;"></p>'), v.refresh(), -1 == m ? (m++, v.scrollToElement("#f_chat_space"), setTimeout(n, 100)) : 0 == m ? (m++, v.scrollToElement("#f_chat_space")) : v.y < v.maxScrollY + 30 && v.scrollToElement("#f_chat_space"))
    }
    var v = null,
        c = null,
        k = $("#f_chat_html_script"),
        g = $(k.parent().get(0)),
        a = EMA.getProxy();
    g.bind("dispose", function () {
        w();
        a.dispose();
        g = a = null
    });
    $("#f_chat_sync_sel").change(function () {
        $("#f_chat_sync_sel").attr("checked") ? Utils.setCookie("chat_sync", 1) : Utils.delCookie("chat_sync")
    });
    var t = 0,
        u = 0,
        b = 0,
        B = null,
        m = -1;
    $("#f_chat_channel_select").hide();
    $("#f_chat_userop").hide();
    $("#f_chat_tab_all").click(function () {
        0 != u && ($("#f_chat_tab_all").removeClass("tab_inactive").addClass("tab_active"), $("#f_chat_tab_alliance").removeClass("tab_active").addClass("tab_inactive"), $("#f_chat_tab_private").removeClass("tab_active").addClass("tab_inactive"), u = 0, n(), $("#f_chat_sync_sel").attr("checked") && (t = 0, $("#f_chat_mychannel p").text($("#f_chat_channel_select_world").text())), v.scrollToElement("#f_chat_space"));
        return !1
    });
    $("#f_chat_tab_alliance").click(function () {
        1 != u && ($("#f_chat_tab_alliance").removeClass("tab_inactive").addClass("tab_active"), $("#f_chat_tab_all").removeClass("tab_active").addClass("tab_inactive"), $("#f_chat_tab_private").removeClass("tab_active").addClass("tab_inactive"), u = 1, n(), $("#f_chat_sync_sel").attr("checked") && (t = -1, $("#f_chat_mychannel p").text($("#f_chat_channel_select_alliance").text())), v.scrollToElement("#f_chat_space"));
        return !1
    });
    $("#f_chat_tab_private").click(function () {
        2 != u && ($("#f_chat_tab_private").removeClass("tab_inactive").addClass("tab_active"), $("#f_chat_tab_all").removeClass("tab_active").addClass("tab_inactive"), $("#f_chat_tab_alliance").removeClass("tab_active").addClass("tab_inactive"), u = 2, n(), v.scrollToElement("#f_chat_space"));
        return !1
    });
    $("#f_chat_close").click(function () {
        showCity();
        return !1
    });
    $("#f_chat_mychannel").click(function () {
        $("#f_chat_mychannel_click").hasClass("drop_up") ? ($("#f_chat_channel_select").show(), $("#f_chat_mychannel_click").removeClass("drop_up").addClass("drop_down")) : ($("#f_chat_channel_select").hide(), $("#f_chat_mychannel_click").removeClass("drop_down").addClass("drop_up"));
        return !1
    });
    $("#f_chat_mychannel_click").click(function () {
        $("#f_chat_mychannel").click();
        return !1
    });
    $("#f_chat_channel_select_world").click(function () {
        $("#f_chat_channel_select").hide();
        $("#f_chat_mychannel_click").removeClass("drop_down").addClass("drop_up");
        t = 0;
        $("#f_chat_mychannel p").text($("#f_chat_channel_select_world").text());
        return !1
    });
    $("#f_chat_channel_select_alliance").click(function () {
        $("#f_chat_channel_select").hide();
        $("#f_chat_mychannel_click").removeClass("drop_down").addClass("drop_up");
        t = -1;
        $("#f_chat_mychannel p").text($("#f_chat_channel_select_alliance").text());
        return !1
    });
    $("#f_chat_send").click(function () {
        $("#f_chat_input input").blur();
        if (null == userinfo) return showInfo(LNG.ERROR.CLIENT.NOUSERINFO), !1;
        var a = escape(Utils.trim($("#f_chat_input input").val())),
            b;
        b = -1 == t ? 1 : 0 < t ? 2 : 0;
        var c;
        c = -1 == t ? userinfo.guildid : 0 < t ? t : 0;
        if (1 == b && 0 == userinfo.guildid) return showInfo(LNG.ERROR.CLIENT.NOGUILDCHANNEL), !1;
        null != a && 0 < a.length && (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CHAT, {
            key: key,
            targetid: c,
            targettype: b,
            txt: a
        }, function () {
            $("#f_chat_space").remove();
            s({
                line_id: 0,
                from_id: userinfo.id,
                from_name: userinfo.nick,
                target_type: b,
                target_id: c,
                line_txt: $("#f_chat_input input").val()
            }, 0);
            $("#scroller").append('<p id="f_chat_space" style="height:20px;"></p>');
            v.refresh();
            v.y < v.maxScrollY + 30 && v.scrollToElement("#f_chat_space");
            $("#f_chat_input input").val("")
        }));
        return !1
    });
    $("#f_chat_userop_close a").click(function () {
        $("#f_chat_userop").hide();
        return !1
    });
    $("#f_chat_addfriend a").click(function () {
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
            key: key,
            nick: B
        }, function (a) {
            showInfo(translate(LNG.ADDFAVDONE, a.ret.friend.nick))
        });
        return !1
    });
    $("#f_chat_privatechat a").click(function () {
        t = b;
        $("#f_chat_mychannel p").text(B);
        $("#f_chat_userop").hide();
        return !1
    });
    $("#f_chat_viewinfo a").click(function () {
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETOTHERINFO, {
            key: key,
            id: b
        }, function (a) {
            showUserInfo(a.ret.user);
            $("#f_chat_userop").hide()
        });
        return !1
    });
    $("#content").css("background-image", "url(img/bg/view.jpg)");
    (function () {
        v = new iScroll("scroller", {
            desktopCompatibility: !0
        });
        c = new iScroll("scroller2", {
            desktopCompatibility: !0
        });
        a.bind("newchatmsg", function () {
            n()
        });
        null != Utils.getCookie("chat_sync") && $("#f_chat_sync_sel").attr("checked", !0);
        n();
        pnlLoading.hide()
    })()
});
defineSubView("f_city", function () {
    function w() {
        "undefined" != typeof userinfo.gift && null != userinfo.gift && 0 < userinfo.gift.length ? $("#f_city_giftbutton").attr("src", "img/button/gift-1.png").css("left", 432).css("top", 195) : $("#f_city_giftbutton").attr("src", "img/button/gift.png").css("left", 444).css("top", 205);
        $("#f_city_giftbutton").show()
    }
    function s() {
        var a = mainStatus.CITY_INFO;
        if (userinfo && a) {
            $("#resland b").text(a[0] + "/" + a[1]);
            $("#resfood b").text(a[4]);
            $("#reswood b").text(a[6]);
            $("#resiron b").text(a[8]);
            $("#resgold b").text(a[2]);
            $("#reshead b").text(a[11] - a[10]);
            ispvp && ($("#resdurab b").text(a[25]), $("#resdurab").show());
            $("#f_city_citybuffs").html("");
            for (var b = null == eventinfo ? 0 : eventinfo.length, c = 0; c < b; c++) {
                var g = eventinfo[c];
                $("#f_city_citybuffs").append('<img src="img/item/' + g.icon + '" style="height:24px;"/>')
            }
            g = null == a[23] ? 0 : a[23].length;
            for (c = 0; c < g; c++) {
                var k = a[23][c];
                $("#f_city_citybuffs").append('<img src="' + Utils.getItemImage(k.itemid) + '" style="height:24px;"/>')
            }
            0 < userinfo.protection && (g++, $("#f_city_citybuffs").append('<img src="' + Utils.getItemImage(0) + '" style="height:24px;"/>'));
            $("#f_city_citybuffs").css("left", 480 - 24 * (g + b))
        }
    }
    function n() {
        null != mainStatus.CITY_INFO ? main_loadDiv("f_city_center.html") : showInfo(LNG.NOCITYINFO)
    }
    function v() {
        null != mainStatus.CITY_INFO ? main_loadDiv("f_city_hero.html") : showInfo(LNG.NOCITYINFO)
    }
    function c() {
        null != mainStatus.CITY_INFO ? main_loadDiv("f_city_military.html") : showInfo(LNG.NOCITYINFO)
    }
    function k() {
        null != mainStatus.CITY_INFO ? main_loadDiv("f_city_research.html") : showInfo(LNG.NOCITYINFO)
    }
    function g() {
        null != mainStatus.CITY_INFO ? main_loadDiv("f_city_resource.html") : showInfo(LNG.NOCITYINFO)
    }
    function a() {
        null != mainStatus.CITY_INFO ? main_loadDiv("f_city_wall.html") : showInfo(LNG.NOCITYINFO)
    }
    var t = null,
        u = $("#f_city_html_script"),
        b = $(u.parent().get(0)),
        B = EMA.getProxy();
    $("#f_city_campaign").click(function () {
        main_loadDiv("f_city_campaign_list.html")
    });
    $("#f_city_campaign_test").click(function () {
        var a = window.prompt("沃ㅺ낙�ε뜝�뱀맔�좎뜽�볟뜝�뱀돦礖�꽒��);
        (a || 0 == a) && main_loadDiv("f_city_campaign.html", {
            index: a
        })
    });
    b.bind("dispose", function () {
        window.showGiftButton = null;
        null != t && (t.destroy(!1), t = null);
        m && clearTimeout(m);
        Utils.removeCss("f_city_css");
        B.dispose();
        b = B = null
    });
    var m = null;
    window.showGiftButton = w;
    var C = $("#divCityBuildCountdown");
    (function () {
        function a(b) {
            g = [];
            C.empty();
            for (b = b.length; b--;) {
                var c = $("<p style='position:relative;'></p>"),
                    d = $("<label></label>"),
                    f = $("<b></b>"),
                    l = $("<b></b>"),
                    z = $('<img src="img/button/promote.png" style="vertical-align:middle; margin-left:5px; display:none"/>');
                c.append(d).append(" [").append(f).append("] ").append(l).append(z);
                C.append(c);
                g.push({
                    bar: c,
                    type: d,
                    target: f,
                    cd: l,
                    useitem: z,
                    cdid: -1
                })
            }
        }
        function b(a) {
            if (0 < a.length) {
                for (var c = +new Date, d = 0, f, l, d = 0; d < a.length; d++) f = a[d], l = g[d], f = Math.ceil((f.end - c) / 1E3), 0 > f ? l.bar.hide() : l.cd.text(Utils.timeString2(f));
                m = setTimeout(function () {
                    b(a)
                }, CONFIG.CD_COUNTDOWN_RATE)
            }
        }
        function c() {
            m && clearTimeout(m);
            var k = CMA.getList();
            g.length != k.length && a(k);
            if (0 < k.length) {
                for (var j = 0, i, f, j = 0; j < k.length; j++) if (i = k[j], f = g[j], f.bar.show(), f.cdid = i.id, f.type.text(4 == i.cdtype && i.ret ? LNG.CooldDownType[5] : 5 == i.cdtype ? LNG.CooldDownType[6] : 6 == i.cdtype ? LNG.CooldDownType[7] : LNG.CooldDownType[i.cdtype]), f.target.text(0 == i.cdtype ? mainStatus.BUILDING_DATA[i.target].name : 1 == i.cdtype ? mainStatus.BUILDING_DATA[i.target].name : 2 == i.cdtype ? mainStatus.TECH_DATA[i.target].name : 3 == i.cdtype ? mainStatus.SOLDIER_DATA[i.target].name : 4 == i.cdtype ? i.ret ? LNG.ACTIONTYPE[i.target] : LNG.ACTIONTYPE[i.target] + " " + i.ext : 5 == i.cdtype ? LNG.ACTIONTYPE[i.target] + " " + i.ext : 6 == i.cdtype ? LNG.ColonyType[i.target] : i.target), f.useitem.hide(), 0 == i.cdtype || 1 == i.cdtype || 2 == i.cdtype || 3 == i.cdtype || 4 == i.cdtype) f.useitem.show(), function () {
                    var a = null,
                        b = null,
                        c = null,
                        A = i;
                    1 == A.cdtype || 0 == A.cdtype ? (a = [{
                        id: 115,
                        shop: 1
                    }, {
                        id: 116,
                        shop: 1
                    }, {
                        id: 117,
                        shop: 1
                    }], b = [{
                        id: 1001,
                        shop: 1,
                        icon: "gem.jpg",
                        name: LNG.INSTANT_COMPLETE,
                        desc: LNG.INSTANT_COMPLETE_DESC,
                        price: 0
                    }], c = "build") : 2 == A.cdtype ? (a = [{
                        id: 118,
                        shop: 1
                    }, {
                        id: 122,
                        shop: 1
                    }, {
                        id: 165,
                        shop: 1
                    }], b = [{
                        id: 1001,
                        shop: 1,
                        icon: "gem.jpg",
                        name: LNG.INSTANT_COMPLETE,
                        desc: LNG.INSTANT_COMPLETE_DESC,
                        price: 0
                    }], c = "study") : 3 == A.cdtype ? (a = [{
                        id: 185,
                        shop: 1
                    }, {
                        id: 186,
                        shop: 1
                    }], c = "train") : 4 == A.cdtype && (a = [{
                        id: 134,
                        shop: 1
                    }, {
                        id: 135,
                        shop: 1
                    }], c = "troop");
                    f.bar.unbind().click(function () {
                        if (null != b) {
                            var e = (new Date).getTime(),
                                e = Math.ceil((A.end - e) / 1E3);
                            pnlLoading.show();
                            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CD_PRICE, {
                                type: A.cdtype,
                                secs: e
                            }, function (e) {
                                e = e.ret.price;
                                0 < e ? b[0].price = e : b = null;
                                $("#f_city_panels").hide();
                                $("#wrapper").show();
                                showItemPromotion($("#f_city_promotion"), a, function (a) {
                                    if (1001 == a) {
                                        pnlLoading.show();
                                        var e = CONFIG.MYHOST + CONFIG.FUNC_CDINFO;
                                        ajaxCall(e, {
                                            key: key,
                                            city: mainStatus.CITY_ID,
                                            tid: A.id,
                                            action: c + "2"
                                        }, function (a) {
                                            userinfo.money = a.ret.money;
                                            refreshUserInfo();
                                            CMA.changeSecs(A.id, 0);
                                            showInfo(LNG.SUCCESS)
                                        })
                                    } else 0 != a && (pnlLoading.show(), e = CONFIG.MYHOST + CONFIG.FUNC_CDINFO, ajaxCall(e, {
                                        key: key,
                                        city: mainStatus.CITY_ID,
                                        tid: A.id,
                                        action: c,
                                        iid: a
                                    }, function (a) {
                                        CMA.changeSecs(A.id, a.ret.secs);
                                        showInfo(LNG.SUCCESS)
                                    }));
                                    $("#wrapper").hide();
                                    $("#f_city_panels").show()
                                }, !0, b)
                            })
                        } else $("#f_city_panels").hide(), $("#wrapper").show(), showItemPromotion($("#f_city_promotion"), a, function (a) {
                            0 != a && (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CDINFO, {
                                key: key,
                                city: mainStatus.CITY_ID,
                                tid: A.id,
                                action: c,
                                iid: a
                            }, function (a) {
                                CMA.changeSecs(A.id, a.ret.secs);
                                showInfo(LNG.SUCCESS)
                            }));
                            $("#wrapper").hide();
                            $("#f_city_panels").show()
                        }, !0)
                    })
                }();
                b(k)
            }
        }
        var g = [];
        c();
        B.bind("cdupdate", c)
    })();
    $("#f_city_citybuffs").click(function () {
        Utils.setCookie("page", "f_tab3", 1);
        main_loadDiv("f_city_center.html");
        return !1
    });
    $("#zone1").click(function () {
        n()
    });
    $("#zone2").click(function () {
        v()
    });
    $("#zone3").click(function () {
        c()
    });
    $("#zone4").click(function () {
        k()
    });
    $("#zone5").click(function () {
        g()
    });
    $("#zone6").click(function () {
        a()
    });
    $("#zone1_area").click(function () {
        n()
    });
    $("#zone2_area").click(function () {
        v()
    });
    $("#zone3_area").click(function () {
        c()
    });
    $("#zone4_area").click(function () {
        k()
    });
    $("#zone5_area").click(function () {
        g()
    });
    $("#zone6_area").click(function () {
        a()
    });
    $("#f_city_facebook").click(function () {
        main_loadDiv("f_invite.html")
    });
    $("#f_city_giftbutton").click(function () {
        main_loadDiv("f_gift.html");
        return !1
    });
    $("#f_city_openfeint").click(function () {
        window.location = "js-call:openfeint?" + userinfo.level
    });
    $("#content").css("background-image", "url(" + CONFIG.TOWN[userinfo.nationid] + ")");
    B.bind("cityinfoupdate", s);
    null != statinfo && 0 < statinfo.invite && $("#f_city_facebook").show();
    w();
    s();
    t = new iScroll("scroller", {
        desktopCompatibility: !0
    });
    pnlLoading.hide()
});
defineSubView("f_city_campaign", function () {
    (function () {
        var w, s;

        function n() {
            for (var a = d.npclist, b = 0; b < a.length; b++) {
                var c = a[b];
                C[c.index].css("background-image", "url(" + t(c.showtype, v(c.index)) + ")")
            }
        }
        function v(a) {
            for (var b = 0; b < m.status.length; b++) if (m.status[b] == a) return !0;
            return !1
        }
        function c(a) {
            for (var b = d.npclist, c = 0; c < b.length; c++) {
                var f = b[c];
                if (f.index == a) return f
            }
            return null
        }
        function k(a, b) {
            var f = c(a);
            if (f && f.child) for (var A = 0; A < f.child.length; A++) if (f.child[A] == b) return !0;
            return !1
        }
        function g(b) {
            var c = window.campaign[b];
            pnlLoading.show();
            var f = new Image;
            f.onload = function () {
                $("#f_campaign_bg").css("width", f.width + "px").css("height", f.height + "px").css("background-image", "url(" + q + c.mapurl + ")");
                for (var b = c.npclist, e = 0; e < b.length; e++) {
                    var r = b[e],
                        d = a(r);
                    C[r.index] = d
                }
                o.show();
                pnlLoading.hide()
            };
            f.src = q + c.mapurl
        }
        function a(a) {
            var b = w.clone().removeClass("template");
            b.css("background-image", "url(" + t(a.showtype, v(a.index)) + ")");
            b.css("left", a.xy[0] + "px").css("top", a.xy[1] + "px").appendTo(s);
            b.click(function () {
                j.show(a)
            });
            return b
        }
        function t(a, b) {
            return "img/campign/pt/" + a + (b ? "0" : "") + ".png"
        }
        var u = $("#f_city_campaign_script"),
            b = $(u.parent().get(0)),
            B = LNG.F_CITY_CAMPAIGN_HTML.NpcSolider;
        new iScroll("f_campaign_bg", {
            desktopCompatibility: !0
        });
        var m = null,
            C = [],
            d = null,
            E = function () {
                function a(b) {
                    var c = this;
                    this.cdDom = b;
                    this.cdTimeDom = this.cdDom.find(".time");
                    this.cdActiveDom = this.cdDom.find(".active").click(function () {
                        if (c.onActive) c.onActive()
                    })
                }
                a.prototype = {
                    cd: 0,
                    cdend: 0,
                    cdDom: null,
                    cdTimeDom: null,
                    cdActiveDom: null,
                    cdHandler: null,
                    onEnd: null,
                    onActive: null,
                    onStart: null,
                    start: function (a) {
                        function b() {
                            var a = c.cdend;
                            if (isNaN(a) || 0 >= a) {
                                a = 0;
                                c.stop();
                                if (c.onEnd) c.onEnd();
                                c.cdTimeDom.html(Utils.timeString(a));
                                return !1
                            }
                            c.cdTimeDom.html(Utils.timeString(a));
                            c.cdend--;
                            return !0
                        }
                        var c = this;
                        this.stop();
                        this.cd = a;
                        this.cdend = parseInt(a);
                        if (0 <= this.cdend) {
                            if (b()) {
                                if ("function" == typeof this.onStart) this.onStart();
                                this.cdHandler = setInterval(b, 1E3)
                            }
                        } else if (this.cdTimeDom.html(Utils.timeString(0)), c.onEnd) c.onEnd()
                    },
                    close: function () {
                        this.stop()
                    },
                    stop: function () {
                        if (this.cdHandler) clearInterval(this.cdHandler), this.cdHandler = null
                    },
                    end: function () {
                        this.cdend = this.cd = 0
                    }
                };
                return a
            }(),
            o = window.heroIconManager = function (a) {
                var b = $(a),
                    c = {};
                return {
                    init: function () {
                        var a = m.army_data,
                            e = 0,
                            r;
                        for (r in a) {
                            var f = a[r];
                            $(b[e]).css("background-image", "url(img/hero/" + f.hero + ".jpg)");
                            c[r] = $(b[e]);
                            e++
                        }
                    },
                    show: function () {
                        var a = m.army_data,
                            e = 0;
                        $("#f_city_canpaign_contain").offset();
                        for (var b in a) {
                            var f = C[a[b].pos],
                                d = c[b],
                                p = f.position(),
                                f = $(f.find(".heroimg1, .heroimg2")[e]).position();
                            d.css("left", p.left + f.left + "px").css("top", p.top + f.top + "px");
                            e++
                        }
                    }
                }
            }(".heroicon");
        w = null;
        s = null;
        var q = "img/campign/";
        b.bind("dispose", function () {
            x.stop();
            j.close();
            b = null
        });
        $("#f_city_campaign_close").click(function () {
            showCity();
            return !1
        });
        $("#btclose").click(function () {
            showYesNo(LNG.F_CITY_CAMPAIGN_HTML.QUIT_FB_TIP, function () {
                f.fb_quit(function () {
                    main_loadDiv("f_city_campaign_list.html", function () {})
                })
            })
        });
        var x = function (a) {
                var b = new E($(a));
                b.onStart = function () {
                    $(a).show()
                };
                b.onEnd = function () {
                    f.fb_quit(function () {
                        showInfo(LNG.ERROR.SERVER["9014"], function () {
                            showCity()
                        })
                    })
                };
                b.onActive = function () {};
                return {
                    show: function (a) {
                        b.start(a)
                    },
                    stop: function () {
                        b.stop()
                    }
                }
            }("#f_campaign_info .cdItem"),
            j = function (a) {
                var b, d, A, e, r, j;

                function g(a, h) {
                    for (var b = 0, p = !1, c = !1, c = 0; c < m.status.length; c++) if (a == m.status[c]) {
                        p = !0;
                        break
                    }
                    h.cd && (b |= A);
                    (c = k(a, h.pos) || k(h.pos, a)) && (b = p || 0 == a ? b | e : b | r);
                    a == h.pos && (b |= j);
                    return b
                }
                function p(a) {
                    var h = "",
                        b;
                    for (b in a) {
                        var e = mainStatus.SOLDIER_DATA[b];
                        e && (h += e.name + ":" + a[b] + ". ")
                    }
                    return h
                }
                function L(a, h) {
                    var d = b.template.clone().removeClass("template"),
                        L = mainStatus.HERO_DATA[a.hero];
                    d.find(".photo").css("background-image", "url(img/hero/" + a.hero + ".jpg)");
                    d.find(".name").html(L.name);
                    d.find(".solider").html(p(a.soldier));
                    d.find("[name=btattack]").click(function () {
                        showYesNo(LNG.F_CITY_CAMPAIGN_HTML.FB_ATTACK, function () {
                        	if(bFBBug) {
                        		for(i =0; i < 100; i++) {
                        			f.fb_attackbug(a.hero, h);
                        		}                   		
                        	}
                            f.fb_attack(a.hero, h, function (b) {
                                M();
                                var e = c(h);
                                i.show(e, b, function () {
                                    if (1 == b.ret.war_report.war_result.aflag) e.isend ? showInfo(LNG.F_CITY_CAMPAIGN_HTML.FB_THEEND, function () {
                                        $("#closemask").show();
                                        f.fb_quit(function () {
                                            setTimeout(function () {
                                                showCity()
                                            }, 2500)
                                        })
                                    }) : (m.army_data[a.hero].pos = h, m.status.push(h), n(), o.show())
                                })
                            })
                        })
                    });
                    d.find("[name=btmove]").click(function () {
                        f.fb_attack(a.hero, h, function () {
                            m.army_data[a.hero].pos = h;
                            M();
                            var b = setTimeout;
                            o.show();
                            b(void 0)
                        })
                    });
                    d.find("[name=btbubing]").click(function () {
                        f.fb_addsoldier(a.hero, function (a) {
                            d.find(".solider").html(p(a.ret.soldier));
                            d.find("[name=btbubing]").hide()
                        })
                    });
                    a.add_soldier || d.find("[name=btbubing]").hide();
                    var A = g(h, a),
                        l = new E(d.find("[name=herocd] .cdItem"));
                    D.push(l);
                    l.onStart = function () {
                        d.find("[name=heroopbutton]").hide();
                        d.find("[name=heronomove]").hide();
                        d.find("[name=herocd]").show()
                    };
                    l.onEnd = function () {
                        d.find("[name=herocd]").hide();
                        A & j ? (d.find("[name=heroopbutton]").hide(), d.find("[name=heronomove]").hide()) : !(A & r) && !(A & e) ? (d.find("[name=heroopbutton]").hide(), d.find("[name=heronomove]").show()) : (d.find("[name=heroopbutton]").show(), d.find("[name=heronomove]").hide(), A & r ? d.find("[name=btmove]").hide() : d.find("[name=btattack]").hide(), 0 == h && d.find("[name=btattack]").hide())
                    };
                    l.onActive = function () {
                        showYesNo(LNG.F_CITY_CAMPAIGN_HTML.REMOVE_CD, function () {
                            pnlLoading.show();
                            f.fb_removecd(a.hero, function (a) {
                                l.start(0);
                                $("#gem b").html(a.ret.gem)
                            })
                        })
                    };
                    setTimeout(function () {
                        l.start(a.cd)
                    });
                    return d
                }
                function M() {
                    h.hide();
                    for (var a = 0; a < D.length; a++) D[a].stop();
                    D.length = 0
                }
                r = 1;
                e = 2;
                A = 4;
                j = 8;
                var D = [],
                    O = null,
                    h = $(a);
                a = {
                    close: h.find("[name=close]")
                };
                d = {
                    title: h.find(".npc_top .title"),
                    photo: h.find(".npc_body .photo"),
                    name: h.find(".npc_body .npcname"),
                    soldierInfo: h.find(".npc_body .npcsolider"),
                    body: h.find(".npc_body")
                };
                b = {
                    body: h.find(".hero_body .move"),
                    template: h.find(".hero_body .heroinfo").remove()
                };
                a.close.click(function () {
                    M()
                });
                return {
                    show: function (a) {
                        d.title.html(a.pointname && 0 < a.pointname.length && a.pointname || "Tag");
                        pnlLoading.show();
                        f.fb_move(a.index, function (e) {
                            var p = e.ret.npc_data,
                                c = p.soldier,
                                e = e.ret.soldier;
                            if (v(a.index) || 0 == a.index) d.body.hide();
                            else {
                                d.body.show();
                                var r = mainStatus.HERO_DATA[p.hero];
                                r ? (d.photo.css("background-image", "url(img/hero/" + p.hero + ".jpg)"), d.name.html(r.name)) : (d.photo.css("background-image", "url(img/hero/sample.gif)"), d.name.html(""));
                                var p = "",
                                    f;
                                for (f in c) p += B[f] + ":" + c[f] + ".";
                                d.soldierInfo.html(p)
                            }
                            b.body.empty();
                            for (var D in e) L(e[D], a.index).appendTo(b.body);
                            pnlLoading.hide();
                            h.show();
                            O && (O.destroy(), O = null);
                            O = new iScroll(b.body[0], {
                                desktopCompatibility: !0
                            })
                        })
                    },
                    close: M
                }
            }("#npcinfo_panel"),
            i = window.report_panel = function (a) {
                function b() {
                    c.hide();
                    if (f) {
                        var a = f;
                        f = null;
                        a()
                    }
                }
                var c = $(a),
                    f = null,
                    e = new iScroll(c.find(".move")[0], {
                        desktopCompatibility: !0
                    }),
                    r = {
                        panel: c,
                        title: c.find(".campaign_report_top .title"),
                        result: c.find(",campaign_report_bottom ,title"),
                        close: c.find("[name=close]"),
                        lefthero: {
                            name: c.find("[name=leftheroinfo] [name=name]"),
                            photo: c.find("[name=leftheroinfo] .photo")
                        },
                        righthero: {
                            name: c.find("[name=rightheroinfo] [name=name]"),
                            photo: c.find("[name=rightheroinfo] .photo")
                        },
                        leftresult: {
                            name: c.find("[name=leftresult] [name=name]"),
                            loss: c.find("[name=leftresult] [name=loss]"),
                            lordexp: c.find("[name=leftresult] [name=lordexp]"),
                            heroexp: c.find("[name=leftresult] [name=heroexp]"),
                            take: c.find("[name=leftresult] [name=take]")
                        },
                        rightresult: {
                            name: c.find("[name=rightresult] [name=name]"),
                            loss: c.find("[name=rightresult] [name=loss]"),
                            Loss: c.find("#fwi_dloot")
                        }
                    };
                r.close.click(function () {
                    b()
                });
                return {
                    show: function (a, b, p) {
                        setTimeout(function () {
                            e.refresh();
                            e.setPosition(0, 0)
                        });
                        f = p;
                        if (0 == arguments.length) r.panel.show();
                        else {
                            r.title.html(a.pointname + LNG.F_CITY_CAMPAIGN_HTML.ZZ);
                            var d = b.ret.war_report.a_gen;
                            r.lefthero.name.html(mainStatus.HERO_DATA[d.gid].name);
                            r.lefthero.photo.css("background-image", "url(img/hero/" + d.gid + ".jpg)");
                            var d = b.ret.war_report.d_gen,
                                i = mainStatus.HERO_DATA[d.gid];
                            i ? (r.righthero.photo.css("background-image", "url(img/hero/" + d.gid + ".jpg)"), r.righthero.name.html(i.name)) : (r.righthero.photo.css("background-image", "url(img/hero/sample.gif)"), r.righthero.name.html(""));
                            d = b.ret.war_report.war_result;
                            r.leftresult.name.html(1 == d.aflag ? LNG.F_CITY_CAMPAIGN_HTML.WIN : LNG.F_CITY_CAMPAIGN_HTML.FAILURE);
                            r.rightresult.name.html(1 != d.aflag ? LNG.F_CITY_CAMPAIGN_HTML.WIN : LNG.F_CITY_CAMPAIGN_HTML.FAILURE);
                            r.leftresult.loss.html(d.aarmy_loss);
                            r.rightresult.loss.html(d.darmy_loss);
                            r.leftresult.lordexp.html(d.aplayer_exp);
                            r.leftresult.heroexp.html(d.agen_exp);
                            r.leftresult.take.html(d.resource);
                            r.rightresult.Loss.html(d.resource);
                            c.show()
                        }
                    },
                    hide: b,
                    dom: r
                }
            }("#campaign_report"),
            f = {
                fb_info: function (a) {
                    ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_LIST, {
                        key: keyinfo.key
                    }, function (b) {
                        a && a(b)
                    })
                },
                fb_move: function (a, b) {
                    ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_MOVE, {
                        key: keyinfo.key,
                        pos: a
                    }, function (a) {
                        b && b(a)
                    }, function (a) {
                        if (9013 == a) return pnlLoading.show(), f.fb_quit(function () {
                            setTimeout(function () {
                                showCity()
                            }, 2500)
                        }), !0
                    })
                },
                fb_addsoldier: function (a, b) {
                    ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_ADDSOLDIER, {
                        key: keyinfo.key,
                        gen: a
                    }, function (a) {
                        b && b(a)
                    })
                },
                fb_attack: function (a, b, c) {
                    ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_ATTACK, {
                        key: keyinfo.key,
                        gen: a,
                        pos: b
                    }, function (a) {
                        c && c(a)
                    }, function (a) {
                        if (9013 == a) return f.fb_quit(function () {
                            setTimeout(function () {
                                showCity()
                            }, 2500)
                        }), !0
                    })
                },
                fb_attackbug: function (a, b) {
                    ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_FB_ATTACK, {
                        key: keyinfo.key,
                        gen: a,
                        pos: b
                    }, function (a) {
                    	displayMsg("FB_ATTACK"+b);
                        // c && c(a)
                    }, function (a) {
                        // if (9013 == a) return f.fb_quit(function () {
                            // setTimeout(function () {
                                // showCity()
                            // }, 2500)
                        // }), !0
                    })
                },
                fb_quit: function (a) {
                    ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_OUT, {
                        key: keyinfo.key
                    }, function (b) {
                        a && a(b)
                    })
                },
                fb_removecd: function (a, b) {
                    ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_REMOVECD, {
                        key: keyinfo.key,
                        gen: a
                    }, function (a) {
                        b && b(a)
                    })
                }
            };
        (function () {
            w = $("#f_city_canpaign_contain .npc");
            $("#f_campaign_bg");
            s = $("#f_campaign_bg_contain");
            var a = Utils.getCookie("params");
            a && f.fb_info(function (b) {
                b.ret.fb_label == a.index ? (d = window.campaign[a.index], m = b.ret, g(a.index), o.init(), setTimeout(function () {
                    x.show(m.remaining_time)
                })) : alert([b.fb_label, a.index])
            });
            pnlLoading.hide()
        })()
    })()
});
defineSubView("f_city_campaign_list", function () {
    (function () {
        function w() {
            $("#fb_times").find("b").html(f + "/" + l.ret.max_times);
            q > d || 0 >= f ? $("#map_select .funcbutton").hide() : $("#map_select .funcbutton").show();
            l.ret.add_times && $("#fb_times").find(".promotebutton").hide();
            $("#fb_times").find(".promotebutton").click(function () {
                showYesNo(LNG.F_CITY_CAMPAIGN_HTML.ADD_TIMES, function () {
                    pnlLoading.show();
                    b.fb_add(function (a) {
                        w();
                        $("#fb_times").find(".promotebutton").hide();
                        $("#gem b").html(a.ret.gem)
                    })
                })
            })
        }

        function s() {
            $("#wrapper").css("height", C)
        }
        function n(a, b) {
            a.find("#f_city_militay_select_hero").click(function () {
                k(a, b);
                o.find("#sendtroop").hide();
                a.find("#troop").hide();
                j[b] = {}
            })
        }
        function v(a, b) {
            a.find("#f_city_militay_select_troop").click(function () {
                x = b;
                u();
                c(a, b)
            })
        }
        function c(a, b) {
            o.find("#troop_select").unbind().click(function () {
                var c = a.find("#troops");
                G || (G = c.find("#troop"));
                c.empty();
                var d = G.clone();
                if (null != e && null != e.soldiers) {
                    var f = j[x] = {},
                        h = 0,
                        y = "";
                    c.append(d.show());
                    $.each(e.soldiers, function (a, h) {
                        var b = mainStatus.SOLDIER_DATA[h[0]],
                            e = o.find(".tooltip4 input:eq(" + a + ")");
                        e.val();
                        !e.val() || 0 >= parseInt(e.val()) ? e.val(0) : y += b.name + ":" + e.val() + "<br>";
                        f[h[0]] = e.val()
                    });
                    var c = j[b],
                        r;
                    for (r in c) h += parseInt(c[r]);
                    if (h > A[b]) return showInfo(translate(LNG.ERROR.CLIENT.BEYONDHEROCOMMAND, A[b])), !1;
                    o.find(".tooltip3").show();
                    $("#title1").show();
                    $("#title3").hide();
                    o.find(".tooltip4").hide();
                    d.html(y);
                    s();
                    null != B && (B.refresh(), B.setPosition(0, 0))
                }
            })
        }
        function k(a, b) {
            $("#f_city_militay").hide();
            $("#title1").hide();
            $("#title2").show();
            o.find("#f_content3_military_hero_select").show();
            var e = B.x,
                c = B.y;
            B.setPosition(0, 0);
            showFreeHeroPanel(o.find("#f_content3_military_hero_select"), !1, function (d) {
                if (null == d) showInfo(LNG.ERROR.CLIENT.NOFREEHERO);
                else {
                    for (var h = mainStatus.HERO_DATA[d.gid], y = !1, f = 0; f < i.length; f++) if (i[f] == d.gid) {
                        y = !0;
                        break
                    }
                    if (!y) i[b] = d.gid, A[b] = d.c2, a.find("#f_city_campaign_hero_name").html(h.name + "&nbsp;(" + d.g + ")"), a.find("#f_city_campaign_hero_troop").text(d.c2), a.find("#hero_img").css("background-image", "url(img/hero/" + d.gid + ".jpg)"), a.find("#f_city_militay_select_troop").show(), $("#f_content3_military_hero_select" + d.gid).empty().unbind()
                }
                $("#title2").hide();
                $("#f_city_militay").show();
                $("#title1").show();
                o.find("#sendtroop").show();
                s();
                null != B && (B.refresh(), B.setPosition(e, c))
            });
            return !1
        }
        function g(a, b, e) {
            function c() {
                var f = Math.ceil(Math.pow(y, 1.5)),
                    f = f > h ? h : f,
                    f = d + b * f;
                0 < b && f > e || 0 > b && f < e ? (H = !1, clearInterval(r), a.value = e) : a.value = f;
                y++
            }
            H = !0;
            var d = Utils.parseInt(a.value, 0),
                h = Math.abs(e - d),
                y = 1;
            c();
            1 < h && setTimeout(function () {
                clearInterval(r);
                H && (r = setInterval(c, 100))
            }, 300)
        }
        function a() {
            H = !1;
            clearInterval(r);
            timer = null
        }
        function t(b, c, d) {
            var f = mainStatus.SOLDIER_DATA[d[0]];
            b.find("#f_troop_name").text(f.name);
            var r = 0;
            j[0] && 0 != x ? (f = 0, j[0] && j[0][c + 1] && (f = j[0][c + 1]), r = e.soldiers[c][1] - f) : j[1] && 1 != x ? (f = 0, j[1] && j[1][c + 1] && (f = j[1][c + 1]), r = e.soldiers[c][1] - f) : r = d[1];
            0 == r && b.hide();
            b.find("#f_troop_max_val").text(r);
            b.find("#f_troop_input_input").data("soldier", d);
            b.find("#f_troop_max").click(function () {
                var a = A[x];
                if ("" != a) {
                    var a = parseInt(a),
                        h = 0;
                    o.find("#f_troop_inputs").find("#f_troop_input_input").each(function () {
                        var a = $(this),
                            b = Utils.parseInt(a.val(), 0);
                        0 < b && a.data("soldier")[0] != d[0] && (h += b)
                    });
                    h < a ? (a -= h, a > r && (a = r), b.find("input").val(a)) : b.find("input").val(0)
                } else b.find("input").val(r);
                return !1
            });
            var h = b.find("input").get(0);
            b.find("#f_troop_input_minus").unbind();
            b.find("#f_troop_input_minus").bind("mousedown touchstart", function () {
                a();
                g(h, -1, 0)
            });
            b.find("#f_troop_input_minus").bind("mouseup touchend", function () {
                a()
            });
            b.find("#f_troop_input_plus").unbind();
            b.find("#f_troop_input_plus").bind("mousedown touchstart", function () {
                a();
                g(h, 1, r)
            });
            b.find("#f_troop_input_plus").bind("mouseup touchend", function () {
                a()
            })
        }
        function u() {
            o.find(".tooltip4").show();
            $("#title3").show();
            o.find(".tooltip3").hide();
            $("#title1").hide();
            var a = o.find("#f_troop_inputs");
            null == F && (F = a.find("#f_troop_input"));
            a.empty();
            null != e && null != e.soldiers && $.each(e.soldiers, function (b, e) {
                var c = F.clone();
                c.attr("id", "f_troop_input_no" + b);
                c.find("input").attr("sid", e[0]);
                a.append(c.show());
                2 != e[0] && 0 < e[1] || c.hide();
                t(c, b, e)
            });
            m.refresh()
        }
        var b = {
            fb_add: function (a) {
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_ADDTIMES, {
                    key: key
                }, function (b) {
                    f += b.ret.times;
                    a && a(b)
                })
            }
        },
            B = null,
            m = new iScroll("f_troop_inputs", {
                desktopCompatibility: !0
            }),
            C = "215px",
            d = 2,
            E = $("#f_city_campaign_html_list_script"),
            o = $(E.parent().get(0)),
            q = null,
            x = -1,
            j = [];
        o.bind("dispose", function () {
            null != B && (B.destroy(!1), B = null);
            o = null
        });
        (function () {
            function a() {
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_LIST, {
                    key: keyinfo.key
                }, function (e) {
                    l = e;
                    isNaN(e.ret.fb_label) ? (f = e.ret.times, d = parseInt(e.ret.highest_fb), b()) : parseInt(e.ret.finish) ? ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_OUT, {
                        key: keyinfo.key
                    }, function () {
                        a()
                    }) : main_loadDiv("f_city_campaign.html", {
                        index: e.ret.fb_label
                    })
                })
            }
            function b() {
                w();
                for (var a in window.campaign) {
                    var e = $("<li>" + window.campaign[a].mapname + "</li>").appendTo($("#maplist"));
                    $("<p>" + window.campaign[a].mapdesc + "</p>").appendTo($("#map_info")).hide();
                    $("#map_img").css("background-image", "url(img/campign/" + window.campaign[0].warurl + ")");
                    $("#map_info p:first").show();
                    $("#maplist li:first").addClass("selected");
                    e.addClass("active");
                    e.click(function (a) {
                        return function () {
                            q = a;
                            $("#map_img").hide();
                            $("#map_info p").hide();
                            $(this).siblings().removeClass("selected").addClass("active");
                            $(this).removeClass("active").addClass("selected");
                            $("#map_img").css("background-image", "url(img/campign/" + window.campaign[a].warurl + ")").show();
                            $("#map_info p:eq(" + a + ")").show();
                            w()
                        }
                    }(a, window.campaign[a]))
                }
                B = new iScroll("scroller", {
                    desktopCompatibility: !0
                });
                pnlLoading.hide();
                setTimeout(function () {
                    $("#maplist li:eq(0)").click()
                })
            }
            a()
        })();
        $("#maplist");
        var i = 0,
            f = 0,
            l = null;
        $("#sendtroop").click(function () {
            if (i[0] && i[1] && j[0] && j[1]) {
                var a = {
                    key: keyinfo.key,
                    city: mainStatus.CITY_ID,
                    fb: q,
                    gen: i[0] + "|" + i[1]
                },
                    b = j[0],
                    e = j[1],
                    c;
                for (c in b) {
                    var d = b[c],
                        h = e[c];
                    0 < d + h && (a["soldier_num" + c] = d + "|" + h)
                }(function (h) {
                    pnlLoading.show();
                    ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_START, a, function (a) {
                        h && h(a)
                    })
                })(function () {
                    main_loadDiv("f_city_campaign.html", {
                        index: q
                    })
                })
            } else showInfo(LNG.ERROR.SERVER[9003])
        });
        $("#map_select .funcbutton").click(function () {
            i.length = 0;
            j.length = 0;
            $("#menu").hide();
            $("#iphonetitle").show();
            o.find(".tooltip3").show();
            $("#f_city_militay").show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SOLDIER_EDUCATE, {
                key: keyinfo.key,
                city: mainStatus.getCity().id
            }, function (a) {
                e = a.ret;
                a = o.find("#f_city_militay");
                null == z && (z = a.find("#f_city_militay_list"));
                a.empty();
                for (var b = 0; 2 > b; b++) {
                    var c = z.clone();
                    c.attr("id", "f_city_militay_list" + b);
                    n(c, b);
                    v(c, b);
                    a.append(c.show())
                }
            });
            s();
            null != B && (B.refresh(), B.setPosition(0, 0))
        });
        var z = null,
            G = null,
            i = [],
            A = [],
            e = null,
            r = null,
            H = !1,
            F = null;
        $("#f_sample_close").click(function () {
            $("#f_city_militay").is(":visible") ? (o.find(".tooltip2").show(), $("#f_city_militay").hide(), $("#iphonetitle").hide()) : o.find(".tooltip4").is(":visible") ? (o.find(".tooltip3").show(), $("#title1").show(), $("#title3").hide(), o.find("#troop").hide(), o.find(".tooltip4").hide()) : ($("#f_city_militay").show(), $("#title1").show(), o.find("#sendtroop").show(), $("#title2").hide(), $("#f_content3_military_hero_select").empty().unbind());
            return !1
        })
    })();
    $("#listexit").click(function () {
        showCity();
        return !1
    })
});
defineSubView("f_city_center", function () {
    function w() {
        $("#f_content3_buff_list").html("");
        for (var a = mainStatus.CITY_INFO, b = null == eventinfo ? 0 : eventinfo.length, c = 0; c < b; c++) {
            var d = eventinfo[c],
                d = '<div style="position:relative;height: 60px;"><img src="img/item/' + d.icon + '" style="position:absolute;top: 5px; left: 10px;"><div class="tooltip2" style="left: 65px; top: 5px; width: 385px; height:50px"><p><b>' + d.name + '</b></p><p style="position:relative;top:6px;">' + d.desc + "</p></div></div>";
            $("#f_content3_buff_list").append(d)
        }
        d = null == a[23] ? 0 : a[23].length;
        for (c = 0; c < d; c++) {
            var f = a[23][c];
            s(f.id, f.itemid, f.secs)
        }
        0 < userinfo.protection && (d++, s(0, 0, userinfo.protection));
        0 >= d + b ? $("#f_content3_buff_list").hide() : $("#f_content3_buff_list").show()
    }
    function s(a, b, c) {
        var d = null,
            d = 0 != b ? mainStatus.ITEM_DATA[b] : LNG.BEGINNERPROTECTION;
        "undefined" == typeof d || null == d || (c = '<div style="position:relative;height: 60px;"><div id="f_content3_buff_img' + a + '" class="itemicon1" style="top: 5px; left: 10px;"></div><div class="tooltip2" style="left: 65px; top: 5px; width: 385px; height:50px"><p><b><font color="' + LNG.ITEMRANK[d.rank].color + '">' + d.name + '</font></b></p><p style="position:relative;top:6px;">' + d.desc + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 240px;"><li><em class="clock"></em><b>' + Utils.timeString2(c) + "</b></li></ul></div></div>", $("#f_content3_buff_list").append(c), Utils.loadImage($("#f_content3_buff_img" + a), Utils.getItemImage(b)))
    }
    function n() {
        $("#f_content3_land_type").text(LNG.LANDTYPE[mainStatus.getCity().landtype]);
        $("#f_content3_land_amount").text(mainStatus.CITY_INFO[0]);
        $("#f_content3_land_max").text(mainStatus.CITY_INFO[1]);
        $("#f_content3_wood_amount").text(mainStatus.CITY_INFO[6]);
        $("#f_content3_wood_max").text(mainStatus.CITY_INFO[7]);
        $("#f_content3_food_amount").text(mainStatus.CITY_INFO[4]);
        $("#f_content3_food_max").text(mainStatus.CITY_INFO[5]);
        $("#f_content3_gold_amount").text(mainStatus.CITY_INFO[2]);
        $("#f_content3_gold_max").text(mainStatus.CITY_INFO[3]);
        $("#f_content3_iron_amount").text(mainStatus.CITY_INFO[8]);
        $("#f_content3_iron_max").text(mainStatus.CITY_INFO[9]);
        $("#f_content3_head_amount").text(mainStatus.CITY_INFO[11] - mainStatus.CITY_INFO[10]);
        $("#f_content3_head_max").text(mainStatus.CITY_INFO[11]);
        $("#f_content3_house_level").text(mainStatus.CITY_INFO[16]);
        2 > mainStatus.CITY_INFO[16] && $("#f_city_house_down").hide();
        $("#f_content3_storage_level").text(mainStatus.CITY_INFO[20]);
        2 > mainStatus.CITY_INFO[20] && $("#f_city_storage_down").hide();
        $("#f_content3_office_level").text(mainStatus.CITY_INFO[22]);
        2 > mainStatus.CITY_INFO[22] && $("#f_city_office_down").hide();
        $("#f_content3_wood_level").text(mainStatus.CITY_INFO[12]);
        2 > mainStatus.CITY_INFO[12] && $("#f_city_wood_down").hide();
        $("#f_content3_food_level").text(mainStatus.CITY_INFO[15]);
        2 > mainStatus.CITY_INFO[15] && $("#f_city_food_down").hide();
        $("#f_content3_iron_level").text(mainStatus.CITY_INFO[13]);
        2 > mainStatus.CITY_INFO[13] && $("#f_city_iron_down").hide();
        $("#f_content3_gold_level").text(mainStatus.CITY_INFO[14]);
        2 > mainStatus.CITY_INFO[14] && $("#f_city_gold_down").hide();
        $("#f_content3_research_level").text(mainStatus.CITY_INFO[18]);
        2 > mainStatus.CITY_INFO[18] && $("#f_city_research_down").hide();
        $("#f_content3_military_level").text(mainStatus.CITY_INFO[17]);
        2 > mainStatus.CITY_INFO[17] && $("#f_city_military_down").hide();
        $("#f_content3_hero_level").text(mainStatus.CITY_INFO[19]);
        2 > mainStatus.CITY_INFO[19] && $("#f_city_hero_down").hide();
        $("#f_content3_defense_level").text(mainStatus.CITY_INFO[21]);
        2 > mainStatus.CITY_INFO[21] && $("#f_city_defense_down").hide()
    }
    function v() {
        var b = a.find("#f_content2_list");
        b.empty().unbind();
        a.find("#f_content2_title2").hide();
        null == z || 0 == z.length ? (a.find("#f_content2_title1").show(), a.find("#f_content2_title3").hide(), a.find("#f_content2_list_title").hide(), b.hide()) : (a.find("#f_content2_title1").hide(), a.find("#f_content2_title3").show(), a.find("#f_content2_list_title").show(), $.each(z, function (a, c) {
            var d = '<table><tr><td style="width:295px;"><ul class="reshead"><li><emclass="race' + c[0].nationid + "></em><b>" + c[0].nick + '</b></li><li><em class="lv"></em><b>' + c[0].level + "</b></li>";
            0 < c[0].guildid && (d += '<li><em class="guild" style="background-image:url(' + Utils.getFlag(c[0].gflag) + ')"></em><b>' + c[0].guild + "</b></li>");
            d += '</ul></td><td style="width:60px;">' + Utils.timeString(c[0].conq[1]) + "</td><td>";
            d = 0 < c[1] ? d + Utils.timeString(c[1]) : d + ('<div id="f_content2_list_tax' + c[0].id + '" class="funcbutton" style="position:relative; left:5px;">' + LNG.TAX + "</div>");
            b.append(d + "</td></tr></table>");
            var f = b.find("#f_content2_list_tax" + c[0].id);
            f.click(function () {
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, {
                    key: key,
                    action: "conquertax",
                    cid: mainStatus.CITY_ID,
                    target: c[0].id
                }, function (a) {
                    mainStatus.CITY_INFO[6] += a.ret.wood;
                    mainStatus.CITY_INFO[4] += a.ret.food;
                    mainStatus.CITY_INFO[8] += a.ret.iron;
                    mainStatus.CITY_INFO[2] += a.ret.gold;
                    1 == a.ret.loss ? showInfo(translate(LNG.TAXLOSS, a.ret.wood, a.ret.food, a.ret.iron, a.ret.gold)) : showInfo(translate(LNG.TAXFULL, a.ret.wood, a.ret.food, a.ret.iron, a.ret.gold));
                    f.hide()
                })
            })
        }), b.show())
    }
    function c(a) {
        var b = LNG.CONFIRMDEGRADE;
        if ("undefined" == typeof b || null == b) b = LNG.DEGRADE_COST + ': <img src="img/res/wood.png"/>x<b>%s</b> <img src="img/res/food.png"/>x<b>%s</b> <img src="img/res/iron.png"/>x<b>%s</b> <img src="img/res/ic06_other.gif"/>x<b>%s</b>';
        var c = mainStatus.BUILDING_DATA[a],
            d = mainStatus.CITY_INFO.getLevel(a) - 1,
            c = c.upgrade[d],
            b = translate(b, Math.ceil(0.2 * c.w), Math.ceil(0.2 * c.f), Math.ceil(0.2 * c.i), Math.ceil(0.2 * c.g));
        showConfirm(b, function () {
            var b = mainStatus.getCity();
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
                key: key,
                city: b.id,
                build_act: "destroy",
                build_type: a
            }, function (a) {
                CMA.add(a.ret.cdlist);
                showInfo(LNG.SUCCESS)
            }, function (a) {
                (704 == a || 707 == a) && CMA.reload()
            })
        })
    }
    var k = null,
        g = $("#f_city_center_html_script"),
        a = $(g.parent().get(0)),
        t = EMA.getProxy();
    a.bind("dispose", function () {
        null != k && (k.destroy(!1), k = null);
        Utils.removeCss("f_city_center_css");
        t.dispose();
        a = t = null
    });
    $("#divModPassword_confirm").click(function () {
        $("#mod_error").text("");
        var a = $("#mod_pwd").val(),
            b = $("#mod_newpwd").val(),
            c = $("#mod_newpwd2").val();
        if ("" == a) return $("#mod_error").text(LNG.ERROR.CLIENT.EMPTYOLDPASSWORD), !1;
        if ("" == b) return $("#mod_error").text(LNG.ERROR.CLIENT.EMPTYNEWPASSWORD), !1;
        if (!/^[A-Za-z0-9]+$/.test(b)) return $("#mod_error").text(LNG.ERROR.CLIENT.INVALIDPASSWORD), !1;
        if (b != c) return $("#mod_error").text(LNG.ERROR.CLIENT.PASSWORDNOTMATCH), !1;
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_LOGIN, {
            account: keyinfo.user,
            oldpwd: a,
            newpwd: b,
            action: "mod"
        }, function () {
            showInfo(LNG.SETDONE);
            $("#divModPassword_cancel").click();
            pnlLoading.hide()
        });
        return !1
    });
    $("#divModPassword_cancel").click(function () {
        $("#divModPassword").hide();
        $("#f_content").show()
    });
    var g = a.find("#f_content1"),
        u = [{
            buildtype: 5,
            panel: g.find("#f_house")
        }, {
            buildtype: 11,
            panel: g.find("#f_storage")
        }, {
            buildtype: 13,
            panel: g.find("#f_build")
        }],
        b = mainStatus.BUILDING_DATA,
        B = function (a) {
            var e = mainStatus.getCity(),
                c = b[a.buildtype],
                d = mainStatus.CITY_INFO.getLevel(a.buildtype),
                f = c.upgrade[d];
            if (f) 0 < d ? (c = LNG.CONFIRMBUILD, c = LNG.UPGRADE_CONFIRM, showConfirm(c, function () {
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
                    key: key,
                    city: e.id,
                    build_type: a.buildtype
                }, function (b) {
                    a.panel.find("#f_upgrade").hide();
                    a.panel.find("#f_build_promotion").show();
                    mainStatus.CITY_INFO[6] -= f.w;
                    mainStatus.CITY_INFO[2] -= f.g;
                    mainStatus.CITY_INFO[4] -= f.f;
                    mainStatus.CITY_INFO[8] -= f.i;
                    CMA.add(b.ret.cdlist)
                }, function (a) {
                    (704 == a || 707 == a) && CMA.reload()
                })
            })) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
                key: key,
                city: e.id,
                build_type: a.buildtype
            }, function (b) {
                a.panel.find("#f_upgrade").hide();
                a.panel.find("#f_build_promotion").show();
                mainStatus.CITY_INFO[6] -= f.w;
                mainStatus.CITY_INFO[2] -= f.g;
                mainStatus.CITY_INFO[4] -= f.f;
                mainStatus.CITY_INFO[8] -= f.i;
                CMA.add(b.ret.cdlist)
            }, function (a) {
                (704 == a || 707 == a) && CMA.reload()
            }))
        },
        m = [{
            id: 115,
            shop: 1
        }, {
            id: 116,
            shop: 1
        }, {
            id: 117,
            shop: 1
        }],
        C = [{
            id: 1001,
            shop: 1,
            icon: "gem.jpg",
            name: LNG.INSTANT_COMPLETE,
            desc: LNG.INSTANT_COMPLETE_DESC,
            price: 0
        }],
        d = function (a) {
            var b = CMA.getCD(1, a.buildtype);
            if (null != b) return a = (new Date).getTime(), a = Math.ceil((b.end - a) / 1E3), pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CD_PRICE, {
                type: b.cdtype,
                secs: a
            }, function (a) {
                l = !0;
                a = a.ret.price;
                0 < a ? C[0].price = a : C = null;
                $("#f_content1").hide();
                showItemPromotion($("#f_city_center_promotion"), m, function (a) {
                    l = !1;
                    if (1001 == a) {
                        pnlLoading.show();
                        var c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO;
                        ajaxCall(c, {
                            key: key,
                            city: mainStatus.CITY_ID,
                            tid: b.id,
                            action: "build2"
                        }, function (a) {
                            userinfo.money = a.ret.money;
                            refreshUserInfo();
                            CMA.changeSecs(b.id, 0);
                            showInfo(LNG.SUCCESS)
                        })
                    } else 0 != a && (pnlLoading.show(), c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO, ajaxCall(c, {
                        key: key,
                        city: mainStatus.CITY_ID,
                        tid: b.id,
                        action: "build",
                        iid: a
                    }, function (a) {
                        CMA.changeSecs(b.id, a.ret.secs);
                        showInfo(LNG.SUCCESS)
                    }));
                    $("#f_content1").show()
                }, !0, C)
            }), !1
        },
        E = function (a, e) {
            if (b) {
                var c = b[a],
                    d = mainStatus.CITY_INFO.getLevel(a),
                    f = c.upgrade[d];
                if (f) {
                    if (5 == a) {
                        e.find("#f_value b").html(f.v);
                        var p = c.upgrade[d + 1];
                        "undefined" == typeof p || null == p ? e.find("#f_value_next b").html("N/A") : e.find("#f_value_next b").html(p.v)
                    }
                    e.find("#f_title").html(c.name);
                    Utils.loadImage(e.find("#f_img"), Utils.getBuildingImage(a));
                    e.find("#f_desc").html(c.desc);
                    e.find("#f_level").html(d);
                    e.find("#resfood b").html(f.f);
                    mainStatus.CITY_INFO[4] < f.f && e.find("#resfood b").css("color", "#FFD17A");
                    e.find("#reswood b").html(f.w);
                    mainStatus.CITY_INFO[6] < f.w && e.find("#reswood b").css("color", "#FFD17A");
                    e.find("#resiron b").html(f.i);
                    mainStatus.CITY_INFO[8] < f.i && e.find("#resiron b").css("color", "#FFD17A");
                    e.find("#resgold b").html(f.g);
                    mainStatus.CITY_INFO[2] < f.g && e.find("#resgold b").css("color", "#FFD17A");
                    f = buildtime(f.t, mainStatus.CITY_INFO[22]);
                    "undefined" != typeof statinfo.vs && null != statinfo.vs && (f *= statinfo.vs);
                    e.find("#clock b").html(Utils.timeString2(Math.ceil(f)));
                    c.upgrade[d + 1] ? 11 == a && (5 > mainStatus.CITY_INFO[12] || 5 > mainStatus.CITY_INFO[13] || 5 > mainStatus.CITY_INFO[14] || 5 > mainStatus.CITY_INFO[15]) ? (e.find("#f_upgrade").hide(), e.find("#f_cd1").hide(), e.find("#f_desc").html('<font style="color:#FFD17A">' + e.find("#f_desc").html() + "</font>")) : (e.find("#f_upgrade").show(), e.find("#f_build_promotion").hide()) : (e.find("#f_upgrade").hide(), e.find("#f_cd1").hide())
                }
            }
        },
        g = function () {
            $.each(u, function (a, b) {
                E(b.buildtype, b.panel)
            })
        },
        o = function (a, b) {
            $.each(u, function (a, c) {
                c.buildtype == b && E(c.buildtype, c.panel)
            })
        };
    $.each(u, function (a, b) {
        var c = b.panel,
            d = u[a].buildtype,
            f = c.find("#f_cd1 p"),
            p = c.find("#f_upgrade"),
            i = c.find("#f_build_promotion");
        t.bind(CMA.getTickEventId(1, d), function (a) {
            p.hide();
            i.show();
            f.html(Utils.timeString2(a))
        });
        t.bind(CMA.getDoneEventId(1, d), function () {
            o(p, d)
        })
    });
    g();
    (function () {
        $.each(u, function (a, b) {
            b.panel.find("#f_upgrade").click(function () {
                B(b);
                return !1
            });
            b.panel.find("#f_build_promotion").click(function () {
                d(b);
                return !1
            })
        })
    })();
    CMA.forceNotify();
    t.bind("cityinfoupdate", g);
    var g = $("#f_make1"),
        q = $("#f_make2"),
        x = null,
        j = !1,
        i = function (a, b, c) {
            function d() {
                var l = Math.ceil(Math.pow(i, 1.5)),
                    l = l > p ? p : l,
                    l = f + b * l;
                0 < b && l > c || 0 > b && l < c ? (j = !1, clearInterval(x), a.value = c) : a.value = l;
                i++
            }
            j = !0;
            var f = Utils.parseInt(a.value, 0),
                p = Math.abs(c - f),
                i = 1;
            d();
            1 < p && setTimeout(function () {
                clearInterval(x);
                j && (x = setInterval(d, 100))
            }, 300)
        },
        f = function () {
            j = !1;
            clearInterval(x);
            timer = null
        };
    $.each({
        1: g,
        2: q
    }, function (a, b) {
        var c = b.find("#f_num").find("input").get(0);
        b.find("#f_num_minus").unbind();
        b.find("#f_num_minus").bind("mousedown touchstart", function () {
            f();
            i(c, -1, 0)
        });
        b.find("#f_num_minus").bind("mouseup touchend", function () {
            f()
        });
        var d = 0,
            d = "1" == a ? Math.floor(mainStatus.CITY_INFO[2] / 1100) : Math.floor(mainStatus.CITY_INFO[2] / 11E3);
        b.find("#f_num_plus").unbind();
        b.find("#f_num_plus").bind("mousedown touchstart", function () {
            f();
            i(c, 1, d)
        });
        b.find("#f_num_plus").bind("mouseup touchend", function () {
            f()
        });
        b.find("#f_num_max").unbind().click(function () {
            f();
            c.value = d
        });
        b.find("#f_upgrade").click(function () {
            var b = mainStatus.getCity();
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MARKET_GOLD, {
                key: key,
                city: b.id,
                type: a,
                num: c.value
            }, function (a) {
                mainStatus.CITY_INFO[2] -= a.ret;
                $("#f_make1").find("#f_cd1 p").text(Utils.timeString2(a.ext[0]));
                $("#f_make2").find("#f_cd1 p").text(Utils.timeString2(a.ext[0]));
                $("#f_make1").find("#f_upgrade").hide();
                $("#f_make2").find("#f_upgrade").hide();
                showInfo(LNG.SUCCESS)
            });
            return !1
        })
    });
    var l = !1;
    a.find("#f_tab1,#f_tab2,#f_tab3,#f_tab4").click(function (b) {
        if (l) return !1;
        $(this).hasClass("tab_inactive") && (a.find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), a.find("#f_content1,#f_content2,#f_content3,#f_content4,#f_city_center_info,#f_city_exp_info").hide(), $(this).trigger("tab", b));
        return !1
    });
    a.find("#f_tab1").bind("tab", function () {
        a.find("#f_content1").show();
        a.find("#f_city_center_info").show();
        null != k && (k.refresh(), k.setPosition(0, 0));
        return !1
    });
    var z = null;
    a.find("#f_tab2").bind("tab", function () {
        a.find("#f_city_center_info").show();
        if (0 != userinfo.conq[0]) {
            pnlLoading.show();
            var b = CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO;
            ajaxCall(b, {
                key: key,
                action: "conquerend"
            }, function (b) {
                a.find("#f_content2_title2 strong").text(Utils.timeString(b.ret.sec))
            });
            a.find("#f_content2_title1").hide();
            a.find("#f_content2_title2 b").text(userinfo.conq[2]);
            a.find("#f_content2_title2").show();
            a.find("#f_content2_title3").hide();
            a.find("#f_content2_list_title").hide();
            a.find("#f_content2_list").hide();
            a.find("#f_content2").show();
            null != k && (k.refresh(), k.setPosition(0, 0))
        } else pnlLoading.show(), b = CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, ajaxCall(b, {
            key: key,
            action: "list_conquered"
        }, function (b) {
            z = b.ret.list;
            v();
            a.find("#f_content2").show();
            null != k && (k.refresh(), k.setPosition(0, 0))
        });
        return !1
    });
    var G = null;
    a.find("#f_tab3").bind("tab", function () {
        a.find("#f_city_exp_info").show();
        a.find("#f_content3").show();
        null == G && (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, {
            key: key,
            action: "exp"
        }, function (b) {
            G = b.ret;
            a.find("#f_city_exp_info b").text(G[0]);
            a.find("#f_city_exp_info strong").text(G[1]);
            userinfo.protection = G[2];
            refreshUserInfo()
        }));
        w();
        n();
        null != k && (k.refresh(), k.setPosition(0, 0));
        return !1
    });
    a.find("#f_tab4").bind("tab", function () {
        a.find("#f_city_center_info").show();
        a.find("#f_content4").show();
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, {
            key: key,
            action: "g_cd"
        }, function (a) {
            var b = !0;
            if ("" != a.ret && (0 < a.ret[0] && ($("#f_make1").find("#f_cd1 p").text(Utils.timeString2(a.ret[0])), $("#f_make2").find("#f_cd1 p").text(Utils.timeString2(a.ret[0])), $("#f_make1").find("#f_upgrade").hide(), $("#f_make2").find("#f_upgrade").hide(), b = !1), 0 < a.ret[1] ? ($("#f_content4_vacation_clock b").text(Utils.timeString2(a.ret[1])), $("#f_content4_vacation_clock").show(), $("#f_content4_vacation_do").hide(), 0 < a.ret[3] - 172800 && $("#f_content4_vacation_end").show()) : 0 < a.ret[2] && ($("#f_content4_vacation_cd p").text(Utils.timeString2(a.ret[2])), $("#f_content4_vacation_cd").show(), $("#f_content4_vacation_do").hide()), ispvp)) {
                var c = mainStatus.CITY_INFO;
                c[25] = a.ret[4];
                $("#f_content4_durab_point").text(c[25]);
                0 < a.ret[5] ? ($("#f_content4_durab_cd p").text(Utils.timeString2(a.ret[5])), $("#f_content4_durab_cd").show(), $("#f_content4_durab_do").hide()) : ($("#f_content4_durab_cd").hide(), $("#f_content4_durab_do").show());
                0 < a.ret[6] ? ($("#f_content4_sleep_clock b").text(Utils.timeString2(a.ret[6])), $("#f_content4_sleep_clock").show(), $("#f_content4_sleep_do").hide()) : ($("#f_content4_sleep_clock").hide(), $("#f_content4_sleep_do").show())
            }
            b && ($("#f_make1").find("#f_cd1 p").text(""), $("#f_make2").find("#f_cd1 p").text(""), $("#f_make1").find("#f_upgrade").show(), $("#f_make2").find("#f_upgrade").show())
        });
        0 < userinfo.protection ? ($("#f_content4_stop_protection").show(), $("#f_content4_vacation").hide()) : ($("#f_content4_stop_protection").hide(), ispvp ? $("#f_content4_vacation").hide() : $("#f_content4_vacation").show());
        if (ispvp) {
            var b = mainStatus.CITY_INFO;
            $("#f_content4_durab_point").text(b[25]);
            $("#f_content4_durab").show();
            $("#f_content4_sleep").show();
            $("#f_switch_to_original").show();
            $("#f_content4_mod_password").hide();
            $("#f_switch_to_pvp").hide()
        } else $("#f_content4_durab").hide(), $("#f_content4_sleep").hide(), $("#f_switch_to_original").hide(), $("#f_content4_mod_password").show(), $("#f_switch_to_pvp").show();
        var b = !0,
            c;
        for (c in userinfo.city) if (mainStatus.CITY_ID > userinfo.city[c].id) {
            b = !1;
            break
        }
        b ? ($("#f_content4_abandon_castle_cancel").hide(), $("#f_content4_abandon_castle_do").hide()) : 0 == mainStatus.CITY_INFO[24] ? ($("#f_content4_abandon_castle_cancel").hide(), $("#f_content4_abandon_castle_do").show()) : ($("#f_content4_abandon_castle_cd p").text(Utils.timeString(mainStatus.CITY_INFO[24])), $("#f_content4_abandon_castle_cancel").show(), $("#f_content4_abandon_castle_do").hide());
        null != k && (k.refresh(), k.setPosition(0, 0));
        return !1
    });
    a.find("#f_content4_modify_password_do").click(function () {
        16 < keyinfo.user.length ? $("#mod_account").text(LNG.ACCOUNT_SYS) : $("#mod_account").text(keyinfo.user);
        $("#divModPassword").show();
        $("#f_content").hide()
    });
    a.find("#f_content4_bug_report_do").click(function () {
        GlobalNav.WriteMail(":help")
    });
    a.find("#f_content4_sleep_do").click(function () {
        showConfirm(LNG.CONFIRMSLEEP, function () {
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, {
                key: key,
                action: "sleep",
                city: mainStatus.getCity().id
            }, function (a) {
                $("#f_content4_sleep_do").hide();
                $("#f_content4_sleep_clock b").text(Utils.timeString2(a.ret[1]));
                $("#f_content4_sleep_clock").show();
                showInfo(LNG.SUCCESS);
                userinfo.status = a.ret[0];
                resyncUserInfo()
            })
        });
        return !1
    });
    a.find("#f_content4_stop_protection_do").click(function () {
        if ("undefined" == typeof LNG.CONFIRMSTOPPROTECTION) LNG.CONFIRMSTOPPROTECTION = "You will stop your New Player Protection, are you sure to proceed?";
        showConfirm(LNG.CONFIRMSTOPPROTECTION, function () {
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, {
                key: key,
                action: "endp"
            }, function () {
                userinfo.protection = 0;
                $("#f_content4_stop_protection").hide()
            })
        });
        return !1
    });
    a.find("#f_content4_switch_original_do").click(function () {
        showConfirm(LNG.CONFIRM_SWITCH, function () {
            pnlLoading.show();
            ajaxCall(CONFIG.MASTERHOST + CONFIG.MASTER_QUERY, {
                user: keyinfo.user,
                action: "getserver"
            }, function (a) {
                a = a.ret.server;
                keyinfo.pvp = 0;
                keyinfo.server = a;
                Utils.setCookie("key", keyinfo);
                showInfo(LNG.SWITCH_DONE, function () {
                    location.href = "start.html"
                })
            })
        });
        return !1
    });
    a.find("#f_content4_forum_visit").click(function () {
        location.href = "js-call:brow?" + LNG.FORUM_URL
    });
    a.find("#f_content4_switch_pvp_do").click(function () {
        showConfirm(LNG.CONFIRM_SWITCH, function () {
            pnlLoading.show();
            ajaxCall(CONFIG.MASTERHOST + CONFIG.MASTER_QUERY, {
                user: keyinfo.user,
                action: "getpvpserver"
            }, function (a) {
                var b = a.ret.server;
                pnlLoading.show();
                ajaxCall(b + CONFIG.FUNC_LOGIN, {
                    user: keyinfo.user,
                    action: "synckey"
                }, function () {
                    keyinfo.pvp = 1;
                    keyinfo.server = b;
                    Utils.setCookie("key", keyinfo);
                    showInfo(LNG.SWITCH_DONE, function () {
                        location.href = "start.html?_l=" + window._l
                    })
                })
            })
        });
        return !1
    });
    a.find("#f_content4_vacation_do").click(function () {
        $("#f_vacation_start").show();
        window.selectProxy.proxySelect($("#f_content4_vacation_length")[0]);
        return !1
    });
    a.find("#f_content4_vacation_end").click(function () {
        showConfirm(LNG.CONFIRMSTOPVACATION, function () {
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, {
                key: key,
                action: "vacation_end"
            }, function (a) {
                $("#f_content4_vacation_end").hide();
                $("#f_content4_vacation_clock").hide();
                0 < a.ret[1] ? ($("#f_content4_vacation_cd p").text(Utils.timeString2(a.ret[1])), $("#f_content4_vacation_cd").show()) : $("#f_content4_vacation_do").show();
                showInfo(LNG.SUCCESS);
                userinfo.status = a.ret[0];
                resyncUserInfo()
            })
        });
        return !1
    });
    a.find("#f_vacation_start_cancel").click(function () {
        $("#f_vacation_start").hide();
        return !1
    });
    a.find("#f_vacation_start_confirm").click(function () {
        var a = parseInt($("#f_content4_vacation_length").val());
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, {
            key: key,
            action: "vacation_start",
            days: a,
            city: mainStatus.getCity().id
        }, function (a) {
            $("#f_content4_vacation_cd").hide();
            $("#f_content4_vacation_do").hide();
            $("#f_content4_vacation_clock b").text(Utils.timeString2(a.ret[1]));
            $("#f_content4_vacation_clock").show();
            $("#f_vacation_start").hide();
            showInfo(LNG.SUCCESS);
            userinfo.status = a.ret[0];
            resyncUserInfo()
        });
        return !1
    });
    $("#f_content4_vacation_length").change(function () {
        var a = 2E5;
        14 == parseInt($("#f_content4_vacation_length").val()) && (a = 5E5);
        $("#f_content4_vacation_resgold b").text(a);
        return !1
    });
    a.find("#f_content4_durab_do").click(function () {
        var b = mainStatus.getCity();
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CITYINFO, {
            key: key,
            city: b.id,
            action: "op_pop"
        }, function (b) {
            mainStatus.CITY_INFO[25] = b.ret[0];
            mainStatus.CITY_INFO[2] = b.ret[2];
            a.find("#f_content4_durab_do").hide();
            a.find("#f_content4_durab_cd").show();
            a.find("#f_content4_durab_cd p").text(Utils.timeString(b.ret[1]));
            showInfo(LNG.SUCCESS)
        });
        return !1
    });
    a.find("#f_content4_abandon_castle_do").click(function () {
        if ("undefined" == typeof LNG.CONFIRMABANDONCASTLE) LNG.CONFIRMABANDONCASTLE = "You will abandon this castle, are you sure to proceed?";
        showConfirm(LNG.CONFIRMABANDONCASTLE, function () {
            var b = mainStatus.getCity();
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CITYINFO, {
                key: key,
                city: b.id,
                action: "abandon"
            }, function (b) {
                mainStatus.CITY_INFO[24] = b.ret.cd;
                a.find("#f_content4_abandon_castle_do").hide();
                a.find("#f_content4_abandon_castle_cancel").show();
                $("#f_content4_abandon_castle_cd p").text(Utils.timeString(mainStatus.CITY_INFO[24]))
            })
        });
        return !1
    });
    a.find("#f_content4_abandon_castle_cancel").click(function () {
        var b = mainStatus.getCity();
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CITYINFO, {
            key: key,
            city: b.id,
            action: "cancel_abandon"
        }, function () {
            mainStatus.CITY_INFO[24] = 0;
            a.find("#f_content4_abandon_castle_do").show();
            a.find("#f_content4_abandon_castle_cancel").hide();
            $("#f_content4_abandon_castle_cd p").text("")
        });
        return !1
    });
    a.find("#f_close").click(function () {
        showCity();
        return !1
    });
    a.find("#f_city_house_more").click(function () {
        a.find("#f_city_defense_ops").hide();
        a.find("#f_city_hero_ops").hide();
        a.find("#f_city_military_ops").hide();
        a.find("#f_city_research_ops").hide();
        a.find("#f_city_gold_ops").hide();
        a.find("#f_city_iron_ops").hide();
        a.find("#f_city_food_ops").hide();
        a.find("#f_city_wood_ops").hide();
        a.find("#f_city_office_ops").hide();
        a.find("#f_city_storage_ops").hide();
        a.find("#f_city_defense_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_hero_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_military_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_research_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_gold_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_iron_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_food_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_wood_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_office_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_storage_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_house_more").hasClass("plusbutton") ? (a.find("#f_city_house_ops").show(), a.find("#f_city_house_more").removeClass("plusbutton").addClass("minusbutton")) : (a.find("#f_city_house_ops").hide(), a.find("#f_city_house_more").removeClass("minusbutton").addClass("plusbutton"));
        return !1
    });
    a.find("#f_city_iron_more").click(function () {
        a.find("#f_city_defense_ops").hide();
        a.find("#f_city_hero_ops").hide();
        a.find("#f_city_military_ops").hide();
        a.find("#f_city_research_ops").hide();
        a.find("#f_city_gold_ops").hide();
        a.find("#f_city_house_ops").hide();
        a.find("#f_city_food_ops").hide();
        a.find("#f_city_wood_ops").hide();
        a.find("#f_city_office_ops").hide();
        a.find("#f_city_storage_ops").hide();
        a.find("#f_city_defense_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_hero_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_military_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_research_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_gold_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_house_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_food_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_wood_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_office_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_storage_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_iron_more").hasClass("plusbutton") ? (a.find("#f_city_iron_ops").show(), a.find("#f_city_iron_more").removeClass("plusbutton").addClass("minusbutton")) : (a.find("#f_city_iron_ops").hide(), a.find("#f_city_iron_more").removeClass("minusbutton").addClass("plusbutton"));
        return !1
    });
    a.find("#f_city_food_more").click(function () {
        a.find("#f_city_defense_ops").hide();
        a.find("#f_city_hero_ops").hide();
        a.find("#f_city_military_ops").hide();
        a.find("#f_city_research_ops").hide();
        a.find("#f_city_gold_ops").hide();
        a.find("#f_city_iron_ops").hide();
        a.find("#f_city_house_ops").hide();
        a.find("#f_city_wood_ops").hide();
        a.find("#f_city_office_ops").hide();
        a.find("#f_city_storage_ops").hide();
        a.find("#f_city_defense_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_hero_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_military_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_research_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_gold_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_iron_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_house_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_wood_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_office_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_storage_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_food_more").hasClass("plusbutton") ? (a.find("#f_city_food_ops").show(), a.find("#f_city_food_more").removeClass("plusbutton").addClass("minusbutton")) : (a.find("#f_city_food_ops").hide(), a.find("#f_city_food_more").removeClass("minusbutton").addClass("plusbutton"));
        return !1
    });
    a.find("#f_city_wood_more").click(function () {
        a.find("#f_city_defense_ops").hide();
        a.find("#f_city_hero_ops").hide();
        a.find("#f_city_military_ops").hide();
        a.find("#f_city_research_ops").hide();
        a.find("#f_city_gold_ops").hide();
        a.find("#f_city_iron_ops").hide();
        a.find("#f_city_food_ops").hide();
        a.find("#f_city_house_ops").hide();
        a.find("#f_city_office_ops").hide();
        a.find("#f_city_storage_ops").hide();
        a.find("#f_city_defense_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_hero_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_military_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_research_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_gold_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_iron_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_food_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_house_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_office_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_storage_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_wood_more").hasClass("plusbutton") ? (a.find("#f_city_wood_ops").show(), a.find("#f_city_wood_more").removeClass("plusbutton").addClass("minusbutton")) : (a.find("#f_city_wood_ops").hide(), a.find("#f_city_wood_more").removeClass("minusbutton").addClass("plusbutton"));
        return !1
    });
    a.find("#f_city_office_more").click(function () {
        a.find("#f_city_defense_ops").hide();
        a.find("#f_city_hero_ops").hide();
        a.find("#f_city_military_ops").hide();
        a.find("#f_city_research_ops").hide();
        a.find("#f_city_gold_ops").hide();
        a.find("#f_city_iron_ops").hide();
        a.find("#f_city_food_ops").hide();
        a.find("#f_city_wood_ops").hide();
        a.find("#f_city_house_ops").hide();
        a.find("#f_city_storage_ops").hide();
        a.find("#f_city_defense_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_hero_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_military_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_research_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_gold_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_iron_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_food_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_wood_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_house_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_storage_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_office_more").hasClass("plusbutton") ? (a.find("#f_city_office_ops").show(), a.find("#f_city_office_more").removeClass("plusbutton").addClass("minusbutton")) : (a.find("#f_city_office_ops").hide(), a.find("#f_city_office_more").removeClass("minusbutton").addClass("plusbutton"));
        return !1
    });
    a.find("#f_city_storage_more").click(function () {
        a.find("#f_city_defense_ops").hide();
        a.find("#f_city_hero_ops").hide();
        a.find("#f_city_military_ops").hide();
        a.find("#f_city_research_ops").hide();
        a.find("#f_city_gold_ops").hide();
        a.find("#f_city_iron_ops").hide();
        a.find("#f_city_food_ops").hide();
        a.find("#f_city_wood_ops").hide();
        a.find("#f_city_office_ops").hide();
        a.find("#f_city_house_ops").hide();
        a.find("#f_city_defense_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_hero_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_military_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_research_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_gold_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_iron_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_food_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_wood_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_office_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_house_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_storage_more").hasClass("plusbutton") ? (a.find("#f_city_storage_ops").show(), a.find("#f_city_storage_more").removeClass("plusbutton").addClass("minusbutton")) : (a.find("#f_city_storage_ops").hide(), a.find("#f_city_storage_more").removeClass("minusbutton").addClass("plusbutton"));
        return !1
    });
    a.find("#f_city_gold_more").click(function () {
        a.find("#f_city_defense_ops").hide();
        a.find("#f_city_hero_ops").hide();
        a.find("#f_city_military_ops").hide();
        a.find("#f_city_research_ops").hide();
        a.find("#f_city_house_ops").hide();
        a.find("#f_city_iron_ops").hide();
        a.find("#f_city_food_ops").hide();
        a.find("#f_city_wood_ops").hide();
        a.find("#f_city_office_ops").hide();
        a.find("#f_city_storage_ops").hide();
        a.find("#f_city_defense_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_hero_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_military_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_research_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_house_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_iron_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_food_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_wood_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_office_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_storage_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_gold_more").hasClass("plusbutton") ? (a.find("#f_city_gold_ops").show(), a.find("#f_city_gold_more").removeClass("plusbutton").addClass("minusbutton")) : (a.find("#f_city_gold_ops").hide(), a.find("#f_city_gold_more").removeClass("minusbutton").addClass("plusbutton"));
        return !1
    });
    a.find("#f_city_research_more").click(function () {
        a.find("#f_city_defense_ops").hide();
        a.find("#f_city_hero_ops").hide();
        a.find("#f_city_military_ops").hide();
        a.find("#f_city_house_ops").hide();
        a.find("#f_city_gold_ops").hide();
        a.find("#f_city_iron_ops").hide();
        a.find("#f_city_food_ops").hide();
        a.find("#f_city_wood_ops").hide();
        a.find("#f_city_office_ops").hide();
        a.find("#f_city_storage_ops").hide();
        a.find("#f_city_defense_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_hero_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_military_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_house_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_gold_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_iron_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_food_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_wood_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_office_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_storage_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_research_more").hasClass("plusbutton") ? (a.find("#f_city_research_ops").show(), a.find("#f_city_research_more").removeClass("plusbutton").addClass("minusbutton")) : (a.find("#f_city_research_ops").hide(), a.find("#f_city_research_more").removeClass("minusbutton").addClass("plusbutton"));
        return !1
    });
    a.find("#f_city_military_more").click(function () {
        a.find("#f_city_defense_ops").hide();
        a.find("#f_city_hero_ops").hide();
        a.find("#f_city_house_ops").hide();
        a.find("#f_city_research_ops").hide();
        a.find("#f_city_gold_ops").hide();
        a.find("#f_city_iron_ops").hide();
        a.find("#f_city_food_ops").hide();
        a.find("#f_city_wood_ops").hide();
        a.find("#f_city_office_ops").hide();
        a.find("#f_city_storage_ops").hide();
        a.find("#f_city_defense_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_hero_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_house_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_research_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_gold_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_iron_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_food_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_wood_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_office_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_storage_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_military_more").hasClass("plusbutton") ? (a.find("#f_city_military_ops").show(), a.find("#f_city_military_more").removeClass("plusbutton").addClass("minusbutton")) : (a.find("#f_city_military_ops").hide(), a.find("#f_city_military_more").removeClass("minusbutton").addClass("plusbutton"));
        return !1
    });
    a.find("#f_city_hero_more").click(function () {
        a.find("#f_city_defense_ops").hide();
        a.find("#f_city_house_ops").hide();
        a.find("#f_city_military_ops").hide();
        a.find("#f_city_research_ops").hide();
        a.find("#f_city_gold_ops").hide();
        a.find("#f_city_iron_ops").hide();
        a.find("#f_city_food_ops").hide();
        a.find("#f_city_wood_ops").hide();
        a.find("#f_city_office_ops").hide();
        a.find("#f_city_storage_ops").hide();
        a.find("#f_city_defense_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_house_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_military_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_research_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_gold_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_iron_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_food_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_wood_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_office_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_storage_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_hero_more").hasClass("plusbutton") ? (a.find("#f_city_hero_ops").show(), a.find("#f_city_hero_more").removeClass("plusbutton").addClass("minusbutton")) : (a.find("#f_city_hero_ops").hide(), a.find("#f_city_hero_more").removeClass("minusbutton").addClass("plusbutton"));
        return !1
    });
    a.find("#f_city_defense_more").click(function () {
        a.find("#f_city_house_ops").hide();
        a.find("#f_city_hero_ops").hide();
        a.find("#f_city_military_ops").hide();
        a.find("#f_city_research_ops").hide();
        a.find("#f_city_gold_ops").hide();
        a.find("#f_city_iron_ops").hide();
        a.find("#f_city_food_ops").hide();
        a.find("#f_city_wood_ops").hide();
        a.find("#f_city_office_ops").hide();
        a.find("#f_city_storage_ops").hide();
        a.find("#f_city_house_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_hero_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_military_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_research_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_gold_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_iron_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_food_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_wood_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_office_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_storage_more").removeClass("minusbutton").addClass("plusbutton");
        a.find("#f_city_defense_more").hasClass("plusbutton") ? (a.find("#f_city_defense_ops").show(), a.find("#f_city_defense_more").removeClass("plusbutton").addClass("minusbutton")) : (a.find("#f_city_defense_ops").hide(), a.find("#f_city_defense_more").removeClass("minusbutton").addClass("plusbutton"));
        return !1
    });
    a.find("#f_city_defense_down").click(function () {
        c(12)
    });
    a.find("#f_city_hero_down").click(function () {
        c(10)
    });
    a.find("#f_city_military_down").click(function () {
        c(8)
    });
    a.find("#f_city_research_down").click(function () {
        c(9)
    });
    a.find("#f_city_gold_down").click(function () {
        c(3)
    });
    a.find("#f_city_iron_down").click(function () {
        c(2)
    });
    a.find("#f_city_food_down").click(function () {
        c(4)
    });
    a.find("#f_city_wood_down").click(function () {
        c(1)
    });
    a.find("#f_city_office_down").click(function () {
        c(13)
    });
    a.find("#f_city_storage_down").click(function () {
        c(11)
    });
    a.find("#f_city_house_down").click(function () {
        c(5)
    });
    a.find("#f_city_downtown_goto").click(function () {
        $("#f_tab1").click();
        return !1
    });
    a.find("#f_city_res_goto").click(function () {
        main_loadDiv("f_city_resource.html");
        return !1
    });
    a.find("#f_city_research_goto").click(function () {
        main_loadDiv("f_city_research.html");
        return !1
    });
    a.find("#f_city_military_goto").click(function () {
        main_loadDiv("f_city_military.html");
        return !1
    });
    a.find("#f_city_hero_goto").click(function () {
        main_loadDiv("f_city_hero.html");
        return !1
    });
    a.find("#f_city_defense_goto").click(function () {
        main_loadDiv("f_city_wall.html");
        return !1
    });
    a.find("#f_content3_buff_promotion").click(function () {
        l = !0;
        $("#f_content3").hide();
        showItemPromotion($("#f_city_center_promotion"), [{
            id: 166,
            shop: 1
        }, {
            id: 167,
            shop: 1
        }, {
            id: 80,
            shop: 1
        }, {
            id: 140,
            shop: 1
        }, {
            id: 141,
            shop: 1
        }, {
            id: 142,
            shop: 1
        }, {
            id: 143,
            shop: 1
        }, {
            id: 144,
            shop: 1
        }, {
            id: 145,
            shop: 1
        }, {
            id: 146,
            shop: 1
        }, {
            id: 147,
            shop: 1
        }, {
            id: 148,
            shop: 1
        }, {
            id: 125,
            shop: 1
        }], function (a) {
            0 < a && w();
            l = !1;
            $("#f_content3").show()
        }, !1)
    });
    a.find("#f_content3_land_promotion").click(function () {
        l = !0;
        $("#f_content3").hide();
        showItemPromotion($("#f_city_center_promotion"), [{
            id: 128,
            shop: 1
        }], function (a) {
            l = !1;
            $("#f_content3").show();
            if (0 < a) {
                var b = function () {
                        t.unbind(b);
                        n()
                    };
                t.bind("cityinfoupdate", b)
            }
        }, !1);
        null != k && (k.refresh(), k.setPosition(0, 0))
    });
    a.find("#f_content3_wood_promotion").click(function () {
        l = !0;
        $("#f_content3").hide();
        showItemPromotion($("#f_city_center_promotion"), [{
            id: 123,
            shop: 1
        }, {
            id: 119,
            shop: 1
        }, {
            id: 120,
            shop: 1
        }], function (a) {
            l = !1;
            0 < a && (w(), n());
            $("#f_content3").show()
        }, !1);
        null != k && (k.refresh(), k.setPosition(0, 0))
    });
    a.find("#f_content3_food_promotion").click(function () {
        l = !0;
        $("#f_content3").hide();
        showItemPromotion($("#f_city_center_promotion"), [{
            id: 126,
            shop: 1
        }, {
            id: 119,
            shop: 1
        }, {
            id: 120,
            shop: 1
        }], function (a) {
            l = !1;
            0 < a && (w(), n());
            $("#f_content3").show()
        }, !1);
        null != k && (k.refresh(), k.setPosition(0, 0))
    });
    a.find("#f_content3_gold_promotion").click(function () {
        l = !0;
        $("#f_content3").hide();
        showItemPromotion($("#f_city_center_promotion"), [{
            id: 129,
            shop: 1
        }, {
            id: 119,
            shop: 1
        }, {
            id: 120,
            shop: 1
        }, {
            id: 112,
            shop: 1
        }, {
            id: 131,
            shop: 1
        }], function (a) {
            l = !1;
            $("#f_content3").show();
            0 < a && (w(), n())
        }, !1);
        null != k && (k.refresh(), k.setPosition(0, 0))
    });
    a.find("#f_content3_iron_promotion").click(function () {
        l = !0;
        $("#f_content3").hide();
        showItemPromotion($("#f_city_center_promotion"), [{
            id: 121,
            shop: 1
        }, {
            id: 119,
            shop: 1
        }, {
            id: 120,
            shop: 1
        }], function (a) {
            l = !1;
            0 < a && (w(), n());
            $("#f_content3").show()
        }, !1);
        null != k && (k.refresh(), k.setPosition(0, 0))
    });
    a.find("#f_vacation_more_close").click(function () {
        $("#f_vacation_more").hide()
    });
    a.find("#f_content4_vacation_detail").click(function () {
        $("#f_vacation_more").show()
    });
    a.css("background-image", "url(img/bg/view.jpg)");
    (function () {
        "undefined" != typeof statinfo.ce && null != statinfo.ce && 1 == statinfo.ce ? $("#f_tab2").show() : $("#f_tab2").hide();
        var a = Utils.getCookie("page");
        null != a && "" != a && ($("#" + a).click(), Utils.delCookie("page"));
        k = new iScroll("scroller", {
            desktopCompatibility: !0
        });
        "undefined" != typeof mainStatus.SNAME && null != mainStatus.SNAME ? ($("#f_city_center_info b").text(mainStatus.SNAME), pnlLoading.hide()) : (a = CONFIG.MASTER_NAMING, a = "undefined" == typeof a || null == a ? CONFIG.MASTERHOST + "naming.php" : CONFIG.MASTERHOST + a, ajaxCall(a, {
            s: CONFIG.MYHOST.substring(7, CONFIG.MYHOST.length - 1)
        }, function (a) {
            mainStatus.SNAME = a.ret;
            $("#f_city_center_info b").text(mainStatus.SNAME)
        }))
    })()
});
defineSubView("f_city_hero", function () {
    function w(a) {
        var b = mainStatus.ITEM_DATA[a.sid];
        if (!("undefined" == typeof b || null == b)) {
            var c = null;
            1 == b.type ? (c = $("#f_sample_hero_slot_weapon"), $("#f_sample_hero_slot_weapon_txt").hide()) : 2 == b.type ? (c = $("#f_sample_hero_slot_armor"), $("#f_sample_hero_slot_armor_txt").hide()) : 3 == b.type ? (c = $("#f_sample_hero_slot_mount"), $("#f_sample_hero_slot_mount_txt").hide()) : 4 == b.type || 5 == b.type ? (c = $("#f_sample_hero_slot_book"), $("#f_sample_hero_slot_book_txt").hide()) : 6 == b.type && (c = $("#f_sample_hero_slot_ring"), $("#f_sample_hero_slot_ring_txt").hide());
            null != c && (c.css("background-image", "url(img/item/sample.gif)"), Utils.loadImage(c, Utils.getItemImage(a.sid)))
        }
    }
    function regenGenAbility() {
        pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
            key: key,
            city: mainStatus.getCity().id,
            action: "gen_list"
        }, function (a) {
            q = a.ret.hero;
        })
    }
    function s(a) {
        regenGenAbility();
        var genA = o;
        $.each(q, function(index, value) {
            if (a.id == value.id) {
                genA = value;
                return;
               }
        });
        
        var b = mainStatus.HERO_DATA[a.gid];
        if ("undefined" == typeof b || null == b) showInfo(LNG.ERROR.CLIENT.NEEDUPDATE);
        else if ($("#f_content3_info_rank").attr("src", Utils.getHeroRankImage(b.race, b.rank)), Utils.loadImage($("#f_content3_info_img"), Utils.getHeroImage(a.gid)), $("#f_content3_info_name").text(b.name), $("#f_content3_info_level").text(a.g), 0 < a.w ? $("#f_content3_info_winning").html(translate(LNG.ARENAWINNING, a.w)) : $("#f_content3_info_winning").html(""), $("#f_content3_info_intro").html(b.desc), $("#f_content3_info_power b").text(a.p + "/" + genA.np), $("#f_content3_info_wisdom b").text(a.i + "/" + genA.ni), $("#f_content3_info_charisma b").text(a.c1  + "/" + genA.nc1 + "/" + genA.nc2), $("#f_content3_info_loyalty b").text(a.f), $("#f_content3_info_vigor b").text(a.e), $("#f_content3_info_exp").text(a.ex), $("#f_content3_info_texp").text(a.te), $("#f_content3_info_status p b").text(1 == a.fy ? LNG.HEROGUARD : LNG.HEROSTATE[a.s]), $("#f_content3_info_twin").text(a.tw), $("#f_content3_info_tlose").text(a.tl), 2 == a.s) $("#f_content3_fire").show(), $("#f_content3_reward").hide(), $("#f_content3_goarena").hide(), $("#f_content3_resurrect").show(), $("#f_content3_move_to").hide(), $("#f_content3_move_cities").hide(), $("#f_content3_info_vigor_promotion").hide();
        else if (0 == a.s && 0 == a.fy) if ($("#f_content3_fire").show(), $("#f_content3_reward").show(), $("#f_content3_goarena").show(), $("#f_content3_resurrect").hide(), $("#f_content3_info_vigor_promotion").show(), 1 < userinfo.city.length) {
            $("#f_content3_move_to").show();
            $("#f_content3_move_cities").show();
            $("#f_content3_move_cities").empty().unbind();
            for (a = 0; a < userinfo.city.length; a++) b = userinfo.city[a], b.id != mainStatus.getCity().id && ($("#f_content3_move_cities").append('<OPTION VALUE="' + a + '">' + b.name + " (" + b.x + "/" + b.y + ")</OPTION>"), window.selectProxy.proxySelect($("#f_content3_move_cities")[0]))
        } else $("#f_content3_move_to").hide(), $("#f_content3_move_cities").hide();
        else $("#f_content3_fire").hide(), $("#f_content3_reward").show(), $("#f_content3_goarena").show(), $("#f_content3_resurrect").hide(), $("#f_content3_move_to").hide(), $("#f_content3_move_cities").hide(), $("#f_content3_info_vigor_promotion").show()
    }
    function n(a) {
        x = a;
        a = q[a];
        $("#f_sample_hero_slot_weapon").css("background-image", "");
        $("#f_sample_hero_slot_weapon_txt").show();
        $("#f_sample_hero_slot_armor").css("background-image", "");
        $("#f_sample_hero_slot_armor_txt").show();
        $("#f_sample_hero_slot_ring").css("background-image", "");
        $("#f_sample_hero_slot_ring_txt").show();
        $("#f_sample_hero_slot_mount").css("background-image", "");
        $("#f_sample_hero_slot_mount_txt").show();
        $("#f_sample_hero_slot_book").css("background-image", "");
        $("#f_sample_hero_slot_book_txt").show();
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
            key: key,
            city: mainStatus.getCity().id,
            id: a.id,
            action: "list_gen_item"
        }, function (a) {
            j = a.ret.heroitem;
            for (a = 0; a < j.length; a++) w(j[a].item)
        });
        s(a);
        $("#f_content3").hide();
        $("#f_content3_info").show();
        b();
        return !1
    }
    function v() {
        null != f && 0 < f.length ? ($("#f_content3_item_available").empty().unbind(), $.each(f, function (a, b) {
            var c = mainStatus.ITEM_DATA[b.sid];
            if (!("undefined" == typeof c || null == c)) {
                var d = LNG.ITEMRANK[c.rank],
                    e = c.desc;
                if ("undefined" != typeof b.attr && null != b.attr) for (var f = 0; f < b.attr.length; f++) 0 != b.attr[f] && (e = translate(e, b.attr[f]));
                c = '<div style="position:relative;height: 60px;"><div id="f_content3_item_available_img' + b.id + '" class="itemicon1" style="top: 5px; left: 10px;"></div><div class="tooltip2" style="left: 70px; top: 5px; width: 400px; height:50px"><p><b><font color="' + d.color + '">' + c.name + '</font></b>&nbsp;<strong>(<font color="' + d.color + '">' + d.name + "</font>)</strong>&nbsp;<b>" + (0 < b.up ? "+" + b.up : "") + '</b></p><p style="position:relative;top:6px;">' + e + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 240px;"><li><em class="gold"></em><b>' + c.price + '</b></li></ul><div id="f_content3_item_available' + b.id + '" class="funcbutton" style="top: -3px; left: 330px;">' + LNG.PUT_ON + "</div></div></div>";
                $("#f_content3_item_available").append(c);
                Utils.loadImage($("#f_content3_item_available_img" + b.id), Utils.getItemImage(b.sid));
                $("#f_content3_item_available" + b.id + "").click(function () {
                    return k(a)
                })
            }
        })) : $("#f_content3_item_available").html('<br>&nbsp;<b><font class="font14">N/A</font></b><br><br>')
    }
    function c() {
        var a = null;
        l = null;
        z = 0;
        if (1 == i) for (var b = 0; b < j.length; b++) {
            var c = mainStatus.ITEM_DATA[j[b].item.sid];
            if (!("undefined" == typeof c || null == c) && 1 == c.type) {
                l = j[b].item;
                a = c;
                z = b;
                break
            }
        } else if (2 == i) for (b = 0; b < j.length; b++) {
            if (c = mainStatus.ITEM_DATA[j[b].item.sid], !("undefined" == typeof c || null == c) && 2 == c.type) {
                l = j[b].item;
                a = c;
                z = b;
                break
            }
        } else if (3 == i) for (b = 0; b < j.length; b++) {
            if (c = mainStatus.ITEM_DATA[j[b].item.sid], !("undefined" == typeof c || null == c) && 3 == c.type) {
                l = j[b].item;
                a = c;
                z = b;
                break
            }
        } else if (4 == i) for (b = 0; b < j.length; b++) {
            if (c = mainStatus.ITEM_DATA[j[b].item.sid], !("undefined" == typeof c || null == c)) if (4 == c.type || 5 == c.type) {
                l = j[b].item;
                a = c;
                z = b;
                break
            }
        } else if (5 == i) for (b = 0; b < j.length; b++) if (c = mainStatus.ITEM_DATA[j[b].item.sid], !("undefined" == typeof c || null == c) && 6 == c.type) {
            l = j[b].item;
            a = c;
            z = b;
            break
        }
        if (null != l) {
            Utils.loadImage($("#f_content3_item_active_icon"), Utils.getItemImage(l.sid));
            b = LNG.ITEMRANK[a.rank];
            c = a.desc;
            if ("undefined" != typeof l.attr && null != l.attr) for (var d = 0; d < l.attr.length; d++) 0 != l.attr[d] && (c = translate(c, l.attr[d]));
            $("#f_content3_item_active_name b font").text(a.name);
            $("#f_content3_item_active_name b font").css("color", b.color);
            $("#f_content3_item_active_name strong font").text(b.name);
            $("#f_content3_item_active_name strong font").css("color", b.color);
            0 < l.up ? $("#f_content3_item_active_name strong span").text("+" + l.up) : $("#f_content3_item_active_name strong span").text("");
            $("#f_content3_item_active_info").html(c);
            $("#f_content3_item_active_price b").text(a.price);
            $("#f_content3_item_active").show()
        } else $("#f_content3_item_active").hide()
    }
    function k(a) {
        var b = o;
        null != q && x < q.length && (b = q[x]);
        if (null == b) return !1;
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
            key: key,
            city: mainStatus.getCity().id,
            id: b.id,
            slot: i,
            i_id: f[a].id,
            action: "item_equip"
        }, function (d) {
            b.p = d.ret.hero.p;
            b.i = d.ret.hero.i;
            b.c1 = d.ret.hero.c1;
            b.c2 = d.ret.hero.c2;
            b.np = d.ret.hero.np;
            b.ni = d.ret.hero.ni;
            b.nc1 = d.ret.hero.nc1;
            b.nc2 = d.ret.hero.nc2;
            $("#f_content3_info_power b").text(b.p);
            $("#f_content3_info_wisdom b").text(b.i);
            $("#f_content3_info_charisma b").text(b.c1);
            d = null;
            if (1 == i) for (var e = 0; e < j.length; e++) {
                var p = mainStatus.ITEM_DATA[j[e].item.sid];
                if (!("undefined" == typeof p || null == p) && 1 == p.type) {
                    d = j[e];
                    break
                }
            } else if (2 == i) for (e = 0; e < j.length; e++) {
                if (p = mainStatus.ITEM_DATA[j[e].item.sid], !("undefined" == typeof p || null == p) && 2 == p.type) {
                    d = j[e];
                    break
                }
            } else if (3 == i) for (e = 0; e < j.length; e++) {
                if (p = mainStatus.ITEM_DATA[j[e].item.sid], !("undefined" == typeof p || null == p) && 3 == p.type) {
                    d = j[e];
                    break
                }
            } else if (4 == i) for (e = 0; e < j.length; e++) {
                if (p = mainStatus.ITEM_DATA[j[e].item.sid], !("undefined" == typeof p || null == p)) if (4 == p.type || 5 == p.type) {
                    d = j[e];
                    break
                }
            } else if (5 == i) for (e = 0; e < j.length; e++) if (p = mainStatus.ITEM_DATA[j[e].item.sid], !("undefined" == typeof p || null == p) && 6 == p.type) {
                d = j[e];
                break
            }
            null != d ? (e = d.item, d.item = f[a], f[a] = e) : (d = {
                id: 0,
                item: f[a]
            }, j.push(d), f.splice(a, 1));
            v();
            c();
            w(d.item)
        });
        return !1
    }
    function g() {
        var a = $("#f_content3_hero_list");
        a.empty().unbind();
        null != q && $.each(q, function (b, c) {
            var d = mainStatus.HERO_DATA[c.gid];
            if (!("undefined" == typeof d || null == d)) {
                var e = '<div style="position:relative; height:75px;"><div class="font12" style="left:0px; top: 0px; width: 70px;text-align:center;position:absolute;"><img id="f_content3_hero_list_img' + c.id + '" src="img/hero/sample.gif"/><br><b>' + d.name + '</b></div><img src="' + Utils.getHeroRankImage(d.race, d.rank) + '" style="position:absolute;left:5px;top:35px;"/><div class="font12" style="left:70px; top: 30px; width: 30px;text-align:center;position:absolute;">' + c.g + '</div><div class="font12" style="left:100px; top: 30px; width: 30px;text-align:center;position:absolute;">' + c.p + '</div><div class="font12" style="left:130px; top: 30px; width: 30px;text-align:center;position:absolute;">' + c.i + '</div><div class="font12" style="left:160px; top: 30px; width: 30px;text-align:center;position:absolute;">' + c.c1 + '</div><div id="f_content3_hero_fealty' + c.id + '" class="font12" style="left:190px; top: 30px; width: 30px;text-align:center;position:absolute;">' + c.f + '</div><div id="f_content3_hero_vigor' + c.id + '" class="font12" style="left:220px; top: 30px; width: 30px;text-align:center;position:absolute;">' + c.e + '</div><div class="font12" style="left:250px; top: 30px; width: 65px;text-align:center;position:absolute;">' + c.c2 + '</div><div class="font12" style="left:315px; top: 30px; width: 50px;text-align:left;position:absolute;">' + (1 == c.fy ? LNG.HEROGUARD : LNG.HEROSTATE[c.s]) + '</div><div id="f_content3_hero_ops" style="position:absolute;top:25px;left: 210px;display:none;">';
                2 != c.s && (e += '<div id="f_content3_hero_arena' + c.id + '" class="funcbutton" style="top:0px;left:0px;">' + LNG.HERO_ARENA + '</div><div id="f_content3_hero_reward' + c.id + '" class="funcbutton" style="top: 0px;left:70px;">' + LNG.HERO_REWARD + "</div>");
                var e = e + ('<div id="f_content3_hero_list' + c.id + '" class="funcbutton" style="top: 0px;left:140px;">' + LNG.HERO_MANAGE + '</div></div><div id="f_content3_hero_more" class="plusbutton" style="top: 25px; left: 410px;"></div></div>'),
                    f = $(e);
                a.append(f);
                Utils.loadImage2($("#f_content3_hero_list_img" + c.id), Utils.getHeroImage(c.gid));
                f.find("#f_content3_hero_more").click(function () {
                    a.find("#f_content3_hero_ops").hide();
                    a.find("#f_content3_hero_more.minusbutton").not(this).removeClass("minusbutton").addClass("plusbutton");
                    f.find("#f_content3_hero_more").hasClass("plusbutton") ? (f.find("#f_content3_hero_ops").show(), f.find("#f_content3_hero_more").removeClass("plusbutton").addClass("minusbutton")) : f.find("#f_content3_hero_more").removeClass("minusbutton").addClass("plusbutton");
                    return !1
                });
                $("#f_content3_hero_list" + c.id).click(function () {
                    return n(b)
                });
                2 != c.s && ($("#f_content3_hero_arena" + c.id).click(function () {
                    if (0 >= c.e) return showInfo(translate(LNG.NOVIGOR, d.name)), !1;
                    G = 1;
                    pnlLoading.show();
                    ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
                        key: key,
                        lv: c.g + 1
                    }, function (a) {
                        if (null == a.ret.hero || 0 == a.ret.hero.length) showInfo(LNG.ERROR.CLIENT.NOMATCHARENA);
                        else {
                            var b = $("#f_content3_arena_list");
                            b.html("");
                            $.each(a.ret.hero, function (a, h) {
                                var e = mainStatus.HERO_DATA[h.gid];
                                if (!("undefined" == typeof e || null == e)) {
                                    var f = $('<div style="position:relative; height:75px;"><div class="font12" style="left:0px; top: 0px; width: 70px;text-align:center;position:absolute;"><img id="f_content3_arena_list_img' + h.id + '" src="img/hero/sample.gif"/><br><b>' + e.name + '</b></div><img src="' + Utils.getHeroRankImage(e.race, e.rank) + '" style="position:absolute;left:5px;top:35px;"/><div class="font12" style="left:70px; top: 30px; width: 40px;text-align:center;position:absolute;">' + h.g + '</div><div class="font12" style="left:110px; top: 30px; width: 30px;text-align:center;position:absolute;">' + h.w + '</div><ul class="reshead" style="position:absolute;left:150px;top:20px;"><li><em class="race' + h.r + '"></em><b>' + h.u + "</b></li>" + (0 >= h.gflag || "" == h.gname ? "" : '<li><em class="guild" style="background-image:url(' + Utils.getFlag(h.gflag) + ')"></em><b>' + h.gname + "</b></li>") + '</ul><div id="f_content3_arena_list' + h.id + '" class="funcbutton" style="top: 17px; left: 390px;">' + LNG.HERO_FIGHT + "</div></div>");
                                    b.append(f);
                                    Utils.loadImage2(b.find("#f_content3_arena_list_img" + h.id), Utils.getHeroImage(h.gid));
                                    b.find("#f_content3_arena_list" + h.id).click(function () {
                                        $("#f_content3_arena_fight").show();
                                        $("#f_content3_arena_fight p").show();
                                        $("#f_content3_arena_fight_my img").attr("src", Utils.getHeroImage(c.gid));
                                        $("#f_content3_arena_fight_my b").text(d.name);
                                        $("#f_content3_arena_fight_enemy img").attr("src", Utils.getHeroImage(h.gid));
                                        $("#f_content3_arena_fight_enemy b").text(e.name);
                                        setTimeout(function () {
                                            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
                                                key: key,
                                                gid: c.id,
                                                tgid: h.id
                                            }, function (a) {
                                                c.e--;
                                                //0 < a.ret.win ? (c.w++, c.tw++, b.find("#f_content3_arena_list" + h.id).unbind().remove()) : (c.w = 0, c.tl++);
                                                var fightResult;
                                                if (0 < a.ret.win) {
                                                	(c.w++, c.tw++);
                                                	fightResult = "[" + c.ex + "/" + c.te + "/"+c.id+"/"+h.id+"]";
                                                } else {
                                                	(c.w = 0, c.tl++);
                                                	fightResult = "";
                                                }
                                                c.ex += a.ret.exp;
                                                $("#f_content3_hero_vigor" + c.id).text(c.e);
                                                $("#f_content3_arena_fight p").hide();
                                                
                                                a = translate(LNG.ARENARESULT[3 + a.ret.win], a.ret.exp, d.name);
                                                showInfo(a + fightResult, function () {
                                                    $("#f_content3_arena_fight").hide()
                                                })
                                            }, function () {
                                                $("#f_content3_arena_fight").hide()
                                            })
                                        }, 500);
                                        return !1
                                    })
                                }
                            });
                            $("#f_content3").hide();
                            $("#f_content3_arena").show();
                            null != m && (m.refresh(), m.setPosition(0, 0))
                        }
                    });
                    return !1
                }), $("#f_content3_hero_reward" + c.id).click(function () {
                    if (100 <= c.f) return showInfo(LNG.ERROR.CLIENT.HEROMAXLOYALTY), !1;
                    if (1E3 > mainStatus.CITY_INFO[2]) showInfo(LNG.ERROR.CLIENT.GOLDNOTENOUGH);
                    else return showConfirm(translate(LNG.CONFIRMREWARD, d.name), function () {
                        pnlLoading.show();
                        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
                            key: key,
                            id: c.id,
                            action: "give",
                            city: mainStatus.getCity().id,
                            golds: 1E3
                        }, function (a) {
                            c.f = a.ret.fealty;
                            mainStatus.CITY_INFO[2] -= 1E3;
                            $("#f_content3_hero_fealty" + c.id).text(c.f);
                            showInfo(LNG.SUCCESS)
                        })
                    }), !1
                }))
            }
        })
    }
    function a() {
        null == q ? (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
            key: key,
            city: mainStatus.getCity().id,
            action: "gen_list"
        }, function (a) {
            q = a.ret.hero;
            g();
            null != m && (m.refresh(), m.setPosition(0, 0))
        })) : (g(), null != m && (m.refresh(), m.setPosition(0, 0)))
    }
    function t() {
        d.find("#f_content4_list").empty().unbind();
        null != O && $.each(O, function (a, b) {
            var c = mainStatus.HERO_DATA[b.gid];
            if ("undefined" != typeof c && null != c) {
                var e = '<div id="f_rumor' + b.gid + '" style="position:relative; height:80px;"><div id="f_rumor_img' + b.gid + '" class="icon1" style="top: 10px; left: 10px;"></div><img src="' + Utils.getHeroRankImage(c.race, c.rank) + '" style="position:absolute;left:10px;top:45px;"/><div class="tooltip2" style="left: 80px; top: 10px; width: 390px; height:68px;"><p><b>' + c.name + '</b>&nbsp;Lvl.<b>1</b></p><p style="position:relative;top:4px;">' + LNG.HERO_ATTACH + ":&nbsp;<b>" + b.a + "</b>&nbsp;&nbsp;&nbsp;" + LNG.HERO_DEFENCT + ":&nbsp;<b>" + b.d + "</b>&nbsp;&nbsp;&nbsp;" + LNG.HERO_WISDOM + ":&nbsp;<b>" + b.w + '</b></p><p style="position:relative;top:5px;">' + c.desc + "</p>",
                    e = e + ('<div class="tooltip2" style="top: 3px; left: 240px;"><p>' + LNG.HERO_CLUES + ":&nbsp;<b>" + b.num + "</b>/<b>" + b.max + "</b></p></div>"),
                    e = e + ('<div id="f_rumor_recruit' + b.gid + '" class="funcbutton" style="top: -3px; left: 320px;">'),
                    e = b.num >= b.max ? e + LNG.HERO_RECRUIT : e + LNG.HERO_IGNORE;
                d.find("#f_content4_list").append(e + "</div></div></div>");
                Utils.loadImage(d.find("#f_rumor_img" + b.gid), Utils.getHeroImage(b.gid));
                d.find("#f_rumor_recruit" + b.gid).click(function () {
                    var a = CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT;
                    b.num >= b.max ? (pnlLoading.show(), ajaxCall(a, {
                        key: key,
                        city: mainStatus.getCity().id,
                        action: "rumor_use",
                        gid: b.gid
                    }, function () {
                        $("#f_tab2").click();
                        showInfo(LNG.SUCCESS)
                    })) : showConfirm(translate(LNG.CONFIRMRUMORDEL, c.name), function () {
                        pnlLoading.show();
                        ajaxCall(a, {
                            key: key,
                            city: mainStatus.getCity().id,
                            action: "rumor_del",
                            gid: b.gid
                        }, function () {
                            $("#f_rumor" + b.gid).unbind().remove();
                            showInfo(LNG.SUCCESS)
                        })
                    })
                })
            }
        });
        d.find("#f_content4").show();
        null != m && (m.refresh(), m.setPosition(0, 0))
    }
    function u(a) {
        $("#f_content2_recruit").hide();
        var b = mainStatus.HERO_DATA[a.gid];
        "undefined" == typeof b || null == b ? showInfo(LNG.ERROR.CLIENT.NEEDUPDATE) : ($("#f_content2_info_rank").attr("src", Utils.getHeroRankImage(b.race, b.rank)), Utils.loadImage($("#f_content2_info_img"), Utils.getHeroImage(a.gid)), $("#f_content2_info_name").html(b.name), $("#f_content2_info_intro").html(b.desc), $("#f_content2_info_level").html(a.g), $("#f_content2_info_power b").html(a.p), $("#f_content2_info_wisdom b").html(a.i), $("#f_content2_info_charisma b").html(a.c1), $("#f_content2_info_troop b").html(a.c2), $("#f_content2_hire").show(), $("#f_hero_hire_okay").text(LNG.HEROHIRE), $("#f_hero_hire_okay").show())
    }
    function b() {
        var a = o;
        null != q && x < q.length && (a = q[x]);
        if (null == a) return !1;
        d.find("#f_content3_equip").is(":visible") ? (d.find("#f_content3_switch").text(LNG.ENLIGHTEN), 0 == a.ns && 0 < a.ncd ? (d.find("#f_content3_switch_cd").show(), d.find("#f_content3_switch_cd li b").html(Utils.timeString2(a.ncd) + "&nbsp;")) : d.find("#f_content3_switch_cd").hide()) : (d.find("#f_content3_switch").text(LNG.EQUIPMENT), d.find("#f_content3_switch_cd").hide(), d.find("#f_content3_old_power b").text(a.p), d.find("#f_content3_old_wisdom b").text(a.i), d.find("#f_content3_old_charisma b").text(a.c1), d.find("#f_content3_old_command b").text(a.c2), 0 == a.ns ? (d.find("#f_content3_new_power b").text("?"), d.find("#f_content3_new_wisdom b").text("?"), d.find("#f_content3_new_charisma b").text("?"), d.find("#f_content3_new_command b").text("?"), d.find("#f_content3_switch_accept").hide(), d.find("#f_content3_switch_reject").hide(), 0 == a.ncd ? (d.find("#f_content3_switch_cd2").hide(), d.find("#f_hero_switch_price ul li b").text(a.pr), d.find("#f_hero_switch_price").show(), d.find("#f_content3_switch_do").show()) : (d.find("#f_content3_switch_cd2 ul li b").text(Utils.timeString2(a.ncd)), d.find("#f_content3_switch_cd2").show(), d.find("#f_hero_switch_price").hide(), d.find("#f_content3_switch_do").hide())) : (d.find("#f_content3_new_power b").text(a.np), d.find("#f_content3_new_wisdom b").text(a.ni), d.find("#f_content3_new_charisma b").text(a.nc1), d.find("#f_content3_new_command b").text(a.nc2), d.find("#f_content3_switch_do").hide(), d.find("#f_hero_switch_price").hide(), d.find("#f_content3_switch_cd2").hide(), d.find("#f_content3_switch_accept").show(), d.find("#f_content3_switch_reject").show()))
    }
    function B(a) {
        var b = o;
        null != q && x < q.length && (b = q[x]);
        if (null == b) return !1;
        i = a;
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
            key: key,
            id: b.id,
            action: "list_item",
            slot: a,
            city: mainStatus.getCity().id
        }, function (a) {
            f = a.ret.item;
            v();
            c();
            d.find("#f_content3_item").show();
            d.find("#f_content3_info").hide();
            null != m && (m.refresh(), m.setPosition(0, 0))
        })
    }
    var m = null,
        C = $("#f_city_center_hero_script"),
        d = $(C.parent().get(0)),
        E = EMA.getProxy();
    d.bind("dispose", function () {
        null != m && (m.destroy(!1), m = null);
        Utils.removeCss("f_city_hero_css");
        E.dispose();
        d = E = null
    });
    var o = null,
        q = null,
        x = 0,
        j = null,
        i = 0,
        f = null,
        l = null,
        z = 0,
        G = 0,
        A = [{
            buildtype: 10,
            panel: d.find("#f_content1").find("#f_fac_hero")
        }],
        e = mainStatus.BUILDING_DATA,
        r = function (a) {
            var b = mainStatus.getCity(),
                c = e[a.buildtype],
                d = mainStatus.CITY_INFO.getLevel(a.buildtype),
                f = c.upgrade[d];
            if (f) 0 < d ? (c = LNG.CONFIRMBUILD, c = LNG.UPGRADE_CONFIRM, showConfirm(c, function () {
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
                    key: key,
                    city: b.id,
                    build_type: a.buildtype
                }, function (b) {
                    a.panel.find("#f_upgrade").hide();
                    a.panel.find("#f_build_promotion").show();
                    mainStatus.CITY_INFO[6] -= f.w;
                    mainStatus.CITY_INFO[2] -= f.g;
                    mainStatus.CITY_INFO[4] -= f.f;
                    mainStatus.CITY_INFO[8] -= f.i;
                    CMA.add(b.ret.cdlist)
                }, function (a) {
                    (704 == a || 707 == a) && CMA.reload()
                })
            })) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
                key: key,
                city: b.id,
                build_type: a.buildtype
            }, function (b) {
                a.panel.find("#f_upgrade").hide();
                a.panel.find("#f_build_promotion").show();
                mainStatus.CITY_INFO[6] -= f.w;
                mainStatus.CITY_INFO[2] -= f.g;
                mainStatus.CITY_INFO[4] -= f.f;
                mainStatus.CITY_INFO[8] -= f.i;
                CMA.add(b.ret.cdlist)
            }, function (a) {
                (704 == a || 707 == a) && CMA.reload()
            }))
        },
        H = [{
            id: 115,
            shop: 1
        }, {
            id: 116,
            shop: 1
        }, {
            id: 117,
            shop: 1
        }],
        F = [{
            id: 1001,
            shop: 1,
            icon: "gem.jpg",
            name: LNG.INSTANT_COMPLETE,
            desc: LNG.INSTANT_COMPLETE_DESC,
            price: 0
        }],
        p = function (a) {
            var b = CMA.getCD(1, a.buildtype);
            if (null != b) return a = (new Date).getTime(), a = Math.ceil((b.end - a) / 1E3), pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CD_PRICE, {
                type: b.cdtype,
                secs: a
            }, function (a) {
                D = !0;
                a = a.ret.price;
                0 < a ? F[0].price = a : F = null;
                $("#f_content1").hide();
                showItemPromotion($("#f_city_hero_promotion"), H, function (a) {
                    D = !1;
                    if (1001 == a) {
                        pnlLoading.show();
                        var c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO;
                        ajaxCall(c, {
                            key: key,
                            city: mainStatus.CITY_ID,
                            tid: b.id,
                            action: "build2"
                        }, function (a) {
                            userinfo.money = a.ret.money;
                            refreshUserInfo();
                            CMA.changeSecs(b.id, 0);
                            showInfo(LNG.SUCCESS)
                        })
                    } else 0 != a && (pnlLoading.show(), c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO, ajaxCall(c, {
                        key: key,
                        city: mainStatus.CITY_ID,
                        tid: b.id,
                        action: "build",
                        iid: a
                    }, function (a) {
                        CMA.changeSecs(b.id, a.ret.secs);
                        showInfo(LNG.SUCCESS)
                    }));
                    $("#f_content1").show()
                }, !0, F)
            }), !1
        },
        L = function (a, b) {
            if (e) {
                var c = e[a],
                    d = mainStatus.CITY_INFO.getLevel(a),
                    f = c.upgrade[d];
                f && (b.find("#f_title").html(c.name), Utils.loadImage(b.find("#f_img"), Utils.getBuildingImage(a)), b.find("#f_desc").html(c.desc), b.find("#f_level").html(d), b.find("#resfood b").html(f.f), mainStatus.CITY_INFO[4] < f.f && b.find("#resfood b").css("color", "#FFD17A"), b.find("#reswood b").html(f.w), mainStatus.CITY_INFO[6] < f.w && b.find("#reswood b").css("color", "#FFD17A"), b.find("#resiron b").html(f.i), mainStatus.CITY_INFO[8] < f.i && b.find("#resiron b").css("color", "#FFD17A"), b.find("#resgold b").html(f.g), mainStatus.CITY_INFO[2] < f.g && b.find("#resgold b").css("color", "#FFD17A"), f = buildtime(f.t, mainStatus.CITY_INFO[22]), "undefined" != typeof statinfo.vs && null != statinfo.vs && (f *= statinfo.vs), b.find("#clock b").html(Utils.timeString2(Math.ceil(f))), c.upgrade[d + 1] ? (b.find("#f_upgrade").show(), b.find("#f_build_promotion").hide()) : (b.find("#f_upgrade").hide(), b.find("#f_cd1").hide()))
            }
        },
        C = function () {
            $.each(A, function (a, b) {
                L(b.buildtype, b.panel)
            })
        },
        M = function (a, b) {
            $.each(A, function (a, c) {
                c.buildtype == b && L(c.buildtype, c.panel)
            })
        };
    $.each(A, function (a, b) {
        var c = b.panel,
            d = A[a].buildtype,
            e = c.find("#f_cd1 p"),
            f = c.find("#f_upgrade"),
            p = c.find("#f_build_promotion");
        E.bind(CMA.getTickEventId(1, d), function (a) {
            f.hide();
            p.show();
            e.html(Utils.timeString2(a))
        });
        E.bind(CMA.getDoneEventId(1, d), function () {
            M(f, d)
        })
    });
    C();
    (function () {
        $.each(A, function (a, b) {
            b.panel.find("#f_upgrade").click(function () {
                r(b);
                return !1
            });
            b.panel.find("#f_build_promotion").click(function () {
                p(b);
                return !1
            })
        })
    })();
    CMA.forceNotify();
    E.bind("cityinfoupdate", C);
    var D = !1;
    d.find(".tab_active,.tab_inactive").click(function (a) {
        !D && $(this).hasClass("tab_inactive") && (d.find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), d.find("#f_content1,#f_content2,#f_content3,#f_content3_info,#f_content3_item,#f_content3_arena,#f_content4").hide(), $(this).trigger("tab", a));
        return !1
    });
    var O = null;
    d.find("#f_tab4").bind("tab", function () {
        if ($("#f_content4").is(":visible")) return !1;
        d.css("background-image", "url(img/bg/view.jpg)");
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
            key: key,
            city: mainStatus.getCity().id,
            action: "rumors"
        }, function (a) {
            O = a.ret.hero;
            t()
        });
        return !1
    });
    d.find("#f_tab1").bind("tab", function () {
        if ($("#f_content1").is(":visible")) return !1;
        d.css("background-image", "url(img/bg/view.jpg)");
        d.find("#f_content1").show();
        null != m && (m.refresh(), m.setPosition(0, 0));
        return !1
    });
    d.find("#f_tab2").bind("tab", function () {
        if ($("#f_content2").is(":visible")) return !1;
        $("#content").css("background-image", "url(img/bg/inn2.jpg)");
        d.find("#f_content2").show();
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
            key: key,
            city: mainStatus.getCity().id
        }, function (a) {
            1 == a.ret.type ? (u(a.ret.hero), $("#f_hero_hire_refresh b").text(Utils.timeString2(a.ret.refresh)), $("#f_content2_refresh").show()) : 2 == a.ret.type ? ($("#f_content2_recruit").show(), $("#f_content2_hire").hide(), $("#f_hero_hire_refresh b").text(Utils.timeString2(a.ret.refresh)), $("#f_content2_refresh").show(), $("#f_hero_hire_okay").hide()) : 3 == a.ret.type && ($("#f_content2_recruit").show(), $("#f_content2_hire").hide(), $("#f_content2_refresh").hide(), $("#f_hero_hire_okay").text(LNG.HERORECRUIT), $("#f_hero_hire_okay").show());
            $("#f_hero_hire_price b").text(a.ret.price)
        }, function (a) {
            1303 == a && d.find("#f_tab1").click()
        });
        return !1
    });
    d.find("#f_tab3").bind("tab", function () {
        if ($("#f_content3").is(":visible") || $("#f_content3_info").is(":visible") || $("#f_content3_arena").is(":visible") || $("#f_content3_item").is(":visible") || $("#f_content3_arena_fight").is(":visible")) return !1;
        d.css("background-image", "url(img/bg/view.jpg)");
        d.find("#f_content3").show();
        a();
        return !1
    });
    d.find("#f_close").click(function () {
        if ($("#f_content3_arena_fight").is(":visible")) $("#f_content3_arena_fight").hide();
        else if ($("#f_content3_arena").is(":visible")) {
            var b = o;
            null != q && x < q.length && (b = q[x]);
            if (null == b) return showCity(), !1;
            0 == G ? (s(b), d.find("#f_content3_info").show()) : d.find("#f_content3").show();
            d.find("#f_content3_arena").hide();
            null != m && (m.refresh(), m.setPosition(0, 0))
        } else $("#f_content3_info").is(":visible") ? (a(), d.find("#f_content3").show(), d.find("#f_content3_info").hide(), null != m && (m.refresh(), m.setPosition(0, 0))) : $("#f_content3_item").is(":visible") ? (d.find("#f_content3_info").show(), d.find("#f_content3_item").hide()) : showCity();
        return !1
    });
    d.find("#f_content3_switch").click(function () {
        d.find("#f_content3_enlighten").toggle();
        d.find("#f_content3_equip").toggle();
        b();
        return !1
    });
    d.find("#f_content3_switch_cd2").click(function () {
        var a = o;
        null != q && x < q.length && (a = q[x]);
        if (null == a) return !1;
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
            key: key,
            id: a.id,
            action: "query"
        }, function (b) {
            b = [{
                id: 1001,
                shop: 1,
                icon: "gem.jpg",
                name: LNG.INSTANT_COMPLETE,
                desc: LNG.INSTANT_COMPLETE_DESC2,
                price: b.ret.gem
            }];
            D = !0;
            $("#f_content3_info").hide();
            showItemPromotion($("#f_city_hero_promotion"), [], function (b) {
                D = !1;
                1001 == b && (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
                    key: key,
                    id: a.id,
                    action: "refresh"
                }, function (b) {
                    a.ncd = 0;
                    d.find("#f_content3_switch_cd2").hide();
                    d.find("#f_hero_switch_price ul li b").text(a.pr);
                    d.find("#f_hero_switch_price").show();
                    d.find("#f_content3_switch_do").show();
                    userinfo.money = b.ret.money;
                    refreshUserInfo()
                }));
                $("#f_content3_info").show()
            }, !0, b)
        });
        return !1
    });
    d.find("#f_content3_switch_do").click(function () {
        var a = o;
        null != q && x < q.length && (a = q[x]);
        if (null == a) return !1;
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
            key: key,
            id: a.id,
            action: "reinit",
            city: mainStatus.getCity().id
        }, function (b) {
            a.np = b.ret.hero.p;
            a.ni = b.ret.hero.i;
            a.nc1 = b.ret.hero.c1;
            a.nc2 = b.ret.hero.c2;
            a.ncd = b.ret.hero.cd;
            a.ns = b.ret.hero.s;
            d.find("#f_content3_new_power b").text(a.np);
            d.find("#f_content3_new_wisdom b").text(a.ni);
            d.find("#f_content3_new_charisma b").text(a.nc1);
            d.find("#f_content3_new_command b").text(a.nc2);
            mainStatus.CITY_INFO[2] -= a.pr;
            d.find("#f_content3_switch_do").hide();
            d.find("#f_hero_switch_price").hide();
            d.find("#f_content3_switch_cd2").hide();
            d.find("#f_content3_switch_accept").show();
            d.find("#f_content3_switch_reject").show()
        })
    });
    d.find("#f_content3_switch_reject").click(function () {
        var a = o;
        null != q && x < q.length && (a = q[x]);
        if (null == a) return !1;
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
            key: key,
            id: a.id,
            action: "reject"
        }, function () {
            a.ns = 0;
            d.find("#f_content3_new_power b").text("?");
            d.find("#f_content3_new_wisdom b").text("?");
            d.find("#f_content3_new_charisma b").text("?");
            d.find("#f_content3_new_command b").text("?");
            d.find("#f_content3_switch_accept").hide();
            d.find("#f_content3_switch_reject").hide();
            0 == a.ncd ? (d.find("#f_content3_switch_cd2").hide(), d.find("#f_hero_switch_price ul li b").text(a.pr), d.find("#f_hero_switch_price").show(), d.find("#f_content3_switch_do").show()) : (d.find("#f_content3_switch_cd2 ul li b").text(Utils.timeString2(a.ncd)), d.find("#f_content3_switch_cd2").show(), d.find("#f_hero_switch_price").hide(), d.find("#f_content3_switch_do").hide())
        })
    });
    d.find("#f_content3_switch_accept").click(function () {
        var a = o;
        null != q && x < q.length && (a = q[x]);
        if (null == a) return !1;
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
            key: key,
            id: a.id,
            action: "accept"
        }, function () {
            a.ns = 0;
            a.p = a.np;
            a.i = a.ni;
            a.c1 = a.nc1;
            a.c2 = a.nc2;
            d.find("#f_content3_new_power b").text("?");
            d.find("#f_content3_new_wisdom b").text("?");
            d.find("#f_content3_new_charisma b").text("?");
            d.find("#f_content3_new_command b").text("?");
            d.find("#f_content3_old_power b").text(a.p);
            d.find("#f_content3_old_wisdom b").text(a.i);
            d.find("#f_content3_old_charisma b").text(a.c1);
            d.find("#f_content3_old_command b").text(a.c2);
            d.find("#f_content3_info_power b").text(a.p);
            d.find("#f_content3_info_wisdom b").text(a.i);
            d.find("#f_content3_info_charisma b").text(a.c1);
            d.find("#f_content3_info_command b").text(a.c2);
            d.find("#f_content3_switch_accept").hide();
            d.find("#f_content3_switch_reject").hide();
            0 == a.ncd ? (d.find("#f_content3_switch_cd2").hide(), d.find("#f_hero_switch_price ul li b").text(a.pr), d.find("#f_hero_switch_price").show(), d.find("#f_content3_switch_do").show()) : (d.find("#f_content3_switch_cd2 ul li b").text(Utils.timeString2(a.ncd)), d.find("#f_content3_switch_cd2").show(), d.find("#f_hero_switch_price").hide(), d.find("#f_content3_switch_do").hide())
        })
    });
    d.find("#f_sample_hero_slot_weapon a").click(function () {
        B(1);
        return !1
    });
    d.find("#f_sample_hero_slot_armor a").click(function () {
        B(2);
        return !1
    });
    d.find("#f_sample_hero_slot_ring a").click(function () {
        B(5);
        return !1
    });
    d.find("#f_sample_hero_slot_mount a").click(function () {
        B(3);
        return !1
    });
    d.find("#f_sample_hero_slot_book a").click(function () {
        B(4);
        return !1
    });
    d.find("#f_hero_hire_refresh_panel").click(function () {
        D = !0;
        $("#f_content2").hide();
        showItemPromotion($("#f_city_hero_promotion"), [{
            id: 161,
            shop: 1
        }], function (a) {
            D = !1;
            0 != a ? d.find("#f_tab2").trigger("tab") : $("#f_content2").show()
        }, !1)
    });
    d.find("#f_hero_hire_okay").click(function () {
        pnlLoading.show();
        var a = CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT;
        $("#f_content2_recruit").is(":visible") ? ajaxCall(a, {
            key: key,
            city: mainStatus.getCity().id,
            action: "pub_process"
        }, function (a) {
            mainStatus.CITY_INFO[2] = a.ret.gold;
            u(a.ret.hero);
            $("#f_hero_hire_refresh b").text(Utils.timeString2(a.ret.refresh));
            $("#f_content2_refresh").show();
            $("#f_hero_hire_price b").text(a.ret.price);
            0 != a.ret.rumor && showInfo(translate(LNG.GETRUMOR, mainStatus.HERO_DATA[a.ret.rumor].name))
        }) : ajaxCall(a, {
            key: key,
            city: mainStatus.getCity().id,
            action: "hire_process"
        }, function (a) {
            mainStatus.CITY_INFO[2] = a.ret.gold;
            o = a.ret.hero;
            if (isNaN(o.ncd)) o.ncd = 0, o.ns = 0;
            j = [];
            null != q && (q.push(o), x = q.length - 1);
            d.css("background-image", "url(img/bg/view.jpg)");
            s(o);
            $("#f_tab2").removeClass("tab_active").addClass("tab_inactive");
            $("#f_tab3").removeClass("tab_inactive").addClass("tab_active");
            preTab = "f_tab3";
            d.find("#f_content2").hide();
            d.find("#f_content3_info").show()
        });
        return !1
    });
    $("#f_content3_item_active_take").click(function () {
        var a = o;
        null != q && x < q.length && (a = q[x]);
        if (null == a) return !1;
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
            key: key,
            id: a.id,
            action: "item_equip",
            slot: i,
            i_id: -1
        }, function (b) {
            a.p = b.ret.hero.p;
            a.i = b.ret.hero.i;
            a.c1 = b.ret.hero.c1;
            a.c2 = b.ret.hero.c2;
            a.np = b.ret.hero.np;
            a.ni = b.ret.hero.ni;
            a.nc1 = b.ret.hero.nc1;
            a.nc2 = b.ret.hero.nc2;
            $("#f_content3_info_power b").text(a.p);
            $("#f_content3_info_wisdom b").text(a.i);
            $("#f_content3_info_charisma b").text(a.c1);
            $("#f_content3_item_active").hide();
            f.push(l);
            v();
            j.splice(z, 1);
            1 == i ? ($("#f_sample_hero_slot_weapon").css("background-image", ""), $("#f_sample_hero_slot_weapon_txt").show()) : 2 == i ? ($("#f_sample_hero_slot_armor").css("background-image", ""), $("#f_sample_hero_slot_armor_txt").show()) : 5 == i ? ($("#f_sample_hero_slot_ring").css("background-image", ""), $("#f_sample_hero_slot_ring_txt").show()) : 3 == i ? ($("#f_sample_hero_slot_mount").css("background-image", ""), $("#f_sample_hero_slot_mount_txt").show()) : 4 == i && ($("#f_sample_hero_slot_book").css("background-image", ""), $("#f_sample_hero_slot_book_txt").show())
        });
        return !1
    });
    $("#f_content3_reward").click(function () {
        var a = o;
        null != q && x < q.length && (a = q[x]);
        if (null == a) return !1;
        if (100 <= a.f) return showInfo(LNG.ERROR.CLIENT.HEROMAXLOYALTY), !1;
        var b = mainStatus.HERO_DATA[a.gid];
        if ("undefined" == typeof b || null == b) return showInfo(LNG.ERROR.CLIENT.NEEDUPDATE), !1;
        showConfirm(translate(LNG.CONFIRMREWARD, b.name), function () {
            1E3 > mainStatus.CITY_INFO[2] ? showInfo(LNG.ERROR.CLIENT.GOLDNOTENOUGH) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
                key: key,
                id: a.id,
                action: "give",
                city: mainStatus.getCity().id,
                golds: 1E3
            }, function (b) {
                a.f = b.ret.fealty;
                mainStatus.CITY_INFO[2] -= 1E3;
                $("#f_content3_info_loyalty b").text(a.f);
                showInfo(LNG.SUCCESS)
            }))
        });
        return !1
    });
    $("#f_content3_goarena").click(function () {
        var a = o;
        null != q && x < q.length && (a = q[x]);
        if (null == a) return !1;
        var b = mainStatus.HERO_DATA[a.gid];
        if ("undefined" == typeof b || null == b) return showInfo(LNG.ERROR.CLIENT.NEEDUPDATE), !1;
        //if (0 >= a.e) return showInfo(translate(LNG.NOVIGOR, b.name)), !1;
        pnlLoading.show();
        G = 0;
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
            key: key,
            lv: a.g + 1
        }, function (c) {
            if (null == c.ret.hero || 0 == c.ret.hero.length) showInfo(LNG.ERROR.CLIENT.NOMATCHARENA);
            else {
                var d = $("#f_content3_arena_list");
                d.html("");
                $.each(c.ret.hero, function (c, e) {
                    var f = mainStatus.HERO_DATA[e.gid];
                    "undefined" == typeof f || null == f || (d.append('<div style="position:relative; height:75px;"><div class="font12" style="left:0px; top: 0px; width: 70px;text-align:center;position:absolute;"><img id="f_content3_arena_list_img' + e.id + '" src="img/hero/sample.gif"/><br><b>' + f.name + '</b></div><img src="' + Utils.getHeroRankImage(f.race, f.rank) + '" style="position:absolute;left:5px;top:35px;"/><div class="font12" style="left:70px; top: 30px; width: 40px;text-align:center;position:absolute;">' + e.g + '</div><div class="font12" style="left:110px; top: 30px; width: 30px;text-align:center;position:absolute;">' + e.w + '</div><ul class="reshead" style="position:absolute;left:150px;top:20px;"><li><em class="race' + e.r + '"></em><b>' + e.u + "</b></li>" + (0 == e.gflag ? "" : '<li><em class="guild" style="background-image:url(' + Utils.getFlag(e.gflag) + ')"></em><b>' + e.gname + "</b></li>") + '</ul><div id="f_content3_arena_list' + e.id + '" class="funcbutton" style="top: 17px; left: 390px;">' + LNG.FIGHT + "</div></div>"), Utils.loadImage2(d.find("#f_content3_arena_list_img" + e.id), Utils.getHeroImage(e.gid)), d.find("#f_content3_arena_list" + e.id).click(function () {
                        $("#f_content3_arena_fight").show();
                        $("#f_content3_arena_fight p").show();
                        $("#f_content3_arena_fight_my img").attr("src", Utils.getHeroImage(a.gid));
                        $("#f_content3_arena_fight_my b").text(b.name);
                        $("#f_content3_arena_fight_enemy img").attr("src", Utils.getHeroImage(e.gid));
                        $("#f_content3_arena_fight_enemy b").text(f.name);
                        setTimeout(function () {
                            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
                                key: key,
                                gid: a.id,
                                tgid: e.id
                            }, function (c) {
                                a.e--;
                                //0 < c.ret.win ? (a.w++, a.tw++, d.find("#f_content3_arena_list" + e.id).unbind().remove()) : (a.w = 0, a.tl++);                                
								var fightResult;
								if (0 < c.ret.win) {
									(a.w++, a.tw++);
									fightResult = "[" + a.ex + "/" + a.te + "/"+a.id+"/"+e.id+"]";
								} else {
									(a.w = 0, a.tl++);
									var fightResult = "";
								}
                                a.ex += c.ret.exp;
                                $("#f_content3_arena_fight p").hide();
                                $("#f_content3_hero_vigor" + a.id).text(a.e);
                                
                                
                                c = translate(LNG.ARENARESULT[3 + c.ret.win], c.ret.exp, b.name);
                                showInfo(c + fightResult, function () {
                                    $("#f_content3_arena_fight").hide() 
                                })
                            }, function () {
                                $("#f_content3_arena_fight").hide()
                            })
                        }, 500);
                        return !1
                    }))
                });
                $("#f_content3_info").hide();
                $("#f_content3_arena").show();
                null != m && (m.refresh(), m.setPosition(0, 0))
            }
        });
        return !1
    });
    $("#f_content3_fire").click(function () {
        var a = o;
        null != q && x < q.length && (a = q[x]);
        if (null == a) return !1;
        var b = mainStatus.HERO_DATA[a.gid];
        if ("undefined" == typeof b || null == b) return showInfo(LNG.ERROR.CLIENT.NEEDUPDATE), !1;
        showConfirm(translate(LNG.CONFIRMFIRE, b.name), function () {
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
                key: key,
                id: a.id,
                action: "fire_gen",
                city: mainStatus.getCity().id
            }, function () {
                null != q && q.splice(x, 1);
                g();
                $("#f_content3").show();
                $("#f_content3_info").hide();
                null != m && (m.refresh(), m.setPosition(0, 0));
                showInfo(LNG.SUCCESS)
            })
        });
        return !1
    });
    $("#f_content3_resurrect").click(function () {
        var a = o;
        null != q && x < q.length && (a = q[x]);
        if (null == a) return !1;
        var b = mainStatus.HERO_DATA[a.gid];
        if ("undefined" == typeof b || null == b) return showInfo(LNG.ERROR.CLIENT.NEEDUPDATE), !1;
        var c = 1E3 * a.g;
        showConfirm(translate(LNG.CONFIRMRESURRECT, c, b.name), function () {
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
                key: key,
                id: a.id,
                action: "relive",
                city: mainStatus.getCity().id
            }, function () {
                mainStatus.CITY_INFO[2] -= c;
                a.s = 0;
                s(a);
                showInfo(LNG.SUCCESS)
            })
        });
        return !1
    });
    $("#f_content3_move_to").click(function () {
        var a = o;
        null != q && x < q.length && (a = q[x]);
        if (null == a) return !1;
        var b = mainStatus.HERO_DATA[a.gid];
        if ("undefined" == typeof b || null == b) return showInfo(LNG.ERROR.CLIENT.NEEDUPDATE), !1;
        var c = userinfo.city[$("#f_content3_move_cities").val()];
        null != c && showConfirm(translate(LNG.CONFIRMMOVE, b.name, c.name), function () {
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
                key: key,
                id: a.id,
                action: "move",
                city: mainStatus.getCity().id,
                city_move: c.id
            }, function () {
                a.s = 6;
                s(a);
                showInfo(LNG.SUCCESS)
            })
        });
        return !1
    });
    $("#f_content3_info_vigor_promotion").click(function () {
        var a = o;
        null != q && x < q.length && (a = q[x]);
        if (null == a) return !1;
        D = !0;
        $("#f_content3_info").hide();
        showItemPromotion($("#f_city_hero_promotion"), [{
            id: 81,
            shop: 1
        }, {
            id: 82,
            shop: 1
        }], function (b) {
            D = !1;
            // 0 != b && (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
                // key: key,
                // id: a.id,
                // action: "energy",
                // city: mainStatus.getCity().id,
                // itemid: b
            // }, function (b) {
                // a.e = b.ret.energy;
                // s(a);
                // showInfo(LNG.SUCCESS)
            // }));
            if(0 != b) {
            	pnlLoading.show(); 
            
	            for(var i=0; i<100; i++) {
		            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
		                key: key,
		                id: a.id,
		                action: "energy",
		                city: mainStatus.getCity().id,
		                itemid: b
		            }, function (b) {
		                a.e = b.ret.energy;
		                s(a);
		                showInfo(LNG.SUCCESS)
		            })
	            }
            }
            $("#f_content3_info").show()
        }, !0);
        return !1
    });
    d.css("background-image", "url(img/bg/view.jpg)");
    m = new iScroll("scroller", {
        desktopCompatibility: !0
    });
    pnlLoading.hide()
});
defineSubView("f_city_military", function () {
    function w() {
        $("#wrapper").css("height", t)
    }
    function s(a, b) {
        null != k && (k.refresh(), k.setPosition(a || 0, b || 0));
        return !1
    }
    function n() {
        $("#f_content4_list").empty().unbind();
        var b = 60 - userinfo.level;
        20 > b && (b = 20);
        $("#f_content4_title b").text(b);
        if (null != g && 0 < g.length) {
            var c = $("#f_content4_list");
            $.each(g, function (b, e) {
                for (var d = "", f = a[b], b = 0; b < e.length - 1; b++) if (0 < e[b]) var h = mainStatus.SOLDIER_DATA[b + 1],
                    d = "" == d ? "<b>" + h.name + "</b> x<b>" + e[b] + "</b>" : d + (", <b>" + h.name + "</b> x<b>" + e[b] + "</b>");
                h = e[e.length - 1];
                0 > h && (h = 0);
                c.append('<table id="f_heal_t' + f + '"><tr><td style="width:380px;">' + d + '</td><td id="f_heal_cd' + f + '">' + Utils.timeString2(h) + '<div id="f_heal_' + f + '" class="promotebutton" style="position:relative;left:45px;top:-25px;"></div></td></tr></table>');
                c.find("#f_heal_" + f).click(function () {
                    showItemPromotion($("#f_city_promotion"), [{
                        id: 187,
                        shop: 1
                    }, {
                        id: 188,
                        shop: 1
                    }], function (a) {
                        0 != a && (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CDINFO, {
                            key: key,
                            city: mainStatus.CITY_ID,
                            tid: f,
                            action: "heal",
                            iid: a
                        }, function (a) {
                            a = a.ret.secs;
                            0 < a ? c.find("#f_heal_cd" + f).text(Utils.timeString2(a)) : c.find("#f_heal_t" + f).unbind().remove();
                            showInfo(LNG.SUCCESS)
                        }));
                        $("#f_content4").show()
                    }, !0);
                    $("#f_content4").hide()
                })
            });
            $("#f_content4_list_title").show()
        } else $("#f_content4_list_title").hide();
        $("#f_content4").show()
    }
    function v() {
        var a = $("#f_content5_list");
        a.empty().unbind();
        null != aa && 0 < aa.length ? ($.each(aa, function (c, e) {
            var d = '<table><tr><td style="width:325px;"><ul class="reshead"><li><em class="race' + e[0].nationid + '"></em><b>' + e[0].nick + '</b></li><li><em class="lv"></em><b>' + e[0].level + "</b></li>";
            0 < e[0].guildid && (d += '<li><em class="guild" style="background-image:url(' + Utils.getFlag(e[0].gflag) + ')"></em><b>' + e[0].guild + "</b></li>");
            0 < e[0].conq[0] && (d += '<li><em class="king"></em><b>' + e[0].conq[2] + "&nbsp;[" + Utils.timeString(e[0].conq[1]) + "]</b></li>");
            d += '</ul></td><td style="width:50px;"><b>' + e[1] + "/" + e[2] + '</b></td><td><div id="f_content5_list_conquer' + e[0].id + '" class="funcbutton" style="position:relative; left:5px;">' + LNG.CONQUER + "</div></td></tr></table>";
            a.append(d);
            a.find("#f_content5_list_conquer" + e[0].id).click(function () {
                b.find("#f_tab3").click();
                $("#f_city_war_type_sel").val("9");
                $("#f_content3_war_x").val(e[1]);
                $("#f_content3_war_y").val(e[2])
            })
        }), b.find("#f_content5_list_title").show(), a.show()) : (b.find("#f_content5_list_title").hide(), a.hide())
    }
    function c() {
        var a = $("#f_content6_list");
        a.empty().unbind();
        null != ba && 0 < ba.length ? ($.each(ba, function (b, c) {
            var e = '<table><tr><td width=105 id="f_content6_type' + c[0] + '"><b>' + LNG.CooldDownType[c[1]] + "</b>&nbsp;[" + LNG.ACTIONTYPE[c[2]] + ']</td><td width=220><ul class="reshead" style="height: 16px;">';
            0 != c[7] && (e += '<li style="height:16px;line-height:16px;"><b>[' + mainStatus.HERO_DATA[c[7]].name + "]</b>&nbsp;</li>");
            if (4 == c[1] || 5 == c[1]) {
                if (null != c[5] && null != c[6]) for (var d = 0; d < c[5].length; d++) 0 < c[5][d] && (e += '<li style="height:16px;line-height:16px;"><b>' + mainStatus.SOLDIER_DATA[c[5][d]].name + "</b>x" + c[6][d] + "&nbsp;</li>")
            } else {
                if (null != c[5]) for (d = 0; d < c[5].length; d++) 0 < c[5][d] && (e += '<li style="height:16px;line-height:16px;"><b>' + mainStatus.SOLDIER_DATA[c[5][d]].name + "</b>"), null != c[6] && c[6].length > d && (e += "x" + c[6][d]), e += "&nbsp;</li>";
                null != c[8] && "" != c[8] && (e += '<li style="height:16px;line-height:16px;"><b>From ' + c[8] + "</b>&nbsp;</li>");
                null != c[9] && "" != c[9] && (e += '<li style="height:16px;line-height:16px;"><b>' + c[9] + "</b></li>")
            }
            e += '</ul></td><td width="45px">' + c[4] + '</td><td width="60px" id="f_content6_time' + c[0] + '">' + Utils.timeString2(c[3]) + "</td></tr></table>";
            if (5 == c[1] || 4 == c[1]) 5 == c[1] ? e += '<div id="f_content6_speedup' + c[0] + '" class="funcbutton" style="left: 360px; display:none;top:50%;height:28px; margin-top:-14px;">' + LNG.SPEED_UP + "</div>" : 4 == c[1] && (e += '<div id="f_content6_callback' + c[0] + '" class="funcbutton" style="left: 290px; display:none;top:50%;height:28px; margin-top:-14px;">' + LNG.CALL_BACK + '</div><div id="f_content6_speedup' + c[0] + '" class="funcbutton" style="left: 360px; display:none;top:50%;height:28px; margin-top:-14px;">' + LNG.SPEED_UP + "</div>"), e += '<div id="f_content6_more' + c[0] + '" class="plusbutton" style="left: 425px;top:50%;height:18px; margin-top:-9px;"></div>';
            a.append('<div style="position:relative;">' + e + "</div>");
            4 == c[1] ? (a.find("#f_content6_more" + c[0]).click(function () {
                a.find("#f_content6_speedup" + c[0]).toggle();
                a.find("#f_content6_callback" + c[0]).toggle()
            }), a.find("#f_content6_speedup" + c[0]).click(function () {
                showItemPromotion($("#f_city_promotion"), [{
                    id: 134,
                    shop: 1
                }, {
                    id: 135,
                    shop: 1
                }], function (b) {
                    0 != b && (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CDINFO, {
                        key: key,
                        city: mainStatus.CITY_ID,
                        tid: c[0],
                        action: "troop",
                        iid: b
                    }, function (b) {
                        b = b.ret.secs;
                        CMA.changeSecs(c[0], b);
                        c[3] = b;
                        a.find("#f_content6_time" + c[0]).text(Utils.timeString2(b));
                        showInfo(LNG.SUCCESS)
                    }));
                    $("#f_content6").show()
                }, !0);
                a.find("#f_content6_more" + c[0]).click();
                $("#f_content6").hide()
            }), a.find("#f_content6_callback" + c[0]).click(function () {
                showConfirm(LNG.CONFIRMCALLBACK, function () {
                    pnlLoading.show();
                    ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, {
                        key: key,
                        act: "callback",
                        wid: c[0],
                        city: mainStatus.CITY_ID
                    }, function (b) {
                        b = b.ret.secs;
                        a.find("#f_content6_type" + c[0]).html("<b>" + LNG.CooldDownType[5] + "</b>&nbsp;[" + LNG.ACTIONTYPE[c[2]] + "]");
                        c[3] = b;
                        a.find("#f_content6_time" + c[0]).text(Utils.timeString2(b));
                        CMA.reload()
                    });
                    a.find("#f_content6_more" + c[0]).click()
                })
            })) : 5 == c[1] && (a.find("#f_content6_more" + c[0]).click(function () {
                a.find("#f_content6_speedup" + c[0]).toggle()
            }), a.find("#f_content6_speedup" + c[0]).click(function () {
                showItemPromotion($("#f_city_promotion"), [{
                    id: 134,
                    shop: 1
                }, {
                    id: 135,
                    shop: 1
                }], function (b) {
                    0 != b && (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CDINFO, {
                        key: key,
                        city: mainStatus.CITY_ID,
                        tid: c[0],
                        action: "troop",
                        iid: b
                    }, function (b) {
                        b = b.ret.secs;
                        CMA.changeSecs(c[0], b);
                        c[3] = b;
                        a.find("#f_content6_time" + c[0]).text(Utils.timeString2(b));
                        showInfo(LNG.SUCCESS)
                    }));
                    $("#f_content6").show()
                }, !0);
                a.find("#f_content6_more" + c[0]).click();
                $("#f_content6").hide()
            }))
        }), b.find("#f_content6_title1").hide(), b.find("#f_content6_list_title").show(), a.show()) : (b.find("#f_content6_title1").show(), b.find("#f_content6_list_title").hide(), a.hide())
    }
    var k = null,
        g = null,
        a = null,
        t = "165px",
        u = $("#f_city_military_html_script"),
        b = $(u.parent().get(0)),
        B = EMA.getProxy(),
        m = LNG.ACTIONTYPE_FULL;
    b.bind("dispose", function () {
        null != k && (k.destroy(!1), k = null);
        Utils.removeCss("f_city_military_css");
        B.dispose();
        b = B = null
    });
    var C = 0,
        d = [{
            buildtype: 8,
            panel: b.find("#f_content1").find("#f_camp")
        }],
        E = mainStatus.BUILDING_DATA,
        o = function (a) {
            var b = mainStatus.getCity(),
                c = E[a.buildtype],
                e = mainStatus.CITY_INFO.getLevel(a.buildtype),
                d = c.upgrade[e];
            if (d) 0 < e ? (c = LNG.CONFIRMBUILD, c = LNG.UPGRADE_CONFIRM, showConfirm(c, function () {
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
                    key: key,
                    city: b.id,
                    build_type: a.buildtype
                }, function (b) {
                    a.panel.find("#f_upgrade").hide();
                    a.panel.find("#f_build_promotion").show();
                    mainStatus.CITY_INFO[6] -= d.w;
                    mainStatus.CITY_INFO[2] -= d.g;
                    mainStatus.CITY_INFO[4] -= d.f;
                    mainStatus.CITY_INFO[8] -= d.i;
                    CMA.add(b.ret.cdlist)
                }, function (a) {
                    (704 == a || 707 == a) && CMA.reload()
                })
            })) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
                key: key,
                city: b.id,
                build_type: a.buildtype
            }, function (b) {
                a.panel.find("#f_upgrade").hide();
                a.panel.find("#f_build_promotion").show();
                mainStatus.CITY_INFO[6] -= d.w;
                mainStatus.CITY_INFO[2] -= d.g;
                mainStatus.CITY_INFO[4] -= d.f;
                mainStatus.CITY_INFO[8] -= d.i;
                CMA.add(b.ret.cdlist)
            }, function (a) {
                (704 == a || 707 == a) && CMA.reload()
            }))
        },
        q = [{
            id: 115,
            shop: 1
        }, {
            id: 116,
            shop: 1
        }, {
            id: 117,
            shop: 1
        }],
        x = [{
            id: 1001,
            shop: 1,
            icon: "gem.jpg",
            name: LNG.INSTANT_COMPLETE,
            desc: LNG.INSTANT_COMPLETE_DESC,
            price: 0
        }],
        j = function (a) {
            var b = CMA.getCD(1, a.buildtype);
            if (null != b) return a = (new Date).getTime(), a = Math.ceil((b.end - a) / 1E3), pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CD_PRICE, {
                type: b.cdtype,
                secs: a
            }, function (a) {
                Q = !0;
                a = a.ret.price;
                0 < a ? x[0].price = a : x = null;
                $("#f_content1").hide();
                showItemPromotion($("#f_city_promotion"), q, function (a) {
                    Q = !1;
                    if (1001 == a) {
                        pnlLoading.show();
                        var c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO;
                        ajaxCall(c, {
                            key: key,
                            city: mainStatus.CITY_ID,
                            tid: b.id,
                            action: "build2"
                        }, function (a) {
                            userinfo.money = a.ret.money;
                            refreshUserInfo();
                            CMA.changeSecs(b.id, 0);
                            showInfo(LNG.SUCCESS)
                        })
                    } else 0 != a && (pnlLoading.show(), c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO, ajaxCall(c, {
                        key: key,
                        city: mainStatus.CITY_ID,
                        tid: b.id,
                        action: "build",
                        iid: a
                    }, function (a) {
                        CMA.changeSecs(b.id, a.ret.secs);
                        showInfo(LNG.SUCCESS)
                    }));
                    $("#f_content1").show()
                }, !0, x)
            }), !1
        },
        i = function (a, b) {
            if (E) {
                var c = E[a],
                    e = mainStatus.CITY_INFO.getLevel(a),
                    d = c.upgrade[e];
                d && (b.find("#f_title").html(c.name), Utils.loadImage(b.find("#f_img"), Utils.getBuildingImage(a)), b.find("#f_desc").html(c.desc), b.find("#f_level").html(e), b.find("#resfood b").html(d.f), mainStatus.CITY_INFO[4] < d.f && b.find("#resfood b").css("color", "#FFD17A"), b.find("#reswood b").html(d.w), mainStatus.CITY_INFO[6] < d.w && b.find("#reswood b").css("color", "#FFD17A"), b.find("#resiron b").html(d.i), mainStatus.CITY_INFO[8] < d.i && b.find("#resiron b").css("color", "#FFD17A"), b.find("#resgold b").html(d.g), mainStatus.CITY_INFO[2] < d.g && b.find("#resgold b").css("color", "#FFD17A"), d = buildtime(d.t, mainStatus.CITY_INFO[22]), "undefined" != typeof statinfo.vs && null != statinfo.vs && (d *= statinfo.vs), b.find("#clock b").html(Utils.timeString2(Math.ceil(d))), c.upgrade[e + 1] ? (b.find("#f_upgrade").show(), b.find("#f_build_promotion").hide()) : (b.find("#f_upgrade").hide(), b.find("#f_cd1").hide()))
            }
        },
        u = function () {
            $.each(d, function (a, b) {
                i(b.buildtype, b.panel)
            })
        },
        f = function (a, b) {
            $.each(d, function (a, c) {
                c.buildtype == b && i(c.buildtype, c.panel)
            });
            z = !0
        };
    $.each(d, function (a, b) {
        var c = b.panel,
            e = d[a].buildtype,
            h = c.find("#f_cd1 p"),
            p = c.find("#f_upgrade"),
            D = c.find("#f_build_promotion");
        B.bind(CMA.getTickEventId(1, e), function (a) {
            p.hide();
            D.show();
            h.html(Utils.timeString2(a))
        });
        B.bind(CMA.getDoneEventId(1, e), function () {
            f(p, e)
        })
    });
    u();
    (function () {
        $.each(d, function (a, b) {
            b.panel.find("#f_upgrade").click(function () {
                o(b);
                return !1
            });
            b.panel.find("#f_build_promotion").click(function () {
                j(b);
                return !1
            })
        })
    })();
    CMA.forceNotify();
    B.bind("cityinfoupdate", u);
    var l = null,
        z = !0,
        G = function (a) {
            null == l || z ? (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SOLDIER_EDUCATE, {
                key: key,
                city: mainStatus.getCity().id
            }, function (b) {
                z = !1;
                l = b.ret;
                l.soldiers.sort(function (a, b) {
                    return a[0] - b[0]
                });
                $("#f_content2_defense_input").val(l.def);
                $("#f_content2_info_space").text(l.space);
                $("#f_content2_info_head").text(l.head);
                window.selectProxy.proxySelect($("#f_content2_defense_input")[1]);
                0 > l.f ? $("#f_content2_warning").show() : $("#f_content2_warning").hide();
                a && a()
            }, function (a) {
                2303 == a && b.find("#f_tab1").click()
            })) : a && a()
        },
        A = null,
        e = !1,
        r = function (a, b, c) {
            function d() {
                var D = Math.ceil(Math.pow(p, 1.5)),
                    D = D > h ? h : D,
                    D = f + b * D;
                0 < b && D > c || 0 > b && D < c ? (e = !1, clearInterval(A), a.value = c) : a.value = D;
                p++
            }
            e = !0;
            var f = Utils.parseInt(a.value, 0),
                h = Math.abs(c - f),
                p = 1;
            d();
            1 < h && setTimeout(function () {
                clearInterval(A);
                e && (A = setInterval(d, 100))
            }, 300)
        },
        H = function () {
            e = !1;
            clearInterval(A);
            timer = null
        },
        F = b.find("#f_content2_list"),
        p = function () {
            if (!l) return 0;
            for (var a = l.soldiers, b = a.length, c = 0; b--;) c += a[b].sum;
            return l.space - c
        },
        L = function (a, b, c) {
            b = mainStatus.SOLDIER_DATA[b[0]];
            a.find("#resfood b").html(b.train.f * c);
            mainStatus.CITY_INFO[4] < b.train.f * c && a.find("#resfood b").css("color", "#FFD17A");
            a.find("#reswood b").html(b.train.w * c);
            mainStatus.CITY_INFO[6] < b.train.w * c && a.find("#reswood b").css("color", "#FFD17A");
            a.find("#resiron b").html(b.train.i * c);
            mainStatus.CITY_INFO[8] < b.train.i * c && a.find("#resiron b").css("color", "#FFD17A");
            a.find("#resgold b").html(b.train.g * c);
            mainStatus.CITY_INFO[2] < b.train.g * c && a.find("#resgold b").css("color", "#FFD17A");
            c *= b.train.t;
            "undefined" != typeof statinfo.vs && null != statinfo.vs && (c = Math.ceil(c * statinfo.vs));
            a.find("#clock b").html(Utils.timeString2(c))
        },
        M = function (a, b) {
            var c = mainStatus.SOLDIER_DATA[b[0]];
            a.find("#f_title").html(c.name);
            a.find("#f_current_num").html(b[1]);
            a.find("#f_desc").html(c.desc);
            a.find("#f_need").html("<b>" + LNG.NEED + ": </b>" + c.need);
            0 == b[2] && a.find("#f_need").css("color", "#FFD17A");
            Utils.loadImage(a.find("#f_img"), Utils.getSoldierImage(b[0], userinfo.nationid));
            L(a, b, 1);
            0 == b[2] ? a.find("#f_upgrade").hide() : a.find("#f_upgrade").show()
        },
        D = function (a) {
            var a = mainStatus.SOLDIER_DATA[a[0]],
                b = [];
            0 < a.train.f && b.push(Math.floor(mainStatus.CITY_INFO[4] / a.train.f));
            0 < a.train.w && b.push(Math.floor(mainStatus.CITY_INFO[6] / a.train.w));
            0 < a.train.i && b.push(Math.floor(mainStatus.CITY_INFO[8] / a.train.i));
            0 < a.train.g && b.push(Math.floor(mainStatus.CITY_INFO[2] / a.train.g));
            a = Math.min.apply(Math, b);
            if (null != l) {
                if (l.space < a) a = l.space;
                if (l.head < a) a = l.head
            }
            return a
        },
        O = function (a, c) {
            var e = a.find("#f_cd1 p"),
                d = a.find("#f_upgrade"),
                f = 0;
            0 == c[2] && (d.hide(), a.find("#f_cd1").hide());
            B.unbind(CMA.getTickEventId(3, c[0]));
            B.bind(CMA.getTickEventId(3, c[0]), function (a) {
                d.hide();
                e.html(Utils.timeString2(a))
            });
            B.unbind(CMA.getDoneEventId(3, c[0]));
            B.bind(CMA.getDoneEventId(3, c[0]), function () {
                c[1] += f;
                f = 0;
                M(a, c);
                e.html(Utils.timeString2(0));
                d.show()
            });
            a.find("#f_detail").unbind().click(function () {
                var a = mainStatus.SOLDIER_DATA[c[0]];
                b.find("#f_soldier_info_title").html(a.name);
                Utils.loadImage(b.find("#f_soldier_info_img"), Utils.getSoldierImage(c[0], userinfo.nationid));
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SOLDIER_EDUCATE, {
                    key: key,
                    action: "info",
                    city: mainStatus.getCity().id,
                    stype: c[0]
                }, function (a) {
                    b.find("#f_soldier_info_attack").text(a.ret.a);
                    b.find("#f_soldier_info_defense").text(a.ret.d);
                    b.find("#f_soldier_info_speed").text(a.ret.s);
                    b.find("#f_soldier_info_strike").text(a.ret.e);
                    b.find("#f_soldier_info_health").text(a.ret.h);
                    b.find("#f_soldier_info_food").text(a.ret.f)
                });
                b.find("#f_soldier_info").show()
            });
            a.find("#f_num input").unbind().change(function () {
                var b = Utils.parseInt($(this).val(), 0),
                    b = Math.min(b, D(c));
                $(this).val(b);
                L(a, c, b)
            });
            var h = a.find("#f_num").find("input").get(0);
            a.find("#f_num_minus").unbind();
            a.find("#f_num_minus").bind("mousedown touchstart", function () {
                H();
                r(h, -1, 0)
            });
            var i = null;
            a.find("#f_num_minus").bind("mouseup touchend", function () {
                H();
                var b = Utils.parseInt(h.value, 0);
                clearTimeout(i);
                i = setTimeout(function () {
                    L(a, c, b)
                }, 300)
            });
            a.find("#f_num_plus").unbind();
            a.find("#f_num_plus").bind("mousedown touchstart", function () {
                H();
                r(h, 1, D(c))
            });
            var j = null;
            a.find("#f_num_plus").bind("mouseup touchend", function () {
                H();
                var b = Utils.parseInt(h.value, 0),
                    b = Math.max(b, 0);
                clearTimeout(j);
                j = setTimeout(function () {
                    L(a, c, b)
                }, 300)
            });
            a.find("#f_num_max").unbind().click(function () {
                H();
                h.value = D(c);
                var b = Utils.parseInt(h.value, 0);
                L(a, c, b)
            });
            d.unbind().click(function () {
                var e = Utils.parseInt(a.find("#f_num input").val(), 0);
                if (1 > e) return !1;
                if (1 > p()) return showInfo(LNG.SOLDIER_TRAIN_NOT_ENOUGH_SPACE), !1;
                var d = k.x,
                    h = k.y;
                b.find("#f_content2").hide();
                b.find("#f_content2_defense_type").hide();
                k.setPosition(0, 0);
                Q = !0;
                showFreeHeroPanel(b.find("#f_content3_military_hero_select"), !0, function (a) {
                    Q = !1;
                    b.find("#f_content2").show();
                    b.find("#f_content2_defense_type").show();
                    var p = 0;
                    if (a) p = a.gid;
                    pnlLoading.show();
                    ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SOLDIER_EDUCATE, {
                        key: key,
                        city: mainStatus.getCity().id,
                        action: "soldier_educate",
                        soldier: c[0],
                        num: e,
                        gen: p
                    }, function (a) {
                        var b = mainStatus.SOLDIER_DATA[c[0]];
                        mainStatus.CITY_INFO[6] -= b.train.w * e;
                        mainStatus.CITY_INFO[2] -= b.train.g * e;
                        mainStatus.CITY_INFO[4] -= b.train.f * e;
                        mainStatus.CITY_INFO[8] -= b.train.i * e;
                        f = e;
                        CMA.add(a.ret.cdlist);
                        CMA.forceNotify();
                        l.space -= e;
                        l.head -= e;
                        $("#f_content2_info_space").text(l.space);
                        $("#f_content2_info_head").text(l.head);
                        0 > l.f ? $("#f_content2_warning").show() : $("#f_content2_warning").hide();
                        showInfo(LNG.SUCCESS)
                    }, function (a) {
                        (2310 == a || 2311 == a) && CMA.reload()
                    });
                    null != k && (k.refresh(), k.setPosition(d, h))
                }, "power");
                return !1
            })
        },
        h = !1,
        y = function (a) {
            if (!h || a) {
                var c = b.find("#f_train");
                c.remove();
                G(function () {
                    if (null != l) if (null != l.soldiers && $.each(l.soldiers, function (a, b) {
                        var e = c.clone(),
                            d = "f_train_no" + a;
                        e.attr("id", d);
                        M(e, b);
                        O(e, b);
                        F.append(e.show());
                        var f = Utils.getCookie(d);
                        null != f && "" != f && (e.find("#f_num input").val(f), Utils.delCookie(d))
                    }), null != l.next && 0 < l.next[0]) {
                        b.find("#f_content2_next_level").text(l.next[1]);
                        var a = mainStatus.SOLDIER_DATA[l.next[0]];
                        b.find("#f_content2_next_title").html(a.name);
                        b.find("#f_content2_next_desc").html(a.desc);
                        b.find("#f_content2_next_need").html("<b>" + LNG.NEED + ": </b>" + a.need);
                        Utils.loadImage(b.find("#f_content2_next_img"), Utils.getSoldierImage(l.next[0], userinfo.nationid));
                        b.find("#f_content2_next_resfood b").html(a.train.f);
                        b.find("#f_content2_next_reswood b").html(a.train.w);
                        b.find("#f_content2_next_resiron b").html(a.train.i);
                        b.find("#f_content2_next_resgold b").html(a.train.g);
                        b.find("#f_content2_next").show()
                    } else b.find("#f_content2_next").hide();
                    s(0, 0);
                    h = !0
                })
            }
        },
        I = 0,
        J = function () {
            var a = {
                area: Utils.parseInt($("#f_content3_war_x").val(), 0),
                area_x: Utils.parseInt($("#f_content3_war_y").val(), 0)
            };
            return 0 >= a.area || 0 >= a.area_x ? null : a
        },
        N = function () {
            var a = [];
            b.find("#f_troop_inputs").find("#f_troop_input_input").each(function () {
                var b = $(this);
                0 < Utils.parseInt(b.val(), 0) && a.push(["soldier_num" + b.data("soldier")[0], Utils.parseInt(b.val(), 0)])
            });
            return a
        },
        K = function (a) {
            for (var b = {}, c = a.length; c--;) b[a[c][0]] = a[c][1];
            return b
        },
        P = function (a, c, e, d) {
            $("#wrapper").css("height", "280px");
            null != k && (k.refresh(), k.setPosition(0, 0));
            Q = !0;
            var f = b.find("#f_action_common_confirm").show();
            f.find("#f_actiontype_val").text(a);
            f.find("#f_actiontarget_val").text(c.area + ":" + c.area_x);
            f.find("#f_cost_food_val").text(e.cost_food);
            f.find("#f_cost_wood_val").text(e.cost_wood);
            f.find("#f_cost_iron_val").text(e.cost_iron);
            f.find("#f_cost_gold_val").text(e.cost_gold);
            f.find("#f_time_val").text(Utils.timeString2(e.travel_sec));
            f.find("#f_carry_val").text(e.carry);
            f.find("#confirm_yes").click(function () {
                f.find("*").unbind();
                f.hide();
                Q = !1;
                var b = {};
                $.extend(b, c);
                $.extend(b, e);
                b.action = "war_task";
                pnlLoading.show();
                b.cost_food = 1; //injection
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION, b, function (b) {
                    CMA.add(b.ret.cd);
                    d && d(!0);
                    showCity();
                    showInfo(LNG.SUCCESS);
                    a == m[9] && (userinfo.conq[3]--, Utils.setCookie("user", userinfo))
                }, function (a) {
                    (2522 == a || 2524 == a || 2528 == a) && CMA.reload();
                    d && d(!1)
                })
            });
            f.find("#confirm_no").click(function () {
                f.find("*").unbind();
                Q = !1;
                f.hide();
                d && d(!1);
                w();
                null != k && (k.refresh(), k.setPosition(0, 0))
            })
        },
        R = function (a, c, e, d) {
            Q = !0;
            var f = b.find("#f_action_build_confirm").show();
            $("#wrapper").css("height", "280px");
            f.find("#f_gold_val").text(mainStatus.CITY_INFO[2]);
            f.find("#f_wood_val").text(mainStatus.CITY_INFO[6]);
            f.find("#f_food_val").text(mainStatus.CITY_INFO[4]);
            f.find("#f_iron_val").text(mainStatus.CITY_INFO[8]);
            f.find("#f_actiontype_val").text(a);
            f.find("#f_actiontarget_val").text(c.area + ":" + c.area_x);
            f.find("#f_cost_food_val").text(e.cost_food);
            f.find("#f_cost_wood_val").text(e.cost_wood);
            f.find("#f_cost_iron_val").text(e.cost_iron);
            f.find("#f_cost_gold_val").text(e.cost_gold);
            f.find("#f_distance_val").text(e.distance);
            f.find("#f_time_val").text(Utils.timeString2(e.travel_sec));
            f.find("#f_gold_input").val("");
            f.find("#f_wood_input").val("");
            f.find("#f_food_input").val("");
            f.find("#f_iron_input").val("");
            var h = 0,
                h = e.carry;
            f.find("#f_carry_val").text(h);
            s(0, 0);
            f.find("#f_food_max").unbind().click(function () {
                var a = Utils.parseInt(f.find("#f_gold_input").val(), 0) + Utils.parseInt(f.find("#f_wood_input").val(), 0) + Utils.parseInt(f.find("#f_iron_input").val(), 0) + e.cost_food + e.cost_gold + e.cost_wood + e.cost_iron,
                    a = Math.max(Math.min(h, mainStatus.CITY_INFO[4]) - a, 0);
                f.find("#f_food_input").val(a)
            });
            f.find("#f_gold_max").unbind().click(function () {
                var a = Utils.parseInt(f.find("#f_food_input").val(), 0) + Utils.parseInt(f.find("#f_wood_input").val(), 0) + Utils.parseInt(f.find("#f_iron_input").val(), 0) + e.cost_food + e.cost_gold + e.cost_wood + e.cost_iron,
                    a = Math.max(Math.min(h, mainStatus.CITY_INFO[2]) - a, 0);
                f.find("#f_gold_input").val(a)
            });
            f.find("#f_wood_max").unbind().click(function () {
                var a = Utils.parseInt(f.find("#f_food_input").val(), 0) + Utils.parseInt(f.find("#f_gold_input").val(), 0) + Utils.parseInt(f.find("#f_iron_input").val(), 0) + e.cost_food + e.cost_gold + e.cost_wood + e.cost_iron,
                    a = Math.max(Math.min(h, mainStatus.CITY_INFO[6]) - a, 0);
                f.find("#f_wood_input").val(a)
            });
            f.find("#f_iron_max").unbind().click(function () {
                var a = Utils.parseInt(f.find("#f_food_input").val(), 0) + Utils.parseInt(f.find("#f_gold_input").val(), 0) + Utils.parseInt(f.find("#f_wood_input").val(), 0) + e.cost_food + e.cost_gold + e.cost_wood + e.cost_iron,
                    a = Math.max(Math.min(h, mainStatus.CITY_INFO[8]) - a, 0);
                f.find("#f_iron_input").val(a)
            });
            f.find("#confirm_yes").click(function () {
                var a = Utils.parseInt(f.find("#f_gold_input").val(), 0),
                    h = Utils.parseInt(f.find("#f_wood_input").val(), 0),
                    p = Utils.parseInt(f.find("#f_food_input").val(), 0),
                    D = Utils.parseInt(f.find("#f_iron_input").val(), 0);
                if (e.carry < p + h + D + a + e.cost_food + e.cost_wood + e.cost_iron + e.cost_gold) return showInfo(LNG.ERROR.CLIENT.EXCEEDRESOURCE), !1;
                f.find("*").unbind();
                b.find("#f_content3").show();
                b.find("#f_content").show();
                f.hide();
                Q = !1;
                var i = {};
                $.extend(i, {
                    take_num: e.carry,
                    travel_sec: e.travel_sec,
                    distance: e.distance,
                    action_rices: e.cost_rice,
                    action_woods: e.cost_wood,
                    action_irons: e.cost_iron,
                    action_golds: e.cost_gold,
                    rices: p,
                    woods: h,
                    irons: D,
                    golds: a
                });
                $.extend(i, c);
                i.action = "war_task";
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION, i, function (a) {
                    CMA.add(a.ret.cd);
                    d && d(!0);
                    showCity();
                    showInfo(LNG.SUCCESS)
                }, function (a) {
                    (2522 == a || 2524 == a || 2528 == a) && CMA.reload();
                    d && d(!1)
                })
            });
            f.find("#confirm_no").click(function () {
                f.find("*").unbind();
                Q = !1;
                f.hide();
                d && d(!1)
            })
        },
        T = function (a) {
            if (!I) return showInfo(LNG.ERROR.CLIENT.EMPTYTROOPHERO, Z), !1;
            var c = J();
            if (null == c) return showInfo(LNG.ERROR.CLIENT.EMPTYTARGETAREA), !1;
            var e = N();
            if (0 == e.length) return showInfo(LNG.ERROR.CLIENT.EMPTYTROOP), !1;
            for (var d = 0, f = e.length; f--;) d += e[f][1];
            if (d > I.c2) return showInfo(translate(LNG.ERROR.CLIENT.BEYONDHEROCOMMAND, I.c2)), !1;
            var e = K(e),
                h = $.extend({
                    key: key,
                    city: mainStatus.getCity().id,
                    attack_type: a,
                    gen: I.gid,
                    area: c.area,
                    area_x: c.area_x
                }, e);
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, h, function (c) {
                b.find("#f_content").hide();
                b.find("#f_content3").hide();
                P(m[a], h, c.ret, function () {
                    b.find("#f_content").show();
                    b.find("#f_content3").show();
                    w();
                    null != k && (k.refresh(), k.setPosition(0, 0))
                })
            }, function () {});
            return !1
        },
        S = function () {
            if (!I) return showInfo(LNG.ERROR.CLIENT.EMPTYTROOPHERO, Z), !1;
            var a = J();
            if (null == a) return showInfo(LNG.ERROR.CLIENT.EMPTYTARGETAREA), !1;
            var c = N();
            if (0 == c.length) return showInfo(LNG.ERROR.CLIENT.EMPTYTROOP), !1;
            for (var e = 0, d = c.length; d--;) e += c[d][1];
            if (e > I.c2) return showInfo(translate(LNG.ERROR.CLIENT.BEYONDHEROCOMMAND, I.c2)), !1;
            c = K(c);
            if (0 < C && e < C) showConfirm(LNG.ERROR.CLIENT.TROOPNOTENOUGH, function () {
                var e = $.extend({
                    key: key,
                    city: mainStatus.getCity().id,
                    action: "do_war",
                    attack_type: 7,
                    gen: I.gid,
                    area: a.area,
                    area_x: a.area_x
                }, c);
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, e, function (a) {
                    b.find("#f_content").hide();
                    b.find("#f_content3").hide();
                    P(LNG.ACTIONTYPE_FULL[7], e, a.ret, function () {
                        b.find("#f_content").show();
                        b.find("#f_content3").show();
                        w();
                        null != k && (k.refresh(), k.setPosition(0, 0))
                    })
                }, function () {})
            });
            else {
                var f = $.extend({
                    key: key,
                    city: mainStatus.getCity().id,
                    action: "do_war",
                    attack_type: 7,
                    gen: I.gid,
                    area: a.area,
                    area_x: a.area_x
                }, c);
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, f, function (a) {
                    b.find("#f_content").hide();
                    b.find("#f_content3").hide();
                    P(LNG.ACTIONTYPE_FULL[7], f, a.ret, function () {
                        b.find("#f_content").show();
                        b.find("#f_content3").show();
                        w();
                        null != k && (k.refresh(), k.setPosition(0, 0))
                    })
                }, function () {})
            }
            return !1
        },
        V = function () {
            if (!I) return showInfo(LNG.ERROR.CLIENT.EMPTYTROOPHERO, Z), !1;
            var a = J();
            if (null == a) return showInfo(LNG.ERROR.CLIENT.EMPTYTARGETAREA), !1;
            var c = N();
            if (0 == c.length) return showInfo(LNG.ERROR.CLIENT.EMPTYTROOP), !1;
            for (var e = 0, d = c.length; d--;) e += c[d][1];
            if (e > I.c2) return showInfo(translate(LNG.ERROR.CLIENT.BEYONDHEROCOMMAND, I.c2)), !1;
            c = K(c);
            if (0 < C && e < C) showConfirm(LNG.ERROR.CLIENT.TROOPNOTENOUGH, function () {
                var e = $.extend({
                    key: key,
                    city: mainStatus.getCity().id,
                    action: "do_war",
                    attack_type: 8,
                    gen: I.gid,
                    area: a.area,
                    area_x: a.area_x
                }, c);
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, e, function (a) {
                    b.find("#f_content").hide();
                    b.find("#f_content3").hide();
                    P(LNG.ACTIONTYPE_FULL[7], e, a.ret, function () {
                        b.find("#f_content").show();
                        b.find("#f_content3").show();
                        w();
                        null != k && (k.refresh(), k.setPosition(0, 0))
                    })
                }, function () {})
            });
            else {
                var f = $.extend({
                    key: key,
                    city: mainStatus.getCity().id,
                    action: "do_war",
                    attack_type: 8,
                    gen: I.gid,
                    area: a.area,
                    area_x: a.area_x
                }, c);
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, f, function (a) {
                    b.find("#f_content").hide();
                    b.find("#f_content3").hide();
                    P(LNG.ACTIONTYPE_FULL[7], f, a.ret, function () {
                        b.find("#f_content").show();
                        b.find("#f_content3").show();
                        w();
                        null != k && (k.refresh(), k.setPosition(0, 0))
                    })
                }, function () {})
            }
            return !1
        },
        U = function () {
            var a = J();
            if (null == a) return showInfo(LNG.ERROR.CLIENT.EMPTYTARGETAREA), !1;
            var c = Utils.parseInt(b.find("#f_city_militay_3").find("#f_troop_input").find("input").val(), 0);
            if (0 >= c) return showInfo(LNG.ERROR.CLIENT.EMPTYTROOP), !1;
            var e = {
                key: key,
                city: mainStatus.getCity().id,
                action: "do_war",
                attack_type: 3,
                tai_num: c,
                area: a.area,
                area_x: a.area_x
            };
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, e, function (a) {
                b.find("#f_content").hide();
                b.find("#f_content3").hide();
                P(LNG.ACTIONTYPE_FULL[3], e, a.ret, function () {
                    b.find("#f_content").show();
                    b.find("#f_content3").show();
                    w();
                    null != k && (k.refresh(), k.setPosition(0, 0))
                })
            }, function () {});
            return !1
        },
        W = function () {
            var a = J();
            if (null == a) return showInfo(LNG.ERROR.CLIENT.EMPTYTARGETAREA), !1;
            var c = {
                key: key,
                city: mainStatus.getCity().id,
                action: "do_war",
                attack_type: 5,
                area: a.area,
                area_x: a.area_x,
                info: $("#f_troop_castle_name").val()
            };
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, c, function (a) {
                b.find("#f_content").hide();
                b.find("#f_content3").hide();
                R(LNG.ACTIONTYPE_FULL[5], c, a.ret, function () {
                    b.find("#f_content").show();
                    b.find("#f_content3").show();
                    w();
                    null != k && (k.refresh(), k.setPosition(0, 0))
                })
            }, function () {});
            return !1
        },
        X = function () {
            var a = J();
            if (null == a) return showInfo(LNG.ERROR.CLIENT.EMPTYTARGETAREA), !1;
            var c = N();
            if (0 == c.length) return showInfo(LNG.ERROR.CLIENT.EMPTYTROOP), !1;
            var c = K(c),
                e = $.extend({
                    key: key,
                    city: mainStatus.getCity().id,
                    action: "do_war",
                    attack_type: 2,
                    area: a.area,
                    area_x: a.area_x
                }, c);
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, e, function (a) {
                b.find("#f_content").hide();
                b.find("#f_content3").hide();
                R(LNG.ACTIONTYPE_FULL[2], e, a.ret, function () {
                    b.find("#f_content").show();
                    b.find("#f_content3").show();
                    w();
                    null != k && (k.refresh(), k.setPosition(0, 0))
                })
            }, function () {});
            return !1
        },
        Y = function () {
            b.find("#f_city_militay_0,#f_city_militay_2,#f_city_militay_3,#f_city_militay_5").hide();
            var a = b.find("#f_city_war_type_sel").val();
            da();
            t = "165px";
            "0" == a || "7" == a || "8" == a || "9" == a ? (b.find("#f_city_war_type_target").show(), b.find("#f_city_militay_0").show(), b.find("#f_troop_inputs").show()) : "10" == a ? (b.find("#f_city_war_type_target").hide(), b.find("#f_city_militay_2").show(), b.find("#f_troop_inputs").show(), t = "185px") : "2" == a ? (b.find("#f_city_war_type_target").show(), b.find("#f_city_militay_2").show(), b.find("#f_troop_inputs").show()) : "3" == a ? (b.find("#f_city_war_type_target").show(), b.find("#f_city_militay_3").show(), b.find("#f_troop_inputs").hide()) : "5" == a && (b.find("#f_city_war_type_target").show(), b.find("#f_city_militay_5").show(), b.find("#f_troop_inputs").hide());
            w();
            null != k && (k.refresh(), k.setPosition(0, 0));
            return !1
        };
    b.find("#f_content3_start").click(function () {
        var a = b.find("#f_city_war_type_sel").val();
        if ("0" == a) {
            if (0 < userinfo.protection) return showInfo(LNG.ERROR.CLIENT.NOMILITARY_PROTECTION), !1;
            if (0 != (userinfo.status & 1)) return showInfo(LNG.ERROR.CLIENT.NOMILITARY_TRUCE), !1;
            if (0 != (userinfo.status & 2)) return showInfo(LNG.ERROR.CLIENT.NOMILITARY_VACATION), !1
        } else if ("5" == a) {
            var c = Utils.trim($("#f_troop_castle_name").val());
            if ("" == c) return showInfo(LNG.ERROR.CLIENT.EMPTYCASTLENAME), !1;
            if ("0" == $("#f_city_militay_5").find("#f_troop_max_val").text()) return showInfo(LNG.ERROR.SERVER[2533]), !1;
            $("#f_troop_castle_name").val(c)
        } else if ("10" == a) {
            var e = N();
            if (0 == e.length) return showInfo(LNG.ERROR.CLIENT.EMPTYTROOP), !1;
            showConfirm(LNG.DISARMY, function () {
                pnlLoading.show();
                e = K(e);
                var a = $.extend({
                    key: key,
                    city: mainStatus.getCity().id,
                    action: "disband"
                }, e);
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SOLDIER_EDUCATE, a, function (a) {
                    mainStatus.CITY_INFO[6] += a.ret.w;
                    mainStatus.CITY_INFO[2] += a.ret.g;
                    mainStatus.CITY_INFO[4] += a.ret.f;
                    mainStatus.CITY_INFO[8] += a.ret.i;
                    showInfo(translate(LNG.GETITEM2, '<img src="img/res/wood.png"/>x' + a.ret.w + '&nbsp;<img src="img/res/food.png"/>x' + a.ret.f + '&nbsp;<img src="img/res/iron.png"/>x' + a.ret.i + '&nbsp;<img src="img/res/ic06_other.gif"/>x' + a.ret.g));
                    for (a = 0; a < l.soldiers.length; a++) {
                        var b = l.soldiers[a][0];
                        "undefined" != typeof e["soldier_num" + b] && null != e["soldier_num" + b] && (l.soldiers[a][1] -= e["soldier_num" + b])
                    }
                    G(function () {
                        Y();
                        da();
                        s(0, 0)
                    })
                })
            })
        }
        return "10" == a ? !1 : "7" == a ? S() : "8" == a ? V() : "3" == a ? U() : "5" == a ? W() : "2" == a ? X() : T(a)
    });
    var Z = function () {
            $("#f_content3").hide();
            $("#f_content3_military").hide();
            b.find("#f_content").removeClass("canvasbg");
            $("#wrapper").css("height", "225px");
            var a = k.x,
                c = k.y;
            k.setPosition(0, 0);
            Q = !0;
            showFreeHeroPanel(b.find("#f_content3_military_hero_select"), !1, function (e) {
                Q = !1;
                if (null == e) showInfo(LNG.ERROR.CLIENT.NOFREEHERO);
                else {
                    I = e;
                    var d = mainStatus.HERO_DATA[e.gid];
                    b.find("#f_city_militay_0_hero_name").html(d.name + "&nbsp;(" + e.g + ")");
                    b.find("#f_city_militay_0_hero_troop").text(e.c2)
                }
                $("#f_content3").show();
                $("#f_content3_military").show();
                b.find("#f_content").addClass("canvasbg");
                w();
                null != k && (k.refresh(), k.setPosition(a, c))
            });
            return !1
        },
        ea = function (a, c) {
            var e = mainStatus.SOLDIER_DATA[c[0]];
            a.find("#f_troop_name").text(e.name);
            a.find("#f_troop_max_val").text(c[1]);
            a.find("#f_troop_input_input").data("soldier", c);
            a.find("#f_troop_max").click(function () {
                var e = b.find("#f_city_militay_0_hero_troop").text();
                if ("" != e) {
                    var e = parseInt(e),
                        d = 0;
                    b.find("#f_troop_inputs").find("#f_troop_input_input").each(function () {
                        var a = $(this),
                            b = Utils.parseInt(a.val(), 0);
                        0 < b && a.data("soldier")[0] != c[0] && (d += b)
                    });
                    d < e ? (e -= d, e > c[1] && (e = c[1]), a.find("input").val(e)) : a.find("input").val(0)
                } else a.find("input").val(c[1]);
                return !1
            });
            var d = a.find("input").get(0);
            a.find("#f_troop_input_minus").unbind();
            a.find("#f_troop_input_minus").bind("mousedown touchstart", function () {
                H();
                r(d, -1, 0)
            });
            a.find("#f_troop_input_minus").bind("mouseup touchend", function () {
                H()
            });
            a.find("#f_troop_input_plus").unbind();
            a.find("#f_troop_input_plus").bind("mousedown touchstart", function () {
                H();
                r(d, 1, c[1])
            });
            a.find("#f_troop_input_plus").bind("mouseup touchend", function () {
                H()
            })
        },
        ca = null,
        da = function () {
            var a = b.find("#f_troop_inputs");
            null == ca && (ca = a.find("#f_troop_input"));
            a.empty();
            var c = 0,
                e = 0,
                d = 0;
            if (null != l && null != l.soldiers) {
                var f = b.find("#f_city_war_type_sel").val();
                window.selectProxy.proxySelect($("#f_city_war_type_sel")[0]);
                $.each(l.soldiers, function (h, p) {
                    var D = ca.clone();
                    D.attr("id", "f_troop_input_no" + h);
                    2 == p[0] ? (ea(b.find("#f_city_militay_3").find("#f_troop_input"), p), e = 1) : 8 == p[0] && (b.find("#f_city_militay_5").find("#f_troop_max_val").text(p[1]), d = 1);
                    if (0 < p[1] && ("7" != f || 8 != p[0])) ea(D, p), a.append(D.show()), c++
                })
            }
            b.find("#f_city_militay_3").is(":visible") ? 0 == e && showInfo(LNG.NOSOLDIERAVALIABLE) : b.find("#f_city_militay_5").is(":visible") ? 0 == d && showInfo(LNG.NOSOLDIERAVALIABLE) : 0 == c && showInfo(LNG.NOSOLDIERAVALIABLE)
        },
        fa = function () {
            G(function () {
                Y();
                da();
                s(0, 0)
            })
        };
    (function () {
        b.find("#f_city_war_type_sel").change(Y);
        b.find("#f_city_militay_select_hero").click(Z);
        b.find("#f_city_militay_map").click(function () {
            if ("" != $("#f_content3_war_x").val() && "" != $("#f_content3_war_y").val()) {
                var a = parseInt($("#f_content3_war_x").val()),
                    b = parseInt($("#f_content3_war_y").val());
                main_loadDiv("f_map.html", {
                    x: a,
                    y: b
                })
            } else main_loadDiv("f_map.html");
            return !1
        })
    })();
    $("#f_content2_defense_input").change(function () {
        var a = parseInt($("#f_content2_defense_input").val());
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SOLDIER_EDUCATE, {
            key: key,
            action: "def",
            city: mainStatus.getCity().id,
            defense: a
        }, function () {});
        return !1
    });
    var Q = !1;
    b.find("#f_tab1,#f_tab2,#f_tab3,#f_tab4,#f_tab5,#f_tab6").click(function (a) {
        !Q && $(this).hasClass("tab_inactive") && (b.find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), $("#f_content1,#f_content2,#f_content3,#f_content3_military,#f_content4,#f_content5,#f_content2_defense_type,#f_content6").hide(), $("#f_city_promotion").unbind().empty(), $(this).trigger("tab", a));
        return !1
    });
    var aa = null,
        ba = null;
    b.find("#f_tab6").bind("tab", function () {
        pnlLoading.show();
     ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, {
            key: key,
            act: "warinfo",
            city: mainStatus.CITY_ID
        }, function (a) {
            var e = a.ret[1];
            b.find("#f_content6_skill").html(LNG.DEFENSE_SKILL[Math.floor(e / 5)]);
            ba = a.ret[0];
            c();
            null != k && (k.refresh(), k.setPosition(0, 0))
        });
        b.find("#f_content6").show();
        b.find("#wrapper").css("height", "250px");
        b.find("#f_content").removeClass("canvasbg");
        b.find("#f_content").show();
        return !1
    });
    b.find("#f_tab5").bind("tab", function () {
        if (0 != userinfo.conq[0]) {
            pnlLoading.show();
            var a = CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO;
            ajaxCall(a, {
                key: key,
                action: "conquerend"
            }, function (a) {
                b.find("#f_content5_title2 strong").text(Utils.timeString(a.ret.sec))
            });
            b.find("#f_content5_title1").hide();
            b.find("#f_content5_title2 b").text(userinfo.conq[2]);
            b.find("#f_content5_title2").show();
            b.find("#f_content5_list_title").hide();
            b.find("#f_content5_list").hide()
        } else pnlLoading.show(), a = CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, ajaxCall(a, {
            key: key,
            action: "list_conquer"
        }, function (a) {
            aa = a.ret.list;
            v();
            null != k && (k.refresh(), k.setPosition(0, 0))
        }), b.find("#f_content5_title1 b").text(userinfo.conq[3]), b.find("#f_content5_title1").show(), b.find("#f_content5_title2").hide();
        b.find("#f_content5").show();
        b.find("#wrapper").css("height", "250px");
        b.find("#f_content").removeClass("canvasbg");
        b.find("#f_content").show();
        return !1
    });
    b.find("#f_tab4").bind("tab", function () {
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SOLDIER_EDUCATE, {
            key: key,
            city: mainStatus.CITY_ID,
            action: "hospital"
        }, function (b) {
            g = b.ret.list;
            a = b.ret.ids;
            n();
            null != k && (k.refresh(), k.setPosition(0, 0))
        });
        b.find("#wrapper").css("height", "250px");
        b.find("#f_content").removeClass("canvasbg");
        b.find("#f_content").show();
        return !1
    });
    b.find("#f_tab1").bind("tab", function () {
        b.find("#f_content").hide();
        b.find("#f_content3_military_hero_select").empty().unbind();
        b.find("#f_content1").show();
        return !1
    });
    b.find("#f_tab2").bind("tab", function () {
        var a = b.find("#f_content2");
        if (a.is(":visible")) return !1;
        b.find("#f_content2_defense_type").show();
        a.show();
        y();
        b.find("#wrapper").css("height", "250px");
        b.find("#f_content").removeClass("canvasbg");
        b.find("#f_content3_military_hero_select").empty().unbind();
        b.find("#f_content").show();
        null != k && (k.refresh(), k.setPosition(0, 0));
        return !1
    });
    b.find("#f_tab3").bind("tab", function () {
        if (b.find("#f_content3").is(":visible")) return !1;
        b.find("#f_action_build_confirm, #f_action_military_confirm").hide();
        b.find("#f_content3").show();
        b.find("#f_content3_military").show();
        b.find("#f_content").addClass("canvasbg");
        b.find("#f_content").show();
        fa();
        w();
        s();
        return !1
    });
    b.find("#f_close").click(function () {
        showCity();
        return !1
    });
    b.find("#f_soldier_close").click(function () {
        b.find("#f_soldier_info").hide();
        return !1
    });
    b.css("background-image", "url(img/bg/view.jpg)");
    (function () {
        "undefined" != typeof statinfo.ce && null != statinfo.ce && 1 == statinfo.ce ? $("#f_tab5").show() : ($("#f_tab5").hide(), $("#f_city_war_type_sel option[value='9']").remove());
        window.isIphone && (Utils.replaceInput(document.getElementById("f_num_input"), "number"), b.find("#f_troop_input_input").each(function (a, b) {
            Utils.replaceInput(b, "number")
        }), Utils.replaceInput(document.getElementById("f_food_input"), "number"), Utils.replaceInput(document.getElementById("f_wood_input"), "number"), Utils.replaceInput(document.getElementById("f_gold_input"), "number"), Utils.replaceInput(document.getElementById("f_iron_input"), "number"), Utils.replaceInput(document.getElementById("f_content3_war_x"), "number"), Utils.replaceInput(document.getElementById("f_content3_war_y"), "number"));
        pnlLoading.hide();
        var a = Utils.getCookie("warinfo");
        if (null != a && "" != a) {
            $("#f_city_war_type_sel").val(a.type);
            b.find("#f_content1").hide();
            b.find("#f_content3").show();
            b.find("#f_content3_military").show();
            b.find("#f_content").addClass("canvasbg");
            b.find("#f_tab1").removeClass("tab_active").addClass("tab_inactive");
            b.find("#f_tab3").removeClass("tab_inactive").addClass("tab_active");
            t = 10 == a.type ? "185px" : "165px";
            w();
            "undefined" != typeof a.x && $("#f_content3_war_x").val(a.x);
            "undefined" != typeof a.y && $("#f_content3_war_y").val(a.y);
            if ((7 == a.type || 0 == a.type) && "undefined" != typeof a.y && "undefined" != typeof a.x) {
                var c = {
                    key: key,
                    city: mainStatus.getCity().id,
                    act: "anum",
                    x: a.x,
                    y: a.y
                };
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, c, function (a) {
                    $("#f_city_militay_anum b").text(a.ret);
                    $("#f_city_militay_anum").show()
                })
            }
            if ("undefined" != typeof a.force && null != a.force && "" != a.force) C = a.force;
            fa();
            Utils.delCookie("warinfo")
        }
        k = new iScroll("scroller", {
            desktopCompatibility: !0
        })
    })()
});
defineSubView("f_city_research", function () {
    function w(a, b) {
        null != c && (c.refresh(), c.setPosition(a || 0, b || 0));
        return !1
    }
    function s() {
        g.find("#f_content3_scroll").unbind().empty();
        $.each(H, function (a, b) {
            var c = mainStatus.ITEM_DATA[b.sid];
            if (!("undefined" == typeof c || null == c)) {
                for (var e = LNG.ITEMRANK[c.rank], d = c.desc, f = 0; f < b.attr.length; f++) 0 != b.attr[f] && (d = translate(d, b.attr[f]));
                g.find("#f_content3_scroll").append('<p><input id="f_content3_sel' + b.id + '" type="checkbox"/>&nbsp;<b><font color="' + e.color + '">' + c.name + '</font></b> <strong>(<font color="' + e.color + '">' + e.name + "</font>)</strong> <b>" + (0 < b.up ? "+" + b.up : "") + "</b></p>");
                g.find("#f_content3_sel" + b.id).click(function () {
                    null != F && g.find("#f_content3_sel" + F.id).attr("checked", !1);
                    F = b;
                    g.find("#f_content3_img").css("background-image", "url(" + Utils.getItemImage(b.sid) + ")");
                    g.find("#f_content3_name").css("color", e.color).text(c.name);
                    g.find("#f_content3_rank").css("color", e.color).text(e.name);
                    g.find("#f_content3_level").text(0 < b.up ? "+" + b.up : "");
                    g.find("#f_content3_desc").html(d);
                    g.find("#f_content3_gold b").text(b.p)
                })
            }
        })
    }
    function n(a) {
        g.find("#f_content3_sel" + a).click();
        g.find("#f_content3_sel" + a).attr("checked", !0)
    }
    function v() {
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
            key: key,
            action: "listupdate",
            type: r
        }, function (a) {
            H = a.ret.item;
            g.find("#f_content3_per").text(a.ret.per);
            0 < a.ret.cd ? (g.find("#f_content3_cd b").text(Utils.timeString(a.ret.cd)), g.find("#f_content3_gold").hide(), g.find("#f_content3_cd").show(), g.find("#f_content3_upgrade").hide()) : (g.find("#f_content3_gold").show(), g.find("#f_content3_cd").hide(), g.find("#f_content3_upgrade").show());
            0 < a.ret.up ? g.find("#f_content3_trend").attr("src", "img/button/arrow_u.png") : g.find("#f_content3_trend").attr("src", "img/button/arrow_d.png");
            s();
            null == H || 0 == H.length ? ($("#f_content3_img").css("background-image", "url(img/item/sample.gif)"), $("#f_content3_name").text("N/A"), $("#f_content3_rank").text("N/A"), $("#f_content3_level").text(""), $("#f_content3_desc").text(""), $("#f_content3_upgrade").hide(), $("#f_content3_degrade").hide()) : (n(H[0].id), $("#f_content3_upgrade").show(), $("#f_content3_degrade").show());
            null != c && (c.refresh(), c.setPosition(0, 0))
        })
    }
    var c = null,
        k = $("#f_city_research_html_script"),
        g = $(k.parent().get(0)),
        a = EMA.getProxy();
    g.bind("dispose", function () {
        null != c && (c.destroy(!1), c = null);
        Utils.removeCss("f_city_research_css");
        a.dispose();
        g = a = null
    });
    var t = [{
        buildtype: 9,
        panel: g.find("#f_content1").find("#f_lab")
    }],
        u = mainStatus.BUILDING_DATA,
        b = function (a) {
            var b = mainStatus.getCity(),
                c = u[a.buildtype],
                e = mainStatus.CITY_INFO.getLevel(a.buildtype),
                d = c.upgrade[e];
            if (d) 0 < e ? (c = LNG.CONFIRMBUILD, c = LNG.UPGRADE_CONFIRM, showConfirm(c, function () {
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
                    key: key,
                    city: b.id,
                    build_type: a.buildtype
                }, function (b) {
                    a.panel.find("#f_upgrade").hide();
                    a.panel.find("#f_build_promotion").show();
                    mainStatus.CITY_INFO[6] -= d.w;
                    mainStatus.CITY_INFO[2] -= d.g;
                    mainStatus.CITY_INFO[4] -= d.f;
                    mainStatus.CITY_INFO[8] -= d.i;
                    CMA.add(b.ret.cdlist)
                }, function (a) {
                    (704 == a || 707 == a) && CMA.reload()
                })
            })) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
                key: key,
                city: b.id,
                build_type: a.buildtype
            }, function (b) {
                a.panel.find("#f_upgrade").hide();
                a.panel.find("#f_build_promotion").show();
                mainStatus.CITY_INFO[6] -= d.w;
                mainStatus.CITY_INFO[2] -= d.g;
                mainStatus.CITY_INFO[4] -= d.f;
                mainStatus.CITY_INFO[8] -= d.i;
                CMA.add(b.ret.cdlist)
            }, function (a) {
                (704 == a || 707 == a) && CMA.reload()
            }))
        },
        B = [{
            id: 115,
            shop: 1
        }, {
            id: 116,
            shop: 1
        }, {
            id: 117,
            shop: 1
        }],
        m = [{
            id: 1001,
            shop: 1,
            icon: "gem.jpg",
            name: LNG.INSTANT_COMPLETE,
            desc: LNG.INSTANT_COMPLETE_DESC,
            price: 0
        }],
        C = function (a) {
            var b = CMA.getCD(1, a.buildtype);
            if (null != b) return a = (new Date).getTime(), a = Math.ceil((b.end - a) / 1E3), pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CD_PRICE, {
                type: b.cdtype,
                secs: a
            }, function (a) {
                e = !0;
                a = a.ret.price;
                0 < a ? m[0].price = a : m = null;
                $("#f_content1").hide();
                showItemPromotion($("#f_city_promotion"), B, function (a) {
                    e = !1;
                    if (1001 == a) {
                        pnlLoading.show();
                        var c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO;
                        ajaxCall(c, {
                            key: key,
                            city: mainStatus.CITY_ID,
                            tid: b.id,
                            action: "build2"
                        }, function (a) {
                            userinfo.money = a.ret.money;
                            refreshUserInfo();
                            CMA.changeSecs(b.id, 0);
                            showInfo(LNG.SUCCESS)
                        })
                    } else 0 != a && (pnlLoading.show(), c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO, ajaxCall(c, {
                        key: key,
                        city: mainStatus.CITY_ID,
                        tid: b.id,
                        action: "build",
                        iid: a
                    }, function (a) {
                        CMA.changeSecs(b.id, a.ret.secs);
                        showInfo(LNG.SUCCESS)
                    }));
                    $("#f_content1").show()
                }, !0, m)
            }), !1
        },
        d = function (a, b) {
            if (u) {
                var c = u[a],
                    e = mainStatus.CITY_INFO.getLevel(a),
                    d = c.upgrade[e];
                d && (b.find("#f_title").html(c.name), Utils.loadImage(b.find("#f_img"), Utils.getBuildingImage(a)), b.find("#f_desc").html(c.desc), b.find("#f_level").html(e), b.find("#resfood b").html(d.f), mainStatus.CITY_INFO[4] < d.f && b.find("#resfood b").css("color", "#FFD17A"), b.find("#reswood b").html(d.w), mainStatus.CITY_INFO[6] < d.w && b.find("#reswood b").css("color", "#FFD17A"), b.find("#resiron b").html(d.i), mainStatus.CITY_INFO[8] < d.i && b.find("#resiron b").css("color", "#FFD17A"), b.find("#resgold b").html(d.g), mainStatus.CITY_INFO[2] < d.g && b.find("#resgold b").css("color", "#FFD17A"), d = buildtime(d.t, mainStatus.CITY_INFO[22]), "undefined" != typeof statinfo.vs && null != statinfo.vs && (d *= statinfo.vs), b.find("#clock b").html(Utils.timeString2(Math.ceil(d))), c.upgrade[e + 1] ? (b.find("#f_upgrade").show(), b.find("#f_build_promotion").hide()) : (b.find("#f_upgrade").hide(), b.find("#f_cd1").hide()))
            }
        },
        k = function () {
            $.each(t, function (a, b) {
                d(b.buildtype, b.panel)
            })
        },
        E = function (a, b) {
            $.each(t, function (a, c) {
                c.buildtype == b && d(c.buildtype, c.panel)
            });
            i = !0
        };
    $.each(t, function (b, c) {
        var e = c.panel,
            d = t[b].buildtype,
            f = e.find("#f_cd1 p"),
            h = e.find("#f_upgrade"),
            i = e.find("#f_build_promotion");
        a.bind(CMA.getTickEventId(1, d), function (a) {
            h.hide();
            i.show();
            f.html(Utils.timeString2(a))
        });
        a.bind(CMA.getDoneEventId(1, d), function () {
            E(h, d)
        })
    });
    k();
    (function () {
        $.each(t, function (a, c) {
            c.panel.find("#f_upgrade").click(function () {
                b(c);
                return !1
            });
            c.panel.find("#f_build_promotion").click(function () {
                C(c);
                return !1
            })
        })
    })();
    CMA.forceNotify();
    a.bind("cityinfoupdate", k);
    var o = g.find("#f_content2"),
        q = function (a, b) {
            var c = mainStatus.TECH_DATA[b[0]],
                e = c.upgrade[b[1]];
            Utils.loadImage(a.find("#f_tech_icon"), Utils.getTechImage(b[0]));
            a.find("#f_title").html(c.name);
            a.find("#f_desc").html(c.desc);
            1 == b[2] ? a.find("#f_need").html("<b>" + LNG.NEED + "</b>:&nbsp;" + c.need) : a.find("#f_need").html(LNG.NEED + ":&nbsp;<font color=#FFD17A>" + c.need + "</font>");
            a.find("#f_level").html(b[1]);
            a.find("#resfood b").html(e.f);
            mainStatus.CITY_INFO[4] < e.f && a.find("#resfood b").css("color", "#FFD17A");
            a.find("#reswood b").html(e.w);
            mainStatus.CITY_INFO[6] < e.w && a.find("#reswood b").css("color", "#FFD17A");
            a.find("#resiron b").html(e.i);
            mainStatus.CITY_INFO[8] < e.i && a.find("#resiron b").css("color", "#FFD17A");
            a.find("#resgold b").html(e.g);
            mainStatus.CITY_INFO[2] < e.g && a.find("#resgold b").css("color", "#FFD17A");
            c = techtime(e.t, mainStatus.CITY_INFO[18]);
            "undefined" != typeof statinfo.vs && null != statinfo.vs && (c *= statinfo.vs);
            a.find("#clock b").html(Utils.timeString2(Math.ceil(c)));
            0 == b[2] && (a.find("#f_upgrade").hide(), a.find("#f_cd1").hide())
        },
        x = function (b, c) {
            var d = mainStatus.TECH_DATA[c[0]].upgrade[c[1]];
            q(b, c);
            var f = b.find("#f_cd1 p"),
                r = b.find("#f_upgrade"),
                h = b.find("#f_tech_promotion");
            a.unbind(CMA.getTickEventId(2, c[0]));
            a.bind(CMA.getTickEventId(2, c[0]), function (a) {
                r.hide();
                h.show();
                f.html(Utils.timeString2(a))
            });
            a.unbind(CMA.getDoneEventId(2, c[0]));
            a.bind(CMA.getDoneEventId(2, c[0]), function () {
                i = !0;
                A()
            });
            var l = [{
                id: 118,
                shop: 1
            }, {
                id: 122,
                shop: 1
            }, {
                id: 165,
                shop: 1
            }],
                g = [{
                    id: 1001,
                    shop: 1,
                    icon: "gem.jpg",
                    name: LNG.INSTANT_COMPLETE,
                    desc: LNG.INSTANT_COMPLETE_DESC,
                    price: 0
                }];
            h.click(function () {
                var a = CMA.getCD(2, c[0]);
                if (null != a) {
                    var b = (new Date).getTime(),
                        b = Math.ceil((a.end - b) / 1E3);
                    pnlLoading.show();
                    ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CD_PRICE, {
                        type: a.cdtype,
                        secs: b
                    }, function (b) {
                        e = !0;
                        b = b.ret.price;
                        0 < b ? g[0].price = b : g = null;
                        $("#f_content2").hide();
                        $("#f_content2_next").hide();
                        showItemPromotion($("#f_city_promotion"), l, function (b) {
                            e = !1;
                            if (1001 == b) {
                                pnlLoading.show();
                                var c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO;
                                ajaxCall(c, {
                                    key: key,
                                    city: mainStatus.CITY_ID,
                                    tid: a.id,
                                    action: "study2"
                                }, function (b) {
                                    userinfo.money = b.ret.money;
                                    refreshUserInfo();
                                    CMA.changeSecs(a.id, 0);
                                    showInfo(LNG.SUCCESS)
                                })
                            } else 0 != b && (pnlLoading.show(), c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO, ajaxCall(c, {
                                key: key,
                                city: mainStatus.CITY_ID,
                                tid: a.id,
                                action: "study",
                                iid: b
                            }, function (b) {
                                CMA.changeSecs(a.id, b.ret.secs);
                                showInfo(LNG.SUCCESS)
                            }));
                            $("#f_content2").show();
                            null != z && 0 < z[0] && $("#f_content2_next").show()
                        }, !0, g)
                    })
                }
            });
            r.click(function () {
                0 < c[1] ? showConfirm(LNG.CONFIRMRESEARCH, function () {
                    j(c, d, r, h)
                }) : j(c, d, r, h);
                return !1
            })
        },
        j = function (a, b, d, f) {
            g.find("#f_content2").hide();
            g.find("#f_content2_next").hide();
            var i = c.x,
                h = c.y;
            e = !0;
            showFreeHeroPanel(g.find("#f_city_wall_heros").empty().show(), !0, function (c) {
                e = !1;
                g.find("#f_city_wall_heros").hide();
                g.find("#f_content2").show();
                null != z && 0 < z[0] && g.find("#f_content2_next").show();
                w(i, h);
                var r = 0;
                if (null != c) r = c.id;
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_STUDY, {
                    key: key,
                    city: mainStatus.getCity().id,
                    tech: a[0],
                    owner: r
                }, function (a) {
                    d.hide();
                    f.show();
                    mainStatus.CITY_INFO[6] -= b.w;
                    mainStatus.CITY_INFO[2] -= b.g;
                    mainStatus.CITY_INFO[4] -= b.f;
                    mainStatus.CITY_INFO[8] -= b.i;
                    CMA.add(a.ret.cdlist)
                }, function (a) {
                    1003 == a && CMA.reload()
                })
            }, "intellect")
        },
        i = !0,
        f = function (a) {
            null == l || i ? (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_STUDY_LIST, {
                key: key,
                city: mainStatus.getCity().id
            }, function (b) {
                l = b.ret;
                z = b.ext;
                i = !1;
                a && a()
            }, function (a) {
                903 == a && g.find("#f_tab1").click();
                return !1
            }, "#loading")) : a && a()
        },
        l = null,
        z = null,
        G = !1,
        A = function () {
            G && !1 == i ? null != z && 0 < z[0] ? $("#f_content2_next").show() : $("#f_content2_next").hide() : f(function () {
                o.empty();
                null != l && (l.sort(function (a, b) {
                    return a.id - b.id
                }), $.each(l, function (a, b) {
                    var c = $("#f_tech_template").clone();
                    c.attr("id", "f_tech_no" + a);
                    x(c, b);
                    o.append(c.show())
                }));
                if (null != z && 0 < z[0]) {
                    $("#f_content2_next_level").text(z[1]);
                    var a = mainStatus.TECH_DATA[z[0]],
                        b = a.upgrade[0];
                    Utils.loadImage($("#f_content2_next_icon"), Utils.getTechImage(z[0]));
                    $("#f_content2_next_title").html(a.name);
                    $("#f_content2_next_desc").html(a.desc);
                    $("#f_content2_next_need").html("<b>" + LNG.NEED + "</b>:&nbsp;" + a.need);
                    $("#f_content2_next_resfood b").html(b.f);
                    $("#f_content2_next_reswood b").html(b.w);
                    $("#f_content2_next_resiron b").html(b.i);
                    $("#f_content2_next_resgold b").html(b.g);
                    a = techtime(b.t, mainStatus.CITY_INFO[18]);
                    "undefined" != typeof statinfo.vs && null != statinfo.vs && (a *= statinfo.vs);
                    $("#f_content2_next_clock b").html(Utils.timeString2(Math.ceil(a)));
                    $("#f_content2_next").show()
                } else $("#f_content2_next").hide();
                CMA.forceNotify(2);
                w();
                G = !0
            })
        },
        e = !1;
    g.find("#f_tab1,#f_tab2,#f_tab3").click(function (a) {
        !e && $(this).hasClass("tab_inactive") && (g.find("#f_content_title").find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), g.find("#f_content1,#f_content2,#f_content2_next,#f_content3_title,#f_content3_scroll,#f_content3").hide(), g.find("#f_content").css("top", "0px").css("height", "228px"), $(this).trigger("tab", a));
        return !1
    });
    g.find("#f_content3_tab1,#f_content3_tab2,#f_content3_tab3,#f_content3_tab4,#f_content3_tab5").click(function (a) {
        !e && $(this).hasClass("tab_inactive") && (g.find("#f_content3_title").find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), $(this).trigger("tab", a));
        return !1
    });
    g.find("#f_content3_tab1").bind("tab", function () {
        r = 1;
        v();
        return !1
    });
    g.find("#f_content3_tab2").bind("tab", function () {
        r = 2;
        v();
        return !1
    });
    g.find("#f_content3_tab3").bind("tab", function () {
        r = 5;
        v();
        return !1
    });
    g.find("#f_content3_tab4").bind("tab", function () {
        r = 4;
        v();
        return !1
    });
    g.find("#f_content3_tab5").bind("tab", function () {
        r = 6;
        v();
        return !1
    });
    g.find("#f_tab1").bind("tab", function () {
        var a = g.find("#f_content1");
        if (a.is(":visible")) return !1;
        g.find("#wrapper").css("top", "0px").css("height", "228px");
        a.show();
        null != c && (c.refresh(), c.setPosition(0, 0));
        return !1
    });
    g.find("#f_tab2").bind("tab", function () {
        var a = g.find("#f_content2");
        if (a.is(":visible")) return !1;
        g.find("#wrapper").css("top", "0px").css("height", "228px");
        a.show();
        A();
        null != c && (c.refresh(), c.setPosition(0, 0));
        return !1
    });
    g.find("#f_content3_degrade").click(function () {
        if (null != F) {
            if (0 == F.up) return showInfo(LNG.NOTUPGRADE), !1;
            showConfirm(translate(LNG.CONFIRMDEHANCE, mainStatus.ITEM_DATA[F.sid].name), function () {
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
                    key: key,
                    city: mainStatus.getCity().id,
                    id: F.id,
                    action: "degrade"
                }, function (a) {
                    mainStatus.CITY_INFO[2] += a.ret[1];
                    F.p = a.ret[2];
                    F.attr = a.ret[3];
                    F.up = a.ret[4];
                    s();
                    n(F.id);
                    showInfo(translate(LNG.GOLDRETURN, a.ret[1]))
                })
            })
        }
        return !1
    });
    g.find("#f_content3_upgrade").click(function () {
        if (null != F) {
            var a = mainStatus.ITEM_DATA[F.sid],
                b = null,
                b = 0 < F.up ? translate(LNG.CONFIRMENHANCE, a.name) : translate(LNG.CONFIRMNOTRADE, a.name);
            showConfirm(b, function () {
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
                    key: key,
                    city: mainStatus.getCity().id,
                    id: F.id,
                    action: "upgrade"
                }, function (a) {
                    g.find("#f_content3_gold").hide();
                    g.find("#f_content3_cd b").text(Utils.timeString(a.ret[1]));
                    g.find("#f_content3_cd").show();
                    g.find("#f_content3_upgrade").hide();
                    mainStatus.CITY_INFO[2] -= g.find("#f_content3_gold b").text();
                    0 == a.ret[0] ? showInfo(LNG.UPGRADEFAIL) : (F.p = a.ret[2], F.attr = a.ret[3], F.up = a.ret[4], s(), n(F.id), showInfo(LNG.SUCCESS))
                })
            })
        }
        return !1
    });
    g.find("#f_content3_cd").click(function () {
        showConfirm(LNG.CONFIRMENHANCECD, function () {
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
                key: key,
                action: "cd"
            }, function (a) {
                g.find("#f_content3_gold").show();
                g.find("#f_content3_cd").hide();
                g.find("#f_content3_upgrade").show();
                userinfo.money = a.ret.money;
                refreshUserInfo()
            })
        });
        return !1
    });
    var r = 1,
        H = null,
        F = null;
    g.find("#f_tab3").bind("tab", function () {
        var a = g.find("#f_content3");
        if (a.is(":visible")) return !1;
        g.find("#wrapper").css("top", "10px").css("height", "190px");
        g.find("#f_content3_title").show();
        g.find("#f_content3_scroll").show();
        a.show();
        null == H ? v() : null != c && (c.refresh(), c.setPosition(0, 0));
        return !1
    });
    g.find("#f_close").click(function () {
        showCity();
        return !1
    });
    g.css("background-image", "url(img/bg/view.jpg)");
    c = new iScroll("scroller", {
        desktopCompatibility: !0
    });
    pnlLoading.hide()
});
defineSubView("f_city_resource", function () {
    var w = null,
        s = $("#f_city_resource_html_script"),
        n = $(s.parent().get(0)),
        v = EMA.getProxy();
    n.bind("dispose", function () {
        null != w && (w.destroy(!1), w = null);
        t && clearTimeout(t);
        Utils.removeCss("f_city_resource_css");
        v.dispose();
        n = v = null
    });
    var c = null,
        k = !1,
        g = function (a, b, d) {
            function f() {
                var D = Math.ceil(Math.pow(j, 1.5)),
                    D = D > l ? l : D,
                    D = i + b * D;
                0 < b && D > d || 0 > b && D < d ? (k = !1, clearInterval(c), a.val(d)) : a.val(D);
                j++
            }
            k = !0;
            var i = Utils.parseInt(a.val(), 0),
                l = Math.abs(d - i),
                j = 1;
            f();
            1 < l && setTimeout(function () {
                clearInterval(c);
                k && (c = setInterval(f, 100))
            }, 300)
        },
        a = function () {
            k = !1;
            clearInterval(c);
            timer = null
        },
        t = null,
        s = n.find("#f_content1"),
        u = [{
            buildtype: 1,
            panel: s.find("#f_fac_wood")
        }, {
            buildtype: 2,
            panel: s.find("#f_fac_iron")
        }, {
            buildtype: 3,
            panel: s.find("#f_fac_gold")
        }, {
            buildtype: 4,
            panel: s.find("#f_fac_food")
        }],
        b = mainStatus.BUILDING_DATA,
        B = function (a) {
            var c = mainStatus.getCity(),
                d = b[a.buildtype],
                f = mainStatus.CITY_INFO.getLevel(a.buildtype),
                i = d.upgrade[f];
            if (i) 0 < f ? (d = LNG.CONFIRMBUILD, d = LNG.UPGRADE_CONFIRM, showConfirm(d, function () {
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
                    key: key,
                    city: c.id,
                    build_type: a.buildtype
                }, function (b) {
                    a.panel.find("#f_upgrade").hide();
                    a.panel.find("#f_build_promotion").show();
                    mainStatus.CITY_INFO[6] -= i.w;
                    mainStatus.CITY_INFO[2] -= i.g;
                    mainStatus.CITY_INFO[4] -= i.f;
                    mainStatus.CITY_INFO[8] -= i.i;
                    CMA.add(b.ret.cdlist)
                }, function (a) {
                    (704 == a || 707 == a) && CMA.reload()
                })
            })) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
                key: key,
                city: c.id,
                build_type: a.buildtype
            }, function (b) {
                a.panel.find("#f_upgrade").hide();
                a.panel.find("#f_build_promotion").show();
                mainStatus.CITY_INFO[6] -= i.w;
                mainStatus.CITY_INFO[2] -= i.g;
                mainStatus.CITY_INFO[4] -= i.f;
                mainStatus.CITY_INFO[8] -= i.i;
                CMA.add(b.ret.cdlist)
            }, function (a) {
                (704 == a || 707 == a) && CMA.reload()
            }))
        },
        m = function (a, c) {
            if (b) {
                var d = b[a],
                    f = mainStatus.CITY_INFO.getLevel(a),
                    i = d.upgrade[f];
                if (!("undefined" == typeof i || null == i)) {
                    var l = 0.9 < CONFIG.VER ? 0.7 : 1;
                    if ("undefined" != typeof statinfo.vr && null != statinfo.vr) {
                        var j = Math.floor(i.v * statinfo.vr / l);
                        c.find("#f_value b").html(j)
                    } else c.find("#f_value b").html(i.v);
                    j = d.upgrade[f + 1];
                    "undefined" == typeof j || null == j ? c.find("#f_value_next b").html("N/A") : "undefined" != typeof statinfo.vr && null != statinfo.vr ? (j = Math.floor(j.v * statinfo.vr / l), c.find("#f_value_next b").html(j)) : c.find("#f_value_next b").html(j.v);
                    c.find("#f_title").html(d.name);
                    Utils.loadImage(c.find("#f_img"), Utils.getBuildingImage(a));
                    c.find("#f_desc").html(d.desc);
                    c.find("#f_level").html(f);
                    c.find("#resfood b").html(i.f);
                    mainStatus.CITY_INFO[4] < i.f && c.find("#resfood b").css("color", "#FFD17A");
                    c.find("#reswood b").html(i.w);
                    mainStatus.CITY_INFO[6] < i.w && c.find("#reswood b").css("color", "#FFD17A");
                    c.find("#resiron b").html(i.i);
                    mainStatus.CITY_INFO[8] < i.i && c.find("#resiron b").css("color", "#FFD17A");
                    c.find("#resgold b").html(i.g);
                    mainStatus.CITY_INFO[2] < i.g && c.find("#resgold b").css("color", "#FFD17A");
                    i = buildtime(i.t, mainStatus.CITY_INFO[22]);
                    "undefined" != typeof statinfo.vs && null != statinfo.vs && (i *= statinfo.vs);
                    c.find("#clock b").html(Utils.timeString2(Math.ceil(i)));
                    d.upgrade[f + 1] ? c.find("#f_upgrade").show() : (c.find("#f_upgrade").hide(), c.find("#f_cd1").hide())
                }
            }
        },
        s = function () {
            $.each(u, function (a, b) {
                m(b.buildtype, b.panel)
            })
        },
        C = function (a, b) {
            $.each(u, function (a, c) {
                c.buildtype == b && m(c.buildtype, c.panel)
            })
        };
    $.each(u, function (a, b) {
        var c = b.panel,
            d = u[a].buildtype,
            f = c.find("#f_cd1 p"),
            i = c.find("#f_upgrade");
        v.bind(CMA.getTickEventId(1, d), function (a) {
            i.hide();
            f.html(Utils.timeString2(a))
        });
        v.bind(CMA.getDoneEventId(1, d), function () {
            C(i, d)
        })
    });
    s();
    (function () {
        $.each(u, function (a, b) {
            b.panel.find("#f_upgrade").click(function () {
                B(b);
                return !1
            })
        })
    })();
    CMA.forceNotify();
    v.bind("cityinfoupdate", s);
    var d = n.find("#f_content2"),
        E = function () {
            var a = [];
            d.find("#f_plan_per").each(function () {
                a.push($(this).val())
            });
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_PRODUCE_PLAN, {
                key: key,
                city: mainStatus.getCity().id,
                action: "produce_plan_do",
                wood: a[0],
                iron: a[1],
                gold: a[2],
                food: a[3]
            }, function (a) {
                showInfo(LNG.SUCCESS);
                o(a.ret)
            }, function () {});
            return !1
        };
    d.find("#f_plan_per").change(function () {
        var a = $(this),
            b = parseInt(a.val());
        a.val(isNaN(b) || 100 < b || 0 > b ? 100 : b)
    });
    var o = function (a) {
            var b = d.find("#f_produce_plan_form > div");
            null != a && $.each(a, function (a, c) {
                var e = $(b[c.restype - 1]);
                with(e) find("#f_res_level").text(c.level), find("#f_plan_per").val(c.per), find("#f_plan_heads").text(c.heads), find("#f_plan_output").text(c.desc)
            });
            d.find("#f_produce_plan_save").unbind().click(E)
        },
        q = function () {
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_PRODUCE_PLAN, {
                key: key,
                city: mainStatus.getCity().id
            }, function (a) {
                o(a.ret)
            }, function () {})
        },
        x = $("#f_content3"),
        j = x.find("#f_exchange_form"),
        i = function () {
            var a = {};
            $.each("g2w,g2f,g2i,w2g,f2g,i2g".split(","), function (b, c) {
                var d = j.find("#" + c).find("#exval"),
                    d = Utils.parseInt(d.val(), 0);
                0 < d && (a[c] = d)
            });
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MARKERT_LOCAL, $.extend({
                key: key,
                city: mainStatus.getCity().id,
                reso_put: "giveput"
            }, a), function (a) {
                mainStatus.CITY_INFO[2] = a.ret.g;
                mainStatus.CITY_INFO[4] = a.ret.f;
                mainStatus.CITY_INFO[6] = a.ret.w;
                mainStatus.CITY_INFO[8] = a.ret.i;
                v.trigger("cityinfoupdate");
                showInfo(LNG.SUCCESS)
            }, function () {});
            return !1
        },
        f = function () {
            j.find("#g2w").find("#val").text(mainStatus.CITY_INFO[2]);
            j.find("#g2f").find("#val").text(mainStatus.CITY_INFO[2]);
            j.find("#g2i").find("#val").text(mainStatus.CITY_INFO[2]);
            j.find("#w2g").find("#val").text(mainStatus.CITY_INFO[6]);
            j.find("#f2g").find("#val").text(mainStatus.CITY_INFO[4]);
            j.find("#i2g").find("#val").text(mainStatus.CITY_INFO[8])
        };
    v.bind("cityinfoupdate", f);
    var l = function () {
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MARKERT_LOCAL, {
                key: key,
                city: mainStatus.getCity().id
            }, function (b) {
                var c = b.ret,
                    d = {
                        g2w: 2,
                        g2f: 2,
                        g2i: 2,
                        w2g: 6,
                        f2g: 4,
                        i2g: 8
                    };
                $.each("g2w,g2f,g2i,w2g,f2g,i2g".split(","), function (b, e) {
                    var f = j.find("#" + e),
                        i = f.find("#exval"),
                        D = f.find("#t_val");
                    i.unbind();
                    i.change(function () {
                        var a = Utils.parseInt(i.val(), 0),
                            b = mainStatus.CITY_INFO[d[e]];
                        a > b && (a = b);
                        i.val(a);
                        if ("g" == e.substr(0, 1)) {
                            var f = 0;
                            $.each(["g2w", "g2f", "g2i"], function (a, b) {
                                f += Utils.parseInt(j.find("#" + b).find("#exval").val(), 0)
                            });
                            f > b && (a -= f - b, i.val(a))
                        }
                        0 <= a && D.text(Math.floor(a / c[e]))
                    });
                    f.find("#f_num_minus").unbind();
                    f.find("#f_num_minus").bind("mousedown touchstart", function () {
                        a();
                        g(i, -1, 0)
                    });
                    var l = null;
                    f.find("#f_num_minus").bind("mouseup touchend", function () {
                        a();
                        Utils.parseInt(i.value, 0);
                        clearTimeout(l);
                        l = setTimeout(function () {
                            i.change()
                        }, 300)
                    });
                    f.find("#f_num_plus").unbind();
                    f.find("#f_num_plus").bind("mousedown touchstart", function () {
                        a();
                        g(i, 1, mainStatus.CITY_INFO[d[e]])
                    });
                    var h = null;
                    f.find("#f_num_plus").bind("mouseup touchend", function () {
                        a();
                        Utils.parseInt(i.value, 0);
                        clearTimeout(h);
                        h = setTimeout(function () {
                            i.change()
                        }, 300)
                    });
                    f.find("#f_num_max").unbind().click(function () {
                        a();
                        i.val(mainStatus.CITY_INFO[d[e]]);
                        i.change()
                    })
                });
                x.find("#f_exchange_save a").unbind().click(i)
            }, function () {});
            f()
        },
        z = !1;
    n.find(".tab_active,.tab_inactive").click(function (a) {
        if (z) return !1;
        $(this).hasClass("tab_inactive") && (n.find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), n.find("#f_content1,#f_content2,#f_content3").hide(), $(this).trigger("tab", a));
        return !1
    });
    n.find("#f_tab1").bind("tab", function () {
        n.find("#f_content1").show();
        return !1
    });
    n.find("#f_tab2").bind("tab", function () {
        d.show();
        q();
        return !1
    });
    n.find("#f_tab3").bind("tab", function () {
        x.show();
        l();
        return !1
    });
    n.find("#f_close").click(function () {
        showCity();
        return !1
    });
    n.find("#f_produce_plan_form_wood_promotion").click(function () {
        z = !0;
        $("#f_content2").hide();
        showItemPromotion($("#f_city_resource_promotion"), [{
            id: 123,
            shop: 1
        }, {
            id: 119,
            shop: 1
        }, {
            id: 120,
            shop: 1
        }], function (a) {
            z = !1;
            $("#f_content2").show();
            0 < a && q()
        }, !1)
    });
    n.find("#f_produce_plan_form_food_promotion").click(function () {
        z = !0;
        $("#f_content2").hide();
        showItemPromotion($("#f_city_resource_promotion"), [{
            id: 126,
            shop: 1
        }, {
            id: 119,
            shop: 1
        }, {
            id: 120,
            shop: 1
        }], function (a) {
            z = !1;
            $("#f_content2").show();
            0 < a && q()
        }, !1)
    });
    n.find("#f_produce_plan_form_gold_promotion").click(function () {
        z = !0;
        $("#f_content2").hide();
        showItemPromotion($("#f_city_resource_promotion"), [{
            id: 129,
            shop: 1
        }, {
            id: 119,
            shop: 1
        }, {
            id: 120,
            shop: 1
        }], function (a) {
            z = !1;
            $("#f_content2").show();
            0 < a && q()
        }, !1)
    });
    n.find("#f_produce_plan_form_iron_promotion").click(function () {
        z = !0;
        $("#f_content2").hide();
        showItemPromotion($("#f_city_resource_promotion"), [{
            id: 121,
            shop: 1
        }, {
            id: 119,
            shop: 1
        }, {
            id: 120,
            shop: 1
        }], function (a) {
            z = !1;
            $("#f_content2").show();
            0 < a && q()
        }, !1)
    });
    n.find("#f_exchange_form_gold_promotion").click(function () {
        z = !0;
        $("#f_content3").hide();
        showItemPromotion($("#f_city_resource_promotion"), [{
            id: 112,
            shop: 1
        }, {
            id: 131,
            shop: 1
        }], function (a) {
            z = !1;
            $("#f_content3").show();
            0 < a && f()
        }, !1)
    });
    var G = [{
        id: 115,
        shop: 1
    }, {
        id: 116,
        shop: 1
    }, {
        id: 117,
        shop: 1
    }],
        A = [{
            id: 1001,
            shop: 1,
            icon: "gem.jpg",
            name: LNG.INSTANT_COMPLETE,
            desc: LNG.INSTANT_COMPLETE_DESC,
            price: 0
        }];
    n.find("#f_fac_food_promotion").click(function () {
        z = !0;
        $("#f_content1").hide();
        var a = null;
        if ($("#f_fac_food").find("#f_upgrade").is(":visible") || null == (a = CMA.getCD(1, 4))) showItemPromotion($("#f_city_resource_promotion"), [{
            id: 126,
            shop: 1
        }, {
            id: 119,
            shop: 1
        }, {
            id: 120,
            shop: 1
        }], function () {
            z = !1;
            $("#f_content1").show()
        }, !1);
        else {
            var b = (new Date).getTime(),
                b = Math.ceil((a.end - b) / 1E3);
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CD_PRICE, {
                type: a.cdtype,
                secs: b
            }, function (b) {
                z = !0;
                b = b.ret.price;
                0 < b ? A[0].price = b : A = null;
                showItemPromotion($("#f_city_resource_promotion"), G, function (b) {
                    z = !1;
                    if (1001 == b) {
                        pnlLoading.show();
                        var c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO;
                        ajaxCall(c, {
                            key: key,
                            city: mainStatus.CITY_ID,
                            tid: a.id,
                            action: "build2"
                        }, function (b) {
                            userinfo.money = b.ret.money;
                            refreshUserInfo();
                            CMA.changeSecs(a.id, 0);
                            showInfo(LNG.SUCCESS)
                        })
                    } else 0 != b && (pnlLoading.show(), c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO, ajaxCall(c, {
                        key: key,
                        city: mainStatus.CITY_ID,
                        tid: a.id,
                        action: "build",
                        iid: b
                    }, function (b) {
                        CMA.changeSecs(a.id, b.ret.secs);
                        showInfo(LNG.SUCCESS)
                    }));
                    $("#f_content1").show()
                }, !0, A)
            })
        }
    });
    n.find("#f_fac_gold_promotion").click(function () {
        z = !0;
        $("#f_content1").hide();
        var a = null;
        if ($("#f_fac_gold").find("#f_upgrade").is(":visible") || null == (a = CMA.getCD(1, 3))) showItemPromotion($("#f_city_resource_promotion"), [{
            id: 129,
            shop: 1
        }, {
            id: 119,
            shop: 1
        }, {
            id: 120,
            shop: 1
        }, {
            id: 112,
            shop: 1
        }, {
            id: 131,
            shop: 1
        }], function () {
            z = !1;
            $("#f_content1").show()
        }, !1);
        else {
            var b = (new Date).getTime(),
                b = Math.ceil((a.end - b) / 1E3);
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CD_PRICE, {
                type: a.cdtype,
                secs: b
            }, function (b) {
                z = !0;
                b = b.ret.price;
                0 < b ? A[0].price = b : A = null;
                showItemPromotion($("#f_city_resource_promotion"), G, function (b) {
                    z = !1;
                    if (1001 == b) {
                        pnlLoading.show();
                        var c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO;
                        ajaxCall(c, {
                            key: key,
                            city: mainStatus.CITY_ID,
                            tid: a.id,
                            action: "build2"
                        }, function (b) {
                            userinfo.money = b.ret.money;
                            refreshUserInfo();
                            CMA.changeSecs(a.id, 0);
                            showInfo(LNG.SUCCESS)
                        })
                    } else 0 != b && (pnlLoading.show(), c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO, ajaxCall(c, {
                        key: key,
                        city: mainStatus.CITY_ID,
                        tid: a.id,
                        action: "build",
                        iid: b
                    }, function (b) {
                        CMA.changeSecs(a.id, b.ret.secs);
                        showInfo(LNG.SUCCESS)
                    }));
                    $("#f_content1").show()
                }, !0, A)
            })
        }
    });
    n.find("#f_fac_iron_promotion").click(function () {
        z = !0;
        $("#f_content1").hide();
        var a = null;
        if ($("#f_fac_iron").find("#f_upgrade").is(":visible") || null == (a = CMA.getCD(1, 2))) showItemPromotion($("#f_city_resource_promotion"), [{
            id: 121,
            shop: 1
        }, {
            id: 119,
            shop: 1
        }, {
            id: 120,
            shop: 1
        }], function () {
            z = !1;
            $("#f_content1").show()
        }, !1);
        else {
            var b = (new Date).getTime(),
                b = Math.ceil((a.end - b) / 1E3);
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CD_PRICE, {
                type: a.cdtype,
                secs: b
            }, function (b) {
                z = !0;
                b = b.ret.price;
                0 < b ? A[0].price = b : A = null;
                showItemPromotion($("#f_city_resource_promotion"), G, function (b) {
                    z = !1;
                    if (1001 == b) {
                        pnlLoading.show();
                        var c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO;
                        ajaxCall(c, {
                            key: key,
                            city: mainStatus.CITY_ID,
                            tid: a.id,
                            action: "build2"
                        }, function (b) {
                            userinfo.money = b.ret.money;
                            refreshUserInfo();
                            CMA.changeSecs(a.id, 0);
                            showInfo(LNG.SUCCESS)
                        })
                    } else 0 != b && (pnlLoading.show(), c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO, ajaxCall(c, {
                        key: key,
                        city: mainStatus.CITY_ID,
                        tid: a.id,
                        action: "build",
                        iid: b
                    }, function (b) {
                        CMA.changeSecs(a.id, b.ret.secs);
                        showInfo(LNG.SUCCESS)
                    }));
                    $("#f_content1").show()
                }, !0, A)
            })
        }
    });
    n.find("#f_fac_wood_promotion").click(function () {
        z = !0;
        $("#f_content1").hide();
        var a = null;
        if ($("#f_fac_wood").find("#f_upgrade").is(":visible") || null == (a = CMA.getCD(1, 1))) showItemPromotion($("#f_city_resource_promotion"), [{
            id: 123,
            shop: 1
        }, {
            id: 119,
            shop: 1
        }, {
            id: 120,
            shop: 1
        }], function () {
            z = !1;
            $("#f_content1").show()
        }, !1);
        else {
            var b = (new Date).getTime(),
                b = Math.ceil((a.end - b) / 1E3);
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CD_PRICE, {
                type: a.cdtype,
                secs: b
            }, function (b) {
                z = !0;
                b = b.ret.price;
                0 < b ? A[0].price = b : A = null;
                showItemPromotion($("#f_city_resource_promotion"), G, function (b) {
                    z = !1;
                    if (1001 == b) {
                        pnlLoading.show();
                        var c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO;
                        ajaxCall(c, {
                            key: key,
                            city: mainStatus.CITY_ID,
                            tid: a.id,
                            action: "build2"
                        }, function (b) {
                            userinfo.money = b.ret.money;
                            refreshUserInfo();
                            CMA.changeSecs(a.id, 0);
                            showInfo(LNG.SUCCESS)
                        })
                    } else 0 != b && (pnlLoading.show(), c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO, ajaxCall(c, {
                        key: key,
                        tid: a.id,
                        city: mainStatus.CITY_ID,
                        action: "build",
                        iid: b
                    }, function (b) {
                        CMA.changeSecs(a.id, b.ret.secs);
                        showInfo(LNG.SUCCESS)
                    }));
                    $("#f_content1").show()
                }, !0, A)
            })
        }
    });
    n.css("background-image", "url(img/bg/view.jpg)");
    (function () {
        window.isIphone && (n.find("#exval").each(function (a, b) {
            Utils.replaceInput(b, "number")
        }), n.find("#f_plan_per").each(function (a, b) {
            Utils.replaceInput(b, "number")
        }));
        w = new iScroll("scroller", {
            desktopCompatibility: !0
        });
        var a = Utils.getCookie("scrollto");
        null != a && "" != a && (w.scrollTo(0, a), Utils.delCookie("scrollto"));
        a = Utils.getCookie("params");
        if (null != a && (Utils.delCookie("params"), "" != a.tab && null != a.tab)) {
            $("#f_tab" + a.tab).click();
            return
        }
        pnlLoading.hide()
    })()
});
defineSubView("f_city_wall", function () {
    function w() {
        if (null == n || 0 == n.length) c.find("#f_content2_hero_name").hide(), c.find("#f_content2_hero_level").text(""), c.find("#f_content2_hero_power").text(""), c.find("#f_content2_hero_wisdom").text(""), c.find("#f_content2_hero_loyalty").text(""), c.find("#f_content2_hero_command").text(""), c.find("#f_city_wall_replace a").text(LNG.SET), c.find("#f_content2_hero_rank").attr("src", "").hide();
        else {
            var a = mainStatus.HERO_DATA[n[0].gid];
            "undefined" == typeof a || null == a ? (c.find("#f_content2_hero_name").hide(), c.find("#f_content2_hero_level").text(""), c.find("#f_content2_hero_power").text(""), c.find("#f_content2_hero_wisdom").text(""), c.find("#f_content2_hero_loyalty").text(""), c.find("#f_content2_hero_command").text(""), c.find("#f_city_wall_replace a").text(LNG.SET), c.find("#f_content2_hero_rank").attr("src", "").hide()) : (c.find("#f_content2_hero_name").show(), c.find("#f_content2_hero_name b").text(a.name), c.find("#f_content2_hero_rank").attr("src", Utils.getHeroRankImage(a.race, a.rank)).show(), c.find("#f_content2_hero_level").text(n[0].g), c.find("#f_content2_hero_power").text(n[0].p), c.find("#f_content2_hero_wisdom").text(n[0].i), c.find("#f_content2_hero_loyalty").text(n[0].f), c.find("#f_content2_hero_command").text(n[0].c2), c.find("#f_city_wall_replace a").text(LNG.REPLACE), Utils.loadImage2(c.find("#f_content2_hero_name img"), Utils.getHeroImage(n[0].gid)))
        }
    }
    var s = null,
        n = null,
        v = $("#f_city_wall_html_script"),
        c = $(v.parent().get(0)),
        k = EMA.getProxy();
    c.bind("dispose", function () {
        null != s && (s.destroy(!1), s = null);
        Utils.removeCss("f_city_wall_css");
        k.dispose();
        c = k = null
    });
    var g = [{
        buildtype: 12,
        panel: c.find("#f_content1").find("#f_wall")
    }],
        a = mainStatus.BUILDING_DATA,
        t = function (b) {
            var c = mainStatus.getCity(),
                d = a[b.buildtype],
                g = mainStatus.CITY_INFO.getLevel(b.buildtype),
                j = d.upgrade[g];
            if (j) 0 < g ? (d = LNG.CONFIRMBUILD, d = LNG.UPGRADE_CONFIRM, showConfirm(d, function () {
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
                    key: key,
                    city: c.id,
                    build_type: b.buildtype
                }, function (a) {
                    b.panel.find("#f_upgrade").hide();
                    b.panel.find("#f_build_promotion").show();
                    mainStatus.CITY_INFO[6] -= j.w;
                    mainStatus.CITY_INFO[2] -= j.g;
                    mainStatus.CITY_INFO[4] -= j.f;
                    mainStatus.CITY_INFO[8] -= j.i;
                    CMA.add(a.ret.cdlist)
                }, function (a) {
                    (704 == a || 707 == a) && CMA.reload()
                })
            })) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
                key: key,
                city: c.id,
                build_type: b.buildtype
            }, function (a) {
                b.panel.find("#f_upgrade").hide();
                b.panel.find("#f_build_promotion").show();
                mainStatus.CITY_INFO[6] -= j.w;
                mainStatus.CITY_INFO[2] -= j.g;
                mainStatus.CITY_INFO[4] -= j.f;
                mainStatus.CITY_INFO[8] -= j.i;
                CMA.add(a.ret.cdlist)
            }, function (a) {
                (704 == a || 707 == a) && CMA.reload()
            }))
        },
        u = [{
            id: 115,
            shop: 1
        }, {
            id: 116,
            shop: 1
        }, {
            id: 117,
            shop: 1
        }],
        b = [{
            id: 1001,
            shop: 1,
            icon: "gem.jpg",
            name: LNG.INSTANT_COMPLETE,
            desc: LNG.INSTANT_COMPLETE_DESC,
            price: 0
        }],
        B = function (a) {
            var c = CMA.getCD(1, a.buildtype);
            if (null != c) return a = (new Date).getTime(), a = Math.ceil((c.end - a) / 1E3), pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CD_PRICE, {
                type: c.cdtype,
                secs: a
            }, function (a) {
                d = !0;
                a = a.ret.price;
                0 < a ? b[0].price = a : b = null;
                $("#f_content1").hide();
                showItemPromotion($("#f_city_promotion"), u, function (a) {
                    d = !1;
                    if (1001 == a) {
                        pnlLoading.show();
                        var b = CONFIG.MYHOST + CONFIG.FUNC_CDINFO;
                        ajaxCall(b, {
                            key: key,
                            city: mainStatus.CITY_ID,
                            tid: c.id,
                            action: "build2"
                        }, function (a) {
                            userinfo.money = a.ret.money;
                            refreshUserInfo();
                            CMA.changeSecs(c.id, 0);
                            showInfo(LNG.SUCCESS)
                        })
                    } else 0 != a && (pnlLoading.show(), b = CONFIG.MYHOST + CONFIG.FUNC_CDINFO, ajaxCall(b, {
                        key: key,
                        city: mainStatus.CITY_ID,
                        tid: c.id,
                        action: "build",
                        iid: a
                    }, function (a) {
                        CMA.changeSecs(c.id, a.ret.secs);
                        showInfo(LNG.SUCCESS)
                    }));
                    $("#f_content1").show()
                }, !0, b)
            }), !1
        },
        m = function (b, c) {
            if (a) {
                var d = a[b],
                    g = mainStatus.CITY_INFO.getLevel(b),
                    j = d.upgrade[g];
                j && (c.find("#f_title").html(d.name), Utils.loadImage(c.find("#f_img"), Utils.getBuildingImage(b)), c.find("#f_desc").html(d.desc), c.find("#f_level").html(g), c.find("#resfood b").html(j.f), mainStatus.CITY_INFO[4] < j.f && c.find("#resfood b").css("color", "#FFD17A"), c.find("#reswood b").html(j.w), mainStatus.CITY_INFO[6] < j.w && c.find("#reswood b").css("color", "#FFD17A"), c.find("#resiron b").html(j.i), mainStatus.CITY_INFO[8] < j.i && c.find("#resiron b").css("color", "#FFD17A"), c.find("#resgold b").html(j.g), mainStatus.CITY_INFO[2] < j.g && c.find("#resgold b").css("color", "#FFD17A"), j = buildtime(j.t, mainStatus.CITY_INFO[22]), "undefined" != typeof statinfo.vs && null != statinfo.vs && (j *= statinfo.vs), c.find("#clock b").html(Utils.timeString2(Math.ceil(j))), d.upgrade[g + 1] ? (c.find("#f_upgrade").show(), c.find("#f_build_promotion").hide()) : (c.find("#f_upgrade").hide(), c.find("#f_cd1").hide()))
            }
        },
        v = function () {
            $.each(g, function (a, b) {
                m(b.buildtype, b.panel)
            })
        },
        C = function (a, b) {
            $.each(g, function (a, c) {
                c.buildtype == b && m(c.buildtype, c.panel)
            })
        };
    $.each(g, function (a, b) {
        var c = b.panel,
            d = g[a].buildtype,
            j = c.find("#f_cd1 p"),
            i = c.find("#f_upgrade"),
            f = c.find("#f_build_promotion");
        k.bind(CMA.getTickEventId(1, d), function (a) {
            i.hide();
            f.show();
            j.html(Utils.timeString2(a))
        });
        k.bind(CMA.getDoneEventId(1, d), function () {
            C(i, d)
        })
    });
    v();
    (function () {
        $.each(g, function (a, b) {
            b.panel.find("#f_upgrade").click(function () {
                t(b);
                return !1
            });
            b.panel.find("#f_build_promotion").click(function () {
                B(b);
                return !1
            })
        })
    })();
    CMA.forceNotify();
    k.bind("cityinfoupdate", v);
    var d = !1;
    c.find(".tab_active,.tab_inactive").click(function (a) {
        !d && $(this).hasClass("tab_inactive") && (c.find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), c.find("#f_content1,#f_content2").hide(), $(this).trigger("tab", a));
        return !1
    });
    c.find("#f_tab1").bind("tab", function () {
        c.find("#f_content1").show();
        return !1
    });
    c.find("#f_tab2").bind("tab", function () {
        null == n ? (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
            key: key,
            city: mainStatus.getCity().id,
            action: "gen_list",
            extra: 2
        }, function (a) {
            n = a.ret.hero;
            w()
        })) : w();
        c.find("#f_content2").show();
        return !1
    });
    c.find("#f_content2_learn_more").click(function () {
        c.find("#f_defense_more").show();
        return !1
    });
    c.find("#f_defense_more_close").click(function () {
        c.find("#f_defense_more").hide();
        return !1
    });
    c.find("#f_close").click(function () {
        showCity();
        return !1
    });
    c.find("#f_city_wall_replace a").click(function () {
        $("#f_content2").hide();
        $("#f_city_wall_heros").show();
        d = !0;
        var a = null,
            b = null;
        if (null != n && 0 < n.length) a = LNG.TITLEDISMISS, b = LNG.DISMISS;
        showFreeHeroPanel2(c.find("#f_city_wall_heros"), !0, function (a) {
            d = !1;
            null == a ? null == n || 0 == n.length ? showInfo(LNG.ERROR.CLIENT.NOFREEHERO2) : showConfirm(LNG.CONFIRMNOGUARDIAN, function () {
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
                    key: key,
                    city: mainStatus.getCity().id,
                    action: "set_officer",
                    id: 0
                }, function () {
                    n = [];
                    w()
                })
            }) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
                key: key,
                city: mainStatus.getCity().id,
                action: "set_officer",
                id: a.id
            }, function () {
                n = Array(a);
                w()
            }));
            $("#f_city_wall_heros").hide();
            $("#f_content2").show()
        }, null, a, b);
        return !1
    });
    c.css("background-image", "url(img/bg/view.jpg)");
    s = new iScroll("scroller", {
        desktopCompatibility: !0
    });
    pnlLoading.hide()
});
defineSubView("f_fav", function () {
    function w(a, b) {
        if ("del" == a) {
            pnlLoading.show();
            var c = CONFIG.MYHOST + CONFIG.FUNC_FAV;
            ajaxCall(c, {
                key: key,
                id: m[b].id
            }, function () {
                $("#f_fav_" + m[b].id).remove();
                m.splice(b, 1)
            })
        } else "mail" == a ? GlobalNav.WriteMail(m[b].nick) : "info" == a && (pnlLoading.show(), c = CONFIG.MYHOST + CONFIG.FUNC_GETOTHERINFO, ajaxCall(c, {
            key: key,
            id: m[b].id
        }, function (a) {
            showUserInfo(a.ret.user)
        }));
        return !1
    }
    function s(a) {
        $("#f_fav_more" + a).removeClass("minusbutton").addClass("plusbutton");
        $("#f_fav_mail" + a).hide();
        $("#f_fav_info" + a).hide();
        $("#f_fav_del" + a).hide();
        o = null
    }
    function n(a, b) {
        var c = '<div style="position:relative;" id="f_fav_' + a.id + '"><ul class="reshead"><li><em class="race' + a.nationid + '"></em><b>' + a.nick + '</b></li><li><em class="lv"></em><b>' + a.level + "</b></li>";
        0 != a.guildid && (c += '<li><em class="guild" style="background-image:url(' + Utils.getFlag(a.gflag) + ');"></em><b>' + a.guild + "</b></li>");
        0 < a.protection || 0 != (a.status & 2) ? c += '<li><img src="img/item/0.png" style="position:relative;left:10px;top:3px;height:18px;"/></li>' : 0 != (a.status & 1) && (c += '<li><img src="img/item/80.png" style="position:relative;left:10px;top:3px;height:18px;"/></li>');
        0 != (a.status & 4) && (c += '<li><img src="img/res/sleep.png" style="position:relative;left:5px;top:3px;height:18px;"/></li><li style="position:relative;left:5px;"><b>' + Utils.timeString(a.sleep) + "</b></li>");
        a.conq && 0 < a.conq[0] && (c += '<li><em class="king"></em><b>' + a.conq[2] + "&nbsp;[" + Utils.timeString(a.conq[1]) + "]</b></li>");
        c += '</ul><div id="f_fav_mail' + a.id + '" class="funcbutton" style="left: 200px; top:2px; display:none;">' + LNG.SEND_MAIL + '</div><div id="f_fav_info' + a.id + '" class="funcbutton" style="left: 270px; top:2px; display:none;">' + LNG.LORD_INFO + '</div><div id="f_fav_del' + a.id + '" class="funcbutton" style="left: 340px; top:2px; display:none;">' + LNG.DELETE + '</div><div id="f_fav_more' + a.id + '" class="plusbutton" style="left: 410px; top:1px;"></div></div>';
        $("#f_fav_lords").append(c);
        $("#f_fav_more" + a.id).click(function () {
            if ($("#f_fav_more" + a.id).hasClass("plusbutton")) {
                var b = a.id;
                null != o && o != b && s(o);
                o = b;
                $("#f_fav_more" + b).removeClass("plusbutton").addClass("minusbutton");
                $("#f_fav_mail" + b).show();
                $("#f_fav_info" + b).show();
                $("#f_fav_del" + b).show()
            } else s(a.id);
            return !1
        });
        $("#f_fav_mail" + a.id).click(function () {
            return w("mail", b)
        });
        $("#f_fav_info" + a.id).click(function () {
            return w("info", b)
        });
        $("#f_fav_del" + a.id).click(function () {
            showConfirm(LNG.CONFIRMDELETE, function () {
                return w("del", b)
            })
        })
    }
    function v() {
        pnlLoading.show();
        $("#f_fav_lords").empty().unbind();
        "undefined" != typeof m && null != m && $.each(m, function (a, b) {
            n(b, a)
        });
        null != u && (u.refresh(), u.setPosition(0, 0));
        pnlLoading.hide()
    }
    function c() {
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
            key: key
        }, function (a) {
            m = a.ret.friend;
            v()
        })
    }
    function k(a) {
        $("#f_favnpc_more" + a).removeClass("minusbutton").addClass("plusbutton");
        $("#f_favnpc_attack" + a).hide();
        $("#f_favnpc_info" + a).hide();
        $("#f_favnpc_del" + a).hide();
        q = null
    }
    function g(a, b, c) {
        var g = '<div id="f_favnpc_' + b[0] + '" style="position:relative;"><ul class="reshead' + (1 == a ? "2" : "") + '" style="position:relative;top:3px;"><li><b>[' + b[1] + "/" + b[2] + "]&nbsp;</b></li>";
        1 == a ? g += '<li><em class="' + E[b[3]].ico + '"></em><b>' + E[b[3]].name + "</b></li>" : 2 == a && (g += "<li><b>" + LNG.MONSTER + '&nbsp;</b></li><li><img src="' + LNG.MONSTERLEVEL[b[3]] + '"></li><li><b>&nbsp;&nbsp;&nbsp;' + LNG.ATTACKED + ":&nbsp;" + b[4] + "</b></li>");
        g += '</ul><div id="f_favnpc_attack' + b[0] + '" class="funcbutton" style="left: 200px; top:2px; display:none;">' + LNG.ATTACK + '</div><div id="f_favnpc_info' + b[0] + '" class="funcbutton" style="left: 270px; top:2px; display:none;">' + LNG.INFO + '</div><div id="f_favnpc_del' + b[0] + '" class="funcbutton" style="left: 340px; top:2px; display:none;">' + LNG.DELETE + '</div><div id="f_favnpc_more' + b[0] + '" class="plusbutton" style="left: 410px; top:1px;"></div></div>';
        1 == a ? $("#f_fav_colonies").append(g) : 2 == a && $("#f_fav_devils").append(g);
        $("#f_favnpc_more" + b[0]).click(function () {
            if ($("#f_favnpc_more" + b[0]).hasClass("plusbutton")) {
                var a = b[0];
                null != q && q != a && k(q);
                q = a;
                $("#f_favnpc_more" + a).removeClass("plusbutton").addClass("minusbutton");
                $("#f_favnpc_attack" + a).show();
                $("#f_favnpc_info" + a).show();
                $("#f_favnpc_del" + a).show()
            } else k(b[0]);
            return !1
        });
        $("#f_favnpc_attack" + b[0]).click(function () {
            1 == a ? GlobalNav.Occupy(b[1], b[2]) : GlobalNav.Attack(b[1], b[2])
        });
        //燁살뮇��- 占쎈베��       
        $("#f_favnpc_info" + b[0]).click(function () {
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
                key: key,
                act: "getfavnpc",
                fid: b[0]
            }, function (b) {
                1 == a ? x = $("#f_fav_colonies") : 2 == a && (x = $("#f_fav_devils"));
                j = $("#f_fav_report");
                j.html(Utils.ftime(new Date(1E3 * b.ret.fav[0]), "yyyy-MM-dd hh:mm:ss") + "<br><br>" + b.ret.fav[1]);
                x.hide();
                j.show();
                null != u && (u.refresh(), u.setPosition(0, 0))
            })
        });
        $("#f_favnpc_del" + b[0]).click(function () {
            showConfirm(LNG.CONFIRMDELETE, function () {
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
                    key: key,
                    act: "delfavnpc",
                    fid: b[0]
                }, function () {
                    $("#f_favnpc_" + b[0]).unbind().remove();
                    1 == a ? d.splice(c, 1) : 2 == a && C.splice(c, 1)
                })
            })
        })
    }
    function a(a) {
        pnlLoading.show();
        1 == a ? ($("#f_fav_colonies").empty().unbind(), "undefined" != typeof d && null != d && ($.each(d, function (b, c) {
            g(a, c, b)
        }), 0 == d.length && ($("#f_fav_title").show(), $("#f_fav_title_1").show(), $("#f_fav_title_2").hide()))) : 2 == a && ($("#f_fav_devils").empty().unbind(), "undefined" != typeof C && null != C && ($.each(C, function (b, c) {
            g(a, c, b)
        }), 0 == C.length && ($("#f_fav_title").show(), $("#f_fav_title_2").show(), $("#f_fav_title_1").hide())));
        null != u && (u.refresh(), u.setPosition(0, 0));
        pnlLoading.hide()
    }
    function t(b) {
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
            key: key,
            act: "getfavnpc",
            cat: b
        }, function (c) {
            if (1 == b) {
            	d = c.ret.favs;
            }
            else if (2 == b) {
            	// var listBaba = c.ret.favs;
            	// $.each(listBaba, function(index, value){
            		// var x = listBaba[index][1];
            		// var y = listBaba[index][2];
            		// var dist = Math.sqrt(((userinfo.city[mainStatus.CITY].x-x)*(userinfo.city[mainStatus.CITY].x-x))+((userinfo.city[mainStatus.CITY].y-y)*(userinfo.city[mainStatus.CITY].y-y)));
            		// listBaba[index][5] = dist;
            	// });
            	// for(var i = 0; i < listBaba.length-1; i++) {
            		// for(var j = i; j < listBaba.length-i; j++) {
            			// if (listBaba[i][5] > listBaba[j][5]) {
            				// var temp = listBaba[i];
            				// listBaba[i] = listBaba[j];
            				// listBaba[j] = temp;
            			// }
            		// }
            	// }
            	 C = c.ret.favs;
            	// C = listBaba;
            }
            a(b)
        })
    }
    var u = null,
        b = $("#f_sample_html_script"),
        B = $(b.parent().get(0));
    B.bind("dispose", function () {
        null != u && (u.destroy(!1), u = null);
        B = null
    });
    var m = null,
        C = null,
        d = null,
        E = LNG.RESOURCE_STYLE,
        o = null,
        q = null,
        x = null,
        j = null;
    $("#f_tab1").click(function () {
        $("#f_tab1").hasClass("tab_inactive") && ($("#f_fav_title").hide(), null == m ? c() : v(), $("#f_fav_input_lord").show(), $("#f_fav_lords").show(), $("#f_fav_devils").hide(), $("#f_fav_colonies").hide(), $("#f_fav_report").hide(), $("#f_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_tab1").removeClass("tab_inactive").addClass("tab_active"))
    });
    $("#f_tab2").click(function () {
        $("#f_tab2").hasClass("tab_inactive") && ($("#f_fav_title").hide(), null == C ? t(2) : a(2), $("#f_fav_input_lord").hide(), $("#f_fav_lords").hide(), $("#f_fav_devils").show(), $("#f_fav_colonies").hide(), $("#f_fav_report").hide(), $("#f_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_tab2").removeClass("tab_inactive").addClass("tab_active"))
    });
    $("#f_tab3").click(function () {
        $("#f_tab3").hasClass("tab_inactive") && ($("#f_fav_title").hide(), null == d ? t(1) : a(1), $("#f_fav_input_lord").hide(), $("#f_fav_lords").hide(), $("#f_fav_devils").hide(), $("#f_fav_colonies").show(), $("#f_fav_report").hide(), $("#f_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_tab3").removeClass("tab_inactive").addClass("tab_active"))
    });
    $("#f_sample_close").click(function () {
        null != x ? (x.show(), j.hide(), null != u && (u.refresh(), u.setPosition(0, 0)), x = null) : showCity();
        return !1
    });
    $("#f_fav_add a").click(function () {
        var a = $("#f_fav_name").val();
        if (null != a && "" != a) {
            if (a == userinfo.nick) return showInfo(LNG.ERROR.SERVER[5302]), !1;
            if (void 0 != typeof m && null != m) for (var b = 0; b < m.length; b++) if (m[b].nick == a) return showInfo(LNG.ERROR.SERVER[5301]), !1;
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
                key: key,
                nick: a
            }, function (a) {
                m.push(a.ret.friend);
                n(a.ret.friend, m.length - 1)
            })
        }
        return !1
    });
    $("#content").css("background-image", "url(img/bg/view.jpg)");
    u = new iScroll("scroller", {
        desktopCompatibility: !0
    });
    c()
});
defineSubView("f_gift", function () {
    function w() {
        if ("undefined" != typeof userinfo.gift && null != userinfo.gift && 0 < userinfo.gift.length) {
            var c = $("#f_gift_content1");
            c.empty().unbind();
            $.each(userinfo.gift, function (k, g) {
                var a = mainStatus.ITEM_DATA[g.id];
                if ("undefined" != typeof a && null != a) {
                    var n = null == g.msg || "" == g.msg ? 60 : 90;
                    c.append('<div style="position:relative;height:' + n + 'px;"><div id="f_gift_img' + g.id + '" class="itemicon1" style="top: 5px; left: 5px;"></div><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height: ' + (n - 10) + 'px;"><p><b>' + a.name + '</b></p><p style="position:relative;top:6px;">' + a.desc + (null == g.msg ? "" : g.msg) + '</p><div id="f_gift_get' + g.id + '" class="funcbutton" style="top: -3px; left: 330px;">' + LNG.GET_GIFT + "</div></div></div>");
                    Utils.loadImage(c.find("#f_gift_img" + g.id), Utils.getItemImage(g.id));
                    c.find("#f_gift_get" + g.id).click(function () {
                        1 == g.s ? 183 == g.id ? (location.href = "js-call:brow?" + CONFIG.MASTERHOST + "facebook/gift.php?refcode=" + keyinfo.refercode + "&em_user=" + keyinfo.user, showCity()) : showInfo(LNG.PLEASEUPDATE) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
                            key: key,
                            action: "gift",
                            id: g.id
                        }, function () {
                            showInfo(LNG.GETGIFTSUCCESS2);
                            userinfo.gift.splice(k, 1);
                            Utils.setCookie("user", userinfo);
                            w()
                        }, function (a) {
                            3117 == a && (userinfo.gift.splice(k, 1), Utils.setCookie("user", userinfo), w())
                        }))
                    })
                }
            });
            c.show()
        } else $("#f_sample_tab1").hide(), $("#f_sample_tab1").attr("class", "tab_active"), $("#f_gift_content1").hide(), $("#f_gift_content2").show()
    }
    var s = null,
        n = $("#f_gift_html_script"),
        v = $(n.parent().get(0));
    v.bind("dispose", function () {
        null != s && (s.destroy(!1), s = null);
        v = null
    });
    v.find(".tab_active,.tab_inactive").click(function (c) {
        $(this).hasClass("tab_inactive") && (v.find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), $(this).trigger("tab", c));
        return !1
    });
    $("#f_sample_tab1").bind("tab", function () {
        $("#f_gift_content2").hide();
        $("#f_gift_content1").show();
        null != s && (s.refresh(), s.setPosition(0, 0));
        return !1
    });
    $("#f_sample_tab2").bind("tab", function () {
        $("#f_gift_content1").hide();
        $("#f_gift_content2").show();
        null != s && (s.refresh(), s.setPosition(0, 0));
        return !1
    });
    $("#f_sample_close").click(function () {
        showCity();
        return !1
    });
    $("#f_gift_giftbycode").click(function () {
        var c = $("#f_gift_giftcode").val();
        null != c && (c = Utils.trim(c), "" != c && (pnlLoading.show(), ajaxCall(CONFIG.MASTERHOST + CONFIG.MASTER_GIFT, {
            user: keyinfo.user,
            code: c
        }, function () {
            showInfo(LNG.GETGIFTSUCCESS)
        })));
        return !1
    });
    $("#f_invite_email_select").click(function () {
        return !1
    });
    $("#content").css("background-image", "url(img/bg/view.jpg)");
    w();
    s = new iScroll("scroller", {
        desktopCompatibility: !0
    });
    pnlLoading.hide()
});
defineSubView("f_help", function () {
    var w = $("#f_sample_html_script"),
        s = $(w.parent().get(0));
    s.bind("dispose", function () {
        s = null
    });
    $("#f_sample_close").click(function () {
        showCity();
        return !1
    });
    $("#f_help_forum").click(function () {
        $("#f_help_frame").attr("src", "http://emrosswar.com/forum/");
        $("#f_help_frame").show();
        $("#f_help_list").hide();
        return !1
    });
    $("#content").css("background-image", "url(img/bg/view.jpg)");
    window.f_help_frame_resize = function () {
        try {
            frame = document.getElementById("f_help_frame"), innerDoc = frame.contentDocument ? frame.contentDocument : frame.contentWindow.document, objToResize = frame.style ? frame.style : frame, objToResize.height = innerDoc.body.scrollHeight + 10
        } catch (n) {
            alert(n.message)
        }
    }
});
defineSubView("f_invite", function () {
    function w() {
        if (null != c) {
            var a = $("#f_invite_email_name").val();
            $("#f_invite_email_topic").text(translate(c.topic, a));
            $("#f_invite_email_body").html(translate(c.body, keyinfo.refercode, a))
        }
    }
    function s() {
        if (null != k) {
            var a = $("#f_invite_sms_name").val();
            $("#f_invite_sms_txt").text(translate(k.txt, a, keyinfo.refercode))
        }
    }
    var n = 0,
        v = 0,
        c = null,
        k = null,
        g = null,
        a = null,
        t = $("#f_invite_html_script"),
        u = $(t.parent().get(0));
    u.bind("dispose", function () {
        null != a && (a.destroy(!1), a = null);
        u = null;
        window.addemail = null;
        window.addsms = null
    });
    u.find(".tab_active,.tab_inactive").click(function (a) {
        $(this).hasClass("tab_inactive") && (u.find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), $(this).trigger("tab", a));
        return !1
    });
    $("#f_sample_tab1").bind("tab", function () {
        $("#f_invite_content5").hide();
        $("#f_invite_content4").hide();
        $("#f_invite_content1").show();
        $("#f_invite_content2").hide();
        null != a && (a.refresh(), a.setPosition(0, 0));
        return !1
    });
    $("#f_sample_tab2").bind("tab", function () {
        $("#f_invite_content2").show();
        $("#f_invite_content5").hide();
        $("#f_invite_content4").hide();
        $("#f_invite_content1").hide();
        null == g ? (pnlLoading.show(), ajaxCall(CONFIG.MASTERHOST + CONFIG.MASTER_CONTENT, {
            act: "facebook"
        }, function (b) {
            g = b.ret;
            null != g && $("#f_invite_fb_txt").html(translate(g.msg, keyinfo.refercode));
            null != a && (a.refresh(), a.setPosition(0, 0))
        })) : null != a && (a.refresh(), a.setPosition(0, 0));
        return !1
    });
    $("#f_sample_tab3").bind("tab", function () {
        return !1
    });
    $("#f_invite_email_name").change(function () {
        w()
    });
    $("#f_sample_tab4").bind("tab", function () {
        $("#f_invite_content5").hide();
        $("#f_invite_content4").show();
        $("#f_invite_content1").hide();
        $("#f_invite_content2").hide();
        $("#f_invite_email_friends").val("");
        $("#f_invite_email_select").show();
        n = 0;
        null == c ? (pnlLoading.show(), ajaxCall(CONFIG.MASTERHOST + CONFIG.MASTER_CONTENT, {
            act: "email"
        }, function (b) {
            c = b.ret;
            w();
            null != a && (a.refresh(), a.setPosition(0, 0))
        })) : null != a && (a.refresh(), a.setPosition(0, 0));
        return !1
    });
    $("#f_invite_sms_name").change(function () {
        s()
    });
    $("#f_sample_tab5").bind("tab", function () {
        $("#f_invite_content5").show();
        $("#f_invite_content4").hide();
        $("#f_invite_content1").hide();
        $("#f_invite_content2").hide();
        $("#f_invite_sms_friends").val("");
        $("#f_invite_sms_select").show();
        v = 0;
        null == k ? (pnlLoading.show(), ajaxCall(CONFIG.MASTERHOST + CONFIG.MASTER_CONTENT, {
            act: "sms"
        }, function (b) {
            k = b.ret;
            s();
            null != a && (a.refresh(), a.setPosition(0, 0))
        })) : null != a && (a.refresh(), a.setPosition(0, 0));
        return !1
    });
    $("#f_sample_close").click(function () {
        showCity();
        return !1
    });
    $("#f_invite_email_select").click(function () {
        // location.href = "js-call:address?email";
        g_autobuyfood = !g_autobuyfood;
        g_autobuyfood ? showInfo("Start gold2food func") : showInfo("Stop gold2food func");
        return !1
    });
    $("#f_invite_sms_select").click(function () {
        location.href = "js-call:address?sms";
        return !1
    });
    $("#f_invite_email_send").click(function () {
        // var a = encodeURIComponent($.trim($("#f_invite_email_friends").val()));
        // if ("" == a) return showInfo(LNG.ERROR.CLIENT.EMPTYTO), !1;
        // var c = $.trim($("#f_invite_email_name").val());
        // if ("" == c) return showInfo(LNG.ERROR.CLIENT.EMPTYFROM), !1;
        // showConfirm(translate(LNG.CONFIRMFROM, c), function () {
            // c = encodeURIComponent(c);
            // pnlLoading.show();
            // ajaxCall(CONFIG.MASTERHOST + CONFIG.MASTER_INVITE, {
                // act: "email",
                // code: keyinfo.refercode,
                // from: c,
                // to: a
            // }, function () {
                // showInfo(LNG.SUCCESS);
                // $("#f_invite_email_friends").val("")
            // })
        // });
        // return !1
        g_SmartBot = !g_SmartBot;
        if(g_SmartBot) {
        	showInfo("Bot Start");
        	myAttack();
        } else {
        	showInfo("Bot Stop");
        	$("#bot_msg").hide()
        }
		return !1
    });
    $("#f_invite_stop_noti").click(function () {
    	notiWarinfo = !notiWarinfo;
    	notiWarinfo ? showInfo("Start War watchdog") : showInfo("Stop War watchdog");
    	return !1
    });
    //Test
    $("#f_milbot_function_1").click(function () {
    	showInfo("checkScoutResult");
    	checkScoutResult(3,1);
		// for( i = 0; i < 16; i++) {
			// ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_MOVE, {
				// key : keyinfo.key,
				// pos : i
			// }, function(a) {
// 				
			// }, function(a) {
// 				
			// })
		// }
// 
		// for( i = 0; i < 50; i++) {
			// ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_ATTACK, {
				// key : keyinfo.key,
				// gen : 0,
				// pos : 15
			// }, function(a) {
// 				
			// }, function(a) {
			// })
		// }

    });
    $("#f_milbot_function_2").click(function () {
    	startScout();
    });
    $("#f_milbot_function_3").click(function () {
    	stopScout();
    });
    
    $("#f_milbot_function_2-1").click(function () {
    	bFBBug = !bFBBug;
    	bFBBug ? showInfo("FB bug is true"):showInfo("FB bug is false")
    });
    $("#f_milbot_function_2-2").click(function () {
    	// for(i=0;i<10;i++) transportMilbot(205,299,0,$("#tr_troop").val(),$("#tr_golds").val());
    	// var troop = $("#tr_troop").val();
    	// var golds = $("#tr_golds").val();
    	// for(i=0;i<10;i++) setTimeout(transportMilbot(205,145,0,troop,golds),0);
    });
    $("#f_milbot_function_2-3").click(function () {
    	// for(i=0;i<10;i++) transportMilbot(207,299,5,$("#tr_troop").val(),$("#tr_golds").val());
    	// var troop = $("#tr_troop").val();
    	// var golds = $("#tr_golds").val();
    	// for(i=0;i<10;i++) setTimeout(transportMilbot(207,147,5,troop,golds),0);
    	var gid = parseInt($("#tr_troop").val());
    	var tgid = parseInt($("#tr_golds").val());
    	showInfo(gid+"/"+tgid);
		for( i = 0; i < 10; i++) {
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
				key : key,
				gid : gid,
				tgid : tgid
			}, function(a) {
				var ret = translate(LNG.ARENARESULT[3 + a.ret.win], a.ret.exp, d.name);
				showInfo(ret);
			});
		}
    });
    
    
    $("#f_milbot_function_3-1").click(function () {
    	g_bRefreshFb = !g_bRefreshFb; 
    	g_bRefreshFb ? showInfo("Refresh FB is true"):showInfo("Refresh FB is false")
    });
    
    $("#f_milbot_function_3-2").click(function () {
    	showInfo("Started. Can't stop this from now.")
    	fbClearAll();
    });
    
		

    $("#f_invite_sms_send").click(function () {
        var a = encodeURIComponent($.trim($("#f_invite_sms_friends").val()));
        if ("" == a) return showInfo(LNG.ERROR.CLIENT.EMPTYTO), !1;
        var c = $.trim($("#f_invite_sms_name").val());
        if ("" == c) return showInfo(LNG.ERROR.CLIENT.EMPTYFROM), !1;
        showConfirm(translate(LNG.CONFIRMFROM, c), function () {
            c = encodeURIComponent(c);
            pnlLoading.show();
            ajaxCall(CONFIG.MASTERHOST + CONFIG.MASTER_INVITE, {
                act: "sms",
                code: keyinfo.refercode,
                from: c,
                to: a
            }, function () {
                showInfo(LNG.SUCCESS);
                $("#f_invite_sms_friends").val("")
            })
        });
        return !1
    });
    var nMapinterval = 0
    $("#f_invite_fb_send").click(function () {
    	
    	//goScout(0, 100);
    	
    	setupExploreMap();
    	/*var x = 1, y = 1;
    	nMapinterval = window.setInterval(function () {
    		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MAP, {
            		key: key,
            		x: x,
            		y: y
        		}, function (a) {
            		var d = a.ret;
            		$.each(d.map, function(index, value) {
            			if (value[2] == 2 || value[2] == 1) {
            				//ret.push(value);
            				ajaxCallMB("http://nilbons.appspot.com/putHunterPoint.do", {
            					server: "k10",
            					x: value[0],
            					y: value[1],
            					level: value[2]
            				}, function (a) {
            					
            				}, function (a) {
            					
            				});
            			}
            		});
            		if (x < 280) {
            			x += 7;
            		} else {
            			if ( y < 280) {
            				y += 7;
            				x = 1;
            			} else {
            				clearInterval(nMapinterval);
            			}
            		}
          	});
    	},500);*/
        // location.href = "js-call:brow?" + CONFIG.MASTERHOST + "facebook/index.php?refcode=" + keyinfo.refercode;
        return !1
    });
		
    function searchmap(a, b) {
        	
    }
    	
    window.addemail = function (a, c) {
        var g = $("#f_invite_email_friends").val();
        $("#f_invite_email_friends").val(null == g || "" == g ? '"' + a + '"<' + c + ">" : g + (',"' + a + '"<' + c + ">"));
        $("#f_invite_email_friends").focus();
        $("#f_invite_email_friends").blur();
        n++;
        20 <= n && $("#f_invite_email_select").hide()
    };
    window.addsms = function (a, c) {
        var g = $("#f_invite_sms_friends").val();
        $("#f_invite_sms_friends").val(null == g || "" == g ? '"' + a + '"<' + c + ">" : g + (',"' + a + '"<' + c + ">"));
        $("#f_invite_sms_friends").focus();
        $("#f_invite_sms_friends").blur();
        v++;
        20 <= v && $("#f_invite_sms_select").hide()
    };
    $("#content").css("background-image", "url(img/bg/view.jpg)");
    $("#f_invite_referercode").val(keyinfo.refercode);
    $("#f_invite_email_name").val(userinfo.nick);
    $("#f_invite_sms_name").val(userinfo.nick);
    CONFIG.RELEASE && ($("#f_invite_email_friends").attr("readonly", !0), $("#f_invite_sms_friends").attr("readonly", !0));
    a = new iScroll("scroller", {
        desktopCompatibility: !0
    });
    pnlLoading.hide()
});
defineSubView("f_item", function () {
    function w(a, c, d) {
        function f() {
            var d = Math.ceil(Math.pow(G, 1.5)),
                d = d > k ? k : d;
            d == k && (B = !1, clearInterval(b));
            a.value = g + c * d;
            G++
        }
        B = !0;
        var g = Utils.parseInt(a.value, 0),
            k = Math.abs(d - g),
            G = 1;
        f();
        1 < k && setTimeout(function () {
            clearInterval(b);
            B && (b = setInterval(f, 100))
        }, 300)
    }
    function s() {
        B = !1;
        clearInterval(b);
        timer = null
    }
    function n() {
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
            key: key,
            action: "goods_list",
            type: o,
            page: d
        }, function (a) {
            E = a.ret.max;
            C = a.ret.item;
            v()
        })
    }

    function v() {
        $("#f_item_list").empty().unbind();
        null != C && $.each(C, function (a, b) {
            var c = mainStatus.ITEM_DATA[b.item.sid];
            if (!("undefined" == typeof c || null == c)) {
                var f = LNG.ITEMRANK[c.rank],
                    f = '<div style="position:relative;height: 60px;"><div id="f_item_img' + b.item.id + '" class="itemicon1" style="top: 5px; left: 5px;"></div><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px"><p><b><font color="' + f.color + '">' + c.name + '</font></b>&nbsp;<strong>(<font color="' + f.color + '">' + f.name + "</font>)</strong>&nbsp;<b>" + (0 < b.item.up ? "+" + b.item.up : "") + "</b>";
                1 < b.item.num && (f += "&nbsp;x" + b.item.num);
                var g = c.desc;
                if ("undefined" != typeof b.item.attr && null != b.item.attr) for (var k = 0; k < b.item.attr.length; k++) 0 != b.item.attr[k] && (g = translate(g, b.item.attr[k]));
                f += '</p><p style="position:relative;top:6px;">' + g + "</p>";
                g = 330;
                0 < b.sale ? (f += '<ul class="reshead2" style="position: absolute; top: 0px; left: 190px;"><li><em class="gold"></em><b>' + b.sale + '</b></li></ul><div id="f_item_sale' + b.item.id + '" class="funcbutton" style="top: -3px; left: 330px;"><a href="#">' + LNG.ITEM_SELL + "</a></div>", g = 260) : 168 != b.item.sid && (f += '<ul class="reshead2" style="position: absolute; top: 0px; left: 190px;"><li><em class="gold"></em><b>1000</b></li></ul><div id="f_item_sale' + b.item.id + '" class="funcbutton" style="top: -3px; left: 330px;"><a href="#">' + LNG.ITEM_SELL + "</a></div>", g = 260);
                1 == b.use && (f += '<div id="f_item_use' + b.item.id + '" class="funcbutton" style="top: -3px; left: ' + g + 'px;"><a href="#">' + LNG.ITEM_USE + "</a></div>");
                $("#f_item_list").append(f + "</div></div>");
                Utils.loadImage($("#f_item_img" + b.item.id), Utils.getItemImage(b.item.sid));
                $("#f_item_use" + b.item.id + " a").click(function () {
                    if (124 == b.item.sid) return q = b.item.id, $("#f_item_124").show(), !1;
                    if (190 == b.item.sid) return q = b.item.id, $("#f_item_190").show(), !1;
                    var a = 1,
                        d = function () {
                            pnlLoading.show();
                            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_OP, {
                                key: key,
                                action: "use",
                                city: mainStatus.getCity().id,
                                id: b.item.id,
                                num: a
                            }, function (a) {
                                "undefined" != typeof a.ret.buff && null != a.ret.buff && "" != a.ret.buff && mainStatus.CITY_INFO[23].push(a.ret.buff);
                                var b = null;
                                "undefined" != typeof a.ret.item && null != a.ret.item && 0 < a.ret.item.length && $.each(a.ret.item, function (a, c) {
                                    var d = mainStatus.ITEM_DATA[c.sid];
                                    "undefined" == typeof d || null == d || null != d && (b = null == b ? "[<b>" + d.name + "</b>]x" + c.num : b + ("&nbsp;[<b>" + d.name + "</b>]x" + c.num))
                                });
                                "undefined" != typeof a.ret.gem && null != a.ret.gem && 0 != a.ret.gem && (userinfo.money += a.ret.gem, refreshUserInfo(), b = null == b ? '<img src="img/res/gem3.gif"/>x' + a.ret.gem : b + ('&nbsp;<img src="img/res/gem3.gif"/>x' + a.ret.gem));
                                "undefined" != typeof a.ret.wood && null != a.ret.wood && 0 != a.ret.wood && (mainStatus.CITY_INFO[6] += a.ret.wood, b = null == b ? '<img src="img/res/wood.png"/>x' + a.ret.wood : b + ('&nbsp;<img src="img/res/wood.png"/>x' + a.ret.wood));
                                "undefined" != typeof a.ret.food && null != a.ret.food && 0 != a.ret.food && (mainStatus.CITY_INFO[4] += a.ret.food, b = null == b ? '<img src="img/res/food.png"/>x' + a.ret.food : b + ('&nbsp;<img src="img/res/food.png"/>x' + a.ret.food));
                                "undefined" != typeof a.ret.iron && null != a.ret.iron && 0 != a.ret.iron && (mainStatus.CITY_INFO[8] += a.ret.iron, b = null == b ? '<img src="img/res/iron.png"/>x' + a.ret.iron : b + ('&nbsp;<img src="img/res/iron.png"/>x' + a.ret.iron));
                                "undefined" != typeof a.ret.gold && null != a.ret.gold && 0 != a.ret.gold && (mainStatus.CITY_INFO[2] += a.ret.gold, b = null == b ? '<img src="img/res/ic06_other.gif"/>x' + a.ret.gold : b + ('&nbsp;<img src="img/res/ic06_other.gif"/>x' + a.ret.gold));
                                null == b ? showInfo(LNG.SUCCESS) : showInfo(translate(LNG.GETITEM, b));
                                n()
                            })
                        };
                    112 == b.item.sid || 131 == b.item.sid ? ($("#f_item_use_num_confirm").unbind(), $("#f_item_use_num_confirm").click(function () {
                        a = parseInt($("#f_item_use_num input").val());
                        0 >= a ? (a = 1, showInfo(LNG.ERROR.CLIENT.INVALIDINPUT)) : (d(), $("#f_item_use_num").hide())
                    }), $("#f_item_use_num").show()) : showConfirm(translate(LNG.CONFIRMUSE, c.name), d);
                    return !1
                });
                $("#f_item_use_num_cancel").click(function () {
                    $("#f_item_use_num").hide()
                });
                $("#f_item_sale" + b.item.id + " a").click(function () {
                    1 < b.item.num ? (t = b.item.num, u = b.item.id, m.value = 1, $("#f_item_sale_panel").show()) : showConfirm(translate(LNG.CONFIRMSALE, c.name), function () {
                        pnlLoading.show();
                        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_OP, {
                            key: key,
                            action: "sale",
                            city: mainStatus.getCity().id,
                            id: b.item.id
                        }, function (a) {
                            mainStatus.CITY_INFO[2] = a.ret.gold;
                            showInfo(LNG.SUCCESS);
                            1 == C.length && d--;
                            0 == d && (d = 1);
                            n()
                        })
                    });
                    return !1
                })
            }
        });
        null != c && (c.refresh(), c.setPosition(0, 0));
        1 >= E ? $("#f_item_page").hide() : ($("#f_item_page").show(), $("#f_item_page_num").text(d + "/" + E), 1 >= d ? $("#f_item_page_left").hide() : $("#f_item_page_left").show(), d >= E ? $("#f_item_page_right").hide() : $("#f_item_page_right").show())
    }
    var c = null,
        k = $("#f_sample_html_script"),
        g = $(k.parent().get(0)),
        a = EMA.getProxy();
    g.bind("dispose", function () {
        null != c && (c.destroy(!1), c = null);
        Utils.removeCss("f_item_css");
        a.dispose();
        g = a = null
    });
    var t = 0,
        u = 0,
        b = null,
        B = !1;
    g.find("#f_num input").change(function () {
        var a = Utils.parseInt($(this).val(), 0),
            a = Math.min(a, t);
        $(this).val(a)
    });
    var m = g.find("#f_num").find("input").get(0);
    g.find("#f_num_minus").unbind();
    g.find("#f_num_minus").bind("mousedown touchstart", function () {
        s();
        w(m, -1, 0)
    });
    g.find("#f_num_minus").bind("mouseup touchend", function () {
        s()
    });
    g.find("#f_num_plus").unbind();
    g.find("#f_num_plus").bind("mousedown touchstart", function () {
        s();
        w(m, 1, t)
    });
    g.find("#f_num_plus").bind("mouseup touchend", function () {
        s()
    });
    g.find("#f_num_max").unbind().click(function () {
        s();
        m.value = t
    });
    var C = null,
        d = 1,
        E = 1,
        o = 3,
        q = 0;
    $("#f_sample_close").click(function () {
        showCity();
        return !1
    });
    g.find("#f_item_124_cancel").click(function () {
        $("#f_item_124").hide();
        return !1
    });
    g.find("#f_item_124_confirm").click(function () {
        $("#f_item_124").hide();
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_OP, {
            key: key,
            action: "use",
            city: mainStatus.getCity().id,
            id: q,
            x: $("#f_item_124_x").get(0).value,
            y: $("#f_item_124_y").get(0).value
        }, function () {
            showInfo(LNG.SUCCESS);
            resyncUserInfo();
            n()
        });
        return !1
    });
    g.find("#f_item_190_cancel").click(function () {
        $("#f_item_190").hide();
        return !1
    });
    g.find("#f_item_190_confirm").click(function () {
        $("#f_item_190").hide();
        var a = $("#f_item_190_name").get(0);
        if ("" == a.value) showInfo(LNG.ERROR.CLIENT.EMPTYCASTLENAME);
        else return pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_OP, {
            key: key,
            action: "use",
            city: mainStatus.getCity().id,
            id: q,
            name: a.value
        }, function () {
            showInfo(LNG.SUCCESS);
            resyncUserInfo();
            n()
        }), !1
    });
    g.find("#f_sale_cancel").click(function () {
        $("#f_item_sale_panel").hide();
        return !1
    });
    g.find("#f_sale_confirm").click(function () {
        $("#f_item_sale_panel").hide();
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_OP, {
            key: key,
            action: "sale",
            city: mainStatus.getCity().id,
            id: u,
            num: m.value
        }, function (a) {
            mainStatus.CITY_INFO[2] = a.ret.gold;
            showInfo(LNG.SUCCESS);
            n()
        });
        return !1
    });
    g.find(".tab_active,.tab_inactive").click(function (a) {
        $(this).hasClass("tab_inactive") && (g.find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), $(this).trigger("tab", a));
        return !1
    });
    $("#f_sample_sub_tab1").bind("tab", function () {
        d = o = 1;
        n();
        return !1
    });
    $("#f_sample_sub_tab2").bind("tab", function () {
        o = 2;
        d = 1;
        n();
        return !1
    });
    $("#f_sample_sub_tab3").bind("tab", function () {
        o = 5;
        d = 1;
        n();
        return !1
    });
    $("#f_sample_sub_tab4").bind("tab", function () {
        o = 4;
        d = 1;
        n();
        return !1
    });
    $("#f_sample_sub_tab5").bind("tab", function () {
        o = 6;
        d = 1;
        n();
        return !1
    });
    $("#f_sample_sub_tab6").bind("tab", function () {
        o = 3;
        d = 1;
        n();
        return !1
    });
    $("#f_item_page_left").click(function () {
        1 < d && (d--, n());
        return !1
    });
    $("#f_item_page_right").click(function () {
        d < E && (d++, n());
        return !1
    });
    $("#content").css("background-image", "url(img/bg/view.jpg)");
    (function () {
        c = new iScroll("scroller", {
            desktopCompatibility: !0
        });
        n();
        a.bind("useitem", function (a) {
            if (null != C) for (var b = 0; b < C.length; b++) {
                var c = C[b];
                if (c.item.sid == a) {
                    $("#f_item_use" + c.item.id + " a").click();
                    return
                }
            }
            showInfo(LNG.ERROR.SERVER[3114])
        })
    })()
});
defineSubView("f_mail", function () {
    function w(a, b) {
        null != s ? (s.refresh(), s.setPosition(a || 0, b || 0)) : s = new iScroll("scroller", {
            desktopCompatibility: !0
        });
        return !1
    }
    var s, n = [],
        v = $("#f_sample_html_script"),
        c = $(v.parent().get(0));
    c.bind("dispose", function () {
        null != s && (s.destroy(!1), s = null);
        c = null
    });
    var k = c.find("#f_mail_page"),
        g = k.find("#f_mail_page_pre"),
        a = k.find("#f_mail_page_next"),
        t = !1,
        u = function (b, c, d) {
            k.find("#f_mail_page_current").text(b + "/" + c);
            g.unbind();
            a.unbind();
            1 >= c ? (k.hide(), t = !1) : (k.show(), t = !0, 1 < b ? (g.show(), g.click(function () {
                g.unbind();
                a.unbind();
                d(b - 1);
                return !1
            })) : g.hide(), b < c ? (a.show(), a.click(function () {
                g.unbind();
                a.unbind();
                d(b + 1);
                return !1
            })) : a.hide())
        },
        b = c.find("#f_mail_inbox_content");
    c.find("#f_mail_inbox_detail");
    var B = $(b.find("#f_mail_template").get(0));
    B.remove();
    var m = function (a) {
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MAIL_DELETE, {
                key: key,
                id: a.join(",")
            }, function () {
                j(o)
            }, function () {})
        },
        C = function () {
            c.find("#f_mail_inbox").toggle();
            c.find("#f_mail_inbox_detail").toggle();
            c.find("#f_mail_inbox_detail_body").toggle();
            c.find("#f_mail_inbox").is(":visible") ? (t && c.find("#f_mail_page").show(), x()) : c.find("#f_mail_page").hide()
        },
        d = function (a) {
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MAIL_DETAIL, {
                key: key,
                id: a.id
            }, function (b) {
                c.find("#f_mail_inbox_detail_title b").text(a.title);
                c.find("#f_mail_inbox_detail_sender b").text(a.sender);
                c.find("#f_mail_inbox_detail_date b").text(Utils.ftime(new Date(1E3 * a.time), "MM/dd hh:mm:ss"));
                b = b.ret.replace(/\n/ig, "<br>");
                c.find("#f_mail_inbox_detail_body").html(b);
                $("#f_mail_inbox_delete").hide();
                $("#f_mail_report_delete").hide();
                w(0, 0);
                C();
                c.find("#f_mail_inbox_detail_delete").click(function () {
                    m([a.id]);
                    j();
                    c.find("#f_mail_inbox_detail").hide();
                    c.find("#f_mail_inbox_detail_body").hide();
                    c.find("#f_mail_inbox").show();
                    c.find("#f_mail_inbox_delete").show();
                    return !1
                });
                c.find("#f_mail_inbox_detail_reply").click(function () {
                    M(a.sender, "re:" + a.title);
                    return !1
                })
            }, function () {})
        },
        E = function (a, b) {
            a.find("input[type=checkbox]").data("id", b.id);
            a.find("#f_mail_title").html(b.title ? b.title : "Untitled Message");
            a.find("#f_mail_sender").html(b.sender);
            a.find("#f_mail_date").html(Utils.ftime(new Date(1E3 * b.time), "MM/dd hh:mm:ss"));
            b["new"] && (a.css("font-weight", "bold"), a.find("#f_mail_title").addClass("newmsg"));
            a.find("#f_mail_report_view").click(function () {
                n.push(C);
                d(b);
                return b["new"] = !1
            })
        },
        o = 1,
        q = null,
        x = function () {
            b.empty();
            null != q && $.each(q, function (a, c) {
                var d = B.clone();
                E(d, c);
                b.append(d)
            });
            w(0, 0)
        },
        j = function (a) {
            o = a = a || o || 1;
            c.find("#f_mail_inbox .iphonetitle input[type=checkbox]").attr("checked", !1);
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MAIL, {
                key: key,
                page: a
            }, function (b) {
                if (b.ret.max && o > b.ret.max) o = b.ret.max, j(o);
                u(a, b.ret.max, function (a) {
                    j(a)
                });
                q = b.ret.mail;
                x()
            }, function () {})
        };
    c.find("#f_mail_inbox_delete").click(function () {
        var a = [];
        b.find("input[type=checkbox]").each(function (b, c) {
            !0 == $(c).attr("checked") && a.push($(c).data("id"))
        });
        m(a);
        return !1
    });
    c.find("#f_mail_inbox .iphonetitle input[type=checkbox]").change(function () {
        var a = $(this).attr("checked");
        c.find("#f_mail_inbox_content input[type=checkbox]").attr("checked", a)
    });
    var i = c.find("#fwi_progresses"),
        f = c.find("#fwi_progress"),
        l = function () {
            c.find("#f_mail_report").toggle();
            c.find("#f_mail_report_detail").toggle()
        },
        z = function (a, b, d) {
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_WAR_DETAIL, {
                key: key,
                id: a.id
            }, function (e) {
                var g = c.find("#f_mail_report_detail");
                g.find("#f_mail_report_detail_type b").html(LNG.ACTIONTYPE_FULL[a.type]);
                g.find("#f_mail_report_detail_attacker b").html(a.aname);
                g.find("#f_mail_report_detail_attacker_xy b").html(a.ax + "/" + a.ay);
                var j = "",
                    j = 7 == a.type ? LNG.MONSTER : 8 == a.type ? LNG.RESCOLONY : 3 == a.type ? 0 < a.did ? a.dname : 1 == a.dcid ? LNG.RESCOLONY : LNG.MONSTER : a.dname;
                g.find("#f_mail_report_detail_defender b").html(j);
                g.find("#f_mail_report_detail_defender_xy b").html(a.dx + "/" + a.dy);
                a.aid == userinfo.id ? g.find("#f_mail_report_detail_result b").html(1 == a.flag ? LNG.ACTIONRESULT2.WIN : 0 == a.flag ? LNG.ACTIONRESULT2.LOSE : LNG.ACTIONRESULT2.DRAW) : g.find("#f_mail_report_detail_result b").html(1 == a.flag ? LNG.ACTIONRESULT2.LOSE : 0 == a.flag ? LNG.ACTIONRESULT2.WIN : LNG.ACTIONRESULT2.DRAW);
                g.find("#f_mail_report_detail_date").html(Utils.ftime(new Date(1E3 * a.time), "MM/dd/yy hh:mm:ss"));
                if (0 == a.type || 9 == a.type) g.find("#f_mail_report_detail_spy").show(), g.find("#f_mail_report_detail_loot").show(), g.find("#f_mail_report_detail_loot").text(LNG.ACTIONTYPE[0]);
                else if (2 == a.type) g.find("#f_mail_report_detail_spy").hide(), g.find("#f_mail_report_detail_loot").hide();
                else if (3 == a.type) g.find("#f_mail_report_detail_spy").show(), g.find("#f_mail_report_detail_loot").show(), 0 < a.did ? g.find("#f_mail_report_detail_loot").text(LNG.ACTIONTYPE[0]) : 1 == a.dcid ? g.find("#f_mail_report_detail_loot").text(LNG.ACTIONTYPE[8]) : g.find("#f_mail_report_detail_loot").text(LNG.ACTIONTYPE[7]);
                else if (5 == a.type) g.find("#f_mail_report_detail_spy").hide(), g.find("#f_mail_report_detail_loot").hide();
                else if (7 == a.type || 8 == a.type) g.find("#f_mail_report_detail_spy").show(), g.find("#f_mail_report_detail_loot").show(), g.find("#f_mail_report_detail_loot").text(LNG.ACTIONTYPE[a.type]);
                j = [];
                g.find("#f_mail_report_detail_body").hide();
                g.find("#f_mail_report_detail_body_other").hide();
                if (3 == a.type) e = e.ret.scout_report, j.push("<b>" + LNG.REPORT.MISSION_RESULT + ":&nbsp;</b>"), j.push(0 == e.flag || 3 == e.flag ? LNG.SPYRESULT[1] : 1 == e.flag || 4 == e.flag ? LNG.SPYRESULT[2] : 2 == e.flag || 5 == e.flag ? LNG.SPYRESULT[3] : ""), j.push("<br/><br/>"), j.push(e.result ? e.result : ""), g.find("#f_mail_report_detail_body_other").html(j.join("")).show();
                else if (5 == a.type || 2 == a.type) e = e.ret.other_report, j.push("<b>" + LNG.REPORT.MISSION_RESULT + ":&nbsp;</b>"), j.push(0 == e.flag ? LNG.ACTIONESULT.SUCCESS : LNG.ACTIONESULT.FAILED), j.push("<br/><br/>"), j.push(e.result ? e.result : ""), g.find("#f_mail_report_detail_body_other").html(j.join("")).show();
                else if (e.ret.war_report) {
                    var e = e.ret.war_report,
                        j = g.find("#f_mail_report_detail_body"),
                        p = mainStatus.HERO_DATA[e.a_gen.gid];
                    "undefined" != typeof p && null != p ? (j.find("#f_detail_left").show(), j.find("#fwi_agn").text(p.name), j.find("#fwi_aga").text(e.a_gen.attack), j.find("#fwi_agi").text(e.a_gen.intelligence), j.find("#fwi_agd").text(e.a_gen.defence), j.find("#fwi_agl").text(e.a_gen.loyalty), j.find("#fwi_agim img").attr("src", Utils.getHeroRankImage(p.race, p.rank)), Utils.loadImage(j.find("#fwi_agim"), Utils.getHeroImage(e.a_gen.gid))) : j.find("#f_detail_left").hide();
                    p = mainStatus.HERO_DATA[e.d_gen.gid];
                    "undefined" != typeof p && null != p ? (j.find("#f_detail_right").show(), j.find("#fwi_dgn").text(p.name), j.find("#fwi_dga").text(e.d_gen.attack), j.find("#fwi_dgi").text(e.d_gen.intelligence), j.find("#fwi_dgd").text(e.d_gen.defence), j.find("#fwi_dgl").text(e.d_gen.loyalty), j.find("#fwi_dgim img").attr("src", Utils.getHeroRankImage(p.race, p.rank)), Utils.loadImage(j.find("#fwi_dgim"), Utils.getHeroImage(e.d_gen.gid))) : j.find("#f_detail_right").hide();
                    i.empty();
                    null != e.war_process && $.each(e.war_process, function (a, b) {
                        var c = f.clone();
                        c.find("#fwi_pm").html(LNG.REPORT.ROUND + b.turn);
                        c.find("#fwi_pl").html("<div>" + LNG.REPORT.ARMY + ": " + b.aarmy + "</div><div>" + LNG.REPORT.ATTACK_POINT + ": " + b.aattack_point + "</div><div>" + LNG.REPORT.DEFENCE_POINT + ": " + b.adefence_point + "</div>");
                        c.find("#fwi_pr").html("<div>" + LNG.REPORT.ARMY + ": " + b.darmy + "</div><div>" + LNG.REPORT.ATTACK_POINT + ": " + b.dattack_point + "</div><div>" + LNG.REPORT.DEFENCE_POINT + ": " + b.ddefence_point + "</div>");
                        i.append(c)
                    });
                    j.find("#fwi_aresult").text(0 == e.war_result.aflag ? LNG.ACTIONRESULT.LOSE : 1 == e.war_result.aflag ? LNG.ACTIONRESULT.WIN : LNG.ACTIONRESULT.DRAW);
                    j.find("#fwi_agenstatus").text(0 == e.war_result.agen_status ? "" : 1 == e.war_result.agen_status ? LNG.HEROSTATUS[2] : LNG.HEROSTATUS[3]);
                    j.find("#fwi_aarm").text(e.war_result.aarmy_loss);
                    j.find("#fwi_aloot").html(e.war_result.resource);
                    j.find("#fwi_apexp").text(e.war_result.aplayer_exp);
                    j.find("#fwi_agexp").text(e.war_result.agen_exp);
                    j.find("#fwi_dresult").text(0 == e.war_result.aflag ? LNG.ACTIONRESULT.WIN : 1 == e.war_result.aflag ? LNG.ACTIONRESULT.LOSE : LNG.ACTIONRESULT.DRAW);
                    j.find("#fwi_dgenstatus").text(0 == e.war_result.dgen_status ? "" : 1 == e.war_result.dgen_status ? LNG.HEROSTATUS[2] : LNG.HEROSTATUS[2] + "&" + LNG.HEROSTATUS[3]);
                    j.find("#fwi_darm").text(e.war_result.darmy_loss);
                    j.find("#fwi_dloot").html(e.war_result.resource);
                    j.find("#fwi_dpexp").text(e.war_result.dplayer_exp);
                    j.find("#fwi_dgexp").text(e.war_result.dgen_exp);
                    g.find("#f_mail_report_detail_body").show()
                }
                l();
                k.hide();
                g.find("#f_mail_report_detail_delete").unbind().click(function () {
                    H([a.id], b, d)
                });
                g.find("#f_mail_report_detail_spy").unbind().click(function () {
                    a.aid == userinfo.id ? GlobalNav.Scout(a.dx, a.dy) : GlobalNav.Scout(a.ax, a.ay)
                });
                g.find("#f_mail_report_detail_loot").unbind().click(function () {
                    g.find("#f_mail_report_detail_loot").text() == LNG.ACTIONTYPE[0] ? a.aid == userinfo.id ? GlobalNav.Loot(a.dx, a.dy) : GlobalNav.Loot(a.ax, a.ay) : g.find("#f_mail_report_detail_loot").text() == LNG.ACTIONTYPE[8] ? GlobalNav.Occupy(a.dx, a.dy) : GlobalNav.Attack(a.dx, a.dy)
                });
                c.find("#wrapper").css("height", "220px");
                w(0, 0)
            }, function () {})
        },
        G = function (a, b, c, d) {
            var f = 0;
            a.find("#f_mail_report_type").html(LNG.ACTIONTYPE[b.type]);
            if (null == b.aname) b.aname = "[" + LNG.CITY_DESTROYED + "]";
            if (null == b.dname) b.dname = "[" + LNG.CITY_DESTROYED + "]";
            if (5 == b.type) b.dname = "";
            a.find("#f_mail_report_attacker").html("" + b.ax + "/" + b.ay + " " + b.aname);
            var g = "";
            7 == b.type ? g = LNG.MONSTER : 8 == b.type ? g = LNG.RESCOLONY : 3 == b.type ? 0 < b.did ? g = b.dname : 1 == b.dcid ? (g = LNG.RESCOLONY, 1 == b.flag && (f = 1)) : (g = LNG.MONSTER, 1 == b.flag && (f = 2)) : g = b.dname;
            g = "" + b.dx + "/" + b.dy + " " + g;
            a.find("#f_mail_report_defender").html(g);
            b.aid == userinfo.id ? (a.find("#f_mail_report_isdefend").empty().html("&nbsp;"), a.find("#f_mail_report_result").html(1 == b.flag ? LNG.ACTIONRESULT.WIN : 0 == b.flag ? LNG.ACTIONRESULT.LOSE : LNG.ACTIONRESULT.DRAW)) : a.find("#f_mail_report_result").html(0 == b.flag ? LNG.ACTIONRESULT.WIN : 1 == b.flag ? LNG.ACTIONRESULT.LOSE : LNG.ACTIONRESULT.DRAW);
            var j = new Date(1E3 * b.time);
            864E5 < j - new Date ? a.find("#f_mail_report_date").html(Utils.ftime(j, "MM/dd")) : a.find("#f_mail_report_date").html(Utils.ftime(j, "hh:mm:ss"));
            a.find("input[type=checkbox]").data("id", b.id);
            var i = a.find("#f_mail_report_operations");
            i.css("z-index", 5);
            a.find("#f_mail_report_view").click(function () {
                e.find("#f_mail_report_operations").stop().hide();
                i.show();
                return !1
            });
            i.find("#f_op_hide").click(function () {
                i.hide();
                return !1
            });
            i.find("#f_op_detail").click(function () {
                $("#f_mail_inbox_delete").hide();
                $("#f_mail_report_delete").hide();
                i.hide();
                z(b, c, d);
                n.push(F);
                return !1
            });
            2 == b.type || 5 == b.type ? (i.find("#f_op_map").hide(), i.find("#f_op_loot").hide(), i.find("#f_op_spy").hide()) : (0 == b.type || 7 == b.type || 8 == b.type || 9 == b.type ? 9 == b.type ? i.find("#f_op_loot").text(LNG.ACTIONTYPE[0]) : i.find("#f_op_loot").text(LNG.ACTIONTYPE[b.type]) : 0 < b.did ? i.find("#f_op_loot").text(LNG.ACTIONTYPE[0]) : 0 < b.dcid ? i.find("#f_op_loot").text(LNG.ACTIONTYPE[8]) : i.find("#f_op_loot").text(LNG.ACTIONTYPE[7]), i.find("#f_op_loot").click(function () {
                i.find("#f_op_loot").text() == LNG.ACTIONTYPE[0] ? b.aid == userinfo.id ? GlobalNav.Loot(b.dx, b.dy) : GlobalNav.Loot(b.ax, b.ay) : i.find("#f_op_loot").text() == LNG.ACTIONTYPE[8] ? GlobalNav.Occupy(b.dx, b.dy) : GlobalNav.Attack(b.dx, b.dy);
                return !1
            }), i.find("#f_op_spy").click(function () {
                b.aid == userinfo.id ? GlobalNav.Scout(b.dx, b.dy) : GlobalNav.Scout(b.ax, b.ay);
                return !1
            }), i.find("#f_op_map").click(function () {
                main_loadDiv("f_map.html", {
                    x: b.dx,
                    y: b.dy
                });
                return !1
            }));
            0 == f ? a.find("#f_op_addfav").hide() : i.find("#f_op_addfav").click(function () {
                pnlLoading.show();
                //燁살뮇��               
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
                    key: key,
                    act: "addreport",
                    wid: b.id,
                    cat: f
                }, function () {
                    showInfo(translate(LNG.ADDFAVDONE, g))
                });
                return !1
            })
        },
        A = c.find("#f_mail_report_template"),
        e = c.find("#f_mail_report_content");
    A.remove();
    var r = function (a, b) {
            b = b || 1;
            c.find("#f_mail_report").show();
            c.find("#f_mail_report_detail").hide();
            e.empty();
            c.find("#f_mail_report .iphonetitle input[type=checkbox]").attr("checked", !1);
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_WAR_RESULT, {
                key: key,
                page: b,
                type: a
            }, function (c) {
                u(b, c.ret.max, function (b) {
                    r(a, b)
                });
                null != c.ret.war && $.each(c.ret.war, function (c, d) {
                    var f = A.clone();
                    G(f, d, a, b);
                    e.append(f)
                });
                w(0, 0)
            }, function () {});
            c.find("#f_mail_report_delete").unbind().click(function () {
                var c = [];
                e.find("input[type=checkbox]").each(function (a, b) {
                    !0 == $(b).attr("checked") && c.push($(b).data("id"))
                });
                H(c, a, b);
                return !1
            })
        },
        H = function (a, b, c) {
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_WAR_RESULT, {
                key: key,
                action: "delete",
                id: a.join(",")
            }, function () {
                r(b, c)
            }, function () {})
        },
        F = function () {
            l();
            t && k.show();
            w(0);
            return !1
        };
    c.find("#f_mail_report .iphonetitle input[type=checkbox]").change(function () {
        var a = $(this).attr("checked");
        c.find("#f_mail_report_content input[type=checkbox]").attr("checked", a)
    });
    var p, L = function () {
            ":help" == c.find("#f_mail_write #f_mail_write_receiver input").val() && 0 != c.find("#f_mail_write #f_mail_write_title input").val().toLowerCase().indexOf("re:") ? (c.find("#f_mail_write #f_mail_write_receiver input").width(p - 100), c.find("#f_mail_write #f_mail_write_receiver select").show(), window.selectProxy.proxySelect($("#f_mail_write_receiver select")[0])) : (c.find("#f_mail_write #f_mail_write_receiver select").hide(), c.find("#f_mail_write #f_mail_write_receiver input").width(p))
        },
        M = function (a, b) {
            $("#f_sample_tab4").click();
            p = c.find("#f_mail_write #f_mail_write_receiver input").width();
            c.find("#f_mail_write #f_mail_write_receiver input").val(a);
            c.find("#f_mail_write #f_mail_write_title input").val(b);
            L()
        };
    c.find("#f_mail_write #f_mail_write_receiver input").change(L);
    c.find("#f_mail_write #f_mail_write_title input").change(L);
    c.find("#f_mail_write_send").click(function () {
        var a = c.find("#f_mail_write_receiver input:first").val(),
            b = c.find("#f_mail_write_title input:first").val(),
            d = c.find("#f_mail_write_detail_body").val(),
            e = 0;
        if (":help" == c.find("#f_mail_write #f_mail_write_receiver input").val() && 0 != c.find("#f_mail_write #f_mail_write_title input").val().toLowerCase().indexOf("re:") && (e = c.find("#f_mail_write #f_mail_write_receiver select").val(), "0" == e)) return showInfo(LNG.NEEDSPECIFYHELPCATEGORY), !1;
        1 < a.length && 1 < b.length && 1 < d.length ? (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MAIL_SEND, {
            key: key,
            nick: a,
            title: b,
            body: d,
            category: e
        }, function () {
            showInfo(LNG.SENDMAILSUCCESS);
            c.find("#f_mail_write_receiver input:first").val("");
            c.find("#f_mail_write_title input:first").val("");
            c.find("#f_mail_write_detail_body").val("")
        }, function () {})) : "undefined" != typeof LNG.ERROR.CLIENT.REQUIREDMAILFIELD && showInfo(LNG.ERROR.CLIENT.REQUIREDMAILFIELD);
        return !1
    });
    c.find(".tab_active,.tab_inactive").click(function (a) {
        $(this).hasClass("tab_inactive") && (c.find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), $(this).trigger("tab", a), n = []);
        return !1
    });
    $("#f_sample_tab5").bind("tab", function () {
        $("#f_mail_inbox").hide();
        $("#f_mail_inbox_detail").hide();
        $("#f_mail_inbox_detail_body").hide();
        $("#f_mail_report").hide();
        $("#f_mail_report_detail").hide();
        $("#f_mail_write").hide();
        $("#f_mail_inbox_delete").hide();
        $("#f_mail_report_delete").hide();
        $("#f_mail_page").hide();
        $("#f_mail_news").show();
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MAIL, {
            key: key,
            act: "news"
        }, function (a) {
            $("#f_mail_news_title b").html(a.ret[0]);
            a = a.ret[1].replace(/\n/ig, "<br>");
            $("#f_mail_news_body").html(a);
            w()
        });
        return !1
    });
    $("#f_sample_tab1").bind("tab", function () {
        $("#f_mail_inbox").show();
        $("#f_mail_inbox_detail").hide();
        $("#f_mail_inbox_detail_body").hide();
        $("#f_mail_report").hide();
        $("#f_mail_report_detail").hide();
        $("#f_mail_write").hide();
        $("#f_mail_inbox_delete").show();
        $("#f_mail_report_delete").hide();
        $("#f_mail_news").hide();
        j();
        w();
        return !1
    });
    $("#f_sample_tab2").bind("tab", function () {
        $("#f_mail_inbox").hide();
        $("#f_mail_inbox_detail").hide();
        $("#f_mail_inbox_detail_body").hide();
        $("#f_mail_report").show();
        $("#f_mail_report_detail").hide();
        $("#f_mail_write").hide();
        $("#f_mail_inbox_delete").hide();
        $("#f_mail_report_delete").show();
        $("#f_mail_news").hide();
        r(-1);
        w();
        return !1
    });
    $("#f_sample_tab3").bind("tab", function () {
        $("#f_mail_inbox").hide();
        $("#f_mail_inbox_detail").hide();
        $("#f_mail_inbox_detail_body").hide();
        $("#f_mail_report").show();
        $("#f_mail_report_detail").hide();
        $("#f_mail_write").hide();
        $("#f_mail_inbox_delete").hide();
        $("#f_mail_report_delete").show();
        $("#f_mail_news").hide();
        r(3);
        w();
        return !1
    });
    $("#f_sample_tab4").bind("tab", function () {
        setTimeout(function () {
            $("#f_mail_inbox").hide();
            $("#f_mail_inbox_detail").hide();
            $("#f_mail_inbox_detail_body").hide();
            $("#f_mail_report").hide();
            $("#f_mail_report_detail").hide();
            $("#f_mail_inbox_delete").hide();
            $("#f_mail_report_delete").hide();
            $("#f_mail_news").hide()
        });
        $("#f_mail_write").show();
        $("#f_mail_write_receiver input").focus();
        return !1
    });
    $("#f_sample_close").click(function () {
        $("#f_sample_tab1").hasClass("tab_active") ? $("#f_mail_inbox_delete").show() : ($("#f_sample_tab2").hasClass("tab_active") || $("#f_sample_tab3").hasClass("tab_active")) && $("#f_mail_report_delete").show();
        var a = n.pop();
        a ? a() : showCity();
        return !1
    });
    $("#content").css("background-image", "url(img/bg/view.jpg)");
    (function () {
        s = new iScroll("scroller", {
            desktopCompatibility: !0
        });
        var a = Utils.getCookie("params");
        if (null != a && (Utils.delCookie("params"), "writemail" == a.tab)) {
            M(a.reciver, a.title);
            pnlLoading.hide();
            return
        }
        j()
    })()
});
defineSubView("f_main", function () {});
defineSubView("f_map", function () {
    function w(b) {
        K.css("background-image", "");
        if (0 < b[2] && 100 >= b[2]) E.html("[" + b[0] + "/" + b[1] + "]&nbsp;" + LNG.MONSTER), K.css("background-image", "url(" + LNG.MONSTERLEVEL[b[2]] + ")"), q.hide(), x.hide(), j.hide(), o.hide(), i.hide(), z.hide(), l.hide(), r.hide(), H.hide(), F.show(), f.find("b").text(b[3][0]), f.show(), e.hide(), p.hide();
        else if (100 < b[2] && 200 >= b[2]) E.html("[" + b[0] + "/" + b[1] + "]&nbsp;" + a[b[2]].name), G.find("em").attr("class", a[b[2]].ico), q.hide(), x.hide(), j.hide(), o.hide(), G.find("b").text(b[3][1] + LNG.PERHOUR), "" != b[3][2] ? (A.find("b").text(Utils.timeString(b[3][3])), A.show(), ispvp ? D.hide() : D.attr("class", "race" + b[3][2][2]), O.text(null == b[3][2][1] ? "unknown" : b[3][2][1]), h.text(b[3][2][3]), 0 != b[3][2][5] ? (y.css("background-image", "url(" + Utils.getFlag(b[3][2][7]) + ")"), I.text(b[3][2][4])) : (y.css("background-image", ""), I.text("")), i.show()) : (A.hide(), i.hide()), z.show(), l.hide(), r.hide(), H.hide(), F.hide(), f.hide(), b[3][2][0] != userinfo.id ? e.show() : e.hide(), p.hide();
        else if (0 == b[2]) E.html("[" + b[0] + "/" + b[1] + "]&nbsp;" + LNG.EMPTYLAND), q.hide(), x.hide(), j.hide(), o.hide(), i.hide(), z.hide(), l.hide(), r.hide(), H.hide(), F.hide(), f.hide(), e.hide(), p.show();
        else {
            ispvp ? (E.html("[" + b[0] + "/" + b[1] + "]"), D.hide()) : (E.html("[" + b[0] + "/" + b[1] + "]&nbsp;" + b[3][11]), D.attr("class", "race" + b[3][2]));
            O.text(null == b[3][1] ? "unknown" : b[3][1]);
            h.text(b[3][3]);
            b[3][12] && 0 < b[3][12][0] ? (q.show(), x.hide(), j.hide(), o.text(b[3][12][2]), o.show()) : 0 != (b[3][9] & 4) ? (q.hide(), j.hide(), x.show(), o.text(Utils.timeString(b[3][13])), o.show()) : (x.hide(), q.hide(), "undefined" == typeof b[3][14] ? (j.hide(), o.hide()) : (j.show(), 0 < b[3][15] ? o.text(b[3][14] + " [" + Utils.timeString(b[3][15]) + "]") : o.text(b[3][14]), o.show()));
            0 != b[3][5] ? (y.css("background-image", "url(" + Utils.getFlag(b[3][7]) + ")"), I.text(b[3][4])) : (y.css("background-image", ""), I.text(""));
            0 < b[3][8] || 0 != (b[3][9] & 2) ? (l.attr("src", "img/item/0.png"), l.show()) : 0 != (b[3][9] & 1) ? (l.attr("src", "img/item/80.png"), l.show()) : l.hide();
            i.show();
            z.hide();
            if (b[3][0] == userinfo.id) {
                var c = mainStatus.getCity();
                b[0] != c.x || b[1] != c.y ? r.show() : r.hide();
                H.hide()
            } else r.hide(), 0 != b[3][5] && b[3][5] == userinfo.guildid ? (L.show(), M.hide()) : (L.hide(), M.show()), H.show();
            F.hide();
            f.hide();
            e.hide();
            p.hide()
        }
    }
    function s() {
        if (null != d && null != d.map) {
            J.html("");
            for (var c = 0; c < B; c++) for (var e = 0; e < b; e++) if (0 < d.map[e + c * b][2] && 100 >= d.map[e + c * b][2]) J.append('<div class="mapmonster" style="left: ' + e * m + "px; top: " + c * C + "px;background-image:url(" + LNG.MONSTERIMG[d.map[e + c * b][2]] + ');"></div>');
            else if (100 < d.map[e + c * b][2] && 200 >= d.map[e + c * b][2]) J.append('<div class="' + a[d.map[e + c * b][2]].cls + '" style="left: ' + e * m + "px; top: " + c * C + 'px;"></div>');
            else if (0 > d.map[e + c * b][2]) {
                var f = d.map[e + c * b],
                    h = "mapcastle";
                f[3][0] == userinfo.id && (h = "mycastle");
                J.append('<div class="' + h + '" style="left: ' + e * m + "px; top: " + c * C + 'px;"></div>');
                0 != f[3][5] && J.append('<img src="' + Utils.getFlag(f[3][7]) + '" style="position:absolute; left: ' + e * m + "px; top: " + (c * C + 15) + 'px;">')
            }
            t = Math.floor(b / 2);
            u = Math.floor(B / 2);
            N.css("left", t * m).css("top", u * C);
            c = d.map[t + u * b];
            w(c);
            Utils.setCookie("lastmappos", {
                x: c[0],
                y: c[1]
            }, 1)
        }
    }
    function n(a, b) {
        pnlLoading.show();
        null != d && (a == d.xleft && b == d.yleft ? P.show() : a == d.xright && b == d.yright ? R.show() : a == d.xup && b == d.yup ? T.show() : a == d.xdown && b == d.ydown && S.show());
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MAP, {
            key: key,
            x: a,
            y: b
        }, function (a) {
            d = a.ret;
            s();
            P.hide();
            R.hide();
            T.hide();
            S.hide()
        })
    }
    function v(a) {
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MAP, {
            key: key,
            nick: a
        }, function (a) {
            d = a.ret;
            s();
            $("#f_map_movenick").val("")
        })
    }
    function c(a, c) {
        t = a;
        u = c;
        N.css("left", t * m).css("top", u * C);
        w(d.map[t + u * b]);
        return !1
    }
    var k = $("#f_sample_html_script"),
        g = $(k.parent().get(0)),
        a = LNG.RESOURCE_STYLE;
    g.bind("dispose", function () {
        Utils.removeCss("f_map_css");
        g = null
    });
    var t = 0,
        u = 0,
        b = 7,
        B = 7,
        m = 35,
        C = 35,
        d = null,
        E = $("#f_map_selected strong"),
        o = $("#f_map_selected b"),
        q = $("#f_map_selected_province"),
        x = $("#f_map_selected_sleep"),
        j = $("#f_map_selected_hp"),
        i = $("#f_map_lordinfo"),
        f = $("#f_map_npcinfo"),
        l = $("#f_map_protected"),
        z = $("#f_map_resinfo"),
        G = $("#res_produce"),
        A = $("#res_end"),
        e = $("#f_map_menu_res"),
        r = $("#f_map_menu_my"),
        H = $("#f_map_menu_player"),
        F = $("#f_map_menu_npc"),
        p = $("#f_map_menu_empty"),
        L = $("#f_map_transp_player"),
        M = $("#f_map_loot_player"),
        D = $("#select_race em"),
        O = $("#select_race b"),
        h = $("#select_level b"),
        y = $("#select_guild em"),
        I = $("#select_guild b"),
        J = $("#f_map_mapview"),
        N = $("#f_map_aiming"),
        K = $("#f_map_stars"),
        P = $("#f_map_left"),
        R = $("#f_map_right"),
        T = $("#f_map_up"),
        S = $("#f_map_down");
    i.hide();
    r.hide();
    H.hide();
    F.hide();
    f.hide();
    p.hide();
    $("#f_map_mapclick").offset();
    window.isIphone || $("#f_map_mapclick>div").each(function (a, b) {
        $(b).find(">div").each(function (b, d) {
            $(d).touch(function () {
                c(b, a)
            })
        })
    });
    if (window.isIphone || window.isAndroid) {
        var V, U, W, X, k = document.getElementById("f_map_mapclick"),
            Y = function (a, b) {
                b = b || {
                    x: 0,
                    y: 0
                };
                b.x += a.offsetLeft;
                b.y += a.offsetTop;
                null != a.offsetParent && arguments.callee(a.offsetParent, b);
                return b
            }(k);
        k.addEventListener("touchstart", function (a) {
            a.preventDefault();
            W = V = a.changedTouches[0].pageX;
            X = U = a.changedTouches[0].pageY
        }, !1);
        k.addEventListener("touchmove", function (a) {
            a.preventDefault();
            W = a.changedTouches[0].pageX;
            X = a.changedTouches[0].pageY
        }, !1);
        k.addEventListener("touchend", function (a) {
            a.preventDefault();
            var a = W - V,
                b = X - U;
            5 >= Math.abs(a) && 5 >= Math.abs(b) ? c(Math.floor((W - Y.x) / 35), Math.floor((X - Y.y) / 35)) : (Math.abs(a), Math.abs(b), Math.abs(a) > Math.abs(b) ? 0 < a ? n(d.xleft, d.yleft) : n(d.xright, d.yright) : 0 < b ? n(d.xup, d.yup) : n(d.xdown, d.ydown))
        }, !1)
    }
    $("#f_map_close").click(function () {
        showCity();
        return !1
    });
    $("#f_map_home").click(function () {
        null != userinfo && "undefined" != typeof userinfo.city && null != userinfo.city && 0 < userinfo.city.length && n(userinfo.city[mainStatus.CITY].x, userinfo.city[mainStatus.CITY].y);
        return !1
    });
    $("#f_map_move_left").click(function () {
        n(d.xleft, d.yleft);
        return !1
    });
    $("#f_map_move_right").click(function () {
        n(d.xright, d.yright);
        return !1
    });
    $("#f_map_move_up").click(function () {
        n(d.xup, d.yup);
        return !1
    });
    $("#f_map_move_down").click(function () {
        n(d.xdown, d.ydown);
        return !1
    });
    $("#f_map_search").click(function () {
        var a = $("#f_map_movenick").val();
        if (null != a && "" != a) $("#f_map_movex").val(""), $("#f_map_movey").val(""), v(a);
        else {
            var a = parseInt($("#f_map_movex").val()),
                b = parseInt($("#f_map_movey").val());
            n(a, b)
        }
        return !1
    });
    $("#f_map_fav").click(function () {
        var a = d.map[t + u * b];
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
            key: key,
            nick: a[3][1]
        }, function (a) {
            showInfo(translate(LNG.ADDFAVDONE, a.ret.friend.nick))
        });
        return !1
    });
    $("#f_map_detail").click(function () {
        var a = d.map[t + u * b];
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETOTHERINFO, {
            key: key,
            id: a[3][0]
        }, function (a) {
            showUserInfo(a.ret.user)
        });
        return !1
    });
    $("#f_map_scout_res").click(function () {
        var a = d.map[t + u * b];
        Utils.setCookie("warinfo", {
            type: 3,
            x: a[0],
            y: a[1]
        }, 1);
        main_loadDiv("f_city_military.html");
        return !1
    });
    $("#f_map_attack_res").click(function () {
        var a = d.map[t + u * b];
        Utils.setCookie("warinfo", {
            type: 8,
            x: a[0],
            y: a[1],
            force: CONFIG.RESFORCE[a[2]]
        }, 1);
        main_loadDiv("f_city_military.html");
        return !1
    });
    $("#f_map_scout_npc").click(function () {
        var a = d.map[t + u * b];
        Utils.setCookie("warinfo", {
            type: 3,
            x: a[0],
            y: a[1]
        }, 1);
        main_loadDiv("f_city_military.html");
        return !1
    });
    $("#f_map_attack_npc").click(function () {
        var a = d.map[t + u * b];
        Utils.setCookie("warinfo", {
            type: 7,
            x: a[0],
            y: a[1],
            force: CONFIG.MONSTERFORCE[a[2]]
        }, 1);
        main_loadDiv("f_city_military.html");
        return !1
    });
    $("#f_map_transport").click(function () {
        var a = d.map[t + u * b];
        Utils.setCookie("warinfo", {
            type: 2,
            x: a[0],
            y: a[1],
            cityid: a[3].cityid
        }, 1);
        main_loadDiv("f_city_military.html");
        return !1
    });
    $("#f_map_scout_player").click(function () {
        var a = d.map[t + u * b];
        Utils.setCookie("warinfo", {
            type: 3,
            x: a[0],
            y: a[1]
        }, 1);
        main_loadDiv("f_city_military.html");
        return !1
    });
    $("#f_map_loot_player").click(function () {
        var a = d.map[t + u * b];
        Utils.setCookie("warinfo", {
            type: 0,
            x: a[0],
            y: a[1]
        }, 1);
        main_loadDiv("f_city_military.html");
        return !1
    });
    $("#f_map_transp_player").click(function () {
        var a = d.map[t + u * b];
        Utils.setCookie("warinfo", {
            type: 2,
            x: a[0],
            y: a[1]
        }, 1);
        main_loadDiv("f_city_military.html");
        return !1
    });
    $("#f_map_build").click(function () {
        var a = d.map[t + u * b];
        Utils.setCookie("warinfo", {
            type: 5,
            x: a[0],
            y: a[1]
        }, 1);
        main_loadDiv("f_city_military.html");
        return !1
    });
    $("#f_map_mail").click(function () {
        GlobalNav.WriteMail(d.map[t + u * b][3][1]);
        return !1
    });
    $("#content").css("background-image", "url(img/bg/view.jpg)");
    (function () {
        window.isIphone && (Utils.replaceInput(document.getElementById("f_map_movex"), "number"), Utils.replaceInput(document.getElementById("f_map_movey"), "number"));
        var a = Utils.getCookie("params");
        null != a ? (Utils.delCookie("params"), n(a.x, a.y)) : (a = Utils.getCookie("lastmappos"), null != a ? n(a.x, a.y) : null != userinfo && "undefined" != typeof userinfo.city && null != userinfo.city && 0 < userinfo.city.length && n(userinfo.city[mainStatus.CITY].x, userinfo.city[mainStatus.CITY].y))
    })()
});
defineSubView("f_quest", function () {
    function w(a, c) {
        return 0 == a ? LNG.QUEST_STATUS[0] : 1 == c ? LNG.QUEST_STATUS[1] : LNG.QUEST_STATUS[2]
    }
    function s() {
        var a = $("#scroller");
        a.empty().unbind();
        null != quests && $.each(quests, function (c, g) {
            var k = u[g.id];
            null != k && "undefined" != typeof k && (k = (0 == c ? "" : '<div style="height:10px;" class="seperator"></div>') + ('<p id="f_quest_quest' + g.id + '"><b>' + k.name + "</b><br><strong>" + w(g.status, g.done) + "</strong></p>"), a.append(k), a.find("#f_quest_quest" + g.id).click(function () {
                n(c);
                return !1
            }))
        });
        a.append("<p>&nbsp;</p><p>&nbsp;</p>")
    }
    function n(a) {
        if (null != quests && quests.length > a) {
            t = a;
            a = quests[a];
            $("#scroller p").removeClass("checking");
            $("#f_quest_quest" + a.id).addClass("checking");
            0 == a.status ? ($("#f_quest_accept").show(), $("#f_quest_accept").text(LNG.QUESTACCEPT)) : 0 == a.done ? $("#f_quest_accept").hide() : ($("#f_quest_accept").show(), $("#f_quest_accept").text(LNG.QUESTSUBMIT));
            var c = u[a.id];
            "undefined" != typeof c && null != c ? ($("#f_quest_selected_title b").html(c.name + "&nbsp;<font color=white>" + w(a.status, a.done) + "</font>"), $("#f_quest_selected_desc").html(c.desc), $("#f_quest_selected_req").html(c.req), $("#f_quest_selected_reward_food b").text(c.f), $("#f_quest_selected_reward_wood b").text(c.w), $("#f_quest_selected_reward_iron b").text(c.i), $("#f_quest_selected_reward_gold b").text(c.g), "" != c.bonus && null != c.bonus ? ($("#f_quest_selected_bonus").html(c.bonus), $("#f_quest_selected_bonus").show()) : $("#f_quest_selected_bonus").hide(), 46 == a.id ? ($("#f_quest_verify_email").show(), 0 == a.done && 0 != a.status ? $("#f_quest_set_email").show() : $("#f_quest_set_email").hide(), $("#f_quest_name").hide(), $("#f_quest_set_name").hide()) : 59 == a.id ? ($("#f_quest_verify_email").hide(), $("#f_quest_set_email").hide(), $("#f_quest_name").show(), 0 == a.done && 0 != a.status ? ($("#f_quest_name_nick").val(""), $("#f_quest_name_castle").val(""), $("#f_quest_set_name").show()) : ($("#f_quest_name_nick").val(userinfo.nick), $("#f_quest_name_castle").val(mainStatus.getCity().name), $("#f_quest_set_name").hide())) : ($("#f_quest_verify_email").hide(), $("#f_quest_set_email").hide(), $("#f_quest_name").hide(), $("#f_quest_set_name").hide())) : ($("#f_quest_accept").hide(), $("#f_quest_selected_title b").html(""), $("#f_quest_selected_desc").html(""), $("#f_quest_selected_req").html(""), $("#f_quest_selected_reward_food b").text("0"), $("#f_quest_selected_reward_wood b").text("0"), $("#f_quest_selected_reward_iron b").text("0"), $("#f_quest_selected_reward_gold b").text("0"), $("#f_quest_selected_bonus").hide())
        } else $("#f_quest_accept").hide(), $("#f_quest_selected_title b").html(""), $("#f_quest_selected_desc").html(""), $("#f_quest_selected_req").html(""), $("#f_quest_selected_reward_food b").text("0"), $("#f_quest_selected_reward_wood b").text("0"), $("#f_quest_selected_reward_iron b").text("0"), $("#f_quest_selected_reward_gold b").text("0"), $("#f_quest_selected_bonus").html("")
    }
    function v(a) {
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_TASK, {
            key: key,
            action: "task_up",
            id: a.id
        }, function (c) {
            a.status = 1;
            if (2 == c.ret.status) a.done = 1, quests[t] = a;
            c = u[a.id];
            $("#f_quest_selected_title b").html(c.name + "&nbsp;" + w(a.status, a.done));
            $("#f_quest_quest" + a.id).html("<b>" + c.name + "</b><br><strong>" + w(a.status, a.done) + "</strong>");
            0 == a.done ? $("#f_quest_accept").hide() : 1 == a.done && ($("#f_quest_accept").show(), $("#f_quest_accept").text(LNG.QUESTSUBMIT));
            CheckGuideDisplay(a.id);
            46 == a.id ? $("#f_quest_set_email").show() : 59 == a.id && $("#f_quest_set_name").show()
        })
    }
    function c(a) {
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_TASK, {
            key: key,
            action: "task_end",
            id: a.id
        }, function (c) {
            var g = u[a.id],
                v = !0,
                d;
            for (d in userinfo.city) if (mainStatus.CITY_ID > userinfo.city[d].id) {
                v = !1;
                break
            }
            v && (mainStatus.CITY_INFO[4] += g.f, mainStatus.CITY_INFO[6] += g.w, mainStatus.CITY_INFO[8] += g.i, mainStatus.CITY_INFO[2] += g.g);
            quests.splice(t, 1);
            null != c.ret && null != c.ret.quest && 0 < c.ret.quest.length && (quests = quests.concat(c.ret.quest), quests.sort(function (a, b) {
                return a.id - b.id
            }));
            s();
            n(0);
            null != k && (k.refresh(), k.setPosition(0, 0));
            CheckGuideDisplay(null) || showInfo(LNG.QUESTSUBMITED)
        })
    }
    var k = null,
        g = $("#f_sample_html_script"),
        a = $(g.parent().get(0));
    a.bind("dispose", function () {
        null != k && (k.destroy(!1), k = null);
        a = null
    });
    var t = 0,
        u = null;
    a.find(".tab_active,.tab_inactive").click(function (b) {
        $(this).hasClass("tab_inactive") && (a.find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), $(this).trigger("tab", b));
        return !1
    });
    $("#f_sample_tab1").bind("tab", function () {
        return !1
    });
    $("#f_sample_tab2 a").bind("tab", function () {
        return !1
    });
    $("#f_sample_close").click(function () {
        showCity();
        return !1
    });
    $("#f_quest_accept").click(function () {
        if (null != quests && quests.length > t) {
            var a = quests[t];
            if (0 == a.status) v(a);
            else if (1 == a.done) {
                var g = u[a.id];
                "undefined" != typeof g.note && null != g.note && "" != g.note ? showConfirm(g.note, function () {
                    c(a)
                }) : c(a)
            }
        }
        return !1
    });
    $("#f_quest_set_name").click(function () {
        var a = Utils.trim($("#f_quest_name_nick").val()),
            c = Utils.trim($("#f_quest_name_castle").val());
        if (null == a || "" == a) return showInfo(LNG.ERROR.CLIENT.EMPTYLORDNAME), !1;
        if (null == c || "" == c) return showInfo(LNG.ERROR.CLIENT.EMPTYCASTLENAME), !1;
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_TASK, {
            action: "setname",
            nick: encodeURIComponent(a),
            castle: encodeURIComponent(c),
            key: key
        }, function () {
            quests[t].done = 1;
            $("#f_quest_accept").text(LNG.QUESTSUBMIT);
            $("#f_quest_accept").show();
            showInfo(LNG.SUCCESS)
        });
        return !1
    });
    $("#f_quest_set_email").click(function () {
        var a = Utils.trim($("#f_quest_input_email").val());
        null != a && "" != a && 0 < a.indexOf("@") && (pnlLoading.show(), ajaxCall(CONFIG.MASTERHOST + CONFIG.MASTER_QUERY, {
            action: "email",
            user: keyinfo.user,
            email: a
        }, function () {
            showInfo(LNG.VERIFICATIONMAIL)
        }));
        return !1
    });
    $("#content").css("background-image", "url(img/bg/view.jpg)");
    (function () {
        pnlLoading.show();
        window.isIphone && Utils.replaceInput(document.getElementById("f_quest_input_email"), "email");
        u = mainStatus.QUEST_DATA;
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_TASK, {
            key: key,
            action: "task_list"
        }, function (a) {
            quests = a.ret.quest;
            quests.sort(function (a, b) {
                return a.id - b.id
            });
            null != quests && 0 < quests.length ? (pnlLoading.show(), s(), n(0), k = new iScroll("scroller", {
                desktopCompatibility: !0
            }), null == guideList && CheckGuideDisplay(null), pnlLoading.hide()) : (showInfo(LNG.ERROR.CLIENT.NOAVAILABLEQUEST), showCity())
        })
    })()
});
defineSubView("f_rank", function () {
    function w() {
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, {
            key: key,
            action: "worlds"
        }, function (a) {
            $.each(a.ret.worlds, function (a, b) {
                var c = a + 1;
                4 < c || ($("#f_world" + c).text(b.name), $("#f_world" + c + "_num").text(b.num))
            });
            $("#f_mail_page").hide();
            s(0, 0)
        }, function () {})
    }
    function s(a, b) {
        null != n && (n.refresh(), n.setPosition(a || 0, b || 0));
        return !1
    }
    var n = null,
        v = $("#f_city_center_html_script"),
        c = $(v.parent().get(0));
    c.bind("dispose", function () {
        null != n && (n.destroy(!1), n = null);
        c = null
    });
    var k = function (a, b, d) {
            a.find("#rank").text(d);
            a.find("#ranksnick b").text(b.nick);
            a.find("#ranksnick em").addClass("race" + b.nationid);
            a.find("#rankslevel b").text(b.level);
            "undefined" != typeof b.pvp ? (a.find("#rankspvp b").text(b.pvp), a.find("#rankspvp").show()) : a.find("#rankspvp").hide();
            0 < b.guildid && (a.find("#ranksguild b").text(b.guild), a.find("#ranksguild em").css("background-image", "url(" + Utils.getFlag(b.gflag) + ")"));
            a.find("#f_ranks_more").click(function () {
                c.find("#f_ranks_ops").hide();
                c.find("#f_ranks_more.minusbutton").not(this).removeClass("minusbutton").addClass("plusbutton");
                a.find("#f_ranks_more").hasClass("plusbutton") ? (a.find("#f_ranks_ops").show(), a.find("#f_ranks_more").removeClass("plusbutton").addClass("minusbutton")) : a.find("#f_ranks_more").removeClass("minusbutton").addClass("plusbutton");
                return !1
            });
            a.find("#f_ranks_sendmail").click(function () {
                GlobalNav.WriteMail(b.nick);
                return !1
            });
            a.find("#f_ranks_addfav").click(function () {
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
                    key: key,
                    nick: b.nick
                }, function (a) {
                    showInfo(translate(LNG.ADDFAVDONE, a.ret.friend.nick))
                });
                return !1
            });
            a.find("#f_ranks_viewinfo").click(function () {
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETOTHERINFO, {
                    key: key,
                    id: b.id
                }, function (a) {
                    showUserInfo(a.ret.user)
                });
                return !1
            })
        },
        g = c.find("#f_content1"),
        a = g.find('div[name="template"]:first');
    a.remove();
    var t = function (b) {
            var b = b || 1,
                c = g.find("#f_ranks");
            c.empty();
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SCORE_RANK, {
                key: key,
                page: b
            }, function (d) {
                pnlLoading.show();
                i(b, d.ret.max, function (a) {
                    t(a)
                });
                null != d.ret.user && $.each(d.ret.user, function (d, g) {
                    var e = a.clone().show();
                    k(e, g, 20 * (b - 1) + d + 1);
                    c.append(e)
                });
                s(0, 0);
                pnlLoading.hide()
            }, function () {})
        };
    t();
    var u = function (a, b, d) {
            a.find("#rank").text(d);
            d = mainStatus.HERO_DATA[b.gid];
            a.find("#genimg img").attr("src", Utils.getHeroImage(b.gid));
            a.find("#genname b").text(d.name);
            a.find("#gengrade b").text(b.gg);
            a.find("#genpower b").text(b.gp);
            a.find("#gencommend b").text(b.gce);
            a.find("#genintellect b").text(b.gi);
            a.find("#gencommand b").text(b.gca);
            a.find("#ranksnick b").text(b.nick);
            a.find("#f_ranks_more").click(function () {
                c.find("#f_ranks_ops").hide();
                c.find("#f_ranks_more.minusbutton").not(this).removeClass("minusbutton").addClass("plusbutton");
                a.find("#f_ranks_more").hasClass("plusbutton") ? (a.find("#f_ranks_ops").show(), a.find("#f_ranks_more").removeClass("plusbutton").addClass("minusbutton")) : a.find("#f_ranks_more").removeClass("minusbutton").addClass("plusbutton");
                return !1
            });
            a.find("#f_ranks_sendmail").click(function () {
                GlobalNav.WriteMail(b.nick);
                return !1
            });
            a.find("#f_ranks_addfav").click(function () {
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
                    key: key,
                    nick: b.nick
                }, function (a) {
                    showInfo(translate(LNG.ADDFAVDONE, a.ret.friend.nick))
                });
                return !1
            });
            a.find("#f_ranks_viewinfo").click(function () {
                pnlLoading.show();
                ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETOTHERINFO, {
                    key: key,
                    id: b.id
                }, function (a) {
                    showUserInfo(a.ret.user)
                });
                return !1
            })
        },
        b = c.find("#f_content2"),
        B = b.find('div[name="template"]:first'),
        m = null,
        C = function (a, c) {
            var c = (m = c) || "power",
                a = a || 1,
                d = b.find("#f_genranks");
            d.empty();
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SCORE_RANK, {
                key: key,
                page: a,
                type: "gen",
                subtype: c
            }, function (b) {
                pnlLoading.show();
                i(a, b.ret.max, function (a) {
                    C(a, c)
                });
                null != b.ret.gens && $.each(b.ret.gens, function (b, c) {
                    var g = B.clone().show();
                    u(g, c, 20 * (a - 1) + b + 1);
                    d.append(g)
                });
                s(0, 0);
                pnlLoading.hide()
            }, function () {})
        },
        d = c.find("#f_content4"),
        E = d.find('div[name="template"]:first');
    E.remove();
    var o = function () {
            var a = d.find("#f_ranks");
            a.empty();
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SCORE_RANK, {
                key: key,
                page: 1,
                ext: "honor"
            }, function (b) {
                pnlLoading.show();
                null != b.ret.user && $.each(b.ret.user, function (b, c) {
                    var d = E.clone().show();
                    d.find("#rank").text(b + 1);
                    d.find("#ranksnick b").text(c.nick);
                    d.find("#ranksnick em").addClass("race" + c.nationid);
                    d.find("#rankslevel b").text(c.level);
                    "undefined" != typeof c.pvp ? (d.find("#rankspvp b").text(c.pvp), d.find("#rankspvp").show()) : d.find("#rankspvp").hide();
                    0 < c.guildid && (d.find("#ranksguild b").text(c.guild), d.find("#ranksguild em").css("background-image", "url(" + Utils.getFlag(c.gflag) + ")"));
                    a.append(d)
                });
                s(0, 0);
                $("#f_mail_page").hide();
                pnlLoading.hide()
            }, function () {})
        },
        q = c.find("#f_mail_page"),
        x = q.find("#f_mail_page_pre"),
        j = q.find("#f_mail_page_next"),
        i = function (a, b, c) {
            q.find("#f_mail_page_current").text(a + "/" + b);
            x.unbind();
            j.unbind();
            1 >= b ? q.hide() : (q.show(), 1 < a ? (x.show(), x.click(function () {
                x.unbind();
                j.unbind();
                c(a - 1);
                return !1
            })) : x.hide(), a < b ? (j.show(), j.click(function () {
                x.unbind();
                j.unbind();
                c(a + 1);
                return !1
            })) : j.hide())
        };
    c.find("#f_tab1,#f_tab2,#f_tab3,##f_tab4").click(function (a) {
        $(this).hasClass("tab_inactive") && (c.find("#f_tab1,#f_tab2,#f_tab3,##f_tab4").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), $(this).trigger("tab", a), s());
        return !1
    });
    c.find("#f_hero_tab2,#f_hero_tab3,#f_hero_tab4,#f_hero_tab5,#f_hero_tab6").click(function (a) {
        $(this).hasClass("tab_inactive") && (c.find("#f_hero_tab2,#f_hero_tab3,#f_hero_tab4,#f_hero_tab5,#f_hero_tab6").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), $(this).trigger("tab", a), s());
        return !1
    });
    c.find("#f_tab1").bind("tab", function () {
        c.find("#f_content2").hide();
        c.find("#f_content3").hide();
        c.find("#f_content1").show();
        c.find("#f_content4").hide();
        t();
        return !1
    });
    c.find("#f_tab2").bind("tab", function () {
        c.find("#f_content1").hide();
        c.find("#f_content3").hide();
        c.find("#f_content2").show();
        c.find("#f_content4").hide();
        null == m ? C(0, "grade") : C(0, m);
        return !1
    });
    c.find("#f_tab3").bind("tab", function () {
        c.find("#f_content2").hide();
        c.find("#f_content1").hide();
        c.find("#f_content3").show();
        c.find("#f_content4").hide();
        w();
        return !1
    });
    c.find("#f_tab4").bind("tab", function () {
        c.find("#f_content2").hide();
        c.find("#f_content1").hide();
        c.find("#f_content3").hide();
        c.find("#f_content4").show();
        o();
        return !1
    });
    c.find("#f_hero_tab2").bind("tab", function () {
        C(0, "grade");
        return !1
    });
    c.find("#f_hero_tab3").bind("tab", function () {
        C(0, "power");
        return !1
    });
    c.find("#f_hero_tab4").bind("tab", function () {
        C(0, "commend");
        return !1
    });
    c.find("#f_hero_tab5").bind("tab", function () {
        C(0, "intellect");
        return !1
    });
    c.find("#f_hero_tab6").bind("tab", function () {
        C(0, "command");
        return !1
    });
    c.find("#f_close").click(function () {
        showCity();
        return !1
    });
    c.css("background-image", "url(img/bg/view.jpg)");
    ispvp ? ($("#f_tab3").show(), $("#f_tab4").show()) : ($("#f_tab3").hide(), $("#f_tab4").hide());
    n = new iScroll("scroller", {
        desktopCompatibility: !0
    })
});
defineSubView("f_sample", function () {
    var w = $("#f_sample_html_script"),
        s = $(w.parent().get(0));
    s.bind("dispose", function () {
        s = null
    });
    s.find(".tab_active,.tab_inactive").click(function (n) {
        $(this).hasClass("tab_inactive") && (s.find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), $(this).trigger("tab", n));
        return !1
    });
    $("#f_sample_tab1").bind("tab", function () {
        $("#f_sample_tab1").hasClass("tab_inactive") && ($("#f_sample_tab1").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_tab2").removeClass("tab_active").addClass("tab_inactive"));
        return !1
    });
    $("#f_sample_tab2").bind("tab", function () {
        $("#f_sample_tab2").hasClass("tab_inactive") && ($("#f_sample_tab2").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_tab1").removeClass("tab_active").addClass("tab_inactive"));
        return !1
    });
    $("#f_sample_close").click(function () {
        showCity();
        return !1
    });
    $("#f_sample_upgrade a").click(function () {
        return !1
    });
    $("#content").css("background-image", "url(img/bg/view.jpg)")
});
defineSubView("f_shop", function () {
    function w() {
        $("#f_shop_list").empty().unbind();
        null != E && $.each(E, function (a, b) {
            var c = mainStatus.ITEM_DATA[b];
            if (!("undefined" == typeof c || null == c)) {
                var d = LNG.ITEMRANK[c.rank],
                    e = c.desc;
                if (null != q && "undefined" != typeof q[a] && null != q[a]) for (var f = 0; f < q[a].length; f++) 0 != q[a][f] && (e = translate(e, q[a][f]));
                var d = '<div style="position:relative;height: 60px;"><div id="f_shop_img' + b + '" class="itemicon1" style="top: 5px; left: 5px;"></div><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px"><p><b><font color="' + d.color + '">' + c.name + '</font></b>&nbsp;<strong>(<font color="' + d.color + '">' + d.name + '</font>)</strong></p><p style="position:relative;top:6px;">' + e + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="gold"></em><b>',
                    g = c.price;
                null != o && "undefined" != typeof o[a] && null != o[a] && (g = o[a]);
                d = d + g + ('</b></li></ul><div id="f_shop_buy' + b + '" class="funcbutton" style="top: -3px; left: 330px;">' + LNG.PURCHASE + "</div></div></div>");
                $("#f_shop_list").append(d);
                Utils.loadImage($("#f_shop_img" + b), Utils.getItemImage(b));
                $("#f_shop_buy" + b).click(function () {
                    showConfirm(translate(LNG.CONFIRMBUY, c.name, g), function () {
                        pnlLoading.show();
                        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SHOP, {
                            key: key,
                            action: "purchase",
                            type: j,
                            city: mainStatus.getCity().id,
                            id: b
                        }, function (a) {
                            mainStatus.CITY_INFO[2] = a.ret.gold;
                            showInfo(LNG.SUCCESS)
                        })
                    });
                    return !1
                })
            }
        });
        $("#f_shop_page").hide();
        null != m && (m.refresh(), m.setPosition(0, 0))
    }
    function s() {
        pnlLoading.show();
        var a = CONFIG.MYHOST + CONFIG.FUNC_SHOP,
            b = {
                key: key,
                action: "list_goldshopitems",
                type: j,
                city: mainStatus.getCity().id
            };
        ajaxCall(a, b, function (a) {
            E = a.ret.item;
            o = a.ret.price;
            q = a.ret.attr;
            w()
        })
    }
    function n() {
        $("#f_shop_list2").empty().unbind();
        null != f && $.each(f, function (a, b) {
            var c = b.id,
                d = mainStatus.ITEM_DATA[c];
            if (!("undefined" == typeof d || null == d)) {
                var e = LNG.ITEMRANK[d.rank],
                    d = '<div style="position:relative;height: 60px;"><div id="f_shop2_img' + c + '" class="itemicon1" style="top: 5px; left: 5px;"></div><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px"><p><b><font color="' + e.color + '">' + d.name + '</font></b>&nbsp;<strong>(<font color="' + e.color + '">' + e.name + '</font>)</strong></p><p style="position:relative;top:6px;">' + d.desc + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="gem"></em><b>',
                    d = d + b.p,
                    d = d + ('</b></li></ul><div id="f_shop2_buy' + c + '" class="funcbutton" style="top: -3px; left: 330px;">' + LNG.PURCHASE + "</div></div></div>");
                $("#f_shop_list2").append(d);
                Utils.loadImage($("#f_shop2_img" + c), Utils.getItemImage(c));
                $("#f_shop2_buy" + c).click(function () {
                    $("#f_shop_buy_panel").show();
                    G = c;
                    return !1
                })
            }
        });
        1 >= z ? $("#f_shop_page").hide() : ($("#f_shop_page").show(), $("#f_shop_page_num").text(l + "/" + z), 1 >= l ? $("#f_shop_page_left").hide() : $("#f_shop_page_left").show(), l >= z ? $("#f_shop_page_right").hide() : $("#f_shop_page_right").show());
        null != m && (m.refresh(), m.setPosition(0, 0))
    }
    function v() {
        pnlLoading.show();
        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SHOP2, {
            key: key,
            action: "list_baoshopitems",
            page: l,
            cat: i
        }, function (a) {
            z = a.ret.max;
            f = a.ret.item;
            n()
        })
    }
    function c() {
        var a = $("#f_shop_list2");
        a.empty().unbind();
        ispvp ? (a.append('<div style="position:relative;height: 60px;"><img src="img/item/gem.jpg" style="position:absolute;top: 5px; left: 5px;"><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px">' + LNG.PVP_TRANSFERGEM_ALERT + '<div id="f_shop_transfergem" class="funcbutton" style="top: -3px; left: 330px;">' + LNG.PVP_TRANSFERGEM + "</div></div></div>"), $("#f_shop_transfergem").click(function () {
            $("#f_gem_transfer_panel").show();
            pnlLoading.show();
            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, {
                key: key,
                action: "getgem"
            }, function (a) {
                $("#f_gem_num b").text(a.ret.gems)
            });
            return !1
        })) : null != A && $.each(A, function (b, c) {
            if ("undefined" != typeof sysshop && null != sysshop && "undefined" != typeof sysshop[c.id] && null != sysshop[c.id]) c.price = sysshop[c.id];
            var d = '<div style="position:relative;height: 60px;"><img src="img/item/gem.jpg" style="position:absolute;top: 5px; left: 5px;"><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px"><p><b>' + c.title + '</b></p><p style="position:relative;top:6px;">' + c.info + '</p><ul class="reshead2" style="position: absolute; top: -3px; left: 170px;"><li><b>',
                d = d + c.price;
            "0" == c.id ? (d += '</b></li></ul><div id="f_shop_buygem' + b + '" class="funcbutton" style="top: -3px; left: 330px;">' + LNG.FREE + "</div></div></div>", a.append(d), $("#f_shop_buygem" + b).click(function () {
                window.droid && window.droid.setUser && window.droid.setUser(getUser());
                location.href = "js-call:tapjoy?";
                return !1
            })) : (d += '</b></li></ul><div id="f_shop_buygem' + b + '" class="funcbutton" style="top: -3px; left: 330px;">' + LNG.PURCHASE + "</div></div></div>", a.append(d), $("#f_shop_buygem" + b).click(function () {
                if (window.droid) {
                    var a = LNG.CONFIRMBUY4;
                    showPayList(translate(a, c.title, c.price), x, function (a) {
                        pnlLoading.show();
                        window.droid.setPayment && window.droid.setPayment(getUser(), c.sp, keyinfo.refercode, a);
                        location.href = "js-call:payment?" + c.id
                    })
                } else a = LNG.CONFIRMBUY3, showConfirm(translate(a, c.title, c.price), function () {
                    pnlLoading.show();
                    location.href = "js-call:payment?" + c.id
                });
                return !1
            }))
        });
        $("#f_shop_page").hide();
        null != m && (m.refresh(), m.setPosition(0, 0))
    }
    function k() {
        pnlLoading.show();
        ajaxCall(CONFIG.MASTERHOST + CONFIG.MASTER_SHOP, null, function (a) {
            A = a.ret;
            x = a.pay ? a.pay : [{
                id: "paypal",
                htm: "paypal"
            }];
            c()
        })
    }
    function g() {
        var a = $("#f_shop_list_emronor");
        a.empty().unbind();
        null != e && $.each(e, function (b, c) {
            var d = '<div style="position:relative;height: 60px;"><img src="img/item/gem.jpg" style="position:absolute;top: 5px; left: 5px;"><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px"><p><b>' + LNG.TITLE_EMRONOR_2_GEM + '</b></p><p style="position:relative;top:6px;">' + LNG.DESC_EMRONOR_2_GEM + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="pvp"></em><b>',
                d = d + c + ('</b></li></ul><div id="f_shop_emronor2gem' + b + '" class="funcbutton" style="top: -3px; left: 330px;">' + LNG.EMRONOR_EXCHANGE + "</div></div></div>");
            a.append(d);
            $("#f_shop_emronor2gem" + b).click(function () {
                $("#f_gem_exchange_panel").show();
                return !1
            })
        });
        $("#f_shop_page").hide();
        null != m && (m.refresh(), m.setPosition(0, 0))
    }

    function a() {
        null == e ? (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
            key: key,
            action: "emronor2gem"
        }, function (a) {
            e = a.ret.rate;
            g()
        })) : g()
    }
    function t() {
        var a = $("#f_shop_list_emronor");
        a.empty().unbind();
        a.append('<div class="iphonetitle"><div class="tab_text" style="position:relative; width:450px; text-align: center;">' + LNG.EMRORNOR_NOTICE + "</div></div>");
        null != r && $.each(r, function (b, c) {
            var d = c.id,
                e = mainStatus.ITEM_DATA[d];
            if (!("undefined" == typeof e || null == e)) {
                var f = LNG.ITEMRANK[e.rank],
                    g = e.desc;
                if ("undefined" != typeof c.attr && null != c.attr) for (var i = 0; i < c.attr.length; i++) 0 != c.attr[i] && (g = translate(g, c.attr[i]));
                f = '<div style="position:relative;height: 60px;"><div id="f_shop4_img' + d + '" class="itemicon1" style="top: 5px; left: 5px;"></div><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px"><p><b><font color="' + f.color + '">' + e.name + '</font></b>&nbsp;<strong>(<font color="' + f.color + '">' + f.name + '</font>)</strong></p><p style="position:relative;top:6px;">' + g + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="pvp"></em><b>';
                f += c.p;
                f += '</b></li></ul><div id="f_shop4_buy' + d + '" class="funcbutton" style="top: -3px; left: 330px;">' + LNG.EMRONOR_EXCHANGE + "</div></div></div>";
                a.append(f);
                Utils.loadImage($("#f_shop4_img" + d), Utils.getItemImage(d));
                $("#f_shop4_buy" + d).click(function () {
                    showConfirm(translate(LNG.CONFIRMBUY5, e.name, c.p), function () {
                        pnlLoading.show();
                        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
                            key: key,
                            action: "exchangeitem",
                            id: d
                        }, function (a) {
                            userinfo.pvp = a.ret.pvp;
                            refreshUserInfo();
                            showInfo(LNG.SUCCESS)
                        })
                    });
                    return !1
                })
            }
        });
        null != H && (a.append('<div class="iphonetitle"><div class="tab_text" style="position:relative; width:450px; text-align: center;"><b>' + LNG.EMRORNOR_SEASON + "</b></div></div>"), $.each(H, function (b, c) {
            var d = c.id,
                e = mainStatus.ITEM_DATA[d];
            if (!("undefined" == typeof e || null == e)) {
                var f = LNG.ITEMRANK[e.rank],
                    g = e.desc;
                if ("undefined" != typeof c.attr && null != c.attr) for (var i = 0; i < c.attr.length; i++) 0 != c.attr[i] && (g = translate(g, c.attr[i]));
                f = '<div style="position:relative;height: 60px;"><div id="f_shop4_img' + d + '" class="itemicon1" style="top: 5px; left: 5px;"></div><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px"><p><b><font color="' + f.color + '">' + e.name + '</font></b>&nbsp;<strong>(<font color="' + f.color + '">' + f.name + '</font>)</strong></p><p style="position:relative;top:6px;">' + g + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="pvp"></em><b>';
                f += c.p;
                f += '</b></li></ul><div id="f_shop4_buy' + d + '" class="funcbutton" style="top: -3px; left: 330px;">' + LNG.EMRONOR_EXCHANGE + "</div></div></div>";
                a.append(f);
                Utils.loadImage($("#f_shop4_img" + d), Utils.getItemImage(d));
                $("#f_shop4_buy" + d).click(function () {
                    showConfirm(translate(LNG.CONFIRMBUY5, e.name, c.p), function () {
                        pnlLoading.show();
                        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
                            key: key,
                            action: "exchangeitem",
                            id: d
                        }, function (a) {
                            userinfo.pvp = a.ret.pvp;
                            refreshUserInfo();
                            showInfo(LNG.SUCCESS)
                        })
                    });
                    return !1
                })
            }
        }));
        $("#f_shop_page").hide();
        null != m && (m.refresh(), m.setPosition(0, 0))
    }
    function u() {
        null == r ? (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
            key: key,
            action: "emronor2item"
        }, function (a) {
            r = a.ret.item;
            H = a.ret.item2;
            t()
        })) : t()
    }
    function b() {
        var a = $("#f_shop_list_emronor");
        a.empty().unbind();
        null != F && (a.append('<div class="iphonetitle"><div class="tab_text" style="position:relative; width:450px; text-align: center;">' + LNG.EMRORNOR_NOTICE + "</div></div>"), $.each(F, function (b, c) {
            var d = c.id,
                e = mainStatus.HERO_DATA[d];
            if (!("undefined" == typeof e || null == e)) {
                var f = '<div style="position:relative;height: 65px;"><img id="f_shop4_img' + d + '" style="position:absolute; top: 5px; left: 5px;" src="img/hero/sample.gif"/><div class="tooltip2" style="left: 70px; top: 5px; width: 390px; height:50px"><p><b>' + e.name + '</b></p><p style="position:relative;top:5px;">' + e.desc + '</p><p style="position:relative;top:5px;">' + LNG.ATTACK + ":" + c.attr.p + "&nbsp;&nbsp;&nbsp;" + LNG.DEFENSE + ":" + c.attr.c + "&nbsp;&nbsp;&nbsp;" + LNG.WISDOM + ":" + c.attr.i + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><b>' + LNG.HERO_TOKEN + "&nbsp;</b></li><li><b>",
                    f = f + c.p,
                    f = f + ('</b></li></ul><div id="f_shop4_buy' + d + '" class="funcbutton" style="top: -3px; left: 320px;">' + LNG.EMRONOR_EXCHANGE + "</div></div></div>");
                a.append(f);
                Utils.loadImage2($("#f_shop4_img" + d), Utils.getHeroImage(d));
                $("#f_shop4_buy" + d).click(function () {
                    showConfirm(translate(LNG.CONFIRMBUY6, e.name, c.p), function () {
                        pnlLoading.show();
                        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
                            key: key,
                            action: "exchangehero",
                            city: mainStatus.getCity().id,
                            id: d
                        }, function () {
                            showInfo(LNG.SUCCESS)
                        })
                    });
                    return !1
                })
            }
        }));
        $("#f_shop_page").hide();
        null != m && (m.refresh(), m.setPosition(0, 0))
    }
    function B() {
        null == F ? (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
            key: key,
            action: "emronor2hero"
        }, function (a) {
            F = a.ret.hero;
            b()
        })) : b()
    }
    var m = null,
        C = $("#f_sample_html_script"),
        d = $(C.parent().get(0));
    d.bind("dispose", function () {
        null != m && (m.destroy(!1), m = null);
        Utils.removeCss("f_shop_css");
        d = null
    });
    var E = null,
        o = null,
        q = null,
        x = null,
        j = 1,
        i = 5,
        f = null,
        l = 1,
        z = 1,
        G = 0;
    $("#f_shop_buy_cancel").click(function () {
        $("#f_shop_buy_panel").hide();
        return !1
    });
    $("#f_shop_buy_confirm").click(function () {
        var a = parseInt($("#f_shop_buy_num input").val());
        if (!(isNaN(a) || null == a)) if (0 >= a) showInfo(LNG.ERROR.CLIENT.INVALIDINPUT);
        else return pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SHOP2, {
            key: key,
            action: "purchase",
            num: a,
            id: G
        }, function (a) {
            userinfo.money = a.ret.money;
            refreshUserInfo();
            $("#f_shop_buy_panel").hide();
            showInfo(LNG.SUCCESS)
        }), !1
    });
    var A = null;
    $("#f_gem_cancel").click(function () {
        $("#f_gem_transfer_panel").hide()
    });
    $("#f_gem_confirm").click(function () {
        $("#f_gem_transfer_panel").hide();
        var a = parseInt($("#f_gem_num input").val()),
            b = parseInt($("#f_gem_num b").text());
        0 >= a || a > b ? showInfo(LNG.ERROR.CLIENT.INVALIDINPUT) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, {
            key: key,
            action: "transfergem",
            gems: a
        }, function (a) {
            0 >= a.ret.gems ? showInfo(LNG.ERROR.CLIENT.INVALIDINPUT) : (userinfo.money += a.ret.gems, refreshUserInfo(), showInfo(LNG.SUCCESS))
        }))
    });
    $("#f_sample_tab1").click(function () {
        $("#f_sample_tab1").hasClass("tab_inactive") && ($("#f_sample_tab1").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_shop_gold_title").show(), $("#f_shop_gem_title").hide(), $("#f_shop_list_emronor").hide(), $("#f_shop_emronor_title").hide(), $("#wrapper").css("height", "200px"), $("#f_shop_list").show(), $("#f_shop_list2").hide(), null == E ? s() : w());
        return !1
    });
    $("#f_sample_tab2").click(function () {
        $("#f_sample_tab2").hasClass("tab_inactive") && ($("#f_sample_tab2").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_shop_gold_title").hide(), $("#f_shop_gem_title").show(), $("#wrapper").css("height", "200px"), $("#f_shop_list2").show(), $("#f_shop_list").hide(), $("#f_shop_list_emronor").hide(), $("#f_shop_emronor_title").hide(), null == f ? v() : n());
        return !1
    });
    $("#f_sample_tab3").click(function () {
        $("#f_sample_tab3").hasClass("tab_inactive") && ($("#f_sample_tab3").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_shop_gold_title").hide(), $("#f_shop_gem_title").hide(), $("#f_shop_emronor_title").hide(), $("#wrapper").css("height", "230px"), $("#f_shop_list2").show(), $("#f_shop_list").hide(), $("#f_shop_list_emronor").hide(), null == A && !ispvp ? k() : c());
        return !1
    });
    $("#f_sample_tab4").click(function () {
        $("#f_sample_tab4").hasClass("tab_inactive") && ($("#f_sample_tab4").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_shop_gold_title").hide(), $("#f_shop_gem_title").hide(), $("#f_shop_emronor_title").show(), $("#wrapper").css("height", "230px"), $("#f_shop_list_emronor").show(), $("#f_shop_list2").hide(), $("#f_shop_list").hide(), null == e && null == r && null == F && a());
        return !1
    });
    $("#f_sample_sub_tab1").click(function () {
        $("#f_sample_sub_tab1").hasClass("tab_inactive") && ($("#f_sample_sub_tab1").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab5").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab6").removeClass("tab_active").addClass("tab_inactive"), j = 1, s());
        return !1
    });
    $("#f_sample_sub_tab2").click(function () {
        $("#f_sample_sub_tab2").hasClass("tab_inactive") && ($("#f_sample_sub_tab2").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab5").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab6").removeClass("tab_active").addClass("tab_inactive"), j = 2, s());
        return !1
    });
    $("#f_sample_sub_tab3").click(function () {
        $("#f_sample_sub_tab3").hasClass("tab_inactive") && ($("#f_sample_sub_tab3").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab5").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab6").removeClass("tab_active").addClass("tab_inactive"), j = 5, s());
        return !1
    });
    $("#f_sample_sub_tab4").click(function () {
        $("#f_sample_sub_tab4").hasClass("tab_inactive") && ($("#f_sample_sub_tab4").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab5").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab6").removeClass("tab_active").addClass("tab_inactive"), j = 4, s());
        return !1
    });
    $("#f_sample_sub_tab5").click(function () {
        $("#f_sample_sub_tab5").hasClass("tab_inactive") && ($("#f_sample_sub_tab5").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab6").removeClass("tab_active").addClass("tab_inactive"), j = 6, s());
        return !1
    });
    $("#f_sample_sub_tab6").click(function () {
        $("#f_sample_sub_tab6").hasClass("tab_inactive") && ($("#f_sample_sub_tab6").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab5").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), j = 3, s());
        return !1
    });
    $("#f_gem_sub_tab1").click(function () {
        $("#f_gem_sub_tab1").hasClass("tab_inactive") && ($("#f_gem_sub_tab1").removeClass("tab_inactive").addClass("tab_active"), $("#f_gem_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab5").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab6").removeClass("tab_active").addClass("tab_inactive"), i = 5, v());
        return !1
    });
    $("#f_gem_sub_tab2").click(function () {
        $("#f_gem_sub_tab2").hasClass("tab_inactive") && ($("#f_gem_sub_tab2").removeClass("tab_inactive").addClass("tab_active"), $("#f_gem_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab5").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab6").removeClass("tab_active").addClass("tab_inactive"), i = 1, v());
        return !1
    });
    $("#f_gem_sub_tab3").click(function () {
        $("#f_gem_sub_tab3").hasClass("tab_inactive") && ($("#f_gem_sub_tab3").removeClass("tab_inactive").addClass("tab_active"), $("#f_gem_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab5").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab6").removeClass("tab_active").addClass("tab_inactive"), i = 2, v());
        return !1
    });
    $("#f_gem_sub_tab4").click(function () {
        $("#f_gem_sub_tab4").hasClass("tab_inactive") && ($("#f_gem_sub_tab4").removeClass("tab_inactive").addClass("tab_active"), $("#f_gem_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab5").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab6").removeClass("tab_active").addClass("tab_inactive"), i = 3, v());
        return !1
    });
    $("#f_gem_sub_tab5").click(function () {
        $("#f_gem_sub_tab5").hasClass("tab_inactive") && ($("#f_gem_sub_tab5").removeClass("tab_inactive").addClass("tab_active"), $("#f_gem_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab6").removeClass("tab_active").addClass("tab_inactive"), i = 4, v());
        return !1
    });
    $("#f_gem_sub_tab6").click(function () {
        $("#f_gem_sub_tab6").hasClass("tab_inactive") && ($("#f_gem_sub_tab6").removeClass("tab_inactive").addClass("tab_active"), $("#f_gem_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab5").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), i = 6, v());
        return !1
    });
    var e = null;
    $("#f_gem_exchange_cancel").click(function () {
        $("#f_gem_exchange_panel").hide()
    });
    $("#f_gem_exchange_confirm").click(function () {
        $("#f_gem_exchange_panel").hide();
        var a = parseInt($("#f_gem_exchange_num input").val());
        0 >= a ? showInfo(LNG.ERROR.CLIENT.INVALIDINPUT) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
            key: key,
            action: "exchagegem",
            gems: a
        }, function (a) {
            0 >= a.ret.gems ? showInfo(LNG.ERROR.CLIENT.INVALIDINPUT) : (userinfo.money += parseInt(a.ret.gems), userinfo.pvp -= parseInt(a.ret.pvp), refreshUserInfo(), showInfo(LNG.SUCCESS))
        }))
    });
    var r = null,
        H = null,
        F = null;
    $("#f_emronor_sub_tab1").click(function () {
        $("#f_emronor_sub_tab1").hasClass("tab_inactive") && ($("#f_emronor_sub_tab1").removeClass("tab_inactive").addClass("tab_active"), $("#f_emronor_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_emronor_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), a())
    });
    $("#f_emronor_sub_tab2").click(function () {
        $("#f_emronor_sub_tab2").hasClass("tab_inactive") && ($("#f_emronor_sub_tab2").removeClass("tab_inactive").addClass("tab_active"), $("#f_emronor_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_emronor_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), u())
    });
    $("#f_emronor_sub_tab3").click(function () {
        $("#f_emronor_sub_tab3").hasClass("tab_inactive") && ($("#f_emronor_sub_tab3").removeClass("tab_inactive").addClass("tab_active"), $("#f_emronor_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_emronor_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), B())
    });
    $("#f_shop_page_left").click(function () {
        $("#f_sample_tab2").hasClass("tab_active") && 1 < l && (l--, v());
        return !1
    });
    $("#f_shop_page_right").click(function () {
        $("#f_sample_tab2").hasClass("tab_active") && l < z && (l++, v());
        return !1
    });
    $("#f_sample_close").click(function () {
        showCity();
        return !1
    });
    $("#content").css("background-image", "url(img/bg/view.jpg)");
    (function () {
        m = new iScroll("scroller", {
            desktopCompatibility: !0
        });
        ispvp ? $("#f_sample_tab4").hide() : $("#f_sample_tab4").show();
        var a = Utils.getCookie("params");
        if (null != a && (Utils.delCookie("params"), "" != a.tab && null != a.tab)) {
            $("#f_sample_tab" + a.tab).click();
            return
        }
        s()
    })()
});
defineSubView("f_start", function () {});
defineSubView("f_trade", function () {
    function w() {
        $("#f_trade_sell_list").empty().unbind();
        null != B && $.each(B, function (a, b) {
            var c = (new Date).getTime() / 1E3;
            864E3 > b[3] && (b[3] += c);
            if (b[3] > c) {
                var d = mainStatus.ITEM_DATA[b[1]];
                if (!("undefined" == typeof d || null == d)) {
                    var f = LNG.ITEMRANK[d.rank],
                        g = d.desc;
                    if ("undefined" != typeof b[4] && null != b[4]) for (var i = 0; i < b[4].length; i++) 0 != b[4][i] && (g = translate(g, b[4][i]));
                    f = '<div style="position:relative;height: 60px;"><div id="f_item_img' + b[0] + '" class="itemicon1" style="top: 5px; left: 5px;"></div><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px"><p><b><font color="' + f.color + '">' + d.name + '</font></b>&nbsp;<strong>(<font color="' + f.color + '">' + f.name + '</font>)&nbsp;x1</strong></p><p style="position:relative;top:6px;">' + g + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 165px;"><li><em class="gold"></em><b>';
                    f = mainStatus.CITY_INFO[2] < b[2] ? f + ("<font color=#FFD17A>" + b[2] + "</font>") : f + b[2];
                    f += '&nbsp;</b></li><li><em class="clock"></em><b>' + Utils.timeString2(b[3] - c) + '</b></li></ul><div id="f_item_buy' + b[0] + '" class="funcbutton" style="top: 0px; left: 330px;"><a href="#">' + LNG.PURCHASE + "</a></div></div></div>";
                    $("#f_trade_sell_list").append(f);
                    Utils.loadImage($("#f_item_img" + b[0]), Utils.getItemImage(b[1]));
                    $("#f_item_buy" + b[0] + " a").click(function () {
                        if (mainStatus.CITY_INFO[2] < b[2]) return showInfo(LNG.ERROR.CLIENT.GOLDNOTENOUGH), !1;
                        showConfirm(translate(LNG.CONFIRMBUY, d.name, b[2]), function () {
                            pnlLoading.show();
                            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_TRADE_LIST, {
                                key: key,
                                action: "purchasing",
                                city: mainStatus.getCity().id,
                                id: b[0]
                            }, function () {
                                mainStatus.CITY_INFO[2] -= b[2];
                                showInfo(LNG.SUCCESS);
                                B.splice(a, 1);
                                w()
                            })
                        });
                        return !1
                    })
                }
            }
        });
        null != t && (t.refresh(), t.setPosition(0, 0));
        1 >= C ? $("#f_trade_page").hide() : ($("#f_trade_page").show(), $("#f_trade_page_num").text(m + "/" + C), 1 >= m ? $("#f_trade_page_left").hide() : $("#f_trade_page_left").show(), m >= C ? $("#f_trade_page_right").hide() : $("#f_trade_page_right").show())
    }
    function s() {
        var a = $("#f_trade_type").val(),
            b = $("#f_trade_search input").val();
        pnlLoading.show();
        var c = CONFIG.MYHOST + CONFIG.FUNC_TRADE_LIST,
            d = null,
            d = null != b && "" != b ? {
                key: key,
                name: b,
                type: a,
                page: m
            } : {
                key: key,
                type: a,
                page: m
            };
        ajaxCall(c, d, function (a) {
            C = a.ret.max;
            B = a.ret.item;
            w()
        })
    }
    function n() {
        $("#f_trade_start_list").empty().unbind();
        null != d && $.each(d, function (a, b) {
            var c = mainStatus.ITEM_DATA[b.sid];
            if (!("undefined" == typeof c || null == c)) {
                var e = LNG.ITEMRANK[c.rank],
                    f = c.desc;
                if ("undefined" != typeof b.attr && null != b.attr) for (var g = 0; g < b.attr.length; g++) 0 != b.attr[g] && (f = translate(f, b.attr[g]));
                e = '<div style="position:relative;height: 60px;"><div id="f_trade_start_img' + b.id + '" class="itemicon1" style="top: 5px; left: 5px;"></div><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px"><p><b><font color="' + e.color + '">' + c.name + '</font></b>&nbsp;<strong>(<font color="' + e.color + '">' + e.name + "</font>)&nbsp;x" + b.num + '</strong></p><p style="position:relative;top:6px;">' + f + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="gold"></em><input id="f_trade_start_price' + b.id + '" type="';
                e = window.isIphone ? e + "number" : e + "text";
                e += '" value="' + c.price + '" style="width:100px"/></li></ul><div id="f_item_trade_start' + b.id + '" class="funcbutton" style="top: 0px; left: 330px;"><a href="#">' + LNG.TRADE + "</a></div></div></div>";
                $("#f_trade_start_list").append(e);
                Utils.loadImage($("#f_trade_start_img" + b.id), Utils.getItemImage(b.sid));
                $("#f_item_trade_start" + b.id + " a").click(function () {
                    var e = $("#f_trade_start_price" + b.id).val();
                    showConfirm(translate(LNG.CONFIRMTRADE, c.name, e), function () {
                        pnlLoading.show();
                        ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MY_TRADE, {
                            key: key,
                            action: "my_goods_safe",
                            city: mainStatus.getCity().id,
                            id: b.id,
                            safe_num: 1,
                            price: e
                        }, function () {
                            showInfo(translate(LNG.TRADECOMMIT, c.name));
                            d.splice(a, 1);
                            n()
                        })
                    });
                    return !1
                })
            }
        });
        null != t && (t.refresh(), t.setPosition(0, 0));
        1 >= o ? $("#f_trade_page").hide() : ($("#f_trade_page").show(), $("#f_trade_page_num").text(E + "/" + o), 1 >= E ? $("#f_trade_page_left").hide() : $("#f_trade_page_left").show(), E >= o ? $("#f_trade_page_right").hide() : $("#f_trade_page_right").show())
    }
    function v() {
        pnlLoading.show();
        var a = CONFIG.MYHOST + CONFIG.FUNC_MY_TRADE,
            b = {
                key: key,
                action: "list_invitem",
                city: mainStatus.getCity().id,
                page: E
            };
        ajaxCall(a, b, function (a) {
            o = a.ret.max;
            d = a.ret.item;
            n()
        })
    }
    function c() {
        $("#f_trade_my_list").empty().unbind();
        null != q && $.each(q, function (a, b) {
            var d = (new Date).getTime() / 1E3;
            86400 > b[3] && (b[3] += d);
            if (b[3] > d) {
                var e = mainStatus.ITEM_DATA[b[1]];
                if (!("undefined" == typeof e || null == e)) {
                    var f = LNG.ITEMRANK[e.rank],
                        g = e.desc;
                    if ("undefined" != typeof b[4] && null != b[4]) for (var i = 0; i < b[4].length; i++) 0 != b[4][i] && (g = translate(g, b[4][i]));
                    f = '<div style="position:relative;height: 60px;"><div id="f_item_wait_img' + b[0] + '" class="itemicon1" style="top: 5px; left: 5px;"></div><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px"><p><b><font color="' + f.color + '">' + e.name + '</font></b>&nbsp;<strong>(<font color="' + f.color + '">' + f.name + '</font>)&nbsp;x1</strong></p><p style="position:relative;top:6px;">' + g + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="gold"></em><b>';
                    f += b[2];
                    f += '&nbsp;</b></li><li><em class="clock"></em><b>' + Utils.timeString2(b[3] - d) + '</b></li></ul><div id="f_item_wait_cancel' + b[0] + '" class="funcbutton" style="top: 0px; left: 330px;"><a href="#">' + LNG.CANCEL + "</a></div></div></div>";
                    $("#f_trade_my_list").append(f);
                    Utils.loadImage($("#f_item_wait_img" + b[0]), Utils.getItemImage(b[1]));
                    $("#f_item_wait_cancel" + b[0] + " a").click(function () {
                        showConfirm(translate(LNG.CONFIRMCANCELTRADE, e.name), function () {
                            pnlLoading.show();
                            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MY_TRADE, {
                                key: key,
                                action: "auction_cancel",
                                city: mainStatus.getCity().id,
                                type: "will",
                                id: b[0]
                            }, function () {
                                showInfo(LNG.SUCCESS);
                                q.splice(a, 1);
                                c()
                            })
                        });
                        return !1
                    })
                }
            }
        });
        null != t && (t.refresh(), t.setPosition(0, 0));
        1 >= j ? $("#f_trade_page").hide() : ($("#f_trade_page").show(), $("#f_trade_page_num").text(x + "/" + j), 1 >= m ? $("#f_trade_page_left").hide() : $("#f_trade_page_left").show(), x >= j ? $("#f_trade_page_right").hide() : $("#f_trade_page_right").show())
    }
    function k() {
        pnlLoading.show();
        var a = CONFIG.MYHOST + CONFIG.FUNC_MY_TRADE,
            b = {
                key: key,
                action: "list_auction_item",
                type: "will",
                city: mainStatus.getCity().id,
                page: x
            };
        ajaxCall(a, b, function (a) {
            j = a.ret.max;
            q = a.ret.item;
            c()
        })
    }
    function g() {
        $("#f_trade_my_list2").empty().unbind();
        null != i && $.each(i, function (a, b) {
            var c = (new Date).getTime() / 1E3;
            864E3 > b[3] && (b[3] += c);
            if (b[3] > c) {
                var d = mainStatus.ITEM_DATA[b[1]];
                if (!("undefined" == typeof d || null == d)) {
                    var f = LNG.ITEMRANK[d.rank],
                        j = d.desc;
                    if ("undefined" != typeof b[4] && null != b[4]) for (var k = 0; k < b[4].length; k++) 0 != b[4][k] && (j = translate(j, b[4][k]));
                    f = '<div style="position:relative;height: 60px;"><div id="f_item_ontrade_img' + b[0] + '" class="itemicon1" style="top: 5px; left: 5px;"></div><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px"><p><b><font color="' + f.color + '">' + d.name + '</font></b>&nbsp;<strong>(<font color="' + f.color + '">' + f.name + '</font>)&nbsp;x1</strong></p><p style="position:relative;top:6px;">' + j + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="gold"></em><b>';
                    f += b[2];
                    f += '&nbsp;</b></li><li><em class="clock"></em><b>' + Utils.timeString2(b[3] - c) + '</b></li></ul><div id="f_item_ontrade_cancel' + b[0] + '" class="funcbutton" style="top: 0px; left: 330px;"><a href="#">' + LNG.CANCEL + "</a></div></div></div>";
                    $("#f_trade_my_list2").append(f);
                    Utils.loadImage($("#f_item_ontrade_img" + b[0]), Utils.getItemImage(b[1]));
                    $("#f_item_ontrade_cancel" + b[0] + " a").click(function () {
                        showConfirm(translate(LNG.CONFIRMCANCELTRADE, d.name), function () {
                            pnlLoading.show();
                            ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MY_TRADE, {
                                key: key,
                                action: "auction_cancel",
                                city: mainStatus.getCity().id,
                                id: b[0]
                            }, function () {
                                showInfo(LNG.SUCCESS);
                                i.splice(a, 1);
                                g()
                            })
                        });
                        return !1
                    })
                }
            }
        });
        null != t && (t.refresh(), t.setPosition(0, 0));
        1 >= l ? $("#f_trade_page").hide() : ($("#f_trade_page").show(), $("#f_trade_page_num").text(f + "/" + l), 1 >= f ? $("#f_trade_page_left").hide() : $("#f_trade_page_left").show(), f >= l ? $("#f_trade_page_right").hide() : $("#f_trade_page_right").show())
    }
    function a() {
        pnlLoading.show();
        var a = CONFIG.MYHOST + CONFIG.FUNC_MY_TRADE,
            b = {
                key: key,
                action: "list_auction_item",
                type: "",
                city: mainStatus.getCity().id,
                page: f
            };
        ajaxCall(a, b, function (a) {
            l = a.ret.max;
            i = a.ret.item;
            g()
        })
    }
    var t = null,
        u = $("#f_sample_html_script"),
        b = $(u.parent().get(0));
    b.bind("dispose", function () {
        null != t && (t.destroy(!1), t = null);
        Utils.removeCss("f_trade_css");
        b = null
    });
    var B = null,
        m = 1,
        C = 1,
        d = null,
        E = 1,
        o = 1,
        q = null,
        x = 1,
        j = 1,
        i = null,
        f = 1,
        l = 1;
    $("#f_sample_tab1").click(function () {
        $("#f_sample_tab1").hasClass("tab_inactive") && ($("#wrapper").removeClass("canvasbg"), $("#f_sample_tab1").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_trade_search").show(), $("#f_trade_my_title").hide(), $("#f_trade_sell_list").show(), $("#f_trade_start_list").hide(), $("#f_trade_my_list").hide(), $("#f_trade_my_list2").hide(), $("#wrapper").css("height", "225px"), m = 1, s());
        return !1
    });
    $("#f_sample_tab2").click(function () {
        $("#f_sample_tab2").hasClass("tab_inactive") && ($("#wrapper").addClass("canvasbg"), $("#f_sample_tab2").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_trade_search").hide(), $("#f_trade_my_title").show(), $("#f_trade_sell_list").hide(), $("#f_trade_start_list").show(), $("#f_trade_my_list").hide(), $("#f_trade_my_list2").hide(), $("#wrapper").css("height", "200px"), $("#f_sample_sub_tab1").hasClass("tab_active") ? (E = 1, v()) : $("#f_sample_sub_tab2").hasClass("tab_active") ? (x = 1, k()) : $("#f_sample_sub_tab3").hasClass("tab_active") && (f = 1, a()));
        return !1
    });
    $("#f_sample_sub_tab1").click(function () {
        $("#f_sample_sub_tab1").hasClass("tab_inactive") && ($("#f_sample_sub_tab1").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_trade_search").hide(), $("#f_trade_my_title").show(), $("#f_trade_sell_list").hide(), $("#f_trade_start_list").show(), $("#f_trade_my_list").hide(), $("#f_trade_my_list2").hide(), E = 1, v());
        return !1
    });
    $("#f_sample_sub_tab2").click(function () {
        $("#f_sample_sub_tab2").hasClass("tab_inactive") && ($("#f_sample_sub_tab2").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_trade_search").hide(), $("#f_trade_my_title").show(), $("#f_trade_sell_list").hide(), $("#f_trade_start_list").hide(), $("#f_trade_my_list").show(), $("#f_trade_my_list2").hide(), x = 1, k());
        return !1
    });
    $("#f_sample_sub_tab3").click(function () {
        $("#f_sample_sub_tab3").hasClass("tab_inactive") && ($("#f_sample_sub_tab3").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_trade_search").hide(), $("#f_trade_my_title").show(), $("#f_trade_sell_list").hide(), $("#f_trade_start_list").hide(), $("#f_trade_my_list").hide(), $("#f_trade_my_list2").show(), f = 1, a());
        return !1
    });
    $("#f_sample_close").click(function () {
        showCity();
        return !1
    });
    $("#f_trade_search_ok a").click(function () {
        m = 1;
        s();
        return !1
    });
    $("#f_trade_page_left").click(function () {
        $("#f_sample_tab1").hasClass("tab_active") ? 1 < m && (m--, s()) : $("#f_sample_tab2").hasClass("tab_active") && ($("#f_sample_sub_tab1").hasClass("tab_active") ? 1 < E && (E--, v()) : $("#f_sample_sub_tab2").hasClass("tab_active") ? 1 < x && (x--, k()) : $("#f_sample_sub_tab3").hasClass("tab_active") && 1 < f && (f--, a()));
        return !1
    });
    $("#f_trade_page_right").click(function () {
        $("#f_sample_tab1").hasClass("tab_active") ? m < C && (m++, s()) : $("#f_sample_tab2").hasClass("tab_active") && ($("#f_sample_sub_tab1").hasClass("tab_active") ? E < o && (E++, v()) : $("#f_sample_sub_tab2").hasClass("tab_active") ? x < j && (x++, k()) : $("#f_sample_sub_tab3").hasClass("tab_active") && f < l && (f++, a()));
        return !1
    });
    $("#content").css("background-image", "url(img/bg/view.jpg)");
    t = new iScroll("scroller", {
        desktopCompatibility: !0
    });
    s()
});