var CreateDiv = function (html) {
	this.html = html
	this.init()
	console.log(html)
}

CreateDiv.prototype.init = function () {
	var div = document.createElement('div')
	div.innerHTML = this.html
	document.body.appendChild(div)
}

var ProxySingleTonCreateDiv = (function (html) {
	var instance;

	return html => {
		console.log(instance)
		if (!instance) {
			instance = new CreateDiv(html)
			console.log(instance.html)
		}
		return instance
	}
})()

var a = ProxySingleTonCreateDiv('a')
var b = ProxySingleTonCreateDiv('b')

console.log(a === b, a, b)