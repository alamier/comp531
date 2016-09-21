//
// Inclass Virtual DOM Exercise
// ============================
//
// You need to implement createElement() and updateElement()
//
;(function(exports) {

'use strict'

function h(tag, props, ...children) {
    return { tag, props: props ? props : { }, 
        children: Array.isArray(children[0]) ? children[0] : children }
}

function createElement(node) {
    let ele;
	// create the element and return it to the caller
	// the node might have event listeners that need to be registered
	// the node might have children that need to be created as well

    // string node don't have children, deal seperately
    if(typeof node === 'string') {
        ele = document.createTextNode(node)
    } else {
        ele = document.createElement(node.tag);
        if(node.children) {
            node.children
                .map(createElement)
                .forEach(ele.appendChild.bind(ele))
        }
    }

    // add attributes
    if (node.props) {
        Object.keys(node.props).forEach(function(atr) {
            var att = document.createAttribute(atr.replace("className", "class"));
            if (atr == "onClick") {
                console.log('Created-non-string:', ele)
                console.log('Created--event:', node.props[atr])
                ele.addEventListener("click", function(event){
                    (node.props[atr])(event)
                    update();
                });
            } else {
                att.value = node.props[atr];
                ele.setAttributeNode(att);
            }
        })
    }
	return ele
}

function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
            (typeof node1 === 'string' && node1 !== node2) ||
            node1.tag !== node2.tag ||
            (node1.props && node2.props && 
            	node1.props.id && node2.props.id && 
            	node1.props.id != node2.props.id)
}

function updateElement(parent, newNode, oldNode, index=0) {
	// index will be needed when you traverse children
	// add the new node to the parent DOM element if
	// the new node is different from the old node 
	// at the same location in the DOM.
	// ideally we also handle inserts, but ignore that functionality for now.

    if (!oldNode) {
        // old node not defined, append new node
        parent.appendChild(createElement(newNode))
    } else {
    	
    	// you can use my changed(node1, node2) method above
    	// to determine if an element has changed or not
    	// be sure to also update the children!

        // if changed, replace old node with new node
        if(changed(newNode, oldNode)) {
            parent.replaceChild(createElement(newNode), parent.childNodes[index])
        } else {
            // update children
            if(newNode.children) {
                const newLength = newNode.children.length;
                const oldLength = oldNode.children.length;
                if (newLength < oldLength){
                    parent.removeChild(parent.children[index])
                    parent.appendChild(createElement(newNode))
                } else {
                    for (let i =0; i < newLength ; i++) {
                        updateElement(
                            parent.childNodes[index],
                            newNode.children[i],
                            oldNode.children[i],
                            i
                            )
                    }
                }
             }
        }
    }
}

const deepCopy = (obj) => {
    if (obj === null || typeof(obj) !== 'object')
        return obj;
    const props = {}
    if (obj.props) {
        for (let p in obj.props) {
            props[p] = obj.props[p]
        }
    }
    return h(obj.tag, props,
        Array.isArray(obj.children) ? obj.children.map(deepCopy) : obj.children)
}

const update = () => requestAnimationFrame(() => {
	// compare the current vdom with the original vdom for updates
    updateElement(h.mounted.root, h.mounted.current, h.mounted.original)
    h.mounted.original = deepCopy(h.mounted.current)
})

h.mount = (root, component) => {
    // we keep a copy of the original virtual DOM so we can diff it later for updates
    const originalComponent = deepCopy(component)
    h.mounted = { root: root, current: component, original: originalComponent }
    updateElement(root, originalComponent)
}

exports.h = h

})(window);