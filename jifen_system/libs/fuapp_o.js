var iOS = /(iPad|iPhone|iPod)/g.test(window.navigator.userAgent);
var Android = /Android/i.test(window.navigator.userAgent);
var isDebug = true;//本地调试改为true
if(isDebug){
	var fuApp = {
		pay:function(success, failed){
			var obj = {rspCode:"0000",rspDesc:"成功",orderNo:"001",ssn:"002"};
			success(obj);
		},
		//rspCode,rspDesc,provName,cityName,countyName,detailAddr,lnt,lat
		getLocation:function(success, failed){
			//var obj = {rspCode:"0000",rspDesc:"成功",provCd:"021",provName:"上海",cityCd:"0002",cityName:"上海市",countyCd:"",countyName:"浦东新区",detailAddr:"东明路383号",zipcode:"600025",communityName:"东明苑",memo:"",lnt:"121.517863",lat:"31.18897"};
			//var obj ={rspCode:"0000",rspDesc:"成功",provCd:"021",provName:"上海",cityCd:"0001",cityName:"上海市",countyCd:"",countyName:"浦东新区",detailAddr:"三林苑",communityName:"三林体育中心",lnt:"121.111111",lat:"31.111111"};
			var obj = {rspCode:"0001",rspDesc:"不成功",provCd:"021",provName:"",cityCd:"",cityName:"",countyCd:"",countyName:"",detailAddr:"",communityName:"",lnt:"",lat:""};
			success(obj);
		},
		checkApkExist:function(success, failed){
			var obj = {rspCode:"0000",rspDesc:"成功"};
			success(obj);
		},
		userInfo:function(success, failed){
			var obj = {loginId:"13625625040",ticket:"50df27fa-ac87-4f65-8d86-d7dd27992ed9",rspCode:"0000",rspDesc:"成功",mobile:"13625625040",userName:"jane",networkType:"1"};
			//var obj = {rspCode:"0000",rspDesc:"成功",loginId:"15821564897",mobile:"15821564897",userName:"jane",ticket:"001",networkType:"1"};
			//var obj = {rspCode:"0000",rspDesc:"成功",loginId:"15316117950",mobile:"13625625040",userName:"jane",ticket:"d253cbb9-7dd5-4808-9cf1-3e754594146b",networkType:"1"};
			success(obj);
		},
		userHome:function(success, failed){
			var obj = {rspCode:"0000",rspDesc:"成功",provCd:"021",provName:"上海",cityCd:"",cityName:"上海市",countyCd:"",countyName:"浦东新区",detailAddr:"民生路1399号",communityName:"太平人寿大厦",lnt:"121.517863",lat:"31.18897"};
			//var obj = {rspCode:"0000",rspDesc:"成功",provCd:"021",provName:"上海",cityCd:"0002",cityName:"上海市",countyCd:"",countyName:"浦东新区",detailAddr:"东明路383号",zipcode:"600025",communityName:"东明苑",memo:"",lnt:"121.517863",lat:"31.18897"};
			//var obj = {rspCode:"0010",rspDesc:"不成功",provCd:"",provName:"",cityCd:"",cityName:"",countyCd:"",countyName:"",detailAddr:"",communityName:"",lnt:"",lat:""};
			success(obj);
		},
		defaultAddress:function(success, failed){
			var obj = {rspCode:"0000",rspDesc:"成功",provCd:'001',provName:"上海",cityCd:"002",cityName:"苏州市",countyCd:"003",countyName:"浦东新区",detailAddr:"民生路1399号",
			zipcode:"600025",receiverName:"wangyujie",receiverMobile:"18621762052",receiverPhone:"18621762052",receiverEmail:"2291678173@qq.com",memo:""};
			success(obj);
		},
		selectAddress:function(success, failed){
			var obj = {rspCode:"0000",rspDesc:"成功",provName:"上海",cityCd:"",cityName:"上海市",countyCd:"",countyName:"浦东新区",detailAddr:"民生路1399号",
			zipcode:"600025",receiverName:"liuhui",receiverMobile:"18621762052",receiverPhone:"18621762052",receiverEmail:"2291678173@qq.com",memo:""};
			success(obj);
		},
		deviceInfo:function(success, failed){
			var obj = {rspCode:"0000",rspDesc:"成功",os:"android",osVer:"4.4.4",appVer:"1.02.0"};
			success(obj);
		},
		exitWebView:function(success, failed){
			var obj = {rspCode:"0000",rspDesc:"成功"};
			if(success){
				success(obj);
			}
		},
		//给o2o的本地html传递参
		send020Params:function(success, failed){
			//var obj = {proId:"DJQ201511251400129149web97g3p6",proType:""};//测试优惠券
			var obj = {couponId:"C53080055192336",proType:""};//测试优惠券
			//var obj = {shopId:"O2SP20150701144400402rzf2xpmr4k",shopName:"广告店铺名称"};//测试店铺
			//var obj = {proId:"104813142805546",proType:"0"};//团购商品
			//var obj = {proId:"O2GD201505282100248761mhhjnzgx5",shopId:"shop20140603113148383126",proType:"1"};//普通商品
			//var obj = {proId:"DJQ201506041623201593z36zd7wgo",shopId:"O2SP20150528205734138h7gc1os9hu",proType:"2"};//电子券
			//var obj = {couponId:"C32134620191275",proType:""};//营销页面 subjectGoods_two
			//var obj = {couponId:"C72389957292381",proType:""};//营销页面 subjectGoods_two
			//var obj = {couponId:"C66149659333724",proType:""};//营销页面
			//var obj = {couponId:"C57777696606638",proType:""};//营销页面
			//var obj = {couponId:"C26260985118685",proType:""};//拼团页面
			//var obj = {subjectId:"C57777696606638"};//销量排行页面
			//var obj = {subjectId:"C37202432190851"};//销量排行页面
			success(obj);
		},
		//orderNo,busiCd
		getOrderDetail:function(success, failed){
			var obj = {rspCode:"0000",rspDesc:"成功",orderNo:"16010521063607440579",busiCd:"GP02"};//GP02：团购
			//var obj = {rspCode:"0000",rspDesc:"成功",orderNo:"15061012042468634561",busiCd:"PY30"};//PY30：周边
			//var obj = {rspCode:"0000",rspDesc:"成功",orderNo:"201505141859392593862",busiCd:"GP30"};//GP30：电子券
			success(obj);
		},
		setBackTag:function(success, failed){
			var obj = {rspCode:"0000",rspDesc:"成功"};
			success(obj);
		},
		//给本地传递参数
		receiveParams: function (success, failed) {
			var obj = {rspCode:"0000",rspDesc:"成功"};
			success(obj);
		},
		//打开新页面
		openNewPage: function (success, failed) {
			var obj = {rspCode:"0000",rspDesc:"成功"};
			success(obj);
		},
		//分享第三方 
		//参数参数： shareContent，shareUrl
		//比如： {"shareContent":"这里是分享的内容","shareUrl":"https://www.fuiou.com"}
		shareToThird: function (success, failed,shareInfo ) {
			var obj = {rspCode:"0000",rspDesc:"成功"};
			success(obj);
		},
        //调个人资料
        isUserinfoNotNull: function (success, failed ) {
            var obj = {rspCode:"0000",rspDesc:"成功"};
            success(obj);
        },
		//微信分享
		shareToThirdDirect : function (success, failed, shareInfo) {
			var obj = {rspCode:"0000",rspDesc:"成功"};
			success(obj);
		},
		
	};
}else{
    var u = navigator.userAgent, app = navigator.appVersion;
    var Android = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android
    var iOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios
    /*if (iOS) {
	    __cordovaJs="libs/js/ios/cordova.js";
	}else if(Android){
	    __cordovaJs="libs/js/android/cordova.js";
	}
	
	if(__cordovaJs){
	    document.write("<script src=\""+__cordovaJs+"\"></script>");
	}*/
	//cordova.exec参数
    // successCallback : 成功的回调方法
	// failCallback : 失败的回调方法
	// server : 所要请求的服务名字，就是插件类的名字
	// action : 所要请求的服务具体操作，其实就是Native 的方法名，字符串。
	// actionArgs : 请求操作所带的参数，这是个数组。
	var fuApp = {
     	//调用支付网关接口
		//rspCode,rspDesc,orderNo,ssn
		pay:function(success, failed,orderInfo) {
			cordova.exec(function(data){
				if(Android){
					success(JSON.parse(data));
				}else if(iOS){
					success(JSON.parse(JSON.stringify(data)));
				}
			}, failed, "FuApp", "pay", [orderInfo]);
		},
	
		//获取地理位置信息
		//rspCode,rspDesc,provName,cityName,countyName,detailAddr,lnt,lat
		getLocation:function(success, failed) {
			cordova.exec(function(data){
				if(Android){
					success(JSON.parse(data));
				}else if(iOS){
					success(JSON.parse(JSON.stringify(data)));
				}
			}, failed, "FuApp", "location", []);
		},
	
		//检测某应用是否安装
		//rspCode,rspDesc,install
		checkApkExist:function(success, failed,packageName) {
			cordova.exec(function(data){
				if(Android){
					success(JSON.parse(data));
				}else if(iOS){
					success(JSON.parse(JSON.stringify(data)));
				}
			}, failed, "FuApp", "checkApkExist", [packageName]);
		},
	
		//用户信息
		//rspCode,rspDesc,loginId,mobile,userName,ticket
		userInfo: function (success, failed) {
			cordova.exec(function(data){
				if(Android){
					success(JSON.parse(data));
				}else if(iOS){
					success(JSON.parse(JSON.stringify(data)));
				}
			}, failed, "FuApp", "getUserInfo", []);
		},
	
		//小区信息
		//rspCode,rspDesc,provName,cityName,countyName,detailAddr,zipcode,communityName,memo
		userHome: function (success, failed) {
			cordova.exec(function(data){
				if(Android){
					success(JSON.parse(data));
				}else if(iOS){
					success(JSON.parse(JSON.stringify(data)));
				}
			}, failed, "FuApp", "getUserHome", []);
		},
	
		//默认收货地址
		//rspCode,rspDesc,provName,cityName,countyName,detailAddr,zipcode,receiverName,receiverMobile,receiverPhone,receiverEmail,memo
		defaultAddress: function (success, failed) {
			cordova.exec(function(data){
				if(Android){
					success(JSON.parse(data));
				}else if(iOS){
					success(JSON.parse(JSON.stringify(data)));
				}
			}, failed, "FuApp", "getDefaultAddress", []);
		},
		
		//选择收货地址
		//rspCode,rspDesc,provName,cityName,countyName,detailAddr,zipcode,receiverName,receiverMobile,receiverPhone,receiverEmail,memo
		selectAddress: function (success, failed) {
			cordova.exec(function(data){
				if(Android){
					success(JSON.parse(data));
				}else if(iOS){
					success(JSON.parse(JSON.stringify(data)));
				}
			}, failed, "FuApp", "selectAddress", []);
		},
	
		//系统信息
		//rspCode,rspDesc,os,osVer,appVer
		deviceInfo:function(success, failed){
			cordova.exec(function(data){
				if(Android){
					success(JSON.parse(data));
				}else if(iOS){
					success(JSON.parse(JSON.stringify(data)));
				}
			}, failed, "FuApp", "getDeviceInfo", []);
		},
		
		//读取订单列表中，o2o的订单详情
		//orderNo,busiCd
		getOrderDetail: function (success, failed) {
			cordova.exec(function(data){
				if(Android){
					success(JSON.parse(data));
				}else if(iOS){
					success(JSON.parse(JSON.stringify(data)));
				}
			}, failed, "FuApp", "getOrderDetail", []);
		},
		
		//分享第三方 
		// 参数参数： shareContent，shareUrl
		//比如： {"shareContent":"这里是分享的内容","shareUrl":"https://www.fuiou.com"}
		shareToThird: function (success, failed ,shareInfo) {
			cordova.exec(function(data){
				if(Android){
					success(JSON.parse(data));
				}else if(iOS){
					success(JSON.parse(JSON.stringify(data)));
				}
			}, failed, "FuApp", "shareToThird", [shareInfo]);
		},
		
		//给o2o的本地html传递参数 
		// 根据业务定义传递的参数
		send020Params: function (success, failed) {
			cordova.exec(function(data){
				if(Android){
					success(JSON.parse(data));
				}else if(iOS){
					success(JSON.parse(JSON.stringify(data)));
				}
			}, failed, "FuApp", "send020Params", []);
		},
		//给本地传递参数
		receiveParams: function (success, failed , dataInfo) {
			cordova.exec(function(data){
				if(Android){
					success(JSON.parse(data));
				}else if(iOS){
					success(JSON.parse(JSON.stringify(data)));
				}
			}, failed, "FuApp", "receiveParams", [dataInfo]);
		},
		
		//调本地众安保险
		startManyInsurance: function (success, failed , dataInfo) {
			cordova.exec(function(data){
				if(Android){
					success(JSON.parse(data));
				}else if(iOS){
					success(JSON.parse(JSON.stringify(data)));
				}
			}, failed, "FuApp", "startManyInsurance", [dataInfo]);
		},
	
			//是否是点击首页底部进入h5网页的
		//{“isIndexToWeb”:true} true:是通过点击底部进去的 false:点击其他的位置进入
		isIndexToWeb: function (success, failed , dataInfo) {
			cordova.exec(function(data){
				if(Android){
					success(JSON.parse(data));
				}else if(iOS){
					success(JSON.parse(JSON.stringify(data)));
				}
			}, failed, "FuApp", "isIndexToWeb", [dataInfo]);
		},	
	
	
			//点击底部按钮，点击底部的方法
		//[{"index":0}]2.底部的第二个icon,3.底部的第三个icon,4.底部的第四个icon
		openIndexBottom: function (success, failed , dataInfo) {
			cordova.exec(function(data){
				if(Android){
					success(JSON.parse(data));
				}else if(iOS){
					success(JSON.parse(JSON.stringify(data)));
				}
			}, failed, "FuApp", "openIndexBottom", [dataInfo]);
		},	    
	
		 //打开新的网页
		openNewPage: function (success, failed , dataInfo) {
			cordova.exec(function(data){
				if(Android){
					success(JSON.parse(data));
				}else if(iOS){
					success(JSON.parse(JSON.stringify(data)));
				}
			}, failed, "FuApp", "openNewPage", [dataInfo]);
		},
	
		//退出
		exitWebView :function(){
			if(Android){
				navigator.app.exitApp();
			}else{
				//window.open("fuiou-mgr-ios://cordova/back");
				cordova.exec(function(){}, function(){}, "FuApp", "exitWebView", []);
			}
		},
		//调个人资料
		isUserinfoNotNull: function (success, failed ) {
            cordova.exec(function(data){
                if(Android){
                    success(JSON.parse(data));
                }else if(iOS){
                    success(JSON.parse(JSON.stringify(data)));
                }
            }, failed, "FuApp", "isUserinfoNotNull", []);
		},
		//分享第三方 
		// type：新增的字段 0微信 1朋友圈
		// shareContent：分享的内容 必填
		// shareUrl：分享后点击的链接 必填
		// shareTitle：分享的标题 非必填 为空就拿shareContent来当标题
		// avatarUrl：分享的头像 一般分享都会有一个图片当作头像，可以为空，为空的时候默认使用收件宝的图标
		shareToThirdDirect : function (success, failed ,shareInfo) {
			cordova.exec(function(data){
				if(Android){
					success(JSON.parse(data));
				}else if(iOS){
					success(JSON.parse(JSON.stringify(data)));
				}
			}, failed, "FuApp", "shareToThirdDirect", [shareInfo]);
		}
	}
}


