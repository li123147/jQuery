window.jQuery = function (selectorOrArrayOrTemplate) {
    let elements
    //api可以操作elements
    //jQuery获取elements(元素)，返回的是对象（api）,不是elements
    if (typeof selectorOrArrayOrTemplate === 'string') {       
        if (selectorOrArrayOrTemplate[0] === '<') {
            //创建div
            elements = [createElement(selectorOrArrayOrTemplate)]
        } else {
            //查找div
            elements = this.document.querySelectorAll(selectorOrArrayOrTemplate)
        }
    } else if (selectorOrArrayOrTemplate instanceof Array) {
        //对象一般用instanceof
        elements = selectorOrArrayOrTemplate
    }
    function createElement(string) {
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    }
        //api可以操作elements
    return {
        jQuery: true,
        elements: elements,
        get(index) {
            return elements[index]
        },
        appendTo(node) {
            if (node instanceof Element) {
                this.get[0].appendChild(children)
            } else if (children instanceof HTMLCollection) {
                for (let i = 0; i < children.length; i++) {
                    this.get(0).appendChild(children[i])
                }
            } else if (children.jquery === true) {
                children.each(node => this.get[0].appendChild[node])
            }
        },
        find(selector) {
            let array = []
            for (let i = 0; i < elements.length; i++) {
                const elements2 = Array.from(elements[i].querySelectorAll(selector))
                array = array.concat(elements2)
            }
            array.oldApi = this //this就是旧api(用于end())
            return jQuery(array)
            //const newApi = jQuery(array)
           // return newApi  
          //  可以简写成： return jQuery
        },
        end() {
            return this.oldApi //this 就是新api(因为api改变了)
        },
        each(fn) {
            for (let i = 0; i < elements.length; i++) {
                fn.call(null, elements[i], i)
            }
            return this
        },
        parent() {
            const array = []
            this.each((node) => {
                if (array.indexOf(node.parentNode) === -1) {
                    array.push(node.parentNode)
                }
            })
            return this.jQuery(array)
        },
        children() {
            const array = []
            this.each((node) => {
                array.push(...node.children)
                //展开操作符，展开获取的children数组
            })
            return this.jQuery(array)
        },
        print() {
            //打印出元素
            console.log(elements)
        },
        //闭包：函数访问外部的变量/print函数访问了外部变量elements
        addClass(className) {
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i]
                this.Element.classList.add(className)
                //elements的classList添加className
            }
            return this
        },
        oldApi: selectorOrArrayOrTemplate.oldApi,
        //把后面的属性一个一个复制给api/让api.__proto__指向$.fn    
    }
}
window.$ = window.jQuery
//get/each/find/print(打印)...这些都是key，{}里面的是value，api是对象。
//api会对应多个对象