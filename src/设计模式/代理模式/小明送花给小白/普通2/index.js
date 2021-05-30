const Flower = function () {
	return '玫瑰🌹'
}

const xiaoming = {
	sendFlower: target => {
		debugger
		const flower = new Flower()
		target.receiveFlower(flower)
	}
}

const xiaodai = {
	receiveFlower: flower => {
		xiaobai.listenGoodMood()
		xiaobai.receiveFlower(flower)
	}
}

const xiaobai = {
	receiveFlower: flower => {
		console.log('收到花', flower)
	},
	listenGoodMood: () => {
			// 10秒后，心情变好
			setTimeout(() => {
			}, 10 * 1000)
		})
}

xiaoming.sendFlower(xiaodai)