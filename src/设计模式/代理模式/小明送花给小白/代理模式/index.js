const Flower = function () {
	return '玫瑰🌹'
}

const xiaoming = {
	sendFlower: target => {
		const flower = new Flower()
		target.receiveFlower(flower)
	}
}

const xiaodai = {
	receiveFlower: flower => {
		xiaobai.listenGoodMood().then(() => {
			xiaobai.receiveFlower(flower)
		})
	}
}

const xiaobai = {
	receiveFlower: flower => {
		console.log('收到花', flower)
	},
	listenGoodMood: fn => {
		return new Promise((reslove, reject) => {
			// 10秒后，心情变好
			reslove()
		})
	}
}

xiaoming.sendFlower(xiaodai)