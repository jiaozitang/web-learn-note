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

var ProxySingleTonCreateDiv = function (html) {
	var instance;

	return html => {
		if (!instance) {
			instance = new CreateDiv(html)
			console.log(instance.html)
		}
		return instance
	}
}

var a = new ProxySingleTonCreateDiv('a')()
var b = new ProxySingleTonCreateDiv('b')()

console.log(a === b, a, b)