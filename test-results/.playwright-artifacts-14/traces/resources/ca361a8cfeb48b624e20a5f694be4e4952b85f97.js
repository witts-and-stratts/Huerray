(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/dashboard-ui/quill-editor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuillEditor",
    ()=>QuillEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$quill$2f$quill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/quill/quill.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dashboard-utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const defaultToolbar = [
    [
        'bold',
        'italic',
        'underline',
        'strike'
    ],
    [
        {
            'list': 'ordered'
        },
        {
            'list': 'bullet'
        }
    ],
    [
        'clean'
    ]
];
function QuillEditor({ value, onChange, onBlur, placeholder, className, disabled, toolbar = defaultToolbar }) {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const quillRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isInternalChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const lastValueRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(value);
    const onBlurRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(onBlur);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuillEditor.useEffect": ()=>{
            onBlurRef.current = onBlur;
        }
    }["QuillEditor.useEffect"], [
        onBlur
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuillEditor.useEffect": ()=>{
            if (!containerRef.current) return;
            if (!quillRef.current) {
                const quill = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$quill$2f$quill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"](containerRef.current, {
                    theme: 'snow',
                    placeholder: placeholder,
                    modules: {
                        toolbar: toolbar
                    },
                    readOnly: disabled
                });
                quillRef.current = quill;
                // Set initial value if provided (important for persisted form state)
                if (value && value !== '<p><br></p>') {
                    quill.root.innerHTML = value;
                    lastValueRef.current = value;
                }
                quill.on('text-change', {
                    "QuillEditor.useEffect": ()=>{
                        if (onChange) {
                            isInternalChange.current = true;
                            // Send HTML content
                            const content = quill.root.innerHTML;
                            lastValueRef.current = content;
                            onChange(content);
                            isInternalChange.current = false;
                        }
                    }
                }["QuillEditor.useEffect"]);
                quill.on('selection-change', {
                    "QuillEditor.useEffect": (range, oldRange)=>{
                        if (range === null && oldRange !== null) {
                            onBlurRef.current?.();
                        }
                    }
                }["QuillEditor.useEffect"]);
            }
            return ({
                "QuillEditor.useEffect": ()=>{
                // Cleanup if needed
                }
            })["QuillEditor.useEffect"];
        }
    }["QuillEditor.useEffect"], []); // Init once
    // Handle external value changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuillEditor.useEffect": ()=>{
            const quill = quillRef.current;
            if (quill && value !== undefined && value !== lastValueRef.current && !isInternalChange.current) {
                // Prevent stale props from overwriting local state while user is typing
                if (quill.hasFocus()) {
                    console.debug('[QuillEditor] Quill has focus, skipping update');
                    return;
                }
                if (value !== quill.root.innerHTML) {
                    console.debug('[QuillEditor] Updating quill content from prop');
                    quill.root.innerHTML = value;
                }
                lastValueRef.current = value;
            }
        }
    }["QuillEditor.useEffect"], [
        value
    ]);
    // Handle disabled state change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuillEditor.useEffect": ()=>{
            if (quillRef.current) {
                quillRef.current.enable(!disabled);
            }
        }
    }["QuillEditor.useEffect"], [
        disabled
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("quill-editor-wrapper flex flex-col rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow]", "focus-within:ring-[3px] focus-within:ring-maroon-300/40 focus-within:border-maroon-300", "dark:bg-input/30", className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: containerRef,
            className: "min-h-[150px] text-foreground flex-1"
        }, void 0, false, {
            fileName: "[project]/components/dashboard-ui/quill-editor.tsx",
            lineNumber: 114,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/dashboard-ui/quill-editor.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
}
_s(QuillEditor, "xB0VncvtjS1K3y2wFjEqomFERfE=");
_c = QuillEditor;
var _c;
__turbopack_context__.k.register(_c, "QuillEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dashboard-ui/quill-editor.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/dashboard-ui/quill-editor.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_dashboard-ui_quill-editor_tsx_0o_v7d1._.js.map