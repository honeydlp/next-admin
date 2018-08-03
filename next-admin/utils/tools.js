export function getBaseName(){
	let baseName = window.location.pathname
	let index = baseName.lastIndexOf('/')
	if(index === 0){
		return ''
	}
	let length = baseName.length;
	if((index+1) === length){
		index = baseName.slice(0,length-1).lastIndexOf('/')
	}
	return baseName.slice(0,index)
}
export function qsStringify(data) {
	let str=[]
	for(let i in data){
		if(Array.isArray(data[i])){
			for(let j in data[i]){
				str.push(`${i}=${data[i][j]}`)
			}
		}else{
			str.push(`${i}=${data[i]}`)
		}
		
	}
	return str.join('&')
}
export function formatTime(time,fmt){ //yyyy-mm-dd
	time = time?new Date(time):new Date()
	fmt = fmt || 'yyyy-MM-dd'
	return time.dateFormat(fmt)
}
export function filterCheckData(data){  //{ label: 'Android版本', value: '2' },针对antd checkGroup遍历
      let tempList = [];
      data.map((v)=>{
            tempList.push(v.value)
            return null
      })
      return tempList;
}
//设置某一天
export function getNowTime(i, isDay,type) {
	var nowDate = new Date();
	if (i !== 0) {
		nowDate.setDate(nowDate.getDate() + i);
	}
	if (isDay) {
		nowDate.setHours(0);
		nowDate.setMinutes(0);
		nowDate.setSeconds(0, 0);
	}
	if(type === 1){ // 日期格式
		return nowDate.dateFormat("yyyy-MM-dd HH:mm:ss")
	}
	return nowDate.dateFormat("yyyy-MM-dd");
}

Date.prototype.dateFormat = function(fmt) {
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, // 小时
		"H+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	var week = {
		"0" : "\u65e5",
		"1" : "\u4e00",
		"2" : "\u4e8c",
		"3" : "\u4e09",
		"4" : "\u56db",
		"5" : "\u4e94",
		"6" : "\u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt
				.replace(
						RegExp.$1,
						((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f"
								: "\u5468")
								: "")
								+ week[this.getDay() + ""]);
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}

// 秒换算时分秒
export function sec_to_time(value,markOpts,type){
	markOpts = markOpts || {
		secmark:':',
		minmark:':',
		hormark:':'
	}
	var secondTime = parseInt(value,10);// 秒
	var minuteTime = 0;// 分
	var hourTime = 0;// 小时
	if(secondTime > 59) {//如果秒数大于60，将秒数转换成整数
		//获取分钟，除以60取整数，得到整数分钟
		minuteTime = parseInt(secondTime / 60,10);
		//获取秒数，秒数取佘，得到整数秒数
		secondTime = parseInt(secondTime % 60,10);
		//如果分钟大于60，将分钟转换成小时
		if(minuteTime > 60) {
			//获取小时，获取分钟除以60，得到整数小时
			hourTime = parseInt(minuteTime / 60,10);
			//获取小时后取佘的分，获取分钟除以60取佘的分
			minuteTime = parseInt(minuteTime % 60,10);
		}
	}
	
	if(minuteTime === 0 && hourTime === 0 && secondTime === 0){
		// 以防是毫秒
		secondTime = 1
	}

	if(!type){
		secondTime = secondTime>9?secondTime:'0'+secondTime;
		minuteTime = minuteTime>9?minuteTime:'0'+minuteTime;
		hourTime = hourTime>9?hourTime:'0'+hourTime;	
	}

	var result ;
	if(markOpts.secmark ===':'){
		result = "" + secondTime ;
	}else{
		result = "" + secondTime + markOpts.secmark ;
	}

	if(minuteTime > 0 || hourTime > 0) {
		result = "" + minuteTime + markOpts.minmark + result;
	}
	if(hourTime > 0) {
		result = "" + hourTime + markOpts.hormark + result;
	}
	return result;
}