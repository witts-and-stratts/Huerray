(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/campaigns/submission-view-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SubmissionViewDialog",
    ()=>SubmissionViewDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$creators$2f$creator$2d$details$2d$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/admin/creators/creator-details-sheet.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$gigs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/hooks/gigs.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/use-intl/dist/esm/development/react.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$text$2d$case$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/text-case.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$role$2d$guard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/role-guard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$video$2d$submissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/hooks/video-submissions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$video$2d$submission$2d$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/generated/models/utils-video-submission-status.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$models$2d$brand$2d$video$2d$decision$2d$request$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/generated/models/models-brand-video-decision-request.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$confirm$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/confirm-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$super$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/super-field.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$expandable$2d$content$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/expandable-content.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$comments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/hooks/comments.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$entity$2d$type$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/generated/models/utils-entity-type.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$comments$2d$thread$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/comments-thread.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/imgproxy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dashboard-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2d$action$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/submission-action-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/button-group.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
"use client";
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
;
;
;
const statusVariant = {
    approved: 'default',
    completed: 'default',
    pending_approval: 'secondary',
    submitted: 'secondary',
    open: 'outline',
    in_progress: 'outline',
    rejected: 'destructive',
    returned: 'destructive'
};
function SubmissionCardSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: Array.from({
            length: 4
        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                        className: "mb-1 h-3 w-16"
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                        className: "h-4 w-24"
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this)
                ]
            }, `detail-skeleton-${i}`, true, {
                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this))
    }, void 0, false);
}
_c = SubmissionCardSkeleton;
function Row({ label, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full flex flex-col space-x-30",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-muted-foreground/70 mb-0.5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$text$2d$case$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextCapitalize"], {
                    children: label
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                    lineNumber: 66,
                    columnNumber: 62
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-normal text-foreground truncate text-sm",
                children: value
            }, void 0, false, {
                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
_c1 = Row;
const SubmissionVideo = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_s(({ videoUrl, poster })=>{
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [measuredHeight, setMeasuredHeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleLoadedMetadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SubmissionVideo.useCallback[handleLoadedMetadata]": ()=>{
            if (containerRef.current) {
                // Temporarily make the container auto-height to measure
                const el = containerRef.current;
                el.style.height = 'auto';
                const rect = el.getBoundingClientRect();
                setMeasuredHeight(rect.height);
            }
        }
    }["SubmissionVideo.useCallback[handleLoadedMetadata]"], []);
    const optimisedPoster = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SubmissionVideo.useMemo[optimisedPoster]": ()=>{
            if (!poster) return undefined;
            return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imgpresets"].banner(poster);
        }
    }["SubmissionVideo.useMemo[optimisedPoster]"], [
        poster
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        ref: containerRef,
        className: "w-full bg-black shrink-0 overflow-hidden",
        initial: {
            opacity: 0,
            height: 0
        },
        animate: {
            opacity: 1,
            height: measuredHeight ?? 'auto'
        },
        exit: {
            opacity: 0,
            height: 0
        },
        transition: {
            duration: 0.5,
            ease: [
                0.25,
                0.1,
                0.25,
                1
            ]
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
            src: videoUrl,
            controls: true,
            preload: "metadata",
            className: "w-full h-full md:min-h-[500px] max-h-[60vh] md:object-cover",
            onLoadedMetadata: handleLoadedMetadata,
            poster: optimisedPoster
        }, void 0, false, {
            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
            lineNumber: 107,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}, "P54mNh0D1/b2mEq6oCQeRVuKOv4="));
_c2 = SubmissionVideo;
SubmissionVideo.displayName = 'SubmissionVideo';
const SubmissionHeader = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(({ title, description, commentCount, isCommentsOpen, onToggleComments })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
        className: "gap-0 flex-row justify-between items-start",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        className: "font-primary text-primary text-lg font-normal mb-0 flex items-center gap-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$text$2d$case$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextCapitalize"], {
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                            lineNumber: 136,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                        lineNumber: 135,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$expandable$2d$content$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExpandableContent"], {
                            children: description
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                lineNumber: 134,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onToggleComments,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full mt-1.5 shrink-0 transition-colors cursor-pointer hover:bg-primary/20", commentCount > 0 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground", isCommentsOpen && "bg-primary text-primary-foreground hover:bg-primary/90"),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                            className: "w-3.5 h-3.5"
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                            lineNumber: 156,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: commentCount > 0 ? commentCount : 'Comments'
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                            lineNumber: 157,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                    lineNumber: 148,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                lineNumber: 147,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
        lineNumber: 133,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = SubmissionHeader;
SubmissionHeader.displayName = 'SubmissionHeader';
const CreatorTrigger = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_s1(({ creatorProfile })=>{
    _s1();
    const [sheetOpen, setSheetOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const creatorDisplayName = `${creatorProfile?.first_name || ''} ${creatorProfile?.last_name || ''}`.trim() || creatorProfile?.email || 'Unknown Creator';
    const creatorSecondary = [
        creatorProfile?.email || '',
        creatorProfile?.city || '',
        creatorProfile?.country || ''
    ].filter(Boolean).join(' • ') || 'No creator details available';
    const creatorAvatar = creatorProfile?.profile_image?.asset || '';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setSheetOpen(true),
                className: "flex items-center gap-3 min-w-0 text-left hover:bg-muted/50 p-2 -ml-2 rounded-lg transition-colors cursor-pointer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                        className: "size-10 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                src: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imgpresets"].avatar(creatorAvatar),
                                alt: creatorDisplayName
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                children: creatorDisplayName.slice(0, 2).toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-base font-medium text-foreground truncate hover:underline hover:text-primary cursor-pointer",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$text$2d$case$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextCapitalize"], {
                                    children: creatorDisplayName
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                    lineNumber: 189,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground truncate",
                                children: creatorSecondary
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                lineNumber: 191,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            creatorProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$creators$2f$creator$2d$details$2d$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CreatorDetailsSheet"], {
                creator: creatorProfile,
                open: sheetOpen,
                onOpenChange: setSheetOpen
            }, void 0, false, {
                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                lineNumber: 198,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
}, "Jrn1U4hzhStFk+D9VGr83w26GAY="));
_c4 = CreatorTrigger;
CreatorTrigger.displayName = 'CreatorTrigger';
const SubmissionDetailsSection = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_s2(({ submission, locale, open })=>{
    _s2();
    const { data: gigResponse, isLoading: isGigLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$gigs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGig"])(submission.gig_id || '', {
        enabled: !!submission.gig_id && open
    });
    const gig = gigResponse?.data;
    const campaign = gig?.campaign;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-x-20 gap-y-5 rounded-lg border border-border/60 bg-background/70 p-3 text-sm",
                children: isGigLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubmissionCardSkeleton, {}, void 0, false, {
                    fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                    lineNumber: 222,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid md:flex md:flex-row space-y-3 space-x-3 w-full *:border-r *:last-of-type:border-r-0 *:md:max-w-1/3 overflow-x-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                            label: "Campaign",
                            value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: campaign?.id || gig?.campaign_id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/${locale}/campaigns/${campaign?.id || gig?.campaign_id}`,
                                    className: "hover:underline hover:text-primary transition-colors inline-block font-normal text-sm",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$text$2d$case$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextCapitalize"], {
                                        children: campaign?.campaign_name || gig?.campaign_name || '—'
                                    }, void 0, false, {
                                        fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                        lineNumber: 231,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                    lineNumber: 227,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$text$2d$case$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextCapitalize"], {
                                    children: campaign?.campaign_name || gig?.campaign_name || '—'
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                    lineNumber: 234,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false)
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                            lineNumber: 225,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                            label: "Gig",
                            value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$text$2d$case$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextCapitalize"], {
                                children: gig?.title || '—'
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                lineNumber: 237,
                                columnNumber: 38
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                            lineNumber: 237,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                            label: "Status",
                            value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: statusVariant[submission.status || ''] || 'secondary',
                                className: "capitalize text-[11px]",
                                children: (submission.status || 'unknown').replace(/_/g, ' ')
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                lineNumber: 238,
                                columnNumber: 41
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                            lineNumber: 238,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        gig?.compensation?.value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                            label: "Compensation",
                            value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(gig?.compensation?.value, 'EUR', locale)
                            }, void 0, false)
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                            lineNumber: 243,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        gig?.gig_cost?.value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                            label: "Gig Cost",
                            value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(gig?.gig_cost?.value, 'EUR', locale)
                            }, void 0, false)
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                            lineNumber: 246,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                    lineNumber: 224,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 text-xs text-muted-foreground",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "Submitted ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(submission.created_at, locale)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                        lineNumber: 253,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    gig?.gig_status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "Gig status: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "capitalize",
                                children: gig.gig_status.replace(/_/g, ' ')
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                lineNumber: 255,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                        lineNumber: 255,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                lineNumber: 252,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
}, "F8IWcAK0Q8r0l2pP/SHotpToX9E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$gigs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGig"]
    ];
}));
_c5 = SubmissionDetailsSection;
SubmissionDetailsSection.displayName = 'SubmissionDetailsSection';
const SubmissionActions = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_s3(({ submission, onOpenChange })=>{
    _s3();
    const updateStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$video$2d$submissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateVideoSubmissionStatus"])();
    const decisionMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$video$2d$submissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVideoSubmissionDecision"])();
    const [comments, setComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [returnDialogOpen, setReturnDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rejectDialogOpen, setRejectDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleStatusUpdate = (status, commentsToSubmit = "")=>{
        updateStatus.mutate({
            id: submission.id,
            request: {
                status,
                comments: commentsToSubmit
            }
        }, {
            onSuccess: ()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`Submission ${status.replace('STATUS_', '').toLowerCase()} successfully`);
                onOpenChange(false);
            },
            onError: (err)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to update submission status", {
                    description: err.response?.data?.message || "Please try again later.",
                    richColors: true
                });
            }
        });
    };
    const handleDecisionUpdate = (status, commentsToSubmit = "")=>{
        decisionMutation.mutate({
            id: submission.id,
            data: {
                status,
                comments: commentsToSubmit
            }
        }, {
            onSuccess: ()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`Submission ${status.toLowerCase()} successfully`);
                onOpenChange(false);
            },
            onError: (err)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to submit decision", {
                    description: err.response?.data?.message || "Please try again later.",
                    richColors: true
                });
            }
        });
    };
    if (submission.status !== 'pending_approval' && submission.status !== 'approved') {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            submission.status === 'pending_approval' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$role$2d$guard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoleGuard"], {
                allowedRoles: [
                    'admin'
                ],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 pt-2 border-t mt-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "default",
                            disabled: updateStatus.isPending,
                            onClick: ()=>handleStatusUpdate(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$video$2d$submission$2d$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UtilsVideoSubmissionStatus"].VideoSubmissionStatusApproved),
                            children: [
                                updateStatus.isPending && updateStatus.variables?.request.status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$video$2d$submission$2d$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UtilsVideoSubmissionStatus"].VideoSubmissionStatusApproved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "mr-2 h-4 w-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                    lineNumber: 328,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Approve Submission"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                            lineNumber: 322,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "destructive",
                            disabled: updateStatus.isPending,
                            onClick: ()=>setReturnDialogOpen(true),
                            children: [
                                updateStatus.isPending && updateStatus.variables?.request.status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$video$2d$submission$2d$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UtilsVideoSubmissionStatus"].VideoSubmissionStatusReturned && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "mr-2 h-4 w-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                    lineNumber: 338,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Return Submission"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                            lineNumber: 332,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                    lineNumber: 321,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                lineNumber: 320,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            submission.status === 'approved' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$role$2d$guard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoleGuard"], {
                allowedRoles: [
                    'brand'
                ],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 pt-2 border-t mt-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "default",
                            disabled: decisionMutation.isPending,
                            onClick: ()=>handleDecisionUpdate(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$models$2d$brand$2d$video$2d$decision$2d$request$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModelsBrandVideoDecisionRequestStatusEnum"].Accepted),
                            children: [
                                decisionMutation.isPending && decisionMutation.variables?.data.status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$models$2d$brand$2d$video$2d$decision$2d$request$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModelsBrandVideoDecisionRequestStatusEnum"].Accepted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "mr-2 h-4 w-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                    lineNumber: 355,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Accept Submission"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                            lineNumber: 349,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "destructive",
                            disabled: decisionMutation.isPending,
                            onClick: ()=>setRejectDialogOpen(true),
                            children: [
                                decisionMutation.isPending && decisionMutation.variables?.data.status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$models$2d$brand$2d$video$2d$decision$2d$request$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModelsBrandVideoDecisionRequestStatusEnum"].Rejected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "mr-2 h-4 w-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                    lineNumber: 365,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Reject Submission"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                            lineNumber: 359,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                    lineNumber: 348,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                lineNumber: 347,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$confirm$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfirmDialog"], {
                open: returnDialogOpen,
                title: "Return Submission to Creator",
                description: "Are you sure you want to return this submission to the creator?",
                confirmLabel: "Yes",
                cancelLabel: "Cancel",
                onCancel: ()=>{
                    setReturnDialogOpen(false);
                    setComments("");
                },
                onOpenChange: setReturnDialogOpen,
                onConfirm: ()=>{
                    handleStatusUpdate(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$video$2d$submission$2d$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UtilsVideoSubmissionStatus"].VideoSubmissionStatusReturned, comments);
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$super$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SuperField"], {
                    type: "textarea",
                    label: "Comments",
                    value: comments,
                    onValueChange: setComments
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                    lineNumber: 385,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                lineNumber: 373,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$confirm$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfirmDialog"], {
                open: rejectDialogOpen,
                title: "Reject Submission",
                description: "Are you sure you want to reject this submission?",
                confirmLabel: "Reject",
                cancelLabel: "Cancel",
                onCancel: ()=>{
                    setRejectDialogOpen(false);
                    setComments("");
                },
                onOpenChange: setRejectDialogOpen,
                onConfirm: ()=>{
                    handleDecisionUpdate(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$models$2d$brand$2d$video$2d$decision$2d$request$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModelsBrandVideoDecisionRequestStatusEnum"].Rejected, comments);
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$super$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SuperField"], {
                    type: "textarea",
                    label: "Comments",
                    value: comments,
                    onValueChange: setComments
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                    lineNumber: 405,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                lineNumber: 393,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
}, "zEmr2ip8t2uc8+KmHzLyMRrJLRY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$video$2d$submissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateVideoSubmissionStatus"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$video$2d$submissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVideoSubmissionDecision"]
    ];
}));
_c6 = SubmissionActions;
SubmissionActions.displayName = 'SubmissionActions';
const SubmissionCommentsPanel = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(({ isCommentsOpen, setIsCommentsOpen, commentEntities })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-background flex-col transition-all duration-300 ease-in-out overflow-hidden flex absolute right-2 top-2 bottom-2 rounded-xl shadow-xl z-20 border", isCommentsOpen ? "w-[400px] max-w-[calc(100vw-32px)] opacity-100 translate-x-0" : "w-[400px] max-w-[calc(100vw-32px)] opacity-0 translate-x-8 pointer-events-none"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-b flex items-center justify-between shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-primary text-lg text-primary font-normal",
                        children: "Comments"
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                        lineNumber: 429,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "icon",
                        onClick: ()=>setIsCommentsOpen(false),
                        className: "h-8 w-8 cursor-pointer",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                            lineNumber: 431,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                        lineNumber: 430,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                lineNumber: 428,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-h-0 relative bg-muted/10 p-4",
                children: isCommentsOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$comments$2d$thread$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommentsThread"], {
                        entities: commentEntities,
                        postTo: commentEntities[0],
                        size: "sm"
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                        lineNumber: 437,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                    lineNumber: 436,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                lineNumber: 434,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
        lineNumber: 422,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c7 = SubmissionCommentsPanel;
SubmissionCommentsPanel.displayName = 'SubmissionCommentsPanel';
const SubmissionViewDialog = /*#__PURE__*/ _s4((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c8 = _s4(({ open, onOpenChange, submission, initialCommentsOpen = false })=>{
    _s4();
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const [isCommentsOpen, setIsCommentsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialCommentsOpen);
    const { data: submissionResponse, isFetching: isSubmissionFetching, refetch: refetchSubmission } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$video$2d$submissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVideoSubmission"])(submission.id || '', {
        enabled: false
    });
    const latestSubmission = submissionResponse?.data || submission;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SubmissionViewDialog.useEffect": ()=>{
            if (open) {
                setIsCommentsOpen(initialCommentsOpen);
                if (submission.id) {
                    refetchSubmission();
                }
            }
        }
    }["SubmissionViewDialog.useEffect"], [
        open,
        initialCommentsOpen,
        submission.id,
        refetchSubmission
    ]);
    const commentsResults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$comments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubmissionComments"])(open ? latestSubmission.id : undefined);
    const commentCount = commentsResults.reduce((sum, r)=>sum + (r.data?.data?.length ?? 0), 0);
    const commentEntities = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SubmissionViewDialog.useMemo[commentEntities]": ()=>open && latestSubmission.id ? [
                {
                    entityType: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$entity$2d$type$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UtilsEntityType"].EntityTypeVideoSubmissionStatusUpdate,
                    entityId: latestSubmission.id
                },
                {
                    entityType: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$entity$2d$type$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UtilsEntityType"].EntityTypeBrandVideoDecision,
                    entityId: latestSubmission.id
                }
            ] : []
    }["SubmissionViewDialog.useMemo[commentEntities]"], [
        open,
        latestSubmission.id
    ]);
    const handleToggleComments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SubmissionViewDialog.useCallback[handleToggleComments]": ()=>{
            setIsCommentsOpen({
                "SubmissionViewDialog.useCallback[handleToggleComments]": (prev)=>!prev
            }["SubmissionViewDialog.useCallback[handleToggleComments]"]);
        }
    }["SubmissionViewDialog.useCallback[handleToggleComments]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "p-0 gap-0 overflow-hidden max-w-6xl! min-w-[300px] w-[95vw] bg-burgundy-50/80 max-h-[90vh] flex flex-row",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col transition-all duration-300 ease-in-out w-full min-h-0", isCommentsOpen && "md:pr-[416px]"),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubmissionVideo, {
                                    videoUrl: latestSubmission.video?.asset || '',
                                    poster: latestSubmission.video?.thumbnail || ''
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                    lineNumber: 487,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 border-t bg-muted/20 space-y-4 flex-1",
                                    children: [
                                        isSubmissionFetching && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-xs text-muted-foreground",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                    className: "size-3.5 animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                                    lineNumber: 492,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Refreshing latest submission details..."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                            lineNumber: 491,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubmissionHeader, {
                                            title: latestSubmission.title || latestSubmission.video_filename || "Untitled Submission",
                                            description: latestSubmission.description,
                                            commentCount: commentCount,
                                            isCommentsOpen: isCommentsOpen,
                                            onToggleComments: handleToggleComments
                                        }, void 0, false, {
                                            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                            lineNumber: 496,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CreatorTrigger, {
                                            creatorProfile: latestSubmission.creator
                                        }, void 0, false, {
                                            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                            lineNumber: 504,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubmissionDetailsSection, {
                                            submission: latestSubmission,
                                            locale: locale,
                                            open: open
                                        }, void 0, false, {
                                            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                            lineNumber: 506,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubmissionActions, {
                                            submission: latestSubmission,
                                            onOpenChange: onOpenChange
                                        }, void 0, false, {
                                            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                            lineNumber: 508,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                    lineNumber: 489,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                            lineNumber: 486,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            className: "px-4 py-4 shrink-0 border-t bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur sm:justify-start",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2d$action$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubmissionActionMenu"], {
                                submission: latestSubmission,
                                showViewAction: false,
                                trigger: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ButtonGroup"], {
                                    className: "self-start",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            size: "sm",
                                            className: "font-regular flex-1",
                                            children: "Actions"
                                        }, void 0, false, {
                                            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                            lineNumber: 518,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            size: "sm",
                                            className: "font-regular shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "size-4"
                                            }, void 0, false, {
                                                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                                lineNumber: 522,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                            lineNumber: 521,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                    lineNumber: 517,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                                lineNumber: 513,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                            lineNumber: 512,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                    lineNumber: 485,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubmissionCommentsPanel, {
                    isCommentsOpen: isCommentsOpen,
                    setIsCommentsOpen: setIsCommentsOpen,
                    commentEntities: commentEntities
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
                    lineNumber: 530,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
            lineNumber: 484,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/campaigns/submission-view-dialog.tsx",
        lineNumber: 483,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}, "xz9AhhayEq7LNGVucWwrTSRjG8U=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$video$2d$submissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVideoSubmission"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$comments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubmissionComments"]
    ];
})), "xz9AhhayEq7LNGVucWwrTSRjG8U=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$video$2d$submissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVideoSubmission"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$comments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubmissionComments"]
    ];
});
_c9 = SubmissionViewDialog;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "SubmissionCardSkeleton");
__turbopack_context__.k.register(_c1, "Row");
__turbopack_context__.k.register(_c2, "SubmissionVideo");
__turbopack_context__.k.register(_c3, "SubmissionHeader");
__turbopack_context__.k.register(_c4, "CreatorTrigger");
__turbopack_context__.k.register(_c5, "SubmissionDetailsSection");
__turbopack_context__.k.register(_c6, "SubmissionActions");
__turbopack_context__.k.register(_c7, "SubmissionCommentsPanel");
__turbopack_context__.k.register(_c8, "SubmissionViewDialog$memo");
__turbopack_context__.k.register(_c9, "SubmissionViewDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/campaigns/submission-decision-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SubmissionDecisionDialog",
    ()=>SubmissionDecisionDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$confirm$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/confirm-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/textarea.tsx [app-client] (ecmascript)");
"use client";
;
;
;
function SubmissionDecisionDialog({ open, onOpenChange, title, description, confirmLabel, comment, onCommentChange, onConfirm, isLoading, loadingText, fieldId, fieldLabel, fieldPlaceholder, variant = 'default' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$confirm$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfirmDialog"], {
        open: open,
        onOpenChange: onOpenChange,
        title: title,
        description: description,
        confirmLabel: confirmLabel,
        variant: variant,
        onConfirm: onConfirm,
        isLoading: isLoading,
        loadingText: loadingText,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "pt-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    htmlFor: fieldId,
                    className: "text-xs font-medium text-foreground",
                    children: fieldLabel
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/submission-decision-dialog.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                    id: fieldId,
                    value: comment,
                    onChange: (e)=>onCommentChange(e.target.value),
                    placeholder: fieldPlaceholder,
                    className: "mt-1 min-h-20"
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/submission-decision-dialog.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/campaigns/submission-decision-dialog.tsx",
            lineNumber: 51,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/campaigns/submission-decision-dialog.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_c = SubmissionDecisionDialog;
var _c;
__turbopack_context__.k.register(_c, "SubmissionDecisionDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/campaigns/sections/documents/video-file-icon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VideoFileIcon",
    ()=>VideoFileIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dashboard-utils.ts [app-client] (ecmascript)");
;
;
const VideoFileIcon = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 304.36 298.9",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fill-current", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M115.93,178.15c-3.2,0-6.4-.8-9.3-2.5-5.7-3.4-9.2-9.3-9.2-16v-81.8c0-6.6,3.4-12.6,9.2-16,5.7-3.4,12.6-3.4,18.4-.1h0l72.4,40.9c5.9,3.3,9.4,9.3,9.4,16.1s-3.5,12.8-9.4,16.1l-72.4,40.8c-2.8,1.7-6,2.5-9.1,2.5ZM114.66,64.41c-2.07,0-4.14.52-6,1.66-3.73,2.17-5.9,6-5.9,10.25v84.67c0,4.24,2.17,8.07,5.9,10.25,3.73,2.17,8.07,2.17,11.8.1l74.94-42.33c3.83-2.17,6-6,6-10.35s-2.28-8.18-6-10.35l-74.94-42.33c-1.76-1.04-3.83-1.55-5.8-1.55v-.02Z"
            }, void 0, false, {
                fileName: "[project]/components/campaigns/sections/documents/video-file-icon.tsx",
                lineNumber: 10,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M266.56,257.52H87.08c-1.07,0-1.98-1.13-1.98-2.47s.91-2.47,1.98-2.47h179.42c1.07,0,1.98,1.13,1.98,2.47s-.85,2.47-1.92,2.47Z"
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/sections/documents/video-file-icon.tsx",
                        lineNumber: 12,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M53.31,257.52h-14.86c-1.46,0-2.68-1.13-2.68-2.47s1.23-2.47,2.68-2.47h14.86c1.46,0,2.68,1.13,2.68,2.47s-1.15,2.47-2.68,2.47Z"
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/sections/documents/video-file-icon.tsx",
                        lineNumber: 13,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M69.58,272.45c-9.6,0-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5,17.5,7.8,17.5,17.5c-.1,9.7-7.9,17.5-17.5,17.5ZM69.58,242.19c-7.1,0-12.85,5.75-12.85,12.85s5.75,12.85,12.85,12.85,12.85-5.75,12.85-12.85-5.75-12.85-12.85-12.85Z"
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/sections/documents/video-file-icon.tsx",
                        lineNumber: 14,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/campaigns/sections/documents/video-file-icon.tsx",
                lineNumber: 11,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M273.83,5.98H30.53c-13.94,0-25.28,11.34-25.28,25.28v236.25c0,13.94,11.34,25.28,25.28,25.28h243.3c13.94,0,25.28-11.34,25.28-25.28V31.26c0-13.94-11.34-25.28-25.28-25.28ZM294.61,267.51c0,11.46-9.32,20.78-20.78,20.78H30.53c-11.46,0-20.78-9.32-20.78-20.78v-47.62h284.86v47.62ZM9.75,215.39V31.26c0-11.46,9.32-20.78,20.78-20.78h243.3c11.46,0,20.78,9.32,20.78,20.78v184.13H9.75Z"
            }, void 0, false, {
                fileName: "[project]/components/campaigns/sections/documents/video-file-icon.tsx",
                lineNumber: 16,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/campaigns/sections/documents/video-file-icon.tsx",
        lineNumber: 4,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = VideoFileIcon;
var _c;
__turbopack_context__.k.register(_c, "VideoFileIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/campaigns/sections/documents/file-cards/base-file-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseFileCard",
    ()=>BaseFileCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/progress.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dashboard-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
const BaseFileCard = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c = _s(({ item, onRemove, onRetry, onPreview, isOverlay, hideFileName, style, attributes, listeners, setNodeRef, isDragging, children, progress = 0, showTitle = true, aspect = 'aspect-3/4', isSelected, isSelectionMode, onSelect })=>{
    _s();
    const [isHovering, setIsHovering] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleRemoveClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BaseFileCard.useCallback[handleRemoveClick]": (e)=>{
            e.stopPropagation();
            onRemove(item.id);
        }
    }["BaseFileCard.useCallback[handleRemoveClick]"], [
        onRemove,
        item.id
    ]);
    const handleRetryClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BaseFileCard.useCallback[handleRetryClick]": (e)=>{
            e.stopPropagation();
            onRetry(item.id);
        }
    }["BaseFileCard.useCallback[handleRetryClick]"], [
        onRetry,
        item.id
    ]);
    const handleDoubleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BaseFileCard.useCallback[handleDoubleClick]": (e)=>{
            e.stopPropagation();
            onPreview(item);
        }
    }["BaseFileCard.useCallback[handleDoubleClick]"], [
        onPreview,
        item
    ]);
    const handleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BaseFileCard.useCallback[handleClick]": (e)=>{
            e.stopPropagation();
            if (isSelectionMode) {
                onSelect?.(item.id, e.shiftKey);
                return;
            }
            // In non-DnD contexts (no drag listeners) a single click opens the preview
            if (!listeners) onPreview(item);
        }
    }["BaseFileCard.useCallback[handleClick]"], [
        listeners,
        onPreview,
        item,
        isSelectionMode,
        onSelect
    ]);
    const handlePointerEnter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BaseFileCard.useCallback[handlePointerEnter]": ()=>{
            setIsHovering(true);
        }
    }["BaseFileCard.useCallback[handlePointerEnter]"], []);
    const handlePointerLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BaseFileCard.useCallback[handlePointerLeave]": ()=>{
            setIsHovering(false);
        }
    }["BaseFileCard.useCallback[handlePointerLeave]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: setNodeRef,
        style: style,
        ...attributes,
        ...listeners,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group bg-primary/2 border rounded-sm flex flex-col items-center gap-1 select-none transition-colors relative active:cursor-grabbing justify-center", aspect, !isOverlay && (listeners ? "cursor-grab" : "cursor-pointer"), item.status === 'error' && "border-destructive/50 bg-destructive/5", item.status === 'success' && "border-green-500/50 bg-green-500/5", isSelected && "ring-2 ring-primary ring-offset-1", isDragging && "opacity-50", isOverlay && "cursor-grabbing opacity-100 shadow-xl border-primary/20 bg-background z-50"),
        onPointerEnter: handlePointerEnter,
        onPointerLeave: handlePointerLeave,
        onClick: handleClick,
        onDoubleClick: handleDoubleClick,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 bg-muted/30 rounded flex flex-col items-center justify-center overflow-hidden w-full relative h-full min-h-0",
                children: children
            }, void 0, false, {
                fileName: "[project]/components/campaigns/sections/documents/file-cards/base-file-card.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            showTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0 grid gap-1 w-full text-center mt-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center overflow-hidden w-full relative",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-xs font-normal line-clamp-2 wrap-words max-w-full px-2 py-2", item.status === 'error' && "text-destructive", hideFileName && "hidden"),
                        title: item.name,
                        children: item.name
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/sections/documents/file-cards/base-file-card.tsx",
                        lineNumber: 104,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/sections/documents/file-cards/base-file-card.tsx",
                    lineNumber: 103,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/campaigns/sections/documents/file-cards/base-file-card.tsx",
                lineNumber: 102,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            item.status === 'uploading' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full flex flex-col items-center gap-1 absolute bottom-4 left-1/2 transform -translate-x-1/2 max-w-[90%]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Progress"], {
                    value: progress,
                    className: "h-px! w-full"
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/sections/documents/file-cards/base-file-card.tsx",
                    lineNumber: 119,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/campaigns/sections/documents/file-cards/base-file-card.tsx",
                lineNumber: 118,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            (isHovering || isSelected || isSelectionMode) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute top-1.5 left-1.5 z-20 w-4.5 h-4.5 rounded-full border-1.5 flex items-center justify-center transition-all cursor-pointer", isSelected ? "bg-primary border-primary" : "bg-background/80 border-muted-foreground/50 hover:border-primary"),
                onClick: (e)=>{
                    e.stopPropagation();
                    onSelect?.(item.id, e.shiftKey);
                },
                onPointerDown: (e)=>e.stopPropagation(),
                children: isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                    className: "text-primary-foreground size-3",
                    strokeWidth: 2
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/sections/documents/file-cards/base-file-card.tsx",
                    lineNumber: 134,
                    columnNumber: 27
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/campaigns/sections/documents/file-cards/base-file-card.tsx",
                lineNumber: 124,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: item.status === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute bottom-1.5 left-1.5 z-20 pointer-events-none",
                    initial: {
                        opacity: 0,
                        scale: 0.4
                    },
                    animate: {
                        opacity: 1,
                        scale: 1
                    },
                    exit: {
                        opacity: 0,
                        scale: 0.4
                    },
                    transition: {
                        type: 'spring',
                        stiffness: 400,
                        damping: 20
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-full bg-green-500/50 p-0.5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                            size: 16,
                            className: "text-white",
                            strokeWidth: 2
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/sections/documents/file-cards/base-file-card.tsx",
                            lineNumber: 149,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/sections/documents/file-cards/base-file-card.tsx",
                        lineNumber: 148,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, `success-${item.id}`, false, {
                    fileName: "[project]/components/campaigns/sections/documents/file-cards/base-file-card.tsx",
                    lineNumber: 140,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/campaigns/sections/documents/file-cards/base-file-card.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "flex items-center gap-0 absolute bottom-0 right-0 p-1",
                    initial: {
                        opacity: 0,
                        y: 100
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: 100
                    },
                    transition: {
                        duration: 1
                    },
                    children: [
                        (isHovering || isOverlay) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            onClick: handleRemoveClick,
                            size: "icon",
                            onPointerDown: (e)=>e.stopPropagation(),
                            title: "Remove file",
                            className: "bg-background/90 hover:text-primary rounded-full p-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                size: 14,
                                strokeWidth: 1
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/sections/documents/file-cards/base-file-card.tsx",
                                lineNumber: 166,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/sections/documents/file-cards/base-file-card.tsx",
                            lineNumber: 158,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        item.status === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            onClick: handleRetryClick,
                            size: "icon",
                            onPointerDown: (e)=>e.stopPropagation(),
                            title: "Retry upload",
                            className: "bg-background/90 hover:text-primary rounded-full p-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                size: 14,
                                strokeWidth: 1
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/sections/documents/file-cards/base-file-card.tsx",
                                lineNumber: 178,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/sections/documents/file-cards/base-file-card.tsx",
                            lineNumber: 170,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, `actions-${item.id}`, true, {
                    fileName: "[project]/components/campaigns/sections/documents/file-cards/base-file-card.tsx",
                    lineNumber: 156,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/campaigns/sections/documents/file-cards/base-file-card.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/campaigns/sections/documents/file-cards/base-file-card.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}, "95Wty/yUcgqc8VuVCpw7YwwHS64=")), "95Wty/yUcgqc8VuVCpw7YwwHS64=");
_c1 = BaseFileCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "BaseFileCard$memo");
__turbopack_context__.k.register(_c1, "BaseFileCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/campaigns/sections/documents/media.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Media",
    ()=>Media
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Media = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c = ({ url, alt, type = 'image', className })=>{
    if (type === 'video') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
            src: url,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(className),
            controls: true,
            playsInline: true
        }, void 0, false, {
            fileName: "[project]/components/campaigns/sections/documents/media.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
        src: url,
        alt: alt,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(className)
    }, void 0, false, {
        fileName: "[project]/components/campaigns/sections/documents/media.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Media;
var _c, _c1;
__turbopack_context__.k.register(_c, "Media$memo");
__turbopack_context__.k.register(_c1, "Media");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/campaigns/media-preview.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MediaPreview",
    ()=>MediaPreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Document$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Document$3e$__ = __turbopack_context__.i("[project]/node_modules/react-pdf/dist/Document.js [app-client] (ecmascript) <export default as Document>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Page$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Page$3e$__ = __turbopack_context__.i("[project]/node_modules/react-pdf/dist/Page.js [app-client] (ecmascript) <export default as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__ = __turbopack_context__.i("[project]/node_modules/pdfjs-dist/build/pdf.mjs [app-client] (ecmascript) <export * as pdfjs>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/imgproxy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
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
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__["pdfjs"].GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__["pdfjs"].version}/build/pdf.worker.min.mjs`;
const MIN_PREVIEW_HEIGHT = 300;
const PdfPreview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/components/campaigns/sections/documents/pdf-preview.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/components/campaigns/sections/documents/pdf-preview.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-full text-muted-foreground gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    className: "animate-spin h-8 w-8"
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/media-preview.tsx",
                    lineNumber: 64,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Loading PDF viewer..."
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/media-preview.tsx",
                    lineNumber: 65,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/campaigns/media-preview.tsx",
            lineNumber: 63,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
});
_c = PdfPreview;
const PdfThumbnail = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(({ src })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Document$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Document$3e$__["Document"], {
        file: {
            url: src
        },
        loading: null,
        error: null,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Page$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Page$3e$__["Page"], {
            pageNumber: 1,
            width: 40,
            renderTextLayer: false,
            renderAnnotationLayer: false
        }, void 0, false, {
            fileName: "[project]/components/campaigns/media-preview.tsx",
            lineNumber: 72,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/campaigns/media-preview.tsx",
        lineNumber: 71,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = PdfThumbnail;
PdfThumbnail.displayName = 'PdfThumbnail';
// Helper to determine media kind from legacy format
function inferMediaKind(item) {
    if (item.type) {
        if (item.type.startsWith('image/')) return 'image';
        if (item.type.startsWith('video/')) return 'video';
        if (item.type.includes('pdf')) return 'pdf';
    }
    const url = item.url.toLowerCase().split('?')[0];
    if (url.endsWith('.pdf')) return 'pdf';
    if (/\.(mp4|webm|ogg|mov)$/.test(url)) return 'video';
    if (/\.(jpe?g|png|gif|webp|svg|avif)$/.test(url)) return 'image';
    return 'unknown';
}
// Convert legacy media item to discriminated union
function normalizeMediaItem(item) {
    const kind = inferMediaKind(item);
    return {
        kind,
        url: item.url,
        thumbnail: item.thumbnail,
        name: item.name
    };
}
function resolveImageUrl(url) {
    if (url.startsWith('blob:') || url.startsWith('data:')) return url;
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imgpresets"].large(url);
}
function resolveThumbnailUrl(url) {
    if (url.startsWith('blob:') || url.startsWith('data:')) return url;
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imgpresets"].thumbnail(url);
}
function buildVariants(preset, duration, ease) {
    const t = ease ? {
        duration,
        ease: ease
    } : {
        duration
    };
    switch(preset){
        case 'slide':
            return {
                initial: {
                    opacity: 0,
                    x: 20
                },
                animate: {
                    opacity: 1,
                    x: 0,
                    transition: t
                },
                exit: {
                    opacity: 0,
                    x: -20,
                    transition: t
                }
            };
        case 'scale':
            return {
                initial: {
                    opacity: 0,
                    scale: 0.95,
                    transformOrigin: 'center'
                },
                animate: {
                    opacity: 1,
                    scale: 1,
                    transformOrigin: 'center',
                    transition: t
                },
                exit: {
                    opacity: 0,
                    scale: 0.95,
                    transformOrigin: 'center',
                    transition: t
                }
            };
        case 'zoom':
            return {
                initial: {
                    opacity: 0,
                    scale: 0.85,
                    transformOrigin: 'center'
                },
                animate: {
                    opacity: 1,
                    scale: 1,
                    transformOrigin: 'center',
                    transition: t
                },
                exit: {
                    opacity: 0,
                    scale: 1.1,
                    transformOrigin: 'center',
                    transition: t
                }
            };
        case 'none':
            return {
                initial: {},
                animate: {},
                exit: {}
            };
        case 'fade':
        default:
            return {
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1,
                    transition: t
                },
                exit: {
                    opacity: 0,
                    transition: t
                }
            };
    }
}
function VideoRenderer({ item, index, isLoaded, onLoad, poster }) {
    _s();
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VideoRenderer.useEffect": ()=>{
            const video = videoRef.current;
            if (!video) return;
            // If metadata is already loaded (e.g. from cache), trigger onLoad immediately
            if (video.readyState >= 1 && video.videoWidth > 0) {
                onLoad({
                    w: video.videoWidth,
                    h: video.videoHeight
                });
            }
        }
    }["VideoRenderer.useEffect"], [
        item.url,
        onLoad
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full flex items-center justify-center pointer-events-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                    ref: videoRef,
                    src: item.url,
                    poster: poster,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('max-h-[60vh] w-full object-contain', !isLoaded ? 'opacity-0' : 'opacity-100'),
                    controls: true,
                    autoPlay: true,
                    playsInline: true,
                    preload: "metadata",
                    onLoadedMetadata: (e)=>{
                        const video = e.currentTarget;
                        if (video.videoWidth > 0) {
                            onLoad({
                                w: video.videoWidth,
                                h: video.videoHeight
                            });
                        }
                    },
                    onCanPlay: (e)=>{
                        const video = e.currentTarget;
                        if (video.videoWidth > 0) {
                            onLoad({
                                w: video.videoWidth,
                                h: video.videoHeight
                            });
                        }
                    }
                }, item.url, false, {
                    fileName: "[project]/components/campaigns/media-preview.tsx",
                    lineNumber: 179,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/campaigns/media-preview.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this),
            !isLoaded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-xs gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "size-9 rounded-full border-2 border-primary/30 border-t-primary animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/media-preview.tsx",
                        lineNumber: 208,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted-foreground font-medium uppercase tracking-wider",
                        children: "Loading"
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/media-preview.tsx",
                        lineNumber: 209,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/campaigns/media-preview.tsx",
                lineNumber: 207,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(VideoRenderer, "PdMsmLAy5JKU3vCrhAlqGYQfKuA=");
_c2 = VideoRenderer;
function ImageRenderer({ item, index, isLoaded, onLoad }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: resolveImageUrl(item.url),
                alt: item.name ?? `Asset ${index + 1}`,
                className: "max-h-[60vh] w-full object-contain",
                onLoad: (e)=>{
                    const img = e.currentTarget;
                    onLoad({
                        w: img.naturalWidth,
                        h: img.naturalHeight
                    });
                }
            }, void 0, false, {
                fileName: "[project]/components/campaigns/media-preview.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this),
            !isLoaded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex items-center justify-center bg-background/60",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "size-7 rounded-full border-2 border-primary border-t-transparent animate-spin"
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/media-preview.tsx",
                    lineNumber: 231,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/campaigns/media-preview.tsx",
                lineNumber: 230,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_c3 = ImageRenderer;
function PdfRenderer({ item, isOpen }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-[75vh] pointer-events-auto",
        children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PdfPreview, {
            src: item.url,
            thumbnail: item.thumbnail ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imgpresets"].thumbnail(item.thumbnail) : undefined
        }, void 0, false, {
            fileName: "[project]/components/campaigns/media-preview.tsx",
            lineNumber: 241,
            columnNumber: 19
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/campaigns/media-preview.tsx",
        lineNumber: 240,
        columnNumber: 5
    }, this);
}
_c4 = PdfRenderer;
function UnknownRenderer({ item }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center gap-3 py-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-muted-foreground",
                children: "Preview not available"
            }, void 0, false, {
                fileName: "[project]/components/campaigns/media-preview.tsx",
                lineNumber: 249,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                variant: "outline",
                size: "sm",
                onClick: ()=>window.open(item.url, '_blank', 'noopener,noreferrer'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                        className: "size-4 mr-1.5"
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/media-preview.tsx",
                        lineNumber: 255,
                        columnNumber: 9
                    }, this),
                    "Open file"
                ]
            }, void 0, true, {
                fileName: "[project]/components/campaigns/media-preview.tsx",
                lineNumber: 250,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/campaigns/media-preview.tsx",
        lineNumber: 248,
        columnNumber: 5
    }, this);
}
_c5 = UnknownRenderer;
function MediaPreview({ items: rawItems, initialIndex, onOpenChange, animation }) {
    _s1();
    // Normalize all items to discriminated union format
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MediaPreview.useMemo[items]": ()=>rawItems.map({
                "MediaPreview.useMemo[items]": (item)=>'kind' in item ? item : normalizeMediaItem(item)
            }["MediaPreview.useMemo[items]"])
    }["MediaPreview.useMemo[items]"], [
        rawItems
    ]);
    const open = initialIndex != null;
    const single = items.length <= 1;
    const [index, setIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialIndex ?? 0);
    const [loadedSet, setLoadedSet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "MediaPreview.useState": ()=>new Set()
    }["MediaPreview.useState"]);
    const [height, setHeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const wrapperRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const directionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(1);
    const sizesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const current = items[index];
    const kind = current?.kind ?? 'unknown';
    const duration = animation?.duration ?? 0.25;
    const ease = animation?.ease;
    // Use provided preset if available, otherwise default to 'fade'
    // (fade works better for videos to avoid jarring transitions, but user preference takes precedence)
    const effectivePreset = animation?.preset ?? 'fade';
    const variants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MediaPreview.useMemo[variants]": ()=>buildVariants(effectivePreset, duration, ease)
    }["MediaPreview.useMemo[variants]"], [
        effectivePreset,
        duration,
        ease
    ]);
    const heightTransition = {
        duration: duration * 1.4,
        ease: ease ?? [
            0.4,
            0,
            0.2,
            1
        ]
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MediaPreview.useEffect": ()=>{
            if (initialIndex != null) setIndex(initialIndex);
            // Reset loaded state and sizes when items change to avoid stale state (e.g. index 0 loaded from a previous gallery)
            setLoadedSet(new Set());
            sizesRef.current.clear();
        }
    }["MediaPreview.useEffect"], [
        initialIndex,
        rawItems
    ]);
    // Auto-height for images and videos in multi-item mode
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MediaPreview.useEffect": ()=>{
            if (single || kind !== 'image' && kind !== 'video' || !wrapperRef.current) return;
            const size = sizesRef.current.get(index);
            if (!size) return;
            // Use the actual rendered container width so the height is always correct
            // regardless of screen size — this avoids using window.innerWidth which
            // can be inaccurate inside portals or when the dialog hasn't settled yet.
            const containerW = wrapperRef.current.offsetWidth || window.innerWidth - 32;
            const maxH = window.innerHeight * 0.60;
            const aspectRatio = size.w / size.h;
            let calculatedH = containerW / aspectRatio;
            if (calculatedH > maxH) calculatedH = maxH;
            setHeight(Math.round(calculatedH));
        }
    }["MediaPreview.useEffect"], [
        index,
        loadedSet,
        kind,
        single
    ]);
    // Preload nearby images in multi-item mode
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MediaPreview.useEffect": ()=>{
            if (single || kind !== 'image') return;
            const preload = {
                "MediaPreview.useEffect.preload": (url)=>{
                    if (!url) return;
                    const img = new Image();
                    img.src = resolveImageUrl(url);
                }
            }["MediaPreview.useEffect.preload"];
            preload(items[index]?.url);
            preload(items[index + 1]?.url);
            preload(items[index - 1]?.url);
        }
    }["MediaPreview.useEffect"], [
        index,
        items,
        kind,
        single
    ]);
    // Preload nearby video metadata in multi-item mode
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MediaPreview.useEffect": ()=>{
            if (single) return;
            const preload = {
                "MediaPreview.useEffect.preload": (item)=>{
                    if (!item || item.kind !== 'video') return;
                    const vid = document.createElement('video');
                    vid.preload = 'metadata';
                    vid.src = item.url;
                }
            }["MediaPreview.useEffect.preload"];
            for(let offset = -3; offset <= 3; offset++){
                if (offset === 0) continue;
                preload(items[index + offset]);
            }
        }
    }["MediaPreview.useEffect"], [
        index,
        items,
        single
    ]);
    // Preload video thumbnails to get dimensions early
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MediaPreview.useEffect": ()=>{
            if (single || kind !== 'video' || !current || !current.thumbnail || sizesRef.current.has(index)) return;
            const img = new Image();
            img.onload = ({
                "MediaPreview.useEffect": ()=>{
                    // Store thumbnail dimensions as initial estimate
                    if (!sizesRef.current.has(index)) {
                        sizesRef.current.set(index, {
                            w: img.naturalWidth,
                            h: img.naturalHeight
                        });
                        setLoadedSet({
                            "MediaPreview.useEffect": (prev)=>new Set([
                                    ...prev,
                                    index
                                ])
                        }["MediaPreview.useEffect"]);
                    }
                }
            })["MediaPreview.useEffect"];
            img.src = resolveThumbnailUrl(current.thumbnail);
        }
    }["MediaPreview.useEffect"], [
        index,
        current,
        kind,
        single
    ]);
    // Early return if no items - must be after all hooks to avoid hook ordering issues
    if (items.length === 0 || !current) return null;
    function prev() {
        directionRef.current = -1;
        setIndex((i)=>(i - 1 + items.length) % items.length);
    }
    function next() {
        directionRef.current = 1;
        setIndex((i)=>(i + 1) % items.length);
    }
    function goTo(i) {
        directionRef.current = i >= index ? 1 : -1;
        setIndex(i);
    }
    function handleKeyDown(e) {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    }
    // Single-item mode — matches PreviewDialog UX
    if (single) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
            open: open,
            onOpenChange: onOpenChange,
            modal: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                className: "w-full md:w-[1000px] md:max-w-none h-[80vh] p-0 overflow-hidden flex flex-col bg-background/95 backdrop-blur-sm gap-0",
                children: [
                    current.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                        className: "p-4 border-b shrink-0 flex flex-row items-center justify-between",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            className: "truncate pr-8 text-h6! font-primary font-normal text-muted-foreground/78",
                            children: current.name
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/media-preview.tsx",
                            lineNumber: 407,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/media-preview.tsx",
                        lineNumber: 406,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-hidden relative bg-muted/20 flex items-center justify-center p-4",
                        children: [
                            kind === 'image' && // eslint-disable-next-line @next/next/no-img-element
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: resolveImageUrl(current.url),
                                alt: current.name ?? '',
                                className: "max-w-full max-h-full object-contain shadow-sm rounded-sm"
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/media-preview.tsx",
                                lineNumber: 415,
                                columnNumber: 15
                            }, this),
                            kind === 'video' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                src: current.url,
                                preload: "metadata",
                                className: "max-w-full max-h-full object-contain shadow-sm rounded-sm",
                                controls: true,
                                autoPlay: true,
                                playsInline: true
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/media-preview.tsx",
                                lineNumber: 422,
                                columnNumber: 15
                            }, this),
                            kind === 'pdf' && open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PdfPreview, {
                                src: current.url,
                                thumbnail: current.thumbnail ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imgpresets"].thumbnail(current.thumbnail) : undefined
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/media-preview.tsx",
                                lineNumber: 431,
                                columnNumber: 41
                            }, this),
                            kind === 'unknown' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                src: current.url,
                                className: "w-full h-full rounded-sm border bg-white -mt-4",
                                title: current.name
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/media-preview.tsx",
                                lineNumber: 433,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/campaigns/media-preview.tsx",
                        lineNumber: 412,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/campaigns/media-preview.tsx",
                lineNumber: 404,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/campaigns/media-preview.tsx",
            lineNumber: 403,
            columnNumber: 7
        }, this);
    }
    // Multi-item mode — matches ImagePreviewDialog UX
    const isDocOrUnknown = kind === 'pdf' || kind === 'unknown';
    const poster = current?.thumbnail ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imgpresets"].large(current.thumbnail) : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('p-0 overflow-hidden gap-0 outline-none', isDocOrUnknown ? 'max-w-4xl' : 'max-w-2xl'),
            showCloseButton: true,
            onKeyDown: handleKeyDown,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative group/arrows",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            ref: wrapperRef,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative overflow-hidden bg-black/5 w-full', isDocOrUnknown ? 'h-[75vh]' : ''),
                            style: !isDocOrUnknown ? {
                                minHeight: MIN_PREVIEW_HEIGHT
                            } : undefined,
                            animate: isDocOrUnknown ? {} : {
                                height: height ?? MIN_PREVIEW_HEIGHT
                            },
                            transition: heightTransition,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex items-center justify-center w-full h-full pointer-events-none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    initial: false,
                                    custom: directionRef.current,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        custom: directionRef.current,
                                        variants: variants,
                                        initial: "initial",
                                        animate: "animate",
                                        exit: "exit",
                                        className: "absolute inset-0 flex items-center justify-center origin-center w-full",
                                        children: (()=>{
                                            const handleLoad = (dimensions)=>{
                                                sizesRef.current.set(index, dimensions);
                                                setLoadedSet((prev)=>new Set([
                                                        ...prev,
                                                        index
                                                    ]));
                                            };
                                            switch(current.kind){
                                                case 'video':
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VideoRenderer, {
                                                        item: current,
                                                        index: index,
                                                        isLoaded: loadedSet.has(index),
                                                        onLoad: handleLoad,
                                                        poster: poster
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/campaigns/media-preview.tsx",
                                                        lineNumber: 490,
                                                        columnNumber: 27
                                                    }, this);
                                                case 'image':
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageRenderer, {
                                                        item: current,
                                                        index: index,
                                                        isLoaded: loadedSet.has(index),
                                                        onLoad: handleLoad
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/campaigns/media-preview.tsx",
                                                        lineNumber: 500,
                                                        columnNumber: 27
                                                    }, this);
                                                case 'pdf':
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PdfRenderer, {
                                                        item: current,
                                                        isOpen: open
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/campaigns/media-preview.tsx",
                                                        lineNumber: 508,
                                                        columnNumber: 32
                                                    }, this);
                                                case 'unknown':
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UnknownRenderer, {
                                                        item: current
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/campaigns/media-preview.tsx",
                                                        lineNumber: 510,
                                                        columnNumber: 32
                                                    }, this);
                                            }
                                        })()
                                    }, `${current.url}-${index}`, false, {
                                        fileName: "[project]/components/campaigns/media-preview.tsx",
                                        lineNumber: 472,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/media-preview.tsx",
                                    lineNumber: 471,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/media-preview.tsx",
                                lineNumber: 470,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/media-preview.tsx",
                            lineNumber: 460,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            whileTap: {
                                scale: 0.88
                            },
                            transition: {
                                duration: 0.1
                            },
                            className: "absolute left-2 top-1/2 -translate-y-1/2 z-20",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                "aria-label": "Previous",
                                variant: "ghost",
                                size: "icon-sm",
                                onClick: prev,
                                className: "bg-background/80 hover:bg-background shadow-md border active:translate-y-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                    className: "size-5"
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/media-preview.tsx",
                                    lineNumber: 530,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/media-preview.tsx",
                                lineNumber: 523,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/media-preview.tsx",
                            lineNumber: 518,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            whileTap: {
                                scale: 0.88
                            },
                            transition: {
                                duration: 0.1
                            },
                            className: "absolute right-2 top-1/2 -translate-y-1/2 z-20",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                "aria-label": "Next",
                                variant: "ghost",
                                size: "icon-sm",
                                onClick: next,
                                className: "bg-background/80 hover:bg-background shadow-md border active:translate-y-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                    className: "size-5"
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/media-preview.tsx",
                                    lineNumber: 546,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/media-preview.tsx",
                                lineNumber: 539,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/media-preview.tsx",
                            lineNumber: 534,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/campaigns/media-preview.tsx",
                    lineNumber: 459,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center gap-2 px-4 py-3 border-t bg-background",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-muted-foreground",
                            children: [
                                index + 1,
                                " / ",
                                items.length
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/campaigns/media-preview.tsx",
                            lineNumber: 552,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-1.5 overflow-x-auto max-w-full pb-1",
                            children: items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>goTo(i),
                                    className: `shrink-0 size-10 rounded border-2 overflow-hidden transition-all ${i === index ? 'border-primary' : 'border-transparent opacity-50 hover:opacity-80'}`,
                                    children: item.kind === 'image' ? // eslint-disable-next-line @next/next/no-img-element
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: resolveThumbnailUrl(item.thumbnail ?? item.url),
                                        alt: `Thumb ${i + 1}`,
                                        className: "size-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/components/campaigns/media-preview.tsx",
                                        lineNumber: 566,
                                        columnNumber: 19
                                    }, this) : item.kind === 'video' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "size-full overflow-hidden flex items-center justify-center bg-black/60 relative",
                                        children: [
                                            item.thumbnail ? // eslint-disable-next-line @next/next/no-img-element
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imgpresets"].thumbnail(item.thumbnail),
                                                alt: "",
                                                className: "size-full object-cover"
                                            }, void 0, false, {
                                                fileName: "[project]/components/campaigns/media-preview.tsx",
                                                lineNumber: 575,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                                src: item.url,
                                                className: "size-full object-cover",
                                                muted: true,
                                                preload: "metadata"
                                            }, void 0, false, {
                                                fileName: "[project]/components/campaigns/media-preview.tsx",
                                                lineNumber: 577,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "size-4 rounded-full bg-white/80 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-black/70 ml-0.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/campaigns/media-preview.tsx",
                                                        lineNumber: 581,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/campaigns/media-preview.tsx",
                                                    lineNumber: 580,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/campaigns/media-preview.tsx",
                                                lineNumber: 579,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/campaigns/media-preview.tsx",
                                        lineNumber: 572,
                                        columnNumber: 19
                                    }, this) : item.kind === 'pdf' && item.thumbnail ? // eslint-disable-next-line @next/next/no-img-element
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imgpresets"].thumbnail(item.thumbnail),
                                        alt: `Thumb ${i + 1}`,
                                        className: "size-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/components/campaigns/media-preview.tsx",
                                        lineNumber: 587,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "size-full overflow-hidden flex items-center justify-center bg-muted/40",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PdfThumbnail, {
                                            src: item.url
                                        }, void 0, false, {
                                            fileName: "[project]/components/campaigns/media-preview.tsx",
                                            lineNumber: 594,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/campaigns/media-preview.tsx",
                                        lineNumber: 593,
                                        columnNumber: 19
                                    }, this)
                                }, `${item.url}-${i}`, false, {
                                    fileName: "[project]/components/campaigns/media-preview.tsx",
                                    lineNumber: 555,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/media-preview.tsx",
                            lineNumber: 553,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/campaigns/media-preview.tsx",
                    lineNumber: 551,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/campaigns/media-preview.tsx",
            lineNumber: 451,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/campaigns/media-preview.tsx",
        lineNumber: 450,
        columnNumber: 5
    }, this);
}
_s1(MediaPreview, "ewxz+f3UGnUXzVoFntMShTk591Y=");
_c6 = MediaPreview;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "PdfPreview");
__turbopack_context__.k.register(_c1, "PdfThumbnail");
__turbopack_context__.k.register(_c2, "VideoRenderer");
__turbopack_context__.k.register(_c3, "ImageRenderer");
__turbopack_context__.k.register(_c4, "PdfRenderer");
__turbopack_context__.k.register(_c5, "UnknownRenderer");
__turbopack_context__.k.register(_c6, "MediaPreview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/campaigns/sections/documents/preview-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PreviewDialog",
    ()=>PreviewDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$media$2d$preview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/media-preview.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function PreviewDialog({ item, onClose }) {
    _s();
    const [mediaItem, setMediaItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PreviewDialog.useEffect": ()=>{
            if (!item) {
                setMediaItem(null);
                return;
            }
            // Uploaded file — use the final URL directly
            if (item.url) {
                setMediaItem({
                    url: item.url,
                    thumbnail: item.thumbnail,
                    name: item.name,
                    type: item.type
                });
                return;
            }
            // Still uploading — create a blob URL from the File so videos/PDFs are actually previewable
            if (item.file) {
                const blobUrl = URL.createObjectURL(item.file);
                setMediaItem({
                    url: blobUrl,
                    thumbnail: item.preview,
                    name: item.name,
                    type: item.type
                });
                return ({
                    "PreviewDialog.useEffect": ()=>URL.revokeObjectURL(blobUrl)
                })["PreviewDialog.useEffect"];
            }
            // Fallback (images already have a full data URL in preview)
            setMediaItem({
                url: item.preview ?? '',
                thumbnail: item.thumbnail,
                name: item.name,
                type: item.type
            });
        }
    }["PreviewDialog.useEffect"], [
        item
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$media$2d$preview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MediaPreview"], {
        items: mediaItem ? [
            mediaItem
        ] : [],
        initialIndex: mediaItem ? 0 : null,
        onOpenChange: (open)=>{
            if (!open) onClose();
        }
    }, void 0, false, {
        fileName: "[project]/components/campaigns/sections/documents/preview-dialog.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_s(PreviewDialog, "xF/mNCOGJ9eQyBUY5AVtD8CIyWk=");
_c = PreviewDialog;
var _c;
__turbopack_context__.k.register(_c, "PreviewDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/campaigns/submission-update-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SubmissionUpdateDialog",
    ()=>SubmissionUpdateDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$confirm$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/confirm-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$creator$2f$video$2d$dropzone$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/creator/video-dropzone.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function SubmissionUpdateDialog({ open, onOpenChange, title, description, videoFile, updateSubmissionError, onTitleChange, onDescriptionChange, onVideoChange, onUploadSuccess, onConfirm, isLoading }) {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.brand.campaignsPage.actions');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$confirm$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfirmDialog"], {
        open: open,
        onOpenChange: onOpenChange,
        title: t('updateSubmissionTitle'),
        description: t('updateSubmissionDescription'),
        confirmLabel: t('updateSubmission'),
        onConfirm: onConfirm,
        isLoading: isLoading,
        loadingText: t('updating'),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "pt-2 space-y-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            htmlFor: "submission-title",
                            className: "text-xs font-medium text-foreground",
                            children: t('title')
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission-update-dialog.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                            id: "submission-title",
                            value: title,
                            onChange: (e)=>onTitleChange(e.target.value),
                            placeholder: t('submissionTitlePlaceholder'),
                            className: "mt-1"
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission-update-dialog.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/campaigns/submission-update-dialog.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            htmlFor: "submission-description",
                            className: "text-xs font-medium text-foreground",
                            children: t('description')
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission-update-dialog.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                            id: "submission-description",
                            value: description,
                            onChange: (e)=>onDescriptionChange(e.target.value),
                            placeholder: t('submissionDescriptionPlaceholder'),
                            className: "mt-1 min-h-20"
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission-update-dialog.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/campaigns/submission-update-dialog.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                            htmlFor: "video",
                            children: t('videoFile')
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission-update-dialog.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$creator$2f$video$2d$dropzone$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VideoDropzone"], {
                            value: videoFile,
                            videoAspect: true,
                            onChange: onVideoChange,
                            onUploadSuccess: onUploadSuccess,
                            showTitle: false
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission-update-dialog.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this),
                        updateSubmissionError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-destructive",
                            children: updateSubmissionError
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission-update-dialog.tsx",
                            lineNumber: 83,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-muted-foreground",
                            children: t('uploadRequiredMessage')
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission-update-dialog.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/campaigns/submission-update-dialog.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/campaigns/submission-update-dialog.tsx",
            lineNumber: 52,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/campaigns/submission-update-dialog.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_s(SubmissionUpdateDialog, "h6+q2O3NJKPY5uL0BIJGLIanww8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"]
    ];
});
_c = SubmissionUpdateDialog;
var _c;
__turbopack_context__.k.register(_c, "SubmissionUpdateDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/campaigns/submission-action-menu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SubmissionActionMenu",
    ()=>SubmissionActionMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$action$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/action-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$models$2d$brand$2d$video$2d$decision$2d$request$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/generated/models/models-brand-video-decision-request.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$video$2d$submission$2d$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/generated/models/utils-video-submission-status.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$video$2d$submissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/hooks/video-submissions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-client] (ecmascript) <export default as MoreVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/undo-2.js [app-client] (ecmascript) <export default as Undo2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2d$view$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/submission-view-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2d$decision$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/submission-decision-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2d$update$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/submission-update-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$confirm$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/confirm-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
function SubmissionActionMenu({ submission, trigger, showViewAction = true }) {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.brand.submissionsPage.actions');
    const campaignActionsT = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.brand.campaignsPage.actions');
    const updateSubmission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$video$2d$submissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateVideoSubmission"])();
    const updateSubmissionStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$video$2d$submissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateVideoSubmissionStatus"])();
    const submissionDecision = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$video$2d$submissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVideoSubmissionDecision"])();
    const submitVideoSubmission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$video$2d$submissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubmitVideoSubmission"])();
    const deleteSubmission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$video$2d$submissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeleteVideoSubmission"])();
    const [isAcceptOpen, setIsAcceptOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isRejectOpen, setIsRejectOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDeleteOpen, setIsDeleteOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isViewOpen, setIsViewOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isUpdateSubmissionOpen, setIsUpdateSubmissionOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAdminApproveOpen, setIsAdminApproveOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAdminRejectOpen, setIsAdminRejectOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAdminReturnOpen, setIsAdminReturnOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [acceptComment, setAcceptComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [rejectComment, setRejectComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [adminApproveComment, setAdminApproveComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [adminRejectComment, setAdminRejectComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [adminReturnComment, setAdminReturnComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isConfirmOpen, setIsConfirmOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(submission.title || '');
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(submission.description || '');
    const [videoFile, setVideoFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [uploadedVideoData, setUploadedVideoData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [updateSubmissionError, setUpdateSubmissionError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const syncSubmissionFormState = ()=>{
        setTitle(submission.title || '');
        setDescription(submission.description || '');
        setVideoFile(null);
        setUploadedVideoData(null);
        setUpdateSubmissionError(null);
    };
    const handleViewSubmission = ()=>{
        if (!submission.video?.asset) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(t('noVideoAvailable'));
            return;
        }
        setIsViewOpen(true);
    };
    const handleConfirmSubmission = ()=>{
        if (!submission.id) return;
        setIsConfirmOpen(true);
    };
    const handleConfirmSubmissionSubmit = async ()=>{
        if (!submission.id) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].promise(submitVideoSubmission.mutateAsync({
            id: submission.id
        }), {
            loading: t('submittingForApproval'),
            success: t('submissionSentForApproval'),
            error: t('submitForApprovalFailed')
        });
        setIsConfirmOpen(false);
    };
    const isApprovedSubmission = (submission.status || '').toLowerCase() === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$video$2d$submission$2d$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UtilsVideoSubmissionStatus"].VideoSubmissionStatusApproved;
    const handleDecision = async (decision, comment)=>{
        if (!submission.id) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].promise(submissionDecision.mutateAsync({
            id: submission.id,
            data: {
                status: decision,
                comments: comment?.trim() || undefined
            }
        }), {
            loading: decision === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$models$2d$brand$2d$video$2d$decision$2d$request$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModelsBrandVideoDecisionRequestStatusEnum"].Accepted ? t('acceptingSubmission') : t('rejectingSubmission'),
            success: decision === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$models$2d$brand$2d$video$2d$decision$2d$request$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModelsBrandVideoDecisionRequestStatusEnum"].Accepted ? t('submissionAccepted') : t('submissionRejected'),
            error: t('updateDecisionFailed')
        });
    };
    const handleUpdateSubmission = async ()=>{
        if (!submission.id) return;
        if (isApprovedSubmission) {
            setUpdateSubmissionError(t('approvedCannotBeUpdated'));
            return false;
        }
        if (!uploadedVideoData?.url) {
            setUpdateSubmissionError(t('uploadVideoBeforeUpdating'));
            return false;
        }
        let parsedUrl;
        try {
            parsedUrl = new URL(uploadedVideoData.url);
        } catch  {
            setUpdateSubmissionError(t('uploadedUrlInvalid'));
            return false;
        }
        if (![
            'http:',
            'https:'
        ].includes(parsedUrl.protocol)) {
            setUpdateSubmissionError(t('uploadedUrlMustBeHttp'));
            return false;
        }
        setUpdateSubmissionError(null);
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].promise(updateSubmission.mutateAsync({
            id: submission.id,
            submission: {
                title: title.trim() || undefined,
                description: description.trim() || undefined,
                video: {
                    asset: uploadedVideoData.url,
                    thumbnail: uploadedVideoData.thumbnail
                },
                video_filename: uploadedVideoData?.filename || submission.video_filename
            }
        }), {
            loading: t('updatingSubmission'),
            success: t('submissionUpdated'),
            error: t('updateSubmissionFailed')
        });
        return true;
    };
    const actions = [
        ...showViewAction ? [
            {
                label: t('viewSubmission'),
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"],
                condition: (current)=>!!current.video?.asset,
                action: ()=>handleViewSubmission()
            }
        ] : [],
        {
            label: t('acceptSubmission'),
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"],
            allowedRoles: [
                'brand'
            ],
            condition: (current)=>!!current.id && current.status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$video$2d$submission$2d$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UtilsVideoSubmissionStatus"].VideoSubmissionStatusApproved,
            action: ()=>setIsAcceptOpen(true)
        },
        {
            label: t('rejectSubmission'),
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"],
            allowedRoles: [
                'brand'
            ],
            condition: (current)=>!!current.id && current.status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$video$2d$submission$2d$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UtilsVideoSubmissionStatus"].VideoSubmissionStatusApproved,
            action: ()=>setIsRejectOpen(true)
        },
        {
            label: t('updateSubmission'),
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"],
            allowedRoles: [
                'creator'
            ],
            condition: (current)=>!!current.id && (current.status || '').toLowerCase() !== __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$video$2d$submission$2d$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UtilsVideoSubmissionStatus"].VideoSubmissionStatusApproved,
            action: ()=>{
                syncSubmissionFormState();
                setIsUpdateSubmissionOpen(true);
            }
        },
        {
            label: campaignActionsT('approve'),
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"],
            allowedRoles: [
                'admin'
            ],
            condition: (current)=>!!current.id && current.status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$video$2d$submission$2d$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UtilsVideoSubmissionStatus"].VideoStatusPendingApproval,
            action: ()=>setIsAdminApproveOpen(true)
        },
        // {
        //   label: campaignActionsT( 'reject' ),
        //   icon: X,
        //   allowedRoles: [ 'admin' ],
        //   condition: ( current ) => !!current.id && current.status !== UtilsVideoSubmissionStatus.VideoSubmissionStatusApproved && current.status !== UtilsVideoSubmissionStatus.VideoSubmissionStatusCreated,
        //   action: () => setIsAdminRejectOpen( true ),
        // },
        {
            label: t('return'),
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__["Undo2"],
            allowedRoles: [
                'admin'
            ],
            condition: (current)=>!!current.id && current.status == __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$video$2d$submission$2d$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UtilsVideoSubmissionStatus"].VideoStatusPendingApproval,
            action: ()=>setIsAdminReturnOpen(true)
        },
        {
            label: t('confirmSubmission'),
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"],
            allowedRoles: [
                'creator'
            ],
            condition: (current)=>!!current.id && current.status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$video$2d$submission$2d$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UtilsVideoSubmissionStatus"].VideoStatusCreated,
            action: ()=>handleConfirmSubmission()
        },
        {
            label: t('copySubmissionId'),
            separator: true,
            condition: (current)=>!!current.id,
            action: async (current)=>{
                if (current.id) {
                    await navigator.clipboard.writeText(current.id);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(t('submissionIdCopied'));
                }
            }
        },
        {
            label: t('copyCreatorId'),
            condition: (current)=>!!current.creator_id,
            action: async (current)=>{
                if (current.creator_id) {
                    await navigator.clipboard.writeText(current.creator_id);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(t('creatorIdCopied'));
                }
            }
        },
        {
            label: t('deleteSubmission'),
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"],
            separator: true,
            variant: 'destructive',
            allowedRoles: [
                'admin',
                'creator'
            ],
            condition: (current)=>!!current.id,
            action: ()=>setIsDeleteOpen(true)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$action$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionMenu"], {
                actions: actions,
                data: submission,
                label: "",
                trigger: trigger || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "ghost",
                    size: "icon-sm",
                    className: "shrink-0 -mb-1 hover:bg-background/70",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__["MoreVertical"], {
                            className: "size-4"
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission-action-menu.tsx",
                            lineNumber: 263,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "sr-only",
                            children: t('openMenu')
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission-action-menu.tsx",
                            lineNumber: 264,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/campaigns/submission-action-menu.tsx",
                    lineNumber: 262,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/campaigns/submission-action-menu.tsx",
                lineNumber: 256,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2d$decision$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubmissionDecisionDialog"], {
                open: isAcceptOpen,
                onOpenChange: setIsAcceptOpen,
                title: t('acceptSubmissionTitle'),
                description: t('acceptSubmissionDescription'),
                confirmLabel: campaignActionsT('accept'),
                comment: acceptComment,
                onCommentChange: setAcceptComment,
                onConfirm: async ()=>{
                    await handleDecision(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$models$2d$brand$2d$video$2d$decision$2d$request$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModelsBrandVideoDecisionRequestStatusEnum"].Accepted, acceptComment);
                    setIsAcceptOpen(false);
                    setAcceptComment('');
                },
                isLoading: submissionDecision.isPending,
                loadingText: campaignActionsT('accepting'),
                fieldId: "submission-accept-comment",
                fieldLabel: t('commentOptional'),
                fieldPlaceholder: t('addNoteForDecision')
            }, void 0, false, {
                fileName: "[project]/components/campaigns/submission-action-menu.tsx",
                lineNumber: 270,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2d$decision$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubmissionDecisionDialog"], {
                open: isRejectOpen,
                onOpenChange: setIsRejectOpen,
                title: t('rejectSubmissionTitle'),
                description: t('rejectSubmissionDescription'),
                confirmLabel: campaignActionsT('reject'),
                variant: "destructive",
                comment: rejectComment,
                onCommentChange: setRejectComment,
                onConfirm: async ()=>{
                    await handleDecision(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$models$2d$brand$2d$video$2d$decision$2d$request$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModelsBrandVideoDecisionRequestStatusEnum"].Rejected, rejectComment);
                    setIsRejectOpen(false);
                    setRejectComment('');
                },
                isLoading: submissionDecision.isPending,
                loadingText: campaignActionsT('rejecting'),
                fieldId: "submission-reject-comment",
                fieldLabel: t('reasonOptional'),
                fieldPlaceholder: t('addRejectionReason')
            }, void 0, false, {
                fileName: "[project]/components/campaigns/submission-action-menu.tsx",
                lineNumber: 290,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2d$view$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubmissionViewDialog"], {
                open: isViewOpen,
                onOpenChange: setIsViewOpen,
                submission: submission
            }, void 0, false, {
                fileName: "[project]/components/campaigns/submission-action-menu.tsx",
                lineNumber: 311,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2d$update$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubmissionUpdateDialog"], {
                open: isUpdateSubmissionOpen,
                onOpenChange: setIsUpdateSubmissionOpen,
                title: title,
                description: description,
                videoFile: videoFile,
                updateSubmissionError: updateSubmissionError,
                onTitleChange: setTitle,
                onDescriptionChange: setDescription,
                onVideoChange: (file)=>{
                    setVideoFile(file);
                    setUpdateSubmissionError(null);
                    if (!file) {
                        setUploadedVideoData(null);
                    }
                },
                onUploadSuccess: (data)=>{
                    setUploadedVideoData({
                        url: data.video_url,
                        filename: data.filename,
                        thumbnail: data.thumbnail_url
                    });
                    setUpdateSubmissionError(null);
                },
                onConfirm: async ()=>{
                    const updated = await handleUpdateSubmission();
                    if (updated) {
                        setIsUpdateSubmissionOpen(false);
                        setIsConfirmOpen(true);
                    }
                },
                isLoading: updateSubmission.isPending
            }, void 0, false, {
                fileName: "[project]/components/campaigns/submission-action-menu.tsx",
                lineNumber: 317,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2d$decision$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubmissionDecisionDialog"], {
                open: isAdminApproveOpen,
                onOpenChange: setIsAdminApproveOpen,
                title: t('approveSubmissionTitle'),
                description: t('approveSubmissionDescription'),
                confirmLabel: campaignActionsT('approve'),
                comment: adminApproveComment,
                onCommentChange: setAdminApproveComment,
                onConfirm: async ()=>{
                    await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].promise(updateSubmissionStatus.mutateAsync({
                        id: submission.id,
                        request: {
                            status: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$video$2d$submission$2d$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UtilsVideoSubmissionStatus"].VideoSubmissionStatusApproved,
                            comments: adminApproveComment.trim() || undefined
                        }
                    }), {
                        loading: t('approvingSubmission'),
                        success: t('submissionApproved'),
                        error: t('approveSubmissionFailed')
                    });
                    setIsAdminApproveOpen(false);
                    setAdminApproveComment('');
                },
                isLoading: updateSubmissionStatus.isPending,
                loadingText: campaignActionsT('approving'),
                fieldId: "admin-approve-comment",
                fieldLabel: t('commentOptional'),
                fieldPlaceholder: t('addNote')
            }, void 0, false, {
                fileName: "[project]/components/campaigns/submission-action-menu.tsx",
                lineNumber: 347,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2d$decision$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubmissionDecisionDialog"], {
                open: isAdminRejectOpen,
                onOpenChange: setIsAdminRejectOpen,
                title: t('rejectSubmissionTitle'),
                description: t('rejectSubmissionShort'),
                confirmLabel: campaignActionsT('reject'),
                variant: "destructive",
                comment: adminRejectComment,
                onCommentChange: setAdminRejectComment,
                onConfirm: async ()=>{
                    await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].promise(updateSubmissionStatus.mutateAsync({
                        id: submission.id,
                        request: {
                            status: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$video$2d$submission$2d$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UtilsVideoSubmissionStatus"].VideoSubmissionStatusRejected,
                            comments: adminRejectComment.trim() || undefined
                        }
                    }), {
                        loading: t('rejectingSubmission'),
                        success: t('submissionRejected'),
                        error: t('rejectSubmissionFailed')
                    });
                    setIsAdminRejectOpen(false);
                    setAdminRejectComment('');
                },
                isLoading: updateSubmissionStatus.isPending,
                loadingText: campaignActionsT('rejecting'),
                fieldId: "admin-reject-comment",
                fieldLabel: t('reasonOptional'),
                fieldPlaceholder: t('addRejectionReason')
            }, void 0, false, {
                fileName: "[project]/components/campaigns/submission-action-menu.tsx",
                lineNumber: 380,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2d$decision$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubmissionDecisionDialog"], {
                open: isAdminReturnOpen,
                onOpenChange: setIsAdminReturnOpen,
                title: t('returnSubmissionTitle'),
                description: t('returnSubmissionDescription'),
                confirmLabel: t('return'),
                comment: adminReturnComment,
                onCommentChange: setAdminReturnComment,
                onConfirm: async ()=>{
                    await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].promise(updateSubmissionStatus.mutateAsync({
                        id: submission.id,
                        request: {
                            status: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$video$2d$submission$2d$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UtilsVideoSubmissionStatus"].VideoSubmissionStatusReturned,
                            comments: adminReturnComment.trim() || undefined
                        }
                    }), {
                        loading: t('returningSubmission'),
                        success: t('submissionReturned'),
                        error: t('returnSubmissionFailed')
                    });
                    setIsAdminReturnOpen(false);
                    setAdminReturnComment('');
                },
                isLoading: updateSubmissionStatus.isPending,
                loadingText: t('returning'),
                fieldId: "admin-return-comment",
                fieldLabel: t('commentOptional'),
                fieldPlaceholder: t('addNoteForCreator')
            }, void 0, false, {
                fileName: "[project]/components/campaigns/submission-action-menu.tsx",
                lineNumber: 414,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$confirm$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfirmDialog"], {
                open: isConfirmOpen,
                onOpenChange: setIsConfirmOpen,
                title: t('confirmSubmissionTitle'),
                description: t('confirmSubmissionDescription'),
                confirmLabel: t('submitForApproval'),
                onConfirm: handleConfirmSubmissionSubmit,
                isLoading: submitVideoSubmission.isPending,
                loadingText: t('submitting')
            }, void 0, false, {
                fileName: "[project]/components/campaigns/submission-action-menu.tsx",
                lineNumber: 448,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$confirm$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfirmDialog"], {
                open: isDeleteOpen,
                onOpenChange: setIsDeleteOpen,
                title: t('deleteSubmissionTitle'),
                description: t('deleteSubmissionDescription'),
                confirmLabel: t('delete'),
                variant: "destructive",
                onConfirm: async ()=>{
                    if (!submission.id) return;
                    await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].promise(deleteSubmission.mutateAsync({
                        id: submission.id
                    }), {
                        loading: t('deletingSubmission'),
                        success: t('submissionDeleted'),
                        error: t('deleteSubmissionFailed')
                    });
                    setIsDeleteOpen(false);
                },
                isLoading: deleteSubmission.isPending,
                loadingText: t('deleting')
            }, void 0, false, {
                fileName: "[project]/components/campaigns/submission-action-menu.tsx",
                lineNumber: 459,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(SubmissionActionMenu, "ykNShrpo942J8U4KvcAjpNK4Y0o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$video$2d$submissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateVideoSubmission"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$video$2d$submissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateVideoSubmissionStatus"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$video$2d$submissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVideoSubmissionDecision"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$video$2d$submissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubmitVideoSubmission"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$video$2d$submissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeleteVideoSubmission"]
    ];
});
_c = SubmissionActionMenu;
var _c;
__turbopack_context__.k.register(_c, "SubmissionActionMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/campaigns/submission/overlay-video-player.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OverlayVideoPlayer",
    ()=>OverlayVideoPlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dashboard-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$PauseCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseCircleFreeIcons$3e$__ = __turbopack_context__.i("[project]/node_modules/@hugeicons/core-free-icons/dist/esm/PauseCircleIcon.js [app-client] (ecmascript) <export default as PauseCircleFreeIcons>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$PlayCircle02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle02FreeIcons$3e$__ = __turbopack_context__.i("[project]/node_modules/@hugeicons/core-free-icons/dist/esm/PlayCircle02Icon.js [app-client] (ecmascript) <export default as PlayCircle02FreeIcons>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$SquareArrowExpand01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareArrowExpandIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@hugeicons/core-free-icons/dist/esm/SquareArrowExpand01Icon.js [app-client] (ecmascript) <export default as SquareArrowExpandIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@hugeicons/react/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@hugeicons/react/dist/esm/HugeiconsIcon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function OverlayVideoPlayer({ videoUrl, showControl, compact = false, onExpand, commentCount, onCommentClick, poster }) {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.brand.submissionsPage.actions');
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const togglePlayback = ()=>{
        const node = videoRef.current;
        if (!node) return;
        if (node.paused) {
            void node.play();
            return;
        }
        node.pause();
    };
    if (!videoUrl) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "submission-video-player__fallback",
            children: t('noVideoAvailable')
        }, void 0, false, {
            fileName: "[project]/components/campaigns/submission/overlay-video-player.tsx",
            lineNumber: 47,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "submission-video-player",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                ref: videoRef,
                src: videoUrl,
                preload: "metadata",
                playsInline: true,
                className: "submission-video-player__media",
                onPlay: ()=>setIsPlaying(true),
                onPause: ()=>setIsPlaying(false),
                onClick: togglePlayback,
                poster: poster
            }, void 0, false, {
                fileName: "[project]/components/campaigns/submission/overlay-video-player.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        type: "button",
                        onClick: togglePlayback,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("submission-video-player__control", compact ? "submission-video-player__control--compact" : "submission-video-player__control--standard", showControl ? 'pointer-events-auto' : 'pointer-events-none'),
                        "aria-label": isPlaying ? t('pauseVideo') : t('playVideo'),
                        initial: {
                            opacity: 0,
                            scale: 0.9
                        },
                        whileHover: {
                            scale: 1.1
                        },
                        whileFocus: {
                            scale: 1.1
                        },
                        animate: showControl ? {
                            opacity: 1,
                            scale: 1
                        } : {
                            opacity: 0,
                            scale: 0.9
                        },
                        transition: {
                            duration: 0.6,
                            ease: 'easeOut',
                            delay: 0.1
                        },
                        children: isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HugeiconsIcon"], {
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$PauseCircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseCircleFreeIcons$3e$__["PauseCircleFreeIcons"],
                            className: compact ? "size-6" : "size-8"
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission/overlay-video-player.tsx",
                            lineNumber: 84,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HugeiconsIcon"], {
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$PlayCircle02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle02FreeIcons$3e$__["PlayCircle02FreeIcons"],
                            className: compact ? "size-6" : "size-8"
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission/overlay-video-player.tsx",
                            lineNumber: 85,
                            columnNumber: 15
                        }, this)
                    }, "playback", false, {
                        fileName: "[project]/components/campaigns/submission/overlay-video-player.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    onExpand && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        type: "button",
                        onClick: onExpand,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("submission-video-player__expand", compact ? "submission-video-player__expand--compact" : "submission-video-player__expand--standard", showControl ? 'pointer-events-auto' : 'pointer-events-none'),
                        "aria-label": t('expandVideo'),
                        initial: {
                            opacity: 0,
                            scale: 0.9
                        },
                        whileHover: {
                            scale: 1.1
                        },
                        whileFocus: {
                            scale: 1.1
                        },
                        animate: showControl ? {
                            opacity: 1,
                            scale: 1
                        } : {
                            opacity: 0,
                            scale: 0.9
                        },
                        transition: {
                            duration: 0.6,
                            ease: 'easeOut',
                            delay: 0.15
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HugeiconsIcon"], {
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$SquareArrowExpand01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareArrowExpandIcon$3e$__["SquareArrowExpandIcon"],
                            className: compact ? "size-5" : "size-7",
                            strokeWidth: 1
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission/overlay-video-player.tsx",
                            lineNumber: 104,
                            columnNumber: 13
                        }, this)
                    }, "expand", false, {
                        fileName: "[project]/components/campaigns/submission/overlay-video-player.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, this),
                    !!commentCount && commentCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        onClick: (e)=>{
                            e.stopPropagation();
                            onCommentClick?.();
                        },
                        role: "button",
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("submission-video-player__comments", compact ? "submission-video-player__comments--compact" : "submission-video-player__comments--standard", showControl ? 'pointer-events-auto' : 'pointer-events-none'),
                        initial: {
                            opacity: 0,
                            scale: 0.9
                        },
                        whileHover: {
                            scale: 1.05
                        },
                        animate: showControl ? {
                            opacity: 1,
                            scale: 1
                        } : {
                            opacity: 0,
                            scale: 0.9
                        },
                        transition: {
                            duration: 0.6,
                            ease: 'easeOut',
                            delay: 0.2
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                className: compact ? "size-3" : "size-3.5"
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/submission/overlay-video-player.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-medium mt-0.5 leading-none", compact ? "text-[8px]" : "text-[10px]"),
                                children: commentCount
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/submission/overlay-video-player.tsx",
                                lineNumber: 126,
                                columnNumber: 13
                            }, this)
                        ]
                    }, "comments", true, {
                        fileName: "[project]/components/campaigns/submission/overlay-video-player.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/campaigns/submission/overlay-video-player.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/campaigns/submission/overlay-video-player.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_s(OverlayVideoPlayer, "CKDq7MeRdn29X+iOznFGvYXzPnw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"]
    ];
});
_c = OverlayVideoPlayer;
var _c;
__turbopack_context__.k.register(_c, "OverlayVideoPlayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/campaigns/submission/submission-status-badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SubmissionStatusBadge",
    ()=>SubmissionStatusBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$text$2d$case$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/text-case.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dashboard-utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function SubmissionStatusBadge({ status, compact = false }) {
    const normalizedStatus = status.toLowerCase().replace(/_/g, '-');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("submission-status-badge", compact ? "submission-status-badge--compact" : "submission-status-badge--standard", `submission-status-badge--${normalizedStatus}`),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$text$2d$case$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextCapitalize"], {
            children: status.replace(/_/g, ' ')
        }, void 0, false, {
            fileName: "[project]/components/campaigns/submission/submission-status-badge.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/campaigns/submission/submission-status-badge.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = SubmissionStatusBadge;
var _c;
__turbopack_context__.k.register(_c, "SubmissionStatusBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/campaigns/submission/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCreatorLocationOrEmail",
    ()=>getCreatorLocationOrEmail,
    "getCreatorName",
    ()=>getCreatorName
]);
function getCreatorName(creator) {
    return `${creator?.first_name || ''} ${creator?.last_name || ''}`.trim() || creator?.email || 'Unknown Creator';
}
function getCreatorLocationOrEmail(creator) {
    const location = [
        creator?.city,
        creator?.country
    ].filter(Boolean).join(', ');
    return location || creator?.email || 'Unknown location';
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/campaigns/submission-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SubmissionCard",
    ()=>SubmissionCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$comments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/hooks/comments.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dashboard-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/imgproxy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$text$2d$case$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/text-case.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2d$action$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/submission-action-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2d$view$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/submission-view-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2f$overlay$2d$video$2d$player$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/submission/overlay-video-player.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2f$submission$2d$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/submission/submission-status-badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/submission/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
;
;
function SubmissionCard({ submission, showActions = true, layout = 'media-overlay', overlayDetailsMode = 'hover', onExpand }) {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.common');
    const status = submission.status?.toLowerCase() || 'unknown';
    const creatorName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCreatorName"])(submission.creator);
    const creatorLocationOrEmail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCreatorLocationOrEmail"])(submission.creator);
    const submittedDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(submission.created_at);
    const [isHovering, setIsHovering] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [expandOpen, setExpandOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [expandCommentsOpen, setExpandCommentsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const showControl = overlayDetailsMode === 'always' || isHovering;
    const isMiniLayout = layout === 'mini';
    const handleExpand = onExpand ?? (()=>setExpandOpen(true));
    const handleCommentClick = ()=>{
        if (onExpand) {
            // If controlled externally, we fall back to just expand
            onExpand();
        } else {
            setExpandCommentsOpen(true);
            setExpandOpen(true);
        }
    };
    const handleOpenChange = (open)=>{
        setExpandOpen(open);
        if (!open) {
            // reset comments open state when closing
            setTimeout(()=>setExpandCommentsOpen(false), 300);
        }
    };
    const commentsResults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$comments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubmissionComments"])(submission.id);
    const commentCount = commentsResults.reduce((sum, r)=>sum + (r.data?.data?.length ?? 0), 0);
    const videoPoster = submission.video?.thumbnail ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imgpresets"].banner(submission.video.thumbnail) : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("submission-card", isMiniLayout && 'submission-card--mini'),
                onMouseEnter: ()=>setIsHovering(true),
                onMouseLeave: ()=>setIsHovering(false),
                onFocusCapture: ()=>setIsHovering(true),
                onBlurCapture: ()=>setIsHovering(false),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2f$overlay$2d$video$2d$player$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OverlayVideoPlayer"], {
                        videoUrl: submission.video?.asset,
                        showControl: showControl,
                        compact: isMiniLayout,
                        onExpand: handleExpand,
                        commentCount: commentCount,
                        onCommentClick: handleCommentClick,
                        poster: videoPoster
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/submission-card.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "submission-card__overlay"
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/submission-card.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    isMiniLayout && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "submission-card__status-overlay",
                        initial: false,
                        animate: showControl ? {
                            opacity: 1,
                            y: 0
                        } : {
                            opacity: 0,
                            y: -4
                        },
                        transition: {
                            duration: 0.2,
                            ease: 'easeOut'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2f$submission$2d$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubmissionStatusBadge"], {
                            status: status,
                            compact: true
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/submission-card.tsx",
                            lineNumber: 100,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/submission-card.tsx",
                        lineNumber: 94,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("submission-card__content", isMiniLayout ? 'submission-card__content--mini' : 'submission-card__content--standard'),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("submission-card__footer", isMiniLayout ? 'gap-2' : 'gap-3', showControl ? 'items-start' : 'items-end'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    layout: true,
                                    initial: false,
                                    transition: {
                                        duration: 0.22,
                                        ease: 'easeOut'
                                    },
                                    className: "shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                        className: isMiniLayout ? "size-6" : "size-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                src: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imgpresets"].avatar(submission.creator?.profile_image?.asset || ''),
                                                alt: submission.creator?.first_name || ''
                                            }, void 0, false, {
                                                fileName: "[project]/components/campaigns/submission-card.tsx",
                                                lineNumber: 113,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                children: submission.creator?.first_name?.slice(0, 2).toUpperCase()
                                            }, void 0, false, {
                                                fileName: "[project]/components/campaigns/submission-card.tsx",
                                                lineNumber: 114,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/campaigns/submission-card.tsx",
                                        lineNumber: 112,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/submission-card.tsx",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "submission-card__creator-info",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("submission-card__creator-header", isMiniLayout ? "mb-1" : "mb-2"),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("min-w-0", showControl || !isMiniLayout ? 'pointer-events-auto' : 'pointer-events-none'),
                                                initial: false,
                                                animate: showControl || !isMiniLayout ? {
                                                    opacity: 1,
                                                    y: 0
                                                } : {
                                                    opacity: 0,
                                                    y: 8
                                                },
                                                transition: {
                                                    duration: 0.2,
                                                    ease: 'easeOut',
                                                    delay: showControl ? 0.14 : 0.04
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dashboard$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("submission-card__creator-name", isMiniLayout ? "text-[10px]" : "text-xs"),
                                                        children: creatorName
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/campaigns/submission-card.tsx",
                                                        lineNumber: 129,
                                                        columnNumber: 19
                                                    }, this),
                                                    isMiniLayout ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "submission-card__creator-meta",
                                                        children: [
                                                            creatorLocationOrEmail,
                                                            " • ",
                                                            submittedDate
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/campaigns/submission-card.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 21
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "submission-card__creator-meta--standard",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "truncate",
                                                                children: creatorLocationOrEmail
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/campaigns/submission-card.tsx",
                                                                lineNumber: 138,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "shrink-0",
                                                                children: "•"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/campaigns/submission-card.tsx",
                                                                lineNumber: 139,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "shrink-0 whitespace-nowrap",
                                                                children: submittedDate
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/campaigns/submission-card.tsx",
                                                                lineNumber: 140,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/campaigns/submission-card.tsx",
                                                        lineNumber: 137,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/campaigns/submission-card.tsx",
                                                lineNumber: 120,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/campaigns/submission-card.tsx",
                                            lineNumber: 119,
                                            columnNumber: 15
                                        }, this),
                                        !isMiniLayout && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "submission-card__details",
                                            initial: false,
                                            animate: showControl ? {
                                                opacity: 1,
                                                y: 0,
                                                height: 'auto'
                                            } : {
                                                opacity: 0,
                                                y: 8,
                                                height: 0
                                            },
                                            transition: {
                                                duration: 0.2,
                                                ease: 'easeOut',
                                                delay: showControl ? 0.22 : 0.02
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "submission-card__details-footer",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                                className: "submission-card__title",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$text$2d$case$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextCapitalize"], {
                                                                    children: submission.title || submission.video_filename || t('cards.untitledSubmission')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/campaigns/submission-card.tsx",
                                                                    lineNumber: 158,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/campaigns/submission-card.tsx",
                                                                lineNumber: 157,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                                className: "submission-card__description",
                                                                children: submission.description || t('cards.noDescription')
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/campaigns/submission-card.tsx",
                                                                lineNumber: 160,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/campaigns/submission-card.tsx",
                                                        lineNumber: 156,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "submission-card__actions",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2f$submission$2d$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubmissionStatusBadge"], {
                                                                status: status
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/campaigns/submission-card.tsx",
                                                                lineNumber: 178,
                                                                columnNumber: 23
                                                            }, this),
                                                            showActions ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2d$action$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubmissionActionMenu"], {
                                                                submission: submission
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/campaigns/submission-card.tsx",
                                                                lineNumber: 179,
                                                                columnNumber: 39
                                                            }, this) : null
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/campaigns/submission-card.tsx",
                                                        lineNumber: 164,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/campaigns/submission-card.tsx",
                                                lineNumber: 155,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/campaigns/submission-card.tsx",
                                            lineNumber: 147,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/campaigns/submission-card.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/campaigns/submission-card.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/submission-card.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/campaigns/submission-card.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2d$view$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubmissionViewDialog"], {
                open: expandOpen,
                onOpenChange: handleOpenChange,
                submission: submission,
                initialCommentsOpen: expandCommentsOpen
            }, void 0, false, {
                fileName: "[project]/components/campaigns/submission-card.tsx",
                lineNumber: 189,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(SubmissionCard, "9Q6Jsxs+ZuuJ5AmVDnambushmOU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$comments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubmissionComments"]
    ];
});
_c = SubmissionCard;
var _c;
__turbopack_context__.k.register(_c, "SubmissionCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/campaigns/brand-avatar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BrandAvatar",
    ()=>BrandAvatar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/imgproxy.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function BrandAvatarSkeleton({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
        className: `rounded-full ${className}`
    }, void 0, false, {
        fileName: "[project]/components/campaigns/brand-avatar.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = BrandAvatarSkeleton;
function BrandAvatar({ brand, className }) {
    if (!brand) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BrandAvatarSkeleton, {
        className: className
    }, void 0, false, {
        fileName: "[project]/components/campaigns/brand-avatar.tsx",
        lineNumber: 20,
        columnNumber: 24
    }, this);
    const brandLogo = brand.profile_photo?.asset;
    const brandName = brand.company_name || 'Brand';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
        className: className,
        children: [
            brandLogo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                src: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imgpresets"].avatar(brandLogo),
                alt: brandName,
                className: "object-cover"
            }, void 0, false, {
                fileName: "[project]/components/campaigns/brand-avatar.tsx",
                lineNumber: 28,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                className: "rounded-full",
                children: brandName.substring(0, 2).toUpperCase()
            }, void 0, false, {
                fileName: "[project]/components/campaigns/brand-avatar.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/campaigns/brand-avatar.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c1 = BrandAvatar;
var _c, _c1;
__turbopack_context__.k.register(_c, "BrandAvatarSkeleton");
__turbopack_context__.k.register(_c1, "BrandAvatar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/campaigns/gig-status-badge.tsx [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/status-badge.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/campaigns/sections/documents/pdf-file-icon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PdfFileIcon",
    ()=>PdfFileIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const PdfFileIcon = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        id: "Layer_1",
        viewBox: "0 0 45.4 59.9",
        className: className,
        fill: "currentColor",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M29.6,3.4c-1-1-2.4-1.5-3.8-1.5h-15C5.6,1.9,1.3,6.2,1.3,11.4v37c0,5.2,4.3,9.5,9.5,9.5h24c5.2,0,9.5-4.3,9.5-9.5v-28.8c0-1.5-.6-3-1.7-4L29.6,3.4ZM41.9,53s0,0,0,.1c-1.8,2.4-3.9,3.6-7.6,3.6H9.5c-1,0-2.1-.4-3.1-1.1-2.6-1.7-4.1-4.7-4.1-7.8V10c.4-3.4,3.6-6.6,7.2-7h16.8v9.7c0,3.2,2.8,5.9,6.1,5.9h11v30c0,1.6-.5,3.2-1.4,4.5Z"
            }, void 0, false, {
                fileName: "[project]/components/campaigns/sections/documents/pdf-file-icon.tsx",
                lineNumber: 12,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M36.1,36.1c-.4-.8-1.4-1.2-3.1-1.2s-2.2,0-3.6.4c-2-2.1-4-5.2-5.5-8.2,1.4-6.1.5-7.3.2-7.7s-.8-.7-1.4-.7-.5,0-.7,0c-.6.2-1.1.7-1.4,1.3-.8,1.7.2,4.8,1.3,7.1-.9,3.7-2.5,8.1-4.1,11.7-4.1,1.9-6.3,3.7-6.5,5.5,0,.6,0,1.6,1.2,2.4.3.2.7.4,1,.4.9,0,1.9-.7,3-2.3.8-1.1,1.7-2.7,2.6-4.6,2.9-1.3,6.5-2.4,9.6-3.1,1.7,1.6,3.2,2.5,4.6,2.5s1.8-.4,2.4-1.3c.6-.9.8-1.7.4-2.3ZM13.6,45.3c-.5-.4-.5-.7-.5-.7,0-.6,1-1.7,3.3-3-1.7,3.2-2.6,3.7-2.8,3.7ZM22.2,20.8c0-.2.2-.2.3-.3h0c.2.2.4,1.2,0,3.5-.4-1.3-.7-2.6-.4-3.2ZM20.2,37.9c1.1-2.6,2.1-5.5,2.9-8.2,1.2,2.2,2.7,4.3,4.1,6-2.2.5-4.7,1.3-7,2.2ZM34.2,37.3c-.3.5-.7.5-.9.5-.6,0-1.4-.4-2.2-1,.7,0,1.4,0,1.9,0,1,0,1.4,0,1.5.2-.1,0-.1.2-.3.4Z"
            }, void 0, false, {
                fileName: "[project]/components/campaigns/sections/documents/pdf-file-icon.tsx",
                lineNumber: 15,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/campaigns/sections/documents/pdf-file-icon.tsx",
        lineNumber: 4,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = PdfFileIcon;
var _c;
__turbopack_context__.k.register(_c, "PdfFileIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/campaigns/sections/documents/file-cards/use-file-upload.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFileUpload",
    ()=>useFileUpload
]);
/* eslint-disable @typescript-eslint/no-explicit-any */ var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$api$2f$upload$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/generated/api/upload-api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
function useFileUpload(item, isOverlay, onUploadSuccess, onUploadError, uploadFn) {
    _s();
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useFileUpload.useEffect": ()=>{
            if (isOverlay || item.status !== 'uploading' || !item.file || item.url) return;
            const controller = new AbortController();
            queueMicrotask({
                "useFileUpload.useEffect": ()=>setProgress(0)
            }["useFileUpload.useEffect"]);
            ({
                "useFileUpload.useEffect": async ()=>{
                    try {
                        const api = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$api$2f$upload$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UploadApiFactory"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiConfiguration"], undefined, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"]);
                        let localMaxProgress = 0;
                        const onProgress = {
                            "useFileUpload.useEffect.onProgress": (e)=>{
                                localMaxProgress = Math.max(localMaxProgress, Math.round(e.loaded * 100 / (e.total || 100)));
                                setProgress(localMaxProgress);
                            }
                        }["useFileUpload.useEffect.onProgress"];
                        const response = await uploadFn(api, item.file, onProgress, controller.signal);
                        const uploaded = response.data.data[0];
                        if (uploaded?.url) {
                            const fullUrl = uploaded.url.startsWith('http') ? uploaded.url : `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE_URL"].replace('/api/v1', '')}${uploaded.url}`;
                            onUploadSuccess(item.id, fullUrl);
                        } else {
                            onUploadError(item.id, new Error('No file url returned'), item.name);
                        }
                    } catch (e) {
                        if (e?.code !== 'ERR_CANCELED') onUploadError(item.id, e, item.name);
                    }
                }
            })["useFileUpload.useEffect"]();
            return ({
                "useFileUpload.useEffect": ()=>controller.abort()
            })["useFileUpload.useEffect"];
        }
    }["useFileUpload.useEffect"], [
        item.status,
        item.file,
        item.url,
        item.id,
        isOverlay,
        onUploadSuccess,
        onUploadError,
        uploadFn
    ]);
    return progress;
}
_s(useFileUpload, "T5Z1wCsl7uIuPm5Brr5OD1/EgQU=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/campaigns/sections/documents/file-cards/file-card-document.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_context__.s([
    "FileCardDocument",
    ()=>FileCardDocument,
    "pdfCoverCache",
    ()=>pdfCoverCache
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$File01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File01Icon$3e$__ = __turbopack_context__.i("[project]/node_modules/@hugeicons/core-free-icons/dist/esm/File01Icon.js [app-client] (ecmascript) <export default as File01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@hugeicons/react/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@hugeicons/react/dist/esm/HugeiconsIcon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Document$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Document$3e$__ = __turbopack_context__.i("[project]/node_modules/react-pdf/dist/Document.js [app-client] (ecmascript) <export default as Document>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Page$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Page$3e$__ = __turbopack_context__.i("[project]/node_modules/react-pdf/dist/Page.js [app-client] (ecmascript) <export default as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__ = __turbopack_context__.i("[project]/node_modules/pdfjs-dist/build/pdf.mjs [app-client] (ecmascript) <export * as pdfjs>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$pdf$2d$file$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/sections/documents/pdf-file-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$base$2d$file$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/sections/documents/file-cards/base-file-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$use$2d$file$2d$upload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/sections/documents/file-cards/use-file-upload.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$animate$2d$activity$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/animate-activity.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__["pdfjs"].GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__["pdfjs"].version}/build/pdf.worker.min.mjs`;
const pdfCoverCache = new Map();
const FileCardDocument = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c = _s((props)=>{
    _s();
    const { item, onUploadSuccess, onUploadError, isOverlay, showTitle } = props;
    const uploadFn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FileCardDocument.useCallback[uploadFn]": (api, file, onProgress, signal)=>api.uploadsDocumentsPost({
                documents: file
            }, {
                headers: {
                    'Content-Type': undefined
                },
                onUploadProgress: onProgress,
                signal
            })
    }["FileCardDocument.useCallback[uploadFn]"], []);
    const progress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$use$2d$file$2d$upload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileUpload"])(item, isOverlay, onUploadSuccess, onUploadError, uploadFn);
    const { phase } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$animate$2d$activity$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimateActivity"])();
    const isPdf = item.type.includes('pdf') || item.name.toLowerCase().endsWith('.pdf');
    const cacheKey = item.url || item.id;
    const [cachedCover, setCachedCover] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(pdfCoverCache.get(cacheKey) || item.preview || item.thumbnail || null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pdfFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FileCardDocument.useMemo[pdfFile]": ()=>{
            if (item.url) return {
                url: item.url,
                withCredentials: true
            };
            if (item.file) return item.file;
            return null;
        }
    }["FileCardDocument.useMemo[pdfFile]"], [
        item.url,
        item.file
    ]);
    const onRenderSuccess = ()=>{
        if (canvasRef.current && !pdfCoverCache.has(cacheKey)) {
            try {
                const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.7);
                pdfCoverCache.set(cacheKey, dataUrl);
                setCachedCover(dataUrl);
            } catch (e) {
                console.warn('Failed to cache PDF cover', e);
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$base$2d$file$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseFileCard"], {
        ...props,
        progress: progress,
        showTitle: showTitle,
        onSelect: props.onSelect,
        children: isPdf && pdfFile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 flex items-center justify-center overflow-hidden w-full h-full p-2 pointer-events-none",
            children: [
                cachedCover ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: cachedCover,
                    alt: item.name,
                    className: "w-full h-full object-contain opacity-95 group-hover:opacity-100 transition-opacity drop-shadow-sm"
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/sections/documents/file-cards/file-card-document.tsx",
                    lineNumber: 57,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)) : phase !== 'hidden' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Document$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Document$3e$__["Document"], {
                    file: pdfFile,
                    loading: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "size-8 animate-spin text-muted-foreground"
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/sections/documents/file-cards/file-card-document.tsx",
                        lineNumber: 65,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)),
                    error: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$pdf$2d$file$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PdfFileIcon"], {
                        className: "text-muted-foreground w-10! h-10!"
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/sections/documents/file-cards/file-card-document.tsx",
                        lineNumber: 66,
                        columnNumber: 23
                    }, ("TURBOPACK compile-time value", void 0)),
                    className: "flex items-center justify-center w-full h-full",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Page$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Page$3e$__["Page"], {
                        pageNumber: 1,
                        width: 140,
                        renderTextLayer: false,
                        renderAnnotationLayer: false,
                        className: "opacity-95 group-hover:opacity-100 transition-opacity",
                        canvasRef: canvasRef,
                        onRenderSuccess: onRenderSuccess,
                        onRenderError: ()=>{},
                        loading: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "size-8 animate-spin text-muted-foreground"
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/sections/documents/file-cards/file-card-document.tsx",
                            lineNumber: 78,
                            columnNumber: 27
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/sections/documents/file-cards/file-card-document.tsx",
                        lineNumber: 69,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/sections/documents/file-cards/file-card-document.tsx",
                    lineNumber: 63,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)) : null,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute bottom-1 right-2 bg-background/80 backdrop-blur-md rounded-sm p-1 border shadow-xs",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$pdf$2d$file$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PdfFileIcon"], {
                        className: "text-primary size-4"
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/sections/documents/file-cards/file-card-document.tsx",
                        lineNumber: 83,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/sections/documents/file-cards/file-card-document.tsx",
                    lineNumber: 82,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/campaigns/sections/documents/file-cards/file-card-document.tsx",
            lineNumber: 55,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HugeiconsIcon"], {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$File01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File01Icon$3e$__["File01Icon"],
            className: "text-muted-foreground"
        }, void 0, false, {
            fileName: "[project]/components/campaigns/sections/documents/file-cards/file-card-document.tsx",
            lineNumber: 87,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/campaigns/sections/documents/file-cards/file-card-document.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}, "MGnlKEE+KOtPRvcKC9ES9IxoyYQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$use$2d$file$2d$upload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileUpload"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$animate$2d$activity$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimateActivity"]
    ];
})), "MGnlKEE+KOtPRvcKC9ES9IxoyYQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$use$2d$file$2d$upload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileUpload"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$animate$2d$activity$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimateActivity"]
    ];
});
_c1 = FileCardDocument;
FileCardDocument.displayName = 'FileCardDocument';
var _c, _c1;
__turbopack_context__.k.register(_c, "FileCardDocument$memo");
__turbopack_context__.k.register(_c1, "FileCardDocument");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/campaigns/sections/documents/file-cards/file-card-image.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FileCardImage",
    ()=>FileCardImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$base$2d$file$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/sections/documents/file-cards/base-file-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$use$2d$file$2d$upload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/sections/documents/file-cards/use-file-upload.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$media$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/sections/documents/media.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/imgproxy.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const FileCardImage = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c = _s((props)=>{
    _s();
    const { item, onUploadSuccess, onUploadError, isOverlay, showTitle } = props;
    const uploadFn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FileCardImage.useCallback[uploadFn]": (api, file, onProgress, signal)=>// eslint-disable-next-line @typescript-eslint/no-explicit-any
            api.uploadsImagesPost({
                images: file
            }, {
                headers: {
                    'Content-Type': undefined
                },
                onUploadProgress: onProgress,
                signal
            })
    }["FileCardImage.useCallback[uploadFn]"], []);
    const progress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$use$2d$file$2d$upload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileUpload"])(item, isOverlay, onUploadSuccess, onUploadError, uploadFn);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$base$2d$file$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseFileCard"], {
        ...props,
        progress: progress,
        showTitle: showTitle,
        onSelect: props.onSelect,
        children: (item.preview || item.url) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$media$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Media"], {
            url: item.preview || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imgpresets"].card(item.url),
            alt: item.name,
            className: "w-full max-h-60 object-contain object-top",
            type: "image"
        }, void 0, false, {
            fileName: "[project]/components/campaigns/sections/documents/file-cards/file-card-image.tsx",
            lineNumber: 22,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/campaigns/sections/documents/file-cards/file-card-image.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}, "rRTeCV4D1zRVb0ta57PC6n3F0Ig=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$use$2d$file$2d$upload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileUpload"]
    ];
})), "rRTeCV4D1zRVb0ta57PC6n3F0Ig=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$use$2d$file$2d$upload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileUpload"]
    ];
});
_c1 = FileCardImage;
FileCardImage.displayName = 'FileCardImage';
var _c, _c1;
__turbopack_context__.k.register(_c, "FileCardImage$memo");
__turbopack_context__.k.register(_c1, "FileCardImage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/campaigns/sections/documents/file-cards/file-card-video.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_context__.s([
    "FileCardVideo",
    ()=>FileCardVideo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-play.js [app-client] (ecmascript) <export default as PlayCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$base$2d$file$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/sections/documents/file-cards/base-file-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$use$2d$file$2d$upload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/sections/documents/file-cards/use-file-upload.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/imgproxy.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const FileCardVideo = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c = _s((props)=>{
    _s();
    const { item, onUploadSuccess, onUploadError, isOverlay, showTitle } = props;
    const uploadFn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FileCardVideo.useCallback[uploadFn]": (api, file, onProgress, signal)=>api.uploadsVideosPost({
                videos: file
            }, {
                headers: {
                    'Content-Type': undefined
                },
                onUploadProgress: onProgress,
                signal,
                timeout: 3600000
            })
    }["FileCardVideo.useCallback[uploadFn]"], []);
    const progress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$use$2d$file$2d$upload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileUpload"])(item, isOverlay, onUploadSuccess, onUploadError, uploadFn);
    const posterUrl = item.thumbnail ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imgpresets"].card(item.thumbnail) : item.preview ?? undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$base$2d$file$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseFileCard"], {
        ...props,
        progress: progress,
        showTitle: showTitle,
        aspect: "aspect-video",
        onSelect: props.onSelect,
        children: posterUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                    poster: posterUrl,
                    className: "w-full h-full object-contain object-top",
                    preload: "none",
                    muted: true,
                    playsInline: true
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/sections/documents/file-cards/file-card-video.tsx",
                    lineNumber: 24,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors group",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"], {
                        className: "size-10 text-white/90 drop-shadow-md opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-400 ease-out",
                        strokeWidth: 1
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/sections/documents/file-cards/file-card-video.tsx",
                        lineNumber: 32,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/sections/documents/file-cards/file-card-video.tsx",
                    lineNumber: 31,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/components/campaigns/sections/documents/file-cards/file-card-video.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}, "rRTeCV4D1zRVb0ta57PC6n3F0Ig=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$use$2d$file$2d$upload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileUpload"]
    ];
})), "rRTeCV4D1zRVb0ta57PC6n3F0Ig=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$use$2d$file$2d$upload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileUpload"]
    ];
});
_c1 = FileCardVideo;
FileCardVideo.displayName = 'FileCardVideo';
var _c, _c1;
__turbopack_context__.k.register(_c, "FileCardVideo$memo");
__turbopack_context__.k.register(_c1, "FileCardVideo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/campaigns/sections/documents/file-cards/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FileCard",
    ()=>FileCard,
    "SortableFileItem",
    ()=>SortableFileItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/utilities/dist/utilities.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$file$2d$card$2d$document$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/sections/documents/file-cards/file-card-document.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$file$2d$card$2d$image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/sections/documents/file-cards/file-card-image.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$file$2d$card$2d$video$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/sections/documents/file-cards/file-card-video.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
const FileCard = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])((props)=>{
    const { item } = props;
    if (item.type.startsWith('image/')) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$file$2d$card$2d$image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileCardImage"], {
            ...props
        }, void 0, false, {
            fileName: "[project]/components/campaigns/sections/documents/file-cards/index.tsx",
            lineNumber: 13,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (item.type.startsWith('video/')) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$file$2d$card$2d$video$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileCardVideo"], {
            ...props
        }, void 0, false, {
            fileName: "[project]/components/campaigns/sections/documents/file-cards/index.tsx",
            lineNumber: 17,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$sections$2f$documents$2f$file$2d$cards$2f$file$2d$card$2d$document$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileCardDocument"], {
        ...props
    }, void 0, false, {
        fileName: "[project]/components/campaigns/sections/documents/file-cards/index.tsx",
        lineNumber: 20,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
});
_c = FileCard;
const SortableFileItem = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c1 = _s((props)=>{
    _s();
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"])({
        id: props.item.id
    });
    const style = {
        transform: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSS"].Transform.toString(transform),
        transition
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FileCard, {
        ...props,
        setNodeRef: setNodeRef,
        style: style,
        attributes: attributes,
        listeners: listeners,
        isDragging: isDragging
    }, void 0, false, {
        fileName: "[project]/components/campaigns/sections/documents/file-cards/index.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}, "iTIyvp0X9kMGpdHRsWsr2+tGbVI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"]
    ];
})), "iTIyvp0X9kMGpdHRsWsr2+tGbVI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"]
    ];
});
_c2 = SortableFileItem;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "FileCard");
__turbopack_context__.k.register(_c1, "SortableFileItem$memo");
__turbopack_context__.k.register(_c2, "SortableFileItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/campaigns/brand-hover-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BrandHoverCard",
    ()=>BrandHoverCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$hover$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/hover-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$text$2d$case$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/text-case.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$wrapped$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/wrapped-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/imgproxy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function BrandDetailRow({ label, value }) {
    if (!value) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 text-xs",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-muted-foreground/80",
                children: [
                    label,
                    ":"
                ]
            }, void 0, true, {
                fileName: "[project]/components/campaigns/brand-hover-card.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-normal text-foreground/90 truncate",
                children: value
            }, void 0, false, {
                fileName: "[project]/components/campaigns/brand-hover-card.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/campaigns/brand-hover-card.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c = BrandDetailRow;
function BrandHoverCard({ brand, brandName, children }) {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.brand.gigsPage');
    const name = brand?.company_name || brandName || 'Unknown Brand';
    const photoUrl = brand?.profile_photo?.asset;
    // If there's no brand data at all, just render children
    if (!brand) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$hover$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HoverCard"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$hover$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HoverCardTrigger"], {
                render: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "cursor-pointer"
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/brand-hover-card.tsx",
                    lineNumber: 44,
                    columnNumber: 18
                }, this),
                nativeButton: false,
                children: children
            }, void 0, false, {
                fileName: "[project]/components/campaigns/brand-hover-card.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$hover$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HoverCardContent"], {
                side: "bottom",
                align: "end",
                sideOffset: 8,
                className: "w-80 p-0 shadow-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$wrapped$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WrappedCard"], {
                    title: t('brandDetails'),
                    titleClass: "text-xs",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                    className: "size-12 shrink-0 ring-0",
                                    children: [
                                        photoUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                            src: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imgpresets"].avatar(photoUrl),
                                            alt: name
                                        }, void 0, false, {
                                            fileName: "[project]/components/campaigns/brand-hover-card.tsx",
                                            lineNumber: 53,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                            className: "text-sm font-medium",
                                            children: name.slice(0, 2).toUpperCase()
                                        }, void 0, false, {
                                            fileName: "[project]/components/campaigns/brand-hover-card.tsx",
                                            lineNumber: 54,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/campaigns/brand-hover-card.tsx",
                                    lineNumber: 52,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "card__title mb-0",
                                            children: name
                                        }, void 0, false, {
                                            fileName: "[project]/components/campaigns/brand-hover-card.tsx",
                                            lineNumber: 59,
                                            columnNumber: 15
                                        }, this),
                                        brand.category && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "card__description mt-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$text$2d$case$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SentenceCase"], {
                                                children: brand.category.replaceAll('_', ' ')
                                            }, void 0, false, {
                                                fileName: "[project]/components/campaigns/brand-hover-card.tsx",
                                                lineNumber: 62,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/campaigns/brand-hover-card.tsx",
                                            lineNumber: 61,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/campaigns/brand-hover-card.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/campaigns/brand-hover-card.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-t border-border/60 pt-2.5 space-y-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BrandDetailRow, {
                                    label: t('company'),
                                    value: brand.company_name
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/brand-hover-card.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BrandDetailRow, {
                                    label: t('country'),
                                    value: brand.country
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/brand-hover-card.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BrandDetailRow, {
                                    label: t('category'),
                                    value: brand.category ? brand.category.replaceAll('_', ' ') : undefined
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/brand-hover-card.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this),
                                brand.website_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-muted-foreground",
                                            children: [
                                                t('website'),
                                                ":"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/campaigns/brand-hover-card.tsx",
                                            lineNumber: 74,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: brand.website_url,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "font-medium text-primary truncate hover:underline",
                                            children: brand.website_url.replace(/^https?:\/\//, '').replace(/\/$/, '')
                                        }, void 0, false, {
                                            fileName: "[project]/components/campaigns/brand-hover-card.tsx",
                                            lineNumber: 75,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/campaigns/brand-hover-card.tsx",
                                    lineNumber: 73,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/campaigns/brand-hover-card.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/campaigns/brand-hover-card.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/campaigns/brand-hover-card.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/campaigns/brand-hover-card.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_s(BrandHoverCard, "h6+q2O3NJKPY5uL0BIJGLIanww8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"]
    ];
});
_c1 = BrandHoverCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "BrandDetailRow");
__turbopack_context__.k.register(_c1, "BrandHoverCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/campaigns/gig-action-menu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GigActionMenu",
    ()=>GigActionMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$action$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/action-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$confirm$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/confirm-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$super$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/super-field.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$gig$2d$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/generated/models/utils-gig-status.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$gigs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/hooks/gigs.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EllipsisVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-client] (ecmascript) <export default as EllipsisVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$providers$2f$path$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/providers/path-provider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
function GigActionMenu({ gig, onViewGig, trigger = 'button', onEditGig }) {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.brand.gigsPage');
    const commonT = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.brand.campaignsPage.actions');
    const basePath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$providers$2f$path$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBasePath"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { mutate: updateStatus } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$gigs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateGigStatus"])();
    const { mutate: deleteGig, isPending: isDeleting } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$gigs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeleteGig"])();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [confirmName, setConfirmName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const handleConfirmDelete = ()=>{
        if (!gig.id || confirmName !== gig.title) return;
        deleteGig(gig.id, {
            onSuccess: ()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(t('actions.deletedGig'), {
                    richColors: true
                });
                setIsDeleteDialogOpen(false);
            },
            onError: (error)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(t('actions.deleteFailed'), {
                    richColors: true
                });
                console.error(error);
            }
        });
    };
    const handleApproveGig = ()=>{
        if (!gig.id) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(t('actions.missingId'));
            return;
        }
        updateStatus({
            id: gig.id,
            status: {
                gig_status: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$gig$2d$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UtilsGigStatus"].GigStatusOpen
            }
        }, {
            onSuccess: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(t('actions.approvedGig')),
            onError: (error)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(t('actions.approveFailed'));
                console.error(error);
            }
        });
    };
    const handleValidateGig = ()=>{
        if (!gig.id) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(t('actions.missingId'));
            return;
        }
        updateStatus({
            id: gig.id,
            status: {
                gig_status: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$gig$2d$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UtilsGigStatus"].GigStatusValidated
            }
        }, {
            onSuccess: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(t('actions.validatedGig')),
            onError: (error)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(t('actions.validateFailed'));
                console.error(error);
            }
        });
    };
    const actions = [
        {
            label: t('actions.viewGig'),
            action: ()=>onViewGig(gig)
        },
        {
            label: t('actions.editGig'),
            action: ()=>onEditGig ? onEditGig(gig) : router.push(`${basePath}/campaigns/${gig.campaign_id}/gigs/${gig.id}/edit`),
            allowedRoles: [
                'admin'
            ]
        },
        // {
        //   label: "Approve Gig",
        //   action: handleApproveGig,
        //   allowedRoles: [ 'admin' ],
        //   condition: () => gig.gig_status === UtilsGigStatus.GigStatusDraft || gig.gig_status === UtilsGigStatus.GigStatusInProgress,
        // },
        {
            label: t('actions.validateGig'),
            action: handleValidateGig,
            allowedRoles: [
                'admin'
            ],
            condition: ()=>gig.gig_status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$gig$2d$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UtilsGigStatus"].GigStatusDraft
        },
        {
            label: t('actions.submissions'),
            action: ()=>onViewGig(gig, 'submissions'),
            allowedRoles: [
                'admin',
                'brand'
            ],
            condition: ()=>gig.gig_status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$generated$2f$models$2f$utils$2d$gig$2d$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UtilsGigStatus"].GigStatusOpen
        },
        {
            label: t('actions.mySubmissions'),
            action: ()=>onViewGig(gig, 'submissions'),
            allowedRoles: [
                'creator'
            ]
        },
        {
            label: t('actions.deleteGig'),
            action: ()=>{
                setIsDeleteDialogOpen(true);
                setConfirmName('');
            },
            allowedRoles: [
                'admin'
            ],
            variant: 'destructive',
            separator: true
        }
    ];
    const triggerNode = trigger === 'icon' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        variant: "ghost",
        size: "icon",
        className: "h-8 w-8 text-muted-foreground",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EllipsisVertical$3e$__["EllipsisVertical"], {
                className: "size-5",
                strokeWidth: 1
            }, void 0, false, {
                fileName: "[project]/components/campaigns/gig-action-menu.tsx",
                lineNumber: 137,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: commonT('openMenu')
            }, void 0, false, {
                fileName: "[project]/components/campaigns/gig-action-menu.tsx",
                lineNumber: 138,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/campaigns/gig-action-menu.tsx",
        lineNumber: 136,
        columnNumber: 7
    }, this) : trigger === 'button' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        variant: "outline",
        size: "sm",
        className: "font-regular",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/components/campaigns/gig-action-menu.tsx",
            lineNumber: 142,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/campaigns/gig-action-menu.tsx",
        lineNumber: 141,
        columnNumber: 7
    }, this) : trigger;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$action$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionMenu"], {
                actions: actions,
                data: gig,
                trigger: triggerNode
            }, void 0, false, {
                fileName: "[project]/components/campaigns/gig-action-menu.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$confirm$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfirmDialog"], {
                open: isDeleteDialogOpen,
                onOpenChange: setIsDeleteDialogOpen,
                title: t('actions.deleteGigTitle'),
                description: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        t('actions.deleteGigDescription'),
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: gig.title
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/gig-action-menu.tsx",
                            lineNumber: 162,
                            columnNumber: 53
                        }, this),
                        " ",
                        t('actions.deleteGigDescriptionSuffix')
                    ]
                }, void 0, true),
                confirmLabel: isDeleting ? t('actions.deletingGig') : t('actions.deleteGig'),
                onConfirm: handleConfirmDelete,
                confirmDisabled: confirmName !== gig.title,
                isLoading: isDeleting,
                variant: "destructive",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$super$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SuperField"], {
                        type: "text",
                        name: "confirm-name",
                        value: confirmName,
                        onChange: (e)=>setConfirmName(e.target.value),
                        placeholder: t('actions.confirmGigName')
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/gig-action-menu.tsx",
                        lineNumber: 172,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/gig-action-menu.tsx",
                    lineNumber: 171,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/campaigns/gig-action-menu.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(GigActionMenu, "I56hvuPyMFBk3buWhqiOQVcDKFc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$providers$2f$path$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBasePath"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$gigs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateGigStatus"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$gigs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeleteGig"]
    ];
});
_c = GigActionMenu;
var _c;
__turbopack_context__.k.register(_c, "GigActionMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/campaigns/gig-details-sheet.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GigDetailsSheet",
    ()=>GigDetailsSheet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animate$2d$ui$2f$components$2f$base$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/animate-ui/components/base/tabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$media$2d$preview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/media-preview.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$creator$2f$create$2d$submission$2d$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/creator/create-submission-sheet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$creator$2f$invitation$2d$action$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/creator/invitation-action-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/button-group.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$campaigns$2f$assets$2d$block$2f$documents$2d$tab$2d$content$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/campaigns/assets-block/documents-tab-content.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$campaigns$2f$assets$2d$block$2f$images$2d$tab$2d$content$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/campaigns/assets-block/images-tab-content.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$campaigns$2f$assets$2d$block$2f$videos$2d$tab$2d$content$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/campaigns/assets-block/videos-tab-content.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/separator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/sheet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$role$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/role-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$creators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/hooks/creators.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$gigs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/hooks/gigs.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$video$2d$submissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/hooks/video-submissions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/imgproxy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VideoIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/video.js [app-client] (ecmascript) <export default as VideoIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$creators$2f$creator$2d$details$2d$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/admin/creators/creator-details-sheet.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$creators$2f$details$2d$sheet$2f$creator$2d$details$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/creators/details-sheet/creator-details-shared.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$empty$2d$states$2f$empty$2d$submissions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/empty-states/empty-submissions.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$role$2d$guard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/role-guard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$content$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/content.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$expandable$2d$content$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/expandable-content.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$wrapped$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/wrapped-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$text$2d$case$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/text-case.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$brand$2d$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/brand-avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$brand$2d$hover$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/brand-hover-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$gig$2d$action$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/gig-action-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$gig$2d$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/campaigns/gig-status-badge.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard-ui/status-badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/campaigns/submission-card.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature();
"use client";
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
// ─── Cover image ──────────────────────────────────────────────────────────────
function GigCoverImage({ src, productUrl, alt }) {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.creator');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full aspect-4/3 shrink-0 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$imgproxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imgpresets"].banner(src),
                alt: alt,
                className: "w-full h-full object-cover object-[50%_20%]"
            }, void 0, false, {
                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            productUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: productUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "absolute bottom-40 right-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors",
                children: [
                    t('common.product'),
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                        className: "size-3"
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                        lineNumber: 81,
                        columnNumber: 37
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                lineNumber: 75,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
_s(GigCoverImage, "h6+q2O3NJKPY5uL0BIJGLIanww8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"]
    ];
});
_c = GigCoverImage;
function GigSheetHeader({ title, gigStatus, numberOfVideos, videoDuration, postingEndDate, hasCoverImage, brand, compensationValue, gigCostValue, formattedCompensation, formattedGigCost }) {
    _s1();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.creator');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetHeader"], {
        className: `relative flex flex-row items-start gap-4 bg-burgundy-50/70 mx-6 rounded-lg border border-primary/20 mb-0 ${hasCoverImage ? '-mt-32 z-10 backdrop-blur-lg' : 'mt-16'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2 flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetTitle"], {
                        className: "text-xl font-normal text-primary font-primary tracking-tight leading-snug",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2 items-center",
                        children: [
                            numberOfVideos && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VideoIcon$3e$__["VideoIcon"], {
                                        strokeWidth: 1
                                    }, void 0, false, {
                                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                        lineNumber: 128,
                                        columnNumber: 15
                                    }, this),
                                    t('common.videoCount', {
                                        count: numberOfVideos
                                    }),
                                    videoDuration ? ` · ${videoDuration}s` : ''
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                                orientation: "vertical",
                                className: "bg-muted-foreground/30"
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            postingEndDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground/70",
                                        children: [
                                            t('common.deadline'),
                                            " "
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                        lineNumber: 136,
                                        columnNumber: 15
                                    }, this),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(postingEndDate)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GigStatusBadge"], {
                        status: gigStatus,
                        className: "self-start"
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            brand && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$brand$2d$hover$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrandHoverCard"], {
                brand: brand,
                brandName: brand.company_name,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$brand$2d$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrandAvatar"], {
                    brand: brand,
                    className: "size-12 shrink-0 cursor-pointer bg-background ring-2 ring-background hover:ring-primary/30 transition-shadow"
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                    lineNumber: 147,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                lineNumber: 146,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetDescription"], {
                className: "sr-only",
                children: t('gigDetailsFor', {
                    title: title
                })
            }, void 0, false, {
                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
        lineNumber: 119,
        columnNumber: 5
    }, this);
}
_s1(GigSheetHeader, "h6+q2O3NJKPY5uL0BIJGLIanww8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"]
    ];
});
_c1 = GigSheetHeader;
function GigDetailsTab({ genderRequirement, ageMin, ageMax, ambience, requirements, contentGuidelines }) {
    _s2();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.brand.gigsPage');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animate$2d$ui$2f$components$2f$base$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsPanel"], {
        value: "details",
        className: "pt-0 gap-2 flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$wrapped$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WrappedCard"], {
                title: t('creatorRequirements'),
                className: "m-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2 flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
                                        children: t('gender')
                                    }, void 0, false, {
                                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                        lineNumber: 178,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-end gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `flex flex-col items-center gap-0.5 transition-opacity ${genderRequirement === 'female' ? 'opacity-20' : ''}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: "/svg/avatar-male.svg",
                                                        alt: t('male'),
                                                        className: "size-16"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-muted-foreground mt-2",
                                                        children: t('male')
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                                        lineNumber: 182,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                                lineNumber: 180,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `flex flex-col items-center gap-0.5 transition-opacity ${genderRequirement === 'male' ? 'opacity-20' : ''}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: "/svg/avatar-female.svg",
                                                        alt: t('female'),
                                                        className: "size-16"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                                        lineNumber: 185,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-muted-foreground mt-2",
                                                        children: t('female')
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                                        lineNumber: 186,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                                lineNumber: 184,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                        lineNumber: 179,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                                orientation: "vertical",
                                className: "self-stretch"
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 191,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2 flex-1 items-end",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
                                        children: t('ageRange')
                                    }, void 0, false, {
                                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                        lineNumber: 195,
                                        columnNumber: 13
                                    }, this),
                                    ageMin || ageMax ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative flex items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "relative z-10 text-xl mt-2 font-light bg-background px-2.5 py-1 rounded-md pr-5 border border-border shadow-md z-90",
                                                children: ageMin ?? '—'
                                            }, void 0, false, {
                                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                                lineNumber: 198,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                strokeWidth: 1,
                                                className: "relative z-10 size-8 text-muted-foreground bg-background rounded-full -ml-3 mt-2 shadow-md p-1 z-100"
                                            }, void 0, false, {
                                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                                lineNumber: 199,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "relative z-10 text-xl mt-2 -ml-8 pl-10 font-light bg-background px-2.5 py-1 rounded-md border border-border shadow-md",
                                                children: ageMax ?? '—'
                                            }, void 0, false, {
                                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                                lineNumber: 200,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                        lineNumber: 197,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-muted-foreground",
                                        children: t('any')
                                    }, void 0, false, {
                                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                        lineNumber: 203,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 194,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                        lineNumber: 208,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$creators$2f$details$2d$sheet$2f$creator$2d$details$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Row"], {
                        label: t('ambience'),
                        value: ambience ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "capitalize",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$content$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                                content: ambience
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 209,
                                columnNumber: 88
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                            lineNumber: 209,
                            columnNumber: 59
                        }, this) : t('na')
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this),
                    requirements && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 212,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$creators$2f$details$2d$sheet$2f$creator$2d$details$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Row"], {
                                label: t('requirements'),
                                value: requirements
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 213,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this),
            contentGuidelines && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$wrapped$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WrappedCard"], {
                title: t('contentGuidelines'),
                className: "m-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$content$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                    content: contentGuidelines
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                    lineNumber: 220,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                lineNumber: 219,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
        lineNumber: 173,
        columnNumber: 5
    }, this);
}
_s2(GigDetailsTab, "h6+q2O3NJKPY5uL0BIJGLIanww8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"]
    ];
});
_c2 = GigDetailsTab;
function GigCampaignTab({ campaign, imageItems, documentItems, videoItems, hasAssets, onPreview }) {
    _s3();
    const summaryT = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.brand.newCampaignPage.summary');
    const gigsT = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.brand.gigsPage');
    const keywords = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "GigCampaignTab.useMemo[keywords]": ()=>campaign.keywords?.split(',').map({
                "GigCampaignTab.useMemo[keywords]": (k)=>k.trim()
            }["GigCampaignTab.useMemo[keywords]"]).filter(Boolean) ?? []
    }["GigCampaignTab.useMemo[keywords]"], [
        campaign.keywords
    ]);
    const assetsDefault = imageItems.length > 0 ? 'images' : videoItems.length > 0 ? 'videos' : 'documents';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animate$2d$ui$2f$components$2f$base$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsPanel"], {
        value: "campaign",
        className: "space-y-3 pt-0 m-1",
        children: [
            campaign.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$wrapped$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WrappedCard"], {
                title: summaryT('campaignBriefTitle'),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$expandable$2d$content$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExpandableContent"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$content$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                        content: campaign.description
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                        lineNumber: 252,
                        columnNumber: 30
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                    lineNumber: 252,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                lineNumber: 251,
                columnNumber: 9
            }, this),
            (campaign.dos || campaign.donts) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$wrapped$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WrappedCard"], {
                title: summaryT('campaignBriefDescription'),
                children: [
                    campaign.dos && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-medium text-emerald-600",
                                children: summaryT('dos')
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 260,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$expandable$2d$content$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExpandableContent"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$content$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                                    content: campaign.dos
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                    lineNumber: 261,
                                    columnNumber: 34
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 261,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                        lineNumber: 259,
                        columnNumber: 13
                    }, this),
                    campaign.dos && campaign.donts && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                        lineNumber: 264,
                        columnNumber: 47
                    }, this),
                    campaign.donts && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-medium text-rose-500",
                                children: summaryT('donts')
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 267,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$expandable$2d$content$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExpandableContent"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$content$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                                    content: campaign.donts
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                    lineNumber: 268,
                                    columnNumber: 34
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 268,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                        lineNumber: 266,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                lineNumber: 257,
                columnNumber: 9
            }, this),
            (campaign.tone_of_voice || keywords.length > 0 || campaign.category) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$wrapped$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WrappedCard"], {
                title: summaryT('details'),
                children: [
                    campaign.tone_of_voice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$creators$2f$details$2d$sheet$2f$creator$2d$details$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Row"], {
                                label: summaryT('toneOfVoice'),
                                value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$content$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                                    content: campaign.tone_of_voice
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                    lineNumber: 278,
                                    columnNumber: 64
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 278,
                                columnNumber: 15
                            }, this),
                            (keywords.length > 0 || campaign.category) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 279,
                                columnNumber: 65
                            }, this)
                        ]
                    }, void 0, true),
                    keywords.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$creators$2f$details$2d$sheet$2f$creator$2d$details$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Row"], {
                                label: summaryT('keywords'),
                                value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap justify-end gap-1",
                                    children: keywords.map((kw)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "secondary",
                                            className: "text-xs font-normal",
                                            children: kw
                                        }, kw, false, {
                                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                            lineNumber: 286,
                                            columnNumber: 45
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                    lineNumber: 285,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 284,
                                columnNumber: 15
                            }, this),
                            campaign.category && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 289,
                                columnNumber: 38
                            }, this)
                        ]
                    }, void 0, true),
                    campaign.category && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$creators$2f$details$2d$sheet$2f$creator$2d$details$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Row"], {
                        label: gigsT('category'),
                        value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            variant: "outline",
                            className: "capitalize text-xs font-normal",
                            children: campaign.category
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                            lineNumber: 293,
                            columnNumber: 56
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                        lineNumber: 293,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                lineNumber: 275,
                columnNumber: 9
            }, this),
            hasAssets && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$wrapped$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WrappedCard"], {
                title: summaryT('assets'),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animate$2d$ui$2f$components$2f$base$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tabs"], {
                    defaultValue: assetsDefault,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animate$2d$ui$2f$components$2f$base$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsList"], {
                            variant: "default",
                            className: "w-full mb-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animate$2d$ui$2f$components$2f$base$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTab"], {
                                    value: "images",
                                    className: "text-xs font-normal flex items-center gap-1.5",
                                    children: [
                                        summaryT('images'),
                                        imageItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "secondary",
                                            className: "h-4 px-1.5 text-[10px] font-normal",
                                            children: imageItems.length
                                        }, void 0, false, {
                                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                            lineNumber: 304,
                                            columnNumber: 44
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                    lineNumber: 302,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animate$2d$ui$2f$components$2f$base$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTab"], {
                                    value: "documents",
                                    className: "text-xs font-normal flex items-center gap-1.5",
                                    children: [
                                        summaryT('docs'),
                                        documentItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "secondary",
                                            className: "h-4 px-1.5 text-[10px] font-normal",
                                            children: documentItems.length
                                        }, void 0, false, {
                                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                            lineNumber: 308,
                                            columnNumber: 47
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                    lineNumber: 306,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animate$2d$ui$2f$components$2f$base$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTab"], {
                                    value: "videos",
                                    className: "text-xs font-normal flex items-center gap-1.5",
                                    children: [
                                        summaryT('videos'),
                                        videoItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "secondary",
                                            className: "h-4 px-1.5 text-[10px] font-normal",
                                            children: videoItems.length
                                        }, void 0, false, {
                                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                            lineNumber: 312,
                                            columnNumber: 44
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                    lineNumber: 310,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                            lineNumber: 301,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animate$2d$ui$2f$components$2f$base$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsPanels"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animate$2d$ui$2f$components$2f$base$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsPanel"], {
                                    value: "images",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$campaigns$2f$assets$2d$block$2f$images$2d$tab$2d$content$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImagesTabContent"], {
                                        imageItems: imageItems,
                                        onPreview: (i)=>onPreview(i, imageItems)
                                    }, void 0, false, {
                                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                        lineNumber: 317,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                    lineNumber: 316,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animate$2d$ui$2f$components$2f$base$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsPanel"], {
                                    value: "documents",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$campaigns$2f$assets$2d$block$2f$documents$2d$tab$2d$content$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DocumentsTabContent"], {
                                        documentItems: documentItems,
                                        onPreview: (i)=>onPreview(i, documentItems)
                                    }, void 0, false, {
                                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                        lineNumber: 320,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                    lineNumber: 319,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animate$2d$ui$2f$components$2f$base$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsPanel"], {
                                    value: "videos",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$campaigns$2f$assets$2d$block$2f$videos$2d$tab$2d$content$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VideosTabContent"], {
                                        videoItems: videoItems,
                                        onPreview: (i)=>onPreview(i, videoItems)
                                    }, void 0, false, {
                                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                        lineNumber: 323,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                    lineNumber: 322,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                            lineNumber: 315,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                    lineNumber: 300,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                lineNumber: 299,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
        lineNumber: 249,
        columnNumber: 5
    }, this);
}
_s3(GigCampaignTab, "XMvIgSgO0gquoF9XUwGgyQCT0Nk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"]
    ];
});
_c3 = GigCampaignTab;
function GigSubmissionsTab({ submissions, isLoading, error, canSubmit, showAddSubmissionButton, onOpenSubmission }) {
    _s4();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.brand.campaignsPage');
    const creatorInvitationActionsT = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.creator.invitations.actions');
    const shouldShowAddSubmissionButton = canSubmit && showAddSubmissionButton;
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animate$2d$ui$2f$components$2f$base$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsPanel"], {
            value: "submissions",
            className: "pt-0 flex-1 h-full",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center items-center p-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    className: "h-6 w-6 animate-spin text-muted-foreground"
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                    lineNumber: 352,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                lineNumber: 351,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
            lineNumber: 350,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animate$2d$ui$2f$components$2f$base$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsPanel"], {
            value: "submissions",
            className: "pt-0 flex-1 h-full",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 text-red-500 bg-red-50 rounded-md border border-red-200 text-sm",
                children: [
                    t('errorLoadingSubmissions'),
                    ": ",
                    error.message
                ]
            }, void 0, true, {
                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                lineNumber: 361,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
            lineNumber: 360,
            columnNumber: 7
        }, this);
    }
    if (submissions.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animate$2d$ui$2f$components$2f$base$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsPanel"], {
            value: "submissions",
            className: "pt-0 flex-1 h-full",
            children: shouldShowAddSubmissionButton ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "outline",
                    className: "h-52 w-full border-dashed border-2 border-muted-foreground/40 bg-transparent hover:bg-muted/40",
                    onClick: onOpenSubmission,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center justify-center gap-2 text-muted-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "size-5"
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 379,
                                columnNumber: 17
                            }, this),
                            creatorInvitationActionsT('createSubmission')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                        lineNumber: 378,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                    lineNumber: 373,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                lineNumber: 372,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$empty$2d$states$2f$empty$2d$submissions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptySubmission"], {
                title: t('noSubmissionsYet'),
                imageWidth: 140,
                description: t('noSubmissionsYetDescription')
            }, void 0, false, {
                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                lineNumber: 385,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
            lineNumber: 370,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animate$2d$ui$2f$components$2f$base$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsPanel"], {
        value: "submissions",
        className: "pt-0 flex-1 h-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 gap-4",
            children: [
                submissions.map((submission, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$submission$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubmissionCard"], {
                        submission: submission,
                        overlayDetailsMode: "hover",
                        layout: "media-overlay"
                    }, submission.id || `${submission.gig_id || 'submission'}-${index}`, false, {
                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                        lineNumber: 399,
                        columnNumber: 11
                    }, this)),
                shouldShowAddSubmissionButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "outline",
                    size: "icon-lg",
                    className: "border-dashed border-px border-muted-foreground/20 bg-transparent hover:bg-muted/40 rounded-full mx-auto hover:shadow-lg cursor-pointer",
                    onClick: onOpenSubmission,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                            className: "size-5 text-muted-foreground",
                            strokeWidth: 1
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                            lineNumber: 413,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "sr-only",
                            children: creatorInvitationActionsT('createSubmission')
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                            lineNumber: 414,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                    lineNumber: 407,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
            lineNumber: 397,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
        lineNumber: 396,
        columnNumber: 5
    }, this);
}
_s4(GigSubmissionsTab, "3PtzAuBLxgokdf5L5Qq7BVual5U=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"]
    ];
});
_c4 = GigSubmissionsTab;
function GigFooter({ gig, compensationValue, gigCostValue, formattedCompensation, formattedGigCost, invitationId, invitationStatus, gigStatus, isApplying, isResponding, isParticipating, hasAppliedPending, submissionsCount, isFooterLoading, onApply, onRespond, onOpenSubmission, onSelectTab }) {
    _s5();
    const commonT = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.creator.common');
    const invitationActionsT = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.creator.invitations.actions');
    const invitationDialogsT = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.creator.invitations.dialogs');
    const tc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.common');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetFooter"], {
        className: "px-6 pb-6 pt-3 shrink-0 flex flex-col gap-3 border-t border-border/50",
        children: [
            (compensationValue || gigCostValue) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "w-full flex flex-col p-2 bg-background/40 ring-primary/20 shadow-2xl",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                    className: "flex flex-col gap-2 px-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$role$2d$guard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoleGuard"], {
                            excludedRoles: [
                                'brand'
                            ],
                            children: compensationValue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$creators$2f$details$2d$sheet$2f$creator$2d$details$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Row"], {
                                label: commonT('reward'),
                                value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xl font-primary text-primary leading-none",
                                    children: formattedCompensation
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                    lineNumber: 478,
                                    columnNumber: 60
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 478,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                            lineNumber: 476,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$role$2d$guard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoleGuard"], {
                            allowedRoles: [
                                'admin'
                            ],
                            children: compensationValue && gigCostValue ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 482,
                                columnNumber: 53
                            }, this) : null
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                            lineNumber: 481,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$role$2d$guard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoleGuard"], {
                            allowedRoles: [
                                'brand',
                                'admin'
                            ],
                            children: gigCostValue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$creators$2f$details$2d$sheet$2f$creator$2d$details$2d$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Row"], {
                                label: commonT('gigCost'),
                                value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xl font-primary text-primary leading-none",
                                    children: formattedGigCost
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                    lineNumber: 486,
                                    columnNumber: 61
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 486,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                            lineNumber: 484,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                    lineNumber: 475,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                lineNumber: 474,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$role$2d$guard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoleGuard"], {
                allowedRoles: [
                    'creator'
                ],
                children: isFooterLoading ? null : invitationId && invitationStatus === 'pending' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-2 w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            className: "w-full",
                            onClick: ()=>onRespond('declined'),
                            disabled: isResponding,
                            children: invitationActionsT('decline')
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                            lineNumber: 496,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            className: "w-full",
                            onClick: ()=>onRespond('accepted'),
                            disabled: isResponding,
                            children: isResponding ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "mr-2 h-4 w-4 animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                        lineNumber: 500,
                                        columnNumber: 34
                                    }, this),
                                    invitationDialogsT('accepting')
                                ]
                            }, void 0, true) : invitationActionsT('accept')
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                            lineNumber: 499,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                    lineNumber: 495,
                    columnNumber: 11
                }, this) : isParticipating ? submissionsCount === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    className: "w-full",
                    onClick: onOpenSubmission,
                    children: invitationActionsT('createSubmission')
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                    lineNumber: 505,
                    columnNumber: 13
                }, this) : hasAppliedPending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    className: "w-full",
                    disabled: true,
                    children: commonT('applicationPending')
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                    lineNumber: 510,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    className: "w-full",
                    onClick: onApply,
                    disabled: isApplying || gigStatus !== 'open',
                    children: isApplying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                className: "mr-2 h-4 w-4 animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 519,
                                columnNumber: 30
                            }, this),
                            commonT('applying')
                        ]
                    }, void 0, true) : commonT('applyForGig')
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                    lineNumber: 514,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                lineNumber: 493,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$role$2d$guard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoleGuard"], {
                allowedRoles: [
                    'admin'
                ],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$gig$2d$action$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GigActionMenu"], {
                    gig: gig,
                    onViewGig: (_, tab)=>onSelectTab(tab ?? 'details'),
                    trigger: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ButtonGroup"], {
                        className: "self-start min-w-[240px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                className: "font-regular flex-1",
                                children: tc('actions')
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 530,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                className: "font-regular shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                    className: "size-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                    lineNumber: 534,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 533,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                        lineNumber: 529,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                    lineNumber: 525,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                lineNumber: 524,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$role$2d$guard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoleGuard"], {
                allowedRoles: [
                    'creator'
                ],
                children: invitationId && invitationStatus !== 'pending' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$creator$2f$invitation$2d$action$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvitationActionMenu"], {
                    invitation: {
                        id: invitationId,
                        gig_id: gig.id,
                        status: invitationStatus
                    },
                    trigger: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ButtonGroup"], {
                        className: "self-start min-w-[240px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                className: "font-regular flex-1",
                                children: tc('actions')
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 551,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                className: "font-regular shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                    className: "size-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                    lineNumber: 555,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 554,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                        lineNumber: 550,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                    lineNumber: 543,
                    columnNumber: 11
                }, this) : null
            }, void 0, false, {
                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                lineNumber: 541,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
        lineNumber: 472,
        columnNumber: 5
    }, this);
}
_s5(GigFooter, "SvMxomiemckOBysjWo4EOmqIiD4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"]
    ];
});
_c5 = GigFooter;
function GigDetailsSheet({ gig, open, onOpenChange, invitationId, invitationStatus, initialTab, onCreateSubmission }) {
    _s6();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.brand.gigsPage');
    const campaignT = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.brand.campaignsPage');
    const campaignActionsT = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.brand.campaignsPage.actions');
    const creatorCommonT = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.creator.common');
    const creatorInvitationToastsT = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('dashboard.creator.invitations.toasts');
    const [activeTab, setActiveTab] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](initialTab ?? 'details');
    const [gallery, setGallery] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [submissionSheetOpen, setSubmissionSheetOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const role = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$role$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRole"])();
    const isCreator = role === 'creator';
    const { mutate: applyToGig, isPending: isApplying } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$gigs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApplyToGig"])();
    const { mutate: respondToInvitation, isPending: isResponding } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$gigs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRespondToInvitation"])();
    const { data: submissionsResponse, isLoading: isSubmissionsLoading, error: submissionsError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$video$2d$submissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVideoSubmissionsByGig"])(gig?.id || '', {
        enabled: !!gig?.id && open
    });
    // Fetch invitation and participation data for creator role when not provided via props
    const needsFetch = isCreator && !invitationId;
    const { data: creatorInvitationsData, isLoading: isInvitationLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$gigs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreatorInvitations"])({
        enabled: needsFetch && open
    });
    const { data: creatorApplicationsData, isLoading: isApplicationsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$creators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreatorApplications"])({
        enabled: needsFetch && open
    });
    // Find the creator's invitation for this specific gig
    const creatorInvitations = creatorInvitationsData?.data || [];
    const gigInvitation = creatorInvitations.find((inv)=>inv.gig_id === gig?.id);
    // Derive effective invitation state — props take priority (invitations view already has the data)
    const effectiveInvitationId = invitationId ?? gigInvitation?.id;
    const effectiveInvitationStatus = invitationStatus ?? gigInvitation?.status;
    // Application state for this gig
    const gigApplication = creatorApplicationsData?.data?.find((a)=>a.gig_id === gig?.id);
    const hasAcceptedApplication = gigApplication?.status === 'accepted';
    const hasAppliedPending = !effectiveInvitationId && gigApplication?.status === 'pending';
    // Creator is participating after accepted invitation or accepted application
    const isParticipating = hasAcceptedApplication || effectiveInvitationStatus === 'accepted';
    // Wait for all creator-specific queries before showing action buttons to avoid flashing
    const isFooterLoading = isCreator && (isSubmissionsLoading || needsFetch && (isInvitationLoading || isApplicationsLoading));
    const formattedCompensation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormatCurrency"])(gig?.compensation?.value ?? 0, gig?.compensation?.currency || 'EUR');
    const formattedGigCost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormatCurrency"])(gig?.gig_cost?.value ?? 0, gig?.gig_cost?.currency || 'EUR');
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "GigDetailsSheet.useEffect": ()=>{
            if (!open) return;
            setActiveTab(initialTab ?? 'details');
        }
    }["GigDetailsSheet.useEffect"], [
        open,
        gig?.id,
        initialTab
    ]);
    const campaign = gig?.campaign;
    const imageItems = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "GigDetailsSheet.useMemo[imageItems]": ()=>campaign?.campaign_images ?? []
    }["GigDetailsSheet.useMemo[imageItems]"], [
        campaign
    ]);
    const documentItems = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "GigDetailsSheet.useMemo[documentItems]": ()=>campaign?.campaign_documents ?? []
    }["GigDetailsSheet.useMemo[documentItems]"], [
        campaign
    ]);
    const videoItems = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "GigDetailsSheet.useMemo[videoItems]": ()=>campaign?.sample_videos ?? []
    }["GigDetailsSheet.useMemo[videoItems]"], [
        campaign
    ]);
    const hasAssets = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "GigDetailsSheet.useMemo[hasAssets]": ()=>imageItems.length > 0 || documentItems.length > 0 || videoItems.length > 0
    }["GigDetailsSheet.useMemo[hasAssets]"], [
        imageItems,
        documentItems,
        videoItems
    ]);
    const submissions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "GigDetailsSheet.useMemo[submissions]": ()=>submissionsResponse?.data ?? []
    }["GigDetailsSheet.useMemo[submissions]"], [
        submissionsResponse
    ]);
    const shouldShowAddSubmissionButton = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "GigDetailsSheet.useMemo[shouldShowAddSubmissionButton]": ()=>isCreator && gig?.enforce_single_creator_submission === true && typeof gig?.number_of_videos === 'number' && submissions.length !== gig.number_of_videos
    }["GigDetailsSheet.useMemo[shouldShowAddSubmissionButton]"], [
        isCreator,
        gig?.enforce_single_creator_submission,
        gig?.number_of_videos,
        submissions.length
    ]);
    const coverImage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "GigDetailsSheet.useMemo[coverImage]": ()=>campaign?.product_image?.asset !== '' ? campaign?.product_image?.asset : campaign?.campaign_images?.[0]?.asset
    }["GigDetailsSheet.useMemo[coverImage]"], [
        campaign
    ]);
    const handleApply = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "GigDetailsSheet.useCallback[handleApply]": ()=>{
            if (!gig?.id) return;
            applyToGig({
                id: gig.id,
                application: {
                    message: "I am interested in this gig!",
                    number_of_videos: gig.number_of_videos || 1
                }
            }, {
                onSuccess: {
                    "GigDetailsSheet.useCallback[handleApply]": ()=>{
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(creatorCommonT('toasts.appliedSuccess'));
                        onOpenChange(false);
                    }
                }["GigDetailsSheet.useCallback[handleApply]"],
                onError: {
                    "GigDetailsSheet.useCallback[handleApply]": (error)=>{
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(creatorCommonT('toasts.appliedError'), {
                            richColors: true,
                            description: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$text$2d$case$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SentenceCase"], {
                                children: error?.response?.data?.error?.message ?? creatorCommonT('toasts.appliedError')
                            }, void 0, false, {
                                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                lineNumber: 655,
                                columnNumber: 24
                            }, this),
                            dismissible: true
                        });
                    }
                }["GigDetailsSheet.useCallback[handleApply]"]
            });
        }
    }["GigDetailsSheet.useCallback[handleApply]"], [
        gig,
        applyToGig,
        onOpenChange,
        creatorCommonT
    ]);
    const handleRespond = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "GigDetailsSheet.useCallback[handleRespond]": (status)=>{
            if (!effectiveInvitationId) return;
            respondToInvitation({
                invitationId: effectiveInvitationId,
                response: {
                    status
                }
            }, {
                onSuccess: {
                    "GigDetailsSheet.useCallback[handleRespond]": ()=>{
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(status === 'accepted' ? creatorInvitationToastsT('accepted') : creatorInvitationToastsT('declined'));
                        onOpenChange(false);
                    }
                }["GigDetailsSheet.useCallback[handleRespond]"],
                onError: {
                    "GigDetailsSheet.useCallback[handleRespond]": ()=>{
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(creatorInvitationToastsT('error'));
                    }
                }["GigDetailsSheet.useCallback[handleRespond]"]
            });
        }
    }["GigDetailsSheet.useCallback[handleRespond]"], [
        effectiveInvitationId,
        respondToInvitation,
        onOpenChange,
        creatorInvitationToastsT
    ]);
    const handlePreview = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "GigDetailsSheet.useCallback[handlePreview]": (index, items)=>{
            setGallery({
                index,
                items
            });
        }
    }["GigDetailsSheet.useCallback[handlePreview]"], []);
    if (!gig) return null;
    const { title, gig_status, posting_end_date, compensation: compensationMoney, number_of_videos, video_duration_in_seconds, requirements, content_guidelines, ambience, gender_requirement, age_min, age_max } = gig;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sheet"], {
                open: open,
                onOpenChange: onOpenChange,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2d$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetContent"], {
                    className: "w-[97%]! max-w-[550px]! overflow-hidden bg-background/80 flex flex-col p-0!",
                    children: [
                        coverImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GigCoverImage, {
                            src: coverImage,
                            productUrl: campaign?.product_url,
                            alt: campaign?.campaign_name
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                            lineNumber: 686,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GigSheetHeader, {
                            title: title,
                            gigStatus: gig_status,
                            numberOfVideos: number_of_videos,
                            videoDuration: video_duration_in_seconds,
                            postingEndDate: posting_end_date,
                            hasCoverImage: !!coverImage,
                            brand: campaign?.brand,
                            compensationValue: compensationMoney?.value,
                            gigCostValue: gig.gig_cost?.value,
                            formattedCompensation: formattedCompensation,
                            formattedGigCost: formattedGigCost
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                            lineNumber: 689,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animate$2d$ui$2f$components$2f$base$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tabs"], {
                            value: activeTab,
                            onValueChange: (v)=>setActiveTab(v),
                            className: "px-6 flex-1 flex flex-col min-h-0 overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animate$2d$ui$2f$components$2f$base$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsList"], {
                                    variant: "default",
                                    className: "w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animate$2d$ui$2f$components$2f$base$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTab"], {
                                            value: "details",
                                            className: "text-xs font-normal",
                                            children: t('details')
                                        }, void 0, false, {
                                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                            lineNumber: 709,
                                            columnNumber: 15
                                        }, this),
                                        campaign && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animate$2d$ui$2f$components$2f$base$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTab"], {
                                            value: "campaign",
                                            className: "text-xs font-normal",
                                            children: campaignT('title')
                                        }, void 0, false, {
                                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                            lineNumber: 710,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animate$2d$ui$2f$components$2f$base$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTab"], {
                                            value: "submissions",
                                            className: "text-xs font-normal",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$role$2d$guard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoleGuard"], {
                                                    allowedRoles: [
                                                        'creator'
                                                    ],
                                                    children: "My Submissions"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                                    lineNumber: 712,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$role$2d$guard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoleGuard"], {
                                                    excludedRoles: [
                                                        'creator'
                                                    ],
                                                    children: campaignActionsT('submissions')
                                                }, void 0, false, {
                                                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                                    lineNumber: 713,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                            lineNumber: 711,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                    lineNumber: 708,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 overflow-y-auto h-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GigDetailsTab, {
                                            genderRequirement: gender_requirement,
                                            ageMin: age_min,
                                            ageMax: age_max,
                                            ambience: ambience,
                                            requirements: requirements,
                                            contentGuidelines: content_guidelines
                                        }, void 0, false, {
                                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                            lineNumber: 718,
                                            columnNumber: 15
                                        }, this),
                                        campaign && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GigCampaignTab, {
                                            campaign: campaign,
                                            imageItems: imageItems,
                                            documentItems: documentItems,
                                            videoItems: videoItems,
                                            hasAssets: hasAssets,
                                            onPreview: handlePreview
                                        }, void 0, false, {
                                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                            lineNumber: 728,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GigSubmissionsTab, {
                                            submissions: submissions,
                                            isLoading: isSubmissionsLoading,
                                            error: submissionsError,
                                            canSubmit: !!effectiveInvitationId && effectiveInvitationStatus === 'accepted' || isParticipating,
                                            showAddSubmissionButton: shouldShowAddSubmissionButton,
                                            onOpenSubmission: ()=>setSubmissionSheetOpen(true)
                                        }, void 0, false, {
                                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                            lineNumber: 738,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                                    lineNumber: 717,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                            lineNumber: 703,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GigFooter, {
                            gig: gig,
                            compensationValue: compensationMoney?.value,
                            gigCostValue: gig.gig_cost?.value,
                            formattedCompensation: formattedCompensation,
                            formattedGigCost: formattedGigCost,
                            invitationId: effectiveInvitationId,
                            invitationStatus: effectiveInvitationStatus,
                            gigStatus: gig_status,
                            isApplying: isApplying,
                            isResponding: isResponding,
                            isParticipating: isParticipating,
                            hasAppliedPending: hasAppliedPending,
                            submissionsCount: submissions.length,
                            isFooterLoading: isFooterLoading,
                            onApply: handleApply,
                            onRespond: handleRespond,
                            onOpenSubmission: ()=>setSubmissionSheetOpen(true),
                            onSelectTab: setActiveTab
                        }, void 0, false, {
                            fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                            lineNumber: 749,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                    lineNumber: 684,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                lineNumber: 683,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$campaigns$2f$media$2d$preview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MediaPreview"], {
                items: (gallery?.items ?? []).map((m)=>({
                        url: m.asset ?? '',
                        thumbnail: m.thumbnail
                    })),
                initialIndex: gallery?.index ?? null,
                onOpenChange: (open)=>{
                    if (!open) setGallery(null);
                },
                animation: {
                    preset: 'fade',
                    duration: 1
                }
            }, void 0, false, {
                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                lineNumber: 772,
                columnNumber: 7
            }, this),
            gig?.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$creator$2f$create$2d$submission$2d$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CreateSubmissionSheet"], {
                open: submissionSheetOpen,
                onOpenChange: setSubmissionSheetOpen,
                gigId: gig.id,
                onSuccess: ()=>setActiveTab('submissions')
            }, void 0, false, {
                fileName: "[project]/components/campaigns/gig-details-sheet.tsx",
                lineNumber: 780,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s6(GigDetailsSheet, "IfQF/ZCoEpHp3R6qmN+gqHf9HR8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$role$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRole"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$gigs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApplyToGig"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$gigs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRespondToInvitation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$video$2d$submissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVideoSubmissionsByGig"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$gigs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreatorInvitations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$hooks$2f$creators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreatorApplications"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormatCurrency"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormatCurrency"]
    ];
});
_c6 = GigDetailsSheet;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "GigCoverImage");
__turbopack_context__.k.register(_c1, "GigSheetHeader");
__turbopack_context__.k.register(_c2, "GigDetailsTab");
__turbopack_context__.k.register(_c3, "GigCampaignTab");
__turbopack_context__.k.register(_c4, "GigSubmissionsTab");
__turbopack_context__.k.register(_c5, "GigFooter");
__turbopack_context__.k.register(_c6, "GigDetailsSheet");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_campaigns_11y2nfv._.js.map