// var u = navigator.userAgent, app = navigator.appVersion;
// var Android = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android
// var iOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios
var isDebug = false;//若在本地调试，改为true
// if(isDebug){
//     __cordovaJs = false;
//     Android = true;
// }
//注册deviceready事件
var registerDeviceready = function(devicereadyEvent){
    if(isDebug){
        devicereadyEvent();
    }else{
        //	alert("注册事件");
        document.addEventListener("deviceready",function(){
            //alert("注册事件成功");
            devicereadyEvent();
        },false);
    }
}
//ajax 调用封装公共方法
//本地环境地址
//var serverIP= "http://192.168.8.20:18880/fly-integral/";//测试环境地址
//var serverIP= "http://sjbjf.fuiou.god:10648fly-integral/";//UAT环境地址
var serverIP= "https://sjbjf.fuiou.com/fly-integral/";//生产环境地址
//基本参数
var ajaxAsync = function(options){
    getSessionId(function(suc){
    	options.params.ticket = suc;
    	console.log("请求参数："+JSON.stringify(options.params));
    	return $.ajax({
	        url: serverIP+options.url,
	        data: options.params,
	        dataType:"jsonp",
	        contentType: "application/x-www-form-urlencoded;charset=utf-8",
	        type:"get",
	        jsonp:'jsonpCallback',
	        async:true,
	        cache: false,//不缓存数据
	        success:options.success,
	        timeout:3000,
	        error:function(XMLHttpRequest,textStatus,errorThrown){
	            if(options.fail){
	                options.fail(XMLHttpRequest,textStatus,errorThrown);
	            }
	            //console.log("XMLHttpRequest:"+XMLHttpRequest.status+"||XMLHttpRequest.readyState:"+XMLHttpRequest.readyState+"||textStatus:"+textStatus+"||errorThrown:"+errorThrown);
	        },
	        beforeSend: function(){
	            $.showPreloader();
	        },
	        complete:function(){
	            setTimeout(function () {
	                $.hidePreloader();
	            }, 500);
	        }
	    });
    });
}
//获取sessionId
var getSessionId=function(suc){
	var sessionObj = window.sessionStorage.getItem("thisSessionID");
	if(sessionObj == null || sessionObj == undefined || sessionObj.replace("\"\"","") ==0){
		getUserInfo(function(userInfo){
			console.log("userInfo:",userInfo);
			if(userInfo){
				console.log("返回"+JSON.stringify(userInfo.ticket));
				if (userInfo.ticket.length ==0)
				{
					sessionObj = userInfo.token;
				}else{
					sessionObj = userInfo.ticket;
				}
				sessionStorage.thisSessionID = sessionObj;
				suc(sessionObj);
			}
		});
	}else{
		suc(sessionObj)
	}
};

//获取用户信息并返回
var getUserInfo = function(suc){
    // var userInfoObj = window.sessionStorage.getItem("userInfo");
    // if(!userInfoObj || typeof(userInfoObj)=="undefined"){
    try{
        fuApp.userInfo(function(appUserInfo){
            if(appUserInfo.rspCode == "0000"){
                console.log("用户信息："+JSON.stringify(appUserInfo));
                //window.sessionStorage.setItem("userInfo",JSON.stringify(appUserInfo));
                suc(appUserInfo);
            }
            else{
                $.alert(appUserInfo.rspDesc);
            }
        },function(){
            $.alert("用户信息获取失败");
        });
    }catch(e){
        console.log(e.name + ": " + e.message);
    }
    //}
    // else{
    //     console.log("用户信息："+ userInfoObj);
    //     suc(JSON.parse(userInfoObj));
    // }
}
//获取用户资料
var getPersonInfo = function (suc) {
    fuApp.isUserinfoNotNull(function(personInfo){
        if(personInfo.rspCode == "0000"){
            console.log("个人资料："+JSON.stringify(personInfo));
            suc();
        }
        else{
            //$.alert(personInfo.rspDesc);
        }
    },function(){
        //$.alert("填写个人资料失败");
    });
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
//获取积分
var initIntegration = function (userId,suc) {
    console.log('获取用户积分');
    //var busiDate  = '20170619';
    var busiDate = getCurrentDate();
    ajaxAsync({
    	url:"integral/getUserIntegral.sxf",
    	params:{lid:userId,busiDate:busiDate},
    	success:function(data){
	        //执行代码
	        if(data.rcd=="0000"){
	            console.log("返回："+JSON.stringify(data));
	            window.sessionStorage.setItem('jifenInfo',JSON.stringify(data));
	            if($("#pageIndex01").attr("class") == "page page-current"){
	                $("#gold-total").html(data.integral);
	            }
	            if($("#pageIndex02").attr("class") == "page page-current"){
	                $("#integral").html(data.integral);
	                $("#dayIntegral").html(data.dayIntegral);
	                if(data.assetfund){//理财：是否有资产 0：没有，1：有
	                    $('#05').attr("assetfund",data.assetfund);
	                }
	                //var desc = "已签到";
	                $.each(data.list, function(key, value){
	                    //判断配置是否有效 validConfig：0表示无效，1表示有效
	                    if(value.validConfig=='0'){
	                        $('#'+value.taskType).parent().parent().remove();
	                    }else{
	                        //判断签到任务是否已完成
	                        if(value.complete=="1"){
	                            //var currIntegral = value.currIntegral;
	                            //if(value.taskType=="02"){//点击广告，每次3分
	                            //    desc = "已点击";
	                            //}
	                            //if(value.taskType=="03"){//取件，每月10次，每次5分
	                            //    desc = "已完成";
	                            //}
	                            if(value.taskType=="04"){//邀请好友，每次5分
	                                //desc = "已推荐"
	                                $('#04').removeAttr("href");
	                            }
	                            if(value.taskType=="05"){//理财，每次2分
	                                //desc = "已获取"
	                                $('#05').removeAttr("href");
	                            }
	                            // if(value.taskType=="00"){//个人资料，仅限1次，给50分
	                            //     desc = "已完成"
	                            // }
	                            $('#'+value.taskType).addClass('get').removeClass('no_get').html('已完成');
	                            //$('#'+value.taskType).addClass('get').removeClass('no_get').html(desc+"<span>+"+currIntegral+"</span>");
	                            $('#'+value.taskType).off('click');
	                        }else{
	                            if(value.taskCount){
	                                $('#03').attr("taskCount",value.taskCount);
	                            }
	                            return;
	                        }
	                    }
	                })
	                if(suc){
	                    suc();
	                }
	            }
	        }else{
	            $.alert(data.rDesc);
	        }
	    }
    });
};
//增加积分
var adduserInteMaintain = function (userId,taskType,suc) {
    //var busiDate = '20170619';
    var busiDate = getCurrentDate();
    ajaxAsync({
    	url:"integral/userInteMaintain.sxf",
    	params:{
    		lid:userId,
    		busiType:"0",
    		busiDate:busiDate,
    		taskType:taskType
    	},
    	success:function(data){
	        if(data.rcd=="0000"){
	            initIntegration(userId,function () {
	                if(taskType=='04'){
	                    $.confirm('分享成功,是否返回小宝金币?', '温馨提示', function () {
	                        window.history.back();
	                    });
	                }else{
	                    if(suc) {
	                        suc();
	                    }else{
	                        $.alert("恭喜您，金币已增加");
	                    }
	                }
	            });
	        }else {
	            if(data.rcd=="222"){//连续签到
	                initIntegration(userId,function () {
	                    if(parseInt(data.rDesc)>1){//1就是 不连续签到  大于1的 就是连续天数
	                        $.alert("恭喜您，已连续签到"+data.rDesc+"天");
	                    }else {
	                        $.alert("恭喜您，已签到");
	                    }
	                });
	            }else{
	                $.alert(data.rDesc);
	            }
	        }
	    }
    });
};