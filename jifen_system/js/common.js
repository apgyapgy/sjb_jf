
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
var ajaxAsync = function(options){/*url,params,success,fail,spinner*/
	getSessionId(function(suc){
		options.params.sessionID=suc;
		var shareInfo_str = window.sessionStorage.getItem("shareInfo");//生产数据
		//console.log("公共字段"+JSON.stringify(shareInfo_str));
		var params_str = JSON.stringify(options.params);
		var allInfo_str = "";
		if(!shareInfo_str){
			allInfo_str="{"+params_str.substring(1,params_str.length-1)+"}";
		}else{
			allInfo_str="{"+shareInfo_str.substring(1,shareInfo_str.length-1) + "," +params_str.substring(1,params_str.length-1)+"}";
		}
		console.log("请求参数："+allInfo_str);
		var allInfo = JSON.parse(allInfo_str);
		var _preUrl = "https://buy.fuiou.com/";
		return $.ajax({
			url:_preUrl + options.url,
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
var isDebug = true;//若在本地调试，改为true
if(isDebug){
	__cordovaJs = false;
	Android = true;
}

var getIp = function(){
	if(isDebug){
		return serverIP_TEST;
	}else{
		return serverIP;
	}
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

//存储店铺、为数组
//var saveShopsId = function(shopId){
//	try{
//		var shopsId = new Array();
//		if(shopId){
//			if(isShopExist!=-1){//店铺不存在
//				shopsId.push(shopId);
//				window.sessionStorage.setItem("shopId",shopsId);
//			}
//		}
//	}catch(e){
//		showErrorTipCon("该浏览器暂不支持该方法，请使用其他浏览器！");
//	}
//}

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



/*
	购物车操作
	购物车需要的字段：商品Id 商品名称、销量、门店价格、现价、是否推荐、数量
	数据类型定义：{goodsId:'123',name:'',salesVolume:'',price:'',discountPrice:'',isCommand:'',num:5,"goodsUnit":""}
	购物车存储数据格式定义:key:goods,value:"[{shopId:14,goods:[{},{}]},{shopId:25,goods:[{},{}]}]"
*/
//获取对应商铺下的商铺列表
var getGoodsInfo = function(shopId){
	//alert("购物车：shopId"+shopId);
	var allGoods = window.sessionStorage.getItem("goods");
	if(!allGoods) return;
	allGoods = JSON.parse(allGoods);
	if(allGoods && allGoods.length >0){
		for(var i=0;i<allGoods.length;i++){
			if(shopId == allGoods[i].shopId){
				return allGoods[i].goods;
			}
		}
	}
	return -1;
}
//添加商品到购物车
var addGoodsToCart = function(shopId,goodsInfo,isgroup){
	var goods = window.sessionStorage.getItem("goods");
	//console.log("购物车信息："+goods);
	if(!goods || isgroup){
		var obj = [{"shopId":shopId,"goods":[goodsInfo]}];
		window.sessionStorage.setItem("goods",JSON.stringify(obj));
	}else{
			var goodsArr = getGoodsInfo(shopId);
			var all_goods_arr = JSON.parse(goods);
			if(goodsArr != -1){
				var isExist = isGoodExist(shopId,goodsInfo.goodsId);
				if(isExist != -1){//商品已经存在
					modifyGoodsNum(all_goods_arr,shopId,goodsInfo,isExist);
				}else{
					goodsArr.push(goodsInfo);
					updateData(all_goods_arr,shopId,goodsArr);
				}
			}else{
				var new_goodsInfo = {shopId:shopId,goods:[goodsInfo]};
				all_goods_arr.push(new_goodsInfo);
				window.sessionStorage.setItem("goods",JSON.stringify(all_goods_arr));
			}
	}
	console.log("购物车信息："+window.sessionStorage.getItem("goods"));
}

//初始化购物车
var iniCartInfo=function(){
	var cartli="",isvouch="";
	var shopCartInfo=JSON.parse(window.sessionStorage.getItem("goods"));
	console.log("购物车商品信息："+window.sessionStorage.getItem("goods"));
	if(shopCartInfo){
		for(var i=0;i<shopCartInfo.length;i++) {
			for (var j=0;j<shopCartInfo[i].goods.length;j++) {
				isexitgoods=$("#"+shopCartInfo[i].goods[j].goodsId).length;//判断购物车中是否已存在该商品信息
				if(isexitgoods==0){
					if(shopCartInfo[i].goods[j].type==2){
						 goodsInfo ="{'type':'2','goodsId':'"+shopCartInfo[i].goods[j].goodsId+"','name':'"+shopCartInfo[i].goods[j].name+"','price':'"+parseInt(shopCartInfo[i].goods[j].price)+"','discountPrice':'"+parseInt(shopCartInfo[i].goods[j].discountPrice)+"','salesVolume':'"+parseInt(shopCartInfo[i].goods[j].salesVolume)+"','goodsUnit':'"+shopCartInfo[i].goods[j].goodsUnit+"'}";
						 isvouch=false;
					}else if(shopCartInfo[i].goods[j].type==1){
						 goodsInfo = "{'type':'1','goodsId':'"+shopCartInfo[i].goods[j].goodsId+"','name':'"+shopCartInfo[i].goods[j].name+"','price':'"+parseInt(shopCartInfo[i].goods[j].price)+"','discountPrice':'"+parseInt(shopCartInfo[i].goods[j].discountPrice)+"','salesVolume':'"+parseInt(shopCartInfo[i].goods[j].salesVolume)+"','goodsUnit':'张','kucun':'"+shopCartInfo[i].goods[j].kucun+"'}";
						 isvouch=true;
					}else if(shopCartInfo[i].goods[j].type==3){
						 goodsInfo = "{'type':'3','goodsId':'"+shopCartInfo[i].goods[j].goodsId+"','name':'"+shopCartInfo[i].goods[j].name+"','price':'"+parseInt(shopCartInfo[i].goods[j].price)+"','discountPrice':'"+parseInt(shopCartInfo[i].goods[j].discountPrice)+"','salesVolume':'"+parseInt(shopCartInfo[i].goods[j].salesVolume)+"','goodsUnit':'张','kucun':'"+shopCartInfo[i].goods[j].kucun+"'}";
						 isvouch=true;
					}
					var minusmark='<a data-kucun="'+shopCartInfo[i].goods[j].kucun+'" data-goodsInfo="'+goodsInfo+'" class="minusmark shopcartminusmark" style="border: none;"><span style="border-color: #d5d5d5;"></span></a>';
					var buynum='<span data-goodsid="'+shopCartInfo[i].goods[j].goodsId+'" class="numbertyle buynum cartbuynum">'+shopCartInfo[i].goods[j].num+'</span>';
					var addmark='<a data-kucun="'+shopCartInfo[i].goods[j].kucun+'" data-goodsInfo="'+goodsInfo+'" class="addmark shopcartaddmark" style="background: transparent;border: none;"><span style="border-color: #d5d5d5;"></span><span style="border-color: #d5d5d5;"></span></a>';
					var re=minusmark+buynum+addmark;
					cartli+='<li isvouch="'+isvouch+'" id="'+shopCartInfo[i].goods[j].goodsId+'"><span class="cartgoodsname">'+shopCartInfo[i].goods[j].name+'</span><span id="cartbuynumprice">￥'+formatMoney(parseFloat(shopCartInfo[i].goods[j].discountPrice/100,2))+'/'+shopCartInfo[i].goods[j].goodsUnit+'</span><span class="purchasequantityarea supermarketbuynum cartbuynumop" style="bottom: 0px;padding-top:5px;position:static">'+re+'</span></li>';
				}
			}
		}
		if(cartli){
			$("#cartinfo ul").append(cartli);
			//console.log(cartli);
			registerminusandaddevent(".shopcartminusmark",".shopcartaddmark");
			$("#deleteshopcart").attr("isempty","false");
    	}
  	}else{
  		$("#deleteshopcart").attr("isempty","true");
  	}
}


var drawCartInfo=function(currentgoodsinfo){
	var isexitgoods,goodsInfo,isvouch,shopId=sessionStorage.shopId;
	var shopCartInfo=JSON.parse(window.sessionStorage.getItem("goods"));
	var cartli=""
	console.log(shopCartInfo);
	if(currentgoodsinfo&&currentgoodsinfo.num==0&&$("#"+currentgoodsinfo.goodsId).length!=0){//这里的作用是当商品减少到0的时候，删除购物车中指定的商品标签
		$("#"+currentgoodsinfo.goodsId).remove();
			if($("#shopcartcurrent li").length==0){
				 $("#deleteshopcart").attr("isempty","true");
				 $("#content,#fruittab").css("overflow","scroll");
//	    					 $("html,body").css("overflow","scroll");
			}
		return;
	}
	var ooo=$("#"+currentgoodsinfo.goodsId);
	isexitgoods=$("#"+currentgoodsinfo.goodsId).length;
	if(isexitgoods==0){
			if(currentgoodsinfo.type==2){
			 goodsInfo ="{'type':'2','goodsId':'"+currentgoodsinfo.goodsId+"','name':'"+currentgoodsinfo.name+"','price':'"+parseInt(currentgoodsinfo.price)+"','discountPrice':'"+parseInt(currentgoodsinfo.discountPrice)+"','salesVolume':'"+parseInt(currentgoodsinfo.salesVolume)+"','goodsUnit':'"+currentgoodsinfo.goodsUnit+"'}";
			isvouch=false;
			}else if(currentgoodsinfo.type==1){
			 goodsInfo = "{'type':'1','goodsId':'"+currentgoodsinfo.goodsId+"','name':'"+currentgoodsinfo.name+"','price':'"+parseInt(currentgoodsinfo.price)+"','discountPrice':'"+parseInt(currentgoodsinfo.discountPrice)+"','salesVolume':'"+parseInt(currentgoodsinfo.salesVolume)+"','goodsUnit':'张','kucun':'"+currentgoodsinfo.kucun+"'}";
			 isvouch=true;
			}
			var minusmark='<a data-kucun="'+currentgoodsinfo.kucun+'" data-goodsInfo="'+goodsInfo+'" class="minusmark shopcartminusmark '+currentgoodsinfo.goodsId+'" style="border: none;"><span style="border-color: #d5d5d5;"></span></a>';
			var buynum='<span data-goodsid="'+currentgoodsinfo.goodsId+'" class="numbertyle buynum cartbuynum">'+currentgoodsinfo.num+'</span>';
			var addmark='<a data-kucun="'+currentgoodsinfo.kucun+'" data-goodsInfo="'+goodsInfo+'" class="addmark shopcartaddmark '+currentgoodsinfo.goodsId+'" style="background: transparent;border: none;"><span style="border-color: #d5d5d5;"></span><span style="border-color: #d5d5d5;"></span></a>';
			var re=minusmark+buynum+addmark;
			cartli+='<li isvouch="'+isvouch+'" id="'+currentgoodsinfo.goodsId+'"><span class="cartgoodsname">'+currentgoodsinfo.name+'</span><span id="cartbuynumprice">￥'+formatMoney(parseFloat(currentgoodsinfo.discountPrice/100,2))+'/'+currentgoodsinfo.goodsUnit+'</span><span class="purchasequantityarea supermarketbuynum cartbuynumop" style="bottom: 0px;padding-top:5px;position:static">'+re+'</span></li>';
	}
	if(cartli){
		$("#cartinfo ul").prepend(cartli);
		registerminusandaddevent("."+currentgoodsinfo.goodsId,"."+currentgoodsinfo.goodsId,shopId)//这里这样注册事件是防止注册多次
//					registershopcartclick("#"+currentgoodsinfo.goodsId);
		$("#deleteshopcart").attr("isempty","false");
	}
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
//isRest 0:营业中 1:休息中 2:休整  type 商品的类型 2：代金券 1:普通商品
function registerminusandaddevent(minusmarkclass,addmarkclass){
	var shopId=window.sessionStorage.getItem("shopId");
	$(".purchasequantityarea").click(function(e){
		e.stopPropagation();
		e.preventDefault();
	})
	$(''+minusmarkclass+','+addmarkclass+'').on({
		"click":function(e){
			var currentclickmark=$(this);
			var getkucun=parseInt(currentclickmark.data("kucun"));
			if(getkucun<=0){
				showErrorTipCon("商品库存不足");
				return;
			}
			var currentclickmark=$(this);//当前点击的mark
			var currentclickmarkclass=currentclickmark.attr("class");
			var currentgoodsinfo=eval("["+currentclickmark.data("goodsinfo")+"]")[0];
			var bn=$('span[data-goodsid='+currentgoodsinfo.goodsId+']');
			if(currentclickmark.attr("id")=="detailminusmark"&&bn.html()==0){
				return;
			}
			if(currentclickmarkclass=="minusmark"||currentclickmarkclass.indexOf("shopcartminusmark")!=-1){
				addandminusmark(currentclickmark,bn,currentgoodsinfo.goodsId);
			}else{
				addandminusmark(currentclickmark,bn,currentgoodsinfo.goodsId);
			}
			//购买的商品信息
			currentgoodsinfo.num=parseInt($(bn[0]).text());//添加购买数量字段
			console.log("当前加入购物车的产品信息："+JSON.stringify(currentgoodsinfo)); 
			addGoodsToCart(shopId,currentgoodsinfo);
			CustomerupdateShopCarInfo(shopId,currentclickmark);
			drawCartInfo(currentgoodsinfo);
			e.stopPropagation();
			e.preventDefault();
		}
	});
}

var submitorder=function(isgroup){
	if(isExitGoodsVouch()==1){
		  showErrorTipCon("代金券只能单独购买！");
		  return;
	   }
	   getUserInfo(function(userInfo){
	   		if(userInfo){
	   			var shopId=sessionStorage.shopId;
				var orderReq;
				//团购100014  普通100004
				var interfaceId = isgroup && isgroup == "1" ? "100014" : "100004";
				goods = getGoodsInfo(shopId);
				console.log("goods"+JSON.stringify(goods));
				var type = goods[0].type;
				var data = {"url":interfaceId,"userId":userInfo.loginId,"shopId":shopId,"type":type};
				var str = "{";
				var paramName = isgroup && isgroup == "1" ? "groupon" : "goodses";
				for(var i=0;i<goods.length;i++){
					if(isgroup && isgroup == "1"){
						var str_field_id = paramName+".Id";
						var str_field_num = paramName+".num";
					}else{
						var str_field_id = paramName+"["+i+"].Id";
						var str_field_num = paramName+"["+i+"].num";
						var str_field_type = paramName+"["+i+"].type";;
					}
					str += "\""+str_field_id+"\":\""+goods[i].goodsId+"\",";
					str += "\""+str_field_num+"\":\""+parseInt(goods[i].num)+"\",";
					str += "\""+str_field_type+"\":\""+parseInt(goods[i].type)+"\"";
					if(i != goods.length-1){
						str += ",";
					}
				}
				str += "}";
				var data_str = JSON.stringify(data); 
				var new_str = "{"+data_str.substring(1,data_str.length-1) + "," +str.substring(1,str.length-1)+"}";
				console.log("参数："+new_str);
				var spinner = createLoadingTip();
				orderReq = ajaxAsync({url:interfaceId,params:JSON.parse(new_str),success:function(orderInfo){
					console.log("返回数据："+JSON.stringify(orderInfo));
					if(orderInfo.rspCd == "0000"){
							clearPreOrderInfo();//清除之前的记录
							savePreOrderInfo(new_str);
							saveRecordTimes("0");//记录是第1次进入下单页面
							if(type == "1"){//电子券
								window.location.href = "order.html?verifyCd="+orderInfo.verifyCd+"&totalPrice="+orderInfo.orderAmt+"&iscoupon="+type+"&voucherCode="+orderInfo.voucherCode;
							}
							else{
								window.location.href = "order.html?verifyCd="+orderInfo.verifyCd+"&totalPrice="+orderInfo.realAmt+"&rate="+orderInfo.shipFee+"&iscoupon="+type+"&goodsPrice="+orderInfo.goodsPrice+"&voucherNm="+orderInfo.voucherNm+"&discountPrice="+orderInfo.discountPrice+"&voucherCode="+orderInfo.voucherCode;								
							}
					}else{
						showErrorTipCon("亲，下单失败，"+orderInfo.rspDesc);
						//$("#goToPay").parent().addClass("redBottomBtn");
						orderReq = null;
					}
				},spinner:spinner,fail:function(){
					//alert("可能出现网络故障，请重试");
					//$("#goToPay").parent().addClass("redBottomBtn");
					orderReq = null;
				}});	
	   		}
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
//查找店铺是否存在
//var isShopExist = function(shopId){
//	var allShops = window.sessionStorage.getItem("shops");
//	if(!allShops) return;
//	allShops = JSON.parse(allShops);
//	if(allShops && allShops.length >0){
//		for(var i=0;i<allShops.length;i++){
//			if(shopId == allShops[i].shopId){
//				return shopId;
//			}
//			else{
//				return -1;
//			}
//		}
//	}
//	return -1;
//}
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

//查找加入购物车的商品类型是否相同
var isGoodsVouch = function(type){
	var allGoods=JSON.parse(window.sessionStorage.getItem("goods"));
	//alert("allGoods:"+JSON.stringify(allGoods));
	if(allGoods){
		for(var i=0; i< allGoods[0].goods.length; i++){
			if(type != allGoods[0].goods[i].type){
				return -1;
			}	
		}
	}
}
//查找加入购物车的商品类型是否相同
var isExitGoodsVouch = function(){
	var allGoods=window.sessionStorage.getItem("goods");
	if(allGoods.indexOf("\"type\":\"2\"")!=-1&&allGoods.indexOf("\"type\":\"1\"")!=-1){
		return 1;
	}
	if(allGoods.indexOf("\"type\":\"2\"")!=-1&&allGoods.indexOf("\"type\":\"3\"")!=-1){
		return 1;
	}
	if(allGoods.indexOf("\"type\":\"1\"")!=-1&&allGoods.indexOf("\"type\":\"3\"")!=-1){
		return 1;
	}
	//alert("查找购物车商品类型是否相同");
	return null;
}
//查找某商品
var findGoods = function(shopId,goodsId){
	var shopGoods = getGoodsInfo(shopId);
	if(shopGoods){
		for(var i=0;i<shopGoods.length;i++){
			if(goodsId == shopGoods[i].goodsId){
				return shopGoods[i];
			}
		}
	}
	return -1;
}
//更新购物车信息
var updateData = function(allGoods,shopId,goodsArr){
	for(var i=0;i<allGoods.length;i++){
		if(shopId == allGoods[i].shopId){
			allGoods[i].goods = goodsArr;
			break;
		}
	}
	window.sessionStorage.setItem("goods",JSON.stringify(allGoods));
}

//加减控制类
function addNum(evt,obj){
	//if(isGoodsVouch($(obj).attr("isvouch"))){
		$(obj).parent().find("input").show();
		$(obj).parent().find("a:first-child").show();
		//$(obj).parent().addClass("addShadow");
		var num = $(obj).parent().find("input.countNumber").val();
		num = Number(num) + 1;
		var maxNum = $(obj).parent().find("input.countNumber").attr("maxnum");
		//alert("maxNum:"+maxNum);
		if(!maxNum){//判断maxnum属性是否存在
			$(obj).parent().find("input.countNumber").val(num);
		}
		else{
			if(num>=parseInt(maxNum)){
				$(obj).parent().find("input.countNumber").val(maxNum);
				showErrorTipCon("该商品已达到每个用户限购量！");
			}
			else{
				$(obj).parent().find("input.countNumber").val(num);
			}
		}
	//}
	evt.stopPropagation();
}

function subNum(evt,obj){	
	var num = $(obj).parent().find("input.countNumber").val();
	if(num>=1){
		num = Number(num) - 1;
		if(num<1){
			$(obj).hide();
			$(obj).parent().find("input").hide();
			$(obj).parent().find("input.countNumber").val("0");
		}
		else{
			$(obj).parent().find("input.countNumber").val(num);
		}
	}
	evt.stopPropagation();	
}

function addandminusmark(obj,buynum,goodsid){
	var currentmark=$(obj);
	var type=currentmark.data("type");//产品类型
	var maxnum=parseInt(currentmark.data("kucun"));//最大购买数量
	var currentbuynum=parseInt($(buynum[0]).text());//当前的购买数量
	var isshopcartaddmark=currentmark.attr("class").indexOf("shopcartaddmark");
	var isYhq=parseInt(currentmark.data("youhuiquan"));//是否是优惠券
	if(currentmark.attr("class").indexOf("add")!=-1){

		if(currentbuynum>=maxnum){
			if(type=="youhuiquan"){
				showErrorTipCon("仅限领取一张优惠券!");
			}else{
				showErrorTipCon("购买数量超过库存!");
			}
			return;
		}else{
			currentbuynum=currentbuynum+1;	
			buynum.html(currentbuynum);
			buynum.prev().css("visibility","visible");
			buynum.css("visibility","visible")
		}
	}else{
		if(currentbuynum>1){
			currentbuynum=currentbuynum-1;
			buynum.html(currentbuynum);
		}else{
			if(currentmark.attr("id")!="detailminusmark"&&$("#detailbuynum").length==0){//这里是为了商品详情页面做特殊处理
				buynum.prev().css("visibility","hidden");
				buynum.css("visibility","hidden")
			}
			buynum.html(0);
		}
	}
}



var calShopTotal = function(shopId){
	var all_goods = getGoodsInfo(shopId);
	if(!all_goods || all_goods.length <=0){
		return {"nums":0,"price":0};
	}
	var num = price = 0;
	//console.log(all_goods.length);
	for(var i=0;i<all_goods.length;i++){
		var obj = all_goods[i];
		var item_num = parseInt(obj.num);
		//console.log("item_num:"+item_num);
		if(!isNaN(item_num)){
			num += parseInt(obj.num);
		}
		var item_price = parseInt(obj.discountPrice);
		//console.log("item_price:"+item_price);
		if(!isNaN(item_price) && !isNaN(item_num)){
			price += item_num * item_price;
		}
	}
	return {"nums":num,"price":Math.round(price)/100};
}
//购物车页面信息更新
var updateShopCarInfo = function(shopId){
	//alert("shopId"+shopId);
	var goodsInfo = calShopTotal(shopId);
	console.log("goodsInfo"+JSON.stringify(goodsInfo));
	$("#amountCart").html(goodsInfo.nums);//购物车内商品总数之和
	$("#resultbuynum").css({"visibility":"visible"}).html(goodsInfo.nums);
	//console.log(goodsInfo.price);
	var price = formatMoney(goodsInfo.price);
	$("#totalPrice").html("¥" + price);//计算购物车内商品总价
	if(goodsInfo.nums>0){
		$("#goToPay").attr("disabled",false);
		$("#goToPay").removeClass("grayButton");
		$("#goToCart").removeClass("grayButton");
		$("#goToCart").css("background-color","#f7761a").removeAttr("disabled");;
		$("#amountCart").show();
		$("#resultbuynum").css({"visibility":"visible"});;
		$(".addCartBtnOne").css({"background":"#ff8900","color":"#fff"});
		$(".addCartBtnOne").attr("disabled",false);
	}
	else{
		$("#goToPay").attr("disabled",true);
		$("#goToPay").addClass("grayButton");
		$("#goToCart").addClass("grayButton");
		$("#goToCart").attr("disabled",true);
		$("#goToCart").css("background-color","#666").attr("disabled","disabled");
		$("#amountCart").hide();
		$("#resultbuynum").css({"visibility":"hidden"});;
		$(".addCartBtnOne").css({"background":"#ddd","color":"#999"});
		$(".addCartBtnOne").attr("disabled",true);
		$("#deleteshopcart").attr("isempty","true");
	}
	return goodsInfo;
}

var CustomerupdateShopCarInfo = function(shopId,currentmark){
	//alert("shopId"+shopId);
	var goodsInfo = calShopTotal(shopId),bn;
	console.log(goodsInfo);
	console.log("goodsInfo"+JSON.stringify(goodsInfo));
	//购物车内商品总数之和
//	bn=goodsInfo.nums>=100?"99+":goodsInfo.nums;
	if(goodsInfo.nums>=100){
		$(".shoppingcartmark em").css("font-size","0.95rem");
		bn="99+";
	}else{
		$(".shoppingcartmark em").css("font-size","1.30rem");
		bn=goodsInfo.nums;
	}
	$("#resultbuynum").css({"visibility":"visible"}).text(bn);
	//console.log(goodsInfo.price);
	var price = formatMoney(goodsInfo.price);
	$("#totalPrice").html("¥" + price);//计算购物车内商品总价
	if(goodsInfo.nums>0){
		$("#resultbuynum").css({"visibility":"visible"});
		$("#submitorder").css("background-color","#f7761a").removeAttr("disabled");
		$("#goToCart").css("background-color","#f7761a").removeAttr("disabled");
		$("#emptyli").remove();
	}
	else{
		$("#emptyli").remove();
		$("#resultbuynum").css({"visibility":"hidden"});
		$("#submitorder").css("background-color","#666").attr("disabled","disabled");
		$("#goToCart").css("background-color","#666").attr("disabled","disabled");
//		$("#shopcartcurrent").append("<li id='emptyli'>购物车是空的</li>");
		if(currentmark&&$(currentmark).attr("class").indexOf("shopcartminusmark")!=-1){
				$("#cartinfo").slideUp(function(){
    					$("#shade").css("display","none");//隐藏遮罩层
    			});
		}
		$("#deleteshopcart").attr("isempty","true");
	}
	return goodsInfo;
}

var initShopCartInfo = function(shopId){
	$("#goToCart").on("click",function(){
		window.location.href = "shoppingCart.html?isgroup=0";
	});	
	return updateShopCarInfo(shopId);
}
var CustomerinitShopCartInfo = function(shopId){
//	$("#submitorder").on("click",function(){
//		window.location.href = "shoppingCart.html?isgroup=0";
//	});	
	return CustomerupdateShopCarInfo(shopId);
}


//获取地址栏参数
function getAddressParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
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
		$("#errorTipContent").css("display","block");
		$("#tipContent").html(content);
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

/*增加推荐团购产品*/
function addGroupbuyInfo(shopId,grouponId,imgsrc,proName,proType,groupBuyNums,proPrice,proUnit,shopPrice,isRest){
	if(imgsrc.length==0){
		var imgsrc = "<span class='spanSmallImg'></span>";
	}
	else{
		var imgsrc = "<img src='"+serverAd+imgsrc+"'></img>";
	}
	if(proType==1){
		proType = "<span class='proTag smallFont'>荐</span>";
	}
	else{
		proType = "";
	}
	proPrice = formatMoney(proPrice/100,2);
	shopPrice = formatMoney(shopPrice/100,2);
	var hrefUrl;
	if(isRest){
		hrefUrl = "window.location.href='purchasedetail.html?shopId="+shopId+"&grouponId="+grouponId+"&isRest="+isRest+"'";
	}
	else{
		hrefUrl = "window.location.href='purchasedetail.html?shopId="+shopId+"&grouponId="+grouponId+"'";
	}				
	var str = "<dl onClick="+hrefUrl+"><dt>"+imgsrc+"</dt><dd><mark class='proName'>"+proName+"</mark>"+proType+"<small class='inlineblock f9 marginLeft'>已抢购"+groupBuyNums+"</small></dd><dd><mark class='biggerFont red fwr'>¥"+proPrice+"<small class='f9'>/"+proUnit+"</small></mark><small style='margin-left:1em;'><s class='inlineblock f9 marginLeft fwr'>¥"+shopPrice+"</s></small></dd></dl>";
	return str;
}

/*增加推荐产品*/
function addTuijianProducts(shopId,productId,imgsrc, proName, proType, proSaleNums, proPrice, proUnit, shopPrice,isRest){
	if(imgsrc.length==0){
		var imgsrc = "<span class='spanSmallImg'></span>";
	}
	else{
		var imgsrc = "<img src='"+serverAd+imgsrc+"'></img>";
	}
	if(proType==1){
		proType = "<span class='proTag smallFont'>荐</span>";
	}
	else{
		proType = "";
	}
	proPrice = formatMoney(proPrice/100,2);
	shopPrice = formatMoney(shopPrice/100,2);
	var hrefUrl;
	if(isRest){
		hrefUrl = "window.location.href='productdetail.html?shopId="+shopId+"&proId="+productId+"&isRest="+isRest+"'";
	}
	else{
		hrefUrl = "window.location.href='productdetail.html?shopId="+shopId+"&proId="+productId+"'";
	}
	var figure;
	var isExist = findGoods(shopId,productId);
	if( isExist!= -1){
		var num = isExist.num;
		figure = "<figure class='numberOfoperation' goodsId='"+productId+"'><a class='countCicle fl' onclick='subNum(arguments[0],this)'><span class='spansubtract'></span></a><input class='countNumber fl' name='textfield' type='number' value='"+num+"' readonly/><a class='countCicle fr' onclick='addNum(arguments[0],this)'><span class='spansubtract'></span><span class='spanplus'></span></a></figure>";
	}
	else{
		figure = "<figure class='numberOfoperation' goodsId='"+productId+"'><a class='countCicle fl' style='display:none' onclick='subNum(arguments[0],this)'><span class='spansubtract'></span></a><input class='countNumber fl none' name='textfield' type='number' value='0' readonly/><a class='countCicle fr' onclick='addNum(arguments[0],this)'><span class='spansubtract'></span><span class='spanplus'></span></a></figure>";
	}
	var str = "<dl><dt onClick="+hrefUrl+">"+imgsrc+"</dt><dd onClick="+hrefUrl+"><mark class='proName'>"+proName+
	"</mark>"+proType+"<small class='inlineblock f9 marginLeft'>销量"+proSaleNums+
	"</small></dd><dd><mark class='red fwr'>¥"+proPrice+"<small class='f9'>/"+proUnit+
	"</small></mark><small style='margin-left:1em;'><s class='inlineblock f9 fwr'>¥"+shopPrice+"</s></small></dd>"+figure+"</dl>";		
	return str;
}

/*增加评论信息*/
function addCommentInfo(commentName,commentInfo,commentTime){
	commentTime = commentTime.substring(0,10);
	var str = "<dl><dt><mark class='f6'>"+commentName+" 说：</mark><small class='fr f9'>"+commentTime+"</small></dt><dd>"+commentInfo+"</dd></dl>";
	return str;
}

/*
* 获得当前时间日期
* 日期格式为2014-11-02 14:00:30
*/ 
function getCurrentDate(){
   var day=new Date();
   var Year=0;
   var Month=0;
   var Day=0;
   var Hour = 0;
   var Minute = 0;
   var Second = 0;
   var CurrentDate="";
   //初始化时间
   Year       = day.getFullYear();
   Month      = day.getMonth()+1;
   Day        = day.getDate();
   Hour       = day.getHours();
   Minute     = day.getMinutes();
   Second     = day.getSeconds();
   CurrentDate = Year + "-";
   if (Month >= 10 ){
   		CurrentDate = CurrentDate + Month + "-";
   }else{
    	CurrentDate = CurrentDate + "0" + Month + "-";
   }
   if (Day >= 10 ){
    	CurrentDate = CurrentDate + Day +" ";
   }else{
    	CurrentDate = CurrentDate + "0" + Day +"";
   }
   if(Hour >=10){
    	CurrentDate = CurrentDate +" "+ Hour ;
   }else{
    	CurrentDate = CurrentDate + "0" + Hour ;
   }
   if(Minute >=10){
    	CurrentDate = CurrentDate + ":" + Minute ;
   }else{
    	CurrentDate = CurrentDate + ":0" + Minute ;
   }     
   if(Second>=10){
    	CurrentDate = CurrentDate + ":" + Second;
   }else{
    	CurrentDate = CurrentDate + ":0" + Second;
   }
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
		divNum = 1000;  
		break;  
		case "minute":  
		divNum = 1000 * 60;  
		break;  
		case "hour":  
		divNum = 1000 * 3600;  
		break;  
		case "day":  
		divNum = 1000 * 3600 * 24;  
		break;  
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
function formatMoney(money, num)
{
   num = num > 0 && num <= 20 ? num : 2;
   money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(num) + "";
   var l = money.split(".")[0].split("").reverse(),
   r = money.split(".")[1];
   t = "";
   for(i = 0; i < l.length; i ++ )
   {
      t += l[i];
   }
   return t.split("").reverse().join("") + "." + r;
}

//订单状态
var orderState = {
	waitToPay:"00",//待付款
	waitToSure:"01",//待确认
	payWaitToSure:"02",//已付款，待确认
	waitToDeliver:"03",//订单已确认，待发货
	alreadySend:"04",//卖家已发货
	tradeFinished:"05",//交易完成
	tradeOvertime:"06",//交易超时
	tradeAbnormal:"07",//交易异常
	returnReview:"10",//退货审核中
	returning:"11",//退货中
	refunding:"12",//退款中
	closed:"13", //交易关闭
	refund:"14" //已退款
};

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
//alert('是否是Android：'+isAndroid);
//alert('是否是iOS：'+isiOS);

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

/*倒计时方法*/
function CountDown(maxtime, fn) {
	var msg;
	var timer = setInterval(function() {
		if (maxtime > 0) {
			var d = Math.floor(maxtime / day);
			var h = Math.floor(maxtime % day / hh);
			h = h < 10 ? "0" + h: "" + h;
			var m = Math.floor(maxtime % day % hh / mm);
			m = m < 10 ? "0" + m: "" + m;
			var s = maxtime%day%hh%mm;
			s = s < 10 ? "0" + s: "" + s;
			if (d > 0) {
				msg = d + '天';
				clearInterval(timer);
			} else {
				msg = h + ':' + m + ':' + s;
			}
			maxtime--;
		} else {
			msg = "活动结束";
			clearInterval(timer);
		}
		fn(msg);
	},
	1000);

}

var day = 24 * 60 * 60,
	hh = 60 * 60,
	mm = 60;
function CustomerCountDown(maxtime, fn,submitbtn,cartbtn,tag,flag) {
	var msg;
	var timer = setInterval(function() {

		if (maxtime > 0) {
			var d = Math.floor(maxtime / day);
			d = d < 10 ? "0" + d : d;
			var h = Math.floor(maxtime % day / hh);
			h = h < 10 ? "0" + h: "" + h;
			var m = Math.floor(maxtime % day % hh / mm);
			m = m < 10 ? "0" + m: "" + m;
			var s = maxtime%day%hh%mm;
			s = s < 10 ? "0" + s: "" + s;
//			if (d > 0) {
//				msg = d + '天';
//				clearInterval(timer);
//			} else {
				msg =d+"天"+h + '时' + m + '分' + s+"秒";
			//}

			maxtime--;
		} else {
			if(flag=="0"){
				getData(true);
				//window.location.reload();
			}else{
				msg = "抢购已结束";
				$("footer").remove();
				//submitbtn.css("background-color","#666");
//				submitbtn.unbind("click",submit);
				tag.css("visibility","collapse");
//				cartbtn.css("background-color","#555");
//				cartbtn.unbind("click");
				$(".buyNum").remove();//去除加减数量
			}
			clearInterval(timer);
		}
		fn(msg);
	},
	1000);
}

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
			case "1":resultweek+="周一、";
					break;
			case "2":resultweek+="周二、";
					break;
			case "3":resultweek+="周三、";
					break;
			case "4":resultweek+="周四、";
					break;
			case "5":resultweek+="周五、";
					break;
			case "6":resultweek+="周六、";
					break;
			case "0":resultweek+="周日";
			        break;
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
    str = str.replace(RexStr,
    function (MatchStr) {
        switch (MatchStr) {
            case "<":
                return "&lt;";
                break;
            case ">":
                return "&gt;";
                break;
            case "\"":
                return "&quot;";
                break;
            case "'":
                return "&#39;";
                break;
            case "&":
                return "&amp;";
                break;
            case " ":
                return "&ensp;";
                break;
            case "　":
                return "&emsp;";
                break;
            default:
                break;
        }
    }
    )
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
//  			$("body,html").css("overflow","auto");
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
function formatMYuan(money, num)
{
   num = num > 0 && num <= 20 ? num : 2;
   money = parseFloat((money/100 + "").replace(/[^\d\.-]/g, "")).toFixed(num) + "";
   var l = money.split(".")[0].split("").reverse(),
   r = money.split(".")[1];
   t = "";
   for(i = 0; i < l.length; i ++ )
   {
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
	
	//$("#BgDiv").css({ display: "block", height: $(document).height() });
	var yscroll = document.documentElement.scrollTop;
	//$("#" + thisObjID).css("top", "100px");
	$("#" + thisObjID).css("display", "block");
	$("#" + thisObjID).css("left", left);
	document.documentElement.scrollTop = 0;
}
var turning = false;
//function //initAddDiv(){
//	//alert("1");
//	if($("header")){
//		$("header").after("<div style='height:4rem;'></div>");
//	}
//	if($("footer")){
//		$("footer").before("<div style='width:100%; float:left;height:50px;'></div>");
//	}
//};
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