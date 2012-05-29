Utils.QueryString2Cookie();
Utils.validateStorage();
if(!window._l)
	window._l = "en";
var userinfo = Utils.getCookie("user"), keyinfo = Utils.getCookie("key"), statinfo = Utils.getCookie("status");
if(null == userinfo || null == keyinfo)
	location.href = "start.html";
var ispvp = "undefined" != typeof keyinfo.pvp && 1 == keyinfo.pvp, eventinfo = Utils.getCookie("events");
CONFIG.MYHOST = keyinfo.server;
var key = keyinfo.key, EMA = new EventManager, CMA = new CooldownManager(EMA, key), CMAReady = !1;
CONFIG._USE_TOUCHSTART_REPLACE_CLICK && (jQuery.fn.click = jQuery.fn.touch);
var pnlLoading = $("#loading");
window.selectProxy = new Effect.SelectProxy($("#selectproxy_panel"));
var mainStatus = {
	SUBVIEW : null,
	CITY : 0,
	CITY_ID : userinfo.city[0].id,
	CITY_INFO : null,
	BUILDING_DATA : null,
	HERO_DATA : null,
	ITEM_DATA : null,
	SOLDIER_DATA : null,
	TECH_DATA : null,
	getCity : function() {
		return userinfo.city[this.CITY]
	},
	_END : ""
}, chatmsg = [], max_msg_lines = 100, chatDisplay = 0, quests = null, okfunc = null, infofunc = null, brinkfunc = null, guidefunc = null;
$("#guidepanel").css("background-image", "url(" + Utils.getGuideImage(userinfo.nationid) + ")");
function showTip(a) {
	guidefunc = null;
	$("#guideinfotxt").html(a);
	$("#tipsetpanel").show();
	$("#guide").show()
}

function showGuide(a, b) {
	guidefunc = b;
	$("#guideinfotxt").html(a);
	$("#tipsetpanel").hide();
	$("#guide").show()
}

function hideGuide() {
	$("#guide").hide()
}
$("#guideclick").click(function() {
	hideGuide();
	$.isFunction(guidefunc) && guidefunc();
	return !1
});
$("#noguidepanel").click(function() {
	showConfirm(LNG.NOGUIDE, function() {
		hideGuide();
		Utils.setCookie("noguide" + userinfo.id, 1)
	});
	return !1
});
function getUser() {
	return keyinfo.user
}

function showHint(a, b, c, f) {
	$("#hint").css("top", c).css("left", b).css("background-image", "url(img/frame/hint_" + f + ".gif)").show();
	$("#hint p").html(a);
	"ul" == f || "ur" == f ? $("#hint p").css("top", "2px") : $("#hint p").css("top", "-8px")
}

function hideHint() {
	$("#hint").hide()
}

function showBrink(a, b, c, f, d) {
	brinkfunc = d;
	$("#brink img").css("top", b).css("left", a).css("width", c).css("height", f);
	$("#brink").show()
}

function hideBrink() {
	$("#brink").hide()
}

function showInfoBuy(a, b) {
	okfunc = b;
	$("#confirm p").html(a);
	$("#confirm_yes").text(LNG.BT_PURCHASE);
	$("#confirm_no").text(LNG.BT_CLOSE);
	$("#confirm").show()
}

function showRegister() {
	var a = $("#register").show();
	$.each(a.find(".url"), function(a, c) {
		$(c).unbind().click(function() {
			var a = $(this).attr("href");
			location.href = "js-call:brow?" + a
		})
	});
	a.find("#confirm_yes").unbind().click(function() {
		var b = Utils.trim(a.find("#username").val()), c = Utils.trim(a.find("#password").val()), f = Utils.trim(a.find("#password2").val());
		if(0 === b.length)
			return showInfo(LNG.ERROR.CLIENT.EMPTYACCOUNT);
		if(0 === c.length)
			return showInfo(LNG.ERROR.CLIENT.EMPTYPASSWORD);
		if(!/^[A-Za-z0-9]+$/.test(b))
			return showInfo(LNG.ERROR.CLIENT.INVALIDACCOUNT);
		if(!/^[A-Za-z0-9]+$/.test(c))
			return showInfo(LNG.ERROR.CLIENT.INVALIDPASSWORD);
		if(c != f)
			return showInfo(LNG.ERROR.CLIENT.PASSWORDNOTMATCH);
		ajaxCall(CONFIG.MYHOST + "game/reregister.php", {
			key : key,
			username : b,
			password : c,
			password2 : f
		}, function() {
			a.hide();
			showInfo(LNG.REREGISTER, function() {
				location.href = "start.html"
			})
		}, function() {
		})
	})
}

function showPayList(a, b, c) {
	var f = $("#pay_list");
	f.find("div[id!=pay_channel]").remove();
	$("#pay_form").find("p").html(a);
	for(var a = b.length, d = 0; d < a; d++)
		f.find("#pay_channel").clone().attr("id", b[d].id).html(b[d].htm).click(function() {
			c(this.id)
		}).prependTo(f);
	$("#pay_form").show();
	$("#pay_channel").click(function() {
		$("#pay_form").hide()
	})
}

function showConfirm(a, b) {
	okfunc = b;
	$("#confirm p").html(a);
	$("#confirm_yes").text(LNG.BT_CONFIRM);
	$("#confirm_no").text(LNG.BT_CANCEL);
	$("#confirm").show()
}

function showYesNo(a, b) {
	okfunc = b;
	$("#confirm p").html(a);
	$("#confirm_yes").text(LNG.BT_YES);
	$("#confirm_no").text(LNG.BT_NO);
	$("#confirm").show()
}

function showInfo(a, b) {
	infofunc = b;
	$("#info p").html(a);
	$("#info").show()
}

function showUserInfo(a) {
	$("#u_cities SELECT").html("");
	for(var b = 0; b < a.city.length; b++) {
		var c = a.city[b];
		$("#u_cities SELECT").append('<OPTION VALUE="' + c.x + "." + c.y + '">' + c.name + " (" + c.x + "/" + c.y + ")</OPTION>");
		window.selectProxy.proxySelect($("#u_cities SELECT")[0])
	}
	$("#u_race em").removeClass().addClass("race" + a.nationid);
	$("#u_race b").text(null == a.nick ? "unknown" : a.nick);
	$("#u_level b").text(a.level);
	"undefined" != typeof a.pvp ? ($("#u_pvppoint b").text(a.pvp), $("#u_pvppoint").show()) : $("#u_pvppoint").hide();
	0 != a.guildid ? ($("#u_guild em").css("background-image", "url(" + Utils.getFlag(a.gflag) + ")"), $("#u_guild b").text(a.guild), $("#u_guild").show()) : ($("#u_guild em").css("background-image", ""), $("#u_guild b").text(""), $("#u_guild").hide());
	0 < a.protection || 0 != (a.status & 2) ? ($("#u_protect img").attr("src", "img/item/0.png"), $("#u_protect").show()) : 0 != (a.status & 1) ? ($("#u_protect img").attr("src", "img/item/80.png"), $("#u_protect").show()) : $("#u_protect").hide();
	a.conq && 0 < a.conq[0] ? ($("#u_conq b").text(a.conq[2]), $("#u_conq").show()) : $("#u_conq").hide();
	$("#u_info").show()
}

var chatLoadTime = 0;
function deviceSwitch() {
	(new Date).getTime() < chatLoadTime + CONFIG.CHAT_RELOAD_REATE + CONFIG.CHAT_RELOAD_REATE && ($("#loading").is(":visible") || showConfirm(LNG.CONFIRMSWITCH, function() {
		location.href = "start.html"
	}))
}

var guideList = null, guideItem = null, guideIndex = 0, guideInfoIndex = 0;
function DisplayGuideInfo() {
	null == guideItem || "undefined" == typeof guideItem.info || null == guideItem.info || guideItem.info.length <= guideInfoIndex ? ($.isFunction(guideItem.fn) && guideItem.fn(), DisplayGuide()) : (showGuide(guideItem.info[guideInfoIndex], DisplayGuideInfo), guideInfoIndex++)
}

function DisplayGuide() {
	null == guideList || guideList.length <= guideIndex ? guideItem = guideList = null : ( guideItem = guideList[guideIndex], guideIndex++, "undefined" != typeof guideItem.info && null != guideItem.info && 0 < guideItem.info.length ? ( guideInfoIndex = 0, DisplayGuideInfo()) : (showHint(guideItem.hint.htm, guideItem.hint.x, guideItem.hint.y, guideItem.hint.a), showBrink(guideItem.brink.x, guideItem.brink.y, guideItem.brink.w, guideItem.brink.h, function() {
		guideItem.brink.fn();
		DisplayGuide()
	})))
}

function CheckGuideDisplay(a) {
	var b = !1;
	null == Utils.getCookie("noguide" + userinfo.id) && null != quests && 0 < quests.length && $.each(quests, function(c, f) {
		var d = QUEST_GUIDE[f.id], e = null;
		if("undefined" != typeof d && null != d)
			if(0 == f.status)
				e = d.newq;
			else if(1 == f.done)
				e = d.done;
			else if(f.id == a)
				e = d.accept;
		if("undefined" != typeof e && null != e && 0 < e.length)
			return guideList = e, guideIndex = 0, "undefined" != typeof d.skip && 1 == d.skip ? $("#noguidepanel").show() : $("#noguidepanel").hide(), DisplayGuide(), b = !0, !1
	});
	return b
}

function makeFreeHeroPanel(a, b, c, f, d, e, g, i) {
	i || ( i = ["grade", "power", "intellect", "defense", "command"]);
	var h = {
		grade : {
			title : LNG.LEVEL,
			value : "g",
			width : 40
		},
		power : {
			title : LNG.ATTACK,
			value : "p",
			width : 60
		},
		intellect : {
			title : LNG.WISDOM,
			value : "i",
			width : 60
		},
		defense : {
			title : LNG.DEFENSE,
			value : "c1",
			width : 60
		},
		command : {
			title : LNG.MAXTROOP,
			value : "c2",
			width : 60
		},
		energy : {
			title : LNG.ENERGY,
			value : "e",
			width : 60
		}
	};
	if("undefined" == typeof a || null == a || 0 == a.length)
		return f(null);
	var j = '<div id="f_com_free_hero_panel">';
	c && ( j = "undefined" != typeof e && "undefined" != typeof g && null != e && null != g ? j + ('<div class="iphonetitle" style="position:relative;left:10px;width:460px;"><div class="font12" style="top:7px;position:relative;">&nbsp;' + e + '</div><div id="f_com_free_hero_no" class="funcbutton" style="top: 0px; left: 390px;">' + g + '</div></div><div style="position:relative;height:3px;"></div>') : j + ('<div class="iphonetitle" style="position:relative;left:10px;width:460px;"><div class="font12" style="top:7px;position:relative;">&nbsp;<b>' + LNG.ASSIGN_HERO + '</b></div><div id="f_com_free_hero_no" class="funcbutton" style="top: 0px; left: 390px;">' + LNG.NO + '</div></div><div style="position:relative;height:3px;"></div>'));
	var j = j + ('<div class="iphonetitle" style="position:relative;left:10px;width:460px;"><div class="table_header" style="float:left; width: 70px;">' + LNG.NAME + "</div>"), m;
	for(m in i) c = h[i[m]], j = d == i[m] ? j + ('<div class="table_header" style="float:left; width: ' + c.width + 'px;"><b>' + c.title + "</b></div>") : j + ('<div class="table_header" style="float:left; width: ' + c.width + 'px;">' + c.title + "</div>");
	var l = $(j + '<div style="clear:both"></div></div><div id="f_com_free_hero_list" class="canvasbg" style="position:relative;left:10px;width:460px;"></div></div>');
	l.find("#f_com_free_hero_no").click(function() {
		l.remove();
		f(null);
		return !1
	});
	var n = l.find("#f_com_free_hero_list");
	$.each(a, function(a, e) {
		var b = mainStatus.HERO_DATA[e.gid];
		if(b) {
			var k = $("<div>").attr("id", "f_com_free_hero" + e.gid).css({
				position : "relative",
				height : "75px"
			}), g;
			g = '<div class="font12" style="position:relative; width:70px;text-align:center; float:left;">' + ('<img id="f_com_free_hero_list_img' + e.gid + '" src="img/hero/sample.gif"/><br><b>' + b.name + "</b>");
			g += '<img src="' + Utils.getHeroRankImage(b.race, b.rank) + '" style="position:absolute;left:5px;top:35px;"/>';
			k.append(g + "</div>");
			for(var c in i) b = h[i[c]], d == i[c] ? k.append('<div class="font12 table_cell" style="float:left; line-height:70px; width: ' + b.width + 'px;"><b>' + e[b.value] + "</b></div>") : k.append('<div class="font12 table_cell" style="float:left; line-height:70px; width: ' + b.width + 'px;">' + e[b.value] + "</div>");
			k.append('</div><div id="f_com_free_hero_list' + e.id + '" class="funcbutton" style="top: 22px; left: 390px;">' + LNG.SELECT + "</div>");
			Utils.loadImage2(k.find("#f_com_free_hero_list_img" + e.gid), Utils.getHeroImage(e.gid));
			k.find("#f_com_free_hero_list" + e.id).click(function() {
				l.remove();
				f(e);
				return !1
			});
			n.append(k)
		}
	});
	b.append(l)
}

function showFreeHeroPanel(a, b, c, f, d, e) {
	pnlLoading.show();
	ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
		key : key,
		city : mainStatus.getCity().id,
		action : "gen_list",
		extra : 1
	}, function(g) {
		makeFreeHeroPanel(g.ret.hero, a, b, c, f, d, e)
	})
}

function showFreeHeroPanel2(a, b, c, f, d, e) {
	pnlLoading.show();
	ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
		key : key,
		city : mainStatus.getCity().id,
		action : "gen_list",
		extra : 3
	}, function(g) {
		makeFreeHeroPanel(g.ret.hero, a, b, c, f, d, e)
	})
}

function showFreeHeroPanel4(a, b, c, f, d, e, g) {
	pnlLoading.show();
	ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
		key : key,
		city : mainStatus.getCity().id,
		action : "gen_list",
		extra : 4
	}, function(i) {
		makeFreeHeroPanel(i.ret.hero, a, b, c, f, d, e, g)
	})
}

function showItemPromotion(a, b, c, f, d) {
	pnlLoading.show();
	a.remove("#f_com_item_promotion_panel");
	var e = null;
	$.each(b, function(a, b) {
		e = null == e ? b.id : e + ("," + b.id)
	});
	ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
		key : key,
		ids : e
	}, function(e) {
		var i = e.ret.item, e = '<div id="f_com_item_promotion_panel">' + ('<div class="iphonetitle" style="position:relative;left:10px;width:462px;"><div class="font12" style="top:7px;position:relative;">&nbsp;<b>' + LNG.HELPFUL_ITEMS + '</b></div><div id="f_com_item_promotion_no" class="funcbutton" style="top: 0px; left: 390px;">' + LNG.CLOSE + '</div></div><div style="position:relative;height:3px;"></div>'), h = $(e + '<div id="f_com_item_promotion_list" class="canvasbg" style="position:relative;left:10px;width:462px;"></div></div>');
		h.find("#f_com_item_promotion_no").click(function() {
			h.remove();
			$.isFunction(c) && c(0);
			return !1
		});
		var j = h.find("#f_com_item_promotion_list");
		f && $.isFunction(c) && "undefined" != typeof d && null != d && $.each(d, function(a, e) {
			var b = '<div style="position:relative;height: 60px;"><img src="img/item/' + e.icon + '" style="position:absolute;top: 5px; left: 10px;"><div class="tooltip2" style="left: 70px; top: 5px; width: 390px; height:50px"><p><b>' + e.name + '</b></p><p style="position:relative;top:6px;">' + e.desc + "</p>", b = 1 == e.shop ? b + ('<ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="gem"></em><b>' + e.price + "</b></li></ul>") : b + ('<ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="gold"></em><b>' + e.price + "</b></li></ul>"), b = b + ('<div id="f_com_extra_promotion_use' + e.id + '" class="funcbutton" style="top: -3px; left: 320px;">' + LNG.ITEM_USE + "</div>");
			j.append(b + "</div></div>");
			h.find("#f_com_extra_promotion_use" + e.id).click(function() {
				var a = null, a = 1 == e.shop ? translate(LNG.CONFIRMUSE2, e.name, e.price) : translate(LNG.CONFIRMUSE3, e.name, e.price);
				showConfirm(a, function() {
					c(e.id);
					h.remove()
				})
			})
		});
		null != i && $.each(i, function(a, e) {
			var b = mainStatus.ITEM_DATA[e.sid];
			if(!("undefined" == typeof b || null == b)) {
				var g = LNG.ITEMRANK[b.rank], g = '<div style="position:relative;height: 60px;"><div id="f_com_item_promotion_img' + e.id + '" class="itemicon1" style="top: 5px; left: 10px;"></div><div class="tooltip2" style="left: 70px; top: 5px; width: 390px; height:50px"><p><b><font color="' + g.color + '">' + b.name + '</font></b>&nbsp;<strong>(<font color="' + g.color + '">' + g.name + "</font>)&nbsp;x" + e.num + '</strong></p><p style="position:relative;top:6px;">' + b.desc + "</p>", g = g + ('<div id="f_com_item_promotion_use' + e.id + '" class="funcbutton" style="top: -3px; left: 320px;">' + LNG.ITEM_USE + "</div>");
				j.append(g + "</div></div>");
				Utils.loadImage(h.find("#f_com_item_promotion_img" + e.id), Utils.getItemImage(e.sid));
				h.find("#f_com_item_promotion_use" + e.id).click(function() {
					showConfirm(translate(LNG.CONFIRMUSE, b.name), function() {
						f ? ($.isFunction(c) && c(e.sid), h.remove()) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_OP, {
							key : key,
							action : "use",
							city : mainStatus.getCity().id,
							id : e.id
						}, function(a) {
							"undefined" != typeof a.ret.buff && null != a.ret.buff && "" != a.ret.buff && mainStatus.CITY_INFO[23].push(a.ret.buff);
							var b = null;
							"undefined" != typeof a.ret.gem && null != a.ret.gem && 0 != a.ret.gem && (userinfo.money += a.ret.gem, refreshUserInfo(), b = null == b ? '<img src="img/res/gem3.gif"/>x' + a.ret.gem : b + ('&nbsp;<img src="img/res/gem3.gif"/>x' + a.ret.gem));
							"undefined" != typeof a.ret.wood && null != a.ret.wood && 0 != a.ret.wood && (mainStatus.CITY_INFO[6] += a.ret.wood, b = null == b ? '<img src="img/res/wood.png"/>x' + a.ret.wood : b + ('&nbsp;<img src="img/res/wood.png"/>x' + a.ret.wood));
							"undefined" != typeof a.ret.food && null != a.ret.food && 0 != a.ret.food && (mainStatus.CITY_INFO[4] += a.ret.food, b = null == b ? '<img src="img/res/food.png"/>x' + a.ret.food : b + ('&nbsp;<img src="img/res/food.png"/>x' + a.ret.food));
							"undefined" != typeof a.ret.iron && null != a.ret.iron && 0 != a.ret.iron && (mainStatus.CITY_INFO[8] += a.ret.iron, b = null == b ? '<img src="img/res/iron.png"/>x' + a.ret.iron : b + ('&nbsp;<img src="img/res/iron.png"/>x' + a.ret.iron));
							"undefined" != typeof a.ret.gold && null != a.ret.gold && 0 != a.ret.gold && (mainStatus.CITY_INFO[2] += a.ret.gold, b = null == b ? '<img src="img/res/ic06_other.gif"/>x' + a.ret.gold : b + ('&nbsp;<img src="img/res/ic06_other.gif"/>x' + a.ret.gold));
							null == b ? showInfo(LNG.SUCCESS) : showInfo(translate(LNG.GETITEM, b));
							$.isFunction(c) && c(e.sid);
							h.remove()
						}))
					});
					return !1
				})
			}
		});
		null != b && $.each(b, function(a, e) {
			for(var b = !1, g = 0; g < i.length; g++)
				if(i[g].sid == e.id) {
					b = !0;
					break
				}
			if(!b) {
				var d = mainStatus.ITEM_DATA[e.id];
				"undefined" == typeof d || null == d || ( b = LNG.ITEMRANK[d.rank], b = '<div style="position:relative;height: 60px;"><div id="f_com_item_promotion2_img' + e.id + '" class="itemicon1" style="top: 5px; left: 10px;"></div><div class="tooltip2" style="left: 70px; top: 5px; width: 390px; height:50px"><p><b><font color="' + b.color + '">' + d.name + '</font></b>&nbsp;<strong>(<font color="' + b.color + '">' + b.name + '</font>)&nbsp;x0</strong></p><p style="position:relative;top:6px;">' + d.desc + "</p>", b = 1 == e.shop ? b + ('<ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="gem"></em><b>' + d.price + "</b></li></ul>") : b + ('<ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="gold"></em><b>' + d.price + "</b></li></ul>"), b += '<div id="f_com_item_promotion2_buy' + e.id + '" class="funcbutton" style="top: -3px; left: 320px;">' + LNG.BUY_AND_USE + "</div>", j.append(b + "</div></div>"), Utils.loadImage(h.find("#f_com_item_promotion2_img" + e.id), Utils.getItemImage(e.id)), h.find("#f_com_item_promotion2_buy" + e.id).click(function() {
					0 == e.shop ? showConfirm(translate(LNG.CONFIRMBUY, d.name, d.price), function() {
						pnlLoading.show();
						ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SHOP, {
							key : key,
							action : "purchase",
							type : 3,
							city : mainStatus.getCity().id,
							id : e.id
						}, function(a) {
							mainStatus.CITY_INFO[2] = a.ret.gold;
							a = a.ret.itemid;
							f ? ($.isFunction(c) && c(e.id), h.remove()) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_OP, {
								key : key,
								action : "use",
								city : mainStatus.getCity().id,
								id : a
							}, function(a) {
								"undefined" != typeof a.ret.buff && null != a.ret.buff && "" != a.ret.buff && mainStatus.CITY_INFO[23].push(a.ret.buff);
								var b = null;
								"undefined" != typeof a.ret.gem && null != a.ret.gem && 0 != a.ret.gem && (userinfo.money += a.ret.gem, refreshUserInfo(), b = null == b ? '<img src="img/res/gem3.gif"/>x' + a.ret.gem : b + ('&nbsp;<img src="img/res/gem3.gif"/>x' + a.ret.gem));
								"undefined" != typeof a.ret.wood && null != a.ret.wood && 0 != a.ret.wood && (mainStatus.CITY_INFO[6] += a.ret.wood, b = null == b ? '<img src="img/res/wood.png"/>x' + a.ret.wood : b + ('&nbsp;<img src="img/res/wood.png"/>x' + a.ret.wood));
								"undefined" != typeof a.ret.food && null != a.ret.food && 0 != a.ret.food && (mainStatus.CITY_INFO[4] += a.ret.food, b = null == b ? '<img src="img/res/food.png"/>x' + a.ret.food : b + ('&nbsp;<img src="img/res/food.png"/>x' + a.ret.food));
								"undefined" != typeof a.ret.iron && null != a.ret.iron && 0 != a.ret.iron && (mainStatus.CITY_INFO[8] += a.ret.iron, b = null == b ? '<img src="img/res/iron.png"/>x' + a.ret.iron : b + ('&nbsp;<img src="img/res/iron.png"/>x' + a.ret.iron));
								"undefined" != typeof a.ret.gold && null != a.ret.gold && 0 != a.ret.gold && (mainStatus.CITY_INFO[2] += a.ret.gold, b = null == b ? '<img src="img/res/ic06_other.gif"/>x' + a.ret.gold : b + ('&nbsp;<img src="img/res/ic06_other.gif"/>x' + a.ret.gold));
								null == b ? showInfo(LNG.SUCCESS) : showInfo(translate(LNG.GETITEM, b));
								$.isFunction(c) && c(e.id);
								h.remove()
							}))
						})
					}) : showConfirm(translate(LNG.CONFIRMBUY2, d.name, d.price), function() {
						pnlLoading.show();
						ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SHOP2, {
							key : key,
							action : "purchase",
							id : e.id
						}, function(a) {
							userinfo.money = a.ret.money;
							refreshUserInfo();
							a = a.ret.itemid;
							f ? ($.isFunction(c) && c(e.id), h.remove()) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_OP, {
								key : key,
								action : "use",
								city : mainStatus.getCity().id,
								id : a
							}, function(a) {
								"undefined" != typeof a.ret.buff && null != a.ret.buff && "" != a.ret.buff && mainStatus.CITY_INFO[23].push(a.ret.buff);
								var b = null;
								"undefined" != typeof a.ret.gem && null != a.ret.gem && 0 != a.ret.gem && (userinfo.money += a.ret.gem, refreshUserInfo(), b = null == b ? '<img src="img/res/gem3.gif"/>x' + a.ret.gem : b + ('&nbsp;<img src="img/res/gem3.gif"/>x' + a.ret.gem));
								"undefined" != typeof a.ret.wood && null != a.ret.wood && 0 != a.ret.wood && (mainStatus.CITY_INFO[6] += a.ret.wood, b = null == b ? '<img src="img/res/wood.png"/>x' + a.ret.wood : b + ('&nbsp;<img src="img/res/wood.png"/>x' + a.ret.wood));
								"undefined" != typeof a.ret.food && null != a.ret.food && 0 != a.ret.food && (mainStatus.CITY_INFO[4] += a.ret.food, b = null == b ? '<img src="img/res/food.png"/>x' + a.ret.food : b + ('&nbsp;<img src="img/res/food.png"/>x' + a.ret.food));
								"undefined" != typeof a.ret.iron && null != a.ret.iron && 0 != a.ret.iron && (mainStatus.CITY_INFO[8] += a.ret.iron, b = null == b ? '<img src="img/res/iron.png"/>x' + a.ret.iron : b + ('&nbsp;<img src="img/res/iron.png"/>x' + a.ret.iron));
								"undefined" != typeof a.ret.gold && null != a.ret.gold && 0 != a.ret.gold && (mainStatus.CITY_INFO[2] += a.ret.gold, b = null == b ? '<img src="img/res/ic06_other.gif"/>x' + a.ret.gold : b + ('&nbsp;<img src="img/res/ic06_other.gif"/>x' + a.ret.gold));
								null == b ? showInfo(LNG.SUCCESS) : showInfo(translate(LNG.GETITEM, b));
								$.isFunction(c) && c(e.id);
								h.remove()
							}))
						})
					});
					return !1
				}))
			}
		});
		a.append(h)
	})
}

function showNewMail() {
	$("#bottom_newmail").show()
}

function hideNewMail() {
	$("#bottom_newmail").hide()
}

var mainContent = $("#content");
(function() {
	var a = new ui.TranslationSubViewContainer($("#content"), MARKERS), b = new ui.TranslationSubViewContainer($("#content_fullscreen"), MARKERS), c = null;
	window.main_loadDiv = function(f, d, e) {
		"function" === typeof d && ( e = d, d =
		void 0);
		var g = !1;
		if(f && f.url && "boolean" === typeof f.fullscreen)
			g = f.fullscreen, f = f.url;
		if(f !== mainStatus.SUBVIEW) {
			pnlLoading.show();
			mainStatus.SUBVIEW = f;
			"undefined" != typeof droid && droid.setCurrentView(mainStatus.SUBVIEW);
			mainContent.trigger("dispose");
			mainContent.unbind("dispose");
			"undefined" != typeof d && null != d && Utils.setCookie("params", d);
			try {
				pnlLoading.show(), c && c.close(), g ? b.show() : b.hide(), ( g ? b : a).load(f.replace(".html", ""), function(a) {
					c = a;
					$.isFunction(e) && e()
				})
			} catch(i) {
				"f_city.html" == f ? window.location = "main.html" : (showInfo(LNG.FAULT), setTimeout(showCity, 100))
			}
		}
	}
})();
function refreshUserInfo() {
	if(userinfo) {
		Utils.setCookie("user", userinfo);
		Utils.setCookie("status", statinfo);
		Utils.setCookie("events", eventinfo);
		$("#race b").text(userinfo.nick);
		$("#level b").text(userinfo.level);
		$("#gem b").text(userinfo.money);
		$("#cities SELECT").empty();
		for(var a in userinfo.city) {
			var b = userinfo.city[a];
			$("#cities SELECT").append('<OPTION VALUE="' + a + '" ' + (mainStatus.CITY_ID == userinfo.city[a].id ? "SELECTED" : "") + ">" + b.name + "(" + b.x + "," + b.y + ")</OPTION>");
			window.selectProxy.proxySelect($("#cities SELECT")[0])
		}
		0 != userinfo.guildid ? ($("#guild em").css("background-image", "url(" + Utils.getFlag(userinfo.gflag) + ")"), $("#guild b").text(userinfo.guild)) : ($("#guild em").css("background-image", ""), $("#guild b").text(""));
		"undefined" != typeof userinfo.pvp ? ($("#pvppoint b").text(userinfo.pvp), $("#pvppoint").show()) : $("#pvppoint").hide()
	}
}

function resyncUserInfo() {
	pnlLoading.show();
	ajaxCall(keyinfo.server + CONFIG.FUNC_GETUSERINFO, {
		key : keyinfo.key
	}, function(a) {
		if(a.ret.user)
			userinfo = a.ret.user, eventinfo = a.ret.events, statinfo = a.ret.status, refreshUserInfo()
	})
}

function checkVersionInfo() {
	null != statinfo && statinfo.ver > CONFIG.VER && ajaxCall(CONFIG.MASTERHOST + CONFIG.MASTER_VERINFO, null, function(a) {
		$("#server_notice_date").html(a.ret.date);
		$("#server_notice_desc").html(a.ret.desc);
		$("#server_notice").show();
		$("#server_notice_update").unbind().click(function() {
			location.href = "js-call:link?" + a.ret.url
		})
	}, !1)
}checkVersionInfo();
var onAjaxSuccess = null;
function _onAjaxSuccess(a, b, c, f) {
	var d = null;
	if(a.code == CONFIG.SUCCESS)
		b(a);
	else if(a.code == CONFIG.ERROR_INVALIDKEY)
		window.location.href = "start.html";
	else if(a.code == CONFIG.ERROR_UNKNOWN)
		showInfo(LNG.ERROR.SERVER[a.code] + ":" + a.Detail);
	else if(3405 == a.code || 4404 == a.code)
		showInfoBuy(LNG.ERROR.SERVER[a.code], function() {
			Utils.setCookie("params", {
				tab : 3
			});
			main_loadDiv("f_shop.html", function() {
			})
		});
	else if(711 == a.code || 807 == a.code || 1306 == a.code || 1608 == a.code || 1609 == a.code || 3402 == a.code || 3608 == a.code || 4403 == a.code)
		showConfirm(LNG.ERROR.SERVER[a.code], function() {
			"f_shop.html" != mainStatus.SUBVIEW ? (Utils.setCookie("params", {
				tab : 2
			}), main_loadDiv("f_shop.html", function() {
			})) : $("#f_sample_tab2").click()
		});
	else if(708 == a.code || 709 == a.code || 710 == a.code || 1004 == a.code || 1005 == a.code || 2305 == a.code || 2537 == a.code)
		showConfirm(LNG.ERROR.SERVER[a.code], function() {
			0 < $("#f_city_resource_html_script").length ? $("#f_tab3").click() : (Utils.setCookie("params", {
				tab : 3
			}), main_loadDiv("f_city_resource.html", function() {
			}))
		});
	else {
		if($.isFunction(c) && !0 === c(parseInt(a.code)))
			return;
		for( d = a.code; d && d.constructor && d.constructor == Number; )
			d = LNG.ERROR.SERVER[d];
		d ? showInfo(d) : showInfo(LNG.ERROR.SERVER.UNKNOWN + a.code)
	}
	!1 != f && pnlLoading.hasClass("loading2") && pnlLoading.hide()
}

onAjaxSuccess = CONFIG.RELEASE ? function(a, b, c, f) {
	try {
		_onAjaxSuccess(a, b, c, f)
	} catch(d) {
		pnlLoading.hasClass("loading2") && pnlLoading.hide(), showInfo(LNG.FAULT)
	}
} : _onAjaxSuccess;
function ajaxCall(a, b, c, f, d) {
	"boolean" == typeof f && ( d = f);
	b = b || {};
	b._l = window._l;
	b._p = window._p ? window._p : "";
	a = {
		type : "GET",
		url : a,
		data : b,
		dataType : "jsonp",
		jsonp : "jsonpcallback",
		timeout : CONFIG.AJAX_TIMEOUT,
		cache : !1,
		success : function(a) {
			onAjaxSuccess(a, c, f, d)
		}
	};
	a.error = !1 == d ? null : function(a, b) {
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
			pnlLoading.hasClass("loading2") ? (pnlLoading.hide(), showInfo(c)) : showInfo(c, function() {
				location.href = "start.html"
			})
		}
	};
	$.ajax(a)
}

$(function() {
	function a(a) {
		function b() {
			var c = $(window).width();
			480 > c && ( c = 480);
			var g = $(window).height();
			320 > g && ( g = 320);
			a.css("left", (c - a.width()) / 2 + "px");
			a.css("top", (g - a.height()) / 2 + "px")
		}

		b();
		$(window).resize(b)
	}

	function b() {
		userinfo.lottery && !1 == d ? (main_loadDiv({
			url : "f_lottery.html",
			fullscreen : !0
		}), d = !0) : main_loadDiv("f_city.html", function() {
		});
		var a = parseInt($("#cities SELECT").val());
		if(a != mainStatus.CITY)
			mainStatus.CITY = a, mainStatus.CITY_ID = userinfo.city[a].id, 0 <= mainStatus.CITY && "undefined" != typeof reloadCity && (reloadCity(), CMA.reload(mainStatus.CITY_ID))
	}
	0 > window.location.href.indexOf("debug") && a($("#center_container"));
	document.ontouchmove = function(a) {
		a.preventDefault()
	};
	var c = {
		1 : 12,
		2 : 13,
		3 : 14,
		4 : 15,
		5 : 16,
		8 : 17,
		9 : 18,
		10 : 19,
		11 : 20,
		12 : 21,
		13 : 22
	}, f = {
		getLevel : function(a) {
			return this[c[a]]
		},
		setLevel : function(a, b) {
			a && b && (this[c[a]] = b)
		}
	};
	window.onCityLoaded = function(a) {
		mainStatus.CITY_INFO = a.ret.city;
		if(!CMAReady) {
			CMAReady = !0;
			var b = "";
			mainStatus.CITY_INFO[4] >= mainStatus.CITY_INFO[5] && (b += '&nbsp;<img src="img/res/food.png">&nbsp;');
			mainStatus.CITY_INFO[6] >= mainStatus.CITY_INFO[7] && (b += '&nbsp;<img src="img/res/wood.png">&nbsp;');
			mainStatus.CITY_INFO[2] >= mainStatus.CITY_INFO[3] && (b += '&nbsp;<img src="img/res/ic06_other.gif">&nbsp;');
			mainStatus.CITY_INFO[8] >= mainStatus.CITY_INFO[9] && (b += '&nbsp;<img src="img/res/iron.png">&nbsp;');
			"" != b && showInfo(translate(LNG.RESOURCEFULL, b))
		}
		$.extend(mainStatus.CITY_INFO, f);
		userinfo.money = a.ret.money;
		userinfo.grade = a.ret.grade;
		refreshUserInfo();
		EMA.async("cityinfoupdate")
		
		//milbot functions
		if (notiWarinfo) {
			$.each(userinfo.city, function(index,value){setTimeout(checkwarinfo(value.id),1000);
				});
		}
		if (g_SmartBot || g_autobuyfood) {
        	$.each(userinfo.city, function(index,value){
        		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_CITYINFO, {
            	key: key,
            	city: value.id
        		}, function (b) {
            		if(b.ret.city[4] < 1000000) {
            			if (b.ret.city[2] > 50000) {
            				a["g2f"] = 50000;
            			} else {
            				if(b.ret.city[2] == 0) {
            					displayMsg("Empty Gold in " +value.name);
            					return;
            				} else {
            					a["g2f"] = b.ret.city[2];
            				}
            				
            			}
						ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_MARKERT_LOCAL, $.extend({
							key : key,
							city : value.id,
							reso_put : "giveput"
						}, a), function (a) {
							// mainStatus.CITY_INFO[2] = a.ret.g;
							// mainStatus.CITY_INFO[4] = a.ret.f;
							// mainStatus.CITY_INFO[6] = a.ret.w;
							// mainStatus.CITY_INFO[8] = a.ret.i;
							EMA.trigger("cityinfoupdate");
						}, function () {});
					}
        		});
        	});
        	
		} else {
			EMA.trigger("cityinfoupdate");
		}
		//end
	};
	var d = !1;
	window.showCity = b;
	window.parseMsgResult = function(a) {
		chatLoadTime = (new Date).getTime();
		var b = !1;
		if("undefined" != typeof a.ret.evt && null != a.ret.evt && 0 < a.ret.evt.length)
			for(var c = a.ret.evt.length - 1; 0 <= c; c--) {
				var d = a.ret.evt[c];
				if(1 == d.typeid)
					resyncUserInfo(), showInfo(LNG.NEWCASTLESUCCESS);
				else if(2 == d.typeid)
					showNewMail();
				else if(3 == d.typeid)
					d.cid == mainStatus.CITY_ID && "undefined" != typeof reloadCity && reloadCity();
				else if(4 == d.typeid)
					resyncUserInfo();
				else if(5 == d.typeid)
					showInfo(d.txt);
				else if(6 == d.typeid) {
					if(null != userinfo.gift)
						for( c = 0; c < userinfo.gift.length; c++)
							if(userinfo.gift[c].id == d.id) {
								userinfo.gift.splice(c, 1);
								Utils.setCookie("user", userinfo);
								"f_city.html" == mainStatus.SUBVIEW && showGiftButton();
								break
							}
				} else
					7 == d.typeid ? CMA.reload(mainStatus.CITY_ID) : 8 == d.typeid && "undefined" != typeof sysupdate && 1 == sysupdate && ( b = !0)
			}
		if("undefined" != typeof a.ret.msg && null != a.ret.msg && 0 < a.ret.msg.length) {
			for( c = a.ret.msg.length - 1; 0 <= c; c--)
				d = a.ret.msg[c], chatmsg.push(d);
			for(var f = d = 0, c = a = 0; c < chatmsg.length; c++)
				0 == chatmsg[c].target_type ? d++ : 1 == chatmsg[c].target_type ? f++ : a++;
			d -= max_msg_lines;
			f -= max_msg_lines;
			a -= max_msg_lines;
			for( c = 0; c < chatmsg.length && (0 < d || 0 < f || 0 < a); c++)
				0 == chatmsg[c].target_type ? 0 < d && (chatmsg.splice(c, 1), c--, d--) : 1 == chatmsg[c].target_type ? 0 < f && (chatmsg.splice(c, 1), c--, f--) : 0 < a && (chatmsg.splice(c, 1), c--, a--);
			"f_chat.html" != mainStatus.SUBVIEW && ( d = chatmsg[chatmsg.length - 1], 0 == d.from_id ? $("#main_chatmsg").html(d.line_txt) : $("#main_chatmsg").html("[" + LNG.CHATCHANNEL[d.target_type] + "]&nbsp;<b>" + d.from_name + "</b>:&nbsp;" + d.line_txt), chatDisplay = (new Date).getTime() + 8E3, $("#main_chatmsg").show());
			EMA.trigger("newchatmsg")
		}
		if(b)
			location.href = "js-call:sysupdate"
	};
	window.hideChatBar = function() {
		$("#main_chatmsg").hide()
	};
	$("#gohome").click(function() {
		b();
		return !1
	});
	$("#milbothome").click(function () {
		var cIndex = parseInt($("#cities SELECT").val())+1;
		if(cIndex == userinfo.city.length) { cIndex = 0; } 
		$("#cities SELECT").val(cIndex);
		b();
    	
    	// mainStatus.CITY = a, mainStatus.CITY_ID = userinfo.city[cIndex].id, 0 <= mainStatus.CITY && "undefined" != typeof reloadCity && (reloadCity(), CMA.reload(mainStatus.CITY_ID))
    	// refreshUserInfo();
		// EMA.trigger("cityinfoupdate")
    	return !1
	});
	$("#cities select").change(function() {
		b();
		return !1
	});
	$("#tipsetbox").change(function() {
		!0 == $("#tipsetbox").attr("checked") ? Utils.setCookie("notip", 1, 365) : Utils.delCookie("notip");
		return !1
	});
	$("#menu1").click(function() {
		main_loadDiv("f_quest.html", function() {
		});
		return !1
	});
	$("#menu2").click(function() {
		main_loadDiv("f_item.html", function() {
		});
		return !1
	});
	$("#menu3").click(function() {
		main_loadDiv("f_trade.html", function() {
		});
		return !1
	});
	$("#menu4").click(function() {
		main_loadDiv("f_shop.html", function() {
		});
		return !1
	});
	$("#menu5").click(function() {
		main_loadDiv("f_map.html", function() {
		});
		return !1
	});
	$("#menu6").click(function() {
		main_loadDiv("f_fav.html", function() {
		});
		return !1
	});
	$("#menu7").click(function() {
		main_loadDiv("f_ally.html", function() {
		});
		return !1
	});
	$("#menu8").click(function() {
		main_loadDiv("f_chat.html", function() {
			chatDisplay = 0;
			$("#main_chatmsg").hide()
		});
		return !1
	});
	$("#menu9").click(function() {
		main_loadDiv("f_mail.html", function() {
			hideNewMail();
			if("undefined" != typeof resetbadge && 1 == resetbadge)
				location.href = "js-call:resetbadge"
		});
		return !1
	});
	$("#menu10").click(function() {
		main_loadDiv("f_rank.html", function() {
		});
		return !1
	});
	$("#menu11").click(function() {
		main_loadDiv("f_help.html", function() {
		});
		return !1
	});
	$("#confirm_yes").click(function() {
		$.isFunction(okfunc) && okfunc();
		$("#confirm").hide();
		return !1
	});
	$("#confirm_no").click(function() {
		$("#confirm").hide();
		return !1
	});
	$("#info_confirm").click(function() {
		$.isFunction(infofunc) && infofunc();
		$("#info").hide();
		pnlLoading.hide();
		return !1
	});
	$("#u_loot").click(function() {
		var a = $("#u_cities SELECT").val().split(".");
		Utils.setCookie("warinfo", {
			type : 0,
			x : a[0],
			y : a[1]
		}, 1);
		main_loadDiv("f_city_military.html");
		$("#u_info").hide();
		return !1
	});
	$("#u_scout").click(function() {
		var a = $("#u_cities SELECT").val().split(".");
		Utils.setCookie("warinfo", {
			type : 3,
			x : a[0],
			y : a[1]
		}, 1);
		main_loadDiv("f_city_military.html");
		$("#u_info").hide();
		return !1
	});
	$("#u_map").click(function() {
		var a = $("#u_cities SELECT").val().split(".");
		main_loadDiv("f_map.html", {
			x : a[0],
			y : a[1]
		});
		$("#u_info").hide();
		return !1
	});
	$("#u_mail").click(function() {
		GlobalNav.WriteMail($("#u_race b").text());
		$("#u_info").hide();
		return !1
	});
	$("#u_close").click(function() {
		$("#u_info").hide();
		return !1
	});
	$("#u_favorite").click(function() {
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
			key : key,
			nick : $("#u_race b").text()
		}, function(a) {
			showInfo(translate(LNG.ADDFAVDONE, a.ret.friend.nick))
		});
		return !1
	});
	$("#brink img").click(function() {
		hideHint();
		hideBrink();
		$.isFunction(brinkfunc) && brinkfunc();
		return !1
	});
	$("#server_notice_close").click(function() {
		$("#server_notice").hide();
		return !1
	});
	$("#race em").addClass("race" + userinfo.nationid);
	refreshUserInfo();
	ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_TASK, {
		key : key,
		action : "task_list"
	}, function(a) {
		quests = a.ret.quest;
		!CheckGuideDisplay(null) && 1 != Utils.getCookie("notip") && ( a = START_TIPS[Math.round(Math.random() * (START_TIPS.length - 1))], showTip(a))
	});
	EMA.bind("beginCDTimeup", function(a) {
		for(var b = 0; b < a.length; )
			0 == a[b].cdtype ? (mainStatus.CITY_INFO.setLevel(a[b].target, mainStatus.CITY_INFO.getLevel(a[b].target) - 1), mainStatus.CITY_INFO[0]++, EMA.trigger("cityinfoupdate")) : 1 == a[b].cdtype && mainStatus.CITY_INFO.setLevel(a[b].target, mainStatus.CITY_INFO.getLevel(a[b].target) + 1), b++
	});
	$.getScript("autogen/building_func.js");
	$.getScript("autogen/tech_func.js");
	Utils.prepare(function(a) {
		$.getJSON("translation/" + window._l + "/building_data.js", function(b) {
			mainStatus.BUILDING_DATA = b;
			a()
		});
		$.getJSON("translation/" + window._l + "/hero_data.js", function(b) {
			mainStatus.HERO_DATA = b;
			a()
		});
		$.getJSON("translation/" + window._l + "/item_data.js", function(b) {
			mainStatus.ITEM_DATA = b;
			a()
		});
		$.getJSON("translation/" + window._l + "/soldier" + userinfo.nationid + "_data.js", function(b) {
			mainStatus.SOLDIER_DATA = b;
			a()
		});
		$.getJSON("translation/" + window._l + "/tech_data.js", function(b) {
			mainStatus.TECH_DATA = b;
			a()
		});
		$.getJSON("translation/" + window._l + "/quest_data.js", function(b) {
			mainStatus.QUEST_DATA = b;
			a()
		});
		$.getJSON("translation/" + window._l + "/mission_data.js", function(b) {
			mainStatus.MISSION_DATA = b;
			a()
		});
		$.getJSON("translation/" + window._l + "/scheme_data.js", function(b) {
			mainStatus.SCHEME_DATA = b;
			a()
		})
	}, function() {
		return mainStatus.BUILDING_DATA && mainStatus.HERO_DATA && mainStatus.ITEM_DATA && mainStatus.SOLDIER_DATA && mainStatus.QUEST_DATA && mainStatus.MISSION_DATA && mainStatus.SCHEME_DATA && mainStatus.TECH_DATA
	}, function() {
		b();
		CMA.reload(mainStatus.CITY_ID);
		pnlLoading.find("label").text("");
		pnlLoading.removeClass("loading1").addClass("loading2")
	})
});
var GlobalNav = {
	WriteMail : function(a) {
		main_loadDiv("f_mail.html", {
			tab : "writemail",
			reciver : a
		})
	},
	Loot : function(a, b) {
		Utils.setCookie("warinfo", {
			type : 0,
			x : a,
			y : b
		}, 1);
		main_loadDiv("f_city_military.html")
	},
	Attack : function(a, b) {
		Utils.setCookie("warinfo", {
			type : 7,
			x : a,
			y : b
		}, 1);
		main_loadDiv("f_city_military.html")
	},
	Occupy : function(a, b) {
		Utils.setCookie("warinfo", {
			type : 8,
			x : a,
			y : b
		}, 1);
		main_loadDiv("f_city_military.html")
	},
	Scout : function(a, b) {
		Utils.setCookie("warinfo", {
			type : 3,
			x : a,
			y : b
		}, 1);
		main_loadDiv("f_city_military.html")
	}
};

/*
 * Bot Functions
 */
//
var botEMA = EMA.getProxy();
var nCityIndex = 0;
var g_autobuyfood = true;
var notiWarinfo = true;
var bFBBug = false;

var staticBuff = {
	ALLY_HEROATTACK : 5,
	ALLY_HERODEF : 5,
	ALLY_ARMYDEF : 5,
	TECH_WM : 20,
	TECH_DM : 20,
	TECH_SOD : 20,
	TECH_SOA : 20,
	TECH_CS : 19,
	TECH_DS : 19,
	_END : ""
}

var heroBuff = {
	HERO_ATTACK : 50,
	HERO_DEFENSIVE : 30,
	_END : ""
}

var g_SmartBot = false;
var g_npclist = null;
var g_npcindex = 0;

var scoutpoint = {
	server : "k21",
	offset : 0,
	limit : 50,
	level : 1,
}

function displayMsg(msg) {
	"f_chat.html" != mainStatus.SUBVIEW && ($("#bot_msg").html(msg), $("#bot_msg").show());
	//EMA.trigger("newchatmsg");
	window.droid && window.droid.botlog && window.droid.botlog(msg);
}

function ajaxCallMB(a, c, e, f) {
	"boolean" == typeof f && (d = f);
	c = c || {};
	// c._l = window._l;
	// c._p = window._p ? window._p : "";
	$.ajax({
		type : "GET",
		url : a,
		data : c,
		dataType : "jsonp",
		jsonp : "jsonpcallback",
		timeout : CONFIG.AJAX_TIMEOUT,
		cache : !1,
		success : function (a) {
			// onAjaxSuccess(a, e, f)
			if (a.code == CONFIG.SUCCESS) {
				if ($.isFunction(e)) e(a);
			} else {
				if ($.isFunction(f)) f(a);
				displayMsg(LNG.ERROR.SERVER[a.code]);
			}
			pnlLoading.hasClass("loading2") && pnlLoading.hide()
		},
		error : function (a, d) {
			if ($.isFunction(f)) {f(a,d)} 
			var b = LNG.ERROR.AJAX;
			if(!(null != a && (0 == a.readyState || 0 == a.status))) {
				switch (d) {
					case "timeout":
						b = LNG.ERROR.AJAX_TIMEOUT;
						break;
					case "error":
						b = LNG.ERROR.AJAX_ERROR;
						break;
					case "parsererror":
						b = LNG.ERROR.AJAX_PARSE_ERROR
				}
				displayMsg(b);
				pnlLoading.hasClass("loading2") ? (pnlLoading.hide(), showInfo(b)) : showInfo(b, function() {
					location.href = "start.html"
				})
			}
		}
	});
}

function checkwarinfo(cityid) {
	ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, {
		key : key,
		act : "warinfo",
		city : cityid
	}, function(a) {
		var e = a.ret[1];
		parsingwarinfo(a.ret[0]);
	});
}

function parsingwarinfo(info) {
	null != info && 0 < info.length ? ($.each(info, function (index, value) {
		if (value[1] == 6 && value[2] != 2 && value[2] != 5) {
			// if(value[2] == 0 || value[2] == 9) {autoDefense(value);}
			var header = LNG.CooldDownType[value[1]]+" : "+LNG.ACTIONTYPE[value[2]];
			var geninfo = value[7] != 0 ? mainStatus.HERO_DATA[value[7]].name : null;
			var troopinfo = "";
			if(null != value[5]) {
				for( d = 0; d < value[5].length; d++) {
					0 < value[5][d] && (troopinfo += mainStatus.SOLDIER_DATA[value[5][d]].name);
					null != value[6] && value[6].length > d && (troopinfo += "x" + value[6][d]);
					troopinfo += ',';
				}
			}
			var enermyinfo = "";
			null != value[8] && "" != value[8] && (enermyinfo += ' From ' + value[8] + ' ');
            null != value[9] && "" != value[9] && (enermyinfo += value[9])
			var To = value[4];
			var RemainTime = Utils.timeString2(value[3]);
			//showInfo(header+"\n"+"["+geninfo+":"+enermyinfo+"]"+troopinfo+"\n"+RemainTime);
			
			window.droid && window.droid.sendNoti && window.droid.sendNoti(header+":"+RemainTime, geninfo+":"+enermyinfo, 
				header+"\n"+"["+geninfo+":"+enermyinfo+"]"+troopinfo+"\n"+RemainTime);
		}
	})):{};
}

function confirmAttackNpc(a, c, e, func) {		
		var attr = {};
		$.extend(attr, c);
		$.extend(attr, e);
		attr.action = "war_task";
		//pnlLoading.show();
		attr.cost_food = 1; // injection
		var ncityid = attr.city;
		ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_ACTION, attr, function (attr) {
			if (mainStatus.CITY_ID == ncityid) {
				CMA.add(attr.ret.cd);
			}
		}, function (a) {
			func && func(a);
			if (a.code.indexof("visit") != -1) {
				displayMsg(a.code);
				g_SmartBot = false;
				showInfo("You visit too often");
			} else if(a.code == 2537 || a.code == 2510) {
				displayMsg(LNG.ERROR.SERVER[a.code]);
				g_nextcity = true;
			}
		})	
}
	

// function attackNpc(heroInfo, posX, posY, armyCnt) {
	// var attackInfo = {
		// key : key,
		// city : userinfo.city[nCityIndex].id,
		// action : "do_war",
		// attack_type : 7,
		// gen : heroInfo.gid,
		// area : posX,
		// area_x : posY,
		// soldier_num15 : armyCnt
	// };
// 
	// ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, attackInfo, function(a) {
		// confirmAttackNpc(LNG.ACTIONTYPE_FULL[3], attackInfo, a.ret)
	// }, function(a) {
// 
	// })
// 
	// return !1
// }

function attackNpc2(heroInfo, posX, posY, armyCnt, cityId, func) {
	var attackInfo = {
		key : key,
		city : cityId,
		action : "do_war",
		attack_type : 7,
		gen : heroInfo.gid,
		area : posX,
		area_x : posY,
		soldier_num15 : armyCnt
	};

	ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, attackInfo, function(a) {
		confirmAttackNpc(LNG.ACTIONTYPE_FULL[3], attackInfo, a.ret, func)
	}, function(a) {
		func && func(a);
	})

	return !1
}

function autoDefense() {
	// ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SOLDIER_EDUCATE, {
            // key: key,
            // action: "def",
            // city: mainStatus.getCity().id,
            // defense: 1//defense
        // }, function () {});
}

function calcRobberPower(barbarianCnt, robberCnt, level) {
	var ROBBERHERO = {
	2 : new Array(35,35),
	1 : new Array(35,40),
	_END : ""
	}
	var attack = Math.floor(15*(1+(ROBBERHERO[level][0]*0.005))*(150/100)*barbarianCnt)+
		Math.floor(60*(1+(ROBBERHERO[level][0]*0.005))*(180/100)*robberCnt);
	var defensive =  Math.floor(8*(1+(ROBBERHERO[level][1]*0.005))*barbarianCnt)+
		Math.floor(10*(1+(ROBBERHERO[level][1]*0.005))*robberCnt);
	
	var powerInfo = {
		attack : attack,
		defensive : defensive
	}

	return powerInfo;
}

function calcDefensive(attack) {
	var troop15Cnt = Math.floor(attack/((180*(1+(Math.floor((heroBuff.HERO_DEFENSIVE*(1+(staticBuff.ALLY_HERODEF/20))))*0.005))*(1+((staticBuff.TECH_DM+staticBuff.TECH_DS)/20)))*(1+staticBuff.ALLY_ARMYDEF/100)));
	return troop15Cnt;
}

var g_heros = null;
var g_nextcity = false;
var g_attackcntbycity = 10;
var g_nAttackHeroCnt = 0;
function assignTroop(enemy, soldierCnt) {
	if(!g_SmartBot) {
		g_npclist=null,g_npcindex=0,g_heros=null;
		window.droid && window.droid.clearCache && window.droid.clearCache();
		displayMsg("assignTroop is stopped");
		return;
	}
	displayMsg("["+userinfo.city[nCityIndex].name+"] assignTroop("+enemy.x+","+enemy.y+")");
	ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
		key : key,
		city : userinfo.city[nCityIndex].id,
		action : "gen_list",
		extra : 1
	}, function(i) {
		--g_attackcntbycity;
		g_heros = i.ret.hero;
		
		if("undefined" != typeof g_heros && null != g_heros && 0 != g_heros.length) {
			for(var i = 0; i < g_heros.length; i++) {
				var gen = g_heros[i];
				var d = mainStatus.HERO_DATA[gen.gid];
				if(d.rank == "a") {
					g_heros.splice(i,1);
					i--;
				}
			}
			displayMsg("["+userinfo.city[nCityIndex].name+"] attackNpc2("+enemy.x+","+enemy.y+")");	
			for(var iCnt = 0; iCnt < g_heros.length; iCnt++) {
				// if(g_heros[iCnt].c2 < enemy.requiredTroop) {
					// g_heros.splice(iCnt,1);
					// continue;
				// }
				attackNpc2(g_heros[iCnt], enemy.x, enemy.y, enemy.requiredTroop, userinfo.city[nCityIndex].id, function(a){
					if(a.code == 2544) {
						displayMsg("["+userinfo.city[nCityIndex].name+"] Not enough soldier");
						g_nextcity = true;
					} else if (a.code.indexof("visit") != -1){
						displayMsg(a.code);
						g_SmartBot = false;
						showInfo("You visit too often");
						return;
					} else {
						g_nAttackHeroCnt++;
					}
				});
				soldierCnt -= enemy.requiredTroop;
			}
			
//			if(g_nAttackHeroCnt > 10) {
//				setTimeout(function(enemy, soldierCnt){
//					showConfirm("do you wanna go to next city", function(enemy, soldierCnt){
//						setTimeout(assignTroop(enemy,soldierCnt), 0);
//					});
//				}, 1000*60*3)
//				return;
//			}
			
			// if(g_heros.length == 0 || g_nextcity || soldierCnt < 0) {
			if(g_attackcntbycity<0) {
				g_attackcntbycity = 10;
				nCityIndex++;
				if(nCityIndex == userinfo.city.length) { nCityIndex = 0; }
				displayMsg("Move to "+userinfo.city[nCityIndex].name+"\n"+"NPC index:"+g_npcindex+"/"+g_npclist.length);
				setTimeout(assignTroop(enemy,soldierCnt),1000*60*3);
//				setTimeout(function(enemy, soldierCnt){
//					showConfirm("do you wanna go to next city", function(enemy, soldierCnt){
//						setTimeout(assignTroop(enemy,soldierCnt), 0);
//					});
//				}, 1000*60*3)
				return;
			}
			
			g_npcindex++;
			if(g_npclist.length > g_npcindex) {
				setTimeout(parseFAVReport(g_npclist[g_npcindex]), 0);
			} else {
				setTimeout(myAttack(), 0);
			}	
		} else {
			g_attackcntbycity = 10;
			nCityIndex++;
			if(nCityIndex == userinfo.city.length) { nCityIndex = 0; }
			displayMsg("Move to "+userinfo.city[nCityIndex].name+"\n"+"NPC index:"+g_npcindex+"/"+g_npclist.length);
			window.droid && window.droid.clearCache && window.droid.clearCache();
//			setTimeout(assignTroop(enemy,soldierCnt),Math.floor(Math.random() * 5000)+5000)
			setTimeout(assignTroop(enemy,soldierCnt),1000*60*3)
//			setTimeout(function(enemy, soldierCnt){
//				showConfirm("do you wanna go to next city", function(enemy, soldierCnt){
//					setTimeout(assignTroop(enemy,soldierCnt), 0);
//				});
//			}, 1000*60*3)
			
		}
	}, function(a) {
		setTimeout(assignTroop(enemy,soldierCnt),Math.floor(Math.random() * 5000)+3000);
//		setTimeout(function(enemy, soldierCnt){
//			showConfirm("do you wanna retry assignTroop", function(enemy, soldierCnt){
//				setTimeout(assignTroop(enemy,soldierCnt), 0);
//			});
//		}, 1000*60*3)
	});
}

function parseFAVReport(npc) {
	if(!g_SmartBot) {
		g_npclist = null,g_npcindex=0;
		window.droid && window.droid.clearCache && window.droid.clearCache();
		displayMsg("parseFAVReport is stopped");
		return;
	}
	displayMsg("["+userinfo.city[nCityIndex].name+"] Get npc info ("+npc[1]+"/"+npc[2]+")" );
	ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
		key : key,
		act : "getfavnpc",
		fid : npc[0]
	}, function(b) {
		var info = b.ret.fav[1];
		var horrorCnt = 0;
		var nightmareCnt = 0;
		var a1 = info.match("(산도적)\\(\\d*\\)");
		if(a1 != null) {
			a1[0] = a1[0].replace ("산도적(", "");
			a1[0] = a1[0].replace(")", "");
			horrorCnt = parseInt(a1[0]);
		}
		var a2 = info.match("(화적)\\(\\d*\\)");
		if (a2 != null) {
			a2[0] = a2[0].replace ("화적(", "");
			a2[0] = a2[0].replace(")", "");
			nightmareCnt = parseInt(a2[0]);
		}
		if (horrorCnt > 1000) {
			g_npcindex++;
			if(g_npclist.length > g_npcindex) {
				setTimeout(parseFAVReport(g_npclist[g_npcindex]), 0);
			} else {
				setTimeout(myAttack(), 0);
			}
			return;
		}
		var powerinfo = calcRobberPower(horrorCnt, nightmareCnt, npc[3]);
		var enemyInfo = {
			id : npc[0],
			x : npc[1],
			y : npc[2],
			level : npc[3],
		}
		$.extend(enemyInfo, powerinfo);
		$.extend(enemyInfo, {requiredTroop : calcDefensive(enemyInfo.attack+10000),});
		
		ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_SOLDIER_EDUCATE, {
			key : key,
			city : userinfo.city[nCityIndex].id
		}, function(b) {
			l = b.ret;
			var soldierCnt = 0;
			$.each(l.soldiers, function(index, value) {
				if(value[0] == 15 && value[1] > 150) {
					soldierCnt = value[1];
				}
			});
			if(soldierCnt > 100) {
				setTimeout(assignTroop(enemyInfo, soldierCnt), 0);
			} else {
				nCityIndex++;
				if(nCityIndex == userinfo.city.length) { nCityIndex = 0; }
				displayMsg("Move to "+userinfo.city[nCityIndex].name+"\n"+"NPC index:"+g_npcindex+"/"+g_npclist.length);
				window.droid && window.droid.clearCache && window.droid.clearCache();
				setTimeout(parseFAVReport(npc), 1000*60*3);
			}
		}, function(a, d) {
			setTimeout(parseFAVReport(npc), 1000);
		}); 
	}, function(){
		// setTimeout(parseFAVReport(npc), Math.floor(Math.random() * 3000)+1000);
		setTimeout(myAttack(),100);
	})
}

function myAttack() {
	displayMsg("myAttack");
	ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
		key : key,
		act : "getfavnpc",
		cat : 2
	}, function(c) {
		displayMsg("NPC ret code :" + c.code)
		var npcList = c.ret.favs;
		displayMsg("NPC length :" + npcList.length)
		// if(!bUseBug) {
		// prepareAttackBug(npcList, soldierCnt);
		// } else {
		if("undefined" != typeof npcList && null != npcList && 0 != npcList.length) {
			for( i = 0; i < npcList.length; i++) {
				if(npcList[i][4] >= 3) {
					npcList.splice(i, 1);
					i--;
				} else if(npcList[i][3] > 1) {
					var c = CONFIG.MYHOST + CONFIG.FUNC_FAV;
					ajaxCall(c, {
						key : key,
						id : npcList[i][0]
					}, function() {
						npcList.splice(i, 1)
						i--;
					})
				}
			}
			g_npclist = npcList;
			displayMsg("Avaiable NPC :" + g_npclist.length)
			g_npcindex = 0;
			if(g_npclist.length > 0) {
				setTimeout(parseFAVReport(g_npclist[g_npcindex]), 0);
			} else {
				displayMsg("available NPC is empty. bot is going to be stopped");
			}
		}
		// }
	}, function(a, b) {
		// botEMA.async("botEMA");
		showConfirm("Can not receive NPC list from server. do you wanna retry?", function() {
			setTimeout(myAttack(), 3000);
		});
	});
}


function startBot() {
	window.droid && window.droid.clearCache && window.droid.clearCache();
	if(!bUseBug) {
		ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_SOLDIER_EDUCATE, {
			key : key,
			city : userinfo.city[nCityIndex].id
		}, function(b) {
			l = b.ret;
			var bAttack = 0;
			var soldierCnt = 0;
			$.each(l.soldiers, function(index, value) {
				if(value[0] == 15 && value[1] > 150) {
					soldierCnt = value[1];
					bAttack = 1;
					return;
				}
			});
			if(bAttack == 0) {
				nCityIndex++;
				if(nCityIndex == userinfo.city.length) { nCityIndex = 0; }
				botEMA.async("botEMA");
			} else {
				myAttack(soldierCnt);
			}
		}, function(a, d) {
			
		});
	} else {
		for(var i=0;i < userinfo.city.length;i++) {
			if(mainStatus.CITY_ID == userinfo.city[i].id) {
				nCityIndex = i;
			}
		}
		myAttack(99999);
	}
}

var exploreX = 200;
var exploreY = 110;
function setupExploreMap() {
	botEMA.bind("EMAexploreMap", exploreMap);
	botEMA.bind("EMAstoreMap", storeMap);
	botEMA.async("EMAexploreMap");
}

function exploreMap() {
	ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_MAP, {
		key : key,
		x : exploreX,
		y : exploreY
	}, function(a) {
		var d = a.ret;
		$.each(d.map, function(index, value) {
			if(value[2] == 2 || value[2] == 1) {
				setTimeout(storeMap("k21", value[0], value[1], value[2]), Math.floor(Math.random() * 3000)+2000);
			}
		});
		if(exploreX < 280) {
			exploreX += 7;
		} else {
			if(exploreY < 280) {
				exploreY += 7;
				exploreX = 1;
			} else {
				showInfo("ExploreMap : done!!")
				botEMA.unbind("EMAexploreMap");
			}
		}
		// botEMA.async("EMAexploreMap", exploreX, exploreY);
		setTimeout(exploreMap(), 3000);
	}, function(a) {
		botEMA.async("EMAexploreMap");
	});
	
}

function storeMap(server, x, y, level) {
	ajaxCallMB("http://nilbons.appspot.com/putHunterPoint.do", {
		server : server,
		x : x,
		y : y,
		level : level
	}, function(a) {
	}, function(a) {
		botEMA.async("storeMap", server, x, y);
	});
}


function startScout() {
	botEMA.bind("getHMap", getHunterMap);
	botEMA.bind("goScout", goScout);
	
	scoutpoint.server = "k21";
	scoutpoint.offset = parseInt($("#tr_troop").val());
	scoutpoint.limit = 100;
	scoutpoint.level = 1;
//	var ret = Utils.getCookie("scoutinfo");
//	ret!=null?scoutpoint=ret:null;
	
	botEMA.async("getHMap", 
	scoutpoint.server, scoutpoint.offset, scoutpoint.limit, scoutpoint.level);
	showInfo("startScout with offset-"+scoutpoint.offset);
}

function stopScout() {
	botEMA.unbind("getHMap");
	botEMA.unbind("goScout");
//	Utils.setCookie("scoutinfo", scoutpoint);
	g_huntermaps = null;
	g_hunter_index = 0;
	showInfo("stopScout");
}

var g_huntermaps = null;
var g_hunter_index = 0;
function getHunterMap(server, offset, limit, level) {
	ajaxCallMB("http://nilbons.appspot.com/getHunterPoint.do", {
		server : server,
		offset : offset,
		limit : limit,
		level : level
	}, function(a) {
		g_huntermaps = a.ret;
		g_hunter_index = 0;
		if (g_huntermaps.length == 0) {
			showInfo("no list from server :"+scoutpoint.offset);
			stopScout();
			return;
		}

		var attackInfo = {
			key : key,
			city : mainStatus.CITY_ID,
			action : "do_war",
			attack_type : 3,
			tai_num : 1,
			area : g_huntermaps[g_hunter_index].x,
			area_x : g_huntermaps[g_hunter_index].y
		};

		setTimeout(goScout(attackInfo), 0);
	}, function() {
		showInfo("failure to get hunter maps from server");
	});
}

function goScout(attackInfo) {
	ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, attackInfo, function(a) {
		confirmAttackNpc(LNG.ACTIONTYPE_FULL[3], attackInfo, a.ret);
		
		if (a.code != 0) {
			stopScout();
			showInfo("goScout is failed");
			return;
		}
		g_hunter_index++;
		if(g_hunter_index >= g_huntermaps.length) {
			showInfo("goScout Done");
			return;
		}
		var nextattack = {
			key : key,
			city : mainStatus.CITY_ID,
			action : "do_war",
			attack_type : 3,
			tai_num : 1,
			area : g_huntermaps[g_hunter_index].x,
			area_x : g_huntermaps[g_hunter_index].y
		};
		setTimeout(goScout(nextattack), Math.floor(Math.random() * 3000)+2000)
	}, function(a) {
		setTimeout(goScout(attackInfo), 10000);
	}, function() {
		
	})
}

function checkScoutResult(a, b) {
	ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_WAR_RESULT, {
		key : key,
		page : b,
		type : a
	}, function(c) {
		null != c.ret.war && $.each(c.ret.war, function(i, v) {
			setTimeout(addFAV(v), Math.floor(Math.random() * 3000)+1000);
		});
		showInfo("checkScoutResult Done");
	}, function() {
		setTimeout(checkScoutResult(a,b), 0);
	});
}

function addFAV(v) {
	displayMsg("addFAV"+v.id);
	ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
		key : key,
		act : "addreport",
		wid : v.id,
		cat : 2
	}, function(a) {
		displayMsg("deleteScoutResult"+v.id);
		deleteScoutResult(v.id);
	}, function(a) {
		if(a.code == 5301) {
			displayMsg("already exist"+v.id);
			deleteScoutResult(v.id);
		} else {
			setTimeout(addFAV(v),0);	
		}
		
	});
}

function parseScoutReport(v) {
	ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_WAR_DETAIL, {
		key : key,
		id : v.id
	}, function(e) {
		var result = e.ret.scout_report.result;
		var horrorCnt = 0;
		var nightmareCnt = 0;
		var a1 = result.match("(Horror)\\(\\d*\\)");
		if(a1 != null) {
			a1[0] = a1[0].replace ("Horror(", "");
			a1[0] = a1[0].replace(")", "");
			horrorCnt = parseInt(a1[0]);
		}
		
		var a2 = result.match("(Nightmare)\\(\\d*\\)");
		if (a2 != null) {
			a2[0] = a2[0].replace ("Nightmare(", "");
			a2[0] = a2[0].replace(")", "");
			nightmareCnt = parseInt(a2[0]);
		}
		
		var enemyInfo = {
			horror : horrorCnt,
			nightmare : nightmareCnt
		}
		setTimeout(storeToServer(v, enemyInfo),0);
	}, function() {
		setTimeout(parseScoutReport(id),0);
	});
}

function storeToServer(v, info) {
	ajaxCallMB("http://nilbons.appspot.com/putHunterPoint.do", {
		server : scoutpoint.server,
		x : v.dx,
		y : v.dy,
		barbarian : info.horror,
		robber : info.nightmare,
		checked : 1
	}, function(a) {
		deleteScoutResult(v.id);
	}, function() {
		setTimeout(storeToServer(v, info),0);
	});
}

function deleteScoutResult(id) {
	ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_WAR_RESULT, {
		key : key,
		action : "delete",
		id : id
	}, function() {

	}, function() {
		setTimeout(deleteScoutResult(id), 100);
	})
}

function confirmTrasportMilbot(a, c, e, golds) {

	var attr = {};
	$.extend(attr, {
		take_num : e.carry,
		travel_sec : e.travel_sec,
		distance : e.distance,
		action_rices : e.cost_rice,
		action_woods : e.cost_wood,
		action_irons : e.cost_iron,
		action_golds : e.cost_gold,
		rices : 0,
		woods : 0,
		irons : 0,
		golds : golds
	});
	$.extend(attr, c);
	attr.action = "war_task";
	var ncityid = attr.city;

	ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_ACTION, attr, function(attr) {
		if(mainStatus.CITY_ID == ncityid) {
			CMA.add(attr.ret.cd);
		}
	}, function(a) {

	})
}


function transportMilbot(posX, posY, cityIndex, troopCnt, golds) {
	var attackInfo = {
		key : key,
		city : userinfo.city[cityIndex].id,
		action : "do_war",
		attack_type : 2,
		area : posX,
		area_x : posY,
		soldier_num10 : troopCnt
	};
	ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, attackInfo, function(a) {
		confirmTrasportMilbot(LNG.ACTIONTYPE_FULL[2], attackInfo, a.ret, golds)
	}, function(a) {

	})

	return !1
}

//for automatic fb
var g_fbTimerId;
var g_fbCurIndex = 0;
var g_fbLevel = 4;
// var g_fbPathLev1 = new Array(0, 1, 2, 4, 5, 8);
var g_fbPathLev1 = new Array(0, 1, 4, 7, 6, 10, 12, 13, 15);
var g_fbHeroIds = new Array();
var g_fbHeros = new Array();
var g_bRefreshFb = false;


function fbAttack(a, b, c) {
	for(var i=0; i<c; i++) {
		ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_FB_ATTACK, {
	    	key: keyinfo.key,
	        gen: a,
	        pos: b
		}, function (e) {			
		});
	}	
}

function getPathIndex(val) {	
	for(var i=0; i<g_fbPathLev1.length; i++) {
		if(val == g_fbPathLev1[i]) { 
			return i;
		}
	}	
}

function getNextfbLoc(val) {
	for(var i=0; i<g_fbPathLev1.length; i++) {
//		if(g_fbPathLev1[i] < val) {
//			continue;
//		} else if(g_fbPathLev1[i] == val) {
//			if(i < g_fbPathLev1.length) {
//				return g_fbPathLev1[i+1];
//			} else {
//				return -1;
//			}			
//		} else if(g_fbPathLev1[i] > val) {
//			return g_fbPathLev1[i];
//		}
		if (g_fbPathLev1[i] == val) {
			return ((i+1)==g_fbPathLev1.length)?-1:g_fbPathLev1[i+1];
		}
		return -1;
	}
}

function fbAttackManager(loopCnt) {	
	var nAttackCnt = loopCnt;	            		                        			
	g_fbTimerId = setInterval(function(a) {		
		// check current step
		ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_FB_LIST, {
            key: keyinfo.key
        }, function (b) {
        	if("undefined" != typeof b.ret.status && null != b.ret.status) {
        		var fbLoc;
        		if(b.ret.status.length == 0) {
        			fbLoc = 0;
        		} else {
        			for(var i=0; i<g_fbPathLev1[g_fbPathLev1.length-1]; i++) {
        				if("undefined" != typeof b.ret.status[i] && null != b.ret.status[i]) {
        					fbLoc = b.ret.status[i];
        				} else {
        					break;
        				}
        			}
        		}
        		
        		if(fbLoc == g_fbPathLev1[g_fbPathLev1.length-1]) {            	
               		clearInterval(g_fbTimerId);           		           		           		
               		ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_FB_OUT, {
                        key: keyinfo.key
                    }, function (b) {
                    	displayMsg("[FB]Cleared FB");
                    	setTimeout(fbClearAll(), 3000);
                    }, function () {
                    	displayMsg("[FB]Failed to quit FB. Quit FB manually.");
                    });
                } else {
                	var nextFbLoc = getNextfbLoc(fbLoc);
                	if(nextFbLoc < 0) {
                		displayMsg("[FB]Unknown Error!!");
                		clearInterval(g_fbTimerId);
                	} else {
                		displayMsg("[FB]Trying to proceed step<" + nextFbLoc + ">");
                    	setTimeout(fbAttack(g_fbHeroIds[0], nextFbLoc, loopCnt), 3000);	
                	}            	
                }
        	}        	     
        }, function(c) {
        	displayMsg("[FB]Can't retrieve current step");
        })		

   	}, 3 * 60 * 1000);    	
}

function fbStart(bFbStarted) {
	displayMsg("[FB]Start FB level 1");
	var nAttackCnt = 100;
	if(bFbStarted) {				 
		fbAttackManager(nAttackCnt);
	} else {
		var hero1=0, hero2=0;
		for(var i=0; i < g_fbHeros.length;i++) {
			if(g_fbHeros[i].c2 > 1500) {
				hero1 = g_fbHeros[i].gid;
			} else {
				hero2 = g_fbHeros[i].gid;
			}
		}
		ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_FB_START, {
			key: keyinfo.key,
			city: mainStatus.CITY_ID,
			fb: g_fbLevel-1,
			gen: hero1 + "|" + hero2,
			soldier_num8: "700|0",
			soldier_num15: "0|1",
			soldier_num17: "800|0"
		}, function (a) {			
			fbAttackManager(nAttackCnt);
	    }, function(a) {
	    	displayMsg("[FB]Stopped! Failed to start FB!");
	    	setTimeout(fbStart(bFbStarted), 100);
	    });	
	}
}

function fbReadyAndGo(bHasHero) {	
	if (bHasHero) {
		fbStart(true);
	} else {
		ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
			key : key,
			city : mainStatus.CITY_ID,
			action : "gen_list",
			extra : 1
		}, function(i) {		
			var heros = i.ret.hero;
			if("undefined" != typeof heros && null != heros && 1 < heros.length) {
				for(var i = 0; i < heros.length; i++) {
					var gen = heros[i];
					var d = mainStatus.HERO_DATA[gen.gid];
					if(d.rank == "a") {
						heros.splice(i,1);
						i--;
					} else {
						g_fbHeroIds.push(gen.gid);
					}
				}
				g_fbHeros = heros;				
				Utils.setCookie("fbHeros", g_fbHeroIds);
				if(g_fbHeroIds.length > 1) {
					displayMsg("[FB]Ok. Assigned heros.");
					fbStart(false);
				} else {
					displayMsg("[FB]Stopped! No free heros..");
				}
			}
		}, function(a) {
			displayMsg("[FB]Stopped! Failed to get hero list! ");
		});	
	}
}

function fbClearAll() {
	ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_FB_LIST, {
		key: keyinfo.key
	}, function(a) {
		if("undefined" != typeof a.ret.times && null != a.ret.times) {			
			var remainFbTimes = a.ret.times;
			displayMsg("[FB]Remaining fb: " + remainFbTimes);
			if(remainFbTimes > 0) {			
				setTimeout(fbReadyAndGo(false), 1000);
			} else {
				showInfo("[FB]Cleard All FB of today");
				// if buy option is true
				if(g_bRefreshFb) {
					setTimeout(function() {
						ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_FB_ADDTIMES, {
		                    key: key
		                }, function(b) {
		                	showInfo("[FB]Refresh FB by using wonbo");
		                	setTimeout(fbClearAll(), 1000);
		                }, function(c){
		                	showInfo("[FB]Stopped! No more wonbo to refresh FB");
		                });	
					}, 1000);	
				}								
			}
		} else {
			displayMsg("[FB]is ongoing..");
			
			if("undefined" != typeof a.ret.remaining_time && null != a.ret.remaining_time && a.ret.remaining_time < 0) {
				ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_FB_OUT, {
	                key: keyinfo.key
	            }, function (b) {
	            	displayMsg("[FB]Quit timeout-FB and restart..");
	            	setTimeout(fbClearAll(), 3000);
	            }, function () {
	            	displayMsg("[FB]Stopped Failed to quit FB. Quit FB manually.");
	            });	
			} else {
				g_fbHeroIds = Utils.getCookie("fbHeros");				
				if(null != g_fbHeroIds[0] && null != g_fbHeroIds[1]) {		        	
		        	setTimeout(fbReadyAndGo(true), 1000);
				} else {
					displayMsg("[FB]Stopped! No army data");
				}				
			}
		}
		
	}, function(e) {
		displayMsg("[FB]Can't get FB info. Trying to get FB info again...");
		setTimeout(fbClearAll(), 1000);
	});
}


/*
 * New Bot for V2.21
 */
function mewConfirmAttack(a, c, e, okfunc, failfunc) {
	var attr = {};
	$.extend(attr, c);
	$.extend(attr, e);
	attr.action = "war_task";
	attr.cost_food = 1;
	var ncityid = attr.city;
	ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_ACTION, attr, function(attr) {
		okfunc && okfunc("confirm", attr);
		if(mainStatus.CITY_ID == ncityid) {
			CMA.add(attr.ret.cd);
		}
	}, function(a) {
		failfunc && failfunc("confirm", a);
	})
}
function newAttack(hero, posX, posY, troop, cityId, okfunc, failfunc) {
	var attackInfo = {
		key : key,
		city : cityId,
		action : "do_war",
		attack_type : 7,
		gen : hero.gid,
		area : posX,
		area_x : posY,
		soldier_num15 : troop
	};
	ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_ACTION_INFO, attackInfo, function(a) {
		okfunc && okfunc("attack", a);
		mewConfirmAttack(LNG.ACTIONTYPE_FULL[3], attackInfo, a.ret, okfunc, failfunc)
	}, function(a) {
		failfunc && failfunc("attack", a);
	})
}

var gb_SmartBot = false;
var gb_nCityIndex = 0;
var gb_enemyList = null;
var gb_enemyIndex = 0;

var gb_attackInterval = -1;
var gb_attckSucces = false;
var gb_attckNextNPC = false;
var gb_attckNextCity = false;
var gb_attackNextHero = false;
function startAttack() {
	displayMsg("controlAttack");
	
	gb_enemyList = null;
	gb_enemyIndex = 0;
	gb_attackInterval = -1;
	gb_attckSucces = false;
	gb_attckNextNPC = false;
	gb_attckNextCity = false;
	gb_attackNextHero = false;
	
	ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
		key : key,
		act : "getfavnpc",
		cat : 2
	}, function(c) {
		displayMsg("NPC ret code :" + c.code)
		var npcList = c.ret.favs;
		displayMsg("NPC length :" + npcList.length)

		if("undefined" != typeof npcList && null != npcList && 0 != npcList.length) {
			for( i = 0; i < npcList.length; i++) {
				if(npcList[i][4] >= 3) {
					npcList.splice(i, 1);
					i--;
				} else if(npcList[i][3] > 1) {
					var c = CONFIG.MYHOST + CONFIG.FUNC_FAV;
					ajaxCall(c, {
						key : key,
						id : npcList[i][0]
					}, function() {
						npcList.splice(i, 1)
						i--;
					})
				}
			}
			gb_enemyList = npcList;
			displayMsg("Avaiable NPC :" + gb_enemyList.length)
			gb_enemyIndex = 0;
			
			for(var i = 0; i < userinfo.city.length; i++) {
				if(mainStatus.CITY_ID == userinfo.city[i].id) {
					gb_nCityIndex = i;
				}
			}

			if(gb_enemyList.length > 0) {
				setTimeout(newParseFAVReport(gb_enemyList[gb_enemyIndex], function (enemy) {
					setTimeout(newAssignTroop(enemy, gb_nCityIndex), 0);
				}, function () {
					showConfirm("Can not receive NPC detailed info from server. do you wanna retry?", function() {
						setTimeout(newParseFAVReport(gb_enemyList[gb_enemyIndex], function (enemy) {
							setTimeout(newAssignTroop(enemy, gb_nCityIndex), 0);
						}), 3000);
					});
				}), 0);
			} else {
				displayMsg("available NPC is empty. bot is going to be stopped");
			}
		}
	}, function(a, b) {
		showConfirm("Can not receive NPC list from server. do you wanna retry?", function() {
			setTimeout(startAttack(), 3000);
		});
	});
}

function newParseFAVReport(npc, okFunc, failFunc) {
	if(!gb_SmartBot) {
		gb_enemyList = null,gb_enemyIndex=0;
		window.droid && window.droid.clearCache && window.droid.clearCache();
		displayMsg("newParseFAVReport is stopped");
		return;
	}
	displayMsg("["+userinfo.city[gb_nCityIndex].name+"] Get npc info ("+npc[1]+"/"+npc[2]+")" );
	ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
		key : key,
		act : "getfavnpc",
		fid : npc[0]
	}, function(b) {
		var info = b.ret.fav[1];
		var horrorCnt = 0;
		var nightmareCnt = 0;
		var a1 = info.match("(산도적)\\(\\d*\\)");
		if(a1 != null) {
			a1[0] = a1[0].replace ("산도적(", "");
			a1[0] = a1[0].replace(")", "");
			horrorCnt = parseInt(a1[0]);
		}
		var a2 = info.match("(화적)\\(\\d*\\)");
		if (a2 != null) {
			a2[0] = a2[0].replace ("화적(", "");
			a2[0] = a2[0].replace(")", "");
			nightmareCnt = parseInt(a2[0]);
		}
		if (horrorCnt > 1000) {
			gb_enemyIndex++;
			if(gb_enemyList.length > gb_enemyIndex) {
				setTimeout(newParseFAVReport(gb_enemyList[gb_enemyIndex], okFunc, failFunc), 0);
			} else {
				setTimeout(startAttack(), 0);
			}
			return;
		}
		var powerinfo = calcRobberPower(horrorCnt, nightmareCnt, npc[3]);
		var enemyInfo = {
			id : npc[0],
			x : npc[1],
			y : npc[2],
			level : npc[3],
		}
		$.extend(enemyInfo, powerinfo);
		$.extend(enemyInfo, {requiredTroop : calcDefensive(enemyInfo.attack+10000),});
		
		"undefined" != typeof okFunc && null != okFunc && okFunc(enemyInfo) 

	}, function(a){
		"undefined" != typeof failFunc && null != failFunc && failFunc(a)
	})
}

function newAssignTroop(enemy, cityIndex, okfunc, failfunc) {
	if(!gb_SmartBot) {
		gb_enemyList = null,gb_enemyIndex=0;
		window.droid && window.droid.clearCache && window.droid.clearCache();
		displayMsg("newAssignTroop is stopped");
		return;
	}
	displayMsg("["+userinfo.city[cityIndex].name+"] assignTroop("+enemy.x+","+enemy.y+")");
	ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
		key : key,
		city : userinfo.city[cityIndex].id,
		action : "gen_list",
		extra : 1
	}, function(i) {
		heros = i.ret.hero;
		if("undefined" != typeof heros && null != heros && 0 != heros.length) {
			for(var i = 0; i < heros.length; i++) {
				var g = heros[i];
				var d = mainStatus.HERO_DATA[g.gid];
				if(d.rank == "a") {
					g_heros.splice(i,1);
					i--;
				}
			}
			displayMsg("["+userinfo.city[cityIndex].name+"] attackNpc2("+enemy.x+","+enemy.y+")");
			
			var nheroIndex = 0
			
			if(nheroIndex < heros.length) {
				excuteAttack(heros[nheroIndex], enemy.x, enemy.y, enemy.requiredTroop, userinfo.city[cityIndex].id)
			} else {
				gb_nCityIndex++;
				if(gb_nCityIndex == userinfo.city.length) {
					gb_nCityIndex = 0;
				}
				setTimeout(newAssignTroop(enemy, gb_nCityIndex, okfunc, failfunc), 1000);
				return;
			}

			gb_attackInterval = setInterval( function() {
				if(gb_attckSucces) {
					gb_attckSucces = !gb_attckSucces;
					nheroIndex++;
					if (nheroIndex < heros.length) {
						setTimeout(excuteAttack(heros[nheroIndex], enemy.x, enemy.y, enemy.requiredTroop, userinfo.city[cityIndex].id)
							,Math.floor(Math.random() * 8000)+1000);
					} else {
						clearInterval(gb_attackInterval);
						gb_attackInterval = -1;
						gb_nCityIndex++;
						if(gb_nCityIndex == userinfo.city.length) { gb_nCityIndex = 0; }
						setTimeout(newAssignTroop(enemy, gb_nCityIndex, okfunc, failfunc), 0);
					}
				} else {
					if (gb_attckNextNPC) {
						gb_attckNextNPC = !gb_attckNextNPC;
						
						clearInterval(gb_attackInterval);
						gb_attackInterval = -1;
						
						gb_enemyIndex++;
						if(gb_enemyIndex == gb_enemyList.length) { 
							gb_enemyIndex = 0;
							setTimeout(startAttack(),0);
						} else {
							setTimeout(newParseFAVReport(gb_enemyList[gb_enemyIndex], function(newTarget) {
								setTimeout(newAssignTroop(newTarget, gb_nCityIndex, okfunc, failfunc), 0);
							}), 0)
						}
					} else if (gb_attckNextCity) {
						gb_attckNextCity = !gb_attckNextCity;
						clearInterval(gb_attackInterval);
						gb_attackInterval = -1;
						gb_nCityIndex++;
						if(gb_nCityIndex == userinfo.city.length) { gb_nCityIndex = 0; }
						setTimeout(newAssignTroop(enemy, gb_nCityIndex, okfunc, failfunc), 0);
					} else if (gb_attackNextHero) {
						gb_attackNextHero = !gb_attackNextHero;
						nheroIndex++;
						if (nheroIndex < heros.length) {
							setTimeout(excuteAttack(heros[nheroIndex], enemy.x, enemy.y, enemy.requiredTroop, userinfo.city[cityIndex].id)
								,Math.floor(Math.random() * 8000)+1000);
						} else {
							clearInterval(gb_attackInterval);
							gb_attackInterval = -1;
							gb_nCityIndex++;
							if(gb_nCityIndex == userinfo.city.length) { gb_nCityIndex = 0; }
							setTimeout(newAssignTroop(enemy, gb_nCityIndex, okfunc, failfunc), 0);
					}
					}
				}	
			}, 5000);
		} else {
			gb_nCityIndex++;
			if(gb_nCityIndex == userinfo.city.length) { gb_nCityIndex = 0; }
			setTimeout(newAssignTroop(enemy, gb_nCityIndex, okfunc, failfunc), 2000);
			
			displayMsg("Move to "+userinfo.city[gb_nCityIndex].name+"\n"+"NPC index:"+gb_enemyIndex+"/"+gb_enemyList.length);
			window.droid && window.droid.clearCache && window.droid.clearCache();
		}
	}, function(a) {
		setTimeout(newAssignTroop(enemy, cityIndex, okfunc, failfunc),Math.floor(Math.random() * 1000)+3000);
	});
}

function excuteAttack(hero, x, y, troop, cityid) {
	displayMsg(mainStatus.HERO_DATA[hero.gid].name+" : "+troop);
	newAttack(hero, x, y, troop, cityid, function(type, a) {
		if(type && type == "confirm") {
			gb_attckSucces = true;
			displayMsg(userinfo.city[gb_nCityIndex].name+"-confirm : Success Attack");
		} else {
			displayMsg(userinfo.city[gb_nCityIndex].name+"-attack : Success Attack");
		}
	}, function(type, a) {
		if(type && type == "attack") {
			if(typeof(LNG.ERROR.SERVER[a.code]) != "undefined") {
				displayMsg(type+"/"+LNG.ERROR.SERVER[a.code]);
			} else {
				displayMsg(type+"/"+"undefined error");
			}
		} else if(type == "confirm") {
			if(typeof(LNG.ERROR.SERVER[a.code]) != "undefined") {
				displayMsg(type+"/"+LNG.ERROR.SERVER[a.code]);
			} else {
				displayMsg(type+"/"+"undefined error");
			}
		}
		
		if (a.code == 2537) {
			//insufficient resource
			displayMsg(type+"/"+a.code)
			gb_attckNextCity = true;
		} else if (a.code == 2544 || a.code == 2510) {
			//insufficient troop
			displayMsg(type+"/"+a.code)
			gb_attckNextCity = true;
		} else if (a.code == 2529 || a.code == 2530) {
			//over attack count
			displayMsg(type+"/"+a.code)
			gb_attckNextNPC = true;
		} else if (a.code = 2509) {
			//over leardership
			displayMsg(type+"/"+a.code)
			gb_attackNextHero = true;
		} else {
			gb_attckNextNPC = true;
			gb_attckNextCity = true;
			displayMsg("Undefined Error Code");
		}
		var msg = new String(a.code);
		if(msg.indexof("visit") != -1) {
			displayMsg(type+"/"+a.code)
			g_SmartBot = false;
			displayMsg(a.code);
			showInfo("You visit too often");
		}
	});
}

/*
 * End of new Bot Function for V2.21
 */
