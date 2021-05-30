const createLoginLayer = () => {
	const div = document.createElement('div')
	div.innerHTML = '我是登录弹窗'
	div.style.display = 'none'
	console.log(123)

	document.body.appendChild(div)
	return div
}

const createSingle = (function () {
	var instance = {}
	return function (fn) {
		if (!instance[fn.name]) {
			instance[fn.name] = fn.apply(this, arguments)
		}
		return instance[fn.name]
	}
})()

function createIframe() {
	const iframe = document.createElement('iframe')
	document.body.appendChild(iframe)
	iframe.style.display = 'none'
	return iframe
}

const createSingleLoginLayer = createSingle(createLoginLayer)
const createSingleIframe = createSingle(createIframe)

document.getElementById('loginBtn').onclick = () => {
	const loginLayer = createSingleLoginLayer
	const iframe = createSingleIframe
	loginLayer.style.display = 'block'
	iframe.style.display = 'block'
}


