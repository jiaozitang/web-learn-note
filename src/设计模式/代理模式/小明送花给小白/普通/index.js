const Flower = function () {
	return '玫瑰🌹'
}

const xiaoming = {
	sendFlower: target => {
		const flower = new Flower()
		target.receiveFlower(flower)
	}
}

const xiaobai = {
	receiveFlower: flower => {
		console.log('收到花', flower)
	}
}

xiaoming.sendFlower(xiaobai)