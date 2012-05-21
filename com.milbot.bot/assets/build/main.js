Utils.QueryString2Cookie();
Utils.validateStorage();
if (!window._l)
	window._l = "en";
var userinfo = Utils.getCookie("user"), keyinfo = Utils.getCookie("key"), statinfo = Utils.getCookie("status");
if (null == userinfo || null == keyinfo)
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
	getCity : function () {
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
function showGuide(a, c) {
	guidefunc = c;
	$("#guideinfotxt").html(a);
	$("#tipsetpanel").hide();
	$("#guide").show()
}
function hideGuide() {
	$("#guide").hide()
}
$("#guideclick").click(function () {
	hideGuide();
	$.isFunction(guidefunc) && guidefunc();
	return !1
});
$("#noguidepanel").click(function () {
	showConfirm(LNG.NOGUIDE, function () {
		hideGuide();
		Utils.setCookie("noguide" + userinfo.id, 1)
	});
	return !1
});
function getUser() {
	return keyinfo.user
}
function showHint(a, c, e, f) {
	$("#hint").css("top", e).css("left", c).css("background-image", "url(img/frame/hint_" + f + ".gif)").show();
	$("#hint p").html(a);
	"ul" == f || "ur" == f ? $("#hint p").css("top", "2px") : $("#hint p").css("top", "-8px")
}
function hideHint() {
	$("#hint").hide()
}
function showBrink(a, c, e, f, d) {
	brinkfunc = d;
	$("#brink img").css("top", c).css("left", a).css("width", e).css("height", f);
	$("#brink").show()
}
function hideBrink() {
	$("#brink").hide()
}
function showInfoBuy(a, c) {
	okfunc = c;
	$("#confirm p").html(a);
	$("#confirm_yes").text(LNG.BT_PURCHASE);
	$("#confirm_no").text(LNG.BT_CLOSE);
	$("#confirm").show()
}
function showPayList(a, c, e) {
	var f = $("#pay_list");
	f.find("div[id!=pay_channel]").remove();
	$("#pay_form").find("p").html(a);
	for (var a = c.length, d = 0; d < a; d++)
		f.find("#pay_channel").clone().attr("id", c[d].id).html(c[d].htm).click(function () {
			e(this.id)
		}).prependTo(f);
	$("#pay_form").show();
	$("#pay_channel").click(function () {
		$("#pay_form").hide()
	})
}
function showConfirm(a, c) {
	okfunc = c;
	$("#confirm p").html(a);
	$("#confirm_yes").text(LNG.BT_CONFIRM);
	$("#confirm_no").text(LNG.BT_CANCEL);
	$("#confirm").show()
}
function showYesNo(a, c) {
	okfunc = c;
	$("#confirm p").html(a);
	$("#confirm_yes").text(LNG.BT_YES);
	$("#confirm_no").text(LNG.BT_NO);
	$("#confirm").show()
}
function showInfo(a, c) {
	infofunc = c;
	$("#info p").html(a);
	$("#info").show()
}
function showUserInfo(a) {
	$("#u_cities SELECT").html("");
	for (var c = 0; c < a.city.length; c++) {
		var e = a.city[c];
		$("#u_cities SELECT").append('<OPTION VALUE="' + e.x + "." + e.y + '">' + e.name + " (" + e.x + "/" + e.y + ")</OPTION>");
		window.selectProxy.proxySelect($("#u_cities SELECT")[0])
	}
	$("#u_race em").removeClass().addClass("race" + a.nationid);
	$("#u_race b").text(null == a.nick ? "unknown" : a.nick);
	$("#u_level b").text(a.level);
	"undefined" != typeof a.pvp ? ($("#u_pvppoint b").text(a.pvp), $("#u_pvppoint").show()) : $("#u_pvppoint").hide();
	0 != a.guildid ? ($("#u_guild em").css("background-image", "url(" + Utils.getFlag(a.gflag) + ")"), $("#u_guild b").text(a.guild), $("#u_guild").show()) : ($("#u_guild em").css("background-image", ""), $("#u_guild b").text(""), $("#u_guild").hide());
	0 < a.protection || 0 != (a.status & 2) ? ($("#u_protect img").attr("src", "img/item/0.png"), $("#u_protect").show()) : 0 != (a.status & 1) ? ($("#u_protect img").attr("src", "img/item/80.png"), $("#u_protect").show()) : $("#u_protect").hide();
	a.conq && 0 < a.conq[0] ? ($("#u_conq b").text(a.conq[2]),
		$("#u_conq").show()) : $("#u_conq").hide();
	$("#u_info").show()
}
var chatLoadTime = 0;
function deviceSwitch() {
	(new Date).getTime() < chatLoadTime + CONFIG.CHAT_RELOAD_REATE + CONFIG.CHAT_RELOAD_REATE && ($("#loading").is(":visible") || showConfirm(LNG.CONFIRMSWITCH, function () {
			location.href = "start.html"
		}))
}
var guideList = null, guideItem = null, guideIndex = 0, guideInfoIndex = 0;
function DisplayGuideInfo() {
	null == guideItem || "undefined" == typeof guideItem.info || null == guideItem.info || guideItem.info.length <= guideInfoIndex ? ($.isFunction(guideItem.fn) && guideItem.fn(), DisplayGuide()) : (showGuide(guideItem.info[guideInfoIndex], DisplayGuideInfo), guideInfoIndex++)
}
function DisplayGuide() {
	null == guideList || guideList.length <= guideIndex ? guideItem = guideList = null : (guideItem = guideList[guideIndex], guideIndex++, "undefined" != typeof guideItem.info && null != guideItem.info && 0 < guideItem.info.length ? (guideInfoIndex = 0, DisplayGuideInfo()) : (showHint(guideItem.hint.htm, guideItem.hint.x, guideItem.hint.y, guideItem.hint.a), showBrink(guideItem.brink.x, guideItem.brink.y, guideItem.brink.w, guideItem.brink.h, function () {
					guideItem.brink.fn();
					DisplayGuide()
				})))
}
function CheckGuideDisplay(a) {
	var c = !1;
	null == Utils.getCookie("noguide" + userinfo.id) && null != quests && 0 < quests.length && $.each(quests, function (e, f) {
		var d = QUEST_GUIDE[f.id],
		g = null;
		if ("undefined" != typeof d && null != d)
			if (0 == f.status)
				g = d.newq;
			else if (1 == f.done)
				g = d.done;
			else if (f.id == a)
				g = d.accept;
		if ("undefined" != typeof g && null != g && 0 < g.length)
			return guideList = g, guideIndex = 0, "undefined" != typeof d.skip && 1 == d.skip ? $("#noguidepanel").show() : $("#noguidepanel").hide(), DisplayGuide(), c = !0, !1
	});
	return c
}
function makeFreeHeroPanel(a, c, e, f, d, g, i) {
	if ("undefined" == typeof a || null == a || 0 == a.length)
		f(null);
	else {
		var b = '<div id="f_com_free_hero_panel">';
		e && (b = "undefined" != typeof g && "undefined" != typeof i && null != g && null != i ? b + ('<div class="iphonetitle" style="position:relative;left:10px;width:460px;"><div class="font12" style="top:7px;position:relative;">&nbsp;' + g + '</div><div id="f_com_free_hero_no" class="funcbutton" style="top: 0px; left: 390px;">' + i + '</div></div><div style="position:relative;height:3px;"></div>') :
				b + ('<div class="iphonetitle" style="position:relative;left:10px;width:460px;"><div class="font12" style="top:7px;position:relative;">&nbsp;<b>' + LNG.ASSIGN_HERO + '</b></div><div id="f_com_free_hero_no" class="funcbutton" style="top: 0px; left: 390px;">' + LNG.NO + '</div></div><div style="position:relative;height:3px;"></div>'));
		var b = b + ('<div class="iphonetitle" style="position:relative;left:10px;width:460px;"><div class="tab_text" style="left:0px; top: 0px; width: 70px;">' + LNG.NAME + '</div><div class="tab_text" style="left:70px; top: 0px; width: 40px;">'),
		b = "undefined" != typeof d && "grade" == d ? b + ("<b>" + LNG.LEVEL + "</b>") : b + LNG.LEVEL,
		b = b + '</div><div class="tab_text" style="left:110px; top: 0px; width: 60px;">',
		b = "undefined" != typeof d && "power" == d ? b + ("<b>" + LNG.ATTACK + "</b>") : b + LNG.ATTACK,
		b = b + '</div><div class="tab_text" style="left:170px; top: 0px; width: 50px;">',
		b = "undefined" != typeof d && "intellect" == d ? b + ("<b>" + LNG.WISDOM + "</b>") : b + LNG.WISDOM,
		b = b + '</div><div class="tab_text" style="left:230px; top: 0px; width: 50px;">',
		b = "undefined" != typeof d && "defense" ==
			d ? b + ("<b>" + LNG.DEFENSE + "</b>") : b + LNG.DEFENSE,
		b = b + '</div><div class="tab_text" style="left:290px; top: 0px; width: 60px;">',
		b = "undefined" != typeof d && "command" == d ? b + ("<b>" + LNG.MAXTROOP + "</b>") : b + LNG.MAXTROOP,
		h = $(b + '</div></div><div id="f_com_free_hero_list" class="canvasbg" style="position:relative;left:10px;width:460px;"></div></div>');
		h.find("#f_com_free_hero_no").click(function () {
			h.remove();
			f(null);
			return !1
		});
		var j = h.find("#f_com_free_hero_list");
		$.each(a, function (a, b) {
			var g = mainStatus.HERO_DATA[b.gid];
			if (!("undefined" == typeof g || null == g)) {
				var c = [];
				c.push('<div id="f_com_free_hero' + b.gid + '" style="position:relative; height:75px;"><div class="font12" style="left:0px; top: 0px; width: 70px;text-align:center;position:absolute;"><img id="f_com_free_hero_list_img');
				c.push(b.id);
				c.push('" src="img/hero/sample.gif"/><br><b>');
				c.push(g.name);
				c.push('</b></div><img src="' + Utils.getHeroRankImage(g.race, g.rank) + '" style="position:absolute;left:5px;top:35px;"/><div class="font12" style="left:70px; top: 30px; width: 40px;text-align:center;position:absolute;">');
				"undefined" != typeof d && "grade" == d ? c.push("<b>" + b.g + "</b>") : c.push(b.g);
				c.push('</div><div class="font12" style="left:110px; top: 30px; width: 60px;text-align:center;position:absolute;">');
				"undefined" != typeof d && "power" == d ? c.push("<b>" + b.p + "</b>") : c.push(b.p);
				c.push('</div><div class="font12" style="left:170px; top: 30px; width: 50px;text-align:center;position:absolute;">');
				"undefined" != typeof d && "intellect" == d ? c.push("<b>" + b.i + "</b>") : c.push(b.i);
				c.push('</div><div class="font12" style="left:230px; top: 30px; width: 50px;text-align:center;position:absolute;">');
				"undefined" != typeof d && "defense" == d ? c.push("<b>" + b.c1 + "</b>") : c.push(b.c1);
				c.push('</div><div class="font12" style="left:290px; top: 30px; width: 60px;text-align:center;position:absolute;">');
				"undefined" != typeof d && "command" == d ? c.push("<b>" + b.c2 + "</b>") : c.push(b.c2);
				c.push('</div><div id="f_com_free_hero_list');
				c.push(b.id);
				c.push('" class="funcbutton" style="top: 22px; left: 390px;"><a href="#">' + LNG.SELECT + "</a></div></div>");
				j.append(c.join(""));
				Utils.loadImage2(h.find("#f_com_free_hero_list_img" +
						b.id), Utils.getHeroImage(b.gid));
				h.find("#f_com_free_hero_list" + b.id + " a").click(function () {
					h.remove();
					f(b);
					return !1
				})
			}
		});
		c.append(h)
	}
}
function showFreeHeroPanel(a, c, e, f, d, g) {
	pnlLoading.show();
	ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
		key : key,
		city : mainStatus.getCity().id,
		action : "gen_list",
		extra : 1
	}, function (i) {
		makeFreeHeroPanel(i.ret.hero, a, c, e, f, d, g)
	})
}
function showFreeHeroPanel2(a, c, e, f, d, g) {
	pnlLoading.show();
	ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
		key : key,
		city : mainStatus.getCity().id,
		action : "gen_list",
		extra : 3
	}, function (i) {
		makeFreeHeroPanel(i.ret.hero, a, c, e, f, d, g)
	})
}
function showItemPromotion(a, c, e, f, d) {
	pnlLoading.show();
	a.remove("#f_com_item_promotion_panel");
	var g = null;
	$.each(c, function (d, a) {
		g = null == g ? a.id : g + ("," + a.id)
	});
	ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_LIST, {
		key : key,
		ids : g
	}, function (g) {
		var b = g.ret.item,
		g = '<div id="f_com_item_promotion_panel">' + ('<div class="iphonetitle" style="position:relative;left:10px;width:462px;"><div class="font12" style="top:7px;position:relative;">&nbsp;<b>' + LNG.HELPFUL_ITEMS + '</b></div><div id="f_com_item_promotion_no" class="funcbutton" style="top: 0px; left: 390px;">' +
				LNG.CLOSE + '</div></div><div style="position:relative;height:3px;"></div>'),
		h = $(g + '<div id="f_com_item_promotion_list" class="canvasbg" style="position:relative;left:10px;width:462px;"></div></div>');
		h.find("#f_com_item_promotion_no").click(function () {
			h.remove();
			$.isFunction(e) && e(0);
			return !1
		});
		var j = h.find("#f_com_item_promotion_list");
		f && $.isFunction(e) && "undefined" != typeof d && null != d && $.each(d, function (d, a) {
			var b = '<div style="position:relative;height: 60px;"><img src="img/item/' + a.icon + '" style="position:absolute;top: 5px; left: 10px;"><div class="tooltip2" style="left: 70px; top: 5px; width: 390px; height:50px"><p><b>' +
				a.name + '</b></p><p style="position:relative;top:6px;">' + a.desc + "</p>",
			b = 1 == a.shop ? b + ('<ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="gem"></em><b>' + a.price + "</b></li></ul>") : b + ('<ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="gold"></em><b>' + a.price + "</b></li></ul>"),
			b = b + ('<div id="f_com_extra_promotion_use' + a.id + '" class="funcbutton" style="top: -3px; left: 320px;">' + LNG.ITEM_USE + "</div>");
			j.append(b + "</div></div>");
			h.find("#f_com_extra_promotion_use" +
				a.id).click(function () {
				var d = null,
				d = 1 == a.shop ? translate(LNG.CONFIRMUSE2, a.name, a.price) : translate(LNG.CONFIRMUSE3, a.name, a.price);
				showConfirm(d, function () {
					e(a.id);
					h.remove()
				})
			})
		});
		null != b && $.each(b, function (a, d) {
			var b = mainStatus.ITEM_DATA[d.sid];
			if (!("undefined" == typeof b || null == b)) {
				var c = LNG.ITEMRANK[b.rank],
				c = '<div style="position:relative;height: 60px;"><div id="f_com_item_promotion_img' + d.id + '" class="itemicon1" style="top: 5px; left: 10px;"></div><div class="tooltip2" style="left: 70px; top: 5px; width: 390px; height:50px"><p><b><font color="' +
					c.color + '">' + b.name + '</font></b>&nbsp;<strong>(<font color="' + c.color + '">' + c.name + "</font>)&nbsp;x" + d.num + '</strong></p><p style="position:relative;top:6px;">' + b.desc + "</p>",
				c = c + ('<div id="f_com_item_promotion_use' + d.id + '" class="funcbutton" style="top: -3px; left: 320px;">' + LNG.ITEM_USE + "</div>");
				j.append(c + "</div></div>");
				Utils.loadImage(h.find("#f_com_item_promotion_img" + d.id), Utils.getItemImage(d.sid));
				h.find("#f_com_item_promotion_use" + d.id).click(function () {
					showConfirm(translate(LNG.CONFIRMUSE,
							b.name), function () {
						f ? ($.isFunction(e) && e(d.sid), h.remove()) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_OP, {
								key : key,
								action : "use",
								city : mainStatus.getCity().id,
								id : d.id
							}, function (a) {
								"undefined" != typeof a.ret.buff && null != a.ret.buff && "" != a.ret.buff && mainStatus.CITY_INFO[23].push(a.ret.buff);
								var b = null;
								"undefined" != typeof a.ret.gem && null != a.ret.gem && 0 != a.ret.gem && (userinfo.money += a.ret.gem, refreshUserInfo(), b = null == b ? '<img src="img/res/gem3.gif"/>x' + a.ret.gem : b + ('&nbsp;<img src="img/res/gem3.gif"/>x' +
											a.ret.gem));
								"undefined" != typeof a.ret.wood && null != a.ret.wood && 0 != a.ret.wood && (mainStatus.CITY_INFO[6] += a.ret.wood, b = null == b ? '<img src="img/res/wood.png"/>x' + a.ret.wood : b + ('&nbsp;<img src="img/res/wood.png"/>x' + a.ret.wood));
								"undefined" != typeof a.ret.food && null != a.ret.food && 0 != a.ret.food && (mainStatus.CITY_INFO[4] += a.ret.food, b = null == b ? '<img src="img/res/food.png"/>x' + a.ret.food : b + ('&nbsp;<img src="img/res/food.png"/>x' + a.ret.food));
								"undefined" != typeof a.ret.iron && null != a.ret.iron && 0 != a.ret.iron && (mainStatus.CITY_INFO[8] +=
									a.ret.iron, b = null == b ? '<img src="img/res/iron.png"/>x' + a.ret.iron : b + ('&nbsp;<img src="img/res/iron.png"/>x' + a.ret.iron));
								"undefined" != typeof a.ret.gold && null != a.ret.gold && 0 != a.ret.gold && (mainStatus.CITY_INFO[2] += a.ret.gold, b = null == b ? '<img src="img/res/ic06_other.gif"/>x' + a.ret.gold : b + ('&nbsp;<img src="img/res/ic06_other.gif"/>x' + a.ret.gold));
								null == b ? showInfo(LNG.SUCCESS) : showInfo(translate(LNG.GETITEM, b));
								$.isFunction(e) && e(d.sid);
								h.remove()
							}))
					});
					return !1
				})
			}
		});
		null != c && $.each(c, function (a, d) {
			for (var c =
					!1, g = 0; g < b.length; g++)
				if (b[g].sid == d.id) {
					c = !0;
					break
				}
			if (!c) {
				var i = mainStatus.ITEM_DATA[d.id];
				"undefined" == typeof i || null == i || (c = LNG.ITEMRANK[i.rank], c = '<div style="position:relative;height: 60px;"><div id="f_com_item_promotion2_img' + d.id + '" class="itemicon1" style="top: 5px; left: 10px;"></div><div class="tooltip2" style="left: 70px; top: 5px; width: 390px; height:50px"><p><b><font color="' + c.color + '">' + i.name + '</font></b>&nbsp;<strong>(<font color="' + c.color + '">' + c.name + '</font>)&nbsp;x0</strong></p><p style="position:relative;top:6px;">' +
						i.desc + "</p>", c = 1 == d.shop ? c + ('<ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="gem"></em><b>' + i.price + "</b></li></ul>") : c + ('<ul class="reshead2" style="position: absolute; top: 0px; left: 170px;"><li><em class="gold"></em><b>' + i.price + "</b></li></ul>"), c += '<div id="f_com_item_promotion2_buy' + d.id + '" class="funcbutton" style="top: -3px; left: 320px;">' + LNG.BUY_AND_USE + "</div>", j.append(c + "</div></div>"), Utils.loadImage(h.find("#f_com_item_promotion2_img" + d.id),
						Utils.getItemImage(d.id)), h.find("#f_com_item_promotion2_buy" + d.id).click(function () {
						0 == d.shop ? showConfirm(translate(LNG.CONFIRMBUY, i.name, i.price), function () {
							pnlLoading.show();
							ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SHOP, {
								key : key,
								action : "purchase",
								type : 3,
								city : mainStatus.getCity().id,
								id : d.id
							}, function (a) {
								mainStatus.CITY_INFO[2] = a.ret.gold;
								a = a.ret.itemid;
								f ? ($.isFunction(e) && e(d.id), h.remove()) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_OP, {
										key : key,
										action : "use",
										city : mainStatus.getCity().id,
										id : a
									}, function (a) {
										"undefined" != typeof a.ret.buff && null != a.ret.buff && "" != a.ret.buff && mainStatus.CITY_INFO[23].push(a.ret.buff);
										var b = null;
										"undefined" != typeof a.ret.gem && null != a.ret.gem && 0 != a.ret.gem && (userinfo.money += a.ret.gem, refreshUserInfo(), b = null == b ? '<img src="img/res/gem3.gif"/>x' + a.ret.gem : b + ('&nbsp;<img src="img/res/gem3.gif"/>x' + a.ret.gem));
										"undefined" != typeof a.ret.wood && null != a.ret.wood && 0 != a.ret.wood && (mainStatus.CITY_INFO[6] += a.ret.wood, b = null == b ? '<img src="img/res/wood.png"/>x' + a.ret.wood :
												b + ('&nbsp;<img src="img/res/wood.png"/>x' + a.ret.wood));
										"undefined" != typeof a.ret.food && null != a.ret.food && 0 != a.ret.food && (mainStatus.CITY_INFO[4] += a.ret.food, b = null == b ? '<img src="img/res/food.png"/>x' + a.ret.food : b + ('&nbsp;<img src="img/res/food.png"/>x' + a.ret.food));
										"undefined" != typeof a.ret.iron && null != a.ret.iron && 0 != a.ret.iron && (mainStatus.CITY_INFO[8] += a.ret.iron, b = null == b ? '<img src="img/res/iron.png"/>x' + a.ret.iron : b + ('&nbsp;<img src="img/res/iron.png"/>x' + a.ret.iron));
										"undefined" != typeof a.ret.gold &&
										null != a.ret.gold && 0 != a.ret.gold && (mainStatus.CITY_INFO[2] += a.ret.gold, b = null == b ? '<img src="img/res/ic06_other.gif"/>x' + a.ret.gold : b + ('&nbsp;<img src="img/res/ic06_other.gif"/>x' + a.ret.gold));
										null == b ? showInfo(LNG.SUCCESS) : showInfo(translate(LNG.GETITEM, b));
										$.isFunction(e) && e(d.id);
										h.remove()
									}))
							})
						}) : showConfirm(translate(LNG.CONFIRMBUY2, i.name, i.price), function () {
							pnlLoading.show();
							ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_SHOP2, {
								key : key,
								action : "purchase",
								id : d.id
							}, function (a) {
								userinfo.money = a.ret.money;
								refreshUserInfo();
								a = a.ret.itemid;
								f ? ($.isFunction(e) && e(d.id), h.remove()) : (pnlLoading.show(), ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_ITEM_OP, {
										key : key,
										action : "use",
										city : mainStatus.getCity().id,
										id : a
									}, function (a) {
										"undefined" != typeof a.ret.buff && null != a.ret.buff && "" != a.ret.buff && mainStatus.CITY_INFO[23].push(a.ret.buff);
										var b = null;
										"undefined" != typeof a.ret.gem && null != a.ret.gem && 0 != a.ret.gem && (userinfo.money += a.ret.gem, refreshUserInfo(), b = null == b ? '<img src="img/res/gem3.gif"/>x' + a.ret.gem : b + ('&nbsp;<img src="img/res/gem3.gif"/>x' +
													a.ret.gem));
										"undefined" != typeof a.ret.wood && null != a.ret.wood && 0 != a.ret.wood && (mainStatus.CITY_INFO[6] += a.ret.wood, b = null == b ? '<img src="img/res/wood.png"/>x' + a.ret.wood : b + ('&nbsp;<img src="img/res/wood.png"/>x' + a.ret.wood));
										"undefined" != typeof a.ret.food && null != a.ret.food && 0 != a.ret.food && (mainStatus.CITY_INFO[4] += a.ret.food, b = null == b ? '<img src="img/res/food.png"/>x' + a.ret.food : b + ('&nbsp;<img src="img/res/food.png"/>x' + a.ret.food));
										"undefined" != typeof a.ret.iron && null != a.ret.iron && 0 != a.ret.iron && (mainStatus.CITY_INFO[8] +=
											a.ret.iron, b = null == b ? '<img src="img/res/iron.png"/>x' + a.ret.iron : b + ('&nbsp;<img src="img/res/iron.png"/>x' + a.ret.iron));
										"undefined" != typeof a.ret.gold && null != a.ret.gold && 0 != a.ret.gold && (mainStatus.CITY_INFO[2] += a.ret.gold, b = null == b ? '<img src="img/res/ic06_other.gif"/>x' + a.ret.gold : b + ('&nbsp;<img src="img/res/ic06_other.gif"/>x' + a.ret.gold));
										null == b ? showInfo(LNG.SUCCESS) : showInfo(translate(LNG.GETITEM, b));
										$.isFunction(e) && e(d.id);
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
(function () {
	var a = new ui.TranslationSubViewContainer($("#content"), MARKERS),
	c = null;
	window.main_loadDiv = function (e, f, d) {
		"function" === typeof f && (d = f, f = void 0);
		if (e !== mainStatus.SUBVIEW) {
			pnlLoading.show();
			mainStatus.SUBVIEW = e;
			"undefined" != typeof droid && droid.setCurrentView(mainStatus.SUBVIEW);
			mainContent.trigger("dispose");
			mainContent.unbind("dispose");
			"undefined" != typeof f && null != f && Utils.setCookie("params", f);
			try {
				pnlLoading.show(),
				c && c.close(),
				a.load(e.replace(".html", ""), function (a) {
					c = a;
					$.isFunction(d) &&
					d()
				})
			} catch (g) {
				"f_city.html" == e ? window.location = "main.html" : (showInfo(LNG.FAULT), setTimeout(showCity, 100))
			}
		}
	}
})();
function refreshUserInfo() {
	if (userinfo) {
		Utils.setCookie("user", userinfo);
		Utils.setCookie("status", statinfo);
		Utils.setCookie("events", eventinfo);
		$("#race b").text(userinfo.nick);
		$("#level b").text(userinfo.level);
		$("#gem b").text(userinfo.money);
		$("#cities SELECT").empty();
		for (var a in userinfo.city) {
			var c = userinfo.city[a];
			$("#cities SELECT").append('<OPTION VALUE="' + a + '" ' + (mainStatus.CITY_ID == userinfo.city[a].id ? "SELECTED" : "") + ">" + c.name + "(" + c.x + "," + c.y + ")</OPTION>");
			window.selectProxy.proxySelect($("#cities SELECT")[0])
		}
		0 !=
		userinfo.guildid ? ($("#guild em").css("background-image", "url(" + Utils.getFlag(userinfo.gflag) + ")"), $("#guild b").text(userinfo.guild)) : ($("#guild em").css("background-image", ""), $("#guild b").text(""));
		"undefined" != typeof userinfo.pvp ? ($("#pvppoint b").text(userinfo.pvp), $("#pvppoint").show()) : $("#pvppoint").hide()
	}
}
function resyncUserInfo() {
	pnlLoading.show();
	ajaxCall(keyinfo.server + CONFIG.FUNC_GETUSERINFO, {
		key : keyinfo.key
	}, function (a) {
		if (a.ret.user)
			userinfo = a.ret.user, eventinfo = a.ret.events, statinfo = a.ret.status, refreshUserInfo()
	})
}
function checkVersionInfo() {
	null != statinfo && statinfo.ver > CONFIG.VER && ajaxCall(CONFIG.MASTERHOST + CONFIG.MASTER_VERINFO, null, function (a) {
		$("#server_notice_date").html(a.ret.date);
		$("#server_notice_desc").html(a.ret.desc);
		$("#server_notice").show();
		$("#server_notice_update").unbind().click(function () {
			location.href = "js-call:link?" + a.ret.url
		})
	}, !1)
}
checkVersionInfo();
var onAjaxSuccess = null;
function _onAjaxSuccess(a, c, e, f) {
	var d = null;
	if (a.code == CONFIG.SUCCESS)
		c(a);
	else if (a.code == CONFIG.ERROR_INVALIDKEY)
		window.location.href = "start.html";
	else if (a.code == CONFIG.ERROR_UNKNOWN)
		showInfo(LNG.ERROR.SERVER[a.code] + ":" + a.Detail);
	else if (3405 == a.code || 4404 == a.code)
		showInfoBuy(LNG.ERROR.SERVER[a.code], function () {
			Utils.setCookie("params", {
				tab : 3
			});
			main_loadDiv("f_shop.html", function () {})
		});
	else if (711 == a.code || 807 == a.code || 1306 == a.code || 1608 == a.code || 1609 == a.code || 3402 == a.code || 3608 == a.code || 4403 ==
		a.code)
		showConfirm(LNG.ERROR.SERVER[a.code], function () {
			"f_shop.html" != mainStatus.SUBVIEW ? (Utils.setCookie("params", {
					tab : 2
				}), main_loadDiv("f_shop.html", function () {})) : $("#f_sample_tab2").click()
		});
	else if (708 == a.code || 709 == a.code || 710 == a.code || 1004 == a.code || 1005 == a.code || 2305 == a.code || 2537 == a.code)
		showConfirm(LNG.ERROR.SERVER[a.code], function () {
			0 < $("#f_city_resource_html_script").length ? $("#f_tab3").click() : (Utils.setCookie("params", {
					tab : 3
				}), main_loadDiv("f_city_resource.html", function () {}))
		});
	else {
		if ($.isFunction(e) &&
			!0 === e(parseInt(a.code)))
			return;
		for (d = a.code; d && d.constructor && d.constructor == Number; )
			d = LNG.ERROR.SERVER[d];
		d ? showInfo(d) : showInfo(LNG.ERROR.SERVER.UNKNOWN + a.code)
	}
	!1 != f && pnlLoading.hasClass("loading2") && pnlLoading.hide()
}
onAjaxSuccess = CONFIG.RELEASE ? function (a, c, e, f) {
	try {
		_onAjaxSuccess(a, c, e, f)
	} catch (d) {
		pnlLoading.hasClass("loading2") && pnlLoading.hide()//,
		//showInfo(LNG.FAULT)
	}
} : _onAjaxSuccess;

function ajaxCall(a, c, e, f, d) {
	"boolean" == typeof f && (d = f);
	c = c || {};
	c._l = window._l;
	c._p = window._p ? window._p : "";
	a = {
		type : "GET",
		url : a,
		data : c,
		dataType : "jsonp",
		jsonp : "jsonpcallback",
		timeout : CONFIG.AJAX_TIMEOUT,
		cache : !1,
		success : function (a) {
			onAjaxSuccess(a, e, f, d)
		}
	};
	a.error = !1 == d ? null : function (a, d) {
		var b = LNG.ERROR.AJAX;
		if (!(null != a && (0 == a.readyState || 0 == a.status))) {
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
			pnlLoading.hasClass("loading2") ?
			(pnlLoading.hide(), showInfo(b)) : showInfo(b, function () {
				location.href = "start.html"
			})
		}
	};
	$.ajax(a)
}

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
	TECH_SOD : 19,
	TECH_SOA : 19,
	TECH_CS : 18,
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

function confirmAttackNpc(a, c, e) {		
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
			displayMsg(LNG.ERROR.SERVER[a.code]);
			if(a.code == 2537 || a.code == 2510) {
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
		confirmAttackNpc(LNG.ACTIONTYPE_FULL[3], attackInfo, a.ret)
	}, function(a) {
		func(a);
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

// function prepareAttack(npcList, soldierCnt) {
	// ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
		// key : key,
		// city : userinfo.city[nCityIndex].id,
		// action : "gen_list",
		// extra : 1
	// }, function(i) {
		// var genList = i.ret.hero;
		// if("undefined" != typeof genList && null != genList && 0 != genList.length) {
			// var reservedSoldierCnt = 0;
			// var currentNpc = 0;
			// var prevNpc = 0;
			// // for (var iCnt=0; (iCnt<genList.length && soldierCnt > reservedSoldierCnt); iCnt++) {
			// for(var iCnt = 0; iCnt < genList.length; iCnt++) {
				// var gen = genList[iCnt];
				// var d = mainStatus.HERO_DATA[gen.gid];
				// //�μ닔 �덈��좏�				// if(d.rank == "a") {
					// continue;
				// }
				// for(var yCnt = 0; yCnt < npcList.length; yCnt++) {
					// var npc = npcList[yCnt];
					// if(npc[4] < 4) {
						// switch(npc[3]) {
							// case 1:
								// // if((soldierCnt - reservedSoldierCnt) > 250 && gen.c2 > 250) {
								// if(gen.c2 > 250) {
									// attackNpc(gen, npc[1], npc[2], 250);
									// npc[4] += 1;
									// reservedSoldierCnt += 250;
								// }
								// break;
							// case 2:
								// // if((soldierCnt - reservedSoldierCnt) > 150 && gen.c2 > 150) {
								// if(gen.c2 > 150) {
									// attackNpc(gen, npc[1], npc[2], 150);
									// npc[4] += 1;
									// reservedSoldierCnt += 150;
								// }
								// break;
							// default:
								// break;
						// }
						// break;
					// }
				// }
			// }
		// }
		// nCityIndex++;
		// if(nCityIndex == userinfo.city.length) {
			// nCityIndex = 0;
		// }
		// botEMA.async("botEMA");
	// }, function(a, b) {
		// botEMA.async("botEMA");
	// });
// }


// function prepareAttackBug(npcList, soldierCnt) {
	// ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
		// key : key,
		// city : userinfo.city[nCityIndex].id,
		// action : "gen_list",
		// extra : 1
	// }, function(i) {
		// var genList = i.ret.hero;
		// if("undefined" != typeof genList && null != genList && 0 != genList.length) {
			// for(var yCnt = 0; yCnt < npcList.length; yCnt++) {
				// var npc = npcList[yCnt];
				// if(npc[4] > 3) {
					// continue;
				// }
				// for(var iCnt = 0; iCnt < genList.length; iCnt++) {
					// var gen = genList[iCnt];
					// var d = mainStatus.HERO_DATA[gen.gid];
					// //�μ닔 �덈��좏�					// if(d.rank == "a") {
						// continue;
					// }
					// switch(npc[3]) {
						// case 1:
							// if(gen.c2 > 250) {
								// attackNpc(gen, npc[1], npc[2], 250);
							// }
							// break;
						// case 2:
							// if(gen.c2 > 150) {
								// attackNpc(gen, npc[1], npc[2], 150);
							// }
							// break;
						// default:
							// break;
					// }
				// }
			// }
		// }
		// nCityIndex++;
		// if(nCityIndex == userinfo.city.length) {
			// nCityIndex = 0;
		// }
		// botEMA.async("botEMA");
	// }, function(a, d) {
		// botEMA.async("botEMA");
	// });
// }

// function getHeros() {
	// ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
		// key : key,
		// city : userinfo.city[nCityIndex].id,
		// action : "gen_list",
		// extra : 1
	// }, function(i) {
		// g_heros = i.ret.hero;
		// if("undefined" != typeof g_heros && null != g_heros && 0 != g_heros.length) {
			// for(var i = 0; i < g_heros.length; i++) {
				// var gen = g_heros[i];
				// var d = mainStatus.HERO_DATA[gen.gid];
				// if(d.rank == "a") {
					// g_heros.splice(i,1);
					// i--;
				// }
			// }
		// } else {
			// nCityIndex++;
			// if(nCityIndex == userinfo.city.length) { nCityIndex = 0; }
			// displayMsg("Move to "+userinfo.city[nCityIndex].name+"\n"+"NPC index:"+g_npcindex+"/"+g_npclist.length);
			// window.droid && window.droid.clearCache && window.droid.clearCache();
			// setTimeout(assignTroop(enemy),Math.floor(Math.random() * 5000)+5000)
		// }
	// }, function(a) {
		// setTimeout(getHeros(),1000);
	// });
// }

// function assignTroop(enemy) {
	// if(!g_SmartBot) {
		// g_npclist=null,g_npcindex=0,g_heros=null;
		// window.droid && window.droid.clearCache && window.droid.clearCache();
		// displayMsg("assignTroop is stopped");
		// return;
	// }
// 		
	// displayMsg("[" + userinfo.city[nCityIndex].name + "] attackNpc2(" + enemy.x + "," + enemy.y + ")");
	// for(var iCnt = 0; iCnt < g_heros.length; iCnt++) {
		// if(g_heros[iCnt].c2 < enemy.requiredTroop) {
			// g_heros.splice(iCnt, 1);
			// continue;
		// }
		// attackNpc2(iCnt, enemy.x, enemy.y, enemy.requiredTroop, userinfo.city[nCityIndex].id);
	// }
// 
	// if(g_heros.length == 0) {
		// nCityIndex++;
		// if(nCityIndex == userinfo.city.length) {
			// nCityIndex = 0;
		// }
		// displayMsg("Move to " + userinfo.city[nCityIndex].name + "\n" + "NPC index:" + g_npcindex + "/" + g_npclist.length);
		// setTimeout(assignTroop(enemy), 1000);
		// return;
	// }
// 
	// g_npcindex++;
	// if(g_npclist.length > g_npcindex) {
		// setTimeout(parseFAVReport(g_npclist[g_npcindex]), 0);
	// } else {
		// setTimeout(myAttack(), 0);
	// }	
// 
// 		
// }
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

// function setupBot() {
	// window.droid && window.droid.clearCache && window.droid.clearCache();
	// if(!bBotStarted) {
		// botEMA.bind("botEMA", startBot);
		// botEMA.bind("dispose", function () {
        	// nCityIndex = 0;
    	// });
		// botEMA.async("botEMA");
		// bBotStarted = true;
		// showInfo("Bot is started")
	// } else {
		// botEMA.unbind("botEMA", startBot);
		// bBotStarted = false;
		// showInfo("Bot is stopped")
	// }
// }


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
var ExploreMapClass = new ExploreMap();
var ExploreMap = function() {
	this.exploreX = 1;
	this.exploreY = 1;
	
	this.setupExploreMap = function() {
		botEMA.bind("EMAexploreMap",  this.exploreMap);
		botEMA.bind("EMAstoreMap", this.storeMap);
		exploreMap(this.exploreX, this.exploreY);
	}

	this.exploreMap = function(x, y) {
		ajaxCallMB(CONFIG.MYHOST + CONFIG.FUNC_MAP, {
			key : key,
			x : x,
			y : y
		}, function(a) {
			var d = a.ret;
			$.each(d.map, function(index, value) {
				if(value[2] == 2 || value[2] == 1) {
					botEMA.async("storeMap","k10", value[0], value[1], value[2]);
				}
			});
			if(x < 280) {
				x += 7;
			} else {
				if(y < 280) {
					y += 7;
					x = 1;
				} else {
					showInfo("ExploreMap : done!!")
					botEMA.unbind("EMAexploreMap");
				}
			}
		});
		botEMA.async("EMAexploreMap", x, y);
	}
	
	
	this.storeMap = function(server, x, y) {
		ajaxCallMB("http://nilbons.appspot.com/putHunterPoint.do", {
			server : "k10",
			x : value[0],
			y : value[1],
			level : value[2]
		}, function(a) {
		}, function(a) {
			botEMA.async("storeMap", server, x, y);
		});
	}

}*/
/*
 * End of Bot Function
 */


$(function () {
	function a(a) {
		function c() {
			var g = $(window).width();
			480 > g && (g = 480);
			var b = $(window).height();
			320 > b && (b = 320);
			a.css("left", (g - a.width()) / 2 + "px");
			a.css("top", (b - a.height()) / 2 + "px")
		}
		c();
		$(window).resize(c)
	}
	function c() {
		main_loadDiv("f_city.html", function () {});
		var a = parseInt($("#cities SELECT").val());
		if (a != mainStatus.CITY)
			mainStatus.CITY = a, mainStatus.CITY_ID = userinfo.city[a].id, 0 <= mainStatus.CITY && "undefined" != typeof reloadCity && (reloadCity(), CMA.reload(mainStatus.CITY_ID))
	}
	0 > window.location.href.indexOf("debug") &&
	a($("#center_container"));
	document.ontouchmove = function (a) {
		a.preventDefault()
	};
	var e = {
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
	},
	f = {
		getLevel : function (a) {
			return this[e[a]]
		},
		setLevel : function (a, c) {
			a && c && (this[e[a]] = c)
		}
	};
	window.onCityLoaded = function (a) {
		mainStatus.CITY_INFO = a.ret.city;
		if (!CMAReady) {
			CMAReady = !0;
			var c = "";
			mainStatus.CITY_INFO[4] >= mainStatus.CITY_INFO[5] && (c += '&nbsp;<img src="img/res/food.png">&nbsp;');
			mainStatus.CITY_INFO[6] >= mainStatus.CITY_INFO[7] && (c += '&nbsp;<img src="img/res/wood.png">&nbsp;');
			mainStatus.CITY_INFO[2] >= mainStatus.CITY_INFO[3] && (c += '&nbsp;<img src="img/res/ic06_other.gif">&nbsp;');
			mainStatus.CITY_INFO[8] >= mainStatus.CITY_INFO[9] && (c += '&nbsp;<img src="img/res/iron.png">&nbsp;');
			"" != c /*&& showInfo(translate(LNG.RESOURCEFULL, c))*/
		}
		$.extend(mainStatus.CITY_INFO, f);
		userinfo.money = a.ret.money;
		userinfo.grade = a.ret.grade;
		refreshUserInfo();
		EMA.async("cityinfoupdate")
		
		var 
		s = $("#f_city_resource_html_script"),
		n = $(s.parent().get(0)),
		v = EMA.getProxy();
		
		var
		s = n.find("#f_content1"),
		u = [{
			buildtype : 1,
			panel : s.find("#f_fac_wood")
		}, {
			buildtype : 2,
			panel : s.find("#f_fac_iron")
		}, {
			buildtype : 3,
			panel : s.find("#f_fac_gold")
		}, {
			buildtype : 4,
			panel : s.find("#f_fac_food")
		}
		];
		
		b = mainStatus.BUILDING_DATA;
		
		var
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
					} else
						c.find("#f_value b").html(i.v);
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
					d.upgrade[f + 1] ? c.find("#f_upgrade").show() : (c.find("#f_upgrade").hide(),
						c.find("#f_cd1").hide())
				}
			}
		},
		s = function () {
			$.each(u, function (a, b) {
				m(b.buildtype, b.panel)
			})
		};
		
		v.bind("cityinfoupdate", s);
		

		// var a = {};
		// $.each("g2w,g2f,g2i,w2g,f2g,i2g".split(","), function (b, c) {
			// if(c == "g2f") {
				// if(mainStatus.CITY_INFO[2] > 80000)
					// a[c] = 80000;
				// else 
					// a[c] = 0;
			// } else {
				// a[c] = 0;
			// }
		// });
		if (notiWarinfo) {
			$.each(userinfo.city, function(index,value){
        		setTimeout(checkwarinfo(value.id),1000);
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
							v.trigger("cityinfoupdate");
						}, function () {});
					}
        		});
        	});
        	
		} else {
			v.trigger("cityinfoupdate");
		}
		
		// ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_HERO_RECRUIT, {
			// key : key,
			// city : mainStatus.getCity().id,
			// action : "gen_list",
			// extra : 1
		// }, function (i) {
			// var a = i.ret.hero;
			// if ("undefined" == typeof a || null == a || 0 == a.length) {
			
			// } else {
				// $.each(a, function (a, b) {
					// //var g = mainStatus.HERO_DATA[b.gid];
				// }
			// }
		// });
		
		
		
		
	};
	window.showCity = c;
	window.parseMsgResult = function (a) {
		chatLoadTime = (new Date).getTime();
		var c = !1;
		if ("undefined" != typeof a.ret.evt &&
			null != a.ret.evt && 0 < a.ret.evt.length)
			for (var e = a.ret.evt.length - 1; 0 <= e; e--) {
				var b = a.ret.evt[e];
				if (1 == b.typeid)
					resyncUserInfo(), showInfo(LNG.NEWCASTLESUCCESS);
				else if (2 == b.typeid)
					showNewMail();
				else if (3 == b.typeid)
					b.cid == mainStatus.CITY_ID && "undefined" != typeof reloadCity && reloadCity();
				else if (4 == b.typeid)
					resyncUserInfo();
				else if (5 == b.typeid)
					showInfo(b.txt);
				else if (6 == b.typeid) {
					if (null != userinfo.gift)
						for (e = 0; e < userinfo.gift.length; e++)
							if (userinfo.gift[e].id == b.id) {
								userinfo.gift.splice(e, 1);
								Utils.setCookie("user",
									userinfo);
								"f_city.html" == mainStatus.SUBVIEW && showGiftButton();
								break
							}
				} else
					7 == b.typeid ? CMA.reload(mainStatus.CITY_ID) : 8 == b.typeid && "undefined" != typeof sysupdate && 1 == sysupdate && (c = !0)
			}
		if ("undefined" != typeof a.ret.msg && null != a.ret.msg && 0 < a.ret.msg.length) {
			for (e = a.ret.msg.length - 1; 0 <= e; e--)
				b = a.ret.msg[e], chatmsg.push(b);
			for (var f = b = 0, e = a = 0; e < chatmsg.length; e++)
				0 == chatmsg[e].target_type ? b++ : 1 == chatmsg[e].target_type ? f++ : a++;
			b -= max_msg_lines;
			f -= max_msg_lines;
			a -= max_msg_lines;
			for (e = 0; e < chatmsg.length && (0 <
					b || 0 < f || 0 < a); e++)
				0 == chatmsg[e].target_type ? 0 < b && (chatmsg.splice(e, 1), e--, b--) : 1 == chatmsg[e].target_type ? 0 < f && (chatmsg.splice(e, 1), e--, f--) : 0 < a && (chatmsg.splice(e, 1), e--, a--);
			"f_chat.html" != mainStatus.SUBVIEW && (b = chatmsg[chatmsg.length - 1], 0 == b.from_id ? $("#main_chatmsg").html(b.line_txt) : $("#main_chatmsg").html("[" + LNG.CHATCHANNEL[b.target_type] + "]&nbsp;<b>" + b.from_name + "</b>:&nbsp;" + b.line_txt), chatDisplay = (new Date).getTime() + 8E3, $("#main_chatmsg").show());
			EMA.trigger("newchatmsg")
		}
		if (c)
			location.href =
				"js-call:sysupdate"
	};
	window.hideChatBar = function () {
		$("#main_chatmsg").hide()
	};
	$("#gohome").click(function () {
		c();
		return !1
	});
	$("#milbothome").click(function () {
		var cIndex = parseInt($("#cities SELECT").val())+1;
		if(cIndex == userinfo.city.length) { cIndex = 0; } 
		$("#cities SELECT").val(cIndex);
		c();
    	
    	// mainStatus.CITY = a, mainStatus.CITY_ID = userinfo.city[cIndex].id, 0 <= mainStatus.CITY && "undefined" != typeof reloadCity && (reloadCity(), CMA.reload(mainStatus.CITY_ID))
    	// refreshUserInfo();
		// EMA.trigger("cityinfoupdate")
    	return !1
	});
	$("#cities select").change(function () {
		c();
		return !1
	});
	$("#tipsetbox").change(function () {
		!0 == $("#tipsetbox").attr("checked") ? Utils.setCookie("notip", 1, 365) : Utils.delCookie("notip");
		return !1
	});
	$("#menu1").click(function () {
		main_loadDiv("f_quest.html", function () {});
		return !1
	});
	$("#menu2").click(function () {
		main_loadDiv("f_item.html", function () {});
		return !1
	});
	$("#menu3").click(function () {
		main_loadDiv("f_trade.html",
			function () {});
		return !1
	});
	$("#menu4").click(function () {
		main_loadDiv("f_shop.html", function () {});
		return !1
	});
	$("#menu5").click(function () {
		main_loadDiv("f_map.html", function () {});
		return !1
	});
	$("#menu6").click(function () {
		main_loadDiv("f_fav.html", function () {});
		return !1
	});
	$("#menu7").click(function () {
		main_loadDiv("f_ally.html", function () {});
		return !1
	});
	$("#menu8").click(function () {
		main_loadDiv("f_chat.html", function () {
			chatDisplay = 0;
			$("#main_chatmsg").hide()
		});
		return !1
	});
	$("#menu9").click(function () {
		main_loadDiv("f_mail.html",
			function () {
			hideNewMail();
			if ("undefined" != typeof resetbadge && 1 == resetbadge)
				location.href = "js-call:resetbadge"
		});
		return !1
	});
	
	$("#menu10").click(function(){main_loadDiv("f_rank.html",function(){});return!1});
	$("#menu11").click(function () {main_loadDiv("f_help.html", function () {});return !1});
	$("#confirm_yes").click(function () {$.isFunction(okfunc) && okfunc();$("#confirm").hide();return !1});
	$("#confirm_no").click(function () {$("#confirm").hide();return !1});
	$("#info_confirm").click(function () {$.isFunction(infofunc)&&infofunc();$("#info").hide();pnlLoading.hide();return !1});
	$("#u_loot").click(function () {var a = $("#u_cities SELECT").val().split(".");
		Utils.setCookie("warinfo", {
			type : 0,
			x : a[0],
			y : a[1]
		}, 1);
		main_loadDiv("f_city_military.html");
		$("#u_info").hide();
		return !1
	});
	$("#u_scout").click(function () {
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
	$("#u_map").click(function () {
		var a = $("#u_cities SELECT").val().split(".");
		main_loadDiv("f_map.html", {
			x : a[0],
			y : a[1]
		});
		$("#u_info").hide();
		return !1
	});
	$("#u_mail").click(function () {
		GlobalNav.WriteMail($("#u_race b").text());
		$("#u_info").hide();
		return !1
	});
	$("#u_close").click(function () {
		$("#u_info").hide();
		return !1
	});
	$("#u_favorite").click(function () {
		pnlLoading.show();
		ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_FAV, {
			key : key,
			nick : $("#u_race b").text()
		}, function (a) {
			showInfo(translate(LNG.ADDFAVDONE, a.ret.friend.nick))
		});
		return !1
	});
	$("#brink img").click(function () {
		hideHint();
		hideBrink();
		$.isFunction(brinkfunc) && brinkfunc();
		return !1
	});
	$("#server_notice_close").click(function () {
		$("#server_notice").hide();
		return !1
	});
	$("#race em").addClass("race" + userinfo.nationid);
	refreshUserInfo();
	ajaxCall(CONFIG.MYHOST + CONFIG.FUNC_TASK, {
		key : key,
		action : "task_list"
	}, function (a) {
		quests = a.ret.quest;
		!CheckGuideDisplay(null) && 1 != Utils.getCookie("notip") && (a = START_TIPS[Math.round(Math.random() * (START_TIPS.length - 1))], showTip(a))
	});
	EMA.bind("beginCDTimeup", function (a) {
		for (var c = 0; c < a.length; )
			0 == a[c].cdtype ?
			(mainStatus.CITY_INFO.setLevel(a[c].target, mainStatus.CITY_INFO.getLevel(a[c].target) - 1), mainStatus.CITY_INFO[0]++, EMA.trigger("cityinfoupdate")) : 1 == a[c].cdtype && mainStatus.CITY_INFO.setLevel(a[c].target, mainStatus.CITY_INFO.getLevel(a[c].target) + 1), c++
	});
	$.getScript("autogen/building_func.js");
	$.getScript("autogen/tech_func.js");
	Utils.prepare(function (a) {
		$.getJSON("translation/" + window._l + "/building_data.js", function (c) {
			mainStatus.BUILDING_DATA = c;
			a()
		});
		$.getJSON("translation/" + window._l + "/hero_data.js",
			function (c) {
			mainStatus.HERO_DATA = c;
			a()
		});
		$.getJSON("translation/" + window._l + "/item_data.js", function (c) {
			mainStatus.ITEM_DATA = c;
			a()
		});
		$.getJSON("translation/" + window._l + "/soldier" + userinfo.nationid + "_data.js", function (c) {
			mainStatus.SOLDIER_DATA = c;
			a()
		});
		$.getJSON("translation/" + window._l + "/tech_data.js", function (c) {
			mainStatus.TECH_DATA = c;
			a()
		});
		$.getJSON("translation/" + window._l + "/quest_data.js", function (c) {
			mainStatus.QUEST_DATA = c;
			a()
		})
	}, function () {
		return mainStatus.BUILDING_DATA && mainStatus.HERO_DATA &&
		mainStatus.ITEM_DATA && mainStatus.SOLDIER_DATA && mainStatus.QUEST_DATA && mainStatus.TECH_DATA
	}, function () {
		c();
		CMA.reload(mainStatus.CITY_ID);
		pnlLoading.find("label").text("");
		pnlLoading.removeClass("loading1").addClass("loading2")
	})
});
var GlobalNav = {
	WriteMail : function (a) {
		main_loadDiv("f_mail.html", {
			tab : "writemail",
			reciver : a
		})
	},
	Loot : function (a, c) {
		Utils.setCookie("warinfo", {
			type : 0,
			x : a,
			y : c
		}, 1);
		main_loadDiv("f_city_military.html")
	},
	Attack : function (a, c) {
		Utils.setCookie("warinfo", {
			type : 7,
			x : a,
			y : c
		}, 1);
		main_loadDiv("f_city_military.html")
	},
	Occupy : function (a, c) {
		Utils.setCookie("warinfo", {
			type : 8,
			x : a,
			y : c
		}, 1);
		main_loadDiv("f_city_military.html")
	},
	Scout : function (a, c) {
		Utils.setCookie("warinfo", {
			type : 3,
			x : a,
			y : c
		}, 1);
		main_loadDiv("f_city_military.html")
	}
};
