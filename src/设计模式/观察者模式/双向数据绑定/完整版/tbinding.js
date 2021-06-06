
var Pubsub = {
    subscrib: function(ev, callback) {
        this._callbacks || (this._callbacks = {});
        (this._callbacks[ev] || (this._callbacks[ev] = [])).push(callback);
        
        return this;        
    },

    publish: function() {
        var args = Array.prototype.slice.call(arguments);
        
        var ev = args.shift();
        
        if(!this._callbacks) return this;
        if(!this._callbacks[ev]) return this;
        
        for(var i = 0; i < this._callbacks[ev].length; i++) {
            this._callbacks[ev][i].apply(this, args);
        }
        
        return this;
    }
}


var TBinding = (function(){
    // element keyup and change callback
    function pageElementEventHandler(e) {
        var target = e.target || e.srcElemnt;
        var fullPropName = target.getAttribute('t-binding');

        if(fullPropName && fullPropName !== '') {
            Pubsub.publish('ui-update-event', fullPropName, target.value);
        }

    }
    
    // add keyup and change event listener
    if(document.addEventListener) {
        document.addEventListener('keyup', pageElementEventHandler, false);
        document.addEventListener('change', pageElementEventHandler, false);
    } else {
        document.attachEvent('onkeyup', pageElementEventHandler);
        document.attachEvent('onchange', pageElementEventHandler);
    } 

    // subscrib model-update-event, handle model change, then update UI
    Pubsub.subscrib('model-update-event', function(fullPropName, propValue) {   
        var elements = document.querySelectorAll('[t-binding="' + fullPropName + '"]');

        for(var i = 0, len =elements.length; i < len; i++){
            var elementType = elements[i].tagName.toLowerCase();

            if(elementType === 'input' || elementType === 'textarea' || elementType === 'select') {
                elements[i].value = propValue;
            } else {
                elements[i].innerHTML = propValue;
            }

        }
    });


    return {
        'modelName': '',

        'initModel': function(modelName) {

            var self = this;

            self.modelName = modelName;

            // subscrib ui-update-event, handle ui change then update model
            Pubsub.subscrib('ui-update-event', function(fullPropName, propValue) {
                var propPathArr = fullPropName.split('.');
                self.updateModelData(propPathArr[1], propValue);
            });

            return Object.create(this);
        }, 

        'loadModelData': function(modelData) {
            for(prop in modelData) {
                this.updateModelData(prop, modelData[prop])
            }
        },

        'updateModelData': function(propName, propValue) {    
            eval(this.modelName)[propName] =propValue;   
            Pubsub.publish('model-update-event', this.modelName + '.' + propName, propValue);
        }
    }

})();






