(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/hooks/use-mobile.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsMobile",
    ()=>useIsMobile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
    _s();
    const [isMobile, setIsMobile] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](undefined);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useIsMobile.useEffect": ()=>{
            const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
            const onChange = {
                "useIsMobile.useEffect.onChange": ()=>{
                    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
                }
            }["useIsMobile.useEffect.onChange"];
            mql.addEventListener("change", onChange);
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
            return ({
                "useIsMobile.useEffect": ()=>mql.removeEventListener("change", onChange)
            })["useIsMobile.useEffect"];
        }
    }["useIsMobile.useEffect"], []);
    return !!isMobile;
}
_s(useIsMobile, "D6B2cPXNCaIbeOx+abFr1uxLRM0=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/use-controlled-state.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useControlledState",
    ()=>useControlledState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useControlledState(props) {
    _s();
    const { value, defaultValue, onChange } = props;
    const [state, setInternalState] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](value !== undefined ? value : defaultValue);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useControlledState.useEffect": ()=>{
            if (value !== undefined) setInternalState(value);
        }
    }["useControlledState.useEffect"], [
        value
    ]);
    const setState = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useControlledState.useCallback[setState]": (next, ...args)=>{
            setInternalState(next);
            onChange?.(next, ...args);
        }
    }["useControlledState.useCallback[setState]"], [
        onChange
    ]);
    return [
        state,
        setState
    ];
}
_s(useControlledState, "SPDBPq/apKVpu53wFS0U+cHrrWI=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/use-auto-height.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAutoHeight",
    ()=>useAutoHeight
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function useAutoHeight(deps = [], options = {
    includeParentBox: true,
    includeSelfBox: false
}) {
    _s();
    const ref = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const roRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const [height, setHeight] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](0);
    const measure = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useAutoHeight.useCallback[measure]": ()=>{
            const el = ref.current;
            if (!el) return 0;
            const base = el.getBoundingClientRect().height || 0;
            let extra = 0;
            if (options.includeParentBox && el.parentElement) {
                const cs = getComputedStyle(el.parentElement);
                const paddingY = (parseFloat(cs.paddingTop || '0') || 0) + (parseFloat(cs.paddingBottom || '0') || 0);
                const borderY = (parseFloat(cs.borderTopWidth || '0') || 0) + (parseFloat(cs.borderBottomWidth || '0') || 0);
                const isBorderBox = cs.boxSizing === 'border-box';
                if (isBorderBox) {
                    extra += paddingY + borderY;
                }
            }
            if (options.includeSelfBox) {
                const cs = getComputedStyle(el);
                const paddingY = (parseFloat(cs.paddingTop || '0') || 0) + (parseFloat(cs.paddingBottom || '0') || 0);
                const borderY = (parseFloat(cs.borderTopWidth || '0') || 0) + (parseFloat(cs.borderBottomWidth || '0') || 0);
                const isBorderBox = cs.boxSizing === 'border-box';
                if (isBorderBox) {
                    extra += paddingY + borderY;
                }
            }
            const dpr = ("TURBOPACK compile-time truthy", 1) ? window.devicePixelRatio || 1 : "TURBOPACK unreachable";
            const total = Math.ceil((base + extra) * dpr) / dpr;
            return total;
        }
    }["useAutoHeight.useCallback[measure]"], [
        options.includeParentBox,
        options.includeSelfBox
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"]({
        "useAutoHeight.useLayoutEffect": ()=>{
            const el = ref.current;
            if (!el) return;
            setHeight(measure());
            if (roRef.current) {
                roRef.current.disconnect();
                roRef.current = null;
            }
            const ro = new ResizeObserver({
                "useAutoHeight.useLayoutEffect": ()=>{
                    const next = measure();
                    requestAnimationFrame({
                        "useAutoHeight.useLayoutEffect": ()=>setHeight(next)
                    }["useAutoHeight.useLayoutEffect"]);
                }
            }["useAutoHeight.useLayoutEffect"]);
            ro.observe(el);
            if (options.includeParentBox && el.parentElement) {
                ro.observe(el.parentElement);
            }
            roRef.current = ro;
            return ({
                "useAutoHeight.useLayoutEffect": ()=>{
                    ro.disconnect();
                    roRef.current = null;
                }
            })["useAutoHeight.useLayoutEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["useAutoHeight.useLayoutEffect"], deps);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"]({
        "useAutoHeight.useLayoutEffect": ()=>{
            if (height === 0) {
                const next = measure();
                if (next !== 0) setHeight(next);
            }
        }
    }["useAutoHeight.useLayoutEffect"], [
        height,
        measure
    ]);
    return {
        ref,
        height
    };
}
_s(useAutoHeight, "TXIgLu8ll1NTaN2OI/cN/N40LDo=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/i18n.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "defaultLocale",
    ()=>defaultLocale,
    "locales",
    ()=>locales
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/server/react-client/index.js [app-client] (ecmascript)");
;
function isPlainObject(value) {
    return !!value && typeof value === 'object' && !Array.isArray(value);
}
function deepMergeMessages(fallback, override) {
    const result = {
        ...fallback
    };
    for (const [key, value] of Object.entries(override)){
        const fallbackValue = result[key];
        if (isPlainObject(fallbackValue) && isPlainObject(value)) {
            result[key] = deepMergeMessages(fallbackValue, value);
        } else {
            result[key] = value;
        }
    }
    return result;
}
const adminMessageModules = [
    'core',
    'dashboard',
    'users',
    'newsletter',
    'gigs',
    'invoices',
    'payments',
    'brands',
    'campaigns',
    'creators',
    'cases'
];
const brandMessageModules = [
    'core',
    'landing',
    'campaigns',
    'submissions',
    'creators',
    'gigs',
    'billing',
    'settings'
];
const commonMessageModules = [
    'core',
    'navigation',
    'tables',
    'emptyStates',
    'cards',
    'sheets',
    'submissions',
    'finance',
    'campaigns'
];
const creatorMessageModules = [
    'core',
    'earnings',
    'navigation',
    'invitations',
    'submissions',
    'gigs',
    'settings',
    'profile'
];
async function loadDashboardAdminMessages(locale) {
    const modules = await Promise.all(adminMessageModules.map((moduleName)=>__turbopack_context__.f({
            "./locales/de/dashboard/admin/core.json": {
                id: ()=>"[project]/locales/de/dashboard/admin/core.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/admin/core.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/admin/core.json": {
                id: ()=>"[project]/locales/en/dashboard/admin/core.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/admin/core.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/admin/core.json": {
                id: ()=>"[project]/locales/es/dashboard/admin/core.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/admin/core.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/admin/core.json": {
                id: ()=>"[project]/locales/fr/dashboard/admin/core.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/admin/core.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/admin/dashboard.json": {
                id: ()=>"[project]/locales/de/dashboard/admin/dashboard.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/admin/dashboard.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/admin/dashboard.json": {
                id: ()=>"[project]/locales/en/dashboard/admin/dashboard.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/admin/dashboard.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/admin/dashboard.json": {
                id: ()=>"[project]/locales/es/dashboard/admin/dashboard.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/admin/dashboard.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/admin/dashboard.json": {
                id: ()=>"[project]/locales/fr/dashboard/admin/dashboard.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/admin/dashboard.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/admin/users.json": {
                id: ()=>"[project]/locales/de/dashboard/admin/users.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/admin/users.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/admin/users.json": {
                id: ()=>"[project]/locales/en/dashboard/admin/users.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/admin/users.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/admin/users.json": {
                id: ()=>"[project]/locales/es/dashboard/admin/users.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/admin/users.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/admin/users.json": {
                id: ()=>"[project]/locales/fr/dashboard/admin/users.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/admin/users.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/admin/newsletter.json": {
                id: ()=>"[project]/locales/de/dashboard/admin/newsletter.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/admin/newsletter.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/admin/newsletter.json": {
                id: ()=>"[project]/locales/en/dashboard/admin/newsletter.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/admin/newsletter.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/admin/newsletter.json": {
                id: ()=>"[project]/locales/es/dashboard/admin/newsletter.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/admin/newsletter.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/admin/newsletter.json": {
                id: ()=>"[project]/locales/fr/dashboard/admin/newsletter.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/admin/newsletter.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/admin/gigs.json": {
                id: ()=>"[project]/locales/de/dashboard/admin/gigs.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/admin/gigs.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/admin/gigs.json": {
                id: ()=>"[project]/locales/en/dashboard/admin/gigs.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/admin/gigs.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/admin/gigs.json": {
                id: ()=>"[project]/locales/es/dashboard/admin/gigs.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/admin/gigs.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/admin/gigs.json": {
                id: ()=>"[project]/locales/fr/dashboard/admin/gigs.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/admin/gigs.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/admin/invoices.json": {
                id: ()=>"[project]/locales/de/dashboard/admin/invoices.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/admin/invoices.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/admin/invoices.json": {
                id: ()=>"[project]/locales/en/dashboard/admin/invoices.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/admin/invoices.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/admin/invoices.json": {
                id: ()=>"[project]/locales/es/dashboard/admin/invoices.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/admin/invoices.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/admin/invoices.json": {
                id: ()=>"[project]/locales/fr/dashboard/admin/invoices.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/admin/invoices.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/admin/payments.json": {
                id: ()=>"[project]/locales/de/dashboard/admin/payments.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/admin/payments.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/admin/payments.json": {
                id: ()=>"[project]/locales/en/dashboard/admin/payments.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/admin/payments.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/admin/payments.json": {
                id: ()=>"[project]/locales/es/dashboard/admin/payments.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/admin/payments.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/admin/payments.json": {
                id: ()=>"[project]/locales/fr/dashboard/admin/payments.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/admin/payments.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/admin/brands.json": {
                id: ()=>"[project]/locales/de/dashboard/admin/brands.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/admin/brands.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/admin/brands.json": {
                id: ()=>"[project]/locales/en/dashboard/admin/brands.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/admin/brands.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/admin/brands.json": {
                id: ()=>"[project]/locales/es/dashboard/admin/brands.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/admin/brands.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/admin/brands.json": {
                id: ()=>"[project]/locales/fr/dashboard/admin/brands.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/admin/brands.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/admin/campaigns.json": {
                id: ()=>"[project]/locales/de/dashboard/admin/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/admin/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/admin/campaigns.json": {
                id: ()=>"[project]/locales/en/dashboard/admin/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/admin/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/admin/campaigns.json": {
                id: ()=>"[project]/locales/es/dashboard/admin/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/admin/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/admin/campaigns.json": {
                id: ()=>"[project]/locales/fr/dashboard/admin/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/admin/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/admin/creators.json": {
                id: ()=>"[project]/locales/de/dashboard/admin/creators.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/admin/creators.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/admin/creators.json": {
                id: ()=>"[project]/locales/en/dashboard/admin/creators.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/admin/creators.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/admin/creators.json": {
                id: ()=>"[project]/locales/es/dashboard/admin/creators.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/admin/creators.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/admin/creators.json": {
                id: ()=>"[project]/locales/fr/dashboard/admin/creators.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/admin/creators.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/admin/cases.json": {
                id: ()=>"[project]/locales/de/dashboard/admin/cases.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/admin/cases.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/admin/cases.json": {
                id: ()=>"[project]/locales/en/dashboard/admin/cases.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/admin/cases.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/admin/cases.json": {
                id: ()=>"[project]/locales/es/dashboard/admin/cases.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/admin/cases.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/admin/cases.json": {
                id: ()=>"[project]/locales/fr/dashboard/admin/cases.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/admin/cases.json.[json].cjs [app-client] (ecmascript, async loader)")
            }
        }).import(`./locales/${locale}/dashboard/admin/${moduleName}.json`).then((module)=>module.default)));
    return modules.reduce((merged, moduleMessages)=>deepMergeMessages(merged, moduleMessages), {});
}
async function loadDashboardBrandMessages(locale) {
    const modules = await Promise.all(brandMessageModules.map((moduleName)=>__turbopack_context__.f({
            "./locales/de/dashboard/brand/core.json": {
                id: ()=>"[project]/locales/de/dashboard/brand/core.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/brand/core.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/brand/core.json": {
                id: ()=>"[project]/locales/en/dashboard/brand/core.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/brand/core.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/brand/core.json": {
                id: ()=>"[project]/locales/es/dashboard/brand/core.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/brand/core.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/brand/core.json": {
                id: ()=>"[project]/locales/fr/dashboard/brand/core.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/brand/core.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/brand/landing.json": {
                id: ()=>"[project]/locales/de/dashboard/brand/landing.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/brand/landing.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/brand/landing.json": {
                id: ()=>"[project]/locales/en/dashboard/brand/landing.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/brand/landing.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/brand/landing.json": {
                id: ()=>"[project]/locales/es/dashboard/brand/landing.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/brand/landing.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/brand/landing.json": {
                id: ()=>"[project]/locales/fr/dashboard/brand/landing.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/brand/landing.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/brand/campaigns.json": {
                id: ()=>"[project]/locales/de/dashboard/brand/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/brand/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/brand/campaigns.json": {
                id: ()=>"[project]/locales/en/dashboard/brand/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/brand/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/brand/campaigns.json": {
                id: ()=>"[project]/locales/es/dashboard/brand/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/brand/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/brand/campaigns.json": {
                id: ()=>"[project]/locales/fr/dashboard/brand/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/brand/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/brand/submissions.json": {
                id: ()=>"[project]/locales/de/dashboard/brand/submissions.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/brand/submissions.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/brand/submissions.json": {
                id: ()=>"[project]/locales/en/dashboard/brand/submissions.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/brand/submissions.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/brand/submissions.json": {
                id: ()=>"[project]/locales/es/dashboard/brand/submissions.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/brand/submissions.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/brand/submissions.json": {
                id: ()=>"[project]/locales/fr/dashboard/brand/submissions.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/brand/submissions.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/brand/creators.json": {
                id: ()=>"[project]/locales/de/dashboard/brand/creators.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/brand/creators.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/brand/creators.json": {
                id: ()=>"[project]/locales/en/dashboard/brand/creators.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/brand/creators.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/brand/creators.json": {
                id: ()=>"[project]/locales/es/dashboard/brand/creators.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/brand/creators.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/brand/creators.json": {
                id: ()=>"[project]/locales/fr/dashboard/brand/creators.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/brand/creators.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/brand/gigs.json": {
                id: ()=>"[project]/locales/de/dashboard/brand/gigs.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/brand/gigs.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/brand/gigs.json": {
                id: ()=>"[project]/locales/en/dashboard/brand/gigs.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/brand/gigs.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/brand/gigs.json": {
                id: ()=>"[project]/locales/es/dashboard/brand/gigs.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/brand/gigs.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/brand/gigs.json": {
                id: ()=>"[project]/locales/fr/dashboard/brand/gigs.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/brand/gigs.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/brand/billing.json": {
                id: ()=>"[project]/locales/de/dashboard/brand/billing.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/brand/billing.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/brand/billing.json": {
                id: ()=>"[project]/locales/en/dashboard/brand/billing.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/brand/billing.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/brand/billing.json": {
                id: ()=>"[project]/locales/es/dashboard/brand/billing.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/brand/billing.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/brand/billing.json": {
                id: ()=>"[project]/locales/fr/dashboard/brand/billing.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/brand/billing.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/brand/settings.json": {
                id: ()=>"[project]/locales/de/dashboard/brand/settings.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/brand/settings.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/brand/settings.json": {
                id: ()=>"[project]/locales/en/dashboard/brand/settings.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/brand/settings.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/brand/settings.json": {
                id: ()=>"[project]/locales/es/dashboard/brand/settings.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/brand/settings.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/brand/settings.json": {
                id: ()=>"[project]/locales/fr/dashboard/brand/settings.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/brand/settings.json.[json].cjs [app-client] (ecmascript, async loader)")
            }
        }).import(`./locales/${locale}/dashboard/brand/${moduleName}.json`).then((module)=>module.default)));
    return modules.reduce((merged, moduleMessages)=>deepMergeMessages(merged, moduleMessages), {});
}
async function loadDashboardCommonMessages(locale) {
    const modules = await Promise.all(commonMessageModules.map((moduleName)=>__turbopack_context__.f({
            "./locales/de/dashboard/common/core.json": {
                id: ()=>"[project]/locales/de/dashboard/common/core.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/common/core.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/common/core.json": {
                id: ()=>"[project]/locales/en/dashboard/common/core.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/common/core.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/common/core.json": {
                id: ()=>"[project]/locales/es/dashboard/common/core.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/common/core.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/common/core.json": {
                id: ()=>"[project]/locales/fr/dashboard/common/core.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/common/core.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/common/navigation.json": {
                id: ()=>"[project]/locales/de/dashboard/common/navigation.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/common/navigation.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/common/navigation.json": {
                id: ()=>"[project]/locales/en/dashboard/common/navigation.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/common/navigation.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/common/navigation.json": {
                id: ()=>"[project]/locales/es/dashboard/common/navigation.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/common/navigation.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/common/navigation.json": {
                id: ()=>"[project]/locales/fr/dashboard/common/navigation.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/common/navigation.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/common/tables.json": {
                id: ()=>"[project]/locales/de/dashboard/common/tables.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/common/tables.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/common/tables.json": {
                id: ()=>"[project]/locales/en/dashboard/common/tables.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/common/tables.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/common/tables.json": {
                id: ()=>"[project]/locales/es/dashboard/common/tables.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/common/tables.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/common/tables.json": {
                id: ()=>"[project]/locales/fr/dashboard/common/tables.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/common/tables.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/common/emptyStates.json": {
                id: ()=>"[project]/locales/de/dashboard/common/emptyStates.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/common/emptyStates.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/common/emptyStates.json": {
                id: ()=>"[project]/locales/en/dashboard/common/emptyStates.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/common/emptyStates.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/common/emptyStates.json": {
                id: ()=>"[project]/locales/es/dashboard/common/emptyStates.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/common/emptyStates.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/common/emptyStates.json": {
                id: ()=>"[project]/locales/fr/dashboard/common/emptyStates.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/common/emptyStates.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/common/cards.json": {
                id: ()=>"[project]/locales/de/dashboard/common/cards.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/common/cards.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/common/cards.json": {
                id: ()=>"[project]/locales/en/dashboard/common/cards.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/common/cards.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/common/cards.json": {
                id: ()=>"[project]/locales/es/dashboard/common/cards.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/common/cards.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/common/cards.json": {
                id: ()=>"[project]/locales/fr/dashboard/common/cards.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/common/cards.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/common/sheets.json": {
                id: ()=>"[project]/locales/de/dashboard/common/sheets.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/common/sheets.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/common/sheets.json": {
                id: ()=>"[project]/locales/en/dashboard/common/sheets.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/common/sheets.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/common/sheets.json": {
                id: ()=>"[project]/locales/es/dashboard/common/sheets.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/common/sheets.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/common/sheets.json": {
                id: ()=>"[project]/locales/fr/dashboard/common/sheets.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/common/sheets.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/common/submissions.json": {
                id: ()=>"[project]/locales/de/dashboard/common/submissions.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/common/submissions.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/common/submissions.json": {
                id: ()=>"[project]/locales/en/dashboard/common/submissions.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/common/submissions.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/common/submissions.json": {
                id: ()=>"[project]/locales/es/dashboard/common/submissions.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/common/submissions.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/common/submissions.json": {
                id: ()=>"[project]/locales/fr/dashboard/common/submissions.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/common/submissions.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/common/finance.json": {
                id: ()=>"[project]/locales/de/dashboard/common/finance.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/common/finance.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/common/finance.json": {
                id: ()=>"[project]/locales/en/dashboard/common/finance.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/common/finance.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/common/finance.json": {
                id: ()=>"[project]/locales/es/dashboard/common/finance.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/common/finance.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/common/finance.json": {
                id: ()=>"[project]/locales/fr/dashboard/common/finance.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/common/finance.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/common/campaigns.json": {
                id: ()=>"[project]/locales/de/dashboard/common/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/common/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/common/campaigns.json": {
                id: ()=>"[project]/locales/en/dashboard/common/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/common/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/common/campaigns.json": {
                id: ()=>"[project]/locales/es/dashboard/common/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/common/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/common/campaigns.json": {
                id: ()=>"[project]/locales/fr/dashboard/common/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/common/campaigns.json.[json].cjs [app-client] (ecmascript, async loader)")
            }
        }).import(`./locales/${locale}/dashboard/common/${moduleName}.json`).then((module)=>module.default)));
    return modules.reduce((merged, moduleMessages)=>deepMergeMessages(merged, moduleMessages), {});
}
async function loadDashboardCreatorMessages(locale) {
    const modules = await Promise.all(creatorMessageModules.map((moduleName)=>__turbopack_context__.f({
            "./locales/de/dashboard/creator/core.json": {
                id: ()=>"[project]/locales/de/dashboard/creator/core.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/creator/core.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/creator/core.json": {
                id: ()=>"[project]/locales/en/dashboard/creator/core.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/creator/core.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/creator/core.json": {
                id: ()=>"[project]/locales/es/dashboard/creator/core.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/creator/core.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/creator/core.json": {
                id: ()=>"[project]/locales/fr/dashboard/creator/core.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/creator/core.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/creator/earnings.json": {
                id: ()=>"[project]/locales/de/dashboard/creator/earnings.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/creator/earnings.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/creator/earnings.json": {
                id: ()=>"[project]/locales/en/dashboard/creator/earnings.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/creator/earnings.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/creator/earnings.json": {
                id: ()=>"[project]/locales/es/dashboard/creator/earnings.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/creator/earnings.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/creator/earnings.json": {
                id: ()=>"[project]/locales/fr/dashboard/creator/earnings.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/creator/earnings.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/creator/navigation.json": {
                id: ()=>"[project]/locales/de/dashboard/creator/navigation.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/creator/navigation.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/creator/navigation.json": {
                id: ()=>"[project]/locales/en/dashboard/creator/navigation.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/creator/navigation.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/creator/navigation.json": {
                id: ()=>"[project]/locales/es/dashboard/creator/navigation.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/creator/navigation.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/creator/navigation.json": {
                id: ()=>"[project]/locales/fr/dashboard/creator/navigation.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/creator/navigation.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/creator/invitations.json": {
                id: ()=>"[project]/locales/de/dashboard/creator/invitations.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/creator/invitations.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/creator/invitations.json": {
                id: ()=>"[project]/locales/en/dashboard/creator/invitations.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/creator/invitations.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/creator/invitations.json": {
                id: ()=>"[project]/locales/es/dashboard/creator/invitations.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/creator/invitations.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/creator/invitations.json": {
                id: ()=>"[project]/locales/fr/dashboard/creator/invitations.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/creator/invitations.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/creator/submissions.json": {
                id: ()=>"[project]/locales/de/dashboard/creator/submissions.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/creator/submissions.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/creator/submissions.json": {
                id: ()=>"[project]/locales/en/dashboard/creator/submissions.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/creator/submissions.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/creator/submissions.json": {
                id: ()=>"[project]/locales/es/dashboard/creator/submissions.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/creator/submissions.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/creator/submissions.json": {
                id: ()=>"[project]/locales/fr/dashboard/creator/submissions.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/creator/submissions.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/creator/gigs.json": {
                id: ()=>"[project]/locales/de/dashboard/creator/gigs.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/creator/gigs.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/creator/gigs.json": {
                id: ()=>"[project]/locales/en/dashboard/creator/gigs.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/creator/gigs.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/creator/gigs.json": {
                id: ()=>"[project]/locales/es/dashboard/creator/gigs.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/creator/gigs.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/creator/gigs.json": {
                id: ()=>"[project]/locales/fr/dashboard/creator/gigs.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/creator/gigs.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/creator/settings.json": {
                id: ()=>"[project]/locales/de/dashboard/creator/settings.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/creator/settings.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/creator/settings.json": {
                id: ()=>"[project]/locales/en/dashboard/creator/settings.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/creator/settings.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/creator/settings.json": {
                id: ()=>"[project]/locales/es/dashboard/creator/settings.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/creator/settings.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/creator/settings.json": {
                id: ()=>"[project]/locales/fr/dashboard/creator/settings.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/creator/settings.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/creator/profile.json": {
                id: ()=>"[project]/locales/de/dashboard/creator/profile.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/creator/profile.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/creator/profile.json": {
                id: ()=>"[project]/locales/en/dashboard/creator/profile.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/creator/profile.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/creator/profile.json": {
                id: ()=>"[project]/locales/es/dashboard/creator/profile.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/creator/profile.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/creator/profile.json": {
                id: ()=>"[project]/locales/fr/dashboard/creator/profile.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/creator/profile.json.[json].cjs [app-client] (ecmascript, async loader)")
            }
        }).import(`./locales/${locale}/dashboard/creator/${moduleName}.json`).then((module)=>module.default)));
    return modules.reduce((merged, moduleMessages)=>deepMergeMessages(merged, moduleMessages), {});
}
const locales = [
    'en',
    'de',
    'fr',
    'es'
];
const defaultLocale = 'en';
const __TURBOPACK__default__export__ = _c1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRequestConfig"])(_c = async ({ locale, requestLocale })=>{
    // Try locale from setRequestLocale first, then requestLocale, then default
    let validLocale = locale || await requestLocale || defaultLocale;
    // Ensure it's a valid locale
    if (!locales.includes(validLocale)) {
        validLocale = defaultLocale;
    }
    const englishMessages = {
        common: (await __turbopack_context__.A("[project]/locales/en/common.json.[json].cjs [app-client] (ecmascript, async loader)")).default,
        header: (await __turbopack_context__.A("[project]/locales/en/header.json.[json].cjs [app-client] (ecmascript, async loader)")).default,
        footer: (await __turbopack_context__.A("[project]/locales/en/footer.json.[json].cjs [app-client] (ecmascript, async loader)")).default,
        home: (await __turbopack_context__.A("[project]/locales/en/home.json.[json].cjs [app-client] (ecmascript, async loader)")).default,
        creators: (await __turbopack_context__.A("[project]/locales/en/creators.json.[json].cjs [app-client] (ecmascript, async loader)")).default,
        brands: (await __turbopack_context__.A("[project]/locales/en/brands.json.[json].cjs [app-client] (ecmascript, async loader)")).default,
        pricing: (await __turbopack_context__.A("[project]/locales/en/pricing.json.[json].cjs [app-client] (ecmascript, async loader)")).default,
        about: (await __turbopack_context__.A("[project]/locales/en/about.json.[json].cjs [app-client] (ecmascript, async loader)")).default,
        career: (await __turbopack_context__.A("[project]/locales/en/career.json.[json].cjs [app-client] (ecmascript, async loader)")).default,
        'privacy-policy': (await __turbopack_context__.A("[project]/locales/en/privacy-policy.json.[json].cjs [app-client] (ecmascript, async loader)")).default,
        'terms-and-conditions': (await __turbopack_context__.A("[project]/locales/en/terms-and-conditions.json.[json].cjs [app-client] (ecmascript, async loader)")).default,
        'creator-terms': (await __turbopack_context__.A("[project]/locales/en/creator-terms.json.[json].cjs [app-client] (ecmascript, async loader)")).default,
        'site-notice': (await __turbopack_context__.A("[project]/locales/en/site-notice.json.[json].cjs [app-client] (ecmascript, async loader)")).default,
        'brands-faq': (await __turbopack_context__.A("[project]/locales/en/brands-faq.json.[json].cjs [app-client] (ecmascript, async loader)")).default,
        'creators-faq': (await __turbopack_context__.A("[project]/locales/en/creators-faq.json.[json].cjs [app-client] (ecmascript, async loader)")).default,
        'managed-services': (await __turbopack_context__.A("[project]/locales/en/managed-services.json.[json].cjs [app-client] (ecmascript, async loader)")).default,
        auth: (await __turbopack_context__.A("[project]/locales/en/auth.json.[json].cjs [app-client] (ecmascript, async loader)")).default,
        dashboard: {
            common: await loadDashboardCommonMessages('en'),
            navigation: (await __turbopack_context__.A("[project]/locales/en/dashboard/navigation.json.[json].cjs [app-client] (ecmascript, async loader)")).default,
            brand: await loadDashboardBrandMessages('en'),
            creator: await loadDashboardCreatorMessages('en'),
            admin: await loadDashboardAdminMessages('en'),
            notifications: (await __turbopack_context__.A("[project]/locales/en/dashboard/notifications.json.[json].cjs [app-client] (ecmascript, async loader)")).default
        }
    };
    const localeMessages = validLocale === 'en' ? englishMessages : {
        common: (await __turbopack_context__.f({
            "./locales/de/common.json": {
                id: ()=>"[project]/locales/de/common.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/common.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/common.json": {
                id: ()=>"[project]/locales/en/common.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/common.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/common.json": {
                id: ()=>"[project]/locales/es/common.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/common.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/common.json": {
                id: ()=>"[project]/locales/fr/common.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/common.json.[json].cjs [app-client] (ecmascript, async loader)")
            }
        }).import(`./locales/${validLocale}/common.json`)).default,
        header: (await __turbopack_context__.f({
            "./locales/de/header.json": {
                id: ()=>"[project]/locales/de/header.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/header.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/header.json": {
                id: ()=>"[project]/locales/en/header.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/header.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/header.json": {
                id: ()=>"[project]/locales/es/header.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/header.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/header.json": {
                id: ()=>"[project]/locales/fr/header.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/header.json.[json].cjs [app-client] (ecmascript, async loader)")
            }
        }).import(`./locales/${validLocale}/header.json`)).default,
        footer: (await __turbopack_context__.f({
            "./locales/de/footer.json": {
                id: ()=>"[project]/locales/de/footer.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/footer.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/footer.json": {
                id: ()=>"[project]/locales/en/footer.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/footer.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/footer.json": {
                id: ()=>"[project]/locales/es/footer.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/footer.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/footer.json": {
                id: ()=>"[project]/locales/fr/footer.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/footer.json.[json].cjs [app-client] (ecmascript, async loader)")
            }
        }).import(`./locales/${validLocale}/footer.json`)).default,
        home: (await __turbopack_context__.f({
            "./locales/de/home.json": {
                id: ()=>"[project]/locales/de/home.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/home.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/home.json": {
                id: ()=>"[project]/locales/en/home.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/home.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/home.json": {
                id: ()=>"[project]/locales/es/home.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/home.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/home.json": {
                id: ()=>"[project]/locales/fr/home.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/home.json.[json].cjs [app-client] (ecmascript, async loader)")
            }
        }).import(`./locales/${validLocale}/home.json`)).default,
        creators: (await __turbopack_context__.f({
            "./locales/de/creators.json": {
                id: ()=>"[project]/locales/de/creators.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/creators.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/admin/creators.json": {
                id: ()=>"[project]/locales/de/dashboard/admin/creators.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/admin/creators.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/brand/creators.json": {
                id: ()=>"[project]/locales/de/dashboard/brand/creators.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/brand/creators.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/creators.json": {
                id: ()=>"[project]/locales/en/creators.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/creators.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/admin/creators.json": {
                id: ()=>"[project]/locales/en/dashboard/admin/creators.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/admin/creators.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/brand/creators.json": {
                id: ()=>"[project]/locales/en/dashboard/brand/creators.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/brand/creators.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/creators.json": {
                id: ()=>"[project]/locales/es/creators.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/creators.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/admin/creators.json": {
                id: ()=>"[project]/locales/es/dashboard/admin/creators.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/admin/creators.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/brand/creators.json": {
                id: ()=>"[project]/locales/es/dashboard/brand/creators.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/brand/creators.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/creators.json": {
                id: ()=>"[project]/locales/fr/creators.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/creators.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/admin/creators.json": {
                id: ()=>"[project]/locales/fr/dashboard/admin/creators.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/admin/creators.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/brand/creators.json": {
                id: ()=>"[project]/locales/fr/dashboard/brand/creators.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/brand/creators.json.[json].cjs [app-client] (ecmascript, async loader)")
            }
        }).import(`./locales/${validLocale}/creators.json`)).default,
        brands: (await __turbopack_context__.f({
            "./locales/de/brands.json": {
                id: ()=>"[project]/locales/de/brands.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/brands.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/de/dashboard/admin/brands.json": {
                id: ()=>"[project]/locales/de/dashboard/admin/brands.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/admin/brands.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/brands.json": {
                id: ()=>"[project]/locales/en/brands.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/brands.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/dashboard/admin/brands.json": {
                id: ()=>"[project]/locales/en/dashboard/admin/brands.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/admin/brands.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/brands.json": {
                id: ()=>"[project]/locales/es/brands.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/brands.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/dashboard/admin/brands.json": {
                id: ()=>"[project]/locales/es/dashboard/admin/brands.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/admin/brands.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/brands.json": {
                id: ()=>"[project]/locales/fr/brands.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/brands.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/dashboard/admin/brands.json": {
                id: ()=>"[project]/locales/fr/dashboard/admin/brands.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/admin/brands.json.[json].cjs [app-client] (ecmascript, async loader)")
            }
        }).import(`./locales/${validLocale}/brands.json`)).default,
        pricing: (await __turbopack_context__.f({
            "./locales/de/pricing.json": {
                id: ()=>"[project]/locales/de/pricing.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/pricing.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/pricing.json": {
                id: ()=>"[project]/locales/en/pricing.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/pricing.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/pricing.json": {
                id: ()=>"[project]/locales/es/pricing.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/pricing.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/pricing.json": {
                id: ()=>"[project]/locales/fr/pricing.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/pricing.json.[json].cjs [app-client] (ecmascript, async loader)")
            }
        }).import(`./locales/${validLocale}/pricing.json`)).default,
        about: (await __turbopack_context__.f({
            "./locales/de/about.json": {
                id: ()=>"[project]/locales/de/about.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/about.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/about.json": {
                id: ()=>"[project]/locales/en/about.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/about.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/about.json": {
                id: ()=>"[project]/locales/es/about.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/about.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/about.json": {
                id: ()=>"[project]/locales/fr/about.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/about.json.[json].cjs [app-client] (ecmascript, async loader)")
            }
        }).import(`./locales/${validLocale}/about.json`)).default,
        career: (await __turbopack_context__.f({
            "./locales/de/career.json": {
                id: ()=>"[project]/locales/de/career.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/career.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/career.json": {
                id: ()=>"[project]/locales/en/career.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/career.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/career.json": {
                id: ()=>"[project]/locales/es/career.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/career.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/career.json": {
                id: ()=>"[project]/locales/fr/career.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/career.json.[json].cjs [app-client] (ecmascript, async loader)")
            }
        }).import(`./locales/${validLocale}/career.json`)).default,
        'privacy-policy': (await __turbopack_context__.f({
            "./locales/de/privacy-policy.json": {
                id: ()=>"[project]/locales/de/privacy-policy.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/privacy-policy.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/privacy-policy.json": {
                id: ()=>"[project]/locales/en/privacy-policy.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/privacy-policy.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/privacy-policy.json": {
                id: ()=>"[project]/locales/es/privacy-policy.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/privacy-policy.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/privacy-policy.json": {
                id: ()=>"[project]/locales/fr/privacy-policy.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/privacy-policy.json.[json].cjs [app-client] (ecmascript, async loader)")
            }
        }).import(`./locales/${validLocale}/privacy-policy.json`)).default,
        'terms-and-conditions': (await __turbopack_context__.f({
            "./locales/de/terms-and-conditions.json": {
                id: ()=>"[project]/locales/de/terms-and-conditions.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/terms-and-conditions.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/terms-and-conditions.json": {
                id: ()=>"[project]/locales/en/terms-and-conditions.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/terms-and-conditions.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/terms-and-conditions.json": {
                id: ()=>"[project]/locales/es/terms-and-conditions.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/terms-and-conditions.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/terms-and-conditions.json": {
                id: ()=>"[project]/locales/fr/terms-and-conditions.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/terms-and-conditions.json.[json].cjs [app-client] (ecmascript, async loader)")
            }
        }).import(`./locales/${validLocale}/terms-and-conditions.json`)).default,
        'creator-terms': (await __turbopack_context__.f({
            "./locales/de/creator-terms.json": {
                id: ()=>"[project]/locales/de/creator-terms.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/creator-terms.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/creator-terms.json": {
                id: ()=>"[project]/locales/en/creator-terms.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/creator-terms.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/creator-terms.json": {
                id: ()=>"[project]/locales/es/creator-terms.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/creator-terms.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/creator-terms.json": {
                id: ()=>"[project]/locales/fr/creator-terms.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/creator-terms.json.[json].cjs [app-client] (ecmascript, async loader)")
            }
        }).import(`./locales/${validLocale}/creator-terms.json`)).default,
        'site-notice': (await __turbopack_context__.f({
            "./locales/de/site-notice.json": {
                id: ()=>"[project]/locales/de/site-notice.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/site-notice.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/site-notice.json": {
                id: ()=>"[project]/locales/en/site-notice.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/site-notice.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/site-notice.json": {
                id: ()=>"[project]/locales/es/site-notice.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/site-notice.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/site-notice.json": {
                id: ()=>"[project]/locales/fr/site-notice.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/site-notice.json.[json].cjs [app-client] (ecmascript, async loader)")
            }
        }).import(`./locales/${validLocale}/site-notice.json`)).default,
        'brands-faq': (await __turbopack_context__.f({
            "./locales/de/brands-faq.json": {
                id: ()=>"[project]/locales/de/brands-faq.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/brands-faq.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/brands-faq.json": {
                id: ()=>"[project]/locales/en/brands-faq.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/brands-faq.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/brands-faq.json": {
                id: ()=>"[project]/locales/es/brands-faq.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/brands-faq.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/brands-faq.json": {
                id: ()=>"[project]/locales/fr/brands-faq.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/brands-faq.json.[json].cjs [app-client] (ecmascript, async loader)")
            }
        }).import(`./locales/${validLocale}/brands-faq.json`)).default,
        'creators-faq': (await __turbopack_context__.f({
            "./locales/de/creators-faq.json": {
                id: ()=>"[project]/locales/de/creators-faq.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/creators-faq.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/creators-faq.json": {
                id: ()=>"[project]/locales/en/creators-faq.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/creators-faq.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/creators-faq.json": {
                id: ()=>"[project]/locales/es/creators-faq.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/creators-faq.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/creators-faq.json": {
                id: ()=>"[project]/locales/fr/creators-faq.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/creators-faq.json.[json].cjs [app-client] (ecmascript, async loader)")
            }
        }).import(`./locales/${validLocale}/creators-faq.json`)).default,
        'managed-services': (await __turbopack_context__.f({
            "./locales/de/managed-services.json": {
                id: ()=>"[project]/locales/de/managed-services.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/managed-services.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/managed-services.json": {
                id: ()=>"[project]/locales/en/managed-services.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/managed-services.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/managed-services.json": {
                id: ()=>"[project]/locales/es/managed-services.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/managed-services.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/managed-services.json": {
                id: ()=>"[project]/locales/fr/managed-services.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/managed-services.json.[json].cjs [app-client] (ecmascript, async loader)")
            }
        }).import(`./locales/${validLocale}/managed-services.json`)).default,
        auth: (await __turbopack_context__.f({
            "./locales/de/auth.json": {
                id: ()=>"[project]/locales/de/auth.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/de/auth.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/en/auth.json": {
                id: ()=>"[project]/locales/en/auth.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/en/auth.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/es/auth.json": {
                id: ()=>"[project]/locales/es/auth.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/es/auth.json.[json].cjs [app-client] (ecmascript, async loader)")
            },
            "./locales/fr/auth.json": {
                id: ()=>"[project]/locales/fr/auth.json.[json].cjs [app-client] (ecmascript, async loader)",
                module: ()=>__turbopack_context__.A("[project]/locales/fr/auth.json.[json].cjs [app-client] (ecmascript, async loader)")
            }
        }).import(`./locales/${validLocale}/auth.json`)).default,
        dashboard: {
            common: await loadDashboardCommonMessages(validLocale),
            navigation: (await __turbopack_context__.f({
                "./locales/de/dashboard/navigation.json": {
                    id: ()=>"[project]/locales/de/dashboard/navigation.json.[json].cjs [app-client] (ecmascript, async loader)",
                    module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/navigation.json.[json].cjs [app-client] (ecmascript, async loader)")
                },
                "./locales/en/dashboard/navigation.json": {
                    id: ()=>"[project]/locales/en/dashboard/navigation.json.[json].cjs [app-client] (ecmascript, async loader)",
                    module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/navigation.json.[json].cjs [app-client] (ecmascript, async loader)")
                },
                "./locales/es/dashboard/navigation.json": {
                    id: ()=>"[project]/locales/es/dashboard/navigation.json.[json].cjs [app-client] (ecmascript, async loader)",
                    module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/navigation.json.[json].cjs [app-client] (ecmascript, async loader)")
                },
                "./locales/fr/dashboard/navigation.json": {
                    id: ()=>"[project]/locales/fr/dashboard/navigation.json.[json].cjs [app-client] (ecmascript, async loader)",
                    module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/navigation.json.[json].cjs [app-client] (ecmascript, async loader)")
                }
            }).import(`./locales/${validLocale}/dashboard/navigation.json`)).default,
            brand: await loadDashboardBrandMessages(validLocale),
            creator: await loadDashboardCreatorMessages(validLocale),
            admin: await loadDashboardAdminMessages(validLocale),
            notifications: (await __turbopack_context__.f({
                "./locales/de/dashboard/notifications.json": {
                    id: ()=>"[project]/locales/de/dashboard/notifications.json.[json].cjs [app-client] (ecmascript, async loader)",
                    module: ()=>__turbopack_context__.A("[project]/locales/de/dashboard/notifications.json.[json].cjs [app-client] (ecmascript, async loader)")
                },
                "./locales/en/dashboard/notifications.json": {
                    id: ()=>"[project]/locales/en/dashboard/notifications.json.[json].cjs [app-client] (ecmascript, async loader)",
                    module: ()=>__turbopack_context__.A("[project]/locales/en/dashboard/notifications.json.[json].cjs [app-client] (ecmascript, async loader)")
                },
                "./locales/es/dashboard/notifications.json": {
                    id: ()=>"[project]/locales/es/dashboard/notifications.json.[json].cjs [app-client] (ecmascript, async loader)",
                    module: ()=>__turbopack_context__.A("[project]/locales/es/dashboard/notifications.json.[json].cjs [app-client] (ecmascript, async loader)")
                },
                "./locales/fr/dashboard/notifications.json": {
                    id: ()=>"[project]/locales/fr/dashboard/notifications.json.[json].cjs [app-client] (ecmascript, async loader)",
                    module: ()=>__turbopack_context__.A("[project]/locales/fr/dashboard/notifications.json.[json].cjs [app-client] (ecmascript, async loader)")
                }
            }).import(`./locales/${validLocale}/dashboard/notifications.json`)).default
        }
    };
    return {
        locale: validLocale,
        messages: deepMergeMessages(englishMessages, localeMessages)
    };
});
var _c, _c1;
__turbopack_context__.k.register(_c, "%default%$getRequestConfig");
__turbopack_context__.k.register(_c1, "%default%");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/[locale]/(admin)/brand/(dashboard)/layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BrandAdminDashboardLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$email$2d$verification$2d$banner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/email-verification-banner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$profile$2d$status$2d$banner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/profile-status-banner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$brand$2d$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/brand-sidebar.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
function BrandAdminDashboardLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SidebarProvider"], {
        "data-dashboard-theme": "brand",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$brand$2d$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrandSidebar"], {}, void 0, false, {
                fileName: "[project]/app/[locale]/(admin)/brand/(dashboard)/layout.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SidebarInset"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$email$2d$verification$2d$banner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmailVerificationBanner"], {}, void 0, false, {
                        fileName: "[project]/app/[locale]/(admin)/brand/(dashboard)/layout.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$profile$2d$status$2d$banner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProfileStatusBanner"], {
                        role: "brand"
                    }, void 0, false, {
                        fileName: "[project]/app/[locale]/(admin)/brand/(dashboard)/layout.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardHeader"], {}, void 0, false, {
                        fileName: "[project]/app/[locale]/(admin)/brand/(dashboard)/layout.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto min-h-0 flex flex-col",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/app/[locale]/(admin)/brand/(dashboard)/layout.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/[locale]/(admin)/brand/(dashboard)/layout.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/[locale]/(admin)/brand/(dashboard)/layout.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = BrandAdminDashboardLayout;
var _c;
__turbopack_context__.k.register(_c, "BrandAdminDashboardLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0a7drb9._.js.map