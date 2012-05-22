if(!window._l)
	window._l = "en";
var pnlLoading = $("#loading"), storytext = LNG.STORY_TEXT;
Utils.validateStorage();
function deviceSwitch() {
}

function gotoMain() {
	var g = "_l=" + window._l;
	if(Utils.isNoStorage)
		for(var l in localVars)null != localVars[l] && ( g = null == g ? l + "=" + encodeURIComponent(Utils.jsonToString(localVars[l])) : g + ("&" + l + "=" + encodeURIComponent(Utils.jsonToString(localVars[l]))));
	location.href = "main.html?" + g
}

function showInfo(g) {
	$("#info p").html(g);
	$("#info").show()
}

function resyncUserInfo() {
}

function getUser() {
	var g = Utils.getCookie("key");
	return null == g || null == g.user ? "" : g.user
}

function displayVerInfo(g) {
	$("#divBuildNo b").text(g);
	$("#divBuildNo").show()
}
window._ver && displayVerInfo(window._ver);
$(function() {
	function g() {
		var a = $(window).height();
		320 > a && ( a = 320);
		$("#center_container").css("top", (a - $("#center_container").height()) / 2 + "px")
	}

	function l(a, b) {
		r = b;
		$("#confirm div p").html(a);
		$("#confirm").show()
	}

	function m(a) {
		a >= storytext.length ? ($("#story").hide(), null == Utils.getCookie("key") ? $("#create_referer_panel").show() : $("#create_referer_panel").hide(), $("#create_referer_check").attr("checked", !1), $("#divCreate").show()) : ($("#story").show(), $("#center_container").css("background-image", storytext[a].img), $("#storytxt").html(storytext[a].txt), a += 1, $("#story").click(function() {
			m(a);
			return !1
		}))
	}

	function h(a, b, c, e) {
		b = b || {};
		b._l = window._l;
		b._p = window._p ? window._p : "";
		$.ajax({
			type : "GET",
			url : a,
			data : b,
			dataType : "jsonp",
			jsonp : "jsonpcallback",
			timeout : CONFIG.AJAX_TIMEOUT,
			cache : !1,
			success : function(a) {
				if(a.code == CONFIG.SUCCESS)
					c(a);
				else if(pnlLoading.hide(), a.code == CONFIG.ERROR_INVALIDKEY) {
					var a = !1, b = Utils.getCookie("key");
					if(null == b)
						a = !0;
					else if("undefined" != typeof sysuser && null != sysuser && b.user == sysuser) {
						var d = 0;
						if("undefined" != typeof b.pvp)
							d = b.pvp;
						s(sysuser, syspassword, d)
					} else
						a = !0;
					a && o()
				} else
					a.code == CONFIG.ERROR_UNKNOWN ? showInfo(LNG.ERROR.SERVER[a.code] + ":" + a.detail) : a.code == CONFIG.ERROR_MAINTANENCE ? showInfo(translate(LNG.MAINTANENCE, a.ret)) : ( b = !1, $.isFunction(e) && ( b = e(parseInt(a.code), a)), b || (1 == CONFIG.ERROR_AUTHFAIL[a.code] && o(), showInfo(LNG.ERROR.SERVER[a.code])))
			},
			error : function(a, b) {
				var c = LNG.ERROR.AJAX;
				if(!(null != a && (0 == a.readyState || 0 == a.status))) {
					switch(b) {
						case "timeout":
							c = LNG.ERROR.AJAX_TIMEOUT;
							break;
						case "error":
							c = LNG.ERROR.AJAX_ERROR;
							break;
						case "parsererror":
							c = LNG.ERROR.AJAX_PARSE_ERROR
					}
					showInfo(c)
				}
				pnlLoading.hide()
			}
		})
	}

	function o() {
		"undefined" != typeof sysuser && null != sysuser ? ($("#login_default").show(), $("#login").css("top", 180), $("#cancel").css("top", 180)) : ($("#login_default").hide(), $("#login").css("top", 155), $("#cancel").css("top", 155));
		$(".startpage > div").hide();
		$("#divLogin").show()
	}

	function q() {
		var a = $("#showpravicy").show();
		a.find("#pravicy_confirm").unbind().click(function() {
			Utils.setCookie("pravicy", 1);
			a.hide()
		});
		a.find("#pravicy_decline").unbind().click(function() {
			a.hide()
		})
	}

	function k() {
		var a = Utils.getCookie("key");
		if(null == a)
			if("undefined" == typeof sysuser || null == sysuser)
				pnlLoading.hide(), o();
			else {
				var b = Utils.getCookie("pravicy") || !window.isIphone;
				if(!b)
					return q();
				pnlLoading.show();
				var b = CONFIG.MASTERHOST + CONFIG.MASTER_QUERY, c = {
					user : sysuser,
					action : "reg",
					code : syscode
				};
				h(b, c, function() {
					$("#divMainMenu").hide();
					m(0);
					pnlLoading.hide()
				}, function(b, c) {
					if(11 == b) {
						pnlLoading.show();
						var j = c.ret.server, d = c.ret.referer, n = c.ret.refercode;
						h(j + CONFIG.FUNC_LOGIN, {
							username : sysuser,
							password : syspassword
						}, function(b) {
							a = {
								user : sysuser,
								key : b.ret.key,
								server : j,
								referer : d,
								refercode : n,
								pvp : 0
							};
							Utils.setCookie("key", a, 365);
							k()
						}, function(a) {
							if(12 == a)
								return $("#divMainMenu").hide(), m(0), pnlLoading.hide(), !0
						});
						return !0
					}
					return 13 == b || 14 == b ? (pnlLoading.hide(), o(), !0) : !1
				})
			}
		else {
			b = Utils.getCookie("pravicy") || !window.isIphone;
			if(!b)
				return q();
			pnlLoading.show();
			b = a.server + CONFIG.FUNC_GETUSERINFO;
			c = {
				key : a.key
			};
			"undefined" != typeof syspushid && null != syspushid && "" != syspushid && (c.pushid = syspushid);
			h(b, c, function(a) {
				a.ret.user && (Utils.setCookie("user", a.ret.user), a.ret.events ? Utils.setCookie("events", a.ret.events) : Utils.delCookie("events"), a.ret.status ? Utils.setCookie("status", a.ret.status) : Utils.delCookie("status"), gotoMain())
			}, function(a) {
				return 401 == a ? ($(".startpage > div").hide(), m(0), !0) : !1
			})
		}
		return !1
	}
	
	loginFunc = function androidLogin(a, b, c) {	
		s(a, b, c);
	}
	
	function s(a, b, c) {
		if(!Utils.getCookie("pravicy") && window.isIphone)
			return q();
		//var ret = window.droid.authenticate(a);
		pnlLoading.show();
		/*if(ret != "success") {
			showInfo("No Authentication Info, Bye~");
			window.droid.exit();
		}*/
		var e = Utils.getCookie("key");
		if(null == e || e.user != a || e.pvp != c) {
			var f = CONFIG.MASTERHOST + CONFIG.MASTER_QUERY, j = {
				user : a,
				action : "login",
				pvp : c
			};
			"undefined" != typeof syscode && null != syscode && (j.code = syscode);
			h(f, j, function(d) {
				var n = d.ret.server, j = d.ret.referer, f = d.ret.refercode;
				a = d.ret.user;
				h(n + CONFIG.FUNC_LOGIN, {
					username : a,
					password : b
				}, function(b) {
					e = {
						user : a,
						key : b.ret.key,
						server : n,
						referer : j,
						refercode : f,
						pvp : c
					};
					Utils.setCookie("key", e, 365);
					k()
				})
			})
		} else
			f = e.server + CONFIG.FUNC_LOGIN, h(f, {
				username : a,
				password : b
			}, function(a) {
				e.key = a.ret.key;
				Utils.setCookie("key", e, 365);
				k()
			})
	}

	function p(a, b, c, e, f, j) {
		var b = b.toLowerCase(), f = f.toLowerCase(), d = {
			txtUserName : b,
			txtPassword : c,
			referer : f,
			txtEmail : e
		};
		"undefined" != typeof syscode && null != syscode ? (window.func_temp_create_account = function(b) {
			window.func_temp_create_account = null;
			d.code = syscode;
			d.sign = b;
			pnlLoading.show();
			h(a, d, j)
		}, location.href = "js-call:makesign?func_temp_create_account&" + b + "&" + c + "&" + f + "&" + e) : (pnlLoading.show(), h(a, d, j))
	}

	g();
	$(window).resize(g);
	document.ontouchmove = function(a) {
		a.preventDefault()
	};
	var r = null;
	$("#confirm_yes").click(function() {
		$.isFunction(r) && r();
		$("#confirm").hide();
		return !1
	});
	$("#confirm_no").click(function() {
		$("#confirm").hide();
		return !1
	});
	$("#start").click(function() {
		k();
		return !1
	});
	$("#account").click(function() {
		$("#divMainMenu").hide();
		$("#divMyAccountMenu").show();
		null == Utils.getCookie("key") ? $("#modify").hide() : $("#modify").show();
		return !1
	});
	$("#switch").click(function() {
		o();
		return !1
	});
	$("#mod_confirm").click(function() {
		$("#mod_error").text("");
		var a = Utils.getCookie("key");
		if(null == a)
			return $("#info p").html(LNG.ERROR.CLIENT.NOTLOGIN), $("#info").show(), $("#mod_cancel").click(), !1;
		var b = $("#mod_pwd").val(), c = $("#mod_newpwd").val(), e = $("#mod_newpwd2").val();
		if("" == b)
			return $("#mod_error").text(LNG.ERROR.CLIENT.EMPTYOLDPASSWORD), !1;
		if("" == c)
			return $("#mod_error").text(LNG.ERROR.CLIENT.EMPTYNEWPASSWORD), !1;
		if(!/^[A-Za-z0-9]+$/.test(c))
			return $("#mod_error").text(LNG.ERROR.CLIENT.INVALIDPASSWORD), !1;
		if(c != e)
			return $("#mod_error").text(LNG.ERROR.CLIENT.PASSWORDNOTMATCH), !1;
		pnlLoading.show();
		h(a.server + CONFIG.FUNC_LOGIN, {
			account : a.user,
			oldpwd : b,
			newpwd : c,
			action : "mod"
		}, function() {
			$("#info p").html(LNG.SETDONE);
			$("#info").show();
			$("#mod_cancel").click();
			pnlLoading.hide()
		});
		return !1
	});
	$("#mod_cancel").click(function() {
		$("#divModPassword").hide();
		$("#divMyAccountMenu").show();
		return !1
	});
	$("#modify").click(function() {
		var a = Utils.getCookie("key");
		if(null == a)
			return $("#info p").html(LNG.ERROR.CLIENT.NOTLOGIN), $("#info").show(), !1;
		16 < a.user.length ? $("#mod_account").text(LNG.ACCOUNT_SYS) : $("#mod_account").text(a.user);
		$(".startpage > div").hide();
		$("#divModPassword").show();
		return !1
	});
	$("#getpwd_confirm").click(function() {
		var a = $("#getpwd_account").val(), b = CONFIG.MASTERHOST + CONFIG.MASTER_QUERY, a = {
			user : a,
			action : "login"
		};
		"undefined" != typeof syscode && null != syscode && (a.code = syscode);
		pnlLoading.show();
		h(b, a, function(a) {
			var b = a.ret.server;
			account = a.ret.user;
			a = b + CONFIG.FUNC_REG;
			pnlLoading.show();
			h(a, {
				action : "findpass",
				account : account
			}, function() {
				showInfo(LNG.FINDPASSMAIL);
				$("#divMyAccountMenu").show();
				$("#divGetPassword").hide()
			})
		}, function(a, b) {
			$("#info p").html(LNG.ERROR.SERVER[b.code]);
			$("#info").show();
			return !0
		});
		return !1
	});
	$("#getpwd_cancel").click(function() {
		$("#divGetPassword").hide();
		$("#divMyAccountMenu").show();
		return !1
	});
	$("#forget").click(function() {
		$("#divMyAccountMenu").hide();
		$("#divGetPassword").show();
		return !1
	});
	$("#back").click(function() {
		$("#divMyAccountMenu").hide();
		$("#divMainMenu").show();
		return !1
	});
	$("#login_default td input").click(function() {
		$("#login_default td input").attr("checked") ? ($("#login_account").val(sysuser), $("#login_password").val(""), $("#login_account").attr("disabled", "disabled"), $("#login_password").attr("disabled", "disabled")) : ($("#login_account").val(""), $("#login_password").val(""), $("#login_account").attr("disabled", ""), $("#login_password").attr("disabled", ""))
	});
	$("#login").click(function() {
		$("#login_error").text("");
		var a = "", b = "";
		if($("#login_default td input").attr("checked"))
			a = sysuser, b = syspassword;
		else if( a = $("#login_account").val(), b = $("#login_password").val(), "" == a)
			return $("#login_error").text(LNG.ERROR.CLIENT.EMPTYACCOUNT), !1;
		s(a, b, 0);
		return !1
	});
	$("#cancel").click(function() {
		$("#divLogin").hide();
		$("#reg_referer_panel").show();
		$("#reg_confirm").css("top", 210);
		$("#reg_cancel").css("top", 210);
		$("#reg_referer_check").attr("checked", !1);
		$("#divRegister").show();
		return !1
	});
	$("#reg_confirm").click(function() {
		$("#reg_error").text("");
		var a = $("#reg_account").val(), b = $("#reg_password").val(), c = $("#reg_password2").val();
		if("" == a)
			return $("#reg_error").text(LNG.ERROR.CLIENT.EMPTYACCOUNT), !1;
		if("" == b)
			return $("#reg_error").text(LNG.ERROR.CLIENT.EMPTYPASSWORD), !1;
		if(!/^[A-Za-z0-9]+$/.test(a))
			return $("#reg_error").text(LNG.ERROR.CLIENT.INVALIDACCOUNT), !1;
		if(!/^[A-Za-z0-9]+$/.test(b))
			return $("#reg_error").text(LNG.ERROR.CLIENT.INVALIDPASSWORD), !1;
		if(c != b)
			return $("#reg_error").text(LNG.ERROR.CLIENT.PASSWORDNOTMATCH), !1;
		c = "";
		if(!0 == $("#reg_referer_check").attr("checked") && ( c = $("#reg_referer_on input").val(), "" == c))
			return $("#reg_error").text(LNG.ERROR.CLIENT.EMPTYREFERER), !1;
		if(!Utils.getCookie("pravicy") && window.isIphone)
			return q();
		pnlLoading.show();
		var e = CONFIG.MASTERHOST + CONFIG.MASTER_QUERY, f = {
			user : a,
			action : "reg",
			referer : c
		};
		"undefined" != typeof syscode && null != syscode && (f.code = syscode);
		h(e, f, function(c) {
			var d = c.ret.server, e = c.ret.referer, f = c.ret.refercode;
			p(d + CONFIG.FUNC_REG, a, b, "", e, function(b) {
				Utils.setCookie("key", {
					user : a,
					key : b.ret.key,
					server : d,
					referer : e,
					refercode : f,
					pvp : 0
				}, 365);
				$("#divRegister").hide();
				m(0);
				pnlLoading.hide()
			})
		}, function(c, d) {
			if(11 == c) {
				var n = d.ret.server, g = d.ret.referer, k = d.ret.refercode;
				p(n + CONFIG.FUNC_REG, a, b, "", g, function(b) {
					Utils.setCookie("key", {
						user : a,
						key : b.ret.key,
						server : n,
						referer : g,
						refercode : k,
						pvp : 0
					}, 365);
					$("#divRegister").hide();
					m(0);
					pnlLoading.hide()
				});
				return !0
			}
			if(13 == c) {
				var i = d.ret.user, i = "@" == i ? LNG.SYSTEMACCOUNT : translate(LNG.USERACCOUNT, "<b>" + i + "</b>");
				l(translate(LNG.CONFIRMCREATE, i), function() {
					f.action = "regconfirm";
					h(e, f, function(c) {
						var d = c.ret.server, e = c.ret.referer, f = c.ret.refercode;
						p(d + CONFIG.FUNC_REG, a, b, "", e, function(b) {
							Utils.setCookie("key", {
								user : a,
								key : b.ret.key,
								server : d,
								referer : e,
								refercode : f,
								pvp : 0
							}, 365);
							$("#divRegister").hide();
							m(0);
							pnlLoading.hide()
						})
					})
				});
				return !0
			}
			return !1
		});
		return !1
	});
	$("#reg_cancel").click(function() {
		$("#divRegister").hide();
		$("#divMyAccountMenu").show();
		return !1
	});
	$("#create_confirm").click(function() {
		if(0 == i)
			return $("#create_error").text(LNG.ERROR.CLIENT.EMPTYRACE), !1;
		var a = "";
		if(!0 == $("#create_referer_check").attr("checked") && ( a = $("#create_referer_on input").val(), "" == a))
			return $("#create_error").text(LNG.ERROR.CLIENT.EMPTYREFERER), !1;
		pnlLoading.show();
		var b = Utils.getCookie("key");
		null == b ? h(CONFIG.MASTERHOST + CONFIG.MASTER_QUERY, {
			user : sysuser,
			code : syscode,
			action : "regconfirm",
			referer : a
		}, function(a) {
			var b = a.ret.server, f = a.ret.referer, g = a.ret.refercode;
			p(b + CONFIG.FUNC_REG, sysuser, syspassword, "", f, function(a) {
				a = {
					user : sysuser,
					key : a.ret.key,
					server : b,
					referer : f,
					refercode : g,
					pvp : 0
				};
				Utils.setCookie("key", a, 365);
				h(a.server + CONFIG.FUNC_CREATEROLE, {
					txtrolename : "",
					txtcityname : "",
					country : i,
					key : a.key
				}, function(a) {
					a.ret.user && (Utils.setCookie("user", a.ret.user), a.ret.events ? Utils.setCookie("events", a.ret.events) : Utils.delCookie("events"), a.ret.status ? Utils.setCookie("status", a.ret.status) : Utils.delCookie("status"), Utils.setCookie("chat_sync", 1), gotoMain())
				}, function(a) {
					204 == a && k()
				})
			})
		}, function(a, b) {
			if(11 == a) {
				var f = b.ret.server, g = b.ret.referer, d = b.ret.refercode;
				p(f + CONFIG.FUNC_REG, sysuser, syspassword, "", g, function(a) {
					a = {
						user : sysuser,
						key : a.ret.key,
						server : f,
						referer : g,
						refercode : d,
						pvp : 0
					};
					Utils.setCookie("key", a, 365);
					h(a.server + CONFIG.FUNC_CREATEROLE, {
						txtrolename : "",
						txtcityname : "",
						country : i,
						key : a.key
					}, function(a) {
						a.ret.user && (Utils.setCookie("user", a.ret.user), a.ret.events ? Utils.setCookie("events", a.ret.events) : Utils.delCookie("events"), a.ret.status ? Utils.setCookie("status", a.ret.status) : Utils.delCookie("status"), Utils.setCookie("chat_sync", 1), gotoMain())
					}, function(a) {
						204 == a && k()
					})
				});
				return !0
			}
			return !1
		}) : h(b.server + CONFIG.FUNC_CREATEROLE, {
			txtrolename : "",
			txtcityname : "",
			country : i,
			key : b.key
		}, function(a) {
			a.ret.user && (Utils.setCookie("user", a.ret.user), a.ret.events ? Utils.setCookie("events", a.ret.events) : Utils.delCookie("events"), a.ret.status ? Utils.setCookie("status", a.ret.status) : Utils.delCookie("status"), Utils.setCookie("chat_sync", 1), gotoMain())
		}, function(a) {
			204 == a && k()
		});
		return !1
	});
	$("#info_confirm").click(function() {
		$("#info").hide();
		pnlLoading.hide();
		return !1
	});
	var i = 0;
	$("#create_race_1").click(function() {
		i = 1;
		$("#create_race_selmark").css("left", 34).show();
		return !1
	});
	$("#create_race_2").click(function() {
		i = 2;
		$("#create_race_selmark").css("left", 208).show();
		return !1
	});
	$("#create_race_3").click(function() {
		i = 3;
		$("#create_race_selmark").css("left", 358).show();
		return !1
	});
	$("#create_referer_check").change(function() {
		!0 == $("#create_referer_check").attr("checked") ? ($("#create_referer_off").hide(), $("#create_referer_on").show()) : ($("#create_referer_off").show(), $("#create_referer_on").hide());
		return !1
	});
	$("#reg_referer_check").change(function() {
		!0 == $("#reg_referer_check").attr("checked") ? ($("#reg_referer_off").hide(), $("#reg_referer_on").show()) : ($("#reg_referer_off").show(), $("#reg_referer_on").hide());
		return !1
	});
	pnlLoading.hide();
	pnlLoading.removeClass("loading1").addClass("loading2");
	window.initQQ = function() {
		window.userLogin = k;
		o = function() {
		};
		$("#account").hide();
		$("#start").unbind().click(function() {
			window.location = "js-call:login?";
			return !1
		})
	}
});
