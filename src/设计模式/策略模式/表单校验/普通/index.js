let registerForm = document.getElementById('registerForm')

registerForm.onsubmit = () => {
	if (registerForm.userName.value) {
		alert('用户名不能为空')
		return false
	}

	if (registerForm.password.value.length < 6) {
		alert('密码长度不能少于6')
		return false
	}

	if (!/(^1[3|5|8][0-9]$)/.test(registerForm.phone.value)) {
		alert('手机号码格式不正确')
		return false
	}
}