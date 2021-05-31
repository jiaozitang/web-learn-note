// 表单dom
const registerForm = document.getElementById('registerForm')

// 表单规则
const rules = {
	userName: [
		{
			strategy: 'isNonEmpty',
			errorMsg: '用户名不能为空'
		},
		{
			strategy: 'minLength:10',
		    errorMsg: '用户名长度不能小于10位'
  		}	
	],
	password: [
		{
	  		strategy: 'minLength:6',
	    	errorMsg: '密码长度不能小于6位'
	  	}
	],
	phoneNumber: [
		{
			strategy: 'isMobile',
			errorMsg: '手机号码格式不正确'
		}
	]
}

// 策略类
let strategies = {
	isNonEmpty: function(value, errorMsg) {
		if (value === '') {
			return errorMsg;
		}
	},
	minLength: function(value, errorMsg, length) {
		console.log(length)
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

// 验证类
const Validator = function () {
	this.cache = []
}

// 添加验证方法
Validator.prototype.add = function ({ dom, rules}) {
	rules.forEach(rule => {
		const { strategy, errorMsg } = rule
		console.log(rule)
		const [ strategyName, strategyCondition ] = strategy.split(':')
		console.log(strategyName)
		const { value } = dom
		this.cache.push(strategies[strategyName].bind(dom, value, errorMsg, strategyCondition))
	})
}

// 开始验证
Validator.prototype.start = function () {
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
}

// 验证函数
const validatorFn = () => {
	const validator = new Validator()
	console.log(validator.add)

	Object.keys(rules).forEach(key => {
		console.log(2222222, rules[key])
		validator.add({
			dom: registerForm[key],
			rules: rules[key]
		})
	})

	const errorMsg = validator.start()
	return errorMsg
}


// 表单提交
registerForm.onsubmit = () => {
	const errorMsg = validatorFn()
	if (errorMsg) {
		alert(errorMsg)
		return false
	}
	return false
}