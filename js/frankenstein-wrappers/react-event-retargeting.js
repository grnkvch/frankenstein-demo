// Origin of the script - https://www.npmjs.com/package/react-shadow-dom-retarget-events
// Author: [Lukas Bombach](https://www.npmjs.com/~lukasbombach)

// Add React event types you need to re-target here
var reactEvents = ["onChange", "onClick", "onBlur", "onKeyDown"];

var divergentNativeEvents = {
  onDoubleClick: 'dblclick'
};

var mimickedReactEvents = {
  onInput: 'onChange',
  onFocusOut: 'onBlur',
  onSelectionChange: 'onSelect'
};

module.exports = function retargetEvents(shadowRoot) {

  reactEvents.forEach(function (reactEventName) {

    var nativeEventName = getNativeEventName(reactEventName);

    shadowRoot.addEventListener(nativeEventName, function (event) {

      var path = event.path || (event.composedPath && event.composedPath()) || composedPath(event.target);

      for (var i = 0; i < path.length; i++) {

        var el = path[i];
        var reactComponent = findReactComponent(el);
        var props = findReactProps(reactComponent);

        if (reactComponent && props) {
          dispatchEvent(event, reactEventName, props);
        }

        if (reactComponent && props && mimickedReactEvents[reactEventName]) {
          dispatchEvent(event, mimickedReactEvents[reactEventName], props);
        }

        if (event.cancelBubble) {
          break;
        }

        if (el === shadowRoot) {
          break;
        }
      }
    }, false);
  });
};

function findReactComponent(item) {
  for (var key in item) {
    if (item.hasOwnProperty(key) && key.indexOf('_reactInternal') !== -1) {
      return item[key];
    }
  }
}

function findReactProps(component) {
  if (!component) return undefined;
  if (component.memoizedProps) return component.memoizedProps; // React 16 Fiber
  if (component._currentElement && component._currentElement.props) return component._currentElement.props; // React <=15

}

function dispatchEvent(event, eventType, componentProps) {
  if (componentProps[eventType]) {
    componentProps[eventType](event);
  }
}

function getNativeEventName(reactEventName) {
  if (divergentNativeEvents[reactEventName]) {
    return divergentNativeEvents[reactEventName];
  }
  return reactEventName.replace(/^on/, '').toLowerCase();
}

function composedPath(el) {
  var path = [];
  while (el) {
    path.push(el);
    if (el.tagName === 'HTML') {
      path.push(document);
      path.push(window);
      return path;
    }
    el = el.parentElement;
  }
}