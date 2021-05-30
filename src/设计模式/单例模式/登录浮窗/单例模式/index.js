const createLoginLayer = () => {
	const div = document.createElement('div')
	div.innerHTML = '我是登录弹窗'
	div.style.display = 'none'
	console.log(123)

	document.body.appendChild(div)
	return div
}

const createSingle = function(fn) {
	var instance
	return function () {
		return instance || (instance = fn.apply(this, arguments))
	}
}

const createSingleLoginLayer = createSingle(createLoginLayer)

const createSingleIframe = createSingle(() => {
	const iframe = document.createElement('iframe')
	document.body.appendChild(iframe)
	return iframe
})

document.getElementById('loginBtn').onclick = () => {
	const loginLayer = createSingleLoginLayer()
	const iframe = createSingleIframe()
	loginLayer.style.display = 'block'
	iframe.style.display = 'block'
}


