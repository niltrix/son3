var QUEST_GUIDE={1:{newq:[{info:["Young Lord, I'm <b>Dhudrib</b>, your father's old friend. I've heard about your promise to the people - it is very ambitious and respectable, and I'm here to help you!","First, a wise thing for a young Lord, is to follow <b>Quest</b>. Quest will teach you how to develop step by step, and its rewards will be very helpful.","During the tutorial, unrelated buttons will be <b>locked</b> and you must <b>follow my instructions</b>."]},{brink:{x:0,y:280,w:43,h:40,fn:function(){$("#menu1").click()}},
hint:{htm:"<b>Tap here</b> to work on your <b>Quests</b> and get Rewards.",x:0,y:220,a:"dl"}},{brink:{x:410,y:38,w:70,h:23,fn:function(){$("#f_quest_accept").click()}},hint:{htm:"<b>Tap here</b> to accept the Quest.",x:350,y:61,a:"ur"}}],accept:[{info:["Excellent, you have accepted the quest to build houses for people. Lets do it now!"],fn:function(){showCity()}},{brink:{x:300,y:119,w:70,h:32,fn:function(){$("#zone1").click()}},hint:{htm:"Tap <b>Downtown</b> to build <b>Houses</b>.",x:300,y:65,a:"dl"}},
{brink:{x:400,y:74,w:70,h:25,fn:function(){$("#f_house").find("#f_upgrade").click()}},hint:{htm:"Tap <b>Upgrade</b> to start building Houses.",x:340,y:96,a:"ur"}},{info:["This Quest will be accomplished when construction ends, then you may tap <b>Quest</b> menu to get Rewards."]}],done:[{info:["Well done! You are learning things really fast... you have potential to be a great Lord."],fn:function(){main_loadDiv("f_quest.html")}},{brink:{x:0,y:64,w:130,h:35,fn:function(){$("#f_quest_quest1").click()}},
hint:{htm:"<b>Tap here</b> to select the acomplished Quest.",x:0,y:100,a:"ul"}},{brink:{x:410,y:38,w:70,h:23,fn:function(){$("#f_quest_accept").click()}},hint:{htm:"<b>Tap here</b> to get Quest Reward.",x:350,y:61,a:"ur"}}]},2:{newq:[{info:['<img src="img/res/food.png"/><b>Food</b> is very important, especially for the army - soldiers have to eat, and they will die if food is exhausted.',"<b>Farm</b> can produce <b>Food</b>, lets start building it."],fn:function(){$("#menu1").click()}},{brink:{x:410,
y:38,w:70,h:23,fn:function(){$("#f_quest_accept").click()}},hint:{htm:"<b>Tap here</b> to accept the Quest.",x:350,y:61,a:"ur"}}],accept:[{info:["Excellent, you have accepted the quest to build Farm. Lets do it now!"],fn:function(){showCity()}},{brink:{x:200,y:79,w:70,h:32,fn:function(){Utils.setCookie("scrollto","-110",1);$("#zone5").click()}},hint:{htm:"Tap <b>Resource</b> to build <b>Farm</b>.",x:200,y:25,a:"dl"}},{brink:{x:400,y:203,w:70,h:25,fn:function(){$("#f_fac_food").find("#f_upgrade").click()}},
hint:{htm:"Tap <b>Upgrade</b> to start building Farm.",x:340,y:222,a:"ur"}},{info:["This Quest will be accomplished when construction ends, then you may tap <b>Quest</b> menu to get Rewards."]}]},14:{newq:[{info:['<img src="img/res/wood.png"/><b>Wood</b> is a very important resource in Emross. <b>Sawmill</b> can produce <b>Wood</b>, lets start building it.'],fn:function(){$("#menu1").click()}},{brink:{x:410,y:38,w:70,h:23,fn:function(){$("#f_quest_accept").click()}},hint:{htm:"<b>Tap here</b> to accept the Quest.",
x:350,y:61,a:"ur"}}],accept:[{info:["Excellent, you have accepted the quest to build Sawmill. Lets do it now!"],fn:function(){showCity()}},{brink:{x:200,y:79,w:70,h:32,fn:function(){$("#zone5").click()}},hint:{htm:"Tap <b>Resource</b> to build <b>Sawmill</b>.",x:200,y:25,a:"dl"}},{brink:{x:400,y:74,w:70,h:25,fn:function(){$("#f_fac_wood").find("#f_upgrade").click()}},hint:{htm:"Tap <b>Upgrade</b> to start building Sawmill.",x:340,y:95,a:"ur"}},{info:["This Quest will be accomplished when construction ends, then you may tap <b>Quest</b> menu to get Rewards."]}]},
15:{newq:[{info:['<img src="img/res/iron.png"/><b>Iron</b> is a very important resource in Emross. <b>IronMine</b> can produce <b>Iron</b>, lets start building it.'],fn:function(){$("#menu1").click()}},{brink:{x:410,y:38,w:70,h:23,fn:function(){$("#f_quest_accept").click()}},hint:{htm:"<b>Tap here</b> to accept the Quest.",x:350,y:61,a:"ur"}}],accept:[{info:["Excellent, you have accepted the quest to build IronMine. Lets do it now!"],fn:function(){showCity()}},{brink:{x:200,y:79,w:70,h:32,fn:function(){$("#zone5").click()}},
hint:{htm:"Tap <b>Resource</b> to build <b>Sawmill</b>.",x:200,y:25,a:"dl"}},{brink:{x:400,y:152,w:70,h:25,fn:function(){$("#f_fac_iron").find("#f_upgrade").click()}},hint:{htm:"Tap <b>Upgrade</b> to start building IronMine.",x:340,y:174,a:"ur"}},{info:["This Quest will be accomplished when construction ends, then you may tap <b>Quest</b> menu to get Rewards."]}]},16:{newq:[{info:['<img src="img/res/ic06_other.gif"/><b>Gold</b> is a very important resource in Emross. <b>GoldMine</b> can produce <b>Gold</b>, lets start building it.'],
fn:function(){$("#menu1").click()}},{brink:{x:410,y:38,w:70,h:23,fn:function(){$("#f_quest_accept").click()}},hint:{htm:"<b>Tap here</b> to accept the Quest.",x:350,y:61,a:"ur"}}],accept:[{info:["Excellent, you have accepted the quest to build GoldMine. Lets do it now!"],fn:function(){showCity()}},{brink:{x:200,y:79,w:70,h:32,fn:function(){$("#zone5").click()}},hint:{htm:"Tap <b>Resource</b> to build <b>GoldMine</b>.",x:200,y:25,a:"dl"}},{brink:{x:400,y:232,w:70,h:25,fn:function(){$("#f_fac_gold").find("#f_upgrade").click()}},
hint:{htm:"Tap <b>Upgrade</b> to start building GoldMine.",x:340,y:254,a:"ur"}},{info:["This Quest will be accomplished when construction ends, then you may tap <b>Quest</b> menu to get Rewards."]}]},3:{newq:[{info:["I think you have noticed that we are working on a lot of construction recently...","<b>Facility Center</b> is in charge of building process in the castle, we should upgrade it to make it faster."],fn:function(){$("#menu1").click()}},{brink:{x:410,y:38,w:70,h:23,fn:function(){$("#f_quest_accept").click()}},
hint:{htm:"<b>Tap here</b> to accept the Quest.",x:350,y:61,a:"ur"}}],accept:[{info:["Excellent, you have accepted the quest to build Facility Center. Lets do it now!"],fn:function(){showCity()}},{brink:{x:300,y:119,w:70,h:32,fn:function(){$("#zone1").click()}},hint:{htm:"Tap <b>Downtown</b> to build <b>Facility Center</b>.",x:300,y:65,a:"dl"}},{brink:{x:400,y:232,w:70,h:25,fn:function(){$("#f_build").find("#f_upgrade").click()}},hint:{htm:"Tap <b>Upgrade</b> to start building Facility Center.",x:340,
y:254,a:"ur"}},{info:["This Quest will be accomplished when construction ends, then you may tap <b>Quest</b> menu to get Rewards.","And here is a gift: <b>Bless of Building I</b>.<br><br>This item will give us the bless to <b>build 1 extra facility</b> at the same time!","Lets use it ASAP to help our castle develop faster!"]},{brink:{x:48,y:275,w:48,h:44,fn:function(){$("#menu2").click()}},hint:{htm:"Tap <b>Item</b> to view your inventories.",x:45,y:220,a:"dl"}},{brink:{x:410,y:35,w:70,h:30,fn:function(){$("#f_sample_sub_tab6").click()}},
hint:{htm:"Tap <b>Item</b> category.",x:330,y:64,a:"ur"}},{brink:{x:320,y:70,w:70,h:25,fn:function(){EMA.trigger("useitem",166)}},hint:{htm:"Tap <b>Use</b> to use this item.",x:250,y:96,a:"ur"}},{info:["Great! Now you can see how it works in your Downtown <b>Overview</b>."],fn:function(){showCity()}},{brink:{x:405,y:58,w:75,h:25,fn:function(){$("#f_city_citybuffs").click()}},hint:{htm:"Tap <b>Bless Icon</b> to check your current bless.",x:350,y:80,a:"ur"}}]},4:{newq:[{info:["As you know, in order to survive in this chaos world, it is very important to have a powerful military force.",
"<b>Barrack</b> can train <b>Soldiers</b> and perpare them for the war, lets start building it."],fn:function(){$("#menu1").click()}},{brink:{x:410,y:38,w:70,h:23,fn:function(){$("#f_quest_accept").click()}},hint:{htm:"<b>Tap here</b> to accept the Quest.",x:350,y:61,a:"ur"}}],accept:[{info:["Excellent, you have accepted the quest to build Barrack. Lets do it now!"],fn:function(){showCity()}},{brink:{x:160,y:179,w:70,h:32,fn:function(){$("#zone3").click()}},hint:{htm:"Tap <b>Military</b> to build <b>Barrack</b>.",
x:150,y:125,a:"dl"}},{brink:{x:400,y:74,w:70,h:25,fn:function(){$("#f_camp").find("#f_upgrade").click()}},hint:{htm:"Tap <b>Upgrade</b> to start building Barrack.",x:340,y:96,a:"ur"}},{info:["This Quest will be accomplished when construction ends, then you may tap <b>Quest</b> menu to get Rewards."]}]},17:{newq:[{info:["Good progress, it is time to organize our troops!","Now we can train some <b>Infantry</b> in the camp, lets start working on it!"],fn:function(){$("#menu1").click()}},{brink:{x:410,
y:38,w:70,h:23,fn:function(){$("#f_quest_accept").click()}},hint:{htm:"<b>Tap here</b> to accept the Quest.",x:350,y:61,a:"ur"}}],accept:[{info:["Excellent, you have accepted the quest to train Infantry. Lets do it now!"],fn:function(){showCity()}},{brink:{x:160,y:179,w:70,h:32,fn:function(){$("#zone3").click()}},hint:{htm:"Tap <b>Military</b>.",x:150,y:125,a:"dl"}},{brink:{x:335,y:35,w:70,h:30,fn:function(){Utils.setCookie("f_train_no0","10",1);$("#f_tab2").click()}},hint:{htm:"Tap <b>Camp</b> to train <b>Soldier</b>.",
x:340,y:64,a:"ul"}},{brink:{x:400,y:145,w:70,h:25,fn:function(){$("#f_train_no0").find("#f_upgrade").click()}},hint:{htm:"Input 10 Infantry and Tap <b>Train</b>.",x:320,y:168,a:"ur"}},{info:["This Quest will be accomplished when training ends, then you may tap <b>Quest</b> menu to get Rewards."]}]},5:{newq:[{info:["Soldiers must be led by <b>Hero</b> to battle, maybe you already know this.","<b>Arena</b> can attract <b>Heroes</b> to our Castle, and the <b>higher level Arena</b> is, the <b>better Hero</b> we may have chance to recruit.",
"Enough talk, lets proceed with the Arena Quest!"],fn:function(){$("#menu1").click()}},{brink:{x:410,y:38,w:70,h:23,fn:function(){$("#f_quest_accept").click()}},hint:{htm:"<b>Tap here</b> to accept the Quest.",x:350,y:61,a:"ur"}}],accept:[{info:["Excellent, you have accepted the quest to build Arena. Lets do it now!"],fn:function(){showCity()}},{brink:{x:280,y:219,w:70,h:32,fn:function(){$("#zone2").click()}},hint:{htm:"Tap <b>Heroes</b>.",x:280,y:165,a:"dl"}},{brink:{x:400,y:74,w:70,h:25,fn:function(){$("#f_fac_hero").find("#f_upgrade").click()}},
hint:{htm:"Tap <b>Upgrade</b> to start building Arena.",x:340,y:96,a:"ur"}},{info:["This Quest will be accomplished when construction ends, then you may tap <b>Quest</b> menu to get Rewards."]}]},18:{newq:[{info:["Great, you have built <b>Arena</b> and I can see that some <b>Hero</b> is coming to our Castle.","A good Hero is NOT ONLY important for the Army - he/she could help to <b>Train Soldier</b> and <b>Study Skill</b>, accomplishing the jobs faster and better.","Enough talk, lets meet some Heroes there!"],
fn:function(){$("#menu1").click()}},{brink:{x:410,y:38,w:70,h:23,fn:function(){$("#f_quest_accept").click()}},hint:{htm:"<b>Tap here</b> to accept the Quest.",x:350,y:61,a:"ur"}}],accept:[{info:["Excellent, you have accepted the quest to recruit Hero. Lets do it now!"],fn:function(){showCity()}},{brink:{x:280,y:219,w:70,h:32,fn:function(){$("#zone2").click()}},hint:{htm:"Tap <b>Heroes</b>.",x:280,y:165,a:"dl"}},{brink:{x:335,y:35,w:70,h:30,fn:function(){$("#f_tab2").click()}},hint:{htm:"Tap <b>Recruit</b> to meet <b>Hero</b>.",
x:340,y:64,a:"ul"}},{brink:{x:185,y:220,w:90,h:35,fn:function(){$("#f_hero_hire_okay").click()}},hint:{htm:"Tap <b>Buy Drink</b> to know some Hero.",x:120,y:255,a:"ur"}},{info:["This Quest will be accomplished when you have <b>Hired</b> a Hero that you like, then you may tap <b>Quest</b> menu to get Rewards."]}]},6:{newq:[{info:["There are many kinds of incredible skills and magics in this world...","And we could study them in the <b>University</b>. Lets go there and take a look."],fn:function(){$("#menu1").click()}},
{brink:{x:410,y:38,w:70,h:23,fn:function(){$("#f_quest_accept").click()}},hint:{htm:"<b>Tap here</b> to accept the Quest.",x:350,y:61,a:"ur"}}],accept:[{info:["Excellent, you have accepted the quest to build University. Lets do it now!"],fn:function(){showCity()}},{brink:{x:380,y:169,w:70,h:32,fn:function(){$("#zone4").click()}},hint:{htm:"Tap <b>Research</b>.",x:300,y:115,a:"dr"}},{brink:{x:400,y:74,w:70,h:25,fn:function(){$("#f_lab").find("#f_upgrade").click()}},hint:{htm:"Tap <b>Upgrade</b> to start building University.",
x:340,y:96,a:"ur"}},{info:["This Quest will be accomplished when construction ends, then you may tap <b>Quest</b> menu to get Rewards."]}],skip:1},19:{newq:[{info:["Remember, the <b>higher level University</b> is, the <b>better skill and magic</b> we can study from there.","I can see that the skill <b>Forging</b> is in the <b>University</b> ready for study, what are we waiting for?"],fn:function(){$("#menu1").click()}},{brink:{x:0,y:64,w:130,h:35,fn:function(){$("#f_quest_quest19").click()}},hint:{htm:"<b>Tap here</b> to select and view the Quest.",
x:0,y:100,a:"ul"}},{brink:{x:410,y:38,w:70,h:23,fn:function(){$("#f_quest_accept").click()}},hint:{htm:"<b>Tap here</b> to accept the Quest.",x:350,y:61,a:"ur"}}],accept:[{info:["Excellent, you have accepted the quest to study Forging. Lets do it now!"],fn:function(){showCity()}},{brink:{x:380,y:169,w:70,h:32,fn:function(){$("#zone4").click()}},hint:{htm:"Tap <b>Research</b>.",x:300,y:115,a:"dr"}},{brink:{x:410,y:35,w:70,h:30,fn:function(){$("#f_tab2").click()}},hint:{htm:"Tap <b>Research</b> to study skill and magic.",
x:330,y:64,a:"ur"}},{brink:{x:400,y:74,w:70,h:25,fn:function(){$("#f_tech_no0").find("#f_upgrade").click()}},hint:{htm:"Tap <b>Upgrade</b> to start studying Forging.",x:340,y:96,a:"ur"}},{info:["This Quest will be accomplished when studying ends, then you may tap <b>Quest</b> menu to get Rewards."]}],skip:1},7:{newq:[{info:["I think it time to improve our castle defense - <b>Wall</b> could greatly add to the castle defense and help us defeat invasion.","Let go to Castle <b>Wall</b> and check the defense facilities there."],
fn:function(){$("#menu1").click()}},{brink:{x:0,y:64,w:130,h:35,fn:function(){$("#f_quest_quest7").click()}},hint:{htm:"<b>Tap here</b> to select and view the Quest.",x:0,y:100,a:"ul"}},{brink:{x:410,y:38,w:70,h:23,fn:function(){$("#f_quest_accept").click()}},hint:{htm:"<b>Tap here</b> to accept the Quest.",x:350,y:61,a:"ur"}}],accept:[{info:["Excellent, you have accepted the quest to build Castle Wall. Lets do it now!"],fn:function(){showCity()}},{brink:{x:50,y:229,w:70,h:32,fn:function(){$("#zone6").click()}},
hint:{htm:"Tap <b>Defense</b>.",x:50,y:175,a:"dl"}},{brink:{x:400,y:74,w:70,h:25,fn:function(){$("#f_wall").find("#f_upgrade").click()}},hint:{htm:"Tap <b>Upgrade</b> to start building Castle Wall.",x:340,y:96,a:"ur"}},{info:["This Quest will be accomplished when construction ends, then you may tap <b>Quest</b> menu to get Rewards."]}],skip:1},20:{newq:[{info:["You did quite well recently, but remeber it will NOT always be successful in your life - sometimes there will be troubles...","When trouble comes, you must learn to adjust - adjust your strategy according to how the problem develops.<br>And here is one tip for you:",
"Sometimes we may run out of people, and in this case we could adjust <b>Workload</b> to protect the <b>Resource Production</b> that we want most.","And in this way, the development of Castle wont be interrupted..."],fn:function(){$("#menu1").click()}},{brink:{x:0,y:105,w:130,h:35,fn:function(){$("#f_quest_quest20").click()}},hint:{htm:"<b>Tap here</b> to select and view the Quest.",x:0,y:140,a:"ul"}},{brink:{x:410,y:38,w:70,h:23,fn:function(){$("#f_quest_accept").click()}},hint:{htm:"<b>Tap here</b> to accept the Quest.",
x:350,y:61,a:"ur"}}],accept:[{info:["Excellent, you have accepted the quest to adjust Workload. Lets try it now!"],fn:function(){showCity()}},{brink:{x:200,y:79,w:70,h:32,fn:function(){$("#zone5").click()}},hint:{htm:"Tap <b>Resource</b>.",x:200,y:25,a:"dl"}},{brink:{x:335,y:35,w:70,h:30,fn:function(){$("#f_tab2").click()}},hint:{htm:"Tap <b>Manage</b> to set resource production plan.",x:340,y:64,a:"ul"}},{brink:{x:10,y:70,w:460,h:150,fn:function(){}},hint:{htm:"Here you can see resource <b>Production</b> and <b>Workload</b>.",
x:240,y:220,a:"ur"}},{brink:{x:178,y:130,w:55,h:30,fn:function(){$("#f_produce_plan_form_iron").find("#f_plan_per").val("90")}},hint:{htm:"Set Iron Workload to 90% for test.",x:100,y:160,a:"ur"}},{brink:{x:210,y:240,w:70,h:25,fn:function(){$("#f_produce_plan_save a").click()}},hint:{htm:"Tap <b>Save</b> to modify Workload settings.",x:210,y:180,a:"dl"}},{info:["Well done, My Young Lord. Here are all I can teach you right now, and the rest will rely on your own wisdom...","Remember: <b>Follow Quests</b> before you are powerful enough.<br>I will be watching you, and maybe we will meet some time later...",
"May the Power and Wisdom be with you, My Young Lord!"]}],skip:1}};
