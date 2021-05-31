let CreateDiv = function (html) {
	this.html = html
	this.init()
	console.log(html)
}

CreateDiv.prototype.init = function () {
	let div = document.createElement('div')
	div.innerHTML = this.html
	document.body.appendChild(div)
}

let ProxySingleTonCreateDiv = function (html) {
	let instance;

	return html => {
		if (!instance) {
			instance = new CreateDiv(html)
			console.log(instance.html)
		}
		return instance
	}
}

let a = new ProxySingleTonCreateDiv('a')()
let b = new ProxySingleTonCreateDiv('b')()

console.log(a === b, a, b)