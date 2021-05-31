let getSingle = fn => {
	let result

	return function () {
		result || (result = fn.apply(this, arguments))
	}
}

let createSingleIframe = getSingle(function () {
	let iframe = document.createElement('iframe')
	document.body.appendChild(iframe)
	console.log(iframe)
	return iframe
})

const iDiv = document.getElementsByTagName('div')[0]
iDiv.onclick = function () {
	let a = createSingleIframe('a')
	let b = createSingleIframe('b')
	console.log(a, b, a=== b)
}
console.log(iDiv, 1111)