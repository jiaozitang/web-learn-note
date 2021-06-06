
var user = TBinding.initModel('user');

user.loadModelData({
    'name': 'wilber',
    'age': 29,
    'gender': 2
})

user.incAge = function() {
    this.updateModelData('age', user.age + 1);
}

user.decAge = function() {
    this.updateModelData('age', user.age - 1);
}


