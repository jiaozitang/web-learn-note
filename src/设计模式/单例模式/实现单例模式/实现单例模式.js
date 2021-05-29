var Singleton = function (name) {
	this.name = name
	this.instance = null
}

Singleton.prototype.getName = () => {
	console.log(this.name)
}

Singleton.getInstance = name => {
	if (!this.instance) {
		this.instance = new Singleton(name)
	}
	return this.instance
}

// Singleton.getInstance = (() => {
// 	var instance = null
// 	return name => {
// 		if (!instance) {
// 			instance = new Singleton(name)
// 		}
// 		return instance
// 	}
// })()

var a = Singleton.getInstance('b')
var b = Singleton.getInstance('c')

console.log(a === b, a, b)