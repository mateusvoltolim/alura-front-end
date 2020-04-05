export class ProxyFactory {

    static create(object, props, action) {
        return new Proxy(object, {
            get(target, prop, receiver) {
                if (props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
                    return function () {
                        let applied = Reflect.apply(target[prop], target, arguments);
                        action(target);
                        return applied;
                    }
                }
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {
                let setted = Reflect.set(target, prop, value, receiver);
                if (props.includes(prop)) {
                    action(target);
                }
                return setted;
            }
        });
    }

    static _isFunction(func) {
        return typeof (func) == typeof (Function)
    }
}