// 当页面ready的时候，执行回调:
Zepto(function($){
    var iOS = /(iPad|iPhone|iPod)/g.test(window.navigator.userAgent);
    var Android = /Android/i.test(window.navigator.userAgent);
    var _cordovaJs;
    if (iOS) {
        _cordovaJs = 'libs/js/ios/cordova.js';
    } else if (Android) {
        _cordovaJs = 'libs/js/android/cordova.js';
    } else {
        //_fuappJs = "libs/fuapp.js";
        //serverIP_JS = "";
        //_cordovaJs = 'libs/js/android/cordova.js';
    }
    $LAB.script(_cordovaJs).wait(function () {
        $.config = {router: false}
    })
    .script('//g.alicdn.com/msui/sm/0.6.2/js/??sm.min.js,sm-extend.min.js').wait()
    .script("libs/fuapp.js?time=" + new Date().getTime()).wait(function(){
    // console.log('fuapp里');
    // fuApp.userInfo(function(appUserInfo){
    //     if(appUserInfo.rspCode == "0000"){
    //         console.log("用户信息："+JSON.stringify(appUserInfo));
    //         //window.sessionStorage.setItem("userInfo",JSON.stringify(appUserInfo));
    //         //suc(appUserInfo);
    //     }
    //     else{
    //         $.alert(appUserInfo.rspDesc);
    //     }
    // },function(){
    //     $.alert("用户信息获取失败");
    // });
	})
    .script("js/stat_o2o.js?time=" + new Date().getTime())
    .script("js/jifen-common.js?time=" + new Date().getTime()).wait(function () {
        $(document).on("pageInit", "#pageIndex01", function(e) {
            //获取积分
            var userId= null;
            registerDeviceready(function(){
                //判断页面入口
                var isFrom = getAddressParam('isFrom');
                console.log('isFrom'+isFrom);
                if(isFrom=='jifen'){
                    $('#exitApp').attr('href','getMoney.html');
                    $('#goJf').attr('href','getMoney.html');
                    document.addEventListener("backbutton", function () {
                        window.history.back();
                    });
                }else{
                    $('#goJf').attr('href','getMoney.html?isFrom=index');
                    $('#exitApp').on('click', function () {
                        window.sessionStorage.clear();
                        fuApp.exitWebView();
                    });
                    document.addEventListener("backbutton", function () {
                        window.sessionStorage.clear();
                        fuApp.exitWebView();
                        //window.history.back();
                    });
                }
                getUserInfo(function(userInfo){
                    if(userInfo){
                        userId = userInfo.loginId;
                        if(isFrom == 'jifen'){
                        }else{
                        	console.log("maidian:",userId,'jfIndex','clk','jf_from_xbsc_btn');
                        	//oprStat(userId, 'jfIndex', 'clk', 'jf_from_xbsc_btn');
                        }
                        initIntegration(userId);
                    }
                });
            });
            //立即兑换
            $('.item-content').on('click','.item-li',function () {
                var _grouponId = $(this).attr("data-grouponId");
                if(_grouponId){
                	console.log("maidian:",userId,'jfIndex','clk','jf_'+_grouponId);
                    //oprStat(userId, 'jfIndex', 'clk', 'jf_'+_grouponId);
                	//if(isDebug){
                		window.location.href ="purchasedetail.html?grouponId=" + _grouponId;
                	/*}else{
                		var _url = "purchasedetail.html?grouponId=" + _grouponId;
                		var _param = {
							"url":_url,
							"data":"1",
							"showBar":"1",
							"barColor":"FFFF3333",
							"barFontColor":"FFFFFFFF",
							"scrollToHead":false,
							"isCloseCurrent":false
						};
						openNewPage(_url,_param);
                	}*/
                }
            });
           /* $('.item-content').on('click','.item-button',function () {
                $.alert('您的金币不足');
            });*/
        });
        $(document).on("pageInit", "#pageIndex02", function(e){
            var userId= null;
            registerDeviceready(function(){
                //判断页面入口
                var isFrom = getAddressParam('isFrom');
                console.log('isFrom'+isFrom);
                if(isFrom=='index'){//从商城
                    console.log('从商城');
                    $('#goBack').attr('href','index.html');
                    $('#goIndex').attr('href','index.html');
                    document.addEventListener("backbutton", function(){
                        window.history.back();
                    });
                }else{
                    console.log('非商城');
                    $('#goIndex').attr('href','index.html?isFrom=jifen');
                    //$('#04').attr('href','share.html?isFrom=jifen');
                    $('#goBack').on('click', function () {
                        window.sessionStorage.clear();
                        fuApp.exitWebView();
                    });
                    document.addEventListener("backbutton", function(){
                        window.sessionStorage.clear();
                        fuApp.exitWebView();
                        //window.history.back();
                    });
                }
                getUserInfo(function(userInfo){
                    if(userInfo){
                        userId = userInfo.loginId;
                        initIntegration(userId);
                        //加事件埋点
                        if(isFrom == 'index'){
                        	console.log("maidian:",userId,'jfGet','clk','jf_from_index');
                        	//oprStat(userId, 'jfGet', 'clk', 'jf_from_index');
                        }else{
                        	console.log("maidian:",userId,'jfGet','clk','jf_from_xbjb_btn');
                        	//oprStat(userId, 'jfGet', 'clk', 'jf_from_xbjb_btn');
                        }
                    }
                });
            });
            $('.no_get').on('click',function (event) {
                var isClick = true;
                var _md = $(this).attr("data-md");
                console.log("maidian:",userId, 'jfGet', 'clk', _md);
                //oprStat(userId, 'jfGet', 'clk', _md);
                if(isClick){
                    var taskType = $(this).attr('type');
                    if(taskType=="00"){//个人资料
                        getPersonInfo(function(){
                            adduserInteMaintain(userId,taskType);
                        });
                    }
                    if(taskType=="01") {//每日签到
                        adduserInteMaintain(userId,taskType);
                    }
                    if(taskType=="02"){//点击广告
                        adduserInteMaintain(userId,taskType,function () {
                            window.location.href="https://lccsac.fuiou.com/ljx_Invite.html?source=jfsys"
                        });
                    }
                    if(taskType=="03") {//取件
                        var taskCount = $(this).attr('taskCount');
                        if(taskCount){
                            //alert(taskCount);
                            /*if(taskCount==10){//从未取件
                                $.alert('您本月没有取件记录');
                            }*/
                            if(taskCount==0){//已累计10次
                                $.alert('您本月已经获取过10次奖励，请下月再来');
                            } 
                            if(taskCount>0&&taskCount<=10){//已累计10次
                                //$.alert('您本月还可获得'+taskCount+'次金币');
                                adduserInteMaintain(userId,taskType);
                            }
                        }else{
                            $.alert('您本月没有取件记录');
                        }
                    }
                    if(taskType=="05"){//理财
                        var assetfund = $(this).attr('assetfund');
                        if(assetfund==1){//理财：是否有资产 0：没有，1：有
                            adduserInteMaintain(userId,taskType);
                        }else{
                            $.confirm('您当前未投资，是否进入小宝理财？', '温馨提示', function () {
                                window.location.href="https://lccs.fuiou.com:10666/fund/financial_Channel.html?from=jifen";
                                //window.location.href="https://lccs.fuiou.com:10522/fund/financial_Channel.html?from=jifen";
                            });
                        }
                    }
                    isClick = false;
                }
            });
            $(".oprStat").on("click",function(e){
            	//e.preventDefault();
            	var _md = $(this).attr("data-md");
            	console.log("maidian:",userId,'jfGet','clk',_md);
            	//oprStat(userId, 'jfGet', 'clk', _md);
            });
        });
        $(document).on("pageInit", "#pageIndex03", function(e) {
        	$.alert("分享以后选择返回到收件宝App");
            var userId= null;
            registerDeviceready(function(){
                document.addEventListener("backbutton", function () {
                    window.history.back();
                });
                getUserInfo(function(userInfo){
                    if(userInfo){
                        userId = userInfo.loginId;
                    }
                });
            });
            //分享到微信
            var shareToWx = function (type) {
                //调分享接口
                var shareInfo = {
                    shareTitle:'富友收件宝App',//分享的标题 非必填 为空就拿shareContent来当标题
                    avatarUrl:'',//分享的头像 一般分享都会有一个图片当作头像，可以为空，为空的时候默认使用收件宝的图标
                    shareUrl:'https://fly.fuiou.com/download_offclapp.jsp?from=singlemessage',//分享后点击的链接 必填
                    shareContent:'您的生活 金融 服务助手',//分享的内容 必填
                    type:type// 0微信 1朋友圈
                };
                fuApp.shareToThirdDirect(function(data){
                    if(data.rspCode=="0000"){
                        adduserInteMaintain(userId,'04');
                    }else{
                        $.alert("分享失败");
                    }
                },function(data){
                    $.alert("调分享方法失败");
                },shareInfo);
            };
            $('.share_a').on('click', function () {
                var type = $(this).attr('type');
                shareToWx(type);
            })
        });
        $(document).on("pageInit", "#pageIndex04", function(e) {
            registerDeviceready(function(){
                document.addEventListener("backbutton", function () {
                    window.history.back();
                });
            });
            $(".bar-nav a.icon").on("click",function(e){
            	e.preventDefault();
            	window.history.back();
            });
        });
        $(document).on("pageInit", "#pageIndex05", function(e) {
        	registerDeviceready(function(){
        		document.addEventListener("backbutton", function () {
                    window.history.back();
                });
                $(".bar-nav a.icon-left").on("click",function(e){
	            	e.preventDefault();
	            	window.history.back();
	            });
                getUserInfo(function(userInfo){
                    if(userInfo){
                        var userId = userInfo.loginId;
                        var ticket = userInfo.ticket;
                        getExchangedList(userId,ticket);
                    }
                });
            });
            $(".bar a.pull-right").click(function(e){//点击导出记录
            	e.preventDefault();
            	console.log("click");
            });
        });
        
        /*
         * oprStat(userId, 'appIndex', 'clk', SJMD);
		$('.allcontent').on("click", ".oprStat", function() {
			var SJMD = $(this).attr('data_md');
			oprStat(userId, 'appIndex', 'clk', SJMD);
		});
         */
        $.init();
    });
})