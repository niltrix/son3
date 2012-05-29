defineSubView("f_ally", function() {
	function v(a, g, w) {
		if(null != G)
			for(var f = 0; f < G.length; f++) {
				var o = G[f];
				if(o.id == a) {
					o.gpower = g;
					o.team = w;
					break
				}
			}
	}

	function s(a) {
		$("#f_all_team_apply_gid").val(a);
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY, {
			key : key,
			id : a
		}, function(a) {
			$("#f_ally_team_apply select").empty().unbind();
			for(var g = 0; g < a.ret.team.length; g++)
				$("#f_ally_team_apply select").append('<option value="f_ally_team_apply' + a.ret.team[g].id + '">' + a.ret.team[g].name + "</option>");
			$("#f_ally_team_apply").show();
			window.selectProxy.proxySelect($("#f_ally_team_apply select")[0])
		});
		return !1
	}

	function u(a, g) {
		if(1 == a)
			return h.title1;
		if(2 == a)
			return h.title2;
		var w;
		if(3 == g)
			w = h.title3;
		else if(4 == g)
			w = h.title4;
		else if(5 == g)
			w = h.title5;
		3 == a ? w += " " + LNG.GUILDTEAMLEADER : 4 == a ? w += " " + LNG.GUILDTEAMELITE : 5 == a && (w += " " + LNG.GUILDTEAMMEMBER);
		return w
	}

	function q() {
		pnlLoading.show();
		$("#f_ally_my_new_list").empty().unbind();
		null != A && $.each(A, function(a, g) {
			var w = '<div style="position:relative;height:30px;"><ul class="reshead" style="position: absolute; left: 0px; top: 0px"><li><input style="position:relative;top:0px;" id="f_ally_my_new_sel' + a + '" type="checkbox"/></li><li id="f_ally_my_new_selp' + a + '"><em class="race' + g.nation + '"></em><b>' + g.name + '</b></li><li><em class="lv"></em><b>' + g.level + '</b></li></ul><div class="font12" style="position: absolute; left: 170px; top: 8px"><strong>' + LNG.ALLY_TEAM + "</strong>&nbsp;<b>" + (3 == g.team ? h.title3 : 4 == g.team ? h.title4 : 5 == g.team ? h.title5 : "Unknown") + '</b></div><table class="font12" style="position: absolute; left: 300px; top: 0px;" cellpadding=0 cellspacing=0><tr><td valign="middle" height="30px" width="170px">' + g.info + "</td></tr></table></div>";
			$("#f_ally_my_new_list").append(w);
			$("#f_ally_my_new_selp" + a).click(function() {
				var g = "#f_ally_my_new_sel" + a;
				!0 == $(g).attr("checked") ? $(g).attr("checked", !1) : $(g).attr("checked", !0)
			})
		});
		$("#f_ally_page").hide();
		$("#f_ally_my_new_content").show();
		$("#f_ally_my_new_content_bts").show();
		$("#f_ally_my_new_content_bts").removeClass("minusbutton").addClass("plusbutton");
		$("#f_ally_my_new_content_op").hide();
		null != b && (b.refresh(), b.setPosition(0, 0));
		pnlLoading.hide()
	}

	function m(a) {
		$("#f_ally_my_member_func" + a).hide();
		$("#f_ally_my_member_disp" + a).removeClass("minusbutton").addClass("plusbutton");
		O = null
	}

	function i(a, g, w, f) {
		return a.gpower == g && a.team == w ? '<option value="' + f + '" selected>' + u(g, w) + "</option>" : '<option value="' + f + '">' + u(g, w) + "</option>"
	}

	function e() {
		pnlLoading.show();
		$("#f_ally_my_member_list").empty().unbind();
		null != G && $.each(G, function(a, g) {
			var w = "undefined" != typeof g.live && 0 == g.live ? ' style="color: #AFC7C7;"' : "", f = '<div style="position:relative;height:30px;"><ul class="reshead" style="position: absolute; left: 0px; top: 0px;"><li><b' + w + ">" + g.nick + '</b></li><li><em class="lv"></em><b' + w + ">" + g.level + "</b></li>";
			"undefined" != typeof g.pvp && (f += '<li><em class="pvp"></em><b' + w + ">" + g.pvp + "</b></li>");
			"undefined" != typeof g.on && 1 == g.on && (f += '<li><em style="background-image: url(img/bg/info.png); background-repeat: no-repeat; background-position: center center;"></em></li>');
			f += "</ul>";
			f = 2 < userinfo.gpower || 1 == g.gpower ? f + ('<div class="font12" style="position: absolute; left: 220px; top: 8px"><b>' + u(g.gpower, g.team) + "</b></div>") : f + ('<div id="f_ally_my_member_setrole' + g.id + '" class="font12" style="position: absolute; left: 220px; top: 8px"><img src="img/button/drop_down.png"/><b style="position:relative;top:-3px;">' + u(g.gpower, g.team) + "</b></div>");
			g.id != userinfo.id && (f += '<div class="plusbutton" id="f_ally_my_member_disp' + g.id + '" style="position: absolute; left: 420px; top: 0px;"></div><div id="f_ally_my_member_func' + g.id + '" style="position: absolute; left: 140px; top: 1px; display:none;">', 2 >= userinfo.gpower && 1 != g.gpower && (f += '<div id="f_ally_my_member_del' + g.id + '" class="funcbutton" style="position:absolute; left:0px;top:0px;">' + LNG.KICK_OUT + "</div>"), f += '<div class="funcbutton" style="position:absolute; left:70px;top:0px;" id="f_ally_my_member_fav' + g.id + '">' + LNG.ADD_FAV + '</div><div class="funcbutton" style="position:absolute; left:140px;top:0px;" id="f_ally_my_member_mail' + g.id + '">' + LNG.SEND_MAIL + '</div><div class="funcbutton" style="position:absolute; left:210px;top:0px;" id="f_ally_my_member_detail' + g.id + '">' + LNG.LORD_INFO + "</div></div>");
			f += '<div class="font12" style="position: absolute; left: 360px; top: 8px">' + g.rep + "</div>";
			$("#f_ally_my_member_list").append(f + "</div>");
			2 >= userinfo.gpower && 1 != g.gpower && $("#f_ally_my_member_setrole" + g.id).click(function() {
				var a = $("#f_ally_my_member_selrole p select");
				a.empty();
				1 == userinfo.gpower && a.append(i(g, 1, 1, "1"));
				a.append(i(g, 2, 2, "2"));
				for(var w = 3; 6 > w; w++) {
					a.append(i(g, 3, w, w.toString()));
					for(var f = 4; 6 > f; f++)
						a.append(i(g, f, w, w.toString() + f.toString()))
				}
				$("#f_ally_my_member_selrole_id").val(g.id);
				$("#f_ally_my_member_selrole p b").text(g.nick);
				if(b)
					b.enabled = !1;
				$("#f_ally_my_member_selrole").show();
				window.selectProxy.proxySelect($("#f_ally_my_member_selrole select")[0])
			});
			g.id != userinfo.id && ($("#f_ally_my_member_disp" + g.id).click(function() {
				if($("#f_ally_my_member_disp" + g.id).hasClass("plusbutton")) {
					var a = g.id;
					null != O && O != a && m(O);
					O = a;
					$("#f_ally_my_member_func" + a).show();
					$("#f_ally_my_member_disp" + a).removeClass("plusbutton").addClass("minusbutton")
				} else
					m(g.id);
				return !1
			}), $("#f_ally_my_member_detail" + g.id).click(function() {
				pnlLoading.show();
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETOTHERINFO, {
					key : key,
					id : g.id
				}, function(a) {
					showUserInfo(a.ret.user)
				});
				return !1
			}), $("#f_ally_my_member_mail" + g.id).click(function() {
				GlobalNav.WriteMail(g.nick);
				return !1
			}), $("#f_ally_my_member_fav" + g.id).click(function() {
				pnlLoading.show();
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
					key : key,
					nick : g.nick
				}, function(a) {
					showInfo(translate(LNG.ADDFAVDONE, a.ret.friend.nick))
				});
				return !1
			}), 2 >= userinfo.gpower && 1 != g.gpower && $("#f_ally_my_member_del" + g.id).click(function() {
				if(2 < userinfo.gpower || 1 == g.gpower)
					return showInfo(LNG.ERROR.CLIENT.NOTAUTHORIZED), !1;
				showConfirm(translate(LNG.GUILDDELCONFIRM, g.nick), function() {
					pnlLoading.show();
					ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
						key : key,
						delid : g.id
					}, function() {
						pnlLoading.show();
						ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
							key : key,
							page : F
						}, function(a) {
							G = a.ret.member;
							H = Math.ceil(h.guild.num / a.ret.size);
							e()
						});
						showInfo(LNG.SUCCESS)
					})
				});
				return !1
			}))
		});
		1 < H ? ($("#f_ally_page").show(), 1 >= F ? $("#f_ally_page_left").hide() : $("#f_ally_page_left").show(), F >= H ? $("#f_ally_page_right").hide() : $("#f_ally_page_right").show(), $("#f_ally_page_num").text(F + "/" + H)) : $("#f_ally_page").hide();
		$("#f_ally_my_member_list").show();
		null != b && (b.refresh(), b.setPosition(0, 0));
		pnlLoading.hide()
	}

	function a(a) {
		$("#f_ally_member_list_func" + a).hide();
		$("#f_ally_member_list_disp" + a).removeClass("minusbutton").addClass("plusbutton");
		f = null
	}

	function k() {
		pnlLoading.show();
		$("#f_ally_member_list_disp").empty().unbind();
		null != N && $.each(N, function(g, w) {
			var o = '<div style="position:relative;height:30px;"><ul class="reshead" style="position: absolute; left: 0px; top: 0px"><li><em class="race' + w.nation + '"></em><b>' + w.nick + '</b></li><li><em class="lv"></em><b>' + w.level + "</b></li></ul>", o = o + ('<div class="font12" style="position: absolute; left: 190px; top: 8px"><b>' + translate(w.role, LNG.GUILDTEAMLEADER) + "</b></div>"), o = o + ('<div class="plusbutton" id="f_ally_member_list_disp' + w.id + '" style="position: absolute; left: 420px; top: 0px;"></div><div id="f_ally_member_list_func' + w.id + '" style="position: absolute; left: 140px; top: 1px; display:none;">'), o = o + ('<div class="funcbutton" style="position:absolute; left:70px;top:0px;" id="f_ally_member_list_fav' + w.id + '">' + LNG.ADD_FAV + '</div><div class="funcbutton" style="position:absolute; left:140px;top:0px;" id="f_ally_member_list_mail' + w.id + '">' + LNG.SEND_MAIL + '</div><div class="funcbutton" style="position:absolute; left:210px;top:0px;" id="f_ally_member_list_detail' + w.id + '">' + LNG.LORD_INFO + "</div></div>");
			$("#f_ally_member_list_disp").append(o + "</div>");
			$("#f_ally_member_list_disp" + w.id).click(function() {
				if($("#f_ally_member_list_disp" + w.id).hasClass("plusbutton")) {
					var g = w.id;
					null != f && f != g && a(f);
					f = g;
					$("#f_ally_member_list_func" + g).show();
					$("#f_ally_member_list_disp" + g).removeClass("plusbutton").addClass("minusbutton")
				} else
					a(w.id);
				return !1
			});
			$("#f_ally_member_list_detail" + w.id).click(function() {
				pnlLoading.show();
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETOTHERINFO, {
					key : key,
					id : w.id
				}, function(a) {
					showUserInfo(a.ret.user)
				});
				return !1
			});
			$("#f_ally_member_list_mail" + w.id).click(function() {
				GlobalNav.WriteMail(w.nick);
				return !1
			});
			$("#f_ally_member_list_fav" + w.id).click(function() {
				pnlLoading.show();
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
					key : key,
					nick : w.nick
				}, function(a) {
					showInfo(translate(LNG.ADDFAVDONE, a.ret.friend.nick))
				});
				return !1
			})
		});
		g = $("#f_ally_page").is(":visible");
		$("#f_ally_page").hide();
		$("#f_ally_member_list").show();
		null != b && (b.refresh(), b.setPosition(0, 0));
		pnlLoading.hide()
	}

	function t(a) {
		$("#f_ally_list_more" + a).removeClass("minusbutton").addClass("plusbutton");
		$("#f_ally_list_info" + a).hide();
		$("#f_ally_apply" + a).hide();
		w = null
	}

	function c() {
		$("#f_ally_list_disp").empty().unbind();
		null != B && $.each(B, function(a, g) {
			var f = '<div class="font12" style="position:relative;height:55px"><ul class="reshead"><li><em class="guild" style="background-image:url(' + Utils.getFlag(g.flag) + ');"></em><b>' + g.name + '</b></li></ul><strong style="position:absolute; left:130px;top:8px;">' + g.num + "/" + g.max + '</strong><strong style="position:absolute;left:200px;top:8px;">' + g.score + '</strong><div style="position:absolute; left:6px;top:26px;height:30px;overflow:hidden;">' + g.intro + "</div>", f = 1 == g.state ? f + ('<strong style="position:absolute; left:300px;top:10px;">' + LNG.YES + "</strong>") : f + ('<strong style="position:absolute; left:300px;top:10px;">' + LNG.NO + "</strong>"), o = !1, f = f + ('<div id="f_ally_list_info' + g.id + '" class="funcbutton" style="left: 350px; top:2px; display:none;">' + LNG.ALLY_INFO + '</div><div id="f_ally_list_more' + g.id + '" class="plusbutton" style="left: 420px; top:1px;"></div>');
			0 == userinfo.guildid && 1 == g.state && g.num < g.max && ( o = !0, f += '<div id="f_ally_apply' + g.id + '" class="funcbutton" style="left: 270px; top:2px; display:none;">' + LNG.ALLY_APPLY + "</div>");
			$("#f_ally_list_disp").append(f + "</div>");
			$("#f_ally_list_more" + g.id).click(function() {
				if($("#f_ally_list_more" + g.id).hasClass("plusbutton")) {
					var a = g.id;
					null != w && w != a && t(w);
					w = a;
					$("#f_ally_list_more" + a).removeClass("plusbutton").addClass("minusbutton");
					$("#f_ally_list_info" + a).show();
					$("#f_ally_apply" + a).show()
				} else
					t(g.id);
				return !1
			});
			$("#f_ally_list_info" + g.id).click(function() {
				pnlLoading.show();
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
					key : key,
					id : g.id
				}, function(a) {
					N = a.ret.member;
					$("#f_ally_list").hide();
					$("#f_ally_member_list_title1").html('<ul class="reshead"><li><em class="guild" style="background-image:url(' + Utils.getFlag(g.flag) + ');"></em><b>' + g.name + "</b></li></ul>");
					k()
				});
				return !1
			});
			o && $("#f_ally_apply" + g.id).click(function() {
				return s(g.id)
			})
		});
		1 < l ? ($("#f_ally_page").show(), 1 >= x ? $("#f_ally_page_left").hide() : $("#f_ally_page_left").show(), x >= l ? $("#f_ally_page_right").hide() : $("#f_ally_page_right").show(), $("#f_ally_page_num").text(x + "/" + l)) : $("#f_ally_page").hide();
		null != b && (b.refresh(), b.setPosition(0, 0))
	}

	function z(a) {
		for(var a = a.split(","), g = "", w = 0; w < a.length; w++)
			g = "" == g ? a[w] : g + ('&nbsp;<font style="color:white">|</font>&nbsp;' + a[w]);
		return g
	}

	function p() {
		$("#f_ally_my_info_quota").text(h.quota[0] + "/" + h.quota[1]);
		$("#f_ally_my_info_cd").text(Utils.timeString2(h.quota[2]));
		$("#f_ally_my_info_flag").attr("src", Utils.getFlag(h.guild.flag));
		$("#f_ally_my_info_name").text(h.guild.name);
		$("#f_ally_my_info_score").text(h.guild.score);
		$("#f_ally_my_info_member").text(h.guild.num + "/" + h.guild.max);
		$("#f_ally_my_info_state").text(1 == h.guild.state ? LNG.GUILDOPEN : LNG.GUILDCLOSE);
		$("#f_ally_my_quit").text(1 == userinfo.gpower ? LNG.GUILDDISBAND : LNG.GUILDQUIT);
		$("#f_ally_my_info_intro").text(h.guild.intro);
		$("#f_ally_my_info_title1").text(h.title1);
		$("#f_ally_my_info_title2").text(h.title2);
		$("#f_ally_my_info_title3").text(h.title3 + " " + LNG.GUILDTEAMLEADER);
		$("#f_ally_my_info_title4").text(h.title4 + " " + LNG.GUILDTEAMLEADER);
		$("#f_ally_my_info_title5").text(h.title5 + " " + LNG.GUILDTEAMLEADER);
		$("#f_ally_my_info_name1").html(z(h.name1));
		null == h.name2 || "" == h.name2 ? $("#f_ally_my_info_name2").html("N/A") : $("#f_ally_my_info_name2").html(z(h.name2));
		null == h.name3 || "" == h.name3 ? $("#f_ally_my_info_name3").html("N/A") : $("#f_ally_my_info_name3").html(z(h.name3));
		null == h.name4 || "" == h.name4 ? $("#f_ally_my_info_name4").html("N/A") : $("#f_ally_my_info_name4").html(z(h.name4));
		null == h.name5 || "" == h.name5 ? $("#f_ally_my_info_name5").html("N/A") : $("#f_ally_my_info_name5").html(z(h.name5));
		null != b && (b.refresh(), b.setPosition(0, 0))
	}

	function C() {
		null == h || I ? ( I = !1, pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
			key : key
		}, function(a) {
			h = a.ret;
			p()
		})) : p()
	}

	function d() {
		null == B ? (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY, {
			key : key,
			page : x
		}, function(a) {
			pnlLoading.show();
			B = a.ret.guild;
			l = a.ret.max;
			c();
			pnlLoading.hide()
		})) : c()
	}

	function D() {
		$("#f_ally_tech_info_progress").hide();
		$("#f_ally_tech_info_no_active").hide();
		$("#f_ally_tech_info_req").hide();
		$("#f_ally_tech_info_donate").hide();
		$("#f_ally_tech_info_activate").hide();
		$("#f_ally_tech_info_cd1").hide();
		if(L) {
			$("#f_ally_tech_info_level").text(L[0]);
			$("#f_ally_tech_info_progress b").text(L[1]);
			$("#f_ally_tech_info_progress span").text(L[3]);
			var a = Utils.parseInt(L[3], 0);
			0 < a ? $("#f_ally_tech_info_progress label").text(Math.floor(100 * L[1] / a)) : $("#f_ally_tech_info_progress label").text("0");
			$("#f_ally_tech_info_progress").show();
			0 < L[4] ? ($("#f_ally_tech_info_cd1").text(Utils.timeString2(L[4])), $("#f_ally_tech_info_cd1").show()) : $("#f_ally_tech_info_donate").show()
		}
	}

	function r() {
		var a = LNG.ALLY_TECH[K], g = M[5][K - 1];
		$("#f_ally_tech_info_title").text(a.name);
		$("#f_ally_tech_info_level").text(g[1]);
		$("#f_ally_tech_info_desc").text(a.desc);
		0 == g[0] && 5 > g[1] ? (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
			key : key,
			op : "techinfo",
			techid : K
		}, function(a) {
			L = a.ret;
			D()
		})) : ($("#f_ally_tech_info_progress").hide(), $("#f_ally_tech_info_no_active").hide(), $("#f_ally_tech_info_req").hide(), $("#f_ally_tech_info_donate").hide(), $("#f_ally_tech_info_activate").hide(), $("#f_ally_tech_info_cd1").hide(), 1 == g[0] ? ($("#f_ally_tech_info_no_active").show(), (1 == userinfo.gpower || 2 == userinfo.gpower) && $("#f_ally_tech_info_activate").show()) : 2 == g[0] && ($("#f_ally_tech_info_req span").text(a.req), $("#f_ally_tech_info_req").show()));
		$("#f_ally_tech_info").show()
	}

	function n() {
		if(null != M) {
			$("#f_ally_my_hall_level").text(M[0]);
			$("#f_ally_my_hall_resgold b").text(M[1] + "/" + M[2]);
			var a = Utils.parseInt(M[2], 0);
			0 < a ? $("#f_ally_my_hall_percent").text(Math.floor(100 * M[1] / a)) : $("#f_ally_my_hall_percent").text("0");
			0 < M[4] ? ($("#f_ally_my_hall_cd1 p").text(Utils.timeString2(M[4])), $("#f_ally_my_hall_upgrade").hide()) : $("#f_ally_my_hall_upgrade").show()
		}
		for( a = 1; a <= M[5].length; a++) {
			var g = M[5][a - 1];
			0 == g[0] ? ($("#f_ally_my_hall_t" + a + "_level b").text(g[1]), $("#f_ally_my_hall_t" + a + "_level").show()) : $("#f_ally_my_hall_t" + a + "_level").hide();
			0 < g[2] || 5 <= g[1] ? $("#f_ally_my_hall_t" + a + " p").css("color", "white") : $("#f_ally_my_hall_t" + a + " p").css("color", LNG.ALLY_TECH_STATUS[g[0]].color)
		}
	}

	function y(a, g, w) {
		function f() {
			var b = Math.ceil(Math.pow(l, 1.5)), b = b > J ? J : b, b = o + g * b;
			0 < g && b > w || 0 > g && b < w ? ( T = !1, clearInterval(P), a.value = w) : a.value = b;
			l++
		}

		T = !0;
		var o = Utils.parseInt(a.value, 0), J = Math.abs(w - o), l = 1;
		f();
		1 < J && setTimeout(function() {
			clearInterval(P);
			T && ( P = setInterval(f, 100))
		}, 300)
	}

	function j() {
		T = !1;
		clearInterval(P);
		timer = null
	}

	var b = null, h = null, A = null, B = null, x = 1, l = 0, E = $("#f_sample_html_script"), o = $(E.parent().get(0));
	o.bind("dispose", function() {
		null != b && (b.destroy(!1), b = null);
		window.selectProxy.clearProxy($("#f_ally_my_member_selrole select")[0]);
		o.unbind("dispose", arguments.callee);
		o = null
	});
	var G = null, F = 1, H = 0, I = !1, O = null, f = null, N = null, g = !1, w = null;
	$("#f_ally_my_new_content_bts").click(function() {
		$("#f_ally_my_new_content_bts").hasClass("plusbutton") ? ($("#f_ally_my_new_content_bts").removeClass("plusbutton").addClass("minusbutton"), $("#f_ally_my_new_content_op").show()) : ($("#f_ally_my_new_content_bts").removeClass("minusbutton").addClass("plusbutton"), $("#f_ally_my_new_content_op").hide())
	});
	$("#f_sample_tab1").click(function() {
		$("#f_sample_tab1").hasClass("tab_inactive") && ($("#wrapper").css("height", "225px"), $("#f_sample_tab1").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_search").show(), $("#f_ally_list").show(), $("#f_ally_create").hide(), $("#f_ally_my").hide(), $("#f_ally_my_info_content").hide(), $("#f_ally_my_set_content").hide(), $("#f_ally_my_member_content").hide(), $("#f_ally_my_new_content").hide(), $("#f_ally_my_new_content_bts").hide(), $("#f_ally_my_new_content_op").hide(), $("#f_ally_page").hide(), $("#f_ally_my_hall_info").hide(), d());
		return !1
	});
	$("#f_sample_tab2").click(function() {
		$("#f_sample_tab2").hasClass("tab_inactive") && ($("#wrapper").css("height", "200px"), $("#f_sample_tab2").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_info_content").show(), $("#f_ally_my").show(), $("#f_ally_my_set_content").hide(), $("#f_ally_my_member_content").hide(), $("#f_ally_my_new_content").hide(), $("#f_ally_my_new_content_bts").hide(), $("#f_ally_my_new_content_op").hide(), $("#f_ally_search").hide(), $("#f_ally_my_info").removeClass("tab_inactive").addClass("tab_active"), $("#f_ally_my_member").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_new").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_set").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_hall").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_list").hide(), $("#f_ally_member_list").hide(), $("#f_ally_page").hide(), 0 != userinfo.guildid ? ($("#f_ally_create").hide(), $("#f_ally_my").show(), 2 < userinfo.gpower && ($("#f_ally_my_set").hide(), 3 < userinfo.gpower && $("#f_ally_my_new").hide()), C()) : ($("#f_ally_create").show(), $("#f_ally_my").hide()));
		return !1
	});
	$("#f_sample_close").click(function() {
		$("#f_ally_member_list").is(":visible") ? ($("#f_ally_member_list").hide(), $("#f_ally_list").show(), g && $("#f_ally_page").show(), null != b && (b.refresh(), b.setPosition(0, 0))) : showCity();
		return !1
	});
	var J = 1;
	$("#f_ally_create_flag_left").click(function() {
		1 < J ? J-- : J = 127;
		$("#f_ally_create_flag").attr("src", Utils.getFlag(J));
		return !1
	});
	$("#f_ally_create_flag_right").click(function() {
		127 > J ? J++ : J = 1;
		$("#f_ally_create_flag").attr("src", Utils.getFlag(J));
		return !1
	});
	$("#f_ally_my_set_flag_left").click(function() {
		1 < J ? J-- : J = 127;
		$("#f_ally_my_set_flag").attr("src", Utils.getFlag(J));
		return !1
	});
	$("#f_ally_my_set_flag_right").click(function() {
		127 > J ? J++ : J = 1;
		$("#f_ally_my_set_flag").attr("src", Utils.getFlag(J));
		return !1
	});
	$("#f_ally_create_confirm").click(function() {
		if(0 == userinfo.guildid) {
			var a = encodeURIComponent(Utils.trim($("#f_ally_create_name").val()));
			if(null == a || "" == a)
				return showInfo(LNG.ERROR.CLIENT.EMPTYALLYNAME), !1;
			var g = Utils.trim($("#f_ally_create_intro").val());
			180 < g.length && ( g = g.substr(0, 180));
			g = encodeURIComponent(g);
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_CREATE, {
				key : key,
				name : a,
				flag : J,
				info : g
			}, function(a) {
				h = a.ret;
				userinfo.guildid = h.guild.id;
				userinfo.guild = h.guild.name;
				userinfo.gpower = 1;
				userinfo.gflag = h.guild.flag;
				refreshUserInfo();
				C();
				$("#f_sample_tab2 a").text(LNG.GUILDTITLEMY);
				$("#f_ally_create").hide();
				$("#f_ally_my").show()
			})
		}
		return !1
	});
	$("#f_ally_search_bt").click(function() {
		pnlLoading.show();
		x = 1;
		var a = encodeURIComponent(Utils.trim($("#f_ally_name").val())), g = CONFIG.MYHOST + CONFIG.FUNC_ALLY;
		null != a && "" != a ? ajaxCall(g, {
			key : key,
			page : x,
			name : a
		}, function(a) {
			B = a.ret.guild;
			l = a.ret.max;
			c()
		}) : ajaxCall(g, {
			key : key,
			page : x
		}, function(a) {
			B = a.ret.guild;
			l = a.ret.max;
			c()
		});
		return !1
	});
	$("#f_ally_page_left").click(function() {
		if($("#f_sample_tab1").hasClass("tab_active"))
			if(1 < x) {
				pnlLoading.show();
				x -= 1;
				var a = encodeURIComponent(Utils.trim($("#f_ally_name").val())), g = CONFIG.MYHOST + CONFIG.FUNC_ALLY;
				null != a && "" != a ? ajaxCall(g, {
					key : key,
					page : x,
					name : a
				}, function(a) {
					B = a.ret.guild;
					l = a.ret.max;
					c()
				}) : ajaxCall(g, {
					key : key,
					page : x
				}, function(a) {
					B = a.ret.guild;
					l = a.ret.max;
					c()
				})
			} else
				$("#f_ally_page_left").hide();
		else
			$("#f_ally_my_member").hasClass("tab_active") && 1 < F && (F -= 1, pnlLoading.show(), g = CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, ajaxCall(g, {
				key : key,
				page : F
			}, function(a) {
				G = a.ret.member;
				H = Math.ceil(h.guild.num / a.ret.size);
				e()
			}));
		return !1
	});
	$("#f_ally_page_right").click(function() {
		if($("#f_sample_tab1").hasClass("tab_active"))
			if(x < l) {
				pnlLoading.show();
				x += 1;
				var a = encodeURIComponent(Utils.trim($("#f_ally_name").val())), g = CONFIG.MYHOST + CONFIG.FUNC_ALLY;
				null != a && "" != a ? ajaxCall(g, {
					key : key,
					page : x,
					name : a
				}, function(a) {
					B = a.ret.guild;
					l = a.ret.max;
					c()
				}) : ajaxCall(g, {
					key : key,
					page : x
				}, function(a) {
					B = a.ret.guild;
					l = a.ret.max;
					c()
				})
			} else
				$("#f_ally_page_right").hide();
		else
			$("#f_ally_my_member").hasClass("tab_active") && F < H && (F += 1, pnlLoading.show(), g = CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, ajaxCall(g, {
				key : key,
				page : F
			}, function(a) {
				G = a.ret.member;
				H = Math.ceil(h.guild.num / a.ret.size);
				e()
			}));
		return !1
	});
	$("#f_ally_my_info").click(function() {
		$("#f_ally_my_info").hasClass("tab_inactive") && ($("#f_ally_my_hall").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_info").removeClass("tab_inactive").addClass("tab_active"), $("#f_ally_my_member").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_new").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_set").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_page").hide(), $("#f_ally_my_set_content").hide(), $("#f_ally_my_member_content").hide(), $("#f_ally_my_new_content").hide(), $("#f_ally_my_new_content_bts").hide(), $("#f_ally_my_new_content_op").hide(), $("#f_ally_my_info_content").show(), $("#f_ally_my_quit").show(), $("#f_ally_my_mail").hide(), $("#f_ally_my_hall_info").hide(), C());
		return !1
	});
	$("#f_ally_my_member").click(function() {
		$("#f_ally_my_member").hasClass("tab_inactive") && ($("#f_ally_my_hall").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_member").removeClass("tab_inactive").addClass("tab_active"), $("#f_ally_my_info").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_new").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_set").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_set_content").hide(), $("#f_ally_my_member_content").show(), $("#f_ally_my_new_content").hide(), $("#f_ally_my_new_content_bts").hide(), $("#f_ally_my_new_content_op").hide(), $("#f_ally_my_info_content").hide(), $("#f_ally_my_quit").hide(), $("#f_ally_my_mail").show(), $("#f_ally_my_hall_info").hide(), pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
			key : key,
			page : F
		}, function(a) {
			G = a.ret.member;
			H = Math.ceil(h.guild.num / a.ret.size);
			e()
		}), null != b && (b.refresh(), b.setPosition(0, 0)));
		return !1
	});
	$("#f_ally_my_new").click(function() {
		$("#f_ally_my_new").hasClass("tab_inactive") && ($("#f_ally_my_hall").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_new").removeClass("tab_inactive").addClass("tab_active"), $("#f_ally_my_member").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_info").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_set").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_set_content").hide(), $("#f_ally_my_member_content").hide(), $("#f_ally_my_new_content").show(), $("#f_ally_my_new_content_bts").show(), $("#f_ally_my_new_content_op").hide(), $("#f_ally_my_info_content").hide(), $("#f_ally_my_quit").hide(), $("#f_ally_my_mail").hide(), $("#f_ally_my_hall_info").hide(), pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
			key : key,
			act : 3
		}, function(a) {
			A = a.ret.app;
			q()
		}), null != b && (b.refresh(), b.setPosition(0, 0)));
		return !1
	});
	var K = 0, L = null;
	$("#f_ally_my_hall_t1_info").click(function() {
		K = 1;
		r()
	});
	$("#f_ally_my_hall_t2_info").click(function() {
		K = 2;
		r()
	});
	$("#f_ally_my_hall_t3_info").click(function() {
		K = 3;
		r()
	});
	$("#f_ally_my_hall_t4_info").click(function() {
		K = 4;
		r()
	});
	$("#f_ally_my_hall_t5_info").click(function() {
		K = 5;
		r()
	});
	$("#f_ally_my_hall_t6_info").click(function() {
		K = 6;
		r()
	});
	$("#f_ally_my_hall_t7_info").click(function() {
		K = 7;
		r()
	});
	$("#f_ally_my_hall_t8_info").click(function() {
		K = 8;
		r()
	});
	$("#f_ally_my_hall_t9_info").click(function() {
		K = 9;
		r()
	});
	$("#f_ally_my_hall_t10_info").click(function() {
		K = 10;
		r()
	});
	$("#f_ally_my_hall_t11_info").click(function() {
		K = 11;
		r()
	});
	$("#f_ally_my_hall_t12_info").click(function() {
		K = 12;
		r()
	});
	$("#f_ally_my_hall_t13_info").click(function() {
		K = 13;
		r()
	});
	$("#f_ally_my_hall_t14_info").click(function() {
		K = 14;
		r()
	});
	$("#f_ally_my_hall_t15_info").click(function() {
		K = 15;
		r()
	});
	$("#f_ally_my_hall_t16_info").click(function() {
		K = 16;
		r()
	});
	$("#f_ally_my_hall_t17_info").click(function() {
		K = 17;
		r()
	});
	$("#f_ally_my_hall_t18_info").click(function() {
		K = 18;
		r()
	});
	$("#f_ally_my_hall_t19_info").click(function() {
		K = 19;
		r()
	});
	$("#f_ally_my_hall_t20_info").click(function() {
		K = 20;
		r()
	});
	$("#f_ally_tech_info_donate").click(function() {
		$("#f_ally_donate_title p").text($("#f_ally_tech_info_title").text());
		$("#f_num_input").val(S);
		var a = 100 * Math.floor(mainStatus.CITY_INFO[2] / 100);
		Q = L[2] < a ? L[2] : a;
		U = 2;
		$("#f_ally_donate").show()
	});
	$("#f_ally_tech_info_activate").click(function() {
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
			key : key,
			op : "techcost",
			techid : K
		}, function(a) {
			$("#f_ally_tech_info").hide();
			a = translate(LNG.CONFIRMBUY, $("#f_ally_tech_info_title").text(), a.ret[0]);
			showConfirm(a, function() {
				pnlLoading.show();
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
					key : key,
					op : "activate",
					city : mainStatus.getCity().id,
					techid : K
				}, function() {
					M[5][K-1][0] = 0;
					n();
					showInfo(LNG.SUCCESS)
				})
			})
		})
	});
	$("#f_ally_tech_info_close").click(function() {
		$("#f_ally_tech_info").hide()
	});
	var M = null;
	$("#f_ally_my_hall").click(function() {
		$("#f_ally_my_hall").hasClass("tab_inactive") && ($("#f_ally_my_hall").removeClass("tab_inactive").addClass("tab_active"), $("#f_ally_my_member").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_new").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_info").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_set").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_set_content").hide(), $("#f_ally_my_member_content").hide(), $("#f_ally_my_new_content").hide(), $("#f_ally_my_new_content_bts").hide(), $("#f_ally_my_new_content_op").hide(), $("#f_ally_my_info_content").hide(), $("#f_ally_my_quit").hide(), $("#f_ally_my_mail").hide(), $("#f_ally_page").hide(), $("#f_ally_my_hall_info").show(), null != b && (b.refresh(), b.setPosition(0, 0)), pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
			key : key,
			op : "info"
		}, function(a) {
			M = a.ret;
			n()
		}));
		return !1
	});
	var S = 100, Q = 0, P = null, T = !1, V = o.find("#f_num").find("input").get(0);
	o.find("#f_num_minus").unbind();
	o.find("#f_num_minus").bind("mousedown touchstart", function() {
		j();
		y(V, -100, S)
	});
	o.find("#f_num_minus").bind("mouseup touchend", function() {
		j()
	});
	o.find("#f_num_plus").unbind();
	o.find("#f_num_plus").bind("mousedown touchstart", function() {
		j();
		y(V, 100, Q)
	});
	o.find("#f_num_plus").bind("mouseup touchend", function() {
		j()
	});
	o.find("#f_num_max").unbind().click(function() {
		j();
		V.value = Q
	});
	$("#f_ally_my_hall_upgrade").click(function() {
		$("#f_ally_donate_title p").text($("#f_ally_my_hall_title").text());
		$("#f_num_input").val(S);
		var a = 100 * Math.floor(mainStatus.CITY_INFO[2] / 100);
		Q = M[3] < a ? M[3] : a;
		U = 1;
		$("#f_ally_donate").show()
	});
	$("#f_ally_donate_cancel").click(function() {
		$("#f_ally_donate").hide()
	});
	var U = 1;
	$("#f_ally_donate_confirm").click(function() {
		var a = Utils.parseInt(o.find("#f_num input").val(), 0), g = Math.min(a, Q), g = Math.max(g, S);
		g != a ? (o.find("#f_num input").val(g), o.find("#f_num input").css({
			"background-color" : "red"
		}), setTimeout(function() {
			o.find("#f_num input").css({
				"background-color" : "white"
			})
		}, 500)) : (pnlLoading.show(), 1 == U ? ( g = CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, ajaxCall(g, {
			key : key,
			op : "donate",
			num : a,
			city : mainStatus.getCity().id
		}, function(a) {
			M = a.ret;
			n();
			$("#f_ally_donate").hide();
			showInfo(LNG.SUCCESS)
		})) : 2 == U && ( g = CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, ajaxCall(g, {
			key : key,
			op : "tdonate",
			num : a,
			techid : K,
			city : mainStatus.getCity().id
		}, function(a) {
			M = a.ret[0];
			n();
			L = a.ret[1];
			D();
			$("#f_ally_donate").hide();
			showInfo(LNG.SUCCESS)
		})))
	});
	$("#f_ally_my_set").click(function() {
		if($("#f_ally_my_set").hasClass("tab_inactive"))
			$("#f_ally_my_hall").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_set").removeClass("tab_inactive").addClass("tab_active"), $("#f_ally_my_member").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_new").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_info").removeClass("tab_active").addClass("tab_inactive"), $("#f_ally_my_set_content").show(), $("#f_ally_my_member_content").hide(), $("#f_ally_my_new_content").hide(), $("#f_ally_my_new_content_bts").hide(), $("#f_ally_my_new_content_op").hide(), $("#f_ally_my_info_content").hide(), $("#f_ally_my_quit").hide(), $("#f_ally_my_mail").hide(), $("#f_ally_my_hall_info").hide(), J = h.guild.flag, $("#f_ally_my_set_flag").attr("src", Utils.getFlag(J)), $("#f_ally_my_set_name strong").text(h.guild.name), $("#f_ally_my_set_info").val(h.guild.intro), $("#f_ally_my_set_state").attr("checked", 1 == h.guild.state), $("#f_ally_my_set_title1").val(h.title1), $("#f_ally_my_set_title2").val(h.title2), $("#f_ally_my_set_title3").val(h.title3), $("#f_ally_my_set_title4").val(h.title4), $("#f_ally_my_set_title5").val(h.title5);
		return !1
	});
	$("#f_ally_my_mail").click(function() {
		GlobalNav.WriteMail(":ally");
		return !1
	});
	$("#f_ally_my_quit").click(function() {
		0 != userinfo.guildid && (1 == userinfo.gpower ? showConfirm(LNG.GUILDDISBANDCONFIRM, function() {
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_CREATE, {
				key : key,
				id : userinfo.guildid
			}, function() {
				h = null;
				userinfo.guildid = 0;
				userinfo.guild = null;
				userinfo.gpower = 0;
				userinfo.gflag = 0;
				refreshUserInfo();
				$("#f_sample_tab2").text(LNG.GUILDTITLECREATE);
				$("#f_ally_create").show();
				$("#f_ally_my").hide()
			})
		}) : showConfirm(LNG.GUILDQUITCONFIRM, function() {
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
				key : key,
				delid : userinfo.id
			}, function() {
				h = null;
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
	$("#f_ally_team_apply_cancel").click(function() {
		$("#f_ally_team_apply").hide();
		return !1
	});
	$("#f_ally_team_apply_confirm").click(function() {
		var a = $("#f_ally_team_apply select option:selected").val().substr(17), g = encodeURIComponent(Utils.trim($("#f_ally_team_apply input").val())), w = $("#f_all_team_apply_gid").val();
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY, {
			key : key,
			id : w,
			tid : a,
			info : g
		}, function() {
			$("#f_ally_team_apply").hide();
			showInfo(LNG.GUILDAPPLYSENT)
		});
		return !1
	});
	$("#f_ally_my_set_save").click(function() {
		var a = Utils.trim($("#f_ally_my_set_info").val());
		180 < a.length && ( a = a.substr(0, 180));
		var a = encodeURIComponent(a), g = 2;
		!0 == $("#f_ally_my_set_state").attr("checked") && ( g = 1);
		var w = Utils.trim($("#f_ally_my_set_title1").val()), f = Utils.trim($("#f_ally_my_set_title2").val()), o = Utils.trim($("#f_ally_my_set_title3").val()), b = Utils.trim($("#f_ally_my_set_title4").val()), l = Utils.trim($("#f_ally_my_set_title5").val());
		if("" == w || "" == f || "" == o || "" == b || "" == l)
			return showInfo(LNG.ERROR.CLIENT.EMPTYALLYTITLE), !1;
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
			key : key,
			flag : J,
			state : g,
			info : a,
			title1 : encodeURIComponent(w),
			title2 : encodeURIComponent(f),
			title3 : encodeURIComponent(o),
			title4 : encodeURIComponent(b),
			title5 : encodeURIComponent(l)
		}, function() {
			h.guild.flag = J;
			h.guild.state = g;
			h.guild.info = a;
			h.title1 = w;
			h.title2 = f;
			h.title3 = o;
			h.title4 = b;
			h.title5 = l;
			showInfo(LNG.SETDONE)
		});
		return !1
	});
	$("#f_ally_my_new_accept").click(function() {
		for(var a = null, g = 0, w = [], f = 0; f < A.length; f++)
			!0 == $("#f_ally_my_new_sel" + f).attr("checked") && ( a = null == a ? A[f].id : a + ("," + A[f].id), w[g] = f - g, g++);
		0 < g ? h.num + g > h.max ? showInfo(LNG.ERROR.CLIENT.EXCEEDGUILDMAX) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
			key : key,
			ids : a,
			act : 1
		}, function(a) {
			h.num = a.ret.num;
			for( a = 0; a < w.length; a++)
				A.splice(w[a], 1);
			q();
			showInfo(LNG.SUCCESS)
		})) : showInfo(LNG.ERROR.CLIENT.EMPTYSELECTION);
		return !1
	});
	$("#f_ally_my_new_reject").click(function() {
		for(var a = null, g = 0, w = [], f = 0; f < A.length; f++)
			!0 == $("#f_ally_my_new_sel" + f).attr("checked") && ( a = null == a ? A[f].id : a + ("," + A[f].id), w[g] = f - g, g++);
		0 < g ? (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
			key : key,
			ids : a,
			act : 2
		}, function() {
			for(var a = 0; a < w.length; a++)
				A.splice(w[a], 1);
			q();
			showInfo(LNG.SUCCESS)
		})) : showInfo(LNG.ERROR.CLIENT.EMPTYSELECTION);
		return !1
	});
	$("#f_ally_my_member_selrole_cancel").click(function() {
		$("#f_ally_my_member_selrole").hide();
		if(b)
			b.enabled = !0
	});
	$("#f_ally_my_member_selrole_confirm").click(function() {
		if(2 < userinfo.gpower)
			return showInfo(LNG.ERROR.CLIENT.NOTAUTHORIZED), !1;
		var a = $("#f_ally_my_member_selrole_id").val(), g = $("#f_ally_my_member_selrole p select").val();
		1 == g ? 1 != userinfo.gpower ? showInfo(LNG.ERROR.CLIENT.NOTAUTHORIZED) : showConfirm(LNG.GUILDTRANSFERCONFIRM, function() {
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
				key : key,
				transid : a
			}, function() {
				userinfo.gpower = 5;
				refreshUserInfo();
				$("#f_ally_my_new").hide();
				$("#f_ally_my_set").hide();
				pnlLoading.show();
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
					key : key,
					page : F
				}, function(a) {
					G = a.ret.member;
					H = Math.ceil(h.guild.num / a.ret.size);
					e()
				});
				$("#f_ally_my_member_selrole").hide();
				if(b)
					b.enabled = !0;
				showInfo(LNG.SUCCESS)
			})
		}) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ALLY_MY, {
			key : key,
			uid : a,
			gpower : g
		}, function() {
			2 == g ? v(a, 2, 2) : 10 > g ? v(a, 3, g) : v(a, g % 10, Math.floor(g / 10));
			I = !0;
			e();
			$("#f_ally_my_member_selrole").hide();
			if(b)
				b.enabled = !0;
			showInfo(LNG.SUCCESS)
		}));
		return !1
	});
	$("#content").css("background-image", "url(img/bg/view.jpg)");
	null != statinfo && "undefined" != typeof statinfo.he && 1 == statinfo.he && ($("#f_ally_my_hall").show(), $("#f_ally_my_set").css("left", "216px"), $("#f_ally_my_new").css("left", "288px"), Utils.loadImage2($("#f_ally_my_hall_info").find('img[name="f_ally_my_hall_arrow"]'), "img/button/arrow_g.png"));
	0 == userinfo.guildid ? ($("#f_sample_tab2").text(LNG.GUILDTITLECREATE), d()) : ($("#f_sample_tab2").text(LNG.GUILDTITLEMY), $("#f_sample_tab2").click());
	b = new iScroll("scroller", {
		desktopCompatibility : !0
	})
});
defineSubView("f_chat", function() {
	function v() {
		e.unbind("newchatmsg", arguments.callee);
		null != q && (q.destroy(!1), q = null);
		null != m && (m.destroy(!1), m = null)
	}

	function s(a, d) {
		var e = "f_chat_msg" + a.line_id;
		if(0 == a.from_id)
			$("#scroller2").append('<p style="overflow:hidden;" id="' + e + '">' + a.line_txt + "</p>");
		else {
			var i = LNG.CHATCHANNEL[a.target_type], n = "", y = !1, j = '<span id="from_' + e + '">' + a.from_name + "</span>";
			null != userinfo && userinfo.id == a.from_id ? j = a.from_name : "undefined" != typeof a.m && (1 == a.m ? n = '&nbsp;[<span id="unmute_' + e + '">' + LNG.UNMUTE + "</span>]" : ( n = '&nbsp;[<span id="mute_' + e + '">' + LNG.MUTE + "</span>]", y = !0));
			var b = "";
			"undefined" != typeof a.ico && null != a.ico && "" != a.ico && ( b = '<img src="img/' + a.ico + '"/>');
			0 == a.target_type ? $("#scroller").append('<p style="color:#81F781;" id="' + e + '">[' + i + "]&nbsp;" + b + j + n + ":&nbsp;" + a.line_txt + "</p>") : 1 == a.target_type ? $("#scroller").append('<p style="color:#F5A9F2;" id="' + e + '">[' + i + "]&nbsp;" + b + j + n + ":&nbsp;" + a.line_txt + "</p>") : $("#scroller").append('<p id="' + e + '">[' + i + "]&nbsp;" + b + j + n + ":&nbsp;" + a.line_txt + "</p>");
			j != a.from_name && ($("#from_" + e).click(function() {
				c = chatmsg[d].from_id;
				z = chatmsg[d].from_name;
				$("#f_chat_userop p").html(translate(LNG.USEROP, z));
				$("#f_chat_userop").show();
				return !1
			}), "" != n && ( y ? $("#mute_" + e).click(function() {
				showConfirm(translate(LNG.CHAT_MUITE_CONFIRM, a.from_name), function() {
					pnlLoading.show();
					var b = ":mute " + a.from_name;
					ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CHAT, {
						key : key,
						txt : b
					}, function() {
						$("#f_chat_space").remove();
						s({
							line_id : 0,
							from_id : userinfo.id,
							from_name : userinfo.nick,
							target_type : 0,
							target_id : 0,
							line_txt : b
						}, 0);
						$("#scroller").append('<p id="f_chat_space" style="height:20px;"></p>');
						q.refresh();
						q.scrollToElement("#f_chat_space")
					})
				});
				return !1
			}) : $("#unmute_" + e).click(function() {
				showConfirm(translate(LNG.CHAT_UNMUITE_CONFIRM, a.from_name), function() {
					pnlLoading.show();
					var b = ":unmute " + a.from_name;
					ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CHAT, {
						key : key,
						txt : b
					}, function() {
						$("#f_chat_space").remove();
						s({
							line_id : 0,
							from_id : userinfo.id,
							from_name : userinfo.nick,
							target_type : 0,
							target_id : 0,
							line_txt : b
						}, 0);
						$("#scroller").append('<p id="f_chat_space" style="height:20px;"></p>');
						q.refresh();
						q.scrollToElement("#f_chat_space")
					})
				});
				return !1
			})))
		}
		return e
	}

	function u() {
		$("#scroller").empty().unbind();
		$("#scroller2").empty().unbind();
		null != chatmsg && 0 < chatmsg.length && ($.each(chatmsg, function(a, c) {
			(0 == t || t == c.target_type) && s(c, a)
		}), $("#scroller2").append('<p id="f_chat_space2" style="height:8px;"></p>'), m.refresh(), m.scrollToElement("#f_chat_space2"), $("#scroller").append('<p id="f_chat_space" style="height:20px;"></p>'), q.refresh(), -1 == p ? (p++, q.scrollToElement("#f_chat_space"), setTimeout(u, 100)) : 0 == p ? (p++, q.scrollToElement("#f_chat_space")) : q.y < q.maxScrollY + 30 && q.scrollToElement("#f_chat_space"))
	}

	var q = null, m = null, i = $("#f_chat_html_script"), e = $(i.parent().get(0)), a = EMA.getProxy();
	e.bind("dispose", function() {
		v();
		a.dispose();
		e = a = null
	});
	$("#f_chat_sync_sel").change(function() {
		$("#f_chat_sync_sel").attr("checked") ? Utils.setCookie("chat_sync", 1) : Utils.delCookie("chat_sync")
	});
	var k = 0, t = 0, c = 0, z = null, p = -1;
	$("#f_chat_channel_select").hide();
	$("#f_chat_userop").hide();
	$("#f_chat_tab_all").click(function() {
		0 != t && ($("#f_chat_tab_all").removeClass("tab_inactive").addClass("tab_active"), $("#f_chat_tab_alliance").removeClass("tab_active").addClass("tab_inactive"), $("#f_chat_tab_private").removeClass("tab_active").addClass("tab_inactive"), t = 0, u(), $("#f_chat_sync_sel").attr("checked") && ( k = 0, $("#f_chat_mychannel p").text($("#f_chat_channel_select_world").text())), q.scrollToElement("#f_chat_space"));
		return !1
	});
	$("#f_chat_tab_alliance").click(function() {
		1 != t && ($("#f_chat_tab_alliance").removeClass("tab_inactive").addClass("tab_active"), $("#f_chat_tab_all").removeClass("tab_active").addClass("tab_inactive"), $("#f_chat_tab_private").removeClass("tab_active").addClass("tab_inactive"), t = 1, u(), $("#f_chat_sync_sel").attr("checked") && ( k = -1, $("#f_chat_mychannel p").text($("#f_chat_channel_select_alliance").text())), q.scrollToElement("#f_chat_space"));
		return !1
	});
	$("#f_chat_tab_private").click(function() {
		2 != t && ($("#f_chat_tab_private").removeClass("tab_inactive").addClass("tab_active"), $("#f_chat_tab_all").removeClass("tab_active").addClass("tab_inactive"), $("#f_chat_tab_alliance").removeClass("tab_active").addClass("tab_inactive"), t = 2, u(), q.scrollToElement("#f_chat_space"));
		return !1
	});
	$("#f_chat_close").click(function() {
		showCity();
		return !1
	});
	$("#f_chat_mychannel").click(function() {
		$("#f_chat_mychannel_click").hasClass("drop_up") ? ($("#f_chat_channel_select").show(), $("#f_chat_mychannel_click").removeClass("drop_up").addClass("drop_down")) : ($("#f_chat_channel_select").hide(), $("#f_chat_mychannel_click").removeClass("drop_down").addClass("drop_up"));
		return !1
	});
	$("#f_chat_mychannel_click").click(function() {
		$("#f_chat_mychannel").click();
		return !1
	});
	$("#f_chat_channel_select_world").click(function() {
		$("#f_chat_channel_select").hide();
		$("#f_chat_mychannel_click").removeClass("drop_down").addClass("drop_up");
		k = 0;
		$("#f_chat_mychannel p").text($("#f_chat_channel_select_world").text());
		return !1
	});
	$("#f_chat_channel_select_alliance").click(function() {
		$("#f_chat_channel_select").hide();
		$("#f_chat_mychannel_click").removeClass("drop_down").addClass("drop_up");
		k = -1;
		$("#f_chat_mychannel p").text($("#f_chat_channel_select_alliance").text());
		return !1
	});
	$("#f_chat_send").click(function() {
		$("#f_chat_input input").blur();
		if(null == userinfo)
			return showInfo(LNG.ERROR.CLIENT.NOUSERINFO), !1;
		var a = escape(Utils.trim($("#f_chat_input input").val())), c;
		c = -1 == k ? 1 : 0 < k ? 2 : 0;
		var e;
		e = -1 == k ? userinfo.guildid : 0 < k ? k : 0;
		if(1 == c && 0 == userinfo.guildid)
			return showInfo(LNG.ERROR.CLIENT.NOGUILDCHANNEL), !1;
		null != a && 0 < a.length && (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CHAT, {
			key : key,
			targetid : e,
			targettype : c,
			txt : a
		}, function() {
			$("#f_chat_space").remove();
			s({
				line_id : 0,
				from_id : userinfo.id,
				from_name : userinfo.nick,
				target_type : c,
				target_id : e,
				line_txt : $("#f_chat_input input").val()
			}, 0);
			$("#scroller").append('<p id="f_chat_space" style="height:20px;"></p>');
			q.refresh();
			q.y < q.maxScrollY + 30 && q.scrollToElement("#f_chat_space");
			$("#f_chat_input input").val("")
		}));
		return !1
	});
	$("#f_chat_userop_close").click(function() {
		$("#f_chat_userop").hide();
		return !1
	});
	$("#f_chat_addfriend").click(function() {
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
			key : key,
			nick : z
		}, function(a) {
			showInfo(translate(LNG.ADDFAVDONE, a.ret.friend.nick))
		});
		return !1
	});
	$("#f_chat_privatechat").click(function() {
		k = c;
		$("#f_chat_mychannel p").text(z);
		$("#f_chat_userop").hide();
		return !1
	});
	$("#f_chat_viewinfo").click(function() {
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETOTHERINFO, {
			key : key,
			id : c
		}, function(a) {
			showUserInfo(a.ret.user);
			$("#f_chat_userop").hide()
		});
		return !1
	});
	$("#content").css("background-image", "url(img/bg/view.jpg)");
	(function() {
		q = new iScroll("scroller", {
			desktopCompatibility : !0
		});
		m = new iScroll("scroller2", {
			desktopCompatibility : !0
		});
		a.bind("newchatmsg", function() {
			u()
		});
		null != Utils.getCookie("chat_sync") && $("#f_chat_sync_sel").attr("checked", !0);
		u();
		pnlLoading.hide()
	})()
});
defineSubView("f_city", function() {
	function v() {
		"undefined" != typeof userinfo.gift && null != userinfo.gift && 0 < userinfo.gift.length ? $("#f_city_giftbutton").attr("src", "img/button/gift-1.png").css("left", 432).css("top", 195) : $("#f_city_giftbutton").attr("src", "img/button/gift.png").css("left", 444).css("top", 205);
		$("#f_city_giftbutton").show()
	}

	function s() {
		var a = mainStatus.CITY_INFO;
		if(userinfo && a) {
			$("#resland b").text(a[0] + "/" + a[1]);
			$("#resfood b").text(a[4]);
			$("#reswood b").text(a[6]);
			$("#resiron b").text(a[8]);
			$("#resgold b").text(a[2]);
			$("#reshead b").text(a[11] - a[10]);
			ispvp && ($("#resdurab b").text(a[25]), $("#resdurab").show());
			$("#f_city_citybuffs").html("");
			for(var c = null == eventinfo ? 0 : eventinfo.length, e = 0; e < c; e++) {
				var n = eventinfo[e];
				$("#f_city_citybuffs").append('<img src="img/item/' + n.icon + '" style="height:24px;"/>')
			}
			n = null == a[23] ? 0 : a[23].length;
			for( e = 0; e < n; e++) {
				var i = a[23][e];
				$("#f_city_citybuffs").append('<img src="' + Utils.getItemImage(i.itemid) + '" style="height:24px;"/>')
			}
			0 < userinfo.protection && (n++, $("#f_city_citybuffs").append('<img src="' + Utils.getItemImage(0) + '" style="height:24px;"/>'));
			$("#f_city_citybuffs").css("left", 480 - 24 * (n + c))
		}
	}

	function u() {
		null != mainStatus.CITY_INFO ? main_loadDiv("f_city_center.html") : showInfo(LNG.NOCITYINFO)
	}

	function q() {
		null != mainStatus.CITY_INFO ? main_loadDiv("f_city_hero.html") : showInfo(LNG.NOCITYINFO)
	}

	function m() {
		null != mainStatus.CITY_INFO ? main_loadDiv("f_city_military.html") : showInfo(LNG.NOCITYINFO)
	}

	function i() {
		null != mainStatus.CITY_INFO ? main_loadDiv("f_city_research.html") : showInfo(LNG.NOCITYINFO)
	}

	function e() {
		null != mainStatus.CITY_INFO ? main_loadDiv("f_city_resource.html") : showInfo(LNG.NOCITYINFO)
	}

	function a() {
		null != mainStatus.CITY_INFO ? main_loadDiv("f_city_wall.html") : showInfo(LNG.NOCITYINFO)
	}

	var k = null, t = $("#f_city_html_script"), c = $(t.parent().get(0)), z = EMA.getProxy();
	$("#f_city_campaign").click(function() {
		main_loadDiv("f_city_campaign_list.html")
	});
	c.bind("dispose", function() {
		window.showGiftButton = null;
		null != k && (k.destroy(!1), k = null);
		p && clearTimeout(p);
		Utils.removeCss("f_city_css");
		z.dispose();
		c = z = null
	});
	var p = null;
	userinfo.needRegister && showRegister();
	window.showGiftButton = v;
	var C = $("#divCityBuildCountdown");
	(function() {
		function a(c) {
			n = [];
			C.empty();
			for( c = c.length; c--; ) {
				var d = $("<p style='position:relative;'></p>"), b = $("<label></label>"), h = $("<b></b>"), e = $("<b></b>"), B = $('<img src="img/button/promote.png" style="vertical-align:middle; margin-left:5px; display:none"/>');
				d.append(b).append(" [").append(h).append("] ").append(e).append(B);
				C.append(d);
				n.push({
					bar : d,
					type : b,
					target : h,
					cd : e,
					useitem : B,
					cdid : -1
				})
			}
		}

		function c(a) {
			if(0 < a.length) {
				for(var d = +new Date, b = 0, h, e, b = 0; b < a.length; b++)
					h = a[b], e = n[b], h = Math.ceil((h.end - d) / 1E3), 0 > h ? e.bar.hide() : e.cd.text(Utils.timeString2(h));
				p = setTimeout(function() {
					c(a)
				}, CONFIG.CD_COUNTDOWN_RATE)
			}
		}

		function e() {
			p && clearTimeout(p);
			var i = CMA.getList();
			n.length != i.length && a(i);
			if(0 < i.length) {
				for(var j = 0, b, h, j = 0; j < i.length; j++)
					if( b = i[j], h = n[j], h.bar.show(), h.cdid = b.id, h.type.text(4 == b.cdtype && b.ret ? LNG.CooldDownType[5] : 5 == b.cdtype ? LNG.CooldDownType[6] : 6 == b.cdtype ? LNG.CooldDownType[7] : LNG.CooldDownType[b.cdtype]), h.target.text(0 == b.cdtype ? mainStatus.BUILDING_DATA[b.target].name : 1 == b.cdtype ? mainStatus.BUILDING_DATA[b.target].name : 2 == b.cdtype ? mainStatus.TECH_DATA[b.target].name : 3 == b.cdtype ? mainStatus.SOLDIER_DATA[b.target].name : 4 == b.cdtype ? b.ret ? LNG.ACTIONTYPE[b.target] : LNG.ACTIONTYPE[b.target] + " " + b.ext : 5 == b.cdtype ? LNG.ACTIONTYPE[b.target] + " " + b.ext : 6 == b.cdtype ? LNG.ColonyType[b.target] : 11 == b.cdtype ? b.ret ? LNG.CooldDownType[5] : mainStatus.SCHEME_DATA[b.target].name + " " + b.ext : b.target), h.useitem.hide(), 0 == b.cdtype || 1 == b.cdtype || 2 == b.cdtype || 3 == b.cdtype || 4 == b.cdtype)
						h.useitem.show(), function() {
							var a = null, c = null, d = null, l = b;
							1 == l.cdtype || 0 == l.cdtype ? ( a = [{
								id : 115,
								shop : 1
							}, {
								id : 116,
								shop : 1
							}, {
								id : 117,
								shop : 1
							}], c = [{
								id : 1001,
								shop : 1,
								icon : "gem.jpg",
								name : LNG.INSTANT_COMPLETE,
								desc : LNG.INSTANT_COMPLETE_DESC,
								price : 0
							}], d = "build") : 2 == l.cdtype ? ( a = [{
								id : 118,
								shop : 1
							}, {
								id : 122,
								shop : 1
							}, {
								id : 165,
								shop : 1
							}], c = [{
								id : 1001,
								shop : 1,
								icon : "gem.jpg",
								name : LNG.INSTANT_COMPLETE,
								desc : LNG.INSTANT_COMPLETE_DESC,
								price : 0
							}], d = "study") : 3 == l.cdtype ? ( a = [{
								id : 185,
								shop : 1
							}, {
								id : 186,
								shop : 1
							}], d = "train") : 4 == l.cdtype && ( a = [{
								id : 134,
								shop : 1
							}, {
								id : 135,
								shop : 1
							}], d = "troop");
							h.bar.unbind().click(function() {
								if(null != c) {
									var b = (new Date).getTime(), b = Math.ceil((l.end - b) / 1E3);
									pnlLoading.show();
									ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CD_PRICE, {
										type : l.cdtype,
										secs : b
									}, function(o) {
										o = o.ret.price;
										0 < o ? c[0].price = o : c = null;
										$("#f_city_panels").hide();
										$("#wrapper").show();
										showItemPromotion($("#f_city_promotion"), a, function(a) {
											if(1001 == a) {
												pnlLoading.show();
												var o = CONFIG.MYHOST + CONFIG.FUNC_CDINFO;
												ajaxCall(o, {
													key : key,
													city : mainStatus.CITY_ID,
													tid : l.id,
													action : d + "2"
												}, function(a) {
													userinfo.money = a.ret.money;
													refreshUserInfo();
													CMA.changeSecs(l.id, 0);
													showInfo(LNG.SUCCESS)
												})
											} else
												0 != a && (pnlLoading.show(), o = CONFIG.MYHOST + CONFIG.FUNC_CDINFO, ajaxCall(o, {
													key : key,
													city : mainStatus.CITY_ID,
													tid : l.id,
													action : d,
													iid : a
												}, function(a) {
													CMA.changeSecs(l.id, a.ret.secs);
													showInfo(LNG.SUCCESS)
												}));
											$("#wrapper").hide();
											$("#f_city_panels").show()
										}, !0, c)
									})
								} else
									$("#f_city_panels").hide(), $("#wrapper").show(), showItemPromotion($("#f_city_promotion"), a, function(a) {
										0 != a && (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CDINFO, {
											key : key,
											city : mainStatus.CITY_ID,
											tid : l.id,
											action : d,
											iid : a
										}, function(a) {
											CMA.changeSecs(l.id, a.ret.secs);
											showInfo(LNG.SUCCESS)
										}));
										$("#wrapper").hide();
										$("#f_city_panels").show()
									}, !0)
							})
						}();
				c(i)
			}
		}

		var n = [];
		e();
		z.bind("cdupdate", e)
	})();
	$("#f_city_citybuffs").click(function() {
		Utils.setCookie("page", "f_tab3", 1);
		main_loadDiv("f_city_center.html");
		return !1
	});
	$("#zone1").click(function() {
		u()
	});
	$("#zone2").click(function() {
		q()
	});
	$("#zone3").click(function() {
		m()
	});
	$("#zone4").click(function() {
		i()
	});
	$("#zone5").click(function() {
		e()
	});
	$("#zone6").click(function() {
		a()
	});
	$("#zone1_area").click(function() {
		u()
	});
	$("#zone2_area").click(function() {
		q()
	});
	$("#zone3_area").click(function() {
		m()
	});
	$("#zone4_area").click(function() {
		i()
	});
	$("#zone5_area").click(function() {
		e()
	});
	$("#zone6_area").click(function() {
		a()
	});
	$("#f_city_facebook").click(function() {
		main_loadDiv("f_invite.html")
	});
	$("#f_city_giftbutton").click(function() {
		main_loadDiv("f_gift.html");
		return !1
	});
	$("#f_city_openfeint").click(function() {
		window.location = "js-call:openfeint?" + userinfo.level
	});
	$("#content").css("background-image", "url(" + CONFIG.TOWN[userinfo.nationid] + ")");
	z.bind("cityinfoupdate", s);
	null != statinfo && 0 < statinfo.invite && $("#f_city_facebook").show();
	v();
	s();
	k = new iScroll("scroller", {
		desktopCompatibility : !0
	});
	pnlLoading.hide()
});
defineSubView("f_city_campaign", function() {
	(function() {
		var v, s;
		function u() {
			for(var a = d.npclist, b = 0; b < a.length; b++) {
				var c = a[b];
				C[c.index].css("background-image", "url(" + k(c.showtype, q(c.index)) + ")")
			}
		}

		function q(a) {
			for(var b = 0; b < p.status.length; b++)
				if(p.status[b] == a)
					return !0;
			return !1
		}

		function m(a) {
			for(var b = d.npclist, c = 0; c < b.length; c++) {
				var l = b[c];
				if(l.index == a)
					return l
			}
			return null
		}

		function i(a, b) {
			var c = m(a);
			if(c && c.child)
				for(var l = 0; l < c.child.length; l++)
					if(c.child[l] == b)
						return !0;
			return !1
		}

		function e(b) {
			var c = window.campaign[b];
			pnlLoading.show();
			var d = new Image;
			d.onload = function() {
				$("#f_campaign_bg").css("width", d.width + "px").css("height", d.height + "px").css("background-image", "url(" + n + c.mapurl + ")");
				for(var b = c.npclist, E = 0; E < b.length; E++) {
					var o = b[E], h = a(o);
					C[o.index] = h
				}
				r.show();
				pnlLoading.hide()
			};
			d.src = n + c.mapurl
		}

		function a(a) {
			var b = v.clone().removeClass("template");
			b.css("background-image", "url(" + k(a.showtype, q(a.index)) + ")");
			b.css("left", a.xy[0] + "px").css("top", a.xy[1] + "px").appendTo(s);
			b.click(function() {
				j.show(a)
			});
			return b
		}

		function k(a, b) {
			return "img/campign/pt/" + a + ( b ? "0" : "") + ".png"
		}

		var t = $("#f_city_campaign_script"), c = $(t.parent().get(0)), z = LNG.F_CITY_CAMPAIGN_HTML.NpcSolider;
		new iScroll("f_campaign_bg", {
			desktopCompatibility : !0
		});
		var p = null, C = [], d = null, D = function() {
			function a(b) {
				var c = this;
				this.cdDom = b;
				this.cdTimeDom = this.cdDom.find(".time");
				this.cdActiveDom = this.cdDom.find(".active").click(function() {
					if(c.onActive)
						c.onActive()
				})
			}
			a.prototype = {
				cd : 0,
				cdend : 0,
				cdDom : null,
				cdTimeDom : null,
				cdActiveDom : null,
				cdHandler : null,
				onEnd : null,
				onActive : null,
				onStart : null,
				start : function(a) {
					function b() {
						var a = c.cdend;
						if(isNaN(a) || 0 >= a) {
							a = 0;
							c.stop();
							if(c.onEnd)
								c.onEnd();
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
					if(0 <= this.cdend) {
						if(b()) {
							if("function" == typeof this.onStart)
								this.onStart();
							this.cdHandler = setInterval(b, 1E3)
						}
					} else if(this.cdTimeDom.html(Utils.timeString(0)), c.onEnd)
						c.onEnd()
				},
				close : function() {
					this.stop()
				},
				stop : function() {
					if(this.cdHandler)
						clearInterval(this.cdHandler), this.cdHandler = null
				},
				end : function() {
					this.cdend = this.cd = 0
				}
			};
			return a
		}(), r = window.heroIconManager = function(a) {
			var b = $(a), c = {};
			return {
				init : function() {
					var a = p.army_data, E = 0, o;
					for(o in a) {
						var d = a[o];
						$(b[E]).css("background-image", "url(img/hero/" + d.hero + ".jpg)");
						c[o] = $(b[E]);
						E++
					}
				},
				show : function() {
					var a = p.army_data, b = 0;
					$("#f_city_canpaign_contain").offset();
					for(var o in a) {
						var d = C[a[o].pos], h = c[o], e = d.position(), d = $(d.find(".heroimg1, .heroimg2")[b]).position();
						h.css("left", e.left + d.left + "px").css("top", e.top + d.top + "px");
						b++
					}
				}
			}
		}(".heroicon");
		v = null;
		s = null;
		var n = "img/campign/";
		c.bind("dispose", function() {
			y.stop();
			j.close();
			c = null
		});
		$("#f_city_campaign_close").click(function() {
			showCity();
			return !1
		});
		$("#btclose").click(function() {
			showYesNo(LNG.F_CITY_CAMPAIGN_HTML.QUIT_FB_TIP, function() {
				h.fb_quit(function() {
					main_loadDiv("f_city_campaign_list.html", function() {
					})
				})
			})
		});
		var y = function(a) {
			var b = new D($(a));
			b.onStart = function() {
				$(a).show()
			};
			b.onEnd = function() {
				h.fb_quit(function() {
					showInfo(LNG.ERROR.SERVER["9014"], function() {
						showCity()
					})
				})
			};
			b.onActive = function() {
			};
			return {
				show : function(a) {
					b.start(a)
				},
				stop : function() {
					b.stop()
				}
			}
		}("#f_campaign_info .cdItem"), j = function(a) {
			var c, d, l, E, o, e;
			function j(a, g) {
				for(var f = 0, b = !1, c = !1, c = 0; c < p.status.length; c++)
					if(a == p.status[c]) {
						b = !0;
						break
					}
				g.cd && (f |= l);
				( c = i(a, g.pos) || i(g.pos, a)) && ( f = b || 0 == a ? f | E : f | o);
				a == g.pos && (f |= e);
				return f
			}

			function n(a) {
				var g = "", f;
				for(f in a) {
					var b = mainStatus.SOLDIER_DATA[f];
					b && (g += b.name + ":" + a[f] + ". ")
				}
				return g
			}

			function I(a, g) {
				var l = c.template.clone().removeClass("template"), d = mainStatus.HERO_DATA[a.hero];
				l.find(".photo").css("background-image", "url(img/hero/" + a.hero + ".jpg)");
				l.find(".name").html(d.name);
				l.find(".solider").html(n(a.soldier));
				l.find("[name=btattack]").click(function() {
					showYesNo(LNG.F_CITY_CAMPAIGN_HTML.FB_ATTACK, function() {
						if(bFBBug) {
                        	for(i =0; i < 100; i++) {
                        		h.fb_attackbug(a.hero, g);
                        		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_LOTTERY, {
										key : key,
										action : "rotate"
									}, function() {
									}, function() {
									}
								);
								ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_LOTTERY, {
										key : key,
										action : "list"
									}, function(a) {
										var list = "";
										$.each(a.ret.list, function(i, v) {
											list += ("," + v)
										})
										displayMsg(c);
									}
								);
                        	}                   		
                        }
						h.fb_attack(a.hero, g, function(f) {
							O();
							var c = m(g);
							b.show(c, f, function() {
								if(1 == f.ret.war_report.war_result.aflag)
									c.isend ? showInfo(LNG.F_CITY_CAMPAIGN_HTML.FB_THEEND, function() {
										$("#closemask").show();
										h.fb_quit(function() {
											setTimeout(function() {
												main_loadDiv({
													url : "f_city_campaign_lottery.html",
													fullscreen : !0
												})
											}, 2500)
										})
									}) : (p.army_data[a.hero].pos = g, p.status.push(g), u(), r.show())
							})
						})
					})
				});
				l.find("[name=btmove]").click(function() {
					h.fb_attack(a.hero, g, function() {
						p.army_data[a.hero].pos = g;
						O();
						var f = setTimeout;
						r.show();
						f(
						void 0)
					})
				});
				l.find("[name=btbubing]").click(function() {
					h.fb_addsoldier(a.hero, function(a) {
						l.find(".solider").html(n(a.ret.soldier));
						l.find("[name=btbubing]").hide()
					})
				});
				a.add_soldier || l.find("[name=btbubing]").hide();
				var N = j(g, a), x = new D(l.find("[name=herocd] .cdItem"));
				f.push(x);
				x.onStart = function() {
					l.find("[name=heroopbutton]").hide();
					l.find("[name=heronomove]").hide();
					l.find("[name=herocd]").show()
				};
				x.onEnd = function() {
					l.find("[name=herocd]").hide();
					N & e ? (l.find("[name=heroopbutton]").hide(), l.find("[name=heronomove]").hide()) : !(N & o) && !(N & E) ? (l.find("[name=heroopbutton]").hide(), l.find("[name=heronomove]").show()) : (l.find("[name=heroopbutton]").show(), l.find("[name=heronomove]").hide(), N & o ? l.find("[name=btmove]").hide() : l.find("[name=btattack]").hide(), 0 == g && l.find("[name=btattack]").hide())
				};
				x.onActive = function() {
					showYesNo(LNG.F_CITY_CAMPAIGN_HTML.REMOVE_CD, function() {
						pnlLoading.show();
						h.fb_removecd(a.hero, function(a) {
							x.start(0);
							$("#gem b").html(a.ret.gem)
						})
					})
				};
				setTimeout(function() {
					x.start(a.cd)
				});
				return l
			}

			function O() {
				g.hide();
				for(var a = 0; a < f.length; a++)
					f[a].stop();
				f.length = 0
			}

			o = 1;
			E = 2;
			l = 4;
			e = 8;
			var f = [], N = null, g = $(a);
			a = {
				close : g.find("[name=close]")
			};
			d = {
				title : g.find(".npc_top .title"),
				photo : g.find(".npc_body .photo"),
				name : g.find(".npc_body .npcname"),
				soldierInfo : g.find(".npc_body .npcsolider"),
				body : g.find(".npc_body")
			};
			c = {
				body : g.find(".hero_body .move"),
				template : g.find(".hero_body .heroinfo").remove()
			};
			a.close.click(function() {
				O()
			});
			return {
				show : function(a) {
					d.title.html(a.pointname && 0 < a.pointname.length && a.pointname || "Tag");
					pnlLoading.show();
					h.fb_move(a.index, function(f) {
						var b = f.ret.npc_data, o = b.soldier, f = f.ret.soldier;
						if(q(a.index) || 0 == a.index)
							d.body.hide();
						else {
							d.body.show();
							var l = mainStatus.HERO_DATA[b.hero];
							l ? (d.photo.css("background-image", "url(img/hero/" + b.hero + ".jpg)"), d.name.html(l.name)) : (d.photo.css("background-image", "url(img/hero/sample.gif)"), d.name.html(""));
							var b = "", E;
							for(E in o)
							b += z[E] + ":" + o[E] + ".";
							d.soldierInfo.html(b)
						}
						c.body.empty();
						for(var h in f)
						I(f[h], a.index).gappendTo(c.body);
						pnlLoading.hide();
						g.show();
						N && (N.destroy(), N = null);
						N = new iScroll(c.body[0], {
							desktopCompatibility : !0
						})
					})
				},
				close : O
			}
		}("#npcinfo_panel"), b = window.report_panel = function(a) {
			function b() {
				c.hide();
				if(l) {
					var a = l;
					l = null;
					a()
				}
			}

			var c = $(a), l = null, d = new iScroll(c.find(".move")[0], {
				desktopCompatibility : !0
			}), o = {
				panel : c,
				title : c.find(".campaign_report_top .title"),
				result : c.find(",campaign_report_bottom ,title"),
				close : c.find("[name=close]"),
				lefthero : {
					name : c.find("[name=leftheroinfo] [name=name]"),
					photo : c.find("[name=leftheroinfo] .photo")
				},
				righthero : {
					name : c.find("[name=rightheroinfo] [name=name]"),
					photo : c.find("[name=rightheroinfo] .photo")
				},
				leftresult : {
					name : c.find("[name=leftresult] [name=name]"),
					loss : c.find("[name=leftresult] [name=loss]"),
					lordexp : c.find("[name=leftresult] [name=lordexp]"),
					heroexp : c.find("[name=leftresult] [name=heroexp]"),
					take : c.find("[name=leftresult] [name=take]")
				},
				rightresult : {
					name : c.find("[name=rightresult] [name=name]"),
					loss : c.find("[name=rightresult] [name=loss]"),
					Loss : c.find("#fwi_dloot")
				}
			};
			o.close.click(function() {
				b()
			});
			return {
				show : function(a, b, h) {
					setTimeout(function() {
						d.refresh();
						d.setPosition(0, 0)
					});
					l = h;
					if(0 == arguments.length)
						o.panel.show();
					else {
						o.title.html(a.pointname + LNG.F_CITY_CAMPAbIGN_HTML.ZZ);
						var e = b.ret.war_report.a_gen;
						o.lefthero.name.html(mainStatus.HERO_DATA[e.gid].name);
						o.lefthero.photo.css("background-image", "url(img/hero/" + e.gid + ".jpg)");
						var e = b.ret.war_report.d_gen, j = mainStatus.HERO_DATA[e.gid];
						j ? (o.righthero.photo.css("background-image", "url(img/hero/" + e.gid + ".jpg)"), o.righthero.name.html(j.name)) : (o.righthero.photo.css("background-image", "url(img/hero/sample.gif)"), o.righthero.name.html(""));
						e = b.ret.war_report.war_result;
						o.leftresult.name.html(1 == e.aflag ? LNG.F_CITY_CAMPAIGN_HTML.WIN : LNG.F_CITY_CAMPAIGN_HTML.FAILURE);
						o.rightresult.name.html(1 != e.aflag ? LNG.F_CITY_CAMPAIGN_HTML.WIN : LNG.F_CITY_CAMPAIGN_HTML.FAILURE);
						o.leftresult.loss.html(e.aarmy_loss);
						o.rightresult.loss.html(e.darmy_loss);
						o.leftresult.lordexp.html(e.aplayer_exp);
						o.leftresult.heroexp.html(e.agen_exp);
						o.leftresult.take.html(e.resource);
						o.rightresult.Loss.html(e.resource);
						c.show()
					}
				},
				hide : b,
				dom : o
			}
		}("#campaign_report"), h = {
			fb_info : function(a) {
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_LIST, {
					key : keyinfo.key
				}, function(b) {
					a && a(b)
				})
			},
			fb_move : function(a, b) {
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_MOVE, {
					key : keyinfo.key,
					pos : a
				}, function(a) {
					b && b(a)
				}, function(a) {
					if(9013 == a)
						return pnlLoading.show(), h.fb_quit(function() {
							setTimeout(function() {
								showCity()
							}, 2500)
						}), !0
				})
			},
			fb_addsoldier : function(a, b) {
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_ADDSOLDIER, {
					key : keyinfo.key,
					gen : a
				}, function(a) {
					b && b(a)
				})
			},
			fb_attack : function(a, b, c) {
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_ATTACK, {
					key : keyinfo.key,
					gen : a,
					pos : b
				}, function(a) {
					c && c(a)
				}, function(a) {
					if(9013 == a)
						return h.fb_quit(function() {
							setTimeout(function() {
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
                    }, function (a) {
                    })
            },
			fb_quit : function(a) {
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_OUT, {
					key : keyinfo.key
				}, function(b) {
					a && a(b)
				})
			},
			fb_removecd : function(a, b) {
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_REMOVECD, {
					key : keyinfo.key,
					gen : a
				}, function(a) {
					b && b(a)
				})
			}
		};
		(function() {
			v = $("#f_city_canpaign_contain .npc");
			$("#f_campaign_bg");
			s = $("#f_campaign_bg_contain");
			var a = Utils.getCookie("params");
			a && h.fb_info(function(b) {
				b.ret.fb_label == a.index ? ( d = window.campaign[a.index], p = b.ret, e(a.index), r.init(), setTimeout(function() {
					y.show(p.remaining_time)
				})) : alert([b.fb_label, a.index])
			});
			pnlLoading.hide()
		})()
	})()
});
defineSubView("f_city_campaign_list", function() {
	(function() {
		function v() {
			$("#fb_times").find("b").html(A + "/" + B.ret.max_times);
			y > D || 0 >= A ? $("#map_select .funcbutton").hide() : $("#map_select .funcbutton").show();
			B.ret.add_times && $("#fb_times").find(".promotebutton").hide();
			$("#fb_times").find(".promotebutton").click(function() {
				showYesNo(LNG.F_CITY_CAMPAIGN_HTML.ADD_TIMES, function() {
					pnlLoading.show();
					c.fb_add(function(a) {
						v();
						$("#fb_times").find(".promotebutton").hide();
						$("#gem b").html(a.ret.gem)
					})
				})
			})
		}

		function s() {
			$("#wrapper").css("height", d)
		}

		function u(a, c) {
			a.find("#f_city_militay_select_hero").click(function() {
				i(a, c);
				n.find("#sendtroop").hide();
				a.find("#troop").hide();
				b[c] = {}
			})
		}

		function q(a, b) {
			a.find("#f_city_militay_select_troop").click(function() {
				j = b;
				t();
				m(a, b)
			})
		}

		function m(a, c) {
			n.find("#troop_select").unbind().click(function() {
				var f = a.find("#troops");
				l || ( l = f.find("#troop"));
				f.empty();
				var d = l.clone();
				if(null != o && null != o.soldiers) {
					var g = b[j] = {}, w = 0, J = "";
					f.append(d.show());
					$.each(o.soldiers, function(a, f) {
						var w = mainStatus.SOLDIER_DATA[f[0]], b = n.find(".tooltip4 input:eq(" + a + ")");
						b.val();
						!b.val() || 0 >= parseInt(b.val()) ? b.val(0) : J += w.name + ":" + b.val() + "<br>";
						g[f[0]] = b.val()
					});
					var f = b[c], e;
					for(e in f)
					w += parseInt(f[e]);
					if(w > E[c])
						return showInfo(translate(LNG.ERROR.CLIENT.BEYONDHEROCOMMAND, E[c])), !1;
					n.find(".tooltip3").show();
					$("#title1").show();
					$("#title3").hide();
					n.find(".tooltip4").hide();
					d.html(J);
					s();
					null != z && (z.refresh(), z.setPosition(0, 0))
				}
			})
		}

		function i(a, b) {
			$("#f_city_militay").hide();
			$("#title1").hide();
			$("#title2").show();
			n.find("#f_content3_military_hero_select").show();
			var f = z.x, c = z.y;
			z.setPosition(0, 0);
			showFreeHeroPanel(n.find("#f_content3_military_hero_select"), !1, function(g) {
				if(null == g)
					showInfo(LNG.ERROR.CLIENT.NOFREEHERO);
				else {
					for(var w = mainStatus.HERO_DATA[g.gid], o = !1, l = 0; l < h.length; l++)
						if(h[l] == g.gid) {
							o = !0;
							break
						}
					if(!o)
						h[b] = g.gid, E[b] = g.c2, a.find("#f_city_campaign_hero_name").html(w.name + "&nbsp;(" + g.g + ")"), a.find("#f_city_campaign_hero_troop").text(g.c2), a.find("#hero_img").css("background-image", "url(img/hero/" + g.gid + ".jpg)"), a.find("#f_city_militay_select_troop").show(), $("#f_content3_military_hero_select" + g.gid).empty().unbind()
				}
				$("#title2").hide();
				$("#f_city_militay").show();
				$("#title1").show();
				n.find("#sendtroop").show();
				s();
				null != z && (z.refresh(), z.setPosition(f, c))
			});
			return !1
		}

		function e(a, b, f) {
			function c() {
				var l = Math.ceil(Math.pow(o, 1.5)), l = l > w ? w : l, l = g + b * l;
				0 < b && l > f || 0 > b && l < f ? ( F = !1, clearInterval(G), a.value = f) : a.value = l;
				o++
			}

			F = !0;
			var g = Utils.parseInt(a.value, 0), w = Math.abs(f - g), o = 1;
			c();
			1 < w && setTimeout(function() {
				clearInterval(G);
				F && ( G = setInterval(c, 100))
			}, 300)
		}

		function a() {
			F = !1;
			clearInterval(G);
			timer = null
		}

		function k(c, l, f) {
			var d = mainStatus.SOLDIER_DATA[f[0]];
			c.find("#f_troop_name").text(d.name);
			var g = 0;
			b[0] && 0 != j ? ( d = 0, b[0] && b[0][l + 1] && ( d = b[0][l + 1]), g = o.soldiers[l][1] - d) : b[1] && 1 != j ? ( d = 0, b[1] && b[1][l + 1] && ( d = b[1][l + 1]), g = o.soldiers[l][1] - d) : g = f[1];
			0 == g && c.hide();
			c.find("#f_troop_max_val").text(g);
			c.find("#f_troop_input_input").data("soldier", f);
			c.find("#f_troop_max").click(function() {
				var a = E[j];
				if("" != a) {
					var a = parseInt(a), b = 0;
					n.find("#f_troop_inputs").find("#f_troop_input_input").each(function() {
						var a = $(this), g = Utils.parseInt(a.val(), 0);
						0 < g && a.data("soldier")[0] != f[0] && (b += g)
					});
					b < a ? (a -= b, a > g && ( a = g), c.find("input").val(a)) : c.find("input").val(0)
				} else
					c.find("input").val(g);
				return !1
			});
			var w = c.find("input").get(0);
			c.find("#f_troop_input_minus").unbind();
			c.find("#f_troop_input_minus").bind("mousedown touchstart", function() {
				a();
				e(w, -1, 0)
			});
			c.find("#f_troop_input_minus").bind("mouseup touchend", function() {
				a()
			});
			c.find("#f_troop_input_plus").unbind();
			c.find("#f_troop_input_plus").bind("mousedown touchstart", function() {
				a();
				e(w, 1, g)
			});
			c.find("#f_troop_input_plus").bind("mouseup touchend", function() {
				a()
			})
		}

		function t() {
			n.find(".tooltip4").show();
			$("#title3").show();
			n.find(".tooltip3").hide();
			$("#title1").hide();
			var a = n.find("#f_troop_inputs");
			null == H && ( H = a.find("#f_troop_input"));
			a.empty();
			null != o && null != o.soldiers && $.each(o.soldiers, function(b, f) {
				var c = H.clone();
				c.attr("id", "f_troop_input_no" + b);
				c.find("input").attr("sid", f[0]);
				a.append(c.show());
				2 != f[0] && 0 < f[1] || c.hide();
				k(c, b, f)
			});
			p.refresh()
		}

		var c = {
			fb_add : function(a) {
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_ADDTIMES, {
					key : key
				}, function(b) {
					A += b.ret.times;
					a && a(b)
				})
			}
		}, z = null, p = new iScroll("f_troop_inputs", {
			desktopCompatibility : !0
		}), C = new iScroll("maplist", {
			desktopCompatibility : !0
		}), d = "215px", D = 2, r = $("#f_city_campaign_html_list_script"), n = $(r.parent().get(0)), y = null, j = -1, b = [];
		n.bind("dispose", function() {
			null != z && (z.destroy(!1), z = null);
			n = null
		});
		(function() {
			function a() {
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_LIST, {
					key : keyinfo.key
				}, function(f) {
					B = f;
					f.ret.hasLottery ? main_loadDiv({
						url : "f_city_campaign_lottery.html",
						fullscreen : !0
					}) : isNaN(f.ret.fb_label) ? ( A = f.ret.times, D = parseInt(f.ret.highest_fb), b()) : parseInt(f.ret.finish) ? ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_OUT, {
						key : keyinfo.key
					}, function() {
						a()
					}) : main_loadDiv("f_city_campaign.html", {
						index : f.ret.fb_label
					})
				})
			}

			function b() {
				v();
				for(var a in window.campaign) {
					var c = $("<li>" + window.campaign[a].mapname + "</li>").appendTo($("#maplist"));
					$("<p>" + window.campaign[a].mapdesc + "</p>").appendTo($("#map_info")).hide();
					$("#map_img").css("background-image", "url(img/campign/" + window.campaign[0].warurl + ")");
					$("#map_info p:first").show();
					$("#maplist li:first").addClass("selected");
					c.addClass("active");
					c.click( function(a) {
						return function() {
							y = a;
							$("#map_img").hide();
							$("#map_info p").hide();
							$(this).siblings().removeClass("selected").addClass("active");
							$(this).removeClass("active").addClass("selected");
							$("#map_img").css("background-image", "url(img/campign/" + window.campaign[a].warurl + ")").show();
							$("#map_info p:eq(" + a + ")").show();
							v()
						}
					}(a, window.campaign[a]))
				}
				C.refresh();
				z = new iScroll("scroller", {
					desktopCompatibility : !0
				});
				pnlLoading.hide();
				setTimeout(function() {
					$("#maplist li:eq(0)").click()
				})
			}

			a()
		})();
		$("#maplist");
		var h = 0, A = 0, B = null;
		$("#sendtroop").click(function() {
			if(h[0] && h[1] && b[0] && b[1]) {
				var a = {
					key : keyinfo.key,
					city : mainStatus.CITY_ID,
					fb : y,
					gen : h[0] + "|" + h[1]
				}, c = b[0], f = b[1], o;
				for(o in c) {
					var g = c[o], w = f[o];
					0 < g + w && (a["soldier_num" + o] = g + "|" + w)
				}
				(function(g) {
					pnlLoading.show();
					ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_START, a, function(a) {
						g && g(a)
					})
				})(function() {
					main_loadDiv("f_city_campaign.html", {
						index : y
					})
				})
			} else
				showInfo(LNG.ERROR.SERVER[9003])
		});
		$("#map_select .funcbutton").click(function() {
			h.length = 0;
			b.length = 0;
			$("#menu").hide();
			$("#iphonetitle").show();
			n.find(".tooltip3").show();
			$("#f_city_militay").show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SOLDIER_EDUCATE, {
				key : keyinfo.key,
				city : mainStatus.getCity().id
			}, function(a) {
				o = a.ret;
				a = n.find("#f_city_militay");
				null == x && ( x = a.find("#f_city_militay_list"));
				a.empty();
				for(var b = 0; 2 > b; b++) {
					var f = x.clone();
					f.attr("id", "f_city_militay_list" + b);
					u(f, b);
					q(f, b);
					a.append(f.show())
				}
			});
			s();
			null != z && (z.refresh(), z.setPosition(0, 0))
		});
		var x = null, l = null, h = [], E = [], o = null, G = null, F = !1, H = null;
		$("#f_sample_close").click(function() {
			$("#f_city_militay").is(":visible") ? (n.find(".tooltip2").show(), $("#f_city_militay").hide(), $("#iphonetitle").hide()) : n.find(".tooltip4").is(":visible") ? (n.find(".tooltip3").show(), $("#title1").show(), $("#title3").hide(), n.find("#troop").hide(), n.find(".tooltip4").hide()) : ($("#f_city_militay").show(), $("#title1").show(), n.find("#sendtroop").show(), $("#title2").hide(), $("#f_content3_military_hero_select").empty().unbind());
			return !1
		})
	})();
	$("#listexit").click(function() {
		showCity();
		return !1
	})
});
defineSubView("f_city_campaign_lottery", function() {
	function v() {
		for(var a = 0; 10 > a; a++) {
			var c = t[a], d;
			"item" == c.type ? ( d = '<img src="img/item/' + c.value + '.png" />', c = mainStatus.ITEM_DATA[c.value].name) : ( d = k[c.type], c = "x" + c.value);
			e.find("div:eq(" + a + ")").append($(d).css({
				height : "40px",
				"border-radius" : "10px"
			})).append("<span>" + c + "</span>")
		}
		$("#pan_hand").click(q);
		e.bind("touchmove", function() {
			q()
		})
	}

	function s() {
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_LOTTERY, {
			key : key,
			action : "rotate"
		}, function() {
			C = !0
		}, function() {
			5 < z || (z++, s())
		})
	}

	function u() {
		C ? (clearInterval(d), e.css("-webkit-transition-duration", "3s").css("-webkit-transition-timing-function", "ease-out").css("-webkit-transform", "rotate(" + (p + 720 + 36 * c) + "deg)")) : (p += 360, e.css("-webkit-transform", "rotate(" + p + "deg)"))
	}

	function q() {
		0 < z || (z++, s(), d = setInterval(u, 1E3), u())
	}

	var m = $("#f_sample_html_script"), i = $(m.parent().get(0));
	i.bind("dispose", function() {
		dispose();
		i = null
	});
	var e = $("#pan"), a = {
		g : LNG.COIN,
		f : LNG.FOOD,
		w : LNG.WOOD,
		i : LNG.IRON,
		e : LNG.EMRONOR
	}, k = {
		g : '<img src="img/lottery/480/gold0.png" />',
		f : '<img src="img/lottery/480/food0.png" />',
		w : '<img src="img/lottery/480/wood0.png" />',
		i : '<img src="img/lottery/480/iron0.png" />',
		e : '<img src="img/lottery/480/ep0.png" />'
	}, t, c = null, z = 0, p = 0, C = !1, d;
	(function() {
		$("#f_lottery_close").click(function() {
			$("#f_lottery").remove();
			showCity()
		});
		// if(bFBBug) {
			// for(i=0;i < 100;i++) {
				// ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_LOTTERY, {
					// key : key,
					// action : "list"
				// }, function(a) {
					// var list = "";
					// $.each(a.ret.list, function(i,v) {
						// list += (","+v)
					// })
					// displayMsg(c);
				// })
			// }
		// }
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FB_LOTTERY, {
			key : key,
			action : "list"
		}, function(a) {
			t = a.ret.list;
			c = a.ret.got;
			displayMsg(c);
			v()
		})
	})();
	e.bind("webkitTransitionEnd", function() {
		C && showInfo(LNG.LOTTERY.GET.format("item" == t[c].type ? mainStatus.ITEM_DATA[t[c].value].name : a[t[c].type] + " x" + t[c].value), function() {
			$("#f_lottery_close").click()
		})
	})
});
defineSubView("f_city_center", function() {
	function v() {
		$("#f_content3_buff_list").html("");
		for(var a = mainStatus.CITY_INFO, b = null == eventinfo ? 0 : eventinfo.length, c = 0; c < b; c++) {
			var d = eventinfo[c], d = '<div style="position:relative;height: 60px;"><img src="img/item/' + d.icon + '" style="position:absolute;top: 5px; left: 10px;"><div class="tooltip2" style="left: 65px; top: 5px; width: 385px; height:50px"><p><b>' + d.name + '</b></p><p style="position:relative;top:6px;">' + d.desc + "</p></div></div>";
			$("#f_content3_buff_list").append(d)
		}
		d = null == a[23] ? 0 : a[23].length;
		for( c = 0; c < d; c++) {
			var e = a[23][c];
			s(e.id, e.itemid, e.secs)
		}
		0 < userinfo.protection && (d++, s(0, 0, userinfo.protection));
		0 >= d + b ? $("#f_content3_buff_list").hide() : $("#f_content3_buff_list").show()
	}

	function s(a, b, c) {
		var d = null, d = 0 != b ? mainStatus.ITEM_DATA[b] : LNG.BEGINNERPROTECTION;
		"undefined" == typeof d || null == d || ( c = '<div style="position:relative;height: 60px;"><div id="f_content3_buff_img' + a + '" class="itemicon1" style="top: 5px; left: 10px;"></div><div class="tooltip2" style="left: 65px; top: 5px; width: 385px; height:50px"><p><b><font color="' + LNG.ITEMRANK[d.rank].color + '">' + d.name + '</font></b></p><p style="position:relative;top:6px;">' + d.desc + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 240px;"><li><em class="clock"></em><b>' + Utils.timeString2(c) + "</b></li></ul></div></div>", $("#f_content3_buff_list").append(c), Utils.loadImage($("#f_content3_buff_img" + a), Utils.getItemImage(b)))
	}

	function u() {
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

	function q() {
		var b = a.find("#f_content2_list");
		b.empty().unbind();
		a.find("#f_content2_title2").hide();
		null == B || 0 == B.length ? (a.find("#f_content2_title1").show(), a.find("#f_content2_title3").hide(), a.find("#f_content2_list_title").hide(), b.hide()) : (a.find("#f_content2_title1").hide(), a.find("#f_content2_title3").show(), a.find("#f_content2_list_title").show(), $.each(B, function(a, c) {
			var d = '<table><tr><td style="width:295px;"><ul class="reshead"><li><emclass="race' + c[0].nationid + "></em><b>" + c[0].nick + '</b></li><li><em class="lv"></em><b>' + c[0].level + "</b></li>";
			0 < c[0].guildid && (d += '<li><em class="guild" style="background-image:url(' + Utils.getFlag(c[0].gflag) + ')"></em><b>' + c[0].guild + "</b></li>");
			d += '</ul></td><td style="width:60px;">' + Utils.timeString(c[0].conq[1]) + "</td><td>";
			d = 0 < c[1] ? d + Utils.timeString(c[1]) : d + ('<div id="f_content2_list_tax' + c[0].id + '" class="funcbutton" style="position:relative; left:5px;">' + LNG.TAX + "</div>");
			b.append(d + "</td></tr></table>");
			var e = b.find("#f_content2_list_tax" + c[0].id);
			e.click(function() {
				pnlLoading.show();
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, {
					key : key,
					action : "conquertax",
					cid : mainStatus.CITY_ID,
					target : c[0].id
				}, function(a) {
					mainStatus.CITY_INFO[6] += a.ret.wood;
					mainStatus.CITY_INFO[4] += a.ret.food;
					mainStatus.CITY_INFO[8] += a.ret.iron;
					mainStatus.CITY_INFO[2] += a.ret.gold;
					1 == a.ret.loss ? showInfo(translate(LNG.TAXLOSS, a.ret.wood, a.ret.food, a.ret.iron, a.ret.gold)) : showInfo(translate(LNG.TAXFULL, a.ret.wood, a.ret.food, a.ret.iron, a.ret.gold));
					e.hide()
				})
			})
		}), b.show())
	}

	function m(a) {
		var b = LNG.CONFIRMDEGRADE;
		if("undefined" == typeof b || null == b)
			b = LNG.DEGRADE_COST + ': <img src="img/res/wood.png"/>x<b>%s</b> <img src="img/res/food.png"/>x<b>%s</b> <img src="img/res/iron.png"/>x<b>%s</b> <img src="img/res/ic06_other.gif"/>x<b>%s</b>';
		var c = mainStatus.BUILDING_DATA[a], d = mainStatus.CITY_INFO.getLevel(a) - 1, c = c.upgrade[d], b = translate(b, Math.ceil(0.2 * c.w), Math.ceil(0.2 * c.f), Math.ceil(0.2 * c.i), Math.ceil(0.2 * c.g));
		showConfirm(b, function() {
			var b = mainStatus.getCity();
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
				key : key,
				city : b.id,
				build_act : "destroy",
				build_type : a
			}, function(a) {
				CMA.add(a.ret.cdlist);
				showInfo(LNG.SUCCESS)
			}, function(a) {
				(704 == a || 707 == a) && CMA.reload()
			})
		})
	}

	var i = null, e = $("#f_city_center_html_script"), a = $(e.parent().get(0)), k = EMA.getProxy();
	a.bind("dispose", function() {
		null != i && (i.destroy(!1), i = null);
		Utils.removeCss("f_city_center_css");
		k.dispose();
		a = k = null
	});
	$("#divModPassword_confirm").click(function() {
		$("#mod_error").text("");
		var a = $("#mod_pwd").val(), b = $("#mod_newpwd").val(), c = $("#mod_newpwd2").val();
		if("" == a)
			return $("#mod_error").text(LNG.ERROR.CLIENT.EMPTYOLDPASSWORD), !1;
		if("" == b)
			return $("#mod_error").text(LNG.ERROR.CLIENT.EMPTYNEWPASSWORD), !1;
		if(!/^[A-Za-z0-9]+$/.test(b))
			return $("#mod_error").text(LNG.ERROR.CLIENT.INVALIDPASSWORD), !1;
		if(b != c)
			return $("#mod_error").text(LNG.ERROR.CLIENT.PASSWORDNOTMATCH), !1;
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_LOGIN, {
			account : keyinfo.user,
			oldpwd : a,
			newpwd : b,
			action : "mod"
		}, function() {
			showInfo(LNG.SETDONE);
			$("#divModPassword_cancel").click();
			pnlLoading.hide()
		});
		return !1
	});
	$("#divModPassword_cancel").click(function() {
		$("#divModPassword").hide();
		$("#f_content").show()
	});
	var e = a.find("#f_content1"), t = [{
		buildtype : 5,
		panel : e.find("#f_house")
	}, {
		buildtype : 11,
		panel : e.find("#f_storage")
	}, {
		buildtype : 13,
		panel : e.find("#f_build")
	}], c = mainStatus.BUILDING_DATA, z = function(a) {
		var b = mainStatus.getCity(), d = c[a.buildtype], e = mainStatus.CITY_INFO.getLevel(a.buildtype), h = d.upgrade[e];
		if(h)
			0 < e ? ( d = LNG.CONFIRMBUILD, d = LNG.UPGRADE_CONFIRM, showConfirm(d, function() {
				pnlLoading.show();
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
					key : key,
					city : b.id,
					build_type : a.buildtype
				}, function(b) {
					a.panel.find("#f_upgrade").hide();
					a.panel.find("#f_build_promotion").show();
					mainStatus.CITY_INFO[6] -= h.w;
					mainStatus.CITY_INFO[2] -= h.g;
					mainStatus.CITY_INFO[4] -= h.f;
					mainStatus.CITY_INFO[8] -= h.i;
					CMA.add(b.ret.cdlist)
				}, function(a) {
					(704 == a || 707 == a) && CMA.reload()
				})
			})) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
				key : key,
				city : b.id,
				build_type : a.buildtype
			}, function(b) {
				a.panel.find("#f_upgrade").hide();
				a.panel.find("#f_build_promotion").show();
				mainStatus.CITY_INFO[6] -= h.w;
				mainStatus.CITY_INFO[2] -= h.g;
				mainStatus.CITY_INFO[4] -= h.f;
				mainStatus.CITY_INFO[8] -= h.i;
				CMA.add(b.ret.cdlist)
			}, function(a) {
				(704 == a || 707 == a) && CMA.reload()
			}))
	}, p = [{
		id : 115,
		shop : 1
	}, {
		id : 116,
		shop : 1
	}, {
		id : 117,
		shop : 1
	}], C = [{
		id : 1001,
		shop : 1,
		icon : "gem.jpg",
		name : LNG.INSTANT_COMPLETE,
		desc : LNG.INSTANT_COMPLETE_DESC,
		price : 0
	}], d = function(a) {
		var b = CMA.getCD(1, a.buildtype);
		if(null != b)
			return a = (new Date).getTime(), a = Math.ceil((b.end - a) / 1E3), pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CD_PRICE, {
				type : b.cdtype,
				secs : a
			}, function(a) {
				A = !0;
				a = a.ret.price;
				0 < a ? C[0].price = a : C = null;
				$("#f_content1").hide();
				showItemPromotion($("#f_city_center_promotion"), p, function(a) {
					A = !1;
					if(1001 == a) {
						pnlLoading.show();
						var c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO;
						ajaxCall(c, {
							key : key,
							city : mainStatus.CITY_ID,
							tid : b.id,
							action : "build2"
						}, function(a) {
							userinfo.money = a.ret.money;
							refreshUserInfo();
							CMA.changeSecs(b.id, 0);
							showInfo(LNG.SUCCESS)
						})
					} else
						0 != a && (pnlLoading.show(), c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO, ajaxCall(c, {
							key : key,
							city : mainStatus.CITY_ID,
							tid : b.id,
							action : "build",
							iid : a
						}, function(a) {
							CMA.changeSecs(b.id, a.ret.secs);
							showInfo(LNG.SUCCESS)
						}));
					$("#f_content1").show()
				}, !0, C)
			}), !1
	}, D = function(a, b) {
		if(c) {
			var d = c[a], e = mainStatus.CITY_INFO.getLevel(a), h = d.upgrade[e];
			if(h) {
				if(5 == a) {
					b.find("#f_value b").html(h.v);
					var j = d.upgrade[e + 1];
					"undefined" == typeof j || null == j ? b.find("#f_value_next b").html("N/A") : b.find("#f_value_next b").html(j.v)
				}
				b.find("#f_title").html(d.name);
				Utils.loadImage(b.find("#f_img"), Utils.getBuildingImage(a));
				b.find("#f_desc").html(d.desc);
				b.find("#f_level").html(e);
				b.find("#resfood b").html(h.f);
				mainStatus.CITY_INFO[4] < h.f && b.find("#resfood b").css("color", "#FFD17A");
				b.find("#reswood b").html(h.w);
				mainStatus.CITY_INFO[6] < h.w && b.find("#reswood b").css("color", "#FFD17A");
				b.find("#resiron b").html(h.i);
				mainStatus.CITY_INFO[8] < h.i && b.find("#resiron b").css("color", "#FFD17A");
				b.find("#resgold b").html(h.g);
				mainStatus.CITY_INFO[2] < h.g && b.find("#resgold b").css("color", "#FFD17A");
				h = buildtime(h.t, mainStatus.CITY_INFO[22]);
				"undefined" != typeof statinfo.vs && null != statinfo.vs && (h *= statinfo.vs);
				b.find("#clock b").html(Utils.timeString2(Math.ceil(h)));
				d.upgrade[e + 1] ? 11 == a && (5 > mainStatus.CITY_INFO[12] || 5 > mainStatus.CITY_INFO[13] || 5 > mainStatus.CITY_INFO[14] || 5 > mainStatus.CITY_INFO[15]) ? (b.find("#f_upgrade").hide(), b.find("#f_cd1").hide(), b.find("#f_desc").html('<font style="color:#FFD17A">' + b.find("#f_desc").html() + "</font>")) : (b.find("#f_upgrade").show(), b.find("#f_build_promotion").hide()) : (b.find("#f_upgrade").hide(), b.find("#f_cd1").hide())
			}
		}
	}, e = function() {
		$.each(t, function(a, b) {
			D(b.buildtype, b.panel)
		})
	}, r = function(a, b) {
		$.each(t, function(a, c) {
			c.buildtype == b && D(c.buildtype, c.panel)
		})
	};
	$.each(t, function(a, b) {
		var c = b.panel, d = t[a].buildtype, h = c.find("#f_cd1 p"), e = c.find("#f_upgrade"), j = c.find("#f_build_promotion");
		k.bind(CMA.getTickEventId(1, d), function(a) {
			e.hide();
			j.show();
			h.html(Utils.timeString2(a))
		});
		k.bind(CMA.getDoneEventId(1, d), function() {
			r(e, d)
		})
	});
	e();
	(function() {
		$.each(t, function(a, b) {
			b.panel.find("#f_upgrade").click(function() {
				z(b);
				return !1
			});
			b.panel.find("#f_build_promotion").click(function() {
				d(b);
				return !1
			})
		})
	})();
	CMA.forceNotify();
	k.bind("cityinfoupdate", e);
	var e = $("#f_make1"), n = $("#f_make2"), y = null, j = !1, b = function(a, b, c) {
		function d() {
			var i = Math.ceil(Math.pow(n, 1.5)), i = i > e ? e : i, i = h + b * i;
			0 < b && i > c || 0 > b && i < c ? ( j = !1, clearInterval(y), a.value = c) : a.value = i;
			n++
		}

		j = !0;
		var h = Utils.parseInt(a.value, 0), e = Math.abs(c - h), n = 1;
		d();
		1 < e && setTimeout(function() {
			clearInterval(y);
			j && ( y = setInterval(d, 100))
		}, 300)
	}, h = function() {
		j = !1;
		clearInterval(y);
		timer = null
	};
	$.each({
		1 : e,
		2 : n
	}, function(a, c) {
		var d = c.find("#f_num").find("input").get(0);
		c.find("#f_num_minus").unbind();
		c.find("#f_num_minus").bind("mousedown touchstart", function() {
			h();
			b(d, -1, 0)
		});
		c.find("#f_num_minus").bind("mouseup touchend", function() {
			h()
		});
		var e = 0, e = "1" == a ? Math.floor(mainStatus.CITY_INFO[2] / 1100) : Math.floor(mainStatus.CITY_INFO[2] / 11E3);
		c.find("#f_num_plus").unbind();
		c.find("#f_num_plus").bind("mousedown touchstart", function() {
			h();
			b(d, 1, e)
		});
		c.find("#f_num_plus").bind("mouseup touchend", function() {
			h()
		});
		c.find("#f_num_max").unbind().click(function() {
			h();
			d.value = e
		});
		c.find("#f_upgrade").click(function() {
			var b = mainStatus.getCity();
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MARKET_GOLD, {
				key : key,
				city : b.id,
				type : a,
				num : d.value
			}, function(a) {
				mainStatus.CITY_INFO[2] -= a.ret;
				$("#f_make1").find("#f_cd1 p").text(Utils.timeString2(a.ext[0]));
				$("#f_make2").find("#f_cd1 p").text(Utils.timeString2(a.ext[0]));
				//$("#f_make1").find("#f_upgrade").hide();
				//$("#f_make2").find("#f_upgrade").hide();
				showInfo(LNG.SUCCESS)
			});
			return !1
		})
	});
	var A = !1;
	a.find("#f_tab1,#f_tab2,#f_tab3,#f_tab4").click(function(b) {
		if(A)
			return !1;
		$(this).hasClass("tab_inactive") && (a.find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), a.find("#f_content1,#f_content2,#f_content3,#f_content4,#f_city_center_info,#f_city_exp_info").hide(), $(this).trigger("tab", b));
		return !1
	});
	a.find("#f_tab1").bind("tab", function() {
		a.find("#f_content1").show();
		a.find("#f_city_center_info").show();
		null != i && (i.refresh(), i.setPosition(0, 0));
		return !1
	});
	var B = null;
	a.find("#f_tab2").bind("tab", function() {
		a.find("#f_city_center_info").show();
		if(0 != userinfo.conq[0]) {
			pnlLoading.show();
			var b = CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO;
			ajaxCall(b, {
				key : key,
				action : "conquerend"
			}, function(b) {
				a.find("#f_content2_title2 strong").text(Utils.timeString(b.ret.sec))
			});
			a.find("#f_content2_title1").hide();
			a.find("#f_content2_title2 b").text(userinfo.conq[2]);
			a.find("#f_content2_title2").show();
			a.find("#f_content2_title3").hide();
			a.find("#f_content2_list_title").hide();
			a.find("#f_content2_list").hide();
			a.find("#f_content2").show();
			null != i && (i.refresh(), i.setPosition(0, 0))
		} else
			pnlLoading.show(), b = CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, ajaxCall(b, {
				key : key,
				action : "list_conquered"
			}, function(b) {
				B = b.ret.list;
				q();
				a.find("#f_content2").show();
				null != i && (i.refresh(), i.setPosition(0, 0))
			});
		return !1
	});
	var x = null;
	a.find("#f_tab3").bind("tab", function() {
		a.find("#f_city_exp_info").show();
		a.find("#f_content3").show();
		null == x && (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, {
			key : key,
			action : "exp"
		}, function(b) {
			x = b.ret;
			a.find("#f_city_exp_info b").text(x[0]);
			a.find("#f_city_exp_info strong").text(x[1]);
			userinfo.protection = x[2];
			refreshUserInfo()
		}));
		v();
		u();
		null != i && (i.refresh(), i.setPosition(0, 0));
		return !1
	});
	a.find("#f_tab4").bind("tab", function() {
		a.find("#f_city_center_info").show();
		a.find("#f_content4").show();
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, {
			key : key,
			action : "g_cd"
		}, function(a) {
			var b = !0;
			if("" != a.ret && (0 < a.ret[0] && ($("#f_make1").find("#f_cd1 p").text(Utils.timeString2(a.ret[0])), $("#f_make2").find("#f_cd1 p").text(Utils.timeString2(a.ret[0])), $("#f_make1").find("#f_upgrade").hide(), $("#f_make2").find("#f_upgrade").hide(), b = !1), 0 < a.ret[1] ? ($("#f_content4_vacation_clock b").text(Utils.timeString2(a.ret[1])), $("#f_content4_vacation_clock").show(), $("#f_content4_vacation_do").hide(), 0 < a.ret[3] - 172800 && $("#f_content4_vacation_end").show()) : 0 < a.ret[2] && ($("#f_content4_vacation_cd p").text(Utils.timeString2(a.ret[2])), $("#f_content4_vacation_cd").show(), $("#f_content4_vacation_do").hide()), ispvp)) {
				var c = mainStatus.CITY_INFO;
				c[25] = a.ret[4];
				$("#f_content4_durab_point").text(c[25]);
				0 < a.ret[5] ? ($("#f_content4_durab_cd p").text(Utils.timeString2(a.ret[5])), $("#f_content4_durab_cd").show(), $("#f_content4_durab_do").hide()) : ($("#f_content4_durab_cd").hide(), $("#f_content4_durab_do").show());
				0 < a.ret[6] ? ($("#f_content4_sleep_clock b").text(Utils.timeString2(a.ret[6])), $("#f_content4_sleep_clock").show(), $("#f_content4_sleep_do").hide()) : ($("#f_content4_sleep_clock").hide(), $("#f_content4_sleep_do").show())
			}
			b && ($("#f_make1").find("#f_cd1 p").text(""), $("#f_make2").find("#f_cd1 p").text(""), $("#f_make1").find("#f_upgrade").show(), $("#f_make2").find("#f_upgrade").show())
		});
		0 < userinfo.protection ? ($("#f_content4_stop_protection").show(), $("#f_content4_vacation").hide()) : ($("#f_content4_stop_protection").hide(), ispvp ? $("#f_content4_vacation").hide() : $("#f_content4_vacation").show());
		if(ispvp) {
			var b = mainStatus.CITY_INFO;
			$("#f_content4_durab_point").text(b[25]);
			$("#f_content4_durab").show();
			$("#f_content4_sleep").show();
			$("#f_switch_to_original").show();
			$("#f_content4_mod_password").hide();
			$("#f_switch_to_pvp").hide()
		} else
			$("#f_content4_durab").hide(), $("#f_content4_sleep").hide(), $("#f_switch_to_original").hide(), $("#f_content4_mod_password").show(), $("#f_switch_to_pvp").show();
		var b = !0, c;
		for(c in userinfo.city)
		if(mainStatus.CITY_ID > userinfo.city[c].id) {
			b = !1;
			break
		}
		b ? ($("#f_content4_abandon_castle_cancel").hide(), $("#f_content4_abandon_castle_do").hide()) : 0 == mainStatus.CITY_INFO[24] ? ($("#f_content4_abandon_castle_cancel").hide(), $("#f_content4_abandon_castle_do").show()) : ($("#f_content4_abandon_castle_cd p").text(Utils.timeString(mainStatus.CITY_INFO[24])), $("#f_content4_abandon_castle_cancel").show(), $("#f_content4_abandon_castle_do").hide());
		null != i && (i.refresh(), i.setPosition(0, 0));
		return !1
	});
	a.find("#f_content4_modify_password_do").click(function() {
		16 < keyinfo.user.length ? $("#mod_account").text(LNG.ACCOUNT_SYS) : $("#mod_account").text(keyinfo.user);
		$("#divModPassword").show();
		$("#f_content").hide()
	});
	a.find("#f_content4_bug_report_do").click(function() {
		GlobalNav.WriteMail(":help")
	});
	a.find("#f_content4_sleep_do").click(function() {
		showConfirm(LNG.CONFIRMSLEEP, function() {
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, {
				key : key,
				action : "sleep",
				city : mainStatus.getCity().id
			}, function(a) {
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
	a.find("#f_content4_stop_protection_do").click(function() {
		if("undefined" == typeof LNG.CONFIRMSTOPPROTECTION)
			LNG.CONFIRMSTOPPROTECTION = "You will stop your New Player Protection, are you sure to proceed?";
		showConfirm(LNG.CONFIRMSTOPPROTECTION, function() {
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, {
				key : key,
				action : "endp"
			}, function() {
				userinfo.protection = 0;
				$("#f_content4_stop_protection").hide()
			})
		});
		return !1
	});
	a.find("#f_content4_switch_original_do").click(function() {
		showConfirm(LNG.CONFIRM_SWITCH, function() {
			pnlLoading.show();
			ajaxCall(CONFIG.MASTERHOST + CONFIG.MASTER_QUERY, {
				user : keyinfo.user,
				action : "getserver"
			}, function(a) {
				a = a.ret.server;
				keyinfo.pvp = 0;
				keyinfo.server = a;
				Utils.setCookie("key", keyinfo);
				showInfo(LNG.SWITCH_DONE, function() {
					location.href = "start.html"
				})
			})
		});
		return !1
	});
	a.find("#f_content4_forum_visit").click(function() {
		location.href = "js-call:brow?" + LNG.FORUM_URL
	});
	a.find("#f_content4_switch_pvp_do").click(function() {
		showConfirm(LNG.CONFIRM_SWITCH, function() {
			pnlLoading.show();
			ajaxCall(CONFIG.MASTERHOST + CONFIG.MASTER_QUERY, {
				user : keyinfo.user,
				action : "getpvpserver"
			}, function(a) {
				var b = a.ret.server;
				pnlLoading.show();
				ajaxCall(b + CONFIG.FUNC_LOGIN, {
					user : keyinfo.user,
					action : "synckey"
				}, function() {
					keyinfo.pvp = 1;
					keyinfo.server = b;
					Utils.setCookie("key", keyinfo);
					showInfo(LNG.SWITCH_DONE, function() {
						location.href = "start.html?_l=" + window._l
					})
				})
			})
		});
		return !1
	});
	a.find("#f_content4_vacation_do").click(function() {
		$("#f_vacation_start").show();
		window.selectProxy.proxySelect($("#f_content4_vacation_length")[0]);
		return !1
	});
	a.find("#f_content4_vacation_end").click(function() {
		showConfirm(LNG.CONFIRMSTOPVACATION, function() {
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, {
				key : key,
				action : "vacation_end"
			}, function(a) {
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
	a.find("#f_vacation_start_cancel").click(function() {
		$("#f_vacation_start").hide();
		return !1
	});
	a.find("#f_vacation_start_confirm").click(function() {
		var a = parseInt($("#f_content4_vacation_length").val());
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, {
			key : key,
			action : "vacation_start",
			days : a,
			city : mainStatus.getCity().id
		}, function(a) {
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
	$("#f_content4_vacation_length").change(function() {
		var a = 2E5;
		14 == parseInt($("#f_content4_vacation_length").val()) && ( a = 5E5);
		$("#f_content4_vacation_resgold b").text(a);
		return !1
	});
	a.find("#f_content4_durab_do").click(function() {
		var b = mainStatus.getCity();
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CITYINFO, {
			key : key,
			city : b.id,
			action : "op_pop"
		}, function(b) {
			mainStatus.CITY_INFO[25] = b.ret[0];
			mainStatus.CITY_INFO[2] = b.ret[2];
			a.find("#f_content4_durab_do").hide();
			a.find("#f_content4_durab_cd").show();
			a.find("#f_content4_durab_cd p").text(Utils.timeString(b.ret[1]));
			showInfo(LNG.SUCCESS)
		});
		return !1
	});
	a.find("#f_content4_abandon_castle_do").click(function() {
		if("undefined" == typeof LNG.CONFIRMABANDONCASTLE)
			LNG.CONFIRMABANDONCASTLE = "You will abandon this castle, are you sure to proceed?";
		showConfirm(LNG.CONFIRMABANDONCASTLE, function() {
			var b = mainStatus.getCity();
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CITYINFO, {
				key : key,
				city : b.id,
				action : "abandon"
			}, function(b) {
				mainStatus.CITY_INFO[24] = b.ret.cd;
				a.find("#f_content4_abandon_castle_do").hide();
				a.find("#f_content4_abandon_castle_cancel").show();
				$("#f_content4_abandon_castle_cd p").text(Utils.timeString(mainStatus.CITY_INFO[24]))
			})
		});
		return !1
	});
	a.find("#f_content4_abandon_castle_cancel").click(function() {
		var b = mainStatus.getCity();
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CITYINFO, {
			key : key,
			city : b.id,
			action : "cancel_abandon"
		}, function() {
			mainStatus.CITY_INFO[24] = 0;
			a.find("#f_content4_abandon_castle_do").show();
			a.find("#f_content4_abandon_castle_cancel").hide();
			$("#f_content4_abandon_castle_cd p").text("")
		});
		return !1
	});
	a.find("#f_close").click(function() {
		showCity();
		return !1
	});
	a.find("#f_city_house_more").click(function() {
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
	a.find("#f_city_iron_more").click(function() {
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
	a.find("#f_city_food_more").click(function() {
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
	a.find("#f_city_wood_more").click(function() {
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
	a.find("#f_city_office_more").click(function() {
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
	a.find("#f_city_storage_more").click(function() {
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
	a.find("#f_city_gold_more").click(function() {
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
	a.find("#f_city_research_more").click(function() {
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
	a.find("#f_city_military_more").click(function() {
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
	a.find("#f_city_hero_more").click(function() {
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
	a.find("#f_city_defense_more").click(function() {
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
	a.find("#f_city_defense_down").click(function() {
		m(12)
	});
	a.find("#f_city_hero_down").click(function() {
		m(10)
	});
	a.find("#f_city_military_down").click(function() {
		m(8)
	});
	a.find("#f_city_research_down").click(function() {
		m(9)
	});
	a.find("#f_city_gold_down").click(function() {
		m(3)
	});
	a.find("#f_city_iron_down").click(function() {
		m(2)
	});
	a.find("#f_city_food_down").click(function() {
		m(4)
	});
	a.find("#f_city_wood_down").click(function() {
		m(1)
	});
	a.find("#f_city_office_down").click(function() {
		m(13)
	});
	a.find("#f_city_storage_down").click(function() {
		m(11)
	});
	a.find("#f_city_house_down").click(function() {
		m(5)
	});
	a.find("#f_city_downtown_goto").click(function() {
		$("#f_tab1").click();
		return !1
	});
	a.find("#f_city_res_goto").click(function() {
		main_loadDiv("f_city_resource.html");
		return !1
	});
	a.find("#f_city_research_goto").click(function() {
		main_loadDiv("f_city_research.html");
		return !1
	});
	a.find("#f_city_military_goto").click(function() {
		main_loadDiv("f_city_military.html");
		return !1
	});
	a.find("#f_city_hero_goto").click(function() {
		main_loadDiv("f_city_hero.html");
		return !1
	});
	a.find("#f_city_defense_goto").click(function() {
		main_loadDiv("f_city_wall.html");
		return !1
	});
	a.find("#f_content3_buff_promotion").click(function() {
		A = !0;
		$("#f_content3").hide();
		showItemPromotion($("#f_city_center_promotion"), [{
			id : 166,
			shop : 1
		}, {
			id : 167,
			shop : 1
		}, {
			id : 80,
			shop : 1
		}, {
			id : 140,
			shop : 1
		}, {
			id : 141,
			shop : 1
		}, {
			id : 142,
			shop : 1
		}, {
			id : 143,
			shop : 1
		}, {
			id : 144,
			shop : 1
		}, {
			id : 145,
			shop : 1
		}, {
			id : 146,
			shop : 1
		}, {
			id : 147,
			shop : 1
		}, {
			id : 148,
			shop : 1
		}, {
			id : 125,
			shop : 1
		}], function(a) {
			0 < a && v();
			A = !1;
			$("#f_content3").show()
		}, !1)
	});
	a.find("#f_content3_land_promotion").click(function() {
		A = !0;
		$("#f_content3").hide();
		showItemPromotion($("#f_city_center_promotion"), [{
			id : 128,
			shop : 1
		}], function(a) {
			A = !1;
			$("#f_content3").show();
			if(0 < a) {
				var b = function() {
					k.unbind(b);
					u()
				};
				k.bind("cityinfoupdate", b)
			}
		}, !1);
		null != i && (i.refresh(), i.setPosition(0, 0))
	});
	a.find("#f_content3_wood_promotion").click(function() {
		A = !0;
		$("#f_content3").hide();
		showItemPromotion($("#f_city_center_promotion"), [{
			id : 123,
			shop : 1
		}, {
			id : 119,
			shop : 1
		}, {
			id : 120,
			shop : 1
		}], function(a) {
			A = !1;
			0 < a && (v(), u());
			$("#f_content3").show()
		}, !1);
		null != i && (i.refresh(), i.setPosition(0, 0))
	});
	a.find("#f_content3_food_promotion").click(function() {
		A = !0;
		$("#f_content3").hide();
		showItemPromotion($("#f_city_center_promotion"), [{
			id : 126,
			shop : 1
		}, {
			id : 119,
			shop : 1
		}, {
			id : 120,
			shop : 1
		}], function(a) {
			A = !1;
			0 < a && (v(), u());
			$("#f_content3").show()
		}, !1);
		null != i && (i.refresh(), i.setPosition(0, 0))
	});
	a.find("#f_content3_gold_promotion").click(function() {
		A = !0;
		$("#f_content3").hide();
		showItemPromotion($("#f_city_center_promotion"), [{
			id : 129,
			shop : 1
		}, {
			id : 119,
			shop : 1
		}, {
			id : 120,
			shop : 1
		}, {
			id : 112,
			shop : 1
		}, {
			id : 131,
			shop : 1
		}], function(a) {
			A = !1;
			$("#f_content3").show();
			0 < a && (v(), u())
		}, !1);
		null != i && (i.refresh(), i.setPosition(0, 0))
	});
	a.find("#f_content3_iron_promotion").click(function() {
		A = !0;
		$("#f_content3").hide();
		showItemPromotion($("#f_city_center_promotion"), [{
			id : 121,
			shop : 1
		}, {
			id : 119,
			shop : 1
		}, {
			id : 120,
			shop : 1
		}], function(a) {
			A = !1;
			0 < a && (v(), u());
			$("#f_content3").show()
		}, !1);
		null != i && (i.refresh(), i.setPosition(0, 0))
	});
	a.find("#f_vacation_more_close").click(function() {
		$("#f_vacation_more").hide()
	});
	a.find("#f_content4_vacation_detail").click(function() {
		$("#f_vacation_more").show()
	});
	a.css("background-image", "url(img/bg/view.jpg)");
	(function() {
		"undefined" != typeof statinfo.ce && null != statinfo.ce && 1 == statinfo.ce ? $("#f_tab2").show() : $("#f_tab2").hide();
		var a = Utils.getCookie("page");
		null != a && "" != a && ($("#" + a).click(), Utils.delCookie("page"));
		i = new iScroll("scroller", {
			desktopCompatibility : !0
		});
		"undefined" != typeof mainStatus.SNAME && null != mainStatus.SNAME ? ($("#f_city_center_info b").text(mainStatus.SNAME), pnlLoading.hide()) : ( a = CONFIG.MASTER_NAMING, a = "undefined" == typeof a || null == a ? CONFIG.MASTERHOST + "naming.php" : CONFIG.MASTERHOST + a, ajaxCall(a, {
			s : CONFIG.MYHOST.substring(7, CONFIG.MYHOST.length - 1)
		}, function(a) {
			mainStatus.SNAME = a.ret;
			$("#f_city_center_info b").text(mainStatus.SNAME)
		}))
	})()
});
defineSubView("f_city_hero", function() {
	function v(a) {
		var b = mainStatus.ITEM_DATA[a.sid];
		if(!("undefined" == typeof b || null == b)) {
			var c = null;
			1 == b.type ? ( c = $("#f_sample_hero_slot_weapon"), $("#f_sample_hero_slot_weapon_txt").hide()) : 2 == b.type ? ( c = $("#f_sample_hero_slot_armor"), $("#f_sample_hero_slot_armor_txt").hide()) : 3 == b.type ? ( c = $("#f_sample_hero_slot_mount"), $("#f_sample_hero_slot_mount_txt").hide()) : 4 == b.type || 5 == b.type ? ( c = $("#f_sample_hero_slot_book"), $("#f_sample_hero_slot_book_txt").hide()) : 6 == b.type && ( c = $("#f_sample_hero_slot_ring"), $("#f_sample_hero_slot_ring_txt").hide());
			null != c && (c.css("background-image", "url(img/item/sample.gif)"), Utils.loadImage(c, Utils.getItemImage(a.sid)))
		}
	}

	function s(a) {
		var b = mainStatus.HERO_DATA[a.gid];
		if("undefined" == typeof b || null == b)
			showInfo(LNG.ERROR.CLIENT.NEEDUPDATE);
		else if($("#f_content3_info_rank").attr("src", Utils.getHeroRankImage(b.race, b.rank)), Utils.loadImage($("#f_content3_info_img"), Utils.getHeroImage(a.gid)), $("#f_content3_info_name").text(b.name), $("#f_content3_info_level").text(a.g), 0 < a.w ? $("#f_content3_info_winning").html(translate(LNG.ARENAWINNING, a.w)) : $("#f_content3_info_winning").html(""), $("#f_content3_info_intro").html(b.desc), $("#f_content3_info_power b").text(a.p), $("#f_content3_info_wisdom b").text(a.i), $("#f_content3_info_charisma b").text(a.c1), $("#f_content3_info_loyalty b").text(a.f), $("#f_content3_info_vigor b").text(a.e), $("#f_content3_info_exp").text(a.ex), $("#f_content3_info_texp").text(a.te), $("#f_content3_info_status p b").text(1 == a.fy ? LNG.HEROGUARD : 2 == a.fy ? LNG.HEROADVISER : LNG.HEROSTATE[a.s]), $("#f_content3_info_twin").text(a.tw), $("#f_content3_info_tlose").text(a.tl), 2 == a.s)
			$("#f_content3_fire").show(), $("#f_content3_reward").hide(), $("#f_content3_goarena").hide(), $("#f_content3_resurrect").show(), $("#f_content3_move_to").hide(), $("#f_content3_move_cities").hide(), $("#f_content3_info_vigor_promotion").hide();
		else if(0 == a.s && 0 == a.fy)
			if($("#f_content3_fire").show(), $("#f_content3_reward").show(), $("#f_content3_goarena").show(), $("#f_content3_resurrect").hide(), $("#f_content3_info_vigor_promotion").show(), 1 < userinfo.city.length) {
				$("#f_content3_move_to").show();
				$("#f_content3_move_cities").empty().unbind();
				for( a = 0; a < userinfo.city.length; a++)
					b = userinfo.city[a], b.id != mainStatus.getCity().id && ($("#f_content3_move_cities").append('<OPTION VALUE="' + a + '">' + b.name + " (" + b.x + "/" + b.y + ")</OPTION>"), window.selectProxy.proxySelect($("#f_content3_move_cities")[0]))
			} else
				$("#f_content3_move_to").hide(), $("#f_content3_move_cities").hide();
		else
			$("#f_content3_fire").hide(), $("#f_content3_reward").show(), $("#f_content3_goarena").show(), $("#f_content3_resurrect").hide(), $("#f_content3_move_to").hide(), $("#f_content3_move_cities").hide(), $("#f_content3_info_vigor_promotion").show()
	}

	function u(a) {
		y = a;
		a = n[a];
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
			key : key,
			city : mainStatus.getCity().id,
			id : a.id,
			action : "list_gen_item"
		}, function(a) {
			j = a.ret.heroitem;
			for( a = 0; a < j.length; a++)
				v(j[a].item)
		});
		s(a);
		$("#f_content3").hide();
		$("#f_content3_info").show();
		c();
		return !1
	}

	function q() {
		null != h && 0 < h.length ? ($("#f_content3_item_available").empty().unbind(), $.each(h, function(a, b) {
			var c = mainStatus.ITEM_DATA[b.sid];
			if(!("undefined" == typeof c || null == c)) {
				var f = LNG.ITEMRANK[c.rank], d = c.desc;
				if("undefined" != typeof b.attr && null != b.attr)
					for(var e = 0; e < b.attr.length; e++)
						0 != b.attr[e] && ( d = translate(d, b.attr[e]));
				c = '<div style="position:relative;height: 60px;"><div id="f_content3_item_available_img' + b.id + '" class="itemicon1" style="top: 5px; left: 10px;"></div><div class="tooltip2" style="left: 70px; top: 5px; width: 400px; height:50px"><p><b><font color="' + f.color + '">' + c.name + '</font></b>&nbsp;<strong>(<font color="' + f.color + '">' + f.name + "</font>)</strong>&nbsp;<b>" + (0 < b.up ? "+" + b.up : "") + '</b></p><p style="position:relative;top:6px;">' + d + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 240px;"><li><em class="gold"></em><b>' + c.price + '</b></li></ul><div id="f_content3_item_available' + b.id + '" class="funcbutton" style="top: -3px; left: 330px;">' + LNG.PUT_ON + "</div></div></div>";
				$("#f_content3_item_available").append(c);
				Utils.loadImage($("#f_content3_item_available_img" + b.id), Utils.getItemImage(b.sid));
				$("#f_content3_item_available" + b.id).click(function() {
					return i(a)
				})
			}
		})) : $("#f_content3_item_available").html('<br>&nbsp;<b><font class="font14">N/A</font></b><br><br>')
	}

	function m() {
		var a = null;
		A = null;
		B = 0;
		if(1 == b)
			for(var c = 0; c < j.length; c++) {
				var f = mainStatus.ITEM_DATA[j[c].item.sid];
				if(!("undefined" == typeof f || null == f) && 1 == f.type) {
					A = j[c].item;
					a = f;
					B = c;
					break
				}
			}
		else if(2 == b)
			for( c = 0; c < j.length; c++) {
				if( f = mainStatus.ITEM_DATA[j[c].item.sid], !("undefined" == typeof f || null == f) && 2 == f.type) {
					A = j[c].item;
					a = f;
					B = c;
					break
				}
			}
		else if(3 == b)
			for( c = 0; c < j.length; c++) {
				if( f = mainStatus.ITEM_DATA[j[c].item.sid], !("undefined" == typeof f || null == f) && 3 == f.type) {
					A = j[c].item;
					a = f;
					B = c;
					break
				}
			}
		else if(4 == b)
			for( c = 0; c < j.length; c++) {
				if( f = mainStatus.ITEM_DATA[j[c].item.sid], !("undefined" == typeof f || null == f))
					if(4 == f.type || 5 == f.type) {
						A = j[c].item;
						a = f;
						B = c;
						break
					}
			}
		else if(5 == b)
			for( c = 0; c < j.length; c++)
				if( f = mainStatus.ITEM_DATA[j[c].item.sid], !("undefined" == typeof f || null == f) && 6 == f.type) {
					A = j[c].item;
					a = f;
					B = c;
					break
				}
		if(null != A) {
			Utils.loadImage($("#f_content3_item_active_icon"), Utils.getItemImage(A.sid));
			c = LNG.ITEMRANK[a.rank];
			f = a.desc;
			if("undefined" != typeof A.attr && null != A.attr)
				for(var d = 0; d < A.attr.length; d++)
					0 != A.attr[d] && ( f = translate(f, A.attr[d]));
			$("#f_content3_item_active_name b font").text(a.name);
			$("#f_content3_item_active_name b font").css("color", c.color);
			$("#f_content3_item_active_name strong font").text(c.name);
			$("#f_content3_item_active_name strong font").css("color", c.color);
			0 < A.up ? $("#f_content3_item_active_name strong span").text("+" + A.up) : $("#f_content3_item_active_name strong span").text("");
			$("#f_content3_item_active_info").html(f);
			$("#f_content3_item_active_price b").text(a.price);
			$("#f_content3_item_active").show()
		} else
			$("#f_content3_item_active").hide()
	}

	function i(a) {
		var c = r;
		null != n && y < n.length && ( c = n[y]);
		if(null == c)
			return !1;
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
			key : key,
			city : mainStatus.getCity().id,
			id : c.id,
			slot : b,
			i_id : h[a].id,
			action : "item_equip"
		}, function(f) {
			c.p = f.ret.hero.p;
			c.i = f.ret.hero.i;
			c.c1 = f.ret.hero.c1;
			c.c2 = f.ret.hero.c2;
			c.np = f.ret.hero.np;
			c.ni = f.ret.hero.ni;
			c.nc1 = f.ret.hero.nc1;
			c.nc2 = f.ret.hero.nc2;
			$("#f_content3_info_power b").text(c.p);
			$("#f_content3_info_wisdom b").text(c.i);
			$("#f_content3_info_charisma b").text(c.c1);
			f = null;
			if(1 == b)
				for(var d = 0; d < j.length; d++) {
					var e = mainStatus.ITEM_DATA[j[d].item.sid];
					if(!("undefined" == typeof e || null == e) && 1 == e.type) {
						f = j[d];
						break
					}
				}
			else if(2 == b)
				for( d = 0; d < j.length; d++) {
					if( e = mainStatus.ITEM_DATA[j[d].item.sid], !("undefined" == typeof e || null == e) && 2 == e.type) {
						f = j[d];
						break
					}
				}
			else if(3 == b)
				for( d = 0; d < j.length; d++) {
					if( e = mainStatus.ITEM_DATA[j[d].item.sid], !("undefined" == typeof e || null == e) && 3 == e.type) {
						f = j[d];
						break
					}
				}
			else if(4 == b)
				for( d = 0; d < j.length; d++) {
					if( e = mainStatus.ITEM_DATA[j[d].item.sid], !("undefined" == typeof e || null == e))
						if(4 == e.type || 5 == e.type) {
							f = j[d];
							break
						}
				}
			else if(5 == b)
				for( d = 0; d < j.length; d++)
					if( e = mainStatus.ITEM_DATA[j[d].item.sid], !("undefined" == typeof e || null == e) && 6 == e.type) {
						f = j[d];
						break
					}
			null != f ? ( d = f.item, f.item = h[a], h[a] = d) : ( f = {
				id : 0,
				item : h[a]
			}, j.push(f), h.splice(a, 1));
			q();
			m();
			v(f.item)
		});
		return !1
	}

	function e() {
		var a = $("#f_content3_hero_list");
		a.empty().unbind();
		null != n && $.each(n, function(b, c) {
			var f = mainStatus.HERO_DATA[c.gid];
			if(!("undefined" == typeof f || null == f)) {
				var d = '<div style="position:relative; height:75px;"><div class="font12" style="left:0px; top: 0px; width: 70px;text-align:center;position:absolute;"><img id="f_content3_hero_list_img' + c.id + '" src="img/hero/sample.gif"/><br><b>' + f.name + '</b></div><img src="' + Utils.getHeroRankImage(f.race, f.rank) + '" style="position:absolute;left:5px;top:35px;"/><div class="font12" style="left:70px; top: 30px; width: 30px;text-align:center;position:absolute;">' + c.g + '</div><div class="font12" style="left:100px; top: 30px; width: 30px;text-align:center;position:absolute;">' + c.p + '</div><div class="font12" style="left:130px; top: 30px; width: 30px;text-align:center;position:absolute;">' + c.i + '</div><div class="font12" style="left:160px; top: 30px; width: 30px;text-align:center;position:absolute;">' + c.c1 + '</div><div id="f_content3_hero_fealty' + c.id + '" class="font12" style="left:190px; top: 30px; width: 30px;text-align:center;position:absolute;">' + c.f + '</div><div id="f_content3_hero_vigor' + c.id + '" class="font12" style="left:220px; top: 30px; width: 30px;text-align:center;position:absolute;">' + c.e + '</div><div class="font12" style="left:250px; top: 30px; width: 65px;text-align:center;position:absolute;">' + c.c2 + '</div><div class="font12" style="left:315px; top: 30px; width: 50px;text-align:left;position:absolute;">' + (1 == c.fy ? LNG.HEROGUARD : 2 == c.fy ? LNG.HEROADVISER : LNG.HEROSTATE[c.s]) + '</div><div id="f_content3_hero_ops" style="position:absolute;top:25px;left: 210px;display:none;">';
				2 != c.s && (d += '<div id="f_content3_hero_arena' + c.id + '" class="funcbutton" style="top:0px;left:0px;">' + LNG.HERO_ARENA + '</div><div id="f_content3_hero_reward' + c.id + '" class="funcbutton" style="top: 0px;left:70px;">' + LNG.HERO_REWARD + "</div>");
				var d = d + ('<div id="f_content3_hero_list' + c.id + '" class="funcbutton" style="top: 0px;left:140px;">' + LNG.HERO_MANAGE + '</div></div><div id="f_content3_hero_more" class="plusbutton" style="top: 25px; left: 410px;"></div></div>'), e = $(d);
				a.append(e);
				Utils.loadImage2($("#f_content3_hero_list_img" + c.id), Utils.getHeroImage(c.gid));
				e.find("#f_content3_hero_more").click(function() {
					a.find("#f_content3_hero_ops").hide();
					a.find("#f_content3_hero_more.minusbutton").not(this).removeClass("minusbutton").addClass("plusbutton");
					e.find("#f_content3_hero_more").hasClass("plusbutton") ? (e.find("#f_content3_hero_ops").show(), e.find("#f_content3_hero_more").removeClass("plusbutton").addClass("minusbutton")) : e.find("#f_content3_hero_more").removeClass("minusbutton").addClass("plusbutton");
					return !1
				});
				$("#f_content3_hero_list" + c.id).click(function() {
					return u(b)
				});
				2 != c.s && ($("#f_content3_hero_arena" + c.id).click(function() {
					if(0 >= c.e)
						return showInfo(translate(LNG.NOVIGOR, f.name)), !1;
					x = 1;
					pnlLoading.show();
					ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
						key : key,
						lv : c.g
					}, function(a) {
						if(null == a.ret.hero || 0 == a.ret.hero.length)
							showInfo(LNG.ERROR.CLIENT.NOMATCHARENA);
						else {
							var b = $("#f_content3_arena_list");
							b.html("");
							$.each(a.ret.hero, function(a, g) {
								var d = mainStatus.HERO_DATA[g.gid];
								if(!("undefined" == typeof d || null == d)) {
									var w = $('<div style="position:relative; height:75px;"><div class="font12" style="left:0px; top: 0px; width: 70px;text-align:center;position:absolute;"><img id="f_content3_arena_list_img' + g.id + '" src="img/hero/sample.gif"/><br><b>' + d.name + '</b></div><img src="' + Utils.getHeroRankImage(d.race, d.rank) + '" style="position:absolute;left:5px;top:35px;"/><div class="font12" style="left:70px; top: 30px; width: 40px;text-align:center;position:absolute;">' + g.g + '</div><div class="font12" style="left:110px; top: 30px; width: 30px;text-align:center;position:absolute;">' + g.w + '</div><ul class="reshead" style="position:absolute;left:150px;top:20px;"><li><em class="race' + g.r + '"></em><b>' + g.u + "</b></li>" + (0 >= g.gflag || "" == g.gname ? "" : '<li><em class="guild" style="background-image:url(' + Utils.getFlag(g.gflag) + ')"></em><b>' + g.gname + "</b></li>") + '</ul><div id="f_content3_arena_list' + g.id + '" class="funcbutton" style="top: 17px; left: 390px;">' + LNG.HERO_FIGHT + "</div></div>");
									b.append(w);
									Utils.loadImage2(b.find("#f_content3_arena_list_img" + g.id), Utils.getHeroImage(g.gid));
									b.find("#f_content3_arena_list" + g.id).click(function() {
										$("#f_content3_arena_fight").show();
										$("#f_content3_arena_fight p").show();
										$("#f_content3_arena_fight_my img").attr("src", Utils.getHeroImage(c.gid));
										$("#f_content3_arena_fight_my b").text(f.name);
										$("#f_content3_arena_fight_enemy img").attr("src", Utils.getHeroImage(g.gid));
										$("#f_content3_arena_fight_enemy b").text(d.name);
										setTimeout(function() {
											ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
												key : key,
												gid : c.id,
												tgid : g.id
											}, function(a) {
												c.e--;
												//0 < a.ret.win ? (c.w++, c.tw++, b.find("#f_content3_arena_list" + g.id).unbind().remove()) : (c.w = 0, c.tl++);
                                                var fightResult;
                                                if (0 < a.ret.win) {
                                                	(c.w++, c.tw++);
                                                	//fightResult = "[" + c.ex + "/" + c.te + "/"+c.id+"/"+g.id+"]";
                                                	fightResult = "["+c.id+"/"+g.id+"]";
                                                } else {
                                                	(c.w = 0, c.tl++);
                                                	fightResult = "";
                                                }
												c.ex += a.ret.exp;
												$("#f_content3_hero_vigor" + c.id).text(c.e);
												$("#f_content3_arena_fight p").hide();
												a = translate(LNG.ARENARESULT[3 + a.ret.win], a.ret.exp, f.name);
												showInfo(a + fightResult, function() {
													$("#f_content3_arena_fight").hide()
												})
											}, function() {
												$("#f_content3_arena_fight").hide()
											})
										}, 500);
										return !1
									})
								}
							});
							$("#f_content3").hide();
							$("#f_content3_arena").show();
							null != p && (p.refresh(), p.setPosition(0, 0))
						}
					});
					return !1
				}), $("#f_content3_hero_reward" + c.id).click(function() {
					if(100 <= c.f)
						return showInfo(LNG.ERROR.CLIENT.HEROMAXLOYALTY), !1;
					if(1E3 > mainStatus.CITY_INFO[2])
						showInfo(LNG.ERROR.CLIENT.GOLDNOTENOUGH);
					else
						return showConfirm(translate(LNG.CONFIRMREWARD, f.name), function() {
							pnlLoading.show();
							ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
								key : key,
								id : c.id,
								action : "give",
								city : mainStatus.getCity().id,
								golds : 1E3
							}, function(a) {
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
		null == n ? (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
			key : key,
			city : mainStatus.getCity().id,
			action : "gen_list"
		}, function(a) {
			n = a.ret.hero;
			e();
			null != p && (p.refresh(), p.setPosition(0, 0))
		})) : (e(), null != p && (p.refresh(), p.setPosition(0, 0)))
	}

	function k() {
		d.find("#f_content4_list").empty().unbind();
		null != N && $.each(N, function(a, b) {
			var c = mainStatus.HERO_DATA[b.gid];
			if("undefined" != typeof c && null != c) {
				var f = '<div id="f_rumor' + b.gid + '" style="position:relative; height:80px;"><div id="f_rumor_img' + b.gid + '" class="icon1" style="top: 10px; left: 10px;"></div><img src="' + Utils.getHeroRankImage(c.race, c.rank) + '" style="position:absolute;left:10px;top:45px;"/><div class="tooltip2" style="left: 80px; top: 10px; width: 390px; height:68px;"><p><b>' + c.name + '</b>&nbsp;Lvl.<b>1</b></p><p style="position:relative;top:4px;">' + LNG.HERO_ATTACH + ":&nbsp;<b>" + b.a + "</b>&nbsp;&nbsp;&nbsp;" + LNG.HERO_DEFENCT + ":&nbsp;<b>" + b.d + "</b>&nbsp;&nbsp;&nbsp;" + LNG.HERO_WISDOM + ":&nbsp;<b>" + b.w + '</b></p><p style="position:relative;top:5px;">' + c.desc + "</p>", f = f + ('<div class="tooltip2" style="top: 3px; left: 240px;"><p>' + LNG.HERO_CLUES + ":&nbsp;<b>" + b.num + "</b>/<b>" + b.max + "</b></p></div>"), f = f + ('<div id="f_rumor_recruit' + b.gid + '" class="funcbutton" style="top: -3px; left: 320px;">'), f = b.num >= b.max ? f + LNG.HERO_RECRUIT : f + LNG.HERO_IGNORE;
				d.find("#f_content4_list").append(f + "</div></div></div>");
				Utils.loadImage(d.find("#f_rumor_img" + b.gid), Utils.getHeroImage(b.gid));
				d.find("#f_rumor_recruit" + b.gid).click(function() {
					var a = CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT;
					b.num >= b.max ? (pnlLoading.show(), ajaxCall(a, {
						key : key,
						city : mainStatus.getCity().id,
						action : "rumor_use",
						gid : b.gid
					}, function() {
						$("#f_tab2").click();
						showInfo(LNG.SUCCESS)
					})) : showConfirm(translate(LNG.CONFIRMRUMORDEL, c.name), function() {
						pnlLoading.show();
						ajaxCall(a, {
							key : key,
							city : mainStatus.getCity().id,
							action : "rumor_del",
							gid : b.gid
						}, function() {
							$("#f_rumor" + b.gid).unbind().remove();
							showInfo(LNG.SUCCESS)
						})
					})
				})
			}
		});
		d.find("#f_content4").show();
		null != p && (p.refresh(), p.setPosition(0, 0))
	}

	function t(a) {
		$("#f_content2_recruit").hide();
		var b = mainStatus.HERO_DATA[a.gid];
		"undefined" == typeof b || null == b ? showInfo(LNG.ERROR.CLIENT.NEEDUPDATE) : ($("#f_content2_info_rank").attr("src", Utils.getHeroRankImage(b.race, b.rank)), Utils.loadImage($("#f_content2_info_img"), Utils.getHeroImage(a.gid)), $("#f_content2_info_name").html(b.name), $("#f_content2_info_intro").html(b.desc), $("#f_content2_info_level").html(a.g), $("#f_content2_info_power b").html(a.p), $("#f_content2_info_wisdom b").html(a.i), $("#f_content2_info_charisma b").html(a.c1), $("#f_content2_info_troop b").html(a.c2), $("#f_content2_hire").show(), $("#f_hero_hire_okay").text(LNG.HEROHIRE), $("#f_hero_hire_okay").show())
	}

	function c() {
		var a = r;
		null != n && y < n.length && ( a = n[y]);
		if(null == a)
			return !1;
		d.find("#f_content3_equip").is(":visible") ? (d.find("#f_content3_switch").text(LNG.ENLIGHTEN), 0 == a.ns && 0 < a.ncd ? (d.find("#f_content3_switch_cd").show(), d.find("#f_content3_switch_cd li b").html(Utils.timeString2(a.ncd) + "&nbsp;")) : d.find("#f_content3_switch_cd").hide()) : (d.find("#f_content3_switch").text(LNG.EQUIPMENT), d.find("#f_content3_switch_cd").hide(), d.find("#f_content3_old_power b").text(a.p), d.find("#f_content3_old_wisdom b").text(a.i), d.find("#f_content3_old_charisma b").text(a.c1), d.find("#f_content3_old_command b").text(a.c2), 0 == a.ns ? (d.find("#f_content3_new_power b").text("?"), d.find("#f_content3_new_wisdom b").text("?"), d.find("#f_content3_new_charisma b").text("?"), d.find("#f_content3_new_command b").text("?"), d.find("#f_content3_switch_accept").hide(), d.find("#f_content3_switch_reject").hide(), 0 == a.ncd ? (d.find("#f_content3_switch_cd2").hide(), d.find("#f_hero_switch_price ul li b").text(a.pr), d.find("#f_hero_switch_price").show(), d.find("#f_content3_switch_do").show()) : (d.find("#f_content3_switch_cd2 ul li b").text(Utils.timeString2(a.ncd)), d.find("#f_content3_switch_cd2").show(), d.find("#f_hero_switch_price").hide(), d.find("#f_content3_switch_do").hide())) : (d.find("#f_content3_new_power b").text(a.np), d.find("#f_content3_new_wisdom b").text(a.ni), d.find("#f_content3_new_charisma b").text(a.nc1), d.find("#f_content3_new_command b").text(a.nc2), d.find("#f_content3_switch_do").hide(), d.find("#f_hero_switch_price").hide(), d.find("#f_content3_switch_cd2").hide(), d.find("#f_content3_switch_accept").show(), d.find("#f_content3_switch_reject").show()))
	}

	function z(a) {
		var c = r;
		null != n && y < n.length && ( c = n[y]);
		if(null == c)
			return !1;
		b = a;
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
			key : key,
			id : c.id,
			action : "list_item",
			slot : a,
			city : mainStatus.getCity().id
		}, function(a) {
			h = a.ret.item;
			q();
			m();
			d.find("#f_content3_item").show();
			d.find("#f_content3_info").hide();
			null != p && (p.refresh(), p.setPosition(0, 0))
		})
	}

	var p = null, C = $("#f_city_center_hero_script"), d = $(C.parent().get(0)), D = EMA.getProxy();
	d.bind("dispose", function() {
		null != p && (p.destroy(!1), p = null);
		Utils.removeCss("f_city_hero_css");
		D.dispose();
		d = D = null
	});
	var r = null, n = null, y = 0, j = null, b = 0, h = null, A = null, B = 0, x = 0, l = [{
		buildtype : 10,
		panel : d.find("#f_content1").find("#f_fac_hero")
	}], E = mainStatus.BUILDING_DATA, o = function(a) {
		var b = mainStatus.getCity(), c = E[a.buildtype], f = mainStatus.CITY_INFO.getLevel(a.buildtype), d = c.upgrade[f];
		if(d)
			0 < f ? ( c = LNG.CONFIRMBUILD, c = LNG.UPGRADE_CONFIRM, showConfirm(c, function() {
				pnlLoading.show();
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
					key : key,
					city : b.id,
					build_type : a.buildtype
				}, function(b) {
					a.panel.find("#f_upgrade").hide();
					a.panel.find("#f_build_promotion").show();
					mainStatus.CITY_INFO[6] -= d.w;
					mainStatus.CITY_INFO[2] -= d.g;
					mainStatus.CITY_INFO[4] -= d.f;
					mainStatus.CITY_INFO[8] -= d.i;
					CMA.add(b.ret.cdlist)
				}, function(a) {
					(704 == a || 707 == a) && CMA.reload()
				})
			})) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
				key : key,
				city : b.id,
				build_type : a.buildtype
			}, function(b) {
				a.panel.find("#f_upgrade").hide();
				a.panel.find("#f_build_promotion").show();
				mainStatus.CITY_INFO[6] -= d.w;
				mainStatus.CITY_INFO[2] -= d.g;
				mainStatus.CITY_INFO[4] -= d.f;
				mainStatus.CITY_INFO[8] -= d.i;
				CMA.add(b.ret.cdlist)
			}, function(a) {
				(704 == a || 707 == a) && CMA.reload()
			}))
	}, G = [{
		id : 115,
		shop : 1
	}, {
		id : 116,
		shop : 1
	}, {
		id : 117,
		shop : 1
	}], F = [{
		id : 1001,
		shop : 1,
		icon : "gem.jpg",
		name : LNG.INSTANT_COMPLETE,
		desc : LNG.INSTANT_COMPLETE_DESC,
		price : 0
	}], H = function(a) {
		var b = CMA.getCD(1, a.buildtype);
		if(null != b)
			return a = (new Date).getTime(), a = Math.ceil((b.end - a) / 1E3), pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CD_PRICE, {
				type : b.cdtype,
				secs : a
			}, function(a) {
				f = !0;
				a = a.ret.price;
				0 < a ? F[0].price = a : F = null;
				$("#f_content1").hide();
				showItemPromotion($("#f_city_hero_promotion"), G, function(a) {
					f = !1;
					if(1001 == a) {
						pnlLoading.show();
						var c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO;
						ajaxCall(c, {
							key : key,
							city : mainStatus.CITY_ID,
							tid : b.id,
							action : "build2"
						}, function(a) {
							userinfo.money = a.ret.money;
							refreshUserInfo();
							CMA.changeSecs(b.id, 0);
							showInfo(LNG.SUCCESS)
						})
					} else
						0 != a && (pnlLoading.show(), c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO, ajaxCall(c, {
							key : key,
							city : mainStatus.CITY_ID,
							tid : b.id,
							action : "build",
							iid : a
						}, function(a) {
							CMA.changeSecs(b.id, a.ret.secs);
							showInfo(LNG.SUCCESS)
						}));
					$("#f_content1").show()
				}, !0, F)
			}), !1
	}, I = function(a, b) {
		if(E) {
			var c = E[a], f = mainStatus.CITY_INFO.getLevel(a), d = c.upgrade[f];
			d && (b.find("#f_title").html(c.name), Utils.loadImage(b.find("#f_img"), Utils.getBuildingImage(a)), b.find("#f_desc").html(c.desc), b.find("#f_level").html(f), b.find("#resfood b").html(d.f), mainStatus.CITY_INFO[4] < d.f && b.find("#resfood b").css("color", "#FFD17A"), b.find("#reswood b").html(d.w), mainStatus.CITY_INFO[6] < d.w && b.find("#reswood b").css("color", "#FFD17A"), b.find("#resiron b").html(d.i), mainStatus.CITY_INFO[8] < d.i && b.find("#resiron b").css("color", "#FFD17A"), b.find("#resgold b").html(d.g), mainStatus.CITY_INFO[2] < d.g && b.find("#resgold b").css("color", "#FFD17A"), d = buildtime(d.t, mainStatus.CITY_INFO[22]), "undefined" != typeof statinfo.vs && null != statinfo.vs && (d *= statinfo.vs), b.find("#clock b").html(Utils.timeString2(Math.ceil(d))), c.upgrade[f + 1] ? (b.find("#f_upgrade").show(), b.find("#f_build_promotion").hide()) : (b.find("#f_upgrade").hide(), b.find("#f_cd1").hide()))
		}
	}, C = function() {
		$.each(l, function(a, b) {
			I(b.buildtype, b.panel)
		})
	}, O = function(a, b) {
		$.each(l, function(a, c) {
			c.buildtype == b && I(c.buildtype, c.panel)
		})
	};
	$.each(l, function(a, b) {
		var c = b.panel, f = l[a].buildtype, d = c.find("#f_cd1 p"), e = c.find("#f_upgrade"), h = c.find("#f_build_promotion");
		D.bind(CMA.getTickEventId(1, f), function(a) {
			e.hide();
			h.show();
			d.html(Utils.timeString2(a))
		});
		D.bind(CMA.getDoneEventId(1, f), function() {
			O(e, f)
		})
	});
	C();
	(function() {
		$.each(l, function(a, b) {
			b.panel.find("#f_upgrade").click(function() {
				o(b);
				return !1
			});
			b.panel.find("#f_build_promotion").click(function() {
				H(b);
				return !1
			})
		})
	})();
	CMA.forceNotify();
	D.bind("cityinfoupdate", C);
	var f = !1;
	d.find(".tab_active,.tab_inactive").click(function(a) {
		!f && $(this).hasClass("tab_inactive") && (d.find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), d.find("#f_content1,#f_content2,#f_content3,#f_content3_info,#f_content3_item,#f_content3_arena,#f_content4").hide(), $(this).trigger("tab", a));
		return !1
	});
	var N = null;
	d.find("#f_tab4").bind("tab", function() {
		if($("#f_content4").is(":visible"))
			return !1;
		d.css("background-image", "url(img/bg/view.jpg)");
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
			key : key,
			city : mainStatus.getCity().id,
			action : "rumors"
		}, function(a) {
			N = a.ret.hero;
			k()
		});
		return !1
	});
	d.find("#f_tab1").bind("tab", function() {
		if($("#f_content1").is(":visible"))
			return !1;
		d.css("background-image", "url(img/bg/view.jpg)");
		d.find("#f_content1").show();
		null != p && (p.refresh(), p.setPosition(0, 0));
		return !1
	});
	d.find("#f_tab2").bind("tab", function() {
		if($("#f_content2").is(":visible"))
			return !1;
		$("#content").css("background-image", "url(img/bg/inn2.jpg)");
		d.find("#f_content2").show();
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
			key : key,
			city : mainStatus.getCity().id
		}, function(a) {
			1 == a.ret.type ? (t(a.ret.hero), $("#f_hero_hire_refresh b").text(Utils.timeString2(a.ret.refresh)), $("#f_content2_refresh").show()) : 2 == a.ret.type ? ($("#f_content2_recruit").show(), $("#f_content2_hire").hide(), $("#f_hero_hire_refresh b").text(Utils.timeString2(a.ret.refresh)), $("#f_content2_refresh").show(), $("#f_hero_hire_okay").hide()) : 3 == a.ret.type && ($("#f_content2_recruit").show(), $("#f_content2_hire").hide(), $("#f_content2_refresh").hide(), $("#f_hero_hire_okay").text(LNG.HERORECRUIT), $("#f_hero_hire_okay").show());
			$("#f_hero_hire_price b").text(a.ret.price)
		}, function(a) {
			1303 == a && d.find("#f_tab1").click()
		});
		return !1
	});
	d.find("#f_tab3").bind("tab", function() {
		if($("#f_content3").is(":visible") || $("#f_content3_info").is(":visible") || $("#f_content3_arena").is(":visible") || $("#f_content3_item").is(":visible") || $("#f_content3_arena_fight").is(":visible"))
			return !1;
		d.css("background-image", "url(img/bg/view.jpg)");
		d.find("#f_content3").show();
		a();
		return !1
	});
	d.find("#f_close").click(function() {
		if($("#f_content3_arena_fight").is(":visible"))
			$("#f_content3_arena_fight").hide();
		else if($("#f_content3_arena").is(":visible")) {
			var b = r;
			null != n && y < n.length && ( b = n[y]);
			if(null == b)
				return showCity(), !1;
			0 == x ? (s(b), d.find("#f_content3_info").show()) : d.find("#f_content3").show();
			d.find("#f_content3_arena").hide();
			null != p && (p.refresh(), p.setPosition(0, 0))
		} else
			$("#f_content3_info").is(":visible") ? (a(), d.find("#f_content3").show(), d.find("#f_content3_info").hide(), null != p && (p.refresh(), p.setPosition(0, 0))) : $("#f_content3_item").is(":visible") ? (d.find("#f_content3_info").show(), d.find("#f_content3_item").hide()) : showCity();
		return !1
	});
	d.find("#f_content3_switch").click(function() {
		d.find("#f_content3_enlighten").toggle();
		d.find("#f_content3_equip").toggle();
		c();
		return !1
	});
	d.find("#f_content3_switch_cd2").click(function() {
		var a = r;
		null != n && y < n.length && ( a = n[y]);
		if(null == a)
			return !1;
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
			key : key,
			id : a.id,
			action : "query"
		}, function(b) {
			b = [{
				id : 1001,
				shop : 1,
				icon : "gem.jpg",
				name : LNG.INSTANT_COMPLETE,
				desc : LNG.INSTANT_COMPLETE_DESC2,
				price : b.ret.gem
			}];
			f = !0;
			$("#f_content3_info").hide();
			showItemPromotion($("#f_city_hero_promotion"), [], function(b) {
				f = !1;
				1001 == b && (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
					key : key,
					id : a.id,
					action : "refresh"
				}, function(b) {
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
	d.find("#f_content3_switch_do").click(function() {
		var a = r;
		null != n && y < n.length && ( a = n[y]);
		if(null == a)
			return !1;
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
			key : key,
			id : a.id,
			action : "reinit",
			city : mainStatus.getCity().id
		}, function(b) {
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
	d.find("#f_content3_switch_reject").click(function() {
		var a = r;
		null != n && y < n.length && ( a = n[y]);
		if(null == a)
			return !1;
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
			key : key,
			id : a.id,
			action : "reject"
		}, function() {
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
	d.find("#f_content3_switch_accept").click(function() {
		var a = r;
		null != n && y < n.length && ( a = n[y]);
		if(null == a)
			return !1;
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
			key : key,
			id : a.id,
			action : "accept"
		}, function() {
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
	d.find("#f_sample_hero_slot_weapon").click(function() {
		z(1);
		return !1
	});
	d.find("#f_sample_hero_slot_armor").click(function() {
		z(2);
		return !1
	});
	d.find("#f_sample_hero_slot_ring").click(function() {
		z(5);
		return !1
	});
	d.find("#f_sample_hero_slot_mount").click(function() {
		z(3);
		return !1
	});
	d.find("#f_sample_hero_slot_book").click(function() {
		z(4);
		return !1
	});
	d.find("#f_hero_hire_refresh_panel").click(function() {
		f = !0;
		$("#f_content2").hide();
		showItemPromotion($("#f_city_hero_promotion"), [{
			id : 161,
			shop : 1
		}], function(a) {
			f = !1;
			0 != a ? d.find("#f_tab2").trigger("tab") : $("#f_content2").show()
		}, !1)
	});
	d.find("#f_hero_hire_okay").click(function() {
		pnlLoading.show();
		var a = CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT;
		$("#f_content2_recruit").is(":visible") ? ajaxCall(a, {
			key : key,
			city : mainStatus.getCity().id,
			action : "pub_process"
		}, function(a) {
			mainStatus.CITY_INFO[2] = a.ret.gold;
			t(a.ret.hero);
			$("#f_hero_hire_refresh b").text(Utils.timeString2(a.ret.refresh));
			$("#f_content2_refresh").show();
			$("#f_hero_hire_price b").text(a.ret.price);
			0 != a.ret.rumor && showInfo(translate(LNG.GETRUMOR, mainStatus.HERO_DATA[a.ret.rumor].name))
		}) : ajaxCall(a, {
			key : key,
			city : mainStatus.getCity().id,
			action : "hire_process"
		}, function(a) {
			mainStatus.CITY_INFO[2] = a.ret.gold;
			r = a.ret.hero;
			if(isNaN(r.ncd))
				r.ncd = 0, r.ns = 0;
			j = [];
			null != n && (n.push(r), y = n.length - 1);
			d.css("background-image", "url(img/bg/view.jpg)");
			s(r);
			$("#f_tab2").removeClass("tab_active").addClass("tab_inactive");
			$("#f_tab3").removeClass("tab_inactive").addClass("tab_active");
			preTab = "f_tab3";
			d.find("#f_content2").hide();
			d.find("#f_content3_info").show()
		});
		return !1
	});
	$("#f_content3_item_active_take").click(function() {
		var a = r;
		null != n && y < n.length && ( a = n[y]);
		if(null == a)
			return !1;
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
			key : key,
			id : a.id,
			action : "item_equip",
			slot : b,
			i_id : -1
		}, function(c) {
			a.p = c.ret.hero.p;
			a.i = c.ret.hero.i;
			a.c1 = c.ret.hero.c1;
			a.c2 = c.ret.hero.c2;
			a.np = c.ret.hero.np;
			a.ni = c.ret.hero.ni;
			a.nc1 = c.ret.hero.nc1;
			a.nc2 = c.ret.hero.nc2;
			$("#f_content3_info_power b").text(a.p);
			$("#f_content3_info_wisdom b").text(a.i);
			$("#f_content3_info_charisma b").text(a.c1);
			$("#f_content3_item_active").hide();
			h.push(A);
			q();
			j.splice(B, 1);
			1 == b ? ($("#f_sample_hero_slot_weapon").css("background-image", ""), $("#f_sample_hero_slot_weapon_txt").show()) : 2 == b ? ($("#f_sample_hero_slot_armor").css("background-image", ""), $("#f_sample_hero_slot_armor_txt").show()) : 5 == b ? ($("#f_sample_hero_slot_ring").css("background-image", ""), $("#f_sample_hero_slot_ring_txt").show()) : 3 == b ? ($("#f_sample_hero_slot_mount").css("background-image", ""), $("#f_sample_hero_slot_mount_txt").show()) : 4 == b && ($("#f_sample_hero_slot_book").css("background-image", ""), $("#f_sample_hero_slot_book_txt").show())
		});
		return !1
	});
	$("#f_content3_reward").click(function() {
		var a = r;
		null != n && y < n.length && ( a = n[y]);
		if(null == a)
			return !1;
		if(100 <= a.f)
			return showInfo(LNG.ERROR.CLIENT.HEROMAXLOYALTY), !1;
		var b = mainStatus.HERO_DATA[a.gid];
		if("undefined" == typeof b || null == b)
			return showInfo(LNG.ERROR.CLIENT.NEEDUPDATE), !1;
		showConfirm(translate(LNG.CONFIRMREWARD, b.name), function() {
			1E3 > mainStatus.CITY_INFO[2] ? showInfo(LNG.ERROR.CLIENT.GOLDNOTENOUGH) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
				key : key,
				id : a.id,
				action : "give",
				city : mainStatus.getCity().id,
				golds : 1E3
			}, function(b) {
				a.f = b.ret.fealty;
				mainStatus.CITY_INFO[2] -= 1E3;
				$("#f_content3_info_loyalty b").text(a.f);
				showInfo(LNG.SUCCESS)
			}))
		});
		return !1
	});
	$("#f_content3_goarena").click(function() {
		var a = r;
		null != n && y < n.length && ( a = n[y]);
		if(null == a)
			return !1;
		var b = mainStatus.HERO_DATA[a.gid];
		if("undefined" == typeof b || null == b)
			return showInfo(LNG.ERROR.CLIENT.NEEDUPDATE), !1;
		//if(0 >= a.e) return showInfo(translate(LNG.NOVIGOR, b.name)), !1;
		pnlLoading.show();
		x = 0;
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
			key : key,
			lv : a.g
		}, function(c) {
			if(null == c.ret.hero || 0 == c.ret.hero.length)
				showInfo(LNG.ERROR.CLIENT.NOMATCHARENA);
			else {
				var f = $("#f_content3_arena_list");
				f.html("");
				$.each(c.ret.hero, function(c, d) {
					var e = mainStatus.HERO_DATA[d.gid];
					"undefined" == typeof e || null == e || (f.append('<div style="position:relative; height:75px;"><div class="font12" style="left:0px; top: 0px; width: 70px;text-align:center;position:absolute;"><img id="f_content3_arena_list_img' + d.id + '" src="img/hero/sample.gif"/><br><b>' + e.name + '</b></div><img src="' + Utils.getHeroRankImage(e.race, e.rank) + '" style="position:absolute;left:5px;top:35px;"/><div class="font12" style="left:70px; top: 30px; width: 40px;text-align:center;position:absolute;">' + d.g + '</div><div class="font12" style="left:110px; top: 30px; width: 30px;text-align:center;position:absolute;">' + d.w + '</div><ul class="reshead" style="position:absolute;left:150px;top:20px;"><li><em class="race' + d.r + '"></em><b>' + d.u + "</b></li>" + (0 == d.gflag ? "" : '<li><em class="guild" style="background-image:url(' + Utils.getFlag(d.gflag) + ')"></em><b>' + d.gname + "</b></li>") + '</ul><div id="f_content3_arena_list' + d.id + '" class="funcbutton" style="top: 17px; left: 390px;">' + LNG.FIGHT + "</div></div>"), Utils.loadImage2(f.find("#f_content3_arena_list_img" + d.id), Utils.getHeroImage(d.gid)), f.find("#f_content3_arena_list" + d.id).click(function() {
						$("#f_content3_arena_fight").show();
						$("#f_content3_arena_fight p").show();
						$("#f_content3_arena_fight_my img").attr("src", Utils.getHeroImage(a.gid));
						$("#f_content3_arena_fight_my b").text(b.name);
						$("#f_content3_arena_fight_enemy img").attr("src", Utils.getHeroImage(d.gid));
						$("#f_content3_arena_fight_enemy b").text(e.name);
						setTimeout(function() {
							ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
								key : key,
								gid : a.id,
								tgid : d.id
							}, function(c) {
								a.e--;
								//0 < c.ret.win ? (a.w++, a.tw++, f.find("#f_content3_arena_list" + d.id).unbind().remove()) : (a.w = 0, a.tl++);
								var fightResult;
								if (0 < c.ret.win) {
									(a.w++, a.tw++);
									//fightResult = "[" + a.ex + "/" + a.te + "/"+a.id+"/"+d.id+"]";
									fightResult = "["+a.id+"/"+d.id+"]";
								} else {
									(a.w = 0, a.tl++);
									var fightResult = "";
								}
								a.ex += c.ret.exp;
								$("#f_content3_arena_fight p").hide();
								$("#f_content3_hero_vigor" + a.id).text(a.e);
								c = translate(LNG.ARENARESULT[3 + c.ret.win], c.ret.exp, b.name);
								showInfo(c + fightResult, function() {
									$("#f_content3_arena_fight").hide()
								})
							}, function() {
								$("#f_content3_arena_fight").hide()
							})
						}, 500);
						return !1
					}))
				});
				$("#f_content3_info").hide();
				$("#f_content3_arena").show();
				null != p && (p.refresh(), p.setPosition(0, 0))
			}
		});
		return !1
	});
	$("#f_content3_fire").click(function() {
		var a = r;
		null != n && y < n.length && ( a = n[y]);
		if(null == a)
			return !1;
		var b = mainStatus.HERO_DATA[a.gid];
		if("undefined" == typeof b || null == b)
			return showInfo(LNG.ERROR.CLIENT.NEEDUPDATE), !1;
		showConfirm(translate(LNG.CONFIRMFIRE, b.name), function() {
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
				key : key,
				id : a.id,
				action : "fire_gen",
				city : mainStatus.getCity().id
			}, function() {
				null != n && n.splice(y, 1);
				e();
				$("#f_content3").show();
				$("#f_content3_info").hide();
				null != p && (p.refresh(), p.setPosition(0, 0));
				showInfo(LNG.SUCCESS)
			})
		});
		return !1
	});
	$("#f_content3_resurrect").click(function() {
		var a = r;
		null != n && y < n.length && ( a = n[y]);
		if(null == a)
			return !1;
		var b = mainStatus.HERO_DATA[a.gid];
		if("undefined" == typeof b || null == b)
			return showInfo(LNG.ERROR.CLIENT.NEEDUPDATE), !1;
		var c = 1E3 * a.g;
		showConfirm(translate(LNG.CONFIRMRESURRECT, c, b.name), function() {
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
				key : key,
				id : a.id,
				action : "relive",
				city : mainStatus.getCity().id
			}, function() {
				mainStatus.CITY_INFO[2] -= c;
				a.s = 0;
				s(a);
				showInfo(LNG.SUCCESS)
			})
		});
		return !1
	});
	$("#f_content3_move_to").click(function() {
		var a = r;
		null != n && y < n.length && ( a = n[y]);
		if(null == a)
			return !1;
		var b = mainStatus.HERO_DATA[a.gid];
		if("undefined" == typeof b || null == b)
			return showInfo(LNG.ERROR.CLIENT.NEEDUPDATE), !1;
		var c = userinfo.city[$("#f_content3_move_cities").val()];
		null != c && showConfirm(translate(LNG.CONFIRMMOVE, b.name, c.name), function() {
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
				key : key,
				id : a.id,
				action : "move",
				city : mainStatus.getCity().id,
				city_move : c.id
			}, function() {
				a.s = 6;
				s(a);
				showInfo(LNG.SUCCESS)
			})
		});
		return !1
	});
	$("#f_content3_info_vigor_promotion").click(function() {
		var a = r;
		null != n && y < n.length && ( a = n[y]);
		if(null == a)
			return !1;
		f = !0;
		$("#f_content3_info").hide();
		showItemPromotion($("#f_city_hero_promotion"), [{
			id : 81,
			shop : 1
		}, {
			id : 82,
			shop : 1
		}], function(b) {
			f = !1;
			/*0 != b && (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
				key : key,
				id : a.id,
				action : "energy",
				city : mainStatus.getCity().id,
				itemid : b
			}, function(b) {
				a.e = b.ret.energy;
				s(a);
				showInfo(LNG.SUCCESS)
			}));*/
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
	p = new iScroll("scroller", {
		desktopCompatibility : !0
	});
	pnlLoading.hide()
});
defineSubView("f_city_military", function() {
	function v() {
		$("#wrapper").css("height", k)
	}

	function s(a, b) {
		null != i && (i.refresh(), i.setPosition(a || 0, b || 0));
		return !1
	}

	function u() {
		$("#f_content4_list").empty().unbind();
		var b = 60 - userinfo.level;
		20 > b && ( b = 20);
		$("#f_content4_title b").text(b);
		if(null != e && 0 < e.length) {
			var c = $("#f_content4_list");
			$.each(e, function(b, f) {
				for(var d = "", g = a[b], b = 0; b < f.length - 1; b++)
					if(0 < f[b])
						var e = mainStatus.SOLDIER_DATA[b + 1], d = "" == d ? "<b>" + e.name + "</b> x<b>" + f[b] + "</b>" : d + (", <b>" + e.name + "</b> x<b>" + f[b] + "</b>");
				e = f[f.length - 1];
				0 > e && ( e = 0);
				c.append('<table id="f_heal_t' + g + '"><tr><td style="width:380px;">' + d + '</td><td id="f_heal_cd' + g + '">' + Utils.timeString2(e) + '<div id="f_heal_' + g + '" class="promotebutton" style="position:relative;left:45px;top:-25px;"></div></td></tr></table>');
				c.find("#f_heal_" + g).click(function() {
					showItemPromotion($("#f_city_promotion"), [{
						id : 187,
						shop : 1
					}, {
						id : 188,
						shop : 1
					}], function(a) {
						0 != a && (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CDINFO, {
							key : key,
							city : mainStatus.CITY_ID,
							tid : g,
							action : "heal",
							iid : a
						}, function(a) {
							a = a.ret.secs;
							0 < a ? c.find("#f_heal_cd" + g).text(Utils.timeString2(a)) : c.find("#f_heal_t" + g).unbind().remove();
							showInfo(LNG.SUCCESS)
						}));
						$("#f_content4").show()
					}, !0);
					$("#f_content4").hide()
				})
			});
			$("#f_content4_list_title").show()
		} else
			$("#f_content4_list_title").hide();
		$("#f_content4").show()
	}

	function q() {
		var a = $("#f_content5_list");
		a.empty().unbind();
		null != aa && 0 < aa.length ? ($.each(aa, function(b, f) {
			var d = '<table><tr><td style="width:325px;"><ul class="reshead"><li><em class="race' + f[0].nationid + '"></em><b>' + f[0].nick + '</b></li><li><em class="lv"></em><b>' + f[0].level + "</b></li>";
			0 < f[0].guildid && (d += '<li><em class="guild" style="background-image:url(' + Utils.getFlag(f[0].gflag) + ')"></em><b>' + f[0].guild + "</b></li>");
			0 < f[0].conq[0] && (d += '<li><em class="king"></em><b>' + f[0].conq[2] + "&nbsp;[" + Utils.timeString(f[0].conq[1]) + "]</b></li>");
			d += '</ul></td><td style="width:50px;"><b>' + f[1] + "/" + f[2] + '</b></td><td><div id="f_content5_list_conquer' + f[0].id + '" class="funcbutton" style="position:relative; left:5px;">' + LNG.CONQUER + "</div></td></tr></table>";
			a.append(d);
			a.find("#f_content5_list_conquer" + f[0].id).click(function() {
				c.find("#f_tab3").click();
				$("#f_city_war_type_sel").val("9");
				$("#f_content3_war_x").val(f[1]);
				$("#f_content3_war_y").val(f[2])
			})
		}), c.find("#f_content5_list_title").show(), a.show()) : (c.find("#f_content5_list_title").hide(), a.hide())
	}

	function m() {
		var a = $("#f_content6_list");
		a.empty().unbind();
		null != ba && 0 < ba.length ? ($.each(ba, function(b, c) {
			var f = '<table><tr><td width=105 id="f_content6_type' + c[0] + '"><b>' + LNG.CooldDownType[c[1]] + "</b>&nbsp;[" + LNG.ACTIONTYPE[c[2]] + ']</td><td width=220><ul class="reshead" style="height: 16px;">';
			0 != c[7] && (f += '<li style="height:16px;line-height:16px;"><b>[' + mainStatus.HERO_DATA[c[7]].name + "]</b>&nbsp;</li>");
			if(4 == c[1] || 5 == c[1]) {
				if(null != c[5] && null != c[6])
					for(var d = 0; d < c[5].length; d++)
						0 < c[5][d] && (f += '<li style="height:16px;line-height:16px;"><b>' + mainStatus.SOLDIER_DATA[c[5][d]].name + "</b>x" + c[6][d] + "&nbsp;</li>")
			} else {
				if(null != c[5])
					for( d = 0; d < c[5].length; d++)
						0 < c[5][d] && (f += '<li style="height:16px;line-height:16px;"><b>' + mainStatus.SOLDIER_DATA[c[5][d]].name + "</b>"), null != c[6] && c[6].length > d && (f += "x" + c[6][d]), f += "&nbsp;</li>";
				null != c[8] && "" != c[8] && (f += '<li style="height:16px;line-height:16px;"><b>From ' + c[8] + "</b>&nbsp;</li>");
				null != c[9] && "" != c[9] && (f += '<li style="height:16px;line-height:16px;"><b>' + c[9] + "</b></li>")
			}
			f += '</ul></td><td width="45px">' + c[4] + '</td><td width="60px" id="f_content6_time' + c[0] + '">' + Utils.timeString2(c[3]) + "</td></tr></table>";
			if(5 == c[1] || 4 == c[1])
				5 == c[1] ? f += '<div id="f_content6_speedup' + c[0] + '" class="funcbutton" style="left: 360px; display:none;top:50%;height:28px; margin-top:-14px;">' + LNG.SPEED_UP + "</div>" : 4 == c[1] && (f += '<div id="f_content6_callback' + c[0] + '" class="funcbutton" style="left: 290px; display:none;top:50%;height:28px; margin-top:-14px;">' + LNG.CALL_BACK + '</div><div id="f_content6_speedup' + c[0] + '" class="funcbutton" style="left: 360px; display:none;top:50%;height:28px; margin-top:-14px;">' + LNG.SPEED_UP + "</div>"), f += '<div id="f_content6_more' + c[0] + '" class="plusbutton" style="left: 425px;top:50%;height:18px; margin-top:-9px;"></div>';
			a.append('<div style="position:relative;">' + f + "</div>");
			4 == c[1] ? (a.find("#f_content6_more" + c[0]).click(function() {
				a.find("#f_content6_speedup" + c[0]).toggle();
				a.find("#f_content6_callback" + c[0]).toggle()
			}), a.find("#f_content6_speedup" + c[0]).click(function() {
				showItemPromotion($("#f_city_promotion"), [{
					id : 134,
					shop : 1
				}, {
					id : 135,
					shop : 1
				}], function(b) {
					0 != b && (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CDINFO, {
						key : key,
						city : mainStatus.CITY_ID,
						tid : c[0],
						action : "troop",
						iid : b
					}, function(b) {
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
			}), a.find("#f_content6_callback" + c[0]).click(function() {
				showConfirm(LNG.CONFIRMCALLBACK, function() {
					pnlLoading.show();
					ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, {
						key : key,
						act : "callback",
						wid : c[0],
						city : mainStatus.CITY_ID
					}, function(b) {
						b = b.ret.secs;
						a.find("#f_content6_type" + c[0]).html("<b>" + LNG.CooldDownType[5] + "</b>&nbsp;[" + LNG.ACTIONTYPE[c[2]] + "]");
						c[3] = b;
						a.find("#f_content6_time" + c[0]).text(Utils.timeString2(b));
						CMA.reload()
					});
					a.find("#f_content6_more" + c[0]).click()
				})
			})) : 5 == c[1] && (a.find("#f_content6_more" + c[0]).click(function() {
				a.find("#f_content6_speedup" + c[0]).toggle()
			}), a.find("#f_content6_speedup" + c[0]).click(function() {
				showItemPromotion($("#f_city_promotion"), [{
					id : 134,
					shop : 1
				}, {
					id : 135,
					shop : 1
				}], function(b) {
					0 != b && (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CDINFO, {
						key : key,
						city : mainStatus.CITY_ID,
						tid : c[0],
						action : "troop",
						iid : b
					}, function(b) {
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
		}), c.find("#f_content6_title1").hide(), c.find("#f_content6_list_title").show(), a.show()) : (c.find("#f_content6_title1").show(), c.find("#f_content6_list_title").hide(), a.hide())
	}

	var i = null, e = null, a = null, k = "165px", t = $("#f_city_military_html_script"), c = $(t.parent().get(0)), z = EMA.getProxy(), p = LNG.ACTIONTYPE_FULL;
	c.bind("dispose", function() {
		null != i && (i.destroy(!1), i = null);
		Utils.removeCss("f_city_military_css");
		z.dispose();
		c = z = null
	});
	var C = 0, d = null, D = [{
		buildtype : 8,
		panel : c.find("#f_content1").find("#f_camp")
	}], r = mainStatus.BUILDING_DATA, n = function(a) {
		var b = mainStatus.getCity(), c = r[a.buildtype], f = mainStatus.CITY_INFO.getLevel(a.buildtype), d = c.upgrade[f];
		if(d)
			0 < f ? ( c = LNG.CONFIRMBUILD, c = LNG.UPGRADE_CONFIRM, showConfirm(c, function() {
				pnlLoading.show();
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
					key : key,
					city : b.id,
					build_type : a.buildtype
				}, function(b) {
					a.panel.find("#f_upgrade").hide();
					a.panel.find("#f_build_promotion").show();
					mainStatus.CITY_INFO[6] -= d.w;
					mainStatus.CITY_INFO[2] -= d.g;
					mainStatus.CITY_INFO[4] -= d.f;
					mainStatus.CITY_INFO[8] -= d.i;
					CMA.add(b.ret.cdlist)
				}, function(a) {
					(704 == a || 707 == a) && CMA.reload()
				})
			})) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
				key : key,
				city : b.id,
				build_type : a.buildtype
			}, function(b) {
				a.panel.find("#f_upgrade").hide();
				a.panel.find("#f_build_promotion").show();
				mainStatus.CITY_INFO[6] -= d.w;
				mainStatus.CITY_INFO[2] -= d.g;
				mainStatus.CITY_INFO[4] -= d.f;
				mainStatus.CITY_INFO[8] -= d.i;
				CMA.add(b.ret.cdlist)
			}, function(a) {
				(704 == a || 707 == a) && CMA.reload()
			}))
	}, y = [{
		id : 115,
		shop : 1
	}, {
		id : 116,
		shop : 1
	}, {
		id : 117,
		shop : 1
	}], j = [{
		id : 1001,
		shop : 1,
		icon : "gem.jpg",
		name : LNG.INSTANT_COMPLETE,
		desc : LNG.INSTANT_COMPLETE_DESC,
		price : 0
	}], b = function(a) {
		var b = CMA.getCD(1, a.buildtype);
		if(null != b)
			return a = (new Date).getTime(), a = Math.ceil((b.end - a) / 1E3), pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CD_PRICE, {
				type : b.cdtype,
				secs : a
			}, function(a) {
				R = !0;
				a = a.ret.price;
				0 < a ? j[0].price = a : j = null;
				$("#f_content1").hide();
				showItemPromotion($("#f_city_promotion"), y, function(a) {
					R = !1;
					if(1001 == a) {
						pnlLoading.show();
						var c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO;
						ajaxCall(c, {
							key : key,
							city : mainStatus.CITY_ID,
							tid : b.id,
							action : "build2"
						}, function(a) {
							userinfo.money = a.ret.money;
							refreshUserInfo();
							CMA.changeSecs(b.id, 0);
							showInfo(LNG.SUCCESS)
						})
					} else
						0 != a && (pnlLoading.show(), c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO, ajaxCall(c, {
							key : key,
							city : mainStatus.CITY_ID,
							tid : b.id,
							action : "build",
							iid : a
						}, function(a) {
							CMA.changeSecs(b.id, a.ret.secs);
							showInfo(LNG.SUCCESS)
						}));
					$("#f_content1").show()
				}, !0, j)
			}), !1
	}, h = function(a, b) {
		if(r) {
			var c = r[a], f = mainStatus.CITY_INFO.getLevel(a), d = c.upgrade[f];
			d && (b.find("#f_title").html(c.name), Utils.loadImage(b.find("#f_img"), Utils.getBuildingImage(a)), b.find("#f_desc").html(c.desc), b.find("#f_level").html(f), b.find("#resfood b").html(d.f), mainStatus.CITY_INFO[4] < d.f && b.find("#resfood b").css("color", "#FFD17A"), b.find("#reswood b").html(d.w), mainStatus.CITY_INFO[6] < d.w && b.find("#reswood b").css("color", "#FFD17A"), b.find("#resiron b").html(d.i), mainStatus.CITY_INFO[8] < d.i && b.find("#resiron b").css("color", "#FFD17A"), b.find("#resgold b").html(d.g), mainStatus.CITY_INFO[2] < d.g && b.find("#resgold b").css("color", "#FFD17A"), d = buildtime(d.t, mainStatus.CITY_INFO[22]), "undefined" != typeof statinfo.vs && null != statinfo.vs && (d *= statinfo.vs), b.find("#clock b").html(Utils.timeString2(Math.ceil(d))), c.upgrade[f + 1] ? (b.find("#f_upgrade").show(), b.find("#f_build_promotion").hide()) : (b.find("#f_upgrade").hide(), b.find("#f_cd1").hide()))
		}
	}, t = function() {
		$.each(D, function(a, b) {
			h(b.buildtype, b.panel)
		})
	}, A = function(a, b) {
		$.each(D, function(a, c) {
			c.buildtype == b && h(c.buildtype, c.panel)
		});
		x = !0
	};
	$.each(D, function(a, b) {
		var c = b.panel, f = D[a].buildtype, d = c.find("#f_cd1 p"), g = c.find("#f_upgrade"), e = c.find("#f_build_promotion");
		z.bind(CMA.getTickEventId(1, f), function(a) {
			g.hide();
			e.show();
			d.html(Utils.timeString2(a))
		});
		z.bind(CMA.getDoneEventId(1, f), function() {
			A(g, f)
		})
	});
	t();
	(function() {
		$.each(D, function(a, c) {
			c.panel.find("#f_upgrade").click(function() {
				n(c);
				return !1
			});
			c.panel.find("#f_build_promotion").click(function() {
				b(c);
				return !1
			})
		})
	})();
	CMA.forceNotify();
	z.bind("cityinfoupdate", t);
	var B = null, x = !0, l = function(a) {
		null == B || x ? (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SOLDIER_EDUCATE, {
			key : key,
			city : mainStatus.getCity().id
		}, function(b) {
			x = !1;
			B = b.ret;
			B.soldiers.sort(function(a, b) {
				return a[0] - b[0]
			});
			$("#f_content2_defense_input").val(B.def);
			$("#f_content2_info_space").text(B.space);
			$("#f_content2_info_head").text(B.head);
			0 > B.f ? $("#f_content2_warning").show() : $("#f_content2_warning").hide();
			a && a()
		}, function(a) {
			2303 == a && c.find("#f_tab1").click()
		})) : a && a()
	}, E = function() {
		null == d && ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SCHEME, {
			key : key,
			action : "list"
		}, function(a) {
			d = a.ret;
			var b = $("#hero_scheme");
			$.each(a.ret, function(a, c) {
				var f = mainStatus.SCHEME_DATA[c.id];
				b.append($("<option>").attr("value", c.id).html(f.name))
			})
		})
	}, o = null, G = !1, F = function(a, b, c) {
		function f() {
			var h = Math.ceil(Math.pow(e, 1.5)), h = h > g ? g : h, h = d + b * h;
			0 < b && h > c || 0 > b && h < c ? ( G = !1, clearInterval(o), a.value = c) : a.value = h;
			e++
		}

		G = !0;
		var d = Utils.parseInt(a.value, 0), g = Math.abs(c - d), e = 1;
		f();
		1 < g && setTimeout(function() {
			clearInterval(o);
			G && ( o = setInterval(f, 100))
		}, 300)
	}, H = function() {
		G = !1;
		clearInterval(o);
		timer = null
	}, I = c.find("#f_content2_list"), O = function() {
		if(!B)
			return 0;
		for(var a = B.soldiers, b = a.length, c = 0; b--; )
			c += a[b].sum;
		return B.space - c
	}, f = function(a, b, c) {
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
		"undefined" != typeof statinfo.vs && null != statinfo.vs && ( c = Math.ceil(c * statinfo.vs));
		a.find("#clock b").html(Utils.timeString2(c))
	}, N = function(a, b) {
		var c = mainStatus.SOLDIER_DATA[b[0]];
		a.find("#f_title").html(c.name);
		a.find("#f_current_num").html(b[1]);
		a.find("#f_desc").html(c.desc);
		a.find("#f_need").html("<b>" + LNG.NEED + ": </b>" + c.need);
		0 == b[2] && a.find("#f_need").css("color", "#FFD17A");
		Utils.loadImage(a.find("#f_img"), Utils.getSoldierImage(b[0], userinfo.nationid));
		f(a, b, 1);
		0 == b[2] ? a.find("#f_upgrade").hide() : a.find("#f_upgrade").show()
	}, g = function(a) {
		var a = mainStatus.SOLDIER_DATA[a[0]], b = [];
		0 < a.train.f && b.push(Math.floor(mainStatus.CITY_INFO[4] / a.train.f));
		0 < a.train.w && b.push(Math.floor(mainStatus.CITY_INFO[6] / a.train.w));
		0 < a.train.i && b.push(Math.floor(mainStatus.CITY_INFO[8] / a.train.i));
		0 < a.train.g && b.push(Math.floor(mainStatus.CITY_INFO[2] / a.train.g));
		a = Math.min.apply(Math, b);
		if(null != B) {
			if(B.space < a)
				a = B.space;
			if(B.head < a)
				a = B.head
		}
		return a
	}, w = function(a, b) {
		var d = a.find("#f_cd1 p"), e = a.find("#f_upgrade"), h = 0;
		0 == b[2] && (e.hide(), a.find("#f_cd1").hide());
		z.unbind(CMA.getTickEventId(3, b[0]));
		z.bind(CMA.getTickEventId(3, b[0]), function(a) {
			e.hide();
			d.html(Utils.timeString2(a))
		});
		z.unbind(CMA.getDoneEventId(3, b[0]));
		z.bind(CMA.getDoneEventId(3, b[0]), function() {
			b[1] += h;
			h = 0;
			N(a, b);
			d.html(Utils.timeString2(0));
			e.show()
		});
		a.find("#f_detail").unbind().click(function() {
			var a = mainStatus.SOLDIER_DATA[b[0]];
			c.find("#f_soldier_info_title").html(a.name);
			Utils.loadImage(c.find("#f_soldier_info_img"), Utils.getSoldierImage(b[0], userinfo.nationid));
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SOLDIER_EDUCATE, {
				key : key,
				action : "info",
				city : mainStatus.getCity().id,
				stype : b[0]
			}, function(a) {
				c.find("#f_soldier_info_attack").text(a.ret.a);
				c.find("#f_soldier_info_defense").text(a.ret.d);
				c.find("#f_soldier_info_speed").text(a.ret.s);
				c.find("#f_soldier_info_strike").text(a.ret.e);
				c.find("#f_soldier_info_health").text(a.ret.h);
				c.find("#f_soldier_info_food").text(a.ret.f)
			});
			c.find("#f_soldier_info").show()
		});
		a.find("#f_num input").unbind().change(function() {
			var c = Utils.parseInt($(this).val(), 0), c = Math.min(c, g(b));
			$(this).val(c);
			f(a, b, c)
		});
		var o = a.find("#f_num").find("input").get(0);
		a.find("#f_num_minus").unbind();
		a.find("#f_num_minus").bind("mousedown touchstart", function() {
			H();
			F(o, -1, 0)
		});
		var j = null;
		a.find("#f_num_minus").bind("mouseup touchend", function() {
			H();
			var c = Utils.parseInt(o.value, 0);
			clearTimeout(j);
			j = setTimeout(function() {
				f(a, b, c)
			}, 300)
		});
		a.find("#f_num_plus").unbind();
		a.find("#f_num_plus").bind("mousedown touchstart", function() {
			H();
			F(o, 1, g(b))
		});
		var l = null;
		a.find("#f_num_plus").bind("mouseup touchend", function() {
			H();
			var c = Utils.parseInt(o.value, 0), c = Math.max(c, 0);
			clearTimeout(l);
			l = setTimeout(function() {
				f(a, b, c)
			}, 300)
		});
		a.find("#f_num_max").unbind().click(function() {
			H();
			o.value = g(b);
			var c = Utils.parseInt(o.value, 0);
			f(a, b, c)
		});
		e.unbind().click(function() {
			var f = Utils.parseInt(a.find("#f_num input").val(), 0);
			if(1 > f)
				return !1;
			if(1 > O())
				return showInfo(LNG.SOLDIER_TRAIN_NOT_ENOUGH_SPACE), !1;
			var d = i.x, g = i.y;
			c.find("#f_content2").hide();
			c.find("#f_content2_defense_type").hide();
			i.setPosition(0, 0);
			R = !0;
			showFreeHeroPanel(c.find("#f_content3_military_hero_select"), !0, function(a) {
				R = !1;
				c.find("#f_content2").show();
				c.find("#f_content2_defense_type").show();
				var e = 0;
				if(a)
					e = a.gid;
				pnlLoading.show();
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SOLDIER_EDUCATE, {
					key : key,
					city : mainStatus.getCity().id,
					action : "soldier_educate",
					soldier : b[0],
					num : f,
					gen : e
				}, function(a) {
					var c = mainStatus.SOLDIER_DATA[b[0]];
					mainStatus.CITY_INFO[6] -= c.train.w * f;
					mainStatus.CITY_INFO[2] -= c.train.g * f;
					mainStatus.CITY_INFO[4] -= c.train.f * f;
					mainStatus.CITY_INFO[8] -= c.train.i * f;
					h = f;
					CMA.add(a.ret.cdlist);
					CMA.forceNotify();
					B.space -= f;
					B.head -= f;
					$("#f_content2_info_space").text(B.space);
					$("#f_content2_info_head").text(B.head);
					0 > B.f ? $("#f_content2_warning").show() : $("#f_content2_warning").hide();
					showInfo(LNG.SUCCESS)
				}, function(a) {
					(2310 == a || 2311 == a) && CMA.reload()
				});
				null != i && (i.refresh(), i.setPosition(d, g))
			}, "power");
			return !1
		})
	}, J = !1, K = function(a) {
		if(!J || a) {
//			window.selectProxy.proxySelect($("#f_content2_defense_input")[0]);
			l();
			var b = c.find("#f_train");
			b.remove();
			l(function() {
				if(null != B)
					if(null != B.soldiers && $.each(B.soldiers, function(a, c) {
						var f = b.clone(), d = "f_train_no" + a;
						f.attr("id", d);
						N(f, c);
						w(f, c);
						I.append(f.show());
						var g = Utils.getCookie(d);
						null != g && "" != g && (f.find("#f_num input").val(g), Utils.delCookie(d))
					}), null != B.next && 0 < B.next[0]) {
						c.find("#f_content2_next_level").text(B.next[1]);
						var a = mainStatus.SOLDIER_DATA[B.next[0]];
						c.find("#f_content2_next_title").html(a.name);
						c.find("#f_content2_next_desc").html(a.desc);
						c.find("#f_content2_next_need").html("<b>" + LNG.NEED + ": </b>" + a.need);
						Utils.loadImage(c.find("#f_content2_next_img"), Utils.getSoldierImage(B.next[0], userinfo.nationid));
						c.find("#f_content2_next_resfood b").html(a.train.f);
						c.find("#f_content2_next_reswood b").html(a.train.w);
						c.find("#f_content2_next_resiron b").html(a.train.i);
						c.find("#f_content2_next_resgold b").html(a.train.g);
						c.find("#f_content2_next").show()
					} else
						c.find("#f_content2_next").hide();
				s(0, 0);
				J = !0
			})
		}
	}, L = 0, M = function() {
		var a = {
			area : Utils.parseInt($("#f_content3_war_x").val(), 0),
			area_x : Utils.parseInt($("#f_content3_war_y").val(), 0)
		};
		return 0 >= a.area || 0 >= a.area_x ? null : a
	}, S = function() {
		var a = [];
		c.find("#f_troop_inputs").find("#f_troop_input_input").each(function() {
			var b = $(this);
			0 < Utils.parseInt(b.val(), 0) && a.push(["soldier_num" + b.data("soldier")[0], Utils.parseInt(b.val(), 0)])
		});
		return a
	}, Q = function(a) {
		for(var b = {}, c = a.length; c--; )
			b[a[c][0]] = a[c][1];
		return b
	}, P = function(a, b, f, d) {
		$("#wrapper").css("height", "280px");
		null != i && (i.refresh(), i.setPosition(0, 0));
		R = !0;
		var g = c.find("#f_action_common_confirm").show();
		g.find("#f_actiontype_val").text(a);
		g.find("#f_actiontarget_val").text(b.area + ":" + b.area_x);
		g.find("#f_cost_food_val").text(f.cost_food);
		g.find("#f_cost_wood_val").text(f.cost_wood);
		g.find("#f_cost_iron_val").text(f.cost_iron);
		g.find("#f_cost_gold_val").text(f.cost_gold);
		g.find("#f_time_val").text(Utils.timeString2(f.travel_sec));
		g.find("#f_carry_val").text(f.carry);
		g.find("#confirm_yes").click(function() {
			g.find("*").unbind();
			g.hide();
			R = !1;
			var c = {};
			$.extend(c, b);
			$.extend(c, f);
			c.action = "war_task";
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION, c, function(b) {
				CMA.add(b.ret.cd);
				d && d(!0);
				showCity();
				showInfo(LNG.SUCCESS);
				a == p[9] && (userinfo.conq[3]--, Utils.setCookie("user", userinfo))
			}, function(a) {
				(2522 == a || 2524 == a || 2528 == a) && CMA.reload();
				d && d(!1)
			})
		});
		g.find("#confirm_no").click(function() {
			g.find("*").unbind();
			R = !1;
			g.hide();
			d && d(!1);
			v();
			null != i && (i.refresh(), i.setPosition(0, 0))
		})
	}, T = function(a, b, f, d) {
		R = !0;
		var g = c.find("#f_action_build_confirm").show();
		$("#wrapper").css("height", "280px");
		g.find("#f_gold_val").text(mainStatus.CITY_INFO[2]);
		g.find("#f_wood_val").text(mainStatus.CITY_INFO[6]);
		g.find("#f_food_val").text(mainStatus.CITY_INFO[4]);
		g.find("#f_iron_val").text(mainStatus.CITY_INFO[8]);
		g.find("#f_actiontype_val").text(a);
		g.find("#f_actiontarget_val").text(b.area + ":" + b.area_x);
		g.find("#f_cost_food_val").text(f.cost_food);
		g.find("#f_cost_wood_val").text(f.cost_wood);
		g.find("#f_cost_iron_val").text(f.cost_iron);
		g.find("#f_cost_gold_val").text(f.cost_gold);
		g.find("#f_distance_val").text(f.distance);
		g.find("#f_time_val").text(Utils.timeString2(f.travel_sec));
		g.find("#f_gold_input").val("");
		g.find("#f_wood_input").val("");
		g.find("#f_food_input").val("");
		g.find("#f_iron_input").val("");
		var e = 0, e = f.carry;
		g.find("#f_carry_val").text(e);
		s(0, 0);
		g.find("#f_food_max").unbind().click(function() {
			var a = Utils.parseInt(g.find("#f_gold_input").val(), 0) + Utils.parseInt(g.find("#f_wood_input").val(), 0) + Utils.parseInt(g.find("#f_iron_input").val(), 0) + f.cost_food + f.cost_gold + f.cost_wood + f.cost_iron, a = Math.max(Math.min(e, mainStatus.CITY_INFO[4]) - a, 0);
			g.find("#f_food_input").val(a)
		});
		g.find("#f_gold_max").unbind().click(function() {
			var a = Utils.parseInt(g.find("#f_food_input").val(), 0) + Utils.parseInt(g.find("#f_wood_input").val(), 0) + Utils.parseInt(g.find("#f_iron_input").val(), 0) + f.cost_food + f.cost_gold + f.cost_wood + f.cost_iron, a = Math.max(Math.min(e, mainStatus.CITY_INFO[2]) - a, 0);
			g.find("#f_gold_input").val(a)
		});
		g.find("#f_wood_max").unbind().click(function() {
			var a = Utils.parseInt(g.find("#f_food_input").val(), 0) + Utils.parseInt(g.find("#f_gold_input").val(), 0) + Utils.parseInt(g.find("#f_iron_input").val(), 0) + f.cost_food + f.cost_gold + f.cost_wood + f.cost_iron, a = Math.max(Math.min(e, mainStatus.CITY_INFO[6]) - a, 0);
			g.find("#f_wood_input").val(a)
		});
		g.find("#f_iron_max").unbind().click(function() {
			var a = Utils.parseInt(g.find("#f_food_input").val(), 0) + Utils.parseInt(g.find("#f_gold_input").val(), 0) + Utils.parseInt(g.find("#f_wood_input").val(), 0) + f.cost_food + f.cost_gold + f.cost_wood + f.cost_iron, a = Math.max(Math.min(e, mainStatus.CITY_INFO[8]) - a, 0);
			g.find("#f_iron_input").val(a)
		});
		g.find("#confirm_yes").click(function() {
			var a = Utils.parseInt(g.find("#f_gold_input").val(), 0), e = Utils.parseInt(g.find("#f_wood_input").val(), 0), h = Utils.parseInt(g.find("#f_food_input").val(), 0), o = Utils.parseInt(g.find("#f_iron_input").val(), 0);
			if(f.carry < h + e + o + a + f.cost_food + f.cost_wood + f.cost_iron + f.cost_gold)
				return showInfo(LNG.ERROR.CLIENT.EXCEEDRESOURCE), !1;
			g.find("*").unbind();
			c.find("#f_content3").show();
			c.find("#f_content").show();
			g.hide();
			R = !1;
			var j = {};
			$.extend(j, {
				take_num : f.carry,
				travel_sec : f.travel_sec,
				distance : f.distance,
				action_rices : f.cost_rice,
				action_woods : f.cost_wood,
				action_irons : f.cost_iron,
				action_golds : f.cost_gold,
				rices : h,
				woods : e,
				irons : o,
				golds : a
			});
			$.extend(j, b);
			j.action = "war_task";
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION, j, function(a) {
				CMA.add(a.ret.cd);
				d && d(!0);
				showCity();
				showInfo(LNG.SUCCESS)
			}, function(a) {
				(2522 == a || 2524 == a || 2528 == a) && CMA.reload();
				d && d(!1)
			})
		});
		g.find("#confirm_no").click(function() {
			g.find("*").unbind();
			R = !1;
			g.hide();
			d && d(!1)
		})
	}, V = function() {
		if(!L)
			return showInfo(LNG.ERROR.CLIENT.EMPTYTROOPHERO, Y), !1;
		var a = M();
		if(null == a)
			return showInfo(LNG.ERROR.CLIENT.EMPTYTARGETAREA), !1;
		var b = $("#hero_scheme").val();
		if(null == b)
			return showInfo(LNG.ERROR.CLIENT.EMPTYSCHEME), !1;
		var f = mainStatus.SCHEME_DATA[b];
		c.find("#f_content").hide();
		c.find("#f_content3").hide();
		a = {
			key : key,
			city : mainStatus.getCity().id,
			attack_type : 11,
			gen : L.id,
			scheme : b,
			area : a.area,
			area_x : a.area_x
		};
		P(f.name + "(" + p[11] + ")", a, {
			carry : 0,
			cost_food : 0,
			cost_wood : 0,
			cost_iron : 0,
			cost_gold : 0,
			distance : 0,
			travel_sec : 10
		}, function(a) {
			a || (c.find("#f_content").show(), c.find("#f_content3").show(), console.log(!1))
		})
	}, U = function(a) {
		if(!L)
			return showInfo(LNG.ERROR.CLIENT.EMPTYTROOPHERO, Y), !1;
		var b = M();
		if(null == b)
			return showInfo(LNG.ERROR.CLIENT.EMPTYTARGETAREA), !1;
		var f = S();
		if(0 == f.length)
			return showInfo(LNG.ERROR.CLIENT.EMPTYTROOP), !1;
		for(var d = 0, g = f.length; g--; )
			d += f[g][1];
		if(d > L.c2)
			return showInfo(translate(LNG.ERROR.CLIENT.BEYONDHEROCOMMAND, L.c2)), !1;
		var f = Q(f), e = $.extend({
			key : key,
			city : mainStatus.getCity().id,
			attack_type : a,
			gen : L.gid,
			area : b.area,
			area_x : b.area_x
		}, f);
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, e, function(b) {
			c.find("#f_content").hide();
			c.find("#f_content3").hide();
			P(p[a], e, b.ret, function() {
				c.find("#f_content").show();
				c.find("#f_content3").show();
				v();
				null != i && (i.refresh(), i.setPosition(0, 0))
			})
		}, function() {
		});
		return !1
	}, W = function() {
		if(!L)
			return showInfo(LNG.ERROR.CLIENT.EMPTYTROOPHERO, Y), !1;
		var a = M();
		if(null == a)
			return showInfo(LNG.ERROR.CLIENT.EMPTYTARGETAREA), !1;
		var b = S();
		if(0 == b.length)
			return showInfo(LNG.ERROR.CLIENT.EMPTYTROOP), !1;
		for(var f = 0, d = b.length; d--; )
			f += b[d][1];
		if(f > L.c2)
			return showInfo(translate(LNG.ERROR.CLIENT.BEYONDHEROCOMMAND, L.c2)), !1;
		b = Q(b);
		if(0 < C && f < C)
			showConfirm(LNG.ERROR.CLIENT.TROOPNOTENOUGH, function() {
				var f = $.extend({
					key : key,
					city : mainStatus.getCity().id,
					action : "do_war",
					attack_type : 7,
					gen : L.gid,
					area : a.area,
					area_x : a.area_x
				}, b);
				pnlLoading.show();
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, f, function(a) {
					c.find("#f_content").hide();
					c.find("#f_content3").hide();
					P(LNG.ACTIONTYPE_FULL[7], f, a.ret, function() {
						c.find("#f_content").show();
						c.find("#f_content3").show();
						v();
						null != i && (i.refresh(), i.setPosition(0, 0))
					})
				}, function() {
				})
			});
		else {
			var g = $.extend({
				key : key,
				city : mainStatus.getCity().id,
				action : "do_war",
				attack_type : 7,
				gen : L.gid,
				area : a.area,
				area_x : a.area_x
			}, b);
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, g, function(a) {
				c.find("#f_content").hide();
				c.find("#f_content3").hide();
				P(LNG.ACTIONTYPE_FULL[7], g, a.ret, function() {
					c.find("#f_content").show();
					c.find("#f_content3").show();
					v();
					null != i && (i.refresh(), i.setPosition(0, 0))
				})
			}, function() {
			})
		}
		return !1
	}, X = function() {
		if(!L)
			return showInfo(LNG.ERROR.CLIENT.EMPTYTROOPHERO, Y), !1;
		var a = M();
		if(null == a)
			return showInfo(LNG.ERROR.CLIENT.EMPTYTARGETAREA), !1;
		var b = S();
		if(0 == b.length)
			return showInfo(LNG.ERROR.CLIENT.EMPTYTROOP), !1;
		for(var f = 0, d = b.length; d--; )
			f += b[d][1];
		if(f > L.c2)
			return showInfo(translate(LNG.ERROR.CLIENT.BEYONDHEROCOMMAND, L.c2)), !1;
		b = Q(b);
		if(0 < C && f < C)
			showConfirm(LNG.ERROR.CLIENT.TROOPNOTENOUGH, function() {
				var f = $.extend({
					key : key,
					city : mainStatus.getCity().id,
					action : "do_war",
					attack_type : 8,
					gen : L.gid,
					area : a.area,
					area_x : a.area_x
				}, b);
				pnlLoading.show();
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, f, function(a) {
					c.find("#f_content").hide();
					c.find("#f_content3").hide();
					P(LNG.ACTIONTYPE_FULL[7], f, a.ret, function() {
						c.find("#f_content").show();
						c.find("#f_content3").show();
						v();
						null != i && (i.refresh(), i.setPosition(0, 0))
					})
				}, function() {
				})
			});
		else {
			var g = $.extend({
				key : key,
				city : mainStatus.getCity().id,
				action : "do_war",
				attack_type : 8,
				gen : L.gid,
				area : a.area,
				area_x : a.area_x
			}, b);
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, g, function(a) {
				c.find("#f_content").hide();
				c.find("#f_content3").hide();
				P(LNG.ACTIONTYPE_FULL[7], g, a.ret, function() {
					c.find("#f_content").show();
					c.find("#f_content3").show();
					v();
					null != i && (i.refresh(), i.setPosition(0, 0))
				})
			}, function() {
			})
		}
		return !1
	}, Z = function() {
		var a = M();
		if(null == a)
			return showInfo(LNG.ERROR.CLIENT.EMPTYTARGETAREA), !1;
		var b = Utils.parseInt(c.find("#f_city_militay_3").find("#f_troop_input").find("input").val(), 0);
		if(0 >= b)
			return showInfo(LNG.ERROR.CLIENT.EMPTYTROOP), !1;
		var f = {
			key : key,
			city : mainStatus.getCity().id,
			action : "do_war",
			attack_type : 3,
			tai_num : b,
			area : a.area,
			area_x : a.area_x
		};
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, f, function(a) {
			c.find("#f_content").hide();
			c.find("#f_content3").hide();
			P(LNG.ACTIONTYPE_FULL[3], f, a.ret, function() {
				c.find("#f_content").show();
				c.find("#f_content3").show();
				v();
				null != i && (i.refresh(), i.setPosition(0, 0))
			})
		}, function() {
		});
		return !1
	}, ha = function() {
		var a = M();
		if(null == a)
			return showInfo(LNG.ERROR.CLIENT.EMPTYTARGETAREA), !1;
		var b = {
			key : key,
			city : mainStatus.getCity().id,
			action : "do_war",
			attack_type : 5,
			area : a.area,
			area_x : a.area_x,
			info : $("#f_troop_castle_name").val()
		};
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, b, function(a) {
			c.find("#f_content").hide();
			c.find("#f_content3").hide();
			T(LNG.ACTIONTYPE_FULL[5], b, a.ret, function() {
				c.find("#f_content").show();
				c.find("#f_content3").show();
				v();
				null != i && (i.refresh(), i.setPosition(0, 0))
			})
		}, function() {
		});
		return !1
	}, ia = function() {
		var a = M();
		if(null == a)
			return showInfo(LNG.ERROR.CLIENT.EMPTYTARGETAREA), !1;
		var b = S();
		if(0 == b.length)
			return showInfo(LNG.ERROR.CLIENT.EMPTYTROOP), !1;
		var b = Q(b), f = $.extend({
			key : key,
			city : mainStatus.getCity().id,
			action : "do_war",
			attack_type : 2,
			area : a.area,
			area_x : a.area_x
		}, b);
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, f, function(a) {
			c.find("#f_content").hide();
			c.find("#f_content3").hide();
			T(LNG.ACTIONTYPE_FULL[2], f, a.ret, function() {
				c.find("#f_content").show();
				c.find("#f_content3").show();
				v();
				null != i && (i.refresh(), i.setPosition(0, 0))
			})
		}, function() {
		});
		return !1
	}, ca = function() {
		c.find("#f_city_militay_0,#f_city_militay_2,#f_city_militay_3,#f_city_militay_5,#f_city_militay_1").hide();
		var a = c.find("#f_city_war_type_sel").val();
		da();
		k = "165px";
		"0" == a || "7" == a || "8" == a || "9" == a ? (c.find("#f_city_war_type_target").show(), c.find("#f_city_militay_0").show(), c.find("#f_troop_inputs").show()) : "10" == a ? (c.find("#f_city_war_type_target").hide(), c.find("#f_city_militay_2").show(), c.find("#f_troop_inputs").show(), k = "185px") : "2" == a ? (c.find("#f_city_war_type_target").show(), c.find("#f_city_militay_2").show(), c.find("#f_troop_inputs").show()) : "3" == a ? (c.find("#f_city_war_type_target").show(), c.find("#f_city_militay_3").show(), c.find("#f_troop_inputs").hide()) : "5" == a ? (c.find("#f_city_war_type_target").show(), c.find("#f_city_militay_5").show(), c.find("#f_troop_inputs").hide()) : "11" == a && (c.find("#f_city_war_type_target").show(), c.find("#f_city_militay_1").show(), c.find("#f_troop_inputs").hide(), $($("#hero_scheme option")[0]).attr("selected", "selected"), $("#hero_scheme").change(), window.selectProxy.proxySelect($("#hero_scheme")[0]));
		v();
		null != i && (i.refresh(), i.setPosition(0, 0));
		return !1
	};
	c.find("#f_content3_start").click(function() {
		var a = c.find("#f_city_war_type_sel").val();
		if("0" == a) {
			if(0 < userinfo.protection)
				return showInfo(LNG.ERROR.CLIENT.NOMILITARY_PROTECTION), !1;
			if(0 != (userinfo.status & 1))
				return showInfo(LNG.ERROR.CLIENT.NOMILITARY_TRUCE), !1;
			if(0 != (userinfo.status & 2))
				return showInfo(LNG.ERROR.CLIENT.NOMILITARY_VACATION), !1
		} else if("5" == a) {
			var b = Utils.trim($("#f_troop_castle_name").val());
			if("" == b)
				return showInfo(LNG.ERROR.CLIENT.EMPTYCASTLENAME), !1;
			if("0" == $("#f_city_militay_5").find("#f_troop_max_val").text())
				return showInfo(LNG.ERROR.SERVER[2533]), !1;
			$("#f_troop_castle_name").val(b)
		} else if("10" == a) {
			var f = S();
			if(0 == f.length)
				return showInfo(LNG.ERROR.CLIENT.EMPTYTROOP), !1;
			showConfirm(LNG.DISARMY, function() {
				pnlLoading.show();
				f = Q(f);
				var a = $.extend({
					key : key,
					city : mainStatus.getCity().id,
					action : "disband"
				}, f);
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SOLDIER_EDUCATE, a, function(a) {
					mainStatus.CITY_INFO[6] += a.ret.w;
					mainStatus.CITY_INFO[2] += a.ret.g;
					mainStatus.CITY_INFO[4] += a.ret.f;
					mainStatus.CITY_INFO[8] += a.ret.i;
					showInfo(translate(LNG.GETITEM2, '<img src="img/res/wood.png"/>x' + a.ret.w + '&nbsp;<img src="img/res/food.png"/>x' + a.ret.f + '&nbsp;<img src="img/res/iron.png"/>x' + a.ret.i + '&nbsp;<img src="img/res/ic06_other.gif"/>x' + a.ret.g));
					for( a = 0; a < B.soldiers.length; a++) {
						var b = B.soldiers[a][0];
						"undefined" != typeof f["soldier_num" + b] && null != f["soldier_num" + b] && (B.soldiers[a][1] -= f["soldier_num" + b])
					}
					l(function() {
						ca();
						da();
						s(0, 0)
					})
				})
			})
		}
		return "10" == a ? !1 : "7" == a ? W() : "8" == a ? X() : "3" == a ? Z() : "5" == a ? ha() : "2" == a ? ia() : "11" == a ? V() : U(a)
	});
	var Y = function() {
		$("#f_content3").hide();
		$("#f_content3_military").hide();
		c.find("#f_content").removeClass("canvasbg");
		$("#wrapper").css("height", "225px");
		var a = i.x, b = i.y;
		i.setPosition(0, 0);
		R = !0;
		"11" == c.find("#f_city_war_type_sel").val() ? showFreeHeroPanel4(c.find("#f_content3_military_hero_select"), !1, function(f) {
			R = !1;
			if(null == f)
				showInfo(LNG.ERROR.CLIENT.NOFREEHERO);
			else {
				L = f;
				var d = mainStatus.HERO_DATA[f.gid];
				c.find("#f_city_militay_0_hero_name").html(LNG.MILITARY.HERO.format(d.name, f.g, f.e));
				$("#f_content3").show();
				$("#f_content3_military").show();
				c.find("#f_content").addClass("canvasbg");
				v();
				null != i && (i.refresh(), i.setPosition(a, b))
			}
		}, null, null, null, ["grade", "power", "intellect", "defense", "energy"]) : showFreeHeroPanel(c.find("#f_content3_military_hero_select"), !1, function(f) {
			R = !1;
			if(null == f)
				showInfo(LNG.ERROR.CLIENT.NOFREEHERO);
			else {
				L = f;
				var d = mainStatus.HERO_DATA[f.gid];
				c.find("#f_city_militay_0_hero_name").html(d.name + "&nbsp;(" + f.g + ")");
				c.find("#f_city_militay_0_hero_troop").text(f.c2)
			}
			$("#f_content3").show();
			$("#f_content3_military").show();
			c.find("#f_content").addClass("canvasbg");
			v();
			null != i && (i.refresh(), i.setPosition(a, b))
		});
		return !1
	}, fa = function(a, b) {
		var f = mainStatus.SOLDIER_DATA[b[0]];
		a.find("#f_troop_name").text(f.name);
		a.find("#f_troop_max_val").text(b[1]);
		a.find("#f_troop_input_input").data("soldier", b);
		a.find("#f_troop_max").click(function() {
			var f = c.find("#f_city_militay_0_hero_troop").text();
			if("" != f) {
				var f = parseInt(f), d = 0;
				c.find("#f_troop_inputs").find("#f_troop_input_input").each(function() {
					var a = $(this), c = Utils.parseInt(a.val(), 0);
					0 < c && a.data("soldier")[0] != b[0] && (d += c)
				});
				d < f ? (f -= d, f > b[1] && ( f = b[1]), a.find("input").val(f)) : a.find("input").val(0)
			} else
				a.find("input").val(b[1]);
			return !1
		});
		var d = a.find("input").get(0);
		a.find("#f_troop_input_minus").unbind();
		a.find("#f_troop_input_minus").bind("mousedown touchstart", function() {
			H();
			F(d, -1, 0)
		});
		a.find("#f_troop_input_minus").bind("mouseup touchend", function() {
			H()
		});
		a.find("#f_troop_input_plus").unbind();
		a.find("#f_troop_input_plus").bind("mousedown touchstart", function() {
			H();
			F(d, 1, b[1])
		});
		a.find("#f_troop_input_plus").bind("mouseup touchend", function() {
			H()
		})
	}, ea = null, da = function() {
		var a = c.find("#f_troop_inputs");
		null == ea && ( ea = a.find("#f_troop_input"));
		a.empty();
		var b = 0, f = 0, d = 0;
		if(null != B && null != B.soldiers) {
			var g = c.find("#f_city_war_type_sel").val();
			window.selectProxy.proxySelect($("#f_city_war_type_sel")[0]);
			$.each(B.soldiers, function(e, h) {
				var o = ea.clone();
				o.attr("id", "f_troop_input_no" + e);
				2 == h[0] ? (fa(c.find("#f_city_militay_3").find("#f_troop_input"), h), f = 1) : 8 == h[0] && (c.find("#f_city_militay_5").find("#f_troop_max_val").text(h[1]), d = 1);
				if(0 < h[1] && ("7" != g || 8 != h[0]))
					fa(o, h), a.append(o.show()), b++
			})
		}
		c.find("#f_city_militay_3").is(":visible") ? 0 == f && showInfo(LNG.NOSOLDIERAVALIABLE) : c.find("#f_city_militay_5").is(":visible") ? 0 == d && showInfo(LNG.NOSOLDIERAVALIABLE) : 0 == b && showInfo(LNG.NOSOLDIERAVALIABLE)
	}, ga = function() {
		l(function() {
			ca();
			da();
			s(0, 0)
		});
		E()
	};
	(function() {
		c.find("#f_city_war_type_sel").change(ca);
		c.find("#f_city_militay_select_hero").click(Y);
		c.find("#f_city_militay_map").click(function() {
			if("" != $("#f_content3_war_x").val() && "" != $("#f_content3_war_y").val()) {
				var a = parseInt($("#f_content3_war_x").val()), b = parseInt($("#f_content3_war_y").val());
				main_loadDiv("f_map.html", {
					x : a,
					y : b
				})
			} else
				main_loadDiv("f_map.html");
			return !1
		})
	})();
	$("#hero_scheme").change(function() {
		var a = $(this).val(), a = mainStatus.SCHEME_DATA[a];
		$("#scheme_description").html(a.description)
	});
	$("#f_content2_defense_input").change(function() {
		var a = parseInt($("#f_content2_defense_input").val());
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SOLDIER_EDUCATE, {
			key : key,
			action : "def",
			city : mainStatus.getCity().id,
			defense : a
		}, function() {
		});
		return !1
	});
	var R = !1;
	c.find("#f_tab1,#f_tab2,#f_tab3,#f_tab4,#f_tab5,#f_tab6").click(function(a) {
		!R && $(this).hasClass("tab_inactive") && (c.find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), $("#f_content1,#f_content2,#f_content3,#f_content3_military,#f_content4,#f_content5,#f_content2_defense_type,#f_content6").hide(), $("#f_city_promotion").unbind().empty(), $(this).trigger("tab", a));
		return !1
	});
	var aa = null, ba = null;
	c.find("#f_tab6").bind("tab", function() {
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, {
			key : key,
			act : "warinfo",
			city : mainStatus.CITY_ID
		}, function(a) {
			var b = a.ret[1];
			c.find("#f_content6_skill").html(LNG.DEFENSE_SKILL[Math.floor(b / 5)]);
			ba = a.ret[0];
			m();
			null != i && (i.refresh(), i.setPosition(0, 0))
		});
		c.find("#f_content6").show();
		c.find("#wrapper").css("height", "250px");
		c.find("#f_content").removeClass("canvasbg");
		c.find("#f_content").show();
		return !1
	});
	c.find("#f_tab5").bind("tab", function() {
		if(0 != userinfo.conq[0]) {
			pnlLoading.show();
			var a = CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO;
			ajaxCall(a, {
				key : key,
				action : "conquerend"
			}, function(a) {
				c.find("#f_content5_title2 strong").text(Utils.timeString(a.ret.sec))
			});
			c.find("#f_content5_title1").hide();
			c.find("#f_content5_title2 b").text(userinfo.conq[2]);
			c.find("#f_content5_title2").show();
			c.find("#f_content5_list_title").hide();
			c.find("#f_content5_list").hide()
		} else
			pnlLoading.show(), a = CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, ajaxCall(a, {
				key : key,
				action : "list_conquer"
			}, function(a) {
				aa = a.ret.list;
				q();
				null != i && (i.refresh(), i.setPosition(0, 0))
			}), c.find("#f_content5_title1 b").text(userinfo.conq[3]), c.find("#f_content5_title1").show(), c.find("#f_content5_title2").hide();
		c.find("#f_content5").show();
		c.find("#wrapper").css("height", "250px");
		c.find("#f_content").removeClass("canvasbg");
		c.find("#f_content").show();
		return !1
	});
	c.find("#f_tab4").bind("tab", function() {
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SOLDIER_EDUCATE, {
			key : key,
			city : mainStatus.CITY_ID,
			action : "hospital"
		}, function(b) {
			e = b.ret.list;
			a = b.ret.ids;
			u();
			null != i && (i.refresh(), i.setPosition(0, 0))
		});
		c.find("#wrapper").css("height", "250px");
		c.find("#f_content").removeClass("canvasbg");
		c.find("#f_content").show();
		return !1
	});
	c.find("#f_tab1").bind("tab", function() {
		c.find("#f_content").hide();
		c.find("#f_content3_military_hero_select").empty().unbind();
		c.find("#f_content1").show();
		return !1
	});
	c.find("#f_tab2").bind("tab", function() {
		var a = c.find("#f_content2");
		if(a.is(":visible"))
			return !1;
		c.find("#f_content2_defense_type").show();
		a.show();
		K();
		c.find("#wrapper").css("height", "250px");
		c.find("#f_content").removeClass("canvasbg");
		c.find("#f_content3_military_hero_select").empty().unbind();
		c.find("#f_content").show();
		null != i && (i.refresh(), i.setPosition(0, 0));
		return !1
	});
	c.find("#f_tab3").bind("tab", function() {
		if(c.find("#f_content3").is(":visible"))
			return !1;
		c.find("#f_action_build_confirm, #f_action_military_confirm").hide();
		c.find("#f_content3").show();
		c.find("#f_content3_military").show();
		c.find("#f_content").addClass("canvasbg");
		c.find("#f_content").show();
		ga();
		v();
		s();
		return !1
	});
	c.find("#f_close").click(function() {
		showCity();
		return !1
	});
	c.find("#f_soldier_close").click(function() {
		c.find("#f_soldier_info").hide();
		return !1
	});
	c.css("background-image", "url(img/bg/view.jpg)");
	(function() {
		"undefined" != typeof statinfo.ce && null != statinfo.ce && 1 == statinfo.ce ? $("#f_tab5").show() : ($("#f_tab5").hide(), $("#f_city_war_type_sel option[value='9']").remove());
		window.isIphone && (Utils.replaceInput(document.getElementById("f_num_input"), "number"), c.find("#f_troop_input_input").each(function(a, b) {
			Utils.replaceInput(b, "number")
		}), Utils.replaceInput(document.getElementById("f_food_input"), "number"), Utils.replaceInput(document.getElementById("f_wood_input"), "number"), Utils.replaceInput(document.getElementById("f_gold_input"), "number"), Utils.replaceInput(document.getElementById("f_iron_input"), "number"), Utils.replaceInput(document.getElementById("f_content3_war_x"), "number"), Utils.replaceInput(document.getElementById("f_content3_war_y"), "number"));
		pnlLoading.hide();
		var a = Utils.getCookie("warinfo");
		if(null != a && "" != a) {
			$("#f_city_war_type_sel").val(a.type);
			c.find("#f_content1").hide();
			c.find("#f_content3").show();
			c.find("#f_content3_military").show();
			c.find("#f_content").addClass("canvasbg");
			c.find("#f_tab1").removeClass("tab_active").addClass("tab_inactive");
			c.find("#f_tab3").removeClass("tab_inactive").addClass("tab_active");
			k = 10 == a.type ? "185px" : "165px";
			v();
			"undefined" != typeof a.x && $("#f_content3_war_x").val(a.x);
			"undefined" != typeof a.y && $("#f_content3_war_y").val(a.y);
			if((7 == a.type || 0 == a.type) && "undefined" != typeof a.y && "undefined" != typeof a.x) {
				var b = {
					key : key,
					city : mainStatus.getCity().id,
					act : "anum",
					x : a.x,
					y : a.y
				};
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, b, function(a) {
					$("#f_city_militay_anum b").text(a.ret);
					$("#f_city_militay_anum").show()
				})
			}
			if("undefined" != typeof a.force && null != a.force && "" != a.force)
				C = a.force;
			ga();
			Utils.delCookie("warinfo")
		}
		i = new iScroll("scroller", {
			desktopCompatibility : !0
		})
	})()
});
defineSubView("f_city_research", function() {
	function v(a) {
		a ? setTimeout(arguments.callee, a) : e = new iScroll($("#f_content4 .move")[0], {
			desktopCompatibility : !0
		})
	}

	function s(a, b) {
		null != i && (i.refresh(), i.setPosition(a || 0, b || 0));
		return !1
	}

	function u() {
		k.find("#f_content3_scroll").unbind().empty();
		$.each(H, function(a, b) {
			var c = mainStatus.ITEM_DATA[b.sid];
			if(!("undefined" == typeof c || null == c)) {
				for(var d = LNG.ITEMRANK[c.rank], e = c.desc, h = 0; h < b.attr.length; h++)
					0 != b.attr[h] && ( e = translate(e, b.attr[h]));
				k.find("#f_content3_scroll").append('<p><input id="f_content3_sel' + b.id + '" type="checkbox"/>&nbsp;<b><font color="' + d.color + '">' + c.name + '</font></b> <strong>(<font color="' + d.color + '">' + d.name + "</font>)</strong> <b>" + (0 < b.up ? "+" + b.up : "") + "</b></p>");
				k.find("#f_content3_sel" + b.id).click(function() {
					null != I && k.find("#f_content3_sel" + I.id).attr("checked", !1);
					I = b;
					k.find("#f_content3_img").css("background-image", "url(" + Utils.getItemImage(b.sid) + ")");
					k.find("#f_content3_name").css("color", d.color).text(c.name);
					k.find("#f_content3_rank").css("color", d.color).text(d.name);
					k.find("#f_content3_level").text(0 < b.up ? "+" + b.up : "");
					k.find("#f_content3_desc").html(e);
					k.find("#f_content3_gold b").text(b.p)
				})
			}
		})
	}

	function q(a) {
		k.find("#f_content3_sel" + a).click();
		k.find("#f_content3_sel" + a).attr("checked", !0)
	}

	function m() {
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
			key : key,
			action : "listupdate",
			type : F
		}, function(a) {
			H = a.ret.item;
			k.find("#f_content3_per").text(a.ret.per);
			0 < a.ret.cd ? (k.find("#f_content3_cd b").text(Utils.timeString(a.ret.cd)), k.find("#f_content3_gold").hide(), k.find("#f_content3_cd").show(), k.find("#f_content3_upgrade").hide()) : (k.find("#f_content3_gold").show(), k.find("#f_content3_cd").hide(), k.find("#f_content3_upgrade").show());
			0 < a.ret.up ? k.find("#f_content3_trend").attr("src", "img/button/arrow_u.png") : k.find("#f_content3_trend").attr("src", "img/button/arrow_d.png");
			u();
			null == H || 0 == H.length ? ($("#f_content3_img").css("background-image", "url(img/item/sample.gif)"), $("#f_content3_name").text("N/A"), $("#f_content3_rank").text("N/A"), $("#f_content3_level").text(""), $("#f_content3_desc").text(""), $("#f_content3_upgrade").hide(), $("#f_content3_degrade").hide()) : (q(H[0].id), $("#f_content3_upgrade").show(), $("#f_content3_degrade").show());
			null != i && (i.refresh(), i.setPosition(0, 0))
		})
	}

	var i = null, e = null, a = $("#f_city_research_html_script"), k = $(a.parent().get(0)), t = EMA.getProxy();
	k.bind("dispose", function() {
		null != i && (i.destroy(!1), i = null);
		null != e && (e.destroy(!1), e = null);
		Utils.removeCss("f_city_research_css");
		t.dispose();
		k = t = null
	});
	var c = [{
		buildtype : 9,
		panel : k.find("#f_content1").find("#f_lab")
	}], z = mainStatus.BUILDING_DATA, p = function(a) {
		var b = mainStatus.getCity(), c = z[a.buildtype], d = mainStatus.CITY_INFO.getLevel(a.buildtype), e = c.upgrade[d];
		if(e)
			0 < d ? ( c = LNG.CONFIRMBUILD, c = LNG.UPGRADE_CONFIRM, showConfirm(c, function() {
				pnlLoading.show();
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
					key : key,
					city : b.id,
					build_type : a.buildtype
				}, function(b) {
					a.panel.find("#f_upgrade").hide();
					a.panel.find("#f_build_promotion").show();
					mainStatus.CITY_INFO[6] -= e.w;
					mainStatus.CITY_INFO[2] -= e.g;
					mainStatus.CITY_INFO[4] -= e.f;
					mainStatus.CITY_INFO[8] -= e.i;
					CMA.add(b.ret.cdlist)
				}, function(a) {
					(704 == a || 707 == a) && CMA.reload()
				})
			})) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
				key : key,
				city : b.id,
				build_type : a.buildtype
			}, function(b) {
				a.panel.find("#f_upgrade").hide();
				a.panel.find("#f_build_promotion").show();
				mainStatus.CITY_INFO[6] -= e.w;
				mainStatus.CITY_INFO[2] -= e.g;
				mainStatus.CITY_INFO[4] -= e.f;
				mainStatus.CITY_INFO[8] -= e.i;
				CMA.add(b.ret.cdlist)
			}, function(a) {
				(704 == a || 707 == a) && CMA.reload()
			}))
	}, C = [{
		id : 115,
		shop : 1
	}, {
		id : 116,
		shop : 1
	}, {
		id : 117,
		shop : 1
	}], d = [{
		id : 1001,
		shop : 1,
		icon : "gem.jpg",
		name : LNG.INSTANT_COMPLETE,
		desc : LNG.INSTANT_COMPLETE_DESC,
		price : 0
	}], D = function(a) {
		var b = CMA.getCD(1, a.buildtype);
		if(null != b)
			return a = (new Date).getTime(), a = Math.ceil((b.end - a) / 1E3), pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CD_PRICE, {
				type : b.cdtype,
				secs : a
			}, function(a) {
				G = !0;
				a = a.ret.price;
				0 < a ? d[0].price = a : d = null;
				$("#f_content1").hide();
				showItemPromotion($("#f_city_promotion"), C, function(a) {
					G = !1;
					if(1001 == a) {
						pnlLoading.show();
						var c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO;
						ajaxCall(c, {
							key : key,
							city : mainStatus.CITY_ID,
							tid : b.id,
							action : "build2"
						}, function(a) {
							userinfo.money = a.ret.money;
							refreshUserInfo();
							CMA.changeSecs(b.id, 0);
							showInfo(LNG.SUCCESS)
						})
					} else
						0 != a && (pnlLoading.show(), c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO, ajaxCall(c, {
							key : key,
							city : mainStatus.CITY_ID,
							tid : b.id,
							action : "build",
							iid : a
						}, function(a) {
							CMA.changeSecs(b.id, a.ret.secs);
							showInfo(LNG.SUCCESS)
						}));
					$("#f_content1").show()
				}, !0, d)
			}), !1
	}, r = function(a, b) {
		if(z) {
			var c = z[a], d = mainStatus.CITY_INFO.getLevel(a), e = c.upgrade[d];
			e && (b.find("#f_title").html(c.name), Utils.loadImage(b.find("#f_img"), Utils.getBuildingImage(a)), b.find("#f_desc").html(c.desc), b.find("#f_level").html(d), b.find("#resfood b").html(e.f), mainStatus.CITY_INFO[4] < e.f && b.find("#resfood b").css("color", "#FFD17A"), b.find("#reswood b").html(e.w), mainStatus.CITY_INFO[6] < e.w && b.find("#reswood b").css("color", "#FFD17A"), b.find("#resiron b").html(e.i), mainStatus.CITY_INFO[8] < e.i && b.find("#resiron b").css("color", "#FFD17A"), b.find("#resgold b").html(e.g), mainStatus.CITY_INFO[2] < e.g && b.find("#resgold b").css("color", "#FFD17A"), e = buildtime(e.t, mainStatus.CITY_INFO[22]), "undefined" != typeof statinfo.vs && null != statinfo.vs && (e *= statinfo.vs), b.find("#clock b").html(Utils.timeString2(Math.ceil(e))), c.upgrade[d + 1] ? (b.find("#f_upgrade").show(), b.find("#f_build_promotion").hide()) : (b.find("#f_upgrade").hide(), b.find("#f_cd1").hide()))
		}
	}, a = function() {
		$.each(c, function(a, b) {
			r(b.buildtype, b.panel)
		})
	}, n = function(a, b) {
		$.each(c, function(a, c) {
			c.buildtype == b && r(c.buildtype, c.panel)
		});
		A = !0
	};
	$.each(c, function(a, b) {
		var d = b.panel, e = c[a].buildtype, h = d.find("#f_cd1 p"), o = d.find("#f_upgrade"), j = d.find("#f_build_promotion");
		t.bind(CMA.getTickEventId(1, e), function(a) {
			o.hide();
			j.show();
			h.html(Utils.timeString2(a))
		});
		t.bind(CMA.getDoneEventId(1, e), function() {
			n(o, e)
		})
	});
	a();
	(function() {
		$.each(c, function(a, b) {
			b.panel.find("#f_upgrade").click(function() {
				p(b);
				return !1
			});
			b.panel.find("#f_build_promotion").click(function() {
				D(b);
				return !1
			})
		})
	})();
	CMA.forceNotify();
	t.bind("cityinfoupdate", a);
	var y = k.find("#f_content2"), j = function(a, b) {
		var c = mainStatus.TECH_DATA[b[0]], d = c.upgrade[b[1]];
		Utils.loadImage(a.find("#f_tech_icon"), Utils.getTechImage(b[0]));
		a.find("#f_title").html(c.name);
		a.find("#f_desc").html(c.desc);
		1 == b[2] ? a.find("#f_need").html("<b>" + LNG.NEED + "</b>:&nbsp;" + c.need) : a.find("#f_need").html(LNG.NEED + ":&nbsp;<font color=#FFD17A>" + c.need + "</font>");
		a.find("#f_level").html(b[1]);
		a.find("#resfood b").html(d.f);
		mainStatus.CITY_INFO[4] < d.f && a.find("#resfood b").css("color", "#FFD17A");
		a.find("#reswood b").html(d.w);
		mainStatus.CITY_INFO[6] < d.w && a.find("#reswood b").css("color", "#FFD17A");
		a.find("#resiron b").html(d.i);
		mainStatus.CITY_INFO[8] < d.i && a.find("#resiron b").css("color", "#FFD17A");
		a.find("#resgold b").html(d.g);
		mainStatus.CITY_INFO[2] < d.g && a.find("#resgold b").css("color", "#FFD17A");
		c = techtime(d.t, mainStatus.CITY_INFO[18]);
		"undefined" != typeof statinfo.vs && null != statinfo.vs && (c *= statinfo.vs);
		a.find("#clock b").html(Utils.timeString2(Math.ceil(c)));
		0 == b[2] && (a.find("#f_upgrade").hide(), a.find("#f_cd1").hide())
	}, b = function(a, b) {
		var c = mainStatus.TECH_DATA[b[0]].upgrade[b[1]];
		j(a, b);
		var d = a.find("#f_cd1 p"), e = a.find("#f_upgrade"), n = a.find("#f_tech_promotion");
		t.unbind(CMA.getTickEventId(2, b[0]));
		t.bind(CMA.getTickEventId(2, b[0]), function(a) {
			e.hide();
			n.show();
			d.html(Utils.timeString2(a))
		});
		t.unbind(CMA.getDoneEventId(2, b[0]));
		t.bind(CMA.getDoneEventId(2, b[0]), function() {
			A = !0;
			o()
		});
		var i = [{
			id : 118,
			shop : 1
		}, {
			id : 122,
			shop : 1
		}, {
			id : 165,
			shop : 1
		}], x = [{
			id : 1001,
			shop : 1,
			icon : "gem.jpg",
			name : LNG.INSTANT_COMPLETE,
			desc : LNG.INSTANT_COMPLETE_DESC,
			price : 0
		}];
		n.click(function() {
			var a = CMA.getCD(2, b[0]);
			if(null != a) {
				var c = (new Date).getTime(), c = Math.ceil((a.end - c) / 1E3);
				pnlLoading.show();
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CD_PRICE, {
					type : a.cdtype,
					secs : c
				}, function(b) {
					G = !0;
					b = b.ret.price;
					0 < b ? x[0].price = b : x = null;
					$("#f_content2").hide();
					$("#f_content2_next").hide();
					showItemPromotion($("#f_city_promotion"), i, function(b) {
						G = !1;
						if(1001 == b) {
							pnlLoading.show();
							var c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO;
							ajaxCall(c, {
								key : key,
								city : mainStatus.CITY_ID,
								tid : a.id,
								action : "study2"
							}, function(b) {
								userinfo.money = b.ret.money;
								refreshUserInfo();
								CMA.changeSecs(a.id, 0);
								showInfo(LNG.SUCCESS)
							})
						} else
							0 != b && (pnlLoading.show(), c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO, ajaxCall(c, {
								key : key,
								city : mainStatus.CITY_ID,
								tid : a.id,
								action : "study",
								iid : b
							}, function(b) {
								CMA.changeSecs(a.id, b.ret.secs);
								showInfo(LNG.SUCCESS)
							}));
						$("#f_content2").show();
						null != l && 0 < l[0] && $("#f_content2_next").show()
					}, !0, x)
				})
			}
		});
		e.click(function() {
			0 < b[1] ? showConfirm(LNG.CONFIRMRESEARCH, function() {
				h(b, c, e, n)
			}) : h(b, c, e, n);
			return !1
		})
	}, h = function(a, b, c, d) {
		k.find("#f_content2").hide();
		k.find("#f_content2_next").hide();
		var e = i.x, h = i.y;
		G = !0;
		showFreeHeroPanel(k.find("#f_city_wall_heros").empty().show(), !0, function(o) {
			G = !1;
			k.find("#f_city_wall_heros").hide();
			k.find("#f_content2").show();
			null != l && 0 < l[0] && k.find("#f_content2_next").show();
			s(e, h);
			var j = 0;
			if(null != o)
				j = o.id;
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_STUDY, {
				key : key,
				city : mainStatus.getCity().id,
				tech : a[0],
				owner : j
			}, function(a) {
				c.hide();
				d.show();
				mainStatus.CITY_INFO[6] -= b.w;
				mainStatus.CITY_INFO[2] -= b.g;
				mainStatus.CITY_INFO[4] -= b.f;
				mainStatus.CITY_INFO[8] -= b.i;
				CMA.add(a.ret.cdlist)
			}, function(a) {
				1003 == a && CMA.reload()
			})
		}, "intellect")
	}, A = !0, B = function(a) {
		null == x || A ? (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_STUDY_LIST, {
			key : key,
			city : mainStatus.getCity().id
		}, function(b) {
			x = b.ret;
			l = b.ext;
			A = !1;
			a && a()
		}, function(a) {
			903 == a && k.find("#f_tab1").click();
			return !1
		}, "#loading")) : a && a()
	}, x = null, l = null, E = !1, o = function() {
		E && !1 == A ? null != l && 0 < l[0] ? $("#f_content2_next").show() : $("#f_content2_next").hide() : B(function() {
			y.empty();
			null != x && (x.sort(function(a, b) {
				return a.id - b.id
			}), $.each(x, function(a, c) {
				var f = $("#f_tech_template").clone();
				f.attr("id", "f_tech_no" + a);
				b(f, c);
				y.append(f.show())
			}));
			if(null != l && 0 < l[0]) {
				$("#f_content2_next_level").text(l[1]);
				var a = mainStatus.TECH_DATA[l[0]], c = a.upgrade[0];
				Utils.loadImage($("#f_content2_next_icon"), Utils.getTechImage(l[0]));
				$("#f_content2_next_title").html(a.name);
				$("#f_content2_next_desc").html(a.desc);
				$("#f_content2_next_need").html("<b>" + LNG.NEED + "</b>:&nbsp;" + a.need);
				$("#f_content2_next_resfood b").html(c.f);
				$("#f_content2_next_reswood b").html(c.w);
				$("#f_content2_next_resiron b").html(c.i);
				$("#f_content2_next_resgold b").html(c.g);
				a = techtime(c.t, mainStatus.CITY_INFO[18]);
				"undefined" != typeof statinfo.vs && null != statinfo.vs && (a *= statinfo.vs);
				$("#f_content2_next_clock b").html(Utils.timeString2(Math.ceil(a)));
				$("#f_content2_next").show()
			} else
				$("#f_content2_next").hide();
			CMA.forceNotify(2);
			s();
			E = !0
		})
	}, G = !1;
	k.find("#f_tab1,#f_tab2,#f_tab3,#f_tab4").click(function(a) {
		!G && $(this).hasClass("tab_inactive") && (k.find("#f_content_title").find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), k.find("#f_content1,#f_content2,#f_content2_next,#f_content3_title,#f_content3_scroll,#f_content3,#f_content4").hide(), k.find("#f_content").css("top", "0px").css("height", "228px"), $(this).trigger("tab", a));
		return !1
	});
	k.find("#f_content3_tab1,#f_content3_tab2,#f_content3_tab3,#f_content3_tab4,#f_content3_tab5").click(function(a) {
		!G && $(this).hasClass("tab_inactive") && (k.find("#f_content3_title").find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), $(this).trigger("tab", a));
		return !1
	});
	k.find("#f_content3_tab1").bind("tab", function() {
		F = 1;
		m();
		return !1
	});
	k.find("#f_content3_tab2").bind("tab", function() {
		F = 2;
		m();
		return !1
	});
	k.find("#f_content3_tab3").bind("tab", function() {
		F = 5;
		m();
		return !1
	});
	k.find("#f_content3_tab4").bind("tab", function() {
		F = 4;
		m();
		return !1
	});
	k.find("#f_content3_tab5").bind("tab", function() {
		F = 6;
		m();
		return !1
	});
	k.find("#f_tab1").bind("tab", function() {
		var a = k.find("#f_content1");
		if(a.is(":visible"))
			return !1;
		k.find("#wrapper").css("top", "0px").css("height", "228px");
		a.show();
		null != i && (i.refresh(), i.setPosition(0, 0));
		return !1
	});
	k.find("#f_tab2").bind("tab", function() {
		var a = k.find("#f_content2");
		if(a.is(":visible"))
			return !1;
		k.find("#wrapper").css("top", "0px").css("height", "228px");
		a.show();
		o();
		null != i && (i.refresh(), i.setPosition(0, 0));
		return !1
	});
	k.find("#f_content3_degrade").click(function() {
		if(null != I) {
			if(0 == I.up)
				return showInfo(LNG.NOTUPGRADE), !1;
			showConfirm(translate(LNG.CONFIRMDEHANCE, mainStatus.ITEM_DATA[I.sid].name), function() {
				pnlLoading.show();
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
					key : key,
					city : mainStatus.getCity().id,
					id : I.id,
					action : "degrade"
				}, function(a) {
					mainStatus.CITY_INFO[2] += a.ret[1];
					I.p = a.ret[2];
					I.attr = a.ret[3];
					I.up = a.ret[4];
					u();
					q(I.id);
					showInfo(translate(LNG.GOLDRETURN, a.ret[1]))
				})
			})
		}
		return !1
	});
	k.find("#f_content3_upgrade").click(function() {
		if(null != I) {
			var a = mainStatus.ITEM_DATA[I.sid], b = null, b = 0 < I.up ? translate(LNG.CONFIRMENHANCE, a.name) : translate(LNG.CONFIRMNOTRADE, a.name);
			showConfirm(b, function() {
				pnlLoading.show();
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
					key : key,
					city : mainStatus.getCity().id,
					id : I.id,
					action : "upgrade"
				}, function(a) {
					k.find("#f_content3_gold").hide();
					k.find("#f_content3_cd b").text(Utils.timeString(a.ret[1]));
					k.find("#f_content3_cd").show();
					k.find("#f_content3_upgrade").hide();
					mainStatus.CITY_INFO[2] -= k.find("#f_content3_gold b").text();
					0 == a.ret[0] ? showInfo(LNG.UPGRADEFAIL) : (I.p = a.ret[2], I.attr = a.ret[3], I.up = a.ret[4], u(), q(I.id), showInfo(LNG.SUCCESS))
				})
			})
		}
		return !1
	});
	k.find("#f_content3_cd").click(function() {
		showConfirm(LNG.CONFIRMENHANCECD, function() {
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
				key : key,
				action : "cd"
			}, function(a) {
				k.find("#f_content3_gold").show();
				k.find("#f_content3_cd").hide();
				k.find("#f_content3_upgrade").show();
				userinfo.money = a.ret.money;
				refreshUserInfo()
			})
		});
		return !1
	});
	var F = 1, H = null, I = null;
	k.find("#f_tab3").bind("tab", function() {
		var a = k.find("#f_content3");
		if(a.is(":visible"))
			return !1;
		k.find("#wrapper").css("top", "10px").css("height", "190px");
		k.find("#f_content3_title").show();
		k.find("#f_content3_scroll").show();
		a.show();
		null == H ? m() : null != i && (i.refresh(), i.setPosition(0, 0));
		return !1
	});
	k.find("#f_tab4").bind("tab", function() {
		O.init()
	});
	k.find("#f_close").click(function() {
		showCity();
		return !1
	});
	k.css("background-image", "url(img/bg/view.jpg)");
	var O = function() {
		function a(b) {
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GOODS_COMBINE, {
				key : key,
				action : "list"
			}, function(a) {
				b && b(a.ret.items)
			})
		}

		function b(a) {
			j.empty();
			if(a)
				for(var c = 0; c < a.length; c++) {
					var f = a[c], e = mainStatus.ITEM_DATA[f[1]], g = LNG.ITEMRANK[e.rank], h = o.clone().removeClass("f_content4_list_template");
					h.find("[name=name]").html(e.name).end().css("color", g.color);
					( e = parseInt(f[2])) && h.find("[name=level]").html('<span style="color:#fff">(</span>+' + e + '<span style="color:#fff">)</span>');
					h.appendTo(j).show();
					(function(a, b) {
						b.find(".select").click(function() {
							d(a, b)
						})
					})(f, h)
				}
			v(25)
		}

		function c(a, b) {
			a.length == k && (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GOODS_COMBINE, {
				key : key,
				action : "combine",
				city : mainStatus.getCity().id,
				item1 : a[0][0],
				item2 : a[1][0],
				item3 : a[2][0]
			}, function(a) {
				b && b(a)
			}))
		}

		function d(a, b) {
			if(b.hasClass("noselect"))
				E.length < k && (E.push(a), b.removeClass("noselect"));
			else {
				$(this).find("input").attr("checked", !1);
				for(var c = 0; c < E.length; c++)
					if(E[c][0] == a[0]) {
						E.splice(c, 1);
						b.addClass("noselect");
						break
					}
			}
			e(E);
			return !1
		}

		function e(a) {
			l.each(function(b) {
				( b = a[b]) ? $(this).css("background-image", "url(" + Utils.getItemImage(b[1]) + ")").html("") : $(this).css("background-image", "none").html("?")
			})
		}

		var h = $("#f_content4"), o = $(".f_content4_list_template"), j = $("#f_content4 .move .list");
		window.isWP7 && $("#f_content4_manager .equip_box").html("<table><tr><td class='equip_box'><td class='equip_box'><div>?</div> </td><td class='equip_box'><div>?</div> </td><td class='equip_box'><div>?</div> </td></tr></table>");
		var l = $("#f_content4_manager .equip_box>div"), n = $("#bttofusion"), i = $("#btfusionhelp"), x = !1, E = [], k = 3;
		return {
			init : function() {
				x || ( x = !0, i.click(function() {
					showInfo(LNG.F_CITY_RESEARCH_JS.B)
				}), n.click(function() {
					E.length != k ? showInfo(LNG.F_CITY_RESEARCH_JS.A.replace("s%", k)) : showConfirm(LNG.F_CITY_RESEARCH_JS.D, function() {
						c(E, function(c) {
							( c = c.ret.item) ? showInfo(translate(LNG.GETITEM2, "[<b>" + mainStatus.ITEM_DATA[c].name + "</b>]x1")) : showInfo(LNG.F_CITY_RESEARCH_JS.C);
							E = [];
							e(E);
							a(function(a) {
								b(a)
							})
						})
					})
				}));
				E = [];
				j.empty();
				h.show();
				a(function(a) {
					b(a)
				});
				e(E);
				v(25)
			}
		}
	}(), i = new iScroll("scroller", {
		desktopCompatibility : !0
	});
	pnlLoading.hide()
});
defineSubView("f_city_resource", function() {
	var v = function(a, b, c, d, e) {
		var h = $("#wrapper").is(":hidden");
		h && $("#wrapper").show();
		window.showItemPromotion(a, b, function(a) {
			h && $("#wrapper").hide();
			return c(a)
		}, d, e)
	}, s = null, u = $("#f_city_resource_html_script"), q = $(u.parent().get(0)), m = EMA.getProxy();
	q.bind("dispose", function() {
		null != s && (s.destroy(!1), s = null);
		t && clearTimeout(t);
		Utils.removeCss("f_city_resource_css");
		m.dispose();
		q = m = null
	});
	var i = null, e = !1, a = function(a, b, c) {
		function d() {
			var l = Math.ceil(Math.pow(f, 1.5)), l = l > j ? j : l, l = h + b * l;
			0 < b && l > c || 0 > b && l < c ? ( e = !1, clearInterval(i), a.val(c)) : a.val(l);
			f++
		}

		e = !0;
		var h = Utils.parseInt(a.val(), 0), j = Math.abs(c - h), f = 1;
		d();
		1 < j && setTimeout(function() {
			clearInterval(i);
			e && ( i = setInterval(d, 100))
		}, 300)
	}, k = function() {
		e = !1;
		clearInterval(i);
		timer = null
	}, t = null, u = q.find("#f_content1"), c = [{
		buildtype : 1,
		panel : u.find("#f_fac_wood")
	}, {
		buildtype : 2,
		panel : u.find("#f_fac_iron")
	}, {
		buildtype : 3,
		panel : u.find("#f_fac_gold")
	}, {
		buildtype : 4,
		panel : u.find("#f_fac_food")
	}], z = mainStatus.BUILDING_DATA, p = function(a) {
		var b = mainStatus.getCity(), c = z[a.buildtype], d = mainStatus.CITY_INFO.getLevel(a.buildtype), e = c.upgrade[d];
		if(e)
			0 < d ? ( c = LNG.CONFIRMBUILD, c = LNG.UPGRADE_CONFIRM, showConfirm(c, function() {
				pnlLoading.show();
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
					key : key,
					city : b.id,
					build_type : a.buildtype
				}, function(b) {
					a.panel.find("#f_upgrade").hide();
					a.panel.find("#f_build_promotion").show();
					mainStatus.CITY_INFO[6] -= e.w;
					mainStatus.CITY_INFO[2] -= e.g;
					mainStatus.CITY_INFO[4] -= e.f;
					mainStatus.CITY_INFO[8] -= e.i;
					CMA.add(b.ret.cdlist)
				}, function(a) {
					(704 == a || 707 == a) && CMA.reload()
				})
			})) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
				key : key,
				city : b.id,
				build_type : a.buildtype
			}, function(b) {
				a.panel.find("#f_upgrade").hide();
				a.panel.find("#f_build_promotion").show();
				mainStatus.CITY_INFO[6] -= e.w;
				mainStatus.CITY_INFO[2] -= e.g;
				mainStatus.CITY_INFO[4] -= e.f;
				mainStatus.CITY_INFO[8] -= e.i;
				CMA.add(b.ret.cdlist)
			}, function(a) {
				(704 == a || 707 == a) && CMA.reload()
			}))
	}, C = function(a, b) {
		if(z) {
			var c = z[a], d = mainStatus.CITY_INFO.getLevel(a), e = c.upgrade[d];
			if(!("undefined" == typeof e || null == e)) {
				var h = 0.9 < CONFIG.VER ? 0.7 : 1;
				if("undefined" != typeof statinfo.vr && null != statinfo.vr) {
					var f = Math.floor(e.v * statinfo.vr / h);
					b.find("#f_value b").html(f)
				} else
					b.find("#f_value b").html(e.v);
				f = c.upgrade[d + 1];
				"undefined" == typeof f || null == f ? b.find("#f_value_next b").html("N/A") : "undefined" != typeof statinfo.vr && null != statinfo.vr ? ( f = Math.floor(f.v * statinfo.vr / h), b.find("#f_value_next b").html(f)) : b.find("#f_value_next b").html(f.v);
				b.find("#f_title").html(c.name);
				Utils.loadImage(b.find("#f_img"), Utils.getBuildingImage(a));
				b.find("#f_desc").html(c.desc);
				b.find("#f_level").html(d);
				b.find("#resfood b").html(e.f);
				mainStatus.CITY_INFO[4] < e.f && b.find("#resfood b").css("color", "#FFD17A");
				b.find("#reswood b").html(e.w);
				mainStatus.CITY_INFO[6] < e.w && b.find("#reswood b").css("color", "#FFD17A");
				b.find("#resiron b").html(e.i);
				mainStatus.CITY_INFO[8] < e.i && b.find("#resiron b").css("color", "#FFD17A");
				b.find("#resgold b").html(e.g);
				mainStatus.CITY_INFO[2] < e.g && b.find("#resgold b").css("color", "#FFD17A");
				e = buildtime(e.t, mainStatus.CITY_INFO[22]);
				"undefined" != typeof statinfo.vs && null != statinfo.vs && (e *= statinfo.vs);
				b.find("#clock b").html(Utils.timeString2(Math.ceil(e)));
				c.upgrade[d + 1] ? b.find("#f_upgrade").show() : (b.find("#f_upgrade").hide(), b.find("#f_cd1").hide())
			}
		}
	}, u = function() {
		$.each(c, function(a, b) {
			C(b.buildtype, b.panel)
		})
	}, d = function(a, b) {
		$.each(c, function(a, c) {
			c.buildtype == b && C(c.buildtype, c.panel)
		})
	};
	$.each(c, function(a, b) {
		var e = b.panel, h = c[a].buildtype, j = e.find("#f_cd1 p"), l = e.find("#f_upgrade");
		m.bind(CMA.getTickEventId(1, h), function(a) {
			l.hide();
			j.html(Utils.timeString2(a))
		});
		m.bind(CMA.getDoneEventId(1, h), function() {
			d(l, h)
		})
	});
	u();
	(function() {
		$.each(c, function(a, b) {
			b.panel.find("#f_upgrade").click(function() {
				p(b);
				return !1
			})
		})
	})();
	CMA.forceNotify();
	m.bind("cityinfoupdate", u);
	var D = q.find("#f_content2"), r = function() {
		var a = [];
		D.find("#f_plan_per").each(function() {
			a.push($(this).val())
		});
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_PRODUCE_PLAN, {
			key : key,
			city : mainStatus.getCity().id,
			action : "produce_plan_do",
			wood : a[0],
			iron : a[1],
			gold : a[2],
			food : a[3]
		}, function(a) {
			showInfo(LNG.SUCCESS);
			n(a.ret)
		}, function() {
		});
		return !1
	};
	D.find("#f_plan_per").change(function() {
		var a = $(this), b = parseInt(a.val());
		a.val(isNaN(b) || 100 < b || 0 > b ? 100 : b)
	});
	var n = function(a) {
		var b = D.find("#f_produce_plan_form > div");
		null != a && $.each(a, function(a, c) {
			var d = $(b[c.restype - 1]);
			with(d)
			find("#f_res_level").text(c.level), find("#f_plan_per").val(c.per), find("#f_plan_heads").text(c.heads), find("#f_plan_output").text(c.desc)
		});
		D.find("#f_produce_plan_save").unbind().click(r)
	}, y = function() {
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_PRODUCE_PLAN, {
			key : key,
			city : mainStatus.getCity().id
		}, function(a) {
			n(a.ret)
		}, function() {
		})
	}, j = $("#f_content3"), b = j.find("#f_exchange_form"), h = function() {
		var a = {};
		$.each("g2w,g2f,g2i,w2g,f2g,i2g".split(","), function(c, d) {
			var e = b.find("#" + d).find("#exval"), e = Utils.parseInt(e.val(), 0);
			0 < e && (a[d] = e)
		});
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MARKERT_LOCAL, $.extend({
			key : key,
			city : mainStatus.getCity().id,
			reso_put : "giveput"
		}, a), function(a) {
			mainStatus.CITY_INFO[2] = a.ret.g;
			mainStatus.CITY_INFO[4] = a.ret.f;
			mainStatus.CITY_INFO[6] = a.ret.w;
			mainStatus.CITY_INFO[8] = a.ret.i;
			m.trigger("cityinfoupdate");
			showInfo(LNG.SUCCESS)
		}, function() {
		});
		return !1
	}, A = function() {
		b.find("#g2w").find("#val").text(mainStatus.CITY_INFO[2]);
		b.find("#g2f").find("#val").text(mainStatus.CITY_INFO[2]);
		b.find("#g2i").find("#val").text(mainStatus.CITY_INFO[2]);
		b.find("#w2g").find("#val").text(mainStatus.CITY_INFO[6]);
		b.find("#f2g").find("#val").text(mainStatus.CITY_INFO[4]);
		b.find("#i2g").find("#val").text(mainStatus.CITY_INFO[8])
	};
	m.bind("cityinfoupdate", A);
	var B = function() {
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MARKERT_LOCAL, {
			key : key,
			city : mainStatus.getCity().id
		}, function(c) {
			var d = c.ret, e = {
				g2w : 2,
				g2f : 2,
				g2i : 2,
				w2g : 6,
				f2g : 4,
				i2g : 8
			};
			$.each("g2w,g2f,g2i,w2g,f2g,i2g".split(","), function(c, h) {
				var j = b.find("#" + h), f = j.find("#exval"), o = j.find("#t_val");
				f.unbind();
				f.change(function() {
					var a = Utils.parseInt(f.val(), 0), c = mainStatus.CITY_INFO[e[h]];
					a > c && ( a = c);
					f.val(a);
					if("g" == h.substr(0, 1)) {
						var g = 0;
						$.each(["g2w", "g2f", "g2i"], function(a, c) {
							g += Utils.parseInt(b.find("#" + c).find("#exval").val(), 0)
						});
						g > c && (a -= g - c, f.val(a))
					}
					0 <= a && o.text(Math.floor(a / d[h]))
				});
				j.find("#f_num_minus").unbind();
				j.find("#f_num_minus").bind("mousedown touchstart", function() {
					k();
					a(f, -1, 0)
				});
				var g = null;
				j.find("#f_num_minus").bind("mouseup touchend", function() {
					k();
					Utils.parseInt(f.value, 0);
					clearTimeout(g);
					g = setTimeout(function() {
						f.change()
					}, 300)
				});
				j.find("#f_num_plus").unbind();
				j.find("#f_num_plus").bind("mousedown touchstart", function() {
					k();
					a(f, 1, mainStatus.CITY_INFO[e[h]])
				});
				var l = null;
				j.find("#f_num_plus").bind("mouseup touchend", function() {
					k();
					Utils.parseInt(f.value, 0);
					clearTimeout(l);
					l = setTimeout(function() {
						f.change()
					}, 300)
				});
				j.find("#f_num_max").unbind().click(function() {
					k();
					f.val(mainStatus.CITY_INFO[e[h]]);
					f.change()
				})
			});
			j.find("#f_exchange_save").unbind().click(h)
		}, function() {
		});
		A()
	}, x = !1;
	q.find(".tab_active,.tab_inactive").click(function(a) {
		if(x)
			return !1;
		$(this).hasClass("tab_inactive") && (q.find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), q.find("#wrapper, #f_content1,#f_content2,#f_content3").hide(), $(this).trigger("tab", a));
		return !1
	});
	q.find("#f_tab1").bind("tab", function() {
		q.find("#wrapper, #f_content1").show();
		return !1
	});
	q.find("#f_tab2").bind("tab", function() {
		D.show();
		y();
		return !1
	});
	q.find("#f_tab3").bind("tab", function() {
		j.show();
		B();
		return !1
	});
	q.find("#f_close").click(function() {
		showCity();
		return !1
	});
	q.find("#f_produce_plan_form_wood_promotion").click(function() {
		x = !0;
		$("#f_content2").hide();
		v($("#f_city_resource_promotion"), [{
			id : 123,
			shop : 1
		}, {
			id : 119,
			shop : 1
		}, {
			id : 120,
			shop : 1
		}], function(a) {
			x = !1;
			$("#f_content2").show();
			0 < a && y()
		}, !1)
	});
	q.find("#f_produce_plan_form_food_promotion").click(function() {
		x = !0;
		$("#f_content2").hide();
		v($("#f_city_resource_promotion"), [{
			id : 126,
			shop : 1
		}, {
			id : 119,
			shop : 1
		}, {
			id : 120,
			shop : 1
		}], function(a) {
			x = !1;
			$("#f_content2").show();
			0 < a && y()
		}, !1)
	});
	q.find("#f_produce_plan_form_gold_promotion").click(function() {
		x = !0;
		$("#f_content2").hide();
		v($("#f_city_resource_promotion"), [{
			id : 129,
			shop : 1
		}, {
			id : 119,
			shop : 1
		}, {
			id : 120,
			shop : 1
		}], function(a) {
			x = !1;
			$("#f_content2").show();
			0 < a && y()
		}, !1)
	});
	q.find("#f_produce_plan_form_iron_promotion").click(function() {
		x = !0;
		$("#f_content2").hide();
		v($("#f_city_resource_promotion"), [{
			id : 121,
			shop : 1
		}, {
			id : 119,
			shop : 1
		}, {
			id : 120,
			shop : 1
		}], function(a) {
			x = !1;
			$("#f_content2").show();
			0 < a && y()
		}, !1)
	});
	q.find("#f_exchange_form_gold_promotion").click(function() {
		x = !0;
		$("#f_content3").hide();
		v($("#f_city_resource_promotion"), [{
			id : 112,
			shop : 1
		}, {
			id : 131,
			shop : 1
		}], function(a) {
			x = !1;
			$("#f_content3").show();
			0 < a && A()
		}, !1)
	});
	var l = [{
		id : 115,
		shop : 1
	}, {
		id : 116,
		shop : 1
	}, {
		id : 117,
		shop : 1
	}], E = [{
		id : 1001,
		shop : 1,
		icon : "gem.jpg",
		name : LNG.INSTANT_COMPLETE,
		desc : LNG.INSTANT_COMPLETE_DESC,
		price : 0
	}];
	q.find("#f_fac_food_promotion").click(function() {
		x = !0;
		$("#f_content1").hide();
		var a = null;
		if($("#f_fac_food").find("#f_upgrade").is(":visible") || null == ( a = CMA.getCD(1, 4)))
			v($("#f_city_resource_promotion"), [{
				id : 126,
				shop : 1
			}, {
				id : 119,
				shop : 1
			}, {
				id : 120,
				shop : 1
			}], function() {
				x = !1;
				$("#f_content1").show()
			}, !1);
		else {
			var b = (new Date).getTime(), b = Math.ceil((a.end - b) / 1E3);
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CD_PRICE, {
				type : a.cdtype,
				secs : b
			}, function(b) {
				x = !0;
				b = b.ret.price;
				0 < b ? E[0].price = b : E = null;
				v($("#f_city_resource_promotion"), l, function(b) {
					x = !1;
					if(1001 == b) {
						pnlLoading.show();
						var c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO;
						ajaxCall(c, {
							key : key,
							city : mainStatus.CITY_ID,
							tid : a.id,
							action : "build2"
						}, function(b) {
							userinfo.money = b.ret.money;
							refreshUserInfo();
							CMA.changeSecs(a.id, 0);
							showInfo(LNG.SUCCESS)
						})
					} else
						0 != b && (pnlLoading.show(), c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO, ajaxCall(c, {
							key : key,
							city : mainStatus.CITY_ID,
							tid : a.id,
							action : "build",
							iid : b
						}, function(b) {
							CMA.changeSecs(a.id, b.ret.secs);
							showInfo(LNG.SUCCESS)
						}));
					$("#f_content1").show()
				}, !0, E)
			})
		}
	});
	q.find("#f_fac_gold_promotion").click(function() {
		x = !0;
		$("#f_content1").hide();
		var a = null;
		if($("#f_fac_gold").find("#f_upgrade").is(":visible") || null == ( a = CMA.getCD(1, 3)))
			v($("#f_city_resource_promotion"), [{
				id : 129,
				shop : 1
			}, {
				id : 119,
				shop : 1
			}, {
				id : 120,
				shop : 1
			}, {
				id : 112,
				shop : 1
			}, {
				id : 131,
				shop : 1
			}], function() {
				x = !1;
				$("#f_content1").show()
			}, !1);
		else {
			var b = (new Date).getTime(), b = Math.ceil((a.end - b) / 1E3);
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CD_PRICE, {
				type : a.cdtype,
				secs : b
			}, function(b) {
				x = !0;
				b = b.ret.price;
				0 < b ? E[0].price = b : E = null;
				v($("#f_city_resource_promotion"), l, function(b) {
					x = !1;
					if(1001 == b) {
						pnlLoading.show();
						var c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO;
						ajaxCall(c, {
							key : key,
							city : mainStatus.CITY_ID,
							tid : a.id,
							action : "build2"
						}, function(b) {
							userinfo.money = b.ret.money;
							refreshUserInfo();
							CMA.changeSecs(a.id, 0);
							showInfo(LNG.SUCCESS)
						})
					} else
						0 != b && (pnlLoading.show(), c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO, ajaxCall(c, {
							key : key,
							city : mainStatus.CITY_ID,
							tid : a.id,
							action : "build",
							iid : b
						}, function(b) {
							CMA.changeSecs(a.id, b.ret.secs);
							showInfo(LNG.SUCCESS)
						}));
					$("#f_content1").show()
				}, !0, E)
			})
		}
	});
	q.find("#f_fac_iron_promotion").click(function() {
		x = !0;
		$("#f_content1").hide();
		var a = null;
		if($("#f_fac_iron").find("#f_upgrade").is(":visible") || null == ( a = CMA.getCD(1, 2)))
			v($("#f_city_resource_promotion"), [{
				id : 121,
				shop : 1
			}, {
				id : 119,
				shop : 1
			}, {
				id : 120,
				shop : 1
			}], function() {
				x = !1;
				$("#f_content1").show()
			}, !1);
		else {
			var b = (new Date).getTime(), b = Math.ceil((a.end - b) / 1E3);
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CD_PRICE, {
				type : a.cdtype,
				secs : b
			}, function(b) {
				x = !0;
				b = b.ret.price;
				0 < b ? E[0].price = b : E = null;
				v($("#f_city_resource_promotion"), l, function(b) {
					x = !1;
					if(1001 == b) {
						pnlLoading.show();
						var c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO;
						ajaxCall(c, {
							key : key,
							city : mainStatus.CITY_ID,
							tid : a.id,
							action : "build2"
						}, function(b) {
							userinfo.money = b.ret.money;
							refreshUserInfo();
							CMA.changeSecs(a.id, 0);
							showInfo(LNG.SUCCESS)
						})
					} else
						0 != b && (pnlLoading.show(), c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO, ajaxCall(c, {
							key : key,
							city : mainStatus.CITY_ID,
							tid : a.id,
							action : "build",
							iid : b
						}, function(b) {
							CMA.changeSecs(a.id, b.ret.secs);
							showInfo(LNG.SUCCESS)
						}));
					$("#f_content1").show()
				}, !0, E)
			})
		}
	});
	q.find("#f_fac_wood_promotion").click(function() {
		x = !0;
		$("#f_content1").hide();
		var a = null;
		if($("#f_fac_wood").find("#f_upgrade").is(":visible") || null == ( a = CMA.getCD(1, 1)))
			v($("#f_city_resource_promotion"), [{
				id : 123,
				shop : 1
			}, {
				id : 119,
				shop : 1
			}, {
				id : 120,
				shop : 1
			}], function() {
				x = !1;
				$("#f_content1").show()
			}, !1);
		else {
			var b = (new Date).getTime(), b = Math.ceil((a.end - b) / 1E3);
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CD_PRICE, {
				type : a.cdtype,
				secs : b
			}, function(b) {
				x = !0;
				b = b.ret.price;
				0 < b ? E[0].price = b : E = null;
				v($("#f_city_resource_promotion"), l, function(b) {
					x = !1;
					if(1001 == b) {
						pnlLoading.show();
						var c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO;
						ajaxCall(c, {
							key : key,
							city : mainStatus.CITY_ID,
							tid : a.id,
							action : "build2"
						}, function(b) {
							userinfo.money = b.ret.money;
							refreshUserInfo();
							CMA.changeSecs(a.id, 0);
							showInfo(LNG.SUCCESS)
						})
					} else
						0 != b && (pnlLoading.show(), c = CONFIG.MYHOST + CONFIG.FUNC_CDINFO, ajaxCall(c, {
							key : key,
							tid : a.id,
							city : mainStatus.CITY_ID,
							action : "build",
							iid : b
						}, function(b) {
							CMA.changeSecs(a.id, b.ret.secs);
							showInfo(LNG.SUCCESS)
						}));
					$("#f_content1").show()
				}, !0, E)
			})
		}
	});
	q.css("background-image", "url(img/bg/view.jpg)");
	(function() {
		window.isIphone && (q.find("#exval").each(function(a, b) {
			Utils.replaceInput(b, "number")
		}), q.find("#f_plan_per").each(function(a, b) {
			Utils.replaceInput(b, "number")
		}));
		s = new iScroll("scroller", {
			desktopCompatibility : !0
		});
		var a = Utils.getCookie("scrollto");
		null != a && "" != a && (s.scrollTo(0, a), Utils.delCookie("scrollto"));
		a = Utils.getCookie("params");
		if(null != a && (Utils.delCookie("params"), "" != a.tab && null != a.tab)) {
			$("#f_tab" + a.tab).click();
			return
		}
		pnlLoading.hide()
	})()
});
defineSubView("f_city_wall", function() {
	function v() {
		if(null == q || 0 == q.length)
			e.find("#f_content2_hero_name").hide(), e.find("#f_content2_hero_level").text(""), e.find("#f_content2_hero_power").text(""), e.find("#f_content2_hero_wisdom").text(""), e.find("#f_content2_hero_loyalty").text(""), e.find("#f_content2_hero_command").text(""), e.find("#f_city_wall_replace").text(LNG.SET), e.find("#f_content2_hero_rank").attr("src", "").hide();
		else {
			var a = mainStatus.HERO_DATA[q[0].gid];
			"undefined" == typeof a || null == a ? (e.find("#f_content2_hero_name").hide(), e.find("#f_content2_hero_level").text(""), e.find("#f_content2_hero_power").text(""), e.find("#f_content2_hero_wisdom").text(""), e.find("#f_content2_hero_loyalty").text(""), e.find("#f_content2_hero_command").text(""), e.find("#f_city_wall_replace").text(LNG.SET), e.find("#f_content2_hero_rank").attr("src", "").hide()) : (e.find("#f_content2_hero_name").show(), e.find("#f_content2_hero_name b").text(a.name), e.find("#f_content2_hero_rank").attr("src", Utils.getHeroRankImage(a.race, a.rank)).show(), e.find("#f_content2_hero_level").text(q[0].g), e.find("#f_content2_hero_power").text(q[0].p), e.find("#f_content2_hero_wisdom").text(q[0].i), e.find("#f_content2_hero_loyalty").text(q[0].f), e.find("#f_content2_hero_command").text(q[0].c2), e.find("#f_city_wall_replace").text(LNG.REPLACE), Utils.loadImage2(e.find("#f_content2_hero_name img"), Utils.getHeroImage(q[0].gid)))
		}
	}

	function s() {
		if(null == m || 0 == m.length)
			e.find("#f_content3_hero_name").hide(), e.find("#f_content3_hero_level").text(""), e.find("#f_content3_hero_power").text(""), e.find("#f_content3_hero_wisdom").text(""), e.find("#f_content3_hero_loyalty").text(""), e.find("#f_content3_hero_command").text(""), e.find("#f_content3_hero_energy").text(""), e.find("#f_city_adviser_replace").text(LNG.SET), e.find("#f_content3_hero_rank").attr("src", "").hide();
		else {
			var a = mainStatus.HERO_DATA[m[0].gid];
			e.find("#f_content3_hero_name").show();
			e.find("#f_content3_hero_name b").text(a.name);
			e.find("#f_content3_hero_rank").attr("src", Utils.getHeroRankImage(a.race, a.rank)).show();
			e.find("#f_content3_hero_level").text(m[0].g);
			e.find("#f_content3_hero_power").text(m[0].p);
			e.find("#f_content3_hero_wisdom").text(m[0].i);
			e.find("#f_content3_hero_loyalty").text(m[0].f);
			e.find("#f_content3_hero_energy").text(m[0].e);
			e.find("#f_city_adviser_replace").text(LNG.REPLACE);
			Utils.loadImage2(e.find("#f_content3_hero_name img"), Utils.getHeroImage(m[0].gid))
		}
	}

	var u = null, q = null, m = null, i = $("#f_city_wall_html_script"), e = $(i.parent().get(0)), a = EMA.getProxy();
	e.bind("dispose", function() {
		null != u && (u.destroy(!1), u = null);
		Utils.removeCss("f_city_wall_css");
		a.dispose();
		e = a = null
	});
	var k = [{
		buildtype : 12,
		panel : e.find("#f_content1").find("#f_wall")
	}], t = mainStatus.BUILDING_DATA, c = function(a) {
		var c = mainStatus.getCity(), d = t[a.buildtype], b = mainStatus.CITY_INFO.getLevel(a.buildtype), e = d.upgrade[b];
		if(e)
			0 < b ? ( d = LNG.CONFIRMBUILD, d = LNG.UPGRADE_CONFIRM, showConfirm(d, function() {
				pnlLoading.show();
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
					key : key,
					city : c.id,
					build_type : a.buildtype
				}, function(b) {
					a.panel.find("#f_upgrade").hide();
					a.panel.find("#f_build_promotion").show();
					mainStatus.CITY_INFO[6] -= e.w;
					mainStatus.CITY_INFO[2] -= e.g;
					mainStatus.CITY_INFO[4] -= e.f;
					mainStatus.CITY_INFO[8] -= e.i;
					CMA.add(b.ret.cdlist)
				}, function(a) {
					(704 == a || 707 == a) && CMA.reload()
				})
			})) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_BUILDING_CREATE_TASK, {
				key : key,
				city : c.id,
				build_type : a.buildtype
			}, function(b) {
				a.panel.find("#f_upgrade").hide();
				a.panel.find("#f_build_promotion").show();
				mainStatus.CITY_INFO[6] -= e.w;
				mainStatus.CITY_INFO[2] -= e.g;
				mainStatus.CITY_INFO[4] -= e.f;
				mainStatus.CITY_INFO[8] -= e.i;
				CMA.add(b.ret.cdlist)
			}, function(a) {
				(704 == a || 707 == a) && CMA.reload()
			}))
	}, z = [{
		id : 115,
		shop : 1
	}, {
		id : 116,
		shop : 1
	}, {
		id : 117,
		shop : 1
	}], p = [{
		id : 1001,
		shop : 1,
		icon : "gem.jpg",
		name : LNG.INSTANT_COMPLETE,
		desc : LNG.INSTANT_COMPLETE_DESC,
		price : 0
	}], C = function(a) {
		var c = CMA.getCD(1, a.buildtype);
		if(null != c)
			return a = (new Date).getTime(), a = Math.ceil((c.end - a) / 1E3), pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CD_PRICE, {
				type : c.cdtype,
				secs : a
			}, function(a) {
				r = !0;
				a = a.ret.price;
				0 < a ? p[0].price = a : p = null;
				$("#f_content1").hide();
				showItemPromotion($("#f_city_promotion"), z, function(a) {
					r = !1;
					if(1001 == a) {
						pnlLoading.show();
						var d = CONFIG.MYHOST + CONFIG.FUNC_CDINFO;
						ajaxCall(d, {
							key : key,
							city : mainStatus.CITY_ID,
							tid : c.id,
							action : "build2"
						}, function(a) {
							userinfo.money = a.ret.money;
							refreshUserInfo();
							CMA.changeSecs(c.id, 0);
							showInfo(LNG.SUCCESS)
						})
					} else
						0 != a && (pnlLoading.show(), d = CONFIG.MYHOST + CONFIG.FUNC_CDINFO, ajaxCall(d, {
							key : key,
							city : mainStatus.CITY_ID,
							tid : c.id,
							action : "build",
							iid : a
						}, function(a) {
							CMA.changeSecs(c.id, a.ret.secs);
							showInfo(LNG.SUCCESS)
						}));
					$("#f_content1").show()
				}, !0, p)
			}), !1
	}, d = function(a, c) {
		if(t) {
			var d = t[a], b = mainStatus.CITY_INFO.getLevel(a), e = d.upgrade[b];
			e && (c.find("#f_title").html(d.name), Utils.loadImage(c.find("#f_img"), Utils.getBuildingImage(a)), c.find("#f_desc").html(d.desc), c.find("#f_level").html(b), c.find("#resfood b").html(e.f), mainStatus.CITY_INFO[4] < e.f && c.find("#resfood b").css("color", "#FFD17A"), c.find("#reswood b").html(e.w), mainStatus.CITY_INFO[6] < e.w && c.find("#reswood b").css("color", "#FFD17A"), c.find("#resiron b").html(e.i), mainStatus.CITY_INFO[8] < e.i && c.find("#resiron b").css("color", "#FFD17A"), c.find("#resgold b").html(e.g), mainStatus.CITY_INFO[2] < e.g && c.find("#resgold b").css("color", "#FFD17A"), e = buildtime(e.t, mainStatus.CITY_INFO[22]), "undefined" != typeof statinfo.vs && null != statinfo.vs && (e *= statinfo.vs), c.find("#clock b").html(Utils.timeString2(Math.ceil(e))), d.upgrade[b + 1] ? (c.find("#f_upgrade").show(), c.find("#f_build_promotion").hide()) : (c.find("#f_upgrade").hide(), c.find("#f_cd1").hide()))
		}
	}, i = function() {
		$.each(k, function(a, c) {
			d(c.buildtype, c.panel)
		})
	}, D = function(a, c) {
		$.each(k, function(a, b) {
			b.buildtype == c && d(b.buildtype, b.panel)
		})
	};
	$.each(k, function(c, d) {
		var e = d.panel, b = k[c].buildtype, h = e.find("#f_cd1 p"), i = e.find("#f_upgrade"), m = e.find("#f_build_promotion");
		a.bind(CMA.getTickEventId(1, b), function(a) {
			i.hide();
			m.show();
			h.html(Utils.timeString2(a))
		});
		a.bind(CMA.getDoneEventId(1, b), function() {
			D(i, b)
		})
	});
	i();
	(function() {
		$.each(k, function(a, d) {
			d.panel.find("#f_upgrade").click(function() {
				c(d);
				return !1
			});
			d.panel.find("#f_build_promotion").click(function() {
				C(d);
				return !1
			})
		})
	})();
	CMA.forceNotify();
	a.bind("cityinfoupdate", i);
	var r = !1;
	e.find(".tab_active,.tab_inactive").click(function(a) {
		!r && $(this).hasClass("tab_inactive") && (e.find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), e.find(".f_content").hide(), $(this).trigger("tab", a));
		return !1
	});
	e.find("#f_tab1").bind("tab", function() {
		e.find("#f_content1").show();
		return !1
	});
	e.find("#f_tab2").bind("tab", function() {
		null == q ? (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
			key : key,
			city : mainStatus.getCity().id,
			action : "gen_list",
			extra : 2
		}, function(a) {
			q = a.ret.hero;
			v()
		})) : v();
		e.find("#f_content2").show();
		return !1
	});
	e.find("#f_tab3").bind("tab", function() {
		null == m ? (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
			key : key,
			city : mainStatus.getCity().id,
			action : "gen_list",
			extra : 5
		}, function(a) {
			m = a.ret.hero;
			s()
		})) : s();
		e.find("#f_content3").show();
		return !1
	});
	e.find("#f_content2_learn_more").click(function() {
		e.find("#f_defense_more").show();
		return !1
	});
	e.find("#f_defense_more_close").click(function() {
		e.find("#f_defense_more").hide();
		return !1
	});
	e.find("#f_close").click(function() {
		showCity();
		return !1
	});
	e.find("#f_city_adviser_replace").click(function() {
		$("#f_content3").hide();
		$("#f_city_wall_heros").show();
		r = !0;
		var a = null, c = null;
		if(null != m && 0 < m.length)
			a = LNG.TITLEDISMISS, c = LNG.DISMISS;
		showFreeHeroPanel4(e.find("#f_city_wall_heros"), !0, function(a) {
			r = !1;
			null == a ? null == m || 0 == m.length ? showInfo(LNG.ERROR.CLIENT.NOFREEHERO2) : showConfirm(LNG.CONFIRMNOGUARDIAN, function() {
				pnlLoading.show();
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
					key : key,
					city : mainStatus.getCity().id,
					action : "set_adviser",
					id : 0
				}, function() {
					m = [];
					s()
				})
			}) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
				key : key,
				city : mainStatus.getCity().id,
				action : "set_adviser",
				id : a.id
			}, function() {
				m = [a];
				s()
			}));
			$("#f_city_wall_heros").hide();
			$("#f_content3").show()
		}, null, a, c, ["grade", "power", "intellect", "defense", "energy"]);
		return !1
	});
	e.find("#f_city_wall_replace").click(function() {
		$("#f_content2").hide();
		$("#f_city_wall_heros").show();
		r = !0;
		var a = null, c = null;
		if(null != q && 0 < q.length)
			a = LNG.TITLEDISMISS, c = LNG.DISMISS;
		showFreeHeroPanel2(e.find("#f_city_wall_heros"), !0, function(a) {
			r = !1;
			null == a ? null == q || 0 == q.length ? showInfo(LNG.ERROR.CLIENT.NOFREEHERO2) : showConfirm(LNG.CONFIRMNOGUARDIAN, function() {
				pnlLoading.show();
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
					key : key,
					city : mainStatus.getCity().id,
					action : "set_officer",
					id : 0
				}, function() {
					q = [];
					v()
				})
			}) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_ITEM, {
				key : key,
				city : mainStatus.getCity().id,
				action : "set_officer",
				id : a.id
			}, function() {
				q = Array(a);
				v()
			}));
			$("#f_city_wall_heros").hide();
			$("#f_content2").show()
		}, null, a, c);
		return !1
	});
	e.css("background-image", "url(img/bg/view.jpg)");
	u = new iScroll("scroller", {
		desktopCompatibility : !0
	});
	pnlLoading.hide()
});
defineSubView("f_fav", function() {
	function v(a, c) {
		if("del" == a) {
			pnlLoading.show();
			var d = CONFIG.MYHOST + CONFIG.FUNC_FAV;
			ajaxCall(d, {
				key : key,
				id : p[c].id
			}, function() {
				$("#f_fav_" + p[c].id).remove();
				p.splice(c, 1)
			})
		} else
			"mail" == a ? GlobalNav.WriteMail(p[c].nick) : "info" == a && (pnlLoading.show(), d = CONFIG.MYHOST + CONFIG.FUNC_GETOTHERINFO, ajaxCall(d, {
				key : key,
				id : p[c].id
			}, function(a) {
				showUserInfo(a.ret.user)
			}));
		return !1
	}

	function s(a) {
		$("#f_fav_more" + a).removeClass("minusbutton").addClass("plusbutton");
		$("#f_fav_mail" + a).hide();
		$("#f_fav_info" + a).hide();
		$("#f_fav_del" + a).hide();
		r = null
	}

	function u(a, c) {
		var d = '<div style="position:relative;" id="f_fav_' + a.id + '"><ul class="reshead"><li><em class="race' + a.nationid + '"></em><b>' + a.nick + '</b></li><li><em class="lv"></em><b>' + a.level + "</b></li>";
		0 != a.guildid && (d += '<li><em class="guild" style="background-image:url(' + Utils.getFlag(a.gflag) + ');"></em><b>' + a.guild + "</b></li>");
		0 < a.protection || 0 != (a.status & 2) ? d += '<li><img src="img/item/0.png" style="position:relative;left:10px;top:3px;height:18px;"/></li>' : 0 != (a.status & 1) && (d += '<li><img src="img/item/80.png" style="position:relative;left:10px;top:3px;height:18px;"/></li>');
		0 != (a.status & 4) && (d += '<li><img src="img/res/sleep.png" style="position:relative;left:5px;top:3px;height:18px;"/></li><li style="position:relative;left:5px;"><b>' + Utils.timeString(a.sleep) + "</b></li>");
		a.conq && 0 < a.conq[0] && (d += '<li><em class="king"></em><b>' + a.conq[2] + "&nbsp;[" + Utils.timeString(a.conq[1]) + "]</b></li>");
		d += '</ul><div id="f_fav_mail' + a.id + '" class="funcbutton" style="left: 200px; top:2px; display:none;">' + LNG.SEND_MAIL + '</div><div id="f_fav_info' + a.id + '" class="funcbutton" style="left: 270px; top:2px; display:none;">' + LNG.LORD_INFO + '</div><div id="f_fav_del' + a.id + '" class="funcbutton" style="left: 340px; top:2px; display:none;">' + LNG.DELETE + '</div><div id="f_fav_more' + a.id + '" class="plusbutton" style="left: 410px; top:1px;"></div></div>';
		$("#f_fav_lords").append(d);
		$("#f_fav_more" + a.id).click(function() {
			if($("#f_fav_more" + a.id).hasClass("plusbutton")) {
				var c = a.id;
				null != r && r != c && s(r);
				r = c;
				$("#f_fav_more" + c).removeClass("plusbutton").addClass("minusbutton");
				$("#f_fav_mail" + c).show();
				$("#f_fav_info" + c).show();
				$("#f_fav_del" + c).show()
			} else
				s(a.id);
			return !1
		});
		$("#f_fav_mail" + a.id).click(function() {
			return v("mail", c)
		});
		$("#f_fav_info" + a.id).click(function() {
			return v("info", c)
		});
		$("#f_fav_del" + a.id).click(function() {
			showConfirm(LNG.CONFIRMDELETE, function() {
				return v("del", c)
			})
		})
	}

	function q() {
		pnlLoading.show();
		$("#f_fav_lords").empty().unbind();
		"undefined" != typeof p && null != p && $.each(p, function(a, c) {
			u(c, a)
		});
		null != t && (t.refresh(), t.setPosition(0, 0));
		pnlLoading.hide()
	}

	function m() {
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
			key : key
		}, function(a) {
			p = a.ret.friend;
			q()
		})
	}

	function i(a) {
		$("#f_favnpc_more" + a).removeClass("minusbutton").addClass("plusbutton");
		$("#f_favnpc_attack" + a).hide();
		$("#f_favnpc_info" + a).hide();
		$("#f_favnpc_del" + a).hide();
		n = null
	}

	function e(a, c, e) {
		var k = '<div id="f_favnpc_' + c[0] + '" style="position:relative;"><ul class="reshead' + (1 == a ? "2" : "") + '" style="position:relative;top:3px;"><li><b>[' + c[1] + "/" + c[2] + "]&nbsp;</b></li>";
		1 == a ? k += '<li><em class="' + D[c[3]].ico + '"></em><b>' + D[c[3]].name + "</b></li>" : 2 == a && (k += "<li><b>" + LNG.MONSTER + '&nbsp;</b></li><li><img src="' + LNG.MONSTERLEVEL[c[3]] + '"></li><li><b>&nbsp;&nbsp;&nbsp;' + LNG.ATTACKED + ":&nbsp;" + c[4] + "</b></li>");
		k += '</ul><div id="f_favnpc_attack' + c[0] + '" class="funcbutton" style="left: 200px; top:2px; display:none;">' + LNG.ATTACK + '</div><div id="f_favnpc_info' + c[0] + '" class="funcbutton" style="left: 270px; top:2px; display:none;">' + LNG.INFO + '</div><div id="f_favnpc_del' + c[0] + '" class="funcbutton" style="left: 340px; top:2px; display:none;">' + LNG.DELETE + '</div><div id="f_favnpc_more' + c[0] + '" class="plusbutton" style="left: 410px; top:1px;"></div></div>';
		1 == a ? $("#f_fav_colonies").append(k) : 2 == a && $("#f_fav_devils").append(k);
		$("#f_favnpc_more" + c[0]).click(function() {
			if($("#f_favnpc_more" + c[0]).hasClass("plusbutton")) {
				var a = c[0];
				null != n && n != a && i(n);
				n = a;
				$("#f_favnpc_more" + a).removeClass("plusbutton").addClass("minusbutton");
				$("#f_favnpc_attack" + a).show();
				$("#f_favnpc_info" + a).show();
				$("#f_favnpc_del" + a).show()
			} else
				i(c[0]);
			return !1
		});
		$("#f_favnpc_attack" + c[0]).click(function() {
			1 == a ? GlobalNav.Occupy(c[1], c[2]) : GlobalNav.Attack(c[1], c[2])
		});
		$("#f_favnpc_info" + c[0]).click(function() {
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
				key : key,
				act : "getfavnpc",
				fid : c[0]
			}, function(c) {
				1 == a ? y = $("#f_fav_colonies") : 2 == a && ( y = $("#f_fav_devils"));
				j = $("#f_fav_report");
				j.html(Utils.ftime(new Date(1E3 * c.ret.fav[0]), "yyyy-MM-dd hh:mm:ss") + "<br><br>" + c.ret.fav[1]);
				y.hide();
				j.show();
				null != t && (t.refresh(), t.setPosition(0, 0))
			})
		});
		$("#f_favnpc_del" + c[0]).click(function() {
			showConfirm(LNG.CONFIRMDELETE, function() {
				pnlLoading.show();
				ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
					key : key,
					act : "delfavnpc",
					fid : c[0]
				}, function() {
					$("#f_favnpc_" + c[0]).unbind().remove();
					1 == a ? d.splice(e, 1) : 2 == a && C.splice(e, 1)
				})
			})
		})
	}

	function a(a) {
		pnlLoading.show();
		1 == a ? ($("#f_fav_colonies").empty().unbind(), "undefined" != typeof d && null != d && ($.each(d, function(c, d) {
			e(a, d, c)
		}), 0 == d.length && ($("#f_fav_title").show(), $("#f_fav_title_1").show(), $("#f_fav_title_2").hide()))) : 2 == a && ($("#f_fav_devils").empty().unbind(), "undefined" != typeof C && null != C && ($.each(C, function(c, d) {
			e(a, d, c)
		}), 0 == C.length && ($("#f_fav_title").show(), $("#f_fav_title_2").show(), $("#f_fav_title_1").hide())));
		null != t && (t.refresh(), t.setPosition(0, 0));
		pnlLoading.hide()
	}

	function k(b) {
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
			key : key,
			act : "getfavnpc",
			cat : b
		}, function(c) {
			if(1 == b)
				d = c.ret.favs;
			else if(2 == b)
				C = c.ret.favs;
			a(b)
		})
	}

	var t = null, c = $("#f_sample_html_script"), z = $(c.parent().get(0));
	z.bind("dispose", function() {
		null != t && (t.destroy(!1), t = null);
		z = null
	});
	var p = null, C = null, d = null, D = LNG.RESOURCE_STYLE, r = null, n = null, y = null, j = null;
	$("#f_tab1").click(function() {
		$("#f_tab1").hasClass("tab_inactive") && ($("#f_fav_title").hide(), null == p ? m() : q(), $("#f_fav_input_lord").show(), $("#f_fav_lords").show(), $("#f_fav_devils").hide(), $("#f_fav_colonies").hide(), $("#f_fav_report").hide(), $("#f_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_tab1").removeClass("tab_inactive").addClass("tab_active"))
	});
	$("#f_tab2").click(function() {
		$("#f_tab2").hasClass("tab_inactive") && ($("#f_fav_title").hide(), null == C ? k(2) : a(2), $("#f_fav_input_lord").hide(), $("#f_fav_lords").hide(), $("#f_fav_devils").show(), $("#f_fav_colonies").hide(), $("#f_fav_report").hide(), $("#f_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_tab2").removeClass("tab_inactive").addClass("tab_active"))
	});
	$("#f_tab3").click(function() {
		$("#f_tab3").hasClass("tab_inactive") && ($("#f_fav_title").hide(), null == d ? k(1) : a(1), $("#f_fav_input_lord").hide(), $("#f_fav_lords").hide(), $("#f_fav_devils").hide(), $("#f_fav_colonies").show(), $("#f_fav_report").hide(), $("#f_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_tab3").removeClass("tab_inactive").addClass("tab_active"))
	});
	$("#f_sample_close").click(function() {
		null != y ? (y.show(), j.hide(), null != t && (t.refresh(), t.setPosition(0, 0)), y = null) : showCity();
		return !1
	});
	$("#f_fav_add").click(function() {
		var a = $("#f_fav_name").val();
		if(null != a && "" != a) {
			if(a == userinfo.nick)
				return showInfo(LNG.ERROR.SERVER[5302]), !1;
			if(
				void 0 != typeof p && null != p)
				for(var c = 0; c < p.length; c++)
					if(p[c].nick == a)
						return showInfo(LNG.ERROR.SERVER[5301]), !1;
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
				key : key,
				nick : a
			}, function(a) {
				p.push(a.ret.friend);
				u(a.ret.friend, p.length - 1)
			})
		}
		return !1
	});
	$("#content").css("background-image", "url(img/bg/view.jpg)");
	t = new iScroll("scroller", {
		desktopCompatibility : !0
	});
	m()
});
defineSubView("f_gift", function() {
	function v() {
		if("undefined" != typeof userinfo.gift && null != userinfo.gift && 0 < userinfo.gift.length) {
			var m = $("#f_gift_content1");
			m.empty().unbind();
			$.each(userinfo.gift, function(i, e) {
				var a = mainStatus.ITEM_DATA[e.id];
				if("undefined" != typeof a && null != a) {
					var k = null == e.msg || "" == e.msg ? 60 : 90;
					m.append('<div style="position:relative;height:' + k + 'px;"><div id="f_gift_img' + e.id + '" class="itemicon1" style="top: 5px; left: 5px;"></div><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height: ' + (k - 10) + 'px;"><p><b>' + a.name + '</b></p><p style="position:relative;top:6px;">' + a.desc + (null == e.msg ? "" : e.msg) + '</p><div id="f_gift_get' + e.id + '" class="funcbutton" style="top: -3px; left: 330px;">' + LNG.GET_GIFT + "</div></div></div>");
					Utils.loadImage(m.find("#f_gift_img" + e.id), Utils.getItemImage(e.id));
					m.find("#f_gift_get" + e.id).click(function() {
						1 == e.s ? 183 == e.id ? (location.href = "js-call:brow?" + CONFIG.MASTERHOST + "facebook/gift.php?refcode=" + keyinfo.refercode + "&em_user=" + keyinfo.user, showCity()) : showInfo(LNG.PLEASEUPDATE) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
							key : key,
							action : "gift",
							id : e.id
						}, function() {
							showInfo(LNG.GETGIFTSUCCESS2);
							userinfo.gift.splice(i, 1);
							Utils.setCookie("user", userinfo);
							v()
						}, function(a) {
							3117 == a && (userinfo.gift.splice(i, 1), Utils.setCookie("user", userinfo), v())
						}))
					})
				}
			});
			m.show()
		} else
			$("#f_sample_tab1").hide(), $("#f_sample_tab1").attr("class", "tab_active"), $("#f_gift_content1").hide(), $("#f_gift_content2").show()
	}

	var s = null, u = $("#f_gift_html_script"), q = $(u.parent().get(0));
	q.bind("dispose", function() {
		null != s && (s.destroy(!1), s = null);
		q = null
	});
	q.find(".tab_active,.tab_inactive").click(function(m) {
		$(this).hasClass("tab_inactive") && (q.find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), $(this).trigger("tab", m));
		return !1
	});
	$("#f_sample_tab1").bind("tab", function() {
		$("#f_gift_content2").hide();
		$("#f_gift_content1").show();
		null != s && (s.refresh(), s.setPosition(0, 0));
		return !1
	});
	$("#f_sample_tab2").bind("tab", function() {
		$("#f_gift_content1").hide();
		$("#f_gift_content2").show();
		null != s && (s.refresh(), s.setPosition(0, 0));
		return !1
	});
	$("#f_sample_close").click(function() {
		showCity();
		return !1
	});
	$("#f_gift_giftbycode").click(function() {
		var m = $("#f_gift_giftcode").val();
		null != m && ( m = Utils.trim(m), "" != m && (pnlLoading.show(), ajaxCall(CONFIG.MASTERHOST + CONFIG.MASTER_GIFT, {
			user : keyinfo.user,
			code : m
		}, function() {
			showInfo(LNG.GETGIFTSUCCESS)
		})));
		return !1
	});
	$("#f_invite_email_select").click(function() {
		return !1
	});
	$("#content").css("background-image", "url(img/bg/view.jpg)");
	v();
	s = new iScroll("scroller", {
		desktopCompatibility : !0
	});
	pnlLoading.hide()
});
defineSubView("f_help", function() {
	var v = $("#f_sample_html_script"), s = $(v.parent().get(0));
	s.bind("dispose", function() {
		s = null
	});
	$("#f_sample_close").click(function() {
		showCity();
		return !1
	});
	$("#f_help_forum").click(function() {
		$("#f_help_frame").attr("src", "http://emrosswar.com/forum/");
		$("#f_help_frame").show();
		$("#f_help_list").hide();
		return !1
	});
	$("#content").css("background-image", "url(img/bg/view.jpg)");
	window.f_help_frame_resize = function() {
		try {
			frame = document.getElementById("f_help_frame"), innerDoc = frame.contentDocument ? frame.contentDocument : frame.contentWindow.document, objToResize = frame.style ? frame.style : frame, objToResize.height = innerDoc.body.scrollHeight + 10
		} catch(s) {
			alert(s.message)
		}
	}
});
defineSubView("f_invite", function() {
	function v() {
		if(null != m) {
			var a = $("#f_invite_email_name").val();
			$("#f_invite_email_topic").text(translate(m.topic, a));
			$("#f_invite_email_body").html(translate(m.body, keyinfo.refercode, a))
		}
	}

	function s() {
		if(null != i) {
			var a = $("#f_invite_sms_name").val();
			$("#f_invite_sms_txt").text(translate(i.txt, a, keyinfo.refercode))
		}
	}

	var u = 0, q = 0, m = null, i = null, e = null, a = null, k = $("#f_invite_html_script"), t = $(k.parent().get(0));
	t.bind("dispose", function() {
		null != a && (a.destroy(!1), a = null);
		t = null;
		window.addemail = null;
		window.addsms = null
	});
	t.find(".tab_active,.tab_inactive").click(function(a) {
		$(this).hasClass("tab_inactive") && (t.find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), $(this).trigger("tab", a));
		return !1
	});
	$("#f_sample_tab1").bind("tab", function() {
		$("#f_invite_content5").hide();
		$("#f_invite_content4").hide();
		$("#f_invite_content1").show();
		$("#f_invite_content2").hide();
		null != a && (a.refresh(), a.setPosition(0, 0));
		return !1
	});
	$("#f_sample_tab2").bind("tab", function() {
		$("#f_invite_content2").show();
		$("#f_invite_content5").hide();
		$("#f_invite_content4").hide();
		$("#f_invite_content1").hide();
		// null == e ? (pnlLoading.show(), ajaxCall(CONFIG.MASTERHOST + CONFIG.MASTER_CONTENT, {
			// act : "facebook"
		// }, function(c) {
			// e = c.ret;
			// null != e && $("#f_invite_fb_txt").html(translate(e.msg, keyinfo.refercode));
			// null != a && (a.refresh(), a.setPosition(0, 0))
		// })) : null != a && (a.refresh(), a.setPosition(0, 0));
		return !1
	});
	$("#f_sample_tab3").bind("tab", function() {
		return !1
	});
	$("#f_invite_email_name").change(function() {
		v()
	});
	$("#f_sample_tab4").bind("tab", function() {
		$("#f_invite_content5").hide();
		$("#f_invite_content4").show();
		$("#f_invite_content1").hide();
		$("#f_invite_content2").hide();
		$("#f_invite_email_friends").val("");
		$("#f_invite_email_select").show();
		u = 0;
		// null == m ? (pnlLoading.show(), ajaxCall(CONFIG.MASTERHOST + CONFIG.MASTER_CONTENT, {
			// act : "email"
		// }, function(c) {
			// m = c.ret;
			// v();
			// null != a && (a.refresh(), a.setPosition(0, 0))
		// })) : null != a && (a.refresh(), a.setPosition(0, 0));
		return !1
	});
	$("#f_invite_sms_name").change(function() {
		s()
	});
	$("#f_sample_tab5").bind("tab", function() {
		$("#f_invite_content5").show();
		$("#f_invite_content4").hide();
		$("#f_invite_content1").hide();
		$("#f_invite_content2").hide();
		$("#f_invite_sms_friends").val("");
		$("#f_invite_sms_select").show();
		q = 0;
		// null == i ? (pnlLoading.show(), ajaxCall(CONFIG.MASTERHOST + CONFIG.MASTER_CONTENT, {
			// act : "sms"
		// }, function(c) {
			// i = c.ret;
			// s();
			// null != a && (a.refresh(), a.setPosition(0, 0))
		// })) : null != a && (a.refresh(), a.setPosition(0, 0));
		return !1
	});
	$("#f_sample_close").click(function() {
		showCity();
		return !1
	});
	//Bot functions
	$("#f_invite_email_select").click(function() {
		//location.href = "js-call:address?email";
		g_autobuyfood = !g_autobuyfood;
        g_autobuyfood ? showInfo("Start gold2food func") : showInfo("Stop gold2food func");
		return !1
	});
	$("#f_invite_sms_select").click(function() {
		location.href = "js-call:address?sms";
		return !1
	});
	$("#f_invite_email_send").click(function() {
		/*var a = encodeURIComponent($.trim($("#f_invite_email_friends").val()));
		if("" == a)
			return showInfo(LNG.ERROR.CLIENT.EMPTYTO), !1;
		var e = $.trim($("#f_invite_email_name").val());
		if("" == e)
			return showInfo(LNG.ERROR.CLIENT.EMPTYFROM), !1;
		showConfirm(translate(LNG.CONFIRMFROM, e), function() {
			e = encodeURIComponent(e);
			pnlLoading.show();
			ajaxCall(CONFIG.MASTERHOST + CONFIG.MASTER_INVITE, {
				act : "email",
				code : keyinfo.refercode,
				from : e,
				to : a
			}, function() {
				showInfo(LNG.SUCCESS);
				$("#f_invite_email_friends").val("")
			})
		});*/
		gb_SmartBot = !gb_SmartBot;
        if(gb_SmartBot) {
        	showInfo("Bot Start");
        	startAttack();
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
    var tmp_interval = -1;
    $("#f_milbot_function_2-3").click(function () {
    	// for(i=0;i<10;i++) transportMilbot(207,299,5,$("#tr_troop").val(),$("#tr_golds").val());
    	// var troop = $("#tr_troop").val();
    	// var golds = $("#tr_golds").val();
    	// for(i=0;i<10;i++) setTimeout(transportMilbot(207,147,5,troop,golds),0);
    	
		
			if(tmp_interval == -1) {
				showInfo("Start");
				var gid = parseInt($("#tr_troop").val());
				var tgid = parseInt($("#tr_golds").val());
				showInfo(gid + "/" + tgid);
				tmp_interval = setInterval(function() {
					ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
						key : key,
						gid : gid,
						tgid : tgid
					}, function(c) {
						var ret = LNG.ARENARESULT[3 + c.ret.win]+"/"+c.ret.exp;
						showInfo(ret);
					});
				}, 900);
			} else {
				clearInterval(tmp_interval);
				tmp_interval = -1;
				showInfo("Stop");
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
	//End
	$("#f_invite_sms_send").click(function() {
		var a = encodeURIComponent($.trim($("#f_invite_sms_friends").val()));
		if("" == a)
			return showInfo(LNG.ERROR.CLIENT.EMPTYTO), !1;
		var e = $.trim($("#f_invite_sms_name").val());
		if("" == e)
			return showInfo(LNG.ERROR.CLIENT.EMPTYFROM), !1;
		showConfirm(translate(LNG.CONFIRMFROM, e), function() {
			// e = encodeURIComponent(e);
			// pnlLoading.show();
			// ajaxCall(CONFIG.MASTERHOST + CONFIG.MASTER_INVITE, {
				// act : "sms",
				// code : keyinfo.refercode,
				// from : e,
				// to : a
			// }, function() {
				// showInfo(LNG.SUCCESS);
				// $("#f_invite_sms_friends").val("")
			// })
		});
		return !1
	});
	$("#f_invite_fb_send").click(function() {
		//location.href = "js-call:brow?" + CONFIG.MASTERHOST + "facebook/index.php?refcode=" + keyinfo.refercode;
		setupExploreMap();
		return !1
	});
	window.addemail = function(a, e) {
		var i = $("#f_invite_email_friends").val();
		$("#f_invite_email_friends").val(null == i || "" == i ? '"' + a + '"<' + e + ">" : i + (',"' + a + '"<' + e + ">"));
		$("#f_invite_email_friends").focus();
		$("#f_invite_email_friends").blur();
		u++;
		20 <= u && $("#f_invite_email_select").hide()
	};
	window.addsms = function(a, e) {
		var i = $("#f_invite_sms_friends").val();
		$("#f_invite_sms_friends").val(null == i || "" == i ? '"' + a + '"<' + e + ">" : i + (',"' + a + '"<' + e + ">"));
		$("#f_invite_sms_friends").focus();
		$("#f_invite_sms_friends").blur();
		q++;
		20 <= q && $("#f_invite_sms_select").hide()
	};
	$("#content").css("background-image", "url(img/bg/view.jpg)");
	$("#f_invite_referercode").val(keyinfo.refercode);
	$("#f_invite_email_name").val(userinfo.nick);
	$("#f_invite_sms_name").val(userinfo.nick);
	CONFIG.RELEASE && ($("#f_invite_email_friends").attr("readonly", !0), $("#f_invite_sms_friends").attr("readonly", !0));
	a = new iScroll("scroller", {
		desktopCompatibility : !0
	});
	pnlLoading.hide()
});
defineSubView("f_item", function() {
	function v(a, d, b) {
		function e() {
			var b = Math.ceil(Math.pow(x, 1.5)), b = b > k ? k : b;
			b == k && ( z = !1, clearInterval(c));
			a.value = i + d * b;
			x++
		}

		z = !0;
		var i = Utils.parseInt(a.value, 0), k = Math.abs(b - i), x = 1;
		e();
		1 < k && setTimeout(function() {
			clearInterval(c);
			z && ( c = setInterval(e, 100))
		}, 300)
	}

	function s() {
		z = !1;
		clearInterval(c);
		timer = null
	}

	function u() {
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
			key : key,
			action : "goods_list",
			type : r,
			page : d
		}, function(a) {
			D = a.ret.max;
			C = a.ret.item;
			q()
		})
	}

	function q() {
		$("#f_item_list").empty().unbind();
		null != C && $.each(C, function(a, c) {
			var b = mainStatus.ITEM_DATA[c.item.sid];
			if(!("undefined" == typeof b || null == b)) {
				var e = LNG.ITEMRANK[b.rank], e = '<div style="position:relative;height: 60px;"><div id="f_item_img' + c.item.id + '" class="itemicon1" style="top: 5px; left: 5px;"></div><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px"><p><b><font color="' + e.color + '">' + b.name + '</font></b>&nbsp;<strong>(<font color="' + e.color + '">' + e.name + "</font>)</strong>&nbsp;<b>" + (0 < c.item.up ? "+" + c.item.up : "") + "</b>";
				1 < c.item.num && (e += "&nbsp;x" + c.item.num);
				var i = b.desc;
				if("undefined" != typeof c.item.attr && null != c.item.attr)
					for(var m = 0; m < c.item.attr.length; m++)
						0 != c.item.attr[m] && ( i = translate(i, c.item.attr[m]));
				e += '</p><p style="position:relative;top:6px;">' + i + "</p>";
				i = 330;
				0 < c.sale ? (e += '<ul class="reshead2" style="position: absolute; top: 0px; left: 190px;"><li><em class="gold"></em><b>' + c.sale + '</b></li></ul><div id="f_item_sale' + c.item.id + '" class="funcbutton" style="top: -3px; left: 330px;">' + LNG.ITEM_SELL + "</div>", i = 260) : 168 != c.item.sid && (e += '<ul class="reshead2" style="position: absolute; top: 0px; left: 190px;"><li><em class="gold"></em><b>1000</b></li></ul><div id="f_item_sale' + c.item.id + '" class="funcbutton" style="top: -3px; left: 330px;">' + LNG.ITEM_SELL + "</div>", i = 260);
				1 == c.use && (e += '<div id="f_item_use' + c.item.id + '" class="funcbutton" style="top: -3px; left: ' + i + 'px;">' + LNG.ITEM_USE + "</div>");
				$("#f_item_list").append(e + "</div></div>");
				Utils.loadImage($("#f_item_img" + c.item.id), Utils.getItemImage(c.item.sid));
				$("#f_item_use" + c.item.id).click(function() {
					if(124 == c.item.sid)
						return n = c.item.id, $("#f_item_124").show(), !1;
					if(190 == c.item.sid)
						return n = c.item.id, $("#f_item_190").show(), !1;
					var a = 1, d = function() {
						pnlLoading.show();
						ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_OP, {
							key : key,
							action : "use",
							city : mainStatus.getCity().id,
							id : c.item.id,
							num : a
						}, function(a) {
							"undefined" != typeof a.ret.buff && null != a.ret.buff && "" != a.ret.buff && mainStatus.CITY_INFO[23].push(a.ret.buff);
							var b = null;
							"undefined" != typeof a.ret.item && null != a.ret.item && 0 < a.ret.item.length && $.each(a.ret.item, function(a, c) {
								var d = mainStatus.ITEM_DATA[c.sid];
								"undefined" == typeof d || null == d || null != d && ( b = null == b ? "[<b>" + d.name + "</b>]x" + c.num : b + ("&nbsp;[<b>" + d.name + "</b>]x" + c.num))
							});
							"undefined" != typeof a.ret.gem && null != a.ret.gem && 0 != a.ret.gem && (userinfo.money += a.ret.gem, refreshUserInfo(), b = null == b ? '<img src="img/res/gem3.gif"/>x' + a.ret.gem : b + ('&nbsp;<img src="img/res/gem3.gif"/>x' + a.ret.gem));
							"undefined" != typeof a.ret.wood && null != a.ret.wood && 0 != a.ret.wood && (mainStatus.CITY_INFO[6] += a.ret.wood, b = null == b ? '<img src="img/res/wood.png"/>x' + a.ret.wood : b + ('&nbsp;<img src="img/res/wood.png"/>x' + a.ret.wood));
							"undefined" != typeof a.ret.food && null != a.ret.food && 0 != a.ret.food && (mainStatus.CITY_INFO[4] += a.ret.food, b = null == b ? '<img src="img/res/food.png"/>x' + a.ret.food : b + ('&nbsp;<img src="img/res/food.png"/>x' + a.ret.food));
							"undefined" != typeof a.ret.iron && null != a.ret.iron && 0 != a.ret.iron && (mainStatus.CITY_INFO[8] += a.ret.iron, b = null == b ? '<img src="img/res/iron.png"/>x' + a.ret.iron : b + ('&nbsp;<img src="img/res/iron.png"/>x' + a.ret.iron));
							"undefined" != typeof a.ret.gold && null != a.ret.gold && 0 != a.ret.gold && (mainStatus.CITY_INFO[2] += a.ret.gold, b = null == b ? '<img src="img/res/ic06_other.gif"/>x' + a.ret.gold : b + ('&nbsp;<img src="img/res/ic06_other.gif"/>x' + a.ret.gold));
							null == b ? showInfo(LNG.SUCCESS) : showInfo(translate(LNG.GETITEM, b));
							u()
						})
					};
					112 == c.item.sid || 131 == c.item.sid ? ($("#f_item_use_num_confirm").unbind(), $("#f_item_use_num_confirm").click(function() {
						a = parseInt($("#f_item_use_num input").val());
						0 >= a ? ( a = 1, showInfo(LNG.ERROR.CLIENT.INVALIDINPUT)) : (d(), $("#f_item_use_num").hide())
					}), $("#f_item_use_num").show()) : showConfirm(translate(LNG.CONFIRMUSE, b.name), d);
					return !1
				});
				$("#f_item_use_num_cancel").click(function() {
					$("#f_item_use_num").hide()
				});
				$("#f_item_sale" + c.item.id).click(function() {
					1 < c.item.num ? ( k = c.item.num, t = c.item.id, p.value = 1, $("#f_item_sale_panel").show()) : showConfirm(translate(LNG.CONFIRMSALE, b.name), function() {
						pnlLoading.show();
						ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_OP, {
							key : key,
							action : "sale",
							city : mainStatus.getCity().id,
							id : c.item.id
						}, function(a) {
							mainStatus.CITY_INFO[2] = a.ret.gold;
							showInfo(LNG.SUCCESS);
							1 == C.length && d--;
							0 == d && ( d = 1);
							u()
						})
					});
					return !1
				})
			}
		});
		null != m && (m.refresh(), m.setPosition(0, 0));
		1 >= D ? $("#f_item_page").hide() : ($("#f_item_page").show(), $("#f_item_page_num").text(d + "/" + D), 1 >= d ? $("#f_item_page_left").hide() : $("#f_item_page_left").show(), d >= D ? $("#f_item_page_right").hide() : $("#f_item_page_right").show())
	}

	var m = null, i = $("#f_sample_html_script"), e = $(i.parent().get(0)), a = EMA.getProxy();
	e.bind("dispose", function() {
		null != m && (m.destroy(!1), m = null);
		Utils.removeCss("f_item_css");
		a.dispose();
		e = a = null
	});
	var k = 0, t = 0, c = null, z = !1;
	e.find("#f_num input").change(function() {
		var a = Utils.parseInt($(this).val(), 0), a = Math.min(a, k);
		$(this).val(a)
	});
	var p = e.find("#f_num").find("input").get(0);
	e.find("#f_num_minus").unbind();
	e.find("#f_num_minus").bind("mousedown touchstart", function() {
		s();
		v(p, -1, 0)
	});
	e.find("#f_num_minus").bind("mouseup touchend", function() {
		s()
	});
	e.find("#f_num_plus").unbind();
	e.find("#f_num_plus").bind("mousedown touchstart", function() {
		s();
		v(p, 1, k)
	});
	e.find("#f_num_plus").bind("mouseup touchend", function() {
		s()
	});
	e.find("#f_num_max").unbind().click(function() {
		s();
		p.value = k
	});
	var C = null, d = 1, D = 1, r = 3, n = 0;
	$("#f_sample_close").click(function() {
		showCity();
		return !1
	});
	e.find("#f_item_124_cancel").click(function() {
		$("#f_item_124").hide();
		return !1
	});
	e.find("#f_item_124_confirm").click(function() {
		$("#f_item_124").hide();
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_OP, {
			key : key,
			action : "use",
			city : mainStatus.getCity().id,
			id : n,
			x : $("#f_item_124_x").get(0).value,
			y : $("#f_item_124_y").get(0).value
		}, function() {
			showInfo(LNG.SUCCESS);
			resyncUserInfo();
			u()
		});
		return !1
	});
	e.find("#f_item_190_cancel").click(function() {
		$("#f_item_190").hide();
		return !1
	});
	e.find("#f_item_190_confirm").click(function() {
		$("#f_item_190").hide();
		var a = $("#f_item_190_name").get(0);
		if("" == a.value)
			showInfo(LNG.ERROR.CLIENT.EMPTYCASTLENAME);
		else
			return pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_OP, {
				key : key,
				action : "use",
				city : mainStatus.getCity().id,
				id : n,
				name : a.value
			}, function() {
				showInfo(LNG.SUCCESS);
				resyncUserInfo();
				u()
			}), !1
	});
	e.find("#f_sale_cancel").click(function() {
		$("#f_item_sale_panel").hide();
		return !1
	});
	e.find("#f_sale_confirm").click(function() {
		$("#f_item_sale_panel").hide();
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_OP, {
			key : key,
			action : "sale",
			city : mainStatus.getCity().id,
			id : t,
			num : p.value
		}, function(a) {
			mainStatus.CITY_INFO[2] = a.ret.gold;
			showInfo(LNG.SUCCESS);
			u()
		});
		return !1
	});
	e.find(".tab_active,.tab_inactive").click(function(a) {
		$(this).hasClass("tab_inactive") && (e.find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), $(this).trigger("tab", a));
		return !1
	});
	$("#f_sample_sub_tab1").bind("tab", function() {
		d = r = 1;
		u();
		return !1
	});
	$("#f_sample_sub_tab2").bind("tab", function() {
		r = 2;
		d = 1;
		u();
		return !1
	});
	$("#f_sample_sub_tab3").bind("tab", function() {
		r = 5;
		d = 1;
		u();
		return !1
	});
	$("#f_sample_sub_tab4").bind("tab", function() {
		r = 4;
		d = 1;
		u();
		return !1
	});
	$("#f_sample_sub_tab5").bind("tab", function() {
		r = 6;
		d = 1;
		u();
		return !1
	});
	$("#f_sample_sub_tab6").bind("tab", function() {
		r = 3;
		d = 1;
		u();
		return !1
	});
	$("#f_item_page_left").click(function() {
		1 < d && (d--, u());
		return !1
	});
	$("#f_item_page_right").click(function() {
		d < D && (d++, u());
		return !1
	});
	$("#content").css("background-image", "url(img/bg/view.jpg)");
	(function() {
		m = new iScroll("scroller", {
			desktopCompatibility : !0
		});
		u();
		a.bind("useitem", function(a) {
			if(null != C)
				for(var c = 0; c < C.length; c++) {
					var b = C[c];
					if(b.item.sid == a) {
						$("#f_item_use" + b.item.id).click();
						return
					}
				}
			showInfo(LNG.ERROR.SERVER[3114])
		})
	})()
});
defineSubView("f_lottery", function() {
	function v() {
		for(var a = 0; 10 > a; a++) {
			var c = t[a], d;
			"item" == c.type ? ( d = mainStatus.ITEM_DATA[c.value].type, 5 == d && ( d = 1), d = '<img src="img/lottery/480/item' + d + '0.png" />', c = mainStatus.ITEM_DATA[c.value].name) : ( d = k[c.type], c = "x" + c.value);
			e.find("div:eq(" + a + ")").append($(d)).append("<span>" + c + "</span>")
		}
		$("#pan_hand").click(q);
		e.bind("touchmove", function() {
			q()
		})
	}

	function s() {
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_LOTTERY, {
			key : key,
			action : "rotate"
		}, function(a) {
			C = !0;
			d = a.ret.remain
		}, function() {
			5 < z || (z++, s())
		})
	}

	function u() {
		C ? (clearInterval(r), p = 360 * Math.floor(p / 360), p += 720 + 36 * c, e.css("-webkit-transition-duration", "3s").css("-webkit-transition-timing-function", "ease-out").css("-webkit-transform", "rotate(" + p + "deg)")) : (p += 360, e.css("-webkit-transform", "rotate(" + p + "deg)"))
	}

	function q() {
		0 < z || (z++, C = !1, s(), e.css("-webkit-transition-duration", "1s").css("-webkit-transition-timing-function", "linear"), r = setInterval(u, 1E3), u())
	}

	var m = $("#f_sample_html_script"), i = $(m.parent().get(0));
	i.bind("dispose", function() {
		dispose();
		i = null
	});
	var e = $("#pan"), a = {
		g : LNG.COIN,
		f : LNG.FOOD,
		w : LNG.WOOD,
		i : LNG.IRON
	}, k = {
		g : '<img src="img/lottery/480/gold0.png" />',
		f : '<img src="img/lottery/480/food0.png" />',
		w : '<img src="img/lottery/480/wood0.png" />',
		i : '<img src="img/lottery/480/iron0.png" />'
	}, t, c = null, z = 0, p = 0, C = !1, d = 0, D = 0, r;
	(function() {
		$("#f_lottery_close").click(function() {
			$("#f_lottery").remove();
			showCity()
		});
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_LOTTERY, {
			key : key,
			action : "list"
		}, function(a) {
			t = a.ret.list;
			c = a.ret.got;
			d = a.ret.remain;
			D = a.ret.loginTimes;
			v()
		})
	})();
	e.bind("webkitTransitionEnd", function() {
		C && showInfo(LNG.LOTTERY.REMAIN.format("item" == t[c].type ? mainStatus.ITEM_DATA[t[c].value].name : a[t[c].type] + " x" + t[c].value, D, d), function() {
			0 >= d || ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_LOTTERY, {
				key : key,
				action : "list"
			}, function(a) {
				t = a.ret.list;
				c = a.ret.got;
				d = a.ret.remain;
				z = 0
			})
		})
	})
});
defineSubView("f_mail", function() {
	function v(a, b) {
		null != s ? (s.refresh(), s.setPosition(a || 0, b || 0)) : s = new iScroll("scroller", {
			desktopCompatibility : !0
		});
		return !1
	}

	var s, u = [], q = $("#f_sample_html_script"), m = $(q.parent().get(0));
	m.bind("dispose", function() {
		null != s && (s.destroy(!1), s = null);
		m = null
	});
	var i = m.find("#f_mail_page"), e = i.find("#f_mail_page_pre"), a = i.find("#f_mail_page_next"), k = !1, t = function(b, c, d) {
		i.find("#f_mail_page_current").text(b + "/" + c);
		e.unbind();
		a.unbind();
		1 >= c ? (i.hide(), k = !1) : (i.show(), k = !0, 1 < b ? (e.show(), e.click(function() {
			e.unbind();
			a.unbind();
			d(b - 1);
			return !1
		})) : e.hide(), b < c ? (a.show(), a.click(function() {
			e.unbind();
			a.unbind();
			d(b + 1);
			return !1
		})) : a.hide())
	}, c = m.find("#f_mail_inbox_content");
	m.find("#f_mail_inbox_detail");
	var z = $(c.find("#f_mail_template").get(0));
	z.remove();
	var p = function(a) {
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MAIL_DELETE, {
			key : key,
			id : a.join(",")
		}, function() {
			j(r)
		}, function() {
		})
	}, C = function() {
		m.find("#f_mail_inbox").toggle();
		m.find("#f_mail_inbox_detail").toggle();
		m.find("#f_mail_inbox_detail_body").toggle();
		m.find("#f_mail_inbox").is(":visible") ? (k && m.find("#f_mail_page").show(), y()) : m.find("#f_mail_page").hide()
	}, d = function(a) {
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MAIL_DETAIL, {
			key : key,
			id : a.id
		}, function(b) {
			m.find("#f_mail_inbox_detail_title b").text(a.title);
			m.find("#f_mail_inbox_detail_sender b").text(a.sender);
			m.find("#f_mail_inbox_detail_date b").text(Utils.ftime(new Date(1E3 * a.time), "MM/dd hh:mm:ss"));
			b = b.ret.replace(/\n/ig, "<br>");
			m.find("#f_mail_inbox_detail_body").html(b);
			$("#f_mail_inbox_delete").hide();
			$("#f_mail_report_delete").hide();
			v(0, 0);
			C();
			m.find("#f_mail_inbox_detail_delete").click(function() {
				p([a.id]);
				j();
				m.find("#f_mail_inbox_detail").hide();
				m.find("#f_mail_inbox_detail_body").hide();
				m.find("#f_mail_inbox").show();
				m.find("#f_mail_inbox_delete").show();
				return !1
			});
			m.find("#f_mail_inbox_detail_reply").click(function() {
				O(a.sender, "re:" + a.title);
				return !1
			})
		}, function() {
		})
	}, D = function(a, b) {
		a.find("input[type=checkbox]").data("id", b.id);
		a.find("#f_mail_title").html(b.title ? b.title : "Untitled Message");
		a.find("#f_mail_sender").html(b.sender);
		a.find("#f_mail_date").html(Utils.ftime(new Date(1E3 * b.time), "MM/dd hh:mm:ss"));
		b["new"] && (a.css("font-weight", "bold"), a.find("#f_mail_title").addClass("newmsg"));
		a.find("#f_mail_report_view").click(function() {
			u.push(C);
			d(b);
			return b["new"] = !1
		})
	}, r = 1, n = null, y = function() {
		c.empty();
		null != n && $.each(n, function(a, b) {
			var d = z.clone();
			D(d, b);
			c.append(d)
		});
		v(0, 0)
	}, j = function(a) {
		r = a = a || r || 1;
		m.find("#f_mail_inbox .iphonetitle input[type=checkbox]").attr("checked", !1);
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MAIL, {
			key : key,
			page : a
		}, function(b) {
			if(b.ret.max && r > b.ret.max)
				r = b.ret.max, j(r);
			t(a, b.ret.max, function(a) {
				j(a)
			});
			n = b.ret.mail;
			y()
		}, function() {
		})
	};
	m.find("#f_mail_inbox_delete").click(function() {
		var a = [];
		c.find("input[type=checkbox]").each(function(b, c) {
			!0 == $(c).attr("checked") && a.push($(c).data("id"))
		});
		p(a);
		return !1
	});
	m.find("#f_mail_inbox .iphonetitle input[type=checkbox]").change(function() {
		var a = $(this).attr("checked");
		m.find("#f_mail_inbox_content input[type=checkbox]").attr("checked", a)
	});
	var b = m.find("#fwi_progresses"), h = m.find("#fwi_progress"), A = function() {
		m.find("#f_mail_report").toggle();
		m.find("#f_mail_report_detail").toggle()
	}, B = function(a, c, d) {
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_WAR_DETAIL, {
			key : key,
			id : a.id
		}, function(e) {
			var l = m.find("#f_mail_report_detail");
			l.find("#f_mail_report_detail_type b").html(LNG.ACTIONTYPE_FULL[a.type]);
			l.find("#f_mail_report_detail_attacker b").html(a.aname);
			l.find("#f_mail_report_detail_attacker_xy b").html(a.ax + "/" + a.ay);
			var j = "", j = 7 == a.type ? LNG.MONSTER : 8 == a.type ? LNG.RESCOLONY : 3 == a.type ? 0 < a.did ? a.dname : 1 == a.dcid ? LNG.RESCOLONY : LNG.MONSTER : a.dname;
			l.find("#f_mail_report_detail_defender b").html(j);
			l.find("#f_mail_report_detail_defender_xy b").html(a.dx + "/" + a.dy);
			a.aid == userinfo.id ? l.find("#f_mail_report_detail_result b").html(1 == a.flag ? LNG.ACTIONRESULT2.WIN : 0 == a.flag ? LNG.ACTIONRESULT2.LOSE : LNG.ACTIONRESULT2.DRAW) : l.find("#f_mail_report_detail_result b").html(1 == a.flag ? LNG.ACTIONRESULT2.LOSE : 0 == a.flag ? LNG.ACTIONRESULT2.WIN : LNG.ACTIONRESULT2.DRAW);
			l.find("#f_mail_report_detail_date").html(Utils.ftime(new Date(1E3 * a.time), "MM/dd/yy hh:mm:ss"));
			if(0 == a.type || 9 == a.type)
				l.find("#f_mail_report_detail_spy").show(), l.find("#f_mail_report_detail_loot").show(), l.find("#f_mail_report_detail_loot").text(LNG.ACTIONTYPE[0]);
			else if(2 == a.type)
				l.find("#f_mail_report_detail_spy").hide(), l.find("#f_mail_report_detail_loot").hide();
			else if(3 == a.type)
				l.find("#f_mail_report_detail_spy").show(), l.find("#f_mail_report_detail_loot").show(), 0 < a.did ? l.find("#f_mail_report_detail_loot").text(LNG.ACTIONTYPE[0]) : 1 == a.dcid ? l.find("#f_mail_report_detail_loot").text(LNG.ACTIONTYPE[8]) : l.find("#f_mail_report_detail_loot").text(LNG.ACTIONTYPE[7]);
			else if(5 == a.type)
				l.find("#f_mail_report_detail_spy").hide(), l.find("#f_mail_report_detail_loot").hide();
			else if(7 == a.type || 8 == a.type)
				l.find("#f_mail_report_detail_spy").show(), l.find("#f_mail_report_detail_loot").show(), l.find("#f_mail_report_detail_loot").text(LNG.ACTIONTYPE[a.type]);
			j = [];
			l.find("#f_mail_report_detail_body").hide();
			l.find("#f_mail_report_detail_body_other").hide();
			if(3 == a.type)
				e = e.ret.scout_report, j.push("<b>" + LNG.REPORT.MISSION_RESULT + ":&nbsp;</b>"), j.push(0 == e.flag || 3 == e.flag ? LNG.SPYRESULT[1] : 1 == e.flag || 4 == e.flag ? LNG.SPYRESULT[2] : 2 == e.flag || 5 == e.flag ? LNG.SPYRESULT[3] : ""), j.push("<br/><br/>"), j.push(e.result ? e.result : ""), l.find("#f_mail_report_detail_body_other").html(j.join("")).show();
			else if(5 == a.type || 2 == a.type)
				e = e.ret.other_report, j.push("<b>" + LNG.REPORT.MISSION_RESULT + ":&nbsp;</b>"), j.push(0 == e.flag ? LNG.ACTIONESULT.SUCCESS : LNG.ACTIONESULT.FAILED), j.push("<br/><br/>"), j.push(e.result ? e.result : ""), l.find("#f_mail_report_detail_body_other").html(j.join("")).show();
			else if(e.ret.scheme_report) {
				var e = e.ret.scheme_report, j = l.find("#f_mail_report_detail_body"), o = mainStatus.SCHEME_DATA[e.schemeId], k;
				( k = mainStatus.HERO_DATA[e.att.gen.id]) ? (j.find("#f_detail_left").show(), j.find("#fwi_agn").text(k.name), j.find("#fwi_agi").text(e.att.gen["int"]), j.find("#fwi_agim img").attr("src", Utils.getHeroRankImage(k.race, k.rank)), Utils.loadImage(j.find("#fwi_agim"), Utils.getHeroImage(e.att.gen.id))) : j.find("#f_detail_left").hide();
				( k = mainStatus.HERO_DATA[e.def.gen.id]) ? (j.find("#f_detail_right").show(), j.find("#fwi_dgn").text(k.name), j.find("#fwi_dgi").text(e.def.gen["int"]), j.find("#fwi_dgim img").attr("src", Utils.getHeroRankImage(k.race, k.rank)), Utils.loadImage(j.find("#fwi_dgim"), Utils.getHeroImage(e.def.gen.id))) : j.find("#f_detail_right").hide();
				k = LNG.SCHEME.WARRESULT[0].format(o.name);
				k += "<br />" + LNG.SCHEME.WARRESULT[1].format(o.effectATT.format(e.params[0]));
				k += "<br />" + LNG.SCHEME.WARRESULT[2].format(e.att.gen.exp);
				k += "<br />" + LNG.SCHEME.WARRESULT[3].format(e.att.exp);
				var x = LNG.SCHEME.WARRESULT[0].format(o.name), x = x + ("<br />" + LNG.SCHEME.WARRESULT[1].format(o.effectDEF.format(e.params[1]))), x = x + ("<br />" + LNG.SCHEME.WARRESULT[2].format(e.att.gen.exp));
				j.find("#scheme_pl .scheme_info").html(k);
				j.find("#scheme_pr .scheme_info").html(x);
				j.find("#fwi_aresult").text(e.success ? LNG.ACTIONRESULT.WIN : LNG.ACTIONRESULT.LOSE);
				j.find("#fwi_dresult").text(e.success ? LNG.ACTIONRESULT.LOSE : LNG.ACTIONRESULT.WIN);
				j.find("#rounds").hide();
				j.find("#fwi_progresses").hide();
				j.find("#scheme_pl").show();
				j.find("#scheme_pr").show();
				j.find("#fwi_pl").hide();
				j.find("#fwi_pr").hide();
				j.show()
			} else if(e.ret.war_report)
				e = e.ret.war_report, j = l.find("#f_mail_report_detail_body"), o = mainStatus.HERO_DATA[e.a_gen.gid], "undefined" != typeof o && null != o ? (j.find("#f_detail_left").show(), j.find("#fwi_agn").text(o.name), j.find("#fwi_aga").text(e.a_gen.attack), j.find("#fwi_agi").text(e.a_gen.intelligence), j.find("#fwi_agd").text(e.a_gen.defence), j.find("#fwi_agl").text(e.a_gen.loyalty), j.find("#fwi_agim img").attr("src", Utils.getHeroRankImage(o.race, o.rank)), Utils.loadImage(j.find("#fwi_agim"), Utils.getHeroImage(e.a_gen.gid))) : j.find("#f_detail_left").hide(), o = mainStatus.HERO_DATA[e.d_gen.gid], "undefined" != typeof o && null != o ? (j.find("#f_detail_right").show(), j.find("#fwi_dgn").text(o.name), j.find("#fwi_dga").text(e.d_gen.attack), j.find("#fwi_dgi").text(e.d_gen.intelligence), j.find("#fwi_dgd").text(e.d_gen.defence), j.find("#fwi_dgl").text(e.d_gen.loyalty), j.find("#fwi_dgim img").attr("src", Utils.getHeroRankImage(o.race, o.rank)), Utils.loadImage(j.find("#fwi_dgim"), Utils.getHeroImage(e.d_gen.gid))) : j.find("#f_detail_right").hide(), b.empty(), null != e.war_process && ($.each(e.war_process, function(a, c) {
					var d = h.clone();
					d.find("#fwi_pm").html(LNG.REPORT.ROUND + c.turn);
					d.find("#fwi_pl").html("<div>" + LNG.REPORT.ARMY + ": " + c.aarmy + "</div><div>" + LNG.REPORT.ATTACK_POINT + ": " + c.aattack_point + "</div><div>" + LNG.REPORT.DEFENCE_POINT + ": " + c.adefence_point + "</div>").show();
					d.find("#fwi_pr").html("<div>" + LNG.REPORT.ARMY + ": " + c.darmy + "</div><div>" + LNG.REPORT.ATTACK_POINT + ": " + c.dattack_point + "</div><div>" + LNG.REPORT.DEFENCE_POINT + ": " + c.ddefence_point + "</div>").show();
					b.append(d)
				}), j.find("#rounds").show(), j.find("#fwi_progresses").show()), j.find("#scheme_pl").hide(), j.find("#scheme_pr").hide(), j.find("#fwi_pl").show(), j.find("#fwi_pr").show(), j.find("#fwi_aresult").text(0 == e.war_result.aflag ? LNG.ACTIONRESULT.LOSE : 1 == e.war_result.aflag ? LNG.ACTIONRESULT.WIN : LNG.ACTIONRESULT.DRAW), j.find("#fwi_agenstatus").text(0 == e.war_result.agen_status ? "" : 1 == e.war_result.agen_status ? LNG.HEROSTATUS[2] : LNG.HEROSTATUS[3]), j.find("#fwi_aarm").text(e.war_result.aarmy_loss), j.find("#fwi_aloot").html(e.war_result.resource), j.find("#fwi_apexp").text(e.war_result.aplayer_exp), j.find("#fwi_agexp").text(e.war_result.agen_exp), j.find("#fwi_dresult").text(0 == e.war_result.aflag ? LNG.ACTIONRESULT.WIN : 1 == e.war_result.aflag ? LNG.ACTIONRESULT.LOSE : LNG.ACTIONRESULT.DRAW), j.find("#fwi_dgenstatus").text(0 == e.war_result.dgen_status ? "" : 1 == e.war_result.dgen_status ? LNG.HEROSTATUS[2] : LNG.HEROSTATUS[2] + "&" + LNG.HEROSTATUS[3]), j.find("#fwi_darm").text(e.war_result.darmy_loss), j.find("#fwi_dloot").html(e.war_result.resource), j.find("#fwi_dpexp").text(e.war_result.dplayer_exp), j.find("#fwi_dgexp").text(e.war_result.dgen_exp), $("#rounds").show(), l.find("#f_mail_report_detail_body").show();
			A();
			i.hide();
			l.find("#f_mail_report_detail_delete").unbind().click(function() {
				G([a.id], c, d)
			});
			l.find("#f_mail_report_detail_spy").unbind().click(function() {
				a.aid == userinfo.id ? GlobalNav.Scout(a.dx, a.dy) : GlobalNav.Scout(a.ax, a.ay)
			});
			l.find("#f_mail_report_detail_loot").unbind().click(function() {
				l.find("#f_mail_report_detail_loot").text() == LNG.ACTIONTYPE[0] ? a.aid == userinfo.id ? GlobalNav.Loot(a.dx, a.dy) : GlobalNav.Loot(a.ax, a.ay) : l.find("#f_mail_report_detail_loot").text() == LNG.ACTIONTYPE[8] ? GlobalNav.Occupy(a.dx, a.dy) : GlobalNav.Attack(a.dx, a.dy)
			});
			m.find("#wrapper").css("height", "220px");
			v(0, 0)
		}, function() {
		})
	}, x = function(a, b, c, d) {
		var e = 0;
		a.find("#f_mail_report_type").html(LNG.ACTIONTYPE[b.type]);
		if(null == b.aname)
			b.aname = "[" + LNG.CITY_DESTROYED + "]";
		if(null == b.dname)
			b.dname = "[" + LNG.CITY_DESTROYED + "]";
		if(5 == b.type)
			b.dname = "";
		a.find("#f_mail_report_attacker").html("" + b.ax + "/" + b.ay + " " + b.aname);
		var l = "";
		7 == b.type ? l = LNG.MONSTER : 8 == b.type ? l = LNG.RESCOLONY : 3 == b.type ? 0 < b.did ? l = b.dname : 1 == b.dcid ? ( l = LNG.RESCOLONY, 1 == b.flag && ( e = 1)) : ( l = LNG.MONSTER, 1 == b.flag && ( e = 2)) : l = b.dname;
		l = "" + b.dx + "/" + b.dy + " " + l;
		a.find("#f_mail_report_defender").html(l);
		b.aid == userinfo.id ? (a.find("#f_mail_report_isdefend").empty().html("&nbsp;"), a.find("#f_mail_report_result").html(1 == b.flag ? LNG.ACTIONRESULT.WIN : 0 == b.flag ? LNG.ACTIONRESULT.LOSE : LNG.ACTIONRESULT.DRAW)) : a.find("#f_mail_report_result").html(0 == b.flag ? LNG.ACTIONRESULT.WIN : 1 == b.flag ? LNG.ACTIONRESULT.LOSE : LNG.ACTIONRESULT.DRAW);
		var j = new Date(1E3 * b.time);
		864E5 < j - new Date ? a.find("#f_mail_report_date").html(Utils.ftime(j, "MM/dd")) : a.find("#f_mail_report_date").html(Utils.ftime(j, "hh:mm:ss"));
		a.find("input[type=checkbox]").data("id", b.id);
		var h = a.find("#f_mail_report_operations");
		h.css("z-index", 5);
		a.find("#f_mail_report_view").click(function() {
			E.find("#f_mail_report_operations").stop().hide();
			h.show();
			return !1
		});
		h.find("#f_op_hide").click(function() {
			h.hide();
			return !1
		});
		h.find("#f_op_detail").click(function() {
			$("#f_mail_inbox_delete").hide();
			$("#f_mail_report_delete").hide();
			h.hide();
			B(b, c, d);
			u.push(F);
			return !1
		});
		2 == b.type || 5 == b.type ? (h.find("#f_op_map").hide(), h.find("#f_op_loot").hide(), h.find("#f_op_spy").hide()) : (0 == b.type || 7 == b.type || 8 == b.type || 9 == b.type ? 9 == b.type ? h.find("#f_op_loot").text(LNG.ACTIONTYPE[0]) : h.find("#f_op_loot").text(LNG.ACTIONTYPE[b.type]) : 0 < b.did ? h.find("#f_op_loot").text(LNG.ACTIONTYPE[0]) : 0 < b.dcid ? h.find("#f_op_loot").text(LNG.ACTIONTYPE[8]) : h.find("#f_op_loot").text(LNG.ACTIONTYPE[7]), h.find("#f_op_loot").click(function() {
			h.find("#f_op_loot").text() == LNG.ACTIONTYPE[0] ? b.aid == userinfo.id ? GlobalNav.Loot(b.dx, b.dy) : GlobalNav.Loot(b.ax, b.ay) : h.find("#f_op_loot").text() == LNG.ACTIONTYPE[8] ? GlobalNav.Occupy(b.dx, b.dy) : GlobalNav.Attack(b.dx, b.dy);
			return !1
		}), h.find("#f_op_spy").click(function() {
			b.aid == userinfo.id ? GlobalNav.Scout(b.dx, b.dy) : GlobalNav.Scout(b.ax, b.ay);
			return !1
		}), h.find("#f_op_map").click(function() {
			main_loadDiv("f_map.html", {
				x : b.dx,
				y : b.dy
			});
			return !1
		}));
		0 == e ? a.find("#f_op_addfav").hide() : h.find("#f_op_addfav").click(function() {
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
				key : key,
				act : "addreport",
				wid : b.id,
				cat : e
			}, function() {
				showInfo(translate(LNG.ADDFAVDONE, l))
			});
			return !1
		})
	}, l = m.find("#f_mail_report_template"), E = m.find("#f_mail_report_content");
	l.remove();
	var o = function(a, b) {
		b = b || 1;
		m.find("#f_mail_report").show();
		m.find("#f_mail_report_detail").hide();
		E.empty();
		m.find("#f_mail_report .iphonetitle input[type=checkbox]").attr("checked", !1);
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_WAR_RESULT, {
			key : key,
			page : b,
			type : a
		}, function(c) {
			t(b, c.ret.max, function(b) {
				o(a, b)
			});
			null != c.ret.war && $.each(c.ret.war, function(c, d) {
				var e = l.clone();
				x(e, d, a, b);
				E.append(e)
			});
			v(0, 0)
		}, function() {
		});
		m.find("#f_mail_report_delete").unbind().click(function() {
			var c = [];
			E.find("input[type=checkbox]").each(function(a, b) {
				!0 == $(b).attr("checked") && c.push($(b).data("id"))
			});
			G(c, a, b);
			return !1
		})
	}, G = function(a, b, c) {
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_WAR_RESULT, {
			key : key,
			action : "delete",
			id : a.join(",")
		}, function() {
			o(b, c)
		}, function() {
		})
	}, F = function() {
		A();
		k && i.show();
		v(0);
		return !1
	};
	m.find("#f_mail_report .iphonetitle input[type=checkbox]").change(function() {
		var a = $(this).attr("checked");
		m.find("#f_mail_report_content input[type=checkbox]").attr("checked", a)
	});
	var H, I = function() {
		":help" == m.find("#f_mail_write #f_mail_write_receiver input").val() && 0 != m.find("#f_mail_write #f_mail_write_title input").val().toLowerCase().indexOf("re:") ? (m.find("#f_mail_write #f_mail_write_receiver input").width(H - 100), window.selectProxy.proxySelect($("#f_mail_write_receiver select")[0])) : (m.find("#f_mail_write #f_mail_write_receiver select").hide(), m.find("#f_mail_write #f_mail_write_receiver input").width(H))
	}, O = function(a, b) {
		$("#f_sample_tab4").click();
		H = m.find("#f_mail_write #f_mail_write_receiver input").width();
		m.find("#f_mail_write #f_mail_write_receiver input").val(a);
		m.find("#f_mail_write #f_mail_write_title input").val(b);
		I()
	};
	m.find("#f_mail_write #f_mail_write_receiver input").change(I);
	m.find("#f_mail_write #f_mail_write_title input").change(I);
	m.find("#f_mail_write_send").click(function() {
		var a = m.find("#f_mail_write_receiver input:first").val(), b = m.find("#f_mail_write_title input:first").val(), c = m.find("#f_mail_write_detail_body").val(), d = 0;
		if(":help" == m.find("#f_mail_write #f_mail_write_receiver input").val() && 0 != m.find("#f_mail_write #f_mail_write_title input").val().toLowerCase().indexOf("re:") && ( d = m.find("#f_mail_write #f_mail_write_receiver select").val(), "0" == d))
			return showInfo(LNG.NEEDSPECIFYHELPCATEGORY), !1;
		1 < a.length && 1 < b.length && 1 < c.length ? (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MAIL_SEND, {
			key : key,
			nick : a,
			title : b,
			body : c,
			category : d
		}, function() {
			showInfo(LNG.SENDMAILSUCCESS);
			m.find("#f_mail_write_receiver input:first").val("");
			m.find("#f_mail_write_title input:first").val("");
			m.find("#f_mail_write_detail_body").val("")
		}, function() {
		})) : "undefined" != typeof LNG.ERROR.CLIENT.REQUIREDMAILFIELD && showInfo(LNG.ERROR.CLIENT.REQUIREDMAILFIELD);
		return !1
	});
	m.find(".tab_active,.tab_inactive").click(function(a) {
		$(this).hasClass("tab_inactive") && (m.find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), $(this).trigger("tab", a), u = []);
		return !1
	});
	$("#f_sample_tab5").bind("tab", function() {
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
			key : key,
			act : "news"
		}, function(a) {
			$("#f_mail_news_title b").html(a.ret[0]);
			a = a.ret[1].replace(/\n/ig, "<br>");
			$("#f_mail_news_body").html(a);
			v()
		});
		return !1
	});
	$("#f_sample_tab1").bind("tab", function() {
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
		v();
		return !1
	});
	$("#f_sample_tab2").bind("tab", function() {
		$("#f_mail_inbox").hide();
		$("#f_mail_inbox_detail").hide();
		$("#f_mail_inbox_detail_body").hide();
		$("#f_mail_report").show();
		$("#f_mail_report_detail").hide();
		$("#f_mail_write").hide();
		$("#f_mail_inbox_delete").hide();
		$("#f_mail_report_delete").show();
		$("#f_mail_news").hide();
		o(-1);
		v();
		return !1
	});
	$("#f_sample_tab3").bind("tab", function() {
		$("#f_mail_inbox").hide();
		$("#f_mail_inbox_detail").hide();
		$("#f_mail_inbox_detail_body").hide();
		$("#f_mail_report").show();
		$("#f_mail_report_detail").hide();
		$("#f_mail_write").hide();
		$("#f_mail_inbox_delete").hide();
		$("#f_mail_report_delete").show();
		$("#f_mail_news").hide();
		o(3);
		v();
		return !1
	});
	$("#f_sample_tab4").bind("tab", function() {
		setTimeout(function() {
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
	$("#f_sample_close").click(function() {
		$("#f_sample_tab1").hasClass("tab_active") ? $("#f_mail_inbox_delete").show() : ($("#f_sample_tab2").hasClass("tab_active") || $("#f_sample_tab3").hasClass("tab_active")) && $("#f_mail_report_delete").show();
		var a = u.pop();
		a ? a() : showCity();
		return !1
	});
	$("#content").css("background-image", "url(img/bg/view.jpg)");
	(function() {
		s = new iScroll("scroller", {
			desktopCompatibility : !0
		});
		var a = Utils.getCookie("params");
		if(null != a && (Utils.delCookie("params"), "writemail" == a.tab)) {
			O(a.reciver, a.title);
			pnlLoading.hide();
			return
		}
		j()
	})()
});
defineSubView("f_main", function() {
});
defineSubView("f_map", function() {
	function v(c) {
		M.css("background-image", "");
		if(0 < c[2] && 100 >= c[2])
			D.html("[" + c[0] + "/" + c[1] + "]&nbsp;" + LNG.MONSTER), M.css("background-image", "url(" + LNG.MONSTERLEVEL[c[2]] + ")"), n.hide(), y.hide(), j.hide(), r.hide(), b.hide(), B.hide(), A.hide(), o.hide(), G.hide(), F.show(), h.find("b").text(c[3][0]), h.show(), E.hide(), H.hide();
		else if(100 < c[2] && 200 >= c[2])
			D.html("[" + c[0] + "/" + c[1] + "]&nbsp;" + a[c[2]].name), x.find("em").attr("class", a[c[2]].ico), n.hide(), y.hide(), j.hide(), r.hide(), x.find("b").text(c[3][1] + LNG.PERHOUR), "" != c[3][2] ? (l.find("b").text(Utils.timeString(c[3][3])), l.show(), ispvp ? f.hide() : f.attr("class", "race" + c[3][2][2]), N.text(null == c[3][2][1] ? "unknown" : c[3][2][1]), g.text(c[3][2][3]), 0 != c[3][2][5] ? (w.css("background-image", "url(" + Utils.getFlag(c[3][2][7]) + ")"), J.text(c[3][2][4])) : (w.css("background-image", ""), J.text("")), b.show()) : (l.hide(), b.hide()), B.show(), A.hide(), o.hide(), G.hide(), F.hide(), h.hide(), c[3][2][0] != userinfo.id ? E.show() : E.hide(), H.hide();
		else if(0 == c[2])
			D.html("[" + c[0] + "/" + c[1] + "]&nbsp;" + LNG.EMPTYLAND), n.hide(), y.hide(), j.hide(), r.hide(), b.hide(), B.hide(), A.hide(), o.hide(), G.hide(), F.hide(), h.hide(), E.hide(), H.show();
		else {
			ispvp ? (D.html("[" + c[0] + "/" + c[1] + "]"), f.hide()) : (D.html("[" + c[0] + "/" + c[1] + "]&nbsp;" + c[3][11]), f.attr("class", "race" + c[3][2]));
			N.text(null == c[3][1] ? "unknown" : c[3][1]);
			g.text(c[3][3]);
			c[3][12] && 0 < c[3][12][0] ? (n.show(), y.hide(), j.hide(), r.text(c[3][12][2]), r.show()) : 0 != (c[3][9] & 4) ? (n.hide(), j.hide(), y.show(), r.text(Utils.timeString(c[3][13])), r.show()) : (y.hide(), n.hide(), "undefined" == typeof c[3][14] ? (j.hide(), r.hide()) : (j.show(), 0 < c[3][15] ? r.text(c[3][14] + " [" + Utils.timeString(c[3][15]) + "]") : r.text(c[3][14]), r.show()));
			0 != c[3][5] ? (w.css("background-image", "url(" + Utils.getFlag(c[3][7]) + ")"), J.text(c[3][4])) : (w.css("background-image", ""), J.text(""));
			0 < c[3][8] || 0 != (c[3][9] & 2) ? (A.attr("src", "img/item/0.png"), A.show()) : 0 != (c[3][9] & 1) ? (A.attr("src", "img/item/80.png"), A.show()) : A.hide();
			b.show();
			B.hide();
			if(c[3][0] == userinfo.id) {
				var d = mainStatus.getCity();
				c[0] != d.x || c[1] != d.y ? o.show() : o.hide();
				G.hide()
			} else
				o.hide(), 0 != c[3][5] && c[3][5] == userinfo.guildid ? (I.show(), O.hide()) : (I.hide(), O.show()), G.show();
			F.hide();
			h.hide();
			E.hide();
			H.hide()
		}
	}

	function s() {
		if(null != d && null != d.map) {
			K.html("");
			for(var b = 0; b < z; b++)
				for(var e = 0; e < c; e++)
					if(0 < d.map[e+b*c][2] && 100 >= d.map[e+b*c][2])
						K.append('<div class="mapmonster" style="left: ' + e * p + "px; top: " + b * C + "px;background-image:url(" + LNG.MONSTERIMG[d.map[e+b*c][2]] + ');"></div>');
					else if(100 < d.map[e+b*c][2] && 200 >= d.map[e+
						b*c][2])
						K.append('<div class="' + a[d.map[e+b*c][2]].cls + '" style="left: ' + e * p + "px; top: " + b * C + 'px;"></div>');
					else if(0 > d.map[e+b*c][2]) {
						var f = d.map[e + b * c], g = "mapcastle";
						f[3][0] == userinfo.id && ( g = "mycastle");
						K.append('<div class="' + g + '" style="left: ' + e * p + "px; top: " + b * C + 'px;"></div>');
						0 != f[3][5] && K.append('<img src="' + Utils.getFlag(f[3][7]) + '" style="position:absolute; left: ' + e * p + "px; top: " + (b * C + 15) + 'px;">')
					}
			k = Math.floor(c / 2);
			t = Math.floor(z / 2);
			L.css("left", k * p).css("top", t * C);
			b = d.map[k + t * c];
			v(b);
			Utils.setCookie("lastmappos", {
				x : b[0],
				y : b[1]
			}, 1)
		}
	}

	function u(a, b) {
		pnlLoading.show();
		null != d && (a == d.xleft && b == d.yleft ? S.show() : a == d.xright && b == d.yright ? Q.show() : a == d.xup && b == d.yup ? P.show() : a == d.xdown && b == d.ydown && T.show());
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MAP, {
			key : key,
			x : a,
			y : b
		}, function(a) {
			d = a.ret;
			s();
			S.hide();
			Q.hide();
			P.hide();
			T.hide()
		})
	}

	function q(a) {
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MAP, {
			key : key,
			nick : a
		}, function(a) {
			d = a.ret;
			s();
			$("#f_map_movenick").val("")
		})
	}

	function m(a, b) {
		k = a;
		t = b;
		L.css("left", k * p).css("top", t * C);
		v(d.map[k + t * c]);
		return !1
	}

	var i = $("#f_sample_html_script"), e = $(i.parent().get(0)), a = LNG.RESOURCE_STYLE;
	e.bind("dispose", function() {
		Utils.removeCss("f_map_css");
		e = null
	});
	var k = 0, t = 0, c = 7, z = 7, p = 35, C = 35, d = null, D = $("#f_map_selected strong"), r = $("#f_map_selected b"), n = $("#f_map_selected_province"), y = $("#f_map_selected_sleep"), j = $("#f_map_selected_hp"), b = $("#f_map_lordinfo"), h = $("#f_map_npcinfo"), A = $("#f_map_protected"), B = $("#f_map_resinfo"), x = $("#res_produce"), l = $("#res_end"), E = $("#f_map_menu_res"), o = $("#f_map_menu_my"), G = $("#f_map_menu_player"), F = $("#f_map_menu_npc"), H = $("#f_map_menu_empty"), I = $("#f_map_transp_player"), O = $("#f_map_loot_player"), f = $("#select_race em"), N = $("#select_race b"), g = $("#select_level b"), w = $("#select_guild em"), J = $("#select_guild b"), K = $("#f_map_mapview"), L = $("#f_map_aiming"), M = $("#f_map_stars"), S = $("#f_map_left"), Q = $("#f_map_right"), P = $("#f_map_up"), T = $("#f_map_down");
	b.hide();
	o.hide();
	G.hide();
	F.hide();
	h.hide();
	H.hide();
	$("#f_map_mapclick").offset();
	window.isIphone || $("#f_map_mapclick>div").each(function(a, b) {
		$(b).find(">div").each(function(b, c) {
			$(c).touch(function() {
				m(b, a)
			})
		})
	});
	if(window.isIphone || window.isAndroid) {
		var V, U, W, X, i = document.getElementById("f_map_mapclick"), Z = function(a, b) {
			b = b || {
				x : 0,
				y : 0
			};
			b.x += a.offsetLeft;
			b.y += a.offsetTop;
			null != a.offsetParent && arguments.callee(a.offsetParent, b);
			return b
		}(i);
		i.addEventListener("touchstart", function(a) {
			a.preventDefault();
			W = V = a.changedTouches[0].pageX;
			X = U = a.changedTouches[0].pageY
		}, !1);
		i.addEventListener("touchmove", function(a) {
			a.preventDefault();
			W = a.changedTouches[0].pageX;
			X = a.changedTouches[0].pageY
		}, !1);
		i.addEventListener("touchend", function(a) {
			a.preventDefault();
			var a = W - V, b = X - U;
			5 >= Math.abs(a) && 5 >= Math.abs(b) ? m(Math.floor((W - Z.x) / 35), Math.floor((X - Z.y) / 35)) : (Math.abs(a), Math.abs(b), Math.abs(a) > Math.abs(b) ? 0 < a ? u(d.xleft, d.yleft) : u(d.xright, d.yright) : 0 < b ? u(d.xup, d.yup) : u(d.xdown, d.ydown))
		}, !1)
	}
	$("#f_map_close").click(function() {
		showCity();
		return !1
	});
	$("#f_map_home").click(function() {
		null != userinfo && "undefined" != typeof userinfo.city && null != userinfo.city && 0 < userinfo.city.length && u(userinfo.city[mainStatus.CITY].x, userinfo.city[mainStatus.CITY].y);
		return !1
	});
	$("#f_map_move_left").click(function() {
		u(d.xleft, d.yleft);
		return !1
	});
	$("#f_map_move_right").click(function() {
		u(d.xright, d.yright);
		return !1
	});
	$("#f_map_move_up").click(function() {
		u(d.xup, d.yup);
		return !1
	});
	$("#f_map_move_down").click(function() {
		u(d.xdown, d.ydown);
		return !1
	});
	$("#f_map_search").click(function() {
		var a = $("#f_map_movenick").val();
		if(null != a && "" != a)
			$("#f_map_movex").val(""), $("#f_map_movey").val(""), q(a);
		else {
			var a = parseInt($("#f_map_movex").val()), b = parseInt($("#f_map_movey").val());
			u(a, b)
		}
		return !1
	});
	$("#f_map_fav").click(function() {
		var a = d.map[k + t * c];
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
			key : key,
			nick : a[3][1]
		}, function(a) {
			showInfo(translate(LNG.ADDFAVDONE, a.ret.friend.nick))
		});
		return !1
	});
	$("#f_map_detail").click(function() {
		var a = d.map[k + t * c];
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETOTHERINFO, {
			key : key,
			id : a[3][0]
		}, function(a) {
			showUserInfo(a.ret.user)
		});
		return !1
	});
	$("#f_map_scout_res").click(function() {
		var a = d.map[k + t * c];
		Utils.setCookie("warinfo", {
			type : 3,
			x : a[0],
			y : a[1]
		}, 1);
		main_loadDiv("f_city_military.html");
		return !1
	});
	$("#f_map_attack_res").click(function() {
		var a = d.map[k + t * c];
		Utils.setCookie("warinfo", {
			type : 8,
			x : a[0],
			y : a[1],
			force : CONFIG.RESFORCE[a[2]]
		}, 1);
		main_loadDiv("f_city_military.html");
		return !1
	});
	$("#f_map_scout_npc").click(function() {
		var a = d.map[k + t * c];
		Utils.setCookie("warinfo", {
			type : 3,
			x : a[0],
			y : a[1]
		}, 1);
		main_loadDiv("f_city_military.html");
		return !1
	});
	$("#f_map_attack_npc").click(function() {
		var a = d.map[k + t * c];
		Utils.setCookie("warinfo", {
			type : 7,
			x : a[0],
			y : a[1],
			force : CONFIG.MONSTERFORCE[a[2]]
		}, 1);
		main_loadDiv("f_city_military.html");
		return !1
	});
	$("#f_map_transport").click(function() {
		var a = d.map[k + t * c];
		Utils.setCookie("warinfo", {
			type : 2,
			x : a[0],
			y : a[1],
			cityid : a[3].cityid
		}, 1);
		main_loadDiv("f_city_military.html");
		return !1
	});
	$("#f_map_scout_player").click(function() {
		var a = d.map[k + t * c];
		Utils.setCookie("warinfo", {
			type : 3,
			x : a[0],
			y : a[1]
		}, 1);
		main_loadDiv("f_city_military.html");
		return !1
	});
	$("#f_map_loot_player").click(function() {
		var a = d.map[k + t * c];
		Utils.setCookie("warinfo", {
			type : 0,
			x : a[0],
			y : a[1]
		}, 1);
		main_loadDiv("f_city_military.html");
		return !1
	});
	$("#f_map_transp_player").click(function() {
		var a = d.map[k + t * c];
		Utils.setCookie("warinfo", {
			type : 2,
			x : a[0],
			y : a[1]
		}, 1);
		main_loadDiv("f_city_military.html");
		return !1
	});
	$("#f_map_build").click(function() {
		var a = d.map[k + t * c];
		Utils.setCookie("warinfo", {
			type : 5,
			x : a[0],
			y : a[1]
		}, 1);
		main_loadDiv("f_city_military.html");
		return !1
	});
	$("#f_map_mail").click(function() {
		GlobalNav.WriteMail(d.map[k+t*c][3][1]);
		return !1
	});
	$("#content").css("background-image", "url(img/bg/view.jpg)");
	(function() {
		window.isIphone && (Utils.replaceInput(document.getElementById("f_map_movex"), "number"), Utils.replaceInput(document.getElementById("f_map_movey"), "number"));
		var a = Utils.getCookie("params");
		null != a ? (Utils.delCookie("params"), u(a.x, a.y)) : ( a = Utils.getCookie("lastmappos"), null != a ? u(a.x, a.y) : null != userinfo && "undefined" != typeof userinfo.city && null != userinfo.city && 0 < userinfo.city.length && u(userinfo.city[mainStatus.CITY].x, userinfo.city[mainStatus.CITY].y))
	})()
});
defineSubView("f_quest", function() {
	function v(a, b) {
		return 0 == a ? LNG.QUEST_STATUS[0] : 1 == b ? LNG.QUEST_STATUS[1] : LNG.QUEST_STATUS[2]
	}

	function s() {
		r = !0;
		var a = $("#scroller");
		a.empty().unbind();
		$.each(quests, function(b, c) {
			var d = n[c.id];
			null != d && "undefined" != typeof d && ( d = (0 == b ? "" : '<div style="height:10px;" class="seperator"></div>') + ('<p id="f_quest_quest' + c.id + '"><b>' + d.name + "</b><br><strong>" + v(c.status, c.done) + "</strong></p>"), a.append(d), a.find("#f_quest_quest" + c.id).click(function() {
				u(b);
				return !1
			}))
		});
		u(0);
		q()
	}

	function u(a) {
		r = !0;
		z = new iScroll("scroller2", {
			desktopCompatibility : !0
		});
		if(null != quests && quests.length > a) {
			d = a;
			a = quests[a];
			$("#scroller p").removeClass("checking");
			$("#f_quest_quest" + a.id).addClass("checking");
			0 == a.status ? ($("#f_quest_accept").show(), $("#f_quest_accept").html(LNG.QUESTACCEPT)) : 0 == a.done ? $("#f_quest_accept").hide() : ($("#f_quest_accept").show(), $("#f_quest_accept").html(LNG.QUESTSUBMIT));
			var b = n[a.id];
			"undefined" != typeof b && null != b ? ($("#f_quest_selected_title b").html(b.name + "&nbsp;<font color=white>" + v(a.status, a.done) + "</font>"), $("#f_quest_selected_desc").html(b.desc), $("#f_quest_selected_req").html(b.req), $("#f_quest_selected_reward_food b").text(b.f), $("#f_quest_selected_reward_wood b").text(b.w), $("#f_quest_selected_reward_iron b").text(b.i), $("#f_quest_selected_reward_gold b").text(b.g), "" != b.bonus && null != b.bonus ? ($("#f_quest_selected_bonus").html(b.bonus), $("#f_quest_selected_bonus").show()) : $("#f_quest_selected_bonus").hide(), 46 == a.id ? ($("#f_quest_verify_email").show(), 0 == a.done && 0 != a.status ? $("#f_quest_set_email").show() : $("#f_quest_set_email").hide(), $("#f_quest_name").hide(), $("#f_quest_set_name").hide()) : 59 == a.id ? ($("#f_quest_verify_email").hide(), $("#f_quest_set_email").hide(), $("#f_quest_name").show(), 0 == a.done && 0 != a.status ? ($("#f_quest_name_nick").val(""), $("#f_quest_name_castle").val(""), $("#f_quest_set_name").show()) : ($("#f_quest_name_nick").val(userinfo.nick), $("#f_quest_name_castle").val(mainStatus.getCity().name), $("#f_quest_set_name").hide())) : ($("#f_quest_verify_email").hide(), $("#f_quest_set_email").hide(), $("#f_quest_name").hide(), $("#f_quest_set_name").hide())) : ($("#f_quest_accept").hide(), $("#f_quest_selected_title b").html(""), $("#f_quest_selected_desc").html(""), $("#f_quest_selected_req").html(""), $("#f_quest_selected_reward_food b").text("0"), $("#f_quest_selected_reward_wood b").text("0"), $("#f_quest_selected_reward_iron b").text("0"), $("#f_quest_selected_reward_gold b").text("0"), $("#f_quest_selected_bonus").hide())
		} else
			$("#f_quest_accept").hide(), $("#f_quest_selected_title b").html(""), $("#f_quest_selected_desc").html(""), $("#f_quest_selected_req").html(""), $("#f_quest_selected_reward_food b").text("0"), $("#f_quest_selected_reward_wood b").text("0"), $("#f_quest_selected_reward_iron b").text("0"), $("#f_quest_selected_reward_gold b").text("0"), $("#f_quest_selected_bonus").html("")
	}

	function q() {
		var a = $("#scroller");
		$.each(D, function(b, c) {
			var d = y[c.mid];
			d || ( d = y.sample);
			d = '<div style="height:10px;" class="seperator"></div>' + ('<p id="f_quest_mission' + b + '"><b>' + LNG.MISSION_LANGUAGE.DAILY + d.name + "</b><br>");
			d += "<strong>" + m(c.status) + "</strong></p>";
			a.append(d);
			a.find("#f_quest_mission" + b).bind("click", function() {
				i(b);
				return !1
			})
		});
		a.append("<p>&nbsp;</p><p>&nbsp;</p>")
	}

	function m(a) {
		switch(parseInt(a)) {
			case 1:
				return LNG.QUEST_STATUS[0];
			case 2:
				return LNG.QUEST_STATUS[2];
			case 3:
				return LNG.QUEST_STATUS[1];
			case 4:
				return LNG.QUEST_STATUS[3];
			default:
				return "UNKNOWN"
		}
	}

	function i(a) {
		r = !1;
		var b = D[a], c = y[b.mid];
		c || ( c = y.sample);
		var e = $("#scroller");
		d = a;
		e.find("p").removeClass("checking");
		e.find("#f_quest_mission" + a).addClass("checking").find("strong").html(m(b.status));
		$("#f_quest_selected_title b").html(c.name + "&nbsp;<font color=white>" + m(b.status) + "</font>");
		$("#f_quest_selected_desc").html(c.description);
		$("#f_quest_selected_req").html(LNG.MISSION_LANGUAGE.DONE.format(b.done, c.totaltimes));
		$("#f_quest_verify_email").hide();
		$("#f_quest_set_email").hide();
		$("#f_quest_name").hide();
		$("#f_quest_set_name").hide();
		$("#f_quest_selected_reward_food b").text(b.f);
		$("#f_quest_selected_reward_wood b").text(b.w);
		$("#f_quest_selected_reward_iron b").text(b.i);
		$("#f_quest_selected_reward_gold b").text(b.g);
		1 == b.status ? $("#f_quest_accept").html(LNG.QUESTACCEPT).show() : 3 == b.status ? $("#f_quest_accept").html(LNG.QUESTSUBMIT).show() : $("#f_quest_accept").hide();
		b.bonus ? ($("#f_quest_selected_bonus").html(b.bonus), $("#f_quest_selected_bonus").show()) : $("#f_quest_selected_bonus").hide()
	}

	function e(a) {
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MISSION, {
			key : key,
			action : "accept",
			id : a.id
		}, function() {
			D[d].status = 2;
			i(d)
		})
	}

	function a(a) {
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MISSION, {
			key : key,
			action : "reward",
			id : a.id
		}, function() {
			D[d].status = 4;
			var a = !0, c;
			for(c in userinfo.city)
			if(mainStatus.CITY_ID > userinfo.city[c].id) {
				a = !1;
				break
			}
			a && (mainStatus.CITY_INFO[4] += D[d].f, mainStatus.CITY_INFO[6] += D[d].w, mainStatus.CITY_INFO[8] += D[d].i, mainStatus.CITY_INFO[2] += D[d].g);
			i(d);
			CheckGuideDisplay(null) || showInfo(LNG.QUESTSUBMITED)
		})
	}

	function k(a) {
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_TASK, {
			key : key,
			action : "task_up",
			id : a.id
		}, function(b) {
			a.status = 1;
			if(2 == b.ret.status)
				a.done = 1, quests[d] = a;
			b = n[a.id];
			$("#f_quest_selected_title b").html(b.name + "&nbsp;" + v(a.status, a.done));
			$("#f_quest_quest" + a.id).html("<b>" + b.name + "</b><br><strong>" + v(a.status, a.done) + "</strong>");
			0 == a.done ? $("#f_quest_accept").hide() : 1 == a.done && ($("#f_quest_accept").html(LNG.QUESTACCEPT).show(), $("#f_quest_accept").html(LNG.QUESTSUBMIT));
			CheckGuideDisplay(a.id);
			46 == a.id ? $("#f_quest_set_email").show() : 59 == a.id && $("#f_quest_set_name").show()
		})
	}

	function t(a) {
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_TASK, {
			key : key,
			action : "task_end",
			id : a.id
		}, function(b) {
			var e = n[a.id], i = !0, k;
			for(k in userinfo.city)
			if(mainStatus.CITY_ID > userinfo.city[k].id) {
				i = !1;
				break
			}
			i && (mainStatus.CITY_INFO[4] += e.f, mainStatus.CITY_INFO[6] += e.w, mainStatus.CITY_INFO[8] += e.i, mainStatus.CITY_INFO[2] += e.g);
			quests.splice(d, 1);
			null != b.ret && null != b.ret.quest && 0 < b.ret.quest.length && ( quests = quests.concat(b.ret.quest), quests.sort(function(a, b) {
				return a.id - b.id
			}));
			s();
			u(0);
			null != c && (c.refresh(), c.setPosition(0, 0));
			CheckGuideDisplay(null) || showInfo(LNG.QUESTSUBMITED)
		})
	}

	var c = null, z = null, p = $("#f_sample_html_script"), C = $(p.parent().get(0));
	C.bind("dispose", function() {
		null != c && (c.destroy(!1), z.destroy(!1), z = c = null);
		C = null
	});
	var d = 0, D, r = !0, n = null, y = null;
	C.find(".tab_active,.tab_inactive").click(function(a) {
		$(this).hasClass("tab_inactive") && (C.find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), $(this).trigger("tab", a));
		return !1
	});
	$("#f_sample_sub_tab1").bind("tab", function() {
		return !1
	});
	$("#f_sample_sub_tab2").bind("tab", function() {
		return !1
	});
	$("#f_sample_close").click(function() {
		showCity();
		return !1
	});
	$("#f_quest_accept").click(function() {
		if(r) {
			if(null != quests && quests.length > d) {
				var c = quests[d];
				if(0 == c.status)
					k(c);
				else if(1 == c.done) {
					var b = n[c.id];
					"undefined" != typeof b.note && null != b.note && "" != b.note ? showConfirm(b.note, function() {
						t(c)
					}) : t(c)
				}
			}
		} else {
			b = D[d];
			if(!b)
				return !1;
			1 == b.status ? e(b) : 2 != b.status && 3 == b.status && a(b)
		}
		return !1
	});
	$("#f_quest_set_name").click(function() {
		var a = Utils.trim($("#f_quest_name_nick").val()), b = Utils.trim($("#f_quest_name_castle").val());
		if(null == a || "" == a)
			return showInfo(LNG.ERROR.CLIENT.EMPTYLORDNAME), !1;
		if(null == b || "" == b)
			return showInfo(LNG.ERROR.CLIENT.EMPTYCASTLENAME), !1;
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_TASK, {
			action : "setname",
			nick : encodeURIComponent(a),
			castle : encodeURIComponent(b),
			key : key
		}, function() {
			quests[d].done = 1;
			$("#f_quest_accept").html(LNG.QUESTSUBMIT);
			$("#f_quest_accept").show();
			showInfo(LNG.SUCCESS)
		});
		return !1
	});
	$("#f_quest_set_email").click(function() {
		var a = Utils.trim($("#f_quest_input_email").val());
		null != a && "" != a && 0 < a.indexOf("@") && (pnlLoading.show(), ajaxCall(CONFIG.MASTERHOST + CONFIG.MASTER_QUERY, {
			action : "email",
			user : keyinfo.user,
			email : a
		}, function() {
			showInfo(LNG.VERIFICATIONMAIL)
		}));
		return !1
	});
	$("#content").css("background-image", "url(img/bg/view.jpg)");
	(function() {
		pnlLoading.show();
		window.isIphone && Utils.replaceInput(document.getElementById("f_quest_input_email"), "email");
		n = mainStatus.QUEST_DATA;
		y = mainStatus.MISSION_DATA;
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_TASK, {
			key : key,
			action : "task_list"
		}, function(a) {
			quests = a.ret.quest;
			quests.sort(function(a, c) {
				return a.id - c.id
			});
			quests || ( quests = []);
			c = new iScroll("scroller", {
				desktopCompatibility : !0
			});
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MISSION, {
				key : key,
				action : "list"
			}, function(a) {
				D = a.ret;
				pnlLoading.hide();
				s();
				null == guideList && CheckGuideDisplay(null)
			})
		})
	})()
});
defineSubView("f_rank", function() {
	function v() {
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, {
			key : key,
			action : "worlds"
		}, function(a) {
			$.each(a.ret.worlds, function(a, b) {
				var c = a + 1;
				4 < c || ($("#f_world" + c).text(b.name), $("#f_world" + c + "_num").text(b.num))
			});
			$("#f_mail_page").hide();
			s(0, 0)
		}, function() {
		})
	}

	function s(a, b) {
		null != m && (m.refresh(), m.setPosition(a || 0, b || 0));
		return !1
	}

	function u(a) {
		var a = a || 1, b = t.find("#f_rank_ap");
		b.empty();
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_WAR_AP, {
			key : key,
			page : a
		}, function(c) {
			var d = c.ret.list, c = c.ret.max;
			pnlLoading.show();
			x(a, c, function(a) {
				u(a)
			});
			null != d && $.each(d, function(c, d) {
				var e = z.clone().show();
				q(e, d, 20 * (a - 1) + c + 1);
				b.append(e)
			});
			s(0, 0);
			pnlLoading.hide()
		}, function() {
		})
	}

	function q(a, b, c) {
		a.find("#rank").text(c);
		a.find("#ranksnick b").text(b.nickname);
		a.find("#ranksnick em").addClass("race" + b.nation);
		a.find("#rankslevel b").text(b.grade);
		a.find("#rankscapture b").text(b.attack);
		a.find("#rankscaptured b").text(b.defence);
		a.find("#f_ranks_more").click(function() {
			e.find("#f_ranks_ops").hide();
			e.find("#f_ranks_more.minusbutton").not(this).removeClass("minusbutton").addClass("plusbutton");
			a.find("#f_ranks_more").hasClass("plusbutton") ? (a.find("#f_ranks_ops").show(), a.find("#f_ranks_more").removeClass("plusbutton").addClass("minusbutton")) : a.find("#f_ranks_more").removeClass("minusbutton").addClass("plusbutton");
			return !1
		});
		a.find("#f_ranks_sendmail").click(function() {
			GlobalNav.WriteMail(b.nickname);
			return !1
		});
		a.find("#f_ranks_addfav").click(function() {
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
				key : key,
				nick : b.nickname
			}, function(a) {
				showInfo(translate(LNG.ADDFAVDONE, a.ret.friend.nick))
			});
			return !1
		});
		a.find("#f_ranks_viewinfo").click(function() {
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETOTHERINFO, {
				key : key,
				id : b.u_id
			}, function(a) {
				showUserInfo(a.ret.user)
			});
			return !1
		})
	}

	var m = null, i = $("#f_city_center_html_script"), e = $(i.parent().get(0));
	e.bind("dispose", function() {
		null != m && (m.destroy(!1), m = null);
		e = null
	});
	var a = function(a, b, c) {
		a.find("#rank").text(c);
		a.find("#ranksnick b").text(b.nick);
		a.find("#ranksnick em").addClass("race" + b.nationid);
		a.find("#rankslevel b").text(b.level);
		"undefined" != typeof b.pvp ? (a.find("#rankspvp b").text(b.pvp), a.find("#rankspvp").show()) : a.find("#rankspvp").hide();
		0 < b.guildid && (a.find("#ranksguild b").text(b.guild), a.find("#ranksguild em").css("background-image", "url(" + Utils.getFlag(b.gflag) + ")"));
		a.find("#f_ranks_more").click(function() {
			e.find("#f_ranks_ops").hide();
			e.find("#f_ranks_more.minusbutton").not(this).removeClass("minusbutton").addClass("plusbutton");
			a.find("#f_ranks_more").hasClass("plusbutton") ? (a.find("#f_ranks_ops").show(), a.find("#f_ranks_more").removeClass("plusbutton").addClass("minusbutton")) : a.find("#f_ranks_more").removeClass("minusbutton").addClass("plusbutton");
			return !1
		});
		a.find("#f_ranks_sendmail").click(function() {
			GlobalNav.WriteMail(b.nick);
			return !1
		});
		a.find("#f_ranks_addfav").click(function() {
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
				key : key,
				nick : b.nick
			}, function(a) {
				showInfo(translate(LNG.ADDFAVDONE, a.ret.friend.nick))
			});
			return !1
		});
		a.find("#f_ranks_viewinfo").click(function() {
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETOTHERINFO, {
				key : key,
				id : b.id
			}, function(a) {
				showUserInfo(a.ret.user)
			});
			return !1
		})
	}, k = e.find("#f_content1"), t = e.find("#f_content5"), c = k.find('div[name="template"]:first'), z = t.find('div[name="template"]:first');
	c.remove();
	var p = function(b) {
		var b = b || 1, d = k.find("#f_ranks");
		d.empty();
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SCORE_RANK, {
			key : key,
			page : b
		}, function(e) {
			pnlLoading.show();
			x(b, e.ret.max, function(a) {
				p(a)
			});
			null != e.ret.user && $.each(e.ret.user, function(e, h) {
				var i = c.clone().show();
				a(i, h, 20 * (b - 1) + e + 1);
				d.append(i)
			});
			s(0, 0);
			pnlLoading.hide()
		}, function() {
		})
	};
	p();
	var C = function(a, b, c) {
		a.find("#rank").text(c);
		c = mainStatus.HERO_DATA[b.gid];
		a.find("#genimg img").attr("src", Utils.getHeroImage(b.gid));
		a.find("#genname b").text(c.name);
		a.find("#gengrade b").text(b.gg);
		a.find("#genpower b").text(b.gp);
		a.find("#gencommend b").text(b.gce);
		a.find("#genintellect b").text(b.gi);
		a.find("#gencommand b").text(b.gca);
		a.find("#ranksnick b").text(b.nick);
		a.find("#f_ranks_more").click(function() {
			e.find("#f_ranks_ops").hide();
			e.find("#f_ranks_more.minusbutton").not(this).removeClass("minusbutton").addClass("plusbutton");
			a.find("#f_ranks_more").hasClass("plusbutton") ? (a.find("#f_ranks_ops").show(), a.find("#f_ranks_more").removeClass("plusbutton").addClass("minusbutton")) : a.find("#f_ranks_more").removeClass("minusbutton").addClass("plusbutton");
			return !1
		});
		a.find("#f_ranks_sendmail").click(function() {
			GlobalNav.WriteMail(b.nick);
			return !1
		});
		a.find("#f_ranks_addfav").click(function() {
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
				key : key,
				nick : b.nick
			}, function(a) {
				showInfo(translate(LNG.ADDFAVDONE, a.ret.friend.nick))
			});
			return !1
		});
		a.find("#f_ranks_viewinfo").click(function() {
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETOTHERINFO, {
				key : key,
				id : b.id
			}, function(a) {
				showUserInfo(a.ret.user)
			});
			return !1
		})
	}, d = e.find("#f_content2"), D = d.find('div[name="template"]:first'), r = null, n = function(a, b) {
		var b = ( r = b) || "power", a = a || 1, c = d.find("#f_genranks");
		c.empty();
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SCORE_RANK, {
			key : key,
			page : a,
			type : "gen",
			subtype : b
		}, function(d) {
			pnlLoading.show();
			x(a, d.ret.max, function(a) {
				n(a, b)
			});
			null != d.ret.gens && $.each(d.ret.gens, function(b, d) {
				var e = D.clone().show();
				C(e, d, 20 * (a - 1) + b + 1);
				c.append(e)
			});
			s(0, 0);
			pnlLoading.hide()
		}, function() {
		})
	}, y = e.find("#f_content4"), j = y.find('div[name="template"]:first');
	j.remove();
	var b = function() {
		var a = y.find("#f_ranks");
		a.empty();
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SCORE_RANK, {
			key : key,
			page : 1,
			ext : "honor"
		}, function(b) {
			pnlLoading.show();
			null != b.ret.user && $.each(b.ret.user, function(b, c) {
				var d = j.clone().show();
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
		}, function() {
		})
	}, h = e.find("#f_mail_page"), A = h.find("#f_mail_page_pre"), B = h.find("#f_mail_page_next"), x = function(a, b, c) {
		h.find("#f_mail_page_current").text(a + "/" + b);
		A.unbind();
		B.unbind();
		1 >= b ? h.hide() : (h.show(), 1 < a ? (A.show(), A.click(function() {
			A.unbind();
			B.unbind();
			c(a - 1);
			return !1
		})) : A.hide(), a < b ? (B.show(), B.click(function() {
			A.unbind();
			B.unbind();
			c(a + 1);
			return !1
		})) : B.hide())
	};
	e.find("#f_tab1,#f_tab2,#f_tab3,#f_tab4,#f_tab5").click(function(a) {
		$(this).hasClass("tab_inactive") && (e.find("#f_tab1,#f_tab2,#f_tab3,#f_tab4,#f_tab5").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), $(this).trigger("tab", a), s());
		return !1
	});
	e.find("#f_hero_tab2,#f_hero_tab3,#f_hero_tab4,#f_hero_tab5,#f_hero_tab6").click(function(a) {
		$(this).hasClass("tab_inactive") && (e.find("#f_hero_tab2,#f_hero_tab3,#f_hero_tab4,#f_hero_tab5,#f_hero_tab6").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), $(this).trigger("tab", a), s());
		return !1
	});
	e.find("#f_tab1").bind("tab", function() {
		e.find("#f_content2").hide();
		e.find("#f_content3").hide();
		e.find("#f_content1").show();
		e.find("#f_content4").hide();
		e.find("#f_content5").hide();
		p();
		return !1
	});
	e.find("#f_tab2").bind("tab", function() {
		e.find("#f_content1").hide();
		e.find("#f_content3").hide();
		e.find("#f_content2").show();
		e.find("#f_content4").hide();
		e.find("#f_content5").hide();
		null == r ? n(0, "grade") : n(0, r);
		return !1
	});
	e.find("#f_tab3").bind("tab", function() {
		e.find("#f_content2").hide();
		e.find("#f_content1").hide();
		e.find("#f_content3").show();
		e.find("#f_content4").hide();
		e.find("#f_content5").hide();
		v();
		return !1
	});
	e.find("#f_tab4").bind("tab", function() {
		e.find("#f_content2").hide();
		e.find("#f_content1").hide();
		e.find("#f_content3").hide();
		e.find("#f_content5").hide();
		e.find("#f_content4").show();
		b();
		return !1
	});
	e.find("#f_tab5").bind("tab", function() {
		e.find("#f_content2").hide();
		e.find("#f_content1").hide();
		e.find("#f_content3").hide();
		e.find("#f_content4").hide();
		e.find("#f_content5").show();
		u();
		return !1
	});
	e.find("#f_hero_tab2").bind("tab", function() {
		n(0, "grade");
		return !1
	});
	e.find("#f_hero_tab3").bind("tab", function() {
		n(0, "power");
		return !1
	});
	e.find("#f_hero_tab4").bind("tab", function() {
		n(0, "commend");
		return !1
	});
	e.find("#f_hero_tab5").bind("tab", function() {
		n(0, "intellect");
		return !1
	});
	e.find("#f_hero_tab6").bind("tab", function() {
		n(0, "command");
		return !1
	});
	e.find("#f_close").click(function() {
		showCity();
		return !1
	});
	e.css("background-image", "url(img/bg/view.jpg)");
	ispvp ? ($("#f_tab3").show(), $("#f_tab4").show()) : ($("#f_tab3").hide(), $("#f_tab4").hide());
	m = new iScroll("scroller", {
		desktopCompatibility : !0
	})
});
defineSubView("f_sample", function() {
	var v = $("#f_sample_html_script"), s = $(v.parent().get(0));
	s.bind("dispose", function() {
		s = null
	});
	s.find(".tab_active,.tab_inactive").click(function(u) {
		$(this).hasClass("tab_inactive") && (s.find(".tab_active").removeClass("tab_active").addClass("tab_inactive"), $(this).removeClass("tab_inactive").addClass("tab_active"), $(this).trigger("tab", u));
		return !1
	});
	$("#f_sample_tab1").bind("tab", function() {
		$("#f_sample_tab1").hasClass("tab_inactive") && ($("#f_sample_tab1").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_tab2").removeClass("tab_active").addClass("tab_inactive"));
		return !1
	});
	$("#f_sample_tab2").bind("tab", function() {
		$("#f_sample_tab2").hasClass("tab_inactive") && ($("#f_sample_tab2").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_tab1").removeClass("tab_active").addClass("tab_inactive"));
		return !1
	});
	$("#f_sample_close").click(function() {
		showCity();
		return !1
	});
	$("#f_sample_upgrade").click(function() {
		return !1
	});
	$("#content").css("background-image", "url(img/bg/view.jpg)")
});
defineSubView("f_shop", function() {
	function v() {
		$("#f_shop_list").empty().unbind();
		null != D && $.each(D, function(a, b) {
			var c = mainStatus.ITEM_DATA[b];
			if(!("undefined" == typeof c || null == c)) {
				var d = LNG.ITEMRANK[c.rank], e = c.desc;
				if(null != n && "undefined" != typeof n[a] && null != n[a])
					for(var g = 0; g < n[a].length; g++)
						0 != n[a][g] && ( e = translate(e, n[a][g]));
				var d = '<div style="position:relative;height: 60px;"><div id="f_shop_img' + b + '" class="itemicon1" style="top: 5px; left: 5px;"></div><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px"><p><b><font color="' + d.color + '">' + c.name + '</font></b>&nbsp;<strong>(<font color="' + d.color + '">' + d.name + '</font>)</strong></p><p style="position:relative;top:6px;">' + e + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="gold"></em><b>', h = c.price;
				null != r && "undefined" != typeof r[a] && null != r[a] && ( h = r[a]);
				d = d + h + ('</b></li></ul><div id="f_shop_buy' + b + '" class="funcbutton" style="top: -3px; left: 330px;">' + LNG.PURCHASE + "</div></div></div>");
				$("#f_shop_list").append(d);
				Utils.loadImage($("#f_shop_img" + b), Utils.getItemImage(b));
				$("#f_shop_buy" + b).click(function() {
					showConfirm(translate(LNG.CONFIRMBUY, c.name, h), function() {
						pnlLoading.show();
						ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SHOP, {
							key : key,
							action : "purchase",
							type : j,
							city : mainStatus.getCity().id,
							id : b
						}, function(a) {
							mainStatus.CITY_INFO[2] = a.ret.gold;
							showInfo(LNG.SUCCESS)
						})
					});
					return !1
				})
			}
		});
		$("#f_shop_page").hide();
		null != p && (p.refresh(), p.setPosition(0, 0))
	}

	function s() {
		pnlLoading.show();
		var a = CONFIG.MYHOST + CONFIG.FUNC_SHOP, b = {
			key : key,
			action : "list_goldshopitems",
			type : j,
			city : mainStatus.getCity().id
		};
		ajaxCall(a, b, function(a) {
			D = a.ret.item;
			r = a.ret.price;
			n = a.ret.attr;
			v()
		})
	}

	function u() {
		$("#f_shop_list2").empty().unbind();
		null != h && $.each(h, function(a, b) {
			var c = b.id, d = mainStatus.ITEM_DATA[c];
			if(!("undefined" == typeof d || null == d)) {
				var e = LNG.ITEMRANK[d.rank], d = '<div style="position:relative;height: 60px;"><div id="f_shop2_img' + c + '" class="itemicon1" style="top: 5px; left: 5px;"></div><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px"><p><b><font color="' + e.color + '">' + d.name + '</font></b>&nbsp;<strong>(<font color="' + e.color + '">' + e.name + '</font>)</strong></p><p style="position:relative;top:6px;">' + d.desc + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="gem"></em><b>', d = d + b.p, d = d + ('</b></li></ul><div id="f_shop2_buy' + c + '" class="funcbutton" style="top: -3px; left: 330px;">' + LNG.PURCHASE + "</div></div></div>");
				$("#f_shop_list2").append(d);
				Utils.loadImage($("#f_shop2_img" + c), Utils.getItemImage(c));
				$("#f_shop2_buy" + c).click(function() {
					$("#f_shop_buy_panel").show();
					x = c;
					return !1
				})
			}
		});
		1 >= B ? $("#f_shop_page").hide() : ($("#f_shop_page").show(), $("#f_shop_page_num").text(A + "/" + B), 1 >= A ? $("#f_shop_page_left").hide() : $("#f_shop_page_left").show(), A >= B ? $("#f_shop_page_right").hide() : $("#f_shop_page_right").show());
		null != p && (p.refresh(), p.setPosition(0, 0))
	}

	function q() {
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SHOP2, {
			key : key,
			action : "list_baoshopitems",
			page : A,
			cat : b
		}, function(a) {
			B = a.ret.max;
			h = a.ret.item;
			u()
		})
	}

	function m() {
		var a = $("#f_shop_list2");
		a.empty().unbind();
		ispvp ? (a.append('<div style="position:relative;height: 60px;"><img src="img/item/gem.jpg" style="position:absolute;top: 5px; left: 5px;"><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px">' + LNG.PVP_TRANSFERGEM_ALERT + '<div id="f_shop_transfergem" class="funcbutton" style="top: -3px; left: 330px;">' + LNG.PVP_TRANSFERGEM + "</div></div></div>"), $("#f_shop_transfergem").click(function() {
			$("#f_gem_transfer_panel").show();
			pnlLoading.show();
			ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, {
				key : key,
				action : "getgem"
			}, function(a) {
				$("#f_gem_num b").text(a.ret.gems)
			});
			return !1
		})) : null != l && $.each(l, function(b, c) {
			if("undefined" != typeof sysshop && null != sysshop && "undefined" != typeof sysshop[c.id] && null != sysshop[c.id])
				c.price = sysshop[c.id];
			var d = '<div style="position:relative;height: 60px;"><img src="img/item/gem.jpg" style="position:absolute;top: 5px; left: 5px;"><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px"><p><b>' + c.title + '</b></p><p style="position:relative;top:6px;">' + c.info + '</p><ul class="reshead2" style="position: absolute; top: -3px; left: 170px;"><li><b>', d = d + c.price;
			"0" == c.id ? (d += '</b></li></ul><div id="f_shop_buygem' + b + '" class="funcbutton" style="top: -3px; left: 330px;">' + LNG.FREE + "</div></div></div>", a.append(d), $("#f_shop_buygem" + b).click(function() {
				window.droid && window.droid.setUser && window.droid.setUser(getUser());
				location.href = "js-call:tapjoy?";
				return !1
			})) : (d += '</b></li></ul><div id="f_shop_buygem' + b + '" class="funcbutton" style="top: -3px; left: 330px;">' + LNG.PURCHASE + "</div></div></div>", a.append(d), $("#f_shop_buygem" + b).click(function() {
				if(window.droid) {
					var a = LNG.CONFIRMBUY4;
					showPayList(translate(a, c.title, c.price), y, function(a) {
						pnlLoading.show();
						window.droid.setPayment && window.droid.setPayment(getUser(), c.sp, keyinfo.refercode, a);
						location.href = "js-call:payment?" + c.id
					})
				} else
					a = LNG.CONFIRMBUY3, showConfirm(translate(a, c.title, c.price), function() {
						pnlLoading.show();
						location.href = "js-call:payment?" + c.id
					});
				return !1
			}))
		});
		$("#f_shop_page").hide();
		null != p && (p.refresh(), p.setPosition(0, 0))
	}

	function i() {
		pnlLoading.show();
		ajaxCall(CONFIG.MASTERHOST + CONFIG.MASTER_SHOP, null, function(a) {
			l = a.ret;
			y = a.pay ? a.pay : [{
				id : "paypal",
				htm : "paypal"
			}];
			m()
		})
	}

	function e() {
		var a = $("#f_shop_list_emronor");
		a.empty().unbind();
		null != E && $.each(E, function(b, c) {
			var d = '<div style="position:relative;height: 60px;"><img src="img/item/gem.jpg" style="position:absolute;top: 5px; left: 5px;"><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px"><p><b>' + LNG.TITLE_EMRONOR_2_GEM + '</b></p><p style="position:relative;top:6px;">' + LNG.DESC_EMRONOR_2_GEM + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="pvp"></em><b>', d = d + c + ('</b></li></ul><div id="f_shop_emronor2gem' + b + '" class="funcbutton" style="top: -3px; left: 330px;">' + LNG.EMRONOR_EXCHANGE + "</div></div></div>");
			a.append(d);
			$("#f_shop_emronor2gem" + b).click(function() {
				$("#f_gem_exchange_panel").show();
				return !1
			})
		});
		$("#f_shop_page").hide();
		null != p && (p.refresh(), p.setPosition(0, 0))
	}

	function a() {
		null == E ? (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
			key : key,
			action : "emronor2gem"
		}, function(a) {
			E = a.ret.rate;
			e()
		})) : e()
	}

	function k() {
		var a = $("#f_shop_list_emronor");
		a.empty().unbind();
		a.append('<div class="iphonetitle"><div class="tab_text" style="position:relative; width:450px; text-align: center;">' + LNG.EMRORNOR_NOTICE + "</div></div>");
		null != o && $.each(o, function(b, c) {
			var d = c.id, e = mainStatus.ITEM_DATA[d];
			if(!("undefined" == typeof e || null == e)) {
				var g = LNG.ITEMRANK[e.rank], h = e.desc;
				if("undefined" != typeof c.attr && null != c.attr)
					for(var i = 0; i < c.attr.length; i++)
						0 != c.attr[i] && ( h = translate(h, c.attr[i]));
				g = '<div style="position:relative;height: 60px;"><div id="f_shop4_img' + d + '" class="itemicon1" style="top: 5px; left: 5px;"></div><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px"><p><b><font color="' + g.color + '">' + e.name + '</font></b>&nbsp;<strong>(<font color="' + g.color + '">' + g.name + '</font>)</strong></p><p style="position:relative;top:6px;">' + h + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="pvp"></em><b>';
				g += c.p;
				g += '</b></li></ul><div id="f_shop4_buy' + d + '" class="funcbutton" style="top: -3px; left: 330px;">' + LNG.EMRONOR_EXCHANGE + "</div></div></div>";
				a.append(g);
				Utils.loadImage($("#f_shop4_img" + d), Utils.getItemImage(d));
				$("#f_shop4_buy" + d).click(function() {
					showConfirm(translate(LNG.CONFIRMBUY5, e.name, c.p), function() {
						pnlLoading.show();
						ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
							key : key,
							action : "exchangeitem",
							id : d
						}, function(a) {
							userinfo.pvp = a.ret.pvp;
							refreshUserInfo();
							showInfo(LNG.SUCCESS)
						})
					});
					return !1
				})
			}
		});
		null != G && (a.append('<div class="iphonetitle"><div class="tab_text" style="position:relative; width:450px; text-align: center;"><b>' + LNG.EMRORNOR_SEASON + "</b></div></div>"), $.each(G, function(b, c) {
			var d = c.id, e = mainStatus.ITEM_DATA[d];
			if(!("undefined" == typeof e || null == e)) {
				var g = LNG.ITEMRANK[e.rank], h = e.desc;
				if("undefined" != typeof c.attr && null != c.attr)
					for(var i = 0; i < c.attr.length; i++)
						0 != c.attr[i] && ( h = translate(h, c.attr[i]));
				g = '<div style="position:relative;height: 60px;"><div id="f_shop4_img' + d + '" class="itemicon1" style="top: 5px; left: 5px;"></div><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px"><p><b><font color="' + g.color + '">' + e.name + '</font></b>&nbsp;<strong>(<font color="' + g.color + '">' + g.name + '</font>)</strong></p><p style="position:relative;top:6px;">' + h + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="pvp"></em><b>';
				g += c.p;
				g += '</b></li></ul><div id="f_shop4_buy' + d + '" class="funcbutton" style="top: -3px; left: 330px;">' + LNG.EMRONOR_EXCHANGE + "</div></div></div>";
				a.append(g);
				Utils.loadImage($("#f_shop4_img" + d), Utils.getItemImage(d));
				$("#f_shop4_buy" + d).click(function() {
					showConfirm(translate(LNG.CONFIRMBUY5, e.name, c.p), function() {
						pnlLoading.show();
						ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
							key : key,
							action : "exchangeitem",
							id : d
						}, function(a) {
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
		null != p && (p.refresh(), p.setPosition(0, 0))
	}

	function t() {
		null == o ? (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
			key : key,
			action : "emronor2item"
		}, function(a) {
			o = a.ret.item;
			G = a.ret.item2;
			k()
		})) : k()
	}

	function c() {
		var a = $("#f_shop_list_emronor");
		a.empty().unbind();
		null != F && (a.append('<div class="iphonetitle"><div class="tab_text" style="position:relative; width:450px; text-align: center;">' + LNG.EMRORNOR_NOTICE + "</div></div>"), $.each(F, function(b, c) {
			var d = c.id, e = mainStatus.HERO_DATA[d];
			if(!("undefined" == typeof e || null == e)) {
				var g = '<div style="position:relative;height: 65px;"><img id="f_shop4_img' + d + '" style="position:absolute; top: 5px; left: 5px;" src="img/hero/sample.gif"/><div class="tooltip2" style="left: 70px; top: 5px; width: 390px; height:50px"><p><b>' + e.name + '</b></p><p style="position:relative;top:5px;">' + e.desc + '</p><p style="position:relative;top:5px;">' + LNG.ATTACK + ":" + c.attr.p + "&nbsp;&nbsp;&nbsp;" + LNG.DEFENSE + ":" + c.attr.c + "&nbsp;&nbsp;&nbsp;" + LNG.WISDOM + ":" + c.attr.i + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><b>' + LNG.HERO_TOKEN + "&nbsp;</b></li><li><b>", g = g + c.p, g = g + ('</b></li></ul><div id="f_shop4_buy' + d + '" class="funcbutton" style="top: -3px; left: 320px;">' + LNG.EMRONOR_EXCHANGE + "</div></div></div>");
				a.append(g);
				Utils.loadImage2($("#f_shop4_img" + d), Utils.getHeroImage(d));
				$("#f_shop4_buy" + d).click(function() {
					showConfirm(translate(LNG.CONFIRMBUY6, e.name, c.p), function() {
						pnlLoading.show();
						ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
							key : key,
							action : "exchangehero",
							city : mainStatus.getCity().id,
							id : d
						}, function() {
							showInfo(LNG.SUCCESS)
						})
					});
					return !1
				})
			}
		}));
		$("#f_shop_page").hide();
		null != p && (p.refresh(), p.setPosition(0, 0))
	}

	function z() {
		null == F ? (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
			key : key,
			action : "emronor2hero"
		}, function(a) {
			F = a.ret.hero;
			c()
		})) : c()
	}

	var p = null, C = $("#f_sample_html_script"), d = $(C.parent().get(0));
	d.bind("dispose", function() {
		null != p && (p.destroy(!1), p = null);
		Utils.removeCss("f_shop_css");
		d = null
	});
	var D = null, r = null, n = null, y = null, j = 1, b = 5, h = null, A = 1, B = 1, x = 0;
	$("#f_shop_buy_cancel").click(function() {
		$("#f_shop_buy_panel").hide();
		return !1
	});
	$("#f_shop_buy_confirm").click(function() {
		var a = parseInt($("#f_shop_buy_num input").val());
		if(!(isNaN(a) || null == a))
			if(0 >= a)
				showInfo(LNG.ERROR.CLIENT.INVALIDINPUT);
			else
				return pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SHOP2, {
					key : key,
					action : "purchase",
					num : a,
					id : x
				}, function(a) {
					userinfo.money = a.ret.money;
					refreshUserInfo();
					$("#f_shop_buy_panel").hide();
					showInfo(LNG.SUCCESS)
				}), !1
	});
	var l = null;
	$("#f_gem_cancel").click(function() {
		$("#f_gem_transfer_panel").hide()
	});
	$("#f_gem_confirm").click(function() {
		$("#f_gem_transfer_panel").hide();
		var a = parseInt($("#f_gem_num input").val()), b = parseInt($("#f_gem_num b").text());
		0 >= a || a > b ? showInfo(LNG.ERROR.CLIENT.INVALIDINPUT) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_GETUSERINFO, {
			key : key,
			action : "transfergem",
			gems : a
		}, function(a) {
			0 >= a.ret.gems ? showInfo(LNG.ERROR.CLIENT.INVALIDINPUT) : (userinfo.money += a.ret.gems, refreshUserInfo(), showInfo(LNG.SUCCESS))
		}))
	});
	$("#f_sample_tab1").click(function() {
		$("#f_sample_tab1").hasClass("tab_inactive") && ($("#f_sample_tab1").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_shop_gold_title").show(), $("#f_shop_gem_title").hide(), $("#f_shop_list_emronor").hide(), $("#f_shop_emronor_title").hide(), $("#wrapper").css("height", "200px"), $("#f_shop_list").show(), $("#f_shop_list2").hide(), null == D ? s() : v());
		return !1
	});
	$("#f_sample_tab2").click(function() {
		$("#f_sample_tab2").hasClass("tab_inactive") && ($("#f_sample_tab2").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_shop_gold_title").hide(), $("#f_shop_gem_title").show(), $("#wrapper").css("height", "200px"), $("#f_shop_list2").show(), $("#f_shop_list").hide(), $("#f_shop_list_emronor").hide(), $("#f_shop_emronor_title").hide(), null == h ? q() : u());
		return !1
	});
	$("#f_sample_tab3").click(function() {
		$("#f_sample_tab3").hasClass("tab_inactive") && ($("#f_sample_tab3").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_shop_gold_title").hide(), $("#f_shop_gem_title").hide(), $("#f_shop_emronor_title").hide(), $("#wrapper").css("height", "230px"), $("#f_shop_list2").show(), $("#f_shop_list").hide(), $("#f_shop_list_emronor").hide(), null == l && !ispvp ? i() : m());
		return !1
	});
	$("#f_sample_tab4").click(function() {
		$("#f_sample_tab4").hasClass("tab_inactive") && ($("#f_sample_tab4").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_shop_gold_title").hide(), $("#f_shop_gem_title").hide(), $("#f_shop_emronor_title").show(), $("#wrapper").css("height", "230px"), $("#f_shop_list_emronor").show(), $("#f_shop_list2").hide(), $("#f_shop_list").hide(), null == E && null == o && null == F && a());
		return !1
	});
	$("#f_sample_sub_tab1").click(function() {
		$("#f_sample_sub_tab1").hasClass("tab_inactive") && ($("#f_sample_sub_tab1").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab5").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab6").removeClass("tab_active").addClass("tab_inactive"), j = 1, s());
		return !1
	});
	$("#f_sample_sub_tab2").click(function() {
		$("#f_sample_sub_tab2").hasClass("tab_inactive") && ($("#f_sample_sub_tab2").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab5").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab6").removeClass("tab_active").addClass("tab_inactive"), j = 2, s());
		return !1
	});
	$("#f_sample_sub_tab3").click(function() {
		$("#f_sample_sub_tab3").hasClass("tab_inactive") && ($("#f_sample_sub_tab3").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab5").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab6").removeClass("tab_active").addClass("tab_inactive"), j = 5, s());
		return !1
	});
	$("#f_sample_sub_tab4").click(function() {
		$("#f_sample_sub_tab4").hasClass("tab_inactive") && ($("#f_sample_sub_tab4").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab5").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab6").removeClass("tab_active").addClass("tab_inactive"), j = 4, s());
		return !1
	});
	$("#f_sample_sub_tab5").click(function() {
		$("#f_sample_sub_tab5").hasClass("tab_inactive") && ($("#f_sample_sub_tab5").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab6").removeClass("tab_active").addClass("tab_inactive"), j = 6, s());
		return !1
	});
	$("#f_sample_sub_tab6").click(function() {
		$("#f_sample_sub_tab6").hasClass("tab_inactive") && ($("#f_sample_sub_tab6").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab5").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), j = 3, s());
		return !1
	});
	$("#f_gem_sub_tab1").click(function() {
		$("#f_gem_sub_tab1").hasClass("tab_inactive") && ($("#f_gem_sub_tab1").removeClass("tab_inactive").addClass("tab_active"), $("#f_gem_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab5").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab6").removeClass("tab_active").addClass("tab_inactive"), b = 5, q());
		return !1
	});
	$("#f_gem_sub_tab2").click(function() {
		$("#f_gem_sub_tab2").hasClass("tab_inactive") && ($("#f_gem_sub_tab2").removeClass("tab_inactive").addClass("tab_active"), $("#f_gem_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab5").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab6").removeClass("tab_active").addClass("tab_inactive"), b = 1, q());
		return !1
	});
	$("#f_gem_sub_tab3").click(function() {
		$("#f_gem_sub_tab3").hasClass("tab_inactive") && ($("#f_gem_sub_tab3").removeClass("tab_inactive").addClass("tab_active"), $("#f_gem_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab5").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab6").removeClass("tab_active").addClass("tab_inactive"), b = 2, q());
		return !1
	});
	$("#f_gem_sub_tab4").click(function() {
		$("#f_gem_sub_tab4").hasClass("tab_inactive") && ($("#f_gem_sub_tab4").removeClass("tab_inactive").addClass("tab_active"), $("#f_gem_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab5").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab6").removeClass("tab_active").addClass("tab_inactive"), b = 3, q());
		return !1
	});
	$("#f_gem_sub_tab5").click(function() {
		$("#f_gem_sub_tab5").hasClass("tab_inactive") && ($("#f_gem_sub_tab5").removeClass("tab_inactive").addClass("tab_active"), $("#f_gem_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab6").removeClass("tab_active").addClass("tab_inactive"), b = 4, q());
		return !1
	});
	$("#f_gem_sub_tab6").click(function() {
		$("#f_gem_sub_tab6").hasClass("tab_inactive") && ($("#f_gem_sub_tab6").removeClass("tab_inactive").addClass("tab_active"), $("#f_gem_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab4").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab5").removeClass("tab_active").addClass("tab_inactive"), $("#f_gem_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), b = 6, q());
		return !1
	});
	var E = null;
	$("#f_gem_exchange_cancel").click(function() {
		$("#f_gem_exchange_panel").hide()
	});
	$("#f_gem_exchange_confirm").click(function() {
		$("#f_gem_exchange_panel").hide();
		var a = parseInt($("#f_gem_exchange_num input").val());
		0 >= a ? showInfo(LNG.ERROR.CLIENT.INVALIDINPUT) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
			key : key,
			action : "exchagegem",
			gems : a
		}, function(a) {
			0 >= a.ret.gems ? showInfo(LNG.ERROR.CLIENT.INVALIDINPUT) : (userinfo.money += parseInt(a.ret.gems), userinfo.pvp -= parseInt(a.ret.pvp), refreshUserInfo(), showInfo(LNG.SUCCESS))
		}))
	});
	var o = null, G = null, F = null;
	$("#f_emronor_sub_tab1").click(function() {
		$("#f_emronor_sub_tab1").hasClass("tab_inactive") && ($("#f_emronor_sub_tab1").removeClass("tab_inactive").addClass("tab_active"), $("#f_emronor_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_emronor_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), a())
	});
	$("#f_emronor_sub_tab2").click(function() {
		$("#f_emronor_sub_tab2").hasClass("tab_inactive") && ($("#f_emronor_sub_tab2").removeClass("tab_inactive").addClass("tab_active"), $("#f_emronor_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_emronor_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), t())
	});
	$("#f_emronor_sub_tab3").click(function() {
		$("#f_emronor_sub_tab3").hasClass("tab_inactive") && ($("#f_emronor_sub_tab3").removeClass("tab_inactive").addClass("tab_active"), $("#f_emronor_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_emronor_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), z())
	});
	$("#f_shop_page_left").click(function() {
		$("#f_sample_tab2").hasClass("tab_active") && 1 < A && (A--, q());
		return !1
	});
	$("#f_shop_page_right").click(function() {
		$("#f_sample_tab2").hasClass("tab_active") && A < B && (A++, q());
		return !1
	});
	$("#f_sample_close").click(function() {
		showCity();
		return !1
	});
	$("#content").css("background-image", "url(img/bg/view.jpg)");
	(function() {
		p = new iScroll("scroller", {
			desktopCompatibility : !0
		});
		ispvp ? $("#f_sample_tab4").hide() : $("#f_sample_tab4").show();
		var a = Utils.getCookie("params");
		if(null != a && (Utils.delCookie("params"), "" != a.tab && null != a.tab)) {
			$("#f_sample_tab" + a.tab).click();
			return
		}
		s()
	})()
});
defineSubView("f_trade", function() {
	function v() {
		window.selectProxy.proxySelect($("#f_trade_type")[0]);
		$("#f_trade_sell_list").empty().unbind();
		z && $.each(z, function(a, b) {
			var c = (new Date).getTime() / 1E3;
			864E3 > b[3] && (b[3] += c);
			if(b[3] > c) {
				var d = mainStatus.ITEM_DATA[b[1]];
				if(!("undefined" == typeof d || null == d)) {
					var e = LNG.ITEMRANK[d.rank], h = d.desc;
					if("undefined" != typeof b[4] && null != b[4])
						for(var i = 0; i < b[4].length; i++)
							0 != b[4][i] && ( h = translate(h, b[4][i]));
					e = '<div style="position:relative;height: 60px;"><div id="f_item_img' + b[0] + '" class="itemicon1" style="top: 5px; left: 5px;"></div><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px"><p><b><font color="' + e.color + '">' + d.name + '</font></b>&nbsp;<strong>(<font color="' + e.color + '">' + e.name + '</font>)&nbsp;x1</strong></p><p style="position:relative;top:6px;">' + h + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 165px;"><li><em class="gold"></em><b>';
					e = mainStatus.CITY_INFO[2] < b[2] ? e + ("<font color=#FFD17A>" + b[2] + "</font>") : e + b[2];
					e += '&nbsp;</b></li><li><em class="clock"></em><b>' + Utils.timeString2(b[3] - c) + '</b></li></ul><div id="f_item_buy' + b[0] + '" class="funcbutton" style="top: 0px; left: 330px;">' + LNG.PURCHASE + "</div></div></div>";
					$("#f_trade_sell_list").append(e);
					Utils.loadImage($("#f_item_img" + b[0]), Utils.getItemImage(b[1]));
					$("#f_item_buy" + b[0]).bind("click", function() {
						mainStatus.CITY_INFO[2] < b[2] ? showInfo(LNG.ERROR.CLIENT.GOLDNOTENOUGH) : showConfirm(translate(LNG.CONFIRMBUY, d.name, b[2]), function() {
							pnlLoading.show();
							ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_TRADE_LIST, {
								key : key,
								action : "purchasing",
								city : mainStatus.getCity().id,
								id : b[0]
							}, function() {
								mainStatus.CITY_INFO[2] -= b[2];
								showInfo(LNG.SUCCESS);
								z.splice(a, 1);
								v()
							})
						})
					})
				}
			}
		});
		null != k && (k.refresh(), k.setPosition(0, 0));
		1 >= C ? $("#f_trade_page").hide() : ($("#f_trade_page").show(), $("#f_trade_page_num").text(p + "/" + C), 1 >= p ? $("#f_trade_page_left").hide() : $("#f_trade_page_left").show(), p >= C ? $("#f_trade_page_right").hide() : $("#f_trade_page_right").show())
	}

	function s() {
		var a = $("#f_trade_type").val(), b = $("#f_trade_search input").val();
		pnlLoading.show();
		var c = CONFIG.MYHOST + CONFIG.FUNC_TRADE_LIST, d = null, d = null != b && "" != b ? {
			key : key,
			name : b,
			type : a,
			page : p
		} : {
			key : key,
			type : a,
			page : p
		};
		ajaxCall(c, d, function(a) {
			C = a.ret.max;
			z = a.ret.item;
			v()
		})
	}

	function u() {
		$("#f_trade_start_list").empty().unbind();
		null != d && $.each(d, function(a, b) {
			var c = mainStatus.ITEM_DATA[b.sid];
			if(!("undefined" == typeof c || null == c)) {
				var e = LNG.ITEMRANK[c.rank], h = c.desc;
				if("undefined" != typeof b.attr && null != b.attr)
					for(var i = 0; i < b.attr.length; i++)
						0 != b.attr[i] && ( h = translate(h, b.attr[i]));
				e = '<div style="position:relative;height: 60px;"><div id="f_trade_start_img' + b.id + '" class="itemicon1" style="top: 5px; left: 5px;"></div><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px"><p><b><font color="' + e.color + '">' + c.name + '</font></b>&nbsp;<strong>(<font color="' + e.color + '">' + e.name + "</font>)&nbsp;x" + b.num + '</strong></p><p style="position:relative;top:6px;">' + h + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="gold"></em><input id="f_trade_start_price' + b.id + '" type="';
				e = window.isIphone ? e + "number" : e + "text";
				e += '" value="' + c.price + '" style="width:100px"/></li></ul><div id="f_item_trade_start' + b.id + '" class="funcbutton" style="top: 0px; left: 330px;">' + LNG.TRADE + "</div></div></div>";
				$("#f_trade_start_list").append(e);
				Utils.loadImage($("#f_trade_start_img" + b.id), Utils.getItemImage(b.sid));
				$("#f_item_trade_start" + b.id).bind("click", function() {
					var e = $("#f_trade_start_price" + b.id).val();
					showConfirm(translate(LNG.CONFIRMTRADE, c.name, e), function() {
						pnlLoading.show();
						ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MY_TRADE, {
							key : key,
							action : "my_goods_safe",
							city : mainStatus.getCity().id,
							id : b.id,
							safe_num : 1,
							price : e
						}, function() {
							showInfo(translate(LNG.TRADECOMMIT, c.name));
							d.splice(a, 1);
							u()
						})
					})
				})
			}
		});
		null != k && (k.refresh(), k.setPosition(0, 0));
		1 >= r ? $("#f_trade_page").hide() : ($("#f_trade_page").show(), $("#f_trade_page_num").text(D + "/" + r), 1 >= D ? $("#f_trade_page_left").hide() : $("#f_trade_page_left").show(), D >= r ? $("#f_trade_page_right").hide() : $("#f_trade_page_right").show())
	}

	function q() {
		pnlLoading.show();
		var a = CONFIG.MYHOST + CONFIG.FUNC_MY_TRADE, b = {
			key : key,
			action : "list_invitem",
			city : mainStatus.getCity().id,
			page : D
		};
		ajaxCall(a, b, function(a) {
			r = a.ret.max;
			d = a.ret.item;
			u()
		})
	}

	function m() {
		$("#f_trade_my_list").empty().unbind();
		null != n && $.each(n, function(a, b) {
			var c = (new Date).getTime() / 1E3;
			86400 > b[3] && (b[3] += c);
			if(b[3] > c) {
				var d = mainStatus.ITEM_DATA[b[1]];
				if(!("undefined" == typeof d || null == d)) {
					var e = LNG.ITEMRANK[d.rank], h = d.desc;
					if("undefined" != typeof b[4] && null != b[4])
						for(var j = 0; j < b[4].length; j++)
							0 != b[4][j] && ( h = translate(h, b[4][j]));
					e = '<div style="position:relative;height: 60px;"><div id="f_item_wait_img' + b[0] + '" class="itemicon1" style="top: 5px; left: 5px;"></div><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px"><p><b><font color="' + e.color + '">' + d.name + '</font></b>&nbsp;<strong>(<font color="' + e.color + '">' + e.name + '</font>)&nbsp;x1</strong></p><p style="position:relative;top:6px;">' + h + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="gold"></em><b>';
					e += b[2];
					e += '&nbsp;</b></li><li><em class="clock"></em><b>' + Utils.timeString2(b[3] - c) + '</b></li></ul><div id="f_item_wait_cancel' + b[0] + '" class="funcbutton" style="top: 0px; left: 330px;">' + LNG.CANCEL + "</div></div></div>";
					$("#f_trade_my_list").append(e);
					Utils.loadImage($("#f_item_wait_img" + b[0]), Utils.getItemImage(b[1]));
					$("#f_item_wait_cancel" + b[0]).bind("click", function() {
						showConfirm(translate(LNG.CONFIRMCANCELTRADE, d.name), function() {
							pnlLoading.show();
							ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MY_TRADE, {
								key : key,
								action : "auction_cancel",
								city : mainStatus.getCity().id,
								type : "will",
								id : b[0]
							}, function() {
								showInfo(LNG.SUCCESS);
								n.splice(a, 1);
								i()
							})
						})
					})
				}
			}
		});
		null != k && (k.refresh(), k.setPosition(0, 0));
		1 >= j ? $("#f_trade_page").hide() : ($("#f_trade_page").show(), $("#f_trade_page_num").text(y + "/" + j), 1 >= p ? $("#f_trade_page_left").hide() : $("#f_trade_page_left").show(), y >= j ? $("#f_trade_page_right").hide() : $("#f_trade_page_right").show())
	}

	function i() {
		pnlLoading.show();
		var a = CONFIG.MYHOST + CONFIG.FUNC_MY_TRADE, b = {
			key : key,
			action : "list_auction_item",
			type : "will",
			city : mainStatus.getCity().id,
			page : y
		};
		ajaxCall(a, b, function(a) {
			j = a.ret.max;
			n = a.ret.item;
			m()
		})
	}

	function e() {
		$("#f_trade_my_list2").empty().unbind();
		null != b && $.each(b, function(a, c) {
			var d = (new Date).getTime() / 1E3;
			864E3 > c[3] && (c[3] += d);
			if(c[3] > d) {
				var h = mainStatus.ITEM_DATA[c[1]];
				if(!("undefined" == typeof h || null == h)) {
					var i = LNG.ITEMRANK[h.rank], j = h.desc;
					if("undefined" != typeof c[4] && null != c[4])
						for(var k = 0; k < c[4].length; k++)
							0 != c[4][k] && ( j = translate(j, c[4][k]));
					i = '<div style="position:relative;height: 60px;"><div id="f_item_ontrade_img' + c[0] + '" class="itemicon1" style="top: 5px; left: 5px;"></div><div class="tooltip2" style="left: 60px; top: 5px; width: 400px; height:50px"><p><b><font color="' + i.color + '">' + h.name + '</font></b>&nbsp;<strong>(<font color="' + i.color + '">' + i.name + '</font>)&nbsp;x1</strong></p><p style="position:relative;top:6px;">' + j + '</p><ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="gold"></em><b>';
					i += c[2];
					i += '&nbsp;</b></li><li><em class="clock"></em><b>' + Utils.timeString2(c[3] - d) + '</b></li></ul><div id="f_item_ontrade_cancel' + c[0] + '" class="funcbutton" style="top: 0px; left: 330px;">' + LNG.CANCEL + "</div></div></div>";
					$("#f_trade_my_list2").append(i);
					Utils.loadImage($("#f_item_ontrade_img" + c[0]), Utils.getItemImage(c[1]));
					$("#f_item_ontrade_cancel" + c[0]).bind("click", function() {
						showConfirm(translate(LNG.CONFIRMCANCELTRADE, h.name), function() {
							pnlLoading.show();
							ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MY_TRADE, {
								key : key,
								action : "auction_cancel",
								city : mainStatus.getCity().id,
								id : c[0]
							}, function() {
								showInfo(LNG.SUCCESS);
								b.splice(a, 1);
								e()
							})
						})
					})
				}
			}
		});
		null != k && (k.refresh(), k.setPosition(0, 0));
		1 >= A ? $("#f_trade_page").hide() : ($("#f_trade_page").show(), $("#f_trade_page_num").text(h + "/" + A), 1 >= h ? $("#f_trade_page_left").hide() : $("#f_trade_page_left").show(), h >= A ? $("#f_trade_page_right").hide() : $("#f_trade_page_right").show())
	}

	function a() {
		pnlLoading.show();
		var a = CONFIG.MYHOST + CONFIG.FUNC_MY_TRADE, c = {
			key : key,
			action : "list_auction_item",
			type : "",
			city : mainStatus.getCity().id,
			page : h
		};
		ajaxCall(a, c, function(a) {
			A = a.ret.max;
			b = a.ret.item;
			e()
		})
	}

	var k = null, t = $("#f_sample_html_script"), c = $(t.parent().get(0));
	c.bind("dispose", function() {
		null != k && (k.destroy(!1), k = null);
		Utils.removeCss("f_trade_css");
		c = null
	});
	var z = null, p = 1, C = 1, d = null, D = 1, r = 1, n = null, y = 1, j = 1, b = null, h = 1, A = 1;
	$("#f_sample_tab1").click(function() {
		$("#f_sample_tab1").hasClass("tab_inactive") && ($("#wrapper").removeClass("canvasbg"), $("#f_sample_tab1").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_trade_search").show(), $("#f_trade_my_title").hide(), $("#f_trade_sell_list").show(), $("#f_trade_start_list").hide(), $("#f_trade_my_list").hide(), $("#f_trade_my_list2").hide(), $("#wrapper").css("height", "225px"), p = 1, s());
		return !1
	});
	$("#f_sample_tab2").click(function() {
		$("#f_sample_tab2").hasClass("tab_inactive") && ($("#wrapper").addClass("canvasbg"), $("#f_sample_tab2").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_trade_search").hide(), $("#f_trade_my_title").show(), $("#f_trade_sell_list").hide(), $("#f_trade_start_list").show(), $("#f_trade_my_list").hide(), $("#f_trade_my_list2").hide(), $("#wrapper").css("height", "200px"), $("#f_sample_sub_tab1").hasClass("tab_active") ? ( D = 1, q()) : $("#f_sample_sub_tab2").hasClass("tab_active") ? ( y = 1, i()) : $("#f_sample_sub_tab3").hasClass("tab_active") && ( h = 1, a()));
		return !1
	});
	$("#f_sample_sub_tab1").click(function() {
		$("#f_sample_sub_tab1").hasClass("tab_inactive") && ($("#f_sample_sub_tab1").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_trade_search").hide(), $("#f_trade_my_title").show(), $("#f_trade_sell_list").hide(), $("#f_trade_start_list").show(), $("#f_trade_my_list").hide(), $("#f_trade_my_list2").hide(), D = 1, q());
		return !1
	});
	$("#f_sample_sub_tab2").click(function() {
		$("#f_sample_sub_tab2").hasClass("tab_inactive") && ($("#f_sample_sub_tab2").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab3").removeClass("tab_active").addClass("tab_inactive"), $("#f_trade_search").hide(), $("#f_trade_my_title").show(), $("#f_trade_sell_list").hide(), $("#f_trade_start_list").hide(), $("#f_trade_my_list").show(), $("#f_trade_my_list2").hide(), y = 1, i());
		return !1
	});
	$("#f_sample_sub_tab3").click(function() {
		$("#f_sample_sub_tab3").hasClass("tab_inactive") && ($("#f_sample_sub_tab3").removeClass("tab_inactive").addClass("tab_active"), $("#f_sample_sub_tab2").removeClass("tab_active").addClass("tab_inactive"), $("#f_sample_sub_tab1").removeClass("tab_active").addClass("tab_inactive"), $("#f_trade_search").hide(), $("#f_trade_my_title").show(), $("#f_trade_sell_list").hide(), $("#f_trade_start_list").hide(), $("#f_trade_my_list").hide(), $("#f_trade_my_list2").show(), h = 1, a());
		return !1
	});
	$("#f_sample_close").click(function() {
		showCity();
		return !1
	});
	$("#f_trade_search_ok").click(function() {
		p = 1;
		s();
		return !1
	});
	$("#f_trade_page_left").click(function() {
		$("#f_sample_tab1").hasClass("tab_active") ? 1 < p && (p--, s()) : $("#f_sample_tab2").hasClass("tab_active") && ($("#f_sample_sub_tab1").hasClass("tab_active") ? 1 < D && (D--, q()) : $("#f_sample_sub_tab2").hasClass("tab_active") ? 1 < y && (y--, i()) : $("#f_sample_sub_tab3").hasClass("tab_active") && 1 < h && (h--, a()));
		return !1
	});
	$("#f_trade_page_right").click(function() {
		$("#f_sample_tab1").hasClass("tab_active") ? p < C && (p++, s()) : $("#f_sample_tab2").hasClass("tab_active") && ($("#f_sample_sub_tab1").hasClass("tab_active") ? D < r && (D++, q()) : $("#f_sample_sub_tab2").hasClass("tab_active") ? y < j && (y++, i()) : $("#f_sample_sub_tab3").hasClass("tab_active") && h < A && (h++, a()));
		return !1
	});
	$("#content").css("background-image", "url(img/bg/view.jpg)");
	k = new iScroll("scroller", {
		desktopCompatibility : !0
	});
	s()
});
