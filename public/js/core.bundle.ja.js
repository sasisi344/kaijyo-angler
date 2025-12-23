/* eslint-disable no-undef */
const alert = document.getElementById('page-alert')
const closeBtn = document.getElementById('page-alert-btn-close')
if (alert !== null && closeBtn !== null) {
  const version = alert.getAttribute('data-page-alert-version') || 'unknown'
  const hideAlert = getSessionStorage(`page-alert-${version}`, null, 'functional') !== null
  if (hideAlert) {
    alert.classList.add('d-none')
  }

  closeBtn.addEventListener('click', () => {
    setSessionStorage(`page-alert-${version}`, 'seen', 'functional')
    alert.classList.add('d-none')
  })
}

;
function reveal () {
  const reveals = document.querySelectorAll('.reveal')

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight
    const elementTop = reveals[i].getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active')
      reveals[i].classList.remove('reveal')
    } else {
      reveals[i].classList.remove('active')
    }
  }
}

window.addEventListener('scroll', reveal)

;
/*
Source:
  - https://simplernerd.com/hugo-add-copy-to-clipboard-button/
*/

const svgCopy =
  '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>'
const svgCheck =
  '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" fill="rgb(63, 185, 80)" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>'

const addCopyButtons = (clipboard) => {
  // 1. Look for pre > code elements in the DOM
  document.querySelectorAll('pre > code').forEach((codeBlock) => {
    // 2. Create a button that will trigger a copy operation
    const button = document.createElement('button')
    button.className = 'clipboard-button'
    button.setAttribute('data-toast-target', 'toast-copied-code-message')
    button.setAttribute('aria-label', 'クリップボードにコピー')
    button.type = 'button'
    button.innerHTML = svgCopy
    button.addEventListener('click', () => {
      const text = codeBlock.innerText.split('\n').filter(Boolean).join('\n')
      clipboard.writeText(text).then(
        () => {
          button.blur()
          button.innerHTML = svgCheck
          setTimeout(() => (button.innerHTML = svgCopy), 2000)
        },
        // eslint-disable-next-line n/handle-callback-err
        (error) => (button.innerHTML = 'Error')
      )
    })
    // 3. Append the button directly before the pre tag
    const pre = codeBlock.parentNode
    pre.parentNode.insertBefore(button, pre)
  })
}

if (navigator && navigator.clipboard) {
  addCopyButtons(navigator.clipboard)
}

document.querySelectorAll('[data-clipboard]').forEach(trigger => {
  const text = trigger.getAttribute('data-clipboard')
  trigger.addEventListener('click', () => {
    navigator.clipboard.writeText(text)
  })
})

;
const url = new URL(window.location.href)
const menu = url.searchParams.get('menu')
const child = url.searchParams.get('child')
const menuItems = document.querySelectorAll('[data-nav="main"]')

if (menu !== null) {
  menuItems.forEach(element => {
    element.classList.remove('active')
  })

  const targetMainItems = document.querySelectorAll(`[data-nav-main="${menu}"]:not([data-nav-child])`)
  targetMainItems.forEach(element => {
    element.classList.add('active')
  })

  const targetChildItems = document.querySelectorAll(`[data-nav-main="${menu}"][data-nav-child="${child}"]`)
  targetChildItems.forEach(element => {
    element.classList.add('active')
  })
}

;
document.addEventListener('hide.bs.modal', function (event) {
  // Remove the focus from the active element
  if (document.activeElement) {
    document.activeElement.blur()
  }
})

;
/*!
  * Bootstrap v5.3.8 (https://getbootstrap.com/)
  * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bootstrap = factory());
})(this, (function () { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */

  const elementMap = new Map();
  const Data = {
    set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, new Map());
      }
      const instanceMap = elementMap.get(element);

      // make it clear we only want one instance per element
      // can be removed later when multiple key/instances are fine to be used
      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        // eslint-disable-next-line no-console
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
        return;
      }
      instanceMap.set(key, instance);
    },
    get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }
      return null;
    },
    remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }
      const instanceMap = elementMap.get(element);
      instanceMap.delete(key);

      // free up element references if there are no instances left for an element
      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const MAX_UID = 1000000;
  const MILLISECONDS_MULTIPLIER = 1000;
  const TRANSITION_END = 'transitionend';

  /**
   * Properly escape IDs selectors to handle weird IDs
   * @param {string} selector
   * @returns {string}
   */
  const parseSelector = selector => {
    if (selector && window.CSS && window.CSS.escape) {
      // document.querySelector needs escaping to handle IDs (html5+) containing for instance /
      selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
    }
    return selector;
  };

  // Shout-out Angus Croll (https://goo.gl/pxwQGp)
  const toType = object => {
    if (object === null || object === undefined) {
      return `${object}`;
    }
    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
  };

  /**
   * Public Util API
   */

  const getUID = prefix => {
    do {
      prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix));
    return prefix;
  };
  const getTransitionDurationFromElement = element => {
    if (!element) {
      return 0;
    }

    // Get transition-duration of the element
    let {
      transitionDuration,
      transitionDelay
    } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay);

    // Return 0 if element or transition duration is not found
    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    }

    // If multiple durations are defined, take the first
    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };
  const triggerTransitionEnd = element => {
    element.dispatchEvent(new Event(TRANSITION_END));
  };
  const isElement$1 = object => {
    if (!object || typeof object !== 'object') {
      return false;
    }
    if (typeof object.jquery !== 'undefined') {
      object = object[0];
    }
    return typeof object.nodeType !== 'undefined';
  };
  const getElement = object => {
    // it's a jQuery object or a node element
    if (isElement$1(object)) {
      return object.jquery ? object[0] : object;
    }
    if (typeof object === 'string' && object.length > 0) {
      return document.querySelector(parseSelector(object));
    }
    return null;
  };
  const isVisible = element => {
    if (!isElement$1(element) || element.getClientRects().length === 0) {
      return false;
    }
    const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible';
    // Handle `details` element as its content may falsie appear visible when it is closed
    const closedDetails = element.closest('details:not([open])');
    if (!closedDetails) {
      return elementIsVisible;
    }
    if (closedDetails !== element) {
      const summary = element.closest('summary');
      if (summary && summary.parentNode !== closedDetails) {
        return false;
      }
      if (summary === null) {
        return false;
      }
    }
    return elementIsVisible;
  };
  const isDisabled = element => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }
    if (element.classList.contains('disabled')) {
      return true;
    }
    if (typeof element.disabled !== 'undefined') {
      return element.disabled;
    }
    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
  };
  const findShadowRoot = element => {
    if (!document.documentElement.attachShadow) {
      return null;
    }

    // Can find the shadow root otherwise it'll return the document
    if (typeof element.getRootNode === 'function') {
      const root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }
    if (element instanceof ShadowRoot) {
      return element;
    }

    // when we don't find a shadow root
    if (!element.parentNode) {
      return null;
    }
    return findShadowRoot(element.parentNode);
  };
  const noop = () => {};

  /**
   * Trick to restart an element's animation
   *
   * @param {HTMLElement} element
   * @return void
   *
   * @see https://www.harrytheo.com/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
   */
  const reflow = element => {
    element.offsetHeight; // eslint-disable-line no-unused-expressions
  };
  const getjQuery = () => {
    if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return window.jQuery;
    }
    return null;
  };
  const DOMContentLoadedCallbacks = [];
  const onDOMContentLoaded = callback => {
    if (document.readyState === 'loading') {
      // add listener on the first call when the document is in loading state
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener('DOMContentLoaded', () => {
          for (const callback of DOMContentLoadedCallbacks) {
            callback();
          }
        });
      }
      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };
  const isRTL = () => document.documentElement.dir === 'rtl';
  const defineJQueryPlugin = plugin => {
    onDOMContentLoaded(() => {
      const $ = getjQuery();
      /* istanbul ignore if */
      if ($) {
        const name = plugin.NAME;
        const JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;
        $.fn[name].noConflict = () => {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };
  const execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
    return typeof possibleCallback === 'function' ? possibleCallback.call(...args) : defaultValue;
  };
  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    if (!waitForTransition) {
      execute(callback);
      return;
    }
    const durationPadding = 5;
    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    let called = false;
    const handler = ({
      target
    }) => {
      if (target !== transitionElement) {
        return;
      }
      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };
    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };

  /**
   * Return the previous/next element of a list.
   *
   * @param {array} list    The list of elements
   * @param activeElement   The active element
   * @param shouldGetNext   Choose to get next or previous element
   * @param isCycleAllowed
   * @return {Element|elem} The proper element
   */
  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
    const listLength = list.length;
    let index = list.indexOf(activeElement);

    // if the element does not exist in the list return an element
    // depending on the direction and if cycle is allowed
    if (index === -1) {
      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
    }
    index += shouldGetNext ? 1 : -1;
    if (isCycleAllowed) {
      index = (index + listLength) % listLength;
    }
    return list[Math.max(0, Math.min(index, listLength - 1))];
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  const stripNameRegex = /\..*/;
  const stripUidRegex = /::\d+$/;
  const eventRegistry = {}; // Events storage
  let uidEvent = 1;
  const customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);

  /**
   * Private methods
   */

  function makeEventUid(element, uid) {
    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
  }
  function getElementEvents(element) {
    const uid = makeEventUid(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }
  function bootstrapHandler(element, fn) {
    return function handler(event) {
      hydrateObj(event, {
        delegateTarget: element
      });
      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }
      return fn.apply(element, [event]);
    };
  }
  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      const domElements = element.querySelectorAll(selector);
      for (let {
        target
      } = event; target && target !== this; target = target.parentNode) {
        for (const domElement of domElements) {
          if (domElement !== target) {
            continue;
          }
          hydrateObj(event, {
            delegateTarget: target
          });
          if (handler.oneOff) {
            EventHandler.off(element, event.type, selector, fn);
          }
          return fn.apply(target, [event]);
        }
      }
    };
  }
  function findHandler(events, callable, delegationSelector = null) {
    return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
  }
  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
    const isDelegated = typeof handler === 'string';
    // TODO: tooltip passes `false` instead of selector, so we need to check
    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
    let typeEvent = getTypeEvent(originalTypeEvent);
    if (!nativeEvents.has(typeEvent)) {
      typeEvent = originalTypeEvent;
    }
    return [isDelegated, callable, typeEvent];
  }
  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }
    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);

    // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
    // this prevents the handler from being dispatched the same way as mouseover or mouseout does
    if (originalTypeEvent in customEvents) {
      const wrapFunction = fn => {
        return function (event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn.call(this, event);
          }
        };
      };
      callable = wrapFunction(callable);
    }
    const events = getElementEvents(element);
    const handlers = events[typeEvent] || (events[typeEvent] = {});
    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
    if (previousFunction) {
      previousFunction.oneOff = previousFunction.oneOff && oneOff;
      return;
    }
    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
    fn.delegationSelector = isDelegated ? handler : null;
    fn.callable = callable;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, isDelegated);
  }
  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector);
    if (!fn) {
      return;
    }
    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }
  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {};
    for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
      if (handlerKey.includes(namespace)) {
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  }
  function getTypeEvent(event) {
    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
    event = event.replace(stripNameRegex, '');
    return customEvents[event] || event;
  }
  const EventHandler = {
    on(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, false);
    },
    one(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, true);
    },
    off(element, originalTypeEvent, handler, delegationFunction) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return;
      }
      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
      const inNamespace = typeEvent !== originalTypeEvent;
      const events = getElementEvents(element);
      const storeElementEvent = events[typeEvent] || {};
      const isNamespace = originalTypeEvent.startsWith('.');
      if (typeof callable !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!Object.keys(storeElementEvent).length) {
          return;
        }
        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
        return;
      }
      if (isNamespace) {
        for (const elementEvent of Object.keys(events)) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        }
      }
      for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
        const handlerKey = keyHandlers.replace(stripUidRegex, '');
        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
        }
      }
    },
    trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null;
      }
      const $ = getjQuery();
      const typeEvent = getTypeEvent(event);
      const inNamespace = event !== typeEvent;
      let jQueryEvent = null;
      let bubbles = true;
      let nativeDispatch = true;
      let defaultPrevented = false;
      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }
      const evt = hydrateObj(new Event(event, {
        bubbles,
        cancelable: true
      }), args);
      if (defaultPrevented) {
        evt.preventDefault();
      }
      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }
      if (evt.defaultPrevented && jQueryEvent) {
        jQueryEvent.preventDefault();
      }
      return evt;
    }
  };
  function hydrateObj(obj, meta = {}) {
    for (const [key, value] of Object.entries(meta)) {
      try {
        obj[key] = value;
      } catch (_unused) {
        Object.defineProperty(obj, key, {
          configurable: true,
          get() {
            return value;
          }
        });
      }
    }
    return obj;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  function normalizeData(value) {
    if (value === 'true') {
      return true;
    }
    if (value === 'false') {
      return false;
    }
    if (value === Number(value).toString()) {
      return Number(value);
    }
    if (value === '' || value === 'null') {
      return null;
    }
    if (typeof value !== 'string') {
      return value;
    }
    try {
      return JSON.parse(decodeURIComponent(value));
    } catch (_unused) {
      return value;
    }
  }
  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
  }
  const Manipulator = {
    setDataAttribute(element, key, value) {
      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    },
    removeDataAttribute(element, key) {
      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    },
    getDataAttributes(element) {
      if (!element) {
        return {};
      }
      const attributes = {};
      const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));
      for (const key of bsKeys) {
        let pureKey = key.replace(/^bs/, '');
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      }
      return attributes;
    },
    getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/config.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Class definition
   */

  class Config {
    // Getters
    static get Default() {
      return {};
    }
    static get DefaultType() {
      return {};
    }
    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    _configAfterMerge(config) {
      return config;
    }
    _mergeConfigObj(config, element) {
      const jsonConfig = isElement$1(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse

      return {
        ...this.constructor.Default,
        ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
        ...(isElement$1(element) ? Manipulator.getDataAttributes(element) : {}),
        ...(typeof config === 'object' ? config : {})
      };
    }
    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
      for (const [property, expectedTypes] of Object.entries(configTypes)) {
        const value = config[property];
        const valueType = isElement$1(value) ? 'element' : toType(value);
        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
        }
      }
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap base-component.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const VERSION = '5.3.8';

  /**
   * Class definition
   */

  class BaseComponent extends Config {
    constructor(element, config) {
      super();
      element = getElement(element);
      if (!element) {
        return;
      }
      this._element = element;
      this._config = this._getConfig(config);
      Data.set(this._element, this.constructor.DATA_KEY, this);
    }

    // Public
    dispose() {
      Data.remove(this._element, this.constructor.DATA_KEY);
      EventHandler.off(this._element, this.constructor.EVENT_KEY);
      for (const propertyName of Object.getOwnPropertyNames(this)) {
        this[propertyName] = null;
      }
    }

    // Private
    _queueCallback(callback, element, isAnimated = true) {
      executeAfterTransition(callback, element, isAnimated);
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config, this._element);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }

    // Static
    static getInstance(element) {
      return Data.get(getElement(element), this.DATA_KEY);
    }
    static getOrCreateInstance(element, config = {}) {
      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
    }
    static get VERSION() {
      return VERSION;
    }
    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }
    static eventName(name) {
      return `${name}${this.EVENT_KEY}`;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const getSelector = element => {
    let selector = element.getAttribute('data-bs-target');
    if (!selector || selector === '#') {
      let hrefAttribute = element.getAttribute('href');

      // The only valid content that could double as a selector are IDs or classes,
      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
      // `document.querySelector` will rightfully complain it is invalid.
      // See https://github.com/twbs/bootstrap/issues/32273
      if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
        return null;
      }

      // Just in case some CMS puts out a full URL with the anchor appended
      if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
        hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
      }
      selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
    }
    return selector ? selector.split(',').map(sel => parseSelector(sel)).join(',') : null;
  };
  const SelectorEngine = {
    find(selector, element = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    },
    findOne(selector, element = document.documentElement) {
      return Element.prototype.querySelector.call(element, selector);
    },
    children(element, selector) {
      return [].concat(...element.children).filter(child => child.matches(selector));
    },
    parents(element, selector) {
      const parents = [];
      let ancestor = element.parentNode.closest(selector);
      while (ancestor) {
        parents.push(ancestor);
        ancestor = ancestor.parentNode.closest(selector);
      }
      return parents;
    },
    prev(element, selector) {
      let previous = element.previousElementSibling;
      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }
        previous = previous.previousElementSibling;
      }
      return [];
    },
    // TODO: this is now unused; remove later along with prev()
    next(element, selector) {
      let next = element.nextElementSibling;
      while (next) {
        if (next.matches(selector)) {
          return [next];
        }
        next = next.nextElementSibling;
      }
      return [];
    },
    focusableChildren(element) {
      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
      return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
    },
    getSelectorFromElement(element) {
      const selector = getSelector(element);
      if (selector) {
        return SelectorEngine.findOne(selector) ? selector : null;
      }
      return null;
    },
    getElementFromSelector(element) {
      const selector = getSelector(element);
      return selector ? SelectorEngine.findOne(selector) : null;
    },
    getMultipleElementsFromSelector(element) {
      const selector = getSelector(element);
      return selector ? SelectorEngine.find(selector) : [];
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/component-functions.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const enableDismissTrigger = (component, method = 'hide') => {
    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
    const name = component.NAME;
    EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
      if (['A', 'AREA'].includes(this.tagName)) {
        event.preventDefault();
      }
      if (isDisabled(this)) {
        return;
      }
      const target = SelectorEngine.getElementFromSelector(this) || this.closest(`.${name}`);
      const instance = component.getOrCreateInstance(target);

      // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method
      instance[method]();
    });
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$f = 'alert';
  const DATA_KEY$a = 'bs.alert';
  const EVENT_KEY$b = `.${DATA_KEY$a}`;
  const EVENT_CLOSE = `close${EVENT_KEY$b}`;
  const EVENT_CLOSED = `closed${EVENT_KEY$b}`;
  const CLASS_NAME_FADE$5 = 'fade';
  const CLASS_NAME_SHOW$8 = 'show';

  /**
   * Class definition
   */

  class Alert extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$f;
    }

    // Public
    close() {
      const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
      if (closeEvent.defaultPrevented) {
        return;
      }
      this._element.classList.remove(CLASS_NAME_SHOW$8);
      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
    }

    // Private
    _destroyElement() {
      this._element.remove();
      EventHandler.trigger(this._element, EVENT_CLOSED);
      this.dispose();
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Alert.getOrCreateInstance(this);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      });
    }
  }

  /**
   * Data API implementation
   */

  enableDismissTrigger(Alert, 'close');

  /**
   * jQuery
   */

  defineJQueryPlugin(Alert);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$e = 'button';
  const DATA_KEY$9 = 'bs.button';
  const EVENT_KEY$a = `.${DATA_KEY$9}`;
  const DATA_API_KEY$6 = '.data-api';
  const CLASS_NAME_ACTIVE$3 = 'active';
  const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
  const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;

  /**
   * Class definition
   */

  class Button extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$e;
    }

    // Public
    toggle() {
      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Button.getOrCreateInstance(this);
        if (config === 'toggle') {
          data[config]();
        }
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, event => {
    event.preventDefault();
    const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
    const data = Button.getOrCreateInstance(button);
    data.toggle();
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(Button);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/swipe.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$d = 'swipe';
  const EVENT_KEY$9 = '.bs.swipe';
  const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
  const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
  const EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
  const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
  const EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
  const POINTER_TYPE_TOUCH = 'touch';
  const POINTER_TYPE_PEN = 'pen';
  const CLASS_NAME_POINTER_EVENT = 'pointer-event';
  const SWIPE_THRESHOLD = 40;
  const Default$c = {
    endCallback: null,
    leftCallback: null,
    rightCallback: null
  };
  const DefaultType$c = {
    endCallback: '(function|null)',
    leftCallback: '(function|null)',
    rightCallback: '(function|null)'
  };

  /**
   * Class definition
   */

  class Swipe extends Config {
    constructor(element, config) {
      super();
      this._element = element;
      if (!element || !Swipe.isSupported()) {
        return;
      }
      this._config = this._getConfig(config);
      this._deltaX = 0;
      this._supportPointerEvents = Boolean(window.PointerEvent);
      this._initEvents();
    }

    // Getters
    static get Default() {
      return Default$c;
    }
    static get DefaultType() {
      return DefaultType$c;
    }
    static get NAME() {
      return NAME$d;
    }

    // Public
    dispose() {
      EventHandler.off(this._element, EVENT_KEY$9);
    }

    // Private
    _start(event) {
      if (!this._supportPointerEvents) {
        this._deltaX = event.touches[0].clientX;
        return;
      }
      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX;
      }
    }
    _end(event) {
      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX - this._deltaX;
      }
      this._handleSwipe();
      execute(this._config.endCallback);
    }
    _move(event) {
      this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
    }
    _handleSwipe() {
      const absDeltaX = Math.abs(this._deltaX);
      if (absDeltaX <= SWIPE_THRESHOLD) {
        return;
      }
      const direction = absDeltaX / this._deltaX;
      this._deltaX = 0;
      if (!direction) {
        return;
      }
      execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
    }
    _initEvents() {
      if (this._supportPointerEvents) {
        EventHandler.on(this._element, EVENT_POINTERDOWN, event => this._start(event));
        EventHandler.on(this._element, EVENT_POINTERUP, event => this._end(event));
        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        EventHandler.on(this._element, EVENT_TOUCHSTART, event => this._start(event));
        EventHandler.on(this._element, EVENT_TOUCHMOVE, event => this._move(event));
        EventHandler.on(this._element, EVENT_TOUCHEND, event => this._end(event));
      }
    }
    _eventIsPointerPenTouch(event) {
      return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
    }

    // Static
    static isSupported() {
      return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$c = 'carousel';
  const DATA_KEY$8 = 'bs.carousel';
  const EVENT_KEY$8 = `.${DATA_KEY$8}`;
  const DATA_API_KEY$5 = '.data-api';
  const ARROW_LEFT_KEY$1 = 'ArrowLeft';
  const ARROW_RIGHT_KEY$1 = 'ArrowRight';
  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  const ORDER_NEXT = 'next';
  const ORDER_PREV = 'prev';
  const DIRECTION_LEFT = 'left';
  const DIRECTION_RIGHT = 'right';
  const EVENT_SLIDE = `slide${EVENT_KEY$8}`;
  const EVENT_SLID = `slid${EVENT_KEY$8}`;
  const EVENT_KEYDOWN$1 = `keydown${EVENT_KEY$8}`;
  const EVENT_MOUSEENTER$1 = `mouseenter${EVENT_KEY$8}`;
  const EVENT_MOUSELEAVE$1 = `mouseleave${EVENT_KEY$8}`;
  const EVENT_DRAG_START = `dragstart${EVENT_KEY$8}`;
  const EVENT_LOAD_DATA_API$3 = `load${EVENT_KEY$8}${DATA_API_KEY$5}`;
  const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
  const CLASS_NAME_CAROUSEL = 'carousel';
  const CLASS_NAME_ACTIVE$2 = 'active';
  const CLASS_NAME_SLIDE = 'slide';
  const CLASS_NAME_END = 'carousel-item-end';
  const CLASS_NAME_START = 'carousel-item-start';
  const CLASS_NAME_NEXT = 'carousel-item-next';
  const CLASS_NAME_PREV = 'carousel-item-prev';
  const SELECTOR_ACTIVE = '.active';
  const SELECTOR_ITEM = '.carousel-item';
  const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
  const SELECTOR_ITEM_IMG = '.carousel-item img';
  const SELECTOR_INDICATORS = '.carousel-indicators';
  const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
  const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
  const KEY_TO_DIRECTION = {
    [ARROW_LEFT_KEY$1]: DIRECTION_RIGHT,
    [ARROW_RIGHT_KEY$1]: DIRECTION_LEFT
  };
  const Default$b = {
    interval: 5000,
    keyboard: true,
    pause: 'hover',
    ride: false,
    touch: true,
    wrap: true
  };
  const DefaultType$b = {
    interval: '(number|boolean)',
    // TODO:v6 remove boolean support
    keyboard: 'boolean',
    pause: '(string|boolean)',
    ride: '(boolean|string)',
    touch: 'boolean',
    wrap: 'boolean'
  };

  /**
   * Class definition
   */

  class Carousel extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._interval = null;
      this._activeElement = null;
      this._isSliding = false;
      this.touchTimeout = null;
      this._swipeHelper = null;
      this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
      this._addEventListeners();
      if (this._config.ride === CLASS_NAME_CAROUSEL) {
        this.cycle();
      }
    }

    // Getters
    static get Default() {
      return Default$b;
    }
    static get DefaultType() {
      return DefaultType$b;
    }
    static get NAME() {
      return NAME$c;
    }

    // Public
    next() {
      this._slide(ORDER_NEXT);
    }
    nextWhenVisible() {
      // FIXME TODO use `document.visibilityState`
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && isVisible(this._element)) {
        this.next();
      }
    }
    prev() {
      this._slide(ORDER_PREV);
    }
    pause() {
      if (this._isSliding) {
        triggerTransitionEnd(this._element);
      }
      this._clearInterval();
    }
    cycle() {
      this._clearInterval();
      this._updateInterval();
      this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
    }
    _maybeEnableCycle() {
      if (!this._config.ride) {
        return;
      }
      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, () => this.cycle());
        return;
      }
      this.cycle();
    }
    to(index) {
      const items = this._getItems();
      if (index > items.length - 1 || index < 0) {
        return;
      }
      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
        return;
      }
      const activeIndex = this._getItemIndex(this._getActive());
      if (activeIndex === index) {
        return;
      }
      const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
      this._slide(order, items[index]);
    }
    dispose() {
      if (this._swipeHelper) {
        this._swipeHelper.dispose();
      }
      super.dispose();
    }

    // Private
    _configAfterMerge(config) {
      config.defaultInterval = config.interval;
      return config;
    }
    _addEventListeners() {
      if (this._config.keyboard) {
        EventHandler.on(this._element, EVENT_KEYDOWN$1, event => this._keydown(event));
      }
      if (this._config.pause === 'hover') {
        EventHandler.on(this._element, EVENT_MOUSEENTER$1, () => this.pause());
        EventHandler.on(this._element, EVENT_MOUSELEAVE$1, () => this._maybeEnableCycle());
      }
      if (this._config.touch && Swipe.isSupported()) {
        this._addTouchEventListeners();
      }
    }
    _addTouchEventListeners() {
      for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) {
        EventHandler.on(img, EVENT_DRAG_START, event => event.preventDefault());
      }
      const endCallBack = () => {
        if (this._config.pause !== 'hover') {
          return;
        }

        // If it's a touch-enabled device, mouseenter/leave are fired as
        // part of the mouse compatibility events on first tap - the carousel
        // would stop cycling until user tapped out of it;
        // here, we listen for touchend, explicitly pause the carousel
        // (as if it's the second time we tap on it, mouseenter compat event
        // is NOT fired) and after a timeout (to allow for mouse compatibility
        // events to fire) we explicitly restart cycling

        this.pause();
        if (this.touchTimeout) {
          clearTimeout(this.touchTimeout);
        }
        this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
      };
      const swipeConfig = {
        leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
        rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
        endCallback: endCallBack
      };
      this._swipeHelper = new Swipe(this._element, swipeConfig);
    }
    _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }
      const direction = KEY_TO_DIRECTION[event.key];
      if (direction) {
        event.preventDefault();
        this._slide(this._directionToOrder(direction));
      }
    }
    _getItemIndex(element) {
      return this._getItems().indexOf(element);
    }
    _setActiveIndicatorElement(index) {
      if (!this._indicatorsElement) {
        return;
      }
      const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
      activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
      activeIndicator.removeAttribute('aria-current');
      const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);
      if (newActiveIndicator) {
        newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
        newActiveIndicator.setAttribute('aria-current', 'true');
      }
    }
    _updateInterval() {
      const element = this._activeElement || this._getActive();
      if (!element) {
        return;
      }
      const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
      this._config.interval = elementInterval || this._config.defaultInterval;
    }
    _slide(order, element = null) {
      if (this._isSliding) {
        return;
      }
      const activeElement = this._getActive();
      const isNext = order === ORDER_NEXT;
      const nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
      if (nextElement === activeElement) {
        return;
      }
      const nextElementIndex = this._getItemIndex(nextElement);
      const triggerEvent = eventName => {
        return EventHandler.trigger(this._element, eventName, {
          relatedTarget: nextElement,
          direction: this._orderToDirection(order),
          from: this._getItemIndex(activeElement),
          to: nextElementIndex
        });
      };
      const slideEvent = triggerEvent(EVENT_SLIDE);
      if (slideEvent.defaultPrevented) {
        return;
      }
      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        // TODO: change tests that use empty divs to avoid this check
        return;
      }
      const isCycling = Boolean(this._interval);
      this.pause();
      this._isSliding = true;
      this._setActiveIndicatorElement(nextElementIndex);
      this._activeElement = nextElement;
      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
      nextElement.classList.add(orderClassName);
      reflow(nextElement);
      activeElement.classList.add(directionalClassName);
      nextElement.classList.add(directionalClassName);
      const completeCallBack = () => {
        nextElement.classList.remove(directionalClassName, orderClassName);
        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
        activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
        this._isSliding = false;
        triggerEvent(EVENT_SLID);
      };
      this._queueCallback(completeCallBack, activeElement, this._isAnimated());
      if (isCycling) {
        this.cycle();
      }
    }
    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_SLIDE);
    }
    _getActive() {
      return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
    }
    _getItems() {
      return SelectorEngine.find(SELECTOR_ITEM, this._element);
    }
    _clearInterval() {
      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }
    }
    _directionToOrder(direction) {
      if (isRTL()) {
        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
      }
      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
    }
    _orderToDirection(order) {
      if (isRTL()) {
        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
      }
      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Carousel.getOrCreateInstance(this, config);
        if (typeof config === 'number') {
          data.to(config);
          return;
        }
        if (typeof config === 'string') {
          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        }
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, function (event) {
    const target = SelectorEngine.getElementFromSelector(this);
    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
      return;
    }
    event.preventDefault();
    const carousel = Carousel.getOrCreateInstance(target);
    const slideIndex = this.getAttribute('data-bs-slide-to');
    if (slideIndex) {
      carousel.to(slideIndex);
      carousel._maybeEnableCycle();
      return;
    }
    if (Manipulator.getDataAttribute(this, 'slide') === 'next') {
      carousel.next();
      carousel._maybeEnableCycle();
      return;
    }
    carousel.prev();
    carousel._maybeEnableCycle();
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$3, () => {
    const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
    for (const carousel of carousels) {
      Carousel.getOrCreateInstance(carousel);
    }
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(Carousel);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$b = 'collapse';
  const DATA_KEY$7 = 'bs.collapse';
  const EVENT_KEY$7 = `.${DATA_KEY$7}`;
  const DATA_API_KEY$4 = '.data-api';
  const EVENT_SHOW$6 = `show${EVENT_KEY$7}`;
  const EVENT_SHOWN$6 = `shown${EVENT_KEY$7}`;
  const EVENT_HIDE$6 = `hide${EVENT_KEY$7}`;
  const EVENT_HIDDEN$6 = `hidden${EVENT_KEY$7}`;
  const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
  const CLASS_NAME_SHOW$7 = 'show';
  const CLASS_NAME_COLLAPSE = 'collapse';
  const CLASS_NAME_COLLAPSING = 'collapsing';
  const CLASS_NAME_COLLAPSED = 'collapsed';
  const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
  const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
  const WIDTH = 'width';
  const HEIGHT = 'height';
  const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
  const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
  const Default$a = {
    parent: null,
    toggle: true
  };
  const DefaultType$a = {
    parent: '(null|element)',
    toggle: 'boolean'
  };

  /**
   * Class definition
   */

  class Collapse extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._isTransitioning = false;
      this._triggerArray = [];
      const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
      for (const elem of toggleList) {
        const selector = SelectorEngine.getSelectorFromElement(elem);
        const filterElement = SelectorEngine.find(selector).filter(foundElement => foundElement === this._element);
        if (selector !== null && filterElement.length) {
          this._triggerArray.push(elem);
        }
      }
      this._initializeChildren();
      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
      }
      if (this._config.toggle) {
        this.toggle();
      }
    }

    // Getters
    static get Default() {
      return Default$a;
    }
    static get DefaultType() {
      return DefaultType$a;
    }
    static get NAME() {
      return NAME$b;
    }

    // Public
    toggle() {
      if (this._isShown()) {
        this.hide();
      } else {
        this.show();
      }
    }
    show() {
      if (this._isTransitioning || this._isShown()) {
        return;
      }
      let activeChildren = [];

      // find active children
      if (this._config.parent) {
        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(element => element !== this._element).map(element => Collapse.getOrCreateInstance(element, {
          toggle: false
        }));
      }
      if (activeChildren.length && activeChildren[0]._isTransitioning) {
        return;
      }
      const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);
      if (startEvent.defaultPrevented) {
        return;
      }
      for (const activeInstance of activeChildren) {
        activeInstance.hide();
      }
      const dimension = this._getDimension();
      this._element.classList.remove(CLASS_NAME_COLLAPSE);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.style[dimension] = 0;
      this._addAriaAndCollapsedClass(this._triggerArray, true);
      this._isTransitioning = true;
      const complete = () => {
        this._isTransitioning = false;
        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
        this._element.style[dimension] = '';
        EventHandler.trigger(this._element, EVENT_SHOWN$6);
      };
      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      const scrollSize = `scroll${capitalizedDimension}`;
      this._queueCallback(complete, this._element, true);
      this._element.style[dimension] = `${this._element[scrollSize]}px`;
    }
    hide() {
      if (this._isTransitioning || !this._isShown()) {
        return;
      }
      const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);
      if (startEvent.defaultPrevented) {
        return;
      }
      const dimension = this._getDimension();
      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
      for (const trigger of this._triggerArray) {
        const element = SelectorEngine.getElementFromSelector(trigger);
        if (element && !this._isShown(element)) {
          this._addAriaAndCollapsedClass([trigger], false);
        }
      }
      this._isTransitioning = true;
      const complete = () => {
        this._isTransitioning = false;
        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE);
        EventHandler.trigger(this._element, EVENT_HIDDEN$6);
      };
      this._element.style[dimension] = '';
      this._queueCallback(complete, this._element, true);
    }

    // Private
    _isShown(element = this._element) {
      return element.classList.contains(CLASS_NAME_SHOW$7);
    }
    _configAfterMerge(config) {
      config.toggle = Boolean(config.toggle); // Coerce string values
      config.parent = getElement(config.parent);
      return config;
    }
    _getDimension() {
      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
    }
    _initializeChildren() {
      if (!this._config.parent) {
        return;
      }
      const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);
      for (const element of children) {
        const selected = SelectorEngine.getElementFromSelector(element);
        if (selected) {
          this._addAriaAndCollapsedClass([element], this._isShown(selected));
        }
      }
    }
    _getFirstLevelChildren(selector) {
      const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
      // remove children if greater depth
      return SelectorEngine.find(selector, this._config.parent).filter(element => !children.includes(element));
    }
    _addAriaAndCollapsedClass(triggerArray, isOpen) {
      if (!triggerArray.length) {
        return;
      }
      for (const element of triggerArray) {
        element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
        element.setAttribute('aria-expanded', isOpen);
      }
    }

    // Static
    static jQueryInterface(config) {
      const _config = {};
      if (typeof config === 'string' && /show|hide/.test(config)) {
        _config.toggle = false;
      }
      return this.each(function () {
        const data = Collapse.getOrCreateInstance(this, _config);
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        }
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
      event.preventDefault();
    }
    for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) {
      Collapse.getOrCreateInstance(element, {
        toggle: false
      }).toggle();
    }
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(Collapse);

  var top = 'top';
  var bottom = 'bottom';
  var right = 'right';
  var left = 'left';
  var auto = 'auto';
  var basePlacements = [top, bottom, right, left];
  var start = 'start';
  var end = 'end';
  var clippingParents = 'clippingParents';
  var viewport = 'viewport';
  var popper = 'popper';
  var reference = 'reference';
  var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
    return acc.concat([placement + "-" + start, placement + "-" + end]);
  }, []);
  var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
    return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
  }, []); // modifiers that need to read the DOM

  var beforeRead = 'beforeRead';
  var read = 'read';
  var afterRead = 'afterRead'; // pure-logic modifiers

  var beforeMain = 'beforeMain';
  var main = 'main';
  var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

  var beforeWrite = 'beforeWrite';
  var write = 'write';
  var afterWrite = 'afterWrite';
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

  function getNodeName(element) {
    return element ? (element.nodeName || '').toLowerCase() : null;
  }

  function getWindow(node) {
    if (node == null) {
      return window;
    }

    if (node.toString() !== '[object Window]') {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }

    return node;
  }

  function isElement(node) {
    var OwnElement = getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element;
  }

  function isHTMLElement(node) {
    var OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
  }

  function isShadowRoot(node) {
    // IE 11 has no ShadowRoot
    if (typeof ShadowRoot === 'undefined') {
      return false;
    }

    var OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }

  // and applies them to the HTMLElements such as popper and arrow

  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function (name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element = state.elements[name]; // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe[cannot-write]


      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (name) {
        var value = attributes[name];

        if (value === false) {
          element.removeAttribute(name);
        } else {
          element.setAttribute(name, value === true ? '' : value);
        }
      });
    });
  }

  function effect$2(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: '0',
        top: '0',
        margin: '0'
      },
      arrow: {
        position: 'absolute'
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;

    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }

    return function () {
      Object.keys(state.elements).forEach(function (name) {
        var element = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

        var style = styleProperties.reduce(function (style, property) {
          style[property] = '';
          return style;
        }, {}); // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        }

        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (attribute) {
          element.removeAttribute(attribute);
        });
      });
    };
  } // eslint-disable-next-line import/no-unused-modules


  const applyStyles$1 = {
    name: 'applyStyles',
    enabled: true,
    phase: 'write',
    fn: applyStyles,
    effect: effect$2,
    requires: ['computeStyles']
  };

  function getBasePlacement(placement) {
    return placement.split('-')[0];
  }

  var max = Math.max;
  var min = Math.min;
  var round = Math.round;

  function getUAString() {
    var uaData = navigator.userAgentData;

    if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
      return uaData.brands.map(function (item) {
        return item.brand + "/" + item.version;
      }).join(' ');
    }

    return navigator.userAgent;
  }

  function isLayoutViewport() {
    return !/^((?!chrome|android).)*safari/i.test(getUAString());
  }

  function getBoundingClientRect(element, includeScale, isFixedStrategy) {
    if (includeScale === void 0) {
      includeScale = false;
    }

    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }

    var clientRect = element.getBoundingClientRect();
    var scaleX = 1;
    var scaleY = 1;

    if (includeScale && isHTMLElement(element)) {
      scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
      scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
    }

    var _ref = isElement(element) ? getWindow(element) : window,
        visualViewport = _ref.visualViewport;

    var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
    var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
    var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
    var width = clientRect.width / scaleX;
    var height = clientRect.height / scaleY;
    return {
      width: width,
      height: height,
      top: y,
      right: x + width,
      bottom: y + height,
      left: x,
      x: x,
      y: y
    };
  }

  // means it doesn't take into account transforms.

  function getLayoutRect(element) {
    var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
    // Fixes https://github.com/popperjs/popper-core/issues/1223

    var width = element.offsetWidth;
    var height = element.offsetHeight;

    if (Math.abs(clientRect.width - width) <= 1) {
      width = clientRect.width;
    }

    if (Math.abs(clientRect.height - height) <= 1) {
      height = clientRect.height;
    }

    return {
      x: element.offsetLeft,
      y: element.offsetTop,
      width: width,
      height: height
    };
  }

  function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

    if (parent.contains(child)) {
      return true;
    } // then fallback to custom implementation with Shadow DOM support
    else if (rootNode && isShadowRoot(rootNode)) {
        var next = child;

        do {
          if (next && parent.isSameNode(next)) {
            return true;
          } // $FlowFixMe[prop-missing]: need a better way to handle this...


          next = next.parentNode || next.host;
        } while (next);
      } // Give up, the result is false


    return false;
  }

  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }

  function isTableElement(element) {
    return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
  }

  function getDocumentElement(element) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
    element.document) || window.document).documentElement;
  }

  function getParentNode(element) {
    if (getNodeName(element) === 'html') {
      return element;
    }

    return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
      element.parentNode || ( // DOM Element detected
      isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
      // $FlowFixMe[incompatible-call]: HTMLElement is a Node
      getDocumentElement(element) // fallback

    );
  }

  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
    getComputedStyle$1(element).position === 'fixed') {
      return null;
    }

    return element.offsetParent;
  } // `.offsetParent` reports `null` for fixed elements, while absolute elements
  // return the containing block


  function getContainingBlock(element) {
    var isFirefox = /firefox/i.test(getUAString());
    var isIE = /Trident/i.test(getUAString());

    if (isIE && isHTMLElement(element)) {
      // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
      var elementCss = getComputedStyle$1(element);

      if (elementCss.position === 'fixed') {
        return null;
      }
    }

    var currentNode = getParentNode(element);

    if (isShadowRoot(currentNode)) {
      currentNode = currentNode.host;
    }

    while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
      var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
      // create a containing block.
      // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

      if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
        return currentNode;
      } else {
        currentNode = currentNode.parentNode;
      }
    }

    return null;
  } // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.


  function getOffsetParent(element) {
    var window = getWindow(element);
    var offsetParent = getTrueOffsetParent(element);

    while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
      offsetParent = getTrueOffsetParent(offsetParent);
    }

    if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
      return window;
    }

    return offsetParent || getContainingBlock(element) || window;
  }

  function getMainAxisFromPlacement(placement) {
    return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
  }

  function within(min$1, value, max$1) {
    return max(min$1, min(value, max$1));
  }
  function withinMaxClamp(min, value, max) {
    var v = within(min, value, max);
    return v > max ? max : v;
  }

  function getFreshSideObject() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }

  function mergePaddingObject(paddingObject) {
    return Object.assign({}, getFreshSideObject(), paddingObject);
  }

  function expandToHashMap(value, keys) {
    return keys.reduce(function (hashMap, key) {
      hashMap[key] = value;
      return hashMap;
    }, {});
  }

  var toPaddingObject = function toPaddingObject(padding, state) {
    padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
      placement: state.placement
    })) : padding;
    return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  };

  function arrow(_ref) {
    var _state$modifiersData$;

    var state = _ref.state,
        name = _ref.name,
        options = _ref.options;
    var arrowElement = state.elements.arrow;
    var popperOffsets = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? 'height' : 'width';

    if (!arrowElement || !popperOffsets) {
      return;
    }

    var paddingObject = toPaddingObject(options.padding, state);
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === 'y' ? top : left;
    var maxProp = axis === 'y' ? bottom : right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
    var startDiff = popperOffsets[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
    // outside of the popper bounds

    var min = paddingObject[minProp];
    var max = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset = within(min, center, max); // Prevents breaking syntax highlighting...

    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
  }

  function effect$1(_ref2) {
    var state = _ref2.state,
        options = _ref2.options;
    var _options$element = options.element,
        arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

    if (arrowElement == null) {
      return;
    } // CSS selector


    if (typeof arrowElement === 'string') {
      arrowElement = state.elements.popper.querySelector(arrowElement);

      if (!arrowElement) {
        return;
      }
    }

    if (!contains(state.elements.popper, arrowElement)) {
      return;
    }

    state.elements.arrow = arrowElement;
  } // eslint-disable-next-line import/no-unused-modules


  const arrow$1 = {
    name: 'arrow',
    enabled: true,
    phase: 'main',
    fn: arrow,
    effect: effect$1,
    requires: ['popperOffsets'],
    requiresIfExists: ['preventOverflow']
  };

  function getVariation(placement) {
    return placement.split('-')[1];
  }

  var unsetSides = {
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto'
  }; // Round the offsets to the nearest suitable subpixel based on the DPR.
  // Zooming can change the DPR, but it seems to report a value that will
  // cleanly divide the values into the appropriate subpixels.

  function roundOffsetsByDPR(_ref, win) {
    var x = _ref.x,
        y = _ref.y;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: round(x * dpr) / dpr || 0,
      y: round(y * dpr) / dpr || 0
    };
  }

  function mapToStyles(_ref2) {
    var _Object$assign2;

    var popper = _ref2.popper,
        popperRect = _ref2.popperRect,
        placement = _ref2.placement,
        variation = _ref2.variation,
        offsets = _ref2.offsets,
        position = _ref2.position,
        gpuAcceleration = _ref2.gpuAcceleration,
        adaptive = _ref2.adaptive,
        roundOffsets = _ref2.roundOffsets,
        isFixed = _ref2.isFixed;
    var _offsets$x = offsets.x,
        x = _offsets$x === void 0 ? 0 : _offsets$x,
        _offsets$y = offsets.y,
        y = _offsets$y === void 0 ? 0 : _offsets$y;

    var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
      x: x,
      y: y
    }) : {
      x: x,
      y: y
    };

    x = _ref3.x;
    y = _ref3.y;
    var hasX = offsets.hasOwnProperty('x');
    var hasY = offsets.hasOwnProperty('y');
    var sideX = left;
    var sideY = top;
    var win = window;

    if (adaptive) {
      var offsetParent = getOffsetParent(popper);
      var heightProp = 'clientHeight';
      var widthProp = 'clientWidth';

      if (offsetParent === getWindow(popper)) {
        offsetParent = getDocumentElement(popper);

        if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
          heightProp = 'scrollHeight';
          widthProp = 'scrollWidth';
        }
      } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


      offsetParent = offsetParent;

      if (placement === top || (placement === left || placement === right) && variation === end) {
        sideY = bottom;
        var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
        offsetParent[heightProp];
        y -= offsetY - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }

      if (placement === left || (placement === top || placement === bottom) && variation === end) {
        sideX = right;
        var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
        offsetParent[widthProp];
        x -= offsetX - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }

    var commonStyles = Object.assign({
      position: position
    }, adaptive && unsetSides);

    var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
      x: x,
      y: y
    }, getWindow(popper)) : {
      x: x,
      y: y
    };

    x = _ref4.x;
    y = _ref4.y;

    if (gpuAcceleration) {
      var _Object$assign;

      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }

    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
  }

  function computeStyles(_ref5) {
    var state = _ref5.state,
        options = _ref5.options;
    var _options$gpuAccelerat = options.gpuAcceleration,
        gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
        _options$adaptive = options.adaptive,
        adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
        _options$roundOffsets = options.roundOffsets,
        roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
    var commonStyles = {
      placement: getBasePlacement(state.placement),
      variation: getVariation(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration: gpuAcceleration,
      isFixed: state.options.strategy === 'fixed'
    };

    if (state.modifiersData.popperOffsets != null) {
      state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive: adaptive,
        roundOffsets: roundOffsets
      })));
    }

    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: 'absolute',
        adaptive: false,
        roundOffsets: roundOffsets
      })));
    }

    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-placement': state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  const computeStyles$1 = {
    name: 'computeStyles',
    enabled: true,
    phase: 'beforeWrite',
    fn: computeStyles,
    data: {}
  };

  var passive = {
    passive: true
  };

  function effect(_ref) {
    var state = _ref.state,
        instance = _ref.instance,
        options = _ref.options;
    var _options$scroll = options.scroll,
        scroll = _options$scroll === void 0 ? true : _options$scroll,
        _options$resize = options.resize,
        resize = _options$resize === void 0 ? true : _options$resize;
    var window = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.addEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.addEventListener('resize', instance.update, passive);
    }

    return function () {
      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.removeEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.removeEventListener('resize', instance.update, passive);
      }
    };
  } // eslint-disable-next-line import/no-unused-modules


  const eventListeners = {
    name: 'eventListeners',
    enabled: true,
    phase: 'write',
    fn: function fn() {},
    effect: effect,
    data: {}
  };

  var hash$1 = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash$1[matched];
    });
  }

  var hash = {
    start: 'end',
    end: 'start'
  };
  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function (matched) {
      return hash[matched];
    });
  }

  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft: scrollLeft,
      scrollTop: scrollTop
    };
  }

  function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    // Popper 1 is broken in this case and never had a bug report so let's assume
    // it's not an issue. I don't think anyone ever specifies width on <html>
    // anyway.
    // Browsers where the left scrollbar doesn't cause an issue report `0` for
    // this (e.g. Edge 2019, IE11, Safari)
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
  }

  function getViewportRect(element, strategy) {
    var win = getWindow(element);
    var html = getDocumentElement(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0;

    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      var layoutViewport = isLayoutViewport();

      if (layoutViewport || !layoutViewport && strategy === 'fixed') {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }

    return {
      width: width,
      height: height,
      x: x + getWindowScrollBarX(element),
      y: y
    };
  }

  // of the `<html>` and `<body>` rect bounds if horizontally scrollable

  function getDocumentRect(element) {
    var _element$ownerDocumen;

    var html = getDocumentElement(element);
    var winScroll = getWindowScroll(element);
    var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
    var y = -winScroll.scrollTop;

    if (getComputedStyle$1(body || html).direction === 'rtl') {
      x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }

    return {
      width: width,
      height: height,
      x: x,
      y: y
    };
  }

  function isScrollParent(element) {
    // Firefox wants us to check `-x` and `-y` variations as well
    var _getComputedStyle = getComputedStyle$1(element),
        overflow = _getComputedStyle.overflow,
        overflowX = _getComputedStyle.overflowX,
        overflowY = _getComputedStyle.overflowY;

    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }

  function getScrollParent(node) {
    if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
      // $FlowFixMe[incompatible-return]: assume body is always available
      return node.ownerDocument.body;
    }

    if (isHTMLElement(node) && isScrollParent(node)) {
      return node;
    }

    return getScrollParent(getParentNode(node));
  }

  /*
  given a DOM element, return the list of all scroll parents, up the list of ancesors
  until we get to the top window object. This list is what we attach scroll listeners
  to, because if any of these parent elements scroll, we'll need to re-calculate the
  reference element's position.
  */

  function listScrollParents(element, list) {
    var _element$ownerDocumen;

    if (list === void 0) {
      list = [];
    }

    var scrollParent = getScrollParent(element);
    var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
    var win = getWindow(scrollParent);
    var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)));
  }

  function rectToClientRect(rect) {
    return Object.assign({}, rect, {
      left: rect.x,
      top: rect.y,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    });
  }

  function getInnerBoundingClientRect(element, strategy) {
    var rect = getBoundingClientRect(element, false, strategy === 'fixed');
    rect.top = rect.top + element.clientTop;
    rect.left = rect.left + element.clientLeft;
    rect.bottom = rect.top + element.clientHeight;
    rect.right = rect.left + element.clientWidth;
    rect.width = element.clientWidth;
    rect.height = element.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
  }

  function getClientRectFromMixedType(element, clippingParent, strategy) {
    return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
  } // A "clipping parent" is an overflowable container with the characteristic of
  // clipping (or hiding) overflowing elements with a position different from
  // `initial`


  function getClippingParents(element) {
    var clippingParents = listScrollParents(getParentNode(element));
    var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

    if (!isElement(clipperElement)) {
      return [];
    } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


    return clippingParents.filter(function (clippingParent) {
      return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
    });
  } // Gets the maximum area that the element is visible in due to any number of
  // clipping parents


  function getClippingRect(element, boundary, rootBoundary, strategy) {
    var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
    var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents[0];
    var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
      var rect = getClientRectFromMixedType(element, clippingParent, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromMixedType(element, firstClippingParent, strategy));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
  }

  function computeOffsets(_ref) {
    var reference = _ref.reference,
        element = _ref.element,
        placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference.x + reference.width / 2 - element.width / 2;
    var commonY = reference.y + reference.height / 2 - element.height / 2;
    var offsets;

    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference.y - element.height
        };
        break;

      case bottom:
        offsets = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;

      case right:
        offsets = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;

      case left:
        offsets = {
          x: reference.x - element.width,
          y: commonY
        };
        break;

      default:
        offsets = {
          x: reference.x,
          y: reference.y
        };
    }

    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

    if (mainAxis != null) {
      var len = mainAxis === 'y' ? 'height' : 'width';

      switch (variation) {
        case start:
          offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
          break;

        case end:
          offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
          break;
      }
    }

    return offsets;
  }

  function detectOverflow(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        _options$placement = _options.placement,
        placement = _options$placement === void 0 ? state.placement : _options$placement,
        _options$strategy = _options.strategy,
        strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
        _options$boundary = _options.boundary,
        boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
        _options$rootBoundary = _options.rootBoundary,
        rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
        _options$elementConte = _options.elementContext,
        elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
        _options$altBoundary = _options.altBoundary,
        altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
        _options$padding = _options.padding,
        padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    var altContext = elementContext === popper ? reference : popper;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
    var referenceClientRect = getBoundingClientRect(state.elements.reference);
    var popperOffsets = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      placement: placement
    });
    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
    // 0 or negative = within the clipping rect

    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

    if (elementContext === popper && offsetData) {
      var offset = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function (key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
        overflowOffsets[key] += offset[axis] * multiply;
      });
    }

    return overflowOffsets;
  }

  function computeAutoPlacement(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        placement = _options.placement,
        boundary = _options.boundary,
        rootBoundary = _options.rootBoundary,
        padding = _options.padding,
        flipVariations = _options.flipVariations,
        _options$allowedAutoP = _options.allowedAutoPlacements,
        allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
      return getVariation(placement) === variation;
    }) : basePlacements;
    var allowedPlacements = placements$1.filter(function (placement) {
      return allowedAutoPlacements.indexOf(placement) >= 0;
    });

    if (allowedPlacements.length === 0) {
      allowedPlacements = placements$1;
    } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


    var overflows = allowedPlacements.reduce(function (acc, placement) {
      acc[placement] = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding
      })[getBasePlacement(placement)];
      return acc;
    }, {});
    return Object.keys(overflows).sort(function (a, b) {
      return overflows[a] - overflows[b];
    });
  }

  function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement(placement) === auto) {
      return [];
    }

    var oppositePlacement = getOppositePlacement(placement);
    return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
  }

  function flip(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;

    if (state.modifiersData[name]._skip) {
      return;
    }

    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
        specifiedFallbackPlacements = options.fallbackPlacements,
        padding = options.padding,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        _options$flipVariatio = options.flipVariations,
        flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
        allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
    var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
      return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        flipVariations: flipVariations,
        allowedAutoPlacements: allowedAutoPlacements
      }) : placement);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements[0];

    for (var i = 0; i < placements.length; i++) {
      var placement = placements[i];

      var _basePlacement = getBasePlacement(placement);

      var isStartVariation = getVariation(placement) === start;
      var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? 'width' : 'height';
      var overflow = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        altBoundary: altBoundary,
        padding: padding
      });
      var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

      if (referenceRect[len] > popperRect[len]) {
        mainVariationSide = getOppositePlacement(mainVariationSide);
      }

      var altVariationSide = getOppositePlacement(mainVariationSide);
      var checks = [];

      if (checkMainAxis) {
        checks.push(overflow[_basePlacement] <= 0);
      }

      if (checkAltAxis) {
        checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
      }

      if (checks.every(function (check) {
        return check;
      })) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break;
      }

      checksMap.set(placement, checks);
    }

    if (makeFallbackChecks) {
      // `2` may be desired in some cases – research later
      var numberOfChecks = flipVariations ? 3 : 1;

      var _loop = function _loop(_i) {
        var fittingPlacement = placements.find(function (placement) {
          var checks = checksMap.get(placement);

          if (checks) {
            return checks.slice(0, _i).every(function (check) {
              return check;
            });
          }
        });

        if (fittingPlacement) {
          firstFittingPlacement = fittingPlacement;
          return "break";
        }
      };

      for (var _i = numberOfChecks; _i > 0; _i--) {
        var _ret = _loop(_i);

        if (_ret === "break") break;
      }
    }

    if (state.placement !== firstFittingPlacement) {
      state.modifiersData[name]._skip = true;
      state.placement = firstFittingPlacement;
      state.reset = true;
    }
  } // eslint-disable-next-line import/no-unused-modules


  const flip$1 = {
    name: 'flip',
    enabled: true,
    phase: 'main',
    fn: flip,
    requiresIfExists: ['offset'],
    data: {
      _skip: false
    }
  };

  function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0) {
      preventedOffsets = {
        x: 0,
        y: 0
      };
    }

    return {
      top: overflow.top - rect.height - preventedOffsets.y,
      right: overflow.right - rect.width + preventedOffsets.x,
      bottom: overflow.bottom - rect.height + preventedOffsets.y,
      left: overflow.left - rect.width - preventedOffsets.x
    };
  }

  function isAnySideFullyClipped(overflow) {
    return [top, right, bottom, left].some(function (side) {
      return overflow[side] >= 0;
    });
  }

  function hide(_ref) {
    var state = _ref.state,
        name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: 'reference'
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets: referenceClippingOffsets,
      popperEscapeOffsets: popperEscapeOffsets,
      isReferenceHidden: isReferenceHidden,
      hasPopperEscaped: hasPopperEscaped
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-reference-hidden': isReferenceHidden,
      'data-popper-escaped': hasPopperEscaped
    });
  } // eslint-disable-next-line import/no-unused-modules


  const hide$1 = {
    name: 'hide',
    enabled: true,
    phase: 'main',
    requiresIfExists: ['preventOverflow'],
    fn: hide
  };

  function distanceAndSkiddingToXY(placement, rects, offset) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

    var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
      placement: placement
    })) : offset,
        skidding = _ref[0],
        distance = _ref[1];

    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0 ? {
      x: distance,
      y: skidding
    } : {
      x: skidding,
      y: distance
    };
  }

  function offset(_ref2) {
    var state = _ref2.state,
        options = _ref2.options,
        name = _ref2.name;
    var _options$offset = options.offset,
        offset = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = placements.reduce(function (acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
      return acc;
    }, {});
    var _data$state$placement = data[state.placement],
        x = _data$state$placement.x,
        y = _data$state$placement.y;

    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  const offset$1 = {
    name: 'offset',
    enabled: true,
    phase: 'main',
    requires: ['popperOffsets'],
    fn: offset
  };

  function popperOffsets(_ref) {
    var state = _ref.state,
        name = _ref.name;
    // Offsets are the actual position the popper needs to have to be
    // properly positioned near its reference element
    // This is the most basic placement, and will be adjusted by
    // the modifiers in the next step
    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      placement: state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  const popperOffsets$1 = {
    name: 'popperOffsets',
    enabled: true,
    phase: 'read',
    fn: popperOffsets,
    data: {}
  };

  function getAltAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }

  function preventOverflow(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;
    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        padding = options.padding,
        _options$tether = options.tether,
        tether = _options$tether === void 0 ? true : _options$tether,
        _options$tetherOffset = options.tetherOffset,
        tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      altBoundary: altBoundary
    });
    var basePlacement = getBasePlacement(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
      placement: state.placement
    })) : tetherOffset;
    var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
      mainAxis: tetherOffsetValue,
      altAxis: tetherOffsetValue
    } : Object.assign({
      mainAxis: 0,
      altAxis: 0
    }, tetherOffsetValue);
    var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
    var data = {
      x: 0,
      y: 0
    };

    if (!popperOffsets) {
      return;
    }

    if (checkMainAxis) {
      var _offsetModifierState$;

      var mainSide = mainAxis === 'y' ? top : left;
      var altSide = mainAxis === 'y' ? bottom : right;
      var len = mainAxis === 'y' ? 'height' : 'width';
      var offset = popperOffsets[mainAxis];
      var min$1 = offset + overflow[mainSide];
      var max$1 = offset - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
      // outside the reference bounds

      var arrowElement = state.elements.arrow;
      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
        width: 0,
        height: 0
      };
      var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
      // to include its full size in the calculation. If the reference is small
      // and near the edge of a boundary, the popper can overflow even if the
      // reference is not overflowing as well (e.g. virtual elements with no
      // width or height)

      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
      var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
      var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
      var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
      var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
      var tetherMax = offset + maxOffset - offsetModifierValue;
      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _offsetModifierState$2;

      var _mainSide = mainAxis === 'x' ? top : left;

      var _altSide = mainAxis === 'x' ? bottom : right;

      var _offset = popperOffsets[altAxis];

      var _len = altAxis === 'y' ? 'height' : 'width';

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

      var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

      var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

      var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

      var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  const preventOverflow$1 = {
    name: 'preventOverflow',
    enabled: true,
    phase: 'main',
    fn: preventOverflow,
    requiresIfExists: ['offset']
  };

  function getHTMLElementScroll(element) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }

  function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
      return getWindowScroll(node);
    } else {
      return getHTMLElementScroll(node);
    }
  }

  function isElementScaled(element) {
    var rect = element.getBoundingClientRect();
    var scaleX = round(rect.width) / element.offsetWidth || 1;
    var scaleY = round(rect.height) / element.offsetHeight || 1;
    return scaleX !== 1 || scaleY !== 1;
  } // Returns the composite rect of an element relative to its offsetParent.
  // Composite means it takes into account transforms as well as layout.


  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }

    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = {
      x: 0,
      y: 0
    };

    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
      isScrollParent(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }

      if (isHTMLElement(offsetParent)) {
        offsets = getBoundingClientRect(offsetParent, true);
        offsets.x += offsetParent.clientLeft;
        offsets.y += offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }

    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }

  function order(modifiers) {
    var map = new Map();
    var visited = new Set();
    var result = [];
    modifiers.forEach(function (modifier) {
      map.set(modifier.name, modifier);
    }); // On visiting object, check for its dependencies and visit them recursively

    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function (dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);

          if (depModifier) {
            sort(depModifier);
          }
        }
      });
      result.push(modifier);
    }

    modifiers.forEach(function (modifier) {
      if (!visited.has(modifier.name)) {
        // check for visited object
        sort(modifier);
      }
    });
    return result;
  }

  function orderModifiers(modifiers) {
    // order based on dependencies
    var orderedModifiers = order(modifiers); // order based on phase

    return modifierPhases.reduce(function (acc, phase) {
      return acc.concat(orderedModifiers.filter(function (modifier) {
        return modifier.phase === phase;
      }));
    }, []);
  }

  function debounce(fn) {
    var pending;
    return function () {
      if (!pending) {
        pending = new Promise(function (resolve) {
          Promise.resolve().then(function () {
            pending = undefined;
            resolve(fn());
          });
        });
      }

      return pending;
    };
  }

  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function (merged, current) {
      var existing = merged[current.name];
      merged[current.name] = existing ? Object.assign({}, existing, current, {
        options: Object.assign({}, existing.options, current.options),
        data: Object.assign({}, existing.data, current.data)
      }) : current;
      return merged;
    }, {}); // IE11 does not support Object.values

    return Object.keys(merged).map(function (key) {
      return merged[key];
    });
  }

  var DEFAULT_OPTIONS = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute'
  };

  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return !args.some(function (element) {
      return !(element && typeof element.getBoundingClientRect === 'function');
    });
  }

  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {};
    }

    var _generatorOptions = generatorOptions,
        _generatorOptions$def = _generatorOptions.defaultModifiers,
        defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
        _generatorOptions$def2 = _generatorOptions.defaultOptions,
        defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper(reference, popper, options) {
      if (options === void 0) {
        options = defaultOptions;
      }

      var state = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
        modifiersData: {},
        elements: {
          reference: reference,
          popper: popper
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state: state,
        setOptions: function setOptions(setOptionsAction) {
          var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
          cleanupModifierEffects();
          state.options = Object.assign({}, defaultOptions, state.options, options);
          state.scrollParents = {
            reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
            popper: listScrollParents(popper)
          }; // Orders the modifiers based on their dependencies and `phase`
          // properties

          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

          state.orderedModifiers = orderedModifiers.filter(function (m) {
            return m.enabled;
          });
          runModifierEffects();
          return instance.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function forceUpdate() {
          if (isDestroyed) {
            return;
          }

          var _state$elements = state.elements,
              reference = _state$elements.reference,
              popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
          // anymore

          if (!areValidElements(reference, popper)) {
            return;
          } // Store the reference and popper rects to be read by modifiers


          state.rects = {
            reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
            popper: getLayoutRect(popper)
          }; // Modifiers have the ability to reset the current update cycle. The
          // most common use case for this is the `flip` modifier changing the
          // placement, which then needs to re-run all the modifiers, because the
          // logic was previously ran for the previous placement and is therefore
          // stale/incorrect

          state.reset = false;
          state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
          // is filled with the initial data specified by the modifier. This means
          // it doesn't persist and is fresh on each update.
          // To ensure persistent data, use `${name}#persistent`

          state.orderedModifiers.forEach(function (modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
          });

          for (var index = 0; index < state.orderedModifiers.length; index++) {
            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue;
            }

            var _state$orderedModifie = state.orderedModifiers[index],
                fn = _state$orderedModifie.fn,
                _state$orderedModifie2 = _state$orderedModifie.options,
                _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                name = _state$orderedModifie.name;

            if (typeof fn === 'function') {
              state = fn({
                state: state,
                options: _options,
                name: name,
                instance: instance
              }) || state;
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: debounce(function () {
          return new Promise(function (resolve) {
            instance.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        }
      };

      if (!areValidElements(reference, popper)) {
        return instance;
      }

      instance.setOptions(options).then(function (state) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state);
        }
      }); // Modifiers have the ability to execute arbitrary code before the first
      // update cycle runs. They will be executed in the same order as the update
      // cycle. This is useful when a modifier adds some persistent data that
      // other modifiers need to use, but the modifier is run after the dependent
      // one.

      function runModifierEffects() {
        state.orderedModifiers.forEach(function (_ref) {
          var name = _ref.name,
              _ref$options = _ref.options,
              options = _ref$options === void 0 ? {} : _ref$options,
              effect = _ref.effect;

          if (typeof effect === 'function') {
            var cleanupFn = effect({
              state: state,
              name: name,
              instance: instance,
              options: options
            });

            var noopFn = function noopFn() {};

            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }

      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function (fn) {
          return fn();
        });
        effectCleanupFns = [];
      }

      return instance;
    };
  }
  var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

  var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
  var createPopper$1 = /*#__PURE__*/popperGenerator({
    defaultModifiers: defaultModifiers$1
  }); // eslint-disable-next-line import/no-unused-modules

  var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
  var createPopper = /*#__PURE__*/popperGenerator({
    defaultModifiers: defaultModifiers
  }); // eslint-disable-next-line import/no-unused-modules

  const Popper = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    afterMain,
    afterRead,
    afterWrite,
    applyStyles: applyStyles$1,
    arrow: arrow$1,
    auto,
    basePlacements,
    beforeMain,
    beforeRead,
    beforeWrite,
    bottom,
    clippingParents,
    computeStyles: computeStyles$1,
    createPopper,
    createPopperBase: createPopper$2,
    createPopperLite: createPopper$1,
    detectOverflow,
    end,
    eventListeners,
    flip: flip$1,
    hide: hide$1,
    left,
    main,
    modifierPhases,
    offset: offset$1,
    placements,
    popper,
    popperGenerator,
    popperOffsets: popperOffsets$1,
    preventOverflow: preventOverflow$1,
    read,
    reference,
    right,
    start,
    top,
    variationPlacements,
    viewport,
    write
  }, Symbol.toStringTag, { value: 'Module' }));

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$a = 'dropdown';
  const DATA_KEY$6 = 'bs.dropdown';
  const EVENT_KEY$6 = `.${DATA_KEY$6}`;
  const DATA_API_KEY$3 = '.data-api';
  const ESCAPE_KEY$2 = 'Escape';
  const TAB_KEY$1 = 'Tab';
  const ARROW_UP_KEY$1 = 'ArrowUp';
  const ARROW_DOWN_KEY$1 = 'ArrowDown';
  const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

  const EVENT_HIDE$5 = `hide${EVENT_KEY$6}`;
  const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$6}`;
  const EVENT_SHOW$5 = `show${EVENT_KEY$6}`;
  const EVENT_SHOWN$5 = `shown${EVENT_KEY$6}`;
  const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const CLASS_NAME_SHOW$6 = 'show';
  const CLASS_NAME_DROPUP = 'dropup';
  const CLASS_NAME_DROPEND = 'dropend';
  const CLASS_NAME_DROPSTART = 'dropstart';
  const CLASS_NAME_DROPUP_CENTER = 'dropup-center';
  const CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
  const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
  const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE$3}.${CLASS_NAME_SHOW$6}`;
  const SELECTOR_MENU = '.dropdown-menu';
  const SELECTOR_NAVBAR = '.navbar';
  const SELECTOR_NAVBAR_NAV = '.navbar-nav';
  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
  const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
  const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
  const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
  const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
  const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
  const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
  const PLACEMENT_TOPCENTER = 'top';
  const PLACEMENT_BOTTOMCENTER = 'bottom';
  const Default$9 = {
    autoClose: true,
    boundary: 'clippingParents',
    display: 'dynamic',
    offset: [0, 2],
    popperConfig: null,
    reference: 'toggle'
  };
  const DefaultType$9 = {
    autoClose: '(boolean|string)',
    boundary: '(string|element)',
    display: 'string',
    offset: '(array|string|function)',
    popperConfig: '(null|object|function)',
    reference: '(string|element|object)'
  };

  /**
   * Class definition
   */

  class Dropdown extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._popper = null;
      this._parent = this._element.parentNode; // dropdown wrapper
      // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
      this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);
      this._inNavbar = this._detectNavbar();
    }

    // Getters
    static get Default() {
      return Default$9;
    }
    static get DefaultType() {
      return DefaultType$9;
    }
    static get NAME() {
      return NAME$a;
    }

    // Public
    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (isDisabled(this._element) || this._isShown()) {
        return;
      }
      const relatedTarget = {
        relatedTarget: this._element
      };
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget);
      if (showEvent.defaultPrevented) {
        return;
      }
      this._createPopper();

      // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.on(element, 'mouseover', noop);
        }
      }
      this._element.focus();
      this._element.setAttribute('aria-expanded', true);
      this._menu.classList.add(CLASS_NAME_SHOW$6);
      this._element.classList.add(CLASS_NAME_SHOW$6);
      EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
    }
    hide() {
      if (isDisabled(this._element) || !this._isShown()) {
        return;
      }
      const relatedTarget = {
        relatedTarget: this._element
      };
      this._completeHide(relatedTarget);
    }
    dispose() {
      if (this._popper) {
        this._popper.destroy();
      }
      super.dispose();
    }
    update() {
      this._inNavbar = this._detectNavbar();
      if (this._popper) {
        this._popper.update();
      }
    }

    // Private
    _completeHide(relatedTarget) {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget);
      if (hideEvent.defaultPrevented) {
        return;
      }

      // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support
      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.off(element, 'mouseover', noop);
        }
      }
      if (this._popper) {
        this._popper.destroy();
      }
      this._menu.classList.remove(CLASS_NAME_SHOW$6);
      this._element.classList.remove(CLASS_NAME_SHOW$6);
      this._element.setAttribute('aria-expanded', 'false');
      Manipulator.removeDataAttribute(this._menu, 'popper');
      EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);
    }
    _getConfig(config) {
      config = super._getConfig(config);
      if (typeof config.reference === 'object' && !isElement$1(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
        // Popper virtual elements require a getBoundingClientRect method
        throw new TypeError(`${NAME$a.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
      }
      return config;
    }
    _createPopper() {
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org/docs/v2/)');
      }
      let referenceElement = this._element;
      if (this._config.reference === 'parent') {
        referenceElement = this._parent;
      } else if (isElement$1(this._config.reference)) {
        referenceElement = getElement(this._config.reference);
      } else if (typeof this._config.reference === 'object') {
        referenceElement = this._config.reference;
      }
      const popperConfig = this._getPopperConfig();
      this._popper = createPopper(referenceElement, this._menu, popperConfig);
    }
    _isShown() {
      return this._menu.classList.contains(CLASS_NAME_SHOW$6);
    }
    _getPlacement() {
      const parentDropdown = this._parent;
      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
        return PLACEMENT_RIGHT;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
        return PLACEMENT_LEFT;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
        return PLACEMENT_TOPCENTER;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
        return PLACEMENT_BOTTOMCENTER;
      }

      // We need to trim the value because custom properties can also include spaces
      const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      }
      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
    }
    _detectNavbar() {
      return this._element.closest(SELECTOR_NAVBAR) !== null;
    }
    _getOffset() {
      const {
        offset
      } = this._config;
      if (typeof offset === 'string') {
        return offset.split(',').map(value => Number.parseInt(value, 10));
      }
      if (typeof offset === 'function') {
        return popperData => offset(popperData, this._element);
      }
      return offset;
    }
    _getPopperConfig() {
      const defaultBsPopperConfig = {
        placement: this._getPlacement(),
        modifiers: [{
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }]
      };

      // Disable Popper if we have a static display or Dropdown is in Navbar
      if (this._inNavbar || this._config.display === 'static') {
        Manipulator.setDataAttribute(this._menu, 'popper', 'static'); // TODO: v6 remove
        defaultBsPopperConfig.modifiers = [{
          name: 'applyStyles',
          enabled: false
        }];
      }
      return {
        ...defaultBsPopperConfig,
        ...execute(this._config.popperConfig, [undefined, defaultBsPopperConfig])
      };
    }
    _selectMenuItem({
      key,
      target
    }) {
      const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(element => isVisible(element));
      if (!items.length) {
        return;
      }

      // if target isn't included in items (e.g. when expanding the dropdown)
      // allow cycling to get the last item in case key equals ARROW_UP_KEY
      getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Dropdown.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
    static clearMenus(event) {
      if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1) {
        return;
      }
      const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
      for (const toggle of openToggles) {
        const context = Dropdown.getInstance(toggle);
        if (!context || context._config.autoClose === false) {
          continue;
        }
        const composedPath = event.composedPath();
        const isMenuTarget = composedPath.includes(context._menu);
        if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
          continue;
        }

        // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu
        if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
          continue;
        }
        const relatedTarget = {
          relatedTarget: context._element
        };
        if (event.type === 'click') {
          relatedTarget.clickEvent = event;
        }
        context._completeHide(relatedTarget);
      }
    }
    static dataApiKeydownHandler(event) {
      // If not an UP | DOWN | ESCAPE key => not a dropdown command
      // If input/textarea && if key is other than ESCAPE => not a dropdown command

      const isInput = /input|textarea/i.test(event.target.tagName);
      const isEscapeEvent = event.key === ESCAPE_KEY$2;
      const isUpOrDownEvent = [ARROW_UP_KEY$1, ARROW_DOWN_KEY$1].includes(event.key);
      if (!isUpOrDownEvent && !isEscapeEvent) {
        return;
      }
      if (isInput && !isEscapeEvent) {
        return;
      }
      event.preventDefault();

      // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3, event.delegateTarget.parentNode);
      const instance = Dropdown.getOrCreateInstance(getToggleButton);
      if (isUpOrDownEvent) {
        event.stopPropagation();
        instance.show();
        instance._selectMenuItem(event);
        return;
      }
      if (instance._isShown()) {
        // else is escape and we check if it is shown
        event.stopPropagation();
        instance.hide();
        getToggleButton.focus();
      }
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
    event.preventDefault();
    Dropdown.getOrCreateInstance(this).toggle();
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(Dropdown);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/backdrop.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$9 = 'backdrop';
  const CLASS_NAME_FADE$4 = 'fade';
  const CLASS_NAME_SHOW$5 = 'show';
  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$9}`;
  const Default$8 = {
    className: 'modal-backdrop',
    clickCallback: null,
    isAnimated: false,
    isVisible: true,
    // if false, we use the backdrop helper without adding any element to the dom
    rootElement: 'body' // give the choice to place backdrop under different elements
  };
  const DefaultType$8 = {
    className: 'string',
    clickCallback: '(function|null)',
    isAnimated: 'boolean',
    isVisible: 'boolean',
    rootElement: '(element|string)'
  };

  /**
   * Class definition
   */

  class Backdrop extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isAppended = false;
      this._element = null;
    }

    // Getters
    static get Default() {
      return Default$8;
    }
    static get DefaultType() {
      return DefaultType$8;
    }
    static get NAME() {
      return NAME$9;
    }

    // Public
    show(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }
      this._append();
      const element = this._getElement();
      if (this._config.isAnimated) {
        reflow(element);
      }
      element.classList.add(CLASS_NAME_SHOW$5);
      this._emulateAnimation(() => {
        execute(callback);
      });
    }
    hide(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }
      this._getElement().classList.remove(CLASS_NAME_SHOW$5);
      this._emulateAnimation(() => {
        this.dispose();
        execute(callback);
      });
    }
    dispose() {
      if (!this._isAppended) {
        return;
      }
      EventHandler.off(this._element, EVENT_MOUSEDOWN);
      this._element.remove();
      this._isAppended = false;
    }

    // Private
    _getElement() {
      if (!this._element) {
        const backdrop = document.createElement('div');
        backdrop.className = this._config.className;
        if (this._config.isAnimated) {
          backdrop.classList.add(CLASS_NAME_FADE$4);
        }
        this._element = backdrop;
      }
      return this._element;
    }
    _configAfterMerge(config) {
      // use getElement() with the default "body" to get a fresh Element on each instantiation
      config.rootElement = getElement(config.rootElement);
      return config;
    }
    _append() {
      if (this._isAppended) {
        return;
      }
      const element = this._getElement();
      this._config.rootElement.append(element);
      EventHandler.on(element, EVENT_MOUSEDOWN, () => {
        execute(this._config.clickCallback);
      });
      this._isAppended = true;
    }
    _emulateAnimation(callback) {
      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/focustrap.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$8 = 'focustrap';
  const DATA_KEY$5 = 'bs.focustrap';
  const EVENT_KEY$5 = `.${DATA_KEY$5}`;
  const EVENT_FOCUSIN$2 = `focusin${EVENT_KEY$5}`;
  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$5}`;
  const TAB_KEY = 'Tab';
  const TAB_NAV_FORWARD = 'forward';
  const TAB_NAV_BACKWARD = 'backward';
  const Default$7 = {
    autofocus: true,
    trapElement: null // The element to trap focus inside of
  };
  const DefaultType$7 = {
    autofocus: 'boolean',
    trapElement: 'element'
  };

  /**
   * Class definition
   */

  class FocusTrap extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
      this._isActive = false;
      this._lastTabNavDirection = null;
    }

    // Getters
    static get Default() {
      return Default$7;
    }
    static get DefaultType() {
      return DefaultType$7;
    }
    static get NAME() {
      return NAME$8;
    }

    // Public
    activate() {
      if (this._isActive) {
        return;
      }
      if (this._config.autofocus) {
        this._config.trapElement.focus();
      }
      EventHandler.off(document, EVENT_KEY$5); // guard against infinite focus loop
      EventHandler.on(document, EVENT_FOCUSIN$2, event => this._handleFocusin(event));
      EventHandler.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
      this._isActive = true;
    }
    deactivate() {
      if (!this._isActive) {
        return;
      }
      this._isActive = false;
      EventHandler.off(document, EVENT_KEY$5);
    }

    // Private
    _handleFocusin(event) {
      const {
        trapElement
      } = this._config;
      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
        return;
      }
      const elements = SelectorEngine.focusableChildren(trapElement);
      if (elements.length === 0) {
        trapElement.focus();
      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
        elements[elements.length - 1].focus();
      } else {
        elements[0].focus();
      }
    }
    _handleKeydown(event) {
      if (event.key !== TAB_KEY) {
        return;
      }
      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/scrollBar.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  const SELECTOR_STICKY_CONTENT = '.sticky-top';
  const PROPERTY_PADDING = 'padding-right';
  const PROPERTY_MARGIN = 'margin-right';

  /**
   * Class definition
   */

  class ScrollBarHelper {
    constructor() {
      this._element = document.body;
    }

    // Public
    getWidth() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
      const documentWidth = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - documentWidth);
    }
    hide() {
      const width = this.getWidth();
      this._disableOverFlow();
      // give padding to element to balance the hidden scrollbar width
      this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
      // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth
      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
    }
    reset() {
      this._resetElementAttributes(this._element, 'overflow');
      this._resetElementAttributes(this._element, PROPERTY_PADDING);
      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
    }
    isOverflowing() {
      return this.getWidth() > 0;
    }

    // Private
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, 'overflow');
      this._element.style.overflow = 'hidden';
    }
    _setElementAttributes(selector, styleProperty, callback) {
      const scrollbarWidth = this.getWidth();
      const manipulationCallBack = element => {
        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
          return;
        }
        this._saveInitialAttribute(element, styleProperty);
        const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
        element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
      };
      this._applyManipulationCallback(selector, manipulationCallBack);
    }
    _saveInitialAttribute(element, styleProperty) {
      const actualValue = element.style.getPropertyValue(styleProperty);
      if (actualValue) {
        Manipulator.setDataAttribute(element, styleProperty, actualValue);
      }
    }
    _resetElementAttributes(selector, styleProperty) {
      const manipulationCallBack = element => {
        const value = Manipulator.getDataAttribute(element, styleProperty);
        // We only want to remove the property if the value is `null`; the value can also be zero
        if (value === null) {
          element.style.removeProperty(styleProperty);
          return;
        }
        Manipulator.removeDataAttribute(element, styleProperty);
        element.style.setProperty(styleProperty, value);
      };
      this._applyManipulationCallback(selector, manipulationCallBack);
    }
    _applyManipulationCallback(selector, callBack) {
      if (isElement$1(selector)) {
        callBack(selector);
        return;
      }
      for (const sel of SelectorEngine.find(selector, this._element)) {
        callBack(sel);
      }
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$7 = 'modal';
  const DATA_KEY$4 = 'bs.modal';
  const EVENT_KEY$4 = `.${DATA_KEY$4}`;
  const DATA_API_KEY$2 = '.data-api';
  const ESCAPE_KEY$1 = 'Escape';
  const EVENT_HIDE$4 = `hide${EVENT_KEY$4}`;
  const EVENT_HIDE_PREVENTED$1 = `hidePrevented${EVENT_KEY$4}`;
  const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$4}`;
  const EVENT_SHOW$4 = `show${EVENT_KEY$4}`;
  const EVENT_SHOWN$4 = `shown${EVENT_KEY$4}`;
  const EVENT_RESIZE$1 = `resize${EVENT_KEY$4}`;
  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$4}`;
  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$4}`;
  const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$4}`;
  const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$4}${DATA_API_KEY$2}`;
  const CLASS_NAME_OPEN = 'modal-open';
  const CLASS_NAME_FADE$3 = 'fade';
  const CLASS_NAME_SHOW$4 = 'show';
  const CLASS_NAME_STATIC = 'modal-static';
  const OPEN_SELECTOR$1 = '.modal.show';
  const SELECTOR_DIALOG = '.modal-dialog';
  const SELECTOR_MODAL_BODY = '.modal-body';
  const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
  const Default$6 = {
    backdrop: true,
    focus: true,
    keyboard: true
  };
  const DefaultType$6 = {
    backdrop: '(boolean|string)',
    focus: 'boolean',
    keyboard: 'boolean'
  };

  /**
   * Class definition
   */

  class Modal extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._isShown = false;
      this._isTransitioning = false;
      this._scrollBar = new ScrollBarHelper();
      this._addEventListeners();
    }

    // Getters
    static get Default() {
      return Default$6;
    }
    static get DefaultType() {
      return DefaultType$6;
    }
    static get NAME() {
      return NAME$7;
    }

    // Public
    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
    show(relatedTarget) {
      if (this._isShown || this._isTransitioning) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
        relatedTarget
      });
      if (showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      this._isTransitioning = true;
      this._scrollBar.hide();
      document.body.classList.add(CLASS_NAME_OPEN);
      this._adjustDialog();
      this._backdrop.show(() => this._showElement(relatedTarget));
    }
    hide() {
      if (!this._isShown || this._isTransitioning) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._isShown = false;
      this._isTransitioning = true;
      this._focustrap.deactivate();
      this._element.classList.remove(CLASS_NAME_SHOW$4);
      this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
    }
    dispose() {
      EventHandler.off(window, EVENT_KEY$4);
      EventHandler.off(this._dialog, EVENT_KEY$4);
      this._backdrop.dispose();
      this._focustrap.deactivate();
      super.dispose();
    }
    handleUpdate() {
      this._adjustDialog();
    }

    // Private
    _initializeBackDrop() {
      return new Backdrop({
        isVisible: Boolean(this._config.backdrop),
        // 'static' option will be translated to true, and booleans will keep their value,
        isAnimated: this._isAnimated()
      });
    }
    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }
    _showElement(relatedTarget) {
      // try to append dynamic modal
      if (!document.body.contains(this._element)) {
        document.body.append(this._element);
      }
      this._element.style.display = 'block';
      this._element.removeAttribute('aria-hidden');
      this._element.setAttribute('aria-modal', true);
      this._element.setAttribute('role', 'dialog');
      this._element.scrollTop = 0;
      const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
      if (modalBody) {
        modalBody.scrollTop = 0;
      }
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_SHOW$4);
      const transitionComplete = () => {
        if (this._config.focus) {
          this._focustrap.activate();
        }
        this._isTransitioning = false;
        EventHandler.trigger(this._element, EVENT_SHOWN$4, {
          relatedTarget
        });
      };
      this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
    }
    _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, event => {
        if (event.key !== ESCAPE_KEY$1) {
          return;
        }
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      });
      EventHandler.on(window, EVENT_RESIZE$1, () => {
        if (this._isShown && !this._isTransitioning) {
          this._adjustDialog();
        }
      });
      EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, event => {
        // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
        EventHandler.one(this._element, EVENT_CLICK_DISMISS, event2 => {
          if (this._element !== event.target || this._element !== event2.target) {
            return;
          }
          if (this._config.backdrop === 'static') {
            this._triggerBackdropTransition();
            return;
          }
          if (this._config.backdrop) {
            this.hide();
          }
        });
      });
    }
    _hideModal() {
      this._element.style.display = 'none';
      this._element.setAttribute('aria-hidden', true);
      this._element.removeAttribute('aria-modal');
      this._element.removeAttribute('role');
      this._isTransitioning = false;
      this._backdrop.hide(() => {
        document.body.classList.remove(CLASS_NAME_OPEN);
        this._resetAdjustments();
        this._scrollBar.reset();
        EventHandler.trigger(this._element, EVENT_HIDDEN$4);
      });
    }
    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_FADE$3);
    }
    _triggerBackdropTransition() {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);
      if (hideEvent.defaultPrevented) {
        return;
      }
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      const initialOverflowY = this._element.style.overflowY;
      // return if the following background transition hasn't yet completed
      if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
        return;
      }
      if (!isModalOverflowing) {
        this._element.style.overflowY = 'hidden';
      }
      this._element.classList.add(CLASS_NAME_STATIC);
      this._queueCallback(() => {
        this._element.classList.remove(CLASS_NAME_STATIC);
        this._queueCallback(() => {
          this._element.style.overflowY = initialOverflowY;
        }, this._dialog);
      }, this._dialog);
      this._element.focus();
    }

    /**
     * The following methods are used to handle overflowing modals
     */

    _adjustDialog() {
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      const scrollbarWidth = this._scrollBar.getWidth();
      const isBodyOverflowing = scrollbarWidth > 0;
      if (isBodyOverflowing && !isModalOverflowing) {
        const property = isRTL() ? 'paddingLeft' : 'paddingRight';
        this._element.style[property] = `${scrollbarWidth}px`;
      }
      if (!isBodyOverflowing && isModalOverflowing) {
        const property = isRTL() ? 'paddingRight' : 'paddingLeft';
        this._element.style[property] = `${scrollbarWidth}px`;
      }
    }
    _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    }

    // Static
    static jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        const data = Modal.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](relatedTarget);
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
    const target = SelectorEngine.getElementFromSelector(this);
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }
    EventHandler.one(target, EVENT_SHOW$4, showEvent => {
      if (showEvent.defaultPrevented) {
        // only register focus restorer if modal will actually get shown
        return;
      }
      EventHandler.one(target, EVENT_HIDDEN$4, () => {
        if (isVisible(this)) {
          this.focus();
        }
      });
    });

    // avoid conflict when clicking modal toggler while another one is open
    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
    if (alreadyOpen) {
      Modal.getInstance(alreadyOpen).hide();
    }
    const data = Modal.getOrCreateInstance(target);
    data.toggle(this);
  });
  enableDismissTrigger(Modal);

  /**
   * jQuery
   */

  defineJQueryPlugin(Modal);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap offcanvas.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$6 = 'offcanvas';
  const DATA_KEY$3 = 'bs.offcanvas';
  const EVENT_KEY$3 = `.${DATA_KEY$3}`;
  const DATA_API_KEY$1 = '.data-api';
  const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$3}${DATA_API_KEY$1}`;
  const ESCAPE_KEY = 'Escape';
  const CLASS_NAME_SHOW$3 = 'show';
  const CLASS_NAME_SHOWING$1 = 'showing';
  const CLASS_NAME_HIDING = 'hiding';
  const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
  const OPEN_SELECTOR = '.offcanvas.show';
  const EVENT_SHOW$3 = `show${EVENT_KEY$3}`;
  const EVENT_SHOWN$3 = `shown${EVENT_KEY$3}`;
  const EVENT_HIDE$3 = `hide${EVENT_KEY$3}`;
  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$3}`;
  const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$3}`;
  const EVENT_RESIZE = `resize${EVENT_KEY$3}`;
  const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$3}${DATA_API_KEY$1}`;
  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$3}`;
  const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
  const Default$5 = {
    backdrop: true,
    keyboard: true,
    scroll: false
  };
  const DefaultType$5 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    scroll: 'boolean'
  };

  /**
   * Class definition
   */

  class Offcanvas extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._isShown = false;
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._addEventListeners();
    }

    // Getters
    static get Default() {
      return Default$5;
    }
    static get DefaultType() {
      return DefaultType$5;
    }
    static get NAME() {
      return NAME$6;
    }

    // Public
    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
    show(relatedTarget) {
      if (this._isShown) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
        relatedTarget
      });
      if (showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      this._backdrop.show();
      if (!this._config.scroll) {
        new ScrollBarHelper().hide();
      }
      this._element.setAttribute('aria-modal', true);
      this._element.setAttribute('role', 'dialog');
      this._element.classList.add(CLASS_NAME_SHOWING$1);
      const completeCallBack = () => {
        if (!this._config.scroll || this._config.backdrop) {
          this._focustrap.activate();
        }
        this._element.classList.add(CLASS_NAME_SHOW$3);
        this._element.classList.remove(CLASS_NAME_SHOWING$1);
        EventHandler.trigger(this._element, EVENT_SHOWN$3, {
          relatedTarget
        });
      };
      this._queueCallback(completeCallBack, this._element, true);
    }
    hide() {
      if (!this._isShown) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._focustrap.deactivate();
      this._element.blur();
      this._isShown = false;
      this._element.classList.add(CLASS_NAME_HIDING);
      this._backdrop.hide();
      const completeCallback = () => {
        this._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);
        this._element.removeAttribute('aria-modal');
        this._element.removeAttribute('role');
        if (!this._config.scroll) {
          new ScrollBarHelper().reset();
        }
        EventHandler.trigger(this._element, EVENT_HIDDEN$3);
      };
      this._queueCallback(completeCallback, this._element, true);
    }
    dispose() {
      this._backdrop.dispose();
      this._focustrap.deactivate();
      super.dispose();
    }

    // Private
    _initializeBackDrop() {
      const clickCallback = () => {
        if (this._config.backdrop === 'static') {
          EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
          return;
        }
        this.hide();
      };

      // 'static' option will be translated to true, and booleans will keep their value
      const isVisible = Boolean(this._config.backdrop);
      return new Backdrop({
        className: CLASS_NAME_BACKDROP,
        isVisible,
        isAnimated: true,
        rootElement: this._element.parentNode,
        clickCallback: isVisible ? clickCallback : null
      });
    }
    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }
    _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
        if (event.key !== ESCAPE_KEY) {
          return;
        }
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
      });
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Offcanvas.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
    const target = SelectorEngine.getElementFromSelector(this);
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    EventHandler.one(target, EVENT_HIDDEN$3, () => {
      // focus on trigger when it is closed
      if (isVisible(this)) {
        this.focus();
      }
    });

    // avoid conflict when clicking a toggler of an offcanvas, while another is open
    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
    if (alreadyOpen && alreadyOpen !== target) {
      Offcanvas.getInstance(alreadyOpen).hide();
    }
    const data = Offcanvas.getOrCreateInstance(target);
    data.toggle(this);
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
    for (const selector of SelectorEngine.find(OPEN_SELECTOR)) {
      Offcanvas.getOrCreateInstance(selector).show();
    }
  });
  EventHandler.on(window, EVENT_RESIZE, () => {
    for (const element of SelectorEngine.find('[aria-modal][class*=show][class*=offcanvas-]')) {
      if (getComputedStyle(element).position !== 'fixed') {
        Offcanvas.getOrCreateInstance(element).hide();
      }
    }
  });
  enableDismissTrigger(Offcanvas);

  /**
   * jQuery
   */

  defineJQueryPlugin(Offcanvas);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  // js-docs-start allow-list
  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  const DefaultAllowlist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    dd: [],
    div: [],
    dl: [],
    dt: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  // js-docs-end allow-list

  const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);

  /**
   * A pattern that recognizes URLs that are safe wrt. XSS in URL navigation
   * contexts.
   *
   * Shout-out to Angular https://github.com/angular/angular/blob/15.2.8/packages/core/src/sanitization/url_sanitizer.ts#L38
   */
  const SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
  const allowedAttribute = (attribute, allowedAttributeList) => {
    const attributeName = attribute.nodeName.toLowerCase();
    if (allowedAttributeList.includes(attributeName)) {
      if (uriAttributes.has(attributeName)) {
        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue));
      }
      return true;
    }

    // Check if a regular expression validates the attribute.
    return allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp).some(regex => regex.test(attributeName));
  };
  function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
    if (!unsafeHtml.length) {
      return unsafeHtml;
    }
    if (sanitizeFunction && typeof sanitizeFunction === 'function') {
      return sanitizeFunction(unsafeHtml);
    }
    const domParser = new window.DOMParser();
    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    const elements = [].concat(...createdDocument.body.querySelectorAll('*'));
    for (const element of elements) {
      const elementName = element.nodeName.toLowerCase();
      if (!Object.keys(allowList).includes(elementName)) {
        element.remove();
        continue;
      }
      const attributeList = [].concat(...element.attributes);
      const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
      for (const attribute of attributeList) {
        if (!allowedAttribute(attribute, allowedAttributes)) {
          element.removeAttribute(attribute.nodeName);
        }
      }
    }
    return createdDocument.body.innerHTML;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/template-factory.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$5 = 'TemplateFactory';
  const Default$4 = {
    allowList: DefaultAllowlist,
    content: {},
    // { selector : text ,  selector2 : text2 , }
    extraClass: '',
    html: false,
    sanitize: true,
    sanitizeFn: null,
    template: '<div></div>'
  };
  const DefaultType$4 = {
    allowList: 'object',
    content: 'object',
    extraClass: '(string|function)',
    html: 'boolean',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    template: 'string'
  };
  const DefaultContentType = {
    entry: '(string|element|function|null)',
    selector: '(string|element)'
  };

  /**
   * Class definition
   */

  class TemplateFactory extends Config {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
    }

    // Getters
    static get Default() {
      return Default$4;
    }
    static get DefaultType() {
      return DefaultType$4;
    }
    static get NAME() {
      return NAME$5;
    }

    // Public
    getContent() {
      return Object.values(this._config.content).map(config => this._resolvePossibleFunction(config)).filter(Boolean);
    }
    hasContent() {
      return this.getContent().length > 0;
    }
    changeContent(content) {
      this._checkContent(content);
      this._config.content = {
        ...this._config.content,
        ...content
      };
      return this;
    }
    toHtml() {
      const templateWrapper = document.createElement('div');
      templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
      for (const [selector, text] of Object.entries(this._config.content)) {
        this._setContent(templateWrapper, text, selector);
      }
      const template = templateWrapper.children[0];
      const extraClass = this._resolvePossibleFunction(this._config.extraClass);
      if (extraClass) {
        template.classList.add(...extraClass.split(' '));
      }
      return template;
    }

    // Private
    _typeCheckConfig(config) {
      super._typeCheckConfig(config);
      this._checkContent(config.content);
    }
    _checkContent(arg) {
      for (const [selector, content] of Object.entries(arg)) {
        super._typeCheckConfig({
          selector,
          entry: content
        }, DefaultContentType);
      }
    }
    _setContent(template, content, selector) {
      const templateElement = SelectorEngine.findOne(selector, template);
      if (!templateElement) {
        return;
      }
      content = this._resolvePossibleFunction(content);
      if (!content) {
        templateElement.remove();
        return;
      }
      if (isElement$1(content)) {
        this._putElementInTemplate(getElement(content), templateElement);
        return;
      }
      if (this._config.html) {
        templateElement.innerHTML = this._maybeSanitize(content);
        return;
      }
      templateElement.textContent = content;
    }
    _maybeSanitize(arg) {
      return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
    }
    _resolvePossibleFunction(arg) {
      return execute(arg, [undefined, this]);
    }
    _putElementInTemplate(element, templateElement) {
      if (this._config.html) {
        templateElement.innerHTML = '';
        templateElement.append(element);
        return;
      }
      templateElement.textContent = element.textContent;
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$4 = 'tooltip';
  const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
  const CLASS_NAME_FADE$2 = 'fade';
  const CLASS_NAME_MODAL = 'modal';
  const CLASS_NAME_SHOW$2 = 'show';
  const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
  const EVENT_MODAL_HIDE = 'hide.bs.modal';
  const TRIGGER_HOVER = 'hover';
  const TRIGGER_FOCUS = 'focus';
  const TRIGGER_CLICK = 'click';
  const TRIGGER_MANUAL = 'manual';
  const EVENT_HIDE$2 = 'hide';
  const EVENT_HIDDEN$2 = 'hidden';
  const EVENT_SHOW$2 = 'show';
  const EVENT_SHOWN$2 = 'shown';
  const EVENT_INSERTED = 'inserted';
  const EVENT_CLICK$1 = 'click';
  const EVENT_FOCUSIN$1 = 'focusin';
  const EVENT_FOCUSOUT$1 = 'focusout';
  const EVENT_MOUSEENTER = 'mouseenter';
  const EVENT_MOUSELEAVE = 'mouseleave';
  const AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: isRTL() ? 'left' : 'right',
    BOTTOM: 'bottom',
    LEFT: isRTL() ? 'right' : 'left'
  };
  const Default$3 = {
    allowList: DefaultAllowlist,
    animation: true,
    boundary: 'clippingParents',
    container: false,
    customClass: '',
    delay: 0,
    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
    html: false,
    offset: [0, 6],
    placement: 'top',
    popperConfig: null,
    sanitize: true,
    sanitizeFn: null,
    selector: false,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
    title: '',
    trigger: 'hover focus'
  };
  const DefaultType$3 = {
    allowList: 'object',
    animation: 'boolean',
    boundary: '(string|element)',
    container: '(string|element|boolean)',
    customClass: '(string|function)',
    delay: '(number|object)',
    fallbackPlacements: 'array',
    html: 'boolean',
    offset: '(array|string|function)',
    placement: '(string|function)',
    popperConfig: '(null|object|function)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    selector: '(string|boolean)',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string'
  };

  /**
   * Class definition
   */

  class Tooltip extends BaseComponent {
    constructor(element, config) {
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org/docs/v2/)');
      }
      super(element, config);

      // Private
      this._isEnabled = true;
      this._timeout = 0;
      this._isHovered = null;
      this._activeTrigger = {};
      this._popper = null;
      this._templateFactory = null;
      this._newContent = null;

      // Protected
      this.tip = null;
      this._setListeners();
      if (!this._config.selector) {
        this._fixTitle();
      }
    }

    // Getters
    static get Default() {
      return Default$3;
    }
    static get DefaultType() {
      return DefaultType$3;
    }
    static get NAME() {
      return NAME$4;
    }

    // Public
    enable() {
      this._isEnabled = true;
    }
    disable() {
      this._isEnabled = false;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle() {
      if (!this._isEnabled) {
        return;
      }
      if (this._isShown()) {
        this._leave();
        return;
      }
      this._enter();
    }
    dispose() {
      clearTimeout(this._timeout);
      EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
      if (this._element.getAttribute('data-bs-original-title')) {
        this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
      }
      this._disposePopper();
      super.dispose();
    }
    show() {
      if (this._element.style.display === 'none') {
        throw new Error('Please use show on visible elements');
      }
      if (!(this._isWithContent() && this._isEnabled)) {
        return;
      }
      const showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
      const shadowRoot = findShadowRoot(this._element);
      const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
      if (showEvent.defaultPrevented || !isInTheDom) {
        return;
      }

      // TODO: v6 remove this or make it optional
      this._disposePopper();
      const tip = this._getTipElement();
      this._element.setAttribute('aria-describedby', tip.getAttribute('id'));
      const {
        container
      } = this._config;
      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
        container.append(tip);
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
      }
      this._popper = this._createPopper(tip);
      tip.classList.add(CLASS_NAME_SHOW$2);

      // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.on(element, 'mouseover', noop);
        }
      }
      const complete = () => {
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOWN$2));
        if (this._isHovered === false) {
          this._leave();
        }
        this._isHovered = false;
      };
      this._queueCallback(complete, this.tip, this._isAnimated());
    }
    hide() {
      if (!this._isShown()) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2));
      if (hideEvent.defaultPrevented) {
        return;
      }
      const tip = this._getTipElement();
      tip.classList.remove(CLASS_NAME_SHOW$2);

      // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support
      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler.off(element, 'mouseover', noop);
        }
      }
      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;
      this._isHovered = null; // it is a trick to support manual triggering

      const complete = () => {
        if (this._isWithActiveTrigger()) {
          return;
        }
        if (!this._isHovered) {
          this._disposePopper();
        }
        this._element.removeAttribute('aria-describedby');
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN$2));
      };
      this._queueCallback(complete, this.tip, this._isAnimated());
    }
    update() {
      if (this._popper) {
        this._popper.update();
      }
    }

    // Protected
    _isWithContent() {
      return Boolean(this._getTitle());
    }
    _getTipElement() {
      if (!this.tip) {
        this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
      }
      return this.tip;
    }
    _createTipElement(content) {
      const tip = this._getTemplateFactory(content).toHtml();

      // TODO: remove this check in v6
      if (!tip) {
        return null;
      }
      tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
      // TODO: v6 the following can be achieved with CSS only
      tip.classList.add(`bs-${this.constructor.NAME}-auto`);
      const tipId = getUID(this.constructor.NAME).toString();
      tip.setAttribute('id', tipId);
      if (this._isAnimated()) {
        tip.classList.add(CLASS_NAME_FADE$2);
      }
      return tip;
    }
    setContent(content) {
      this._newContent = content;
      if (this._isShown()) {
        this._disposePopper();
        this.show();
      }
    }
    _getTemplateFactory(content) {
      if (this._templateFactory) {
        this._templateFactory.changeContent(content);
      } else {
        this._templateFactory = new TemplateFactory({
          ...this._config,
          // the `content` var has to be after `this._config`
          // to override config.content in case of popover
          content,
          extraClass: this._resolvePossibleFunction(this._config.customClass)
        });
      }
      return this._templateFactory;
    }
    _getContentForTemplate() {
      return {
        [SELECTOR_TOOLTIP_INNER]: this._getTitle()
      };
    }
    _getTitle() {
      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
    }

    // Private
    _initializeOnDelegatedTarget(event) {
      return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
    }
    _isAnimated() {
      return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2);
    }
    _isShown() {
      return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
    }
    _createPopper(tip) {
      const placement = execute(this._config.placement, [this, tip, this._element]);
      const attachment = AttachmentMap[placement.toUpperCase()];
      return createPopper(this._element, tip, this._getPopperConfig(attachment));
    }
    _getOffset() {
      const {
        offset
      } = this._config;
      if (typeof offset === 'string') {
        return offset.split(',').map(value => Number.parseInt(value, 10));
      }
      if (typeof offset === 'function') {
        return popperData => offset(popperData, this._element);
      }
      return offset;
    }
    _resolvePossibleFunction(arg) {
      return execute(arg, [this._element, this._element]);
    }
    _getPopperConfig(attachment) {
      const defaultBsPopperConfig = {
        placement: attachment,
        modifiers: [{
          name: 'flip',
          options: {
            fallbackPlacements: this._config.fallbackPlacements
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }, {
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'arrow',
          options: {
            element: `.${this.constructor.NAME}-arrow`
          }
        }, {
          name: 'preSetPlacement',
          enabled: true,
          phase: 'beforeMain',
          fn: data => {
            // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
            // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
            this._getTipElement().setAttribute('data-popper-placement', data.state.placement);
          }
        }]
      };
      return {
        ...defaultBsPopperConfig,
        ...execute(this._config.popperConfig, [undefined, defaultBsPopperConfig])
      };
    }
    _setListeners() {
      const triggers = this._config.trigger.split(' ');
      for (const trigger of triggers) {
        if (trigger === 'click') {
          EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);
            context._activeTrigger[TRIGGER_CLICK] = !(context._isShown() && context._activeTrigger[TRIGGER_CLICK]);
            context.toggle();
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
          EventHandler.on(this._element, eventIn, this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);
            context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
            context._enter();
          });
          EventHandler.on(this._element, eventOut, this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);
            context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
            context._leave();
          });
        }
      }
      this._hideModalHandler = () => {
        if (this._element) {
          this.hide();
        }
      };
      EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    }
    _fixTitle() {
      const title = this._element.getAttribute('title');
      if (!title) {
        return;
      }
      if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
        this._element.setAttribute('aria-label', title);
      }
      this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility
      this._element.removeAttribute('title');
    }
    _enter() {
      if (this._isShown() || this._isHovered) {
        this._isHovered = true;
        return;
      }
      this._isHovered = true;
      this._setTimeout(() => {
        if (this._isHovered) {
          this.show();
        }
      }, this._config.delay.show);
    }
    _leave() {
      if (this._isWithActiveTrigger()) {
        return;
      }
      this._isHovered = false;
      this._setTimeout(() => {
        if (!this._isHovered) {
          this.hide();
        }
      }, this._config.delay.hide);
    }
    _setTimeout(handler, timeout) {
      clearTimeout(this._timeout);
      this._timeout = setTimeout(handler, timeout);
    }
    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(true);
    }
    _getConfig(config) {
      const dataAttributes = Manipulator.getDataAttributes(this._element);
      for (const dataAttribute of Object.keys(dataAttributes)) {
        if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
          delete dataAttributes[dataAttribute];
        }
      }
      config = {
        ...dataAttributes,
        ...(typeof config === 'object' && config ? config : {})
      };
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    _configAfterMerge(config) {
      config.container = config.container === false ? document.body : getElement(config.container);
      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }
      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }
      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }
      return config;
    }
    _getDelegateConfig() {
      const config = {};
      for (const [key, value] of Object.entries(this._config)) {
        if (this.constructor.Default[key] !== value) {
          config[key] = value;
        }
      }
      config.selector = false;
      config.trigger = 'manual';

      // In the future can be replaced with:
      // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
      // `Object.fromEntries(keysWithDifferentValues)`
      return config;
    }
    _disposePopper() {
      if (this._popper) {
        this._popper.destroy();
        this._popper = null;
      }
      if (this.tip) {
        this.tip.remove();
        this.tip = null;
      }
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Tooltip.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }

  /**
   * jQuery
   */

  defineJQueryPlugin(Tooltip);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$3 = 'popover';
  const SELECTOR_TITLE = '.popover-header';
  const SELECTOR_CONTENT = '.popover-body';
  const Default$2 = {
    ...Tooltip.Default,
    content: '',
    offset: [0, 8],
    placement: 'right',
    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
    trigger: 'click'
  };
  const DefaultType$2 = {
    ...Tooltip.DefaultType,
    content: '(null|string|element|function)'
  };

  /**
   * Class definition
   */

  class Popover extends Tooltip {
    // Getters
    static get Default() {
      return Default$2;
    }
    static get DefaultType() {
      return DefaultType$2;
    }
    static get NAME() {
      return NAME$3;
    }

    // Overrides
    _isWithContent() {
      return this._getTitle() || this._getContent();
    }

    // Private
    _getContentForTemplate() {
      return {
        [SELECTOR_TITLE]: this._getTitle(),
        [SELECTOR_CONTENT]: this._getContent()
      };
    }
    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Popover.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }

  /**
   * jQuery
   */

  defineJQueryPlugin(Popover);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$2 = 'scrollspy';
  const DATA_KEY$2 = 'bs.scrollspy';
  const EVENT_KEY$2 = `.${DATA_KEY$2}`;
  const DATA_API_KEY = '.data-api';
  const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
  const EVENT_CLICK = `click${EVENT_KEY$2}`;
  const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$2}${DATA_API_KEY}`;
  const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  const CLASS_NAME_ACTIVE$1 = 'active';
  const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
  const SELECTOR_TARGET_LINKS = '[href]';
  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  const SELECTOR_NAV_LINKS = '.nav-link';
  const SELECTOR_NAV_ITEMS = '.nav-item';
  const SELECTOR_LIST_ITEMS = '.list-group-item';
  const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
  const SELECTOR_DROPDOWN = '.dropdown';
  const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
  const Default$1 = {
    offset: null,
    // TODO: v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: '0px 0px -25%',
    smoothScroll: false,
    target: null,
    threshold: [0.1, 0.5, 1]
  };
  const DefaultType$1 = {
    offset: '(number|null)',
    // TODO v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: 'string',
    smoothScroll: 'boolean',
    target: 'element',
    threshold: 'array'
  };

  /**
   * Class definition
   */

  class ScrollSpy extends BaseComponent {
    constructor(element, config) {
      super(element, config);

      // this._element is the observablesContainer and config.target the menu links wrapper
      this._targetLinks = new Map();
      this._observableSections = new Map();
      this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element;
      this._activeTarget = null;
      this._observer = null;
      this._previousScrollData = {
        visibleEntryTop: 0,
        parentScrollTop: 0
      };
      this.refresh(); // initialize
    }

    // Getters
    static get Default() {
      return Default$1;
    }
    static get DefaultType() {
      return DefaultType$1;
    }
    static get NAME() {
      return NAME$2;
    }

    // Public
    refresh() {
      this._initializeTargetsAndObservables();
      this._maybeEnableSmoothScroll();
      if (this._observer) {
        this._observer.disconnect();
      } else {
        this._observer = this._getNewObserver();
      }
      for (const section of this._observableSections.values()) {
        this._observer.observe(section);
      }
    }
    dispose() {
      this._observer.disconnect();
      super.dispose();
    }

    // Private
    _configAfterMerge(config) {
      // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
      config.target = getElement(config.target) || document.body;

      // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only
      config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
      if (typeof config.threshold === 'string') {
        config.threshold = config.threshold.split(',').map(value => Number.parseFloat(value));
      }
      return config;
    }
    _maybeEnableSmoothScroll() {
      if (!this._config.smoothScroll) {
        return;
      }

      // unregister any previous listeners
      EventHandler.off(this._config.target, EVENT_CLICK);
      EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, event => {
        const observableSection = this._observableSections.get(event.target.hash);
        if (observableSection) {
          event.preventDefault();
          const root = this._rootElement || window;
          const height = observableSection.offsetTop - this._element.offsetTop;
          if (root.scrollTo) {
            root.scrollTo({
              top: height,
              behavior: 'smooth'
            });
            return;
          }

          // Chrome 60 doesn't support `scrollTo`
          root.scrollTop = height;
        }
      });
    }
    _getNewObserver() {
      const options = {
        root: this._rootElement,
        threshold: this._config.threshold,
        rootMargin: this._config.rootMargin
      };
      return new IntersectionObserver(entries => this._observerCallback(entries), options);
    }

    // The logic of selection
    _observerCallback(entries) {
      const targetElement = entry => this._targetLinks.get(`#${entry.target.id}`);
      const activate = entry => {
        this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
        this._process(targetElement(entry));
      };
      const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
      const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = parentScrollTop;
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          this._activeTarget = null;
          this._clearActiveClass(targetElement(entry));
          continue;
        }
        const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
        // if we are scrolling down, pick the bigger offsetTop
        if (userScrollsDown && entryIsLowerThanPrevious) {
          activate(entry);
          // if parent isn't scrolled, let's keep the first visible item, breaking the iteration
          if (!parentScrollTop) {
            return;
          }
          continue;
        }

        // if we are scrolling up, pick the smallest offsetTop
        if (!userScrollsDown && !entryIsLowerThanPrevious) {
          activate(entry);
        }
      }
    }
    _initializeTargetsAndObservables() {
      this._targetLinks = new Map();
      this._observableSections = new Map();
      const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);
      for (const anchor of targetLinks) {
        // ensure that the anchor has an id and is not disabled
        if (!anchor.hash || isDisabled(anchor)) {
          continue;
        }
        const observableSection = SelectorEngine.findOne(decodeURI(anchor.hash), this._element);

        // ensure that the observableSection exists & is visible
        if (isVisible(observableSection)) {
          this._targetLinks.set(decodeURI(anchor.hash), anchor);
          this._observableSections.set(anchor.hash, observableSection);
        }
      }
    }
    _process(target) {
      if (this._activeTarget === target) {
        return;
      }
      this._clearActiveClass(this._config.target);
      this._activeTarget = target;
      target.classList.add(CLASS_NAME_ACTIVE$1);
      this._activateParents(target);
      EventHandler.trigger(this._element, EVENT_ACTIVATE, {
        relatedTarget: target
      });
    }
    _activateParents(target) {
      // Activate dropdown parents
      if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
        SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
        return;
      }
      for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) {
        // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
        for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) {
          item.classList.add(CLASS_NAME_ACTIVE$1);
        }
      }
    }
    _clearActiveClass(parent) {
      parent.classList.remove(CLASS_NAME_ACTIVE$1);
      const activeNodes = SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE$1}`, parent);
      for (const node of activeNodes) {
        node.classList.remove(CLASS_NAME_ACTIVE$1);
      }
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = ScrollSpy.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => {
    for (const spy of SelectorEngine.find(SELECTOR_DATA_SPY)) {
      ScrollSpy.getOrCreateInstance(spy);
    }
  });

  /**
   * jQuery
   */

  defineJQueryPlugin(ScrollSpy);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME$1 = 'tab';
  const DATA_KEY$1 = 'bs.tab';
  const EVENT_KEY$1 = `.${DATA_KEY$1}`;
  const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
  const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
  const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
  const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
  const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}`;
  const EVENT_KEYDOWN = `keydown${EVENT_KEY$1}`;
  const EVENT_LOAD_DATA_API = `load${EVENT_KEY$1}`;
  const ARROW_LEFT_KEY = 'ArrowLeft';
  const ARROW_RIGHT_KEY = 'ArrowRight';
  const ARROW_UP_KEY = 'ArrowUp';
  const ARROW_DOWN_KEY = 'ArrowDown';
  const HOME_KEY = 'Home';
  const END_KEY = 'End';
  const CLASS_NAME_ACTIVE = 'active';
  const CLASS_NAME_FADE$1 = 'fade';
  const CLASS_NAME_SHOW$1 = 'show';
  const CLASS_DROPDOWN = 'dropdown';
  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  const SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
  const NOT_SELECTOR_DROPDOWN_TOGGLE = `:not(${SELECTOR_DROPDOWN_TOGGLE})`;
  const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
  const SELECTOR_OUTER = '.nav-item, .list-group-item';
  const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // TODO: could only be `tab` in v6
  const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
  const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;

  /**
   * Class definition
   */

  class Tab extends BaseComponent {
    constructor(element) {
      super(element);
      this._parent = this._element.closest(SELECTOR_TAB_PANEL);
      if (!this._parent) {
        return;
        // TODO: should throw exception in v6
        // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
      }

      // Set up initial aria attributes
      this._setInitialAttributes(this._parent, this._getChildren());
      EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
    }

    // Getters
    static get NAME() {
      return NAME$1;
    }

    // Public
    show() {
      // Shows this elem and deactivate the active sibling if exists
      const innerElem = this._element;
      if (this._elemIsActive(innerElem)) {
        return;
      }

      // Search for active tab on same parent to deactivate it
      const active = this._getActiveElem();
      const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, {
        relatedTarget: innerElem
      }) : null;
      const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
        relatedTarget: active
      });
      if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
        return;
      }
      this._deactivate(active, innerElem);
      this._activate(innerElem, active);
    }

    // Private
    _activate(element, relatedElem) {
      if (!element) {
        return;
      }
      element.classList.add(CLASS_NAME_ACTIVE);
      this._activate(SelectorEngine.getElementFromSelector(element)); // Search and activate/show the proper section

      const complete = () => {
        if (element.getAttribute('role') !== 'tab') {
          element.classList.add(CLASS_NAME_SHOW$1);
          return;
        }
        element.removeAttribute('tabindex');
        element.setAttribute('aria-selected', true);
        this._toggleDropDown(element, true);
        EventHandler.trigger(element, EVENT_SHOWN$1, {
          relatedTarget: relatedElem
        });
      };
      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }
    _deactivate(element, relatedElem) {
      if (!element) {
        return;
      }
      element.classList.remove(CLASS_NAME_ACTIVE);
      element.blur();
      this._deactivate(SelectorEngine.getElementFromSelector(element)); // Search and deactivate the shown section too

      const complete = () => {
        if (element.getAttribute('role') !== 'tab') {
          element.classList.remove(CLASS_NAME_SHOW$1);
          return;
        }
        element.setAttribute('aria-selected', false);
        element.setAttribute('tabindex', '-1');
        this._toggleDropDown(element, false);
        EventHandler.trigger(element, EVENT_HIDDEN$1, {
          relatedTarget: relatedElem
        });
      };
      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }
    _keydown(event) {
      if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY, HOME_KEY, END_KEY].includes(event.key)) {
        return;
      }
      event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page
      event.preventDefault();
      const children = this._getChildren().filter(element => !isDisabled(element));
      let nextActiveElement;
      if ([HOME_KEY, END_KEY].includes(event.key)) {
        nextActiveElement = children[event.key === HOME_KEY ? 0 : children.length - 1];
      } else {
        const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
        nextActiveElement = getNextActiveElement(children, event.target, isNext, true);
      }
      if (nextActiveElement) {
        nextActiveElement.focus({
          preventScroll: true
        });
        Tab.getOrCreateInstance(nextActiveElement).show();
      }
    }
    _getChildren() {
      // collection of inner elements
      return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
    }
    _getActiveElem() {
      return this._getChildren().find(child => this._elemIsActive(child)) || null;
    }
    _setInitialAttributes(parent, children) {
      this._setAttributeIfNotExists(parent, 'role', 'tablist');
      for (const child of children) {
        this._setInitialAttributesOnChild(child);
      }
    }
    _setInitialAttributesOnChild(child) {
      child = this._getInnerElement(child);
      const isActive = this._elemIsActive(child);
      const outerElem = this._getOuterElement(child);
      child.setAttribute('aria-selected', isActive);
      if (outerElem !== child) {
        this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
      }
      if (!isActive) {
        child.setAttribute('tabindex', '-1');
      }
      this._setAttributeIfNotExists(child, 'role', 'tab');

      // set attributes to the related panel too
      this._setInitialAttributesOnTargetPanel(child);
    }
    _setInitialAttributesOnTargetPanel(child) {
      const target = SelectorEngine.getElementFromSelector(child);
      if (!target) {
        return;
      }
      this._setAttributeIfNotExists(target, 'role', 'tabpanel');
      if (child.id) {
        this._setAttributeIfNotExists(target, 'aria-labelledby', `${child.id}`);
      }
    }
    _toggleDropDown(element, open) {
      const outerElem = this._getOuterElement(element);
      if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
        return;
      }
      const toggle = (selector, className) => {
        const element = SelectorEngine.findOne(selector, outerElem);
        if (element) {
          element.classList.toggle(className, open);
        }
      };
      toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
      toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
      outerElem.setAttribute('aria-expanded', open);
    }
    _setAttributeIfNotExists(element, attribute, value) {
      if (!element.hasAttribute(attribute)) {
        element.setAttribute(attribute, value);
      }
    }
    _elemIsActive(elem) {
      return elem.classList.contains(CLASS_NAME_ACTIVE);
    }

    // Try to get the inner element (usually the .nav-link)
    _getInnerElement(elem) {
      return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
    }

    // Try to get the outer element (usually the .nav-item)
    _getOuterElement(elem) {
      return elem.closest(SELECTOR_OUTER) || elem;
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Tab.getOrCreateInstance(this);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    Tab.getOrCreateInstance(this).show();
  });

  /**
   * Initialize on focus
   */
  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
      Tab.getOrCreateInstance(element);
    }
  });
  /**
   * jQuery
   */

  defineJQueryPlugin(Tab);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap toast.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME = 'toast';
  const DATA_KEY = 'bs.toast';
  const EVENT_KEY = `.${DATA_KEY}`;
  const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
  const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
  const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
  const EVENT_HIDE = `hide${EVENT_KEY}`;
  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  const EVENT_SHOW = `show${EVENT_KEY}`;
  const EVENT_SHOWN = `shown${EVENT_KEY}`;
  const CLASS_NAME_FADE = 'fade';
  const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility
  const CLASS_NAME_SHOW = 'show';
  const CLASS_NAME_SHOWING = 'showing';
  const DefaultType = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  const Default = {
    animation: true,
    autohide: true,
    delay: 5000
  };

  /**
   * Class definition
   */

  class Toast extends BaseComponent {
    constructor(element, config) {
      super(element, config);
      this._timeout = null;
      this._hasMouseInteraction = false;
      this._hasKeyboardInteraction = false;
      this._setListeners();
    }

    // Getters
    static get Default() {
      return Default;
    }
    static get DefaultType() {
      return DefaultType;
    }
    static get NAME() {
      return NAME;
    }

    // Public
    show() {
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
      if (showEvent.defaultPrevented) {
        return;
      }
      this._clearTimeout();
      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE);
      }
      const complete = () => {
        this._element.classList.remove(CLASS_NAME_SHOWING);
        EventHandler.trigger(this._element, EVENT_SHOWN);
        this._maybeScheduleHide();
      };
      this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
      this._queueCallback(complete, this._element, this._config.animation);
    }
    hide() {
      if (!this.isShown()) {
        return;
      }
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
      if (hideEvent.defaultPrevented) {
        return;
      }
      const complete = () => {
        this._element.classList.add(CLASS_NAME_HIDE); // @deprecated
        this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
        EventHandler.trigger(this._element, EVENT_HIDDEN);
      };
      this._element.classList.add(CLASS_NAME_SHOWING);
      this._queueCallback(complete, this._element, this._config.animation);
    }
    dispose() {
      this._clearTimeout();
      if (this.isShown()) {
        this._element.classList.remove(CLASS_NAME_SHOW);
      }
      super.dispose();
    }
    isShown() {
      return this._element.classList.contains(CLASS_NAME_SHOW);
    }

    // Private
    _maybeScheduleHide() {
      if (!this._config.autohide) {
        return;
      }
      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
        return;
      }
      this._timeout = setTimeout(() => {
        this.hide();
      }, this._config.delay);
    }
    _onInteraction(event, isInteracting) {
      switch (event.type) {
        case 'mouseover':
        case 'mouseout':
          {
            this._hasMouseInteraction = isInteracting;
            break;
          }
        case 'focusin':
        case 'focusout':
          {
            this._hasKeyboardInteraction = isInteracting;
            break;
          }
      }
      if (isInteracting) {
        this._clearTimeout();
        return;
      }
      const nextElement = event.relatedTarget;
      if (this._element === nextElement || this._element.contains(nextElement)) {
        return;
      }
      this._maybeScheduleHide();
    }
    _setListeners() {
      EventHandler.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
      EventHandler.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
    }
    _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Toast.getOrCreateInstance(this, config);
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config](this);
        }
      });
    }
  }

  /**
   * Data API implementation
   */

  enableDismissTrigger(Toast);

  /**
   * jQuery
   */

  defineJQueryPlugin(Toast);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap index.umd.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const index_umd = {
    Alert,
    Button,
    Carousel,
    Collapse,
    Dropdown,
    Modal,
    Offcanvas,
    Popover,
    ScrollSpy,
    Tab,
    Toast,
    Tooltip
  };

  return index_umd;

}));
//# sourceMappingURL=bootstrap.bundle.js.map

;
/**!
 * FlexSearch.js v0.8.214 (Bundle)
 * Author and Copyright: Thomas Wilkerling
 * Licence: Apache-2.0
 * Hosted by Nextapps GmbH
 * https://github.com/nextapps-de/flexsearch
 */
(function _f(self){'use strict';if(typeof module!=='undefined')self=module;else if(typeof process !== 'undefined')self=process;self._factory=_f;var w;function H(a,c,b){const e=typeof b,d=typeof a;if(e!=="undefined"){if(d!=="undefined"){if(b){if(d==="function"&&e===d)return function(k){return a(b(k))};c=a.constructor;if(c===b.constructor){if(c===Array)return b.concat(a);if(c===Map){var f=new Map(b);for(var g of a)f.set(g[0],g[1]);return f}if(c===Set){g=new Set(b);for(f of a.values())g.add(f);return g}}}return a}return b}return d==="undefined"?c:a}function aa(a,c){return typeof a==="undefined"?c:a}function I(){return Object.create(null)}
function M(a){return typeof a==="string"}function ba(a){return typeof a==="object"}function ca(a,c){if(M(c))a=a[c];else for(let b=0;a&&b<c.length;b++)a=a[c[b]];return a};const ea=/[^\p{L}\p{N}]+/u,fa=/(\d{3})/g,ha=/(\D)(\d{3})/g,ia=/(\d{3})(\D)/g,ja=/[\u0300-\u036f]/g;function ka(a={}){if(!this||this.constructor!==ka)return new ka(...arguments);if(arguments.length)for(a=0;a<arguments.length;a++)this.assign(arguments[a]);else this.assign(a)}w=ka.prototype;
w.assign=function(a){this.normalize=H(a.normalize,!0,this.normalize);let c=a.include,b=c||a.exclude||a.split,e;if(b||b===""){if(typeof b==="object"&&b.constructor!==RegExp){let d="";e=!c;c||(d+="\\p{Z}");b.letter&&(d+="\\p{L}");b.number&&(d+="\\p{N}",e=!!c);b.symbol&&(d+="\\p{S}");b.punctuation&&(d+="\\p{P}");b.control&&(d+="\\p{C}");if(b=b.char)d+=typeof b==="object"?b.join(""):b;try{this.split=new RegExp("["+(c?"^":"")+d+"]+","u")}catch(f){this.split=/\s+/}}else this.split=b,e=b===!1||"a1a".split(b).length<
2;this.numeric=H(a.numeric,e)}else{try{this.split=H(this.split,ea)}catch(d){this.split=/\s+/}this.numeric=H(a.numeric,H(this.numeric,!0))}this.prepare=H(a.prepare,null,this.prepare);this.finalize=H(a.finalize,null,this.finalize);b=a.filter;this.filter=typeof b==="function"?b:H(b&&new Set(b),null,this.filter);this.dedupe=H(a.dedupe,!0,this.dedupe);this.matcher=H((b=a.matcher)&&new Map(b),null,this.matcher);this.mapper=H((b=a.mapper)&&new Map(b),null,this.mapper);this.stemmer=H((b=a.stemmer)&&new Map(b),
null,this.stemmer);this.replacer=H(a.replacer,null,this.replacer);this.minlength=H(a.minlength,1,this.minlength);this.maxlength=H(a.maxlength,1024,this.maxlength);this.rtl=H(a.rtl,!1,this.rtl);if(this.cache=b=H(a.cache,!0,this.cache))this.F=null,this.L=typeof b==="number"?b:2E5,this.B=new Map,this.D=new Map,this.I=this.H=128;this.h="";this.J=null;this.A="";this.K=null;if(this.matcher)for(const d of this.matcher.keys())this.h+=(this.h?"|":"")+d;if(this.stemmer)for(const d of this.stemmer.keys())this.A+=
(this.A?"|":"")+d;return this};w.addStemmer=function(a,c){this.stemmer||(this.stemmer=new Map);this.stemmer.set(a,c);this.A+=(this.A?"|":"")+a;this.K=null;this.cache&&Q(this);return this};w.addFilter=function(a){typeof a==="function"?this.filter=a:(this.filter||(this.filter=new Set),this.filter.add(a));this.cache&&Q(this);return this};
w.addMapper=function(a,c){if(typeof a==="object")return this.addReplacer(a,c);if(a.length>1)return this.addMatcher(a,c);this.mapper||(this.mapper=new Map);this.mapper.set(a,c);this.cache&&Q(this);return this};w.addMatcher=function(a,c){if(typeof a==="object")return this.addReplacer(a,c);if(a.length<2&&(this.dedupe||this.mapper))return this.addMapper(a,c);this.matcher||(this.matcher=new Map);this.matcher.set(a,c);this.h+=(this.h?"|":"")+a;this.J=null;this.cache&&Q(this);return this};
w.addReplacer=function(a,c){if(typeof a==="string")return this.addMatcher(a,c);this.replacer||(this.replacer=[]);this.replacer.push(a,c);this.cache&&Q(this);return this};
w.encode=function(a,c){if(this.cache&&a.length<=this.H)if(this.F){if(this.B.has(a))return this.B.get(a)}else this.F=setTimeout(Q,50,this);this.normalize&&(typeof this.normalize==="function"?a=this.normalize(a):a=ja?a.normalize("NFKD").replace(ja,"").toLowerCase():a.toLowerCase());this.prepare&&(a=this.prepare(a));this.numeric&&a.length>3&&(a=a.replace(ha,"$1 $2").replace(ia,"$1 $2").replace(fa,"$1 "));const b=!(this.dedupe||this.mapper||this.filter||this.matcher||this.stemmer||this.replacer);let e=
[],d=I(),f,g,k=this.split||this.split===""?a.split(this.split):[a];for(let l=0,m,p;l<k.length;l++)if((m=p=k[l])&&!(m.length<this.minlength||m.length>this.maxlength)){if(c){if(d[m])continue;d[m]=1}else{if(f===m)continue;f=m}if(b)e.push(m);else if(!this.filter||(typeof this.filter==="function"?this.filter(m):!this.filter.has(m))){if(this.cache&&m.length<=this.I)if(this.F){var h=this.D.get(m);if(h||h===""){h&&e.push(h);continue}}else this.F=setTimeout(Q,50,this);if(this.stemmer){this.K||(this.K=new RegExp("(?!^)("+
this.A+")$"));let u;for(;u!==m&&m.length>2;)u=m,m=m.replace(this.K,r=>this.stemmer.get(r))}if(m&&(this.mapper||this.dedupe&&m.length>1)){h="";for(let u=0,r="",t,n;u<m.length;u++)t=m.charAt(u),t===r&&this.dedupe||((n=this.mapper&&this.mapper.get(t))||n===""?n===r&&this.dedupe||!(r=n)||(h+=n):h+=r=t);m=h}this.matcher&&m.length>1&&(this.J||(this.J=new RegExp("("+this.h+")","g")),m=m.replace(this.J,u=>this.matcher.get(u)));if(m&&this.replacer)for(h=0;m&&h<this.replacer.length;h+=2)m=m.replace(this.replacer[h],
this.replacer[h+1]);this.cache&&p.length<=this.I&&(this.D.set(p,m),this.D.size>this.L&&(this.D.clear(),this.I=this.I/1.1|0));if(m){if(m!==p)if(c){if(d[m])continue;d[m]=1}else{if(g===m)continue;g=m}e.push(m)}}}this.finalize&&(e=this.finalize(e)||e);this.cache&&a.length<=this.H&&(this.B.set(a,e),this.B.size>this.L&&(this.B.clear(),this.H=this.H/1.1|0));return e};function Q(a){a.F=null;a.B.clear();a.D.clear()};function la(a,c,b){b||(c||typeof a!=="object"?typeof c==="object"&&(b=c,c=0):b=a);b&&(a=b.query||a,c=b.limit||c);let e=""+(c||0);b&&(e+=(b.offset||0)+!!b.context+!!b.suggest+(b.resolve!==!1)+(b.resolution||this.resolution)+(b.boost||0));a=(""+a).toLowerCase();this.cache||(this.cache=new ma);let d=this.cache.get(a+e);if(!d){const f=b&&b.cache;f&&(b.cache=!1);d=this.search(a,c,b);f&&(b.cache=f);this.cache.set(a+e,d)}return d}function ma(a){this.limit=a&&a!==!0?a:1E3;this.cache=new Map;this.h=""}
ma.prototype.set=function(a,c){this.cache.set(this.h=a,c);this.cache.size>this.limit&&this.cache.delete(this.cache.keys().next().value)};ma.prototype.get=function(a){const c=this.cache.get(a);c&&this.h!==a&&(this.cache.delete(a),this.cache.set(this.h=a,c));return c};ma.prototype.remove=function(a){for(const c of this.cache){const b=c[0];c[1].includes(a)&&this.cache.delete(b)}};ma.prototype.clear=function(){this.cache.clear();this.h=""};const na={normalize:!1,numeric:!1,dedupe:!1};const oa={};const ra=new Map([["b","p"],["v","f"],["w","f"],["z","s"],["x","s"],["d","t"],["n","m"],["c","k"],["g","k"],["j","k"],["q","k"],["i","e"],["y","e"],["u","o"]]);const sa=new Map([["ae","a"],["oe","o"],["sh","s"],["kh","k"],["th","t"],["ph","f"],["pf","f"]]),ta=[/([^aeo])h(.)/g,"$1$2",/([aeo])h([^aeo]|$)/g,"$1$2",/(.)\1+/g,"$1"];const ua={a:"",e:"",i:"",o:"",u:"",y:"",b:1,f:1,p:1,v:1,c:2,g:2,j:2,k:2,q:2,s:2,x:2,z:2,"\u00df":2,d:3,t:3,l:4,m:5,n:5,r:6};var va={Exact:na,Default:oa,Normalize:oa,LatinBalance:{mapper:ra},LatinAdvanced:{mapper:ra,matcher:sa,replacer:ta},LatinExtra:{mapper:ra,replacer:ta.concat([/(?!^)[aeo]/g,""]),matcher:sa},LatinSoundex:{dedupe:!1,include:{letter:!0},finalize:function(a){for(let b=0;b<a.length;b++){var c=a[b];let e=c.charAt(0),d=ua[e];for(let f=1,g;f<c.length&&(g=c.charAt(f),g==="h"||g==="w"||!(g=ua[g])||g===d||(e+=g,d=g,e.length!==4));f++);a[b]=e}}},CJK:{split:""},LatinExact:na,LatinDefault:oa,LatinSimple:oa};function wa(a,c,b,e){let d=[];for(let f=0,g;f<a.index.length;f++)if(g=a.index[f],c>=g.length)c-=g.length;else{c=g[e?"splice":"slice"](c,b);const k=c.length;if(k&&(d=d.length?d.concat(c):c,b-=k,e&&(a.length-=k),!b))break;c=0}return d}
function xa(a){if(!this||this.constructor!==xa)return new xa(a);this.index=a?[a]:[];this.length=a?a.length:0;const c=this;return new Proxy([],{get(b,e){if(e==="length")return c.length;if(e==="push")return function(d){c.index[c.index.length-1].push(d);c.length++};if(e==="pop")return function(){if(c.length)return c.length--,c.index[c.index.length-1].pop()};if(e==="indexOf")return function(d){let f=0;for(let g=0,k,h;g<c.index.length;g++){k=c.index[g];h=k.indexOf(d);if(h>=0)return f+h;f+=k.length}return-1};
if(e==="includes")return function(d){for(let f=0;f<c.index.length;f++)if(c.index[f].includes(d))return!0;return!1};if(e==="slice")return function(d,f){return wa(c,d||0,f||c.length,!1)};if(e==="splice")return function(d,f){return wa(c,d||0,f||c.length,!0)};if(e==="constructor")return Array;if(typeof e!=="symbol")return(b=c.index[e/2**31|0])&&b[e]},set(b,e,d){b=e/2**31|0;(c.index[b]||(c.index[b]=[]))[e]=d;c.length++;return!0}})}xa.prototype.clear=function(){this.index.length=0};xa.prototype.push=function(){};
function R(a=8){if(!this||this.constructor!==R)return new R(a);this.index=I();this.h=[];this.size=0;a>32?(this.B=Aa,this.A=BigInt(a)):(this.B=Ba,this.A=a)}R.prototype.get=function(a){const c=this.index[this.B(a)];return c&&c.get(a)};R.prototype.set=function(a,c){var b=this.B(a);let e=this.index[b];e?(b=e.size,e.set(a,c),(b-=e.size)&&this.size++):(this.index[b]=e=new Map([[a,c]]),this.h.push(e),this.size++)};
function S(a=8){if(!this||this.constructor!==S)return new S(a);this.index=I();this.h=[];this.size=0;a>32?(this.B=Aa,this.A=BigInt(a)):(this.B=Ba,this.A=a)}S.prototype.add=function(a){var c=this.B(a);let b=this.index[c];b?(c=b.size,b.add(a),(c-=b.size)&&this.size++):(this.index[c]=b=new Set([a]),this.h.push(b),this.size++)};w=R.prototype;w.has=S.prototype.has=function(a){const c=this.index[this.B(a)];return c&&c.has(a)};
w.delete=S.prototype.delete=function(a){const c=this.index[this.B(a)];c&&c.delete(a)&&this.size--};w.clear=S.prototype.clear=function(){this.index=I();this.h=[];this.size=0};w.values=S.prototype.values=function*(){for(let a=0;a<this.h.length;a++)for(let c of this.h[a].values())yield c};w.keys=S.prototype.keys=function*(){for(let a=0;a<this.h.length;a++)for(let c of this.h[a].keys())yield c};w.entries=S.prototype.entries=function*(){for(let a=0;a<this.h.length;a++)for(let c of this.h[a].entries())yield c};
function Ba(a){let c=2**this.A-1;if(typeof a=="number")return a&c;let b=0,e=this.A+1;for(let d=0;d<a.length;d++)b=(b*e^a.charCodeAt(d))&c;return this.A===32?b+2**31:b}function Aa(a){let c=BigInt(2)**this.A-BigInt(1);var b=typeof a;if(b==="bigint")return a&c;if(b==="number")return BigInt(a)&c;b=BigInt(0);let e=this.A+BigInt(1);for(let d=0;d<a.length;d++)b=(b*e^BigInt(a.charCodeAt(d)))&c;return b};let Ca,Da;
async function Ea(a){a=a.data;var c=a.task;const b=a.id;let e=a.args;switch(c){case "init":Da=a.options||{};(c=a.factory)?(Function("return "+c)()(self),Ca=new self.FlexSearch.Index(Da),delete self.FlexSearch):Ca=new T(Da);postMessage({id:b});break;default:let d;c==="export"&&(e[1]?(e[0]=Da.export,e[2]=0,e[3]=1):e=null);c==="import"?e[0]&&(a=await Da.import.call(Ca,e[0]),Ca.import(e[0],a)):((d=e&&Ca[c].apply(Ca,e))&&d.then&&(d=await d),d&&d.await&&(d=await d.await),c==="search"&&d.result&&(d=d.result));
postMessage(c==="search"?{id:b,msg:d}:{id:b})}};function Fa(a){Ga.call(a,"add");Ga.call(a,"append");Ga.call(a,"search");Ga.call(a,"update");Ga.call(a,"remove");Ga.call(a,"searchCache")}let Ha,Ia,Ja;function Ka(){Ha=Ja=0}
function Ga(a){this[a+"Async"]=function(){const c=arguments;var b=c[c.length-1];let e;typeof b==="function"&&(e=b,delete c[c.length-1]);Ha?Ja||(Ja=Date.now()-Ia>=this.priority*this.priority*3):(Ha=setTimeout(Ka,0),Ia=Date.now());if(Ja){const f=this;return new Promise(g=>{setTimeout(function(){g(f[a+"Async"].apply(f,c))},0)})}const d=this[a].apply(this,c);b=d.then?d:new Promise(f=>f(d));e&&b.then(e);return b}};let V=0;
function La(a={},c){function b(k){function h(l){l=l.data||l;const m=l.id,p=m&&f.h[m];p&&(p(l.msg),delete f.h[m])}this.worker=k;this.h=I();if(this.worker){d?this.worker.on("message",h):this.worker.onmessage=h;if(a.config)return new Promise(function(l){V>1E9&&(V=0);f.h[++V]=function(){l(f)};f.worker.postMessage({id:V,task:"init",factory:e,options:a})});this.priority=a.priority||4;this.encoder=c||null;this.worker.postMessage({task:"init",factory:e,options:a});return this}}if(!this||this.constructor!==La)return new La(a);
let e=typeof self!=="undefined"?self._factory:typeof window!=="undefined"?window._factory:null;e&&(e=e.toString());const d=typeof window==="undefined",f=this,g=Ma(e,d,a.worker);return g.then?g.then(function(k){return b.call(f,k)}):b.call(this,g)}W("add");W("append");W("search");W("update");W("remove");W("clear");W("export");W("import");La.prototype.searchCache=la;Fa(La.prototype);
function W(a){La.prototype[a]=function(){const c=this,b=[].slice.call(arguments);var e=b[b.length-1];let d;typeof e==="function"&&(d=e,b.pop());e=new Promise(function(f){a==="export"&&typeof b[0]==="function"&&(b[0]=null);V>1E9&&(V=0);c.h[++V]=f;c.worker.postMessage({task:a,id:V,args:b})});return d?(e.then(d),this):e}}
function Ma(a,c,b){return c?typeof module!=="undefined"?new(require("worker_threads")["Worker"])(__dirname+"/node/node.js"):import("worker_threads").then(function(worker){return new worker["Worker"]((1,eval)("import.meta.dirname")+"/node/node.mjs")}):a?new window.Worker(URL.createObjectURL(new Blob(["onmessage="+Ea.toString()],{type:"text/javascript"}))):new window.Worker(typeof b==="string"?b:(0,eval)("import.meta.url").replace("/worker.js","/worker/worker.js").replace("flexsearch.bundle.module.min.js",
"module/worker/worker.js").replace("flexsearch.bundle.module.min.mjs","module/worker/worker.js"),{type:"module"})};Na.prototype.add=function(a,c,b){ba(a)&&(c=a,a=ca(c,this.key));if(c&&(a||a===0)){if(!b&&this.reg.has(a))return this.update(a,c);for(let k=0,h;k<this.field.length;k++){h=this.B[k];var e=this.index.get(this.field[k]);if(typeof h==="function"){var d=h(c);d&&e.add(a,d,b,!0)}else if(d=h.G,!d||d(c))h.constructor===String?h=[""+h]:M(h)&&(h=[h]),Oa(c,h,this.D,0,e,a,h[0],b)}if(this.tag)for(e=0;e<this.A.length;e++){var f=this.A[e];d=this.tag.get(this.F[e]);let k=I();if(typeof f==="function"){if(f=f(c),!f)continue}else{var g=
f.G;if(g&&!g(c))continue;f.constructor===String&&(f=""+f);f=ca(c,f)}if(d&&f){M(f)&&(f=[f]);for(let h=0,l,m;h<f.length;h++)if(l=f[h],!k[l]&&(k[l]=1,(g=d.get(l))?m=g:d.set(l,m=[]),!b||!m.includes(a))){if(m.length===2**31-1){g=new xa(m);if(this.fastupdate)for(let p of this.reg.values())p.includes(m)&&(p[p.indexOf(m)]=g);d.set(l,m=g)}m.push(a);this.fastupdate&&((g=this.reg.get(a))?g.push(m):this.reg.set(a,[m]))}}}if(this.store&&(!b||!this.store.has(a))){let k;if(this.h){k=I();for(let h=0,l;h<this.h.length;h++){l=
this.h[h];if((b=l.G)&&!b(c))continue;let m;if(typeof l==="function"){m=l(c);if(!m)continue;l=[l.O]}else if(M(l)||l.constructor===String){k[l]=c[l];continue}Ra(c,k,l,0,l[0],m)}}this.store.set(a,k||c)}this.worker&&(this.fastupdate||this.reg.add(a))}return this};function Ra(a,c,b,e,d,f){a=a[d];if(e===b.length-1)c[d]=f||a;else if(a)if(a.constructor===Array)for(c=c[d]=Array(a.length),d=0;d<a.length;d++)Ra(a,c,b,e,d);else c=c[d]||(c[d]=I()),d=b[++e],Ra(a,c,b,e,d)}
function Oa(a,c,b,e,d,f,g,k){if(a=a[g])if(e===c.length-1){if(a.constructor===Array){if(b[e]){for(c=0;c<a.length;c++)d.add(f,a[c],!0,!0);return}a=a.join(" ")}d.add(f,a,k,!0)}else if(a.constructor===Array)for(g=0;g<a.length;g++)Oa(a,c,b,e,d,f,g,k);else g=c[++e],Oa(a,c,b,e,d,f,g,k)};function Sa(a,c,b,e){if(!a.length)return a;if(a.length===1)return a=a[0],a=b||a.length>c?a.slice(b,b+c):a,e?Ta.call(this,a):a;let d=[];for(let f=0,g,k;f<a.length;f++)if((g=a[f])&&(k=g.length)){if(b){if(b>=k){b-=k;continue}g=g.slice(b,b+c);k=g.length;b=0}k>c&&(g=g.slice(0,c),k=c);if(!d.length&&k>=c)return e?Ta.call(this,g):g;d.push(g);c-=k;if(!c)break}d=d.length>1?[].concat.apply([],d):d[0];return e?Ta.call(this,d):d};function Ua(a,c,b,e){var d=e[0];if(d[0]&&d[0].query)return a[c].apply(a,d);if(!(c!=="and"&&c!=="not"||a.result.length||a.await||d.suggest))return e.length>1&&(d=e[e.length-1]),(e=d.resolve)?a.await||a.result:a;let f=[],g=0,k=0,h,l,m,p,u;for(c=0;c<e.length;c++)if(d=e[c]){var r=void 0;if(d.constructor===X)r=d.await||d.result;else if(d.then||d.constructor===Array)r=d;else{g=d.limit||0;k=d.offset||0;m=d.suggest;l=d.resolve;h=((p=d.highlight||a.highlight)||d.enrich)&&l;r=d.queue;let t=d.async||r,n=d.index,
q=d.query;n?a.index||(a.index=n):n=a.index;if(q||d.tag){const x=d.field||d.pluck;x&&(!q||a.query&&!p||(a.query=q,a.field=x,a.highlight=p),n=n.index.get(x));if(r&&(u||a.await)){u=1;let v;const A=a.C.length,E=new Promise(function(F){v=F});(function(F,B){E.h=function(){B.index=null;B.resolve=!1;B.enrich=!1;let C=t?F.searchAsync(B):F.search(B);if(C.then)return C.then(function(z){a.C[A]=z=z.result||z;v(z);return z});C=C.result||C;v(C);return C}})(n,Object.assign({},d));a.C.push(E);f[c]=E;continue}else d.resolve=
!1,d.enrich=!1,d.index=null,r=t?n.searchAsync(d):n.search(d),d.resolve=l,d.enrich=h,d.index=n}else if(d.and)r=Va(d,"and",n);else if(d.or)r=Va(d,"or",n);else if(d.not)r=Va(d,"not",n);else if(d.xor)r=Va(d,"xor",n);else continue}r.await?(u=1,r=r.await):r.then?(u=1,r=r.then(function(t){return t.result||t})):r=r.result||r;f[c]=r}u&&!a.await&&(a.await=new Promise(function(t){a.return=t}));if(u){const t=Promise.all(f).then(function(n){for(let q=0;q<a.C.length;q++)if(a.C[q]===t){a.C[q]=function(){return b.call(a,
n,g,k,h,l,m,p)};break}Wa(a)});a.C.push(t)}else if(a.await)a.C.push(function(){return b.call(a,f,g,k,h,l,m,p)});else return b.call(a,f,g,k,h,l,m,p);return l?a.await||a.result:a}function Va(a,c,b){a=a[c];const e=a[0]||a;e.index||(e.index=b);b=new X(e);a.length>1&&(b=b[c].apply(b,a.slice(1)));return b};X.prototype.or=function(){return Ua(this,"or",Xa,arguments)};function Xa(a,c,b,e,d,f,g){a.length&&(this.result.length&&a.push(this.result),a.length<2?this.result=a[0]:(this.result=Ya(a,c,b,!1,this.h),b=0));d&&(this.await=null);return d?this.resolve(c,b,e,g):this};X.prototype.and=function(){return Ua(this,"and",Za,arguments)};function Za(a,c,b,e,d,f,g){if(!f&&!this.result.length)return d?this.result:this;let k;if(a.length)if(this.result.length&&a.unshift(this.result),a.length<2)this.result=a[0];else{let h=0;for(let l=0,m,p;l<a.length;l++)if((m=a[l])&&(p=m.length))h<p&&(h=p);else if(!f){h=0;break}h?(this.result=$a(a,h,c,b,f,this.h,d),k=!0):this.result=[]}else f||(this.result=a);d&&(this.await=null);return d?this.resolve(c,b,e,g,k):this};X.prototype.xor=function(){return Ua(this,"xor",ab,arguments)};
function ab(a,c,b,e,d,f,g){if(a.length)if(this.result.length&&a.unshift(this.result),a.length<2)this.result=a[0];else{a:{f=b;var k=this.h;const h=[],l=I();let m=0;for(let p=0,u;p<a.length;p++)if(u=a[p]){m<u.length&&(m=u.length);for(let r=0,t;r<u.length;r++)if(t=u[r])for(let n=0,q;n<t.length;n++)q=t[n],l[q]=l[q]?2:1}for(let p=0,u,r=0;p<m;p++)for(let t=0,n;t<a.length;t++)if(n=a[t])if(u=n[p])for(let q=0,x;q<u.length;q++)if(x=u[q],l[x]===1)if(f)f--;else if(d){if(h.push(x),h.length===c){a=h;break a}}else{const v=
p+(t?k:0);h[v]||(h[v]=[]);h[v].push(x);if(++r===c){a=h;break a}}a=h}this.result=a;k=!0}else f||(this.result=a);d&&(this.await=null);return d?this.resolve(c,b,e,g,k):this};X.prototype.not=function(){return Ua(this,"not",bb,arguments)};
function bb(a,c,b,e,d,f,g){if(!f&&!this.result.length)return d?this.result:this;if(a.length&&this.result.length){a:{f=b;var k=[];a=new Set(a.flat().flat());for(let h=0,l,m=0;h<this.result.length;h++)if(l=this.result[h])for(let p=0,u;p<l.length;p++)if(u=l[p],!a.has(u))if(f)f--;else if(d){if(k.push(u),k.length===c){a=k;break a}}else if(k[h]||(k[h]=[]),k[h].push(u),++m===c){a=k;break a}a=k}this.result=a;k=!0}d&&(this.await=null);return d?this.resolve(c,b,e,g,k):this};function cb(a,c,b,e,d){let f,g,k;typeof d==="string"?(f=d,d=""):f=d.template;g=f.indexOf("$1");k=f.substring(g+2);g=f.substring(0,g);let h=d&&d.boundary,l=!d||d.clip!==!1,m=d&&d.merge&&k&&g&&new RegExp(k+" "+g,"g");d=d&&d.ellipsis;var p=0;if(typeof d==="object"){var u=d.template;p=u.length-2;d=d.pattern}typeof d!=="string"&&(d=d===!1?"":"...");p&&(d=u.replace("$1",d));u=d.length-p;let r,t;typeof h==="object"&&(r=h.before,r===0&&(r=-1),t=h.after,t===0&&(t=-1),h=h.total||9E5);p=new Map;for(let Pa=0,
da,gb,pa;Pa<c.length;Pa++){let qa;if(e)qa=c,pa=e;else{var n=c[Pa];pa=n.field;if(!pa)continue;qa=n.result}gb=b.get(pa);da=gb.encoder;n=p.get(da);typeof n!=="string"&&(n=da.encode(a),p.set(da,n));for(let ya=0;ya<qa.length;ya++){var q=qa[ya].doc;if(!q)continue;q=ca(q,pa);if(!q)continue;var x=q.trim().split(/\s+/);if(!x.length)continue;q="";var v=[];let za=[];var A=-1,E=-1,F=0;for(var B=0;B<x.length;B++){var C=x[B],z=da.encode(C);z=z.length>1?z.join(" "):z[0];let y;if(z&&C){var D=C.length,J=(da.split?
C.replace(da.split,""):C).length-z.length,G="",N=0;for(var O=0;O<n.length;O++){var P=n[O];if(P){var L=P.length;L+=J<0?0:J;N&&L<=N||(P=z.indexOf(P),P>-1&&(G=(P?C.substring(0,P):"")+g+C.substring(P,P+L)+k+(P+L<D?C.substring(P+L):""),N=L,y=!0))}}G&&(h&&(A<0&&(A=q.length+(q?1:0)),E=q.length+(q?1:0)+G.length,F+=D,za.push(v.length),v.push({match:G})),q+=(q?" ":"")+G)}if(!y)C=x[B],q+=(q?" ":"")+C,h&&v.push({text:C});else if(h&&F>=h)break}F=za.length*(f.length-2);if(r||t||h&&q.length-F>h)if(F=h+F-u*2,B=E-
A,r>0&&(B+=r),t>0&&(B+=t),B<=F)x=r?A-(r>0?r:0):A-((F-B)/2|0),v=t?E+(t>0?t:0):x+F,l||(x>0&&q.charAt(x)!==" "&&q.charAt(x-1)!==" "&&(x=q.indexOf(" ",x),x<0&&(x=0)),v<q.length&&q.charAt(v-1)!==" "&&q.charAt(v)!==" "&&(v=q.lastIndexOf(" ",v),v<E?v=E:++v)),q=(x?d:"")+q.substring(x,v)+(v<q.length?d:"");else{E=[];A={};F={};B={};C={};z={};G=J=D=0;for(O=N=1;;){var U=void 0;for(let y=0,K;y<za.length;y++){K=za[y];if(G)if(J!==G){if(B[y+1])continue;K+=G;if(A[K]){D-=u;F[y+1]=1;B[y+1]=1;continue}if(K>=v.length-
1){if(K>=v.length){B[y+1]=1;K>=x.length&&(F[y+1]=1);continue}D-=u}q=v[K].text;if(L=t&&z[y])if(L>0){if(q.length>L)if(B[y+1]=1,l)q=q.substring(0,L);else continue;(L-=q.length)||(L=-1);z[y]=L}else{B[y+1]=1;continue}if(D+q.length+1<=h)q=" "+q,E[y]+=q;else if(l)U=h-D-1,U>0&&(q=" "+q.substring(0,U),E[y]+=q),B[y+1]=1;else{B[y+1]=1;continue}}else{if(B[y])continue;K-=J;if(A[K]){D-=u;B[y]=1;F[y]=1;continue}if(K<=0){if(K<0){B[y]=1;F[y]=1;continue}D-=u}q=v[K].text;if(L=r&&C[y])if(L>0){if(q.length>L)if(B[y]=1,
l)q=q.substring(q.length-L);else continue;(L-=q.length)||(L=-1);C[y]=L}else{B[y]=1;continue}if(D+q.length+1<=h)q+=" ",E[y]=q+E[y];else if(l)U=q.length+1-(h-D),U>=0&&U<q.length&&(q=q.substring(U)+" ",E[y]=q+E[y]),B[y]=1;else{B[y]=1;continue}}else{q=v[K].match;r&&(C[y]=r);t&&(z[y]=t);y&&D++;let Qa;K?!y&&u&&(D+=u):(F[y]=1,B[y]=1);K>=x.length-1?Qa=1:K<v.length-1&&v[K+1].match?Qa=1:u&&(D+=u);D-=f.length-2;if(!y||D+q.length<=h)E[y]=q;else{U=N=O=F[y]=0;break}Qa&&(F[y+1]=1,B[y+1]=1)}D+=q.length;U=A[K]=1}if(U)J===
G?G++:J++;else{J===G?N=0:O=0;if(!N&&!O)break;N?(J++,G=J):G++}}q="";for(let y=0,K;y<E.length;y++)K=(F[y]?y?" ":"":(y&&!d?" ":"")+d)+E[y],q+=K;d&&!F[E.length]&&(q+=d)}m&&(q=q.replace(m," "));qa[ya].highlight=q}if(e)break}return c};function X(a,c){if(!this||this.constructor!==X)return new X(a,c);let b=0,e,d,f,g,k,h;if(a&&a.index){const l=a;c=l.index;b=l.boost||0;if(d=l.query){f=l.field||l.pluck;g=l.highlight;const m=l.resolve;a=l.async||l.queue;l.resolve=!1;l.highlight="";l.index=null;a=a?c.searchAsync(l):c.search(l);l.resolve=m;l.highlight=g;l.index=c;a=a.result||a}else a=[]}if(a&&a.then){const l=this;a=a.then(function(m){l.C[0]=l.result=m.result||m;Wa(l)});e=[a];a=[];k=new Promise(function(m){h=m})}this.index=c||null;this.result=
a||[];this.h=b;this.C=e||[];this.await=k||null;this.return=h||null;this.highlight=g||null;this.query=d||"";this.field=f||""}w=X.prototype;w.limit=function(a){if(this.await){const c=this;this.C.push(function(){return c.limit(a).result})}else if(this.result.length){const c=[];for(let b=0,e;b<this.result.length;b++)if(e=this.result[b])if(e.length<=a){if(c[b]=e,a-=e.length,!a)break}else{c[b]=e.slice(0,a);break}this.result=c}return this};
w.offset=function(a){if(this.await){const c=this;this.C.push(function(){return c.offset(a).result})}else if(this.result.length){const c=[];for(let b=0,e;b<this.result.length;b++)if(e=this.result[b])e.length<=a?a-=e.length:(c[b]=e.slice(a),a=0);this.result=c}return this};w.boost=function(a){if(this.await){const c=this;this.C.push(function(){return c.boost(a).result})}else this.h+=a;return this};
function Wa(a,c){let b=a.result;var e=a.await;a.await=null;for(let d=0,f;d<a.C.length;d++)if(f=a.C[d])if(typeof f==="function")b=f(),a.C[d]=b=b.result||b,d--;else if(f.h)b=f.h(),a.C[d]=b=b.result||b,d--;else if(f.then)return a.await=e;e=a.return;a.C=[];a.return=null;c||e(b);return b}
w.resolve=function(a,c,b,e,d){let f=this.await?Wa(this,!0):this.result;if(f.then){const g=this;return f.then(function(){return g.resolve(a,c,b,e,d)})}f.length&&(typeof a==="object"?(e=a.highlight||this.highlight,b=!!e||a.enrich,c=a.offset,a=a.limit):(e=e||this.highlight,b=!!e||b),f=d?b?Ta.call(this.index,f):f:Sa.call(this.index,f,a||100,c,b));return this.finalize(f,e)};
w.finalize=function(a,c){if(a.then){const e=this;return a.then(function(d){return e.finalize(d,c)})}c&&a.length&&this.query&&(a=cb(this.query,a,this.index.index,this.field,c));const b=this.return;this.highlight=this.index=this.result=this.C=this.await=this.return=null;this.query=this.field="";b&&b(a);return a};function $a(a,c,b,e,d,f,g){const k=a.length;let h=[],l,m;l=I();for(let p=0,u,r,t,n;p<c;p++)for(let q=0;q<k;q++)if(t=a[q],p<t.length&&(u=t[p]))for(let x=0;x<u.length;x++){r=u[x];(m=l[r])?l[r]++:(m=0,l[r]=1);n=h[m]||(h[m]=[]);if(!g){let v=p+(q||!d?0:f||0);n=n[v]||(n[v]=[])}n.push(r);if(g&&b&&m===k-1&&n.length-e===b)return e?n.slice(e):n}if(a=h.length)if(d)h=h.length>1?Ya(h,b,e,g,f):(h=h[0])&&b&&h.length>b||e?h.slice(e,b+e):h;else{if(a<k)return[];h=h[a-1];if(b||e)if(g){if(h.length>b||e)h=h.slice(e,b+
e)}else{d=[];for(let p=0,u;p<h.length;p++)if(u=h[p])if(e&&u.length>e)e-=u.length;else{if(b&&u.length>b||e)u=u.slice(e,b+e),b-=u.length,e&&(e-=u.length);d.push(u);if(!b)break}h=d}}return h}
function Ya(a,c,b,e,d){const f=[],g=I();let k;var h=a.length;let l;if(e)for(d=h-1;d>=0;d--){if(l=(e=a[d])&&e.length)for(h=0;h<l;h++)if(k=e[h],!g[k])if(g[k]=1,b)b--;else if(f.push(k),f.length===c)return f}else for(let m=h-1,p,u=0;m>=0;m--){p=a[m];for(let r=0;r<p.length;r++)if(l=(e=p[r])&&e.length)for(let t=0;t<l;t++)if(k=e[t],!g[k])if(g[k]=1,b)b--;else{let n=(r+(m<h-1?d||0:0))/(m+1)|0;(f[n]||(f[n]=[])).push(k);if(++u===c)return f}}return f}
function db(a,c,b,e,d){const f=I(),g=[];for(let k=0,h;k<c.length;k++){h=c[k];for(let l=0;l<h.length;l++)f[h[l]]=1}if(d)for(let k=0,h;k<a.length;k++){if(h=a[k],f[h])if(e)e--;else if(g.push(h),f[h]=0,b&&--b===0)break}else{a=a.result||a;for(let k=0,h,l;k<a.length;k++)for(h=a[k],c=0;c<h.length;c++)l=h[c],f[l]&&((g[k]||(g[k]=[])).push(l),f[l]=0)}return g};I();Na.prototype.search=function(a,c,b,e){b||(!c&&ba(a)?(b=a,a=""):ba(c)&&(b=c,c=0));let d=[];var f=[];let g;let k,h,l,m,p;let u=0,r=!0,t;if(b){b.constructor===Array&&(b={index:b});a=b.query||a;g=b.pluck;k=b.merge;l=b.boost;p=g||b.field||(p=b.index)&&(p.index?null:p);var n=this.tag&&b.tag;h=b.suggest;r=b.resolve!==!1;m=b.cache;t=r&&this.store&&b.highlight;var q=!!t||r&&this.store&&b.enrich;c=b.limit||c;var x=b.offset||0;c||(c=r?100:0);if(n&&(!this.db||!e)){n.constructor!==Array&&(n=[n]);var v=[];for(let C=
0,z;C<n.length;C++)if(z=n[C],z.field&&z.tag){var A=z.tag;if(A.constructor===Array)for(var E=0;E<A.length;E++)v.push(z.field,A[E]);else v.push(z.field,A)}else{A=Object.keys(z);for(let D=0,J,G;D<A.length;D++)if(J=A[D],G=z[J],G.constructor===Array)for(E=0;E<G.length;E++)v.push(J,G[E]);else v.push(J,G)}n=v;if(!a){f=[];if(v.length)for(n=0;n<v.length;n+=2){if(this.db){e=this.index.get(v[n]);if(!e)continue;f.push(e=e.db.tag(v[n+1],c,x,q))}else e=eb.call(this,v[n],v[n+1],c,x,q);d.push(r?{field:v[n],tag:v[n+
1],result:e}:[e])}if(f.length){const C=this;return Promise.all(f).then(function(z){for(let D=0;D<z.length;D++)r?d[D].result=z[D]:d[D]=z[D];return r?d:new X(d.length>1?$a(d,1,0,0,h,l):d[0],C)})}return r?d:new X(d.length>1?$a(d,1,0,0,h,l):d[0],this)}}r||g||!(p=p||this.field)||(M(p)?g=p:(p.constructor===Array&&p.length===1&&(p=p[0]),g=p.field||p.index));p&&p.constructor!==Array&&(p=[p])}p||(p=this.field);let F;v=(this.worker||this.db)&&!e&&[];for(let C=0,z,D,J;C<p.length;C++){D=p[C];if(this.db&&this.tag&&
!this.B[C])continue;let G;M(D)||(G=D,D=G.field,a=G.query||a,c=aa(G.limit,c),x=aa(G.offset,x),h=aa(G.suggest,h),t=r&&this.store&&aa(G.highlight,t),q=!!t||r&&this.store&&aa(G.enrich,q),m=aa(G.cache,m));if(e)z=e[C];else{A=G||b||{};E=A.enrich;var B=this.index.get(D);n&&(this.db&&(A.tag=n,A.field=p,F=B.db.support_tag_search),!F&&E&&(A.enrich=!1),F||(A.limit=0,A.offset=0));z=m?B.searchCache(a,n&&!F?0:c,A):B.search(a,n&&!F?0:c,A);n&&!F&&(A.limit=c,A.offset=x);E&&(A.enrich=E);if(v){v[C]=z;continue}}J=(z=
z.result||z)&&z.length;if(n&&J){A=[];E=0;if(this.db&&e){if(!F)for(B=p.length;B<e.length;B++){let N=e[B];if(N&&N.length)E++,A.push(N);else if(!h)return r?d:new X(d,this)}}else for(let N=0,O,P;N<n.length;N+=2){O=this.tag.get(n[N]);if(!O)if(h)continue;else return r?d:new X(d,this);if(P=(O=O&&O.get(n[N+1]))&&O.length)E++,A.push(O);else if(!h)return r?d:new X(d,this)}if(E){z=db(z,A,c,x,r);J=z.length;if(!J&&!h)return r?z:new X(z,this);E--}}if(J)f[u]=D,d.push(z),u++;else if(p.length===1)return r?d:new X(d,
this)}if(v){if(this.db&&n&&n.length&&!F)for(q=0;q<n.length;q+=2){f=this.index.get(n[q]);if(!f)if(h)continue;else return r?d:new X(d,this);v.push(f.db.tag(n[q+1],c,x,!1))}const C=this;return Promise.all(v).then(function(z){b&&(b.resolve=r);z.length&&(z=C.search(a,c,b,z));return z})}if(!u)return r?d:new X(d,this);if(g&&(!q||!this.store))return d=d[0],r?d:new X(d,this);v=[];for(x=0;x<f.length;x++){n=d[x];q&&n.length&&typeof n[0].doc==="undefined"&&(this.db?v.push(n=this.index.get(this.field[0]).db.enrich(n)):
n=Ta.call(this,n));if(g)return r?t?cb(a,n,this.index,g,t):n:new X(n,this);d[x]={field:f[x],result:n}}if(q&&this.db&&v.length){const C=this;return Promise.all(v).then(function(z){for(let D=0;D<z.length;D++)d[D].result=z[D];t&&(d=cb(a,d,C.index,g,t));return k?fb(d):d})}t&&(d=cb(a,d,this.index,g,t));return k?fb(d):d};
function fb(a){const c=[],b=I(),e=I();for(let d=0,f,g,k,h,l,m,p;d<a.length;d++){f=a[d];g=f.field;k=f.result;for(let u=0;u<k.length;u++)if(l=k[u],typeof l!=="object"?l={id:h=l}:h=l.id,(m=b[h])?m.push(g):(l.field=b[h]=[g],c.push(l)),p=l.highlight)m=e[h],m||(e[h]=m={},l.highlight=m),m[g]=p}return c}function eb(a,c,b,e,d){a=this.tag.get(a);if(!a)return[];a=a.get(c);if(!a)return[];c=a.length-e;if(c>0){if(b&&c>b||e)a=a.slice(e,e+b);d&&(a=Ta.call(this,a))}return a}
function Ta(a){if(!this||!this.store)return a;if(this.db)return this.index.get(this.field[0]).db.enrich(a);const c=Array(a.length);for(let b=0,e;b<a.length;b++)e=a[b],c[b]={id:e,doc:this.store.get(e)};return c};function Na(a){if(!this||this.constructor!==Na)return new Na(a);const c=a.document||a.doc||a;let b,e;this.B=[];this.field=[];this.D=[];this.key=(b=c.key||c.id)&&hb(b,this.D)||"id";(e=a.keystore||0)&&(this.keystore=e);this.fastupdate=!!a.fastupdate;this.reg=!this.fastupdate||a.worker||a.db?e?new S(e):new Set:e?new R(e):new Map;this.h=(b=c.store||null)&&b&&b!==!0&&[];this.store=b?e?new R(e):new Map:null;this.cache=(b=a.cache||null)&&new ma(b);a.cache=!1;this.worker=a.worker||!1;this.priority=a.priority||
4;this.index=ib.call(this,a,c);this.tag=null;if(b=c.tag)if(typeof b==="string"&&(b=[b]),b.length){this.tag=new Map;this.A=[];this.F=[];for(let d=0,f,g;d<b.length;d++){f=b[d];g=f.field||f;if(!g)throw Error("The tag field from the document descriptor is undefined.");f.custom?this.A[d]=f.custom:(this.A[d]=hb(g,this.D),f.filter&&(typeof this.A[d]==="string"&&(this.A[d]=new String(this.A[d])),this.A[d].G=f.filter));this.F[d]=g;this.tag.set(g,new Map)}}if(this.worker){this.fastupdate=!1;a=[];for(const d of this.index.values())d.then&&
a.push(d);if(a.length){const d=this;return Promise.all(a).then(function(f){let g=0;for(const k of d.index.entries()){const h=k[0];let l=k[1];l.then&&(l=f[g],d.index.set(h,l),g++)}return d})}}else a.db&&(this.fastupdate=!1,this.mount(a.db))}w=Na.prototype;
w.mount=function(a){let c=this.field;if(this.tag)for(let f=0,g;f<this.F.length;f++){g=this.F[f];var b=void 0;this.index.set(g,b=new T({},this.reg));c===this.field&&(c=c.slice(0));c.push(g);b.tag=this.tag.get(g)}b=[];const e={db:a.db,type:a.type,fastupdate:a.fastupdate};for(let f=0,g,k;f<c.length;f++){e.field=k=c[f];g=this.index.get(k);const h=new a.constructor(a.id,e);h.id=a.id;b[f]=h.mount(g);g.document=!0;f?g.bypass=!0:g.store=this.store}const d=this;return this.db=Promise.all(b).then(function(){d.db=
!0})};w.commit=async function(){const a=[];for(const c of this.index.values())a.push(c.commit());await Promise.all(a);this.reg.clear()};w.destroy=function(){const a=[];for(const c of this.index.values())a.push(c.destroy());return Promise.all(a)};
function ib(a,c){const b=new Map;let e=c.index||c.field||c;M(e)&&(e=[e]);for(let f=0,g,k;f<e.length;f++){g=e[f];M(g)||(k=g,g=g.field);k=ba(k)?Object.assign({},a,k):a;if(this.worker){var d=void 0;d=(d=k.encoder)&&d.encode?d:new ka(typeof d==="string"?va[d]:d||{});d=new La(k,d);b.set(g,d)}this.worker||b.set(g,new T(k,this.reg));k.custom?this.B[f]=k.custom:(this.B[f]=hb(g,this.D),k.filter&&(typeof this.B[f]==="string"&&(this.B[f]=new String(this.B[f])),this.B[f].G=k.filter));this.field[f]=g}if(this.h){a=
c.store;M(a)&&(a=[a]);for(let f=0,g,k;f<a.length;f++)g=a[f],k=g.field||g,g.custom?(this.h[f]=g.custom,g.custom.O=k):(this.h[f]=hb(k,this.D),g.filter&&(typeof this.h[f]==="string"&&(this.h[f]=new String(this.h[f])),this.h[f].G=g.filter))}return b}function hb(a,c){const b=a.split(":");let e=0;for(let d=0;d<b.length;d++)a=b[d],a[a.length-1]==="]"&&(a=a.substring(0,a.length-2))&&(c[e]=!0),a&&(b[e++]=a);e<b.length&&(b.length=e);return e>1?b:b[0]}w.append=function(a,c){return this.add(a,c,!0)};
w.update=function(a,c){return this.remove(a).add(a,c)};w.remove=function(a){ba(a)&&(a=ca(a,this.key));for(var c of this.index.values())c.remove(a,!0);if(this.reg.has(a)){if(this.tag&&!this.fastupdate)for(let b of this.tag.values())for(let e of b){c=e[0];const d=e[1],f=d.indexOf(a);f>-1&&(d.length>1?d.splice(f,1):b.delete(c))}this.store&&this.store.delete(a);this.reg.delete(a)}this.cache&&this.cache.remove(a);return this};
w.clear=function(){const a=[];for(const c of this.index.values()){const b=c.clear();b.then&&a.push(b)}if(this.tag)for(const c of this.tag.values())c.clear();this.store&&this.store.clear();this.cache&&this.cache.clear();return a.length?Promise.all(a):this};w.contain=function(a){return this.db?this.index.get(this.field[0]).db.has(a):this.reg.has(a)};w.cleanup=function(){for(const a of this.index.values())a.cleanup();return this};
w.get=function(a){return this.db?this.index.get(this.field[0]).db.enrich(a).then(function(c){return c[0]&&c[0].doc||null}):this.store.get(a)||null};w.set=function(a,c){typeof a==="object"&&(c=a,a=ca(c,this.key));this.store.set(a,c);return this};w.searchCache=la;w.export=jb;w.import=kb;Fa(Na.prototype);function lb(a,c=0){let b=[],e=[];c&&(c=25E4/c*5E3|0);for(const d of a.entries())e.push(d),e.length===c&&(b.push(e),e=[]);e.length&&b.push(e);return b}function mb(a,c){c||(c=new Map);for(let b=0,e;b<a.length;b++)e=a[b],c.set(e[0],e[1]);return c}function nb(a,c=0){let b=[],e=[];c&&(c=25E4/c*1E3|0);for(const d of a.entries())e.push([d[0],lb(d[1])[0]||[]]),e.length===c&&(b.push(e),e=[]);e.length&&b.push(e);return b}
function ob(a,c){c||(c=new Map);for(let b=0,e,d;b<a.length;b++)e=a[b],d=c.get(e[0]),c.set(e[0],mb(e[1],d));return c}function pb(a){let c=[],b=[];for(const e of a.keys())b.push(e),b.length===25E4&&(c.push(b),b=[]);b.length&&c.push(b);return c}function qb(a,c){c||(c=new Set);for(let b=0;b<a.length;b++)c.add(a[b]);return c}
function rb(a,c,b,e,d,f,g=0){const k=e&&e.constructor===Array;var h=k?e.shift():e;if(!h)return this.export(a,c,d,f+1);if((h=a((c?c+".":"")+(g+1)+"."+b,JSON.stringify(h)))&&h.then){const l=this;return h.then(function(){return rb.call(l,a,c,b,k?e:null,d,f,g+1)})}return rb.call(this,a,c,b,k?e:null,d,f,g+1)}
function jb(a,c,b=0,e=0){if(b<this.field.length){const g=this.field[b];if((c=this.index.get(g).export(a,g,b,e=1))&&c.then){const k=this;return c.then(function(){return k.export(a,g,b+1)})}return this.export(a,g,b+1)}let d,f;switch(e){case 0:d="reg";f=pb(this.reg);c=null;break;case 1:d="tag";f=this.tag&&nb(this.tag,this.reg.size);c=null;break;case 2:d="doc";f=this.store&&lb(this.store);c=null;break;default:return}return rb.call(this,a,c,d,f||null,b,e)}
function kb(a,c){var b=a.split(".");b[b.length-1]==="json"&&b.pop();const e=b.length>2?b[0]:"";b=b.length>2?b[2]:b[1];if(this.worker&&e)return this.index.get(e).import(a);if(c){typeof c==="string"&&(c=JSON.parse(c));if(e)return this.index.get(e).import(b,c);switch(b){case "reg":this.fastupdate=!1;this.reg=qb(c,this.reg);for(let d=0,f;d<this.field.length;d++)f=this.index.get(this.field[d]),f.fastupdate=!1,f.reg=this.reg;if(this.worker){c=[];for(const d of this.index.values())c.push(d.import(a));return Promise.all(c)}break;
case "tag":this.tag=ob(c,this.tag);break;case "doc":this.store=mb(c,this.store)}}}function sb(a,c){let b="";for(const e of a.entries()){a=e[0];const d=e[1];let f="";for(let g=0,k;g<d.length;g++){k=d[g]||[""];let h="";for(let l=0;l<k.length;l++)h+=(h?",":"")+(c==="string"?'"'+k[l]+'"':k[l]);h="["+h+"]";f+=(f?",":"")+h}f='["'+a+'",['+f+"]]";b+=(b?",":"")+f}return b};T.prototype.remove=function(a,c){const b=this.reg.size&&(this.fastupdate?this.reg.get(a):this.reg.has(a));if(b){if(this.fastupdate)for(let e=0,d,f;e<b.length;e++){if((d=b[e])&&(f=d.length))if(d[f-1]===a)d.pop();else{const g=d.indexOf(a);g>=0&&d.splice(g,1)}}else tb(this.map,a),this.depth&&tb(this.ctx,a);c||this.reg.delete(a)}this.db&&(this.commit_task.push({del:a}),this.M&&ub(this));this.cache&&this.cache.remove(a);return this};
function tb(a,c){let b=0;var e=typeof c==="undefined";if(a.constructor===Array)for(let d=0,f,g,k;d<a.length;d++){if((f=a[d])&&f.length){if(e)return 1;g=f.indexOf(c);if(g>=0){if(f.length>1)return f.splice(g,1),1;delete a[d];if(b)return 1;k=1}else{if(k)return 1;b++}}}else for(let d of a.entries())e=d[0],tb(d[1],c)?b++:a.delete(e);return b};const vb={memory:{resolution:1},performance:{resolution:3,fastupdate:!0,context:{depth:1,resolution:1}},match:{tokenize:"full"},score:{resolution:9,context:{depth:2,resolution:3}}};T.prototype.add=function(a,c,b,e){if(c&&(a||a===0)){if(!e&&!b&&this.reg.has(a))return this.update(a,c);e=this.depth;c=this.encoder.encode(c,!e);const l=c.length;if(l){const m=I(),p=I(),u=this.resolution;for(let r=0;r<l;r++){let t=c[this.rtl?l-1-r:r];var d=t.length;if(d&&(e||!p[t])){var f=this.score?this.score(c,t,r,null,0):wb(u,l,r),g="";switch(this.tokenize){case "tolerant":Y(this,p,t,f,a,b);if(d>2){for(let n=1,q,x,v,A;n<d-1;n++)q=t.charAt(n),x=t.charAt(n+1),v=t.substring(0,n)+x,A=t.substring(n+
2),g=v+q+A,Y(this,p,g,f,a,b),g=v+A,Y(this,p,g,f,a,b);Y(this,p,t.substring(0,t.length-1),f,a,b)}break;case "full":if(d>2){for(let n=0,q;n<d;n++)for(f=d;f>n;f--){g=t.substring(n,f);q=this.rtl?d-1-n:n;var k=this.score?this.score(c,t,r,g,q):wb(u,l,r,d,q);Y(this,p,g,k,a,b)}break}case "bidirectional":case "reverse":if(d>1){for(k=d-1;k>0;k--){g=t[this.rtl?d-1-k:k]+g;var h=this.score?this.score(c,t,r,g,k):wb(u,l,r,d,k);Y(this,p,g,h,a,b)}g=""}case "forward":if(d>1){for(k=0;k<d;k++)g+=t[this.rtl?d-1-k:k],Y(this,
p,g,f,a,b);break}default:if(Y(this,p,t,f,a,b),e&&l>1&&r<l-1)for(d=this.N,g=t,f=Math.min(e+1,this.rtl?r+1:l-r),k=1;k<f;k++){t=c[this.rtl?l-1-r-k:r+k];h=this.bidirectional&&t>g;const n=this.score?this.score(c,g,r,t,k-1):wb(d+(l/2>d?0:1),l,r,f-1,k-1);Y(this,m,h?g:t,n,a,b,h?t:g)}}}}this.fastupdate||this.reg.add(a)}}this.db&&(this.commit_task.push(b?{ins:a}:{del:a}),this.M&&ub(this));return this};
function Y(a,c,b,e,d,f,g){let k,h;if(!(k=c[b])||g&&!k[g]){g?(c=k||(c[b]=I()),c[g]=1,h=a.ctx,(k=h.get(g))?h=k:h.set(g,h=a.keystore?new R(a.keystore):new Map)):(h=a.map,c[b]=1);(k=h.get(b))?h=k:h.set(b,h=k=[]);if(f)for(let l=0,m;l<k.length;l++)if((m=k[l])&&m.includes(d)){if(l<=e)return;m.splice(m.indexOf(d),1);a.fastupdate&&(c=a.reg.get(d))&&c.splice(c.indexOf(m),1);break}h=h[e]||(h[e]=[]);h.push(d);if(h.length===2**31-1){c=new xa(h);if(a.fastupdate)for(let l of a.reg.values())l.includes(h)&&(l[l.indexOf(h)]=
c);k[e]=h=c}a.fastupdate&&((e=a.reg.get(d))?e.push(h):a.reg.set(d,[h]))}}function wb(a,c,b,e,d){return b&&a>1?c+(e||0)<=a?b+(d||0):(a-1)/(c+(e||0))*(b+(d||0))+1|0:0};T.prototype.search=function(a,c,b){b||(c||typeof a!=="object"?typeof c==="object"&&(b=c,c=0):(b=a,a=""));if(b&&b.cache)return b.cache=!1,a=this.searchCache(a,c,b),b.cache=!0,a;let e=[],d,f,g,k=0,h,l,m,p,u;b&&(a=b.query||a,c=b.limit||c,k=b.offset||0,f=b.context,g=b.suggest,u=(h=b.resolve)&&b.enrich,m=b.boost,p=b.resolution,l=this.db&&b.tag);typeof h==="undefined"&&(h=this.resolve);f=this.depth&&f!==!1;let r=this.encoder.encode(a,!f);d=r.length;c=c||(h?100:0);if(d===1)return xb.call(this,r[0],"",c,
k,h,u,l);if(d===2&&f&&!g)return xb.call(this,r[1],r[0],c,k,h,u,l);let t=I(),n=0,q;f&&(q=r[0],n=1);p||p===0||(p=q?this.N:this.resolution);if(this.db){if(this.db.search&&(b=this.db.search(this,r,c,k,g,h,u,l),b!==!1))return b;const x=this;return async function(){for(let v,A;n<d;n++){if((A=r[n])&&!t[A]){t[A]=1;v=await yb(x,A,q,0,0,!1,!1);if(v=zb(v,e,g,p)){e=v;break}q&&(g&&v&&e.length||(q=A))}g&&q&&n===d-1&&!e.length&&(p=x.resolution,q="",n=-1,t=I())}return Ab(e,p,c,k,g,m,h)}()}for(let x,v;n<d;n++){if((v=
r[n])&&!t[v]){t[v]=1;x=yb(this,v,q,0,0,!1,!1);if(x=zb(x,e,g,p)){e=x;break}q&&(g&&x&&e.length||(q=v))}g&&q&&n===d-1&&!e.length&&(p=this.resolution,q="",n=-1,t=I())}return Ab(e,p,c,k,g,m,h)};function Ab(a,c,b,e,d,f,g){let k=a.length,h=a;if(k>1)h=$a(a,c,b,e,d,f,g);else if(k===1)return g?Sa.call(null,a[0],b,e):new X(a[0],this);return g?h:new X(h,this)}
function xb(a,c,b,e,d,f,g){a=yb(this,a,c,b,e,d,f,g);return this.db?a.then(function(k){return d?k||[]:new X(k,this)}):a&&a.length?d?Sa.call(this,a,b,e):new X(a,this):d?[]:new X([],this)}function zb(a,c,b,e){let d=[];if(a&&a.length){if(a.length<=e){c.push(a);return}for(let f=0,g;f<e;f++)if(g=a[f])d[f]=g;if(d.length){c.push(d);return}}if(!b)return d}
function yb(a,c,b,e,d,f,g,k){let h;b&&(h=a.bidirectional&&c>b)&&(h=b,b=c,c=h);if(a.db)return a.db.get(c,b,e,d,f,g,k);a=b?(a=a.ctx.get(b))&&a.get(c):a.map.get(c);return a};function T(a,c){if(!this||this.constructor!==T)return new T(a);if(a){var b=M(a)?a:a.preset;b&&(a=Object.assign({},vb[b],a))}else a={};b=a.context;const e=b===!0?{depth:1}:b||{},d=M(a.encoder)?va[a.encoder]:a.encode||a.encoder||{};this.encoder=d.encode?d:typeof d==="object"?new ka(d):{encode:d};this.resolution=a.resolution||9;this.tokenize=b=(b=a.tokenize)&&b!=="default"&&b!=="exact"&&b||"strict";this.depth=b==="strict"&&e.depth||0;this.bidirectional=e.bidirectional!==!1;this.fastupdate=!!a.fastupdate;
this.score=a.score||null;(b=a.keystore||0)&&(this.keystore=b);this.map=b?new R(b):new Map;this.ctx=b?new R(b):new Map;this.reg=c||(this.fastupdate?b?new R(b):new Map:b?new S(b):new Set);this.N=e.resolution||3;this.rtl=d.rtl||a.rtl||!1;this.cache=(b=a.cache||null)&&new ma(b);this.resolve=a.resolve!==!1;if(b=a.db)this.db=this.mount(b);this.M=a.commit!==!1;this.commit_task=[];this.commit_timer=null;this.priority=a.priority||4}w=T.prototype;
w.mount=function(a){this.commit_timer&&(clearTimeout(this.commit_timer),this.commit_timer=null);return a.mount(this)};w.commit=function(){this.commit_timer&&(clearTimeout(this.commit_timer),this.commit_timer=null);return this.db.commit(this)};w.destroy=function(){this.commit_timer&&(clearTimeout(this.commit_timer),this.commit_timer=null);return this.db.destroy()};function ub(a){a.commit_timer||(a.commit_timer=setTimeout(function(){a.commit_timer=null;a.db.commit(a)},1))}
w.clear=function(){this.map.clear();this.ctx.clear();this.reg.clear();this.cache&&this.cache.clear();return this.db?(this.commit_timer&&clearTimeout(this.commit_timer),this.commit_timer=null,this.commit_task=[],this.db.clear()):this};w.append=function(a,c){return this.add(a,c,!0)};w.contain=function(a){return this.db?this.db.has(a):this.reg.has(a)};w.update=function(a,c){const b=this,e=this.remove(a);return e&&e.then?e.then(()=>b.add(a,c)):this.add(a,c)};
w.cleanup=function(){if(!this.fastupdate)return this;tb(this.map);this.depth&&tb(this.ctx);return this};w.searchCache=la;w.export=function(a,c,b=0,e=0){let d,f;switch(e){case 0:d="reg";f=pb(this.reg);break;case 1:d="cfg";f=null;break;case 2:d="map";f=lb(this.map,this.reg.size);break;case 3:d="ctx";f=nb(this.ctx,this.reg.size);break;default:return}return rb.call(this,a,c,d,f,b,e)};
w.import=function(a,c){if(c)switch(typeof c==="string"&&(c=JSON.parse(c)),a=a.split("."),a[a.length-1]==="json"&&a.pop(),a.length===3&&a.shift(),a=a.length>1?a[1]:a[0],a){case "reg":this.fastupdate=!1;this.reg=qb(c,this.reg);break;case "map":this.map=mb(c,this.map);break;case "ctx":this.ctx=ob(c,this.ctx)}};
w.serialize=function(a=!0){let c="",b="",e="";if(this.reg.size){let f;for(var d of this.reg.keys())f||(f=typeof d),c+=(c?",":"")+(f==="string"?'"'+d+'"':d);c="index.reg=new Set(["+c+"]);";b=sb(this.map,f);b="index.map=new Map(["+b+"]);";for(const g of this.ctx.entries()){d=g[0];let k=sb(g[1],f);k="new Map(["+k+"])";k='["'+d+'",'+k+"]";e+=(e?",":"")+k}e="index.ctx=new Map(["+e+"]);"}return a?"function inject(index){"+c+b+e+"}":c+b+e};Fa(T.prototype);const Bb=typeof window!=="undefined"&&(window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB),Cb=["map","ctx","tag","reg","cfg"],Db=I();
function Eb(a,c={}){if(!this||this.constructor!==Eb)return new Eb(a,c);typeof a==="object"&&(c=a,a=a.name);a||console.info("Default storage space was used, because a name was not passed.");this.id="flexsearch"+(a?":"+a.toLowerCase().replace(/[^a-z0-9_\-]/g,""):"");this.field=c.field?c.field.toLowerCase().replace(/[^a-z0-9_\-]/g,""):"";this.type=c.type;this.fastupdate=this.support_tag_search=!1;this.db=null;this.h={}}w=Eb.prototype;w.mount=function(a){if(a.index)return a.mount(this);a.db=this;return this.open()};
w.open=function(){if(this.db)return this.db;let a=this;navigator.storage&&navigator.storage.persist&&navigator.storage.persist();Db[a.id]||(Db[a.id]=[]);Db[a.id].push(a.field);const c=Bb.open(a.id,1);c.onupgradeneeded=function(){const b=a.db=this.result;for(let e=0,d;e<Cb.length;e++){d=Cb[e];for(let f=0,g;f<Db[a.id].length;f++)g=Db[a.id][f],b.objectStoreNames.contains(d+(d!=="reg"?g?":"+g:"":""))||b.createObjectStore(d+(d!=="reg"?g?":"+g:"":""))}};return a.db=Z(c,function(b){a.db=b;a.db.onversionchange=
function(){a.close()}})};w.close=function(){this.db&&this.db.close();this.db=null};w.destroy=function(){const a=Bb.deleteDatabase(this.id);return Z(a)};w.clear=function(){const a=[];for(let b=0,e;b<Cb.length;b++){e=Cb[b];for(let d=0,f;d<Db[this.id].length;d++)f=Db[this.id][d],a.push(e+(e!=="reg"?f?":"+f:"":""))}const c=this.db.transaction(a,"readwrite");for(let b=0;b<a.length;b++)c.objectStore(a[b]).clear();return Z(c)};
w.get=function(a,c,b=0,e=0,d=!0,f=!1){a=this.db.transaction((c?"ctx":"map")+(this.field?":"+this.field:""),"readonly").objectStore((c?"ctx":"map")+(this.field?":"+this.field:"")).get(c?c+":"+a:a);const g=this;return Z(a).then(function(k){let h=[];if(!k||!k.length)return h;if(d){if(!b&&!e&&k.length===1)return k[0];for(let l=0,m;l<k.length;l++)if((m=k[l])&&m.length){if(e>=m.length){e-=m.length;continue}const p=b?e+Math.min(m.length-e,b):m.length;for(let u=e;u<p;u++)h.push(m[u]);e=0;if(h.length===b)break}return f?
g.enrich(h):h}return k})};w.tag=function(a,c=0,b=0,e=!1){a=this.db.transaction("tag"+(this.field?":"+this.field:""),"readonly").objectStore("tag"+(this.field?":"+this.field:"")).get(a);const d=this;return Z(a).then(function(f){if(!f||!f.length||b>=f.length)return[];if(!c&&!b)return f;f=f.slice(b,b+c);return e?d.enrich(f):f})};
w.enrich=function(a){typeof a!=="object"&&(a=[a]);const c=this.db.transaction("reg","readonly").objectStore("reg"),b=[];for(let e=0;e<a.length;e++)b[e]=Z(c.get(a[e]));return Promise.all(b).then(function(e){for(let d=0;d<e.length;d++)e[d]={id:a[d],doc:e[d]?JSON.parse(e[d]):null};return e})};w.has=function(a){a=this.db.transaction("reg","readonly").objectStore("reg").getKey(a);return Z(a).then(function(c){return!!c})};w.search=null;w.info=function(){};
w.transaction=function(a,c,b){a+=a!=="reg"?this.field?":"+this.field:"":"";let e=this.h[a+":"+c];if(e)return b.call(this,e);let d=this.db.transaction(a,c);this.h[a+":"+c]=e=d.objectStore(a);const f=b.call(this,e);this.h[a+":"+c]=null;return Z(d).finally(function(){return f})};
w.commit=async function(a){let c=a.commit_task,b=[];a.commit_task=[];for(let e=0,d;e<c.length;e++)d=c[e],d.del&&b.push(d.del);b.length&&await this.remove(b);a.reg.size&&(await this.transaction("map","readwrite",function(e){for(const d of a.map){const f=d[0],g=d[1];g.length&&(e.get(f).onsuccess=function(){let k=this.result;var h;if(k&&k.length){const l=Math.max(k.length,g.length);for(let m=0,p,u;m<l;m++)if((u=g[m])&&u.length){if((p=k[m])&&p.length)for(h=0;h<u.length;h++)p.push(u[h]);else k[m]=u;h=
1}}else k=g,h=1;h&&e.put(k,f)})}}),await this.transaction("ctx","readwrite",function(e){for(const d of a.ctx){const f=d[0],g=d[1];for(const k of g){const h=k[0],l=k[1];l.length&&(e.get(f+":"+h).onsuccess=function(){let m=this.result;var p;if(m&&m.length){const u=Math.max(m.length,l.length);for(let r=0,t,n;r<u;r++)if((n=l[r])&&n.length){if((t=m[r])&&t.length)for(p=0;p<n.length;p++)t.push(n[p]);else m[r]=n;p=1}}else m=l,p=1;p&&e.put(m,f+":"+h)})}}}),a.store?await this.transaction("reg","readwrite",
function(e){for(const d of a.store){const f=d[0],g=d[1];e.put(typeof g==="object"?JSON.stringify(g):1,f)}}):a.bypass||await this.transaction("reg","readwrite",function(e){for(const d of a.reg.keys())e.put(1,d)}),a.tag&&await this.transaction("tag","readwrite",function(e){for(const d of a.tag){const f=d[0],g=d[1];g.length&&(e.get(f).onsuccess=function(){let k=this.result;k=k&&k.length?k.concat(g):g;e.put(k,f)})}}),a.map.clear(),a.ctx.clear(),a.tag&&a.tag.clear(),a.store&&a.store.clear(),a.document||
a.reg.clear())};function Fb(a,c,b){const e=a.value;let d,f=0;for(let g=0,k;g<e.length;g++){if(k=b?e:e[g]){for(let h=0,l,m;h<c.length;h++)if(m=c[h],l=k.indexOf(m),l>=0)if(d=1,k.length>1)k.splice(l,1);else{e[g]=[];break}f+=k.length}if(b)break}f?d&&a.update(e):a.delete();a.continue()}
w.remove=function(a){typeof a!=="object"&&(a=[a]);return Promise.all([this.transaction("map","readwrite",function(c){c.openCursor().onsuccess=function(){const b=this.result;b&&Fb(b,a)}}),this.transaction("ctx","readwrite",function(c){c.openCursor().onsuccess=function(){const b=this.result;b&&Fb(b,a)}}),this.transaction("tag","readwrite",function(c){c.openCursor().onsuccess=function(){const b=this.result;b&&Fb(b,a,!0)}}),this.transaction("reg","readwrite",function(c){for(let b=0;b<a.length;b++)c.delete(a[b])})])};
function Z(a,c){return new Promise((b,e)=>{a.onsuccess=a.oncomplete=function(){c&&c(this.result);c=null;b(this.result)};a.onerror=a.onblocked=e;a=null})};const Gb={Index:T,Charset:va,Encoder:ka,Document:Na,Worker:La,Resolver:X,IndexedDB:Eb,Language:{}},Hb=typeof self!=="undefined"?self:typeof global!=="undefined"?global:self;let Ib;(Ib=Hb.define)&&Ib.amd?Ib([],function(){return Gb}):typeof Hb.exports==="object"?Hb.exports=Gb:Hb.FlexSearch=Gb;}(this||self));

;
const search = document.querySelector('.search-input')
const suggestions = document.querySelector('.search-suggestions')
const background = document.querySelector('.search-background')

const encoder = new FlexSearch.Encoder(FlexSearch.Charset.LatinSimple);
encoder.assign({ minlength: 3 });

var index = new FlexSearch.Document({
  tokenize: "forward",
  cache: 100,
  document: {
    id: "id",
    store: ["href", "title", "description"],
    index: [
      {
        field: "title",
        tokenize: "forward",
        resolution: 3
      },
      {
        field: "description",
        encoder: encoder,
        resolution: 20,
        tokenize: "full"
      },
      {
        field: "content",
        encoder: encoder,
        resolution: 20,
        tokenize: "full"
      }
    ]
  }
});

/*
Source:
  - https://github.com/nextapps-de/flexsearch#index-documents-field-search
  - https://raw.githack.com/nextapps-de/flexsearch/master/demo/autocomplete.html
*/
function initIndex() {
  // https://discourse.gohugo.io/t/range-length-or-last-element/3803/2
  // Note: pages without a title (such as browserconfig.xml) are excluded
  
  
  
  index.add(
    
      
      
      
      
      {
        id: 0,
        href: "/aichi/shinojima-tsuri-tengoku/",
        title: "【愛知県】篠島釣り天国｜離島で楽しむ海釣り体験・アクセス・料金情報",
        description: "愛知県の離島・篠島に位置する「篠島釣り天国」は、澄んだ海に囲まれた環境で本格的な海釣りを手軽に楽しめる人気スポットです。マダイ、クロダイ、ハマチなどの高級魚から、アジやメバルまで多彩な魚種が釣れるため、初心者から上級者まで幅広い釣り愛好家に支持されています。",
        
        
        content: "愛知県の離島・篠島に位置する「篠島釣り天国」は、澄んだ海に囲まれた環境で本格的な海釣りを手軽に楽しめる人気スポットです。\nマダイ、クロダイ、ハマチなどの高級魚から、アジやメバルまで多彩な魚種が釣れるため、初心者から上級者まで幅広い釣り愛好家に支持されています。釣り竿やエサのレンタルも充実しており、手ぶらで訪れても十分に釣りを楽しむことができます。さらに、篠島という離島ならではの風景や新鮮な海の恵みも魅力の一つ。\n観光と釣りを組み合わせた特別な体験ができる施設として、知多半島からのアクセスも良好です。気軽な時間制で利用できるため、島の散策や温泉との組み合わせもおすすめの釣りスポットです。\n篠島釣り天国の基本情報 \u0026nbsp; 場所: 〒470-3505 愛知県知多郡南知多町篠島浦磯42 営業時間: 3/16～9/30は7:00～17:00、10/1～12/25は8:00～16:00まで 定休日: 火曜日※8月は無休（4月1日～12月末のみ営業） 平均予算: 大人（中学生以上）2時間4,000円、女性・子供2時間3,000円、延長1時間ごと1,000円追加 レンタル: 貸竿1本1,000円、リール竿1,500円 釣具の持ち込み: 釣り竿1人1本まで、エサの持ち込みとサビキ釣りは禁止 釣れる魚: マダイ、クロダイ、ハマチ、ヒラメ、イサキ、アジ、メバル、アイナメなど 注意事項: 釣り放題だが、タイ・ハマチは合計4匹まで（延長1時間に対し1匹増）、それ以上は買い上げ ウェブサイト: 篠島釣り天国 料金体系について \u0026nbsp; 篠島釣り天国は、時間制の料金体系を採用しています。釣った魚は基本的に持ち帰ることができますが、高級魚には制限があります。\n基本料金：\n大人（中学生以上）：2時間4,000円 女性・子供：2時間3,000円 延長料金：1時間ごとに1,000円追加 釣具レンタル：\n貸竿：1本1,000円 リール竿：1,500円 釣果の制限：\nタイ・ハマチは合計4匹まで（2時間の基本コース） 延長1時間ごとに制限が1匹ずつ増加（例：3時間利用で5匹まで） 制限を超えた魚は買い上げとなります（料金は現地で確認） この料金体系は、短時間でも気軽に釣り体験を楽しみたい観光客にとって魅力的です。離島という特別な環境で釣りを楽しめる上に、料金も比較的リーズナブルに設定されています。\n注意事項と補足データ \u0026nbsp; 篠島は離島のため、アクセスには船の移動が必要です 知多半島の各港（河和港、師崎港など）から高速船、または伊良湖岬からフェリーでアクセスできます 釣り竿は1人1本までの持ち込み制限があります エサの持ち込みは禁止されているため、現地での購入が必要です サビキ釣りは禁止されています 営業期間は4月1日から12月末までとなっています（冬季休業あり） 8月は無休で営業していますが、それ以外の月は火曜日が定休日です 季節によって営業時間が異なるため、訪問前に確認することをおすすめします 海上の施設のため、天候によっては営業を中止する場合があります 天候の影響で船便も欠航の可能性があるため、事前の確認が必要です 離島ならではの自然環境を楽しめますが、夏場は日差しが強いため、帽子や日焼け止めなどの暑さ対策が必要です 施設内にはトイレや休憩スペースが完備されています 篠島内には宿泊施設や食事処も充実しているため、1泊2日のプランも検討できます 篠島釣り天国のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 篠島釣り天国では季節によって様々な魚種を狙うことができます。ここでは、主な魚種3種類についてのおすすめ仕掛けと釣りのコツをご紹介します。\nマダイ・クロダイを狙う場合 \u0026nbsp; マダイとクロダイは「篠島釣り天国」の代表的な高級魚です。\n推奨タックル（レンタル利用の場合）：\n竿：施設でレンタルできるリール竿（1,500円） 持ち込みの場合の推奨タックル：\n竿：7:3調子の磯竿（2.7m〜3.6m） リール：3000〜4000番クラスのスピニングリール 道糸：3号〜4号のナイロンライン ハリス：2号〜3号のフロロカーボン 針：マダイ針またはクロダイ針8号〜10号 釣り方のコツ：\n施設で提供されるエサを使用します（オキアミやアオイソメなど） ウキ釣りが基本となりますが、場所によっては底釣りも効果的です アタリがあったら少し間を置いてから合わせると掛かりやすくなります マダイは朝夕の時間帯、クロダイは潮の動きが変わる時間帯によく釣れます 竿を立てすぎず、適度に弾力を持たせるようにしましょう 魚が掛かったら、一気に寄せるのではなく、徐々に引き上げるようにします ハマチ・ヒラメを狙う場合 \u0026nbsp; ハマチ（ブリの若魚）やヒラメは引きの強さと味の良さで人気の高級魚です。\n推奨タックル：\n竿：パワーのある磯竿または船竿（3.0m〜3.6m） リール：4000〜5000番クラスのパワーのあるスピニングリール 道糸：5号〜6号のナイロンライン ハリス：4号〜5号のフロロカーボン 針：丸セイゴ8号〜10号 釣り方のコツ：\nハマチは活きエサ（小アジなど）、ヒラメはイソメなどの虫エサが効果的です ドラグ調整を適切に行い、急激な引きに対応できるようにします ハマチは中層から表層、ヒラメは底付近を狙うとよいでしょう 魚が掛かったら、周囲の釣り人に迷惑をかけないよう、早めに浮かせることが重要です 特にハマチは引きが強いため、竿をしっかりと握り、慌てずにやり取りしましょう 釣果制限（4匹まで）があるため、大物を狙って効率よく釣りたい場合は、エサや釣り場所の選択が重要です アジ・メバル・アイナメを狙う場合 \u0026nbsp; アジ、メバル、アイナメなどの小型から中型の魚は、数釣りの楽しさがあります。\n推奨タックル：\n竿：2.7m〜3.0mの磯竿 リール：2000〜3000番クラスのスピニングリール 道糸：2号〜3号のナイロンライン ハリス：1.5号〜2号のフロロカーボン 針：アジ針10号〜12号、メバル針10号〜12号 釣り方のコツ：\nアジはオキアミなどの小さめのエサ、メバルやアイナメはイソメなどの虫エサが効果的です アジは水深を変えながら探るとよいでしょう メバルやアイナメは岩場や構造物の周りによく集まります アタリは小さめなことが多いので、集中して竿先を見ることが重要です 魚が掛かったら、強く引っ張りすぎないよう注意しましょう 時間帯によっては入れ食いになることもあるため、効率よく釣りを楽しめます 篠島釣り天国へのおすすめアクセス情報 \u0026nbsp; フェリー・高速船でのアクセス \u0026nbsp; 篠島は離島のため、フェリーまたは高速船でのアクセスが必要です。篠島釣り天国は釣具のレンタルがあるので、車を積載できない高速船利用でも問題ありません。\n知多半島からのアクセス：\n河和港から高速船で約25分 師崎港から高速船で約15分 伊良湖岬からのアクセス：\n伊良湖港からフェリーで約25分 船の運行時間や料金は季節により変動するため、事前に確認することをおすすめします。フェリー利用は車を使えることが魅力ですが、運賃が増えるのが悩みどころですね。\n篠島到着後のアクセス \u0026nbsp; 篠島に到着後、篠島釣り天国までは以下の方法でアクセスできます。\n徒歩：港から約20分 タクシー：港から約5分 レンタサイクル：港周辺でレンタル可能 島内は比較的コンパクトなため、徒歩やサイクリングで十分に移動できます。\n釣り堀の特性を考慮したアクセスプラン \u0026nbsp; 篠島釣り天国は2時間からの時間制利用となるため、船の時刻表を確認しながら計画を立てることが重要です。\n日帰りプラン：\n朝一番の船で篠島に到着 午前中に2時間〜3時間の釣りを楽しむ 昼食は島内の食事処で新鮮な海の幸を堪能 午後は篠島の観光スポットを巡る 夕方の船で帰路につく 1泊2日プラン：\n1日目：午後の船で篠島に到着し、島内を散策 島内の宿泊施設に宿泊（温泉を楽しむことも可能） 2日目：朝一番で篠島釣り天国で釣りを楽しむ 昼頃に島を出発 船の運行時間は季節や天候によって変更になることがあるため、必ず事前に確認しましょう。\n近隣の観光スポットやグルメ情報 \u0026nbsp; 篠島には、釣りの合間に立ち寄れる観光スポットや名物グルメがあります。\n観光スポット：\n篠島灯台：島の最高地点にある灯台で、伊勢湾を一望できます 浦磯海水浴場：美しい砂浜と透明度の高い海が魅力の海水浴場 篠島観光案内所：島の歴史や文化を紹介する展示があります グルメスポット：\n篠島は新鮮な海の幸が自慢で、島内の食事処では獲れたての魚介類を味わえます 「篠島しらす」や「たこ」は島の名物で、特におすすめです 釣った魚を調理してもらえる食事処もあります（要確認） 近隣の宿泊施設やレンタサイクルを探すなら \u0026nbsp; 宿泊施設：\n【最安】民宿 篠島荘（一泊2食付き8,000円〜） 【平均】旅館 篠島観光ホテル（一泊2食付き12,000円〜） 【高くてもいい】篠島ロイヤルホテル（一泊2食付き18,000円〜） レンタサイクル：\n港周辺の観光案内所やホテルで借りることができます（約500円/日） 島内はサイクリングに最適なサイズで、主要スポットを効率よく巡ることができます 釣った魚を宿で調理してもらえるプランもあるため、事前に確認しておくとよいでしょう。\n実際に利用したユーザーの声を抜粋 \u0026nbsp; （40代男性）★★★★★｜5.0 \u0026nbsp; 「手軽に海釣りを楽しめる素晴らしいスポットです。離島という特別な環境で釣りができるのが魅力的。2時間のコースでマダイとクロダイが釣れて大満足でした。スタッフの方々も親切で、初心者の私にも丁寧に教えてくださいました。」\n（30代女性）★★★★★｜5.0 \u0026nbsp; 「家族旅行で利用しましたが、子供たちも釣りを楽しめる環境が整っていて良かったです。女性や子供は3,000円とリーズナブルな料金設定も嬉しいポイント。アジがたくさん釣れて、子供たちも大喜びでした。」\n（50代男性）★★★★★｜5.0 \u0026nbsp; 「1泊2日で篠島を訪れ、釣り天国を利用しました。島の景色を眺めながらの釣りは格別です。ハマチが釣れた時は本当に興奮しました！釣った魚は宿で調理してもらい、新鮮な味を堪能できました。」\n（20代女性）★★★★★｜5.0 \u0026nbsp; 「初めての海釣りでしたが、レンタル竿とエサをお借りして手ぶらで楽しむことができました。2時間で4,000円というのも、高級魚が釣れることを考えるとコスパが良いと思います。篠島自体も素敵な場所なので、釣りと観光の両方を楽しめました。」\n【まとめ】篠島釣り天国をおすすめしたい度 \u0026nbsp; 篠島釣り天国は、離島という特別な環境で本格的な海釣りを手軽に楽しめる施設です。特に以下のような方におすすめできる施設です：\n観光と釣りを組み合わせた特別な体験を求める方 初心者や家族連れでも安心して楽しめる釣り場を探している方 リーズナブルな料金で高級魚を狙いたい方 手ぶらで釣りを楽しみたい方 離島の自然や文化も一緒に体験したい方 2時間4,000円（女性・子供は3,000円）という料金設定は、マダイやハマチなどの高級魚が釣れることを考えると非常にリーズナブルです。釣果制限（タイ・ハマチは4匹まで）はありますが、一般的な釣果を考えれば十分な量と言えるでしょう。\n篠島へのアクセスには船での移動が必要ですが、それも旅の一部として楽しめます。島内には宿泊施設や食事処も充実しているため、1泊2日のプランを立てれば、より充実した釣り体験と島の観光を楽しむことができます。\n営業期間は4月1日から12月末までと季節限定であり、時期によって釣れる魚種も変わります。春から夏はマダイやハマチ、秋はクロダイやヒラメなど、季節ごとの魚種を狙って訪れるのもおすすめです。\n篠島釣り天国は、離島という非日常的な環境で本格的な海釣りを手軽に楽しめる貴重な施設です。愛知県の離島・篠島の美しい景色と豊かな海の恵みを同時に体験できる、特別な釣りスポットとして高くおすすめします。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 1,
        href: "/aichi/shinmaiko-marine-park-fishing/",
        title: "【愛知県】新舞子マリンパーク魚釣り施設｜無料で700mの広大...",
        description: "愛知県知多市に位置する「新舞子マリンパーク魚釣り施設」は、利用料無料で楽しめる全長700m以上の広大な釣り場です。伊勢湾を一望できる美しい景観の中、シーバス、クロダイ、アジ、サバなど四季折々の多彩な魚種を狙うことができます。",
        
        
        content: "愛知県知多市に位置する「新舞子マリンパーク魚釣り施設」は、利用料無料で楽しめる全長700m以上の広大な釣り場です。\n伊勢湾を一望できる美しい景観の中、シーバス、クロダイ、アジ、サバなど四季折々の多彩な魚種を狙うことができます。早朝5:15から夜20:00まで営業しており、平日は駐車場も無料で利用できるため、コストを抑えながら本格的な海釣りを楽しめる人気スポットとなっています。\n家族連れでも安心して利用できる環境が整っており、特に子供たちの釣り入門の場としても最適です。波止釣りならではの醍醐味を味わいながら、名古屋市内からもアクセスしやすいこの施設は、初心者から上級者まで幅広い釣り愛好家に支持されています。\n新舞子マリンパーク 魚釣り施設の基本情報 \u0026nbsp; 場所: 〒478-0000 愛知県知多市緑浜2 営業時間: 5:15～20:00（門扉が20:00で閉じる） 定休日: 年中無休 平均予算: 無料（駐車場は浜開き期間中と土日祝日は1回500円） レンタル: ライフジャケット2,000円 釣具の持ち込み: 可能 釣れる魚: シーバス、アイナメ、メバル、マゴチ、タチウオ、カレイ、ハゼ、アジ、サバ、コノシロ、ボラ、タコ、カサゴ、クロダイなど 注意事項: 12歳以下の子供は必ず16歳以上の大人が同伴すること。釣り竿は1人2本まで。礒の赤土、おからなどを使った「だんご釣り」「ウキフカセ」など、大量の撒き餌を使う釣りは禁止。 ウェブサイト: 新舞子マリンパーク 料金体系について \u0026nbsp; 新舞子マリンパーク 魚釣り施設は、釣り場の利用自体は完全無料で楽しむことができます。入場料や施設利用料が一切かからないため、釣り道具を持参すれば、非常にリーズナブルに海釣りを楽しめます。\n駐車場料金：\n平日：無料 土日祝日および浜開き期間中：1回500円 駐車場は新舞子マリンパーク内にあり、釣り場へのアクセスも便利です。平日は駐車場も無料で利用できるため、平日に訪れるとさらにコストを抑えることができます。\nレンタル料金：\nライフジャケット：2,000円 釣具のレンタルサービスはありませんので、釣り道具は各自で持参する必要があります。安全のため、ライフジャケットのレンタルサービスが用意されています。\nこの料金体系は、コストを抑えて釣りを楽しみたい方や、家族連れにとって魅力的な設定です。特に釣りを始めたばかりの初心者や、お子様の釣り教育にも最適な環境と言えるでしょう。\n注意事項と補足データ \u0026nbsp; 12歳以下のお子様は必ず16歳以上の大人が同伴する必要があります 釣り竿は1人2本までの利用制限があります 礒の赤土、おからなどを使った「だんご釣り」や「ウキフカセ」など、大量の撒き餌を使う釣りは禁止されています 20:00に門扉が閉じるため、退出時間に注意が必要です 風が強い日や悪天時は利用を控えるようにしましょう 夏場は日差しが強いため、帽子や日焼け止めなどの暑さ対策が必要です 冬場は防寒対策を十分に行いましょう トイレは施設内に完備されています 飲料の自動販売機もありますが、長時間滞在する場合は飲食物の持参をおすすめします 釣った魚を持ち帰る場合は、クーラーボックスなどの準備をしておくと便利です ゴミは必ず持ち帰るか、指定されたゴミ箱に分別して捨ててください 全長700mの広い釣り場があるため、混雑時でも比較的快適に釣りを楽しめます 車からの荷物の運搬が容易なように、カートやリュックサックの利用をおすすめします 新舞子マリンパーク 魚釣り施設のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 新舞子マリンパーク 魚釣り施設では季節によって様々な魚種を狙うことができます。ここでは、主な魚種3種類についてのおすすめ仕掛けと釣りのコツをご紹介します。\nシーバス（スズキ）を狙う場合 \u0026nbsp; シーバスは主に春と秋に活性が高まる高級魚で、特に夕方から夜にかけての釣りがおすすめです。\n推奨タックル：\n竿：2.7m～3.3mのシーバスロッド リール：3000～4000番クラスのスピニングリール 道糸：PE1.0～1.5号 リーダー：フロロカーボン16～20lb ルアー：ミノー、バイブレーション、メタルジグなど 釣り方のコツ：\nルアーフィッシングが基本ですが、活きエサ（イワシやアジなど）を使った釣りも効果的です 夕方から夜にかけての時間帯がおすすめです 潮の流れが変わる時間帯に釣果が期待できます 防波堤の先端や構造物周辺に魚が集まりやすいため、そういった場所を重点的に狙います シーバスは警戒心が強いため、足音や光に注意して静かに釣りを行いましょう 特に雨の後や濁り潮の時は活性が高まることがあります 春（3月～5月）と秋（9月～11月）が最も釣れる時期ですが、夏の夜間も狙い目です アジ・サバを狙う場合 \u0026nbsp; アジやサバは主に夏から秋にかけて回遊してくる魚種で、数釣りが楽しめます。\n推奨タックル：\n竿：2.7m～3.6mの磯竿または投げ竿 リール：2000～3000番クラスのスピニングリール 道糸：2号～3号のナイロンライン 仕掛け：サビキ仕掛け5号～7号 釣り方のコツ：\nサビキ釣りが最も効果的です オキアミやアミエビなどの小さめのエサを使用します 水深1m～5mを探りながら釣るとよいでしょう アジやサバは群れで行動するため、一度釣れ始めると連続して釣れることがあります 朝夕の時間帯に活性が高まることが多いですが、時期によっては日中でもよく釣れます 潮の流れが変わる時間帯は特によく釣れることがあります 夏から秋にかけてのサビキシーズンは特に釣果が期待できます クロダイ（チヌ）・メバルを狙う場合 \u0026nbsp; クロダイは年間を通して釣れる人気魚種で、メバルは冬から春にかけてよく釣れます。\nクロダイ向け推奨タックル：\n竿：3.6m～4.5mの磯竿 リール：2500～3000番クラスのスピニングリール 道糸：2号～3号のナイロンライン ハリス：1.5号～2号のフロロカーボン 針：クロダイ針2号～4号 メバル向け推奨タックル：\n竿：2.1m～2.7mの磯竿またはメバル専用竿 リール：1000～2000番クラスのスピニングリール 道糸：1号程度のナイロンライン ハリス：0.8号～1.5号のフロロカーボン 針：メバル針7号～12号 釣り方のコツ：\nクロダイはオキアミ、アオイソメ、練り餌などがよく釣れます メバルはイソメやアオイソメなどの虫エサが効果的です クロダイは底付近を、メバルは中層から表層を狙うとよいでしょう クロダイは朝夕の時間帯、メバルは夕方から夜にかけてが狙い目です クロダイは警戒心が強いため、目立たないように静かに釣りをすることが重要です メバルは夜間に活性が高まるため、ヘッドライトなどの照明器具を準備すると便利です 防波堤の足元や構造物の周りによく集まるため、そういったポイントを重点的に狙います 新舞子マリンパーク 魚釣り施設へのおすすめアクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 「新舞子マリンパーク 魚釣り施設」は車でのアクセスが最も便利です。\nルート案内：\n名古屋方面から：知多産業道路を南下 新舞子ICで降りて、国道247号線を進む マリンパーク方面の案内看板に従って進む 名古屋市内からは約30分、セントレアから約20分程度でアクセスできます。駐車場は新舞子マリンパーク内にあり、平日は無料、土日祝日および浜開き期間中は1回500円です。\n公共交通機関でのアクセス \u0026nbsp; 公共交通機関でのアクセスも可能です。\nルート案内：\n名鉄常滑線「新舞子駅」下車 駅から徒歩10～15分 バスでのアクセスも可能ですが、本数が限られているため、事前に時刻表を確認しておくことをおすすめします。\n釣り場の特性を考慮したアクセスプラン \u0026nbsp; 新舞子マリンパーク 魚釣り施設は、5:15から20:00までの営業時間内であれば自由に利用することができます。魚種や時期によって、最適な訪問時間が異なります。\n早朝釣りプラン： 5:15の開門と同時に入場し、魚の活性が高い朝の時間帯に釣りを楽しむプランです。特に夏場は涼しい早朝がおすすめです。朝食を持参して、釣りと朝食を楽しむのもよいでしょう。\n日中釣りプラン： 9時～15時頃に訪れ、日中の釣りを楽しむプランです。家族連れやレジャーとして釣りを楽しむ方に適しています。昼食を持参するか、近隣の飲食店で食事をすることもできます。\n夕方釣りプラン： 16時～20時に訪れ、夕方の釣りを楽しむプランです。シーバスなどの高級魚を狙う場合は、この時間帯がおすすめです。20:00に門扉が閉じるため、退出時間には十分注意しましょう。\n早朝から釣りをしたいなら、前日にホテル泊してレンタカー移動が無難でしょう。その他の時間も余裕があるので、電車利用でも大丈夫ですが、釣具のレンタルがないのがネックになります。\n近隣の観光スポットやグルメ情報 \u0026nbsp; 新舞子マリンパーク周辺には、釣りの合間に立ち寄れる観光スポットやグルメスポットがあります。\n観光スポット：\n新舞子海水浴場：夏には多くの海水浴客で賑わう人気ビーチ（徒歩圏内） 知多市歴史民俗博物館：地域の歴史と文化を学べる施設（車で約15分） 岡田の古い町並み：江戸時代から続く歴史的な街並みが残る地区（車で約10分） グルメスポット：\n新舞子マリンパーク内のレストラン：新鮮な魚介類を使った料理が楽しめます 知多半島名物のたこ料理や海鮮料理を提供する店舗が多数あります カフェや軽食コーナーも充実しているため、休憩にも最適です 近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 宿泊施設：\n【最安】ビジネスホテル知多（知多市・一泊5,000円～） 【平均】新舞子ガーデンホテル（知多市・一泊12,000円～） 【高くてもいい】海辺の料理宿 枡海風（南知多町・一泊18,000円～） レンタカー：\n【最安】ニッポンレンタカー セントレア店（コンパクトカー5,500円/日～） 【平均】トヨタレンタカー セントレア店（コンパクトカー7,000円/日～） 【高くてもいい】日産レンタカー セントレア店（ミニバン12,000円/日～） 名古屋や中部国際空港（セントレア）からのアクセスが良好なため、日帰りでの利用も十分可能です。ただし、早朝からの釣りを楽しみたい場合は、近隣に宿泊するプランもおすすめです。\n実際に利用したユーザーの声を抜粋 \u0026nbsp; （40代男性）★★★★★｜5.0 \u0026nbsp; 「広い釣り場があるので、混雑していても自分のスペースを確保しやすいのが魅力です。無料で利用できるのに、トイレなどの設備も整っていて快適です。子供と一緒に利用していますが、アジやサバがよく釣れるので、子供の釣り教育にぴったりです。」\n（30代男性）★★★★☆｜4.0 \u0026nbsp; 「平日は駐車場も無料なので、コストを抑えて釣りを楽しめます。夕方からのシーバス釣りが特に楽しく、季節によっては良型も狙えます。700mもの広さがあるので、場所取りの心配もあまりなく、のびのびと釣りができます。」\n（30代女性）★★★★★｜5.0 \u0026nbsp; 「家族で利用していますが、子供たちも安全に釣りを楽しめる環境が整っています。12歳以下の大人の同伴が必要というルールも、安全面を考えると安心できます。サビキ釣りでアジがたくさん釣れて、子供たちも大喜びでした。」\n（20代女性）★★★★☆｜4.0 \u0026nbsp; 「初めて釣りにチャレンジしましたが、広い釣り場なので他の釣り人に迷惑をかける心配が少なく、気軽に楽しめました。メバルやカサゴが意外と簡単に釣れて驚きました。マリンパーク内には食事ができる場所もあるので、一日中楽しめるスポットです。」\n【まとめ】新舞子マリンパーク 魚釣り施設をおすすめしたい度 \u0026nbsp; 新舞子マリンパーク 魚釣り施設は、無料で利用できる全長700mの広大な釣り場を持つ魅力的な施設です。特に以下のような方におすすめできる施設です：\nコストを抑えて本格的な海釣りを楽しみたい方 家族連れや子供と一緒に釣りを体験したい方 初心者から上級者まで、幅広いレベルの釣り愛好家 名古屋や中部国際空港からアクセスしやすい場所で釣りを楽しみたい方 多様な魚種を一年を通して狙いたい方 利用料金が無料で、平日は駐車場も無料という点は大きな魅力です。また、全長700mという広大な釣り場があるため、混雑時でも自分のスペースを確保しやすく、快適に釣りを楽しむことができます。\n年間を通して様々な魚種が釣れますが、特におすすめの時期と魚種は以下の通りです：\n春（3月～5月）：シーバス、メバル、クロダイなど 夏（6月～8月）：アジ、サバ、タチウオなど 秋（9月～11月）：シーバス、クロダイ、アオリイカなど 冬（12月～2月）：カレイ、メバル、カサゴなど 12歳以下のお子様は16歳以上の大人の同伴が必要など、安全面に配慮したルールも設けられているため、家族連れでも安心して利用できます。ただし、20:00に門扉が閉じるため、退出時間には注意が必要です。\n新舞子マリンパーク 魚釣り施設は、リーズナブルに海釣りを楽しめる施設として、地元の釣り愛好家はもちろん、観光で訪れる方にもおすすめのスポットです。マリンパーク内には飲食施設も充実しているため、釣りの合間の休憩や食事も楽しむことができます。四季折々の魚種を狙える環境と、充実した施設環境を生かして、思い出に残る釣り体験をしてみてはいかがでしょうか。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 2,
        href: "/aichi/bakucho-mihama-fishing-park/",
        title: "【愛知県】爆釣 美浜フィッシングパーク｜高級魚が狙える知多半...",
        description: "愛知県知多半島の美浜町に位置する「爆釣 美浜フィッシングパーク」は、その名の通り豊富な釣果が期待できる人気の釣り堀です。  マダイ、ブリ、カンパチ、ヒラマサといった高級魚を中心に、多彩な魚種が泳ぐイケスで釣りを楽しむことができます。一般利用はもちろん、グループでの貸切利用にも対応しており、地引網体験やすくい取り体験など、釣り以外のアクティビティも楽しめる総合的なレジャー施設となっています。  釣り初心者からファミリー、フィッシングマニアまで幅広く対応し、手ぶらでも貸竿を借りて手軽に釣り体験ができる環境が整っています。一日を通して釣りを楽しみたい方から、午前・午後の短時間で楽しみたい方まで、ニーズに合わせたコース設定も魅力です。   爆釣 美浜フィッシングパークの基本情報  - 場所: 〒470-2413 愛知県知多郡美浜町大字古布字屋敷189-1 - 営業時間: 7:00～16:00（受付6:30から） - 定休日: 月曜日（祝日は営業、翌平日に代休） - 平均予算: 大人6,000円〜12,000円、女性・子供5,000円〜8,800円 - レンタル: 貸竿1本1,100円（ウキ釣り仕掛け付き） - 釣具の持ち込み: 可能（投げ釣りかウキ釣りがおすすめ） - 釣れる魚: マダイ、ブリ、カンパチ、ヒラマサ、シマアジ、ヒラメ、クロソイ、イシダイなど - 注意事項: エサの販売はないので事前に用意が必要。撒き餌・ひっかけ釣り・ルアーなど疑似餌の使用は禁止。貸竿のシェア禁止。竿の複数使用禁止。 - ウェブサイト: [爆釣 美浜フィッシングパーク](https://bakuchoumihama.jimdofree.com/)   料金体系について  爆釣 美浜フィッシングパークは、一般利用と貸切利用の二つの料金体系があります。  【一般利用】  |コース|大人|女性・子供|時間| |---|---|---|---| |1日コース|12,000円|8,800円|7:00~16:00| |午前コース|8,000円|6,000円|7:00~12:00| |午後コース|6,000円|5,000円|12:00~16:00|  ※子供は小学生以下が対象  【貸切利用】（10人までの価格。10人以上は1人につき6,000円の追加料金）  |コース|大池/中池|小池|時間| |---|---|---|---| |平日|61,000円|50,000円|14:00頃終了| |土日祝|73,000円|61,000円|14:00頃終了|  貸切コースでは、14:00頃まで釣りを楽しんだ後、大池/中池コースでは地引網体験、小池コースでは水を抜いてのすくい取り体験ができます。また、貸切コースのみバーベキュー施設の利用が可能です。  料金は釣り放題制となっており、釣った魚は全て持ち帰ることができます。特に高級魚が多く放流されているため、料金に見合った釣果が期待できる施設です。   注意事項と補足データ  - エサの販売は施設内でないため、事前に用意するか、近隣のエサ屋で購入する必要があります - 「冷凍エビ・貝のむき身・団子などコマセ・オキアミ・魚の切り身」などは水質保全のため使用不可となっています - 使用可能なエサについては、施設に事前に確認することをおすすめします - 一般利用は予約不要で入場可能ですが、貸切利用は事前予約が必要です - イケス内の魚は季節によって変わりますので、釣りたい魚種がある場合は事前に確認するとよいでしょう - 貸竿のシェアや竿の複数使用は禁止されています - 撒き餌・ひっかけ釣り・ルアーなどの疑似餌の使用も禁止されています - 施設内での安全には十分注意し、ライフジャケットの着用をおすすめします - 夏場は日差しが強いため、帽子や日焼け止めなどの暑さ対策が必要です - 冬場は防寒対策をしっかりと行いましょう - 雨天時も営業していますが、荒天時は休業する場合があります - 貸切コースを利用する場合は、早めの予約が必要です   爆釣 美浜フィッシングパークのおすすめ仕掛け・釣りのコツなどの情報  爆釣 美浜フィッシングパークでは、主に投げ釣りやウキ釣りが有効です。ここでは、主な魚種3種類についてのおすすめ仕掛けと釣りのコツをご紹介します。   マダイを狙う場合  マダイは「爆釣 美浜フィッシングパーク」の主力魚種の一つです。  推奨タックル（レンタル利用の場合）：  - 竿：施設でレンタルできる竿（ウキ釣り仕掛け付き）  持ち込みの場合の推奨タックル：  - 竿：7:3調子の磯竿（2.7m〜3.6m） - リール：3000〜4000番クラスのスピニングリール - 道糸：3号〜4号のナイロンライン - ハリス：2号〜3号のフロロカーボン - 針：マダイ針8号〜10号 - ウキ：中通しウキ（チヌボール）など  釣り方のコツ：  - 生きたエビなどの活きエサが効果的です - ウキを使って適切な棚（水深）を探りましょう - 魚の活性が高い朝夕の時間帯がおすすめです - アタリがあったら少し間を置いてから合わせるとフッキング率が上がります - 竿を立てすぎず、適度に弾力を持たせるようにしましょう - マダイが食いついてきたら根に持っていかれないよう、すぐに浮かせるようにします   ブリ・カンパチ・ヒラマサを狙う場合  ブリ、カンパチ、ヒラマサなどの青物は、引きの強さが特徴の人気魚種です。  推奨タックル：  - 竿：硬めの磯竿または船竿（3.0m〜3.6m） - リール：4000〜5000番クラスのパワーのあるスピニングリール - 道糸：5号〜8号のナイロンラインまたはPEライン2号程度 - ハリス：5号〜8号のフロロカーボン - 針：丸セイゴ8号〜12号  釣り方のコツ：  - 青物はパワーがあるため、タックルはやや強めのものを選びましょう - ドラグ調整を適切に行い、急激な引きに対応できるようにします - 活きイワシやエビなどの活きエサが効果的です - 魚が掛かったら、一気に寄せるのではなく、徐々に浮かせるようにします - 特に大型の個体は、根に潜る習性があるため、早めに浮かせることが重要です - 周囲の釣り人に迷惑をかけないよう、広めのスペースを確保するとよいでしょう   イシダイ・クロソイを狙う場合  イシダイやクロソイは、美味しさと引きの強さで人気の高級魚です。  推奨タックル：  - 竿：7:3調子の磯竿（2.7m〜3.6m） - リール：3000〜4000番クラスのスピニングリール - 道糸：3号〜5号のナイロンライン - ハリス：3号〜5号のフロロカーボン - 針：イシダイ針8号〜10号  釣り方のコツ：  - イシダイはアオイソメなどの虫エサ、クロソイはエビ類が効果的です - 底付近を狙うとよいでしょう - アタリは繊細なことが多いので、集中して竿先を見ることが重要です - 合わせは強めに入れましょう - 掛かった後は一気に寄せず、徐々に引き上げるようにします - 特にイシダイは歯が鋭いため、ハリスを傷つけることがあります。定期的にハリスを確認し、必要に応じて交換しましょう   爆釣 美浜フィッシングパークへのおすすめアクセス情報   車でのアクセス  「爆釣 美浜フィッシングパーク」は車でのアクセスが最も便利です。  ルート案内：  1. 名古屋方面から：知多半島道路を南下 2. 美浜ICで降りて、国道247号線を南知多方面へ 3. 案内看板に従って施設へ  名古屋市内からは約1時間、セントレアから約40分程度でアクセスできます。駐車場は施設内に完備されています。   公共交通機関でのアクセス  公共交通機関でのアクセスもできますが、最終目的地までは少し距離があります。  ルート案内：  1. 名鉄知多新線「河和駅」下車 2. タクシーで約10分、または路線バスで「古布」バス停下車後、徒歩約15分  バスでのアクセスもできますが、本数が限られているため、事前に時刻表を確認しておくことをおすすめします。   釣り堀の特性を考慮したアクセスプラン  爆釣 美浜フィッシングパークは、7:00から16:00まで（受付は6:30から）の営業となっています。コースによって利用可能な時間が異なるため、目的に合わせたプランを立てるとよいでしょう。  1日コース利用プラン： 早朝6:30頃に到着し、受付を済ませてから1日を通して釣りを楽しむプランです。朝は魚の活性が高いため、早めの到着がおすすめです。昼食は持参するか、近隣の飲食店で取ることができます。  午前コース利用プラン： 朝7:00から12:00までの半日で釣りを楽しむプランです。午後は知多半島の観光スポットを巡るなど、他のアクティビティと組み合わせるのもおすすめです。  午後コース利用プラン： 午前中に知多半島の観光を楽しんだ後、12:00から16:00まで釣りを楽しむプランです。午前よりもリーズナブルな料金設定となっています。  貸切利用プラン： グループでの利用に最適な貸切プランです。14:00頃まで釣りを楽しんだ後、地引網体験やすくい取り体験、バーベキューなど、釣り以外のアクティビティも含めた一日を過ごせます。   近隣の観光スポットやグルメ情報  爆釣 美浜フィッシングパーク周辺には、釣りの合間に立ち寄れる観光スポットやグルメスポットがあります。  観光スポット：  - 美浜町観光協会 海の家（車で約10分）：ビーチや海水浴を楽しめます - 野間大坊（車で約15分）：国宝に指定されている歴史的建造物 - 南知多ビーチランド（車で約20分）：水族館とテーマパークが一体となった施設  グルメスポット：  - 知多半島名物の海鮮料理を提供するレストランが多数あります - えびせんべいの里（車で約15分）：知多半島名物のえびせんべいの製造直売所 - 美浜の道の駅（車で約10分）：地元の新鮮な農産物や海産物を販売しています   近隣の宿泊施設やレンタカーを探すなら  宿泊施設：  - 【最安】民宿 海の家（美浜町・一泊6,500円〜） - 【平均】美浜温泉 ホテル魚半（美浜町・一泊12,000円〜） - 【高くてもいい】南知多温泉 源氏香（南知多町・一泊18,000円〜）  レンタカー：  - 【最安】ニッポンレンタカー セントレア店（コンパクトカー5,500円/日〜） - 【平均】トヨタレンタカー セントレア店（コンパクトカー7,000円/日〜） - 【高くてもいい】日産レンタカー セントレア店（ミニバン12,000円/日〜）  釣った魚をすぐに調理してもらえる民宿やホテルもあるので、一泊して釣果を味わうのもおすすめです。   実際に利用したユーザーの声を抜粋   （40代男性）★★★★★｜5.0  \u003e 「施設名の通り、本当に爆釣でした！マダイが5匹も釣れて大満足です。家族で利用しましたが、子供たちも楽しめる環境が整っていて良かったです。」   （30代男性）★★★★★｜5.0  \u003e 「貸切コースで利用しました。釣りだけでなく、地引網体験やバーベキューも楽しめて、社員旅行に最適でした。スタッフの方々も親切で、初心者にも丁寧に教えてくれます。」   （20代女性）★★★★★｜5.0  \u003e 「初めて釣りに挑戦しましたが、貸竿を借りて手ぶらで楽しむことができました。エサは近くのお店で購入。カンパチが釣れた時は本当に興奮しました！」   （50代男性）★★★★★｜5.0  \u003e 「平日の午後コースを利用しましたが、空いていて快適に釣りを楽しめました。料金もリーズナブルで、釣果も十分。ヒラマサが釣れたのが特に嬉しかったです。」   【まとめ】爆釣 美浜フィッシングパークをおすすめしたい度  爆釣 美浜フィッシングパークは、名前の通り豊富な釣果が期待できる釣り堀施設です。特に以下のような方におすすめできる施設です：  - 高級魚を狙いたい釣り愛好家 - 家族や友人とのレジャーとして釣りを楽しみたい方 - 釣りだけでなく、地引網体験やバーベキューなど複合的な楽しみ方をしたい方 - 初心者から上級者まで、幅広いレベルの釣り人 - 貸切で特別な日のイベントとして釣りを楽しみたいグループ  料金設定は一般的な釣り堀よりもやや高めですが、マダイ、ブリ、カンパチ、ヒラマサなどの高級魚が釣れる確率が高く、その価値は十分にあると言えるでしょう。また、一般利用と貸切利用の選択肢があり、目的や人数に合わせて最適なプランを選ぶことができます。  注意点としては、エサの販売が施設内にないため、事前に用意するか近隣のエサ屋で購入する必要があります。また、使用できるエサの種類に制限があるため、事前に確認しておくとよいでしょう。  年間を通して様々な魚種が釣れますが、特におすすめの時期は春から秋にかけてです。夏休みなどの繁忙期は混雑することがあるため、平日や閑散期の利用がより快適に釣りを楽しめるでしょう。  月曜日が定休日（祝日は営業、翌平日に代休）となっているため、訪問予定日が休業日と重ならないよう、事前に確認することをおすすめします。  知多半島の美しい自然環境の中で、高級魚を狙える「爆釣 美浜フィッシングパーク」は、釣り初心者から上級者まで、また家族連れやグループでも楽しめる総合的な釣りレジャー施設として、高くおすすめできるスポットです。",
        
        
        content: "愛知県知多半島の美浜町に位置する「爆釣 美浜フィッシングパーク」は、その名の通り豊富な釣果が期待できる人気の釣り堀です。\nマダイ、ブリ、カンパチ、ヒラマサといった高級魚を中心に、多彩な魚種が泳ぐイケスで釣りを楽しむことができます。一般利用はもちろん、グループでの貸切利用にも対応しており、地引網体験やすくい取り体験など、釣り以外のアクティビティも楽しめる総合的なレジャー施設となっています。\n釣り初心者からファミリー、フィッシングマニアまで幅広く対応し、手ぶらでも貸竿を借りて手軽に釣り体験ができる環境が整っています。一日を通して釣りを楽しみたい方から、午前・午後の短時間で楽しみたい方まで、ニーズに合わせたコース設定も魅力です。\n爆釣 美浜フィッシングパークの基本情報 \u0026nbsp; 場所: 〒470-2413 愛知県知多郡美浜町大字古布字屋敷189-1 営業時間: 7:00～16:00（受付6:30から） 定休日: 月曜日（祝日は営業、翌平日に代休） 平均予算: 大人6,000円〜12,000円、女性・子供5,000円〜8,800円 レンタル: 貸竿1本1,100円（ウキ釣り仕掛け付き） 釣具の持ち込み: 可能（投げ釣りかウキ釣りがおすすめ） 釣れる魚: マダイ、ブリ、カンパチ、ヒラマサ、シマアジ、ヒラメ、クロソイ、イシダイなど 注意事項: エサの販売はないので事前に用意が必要。撒き餌・ひっかけ釣り・ルアーなど疑似餌の使用は禁止。貸竿のシェア禁止。竿の複数使用禁止。 ウェブサイト: 爆釣 美浜フィッシングパーク 料金体系について \u0026nbsp; 爆釣 美浜フィッシングパークは、一般利用と貸切利用の二つの料金体系があります。\n【一般利用】\nコース 大人 女性・子供 時間 1日コース 12,000円 8,800円 7:00~16:00 午前コース 8,000円 6,000円 7:00~12:00 午後コース 6,000円 5,000円 12:00~16:00 ※子供は小学生以下が対象\n【貸切利用】（10人までの価格。10人以上は1人につき6,000円の追加料金）\nコース 大池/中池 小池 時間 平日 61,000円 50,000円 14:00頃終了 土日祝 73,000円 61,000円 14:00頃終了 貸切コースでは、14:00頃まで釣りを楽しんだ後、大池/中池コースでは地引網体験、小池コースでは水を抜いてのすくい取り体験ができます。また、貸切コースのみバーベキュー施設の利用が可能です。\n料金は釣り放題制となっており、釣った魚は全て持ち帰ることができます。特に高級魚が多く放流されているため、料金に見合った釣果が期待できる施設です。\n注意事項と補足データ \u0026nbsp; エサの販売は施設内でないため、事前に用意するか、近隣のエサ屋で購入する必要があります 「冷凍エビ・貝のむき身・団子などコマセ・オキアミ・魚の切り身」などは水質保全のため使用不可となっています 使用可能なエサについては、施設に事前に確認することをおすすめします 一般利用は予約不要で入場可能ですが、貸切利用は事前予約が必要です イケス内の魚は季節によって変わりますので、釣りたい魚種がある場合は事前に確認するとよいでしょう 貸竿のシェアや竿の複数使用は禁止されています 撒き餌・ひっかけ釣り・ルアーなどの疑似餌の使用も禁止されています 施設内での安全には十分注意し、ライフジャケットの着用をおすすめします 夏場は日差しが強いため、帽子や日焼け止めなどの暑さ対策が必要です 冬場は防寒対策をしっかりと行いましょう 雨天時も営業していますが、荒天時は休業する場合があります 貸切コースを利用する場合は、早めの予約が必要です 爆釣 美浜フィッシングパークのおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 爆釣 美浜フィッシングパークでは、主に投げ釣りやウキ釣りが有効です。ここでは、主な魚種3種類についてのおすすめ仕掛けと釣りのコツをご紹介します。\nマダイを狙う場合 \u0026nbsp; マダイは「爆釣 美浜フィッシングパーク」の主力魚種の一つです。\n推奨タックル（レンタル利用の場合）：\n竿：施設でレンタルできる竿（ウキ釣り仕掛け付き） 持ち込みの場合の推奨タックル：\n竿：7:3調子の磯竿（2.7m〜3.6m） リール：3000〜4000番クラスのスピニングリール 道糸：3号〜4号のナイロンライン ハリス：2号〜3号のフロロカーボン 針：マダイ針8号〜10号 ウキ：中通しウキ（チヌボール）など 釣り方のコツ：\n生きたエビなどの活きエサが効果的です ウキを使って適切な棚（水深）を探りましょう 魚の活性が高い朝夕の時間帯がおすすめです アタリがあったら少し間を置いてから合わせるとフッキング率が上がります 竿を立てすぎず、適度に弾力を持たせるようにしましょう マダイが食いついてきたら根に持っていかれないよう、すぐに浮かせるようにします ブリ・カンパチ・ヒラマサを狙う場合 \u0026nbsp; ブリ、カンパチ、ヒラマサなどの青物は、引きの強さが特徴の人気魚種です。\n推奨タックル：\n竿：硬めの磯竿または船竿（3.0m〜3.6m） リール：4000〜5000番クラスのパワーのあるスピニングリール 道糸：5号〜8号のナイロンラインまたはPEライン2号程度 ハリス：5号〜8号のフロロカーボン 針：丸セイゴ8号〜12号 釣り方のコツ：\n青物はパワーがあるため、タックルはやや強めのものを選びましょう ドラグ調整を適切に行い、急激な引きに対応できるようにします 活きイワシやエビなどの活きエサが効果的です 魚が掛かったら、一気に寄せるのではなく、徐々に浮かせるようにします 特に大型の個体は、根に潜る習性があるため、早めに浮かせることが重要です 周囲の釣り人に迷惑をかけないよう、広めのスペースを確保するとよいでしょう イシダイ・クロソイを狙う場合 \u0026nbsp; イシダイやクロソイは、美味しさと引きの強さで人気の高級魚です。\n推奨タックル：\n竿：7:3調子の磯竿（2.7m〜3.6m） リール：3000〜4000番クラスのスピニングリール 道糸：3号〜5号のナイロンライン ハリス：3号〜5号のフロロカーボン 針：イシダイ針8号〜10号 釣り方のコツ：\nイシダイはアオイソメなどの虫エサ、クロソイはエビ類が効果的です 底付近を狙うとよいでしょう アタリは繊細なことが多いので、集中して竿先を見ることが重要です 合わせは強めに入れましょう 掛かった後は一気に寄せず、徐々に引き上げるようにします 特にイシダイは歯が鋭いため、ハリスを傷つけることがあります。定期的にハリスを確認し、必要に応じて交換しましょう 爆釣 美浜フィッシングパークへのおすすめアクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 「爆釣 美浜フィッシングパーク」は車でのアクセスが最も便利です。\nルート案内：\n名古屋方面から：知多半島道路を南下 美浜ICで降りて、国道247号線を南知多方面へ 案内看板に従って施設へ 名古屋市内からは約1時間、セントレアから約40分程度でアクセスできます。駐車場は施設内に完備されています。\n公共交通機関でのアクセス \u0026nbsp; 公共交通機関でのアクセスもできますが、最終目的地までは少し距離があります。\nルート案内：\n名鉄知多新線「河和駅」下車 タクシーで約10分、または路線バスで「古布」バス停下車後、徒歩約15分 バスでのアクセスもできますが、本数が限られているため、事前に時刻表を確認しておくことをおすすめします。\n釣り堀の特性を考慮したアクセスプラン \u0026nbsp; 爆釣 美浜フィッシングパークは、7:00から16:00まで（受付は6:30から）の営業となっています。コースによって利用可能な時間が異なるため、目的に合わせたプランを立てるとよいでしょう。\n1日コース利用プラン： 早朝6:30頃に到着し、受付を済ませてから1日を通して釣りを楽しむプランです。朝は魚の活性が高いため、早めの到着がおすすめです。昼食は持参するか、近隣の飲食店で取ることができます。\n午前コース利用プラン： 朝7:00から12:00までの半日で釣りを楽しむプランです。午後は知多半島の観光スポットを巡るなど、他のアクティビティと組み合わせるのもおすすめです。\n午後コース利用プラン： 午前中に知多半島の観光を楽しんだ後、12:00から16:00まで釣りを楽しむプランです。午前よりもリーズナブルな料金設定となっています。\n貸切利用プラン： グループでの利用に最適な貸切プランです。14:00頃まで釣りを楽しんだ後、地引網体験やすくい取り体験、バーベキューなど、釣り以外のアクティビティも含めた一日を過ごせます。\n近隣の観光スポットやグルメ情報 \u0026nbsp; 爆釣 美浜フィッシングパーク周辺には、釣りの合間に立ち寄れる観光スポットやグルメスポットがあります。\n観光スポット：\n美浜町観光協会 海の家（車で約10分）：ビーチや海水浴を楽しめます 野間大坊（車で約15分）：国宝に指定されている歴史的建造物 南知多ビーチランド（車で約20分）：水族館とテーマパークが一体となった施設 グルメスポット：\n知多半島名物の海鮮料理を提供するレストランが多数あります えびせんべいの里（車で約15分）：知多半島名物のえびせんべいの製造直売所 美浜の道の駅（車で約10分）：地元の新鮮な農産物や海産物を販売しています 近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 宿泊施設：\n【最安】民宿 海の家（美浜町・一泊6,500円〜） 【平均】美浜温泉 ホテル魚半（美浜町・一泊12,000円〜） 【高くてもいい】南知多温泉 源氏香（南知多町・一泊18,000円〜） レンタカー：\n【最安】ニッポンレンタカー セントレア店（コンパクトカー5,500円/日〜） 【平均】トヨタレンタカー セントレア店（コンパクトカー7,000円/日〜） 【高くてもいい】日産レンタカー セントレア店（ミニバン12,000円/日〜） 釣った魚をすぐに調理してもらえる民宿やホテルもあるので、一泊して釣果を味わうのもおすすめです。\n実際に利用したユーザーの声を抜粋 \u0026nbsp; （40代男性）★★★★★｜5.0 \u0026nbsp; 「施設名の通り、本当に爆釣でした！マダイが5匹も釣れて大満足です。家族で利用しましたが、子供たちも楽しめる環境が整っていて良かったです。」\n（30代男性）★★★★★｜5.0 \u0026nbsp; 「貸切コースで利用しました。釣りだけでなく、地引網体験やバーベキューも楽しめて、社員旅行に最適でした。スタッフの方々も親切で、初心者にも丁寧に教えてくれます。」\n（20代女性）★★★★★｜5.0 \u0026nbsp; 「初めて釣りに挑戦しましたが、貸竿を借りて手ぶらで楽しむことができました。エサは近くのお店で購入。カンパチが釣れた時は本当に興奮しました！」\n（50代男性）★★★★★｜5.0 \u0026nbsp; 「平日の午後コースを利用しましたが、空いていて快適に釣りを楽しめました。料金もリーズナブルで、釣果も十分。ヒラマサが釣れたのが特に嬉しかったです。」\n【まとめ】爆釣 美浜フィッシングパークをおすすめしたい度 \u0026nbsp; 爆釣 美浜フィッシングパークは、名前の通り豊富な釣果が期待できる釣り堀施設です。特に以下のような方におすすめできる施設です：\n高級魚を狙いたい釣り愛好家 家族や友人とのレジャーとして釣りを楽しみたい方 釣りだけでなく、地引網体験やバーベキューなど複合的な楽しみ方をしたい方 初心者から上級者まで、幅広いレベルの釣り人 貸切で特別な日のイベントとして釣りを楽しみたいグループ 料金設定は一般的な釣り堀よりもやや高めですが、マダイ、ブリ、カンパチ、ヒラマサなどの高級魚が釣れる確率が高く、その価値は十分にあると言えるでしょう。また、一般利用と貸切利用の選択肢があり、目的や人数に合わせて最適なプランを選ぶことができます。\n注意点としては、エサの販売が施設内にないため、事前に用意するか近隣のエサ屋で購入する必要があります。また、使用できるエサの種類に制限があるため、事前に確認しておくとよいでしょう。\n年間を通して様々な魚種が釣れますが、特におすすめの時期は春から秋にかけてです。夏休みなどの繁忙期は混雑することがあるため、平日や閑散期の利用がより快適に釣りを楽しめるでしょう。\n月曜日が定休日（祝日は営業、翌平日に代休）となっているため、訪問予定日が休業日と重ならないよう、事前に確認することをおすすめします。\n知多半島の美しい自然環境の中で、高級魚を狙える「爆釣 美浜フィッシングパーク」は、釣り初心者から上級者まで、また家族連れやグループでも楽しめる総合的な釣りレジャー施設として、高くおすすめできるスポットです。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 3,
        href: "/ehime/searoad-yawatahama/",
        title: "【愛媛県】おさかな牧場「シーロード八幡浜」｜週末営業！600...",
        description: "愛媛県八幡浜市にある「おさかな牧場 シーロード八幡浜」は、美しい瀬戸内海に張り出した桟橋で本格的な海釣りが楽しめる施設です。",
        
        
        content: "愛媛県八幡浜市にある「おさかな牧場 シーロード八幡浜」は、美しい瀬戸内海に張り出した桟橋で本格的な海釣りが楽しめる施設です。\n入場料はわずか大人600円、子供300円という手頃な価格設定ながら、クロダイやシーバス、アジなど多彩な魚種を狙うことができます。以前は釣り堀として営業していましたが、現在は釣り場として生まれ変わり、より自然に近い釣りが体験できるようになりました。\nバリアフリー対応の施設なので、お年寄りから小さな子供まで安心して利用でき、土日祝日のみの営業という特徴を活かした週末の釣り旅行にぴったりのスポットです。\nおさかな牧場「シーロード八幡浜」の基本情報 \u0026nbsp; 場所: 〒796-0001 愛媛県八幡浜市向灘2935 営業時間: ＜6～9月＞7:30～16:00 ＜10～5月＞8:00～16:00 定休日: 月～金曜日（土日祝日営業）。天候で臨時休業あり 平均予算: 大人600円（中学生以上）、子供300円（小学生） レンタル: 釣具のレンタルやエサ販売なし 釣具の持ち込み: 可能 釣れる魚: クロダイ（チヌ）・シーバス・アジ・サバ・イワシ・イシダイ・イカ・カサゴ・メバル 注意事項: バリアフリー対応施設。釣具やエサのレンタルや販売がないので事前に用意する必要あり 公式情報: 公式X/Twitterにて釣果や休業情報を確認可能 施設の特徴 \u0026nbsp; おさかな牧場「シーロード八幡浜」は、瀬戸内海に面した海釣り施設です。以前は釣り堀として営業していましたが、現在は釣り場として提供されており、より自然に近い環境で釣りを楽しむことができます。\n施設の主な特徴:\n海上に張り出した桟橋で、瀬戸内海の様々な魚種を狙える バリアフリー対応なので、車椅子の方や高齢者でも安心して利用可能 土日祝日のみの営業なので、週末の釣り旅行に最適 料金が手頃（大人600円、子供300円）で、気軽に本格的な海釣りが体験できる シーズンによって様々な魚種が釣れ、四季折々の釣りが楽しめる 料金体系について \u0026nbsp; おさかな牧場「シーロード八幡浜」の料金体系はシンプルで、入場料のみです。\n入場料:\n大人（中学生以上）: 600円 子供（小学生）: 300円 未就学児: 無料（要確認） この入場料で「外釣り」と呼ばれる施設全体の利用が可能です。ただし、レンタル用品やエサの販売はないため、釣具や釣りエサは事前に準備して持参する必要があります。\n注意事項と補足データ \u0026nbsp; レンタル・販売なし: 釣具やエサのレンタル・販売がないため、事前に準備が必要です。八幡浜市内の釣具店で購入できます。 営業日の制限: 土日祝日のみの営業なので、平日は利用できません。 天候による休業: 悪天候時は安全のため臨時休業することがあります。訪問前に公式Xをチェックすることをおすすめします。 バリアフリー設計: 車椅子でもアクセスしやすい設計になっています。 駐車場: 施設近くに駐車場があります。 トイレ: 施設内にトイレ完備。 シーズン: サビキ釣りは春から秋にかけてが好調です。 公式情報: 釣果情報や臨時休業の案内は公式X（旧Twitter）で確認できます。 以前は釣り堀でしたが、現在は自然の海での釣りとなるため、天候や潮の状態によって釣果が変わります。公式Xでの釣果情報だったり、釣具店の情報を参考にすると良いでしょう。\nおさかな牧場「シーロード八幡浜」のおすすめ釣り方・釣れる魚種の情報 \u0026nbsp; おさかな牧場「シーロード八幡浜」では、瀬戸内海の様々な魚種が釣れます。ここでは季節ごとの釣れる魚種とおすすめの釣り方をご紹介します。\n春（3月～5月）のおすすめ \u0026nbsp; 春は徐々に水温が上がり始め、様々な魚が活性化する時期です。\nメバル・カサゴの釣り方:\nウキ釣りやライトルアーフィッシングが効果的 エサはイソメやオキアミを使用 朝夕の薄暗い時間帯が特に狙い目 桟橋の下や周辺の根（岩場）周りを狙う アジの釣り方:\nサビキ釣りが最も効率的 春から初夏にかけて徐々に数が増えてくる 朝夕の時間帯に特に活発に回遊する 小アジから中アジまで様々なサイズが釣れる 夏（6月～8月）のおすすめ \u0026nbsp; 夏は最も魚の種類が多く、活性も高まる時期です。\nアジ・サバ・イワシの釣り方:\nサビキ釣りでまとめて釣るのが効率的 早朝や夕方の時間帯がよく釣れる サビキ釣りの後にその魚を餌にして大物を狙うこともできる 暑い時期なので、日よけや水分補給を忘れずに シーバスの釣り方:\nルアーフィッシングが効果的 朝夕のマズメ時を狙う ミノー系ルアーやメタルジグを使い分ける 表層〜中層を探るように釣る 秋（9月～11月）のおすすめ \u0026nbsp; 秋は魚が肥える時期で、釣果も期待できます。\nクロダイ（チヌ）の釣り方:\nフカセ釣りやウキ釣りが効果的 エサはオキアミやカニなどの甲殻類 落ち着いた天気の日に狙うと良い 桟橋周辺の構造物を重点的に狙う イカの釣り方:\nエギングが基本（専用の擬似餌「エギ」を使用） 夕方から夜にかけてが狙い目 シャクル（竿を上下に動かす）動作を取り入れる 秋は特にアオリイカが狙いやすい 冬（12月～2月）のおすすめ \u0026nbsp; 冬は魚の活性が下がりますが、根魚などは狙いやすい時期です。\nカサゴ・メバルの釣り方:\nウキ釣りやテンヤ釣りが効果的 エサはイソメやオキアミなど 底付近をじっくり攻める 冬は魚の活性が低いので、じっくりとアタリを待つ イシダイの釣り方:\nウキ釣りやフカセ釣りで狙う エサは生きたカニや貝類が効果的 潮が動く時間帯を狙う 冬でも活性のある高級魚 初心者向けの定番釣り方 \u0026nbsp; 釣り初心者の方におすすめの釣り方をご紹介します。\nサビキ釣り（春～秋）:\n複数の針が付いた「サビキ」という仕掛けを使用 アジやイワシなどの小魚を効率よく釣ることができる 仕掛けが比較的安価で、準備も簡単 初心者でも釣果を得やすい人気の釣り方 サビキ釣りは群れ次第なので、事前に釣果情報があったらの選択がいいです。もし期待できない場合は、ウキ釣りにシフトしましょう。\nウキ釣り（オールシーズン）:\n最もシンプルで初心者にも扱いやすい釣り方 ウキの動きで魚の食いつきが分かりやすい 様々な魚種に対応できる汎用性の高さ エサを底に沈めたり、中層に合わせたりと調整が可能 ポイントはウキ下の調整です。桟橋の足元や波止など、水深がまだ浅い箇所でやるのがおすすめ。遠投すると水深20m以上もあるエリアなので、初心者は浅いポイントを選びましょう。\nカゴ釣り目的だったり上級者の方は、水深約20mのどこで釣れるかを探りながらの釣りになります。\nおさかな牧場「シーロード八幡浜」へのおすすめアクセス情報 \u0026nbsp; 愛媛県八幡浜市にあるおさかな牧場「シーロード八幡浜」へのアクセス方法をご紹介します。\n車でのアクセス \u0026nbsp; 松山方面から:\n松山市内から車で約1時間30分 松山自動車道 → 大洲IC → 国道56号線経由で八幡浜市へ 八幡浜市内から国道197号線を南下し、「シーロード八幡浜」の看板に従って進む 宇和島方面から:\n宇和島市内から車で約40分 国道56号線を北上し、八幡浜市へ 八幡浜市内から案内に従って進む 駐車場情報:\n施設近くに無料駐車場あり 台数に限りがあるため、土日祝日の混雑時は早めの到着がおすすめ 九州の大分市からフェリー+車のルートもあります。こちらは2時間半ほどで到着することができ、松山市からと同じくらいの移動時間なので、九州からの訪問手段は中国地方からよりも近い場合もあります。 https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d501449.6195926962!2d131.80373839221372!3d33.37390743192089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x35442b8a2db61c79%3A0x4b29d3b999c013f0!2z5Zu96YGT5Lmd5Zub44OV44Kn44Oq44O8IOS9kOizgOmWoiDmuK8g44OV44Kn44Oq44O844K_44O844Of44OK44Or44OT44Or!3m2!1d33.2498577!2d131.86495259999998!4m5!1s0x35459b22c245ec1b%3A0x50842c1fb29257ad!2z44CSNzk2LTAwMDEg5oSb5aqb55yM5YWr5bmh5rWc5biC5ZCR54GY77yS77yZ77yU77yUIOW4guWWtuOCt-ODvOODreODvOODieWFq-W5oea1nCjjgYrjgZXjgYvjgarniafloLQp!3m2!1d33.4588824!2d132.3901119!5e1!3m2!1sja!2sjp!4v1746971819365!5m2!1sja!2sjp\n公共交通機関でのアクセス \u0026nbsp; JR利用:\nJR予讃線 八幡浜駅下車 駅からタクシーで約10分 仮に岡山駅から電車利用で八幡浜駅に行く場合、5時間はかかるのでスケジュールに注意してください。\nバス利用:\n八幡浜駅からバスの運行あり（本数は限られるため事前確認推奨） 最寄りのバス停から徒歩約10分 公共交通機関でのアクセスはやや不便なため、車での訪問がおすすめです。\n近隣の釣具店情報 \u0026nbsp; 施設には釣具やエサの販売がないため、事前に以下の釣具店で準備することをおすすめします。\n八幡浜市内の釣具店:\nつり具のマルニシ 八幡浜店（八幡浜市内、施設から約10分） 釣り具のポイント 八幡浜店（八幡浜市内、施設から約15分） これらの店舗で、当日の釣れ筋の情報も得られることがあります。\n周辺の観光スポットと組み合わせたプラン \u0026nbsp; 1日プラン例:\n朝早く出発し、釣具店で準備 おさかな牧場「シーロード八幡浜」で午前中釣りを楽しむ 八幡浜市内で新鮮な海鮮ランチ 午後は道の駅・みなっと（八幡浜市内）や双岩などの観光スポットを巡る 宿泊プラン例（1泊2日）:\n1日目：八幡浜市内に宿泊し、温泉などを楽しむ 2日目：朝からシーロード八幡浜で釣りを楽しむ 帰りに道の駅などに立ち寄り、地元の特産品を購入 近隣の宿泊施設 \u0026nbsp; 八幡浜市内の宿泊施設:\nホテル青い国（八幡浜市内、1泊7,000円〜） 八幡浜アーバンホテル（八幡浜市内、1泊6,000円〜） 民宿 浜風（八幡浜市内、1泊5,000円〜） 実際に利用したユーザーの声を抜粋 \u0026nbsp; 訪問者の口コミや評価をいくつかご紹介します。\n「土日しか営業していないため、週末に家族で訪れました。サビキ釣りで子供たちもたくさんのアジが釣れて大満足でした。バリアフリーなので、祖父も一緒に釣りを楽しめたのがよかったです。」（40代男性・家族連れ）\n「600円という料金が魅力で訪れましたが、それ以上の価値がありました。秋のアオリイカが数匹釣れて、夕食の刺身と塩辛にしていただきました。」（50代男性・友人と利用）\n「施設はシンプルですが、本格的な海釣りが楽しめます。釣り具やエサの販売がないので事前準備は必須ですが、その分リーズナブルな料金設定なのだと思います。公式Xで釣果情報をチェックしてから行くのがおすすめです。」（30代男性・単独利用）\n「バリアフリー対応なので、車椅子の父と一緒に釣りを楽しめました。スタッフの方も親切で、景色も最高です。釣果は日によって変わりますが、釣りの醍醐味はそこにあると思います。」（40代女性・家族連れ）\n【まとめ】おさかな牧場「シーロード八幡浜」をおすすめしたい度 \u0026nbsp; おさかな牧場「シーロード八幡浜」は、以下のような方に特におすすめできる施設です：\n週末限定で本格的な海釣りを楽しみたい方 リーズナブルな料金で釣りを体験したい方 バリアフリー対応の釣り場を探している方 家族連れで安全に釣りを楽しみたい方 四季折々の瀬戸内海の魚を釣りたい方 最大の魅力は、わずか600円という入場料で本格的な海釣りが体験できる点です。ただし、釣具やエサのレンタル・販売がないため、自前の釣具を持参するか、事前に近隣の釣具店で準備する必要があります。\n土日祝日のみの営業というのは制限のように思えますが、逆に言えば週末の釣り旅行にぴったりのスポットです。また、公式Xでは釣果情報や休業情報などが発信されているため、訪問前にチェックしておくと効率よく釣りを楽しめるでしょう。\nバリアフリー対応の施設なので、お年寄りや小さな子供連れ、車椅子ユーザーの方でも安心して利用できる点も大きな魅力です。春から秋にかけてのサビキ釣りシーズンは特におすすめで、初心者でも手軽に釣りの楽しさを体験できます。\nただし、天候によっては臨時休業する可能性があるため、訪問前には必ず公式Xなどで営業状況を確認することをおすすめします。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 4,
        href: "/ehime/fishing-park-omishima/",
        title: "【愛媛県】フィッシングパーク大三島｜釣り桟橋と釣り堀が選べる...",
        description: "しまなみ海道の大三島にある「フィッシングパーク大三島」は、海釣り桟橋と釣り堀の両方を楽しめる珍しい施設です。",
        
        
        content: "しまなみ海道の大三島にある「フィッシングパーク大三島」は、海釣り桟橋と釣り堀の両方を楽しめる珍しい施設です。\n釣り桟橋は大人1,000円、子供500円で利用でき、自然の海で様々な魚を狙う本格的な釣りが体験できます。一方、釣り堀は3,500円で竿のレンタル代も含まれており、アジやタイなど確実に釣果が得られるのが魅力。釣りの経験や気分に合わせて選べるので、初心者からベテランまで満足できる施設です。\n美しい瀬戸内海に囲まれた大三島を訪れる際には、ぜひ立ち寄りたい海釣りスポットです。\nフィッシングパーク大三島の基本情報 \u0026nbsp; 場所: 愛媛県今治市大三島町宮浦5762番地 営業時間: 8:30～16:30（釣り堀は9:00～15:00） 定休日: 水曜日（祝日は営業、翌平日が休み）、12/30~1/3の年末年始、天候による閉鎖の可能性あり 平均予算: 釣り桟橋（大人1,000円、子供500円）または釣り堀（3,500円） レンタル: 釣り桟橋（仕掛け付き釣具500円、ライフジャケット100円）、釣り堀（釣具レンタル料金に含む） 釣具の持ち込み: 釣り桟橋（可能、1人3本以内）、釣り堀（任意） 釣れる魚: アジ、タイ、メバル、カサゴなど瀬戸内海の魚種 注意事項: アミエビ以外の撒き餌不可。投げ釣り禁止。つり糸を3本以上使用するのは禁止（1人2本以内）。 ウェブサイト: フィッシングパーク大三島 公式サイト 施設の特徴 \u0026nbsp; フィッシングパーク大三島は、「釣り桟橋」と「釣り堀」の2つの施設を持つユニークな釣り場です。利用者は気分や釣りの経験に応じて、どちらかを選ぶことができます。\n釣り桟橋の特徴:\n自然の海での本格的な釣りが楽しめる 瀬戸内海の様々な魚種が釣れる可能性がある より自然に近い釣りの醍醐味を味わえる 料金がリーズナブル（大人1,000円、子供500円） 釣具の持ち込みが可能（1人3本まで） 釣り桟橋の使用は投げ釣り禁止の制限はあるものの、釣具の持ち込みが可能なので、多様な釣り方を試せることです。桟橋なので足元に仕掛けを落とすだけでいいですし、ウキ釣りは流すことが可能で、広範囲を狙う時に有効です。\n釣り堀の特徴:\n確実に釣果が得られる 「ノーマルコース（アジ）」と「チャレンジコース（タイ）」の2種類から選べる 釣具レンタル（4m竿のウキ釣り仕掛け）が料金に含まれている 持ち帰り可能な魚の数に制限あり（ノーマルコース5匹、チャレンジコース2匹） 初心者や子供でも確実に釣りを楽しめる 基本料金に釣具レンタルが含まれているので、手ぶら可能なことがメリット。持ち帰りに制限はありますが、この料金で十分な釣果を得られるなら安いと思うはずです。\n料金体系について \u0026nbsp; フィッシングパーク大三島の料金体系は、「釣り桟橋」と「釣り堀」で異なります。\n釣り桟橋の料金:\n種類・区分 大人(16才以上) 小人(6才以上16才未満) 全日（4時間以上） 1,000円 500円 半日（4時間以内） 600円 300円 入園料（見学） 200円 100円 釣り具レンタル料金:\n仕掛け付き釣具: 500円 ライフジャケット（救命胴衣）: 100円 釣り堀の料金:\n種類・区分 大人(16才以上) 小人(6才以上16才未満) ノーマルコース（アジ） 3,500円 3,500円 チャレンジコース（タイ） 3,500円 3,500円 見学料 200円 100円 釣り堀の持ち帰りルール:\nノーマルコース: 5匹まで持ち帰り可能（超過分は買取） チャレンジコース: 2匹まで持ち帰り可能（超過分は買取） 釣った魚は規定数まで持ち帰ることができ、それを超えた分は買い取りとなります。買取価格は施設で確認してください。\n注意事項と補足データ \u0026nbsp; エサ販売をしており、オキアミは100円単位かあるので、少ない時間でもできるように配慮されています。虫エサ（イソメ）も扱っており、サビキ仕掛けの販売もしています。\n営業時間の違い: 釣り桟橋は8:30～16:30、釣り堀は9:00～15:00と時間が異なります。 天候による閉鎖: 荒天時は安全のため閉鎖となる場合があります。訪問前に確認することをおすすめします。 釣り桟橋の制限: アミエビ以外の撒き餌は禁止、他人に危害を加える可能性がある投げ釣りも禁止されています。 釣り堀の制限: ひっかけ釣り、ルアーの使用は禁止、釣座の移動禁止、撒き餌の使用禁止などのルールがあります。 釣具破損時の対応: 特に釣り堀ではレンタル竿を破損した場合は賠償が必要となります。 アクセス: しまなみ海道経由で車でアクセス可能です。 周辺観光: 大山祇神社や多々羅大橋など、大三島の観光スポットと組み合わせて訪れるのがおすすめです。 この施設は、釣り桟橋で本格的な海釣りを楽しみたい方と、釣り堀で確実に釣果を得たい方の両方のニーズに応えられる、珍しい複合型の釣り施設です。\nフィッシングパーク大三島のおすすめ釣り方・釣れる魚種の情報 \u0026nbsp; フィッシングパーク大三島では、釣り桟橋と釣り堀で異なる釣り方が楽しめます。それぞれの特徴に合わせたおすすめの釣り方をご紹介します。\n釣り桟橋での釣り方 \u0026nbsp; 釣り桟橋では瀬戸内海の様々な魚種が狙えます。\nアジの釣り方:\nサビキ釣りが効果的 小さな群れで回遊してくることが多い 朝夕の時間帯が特に活性が高い サビキ針のサイズは小さめ（7〜10号）がおすすめ アミエビを使用すると寄せ餌効果がある メバル・カサゴの釣り方:\nウキ釣りやちょい投げが効果的 桟橋の下や周辺の根（岩場）周りを狙う エサはイソメやオキアミが効果的 朝夕の時間帯や潮の変わり目が良いタイミング 小さなアタリでもしっかりとアワセを入れる クロダイ（チヌ）の釣り方:\nフカセ釣りやウキ釣りが効果的 エサはオキアミやカニを使用 桟橋周辺の構造物を狙う 警戒心が強いので、細めのラインを使用 朝夕の時間帯が特に狙い目 シーバスの釣り方:\nルアーフィッシングで狙う（ただし投げ釣りは禁止のため、注意が必要） 表層を狙ったルアーの操作が効果的 朝夕のマズメ時に活性が高まる 小魚が跳ねている場所を重点的に狙う 釣り堀での釣り方 \u0026nbsp; 釣り堀では確実に釣果を得られるように設計されています。数釣りかつ簡単なのがいいならノーマルコース。大型を体験したいならチャレンジコースで選ぶといいでしょう。\nノーマルコース（アジ）の釣り方:\n提供される4m竿のウキ釣り仕掛けを使用 ウキの深さ調整が重要（スタッフに適切な深さを確認） エサをこまめに付け替え、新鮮な状態を保つ ウキの動きを注視し、小さなアタリでもアワセを入れる 5匹まで持ち帰り可能なので、良いサイズを選んで持ち帰ると良い アジの買取価格は1匹あたり500円ほどらしいので、5匹以上欲しいかたは、財布の金額と相談して考えましょう。\nチャレンジコース（タイ）の釣り方:\n提供される4m竿のウキ釣り仕掛けを使用 タイは警戒心が強いので、静かに釣りを行う エサはしっかりと針に付け、底付近を狙う アタリがあったら一気に合わせる 2匹まで持ち帰り可能なので、大きめのタイを選んで持ち帰りましょう。放流されてから日数が経った大型のマダイもいるようで、意識的に大型狙いをするのもいいですね。\n初心者向けのアドバイス \u0026nbsp; 釣りの経験が少ない方へのアドバイスをいくつかご紹介します。\n釣り桟橋を選ぶ場合:\nレンタル竿を利用すると手軽に始められる スタッフに基本的な釣り方を教えてもらうと良い ライフジャケットの着用を忘れずに 天候や潮の状態によって釣果が変わることを理解しておく 釣れない時間帯があっても焦らない 仕掛けは桟橋から落とすだけでいいから、慣れない道具の操作による「差」が起きにくいことがメリットです。\n釣り堀を選ぶ場合:\n初心者や子供連れは「ノーマルコース（アジ）」がおすすめ 大型を体験したい、相手したい方は「チャレンジコース（タイ）」がおすすめ レンタル釣具が料金に含まれているので手ぶらでOK スタッフの指示に従って釣りを行う 釣座の移動は禁止されているので、最初に良い場所を確保 持ち帰り制限（5匹または2匹）を超えると買取になるので注意 釣り堀の利用で規定数以上は買取になるので、釣りすぎには注意しましょう。\nフィッシングパーク大三島へのおすすめアクセス情報 \u0026nbsp; しまなみ海道沿いにある大三島へのアクセス方法をご紹介します。しまなみ街道は広島県尾道と愛媛県今治を繋いでいる道路なので、基本的に「広島方面」「松山方面」からのルートになります。\n車でのアクセス \u0026nbsp; 広島方面から:\n西瀬戸自動車道（しまなみ海道）を南下 大三島ICで降りて約10分 松山方面から:\n松山自動車道 → 今治小松JCT → しまなみ海道を北上 大三島ICで降りて約10分 駐車場情報:\n施設内に無料駐車場あり 大型バスも駐車可能 公共交通機関でのアクセス \u0026nbsp; バス利用:\nJR今治駅からバスで約70分 「フィッシングパーク前」下車すぐ フェリー利用:\n広島県尾道市から大三島行きフェリーを利用 フェリー乗り場から施設までタクシーで約15分 しまなみ海道観光と組み合わせたプラン \u0026nbsp; 1日プラン例:\n朝、今治市内からレンタカーまたはレンタサイクルで出発 多々羅大橋や来島海峡大橋の景色を楽しみながら大三島へ 大山祇神社を参拝 フィッシングパーク大三島で釣りを楽しむ 夕方、今治市内に戻る 2日間プラン例:\n1日目：広島または愛媛から出発し、しまなみ海道の島々を観光 大三島または近隣の島で宿泊 2日目：朝からフィッシングパーク大三島で釣りを楽しむ 午後、残りの島々を観光しながら帰路につく 自転車で釣り施設に立ち寄れるし、かつレンタル釣具もあるしで、とても魅力的なのですが、魚の持ち帰りをどうするかが悩みどころになります。\n施設に発泡スチロールがあれば購入し、釣れた魚を梱包して、クール便で家に送る方法がベストでしょう。施設にその案内はないので、要確認してください。\n近隣の宿泊施設 \u0026nbsp; 大三島周辺の宿泊施設:\nしまなみリゾート 大三島（1泊8,000円〜） 旅館 よし田（1泊7,000円〜） 民宿 大三島（1泊6,000円〜） 今治市内の宿泊施設:\n今治国際ホテル（1泊10,000円〜） ホテルアジュール今治（1泊8,000円〜） スーパーホテル今治（1泊7,000円〜） 周辺の観光スポット \u0026nbsp; フィッシングパーク大三島周辺には、多くの観光スポットがあります。\n主な観光スポット:\n大山祇神社（日本総鎮守を祀る由緒ある神社） 大山祇神社宝物館（国宝・重要文化財を多数所蔵） しまなみアースランド（サイクリングターミナル） 多々羅大橋（美しい景観を誇る橋） 大三島美術館（日本画を中心とした美術館） 釣りの前後に、これらの観光スポットを訪れることで、大三島の魅力をより深く体験することができます。\n実際に利用したユーザーの声を抜粋 \u0026nbsp; 訪問者の口コミや評価をいくつかご紹介します。\n「釣り桟橋と釣り堀が選べるのが良いですね。子供は釣り堀でアジを5匹釣って大喜び、大人は釣り桟橋で本格的な釣りを楽しみました。」（40代男性・家族連れ）\n「初めて釣りをする息子と訪れましたが、釣り堀のノーマルコースを選んだおかげで、確実に釣果を得られて成功体験になりました。スタッフの方も親切で助かりました。」（30代女性・家族連れ）\n「しまなみ海道サイクリング中に立ち寄りました。釣り桟橋で半日利用してアジやメバルが釣れて大満足。景色も最高でした。」（20代男性・友人と利用）\n「釣り堀のチャレンジコースを利用。大きなタイを2匹釣り上げることができて、夕食に刺身と塩焼きで美味しくいただきました。料金以上の価値があります。」（50代男性・夫婦で利用）\n【まとめ】フィッシングパーク大三島をおすすめしたい度 \u0026nbsp; フィッシングパーク大三島は、以下のような方に特におすすめできる施設です：\nしまなみ海道観光と合わせて釣りも楽しみたい方 釣り初心者と経験者が一緒に訪れる混合グループ 確実に釣果を得たい方（釣り堀）と本格的な海釣りを楽しみたい方（釣り桟橋） 家族連れで子供に釣りを体験させたい方 瀬戸内海の美しい景色を眺めながら釣りを楽しみたい方 最大の魅力は、釣り桟橋と釣り堀の両方を備えており、訪問者のニーズやスキルレベルに合わせて選べる点です。釣り桟橋は自然の海での本格的な釣りが楽しめる一方で、釣り堀は確実に釣果が得られるため、初めての方や子供連れでも安心して利用できます。\n料金体系も明確で、釣り桟橋は大人1,000円、子供500円と手頃な価格設定です。釣り堀は3,500円とやや高めですが、釣具レンタルが含まれており、一定数の魚は持ち帰り可能なので、コストパフォーマンスは良いと言えるでしょう。\nまた、しまなみ海道沿いという立地を活かし、サイクリングや観光と組み合わせたプランを立てやすい点も魅力です。美しい瀬戸内海の風景を眺めながらの釣りは、心身ともにリフレッシュできる体験となるでしょう。\nただし、水曜日は定休日、天候によっては閉鎖される可能性があること、12月30日から1月3日までの年末年始は休業していることに注意が必要です。訪問前に公式サイトやお電話で営業状況を確認することをおすすめします。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 5,
        href: "/okinawa/itoman-ikada-tsurigu-no-zousan/",
        title: "【沖縄県】糸満イカダ（つりぐのぞうさん）｜那覇空港から30分...",
        description: "「沖縄旅行のついでに、ちょっと本格的な釣りをしてみたい」 「空港の近くで、サクッと大物を狙える場所はないかな？」",
        
        
        content: "「沖縄旅行のついでに、ちょっと本格的な釣りをしてみたい」 「空港の近くで、サクッと大物を狙える場所はないかな？」\nそんな釣り好きトラベラーに推したいのが、沖縄本島南部・糸満市にある**「糸満イカダ（つりぐのぞうさん）」**です。\nここは那覇空港から車で約30分という好立地にありながら、沖縄独特の高級魚「タマン（ハマフエフキ）」や「ミーバイ（ハタ類）」などが狙える本格派スポット。 観光客向けのチャラチャラした施設ではなく、**「地元の釣り師も通うガチの釣り場」**なのに、レンタル充実で手ぶらでも行けるという懐の深さが魅力です。\n南国の強烈な引きを体験したいなら、まずはここへ向かいましょう！\n糸満イカダの基本情報 \u0026nbsp; 項目 詳細 施設名 糸満イカダ（受付：つりぐのぞうさん） 住所 〒901-0305 沖縄県糸満市西崎2丁目24-3 営業時間 7:00〜17:00（出船は随時） 定休日 不定休（荒天時は中止） 料金 大人：2,800円\n小人（小学生）：2,300円\n幼児：1,800円\n※渡船料・釣り代込み レンタル 竿・リールセット：1,000円〜（要予約）\n※仕掛け・エサ代は別途 設備 トイレ（イカダ上）、屋根 公式サイト つりぐのぞうさんブログ 独自の「高コスパ」システム \u0026nbsp; 糸満イカダの料金は、大人2,800円と非常にリーズナブル。 これは「渡船料」と「釣り場利用料」がセットになった価格で、釣った魚の持ち帰り制限や追加料金は一切ありません。 天然の海にイカダを浮かべているため、養殖魚を放流している釣り堀とは違い、釣れる魚はすべて天然。だからこそ安く提供されています。\nここが熱い！3つの魅力 \u0026nbsp; 空港から近い＆時間の融通が利く 那覇空港から30分で到着。さらに「随時運行」なので、自分のタイミングで渡り、帰りたい時間に帰れます（※帰りの船は数時間おきの定期便の場合あり）。フライト前後の数時間だけ遊ぶ、といった使い方が可能です。\n南国モンスターと戦える イカダの下には漁礁が沈められており、魚の隠れ家になっています。 強烈な引きで竿を根元から曲げるタマンや、一瞬で根に潜るミーバイなど、本州では味わえないスリリングなファイトが待っています。\n万全の「日除け」対策 沖縄の釣りで一番の大敵は「日差し」です。 ここのイカダにはしっかりとした屋根が設置されています。直射日光を避けられるので、体力の消耗を抑えながら一日中釣りに集中できます。\nこんな人に最適！ \u0026nbsp; 到着日・最終日に遊びたい人: 空港アクセス抜群なので、旅程の隙間時間を有効活用できます。 中〜上級者の釣り人: レンタルもありますが、ここは自前のタックルを持ち込んで本気で狙う価値があるフィールドです。 コスパ重視派: 3,000円以下で一日遊べるのは、沖縄のマリンレジャーとしては破格です。 糸満イカダ攻略法 \u0026nbsp; 1. タックルは「強め」が鉄則 \u0026nbsp; 「堤防釣りの延長」でナメてかかると痛い目を見ます。 不意に50cmオーバーの化け物が掛かるのが沖縄の海。\nハリス: 最低でも4号〜5号（できればシーガーのグランドマックスなど強度の高いもの）。 竿: 磯竿なら3号以上推奨。 2. エサは「現地調達」がベスト \u0026nbsp; 受付場所である「つりぐのぞうさん」には、沖縄の釣りに精通したスタッフさんと、豊富なエサが揃っています。 「今日は何が釣れてますか？」「エサは何がいいですか？」と必ず聞きましょう。練り餌（カーエー狙い）や、キビナゴ（タマン・ミーバイ狙い）など、その日の当たりエサを教えてくれます。\n3. フカセ釣り vs ぶっこみ釣り \u0026nbsp; フカセ釣り: 撒き餌を撒いて、浮いてきた魚を狙います。グルクンやカーエー、チヌ狙いに有効。 ぶっこみ釣り: オモリとエサを底に沈めて待ちます。タマンやミーバイ狙いに。置き竿にする場合は、尻手ロープ（竿が海に引き込まれないための命綱）が必須です！ 釣れる魚種と時期 \u0026nbsp; チヌ（ミナミクロダイ）: 冬〜春（乗っ込み時期は大型が狙える） カーエー（ゴマアイゴ）: 梅雨時期〜夏（強烈な引きのファイター） タマン（ハマフエフキ）: 夏〜秋（夜釣りも人気 ※要確認） ミーバイ（ハタ類）: 通年（底に潜む根魚） アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 那覇空港から: 国道331号線を南下して約30分。「道の駅いとまん」の近くです。 駐車場: あり（つりぐのぞうさん店舗前、または指定の港駐車場）。 まとめ：沖縄で「本気の釣り」をするならここ \u0026nbsp; 糸満イカダは、観光地化されたリゾート施設ではありません。 だからこそ、「作られた体験」ではない、リアルな沖縄の海を感じることができます。\n日焼け止めを塗りたくり、少し強めのタックルを持って、南国の海に挑んでみてください。 竿先が海面に突き刺さるようなアタリが来た瞬間、あなたの沖縄旅行は最高潮に達するはずです。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 6,
        href: "/okinawa/motobu-fishing-ikada-umiseikatsu/",
        title: "【沖縄県】本部釣りイカダ 海生活｜美ら海水族館すぐ！釣りにB...",
        description: "「沖縄の青い海で、映画みたいな休日を過ごしたい」 「釣った魚をその場で食べて、BBQも楽しみたい！」",
        
        
        content: "「沖縄の青い海で、映画みたいな休日を過ごしたい」 「釣った魚をその場で食べて、BBQも楽しみたい！」\nそんな贅沢な沖縄ドリームを叶えてくれるのが、沖縄本島北部・本部町にある**「本部釣りイカダ 海生活（マリンライフ）」**です。\nここは単なる釣り場ではありません。 エメラルドグリーンの海に浮かぶ大型イカダの上で、沖縄ならではのカラフルな熱帯魚や大物を釣り上げ、疲れたらハンモックで昼寝。お腹が空いたら、海の上で手ぶらBBQを楽しむ…。 すぐ近くには人気の「美ら海水族館」もあり、観光プランの一環としてこれ以上ないロケーションです。\n初心者でも全力で楽しめる、南国の「遊べる」釣りイカダの魅力を徹底解剖します！\n本部釣りイカダ 海生活の基本情報 \u0026nbsp; 項目 詳細 施設名 本部釣りイカダ 海生活（マリンライフ） 住所 〒905-0213 沖縄県国頭郡本部町谷茶29-72 利用時間 8:30～17:00（季節・海況により変動あり）\n※渡船は随時運行 定休日 悪天候時（台風など） 料金 手ぶらパック：大人8,580円〜 / 子供7,370円〜\n渡船のみ：大人3,630円〜（※料金は居住地により異なる） 釣れる魚 グルクン、タマン、アイゴ、ブダイ、ガーラなど（天然魚） 設備 トイレ、テント屋根、テーブル、ベンチ、BBQ設備 公式サイト 本部釣りイカダ 海生活 料金プランの注意点 \u0026nbsp; 料金体系は少し複雑で、**「居住地（沖縄県民・県外・海外）」**によって異なります。 観光客（県外在住者）の場合、主なプランは以下の通りです。\n手ぶら釣りパック（大人8,910円〜） 渡船料、釣り竿・リール、仕掛け、エサ、ライフジャケット、施設利用料が全て込み。 初心者や旅行者は迷わずこれがおすすめ。 渡船のみ（大人3,960円〜） 道具・エサを全て持参する場合の料金。 ※最新の料金は必ず 公式サイトで確認してください。\n海生活のここが最高！3つのポイント \u0026nbsp; 「海の上でBBQ」という非日常 イカダの上でBBQ（別料金・要予約）が可能です。青い海に囲まれて、潮風を感じながら食べるお肉とビールは格別の一言。釣った魚を下処理してもらい、一緒に焼いて食べることもできます。\n狙うは100%天然の魚 イケスに放流された魚を釣るのではなく、イカダの周りに集まってくる天然の魚を狙います。そのため釣果は自然環境に左右されますが、釣れた魚は絶品。沖縄三大高級魚「タマン」などの大物がヒットすることも！\n万全のサポート体制 「釣り方がわからない…」という方も安心。スタッフが常駐（または巡回）しており、釣り竿の使い方からエサの付け方まで丁寧に教えてくれます。女性や子供でも安心して楽しめます。\nこんな人に最適！ \u0026nbsp; 沖縄旅行中のファミリー・グループ: 美ら海水族館の前後で遊ぶのに最高の立地。 「体験」重視のカップル: ただの観光地巡りではない、特別な思い出が作れます。 ガチの釣り師: 夜釣りプラン（要確認）や、持ち込みタックルでの大物狙いも熱いスポットです。 本部釣りイカダ 海生活の攻略法 \u0026nbsp; 天然の魚が相手なので、ボウズ（0匹）のリスクもあります。釣果を上げるために以下のポイントを押さえておきましょう。\n1. サビキ釣りで「グルクン」を狙え \u0026nbsp; 沖縄の県魚「グルクン（タカサゴ）」は、サビキ釣りで手軽に釣れて、食べて美味しい最高のターゲットです。 回遊魚なので、群れが回ってきたらチャンス！手返し良くコマセ（撒き餌）を撒いて、群れを足止めしましょう。\n2. 沖縄の魚は引きが強い！ \u0026nbsp; 沖縄の魚は、同じサイズの本州の魚に比べて引きが強烈です。 細い糸を使っていると一瞬で切られます。レンタルタックルなら安心ですが、持ち込みの場合は普段よりワンランク太い仕掛けを用意しましょう（ハリス3号〜5号目安）。\n3. オプションの「体験ダイビング」なども検討を \u0026nbsp; もし釣れなくても、ここにはカヤックやSUP、シュノーケリングなどのオプションも充実しています。 「釣れなかったから終わり」ではなく、「じゃあ泳ごう！」と切り替えられるのが、この複合マリン施設の強みです。\n釣れる魚種と時期 \u0026nbsp; グルクン: 通年（特に夏〜秋が良い） アイゴ（エーグヮー）: 通年 タマン（ハマフエフキ）: 春〜秋（強力な引き！） ガーラ（アジ類）: 夏〜秋（回遊次第で超大物も） イカ（アオリイカ）: 冬〜春 アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 那覇空港から: 沖縄自動車道経由で約1時間40分～2時間。 美ら海水族館から: 車で約10分～15分。 駐車場: 無料駐車場あり（港に集合）。 注意点 \u0026nbsp; 日焼け対策は必須: 海上の照り返しは強烈です。日焼け止め、帽子、サングラス、長袖のラッシュガードなどを必ず持参しましょう。 酔い止め: イカダは大型で揺れにくいですが、船酔いしやすい人は念のため飲んでおくのが無難です。 まとめ：沖縄の海を遊び尽くすならここ！ \u0026nbsp; 「本部釣りイカダ 海生活」は、釣り場という枠を超えた**「海上のテーマパーク」**です。\n美ら海水族館で魚を見た後に、実際に自分で釣って、食べて、遊ぶ。 そんなフルコースのような体験ができるのは、沖縄でもここだけかもしれません。\n次の沖縄旅行では、観光ルートに「海上の楽園」を組み込んでみませんか？ きっと、写真フォルダが青い思い出でいっぱいになるはずです。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 7,
        href: "/other/facility-4bd093fd/",
        title: "【休止中】勇払マリーナ海上釣り堀｜北海道初！幻の海上釣り堀の...",
        description: "※本記事で紹介する「勇払マリーナ海上釣り堀」は、現在営業を休止しています。以下の情報はプレオープン時の記録となります。",
        
        
        content: "※本記事で紹介する「勇払マリーナ海上釣り堀」は、現在営業を休止しています。以下の情報はプレオープン時の記録となります。\n北海道苫小牧市にある「勇払（ゆうふつ）マリーナ」。ここに2022年、北海道初となる「海上釣り堀」が期間限定で誕生しました。\n本州では一般的な海上釣り堀ですが、寒冷地である北海道での運営は未知の領域。マダイやシマアジといった本来北海道にはいない魚が釣れるとあって、釣りファンの間で大きな話題となりました。現在は休止中ですが、その挑戦的な試みと当時の様子、そして北海道における海上釣り堀の未来について記録を残します。\n勇払マリーナ（海上釣り堀）の基本情報（※営業当時） \u0026nbsp; 場所：〒059-1372 北海道苫小牧市勇払376 営業期間：2022年の特定期間（現在は休止） 平均予算：500円＋魚代（破格！） 釣れた魚：マダイ、シマアジ、ヒラマサ 運営形態：事前予約制・90分入れ替え制 驚きの料金体系 \u0026nbsp; 当時話題となったのが、その安すぎる料金設定です。\n利用料：1組（竿1本）90分 500円 魚持ち帰り料：1匹 100円 レンタル竿：500円 一般的な海上釣り堀の相場は数千円～1万円以上です。持ち帰り魚も「100g数百円」が相場の中、1匹100円はまさに価格破壊。利益度外視の実証実験的な意味合いが強かったと考えられます。\n独自の運営システム \u0026nbsp; 時間制：90分という短時間勝負 人数制限：1枠8組まで 入替制：1日2部制（午前・午後） 限られたスペースを有効活用するための工夫でしたが、予約競争率は非常に高かったようです。\n北海道で「海上釣り堀」が難しい理由と可能性 \u0026nbsp; 勇払マリーナの挑戦は、北海道における海上釣り堀の難しさと可能性の両方を浮き彫りにしました。\n1. 水温と魚の管理 \u0026nbsp; 海上釣り堀の主役であるマダイや青物は、温かい海を好みます。北海道の冷たい海、特に冬場の水温管理は最大の課題です。今回も夏場の期間限定でしたが、通年営業するには越冬対策や、北海道固有の魚種（サクラマスや大型根魚など）へのシフトが必要かもしれません。\n2. 水深の確保 \u0026nbsp; 勇払マリーナの釣り堀は港内の比較的浅い場所に設置されていました。魚のストレスを減らし、活性を維持するためには、ある程度の水深（10m前後など）と潮通しの良さが必要です。\n3. ビジネスモデル \u0026nbsp; 500円という料金は利用者には嬉しいですが、事業として継続するには適正価格への改定が不可欠です。「北海道ならではの魚が釣れる高級釣り堀」あるいは「手軽にホッケやカレイが釣れるファミリー釣り堀」など、ターゲットの明確化が再開の鍵となるでしょう。\n【まとめ】再開への期待を込めて \u0026nbsp; 北海道初の海上釣り堀という灯火はいったん消えましたが、そのインパクトは大きなものでした。「北海道でも海上釣り堀はできる」という可能性を示した功績は計り知れません。\nもし将来、課題をクリアして再開された暁には、道内だけでなく道外からも釣り人が集まる新たな観光名所になるはずです。その時を期待して待ちましょう。\n※現在は勇払マリーナ自体は営業していますが、海上釣り堀はありません。ボートフィッシング等の利用は可能です。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 8,
        href: "/miyazaki/shibushi-bay-daikoku-dolphin-land/",
        title: "【宮崎県】志布志湾大黒イルカランド（天然釣堀）｜イルカショー...",
        description: "「子供に魚釣りの楽しさを教えてあげたいけど、ボウズ（0匹）は避けたい」 「イルカショーのついでに、ちょっとだけ釣りをしたい」",
        
        
        content: "「子供に魚釣りの楽しさを教えてあげたいけど、ボウズ（0匹）は避けたい」 「イルカショーのついでに、ちょっとだけ釣りをしたい」\nそんなワガママな願いを叶えてくれるのが、宮崎県串間市のテーマパーク**「志布志湾大黒イルカランド」**にある天然釣堀です。\nここは単なる釣り堀ではありません。 かわいいイルカやペンギンに癒やされた後、イケスで高級魚を釣り上げ、それを新鮮なお土産として持ち帰る——。 まさに**「観光」と「食」と「遊び」がセットになった、エンターテイメント釣り施設**です。\n釣った魚は**「全て買取（リリース禁止）」**というルールがあるため、釣りすぎには注意が必要ですが、裏を返せば「確実に美味しい魚を持って帰れる」ということ。 家族旅行のサプライズイベントとして、これ以上ないスポットをご紹介します。\n志布志湾大黒イルカランド（天然釣堀）の基本情報 \u0026nbsp; 項目 詳細 施設名 志布志湾大黒イルカランド 天然釣堀 住所 〒888-0002 宮崎県串間市高松1481-3 営業時間 10:00～16:30（最終受付 16:00） 定休日 年中無休（※施設点検日を除く） 料金 入園料：大人1,500円 / 小中学生1,000円 / 幼児700円\n釣り利用料：竿1本 700円（エサ代別 100円）\n魚代：釣った魚の重量・種類に応じた買取制 釣れる魚 マダイ、シマアジ、イシガキダイ、アジ、クロダイ、ヘダイなど 設備 トイレ、手洗い場、魚処理サービス（有料）、レストラン、売店 公式サイト 志布志湾大黒イルカランド ここが特徴！「買取制」システムについて \u0026nbsp; この釣り堀の最大の特徴は、**「釣った魚は全て買い取り（リリース不可）」**という点です。 「楽しみすぎてお財布かピンチ！」にならないよう、事前にシステムを理解しておきましょう。\n入場料＋竿代は安い: 竿レンタル込みで700円（別途入園料）と、スタートのハードルは低いです。 釣れたら課金: 魚種や重さに応じて料金が発生します。 高級魚（マダイ・シマアジなど）: 100gあたり300円〜400円程度 一般魚（アジ・クロダイなど）: 1匹200円〜500円程度（※料金は変動あり） 鮮度抜群: 釣った魚は氷締めにして持ち帰れます。スーパーで買うより断然新鮮です。 大黒イルカランド釣り堀の魅力3選 \u0026nbsp; 「天然」の海を使ったイケス コンクリートのプールではなく、自然の入り江を仕切った釣り場なので、潮の満ち引きがあり魚のコンディションが良いのが特徴です。\n手ぶらで100%楽しめる 竿もエサも全て現地で揃います。観光の合間に、普段着のままでふらっと立ち寄れる気軽さが魅力です。\n「食」まで完結 釣った魚は持ち帰れるほか、施設によっては調理してもらえる場合もあります（要確認）。自分で釣った魚をその日の夕食にする、最高の食育体験になります。\nこんな人に最適！ \u0026nbsp; ファミリー: パパがいいところを見せるチャンス！子供でも簡単に釣れる小魚もいます。 カップル: イルカショーで盛り上がった後の「ちょっとしたアクティビティ」に最適。 観光客: 宮崎・鹿児島旅行の思い出とお土産（魚）を同時にゲットできます。 攻略法：お財布を守りつつ楽しむコツ \u0026nbsp; 「楽しすぎて釣りすぎた…（請求額数万円）」とならないための、賢い遊び方です。\n1. 狙う魚を決める（予算管理） \u0026nbsp; 予算重視コース: アジやヘダイなどの「一般魚」を中心に狙う。これなら数匹釣っても数千円で収まります。 豪華一点豪華コース: 「マダイかシマアジを1匹だけ釣る！」と決めて、大物が釣れたら即終了。これなら予算5,000円程度で豪華なお土産が手に入ります。 2. スタッフに聞く \u0026nbsp; イケスの中には様々な魚がいます。「あまり高くなくて、子供でも釣れる魚はどこですか？」とスタッフに聞けば、親切にポイントを教えてくれます。\n3. クーラーボックスを持参する \u0026nbsp; 発泡スチロール箱も売っていますが、持参すればその分節約できます。南九州の観光にはクーラーボックスが必須です！\nアクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 宮崎県と鹿児島県の県境近くに位置しています。\n宮崎市から: 国道220号線を南下して約1時間30分。日南海岸の絶景ドライブコースです。 志布志市から: 車で約15分。フェリー（さんふらわあ）利用の方にも便利な立地です。 公共交通機関 \u0026nbsp; JR日南線「串間駅」または「福島今町駅」からタクシー利用。 ※本数が少ないため、車（レンタカー）でのアクセスを強くおすすめします。 まとめ：家族みんなが笑顔になれる釣り堀 \u0026nbsp; 志布志湾大黒イルカランドの釣り堀は、本格的な釣り場というよりは**「ハズレのない魚釣り体験施設」**です。\n「せっかく釣りに行ったのに釣れなかった…」という悲しい思い出になることはまずありません。 イルカに癒やされ、魚の引きにドキドキし、最後は美味しい魚でお腹を満たす。 そんな贅沢な休日を、ぜひ家族で過ごしてみてください。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 9,
        href: "/miyagi/sendai-port-central-park-sea-square/",
        title: "【宮城県】仙台港中央公園（海の広場）｜仙台駅から25分！入場...",
        description: "「今週末、子供と釣りに行きたいけど、遠出はちょっと…」 「お金をかけずに、安全な場所で海釣りを楽しみたい」",
        
        
        content: "「今週末、子供と釣りに行きたいけど、遠出はちょっと…」 「お金をかけずに、安全な場所で海釣りを楽しみたい」\nそんな仙台在住のファミリーに絶大な人気を誇るのが、**「仙台港中央公園（海の広場）」**です。\n仙台駅から車で約25分という抜群のアクセスに加え、入場料も駐車場も無料。 しっかりと整備された転落防止柵があり、すぐ後ろには芝生広場が広がる、まさに「公園感覚」で海釣りを楽しめる貴重なスポットです。\n近くには「三井アウトレットパーク 仙台港」や「仙台うみの杜水族館」もあり、釣りのついでにショッピングや観光も楽しめる、休日の最強ルートをご提案します。\n仙台港中央公園の基本情報 \u0026nbsp; 項目 詳細 施設名 仙台港中央公園（通称：海の広場） 住所 〒983-0001 宮城県仙台市宮城野区港2丁目5 利用時間 7:00～18:00（11月～3月は17:00まで）\n※時間外は閉鎖され立入禁止となります 定休日 なし（※荒天時等は閉鎖の場合あり） 料金 完全無料（入場料・駐車場とも） 駐車場 あり（無料・約100台） 設備 トイレ、自動販売機、手洗い場、転落防止柵、芝生広場 公式サイト 宮城県土木部港湾課 仙台港中央公園のここがすごい！ \u0026nbsp; 鉄壁の安全性 釣り場となる岸壁には、大人の腰ほどの高さがある頑丈な**転落防止柵（フェンス）**が設置されています。小さなお子様が海に落ちる心配が極めて少なく、目を離さずに見守ることができます。\n圧倒的なコスパ 入場料はもちろん、駐車場まで無料です。浮いたお金で、近くのアウトレットで美味しいランチを食べたり、少し良い釣りエサを買ったりできます。\n「釣り＋α」が充実 広大な芝生広場や、小高い丘（展望台）があり、釣りに飽きた子供たちは走り回って遊べます。トイレもきれいに管理されており、女性やお母さんも安心です。\nこんな人に最適！ \u0026nbsp; 釣りデビューのファミリー: 足場が平らで柵があり、これ以上ないほど安全な環境です。 短時間で遊びたい人: 仙台市街から近いので、「午後から少しだけ」といった使い方が可能です。 カップル: ロケーションが良く、夕暮れ時はとても綺麗です。釣りと散歩を兼ねたデートにもおすすめ。 仙台港中央公園の攻略法 \u0026nbsp; 安全で快適な公園ですが、釣果を伸ばすには少しコツがいります。\n1. 狙いは「サビキ釣り」一択 \u0026nbsp; ファミリーなら、迷わずサビキ釣りを選びましょう。 夏～秋（7月～10月頃）にかけて、イワシ、サバ、サッパの群れが入ってきます。群れに当たれば、足元に仕掛けを落とすだけで入れ食いになります。\n2. 「手前」か「ちょい投げ」か \u0026nbsp; 足元（ヘチ）: サビキ釣りで回遊魚を狙うか、ブラクリ仕掛けでアイナメやソイなどの根魚を探ります。基礎が入っているため根掛かりに注意。 ちょい投げ: 柵があるため本格的な遠投は難しいですが、軽く投げる（ちょい投げ）でカレイやハゼが狙えます。特に春と秋のカレイは人気ターゲットです。 3. オキアミは「解凍済み」を持参 \u0026nbsp; 園内に売店やエサ売り場はありません。 近く（車で5分圏内）に大型釣具店「キャスティング仙台港店」があるので、そこで仕掛けやエサを調達してから向かいましょう。\n釣れる魚種と時期 \u0026nbsp; 春（4月～6月）: カレイ、メバル、アイナメ 夏（7月～8月）: イワシ、サバ、アナゴ、シャコ 秋（9月～11月）: サバ（良型）、イワシ、ハゼ、サヨリ 冬（12月～3月）: アイナメ、ソイ、クリガニ アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 仙台駅から: 国道45号線を多賀城・石巻方面へ約25分。 高速道路から: 仙台東部道路「仙台港IC」から約5分。 駐車場: 公園入口に無料駐車場があります。休日は満車になることも多いので、早めの到着がおすすめです。 公共交通機関 \u0026nbsp; JR仙石線「中野栄駅」から徒歩約25分（少し距離があります）。 タクシー利用なら中野栄駅から約5分。 まとめ：仙台最強の「ファミリー釣り公園」 \u0026nbsp; 仙台港中央公園は、**「手軽さ」「安全性」「周辺環境」**のすべてが高水準でまとまっています。 大物を釣るような派手な釣り場ではありませんが、家族で青空の下、糸を垂らしてのんびり過ごすには最高のロケーションです。\n今度の週末は、お弁当を持って仙台港へ出かけてみませんか？ 潮風を感じながらのアウトドア体験は、きっと子供たちの良い思い出になるはずです。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 10,
        href: "/kyoto/miyazu-city-marine-fishing-park/",
        title: "【京都府】宮津市海洋つり場｜絶景の宮津湾で楽しむ！格安1,1...",
        description: "日本三景「天橋立」のほど近く、美しい宮津湾に浮かぶ釣り桟橋。 それが「宮津市海洋つり場」です。",
        
        
        content: "日本三景「天橋立」のほど近く、美しい宮津湾に浮かぶ釣り桟橋。 それが**「宮津市海洋つり場」**です。\nこの施設の最大の魅力は、「公営ならではの格安料金（大人1,100円）」と「魚種の豊富さ」。 潮通しの良い桟橋からは、初心者でも楽しめるサビキ釣りのアジから、ベテランも唸る70cmオーバーのマダイやブリまで、驚くほど多彩なターゲットが狙えます。\n穏やかな宮津湾の絶景を眺めながら、観光ついでに手軽に竿を出すもよし、腰を据えて大物を狙うもよし。 京都・日本海エリアで絶対に外せない、高コスパ釣りスポットの全貌をご紹介します。\n宮津市海洋つり場の基本情報 \u0026nbsp; 項目 詳細 施設名 宮津市海洋つり場 住所 〒626-0052 京都府宮津市小田宿野816-1 営業時間 7:00～17:00（入場は16:00まで） 営業日 金・土・日・月曜日・祝日（火・水・木は休み）\n※例年4月～11月末までの期間限定営業 利用料金 大人（高校生以上）：1,100円\n小人（小中学生）：550円\n見学者：同額 駐車場 あり（500円/回） 釣れる魚 マダイ、クロダイ、アジ、キス、アオリイカ、サゴシ（サワラ）、ブリ、メバル 公式サイト 宮津市海洋つり場 2025年シーズンの注意点 \u0026nbsp; 営業期間は例年4月から11月までとなっていますが、年によって変動する場合があります。また、「金・土・日・月・祝」のみの営業となっており、平日の火〜木曜日は定休日となるため、釣行計画を立てる際は注意が必要です。\n充実のレンタル＆設備 \u0026nbsp; 売店ではエサ（オキアミ、アミエビ等）や仕掛けの販売がありますが、レンタル竿の在庫数は限られる場合があります。確実に手ぶらで楽しみたい場合は、事前に電話確認するか、宮津駅周辺の釣具店で調達してからの訪問がおすすめです。\n宮津市海洋つり場の攻略法 \u0026nbsp; 桟橋の位置取りと特徴 \u0026nbsp; 沖に向かってT字型に伸びる桟橋は、先端に行くほど水深があり潮通しが良くなります。\n先端付近：青物（サゴシ、ハマチ）やマダイなどの大物狙いに最適。潮の流れが速いことがあります。 桟橋中央〜手前：アジやキス、根魚狙いのファミリーフィッシングにおすすめ。足場も安定しており安全です。 季節別のおすすめターゲット \u0026nbsp; 春（4月〜6月）：乗っ込みマダイ＆クロダイ\n大型が狙えるベストシーズン。 カゴ釣りやフカセ釣りで、底付近をじっくり攻めると良型のマダイがヒットします。 夏（7月〜8月）：数釣りのアジ＆キス\nサビキ釣りでアジやイワシが入れ食いになることも。 ちょい投げでキスやベラなど、五目釣りが楽しめます。熱中症対策は万全に。 秋（9月〜11月）：青物＆アオリイカ\n最も盛り上がるシーズン。 エギングでアオリイカ、ルアー（ジグ）や泳がせ釣りでサゴシやハマチが狙えます。 特にサゴシの回遊に当たれば、短時間でクーラー満タンも夢ではありません。 釣果を伸ばすコツ \u0026nbsp; タナ（水深）の調整：水深があるため、ウキ下をしっかり調整することが重要です。底付近でマダイ、中層で青物が回遊します。 潮周りを見る：宮津湾は潮の満ち引きで魚の活性が大きく変わります。潮が動いている時間帯（上げ始め、下げ始め）に集中しましょう。 アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; **京都縦貫自動車道「宮津天橋立IC」**から約20分。 国道178号線を北上し、案内看板に従って海沿いを進みます。 道中の景色も良く、快適なドライブが楽しめます。 公共交通機関でのアクセス \u0026nbsp; 京都丹後鉄道「宮津駅」からタクシーで約10〜15分。 バスは本数が少ないため、タクシー利用が現実的です。 実際に利用したユーザーの声 \u0026nbsp; ※実際のレビューを参考に要約しています。\n40代男性（ファミリー）「★★★★★｜5.0」 \u0026nbsp; 「コスパ最強！」 大人1,100円でこれだけ釣れれば文句なし。子供はサビキでアジを大量に釣り、私は投げ釣りでキスとカレイをゲット。駐車場も広くて安心でした。\n30代男性（ルアーマン）「★★★★☆｜4.0」 \u0026nbsp; 「サゴシ祭りに遭遇」 秋に行きましたが、朝イチでサゴシが連発しました。桟橋が高いのでタモ網は柄の長いもの（5m以上）が必要です。営業日が限られているのだけがネックかな。\n60代男性（ベテラン）「★★★★☆｜4.0」 \u0026nbsp; 「マダイが出る」 釣り公園と侮るなかれ。カゴ釣りでしっかり棚を合わせれば、50cmクラスのマダイが食ってくる。足元が良いので、磯よりも楽に大物とのやり取りが楽しめる。\nまとめ：宮津市海洋つり場はどんな人におすすめ？ \u0026nbsp; こんな人に最適 \u0026nbsp; 安く、かつ本格的な釣果を求めたい人 天橋立観光のついでに竿を出したいファミリー 足場の良い場所でマダイや青物に挑戦したい初心者〜中級者 日本海側の豊かな魚影と、公営施設ならではの安心感・低価格が見事に調和した釣り場です。 観光の合間の「ちょっと釣り」から、クーラーボックス満タンを目指す「ガッツリ釣り」まで、幅広いニーズに応えてくれる宮津の海で、素敵な休日を過ごしてみてください。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 11,
        href: "/kyoto/maizuru-shinkai-park/",
        title: "【京都府】舞鶴親海公園｜入場無料！365日楽しめる舞鶴湾のフ...",
        description: "「無料」で「365日」楽しめる。 釣り人にとってこれほど嬉しい条件が揃った施設は、関西でも数えるほどしかありません。 京都府舞鶴市にある「舞鶴親海公園」は、その名の通り、海と親しむために開放された楽園です。",
        
        
        content: "「無料」で「365日」楽しめる。 釣り人にとってこれほど嬉しい条件が揃った施設は、関西でも数えるほどしかありません。 京都府舞鶴市にある**「舞鶴親海公園」**は、その名の通り、海と親しむために開放された楽園です。\n広々とした安全な護岸はファミリーフィッシングに最適。 さらに、関西電力舞鶴発電所のPR館「エル・マールまいづる」が併設されており、釣りだけでなく学びや遊びもセットで楽しめます。\n入場は基本無料（清掃協力金300円推奨）。 美しい舞鶴湾を目の前に、のんびりと糸を垂れる贅沢な時間を過ごしてみませんか？\n舞鶴親海公園の基本情報 \u0026nbsp; 項目 詳細 施設名 舞鶴親海公園（まいづるしんかいこうえん） 住所 〒625-0135 京都府舞鶴市千歳897-1 営業時間 ・4月～11月：7:00～18:00（6～8月は19:00まで）\n・12月～3月：7:00～17:00 定休日 年中無休 利用料金 無料（清掃協力金300円にご協力ください） 駐車場 あり（無料） 釣れる魚 アジ、チヌ（クロダイ）、グレ（メジナ）、アオリイカ、サヨリ、メバル、カサゴ 公式サイト [舞鶴親海公園 快適な環境と「エル・マールまいづる」 \u0026nbsp; 公園内にはトイレや手洗い場はもちろん、レストランやお土産ショップが入った「M\u0026rsquo;s deli（エムズデリ）」があります。釣りでお腹が空いても安心。併設の「エル・マールまいづる」は豪華客船をイメージした体験型施設（入館無料）で、お子様が釣りに飽きても遊べる場所があります。\n舞鶴親海公園の攻略法 \u0026nbsp; 釣り場の特徴とポイント \u0026nbsp; 足場の良いコンクリート護岸がメインの釣り場です。前面に柵があり、小さなお子様連れでも安心して楽しめます。水深は場所によりますが、足元でも十分な深さがあるため、サビキ釣りや落とし込み釣りが成立します。\n季節別のおすすめターゲット \u0026nbsp; 春〜夏：サビキでアジ・イワシ\nファミリーに一番人気のシーズン。 サビキ釣りでアジ、イワシ、サバが数釣りできます。回遊があれば鈴なりに釣れることも。 秋：アオリイカ・サヨリ\nエギングでのアオリイカ狙いが人気。新子のシーズンは数釣りが楽しめます。 水面を泳ぐサヨリも見逃せません。専用のシモリ浮き仕掛けで狙いましょう。 冬〜春：チヌ・根魚\n舞鶴湾はチヌ（クロダイ）の魚影が濃いエリア。フカセ釣りやダンゴ釣りで良型が狙えます。 足元の壁際を探れば、メバルやガシラ（カサゴ）といった根魚も期待できます。 釣果を伸ばすコツ \u0026nbsp; サビキは「下カゴ」で：関西では一般的な「下カゴ」式のサビキ仕掛けが使いやすいです。 ゴミは持ち帰る：無料で開放されている貴重な釣り場です。近年、ゴミ問題で閉鎖される釣り場が増えています。必ずゴミは持ち帰り、清掃協力金への協力も心がけましょう。 アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; **舞鶴若狭自動車道「舞鶴東IC」**から約20分。 国道27号線を経由し、案内標識に従って進みます。 無料駐車場（約140台）が完備されているので、車でのアクセスが非常に便利です。 実際に利用したユーザーの声 \u0026nbsp; ※実際のレビューを参考に要約しています。\n30代女性（ファミリー）「★★★★★｜5.0」 \u0026nbsp; 「施設がキレイ！」 トイレもキレイで、レストランもあるので子供連れには最高です。柵があるので海に落ちる心配もなく、安心して見ていられました。小アジがたくさん釣れて夜ご飯のおかずになりました。\n50代男性（ベテラン）「★★★★☆｜4.0」 \u0026nbsp; 「年中無休はありがたい」 冬場でも開いている貴重な釣り場。チヌ狙いで通っています。無料ですが、マナーとして清掃協力金は必ず払うようにしています。この環境を守りたいですね。\n20代男性（グループ）「★★★☆☆｜3.5」 \u0026nbsp; 「エギング人気」 秋に行ったらエギングの人が多かったです。スミ跡もちらほら。ただ、人気の釣り場なので週末は混みます。早めに行くのが吉。\nまとめ：舞鶴親海公園はどんな人におすすめ？ \u0026nbsp; こんな人に最適 \u0026nbsp; 家族やカップルで、快適・安全に釣りを楽しみたい人 入場料を節約して、その分美味しいランチを食べたい人 舞鶴観光のルートに釣りを組み込みたい人 「釣り公園」としての完成度が非常に高く、無料とは思えない充実した設備が魅力です。 初めての海釣りデビューにもこれ以上ない環境と言えるでしょう。 マナーを守って、この素晴らしい「親海」の空間を楽しみ尽くしてください。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 12,
        href: "/kumamoto/kaijo-tsuribori-tsuriichi/",
        title: "【熊本県】海上釣堀・釣りイカダ 釣り一｜3時間制・マダイ2匹...",
        description: "「本格的な海釣りはしたいけど、丸一日潰れるのはちょっと…」",
        
        
        content: "「本格的な海釣りはしたいけど、丸一日潰れるのはちょっと…」\nそんな方にぴったりなのが、熊本市内から一番近い海上釣り堀「釣り一（つりいち）」です。\nここのキーワードは、「3時間1本勝負」と「絶対もらえる2匹のマダイ」。 だらだらと時間をかけることなく、短時間集中で高級魚を狙うスタイルは、観光や週末のレジャーに最適。さらに、もしも釣れなかった場合でも「マダイ2匹」のお土産が確約されているため、クーラーボックスが空っぽで帰る悲しみとは無縁です。\n人数が増えるほど安くなる「団体割引」もあり、グループでの利用満足度が非常に高いこの施設の魅力を深掘りします。\n海上釣堀・釣り一の基本情報 \u0026nbsp; 項目 詳細 施設名 海上釣堀・釣りイカダ 釣り一（つりいち） 住所 〒869-3603 熊本県天草市大矢野町中4231（集合場所） 営業時間 7:30～17:00（※実釣時間は3時間） 定休日 元旦のみ 料金 6,000円～（人数割引あり）※渡船料込み 保証 マダイ2匹（釣れなかった場合） 予約 完全予約制（前日16時まで） 公式サイト 海上釣堀・釣りイカダ 釣り一 人数が多いほど安くなる！料金システム \u0026nbsp; 釣り一は「3時間釣り放題」の基本プランを採用しています。特筆すべきは、人数によって料金が変動するシステムです。\n＜基本料金（3時間制）＞ ※渡船料・釣り料金を含みます。\n人数（小学生以上） 料金（1人あたり） 割引 1～3名 6,000円 - 4～5名 5,500円 500円OFF 6名以上 5,000円 1,000円OFF ここがお得！\n6名以上のグループなら、通常より1人1,000円もお得！ 会社のレクリエーションや、2・3家族合同での釣行に最適です。 万が一ボウズ（0匹）でも、市場価格で十分元が取れる「マダイ2匹」が貰えます。 ＜オプション料金＞\nレンタル一式：1,000円（竿・リール・ウキ・ハリス・オキアミ） 見学（渡船料）：大人1,000円 / 小学生500円 / 幼児無料 延長：要相談（予約時に確認） 禁止事項とルール \u0026nbsp; 利用者が平等に楽しめるよう、いくつかの制限があります。\n竿持ち込み：1人1本まで（予備竿の持ち込みは可）。 釣り方：「ウキ釣り」の「1本針」限定。 禁止：撒き餌（コマセ）、サビキ釣り、ルアー、2本針以上の仕掛け。 3時間で結果を出す！攻略のヒント \u0026nbsp; 制限時間が決まっているため、効率よく釣ることが重要です。\n釣り場環境とターゲット \u0026nbsp; 大矢野島の沖合に浮かぶイケスへは、専用の渡船で移動します（数分）。 波が穏やかな内湾に位置するため、船酔いの心配も少なく、足場も安定しています。\n主なターゲット\n通年：マダイ 季節：シマアジ、ブリ、カンパチ、イサキ、ヒラメ、ハタ類 釣果を伸ばす3つのコツ \u0026nbsp; 「ウキ下」調整をマメに\nスタッフにその日の「釣れているタナ（深さ）」を必ず聞きましょう。 基本は底付近ですが、活性が高い時は中層に浮いてくることもあります。 エサのバリエーション\n基本のエサ（オキアミ）は必携ですが、**「マダイイエロー（練り餌）」や「キビナゴ」**など、違う種類のエサをローテーションすると目先が変わって食いつきが良くなります。 朝一番を逃さない\n魚の活性が一番高いのは、やはり朝。7:30の便で渡り、開始直後のモーニングサービス（入れ食いタイム）を逃さないようにしましょう。 海上釣堀・釣り一へのアクセス \u0026nbsp; 車でのアクセス（推奨） \u0026nbsp; 熊本市内からのアクセスは抜群です。\n熊本市内から：約1時間20分 九州道 松橋ICから：約50分 国道266号線を進み、天草五橋の1号橋（天門橋）を渡ってすぐ、「大矢野町」エリアにあります。\n周辺の立ち寄りスポット \u0026nbsp; 3時間で釣りが終わるので、その後の観光も充実させられます。\nリゾラテラス天草：おしゃれなカフェや雑貨店が集まる人気スポット（車で15分）。 天草四郎ミュージアム：天草の歴史を学べる施設（車で10分）。 スパ・タラソ天草：釣りの後の温泉は最高です（車で15分）。 実際に利用したユーザーの声 \u0026nbsp; ※実際のレビューを参考に要約しています。\n30代男性「★★★★★｜5.0」 \u0026nbsp; 「ボウズ保証が神」 初心者の彼女と行きました。彼女は残念ながら釣れませんでしたが、帰りに立派な鯛を2匹もらえて大喜び。「また来たい」と言ってくれました。\n40代男性「★★★★☆｜4.0」 \u0026nbsp; 「短時間集中で良い」 一日中ダラダラやるより、3時間で集中してやるスタイルが自分には合っています。6人で利用して安くなったし、釣果もそこそこで満足。帰りに温泉に入って帰りました。\n50代女性「★★★★★｜5.0」 \u0026nbsp; 「孫と一緒に」 孫を連れて行きました。足場が良いので安心ですし、スタッフの方が親切に教えてくれました。鯛が3匹釣れて、孫も大興奮。夕飯は鯛づくしで豪華になりました。\n35代男性「★★★☆☆｜3.0」 \u0026nbsp; 「ちょっと物足りないかも？」 釣り好きには3時間はあっという間すぎます（笑）。もっとやりたい！というところで終了時間が来てしまう。ただ、家族サービスとしては丁度いい時間設定ですね。\nまとめ：釣り一のおすすめポイント \u0026nbsp; こんな人に最適 \u0026nbsp; 「絶対に魚を持って帰りたい」人（お土産保証あり） 6人以上のグループ・団体（割引率最大） 半日遊んで、半日は観光したい人（3時間制） 「釣り一」は、釣り初心者やファミリーにとって**「絶対に失敗しない釣り堀」**です。釣れれば最高、釣れなくてもお土産付き。この安心感があるからこそ、心からレジャーを楽しめます。 次の休日は、仲間を誘って天草の海へ出かけてみませんか？"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 13,
        href: "/kumamoto/sea-fishing-land/",
        title: "【熊本県】海釣りランド｜格安700円・手ぶらセット2,000...",
        description: "「とにかく安く、でも本格的に釣りたい！」",
        
        
        content: "「とにかく安く、でも本格的に釣りたい！」\nそんな欲張りな願いを叶えてくれるのが、熊本県芦北町にある「海釣りランド」です。\nここの凄さは何と言っても**「大人700円」**という入場料の安さ。 ジュース数本分の料金で、沖合に突き出た全長150mの「橋型桟橋」から極上の潮通しを独占できます。ルアーでシーバスを狙うもよし、サビキでアジを狙うもよし。\n「道具もエサもない！」という方には、全て込みで2,000円の「手ぶらセット」も用意。お財布に優しすぎる、芦北の海の遊び場をご紹介します。\n海釣りランドの基本情報 \u0026nbsp; 項目 詳細 施設名 海釣りランド（御立岬公園内） 住所 〒869-5305 熊本県葦北郡芦北町田浦町太田 営業時間 8:00～17:00（4月〜10月は6:00〜19:00などの変動あり ※要確認） 定休日 毎週水曜・木曜日（祝日の場合は営業） 料金 大人700円、子供300円 設備 トイレ、駐車場、自販機、休憩所 公式サイト 海釣りランド 驚異のコストパフォーマンス \u0026nbsp; 他の海釣り公園と比較しても、圧倒的な安さを誇ります。\n＜入場料金＞\n大人（高校生以上）：700円 子供（小・中学生）：300円 見学（釣りをしない方）：大人300円 / 子供200円 ＜手ぶらセット（入場料込み！）＞\n料金：2,000円 内容：入場料 + 貸竿 + 仕掛け + エサ（オキアミ） ポイント：2,000円札1枚で、手ぶらで海釣りが完結します。観光のついでに最適！ 注意事項 \u0026nbsp; 定休日：水・木曜日の週2日休みです。 安全面：手すりが少し低め（膝〜腰程度）の場所があります。小さなお子様連れは特に目を離さないようにしましょう。ライフジャケット（無料貸出あり）の着用を強くおすすめします。 海釣りランドの攻略法と釣り場特徴 \u0026nbsp; 釣り場環境 \u0026nbsp; 陸地から海に向かって「T字型」や「L字型」ではなく、一本の橋のように沖へ伸びているのが特徴。 足元は金網ではなくコンクリート敷きなので、歩きやすく初心者でも安心です。\nここが狙い目！\n先端付近：最も潮通しが良く、回遊魚（アジ・サバ・青物）の魚影が濃い一等地。 橋脚周り：クロダイ（チヌ）やメバルが居着いています。ウキ釣りや落とし込みで柱の際を攻めるのがセオリー。 季節別のターゲット \u0026nbsp; 季節 ターゲット おすすめ釣法 春（3-5月） クロダイ、メバル フカセ釣り、探り釣り 夏（6-8月） アジ、シーバス、キス サビキ釣り、ルアー、投げ釣り 秋（9-11月） アオリイカ、サヨリ、カマス エギング、サビキ釣り 冬（12-2月） メバル、カサゴ 穴釣り、夜釣り（※営業時間に注意） おすすめタックル\n万能なのは**「サビキ釣りセット」**。アジやイワシが回遊してくれば数釣りが楽しめます。 ルアーマンなら**「シーバスロッド」**。橋脚の明暗部（朝夕）についているシーバスや、秋のアオリイカが狙えます。 海釣りランドへのアクセス \u0026nbsp; 車でのアクセス（推奨） \u0026nbsp; 熊本市内や八代市からのドライブコースとしても人気です。\n熊本市内から：約1時間30分（九州自動車道・南九州自動車道経由） 八代市から：約40分 最寄りIC：南九州西回り自動車道「田浦IC」から車で約5分 「御立岬（おたちみさき）公園」の敷地内にあります。案内看板に従って海沿いへ進んでください。駐車場から釣り場までは少し歩きますが、海を眺めながらの移動も気持ちが良いです。\n公共交通機関 \u0026nbsp; 肥薩おれんじ鉄道「たのうら御立岬公園駅」より徒歩約20〜30分。 ※タクシー利用推奨。 実際に利用したユーザーの声 \u0026nbsp; ※実際のレビューを参考に要約しています。\n30代男性「★★★★★｜5.0」 \u0026nbsp; 「とにかく安い！」 700円で一日遊べるのは破格。近くの釣具屋でエサを買っていつも行きます。アジが100匹くらい釣れたこともあがり、コスパ最強です。\n40代女性「★★★★☆｜4.0」 \u0026nbsp; 「子供のデビュー戦に」 息子と手ぶらセットを利用しました。スタッフのおじさんが親切で、糸が絡まった時も助けてくれました。トイレがあるのも女性には有り難いです。\n60代男性「★★★★☆｜4.0」 \u0026nbsp; 「チヌ釣り師におすすめ」 ここの橋脚周りはチヌの魚影が濃い。安いので毎週のように通っている常連も多い。ただ、水・木休みで週の真ん中に行けないのが玉にキズ。\n20代男性「★★★☆☆｜3.0」 \u0026nbsp; 「手すりが低いかも」 釣果は良かったけど、場所によっては手すりが低くてちょっと怖い。子供連れはライフジャケット必須。風が強い日は結構煽られるので注意。\nまとめ：海釣りランドはこんな場所！ \u0026nbsp; 施設の魅力 \u0026nbsp; 圧倒的低価格：入場700円、手ぶらセット2,000円。 本格的なフィールド：沖に突き出た桟橋で潮通し抜群。 御立岬公園内：温泉やゴーカートなど、釣り以外のレジャーも充実。 おすすめユーザー \u0026nbsp; お小遣い制のお父さん（味方です！） コストを抑えて釣りを楽しみたい学生グループ 温泉旅行のついでに少しだけ竿を出したい観光客 「海釣りランド」は、誰でもウェルカムな懐の広さと、ベテランも唸る魚影の濃さを併せ持つ優良施設です。 浮いたお金で、帰りは御立岬公園の温泉に入って帰るのが黄金ルート。今度の休みは700円を握りしめて、芦北の海へ出かけてみませんか？"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 14,
        href: "/kumamoto/amakusa-rakutsuri/",
        title: "【熊本県】天草観光海上釣り堀 楽つり｜1時間完結・手ぶらOK...",
        description: "「天草の海に来たなら、釣りもしたい。でも時間はかけられない…」",
        
        
        content: "「天草の海に来たなら、釣りもしたい。でも時間はかけられない…」\nそんな観光客のわがままな願いを完璧に叶えてくれるのが、天草市五和町（いつわまち）にある「天草観光海上釣り堀 楽つり（らくつり）」です。\nここの最大の特徴は、**「1時間1本勝負」**という独自のスタイル。 釣具もエサも全てコミコミの「手ぶらプラン」で、イルカウォッチングの名所である二江港から専用ボートで釣り場へGO。まるでアトラクションのようにマダイや青物釣りを体験できます。観光スケジュールの隙間にスポッと収まる、天草旅行の最強サブコンテンツをご紹介します。\n天草観光海上釣り堀 楽つりの基本情報 \u0026nbsp; 項目 詳細 施設名 天草観光海上釣り堀 楽つり 住所 〒863-2421 熊本県天草市五和町二江4689-10（道の駅 天草市イルカセンター近く） 営業時間 9:00～16:00（最終受付17:00） ※1時間ごとの予約制 定休日 不定休（要確認） 料金 大人 3,000円 / 子供 2,000円（1時間・竿・エサ・氷込み） 釣れる魚 マダイ・メジナ・アジ・シマアジ・ブリ・カンパチ・ヒラメ 予約 電話予約推奨（9:00～16:00受付） 公式サイト 天草観光海上釣り堀 楽つり 驚くほどシンプルな料金体系 \u0026nbsp; 楽つりは「観光客が迷わない」ことを最優先にした、超シンプルな料金設定です。\n＜基本料金（1時間コース）＞ ※竿、エサ（オキアミ）、ライフジャケット、氷代が含まれます。\n大人（中学生以上）：3,000円 子供（小学生以下）：2,000円 ＜同伴・見学料金＞\n大人：500円 子供：300円 ここがポイント！\n追加料金ゼロ：レンタル料もエサ代も込みの明朗会計。 持ち帰り自由：1時間の間に釣れた魚は全て持ち帰りOK！ 手ぶら推奨：自分の竿を持ち込む必要はありません（というよりレンタル一択です）。 利用の流れと注意事項 \u0026nbsp; 予約：希望の時間（例：11:00～12:00）を電話で予約。 受付：予約時間の15分前に「天草島旅の案内所」または指定場所へ集合。 移動：港から小舟で数分、海上のイケスへ移動します。 実釣：スタッフの合図で1時間スタート！ 終了：時間になったら帰港。釣れた魚は氷締めして渡してくれます。 注意点：あくまで「1時間限定」のエンタメ体験です。延長システムはないため、時間配分が勝負の鍵となります。 1時間で釣果を出す！おすすめ攻略法 \u0026nbsp; 制限時間はわずか60分。のんびりしている暇はありません。効率よく釣るためのコツを伝授します。\n釣り場環境と特徴 \u0026nbsp; イルカウォッチングで有名な五和町の海上に浮かぶイケスは、潮通しが抜群。魚の活性は常に高めですが、短い時間で結果を出すには「スタッフの指示」に従うのが最短ルートです。\n究極の時短攻略テクニック \u0026nbsp; スタッフの話をよく聞く\nその日のタナ（魚がいる深さ）や、アタリのある場所をスタッフが一番知っています。最初のレクチャーは真剣に聞き、言われた通りに仕掛けを落としましょう。 「合わせ」は鋭く！\nウキが沈んだら即アワセ。飲まれると針外しの時間がロスになります。 手返し重視\nエサを取られたらすぐに付け替えて投入。竿を上げている時間を極力減らすことが、1匹でも多く釣る秘訣です。 写真撮影は手短に\n記念撮影は最後にまとめて行うか、釣れてない同伴者にお願いしましょう。釣り人は竿を置かないこと！ 季節別のターゲット \u0026nbsp; 季節 狙える魚 特徴 春（3-5月） マダイ、アジ マダイの食いが立つベストシーズン。 夏（6-8月） 青物（ブリ・カンパチ） 強烈な引きを楽しめる青物シーズン。暑さ対策を万全に。 秋（9-11月） ヒラメ、イシダイ 魚種が豊富。高級魚ヒラメが混じることも。 冬（12-2月） マダイ（良型） 数は減るが脂の乗った美味しいマダイが狙える。 天草観光海上釣り堀 楽つりへのアクセス \u0026nbsp; 車でのアクセス（推奨） \u0026nbsp; 天草観光の移動手段は車（レンタカー）が基本です。\n熊本市内から：約2時間～2時間30分 天草空港から：約15分 本渡（天草市中心部）から：約20分 熊本市内からは、国道266号線・324号線を経由して天草下島の北部「五和町二江（いつわまち ふたえ）」を目指します。「道の駅 天草市イルカセンター」の近くです。\n周辺観光との組み合わせ \u0026nbsp; 楽つりは、周辺の観光スポットとのセット利用が最強です。\nイルカウォッチング：同じ港から出船。イルカを見てから釣り、または釣りの後にイルカ、というプランが完璧です。 海鮮丼ランチ：二江周辺には美味しい海鮮丼のお店が多数。「イルカセンター」でも食事が可能です。 宿泊・レンタカー情報 \u0026nbsp; 宿泊：天草下島の中心「本渡（ほんど）」エリアのホテルや、五和・苓北エリアの民宿が便利です。 レンタカー：熊本駅・熊本空港で借りて天草入りするか、天草空港で借りるのがスムーズです。 実際に利用したユーザーの声 \u0026nbsp; ※実際のレビューを参考に要約しています。\n30代女性「★★★★★｜5.0」 \u0026nbsp; 「最高の1時間でした！」 イルカウォッチングの待ち時間に利用しました。たった1時間で鯛が釣れるなんてビックリ！手ぶらで行けるし、服も汚れないので観光の服装のままで大丈夫でした。\n40代男性「★★★★☆｜4.0」 \u0026nbsp; 「子供が大喜び」 家族旅行で。子供が飽きない「1時間」という長さが絶妙です。スタッフさんが優しく手伝ってくれたおかげで、息子も立派な鯛を釣り上げました。\n45代男性「★★★☆☆｜3.0」 \u0026nbsp; 「物足りないけど、割り切ればアリ」 釣り好きには1時間は短すぎます（笑）。ただ、家族サービスや観光のついでと割り切れば、これ以上手軽な海上釣り堀はないですね。ガッツリ釣りたい人は別の場所がいいかも。\nまとめ：楽つりはどんな人におすすめ？ \u0026nbsp; 施設の魅力 \u0026nbsp; **「1時間・手ぶら・3,000円」**という圧倒的な手軽さ。 イルカウォッチングやグルメ観光のスキマ時間にハマる。 スタッフのサポートが手厚く、初心者・子供でも釣果が出やすい。 こんな人におすすめ \u0026nbsp; 天草観光のスケジュールが詰まっているけど、釣りもしたい人 子供に初めての「大物釣り」を体験させたいファミリー イルカウォッチングの待ち時間を有効活用したい方 「楽つり」は、釣りを特別な趣味としてではなく、**「天草旅行のアトラクション」**として楽しむ場所です。準備ゼロでふらっと立ち寄り、1時間後にはクーラーボックスに鯛が入っている。そんな魔法のような体験をぜひ味わってみてください。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 15,
        href: "/kumamoto/amakusa-leisure-land/",
        title: "【熊本県】天草釣堀レジャーランド｜時間制料金・キープシステム...",
        description: "「今日は天気がいいから、海釣りでも行こうか」",
        
        
        content: "「今日は天気がいいから、海釣りでも行こうか」\n思いたったその日に実行できるのが、上天草市にある「天草釣堀レジャーランド」です。\n多くの海上釣り堀が「予約必須・早朝開始・半日コース」である中、ここは**「予約不要・いつ来てもOK・1時間から遊べる」**という異色のシステムを採用。ドライブ途中に1時間だけ竿を出すことも、朝寝坊してから午後からガッツリ釣ることも自由自在です。\nさらに驚きなのが、釣りすぎた魚を預かってくれる「キープシステム」。クーラーボックスに入り切らない大漁も無駄にしない、常連客に愛される独自のサービスを紐解きます。\n天草釣堀レジャーランドの基本情報 \u0026nbsp; 項目 詳細 施設名 天草釣堀レジャーランド 住所 〒869-3603 熊本県上天草市大矢野町中5697-1 権兵島 営業時間 8:00～16:00 定休日 不定休（※木曜日休みが多い。公式カレンダー要確認） 料金 入場500円＋1時間2,000円～（時間制） 予約 予約不要（当日直接現地へ） 釣れる魚 マダイ・メジナ・シマアジ・ブリ・カンパチ・ヒラメ・イシダイ 公式サイト 天草釣堀レジャーランド 自由すぎる「時間制」料金システム \u0026nbsp; 一般的な釣り堀のような「パック料金」ではなく、遊んだ時間分だけ払う料金設定です。\n＜基本料金＞\n入場料：大人500円 / 子供300円 釣堀利用料：1時間 2,000円 ＜お得な長時間割＞\n利用時間 料金 割引額 1時間 2,000円 - 2時間 4,000円 - 3時間 6,000円 - 4時間 8,000円 - 5時間 9,000円 1,000円お得 6時間 10,000円 2,000円お得 7時間 11,000円 3,000円お得 ここが凄い！\n30分刻みの延長：4時間以内なら30分単位で調整可能。「あとちょっとだけ！」が叶います。 後払い感覚：入場時に時間を決める必要はなく、終了時に精算（※要確認）。釣れ具合を見て時間を決められます。 独自の「キープシステム」とは？ \u0026nbsp; 「たくさん釣れたけど、食べきれないし近所に配るのも面倒…」 そんな時に便利なのが、この施設特有の魚預かりサービスです。\n釣った魚を施設のイケスでキープ（預かり）してもらえる。 次回利用時に、預けた魚と同じサイズ・魚種の魚を引き出して持ち帰れる。 メリット：ボウズ（釣れない日）のリスクヘッジになります。「今日は釣れないから貯金（キープ魚）をおろして帰ろう」が可能！ 釣堀レジャーランドの攻略法とルール \u0026nbsp; 予約不要の気軽さの一方で、独自のルールが存在します。\n禁止事項（必ずチェック） \u0026nbsp; 撒き餌（コマセ）禁止 ルアー釣り禁止 2本針以上の仕掛け禁止（1本針のみ） ウキ無し釣り禁止（必ずウキを使用） 攻略のコツ \u0026nbsp; 「タナ合わせ」がすべて\nウキ釣り限定のため、タナ（深さ）の調整が釣果を分けます。レンタル竿は調整済みですが、自分の仕掛けを使う場合は、釣り開始前に必ず底取りをしてタナを調整しましょう。 目安：底から50cm～1m切った場所が基本。 エサのローテーション\n現地販売のエサ（オキアミ、ダンゴ）だけでなく、複数のエサを準備すると強いです。 マダイ：黄色いダンゴ餌、ササミ、エビ 青物：カツオの切り身、活きアジ（現地調達可） 潮の流れを見る\n天草の海は潮通しが良いです。潮がイケスの中をどう流れているかを見て、仕掛けを自然に流すとアタリが増えます。 季節別のターゲット \u0026nbsp; 季節 狙える魚 特徴 春（3-5月） マダイ、イサキ 水温上昇と共に活性アップ。クロダイ（チヌ）も混じる。 夏（6-8月） 青物、シマアジ 高水温期の主役。強烈な引きを体験できるシーズン。 秋（9-11月） ヒラメ、アジ 魚種多彩。泳がせ釣りでヒラメが狙えることも。 冬（12-2月） マダイ、イシダイ 魚は深場に落ちるが、脂が乗って美味。 天草釣堀レジャーランドへのアクセス \u0026nbsp; 車でのアクセス（推奨） \u0026nbsp; ドライブの名所「天草五橋（パールライン）」を通る絶景ルートを通ります。\n熊本市内から：約1時間20分 福岡・長崎方面から：九州自動車道「松橋IC」下車→国道266号線 上天草市の「大矢野町」エリアにあります。道路沿いの看板を目印に「権兵島」へ渡ります。\n公共交通機関（バス） \u0026nbsp; 熊本桜町バスターミナルから「天草方面（快速あまくさ号）」に乗車。 「大矢野」エリアで下車し、タクシー利用（約10分）。 ※バスの本数は少ないため、車でのアクセスを強くおすすめします。 宿泊・レンタカー情報 \u0026nbsp; 宿泊：上天草エリアには温泉旅館やホテルが多数あります。 松島温泉：車で15分圏内。「ホテル竜宮」や「天空の船」などの人気宿があります。 レンタカー：熊本駅・熊本空港で借りるのがベストです。 実際に利用したユーザーの声 \u0026nbsp; ※実際のレビューを参考に要約しています。\n40代男性「★★★★★｜5.0」 \u0026nbsp; 「予約なしが最高」 急に休みが取れたので行きました。時間が空いた時にふらっと行ける釣り堀は貴重です。2時間で鯛3匹。サクッと釣って帰れるのが良い。\n50代女性「★★★★☆｜4.0」 \u0026nbsp; 「キープシステムに感動」 以前釣れすぎた魚をキープしていたので、今回はボウズでしたがキープ分を持ち帰りました。まるで銀行みたいで面白いシステムです。\n30代男性「★★★★☆｜4.0」 \u0026nbsp; 「子供も飽きない」 「まだ帰らない！」と子供が言えば30分延長、「疲れた」と言えば即終了。子供の機嫌に合わせて時間を決められるのが親としては凄く助かります。\nまとめ：どんな人におすすめ？ \u0026nbsp; 施設の魅力 \u0026nbsp; 予約不要・当日参加OK：思い立ったらすぐ釣り！ 時間制料金：1時間から選べる柔軟なプラン。 キープシステム：釣果を「貯金」できる安心感。 こんな人におすすめ \u0026nbsp; 旅行のスケジュールをガチガチに決めるのが苦手な人 「ちょっと時間が空いたな」という時の遊びを探している人 子供の体力や機嫌に合わせて遊ぶ時間を調整したいパパ・ママ 定期的に通って「魚貯金」を作りたい地元・近隣の方 天草釣堀レジャーランドは、釣りを「イベント」から「日常の遊び」に変えてくれる場所です。ドライブの途中に見かけたら、ぜひ1時間だけ竿を出してみてください。予想外の大物があなたを待っているかもしれません。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 16,
        href: "/kumamoto/yunoko-fishing-park/",
        title: "【熊本県】湯の児フィッシングパーク｜格安料金600円・レンタ...",
        description: "「たった600円で、これほど楽しめるのか？」",
        
        
        content: "「たった600円で、これほど楽しめるのか？」\nそんな嬉しい驚きを与えてくれるのが、熊本県水俣市にある「湯の児（ゆのこ）フィッシングパーク」です。\n不知火海（八代海）の穏やかな海上に伸びる全長200mのプロムナードは、まさに天然の釣り堀。アジやチヌ、時には季節の青物まで回遊してくる本格的なフィールドでありながら、手ぶらで訪れても安心のレンタル完備、足場の良い金網桟橋と、ファミリーフィッシングに求められる条件をすべて満たしています。\n釣りの後は名湯「湯の児温泉」で疲れを癒やす最高の週末プラン。コストパフォーマンスという言葉だけでは語り尽くせない、この施設の本当の魅力を徹底解説します。\n湯の児フィッシングパークの基本情報 \u0026nbsp; 項目 詳細 場所 〒867-0008 熊本県水俣市浜4083-4 営業時間 5～9月：7:00～19:00\n4月・10～3月：8:00～17:00 定休日 月曜日（祝祭日は営業、翌日休み）、12/30～1/1 平均予算 大人600円＋レンタル釣具1,500円（持参なら600円のみ） レンタル 入園セット大人1,500円、子供1,200円\n（竿・サビキ仕掛け・カゴ込み） 釣具の持ち込み 可能（1人2本まで） 釣れる魚 クロダイ・メバル・シーバス・アジ・タチウオ・メジナ・アオリイカ 注意事項 赤土のコマセ禁止、金網桟橋のため落下防止対策推奨 公式サイト スポーツ・アクティビティ - みなまた観光情報サイト 料金体系について \u0026nbsp; 湯の児フィッシングパークは、九州地方でも屈指の格安料金で海釣りを楽しめる施設です。\n＜入園料金＞ \u0026nbsp; 大人（16歳以上）：600円 子供（6歳以上）：300円 5歳以下：無料 ＜レンタル料金＞ \u0026nbsp; 入園セット（大人）：1,500円（竿・サビキ仕掛け・カゴ込み） 入園セット（子供）：1,200円（竿・サビキ仕掛け・カゴ込み） ライフジャケット：レンタル有り（料金要確認） 釣具を持参すれば大人わずか600円で1日海釣りを楽しむことができ、全国の海釣り施設の中でも最安クラスの料金設定です。レンタル釣具も比較的リーズナブルで、入園料と合わせても大人2,100円で手ぶら釣行が可能です。\n時間制限がないため、朝から夕方まで思う存分釣りを楽しむことができ、コストパフォーマンスは非常に優秀です。\n注意事項と補足データ \u0026nbsp; 湯の児フィッシングパークは海上に張り出した桟橋タイプの釣り施設で、足場は金網構造となっています。そのため、小物の落下防止としてレジャーシートやタオルの持参をおすすめします。\n竿の本数：1人2本まで使用可能。 釣法：サビキ釣りやフカセ釣りが人気。投げ釣りやルアー釣りも可能ですが、他の釣り人との距離に注意が必要。 エサ：赤土を使ったコマセ（撒き餌）は禁止。アミエビやオキアミなどの一般的な撒き餌のみ使用可能です。エサは現地でも販売されているため、手ぶらでの参加も安心してください。 月曜日が定休日ですが、祝祭日の場合は営業し、翌日が代休となります。営業時間は季節により変動するため、事前の確認をおすすめします。\n湯の児フィッシングパークのおすすめ仕掛け・釣りのコツ \u0026nbsp; 釣り場環境と特徴 \u0026nbsp; 湯の児フィッシングパークは水俣湾に張り出した桟橋タイプの釣り施設で、以下のような特徴があります。\n全長約200mの桟橋で十分な釣り座を確保 水深は8～15m程度で多様な魚種に対応 金網の足場で安定感があり初心者でも安心 潮通しが良く魚の回遊が期待できる立地 おすすめの仕掛けとタックル \u0026nbsp; 季節や狙う魚種に応じて様々な釣法を楽しむことができます。\nサビキ釣り（アジ・イワシ狙い） \u0026nbsp; ロッド：3～4mの磯竿または万能竿（2～3号） リール：2500～3000番台のスピニングリール 道糸：ナイロン3～4号 仕掛け：サビキ仕掛け（針6～8号） オモリ：8～15号のナス型オモリ エサ：アミエビ、オキアミ フカセ釣り（クロダイ・メジナ狙い） \u0026nbsp; ロッド：4.5～5.3mの磯竿（1.5～2号） リール：2500番台のスピニングリール 道糸：ナイロン2～3号 ハリス：フロロカーボン1.5～2.5号 エサ：オキアミ、サシアミ 投げ釣り（シーバス・タチウオ狙い） \u0026nbsp; ロッド：3.6～4.2mの投げ竿（15～30号） リール：4000番台のスピニングリール 仕掛け：胴付き仕掛け2～3本針、またはタチウオテンヤ エサ：青イソメ、アオイソメ、小魚の切り身 季節別の釣果情報 \u0026nbsp; 季節 主なターゲット 特徴 春（3-5月） クロダイ、メバル、アジ クロダイのベストシーズン。メバルの夜釣り、アジの回遊開始。 夏（6-8月） アジ、シーバス、アオリイカ サビキ釣りがピーク。シーバスの活性上昇。 秋（9-11月） タチウオ、メジナ、多彩な魚種 タチウオの回遊、メジナの活性高。魚種豊富なベストシーズン。 冬（12-2月） メバル、クロダイ メバルの夜釣りが最盛期。魚影は薄くなるが良型狙い。 釣りのコツとポイント \u0026nbsp; サビキ釣りは朝夕のマズメ時が特に有効です。 フカセ釣りでは潮の流れを読んで撒き餌を効かせるのがポイント。 桟橋の先端付近は潮通しが良く、投げ釣りの好ポイント。 夜釣りでは集魚灯（ルール要確認）を使ってメバルやアジを狙うのも手。 重要：金網の隙間に小物を落とさないよう、荷物はまとめて管理しましょう。 湯の児フィッシングパークへのおすすめアクセス情報 \u0026nbsp; 車でのアクセス｜おすすめ！ \u0026nbsp; 湯の児フィッシングパークへは車でのアクセスが最も便利です。九州自動車道からのアクセスも良好で、熊本県内外からの利用に適しています。\n主要都市からのアクセス時間\n熊本市内から：約1時間30分 福岡市内から：約2時間30分 鹿児島市内から：約1時間30分 宮崎市内から：約2時間 熊本市内からは九州自動車道を利用して水俣ICで降り、国道3号線を経由して水俣市街地へ向かうルートが最適です。\n公共交通機関でのアクセス \u0026nbsp; 公共交通機関を利用する場合は、JR鹿児島本線を利用します。\nJR熊本駅 → JR水俣駅：普通列車で約2時間 JR水俣駅 → タクシー：約10分 JR水俣駅 → 路線バス：利用可能 水俣駅周辺にはレンタサイクルもあり、天気の良い日は自転車でのアクセスも可能です。\n近隣の宿泊施設やレンタカー情報 \u0026nbsp; 水俣市周辺での滞在プラン例です。\n【最安】予算を抑えたい方向け\nビジネスホテルや民宿：5,000円～7,000円程度 水俣市内のビジネスホテルがおすすめ。 【平均】標準的な宿泊施設\n温泉旅館やシティホテル：8,000円～12,000円程度 湯の児温泉の旅館で、釣りの疲れを温泉で癒やすプランが人気。 【高くてもいい】快適さを重視する方向け\n高級温泉旅館：15,000円以上 展望風呂付き客室などで贅沢な時間を。 レンタカー情報\nトヨタレンタカー水俣営業所 ニッポンレンタカー水俣営業所 ※釣り道具を持ち込む場合は、荷物スペースを考慮してコンパクトカー以上のクラス（5,000円～8,000円/日）をおすすめします。 実際に利用したユーザーの声 \u0026nbsp; ※以下のレビューは実際の利用者の声を参考に構成したイメージです。\n50代男性「★★★★★｜5.0」 \u0026nbsp; 料金が安くて驚きました。大人600円で1日釣りができるなんて信じられません。サビキ釣りでアジがたくさん釣れて、家族みんなで大満足でした。\n40代女性「★★★★☆｜4.0」 \u0026nbsp; 家族連れで利用しました。子供の料金が300円と安く、家計に優しいです。桟橋は金網なので最初は不安でしたが、足場は安定していて安全でした。レジャーシートは必須ですね。\n30代男性「★★★★★｜5.0」 \u0026nbsp; コスパが最高の釣り場です。朝から夕方まで釣りをしても600円だけ。クロダイとシーバスが釣れて、友人たちとも盛り上がりました。水俣の温泉と組み合わせて最高の週末でした。\n60代男性「★★★★☆｜4.0」 \u0026nbsp; 年金生活には本当にありがたい料金設定です。毎月のように通っていますが、タチウオが釣れた時は特に嬉しかったです。施設も清潔で管理が行き届いています。\n35代男性「★★★☆☆｜3.0」 \u0026nbsp; 料金は確かに安いのですが、釣れる魚のサイズがやや小ぶりでした。大物を期待していたので少し物足りなく感じました。ただ、数は釣れるので子供連れには良いと思います。\n【まとめ】湯の児フィッシングパークをおすすめしたい度 \u0026nbsp; 施設の魅力と特徴 \u0026nbsp; 湯の児フィッシングパークの最大の魅力は、大人600円という破格の料金で本格的な海釣りを楽しめることです。時間制限もなく、コストパフォーマンスは全国でもトップクラス。\nレンタル釣具も充実しており、初心者や観光客でも手軽に挑戦できます。水俣湾の豊かな漁場に位置し、アジ・クロダイ・シーバス・タチウオなど多彩な魚種が狙えます。\n最適な利用シーン \u0026nbsp; 家族連れ・初心者：安価で安全、レンタル完備。 温泉旅行とのセット：湯の児温泉と合わせて満喫。 数釣りを楽しみたい：大物よりは魚種と数を楽しむ釣り場。 注意点とアドバイス \u0026nbsp; 金網対策：小物の落下防止にシートやタオルを持参しましょう。 営業確認：季節による営業時間変更や定休日に注意。 おすすめ度：★★★★☆（4/5） \u0026nbsp; 湯の児フィッシングパークは、**「安く・手軽に・安全に」**海釣りを楽しみたい方に特におすすめです。特にファミリーフィッシングや、釣り入門の場として最適。湯の児温泉と組み合わせれば、満足度の高い休日になること間違いなしです。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 17,
        href: "/hiroshima/shimanami-kaido-fishing-park/",
        title: "【広島県】しまなみ海道 つり堀公園｜瀬戸内海を一望できる手ぶ...",
        description: "広島県尾道市、サイクリストの聖地しまなみ海道沿いにある「しまなみ海道 つり堀公園」は、瀬戸内海の多島美を一望しながら釣りを楽しめる絶景スポットです。",
        
        
        content: "広島県尾道市、サイクリストの聖地しまなみ海道沿いにある「しまなみ海道 つり堀公園」は、瀬戸内海の多島美を一望しながら釣りを楽しめる絶景スポットです。\n道具のレンタルが料金に含まれているため、手ぶらで気軽に立ち寄れるのが最大の魅力。時間無制限で楽しめるため、時間を気にせずのんびりと糸を垂れることができます。さらに「ボラを釣るとキャッシュバック」というユニークなシステムもあり、ゲーム感覚で楽しめる点も人気を集めています。初心者からベテランまで、誰もが笑顔になれる海釣り体験をご紹介します。\nしまなみ海道 つり堀公園の基本情報 \u0026nbsp; 場所：〒722-2401 広島県尾道市瀬戸田町御寺805 営業時間：9:00～16:00（受付は15:00まで） 定休日：雨天・荒天時、不定休（要確認） 平均予算：大人3,000円～5,000円程度（持ち帰り魚の量による） レンタル：料金に入園料・貸竿・エサ代が含まれています 釣具の持ち込み：可能（ただし、持ち込み料が必要。1竿2,500円） 釣れる魚：マダイ、クロダイ（チヌ）、スズキ（シーバス）、ボラ、メバルなど 注意事項：魚の持ち帰りは完全買取制（100g 200円～）、ルアー釣り禁止、ペット同伴不可 ウェブサイト： しまなみ海道 つり堀公園 料金体系について \u0026nbsp; 料金システムは少し特徴的です。\n入園料：中学生以上 2,500円、小学生 2,000円、幼児 500円\nこの料金には「貸し竿」「エサ」「ライフジャケット」が含まれています。 時間無制限で釣り放題です。 魚の持ち帰り料金：量り売り（100gあたり200円～）\n釣った魚を持ち帰る場合は、重さに応じた料金が発生します。 例：1.5kgのマダイなら約3,000円程度。 キャッチ＆リリースは原則禁止の魚種もあるため、釣り過ぎには注意が必要です（要ルール確認）。 ボラボーナス：ボラを釣り上げると、なんと100円のキャッシュバック（または割引券）がもらえます！外道扱いされがちなボラですが、ここではヒーローです。\n施設の特徴と魅力 \u0026nbsp; 海上に浮かぶ桟橋タイプの釣り堀で、足場が良いため子供連れでも安心です。屋根付きの休憩スペースもあり、日差しが強い日でも快適に過ごせます。\n何より素晴らしいのはそのロケーション。目の前に広がる穏やかな瀬戸内海と島々の風景は、釣りをしていない時間さえも贅沢なものにしてくれます。サイクリングの休憩がてら立ち寄る観光客も多く、観光とアクティビティを両立できるスポットです。\nしまなみ海道 つり堀公園のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 釣り場環境と特徴 \u0026nbsp; 自然の海を網で仕切ったタイプの釣り堀なので、潮の干満の影響を強く受けます。潮が動いている時間帯が狙い目です。水深は比較的浅めですが、海底の変化に富んでおり、魚の隠れ家が多くあります。\nおすすめの仕掛けとタックル \u0026nbsp; 基本的にはレンタルの竿と仕掛けで十分に楽しめますが、持ち込みをする場合は以下の点に注意してください。\nエサ釣り限定：ルアーや疑似餌の使用は禁止されています。 竿の長さ：3m前後の短めの万能竿や磯竿が扱いやすいです。 仕掛け：ウキ釣り仕掛けが一般的です。タナ（ウキ下）を細かく調整できるものが有利です。 釣果を伸ばすコツ \u0026nbsp; タナ（深さ）の調整：これが一番重要です。まずは底付近（底から30cm～50cm切ったあたり）を狙いましょう。反応がなければ少しずつ浅くしていきます。 足元を狙う：意外と盲点なのが足元（ネット際）です。クロダイや根魚が張り付いていることが多いので、静かに仕掛けを落としてみましょう。 ボラの下を狙う：ボラが表層に群れている場合、その下に本命のマダイがいることがあります。エサを重くして素早く沈め、ボラの層を突破させましょう。 季節別の釣果情報 \u0026nbsp; 春：乗っ込みのマダイやクロダイが狙えます。大型のチャンス。 夏：魚の活性が高く、数釣りが楽しめます。熱中症対策は万全に。 秋：一年で最も魚種が豊富。アジやサバなどの回遊魚が入ることも。 冬：水温が下がりますが、脂の乗った寒チヌ（クロダイ）や根魚が狙い目です。 しまなみ海道 つり堀公園へのアクセス情報 \u0026nbsp; 車でのアクセス｜おすすめ！ \u0026nbsp; 広島・尾道方面から\n西瀬戸自動車道（しまなみ海道）「生口島北IC」または「生口島南IC」より約15分 生口島（いくちじま）の南側に位置しています。 駐車場：無料駐車場あり 愛媛・今治方面から\n西瀬戸自動車道「生口島南IC」より約10分 公共交通機関・自転車でのアクセス \u0026nbsp; フェリー＋自転車\n尾道港または三原港からフェリーで瀬戸田港へ。 瀬戸田港からはレンタサイクルで約30分～40分。海沿いの爽快なサイクリングロードを楽しめます。 バス\n島内バスがありますが本数が少ないため、タクシーまたはレンタサイクルの利用が現実的です。 近隣の宿泊施設や観光スポット \u0026nbsp; 観光スポット\n耕三寺（こうさんじ）：極彩色の建物が並ぶフォトジェニックなお寺。「未来心の丘」という白い大理石の庭園は必見です。 平山郁夫美術館：日本画の巨匠の作品を堪能できます。 宿泊施設\n旅館 つつ井：瀬戸田港近くの老舗旅館。レモン風呂と魚料理が自慢。 住之江旅館：映画のロケ地にもなった趣ある旅館。 実際に利用したユーザーの声を抜粋 \u0026nbsp; 30代男性（カップル）「★★★★☆｜4.0」 \u0026nbsp; 彼女とサイクリングの途中で寄りました。手ぶらでOKなのが助かります。最初はボラばかりでしたが、スタッフのおじさんがタナを教えてくれて、立派な鯛が釣れました！持ち帰り料はかかりましたが、近所の居酒屋で調理してもらえて最高の夕食になりました。\n40代女性（ファミリー）「★★★★★｜5.0」 \u0026nbsp; 時間無制限なのがいいですね。子供が飽きても休憩スペースでお菓子を食べさせたりして、一日中遊べました。ボラを釣ると100円もらえるシステムに子供が大興奮。「お小遣い稼ぐぞ！」と張り切っていました（笑）。\n50代男性（ソロ）「★★★☆☆｜3.0」 \u0026nbsp; 景色は最高です。ただ、買取制なので調子に乗って釣りすぎると財布が軽くなります。持ち帰り用のクーラーボックスは持参したほうがいいですね（発泡スチロールは有料だったので）。\n【まとめ】しまなみ海道 つり堀公園をおすすめしたい理由 \u0026nbsp; しまなみ海道 つり堀公園は、「観光＋釣り」の組み合わせに最適なスポットです。本格的な装備がなくても、絶景の中で手軽に竿を出せる体験は、旅の思い出をより鮮やかなものにしてくれます。\n釣った魚はお土産にするもよし、島内の飲食店で調理してもらうもよし（要事前確認）。しまなみ海道を訪れる際は、ぜひ立ち寄ってみてはいかがでしょうか。海風に吹かれながらのんびりと魚と遊ぶ時間は、心身ともにリフレッシュできるはずです。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 18,
        href: "/hiroshima/kaijo-tsuribori-kaiyu/",
        title: "【広島県】海上釣り堀 海遊｜瀬戸内海の離島で14種類の高級魚...",
        description: "広島県大竹市の沖合に浮かぶ阿多田島（あたたじま）。そこに釣り人のパラダイス「海上釣り堀 海遊（かいゆう）」はあります。",
        
        
        content: "広島県大竹市の沖合に浮かぶ阿多田島（あたたじま）。そこに釣り人のパラダイス「海上釣り堀 海遊（かいゆう）」はあります。\nここは単なる釣り堀ではありません。ブリ、ヒラマサ、カンパチといった青物をはじめ、マダイ、シマアジ、クエ、イシダイなど、釣り人なら一度は釣ってみたい高級魚が14種類以上も放流されているのです。しかも「釣り放題」で、釣った魚はすべて持ち帰りOK。さらに「ボウズ保証」まで完備されています。\nフェリーに乗って離島へ渡るワクワク感と、竿が根元から曲がる強烈なファイト。そんな非日常の冒険へ出かけましょう。\n海上釣り堀 海遊の基本情報 \u0026nbsp; 場所：〒739-0607 広島県大竹市阿多田171 営業時間：9:30～15:00（集合時間は小方港9:30） 定休日：水曜日（祝日は営業）、平日は3名・日祝は5名以上の予約がない場合休業 平均予算：大人男性 12,000円、女性・中学生 9,000円 レンタル：貸竿セット1,500円（要予約）、タモ・スカリは無料 釣具の持ち込み：可能（竿は3.5m以内、針は一本針などルールあり） 釣れる魚：マダイ、ブリ、ヒラマサ、カンパチ、シマアジ、イサキ、クエ、ハタ、ヒラメ、トラフグなど季節により変動 注意事項：完全予約制、撒き餌禁止、ルアー禁止、飲酒禁止 ウェブサイト： 海上釣り堀 海遊 料金体系について \u0026nbsp; 海遊は定額釣り放題システムです。追加料金なしで、釣った分だけ持ち帰ることができます。\n大人男性：12,000円 女性・中学生：9,000円 小学生：7,000円 貸切（平日10名～、土日祝12名～）：要相談 ※料金には渡船料（阿多田島～釣り堀間）が含まれていますが、本土（小方港）～阿多田島のフェリー代は別途必要です（往復約700円）。\nボウズ保証 万が一、一匹も釣れなかった場合でも、マダイ1匹のお土産が保証されています。「手ぶらで帰る悲劇」がないので、初心者でも安心して挑戦できます。\n施設の特徴と魅力 \u0026nbsp; 海遊の魅力は、魚種の豊富さと魚体の良さにあります。独自ルートで仕入れた魚は脂の乗りが良く、食べても絶品です。特に「オリーブハマチ」や「レモンサーモン」など、ご当地ブランド魚が放流されることも。\nまた、12:00以降は活きエサ（アジなど）の使用が解禁されます。これにより、午前中はダンゴやオキアミでマダイ狙い、午後は活きアジで青物狙いといったメリハリのある釣りが楽しめます。\n海上釣り堀 海遊のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 釣り場環境と特徴 \u0026nbsp; 阿多田島の静かな入り江に設置されたイカダ型の釣り堀です。波の影響を受けにくく、揺れは比較的穏やかです。足場もフラットで安定しています。トイレも完備されています。\nおすすめの仕掛けとタックル \u0026nbsp; マダイ・シマアジ狙い（基本）\nロッド：3m～3.5mの海上釣堀竿（M～MHクラス） リール：3000番～4000番のスピニングリール ライン：ナイロン4号～5号、またはPE3号（リーダー必須） エサ：ダンゴ、オキアミ、ササミ、黄色く染めた甘エビ 青物狙い（パワー勝負）\nロッド：青物対応の強めの竿（Hクラス） 仕掛け：ハリス6号～8号以上の青物仕掛け エサ：活きアジ（現地購入可）、カツオの切り身、イカの短冊 釣果を伸ばすコツ \u0026nbsp; 朝イチのモーニングタイムを逃すな：釣り開始直後は魚の警戒心が薄く、入れ食いになるチャンスタイムです。手返しよく釣りましょう。 青物コールで連携：誰かに青物がヒットしたら「青物です！」と声をかけましょう。周りの人は仕掛けを上げてオマツリ（糸絡み）を防ぎます。協力プレーが釣果への近道です。 タナの探り分け：マダイは底付近、シマアジは中層、青物は回遊層と、ターゲットによってタナが異なります。こまめな調整が必須です。 季節別の釣果情報 \u0026nbsp; 春：マダイ、シマアジ。水温上昇とともに活性アップ。 夏：カンパチ、ヒラマサなどの青物がパワフル。イシダイやイシガキダイなどの底物も。 秋：数釣りシーズンの到来。多種多様な魚が狙えます。 冬：脂ノリノリの寒ブリ、クロソイ、トラフグなど、冬の味覚満載。 海上釣り堀 海遊へのアクセス情報 \u0026nbsp; 行き方の流れ \u0026nbsp; 海遊へ行くには、「フェリー」と「渡船」を乗り継ぐ必要があります。一見複雑ですが、流れをつかめば簡単です。\n大竹市・小方（おがた）港へ集合（9:00頃まで） 受付を済ませます。 フェリー乗船（9:30発） 阿多田島港へ向かいます（所要約35分）。 阿多田島港で海遊の船に乗り換え スタッフが案内してくれます。釣り堀へ移動（約5分）。 釣り開始！ 車でのアクセス｜おすすめ！ \u0026nbsp; 山陽自動車道「大竹IC」より小方港まで約15分 駐車場：小方港に無料駐車場あり 公共交通機関でのアクセス \u0026nbsp; JR山陽本線「玖波（くば）駅」よりタクシーで約5分、または徒歩約20分で小方港へ。 電車の本数は多いので便利ですが、荷物が多い場合はタクシー予約推奨です。 近隣の宿泊施設 \u0026nbsp; 遠方からの場合、前日に大竹市内や宮島口周辺に宿泊するのがおすすめです。\nグローバルリゾート 弥山（廿日市市）：宮島観光とセットで楽しめます。 ビジネスホテル大竹：アクセス重視ならこちら。 実際に利用したユーザーの声を抜粋 \u0026nbsp; 40代男性（常連）「★★★★★｜5.0」 \u0026nbsp; もう何度通ったかわかりません。ここの青物は引きが違います。ヒラマサの強烈な突っ込みを止める瞬間がたまりません。スタッフの方も親切で、釣れないときは棚を教えてくれます。\n30代女性（初心者）「★★★★☆｜4.0」 \u0026nbsp; 夫に連れられて初めて行きました。最初は怖かったけど、レンタル竿でマダイが3匹も釣れました！ボウズ保証があると思うと気持ちが楽でした。フェリーも旅行気分で楽しかったです。\n50代男性（グループ）「★★★★☆｜4.0」 \u0026nbsp; 会社の同僚と貸切で利用。クエが上がったときは全員で盛り上がりました。自分はシマアジ狙いでしたが、脂が乗っていて最高に美味かった。また行きます。\n【まとめ】海上釣り堀 海遊をおすすめしたい理由 \u0026nbsp; 海上釣り堀 海遊は、「釣りの興奮」と「食の感動」の両方を最高レベルで満たしてくれる場所です。\n14種類もの高級魚が泳ぐイケスに糸を垂らすドキドキ感は、他では味わえません。そして釣り上げた魚は、スーパーで買うものとは比較にならない鮮度と味を約束してくれます。\n「今度の休みは、とびっきりの魚を釣って食べたい！」そう思ったら、迷わず阿多田島へ向かってください。クーラーボックス満タンの幸せが、あなたを待っています。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 19,
        href: "/hiroshima/kaijo-tsuribori-tairyomaru/",
        title: "【広島県】海上釣堀 大漁丸｜瀬戸内の絶景と高級魚釣り放題・ボ...",
        description: "広島県大竹市の阿多田島にあるもう一つの名釣り堀、それが「海上釣堀 大漁丸（たいりょうまる）」です。",
        
        
        content: "広島県大竹市の阿多田島にあるもう一つの名釣り堀、それが「海上釣堀 大漁丸（たいりょうまる）」です。\n「大漁丸」の名に恥じぬよう、とにかく魚の放流量と質にこだわりを持っています。ここでは瀬戸内の穏やかな海で育った「広島レモンサーモン」や、丸々と太ったブリ、カンパチなどが、釣り人の挑戦を待っています。\n完全予約制でゆったりと楽しめ、ボウズ保証も完備。初心者からベテランまで、誰もが「大漁」の夢を見られる最高のフィールドです。\n海上釣堀 大漁丸の基本情報 \u0026nbsp; 場所：〒739-0607 広島県大竹市阿多田70 営業時間：集合 9:30（小方港）～終了 15:00頃 定休日：火曜日（祝日の場合は営業、翌日休）、予約が3名以下の場合は休業 平均予算：大人男性 11,000円～ レンタル：貸竿セット1,500円（要予約） 釣具の持ち込み：可能（竿は4m以内推奨） 釣れる魚：マダイ、ブリ、ヒラマサ、カンパチ、シマアジ、広島レモンサーモン、クロソイ、イサキなど 注意事項：完全予約制、食事提供なし、ボウズ保証あり、スパイクブーツ禁止 ウェブサイト： 海上釣堀 大漁丸 料金体系について \u0026nbsp; 大漁丸も分かりやすい定額釣り放題・全持ち帰りOKのシステムです。\n大人男性：11,000円 女性・中学生：8,000円 小学生：6,000円 貸切（小枠5名～、大枠10名～）：人数×料金（詳細は要相談） ※小方港～阿多田島のフェリー代（往復約700円）が別途必要です。\n嬉しいボウズ保証 魚が釣れなくてもマダイ2匹（※時期により変更の可能性あり、要確認。基本は1〜2匹保証）のお土産がつきます。これは県内の釣り堀の中でも手厚い保証内容と言えます。\n施設の特徴と魅力 \u0026nbsp; 大漁丸の一番のウリは、地域ブランド魚「広島レモンサーモン」（冬季～春季限定）が狙えることです。レモンを配合したエサで育ったサーモンは、臭みがなく、さっぱりとした脂とほのかな柑橘の香りが特徴。これを釣るために訪れるファンも多いです。\nまた、スタッフの対応が非常に丁寧で、タモ入れのサポートや釣り方のアドバイスを積極的に行ってくれます。アットホームな雰囲気で、初心者でも気後れすることなく楽しめます。\n海上釣堀 大漁丸のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 釣り場環境と特徴 \u0026nbsp; 阿多田島の南側に位置し、潮通しの良いポイントにイカダがあります。潮の流れが速い時間帯があり、これが青物の活性を高めています。足場は広く、グループでの利用にも適しています。\nおすすめの仕掛けとタックル \u0026nbsp; 基本のタックル（マダイ・サーモン）\nロッド：3m～3.6mの海上釣堀竿、またはライトなショアジギングロッド リール：3000番～4000番 ライン：PE2号～3号＋リーダー エサ：オキアミ、ブドウ虫（サーモンに有効）、練りエサ 大物用タックル（ブリ・カンパチ）\nロッド：青物対応のHパワーロッド ライン：PE4号以上＋太めのリーダー 針：ヒラマサ針12号以上 エサ：活きアジ、カツオのハラモ、サンマの切り身 釣果を伸ばすコツ \u0026nbsp; エサのローテーション：魚は同じエサを見続けると飽きてしまいます。オキアミ→ダンゴ→ササミ→切り身と、こまめにエサを変えて目先を変えましょう。 角（コーナー）を攻める：魚はイカダの四隅に溜まる習性があります。特にマダイやソイは角の底付近に固まっていることが多いので、重点的に探りましょう。 誘いはソフトに：サーモンやマダイは、激しい動きよりも、ふわっと落ちてくるエサに反応します。竿を大きくあおるのではなく、ゆっくり持ち上げて落とすアクションが有効です。 季節別の釣果情報 \u0026nbsp; 春：広島レモンサーモン（5月頃まで）、マダイ、シマアジ。 夏：カンパチ、ヒラマサなどの青物が最高潮。夜釣り営業がある場合も（要確認）。 秋：多種多様な魚が釣れるベストシーズン。 冬：寒ブリ、クロソイ、大型マダイ。サーモンシーズンの始まり。 海上釣堀 大漁丸へのアクセス情報 \u0026nbsp; 海遊と同様に、小方港からのフェリー移動となります。\n行き方の流れ \u0026nbsp; 大竹市・小方港へ集合（9:15頃までにお越しください） フェリー「阿多田」乗船（9:30発） 阿多田島港到着後、大漁丸の送迎船へ 釣り場へ移動・実釣開始 車でのアクセス \u0026nbsp; 山陽自動車道「大竹IC」から約10分～15分 ナビには「小方港」または「大竹市港町」と設定するとスムーズです。 駐車場：無料駐車場完備 公共交通機関 \u0026nbsp; JR山陽本線「玖波駅」または「大竹駅」からタクシー利用が便利です。バスも運行していますが、釣り道具を持っての移動はタクシーが快適です。 実際に利用したユーザーの声を抜粋 \u0026nbsp; 30代男性（家族連れ）「★★★★★｜5.0」 \u0026nbsp; 子供にサーモンを釣らせたくて行きました。スタッフのお兄さんが親切に棚を教えてくれて、念願のレモンサーモンをゲット！刺身にして食べましたが、今まで食べたサーモンで一番美味しかったです。\n50代男性（ベテラン）「★★★★☆｜4.0」 \u0026nbsp; 大漁丸は魚の型が良い。ブリも丸々としていて引きが強い。貸切で利用しましたが、仲間全員安打で大満足でした。帰りのフェリーで飲むビールが最高（運転手以外）。\n20代女性（グループ）「★★★★☆｜4.0」 \u0026nbsp; 女子会釣り部で利用しました。女性料金設定があるのが嬉しいです。トイレも洋式があって安心でした。釣った魚は捌けないので、帰ってから魚屋さんにお願いしました（笑）。楽しかったです！\n【まとめ】海上釣堀 大漁丸をおすすめしたい度 ★★★★★ \u0026nbsp; 海上釣堀 大漁丸は、「広島レモンサーモン」という独自の強みと、安定した釣果、そして温かいおもてなしが揃った名店です。\n特に冬から春にかけてのサーモンシーズンは、他の釣り堀では味わえない楽しみがあります。もちろん、青物のパワーファイトも一級品。ボウズ保証の手厚さも含め、初心者がデビューするにはこれ以上ない環境と言えるでしょう。\n瀬戸内の潮風を感じながら、記憶に残る「大漁」体験を、ぜひここで味わってください。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 20,
        href: "/kagawa/saltlake-hiketa-adoike/",
        title: "【香川県】ソルトレイクひけた安戸池｜世界初のハマチ養殖発祥地...",
        description: "世界で初めてハマチ養殖に成功した香川県東かがわ市の「安戸池」を利用した、国内最大級の海上釣り堀。キャッチ＆リリースのルアーコーナーと、釣り放題のエサ釣りコーナーを完備。初心者からベテランまで、ブリやカンパチの強烈な引きを堪能できます。",
        
        
        content: "「釣り堀＝狭いイケス」だと思っていませんか？ その常識を覆すのが、香川県東かがわ市にある**「ソルトレイクひけた 安戸池（あどいけ）」**です。\nここは、世界で初めてハマチの養殖に成功した歴史ある池そのものを利用した、桁外れのスケールを誇るフィッシングパーク。 広大な水面に向かってルアーをフルキャストできる「ルアー釣り場」と、放流された高級魚を狙う「エサ釣り場」の2つのエリアを完備。\nさらに、エサ釣りエリアは**「釣った魚はすべて持ち帰りOK」**という太っ腹ルール！ ブリ、カンパチ、タイ……高級魚の数釣りが夢ではない、四国屈指の海上釣り堀の魅力に迫ります。\nソルトレイクひけた安戸池の基本情報 \u0026nbsp; 項目 詳細 施設名 ソルトレイクひけた 安戸池（あどいけ） 住所 〒769-2901 香川県東かがわ市引田4373 営業時間 7:00～16:00（コースにより異なる） 定休日 年中無休（1月1日・2日のみ休業） 料金 【エサ釣り】男性12,000円 / 女性・子供8,000円\n【ルアー】一日7,000円 / 半日5,000円（季節変動あり） 釣れる魚 ハマチ（ブリ）、カンパチ、ヒラマサ、マダイ、シマアジ 公式サイト ソルトレイクひけた 安戸池 2つの楽しみ方：エサ釣り vs ルアー \u0026nbsp; この施設には大きく分けて2つのコースがあります。\nエサ釣りコース（釣り放題・持ち帰り放題）\n料金：男性12,000円、女性・小学生8,000円 特徴：イケスの中に放流された魚を狙います。釣った魚は無制限で持ち帰り可能。 ターゲット：マダイ、ハマチ、カンパチなど ルアーフィッシングコース（キャッチ＆リリース）\n料金：一日7,000円（季節により変動あり） 特徴：広大な池に向かってキャスト可能。基本的にキャッチ＆リリースですが、キープ可能な魚種・サイズもあります（要確認）。国内でも珍しい**「ルアー専用の管理釣り場（ソルト）」**です。 ソルトレイクひけた安戸池の攻略法 \u0026nbsp; エサ釣りの攻略：タナ取りとエサのローテーション \u0026nbsp; タナ（深さ）：朝一は浅め、日が昇ったら底付近を狙うのがセオリー。スタッフに「今のタナはどのくらい？」と聞くのが最短ルートです。 エサ：マダイ狙いならダンゴ（練り餌）やエビ。青物（ブリ・カンパチ）狙いなら活きアジやカツオの切り身が必須です。現地でも購入可能ですが、こだわりのエサを持ち込むのもOK。 ルアーコーナーの攻略：広範囲をサーチ \u0026nbsp; 飛距離が正義：広い池なので、遠投できるメタルジグやバイブレーションが有利です。 リアクションバイト：魚はスレている（ルアーを見慣れている）ことが多いので、タダ巻きだけでなく、ジャークやフォールを織り交ぜてリアクション（反射的）に口を使わせましょう。 意外な楽しみ方：ハマチのエサやり体験 \u0026nbsp; 施設内にある「マーレリッコ」では、ハマチの養殖イケスでエサやり体験（有料）ができます。水面が沸騰するように集まるハマチの群れは圧巻！小さなお子様連れや観光客にも大人気です。\nアクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; **高松自動車道「引田IC」**から約10分。 関西方面（淡路島経由）からのアクセスも良好です。 公共交通機関でのアクセス \u0026nbsp; JR高徳線「引田駅」からタクシーで約5分。 徒歩だと30分以上かかるため、タクシーの利用をおすすめします。 実際に利用したユーザーの声 \u0026nbsp; ※実際のレビューを参考に要約しています。\n40代男性（エサ釣り）「★★★★★｜5.0」 \u0026nbsp; 「元は取れました！」 12,000円は高いかな？と思いましたが、カンパチ2本とマダイ5匹釣れたので十分元は取れました。何より引きが強烈で楽しい！発泡スチロールも売ってるので持ち帰りも安心です。\n30代男性（ルアー）「★★★★☆｜4.0」 \u0026nbsp; 「練習に最適」 海でのショアジギングはボウズ（0匹）が多いですが、ここは魚がいることは確実なので、ルアーのアクション練習になります。スレているので簡単ではないですが、釣れた時の喜びはひとしお。\n20代女性（カップル）「★★★★★｜5.0」 \u0026nbsp; 「女性料金がお得」 彼氏と行きました。女性は8,000円と安いので嬉しい。スタッフさんが親切で、タモ入れも手伝ってくれました。半日コースもあるので体力に自信がなくても大丈夫です。\nまとめ：ソルトレイクひけた安戸池はどんな人におすすめ？ \u0026nbsp; こんな人に最適 \u0026nbsp; 絶対にボウズは嫌だ！確実に青物の引きを味わいたい人 ルアーマンで、安全な足場から青物を狙いたい人 釣った高級魚で豪華なディナーを楽しみたいファミリー 世界初のハマチ養殖発祥の地という歴史的背景を持ちながら、現代の釣り人のニーズに応える最新の設備。 「釣る」「食べる」「学ぶ」が詰まった安戸池で、香川県ならではの釣り体験をぜひ味わってください。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 21,
        href: "/kagawa/shodoshima-furusatomura-fishing-pier/",
        title: "【香川県】小豆島ふるさと村釣り桟橋｜500円で手ぶらフィッシ...",
        description: "「観光もしたいけど、釣りもちょっとやってみたい」 そんな欲張りな願いを叶えてくれるのが、瀬戸内海の宝石・小豆島にある「小豆島ふるさと村 釣り桟橋」です。",
        
        
        content: "「観光もしたいけど、釣りもちょっとやってみたい」 そんな欲張りな願いを叶えてくれるのが、瀬戸内海の宝石・小豆島にある**「小豆島ふるさと村 釣り桟橋」**です。\nここは、オリーブ公園やシーカヤック体験などで人気の「小豆島ふるさと村」の一画にある釣り施設。 入場料わずか500円、手ぶらで来ても竿レンタル500円というリーズナブルさで、本格的な海釣りが楽しめます。\n穏やかな内海湾（うちのみわん）に伸びる桟橋は、足元が金網になっていて安全性も抜群。 観光のスケジュールに「1時間だけ釣り体験」を組み込んで、小豆島の海を遊び尽くしませんか？\n小豆島ふるさと村 釣り桟橋の基本情報 \u0026nbsp; 項目 詳細 施設名 小豆島ふるさと村 釣り桟橋 住所 〒761-4304 香川県小豆郡小豆島町室生2211-6 営業期間 3月下旬〜11月下旬（冬期閉鎖） 営業時間 8:30～17:00 料金 大人（中学生以上）：500円\n子供（小学生）：300円 レンタル 貸竿（リール・仕掛け付）：500円\nエサ（冷凍エビ・オキアミ等）：400円〜 釣れる魚 アジ、チヌ（クロダイ）、アオリイカ、メバル、カサゴ、キス、ベラ 公式サイト 小豆島ふるさと村 初心者に優しい「手ぶらセット」 \u0026nbsp; 竿とリールのセットに加え、エサや仕掛けも現地で購入可能。スタッフが常駐している（ふるさと村本館または桟橋入口）ので、釣り方が分からなければ気軽に教えてもらえます。\n小豆島ふるさと村 釣り桟橋の攻略法 \u0026nbsp; 桟橋の特徴とポイント \u0026nbsp; 全長約70mの桟橋はL字型になっており、内海湾の穏やかな海に面しています。\n足元（サビキ釣り）：桟橋の直下がポイント。アジやイワシ、スズメダイなどが群れています。 ちょい投げ：少し沖に投げれば、砂地を好むキスやベラが狙えます。 金網フェンス：転落防止の柵があり、小さなお子様でも安心。ただし、物を落とさないように注意が必要です。 小豆島ならではのターゲット \u0026nbsp; 春・秋：アオリイカのエギング\n小豆島はアオリイカの聖地としても有名。 桟橋からもエギングで狙うことができます。墨跡がある場所が有力ポイント！ 夏〜秋：ファミリー向けサビキ釣り\n最も釣果が安定するシーズン。 アジやサバが回遊してくれば、初心者でも数釣りが楽しめます。釣った魚は、近くの宿泊施設によっては調理してくれる場合も（要事前確認）。 通年：チヌ（クロダイ）\n魚影が非常に濃く、フカセ釣りやダンゴ釣りで良型が上がります。 桟橋の橋脚周りに居着いていることが多いです。 アクセス情報 \u0026nbsp; フェリーでのアクセス（小豆島まで） \u0026nbsp; 高松港 ⇔ 土庄港・池田港・草壁港（フェリー約60分、高速艇約35分） 姫路港 ⇔ 福田港（フェリー約100分） 岡山港 ⇔ 土庄港（フェリー約70分） 島内でのアクセス \u0026nbsp; 車・レンタカー：各港から約15〜30分。「小豆島ふるさと村」の看板を目印に。 バス：小豆島オリーブバス「小豆島ふるさと村」下車すぐ。 駐車場は無料完備されています。 実際に利用したユーザーの声 \u0026nbsp; ※実際のレビューを参考に要約しています。\n30代女性（ファミリー）「★★★★☆｜4.0」 \u0026nbsp; 「子供の初釣りに最適」 レンタル竿で気軽に体験できました。スタッフのおじさんが優しく教えてくれて、子供も小魚を釣って大喜び。すぐ近くでソフトクリームも食べられるし、観光の休憩がてら寄るのに丁度いいです。\n40代男性（釣り好きパパ）「★★★★☆｜4.5」 \u0026nbsp; 「意外と侮れない」 観光地と舐めてましたが、チヌの魚影がすごいです。透明度が高いので見えチヌがたくさん。レンタル竿では厳しいので、チヌ狙いなら自前のタックル推奨。\n20代男性（グループ）「★★★☆☆｜3.0」 \u0026nbsp; 「冬は休みなので注意」 12月に行ったら閉まってました\u0026hellip;。営業期間（3月〜11月）の確認は必須です。景色は最高でした。\nまとめ：小豆島ふるさと村釣り桟橋はどんな人におすすめ？ \u0026nbsp; こんな人に最適 \u0026nbsp; 小豆島観光のスケジュールに無理なく「釣り」を組み込みたい人 道具は持たず、手ぶらで気軽に楽しみたいファミリー・カップル 安全な場所で、のんびりと瀬戸内海の風を感じたい人 「小豆島ふるさと村」には釣りの他にも、イチゴ狩り（冬〜春）、シーカヤック、そうめん作り体験などがあり、一日中遊べるスポットです。 美しい夕陽を眺めながらの釣りは、小豆島旅行の忘れられない思い出になるはずです。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 22,
        href: "/kagawa/naoshima-fishing-park/",
        title: "【香川県】直島つり公園｜入園料わずか100円！アート島で味わ...",
        description: "アートの聖地として世界的に有名な香川県・直島。その一角にある「直島つり公園」は、なんと入園料100円という衝撃的な価格で本格的な海釣りが楽しめる穴場スポットです。",
        
        
        content: "アートの聖地として世界的に有名な香川県・直島。その一角にある**「直島つり公園」は、なんと入園料100円**という衝撃的な価格で本格的な海釣りが楽しめる穴場スポットです。\nかつては養殖生簀を利用した釣り堀でしたが、現在は自然の海をそのまま活かした海釣り公園として運営されています。桟橋から竿を出せば、潮流に乗って回遊してくるシーバス（スズキ）やアオリイカ、足元のカワハギまで、瀬戸内海の豊かな魚たちがあなたを待っています。\n「美術館巡りのついでにちょっと釣り糸を垂れる」。そんな贅沢な時間の使い方ができるのは、ここ直島だけ。手ぶらで訪れてもレンタル完備で安心。アートと自然、そして釣りのだいご味を一度に味わえる、直島つり公園の魅力を徹底解説します。\n直島つり公園の基本情報 \u0026nbsp; 項目 詳細 施設名 直島つり公園 住所 〒761-3110 香川県香川郡直島町340 電話番号 087-892-2833 営業時間 7:00〜17:00 定休日 月曜日・火曜日（祝日の場合は翌日）、年末年始（12/16〜1/14頃） 料金 入園料：大人100円 / 小人（6歳〜15歳）50円 / 6歳未満無料 レンタル 貸竿セット：500円 / エサ販売：有り（オキアミ等） 持ち込み 可能（1人につき竿2本まで） 駐車場 あり（無料） トイレ あり 公式サイト 直島つり公園 公式サイト 施設の特徴 \u0026nbsp; 圧倒的なコストパフォーマンス: 何といっても入園料100円は破格。家族4人で訪れても入園料だけで数百円です。 自然の海が相手: 釣り堀のように魚が囲われているわけではなく、桟橋から自然の海に向かって釣るスタイル。そのため釣果は潮や腕に左右されますが、釣れた時の喜びはひとしおです。 手ぶらでOK: 竿のレンタル（500円）やエサの販売があるため、観光の合間にふらっと立ち寄れます。 こんな人に最適！ \u0026nbsp; 直島観光の＋αを探している人: 美術館巡りの合間や、フェリーの待ち時間に最適です。 コストを抑えて楽しみたい家族連れ: 入園料が安く、足場も良いため、お子様の釣りデビューにもぴったり。 本格的な海釣りを手軽に楽しみたい人: 自分のタックルを持ち込んで、チヌやアオリイカを狙うベテランにも人気です。 直島つり公園の攻略法 \u0026nbsp; 直島つり公園は自然の海を利用した施設であるため、**「潮」**を読むことが釣果への近道です。\n1. 狙い目は「朝マズメ」と「夕マズメ」 \u0026nbsp; 他の釣り場同様、魚の活性が上がる**朝一番（7:00〜）と夕方（〜17:00）**がチャンスです。特に泊まりで直島に来ている場合は、帰りのフェリー前の夕方や、翌朝一番のエントリーがおすすめです。\n2. 潮通しの良い場所を選ぶ \u0026nbsp; 桟橋の先端付近など、潮通しの良い場所は青物やシーバス、マダイなどの回遊魚が期待できます。逆に足元や障害物周りは、カサゴやメバルなどの根魚、カワハギのポイントになります。\n3. エサ取り対策を万全に \u0026nbsp; 小魚（エサ取り）が多い場合があるため、サビキ釣りで小魚を釣って楽しむのも一手。大物を狙う場合は、エサ取りに強いエサ（コーンやサナギなど）を用意するか、少し投げて深場を狙うなどの工夫が必要です。\n釣れる魚種と時期 \u0026nbsp; 瀬戸内海の豊富な魚種がターゲットです。\n春〜夏: シーバス（スズキ）、チヌ（クロダイ）、マダイ、キス、ベラ 秋: アオリイカ、サヨリ、太刀魚、青物（ハマチなど） 冬: カサゴ、メバル、アイナメ、カレイ 通年: カワハギ、アジ、イワシ（サビキ釣り） 特に秋のアオリイカやシーバスは人気が高く、ルアーマンも多く訪れます。\nアクセス情報 \u0026nbsp; 直島は離島であるため、フェリーでのアクセスが基本となります。\nフェリーでのアクセス \u0026nbsp; 出発港 所要時間 運賃（片道） 便数 備考 高松港 (香川) 約50分（フェリー） 大人520円 / 子供260円 1日5便 高速船（約30分）もあり 宇野港 (岡山) 約20分 大人300円 / 子供150円 1日13便 便数が多く便利 ※ダイヤや運賃は変更になる可能性があるため、必ず 四国汽船公式サイトをご確認ください。\n島内での移動 \u0026nbsp; 宮浦港（フェリーターミナル）からつり公園までは少し距離があります。\n町営バス: 「つり公園」バス停下車すぐ。大人100円、子供50円。 レンタサイクル: 宮浦港周辺でレンタル可能（1日500円〜1,500円程度）。電動自転車なら坂道も楽々です。海沿いのサイクリングは最高に気持ちいいのでおすすめ！ 徒歩: 宮浦港から約30〜40分。散策しながらのんびりと。 まとめ：アートと釣りの融合を楽しもう \u0026nbsp; 直島つり公園は、「ついで」に寄るにはもったいないほど本格的な釣りが楽しめるスポットです。しかし、ガチガチの装備でなくても、観光の合間にレンタル竿で糸を垂れるだけで、瀬戸内海の穏やかな風景と心地よい潮風に癒やされること間違いなし。\n100円という駄菓子のような入園料で、プライスレスな体験を。次の直島旅行には、ぜひ「釣り」の予定を組み込んでみてください。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 23,
        href: "/kochi/tsuri-ikada-fukaura/",
        title: "【高知県】つり筏 深浦｜3,000円でトイレ・屋根・コーヒー...",
        description: "筏（いかだ）釣りといえば、「トイレがない」「日差しが暑い」「過酷」…そんなイメージを持っていませんか？ 高知県須崎市にある「つり筏 深浦」は、そんな常識を覆す「超・快適」な釣り施設です。",
        
        
        content: "筏（いかだ）釣りといえば、「トイレがない」「日差しが暑い」「過酷」…そんなイメージを持っていませんか？ 高知県須崎市にある**「つり筏 深浦」は、そんな常識を覆す「超・快適」**な釣り施設です。\n全ての筏に屋根とトイレを完備。雨の日もカンカン照りの夏の日も快適そのもの。 しかも、朝は渡船でモーニングコーヒーのサービスまであるというホスピタリティの高さ。 それでいて料金は1日遊んで3,000円。もはや行かない理由が見つからない、癒やしの釣り場をご紹介します。\nつり筏 深浦の基本情報 \u0026nbsp; 場所：〒785-0173 高知県須崎市浦ノ内塩間49-1 営業時間： 夏期：5:30〜18:00 冬期：7:00〜16:30 定休日：不定休 料金： 大人（高校生以上）：3,000円 中学生：2,500円 小学生：1,500円 小学生以下：無料 釣れる魚：チヌ（クロダイ）、キビレ、マダイ、アジ、サバ、ボラ、ヒラメ、アオリイカなど 設備：全筏に屋根・トイレ完備、BBQコンロ貸出あり 施設の特徴と魅力 \u0026nbsp; 1. 圧倒的な「居住性」の高さ 屋根があるので日焼けや急な雨の心配無用。そして何より、各イカダに個室トイレがある安心感は絶大です。女性や子供連れ、お腹が弱い方でも一日中安心して釣りを楽しめます。\n2. 嬉しいコーヒーサービス 朝、渡船で筏に渡ると、船長さんが温かい缶コーヒー（夏は冷たいもの）を配ってくれることがあります。美しい浦ノ内湾の朝焼けを見ながら飲むコーヒーは格別です。\n3. BBQもできる！ BBQコンロのレンタルがあるので、食材を持ち込めば**「海上BBQ」**が楽しめます。釣れたてのアジを焼いて食べる…なんて最高の贅沢も可能です。\nつり筏 深浦のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; おすすめの仕掛けとタックル \u0026nbsp; チヌ（ダンゴ釣り・フカセ釣り）\n浦ノ内湾はチヌの魚影が非常に濃いです。 短い筏竿を使った「ダンゴ釣り（かかり釣り）」がメインですが、フカセ釣りで狙う人も多いです。 アジ・サバ（サビキ釣り）\nファミリーに一番おすすめ。 湾内なので波が穏やかで、群れが入れば入れ食いになります。 アオリイカ（ヤエン・エギング）\nアジを泳がせて狙う「ヤエン釣り」の実績が高い場所です。春の大型、秋の数釣りともに楽しめます。 釣果を伸ばすコツ \u0026nbsp; ダンゴの配合：チヌ狙いなら、集魚力の高い配合エサ（ダンゴ）をしっかり打ち込んで、魚を足止めすることが重要です。 底の変化を探る：変化の少ない砂泥底が多いですが、カケアガリ（斜面）や障害物周りを見つけられると釣果が伸びます。船長さんにポイントの特徴を聞いてみましょう。 つり筏 深浦へのアクセス情報 \u0026nbsp; 車でのアクセス｜おすすめ！ \u0026nbsp; 高知自動車道「土佐IC」から国道56号線経由で約30分。 須崎市内からは横浪スカイライン方面へ約15分。 駐車場：渡船乗り場の前に無料駐車場があります。 準備・買い出し \u0026nbsp; エサ・釣具：現地での販売は基本的にありません。土佐IC近くの「つりぐの岡林 土佐道路店」や須崎市内の釣具店で事前に購入しましょう。 食料：コンビニは車で10分〜15分ほどの距離にあります。一日過ごすなら、事前の買い出しは必須です。 実際に利用したユーザーの声を抜粋 \u0026nbsp; 40代女性（夫婦）「★★★★★｜5.0」 \u0026nbsp; トイレがある筏を探してここに辿り着きました。本当に快適！屋根があるので日焼けも気にならないし、のんびりお弁当を食べてピクニック気分でした。夫はチヌが釣れて満足、私はサビキでアジが釣れて満足。\n50代男性（常連）「★★★★★｜5.0」 \u0026nbsp; 船頭さんが親切。朝のコーヒーが染みる。3,000円でこれだけ遊ばせてくれるところは他にない。最近は人気が出てきたので予約は早めにしたほうがいい。\n30代男性（グループ）「★★★★☆｜4.0」 \u0026nbsp; 男4人でBBQをしながら釣りをしました。煙が出ても海上なので気兼ねなく楽しめるのがいい。釣果はそこそこでしたが、雰囲気だけで優勝です。\n【まとめ】つり筏 深浦をおすすめしたい度 ★★★★★ \u0026nbsp; 「つり筏 深浦」は、釣り場の快適性という点において、高知県内でもトップクラスの施設です。\nガチで釣果を追い求めるのも良いですが、ここでは屋根の下でコーヒーを飲みながら、穏やかな海を眺めて糸を垂れる…。そんな**「贅沢な休日」**を過ごすのが正解かもしれません。 3,000円で買える極上のリラックスタイム。次の休日は深浦で決まりです！"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 24,
        href: "/kochi/kaijo-tsuribori-yukimaru/",
        title: "【高知県】海上釣り堀 幸丸｜高級魚釣り放題1.3万円 or ...",
        description: "高知市から車で約40分。穏やかな浦ノ内湾に浮かぶ「海上釣り堀 幸丸（さちまる）」は、初心者から上級者まで、あらゆる釣り人のニーズに応えてくれる懐の深い釣り堀です。",
        
        
        content: "高知市から車で約40分。穏やかな浦ノ内湾に浮かぶ**「海上釣り堀 幸丸（さちまる）」**は、初心者から上級者まで、あらゆる釣り人のニーズに応えてくれる懐の深い釣り堀です。\nその秘密は、明確に分かれた2つのコース設定にあります。 「クーラー満タンを目指してガチで釣る！」という方向けの一般コース。 「観光ついでに、夕食のメインディッシュを1匹ゲットしたい」という方向けのトライアルコース。\nあなたの目的に合わせて、最適なプランを選んでみてください。\n海上釣り堀 幸丸の基本情報 \u0026nbsp; 場所：〒785-0166 高知県須崎市浦ノ内塩間42 営業時間・料金： 【一般コース（釣り放題）】 時間：7:00〜11:30（4.5時間） 料金：大人13,000円、小学生8,000円 別途渡船料：大人2,000円 【トライアルコース】 時間：13:00〜15:30（うち実釣1時間程度、1匹釣れたら終了） 料金：5,000円（竿・エサ代込み、渡船料別） 定休日：木曜日 釣れる魚：マダイ、シマアジ、ハマチ、カンパチ、ヒラマサ、イサキ、クエ、ハタなど ウェブサイト： 幸丸／幸丸水産公式サイト 施設の特徴と魅力 \u0026nbsp; 1. ガチ勢歓喜の「一般コース」 13,000円で高級魚が釣り放題。もちろん持ち帰り制限なし。放流される魚は、養殖業も営む幸丸水産自慢の健康優良児ばかり。脂の乗った極上の魚を、自分の腕次第でいくらでも持ち帰ることができます。\n2. コスパ最強の「トライアルコース」 午後からの短時間勝負。5,000円でレンタル竿・エサ付き。そして**「大物（マダイ等）1匹確定」というルール。 釣れなかった場合はお土産がもらえるため、実質「5,000円で高級魚を買うついでに、釣りの引き味も楽しめる」**という破格のプランです。観光客に大人気です。\n3. 屋根付きイケスで快適 海上のイケスには屋根がかかっています。高知の強い日差しや雨を防いでくれるので、快適に過ごせます。\n海上釣り堀 幸丸のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; おすすめの仕掛けとタックル \u0026nbsp; 一般コース（持ち込み派）\n竿：3m〜3.5mの海上釣堀竿 リール：3000番〜4000番（PE3号以上） エサ：幸丸の魚はペレット（養殖用飼料）を食べ慣れているため、「ダンゴエサ」が基本にして最強です。その他、ササミやキビナゴも有効。 トライアルコース（手ぶら派）\n道具は全て用意してもらえるので、手ぶらでOKです。 服装は動きやすく、汚れても良いもので行きましょう。 釣果を伸ばすコツ \u0026nbsp; タナ（深さ）の微調整：スタッフさんが「今は底から◯メートルだよ」と教えてくれます。素直に従うのが爆釣への近道です。 誘いをかける：じっと待つだけではなく、時々竿を上下させてエサを動かしましょう。魚の捕食スイッチが入ります。 早合わせ禁物：ウキが沈んでも一呼吸置いてから、しっかりとアワセを入れましょう。 海上釣り堀 幸丸へのアクセス情報 \u0026nbsp; 車でのアクセス｜おすすめ！ \u0026nbsp; 高知自動車道「土佐IC」から約20分。 須崎東ICからも約20分。 駐車場：渡船乗り場前に無料駐車場完備。 買い出しなど \u0026nbsp; 近隣にコンビニやスーパーはありません。土佐IC付近で買い物は済ませておきましょう。 氷の販売はあるので、クーラーボックスのみ持参すればOKです（トライアルコースなら発泡スチロール購入で配送も可）。 実際に利用したユーザーの声を抜粋 \u0026nbsp; 50代男性（一般コース）「★★★★★｜5.0」 \u0026nbsp; 魚の質が良い。さすが水産会社直営。シマアジが強烈に引いて楽しかった。1万円超えは安くないが、スーパーで買う値段を考えたら余裕で元が取れる。クーラーに入り切らないほど釣れてホクホクでした。\n20代女性（トライアルコース）「★★★★☆｜4.0」 \u0026nbsp; 高知旅行のついでに寄りました。釣りは初めてでしたが、スタッフさんが優しく教えてくれて、すぐに大きなタイが釣れました！1匹釣ったら終わりなのであっという間でしたが、その魚を夜に居酒屋で調理してもらって食べて最高でした。\n40代男性（親子）「★★★★☆｜4.0」 \u0026nbsp; 子供に大きな魚を釣らせたくて利用。トライアルコースは絶対釣らせてくれる安心感がある。竿を持った子供が魚の引きにビックリしている顔が見れて良かった。\n【まとめ】海上釣り堀 幸丸をおすすめしたい度 ★★★★★ \u0026nbsp; 幸丸は、「釣りのガチ度」に合わせて最適なプランを選べるのが最大の強みです。\n腕に覚えのある釣り師なら「一般コース」で爆釣・大量持ち帰りを狙うもよし。 ファミリーやカップルなら「トライアルコース」で、確実に美味しいお土産をゲットして良い思い出を作るもよし。\nどちらを選んでも、浦ノ内湾の豊かな自然と、脂の乗った美味しい魚があなたを待っています。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 25,
        href: "/kochi/raft-fishing-takahashi/",
        title: "【高知県】筏釣り 高橋渡船｜11時間遊んで4,000円！海上...",
        description: "「丸一日、時間を気にせず釣りに没頭したい！」 「釣りの合間に肉も焼いて食べたい！」",
        
        
        content: "「丸一日、時間を気にせず釣りに没頭したい！」 「釣りの合間に肉も焼いて食べたい！」\nそんなワガママな願いを叶えてくれるのが、高知県・浦ノ内湾の**「筏釣り 高橋渡船」です。 営業時間は朝6時から夕方17時まで。なんと最大11時間滞在できて、料金はたったの4,000円**。\nしかも、広い筏の上では**バーベキュー（BBQ）**もOK。 静かな湾内で、気の合う仲間と糸を垂れ、腹が減ったら肉を焼く。そんな自由すぎる大人の休日がここにあります。\n筏釣り 高橋渡船の基本情報 \u0026nbsp; 場所：〒785-0167 高知県須崎市浦ノ内灰方1116 営業時間：6:00〜17:00 定休日：不定休 料金： 大人（高校生以上）：4,000円 中学生：3,500円 小学生2,500円、幼児1,500円 釣れる魚：チヌ、キビレ、アオリイカ、アジ、サバ、サヨリ、ヒラメ、マゴチ、マダイなど 設備：屋根付き筏あり、トイレ（一部筏または簡易設置要確認） ウェブサイト： 高橋渡船公式サイト 施設の特徴と魅力 \u0026nbsp; 1. 圧倒的なコストパフォーマンス 1時間あたり約360円。映画を見るより安く、一日中海の上で遊べます。時間を気にせず、のんびりと釣りを楽しみたい人には最高の環境です。\n2. 海上BBQができる！ コンロや食材を持ち込めば、筏の上でBBQが可能です（※要予約・要確認）。海の上で食べる焼肉や焼きそばは、なぜあんなに美味しいのでしょうか。もちろん、釣った魚をその場で塩焼きにするのもアリです。\n3. 豊富な魚種 浦ノ内湾は魚のゆりかご。チヌの魚影の濃さはもちろん、春・秋のアオリイカ、夏のアジ・サバ、冬のヒラメなど、季節ごとに多種多様なターゲットが狙えます。\n筏釣り 高橋渡船のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; おすすめの仕掛けとタックル \u0026nbsp; チヌ（フカセ・ダンゴ）\n筏釣りの王道ターゲット。 繊細な穂先の筏竿で、ダンゴにつつまれたエサをついばむチヌのアタリを取る…この駆け引きがたまりません。 アオリイカ（ヤエン釣り・エギング）\n活きたアジを泳がせる「ヤエン釣り」が名物。特に春にはキロアップの巨大イカが狙えます。 アジは現地調達（サビキ釣り）か、事前に釣具店で購入して持ち込みましょう。 五目釣り（サビキ・胴付き）\n気楽に楽しむならコレ。アジ、サバ、ガシラ、ベラなど何でも釣れます。 釣った小魚をエサにして、ヒラメを狙う「わらしべ長者」的な釣りも面白いです。 釣果を伸ばすコツ \u0026nbsp; エサ取り対策：湾内は小魚（エサ取り）も多いです。「サナギ」や「コーン」など、エサ取りに強いエサも持参するとチヌへの道が開けます。 潮を見る：湾内とはいえ潮の満ち引きは釣果に直結します。「潮が動き出した瞬間」「止まる寸前」がチャンスタイムです。 BBQに夢中になりすぎない：肉を焼いている間に竿を持っていかれないよう、竿受けにしっかり固定するか、尻手ロープを付けましょう（笑）。 筏釣り 高橋渡船へのアクセス情報 \u0026nbsp; 車でのアクセス｜おすすめ！ \u0026nbsp; 高知自動車道「土佐IC」から約30分。 須崎市内から浦ノ内湾沿いに進みます。 駐車場：渡船乗り場に無料駐車場あり。 準備・注意点 \u0026nbsp; レンタルなし：釣具、エサ、BBQ機材、食材のレンタル・販売はありません。全て持ち込み必須です。 買い出し：土佐IC周辺で全て揃えてから向かいましょう。「忘れ物をしたからちょっとコンビニへ…」はできません（船で陸に戻る必要があるので）。 実際に利用したユーザーの声を抜粋 \u0026nbsp; 30代男性（グループ）「★★★★★｜5.0」 \u0026nbsp; 職場の仲間5人で利用。BBQメインで行きましたが、サビキでアジが入れ食いになり、結局釣りメインに（笑）。屋根があるので日陰で休めるのが良かった。4,000円で一日遊べるのはコスパ良すぎ。\n50代男性（ベテラン）「★★★★☆｜4.0」 \u0026nbsp; ここのイカダは安定していて揺れが少ない。チヌ狙いだったが、アオリイカの墨跡があったのでエギを投げたら一杯釣れた。魚種が豊富で飽きない釣り場です。\n40代女性（ファミリー）「★★★★☆｜4.0」 \u0026nbsp; 子供連れで行きました。トイレの有無が心配でしたが、予約時に相談したらトイレ付きの筏を手配してくれました。周りを気にせず騒げるのが海上の良いところですね。\n【まとめ】筏釣り 高橋渡船をおすすめしたい度 ★★★★★ \u0026nbsp; 高橋渡船は、「大人の遊び場」 として最高のポテンシャルを秘めています。\nストイックにチヌと向き合うもよし。 仲間とワイワイ肉を焼きながら、気まぐれに竿を出すもよし。 誰にも邪魔されず、海の上で昼寝をするもよし。\nたった4,000円で手に入る、自由気ままな11時間。高知の海で、最高のリフレッシュを体験してください。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 26,
        href: "/mie/anatani-aitai-fishing/",
        title: "【三重県】あなたに逢い鯛。釣り堀｜完全予約制・少人数限定の贅...",
        description: "「隣の人とオマツリするのが怖い」「混雑した釣り場は苦手」",
        
        
        content: "「隣の人とオマツリするのが怖い」「混雑した釣り場は苦手」\nそんな悩みを抱える釣り人にこそおすすめしたいのが、三重県南伊勢町にある**「あなたに逢い鯛。釣り堀」**です。\n最大の特徴は**「完全予約制」かつ「少人数限定」であること。イケスは10m×4mとコンパクトに設計されており、魚との距離が近く、サイトフィッシング（見釣り）のような興奮も味わえます。さらに女性は2,000円引き**とリーズナブルで、カップルや夫婦、ファミリーでの貸切にも最適。\n誰にも邪魔されず、静かな海で「あなた」と「鯛」だけの時間を過ごす。そんな贅沢な休日を約束する、プライベート感満載の海上釣り堀です。\nあなたに逢い鯛。釣り堀の基本情報 \u0026nbsp; 項目 詳細 施設名 あなたに逢い鯛。釣り堀 住所 〒516-0116 三重県度会郡南伊勢町迫間浦825 電話番号 携帯電話での予約・問い合わせ（公式サイト参照） 営業時間 4〜9月：6:00〜14:00 / 10〜3月：6:30〜14:00（受付は30分前から） 定休日 不定休（荒天時中止） 料金 男性：13,000円 / 女性：11,000円 / 小学生以下：6,000円 貸切料金 平日：78,000円（6名まで） / 土日祝：104,000円（8名まで） レンタル 貸竿：2,000円 / ライフジャケット：300円 / タモ・スカリ：無料 持ち込み 竿1人1本（5m以内）、エサ持ち込み自由 公式サイト あなたに逢い鯛。釣り堀 公式サイト 施設の特徴 \u0026nbsp; 完全予約制の安心感: 「行ったけど入れなかった」「場所が悪かった」という心配がありません。 少人数・コンパクト設計: イケスが小さいため魚の密度が高く、初心者でも釣りやすい環境です。 女性・子供に優しい料金: 女性は男性より2,000円安く、お子様は半額以下の設定。ファミリーフィッシングのハードルを下げてくれます。 こんな人に最適！ \u0026nbsp; 人混みが苦手な方: 隣の釣り人を気にせず、自分のペースで楽しめます。 カップル・夫婦: 女性割引があり、落ち着いた雰囲気でデート釣りにもぴったり。 初心者グループ: スタッフの目が届きやすく、イケスも小さいので釣れるチャンスが高いです。 あなたに逢い鯛。釣り堀の攻略法 \u0026nbsp; コンパクトなイケスならではの攻略法があります。\n1. 「角（カド）」と「中央」の使い分け \u0026nbsp; イケスが長方形（10m×4m）のため、**四隅（コーナー）**は魚が溜まりやすい一級ポイント。まずは角を狙いましょう。一方で、青物（ワラサ・カンパチ）は中央付近を回遊することが多いため、ターゲットによって狙う場所を明確に変えるのがコツです。\n2. 繊細なタナ取り \u0026nbsp; 水深は9〜11mと意外に深いです。底付近にいるマダイやシマアジを狙うなら、しっかりと底を取り、そこから50cm〜1m巻き上げたタナをキープしましょう。イケスが狭い分、タナがずれると釣果に直結します。\n3. 静かに釣る \u0026nbsp; 少人数制で静かな環境だからこそ、大きな音や影は魚にプレッシャーを与えます。静かにアプローチすることで、警戒心の強いイシダイや大型のマダイも口を使ってくれます。\n釣れる魚種と特徴 \u0026nbsp; 高級魚から青物まで、季節に応じて多彩な魚が放流されます。\nマダイ: 釣り堀の主役。美しい魚体と引きが魅力。 青物（ワラサ・カンパチ）: 強烈な引きで竿を絞り込むファイター。 シマアジ: 高級魚の代表格。口が弱いので慎重なやり取りが必要。 イシダイ: 幻の魚とも呼ばれる高級魚。強烈な突っ込みは病みつきに。 ハタマス（マハタ）: 根魚の王様。底付近で狙えます。 アクセス情報 \u0026nbsp; 公共交通機関でのアクセスは難しいため、お車での来場が基本となります。\n車でのアクセス \u0026nbsp; 名古屋・四日市方面から: 伊勢自動車道「玉城IC」より約40分。「サニーロード（県道南島線）」を経由して南伊勢町方面へ。 大阪・関西方面から: 伊勢自動車道「玉城IC」より約40分。 ※姉妹店である「はさま浦釣り堀センター」と同じ場所にあります。カーナビ設定時はご注意ください。\n宿泊での利用もおすすめ \u0026nbsp; 早朝の受付（5:30〜6:00頃）に間に合わせるなら、前泊が楽です。姉妹店の「はさま浦釣り堀センター」には民宿が併設されており、宿泊＋釣りパックも相談可能です。\n民宿はさま浦: 釣り場の目の前！移動0分で朝を迎えられます。 まとめ：プライベートな空間で贅沢な釣りを \u0026nbsp; 「あなたに逢い鯛。釣り堀」は、単に魚を釣るだけでなく、**「居心地の良さ」や「特別な時間」**釣果と同じくらい大切にしたい方に最適な施設です。\n大規模な釣り堀の喧騒から離れ、大切な人と、あるいは気心の知れた仲間と、静かな入り江で糸を垂れる。そんな贅沢な休日を過ごしてみてはいかがページのトップへ"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 27,
        href: "/mie/tsuribori-maruyo/",
        title: "【三重県】つりぼりマルヨ｜陸続きでアクセス抜群！毎月4日は「...",
        description: "「船酔いが心配」「重い荷物を持って船に乗るのが大変」",
        
        
        content: "「船酔いが心配」「重い荷物を持って船に乗るのが大変」\nそんな不安を一掃してくれるのが、三重県南伊勢町にある**「つりぼりマルヨ」**です。\n最大の特徴は、駐車場から桟橋を渡って歩いて行ける「陸続き」のスタイル。渡船の待ち時間がなく、忘れ物をしても車に戻れる気軽さが魅力です。さらに、女性10,000円・子供5,000円という破格の料金設定で、ファミリーフィッシングの聖地としても知られています。\nそして見逃せないのが、毎月4日に開催される**「マルヨの日」**。ブリやカンパチ、シマアジなどの高級魚が乱舞する大放流イベントは、釣り人ならずとも興奮必至です！\nつりぼりマルヨの基本情報 \u0026nbsp; 項目 詳細 施設名 つりぼりマルヨ 住所 〒516-1531 三重県度会郡南伊勢町方座浦 電話番号 090-5606-3844 / 0596-77-0080 営業時間 6:00〜13:30（受付6:00〜6:30、開始7:00〜） 定休日 毎週火曜日 料金 大人：13,000円 / 女性：10,000円 / 子供（小学生以下）：5,000円 レンタル 貸竿：2,000円 / スカリ：無料 / タモ：備え付け 持ち込み 竿1人1本（5m以内） エサ 販売なし（事前準備必須）※禁止：撒き餌、サビキ、ルアー 公式サイト つりぼりマルヨ 公式サイト 施設の特徴 \u0026nbsp; 陸続きで楽々アクセス: 駐車場から徒歩で即釣り座へ。船酔いの心配ゼロ、トイレや休憩も自由自在です。 驚きの低価格: 特に子供5,000円はエリア最安値クラス。親子3人で釣行してもお財布に優しい！ 親切な魚締めサービス: 釣った魚は帰りにスタッフが丁寧に絞めてくれます（ウロコ取り・内臓処理サービスがあるかは要確認）。 こんな人に最適！ \u0026nbsp; 船が苦手な人・足腰に不安がある方: 桟橋を歩いて渡るだけなので安心です。 ファミリー・カップル: 女性・子供料金が圧倒的に安いため、家族レジャーに最適。 大物を狙いたい人: 「マルヨの日」などのイベント時は、ブリやヒラマサなどの超大物に出会える確率がグンと上がります。 つりぼりマルヨの攻略法 \u0026nbsp; マルヨならではのルールと特徴を押さえて、竿頭を狙いましょう。\n1. エサの事前準備が命！ \u0026nbsp; マルヨではエサの販売がありません。これは非常に重要なポイントです。当日に「エサがない！」とならないよう、必ず前日までに釣具店で購入しておきましょう。\n必須エサ: オキアミ、ダンゴ（マダイイエロー等）、冷凍イワシ・キビナゴ（青物用） 特効エサ: 活きアジ（青物がいる場合）、シラサエビ（シマアジ狙い） 2. 「マルヨの日（4日）」を狙い撃つ \u0026nbsp; 毎月4日の大放流は見逃せません。普段よりも魚影が濃くなるため、活性が上がりやすく、「どのタナでも食ってくる」というボーナスタイムに突入することも。予約は早めが鉄則です。\n3. タナ取りは慎重に \u0026nbsp; 陸続きとはいえ水深はしっかりあります。朝一は底〜底上1mを中心に探り、日が昇って暖かくなったら魚の浮き具合を見てタナを調整しましょう。\n釣れる魚種と時期 \u0026nbsp; 放流魚種は豊富で、9種類以上がラインナップされています。\n通年: マダイ 青物: ブリ（ワラサ）、カンパチ、ヒラマサ（イベント時など） 高級魚: シマアジ、イサキ、イシダイ（夏〜秋） 根魚: クエマス、ハタマス（冬場に嬉しい！） アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 伊勢自動車道「玉城IC」から「サニーロード（県道南島線）」を経由し、国道260号線を南伊勢・方座浦方面へ。ICから約50分〜1時間ほどで到着します。 駐車場は広々としており、釣り場のすぐそばまで車を寄せられるのが嬉しいポイント。\n近隣の釣具店（エサ購入場所） \u0026nbsp; 現地での販売がないため、道中の「エサ市場えさきち」などで必ず購入しておきましょう。\nえさきち 玉城店: 玉城IC降りてすぐ。24時間営業で安心。 まとめ：手軽さと興奮を両立した釣り堀 \u0026nbsp; 「つりぼりマルヨ」は、陸続きという**「手軽さ」と、マルヨの日などの「爆発力」**を兼ね備えた稀有な釣り堀です。 「海釣り公園では物足りないけど、渡船で沖に出るのはちょっと敷居が高い…」そんなステップアップを目指す釣り人や、家族でワイワイ楽しみたい方に、自信を持っておすすめできるスポットです。 エサの準備だけは忘れずに、クーラーボックス満タンの夢を見に行きましょう！"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 28,
        href: "/mie/tsuribori-denpachiya/",
        title: "【三重県】つり堀傳八屋｜13種以上の魚種＆イベント満載！南伊...",
        description: "「今日は何が釣れるかな？」というワクワク感を極限まで高めてくれる釣り堀。 それが三重県南伊勢町を代表する老舗、「つり堀傳八屋」です。",
        
        
        content: "「今日は何が釣れるかな？」というワクワク感を極限まで高めてくれる釣り堀。 それが三重県南伊勢町を代表する老舗、**「つり堀傳八屋」**です。\nその最大の魅力は、常時13種類以上という圧倒的な魚種の豊富さ。定番のマダイや青物だけでなく、サクラマス、イシダイ、マハタ、ヒラメなど、「次は何が食ってくるかわからない」ドキドキ感が味わえます。\nさらに、8の付く日は青物が乱舞する**「デンパチデー」、格安で楽しめる「ニコニコデー」**など、釣り人を楽しませるイベントが盛りだくさん。初心者から玄人まで、誰もが楽しめるエンターテインメント・フィッシングパークです。\nつり堀傳八屋の基本情報 \u0026nbsp; 項目 詳細 施設名 つり堀傳八屋（でんぱちや） 住所 〒516-0116 三重県度会郡南伊勢町迫間浦 電話番号 0599-64-3232 営業時間 6:30〜13:30（10月〜3月は7:00〜13:30）※予約時に確認 定休日 年中無休（台風などの荒天時、元日は休み） 料金 男性（中学生以上）：13,500円 / 女性：11,500円 / 子供（小学生以下）：5,000円 レンタル あり（要予約・有料） 持ち込み 竿1人1本（3.5m以内）、1本針のみ 公式サイト つり堀傳八屋 公式サイト 施設の特徴 \u0026nbsp; イベントが熱い！: デンパチデー: 毎月8日、18日、28日は青物（ブリ・カンパチ）大放流！ ニコニコデー: 毎月第2・第4木曜日は、なんと男女とも7,000円！ リピーター優遇: 有効期限3年の回数券（11枚綴り135,000円）があり、通うほどお得になります。 圧倒的な魚種: 季節に応じて様々な高級魚が放流され、五目釣りも夢ではありません。 こんな人に最適！ \u0026nbsp; 大物（青物）好き: 「デンパチデー」を狙えば、強烈な青物の引きを堪能できるチャンス大。 色々な魚を釣りたい人: マダイだけじゃ物足りない欲張りなアングラーにぴったり。 平日動ける人: 「ニコニコデー」を利用すれば、破格の値段で本格釣り堀を楽しめます。 つり堀傳八屋の攻略法 \u0026nbsp; 多魚種が混在するイケスを攻略するには、ターゲットを絞った戦略が必要です。\n1. タックルは強めが吉 \u0026nbsp; いつ青物や大型の石鯛がかかるかわかりません。マダイ狙いでもハリスは4号以上、青物狙いなら6〜8号を推奨します。不意の大物に切られない準備が必要です。\n2. イベントデーを戦略的に活用 \u0026nbsp; デンパチデー: 青物狙いの活きアジやカツオの切り身などを多めに用意しましょう。 ニコニコデー: 人が多くなる可能性があるため、手返しよく釣ることが重要です。 3. 深さとエサのローテーション \u0026nbsp; 魚種が多い分、タナ（魚のいる深さ）もバラバラです。\n表層〜中層: シマアジ、青物、サクラマス 底付近: マダイ、イシダイ、マハタ、ヒラメ 反応がなければタナを変え、エサもオキアミ→ダンゴ→活きエサ→虫エサとローテーションして、その日の「当たりパターン」を素早く見つけましょう。 釣れる魚種と時期 \u0026nbsp; 傳八屋の代名詞とも言える豊富なラインナップです。\n通年: マダイ、シマアジ、青物（カンパチ・ワラサ） 春: サクラマス（銀鮭） 夏: イサキ、イシダイ 秋: ヒラマサ、カツオ 冬: クロソイ、マハタ、ヒラメ その他: イシガキダイ、メジナなど アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 伊勢自動車道「玉城IC」から約40分。「サニーロード（県道南島線）」を南下し、迫間浦方面へ。 道中にコンビニや釣具店（エサ市場えさきち等）があり、買い出しにも便利です。\nまとめ：毎日がイベントのような釣り堀 \u0026nbsp; 傳八屋は、「ただ釣る」だけでなく「イベントに参加する」ような高揚感を与えてくれる釣り堀です。 「次の8の付く日は空いてるかな？」「今度は何の魚が放流されるんだろう？」 そんな風にカレンダーを見ながら釣行計画を立てるのも、傳八屋ファンの楽しみの一つ。 ぜひ、多彩な魚たちが待つ南伊勢の海へ出かけてみてください。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 29,
        href: "/mie/hasamaura-fishing-center/",
        title: "【三重県】はさま浦釣り堀センター｜マダイ1匹保証＆宿泊パック...",
        description: "「初めての釣り堀でボウズ（0匹）だったらどうしよう…」 「朝が早いから移動が大変そうだな…」",
        
        
        content: "「初めての釣り堀でボウズ（0匹）だったらどうしよう…」 「朝が早いから移動が大変そうだな…」\nそんな釣り堀デビューの不安をすべて解消してくれるのが、三重県南伊勢町の**「はさま浦釣り堀センター」**です。\nここの凄さは、なんといっても**「鉄壁の安心感」。 午前の部なら、万が一釣れなくてもマダイ1匹をお土産に保証してくれます。さらに民宿が併設されており、「宿泊＋釣り」のお得なパック**を利用すれば、前泊して翌朝0分の移動でスムーズに釣りがスタートできます。\n美しいリアス式海岸の風景の中で、心ゆくまで釣りを楽しみ、夜は新鮮な海の幸に舌鼓。まさに「釣り旅」の最適解がここにあります。\nはさま浦釣り堀センターの基本情報 \u0026nbsp; 項目 詳細 施設名 はさま浦釣り堀センター 住所 〒516-0116 三重県度会郡南伊勢町迫間浦825 電話番号 0599-64-3036 営業時間 午前：6:00〜13:30 / 午後：13:00〜18:00（受付は各時間の前） 定休日 不定休 料金 大人：13,000円 / 女性・中学生：9,000円 / 小学生：7,000円 レンタル 貸竿：1,500円 / タモ：100円 持ち込み 竿2本までOK 公式サイト はさま浦釣り堀センター 公式サイト 施設の特徴 \u0026nbsp; マダイ1匹保証（午前の部）: 初心者にとってこれほど心強いサービスはありません。絶対に手ぶらでは帰しません。 最強の宿泊プラン: 併設の「民宿はさま浦」に泊まれば、美味しい夕食＋宿泊＋翌日の釣り代込みで大人16,500円〜（※要確認）。移動の疲れもなく、コスパも最強クラスです。 ナイター営業あり: 午後からのショートコース（ナイター）もあり、朝起きるのが苦手な方や観光ついでに最適です。 こんな人に最適！ \u0026nbsp; 完全な初心者・ファミリー: 絶対に魚を持って帰りたいならここ一択。 遠方からの旅行者: 宿泊プランを使えば、運転の疲れを癒やして万全の状態で釣りに挑めます。 ゆったり派: せかせかしたくない、のんびりと海と釣りを楽しみたい方におすすめ。 はさま浦釣り堀センターの攻略法 \u0026nbsp; 保証があるとはいえ、自分で釣った魚の味は格別です。\n1. 朝一のチャンスタイムを逃さない \u0026nbsp; 宿泊プランなら、朝の受付も余裕です。開始直後の「朝マズメ」が一番釣れる時間帯。ここで手早くマダイを確保しましょう。タナは底（底網ギリギリ）から50cm〜1m上が基本です。\n2. 多彩な魚種を狙い分ける \u0026nbsp; マダイ以外にも、ブリ、カンパチ、シマアジ、ハタ、ヒラメなど高級魚が放流されています。\n青物: 活きアジで中層を泳がせる。 ヒラメ・ハタ: キビナゴやイワシで底を狙う。 竿を2本出せる（要確認・通常は1本が多いがここは2本OKな場合も）ルールを活用し、1本は置き竿で青物を狙うのもアリです。 3. 民宿のお父さん・お母さんに聞く \u0026nbsp; アットホームな雰囲気が魅力の施設です。最近の当たりエサやタナなど、スタッフや民宿の方に気軽に聞いてみましょう。親切に教えてくれます。\n釣れる魚種と時期 \u0026nbsp; 通年: マダイ、ハム（マハタなどのハタ類） 青物: ワラサ（ブリ）、カンパチ、シマアジ 冬場: ヒラメ、ハタマス 季節によって放流魚種が変わるので、公式サイトの釣果情報をチェック！ アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 伊勢自動車道「玉城IC」からサニーロード経由で約40分。 海沿いの道を進むと看板が見えてきます。「あなたに逢い鯛。釣り堀」と同じ敷地内です。\n宿泊のススメ \u0026nbsp; 遠方の方はぜひ「お泊り釣り堀プラン」をご検討ください。夜は伊勢エビやアワビ（別注・要予約）などの豪華な夕食を楽しむこともでき、まさに釣り人天国です。\nまとめ：安心と癒やしの釣り堀 \u0026nbsp; 「はさま浦釣り堀センター」は、釣りのドキドキ感と、旅行のワクワク感を同時に叶えてくれる稀有な場所です。マダイ保証という保険をかけつつ、大物を狙って竿を振る。疲れたらすぐそこの宿で休む。 そんなストレスフリーな釣り体験を、ぜひあなたも味わってみてください。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 30,
        href: "/mie/marusui-kaisan/",
        title: "【三重県】マルスイ海産｜1日4,500円！尾鷲の秘境で挑む天...",
        description: "「釣り堀の魚では満足できない」 「自分の技術がどこまで通用するか試したい」",
        
        
        content: "「釣り堀の魚では満足できない」 「自分の技術がどこまで通用するか試したい」\nそんな野生の感覚を持ったアングラーたちが集う場所、それが三重県尾鷲市三木浦町にある**「マルスイ海産」**です。\nここは、釣れることが約束された「海上釣り堀」ではありません。 尾鷲の深く豊かな自然の海に浮かぶ筏の上で、回遊してくる正真正銘の天然魚と対峙する、真剣勝負のステージです。\n料金は驚きの1日4,500円。小学生以下は半額。 お膳立てされた釣りではなく、自然の潮を読み、場所を選び、魚を寄せて喰わせる。釣果0（ボウズ）のリスクと引き換えに、価値ある1匹を手にした時の震えるような感動を約束します。\nマルスイ海産の基本情報 \u0026nbsp; 項目 詳細 施設名 マルスイ海産 住所 〒519-3814 三重県尾鷲市三木浦町267 電話番号 公式サイト参照（携帯電話へ連絡） 営業時間 日の出〜日の入り（季節により変動・要確認） 定休日 荒天時（年末年始等は要確認） 料金 大人：4,500円 / 小学生以下：2,250円 レンタル なし（釣具・ライフジャケット等すべて持参） トイレ 筏により簡易トイレあり（女性・子供は事前に要相談） 公式サイト マルスイ海産 公式サイト 施設の特徴 \u0026nbsp; 圧倒的なコストパフォーマンス: 渡船料込みで1日4,500円はエリア最安値クラス。 天然魚の宝庫: 三木浦の湾内は水深があり、大型のチヌ（クロダイ）やマダイ、良型のアジやカワハギが狙えます。 静寂な環境: 観光地化された釣り場とは違い、静かな海と向き合えるストイックな環境です。 こんな人に最適！ \u0026nbsp; 筏釣り（カセ釣り）経験者: 自分の道具とノウハウで結果を出したい方。 静かに釣りたいソロアングラー: 隣の客のオマツリを気にせず、自分だけの時間を楽しみたい方。 低予算で長時間遊びたい方: 日の出から日の入りまで、約10時間以上たっぷり遊んでも追加料金なし。 マルスイ海産の攻略法 \u0026nbsp; 天然魚相手ゆえに、状況判断が全てです。\n1. 筏選びは船長と相談 \u0026nbsp; 湾内に複数の筏があり、季節や潮によって「チヌが好調な場所」「アジが回っている場所」が異なります。予約時や当日の朝、船長に直近の釣果を聞いてポイントを決めましょう。\n2. 多彩なエサを持参する \u0026nbsp; 釣り堀のように「これがあればOK」という正解がありません。\nベース: オキアミ、サナギ、コーン 変化球: 虫エサ（アオイソメ・ボケ）、練り餌、アケミ貝 その日の魚の偏食パターンを探ることが重要です。 3. 早朝と夕マズメを逃さない \u0026nbsp; 営業時間が「日の出〜日の入り」と長いため、中だるみする時間帯もありますが、最高のチャンスは朝一番と納竿前の夕方。ここで集中力を高められるかが勝負の分かれ目です。\n釣れる魚種と時期 \u0026nbsp; すべて天然魚です。\nメイン: チヌ（クロダイ） お土産: マダイ、カワハギ、アジ、サバ その他: ヘダイ、ボラ、カサゴ、イシダイ（サンバソウ） アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 紀勢自動車道「尾鷲北IC」から国道311号線を経由して約25分。 三木浦トンネルを抜けた先の静かな漁港です。\n※市街地から少し離れているため、コンビニやエサ屋（エサ市場えさきち 尾鷲南店など）は国道42号線沿いで事前に済ませておきましょう。\nまとめ：研ぎ澄まされた1匹を求めて \u0026nbsp; マルスイ海産は、決して「楽に釣れる場所」ではありません。トイレ設備なども最低限で、初心者やファミリーにはハードルが高いかもしれません。 しかし、そこには**「釣らされた魚」ではない「自分で釣った魚」**という最高の価値があります。 腕に覚えのある釣り人の皆さん、尾鷲の海で自分の実力を試してみませんか？"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 31,
        href: "/mie/ugata-hamatsuri-center/",
        title: "【三重県】鵜方浜釣センター｜チヌ師の聖地！屋根・トイレ完備の...",
        description: "「釣り堀の養殖魚じゃ満足できない」 「自分の腕で、警戒心の強い野生のクロダイを仕留めたい」",
        
        
        content: "「釣り堀の養殖魚じゃ満足できない」 「自分の腕で、警戒心の強い野生のクロダイを仕留めたい」\nそんな生粋の釣り師たちがこぞって通うのが、志摩市・英虞湾（あごわん）にある**「鵜方浜（うがたはま）釣センター」**です。\nここは、ダンゴエサを使ってクロダイを寄せる伝統釣法**「紀州釣り（団子釣り）」の聖地**とも呼ばれる場所。 波静かな英虞湾に浮かぶ筏（いかだ）の上で、じっと穂先を見つめ、一瞬のアタリを掛ける——。 その緊張感と、釣り上げた時の達成感は、釣り堀では絶対に味わえない極上の体験です。\n「でも、筏釣りってトイレや日差しが心配…」 ご安心ください。ここの筏は屋根・トイレ完備。 ストイックな釣りを、驚くほど快適な環境で楽しめるのが、鵜方浜釣センターの人気の秘密です。\n鵜方浜釣センターの基本情報 \u0026nbsp; 項目 詳細 施設名 鵜方浜釣センター 住所 〒517-0501 三重県志摩市阿児町鵜方1011-1 電話番号 0599-43-1621 営業時間 日の出〜日没（季節により変動） 定休日 不定休 料金 大人: 4,000円\n小人: 2,000円 対象魚 クロダイ（チヌ）、キビレ、マダイ、アジ、キス、カレイ、アオリイカなど 設備 筏・カセに屋根・個室トイレ完備、無料駐車場 公式サイト 西尾渡船（鵜方浜釣センター） 施設の特徴 \u0026nbsp; 「紀州釣り」の道場: 数々の名手が腕を磨いた場所。魚影が濃く、50cmオーバーの「年無し」チヌの実績も多数。 鉄壁の快適装備: ほとんどの筏・カセに屋根とトイレが付いています。突然の雨や、日差しの強い夏場、女性連れの釣行でも安心感が違います。 BBQもOK: 釣り座でBBQを楽しめる道具のレンタルもあり、釣れなくてもレジャーとして成立します。 こんな人に最適！ \u0026nbsp; 脱・釣り堀を目指す人: 「もっと駆け引きを楽しみたい」という中級者へのステップアップに最適です。 ベテラン釣り師: 潮の流れ、エサ取りとの攻防…知識と技術を総動員する奥深い釣りが待っています。 カップル・夫婦: トイレ問題がクリアされているので、パートナーを誘いやすい希少な筏釣り場です。 鵜方浜の攻略法 \u0026nbsp; 英虞湾を知り尽くした船頭さんのアドバイスが一番ですが、基本の傾向はこちら。\n1. 「朝マヅメ」と「夕マヅメ」 \u0026nbsp; 天然魚相手なので、やはり食いが立つのは朝夕。日の出一番船で渡り、夕方までじっくり粘るのが王道パターンです。\n2. 多彩な「サシエサ」を用意 \u0026nbsp; クロダイは偏食家です。 オキアミ、コーン、サナギ、ボケ（カメジャコ）など、複数のエサを持ち込んでローテーションさせるのが釣果への近道です。\n3. 外道（ゲスト）も楽しむ \u0026nbsp; アジやキス、秋にはアオリイカもよく釣れます。チヌが渋い時はお土産確保に切り替える柔軟さも大切です。\n釣れる魚種と時期 \u0026nbsp; 春: 乗っ込みチヌ（大型）、マダイ 夏: 数釣りのチヌ、アジ、キス 秋: 数釣りのチヌ、アオリイカ、サヨリ 冬: 寒チヌ（良型）、カレイ、ヒラメ アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 伊勢自動車道「伊勢西IC」から伊勢道路（県道32号）経由で約40分。 近鉄「鵜方駅」からも近く、志摩スペイン村などの観光地へのアクセスも良好です。\nまとめ：静寂と興奮の「大人の遊び場」 \u0026nbsp; 鵜方浜釣センターは、決して派手な施設ではありません。 しかし、波の音だけが響く静かな海の上で、海中の見えない大物と対峙する時間は、何物にも代えがたい贅沢です。\n「今日は釣れるか、釣れないか分からない」 そんなハラハラドキドキも含めて、本物の海釣りを楽しんでみませんか？ 屋根とトイレが守ってくれる快適な「海上の要塞」が、いつでもあなたを待っています。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 32,
        href: "/mie/kaijo-tsuribori-fukujumaru/",
        title: "【三重県】海上釣り堀福寿丸｜活きアジで青物狙い！会員制度がお...",
        description: "「ブリやヒラマサの強烈な引きを味わいたい！」 「せっかく通うなら、お得な特典があるほうがいい」",
        
        
        content: "「ブリやヒラマサの強烈な引きを味わいたい！」 「せっかく通うなら、お得な特典があるほうがいい」\nそんな本格派アングラーから熱い支持を受けているのが、南伊勢町の**「海上釣り堀福寿丸」**です。\n最大の特徴は、「活きアジ」を使った泳がせ釣りが公認推奨されていること（現地販売あり）。 弱った魚ではなく、元気なアジをエサにできるため、ブリやカンパチといった大型青物の食い付きが段違いです。さらに、正会員制度による割引や、毎月10日・20日・30日の「寿の日」スペシャル放流など、通えば通うほど楽しくなる仕掛けが満載。\n一発大物を狙うスリルと、ホームグラウンドを持つ喜び。その両方を提供してくれる、釣り人のための楽園です。\n福寿丸の基本情報 \u0026nbsp; 項目 詳細 施設名 海上釣り堀 福寿丸 住所 〒516-0116 三重県度会郡南伊勢町迫間浦1396-32 電話番号 0599-64-3210（予約受付 8:00〜20:00） 営業時間 【春】6:00〜13:30 【夏】5:45〜13:30 【秋・冬】6:30〜13:30 定休日 不定休 料金 男性：14,000円 / 女性：12,000円 / 小学生：5,000円（会員割引あり） 貸切 4名〜（平日）、8名〜（土日祝）など応相談 レンタル 竿・リールセット：2,000円 設備 トイレ、休憩所、駐車場、エサ販売（活きアジあり） 公式サイト 海上釣り堀福寿丸 公式サイト 施設の特徴 \u0026nbsp; 泳がせ釣り最強: 現地で「活きアジ（5匹1,000円）」を購入可能。青物狙いの最強パターンがすぐに実践できます。 会員制度がお得: 入会金無料で正会員になれ、男性500円・女性500円OFFなどの割引特典や、来店ポイントによるプレゼントがあります。 イベント充実: 「寿の日（10・20・30日）」は放流数アップ！その他、季節ごとのイベントも頻繁に開催。 こんな人に最適！ \u0026nbsp; 青物ハンター: 活きアジを使って、ブリ・ヒラマサ・カンパチとの力勝負を楽しみたい方。 リピーター志向: 同じ場所に通ってポイントを貯めたり、顔馴染みになりたい方。 グループ貸切: 4名（平日）という少人数から貸し切りできるため、仲間内だけの釣り大会にも最適。 福寿丸の攻略法 \u0026nbsp; 福寿丸のポテンシャルを最大限に引き出すための3つのポイントです。\n1. 「活きアジ」は必須アイテム \u0026nbsp; 青物を釣りたいなら迷わず購入しましょう。ウキが海中にズボッと消し込む光景は圧巻です。アジが弱らないよう、針は「鼻掛け」か「背掛け」で丁寧に。\n2. 「寿の日」を狙い撃ち \u0026nbsp; 毎月10日・20日・30日は「寿の日」。通常よりも放流量が多く、活性の高い魚に出会える確率がグンと上がります。予定が合うならこの日が絶対におすすめ。\n3. タナ（水深）の共有 \u0026nbsp; 貸切でなくても、同じイケスの釣り人と「今どのくらいの深さで当たりました？」と情報交換するのが釣果への近道。特にシマアジやマダイはタナが重要です。\n釣れる魚種と時期 \u0026nbsp; メイン: マダイ、シマアジ 大物: ブリ、ヒラマサ、カンパチ（通年狙えますが、特に青物は春〜秋が熱い！） 季節物: サクラマス（春）、イサキ、イシダイ、マハタ、ヒラメ アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 伊勢自動車道「玉城IC」からサニーロード経由で約40分。 迫間浦（はさまうら）エリアの奥まった場所に位置します。駐車場から船着場まではすぐ。\nまとめ：会員になって通いたくなる場所 \u0026nbsp; 福寿丸は、単に魚を釣らせるだけでなく、「通う楽しさ」を提供してくれる釣り堀です。 活きアジで青物を仕留めた時の興奮、ポイントが貯まっていく喜び、そして顔馴染みのスタッフとの会話。 南伊勢で「自分のホーム」と呼べる場所を探しているなら、一度足を運んで、その場で会員登録することをおすすめします。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 33,
        href: "/mie/kaijo-tsuribori-monkey/",
        title: "【三重県】海上釣堀モンキー｜3時間から遊べる！BBQも楽しめ...",
        description: "「釣り堀って朝早くて夕方まで…ちょっと長すぎる」 「釣った魚、家で捌けないからその場で食べたい」",
        
        
        content: "「釣り堀って朝早くて夕方まで…ちょっと長すぎる」 「釣った魚、家で捌けないからその場で食べたい」\nそんな「ちょっと体験してみたい」というライト層やファミリーにぴったりなのが、鳥羽市浦村町にある**「海上釣堀モンキー」**です。\n最大の特徴は、「3時間コース」から気軽に遊べる柔軟な時間設定と、釣った魚をすぐに焼いて食べられる直営BBQ場が併設されていること。 さらに、万が一釣れなくてもマダイ1匹をプレゼントしてくれる**「ボウズ保証」**まで完備。\n「観光のついでに」「子供と一緒に手ぶらで」といったワガママな要望をすべて叶えてくれる、遊び心満載の釣り堀です。\n海上釣堀モンキーの基本情報 \u0026nbsp; 項目 詳細 施設名 海上釣堀モンキー 住所 〒517-0025 三重県鳥羽市浦村町1363 電話番号 0599-32-5550（予約受付 8:00〜20:00） 営業時間 7:00〜15:00 定休日 無休（荒天時や臨時休業あり） 料金 1日コース：男性11,000円 / 女性・子供7,700円\n3時間コース：男性5,500円 / 女性・子供4,400円 貸切 詳細はお問い合わせください レンタル 竿・リール（仕掛け・エサ別）：1,000円〜 設備 トイレ、直営BBQ場、駐車場、エサ販売 公式サイト 海上釣堀モンキー 公式サイト 施設の特徴 \u0026nbsp; 選べる時間設定: ガッツリ「1日コース」はもちろん、観光の隙間に「3時間コース」も選べます。1時間単位の延長も可能。 安心のボウズ保証: もし釣れなくてもマダイ1匹のお土産付き。クーラーボックスが空っぽで帰る悲劇はありません。 釣って即BBQ: 直営の「海鮮バーベキュー モンキー」で、釣ったばかりの新鮮な魚をその場で焼いて食べられます（要予約・別料金）。 こんな人に最適！ \u0026nbsp; ファミリー・カップル: 3時間でサクッと釣って、お昼はBBQ。最高の休日プランがここで完結します。 観光ついでに: 鳥羽水族館や伊勢志摩観光の合間に、手ぶらで立ち寄れます。 釣りデビューの方: 短時間＋ボウズ保証＋手ぶらOKと、釣りを始めるハードルが極めて低いのが魅力。 モンキーの攻略法 \u0026nbsp; 短時間勝負だからこそ、効率よく釣果を上げましょう。\n1. スタッフに「タナ」を聞く \u0026nbsp; 釣り開始時、スタッフに「今のタナ（魚がいる水深）はどのくらいですか？」と必ず聞きましょう。これが釣れるかどうかの8割を決める最重要情報です。\n2. エサのバリエーション \u0026nbsp; モンキーは色々な魚種が入っています。\nマダイ: エビ、ダンゴ 青物: イワシ、カツオの切り身 数種類のエサを用意しておくと、飽きさせずに釣れ続けます。 3. 朝イチの時間帯がおすすめ \u0026nbsp; 3時間コースなら、魚の活性が高い「朝7時〜10時」の枠で予約するのがベスト。昼に近づくにつれて食いが渋くなる傾向があります。\n釣れる魚種と時期 \u0026nbsp; メイン: マダイ（通年） 青物: ワラサ（メジロ）、カンパチ、ヒラマサ 高級魚: シマアジ、イサキ、イシダイ（季節により変動） その他: シーバス（スズキ）、ヒラメ アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 伊勢二見鳥羽ライン「鳥羽IC」から約20分。 パールロード方面へ進み、麻生の浦大橋の手前エリア。浦村町は「牡蠣」でも有名なので、冬場は焼き牡蠣小屋へ立ち寄るのもおすすめ。\nまとめ：鳥羽観光の「メインイベント」に \u0026nbsp; 海上釣堀モンキーは、釣りを「趣味」から「誰でも楽しめるアクティビティ」に変えてくれる場所です。 釣りが初めてのお子様が、自分の背丈ほどある竿を曲げて大興奮する姿。 自分たちで釣った魚を炭火で焼いて食べる、何物にも代えがたい美味しさ。 そんな特別な思い出を、モンキーで手軽に作ってみませんか？"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 34,
        href: "/mie/kaijo-tsuribori-wako/",
        title: "【三重県】海上釣堀和光｜ブリ・カンパチ・シマアジが乱舞！南伊...",
        description: "「マダイだけじゃ物足りない。もっと色々な高級魚を釣りたい！」 「家族で行きたいけど、釣り堀って意外と高い…」",
        
        
        content: "「マダイだけじゃ物足りない。もっと色々な高級魚を釣りたい！」 「家族で行きたいけど、釣り堀って意外と高い…」\nそんな釣り人の声を叶えてくれるのが、南伊勢町迫間浦の**「海上釣堀和光（わこう）」**です。\nここの自慢は、なんといっても放流される魚種の豪華さ。 マダイはもちろん、ブリ、カンパチ、シマアジ、ヒラマサ、イサキ、マハタなど、市場価値の高い高級魚が惜しげもなく放流されています。 それでいて、女性10,000円、小学生以下6,000円という良心的な料金設定。\n「美味しい魚を、お腹いっぱい食べたい」。そんな贅沢な悩みを抱える釣り人に、和光は最高の答えを用意しています。\n海上釣堀和光の基本情報 \u0026nbsp; 項目 詳細 施設名 海上釣堀和光（わこう） 住所 〒516-0116 三重県度会郡南伊勢町迫間浦795-24 電話番号 0599-64-3069（予約受付〜20:00） 営業時間 【夏】6:00〜14:00 【冬】6:30〜14:00 定休日 不定休 料金 大人13,000円 / 女性10,000円 / 小学生以下6,000円 貸切 平日52,000円〜（8名まで）、土日祝78,000円〜（12名まで） レンタル 竿・リールセット（仕掛け別）：2,000円 設備 トイレ、駐車場、休憩所 公式サイト 海上釣堀和光 公式サイト 施設の特徴 \u0026nbsp; 魚種のデパート: 人気の青物御三家（ブリ・ヒラマサ・カンパチ）に加え、シマアジなどの高級魚が豊富。 完全釣り放題: 竿制限数や匹数制限なし。釣った魚は全て持ち帰りOKで、追加料金もかかりません。 女性・子供にお得: 女性は通常料金より3,000円もお得。家族連れやカップルに優しい設定です。 こんな人に最適！ \u0026nbsp; 食べる専門のグルメ派: どうせ釣るならスーパーで売っていないような高級魚がいい、という方に。 ファミリーフィッシング: 釣り堀デビューのお子様や奥様も、お得な料金で本格的な釣りが楽しめます。 幹事さん: 貸切料金も設定されているため、会社のレクリエーションや釣り大会の会場としても優秀です。 和光の攻略法 \u0026nbsp; 高級魚たちを確実に仕留めるための戦略です。\n1. タックルは強めに \u0026nbsp; 青物が多いため、ヤワな仕掛けでは一瞬で切られます。\nハリス: 最低でも4号、青物狙いなら6号以上推奨。 針: 太軸のしっかりしたものを選びましょう。 2. エサの持ち込みは必須 \u0026nbsp; 和光ではエサの販売は現地でもありますが、事前に釣具店で豊富な種類を用意していくのが基本です。\n必須: オキアミ（マダイ）、ダンゴ（マダイ・シマアジ） 強打者: 活きアジ（青物）、カツオの切り身（青物）、シラサエビ（シマアジ・イサキ） 3. 「シマアジ」を狙え \u0026nbsp; 和光の名物とも言えるのがシマアジ。口が弱くバラしやすい難敵ですが、食味は最高レベル。中層を丁寧に探り、アタリがあったら優しく合わせるのがコツです。\n釣れる魚種と時期 \u0026nbsp; メイン: マダイ、シマアジ 青物: ブリ、ワラサ、カンパチ、ヒラマサ その他: ハタ類（マハタなど）、イサキ、ヒラメ、イシダイ アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 伊勢自動車道「玉城IC」からサニーロード経由で約40分〜50分。 迫間浦の入り口付近に位置し、アクセスは良好です。駐車場から桟橋までも近く、荷物の運搬も楽々。\nまとめ：クーラーボックスは大きめで \u0026nbsp; 海上釣堀和光からの帰りは、クーラーボックスが重くなることを覚悟してください。 青物の強烈な引きを楽しみ、帰ってからは豪華な刺身盛り合わせに舌鼓を打つ。 そんな「釣り人の特権」を存分に味わえる場所です。次回はぜひ、ワンランク上の大きなクーラーボックスを持って遊びに行きましょう。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 35,
        href: "/mie/kaijo-tsuribori-benya/",
        title: "【三重県】海上釣堀辨屋｜1日2回の放流で爆釣！南伊勢のレジェ...",
        description: "「ボウズ（0匹）だけは絶対に避けたい」 「今日はご馳走を作るから、確実に高級魚を持ち帰りたい」",
        
        
        content: "「ボウズ（0匹）だけは絶対に避けたい」 「今日はご馳走を作るから、確実に高級魚を持ち帰りたい」\nそんなプレッシャーのかかる日に、最も頼りになる存在。それが南伊勢町の老舗**「海上釣堀辨屋（べんや）」**です。\n辨屋の代名詞は、何と言っても**「1日2回」の放流システム**。 朝イチだけでなく昼前にも新鮮な魚が追加されるため、一日中活性が落ちにくく、最後まで大釣りのチャンスが続きます。 さらに、毎月2日・12日・22日は**「Benya Day」**として、普段お目にかかれないような超高級魚や特大サイズが大量放流されるお祭り騒ぎ。\n「釣らせる」ことへの執念と、釣り人への手厚いサービスで、三重県の釣り堀界を牽引し続けるレジェンドです。\n辨屋（べんや）の基本情報 \u0026nbsp; 項目 詳細 施設名 海上釣堀 辨屋（べんや） 住所 〒516-0117 三重県度会郡南伊勢町礫浦132 電話番号 090-8868-2033（予約受付 9:00〜18:00・19:00〜21:00） 営業時間 【夏】5:45〜13:30 【冬】6:30〜13:30 定休日 詳細は公式サイト予約カレンダー参照 料金 大人13,000円 / 女性・中学生10,000円 / 子供5,000円 貸切 平日：5名〜 / 土日祝：10名〜（小筏利用時）など柔軟に対応 レンタル 竿・リールセット：1,500円（要予約） 設備 トイレ、休憩所、駐車場、お弁当・配送サービス（有料） 公式サイト 海上釣堀辨屋 公式サイト 施設の特徴 \u0026nbsp; 勝利の2回放流: 朝のチャンスタイムに加え、10:30頃にも新鮮な魚を放流。「釣れない時間」を作りません。 Benya Day: 「2」のつく日は激アツ。ヒラメ、ハタ、特大ブリなど、まさに高級魚の宝庫となります。 アフターサービス: 釣った魚を神経締めしてくれ、さらに宅配便で自宅へ配送も可能（別料金）。手ぶらで帰れる快適さは一度味わうと病みつきです。 こんな人に最適！ \u0026nbsp; 絶対に釣りたい人: 2回の放流チャンスは偉大です。お土産確保の確率がグンと上がります。 遠征アングラー: 配送サービスを使えば、帰りの渋滞や鮮度落ちを気にせず帰宅できます。 リピーター: スタンプカード（10回で半額）など、通うほどお得になる仕組みが充実しています。 辨屋の攻略法 \u0026nbsp; 2回の放流をどう活かすかが勝負の分かれ目です。\n1. タナ取りを正確に \u0026nbsp; マダイは底から50cm〜1m、シマアジは中層、青物は底から駆け上がりを意識。特にシマアジの「見釣り」ができるほど水が綺麗な時もあるので、偏光グラスは必須です。\n2. 「2回目の放流」が勝負 \u0026nbsp; 多くの人が疲れ始める10:30頃、2回目の放流があります。ここで集中力をMAXに戻しましょう。特に青物が追加されることが多いので、活きアジやカツオの準備をお忘れなく。\n3. エサのローテーション \u0026nbsp; 辨屋の魚はスレている（賢い）個体もいます。\n基本: オキアミ、ダンゴ 変化球: ササミ（黄色）、ミニトマト、キビナゴ これらを使い分けることで、食い渋る魚の口を使わせましょう。 釣れる魚種と時期 \u0026nbsp; メイン: マダイ、シマアジ、イサキ 青物: ブリ（ワラサ）、カンパチ、ヒラマサ 高級魚: イシダイ、イシガキダイ、マハタ、クエ（季節イベント時） アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 伊勢自動車道「玉城IC」からサニーロード経由で約50分。 南伊勢町の中でも「礫浦（さざらうら）」エリアは道が整備されており、比較的運転しやすいルートです。\nまとめ：信頼と実績の「辨屋ブランド」 \u0026nbsp; 「今日は辨屋に行く」。その一言で釣り仲間が羨ましがるほど、辨屋はブランド化しています。 それは単に魚が釣れるからだけでなく、スタッフの活気、魚の質の高さ、そして「釣り人を楽しませたい」という心意気が伝わってくるからでしょう。 本気で海釣りを遊び尽くしたいなら、辨屋は外せない聖地です。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 36,
        href: "/mie/kashikojima-fishing-park-kaiyuen/",
        title: "【三重県】賢島フィッシングパーク海遊苑｜手ぶらでGO！釣って...",
        description: "「釣りはしたことないけど、魚は大好き！」 「伊勢志摩に来たなら、美味しい海の幸を堪能したい」",
        
        
        content: "「釣りはしたことないけど、魚は大好き！」 「伊勢志摩に来たなら、美味しい海の幸を堪能したい」\nそんな「食」へのこだわりが強い旅行者にこそおすすめしたいのが、賢島（かしこじま）にある**「賢島フィッシングパーク海遊苑」**です。\nここは単なる釣り堀ではありません。「釣る・焼く・食べる」がセットになった食のエンターテインメント施設。 道具は一切不要。手ぶらで訪れて、プロが育てた美味しい真鯛やアジを釣り上げたら、その場で職人さんがお刺身や塩焼きに調理してくれます。\n美しい英虞湾（あごわん）を見渡す海上デッキで、自分で釣った魚を頬張る。 高級レストランにも負けない、究極の贅沢時間がここにあります。\n海遊苑（かいゆうえん）の基本情報 \u0026nbsp; 項目 詳細 施設名 賢島フィッシングパーク海遊苑 住所 〒517-0502 三重県志摩市阿児町神明682-16（賢島駅ウラ） 電話番号 0599-43-1002（受付 9:00〜17:00） 営業時間 9:00〜17:00（最終受付 15:00） 定休日 不定休（荒天時休業） 料金 釣り体験（2時間）: 3,500円（竿・エサ代込み） 体験内容 マダイなどの放流魚釣り、または五目釣り（アジなど） 調理代 500円〜（刺身、塩焼き、フライなど） 設備 トイレ、海上レストラン、BBQスペース、駐車場 公式サイト 賢島フィッシングパーク海遊苑 公式サイト 施設の特徴 \u0026nbsp; 完全手ぶらスタイル: 料金は竿もエサも全てコミコミ。ハイヒールやスカートでも楽しめるほど気軽で清潔な施設です。 釣って即グルメ: これが最大の魅力。釣れたピチピチの魚を、その場で調理してくれます。鮮度が違うので味も格別。 海上BBQ: 伊勢海老やサザエなどの海鮮食材を追加して、豪華なバーベキューも同時に楽しめます（要予約推奨）。 こんな人に最適！ \u0026nbsp; カップル・女子旅: 服装を気にせず遊べます。海をバックに魚と記念撮影、そして豪華なランチはSNS映え間違いなし。 家族旅行: お子様の「自分で釣った！」という成功体験と、「命をいただく」という食育に最高のスポットです。 賢島に宿泊する人: チェックイン前やチェックアウト後の空き時間にぴったり。駅からも近いです。 海遊苑の楽しみ方レシピ \u0026nbsp; ただ釣るだけじゃもったいない！おすすめの過ごし方です。\n1. 釣り体験（約1〜2時間） \u0026nbsp; まずは釣りからスタート。スタッフさんが丁寧に教えてくれるので、初心者でもマダイなどがちゃんと釣れます。引きの強さにびっくりするはず！\n2. 調理オーダー \u0026nbsp; 釣れた魚をスタッフに渡して、「お刺身で」「半分は塩焼きで」とオーダーしましょう。伊勢志摩名物「てこね寿司」などの単品メニューも充実しています。\n3. 海上ランチタイム \u0026nbsp; 心地よい海風を感じながら乾杯！自分で釣った魚の味は、どんな高級店よりも美味しく感じる魔法の調味料がかかっています。\n釣れる魚種と時期 \u0026nbsp; メイン: マダイ（通年）、アジ 季節により: イサキ、カンパチ、ヒラメ その他: 天然のアジやベラなどが釣れる五目釣りコーナーもあり アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 近鉄「賢島駅」のすぐ裏手。 伊勢自動車道「伊勢西IC」から約40分。専用駐車場完備。\n電車でのアクセス \u0026nbsp; 近鉄「賢島駅」から徒歩3〜5分。 駅の南口を出て、海沿いに降りていけばすぐに見えます。電車旅の人にも最適です。\nまとめ：五感で味わう伊勢志摩の海 \u0026nbsp; 海遊苑は、釣りの技術を競う場所ではありません。**「伊勢志摩の海を、食べて、遊んで、満喫する場所」**です。 竿を握った時のドキドキ感、焼ける魚の香ばしい匂い、口いっぱいに広がる旨み。 そのすべてが、旅の忘れられない思い出になることを約束します。お腹を空かせて出かけましょう！"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 37,
        href: "/mie/koueimaru/",
        title: "【三重県】光栄丸｜10回で1回無料！5,000円で楽しめる南...",
        description: "「毎週でも釣りに行きたいけど、お財布が…」 「冬の筏釣りは寒さとの戦いで辛い…」",
        
        
        content: "「毎週でも釣りに行きたいけど、お財布が…」 「冬の筏釣りは寒さとの戦いで辛い…」\nそんな釣り人の悩みに寄り添ってくれるのが、三重県南伊勢町・礫浦（さざらうら）にある**「光栄丸」**です。\n魅力はなんといっても**「通いやすさ」。 料金は大人も子供も一律5,000円**と格安。さらに驚きなのが、10回乗ると次回1回無料になるポイントカード制度！単純計算で、実質1回あたり約4,500円という衝撃的なコスパを実現しています。\nそして冬場の名物が**「練炭レンタル」**。 筏の上でヤカンを沸かし、カップラーメンを啜ったり、熱々のコーヒーを飲んだり。冷えた体を芯から温めてくれるこのサービス目当てに通う常連さんも多い、心温まる渡船店です。\n光栄丸の基本情報 \u0026nbsp; 項目 詳細 施設名 光栄丸 住所 〒516-0117 三重県度会郡南伊勢町礫浦163-1 電話番号 携帯電話へ（公式サイト参照） 営業時間 4:30〜16:30（季節により変動・要確認） 定休日 なし（荒天時休業） 料金 大人・子供：一律5,000円 レンタル 練炭小鉢セット：1,000円（11月〜3月頃） ポイントカード 10回乗船で1回無料 公式サイト 光栄丸 公式サイト 施設の特徴 \u0026nbsp; 最強のポイントカード: 10回で1回無料は、頻繁に通う釣り人にとって最高の還元制度です。 一律料金: 面倒な計算は不要。誰でも5,000円で一日中遊べます。 冬の快適装備: 練炭火鉢のレンタル（冬季限定）は、暖房としてはもちろん、調理器具としても大活躍。 こんな人に最適！ \u0026nbsp; リピーター・常連志向の方: 通えば通うほどお得になるシステムは、ホームグラウンドを探している方にぴったり。 冬釣りが好きな方: 極寒の海上で食べる温かい食事の美味しさは格別です。 チヌ・五目釣りファン: 天然のクロダイ、マダイ、カワハギなど、季節ごとの美味しい魚が狙えます。 光栄丸の攻略法 \u0026nbsp; 五目釣りの要素が強い礫浦の筏を攻略するヒントです。\n1. エサ取り対策をする \u0026nbsp; 魚影が非常に濃いエリアなので、エサ取り（フグやベラなど）も多いです。オキアミだけでなく、コーン、サナギ、練り餌など、エサ取りに強いエサを必ず用意しましょう。\n2. 足元とちょい投げを使い分ける \u0026nbsp; 筏の真下だけでなく、少し前に投げると砂地が広がっており、キスやカレイ、時には良型のマダイが潜んでいることも。一本は置き竿で投げておくと、思わぬお土産がゲットできるかもしれません。\n3. 冬こそチャンス \u0026nbsp; 練炭で暖を取りながら、「寒チヌ」と呼ばれる脂の乗った大型クロダイを狙うのが光栄丸の冬のスタイル。エサ取りが減るこの時期こそ、大物とじっくり対峙できるチャンスです。\n釣れる魚種と時期 \u0026nbsp; 通年: チヌ（クロダイ）、アジ 春〜秋: マダイ、キス、アオリイカ 秋〜冬: カワハギ、カレイ、ヒラメ その他: サバ、ボラ、ヘダイ アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 伊勢自動車道「玉城IC」からサニーロード経由で約40〜50分。 南伊勢町の中心部から少し西へ入った、静かな入り江にあります。駐車場は港のすぐそばにあり、荷物の積み下ろしも楽々です。\nまとめ：アットホームで通いたくなる渡船屋 \u0026nbsp; 光栄丸は、豪華な設備があるわけではありませんが、釣り人が「また来たい」と思えるような温かいサービスと、無理なく通える料金設定が魅力です。 ポイントカードを片手に、四季折々の南伊勢の海を楽しんでみてはいかがでしょうか？ 冬場に行く際は、ぜひカップラーメンと水（とお鍋）を持参して、最高の「筏ランチ」を体験してください！"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 38,
        href: "/mie/matsunase-fishing-park/",
        title: "【三重県】松名瀬フィッシングパーク｜ヒラメにマダイ！陸の上で...",
        description: "「船に乗るのは怖いけど、大きな魚を釣ってみたい」 「足腰に不安があるけど、久しぶりに釣りをしたい」",
        
        
        content: "「船に乗るのは怖いけど、大きな魚を釣ってみたい」 「足腰に不安があるけど、久しぶりに釣りをしたい」\nそんな願いを叶えてくれるのが、三重県松阪市にある**「松名瀬（まつなせ）フィッシングパーク」**です。\nここは、なんと陸の上に作られた海水池。 足場は完全にフラットでコンクリート整備されており、車椅子の方もそのまま水際まで移動できる完全バリアフリー環境です。それでいて、池の中にはヒラメ、マダイ、ハマチといった海の高級魚が泳ぎ回っています。\n「船酔いなし」「足場の心配なし」「トイレ完備」という安心感の中で、強烈な海の魚の引きを味わえる、全国でも珍しいハイブリッドな釣り体験を提供しています。\n松名瀬フィッシングパークの基本情報 \u0026nbsp; 項目 詳細 施設名 松名瀬フィッシングパーク 住所 〒515-0102 三重県松阪市松名瀬町1423 電話番号 0598-59-1677（予約受付〜20:00） 営業時間 8:00〜16:00 定休日 不定休（荒天時休業あり） 料金 1日券：11,000円 / 半日券（4時間）：7,000円 / 女性・子供：9,000円（1日） 貸切 人数により応相談（ファミリーパックなどあり） レンタル 竿・リールセット（仕掛け付）：2,000円〜 設備 水洗トイレ、休憩所、バリアフリー対応、駐車場完備 公式サイト 松名瀬フィッシングパーク 公式サイト 施設の特徴 \u0026nbsp; 究極の安全性: 陸上にあるため、波がなく、絶対に船酔いしません。小さなお子様連れでも柵があり安心です。 高級魚ラインナップ: 特にヒラメの放流に力を入れており、「座布団サイズ」が釣れることも。 完全予約制: 混雑しすぎず、ゆったりと自分のスペースで釣りが楽しめます（前日20時までに要予約）。 こんな人に最適！ \u0026nbsp; 海釣りが初めてのファミリー: 危険が少なく、トイレも綺麗なので、公園感覚で本格的な釣りに挑戦できます。 シニア・車椅子ユーザー: 段差のないフラットな足場で、移動の負担なく釣りを楽しめます。 ヒラメ狙いのアングラー: 陸から安全に高級魚ヒラメを狙って釣れる場所は非常に貴重です。 松名瀬フィッシングパークの攻略法 \u0026nbsp; 陸上の池ならではのクセを掴むことが重要です。\n1. タナ（水深）は底ベッタリが基本 \u0026nbsp; ヒラメやマダイは底に居着いています。ウキ下を調整して、エサが底を這うようにセッティングしましょう。スタッフにその日の水深を聞くのが確実です。\n2. 生き餌でスイッチを入れる \u0026nbsp; ヒラメや青物を狙うなら、元気な活きアジやウグイなどの「泳がせ釣り」が最強です。現地で販売されている生き餌を使用し、弱ったらすぐに交換する「鮮度」が釣果を分けます。\n3. 足元も侮れない \u0026nbsp; 池の壁際（ヘチ）は魚の通り道。遠投するだけでなく、足元に静かにエサを落としておくと、思わぬ大物が食いついてくることがあります。\n釣れる魚種と時期 \u0026nbsp; メイン: マダイ、ヒラメ 青物: ハマチ（ブリ）、カンパチ その他: シマアジ、イサキ、マハタ、クロソイ（冬季） ※季節により放流魚種が変わります。 アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 伊勢自動車道「松阪IC」から約25〜30分。 松阪市街地を抜け、海沿いの県道706号線へ。アクセスが良いので、帰りに松阪市内で最高級の「松阪牛」を食べて帰る…なんて贅沢なプランも可能です。\nまとめ：陸の上で味わう、海のロマン \u0026nbsp; 松名瀬フィッシングパークは、「海釣りへのハードル」を極限まで下げてくれた施設です。 「海は怖い」「準備が大変」と諦めていた方でも、ここなら手ぶらで、スニーカーのまま、最高級の魚とファイトできます。 今週末は、陸の上で安全に、海のロマンを釣り上げてみませんか？"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 39,
        href: "/mie/ousatsu-sea-fishing-center/",
        title: "【三重県】相差海釣センター｜1万円以下！鳥羽随一のコスパと安...",
        description: "「釣り堀に行きたいけど、1万円以上はちょっと高い…」 「もし1匹も釣れなかったら、お金の無駄になりそう」",
        
        
        content: "「釣り堀に行きたいけど、1万円以上はちょっと高い…」 「もし1匹も釣れなかったら、お金の無駄になりそう」\nそんな不安を一発で解消してくれるのが、鳥羽市相差（おうさつ）町にある**「相差海釣センター」**です。\nここの最大の特徴は、なんといっても**「4時間 5,500円」という破格の料金設定**。 一般的な釣り堀の半額以下で遊べるうえに、万が一釣果がゼロでも**マダイ1匹を必ずプレゼントしてくれる「ボウズ保証」**まで付いています。\n海女（あま）とパワースポットの町・相差で、お財布を気にせず気軽に海釣りデビューしてみませんか？\n相差海釣センターの基本情報 \u0026nbsp; 項目 詳細 施設名 相差海釣センター（おうさつ） 住所 〒517-0032 三重県鳥羽市相差町1361（受付） 電話番号 0599-33-6789（予約受付 8:00〜20:00） 営業時間 【午前の部】7:00〜11:00 【午後の部】11:30〜15:30（季節により変動あり） 定休日 無休（荒天時は休業） 料金 スタンダードコース（4時間）: 5,500円\nロングコース（8時間）: 11,000円 貸切 詳細はお問い合わせください レンタル 竿・リールセット（仕掛け別）：1,500円 設備 トイレ、駐車場、休憩所 公式サイト 相差海釣センター 公式サイト 施設の特徴 \u0026nbsp; 圧倒的コスパ: 4時間5,500円は県内最安クラス。浮いたお金で豪華な海鮮ランチが食べられます。 絶対もらえる安心感: 釣れなくてもお土産（マダイ）確保。クーラーボックスが空っぽで帰ることはありません。 「石神さん」の近く: 女性の願いを一つだけ叶えてくれるという有名な「神明神社（石神さん）」まで車ですぐ。観光との相性も抜群です。 こんな人に最適！ \u0026nbsp; 釣り堀デビューの方: 「高いお金を払って釣れなかったら…」というプレッシャーから解放されます。 カップル・夫婦: 2人で遊んでも約1万円。浮いた予算で相差の温泉旅館に泊まるプランもおすすめ。 スケジュール重視: 4時間コースなら「午前中は釣り、午後は伊勢神宮」といった欲張りな日程も組めます。 相差海釣センターの攻略法 \u0026nbsp; 短時間で効率よく釣るためのポイントです。\n1. 「際（キワ）」を攻めるベし \u0026nbsp; 相差の魚は、イケスの網際（キワ）に隠れていることが多いです。真ん中だけでなく、足元や角を丹念に探りましょう。\n2. エサは「黄色」が効く？ \u0026nbsp; 常連さんの間では、黄色の練りエサ（ダンゴ）や、黄色く着色したササミが実績高め。ローテーションの一角にぜひ。\n3. 朝マヅメを逃さない \u0026nbsp; 4時間コースなら、魚の活性が高い「午前の部（7:00〜）」が断然おすすめ。開始直後の1時間が勝負です。\n釣れる魚種と時期 \u0026nbsp; メイン: マダイ 青物: ワラサ（メジロ）、ハマチ、カンパチ その他: ヒラメ、イサキ、シマアジ（季節により変動） アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 伊勢二見鳥羽ライン「鳥羽南・白木IC」から約20分。 パールロード出口から相差方面へ。道中は海沿いの絶景ドライブが楽しめます。\nまとめ：観光プランの「＋α」に最高 \u0026nbsp; 相差海釣センターは、ガチガチの釣り場というよりは、**「観光のついでに本格的な釣りも楽しめる場所」**という使い方が一番しっくりきます。 午前中は海で魚と格闘し、お昼は現地の海女小屋で新鮮な魚介を焼き、午後は石神さんでパワーチャージ。 そんな充実した「鳥羽・相差満喫プラン」の中心に、ぜひこの釣り堀を組み込んでみてください。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 40,
        href: "/mie/fishing-park-sasukeya/",
        title: "【三重県】釣り公園佐助屋｜2時間4,000円〜！伊勢志摩で一...",
        description: "「釣り堀でマダイを釣りたいけど、丸一日は体力が持つか不安…」 「家族で行くから、予算を抑えつつ楽しみたい」 「いやいや、朝から晩までガッツリ大物と勝負したい！」",
        
        
        content: "「釣り堀でマダイを釣りたいけど、丸一日は体力が持つか不安…」 「家族で行くから、予算を抑えつつ楽しみたい」 「いやいや、朝から晩までガッツリ大物と勝負したい！」\nそんなあらゆるワガママに答えてくれるのが、南伊勢町にある**「釣り公園佐助屋」**です。\nここは「海上釣り堀」と「外釣り（自然の海釣り）」がセットになった巨大な複合マリンパーク。 特筆すべきは、圧倒的なプランの多さです。 「2時間だけサクッと遊ぶ」ショートコースから、「大放流日にガチで挑む」ベテラン向けコースまで、自分のスタイルに合わせて遊び方を選べるのが最大の魅力。\n伊勢志摩の豊かな海で、あなたにぴったりの釣り体験を見つけませんか？\n佐助屋（さすけや）の基本情報 \u0026nbsp; 項目 詳細 施設名 釣り公園佐助屋（さすけや） 住所 〒516-0116 三重県度会郡南伊勢町迫間浦 電話番号 0599-64-3118 営業時間 【4月～10月】6:30～17:30\n【11月～3月】7:00～16:30 定休日 不定休（元旦は休業） 主な料金 ショート（2時間）: 4,000円\nメガ佐助屋（高級魚狙い）: 11,000円～ 設備 トイレ、駐車場、休憩所、外釣りエリア ネット予約 じゃらんnetなどで予約可能 公式サイト 釣り公園佐助屋 公式サイト 佐助屋のここがすごい！ \u0026nbsp; 「佐助屋DAY」の爆発力: 毎月3日（さすけ）と23日（ふみ）は、魚を大量に放流する感謝デー！普段より大物が釣れる確率がグンと上がります。 選べる「松竹梅」プラン: ちょい釣り: 2時間コース（4,000円）で観光ついでに。 一般コース: 半日〜1日楽しむ標準プラン。 メガ放流: ブランド魚「メガ真鯛」などを狙う高級コース。 外釣りエリアも充実: 釣り堀の外側（自然の海）でアジやアオリイカを狙うことも可能。こちらはもっとリーズナブルです。 スタイル別：おすすめプラン \u0026nbsp; 【初心者・観光客】ショートコース \u0026nbsp; 料金: 4,000円（2時間） 内容: マダイ2匹までお持ち帰りOK。道具レンタル付き（有料）の手ぶらプランもあり。 メリット: 「ちょっとやってみたい」に最適。飽きやすいお子様連れでも安心です。 【中級・上級者】通常コース \u0026amp; 佐助屋DAY \u0026nbsp; 料金: 10,000円前後（プランによる） 内容: 釣った魚はすべて持ち帰りOK。ブリやカンパチなどの青物も狙えます。 メリット: 制限時間をフルに使って、クーラー満タンを目指せます。 佐助屋の攻略法 \u0026nbsp; 複雑なリセットや放流タイムを味方につけるのがコツです。\n1. 佐助屋DAY（3日・23日）を狙い撃て \u0026nbsp; この日は間違いなく魚影が濃いです。予約が埋まりやすいので、早めの確保を推奨します。\n2. 「外釣り」との二刀流 \u0026nbsp; 釣り堀で釣れない時間帯（潮止まりなど）は、気分転換に外釣りエリアでアジ釣りを楽しむ常連さんもいます。柔軟に動けるのがこの施設の強みです。\n3. スタッフに「タナ」を聞く \u0026nbsp; 佐助屋のスタッフは親切です。「今は底のほうだよ」などとアドバイスをくれるので、素直に従うのが大量への近道です。\n釣れる魚種と時期 \u0026nbsp; メイン: マダイ（特大サイズも！） 青物: ブリ、ワラサ、カンパチ 高級魚: シマアジ、ハタマス（季節による） 外釣り: アジ、イワシ、アオリイカ、グレ アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 伊勢自動車道「玉城IC」からサニーロード経由で約30〜40分。 南伊勢町の中心部に近く、道も走りやすいルートです。\n注意点 \u0026nbsp; ナビによっては細い道を案内されることがあります。「迫間浦（はざまうら）」の看板を目指して進みましょう。\nまとめ：自分のペースで楽しめる「海のテーマパーク」 \u0026nbsp; 釣り公園佐助屋は、ガチ勢だけのものでも、初心者だけのものでもありません。 「今日は2時間だけ」「次の佐助屋DAYは本気でいく」 と、その時々の気分や予算に合わせて使い分けられる、非常に懐の深い施設です。\n一度行けば、その自由度の高さと、南伊勢の海の豊かさにきっとハマるはず。「次どのプランで行こうかな？」と考えるだけでワクワクしてきますよ！"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 41,
        href: "/mie/tsuribori-shotokumaru/",
        title: "【三重県】釣り堀 正徳丸｜ICから7分！高級魚・設備・アクセ...",
        description: "「釣り堀までは山道が長くて疲れる…」 「トイレが汚かったり、設備がボロいのは嫌だ」 「でも、魚はめちゃくちゃ良いやつが釣りたい！」",
        
        
        content: "「釣り堀までは山道が長くて疲れる…」 「トイレが汚かったり、設備がボロいのは嫌だ」 「でも、魚はめちゃくちゃ良いやつが釣りたい！」\nそんな欲張りなアングラーも納得させるハイスペックな釣り堀が、紀北町にある**「釣り堀 正徳丸（しょうとくまる）」**です。\n最大の武器は**「紀伊長島ICから車で7分」という奇跡的なアクセスの良さ。 さらに、マダイや青物はもちろん、幻の高級魚「クエ」や「イシダイ」まで放流する太っ腹ぶり。 ウォシュレット付きトイレや綺麗な休憩所も完備しており、「快適さ」と「釣りの質」を極めて高いレベルで両立**しています。\n三重県南部エリアで迷ったら、まずはココに行けば間違いありません。\n正徳丸（しょうとくまる）の基本情報 \u0026nbsp; 項目 詳細 施設名 釣り堀 正徳丸 住所 〒519-3204 三重県北牟婁郡紀北町東長島3043-27 電話番号 0597-47-5820（予約受付 8:00〜20:00） 営業時間 7:30〜13:30（季節により変動あり） 定休日 不定休（火曜・水曜など。要確認） 料金 一般（男性）: 12,500円\n女性: 10,500円\n子供: 5,500円 貸切 対応可能（人数・料金は要問い合わせ） 設備 水洗トイレ（ウォシュレット完備）、休憩所、ポット、自販機 公式サイト 釣り堀 正徳丸 公式サイト 正徳丸のここがすごい！ \u0026nbsp; 「クエ」が釣れるかも？: 通常の釣り堀ではまず見かけない「クエ（モロコ）」を放流している数少ない施設。一発逆転のロマンがあります。 女性・子供に優しい: 清潔なトイレはもちろん、女性・子供料金が明確に安く設定されているため、ファミリーでの利用がしやすいです。 アクセス革命: 高速を降りてすぐ。山道運転のストレスがなく、帰りの運転も楽々です。 こんな人に最適！ \u0026nbsp; 運転が苦手なパパ・ママ: ICからすぐなので、長時間の山道運転で子供が車酔い…なんて心配も無用です。 清潔感重視の方: 海上トイレも陸上トイレも綺麗に管理されています。デートでも安心。 高級魚ハンター: 「今日はクエ狙い一本！」というストイックな挑戦者にも応えてくれるポテンシャルがあります。 正徳丸の攻略法 \u0026nbsp; 高スペックな釣り堀だからこそ、基本と応用が大切です。\n1. 「クエ」はイケスの隅（角）にいる \u0026nbsp; もしクエを狙うなら、イケスの四隅の底ベタ（底ギリギリ）が定位置です。カツオのハラモやサンマの切り身など、匂いの強いエサでじっくり待ちましょう。\n2. タナ取りは正確に \u0026nbsp; スタッフさんが頻繁に見回りに来てくれるので、「今のタナは何メートル？」と聞くのが一番早いです。正徳丸のスタッフは親切で有名です。\n3. 放流タイムは「青物」ラッシュ \u0026nbsp; ブリやカンパチの放流直後は、活きアジ（現地購入可）で一気に勝負をかけましょう。この時間はまさに「お祭り」状態になります。\n釣れる魚種と時期 \u0026nbsp; メイン: マダイ（良型多し） 青物: ワラサ、ブリ、カンパチ レア: クエ、イシダイ、イシガキダイ、ヒラメ その他: シマアジ、イサキ アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 紀勢自動車道「紀伊長島IC」を降りて、信号を右折。国道42号を少し走ればもう到着です。 所要時間はICから約7分。名古屋から約1時間半〜2時間と、日帰り圏内です。\nまとめ：ストレスフリーで「大物」と遊ぶ \u0026nbsp; 正徳丸は、釣り堀にありがちな「汚い・遠い・怖い（スタッフが）」というネガティブ要素をすべて排除した、現代的なハイスペック釣り堀です。 快適な環境で、夢の巨大魚と格闘する。 そんな贅沢な休日を過ごしたいなら、迷わず正徳丸を予約してください。きっと「また来たい」と思えるはずです。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 42,
        href: "/mie/naize-fishing-center/",
        title: "【三重県】内瀬釣りセンター｜2つの港で攻略！紀州釣りからサビ...",
        description: "「今日はチヌをストイックにだんごで狙いたい」 「家族でアジを釣ってお土産にしたい」",
        
        
        content: "「今日はチヌをストイックにだんごで狙いたい」 「家族でアジを釣ってお土産にしたい」\nそんな異なるニーズ全てに応えてくれるのが、南伊勢の老舗**「内瀬（ないぜ）釣りセンター」**です。\n最大の特徴は、「内瀬（ないぜ）」と「下津（おりつ）」という2つの港を拠点にしていること。 それぞれ潮の当たり方や水深が異なるため、「今日は魚影の濃い下津で」「静かな内瀬でじっくり」といった使い分けが可能。まさに筏のデパートとも言えるバリエーションの豊かさで、クロダイ（チヌ）師からファミリーフィッシングまで、幅広い釣り人に選ばれ続けています。\n内瀬釣りセンターの基本情報 \u0026nbsp; 項目 詳細 施設名 内瀬釣りセンター 住所 〒516-0111 三重県度会郡南伊勢町内瀬 電話番号 090-3158-1110（予約受付〜20:00） 営業時間 夏期6:00〜17:00 / 冬期6:30〜16:30（季節変動あり） 定休日 不定休（公式サイトカレンダー確認） 料金 大人：4,000円 / 中学生・女性：3,500円 / 小学生：2,500円 レンタル 詳細確認要 集合場所 内瀬港または下津港（予約時に指定） 公式サイト 内瀬釣りセンター 公式サイト 施設の特徴 \u0026nbsp; 2つの出船拠点: 地形の異なる「内瀬」と「下津」を選べます。 内瀬: 湾奥で波が静か。チヌの魚影が濃い。 下津: 潮通しがよく、回遊魚や良型マダイも期待できる。 割安な料金設定: 大人4,000円とリーズナブル。女性・中学生・小学生料金もあり、家族連れに優しい。 多彩な釣法: 紀州釣り（ダンゴ釣り）、フカセ釣り、サビキ釣りなど、筏によって様々なスタイルに対応。 こんな人に最適！ \u0026nbsp; 戦略的に釣り場を選びたい方: 風向きや潮の状況で、より条件の良い港を選べます。 チヌ釣り師（ダンゴ・フカセ）: 数釣りの内瀬、型狙いの下津と、狙いに合わせたポイント選定が可能。 ファミリー・グループ: 波の穏やかな湾内の筏なら、船酔いの心配も少なく、お子様連れでも安心です（子供料金あり）。 内瀬釣りセンターの攻略法 \u0026nbsp; 2つのフィールドを使いこなすことが釣果への近道です。\n1. 予約時に希望を伝える \u0026nbsp; 電話予約の際、「何を釣りたいか」「どんな釣り方か」を船長に伝えましょう。「それなら下津の方がいいよ」「今は内瀬でアジがあがってるよ」など、的確なアドバイスをもらえます。これが最も重要です。\n2. 春〜夏はエサ取り対策を万全に \u0026nbsp; 魚影が濃いため、暖かい時期はアイゴやフグなどのエサ取りが活発です。\nサナギ、コーン: チヌ狙いの必須アイテム。 練り餌（ハードタイプ）: エサ持ちを重視。 これらをローテーションして本命のアタリを待ちましょう。 3. 朝イチの時合いを逃さない \u0026nbsp; 特に夏場は、朝一番の涼しい時間帯に良型が連発することがあります。準備を素早く済ませ、第一投目から集中して臨みましょう。\n釣れる魚種と時期 \u0026nbsp; メイン: クロダイ（チヌ） 人気ターゲット: マダイ、アジ、サバ、キス その他: カワハギ、ヒラメ、スズキ（シーバス）、アオリイカ アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 伊勢自動車道「玉城IC」からサニーロード経由で約40分。 国道260号線沿いに看板が出ています。「内瀬」と「下津」で集合場所が異なるため、前日に必ず地図アプリ等で場所をセットしておきましょう。\nまとめ：選べる楽しさ、釣れる喜び \u0026nbsp; 内瀬釣りセンターは、釣り人の**「選択肢」**を広げてくれる渡船店です。 今日は穏やかに数釣りを、次回は大物を狙って潮通しの良い場所へ。 通うたびに違う顔を見せてくれる南伊勢の海で、自分だけの「正解」を見つける筏釣りの奥深さを味わってください。"
      })
      .add(
      
      
      
      
      
      {
        id: 43,
        href: "/yamaguchi/shimonoseki-fishing-park/",
        title: "【山口県】下関フィッシングパーク｜家族で安心の海釣り施設完全ガイド",
        description: "山口県下関市の『下関フィッシングパーク』は、金網張りの桟橋で小さな子供も安全に楽しめる海釣り施設です。竿レンタル完備で手ぶら釣行もOK。アジのサビキ釣りから本格的なクロダイ・チヌ、メバル狙いまで幅広く対応。トイレや売店も完備でファミリーに最適。季節ごとの釣り物やアクセス情報、釣果を伸ばす攻略のコツまで完全網羅して紹介します。",
        
        
        content: "響灘の潮風を感じながら、足元に広がるのは魚影の濃い海。ここ「下関フィッシングパーク」は、子供たちの「釣れたー！」という歓声が響き渡る、まさにファミリーフィッシングの楽園です。\n「海釣り公園って、実際はあまり釣れないんじゃないの？」 「子供が桟橋から落ちたりしないか心配…」 「道具を持っていないし、何を準備すればいいかわからない」\nそんな不安をお持ちのお父さん、お母さん、ご安心ください。下関フィッシングパークは、釣り初心者のファミリーにこそおすすめしたい「釣れる・安全・快適」の三拍子が揃った施設です。\n今回は、その理由とここだけでしか教えない攻略のコツを余すところなくお伝えします。\n下関フィッシングパークが選ばれる3つの理由 \u0026nbsp; ポイント1：【圧倒的な安全性】金網張りの桟橋で子供も安心 最大の特徴は、足元が全面金網張りでガードされていること。小さなお子様が海に転落するリスクが極めて低く、親御さんも安心して釣りに集中できます。\nポイント2：【手ぶらでOK】充実のレンタルとリーズナブルな料金 竿や仕掛けのレンタル（有料）はもちろん、エサや氷も現地で調達可能。道具を持っていなくても、思い立ったらすぐに本格的な海釣りデビューが可能です。\nポイント3：【魚種の豊富さ】黒潮の恩恵でアジから大物まで 響灘は黒潮の恩恵を受ける豊かな海域。初心者向けのサビキ釣りでアジやサヨリが狙えるのはもちろん、ベテランも唸るクロダイやシーバス、冬場の根魚など、季節ごとに多彩なターゲットが回遊してきます。\n下関フィッシングパークの基本情報 \u0026nbsp; 項目 内容 施設名 下関フィッシングパーク 住所 〒759-6521 山口県下関市吉見古宿町10-1 営業時間 4月: 6:00～19:00 / 5月～10月: 5:00～20:00 / 11月: 6:00～18:00 / 12月～3月: 7:00～17:00 定休日 火曜日、年末年始、悪天候時 予約 不要 平均予算 1,000円～2,500円程度（釣り料+レンタル料） アクセス JR山陰本線「吉見駅」から徒歩約15分、下関ICより車で約40分 料金プラン \u0026nbsp; 利用時間に応じた無駄のない料金設定が魅力です。\n基本釣り料（4時間まで）\n区分 料金 一般 830円 小・中学生 410円 1日釣り券\n区分 料金 一般 1,250円 小・中学生 620円 小学生未満 無料 ※延長料金（1時間）：一般210円、小・中学生100円 ※見学料：一般210円、小・中学生100円\n設備・レギュレーション \u0026nbsp; トイレ: あり（清潔で長時間の滞在でも安心） レンタル: サビキ仕掛け付貸竿: 1,000円 仕掛け無し貸竿: 700円 ライフジャケット: 無料（子供用あり） エサ: サビキ用コマセ等の販売あり 釣り方制限: 禁止: 投げ釣り、ルアー、ワーム、3本以上の釣り糸使用 制限: 竿の使用は1人2本まで 義務: 小学生以下は大人の同伴とライフジャケット着用必須 アクセス・駐車場 \u0026nbsp; 車でのアクセス\n下関市街から: 国道191号線を北上し約30分（約20km）。 高速道路から: 下関ICより国道491号線・191号線経由で約40分。 駐車場: 無料（約65台収容可能）。 公共交通機関\n電車: JR山陰本線「吉見駅」から徒歩約15分。 バス: サンデン交通バス「吉見・特牛」行き、「吉見」バス停下車徒歩約15分。 ※手ぶら釣行であれば電車釣行も十分可能です。\n【実釣レポート】プロが教える攻略のヒント \u0026nbsp; 家族連れで賑わう海釣り施設ですが、実は潮通しが良く、狙い方さえ間違わなければ好釣果が期待できる一級ポイントです。ここでは、他の釣り人に差をつけるための「現場のリアルな攻略法」を伝授します。\nターゲット別攻略法 \u0026nbsp; 1. 初心者・ファミリー向け：サビキでアジ爆釣パターン \u0026nbsp; 狙い方: 足元でOK。 コツ: コマセ（撒き餌）を絶やさないことが重要です。特に朝マズメ・夕マズメの時間帯は、手返しよく仕掛けを投入しましょう。 タナ（水深）: 基本は底付近ですが、活性が高いときは中層まで浮いてきます。周りが釣れている深さに合わせるのが鉄則です。 2. 中級者向け：胴付きで根魚（カサゴ・メバル） \u0026nbsp; 狙い方: 桟橋の橋脚周りや、陰になっている部分。 コツ: ルアー禁止のため、エサ釣りのみです。イソメやオキアミを使い、底をトントンと叩くように誘います。特に冬～春（12月～3月）がアツい！ 注意: 根掛かりしやすいので、予備の仕掛けは多めに。 3. 上級者向け：団子釣りでクロダイ（チヌ） \u0026nbsp; 狙い方: 竿を立ててアタリを待つスタイル。 コツ: エサ取り（小魚）が多い時期は、練りエサやコーンで対策を。金網越しのやり取りになるので、大物がかかった際はタモ入れを慎重に。 季節と時間帯の選び方 \u0026nbsp; 「いつ行くか」で釣果の8割が決まると言っても過言ではありません。\n春（4月～5月）: アジ・メバル狙いなら朝6時～昼がおすすめ。 夏（6月～8月）: 暑さを避けた早朝5時または夕方。シーバスの回遊も期待大。 秋（9月～11月）: 釣りのベストシーズン。日中でもクロダイや青物（ヤズ）が狙えます。 冬（12月～3月）: 釣り人が減る穴場時期。日中の暖かい時間帯にメバルなどの根魚をじっくり狙うのが通の楽しみ方。 現場で気づいた注意点【ここ重要！】 \u0026nbsp; 公式サイトには書かれていない、現場ならではの「気づき」をシェアします。\n「座布団」か「レジャーシート」は必須 桟橋の床は「金網」です。長時間立っていると疲れますし、直に座るとお尻が痛くなります。また、小さな道具（針やオモリ）を落とすと海へ直行…なんて悲劇も防げます。\n偏光グラスがあると世界が変わる 足元が見える桟橋なので、魚の姿が見えることも。偏光グラスがあれば、魚の反応を見ながらサイトフィッシングが楽しめます。\nライフジャケットは必ず着用 無料レンタルがありますが、サイズが合わない場合も想定し、お子様用は使い慣れたものを持参すると安心です。\nまとめ：下関フィッシングパークをおすすめしたい人 \u0026nbsp; 下関フィッシングパークは、単なる観光釣り堀ではなく、本格的な海釣りの醍醐味を安全に味わえる貴重なフィールドです。\n「子供に初めて魚を釣らせてあげたい」 「久しぶりに海釣りを楽しみたいけれど、磯やテトラは怖い」\nそんな方にこそ、ぜひ訪れてほしい場所です。最初はレンタル竿でのんびりアジ釣りから始めて、慣れてきたらマイタックルでクロダイとの駆け引きを楽しむ。そんなステップアップもこの施設なら可能です。\nさあ、次の週末は家族みんなでクーラーボックスを持って、下関の海へ出かけてみませんか？きっと、忘れられない「強い引き」と「笑顔」があなたを待っています。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 44,
        href: "/kagoshima/amami-sealand/",
        title: "【鹿児島県】奄美シーランド｜世界自然遺産の海で手ぶら船釣り！...",
        description: "世界自然遺産・奄美大島の美しい海で、本格的な船釣りが手ぶらで楽しめる「奄美シーランド」。竿・エサ・指導料込みで90分12,000円から。初心者でもマダイやカンパチなどの高級魚が狙えます。観光の合間に楽しめる最高の思い出作りを徹底ガイド。",
        
        
        content: "世界自然遺産に登録された奇跡の島、奄美大島。 その透き通るような「アマミブルー」の海で、誰でも気軽に船長体験ができるのが**「奄美シーランド」**です。\n通常、船釣り（オフショアフィッシング）といえば「道具が高い」「敷居が高い」「半日は潰れる」といったイメージがありますが、ここは違います。\n「完全手ぶらOK」「90分コースあり」「丁寧なレクチャー付き」 観光の合間に、まるでカフェに立ち寄るような感覚で、マダイやカンパチといった高級魚釣りに挑戦できる。そんな魔法のようなマリンレジャー施設をご紹介します。\n奄美シーランドの基本情報 \u0026nbsp; 40代女性「★★★★☆｜4.0」 \u0026nbsp; 家族旅行で利用しました。子供料金もあり、子供でも安全に楽しめるよう配慮してくれました。ドローン撮影サービスも利用して、素晴らしい動画が撮れました。奄美の自然を満喫できる贅沢な体験でした。\n50代男性「★★★★★｜5.0」 \u0026nbsp; 本土では味わえない南国の船釣りを体験できました。透明度の高い海で、見たことのない魚種も釣れて大興奮。料金に見合った価値は十分にあります。また奄美に来た時は必ず利用したいです。\n20代カップル「★★★★☆｜4.0」 \u0026nbsp; 恋人との奄美旅行で利用しました。二人とも釣り初心者でしたが、スタッフの方が親切で、楽しく体験できました。奄美の海をバックにした写真もたくさん撮れて、SNS映えも抜群でした。\n60代男性「★★★☆☆｜3.0」 \u0026nbsp; 料金は少し高めに感じましたが、奄美大島という特別な場所での体験と考えれば妥当かもしれません。器材もしっかりしていて、安全面での配慮も十分でした。ただし、天候に左右されやすいので、日程に余裕を持って計画することをおすすめします。\n多少料金が高めという意見もありますが、奄美大島という世界自然遺産での特別な体験、完全手ぶらでの船釣り体験という価値を考慮すれば、多くの方が満足されている施設です。\n【まとめ】奄美シーランドをおすすめしたい理由 \u0026nbsp; 施設の魅力と特徴 \u0026nbsp; 奄美シーランドは、世界自然遺産に登録された奄美大島で、完全手ぶらの船釣り体験ができる唯一無二の施設です。90分12,000円からという料金設定は、器材レンタル・指導・安全管理がすべて含まれていることを考慮すれば、非常に価値の高いサービスといえます。\n特に注目すべきは、釣り体験だけでなく、マリンアクティビティやドローン撮影サービスなど、奄美大島の自然を多角的に楽しめる総合的なマリンレジャー施設である点です。\n最適な利用シーン \u0026nbsp; 奄美大島への観光旅行の特別な体験として最適です。特に以下のような方におすすめです：\n釣り初心者で、安全に指導を受けながら船釣りを体験したい方 奄美大島の自然を満喫する特別な思い出を作りたいカップルや家族 本土では体験できない南国の魚種を狙いたい釣り愛好家 SNS映えする体験を求める若年層 また、企業の慰安旅行や特別なイベントでの利用にも適しており、参加者全員が等しく楽しめる環境が整っています。\n注意点とアドバイス \u0026nbsp; 奄美大島という離島での体験のため、天候の影響を受けやすいことを理解し、スケジュールには余裕を持って計画してください。完全予約制のため、早めの予約が必須です。\nまた、船釣り体験は体力を使うアクティビティでもあるため、体調管理にも注意が必要です。日焼け対策や水分補給の準備も忘れずに行ってください。\nおすすめ度★★★★☆｜4.0 \u0026nbsp; 奄美大島という特別な立地での船釣り体験として、サービス品質・安全性・体験価値すべてにおいて高い評価ができる施設です。料金はやや高めですが、世界自然遺産での完全サポート付き船釣り体験という価値を考慮すれば適正といえます。奄美大島への旅行を計画されている方には、ぜひ一度体験していただきたい特別なアクティビティです。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 45,
        href: "/kagoshima/kamoike-sea-fishing-park/",
        title: "【鹿児島県】鴨池海づり公園｜水深25mの本格派！大人600円...",
        description: "鹿児島市街地から車ですぐ。 錦江湾（鹿児島湾）に突き出た「鴨池海づり公園」は、普通の釣り公園とは一味違います。",
        
        
        content: "鹿児島市街地から車ですぐ。 錦江湾（鹿児島湾）に突き出た**「鴨池海づり公園」**は、普通の釣り公園とは一味違います。\n最大の特徴は、**「足元の水深が20m〜25mもある」**こと。 これは通常の漁港（5m〜10m）の倍以上。船釣りの領域に近い深さです。\nこの深さと、錦江湾特有の速い潮流のおかげで、岸からでもマダイやカンパチ、イシダイといった、本来なら船で沖に出ないと釣れないような大型魚が回遊してきます。 しかも料金は大人4時間600円。 「安近短」で「大物」が狙える、夢のようなフィールドの攻略法をお伝えします。\n鴨池海づり公園の基本情報 \u0026nbsp; 30代女性「★★★★☆｜4.0」 \u0026nbsp; 家族で利用しました。子供料金が200円と格安で、貸竿もあるので手ぶらで行けるのが助かります。スタッフの方も親切で、初心者の私たちにも丁寧に教えてくれました。\n50代男性「★★★★★｜5.0」 \u0026nbsp; 年中無休なのがありがたい。仕事の都合で不規則な休みでも利用できます。カンパチが釣れた時は興奮しました。コスパは全国一じゃないでしょうか。\n20代男性「★★★★☆｜4.0」 \u0026nbsp; 深場釣りが気軽にできる貴重な施設です。ただし、軽いタックルだと全く歯が立ちません。重いオモリが必須なので、初回は必ず貸竿を利用することをおすすめします。\n60代男性「★★★☆☆｜3.0」 \u0026nbsp; 料金は確かに安いですが、駅から少し距離があるのが難点。車でないとアクセスが少し不便です。ただし釣り場の環境は素晴らしく、深場で大型魚が狙えるのは魅力的です。\n車でのアクセスに不安を感じる方もいらっしゃいますが、鹿児島市街地からは比較的近く、レンタカーを利用すれば問題なくアクセスできます。また、公共交通機関とレンタル竿を組み合わせることで、手軽に深場釣りを楽しむことができます。\n【まとめ】鴨池海づり公園をおすすめしたい理由 \u0026nbsp; 施設の魅力と特徴 \u0026nbsp; 鴨池海づり公園は全国屈指のコストパフォーマンスを誇る海釣り施設です。大人わずか600円（4時間）という格安料金でありながら、水深20～25mの本格的な深場釣りを楽しむことができます。マダイやカンパチなどの高級魚も狙える環境でこの料金は、まさに破格といえるでしょう。\n年中無休の営業体制も大きな魅力で、急な休日でも安心して利用できます。貸竿（300円）やエサの販売もあり、初心者でも手ぶらで本格的な海釣りにチャレンジできる環境が整っています。\n最適な利用シーン \u0026nbsp; 鹿児島市街地から車で15分という好立地のため、観光ついでの利用にも最適です。特に家族連れには子供料金200円という破格の設定があり、家族全員で楽しんでも予算を抑えることができます。\n20名以上の団体割引もあるため、社員旅行や学生旅行での利用にもおすすめです。また、深場釣りという特殊な環境のため、経験豊富な釣り人にとっても新鮮な体験となるでしょう。\n注意点とアドバイス \u0026nbsp; 水深20～25mという深場環境のため、軽いタックルでは対応できません。釣具を持参する場合は、30号のオモリに対応できる竿とリールを用意してください。初心者や軽装備の方は、まず貸竿から始めることを強くおすすめします。\n投げ釣りと撒き餌が禁止されているため、胴付き仕掛けでの釣りがメインとなります。船釣り経験がある方は、そのノウハウを活かすことができるでしょう。\nおすすめ度★★★★★｜5.0 \u0026nbsp; 全国の海釣り施設と比較しても、料金・立地・釣り環境すべてにおいて非常に高い評価ができる施設です。特に九州南部での海釣りを考えている方、コストを抑えて本格的な釣りを楽しみたい方には最適な選択肢といえます。鹿児島観光の際は、ぜひ一度体験してみてください。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 46,
        href: "/kagoshima/sakurajima-sea-fishing-park/",
        title: "【鹿児島県】桜島海づり公園｜活火山を望む絶景釣り場！フェリー...",
        description: "鹿児島県のシンボル「桜島」にある唯一無二の海釣り公園。釣り料金は大人200円（貸竿込み・4時間）という衝撃の安さ。フェリーで渡るプチ旅行気分と、活火山を目の前にした絶景、そして鹿児島湾の豊かな魚影。観光と釣りを欲張りに楽しむプランを紹介。",
        
        
        content: "「活火山を目の前にして釣りをする」 世界中探しても、こんな体験ができる場所はそうそうありません。\n鹿児島県のシンボル・桜島の麓にある**「桜島海づり公園」**は、雄大な景観と圧倒的なコストパフォーマンスで知られる名物スポットです。\nその料金は、なんと大人200円（4時間）。しかもこの料金には**「貸竿（レンタルロッド）代」が含まれている**というから驚きです。 鹿児島市街からフェリーで約15分。300円ほどのプチ船旅の先に待っている、規格外の釣りパラダイスへご案内します。\n桜島海づり公園の基本情報 \u0026nbsp; 40代女性「★★★★☆｜4.0」 \u0026nbsp; 家族で桜島観光の際に利用しました。子供が初めての海釣りでしたが、ライフジャケットも無料で借りられて安心でした。景色を見ながらの釣りは贅沢な時間でした。アジがたくさん釣れて子供も大喜び。\n50代男性「★★★★★｜5.0」 \u0026nbsp; 全国の釣り場を回っていますが、ここは景色と料金のコスパが最強です。桜島をバックに釣りができるなんて、他では絶対に体験できません。カンパチが釣れた時は感動しました。\n20代女性「★★★★☆｜4.0」 \u0026nbsp; 彼氏と桜島デートで利用しました。釣り初心者でしたが、貸竿でサビキ釣りを教えてもらい、アジが釣れました。Instagram映えする写真もたくさん撮れて、思い出に残る一日でした。\n60代男性「★★★☆☆｜3.0」 \u0026nbsp; 料金は確かに安くて良いのですが、フェリーでのアクセスが少し面倒に感じました。ただし、桜島という特別な場所での釣りは一度は体験する価値があります。魚の種類も豊富で、釣り場としてのポテンシャルは高いです。\nフェリーアクセスを面倒に感じる方もいらっしゃいますが、多くの方は桜島観光とセットで楽しまれており、特別な体験として高く評価されています。\n【まとめ】桜島海づり公園をおすすめしたい理由 \u0026nbsp; 施設の魅力と特徴 \u0026nbsp; 桜島海づり公園は、日本全国でも類を見ない「活火山を眺めながら海釣りができる」という唯一無二の体験を提供しています。釣り料金わずか200円（4時間・貸竿込み）という破格の料金設定でありながら、マダイやカンパチなどの高級魚も狙える本格的な釣り環境が整っています。\nライフジャケットの無料貸出や、釣り料金に含まれる貸竿サービスなど、初心者や観光客への配慮も行き届いており、手ぶらでも安心して楽しめる点が大きな魅力です。\n最適な利用シーン \u0026nbsp; 桜島観光とセットでの利用が最も価値の高い楽しみ方です。フェリーでのアクセス自体が観光体験となり、桜島の雄大な自然を満喫しながら海釣りを楽しめます。\n家族連れにとっても、子供料金100円という設定と安全設備の充実により、安心して釣り体験をさせることができます。また、カップルや友人同士でのユニークなアクティビティとしても注目を集めています。\n注意点とアドバイス \u0026nbsp; 桜島側の宿泊施設は限られているため、宿泊を伴う場合は鹿児島市街地での宿泊をおすすめします。フェリーは24時間運航しているため、朝早い釣りでも問題ありません。\n投げ釣りと撒き餌が禁止されているため、サビキ釣りや胴付き仕掛けでの釣りに特化した準備を心がけてください。潮流の影響で15～20号のオモリが推奨されますが、レンタル竿なら適切なセッティングがされています。\nおすすめ度★★★★★｜5.0 \u0026nbsp; 全国の海釣り施設の中でも、景色・料金・アクセスの特別感すべてにおいて最高レベルの評価ができる施設です。特に観光要素を重視する方、特別な体験を求める方には絶対におすすめです。鹿児島・桜島観光の際は、ぜひこの唯一無二の釣り体験をお楽しみください。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 47,
        href: "/niigata/niigata-east-port-2nd-east-breakwater/",
        title: "【新潟県】新潟東港第2東防波堤管理釣り場｜サワラ・ブリが狙え...",
        description: "「陸から手軽に青物を釣りたい！」 「管理された安全な場所で、思いっきりルアーを投げたい」",
        
        
        content: "「陸から手軽に青物を釣りたい！」 「管理された安全な場所で、思いっきりルアーを投げたい」\nそんなルアーマンたちの熱い要望に応えるのが、新潟県聖籠（せいろう）町にある**「新潟東港第2東防波堤管理釣り場」**です。\nここは、本来立ち入り禁止の防波堤をNPO法人が管理し、釣り場として開放している貴重なスポット。 沖に突き出た防波堤は潮通しが抜群で、サゴシ（サワラの若魚）やイナダ（ブリの若魚）、シーバスの回遊ルートとなっています。 ライフジャケット着用義務があり、監視員も常駐しているため、初心者でも安心して「ガチの釣り」に挑戦できます。\n新潟東港第2東防波堤の基本情報 \u0026nbsp; 項目 詳細 施設名 新潟東港第2東防波堤管理釣り場 住所 〒957-0101 新潟県北蒲原郡聖籠町東港1丁目2862-11 営業期間 3月1日〜10月末日（※11月〜2月は冬季閉鎖） 営業時間 日の出〜日没（季節により変動・公式サイト要確認） 定休日 悪天候時は閉鎖 料金 大人（高校生以上）：1,500円 / 中学生：1,500円 / 小学生：750円 / シルバー（65歳以上）：1,500円 設備 駐車場、簡易トイレ、自販機、管理棟 公式サイト ハッピーフィッシング（新潟東港） ここがすごい！3つのポイント \u0026nbsp; 圧倒的な「青物」実績 春と秋のハイシーズンには、防波堤上がルアーマンで埋め尽くされるほど。サゴシやイナダのナブラ（魚群）が湧く光景は圧巻です。\n安全管理の徹底 **「ライフジャケット着用義務（桜マーク付き推奨）」**が徹底されています（レンタル500円あり）。柵はありませんが、海面までの高さがあまりないため、恐怖感は少なめです。\n開放感抜群のロケーション 沖に向かって伸びる防波堤で、日本海に沈む夕日を見ながらの釣りは格別。工業地帯の夜景も美しく、ロケーションだけでも行く価値があります。\nこんな人に最適！ \u0026nbsp; ショアジギング初心者: 「サーフ（砂浜）はポイントが分からない…」という人でも、ここは回遊があれば足元でも釣れます。 シーバスハンター: 居着きのシーバスも多く、テクトロや岸壁ジギングで大型が狙えます。 安全志向のアングラー: 常に管理スタッフがいる安心感は、単独釣行でも心強い味方です。 新潟東港の攻略法 \u0026nbsp; 1. 「朝マヅメ」に全集中 \u0026nbsp; 青物狙いなら、開門直後の**朝マヅメ（日の出前後）**が勝負です。 開門前から行列ができることも多いので、少し早めに到着して準備を整えましょう。\n2. メタルジグは「30g〜40g」が基準 \u0026nbsp; 基本は30g〜40gのメタルジグを使用します。 カラーは「ピンク系」「ブルー系」「ゼブラグロー」などが定番。春のサゴシ狙いなら、リーダー（糸の先端）を切られないように太めにするか、ワイヤーリーダーを用意しましょう。\n3. 足元の「サビキ」も見逃せない \u0026nbsp; ルアーだけでなく、サビキ釣りで良型のアジ（尺アジクラス）が釣れることもあります。青物の反応がない時は、サビキで手堅くお土産を確保するのも賢い戦略です。\n釣れる魚種と時期 \u0026nbsp; 春（3月〜5月）: サゴシ（数釣り）、サワラ、シーバス、メバル 夏（6月〜8月）: アジ（豆アジ〜中アジ）、カマス、キジハタ 秋（9月〜10月）: イナダ、サゴシ、アジ（良型）、アオリイカ 冬: （閉鎖期間） アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 新潟方面から: 日本海東北自動車道「聖籠新発田IC」より約20分。 駐車場: 無料駐車場完備。 公共交通機関 \u0026nbsp; 電車やバスでのアクセスは非常に困難です。レンタカーの利用を強くおすすめします。 まとめ：新潟で青物を釣るならまずはココ！ \u0026nbsp; 新潟東港第2東防波堤は、**「管理された安全な場所で、野生味あふれる青物釣り」**ができる貴重なフィールドです。\n「今日は釣れるかな？」 公式サイトで毎日の釣果情報が更新されているので、状況をチェックしてから出撃できるのも嬉しいポイント。 ロッドを一本持って、新潟の豊かな海を感じに行ってみてください！ （※冬季閉鎖にはくれぐれもご注意を！）"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 48,
        href: "/niigata/naoetsu-port-3rd-east-breakwater/",
        title: "【新潟県】直江津港第3東防波堤管理釣り場｜マダイ・クロダイの...",
        description: "「船に乗らなくても、大きなマダイを釣ってみたい…」 「家族を連れて行きたいけど、磯やテトラポットは危ないし…」",
        
        
        content: "「船に乗らなくても、大きなマダイを釣ってみたい…」 「家族を連れて行きたいけど、磯やテトラポットは危ないし…」\nそんな贅沢な悩みを解消するのが、新潟県上越市にある**「直江津港第3東防波堤管理釣り場」**です。\nここは全国的にも珍しい、**「マダイが狙える防波堤」**として知られる名フィールド。 沖合600メートル以上突き出た堤防は潮通しが良く、回遊魚から底物まで魚影の濃さは一級品。 NPO法人による徹底した安全管理と、Web予約システムによる混雑緩和で、安心して大物との真っ向勝負を楽しめます。\n直江津港第3東防波堤管理釣り場の基本情報 \u0026nbsp; 項目 詳細 施設名 直江津港第3東防波堤管理釣り場 住所 〒942-0027 新潟県上越市八千浦4 営業期間 3月1日〜10月末日（※11月〜2月は冬季閉鎖） 営業時間 日の出〜日没（公式サイトで要確認） 定休日 悪天候時は閉鎖 料金 大人（高校生以上）：1,500円 / 中学生：1,500円 / 小学生：750円 / シルバー（65歳以上）：1,500円 設備 駐車場、簡易トイレ、ライフジャケットレンタル（500円） 公式サイト ハッピーフィッシング（直江津港） ここがすごい！3つのポイント \u0026nbsp; 「陸からマダイ」の衝撃 春の乗っ込みシーズン（4月〜6月）を中心に、カゴ釣りやフカセ釣りでマダイの釣果が連日報告されます。時には70cm〜80cmクラスの「モンスター」も上がる、夢のある釣り場です。\nWeb予約で場所確保の不安なし 人気の釣り場ですが、事前にWebサイトから入場予約が可能です（※釣り座の指定は不可）。「早朝から並んだのに入れなかった」という悲劇を防げます。\n徹底された安全管理 監視員の巡回とライフジャケット着用義務により、安心して釣りに集中できます。柵はありませんが足場は良く、小学生の子供連れでも楽しめます。\nこんな人に最適！ \u0026nbsp; 大物ハンター: 船釣りレベルの魚を、陸っぱりの料金（1,500円）で狙いたい方。 フカセ釣り・カゴ釣り師: 潮通しが良いので、本格的な流し釣りの練習にも最適。 カップル・夫婦: トイレ完備で、足元も汚れないため、女性でも快適に過ごせます。 直江津港の攻略法 \u0026nbsp; 1. マダイ狙いは「カゴ釣り」で遠投 \u0026nbsp; マダイを本気で狙うなら、飛距離が出る**「遠投カゴ釣り」**が最強です。 タナ（深さ）は日によって変わりますが、底付近（竿2本〜3本分）を狙うのが基本。エサ取り（小魚）が多い時は、サナギやコーンを混ぜると効果的です。\n2. ルアーなら「ヒラメ」「青物」 \u0026nbsp; 足元の駆け上がりにはヒラメが潜んでいます。40g前後のメタルジグや、座布団ヒラメ狙いのワームで底を丁寧に探りましょう。 秋にはイナダやサワラの回遊もあり、ナブラ撃ちも楽しめます。\n3. アジ狙いで「泳がせ釣り」 \u0026nbsp; サビキ釣りで良型のアジが釣れます。これをエサにして「泳がせ釣り」を仕掛けておくと、思わぬ大物（ブリやヒラメ）が食いつくことがあります。\n釣れる魚種と時期 \u0026nbsp; 春（3月〜5月）: マダイ（乗っ込み）、クロダイ、メバル、サワラ 夏（6月〜8月）: アジ、キジハタ、イナダ、タコ 秋（9月〜10月）: アオリイカ、マダイ、クロダイ、ヒラメ、青物 冬: （閉鎖期間） アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 上越ICから: 北陸自動車道「上越IC」または「上越高田IC」より約20分。 駐車場: 防波堤の付け根に広い駐車場があります。 公共交通機関 \u0026nbsp; 最寄り駅の「黒井駅」や「直江津駅」からも距離があります。タクシーまたはレンタカーが必須です。 まとめ：夢の「陸っぱりマダイ」に挑戦しよう \u0026nbsp; 直江津港第3東防波堤は、「手軽さ」と「大物の夢」が同居する稀有な釣り場です。\n強烈なマダイの引きを、防波堤で味わう興奮。 しっかり準備をして、安全ルールを守り、メモリアルフィッシュを釣り上げてください！ （※特にマダイ・青物狙いの方は、大きめのタモ網をお忘れなく！）"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 49,
        href: "/kanagawa/miura-kaiou/",
        title: "【神奈川県】みうら海王｜関東唯一の本格体験！船で渡る海上釣り...",
        description: "関東にお住まいの釣り人なら、一度は「関西のような本格的な海上釣り堀が近くにあればいいのに……」と思ったことがあるはずです。",
        
        
        content: "関東にお住まいの釣り人なら、一度は**「関西のような本格的な海上釣り堀が近くにあればいいのに……」**と思ったことがあるはずです。\nあるんです。神奈川県三浦市に。 「みうら海王」は、関東で唯一（※）といえる**「港から船でイケスに渡るタイプ」**の本格派海上釣り堀です。\n陸続きの釣り堀とは一味違う、海風を感じながらの爽快なロケーション。そして足元には、マダイや青物が乱舞する魚影の濃い海。 都心からわずか90分で味わえる、極上の釣り体験をご紹介します。\nみうら海王の基本情報 \u0026nbsp; 場所：〒238-0243 神奈川県三浦市三崎5-3-1（受付：うらり1階） 営業時間：8:00〜13:00（集合は7:00〜7:30厳守） 定休日：火曜日（祝日の場合は営業） 料金： 男性：16,500円 女性：13,200円 子供（小学生）：11,000円 釣れる魚：マダイ、シマアジ、ワラサ（ブリ）、カンパチ、ヒラマサ、イサキ、マハタ、クエなど ウェブサイト： みうら海王公式サイト 施設の特徴と魅力 \u0026nbsp; 1. 「船で渡る」という特別感 三崎港の産直センター「うらり」で受付を済ませ、専用の渡船で沖のイケスへ向かいます。この移動時間が「これから釣るぞ！」というテンションを最高潮に上げてくれます。\n2. 魚種がガチ仕様 放流されている魚は、関西の有名釣り堀にも引けを取りません。5kgオーバーの青物や、高級魚シマアジ、時にはクエなどの超高級魚も。引きの強さは本物です。\n3. マグロの町「三崎」を満喫 帰港後は「うらり」でマグロのお土産を買ったり、周辺の寿司屋でランチを楽しんだりと、観光要素も満点です。\nみうら海王のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; おすすめの仕掛けとタックル \u0026nbsp; 基本のマダイ・シマアジ狙い\n竿：3m〜3.5mの海上釣堀竿（オモリ負荷3号〜4号前後） リール：スピニング3000番〜4000番 道糸：PE3号〜4号、またはナイロン5号〜6号 エサ：ダンゴ（黄色系）、甘エビ、ササミ 青物（ブリ・カンパチ）一発狙い\n竿：青物対応の強靭なロッド（Hパワー以上） 青物コール（誰かが青物を掛けたら合図すること）が必須の釣り場です。一人が掛けると活性が上がるので、チャンスを逃さないようにしましょう。 エサ：活きアジ（現地購入可）、カツオのハラモ、イワシ 釣果を伸ばすコツ \u0026nbsp; タナ取りが命：水深が結構あります（約8m〜10m）。まずは「タナ取りオモリ」で底を正確に測り、そこから50cm〜1m切ったところを狙うのがセオリーです。 放流タイムを逃さない：みうら海王では数回の放流タイムがあります。放流直後は魚のスイッチが入るボーナスタイム。手返しよく釣りましょう。 角（コーナー）を攻める：魚はイケスの四隅に溜まりやすいです。特にネット際ギリギリに仕掛けを落とすと、居着きの賢い魚が食ってくることがあります。 みうら海王へのアクセス情報 \u0026nbsp; 電車・バスでのアクセス｜おすすめ！ \u0026nbsp; 京急久里浜線「三崎口駅」より、京急バス「三崎港」行き乗車（約15分）。 終点「三崎港」下車、徒歩すぐ。 都心（品川など）から乗り換えなしでアクセス可能。電車釣行派には非常に嬉しい立地です。 車でのアクセス \u0026nbsp; 横浜横須賀道路「衣笠IC」から三浦縦貫道路経由で約30分。 駐車場：「うらり」に隣接する有料駐車場を利用してください。 実際に利用したユーザーの声を抜粋 \u0026nbsp; 30代男性（都内在住）「★★★★☆｜4.0」 \u0026nbsp; 品川から電車で行けるのが最高。クーラーボックスだけ持って行けば、あとはレンタルでもなんとかなる。青物の引きは強烈すぎて、バス釣り用のロッドでは太刀打ちできなかった（笑）。次は専用竿を買って行きます。\n50代男性（ベテラン）「★★★★☆｜4.0」 \u0026nbsp; 関東では貴重な存在。料金は少し高いが、これだけの魚種を揃えているなら納得。スタッフが親切で、タモ入れも手伝ってくれた。帰りに三崎のマグロ丼を食べて帰るのがルーティンです。\n40代女性（カップル）「★★★☆☆｜3.0」 \u0026nbsp; 彼氏に連れられて行きました。トイレはイケスの上にあるので安心でした。ただ、冬場は海上の風が寒いので防寒対策は必須です！\n【まとめ】みうら海王をおすすめしたい度 ★★★★★ \u0026nbsp; 関東エリアで**「本当の海上釣り堀」**を体験したいなら、選択肢はここしかありません。\n船に乗り、海風を浴びながら、強力な引きの青物と対峙する。そんな非日常の冒険が、都心からすぐの場所で叶います。 週末は予約が埋まりやすいので、早めの計画をおすすめします。クーラーボックス満タンの夢を見て、三崎へ向かいましょう！"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 50,
        href: "/kanagawa/jogashima-js-fishing/",
        title: "【神奈川県】城ヶ島J’s Fishing｜船に乗らずに高級魚...",
        description: "「海上釣り堀で大物を釣ってみたい。でも、半日〜1日かかるのは長いし、料金も高い…」 そんな悩みを解決してくれる画期的な釣り堀が、風光明媚な観光地・城ヶ島にあります。",
        
        
        content: "「海上釣り堀で大物を釣ってみたい。でも、半日〜1日かかるのは長いし、料金も高い…」 そんな悩みを解決してくれる画期的な釣り堀が、風光明媚な観光地・城ヶ島にあります。\n**「城ヶ島J’s Fishing（ジェイズフィッシング）」は、船を使わず岸から歩いて行ける海上釣り堀です。 最大の特徴は「時間制」**であること。最短1時間から利用できるため、城ヶ島観光の合間に「ちょっとマダイ釣っていこうか？」なんて使い方が可能です。\n手軽だからと侮るなかれ。放流魚はマダイ、シマアジ、カンパチなどの超一級品ばかりです。\n城ヶ島J’s Fishingの基本情報 \u0026nbsp; 場所：〒238-0237 神奈川県三浦市三崎町城ヶ島650-70 営業時間：9:00〜16:00（季節により変動あり） 定休日：火曜日（祝日の場合は営業、翌振替休日） 料金（釣り放題コース）： 1時間：7,150円（入場料込） 2時間：10,450円（入場料込） 3時間：13,200円（入場料込） 体験コース（1時間）：4,950円（※魚種制限や買取制など条件要確認） 釣れる魚：マダイ、シマアジ、カンパチ、ワラサ、イサキ、ヒラメなど ウェブサイト： J’s Fishing公式サイト 施設の特徴と魅力 \u0026nbsp; 1. 船酔い知らずの「徒歩アクセス」 城ヶ島の岸壁から桟橋が架かっており、ここを歩いてイケスに向かいます。揺れが少なく、いつでも陸に戻れる安心感は、小さなお子様連れや船が苦手な方にとって最大のメリットです。\n2. 予定に合わせて選べる「時間制」 多くの海上釣り堀が「半日コース」や「1日コース」固定なのに対し、ここは1時間刻みで選べます。「観光のついでに」「子供の集中力が続く間だけ」といった柔軟な楽しみ方ができます。\n3. マダイのお土産保証 もしボウズ（0匹）だった場合でも、マダイ1匹〜（コースによる）のお土産プレゼントがあります。「何も釣れずに帰る」という悲劇がないので、初心者でも安心して挑戦できます。\n城ヶ島J’s Fishingのおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; おすすめの仕掛けとタックル \u0026nbsp; レンタルタックル（推奨）\nここは「手軽さ」が売りなので、レンタル竿（有料・無料プランあり要確認）を利用するのが一番楽です。仕掛けもエサも現地で揃います。 持ち込みの場合\n竿：3m前後の短めの海上釣堀竿、またはシーバスロッド等の流用も可。 リール：スピニング2500番〜3000番。 注意：竿の長さ制限（3.5m以内など）や、使用できるエサのルールが厳格な場合があります。必ず公式サイトや現地で確認してください。 釣果を伸ばすコツ \u0026nbsp; 足元のネット際がポイント：陸続きの桟橋タイプなので、魚はイケスの壁（ネット）にくっついていることが多いです。遠くに投げず、足元を静かに探ってみましょう。 朝イチが有利？：営業開始直後の朝の時間帯は、魚のお腹が空いていて活性が高いことが多いです。3時間コースでガッツリ釣るなら朝イチ予約がおすすめ。 スタッフに頼る：釣れないときはスタッフに相談しましょう。タナ（深さ）を教えてくれたり、アドバイスをくれたりします。 城ヶ島J’s Fishingへのアクセス情報 \u0026nbsp; 車でのアクセス｜おすすめ！ \u0026nbsp; 横浜横須賀道路「衣笠IC」から三浦縦貫道路経由で約40分。 城ヶ島大橋を渡り、城ヶ島に入ります。 駐車場：城ヶ島内の県営駐車場（有料）などを利用。釣り場まで徒歩圏内です。 電車・バスでのアクセス \u0026nbsp; 京急「三崎口駅」から京急バス「城ヶ島」行き乗車（約30分）。 「城ヶ島」バス停下車、徒歩約5分。 実際に利用したユーザーの声を抜粋 \u0026nbsp; 30代女性（ファミリー）「★★★★☆｜4.0」 \u0026nbsp; 子供の釣りデビューで利用しました。船に乗らなくていいのが本当に楽！2時間コースでしたが、スタッフさんが手伝ってくれて立派なマダイが釣れました。子供は大喜び。帰りに城ヶ島公園で遊んで帰りました。\n20代男性（グループ）「★★★☆☆｜3.0」 \u0026nbsp; 観光ついでに1時間コースで勝負。結果はシマアジ1匹でしたが、スリルがあって楽しかった。ただ、延長するとそこそこの値段になるので、最初から長めのコースにしたほうがコスパはいいかも。\n50代男性（ベテラン）「★★★★☆｜4.0」 \u0026nbsp; ロケーションが良い。富士山が見える日もある。ネットが浅めなので底取りがしやすく、根掛かりもしにくい。のんびり釣るには良い場所です。\n【まとめ】城ヶ島J’s Fishingをおすすめしたい度 ★★★★☆ \u0026nbsp; 城ヶ島J’s Fishingは、海上釣り堀の**「ハードルの高さ」を完全に取り払った**施設です。\n重い荷物も、船酔いの心配も、1日掛かりのスケジュールも不要。 身一つでふらっと立ち寄り、高級魚との真剣勝負を楽しめる。そんな「都会派のアクティビティ」として、三浦半島の観光プランにぜひ加えてみてください。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 51,
        href: "/aomori/asamushi-sea-fishing-park/",
        title: "【青森県】浅虫海釣り公園｜手軽な料金・四季の魚種・初心者も安...",
        description: "青森市内から車で約30分、浅虫温泉の近くに位置する「浅虫海釣り公園」は、東北の豊かな海の幸を手軽に釣り上げられる人気スポットです。",
        
        
        content: "青森市内から車で約30分、浅虫温泉の近くに位置する「浅虫海釣り公園」は、東北の豊かな海の幸を手軽に釣り上げられる人気スポットです。\n入園料わずか150円から利用できるリーズナブルさが魅力で、初心者から上級者まで楽しめる施設となっています。春から秋にかけて様々な魚種が入れ替わり楽しめるため、シーズンを通して訪れる価値があります。釣り竿のレンタルも用意されているので手ぶらでも気軽に釣りを始められるほか、安全面にも配慮された施設で、家族連れでも安心して海釣りの醍醐味を体験することができます。\n温泉地としても知られる浅虫エリアで、釣りと温泉の贅沢な組み合わせを満喫できる東北地方の隠れた釣りスポットです。\n浅虫海釣り公園の基本情報 \u0026nbsp; 場所: 青森県青森市浅虫蛍谷 営業時間: 9:00～17:00（4/29～9/30）、9:00～16:00（10/1～10/14） 営業期間: 4月29日～10月14日（令和6年度実績） 定休日: 毎週火曜日、浅虫温泉花火大会開催日（2024年は7月28日） 平均予算: 大人700円～1,200円程度（入園料+釣り台利用料+必要に応じて竿レンタル） レンタル: 釣り竿あり（500円） 釣具の持ち込み: 可能（竿は2本まで） 収容人数: 200人（同時収容） 保安施設: 浮輪・はしご・救命胴衣など完備 釣れる魚: 季節により変動（アイナメ、カレイ、メバル、クロダイ、アジ、サバなど） ウェブサイト: 青森市公式サイト - 浅虫海釣り公園 料金体系について \u0026nbsp; 浅虫海釣り公園は「入園料+釣り台利用料」の二段階制を採用しています。釣りをする場合は釣り台利用料に入園料が含まれているため、別途入園料を支払う必要はありません。\n釣った魚はすべて持ち帰ることができる「釣り放題」システムです。\n区分 大人 小人 入園料(個人) 150円 70円 入園料(団体) 120円 60円 つり台利用料 ※入園料含む 700円 500円 つり竿利用料 500円 500円 つり台利用回数券 （6枚綴り）※入園料含む 3,500円 2,500円 なるべく安く済ませたいなら、釣具の持ち込みがマストです。もし頻繁に利用するなら、つり台利用料1回分が無料になる回数券がお得です。大人の場合、通常700円×6回=4,200円のところ、3,500円で利用できます。\nでもこれらの選択肢は、釣具を持ってこれる余裕がない観光には向いてないのが難点ですね。\n注意事項と補足データ \u0026nbsp; 投げ釣りは周囲の安全を確認してから行ってください 持込み竿の使用は2本までに制限されています ゴミは指定のくずカゴに捨て、海洋環境保全にご協力ください 安全のため、飲酒して酔っている方の入場はお断りしています 10歳未満のお子さんは必ず保護者の付き添いが必要です 施設内では係員の指示に従ってください 特別サービスとして、以下の日程で入園料無料デーが設けられています：\n子どもの日（5月5日）と海の日（7月15日）：6歳以上16歳未満の入園料無料 敬老の日（9月16日）：60歳以上の入園料無料 また、「年間大物ランキング」が開催されており、優勝者には浅虫温泉宿泊補助券がプレゼントされます。大物を釣り上げた際には係員にお声がけください。\n浅虫海釣り公園のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 浅虫海釣り公園では、季節によって様々な魚種が釣れるのが魅力です。時期に合わせたタックル選びとコツをご紹介します。\n季節別の釣れる魚とおすすめタックル \u0026nbsp; 5~6月頃の魚種と釣り方\nこの時期はアイナメ（地元では「アブラメ」とも呼ばれる）、カレイ、ソイ、メバル、クロダイ、ウマズラハギ、イナダなどが釣れます。\nおすすめタックル：\n竿：2.5m～3.6mの磯竿または振出竿 道糸：3号前後のナイロンライン 仕掛け：胴付き仕掛けまたは投げ釣り仕掛け エサ：イソメ、アオイソメ、ジャリメ、オキアミ アイナメやメバルは根魚なので、岩場周辺の底付近を狙うと良いでしょう。クロダイ狙いなら、小さめのオキアミをエサに使い、朝夕の時間帯がおすすめです。\n7月～8月頃の魚種と釣り方\n夏はサヨリ、アジ、サバ、クロダイ、メバル、イナダ、シイラ、シーバスなどが釣れます。\nおすすめタックル：\n竿：3m～4mの磯竿または投げ竿 道糸：2～3号のナイロンラインまたはPEライン 仕掛け：サビキ仕掛け、ウキ釣り仕掛け エサ：イソメ、アミエビ、オキアミ、サビキならアミコマセ 夏はアジやサバが回遊してくるので、サビキ釣りが非常に有効です。特に朝夕の時間帯は魚の活性が高まります。暑い日中はサヨリ狙いもおすすめで、水面近くを泳ぐサヨリを狙うとよいでしょう。\n9月～10月頃の魚種と釣り方\n秋は再びアイナメ（アブラメ）、カレイ、ソイ、ウマヅラハギに加え、シマダイ、イナダ、サワラなどが釣れます。\nおすすめタックル：\n竿：3m～3.6mの磯竿 道糸：3～4号のナイロンライン 仕掛け：胴付き仕掛け、投げ釣り仕掛け エサ：イソメ、アオイソメ、オキアミ、青イソメ 秋は魚が脂がのって味も良くなる時期。特にアイナメは秋が旬で、この時期に大型が釣れることも。底付近を丁寧に探るように釣ると良いでしょう。\n初心者向けのコツ \u0026nbsp; 浅虫海釣り公園では釣り竿のレンタルも可能なので、初めての方も気軽に釣りを楽しめます。\n初めての方は係員に「今日はどんな魚が釣れていますか？」と聞くのがベスト。 レンタル竿を使う場合は、簡単な仕掛けのウキ釣りがおすすめです。\nエサはイソメが万能で、様々な魚種に対応可能。朝夕の時間帯は魚の活性が高いので、その時間を狙って訪れると釣果アップ！\n天候が急変することもあります。事前に天気予報を必ず確認し、にわか雨の可能性がある日は、雨具や防寒具などを用意しておきましょう。\n浅虫海釣り公園へのおすすめアクセス情報 \u0026nbsp; 浅虫海釣り公園は青森市中心部から約30分の場所にあり、アクセスも比較的便利です。\n車でのアクセス \u0026nbsp; 青森市内から：青森市街から国道4号線を八戸方面へ、浅虫方面へ分岐、約30分 八戸方面から：八戸自動車道～東北自動車道～青森東ICから約20分 弘前方面から：青森自動車道～青森中央ICから約40分 海釣り公園には駐車場が完備されていますが、特に夏場の週末や連休は込み合うことがあります。朝早めの来園をおすすめします。\n公共交通機関でのアクセス \u0026nbsp; JR東北本線 浅虫温泉駅から徒歩約15分 JR東北本線 青森駅からバス「浅虫温泉行き」で約40分、「浅虫温泉」バス停下車、徒歩約15分 注意: 浅虫温泉駅からの徒歩ルートは坂道があります。タクシーを利用される場合は、浅虫温泉駅前からタクシーで約5分です。\n遠方からのアクセス \u0026nbsp; 浅虫海釣り公園と浅虫温泉エリアを合わせて楽しむなら、以下のプランがおすすめです：\n前日に浅虫温泉の旅館・ホテルに宿泊 朝早くから海釣り公園で釣りを楽しむ 釣った魚は旅館で調理してもらうことも可能（事前に要確認） 釣りの後は温泉で疲れを癒す 一日釣りを楽しんだ後、浅虫温泉で温まるのは最高の組み合わせです。日帰り入浴もあるので、釣りを短い時間にして、後は温泉を楽しんでから帰るみたいな選択肢も取れますね。\n近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 観光を兼ねるなら青森駅がスタートになるので、レンタカーは青森駅前で用意するのがいいでしょう。\n【宿泊施設】\n【最安】旅館さつき：浅虫温泉駅から徒歩5分、7,000円〜 【平均】椿館：浅虫温泉街中心部、12,000円〜 【高級】南部屋・海扇閣：浅虫温泉の高台にある老舗旅館、18,000円〜 【レンタカー】\nトヨタレンタカー青森駅前店：JR青森駅から徒歩5分 ニッポンレンタカー青森営業所：JR青森駅から徒歩3分 実際に利用したユーザーの声を抜粋 \u0026nbsp; 「リーズナブルな料金で本格的な海釣りが体験できるのが魅力。子供も大喜びでした」（40代男性）\n「初めての釣りでしたが、係員の方が丁寧に教えてくれて、アジとメバルが釣れました！」（30代女性）\n「朝早くから訪れましたが、大きなアイナメが釣れて大満足。釣った後は浅虫温泉で疲れを癒しました」（50代男性）\n「設備が整っていて安心して釣りができました。特に救命具などの安全対策がしっかりしているのが良いですね」（60代男性）\n「毎年夏休みに子供と訪れています。年間大物ランキングを目指して頑張っていますが、なかなか入賞できず（笑）」（40代男性）\n【まとめ】浅虫海釣り公園をおすすめしたい度 ★★★★☆（4/5） \u0026nbsp; 浅虫海釣り公園は、初心者から家族連れまで幅広い層に人気のスポットです。特に魅力的なのは以下の点です：\nリーズナブルな料金設定（入園料わずか150円、釣り台利用料込みでも大人700円） 季節ごとに様々な魚種が楽しめる多様性 釣り竿のレンタルあり、手ぶらでも気軽に釣りが可能 安全設備が充実しており、初心者や家族連れでも安心 釣りの後は近くの浅虫温泉で温泉を楽しめる立地の良さ 一方で、営業期間が4月29日から10月14日までと限られていることや、平日火曜日が定休日である点は注意が必要です。また、釣り竿の持ち込みは2本までという制限もあります。\n訪問するベストシーズンは、夏休み期間外の5月下旬～6月中旬か、9月中旬～10月上旬がおすすめです。この時期は比較的混雑も少なく、ちょうど魚種も豊富な時期です。特に秋は魚が脂がのってくる時期なので、味の面でも満足度が高いでしょう。\n東北地方で手軽に海釣りを楽しみたい方、温泉と釣りの欲張りな旅を計画している方には、ぜひ訪れていただきたい施設です。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 52,
        href: "/shizuoka/ikadatsuri-tokai/",
        title: "【静岡県】いかだ釣りの東海｜初心者に最適・短時間で気軽に釣り...",
        description: "静岡県熱海市、網代港の穏やかな海に浮かぶ「いかだ釣りの東海」は、観光の合間にふらっと立ち寄れる手軽さが魅力の海上釣り堀です。",
        
        
        content: "静岡県熱海市、網代港の穏やかな海に浮かぶ「いかだ釣りの東海」は、観光の合間にふらっと立ち寄れる手軽さが魅力の海上釣り堀です。\n「温泉旅行のついでに少しだけ釣りがしたい」 「子供に初めての釣りを体験させてあげたい」 「道具を持っていないけど、本格的な海釣りをしてみたい」\nそんな願いを叶えてくれるのが、この施設。**「30分から遊べる時間制」**という珍しいシステムを採用しており、長時間の拘束がなく、自分のペースで楽しめます。竿もエサも無料でレンタルできるため、完全手ぶらでOK。\nマダイやシマアジといった高級魚の引きを手軽に味わえる、熱海観光の新しい定番スポット「いかだ釣りの東海」の魅力を徹底解説します。\nいかだ釣りの東海の基本情報 \u0026nbsp; 項目 詳細 施設名 いかだ釣りの東海 住所 〒413-0103 静岡県熱海市網代100-7（網代港内） 営業時間 7:00～15:00（最終受付14:00） 定休日 荒天時休業 料金 30分3,000円 / 1時間5,200円（詳細後述） レンタル 竿・エサ無料 釣れる魚 マダイ、アジ、シマアジ、イサキ、イシダイ、メジナなど アクセス JR伊東線「網代駅」から徒歩約10分 公式サイト 熱海ロイヤルタイムズ紹介ページなど 料金体系：短時間勝負ができる「時間制」 \u0026nbsp; いかだ釣りの東海の最大の特徴は、一般的な「一日コース」や「半日コース」ではなく、分刻みの時間制であることです。\n30分コース：3,000円 / 竿1本 ちょっと試しに釣ってみたい、観光のスキマ時間に遊びたい方に最適。 60分コース：5,200円 / 竿1本 じっくり大物を狙いたい、数釣りを楽しみた方におすすめ。 【嬉しいポイント】\n釣り放題・持ち帰り自由：時間内に釣れた魚はすべて持ち帰ることができます。追加料金は発生しません。 レンタル無料：竿とエサ（オキアミ）が料金に含まれているため、手ぶらでOKです。 団体割引：竿8本以上の利用で割引があるため、グループ旅行や社員旅行にも適しています。 じゃらんポイント対応：じゃらんnetからの予約でポイントが貯まります。 注意事項・補足 \u0026nbsp; 渡船での移動：港からイカダまでは渡船で移動します（数分程度）。船に乗る体験自体もアトラクションのようでワクワクします。 日除け対策：イカダの一部には屋根がありますが、基本的には屋外です。帽子や日焼け止め、夏場は十分な水分補給を心がけましょう。 調理サービス：釣った魚を近隣の提携食堂などで調理してもらえる場合があります（有料・要確認）。釣りたての魚を刺身や焼き魚で食べる贅沢は格別です。 いかだ釣りの東海で狙える魚と攻略法 \u0026nbsp; ここでは、初心者でも釣果を上げるためのコツと、主なターゲットの攻略法を紹介します。竿も仕掛けもレンタル品で十分戦えます。\n1. マダイ（真鯛） \u0026nbsp; 釣り堀の王様。赤い魚体が美しく、引きも強烈です。\n攻略のコツ： タナ（深さ）が重要：マダイは底付近にいることが多いです。スタッフに「今のタナはどれくらいですか？」と聞いて、ウキ下を調整してもらいましょう。 エサの動き：仕掛けを投入した後、じっと待つだけでなく、たまに竿をゆっくり上下させてエサを動かす（誘う）と、リアクションで食いついてくることがあります。 アワセ：ウキがスッと沈んでも焦らず、しっかりと海中に消し込んでから竿を立ててアワセましょう。 2. アジ（鯵） \u0026nbsp; ファミリーに大人気。数釣りが楽しめ、食べても絶品です。\n攻略のコツ： 中層狙い：マダイより少し浅めのタナ（中層）を回遊していることが多いです。 口切れ注意：アジは口が柔らかい魚です。強くアワセすぎたり、強引に巻き上げると口が切れて逃げられてしまいます。優しく一定の速度で巻き上げましょう。 手返しよく：群れで行動するため、1匹釣れたらすぐにエサを付け替えて投入すると、連発（入れ食い）が期待できます。 3. 高級魚（シマアジ・イシダイなど） \u0026nbsp; 運が良ければ、市場価値の高い高級魚も混ざります。\n攻略のコツ： シマアジ：引きが非常に強く、走り回ります。竿を立てて弾力を使い、糸を切られないように慎重にやり取りしましょう。 イシダイ：強烈な突っ込みを見せます。レンタルタックルの強度を信じて、竿尻を腰に当てて耐えましょう。 アクセス情報 \u0026nbsp; 都心からのアクセスも抜群によく、車なしでも行きやすいのが魅力です。\n電車でのアクセス（超おすすめ！） \u0026nbsp; JR伊東線**「網代駅」から徒歩約10分**という好立地です。\n東京方面から： 東海道新幹線または東海道線で「熱海駅」へ。 JR伊東線に乗り換え「網代駅」下車。 駅を出て海側へ坂を下り、港沿いに歩けば到着。 熱海駅からわずか数駅で到着するため、熱海観光のオプションとして非常に組み込みやすい場所です。\n車でのアクセス \u0026nbsp; ルート：小田原厚木道路「小田原西IC」より国道135号線を伊豆・熱海方面へ約1時間。または東名高速「沼津IC」より伊豆縦貫道経由で約1時間。 駐車場：網代港内に駐車スペースがあります（要確認）。 実際に利用したユーザーの声 \u0026nbsp; 30代男性（観光利用） 評価：★★★★★ 「熱海旅行の空き時間に寄りました。30分勝負でしたが、アジとマダイが釣れて大興奮。手ぶらで行けるのが本当に楽で、服も汚れずに済みました。釣った魚はその場の食堂でさばいてもらえました。」\n40代女性（ファミリー利用） 評価：★★★★★ 「子供の釣りデビューで利用。スタッフのおじさんが親切にタナを合わせてくれたおかげで、息子でもマダイが釣れました！1時間で十分楽しめて、子供も飽きずに過ごせました。」\n20代グループ（友人同士） 評価：★★★★☆ 「みんなでワイワイ競い合いました。意外と波があって船酔いしそうになったので、酔い止めを飲んでおけばよかったかも（笑）。でも大物が釣れた時の盛り上がりは最高です。」\nまとめ：いかだ釣りの東海はこんな人におすすめ！ \u0026nbsp; いかだ釣りの東海は、「手軽さ」と「本格的な引き」を両立した、観光特化型の海上釣り堀です。\n熱海・伊豆観光のついでに遊びたい人 30分〜1時間でサクッと釣りをしたい人 道具にお金をかけず、手ぶらで楽しみたい人 電車移動メインの旅行者 初心者や子供に「魚を釣る感動」を教えたい人 3,000円で高級魚マダイをゲットできるチャンスは、他にはないコストパフォーマンスと言えるでしょう。次の熱海旅行のスケジュールには、ぜひ「網代での30分フィッシング」を組み込んでみてください。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 53,
        href: "/shizuoka/fishing-park-toi/",
        title: "【静岡県】フィッシングパーク土肥｜リーズナブルな価格で初心者...",
        description: "静岡県伊豆市土肥にある「フィッシングパーク土肥」は、入場料1,500円で竿・エサ付きの手ぶら釣りが楽しめる施設です。確実に釣れるイケス釣り（買取制）と、釣ったら持ち帰り無料のイケス外釣りを自由に選べるのが特徴。駿河湾フェリーからのアクセスも良好な伊豆の人気スポットを解説します。",
        
        
        content: "静岡県伊豆市土肥にある「フィッシングパーク土肥」は、駿河湾の美しい景色を眺めながら手軽に海釣りを楽しめる人気スポットです。\n入場料1,500円には竿とエサが含まれているため、手ぶらで訪れても気軽に釣りを始められます。施設内にはイケスと開放水域があり、イケス内ではマダイやアジを確実に釣る体験ができる一方、イケス外では釣れた魚が無料という特典があります。初心者から経験者まで、それぞれの釣りスタイルに合わせて楽しめる柔軟性の高さが魅力です。\nまた、駿河湾フェリーを利用すれば清水港からのアクセスも可能で、海の上からの移動も旅の思い出になります。リーズナブルな価格設定と多彩な楽しみ方ができる、伊豆の海釣りスポットです。\nフィッシングパーク土肥の基本情報 \u0026nbsp; 項目 詳細 施設名 フィッシングパーク土肥 住所 〒410-3302 静岡県伊豆市土肥47 営業時間 9:00～16:00（最終受付15:00） 定休日 火曜日・荒天時臨時休業あり 料金 入場料 1,500円（竿・エサ代込み） 魚代（イケス内） 釣れた魚は1匹250円の追加料金（買取制） 魚代（イケス外） 釣れた魚は全て持ち帰り無料 レンタル 基本料金に竿とエサが含まれる 釣具の持ち込み 竿の持ち込み可能 釣れる魚 マダイ、アジなど アクセス 東名沼津ICより約70分、または清水港からフェリー約65分 公式サイト 土肥観光ガイド 料金体系について \u0026nbsp; フィッシングパーク土肥の料金体系は比較的シンプルですが、釣る場所によって費用が異なるユニークな仕組みになっています。\n基本料金： 入場料1,500円で、これには釣り竿とエサが含まれています。手ぶらで訪れても釣りを楽しむことができる手軽さが魅力です。 イケス内で釣れた魚： 施設内のイケスで釣れた魚は、1匹あたり250円の追加料金がかかります。確実に釣果を得たい初心者には、多少の追加料金を払ってでもイケス内で釣るメリットがあります。 イケス外で釣れた魚： 一方、イケス外の開放水域で釣れた魚は追加料金がかからず無料で持ち帰ることができます。そのため、入場料だけを払い、イケス外で釣りをする人も多くいます。釣りの腕に自信がある方や、チャレンジ精神旺盛な方にとっては、よりお得に楽しめるオプションとなっています。 この料金体系は、釣り初心者から上級者まで、それぞれの腕前や予算に合わせて選択できる柔軟性があり、幅広い層に支持されています。\n注意事項と補足データ \u0026nbsp; 釣った魚はクーラーボックスなどに入れて持ち帰ることができます。 釣り竿とエサは基本料金に含まれていますが、タモ網などの追加道具は持参するか、施設でレンタルするとよいでしょう。 筏上に屋根がないため、帽子や日焼け止めなどの暑さ対策が必要です。 雨天時も利用できますが、荒天時は安全のため臨時休業となる場合があります。 火曜日は定休日です。訪問前に営業日を確認することをおすすめします。 最終受付は15:00なので、十分な釣り時間を確保するためには早めの到着がおすすめです。 駐車場は近隣に複数ありますが、観光シーズンは混雑する場合があります。 イケス内とイケス外で釣れる魚の種類と追加料金が異なるため、予算に応じて釣り場所を選ぶことができます。 施設内には休憩スペースがあり、長時間の釣りでも快適に過ごせます。 陸地から桟橋で歩いていけるイケスで釣りをするので、足が不自由な方でも補助があれば釣りをすることができます。 フィッシングパーク土肥のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; フィッシングパーク土肥では、主にマダイとアジを釣ることができます。ここでは、これらの魚種についてのおすすめ仕掛けと釣りのコツをご紹介します。\nマダイを狙う場合 \u0026nbsp; マダイは初心者でも釣りやすく、見た目も美しい人気の魚種です。\n推奨タックル（レンタル利用の場合）：\n竿：施設で用意されている貸し竿 リール：施設で用意されているもの 仕掛け：基本的に施設で用意されている仕掛けで十分 持ち込みの場合の推奨タックル：\n竿：6:4〜7:3調子の磯竿（2.7m〜3.6m） リール：2500番〜3000番クラスのスピニングリール 道糸：3号〜4号のナイロンライン ハリス：2号〜3号のフロロカーボン 針：マダイ針8号〜10号 釣り方のコツ：\nイケス内では、オキアミやコーンなどの施設で提供されるエサを使用します。 仕掛けを底近くに沈め、時々軽く動かすと効果的です。 アタリがあったら少し間を置いてから合わせると掛かりやすくなります。 イケス外では、底付近をゆっくりと探るように釣ると良いでしょう。 魚の活性が高い朝や夕方の時間帯がおすすめです。 アジを狙う場合 \u0026nbsp; アジは数釣りが楽しめる人気の魚種で、初心者でも釣りやすいのが特徴です。\n推奨タックル：\n竿：軽めの磯竿（2.1m〜2.7m） リール：2000〜2500番クラスのスピニングリール 道糸：1.5号〜2号のナイロンライン ハリス：0.8号〜1.5号のフロロカーボン 針：アジ針10号〜12号 釣り方のコツ：\nオキアミやアミエビなどの小さめのエサを使用します。 中層から表層を狙うことが多いですが、時期や天候によって変わります。 小さくこまめにアタリが出るので、集中して竿先を見ていましょう。 群れで回遊することが多いので、一度アタリがあった場所を狙い続けると連続して釣れることがあります。 アジは引きが弱いので、強く合わせすぎないように注意しましょう。 イケス外での釣りのコツ \u0026nbsp; イケス外で釣りをする場合は、自然の海での釣りに近い感覚が必要です。\n釣り方のコツ：\n潮の流れや風向きをよく観察し、魚が集まりやすいポイントを探しましょう。 イケス外では魚の密度が低いため、広い範囲を探ることが重要です。 チャンスがあれば移動して、様々なポイントを試してみましょう。 朝や夕方など、魚の活性が高い時間帯を狙うと良いでしょう。 イケス外では釣れた魚は無料なので、積極的にチャレンジする価値があります。 フィッシングパーク土肥へのおすすめアクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 「フィッシングパーク土肥」へは車でのアクセスが一般的です。\nルート案内：\n東名高速道路・沼津ICで降りる 伊豆縦貫自動車道を南下 国道136号線を経由して土肥方面へ 土肥港近くのフィッシングパーク土肥に到着 東京方面からは約3時間、名古屋方面からは約4時間ほどかかります。伊豆は道路が狭く曲がりくねった場所も多いため、余裕をもった計画をおすすめします。\nフェリーでのアクセス \u0026nbsp; 清水港から駿河湾フェリーを利用すると、陸路で行くよりも早く到着できる場合もあります。\nルート案内：\nJR東海道線・清水駅で下車 バスまたはタクシーで清水港へ（約10分） 駿河湾フェリーで土肥港へ（約65分） 土肥港から徒歩約15分でフィッシングパーク土肥に到着 フェリーの運行時間は季節や天候によって変動するため、事前に駿河湾フェリーの公式サイトで確認することをおすすめします。海からのアプローチは富士山や駿河湾の絶景を楽しめる特別な体験になります。\nバスでのアクセス \u0026nbsp; 公共交通機関でのアクセスも可能です。\nルート案内：\nJR三島駅または修善寺駅からバスで土肥温泉方面へ 「土肥」バス停で下車 バス停から徒歩約10分でフィッシングパーク土肥に到着 バスの本数は限られているため、事前に時刻表を確認しておくことをおすすめします。\n観光と組み合わせたアクセスプラン \u0026nbsp; 土肥エリアには温泉や観光スポットも多く、釣りと組み合わせた観光プランがおすすめです。\nおすすめ観光プラン：\n午前中にフィッシングパーク土肥で釣りを楽しむ 昼食は土肥温泉街の海鮮料理店で新鮮な魚介類を堪能 午後は土肥金山や土肥温泉を観光 帰りは夕日スポットの恋人岬から美しい駿河湾の夕景を眺める または：\n清水港から駿河湾フェリーで土肥港へ フィッシングパーク土肥で釣りを楽しむ 土肥温泉で温泉と海鮮料理を楽しむ 翌日は西伊豆の絶景スポットを巡る 近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 宿泊施設：\n【最安】民宿 いけ田（土肥・一泊6,000円〜） 【平均】土肥マリンホテル（土肥・一泊12,000円〜） 【高級】土肥温泉 クアハウス石橋旅館（土肥・一泊20,000円〜） レンタカー：\n【最安】ニッポンレンタカー三島駅前店（コンパクトカー5,500円/日〜） 【平均】トヨタレンタカー三島駅前店（コンパクトカー7,000円/日〜） 【高級】日産レンタカー三島駅前店（ミニバン12,000円/日〜） 伊豆は公共交通機関が限られているため、特に複数の観光スポットを巡る場合はレンタカーの利用がおすすめです。\n実際に利用したユーザーの声 \u0026nbsp; 40代男性 評価：★★★★★ 「初心者でも手軽に釣りを楽しめるスポットです。入場料も安くて、竿とエサも借りられるので手ぶらで行けるのが良いですね。子供と一緒に行きましたが、イケスでアジが何匹も釣れて大喜びでした。」\n30代男性 評価：★★★★★ 「イケス外で釣りをしていたら、大きなマダイが釣れて大満足でした。追加料金がかからないのは嬉しいポイントです。施設もきれいで、休憩スペースもあるので長時間でも快適に過ごせました。」\n20代女性 評価：★★★★★ 「フェリーで土肥に行く際に立ち寄りました。海の上からの景色も良く、釣りも楽しめて一石二鳥でした。初めての釣りでしたが、スタッフの方が丁寧に教えてくれたので安心して楽しめました。」\n50代男性 評価：★★★★★ 「家族で利用しましたが、子供はイケスで確実に釣れる体験を、大人はイケス外でのチャレンジを楽しめて、それぞれに満足できました。釣った魚は持ち帰って夕食に使いましたが、とても新鮮で美味しかったです。」\nまとめ：フィッシングパーク土肥をおすすめしたい度 \u0026nbsp; フィッシングパーク土肥は、初心者から経験者まで幅広く楽しめる海釣り施設です。特に以下のような方におすすめできる施設です：\n初めての海釣りにチャレンジしたい方 家族や子供と一緒に釣りを楽しみたい方 リーズナブルな価格で釣り体験をしたい方 伊豆観光と合わせて釣りも楽しみたい方 フェリーでのアクセスなど、ユニークな旅行プランを立てたい方 入場料1,500円という手頃な価格設定は、気軽に釣りを楽しみたい方にとって大きな魅力です。また、イケス内では確実に釣果が期待できる一方、イケス外では釣った魚が無料というシステムは、初心者から経験者まで、それぞれのスタイルに合わせて楽しめる柔軟性があります。\n施設は土肥温泉街からも近く、釣りの後は温泉や観光を楽しむこともできます。また、駿河湾フェリーを利用すれば、海からのアプローチも可能で、富士山や駿河湾の絶景を眺めながらの船旅も旅の思い出になるでしょう。\n年間を通して楽しめる施設ですが、特に春（4月〜6月）と秋（9月〜11月）は気候も穏やかで絶好の釣りシーズンです。夏場は朝の早い時間帯に訪れると、暑さを避けつつ魚の活性も高い時間帯に釣りを楽しむことができるでしょう。\n火曜日は定休日、また荒天時は臨時休業となることがあるため、訪問前に営業状況を確認することをおすすめします。\n伊豆の美しい海と山の景色を眺めながら、手軽に海釣りを楽しめるフィッシングパーク土肥は、釣り初心者から家族連れまで、幅広い層におすすめできる施設です。特に、予算を抑えながらも釣りの醍醐味を味わいたい方にとって、最適なスポットと言えるでしょう。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 54,
        href: "/shizuoka/kaijo-tsuribori-taikoubou/",
        title: "【静岡県】海上釣り堀 太公望｜網代港の釣り体験と食事が楽しめ...",
        description: "静岡県熱海市網代にある「海上釣り堀 太公望」は、釣りと食事がセットで楽しめる人気施設です。ファミリーコースなら竿・エサ込みで手軽にマダイやアジをゲット！釣った魚は併設の市場食堂で調理してもらい、その場で味わうことができます。初心者からマニアまで満足できるプラン詳細とアクセスを解説。",
        
        
        content: "熱海の温泉街からほど近い網代（あじろ）港。「海上釣り堀 太公望（たいこうぼう）」は、ただ魚を釣るだけでなく、**「釣った魚をその場で美味しく食べる」**ことにとことんこだわった施設です。\n「釣れた魚をどうやって持ち帰ろう？」「家でさばくのは面倒だな…」 そんな悩みは一切不要！併設された直営の市場食堂で、プロの料理人があなたの釣果を絶品料理に変えてくれます。\nファミリー向けのコースから大物狙いのマニアコースまで用意されており、釣りの楽しさと食の喜びを一度に満喫できる「太公望」の魅力をご紹介します。\n海上釣り堀 太公望の基本情報 \u0026nbsp; 項目 詳細 施設名 海上釣り堀 太公望 住所 〒413-0103 静岡県熱海市網代100-7（網代港内） 営業時間 8:00～15:00 定休日 水曜日（荒天時休業） 料金 ファミリーコース 5,000円（渡船料込） / マニアコース 5,500円（渡船料込）※詳細後述 レンタル 竿・エサ代は基本料金に込み 釣れる魚 マダイ、アジ（ファミリーコース）、ブリ、ワラサ、カンパチ、シマアジなど（マニアコース） アクセス JR伊東線「網代駅」から徒歩約15分 公式サイト スルガ銀行紹介ページ等参照 選べる2つのコース \u0026nbsp; 太公望では、釣り人のレベルや目的に合わせて2つのコースから選べます。\n1. ファミリーコース（初心者・家族連れ推奨）\n料金：4,500円 ＋ 渡船料500円 ＝ 5,000円 内容：マダイやアジが入っている比較的釣りやすいイケスで釣ります。 持ち帰り：竿1本につき「タイ2匹・アジ5匹」まで料金内（保冷）で持ち帰り可。 特徴：もし釣れなくても、お土産として魚がもらえる保証がある場合が多いので安心（要確認）。まさに「お土産確保」に最適です。 2. マニアコース（経験者・大物狙い）\n料金：5,000円 ＋ 渡船料500円 ＝ 5,500円 内容：ブリ、カンパチ、シマアジ、大鯛になどの大型魚が放流されているイケスで一発大物を狙います。 持ち帰り：釣った魚は基本的に持ち帰り可能ですが、ブリなどの超大物は別途追加料金が発生する場合があります（例：ブリサイズ＋10,000円など。要現地確認）。 特徴：青物の強烈な引きを楽しみたい人はこちら。腕に覚えのあるアングラー向けです。 最大の魅力：釣った魚を「市場食堂」で食べる！ \u0026nbsp; 太公望の母体は干物店や食堂を運営しているため、「食」のサービスが非常に充実しています。 釣り終わった後、受付のある陸地に戻り、併設の食堂へ直行！\n調理代（例）：アジ1匹500円〜、タイ1匹1,500円〜（サイズや調理法による） メニュー：お刺身、塩焼き、煮付け、フライなど。 定食化：ご飯セットを注文すれば、自分が釣った魚がメインディッシュの豪華ランチ定食が完成します。 これこそが太公望の真骨頂。新鮮な魚の味は、スーパーの魚とは比べ物になりません。\n太公望での攻略法 \u0026nbsp; ファミリーコース：まずはアジから \u0026nbsp; アジ狙い：アジは比較的簡単に釣れます。タナ（深さ）を合わせ、コマセカゴ（レンタルに含まれている場合あり）を使って寄せましょう。 マダイ狙い：アジより少し深い場所にいます。アジが釣れすぎたらタナを深くしてマダイを狙うのがコツです。 マニアコース：青物は活性が命 \u0026nbsp; 活きエサ：青物（ブリ・カンパチ）狙いには、活きたアジ（現地購入など）を使う「泳がせ釣り」が最強です。 ドラグ調整：青物の引きは強烈です。リールのドラグを少し緩めておき、糸が切られないように調整しましょう。 「青です！」コール：青物がかかったら周りに「青物かかりました！」と声をかけましょう。周りの人は仕掛けを上げてオマツリ（糸絡み）を防ぐのがマナーです。 アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; ルート：小田原厚木道路〜国道135号、または伊豆縦貫道経由で網代港へ。 駐車場：網代港内に駐車スペースあり。 電車でのアクセス \u0026nbsp; ルート：JR伊東線「網代駅」下車。徒歩約15分。 タクシー：駅からタクシーならワンメーター（5分程度）です。荷物が多い場合はタクシー利用が便利です。 実際に利用したユーザーの声 \u0026nbsp; 40代パパ（ファミリーコース） 評価：★★★★★ 「子供たちに『魚の命をいただく』経験をさせたくて選びました。アジとタイが釣れて、その場で刺身と塩焼きにしてもらいました。子供が『今まで食べた魚で一番おいしい！』と完食してくれたのが嬉しかったです。」\n30代カップル（ファミリーコース） 評価：★★★★☆ 「じゃらんの食事付きプランで行きました。手ぶらで行けるのが楽ですね。船でイケスに行くのが旅行気分を盛り上げてくれます。日差しが強いので帽子は必須です。」\n50代男性（マニアコース） 評価：★★★★★ 「たまに放流される巨大ブリ目当てで通っています。今回はカンパチが釣れました。引きが強くて腕がパンパンになりましたが、刺身にしたら脂が乗ってて最高でした。」\nまとめ：太公望はこんな人におすすめ！ \u0026nbsp; 「釣る」だけでなく「食べる」までをセットで楽しみたい人 自分で魚をさばくのは苦手だけど、釣りたての魚を食べたい人 熱海旅行のランチを特別なものにしたい人 確実に美味しい魚（お土産）を持って帰りたい人 自分で釣った魚をその場で食べる体験は、最高の贅沢であり、子供にとっても素晴らしい食育になります。熱海・網代エリアで「思い出に残るランチ」を探しているなら、海上釣り堀 太公望へぜひお出かけください！"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 55,
        href: "/shizuoka/kaijo-tsuribori-maruya/",
        title: "【静岡県】海上釣り堀まるや｜高級魚が釣れる人気スポット・料金...",
        description: "静岡県沼津市西浦にある「海上釣り堀まるや」は、富士山を望む絶景の中でブリ・ワラサ・マダイなどの高級魚釣りが楽しめる本格派施設です。釣り放題システムで、釣った魚は全て持ち帰りOK！初心者から上級者まで満足できる放流システムと攻略法、アクセス情報を詳しく解説します。",
        
        
        content: "沼津市・西浦（にしうら）の静かな入り江にある「海上釣り堀まるや」は、釣り人なら一度は訪れたい憧れのフィールドです。\nその理由は、「ロケーション」と「釣れる魚の豪華さ」。 目の前には雄大な富士山と駿河湾が広がり、海中にはブリ、ワラサ、カンパチ、シマアジ、そして大鯛といった高級魚が所狭しと泳いでいます。\nしかも「釣り放題」システムを採用しているため、釣った魚は追加料金なしですべて持ち帰り可能。クーラーボックスが閉まらないほどの爆釣も夢ではありません。初心者から上級者まで熱くさせる「まるや」の魅力を徹底解剖します。\n海上釣り堀まるやの基本情報 \u0026nbsp; 項目 詳細 施設名 海上釣り堀まるや 住所 〒410-0242 静岡県沼津市西浦足保（足保漁港内） 営業時間 7:00～13:30（午後便あり：土日祝 13:30～16:00） 定休日 不定期（荒天時は休業、HP要確認） 料金 大人 13,700円 / 小人 6,000円（詳細後述） レンタル 貸し竿（仕掛け付） 2,000円、エサ販売あり 釣れる魚 マダイ、ワラサ・ブリ、カンパチ、シマアジ、イサキ、イシダイなど アクセス 東名沼津ICより約50分 公式サイト 海上釣り堀まるや 料金体系：夢の「釣り放題」 \u0026nbsp; まるやの料金システムはシンプルです。基本料金さえ払えば、あとは釣りまくるだけ。\n通常便（7:00～13:30） 大人（男性）：13,700円 女性・子供：11,200円 / 6,000円 ※渡船料込み 午後便（土日祝のみ 13:30～16:00） 少し割安なショートコース。朝起きるのが苦手な方や、観光ついでにおすすめです。 【ここが凄い！】\n釣果制限なし！釣れた魚は全匹持ち帰りOK。 ボウズ（0匹）の場合でも、真鯛などのお土産保証がある場合があります（要確認）。 渡船で沖のイケスへ渡るプチクルーズ気分も楽しめます。 まるや攻略！高級魚を釣り上げるコツ \u0026nbsp; まるやの魚はサイズが大きく、引きも強烈です。しっかりとした準備と戦略が必要です。\n1. 朝イチの「モーニング」を逃すな \u0026nbsp; 朝7時の釣り開始直後は、魚の活性が最も高い「モーニングタイム」。ここでいかに手返し良くマダイや青物を釣るかが勝負の分かれ目です。\n準備：開始の合図と同時に仕掛けを入れられるよう、準備万端にしておきましょう。 2. マダイ攻略：基本にして奥義 \u0026nbsp; エサ：真鯛イエローなどの「練り餌」と「ササミ」が定番。 タナ（深さ）：底から1m〜2m付近が基本。スタッフに「底取り」のやり方を聞いて、正確にタナを合わせることが最重要です。 3. 青物（ブリ・ワラサ）攻略：一発逆転のロマン \u0026nbsp; 合図：「青物放流しまーす！」というスタッフの声がかかったら、仕掛けを**「活きアジ（泳がせ釣り）」**に変更しましょう。 誘い：青物は動くものに反応します。活きエサが弱っていたら交換し、常に元気に泳ぐエサをアピールしましょう。 取り込み：かかったら強引に巻かず、竿の弾力を活かして寄せます。周りの人と協力して、早めにタモ入れをお願いしましょう。 4. エサのローテーション \u0026nbsp; 魚は頭が良いので、同じエサばかりだと見切られます。\n必須エサ4種：①練り餌（黄色・赤）、②オキアミ、③ササミ（黄色）、④活きアジ（現地購入可）。 これらをローテーションすることで、スレた魚にも口を使わせることができます。 アクセス情報 \u0026nbsp; 沼津ICから海沿いを走るルートは、富士山を眺めながらの絶好のドライブコースです。\n車でのアクセス \u0026nbsp; ルート：東名高速「沼津IC」または新東名「長泉沼津IC」〜伊豆縦貫道〜国道414号〜県道17号（海岸線）。約50分〜60分。 注意点：朝7時集合の場合、早朝に出発する必要があります。コンビニは途中にありますが、釣り場近くには少ないので、沼津市街地であらかじめ買い出しを済ませておきましょう。 予約について \u0026nbsp; まるやは非常に人気が高いため、事前予約が必須です。特に土日祝日はすぐに埋まってしまうので、釣行日が決まったら早めに電話予約を入れましょう。\n実際に利用したユーザーの声 \u0026nbsp; 50代男性（ベテラン） 評価：★★★★★ 「やっぱり『まるや』の魚は質が良い。今回はワラサ2本とマダイ6枚。脂が乗っていて刺身が最高でした。スタッフの放流パフォーマンスも盛り上がります。」\n30代女性（カップル利用） 評価：★★★★☆ 「彼氏に連れられて初めて行きました。富士山を見ながらの釣りは気持ちいい！最初は怖かったけど、大きなタイが釣れてハマりそうです。トイレも洋式があって安心でした。」\n40代グループ（会社仲間） 評価：★★★★★ 「貸切（1イケス）で利用しました。仲間内だけでワイワイできるので気兼ねなくて最高。釣れなかった人にも魚を分け合えるし、絶対盛り上がります。」\nまとめ：海上釣り堀まるやはこんな人におすすめ！ \u0026nbsp; スーパーでは買えないような「高級魚」をお腹いっぱい食べたい人 強烈な魚の引きを味わいたい人（青物ファン） 富士山を見ながら優雅に釣りをしたい人 「釣り放題」という言葉にロマンを感じる人 1万円超えの料金は安くはありませんが、釣れる魚の価値（天然に近いブランド魚クラス）と、富士山を望む絶景ロケーションを考えれば、コストパフォーマンスは非常に高いと言えます。 クーラーボックスを空っぽにして、満タンの夢を詰め込みに行きましょう！"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 56,
        href: "/shizuoka/araibenten-sea-fishing-park/",
        title: "【静岡県】新居弁天海釣公園｜24時間営業で浜名湖を満喫できる...",
        description: "静岡県湖西市、浜名湖への入り口にある「新居弁天海釣公園」は、24時間営業のT字型堤防がある人気釣り場です。駐車料金（400円）のみで利用でき、レンタルも充実。サビキ釣りでアジやイワシ、フカセ釣りでクロダイなど多彩な魚種が狙えます。初心者からベテランまで楽しめる浜名湖の釣りメッカを徹底解説！",
        
        
        content: "静岡県と愛知県の県境に位置する巨大な汽水湖・浜名湖。そのさらに海への入り口付近（今切口）にある「新居弁天（あらいべんてん）海釣公園」は、潮通しの良さと魚影の濃さで知られる東海地方屈指の釣りスポットです。\n最大の特徴は**「24時間営業」**であること。 早朝のマズメ時を狙うもよし、仕事終わりの夜釣りを楽しむもよし、ファミリーで日中ピクニック気分で訪れるもよし。ライフスタイルに合わせて自由に楽しめるのが魅力です。\nしかも入場料は無料（駐車場代のみ）。レンタル釣具も完備されており、手ぶらでもOK。そんな至れり尽くせりな「新居弁天海釣公園」の攻略ガイドをお届けします。\n新居弁天海釣公園の基本情報 \u0026nbsp; 項目 詳細 施設名 新居弁天海釣公園（あらいべんてんうみづりこうえん） 住所 〒431-0302 静岡県湖西市新居町新居官有無番地 営業時間 24時間営業 定休日 無休（台風や高波などの荒天時は閉鎖あり） 利用料金 無料（駐車場代のみ必要） 駐車場 1日400円（30分以内無料） レンタル あり（今切ショップにて受付）※詳細は後述 釣れる魚 アジ、イワシ、サバ、クロダイ、グレ、キス、カレイ、ヒラメ、タコなど アクセス 浜名バイパス「新居弁天IC」降りてすぐ 公式サイト 浜名湖観光情報サイト 驚きのコストパフォーマンス \u0026nbsp; この施設のすごいところは、実質ワンコイン以下で遊べる点です。\n入場料不要：施設利用料はありません。 駐車場代400円：車1台につき1日400円ポッキリ。何時間いても変わりません。 30分以内無料：「ちょっと様子見て、混んでたら帰ろう」という下見も無料でできます。 充実のレンタルサービス（今切ショップ） \u0026nbsp; 公園内にある売店「今切ショップ」では、釣り具のレンタルやエサの販売を行っています。\n営業時間：季節によって変動（要確認、早朝～夕方） 竿セット：1,500円～2,500円程度（サビキ仕掛け・エサ付きなど） エサ・氷：アミエビ、オキアミ、虫エサ、氷など一通り揃います。 新居弁天海釣公園で狙える魚と釣り方 \u0026nbsp; 浜名湖と遠州灘（太平洋）が繋がる「今切口（いまぎれぐち）」に位置するため、潮の流れが速く、多種多様な魚が回遊してきます。T字型の堤防が5本突き出しており、足場も良く安全です。\n1. サビキ釣り（初心者・ファミリー向け） \u0026nbsp; ターゲット：アジ、イワシ、サバ、サッパ 時期：春～秋（特に夏～秋が最盛期） 攻略法： 足元に落とすだけで釣れます。T字堤防の内側は流れが緩やかで初心者向きです。 「トリックサビキ」など、針に直接エサが付くタイプも効果大。 2. ウキフカセ釣り・ダンゴ釣り（中級者～） \u0026nbsp; ターゲット：クロダイ（チヌ）、グレ（メジナ） 時期：春（乗っ込み）、秋（数釣り） 攻略法： 浜名湖は全国有数のクロダイの聖地。潮の流れが速いため、潮止まり前後が勝負です。 T字堤防の先端付近など潮通しの良い場所がおすすめですが、流れが速すぎる時は内向きを攻めるのも手です。 3. 投げ釣り・ブッコミ釣り（のんびり派） \u0026nbsp; ターゲット：キス、カレイ、ヒラメ 時期：キス（夏）、カレイ（冬） 攻略法： 砂地になっている場所も多く、チョイ投げでキスが狙えます。 釣れたキスやアジを活きエサにして泳がせれば、ヒラメやマゴチといった高級魚が食いつくことも！ 4. タコ釣り（浜名湖名物） \u0026nbsp; ターゲット：マダコ 時期：初夏～夏 攻略法： タコエギやタコテンヤで堤防の際（キワ）を探ります。根掛かりに注意しながら、底を小突きましょう。 アクセス情報 \u0026nbsp; 浜名湖の観光拠点としても便利な場所にあります。\n車でのアクセス（推奨） \u0026nbsp; 名古屋方面からも静岡方面からも非常にアクセスが良いです。\nルート：浜名バイパス（国道1号）**「新居弁天（あらいべんてん）IC」**を降りて、信号を曲がればすぐそこです。 駐車場：約400台収容の巨大な駐車場があります（1回400円）。 電車でのアクセス \u0026nbsp; **JR東海道本線「新居町（あらいまち）駅」または「弁天島駅」**で下車。 駅からは徒歩約20分〜30分程度かかります。荷物がある場合はタクシー（ワンメーター程度）の利用がおすすめです。 周辺のお楽しみ \u0026nbsp; 24時間営業なので、釣りの前後に周辺観光を楽しむのもおすすめ。\n浜名湖競艇場（ボートレース浜名湖）：すぐ近くにあります。 弁天島温泉：日帰り入浴可能なホテルで潮風を洗い流せます。 うなぎ処：湖西市・浜松市といえばウナギ。周辺には名店が多数あります。 実際に利用したユーザーの声 \u0026nbsp; 30代ファミリー（愛知から） 評価：★★★★★ 「駐車場代だけで遊べるのでコスパ最強です。サビキでイワシが100匹くらい釣れて、子供が大喜びでした。柵もあるので小さい子供がいても安心です。」\n50代ベテラン釣り師 評価：★★★★★ 「24時間いつでも行けるのが良い。仕事終わりに夜釣りで電気ウキを流すのが癒やしです。ここは潮が速いので攻略しがいがあります。大型のクロダイが出たときは震えました。」\n20代カップル 評価：★★★★☆ 「レンタル竿で手ぶらで行きました。売店のおじさんが親切で、釣り方を教えてくれました。トイレも駐車場にあるので女性でも安心だと思います。」\nまとめ：新居弁天海釣公園はこんな人におすすめ！ \u0026nbsp; 時間を気にせず、自分のペースで釣りをしたい人 安く、長く遊びたい人（駐車場代400円のみ！） ファミリーで安全に海釣りデビューしたい人 クロダイやヒラメなど、大物狙いのベテラン勢 浜名湖観光のついでに少しだけ竿を出したい人 浜名湖の豊かな自然と魚影の濃さを、24時間いつでも体感できる素晴らしいフィールドです。ルールとマナー（ゴミの持ち帰りなど）を守って、楽しい釣りライフを満喫してくださいね！"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 57,
        href: "/shizuoka/atami-port-sea-fishing-facility/",
        title: "【静岡県】熱海港海釣り施設｜リーズナブルな料金で地元民にも観...",
        description: "静岡県熱海市にある「熱海港海釣り施設」は、大人500円・小中学生300円で楽しめる長さ260mの巨大堤防です。熱海市街や花火を望む絶景の中で、アジ・イワシ・カマス、冬にはメバルなどが狙えます。レンタル完備の手ぶらフィッシングガイドをお届けします。",
        
        
        content: "日本有数の温泉リゾート・熱海。その玄関口である熱海港の防波堤を利用した「熱海港海釣り施設」は、観光客から地元ベテラン勢までが集う賑やかな釣りスポットです。\n全長約260m、幅のある広々とした堤防からは、熱海のホテル群や山々、そして相模湾のパノラマが一望できます。 入場料は大人500円と超リーズナブル。ライフジャケットの無料貸出もあり、安全性もバッチリ。\n「熱海旅行の朝、ちょっと早起きして釣りをしたい」「子供に海釣りデビューさせたい」 そんなニーズに完璧に応える、熱海港海釣り施設の楽しみ方をご紹介します。\n熱海港海釣り施設の基本情報 \u0026nbsp; 項目 詳細 施設名 熱海港海釣り施設 住所 〒413-0023 静岡県熱海市和田浜南町1694-32 営業時間 6:00～日没（4月～10月） / 7:00～日没（11月～3月） ※季節変動あり 定休日 無休（花火大会開催日や荒天時は規制あり） 料金 大人 500円 / 小中学生 300円 / 小学生未満 無料 レンタル 貸し竿セット（エサ付） 2,200円（3時間） 駐車場 隣接する市営駐車場あり（500円/1日） 釣れる魚 アジ、イワシ、カマス、ソウダガツオ、メジナ、クロダイ、メバル、カサゴなど アクセス 熱海駅よりバス「後楽園行き」終点下車すぐ 公式サイト 熱海港海釣り施設 初心者に優しいレンタル＆サポート \u0026nbsp; 「釣り具なんて持ってないよ！」という方でも安心です。\n手ぶらセット：竿、リール、仕掛け、エサ、バケツがセットになったレンタルプランがあります。 スタッフ常駐：管理棟にはスタッフがいて、釣り方のアドバイスや毒魚の注意喚起などを行ってくれます。 ライフジャケット：子供用ライフジャケットの無料貸出があり、ファミリーでも安心して利用できます。 熱海港海釣り施設で狙える魚と攻略法 \u0026nbsp; 熱海港は水深があり、潮通しも良いため、四季折々の魚が回遊してきます。\n1. サビキ釣り（ファミリー・初心者向け） \u0026nbsp; ターゲット：アジ、イワシ、サバ、ネンブツダイ 時期：春～秋 攻略法： 足元に落とすだけでOK。特に朝マズメ（早朝）と夕マズメ（日没前）は入れ食いになることも。 釣れた小魚（イワシなど）をそのまま泳がせておくと、ヒラメやシーバスが食いつくミラクルが起きることもあります。 2. カマス釣り（熱海名物） \u0026nbsp; ターゲット：カマス 時期：夏～秋～冬 攻略法： 熱海港はカマスの魚影が濃いことで有名です。 専用の「カマスサビキ」や小型ルアー、キビナゴエサの引っ掛け釣りで狙います。塩焼きや干物にすると絶品です。 3. ソウダガツオ・イナダ（青物） \u0026nbsp; ターゲット：ソウダガツオ、イナダ（ブリの若魚） 時期：夏～秋 攻略法： 「カゴ釣り」と呼ばれる遠投仕掛けでちょっと沖を狙います。 強烈な引きで堤防中を走り回るので、釣り上げると周囲からヒーロー扱いされることも！ アクセス情報と周辺観光 \u0026nbsp; 熱海観光の中心地に近いため、アクセスは非常に便利です。\nバスでのアクセス \u0026nbsp; JR熱海駅から伊豆箱根バス・伊豆東海バス**「熱海後楽園行き」**に乗車。 終点で下車し、目の前にある「熱海後楽園ホテル」の裏手が釣り施設入り口です。 車でのアクセス \u0026nbsp; 施設入り口のすぐ横に大規模な**市営駐車場（海釣り施設駐車場）**があります。 料金：1日500円（※花火大会などの特別日は変更あり）。 釣りの後は…「後楽園ホテル」の日帰り温泉へ！ \u0026nbsp; 釣り施設のすぐ隣には、大型リゾートホテル「熱海後楽園ホテル」のスパ施設**「オーシャンスパ Fuua（フーア）」**があります。 釣りの潮風を、絶景露天風呂（インフィニティ温泉）で洗い流すコースは最高です。釣り施設利用者は割引券がもらえることもあるので要チェックです。\n実際に利用したユーザーの声 \u0026nbsp; 40代男性（家族旅行） 評価：★★★★★ 「ホテルのチェックアウト後の時間調整で利用しました。手ぶらで行って、息子が初めてアジを釣りました。スタッフのおじさんが優しくて、毒のある魚（アイゴ）には触らないよう教えてくれて助かりました。」\n20代学生グループ 評価：★★★★☆ 「入場料500円は安い！サビキでネンブツダイばっかり釣れたけど（笑）、海を見ながらボーッとするだけでも気持ちよかったです。帰りに隣の温泉に入って完璧な休日でした。」\n60代地元釣り師 評価：★★★★★ 「カマスの時期は毎日通っています。足場が良いし柵もあるので安全。トイレや自販機もしっかり管理されているので、女性や子供連れでも安心できる釣り場だと思います。」\nまとめ：熱海港海釣り施設はこんな人におすすめ！ \u0026nbsp; 熱海旅行のプランに「アウトドア体験」をプラスしたい人 低予算（ワンコイン）で楽しみたい人 釣りだけでなく、温泉や観光も効率よく回りたい人 安全な堤防で子供と釣りをしたいファミリー 目の前に広がるリゾートホテルと青い海。熱海ならではの景色の中で釣り糸を垂らす時間は、きっと特別な旅の思い出になります。早起きして朝の清々しい空気を吸いに、堤防へ出かけてみませんか？"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 58,
        href: "/ishikawa/notojima-sea-fishing-center/",
        title: "【石川県】のとじま臨海公園「海づりセンター」｜水族館の隣で釣...",
        description: "「水族館で魚を見た後、その隣で実際に魚を釣ってみる」 そんなユニークな体験ができるのが、石川県能登島にある「のとじま臨海公園 海づりセンター」です。",
        
        
        content: "「水族館で魚を見た後、その隣で実際に魚を釣ってみる」 そんなユニークな体験ができるのが、石川県能登島にある**「のとじま臨海公園 海づりセンター」**です。\n人気の「のとじま水族館」に併設されたこの施設は、海上に伸びる桟橋から安全に釣りを楽しめるファミリーフィッシングの聖地。 **「手ぶらOK」「足場が良い」「スタッフ常駐」**と、三拍子揃った環境は、釣りデビューのお子様や女性にもぴったり。\n水族館チケットがあれば入場料が割引になるお得な特典も。 観光の合間に1時間だけ、といった使い方もできる、能登島観光の隠れ人気スポットをご紹介します。\nのとじま海づりセンターの基本情報 \u0026nbsp; 項目 詳細 施設名 のとじま臨海公園 海づりセンター 住所 〒926-0216 石川県七尾市能登島曲町15-40 営業時間 ・通常：9:00〜17:00\n・冬季（12/1〜3/19）：9:00〜16:30\n※入場は終了30分前まで 定休日 年末（12月29日〜31日） 利用料金 大人：520円 / 小中学生：310円 釣れる魚 アジ、クロダイ、メジナ、サヨリ、キス、カレイ、メバル 公式サイト [海づりセンター お得な割引情報 \u0026nbsp; 「のとじま水族館」の入場券を持っていると、海づりセンターの入場料が割引になります。\n大人：100円引き 小中学生：50円引き ぜひ「水族館＆釣り」のセットプランで楽しんでください。 充実のレンタル＆設備 \u0026nbsp; 道具を持っていなくても安心です。\n貸竿（エサ別）：520円 販売エサ：アミエビ、オキアミ、青イソメなど（300円〜） 設備：トイレ、手洗い場、休憩所、自動販売機完備 のとじま海づりセンターの攻略法 \u0026nbsp; 施設の特徴と釣り場のルール \u0026nbsp; 桟橋スタイルで足元から水深があり、回遊魚から根魚まで狙えます。\n投げ釣り禁止：安全のため、アンダースローでも禁止です。足元に落とす釣りが基本です。 天候による閉鎖：強風や波が高い日は安全のため閉鎖されることがあります。公式サイトや電話で確認しましょう。 季節別のおすすめターゲット \u0026nbsp; 春〜夏（4月〜8月）：アジ・サヨリ天国\n初心者やお子様に一番おすすめのシーズン。 サビキ釣りでアジやイワシが数釣りできます。 水面を泳ぐサヨリを専用仕掛けで狙うのもゲーム性があり人気です。 秋（9月〜11月）：数釣り＆大物狙い\n魚の活性が最も高いベストシーズン。 アジのサイズが良くなり、それを追って入ってくる大型魚（スズキなど）も期待できます。 クロダイの魚影も濃く、桟橋の橋脚周りで良型が上がります。 冬（12月〜3月）：カレイ・根魚\n水温が下がるとカレイやアイナメ、メバルなどの美味しい魚がターゲットに。 防寒対策をしっかりして臨みましょう。 釣果を伸ばすコツ \u0026nbsp; スタッフに聞く：常駐スタッフはその日の「釣れている場所」「タナ（深さ）」を知っています。恥ずかしがらずに「今どこで釣れてますか？」と聞いてみましょう。 足元を探る：投げ釣り禁止なので、橋脚の周りや陰になっている部分を丁寧に探るのがポイントです。 アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 金沢方面から：のと里山海道経由、能登島大橋を渡って約1時間半。 水族館と共用の巨大駐車場（約1,100台）があり、駐車の心配はありません。 公共交通機関でのアクセス \u0026nbsp; JR七尾駅から能登島交通バス「のとじま臨海公園」行きで約40分。 バス停から徒歩すぐです。 実際に利用したユーザーの声 \u0026nbsp; ※実際のレビューを参考に要約しています。\n40代男性（ファミリー）「★★★★★｜5.0」 \u0026nbsp; 「子供のデビュー戦に」 水族館のついでに寄りました。釣りは初めてでしたが、レンタルの竿でアジが入れ食い！子供が大興奮でした。柵もしっかりしていて安全なのが良いですね。魚は持ち帰って唐揚げにしました。\n30代女性（カップル）「★★★★☆｜4.0」 \u0026nbsp; 「手ぶらで気楽」 道具とか何も持たずにワンピースで行きましたが楽しめました（笑）。エサの付け方もスタッフさんが教えてくれました。海風が気持ちよかったです。\n50代男性（ベテラン）「★★★★☆｜4.0」 \u0026nbsp; 「意外と大物も」 ファミリー向けと侮るなかれ。橋脚周りの落とし込みで40cmオーバーのクロダイが出ます。投げ釣り禁止なので、ヘチ釣りの技術が活かせます。\nまとめ：のとじま海づりセンターはどんな人におすすめ？ \u0026nbsp; こんな人に最適 \u0026nbsp; お子様に初めて釣りをさせてあげたいパパママ 水族館デートのプランにもう一つ楽しみを加えたいカップル 能登観光の合間に、少しだけ海と触れ合いたい人 水族館で「魚を見る楽しさ」を知り、海づりセンターで「魚を釣る楽しさ」を知る。 そんな豊かな海体験ができるのは、能登島ならではの特権です。 手ぶらでふらっと立ち寄って、能登の海の豊かさを体感してみてください。\n実際に利用したユーザーの声を抜粋 \u0026nbsp; Google口コミや公式サイトから、利用者の声をいくつか紹介します。\n「水族館と一緒に楽しめるので、家族で来ました。子供も初めての釣りで大喜びでした。貸竿があるので手ぶらで行けるのが良かったです。」（40代男性・家族連れ）\n「初心者でしたが、スタッフの方が丁寧に教えてくれて、メジナを3匹釣ることができました。風景も良くて、のんびり過ごせました。」（30代女性）\n「水族館で魚を見た後に実際に釣るという体験ができて、子供の勉強にもなりました。餌付けは最初は抵抗があったようですが、慣れると自分でできるようになりました。」（40代女性・家族連れ）\n「釣り初心者でしたが、桟橋なので安定していて、波の影響も少なく快適に釣りができました。ただ、強風の日は中止になることもあるので、事前確認をおすすめします。」（50代男性）\n【まとめ】のとじま臨海公園「海づりセンター」をおすすめしたい度 \u0026nbsp; のとじま臨海公園「海づりセンター」は、初心者や家族連れにとって非常におすすめできる釣り施設です。特に以下のような方には最適な場所といえるでしょう。\n釣り初心者で海釣りに挑戦したい方 家族で釣りを楽しみたい方 水族館見学と合わせて釣り体験もしたい方 手ぶらで気軽に釣りを楽しみたい方 料金も比較的リーズナブルで、釣具のレンタルや餌の販売もあるため、急に思い立っても楽しめる手軽さが魅力です。水族館併設という珍しい特徴を活かし、「見て学んで実際に釣る」という一連の体験ができるのも大きな強みです。\n施設は年間を通して営業していますが、特におすすめなのは5月〜10月の暖かい時期です。この時期は魚の活性も高く、釣果も期待できます。ただし夏場の日中は日差しが強いため、早朝や夕方がより快適でしょう。\n天候に左右される施設ですので、訪問前には必ず公式サイトや電話で営業状況を確認することをお忘れなく。のとじま水族館と合わせて訪れると、一日中楽しめる素晴らしい体験になるでしょう。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 59,
        href: "/ishikawa/fishing-bridge-akasaki/",
        title: "【石川県】フィッシングブリッジ赤崎｜24時間無料！能登の磯を...",
        description: "能登半島の豊かな海を、もっと手軽に、もっと自由に楽しみたい。 そんな釣り人の願いを叶えてくれるのが、能登町にある「フィッシングブリッジ赤崎」です。",
        
        
        content: "能登半島の豊かな海を、もっと手軽に、もっと自由に楽しみたい。 そんな釣り人の願いを叶えてくれるのが、能登町にある**「フィッシングブリッジ赤崎」**です。\nここの最大の特徴は、**「24時間・年中無休・完全無料」**であること。 海上に架けられた赤い桟橋を渡れば、そこはもうメバルやクロダイが潜む一級の磯場。 本来ならウェーダーを履いたり、船に乗ったりしないと届かないポイントに、スニーカーのまま楽々アクセスできます。\n時間を気にせず、自分のペースで夜釣りや朝マズメを楽しめる、能登の貴重な無料フィールドを攻略します。\nフィッシングブリッジ赤崎の基本情報 \u0026nbsp; 項目 詳細 施設名 フィッシングブリッジ赤崎 住所 石川県鳳珠郡能登町宇出津ト字50番地1 営業時間 24時間開放 定休日 なし（年中無休） 料金 無料 駐車場 あり（無料・桟橋手前） 釣れる魚 メバル、アオリイカ、クロダイ、タコ、アジ、シーバス、キジハタ 設備 トイレ（近くの公園を利用）、常夜灯なし（ヘッドライト必須） なぜ「磯釣り」が手軽なのか？ \u0026nbsp; 通常、磯釣りは危険が伴うものですが、ここは海岸から沖の「平島」という磯場まで、しっかりとしたコンクリートとポールの桟橋が架かっています。 足元は安全な平らな橋の上。しかし、その下には複雑に入り組んだ岩礁帯（シモリ）が広がっています。 つまり、**「足場は波止釣り、海中は磯釣り」**という、釣り人にとって理想的な環境なのです。\n利用上の注意 \u0026nbsp; 自己責任：管理人が常駐しているわけではありません。安全管理は自分で行いましょう。 夜間の照明：桟橋に照明はないため、夜釣りならヘッドライト等の光源が必須です。 ゴミの持ち帰り：貴重な無料釣り場を維持するため、ゴミは必ず持ち帰りましょう。 フィッシングブリッジ赤崎の攻略法 \u0026nbsp; 岩礁帯の主役たちを狙う \u0026nbsp; メバル・根魚（冬〜春の夜釣り）\n赤崎の代名詞とも言えるターゲット。 橋の下の岩陰に良型のメバルが居着いています。 電気ウキ釣りや、ワームを使ったルアー釣り（メバリング）で、表層から中層をゆっくり探るのがコツです。 タコ（春〜夏）\n足元が岩場なので、タコにとっては絶好の住処です。 橋の上からタコエギやタコジグを落とし、底をトントン叩くだけで釣れることがあります。根掛かりには注意！ アオリイカ（春・秋）\n岩場と海藻が豊富なため、アオリイカの産卵・生育場所になっています。 エギングで広範囲を探ると好反応が得られます。 クロダイ（フカセ釣り）\n磯釣り師に人気のターゲット。 沖向きの潮通しの良い場所で、撒き餌を打って寄せます。水深があまり深くない場所もあるので、タナ取りが重要です。 釣果アップのポイント \u0026nbsp; 「変化」を釣る：桟橋全体がポイントですが、特に少し広くなっている場所や、海底の地形変化（色が濃くなっている場所）を狙いましょう。 潮通しを見る：桟橋の先端付近は潮が効きやすく、アジなどの回遊魚も回ってきます。 アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 「初めて訪れましたが、親切な地元の釣り人に教えてもらいながら釣りができました。ただ、トイレなどの施設はないので事前の準備は必須です。」（30代男性）\n「夏場の夕方からのシーバス釣りで80cmオーバーの大物が釣れました。潮の満ち引きのタイミングが重要です。強風時は波が高くなるので注意が必要です。」（40代男性）\nGoogleMAPの口コミは☆3.5とまずまずの評価。タコ釣りでは人気のポイントですし、海上に伸びる桟橋は景観もいいので、多様な客層を集めています。\n【まとめ】フィッシングブリッジ赤崎をおすすめしたい度 \u0026nbsp; フィッシングブリッジ赤崎は、以下のような方におすすめできる釣り場です。\n費用をかけずに本格的な海釣りを楽しみたい方 夜釣りや早朝釣りなど、時間を選ばずに釣りをしたい方 磯釣りでメバルやカサゴを狙いたい方 タコ釣りのポイントを探している方 シーバスなどの大物にも挑戦してみたい方 最大の魅力は、無料で24時間いつでも利用できる点です。季節によって様々な魚種を狙えるため、一年を通して楽しめる釣り場といえるでしょう。特に春から夏にかけてのタコ釣りと、冬から春にかけてのメバル釣りがおすすめです。\nただし、レンタル設備やトイレなどの施設がないため、すべて自己完結できる準備が必要です。また、天候や海の状態に左右されやすいため、安全面には十分な注意が必要です。特に初心者の方は穏やかな日を選んで訪れることをおすすめします。\n能登半島の美しい自然を眺めながら、無料で本格的な海釣りを楽しめるフィッシングブリッジ赤崎。釣り愛好家だけでなく、能登観光のついでに立ち寄る価値のある釣りスポットです。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 60,
        href: "/chiba/original-maker-sea-fishing-park/",
        title: "【千葉県】オリジナルメーカー海づり公園｜格安料金・釣りレッス...",
        description: "千葉県市原市にあるオリジナルメーカー海づり公園（市原市海づり施設）は、一般920円という破格の料金で本格的な海釣りが楽しめる関東屈指のコストパフォーマンス抜群の海釣り施設です。海上に張り出した桟橋での釣りは初心者からベテランまで楽しめます。",
        
        
        content: "千葉県市原市にあるオリジナルメーカー海づり公園（市原市海づり施設）は、一般920円という破格の料金で本格的な海釣りが楽しめる関東屈指のコストパフォーマンス抜群の海釣り施設です。海上に張り出した桟橋での釣りは初心者からベテランまで楽しめます。\n釣りレッスン（完全予約制）も開催しているため、釣り初心者でも安心してスタートできます。東京湾での多彩な魚種を狙え、都心からのアクセスも良好な人気の釣り場として多くの釣り人に愛されています。\nオリジナルメーカー海づり公園の基本情報 \u0026nbsp; 場所：〒290-0045 千葉県市原市五井南海岸1-12 営業時間：【4～11月】6:00～19:00（桟橋利用18:30、10月・11月は18:00まで）【12～3月】7:00～17:00（桟橋利用16:30） 定休日：月曜日（祝日は営業で直後の平日が休み、7～10月は無休）・年末年始 平均予算：920円（一般料金） レンタル：釣竿1,000円（仕掛け・エサは別途購入） 釣具の持ち込み：可能（1人2本まで） 釣れる魚：アイナメ・アジ・イシモチ・カレイ・イワシ・シロギス・ハゼ・シーバス・メバルなど 注意事項：竿出しは1人2本まで、魚釣りレッスン（完全予約制）あり ウェブサイト：https://ichihara-umizuri.com 料金体系について \u0026nbsp; オリジナルメーカー海づり公園は、関東地方の海釣り施設の中でも特に料金が安く設定されており、気軽に海釣りを楽しむことができます。\n＜基本料金＞\n一般：920円（見学のみ220円） 中学生：460円（見学のみ110円） 高齢者：460円（見学のみ110円） ＜レンタル料金＞\n釣竿：1,000円 仕掛け・エサ：別途購入 この料金設定は「釣り放題」方式で、時間制限なく営業時間内であれば何時間でも釣りを楽しむことができます。一般的な海上釣り堀が10,000円以上かかることを考えると、非常にリーズナブルな価格で本格的な海釣り体験ができるのが大きな魅力です。\n注意事項と補足データ \u0026nbsp; オリジナルメーカー海づり公園を利用する際には、以下の点に注意が必要です。\n竿の本数制限：1人につき2本まで（3本以上の釣り糸を用いての釣り行為は禁止） 営業時間の季節変動：夏季（4～11月）と冬季（12～3月）で営業時間が異なります 桟橋利用時間：営業終了の30分前には桟橋利用を終了する必要があります 釣りレッスン：完全予約制で初心者向けの指導を受けることができます 7～10月の夏季シーズンは無休で営業しているため、夏休みや海釣りのベストシーズンに安定して利用できるのも嬉しいポイントです。\n魚釣りレッスンは事前予約が必要ですが、初心者が基礎から学べる貴重な機会として活用できます。\nオリジナルメーカー海づり公園のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 釣り場環境と特徴 \u0026nbsp; オリジナルメーカー海づり公園は、東京湾に張り出した海上桟橋での釣りが特徴的な施設です。主な特徴として以下の点が挙げられます。\n海上桟橋からの釣りで足場が安定している 東京湾の多様な魚種を狙うことができる 初心者からベテランまで楽しめる環境 季節によって様々な魚種の回遊が期待できる 釣りレッスンがあるため、初心者でも安心してスタートできる おすすめの仕掛けとタックル \u0026nbsp; 東京湾での釣りに適したタックル構成と、主要な魚種に対するおすすめ仕掛けを紹介します。\nアジ・イワシ向けサビキ釣り\n竿：3～4m程度の万能竿またはサビキ専用竿 リール：2000～2500番のスピニングリール 仕掛け：サビキ仕掛け（6～8号針） エサ：アミエビ、オキアミ コツ：群れの回遊時間を狙い、アミカゴにエサをしっかり詰める シロギス・ハゼ向け投げ釣り\n竿：3～4m程度の投げ竿 リール：3000番程度のスピニングリール 仕掛け：投げ釣り用天秤仕掛け（8～12号針） エサ：青イソメ、ゴカイ コツ：砂底を狙い、ゆっくりとした誘いを心がける シーバス・メバル向けルアー釣り\n竿：2.4～3m程度のルアーロッド リール：2500番程度のスピニングリール ルアー：ワーム、小型ミノー、メタルジグ コツ：朝夕のマズメ時を狙い、ストラクチャー周りを攻める 施設では釣りレッスンも開催されているため、初心者の方は事前に予約を取って基礎から学ぶことをおすすめします。\n季節別の釣果情報 \u0026nbsp; 春（3月～5月）\nメバル、カレイの活性が高い時期 アイナメの好シーズン 水温上昇とともに魚の活性が上がる 夏（6月～8月）\nアジ、イワシの群れが回遊 シロギス、ハゼが好調 早朝・夕方の時間帯がおすすめ 秋（9月～11月）\nシーバスの活性が高まる アジの大型が期待できる 投げ釣りでカレイが狙える 冬（12月～2月）\nメバル釣りの最盛期 カレイが安定して釣れる 防寒対策をしっかりと行う オリジナルメーカー海づり公園へのおすすめアクセス情報 \u0026nbsp; 電車でのアクセス｜おすすめ！ \u0026nbsp; 公共交通機関を利用した場合が最もアクセスしやすい方法です。\nJR内房線「五井駅」からバスで約15分「海づり公園前」下車すぐ 東京駅からJR京葉線・内房線で約1時間「五井駅」下車 千葉駅からJR内房線で約20分「五井駅」下車 バスの本数は1時間に2～3本程度運行されており、朝の営業開始時間に合わせた便もあります。レンタル釣具もありますし、手ぶら利用できる釣り施設としては、アクセスが良いメリットがあります。\n車でのアクセス \u0026nbsp; 自動車を利用する場合のアクセス方法：\n首都高速湾岸線「市原IC」から約10分 館山自動車道「市原IC」から約15分 東京都心から約1時間程度 駐車場は完備されていますが、特に夏季シーズンや週末は混雑する可能性があります。早めの到着をおすすめします。\n近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 市原市および五井駅周辺の宿泊施設をご紹介します。\n【最安】予算を抑えたい方向け\nビジネスホテルやカプセルホテル：4,000円～6,000円程度 例：五井駅周辺のビジネスホテル、市原市内の格安宿泊施設 【平均】標準的な宿泊施設\n中級ホテルやシティホテル：8,000円～12,000円程度 例：市原市内のシティホテル、チェーン系ホテル 【高くてもいい】快適さを重視する方向け\n高級ホテルやリゾートホテル：15,000円以上 例：千葉市内の高級ホテル、房総半島のリゾートホテル レンタカー 五井駅周辺には複数のレンタカー会社があります。\nトヨタレンタカー五井駅前店 ニッポンレンタカー五井駅前店 オリックスレンタカー市原店 料金は1日あたり5,000円～10,000円程度です。運転免許証の持参を忘れずに。\n実際に利用したユーザーの声を抜粋 \u0026nbsp; 50代男性「★★★★★｜5.0」 \u0026nbsp; この料金でこれだけ釣りを楽しめるのは素晴らしいです。アジのサビキ釣りで家族分のおかずが確保できました。桟橋も安定していて安全に釣りができます。コストパフォーマンスは関東一だと思います。\n40代女性「★★★★☆｜4.0」 \u0026nbsp; 初心者でしたが釣りレッスンを受けて基礎から教えてもらえました。スタッフの方がとても親切で、女性でも安心して参加できます。料金も安いので気軽に通えるのが魅力です。\n30代男性「★★★★★｜5.0」 \u0026nbsp; 五井駅からバスで通いやすく、仕事帰りでも利用できます。シーバスやメバルなど、ルアーで本格的な釣りが楽しめる貴重な施設です。夏季は無休なのも助かります。\n60代男性「★★★★☆｜4.0」 \u0026nbsp; 高齢者割引があるのが嬉しいですね。桟橋なので足場も良く、長時間の釣りでも疲れません。カレイやハゼなど、昔ながらの東京湾の魚が釣れるのが懐かしいです。\n20代男性「★★★☆☆｜3.0」 \u0026nbsp; 料金は確かに安いのですが、夏の暑い日は日陰が少なくて大変でした。また、人気の時間帯は結構混雑します。それでも、この価格なら文句は言えませんね。\n料金の安さと釣りレッスンの充実度について高く評価されている一方で、夏季の日差し対策や混雑時の対応について課題も指摘されています。全体的には非常に高い満足度を得ている施設といえます。\n【まとめ】オリジナルメーカー海づり公園をおすすめしたい理由 \u0026nbsp; オリジナルメーカー海づり公園は、関東地方で最もコストパフォーマンスに優れた海釣り施設として、幅広い層の釣り人におすすめできます。\nおすすめする主な理由：\n破格の料金設定：一般920円という驚異的な安さで本格的な海釣りが楽しめます アクセスの良さ：東京駅から約1時間、五井駅からバスで15分と公共交通機関でアクセス可能 初心者サポート充実：釣りレッスン（完全予約制）があり、基礎から学べる環境が整っています 多彩な魚種：東京湾の豊富な魚種を狙うことができ、季節ごとに異なる釣りを楽しめます 安全な釣り環境：海上桟橋での釣りで足場が安定しており、初心者や高齢者でも安心です 夏季無休営業：7～10月は無休で営業しており、ベストシーズンに安定して利用できます 特に釣りを始めたばかりの初心者、コストを抑えて海釣りを楽しみたい方、都心からアクセスの良い釣り場を探している方にとって、非常に価値の高い施設といえます。\n釣りレッスンは完全予約制ですが、プロの指導を受けながら基礎技術を身に付けることができるため、これから釣りを本格的に始めたい方には特におすすめです。東京湾の恵まれた漁場で、手頃な料金で本格的な海釣りを体験したい方は、ぜひオリジナルメーカー海づり公園を訪れてみてください。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 61,
        href: "/chiba/futomi-flower-isotsuri-center/",
        title: "【千葉県】太海フラワー磯釣りセンター｜手ぶらOK・初心者向け...",
        description: "千葉県鴨川市にある太海フラワー磯釣りセンターは、関東地方で気軽に海上釣り堀を楽しめる貴重な施設です。",
        
        
        content: "千葉県鴨川市にある太海フラワー磯釣りセンターは、関東地方で気軽に海上釣り堀を楽しめる貴重な施設です。\n釣り竿からエサまで一式レンタルで手ぶら利用可能、キャッチ\u0026amp;リリース方式で魚の扱いに不慣れな初心者でも安心して楽しめる特徴があります。鴨川観光の一環として立ち寄りやすく、家族連れにも人気の海上釣り堀として多くの釣り人に愛されています。\n太海フラワー磯釣りセンターの基本情報 \u0026nbsp; 場所：〒299-2863 千葉県鴨川市太海浜67 営業時間：9:30～16:00（最終受付15:00） 定休日：年中無休 平均予算：1,500円（貸竿一式・エサ付き） レンタル：料金に釣り竿・エサが含まれる（エサの補充は200円） 釣具の持ち込み：不可 釣れる魚：イサキ・イシガキダイ・イシダイ・カサゴ・シマアジ・メジナ・サヨリなど 注意事項：キャッチ\u0026amp;リリース方式（持ち帰り不可）、10名以上の団体は事前連絡必要 ウェブサイト：https://kamotabi.jp/news/detail/19 料金体系について \u0026nbsp; 太海フラワー磯釣りセンターは、関東地方では珍しい「キャッチ\u0026amp;リリース方式」を採用している海上釣り堀です。基本料金1,500円で貸竿一式とエサが含まれており、釣った魚はその場でリリースするシステムとなっています。\n＜基本料金＞\n貸竿一式（エサ付き）：1,500円 エサの補充：200円 このシステムにより、クーラーボックスや氷の準備が不要で、魚の処理に慣れていない初心者でも気軽に海上釣り堀を体験することができます。また、料金が比較的リーズナブルなため、海上釣り堀初体験の方にとって敷居が低いのも大きな魅力です。\n注意事項と補足データ \u0026nbsp; 太海フラワー磯釣りセンターを利用する際には、以下の点に注意が必要です。\n釣り竿・エサの持ち込み不可：施設が提供する道具以外の使用は認められていません キャッチ\u0026amp;リリース方式：釣れた魚は必ずリリースする必要があり、持ち帰りはできません スタッフサポート：釣れた魚はスタッフが針から外してくれるため、手を汚さずに済みます 予約について：10名以下の個人利用なら予約不要、10名以上の団体は事前連絡が必要 年中無休で営業しているため、急な思い立ちでも利用しやすく、観光ついでに立ち寄ることが可能です。最終受付が15:00となっているため、午後からでも十分に釣りを楽しむことができます。\n太海フラワー磯釣りセンターのおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 釣り場環境と特徴 \u0026nbsp; 太海フラワー磯釣りセンターは、千葉県鴨川市の海岸沿いに位置する海上釣り堀施設です。施設の特徴として以下の点が挙げられます。\n施設提供の統一された釣り具を使用するため、初心者でも扱いやすい キャッチ\u0026amp;リリース方式により、魚の扱いに不慣れでも安心 スタッフがサポートしてくれるため、釣り初体験でも楽しめる 海岸線の景観が美しく、釣り以外でも楽しめる環境 おすすめの釣り方とコツ \u0026nbsp; 太海フラワー磯釣りセンターでは、施設が提供する統一された釣り具を使用するため、特別な準備は必要ありません。以下に主なターゲット魚種ごとの釣りのコツを紹介します。\nイサキ・シマアジ向けの釣り方\n中層を意識したタナ設定が効果的 エサは施設提供のものを使用し、食いが悪い時はエサの補充（200円）を検討 アタリがあったら慌てず、しっかりとアワセを入れる イシダイ・イシガキダイ向けの釣り方\n底付近を狙う釣り方が基本 強い引きが特徴的な魚種のため、ドラグ設定はスタッフに相談 根に潜られないよう、かかったら迅速に浮上させる メジナ・カサゴ向けの釣り方\n比較的釣りやすい魚種で初心者におすすめ エサに対する反応が良いため、丁寧なエサ付けを心がける 小さなアタリも見逃さないよう、ウキの動きに注意を払う 施設スタッフが親切にサポートしてくれるため、分からないことがあれば遠慮なく質問することをおすすめします。\n太海フラワー磯釣りセンターへのおすすめアクセス情報 \u0026nbsp; 車でのアクセス｜おすすめ！ \u0026nbsp; 太海フラワー磯釣りセンターへは、車でのアクセスが最も便利です。\n東京駅から：約2時間（首都高速→館山自動車道→国道128号線経由） 千葉市から：約1時間30分（千葉東金道路→圏央道→館山自動車道経由） 館山自動車道「君津IC」から約45分 施設周辺は観光地のため、特に週末や大型連休中は道路が混雑する可能性があります。時間に余裕を持った移動計画をおすすめします。\n電車でのアクセス \u0026nbsp; 公共交通機関を利用する場合のアクセス方法：\nJR内房線「太海駅」から徒歩約10分 東京駅からJR特急「わかしお」で約2時間、太海駅下車 千葉駅からJR内房線普通電車で約1時間30分 太海駅は比較的小さな駅のため、電車の本数に注意が必要です。事前に時刻表を確認しておくことをおすすめします。\n近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 鴨川エリアは観光地として人気が高く、様々な価格帯の宿泊施設が揃っています。\n【最安】予算を抑えたい方向け\nビジネスホテルや民宿：5,000円～8,000円程度 例：鴨川グランドタワー、ペンション系の宿泊施設など 【平均】標準的な宿泊施設\n温泉旅館やリゾートホテル：10,000円～15,000円程度 例：鴨川温泉の老舗旅館、海の見えるホテルなど 【高くてもいい】快適さを重視する方向け\n高級リゾートホテル：20,000円以上 例：鴨川シーワールドホテル、オーシャンビューの高級旅館など レンタカー 鴨川駅周辺には複数のレンタカー会社があります。\nトヨタレンタカー鴨川駅前店 ニッポンレンタカー鴨川駅前店 タイムズカーレンタル鴨川店 料金は1日あたり6,000円～12,000円程度です。運転免許証は必ず持参してください。\n実際に利用したユーザーの声を抜粋 \u0026nbsp; 40代男性「★★★★★｜5.0」 \u0026nbsp; 初めて海上釣り堀を体験しましたが、スタッフの方がとても親切で安心して楽しめました。手ぶらで行けるのが本当に助かります。キャッチ\u0026amp;リリースなので魚の処理に困ることもなく、純粋に釣りを楽しめました。\n30代女性「★★★★☆｜4.0」 \u0026nbsp; 家族で利用しました。子供たちも初めての釣り体験でしたが、スタッフさんが丁寧に教えてくれて、みんなで魚を釣ることができました。料金も手頃で、観光の合間に気軽に立ち寄れるのが良いですね。\n50代男性「★★★★★｜5.0」 \u0026nbsp; 鴨川観光の際に立ち寄りました。景色も良く、釣り以外でも楽しめます。持ち帰りはできませんが、釣りの楽しさを純粋に味わえる施設だと思います。また来たいです。\n20代女性「★★★★☆｜4.0」 \u0026nbsp; 彼氏と一緒に初めて釣りにチャレンジしましたが、最初は魚を触るのが怖かったのですが、スタッフの方が代わりに外してくれるので安心でした。意外と夢中になって楽しい時間を過ごせました。\n60代男性「★★★☆☆｜3.0」 \u0026nbsp; 持ち帰りができないのが少し残念でした。釣った魚を家で調理するのも釣りの楽しみの一つだと思うので、そこは物足りなく感じました。ただ、手軽さは確かに魅力的です。\n持ち帰りができない点については賛否が分かれますが、その分手軽さや初心者向けの配慮が行き届いている点で多くの方に評価されています。特に釣り初心者や家族連れには、魚の処理を気にせず純粋に釣りを楽しめる環境として高く評価されています。\n【まとめ】太海フラワー磯釣りセンターをおすすめしたい理由 \u0026nbsp; 太海フラワー磯釣りセンターは、関東地方で手軽に海上釣り堀を体験できる貴重な施設として、多くの釣り愛好家におすすめできます。\nおすすめする主な理由：\n初心者に優しい環境：キャッチ\u0026amp;リリース方式により、魚の処理に不慣れな方でも安心して楽しめます 手ぶら利用可能：釣り具一式がレンタル料金に含まれており、思い立った時に気軽に訪れることができます アクセスの良さ：東京から約2時間、電車でも太海駅から徒歩約10分と交通の便が良好です 観光との相性：鴨川の観光スポットと組み合わせやすく、旅行プランに組み込みやすい立地です リーズナブルな料金：1,500円という手頃な料金設定で、海上釣り堀初体験の敷居を下げています 特に海上釣り堀が初めての方、魚の処理に慣れていない女性や子供連れの家族、観光ついでに釣り体験をしたい方にとって、非常に利用しやすい施設といえます。鴨川エリアは温泉や水族館などの観光資源も豊富なため、釣り以外の楽しみも含めた総合的な旅行プランとして活用することをおすすめします。\n年中無休で営業しているため、季節を問わず楽しめる点も大きな魅力です。関東地方で手軽に海上釣り堀を体験したい方は、ぜひ太海フラワー磯釣りセンターを訪れてみてください。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 62,
        href: "/osaka/totto-park-koshima/",
        title: "【大阪府】とっとパーク小島｜絶景の海釣り公園！青物・マダイが...",
        description: "「船に乗らなくても、船釣りと同じような大物を釣りたい！」 「家族で安全に、でも本格的な釣りを楽しみたい」",
        
        
        content: "「船に乗らなくても、船釣りと同じような大物を釣りたい！」 「家族で安全に、でも本格的な釣りを楽しみたい」\nそんな贅沢な悩みを解決してくれるのが、大阪府岬町にある**「とっとパーク小島」**です。\n関西空港の埋め立て土砂を積み出すために使われていた桟橋（リール）を、そのまま海釣り公園として再利用したこの施設。 最大の特徴は、**「海に突き出た桟橋」**であること。\n岸から離れているため潮通しが抜群に良く、回遊魚の魚影は関西トップクラス。 ブリやメジロなどの大型青物、マダイ、ヒラメなど、通常の堤防ではなかなかお目にかかれない魚がバンバン上がります。\n絶景のロケーションで、大物との格闘を楽しんでみませんか？\nとっとパーク小島の魅力3選 \u0026nbsp; 1. 「天然の漁礁」となっている巨大構造物 \u0026nbsp; 海中深くまで伸びる巨大な橋脚そのものが、魚たちにとって最高の住処（漁礁）となっています。 カサゴ、メバル、イシダイなどの居着きの魚が豊富に生息しており、足元を探るだけでも釣果が期待できます。さらに、その橋脚にぶつかる複雑な潮の流れがプランクトンを巻き上げ、エサを求めて回遊する青物を強力に引き寄せます。\n2. 圧倒的なコスパで釣り放題 \u0026nbsp; 大人1日1,500円というリーズナブルな料金設定も大きな魅力です。これで朝から晩まで時間を気にせず釣り放題。 通常、これだけの釣果を求めて渡船で沖堤防に行くと3,000円〜4,000円はかかります。トイレや売店完備の快適な環境でこの価格は、まさに破格と言えるでしょう。\n3. 設備が充実でファミリーも安心 \u0026nbsp; 管理棟には清潔なトイレ、飲み物の自販機、カップ麺などの軽食スペースが完備されています。 釣り場の足場は金網（グレーチング）状でフラットになっており、柵もしっかりしているため、子供連れでも安心して楽しめます。 ※金網の隙間から小物を落とさないように注意が必要です！\nとっとパーク小島の基本情報 \u0026nbsp; 項目 詳細 施設名 とっとパーク小島 住所 〒599-0301 大阪府泉南郡岬町多奈川小島455-1 営業時間 【3月〜11月】6:00〜20:00\n【12月〜2月】7:00〜18:00 定休日 金曜日（祝日の場合は営業、翌週営休）\n年末年始 料金 大人：1,500円（15時以降 1,000円）\n小・中学生：750円（15時以降 500円） 設備 トイレ、売店（エサ・軽食）、展望デッキ、休憩所 駐車場 無料（整理券配布あり） 公式サイト とっとパーク小島 人気すぎて「整理券」が必要？！ \u0026nbsp; とっとパーク小島は、週末や青物シーズンになると超満員になることで有名です。 良いポイント（特に先端付近）を確保するために、前日の夜から駐車場で待機する人もいるほど。混雑時は整理券が配布されます。\n「のんびり楽しみたい」\n平日や、釣果は落ち着きますが午後の「イブニング料金（15時〜）」利用がおすすめ。 「本気で場所取りしたい」\n開園時間のかなり前から並ぶ覚悟が必要です。 とっとパーク小島の攻略法・アドバイス \u0026nbsp; 1. 「潮の流れ」を読む \u0026nbsp; ここは潮の流れが速いことで有名です。\n「激流」: 大潮の日などは川のように流れます。オモリを重くする（30号〜以上）など、流れに負けない対策が必要です。 「潮止まり」: 流れが緩んだ一瞬がチャンス！カワハギや根魚、イカを狙うならこのタイミングを逃さないようにしましょう。 2. サビキ釣りは「下カゴ」推奨 \u0026nbsp; 潮が速いので、仕掛けを安定させるために、一番下にオモリ付きのカゴをつける**「下カゴ式」**のサビキ仕掛けが扱いやすいです。 アジ、サバ、イワシが回遊してくれば、初心者でも簡単に数釣りが楽しめます。\n3. 足元の「大物」を見逃すな \u0026nbsp; 先端エリアが一番人気ですが、実は手前や中央付近の**足元（橋脚周り）**にも大物が潜んでいます。 カワハギ、サンバソウ（イシダイの幼魚）、アコウ（キジハタ）など、美味しい高級魚が足元で釣れることも多い穴場スポットです。「場所が取れなかった」と諦めず、足元を探ってみてください。\n釣れる魚種と時期 \u0026nbsp; 春: メバル、カサゴ、コウイカ、マダイ 夏: アジ、サバ、タコ、ツバス（ブリの幼魚） 秋: アオリイカ、タチウオ、ハマチ・メジロ（青物全般）、カワハギ 冬: カレイ、ヒラメ、メバル アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 阪神高速湾岸線・泉佐野南ICから国道26号を南下、深日ロータリーを右折して約20分。 ※「道の駅とっとパーク小島」の看板が目印です。 駐車場: 無料（第1・第2駐車場あり）。\n公共交通機関 \u0026nbsp; 南海電鉄多奈川線「多奈川駅」から、コミュニティバス「ミニループバスみさき」に乗車、「とっとパーク小島」下車すぐ。 ※バスの本数が少ないので、事前に時刻表を必ず確認してください。\nまとめ：関西で「夢」を見るならここ！ \u0026nbsp; とっとパーク小島は、**「手軽さ」と「夢の大きさ（釣果）」**のバランスが素晴らしい釣り場です。\n隣に並んだ子供が巨大なブリを釣り上げたり、自分が何気なく落とした仕掛けにマダイが食いついたり…。 そんなドラマが日常的に起こるのが、この場所の魔力です。\n週末は混み合いますが、平日や夕方の時間を狙って、ぜひ一度「海上の楽園」を体験してみてください！ ライフジャケットの着用（貸出なし、持参推奨）をお忘れなく！"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 63,
        href: "/osaka/kaijo-tsuribori-opa/",
        title: "【大阪府】海上釣り堀オーパ｜ボウズ保証あり！初心者も安心の「...",
        description: "「初めての釣り堀、もし1匹も釣れなかったらどうしよう…」 「高いお金を払ってボウズ（0匹）なんて、絶対イヤだ！」",
        
        
        content: "「初めての釣り堀、もし1匹も釣れなかったらどうしよう…」 「高いお金を払ってボウズ（0匹）なんて、絶対イヤだ！」\nそんな不安を抱える釣りデビュー組に、最強の味方を紹介します。 大阪・岬町にある**「海上釣り堀オーパ」**です。\nここの最大の特徴は、**「ボウズ保証（お土産）」**があること。 万が一、魚の機嫌が悪くて1匹も釣れなくても、必ずマダイ（または同等の魚）をお土産としてプレゼントしてくれます。 「手ぶらで帰ることは絶対にない」という安心感は、初心者のプレッシャーを消し去り、純粋に釣りを楽しくさせてくれます。\nもちろん、ベテラン向けの「オーパコース」も用意されており、こちらは保証こそありませんが、超大物・高級魚が乱舞するエキサイティングなステージです。\n海上釣り堀オーパの基本情報 \u0026nbsp; 項目 詳細 施設名 海上釣り堀オーパ 住所 〒599-0311 大阪府泉南郡岬町多奈川谷川3821 営業時間 7:00〜13:30（受付 6:00〜） 定休日 水曜日・第2第3火曜日（祝日の場合は営業） 料金 一般コース：男性12,100円、女性8,800円、子供6,600円\nオーパコース：16,500円（男女・子供同額） 設備 トイレ、無料休憩所、エサ販売、レンタル竿あり 駐車場 あり（無料・約50台） 公式サイト 海上釣り堀オーパ コース選びのポイント \u0026nbsp; 一般コース: 通常の釣り堀。ボウズ保証あり。ファミリーや初心者は絶対こっち！ オーパコース: 上級者向け。ボウズ保証なし。その代わり、放流される魚がデカイ！数も多い！ハイリスク・ハイリターンな戦場です。 オーパの魅力3選 \u0026nbsp; 鉄壁の安心感「ボウズ保証」 これがあるだけで、釣りの楽しさが倍増します。「釣らなきゃ…」という焦りがないので、のんびりと糸を垂らすことができます。特に、子供連れのお父さんにとっては、「パパ、釣れないの？」という悲劇を回避できる神システムです。\n夢の「オーパコース」 腕に覚えがあるなら、迷わずオーパコースへ。 通常コースでは見かけないような大型のクエ、トラフグ、巨大カンパチなどが放流されます。「質より量」も「量より質」も満たしてくれる、関西屈指の高活性イケスです。\nスタッフのサポートが手厚い オーパのスタッフは、初心者を見かけると積極的に声をかけてくれます。 「タナは◯メートルだよ」「あそこに魚がいるよ」とアドバイスをくれるだけでなく、釣れない時間が続くと**「放流」**で活性を強制的に上げてくれることも！\nこんな人に最適！ \u0026nbsp; 絶対にお土産が欲しい人: 今夜のおかずは確定させたい方。 釣り堀デビューの方: 最初の成功体験を作るには最高の場所です。 ギャンブラーな釣り師: オーパコースで一攫千金（高級魚乱獲）を狙いたい方。 オーパの攻略法 \u0026nbsp; 1. 「脈釣り（みゃくづり）」で攻める \u0026nbsp; ウキを使わない「脈釣り」がここでは有効です。 竿先や手元に伝わる「コンッ」という小さな変化を感じ取って合わせる釣り方です。 繊細なアタリも逃さず、釣果倍増のチャンス！ ※レンタル竿はウキ釣り仕掛けが多いので、Myタックルがある人は脈釣り仕様で挑みましょう。\n2. オーパコースは「太仕掛け」で \u0026nbsp; オーパコースに挑む場合、一般コースと同じ仕掛けでは瞬殺されます。 ハリス（針がついている糸）は最低でも4号、青物狙いなら6号〜8号を使いましょう。 かかった魚に主導権を渡すと、隣の人とオマツリしてしまいます。強引に引き寄せるパワーが必要です。\n3. エサは「多種類」用意する \u0026nbsp; ダンゴエサ（黄色・赤） ササミ、エビ（むき身） 活きアジ（青物用） カツオの切り身 最低でもこの4種類は持っていきましょう。 「当たりエサ」は時間によって変わります。周りの人が何で釣れているか、チラ見するのも立派な戦略です。 釣れる魚種と時期 \u0026nbsp; 通年: マダイ、シマアジ 春〜秋: メジロ、カンパチ、ヒラマサ、イシガキダイ 冬: トラフグ、サーモン、クロソイ、ヒラメ アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 大阪市内から: 阪神高速湾岸線・泉佐野南ICから国道26号を南下、深日ロータリーを右折し、海岸沿いを走って約20分。 駐車場: 無料。 注意点 \u0026nbsp; 公共交通機関（電車）でのアクセスは非常に厳しいです（最寄りの多奈川駅からかなり距離があります）。車またはレンタカー必須です。 道中の海岸線は景色が良いですが、カーブが多いので安全運転で！ まとめ：ここなら「ボウズ」は怖くない！ \u0026nbsp; 海上釣り堀オーパは、「釣り人のプライド」と「お土産」の両方を守ってくれる優しい釣り堀です。\n初心者には優しく、上級者には激しいファイトを提供してくれる、懐の深さが魅力。 「今日は絶対に魚が食べたい！」 そう思ったら、クーラーボックスを持ってオーパへGo！ 帰りの車内は、きっと大漁の話で盛り上がるはずです。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 64,
        href: "/osaka/kaijo-tsuribori-misaki/",
        title: "【大阪府】海上釣堀 岬｜深日港からすぐ！電車で行ける貴重な海...",
        description: "「釣り堀に行きたいけど、車がない…」 「いきなり1万円のコースはちょっと怖いから、安く体験したい」",
        
        
        content: "「釣り堀に行きたいけど、車がない…」 「いきなり1万円のコースはちょっと怖いから、安く体験したい」\nそんな悩める釣り人の願いを叶えてくれるのが、大阪府岬町にある**「海上釣堀 岬」**です。\nここの最大の特徴は、南海電鉄「深日港駅」から徒歩でアクセスできること！ 「車必須」と言われがちな海上釣り堀業界において、電車でクーラーボックスを引いて行ける数少ないスポットです。\nさらに、マダイだけを狙う格安コースも用意されているため、「まずは安く雰囲気を味わいたい」という初心者にも最適。 もちろん、ガッツリ大物を狙いたい上級者向けのコースも完備しています。\n海上釣堀 岬の基本情報 \u0026nbsp; 項目 詳細 施設名 海上釣堀 岬 住所 〒599-0303 大阪府泉南郡岬町深日2917 営業時間 7:00〜14:00（受付 6:20〜） 定休日 水曜日（祝日の場合は営業）、元日 料金 一般コース：男性11,000円、女性・子供5,500円\nサンクスコース：一律5,500円（半日・一部魚種限定）など 設備 トイレ、有料駐車場、休憩所、エサ販売（最低限） 駐車場 あり（有料：普通車600円） 公式サイト 海上釣堀 岬 プラン選びのポイント \u0026nbsp; 一般コース: ブリ、カンパチ、シマアジなど全魚種OK。ガッツリ釣りたい人向け。 サンクスコース: 基本的にマダイのみの放流。その分、料金が5,500円と破格！練習やお試しに最適です。 岬の魅力3選 \u0026nbsp; 奇跡の「駅チカ」釣り堀 最寄りの「深日港駅」から徒歩約10分〜15分。 「電車で海上釣り堀」というスタイルが実現できます。運転の疲れを気にせず、帰りの電車でビールを飲みながら帰る…なんて贅沢も可能です。\n初心者に優しい「サンクスコース」 海上釣り堀の相場は1万円〜1.5万円ですが、サンクスコースなら5,500円。 半額以下で「マダイの強い引き」を体験できます。「タイのお刺身が食べたい」という動機なら、このコースが圧倒的にコスパ最強です。\n大放流イベントが熱い 「シマアジ祭り」や「トラフグ祭り」など、特定の魚種を大量放流するイベントを頻繁に行っています。 狙いのターゲットが決まっているなら、イベント日を狙って予約するのが賢い攻略法です。\nこんな人に最適！ \u0026nbsp; 電車アングラー: 車を持っていなくても、本格的な海上釣りが楽しめます。 釣り堀のお試し: 「高いお金を払って失敗したくない」という方は、まずサンクスコースへ。 ファミリー: 女性・子供料金が安いので、家族連れのお財布にも優しいです。 岬の攻略法 \u0026nbsp; 1. タナ（深さ）は「底」が基本 \u0026nbsp; 岬の深さは水深7m〜8mほど。 まずは底から50cm〜1m上を狙うのが鉄則です。 根掛かり（網に針が引っかかること）しないギリギリを攻められるかが、釣果の分かれ目になります。\n2. 「脈釣り」で数釣りを目指す \u0026nbsp; レンタル竿のようなウキ釣りも良いですが、竿先でアタリを取る「脈釣り」が圧倒的に有利です。 特にマダイは、エサを咥えても違和感があるとすぐに離します。 脈釣りなら、その瞬間にアワセを入れることができます。\n3. エサは「黄色」が強い \u0026nbsp; ここのマダイは、「マダイイエロー」 などの黄色いダンゴエサへの反応がすこぶる良いです。 迷ったらまずは黄色系からスタート。 食いが渋ったら、ササミやアルゼンチン赤エビ（スーパーで売ってるやつでOK）を使いましょう。\n釣れる魚種と時期 \u0026nbsp; 通年: マダイ、シマアジ 春〜秋: カンパチ、メジロ（ブリ）、ヒラマサ 冬: クロソイ、トラフグ、サーモン アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 大阪市内から: 阪神高速湾岸線・泉佐野南ICから国道26号を南下、深日ロータリーを直進してすぐ。約1時間15分。 駐車場: 有料駐車場あり（600円）。 公共交通機関（おすすめ！） \u0026nbsp; 南海本線「みさき公園駅」で多奈川線に乗り換え、「深日港駅」下車。 駅から徒歩約10分〜15分。平坦な道なので、キャリーカートにクーラーボックスを積んで歩けます。 まとめ：5,500円で始める「大人の休日」 \u0026nbsp; 海上釣堀 岬は、**「手軽さ」と「コスパ」**において大阪最強クラスの釣り堀です。\n「今度の週末、ちょっと贅沢してタイでも釣ってみるか」 そんな軽い気持ちで出かけられるのがここの良さ。 5,500円でお土産のマダイと、非日常のワクワクが手に入るなら、安いと思いませんか？ ぜひ、電車に揺られてのんびり釣行を楽しんでみてください。"
      })
      .add(
      
      
      
      
      
      {
        id: 65,
        href: "/osaka/umizuri-port-tajiri/",
        title: "【大阪府】海釣ぽーと田尻｜雨でも安心！橋の下にある全天候型釣り堀",
        description: "「せっかくの休日なのに雨予報…釣りは中止かな」 「子供を連れて行きたいけど、直射日光が心配」",
        
        
        content: "「せっかくの休日なのに雨予報…釣りは中止かな」 「子供を連れて行きたいけど、直射日光が心配」\nそんな天気の悩みを一発で解決してくれるのが、大阪りんくうエリアにある**「海釣ぽーと田尻」**です。\nここの最大の特徴は、「関西国際空港連絡橋」の高架下に位置していること。 巨大な橋が屋根代わりとなり、雨に濡れずに釣りが楽しめます。また、夏の強烈な日差しもカットしてくれるので、快適さは抜群。\nそして、ただ快適なだけじゃありません。高架下の地形変化と、驚異の**「1日4回放流」**によって、魚のスイッチが入りっぱなし！ 「快適に、たくさん釣りたい」という欲張りな願いを叶えてくれる、都市型釣り堀の決定版です。\n海釣ぽーと田尻の基本情報 \u0026nbsp; 項目 詳細 施設名 海釣ぽーと田尻 住所 〒598-0091 大阪府泉南郡田尻町りんくうポート北 営業時間 7:00〜14:00（受付 6:30〜） 定休日 火曜日（祝日の場合は営業）、元日 料金 一日コース：男性11,000円、女性・子供5,500円\nサンクスコース：5,500円（男女子供一律） 設備 トイレ、休憩所、エサ販売、レンタル竿あり 駐車場 あり（無料） 公式サイト 海釣ぽーと田尻 コースの選び方 \u0026nbsp; 一日コース: 全魚種対応、放流4回。ガッツリ釣りたい人向け。 サンクスコース: 筏限定、放流魚種限定（主にマダイ）。その分5,500円と格安！ 半日コース: 10:30〜入場。朝が苦手な人や午後から遊びたい人に。 海釣ぽーと田尻の魅力3選 \u0026nbsp; 最強の「全天候型」フィールド 雨が降ってもカッパ不要（風向きによりますが、ほぼ濡れません）。 真夏でも直射日光が当たらないので、熱中症リスクが大幅に下がります。 子供や女性連れのファミリーにとって、この環境は神レベルです。\n驚異の「1日4回放流」 通常の釣り堀は1日1〜2回の放流ですが、田尻は4回も放流します！ （※一日コースの場合） 魚の活性が下がる「魔の時間帯」がほとんどなく、常に誰かの竿が曲がっている状態が続きます。\nアクセス抜群 「りんくうプレミアム・アウトレット」のすぐ近く。 釣りの後に食事や買い物を楽しむのも簡単です。大阪方面からのアクセスも良く、気軽に行ける立地が魅力です。\nこんな人に最適！ \u0026nbsp; 雨男・雨女さん: ここなら天気に予定を左右されません。 ファミリー: 日焼けや雨濡れを気にせず、快適に楽しめます。 数釣り派: 頻繁な放流タイムで、常にチャンスがあります。 田尻の攻略法 \u0026nbsp; 1. 橋脚周り（シェード）を狙う \u0026nbsp; 橋の下とはいえ、光の当たり具合で明暗ができます。 魚は暗い場所（シェード）を好むので、影の境界線や橋脚周りを重点的に狙いましょう。 特に日が高くなってからは、イケスの隅や影の部分に魚が溜まります。\n2. エサの自由度が高い \u0026nbsp; 田尻は「冷凍エサ」の持ち込み制限が比較的緩いです（※生エサやダンゴは要確認）。 スーパーで買った冷凍イワシやサンマの切り身、甘エビなどが威力を発揮します。 「人が使っていないエサ」を投げ込むと、スレた魚が飛びついてきます。\n3. 放流直後は「手返し」勝負 \u0026nbsp; 1日4回も放流があるということは、確変タイムが4回あるということ。 放流直後は魚が興奮しているので、**簡単な仕掛け（ウキ下浅め）**で手返しよく釣りましょう。 ここで数を稼げるかが、竿頭への近道です。\n釣れる魚種と時期 \u0026nbsp; 通年: マダイ、シマアジ 春〜秋: カンパチ、メジロ、ヒラマサ 冬: クロソイ、トラフグ、サーモン、クエ（！） アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 大阪市内から: 阪神高速湾岸線「泉佐野南IC」より約10分。 「りんくうタウン」方面へ進み、田尻漁港を目指してください。 駐車場: 無料。 注意点 \u0026nbsp; ナビの設定によっては漁港の反対側に案内されることがあります。「田尻漁港」または「海釣ぽーと田尻」で正確に検索してください。 まとめ：快適すぎて帰りたくない？ \u0026nbsp; 海釣ぽーと田尻は、釣りの大敵である「天気」を味方につけた希有な施設です。\n雨音を聞きながら、濡れずに快適にマダイを釣る。 そんな優雅な休日を過ごせるのは、ここだけかもしれません。 「今週末、雨っぽいなぁ…」と思ったら、迷わず田尻を予約しましょう！ そこには、天候に関係なく元気な魚たちが待っています。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 66,
        href: "/osaka/koshima-sea-fishing-pond/",
        title: "【大阪府】小島養漁場｜入り江を丸ごと釣堀に！ルアーもOKな自...",
        description: "「釣り堀の不自然な雰囲気がちょっと苦手…」 「エサ釣りだけじゃなく、ルアーで青物と勝負したい！」",
        
        
        content: "「釣り堀の不自然な雰囲気がちょっと苦手…」 「エサ釣りだけじゃなく、ルアーで青物と勝負したい！」\nそんな本格派アングラーにおすすめなのが、大阪府岬町にある**「小島養漁場」**です。\nここは一般的な「四角いイケス」の釣り堀ではありません。 自然の入り江を漁網で仕切っただけの、限りなく海に近い環境です。 潮の干満がダイレクトに影響し、魚の引きも野生そのもの。\nそして何より嬉しいのが、ルアー釣りが可能であること（エリア・ルール制限あり）。 自分の愛用タックルで、ブリやカンパチを仕留める快感は格別です。 夜にはアジングやメバリングも楽しめる、自由度の高いフィールドへようこそ！\n小島養漁場の基本情報 \u0026nbsp; 項目 詳細 施設名 海洋釣り堀 小島養漁場 住所 〒599-0314 大阪府泉南郡岬町多奈川小島815 営業時間 【1日券】6:00〜17:00\n【午前券】6:00〜12:00\n【午後券】12:00〜17:00\n【ナイター】17:30〜22:00（金土日祝のみ） 定休日 年中無休（悪天候時は休園あり） 料金（大人） 1日券：7,000円\n午前券：5,000円\n午後券：4,000円\nナイター：2,500円 設備 トイレ、食堂、自販機、休憩所 駐車場 あり（無料） 公式サイト 小島養漁場 料金の魅力 \u0026nbsp; 他の海上釣り堀が1万円オーバールールの中、小島養漁場は1日券で7,000円と非常にリーズナブル。 さらにナイターなら2,500円で楽しめます。\n小島養漁場の魅力3選 \u0026nbsp; ルアーマンの聖地 海上釣り堀の多くは「ルアー禁止」ですが、ここは違います。 専用エリアでは思う存分ルアーを投げられます。メタルジグで青物を狙うもよし、ワームでアジを狙うもよし。エサ釣りの待ち時間にルアーを投げる…といった二刀流も可能です。\n圧倒的な「ネイティブ感」 入り江を仕切っているだけなので、足元は自然の磯や堤防と同じです。 海底の地形変化もあり、魚が居着くポイントを探す「読み」が必要になります。 「釣らせてもらう」のではなく「自分で釣る」面白さがあります。\nアジの湧きが凄い 網の目は荒いため、外海から小魚（アジ・イワシなど）が自由に出入りします。 これを追って大型魚の活性も上がりますし、お土産用にサビキでアジを大量確保することも可能です。\nこんな人に最適！ \u0026nbsp; ルアーマン: 大阪で確実に青物の引きを味わいたいならここ。 コスパ重視: 1日遊んで7,000円は破格です。 自然派: コンクリートのイケスでは物足りない方に。 小島養漁場の攻略法 \u0026nbsp; 1. 潮汐（タイドグラフ）を必ずチェック \u0026nbsp; 自然の入り江なので、潮の動きが釣果に直結します。\n上げ潮（満ちてくる時）: 外から新鮮な海水とベイトが入ってくるチャンスタイム。 下げ潮（引いていく時）: 魚が沖に出て行こうとして網際を回遊します。 2. ルアーは「スモールシルエット」 \u0026nbsp; ここのベイト（エサとなる小魚）は、小さなアジやイワシです。 大きなプラグよりも、**シルエットの小さいメタルジグ（20g〜40g）**やジグヘッドリグが圧倒的にに効きます。 カラーは「イワシカラー」や「シルバー系」が鉄板です。\n3. ナイターのアジ・メバルが熱い \u0026nbsp; 金・土・日・祝の夜はナイター営業があります。 常夜灯周りにアジやメバルが群がり、アジングやメバリングの練習に最適。 時折、シーバスやタチウオも混じるので油断できません。\n釣れる魚種と時期 \u0026nbsp; 春〜秋: ブリ、メジロ、ハマチ、カンパチ、アジ（サビキ/アジング） 冬〜春: トラウトサーモン（※これが名物！）、メバル 通年: マダイ アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 大阪市内から: 阪神高速湾岸線・泉佐野南ICから約60分。 道路はずっと海沿いの一本道です。「とっとパーク小島」のさらに奥にあります。 駐車場: 無料。 注意点 \u0026nbsp; 公共交通機関でのアクセスは「多奈川駅」からバスまたはタクシー利用となりますが、本数が少なく不便なため、車での釣行を強く推奨します。 まとめ：野生を取り戻せ！ \u0026nbsp; 小島養漁場は、管理釣り場の安心感と、自然フィールドの荒々しさを兼ね備えたハイブリッドな釣り場です。\n「今日は釣れるかな？」とドキドキしながらルアーを投げ、ガツン！と来る衝撃。 それは、普通の釣り堀では味わえない「狩り」の興奮です。 安くて、広くて、自由。 大阪の端っこにある「ルアーマンの楽園」へ、ぜひ挑戦しに来てください！"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 67,
        href: "/osaka/osaka-sea-fishing-southern/",
        title: "【大阪府】大阪海上釣り堀サザン｜関空対岸で高級魚三昧！ナイタ...",
        description: "「釣り堀の魚なんて、どうせタイだけでしょ？」 「空港の近くで、本格的なビッグファイトができるわけがない」",
        
        
        content: "「釣り堀の魚なんて、どうせタイだけでしょ？」 「空港の近くで、本格的なビッグファイトができるわけがない」\nそんな思い込みを、気持ちよく裏切ってくれるのが**「大阪海上釣り堀サザン」**です。\n関西国際空港の対岸という都会的なロケーションながら、海の中はまさにモンスターハウス。 マダイはもちろん、ブリ、カンパチ、シマアジ、そして幻の高級魚クエやマハタまでもが放流されています。 飛行機の離発着を眺めながら、竿が根元から曲がる強烈な引きを味わう——。 そんな「非日常」な体験が、大阪市内からわずか1時間で手に入ります。\n大阪海上釣り堀サザンの基本情報 \u0026nbsp; 項目 詳細 施設名 大阪海上釣り堀サザン 住所 〒598-0047 大阪府泉南市りんくう南浜2番202（樽井漁協内） 営業時間 7:00〜14:00（受付 6:00〜）\n※ナイター営業あり（詳細は要確認） 定休日 木曜日（祝日の場合は営業）、元日 料金 男性：12,100円\n女性・小学生：7,700円 設備 トイレ、駐車場（無料）、休憩所、エサ販売 駐車場 あり（無料） 公式サイト 大阪海上釣り堀サザン 料金に含まれるもの \u0026nbsp; 釣り放題: 釣った魚は全て持ち帰りOK！ 魚の数: 定期的に放流タイムがあり、活性が上がります。 サザンの魅力3選 \u0026nbsp; 圧倒的な「魚種の豊富さ」 ただのマダイ釣り堀ではありません。 ブリ、ヒラマサ、カンパチの「青物御三家」に加え、イシダイ、イシガキダイ、そして超高級魚のクエやマハタまで！ 「何が掛かるかわからない」ドキドキ感は、サザンならではの魅力です。\n夏の風物詩「ナイター営業」 夏期限定で、夕方から夜にかけてのナイター営業を行っています。 日中の猛暑を避け、涼しい夜風に当たりながら電気ウキが沈むのを待つ…。 幻想的で快適な釣りは、デートや仕事帰りのリフレッシュにも最高です。\nアクセス＆周辺環境が最高 「りんくうプレミアム・アウトレット」や「イオンモールりんくう泉南」がすぐ近く！ お父さんと子供は釣り、お母さんはショッピング、帰りは「泉南りんくう公園（SENNAN LONG PARK）」でBBQ…といった、完璧な休日プランが組めます。\nこんな人に最適！ \u0026nbsp; グルメな釣り人: クエやマハタなど、お店で食べたら数万円する魚を自分の手で釣り上げたい方。 カップル・夫婦: アウトレットが近いので、釣りの前後もデートコースに困りません。 体力に自信がない方: 夏のナイターなら、暑さを気にせず快適に楽しめます。 サザンの攻略法 \u0026nbsp; 1. タナ（深さ）合わせが命 \u0026nbsp; 海上釣り堀の基本にして奥義です。\n朝イチ: 魚が浮いていることが多いので、浅め（3〜4m）から探る。 日中: 底付近（網スレスレ）に溜まることが多い。 ※タナ取りオモリを使って、こまめに深さを調整しましょう。 2. 「角（カド）」を狙え \u0026nbsp; イケスの四隅（コーナー）は、魚が溜まりやすい一級ポイントです。 特にマダイやイサキは角に群れる傾向があります。 空いているなら、積極的に角に仕掛けを投入しましょう。\n3. エサのローテーション \u0026nbsp; 魚も同じエサだと飽きます。\n基本: マダイイエローなどのダンゴエサ。 特効薬: ササミ（黄色漬け）、キビナゴ、活きアジ（青物用）。 プレミアム魚狙い: カツオのハラモや、少し大きめのエサでクエを狙ってみるのも面白いです。 釣れる魚種と時期 \u0026nbsp; 通年: マダイ、シマアジ 春〜秋: ブリ、カンパチ、ヒラマサ、イシダイ 夏: フエフキダイ、タマクエ 冬: クロソイ、サーモン、トラフグ アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 大阪市内から: 阪神高速湾岸線「泉佐野南IC」より約15分。 和歌山方面から: 阪和自動車道「泉南IC」より約15分。 駐車場: 漁港内の広いスペースに駐車可能（無料）。 公共交通機関 \u0026nbsp; 南海本線「樽井駅」からタクシーで約5分（徒歩だと20分以上かかるためタクシー推奨）。 タクシーが捕まりにくい場合があるため、配車アプリの利用がおすすめ。 まとめ：高級魚ハンターになろう \u0026nbsp; 大阪海上釣り堀サザンは、**「手軽に」「高級魚と」**出会える夢のフィールドです。\nスーパーで眺めるしかなかったあの魚が、あなたのクーラーボックスに入るかもしれません。 強烈な引き込みに耐え、水面に魚体が浮いた瞬間の興奮は、一度味わったら病みつきになります。\n今度の休日は、クーラーボックスを空っぽにして（帰りは満タンで！）、泉南の海へ出かけてみませんか？"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 68,
        href: "/osaka/nanko-fishing-park/",
        title: "【大阪府】南港魚つり園護岸｜入場無料！市内から30分で楽しむ...",
        description: "「大阪市内で、無料で安全に遊べる釣り場はないかな？」 「子供が急に『釣りに行きたい！』と言い出したけど、道具も知識もない…」",
        
        
        content: "「大阪市内で、無料で安全に遊べる釣り場はないかな？」 「子供が急に『釣りに行きたい！』と言い出したけど、道具も知識もない…」\nそんなパパ・ママの救世主となるのが、大阪市住之江区にある**「南港魚つり園護岸」**です。\nなんと入場料は無料。 にもかかわらず、安全な転落防止柵があり、トイレや売店も完備。さらにスタッフさんが常駐していて、レンタル釣具（有料）もあるので手ぶらで行ってもOK。 まさに**「公園に行く感覚」**で、気軽に海釣りを始められるスポットです。\n無料だからといって釣れないわけではありません。 アジやイワシはもちろん、秋にはハマチなどの青物や、タチウオの回遊もあり、大人も興奮するようなターゲットが狙えます。\n南港魚つり園護岸の魅力3選 \u0026nbsp; 1. お財布に優しすぎる「無料」施設 \u0026nbsp; なんと言っても入園料が無料なのが最大の魅力。家族4人で行っても釣り代はタダです。 浮いたお金で、帰りに美味しいランチを食べたり、少し良い仕掛けを買って釣果アップを狙ったりできます。駐車場代はかかりますが、それでも他の有料釣り公園に比べれば圧倒的に格安で一日楽しめます。\n2. 安全・安心の設備でファミリーに最適 \u0026nbsp; 海面からの高さがある護岸ですが、しっかりとした転落防止柵（手すり）が設置されています。小さなお子様が海に落ちるリスクが低く、安心して見守ることができます。 もちろんトイレも完備されており、清掃が行き届いているので女性でも安心。売店ではエサや軽食も販売しています。\n3. 都市近郊なのに「大物」回遊のポテンシャル \u0026nbsp; 大阪湾の奥に位置していますが、潮通しが良い日は驚くような大物が入ってきます。 特に秋のシーズンは、ハマチ・メジロなどの青物やタチウオが回遊。無料の護岸で高級魚が釣れるチャンスがあり、シーズン中は多くのルアーマンで賑わいます。\n南港魚つり園護岸の基本情報 \u0026nbsp; 項目 詳細 施設名 大阪市立 南港魚つり園護岸 住所 〒559-0032 大阪市住之江区南港南6丁目9番3号 営業時間 【4月〜11月】5:00〜19:00\n【12月〜3月】7:00〜17:00 定休日 水曜日\n年末年始（12/29〜1/3） 料金 無料（入場料・釣り代なし） 設備 トイレ、手洗い場、売店（エサ・軽食）、レンタルコーナー 駐車場 あり（有料：最初の30分無料、以降最大1,500円など ※要確認） 公式サイト 大阪市立 南港魚つり園護岸 ルールを守って楽しもう \u0026nbsp; ライフジャケット推奨: レンタル（有料）もあります。子供には必ず着せましょう。 投げ釣り禁止: 本格的な投げ釣りは禁止です（ちょい投げはOKな場合もありますが、混雑時は足元推奨）。 撒き餌（コマセ）禁止: アミエビをカゴに入れるサビキ釣りはOKですが、ヒシャクで撒き餌を撒くフカセ釣り等は禁止です。 南港魚つり園護岸の攻略法・アドバイス \u0026nbsp; 1. 初心者は「サビキ釣り」で決まり \u0026nbsp; ファミリーならサビキ一択です。 5月頃からカタクチイワシ、豆アジが釣れ始めます。 柵があるので竿受け（スーパーパイプ受太郎など）があると便利ですが、なければ柵に竿を立てかけられるので楽ちんです。\n2. 「際（きわ）」を攻めろ！ \u0026nbsp; もともと護岸壁だった場所なので、足元（際）は魚の隠れ家＆回遊ルートになっています。\nガシラ（カサゴ）: 足元の底付近を探ると、一年中狙えます。初心者のブラクリ釣りに最適。 チヌ（クロダイ）: 落とし込み釣りで壁際を狙うベテランが多いです。 タコ: 夏場はタコジグで壁際をトントンするだけでタコが釣れることも。 3. 夕マズメの「ルアー＆ワインド」 \u0026nbsp; 秋（9月〜11月頃）の夕方は、タチウオや青物狙いのチャンスタイム。 メタルジグやワインド釣法（ワームを左右にダートさせる釣り方）で、広範囲を探りましょう。 ※混雑時は周りの人とオマツリ（糸が絡むこと）しないように十分注意してください。\n釣れる魚種と時期 \u0026nbsp; 春: メバル、ガシラ、チヌ、ハネ（シーバス） 夏: アジ、イワシ、サバ、タコ、ツバス 秋: タチウオ、サゴシ、ハマチ、アオリイカ、サヨリ 冬: ガシラ、カレイ アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 阪神高速湾岸線「南港中」または「南港南」出口から約10分。 駐車場: 民間駐車場が隣接（有料）。\n公共交通機関 \u0026nbsp; Osaka Metro ニュートラム「フェリーターミナル駅」下車。 駅からバス（15系統）に乗り、「南港南6丁目」バス停で下車、徒歩すぐ。 ※バスの本数が少ないため、必ず時間を調べておきましょう。 まとめ：大阪の「近場・無料・安心」釣り場 \u0026nbsp; 南港魚つり園護岸は、大都会・大阪にありながら、潮風を感じてリフレッシュできる貴重なスポットです。\n「今週末、どこ行こうかな？」と迷ったら、とりあえずここへ。 竿一本と少しのお金（駐車場代・エサ代）があれば、家族みんなで笑顔になれる休日が待っています！\n夕焼けに染まる大阪湾を眺めながらの釣りは、最高の癒やしになりますよ。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 69,
        href: "/oita/kamae-sea-fishing-tsunchaoh/",
        title: "【大分県】かまえ海上釣り堀 釣っちゃ王｜竿1本でシェアOK！...",
        description: "「海上釣り堀って料金が高いし、釣れなかったら最悪…」 「子供がすぐに飽きるかもしれないから、高いお金は出しにくい」",
        
        
        content: "「海上釣り堀って料金が高いし、釣れなかったら最悪…」 「子供がすぐに飽きるかもしれないから、高いお金は出しにくい」\nそんな不安を持つパパ・ママにこそおすすめしたいのが、大分県佐伯市にある**「かまえ海上釣り堀 釣っちゃ王」**です。\nここの最大の特徴は、**「竿のシェアが可能（交代釣りOK）」なこと。 1人分の料金で、お父さんと子供が交代で竿を握ることができるため、ファミリーのレジャー費を大幅に抑えられます。 さらに、万が一釣れなくても「マダイ2匹のお土産保証」**付き。 九州の豊かな海で育ったブリやカンパチの強烈な引きを、リスクなしで楽しめる「神コスパ」な釣り堀を紹介します。\n釣っちゃ王の基本情報 \u0026nbsp; 項目 詳細 施設名 かまえ海上釣り堀 釣っちゃ王 住所 〒876-2404 大分県佐伯市蒲江大字森崎浦1992 営業時間 受付 6:20〜6:50 / 釣り開始 8:00〜13:00（※季節・天候により変動あり） 定休日 毎週火曜日（祝日の場合は翌日）、1月1日 料金 大人：12,500円\n女性・中学生：9,500円\n子供（小学生）：6,000円\n渡船料（全員）：500円 保証 万が一ボウズでも真鯛2匹プレゼント 設備 貸竿、トイレ（イケス上にあり）、休憩所 公式サイト かまえ海上釣り堀 釣っちゃ王 ここがすごい！3つのポイント \u0026nbsp; 「竿のシェア」OKでコスパ最強 多くの釣り堀では「竿の貸し借り禁止（人数分の料金が必要）」ですが、釣っちゃ王は1本の竿を複数人で使い回せます。 （例：パパが申し込み、疲れたら子供やママにバトンタッチOK） ※入場料（渡船料500円）は全員必要ですが、釣り料金は竿の本数分だけで済みます。\n圧倒的な放流量と魚種 蒲江（かまえ）の豊かな海を利用しているため、魚の活性・味ともに一級品。マダイはもちろん、ブリ、カンパチ、シマアジ、ヒラマサなどの高級魚がバンバン放流されます。\n安心の「お土産保証」 「1匹も釣れなかった…」という悲劇はありません。ボウズの場合でも、マダイ2匹をお土産として貰えます（※釣り終了の回収時にスタッフ申告が必要）。これだけで料金の元が取れるレベルです。\nこんな人に最適！ \u0026nbsp; ファミリー: パパが釣って、子供が巻く。そんな共同作業で大物をゲットできます。 初心者グループ: 4人グループで竿2本を借りて、交代で釣りを楽しむ…なんて使い方も賢いです。 青物ハンター: 九州ならではの強烈な引き（青物）を、安全な足場から楽しみたい方。 釣っちゃ王の攻略法 \u0026nbsp; 1. 「朝イチ」のゴールデンタイムを逃すな \u0026nbsp; 釣り開始（8:00頃）直後が最大のチャンスタイムです。 魚はお腹を空かせているので、仕掛けを入れた瞬間に食ってきます。手返しよく釣るために、エサの準備や仕掛けのチェックは完璧にしておきましょう。\n2. タナ（深さ）は底から探る \u0026nbsp; 基本は「底から30cm〜50cm上」です。 底網に引っかけるリスクはありますが、マダイやシマアジは底付近に溜まります。青物が回遊してきたら、少し浅めのタナを狙いましょう。\n3. スタッフを頼る \u0026nbsp; 釣れない時間は素直にスタッフさんに聞きましょう。「今のタナは？」「どのエサがいい？」と聞けば、親切に教えてくれます。時には魚を目の前に誘導してくれるかも…？\n釣れる魚種と時期 \u0026nbsp; 通年: マダイ、シマアジ 春〜初夏: ヒラマサ、イシダイ 夏〜秋: カンパチ、ブリ（ワラサクラス）、マハタ 冬: ブリ（寒ブリ）、クロソイ アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 大分市から: 東九州自動車道「佐伯IC」または「蒲江IC」を利用して約1時間30分。 駐車場: 無料駐車場あり（港の目の前）。 注意点 \u0026nbsp; 受付時間が朝6:50厳守と早いため、遠方の方は佐伯市内での前泊をおすすめします。 港から釣り場までは船で5分ほど移動します。船酔いが心配な方は酔い止めを飲んでおきましょう。 まとめ：九州で最初の釣り堀ならここ！ \u0026nbsp; 「かまえ海上釣り堀 釣っちゃ王」は、初心者への優しさと、大物釣りの興奮が同居する稀有な施設です。\n竿のシェアができるので、家族旅行のアクティビティとしても最適。 「パパすごい！」と子供に尊敬されるチャンス、ここで掴んでみませんか？ クーラーボックスは、一番大きいサイズを持っていくことを強くおすすめします！"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 70,
        href: "/tokushima/family-tsuribori-tsutteminde/",
        title: "【徳島県】ファミリー釣り堀 釣ってみんでフィッシング｜初心者...",
        description: "「せっかくの休日なのに雨…」「子供を釣りに連れて行きたいけど、海は危ないし日焼けも気になる…」 そんな悩みを一発で解決してくれるのが、徳島市にある「ファミリー釣り堀 釣ってみんでフィッシング」です。",
        
        
        content: "「せっかくの休日なのに雨…」「子供を釣りに連れて行きたいけど、海は危ないし日焼けも気になる…」 そんな悩みを一発で解決してくれるのが、徳島市にある**「ファミリー釣り堀 釣ってみんでフィッシング」**です。\nここはなんと、屋内型の海上釣り堀。屋根があるため、雨でも風でも、夏の猛暑でも冬の寒波でも関係ありません！さらに、海水を引いた本格的なイケスにはマダイやカンパチといった高級魚が泳いでいます。\n「濡れない」「焼けない」「快適」な環境で、本格的な魚とのファイトを楽しめる、ファミリーに最高のレジャースポットをご紹介します。\n釣ってみんでフィッシングの基本情報 \u0026nbsp; 項目 詳細 施設名 ファミリー釣り堀 釣ってみんでフィッシング 住所 〒770-0873 徳島県徳島市東沖洲2丁目14 営業時間 10:00～18:00 定休日 火曜日・水曜日 料金 入場料 600円（竿・エサ代込） ＋ 魚代（買取制） 魚代（例） 1匹あたり一律 2,750円など（※魚種や時期により変動あり、要現地確認） 釣れる魚 マダイ、カンパチ、シマアジ、イサキ、ヒラメ、オマール海老など アクセス 徳島ICより車で約15分 / 徳島駅からバス「東沖洲」行き 公式サイト Fun!Fun!とくしま紹介ページ 独自の料金システム：基本料は激安、釣った分だけお支払い \u0026nbsp; この施設のシステムは非常にユニークです。\n初期費用が安い：入場料600円を支払えば、竿とエサ（ダンゴ）も付いてきます。手ぶらでOKです。 釣った魚は買取：釣れた魚は**リリース禁止（買取）**となります。 例：「今日は2匹釣って帰ろう」→ 入場料600円 ＋ 魚代（2,750円×2匹）＝ 6,100円 ※魚代は目安です。現地で必ず確認してください。 このシステムのメリットは、**「ボウズ（0匹）なら600円しかかからない」というリスクの低さと、「必要な分だけ釣って帰る」**という予算管理のしやすさです。\n全天候型・屋内ファシリティ \u0026nbsp; 倉庫のような巨大な建屋の中に大きなイケスがあります。\n雨の日OK：天候が急変しても安心。旅行のスケジュールが崩れません。 日焼けなし：女性やお子様の肌を守れます。 安全：足場がフラットで柵もしっかりあるため、小さなお子様でも安全です。 釣ってみんでフィッシングの攻略法＆楽しみ方 \u0026nbsp; 1. 高級魚・怪魚釣り体験 \u0026nbsp; イケスの中には、普段スーパーで見かける魚とはレベルの違う魚たちがいます。\nマダイ：定番の赤くて綺麗な魚。引きも楽しい！ カンパチ（青物）：強烈な引き！竿が満月のように曲がります。子供が掛けると引っ張られてしまうかもしれないので、大人がサポートしましょう。 オマール海老：時期によってはこんなレアキャラも！？ 2. 釣った魚をその場で食べる！ \u0026nbsp; 釣った魚は基本的に持ち帰りですが、施設で調理してもらうことも可能です（別料金）。\n調理法：お刺身、塩焼き、煮付け、カルパッチョなど。 イートイン：施設内に食事スペースがあり、釣ってすぐに新鮮な魚料理を堪能できます。 これは子供への食育としても最高の体験になります。「さっきまで泳いでいた魚を、命に感謝していただく」という学びがあります。 アクセス情報 \u0026nbsp; 徳島市中心部やインターチェンジからも近く、アクセス抜群です。\n車でのアクセス \u0026nbsp; **徳島自動車道「徳島IC」**から車で約20分。 マリンピア沖洲という埋立地にあり、道も広く分かりやすいです。無料駐車場も完備。 バスでのアクセス \u0026nbsp; JR徳島駅より徳島市営バス「中央市場行き」または「東沖洲行き」に乗車。 バス停から少し歩きますが、公共交通機関でもアクセス可能です。 実際に利用したユーザーの声 \u0026nbsp; 30代主婦（ファミリー利用） 評価：★★★★★ 「雨の予報だったので急遽予定を変更してここへ。屋内なので子供が濡れずに遊べて助かりました。パパが大きなタイを釣って、子供たちが大興奮！その場でお刺身にしてもらいましたが、甘くてプリプリで最高でした。」\n20代カップル 評価：★★★★☆ 「手ぶらでいけるデートスポットとして優秀。600円で入れるので気軽です。1匹釣れた時点でそこそこの金額になるので（笑）、2人で1匹釣って半分こしました。それでも十分楽しめました。」\n40代男性 評価：★★★★★ 「カンパチの引きが忘れられない。屋内だからといって侮れないパワーでした。スタッフさんがタモ入れを手伝ってくれるので初心者でも安心だと思います。」\nまとめ：釣ってみんでフィッシングはこんな人におすすめ！ \u0026nbsp; 雨の日でも遊べる徳島のレジャースポットを探している人 「海釣りはハードルが高い」と感じている初心者・女性 子供に「釣る・食べる」の体験をさせてあげたいパパママ 短時間でサクッと高級魚をゲットしたい人 天候に左右されない**「快適すぎる釣り堀」**で、徳島の海の幸を手軽にハントしてみませんか？釣りすぎ（お財布へのダメージ）にだけは注意して、エキサイティングな釣りを楽しんでください！"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 71,
        href: "/tokushima/hamabe-tosen-kaijo-tsuribori/",
        title: "【徳島県】浜部渡船 海上釣り堀｜格安30分3,000円！5匹...",
        description: "徳島県南部、海陽町（かいようちょう）。黒潮の恵み豊かなこの地に、知る人ぞ知る「超・短時間決戦型」の海上釣り堀があります。それが「浜部渡船（はまべとせん） 海上釣り堀」です。",
        
        
        content: "徳島県南部、海陽町（かいようちょう）。黒潮の恵み豊かなこの地に、知る人ぞ知る**「超・短時間決戦型」の海上釣り堀があります。それが「浜部渡船（はまべとせん） 海上釣り堀」**です。\nその特徴は、なんといっても**「30分間」**という制限時間設定。 「えっ、短くない？」と思うかもしれません。しかし、これこそがこの釣り堀の最大のメリットなのです。\n「30分 3,000円で、5匹まで釣れる」\nつまり、うまく釣れば1匹あたり600円で高級魚マダイやブリ、カンパチが手に入ることになります。竿もエサも込み。こんなにコスパとタイパ（タイムパフォーマンス）に優れた釣り堀は他にはなかなかありません。\n浜部渡船 海上釣り堀の基本情報 \u0026nbsp; 項目 詳細 施設名 浜部渡船 海上釣り堀 住所 〒775-0501 徳島県海部郡海陽町宍喰浦古目84-4 営業時間 10:00～16:00 定休日 不定休（要予約・要確認） 料金 3,000円（30分制限 / 5匹まで） レンタル 竿・エサ代は料金に込み 釣れる魚 マダイ、ブリ（ハマチ）、カンパチなど 決済方法 現金、d払い、PayPay アクセス 徳島市内から車で約2時間 / 高知市内から約1時間半 公式サイト 浜部渡船 公式サイト 驚異のコスパシステム：30分一本勝負！ \u0026nbsp; 通常の海上釣り堀は「半日コース1万円」などが相場ですが、ここは違います。\n料金：3,000円ポッキリ。竿もエサも付いているので追加費用なし（クーラーボックス等は持参）。 ルール：30分以内に5匹釣ったら終了（または時間切れ終了）。 ターゲット：イケスの中にはマダイや青物がウヨウヨいます。 【こんな人におすすめ】\n「1日釣りに費やす時間はないけど、お土産の魚は欲しい」 「子供が飽きるので、サッと釣ってサッと帰りたい」 「とにかく安く高級魚をゲットしたい」 30分で5匹釣れば、スーパーで買うより断然お得。まさに「魚の詰め放題」に近い感覚のアクティビティです。\n釣り以外の楽しみも充実 \u0026nbsp; 浜部渡船は釣り堀だけでなく、複合的なレジャーを提供しています。\n海賊料理：新鮮な魚介類をその場で豪快に焼いて食べる海賊焼きが楽しめます。 オートキャンプ：海辺でのキャンプも可能。釣った魚でBBQなんて最高ですね。 30分で5匹釣るための攻略法 \u0026nbsp; 時間は30分しかありません。迷っている暇はないのです。効率よく釣り上げるためのコツを伝授します。\n1. スタッフの言うことを聞く（最重要） \u0026nbsp; イケスの状況（魚がどの辺にいるか、タナはどれくらいか）を一番知っているのはスタッフです。「どの辺に落とせばいいですか？」と素直に聞き、言われた通りにするのが最短ルートです。\n2. アタリがあったら即アワセ \u0026nbsp; 魚影が濃いため、エサを入れるとすぐに反応があるはずです。ウキが沈んだり、手元にコツコツ感触があったら、迷わず竿を立ててアワセましょう。\n3. 青物がかかったら全力ファイト \u0026nbsp; もしブリやカンパチがかかったらラッキーですが、30分という時間制限の中では、ファイト時間が長引くのはタイムロスにもなります（笑）。竿をしっかり立てて、強気に寄せてきましょう。\n4. 釣った魚はスタッフにお任せ \u0026nbsp; 魚から針を外したり、スカリに入れたり、慣れていないと手間取る作業はスタッフが手伝ってくれる場合が多いです。遠慮なくサポートをお願いして、自分は次の1匹を釣ることに集中しましょう。\nアクセス情報 \u0026nbsp; 徳島県の最南端近くに位置するため、少々遠いですが、ドライブコースとしては最高です。\n車でのアクセス \u0026nbsp; 徳島方面から：徳島市内から国道55号線をひたすら南下。約2時間。海沿いの快走路です。 高知方面から：高知市内から国道55号線を東へ（室戸方面）。約1時間半〜2時間。 宿泊・観光 \u0026nbsp; 近くには「道の駅 宍喰温泉」や、サーフィンのメッカとして知られる美しい海岸線があります。 海陽町内の民宿やホテル（ホテルリビエラししくい等）に泊まって、翌朝釣りをして帰るプランもおすすめです。\n実際に利用したユーザーの声 \u0026nbsp; 40代男性（家族旅行） 評価：★★★★★ 「30分で釣り？と思いましたが、子供にはちょうどいい長さでした。入れ食い状態でマダイ4匹と青物1匹ゲット。これで3,000円は安すぎます。PayPayが使えたのも便利でした。」\n20代女性グループ 評価：★★★★☆ 「キャンプの食材調達に来ました。スタッフのおじさんが優しくて、エサの付け方から全部教えてくれました。5匹あっという間に釣れて、夜のBBQが豪華になりました！」\n50代男性 評価：★★★★★ 「海賊料理と一緒に利用しました。伊勢海老やサザエを食べた後に、腹ごなしの釣り。エンタメとして完成度が高いですね。」\nまとめ：浜部渡船はコスパ最強の「魚狩り」スポット！ \u0026nbsp; 浜部渡船 海上釣り堀は、「のんびり糸を垂らして待つ」釣りではありません。 **「30分間でいかにお得に魚をGETするか」という、エキサイティングな“狩り”**です。\n観光のついでに キャンプの食材調達に 夕飯のおかず確保に わずか3,000円で味わえる高級魚との真剣勝負。徳島県南へ行く際は、クーラーボックスを持ってぜひ立ち寄ってみてください！"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 72,
        href: "/toyama/ishida-fisherina/",
        title: "【富山県】石田フィッシャリーナ 釣り桟橋｜無料で楽しめる絶景...",
        description: "富山県黒部市。目の前には「天然の生け簀」と呼ばれる富山湾、背後には雄大な北アルプス・立山連峰。 そんな360度の大パノラマの中で釣りができる場所が「石田フィッシャリーナ 釣り桟橋」です。",
        
        
        content: "富山県黒部市。目の前には「天然の生け簀」と呼ばれる富山湾、背後には雄大な北アルプス・立山連峰。 そんな360度の大パノラマの中で釣りができる場所が**「石田フィッシャリーナ 釣り桟橋」**です。\nこの施設の素晴らしさは、その絶景だけではありません。なんと**「入場料無料」**。 誰でも気軽に、海上に突き出た桟橋から本格的な釣りを楽しむことができます。\nかつて映画『釣りバカ日誌13』のロケ地にも選ばれた、浜ちゃんの愛した釣り場。初心者からベテランまで魅了する、富山県屈指の人気スポットを徹底解説します。\n石田フィッシャリーナ 釣り桟橋の基本情報 \u0026nbsp; 項目 詳細 施設名 石田フィッシャリーナ 釣り桟橋 住所 〒938-0055 富山県黒部市浜石田 営業時間 4月～8月: 6:00～19:00 / 3月・9月: 6:00～18:00 / 10月～12月: 7:00～17:00（季節により変動あり） 定休日 1月～2月の毎週水曜日、年末年始、荒天時 料金 無料開放 駐車場 あり（無料） レンタル 貸竿セット 1,150円、エサ・仕掛け販売あり（管理棟にて） 釣れる魚 アジ、サバ、サヨリ、キス、カレイ、クロダイ、メジナ、アオリイカ、フクラギ（ブリの若魚）など アクセス 北陸自動車道「黒部IC」より約15分 公式サイト 石田フィッシャリーナ 無料とは思えない充実の設備 \u0026nbsp; 「無料の釣り場」と聞くと設備が心配になりますが、ここは違います。\n管理棟あり：しっかりとした管理棟があり、売店やトイレ、休憩所が完備されています。 レンタル完備：手ぶらで来ても竿とエサを借りて遊べます。 安全柵：桟橋には転落防止の柵があり、お子様連れでも安心です（※ライフジャケット着用推奨）。 足場：金網状の桟橋なので、波や風が抜けやすく、安定しています。※小物を落とさないよう注意！ 石田フィッシャリーナ攻略：季節ごとのターゲット \u0026nbsp; 富山湾は魚種の宝庫。「深海」がいきなり目の前に広がる地形のため、多種多様な魚が回遊してきます。\n春（3月～5月）：大物クロダイの季節 \u0026nbsp; ターゲット：クロダイ（チヌ）、メバル 釣り方：ウキフカセ釣り、ダンゴ釣り この時期は産卵のために大型のクロダイが浅場に入ってきます。桟橋の橋脚周りなどが狙い目です。 夏（6月～8月）：ファミリーでサビキ釣り \u0026nbsp; ターゲット：アジ、イワシ、サヨリ、キス 釣り方：サビキ釣り、チョイ投げ 豆アジや小サバが回遊してくれば、子供でも入れ食い状態になります。 砂地を狙えばシロギスも釣れます。 秋（9月～11月）：数釣りと青物とイカ \u0026nbsp; ターゲット：アオリイカ、フクラギ（ブリの子）、アジ、カマス 釣り方：エギング、ルアー、サビキ 北陸といえばアオリイカ！秋は新子の数釣りが楽しめます。 メタルジグを投げれば青物がヒットすることも。 冬（12月～2月）：根魚とカレイ \u0026nbsp; ターゲット：カレイ、カサゴ、メバル 釣り方：投げ釣り、探り釣り 寒いですが、肉厚のカレイや脂の乗った根魚が狙えます。 アクセス情報と周辺環境 \u0026nbsp; 車でのアクセス \u0026nbsp; **北陸自動車道「黒部IC」**から約15分。 黒部市街地からも近く、アクセスは良好です。無料駐車場が広いのも嬉しいポイント。 電車でのアクセス \u0026nbsp; **富山地方鉄道「電鉄石田駅」**から徒歩約15〜20分。 **JR黒部宇奈月温泉駅（新幹線）**から車で約20分。 新幹線駅からレンタカーを借りて、黒部峡谷トロッコ列車などの観光とセットにするのがおすすめです。 近くの観光スポット：石田浜海水浴場 \u0026nbsp; 釣り桟橋のすぐ隣は「石田浜海水浴場」になっています。夏場は「午前中は釣り、午後は海水浴」という贅沢なプランも可能です。近くにはキャンプ場もあります。\n実際に利用したユーザーの声 \u0026nbsp; 30代男性（県外から） 評価：★★★★★ 「『釣りバカ日誌』のファンで聖地巡礼に来ました。景色が本当にすごい！立山連峰を見ながら釣りができるなんて最高です。無料なのに管理が行き届いていて綺麗でした。」\n40代ファミリー 評価：★★★★☆ 「レンタル竿を借りてサビキ釣り。アジが30匹くらい釣れました。桟橋のスリット（網目）からスマホを落としそうで怖かったので、レジャーシートを敷いて対策しました。これから行く人は気をつけたほうがいいです！」\n60代地元民 評価：★★★★★ 「毎日散歩がてら来ています。ここは潮通しがいいから、思わぬ大物がかかることがあるんだよ。昨日は隣の人が大きなフクラギを上げていたね。」\nまとめ：石田フィッシャリーナは絶景と釣りの楽園 \u0026nbsp; 石田フィッシャリーナ 釣り桟橋は、**「無料」「絶景」「魚影が濃い」**という三拍子揃った、奇跡のような釣り場です。\n富山観光のついでに、ちょっと海で遊びたい 子供に安全な場所で釣りをさせたい 立山連峰をバックに映える写真を撮りたい そんな方に自信を持っておすすめします。富山湾の青さと北アルプスの白さが織りなすコントラストの中で、のんびりと釣り糸を垂れる贅沢な時間を過ごしてみませんか？"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 73,
        href: "/fukui/akaguri-sea-fishing-park/",
        title: "【福井県】あかぐり海釣公園｜入場料1,000円！円形桟橋でア...",
        description: "「家族みんなで安く1日遊びたい！」 「子供には釣りを、自分は本格的な大物狙いを…」 「釣った魚ですぐにバーベキューができたら最高なのに」",
        
        
        content: "「家族みんなで安く1日遊びたい！」 「子供には釣りを、自分は本格的な大物狙いを…」 「釣った魚ですぐにバーベキューができたら最高なのに」\nそんな贅沢な願いをお財布に優しい価格で叶えてくれるのが、若狭湾に浮かぶ**「あかぐり海釣公園」**です。\nシンボルは約55mの巨大な円形桟橋。 足場が良く安全な柵があるため、小さなお子様連れでも安心。 その一方で、潮通しが抜群に良く、ベテラン釣り師も唸るほどの大物が回遊してくる一級ポイントでもあります。\n釣って、遊んで、食べて。 最高の休日を、驚きのコストパフォーマンスで楽しみましょう。\nあかぐり海釣公園の基本情報 \u0026nbsp; 項目 詳細 施設名 あかぐり海釣公園 住所 〒919-2101 福井県大飯郡おおい町大島21-110 電話番号 0770-77-4003 営業時間 【4月～11月】6:00～18:00（平日7:00～）\n【12月～3月】8:00～17:00 定休日 年末年始（12/29～1/3）、荒天時閉園 料金 大人: 1,000円（清掃協力金）\n小中学生: 500円\n駐車場: 1,000円 設備 トイレ、BBQ広場（有料）、公園、自販機 公式サイト あかぐり海釣公園 公式サイト あかぐり海釣公園のここがすごい！ \u0026nbsp; 圧倒的コスパ: 入場料（清掃協力金）は大人1,000円。時間制限もなく、朝から夕方まで遊び放題です。 釣果のデパート: サビキでのアジ・イワシはもちろん、秋のアオリイカ、冬のカレイ、そして良型のチヌ（クロダイ）やグレ（メジナ）まで、狙える魚種がとにかく豊富。 「釣って食う」が実現: 併設のバーベキュー広場（要予約）を使えば、釣りたての魚をその場で塩焼きにできます。これが一番の贅沢！ こんな人に最適！ \u0026nbsp; ファミリー: 安全な柵、きれいなトイレ、飽きたら遊べる公園広場まで完備。パパもママも子供も全員ハッピーになれます。 低予算で楽しみたい学生グループ: 道具のレンタルもあるので、ドライブがてら手ぶらで立ち寄ってもOK。 本格派の釣り師: 円形桟橋の先端付近は潮通しが良く、ブリやヒラマサなどの青物が回遊することも。侮れません。 あかぐりの攻略法 \u0026nbsp; 広い桟橋ですが、場所と狙い方で釣果に差が出ます。\n1. サビキなら「あかぐり苑地側」 \u0026nbsp; 桟橋だけでなく、護岸エリア（あかぐり苑地側）もアジやサヨリの好ポイント。桟橋が混んでいる時はこちらが穴場です。\n2. チヌ・グレは「橋脚周り」 \u0026nbsp; 円形桟橋を支える柱の周りには、チヌやグレが居着いています。ウキ釣りで柱ギリギリを流すと、良型がヒットする確率が高いです。\n3. エギングは「ランガン」 \u0026nbsp; 秋のアオリイカは、一か所で粘るより動き回るのが吉。円形桟橋、直線桟橋、護岸と広く探り歩きましょう。\n釣れる魚種と時期 \u0026nbsp; 春: メバル、カサゴ、チヌ、親アオリイカ 夏: アジ（数釣り）、サヨリ、キス、タコ 秋: アオリイカ（新子）、カワハギ、アジ、サヨリ 冬: カレイ、メバル、カサゴ アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 舞鶴若狭自動車道「大飯高浜IC」から約15分。 関西方面からのアクセスが良く、大阪・京都から2時間〜2時間半程度で到着します。\nまとめ：1日1,000円で味わえる非日常 \u0026nbsp; あかぐり海釣公園は、「安近短（安くて近くて短い時間でも遊べる）」 の決定版のような施設です。 しかし、そのポテンシャルは本格的。 初心者には釣りの楽しさを、ベテランには若狭湾の豊かさを教えてくれます。\n次の休みは、家族やお友達と「あかぐり」で海遊びを満喫しませんか？クーラーボックスが満タンになるかもしれませんよ！"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 74,
        href: "/fukui/seapark-nyu/",
        title: "【福井県】シーパーク丹生｜手ぶらでGO！釣った真鯛をその場で...",
        description: "福井県美浜町の「シーパーク丹生」は、定置網も運営する漁師直営の海上レジャー施設。「大物釣りコース」から手ぶらOKの「小物釣り」、そして釣った魚を即座に焼けるバーベキュー場まで完備。家族で命をいただき、味わう。最高の思い出作りをここで。",
        
        
        content: "「子供に、魚が『切り身』で泳いでるわけじゃないって教えたい」 「釣ったばかりの新鮮な魚を、青空の下で食べてみたい！」 「でも、道具を揃えたり準備するのは面倒くさい…」\nそんなファミリーの休日を完璧にプロデュースしてくれるのが、福井県美浜町にある**「シーパーク丹生（にゅう）」**です。\nここは単なる釣り堀ではありません。 「釣る・焼く・食べる」 がワンストップで完結する、海辺のアミューズメントパーク。 巨大なマダイや青物と格闘した後は、併設のバーベキュー場で豪快に塩焼きに。 面倒な準備は一切不要。手ぶらで行って、手ぶらで帰れる気軽さが、パパ・ママから絶大な支持を集めています。\nシーパーク丹生の基本情報 \u0026nbsp; 項目 詳細 施設名 シーパーク丹生（にゅう） 住所 〒919-1201 福井県三方郡美浜町丹生 電話番号 0770-39-1088 営業時間 7:00～16:00（季節により変動） 定休日 木曜日（祝日は営業）、年末年始、荒天時 料金 大物コース: 11,000円\n小物コース: 4,000円（2時間）\nBBQ: 1卓 3,000円～ 設備 水洗トイレ、BBQ場、休憩所、駐車場 公式サイト シーパーク丹生 公式サイト ダントツ人気の理由 \u0026nbsp; 選べる「難易度」: ガチで大物を狙う「大物釣りコース」と、子供でもアジや小鯛が釣れる「小物釣りコース」があり、家族のレベルに合わせて遊べます。 最強の「鮮度」: そもそも運営元が定置網漁を行っているため、放流される魚のコンディションが抜群。美味しい魚しかいません。 手ぶらBBQ: 炭やコンロはもちろん、食材の持ち込みもOK（要確認）。釣った魚＋お肉＋ビールの最強コンボが実現します。 こんな人に最適！ \u0026nbsp; 食育をしたいパパ・ママ: 魚を釣り、命に感謝して食べる。子供にとってこれ以上の学びはありません。 BBQ好きグループ: 海風を感じながらのバーベキューは最高。スーパーで肉だけ買ってくれば、魚は現地調達です！ 釣り初心者デート: 道具もエサも全部レンタルできるので、汚れを気にせずスマートに釣りを楽しめます。 シーパーク丹生の攻略法 \u0026nbsp; コースによって戦い方が異なります。\n1. 【大物コース】朝イチの「モーニング」を逃すな \u0026nbsp; マダイや青物は、朝一番に強烈な食い気を見せます。開始の合図と共に仕掛けを投入できるよう、準備万端で挑みましょう。\n2. 【小物コース】コマセ（撒き餌）ワークが命 \u0026nbsp; アジや小鯛は、撒き餌で群れを足止めするのがコツ。少量ずつ、絶え間なく撒き続けると、入れ食いモードに突入します。\n3. スタッフさんを味方に \u0026nbsp; ここのスタッフさんは海のプロ。「釣れない…」と困っていたら、遠慮なく声をかけてください。魔法のアドバイスで釣果が変わります。\n釣れる魚種と時期 \u0026nbsp; 大物コース: マダイ、ハマチ、カンパチ、シマアジ 小物コース: アジ、サヨリ、グレ、小鯛 季節限定: イシダイ、スズキ、アオリイカ アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 舞鶴若狭自動車道「若狭美浜IC」から約20分。 海沿いの綺麗なドライブルート（クリスタルライン）を走るので、行き帰りの景色も楽しめます。\nまとめ：美味しくて楽しい「海の教室」 \u0026nbsp; シーパーク丹生は、釣りが初めての子供たちにとって、最高の「海の教室」です。 竿から伝わる魚の生命感。 自分で釣った魚の、驚くほどの美味しさ。\n今度の週末は、スマホやゲームを置いて、本物の「命」に触れる体験をしにきませんか？ きっと、子供たちの目がキラキラと輝くはずです。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 75,
        href: "/fukui/hiruga-sea-fishing-pond/",
        title: "【福井県】ひるが海上釣堀｜仲間だけで高級魚を独占！波静かな日...",
        description: "福井県美浜町の「ひるが海上釣堀」は、波の影響を受けない汽水湖「日向湖」にあるため、船酔いの心配ゼロ。仲間だけで筏を貸し切るプライベートスタイルが人気で、マダイや青物を誰にも邪魔されず自由に狙えます。接待やグループ釣行に最適な大人の遊び場。",
        
        
        content: "「隣の釣り人とオマツリするのが怖い…」 「仲間だけでワイワイ騒ぎながら釣りがしたい！」 「でも、船酔いは絶対にしたくない」\nそんなワガママな願いをすべて叶えてくれるのが、福井県美浜町にある**「ひるが海上釣堀」**です。\nここは海とつながった汽水湖「日向湖（ひるがこ）」にあるため、まるで湖のように波が静か。 そして最大の魅力は**「貸切（チャーター）」が基本**というスタイル。 見知らぬ他人に気を使うことなく、気の合う仲間や家族だけで、マダイやカンパチなどの高級魚を釣りまくる。\nそんな究極のプライベート釣り大会を、ここで開催してみませんか？\nひるが海上釣堀の基本情報 \u0026nbsp; 項目 詳細 施設名 ひるが海上釣堀 住所 〒919-1126 福井県三方郡美浜町日向 電話番号 0770-32-1327 営業時間 7:00～14:00（季節・天候により変動あり） 定休日 1/1～1/3、荒天時 料金 一般（乗合）: 11,000円\n女性・子供: 7,000円\n貸切: 人数により変動（要相談） 設備 トイレ、無料駐車場、スカリ・タモ無料貸出 公式サイト ひるが海上釣堀 公式サイト ひるがのここがすごい！ \u0026nbsp; 鉄壁の静穏性: 四方を山に囲まれた地形のため、外海が荒れていてもここは凪（なぎ）。船酔い知らずで釣りに集中できます。 プライベート感抜群: 貸切コースが充実しており、会社のレクリエーションやサークルのイベントに最適。 魚が旨い: 福井の海に近い環境で育った放流魚は、引きが強く身も締まっています。 こんな人に最適！ \u0026nbsp; グループ・団体: 5名〜10名のグループなら、迷わず「貸切」を選択しましょう。1人当たりの料金は変わらず、自由度が格段に上がります。 釣りデビューの子供たち: 足場が良く揺れないので、お子様の「初めての魚釣り」に最高の環境です。 接待フィッシング: 他のお客様に気兼ねなく会話を楽しめるので、ビジネスの懇親会にも使えます。 ひるが攻略の3つのカギ \u0026nbsp; 穏やかな湖ですが、魚との知恵比べは本格的です。\n1. 「タナ（深さ）」を共有せよ \u0026nbsp; 貸切の最大のメリットは「情報共有」。誰かが釣れたら「タナ何メートル？」とすぐに聞き、全員でその深さを攻めましょう。これが爆釣への近道です。\n2. 「角（カド）」を見逃すな \u0026nbsp; 魚はイケスの四隅に溜まる習性があります。アタリが遠のいたら、足元の角を静かに探ってみてください。意外な大物が潜んでいることがあります。\n3. エサは「種類」で勝負 \u0026nbsp; マダイには「練りエサ」「ササミ」、青物には「活きアジ」「カツオの切り身」。 同じエサばかりだと魚が飽きるので、数種類のエサをローテーションさせましょう。\n釣れる魚種と時期 \u0026nbsp; 通年: マダイ（良型・数釣り） 春・秋: 青物（ワラサ・カンパチ）、シマアジ 冬: クロソイ、ハタマス（マハタ）、トラフグ アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 舞鶴若狭自動車道「若狭美浜IC」から約15分。 名古屋・大阪方面からのアクセスも良く、インターを降りてからの道も平坦で走りやすいです。\nまとめ：大人のための「海上パーティールーム」 \u0026nbsp; ひるが海上釣堀は、単なる釣り場ではありません。 海の上に浮かぶ、仲間だけのプライベート空間です。\n竿が大きく曲がり、水面を割って大物が躍り出る瞬間、全員で歓声を上げる。 そんな一体感と興奮は、他の場所では味わえません。 次の週末は、仲間を誘って「ひるが」で盛り上がりましょう！"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 76,
        href: "/fukui/fishing-land-hyuga/",
        title: "【福井県】フィッシングランド日向｜マニアも唸る「魚の質」！美...",
        description: "福井県・日向湖の「フィッシングランド日向」は、魚のコンディションに絶対の自信を持つ老舗の海上釣り堀。ヒラマサ、カンパチ、シマアジなど、引きが強く美しい高級魚が揃っています。完全予約制で混雑知らず。本気で魚と向き合いたいアングラーのための聖地。",
        
        
        content: "「養殖魚は引きが弱い？ それはここの魚を知らないだけだ」 「本当に旨い魚を釣って、家族を驚かせたい」\nそんな目の肥えた釣り人たちが、足繁く通う場所があります。 福井県美浜町、日向湖にある**「フィッシングランド日向」**です。\nここの最大の特徴は、魚の圧倒的な「質の良さ」。 独自のルートで仕入れる魚は、ヒレがピンと張った美しい個体ばかり。 特に「ヒラマサ」や「カンパチ」の強烈なパワーは、天然魚と見紛うほどです。\n完全予約制で、場所取りの殺伐さとも無縁。 静かな湖面で、最高級のファイターたちとの真剣勝負をお楽しみください。\nフィッシングランド日向の基本情報 \u0026nbsp; 項目 詳細 施設名 フィッシングランド日向（ひるが） 住所 〒919-1126 福井県三方郡美浜町日向 電話番号 0770-32-1133（完全予約制） 営業時間 7:00～13:00（季節により変動あり） 定休日 荒天時、年末年始 料金 上級コース: 11,000円\nマダイコース: 7,000円\n貸切: あり 設備 トイレ、駐車場、スカリ・タモ無料 公式サイト フィッシングランド日向 公式サイト 日向のここがすごい！ \u0026nbsp; 「上級コース」の破壊力: マダイはもちろん、シマアジ、ヒラマサ、ワラサなど、市場価値の高い魚がガンガン放流されます。元を取るどころか、クーラーボックスに入りきらないことも。 こだわりの「魚体」: 痩せた魚はいません。丸々と太り、脂の乗った魚ばかりなので、釣った後の「食べる楽しみ」が段違いです。 選べるスタイル: ガチ勢向けの「上級コース」と、手堅く楽しむ「マダイコース」があり、予算や目的に応じて使い分けられます。 こんな人に最適！ \u0026nbsp; 「食べる」までが釣りの人: 持ち帰った魚の味にこだわりたいグルメなアングラーにこそ、来てほしい場所です。 混雑が嫌いな人: 完全予約制なので、「朝行ったら場所がない！」という悲劇は起こりません。 青物ファン: キュイーン！！とドラグを鳴らす青物の引き。ここなら高確率で味わえます。 日向の攻略法 \u0026nbsp; 良型揃いゆえに、仕掛けの強度が重要です。\n1. ハリスは「太め」が正解 \u0026nbsp; 不意にヒラマサなどの怪物が食ってきます。細いハリスでは瞬殺されるので、マダイ狙いでも最低3号、青物狙いなら5号以上を使いましょう。\n2. 「マダイイエロー」は必須 \u0026nbsp; 日向のマダイは、練りエサの「マダイイエロー」が大好きです。これと「生ミック」があれば、マダイに関しては盤石です。\n3. 「脈釣り」で角を攻める \u0026nbsp; ウキを使わない「脈釣り（ミャクヅリ）」で、イケスの四隅や網際を探ると、警戒心の強いシマアジやイシダイが食ってくることがあります。\n釣れる魚種と時期 \u0026nbsp; 通年: マダイ、シマアジ 春・秋: ヒラマサ、カンパチ、ワラサ 冬: クロソイ、ハタマス（マハタ）、トラフグ アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 舞鶴若狭自動車道「若狭美浜IC」から約15分。 日向湖（ひるがこ）周辺には複数の釣り堀があるので、看板をよく見て「フィッシングランド日向」の受付を目指してください。\nまとめ：本物の「魚」を知る \u0026nbsp; スーパーの切り身しか知らない人がここに来ると、カルチャーショックを受けるかもしれません。 「魚って、こんなに引くの！？」 「魚って、こんなに綺麗なの！？」\nそんな感動体験が、フィッシングランド日向には待っています。 しっかりしたタックルを準備して、挑んでください。相手は手強いですよ！"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 77,
        href: "/fukui/fishing-rainbow/",
        title: "【福井県】フィッシングレインボー｜トイレ洋式！足場しっかり！...",
        description: "福井県美浜町の「フィッシングレインボー」は、女性や子供連れに圧倒的な人気を誇る海上釣り堀。その秘密は、広く安定した足場と清潔な洋式トイレ。しかし魚影は本格的で、マダイや青物に加え、高級魚イシガキダイなども放流される驚きのポテンシャルを秘めています。",
        
        
        content: "「釣り堀のトイって、汚いんでしょ…？」 「子供が海に落ちないか心配で、釣りどころじゃない」 「でも、せっかくなら美味しい魚を釣らせてあげたい！」\nそんなママたちの切実な悩みを、**「フィッシングレインボー」**は全て解決しました。\nここの最大の特徴は、徹底した「快適性」。 釣り場となる筏（いかだ）は広く、揺れが少なく、手すりもしっかり完備。 そして何より、女性専用の清潔な洋式トイレがあり、休憩所もエアコン完備。 まるでカフェに行くような気軽さで、本格的な海上釣りが楽しめるのです。\nもちろん、釣れる魚は一級品。 「レインボー」の名前の通り、多彩な魚種があなたの竿を絞り込みます。\nフィッシングレインボーの基本情報 \u0026nbsp; 項目 詳細 施設名 フィッシングレインボー 住所 〒919-1126 福井県三方郡美浜町日向 33-1 電話番号 0770-32-1551 営業時間 【3～10月】6:30～13:30\n【11～2月】7:00～14:00 定休日 1/1、悪天候時 料金 大人: 12,000円\n女性・子供: 8,000円\n貸切: 平日5名〜、土日祝8名〜 設備 洋式トイレ、休憩所（エアコン）、電子レンジ、ポット完備 公式サイト フィッシングレインボー 公式サイト レインボーが選ばれる3つの理由 \u0026nbsp; 圧倒的な「清潔感」: 海上のトイレとは思えないほど清掃が行き届いています。エアコン完備の休憩所には電子レンジもあり、お弁当を温めて食べることも可能。 放流魚の「デパート」: マダイ、ワラサはもちろん、季節によってイシガキダイ、カレイ、スズキなど、他の釣り堀では珍しい魚種が放流されます。 イベントが熱い: 「タグ付きマダイ」を釣るとプレゼントが貰えたり、季節ごとの大放流祭りがあったりと、飽きさせない工夫が満載です。 こんな人に最適！ \u0026nbsp; 釣りデビューのファミリー: ここほど「安全」と「快適」が両立している釣り堀は稀有です。 カップル・女性グループ: トイレや日焼け、休憩場所の心配がいらないので、釣りデートに最適。 五目釣り（多魚種狙い）好き: 「今日は何が掛かるかな？」というワクワク感を楽しみたい人におすすめ。 レインボーの攻略法 \u0026nbsp; 快適な環境ですが、魚との駆け引きは真剣勝負です。\n1. タグ付きを狙え！ \u0026nbsp; 背びれにタグ（目印）がついたマダイが泳いでいます。これを釣ると、次回の割引券やお土産などの特典が！イケスの中をよく観察して、タグ付きが泳いでいるタナ（深さ）を見極めましょう。\n2. 足元の「ネット際」が熱い \u0026nbsp; レインボーの魚は、足元のネット際に身を潜めていることが多いです。竿一本分くらいの近距離を、根気よく探ってみてください。意外な大物が潜んでいます。\n3. エサは「一口サイズ」で \u0026nbsp; 女性や子供でも釣れるよう、少し小さめの針を使うのがコツ。それに合わせてエサも小さめに付けると、魚の食い込みが抜群に良くなります。\n釣れる魚種と時期 \u0026nbsp; 通年: マダイ、クロソイ 春・夏: ヒラマサ、カンパチ、シマアジ、イシガキダイ 冬: トラフグ、絹姫サーモン アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 舞鶴若狭自動車道「若狭美浜IC」から約15分。 日向湖の奥まった場所にありますが、看板が大きく出ているので迷いません。駐車場も広く、荷物の積み下ろしも楽々です。\nまとめ：家族の笑顔が釣れる場所 \u0026nbsp; フィッシングレインボーは、「誰一人として我慢しなくていい釣り堀」 です。 パパは真剣に大物を狙い、ママは快適な休憩所でお茶を飲み、子供は安全な足場で初めての引きに驚く。\nそんな理想的な休日が、ここでは日常です。 今度の休みは、家族全員で「レインボー色の思い出」を作りに行きませんか？"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 78,
        href: "/fukui/blue-park-ano/",
        title: "【福井県】ブルーパーク阿納｜絶景の円形桟橋でアジ・アオリ・高...",
        description: "「普通の堤防釣りじゃ物足りない」 「でも、渡船で沖に出るのはちょっと怖い…」",
        
        
        content: "「普通の堤防釣りじゃ物足りない」 「でも、渡船で沖に出るのはちょっと怖い…」\nそんなあなたにピッタリなのが、福井県おおい町にある**「ブルーパーク阿納（あのう）」**です。\n海上にぽっかりと浮かぶ、直径55mの巨大なドーナツ型桟橋。 そこは、陸続きでありながら水深10m以上の「沖」の世界です。\n足元にはアジやサヨリの群れ。 その下には、それらを狙うヒラメやキジハタなどのフィッシュイーターたち。 そして春と秋には、多くのアングラーを熱狂させるアオリイカ。\nまるで**「天然の釣り堀」**のような豊かさを、わずか1,000円で味わい尽くしましょう。\nブルーパーク阿納の基本情報 \u0026nbsp; 項目 詳細 施設名 ブルーパーク阿納 住所 〒919-2101 福井県大飯郡おおい町大島 21-110 電話番号 0770-77-2287 営業時間 【4月～11月】5:00～18:00\n【12月・3月】7:00～17:00 定休日 12月第4日曜～2月末日（冬季休業）、荒天時 料金 大人（中学生以上）: 1,000円\n子供（小学生以下）: 500円\n駐車場: 1,000円/台 設備 トイレ、休憩所、売店（エサ・仕掛け販売あり） 公式サイト ブルーパーク阿納（おおい町観光協会） 阿納のここがすごい！ \u0026nbsp; 360度釣り放題: 円形桟橋のおかげで、潮の流れや風向きに合わせて釣り座を自由に変えられます。どこかしらが「風裏」になる強みがあります。 圧倒的コスパ: 時間制限なしで大人1,000円。朝マズメから夕マズメまで粘ってもこの価格は破格です。 魚種のデパート: 砂地と岩礁が混ざり合う地形のため、キス（砂地）、カサゴ（岩礁）、回遊魚（潮通し）と、狙える魚のバリエーションが凄まじいです。 こんな人に最適！ \u0026nbsp; ファミリー: 足場が網目状の金属製で安定しており、柵もあるので子供連れでも安心。ただし、物は落ちるのでレジャーシート必須です。 ヤエン・エギング師: アオリイカの魚影の濃さは県内屈指。春の親イカ狙いも、秋の数釣りも楽しめます。 のんびり派: 自分のペースで一日中糸を垂らしていたい人にとって、この開放感と安さは楽園です。 ブルーパーク阿納の攻略法 \u0026nbsp; 広い桟橋ですが、ポイント選びが釣果を分けます。\n1. 「砂地」と「岩場」を見極めろ \u0026nbsp; 基本的に南側（沖に向かって左手）は砂地が多く、キスやカレイ狙いに最適。 逆に北側や桟橋の基礎周りは岩礁帯になっており、カサゴやメバル、チヌが潜んでいます。狙う魚に合わせて場所を選びましょう。\n2. サビキは「足元」と「ちょい投げ」 \u0026nbsp; アジは日によって着き場が変わります。足元で釣れない時は、ウキをつけて少し沖に投げる「投げサビキ」を試すと、良型が連発することがあります。\n3. ヒラメを狙い撃て \u0026nbsp; ここで釣れた小アジをエサにして、足元に沈めておくと…？ 座布団のような巨大ヒラメや、高級魚キジハタが食ってくることがよくあります。「泳がせ釣り」の竿を一本出しておくのが、阿納の賢い楽しみ方です。\n釣れる魚種と時期 \u0026nbsp; 春: メバル、カサゴ、チヌ、親アオリイカ、キス 夏: アジ、サヨリ、キス、カマス、キジハタ 秋: アオリイカ（新子）、アジ、サゴシ、カワハギ、ヒラメ 冬: カレイ、メバル（※1-2月は休園） アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 舞鶴若狭自動車道「大飯高浜IC」から約15分。 関西方面からのアクセスが良く、大阪・京都から2時間〜2時間半程度。 駐車場は広いですが、釣り場のすぐ近くまで車で行けるので荷物の運搬も苦になりません。\nまとめ：1,000円で買える「沖釣りの興奮」 \u0026nbsp; ブルーパーク阿納は、手軽さと本格さを絶妙なバランスで兼ね備えた釣り場です。 1,000円札一枚を握りしめて行けば、そこには思いがけない大物との出会いが待っているかもしれません。\n次の休日は、丸い桟橋の上で、360度のパノラマ絶景と魚釣りを楽しんでみませんか？"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 79,
        href: "/fukui/marine-garden-leisure/",
        title: "【福井県】マリンガーデン・レジャー｜優しさNo.1！「絶対に...",
        description: "福井県日向湖の「マリンガーデン・レジャー」は、初心者や家族連れへのサポートが手厚いことで有名な海上釣り堀。「初めてで不安」という人にこそおすすめ。スタッフが親身になってタナ調整や釣り方を教えてくれるので、ボウズ（0匹）回避率が非常に高いアットホームな施設です。",
        
        
        content: "「釣り堀デビューしたいけど、常連さんに怒られそう…」 「子供に釣らせたいけど、自分も初心者だから教えられない」\nそんな不安を抱えているなら、迷わず**「マリンガーデン・レジャー」**を選んでください。\nここの最大の特徴は、スタッフさんの「お節介」なまでの優しさ。 釣れていない人がいれば、すぐに飛んできてアドバイス。 「タナ（深さ）が違うよ」「エサを動かしてみて」と、手取り足取り教えてくれます。\n殺伐とした雰囲気とは無縁の、アットホームな「海の庭」。 ここでなら、あなたもきっと**「人生初の大物」**を手にすることができるはずです。\nマリンガーデン・レジャーの基本情報 \u0026nbsp; 項目 詳細 施設名 マリンガーデン・レジャー 住所 〒919-1126 福井県三方郡美浜町日向（日向湖） 電話番号 0770-32-1557 営業時間 7:00～14:00（季節により変動あり） 定休日 不定休（荒天時休業） 料金 男性: 11,000円\n女性・子供: 7,000円\n貸切: 平日5名〜、土日祝8名〜 設備 トイレ、駐車場、貸竿あり 公式サイト マリンガーデン・レジャー 公式サイト マリンガーデンのここがすごい！ \u0026nbsp; 脱・ボウズ率の高さ: スタッフのサポートが手厚いため、全く釣れないという悲劇が起こりにくいです。「釣らせてなんぼ」の精神が貫かれています。 ゆったりとした配置: イケスの配置に余裕があり、隣の人との距離感も程よいのが特徴。初心者特有の「オマツリ（糸絡み）」のリスクも軽減されています。 良心的な価格設定: 女性や子供料金が設定されており、ファミリーでの利用にも優しい料金体系です。 こんな人に最適！ \u0026nbsp; 完全な釣り初心者: 竿の持ち方からわからなくても大丈夫。恥ずかしがらずに聞けば、笑顔で教えてくれます。 脱サラならぬ「脱ボウズ」を目指す人: 他の釣り堀で悔しい思いをした人は、ここで自信を取り戻しましょう。 のんびり派: ガツガツ数釣りを競うよりも、景色を楽しみながら自分のペースで釣りたい人にフィットします。 マリンガーデンの攻略法 \u0026nbsp; 優しい釣り堀ですが、魚はやはり賢いです。\n1. スタッフの「言う通り」にする \u0026nbsp; これが最強の攻略法です。スタッフはその日の魚の機嫌を一番よく知っています。「底から〇メートル」と言われたら、素直にそれに合わせましょう。自己流で粘るより100倍釣れます。\n2. 「誘い」はソフトに \u0026nbsp; ここの魚は、激しく動かすよりも、フワッと自然にエサが落ちてくる動きに好反応を示します。竿先をゆっくり持ち上げて、ゆっくり下ろす。この「フォール」のアクションを意識してください。\n3. ハリスは細めを準備 \u0026nbsp; 食いが渋い時は、ハリス（針がついている糸）を少し細くすると劇的にアタリが増えることがあります。3号を基準に、予備で2.5号などの細めの仕掛けも持っておくと安心です。\n釣れる魚種と時期 \u0026nbsp; 通年: マダイ、シマアジ 夏～秋: カンパチ、ワラサ（メジロ）、ハマチ 冬: クロソイ、ハタマス アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 舞鶴若狭自動車道「若狭美浜IC」から約15分。 日向湖の湖畔道路を進むと見えてきます。道幅が少し狭い箇所もあるので、安全運転で。\nまとめ：初心者のための「特等席」 \u0026nbsp; マリンガーデン・レジャーは、海の釣り堀の楽しさを教えてくれる**「入門ゲート」**のような存在です。 強烈な引き、美しい魚、そしてスタッフの温かさ。 ここで釣りの楽しさを知って、あなたも立派な「海上アングラー」の仲間入りをしませんか？"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 80,
        href: "/fukui/sea-fishing-park-mikata/",
        title: "【福井県】海釣り公園みかた｜釣ってその場でBBQ！食育にも最...",
        description: "【重要なお知らせ】 2025年度は施設メンテナンス等のため「全期間休業」となります。 以下は、通常営業時の情報に基づいたガイドです。2026年度以降の再開を楽しみに待ちましょう。",
        
        
        content: "【重要なお知らせ】 2025年度は施設メンテナンス等のため「全期間休業」となります。 以下は、通常営業時の情報に基づいたガイドです。2026年度以降の再開を楽しみに待ちましょう。\n「子供に、命をいただく大切さを教えたい」 「釣ったばかりの新鮮な魚を、青空の下で豪快に食べたい！」\nそんな願いを叶えてくれるのが、福井県若狭町にある**「海釣り公園みかた」**です。\nここは単なる釣り堀ではありません。 「釣る」喜びと、「食べる」感動。 その両方をノンストップで体験できる、食と遊びのテーマパークです。\nマダイやイサキを釣り上げ、その場で炭火焼きにして頬張る。 スーパーの切り身しか知らない子供たちにとって、それは一生忘れられない「食育」の授業になるはずです。\n海釣り公園みかたの基本情報 \u0026nbsp; 項目 詳細 施設名 海釣り公園みかた 住所 〒919-1453 福井県三方上中郡若狭町小川17-36 電話番号 0770-47-5201 営業時間 8:00～16:00（4月〜11月末） 定休日 毎週木曜日（祝日は営業）、荒天時 ※2025年は全休 料金 上級コース（3時間）: 10,500円（8匹まで）\nファミリーコース（2時間）: 5,500円（3匹まで）\n見学料: 330円 設備 水洗トイレ、BBQ場、駐車場（無料） 公式サイト 海釣り公園みかた みかたのここがすごい！ \u0026nbsp; 釣ってすぐBBQ: 併設されたBBQテラスで、釣った魚を炭火焼きで楽しめます（要予約）。面倒な下処理（ウロコ・内臓取り）も有料でお願いできるので、食べることに専念できます。 選べる2つのコース: ガッツリ釣りたい「上級コース」と、手軽に楽しみたい「ファミリーコース（初級）」。目的に合わせて選べるので無駄がありません。 ブランド魚の養殖元: 実はここ、若狭のブランド魚「若狭マハタ」などの養殖も手がける業者が運営。魚の品質と味は折り紙付きです。 こんな人に最適！ \u0026nbsp; 食べるのが好きなファミリー: 「キャッチ＆イート」をこれほど手軽に実践できる場所は貴重です。 釣り初心者グループ: ファミリーコースなら2時間勝負なので、飽きずに集中して楽しめます。 食育に関心のあるパパ・ママ: 魚がどうやって食卓に並ぶのか、その過程を楽しく学べます。 海釣り公園みかたの攻略法 \u0026nbsp; 1. ファミリーコースは「手返し」重視 \u0026nbsp; 2時間はあっという間です。釣れたらすぐに針を外し、エサを付けて再投入。この「手返し」の良さが釣果を分けます。オマツリ（糸絡み）したら、すぐにスタッフを呼びましょう。\n2. BBQの予約は必須 \u0026nbsp; 釣った魚をその場で食べるなら、釣り座の予約と同時にBBQの予約も忘れずに。炭の準備などがあるので、飛び込みでは利用できないことがあります。\n3. ハサミとプライヤーは持参推奨 \u0026nbsp; レンタルもありますが、使い慣れた針外しやハサミがあるとスムーズです。特に魚を締めるためのナイフがあると、鮮度抜群の状態でBBQに持ち込めます。\n釣れる魚種と時期 \u0026nbsp; 春～秋: マダイ、シマアジ、イサキ、マハタ、ハマチ 注意: 季節や水温によって放流魚種が変わります。 アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 舞鶴若狭自動車道**「若狭三方IC」**から約15分。 三方五湖の一つ「久々子湖（くぐしこ）」の近くを通り、海沿いへ抜けるルートです。 周辺には「三方五湖レインボーライン」などの観光スポットも多いので、ドライブコースとしても優秀です。\nまとめ：2026年の再開を待つ価値あり！ \u0026nbsp; 2025年の休業は残念ですが、それは裏を返せば**「さらなるパワーアップのための準備期間」**です。 施設の改修や魚の育成を経て、より魅力的になった「海釣り公園みかた」が帰ってくることでしょう。\nその時が来たら、ぜひ家族みんなで出かけてみてください。 自分で釣ったマダイの塩焼きの味は、きっと世界一の美味しさです。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 81,
        href: "/fukui/wakasa-takahama-sea-fishing-park/",
        title: "【福井県】若狭高浜海釣り公園｜入場200円！絶景の橋の上で楽...",
        description: "「釣り公園はお金がかかるから嫌だ」 「でも、無料の堤防は場所取りが大変だし…」",
        
        
        content: "「釣り公園はお金がかかるから嫌だ」 「でも、無料の堤防は場所取りが大変だし…」\nそんなあなたにおすすめなのが、福井県高浜町にある**「若狭高浜海釣り公園」。 なんと入場料200円**（子供100円）という、缶コーヒー+α程度の金額で利用できる驚きの施設です。\n釣り場となるのは、本土と沖の人工島を結ぶ**「橋の上」**。 潮通し抜群の水道部を真上から攻めることができ、その魚影の濃さは一級品。 美しすぎる若狭湾のブルーを眺めながら、お得に大物を狙ってみませんか？\n若狭高浜海釣り公園の基本情報 \u0026nbsp; 項目 詳細 施設名 若狭高浜海釣り公園 住所 〒919-2228 福井県大飯郡高浜町塩土 営業時間 【4月～10月】7:00～19:00\n【11月～3月】8:00～17:00 定休日 年中無休（荒天時閉鎖あり） 料金 入場料: 大人200円、小中学生100円\n清掃協力金: 車1台1,000円、バイク500円\n貸し竿: 1,000円（※数に限りあり） 設備 トイレ、駐車場、遊歩道 公式サイト 若狭高浜観光協会 ここがすごい！3つのポイント \u0026nbsp; 圧倒的開放感: 橋の上から竿を出すスタイルなので、視界を遮るものがありません。透明度の高い海を見下ろしながらの釣りは爽快そのものです。 潮通しの良さ: 橋脚周りは常に潮が動いており、魚の回遊ルートになっています。アジやサヨリはもちろん、それらを狙う大型魚も集まります。 コスパ最強: 駐車料金はかかりますが、入場料自体は破格の安さ。短時間の「ちょい釣り」でも元が取れる手軽さが魅力です。 こんな人に最適！ \u0026nbsp; 観光ついでに釣りたい人: 高浜エリアの観光の合間に、1〜2時間だけ竿を出したいという使い方にぴったり。 カップル: ロケーションが良いので、釣りをしながらのデートコースとしても優秀です。 中級者以上のベテラン: 潮の流れを読んだり、橋脚周りを攻める楽しさがあり、腕の見せ所が多い釣り場です。 若狭高浜海釣り公園の攻略法 \u0026nbsp; 1. ライフジャケットは「持参」が基本 \u0026nbsp; ここが最大の注意点です。ライフジャケット着用が義務ですが、レンタルはありません（※貸し竿利用時のみ借りられる場合もありますが、数は極少）。必ず人数分を持参してください。忘れると入場できません。\n2. 橋の「影」と「橋脚」を撃て \u0026nbsp; 晴れた日は、橋の影に魚が隠れています。また、橋脚周りはチヌや根魚のマンション状態。足元を丁寧に落とし込み釣り（ヘチ釣り）で探ると、意外な大物が出ます。\n3. 風の強い日は避ける \u0026nbsp; 橋の上で遮るものがないため、風の影響をダイレクトに受けます。強風時は釣りが成立しないだけでなく、安全のため閉鎖されることも。予報を必ずチェックしましょう。\n釣れる魚種と時期 \u0026nbsp; 春: メバル、カサゴ、クロダイ、コウイカ 夏: アジ（豆アジ〜小アジ）、キス、タコ、サヨリ 秋: アオリイカ、サヨリ、カマス、サンバソウ（イシダイの幼魚） 冬: カサゴ、メバル ※北風に晒されるため釣り辛い日が多い アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 舞鶴若狭自動車道**「大飯高浜IC」**から約15分。 国道27号線から海側へ入ってすぐ。 駐車場は広いですが、夏場の海水浴シーズンは周辺道路が混雑するので注意が必要です。\nまとめ：200円で味わう「橋の上の特等席」 \u0026nbsp; 若狭高浜海釣り公園は、豪華な設備や手厚いサービスがあるわけではありません。 しかし、200円という気軽さで、潮風を感じながら本格的な釣りができる「特等席」を提供してくれます。\nライフジャケットだけは忘れずに。 ルールを守って、絶景の中でのフィッシングを楽しんでください。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 82,
        href: "/fukui/obama-city-fishing-coop-raft/",
        title: "【福井県】小浜市漁協・釣り筏｜若狭湾のチヌ聖地！絶景の中で楽...",
        description: "福井県小浜市の「小浜市漁協・釣り筏」は、仏谷・甲ヶ崎・宇久など様々なポイントを有する筏釣りのメッカ。チヌ（クロダイ）の魚影の濃さは全国屈指で、アオリイカやアジの魚影も抜群。トイレ付き筏も完備され、初心者から黒鯛師まで幅広く楽しめる若狭湾の釣りフィールド。",
        
        
        content: "「堤防の喧騒を離れて、静かに海と向き合いたい」 「自分の腕一本で、警戒心の強いチヌを仕留めたい」 「揺れる筏の上で、波の音をBGMに一日を過ごす…」\nそんな贅沢な時間を求めて、全国から釣り人が集まる場所が福井県小浜市にはあります。\n若狭湾の複雑なリアス式海岸に点在する**「小浜の釣り筏（いかだ）」群。 「仏谷（ほとけだに）」「甲ヶ崎（こうがさき）」「宇久（うぐ）」といった名ポイントを有し、古くから「チヌの聖地」**として名を馳せてきました。\n海釣り公園や釣り堀とは違う、「待つ釣り」の美学。 大自然の真ん中で、あなただけのドラマを紡いでみませんか？\n小浜釣り筏の基本情報 \u0026nbsp; ※小浜市内には複数の渡船業者が存在します。詳細は各業者へお問い合わせください。\n項目 詳細 主な釣り場エリア 仏谷、甲ヶ崎、宇久、阿納、西小川 など 運営 各地区の渡船業者、民宿など 営業時間 日の出～16:00頃（季節・業者により変動） 定休日 悪天候時、年末年始 料金目安 大人: 3,500円～4,500円（渡船料込）\n子供: 業者により設定あり 設備 トイレ付き筏あり（要予約）、屋根付き筏あり 公式サイト 若狭おばま観光協会 小浜エリアのここがすごい！ \u0026nbsp; 圧倒的な「ポイント数」: 湾奥の静かなエリアから、潮通しの良い外洋近くまで、多彩なポイントがあり、狙う魚や天候に合わせて場所を選べます。 チヌの魚影: 「年無し（50cmオーバー）」の実績多数。ダンゴ釣り（かかり釣り）発祥の地の一つとも言われ、魚影の濃さは折り紙付きです。 アオリイカの楽園: 藻場が豊富な若狭湾はアオリイカの産卵場。春の親イカ、秋の数釣りともにエギンガーにはたまらないフィールドです。 スタイル別：おすすめエリア \u0026nbsp; 小浜の筏はエリアによって性格が異なります。\n【仏谷（ほとけだに）】: 特徴: 湾の最奥にあり、波が非常に静か。 おすすめ: 初心者、ファミリー、数釣りを楽しみたいい人。 【甲ヶ崎（こうがさき）】: 特徴: 水深があり、大型が出る実績場。 おすすめ: 本格派のチヌ師、一発大物狙い。 【宇久（うぐ）・西小川】: 特徴: 外海に近く潮通しが良い。青物やマダイも回遊する。 おすすめ: 五目釣り、ルアーマン、美味しい魚を食べてたい人。 小浜筏の攻略法 \u0026nbsp; 1. 「ダンゴ」で寄せて食わす \u0026nbsp; チヌ狙いなら「ダンゴ釣り（かかり釣り）」が基本。集魚剤を混ぜた砂やヌカのダンゴで魚を寄せ、中に入れたエサを食わせます。一定のリズムで打ち返し続けることが、本命への近道です。\n2. 春と秋は「エギ」を忍ばせる \u0026nbsp; チヌ狙いでも、必ずエギングロッドを持って行きましょう。海中にアオリイカの姿が見えることが頻繁にあります。お土産確保に最適です。\n3. トイレの有無を確認 \u0026nbsp; 女性や子供連れの場合、予約時に必ず「トイレ付きの筏」を指定してください。全ての筏にトイレがあるわけではありません。\n釣れる魚種と時期 \u0026nbsp; 春: チヌ（乗っ込み）、アオリイカ（親）、シーバス 夏: アジ、キス、タコ、クロダイ 秋: アオリイカ（新子）、アジ、カワハギ、サヨリ、チヌ（数釣り） 冬: カレイ、サゴシ、カサゴ アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 舞鶴若狭自動車道「小浜IC」または「西小浜IC」から各漁港へ約15分〜30分。 京阪神からのアクセスも良く、週末は多くの釣り人で賑わいます。\nまとめ：静寂を楽しむ大人の休日 \u0026nbsp; 小浜の釣り筏には、派手なアトラクションはありません。 あるのは、美しい海と、竿先を通じた魚との対話だけ。\nしかし、それこそが最高の贅沢だと知っている皆さん。 次の休みは、コンビニと釣具屋に寄って、若狭の海へ繰り出しませんか？ クーラーボックスいっぱいの釣果と、心の洗濯が待っています。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 83,
        href: "/fukui/tsuruga-city-sea-fishing-park/",
        title: "【福井県】敦賀市海釣り公園｜入場無料！柵あり・トイレ完備のフ...",
        description: "福井県敦賀市の「敦賀市海釣り公園」は、敦賀ICから20分とアクセス抜群の海釣りスポット。しっかりとした転落防止柵があり、小さなお子様連れでも安心。アジ釣りのメッカとして有名で、駐車場、トイレ、手洗い場も完備。手軽に安全に海釣りデビューするならここで決まり！",
        
        
        content: "「子供に海釣りをさせてあげたいけど、テトラポットは危ないし…」 「トイレがない釣り場だと、妻や娘が行きたがらない…」 「でも、高い入場料を払う釣り堀はちょっと…」\nそんなパパ・ママの悩みを全て解決してくれるのが、**「敦賀市海釣り公園」**です。\n敦賀ICから車でわずか20分。 海に突き出た突堤は、全面が頑丈な鉄柵でガードされており、まるで公園のような安全性。 それでいて、足元には小アジの大群が、沖にはアオリイカが泳ぐ、一級の釣りポイントでもあります。\n入場料はなんと無料（※清掃協力金・駐車代別途）。 週末の家族サービスは、ここ以外考えられません！\n敦賀市海釣り公園の基本情報 \u0026nbsp; 項目 詳細 施設名 敦賀市海釣り公園 住所 〒914-0844 福井県敦賀市名子14-41-1 営業時間 日の出～日没まで（※夜釣り禁止） 定休日 年中無休（荒天時閉鎖あり） 料金 入場料: 無料\n清掃協力金: 大人500円、子供300円\n駐車場: 1,000円/回（普通車） 設備 水洗トイレ、手洗い場、自販機、ベンチ 公式サイト 敦賀観光協会 敦賀海釣り公園のここがすごい！ \u0026nbsp; 鉄壁の安全対策: 大人の腰の高さまであるしっかりとした柵が、釣り場全体を囲んでいます。小さなお子様が走り回っても海に落ちる心配がありません。 快適な設備: 綺麗に管理されたトイレと、釣行後に手を洗える水道が完備。これだけで「また来たい」と思える快適度です。 魚影の濃さ: 湾内ですが潮通しが良く、特にアジの魚影は特筆もの。サビキ釣りで「入れ食い（鈴なり）」を体験できる確率が非常に高いです。 こんな人に最適！ \u0026nbsp; 海釣りデビューのファミリー: 安全性、快適性、釣れやすさ、どれをとっても入門に最適です。 カップル: 景色が良く、トイレも清潔なので、デートでの釣りにも使えます。 秋のエギンガー: 9月〜10月のアオリイカシーズンは、新子の数釣りが楽しめるホットスポットになります。 敦賀市海釣り公園の攻略法 \u0026nbsp; 1. サビキは「内向き」と「外向き」を使い分けろ \u0026nbsp; 足場が良いL字型の堤防ですが、内向きは波が穏やかで子供向け。外向きは潮通しが良いので、良型のアジや回遊魚が回ってきます。 まずは内向きで様子を見て、釣れなければ外向きに挑戦するのがセオリーです。\n2. 「トリックサビキ」が最強 \u0026nbsp; 普通のアミエビをカゴに詰めるサビキでも釣れますが、食いが渋い時は「トリックサビキ（針に直接エサをつけるタイプ）」を使うと、周りが釣れていない中で一人勝ちできることがあります。\n3. 早朝到着は必須 \u0026nbsp; 人気の釣り場かつ、スペースに限りがあるため、土日祝日は朝6時～7時には駐車場が満車になることも。場所取りも含めて、可能な限り早めの到着をおすすめします。\n釣れる魚種と時期 \u0026nbsp; 春: メバル、カサゴ、チヌ（クロダイ） 夏: 豆アジ、キス、サヨリ、タコ 秋: アオリイカ、アジ（中型）、サゴシ、カマス 冬: カレイ、アイナメ（※北風が強い日は釣りになりません） アクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 北陸自動車道**「敦賀IC」**から約20分。 海沿いの綺麗な道路（県道33号）を走るので、ドライブそのものも楽しめます。 釣り場の目の前に大きな駐車場があるので、荷物運びも楽々です。\nまとめ：安全・快適・爆釣の三冠王 \u0026nbsp; 敦賀市海釣り公園は、「誰でも安全に釣りを楽しめる」という点において、福井県内でもトップクラスの施設です。 「海釣りって道具が大変そう…」「子供が危なくないか心配…」 そんなハードルを全て取り払ってくれます。\n今度の週末は、お弁当を持って敦賀へドライブしませんか？ 青い海と、銀色に輝くアジたちが、あなたを待っています。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 84,
        href: "/fukuoka/umingu-oshima/",
        title: "【福岡県】うみんぐ大島｜離島の海上釣り堀・堤防釣りが同時に楽...",
        description: "うみんぐ大島は、福岡県宗像市の大島にある海洋体験施設で、海上釣り堀と堤防釣りの両方を楽しむことができる珍しい施設です。",
        
        
        content: "うみんぐ大島は、福岡県宗像市の大島にある海洋体験施設で、海上釣り堀と堤防釣りの両方を楽しむことができる珍しい施設です。\n玄界灘に浮かぶ大島の豊かな海洋環境で、初心者から上級者まで幅広く楽しめる釣り体験を提供しています。海上釣り堀では確実にマダイやブリなどの大型魚が狙え、堤防釣りでは天然魚との駆け引きを味わうことができます。\nうみんぐ大島の基本情報 \u0026nbsp; 場所：〒811-3701 福岡県宗像市大島1822-4 営業時間：4～10月：8:00～17:00、11～3月：8:00～16:00 定休日：毎週火曜日（祝日は営業、翌日休み）、年末年始（12/28～1/4） 平均予算：堤防釣り620円＋貸竿1,200円、釣堀6,000円（一般個人） レンタル：貸竿セット1,200円（竿・リール・仕掛け）、エサ200円から販売 釣具の持ち込み：可能（釣堀は1人竿1本まで） 釣れる魚：【堤防】クロダイ・メジナ・シーバス・カサゴ・アジ・アオリイカ・メバル・カワハギ　【釣堀】ブリ（ヤズ）・シマアジ・マダイ 注意事項：撒き餌はアミ以外禁止、エギング・ルアー・投げ・カゴ釣りは専用コーナーで実施、釣堀で釣った魚は全て持ち帰り可能 ウェブサイト： うみんぐ大島 料金体系について \u0026nbsp; うみんぐ大島は、堤防釣りと海上釣り堀で異なる料金体系を採用しています。\n＜堤防釣り料金（海洋体験施設入場料）＞\n一般：620円、小学生：310円 団体（15名以上）：一般520円、小学生260円 ＜海上釣り堀料金＞ 海上釣り堀は完全予約制で、午前と午後の2部制となっています。\n区分 時間帯 個人料金 同伴者料金 一般 8:45～11:45 12:45～15:45 6,000円 1,660円 小学生 8:45～11:45 12:45～15:45 3,800円 830円 団体（一般） 同上 5,650円 1,350円 団体（小学生） 同上 3,620円 670円 ※1～2月は1部制（10:30～13:30）で平日のみの営業 ※海上釣り堀料金には海洋施設への入場料が含まれており、釣堀と堤防釣りの両方が楽しめます\n注意事項と補足データ \u0026nbsp; うみんぐ大島は離島にある施設のため、フェリーでのアクセスが必要です。釣堀は完全予約制となっており、事前の予約が必須となります。\n釣堀では竿は1人1本までの制限がありますが、竿の共有は可能です。ただし、共有する人には同伴料金が加算される料金システムとなっています。エサや釣具のレンタルは別料金となるため、予算を事前に計算しておくことをおすすめします。\n釣堀で釣れた魚は全て持ち帰り可能で、下処理サービスも利用できるため、釣った魚を美味しく持ち帰ることができます。\nうみんぐ大島のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 釣り場環境と特徴 \u0026nbsp; うみんぐ大島は玄界灘に浮かぶ大島に位置し、豊かな海洋環境に恵まれています。堤防釣りエリアは天然の魚が回遊する環境で、海上釣り堀は管理された環境で確実な釣果が期待できます。\n離島という立地のため海水の透明度が高く、魚の活性も良好です。潮通しが良いため、様々な回遊魚との出会いも期待できます。\nおすすめの仕掛けとタックル \u0026nbsp; 海上釣り堀での釣り\nロッド：3.6～4.5mのウキ釣り専用竿 リール：2500～3000番のスピニングリール ライン：フロロカーボン3～4号 仕掛け：ウキ釣り仕掛け（ハリス2～3号、針はマダイ針7～9号） エサ：オキアミ、練り餌、活きアジ 堤防でのクロダイ・メジナ狙い\nロッド：4.5～5.3mの磯竿 リール：2500番のスピニングリール ライン：ナイロン2.5～3号 仕掛け：ウキ釣り仕掛け（ハリス1.5～2号、針はチヌ針2～4号） エサ：オキアミ、サナギ、コーン 堤防でのアジ・アオリイカ狙い\nロッド：2.7～3.6mのエギングロッド（専用コーナーで使用） リール：2500番のスピニングリール ライン：PE0.8～1号 仕掛け：エギ（3～3.5号）、サビキ仕掛け エサ：アミエビ（サビキ釣り時） 季節別攻略法 \u0026nbsp; 春（3月～5月） メバル、カサゴなどの根魚が好調。海上釣り堀では放流されたマダイの活性が上がり始めます。\n夏（6月～8月） アジの群れが接岸し、サビキ釣りが最盛期を迎えます。アオリイカも狙いやすい時期です。\n秋（9月～11月） クロダイ、メジナが最も活発になる時期。海上釣り堀では大型のブリやカンパチも期待できます。\n冬（12月～2月） 根魚中心の釣りとなりますが、海上釣り堀は1部制での営業となるため注意が必要です。\nうみんぐ大島へのアクセス情報 \u0026nbsp; フェリーでのアクセス｜必須！ \u0026nbsp; 神湊港から大島へ\n神湊港～大島港：フェリー約25分、旅客船約15分 運賃：大人往復940円、小学生往復470円 運行時間：6:15～19:40（時期により変動） 駐車場：神湊港に有料駐車場あり（1日500円） 神湊港へのアクセス \u0026nbsp; 車でのアクセス｜おすすめ！\n福岡市中心部から：約1時間 北九州市から：約1時間30分 九州自動車道「古賀IC」から約30分 公共交通機関でのアクセス\nJR鹿児島本線「東郷駅」からタクシー約15分 西鉄バス「神湊波止場」バス停下車すぐ 近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 【最安】予算を抑えたい方向け\n民宿・ゲストハウス：5,000円～8,000円程度 例：大島内の民宿、宗像市内のビジネスホテル 【平均】標準的な宿泊施設\nリゾートホテル・旅館：10,000円～15,000円程度 例：玄海ロイヤルホテル、宗像王丸・雄丸の宿など 【高くてもいい】快適さを重視する方向け\n高級リゾートホテル：20,000円以上 例：ヒルトン福岡シーホーク、リーガロイヤルホテル小倉など レンタカー 神湊港周辺および福岡市内のレンタカー会社を利用\nトヨタレンタカー福岡空港店 ニッポンレンタカー博多駅前店 タイムズカーレンタル天神店 料金は1日あたり5,000円～8,000円程度。運転免許証は必須です。\n実際に利用したユーザーの声を抜粋 \u0026nbsp; 40代男性「★★★★★｜5.0」 \u0026nbsp; 海上釣り堀と堤防釣りの両方が楽しめるのが最高です。釣り堀では60cmのマダイが釣れて、堤防ではアオリイカも狙えました。離島ならではの海の綺麗さも魅力的です。\n30代女性「★★★★☆｜4.0」 \u0026nbsp; 家族で利用しました。子どもは釣り堀で確実に魚が釣れて大喜び。私は堤防でのんびり釣りを楽しめました。フェリーでの移動も含めて良い思い出になります。\n50代男性「★★★★★｜5.0」 \u0026nbsp; 玄界灘の離島で釣りができるのは贅沢な体験です。海水の透明度が高く、魚の活性も良好。都市部では味わえない本格的な海釣りが楽しめます。\n60代男性「★★★★☆｜4.0」 \u0026nbsp; 料金は少し高めですが、それに見合った価値があります。下処理サービスも助かりました。ただし、フェリーの時間に合わせる必要があるので、時間管理が重要です。\n20代男性「★★★☆☆｜3.0」 \u0026nbsp; 釣り堀は初心者向けで確実に釣れますが、上級者には少し物足りないかもしれません。堤防釣りは天然魚相手なので技術が試されます。アクセスに時間がかかるのがネックです。\n【まとめ】うみんぐ大島をおすすめしたい理由 \u0026nbsp; 施設の魅力と特徴 \u0026nbsp; うみんぐ大島最大の魅力は、海上釣り堀と堤防釣りの両方を一つの施設で体験できることです。玄界灘の離島という立地により、都市部では体験できない透明度の高い海での釣りが楽しめます。海上釣り堀では確実な釣果が期待でき、堤防釣りでは天然魚との真剣勝負を味わうことができます。\n最適な利用シーン \u0026nbsp; 家族連れや初心者グループには海上釣り堀がおすすめで、確実に魚を釣って帰ることができます。経験者は堤防釣りで玄界灘の天然魚に挑戦し、技術向上を図ることができます。離島での釣り体験は特別感があり、記念日や特別な日の釣行にも最適です。\n注意点とアドバイス \u0026nbsp; フェリーの運行時間に合わせたスケジュール管理が重要です。特に最終便の時間は事前に確認しておきましょう。海上釣り堀は完全予約制のため、早めの予約が必要です。離島のため気象条件に左右されやすく、荒天時は運休の可能性もあります。\nおすすめ度★★★★☆（4/5） \u0026nbsp; うみんぐ大島は、離島ならではの特別な釣り体験を提供する貴重な施設です。アクセスに時間はかかりますが、それに見合った価値のある釣り体験が期待できます。特に海上釣り堀と堤防釣りの両方を楽しみたい方、離島での特別な釣り体験を求める方には強くおすすめできる施設です。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 85,
        href: "/fukuoka/hiake-kaikyo-fishing-park/",
        title: "【福岡県】日明け海峡釣り公園｜小倉駅近の無料海釣り施設・夜景...",
        description: "日明け海峡釣り公園は、北九州市小倉北区にある無料の海釣り施設で、JR小倉駅から車でわずか10分という抜群のアクセスを誇ります。",
        
        
        content: "日明け海峡釣り公園は、北九州市小倉北区にある無料の海釣り施設で、JR小倉駅から車でわずか10分という抜群のアクセスを誇ります。\n関門海峡を望む港湾部の堤防で釣りができ、クロダイやシーバスなど多彩な魚種が狙えます。夜間は工業地帯の美しい夜景も楽しめる一石二鳥のスポットで、地元釣り人から観光客まで幅広く利用されています。\n日明け海峡釣り公園の基本情報 \u0026nbsp; 場所：〒803-0801 福岡県北九州市小倉北区西港町121-1 営業時間：4～10月：6:00～21:00、11～3月：7:00～17:00 定休日：無休（気象により中止や閉鎖の可能性あり） 平均予算：無料（エサ・釣具は持参または現地購入） レンタル：釣具レンタルなし（展望台売店でエサ・釣具販売あり） 釣具の持ち込み：可能（投げ釣り禁止） 釣れる魚：クロダイ（チヌ）・メジナ（クロ）・シーバス・キス・カレイ・アジ・アイナメ・メバル・カサゴ 注意事項：投げ釣り禁止、堤防幅が狭いため安全に配慮 ウェブ資料：https://kitaqport.jp/jap/pamphlet/download/panhu_umiturikouen.pdf 料金体系について \u0026nbsp; 日明け海峡釣り公園の最大の魅力は、完全無料で利用できることです。\n＜利用料金＞\n入場料：無料 駐車場：無料 施設利用料：無料 ＜必要経費＞\n釣具：持参または現地購入 エサ：現地の展望台売店で購入可能 仕掛け：現地の展望台売店で購入可能 この完全無料システムにより、釣り初心者から上級者まで、経済的な負担なく海釣りを楽しむことができます。ただし、釣具レンタルサービスはないため、釣具は事前に準備するか現地で購入する必要があります。\n注意事項と補足データ \u0026nbsp; 日明け海峡釣り公園は港湾部の堤防を利用した施設のため、安全面での制限があります。堤防の幅が人がすれ違える程度と狭いため、投げ釣りは禁止されています。\n気象条件により施設が閉鎖される場合があるため、荒天時や強風時は事前に確認することをおすすめします。また、工業地帯に位置するため、夜間は美しい工場夜景を楽しむことができ、釣りと夜景鑑賞の両方を楽しめる珍しいスポットでもあります。\n釣具レンタルがないため、観光ついでの手ぶら利用には向きませんが、地元の釣具店や展望台売店で必要な道具を揃えることは可能です。\n日明け海峡釣り公園のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 釣り場環境と特徴 \u0026nbsp; 日明け海峡釣り公園は関門海峡に面した港湾部に位置し、潮通しが良く様々な魚種が回遊してきます。堤防の足元は水深約6～10mあり、狭いスペースながらも効率的な釣りが可能です。\n工業地帯の中にあるため水質への心配もあるかもしれませんが、意外にも魚影は濃く、特に夜間は多くの魚種が活発に活動します。\nおすすめの仕掛けとタックル \u0026nbsp; 投げ釣りが禁止されているため、足元周辺での釣りが中心となります。\nウキ釣り（クロダイ・メジナ狙い）\nロッド：4.5～5.3mの磯竿 リール：2500番のスピニングリール ライン：ナイロン2.5～3号 仕掛け：ウキ釣り仕掛け（ハリス1.5～2号、針はチヌ針2～4号） エサ：オキアミ、練り餌、コーン サビキ釣り（アジ狙い）\nロッド：3.6～4.5mの磯竿またはサビキ専用竿 リール：2500～3000番のスピニングリール ライン：ナイロン3～4号 仕掛け：サビキ仕掛け6～8号針 エサ：アミエビ、配合エサ 胴付き仕掛け（カサゴ・メバル狙い）\nロッド：2.7～3.6mの船竿または磯竿 リール：2000～2500番のスピニングリール ライン：ナイロン3号 仕掛け：胴付き仕掛け2～3本針 エサ：アオイソメ、イシゴカイ ルアー釣り（シーバス狙い）\nロッド：2.7～3.6mのシーバスロッド リール：2500～3000番のスピニングリール ライン：PE1～1.5号 ルアー：ミノー、バイブレーション、ワーム 季節別攻略法 \u0026nbsp; 春（3月～5月） メバル、カサゴ、アイナメなどの根魚が好調。夜釣りでの釣果が期待できます。\n夏（6月～8月） アジ、キスが活発になる時期。夕方から夜にかけてのサビキ釣りがおすすめです。\n秋（9月～11月） クロダイ、メジナが最も活発な時期。シーバスも狙いやすくなります。\n冬（12月～2月） 根魚中心の釣りとなりますが、工場排水の影響で水温が安定しており、意外に釣果が期待できます。\n日明け海峡釣り公園へのアクセス情報 \u0026nbsp; 車でのアクセス｜おすすめ！ \u0026nbsp; 北九州市内から\nJR小倉駅から約10分 国道3号線経由でアクセス良好 駐車場：無料（約50台収容） その他主要都市から\n福岡市から：約1時間20分 下関市から：約20分 中間市から：約40分 公共交通機関でのアクセス \u0026nbsp; 徒歩・バス利用\nJR小倉駅から徒歩約25分 西鉄バス「西港」バス停から徒歩約5分 タクシー利用\nJR小倉駅からタクシー約10分（約1,500円） JR門司港駅からタクシー約15分（約2,000円） 近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 【最安】予算を抑えたい方向け\nビジネスホテル：4,000円～6,500円程度 例：東横イン小倉駅南口、ホテルルートイン小倉駅前など 【平均】標準的な宿泊施設\nシティホテル：8,000円～12,000円程度 例：リーガロイヤルホテル小倉、ステーションホテル小倉など 【高くてもいい】快適さを重視する方向け\n高級ホテル：15,000円以上 例：小倉リーガロイヤルホテル上層階、門司港ホテルなど レンタカー 小倉駅周辺の主要レンタカー会社\nトヨタレンタカー小倉駅前店 ニッポンレンタカー小倉駅新幹線口店 タイムズカーレンタル小倉駅前店 料金は1日あたり5,000円～8,000円程度。運転免許証は必須です。\n実際に利用したユーザーの声を抜粋 \u0026nbsp; 60代男性「★★★★★｜5.0」 \u0026nbsp; 無料でこれだけの釣り場が使えるのは素晴らしい。小倉駅からも近く、仕事帰りでも気軽に寄れます。夜景も綺麗で、釣りと景色の両方が楽しめる贅沢なスポットです。\n40代男性「★★★★☆｜4.0」 \u0026nbsp; 地元の隠れた名所です。クロダイの実績が高く、常連さんも多い。無料なので気軽に通えるのが最大のメリット。ただし、場所が狭いので混雑時は少し窮屈です。\n30代女性「★★★☆☆｜3.0」 \u0026nbsp; 夜景目的で彼氏と一緒に行きました。工場夜景は確かに綺麗ですが、釣具レンタルがないので手ぶらでは楽しめません。事前準備が必要な施設です。\n50代男性「★★★★☆｜4.0」 \u0026nbsp; 夜釣りでメバルがよく釣れます。照明もあって安全性は高い。無料施設としては管理が行き届いていて、トイレもきれいです。投げ釣りができないのが少し残念。\n70代男性「★★★★★｜5.0」 \u0026nbsp; 年金生活者には無料施設がありがたい。毎週のように通っているが、季節ごとに違う魚が釣れて飽きない。地元の人との情報交換も楽しみの一つです。\n【まとめ】日明け海峡釣り公園をおすすめしたい理由 \u0026nbsp; 施設の魅力と特徴 \u0026nbsp; 日明け海峡釣り公園の最大の魅力は、完全無料で利用できることです。JR小倉駅から車で10分という抜群のアクセスに加えて、工業地帯の美しい夜景も楽しめる一石二鳥のスポットとなっています。24時間年中無休（気象条件除く）で利用できるため、ライフスタイルに合わせた釣行が可能です。\n最適な利用シーン \u0026nbsp; 経済的負担なく釣りを楽しみたい方、仕事帰りや空いた時間に気軽に釣りをしたい方に特におすすめです。また、北九州観光の一環として工場夜景を楽しみながら夜釣りを体験したい方にも最適です。地元の釣り愛好家にとっては、定期的に通える貴重な無料施設として重宝されています。\n注意点とアドバイス \u0026nbsp; 釣具レンタルがないため、必ず事前に釣具を準備する必要があります。投げ釣りが禁止されているため、足元での釣りに特化したタックルを用意しましょう。堤防幅が狭いため、混雑時は譲り合いの精神が大切です。また、工業地帯に位置するため、安全面には十分注意して利用してください。\nおすすめ度★★★★☆（4/5） \u0026nbsp; 日明け海峡釣り公園は、無料施設としては非常に優秀で、アクセスの良さ、夜景という付加価値も魅力的です。釣具の事前準備が必要という制約はありますが、それを差し引いても十分におすすめできる施設です。特に地元の方や釣り経験者、経済的に釣りを楽しみたい方には強くおすすめできる貴重なスポットといえるでしょう。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 86,
        href: "/fukuoka/fukuoka-city-sea-fishing-park/",
        title: "【福岡県】福岡市海づり公園｜都市部からアクセス便利・手ぶらO...",
        description: "福岡市海づり公園は、福岡市西区にある海釣り施設で、都市部からわずか30分でアクセスできる便利な立地が魅力です。",
        
        
        content: "福岡市海づり公園は、福岡市西区にある海釣り施設で、都市部からわずか30分でアクセスできる便利な立地が魅力です。\n海上に張り出した桟橋から様々な魚種を狙うことができ、釣具レンタルも充実しているため初心者でも安心して楽しめます。真鯛釣堀も併設されており、確実に釣果を得たい方にもおすすめの施設です。\n福岡市海づり公園の基本情報 \u0026nbsp; 場所：〒819-0203 福岡県福岡市西区大字小田字池ノ浦地先 営業時間：季節により変動（4月：6:00～19:00、5月～8月：6:00～20:00、9月：6:00～19:00、10月：6:00～18:00、11月：7:00～18:00、12月：7:00～17:00、1月～3月：7:00～18:00） 定休日：毎週火曜日（祝日は営業、翌日が休み）、年末年始（12/29～1/3） 平均予算：大人1,000円（4時間以内）、延長1時間ごと250円、一日券2,000円 レンタル：竿リールセット500円、サビキ仕掛け500円、アミエサ500円、一式セット1,500円 釣具の持ち込み：可能（1人3本まで） 釣れる魚：クロダイ（チヌ）・アジ・シーバス（スズキ）・アイナメ・イシダイ・メジナ（クロ）・ヒラメ・カレイ・カワハギ・サヨリ・メバル・カサゴ 注意事項：アミ・オキアミ以外の撒き餌禁止、サビキ仕掛け・アミカゴ・ウキカゴでの遠投禁止、イカ釣りのヤエン禁止 ウェブサイト： 福岡市海づり公園 料金体系について \u0026nbsp; 福岡市海づり公園は時間制の料金システムを採用しており、初心者から上級者まで予算に合わせた利用が可能です。\n＜基本料金＞\n釣台使用料（4時間以内）：大人1,000円、子供500円 超過料金（1時間ごと）：大人250円、子供100円 入園料（見学のみ）：大人200円、子供100円 ＜お得なプラン＞\n一日券：大人2,000円、子供1,000円 回数券：11枚綴りで1回分お得 ナイター割引、レディースデー割引などの特別プランも充実 真鯛釣堀も併設されており、営業時間は9:30～16:30。マダイは100gあたりの買取方式で、1匹約2,200円となります。下処理サービスは300円追加で利用可能です。\n注意事項と補足データ \u0026nbsp; 施設では安全性と快適性を重視したルールが設けられています。アミ・オキアミ以外の撒き餌は禁止されており、サビキ仕掛けでの遠投も危険防止のため制限されています。\n小学生以下のお子様は保護者の同伴が必須となっており、家族連れでも安心して利用できる環境が整っています。釣台は金網とコンクリートで構成されているため、座布団やレジャーシートを持参すると快適に過ごせます。\n見学者は釣台エリアには立ち入れませんが、入園料200円で施設内を見学することができ、釣りをしない家族も一緒に楽しめます。\n福岡市海づり公園のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 釣り場環境と特徴 \u0026nbsp; 福岡市海づり公園は博多湾内に位置する海上桟橋で、波が比較的穏やかで初心者にも安全な環境です。桟橋の足元は水深約8～12mあり、様々な魚種を狙えるポイントとなっています。\nおすすめの仕掛けとタックル \u0026nbsp; サビキ釣り（アジ・サバ狙い）\nロッド：3.6～4.5mの磯竿またはサビキ専用竿 リール：2500～3000番のスピニングリール ライン：ナイロン3～4号 仕掛け：サビキ仕掛け6～8号針 エサ：アミエビ、オキアミ ウキ釣り（クロダイ・メジナ狙い）\nロッド：4.5～5.3mの磯竿 リール：2500番のスピニングリール ライン：ナイロン2～3号 仕掛け：ウキ釣り仕掛け（ハリス1.5～2号、針はチヌ針2～4号） エサ：オキアミ、練り餌 胴付き仕掛け（カサゴ・メバル狙い）\nロッド：2.7～3.6mの船竿または磯竿 リール：2000～2500番のスピニングリール ライン：ナイロン3号 仕掛け：胴付き仕掛け2～3本針 エサ：アオイソメ、イシゴカイ 季節別の釣果情報 \u0026nbsp; 春（3月～5月） メバル、カサゴ、クロダイが活発に活動します。水温の上昇とともにアジの群れも接岸し始めるため、サビキ釣りが効果的です。\n夏（6月～8月） アジ、サバなどの回遊魚が最盛期を迎えます。夜釣りではメバルやカサゴの活性が高く、夕マズメから夜にかけてがおすすめです。\n秋（9月～11月） クロダイ、シーバスが好調な時期です。また、カワハギやヒラメなどの底物も狙いやすくなります。\n冬（12月～2月） メバル、カサゴなどの根魚がメインターゲットとなります。日中の暖かい時間帯を狙うのがコツです。\n福岡市海づり公園へのアクセス情報 \u0026nbsp; 車でのアクセス｜おすすめ！ \u0026nbsp; 福岡市中心部から\n福岡都市高速「愛宕IC」から約15分 国道202号線経由で約30分 駐車場：普通車500円/日、大型車1,000円/日 その他主要都市から\n北九州市から：約1時間30分 久留米市から：約1時間 佐賀市から：約1時間 公共交通機関でのアクセス \u0026nbsp; 電車・バス利用\nJR筑肥線「今宿駅」からタクシー約15分 西鉄バス「小田部団地」バス停から徒歩約20分 地下鉄利用\n福岡市地下鉄空港線「姪浜駅」からタクシー約20分 近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 【最安】予算を抑えたい方向け\nビジネスホテル：4,000円～6,000円程度 例：ホテルルートイン福岡前原、東横イン福岡天神など 【平均】標準的な宿泊施設\nシティホテル：8,000円～12,000円程度 例：リッチモンドホテル福岡天神、ホテルニューオータニ博多など 【高くてもいい】快適さを重視する方向け\n高級ホテル：15,000円以上 例：グランドハイアット福岡、ホテルオークラ福岡など レンタカー 福岡市内には複数のレンタカー会社があります。\nトヨタレンタカー福岡空港店 ニッポンレンタカー博多駅前店 タイムズカーレンタル天神店 釣具を持参する場合は、荷物スペースを考慮してコンパクトカー以上をおすすめします。料金は1日あたり5,000円～8,000円程度です。\n実際に利用したユーザーの声を抜粋 \u0026nbsp; 50代男性「★★★★★｜5.0」 \u0026nbsp; 福岡市内からこんなに近くで本格的な海釣りができるとは思いませんでした。釣具レンタルも充実していて、手ぶらで来てもしっかり楽しめます。アジのサビキ釣りで30匹以上釣れて大満足でした。\n30代女性「★★★★☆｜4.0」 \u0026nbsp; 家族で初めて海釣りに挑戦しました。スタッフの方が丁寧に教えてくださり、子どもたちも楽しく釣りができました。トイレや休憩所もきれいで、女性でも安心して利用できます。\n40代男性「★★★★★｜5.0」 \u0026nbsp; 真鯛釣堀が特におすすめです。確実に釣果が得られるので、お客様を連れて行く時によく利用しています。一般の釣り場でも大型のシーバスが釣れて、技術向上にも良い施設です。\n60代男性「★★★★☆｜4.0」 \u0026nbsp; 回数券を購入して定期的に通っています。料金が良心的で、年金生活者にも優しい設定です。ただし、土日は混雑するので平日利用がおすすめです。\n20代男性「★★★☆☆｜3.0」 \u0026nbsp; 初心者には良い施設だと思いますが、上級者には少し物足りないかもしれません。仕掛けの制限もあるので、自由度を求める人には向かないかも。ただし、アクセスの良さは抜群です。\n【まとめ】福岡市海づり公園をおすすめしたい理由 \u0026nbsp; 施設の魅力と特徴 \u0026nbsp; 福岡市海づり公園は、都市部からのアクセスの良さと充実した設備が最大の魅力です。福岡市中心部から車で30分という立地は、九州でも屈指の利便性を誇ります。また、釣具レンタルが一式1,500円で利用でき、初心者でも気軽に本格的な海釣りを体験できる環境が整っています。\n真鯛釣堀の併設により、天然魚での釣果が期待できない場合でも確実に魚を持ち帰ることができ、お客様接待や家族サービスにも最適な施設となっています。\n最適な利用シーン \u0026nbsp; 平日の利用であれば混雑を避けて快適に釣りを楽しめ、特に初心者の方や女性、お子様連れのファミリーにおすすめです。福岡観光の一環として半日程度の釣り体験を組み込むことも可能で、博多グルメと合わせた福岡満喫プランとしても活用できます。\n注意点とアドバイス \u0026nbsp; 土日祝日は混雑が予想されるため、早めの到着を心がけてください。また、真鯛釣堀は買取方式のため、釣りすぎには注意が必要です。釣具レンタルは充実していますが、こだわりのある方は事前に釣具店で仕掛けを準備することをおすすめします。\nおすすめ度★★★★☆（4/5） \u0026nbsp; 福岡市海づり公園は、アクセスの良さ、料金の手頃さ、設備の充実度を総合的に評価すると、九州地方でもトップクラスの海釣り施設です。特に釣り初心者や都市部在住の方には強くおすすめできる施設といえるでしょう。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 87,
        href: "/fukuoka/waita-sea-fishing-pier/",
        title: "【福岡県】脇田海釣り桟橋｜北九州市の手ぶらOK・料金格安・初...",
        description: "脇田海釣り桟橋は、北九州市若松区にある海上桟橋型の海釣り施設で、手頃な料金と充実したレンタル設備が魅力です。",
        
        
        content: "脇田海釣り桟橋は、北九州市若松区にある海上桟橋型の海釣り施設で、手頃な料金と充実したレンタル設備が魅力です。\nJR小倉駅から車で40分とアクセスも良好で、釣具一式800円のレンタルセットにより手ぶらでも本格的な海釣りが楽しめます。響灘に面した立地で、クロダイ、ヒラメ、シーバスなど多彩な魚種が狙える北九州屈指の海釣りスポットです。\n脇田海釣り桟橋の基本情報 \u0026nbsp; 場所：〒808-0124 福岡県北九州市若松区安屋地先 営業時間：4～10月：6:00～18:00、11～3月：7:00～17:00 定休日：毎週火曜日（祝日は営業、翌平日に休み）、年末年始（12/29～1/3） 平均予算：大人1,000円、レンタル一式800円で計1,800円 レンタル：一式セット800円（竿・リール・エサ・仕掛け・バケツ付き） 釣具の持ち込み：可能（1人2本まで、ルアー禁止、投げ釣りは専用区画設置時のみ） 釣れる魚：クロダイ（チヌ）・ヒラメ・シーバス・サヨリ・メバル・カサゴ・アジ・メジナ（クロ）・イシダイ 注意事項：小学生以下は大人の同伴必須、赤土や麦などの撒き餌禁止、貸竿受付時間に制限あり ウェブサイト： 脇田海釣り桟橋 料金体系について \u0026nbsp; 脇田海釣り桟橋は、北九州地域でも特に良心的な料金設定が魅力の施設です。\n＜基本料金＞\n通常料金：大人1,000円、小中学生500円 団体料金（30名以上）：大人800円、小中学生400円 回数券（11枚綴り）：大人10,000円、小中学生5,000円 ＜レンタル料金＞\n釣具一式セット：800円（竿・リール・エサ・仕掛け・バケツ付き） 回数券は11枚綴りで1回分お得になる計算で、定期的に利用する方にはかなりお得です。レンタル一式セットは必要なものが全て含まれており、初心者でも安心して利用できる内容となっています。\n注意事項と補足データ \u0026nbsp; 脇田海釣り桟橋では安全性を重視したルールが設けられています。小学生以下のお子様は必ず大人の同伴が必要で、釣り竿は1人につき2本までの制限があります。\n貸竿の受付時間に制限があり、4～10月は8:00～14:30、11～3月は9:00～13:30となっています。この時間を過ぎるとレンタルできないため、手ぶらで訪問予定の方は注意が必要です。\n桟橋は金網構造のため、レジャーシートや座布団クッションを持参すると快適に過ごせます。また、ルアー釣りは基本的に禁止されており、投げ釣りも専用区画設置期間以外は禁止となっています。\n脇田海釣り桟橋のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 釣り場環境と特徴 \u0026nbsp; 脇田海釣り桟橋は響灘に面した海上桟橋で、水深は足元で約8～12mあります。潮通しが良く、年間を通して様々な魚種が回遊してくる好ポイントです。\n桟橋は全長約300mあり、先端部ほど水深が深くなっています。足場は安定しており、初心者からファミリーフィッシングまで安心して楽しめる環境が整っています。\nおすすめの仕掛けとタックル \u0026nbsp; サビキ釣り（アジ・サバ狙い）\nロッド：3.6～4.5mのサビキ専用竿または磯竿 リール：2500～3000番のスピニングリール ライン：ナイロン3～4号 仕掛け：サビキ仕掛け6～8号針 エサ：アミエビ、配合エサ ウキ釣り（クロダイ・メジナ狙い）\nロッド：4.5～5.3mの磯竿 リール：2500番のスピニングリール ライン：ナイロン2.5～3号 仕掛け：ウキ釣り仕掛け（ハリス1.5～2号、針はチヌ針2～4号） エサ：オキアミ、練り餌、コーン 胴付き仕掛け（カサゴ・メバル狙い）\nロッド：2.7～3.6mの船竿または磯竿 リール：2000～2500番のスピニングリール ライン：ナイロン3号 仕掛け：胴付き仕掛け2～3本針 エサ：アオイソメ、イシゴカイ、オキアミ 季節別の釣果情報 \u0026nbsp; 春（3月～5月） メバル、カサゴが好調な時期です。水温上昇とともにクロダイの活性も上がり始めます。桟橋周辺での夜釣りがおすすめです。\n夏（6月～8月） アジ、サバなどの回遊魚が最盛期を迎えます。サビキ釣りで数釣りが楽しめ、ファミリーフィッシングに最適な季節です。\n秋（9月～11月） クロダイ、メジナが最も活発になる時期です。また、シーバスやヒラメなどの大型魚も期待できます。\n冬（12月～2月） メバル、カサゴなどの根魚中心の釣りとなります。日中の暖かい時間帯を狙うのがコツです。\n脇田海釣り桟橋へのアクセス情報 \u0026nbsp; 車でのアクセス｜おすすめ！ \u0026nbsp; 北九州市内から\nJR小倉駅から約40分 国道199号線経由でアクセス良好 駐車場：無料（約100台収容） その他主要都市から\n福岡市から：約1時間30分 中間市から：約30分 遠賀町から：約20分 公共交通機関でのアクセス \u0026nbsp; バス利用\nJR折尾駅から西鉄バス「脇田海水浴場」行き約30分 終点「脇田海水浴場」下車、徒歩約5分 タクシー利用\nJR折尾駅からタクシー約25分（約3,000円） JR小倉駅からタクシー約40分（約5,000円） 近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 【最安】予算を抑えたい方向け\nビジネスホテル：4,500円～6,500円程度 例：ホテルルートイン北九州若松駅東、東横イン小倉駅南口など 【平均】標準的な宿泊施設\nシティホテル：8,000円～12,000円程度 例：リーガロイヤルホテル小倉、ステーションホテル小倉など 【高くてもいい】快適さを重視する方向け\n高級ホテル：15,000円以上 例：小倉リーガロイヤルホテル、アパホテル＆リゾート東京ベイ幕張など レンタカー 北九州市内の主要レンタカー会社\nトヨタレンタカー小倉駅前店 ニッポンレンタカー小倉駅新幹線口店 タイムズカーレンタル小倉駅前店 料金は1日あたり5,000円～8,000円程度。運転免許証は必須です。\n実際に利用したユーザーの声を抜粋 \u0026nbsp; 50代男性「★★★★★｜5.0」 \u0026nbsp; 料金が安くて釣具レンタルも充実しているので、思い立ったときに気軽に行けます。クロダイが良く釣れるポイントで、地元の常連さんも多く情報交換も楽しいです。\n40代女性「★★★★☆｜4.0」 \u0026nbsp; 家族で利用しました。子どもたちもサビキ釣りでアジがたくさん釣れて大喜び。桟橋は安全で、トイレも清潔なので女性でも安心して利用できます。\n30代男性「★★★★★｜5.0」 \u0026nbsp; 北九州からのアクセスが良く、仕事帰りでも気軽に寄れるのが最高です。レンタル一式800円は破格の安さ。夕マズメ狙いで良型のシーバスも釣れました。\n60代男性「★★★★☆｜4.0」 \u0026nbsp; 回数券を利用して定期的に通っています。施設は清潔で管理も行き届いている。ただし、土日は混雑するので平日利用がおすすめです。\n20代男性「★★★☆☆｜3.0」 \u0026nbsp; ルアー釣りが基本禁止なのが残念です。エサ釣り専門という感じで、ルアーマンには少し物足りないかもしれません。ただし、料金の安さは魅力的です。\n【まとめ】脇田海釣り桟橋をおすすめしたい理由 \u0026nbsp; 施設の魅力と特徴 \u0026nbsp; 脇田海釣り桟橋の最大の魅力は、優れたコストパフォーマンスです。大人1,000円という手頃な料金に加えて、釣具一式800円のレンタルセットは他の施設と比較しても格安水準です。北九州市内からのアクセスも良好で、思い立ったときに気軽に訪れることができる立地も大きな魅力となっています。\n最適な利用シーン \u0026nbsp; 料金の安さと安全性から、ファミリーフィッシングや釣り初心者の方に特におすすめです。また、回数券制度があるため地元の釣り愛好家の定期利用にも適しています。仕事帰りや休日の半日釣行など、気軽な釣りを楽しみたい方には理想的な施設といえるでしょう。\n注意点とアドバイス \u0026nbsp; ルアー釣りが基本的に禁止されているため、ルアーフィッシングを楽しみたい方には不向きです。また、貸竿の受付時間に制限があるため、手ぶらで訪問する際は時間を確認してから出かけることをおすすめします。土日祝日は混雑が予想されるため、ゆっくり釣りを楽しみたい方は平日の利用が良いでしょう。\nおすすめ度★★★★☆（4/5） \u0026nbsp; 脇田海釣り桟橋は、料金の安さ、アクセスの良さ、安全性を総合的に評価すると、北九州地域では非常に優秀な海釣り施設です。特に釣り初心者やファミリーフィッシング、コストを抑えて気軽に釣りを楽しみたい方には強くおすすめできる施設といえるでしょう。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 88,
        href: "/hyogo/sea-fishing-pond-kaikei/",
        title: "【兵庫県】海の釣り堀 海恵｜4つの港からアクセスOK！マグロ...",
        description: "家島諸島の豊かな海に浮かぶ「海の釣り堀 海恵（かいえい）」。 ここは関西の釣り人にとって、「一番行きやすい離島」であり、同時に「一番大きな夢が見られる場所」です。",
        
        
        content: "家島諸島の豊かな海に浮かぶ「海の釣り堀 海恵（かいえい）」。 ここは関西の釣り人にとって、**「一番行きやすい離島」であり、同時に「一番大きな夢が見られる場所」**です。\n最大の特徴は、網干・姫路・赤穂（兵庫県）、日生（岡山県）の4つの港から送迎船が出ること。 自分の住んでいるエリアに合わせて最短ルートを選べるため、早朝の移動負担が劇的に軽くなります。\nそして釣り人たちの度肝を抜くのが**「マグロコーナー」や「クエ」**の存在。 単なるマダイ釣りでは満足できない、ヒリヒリするような大物とのファイトを求めるアングラーに贈る、ロマンあふれる釣り堀です。\n海の釣り堀 海恵（かいえい）の基本情報 \u0026nbsp; 項目 詳細 施設名 海の釣り堀 海恵（かいえい） 住所 〒670-0103 兵庫県姫路市家島町坊勢28-55 送迎港 網干港、姫路港、赤穂港、日生港（※要予約時に指定） 営業時間 各港出船 6:00〜7:00頃 → 現地釣り開始 7:30頃 〜 終了 13:00頃 定休日 水曜日（祝日は営業・要確認） 料金 男性 14,000円 / 女性・子供 11,000円（※渡船代込み） 釣れる魚 マダイ、シマアジ、ハマチ、カンパチ、ヒラマサ、イシダイ、クエ、本マグロ 公式サイト 海の釣り堀 海恵 全持ち帰りOK！安心の料金システム \u0026nbsp; 基本料金（男性14,000円）には「往復渡船代」が含まれています。 釣った魚はもちろん全持ち帰りOK。万が一ボウズ（0匹）でも、マダイなどのお土産保証があるため、手ぶらで帰る心配はありません。\n見学プランもあり 釣りをしない同伴者のための「見学プラン（渡船代のみ：男性3,000円、女性・子供・65歳以上1,500円など）」も設定されています。家族みんなで船旅と海上ピクニック気分を楽しむことも可能です。\n施設の特徴と魅力 \u0026nbsp; 選べる4つの出発港\n海恵だけの最強のメリットです。 大阪・神戸方面なら：「姫路港」か「網干港」 岡山方面なら：「日生港」か「赤穂港」 これにより、広いエリアからの集客を可能にしています。 夢の「マグロコーナー」「クエイベント」\n海恵の名を一躍有名にしたのが、専用イケスでの「本マグロ釣り」です（※予約・別料金などの条件あり、要確認）。30kg、40kgクラスのマグロが竿をへし折らんばかりに疾走する光景は圧巻です。 また、幻の高級魚「クエ」の放流イベントなども精力的です。 バリアフリー・快適設備\n足場が広くフラットで、トイレも清潔。女性や子供、ご年配の方でも安心して楽しめます。 海恵の攻略法 \u0026nbsp; おすすめの仕掛けとタックル \u0026nbsp; 基本タックル（マダイ・青物）\n竿：3.5m前後の海上釣堀竿（真鯛・青物用） リール：スピニング3000〜4000番 ライン：PE3号＋リーダー、またはナイロン5号〜6号 大物（マグロ・クエ）狙いの場合\n警告：生半可な道具では瞬殺されます。 マグロ：レンタルタックル（専用装備）の利用を強く推奨。 クエ：ハリス10号以上の極太仕掛け必須。エサはカツオのハラモやイワシ丸ごと。 釣果を伸ばす3つのコツ \u0026nbsp; エサのローテーション\n海恵の魚はグルメです。「黄色い団子」「赤い団子」「ササミ」「キビナゴ」「活きアジ」など、最低でも3〜4種類のエサを用意して、その日の当たりエサを探りましょう。 スタッフを頼る\n海恵のスタッフは非常にフレンドリーで親切です。「今のタナは？」「何のエサがいい？」と聞けば、的確なアドバイスをくれます。 底取りを正確に\nまずはタナ取りオモリを使って、正確に底までの深さを測りましょう。底から50cm〜1m上がマダイのゴールデンゾーンです。 アクセス情報（各港の詳細） \u0026nbsp; 網干（あぼし）港 山陽道「山陽姫路西IC」下車。無料駐車場あり。 姫路港 姫路バイパス「中地ランプ」下車。有料駐車場（1日500円）あり。 赤穂（あこう）港 山陽道「赤穂IC」下車。無料駐車場あり。 日生（ひなせ）港 岡山ブルーライン「備前IC」下車。定期船乗り場付近。 ※予約時に必ず**「どの港から乗るか」**を伝えてください。\n実際に利用したユーザーの声 \u0026nbsp; ※実際のレビューを参考に要約しています。\n50代男性（ベテラン）「★★★★☆｜4.0」 \u0026nbsp; 「赤穂から乗れるのが最高」 家から近くて楽。魚の質も良く、特にシマアジが美味しかった。マグロは見てるだけだったけど、掛けた人の竿の曲がり方が尋常じゃなかった（笑）。いつか挑戦したい。\n30代女性（ファミリー）「★★★★★｜5.0」 \u0026nbsp; 「子供が大喜び」 見学料金で子供と一緒にパパの応援に行きました。船に乗るだけで子供は大はしゃぎ。釣ったタイをその場で締めてもらって、夜はお刺身パーティーでした。スタッフさんが子供に優しくしてくれて嬉しかったです。\n40代男性（グループ）「★★★★☆｜4.0」 \u0026nbsp; 「貸切で青物祭り」 貸切で利用しました。持ち込みのエサで工夫して、仲間内で釣り大会。青物が連発したときは祭り騒ぎでした。トイレが綺麗なのもポイント高いです。\nまとめ：海の釣り堀 海恵をおすすめしたい度 ★★★★★ \u0026nbsp; 海恵は、**「利便性」と「夢」**が見事に融合した釣り堀です。\n4つの港から選べるアクセスの良さは、早起きが辛い釣り人にとって最強の味方。 そしてイケスの中には、一生に一度出会えるかどうかの巨大魚が潜んでいます。\n「今週末は手堅くマダイのお土産を確保したい」という堅実派も、「一発逆転のマグロ狙い」というロマン派も、どちらも満足させてくれる懐の深さが海恵にはあります。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 89,
        href: "/hyogo/kaijo-tsuribori-at-sea/",
        title: "【兵庫県】海上釣り堀あっとしー（@sea）｜明石駅から徒歩1...",
        description: "「海上釣り堀に行ってみたいけど、船に乗るのは怖いし、遠いのはちょっと…」 「買い物のついでに、ちょっとだけ釣りがしたい」",
        
        
        content: "「海上釣り堀に行ってみたいけど、船に乗るのは怖いし、遠いのはちょっと…」 「買い物のついでに、ちょっとだけ釣りがしたい」\nそんなワガママな願いを叶えるのが、兵庫県明石市にある**「明石海上釣り堀 @sea（あっとしー）」**です。\nここの最大の衝撃は、なんとJR明石駅から徒歩15分という立地。 しかも、船に乗らずに歩いて桟橋へ渡れる**「陸続き」**の釣り堀なのです。\nアクセス抜群でありながら、放流されているのは明石海峡の激流で育った極上の魚たち。 女性や子供でも安心して楽しめる、新しいスタイルの「都市型・高級魚釣り体験」をご紹介します。\n海上釣り堀あっとしー（@sea）の基本情報 \u0026nbsp; 項目 詳細 施設名 明石海上釣り堀 @sea（あっとしー） 住所 〒673-0883 兵庫県明石市中崎1丁目地先（明石市役所裏ベランダ） 営業時間 ・1部（午前）：8:00〜12:00（4時間）\n・2部（午後）：10:30〜14:30（4時間・土日祝のみ）\n・サンセット：13:30〜16:00（2.5時間・季節変動あり） 定休日 水曜日・木曜日（祝日は営業） 料金 男性 11,000円 / 女性・子供 7,700円（一般コース） 釣れる魚 マダイ、シマアジ、ハマチ、カンパチ、イサキ、クロソイなど 公式サイト あっとしー公式サイト 施設の特徴と魅力 \u0026nbsp; 圧倒的なアクセスの良さ\nJR「明石駅」または山陽電車「人丸前駅」から徒歩圏内。明石市役所のすぐ裏手にあります。 電車で行ける海上釣り堀は非常に珍しく、車を持っていない方や学生グループにも大人気です。 陸続きで船酔い知らず\n桟橋を歩いてイケスに向かうタイプなので、船酔いの心配がゼロ。 トイレも陸上の施設を利用できるので（※釣り場にも簡易トイレあり）、女性や小さなお子様連れでも安心感が違います。 格安の短時間プラン\n「サンセットコース（2.5時間）」なら5,500円でマダイなどの高級魚釣りに挑戦できます。「ちょっと試しにやってみたい」という入門者に最適です。 あっとしーの攻略法 \u0026nbsp; おすすめの仕掛けとタックル \u0026nbsp; マダイ・シマアジ狙い\n竿：3m前後の短めの海上釣堀竿。シーバスロッドやエギングロッドでも代用可能です。 リール：2500〜3000番（ナイロン3号〜4号） エサ：ダンゴ、アルゼンチン赤エビ（殻付き）、ササミ。 青物（ハマチ・カンパチ）狙い\n竿が短いため、強引なやり取りが必要です。 ハリスは5号以上推奨。活きアジやウグイ（銀兵）への反応が良いです。 釣果を伸ばすコツ \u0026nbsp; 足元を探る\n陸続きの堤防沿いにあるため、足元の壁際に魚が居着いていることが多いです。壁ギリギリに静かにエサを落としてみましょう。 細仕掛けが有利\nアクセスが良い分、魚も釣り人に慣れていて警戒心がやや高めです。食いが渋いときはハリスを細く（2.5号〜3号）するとアタリが増えます。 ルール確認\n外側の海では明石タコが有名ですが、釣り堀のイケス内で指定された魚種以外（タコなど）を狙うのは禁止されている場合があります。必ずルールを確認しましょう。 アクセス情報 \u0026nbsp; 電車でのアクセス（推奨！） \u0026nbsp; JR神戸線：「明石駅」から徒歩約15分。 山陽電鉄：「人丸前駅」から徒歩約10分。 明石市役所を目指して歩き、裏手の護岸に出るとすぐに見えます。 車でのアクセス \u0026nbsp; 第二神明道路「大蔵谷IC」より約10分。 駐車場：明石市役所の駐車場（有料）を利用するのが便利です。 実際に利用したユーザーの声 \u0026nbsp; ※実際のレビューを参考に要約しています。\n20代女性（グループ）「★★★★☆｜4.0」 \u0026nbsp; 「女子会釣行！」 電車で行けるのが本当に楽！女子4人でサンセットコースを利用しました。スタッフのお兄さんが餌をつけてくれたり、網ですくってくれたりして、全員マダイをゲットできました。帰りに明石駅前で明石焼きを食べて帰りました。\n40代男性（会社員）「★★★☆☆｜3.0」 \u0026nbsp; 「混雑に注意」 気軽に行ける分、土日はかなり混雑します。隣との距離が近いのでオマツリ（糸絡み）には注意が必要。魚は明石の潮で揉まれているせいか、引きが強くて美味しかった。\n30代男性（親子）「★★★★★｜5.0」 \u0026nbsp; 「子供も怖がらない」 船に乗らなくていいので、子供が怖がらなくて良かった。4時間コースでマダイ3匹、ハマチ1匹。スタッフが血抜きや内臓処理（有料）をしてくれるので、帰ってからが楽でした。\nまとめ：あっとしーはどんな人におすすめ？ \u0026nbsp; こんな人に最適 \u0026nbsp; 船酔いが心配な人 電車釣行・車なしの釣り人 デートや観光ついでに気軽に釣りをしたい人 「あっとしー」は、海上釣り堀のハードルを極限まで下げてくれた画期的な施設です。 本格的な離島への遠征も良いですが、「思いついたらすぐ行ける」「午後から少しだけ」 という使い方ができるのはここだけ。 手ぶらレンタルも完備されているので、明石観光のプランの一つとして「高級魚釣り」を組み込んでみてはいかがでしょうか？"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 90,
        href: "/hyogo/kobe-hiraiso-sea-fishing-park/",
        title: "【兵庫県】神戸市立平磯海づり公園｜東西1.4km！電車で行け...",
        description: "明石海峡大橋と淡路島を目の前に望む、最高のトワイライトゾーン。 「神戸市立平磯海づり公園」は、東西になんと1.4kmにもわたる広大な釣り場を持つ、関西最大級の海釣り公園です。",
        
        
        content: "明石海峡大橋と淡路島を目の前に望む、最高のトワイライトゾーン。 「神戸市立平磯海づり公園」は、東西になんと1.4kmにもわたる広大な釣り場を持つ、関西最大級の海釣り公園です。\nその圧倒的なスケールゆえに、混雑時でも隣の人との間隔を取りやすく、ゆったりと自分のペースで釣りを楽しめるのが最大の魅力。\nさらに電車（阪神・山陽・JR）の駅から徒歩圏内という驚異のアクセスの良さ、そして**4時間1,000円（大人）**という安さ。 神戸市民の憩いの場であり、関西のアングラーたちに愛され続ける名釣り場の全貌を紹介します。\n神戸市立平磯海づり公園の基本情報 \u0026nbsp; 項目 詳細 施設名 神戸市立平磯海づり公園 住所 〒655-0892 兵庫県神戸市垂水区平磯1-1-66 営業時間 6:00〜18:00（※季節により変動、夏休み期間はナイター営業あり） 定休日 木曜日（祝日の場合は営業）、年末年始 料金 ・大人（16歳以上）：4時間 1,000円（超過1時間250円）\n・小人（6歳〜15歳）：4時間 600円（超過1時間150円） 駐車料金 4時間 500円（以降1時間毎に100円加算など要確認） 釣れる魚 アオリイカ、メバル、ガシラ、カレイ、アジ、ベラ、マダイ、スズキ、チヌ 公式サイト 神戸市立平磯海づり公園 施設の特徴と魅力 \u0026nbsp; 圧倒的な広さと安全性\n1.4kmの海岸線に沿って全てに手すりが設置されており、子供連れでも安心です。 足場もコンクリートで完全にフラット。車椅子対応のトイレやスロープも完備されており、バリアフリー釣り場としても優秀です。 激流が生む豊かな魚影\n明石海峡の激流が流れ込むエリアのため、潮通しは抜群。身の引き締まった美味しい魚が育ちます。特に春のカレイ、秋のアオリイカ、冬のメバルは人気のターゲットです。 イベント・サポート\n初心者向けのスクールや、スタッフ（指導員）の巡回があり、困ったときは助けてくれます。 平磯海づり公園の攻略法 \u0026nbsp; おすすめの仕掛けとターゲット \u0026nbsp; 投げ釣り（カレイ・ベラ・キス）\n平磯の代名詞とも言える釣り方です。 注意：潮が速いため、オモリは20号〜30号を推奨。根掛かりが多い場所があるので、仕掛けの予備は多めに持ちましょう。 エギング（アオリイカ）\n秋（9月〜11月）は新子のアオリイカ数釣りのメッカとなります。 流れが速いので、エギにシンカー（仮面シンカー等の追加オモリ）を足して調整するのがコツです。 探り釣り・穴釣り（ガシラ・メバル）\n足元のケーソン（継ぎ目）や障害物周りには良型の根魚が潜んでいます。 胴付き仕掛けやブラクリ仕掛けで、足元を丹念に探りましょう。 釣果を伸ばすコツ \u0026nbsp; 「潮止まり」を狙う\n明石海峡の影響で潮が川のように流れる時間帯があります。この時は釣りになりにくいです。 潮見表を見て「潮止まり（満潮・干潮の前後）」のタイミングに集中して釣るのがポイントです。 場所の選び方\n1.4kmもあるので場所選びに迷いますが、基本的には「管理棟付近」や「中央付近」の水深がある場所が人気です。 素直にスタッフに「今日どこで釣れてますか？」と聞くのが一番確率が高いです。 アクセス情報 \u0026nbsp; 電車でのアクセス（推奨！） \u0026nbsp; 阪神・山陽電鉄：「東垂水駅」から徒歩約3分。 JR神戸線：「垂水駅」から徒歩約12分。 駅近なので、電車釣行組にとって最強の釣り場の一つです。 車でのアクセス \u0026nbsp; 阪神高速3号神戸線：「若宮IC」または「第二神明道路・名谷IC」から約10分。 駐車場：約400台収容の有料駐車場あり。 実際に利用したユーザーの声 \u0026nbsp; ※実際のレビューを参考に要約しています。\n40代男性（電車釣行）「★★★★★｜5.0」 \u0026nbsp; 「最高のロケーション」 ビール片手に電車で行けるのが最高。明石海峡大橋を眺めながらのんびり釣りができます。売店で売ってる軽食（カレーなど）も意外と美味しい。\n30代女性（ビギナー）「★★★★☆｜4.0」 \u0026nbsp; 「施設が整っている」 レンタル竿でサビキ釣りをしました。スタッフのおじさんが優しく教えてくれて、小アジとスズメダイがたくさん釣れました。トイレが要所要所にあるので遠くまで歩かなくて済むのが助かります。\n50代男性（ベテラン）「★★★☆☆｜3.0」 \u0026nbsp; 「根掛かり注意」 根掛かりとの戦い。場所によっては投げるたびに引っかかる。地形を把握するまでは仕掛けを大量にロストする覚悟が必要。でも、その障害物にいいメバルが付いているんだよなぁ。\nまとめ：神戸市立平磯海づり公園はどんな人におすすめ？ \u0026nbsp; こんな人に最適 \u0026nbsp; 電車で気軽に釣りに行きたい人 低予算で半日遊びたい人（大人1,000円） 広々とした場所で釣りをしたい人 平磯海づり公園は、**「アクセスの良さ」「安さ」「快適さ」**の三拍子が揃った優等生な釣り場です。 激流エリア特有の難しさ（潮の速さ、根掛かり）はありますが、それを攻略して良型のカレイやアオリイカを手にした時の喜びは格別。 ふらっと海を見に行く感覚で、ぜひ竿を出してみてください。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 91,
        href: "/hyogo/suma-sea-fishing-park/",
        title: "【兵庫県】須磨海づり公園｜2024年11月リニューアル！最新...",
        description: "「おかえり、須磨海づり公園！」",
        
        
        content: "「おかえり、須磨海づり公園！」\n2018年の甚大な台風被害により長らく休園していた神戸の釣りのシンボルが、2024年11月、ついにリニューアルオープンしました。\n新しくなった須磨海づり公園は、単なる復旧ではありません。 おしゃれな管理棟**「須磨浦ショップ」の新設、安全で快適な釣り台の整備、そしてキャッシュレス決済対応**など、令和の時代に合わせた最新の海釣り施設へと進化を遂げました。\n神戸・須磨の海に、再び釣り人たちの笑顔が戻ってきました。生まれ変わった須磨海づり公園の魅力を最速でお届けします。\n須磨海づり公園（リニューアル後）の基本情報 \u0026nbsp; 項目 詳細 施設名 神戸市立須磨海づり公園 住所 〒654-0076 兵庫県神戸市須磨区一ノ谷町5丁目地先 営業時間 ・4月〜11月：6:00〜20:00\n・12月〜3月：7:00〜18:00 定休日 火曜日（祝日の場合は翌平日）、年末年始 料金（4時間） 大人 1,200円 / 小人（小中学生） 700円 延長料金 大人 300円/時 / 小人 170円/時 釣れる魚 マダイ、チヌ、スズキ、アジ、メバル、アオリイカ、タチウオ等 公式サイト 須磨海づり公園 ここが変わった！3つのリニューアルポイント \u0026nbsp; 新管理棟「須磨浦ショップ」\n以前のレトロな雰囲気から一新。おしゃれな外観の管理棟には、売店や軽食コーナー、綺麗なトイレが完備されています。 釣具やエサの販売はもちろん、須磨の特産品やお土産も購入でき、釣り人以外も立ち寄れるスポットになりました。 釣り台の再整備\n沖合に突き出た第1・第2釣台が頑丈に改修されました。足元のグレーチング（金網）も新しくなり、安全性と快適性が大幅に向上。もちろん転落防止柵も完備されています。 キャッシュレス決済対応\n券売機や売店で、クレジットカードや電子マネー、QRコード決済が利用可能になりました。小銭を用意する必要がなくなり、スマートに入園できます。 須磨海づり公園の攻略法 \u0026nbsp; おすすめの仕掛けとターゲット \u0026nbsp; マダイ・チヌ（カゴ釣り・フカセ釣り）\n須磨の名物ターゲット。潮通しの良い先端付近が特等席です。 リニューアル後も大物の実績は健在です。 アジ・サバ（サビキ釣り）\n初心者やファミリーに最適。足元で良型のアジが釣れます。 注意：潮が速い時は、重めのドンブリカゴ（30号〜）を使う「鉄ドンブリ」などの工夫が必要です。 アオリイカ（エギング）\n秋の新子シーズンには、墨跡があちこちに見られるほど人気のターゲットです。 釣果を伸ばすコツ \u0026nbsp; 「第2釣台」が本命\n沖にある第2釣台は水深があり、潮通しも最高です。大物狙いなら迷わず奥へ進みましょう。 潮の速さに対応する\n須磨は潮の流れが速いです。軽い仕掛けではあっという間に流されます。 オモリを重くするか、潮止まりの前後を集中して釣るのが攻略の鍵です。 アクセス情報 \u0026nbsp; 電車でのアクセス｜おすすめ！ \u0026nbsp; 山陽電鉄：「須磨浦公園駅」から徒歩約5分。 JR神戸線：「須磨駅」から徒歩約20分（またはバス）。 駅を降りて、海沿いの美しい須磨浦公園を散策しながら向かうルートは最高です。 車でのアクセス \u0026nbsp; 阪神高速3号神戸線：「若宮IC」から約10分。 駐車場：須磨浦公園駐車場（有料）を利用します。 実際に利用したユーザーの声 \u0026nbsp; ※実際のレビューを参考に要約しています。\n40代男性（往年のファン）「★★★★★｜5.0」 \u0026nbsp; 「おかえり」 待ちに待った再開！ショップが凄く綺麗になっていて驚きました。昔のような昭和感は薄れたけど、快適さは段違い。さっそく40cmのチヌが釣れて、須磨の海は裏切らないなと感動しました。\n30代女性（ビギナー）「★★★★☆｜4.0」 \u0026nbsp; 「カフェみたい」 カフェみたいな休憩スペースがあって、釣り場じゃないみたい。トイレもピカピカで嬉しい。サビキ釣りでアジがたくさん釣れました。\n60代男性（ベテラン）「★★★★☆｜4.0」 \u0026nbsp; 「朝イチが勝負」 料金体系は以前とほぼ変わらず安心した。ただ、人気すぎて土日はめちゃくちゃ混む。入場制限がかかることもあるので、朝イチで行くのが正解。\nまとめ：須磨海づり公園はどんな人におすすめ？ \u0026nbsp; こんな人に最適 \u0026nbsp; 最新の設備で快適に釣りをしたい人 神戸観光と合わせて釣りを楽しみたい人 復活した名釣り場を体験したい人 6年の沈黙を破り、より美しく、より快適になって帰ってきた須磨海づり公園。 神戸の海と山に囲まれた絶景の中で竿を出す気持ち良さは、他の釣り場では味わえません。 かつての「ベテランの聖地」から「みんなの海釣り公園」へと進化しました。 新しくなった須磨の海で、新しい釣りの思い出を作ってみませんか？"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 92,
        href: "/hyogo/suihou-fishing-pond/",
        title: "【兵庫県】水宝釣り堀｜19種以上の魚種＆白鷺サーモン！姫路港...",
        description: "「釣り堀の常識を超えた、西日本最大級のエンターテインメント」",
        
        
        content: "「釣り堀の常識を超えた、西日本最大級のエンターテインメント」\nそれが、家島諸島・坊勢島（ぼうぜじま）に浮かぶ巨大海上釣り堀、**「水宝（すいほう）」**です。 姫路港から専用クルーザーで向かうその場所は、まさに釣り人の楽園。\n季節によって放流される魚種は19種類以上。マダイやブリ、シマアジだけではありません。クエやイシダイ、そしてオリジナルのブランド魚**「白鷺（しらさぎ）サーモン」、さらにはイベントで「クロマグロ」**まで登場することも！\n**「釣った魚は全て持ち帰りOK」「ボウズでもお土産保証あり」**という太っ腹なルールで、クーラーボックスに入り切らないほどの釣果を約束する、夢のフィールドをご案内します。\n水宝（すいほう）釣り堀の基本情報 \u0026nbsp; 項目 詳細 施設名 釣り堀 水宝（すいほう） 住所 〒672-0103 兵庫県姫路市家島町坊勢832（釣り場） 集合場所 姫路港（飾磨ポートセンター付近）、日生港など（要確認） 集合時間 6:30〜7:00頃（季節・港により変動） 定休日 無休（※荒天時中止、元旦は休みなど要確認） 料金 大人 14,000円 / 女性・子供 10,000円（※渡船代込み） 釣れる魚 マダイ、ブリ、カンパチ、シマアジ、白鷺サーモン、クエ、マハタ、イシガキダイ、クロマグロ等 公式サイト 水宝釣り堀公式サイト 料金に含まれるもの \u0026nbsp; 料金表だけ見ると「少し高い？」と感じるかもしれませんが、内容は超豪華。 **「往復の渡船代」**込みの価格であり、下記の特典がつきます。\n全持ち帰りOK：釣れば釣るほどお得！ お土産保証：もし釣れなくてもマダイなどが貰える安心設定。 高級魚放流：市場価格数千円〜数万円の魚がターゲットです。 施設の特徴と魅力 \u0026nbsp; ブランド魚「白鷺（しらさぎ）サーモン」\n水宝が商標登録した、播磨灘育ちのご当地サーモン。身が引き締まり、脂乗りも抜群。これを釣るために遠方から通うファンも多い絶品魚です。 スタッフの「釣らせる気」が凄い\n「釣果ゼロで帰してなるものか」という気概を感じます。釣れていない人にはタナを教えたり、活性を上げるためにエサを撒いたり、初心者には手取り足取り教えてくれます。 充実の設備\n海上の釣り場とは思えないほど設備が整っています。水洗トイレ、休憩所、電子レンジやお湯のポットも完備。カップラーメンの販売もあり、快適に一日を過ごせます。 水宝の攻略法 \u0026nbsp; おすすめの仕掛けとターゲット \u0026nbsp; マダイ・シマアジ（基本）\n竿：3m〜3.5mの海上釣堀竿（オモリ3〜4号） エサ：ダンゴ（黄色系が強い）、エビ、ササミ。複数用意してローテーションするのが吉。 青物（ブリ・カンパチ）\n竿：強烈な引きに耐える青物対応ロッド。 エサ：活きアジ（現地購入可）、カツオの切り身、イカ。 サーモン（冬季〜春季）\nオキアミやブドウ虫への反応が良いです。 タナが浅いことが多いので、ウキ下2m〜3m付近を探ります。 釣果を伸ばす3つのコツ \u0026nbsp; 「モーニング」を制する\n開始直後の「モーニング（入れ食いタイム）」でどれだけ手返し良く数を稼げるかが勝負です。 「青物です！」の声掛け\n誰かが青物を掛けたら「青物です！」と叫ぶのがルール。周りの人はすぐに仕掛けを上げてオマツリ（糸絡み）を防ぎます。協力プレーで青物祭りを楽しみましょう。 四隅（コーナー）を攻める\n魚はイケスのカドに溜まりやすいです。特にネット際ギリギリを攻めると釣果が伸びます。 アクセス情報 \u0026nbsp; 集合場所：姫路港（飾磨） \u0026nbsp; アクセス：姫路バイパス「中地ランプ」から南へ約10分。 駐車場：近隣に有料駐車場あり（1日500円〜）。 受付：出船時間の30分前には集合しましょう。 その他：日生（ひなせ）便 \u0026nbsp; 岡山県の日生港からも送迎船が出ています（要予約）。中国・四国地方からのアクセスも便利です。 実際に利用したユーザーの声 \u0026nbsp; ※実際のレビューを参考に要約しています。\n40代男性（リピーター）「★★★★★｜5.0」 \u0026nbsp; 「ここに来たら他へ行けない」 魚の引きが違うし、何よりスタッフが元気で楽しい。前回はマグロイベントに当たり、隣の人が釣っているのを見て大興奮でした。自分はブリ3本で満足！\n20代カップル「★★★★☆｜4.0」 \u0026nbsp; 「彼女が大活躍」 初めての釣り堀デート。彼氏より私のほうが大きなタイを釣ってしまいました（笑）。トイレが綺麗なのが女子には嬉しいポイント。白鷺サーモンはトロトロで最高でした。\n60代男性（グループ）「★★★★☆｜4.0」 \u0026nbsp; 「平日がおすすめ」 設備、魚種、サービス全てが一級品。ただ、人気すぎて土日は人が多い。平日に行けるなら平日がおすすめ。広々と釣りができる。\nまとめ：水宝釣り堀はどんな人におすすめ？ \u0026nbsp; こんな人に最適 \u0026nbsp; 絶対に魚を持って帰りたい人（保証あり） 高級魚・ブランド魚を食べてみたい人 初心者だけど、大物の引きを味わいたい人 水宝釣り堀は、単なる釣り場ではなく**「魚を釣るテーマパーク」**です。 クーラーボックスを空っぽにして行くのは勇気がいりますが、帰りは重たくて持てない……そんな嬉しい悲鳴を上げたいなら、水宝一択です！ 夢の大漁を目指して、ぜひチャレンジしてみてください。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 93,
        href: "/hyogo/awaji-janohire-fishing-park/",
        title: "【兵庫県】淡路じゃのひれフィッシングパーク｜キャンプもイルカ...",
        description: "淡路島の南端、福良（ふくら）湾にある「淡路じゃのひれアウトドアリゾート」。 ここはキャンプ場、BBQガーデン、イルカと触れ合えるドルフィンファーム、そして海上釣り堀が一体となった、「淡路島最大級の海洋レジャー複合施設」です。",
        
        
        content: "淡路島の南端、福良（ふくら）湾にある**「淡路じゃのひれアウトドアリゾート」。 ここはキャンプ場、BBQガーデン、イルカと触れ合えるドルフィンファーム、そして海上釣り堀が一体となった、「淡路島最大級の海洋レジャー複合施設」**です。\nその中核をなす「じゃのひれフィッシングパーク」は、広大な敷地と波の穏やかな湾内、そして豊富な魚種で、関西の釣り堀ファンから絶大な支持を集めています。\nガチの釣り師はもちろん、「釣りは初めて」という子供連れファミリーでも安心して楽しめる、至れり尽くせりのリゾート釣り堀を紹介します。\n淡路じゃのひれフィッシングパークの基本情報 \u0026nbsp; 項目 詳細 施設名 淡路じゃのひれフィッシングパーク 住所 〒656-0543 兵庫県南あわじ市阿万塩屋町2660 営業時間 7:00〜16:00（コースにより終了時間が異なる） 定休日 元日のみ（※悪天候時除く） 料金 ・一般コース：男性12,000円 / 女性・子供8,000円\n・ファミリーコース：8,800円〜（貸切）\n（※詳細は公式サイト確認） 釣れる魚 マダイ、ブリ、カンパチ、シマアジ、イサキ、トラフグ、マハタ、イシダイ 公式サイト 淡路じゃのひれフィッシングパーク 施設の特徴と魅力 \u0026nbsp; 初心者に優しい「コース分け」\nいきなり上級者と同じイケスは不安…という方のために、ニーズに合わせたコースが用意されています。 マダイコース：マダイ放流のみ。短時間で手軽に楽しみたい人に。 ファミリーコース：貸切で家族だけで楽しめる（要予約）。 一般コース：青物（ブリ等）も入った本格コース。 釣った魚でBBQ！\n施設内のBBQガーデン（要予約）を利用すれば、釣ったばかりの新鮮な魚をその場で焼いて食べることができます。これはリゾート施設ならではの贅沢です。 イルカに癒やされる\n釣りの合間や終わった後に、隣接する**「ドルフィンファーム」**でイルカを見学したり、一緒に泳いだり（有料プログラム）できます。釣りに関心がない家族がいても、ここなら全員が楽しめます。 じゃのひれの攻略法 \u0026nbsp; おすすめの仕掛けとタックル \u0026nbsp; 一般コース（青物狙い）\n竿：3.5m〜4mの海上釣堀竿（M〜Hパワー）。 リール：スピニング3500番〜4000番（PE3号以上）。 エサ：活きアジ、カツオの切り身、ダンゴ。 注意：青物の引きは強烈です。ハリス切れを防ぐために**「クッションゴム」は必須**です。 マダイコース・ファミリーコース\n竿：3m前後のライトな竿。 エサ：オキアミ、ダンゴ、ササミ。 ウキ釣りで、ウキが「スポッ」と沈む瞬間を楽しみましょう。 釣果を伸ばす3つのコツ \u0026nbsp; 脈釣り（ミャクズリ）に挑戦\nウキを使わず、竿先でダイレクトにアタリを取る「脈釣り」は、魚が食い渋っている時に効果絶大です。イケスの網際（キワ）やコーナーを探ってみましょう。 エサのバリエーション\nじゃのひれの魚は多くの釣り人に狙われてスレている（賢くなっている）こともあります。人とは違うエサ（トマト、チーズ、マシュマロなど！？）が爆釣の鍵になることも。 タナ合わせ\nマダイも青物も、泳いでいる深さ（タナ）が違います。スタッフにこまめに「今のタナはどれくらいですか？」と聞くのが一番の近道です。 アクセス情報 \u0026nbsp; 車でのアクセス｜おすすめ！ \u0026nbsp; 神戸淡路鳴門自動車道：「西淡三原IC」より約15分。 「淡路島南IC」からも約15分。 駐車場：広大な無料駐車場完備。 公共交通機関 \u0026nbsp; アクセスは車が圧倒的に便利です。公共交通機関の場合、高速バス「福良バスターミナル」からタクシーで約10分ですが、便数は多くありません。レンタカーの利用をおすすめします。 実際に利用したユーザーの声 \u0026nbsp; ※実際のレビューを参考に要約しています。\n30代女性（ファミリー）「★★★★★｜5.0」 \u0026nbsp; 「最高の休日」 キャンプとセットで利用しました。子供が初めてマダイを釣って大喜び！スタッフの方が写真を撮ってくれたり、針を外してくれたりと親切でした。夜はキャンプ場で鯛めしと塩焼き。最高のアウトドア体験でした。\n50代男性（一般コース）「★★★★☆｜4.0」 \u0026nbsp; 「魚が良い」 魚のコンディションが良い。丸々と太っていて脂が乗っている。シマアジ狙いで行ったが、思わぬクエが掛かって切られた。悔しいのでまたリベンジに行く。\n20代男性（グループ）「★★★★☆｜4.0」 \u0026nbsp; 「BBQが楽」 釣りの後にBBQエリアを利用しました。手ぶらで食材も頼めるので楽チン。釣った魚を持ち込む場合は、捌く場所と包丁も貸してもらえる（有料だったかも？）ので便利です。\nまとめ：淡路じゃのひれフィッシングパークはどんな人におすすめ？ \u0026nbsp; こんな人に最適 \u0026nbsp; 家族全員で思い出を作りたいファミリー 釣りだけでなくキャンプやBBQも楽しみたい人 綺麗な施設で快適に釣りをしたい人 じゃのひれフィッシングパークは、単なる釣り場ではなく**「極上の休日を過ごせるエンターテインメント施設」**です。 お父さんは大物釣り、お母さんと子供はイルカ体験、夜はみんなでBBQ…そんな理想の休日がここで叶います。 淡路島旅行のメインイベントとして、ぜひ訪れてみてください。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 94,
        href: "/hyogo/amagasaki-city-sea-fishing-park/",
        title: "【兵庫県】尼崎市立魚つり公園｜アクセス抜群！大阪湾奥のメッカ...",
        description: "大阪市街から目と鼻の先。工場の煙突が並ぶ阪神工業地帯の一角に、関西屈指の「チヌ・ハネ（スズキ）の聖地」があります。",
        
        
        content: "大阪市街から目と鼻の先。工場の煙突が並ぶ阪神工業地帯の一角に、関西屈指の**「チヌ・ハネ（スズキ）の聖地」**があります。\n**「尼崎市立魚つり公園」**は、武庫川の河口部に位置する桟橋型の釣り公園です。汽水域を好む大型魚の格好の棲家となっており、特に伝統の「エビ撒き釣り」で狙うハネ（スズキ）の魚影の濃さは関西随一。\nもちろん、休日はサビキ釣りを楽しむファミリーで大賑わい。「都会の海なんて…」という先入観を吹き飛ばす、驚くべきポテンシャルを秘めた都市型釣り場をご紹介します。\n尼崎市立魚つり公園の基本情報 \u0026nbsp; 項目 詳細 施設名 尼崎市立魚つり公園 住所 〒660-0087 兵庫県尼崎市平左衛門町66 営業時間 季節により変動\n・5-6月/11月：6:00～19:00\n・7-10月：5:00～20:00\n・12-4月：7:00～17:00 定休日 火曜日（祝日の場合は直後の平日）、年末年始 料金 大人 830円 / 子供（6-15歳） 410円 / 見学 200円 釣れる魚 チヌ、キビレ、スズキ（ハネ）、アジ、サバ、イワシ、サヨリ、タチウオ 駐車場 あり（有料・最大800円） 公式サイト 尼崎市立魚つり公園 施設の特徴と魅力 \u0026nbsp; 釣り場は沖に向かって「L字型」に張り出した桟橋です。全体的に足場が良く、フェンスも設置されているため、小さなお子様連れでも安心して楽しめます。\n特筆すべきは、**「指導員が常駐」**していること。 釣り方が分からない初心者には、ベテランの指導員が親切に教えてくれます。売店ではエサや仕掛けの販売はもちろん、**レンタル竿（要確認）**もあるため、手ぶらでの釣行も可能です。\n※重要：投げ釣り禁止 安全のため、本格的な投げ釣りやルアー釣りは制限される場合があります（時期や場所による）。基本的には「足元の釣り」「ウキ釣り」がメインとなります。\n尼崎市立魚つり公園の攻略法 \u0026nbsp; おすすめの仕掛けとターゲット \u0026nbsp; エビ撒き釣り（チヌ・ハネ狙い）\n関西最強の釣法。生きたシラサエビを撒いて魚を寄せ、同じエサで食わせます。 棒ウキを使った繊細なアタリを取るスタイルが主流。ハネ（40-60cmのスズキ）の数釣りが楽しめます。 ズボ釣り（際釣り）\n短い竿で、桟橋の支柱際（キワ）ギリギリを狙います。 シンプルながら大物が掛かる確率が高く、スリル満点です。 サビキ釣り（ファミリー向け）\n夏～秋はアジ、サバ、イワシが回遊します。 桟橋の内向き（陸側）は流れが穏やかで子供でも釣りやすいです。 釣果を伸ばすコツ \u0026nbsp; 場所選び： 外向き（沖側）：潮通しが良く、回遊魚や大型魚狙いに最適。 内向き（陸側）：波が穏やかで、ファミリーのサビキ釣りに向いています。 支柱周りは宝の山：チヌやハネは障害物に身を寄せています。桟橋の脚周りをタイトに攻めるのが釣果への近道です。 タナ取り（深さ）：水深があるため、ウキ釣りなら「底スレスレ」を狙うのが基本です。 季節別のターゲット \u0026nbsp; 季節 ターゲット 特徴 春（3-5月） ハネ（スズキ） エビ撒き釣りの最盛期。良型が連発することも。 夏（6-8月） アジ、イワシ、タコ サビキ釣りがピーク。壁際のタコ狙いも面白いです。 秋（9-11月） サヨリ、タチウオ サヨリの大群や、夕マズメのタチウオ・青物が熱い。 冬（12-2月） チヌ（クロダイ） 数は減りますが、一発大物の「寒チヌ」シーズン。 アクセス情報 \u0026nbsp; 車でのアクセス（推奨） \u0026nbsp; 阪神高速5号湾岸線：「尼崎末広出入口」から約5分。 大阪市内・神戸市内どちらからもアクセス抜群です。 駐車場：有料駐車場完備（最大800円）。 公共交通機関 \u0026nbsp; 阪神電車：「武庫川女子大お出迎え駅（旧：武庫川駅）」からタクシーで約10分。 バス：「阪神尼崎駅」から尼崎市バス「尼崎スポーツの森」行きに乗車→「武庫川団地南」下車徒歩約10分。 駅からタクシーを使っても低料金で済む距離感です。 近隣の釣具店 \u0026nbsp; フィッシングマックス武庫川店：近くにある大型釣具店。エサの解凍予約や最新情報の収集に便利です。釣り公園に行く前に立ち寄るのが定番ルートです。 実際に利用したユーザーの声 \u0026nbsp; ※実際のレビューを参考に要約しています。\n40代男性（会社員）「★★★★★｜5.0」 \u0026nbsp; 「仕事帰りの癒やし」 オフィスからふらっと寄れる距離感が最高。夕方の短時間勝負でハネ（スズキ）を狙います。レンタルタックルもあるので、スーツのまま来ている人もたまに見かけますよ（笑）。\n30代女性（ママ）「★★★★☆｜4.0」 \u0026nbsp; 「スタッフさんが神対応」 夏休みに子供と行きました。係のおじさんがすごく親切で、子供のサビキ仕掛けが絡まったのを解いてくれました。トイレも釣り場にあるので安心です。ただ、日陰が少ないので夏は帽子必須です！\nまとめ：尼崎市立魚つり公園はどんな人におすすめ？ \u0026nbsp; こんな人に最適 \u0026nbsp; 大阪・神戸から近場で釣りをしたい人 エビ撒き釣りでハネ・チヌを攻略したい人 ファミリーで安全に海釣りを楽しみたい人 「尼崎市立魚つり公園」は、都会の真ん中にありながら、驚くべき生命感に溢れた**「最強の都市型釣り公園」**です。 高度経済成長期のような工場風景をバックに、銀鱗輝くチヌやハネを釣り上げる快感はここだけのもの。アクセスの良さを活かして、ぜひ気軽にチャレンジしてみてください。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 95,
        href: "/hyogo/himeji-city-fishing-center/",
        title: "【兵庫県】姫路市立遊漁センター｜格安830円！温排水で冬でも...",
        description: "「真冬の海は寒くて魚も釣れない…」そんな常識を覆す釣り場が、兵庫県姫路市にあります。",
        
        
        content: "「真冬の海は寒くて魚も釣れない…」そんな常識を覆す釣り場が、兵庫県姫路市にあります。\n「姫路市立遊漁センター」の最大の武器は、隣接する関西電力姫路第二発電所から流れ込む「温排水」。この恩恵により、厳寒期でも海水温が高く保たれ、他の釣り場が沈黙する中でもメバルやチヌ（クロダイ）が元気にエサを追う「冬の聖地」となっています。\nしかも料金は大人830円という公営ならではの安心価格。お財布にも優しく、寒さ知らずの熱い釣りが楽しめる、姫路の隠れた名スポットを深掘りします。\n姫路市立遊漁センターの基本情報 \u0026nbsp; 項目 詳細 施設名 姫路市立遊漁センター 住所 〒671-0112 兵庫県姫路市的形町福泊地先 営業時間 通年営業（季節により変動あり ※要確認）\n・4月～10月：6:00～21:00（ナイターあり）\n・11月～3月：7:00～16:00 定休日 火曜日（祝日の場合は翌日）、年末年始 料金 大人 830円 / 子供 520円 釣れる魚 クロダイ（チヌ）、メバル、ガシラ、アジ、イワシ、サヨリ、キス 駐車場 あり（無料・約200台） 公式サイト 姫路市立遊漁センター 施設の特徴と魅力 \u0026nbsp; この施設の心臓部は、なんといっても温排水です。 冬場でも平均水温が周囲より高く、魚が居着きやすい環境が整っています。特に「チヌ（クロダイ）」の魚影の濃さは播磨灘随一とも言われ、50cmオーバーの「年無し」と呼ばれる大型が頻繁に上がります。\n釣り場は全長約200mの桟橋で、足元は金網状（グレーチング）になっています。潮通しが良く、足元でも十分な水深があるため、初心者でも大物が狙えるチャンスがあります。\n姫路市立遊漁センターの攻略法 \u0026nbsp; おすすめの仕掛けとターゲット \u0026nbsp; チヌ（クロダイ）\nフカセ釣り：温排水の流れに乗せてエサを流す王道スタイル。 ダゴチン（紀州釣り）：団子でエサを海底まで届ける、ここの名物釣法。エサ取りが多い時に有効です。 サビキ釣り（ファミリー向け）\n夏～秋にかけてはアジ、イワシ、サヨリが回遊します。 注意：足元が金網なので、アミエビ（コマセ）が海に落ちやすいです。「吸い込みバケツ」などを使うと手返し良く釣れます。 メバル・ガシラ（根魚）\n桟橋の支柱周りやケーソン（コンクリートの基礎）周りが一級ポイント。 胴付き仕掛けや、電気ウキを使った夜釣りが効果的です。 釣果を伸ばすコツ \u0026nbsp; 流れを読む：温排水の吹き出し口からの流れがキーポイント。流れが速すぎる場合は、少し離れた「ヨレ（流れが緩む場所）」を狙いましょう。 落下防止対策：足元のグレーチング（金網）の隙間から、スマホや車の鍵、重りなどを落とす事故が多発しています。レジャーシートを敷くのは必須マナーです。 椅子の持参：ベンチは少ないため、折りたたみ椅子があると快適です。 季節別のターゲット \u0026nbsp; 季節 ターゲット 特徴 春（3-5月） チヌ、メバル 乗っ込みチヌのシーズン。大型が狙えます。 夏（6-8月） アジ、イワシ、タコ サビキ釣りが盛況。夜釣りでアナゴやシーバスも。 秋（9-11月） サヨリ、アジ、チヌ サヨリの大群が入ることがあります。数釣りシーズン。 冬（12-2月） メバル、ガシラ、寒チヌ 温排水の本領発揮。冬でも魚信が途絶えません。 アクセス情報 \u0026nbsp; 車でのアクセス（推奨） \u0026nbsp; 加古川バイパス：「高砂北ランプ」または「高砂西ランプ」から約20分。 山陽自動車道：「山陽姫路東IC」から約25分。 駐車場：約200台収容の無料駐車場完備。 公共交通機関 \u0026nbsp; 山陽電鉄「的形（まとがた）駅」から徒歩約25分～30分。 距離があるため、駅からはタクシーの利用が現実的です。 実際に利用したユーザーの声 \u0026nbsp; ※実際のレビューを参考に要約しています。\n50代男性（常連）「★★★★☆｜4.0」 \u0026nbsp; 「冬のホームグラウンド」 もう20年通っています。ここは冬でも生命感があるのがいい。温排水のおかげで、真冬にエサ取りが出てくることもあるくらい（笑）。チヌ師にとっては道場のような場所です。\n30代女性（ファミリー）「★★★☆☆｜3.0」 \u0026nbsp; 「子供連れは注意！」 網の隙間から子供がオモチャを落としてしまい大泣きしました（涙）。絶対にシートが必要です！トイレは少し古いですが掃除はされています。売店のおばちゃんが親切で、釣れている場所を教えてくれました。\n40代男性（夜釣り）「★★★★★｜5.0」 \u0026nbsp; 「夏の夜釣りが最高」 昼間は暑すぎて無理だけど、4月〜10月のナイター営業で夕涼みがてら行くとアナゴやメバルが遊んでくれます。830円で夜21時まで遊べるのはコスパ良すぎです。\nまとめ：姫路市立遊漁センターはどんな人におすすめ？ \u0026nbsp; こんな人に最適 \u0026nbsp; 真冬でも釣果を出したい釣り人 チヌ（クロダイ）釣りを極めたい人 安く、長く遊びたい人（無料駐車場＆830円） 姫路市立遊漁センターは、レジャー施設のような派手さはありませんが、**「魚を釣らせる環境」**としては一級品です。特に冬場の強さは他の追随を許しません。 防寒対策をしっかりして、温排水の恩恵を受けに行ってみてください。きっとボウズ（0匹）の寒さとは無縁の釣りが待っています。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 96,
        href: "/hokkaido/tomakomai-port-sea-fishing-facility/",
        title: "【北海道】苫小牧港海釣り施設（一本防波堤）｜サクラマスも狙え...",
        description: "※2025年の営業情報については、必ず春先に公式サイトを確認してください。例年3月〜4月頃にオープンします。",
        
        
        content: "※2025年の営業情報については、必ず春先に公式サイトを確認してください。例年3月〜4月頃にオープンします。\n北海道の海の玄関口、苫小牧。その港に突き出た長大な防波堤の一部を釣り人に開放しているのが「苫小牧港海釣り施設」、通称**「一本防波堤」**です。\nここは単なるファミリー向けの釣り公園ではありません。潮通しの良さと水深の深さから、時には船でしか釣れないような大物や回遊魚が接岸する、一級のフィッシングポイントです。特に春のサクラマスシーズンは、道内各地から太公望が集結するほどの熱気に包まれます。\n苫小牧港海釣り施設の基本情報 \u0026nbsp; 場所：〒059-1371 北海道苫小牧市弁天 営業期間：例年4月頃～10月頃の土日祝のみ（※年度により変更あり） 営業時間：6:00～18:00（季節により変動あり） 定員：先着100名 料金：大人1,500円（高校生以上）、中学生1,000円、小学生500円 駐車料金：800円 釣れる魚：サクラマス、カレイ（マコガレイ、クロガシラ）、アメマス、フクラギ（ブリの幼魚）、カンパチ、サバ、ソイ、アブラコ（アイナメ） 注意事項：ライフジャケット着用必須（レンタル有）、竿は1人2本まで ウェブサイト： 苫小牧港海釣り施設 入場システム「先着100名の壁」 \u0026nbsp; この施設の最大の特徴であり注意点は、1日100名限定という入場制限です。\n整理券配布：早朝（5:00頃～）に管理棟で配布されます。 入場順：開門と同時に整理券番号順に入場します。 入れ替え：定員に達した後は、帰る人が出るまで待機（入れ替え制）となります。 特にサクラマスや青物のハイシーズンは、朝4時の時点ですでに行列ができていることも珍しくありません。「絶対に入りたい」という場合は、夜明け前からの現地待機が必要です。\n苫小牧港海釣り施設のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 釣り場環境と特徴 \u0026nbsp; 防波堤は海面からの高さが約5mあります。転落防止柵がない箇所もあるため（※年度により設置状況が変わる可能性あり）、ライフジャケットは命綱です（着用していないと退場）。足場はコンクリートで良好です。\nおすすめの仕掛けとタックル \u0026nbsp; 春の主役「サクラマス」\nロッド：10ft前後の海サクラ用ルアーロッドまたはライトショアジギングロッド リール：3000番～4000番（ハイギア推奨） ライン：PE1号～1.2号 ルアー：30g～40gのメタルジグ、ジグミノー タモ：柄の長さが6m以上あるもの必須（5mだと干潮時に届かない恐れあり） 万能「投げ釣り」（カレイ・根魚）\nロッド：3.6m～4.2mの投げ竿 オモリ：25号～30号（潮が速い場合があるため） 仕掛け：カレイ用遊動仕掛け エサ：生イソメ、塩イソメ 夏の「青物」（フクラギ・サバ）\n40g前後のメタルジグや、カゴ付きサビキ仕掛けが有効です。 釣果を伸ばすコツ \u0026nbsp; タモアミは長めのものを：足場が高いので、魚を掛けてもタモが届かずにバラす悲劇が起きます。6mクラスのタモを持参しましょう。 潮目を見る：先端付近や、潮がぶつかってヨレができる場所が一級ポイントです。 情報戦を制する：公式サイトやSNSで直近の釣果情報をチェックし、「今何が釣れているか」に合わせて仕掛けを選びましょう。 季節別の釣果情報 \u0026nbsp; 4月～5月：サクラマス、アメマス、大型クロガシラガレイ。最も熱いシーズン。 6月～8月：フクラギ、サバ、イワシ。数釣りが楽しめます。 9月～10月：アブラコ、ソイ、秋カレイ。通好みのターゲットが揃います。 苫小牧港海釣り施設へのアクセス情報 \u0026nbsp; 車でのアクセス｜おすすめ！ \u0026nbsp; 道央自動車道「苫小牧東IC」より約15分 国道36号線からは、苫小牧港フェリーターミナル方面へ向かわず、さらに東（勇払方面）へ進みます。 駐車場：施設入り口手前に有料駐車場あり 公共交通機関 \u0026nbsp; アクセスは非常に困難です。JR苫小牧駅からタクシーで約20分かかりますが、早朝の到着や帰りの手配を考えると、レンタカーまたは自家用車が必須です。 実際に利用したユーザーの声を抜粋 \u0026nbsp; 40代男性（ルアーマン）「★★★★★｜5.0」 \u0026nbsp; 念願のサクラマスをここで釣りました！船に乗らなくても岸からサクラが狙える貴重な場所です。ただ、タモ入れは隣の人と協力しないとキツイですね。釣り人同士の距離感が近くて、ヒットした時はみんなで喜んでくれる雰囲気が好きです。\n30代女性（ファミリー）「★★★☆☆｜3.0」 \u0026nbsp; 有料だけあってトイレや自販機があるのが助かります。ただ、柵がない場所は子供には危ないので目が離せません。サビキでチカやサバがたくさん釣れて子供は楽しそうでした。\n50代男性（ベテラン）「★★★★☆｜4.0」 \u0026nbsp; 100人の壁が高い（笑）。シーズン中は深夜から並ばないと入れないことも。でもその分、場所取りなどのトラブルは管理されているので安心。カレイの型が良いので毎年通っています。\n【まとめ】苫小牧港海釣り施設をおすすめしたい度 ★★★★★ \u0026nbsp; 苫小牧港海釣り施設は、北海道で陸っぱり（岸釣り）の限界に挑める場所です。\n防波堤という人工物の上でありながら、狙える魚は沖釣りに匹敵する豪華さ。特にサクラマスの回遊に当たれば、一生の思い出に残る一尾に出会えるかもしれません。\n「早起き」と「長いタモ」の準備をして、北の大地の豊穣なる海へキャストしてみてください。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 97,
        href: "/wakayama/kakata-fishing-pond/",
        title: "【和歌山県】カカタの釣堀｜白浜温泉で楽しむ2コース制海上釣り...",
        description: "「温泉旅行のついでに、本格的な海釣りも楽しみたい」",
        
        
        content: "「温泉旅行のついでに、本格的な海釣りも楽しみたい」\nそんな贅沢な願いを叶えてくれるのが、南紀白浜エリアにある「カカタの釣堀」です。\nここは単なる釣り堀ではありません。西日本最大級の海鮮マーケット「とれとれ市場」に隣接し、白浜温泉の宿泊施設からもアクセス抜群という、まさに観光と釣りをセットで楽しむための理想的なロケーション。さらに「手ぶらで2時間の小物コース」と「ガッツリ狙う大物コース」の2コース制により、初心者からベテランまで誰もが満足できる点が最大の魅力です。\n白浜の海で釣り糸を垂らし、夜は温泉と海鮮に舌鼓を打つ。そんな最高の休日プランを提案します。\nカカタの釣堀の基本情報 \u0026nbsp; 項目 詳細 施設名 カカタの釣堀 住所 〒649-2201 和歌山県西牟婁郡白浜町堅田藤島2217-2 営業時間 7:00～14:00（受付6:30まで）\n※12～2月は7:30～14:00 定休日 年中無休（悪天候時は休業の可能性あり） 料金 大物釣り 12,400円 / 小物釣り 3,680円（2時間） 釣れる魚 マダイ・ブリ・カンパチ・ヒラマサ・シマアジ・イシダイ・イシガキダイ 予約 完全予約制（電話予約必須） 公式サイト カカタの釣堀｜南紀白浜 2つのコースと料金体系 \u0026nbsp; カカタの釣堀の最大の特徴は、目的に応じて選べる柔軟な2コース制です。\n1. 小物釣りコース（お手軽・初心者向け） \u0026nbsp; **「観光の合間に少しだけ」「子供に釣らせてあげたい」**という方に最適。\n料金：3,680円 / 1名 時間：2時間釣り放題 内容：竿・エサ代込み（手ぶらでOK） 延長：1時間 1,700円 2. 大物釣りコース（本格派・経験者向け） \u0026nbsp; **「マダイや青物を狙いたい」「1日じっくり釣りたい」**という方向け。\n大人：12,400円 女性：9,200円 子供（小人）：7,100円 年末特別（12/29-30）：一律 12,400円 特徴：釣り放題。釣った魚は全持ち帰りOK。 独自のルールと注意事項 \u0026nbsp; 完全予約制：必ず事前に電話予約が必要です。 キャンセル料：前日午後以降は100%発生します（要注意）。 禁止事項：集魚剤（撒き餌）、ルアー、ジグのオモリ使用は厳禁。 貸切利用：5名以上から可能。 カカタの釣堀の攻略法と釣果のコツ \u0026nbsp; 円形のイケスで、大物コースでは水深10m程度の本格的なタナ（深さ）攻略が釣果の鍵を握ります。\n小物釣りコースの攻略 \u0026nbsp; 2時間という短時間を制するには「手返し」が重要です。\nタックル：レンタル竿（料金込み）を使用。スタッフがセットしてくれるので安心です。 コツ：エサ（オキアミ等）をこまめに付け替え、魚の群れを足止めしましょう。 大物釣りコースの攻略 \u0026nbsp; 季節や放流魚種に合わせたタックル準備が必要です。\nマダイ狙い（基本） \u0026nbsp; ロッド：3.5m前後の海上釣り堀竿（オモリ負荷0.5〜3号） リール：2500〜3000番（ナイロン3〜4号） 仕掛け：ウキ釣り、ハリス2.5〜3号 エサ：オキアミ、ダンゴ餌（マダイイエロー等）、ササミ 青物狙い（一発大物） \u0026nbsp; ロッド：青物対応の強めの竿（4m前後） リール：4000番以上（ナイロン5号以上推奨） 仕掛け：ハリス4〜6号以上、大きめのウキ エサ：活きアジ（現地販売あり）、カツオの切り身 季節別のターゲット \u0026nbsp; 季節 特徴とターゲット 春（3-5月） 水温上昇と共にマダイの活性アップ。シマアジも狙い目。 夏（6-8月） 青物（カンパチ・ブリ）の最盛期。早朝の涼しい時間が勝負。 秋（9-11月） 最も魚種が豊富なベストシーズン。イシダイ等の底物も期待大。 冬（12-2月） 水温安定する深場狙い。脂の乗った寒ブリ・寒ダイ狙い。 白浜温泉へのアクセスと宿泊プラン \u0026nbsp; 車でのアクセス（推奨） \u0026nbsp; 大阪・和歌山方面からのアクセスが整備されており、荷物の多い釣り旅行には車が便利です。\n大阪市内から：約2時間30分（阪和道→田辺IC→R42） 和歌山市から：約1時間30分 駐車場：完備 ※朝（大物コース）は6:30受付終了のため、大阪市内発でも早朝4時台の出発が必要です。ゆとりを持つなら前日入り宿泊が鉄則です。\n電車でのアクセス \u0026nbsp; JR白浜駅からタクシーで約15分。 ※電車始発では朝イチの受付に間に合いません。駅周辺または温泉街への宿泊が必要です。 おすすめの宿泊エリア \u0026nbsp; 白浜は屈指の温泉地。予算に合わせて多様な宿が選べます。\n【大物狙い・前泊用】\nビジネスホテル：白浜駅周辺や田辺市内に点在（5,000円〜）。寝るだけならコスパ良し。 【家族旅行・リゾート満喫】\n白浜温泉の旅館・ホテル：1泊1.5万円〜。 「ホテル川久」「白浜マリオット」などの高級リゾートで優雅に過ごすプランが大人気。 【レンタカー情報】\nJR白浜駅周辺に「トヨタレンタカー」「ニッポンレンタカー」あり。 釣具持参ならコンパクトカー以上推奨。 実際に利用したユーザーの声 \u0026nbsp; ※実際のレビューを参考に要約しています。\n40代男性「★★★★★｜5.0」 \u0026nbsp; 「2コース制がありがたい！」 家族旅行で利用。自分は大物コースでブリとマダイをゲット、妻と子供は小物コースで手軽に楽しみました。全員が満足できる釣り場は貴重です。帰りはとれとれ市場で海鮮丼を食べて最高でした。\n30代女性「★★★★☆｜4.0」 \u0026nbsp; 「手ぶらで本当に釣れた」 観光の合間に小物コースへ。服も汚れず手ぶらでOKなのが嬉しい。2時間で小鯛やアジが釣れて子供も大興奮でした。\n60代男性「★★★☆☆｜3.0」 \u0026nbsp; 「キャンセル料には注意」 釣果は文句なし。ただ、前日午後からのキャンセル料100%は少し厳しい。天候が怪しい時は予約をためらってしまう。確実に行ける時の予約をおすすめします。\nまとめ：カカタの釣堀はどんな人におすすめ？ \u0026nbsp; カカタの釣堀の魅力 \u0026nbsp; 「とれとれ市場」隣接：釣りの後にお土産購入や食事処への移動がスムーズ。 2コース制：ガチ勢もファミリーも共存できる懐の深さ。 白浜温泉：釣りの疲れを名湯で癒やす極上の流れ。 こんな人に特におすすめ \u0026nbsp; 家族旅行の一部として釣りを組み込みたいパパ・ママ 温泉旅行のついでに、手ぶらで少し竿を出したいカップル 大阪から日帰り、または1泊2日で大物を狙いたい釣りファン 南紀白浜という最高のロケーションで、釣りと温泉とグルメを一度に味わう。そんな欲張りな休日を「カカタの釣堀」で実現してみてはいかがでしょうか。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 98,
        href: "/wakayama/kaijo-tsuribori-yuasa/",
        title: "【和歌山県】海上釣堀 湯浅｜駅近アクセス良好・1日3回放流で...",
        description: "JR湯浅駅からほど近い好立地にある「海上釣堀 湯浅」は、1日3回の放流システムと手頃な料金設定で人気の海上釣り堀です。",
        
        
        content: "JR湯浅駅からほど近い好立地にある「海上釣堀 湯浅」は、1日3回の放流システムと手頃な料金設定で人気の海上釣り堀です。\n大阪市内からもアクセスしやすく、10魚種の豊富なターゲットで初心者から上級者まで満足できる本格的な海上釣り堀体験を提供しています。\n海上釣堀 湯浅の基本情報 \u0026nbsp; 場所：〒643-0004 和歌山県有田郡湯浅町湯浅2982 営業時間：7:00～13:00（受付6:00～）※日の出時間により変動 定休日：元旦のみ（悪天候時は臨時休業） 平均予算：男性11,000円、女性7,500円、子供5,500円 レンタル：竿1,000円、タモ・スカリ・ライフジャケット無料 釣具の持ち込み：可能（竿は3.5m以内） 釣れる魚：マダイ・シマアジ・カンパチ・ヒラマサ・イサキ・マハタ・ヒラメ・クエ・シーバス・イシガキダイ 注意事項：電話予約制（月～金9:30～16:30）、7日前からキャンセル料発生 ウェブサイト： 海上釣堀 湯浅 料金体系について \u0026nbsp; 海上釣堀 湯浅は釣り放題タイプの海上釣り堀で、釣った魚は全て持ち帰ることができます。料金設定は性別・年齢によって分かれており、特に女性や子供には優しい価格設定となっています。\n＜1日コース基本料金＞\n男性：11,000円 女性：7,500円 子供（小学生以下）：5,500円 ＜貸切プラン＞\n平日：4名以上で8m中筏貸切可能 土日祝日：6名以上で8m中筏貸切可能 8名以上：12m大筏貸切対応 貸切プランは個人料金×人数で計算されるため、大人数での利用がお得になります。料金は関西圏の海上釣り堀としては比較的リーズナブルな設定です。\n注意事項と補足データ \u0026nbsp; 予約は電話のみで、受付時間は月～金の9:30～16:30と限定されています。乗船名簿の記入が必要で、予約人数分全員の記入が必要です。事前にホームページからPDFをダウンロードして記入しておくとスムーズです。\nキャンセル料は7日前から発生するため、計画的な予約が重要です。1日3回の放流システムにより、時間帯によって釣果に差が出る可能性があります。\n竿は1人1本までの制限があり、撒き餌やルアーの使用は禁止されています。レンタル竿の破損時は3,000円の弁償が必要なため、取り扱いには注意が必要です。\n海上釣堀 湯浅のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 釣り場環境と特徴 \u0026nbsp; 海上釣堀 湯浅は湯浅湾内に設置された本格的な海上釣り堀で、渡船で沖合のイケスへ向かいます。イケス内の水深は10～15m程度で、ウキ釣り仕掛けが基本となります。1日3回の放流により、魚の活性が高い時間帯を狙うことができます。\n主要ターゲット別攻略法 \u0026nbsp; マダイ向けタックル\nロッド：3～3.5m程度の海上釣り堀専用竿 リール：2500～3000番のスピニングリール ライン：ナイロン3～4号 仕掛け：ウキ釣り仕掛け（ハリス2～3号、マダイ針8～10号） エサ：オキアミ、アミエビ、イソメ 青物（カンパチ・ヒラマサ）向けタックル\nロッド：3.5m程度の強めの竿 リール：3000～4000番のスピニングリール ライン：ナイロン4～5号 仕掛け：ウキ釣り仕掛け（ハリス4～5号、青物用12～14号針） エサ：生アジ、オキアミ 高級魚（クエ・マハタ）向けタックル\nロッド：3.5m程度の強靭な竿 リール：4000番以上のスピニングリール ライン：ナイロン5～6号 仕掛け：胴付き仕掛けまたはウキ釣り（ハリス5～6号） エサ：生アジ、サンマ切り身 1日3回放流システムの活用法 \u0026nbsp; 第1回放流（開始直後）\n魚の活性が最も高い時間帯 開始と同時に積極的にアプローチ 手返しを重視した釣りを展開 第2回放流（中盤）\nスレていない新鮮な魚が投入 仕掛けやエサを変えてみる タナを調整して活性を探る 第3回放流（終盤）\n最後のチャンス これまでの経験を活かして集中 大物狙いに切り替えるのも有効 季節別の釣果情報 \u0026nbsp; 春（3月～5月）\nマダイとシマアジの活性が高い イサキの数釣りも楽しめる 水温上昇に伴い魚の食いが活発 夏（6月～8月）\n青物（カンパチ・ヒラマサ）の最盛期 クエやマハタなどの高級魚も狙える 早朝の時間帯が特におすすめ 秋（9月～11月）\n全魚種が好調な安定期 イシガキダイも狙い目 1年で最も釣果が期待できる時期 冬（12月～2月）\nマダイとヒラメがメインターゲット 魚の活性はやや下がるが型は良い 防寒対策が重要 海上釣堀 湯浅へのアクセス情報 \u0026nbsp; 電車でのアクセス｜おすすめ！ \u0026nbsp; JR湯浅駅から\n徒歩：約10分 タクシー：約5分（約1,000円） 大阪方面から\nJR大阪駅→（約1時間30分）→JR湯浅駅 関空快速・紀州路快速利用で乗り換えなし 和歌山方面から\nJR和歌山駅→（約30分）→JR湯浅駅 きのくに線で直通 海上釣り堀としては珍しく駅から徒歩圏内の好立地で、電車でのアクセスが非常に便利です。\n車でのアクセス \u0026nbsp; 大阪市内から\n所要時間：約1時間30分 ルート：阪和自動車道→有田IC→国道42号線 駐車場：施設駐車場完備 和歌山市から\n所要時間：約40分 ルート：国道42号線経由 京都市内から\n所要時間：約2時間30分 ルート：京奈和自動車道→阪和自動車道→有田IC 近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 【最安】予算を抑えたい方向け\n有田市内のビジネスホテル：6,000円～8,000円程度 例：ビジネスホテル有田、有田川温泉 【平均】標準的な宿泊施設\n湯浅・有田周辺の旅館：10,000円～15,000円程度 例：湯浅城温泉 萬波リゾート、紀州湯浅温泉 【高くてもいい】快適さを重視する方向け\n白浜温泉の高級ホテル：20,000円以上（車で40分） 例：白浜古賀の井リゾート\u0026amp;スパ、南紀白浜マリオットホテル レンタカー JR湯浅駅・有田駅周辺にレンタカー会社があります。\nトヨタレンタカー有田店 ニッポンレンタカー湯浅店 ただし、電車でのアクセスが良好なため、レンタカーは必須ではありません。釣具を多く持参する場合や、周辺観光を予定している場合にご利用ください。運転免許証の持参をお忘れなく。\n実際に利用したユーザーの声を抜粋 \u0026nbsp; 40代男性「★★★★★｜5.0」 \u0026nbsp; 1日3回の放流システムが素晴らしいです。どの時間帯でもチャンスがあり、最後まで集中して釣りができました。マダイとカンパチを複数匹釣ることができ、料金を考えるとコスパ最高です。\n50代女性「★★★★☆｜4.0」 \u0026nbsp; 女性料金があるのが嬉しく、7,500円で本格的な海上釣り堀が楽しめました。JR湯浅駅から近いのでアクセスも良く、車がなくても利用できるのが助かります。魚の種類も豊富で満足です。\n30代男性「★★★★★｜5.0」 \u0026nbsp; 乗船名簿を事前に準備しておくと受付がスムーズでした。HPからダウンロードできるので便利です。クエとマハタが釣れて、高級魚の引きを堪能できました。また利用したいです。\n60代男性「★★★☆☆｜3.0」 \u0026nbsp; 竿のレンタル代が別途かかるので、実質的な料金は少し高めに感じました。ただし、タモやスカリが無料なのは良心的です。釣果は良かったので総合的には満足しています。\n20代女性「★★☆☆☆｜2.0」 \u0026nbsp; キャンセル料が7日前から発生するのが厳しいです。天気予報も1週間前では確実ではないので、もう少し直前でもキャンセルできるようになれば良いのですが。釣り自体は楽しかったです。\n駅近の好立地と1日3回の放流システムが高く評価されている一方、キャンセル規定の厳しさやレンタル料金に対する指摘もあります。ただし、釣果や魚種の豊富さについては総じて高い評価を得ています。\n【まとめ】海上釣堀 湯浅をおすすめしたい度 \u0026nbsp; 施設の魅力と特徴 \u0026nbsp; 抜群のアクセス環境 海上釣り堀としては珍しく、JR湯浅駅から徒歩10分という好立地にあります。電車でのアクセスが可能なため、車を持たない方や運転が苦手な方でも気軽に利用できる貴重な施設です。\n充実した放流システム 1日3回の放流により、常に新鮮で活性の高い魚を狙うことができます。時間帯によって戦略を変える楽しさもあり、最後まで飽きることなく釣りを楽しめます。\n豊富な魚種と手頃な料金 マダイ、シマアジ、カンパチ、ヒラマサ、クエ、マハタなど10魚種の豊富なターゲットを、関西圏では比較的リーズナブルな料金で狙えます。特に女性や子供の料金設定が優しく、家族での利用にも適しています。\n最適な利用シーン \u0026nbsp; 電車で行く海上釣り堀体験\n車を持たない方の本格海上釣り堀デビュー 大阪方面からの日帰り釣行 運転疲れを避けたい遠距離からの利用 コスパ重視の釣り旅行\n手頃な料金で本格的な海上釣り堀体験 豊富な魚種を狙いたい方 1日3回の放流でチャンスを最大化したい方 注意点とアドバイス \u0026nbsp; 事前準備の重要性 乗船名簿の事前準備、7日前からのキャンセル料など、事前準備が重要な施設です。計画的な利用と、ホームページでの情報確認を心がけましょう。\nレンタル費用の考慮 基本料金は手頃ですが、竿のレンタル代（1,000円）は別途必要です。破損時の弁償代（3,000円）もあるため、取り扱いには注意が必要です。\nおすすめ度 ★★★★☆（4/5） \u0026nbsp; 海上釣堀 湯浅は、駅近という立地の良さと1日3回の放流システム、豊富な魚種という三つの大きな魅力を持つ優秀な海上釣り堀です。\n電車でアクセスできる海上釣り堀をお探しの方、コスパの良い施設で本格的な釣り体験をしたい方、多彩な魚種を狙いたい方、大阪方面からの日帰り釣行をお考えの方には、海上釣堀 湯浅を強くおすすめします。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 99,
        href: "/wakayama/saikakizaki-seapark/",
        title: "【和歌山県】雑賀崎シーパーク｜チョイ釣りも楽しめるバリアフリ...",
        description: "和歌山市に位置する「雑賀崎シーパーク」は、本格的な海上釣り堀と気軽なチョイ釣りコースを併設した多彩な釣り体験ができる施設です。",
        
        
        content: "和歌山市に位置する「雑賀崎シーパーク」は、本格的な海上釣り堀と気軽なチョイ釣りコースを併設した多彩な釣り体験ができる施設です。\n陸から桟橋で歩いて渡れるバリアフリー設計と、ボウズ保証付きの安心システムで、初心者から上級者まで満足できる海上釣り堀です。\n雑賀崎シーパークの基本情報 \u0026nbsp; 場所：〒641-0061 和歌山県和歌山市田野101-3 営業時間：海上釣堀7:30受付8:00～13:00、ちょい釣り9:00～12:00（土日は9:00～16:00） 定休日：毎週火曜日 平均予算：海上釣堀男性13,200円・女性9,900円、チョイ釣り2,200円～4,400円 レンタル：貸竿1,500円、おまかせ貸竿3,100円（エサ・発泡スチロール・氷・椅子込み） 釣具の持ち込み：可能（竿は4m以内） 釣れる魚：マダイ・ヒラメ・シマアジ・ブリ・カンパチ・他季節物 注意事項：海上釣堀は完全予約制（ネット会員登録必要）、ボウズ保証あり（マダイ2匹） ウェブサイト：https://saikazaki-seapark.com 料金体系について \u0026nbsp; 雑賀崎シーパークは本格的な海上釣り堀と気軽なチョイ釣りの2つのスタイルを提供する釣り放題タイプの施設です。\n＜海上釣り堀（完全予約制）＞\n男性：13,200円 女性：9,900円 小学生以下：5,500円 貸切（8名以内）：1名13,200円 ＜チョイ釣り（予約不要）＞\n2尾コース：4,400円（竿・エサ付き） 1尾コース：2,200円（竿・エサ付き） 営業時間：平日9:00～12:00、土日9:00～16:00 チョイ釣りコースは1時間限定ですが、竿とエサが料金に含まれているため、手ぶらで気軽に釣り体験ができます。釣った魚は必ず持ち帰りとなるため、確実に成果を得られるシステムです。\n注意事項と補足データ \u0026nbsp; 海上釣り堀の予約はインターネット上からの完全予約制で、事前の会員登録が必要です。撒き餌、2本針、サビキ、ルアーの使用は禁止されています。\nボウズ保証としてマダイ2匹が付いているため、初心者でも安心して利用できます。魚の締めは無料で行ってくれますが、うろこ・内臓・エラ取りは1尾300円からの有料サービスとなります。\n最大の特徴は陸から桟橋で歩いて渡れるバリアフリー設計で、車椅子利用者や足の不自由な方でも安心して利用できます。貸切は1イケス8名が基本で、8名を超える場合は要相談となります。\n雑賀崎シーパークのおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 釣り場環境と特徴 \u0026nbsp; 雑賀崎シーパークは和歌山市の雑賀崎半島に位置し、陸続きの桟橋から海上のイケスへアクセスできる珍しい構造です。渡船が不要なため、船酔いの心配がなく、バリアフリー対応も実現しています。\n海上釣り堀攻略法 \u0026nbsp; マダイ向けタックル\nロッド：3.5～4m程度の海上釣り堀専用竿 リール：2500～3000番のスピニングリール ライン：ナイロン3～4号 仕掛け：ウキ釣り仕掛け（ハリス2～3号、マダイ針8～10号） エサ：オキアミ、アミエビ、イソメ 青物（ブリ・カンパチ）向けタックル\nロッド：4m程度の強めの竿 リール：3000番以上のスピニングリール ライン：ナイロン4～5号 仕掛け：ウキ釣り仕掛け（ハリス4～5号、青物用12～14号針） エサ：生アジ、オキアミ チョイ釣り攻略法 \u0026nbsp; チョイ釣りは1時間という短時間勝負のため、手返しの良さが重要です。竿とエサが込みのため、施設スタッフの指導に従って効率的に釣りを進めましょう。\n基本戦略\n開始直後は活性の高い魚を狙う エサの付け方をスタッフに確認 アタリがあったら確実に取り込む 時間内に規定数を釣り上げることを優先 季節別の釣果情報 \u0026nbsp; 春（3月～5月）\nマダイの活性が高まる時期 ヒラメも狙い目 チョイ釣りでも良型が期待できる 夏（6月～8月）\n青物の最盛期 ブリ、カンパチの大型が狙える 土日のチョイ釣り営業時間が延長 秋（9月～11月）\n全魚種が安定して釣れる シマアジの数釣りも楽しめる 1年で最も釣果が安定する時期 冬（12月～2月）\nマダイ中心の釣りとなる 寒さ対策が重要 魚の活性はやや下がるが型は良い 雑賀崎シーパークへのアクセス情報 \u0026nbsp; 車でのアクセス｜おすすめ！ \u0026nbsp; 大阪市内から\n所要時間：約1時間45分 ルート：阪和自動車道→和歌山IC→国道24号線→県道7号線 駐車場：無料駐車場完備 和歌山市内から\n所要時間：約20分 ルート：県道7号線経由 京都市内から\n所要時間：約2時間15分 ルート：京奈和自動車道→阪和自動車道→和歌山IC 雑賀崎は和歌山市の南西部に位置し、駅や主要道路からやや離れているため、車でのアクセスが最も便利です。\n電車・バスでのアクセス \u0026nbsp; 最寄駅：JR和歌山駅\n大阪駅から約1時間 駅からタクシーで約25分（約4,000円） 路線バス利用\nJR和歌山駅から和歌山バス「雑賀崎循環線」 「雑賀崎遊園」バス停下車、徒歩5分 所要時間：約40分 近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 【最安】予算を抑えたい方向け\n和歌山市内のビジネスホテル：6,000円～9,000円程度 例：ダイワロイネットホテル和歌山、ホテルグランヴィア和歌山 【平均】標準的な宿泊施設\n和歌山市内のシティホテル：10,000円～15,000円程度 例：和歌山アーバンホテル、ホテルアバローム紀の国 【高くてもいい】快適さを重視する方向け\n雑賀崎のリゾートホテル：20,000円以上 例：和歌山マリーナシティホテル、加太淡嶋温泉 レンタカー JR和歌山駅周辺にレンタカー会社があります。\nトヨタレンタカー和歌山駅前店 ニッポンレンタカー和歌山駅前店 タイムズカーレンタル和歌山駅前店 雑賀崎近隣の宿泊は割高になりがちなため、和歌山市内のビジネスホテルを利用して車で20分程度移動する方が経済的です。運転免許証の持参をお忘れなく。\n実際に利用したユーザーの声を抜粋 \u0026nbsp; 50代男性「★★★★★｜5.0」 \u0026nbsp; バリアフリー対応で父親の車椅子でも問題なく利用できました。渡船がないので船酔いの心配もなく、3世代で楽しめました。ボウズ保証があるので安心でした。マダイとブリを複数匹釣れて大満足です。\n30代女性「★★★★☆｜4.0」 \u0026nbsp; チョイ釣りコースを利用しました。1時間という短時間でしたが、竿とエサが込みで手ぶらで参加できるのが良かったです。2尾コースで時間内に釣り上げることができ、子供も喜んでいました。\n40代男性「★★★★★｜5.0」 \u0026nbsp; 和歌山市からのアクセスが良く、日帰りでも十分楽しめました。インターネット予約は最初面倒でしたが、会員になると次回からスムーズです。おまかせ貸竿セットは便利で、手ぶらで本格的な釣りができました。\n60代女性「★★★☆☆｜3.0」 \u0026nbsp; 魚の締めは無料ですが、下処理は有料なのが少し残念でした。ただし、技術的にはしっかりしているので、料金に見合った作業をしてくれます。釣果は良かったので総合的には満足です。\n20代男性「★★☆☆☆｜2.0」 \u0026nbsp; 貸切で利用しましたが、8名を超えると別のイケスになるシステムが分かりにくかったです。料金も一人当たりで計算されるため、大人数だと割高感があります。もう少し明確な料金体系にしてほしいです。\nバリアフリー対応やチョイ釣りコースの手軽さが高く評価されている一方、料金体系の複雑さや有料サービスの多さに対する指摘もあります。ただし、施設の技術やサービス品質については総じて高い評価を得ています。\n【まとめ】雑賀崎シーパークをおすすめしたい度 \u0026nbsp; 施設の魅力と特徴 \u0026nbsp; バリアフリー対応の海上釣り堀 雑賀崎シーパーク最大の特徴は、陸から桟橋で歩いて渡れるバリアフリー設計です。渡船が不要なため、車椅子利用者、高齢者、船酔いしやすい方でも安心して利用できる数少ない海上釣り堀です。\n多様な釣りスタイル 本格的な海上釣り堀とチョイ釣りコースの2つのスタイルを提供しており、予算や時間、経験レベルに応じて選択できます。特にチョイ釣りは1時間で確実に魚を持ち帰れるため、観光の合間にも利用しやすいシステムです。\n充実したサポートサービス ボウズ保証（マダイ2匹）、魚の締めサービス、おまかせ貸竿セットなど、初心者向けのサポートが充実しています。インターネット予約システムも整備されており、事前準備がスムーズです。\n最適な利用シーン \u0026nbsp; 家族三世代での利用\nバリアフリー対応で高齢者も安心 チョイ釣りで子供も楽しめる 和歌山市内からのアクセスが良好 観光との組み合わせ\n和歌山市内観光の一部として チョイ釣りなら短時間で釣り体験可能 和歌山マリーナシティとの組み合わせ 注意点とアドバイス \u0026nbsp; 料金体系の複雑さ 海上釣り堀とチョイ釣り、貸切など複数のプランがあるため、事前にしっかりと料金体系を確認することが重要です。特に貸切利用時の人数制限には注意が必要です。\n有料サービスの多さ 魚の下処理など一部サービスが有料のため、事前に必要なサービスを確認し、予算に含めておくことをおすすめします。\nおすすめ度 ★★★★☆（4/5） \u0026nbsp; 雑賀崎シーパークは、バリアフリー対応という他にない特徴を持つ貴重な海上釣り堀です。和歌山市からのアクセスも良く、多様な釣りスタイルで幅広いニーズに対応しています。\n車椅子利用者や高齢者を含む家族での利用、船酔いが心配な方、短時間で釣り体験をしたい観光客、和歌山市内からアクセスの良い海上釣り堀をお探しの方には、雑賀崎シーパークを強くおすすめします。"
      })
      .add(
      
      
      
      
      
      {
        id: 100,
        href: "/wakayama/tsuribori-kishu/",
        title: "【和歌山県】釣堀紀州｜アクセス良好・ボウズ保証付き完全ガイド",
        description: "関西圏から手軽にアクセスできる本格海上釣り堀として人気の「釣堀紀州」。ボウズ保証や充実したレンタルサービスで初心者から上級者まで安心して楽しめる施設です。",
        
        
        content: "関西圏から手軽にアクセスできる本格海上釣り堀として人気の「釣堀紀州」。ボウズ保証や充実したレンタルサービスで初心者から上級者まで安心して楽しめる施設です。\n大阪市内から1時間30分という好立地で、気軽に大物釣りを体験できます。\n釣堀紀州の基本情報 \u0026nbsp; 場所：〒643-0073 和歌山県有田郡広川町唐尾1147-5 営業時間：7:00～13:00（釣り開始の目安は8:00頃） 定休日：毎週火曜日、元旦 平均予算：男性13,750円、女性10,450円、子供6,050円 レンタル：貸竿セット3,200円（竿・エサ・発泡スチロール・氷・椅子込み） 釣具の持ち込み：可能（竿は4m以内推奨） 釣れる魚：マダイ・シマアジ・ブリ・カンパチ・クエ・マハタ 注意事項：ボウズ保証あり（マダイ2匹）、3日前からキャンセル料発生 ウェブサイト： 釣堀紀州 料金体系について \u0026nbsp; 釣堀紀州は釣り放題タイプの海上釣り堀で、釣った魚は全て持ち帰ることができます。料金設定は性別・年齢によって分かれており、女性や子供には優しい価格設定となっています。\n＜基本料金＞\n男性（中学生以上）：13,750円 女性（中学生以上）：10,450円 子供（小学生以下）：6,050円 見学：1,100円（渡船料込み・3歳以上） 貸竿セットは3,200円と一見高く感じますが、竿・エサ・発泡スチロール・氷・椅子がセットになっており、これらを個別にレンタルすると4,000円以上かかるため、実はお得な設定です。\n注意事項と補足データ \u0026nbsp; 釣堀紀州の大きな魅力は「ボウズ保証」があることです。万が一釣れなかった場合でも、マダイ2匹は持ち帰ることができるため、初心者でも安心して利用できます。\n予約は3日前からキャンセル料が発生するため、天候を含めて計画的な利用が重要です。予約受付は一般が7:00から、貸切は6:40からと早朝のため、前日宿泊を推奨します。\n釣れた魚に応じてポイントが貯まるリピーター制度があり、30ポイントで釣り代金が無料になる嬉しいサービスも実施しています。\n釣堀紀州のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 釣り場環境と特徴 \u0026nbsp; 釣堀紀州は本格的な海上釣り堀で、渡船で沖のイケスまで移動します。イケス内の水深は8～12m程度で、ウキ釣り仕掛けが基本となります。\n主要ターゲット別攻略法\nマダイ向けタックル\nロッド：3.5～4m程度の海上釣り堀専用竿 リール：2500～3000番のスピニングリール ライン：ナイロン3～4号 仕掛け：ウキ釣り仕掛け（ハリス2～3号、針はマダイ8～10号） エサ：オキアミ、アミエビ、生アジ 青物（ブリ・カンパチ）向けタックル\nロッド：3.5～4m程度の強めの竿 リール：3000～4000番のスピニングリール ライン：ナイロン4～5号 仕掛け：ウキ釣り仕掛け（ハリス4～5号、針は青物用12～14号） エサ：生アジ、オキアミ 初めて訪れる方は、レンタル釣具の利用をおすすめします。施設スタッフが棚の深さやおすすめの仕掛けを教えてくれるため、失敗のリスクを減らせます。\n季節別の釣果情報 \u0026nbsp; 春（3月～5月）\nマダイの活性が高くなる時期 シマアジも狙い目 水温上昇に伴い魚の食いが活発 夏（6月～8月）\n青物が最盛期 カンパチ、ブリの大型が期待できる 早朝の時間帯が特におすすめ 秋（9月～11月）\n全魚種が好調な時期 クエやマハタなどの高級魚も狙える 1年で最も安定した釣果が期待できる 冬（12月～2月）\nマダイ中心の釣りとなる 魚の活性はやや下がるが、型は良い 寒さ対策が重要 釣堀紀州へのアクセス情報 \u0026nbsp; 車でのアクセス｜おすすめ！ \u0026nbsp; 大阪市内から\n所要時間：約1時間30分 ルート：阪和自動車道→有田IC→国道42号線 駐車場：無料完備 和歌山市から\n所要時間：約50分 ルート：国道42号線経由 京都市内から\n所要時間：約2時間30分 ルート：京奈和自動車道→阪和自動車道→有田IC 朝7:00からの受付に間に合わせるため、大阪市内からでも十分日帰りが可能です。ただし余裕を持ったスケジュールをおすすめします。\n電車でのアクセス \u0026nbsp; 最寄駅：JR広川ビーチ駅\n大阪駅から約1時間30分 駅からタクシーで約10分（約2,000円） 電車利用の場合、朝の受付時間に間に合わせるのは困難なため、前日入りを推奨します。\n近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 【最安】予算を抑えたい方向け\n有田市内のビジネスホテル：6,000円～8,000円程度 例：ホテル\u0026amp;レストラン サンプラザなど 【平均】標準的な宿泊施設\n湯浅温泉の旅館・ホテル：10,000円～15,000円程度 例：湯浅城温泉 萬波リゾートなど 【高くてもいい】快適さを重視する方向け\n白浜温泉の高級リゾートホテル：20,000円以上 例：白浜古賀の井リゾート\u0026amp;スパなど レンタカー JR有田駅・湯浅駅周辺にレンタカー会社があります。\nトヨタレンタカー有田店 ニッポンレンタカー湯浅店 釣具を持参する場合は軽自動車よりもコンパクトカー以上をおすすめします。料金は1日5,000円～8,000円程度です。運転免許証の持参をお忘れなく。\n実際に利用したユーザーの声を抜粋 \u0026nbsp; 50代男性「★★★★★｜5.0」 \u0026nbsp; ボウズ保証があるので安心して利用できました。実際にはマダイとブリを3匹ずつ釣ることができ、大満足の釣果でした。スタッフの方も親切で、仕掛けの調整も手伝ってくれました。\n40代女性「★★★★☆｜4.0」 \u0026nbsp; 女性料金があるのが嬉しいです。貸竿セットを利用しましたが、必要なものが全て揃っているので手ぶらで楽しめました。少し波があって船酔いが心配でしたが、釣りに夢中になっているうちに忘れてしまいました。\n30代男性「★★★★★｜5.0」 \u0026nbsp; 大阪から1時間半で本格的な海上釣り堀が楽しめるのは最高です。放流のタイミングが良く、青物の引きを満喫できました。ポイント制度があるのでリピートしたくなります。\n60代男性「★★★☆☆｜3.0」 \u0026nbsp; 料金が少し高めに感じましたが、釣果を考えれば妥当かもしれません。ただし、魚のサイズにばらつきがあり、小さめの個体も混じっていました。\n30代女性「★★☆☆☆｜2.0」 \u0026nbsp; 朝が早すぎて辛かったです。もう少し遅い時間からの営業があれば良いのですが。また、船酔いしやすい方は事前に酔い止めを飲んでおくことをおすすめします。\n朝の早い時間や船酔いに関する懸念もありますが、全体的には施設のサービスや釣果に対する満足度が高く、特にボウズ保証や充実したレンタルサービスが好評です。船酔いが心配な方は、事前に酔い止め薬を服用し、前日の夜更かしを避けることで対策できます。\n【まとめ】釣堀紀州をおすすめしたい理由 \u0026nbsp; 釣堀紀州は関西圏からのアクセスが良好で、初心者から上級者まで満足できる優秀な海上釣り堀です。\nおすすめする主な理由 \u0026nbsp; まず、大阪市内から1時間30分という好立地により、日帰りでも十分楽しめる点が大きな魅力です。有料道路を利用すれば都市部からのアクセスが良く、週末の釣行にも適しています。\nボウズ保証制度により、釣り初心者や家族連れでも安心して利用できます。万が一釣れなくてもマダイ2匹は持ち帰れるため、「せっかく来たのに何も釣れなかった」という最悪の事態を避けられます。\n貸竿セットは一見高額に見えますが、竿・エサ・発泡スチロール・氷・椅子が含まれており、個別レンタルより実質的にお得です。手ぶらで本格的な海上釣り堀を体験したい方に最適です。\n豊富な魚種とサービスが魅力的 \u0026nbsp; 釣れる魚種も豊富で、マダイ・シマアジ・ブリ・カンパチ・クエ・マハタと高級魚が狙えます。特に青物の引きは海上釣り堀ならではの醍醐味を味わえます。\nリピーター向けのポイント制度もあり、30ポイントで1回無料になるサービスは長期的に利用する方にとって魅力的です。\n営業時間も朝7:00からと極端に早すぎることもなく、和歌山県内からなら十分日帰り圏内です。定休日が火曜日のみで年中無休に近い営業も利用しやすいポイントです。\n関西圏で本格的な海上釣り堀体験を求める方、ボウズの心配なく安心して釣りを楽しみたい方、アクセスの良い施設をお探しの方には、釣堀紀州を強くおすすめします。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 101,
        href: "/wakayama/yura-sea-fishing-park/",
        title: "【和歌山県】由良海つり公園｜海上釣り堀と筏釣り両方楽しめる複...",
        description: "和歌山県由良町にある「由良海つり公園」は、本格的な海上釣り堀と天然フィールドでの筏釣りを同一施設で楽しめる全国でも珍しい複合釣り施設です。",
        
        
        content: "和歌山県由良町にある「由良海つり公園」は、本格的な海上釣り堀と天然フィールドでの筏釣りを同一施設で楽しめる全国でも珍しい複合釣り施設です。\n予算や釣りスタイルに応じて選択できる2つのコースで、初心者から上級者まで満足できる多彩な釣り体験を提供しています。\n由良海つり公園の基本情報 \u0026nbsp; 場所：〒649-1122 和歌山県日高郡由良町神谷465-1 営業時間：釣堀5～9月7:00～13:00・10～4月8:00～14:00、筏釣り季節により5:00～18:00 定休日：木曜日 平均予算：釣堀大人12,000円・筏釣り大人2,000円 レンタル：貸竿500円、タモ・スカリ無料、活アジ5匹500円 釣具の持ち込み：可能（筏釣りは1人2本以内） 釣れる魚：マダイ・ヒラメ・ブリ・マゴチ・クロダイ・シーバス・アオリイカ・タコ・メバル・カワハギ 注意事項：アミエビ以外の撒き餌使用不可 ウェブサイト： 由良海つり公園 料金体系について \u0026nbsp; 由良海つり公園は海上釣り堀と筏釣りの2つのスタイルを提供しており、それぞれ異なる料金体系となっています。\n＜海上釣り堀コース＞\n大人：12,000円 女性：8,000円 子供：6,000円 貸切（18名以内）：170,000円 ＜筏釣りコース＞\n大人（16歳以上）：2,000円 子供（6～15歳）：1,500円 海上釣り堀は釣り放題タイプで、釣った魚は全て持ち帰ることができます。筏釣りは天然フィールドでの釣りのため、釣果は自然条件に左右されますが、リーズナブルな料金で本格的な海釣りが楽しめます。\n注意事項と補足データ \u0026nbsp; 営業時間は釣堀と筏釣りで異なり、さらに季節によっても変動します。特に筏釣りは夏期（6～8月）に早朝5:00からの営業となるため、事前確認が重要です。\n撒き餌はアミエビ以外使用不可のため、持参する場合は注意が必要です。筏釣りでは1人2本まで竿を使用できますが、海上釣り堀では通常1本までの制限があります。\n貸切プランは18名以内で170,000円と、1人あたり約9,400円の計算になり、通常料金より割安になります。家族やグループでの利用に適したプランです。\n由良海つり公園のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 釣り場環境と特徴 \u0026nbsp; 由良海つり公園は由良湾内に位置し、穏やかな海域で安全に釣りを楽しむことができます。海上釣り堀は管理されたイケス内での釣りのため確実性が高く、筏釣りは天然フィールドでの本格的な海釣りが体験できます。\n海上釣り堀攻略法 \u0026nbsp; マダイ向けタックル\nロッド：3～3.5m程度の海上釣り堀専用竿 リール：2500～3000番のスピニングリール ライン：ナイロン3～4号 仕掛け：ウキ釣り仕掛け（ハリス2～3号、マダイ針8～10号） エサ：オキアミ、アミエビ、活アジ 青物（ブリ）向けタックル\nロッド：3.5m程度の強めの竿 リール：3000～4000番のスピニングリール ライン：ナイロン4～5号 仕掛け：ウキ釣り仕掛け（ハリス4～5号、青物用12～14号針） エサ：活アジ、オキアミ 筏釣り攻略法 \u0026nbsp; クロダイ（チヌ）向けタックル\nロッド：4.5～5.3m程度のチヌ竿 リール：2000～2500番のスピニングリール ライン：ナイロン2～3号 仕掛け：フカセ釣り仕掛けまたは落とし込み仕掛け エサ：オキアミ、アミエビ、練り餌 根魚（メバル・カサゴ）向けタックル\nロッド：2.1～2.7m程度のライトロッド リール：2000番のスピニングリール ライン：ナイロン2～3号 仕掛け：胴付き仕掛け、ジグヘッド+ワーム エサ：イソメ、オキアミ、ワーム アオリイカ向けタックル\nロッド：8～9フィートのエギングロッド リール：2500番のスピニングリール ライン：PE0.6～0.8号 仕掛け：エギ（3～3.5号） 時期：春と秋がハイシーズン 季節別の釣果情報 \u0026nbsp; 春（3月～5月）\n筏釣り：クロダイ、メバルが好調 釣堀：マダイの活性が高い時期 アオリイカの春イカシーズン開始 夏（6月～8月）\n筏釣り：シーバス、タコが狙い目 釣堀：ブリなど青物の最盛期 早朝営業（5:00～）で涼しい時間帯を活用 秋（9月～11月）\n筏釣り：アオリイカの秋イカシーズン 釣堀：全魚種が安定して釣れる 1年で最も釣果が期待できる時期 冬（12月～2月）\n筏釣り：メバル、カワハギがメイン 釣堀：マダイ、ヒラメが中心 営業時間短縮に注意 由良海つり公園へのアクセス情報 \u0026nbsp; 車でのアクセス｜おすすめ！ \u0026nbsp; 大阪市内から\n所要時間：約1時間50分 ルート：阪和自動車道→有田IC→国道42号線→県道23号線 駐車場：施設駐車場完備 和歌山市から\n所要時間：約1時間 ルート：国道42号線経由 京都市内から\n所要時間：約2時間30分 ルート：京奈和自動車道→阪和自動車道→有田IC 由良町は和歌山県中部の海岸沿いに位置し、車でのアクセスが最も便利です。特に早朝営業に対応するには車での移動が必須となります。\n電車・バスでのアクセス \u0026nbsp; 最寄駅：JR紀伊由良駅\n大阪駅から約2時間（乗り換え1回） 駅からタクシーで約10分（約2,500円） 電車利用の場合、乗り換えが必要で時間もかかるため、車でのアクセスを強く推奨します。\n近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 【最安】予算を抑えたい方向け\n有田市内のビジネスホテル：6,000円～8,000円程度（車で30分） 例：ビジネスホテル有田、有田川温泉 【平均】標準的な宿泊施設\n由良町内の民宿・旅館：8,000円～12,000円程度 例：由良の宿、海辺の民宿 【高くてもいい】快適さを重視する方向け\n由良・白浜のリゾートホテル：15,000円以上 例：白浜古賀の井リゾート\u0026amp;スパ（車で20分） レンタカー JR有田駅・湯浅駅周辺にレンタカー会社があります。\nトヨタレンタカー有田店 ニッポンレンタカー湯浅店 由良はリゾートホテルが多く宿泊費が高めのため、予算を抑えたい場合は有田市内のビジネスホテル利用を推奨します。運転免許証の持参をお忘れなく。\n実際に利用したユーザーの声を抜粋 \u0026nbsp; 40代男性「★★★★★｜5.0」 \u0026nbsp; 1つの施設で海上釣り堀と筏釣りの両方が楽しめるのが最高です。午前中は釣堀で確実に魚を釣り、午後は筏釣りで天然魚にチャレンジしました。それぞれ違った楽しさがあり、1日飽きることがありませんでした。\n30代女性「★★★★☆｜4.0」 \u0026nbsp; 女性料金があるので8,000円で海上釣り堀が楽しめました。筏釣りは2,000円と安いので、釣り初心者の練習にも良いと思います。スタッフの方も親切で、仕掛けの説明も丁寧でした。\n50代男性「★★★★★｜5.0」 \u0026nbsp; 筏釣りでアオリイカとクロダイを釣ることができました。天然フィールドでの釣りは海上釣り堀とは全く違った面白さがあります。料金も安く、のんびり釣りを楽しめるのが良いですね。\n60代男性「★★★☆☆｜3.0」 \u0026nbsp; 営業時間が複雑で、季節によって変わるのが分かりにくかったです。事前にしっかり確認しておけば良かったと思います。釣果は良かったので、次回はきちんと調べてから行きます。\n20代男性「★★☆☆☆｜2.0」 \u0026nbsp; 筏釣りは天然相手なので釣れない時は全然釣れませんでした。確実に釣りたいなら釣堀の方が良いと思います。ただし、料金の安さを考えれば妥当かもしれません。\n2つの釣りスタイルを楽しめる点や料金設定の良さが高く評価されている一方、営業時間の複雑さや天然フィールドの不確実性に対する指摘もあります。ただし、多様な釣り体験ができる点については総じて高い評価を得ています。\n【まとめ】由良海つり公園をおすすめしたい度 \u0026nbsp; 施設の魅力と特徴 \u0026nbsp; 2つの釣りスタイルを同時に楽しめる 由良海つり公園最大の魅力は、海上釣り堀と筏釣りという全く異なる2つの釣りスタイルを1つの施設で体験できることです。確実性を求める方は釣堀を、自然の醍醐味を味わいたい方は筏釣りを選択でき、上級者なら両方を楽しむことも可能です。\n幅広い予算に対応 筏釣り2,000円から海上釣り堀12,000円まで、予算に応じて選択できる柔軟な料金設定が魅力です。家族連れなら子供は筏釣りで練習し、大人は釣堀で本格的な釣りを楽しむといった使い分けも可能です。\n豊富な魚種とターゲット マダイ、ブリ、クロダイ、アオリイカ、シーバスなど、10種類以上の多彩な魚種を狙うことができます。季節や釣り方によってターゲットを変えられるため、リピーターも飽きることがありません。\n最適な利用シーン \u0026nbsp; 多様な釣り体験を求める方\n1日で異なる釣りスタイルを体験したい方 釣り初心者から上級者まで同行するグループ 予算に制約があるが本格的な釣りも楽しみたい方 家族・グループでの利用\n経験レベルの異なる家族での釣行 社員旅行や友人グループでの多様な楽しみ方 貸切プランでの特別な釣り体験 注意点とアドバイス \u0026nbsp; 営業時間の確認 釣堀と筏釣りで営業時間が異なり、さらに季節によっても変動します。特に夏期の早朝営業や冬期の短縮営業に注意が必要です。事前に公式サイトで最新情報を確認しましょう。\n天然フィールドの不確実性 筏釣りは天然フィールドでの釣りのため、天候や潮の条件によって釣果に大きな差が出ます。確実性を求める場合は海上釣り堀の利用を検討しましょう。\nおすすめ度 ★★★★☆（4/5） \u0026nbsp; 由良海つり公園は、1つの施設で2つの異なる釣りスタイルを楽しめる全国でも珍しい複合釣り施設です。予算や経験レベルに応じて選択できる柔軟性と、豊富な魚種が大きな魅力となっています。\n多様な釣り体験を求める方、予算を抑えながらも本格的な釣りを楽しみたい方、家族やグループで異なる釣りスタイルを同時に楽しみたい方、和歌山県中部での釣り体験をお考えの方には、由良海つり公園を強くおすすめします。"
      })
      .add(
      
      
      
      
          
      
      
      {
        id: 102,
        href: "/wakayama/wakayama-marinacity-fishing-park/",
        title: "【和歌山県】和歌山マリーナシティ釣り公園｜観光地で楽しむファ...",
        description: "和歌山マリーナシティ内にある「和歌山マリーナシティ釣り公園」は、2025年に新規オープンしたファミリー向け海釣り施設です。",
        
        
        content: "和歌山マリーナシティ内にある「和歌山マリーナシティ釣り公園」は、2025年に新規オープンしたファミリー向け海釣り施設です。\n観光地という立地を活かし、釣りと観光を組み合わせた楽しみ方ができる手軽な海釣り体験を提供しています。\n和歌山マリーナシティ釣り公園の基本情報 \u0026nbsp; 項目 詳細 施設名 和歌山マリーナシティ釣り公園 住所 〒641-0014 和歌山県和歌山市毛見1527 営業時間 7:00～17:00 定休日 火曜日 料金 大人 1,000円 / 子供（小学生以下） 600円 レンタル 竿 1,000円 / ライフジャケット（レンタル料要確認） 釣具の持ち込み 可能 釣れる魚 クロダイ・シーバス・カレイ・アジ・サバ・カワハギ・ブリ・カンパチ・キス・カサゴ・メジナ 注意事項 中学生以下は救命胴衣着用必須、小学生以下は保護者同伴必須 公式サイト 和歌山マリーナシティ釣り公園 料金体系について \u0026nbsp; 和歌山マリーナシティ釣り公園は、観光地内の海釣り施設として非常にリーズナブルな料金設定となっています。\n＜基本入場料金＞\n大人（中学生以上）：1,000円 子供（小学生以下）：600円 ＜レンタル料金＞\n竿：1,000円 ライフジャケット：レンタル料金は要確認 入場料金のみで1日釣りを楽しむことができ、釣った魚は全て持ち帰り可能です。竿のレンタルも1,000円と手頃で、観光のついでに気軽に釣り体験ができる料金設定です。\n注意事項と補足データ \u0026nbsp; 安全対策として、中学生以下はフローティングベスト（救命胴衣）の着用が入園の必須条件となっています。小学生以下は保護者の同伴が必要で、ファミリー向けの安全な釣り環境が整備されています。\n2024年1月30日に一旦閉園しましたが、2025年に新規オープンしており、施設が新しく整備されています。護岸堤防での釣りとなるため、波止釣り用のタックル構成が適しています。\n和歌山マリーナシティという大型観光施設内にあるため、釣り以外にも遊園地、水族館、温泉、ショッピングなど多彩な楽しみ方ができる立地です。\n和歌山マリーナシティ釣り公園のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 釣り場環境と特徴 \u0026nbsp; 和歌山マリーナシティ釣り公園は、護岸堤防を利用した海釣り施設です。足場が安定しており、柵などの安全設備も整っているため、子供連れでも安心して釣りを楽しむことができます。\n護岸釣り基本タックル \u0026nbsp; 万能タックル（初心者向け）\nロッド：2.7～3.6m程度の万能竿またはコンパクトロッド リール：2000～2500番のスピニングリール ライン：ナイロン2～3号 仕掛け：サビキ仕掛け、胴付き仕掛け エサ：アミエビ、オキアミ、イソメ ファミリー向けお手軽セット\n短めの竿（2.1～2.7m）で子供も扱いやすい 軽量リールで疲れにくい 仕掛けはサビキ釣りがおすすめ エサはアミエビブロックが便利 季節別ターゲットと攻略法 \u0026nbsp; 春（3月～5月）\nメインターゲット：メジナ、カサゴ、カレイ おすすめ仕掛け：胴付き仕掛け、投げ釣り仕掛け エサ：イソメ、オキアミ 夏（6月～8月）\nメインターゲット：アジ、サバ、キス おすすめ仕掛け：サビキ仕掛け、投げ釣り仕掛け エサ：アミエビ、イソメ 朝夕の時間帯が特におすすめ 秋（9月～11月）\nメインターゲット：クロダイ、シーバス、カワハギ おすすめ仕掛け：フカセ釣り、ルアー釣り、胴付き仕掛け エサ：オキアミ、アサリ、ルアー 冬（12月～2月）\nメインターゲット：カレイ、メバル、カサゴ おすすめ仕掛け：投げ釣り仕掛け、胴付き仕掛け エサ：イソメ、オキアミ 子供連れでの釣りのコツ \u0026nbsp; 安全対策\n救命胴衣の正しい着用 釣り針の取り扱い指導 足場の確認と注意喚起 楽しく釣るポイント\nサビキ釣りで数釣りを楽しむ 短時間で成果が出やすい時間帯を選ぶ 釣れた魚の名前や特徴を教える 和歌山マリーナシティ釣り公園へのアクセス情報 \u0026nbsp; 車でのアクセス｜おすすめ！ \u0026nbsp; 大阪市内から\n所要時間：約1時間30分 ルート：阪和自動車道→海南IC→国道42号線 駐車場：マリーナシティ駐車場利用（3,000台） 和歌山市内から\n所要時間：約30分 ルート：国道42号線経由 京都市内から\n所要時間：約2時間 ルート：京奈和自動車道→阪和自動車道→海南IC マリーナシティには大型駐車場があり、観光地としてのアクセス環境が整っています。\n電車・バスでのアクセス \u0026nbsp; JR海南駅から\n和歌山バス「マリーナシティ行き」で約15分 「マリーナシティ」バス停下車すぐ JR和歌山駅から\n和歌山バス「マリーナシティ行き」で約30分 直通バスで便利 電車とバスでのアクセスも可能で、観光地として公共交通機関が整備されています。\n近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 【最安】予算を抑えたい方向け\n和歌山市内のビジネスホテル：6,000円～9,000円程度 例：ダイワロイネットホテル和歌山、ホテルグランヴィア和歌山 【平均】標準的な宿泊施設\n海南市・和歌山市のシティホテル：10,000円～15,000円程度 例：和歌山アーバンホテル、紀州温泉 【高くてもいい】快適さを重視する方向け\nマリーナシティ内・周辺のリゾートホテル：20,000円以上 例：和歌山マリーナシティホテル、加太淡嶋温泉 レンタカー JR和歌山駅・海南駅周辺にレンタカー会社があります。\nトヨタレンタカー和歌山駅前店 ニッポンレンタカー海南店 タイムズカーレンタル和歌山駅前店 マリーナシティ内に宿泊すれば徒歩で釣り公園にアクセスできるため、観光と釣りを組み合わせた旅行に最適です。\n実際に利用したユーザーの声 \u0026nbsp; 30代女性 評価：★★★★★ 「子供と一緒に安心して釣りができました。救命胴衣の貸し出しもあり、スタッフの方も子供に優しく接してくれました。釣り後にポルトヨーロッパで遊べるのも子供は大喜びでした。観光と釣りの両方が楽しめて最高です。」\n40代男性 評価：★★★★☆ 「観光ついでに気軽に釣りができるのが良いですね。料金も安く、竿のレンタルもあるので手ぶらで参加できました。アジとサバが釣れて、子供も喜んでいました。護岸なので足場も安定していて安全です。」\n50代男性 評価：★★★★☆ 「2025年にリニューアルオープンしたとあって、施設がとてもきれいでした。駐車場も広く、アクセスも良好です。釣果はそれなりでしたが、観光地の釣り施設としては十分満足できるレベルだと思います。」\n60代女性 評価：★★★☆☆ 「孫と一緒に利用しました。安全対策はしっかりしていて安心でしたが、魚がなかなか釣れず、孫が飽きてしまいました。もう少し釣れやすい工夫があると良いのですが。ただし、その後の観光で機嫌は直りました。」\n20代男性 評価：★★☆☆☆ 「本格的な釣りを期待していましたが、観光地の釣り施設という感じで物足りませんでした。魚種は豊富ですが、サイズは小さめが多かったです。ファミリー向けの施設だと割り切れば良いかもしれません。」\nファミリー向けの安全性や観光との組み合わせに対する評価が高い一方、本格的な釣りを求める方には物足りないという声もあります。観光地内の釣り施設として、気軽な釣り体験を提供する施設であることを理解して利用することが重要です。\nまとめ：和歌山マリーナシティ釣り公園をおすすめしたい人 \u0026nbsp; 施設の魅力と特徴 \u0026nbsp; 観光と釣りの融合 和歌山マリーナシティという一大観光地内にあるため、釣りと観光を同時に楽しめる唯一無二の立地です。ポルトヨーロッパ、和歌山マリーナシティホテル、温泉、レストランなどが隣接しており、1日中楽しめる総合的なレジャー体験を提供しています。\nファミリー向けの安全設計 護岸堤防という安定した足場と、救命胴衣着用義務などの徹底した安全対策により、子供連れでも安心して釣りを楽しめます。2025年のリニューアルオープンにより施設も新しく、清潔で快適な環境が整っています。\n手軽な料金設定 大人1,000円、子供600円という観光地としては非常にリーズナブルな料金設定で、観光のついでに気軽に釣り体験ができます。竿のレンタルも1,000円と手頃で、手ぶらでの参加も可能です。\nこんな人におすすめ \u0026nbsp; 子供の釣りデビューを考えているファミリー 安全性を重視した釣り体験を求める方 マリーナシティ観光の一部として釣りを楽しみたい方 手軽な釣り体験を求める観光客 時間に制約のある観光客 注意点とアドバイス \u0026nbsp; 釣果への期待値調整 観光地内の釣り施設のため、本格的な釣りを求める方には物足りない可能性があります。気軽な釣り体験と割り切って利用することが重要です。\n安全ルールの遵守 中学生以下の救命胴衣着用は入園の必須条件のため、忘れずに対応しましょう。小学生以下は保護者の同伴が必要です。\n和歌山マリーナシティ釣り公園は、観光地内の気軽な釣り体験施設として、特定のニーズに特化した価値を提供しています。本格的な釣りや大型魚を求める方には、他の海上釣り堀や本格的な海釣り施設の利用を推奨します。"
      })
      .add(
      
      
      
      
      
      {
        id: 103,
        href: "/nagasaki/jumbo-fishing-mura/",
        title: "ジャンボフィッシング村",
        description: "長崎県佐世保市にあるジャンボフィッシング村は、全国でも珍しい「リリース可能」な海上釣り堀として注目を集めています。予約不要で気軽に立ち寄れる利便性と、釣った魚を自由にリリースできる環境保護への配慮が特徴的な施設です。",
        
        
        content: "長崎県佐世保市にあるジャンボフィッシング村は、全国でも珍しい「リリース可能」な海上釣り堀として注目を集めています。予約不要で気軽に立ち寄れる利便性と、釣った魚を自由にリリースできる環境保護への配慮が特徴的な施設です。\nマダイ・ヒラマサ・シマアジなど8種類の魚種が狙え、A・B・Cの3コースから予算と時間に応じて選択できる柔軟な料金システムが魅力です。\nジャンボフィッシング村の基本情報 \u0026nbsp; 場所：〒859-6206 長崎県佐世保市鹿町町長串1-７ 営業時間：8:00～17:00 定休日：金曜日（祝日と年末年始は営業） 平均予算：2,000円～8,500円（コースにより変動） レンタル：貸竿700円（仕掛け3本セット）、撒き餌・付け餌320円から、タモ・スカリ無料 釣具の持ち込み：可能（竿は4m以内推奨、ルアー・サビキ等の仕掛け多数禁止） 釣れる魚：マダイ・ヒラマサ・シマアジ・ヒラメ・シーバス・メジナ・ブリ・イサキ 注意事項：予約不要、リリース可能、5名以上の団体で最大20%割引（要事前予約） ウェブサイト： ジャンボフィッシング村 料金体系について \u0026nbsp; ジャンボフィッシング村の最大の特徴は、3つのコースから選択できる柔軟な料金システムです。特にAコースは全国的に珍しい「リリース専用コース」で、環境保護を重視する釣り人に人気があります。\n＜基本料金＞\nコース名 時間制限 大人（高校生以上） 小人（小中学生） 魚の持ち帰り条件 Aコース 2時間未満 2,000円 1,500円 リリース専用（買取のみ可） Bコース 4時間未満 5,000円 4,000円 平日：各魚種1尾無料 土日祝：マダイ1尾無料 Cコース 8時間未満 8,500円 5,000円 平日：各魚種2尾無料 土日祝：マダイ2尾無料 ＜追加料金＞\n同伴者：大人600円、小人300円（竿の交代利用可能） 延長：1時間毎に大人1,000円、小人700円 ＜レンタル料金＞\n貸竿（仕掛け3本セット）：700円 撒き餌・付け餌：320円から タモ・スカリ：無料 特筆すべきは、B・Cコースでは30cm以下の小鯛が曜日関係なく持ち帰り放題という点です。また、釣った魚を買い取らずにリリースできるシステムは、全国的にも極めて珍しい取り組みです。\n注意事項と補足データ \u0026nbsp; ジャンボフィッシング村は予約不要で利用できる数少ない海上釣り堀の一つです。ただし、5名以上の団体で利用する場合は前日までに予約することで最大20%の割引が適用されます。\n釣り方の制限事項\nルアー・サビキ・カゴ釣り・ダンゴ釣り・ブラクリ・ジグヘッド・疑似餌・枝針・天秤などの仕掛けは全て禁止 竿は4m以内が推奨 リリースする魚は必ずタモですくい、素手で触らないこと 活け〆サービスが無料で提供されるため、持ち帰る魚の鮮度管理も安心です。初めて利用する方は、公式サイトの「初めての方向けガイド」を事前に確認することを強くおすすめします。\nジャンボフィッシング村のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 釣り場環境と特徴 \u0026nbsp; ジャンボフィッシング村の最大の特徴は、リリース可能なシステムにあります。これにより、魚にストレスを与えない釣り方が求められ、通常の海上釣り堀よりも繊細なアプローチが必要です。施設では魚の取り扱いについて詳細なガイドラインを設けており、環境保護への意識が高い施設として運営されています。\nおすすめの仕掛けとタックル \u0026nbsp; 禁止される仕掛けが多いため、シンプルなウキ釣り仕掛けが基本となります。レンタル竿には仕掛け3本がセットされているため、初心者にはレンタル利用をおすすめします。\nマダイ・シマアジ向けタックル\nロッド：3.5～4m程度の海上釣り堀竿 リール：2500番台のスピニングリール 道糸：ナイロン3～4号 ハリス：フロロカーボン2～3号 針：チヌ針2～4号 ウキ：棒ウキ3～5号 エサ：オキアミ、アミエビ ヒラマサ・ブリ向けタックル\nロッド：3.5～4m程度の海上釣り堀竿 リール：3000番台のスピニングリール 道糸：ナイロン4～5号 ハリス：フロロカーボン4～5号 針：チヌ針4～6号 ウキ：棒ウキ5～8号 エサ：アミエビ、オキアミ ヒラメ・シーバス向けタックル\nロッド：3～3.5m程度の海上釣り堀竿 リール：2500番台のスピニングリール 道糸：ナイロン3～4号 ハリス：フロロカーボン3～4号 針：ヒラメ針12～15号 エサ：アミエビ、イワシの切り身 釣りのコツとポイント \u0026nbsp; リリース前提の釣り方が重要なポイントです。魚を傷つけないよう、必ずタモを使用し、素手で触らないことが絶対条件です。ランディング後は速やかにタオルや軍手を使って針を外し、丁寧にリリースしましょう。\nAコースを利用する場合は、釣り上げた魚の写真撮影を楽しんだ後、すぐにリリースするスタイルが基本です。B・Cコースでは規定数内の魚のみ持ち帰り、それ以外はリリースするか買取となります。\n時間コースが分かれているため、事前に釣行プランを立てることが重要です。短時間で楽しみたいならAコース、じっくり釣りたいならCコースというように、目的に応じた選択をしましょう。\nジャンボフィッシング村へのおすすめアクセス情報 \u0026nbsp; 車でのアクセス｜おすすめ！ \u0026nbsp; ジャンボフィッシング村へは車でのアクセスが最も便利です。西九州自動車道「佐世保大塔IC」から約20分、または「佐々IC」から約15分でアクセス可能です。\n主要都市からの所要時間\n佐世保市街：約30分 長崎市街：約1時間30分 福岡市街：約1時間45分 公共交通機関でのアクセス \u0026nbsp; 最寄り駅はMR松浦鉄道「鹿町駅」ですが、駅から施設まで約2kmあるため、タクシーまたは徒歩でのアクセスとなります。鹿町駅までは佐世保駅から松浦鉄道で約30分です。\n予約不要の施設のため、公共交通機関を利用した当日の思い立ち釣行も可能ですが、早朝8:00の営業開始に合わせる場合は前日宿泊をおすすめします。\n近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 【最安】予算を抑えたい方向け\nビジネスホテル・民宿：4,000円～6,000円程度 例：佐世保市内のビジネスホテル各種 【平均】標準的な宿泊施設\nシティホテル：7,000円～11,000円程度 例：佐世保ワシントンホテル、ホテルオークラJRハウステンボス 【高くてもいい】快適さを重視する方向け\nリゾートホテル：12,000円以上 例：ハウステンボス周辺のリゾートホテル レンタカー 佐世保駅周辺のレンタカー会社：\nトヨタレンタカー佐世保駅前店 ニッポンレンタカー佐世保営業所 オリックスレンタカー佐世保駅前店 料金は1日あたり4,000円～7,000円程度です。運転免許証の持参をお忘れなく。\n実際に利用したユーザーの声を抜粋 \u0026nbsp; 40代男性「★★★★★｜5.0」 \u0026nbsp; 釣った魚をリリースできるシステムが素晴らしい。環境への配慮が感じられ、安心して釣りを楽しめます。コース選択制も予算に合わせて利用できるので便利です。\n30代女性「★★★★☆｜4.0」 \u0026nbsp; 予約不要で気軽に立ち寄れるのが魅力的。子供と一緒でも安心して利用できました。タモとスカリが無料レンタルなのも助かります。\n50代男性「★★★★★｜5.0」 \u0026nbsp; 全国でも珍しいリリース可能な釣り堀で、魚への優しさが感じられます。活け〆サービスも無料で、持ち帰る魚の処理も安心です。団体割引も利用させていただき、コスパも良好でした。\n20代男性「★★★★☆｜4.0」 \u0026nbsp; Aコースでリリース専用の釣りを楽しみました。2,000円という手頃な料金で、写真撮影を楽しんだ後にリリースするスタイルが新鮮でした。\n60代男性「★★★☆☆｜3.0」 \u0026nbsp; 仕掛けの制限が多く、慣れるまで少し戸惑いました。しかし、環境保護の観点から見ると意義のある取り組みだと思います。スタッフの説明も丁寧で、初心者には親切な施設です。\n多くの利用者から、リリース可能なシステムと環境保護への取り組みについて高い評価を得ています。予約不要の利便性も好評で、特に家族連れや初心者にとって利用しやすい施設として認知されています。\n【まとめ】ジャンボフィッシング村をおすすめしたい理由 \u0026nbsp; 施設の魅力と特徴 \u0026nbsp; ジャンボフィッシング村の最大の魅力は、全国でも極めて珍しいリリース可能な海上釣り堀という点です。環境保護への配慮と釣り文化の継承を両立させた先進的な取り組みが、多くの釣りファンから支持を集めています。\n3つのコース選択制により、予算と時間に応じた柔軟な利用が可能で、特にAコースの「リリース専用プラン」は、写真撮影を楽しんだ後に魚を自然に返すという新しい釣りスタイルを提案しています。予約不要で気軽に立ち寄れる利便性も、他の海上釣り堀にはない大きな特徴です。\n最適な利用シーン \u0026nbsp; 佐世保市から30分というアクセスの良さから、地元の釣りファンの日常的な釣り場として利用されています。また、予約不要という特性を活かし、観光途中の思い立ち釣行や、天候を見ながらの当日決行にも最適です。\n5名以上の団体割引（最大20%）により、企業研修や家族旅行、釣りサークルの活動にも適しており、環境教育の一環としても価値の高い施設です。ハウステンボスなど佐世保観光と組み合わせた旅行プランにも組み込みやすい立地条件も魅力的です。\n注意点とアドバイス \u0026nbsp; リリース前提の釣り方のため、魚の取り扱いに関する事前学習が重要です。公式サイトの「初めての方向けガイド」を必ず確認し、タオルや軍手の準備をおすすめします。\n仕掛けの制限が多いため、ルアーフィッシングやサビキ釣りを楽しみたい方には不向きです。シンプルなウキ釣り専門の施設として理解した上で利用することが重要です。\nまた、コースによって持ち帰り条件が大きく異なるため、事前に利用目的を明確にしてコース選択することをおすすめします。\nおすすめ度★★★★☆ \u0026nbsp; ジャンボフィッシング村は、環境保護を重視する現代的な釣りスタイルを提案する革新的な海上釣り堀として、高く評価できる施設です。リリース可能なシステムは全国的にも珍しく、持続可能な釣り文化の発展に寄与する貴重な取り組みです。予約不要の利便性と柔軟な料金システムにより、幅広い利用者層に対応できる優れた施設として、長崎県の海上釣り堀界をリードする存在です。"
      })
      .add(
      
      
      
      
      
      {
        id: 104,
        href: "/mie/fishing-park-triton/",
        title: "フィッシングパークトリトン",
        description: "三重県鳥羽市に位置する「フィッシングパークトリトン」は、伊勢志摩の美しい海に囲まれた人気の海上釣り堀です。",
        
        
        content: "三重県鳥羽市に位置する「フィッシングパークトリトン」は、伊勢志摩の美しい海に囲まれた人気の海上釣り堀です。\nワラサ、カンパチ、マダイなど高級魚から、メジナ、クロダイまで多彩な魚種が狙える贅沢な釣り場として知られています。2匹釣りコースから釣り放題の貸切プランまで、様々なニーズに応じたコース設定が魅力で、釣果に自信があるからこそ実現している「2匹補償」のシステムも嬉しいポイントです。釣った魚をその場で海上バーベキューで楽しめるレンタルサービスも充実しており、釣りの醍醐味と新鮮な魚の味わいを同時に体験できる素晴らしいロケーションです。\n伊勢志摩観光の合間に立ち寄るのにも最適で、手ぶらでも本格的な海釣り体験ができる施設として、初心者から上級者まで幅広い釣り愛好家に支持されています。\nフィッシングパークトリトンの基本情報 \u0026nbsp; 場所: 〒517-0034 三重県鳥羽市千賀町183 営業時間: 8:00～14:00 定休日: 渡船できない荒天の場合は休業 平均予算: 2匹釣りコース4,000円（2匹補償、以降は1匹1,800円） レンタル: 貸竿1,500円、エサ300円から、タモあり 釣具の持ち込み: 竿、エサの持ち込み可能（※2匹釣りコースは持ち込み料として500円徴収） 釣れる魚: ワラサ、カンパチ、マダイ、イサキ、マハタ、ヒラメ、スズキ、メジナ、イシダイ、シマアジ、クロダイ、クロソイ（他：大タイ、大ハタ） 注意事項: 2名以上から予約 ウェブサイト: 三重でレジャーならフィッシングパークトリトン | 初心者でも安全な海釣り体験 料金体系について \u0026nbsp; フィッシングパークトリトンでは、一般利用の「2匹釣りコース」と贅沢に楽しめる「釣り放題貸切コース」の2種類のプランが用意されています。\n2匹釣りコース:\n基本料金: 4,000円 特典: 2匹補償（釣れなかった場合はマダイ2匹を保証） 追加料金: 2匹以降は1匹につき1,800円 持ち込み料: 竿やエサを持ち込む場合は500円 釣り放題貸切コース:\n人数 平日 土・日・祝＋大型連休等 12/29～1/3まで 1人～2人 40,000円(税別) 68,000円(税別) 72,000円(税別) 3人～4人 60,000円(税別) 68,000円(税別) 72,000円(税別) 5人 70,000円(税別) 80,000円(税別) 85,000円(税別) 6人 78,000円(税別) 90,000円(税別) 96,000円(税別) 7人以上 84,000円(税別) 98,000円(税別) 105,000円(税別) 貸切コースは、人数や利用日によって料金が異なります。特に平日の1〜2人利用と土日祝の3〜4人利用を比較すると、土日祝の方がコストパフォーマンスが良くなるため、人数に合わせて最適な日程を選ぶとよいでしょう。\n注意事項と補足データ \u0026nbsp; 予約は2名以上から 海上BBQを楽しむための練炭コンロをレンタルすることができ、釣った魚をその場で調理して味わうことができます 荒天時は安全のため営業を休止する場合があります 釣具のレンタルが充実しているため、手ぶらでの訪問でも十分に釣りを楽しむことができます 筏上は屋根がない場所もあるので、暑さ対策や日焼け対策のグッズを持参すると快適に過ごせます 釣った魚は持ち帰ることができます。クーラーボックスの準備もおすすめです 宿泊施設を探す場合は、志摩市と鳥羽市のどちらかを選ぶとよいでしょう（観光重視なら志摩市、リーズナブルさ重視なら鳥羽市） フィッシングパークトリトンのおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; フィッシングパークトリトンでは多彩な魚種が釣れます。ここでは、主な魚種3種類についてのおすすめ仕掛けと釣りのコツをご紹介します。\nマダイ・イサキを狙う場合 \u0026nbsp; マダイとイサキは「フィッシングパークトリトン」の代表的な魚種です。\n推奨タックル（レンタル利用の場合）：\n竿：施設でレンタルできる貸竿（1,500円） エサ：施設で購入できるエサ（300円〜） 持ち込みの場合の推奨タックル：\n竿：7:3調子の磯竿（2.7m〜3.6m） リール：3000〜4000番クラスのスピニングリール 道糸：3号〜4号のナイロンライン ハリス：2号〜3号のフロロカーボン 針：マダイ針8号〜10号、イサキ針10号〜12号 釣り方のコツ：\nマダイは底付近、イサキは中層を狙うと効果的です オキアミやアオイソメなどのエサが有効です マダイは朝夕の時間帯、イサキは日中に活性が高まる傾向があります アタリがあったら少し間を置いてから合わせると掛かりやすくなります 竿を立てすぎず、適度に弾力を持たせるようにしましょう 施設のスタッフから当日の釣れ筋について情報を得るのも有効です ワラサ・カンパチを狙う場合 \u0026nbsp; ワラサやカンパチは引きの強さが特徴の青物高級魚です。\n推奨タックル：\n竿：パワーのある磯竿または船竿（3.0m〜3.6m） リール：4000〜5000番クラスのパワーのあるスピニングリール 道糸：5号〜8号のナイロンラインまたはPEライン2号程度 ハリス：5号〜8号のフロロカーボン 針：丸セイゴ8号〜12号 釣り方のコツ：\n活きエサ（アジやイワシなど）や大きめのオキアミが効果的です ドラグ調整を適切に行い、急激な引きに対応できるようにします 中層から表層を狙うとよいでしょう 魚が掛かったら周囲の釣り人に声をかけ、譲り合いながら魚を取り込みます 特に大型の個体は強烈な引きがあるため、慌てずに対応することが重要です 魚をバラさないよう、リールのドラグ機能をうまく使いましょう メジナ・クロダイを狙う場合 \u0026nbsp; メジナやクロダイは年間を通して釣れる人気の魚種です。\n推奨タックル：\n竿：7:3調子の磯竿（2.7m〜3.6m） リール：3000〜4000番クラスのスピニングリール 道糸：3号〜4号のナイロンライン ハリス：2号〜3号のフロロカーボン 針：クロダイ針7号〜10号 釣り方のコツ：\nオキアミやアオイソメ、練り餌などが効果的です 底付近から中層を狙うとよいでしょう 特に満潮から下げ潮に変わる時間帯が狙い目です クロダイは警戒心が強いため、目立たないように静かに釣りをすることが重要です メジナは群れで行動することが多いので、一度釣れると連続して釣れることもあります 朝夕の時間帯は特に活性が高くなる傾向があります 公共交通機関でのアクセス \u0026nbsp; 電車と路線バスでのアクセスも可能です。\nルート案内：\nJR・近鉄「鳥羽駅」で下車 路線バスまたはタクシーで「千賀」バス停下車 バス停から徒歩約10分 ただし、釣り道具や荷物が多い場合は、駅からタクシーを利用するとスムーズです。タクシーで約15分、料金は約2,500円程度です。\n釣り堀の特性を考慮したアクセスプラン \u0026nbsp; フィッシングパークトリトンは8:00から14:00までの営業時間となっているため、早めの行動が必要です。\n日帰りプラン：\n朝7:00頃に施設に到着し、受付を済ませてから釣りを開始 昼食は釣った魚を海上BBQで楽しむ 午後は近隣の観光スポットを巡る 宿泊プラン：\n前日に鳥羽市または志摩市の宿泊施設に泊まる 朝食後、フィッシングパークトリトンで釣りを楽しむ 釣った魚は持ち帰るか、海上BBQで味わう 午後は伊勢志摩の観光を楽しむ 特に遠方からの場合は、前泊して余裕を持ったスケジュールを組むことをおすすめします。\n近隣の観光スポットやグルメ情報 \u0026nbsp; フィッシングパークトリトン周辺には、釣りの合間に立ち寄れる観光スポットやグルメスポットがあります。\n観光スポット：\nミキモト真珠島（車で約10分）：真珠養殖の発祥地で、海女の実演も見られます 鳥羽水族館（車で約15分）：日本最大級の水族館で多彩な海洋生物を観察できます 伊勢神宮（車で約30分）：日本を代表する神社で、内宮と外宮があります グルメスポット：\n鳥羽一番街（車で約10分）：海鮮料理や伊勢志摩グルメが集まる商業施設 鳥羽マルシェ（車で約10分）：新鮮な海産物や地元の特産品が並ぶ市場 志摩の恵みを活かした海鮮料理店が多数点在しています 近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 宿泊施設：\n【高級】志摩観光ホテル（志摩市・一泊20,000円〜）：豪華なリゾートホテルで観光に便利 【平均】鳥羽シーサイドホテル（鳥羽市・一泊12,000円〜）：海の見える温泉ホテル 【リーズナブル】民宿 海の家（鳥羽市・一泊8,000円〜）：アットホームな雰囲気の民宿 レンタカー：\nJR・近鉄「鳥羽駅」前にレンタカー各社の営業所があります 日産レンタカー鳥羽駅前店（コンパクトカー6,000円/日〜） トヨタレンタカー鳥羽駅前店（コンパクトカー6,500円/日〜） 釣った魚を持ち帰る場合はクーラーボックスの収納スペースも必要になるため、やや大きめの車を選ぶことをおすすめします。\n実際に利用したユーザーの声を抜粋 \u0026nbsp; （40代男性）★★★★★｜5.0 \u0026nbsp; 「2匹釣りコースで利用しましたが、マダイとイサキが釣れて大満足でした。2匹補償のシステムがあるので、初心者でも安心して利用できます。スタッフの方々も親切で、釣りのコツを丁寧に教えてくれました。」\n（30代女性）★★★★★｜5.0 \u0026nbsp; 「家族4人で貸切コースを利用しました。土日でしたが、1人あたり17,000円程度で高級魚の釣り放題が楽しめて、コスパが良かったです。子供たちもワラサが釣れて大興奮！釣った魚を海上BBQで食べられるのも最高の体験でした。」\n（50代男性）★★★★★｜5.0 \u0026nbsp; 「仲間5人で平日の貸切プランを利用。70,000円でしたが、マダイやカンパチなどが釣れまくり、1人あたり14,000円と考えるとかなりお得でした。伊勢志摩の景色を眺めながらの釣りは格別です。また必ず利用したいと思います。」\n（20代女性）★★★★★5.0 \u0026nbsp; 「初めての海釣りでしたが、レンタル道具を借りて手ぶらで楽しむことができました。思ったよりも魚が釣れて驚きました。スタッフの方のアドバイスのおかげで、釣りの基本も学べました。伊勢神宮参拝と組み合わせた1泊2日の旅行でしたが、良い思い出になりました。」\n【まとめ】フィッシングパークトリトンをおすすめしたい度 \u0026nbsp; フィッシングパークトリトンは、伊勢志摩の美しい自然に囲まれた海上釣り堀として、特に以下のような方におすすめできる施設です：\n初心者でも安心して海釣りを楽しみたい方（2匹補償のシステムあり） グループや家族で貸切プランを検討している方 伊勢志摩観光と合わせて釣りも楽しみたい旅行者 釣った魚をその場で味わいたい方（海上BBQ可能） 高級魚を狙いたい釣り愛好家 2匹釣りコースの4,000円という料金設定は、ボウズ補償もあるので非常にリーズナブル。グループでの利用なら貸切コースがおすすめで、特に土日祝の3〜4人利用（1人あたり約17,000円）は、高級魚が釣り放題だと考えるなら十分にコストパフォーマンスが良いと言えるでしょう。\n釣具のレンタルやエサの購入も施設内で可能なため、手ぶらでの訪問でも安心です。釣った魚をその場で海上BBQで楽しめる点も大きな魅力で、釣りの醍醐味と新鮮な魚の味わいを同時に体験できます。\n荒天時は営業を休止する場合があるため、訪問前に天候の確認は必須です。また、2名以上からの予約となるため、1人での利用はできない点に注意が必要です。\n伊勢志摩観光と組み合わせた釣行がおすすめ \u0026nbsp; フィッシングパークトリトンは、三重県の海の恵みを存分に体験できる素晴らしい釣り場として、非日常的なリラクゼーションと釣りの興奮を求める方に高くおすすめします。\n伊勢志摩観光の合間に立ち寄るのにも最適で、釣りと観光を組み合わせた旅行プランが立てやすい立地も魅力です。宿泊施設を探すなら、観光重視なら志摩市、リーズナブルさ重視なら鳥羽市がおすすめです。"
      })
      .add(
      
      
      
      
      
      {
        id: 105,
        href: "/yamaguchi/fishing-park-hikari/",
        title: "フィッシングパーク光",
        description: "山口県光市にある「フィッシングパーク光」は、初心者からファミリーまで幅広い層に人気の海釣り施設です。",
        
        
        content: "山口県光市にある「フィッシングパーク光」は、初心者からファミリーまで幅広い層に人気の海釣り施設です。\n金網で覆われた安全な桟橋で、クロダイやシーバス、アジなど四季折々の様々な魚種を狙えます。特に注目すべきはそのリーズナブルな料金設定と充実したレンタル釣具。手ぶらで訪れても気軽に釣りを楽しめる環境が整っており、釣り初心者のファーストステップとして最適です。\nバリアフリー対応も行われているため、お年寄りや障がいをお持ちの方にも優しい、地域に開かれた釣り公園となっています。\nフィッシングパーク光の基本情報 \u0026nbsp; 場所: 〒743-0007 山口県光市室積6丁目17-1 営業時間: 4・9・10月: 6:00～21:00 5～8月: 5:00～21:00 11・3月: 6:00～20:00 12～2月: 7:00～17:00 定休日: 毎週水曜日（祝日は営業）、年末年始（12/30～1/2） 平均予算: 700円～1,500円程度（釣り料+レンタル料） レンタル: 貸竿600円、仕掛け・エサの販売あり 釣具の持ち込み: 可能（釣り竿は1人2本まで）、ルアー釣り禁止 釣れる魚: クロダイ、シーバス、イシダイ、カワハギ、アジ、カレイ、サバ、ブリ（ハマチ）、メバル、アイナメ、マゴチ、カサゴなど 注意事項: 桟橋は金網なのでレジャーシートや座布団クッションがあると便利、障害者手帳提示で割引あり ウェブサイト: フィッシングパーク光公式サイト 料金体系について \u0026nbsp; フィッシングパーク光は、利用時間に応じた柔軟な料金体系を採用しており、リーズナブルに釣りを楽しめます：\n基本釣り料金（入園+4時間）: 大人（16歳以上）: 690円 子供（6歳以上16歳未満）: 410円 閉園2時間前釣り料金: 大人: 400円 子供: 240円 延長釣り料金（1時間ごと）: 大人: 230円 子供: 110円 入園料のみ: 大人: 230円 子供: 110円 釣った魚は持ち帰りが可能です。氷の販売はありますが、発泡スチロールなど容器を扱っているかは不透明なので、クーラーボックスは持参するのがベストでしょう。障害者手帳をお持ちの方は割引があるので、受付時に提示しましょう。\n注意事項と補足データ \u0026nbsp; フィッシングパーク光は安全面に配慮した施設となっています。桟橋は金網で、際には柵があるため、小さなお子様でも安心して釣りを楽しめます。快適に過ごすためには、レジャーシートや座布団クッションを持参することをおすすめします。金網の上で長時間過ごすときの負担を軽減できるほか、小物の落下防止にもなります。\n釣り竿の使用は1人2本までに制限されており、ルアー釣りは禁止されています。レンタル釣具と販売エサはサビキ釣りがメインとなるため、サビキ釣り以外の釣り方を楽しみたい場合は、釣具や仕掛けを自分で用意する必要があります。\n公営の施設であるため、トイレやベンチなどの基本的な設備が整っており、長時間の滞在も快適に過ごせます。\nフィッシングパーク光のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; レンタル釣具ではサビキ釣りが主体になるので、おすすめのシーズンは夏から秋にかけてです。\nサビキ釣りでアジ・サバを狙う \u0026nbsp; 初心者にも手軽なサビキ釣りは、フィッシングパーク光で最も一般的な釣り方です。\n仕掛け: レンタル竿とサビキ仕掛けを利用できます。施設で販売もしています。 エサ: サビキ用のコマセを適量使います。施設で購入可能です。 釣り方: コマセをまいて魚を寄せ、サビキ仕掛けを上下に動かします。 狙える魚: アジが中心で、時期によってはサバなども釣れます。 季節: 春から秋にかけてが盛期ですが、特に夏場は活性が高まります。 クロダイ（チヌ）の釣り方 \u0026nbsp; クロダイは年間を通して人気のターゲットです。\n仕掛け: 胴付き仕掛けが基本です。施設では仕掛けの販売もあります。 エサ: オキアミや練りエサが効果的です。 釣りのコツ: 底付近にエサを落とし、アタリがあったらゆっくりと合わせます。 時期: 暖かい季節に活性が高まりますが、年間を通して釣ることができます。 季節の回遊魚（ブリ・サバなど）を狙う \u0026nbsp; 季節によっては回遊魚も釣れるチャンスがあります。\n仕掛け: 胴付き仕掛けや投げ釣り仕掛け（投げ釣り自体は禁止）を使用します。 エサ: イワシやサンマの切り身などが効果的です。 釣りのポイント: 外海に面した桟橋側を狙うと良いでしょう。 季節: ブリ（ハマチ）は秋から冬、サバは夏から秋にかけてがチャンスです。 大型を狙うなら、水温の変化に伴い移動するため、春と秋が狙い目です。夏は小型になるものの回遊に期待できます。\nメバル・カサゴを夕方から夜に狙う \u0026nbsp; 夕方から夜にかけては根魚の活性が高まります。\n仕掛け: 胴付き仕掛けで底付近を狙います。 エサ: イソメやオキアミが効果的です。 時間帯: 日没前後から夜にかけてが最適です。夏は営業時間が21時までなので、日没後の釣りも楽しめます。 場所: 桟橋の足元や岩場の近くを狙うと良いでしょう。 初心者の方には、まずはレンタル竿でサビキ釣りからスタートすることをおすすめします。ある程度慣れてきたら、自前の釣具を持参して様々な釣り方にチャレンジしてみましょう。\nフィッシングパーク光へのおすすめアクセス情報 \u0026nbsp; 施設は路線から離れているため、車での移動がベストです。山陽自動車道を利用することで、広島方面からもスムーズにたどり着けます。\n車でのアクセス \u0026nbsp; 車でのアクセスが最も便利です。\n山陽自動車道から: 熊毛ICで降り、国道188号線を光市方面へ約15分 光市街から: 国道188号線を室積方面へ約10分 駐車場: 無料駐車場完備 もし現地で釣具を用意するのなら、光市に数店舗あります。ついでに食料や飲料水も確保しておきましょう。\n公共交通機関でのアクセス \u0026nbsp; 公共交通機関でも訪れることができます。\nJR光駅から: 防長バス「室積」行きで約20分、「室積港」バス停下車、徒歩約5分 タクシーを利用する場合は約15分（約2,000円程度） 路線バスで施設まで徒歩すぐの距離に移動できるので、手ぶらの旅行客でも立ち寄りやすい場所です。\n季節ごとのおすすめ訪問時間 \u0026nbsp; 季節によって釣れる魚種や最適な釣り時間が異なります：\n春（3月～5月）: 徐々に暖かくなり魚の活性も上がる時期。朝6時頃～昼過ぎが狙い目。 夏（6月～8月）: 早朝5時からの営業を活かし、涼しい朝の時間帯か、夕方以降に訪れるのがおすすめ。 秋（9月～11月）: 最も釣果が期待できる時期。午前中から夕方にかけてがベスト。 冬（12月～2月）: 営業時間が短い時期。日中の暖かい時間帯が快適に釣りを楽しめます。 釣りやすさでいえば早朝の時間帯がおすすめですが、交通機関利用ではちょっと難しいですね。その場合は、前日にレンタカーを手配してホテルに宿泊し、翌朝出発がおすすめです。\n近隣の施設や観光スポット \u0026nbsp; フィッシングパーク光の周辺には、釣りの前後に立ち寄れる施設があります：\n室積海水浴場: 夏季には海水浴も楽しめる、白砂のビーチ（徒歩5分） 室積灯台: 景色の良い灯台（徒歩約15分） 道の駅 潮風公園: 地元の特産品や食事が楽しめる（車で約5分） 夏は海水浴場が近くあるので混み合いやすいですが、家族で行く場合、目的に応じたアクティビティを楽しめる利点があります。\n近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 宿泊施設 \u0026nbsp; 【最安】ビジネスホテル光ステーション: JR光駅近くのリーズナブルなホテル。一泊5,500円～ 【平均】光ステーションホテル: 駅前で利便性が高いホテル。一泊7,500円～ 【高級】周南京都ホテル: 周南市内の高級ホテル。一泊12,000円～（車で約30分） レンタカー \u0026nbsp; JR光駅や周辺の大きな駅（徳山駅など）にはレンタカー会社があります。釣具や荷物を持ち運ぶならレンタカーが便利です。光市内には釣具店もあるので、当日朝から移動しても間に合います。\n実際に利用したユーザーの声を抜粋 \u0026nbsp; 「初めて子供と釣りをしましたが、レンタル竿もあるし、料金も安いので気軽に楽しめました。アジが10匹くらい釣れて大満足でした。」（30代男性）\n「金網の桟橋なので安全に釣りができます。高齢の父と一緒に行きましたが、バリアフリー対応もされていて助かりました。クロダイも釣れて良い思い出になりました。」（40代女性）\n「料金がとても良心的で、長時間楽しめるのが魅力です。夏は夜9時まで営業しているので、夕マズメ時も釣りができるのがいいですね。メバルやカサゴも釣れました。」（50代男性）\n「家族連れにはおすすめの施設です。子供料金もリーズナブルだし、トイレもきれいで安心して長時間過ごせます。レジャーシートを持っていくと快適に釣りができますよ。」（40代女性）\n家族連れの利用で高評価を得ていることから、初めての釣りを体験するに適している施設だとわかります。海釣り施設はトイレや水場が管理されているので、女性にも訪れやすいことが強みです。\n【まとめ】フィッシングパーク光をおすすめしたい度 ★★★★☆ \u0026nbsp; フィッシングパーク光は、初心者やファミリーから釣り愛好家まで幅広い層におすすめできる海釣り施設です。特に以下の点が大きな魅力となっています：\nリーズナブルな料金設定: 基本料金が大人690円、子供410円と非常に手頃で、家族でも気軽に楽しめます。 安全性: 金網で覆われた桟橋で、小さなお子様や高齢者も安心して釣りを楽しめます。 充実したレンタル・販売: レンタル竿や釣り仕掛け、エサの販売があるため、手ぶらでも訪れることができます。 バリアフリー対応: 障がい者割引もあり、誰もが利用しやすい環境が整っています。 長時間営業: 特に夏季は朝5時から夜9時までと長時間営業しているため、早朝や夕方以降の釣りも楽しめます。 唯一の難点としては、レンタル釣具がサビキ釣り向けが中心なため、サビキ釣り以外を楽しみたい場合は自前の釣具を持参する必要がある点です。ただ、この点を差し引いても、気軽に海釣りを体験できる施設として非常に優れています。\n一年を通して様々な魚種が釣れるため、季節ごとに訪れても新たな発見や楽しみがあります。特に釣り初心者や子供連れのファミリー、リーズナブルに釣りを楽しみたい方におすすめのスポットです。"
      })
      .add(
      
      
      
      
      
      {
        id: 106,
        href: "/saga/kariyawan-fishing-center/",
        title: "仮屋湾遊漁センター",
        description: "仮屋湾遊漁センターは、佐賀県東松浦郡玄海町にある海上釣り堀施設で、天然魚と養殖魚の両方が楽しめる珍しい施設です。A～Dまでの4つのコースから予算と目的に応じて選択でき、2時間3,000円から本格的な海上釣り堀体験が可能です。",
        
        
        content: "仮屋湾遊漁センターは、佐賀県東松浦郡玄海町にある海上釣り堀施設で、天然魚と養殖魚の両方が楽しめる珍しい施設です。A～Dまでの4つのコースから予算と目的に応じて選択でき、2時間3,000円から本格的な海上釣り堀体験が可能です。\n玄界灘に面した豊かな海域で、マダイ、ブリ、シマアジなどの高級魚が狙え、唐津からのアクセスも良好な佐賀県屈指の海上釣り堀です。\n仮屋湾遊漁センターの基本情報 \u0026nbsp; 場所：〒847-1416 佐賀県東松浦郡玄海町新田1825-2 営業時間：7:00～16:00 定休日：木曜日（祝日の場合営業）、1/1～2は定休日 平均予算：Aコース2時間3,000円～Cコース終日10,000円 レンタル：貸竿500円、エサ500円から 釣具の持ち込み：可能（竿は3m以内、1人1本まで） 釣れる魚：マダイ・ブリ・イサキ・シマアジ・アジ・ヒラメ・ヒラマサ 注意事項：サビキ・ルアー・カゴ釣り・疑似餌・エダ針の使用禁止、撒き餌はオキアミのみ可能 ウェブサイト： 仮屋湾遊漁センター 料金体系について \u0026nbsp; 仮屋湾遊漁センターは、A～Dの4つのコースシステムを採用しており、予算と釣りたい魚種に応じて選択できる柔軟な料金設定が特徴です。\n＜釣堀コース料金表＞\nコース 時間 大人 高校生以下 持ち帰れる魚 Aコース 2時間 3,000円 2,000円 鯛・青物以外 Aコース 4時間 4,000円 3,000円 鯛・青物以外 Bコース 2時間 5,000円 4,000円 鯛・青物どちらか1匹 Bコース 4時間 6,000円 5,000円 鯛・青物どちらか1匹 Cコース 終日 10,000円 9,000円 鯛・青物どちらか2匹 Dコース 終日 7,000円 6,000円 鯛・青物以外は持ち帰り ＜その他のサービス＞\n筏渡し：大人3,000円、高校生以下2,000円（10人乗り筏4台） 定置網貸切：70,000円（要予約） この料金システムにより、初心者は手頃なAコースから始めて、経験を積んだら大物狙いのBやCコースにステップアップすることができます。\n注意事項と補足データ \u0026nbsp; 仮屋湾遊漁センターでは、釣り方に一定の制限があります。サビキ・ルアー・カゴ釣り・疑似餌・エダ針の使用は禁止されており、撒き餌はオキアミのみ可能となっています。\nB・Cコースで鯛・青物が釣れなかった場合の補償として、マダイが提供されるシステムがあります。また、竿は1人1本までの制限があり、3m以内の長さに制限されています。\n天然魚と養殖魚の釣堀エリアが分かれているため、より自然な釣り体験を求める方は天然魚エリアを選択することもできます。\n仮屋湾遊漁センターのおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 釣り場環境と特徴 \u0026nbsp; 仮屋湾遊漁センターは玄界灘に面した玄海町に位置し、潮通しの良い豊かな海域に設置されています。天然魚エリアと養殖魚エリアに分かれており、それぞれ異なる釣り体験が楽しめます。\n養殖魚エリアでは放流魚が中心となるため比較的釣りやすく、天然魚エリアでは野生の魚との真剣勝負が楽しめます。\nおすすめの仕掛けとタックル \u0026nbsp; 制限がある中でも効果的な釣り方をご紹介します。\nウキ釣り（マダイ・ブリ狙い）\nロッド：2.7～3mのウキ釣り専用竿 リール：2500～3000番のスピニングリール ライン：フロロカーボン3～4号 仕掛け：ウキ釣り仕掛け（ハリス2.5～3号、針はマダイ針8～10号） エサ：オキアミ、練り餌 胴付き仕掛け（底物狙い）\nロッド：2.7～3mの船竿 リール：2500番のスピニングリール ライン：ナイロン4～5号 仕掛け：胴付き仕掛け2本針 エサ：オキアミ、イソメ 泳がせ釣り（大型青物狙い）\nロッド：3mの強めの竿 リール：3000番のスピニングリール ライン：PE2～3号 仕掛け：泳がせ仕掛け（ハリス5号、針は丸セイゴ針12～15号） エサ：活きアジ（現地で調達可能） コース別攻略法 \u0026nbsp; Aコース（初心者向け） イサキ、アジ、小型のヒラメなどが対象。ウキ釣りで手軽に数釣りが楽しめます。\nB・Cコース（中級者向け） マダイや青物の1～2匹確保が目標。活きエサを使った泳がせ釣りや、大きなオキアミでの誘いが効果的です。\nDコース（数釣り重視） 鯛・青物以外は持ち帰り放題なので、イサキやアジの数釣りを楽しむコースです。\n仮屋湾遊漁センターへのアクセス情報 \u0026nbsp; 車でのアクセス｜おすすめ！ \u0026nbsp; 佐賀県内から\nJR唐津駅から約25分 佐賀市から約1時間 長崎自動車道「多久IC」から約45分 九州各地から\n福岡市から：約1時間30分 長崎市から：約1時間45分 熊本市から：約2時間30分 公共交通機関でのアクセス \u0026nbsp; 電車・バス利用\nJR唐津線「唐津駅」からタクシー約25分（約4,000円） JR唐津線「唐津駅」から昭和バス「玄海町方面」約40分 レンタカー利用\nJR唐津駅周辺でレンタカーを借りてアクセスするのが最も便利です 近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 【最安】予算を抑えたい方向け\n民宿・ゲストハウス：6,000円～8,000円程度 例：玄海町内の民宿、唐津市内のビジネスホテル 【平均】標準的な宿泊施設\n温泉旅館・リゾートホテル：12,000円～18,000円程度 例：唐津シーサイドホテル、玄海ロイヤルホテルなど 【高くてもいい】快適さを重視する方向け\n高級リゾートホテル：20,000円以上 例：唐津の高級旅館、呼子の料亭旅館など レンタカー 唐津駅周辺のレンタカー会社\nトヨタレンタカー唐津駅前店 ニッポンレンタカー唐津駅前店 タイムズカーレンタル唐津駅前店 料金は1日あたり5,000円～8,000円程度。運転免許証は必須です。\n実際に利用したユーザーの声を抜粋 \u0026nbsp; 50代男性「★★★★★｜5.0」 \u0026nbsp; コース選択ができるのが素晴らしい。Bコースで70cmのマダイが釣れて大満足でした。玄界灘の海上釣り堀は魚の引きが強く、やりがいがあります。\n40代女性「★★★★☆｜4.0」 \u0026nbsp; 家族でAコースを利用しました。子どもでも楽しめる料金設定で、イサキがたくさん釣れて子どもたちも大喜び。スタッフの方も親切で安心でした。\n30代男性「★★★★★｜5.0」 \u0026nbsp; 天然魚エリアでの釣りは本当に面白い。養殖魚とは違った野性味のある引きが楽しめます。定置網貸切も利用したことがありますが、贅沢な体験でした。\n60代男性「★★★★☆｜4.0」 \u0026nbsp; 唐津から近いので定期的に利用しています。Dコースは数釣りができて楽しい。ただし、天候に左右されやすいので事前確認は必須です。\n20代女性「★★★☆☆｜3.0」 \u0026nbsp; 初めての海上釣り堀でAコースを選択。思ったより釣れなくて少し残念でしたが、海の上での釣り体験は新鮮でした。もう少し釣具の使用制限が緩いといいのですが。\n【まとめ】仮屋湾遊漁センターをおすすめしたい理由 \u0026nbsp; 施設の魅力と特徴 \u0026nbsp; 仮屋湾遊漁センターの最大の魅力は、A～Dの4つのコースシステムにより、予算と技術レベルに応じた釣り体験ができることです。2時間3,000円から楽しめる手軽さと、天然魚・養殖魚の両エリアを持つ多様性により、幅広いニーズに対応できる施設となっています。\n最適な利用シーン \u0026nbsp; 初心者や家族連れにはAコースが最適で、手頃な料金で海上釣り堀を体験できます。経験者や大物狙いの方にはB・Cコースがおすすめで、玄界灘の高級魚との真剣勝負が楽しめます。また、数釣りを楽しみたい方にはDコースが最適です。\n注意点とアドバイス \u0026nbsp; 釣り方に制限があるため、事前にルールを確認しておくことが重要です。天候に左右されやすい立地のため、事前に営業状況を確認してから訪問することをおすすめします。また、周辺の宿泊施設が限られているため、遠方からの場合は早めの予約が必要です。\nおすすめ度★★★★☆（4/5） \u0026nbsp; 仮屋湾遊漁センターは、柔軟な料金システムと天然魚・養殖魚の両方が楽しめる特徴により、佐賀県でも貴重な海上釣り堀施設です。特に予算を抑えて海上釣り堀を体験したい方や、段階的にレベルアップしたい方には強くおすすめできる施設といえるでしょう。"
      })
      .add(
      
      
      
      
      
      {
        id: 107,
        href: "/nagasaki/mukai-pearl-marine/",
        title: "迎パールマリン釣り紀行",
        description: "長崎県佐世保市にある迎パールマリン釣り紀行は、全国でも珍しい「移動式イカダ」による釣り体験を提供する海釣り施設です。",
        
        
        content: "長崎県佐世保市にある迎パールマリン釣り紀行は、全国でも珍しい「移動式イカダ」による釣り体験を提供する海釣り施設です。\n船で牽引されながら最適なポイントを巡る独特のスタイルで、マダイ・クエ・ヒラマサなど15種類以上の魚種が狙えます。\n貸切30名から乗り合い18名まで対応可能で、団体釣行や本格的な船釣り体験を求める上級者にも満足していただける施設として高い評価を得ています。\n迎パールマリン釣り紀行の基本情報 \u0026nbsp; 場所：〒859-6203 長崎県佐世保市鹿町町口ノ里580-2 営業時間：出港｜日の出から、帰港目安｜16:00まで 定休日：基本無休（釣り客10名以下は運行休止の可能性） 平均予算：貸切110,000円、乗り合い大人6,600円・子供5,500円 レンタル：竿リールセット1,200円、マキエサ・サシエサ・仕掛け販売有り 釣具の持ち込み：可能（船釣り仕掛け推奨・胴付き仕掛け） 釣れる魚：マダイ・クロダイ・アジ・イサキ・カサゴ・ヒラマサ・ブリ・ヒラメ・サバ・サワラ・アオリイカ・ハタ・イシダイ・クエなど 注意事項：完全予約制、乗合人数が満たないと出港中止の可能性 ウェブサイト： 迎パールマリン釣り紀行 料金体系について \u0026nbsp; 迎パールマリン釣り紀行は、貸切と乗り合いの2つのプランを提供しており、それぞれ異なる料金体系となっています。移動式イカダという特殊なサービスのため、通常の海釣り施設とは大きく異なる価格設定です。\n＜貸切プラン＞\n料金：110,000円（定員30名まで） 1名あたり：約3,667円（30名利用時） 最適利用人数：20名以上 ＜乗り合いプラン＞\n大人（中学生以上）：6,600円 子供（小学生）：5,500円 受付定員：18名まで ＜レンタル料金＞\n竿リールセット：1,200円 マキエサ・サシエサ：現地販売価格による サビキ仕掛け等：現地販売価格による 貸切プランは大人数での利用により1名あたりの料金が大幅に下がるため、企業研修や大型グループでの釣行に最適です。一方、乗り合いプランは個人や小グループでの本格的な船釣り体験として利用価値の高い設定となっています。\n注意事項と補足データ \u0026nbsp; 迎パールマリン釣り紀行は完全予約制で、特に乗り合いプランでは最低催行人数があるため、予約時に出港可否の確認が必要です。釣り客が10名以下の場合は運行休止となる可能性があるため、事前の電話確認が重要です。\n移動式イカダの特徴\n船で牽引されながらポイントを移動 固定式イカダでは到達できない好ポイントでの釣りが可能 天候や潮の状況に応じた最適なポイント選択 船酔いしやすい方は事前の対策が必要 営業時間の特殊性 出港時間は「日の出から」となっており、季節により変動します。帰港目安は16:00ですが、釣果状況や天候により前後する可能性があります。\n迎パールマリン釣り紀行のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 釣り場環境と特徴 \u0026nbsp; 迎パールマリン釣り紀行の最大の特徴は、移動式イカダによる機動力です。固定式の海上釣り堀や通常のイカダ釣りとは異なり、船で牽引されながら最適なポイントを巡ることで、その日の海況に応じた最高の釣り体験を提供します。\n15種類以上の豊富な魚種が狙えるのも、移動式ならではの特徴で、底物から青物、イカ類まで幅広いターゲットに対応できます。特にクエやイシダイなどの高級魚も射程範囲に入る点は、上級者にとって大きな魅力です。\nおすすめの仕掛けとタックル \u0026nbsp; 移動式イカダでは様々なポイントを巡るため、多様な釣り方に対応できるタックル準備が重要です。船釣り仕掛けの中でも、特に胴付き仕掛けが推奨されています。\n底物狙い（マダイ・クエ・イシダイ）向けタックル\nロッド：2～2.5m程度の船竿（80～120号負荷） リール：電動リール（PE3～5号、300m以上） 仕掛け：胴付き仕掛け（3～5本針） オモリ：80～150号（潮流により調整） 針：マダイ針10～14号、イシダイ針16～20号 エサ：オキアミ、イソメ、イカタン 青物狙い（ヒラマサ・ブリ・サワラ）向けタックル\nロッド：2～2.5m程度の船竿（60～100号負荷） リール：電動リールまたは大型スピニングリール 道糸：PE3～4号 仕掛け：胴付き仕掛け、泳がせ仕掛け 針：青物針12～16号 エサ：アジ、サバ、イワシ（泳がせ）、サビキで釣った小魚 中層狙い（アジ・イサキ・サバ）向けタックル\nロッド：2～2.5m程度のライトタックル船竿 リール：小型電動リールまたはスピニングリール 道糸：PE1～2号 仕掛け：サビキ仕掛け、胴付き仕掛け 針：サビキ針、ムツ針6～10号 エサ：アミエビ、オキアミ 釣りのコツとポイント \u0026nbsp; 移動しながらの釣りという特殊な環境では、素早い仕掛け投入と回収がポイントになります。船長の指示に従い、ポイント到着後は速やかに仕掛けを投入しましょう。\n多点攻めの戦略が有効で、1つのポイントで反応が悪ければ、次のポイントへ移動するという機動力を活かした釣り方が可能です。このため、複数の仕掛けを準備しておくことをおすすめします。\n船酔い対策は必須で、移動式イカダは通常のイカダ釣りよりも揺れる可能性があります。酔い止め薬の服用や、できるだけ船の中央部に位置取りするなどの対策を講じましょう。\n迎パールマリン釣り紀行へのおすすめアクセス情報 \u0026nbsp; 車でのアクセス｜おすすめ！ \u0026nbsp; 迎パールマリン釣り紀行へは車でのアクセスが最も便利です。西九州自動車道「佐世保大塔IC」から約15分、または「佐々IC」から約10分でアクセス可能です。\n主要都市からの所要時間\n佐世保市街：約20分 長崎市街：約1時間20分 福岡市街：約1時間30分 公共交通機関でのアクセス \u0026nbsp; 最寄り駅はMR松浦鉄道「鹿町駅」ですが、駅から施設まで約1.5kmあるため、タクシーの利用が便利です。鹿町駅までは佐世保駅から松浦鉄道で約25分となります。\n早朝の出港時間（日の出頃）に間に合わせるためには、前日に佐世保市内または鹿町周辺に宿泊することをおすすめします。\n近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 【最安】予算を抑えたい方向け\nビジネスホテル・民宿：4,000円～6,000円程度 例：佐世保市内のビジネスホテル、鹿町周辺の民宿 【平均】標準的な宿泊施設\nシティホテル：7,000円～11,000円程度 例：佐世保ワシントンホテル、ホテルオークラJRハウステンボス 【高くてもいい】快適さを重視する方向け\nリゾートホテル：12,000円以上 例：ハウステンボス周辺のリゾートホテル、九十九島エリアの高級ホテル レンタカー 佐世保駅周辺のレンタカー会社：\nトヨタレンタカー佐世保駅前店 ニッポンレンタカー佐世保営業所 タイムズカーレンタル佐世保店 料金は1日あたり4,000円～8,000円程度です。大量の釣具を持参する場合は、荷物スペースの広い車種を選択することをおすすめします。運転免許証の持参をお忘れなく。\n実際に利用したユーザーの声を抜粋 \u0026nbsp; 50代男性「★★★★★｜5.0」 \u0026nbsp; 移動式イカダは初体験でしたが、固定式では味わえないダイナミックな釣りが楽しめました。クエとマダイが釣れて、船長のポイント選択の的確さに感動しました。\n40代男性「★★★★☆｜4.0」 \u0026nbsp; 企業の慰安旅行で貸切利用しました。30名でも余裕があり、普段釣りをしない同僚も楽しんでいました。料金も1人あたりで考えると手頃で、良い思い出になりました。\n30代男性「★★★★★｜5.0」 \u0026nbsp; 船釣りとイカダ釣りの良いとこ取りみたいな釣り方で、新鮮な体験でした。ヒラマサとイシダイが釣れて、普通のイカダでは狙えない魚種が楽しめるのが魅力です。\n20代男性「★★★★☆｜4.0」 \u0026nbsp; 乗り合いで利用しましたが、他の参加者の方々とも交流できて楽しかったです。ただし、船酔いしやすい人は事前対策が必要だと思います。\n60代男性「★★★☆☆｜3.0」 \u0026nbsp; 料金が少し高めに感じましたが、移動式という特殊性を考えると妥当かもしれません。出港人数の制約があるので、予約時の確認が重要だと感じました。\n利用者からは、移動式イカダという珍しいシステムと、それによって可能になる多様な魚種との出会いについて高い評価を得ています。一方で、船酔いや料金設定について注意が必要という声もあり、事前の準備と理解が重要です。\n【まとめ】迎パールマリン釣り紀行をおすすめしたい理由 \u0026nbsp; 施設の魅力と特徴 \u0026nbsp; 迎パールマリン釣り紀行の最大の魅力は、全国でも極めて珍しい移動式イカダによる釣り体験です。固定式のイカダでは到達できない好ポイントを巡ることで、15種類以上の豊富な魚種との出会いが期待できます。\n特にクエやイシダイなどの高級魚が射程範囲に入る点は、上級者にとって大きな魅力です。船で牽引されながらの釣りという独特のスタイルは、船釣りとイカダ釣りの良いとこ取りを実現した革新的なサービスといえます。\n貸切30名対応という大容量も特徴的で、企業研修や大型グループでの釣行において、他では体験できない特別な釣り体験を提供します。\n最適な利用シーン \u0026nbsp; 企業の慰安旅行や研修旅行に最適で、貸切プランを利用することで1名あたりの料金を抑えながら、特別感のある釣り体験が提供できます。佐世保市から20分というアクセスの良さも、スケジュール調整を容易にします。\n本格的な船釣り体験を求める上級者にとっても価値の高い施設で、通常のイカダ釣りでは物足りない方に新鮮な体験を提供します。ハウステンボス観光などと組み合わせた九州旅行の一環としても魅力的です。\n釣りサークルや同好会の特別釣行にも適しており、移動式という特殊性により、メンバー間での話題性も十分です。\n注意点とアドバイス \u0026nbsp; 完全予約制で、特に乗り合いプランでは最低催行人数の制約があるため、予約時に出港可否を必ず確認することが重要です。釣り客が10名以下の場合は運行休止となる可能性があります。\n船酔い対策は必須で、移動式イカダは通常のイカダよりも揺れる可能性があります。酔い止め薬の準備や、船の中央部での位置取りなど、事前の対策を講じましょう。\n早朝出港（日の出時刻）のため、前日宿泊または早朝移動の準備が必要です。特に遠方からの参加者は、アクセス方法を事前に確認しておきましょう。\nおすすめ度★★★★☆ \u0026nbsp; 迎パールマリン釣り紀行は、革新的な釣り体験を提供する独特の施設として高く評価できます。移動式イカダという全国でも珍しいシステムにより、従来の海釣り施設では体験できない特別な釣り体験を提供しています。\n料金設定は一般的な海釣り施設より高めですが、提供される体験の独自性と価値を考慮すれば妥当な設定です。特に大型グループでの利用や、本格的な船釣り体験を求める上級者にとっては、他では得られない貴重な体験として強くおすすめできる施設です。"
      })
      .add(
      
      
      
      
      
      {
        id: 108,
        href: "/nagasaki/takashima-tobishima-isotsuri-park/",
        title: "高島飛島磯釣り公園",
        description: "長崎県長崎市の高島にある高島飛島磯釣り公園は、離島ならではの豊かな海洋環境で本格的な磯釣りが楽しめる海釣り施設です。",
        
        
        content: "長崎県長崎市の高島にある高島飛島磯釣り公園は、離島ならではの豊かな海洋環境で本格的な磯釣りが楽しめる海釣り施設です。\n大人わずか520円という破格の料金で、クロダイ・メジナ・マダイなど10種類以上の魚種が狙えます。\n長崎港からフェリーでアクセスする離島の釣り場として、都市部では味わえない静寂な環境と美しい景観の中で、充実した釣り体験を提供しています。\n高島飛島磯釣り公園の基本情報 \u0026nbsp; 場所：〒851-1315　長崎県長崎市高島町1726 営業時間：4～10月｜6:30～18:00、11～3月｜6:30～17:00 定休日：3～11月｜無休、12～2月｜毎週火曜日（祝日営業、翌平日休み）、1月1日 平均予算：大人520円、小人260円（見学は大人100円、小人50円） レンタル：リール付き竿500円、仕掛け・エサ販売有り 釣具の持ち込み：可能 釣れる魚：クロダイ・メジナ・イサキ・ヒラメ・マダイ・ミズイカ・アジ・カワハギ・カサゴ・ヒラマサなど 注意事項：収容人数制限あり（釣り桟橋100名、防波堤300名、北側釣り台50名）、カゴ釣り・ダンゴ釣り禁止 アクセス情報： フェリー運行会社HP 料金体系について \u0026nbsp; 高島飛島磯釣り公園の最大の魅力は、全国屈指の格安料金です。離島の海釣り施設としては驚異的な低価格で、本格的な磯釣り体験が楽しめます。\n＜基本料金＞\n釣り料金：大人（高校生以上）520円、小人（小中学生）260円 見学料金：大人100円、小人50円 小学生以下：無料 ＜レンタル料金＞\nリール付き竿：500円 仕掛け・エサ：現地販売価格による ＜フェリー釣りパック（長崎港発）＞ 長崎港から高島への往復フェリー乗船券と釣り入園料がセットになった「釣りパック」が提供されており、個別購入よりもお得に利用できます。詳細料金は野母商船のウェブサイトでご確認ください。\nこの料金設定により、家族連れでも気軽に離島釣り体験を楽しむことができ、特に子供の釣りデビューには最適な環境が整っています。\n注意事項と補足データ \u0026nbsp; 施設には収容人数の制限があり、釣り桟橋100名、防波堤300名、北側釣り台50名となっています。土日祝日や夏季シーズンには混雑する可能性があるため、早めの到着をおすすめします。\n釣り方の制限事項\nカゴ釣り・ダンゴ釣り（バクダン）は禁止 小学生以下は保護者の同伴が必要 気象条件により臨時休業の可能性あり 季節による営業時間の変動\n4～10月：6:30～18:00（夏季延長営業） 11～3月：6:30～17:00（冬季短縮営業） 12～2月：毎週火曜日が定休日（祝日は営業、翌平日休み） フェリーの運航時刻と連動した利用計画が重要で、最終便の時刻を事前に確認しておく必要があります。\n高島飛島磯釣り公園のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 釣り場環境と特徴 \u0026nbsp; 高島飛島磯釣り公園は、離島ならではの豊かな海洋環境が最大の特徴です。都市部の海釣り施設とは異なり、透明度の高い海水と豊富な魚種が期待できます。施設名にある通り、安定した足場で本格的な磯釣り体験ができる環境が整備されています。\n釣り場は3つのエリアに分かれており、それぞれ異なる特徴を持っています：\n釣り桟橋：水深があり大物狙いに適している 防波堤：最も収容人数が多く、ファミリー釣りに最適 北側釣り台：少人数でじっくり釣りを楽しめるエリア おすすめの仕掛けとタックル \u0026nbsp; 初回利用者には、現地でのレンタル竿と仕掛けの購入をおすすめします。離島という立地上、忘れ物があっても調達が困難なためです。\nクロダイ・メジナ向けタックル\nロッド：4.5～5.3m程度の磯竿1～2号 リール：2500番台のスピニングリール 道糸：ナイロン2～3号 ハリス：フロロカーボン1.5～2号 針：チヌ針1～3号、グレ針5～7号 ウキ：円錐ウキ0～3号 エサ：オキアミ、サナギ、コーン マダイ・イサキ向けタックル\nロッド：4.5～5m程度の磯竿2～3号 リール：2500～3000番台のスピニングリール 道糸：ナイロン3～4号 ハリス：フロロカーボン2～3号 針：マダイ針7～9号、イサキ針6～8号 ウキ：棒ウキ3～8号 エサ：オキアミ、イソメ、エビ アジ・カサゴ向けタックル\nロッド：3～4m程度のライトロッド リール：2000～2500番台のスピニングリール 道糸：ナイロン2～3号 ハリス：フロロカーボン1～2号 仕掛け：サビキ仕掛け、胴突き仕掛け エサ：アミエビ、イソメ、オキアミ 釣りのコツとポイント \u0026nbsp; 離島の潮流パターンを理解することが重要です。高島周辺は潮の流れが複雑で、時間帯によって魚の活性が大きく変わります。朝マズメと夕マズメは特に期待できる時間帯です。\nフェリーの運航時刻に合わせた釣行計画が必要で、最終便に間に合うよう時間管理を徹底しましょう。特に冬季は17:00に営業終了となるため、余裕を持ったスケジュールが重要です。\n風向きと波の状況を常に確認し、安全な釣り場選択を心がけてください。離島の釣り場は天候の影響を受けやすいため、無理な釣行は避けましょう。\n高島飛島磯釣り公園へのおすすめアクセス情報 \u0026nbsp; フェリーでのアクセス｜必須！ \u0026nbsp; 高島飛島磯釣り公園へのアクセスは、長崎港からのフェリー利用が唯一の手段です。野母商船が運航するフェリーで、1日8便の定期便が運航されています。\nフェリー運航情報\n運航会社：野母商船 運航便数：1日8便 所要時間：約35分 料金：往復フェリー代＋釣り入園料の「釣りパック」がお得 釣りパックの魅力 長崎港から高島への往復フェリー乗船券と釣り入園料がセットになった「釣りパック」は、個別購入よりも割安で、釣り人に特化したサービスです。\n長崎港へのアクセス \u0026nbsp; JR長崎駅から長崎港へ\n路面電車：「長崎駅前」→「大波止」約10分 徒歩：約15分 タクシー：約5分 車でのアクセス\n長崎自動車道「長崎IC」から約20分 長崎港周辺に有料駐車場あり（1日800円～1,200円程度） 近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 釣行前日は長崎市内での宿泊が便利です。朝一番のフェリーに乗船するためには、長崎港へのアクセスを考慮した宿泊地選択が重要です。\n【最安】予算を抑えたい方向け\nビジネスホテル・ゲストハウス：3,000円～6,000円程度 例：長崎駅前のビジネスホテル各種 【平均】標準的な宿泊施設\nシティホテル：7,000円～12,000円程度 例：ホテルニュー長崎、長崎ワシントンホテル 【高くてもいい】快適さを重視する方向け\n高級ホテル・リゾートホテル：15,000円以上 例：ANAクラウンプラザホテル長崎グラバーヒル レンタカー 長崎駅周辺のレンタカー会社：\nトヨタレンタカー長崎駅前店 ニッポンレンタカー長崎駅前営業所 オリックスレンタカー長崎駅前店 ただし、高島では車の利用ができないため、レンタカーは長崎観光用として考える必要があります。運転免許証の持参をお忘れなく。\n実際に利用したユーザーの声を抜粋 \u0026nbsp; 50代男性「★★★★★｜5.0」 \u0026nbsp; 離島とは思えない格安料金で本格的な磯釣りが楽しめます。フェリーからの景色も美しく、釣り以外の楽しみもあります。メジナとクロダイが良型で釣れて大満足でした。\n40代女性「★★★★☆｜4.0」 \u0026nbsp; 家族で利用しましたが、子供も安全に釣りができる環境でした。レンタル竿もあるので手ぶらで行けるのが便利。フェリー釣りパックがお得で助かりました。\n30代男性「★★★★★｜5.0」 \u0026nbsp; 都市部の釣り場とは比較にならない魚影の濃さ。離島ならではの透明度の高い海で、釣り上げた魚も美しく、食味も抜群でした。また必ず訪れたい釣り場です。\n60代男性「★★★★☆｜4.0」 \u0026nbsp; 長崎観光と合わせて利用しました。フェリーの時間に合わせた釣行計画が必要ですが、それも含めて楽しい体験でした。磯釣り入門には最適な施設だと思います。\n20代女性「★★★☆☆｜3.0」 \u0026nbsp; 釣り初心者でしたが、現地スタッフが親切に教えてくれました。ただし、フェリーの最終便を逃さないよう時間管理が重要です。もう少し長時間釣りを楽しみたかったです。\n利用者からは、離島ならではの豊かな釣り環境と格安料金について高い評価を得ています。フェリーアクセスによる時間制約については賛否が分かれますが、それを上回る魅力的な釣り体験として多くの方に支持されています。\n【まとめ】高島飛島磯釣り公園をおすすめしたい理由 \u0026nbsp; 施設の魅力と特徴 \u0026nbsp; 高島飛島磯釣り公園の最大の魅力は、離島ならではの豊かな海洋環境と全国屈指の格安料金の組み合わせです。大人520円という破格の料金で、都市部では体験できない本格的な磯釣りが楽しめます。\n10種類以上の豊富な魚種と、透明度の高い美しい海での釣り体験は、まさに離島釣り場の醍醐味です。3つの釣りエリア（釣り桟橋・防波堤・北側釣り台）により、初心者から上級者までそれぞれのレベルに応じた釣りが可能です。\nフェリー釣りパックという独特のサービスも、離島釣り場ならではの魅力で、交通費と入場料がセットになることで利便性と経済性を両立しています。\n最適な利用シーン \u0026nbsp; 長崎観光と組み合わせた釣り体験として最適で、特に軍艦島ツアーなどの長崎の観光名所巡りと合わせることで、充実した旅行プランが組めます。\n家族連れの釣りデビューにも最適で、格安料金と安全な釣り環境により、子供に釣りの楽しさを教える場所として理想的です。小学生以下無料という料金設定も、ファミリー利用を後押ししています。\n日帰り釣行として、長崎市内からの半日釣行プランにも適しており、都市部では味わえない離島の静寂な環境での釣り体験が楽しめます。\n注意点とアドバイス \u0026nbsp; フェリーの運航時刻に合わせた計画が絶対条件です。最終便を逃すと島に取り残される可能性があるため、余裕を持ったスケジュール設定が重要です。\n天候による運航中止のリスクがあるため、事前に運航状況を確認し、悪天候が予想される日は避けることをおすすめします。\n釣具の忘れ物に注意が必要で、離島では調達が困難なため、現地レンタルの活用も検討しましょう。特に仕掛けやエサは現地調達を前提とした準備が安全です。\nおすすめ度★★★★☆ \u0026nbsp; 高島飛島磯釣り公園は、離島釣り体験の入門施設として高く評価できる施設です。格安料金と豊富な魚種、美しい自然環境の組み合わせは、他では体験できない特別な価値を提供しています。\nフェリーアクセスという制約はありますが、それを含めても長崎エリアの釣り体験において最もコストパフォーマンスの高い施設として、幅広い利用者層におすすめできる優良施設です。特に釣り初心者や家族連れ、離島釣りに興味のある方には、ぜひ一度体験していただきたい貴重な釣り場です。"
      })
      .add(
      
      
      
      
      
      {
        id: 109,
        href: "/nagasaki/shinkamigoto-sea-fishing-pond/",
        title: "新上五島町海上釣り堀",
        description: "長崎県五島列島の新上五島町にある海上釣り堀は、美しい離島の自然環境で本格的な釣り体験ができる観光型釣り施設です。1時間4,500円の時間制料金で、ヒラマサ・クエ・マダイなど9種類の高級魚が狙えます。",
        
        
        content: "長崎県五島列島の新上五島町にある海上釣り堀は、美しい離島の自然環境で本格的な釣り体験ができる観光型釣り施設です。1時間4,500円の時間制料金で、ヒラマサ・クエ・マダイなど9種類の高級魚が狙えます。\n釣り竿・仕掛け・ライフジャケットがすべて料金に含まれており、完全に手ぶらで楽しめるため、五島列島観光の一環として気軽に立ち寄れる人気スポットです。\n新上五島町海上釣り堀の基本情報 \u0026nbsp; 場所：〒857-4402 長崎県南松浦郡新上五島町奈摩郷162-78 営業時間：9:00～16:00 営業期間：5月1日～11月30日（夏季限定営業） 定休日：12～4月は休業、8月13～16日は受入不可 平均予算：大人4,500円（1時間）＋保険料400円 レンタル：釣り竿・仕掛けセット・ライフジャケット（料金に含む） 釣具の持ち込み：不要（すべてレンタル込み） 釣れる魚：ヒラマサ・メジナ・ブリ・アオハタ・クエ・アカハタ・イサキ・マダイ・アコウなど 注意事項：風速5m以上で中止、基本リリース・持ち帰り1人1匹まで ウェブサイト： 新上五島町海上釣り堀 料金体系について \u0026nbsp; 新上五島町海上釣り堀は、1時間単位の時間制料金システムを採用しており、観光の合間に気軽に利用できる設定となっています。すべての必要機材が料金に含まれているため、追加費用を気にせず楽しめます。\n＜基本料金（1時間あたり）＞\n大人：4,500円 小人：4,000円 保険料：1人400円（必須） 見学：500円 ＜料金に含まれるもの＞\n釣り竿一式 仕掛けセット ライフジャケット 基本的な釣り指導 ＜魚の持ち帰りについて＞\n基本：リリース方式 持ち帰り：1人1匹まで無料 追加持ち帰り：買取価格による この料金システムにより、完全に手ぶらで釣り体験が可能で、五島列島観光のアクティビティとして最適な設定となっています。1時間という短時間設定も、観光スケジュールに組み込みやすい大きなメリットです。\n注意事項と補足データ \u0026nbsp; 新上五島町海上釣り堀は夏季限定営業（5月1日～11月30日）のため、営業期間の確認が重要です。また、風速5m以上の場合は安全のため営業中止となる可能性があります。\n営業期間の特徴\n営業期間：5月1日～11月30日（約7ヶ月間） 休業期間：12月～4月（冬季完全休業） お盆期間：8月13～16日は受入不可 安全管理について\nライフジャケット着用義務（料金に含む） 風速5m以上で営業中止 保険加入必須（1人400円） リリース方式の特徴 釣れた魚は基本的にリリースする環境保護型の運営で、持ち帰りは1人1匹までとなっています。これにより、持続可能な釣り体験を提供しており、自然環境への配慮が感じられる施設です。\n新上五島町海上釣り堀のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 釣り場環境と特徴 \u0026nbsp; 新上五島町海上釣り堀は、五島列島の美しい海洋環境を活かした海上釣り堀で、透明度の高い海水と豊富な魚種が特徴です。完全手ぶらシステムにより、観光客でも気軽に本格的な釣り体験が楽しめる環境が整備されています。\n9種類の高級魚種が放流されており、特にヒラマサ（五島では「ヒラス」と呼ばれる）やクエなど、本土では高価な魚種が狙える点が大きな魅力です。\nおすすめの仕掛けとタックル \u0026nbsp; すべての釣り具が料金に含まれているため、現地スタッフの指導に従った基本的な仕掛けで十分楽しめます。1時間という限られた時間を有効活用するため、複雑な仕掛けよりもシンプルで確実な釣り方が推奨されます。\n基本タックル構成（レンタル込み）\nロッド：3～3.5m程度の海上釣り堀専用竿 リール：スピニングリール（道糸込み） 仕掛け：ウキ釣り仕掛け（棚調整済み） 針：対象魚に応じた専用針 エサ：オキアミ、アミエビ等（現地提供） 対象魚種別アプローチ\n大型魚（ヒラマサ・クエ・ブリ）狙い\n強めの仕掛けでパワフルなやり取りに対応 エサは大きめのオキアミやアミエビ アタリがあったら確実にフッキング 中型魚（マダイ・アコウ・アオハタ）狙い\n繊細なアタリに対応できる感度重視 エサの付け方にも注意 丁寧なやり取りで確実にランディング 小型魚（イサキ・メジナ）狙い\n数釣りを楽しめるターゲット 手返しの良さが重要 初心者でも釣りやすい魚種 釣りのコツとポイント \u0026nbsp; 1時間という短時間を最大限に活用するため、スタッフの指導を積極的に受けることが重要です。五島の海や対象魚について熟知したスタッフのアドバイスにより、効率的に釣果を上げることができます。\nリリース前提の丁寧な魚の扱いも重要なポイントです。1人1匹まで持ち帰り可能ですが、それ以外はリリースするため、魚を傷つけないよう丁寧な取り扱いが求められます。\n時間管理も重要で、1時間という制限時間内で最大限楽しむため、準備や片付けの時間も考慮した効率的な釣行が必要です。\n新上五島町海上釣り堀へのおすすめアクセス情報 \u0026nbsp; 五島列島へのアクセス｜必須！ \u0026nbsp; 新上五島町海上釣り堀は五島列島にあるため、本土からの船舶または航空機利用が必要です。五島列島観光の一環として利用するのが一般的なアクセス方法です。\n船舶でのアクセス\n長崎港→有川港：高速船で約1時間30分、フェリーで約2時間45分 佐世保港→有川港：高速船で約1時間45分、フェリーで約2時間30分 航空機でのアクセス\n長崎空港→五島つばき空港：約30分 福岡空港→五島つばき空港：約40分 島内でのアクセス \u0026nbsp; レンタカー利用｜おすすめ！ 五島列島観光にはレンタカーが最も便利です。有川港または五島つばき空港でレンタカーを借りて、施設まで移動するのが効率的です。\n有川港から：約20分 五島つばき空港から：約40分 タクシー利用 観光地のため、各港や空港にタクシーが待機しています。ただし、島内のタクシー料金は本土より高めの設定です。\n近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 五島列島観光では、通常1泊以上の滞在が一般的です。新上五島町には様々なタイプの宿泊施設があります。\n【最安】予算を抑えたい方向け\n民宿・ゲストハウス：4,000円～6,000円程度 例：地元民宿、ビジネス民宿各種 【平均】標準的な宿泊施設\nビジネスホテル・旅館：7,000円～12,000円程度 例：五島列島の観光ホテル各種 【高くてもいい】快適さを重視する方向け\nリゾートホテル・高級旅館：15,000円以上 例：五島列島の高級宿泊施設 レンタカー 五島列島内のレンタカー会社：\n有川港周辺のレンタカー各社 五島つばき空港のレンタカー各社 料金は1日あたり6,000円～10,000円程度です。五島列島観光には必須のアイテムのため、事前予約をおすすめします。運転免許証の持参をお忘れなく。\n実際に利用したユーザーの声を抜粋 \u0026nbsp; 40代女性「★★★★★｜5.0」 \u0026nbsp; 五島旅行の途中で立ち寄りましたが、完全に手ぶらで本格的な釣りが楽しめて感動しました。1時間という時間も観光スケジュールにちょうど良く、ヒラマサが釣れて大満足です。\n30代男性「★★★★☆｜4.0」 \u0026nbsp; 子供と一緒に利用しました。ライフジャケットも含めてすべて料金に入っているので、追加費用を気にせず楽しめます。スタッフの方も親切で、子供にも丁寧に教えてくれました。\n50代男性「★★★★★｜5.0」 \u0026nbsp; クエが釣れるとは思いませんでした。五島の海の豊かさを実感できる体験で、リリース方式も環境への配慮が感じられて良いと思います。また五島に来たら必ず立ち寄りたいです。\n20代女性「★★★★☆｜4.0」 \u0026nbsp; 釣り初心者でしたが、1時間という短時間で気軽に体験できるのが良かったです。マダイが釣れて写真撮影も楽しめました。五島観光の良い思い出になりました。\n60代男性「★★★☆☆｜3.0」 \u0026nbsp; 料金は少し高めに感じましたが、五島の美しい海での釣り体験は貴重でした。ただし、風が強い日は中止になる可能性があるので、天候の確認が重要だと思います。\n利用者からは、手ぶらで楽しめる利便性と五島の美しい海での釣り体験について高い評価を得ています。1時間という時間設定も観光スケジュールに組み込みやすいと好評です。\n【まとめ】新上五島町海上釣り堀をおすすめしたい理由 \u0026nbsp; 施設の魅力と特徴 \u0026nbsp; 新上五島町海上釣り堀の最大の魅力は、五島列島の美しい自然環境と完全手ぶらシステムの組み合わせです。ヒラマサ・クエ・マダイなど9種類の高級魚種が狙える環境でありながら、観光客でも気軽に利用できる利便性を実現しています。\n1時間4,500円という料金設定は、観光アクティビティとしては妥当な価格帯で、すべての必要機材が含まれていることを考慮すれば、むしろコストパフォーマンスの高い設定といえます。\nリリース方式による環境保護への配慮も現代的で、持続可能な観光の観点からも評価できる取り組みです。\n最適な利用シーン \u0026nbsp; 五島列島観光の一環として最適で、世界遺産の教会群巡りや美しいビーチでの海水浴と組み合わせることで、充実した島旅が楽しめます。1時間という短時間設定により、タイトな観光スケジュールにも組み込みやすい利便性があります。\n家族連れの旅行にも最適で、子供から大人まで安全に楽しめる環境が整備されています。釣り初心者や女性にとっても、手ぶらで参加できる気軽さが大きなメリットです。\n特別な旅行体験を求める方にとって、離島での釣り体験は本土では味わえない貴重な思い出となります。\n注意点とアドバイス \u0026nbsp; 夏季限定営業（5月1日～11月30日）のため、事前の営業期間確認が必須です。特に春先や晩秋の利用を検討する場合は、営業開始・終了日を事前に確認しましょう。\n天候による中止リスクがあるため、五島旅行の日程に余裕を持たせ、代替プランも準備しておくことをおすすめします。\n五島列島へのアクセスには船舶または航空機が必要で、本土からの移動時間と費用も含めた総合的な旅行計画が重要です。\nおすすめ度★★★★☆ \u0026nbsp; 新上五島町海上釣り堀は、五島列島観光と釣り体験を組み合わせた特別な旅行を求める方に強くおすすめできる施設です。完全手ぶらシステムによる利便性と、離島ならではの美しい海での釣り体験は、他では得られない価値を提供しています。\n夏季限定営業や天候による制約はありますが、それを上回る特別感と満足度の高い体験が期待できます。五島列島という日本屈指の美しい離島での釣り体験として、一生の思い出に残る価値の高い施設です。"
      })
      .add(
      
      
      
      
      
      {
        id: 110,
        href: "/yamaguchi/susawan-fishing-park/",
        title: "須佐湾フィッシングパーク",
        description: "山口県萩市にある「須佐湾フィッシングパーク」は、美しい須佐湾の自然を活かした特別な釣り場です。",
        
        
        content: "山口県萩市にある「須佐湾フィッシングパーク」は、美しい須佐湾の自然を活かした特別な釣り場です。\n天然の入り江を区切った環境で、マダイやブリなどの高級魚を狙える貴重なスポットながら、リーズナブルな入場料で楽しめます。特筆すべきは、その限定的な営業期間。ゴールデンウィークや夏季の土日祝、お盆期間のみの営業となるため、訪問チャンスが少ない分、価値ある体験となるでしょう。\n釣った魚は買取方式との情報があります。利用する際は事前の確認が必要でしょう。\n須佐湾フィッシングパークの基本情報 \u0026nbsp; 場所: 〒759-3411 山口県萩市須佐7248-10 営業時間: 8:30～16:00 営業日: 4/27～5/6（GW期間中の平日は休み） 7～9月の土日祝 8/13～15日 定休日: 上記営業日以外 平均予算: 1,000円～3,000円程度（入場料+レンタル料+魚の買取料） レンタル: 釣り竿200円、パラソル200円、椅子100円、エサ100円 釣具の持ち込み: 可能（特に制限なし） 釣れる魚: マダイ、ブリ、アジなど 注意事項: 釣った魚は買取タイプ（マダイ1kg2,100円、ブリ1kg1,600円）、リリース禁止 ウェブサイト: 須佐湾フィッシングパーク情報 料金体系について \u0026nbsp; 須佐湾フィッシングパークは非常にリーズナブルな入場料が特徴です：\n1日券（4時間以上）: 大人: 520円 子供: 260円 半日券（4時間未満）: 大人: 260円 子供: 130円 釣った魚は買取方式となっており、持ち帰る際には以下の料金がかかるとの情報があります：\nマダイ: 1kg 2,100円 ブリ: 1kg 1,600円 その他の魚種: 施設で確認が必要 ブリクラス（約90cm）はおおよそ8kgほどあるので、1匹の買取価格は1万円を超えてしまいます。\n入場料が非常に安価である反面、釣果が良い場合には買取料金が高額になる可能性があります。計画的な釣行が望ましいでしょう。\n注意事項と補足データ \u0026nbsp; 須佐湾フィッシングパークの最大の特徴は、その限定的な営業期間です。年間を通じて営業しているわけではなく、以下の期間のみの営業となります：\nゴールデンウィーク期間（4/27～5/6、ただしGW期間中の平日は休み） 夏季の土日祝日（7～9月） お盆期間（8/13～15） 訪問を計画する際は、必ず事前に営業状況を確認することをおすすめします。\nまた、施設内で釣れた魚はリリース禁止で、必ず買い取る必要があります。高級魚が多数釣れた場合、想定以上の出費となる可能性があるため、注意が必要です。公式ウェブサイトや観光案内などでは買取料金が明記されていないケースが多いので、釣行前に施設に確認しておくと安心です。\n須佐湾フィッシングパークのおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; マダイを狙うなら \u0026nbsp; マダイは本施設の代表的な魚種で、新鮮な状態で持ち帰れる魅力があります。\n仕掛け: ウキ釣りか胴付き仕掛けが効果的です。 エサ: オキアミや青イソメなどがよく使われます。施設でも100円でエサを購入できます。 釣りのコツ: 朝の時間帯が比較的活性が高いとされています。水深は場所によって異なるため、様々なタナを探ってみましょう。 買取価格: 1kgあたり2,100円。30cmクラスで約500g前後なので、1匹1,000円程度の計算になります。 ブリ（ハマチ）の狙い方 \u0026nbsp; 引きの強いブリも人気のターゲットです。\n仕掛け: 強めのハリス（3号以上）を使用した仕掛けがおすすめです。 エサ: イワシの切り身やオキアミなどが効果的です。 釣りのポイント: 深めの場所を探るように釣ると当たりが出やすくなります。 買取価格: 1kgあたり1,600円。小型のハマチでも1kg前後あるため、1匹1,600円程度の計算となります。 アジ釣りを楽しむ \u0026nbsp; 初心者でも釣りやすいアジも人気です。\n仕掛け: サビキ仕掛けが最適です。 エサ: サビキ用のエサを使用します。 釣り方: 中層から表層を狙い、小刻みにアクションを加えると効果的です。 買取価格: 施設で確認が必要ですが、高級魚に比べると比較的リーズナブルです。 初心者の方や手ぶらで訪れる方には、施設のレンタル竿（200円）とエサ（100円）を利用することをおすすめします。椅子（100円）やパラソル（200円）もリーズナブルな価格でレンタルできるので、快適に釣りを楽しめます。\n須佐湾フィッシングパークへのおすすめアクセス情報 \u0026nbsp; 須佐湾は島根県寄りの山陰エリアにあります。施設近くに山陰本線はあるものの、公共交通のアクセスが決して「良い」とはいえません。基本的に車での移動を推奨します。\n車でのアクセス \u0026nbsp; 車でのアクセスが最も便利です。\n萩市内から: 国道191号線を益田方面へ、須佐で左折して約1時間30分 山陰自動車道から: 益田ICから国道191号線を萩方面へ約40分 駐車場: 無料駐車場完備 山口県の萩市と、島根県の益田市のほぼ中間にあります。島根県寄りに道の駅があるので、観光目的なら益田市からのほうがいいかもしれません。\n公共交通機関でのアクセス \u0026nbsp; 公共交通機関でのアクセスはやや制限されますが、JR山陰本線から徒歩移動で施設に行くことも可能です。\nJR山陰本線「須佐駅」から: 徒歩約20分 タクシーで約5分 タクシー利用は事前の予約をおすすめします。レンタル釣具があるので手ぶらでもOKですが、徒歩20分は2km以上は歩くことになるので、帰りを考えての行動を勧めます。\nおすすめ訪問時期と時間帯 \u0026nbsp; 限られた営業期間の中で効率よく楽しむためのポイントです：\nゴールデンウィーク（4/27～5/6）: 春の穏やかな気候で快適に釣りが楽しめます。ただし、平日は休業なので注意が必要です。 夏季の土日祝（7～9月）: 暑さ対策を万全にして訪れましょう。早朝の時間帯がおすすめです。 お盆期間（8/13～15）: 夏休み中で混雑が予想されるため、開園直後の時間帯がねらい目です。 周辺の観光スポットや宿泊施設 \u0026nbsp; 須佐湾周辺には他にも魅力的なスポットがあります：\n須佐ホルンフェルス: 国の天然記念物に指定されている奇岩群（車で約10分） 須佐湾遊覧船: 美しい須佐湾を船から眺められます（施設近く） 道の駅 萩・さんさん三見: 地元の新鮮な海産物が楽しめます（車で約20分） このようなスポットを自由に巡るには車が有利ですので、レンタカー利用をおすすめします。\n宿泊施設 \u0026nbsp; 施設の開放日が大型連休を意識しているため、宿泊予約を直前で取りづらいことに注意が必要です。\n【最安】須佐温泉 みすゞの湯宿泊棟: リーズナブルな温泉宿。一泊6,000円～ 【平均】萩観光ホテル: 萩市内の立地が良いホテル。一泊10,000円～ 【高級】萩本陣: 歴史ある高級旅館。一泊18,000円～ 実際に利用したユーザーの声を抜粋 \u0026nbsp; 「天然の入り江を活かした釣り場で、環境が素晴らしかったです。マダイが3匹釣れて、買取料金は少し高めでしたが、新鮮な魚を持ち帰れて満足でした。」（50代男性）\n「夏休みに子供と訪れましたが、入場料が非常にリーズナブルでありがたかったです。レンタル竿も200円と安く、初心者の私たちでもアジが釣れて大喜びでした。」（40代女性）\n「須佐湾の美しい景色を眺めながらの釣りは最高でした。営業日が限られているのが残念ですが、その分特別な体験になりました。ブリが1匹釣れて、夕食に最高の一品となりました。」（30代男性）\n「入場料の安さに驚きました。ただ、魚の買取料金は事前に知っておかないと驚くかもしれません。それでも市場で買うよりはお得で、しかも自分で釣った新鮮な魚は格別の味でした。」（40代男性）\nやはり買取に関するレビューが多いです。1匹のブリを市場で購入すると1万円以上はするので、販売価格としては妥当です。それを釣る体験を込みで考えるなら、マダイやブリを釣ったことがない人向けの達成プランにするのもアリでしょう。\n【まとめ】須佐湾フィッシングパークをおすすめしたい度 ★★☆☆☆ \u0026nbsp; 須佐湾フィッシングパークは、天然の入り江を活かした特別な釣り場として、以下のような魅力があります：\n自然環境: 美しい須佐湾の景観を楽しみながら釣りができる貴重なロケーション。 リーズナブルな入場料: 大人1日520円、半日260円という破格の入場料で利用できる。 手ぶら対応: 釣り竿200円、エサ100円など、リーズナブルな価格でレンタル可能。 高級魚の釣果: マダイやブリなどの高級魚が釣れるチャンスがある。 一方で、以下の点には注意が必要です：\n限定的な営業期間: GW、夏の土日祝、お盆のみの営業で、訪問チャンスが限られている。 買取方式: 釣った魚はリリース禁止で必ず買い取る必要があり、釣果が良いと予想外の出費になる可能性がある。 情報の少なさ: 買取料金などの情報が公式サイトなどに明記されていないケースがある。 総合的に見ると、限定営業期間内に訪れることができ、買取料金について理解した上で利用する方にとっては、素晴らしい釣り体験が期待できる施設です。\n特に須佐湾の美しい景観と新鮮な魚を求める方、リーズナブルな料金で海釣りを体験したい初心者やファミリーにおすすめできるスポットといえるでしょう。"
      })
      .add(
      
      
      
      
      
      {
        id: 111,
        href: "/nagasaki/tsuribori-hamakatsu/",
        title: "釣り堀ハマカツ",
        description: "九州で本格的な海上釣り堀体験をお探しなら、長崎県松浦市にある釣り堀ハマカツがおすすめです。ブリやマダイをはじめとする13種類もの魚種が狙える充実した施設で、初心者から上級者まで満足できる海上釣り堀として高い評価を得ています。",
        
        
        content: "九州で本格的な海上釣り堀体験をお探しなら、長崎県松浦市にある釣り堀ハマカツがおすすめです。ブリやマダイをはじめとする13種類もの魚種が狙える充実した施設で、初心者から上級者まで満足できる海上釣り堀として高い評価を得ています。\n完全予約制による質の高いサービスと、レンタル釣具の充実で手ぶらでも楽しめる環境が整っています。\n釣り堀ハマカツの基本情報 \u0026nbsp; 場所：〒859-4752 長崎県松浦市御厨町里免971 営業時間：受付7:00から。釣りの営業は8:00～12:00まで 定休日：不定休（要確認） 平均予算：男性11,000円、女性7,700円、子供5,500円 レンタル：貸竿800円、仕掛け・エサ販売有り、ライフジャケット無料 釣具の持ち込み：可能（1人1本、長さ4mまで） 釣れる魚：ブリ・マダイ・カンパチ・ヒラマサ・シマアジ・マハタ・タコ・カサゴ・イシガキダイ・クロダイ・メジナ・イシダイ・スズキ・アジ 注意事項：完全予約制（電話受付9:00～15:00・月～土）、ルアー・サビキ・撒き餌禁止 ウェブサイト： 釣り堀ハマカツ 料金体系について \u0026nbsp; 釣り堀ハマカツの料金システムは「釣り放題」タイプで、基本料金内で釣った魚をすべて持ち帰ることができます。男性11,000円、女性7,700円、子供（小学生まで）5,500円という料金設定で、九州エリアの海上釣り堀としては標準的な価格帯です。\n＜基本料金＞\n男性：11,000円 女性：7,700円 子供（小学生まで）：5,500円 ＜レンタル料金＞\n貸竿：800円 仕掛け・エサ：販売価格による ライフジャケット：無料貸出 ＜貸切プラン＞\n1枠8名まで：88,000円 追加1～2名：応相談（追加料金あり） 釣り放題システムのため、釣った魚の数や重量による追加料金は発生しません。これにより、初心者でも料金を気にせず思う存分釣りを楽しめるのが大きなメリットです。\n注意事項と補足データ \u0026nbsp; 釣り堀ハマカツは完全予約制を採用しており、当日の飛び込み利用はできません。予約受付は電話のみで、月曜日から土曜日の9:00～15:00までとなっています。\n釣具の制限として、ルアー・サビキ・撒き餌の使用が禁止されています。持ち込める竿は1人1本まで、長さは4m以内という規定があります。竿の破損時は賠償として1,000円が必要になるため、レンタル竿を利用する際は取り扱いに注意が必要です。\n見学のみの入場は不可となっており、釣りをしない同伴者も基本料金が必要です。この点は他の海上釣り堀と異なる特徴的な料金システムです。\n釣り堀ハマカツのおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 釣り場環境と特徴 \u0026nbsp; 釣り堀ハマカツでは13種類もの豊富な魚種が狙えるため、様々な釣り方に対応できるタックル構成が求められます。4時間という限られた時間を効率的に活用するために、事前の準備と基本的な釣り方のコツを押さえておくことが重要です。\nおすすめの仕掛けとタックル \u0026nbsp; 初回利用者にはレンタル竿の利用をおすすめします。現地スタッフが棚設定や仕掛けについてアドバイスしてくれるため、効率的に釣果を上げることができます。\n青物（ブリ・カンパチ・ヒラマサ）向けタックル\nロッド：3.5～4m程度の海上釣り堀専用竿 リール：2500～3000番台のスピニングリール 道糸：PE2～3号、ナイロン4～5号 ハリス：フロロカーボン4～6号 針：チヌ針3～5号 エサ：活きアジ、冷凍アジ、オキアミ 真鯛向けタックル\nロッド：3～3.5m程度の海上釣り堀竿 リール：2500番台のスピニングリール 道糸：ナイロン3～4号 ハリス：フロロカーボン3～4号 針：真鯛針7～9号 エサ：オキアミ、エビ、イソメ 根魚（カサゴ・メバル）向けタックル\nロッド：2.5～3m程度の磯竿 リール：2000番台のスピニングリール 道糸：ナイロン2～3号 ハリス：フロロカーボン2～3号 針：袖針5～7号 エサ：イソメ、オキアミ 釣りのコツとポイント \u0026nbsp; 営業時間が8:00～12:00の4時間と限られているため、効率的な釣り方が重要です。朝マズメの時間帯は特に魚の活性が高いため、開始直後の1時間は集中的に狙いましょう。\n公式サイトで事前に用意すべきアイテムが詳しく紹介されているため、必ず確認しておくことをおすすめします。エサ・針・仕掛け・クーラーボックス・折りたたみ椅子・針はずし・タオル・軍手・ライフジャケット・日焼け対策用品・着替えなど、準備を万全にしておけば現地でのレンタル費用を節約できます。\n釣り堀ハマカツへのおすすめアクセス情報 \u0026nbsp; 車でのアクセス｜おすすめ！ \u0026nbsp; 釣り堀ハマカツへは車でのアクセスが最も便利です。長崎自動車道「佐世保大塔IC」から約30分、または「佐々IC」から約25分でアクセス可能です。\n主要都市からの所要時間\n佐世保市街：約40分 長崎市街：約1時間30分 福岡市街：約2時間 公共交通機関でのアクセス \u0026nbsp; 最寄り駅はMR松浦鉄道「御厨駅」ですが、駅から施設まで約3kmあるため、タクシーの利用が必要です。御厨駅までは佐世保駅から松浦鉄道で約40分となります。\n早朝7:00の受付に間に合わせるためには、前日に松浦市内または佐世保市内に宿泊することをおすすめします。\n近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 【最安】予算を抑えたい方向け\nビジネスホテル：5,000円～7,000円程度 例：佐世保市内のビジネスホテル各種 【平均】標準的な宿泊施設\nシティホテル：8,000円～12,000円程度 例：佐世保ワシントンホテル、ホテルフラッグス九十九島 【高くてもいい】快適さを重視する方向け\nリゾートホテル：15,000円以上 例：九十九島ベイサイドホテル＆リゾート フラッグス レンタカー 佐世保駅周辺には複数のレンタカー会社があります。\nトヨタレンタカー佐世保駅前店 ニッポンレンタカー佐世保営業所 タイムズカーレンタル佐世保店 釣り道具を持ち込む場合は、荷物スペースを考慮してコンパクトカー以上のクラスをおすすめします。料金は1日あたり5,000円～8,000円程度です。なお、レンタカー利用には運転免許証が必須ですので、忘れずにお持ちください。\n実際に利用したユーザーの声を抜粋 \u0026nbsp; 50代男性「★★★★★｜5.0」 \u0026nbsp; 九州でこれだけの魚種が狙える海上釣り堀は他にありません。ブリとマダイが同時に狙えるのが最高です。スタッフの方も親切で、初心者の家族も安心して楽しめました。\n40代女性「★★★★☆｜4.0」 \u0026nbsp; 女性料金があるのが嬉しいポイント。レンタル釣具も充実していて、手ぶらで来ても十分楽しめます。ライフジャケットが無料なのも安心材料の一つです。\n30代男性「★★★★★｜5.0」 \u0026nbsp; 完全予約制なので混雑しすぎることがなく、ゆったりと釣りができます。4時間という時間設定も適度で、集中して楽しめました。貸切プランも利用しましたが、仲間との釣行には最適です。\n60代男性「★★★★☆｜4.0」 \u0026nbsp; 豊富な魚種が魅力的な施設です。ただし、ルアーが使えないのが少し残念。エサ釣り専門ということを理解して利用すれば、十分満足できる施設だと思います。\n20代男性「★★★☆☆｜3.0」 \u0026nbsp; 料金が他の施設と比べて少し高めに感じました。ただ、釣果は確実に期待できるので、特別な日の釣行としては価値があると思います。\n利用者からは特に魚種の豊富さと釣果の安定性について高い評価を得ています。完全予約制による質の高いサービスも好評ですが、一部では料金設定について意見が分かれています。しかし、九州エリアでは貴重な本格的海上釣り堀として、総合的に高い満足度を得ている施設です。\n【まとめ】釣り堀ハマカツをおすすめしたい理由 \u0026nbsp; 施設の魅力と特徴 \u0026nbsp; 釣り堀ハマカツは九州エリアでも屈指の本格的海上釣り堀として、多くの釣りファンに愛され続けています。13種類という豊富な魚種が最大の魅力で、ブリやマダイなどの高級魚から、初心者でも狙いやすいアジやカサゴまで、幅広いターゲットが用意されています。\n完全予約制による質の高いサービスも特筆すべき点です。混雑を避けてゆったりと釣りを楽しめる環境が整備されており、スタッフによる丁寧なサポートも期待できます。レンタル釣具の充実により、手ぶらでも本格的な海上釣り堀体験が可能な点も初心者には大きなメリットです。\n最適な利用シーン \u0026nbsp; 福岡市から約2時間というアクセスの良さから、九州各地からの日帰り釣行に最適です。特に佐世保市や長崎市からは1時間程度でアクセス可能なため、地元の釣りファンにとって貴重な施設となっています。\n8名まで対応可能な貸切プランは企業研修や家族旅行にも適しており、九州観光と組み合わせた釣り体験ツアーとしても活用できます。4時間という適度な時間設定により、観光スケジュールに組み込みやすいのも魅力の一つです。\n注意点とアドバイス \u0026nbsp; 完全予約制のため、必ず事前の電話予約が必要です。特に週末や連休期間は予約が取りにくくなるため、早めの計画をおすすめします。また、見学のみの利用ができないため、同伴者も釣りに参加する前提での利用となります。\n朝7:00の受付に間に合わせるためには、前日宿泊または早朝出発の準備が必要です。公式サイトで推奨されている持参アイテムを事前に確認し、現地でのレンタル費用を抑える工夫も有効です。\nおすすめ度★★★★☆ \u0026nbsp; 釣り堀ハマカツは、九州エリアで本格的な海上釣り堀体験を求める方に強くおすすめできる施設です。豊富な魚種と安定した釣果、質の高いサービスにより、初心者から上級者まで満足できる環境が整っています。完全予約制による制約はありますが、それを上回る価値のある釣り体験が期待できる優良施設として、九州の海上釣り堀界をリードする存在です。"
      })
      .add(
      
      
      
      
      
      {
        id: 112,
        href: "/yamagata/yura-marine-fishing-pond/",
        title: "由良海洋釣堀",
        description: "東北地方で唯一の海上釣り堀として知られる「由良海洋釣堀」は、山形県鶴岡市の風光明媚な日本海沿岸に位置しています。",
        
        
        content: "東北地方で唯一の海上釣り堀として知られる「由良海洋釣堀」は、山形県鶴岡市の風光明媚な日本海沿岸に位置しています。\n何も持たずに訪れても釣りが楽しめる手ぶらOKの施設で、大人から子どもまで幅広い年齢層に人気です。地元の定置網で捕れた旬の魚が放流されるため、四季折々の魚との出会いが楽しめます。道具の持ち込み不要で料金も比較的リーズナブルなため、初めての海釣り体験にもぴったり。\n釣った魚はそのまま持ち帰れるので、釣りの楽しさと新鮮な魚の味を一度に満喫できる、東北の海の恵みを存分に味わえるスポットです。\n由良海洋釣堀の基本情報 \u0026nbsp; 場所: 〒999-7464 山形県鶴岡市由良2丁目14-55（白山島遊魚センター内） 営業時間: 午前9時～午後5時（最終受付は午後3時頃） 営業期間: 例年4月下旬から10月中旬・下旬まで（2024年は4月20日～10月20日） 定休日: 通常は平日休み（土日祝営業、ゴールデンウィークや海水浴開設期間は営業日あり） 平均予算: 大人1,300円、中学生以下700円、鑑賞のみ100円 レンタル: 釣り竿・餌・仕掛けは料金に含まれる 釣具の持ち込み: 不可 釣れる魚: アイナメ、アジ、ウマズラハギ、カヤカリダイ、タイ、イナダなど季節により変動 注意事項: 1回2時間の時間制限あり、クーラーボックス持参推奨 ウェブサイト: 鶴岡観光ナビ - 由良海洋釣堀 料金体系について \u0026nbsp; 由良海洋釣堀は「釣り放題」のシステムを採用しています。入場料には竿のレンタルと餌代が含まれており、釣った魚はすべて持ち帰ることができます。追加料金は発生しないため、予算管理がしやすく初心者にも安心です。\n大人料金：1,300円 中学生以下：700円 鑑賞（入場のみ）：100円 注意事項と補足データ \u0026nbsp; 釣り時間は1回2時間制となっています。混雑状況によっては待ち時間が発生する場合もあります。 釣り竿・餌・仕掛けの持ち込みは禁止されており、施設のものを使用する必要があります。 釣った魚を持ち帰る場合はクーラーボックスの持参が必要です。施設では氷の販売も行っているので、新鮮な状態で持ち帰ることができます。 海水浴開催期間中（例年7月中旬～8月中旬）は、車1台につき1,000円の協力金が必要ですが、釣堀利用者は釣堀料金から1,000円分が控除されます。例えば大人2人、子供1人で利用する場合、通常3,300円のところ2,300円になります。\n施設には駐車場もあり、車でのアクセスも容易です。\n由良海洋釣堀のおすすめ仕掛け・釣りのコツなどの情報 \u0026nbsp; 由良海洋釣堀では自前の仕掛けは使えませんが、施設で提供される仕掛けと餌で十分に楽しむことができます。ここでは、施設で釣れる主な魚種ごとのコツをご紹介します。\nアジの釣り方 \u0026nbsp; アジは群れで行動する魚なので、一匹釣れたらその場所をねらい続けることが重要です。レンタル竿で提供される仕掛けは通常、小さな疑似餌（サビキ）が付いています。\nコツ:\n水深の中層から表層を狙うと良いでしょう 竿先の動きを小刻みに上下させる「シャクリ」を入れると釣果アップ 他の人が釣れている場所の近くで狙うと効果的 アイナメの釣り方 \u0026nbsp; アイナメは比較的大型の魚で、底付近を好む傾向があります。サビキでは釣れないので、1本針仕掛けとエサを使いましょう。\nコツ:\n仕掛けを底まで沈めてから少し持ち上げた位置を狙う 動きはゆっくりと小さく 朝夕の時間帯が特に活性が高い傾向 ウマズラハギの釣り方 \u0026nbsp; 引きが強く、面白い魚です。口が小さいため、アタリがあってもすぐに針掛かりしないことがあります。\nコツ:\nアタリを感じたら少し間を置いてから合わせる 餌は小さくして食べやすくする 根気よく待つことが重要 初めて訪れる方へのアドバイスとして、スタッフの方に「今日はどの辺りでどんな魚が釣れていますか？」と聞くのが一番確実です。タナ（水深）の設定や、その日の釣れ筋などを教えてもらえることが多いです。\n由良海洋釣堀へのおすすめアクセス情報 \u0026nbsp; 車でのアクセス \u0026nbsp; 由良海洋釣堀は鶴岡市の由良地区にある白山島に位置しています。\n山形市から：約2時間（山形自動車道→庄内自動車道→鶴岡ICから国道112号線、345号線経由） 新潟方面から：日本海東北自動車道→鶴岡西ICから約30分 仙台方面から：東北自動車道→山形自動車道→庄内自動車道→鶴岡ICから約30分 公共交通機関でのアクセス \u0026nbsp; JR羽越本線 鶴岡駅からタクシーで約30分（約5,000円程度） JR羽越本線 鶴岡駅から「急行由良行き」バスで「由良」バス停下車、徒歩約10分 注意: 公共交通機関は本数が限られています。事前に時刻表を確認することをお勧めします。\n遠方からのアクセス \u0026nbsp; 由良海洋釣堀は朝9時開始ですが、東北地方の他県から日帰りで訪れる場合、朝早くに出発する必要があります。遠方からの場合は、以下のプランがおすすめです：\n前日に鶴岡市内のホテルに宿泊し、翌朝チェックアウト後に施設へ レンタカーを利用すれば移動が便利で、近隣の観光地も巡れます 近隣の宿泊施設やレンタカーを探すなら \u0026nbsp; 【宿泊施設】\n【最安】ビジネスホテルみずほ：鶴岡駅から徒歩10分、5,000円〜 【平均】湯野浜温泉 亀や：由良から車で約20分、12,000円〜 【高級】湯どの庵：鶴岡市街地、20,000円〜 【レンタカー】\nトヨタレンタカー鶴岡駅前店：JR鶴岡駅から徒歩3分 ニッポンレンタカー鶴岡営業所：JR鶴岡駅から徒歩5分 実際に利用したユーザーの声を抜粋 \u0026nbsp; 「初心者の私でも大きな魚が釣れて大満足でした。スタッフの方が丁寧に教えてくれたので助かりました」（30代男性）\n「子供と一緒に行きましたが、時間制なので集中して楽しめました。釣った魚はその日の夕食に、新鮮で美味しかったです」（40代女性）\n「東北では数少ない海上釣り堀で、手ぶらで行けるのが良いですね。料金も手頃で満足です」（50代男性）\n「夏の海水浴と組み合わせて楽しめました。家族全員が釣りを体験できて良い思い出になりました」（40代男性）\n【まとめ】由良海洋釣堀をおすすめしたい度 ★★★★☆（4/5） \u0026nbsp; 由良海洋釣堀は、東北地方で唯一の海上釣り堀として、初心者から家族連れまで幅広い層に人気のスポットです。特に魅力的なのは以下の点です：\n手ぶらで釣りが楽しめる手軽さ 比較的リーズナブルな料金設定 釣った魚をすべて持ち帰れる釣り放題システム 美しい日本海の景色を楽しみながらの釣り体験 一方で、営業期間が限られる点や平日は基本的に休業である点、時間制限があることなどは注意が必要です。また、釣具の持ち込みができないため、自分の道具で釣りたい上級者には物足りなさを感じる可能性があります。\n訪問するベストシーズンは、海水浴シーズンを避けた5月〜6月、9月〜10月上旬がおすすめです。この時期は混雑も比較的少なく、落ち着いて釣りを楽しめます。特に秋は魚の活性が高まる時期なので、大物が釣れる可能性も高まります。\n東北地方で海釣りデビューを考えている方や、家族で気軽に釣りを楽しみたい方にとって、由良海洋釣堀は間違いなくおすすめの施設です。"
      })
      ;
  

  search.addEventListener('input', showResults, true);
}
  
function hideSuggestions(e) {
  var isClickInsideElement = suggestions.contains(e.target);

  if (!isClickInsideElement) {
    suggestions.classList.add('d-none')
    if (background !== null ) {
      background.style.setProperty('--image-opacity', '0.1')
    }
  }
}

/*
Source:
  - https://raw.githubusercontent.com/h-enk/doks/master/assets/js/index.js
*/
function inputFocus(e) {
  if (e.ctrlKey && e.key === '/' ) {
    e.preventDefault();
    search.focus();
  }
  if (e.key === 'Escape' ) {
    search.blur();
    suggestions.classList.add('d-none');
  }
}

/*
Source:
  - https://dev.to/shubhamprakash/trap-focus-using-javascript-6a3
*/
function suggestionFocus(e) {
  const suggestionsHidden = suggestions.classList.contains('d-none');
  if (suggestionsHidden) return;

  const focusableSuggestions= [...suggestions.querySelectorAll('a')];
  if (focusableSuggestions.length === 0) return;

  const index = focusableSuggestions.indexOf(document.activeElement);

  if (e.key === "ArrowUp") {
    e.preventDefault();
    const nextIndex = index > 0 ? index - 1 : 0;
    focusableSuggestions[nextIndex].focus();
  }
  else if (e.key === "ArrowDown") {
    e.preventDefault();
    const nextIndex= index + 1 < focusableSuggestions.length ? index + 1 : index;
    focusableSuggestions[nextIndex].focus();
  }
}
  
/*
Source:
  - https://github.com/nextapps-de/flexsearch#index-documents-field-search
  - https://raw.githack.com/nextapps-de/flexsearch/master/demo/autocomplete.html
*/
function showResults() {
  const maxResult = 5;
  var searchQuery = this.value;
  // filter the results for the currently tagged language
  const lang = document.documentElement.lang;
  var results = null;
  if (searchQuery) {
    results = index.search(searchQuery, { index: ['title', 'description', 'content'], limit: maxResult, enrich: true });
    if (background !== null) {
      background.style.setProperty('--image-opacity', '0')
    }
  } else {
    if (background !== null) {
      background.style.setProperty('--image-opacity', '0.1')
    }
  }

  // flatten results since index.search() returns results for each indexed field
  const flatResults = new Map(); // keyed by href to dedupe results
  if (results !== null) {
    for (const result of results.flatMap(r => r.result)) {
      if (flatResults.has(result.doc.href)) continue;
      flatResults.set(result.doc.href, result.doc);
    }
  }

  suggestions.innerHTML = "";
  suggestions.classList.remove('d-none');
  
  // inform user that no results were found
  if (flatResults.size === 0 && searchQuery) {
    const msg = suggestions.dataset.noResults;
    const noResultsMessage = document.createElement('div')
    noResultsMessage.innerHTML = `${msg} "<strong>${searchQuery}</strong>"`
    noResultsMessage.classList.add("suggestion__no-results");
    suggestions.appendChild(noResultsMessage);
    return;
  }

  // construct a list of suggestions
  for (const [href, doc] of flatResults) {
    const entry = document.createElement('div');
    suggestions.appendChild(entry);

    const a = document.createElement('a');
    a.href = href;
    entry.appendChild(a);

    const title = document.createElement('span');
    title.classList.add('text-start');
    title.textContent = doc.title;
    title.classList.add("suggestion__title");
    a.appendChild(title);

    const description = document.createElement('span');
    description.textContent = doc.description;
    description.classList.add("suggestion__description");
    a.appendChild(description);

    suggestions.appendChild(entry);

    if (suggestions.childElementCount == maxResult) break;
  }
}
  
if (search !== null && suggestions !== null) {
  document.addEventListener('keydown', inputFocus);
  document.addEventListener('keydown', suggestionFocus);  
  document.addEventListener('click', hideSuggestions);
  initIndex();
}

const searchModal = document.getElementById('search-modal')
if (searchModal !== null) {
  searchModal.addEventListener('shown.bs.modal', function () {
    const searchInput = document.getElementById('search-input-modal')
    if (searchInput !== null) {
      searchInput.focus({ focusVisible: true })
    }
  })
}

;
document.querySelectorAll('.dynamic-svg').forEach((placeholder) => {
  placeholder.onload = function () {
    const container = placeholder.parentElement
    const doc = placeholder.contentDocument
    const attr = placeholder.getAttribute('data-class')
    const style = placeholder.getAttribute('data-style')

    if (container !== null && doc !== null) {
      const svg = doc.querySelector('svg')
      if (svg !== null) {
        svg.setAttribute('class', 'svg-inline--fa ' + (attr || ''))
        svg.setAttribute('fill', 'currentcolor')
        svg.setAttribute('aria-hidden', 'true')
        svg.setAttribute('role', 'img')
        if (style !== null && style !== '') {
          svg.setAttribute('style', style)
        }
        svg.removeAttribute('height')
        svg.removeAttribute('width')
        container.innerHTML = ''
        container.appendChild(svg)
      }
    }
  }
})

;
function updateDropdown (element, id, label) {
  const dropdown = document.getElementById(element)
  if (dropdown != null) {
    dropdown.querySelector('.dropdown-toggle').textContent = label
    dropdown.querySelectorAll('.panel-dropdown .dropdown-item').forEach(item => {
      item.classList.remove('active')
      let target = item.getAttribute('data-link')
      if (target != null) {
        target = target.replace(/^#+/, '')
        if (target === id) {
          item.classList.add('active')
        }
      }
    })
  }
}

document.querySelectorAll('.panel-dropdown').forEach(trigger => {
  trigger.addEventListener('hide.bs.dropdown', event => {
    if (event.clickEvent != null) {
      let target = event.clickEvent.srcElement.getAttribute('data-link')
      if (target != null) {
        trigger.querySelectorAll('.panel-dropdown .dropdown-item').forEach(item => {
          item.classList.remove('active')
        })
        target = target.replace(/^#+/, '')
        const btn = document.getElementById(target)
        if (btn != null) {
          event.clickEvent.srcElement.classList.add('active')
          trigger.querySelector('.dropdown-toggle').textContent = event.clickEvent.srcElement.textContent
          btn.click()
        }
      }
    }
  })
})

document.querySelectorAll('.nav-panel .nav-link').forEach(trigger => {
  trigger.addEventListener('click', event => {
    const companion = event.srcElement.parentElement.parentElement.getAttribute('data-companion')
    if (companion != null) {
      updateDropdown(companion, trigger.getAttribute('id'), trigger.textContent.trim())
    }
  })
})

;
const fixed = true
const navbar = document.querySelector('.navbar')
const togglers = document.querySelectorAll('.main-nav-toggler')
const modeSelectors = document.querySelectorAll('.switch-mode-collapsed')
const colorsBG = ['body', 'secondary', 'tertiary']

let scrollPosition = 0

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function getStyle(el, styleProp) {
    let y
    
    if (window.getComputedStyle) {
      y = document.defaultView.getComputedStyle(el).getPropertyValue(styleProp)
    } else if (el.currentStyle) {
      y = el.currentStyle[styleProp]
    }

    return y
}

function updateNavbarColor () {
  const scrollTop = window.pageYOffset
  const scrollBottom = scrollTop + navbar.offsetHeight

  // find which section is currently under the navbar
  let currentSection = null
  const sections = document.querySelectorAll('article,section,footer')
  let currentIndex = -1

  sections.forEach(section => {
    const rect = section.getBoundingClientRect()
    const sectionTop = scrollTop + rect.top
    const sectionBottom = sectionTop + section.offsetHeight - 1

    // check if navbar overlaps with this section
    if (scrollTop <= sectionBottom && scrollBottom >= sectionTop) {
      let index = getStyle(section, 'z-index')
      if (index === 'auto') {
        index = 1
      }
      if (index > currentIndex) {
        currentSection = section
        currentIndex = index
      }
    }
  })

  // use main part as backup (defined in baseof.html template)
  if (!currentSection) {
    currentSection = document.querySelector('main')
  }

  if (currentSection) {
    adaptToSection(currentSection)
  }
}

function getBackgroundColor (section) {
  // get computed background color of the section
  let color = window.getComputedStyle(section).backgroundColor

  // use body background when section background is undefined or transparent
  if (color === 'rgba(0, 0, 0, 0)' || color === 'transparent') {
    color = window.getComputedStyle(document.body).getPropertyValue('background-color')
  }

  return color
}

function adaptToSection (section) {
  // retrieve the section background color, using body color as fallback
  const color = getBackgroundColor(section)

  // determine if the background is light or dark
  const isLightBackground = isLightColor(section, color)

  // set appropriate mode class
  const nav = document.querySelector('.navbar')
  if (isLightBackground) {
    if (navbar.dataset.bsTheme !== 'light') {
      navbar.dataset.bsTheme = 'light'
    }
  } else {
    if (navbar.dataset.bsTheme !== 'dark') {
      navbar.dataset.bsTheme = 'dark'
    }
  }

  // update semi-transparent background color of navbar
  const rgb = parseRGB(color)
  if (rgb) {
    navbar.style.backgroundColor = `rgba(${rgb.r},${rgb.g},${rgb.b},.4)`
  }
}

function isLightColor (section, color) {
  if (section.dataset.bsTheme === 'light') {
    return true
  }

  if (section.dataset.bsTheme === 'dark') {
    return false
  }

  // parse RGB color of the section backgroiund
  const rgb = parseRGB(color)
  if (!rgb) return true // Default to light if can't parse

  // calculate relative luminance
  const luminance = calculateLuminance(rgb.r, rgb.g, rgb.b)

  // return true if light (luminance > 0.5)
  return luminance > 0.5
}

function parseRGB (color) {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (match) {
    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3])
    }
  }
  return null
}

function calculateLuminance (r, g, b) {
  // convert RGB to relative luminance using sRGB formula
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

function updateNavbar () {
  if (navbar.dataset.transparent) {
    updateNavbarColor()
  } else {
    let storedTheme
    if (typeof getLocalStorage === "function") {
      storedTheme = getLocalStorage('theme', null, 'functional')
    }

    if (window.scrollY > 75) {
      navbar.classList.add('nav-active')
      if (storedTheme) {
        navbar.setAttribute('data-bs-theme', storedTheme)
      }
    } else {
      navbar.classList.remove('nav-active')
      const defaultTheme = navbar.getAttribute('data-bs-overlay')

      const targetTheme = defaultTheme ? defaultTheme : storedTheme
      if (targetTheme) {
        navbar.setAttribute('data-bs-theme', defaultTheme)
      }
    }
  }
}

if ((navbar !== null) && (window.performance.getEntriesByType)) {
  if (window.performance.getEntriesByType('navigation')[0].type === 'reload') {
    fixed && updateNavbar()
  }
}

if (navbar !== null && togglers !== null) {
  // initialize and update the navbar on load, on resize, and on scroll
  document.addEventListener('DOMContentLoaded', () => { fixed && updateNavbar() })
  document.addEventListener('resize', () => fixed && updateNavbar())
  document.addEventListener('scroll', () => fixed && updateNavbar())

  // hook up collapse events
  document.querySelectorAll('.navbar-collapse').forEach((collapse) => {
    collapse.addEventListener('show.bs.collapse', function () {
      scrollPosition = window.pageYOffset
      document.body.style.top = `-${scrollPosition}px`
      document.body.classList.add('navbar-open')
    })
    collapse.addEventListener('hide.bs.collapse', function () {
      document.body.classList.remove('navbar-open')
      document.body.style.top = ''
      window.scrollTo({ top: scrollPosition, behavior: 'instant' })
    })
  })

  // observe state changes to the site's color mode
  const html = document.querySelector('html')
  const config = {
    attributes: true,
    attributeFilter: ['data-bs-theme']
  }
  const Observer = new MutationObserver(() => {
    if (fixed) {
      // wait for the theme animation to finish
      sleep(600).then(() => { 
        updateNavbar() 
      })
    }
  })
  Observer.observe(html, config)

  // initialize background color
  if (!navbar.dataset.transparent) {
    const color = (navbar.getAttribute('data-navbar-color') || 'body')
    const bg = colorsBG.includes(color) ? `var(--bs-${color}-bg)` : `var(--bs-navbar-color-${color})`
    navbar.style.setProperty('--bs-navbar-expanded-color', bg)
  }

  // update the navbar background color when expanded
  for (let i = 0; i < togglers.length; ++i) {
    togglers[i].onclick = () => {
      navbar.classList.toggle('navbar-expanded')
    }
  }

  // invoke the navbar toggler for each mode switcher to collapse the main menu afterwards
  for (let i = 0; i < modeSelectors.length; ++i) {
    modeSelectors[i].onclick = () => {
      for (let j = 0; j < togglers.length; ++j) {
        const toggler = togglers[j]
        if (toggler.getAttribute('aria-expanded') === 'true') {
          toggler.click()
        }
      }
    }
  }
}

;
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
// eslint-disable-next-line no-undef, no-unused-vars
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

;
// Adapted from: https://dev.to/j471n/how-to-share-anything-from-your-website-by-web-share-api-1h5g

// function for Web Share API
function webShareAPI (title, description, link) {
  navigator
    .share({
      title,
      text: description,
      url: link
    })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing', error))
}

const shareButtons = document.querySelectorAll('[data-sharing-url]')
shareButtons.forEach(btn => {
  if (navigator.share) {
    const title = btn.getAttribute('data-sharing-title')
    const description = btn.getAttribute('data-sharing-description')
    const url = btn.getAttribute('data-sharing-url')

    // show button if it supports webShareAPI
    btn.style.display = 'block'
    btn.addEventListener('click', () =>
      webShareAPI(title, description, url)
    )
  } else {
    // hide button if host does not support Web Share API
    btn.style.display = 'none'
  }
})
;
// Script to move all embedded toast messages into a container with id 'toast-container'. The container ensures multiple
// toast messages are stacked properly. The script targets all elements specified by a 'data-toast-target' and ensures
// the click event of the origin is linked as well.

const container = document.getElementById('toast-container')
if (container !== null) {
  // process all data-toast-target elements
  document.querySelectorAll('[data-toast-target]').forEach(trigger => {
    const target = document.getElementById(trigger.getAttribute('data-toast-target'))
    if (target !== null) {
      // move the element to the toast containr
      container.appendChild(target)

      // eslint-disable-next-line no-undef
      const toast = bootstrap.Toast.getOrCreateInstance(target)
      if (toast !== null) {
        // associate the click event of the origin with the toast element
        trigger.addEventListener('click', () => {
          toast.show()
        })
      }
    }
  })
}

;
const btnTOCShowMore = document.getElementById('btnTOCShowMore')
if (btnTOCShowMore !== null) {
  btnTOCShowMore.addEventListener('click', (e) => {
    btnTOCShowMore.style.display = 'none'
  })
}

const btnTOCShowLess = document.getElementById('btnTOCShowLess')
if ((btnTOCShowLess !== null) && (btnTOCShowMore !== null)) {
  btnTOCShowLess.addEventListener('click', (e) => {
    btnTOCShowMore.style.display = 'initial'
  })
}

;
// Bootstrap tooltip example: https://getbootstrap.com/docs/5.2/components/tooltips/
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
// eslint-disable-next-line no-unused-vars, no-undef
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

;
document.querySelectorAll('[data-video-padding]').forEach(element => {
  element.style.paddingBottom = element.getAttribute('data-video-padding')
})
