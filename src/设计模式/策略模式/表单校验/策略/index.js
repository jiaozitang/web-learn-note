/***********************策略对象**************************/

let strategies = { 
	isNonEmpty: function(value, errorMsg) { 
		if (value === '') { 
			return errorMsg; 
		} 
	},
	 minLength: function(value, length, errorMsg) { 
		if (value.length < length) { 
			return errorMsg; 
		} 
	},
	 isMobile: function(value, errorMsg) { 
		if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) { 
			return errorMsg; 
		} 
	} 
};  

/***********************Validator类**************************/
  
let Validator = function() { 
	this.cache = []; 
};  

Validator.prototype.add = function(dom, rules) {  
	rules.forEach(rule => {
		const { strategy, errorMsg } = rule
		const [ strategyName, strategyCondition ] = strategy.split(':')
		const { value } = dom
		this.cache.push(strategies[strategyName].bind(dom, value, errorMsg))
	})
};  

Validator.prototype.start = function() { 
	let errorMsg
	this.cache.some(cacheItem => {
		const _errorMsg = cacheItem()
		if (_errorMsg) {
			errorMsg = _errorMsg
			return true
		} else {
			return false
		}
	})
	return errorMsg
};  

let validataFunc = () => {
	let validator = new Validator()
	validator.add(registerForm.userName, [{
		strategy: 'isNonEmpty',
		errorMsg: '用户名不能为空'
	},{
		strategy: 'minLength:10',
	    errorMsg: '用户名长度不能小于10位'
  	}]);
  	validator.add(registerForm.password, [{
  		strategy: 'minLength:6',
    	errorMsg: '密码长度不能小于6位'
  	}]);
  	validator.add(registerForm.phoneNumber, [{
  		strategy: 'isMobile',
    	errorMsg: '手机号码格式不正确'
  	}]);

	const errorMsg = validator.start()
	return errorMsg
}
/***********************客户调用代码**************************/
  
let registerForm = document.getElementById('registerForm');  


registerForm.onsubmit = function() { 
	let errorMsg = validataFunc();  
	if (errorMsg) { 
		alert(errorMsg); 
		return false; 
	} 
};   