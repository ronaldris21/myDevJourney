// 2694. Event Emitter

class EventEmitter {

    constructor() {
        this.eventCallbacks = {};
    }

    /**
     * @param {string} eventName
     * @param {Function} callback
     * @return {Object}
     */
    subscribe(eventName, callback) {

        if (eventName in this.eventCallbacks) {
            this.eventCallbacks[eventName].push(callback);
        }
        else {
            this.eventCallbacks[eventName] = [callback];
        }


        return {
            unsubscribe: () => {
                this.eventCallbacks[eventName] = this.eventCallbacks[eventName].filter(fn => fn !== callback);

                if (this.eventCallbacks[eventName].length === 0) {
                    delete this.eventCallbacks[eventName];
                }

                return undefined;
            }
        };
    }

    /**
     * @param {string} eventName
     * @param {Array} args
     * @return {Array}
     */
    emit(eventName, args = []) {
        const result = [];
        if (eventName in this.eventCallbacks) {
            this.eventCallbacks[eventName].forEach(fn => {
                result.push(fn(...args));
            })
        }

        return result;



    }
}

/**
 * const emitter = new EventEmitter();
 *
 * // Subscribe to the onClick event with onClickCallback
 * function onClickCallback() { return 99 }
 * const sub = emitter.subscribe('onClick', onClickCallback);
 *
 * emitter.emit('onClick'); // [99]
 * sub.unsubscribe(); // undefined
 * emitter.emit('onClick'); // []
 */