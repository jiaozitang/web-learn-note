const myImage = (() => {
	const imgNode = document.createElement('img')
	document.body.appendChild(imgNode)

	return {
		setSrc: src => {
			imgNode.src = src
		}
	}
})()

const loadingSrc = '../../../../img/loading.gif'
const imgSrc = 'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa98e67c4708449eb6894c7133d93774~tplv-k3u1fbpfcp-watermark.image'

const proxyImage = (function () {
	const img = new Image()
	img.onload = () => {
		myImage.setSrc(img.src)
	}

	return {
		setSrc: src => {
			myImage.setSrc(loadingSrc)
			img.src = src
		}
	}
})()

proxyImage.setSrc(imgSrc)

