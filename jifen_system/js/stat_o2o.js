
var debug = false;
var statUrl = "https://flystat.fuiou.com/statAction?callback=?";
if(debug){
		statUrl="http://192.168.8.34:9010/fly-oprstat/statAction?callback=?";
}
var sys = "o2o";

/**
 * 
 * @param user  用户id
 * @param page  页面描述(建议页面描述的首字母)
 * @param event  事件(页面pv:'pv',点击事件:'clk',下拉刷新:'scroll')
 * @param eventDetail  事件详细描述
 * 			(如商品详情页该值表示商品id,营销活动页该值为相应点击事件对应的商品id
 * 				下拉刷新指第几页.
 * 			)
 */
function oprStat(user,page,event,eventDetail){
	var href = window.location.href;
	//eventDetail = eventDetail.replace("window.location.href=","");
	_fly_stat(sys, user, href, page, event, eventDetail);
}


function _fly_stat(sys,user,href,page,event,eventDetail){
	var data = {
			sys:sys,
			user:user,
			href:href,
			page:page,   
			event:event,
			eventDetail:eventDetail
	};
	_fly_ajax(statUrl,data);
}

function _fly_ajax(url, params, callbackFuncName, callback) {
		var paramsUrl = "", jsonp = this.getQueryString(url)[callbackFuncName];
		for ( var key in params) {
			paramsUrl += "&" + key + "=" + encodeURIComponent(params[key]);
		}
		url += paramsUrl;
		window[jsonp] = function(data) {
			window[jsonp] = undefined;
			try {
				delete window[jsonp];
			} catch (e) {
			}

			if (head) {
				head.removeChild(script);
			}
			callback(data);
		};
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.charset = "UTF-8";
		script.src = url;
		head.appendChild(script);
		return true;
	};

function getQueryString(url) {
	var result = {}, queryString = (url && url.indexOf("?") != -1 && url.split("?")[1])
			|| location.search.substring(1), re = /([^&=]+)=([^&]*)/g, m;
	while (m = re.exec(queryString)) {
		result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	}
	return result;
}
	
	