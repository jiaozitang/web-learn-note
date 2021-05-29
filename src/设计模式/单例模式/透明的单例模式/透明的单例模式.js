var createDiv = (() => {
	var instance

	var createDiv = (html) => {
		if (instance) {
			return instance
		}
		this.html = html
		this.init()
		return instance = this
	}

	createDiv.prototype.init = () => {
		var div = document.createElement('div')
		div.innerHTML = this.html
		document.body.appendChild(div)
	}

	return createDiv
})