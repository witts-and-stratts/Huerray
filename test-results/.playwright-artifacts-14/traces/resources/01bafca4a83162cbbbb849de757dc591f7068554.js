(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/@base-ui-components/react/esm/tabs/index.parts.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
}),
"[project]/node_modules/@base-ui-components/react/esm/utils/getStateAttributesProps.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStateAttributesProps",
    ()=>getStateAttributesProps
]);
function getStateAttributesProps(state, customMapping) {
    const props = {};
    /* eslint-disable-next-line guard-for-in */ for(const key in state){
        const value = state[key];
        if (customMapping?.hasOwnProperty(key)) {
            const customProps = customMapping[key](value);
            if (customProps != null) {
                Object.assign(props, customProps);
            }
            continue;
        }
        if (value === true) {
            props[`data-${key.toLowerCase()}`] = '';
        } else if (value) {
            props[`data-${key.toLowerCase()}`] = value.toString();
        }
    }
    return props;
}
}),
"[project]/node_modules/@base-ui-components/react/esm/utils/resolveClassName.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * If the provided className is a string, it will be returned as is.
 * Otherwise, the function will call the className function with the state as the first argument.
 *
 * @param className
 * @param state
 */ __turbopack_context__.s([
    "resolveClassName",
    ()=>resolveClassName
]);
function resolveClassName(className, state) {
    return typeof className === 'function' ? className(state) : className;
}
}),
"[project]/node_modules/@base-ui-components/react/esm/utils/resolveStyle.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * If the provided style is an object, it will be returned as is.
 * Otherwise, the function will call the style function with the state as the first argument.
 *
 * @param style
 * @param state
 */ __turbopack_context__.s([
    "resolveStyle",
    ()=>resolveStyle
]);
function resolveStyle(style, state) {
    return typeof style === 'function' ? style(state) : style;
}
}),
"[project]/node_modules/@base-ui-components/react/esm/merge-props/mergeProps.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "makeEventPreventable",
    ()=>makeEventPreventable,
    "mergeClassNames",
    ()=>mergeClassNames,
    "mergeProps",
    ()=>mergeProps,
    "mergePropsN",
    ()=>mergePropsN
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$mergeObjects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/mergeObjects.js [app-client] (ecmascript)");
;
const EMPTY_PROPS = {};
function mergeProps(a, b, c, d, e) {
    // We need to mutably own `merged`
    let merged = {
        ...resolvePropsGetter(a, EMPTY_PROPS)
    };
    if (b) {
        merged = mergeOne(merged, b);
    }
    if (c) {
        merged = mergeOne(merged, c);
    }
    if (d) {
        merged = mergeOne(merged, d);
    }
    if (e) {
        merged = mergeOne(merged, e);
    }
    return merged;
}
function mergePropsN(props) {
    if (props.length === 0) {
        return EMPTY_PROPS;
    }
    if (props.length === 1) {
        return resolvePropsGetter(props[0], EMPTY_PROPS);
    }
    // We need to mutably own `merged`
    let merged = {
        ...resolvePropsGetter(props[0], EMPTY_PROPS)
    };
    for(let i = 1; i < props.length; i += 1){
        merged = mergeOne(merged, props[i]);
    }
    return merged;
}
function mergeOne(merged, inputProps) {
    if (isPropsGetter(inputProps)) {
        return inputProps(merged);
    }
    return mutablyMergeInto(merged, inputProps);
}
/**
 * Merges two sets of props. In case of conflicts, the external props take precedence.
 */ function mutablyMergeInto(mergedProps, externalProps) {
    if (!externalProps) {
        return mergedProps;
    }
    // eslint-disable-next-line guard-for-in
    for(const propName in externalProps){
        const externalPropValue = externalProps[propName];
        switch(propName){
            case 'style':
                {
                    mergedProps[propName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$mergeObjects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeObjects"])(mergedProps.style, externalPropValue);
                    break;
                }
            case 'className':
                {
                    mergedProps[propName] = mergeClassNames(mergedProps.className, externalPropValue);
                    break;
                }
            default:
                {
                    if (isEventHandler(propName, externalPropValue)) {
                        mergedProps[propName] = mergeEventHandlers(mergedProps[propName], externalPropValue);
                    } else {
                        mergedProps[propName] = externalPropValue;
                    }
                }
        }
    }
    return mergedProps;
}
function isEventHandler(key, value) {
    // This approach is more efficient than using a regex.
    const code0 = key.charCodeAt(0);
    const code1 = key.charCodeAt(1);
    const code2 = key.charCodeAt(2);
    return code0 === 111 /* o */  && code1 === 110 /* n */  && code2 >= 65 /* A */  && code2 <= 90 /* Z */  && (typeof value === 'function' || typeof value === 'undefined');
}
function isPropsGetter(inputProps) {
    return typeof inputProps === 'function';
}
function resolvePropsGetter(inputProps, previousProps) {
    if (isPropsGetter(inputProps)) {
        return inputProps(previousProps);
    }
    return inputProps ?? EMPTY_PROPS;
}
function mergeEventHandlers(ourHandler, theirHandler) {
    if (!theirHandler) {
        return ourHandler;
    }
    if (!ourHandler) {
        return theirHandler;
    }
    return (event)=>{
        if (isSyntheticEvent(event)) {
            const baseUIEvent = event;
            makeEventPreventable(baseUIEvent);
            const result = theirHandler(baseUIEvent);
            if (!baseUIEvent.baseUIHandlerPrevented) {
                ourHandler?.(baseUIEvent);
            }
            return result;
        }
        const result = theirHandler(event);
        ourHandler?.(event);
        return result;
    };
}
function makeEventPreventable(event) {
    event.preventBaseUIHandler = ()=>{
        event.baseUIHandlerPrevented = true;
    };
    return event;
}
function mergeClassNames(ourClassName, theirClassName) {
    if (theirClassName) {
        if (ourClassName) {
            // eslint-disable-next-line prefer-template
            return theirClassName + ' ' + ourClassName;
        }
        return theirClassName;
    }
    return ourClassName;
}
function isSyntheticEvent(event) {
    return event != null && typeof event === 'object' && 'nativeEvent' in event;
}
}),
"[project]/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRenderElement",
    ()=>useRenderElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/useMergedRefs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$getReactElementRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/getReactElementRef.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$mergeObjects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/mergeObjects.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$getStateAttributesProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/utils/getStateAttributesProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$resolveClassName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/utils/resolveClassName.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$resolveStyle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/utils/resolveStyle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/merge-props/mergeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/empty.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
function useRenderElement(element, componentProps, params = {}) {
    const renderProp = componentProps.render;
    const outProps = useRenderElementProps(componentProps, params);
    if (params.enabled === false) {
        return null;
    }
    const state = params.state ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    return evaluateRenderProp(element, renderProp, outProps, state);
}
/**
 * Computes render element final props.
 */ function useRenderElementProps(componentProps, params = {}) {
    const { className: classNameProp, style: styleProp, render: renderProp } = componentProps;
    const { state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"], ref, props, stateAttributesMapping, enabled = true } = params;
    const className = enabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$resolveClassName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveClassName"])(classNameProp, state) : undefined;
    const style = enabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$resolveStyle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStyle"])(styleProp, state) : undefined;
    const stateProps = enabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$getStateAttributesProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStateAttributesProps"])(state, stateAttributesMapping) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    const outProps = enabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$mergeObjects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeObjects"])(stateProps, Array.isArray(props) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergePropsN"])(props) : props) ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    // SAFETY: The `useMergedRefs` functions use a single hook to store the same value,
    // switching between them at runtime is safe. If this assertion fails, React will
    // throw at runtime anyway.
    // This also skips the `useMergedRefs` call on the server, which is fine because
    // refs are not used on the server side.
    /* eslint-disable react-hooks/rules-of-hooks */ if (typeof document !== 'undefined') {
        if (!enabled) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMergedRefs"])(null, null);
        } else if (Array.isArray(ref)) {
            outProps.ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMergedRefsN"])([
                outProps.ref,
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$getReactElementRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getReactElementRef"])(renderProp),
                ...ref
            ]);
        } else {
            outProps.ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMergedRefs"])(outProps.ref, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$getReactElementRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getReactElementRef"])(renderProp), ref);
        }
    }
    if (!enabled) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    }
    if (className !== undefined) {
        outProps.className = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeClassNames"])(outProps.className, className);
    }
    if (style !== undefined) {
        outProps.style = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$mergeObjects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeObjects"])(outProps.style, style);
    }
    return outProps;
}
function evaluateRenderProp(element, render, props, state) {
    if (render) {
        if (typeof render === 'function') {
            return render(props, state);
        }
        const mergedProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])(props, render.props);
        mergedProps.ref = props.ref;
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneElement"](render, mergedProps);
    }
    if (element) {
        if (typeof element === 'string') {
            return renderTag(element, props);
        }
    }
    // Unreachable, but the typings on `useRenderElement` need to be reworked
    // to annotate it correctly.
    throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: Render element or function are not defined.' : "TURBOPACK unreachable");
}
function renderTag(Tag, props) {
    if (Tag === 'button') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("button", {
            type: "button",
            ...props,
            key: props.key
        });
    }
    if (Tag === 'img') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("img", {
            alt: "",
            ...props,
            key: props.key
        });
    }
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](Tag, props);
}
}),
"[project]/node_modules/@base-ui-components/react/esm/composite/list/CompositeListContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompositeListContext",
    ()=>CompositeListContext,
    "useCompositeListContext",
    ()=>useCompositeListContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
const CompositeListContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"]({
    register: ()=>{},
    unregister: ()=>{},
    subscribeMapChange: ()=>{
        return ()=>{};
    },
    elementsRef: {
        current: []
    },
    nextIndexRef: {
        current: 0
    }
});
if ("TURBOPACK compile-time truthy", 1) CompositeListContext.displayName = "CompositeListContext";
function useCompositeListContext() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](CompositeListContext);
}
}),
"[project]/node_modules/@base-ui-components/react/esm/composite/list/CompositeList.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompositeList",
    ()=>CompositeList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/useRefWithInit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeListContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/composite/list/CompositeListContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
/* eslint-disable no-bitwise */ 'use client';
;
;
;
;
;
;
function CompositeList(props) {
    const { children, elementsRef, labelsRef, onMapChange: onMapChangeProp } = props;
    const onMapChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])(onMapChangeProp);
    const nextIndexRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](0);
    const listeners = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRefWithInit"])(createListeners).current;
    // We use a stable `map` to avoid O(n^2) re-allocation costs for large lists.
    // `mapTick` is our re-render trigger mechanism. We also need to update the
    // elements and label refs, but there's a lot of async work going on and sometimes
    // the effect that handles `onMapChange` gets called after those refs have been
    // filled, and we don't want to lose those values by setting their lengths to `0`.
    // We also need to have them at the proper length because floating-ui uses that
    // information for list navigation.
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRefWithInit"])(createMap).current;
    // `mapTick` uses a counter rather than objects for low precision-loss risk and better memory efficiency
    const [mapTick, setMapTick] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](0);
    const lastTickRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](mapTick);
    const register = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "CompositeList.useStableCallback[register]": (node, metadata)=>{
            map.set(node, metadata ?? null);
            lastTickRef.current += 1;
            setMapTick(lastTickRef.current);
        }
    }["CompositeList.useStableCallback[register]"]);
    const unregister = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "CompositeList.useStableCallback[unregister]": (node)=>{
            map.delete(node);
            lastTickRef.current += 1;
            setMapTick(lastTickRef.current);
        }
    }["CompositeList.useStableCallback[unregister]"]);
    const sortedMap = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "CompositeList.useMemo[sortedMap]": ()=>{
            // `mapTick` is the `useMemo` trigger as `map` is stable.
            disableEslintWarning(mapTick);
            const newMap = new Map();
            // Filter out disconnected elements before sorting to avoid inconsistent
            // compareDocumentPosition results when elements are detached from the DOM.
            const sortedNodes = Array.from(map.keys()).filter({
                "CompositeList.useMemo[sortedMap].sortedNodes": (node)=>node.isConnected
            }["CompositeList.useMemo[sortedMap].sortedNodes"]).sort(sortByDocumentPosition);
            sortedNodes.forEach({
                "CompositeList.useMemo[sortedMap]": (node, index)=>{
                    const metadata = map.get(node) ?? {};
                    newMap.set(node, {
                        ...metadata,
                        index
                    });
                }
            }["CompositeList.useMemo[sortedMap]"]);
            return newMap;
        }
    }["CompositeList.useMemo[sortedMap]"], [
        map,
        mapTick
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "CompositeList.useIsoLayoutEffect": ()=>{
            if (typeof MutationObserver !== 'function' || sortedMap.size === 0) {
                return undefined;
            }
            const mutationObserver = new MutationObserver({
                "CompositeList.useIsoLayoutEffect": (entries)=>{
                    const diff = new Set();
                    const updateDiff = {
                        "CompositeList.useIsoLayoutEffect.updateDiff": (node)=>diff.has(node) ? diff.delete(node) : diff.add(node)
                    }["CompositeList.useIsoLayoutEffect.updateDiff"];
                    entries.forEach({
                        "CompositeList.useIsoLayoutEffect": (entry)=>{
                            entry.removedNodes.forEach(updateDiff);
                            entry.addedNodes.forEach(updateDiff);
                        }
                    }["CompositeList.useIsoLayoutEffect"]);
                    if (diff.size === 0) {
                        lastTickRef.current += 1;
                        setMapTick(lastTickRef.current);
                    }
                }
            }["CompositeList.useIsoLayoutEffect"]);
            sortedMap.forEach({
                "CompositeList.useIsoLayoutEffect": (_, node)=>{
                    if (node.parentElement) {
                        mutationObserver.observe(node.parentElement, {
                            childList: true
                        });
                    }
                }
            }["CompositeList.useIsoLayoutEffect"]);
            return ({
                "CompositeList.useIsoLayoutEffect": ()=>{
                    mutationObserver.disconnect();
                }
            })["CompositeList.useIsoLayoutEffect"];
        }
    }["CompositeList.useIsoLayoutEffect"], [
        sortedMap
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "CompositeList.useIsoLayoutEffect": ()=>{
            const shouldUpdateLengths = lastTickRef.current === mapTick;
            if (shouldUpdateLengths) {
                if (elementsRef.current.length !== sortedMap.size) {
                    elementsRef.current.length = sortedMap.size;
                }
                if (labelsRef && labelsRef.current.length !== sortedMap.size) {
                    labelsRef.current.length = sortedMap.size;
                }
                nextIndexRef.current = sortedMap.size;
            }
            onMapChange(sortedMap);
        }
    }["CompositeList.useIsoLayoutEffect"], [
        onMapChange,
        sortedMap,
        elementsRef,
        labelsRef,
        mapTick
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "CompositeList.useIsoLayoutEffect": ()=>{
            return ({
                "CompositeList.useIsoLayoutEffect": ()=>{
                    elementsRef.current = [];
                }
            })["CompositeList.useIsoLayoutEffect"];
        }
    }["CompositeList.useIsoLayoutEffect"], [
        elementsRef
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "CompositeList.useIsoLayoutEffect": ()=>{
            return ({
                "CompositeList.useIsoLayoutEffect": ()=>{
                    if (labelsRef) {
                        labelsRef.current = [];
                    }
                }
            })["CompositeList.useIsoLayoutEffect"];
        }
    }["CompositeList.useIsoLayoutEffect"], [
        labelsRef
    ]);
    const subscribeMapChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "CompositeList.useStableCallback[subscribeMapChange]": (fn)=>{
            listeners.add(fn);
            return ({
                "CompositeList.useStableCallback[subscribeMapChange]": ()=>{
                    listeners.delete(fn);
                }
            })["CompositeList.useStableCallback[subscribeMapChange]"];
        }
    }["CompositeList.useStableCallback[subscribeMapChange]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "CompositeList.useIsoLayoutEffect": ()=>{
            listeners.forEach({
                "CompositeList.useIsoLayoutEffect": (l)=>l(sortedMap)
            }["CompositeList.useIsoLayoutEffect"]);
        }
    }["CompositeList.useIsoLayoutEffect"], [
        listeners,
        sortedMap
    ]);
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "CompositeList.useMemo[contextValue]": ()=>({
                register,
                unregister,
                subscribeMapChange,
                elementsRef,
                labelsRef,
                nextIndexRef
            })
    }["CompositeList.useMemo[contextValue]"], [
        register,
        unregister,
        subscribeMapChange,
        elementsRef,
        labelsRef,
        nextIndexRef
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeListContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompositeListContext"].Provider, {
        value: contextValue,
        children: children
    });
}
function createMap() {
    return new Map();
}
function createListeners() {
    return new Set();
}
function sortByDocumentPosition(a, b) {
    const position = a.compareDocumentPosition(b);
    if (position & Node.DOCUMENT_POSITION_FOLLOWING || position & Node.DOCUMENT_POSITION_CONTAINED_BY) {
        return -1;
    }
    if (position & Node.DOCUMENT_POSITION_PRECEDING || position & Node.DOCUMENT_POSITION_CONTAINS) {
        return 1;
    }
    return 0;
}
function disableEslintWarning(_) {}
}),
"[project]/node_modules/@base-ui-components/react/esm/direction-provider/DirectionContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DirectionContext",
    ()=>DirectionContext,
    "useDirection",
    ()=>useDirection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
const DirectionContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) DirectionContext.displayName = "DirectionContext";
function useDirection() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](DirectionContext);
    return context?.direction ?? 'ltr';
}
}),
"[project]/node_modules/@base-ui-components/react/esm/tabs/root/TabsRootContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsRootContext",
    ()=>TabsRootContext,
    "useTabsRootContext",
    ()=>useTabsRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
const TabsRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) TabsRootContext.displayName = "TabsRootContext";
function useTabsRootContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](TabsRootContext);
    if (context === undefined) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: TabsRootContext is missing. Tabs parts must be placed within <Tabs.Root>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/node_modules/@base-ui-components/react/esm/tabs/root/TabsRootDataAttributes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsRootDataAttributes",
    ()=>TabsRootDataAttributes
]);
let TabsRootDataAttributes = /*#__PURE__*/ function(TabsRootDataAttributes) {
    /**
   * Indicates the direction of the activation (based on the previous active tab).
   * @type {'left' | 'right' | 'up' | 'down' | 'none'}
   */ TabsRootDataAttributes["activationDirection"] = "data-activation-direction";
    /**
   * Indicates the orientation of the tabs.
   * @type {'horizontal' | 'vertical'}
   */ TabsRootDataAttributes["orientation"] = "data-orientation";
    return TabsRootDataAttributes;
}({});
}),
"[project]/node_modules/@base-ui-components/react/esm/tabs/root/stateAttributesMapping.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "tabsStateAttributesMapping",
    ()=>tabsStateAttributesMapping
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootDataAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/tabs/root/TabsRootDataAttributes.js [app-client] (ecmascript)");
;
const tabsStateAttributesMapping = {
    tabActivationDirection: (dir)=>({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootDataAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsRootDataAttributes"].activationDirection]: dir
        })
};
}),
"[project]/node_modules/@base-ui-components/react/esm/tabs/root/TabsRoot.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsRoot",
    ()=>TabsRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useControlled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/useControlled.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/composite/list/CompositeList.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/direction-provider/DirectionContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/tabs/root/TabsRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/tabs/root/stateAttributesMapping.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
const TabsRoot = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function TabsRoot(componentProps, forwardedRef) {
    const { className, defaultValue = 0, onValueChange: onValueChangeProp, orientation = 'horizontal', render, value: valueProp, ...elementProps } = componentProps;
    const direction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDirection"])();
    const tabPanelRefs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"]([]);
    const [mountedTabPanels, setMountedTabPanels] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "TabsRoot.TabsRoot.useState": ()=>new Map()
    }["TabsRoot.TabsRoot.useState"]);
    const [value, setValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useControlled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useControlled"])({
        controlled: valueProp,
        default: defaultValue,
        name: 'Tabs',
        state: 'value'
    });
    const [tabMap, setTabMap] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "TabsRoot.TabsRoot.useState": ()=>new Map()
    }["TabsRoot.TabsRoot.useState"]);
    const [tabActivationDirection, setTabActivationDirection] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('none');
    const onValueChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "TabsRoot.TabsRoot.useStableCallback[onValueChange]": (newValue, eventDetails)=>{
            onValueChangeProp?.(newValue, eventDetails);
            if (eventDetails.isCanceled) {
                return;
            }
            setValue(newValue);
            setTabActivationDirection(eventDetails.activationDirection);
        }
    }["TabsRoot.TabsRoot.useStableCallback[onValueChange]"]);
    const registerMountedTabPanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "TabsRoot.TabsRoot.useStableCallback[registerMountedTabPanel]": (panelValue, panelId)=>{
            setMountedTabPanels({
                "TabsRoot.TabsRoot.useStableCallback[registerMountedTabPanel]": (prev)=>{
                    if (prev.get(panelValue) === panelId) {
                        return prev;
                    }
                    const next = new Map(prev);
                    next.set(panelValue, panelId);
                    return next;
                }
            }["TabsRoot.TabsRoot.useStableCallback[registerMountedTabPanel]"]);
        }
    }["TabsRoot.TabsRoot.useStableCallback[registerMountedTabPanel]"]);
    const unregisterMountedTabPanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "TabsRoot.TabsRoot.useStableCallback[unregisterMountedTabPanel]": (panelValue, panelId)=>{
            setMountedTabPanels({
                "TabsRoot.TabsRoot.useStableCallback[unregisterMountedTabPanel]": (prev)=>{
                    if (!prev.has(panelValue) || prev.get(panelValue) !== panelId) {
                        return prev;
                    }
                    const next = new Map(prev);
                    next.delete(panelValue);
                    return next;
                }
            }["TabsRoot.TabsRoot.useStableCallback[unregisterMountedTabPanel]"]);
        }
    }["TabsRoot.TabsRoot.useStableCallback[unregisterMountedTabPanel]"]);
    // get the `id` attribute of <Tabs.Panel> to set as the value of `aria-controls` on <Tabs.Tab>
    const getTabPanelIdByValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "TabsRoot.TabsRoot.useCallback[getTabPanelIdByValue]": (tabValue)=>{
            return mountedTabPanels.get(tabValue);
        }
    }["TabsRoot.TabsRoot.useCallback[getTabPanelIdByValue]"], [
        mountedTabPanels
    ]);
    // get the `id` attribute of <Tabs.Tab> to set as the value of `aria-labelledby` on <Tabs.Panel>
    const getTabIdByPanelValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "TabsRoot.TabsRoot.useCallback[getTabIdByPanelValue]": (tabPanelValue)=>{
            for (const tabMetadata of tabMap.values()){
                if (tabPanelValue === tabMetadata?.value) {
                    return tabMetadata?.id;
                }
            }
            return undefined;
        }
    }["TabsRoot.TabsRoot.useCallback[getTabIdByPanelValue]"], [
        tabMap
    ]);
    // used in `useActivationDirectionDetector` for setting data-activation-direction
    const getTabElementBySelectedValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "TabsRoot.TabsRoot.useCallback[getTabElementBySelectedValue]": (selectedValue)=>{
            if (selectedValue === undefined) {
                return null;
            }
            for (const [tabElement, tabMetadata] of tabMap.entries()){
                if (tabMetadata != null && selectedValue === (tabMetadata.value ?? tabMetadata.index)) {
                    return tabElement;
                }
            }
            return null;
        }
    }["TabsRoot.TabsRoot.useCallback[getTabElementBySelectedValue]"], [
        tabMap
    ]);
    const tabsContextValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "TabsRoot.TabsRoot.useMemo[tabsContextValue]": ()=>({
                direction,
                getTabElementBySelectedValue,
                getTabIdByPanelValue,
                getTabPanelIdByValue,
                onValueChange,
                orientation,
                registerMountedTabPanel,
                setTabMap,
                unregisterMountedTabPanel,
                tabActivationDirection,
                value
            })
    }["TabsRoot.TabsRoot.useMemo[tabsContextValue]"], [
        direction,
        getTabElementBySelectedValue,
        getTabIdByPanelValue,
        getTabPanelIdByValue,
        onValueChange,
        orientation,
        registerMountedTabPanel,
        setTabMap,
        unregisterMountedTabPanel,
        tabActivationDirection,
        value
    ]);
    const state = {
        orientation,
        tabActivationDirection
    };
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        state,
        ref: forwardedRef,
        props: elementProps,
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tabsStateAttributesMapping"]
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsRootContext"].Provider, {
        value: tabsContextValue,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompositeList"], {
            elementsRef: tabPanelRefs,
            children: element
        })
    });
});
if ("TURBOPACK compile-time truthy", 1) TabsRoot.displayName = "TabsRoot";
}),
"[project]/node_modules/@base-ui-components/react/esm/utils/useBaseUiId.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBaseUiId",
    ()=>useBaseUiId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/useId.js [app-client] (ecmascript)");
'use client';
;
function useBaseUiId(idOverride) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])(idOverride, 'base-ui');
}
}),
"[project]/node_modules/@base-ui-components/react/esm/composite/root/CompositeRootContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompositeRootContext",
    ()=>CompositeRootContext,
    "useCompositeRootContext",
    ()=>useCompositeRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
const CompositeRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) CompositeRootContext.displayName = "CompositeRootContext";
function useCompositeRootContext(optional = false) {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](CompositeRootContext);
    if (context === undefined && !optional) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: CompositeRootContext is missing. Composite parts must be placed within <Composite.Root>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/node_modules/@base-ui-components/react/esm/utils/useFocusableWhenDisabled.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFocusableWhenDisabled",
    ()=>useFocusableWhenDisabled
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
function useFocusableWhenDisabled(parameters) {
    const { focusableWhenDisabled, disabled, composite = false, tabIndex: tabIndexProp = 0, isNativeButton } = parameters;
    const isFocusableComposite = composite && focusableWhenDisabled !== false;
    const isNonFocusableComposite = composite && focusableWhenDisabled === false;
    // we can't explicitly assign `undefined` to any of these props because it
    // would otherwise prevent subsequently merged props from setting them
    const props = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useFocusableWhenDisabled.useMemo[props]": ()=>{
            const additionalProps = {
                // allow Tabbing away from focusableWhenDisabled elements
                onKeyDown (event) {
                    if (disabled && focusableWhenDisabled && event.key !== 'Tab') {
                        event.preventDefault();
                    }
                }
            };
            if (!composite) {
                additionalProps.tabIndex = tabIndexProp;
                if (!isNativeButton && disabled) {
                    additionalProps.tabIndex = focusableWhenDisabled ? tabIndexProp : -1;
                }
            }
            if (isNativeButton && (focusableWhenDisabled || isFocusableComposite) || !isNativeButton && disabled) {
                additionalProps['aria-disabled'] = disabled;
            }
            if (isNativeButton && (!focusableWhenDisabled || isNonFocusableComposite)) {
                additionalProps.disabled = disabled;
            }
            return additionalProps;
        }
    }["useFocusableWhenDisabled.useMemo[props]"], [
        composite,
        disabled,
        focusableWhenDisabled,
        isFocusableComposite,
        isNonFocusableComposite,
        isNativeButton,
        tabIndexProp
    ]);
    return {
        props
    };
}
}),
"[project]/node_modules/@base-ui-components/react/esm/use-button/useButton.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useButton",
    ()=>useButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/error.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/merge-props/mergeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/composite/root/CompositeRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useFocusableWhenDisabled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/utils/useFocusableWhenDisabled.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function useButton(parameters = {}) {
    const { disabled = false, focusableWhenDisabled, tabIndex = 0, native: isNativeButton = true } = parameters;
    const elementRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const isCompositeItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompositeRootContext"])(true) !== undefined;
    const isValidLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useButton.useStableCallback[isValidLink]": ()=>{
            const element = elementRef.current;
            return Boolean(element?.tagName === 'A' && element?.href);
        }
    }["useButton.useStableCallback[isValidLink]"]);
    const { props: focusableWhenDisabledProps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useFocusableWhenDisabled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFocusableWhenDisabled"])({
        focusableWhenDisabled,
        disabled,
        composite: isCompositeItem,
        tabIndex,
        isNativeButton
    });
    if ("TURBOPACK compile-time truthy", 1) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
            "useButton.useEffect": ()=>{
                if (!elementRef.current) {
                    return;
                }
                const isButtonTag = elementRef.current.tagName === 'BUTTON';
                if (isNativeButton) {
                    if (!isButtonTag) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["error"])('A component that acts as a button was not rendered as a native <button>, which does not match the default. Ensure that the element passed to the `render` prop of the component is a real <button>, or set the `nativeButton` prop on the component to `false`.');
                    }
                } else if (isButtonTag) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["error"])('A component that acts as a button was rendered as a native <button>, which does not match the default. Ensure that the element passed to the `render` prop of the component is not a real <button>, or set the `nativeButton` prop on the component to `true`.');
                }
            }
        }["useButton.useEffect"], [
            isNativeButton
        ]);
    }
    // handles a disabled composite button rendering another button, e.g.
    // <Toolbar.Button disabled render={<Menu.Trigger />} />
    // the `disabled` prop needs to pass through 2 `useButton`s then finally
    // delete the `disabled` attribute from DOM
    const updateDisabled = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useButton.useCallback[updateDisabled]": ()=>{
            const element = elementRef.current;
            if (!isButtonElement(element)) {
                return;
            }
            if (isCompositeItem && disabled && focusableWhenDisabledProps.disabled === undefined && element.disabled) {
                element.disabled = false;
            }
        }
    }["useButton.useCallback[updateDisabled]"], [
        disabled,
        focusableWhenDisabledProps.disabled,
        isCompositeItem
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(updateDisabled, [
        updateDisabled
    ]);
    const getButtonProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useButton.useCallback[getButtonProps]": (externalProps = {})=>{
            const { onClick: externalOnClick, onMouseDown: externalOnMouseDown, onKeyUp: externalOnKeyUp, onKeyDown: externalOnKeyDown, onPointerDown: externalOnPointerDown, ...otherExternalProps } = externalProps;
            const type = isNativeButton ? 'button' : undefined;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])({
                type,
                onClick (event) {
                    if (disabled) {
                        event.preventDefault();
                        return;
                    }
                    externalOnClick?.(event);
                },
                onMouseDown (event) {
                    if (!disabled) {
                        externalOnMouseDown?.(event);
                    }
                },
                onKeyDown (event) {
                    if (!disabled) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeEventPreventable"])(event);
                        externalOnKeyDown?.(event);
                    }
                    if (event.baseUIHandlerPrevented) {
                        return;
                    }
                    const shouldClick = event.target === event.currentTarget && !isNativeButton && !isValidLink() && !disabled;
                    const isEnterKey = event.key === 'Enter';
                    const isSpaceKey = event.key === ' ';
                    // Keyboard accessibility for non interactive elements
                    if (shouldClick) {
                        if (isSpaceKey || isEnterKey) {
                            event.preventDefault();
                        }
                        if (isEnterKey) {
                            externalOnClick?.(event);
                        }
                    }
                },
                onKeyUp (event) {
                    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
                    // https://codesandbox.io/p/sandbox/button-keyup-preventdefault-dn7f0
                    // Keyboard accessibility for non interactive elements
                    if (!disabled) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeEventPreventable"])(event);
                        externalOnKeyUp?.(event);
                    }
                    if (event.baseUIHandlerPrevented) {
                        return;
                    }
                    if (event.target === event.currentTarget && !isNativeButton && !disabled && event.key === ' ') {
                        externalOnClick?.(event);
                    }
                },
                onPointerDown (event) {
                    if (disabled) {
                        event.preventDefault();
                        return;
                    }
                    externalOnPointerDown?.(event);
                }
            }, !isNativeButton ? {
                role: 'button'
            } : undefined, focusableWhenDisabledProps, otherExternalProps);
        }
    }["useButton.useCallback[getButtonProps]"], [
        disabled,
        focusableWhenDisabledProps,
        isNativeButton,
        isValidLink
    ]);
    const buttonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useButton.useStableCallback[buttonRef]": (element)=>{
            elementRef.current = element;
            updateDisabled();
        }
    }["useButton.useStableCallback[buttonRef]"]);
    return {
        getButtonProps,
        buttonRef
    };
}
function isButtonElement(elem) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(elem) && elem.tagName === 'BUTTON';
}
}),
"[project]/node_modules/@base-ui-components/react/esm/composite/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACTIVE_COMPOSITE_ITEM",
    ()=>ACTIVE_COMPOSITE_ITEM
]);
const ACTIVE_COMPOSITE_ITEM = 'data-composite-item-active';
}),
"[project]/node_modules/@base-ui-components/react/esm/composite/list/useCompositeListItem.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IndexGuessBehavior",
    ()=>IndexGuessBehavior,
    "useCompositeListItem",
    ()=>useCompositeListItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeListContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/composite/list/CompositeListContext.js [app-client] (ecmascript)");
'use client';
;
;
;
let IndexGuessBehavior = /*#__PURE__*/ function(IndexGuessBehavior) {
    IndexGuessBehavior[IndexGuessBehavior["None"] = 0] = "None";
    IndexGuessBehavior[IndexGuessBehavior["GuessFromOrder"] = 1] = "GuessFromOrder";
    return IndexGuessBehavior;
}({});
function useCompositeListItem(params = {}) {
    const { label, metadata, textRef, indexGuessBehavior, index: externalIndex } = params;
    const { register, unregister, subscribeMapChange, elementsRef, labelsRef, nextIndexRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeListContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompositeListContext"])();
    const indexRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](-1);
    const [index, setIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](externalIndex ?? (indexGuessBehavior === IndexGuessBehavior.GuessFromOrder ? ({
        "useCompositeListItem.useState": ()=>{
            if (indexRef.current === -1) {
                const newIndex = nextIndexRef.current;
                nextIndexRef.current += 1;
                indexRef.current = newIndex;
            }
            return indexRef.current;
        }
    })["useCompositeListItem.useState"] : -1));
    const componentRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const ref = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useCompositeListItem.useCallback[ref]": (node)=>{
            componentRef.current = node;
            if (index !== -1 && node !== null) {
                elementsRef.current[index] = node;
                if (labelsRef) {
                    const isLabelDefined = label !== undefined;
                    labelsRef.current[index] = isLabelDefined ? label : textRef?.current?.textContent ?? node.textContent;
                }
            }
        }
    }["useCompositeListItem.useCallback[ref]"], [
        index,
        elementsRef,
        labelsRef,
        label,
        textRef
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useCompositeListItem.useIsoLayoutEffect": ()=>{
            if (externalIndex != null) {
                return undefined;
            }
            const node = componentRef.current;
            if (node) {
                register(node, metadata);
                return ({
                    "useCompositeListItem.useIsoLayoutEffect": ()=>{
                        unregister(node);
                    }
                })["useCompositeListItem.useIsoLayoutEffect"];
            }
            return undefined;
        }
    }["useCompositeListItem.useIsoLayoutEffect"], [
        externalIndex,
        register,
        unregister,
        metadata
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useCompositeListItem.useIsoLayoutEffect": ()=>{
            if (externalIndex != null) {
                return undefined;
            }
            return subscribeMapChange({
                "useCompositeListItem.useIsoLayoutEffect": (map)=>{
                    const i = componentRef.current ? map.get(componentRef.current)?.index : null;
                    if (i != null) {
                        setIndex(i);
                    }
                }
            }["useCompositeListItem.useIsoLayoutEffect"]);
        }
    }["useCompositeListItem.useIsoLayoutEffect"], [
        externalIndex,
        subscribeMapChange,
        setIndex
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useCompositeListItem.useMemo": ()=>({
                ref,
                index
            })
    }["useCompositeListItem.useMemo"], [
        index,
        ref
    ]);
}
}),
"[project]/node_modules/@base-ui-components/react/esm/composite/item/useCompositeItem.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCompositeItem",
    ()=>useCompositeItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/useMergedRefs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/composite/root/CompositeRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$useCompositeListItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/composite/list/useCompositeListItem.js [app-client] (ecmascript)");
'use client';
;
;
;
;
function useCompositeItem(params = {}) {
    const { highlightItemOnHover, highlightedIndex, onHighlightedIndexChange } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompositeRootContext"])();
    const { ref, index } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$useCompositeListItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompositeListItem"])(params);
    const isHighlighted = highlightedIndex === index;
    const itemRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const mergedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMergedRefs"])(ref, itemRef);
    const compositeProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useCompositeItem.useMemo[compositeProps]": ()=>({
                tabIndex: isHighlighted ? 0 : -1,
                onFocus () {
                    onHighlightedIndexChange(index);
                },
                onMouseMove () {
                    const item = itemRef.current;
                    if (!highlightItemOnHover || !item) {
                        return;
                    }
                    const disabled = item.hasAttribute('disabled') || item.ariaDisabled === 'true';
                    if (!isHighlighted && !disabled) {
                        item.focus();
                    }
                }
            })
    }["useCompositeItem.useMemo[compositeProps]"], [
        isHighlighted,
        onHighlightedIndexChange,
        index,
        highlightItemOnHover
    ]);
    return {
        compositeProps,
        compositeRef: mergedRef,
        index
    };
}
}),
"[project]/node_modules/@base-ui-components/react/esm/tabs/list/TabsListContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsListContext",
    ()=>TabsListContext,
    "useTabsListContext",
    ()=>useTabsListContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
;
const TabsListContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) TabsListContext.displayName = "TabsListContext";
function useTabsListContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](TabsListContext);
    if (context === undefined) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? 'Base UI: TabsListContext is missing. TabsList parts must be placed within <Tabs.List>.' : "TURBOPACK unreachable");
    }
    return context;
}
}),
"[project]/node_modules/@base-ui-components/react/esm/utils/createBaseUIEventDetails.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createChangeEventDetails",
    ()=>createChangeEventDetails,
    "createGenericEventDetails",
    ()=>createGenericEventDetails
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/empty.js [app-client] (ecmascript)");
;
;
function createChangeEventDetails(reason, event, trigger, customProperties) {
    let canceled = false;
    let allowPropagation = false;
    const custom = customProperties ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    const details = {
        reason,
        event: event ?? new Event('base-ui'),
        cancel () {
            canceled = true;
        },
        allowPropagation () {
            allowPropagation = true;
        },
        get isCanceled () {
            return canceled;
        },
        get isPropagationAllowed () {
            return allowPropagation;
        },
        trigger,
        ...custom
    };
    return details;
}
function createGenericEventDetails(reason, event, customProperties) {
    const custom = customProperties ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    const details = {
        reason,
        event: event ?? new Event('base-ui'),
        ...custom
    };
    return details;
}
}),
"[project]/node_modules/@base-ui-components/react/esm/utils/reason-parts.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cancelOpen",
    ()=>cancelOpen,
    "chipRemovePress",
    ()=>chipRemovePress,
    "clearPress",
    ()=>clearPress,
    "closePress",
    ()=>closePress,
    "decrementPress",
    ()=>decrementPress,
    "disabled",
    ()=>disabled,
    "drag",
    ()=>drag,
    "escapeKey",
    ()=>escapeKey,
    "focusOut",
    ()=>focusOut,
    "imperativeAction",
    ()=>imperativeAction,
    "incrementPress",
    ()=>incrementPress,
    "inputBlur",
    ()=>inputBlur,
    "inputChange",
    ()=>inputChange,
    "inputClear",
    ()=>inputClear,
    "inputPaste",
    ()=>inputPaste,
    "itemPress",
    ()=>itemPress,
    "keyboard",
    ()=>keyboard,
    "linkPress",
    ()=>linkPress,
    "listNavigation",
    ()=>listNavigation,
    "none",
    ()=>none,
    "outsidePress",
    ()=>outsidePress,
    "pointer",
    ()=>pointer,
    "scrub",
    ()=>scrub,
    "siblingOpen",
    ()=>siblingOpen,
    "trackPress",
    ()=>trackPress,
    "triggerFocus",
    ()=>triggerFocus,
    "triggerHover",
    ()=>triggerHover,
    "triggerPress",
    ()=>triggerPress,
    "wheel",
    ()=>wheel,
    "windowResize",
    ()=>windowResize
]);
const none = 'none';
const triggerPress = 'trigger-press';
const triggerHover = 'trigger-hover';
const triggerFocus = 'trigger-focus';
const outsidePress = 'outside-press';
const itemPress = 'item-press';
const closePress = 'close-press';
const linkPress = 'link-press';
const clearPress = 'clear-press';
const chipRemovePress = 'chip-remove-press';
const trackPress = 'track-press';
const incrementPress = 'increment-press';
const decrementPress = 'decrement-press';
const inputChange = 'input-change';
const inputClear = 'input-clear';
const inputBlur = 'input-blur';
const inputPaste = 'input-paste';
const focusOut = 'focus-out';
const escapeKey = 'escape-key';
const listNavigation = 'list-navigation';
const keyboard = 'keyboard';
const pointer = 'pointer';
const drag = 'drag';
const wheel = 'wheel';
const scrub = 'scrub';
const cancelOpen = 'cancel-open';
const siblingOpen = 'sibling-open';
const disabled = 'disabled';
const imperativeAction = 'imperative-action';
const windowResize = 'window-resize';
}),
"[project]/node_modules/@base-ui-components/react/esm/utils/reason-parts.js [app-client] (ecmascript) <export * as REASONS>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "REASONS",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/utils/reason-parts.js [app-client] (ecmascript)");
}),
"[project]/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACTIVE_KEY",
    ()=>ACTIVE_KEY,
    "ARROW_DOWN",
    ()=>ARROW_DOWN,
    "ARROW_LEFT",
    ()=>ARROW_LEFT,
    "ARROW_RIGHT",
    ()=>ARROW_RIGHT,
    "ARROW_UP",
    ()=>ARROW_UP,
    "FOCUSABLE_ATTRIBUTE",
    ()=>FOCUSABLE_ATTRIBUTE,
    "SELECTED_KEY",
    ()=>SELECTED_KEY,
    "TYPEABLE_SELECTOR",
    ()=>TYPEABLE_SELECTOR
]);
const FOCUSABLE_ATTRIBUTE = 'data-base-ui-focusable';
const ACTIVE_KEY = 'active';
const SELECTED_KEY = 'selected';
const TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled])," + "[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
}),
"[project]/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/element.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "activeElement",
    ()=>activeElement,
    "contains",
    ()=>contains,
    "getDocument",
    ()=>getDocument,
    "getFloatingFocusElement",
    ()=>getFloatingFocusElement,
    "getTarget",
    ()=>getTarget,
    "isEventTargetWithin",
    ()=>isEventTargetWithin,
    "isRootElement",
    ()=>isRootElement,
    "isTypeableCombobox",
    ()=>isTypeableCombobox,
    "isTypeableElement",
    ()=>isTypeableElement,
    "matchesFocusVisible",
    ()=>matchesFocusVisible
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/detectBrowser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/constants.js [app-client] (ecmascript)");
;
;
;
function activeElement(doc) {
    let element = doc.activeElement;
    while(element?.shadowRoot?.activeElement != null){
        element = element.shadowRoot.activeElement;
    }
    return element;
}
function contains(parent, child) {
    if (!parent || !child) {
        return false;
    }
    const rootNode = child.getRootNode?.();
    // First, attempt with faster native method
    if (parent.contains(child)) {
        return true;
    }
    // then fallback to custom implementation with Shadow DOM support
    if (rootNode && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isShadowRoot"])(rootNode)) {
        let next = child;
        while(next){
            if (parent === next) {
                return true;
            }
            next = next.parentNode || next.host;
        }
    }
    // Give up, the result is false
    return false;
}
function getTarget(event) {
    if ('composedPath' in event) {
        return event.composedPath()[0];
    }
    // TS thinks `event` is of type never as it assumes all browsers support
    // `composedPath()`, but browsers without shadow DOM don't.
    return event.target;
}
function isEventTargetWithin(event, node) {
    if (node == null) {
        return false;
    }
    if ('composedPath' in event) {
        return event.composedPath().includes(node);
    }
    // TS thinks `event` is of type never as it assumes all browsers support composedPath, but browsers without shadow dom don't
    const eventAgain = event;
    return eventAgain.target != null && node.contains(eventAgain.target);
}
function isRootElement(element) {
    return element.matches('html,body');
}
function getDocument(node) {
    return node?.ownerDocument || document;
}
function isTypeableElement(element) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(element) && element.matches(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPEABLE_SELECTOR"]);
}
function isTypeableCombobox(element) {
    if (!element) {
        return false;
    }
    return element.getAttribute('role') === 'combobox' && isTypeableElement(element);
}
function matchesFocusVisible(element) {
    // We don't want to block focus from working with `visibleOnly`
    // (JSDOM doesn't match `:focus-visible` when the element has `:focus`)
    if (!element || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJSDOM"]) {
        return true;
    }
    try {
        return element.matches(':focus-visible');
    } catch (_e) {
        return true;
    }
}
function getFloatingFocusElement(floatingElement) {
    if (!floatingElement) {
        return null;
    }
    // Try to find the element that has `{...getFloatingProps()}` spread on it.
    // This indicates the floating element is acting as a positioning wrapper, and
    // so focus should be managed on the child element with the event handlers and
    // aria props.
    return floatingElement.hasAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FOCUSABLE_ATTRIBUTE"]) ? floatingElement : floatingElement.querySelector(`[${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FOCUSABLE_ATTRIBUTE"]}]`) || floatingElement;
}
}),
"[project]/node_modules/@base-ui-components/react/esm/tabs/tab/TabsTab.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsTab",
    ()=>TabsTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/owner.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/utils/useBaseUiId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/use-button/useButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/composite/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$item$2f$useCompositeItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/composite/item/useCompositeItem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/tabs/root/TabsRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsListContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/tabs/list/TabsListContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/utils/createBaseUIEventDetails.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/utils/reason-parts.js [app-client] (ecmascript) <export * as REASONS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/element.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
const TabsTab = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function TabsTab(componentProps, forwardedRef) {
    const { className, disabled = false, render, value, id: idProp, nativeButton = true, ...elementProps } = componentProps;
    const { value: activeTabValue, getTabPanelIdByValue, orientation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTabsRootContext"])();
    const { activateOnFocus, highlightedTabIndex, onTabActivation, setHighlightedTabIndex, tabsListElement } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsListContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTabsListContext"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    const tabMetadata = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "TabsTab.TabsTab.useMemo[tabMetadata]": ()=>({
                disabled,
                id,
                value
            })
    }["TabsTab.TabsTab.useMemo[tabMetadata]"], [
        disabled,
        id,
        value
    ]);
    const { compositeProps, compositeRef, index } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$item$2f$useCompositeItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompositeItem"])({
        metadata: tabMetadata
    });
    const active = value === activeTabValue;
    const isNavigatingRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    // Keep the highlighted item in sync with the currently active tab
    // when the value prop changes externally (controlled mode)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "TabsTab.TabsTab.useIsoLayoutEffect": ()=>{
            if (isNavigatingRef.current) {
                isNavigatingRef.current = false;
                return;
            }
            if (!(active && index > -1 && highlightedTabIndex !== index)) {
                return;
            }
            // If focus is currently within the tabs list, don't override the roving
            // focus highlight. This keeps keyboard navigation relative to the focused
            // item after an external/asynchronous selection change.
            const listElement = tabsListElement;
            if (listElement != null) {
                const activeEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeElement"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(listElement));
                if (activeEl && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contains"])(listElement, activeEl)) {
                    return;
                }
            }
            setHighlightedTabIndex(index);
        }
    }["TabsTab.TabsTab.useIsoLayoutEffect"], [
        active,
        index,
        highlightedTabIndex,
        setHighlightedTabIndex,
        disabled,
        tabsListElement
    ]);
    const { getButtonProps, buttonRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useButton"])({
        disabled,
        native: nativeButton,
        focusableWhenDisabled: true
    });
    const tabPanelId = getTabPanelIdByValue(value);
    const isPressingRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const isMainButtonRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    function onClick(event) {
        if (active || disabled) {
            return;
        }
        onTabActivation(value, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].none, event.nativeEvent, undefined, {
            activationDirection: 'none'
        }));
    }
    function onFocus(event) {
        if (active) {
            return;
        }
        if (index > -1) {
            setHighlightedTabIndex(index);
        }
        if (disabled) {
            return;
        }
        if (activateOnFocus && (!isPressingRef.current || // keyboard or touch focus
        isPressingRef.current && isMainButtonRef.current) // mouse focus
        ) {
            onTabActivation(value, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChangeEventDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$reason$2d$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__REASONS$3e$__["REASONS"].none, event.nativeEvent, undefined, {
                activationDirection: 'none'
            }));
        }
    }
    function onPointerDown(event) {
        if (active || disabled) {
            return;
        }
        isPressingRef.current = true;
        function handlePointerUp() {
            isPressingRef.current = false;
            isMainButtonRef.current = false;
        }
        if (!event.button || event.button === 0) {
            isMainButtonRef.current = true;
            const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(event.currentTarget);
            doc.addEventListener('pointerup', handlePointerUp, {
                once: true
            });
        }
    }
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "TabsTab.TabsTab.useMemo[state]": ()=>({
                disabled,
                active,
                orientation
            })
    }["TabsTab.TabsTab.useMemo[state]"], [
        disabled,
        active,
        orientation
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('button', componentProps, {
        state,
        ref: [
            forwardedRef,
            buttonRef,
            compositeRef
        ],
        props: [
            compositeProps,
            {
                role: 'tab',
                'aria-controls': tabPanelId,
                'aria-selected': active,
                id,
                onClick,
                onFocus,
                onPointerDown,
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACTIVE_COMPOSITE_ITEM"]]: active ? '' : undefined,
                onKeyDownCapture () {
                    isNavigatingRef.current = true;
                }
            },
            elementProps,
            getButtonProps
        ]
    });
    return element;
});
if ("TURBOPACK compile-time truthy", 1) TabsTab.displayName = "TabsTab";
}),
"[project]/node_modules/@base-ui-components/react/esm/tabs/indicator/prehydrationScript.min.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This file is autogenerated. Do not edit it directly.
// To update it, modify the corresponding source file and run `pnpm inline-scripts`.
// prettier-ignore
__turbopack_context__.s([
    "script",
    ()=>script
]);
const script = '!function(){const t=document.currentScript.previousElementSibling;if(!t)return;const e=t.closest(\'[role="tablist"]\');if(!e)return;const i=e.querySelector("[data-active]");if(!i)return;if(0===i.offsetWidth||0===e.offsetWidth)return;const l=getComputedStyle(e).direction;let n=0,o=0,c=0,r=0,f=0,s=0;if(null!=i&&null!=e){const t=e.getBoundingClientRect(),{left:u,top:d,width:h,height:p}=i.getBoundingClientRect();n=u-t.left+e.scrollLeft-e.clientLeft,c=d-t.top+e.scrollTop-e.clientTop,f=h,s=p,o="ltr"===l?e.scrollWidth-n-f-e.clientLeft:n-e.clientLeft,r=e.scrollHeight-c-s-e.clientTop}function u(e,i){t.style.setProperty(`--active-tab-${e}`,`${i}px`)}u("left",n),u("right",o),u("top",c),u("bottom",r),u("width",f),u("height",s),f>0&&s>0&&t.removeAttribute("hidden")}();';
}),
"[project]/node_modules/@base-ui-components/react/esm/tabs/indicator/TabsIndicatorCssVars.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsIndicatorCssVars",
    ()=>TabsIndicatorCssVars
]);
let TabsIndicatorCssVars = /*#__PURE__*/ function(TabsIndicatorCssVars) {
    /**
   * Indicates the distance on the left side from the parent's container if the tab is active.
   * @type {number}
   */ TabsIndicatorCssVars["activeTabLeft"] = "--active-tab-left";
    /**
   * Indicates the distance on the right side from the parent's container if the tab is active.
   * @type {number}
   */ TabsIndicatorCssVars["activeTabRight"] = "--active-tab-right";
    /**
   * Indicates the distance on the top side from the parent's container if the tab is active.
   * @type {number}
   */ TabsIndicatorCssVars["activeTabTop"] = "--active-tab-top";
    /**
   * Indicates the distance on the bottom side from the parent's container if the tab is active.
   * @type {number}
   */ TabsIndicatorCssVars["activeTabBottom"] = "--active-tab-bottom";
    /**
   * Indicates the width of the tab if it is active.
   * @type {number}
   */ TabsIndicatorCssVars["activeTabWidth"] = "--active-tab-width";
    /**
   * Indicates the width of the tab if it is active.
   * @type {number}
   */ TabsIndicatorCssVars["activeTabHeight"] = "--active-tab-height";
    return TabsIndicatorCssVars;
}({});
}),
"[project]/node_modules/@base-ui-components/react/esm/tabs/indicator/TabsIndicator.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsIndicator",
    ()=>TabsIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useForcedRerendering$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/useForcedRerendering.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useOnMount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/useOnMount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/direction-provider/DirectionContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/tabs/root/TabsRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/tabs/root/stateAttributesMapping.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsListContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/tabs/list/TabsListContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$indicator$2f$prehydrationScript$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/tabs/indicator/prehydrationScript.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicatorCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/tabs/indicator/TabsIndicatorCssVars.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
const stateAttributesMapping = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tabsStateAttributesMapping"],
    activeTabPosition: ()=>null,
    activeTabSize: ()=>null
};
const TabsIndicator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function TabIndicator(componentProps, forwardedRef) {
    const { className, render, renderBeforeHydration = false, ...elementProps } = componentProps;
    const { getTabElementBySelectedValue, orientation, tabActivationDirection, value } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTabsRootContext"])();
    const { tabsListElement } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsListContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTabsListContext"])();
    const [isMounted, setIsMounted] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const { value: activeTabValue } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTabsRootContext"])();
    const direction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDirection"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useOnMount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOnMount"])({
        "TabsIndicator.TabIndicator.useOnMount": ()=>setIsMounted(true)
    }["TabsIndicator.TabIndicator.useOnMount"]);
    const rerender = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useForcedRerendering$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForcedRerendering"])();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "TabsIndicator.TabIndicator.useEffect": ()=>{
            if (value != null && tabsListElement != null && typeof ResizeObserver !== 'undefined') {
                const resizeObserver = new ResizeObserver(rerender);
                resizeObserver.observe(tabsListElement);
                return ({
                    "TabsIndicator.TabIndicator.useEffect": ()=>{
                        resizeObserver.disconnect();
                    }
                })["TabsIndicator.TabIndicator.useEffect"];
            }
            return undefined;
        }
    }["TabsIndicator.TabIndicator.useEffect"], [
        value,
        tabsListElement,
        rerender
    ]);
    let left = 0;
    let right = 0;
    let top = 0;
    let bottom = 0;
    let width = 0;
    let height = 0;
    let isTabSelected = false;
    if (value != null && tabsListElement != null) {
        const activeTab = getTabElementBySelectedValue(value);
        isTabSelected = true;
        if (activeTab != null) {
            const tabsListRect = tabsListElement.getBoundingClientRect();
            const { left: tabLeft, top: tabTop, width: computedWidth, height: computedHeight } = activeTab.getBoundingClientRect();
            left = tabLeft - tabsListRect.left + tabsListElement.scrollLeft - tabsListElement.clientLeft;
            top = tabTop - tabsListRect.top + tabsListElement.scrollTop - tabsListElement.clientTop;
            width = computedWidth;
            height = computedHeight;
            right = direction === 'ltr' ? tabsListElement.scrollWidth - left - width - tabsListElement.clientLeft : left - tabsListElement.clientLeft;
            bottom = tabsListElement.scrollHeight - top - height - tabsListElement.clientTop;
        }
    }
    const activeTabPosition = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "TabsIndicator.TabIndicator.useMemo[activeTabPosition]": ()=>isTabSelected ? {
                left,
                right,
                top,
                bottom
            } : null
    }["TabsIndicator.TabIndicator.useMemo[activeTabPosition]"], [
        left,
        right,
        top,
        bottom,
        isTabSelected
    ]);
    const activeTabSize = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "TabsIndicator.TabIndicator.useMemo[activeTabSize]": ()=>isTabSelected ? {
                width,
                height
            } : null
    }["TabsIndicator.TabIndicator.useMemo[activeTabSize]"], [
        width,
        height,
        isTabSelected
    ]);
    const style = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "TabsIndicator.TabIndicator.useMemo[style]": ()=>{
            if (!isTabSelected) {
                return undefined;
            }
            return {
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicatorCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsIndicatorCssVars"].activeTabLeft]: `${left}px`,
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicatorCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsIndicatorCssVars"].activeTabRight]: `${right}px`,
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicatorCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsIndicatorCssVars"].activeTabTop]: `${top}px`,
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicatorCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsIndicatorCssVars"].activeTabBottom]: `${bottom}px`,
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicatorCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsIndicatorCssVars"].activeTabWidth]: `${width}px`,
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicatorCssVars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsIndicatorCssVars"].activeTabHeight]: `${height}px`
            };
        }
    }["TabsIndicator.TabIndicator.useMemo[style]"], [
        left,
        right,
        top,
        bottom,
        width,
        height,
        isTabSelected
    ]);
    const displayIndicator = isTabSelected && width > 0 && height > 0;
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "TabsIndicator.TabIndicator.useMemo[state]": ()=>({
                orientation,
                activeTabPosition,
                activeTabSize,
                tabActivationDirection
            })
    }["TabsIndicator.TabIndicator.useMemo[state]"], [
        orientation,
        activeTabPosition,
        activeTabSize,
        tabActivationDirection
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('span', componentProps, {
        state,
        ref: forwardedRef,
        props: [
            {
                role: 'presentation',
                style,
                hidden: !displayIndicator // do not display the indicator before the layout is settled
            },
            elementProps,
            {
                suppressHydrationWarning: true
            }
        ],
        stateAttributesMapping
    });
    if (activeTabValue == null) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            element,
            !isMounted && renderBeforeHydration && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("script", {
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML: {
                    __html: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$indicator$2f$prehydrationScript$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["script"]
                },
                suppressHydrationWarning: true
            })
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) TabsIndicator.displayName = "TabsIndicator";
}),
"[project]/node_modules/@base-ui-components/react/esm/tabs/panel/TabsPanelDataAttributes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsPanelDataAttributes",
    ()=>TabsPanelDataAttributes
]);
let TabsPanelDataAttributes = /*#__PURE__*/ function(TabsPanelDataAttributes) {
    /**
   * Indicates the index of the tab panel.
   */ TabsPanelDataAttributes["index"] = "data-index";
    /**
   * Indicates the direction of the activation (based on the previous active tab).
   * @type {'left' | 'right' | 'up' | 'down' | 'none'}
   */ TabsPanelDataAttributes["activationDirection"] = "data-activation-direction";
    /**
   * Indicates the orientation of the tabs.
   * @type {'horizontal' | 'vertical'}
   */ TabsPanelDataAttributes["orientation"] = "data-orientation";
    /**
   * Present when the panel is hidden.
   */ TabsPanelDataAttributes["hidden"] = "data-hidden";
    return TabsPanelDataAttributes;
}({});
}),
"[project]/node_modules/@base-ui-components/react/esm/tabs/panel/TabsPanel.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsPanel",
    ()=>TabsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/utils/useBaseUiId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$useCompositeListItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/composite/list/useCompositeListItem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/tabs/root/stateAttributesMapping.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/tabs/root/TabsRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$panel$2f$TabsPanelDataAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/tabs/panel/TabsPanelDataAttributes.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const TabsPanel = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function TabPanel(componentProps, forwardedRef) {
    const { className, value, render, keepMounted = false, ...elementProps } = componentProps;
    const { value: selectedValue, getTabIdByPanelValue, orientation, tabActivationDirection, registerMountedTabPanel, unregisterMountedTabPanel } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTabsRootContext"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseUiId"])();
    const metadata = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "TabsPanel.TabPanel.useMemo[metadata]": ()=>({
                id,
                value
            })
    }["TabsPanel.TabPanel.useMemo[metadata]"], [
        id,
        value
    ]);
    const { ref: listItemRef, index } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$useCompositeListItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompositeListItem"])({
        metadata
    });
    const hidden = value !== selectedValue;
    const correspondingTabId = getTabIdByPanelValue(value);
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "TabsPanel.TabPanel.useMemo[state]": ()=>({
                hidden,
                orientation,
                tabActivationDirection
            })
    }["TabsPanel.TabPanel.useMemo[state]"], [
        hidden,
        orientation,
        tabActivationDirection
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        state,
        ref: [
            forwardedRef,
            listItemRef
        ],
        props: [
            {
                'aria-labelledby': correspondingTabId,
                hidden,
                id: id ?? undefined,
                role: 'tabpanel',
                tabIndex: hidden ? -1 : 0,
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$panel$2f$TabsPanelDataAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsPanelDataAttributes"].index]: index
            },
            elementProps
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tabsStateAttributesMapping"]
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "TabsPanel.TabPanel.useIsoLayoutEffect": ()=>{
            if (hidden && !keepMounted) {
                return undefined;
            }
            if (id == null) {
                return undefined;
            }
            registerMountedTabPanel(value, id);
            return ({
                "TabsPanel.TabPanel.useIsoLayoutEffect": ()=>{
                    unregisterMountedTabPanel(value, id);
                }
            })["TabsPanel.TabPanel.useIsoLayoutEffect"];
        }
    }["TabsPanel.TabPanel.useIsoLayoutEffect"], [
        hidden,
        keepMounted,
        value,
        id,
        registerMountedTabPanel,
        unregisterMountedTabPanel
    ]);
    const shouldRender = !hidden || keepMounted;
    if (!shouldRender) {
        return null;
    }
    return element;
});
if ("TURBOPACK compile-time truthy", 1) TabsPanel.displayName = "TabsPanel";
}),
"[project]/node_modules/@base-ui-components/react/esm/composite/composite.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_KEYS",
    ()=>ALL_KEYS,
    "ALT",
    ()=>ALT,
    "ARROW_DOWN",
    ()=>ARROW_DOWN,
    "ARROW_KEYS",
    ()=>ARROW_KEYS,
    "ARROW_LEFT",
    ()=>ARROW_LEFT,
    "ARROW_RIGHT",
    ()=>ARROW_RIGHT,
    "ARROW_UP",
    ()=>ARROW_UP,
    "COMPOSITE_KEYS",
    ()=>COMPOSITE_KEYS,
    "CONTROL",
    ()=>CONTROL,
    "END",
    ()=>END,
    "HOME",
    ()=>HOME,
    "HORIZONTAL_KEYS",
    ()=>HORIZONTAL_KEYS,
    "HORIZONTAL_KEYS_WITH_EXTRA_KEYS",
    ()=>HORIZONTAL_KEYS_WITH_EXTRA_KEYS,
    "META",
    ()=>META,
    "MODIFIER_KEYS",
    ()=>MODIFIER_KEYS,
    "SHIFT",
    ()=>SHIFT,
    "VERTICAL_KEYS",
    ()=>VERTICAL_KEYS,
    "VERTICAL_KEYS_WITH_EXTRA_KEYS",
    ()=>VERTICAL_KEYS_WITH_EXTRA_KEYS,
    "isNativeInput",
    ()=>isNativeInput,
    "scrollIntoViewIfNeeded",
    ()=>scrollIntoViewIfNeeded
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-client] (ecmascript)");
;
;
const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
const HOME = 'Home';
const END = 'End';
const HORIZONTAL_KEYS = new Set([
    ARROW_LEFT,
    ARROW_RIGHT
]);
const HORIZONTAL_KEYS_WITH_EXTRA_KEYS = new Set([
    ARROW_LEFT,
    ARROW_RIGHT,
    HOME,
    END
]);
const VERTICAL_KEYS = new Set([
    ARROW_UP,
    ARROW_DOWN
]);
const VERTICAL_KEYS_WITH_EXTRA_KEYS = new Set([
    ARROW_UP,
    ARROW_DOWN,
    HOME,
    END
]);
const ARROW_KEYS = new Set([
    ...HORIZONTAL_KEYS,
    ...VERTICAL_KEYS
]);
const ALL_KEYS = new Set([
    ...ARROW_KEYS,
    HOME,
    END
]);
const COMPOSITE_KEYS = new Set([
    ARROW_UP,
    ARROW_DOWN,
    ARROW_LEFT,
    ARROW_RIGHT,
    HOME,
    END
]);
const SHIFT = 'Shift';
const CONTROL = 'Control';
const ALT = 'Alt';
const META = 'Meta';
const MODIFIER_KEYS = new Set([
    SHIFT,
    CONTROL,
    ALT,
    META
]);
function isInputElement(element) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(element) && element.tagName === 'INPUT';
}
function isNativeInput(element) {
    if (isInputElement(element) && element.selectionStart != null) {
        return true;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(element) && element.tagName === 'TEXTAREA') {
        return true;
    }
    return false;
}
function scrollIntoViewIfNeeded(scrollContainer, element, direction, orientation) {
    if (!scrollContainer || !element || !element.scrollTo) {
        return;
    }
    let targetX = scrollContainer.scrollLeft;
    let targetY = scrollContainer.scrollTop;
    const isOverflowingX = scrollContainer.clientWidth < scrollContainer.scrollWidth;
    const isOverflowingY = scrollContainer.clientHeight < scrollContainer.scrollHeight;
    if (isOverflowingX && orientation !== 'vertical') {
        const elementOffsetLeft = getOffset(scrollContainer, element, 'left');
        const containerStyles = getStyles(scrollContainer);
        const elementStyles = getStyles(element);
        if (direction === 'ltr') {
            if (elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight > scrollContainer.scrollLeft + scrollContainer.clientWidth - containerStyles.scrollPaddingRight) {
                // overflow to the right, scroll to align right edges
                targetX = elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight - scrollContainer.clientWidth + containerStyles.scrollPaddingRight;
            } else if (elementOffsetLeft - elementStyles.scrollMarginLeft < scrollContainer.scrollLeft + containerStyles.scrollPaddingLeft) {
                // overflow to the left, scroll to align left edges
                targetX = elementOffsetLeft - elementStyles.scrollMarginLeft - containerStyles.scrollPaddingLeft;
            }
        }
        if (direction === 'rtl') {
            if (elementOffsetLeft - elementStyles.scrollMarginRight < scrollContainer.scrollLeft + containerStyles.scrollPaddingLeft) {
                // overflow to the left, scroll to align left edges
                targetX = elementOffsetLeft - elementStyles.scrollMarginLeft - containerStyles.scrollPaddingLeft;
            } else if (elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight > scrollContainer.scrollLeft + scrollContainer.clientWidth - containerStyles.scrollPaddingRight) {
                // overflow to the right, scroll to align right edges
                targetX = elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight - scrollContainer.clientWidth + containerStyles.scrollPaddingRight;
            }
        }
    }
    if (isOverflowingY && orientation !== 'horizontal') {
        const elementOffsetTop = getOffset(scrollContainer, element, 'top');
        const containerStyles = getStyles(scrollContainer);
        const elementStyles = getStyles(element);
        if (elementOffsetTop - elementStyles.scrollMarginTop < scrollContainer.scrollTop + containerStyles.scrollPaddingTop) {
            // overflow upwards, align top edges
            targetY = elementOffsetTop - elementStyles.scrollMarginTop - containerStyles.scrollPaddingTop;
        } else if (elementOffsetTop + element.offsetHeight + elementStyles.scrollMarginBottom > scrollContainer.scrollTop + scrollContainer.clientHeight - containerStyles.scrollPaddingBottom) {
            // overflow downwards, align bottom edges
            targetY = elementOffsetTop + element.offsetHeight + elementStyles.scrollMarginBottom - scrollContainer.clientHeight + containerStyles.scrollPaddingBottom;
        }
    }
    scrollContainer.scrollTo({
        left: targetX,
        top: targetY,
        behavior: 'auto'
    });
}
function getOffset(ancestor, element, side) {
    const propName = side === 'left' ? 'offsetLeft' : 'offsetTop';
    let result = 0;
    while(element.offsetParent){
        result += element[propName];
        if (element.offsetParent === ancestor) {
            break;
        }
        element = element.offsetParent;
    }
    return result;
}
function getStyles(element) {
    const styles = getComputedStyle(element);
    return {
        scrollMarginTop: parseFloat(styles.scrollMarginTop) || 0,
        scrollMarginRight: parseFloat(styles.scrollMarginRight) || 0,
        scrollMarginBottom: parseFloat(styles.scrollMarginBottom) || 0,
        scrollMarginLeft: parseFloat(styles.scrollMarginLeft) || 0,
        scrollPaddingTop: parseFloat(styles.scrollPaddingTop) || 0,
        scrollPaddingRight: parseFloat(styles.scrollPaddingRight) || 0,
        scrollPaddingBottom: parseFloat(styles.scrollPaddingBottom) || 0,
        scrollPaddingLeft: parseFloat(styles.scrollPaddingLeft) || 0
    };
}
}),
"[project]/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/event.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isClickLikeEvent",
    ()=>isClickLikeEvent,
    "isMouseLikePointerType",
    ()=>isMouseLikePointerType,
    "isReactEvent",
    ()=>isReactEvent,
    "isVirtualClick",
    ()=>isVirtualClick,
    "isVirtualPointerEvent",
    ()=>isVirtualPointerEvent,
    "stopEvent",
    ()=>stopEvent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/detectBrowser.js [app-client] (ecmascript)");
;
function stopEvent(event) {
    event.preventDefault();
    event.stopPropagation();
}
function isReactEvent(event) {
    return 'nativeEvent' in event;
}
function isVirtualClick(event) {
    // FIXME: Firefox is now emitting a deprecation warning for `mozInputSource`.
    // Try to find a workaround for this. `react-aria` source still has the check.
    if (event.mozInputSource === 0 && event.isTrusted) {
        return true;
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAndroid"] && event.pointerType) {
        return event.type === 'click' && event.buttons === 1;
    }
    return event.detail === 0 && !event.pointerType;
}
function isVirtualPointerEvent(event) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJSDOM"]) {
        return false;
    }
    return !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAndroid"] && event.width === 0 && event.height === 0 || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAndroid"] && event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === 'mouse' || // iOS VoiceOver returns 0.333• for width/height.
    event.width < 1 && event.height < 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === 'touch';
}
function isMouseLikePointerType(pointerType, strict) {
    // On some Linux machines with Chromium, mouse inputs return a `pointerType`
    // of "pen": https://github.com/floating-ui/floating-ui/issues/2015
    const values = [
        'mouse',
        'pen'
    ];
    if (!strict) {
        values.push('', undefined);
    }
    return values.includes(pointerType);
}
function isClickLikeEvent(event) {
    const type = event.type;
    return type === 'click' || type === 'mousedown' || type === 'keydown' || type === 'keyup';
}
}),
"[project]/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/composite.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createGridCellMap",
    ()=>createGridCellMap,
    "findNonDisabledListIndex",
    ()=>findNonDisabledListIndex,
    "getGridCellIndexOfCorner",
    ()=>getGridCellIndexOfCorner,
    "getGridCellIndices",
    ()=>getGridCellIndices,
    "getGridNavigatedIndex",
    ()=>getGridNavigatedIndex,
    "getMaxListIndex",
    ()=>getMaxListIndex,
    "getMinListIndex",
    ()=>getMinListIndex,
    "isDifferentGridRow",
    ()=>isDifferentGridRow,
    "isIndexOutOfListBounds",
    ()=>isIndexOutOfListBounds,
    "isListIndexDisabled",
    ()=>isListIndexDisabled
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/event.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/constants.js [app-client] (ecmascript)");
;
;
;
;
function isDifferentGridRow(index, cols, prevRow) {
    return Math.floor(index / cols) !== prevRow;
}
function isIndexOutOfListBounds(listRef, index) {
    return index < 0 || index >= listRef.current.length;
}
function getMinListIndex(listRef, disabledIndices) {
    return findNonDisabledListIndex(listRef, {
        disabledIndices
    });
}
function getMaxListIndex(listRef, disabledIndices) {
    return findNonDisabledListIndex(listRef, {
        decrement: true,
        startingIndex: listRef.current.length,
        disabledIndices
    });
}
function findNonDisabledListIndex(listRef, { startingIndex = -1, decrement = false, disabledIndices, amount = 1 } = {}) {
    let index = startingIndex;
    do {
        index += decrement ? -amount : amount;
    }while (index >= 0 && index <= listRef.current.length - 1 && isListIndexDisabled(listRef, index, disabledIndices))
    return index;
}
function getGridNavigatedIndex(listRef, { event, orientation, loopFocus, rtl, cols, disabledIndices, minIndex, maxIndex, prevIndex, stopEvent: stop = false }) {
    let nextIndex = prevIndex;
    // ---------------------------------------------------------------------------
    // Detect row structure based on DOM. This works when items are grouped inside
    // elements that declare `role="row"` (e.g., Combobox.Row). We build a matrix
    // where each entry is the array of item indices for that visual row. The
    // algorithm gracefully falls back to regular `cols`-based handling when no
    // row structure can be detected.
    // ---------------------------------------------------------------------------
    const rows = [];
    const rowIndexMap = {};
    let hasRoleRow = false;
    {
        let currentRowEl = null;
        let currentRowIndex = -1;
        listRef.current.forEach((el, idx)=>{
            if (el == null) {
                return;
            }
            const rowEl = el.closest('[role="row"]');
            if (rowEl) {
                hasRoleRow = true;
            }
            if (rowEl !== currentRowEl || currentRowIndex === -1) {
                currentRowEl = rowEl;
                currentRowIndex += 1;
                rows[currentRowIndex] = [];
            }
            rows[currentRowIndex].push(idx);
            rowIndexMap[idx] = currentRowIndex;
        });
    }
    const hasDomRows = hasRoleRow && rows.length > 0 && rows.some((row)=>row.length !== cols);
    function navigateVertically(direction) {
        if (!hasDomRows || prevIndex === -1) {
            return undefined;
        }
        const currentRow = rowIndexMap[prevIndex];
        if (currentRow == null) {
            return undefined;
        }
        const colInRow = rows[currentRow].indexOf(prevIndex);
        let nextRow = direction === 'up' ? currentRow - 1 : currentRow + 1;
        if (loopFocus) {
            if (nextRow < 0) {
                nextRow = rows.length - 1;
            } else if (nextRow >= rows.length) {
                nextRow = 0;
            }
        }
        const visited = new Set();
        while(nextRow >= 0 && nextRow < rows.length && !visited.has(nextRow)){
            visited.add(nextRow);
            const targetRow = rows[nextRow];
            if (targetRow.length === 0) {
                nextRow = direction === 'up' ? nextRow - 1 : nextRow + 1;
                continue;
            }
            const clampedCol = Math.min(colInRow, targetRow.length - 1);
            // Start from the preferred column, fallback leftwards until first
            // enabled item is found.
            for(let col = clampedCol; col >= 0; col -= 1){
                const candidate = targetRow[col];
                if (!isListIndexDisabled(listRef, candidate, disabledIndices)) {
                    return candidate;
                }
            }
            // Row had no enabled items, move to next row in the same direction.
            nextRow = direction === 'up' ? nextRow - 1 : nextRow + 1;
            if (loopFocus) {
                if (nextRow < 0) {
                    nextRow = rows.length - 1;
                } else if (nextRow >= rows.length) {
                    nextRow = 0;
                }
            }
        }
        return undefined;
    }
    if (event.key === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_UP"]) {
        const domBasedCandidate = navigateVertically('up');
        if (domBasedCandidate !== undefined) {
            if (stop) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
            }
            nextIndex = domBasedCandidate;
        } else {
            // fallback to original logic
            if (stop) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
            }
            if (prevIndex === -1) {
                nextIndex = maxIndex;
            } else {
                nextIndex = findNonDisabledListIndex(listRef, {
                    startingIndex: nextIndex,
                    amount: cols,
                    decrement: true,
                    disabledIndices
                });
                if (loopFocus && (prevIndex - cols < minIndex || nextIndex < 0)) {
                    const col = prevIndex % cols;
                    const maxCol = maxIndex % cols;
                    const offset = maxIndex - (maxCol - col);
                    if (maxCol === col) {
                        nextIndex = maxIndex;
                    } else {
                        nextIndex = maxCol > col ? offset : offset - cols;
                    }
                }
            }
            if (isIndexOutOfListBounds(listRef, nextIndex)) {
                nextIndex = prevIndex;
            }
        }
    }
    if (event.key === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_DOWN"]) {
        const domBasedCandidate = navigateVertically('down');
        if (domBasedCandidate !== undefined) {
            if (stop) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
            }
            nextIndex = domBasedCandidate;
        } else {
            if (stop) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
            }
            if (prevIndex === -1) {
                nextIndex = minIndex;
            } else {
                nextIndex = findNonDisabledListIndex(listRef, {
                    startingIndex: prevIndex,
                    amount: cols,
                    disabledIndices
                });
                if (loopFocus && prevIndex + cols > maxIndex) {
                    nextIndex = findNonDisabledListIndex(listRef, {
                        startingIndex: prevIndex % cols - cols,
                        amount: cols,
                        disabledIndices
                    });
                }
            }
            if (isIndexOutOfListBounds(listRef, nextIndex)) {
                nextIndex = prevIndex;
            }
        }
    }
    // Remains on the same row/column.
    if (orientation === 'both') {
        const prevRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["floor"])(prevIndex / cols);
        if (event.key === (rtl ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_LEFT"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_RIGHT"])) {
            if (stop) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
            }
            if (prevIndex % cols !== cols - 1) {
                nextIndex = findNonDisabledListIndex(listRef, {
                    startingIndex: prevIndex,
                    disabledIndices
                });
                if (loopFocus && isDifferentGridRow(nextIndex, cols, prevRow)) {
                    nextIndex = findNonDisabledListIndex(listRef, {
                        startingIndex: prevIndex - prevIndex % cols - 1,
                        disabledIndices
                    });
                }
            } else if (loopFocus) {
                nextIndex = findNonDisabledListIndex(listRef, {
                    startingIndex: prevIndex - prevIndex % cols - 1,
                    disabledIndices
                });
            }
            if (isDifferentGridRow(nextIndex, cols, prevRow)) {
                nextIndex = prevIndex;
            }
        }
        if (event.key === (rtl ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_RIGHT"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_LEFT"])) {
            if (stop) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopEvent"])(event);
            }
            if (prevIndex % cols !== 0) {
                nextIndex = findNonDisabledListIndex(listRef, {
                    startingIndex: prevIndex,
                    decrement: true,
                    disabledIndices
                });
                if (loopFocus && isDifferentGridRow(nextIndex, cols, prevRow)) {
                    nextIndex = findNonDisabledListIndex(listRef, {
                        startingIndex: prevIndex + (cols - prevIndex % cols),
                        decrement: true,
                        disabledIndices
                    });
                }
            } else if (loopFocus) {
                nextIndex = findNonDisabledListIndex(listRef, {
                    startingIndex: prevIndex + (cols - prevIndex % cols),
                    decrement: true,
                    disabledIndices
                });
            }
            if (isDifferentGridRow(nextIndex, cols, prevRow)) {
                nextIndex = prevIndex;
            }
        }
        const lastRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["floor"])(maxIndex / cols) === prevRow;
        if (isIndexOutOfListBounds(listRef, nextIndex)) {
            if (loopFocus && lastRow) {
                nextIndex = event.key === (rtl ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_RIGHT"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARROW_LEFT"]) ? maxIndex : findNonDisabledListIndex(listRef, {
                    startingIndex: prevIndex - prevIndex % cols - 1,
                    disabledIndices
                });
            } else {
                nextIndex = prevIndex;
            }
        }
    }
    return nextIndex;
}
function createGridCellMap(sizes, cols, dense) {
    const cellMap = [];
    let startIndex = 0;
    sizes.forEach(({ width, height }, index)=>{
        if (width > cols) {
            if ("TURBOPACK compile-time truthy", 1) {
                throw new Error(("TURBOPACK compile-time truthy", 1) ? `[Floating UI]: Invalid grid - item width at index ${index} is greater than grid columns` : "TURBOPACK unreachable");
            }
        }
        let itemPlaced = false;
        if (dense) {
            startIndex = 0;
        }
        while(!itemPlaced){
            const targetCells = [];
            for(let i = 0; i < width; i += 1){
                for(let j = 0; j < height; j += 1){
                    targetCells.push(startIndex + i + j * cols);
                }
            }
            if (startIndex % cols + width <= cols && targetCells.every((cell)=>cellMap[cell] == null)) {
                targetCells.forEach((cell)=>{
                    cellMap[cell] = index;
                });
                itemPlaced = true;
            } else {
                startIndex += 1;
            }
        }
    });
    // convert into a non-sparse array
    return [
        ...cellMap
    ];
}
function getGridCellIndexOfCorner(index, sizes, cellMap, cols, corner) {
    if (index === -1) {
        return -1;
    }
    const firstCellIndex = cellMap.indexOf(index);
    const sizeItem = sizes[index];
    switch(corner){
        case 'tl':
            return firstCellIndex;
        case 'tr':
            if (!sizeItem) {
                return firstCellIndex;
            }
            return firstCellIndex + sizeItem.width - 1;
        case 'bl':
            if (!sizeItem) {
                return firstCellIndex;
            }
            return firstCellIndex + (sizeItem.height - 1) * cols;
        case 'br':
            return cellMap.lastIndexOf(index);
        default:
            return -1;
    }
}
function getGridCellIndices(indices, cellMap) {
    return cellMap.flatMap((index, cellIndex)=>indices.includes(index) ? [
            cellIndex
        ] : []);
}
function isListIndexDisabled(listRef, index, disabledIndices) {
    if (typeof disabledIndices === 'function') {
        return disabledIndices(index);
    }
    if (disabledIndices) {
        return disabledIndices.includes(index);
    }
    const element = listRef.current[index];
    if (!element) {
        return false;
    }
    return element.hasAttribute('disabled') || element.getAttribute('aria-disabled') === 'true';
}
}),
"[project]/node_modules/@base-ui-components/react/esm/composite/root/useCompositeRoot.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCompositeRoot",
    ()=>useCompositeRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$isElementDisabled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/isElementDisabled.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/useMergedRefs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/composite/composite.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/composite.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/composite/constants.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
const EMPTY_ARRAY = [];
function useCompositeRoot(params) {
    const { itemSizes, cols = 1, loopFocus = true, dense = false, orientation = 'both', direction, highlightedIndex: externalHighlightedIndex, onHighlightedIndexChange: externalSetHighlightedIndex, rootRef: externalRef, enableHomeAndEndKeys = false, stopEventPropagation = false, disabledIndices, modifierKeys = EMPTY_ARRAY } = params;
    const [internalHighlightedIndex, internalSetHighlightedIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](0);
    const isGrid = cols > 1;
    const rootRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const mergedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMergedRefs"])(rootRef, externalRef);
    const elementsRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"]([]);
    const hasSetDefaultIndexRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const highlightedIndex = externalHighlightedIndex ?? internalHighlightedIndex;
    const onHighlightedIndexChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useCompositeRoot.useStableCallback[onHighlightedIndexChange]": (index, shouldScrollIntoView = false)=>{
            (externalSetHighlightedIndex ?? internalSetHighlightedIndex)(index);
            if (shouldScrollIntoView) {
                const newActiveItem = elementsRef.current[index];
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["scrollIntoViewIfNeeded"])(rootRef.current, newActiveItem, direction, orientation);
            }
        }
    }["useCompositeRoot.useStableCallback[onHighlightedIndexChange]"]);
    const onMapChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "useCompositeRoot.useStableCallback[onMapChange]": (map)=>{
            if (map.size === 0 || hasSetDefaultIndexRef.current) {
                return;
            }
            hasSetDefaultIndexRef.current = true;
            const sortedElements = Array.from(map.keys());
            const activeItem = sortedElements.find({
                "useCompositeRoot.useStableCallback[onMapChange]": (compositeElement)=>compositeElement?.hasAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACTIVE_COMPOSITE_ITEM"])
            }["useCompositeRoot.useStableCallback[onMapChange]"]) ?? null;
            // Set the default highlighted index of an arbitrary composite item.
            const activeIndex = activeItem ? sortedElements.indexOf(activeItem) : -1;
            if (activeIndex !== -1) {
                onHighlightedIndexChange(activeIndex);
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["scrollIntoViewIfNeeded"])(rootRef.current, activeItem, direction, orientation);
        }
    }["useCompositeRoot.useStableCallback[onMapChange]"]);
    const props = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useCompositeRoot.useMemo[props]": ()=>({
                'aria-orientation': orientation === 'both' ? undefined : orientation,
                ref: mergedRef,
                onFocus (event) {
                    const element = rootRef.current;
                    if (!element || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isNativeInput"])(event.target)) {
                        return;
                    }
                    event.target.setSelectionRange(0, event.target.value.length ?? 0);
                },
                onKeyDown (event) {
                    const RELEVANT_KEYS = enableHomeAndEndKeys ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ALL_KEYS"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_KEYS"];
                    if (!RELEVANT_KEYS.has(event.key)) {
                        return;
                    }
                    if (isModifierKeySet(event, modifierKeys)) {
                        return;
                    }
                    const element = rootRef.current;
                    if (!element) {
                        return;
                    }
                    const isRtl = direction === 'rtl';
                    const horizontalForwardKey = isRtl ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_LEFT"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_RIGHT"];
                    const forwardKey = {
                        horizontal: horizontalForwardKey,
                        vertical: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_DOWN"],
                        both: horizontalForwardKey
                    }[orientation];
                    const horizontalBackwardKey = isRtl ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_RIGHT"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_LEFT"];
                    const backwardKey = {
                        horizontal: horizontalBackwardKey,
                        vertical: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_UP"],
                        both: horizontalBackwardKey
                    }[orientation];
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isNativeInput"])(event.target) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$isElementDisabled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElementDisabled"])(event.target)) {
                        const selectionStart = event.target.selectionStart;
                        const selectionEnd = event.target.selectionEnd;
                        const textContent = event.target.value ?? '';
                        // return to native textbox behavior when
                        // 1 - Shift is held to make a text selection, or if there already is a text selection
                        if (selectionStart == null || event.shiftKey || selectionStart !== selectionEnd) {
                            return;
                        }
                        // 2 - arrow-ing forward and not in the last position of the text
                        if (event.key !== backwardKey && selectionStart < textContent.length) {
                            return;
                        }
                        // 3 -arrow-ing backward and not in the first position of the text
                        if (event.key !== forwardKey && selectionStart > 0) {
                            return;
                        }
                    }
                    let nextIndex = highlightedIndex;
                    const minIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMinListIndex"])(elementsRef, disabledIndices);
                    const maxIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMaxListIndex"])(elementsRef, disabledIndices);
                    if (isGrid) {
                        const sizes = itemSizes || Array.from({
                            length: elementsRef.current.length
                        }, {
                            "useCompositeRoot.useMemo[props]": ()=>({
                                    width: 1,
                                    height: 1
                                })
                        }["useCompositeRoot.useMemo[props]"]);
                        // To calculate movements on the grid, we use hypothetical cell indices
                        // as if every item was 1x1, then convert back to real indices.
                        const cellMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createGridCellMap"])(sizes, cols, dense);
                        const minGridIndex = cellMap.findIndex({
                            "useCompositeRoot.useMemo[props].minGridIndex": (index)=>index != null && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isListIndexDisabled"])(elementsRef, index, disabledIndices)
                        }["useCompositeRoot.useMemo[props].minGridIndex"]);
                        // last enabled index
                        const maxGridIndex = cellMap.reduce({
                            "useCompositeRoot.useMemo[props].maxGridIndex": (foundIndex, index, cellIndex)=>index != null && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isListIndexDisabled"])(elementsRef, index, disabledIndices) ? cellIndex : foundIndex
                        }["useCompositeRoot.useMemo[props].maxGridIndex"], -1);
                        nextIndex = cellMap[(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGridNavigatedIndex"])({
                            current: cellMap.map({
                                "useCompositeRoot.useMemo[props]": (itemIndex)=>itemIndex ? elementsRef.current[itemIndex] : null
                            }["useCompositeRoot.useMemo[props]"])
                        }, {
                            event,
                            orientation,
                            loopFocus,
                            cols,
                            // treat undefined (empty grid spaces) as disabled indices so we
                            // don't end up in them
                            disabledIndices: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGridCellIndices"])([
                                ...disabledIndices || elementsRef.current.map({
                                    "useCompositeRoot.useMemo[props]": (_, index)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isListIndexDisabled"])(elementsRef, index) ? index : undefined
                                }["useCompositeRoot.useMemo[props]"]),
                                undefined
                            ], cellMap),
                            minIndex: minGridIndex,
                            maxIndex: maxGridIndex,
                            prevIndex: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGridCellIndexOfCorner"])(highlightedIndex > maxIndex ? minIndex : highlightedIndex, sizes, cellMap, cols, // use a corner matching the edge closest to the direction we're
                            // moving in so we don't end up in the same item. Prefer
                            // top/left over bottom/right.
                            // eslint-disable-next-line no-nested-ternary
                            event.key === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_DOWN"] ? 'bl' : event.key === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_RIGHT"] ? 'tr' : 'tl'),
                            rtl: isRtl
                        })]; // navigated cell will never be nullish
                    }
                    const forwardKeys = {
                        horizontal: [
                            horizontalForwardKey
                        ],
                        vertical: [
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_DOWN"]
                        ],
                        both: [
                            horizontalForwardKey,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_DOWN"]
                        ]
                    }[orientation];
                    const backwardKeys = {
                        horizontal: [
                            horizontalBackwardKey
                        ],
                        vertical: [
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_UP"]
                        ],
                        both: [
                            horizontalBackwardKey,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_UP"]
                        ]
                    }[orientation];
                    const preventedKeys = isGrid ? RELEVANT_KEYS : ({
                        horizontal: enableHomeAndEndKeys ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["HORIZONTAL_KEYS_WITH_EXTRA_KEYS"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["HORIZONTAL_KEYS"],
                        vertical: enableHomeAndEndKeys ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["VERTICAL_KEYS_WITH_EXTRA_KEYS"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["VERTICAL_KEYS"],
                        both: RELEVANT_KEYS
                    })[orientation];
                    if (enableHomeAndEndKeys) {
                        if (event.key === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["HOME"]) {
                            nextIndex = minIndex;
                        } else if (event.key === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["END"]) {
                            nextIndex = maxIndex;
                        }
                    }
                    if (nextIndex === highlightedIndex && (forwardKeys.includes(event.key) || backwardKeys.includes(event.key))) {
                        if (loopFocus && nextIndex === maxIndex && forwardKeys.includes(event.key)) {
                            nextIndex = minIndex;
                        } else if (loopFocus && nextIndex === minIndex && backwardKeys.includes(event.key)) {
                            nextIndex = maxIndex;
                        } else {
                            nextIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findNonDisabledListIndex"])(elementsRef, {
                                startingIndex: nextIndex,
                                decrement: backwardKeys.includes(event.key),
                                disabledIndices
                            });
                        }
                    }
                    if (nextIndex !== highlightedIndex && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isIndexOutOfListBounds"])(elementsRef, nextIndex)) {
                        if (stopEventPropagation) {
                            event.stopPropagation();
                        }
                        if (preventedKeys.has(event.key)) {
                            event.preventDefault();
                        }
                        onHighlightedIndexChange(nextIndex, true);
                        // Wait for FocusManager `returnFocus` to execute.
                        queueMicrotask({
                            "useCompositeRoot.useMemo[props]": ()=>{
                                elementsRef.current[nextIndex]?.focus();
                            }
                        }["useCompositeRoot.useMemo[props]"]);
                    }
                }
            })
    }["useCompositeRoot.useMemo[props]"], [
        cols,
        dense,
        direction,
        disabledIndices,
        elementsRef,
        enableHomeAndEndKeys,
        highlightedIndex,
        isGrid,
        itemSizes,
        loopFocus,
        mergedRef,
        modifierKeys,
        onHighlightedIndexChange,
        orientation,
        stopEventPropagation
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useCompositeRoot.useMemo": ()=>({
                props,
                highlightedIndex,
                onHighlightedIndexChange,
                elementsRef,
                disabledIndices,
                onMapChange,
                relayKeyboardEvent: props.onKeyDown
            })
    }["useCompositeRoot.useMemo"], [
        props,
        highlightedIndex,
        onHighlightedIndexChange,
        elementsRef,
        disabledIndices,
        onMapChange
    ]);
}
function isModifierKeySet(event, ignoredModifierKeys) {
    for (const key of __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MODIFIER_KEYS"].values()){
        if (ignoredModifierKeys.includes(key)) {
            continue;
        }
        if (event.getModifierState(key)) {
            return true;
        }
    }
    return false;
}
}),
"[project]/node_modules/@base-ui-components/react/esm/composite/root/CompositeRoot.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompositeRoot",
    ()=>CompositeRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/composite/list/CompositeList.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$root$2f$useCompositeRoot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/composite/root/useCompositeRoot.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/composite/root/CompositeRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/direction-provider/DirectionContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/empty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function CompositeRoot(componentProps) {
    const { render, className, refs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"], props = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"], state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"], stateAttributesMapping, highlightedIndex: highlightedIndexProp, onHighlightedIndexChange: onHighlightedIndexChangeProp, orientation, dense, itemSizes, loopFocus, cols, enableHomeAndEndKeys, onMapChange: onMapChangeProp, stopEventPropagation = true, rootRef, disabledIndices, modifierKeys, highlightItemOnHover = false, tag = 'div', ...elementProps } = componentProps;
    const direction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDirection"])();
    const { props: defaultProps, highlightedIndex, onHighlightedIndexChange, elementsRef, onMapChange: onMapChangeUnwrapped, relayKeyboardEvent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$root$2f$useCompositeRoot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompositeRoot"])({
        itemSizes,
        cols,
        loopFocus,
        dense,
        orientation,
        highlightedIndex: highlightedIndexProp,
        onHighlightedIndexChange: onHighlightedIndexChangeProp,
        rootRef,
        stopEventPropagation,
        enableHomeAndEndKeys,
        direction,
        disabledIndices,
        modifierKeys
    });
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRenderElement"])(tag, componentProps, {
        state,
        ref: refs,
        props: [
            defaultProps,
            ...props,
            elementProps
        ],
        stateAttributesMapping
    });
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "CompositeRoot.useMemo[contextValue]": ()=>({
                highlightedIndex,
                onHighlightedIndexChange,
                highlightItemOnHover,
                relayKeyboardEvent
            })
    }["CompositeRoot.useMemo[contextValue]"], [
        highlightedIndex,
        onHighlightedIndexChange,
        highlightItemOnHover,
        relayKeyboardEvent
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompositeRootContext"].Provider, {
        value: contextValue,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompositeList"], {
            elementsRef: elementsRef,
            onMapChange: (newMap)=>{
                onMapChangeProp?.(newMap);
                onMapChangeUnwrapped(newMap);
            },
            children: element
        })
    });
}
}),
"[project]/node_modules/@base-ui-components/react/esm/tabs/list/TabsList.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsList",
    ()=>TabsList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/useStableCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/useIsoLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRoot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/composite/root/CompositeRoot.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/tabs/root/stateAttributesMapping.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/tabs/root/TabsRootContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsListContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/tabs/list/TabsListContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/utils/esm/empty.js [app-client] (ecmascript)");
/**
 * Groups the individual tab buttons.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
const TabsList = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function TabsList(componentProps, forwardedRef) {
    const { activateOnFocus = false, className, loopFocus = true, render, ...elementProps } = componentProps;
    const { getTabElementBySelectedValue, onValueChange, orientation, value, setTabMap, tabActivationDirection } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTabsRootContext"])();
    const [highlightedTabIndex, setHighlightedTabIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](0);
    const [tabsListElement, setTabsListElement] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const detectActivationDirection = useActivationDirectionDetector(value, // the old value
    orientation, tabsListElement, getTabElementBySelectedValue);
    const onTabActivation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useStableCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStableCallback"])({
        "TabsList.TabsList.useStableCallback[onTabActivation]": (newValue, eventDetails)=>{
            if (newValue !== value) {
                const activationDirection = detectActivationDirection(newValue);
                eventDetails.activationDirection = activationDirection;
                onValueChange(newValue, eventDetails);
            }
        }
    }["TabsList.TabsList.useStableCallback[onTabActivation]"]);
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "TabsList.TabsList.useMemo[state]": ()=>({
                orientation,
                tabActivationDirection
            })
    }["TabsList.TabsList.useMemo[state]"], [
        orientation,
        tabActivationDirection
    ]);
    const defaultProps = {
        'aria-orientation': orientation === 'vertical' ? 'vertical' : undefined,
        role: 'tablist'
    };
    const tabsListContextValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "TabsList.TabsList.useMemo[tabsListContextValue]": ()=>({
                activateOnFocus,
                highlightedTabIndex,
                onTabActivation,
                setHighlightedTabIndex,
                tabsListElement,
                value
            })
    }["TabsList.TabsList.useMemo[tabsListContextValue]"], [
        activateOnFocus,
        highlightedTabIndex,
        onTabActivation,
        setHighlightedTabIndex,
        tabsListElement,
        value
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsListContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsListContext"].Provider, {
        value: tabsListContextValue,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRoot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompositeRoot"], {
            render: render,
            className: className,
            state: state,
            refs: [
                forwardedRef,
                setTabsListElement
            ],
            props: [
                defaultProps,
                elementProps
            ],
            stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tabsStateAttributesMapping"],
            highlightedIndex: highlightedTabIndex,
            enableHomeAndEndKeys: true,
            loopFocus: loopFocus,
            orientation: orientation,
            onHighlightedIndexChange: setHighlightedTabIndex,
            onMapChange: setTabMap,
            disabledIndices: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"]
        })
    });
});
if ("TURBOPACK compile-time truthy", 1) TabsList.displayName = "TabsList";
function getInset(tab, tabsList) {
    const { left: tabLeft, top: tabTop } = tab.getBoundingClientRect();
    const { left: listLeft, top: listTop } = tabsList.getBoundingClientRect();
    const left = tabLeft - listLeft;
    const top = tabTop - listTop;
    return {
        left,
        top
    };
}
function useActivationDirectionDetector(// the old value
activeTabValue, orientation, tabsListElement, getTabElement) {
    const [previousTabEdge, setPreviousTabEdge] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])({
        "useActivationDirectionDetector.useIsoLayoutEffect": ()=>{
            // Whenever orientation changes, reset the state.
            if (activeTabValue == null || tabsListElement == null) {
                setPreviousTabEdge(null);
                return;
            }
            const activeTab = getTabElement(activeTabValue);
            if (activeTab == null) {
                setPreviousTabEdge(null);
                return;
            }
            const { left, top } = getInset(activeTab, tabsListElement);
            setPreviousTabEdge(orientation === 'horizontal' ? left : top);
        }
    }["useActivationDirectionDetector.useIsoLayoutEffect"], [
        orientation,
        getTabElement,
        tabsListElement,
        activeTabValue
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useActivationDirectionDetector.useCallback": (newValue)=>{
            if (newValue === activeTabValue) {
                return 'none';
            }
            if (newValue == null) {
                setPreviousTabEdge(null);
                return 'none';
            }
            if (newValue != null && tabsListElement != null) {
                const activeTabElement = getTabElement(newValue);
                if (activeTabElement != null) {
                    const { left, top } = getInset(activeTabElement, tabsListElement);
                    if (previousTabEdge == null) {
                        setPreviousTabEdge(orientation === 'horizontal' ? left : top);
                        return 'none';
                    }
                    if (orientation === 'horizontal') {
                        if (left < previousTabEdge) {
                            setPreviousTabEdge(left);
                            return 'left';
                        }
                        if (left > previousTabEdge) {
                            setPreviousTabEdge(left);
                            return 'right';
                        }
                    } else if (top < previousTabEdge) {
                        setPreviousTabEdge(top);
                        return 'up';
                    } else if (top > previousTabEdge) {
                        setPreviousTabEdge(top);
                        return 'down';
                    }
                }
            }
            return 'none';
        }
    }["useActivationDirectionDetector.useCallback"], [
        getTabElement,
        orientation,
        previousTabEdge,
        tabsListElement,
        activeTabValue
    ]);
}
}),
"[project]/node_modules/@base-ui-components/react/esm/tabs/index.parts.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Indicator",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsIndicator"],
    "List",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsList"],
    "Panel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$panel$2f$TabsPanel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsPanel"],
    "Root",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRoot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsRoot"],
    "Tab",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$tab$2f$TabsTab$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTab"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/tabs/index.parts.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRoot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/tabs/root/TabsRoot.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$tab$2f$TabsTab$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/tabs/tab/TabsTab.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/tabs/indicator/TabsIndicator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$panel$2f$TabsPanel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/tabs/panel/TabsPanel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/tabs/list/TabsList.js [app-client] (ecmascript)");
}),
"[project]/node_modules/@base-ui-components/react/esm/tabs/index.parts.js [app-client] (ecmascript) <export * as Tabs>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tabs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$index$2e$parts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui-components/react/esm/tabs/index.parts.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=node_modules_%40base-ui-components_react_esm_0zkl-1j._.js.map