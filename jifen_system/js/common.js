//生产环境地址
var serverLQIP_Test = "http://sjbactivity.fuiou.com/fuiou/";//领券接口
var serverIP = "https://buy.fuiou.com/";
var serverIP = "https://ufly.fuiou.com:9618/";
var serverAd = "http://static.fuiou.com/sys/o2o/";
var serverCoupIP = "http://sjbactivity.fuiou.com/fuiou/";
var serverPinIP = "http://sjbactivity.fuiou.com/weixin/fuiou/";//拼团地址

var getSessionId=function(suc){
	var sessionObj = window.sessionStorage.getItem("thisSessionID");
	if(!sessionObj){
		getUserInfo(function(userInfo){
			if(userInfo){
				sessionObj = userInfo.ticket;
				savePubData("thisSessionID",sessionObj);
				suc(sessionObj);
			}
		});
	}else{
		suc(sessionObj)
	}
};
var getIp = function(status){
	var _jfIP= "https://sjbjf.fuiou.com/fly-integral/";//小宝积分生产环境地址
	//var _jfIP = "http://192.168.8.20:18880/fly-integral/";//小宝积分测试环境地址
	var _preIp = "https://buy.fuiou.com/";//生产环境地址
	var _testIp = "https://buy.fuiou.com/TEST/";
	if(status == 0){
		return _jfIP;
	}else if(status == 1){
		return _preIp;
	}else if(status == 2){
		return _testIp;
	}
}
//var serverIP= "http://sjbjf.fuiou.god:10648/fly-integral/";//UAT环境地址
var ajaxAsync = function(options){/*url,params,success,fail,spinner*/
	getSessionId(function(suc){
		options.params.sessionID=suc;
		console.log("sessionID:",options)
		var shareInfo_str = window.sessionStorage.getItem("shareInfo");//生产数据
		if(options.params.status==0 || options.params.status!=undefined){//判断是否是请求小宝积分的接口
			var _url = getIp(options.params.status) + options.url;
			delete options.params['status'];
		}else{
			var _url = getIp(1) + options.url;
		}
		var params_str = JSON.stringify(options.params);
		var allInfo_str = "";
		if(!shareInfo_str){
			allInfo_str="{"+params_str.substring(1,params_str.length-1)+"}";
		}else{
			allInfo_str="{"+shareInfo_str.substring(1,shareInfo_str.length-1) + "," +params_str.substring(1,params_str.length-1)+"}";
		}
		console.log("请求参数："+allInfo_str,"url:",_url);
		var allInfo = JSON.parse(allInfo_str);
		return $.ajax({
			url:_url,
			dataType:"jsonp",
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			type:"get",
			data:allInfo,
			jsonp:'jsonpCallback',
			async:true,
			cache: false,//不缓存数据
			success:options.success,
			timeout:90000,
			error:function(XMLHttpRequest,textStatus,errorThrown){
				if(options.fail){
					options.fail(XMLHttpRequest,textStatus,errorThrown);
				}
			},
			beforeSend: function(){
				//console.log("options.url："+options.url);
				if(options.url!="100001"&&options.url!="100024"&&options.url!="100029"){//01：周边店铺接口；24：团购接口 29:卡券包
					if(document.getElementById("shade")!=undefined){
						$("#shade").show();
					}
				}
			},
			complete:function(){
				if(options.spinner){
					options.spinner.spin();//隐藏 spinner
					if(document.getElementById("shade")!=undefined){
						$("#shade").hide();
					}
				}
			}
		});
	});
};
var isDebug = false;//若在本地调试，改为true
if(window.location.hostname === "192.168.42.33"){
	isDebug = true;
}
if(isDebug){
	__cordovaJs = false;
	Android = true;
}

//获取服务器IP地址
var getServerIp=function(status){
	if(isDebug){
		if(status){
			switch(status)
			{
			case "1":
			  return serverCoupIP_Test;
			  break;
			case "2":
			  return serverPinIP_Test;
			  break;
			case "3":
			  return serverLQIP_Test;
				break;
			}
		}else {
			return serverIP_Test;
		}
	}else{
		if(status){
			switch(status)
			{
			case "1":
			  return serverCoupIP;
			  break;
			case "2":
			  return serverPinIP;
			  break;
			case "3":
				return serverLQIP_Test;
				break;
			}
		}else {
			return serverIP;
		}
	}
}
//获取图片IP地址
//var getServerAd=function(){
//	if(isDebug){
//		return serverAd_Test;
//	}else{
//		return serverAd;
//	}
//}

//公用本地存储数据方法
var savePubData = function(key,pubInfo){
	var str_pubInfo = JSON.stringify(pubInfo);
	try{
		window.sessionStorage.setItem(key,str_pubInfo);
	}catch(e){
		showErrorTipCon("该浏览器暂不支持该方法，请使用其他浏览器！");
	}
}
var getPubData = function(key){
	try{
		var obj_pubInfo = JSON.parse(window.sessionStorage.getItem(key));
		return obj_pubInfo; 
	}catch(e){
		showErrorTipCon("该浏览器暂不支持该方法，请使用其他浏览器！");
	}
}

//存储共用字段
var savePubInfo = function(shareInfo){
	var str_shareInfo = JSON.stringify(shareInfo);
	try{
		window.sessionStorage.setItem("shareInfo",str_shareInfo);
		console.log("shareInfo："+window.sessionStorage.getItem("shareInfo"));
	}catch(e){
		showErrorTipCon("该浏览器暂不支持该方法，请使用其他浏览器！");
	}
}
//存储shopId字段
var saveShopId = function(shopId){
	try{
		window.sessionStorage.setItem("shopId",shopId);
	}catch(e){
		showErrorTipCon("该浏览器暂不支持该方法，请使用其他浏览器！");
	}
}
var getShopId = function(){
	try{
		var shopId = window.sessionStorage.getItem("shopId");
	}catch(e){
	}
	return shopId;
}

//存储当前地址
var saveCurAddInfo = function(curAddInfo){
	try{
		window.sessionStorage.setItem("curAddInfo",curAddInfo);
	}catch(e){
		showErrorTipCon("该浏览器暂不支持该方法，请使用其他浏览器！");
	}
}
//存储小区地址
var saveHomeAddInfo = function(homeAddInfo){
	try{
		window.sessionStorage.setItem("homeAddInfo",homeAddInfo);
	}catch(e){
		showErrorTipCon("该浏览器暂不支持该方法，请使用其他浏览器！");
	}
}
//存储用户信息
var saveUserInfo = function(userInfo){
	var str_userInfo = JSON.stringify(userInfo);
	try{
		window.sessionStorage.setItem("userInfo",str_userInfo);
		console.log(window.sessionStorage.getItem("userInfo"));
	}catch(e){
		showErrorTipCon("该浏览器暂不支持该方法，请使用其他浏览器！");
	}
}
//获取用户信息并返回用户信息
var getUserInfo = function(suc){
	var userInfoObj = window.sessionStorage.getItem("userInfo");
	//alert("从本地存储获取用户信息："+userInfoObj);
	if(!userInfoObj || userInfoObj.length==0){
		try{
			fuApp.userInfo(function(appUserInfo){
				if(appUserInfo.rspCode == "0000"){
					//alert("用户信息："+JSON.stringify(appUserInfo));
					console.log("用户信息："+JSON.stringify(appUserInfo));
					saveUserInfo(appUserInfo);
					suc(appUserInfo);
				}
				else{
					showErrorTipCon("获取用户信息失败");
				}
			},function(){
				showErrorTipCon("用户信息获取失败");
			});
		}catch(e){
			console.log(e.name + ": " + e.message);
		}
	}
	else{
		//alert("本地有数据");
		suc(JSON.parse(userInfoObj));
	}
}
//存储预计算订单数据
var savePreOrderInfo = function(savePreOrderInfo){
	var str_shareInfo = JSON.stringify(savePreOrderInfo);
	try{
		window.sessionStorage.setItem("preOrderInfo",savePreOrderInfo);
		//console.log("预计算订单数据:"+window.sessionStorage.getItem("preOrderInfo"));
	}catch(e){
		showErrorTipCon("该浏览器暂不支持该方法，请使用其他浏览器！");
	}
}

//清除预计算订单数据
var clearPreOrderInfo = function(){
	window.sessionStorage.removeItem("preOrderInfo");
}

//记录访问页面次数
var saveRecordTimes = function(recordTimes){
	var str_shareInfo = JSON.stringify(recordTimes);
	try{
		window.sessionStorage.setItem("recordTimes",recordTimes);
		//console.log(window.sessionStorage.getItem("recordTimes"));
	}catch(e){
		showErrorTipCon("该浏览器暂不支持该方法，请使用其他浏览器！");
	}
}

//存储时间
var saveCacheTime = function(curPage,countTimeData){
	var cacheTimeData = window.sessionStorage.getItem("cacheTimeData");
	if(!cacheTimeData){//不存在
		var cacheTimeObj = {"cacheTimes":[countTimeData]};
		window.sessionStorage.setItem("cacheTimeData",JSON.stringify(cacheTimeObj));
	}else{
		var isExit = isExitTimeData(curPage);
		//alert(isExit);
		if(isExit==1){ //已存在
			return;
		}
		else{
			var cachesArr = JSON.parse(cacheTimeData).cacheTimes;
			cachesArr.push(countTimeData);
			var cacheTimeObj = {"cacheTimes":cachesArr};
			window.sessionStorage.setItem("cacheTimeData",JSON.stringify(cacheTimeObj));
		}
		//console.log(window.sessionStorage.getItem("cacheTimeData"));
	}	
}
var isExitTimeData = function(curPage){
	var cacheTimeData = window.sessionStorage.getItem("cacheTimeData");
	//console.log("cacheDomData:"+cacheDomData);
	if(cacheTimeData){
		cacheTimeData = JSON.parse(cacheTimeData);
		for(var m=0;m<cacheTimeData.cacheTimes.length;m++){
			if(curPage == cacheTimeData.cacheTimes[m].index){
				//alert("已存在");
				return 1; //已存在
			}
		}
	}
	return -1; //不存在
}

//存储Json数据
var saveJsonData = function(curPage,jsonData){
	var cacheJsonData = window.sessionStorage.getItem("cacheJsonData");
	if(!cacheJsonData){//不存在
		var cacheJsonObj = {"jsonDatas":[jsonData]};
		window.sessionStorage.setItem("cacheJsonData",JSON.stringify(cacheJsonObj));
	}else{
		var isExit = isExitJsonData(curPage);
		if(isExit==1){ //已存在
			return;
		}
		else{
			var cachesJsonArr = JSON.parse(cacheJsonData).jsonDatas;
			cachesJsonArr.push(jsonData);
			var cacheJsonObj = {"jsonDatas":cachesJsonArr};
			window.sessionStorage.setItem("cacheJsonData",JSON.stringify(cacheJsonObj));
		}
	}
	//console.log(window.sessionStorage.getItem("cacheJsonData"));	
}

var isExitJsonData = function(curPage){
	var cacheJsonData = window.sessionStorage.getItem("cacheJsonData");
	//console.log("cacheDomData:"+cacheDomData);
	cacheJsonData = JSON.parse(cacheJsonData);
	if(cacheJsonData){
		for(var m=0;m<cacheJsonData.jsonDatas.length;m++){
			if(curPage == cacheJsonData.jsonDatas[m].index){
				return 1; //已存在
			}
		}
	}
	return -1; //不存在
}

var registershopcartclick=function(mark){
	 $(''+mark+'').on("click",function(e){
	 	var current=$(this);
	 	if(current.attr("isvouch")=="false"){
	 		window.location.href="productdetail.html?proId="+current.attr("id");
	 	}else{
	 		window.location.href="procoupondetail.html?vouchId="+current.attr("id");
	 	}
    	e.stopPropagation();
    	e.preventDefault();
    });
}

//修改商品数量
var modifyGoodsNum = function(allGoods,shopId,goodsInfo,existIdx){
	if(!allGoods){
		allGoods = JSON.parse(window.sessionStorage.getItem("goods"));
	}
	if(existIdx == -1){
		existIdx = isGoodExist(shopId,goodsInfo.goodsId);
	}
	if(goodsInfo.num == 0){
		removeGoods(allGoods,shopId,goodsInfo.goodsId,existIdx);
		return;
	}
	var goodsArr = getGoodsInfo(shopId);
	for(var i=0;i<goodsArr.length;i++){
		if(goodsInfo.goodsId == goodsArr[i].goodsId){
			goodsArr[i].num = goodsInfo.num;
		}
	}
	updateData(allGoods,shopId,goodsArr);
}
//删除商品
var removeGoods = function(allGoods,shopId,goodsId,existIdx){
	if(!allGoods){
		allGoods = JSON.parse(window.sessionStorage.getItem("goods"));
	}
	if(existIdx == -1){
		existIdx = isGoodExist(shopId,goodsId);
	}
	var goodsArr = getGoodsInfo(shopId);
	if(goodsArr!=-1){
		goodsArr.splice(existIdx,1);
		updateData(allGoods,shopId,goodsArr);
	}
}
//清除购物车
var clearCart = function(){
	window.sessionStorage.removeItem("goods");
}
//清除所有本地存储数据
var clearAllCache = function(){
	window.sessionStorage.clear();
}
//查找商品是否存在
var isGoodExist= function(shopId,goodsId){
	var shopGoods = getGoodsInfo(shopId);
	if(shopGoods){
		for(var i=0;i<shopGoods.length;i++){
			if(goodsId == shopGoods[i].goodsId){
				return i;
			}
		}
	}
	return -1;
}

//获取地址栏参数
function getAddressParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
}
//获取当前日期
function getCurrentDate(){
    var day=new Date(),Year=0,Month=0,Day=0,CurrentDate="";
    //初始化时间
    Year       = day.getFullYear();
    Month      = day.getMonth()+1;
    Day        = day.getDate();
    CurrentDate = Year;
    if (Month >= 10 )
    {
        CurrentDate = CurrentDate + Month;
    }else
    {
        CurrentDate = CurrentDate + "0" + Month;
    }
    if (Day >= 10 )
    {
        CurrentDate = CurrentDate + Day;
    }
    else
    {
        CurrentDate = CurrentDate + "0" + Day;
    }
    return CurrentDate;
}
var getCurrentTime = function(){
	var date = new Date();
	return date.getHours() + ":" + date.getMinutes();
}

var createLoadingTip = function(){
	var opts = {
		lines: 9, // 花瓣数目
		length: 0,// 花瓣长度
		width: 6,// 花瓣宽度
		radius: 12, // 花瓣距中心半径
		corners: 1,// 花瓣圆滑度 (0-1)
		rotate: 0,// 花瓣旋转角度
		direction: 1,// 花瓣旋转方向 1: 顺时针, -1: 逆时针
		color: '#26bcf9',// 花瓣颜色
		speed: 1,// 花瓣旋转速度
		trail: 85,// 花瓣旋转时的拖影(百分比)
		shadow: false,// 花瓣是否显示阴影
		hwaccel: false,//spinner 是否启用硬件加速及高速旋转     
		className: 'spinner', // spinner css 样式名称
		zIndex: 999,// spinner的z轴 (默认是2000000000)
		top: '50%',// spinner 相对父容器Top定位 单位 px
		left: '50%'// spinner 相对父容器Left定位 单位 px
	};
	var spinner = new Spinner(opts);//实例化loading图案
	var target = $("#loading").get(0);
	spinner.spin(target);
	return spinner;
}

//弹出提示层
var showErrorTipCon = function(content,confirmCallback,cancelCallback){
	var btn_str='';
	if(cancelCallback){
		btn_str = '<div class="cancelBtn" id="cancelBtn">取&nbsp;消</div><div style="width:50%;border-bottom-left-radius:0;" class="errorBtn" id="errorBtn">确&nbsp;定</div>';
	}else{
		btn_str = '<div class="errorBtn" id="errorBtn">确&nbsp;定</div>';
	}
	if($("#errorTipContent").length<=0){
		var html_str = '<div class="errorTipContainer" id="errorTipContent"><div class="errorTip"><div class="errorTitle"><span>提示</span></div><div class="errorContent" id="tipContent">'+content+'</div>'+btn_str+'</div></div>';
		$(document.body).append(html_str);
	}else{
		var _htmlStr = '<div class="errorTip"><div class="errorTitle"><span>提示</span></div><div class="errorContent" id="tipContent">'+content+'</div>'+btn_str+'</div>';
		$("#errorTipContent").html(_htmlStr).css("display","block");
		//$("#tipContent").html(content);
	}
	var fun = function(event){
		event.preventDefault();
		event.stopPropagation();
	}
	document.addEventListener('touchmove', fun, false);
	$("#errorBtn").on("click",function(){
		$("#errorTipContent").css("display","none");
		$("#errorBtn").unbind("click");
		document.removeEventListener('touchmove', fun, false);
		if(document.getElementById("shade")!=undefined){
			$("#shade").hide();
		}
		if(confirmCallback){
			confirmCallback();	
		}
	});
	if(cancelCallback){
		$("#cancelBtn").on("click",function(){
			$("#errorTipContent").css("display","none");
			$("#cancelBtn").unbind("click");
			document.removeEventListener('touchmove', fun, false);
			if(document.getElementById("shade")!=undefined){
				$("#shade").hide();
			}
			cancelCallback();	
		});
	}
}
//加载特效展示
var load_effect = function(){
	//alert("加载特效开始");
	var html_str = '<div class="load"><div class="load_con">加载中...</div></div>';
	$(document.body).append(html_str);
}	


var showErrorTip = function(content,callback){
	$("#errorTipContent").css("display","block");
	$("#tipContent").html(content);
	var fun = function(event){
		event.preventDefault();
		event.stopPropagation();
	}
	if(callback){
		sessionStorage.skiphref=callback;
	}
	document.addEventListener('touchmove', fun, false);
	$("#errorBtn").on("click",function(){
		$("#errorTipContent").css("display","none");
		$("#errorBtn").unbind("click");
		document.removeEventListener('touchmove', fun, false);
		if(sessionStorage.skiphref){
		 window.location.href=sessionStorage.skiphref;
		 sessionStorage.removeItem("skiphref");
		}
		if(document.getElementById("shade")!=undefined){
			$("#shade").hide();
		}
	});
}

var customershowErrorTip=function(fun){
	$("#prompt").css("display","block");
	$("#confirmdelete,#closedelete").on("click",function(e){
		var currentbtn=$(this);
		if(currentbtn.attr("id")=="confirmdelete"){
			fun();
			$("#prompt").css("display","none");
		}else{
			$("#prompt").css("display","none");
		}
	});
}

var compareTime = function(t1,t2){
	var t1s = t1.split(":");
	var t2s = t2.split(":");
	var t1Minute = parseInt(t1s[0]*60) + parseInt(t1s[1]);
	var t2Minute = parseInt(t2s[0]*60) + parseInt(t2s[1]);
	return t1Minute<t2Minute ? true : false;
}

/*
* 获得当前时间日期
* 日期格式为2014-11-02 14:00:30
*/ 
function getCurrentDate(){
    var day=new Date(),
    	Year=0,Month=0,Day=0,Hour = 0,Minute = 0,Second = 0,CurrentDate="";
    //初始化时间
    Year       = day.getFullYear();
    Month      = day.getMonth()+1;
    Day        = day.getDate();
    Hour       = day.getHours();
    Minute     = day.getMinutes();
    Second     = day.getSeconds();
    CurrentDate = Year + "-";
   	CurrentDate+= Month >=10 ? Month+'-' :'0'+Month+'-';
   	CurrentDate+= Day >=10 ? Day+' ' :'0'+Day+' ';
    CurrentDate+= Hour >=10 ? Hour :'0'+Hour;
    CurrentDate+= Minute >=10 ? ":"+Minute :':0'+Minute;
   	CurrentDate+= Second >=10 ? ":"+Second :':0'+Second;
   	return CurrentDate;
}     
//GetDateDiff(start, end, "day")  
/* 
* 获得时间差,时间格式为 年-月-日 小时:分钟:秒 或者 年/月/日 小时：分钟：秒 
* 其中，年月日为全格式，例如 ： 2010-10-12 01:00:00 
* 返回精度为：秒，分，小时，天 
*/  
function GetDateDiff(startTime, endTime, diffType) {  
	//将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式  
	startTime = startTime.replace(/-/g, "/");  
	endTime = endTime.replace(/-/g, "/");
//	alert(startTime);  
//	alert(endTime);  
	//将计算间隔类性字符转换为小写  
	diffType = diffType.toLowerCase();  
	var sTime = new Date(startTime); //开始时间
	var eTime = new Date(endTime); //结束时间
	console.log("sTime"+sTime); 
	console.log("eTime"+eTime); 
	//作为除数的数字  
	var divNum = 1;  
	switch (diffType) {  
		case "second":  
			divNum = 1000;break;  
		case "minute":  
			divNum = 1000 * 60;break;  
		case "hour":  
			divNum = 1000 * 3600;break;  
		case "day":  
			divNum = 1000 * 3600 * 24;break;  
		default:  
			break;  
	} 
	var ts = parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum)); 
	console.log("ts"+ts);
	if(ts > 0){
		return ts;
	}
	else{
		return false;
	}
}  
//字符串转化为时间格式2014-11-02 12:05
//function getFormatTime(time){
//	var year = time.substr(0, 4);
//	var month = time.substr(4, 2);
//	var day= time.substr(6, 2);
//	var hours= time.substr(8, 2);
//	var mins= time.substr(10, 2);
//	var strDate=year+"-"+month+"-"+day+" "+hours+":"+mins;
//	return 	strDate;
//}

//字符串转化为时间格式2014-11-02 12:05
function getFormatTimes(time){
	var strDate = time.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})$/,"$1-$2-$3 $4:$5");//精确到分
	//var strDate = time.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,"$1-$2-$3 $4:$5:$6"); //精确到秒
	return 	strDate;
}

//字符串转化为时间格式2014-11-02
function getFormatData(time){
	var strDate = time.replace(/^(\d{4})(\d{2})(\d{2})$/,"$1-$2-$3"); //精确到日
	return 	strDate;
}

//字符串转化为时间格式2014-11-02 12:05:00
function getFormatDataTime(time,separator){
	if(time){
		var strDate = time.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})$/,"$1"+separator+"$2"+separator+"$3"+" "+"$4"+":"+"$5"); 
		return 	strDate;
	}
	return null;
}
 			
/*
*把数字转化为金额格式
*money:金额数字，num:小数点后保留的位数
*/
function formatMoney(money, num){
   num = num > 0 && num <= 20 ? num : 2;
   money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(num) + "";
   var l = money.split(".")[0].split("").reverse(),
   r = money.split(".")[1];
   t = "";
   for(i = 0; i < l.length; i ++ ){
      t += l[i];
   }
   return t.split("").reverse().join("") + "." + r;
}

//注册deviceready事件
var registerDeviceready = function(devicereadyEvent){
	if(isDebug){
		devicereadyEvent();
	}else{
	//	alert("注册事件");
		document.addEventListener("deviceready",function(){
	//		alert("注册事件成功");
			devicereadyEvent();
		});
	}
}

var u = navigator.userAgent, app = navigator.appVersion;
var Android = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
var iOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

//var iOS = /(iPad|iPhone|iPod)/g.test(window.navigator.userAgent);
//var Android = /Android/i.test(window.navigator.userAgent);
function registerClickevent(tag,Method){
	if(iOS){
		//$(tag).click(Method);
		tag.onclick = Method;
	}
	else{ 
		if(Android){
			//$(tag).touchstart(Method);
			tag.ontouchstart = Method;	
		}
		else{
			//$(tag).click(Method);
			tag.onclick = Method;
			//alert("pc");
		}
	}
}
var addEvent = (function() {
    if (document.addEventListener) {
        return function(el, type, fn) {
            if (el.length) {
                for (var i = 0; i < el.length; i++) {
                    addEvent(el[i], type, fn);
                }
            } else {
                el.addEventListener(type, fn, false);
            }
        };
    } else {
        return function(el, type, fn) {
            if (el.length) {
                for (var i = 0; i < el.length; i++) {
                    addEvent(el[i], type, fn);
                }
            } else {
                el.attachEvent('on' + type,
                function() {
                    return fn.call(el, window.event);
                });
            }
        };
    }
})();

/*计算2个经纬度之间的距离
 * caculate the great circle distance
 * @param {Object} lat1
 * @param {Object} lng1
 * @param {Object} lat2
 * @param {Object} lng2
 */
var EARTH_RADIUS = 6378137.0;//单位M
var PI = Math.PI;    
function getRad(d){
    return d*PI/180.0;
}
function getFlatternDistance(lat1,lng1,lat2,lng2){
	var radLat1 = getRad(lat1);  
	var radLat2 = getRad(lat2);  
	var a = radLat1 - radLat2;  
	var b = getRad(lng1) - getRad(lng2);  
	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +   
		Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));  
	s = s * EARTH_RADIUS;  
	s = Math.round(s * 10000) / 10000;  
	return s;  
}

function getformatWeek(week){
	var weeks=week.split("-");
	if(!week){
		return "可以任何时段使用";
	}
	if(weeks.length==7){
		return "任何时段";
	}
	var resultweek="";
	for (var i=0;i<weeks.length;i++) {
		switch(weeks[i]){
			case "1":resultweek+="周一、";break;
			case "2":resultweek+="周二、";break;
			case "3":resultweek+="周三、";break;
			case "4":resultweek+="周四、";break;
			case "5":resultweek+="周五、";break;
			case "6":resultweek+="周六、";break;
			case "0":resultweek+="周日";break;
		}
	}
	return resultweek.substr(0,resultweek.length-1);
}

//Html结构转字符串形式显示 支持<br>换行
function ToHtmlString(htmlStr) {
    return toTXT(htmlStr).replace(/\&lt\;br[\&ensp\;|\&emsp\;]*[\/]?\&gt\;|\r\n|\n/g, "<br/>");
}
//Html结构转字符串形式显示
function toTXT(str) {
    var RexStr = /\<|\>|\"|\'|\&|　| /g
    str = str.replace(RexStr,function (MatchStr) {
        switch (MatchStr) {
            case "<":
                return "&lt;";break;
            case ">":
                return "&gt;";break;
            case "\"":
                return "&quot;";break;
            case "'":
                return "&#39;";break;
            case "&":
                return "&amp;";break;
            case " ":
                return "&ensp;";break;
            case "　":
                return "&emsp;";break;
            default:
                break;
        }
    });
    return str;
}
function getScrollTop(){
	var topHeight = window.sessionStorage.getItem("scrollTop");
	//console.log("初始页面时的scrollTop:"+topHeight);
	if(topHeight!=null){
		//alert("初始化时获取的存储的高度scrollTop:"+topHeight);
		$("body").animate({scrollTop:topHeight},0.1); 
	}
}

var shade=function(){
	$("#shade").click(function(e){
		$("#cartinfo").slideUp(function(){
			$("#shade").css("display","none");//隐藏遮罩层
			$("#content,#fruittab").css("overflow","auto");
			   	e.stopPropagation();
				e.preventDefault();
		});
	});
}

//拼团JS代码
/*
*把分转化为元格式
*money:金额数字，num:小数点后保留的位数
*/
function formatMYuan(money, num){
   num = num > 0 && num <= 20 ? num : 2;
   money = parseFloat((money/100 + "").replace(/[^\d\.-]/g, "")).toFixed(num) + "";
   var l = money.split(".")[0].split("").reverse(),
   r = money.split(".")[1];
   t = "";
   for(i = 0; i < l.length; i ++ ){
      t += l[i];
   }
   return t.split("").reverse().join("") + "." + r;
}
//弹窗显示或隐藏
function ShowDIV(thisObjID) {
	$("#BgDiv").css("display", "none");
	$('.dialogBox').each(function(index,element){
		$(this).css("display", "none");
	});
	$('.tips').html('');
	$('.ceng').show();
	var srcW = screen.width;
	var outW = $("#DialogDiv").outerWidth();
	var left = (srcW - outW)/2;	
	
	var yscroll = document.documentElement.scrollTop;
	$("#" + thisObjID).css("display", "block");
	$("#" + thisObjID).css("left", left);
	document.documentElement.scrollTop = 0;
}
var turning = false;
var isPay = "0";
var goPay = function(order_obj){
	var payload = '<div class="loadPage" id="loadContain"><div class="loadContain" style="display: block;"><div class="logo"><img src="images/fuiou.png" /></div><div class="loadTip">富友支付，安全保障</div><div class="typing_loader"></div></div></div>';
	$("body").empty().html(payload);
	//var loadContain = document.getElementById("loadContain");//支付状态显示
	window.setTimeout(function(){
		fuApp.pay(function(data){
			isPay = "1";
			window.sessionStorage.setItem("isPay","1");
			window.location.href = "orderFeedback.html?payType=00&payStatus=0";
		},function(data){
			isPay = "1";
			window.sessionStorage.setItem("isPay","1");
			window.location.href = "orderFeedback.html?payType=00&payStatus=1";
		},order_obj)	
	},0)	
}

function detectWebp () {
    if (!window.sessionStorage || typeof sessionStorage !== 'object') return;
    var name = 'webpa'; // webp available
    if (!sessionStorage.getItem(name) || (sessionStorage.getItem(name) !== 'available' && sessionStorage.getItem(name) !== 'disable')) {
        var img = document.createElement('img');
        img.onload = function () {
            try {
                sessionStorage.setItem(name, 'available');
            } catch (ex) {
            }
        };
        img.onerror = function () {
        try {
                sessionStorage.setItem(name, 'disable');
            } catch (ex) {
            }
        };
        img.src = 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA==';
    }
}
function _getwebpsrc(ndimg, imgsrc) {
    var webp_class = 'J-webp',
        needwebp = false,
        src = '';
    if (window.sessionStorage && typeof sessionStorage === 'object') {
        needwebp = window.sessionStorage.getItem('webpa') === 'available' && ndimg.hasClass(webp_class);
    }
    src = needwebp ? imgsrc + '.webp' : imgsrc;

    return src;
}

$(document).ready(function(){
	if($("header")){
		$("header").after("<div style='height:4rem;'></div>");
	}
	if($("footer")){
		$("footer").before("<div style='width:100%; float:left;height:50px;'></div>");
	}
	detectWebp();
});

//阻止页面滚动
var preventScroll = function(){
	window.ontouchmove = function(e) {
	    e.preventDefault && e.preventDefault();
	    e.returnValue = false;
	    e.stopPropagation && e.stopPropagation();
	    return false;
	}
}
//允许页面滚动 
var allowScroll = function(){
	window.ontouchmove = function(e) {
        e.preventDefault && e.preventDefault();
        e.returnValue = true;
        e.stopPropagation && e.stopPropagation();
        return true;
    }
}