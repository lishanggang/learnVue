Vue.prototype.$on = function(event, fn) {
    const vm = this
    
    if(Array.isArray(event)) {
        for (let i = 0, l = event.length; i < l; i++) {
            this.$on(event[i], fn)
        }
    } else {
        (vm._events[event] || vm.events[event] = []).push(fn)
    }
    return vm
}

Vue.prototype.$once = function(event, fn) {
    const vm = this
    function on () {
        vm.$off(event, on)
        fn.apply(vm, arguments)
    }
    on.fn = fn
    vm.$on(event, on)
    return vm
}

Vue.prototype.$emit = function(event, fn) {
    const vm = this
    let cbs = vm[event]
    if(cbs) {
        // 将类数组对象转换成数组
        // 暂时没看到这个类数组对象怎么出来的
        // cbs = cbs.length > 1 ? toArray(cbs) : cbs
        // const args = Array.toArray(arguments, 1)
        for(let i = 0, l = cbs.length; i < l; i++) {
            cbs[i].apply(vm, args)
        }
    }
    return vm
}
