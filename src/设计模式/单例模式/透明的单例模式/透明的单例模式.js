let createDiv = (() => {
	let instance

	let createDiv = (html) => {
		if (instance) {
			return instance
		}
		this.html = html
		this.init()
		return instance = this
	}

	createDiv.prototype.init = () => {
		let div = document.createElement('div')
		div.innerHTML = this.html
		document.body.appendChild(div)
	}

	return createDiv
})