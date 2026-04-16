(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/@tanstack/query-core/build/modern/queryObserver.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueryObserver",
    ()=>QueryObserver
]);
// src/queryObserver.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$focusManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/focusManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/notifyManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$query$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/query.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$subscribable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/subscribable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$thenable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/thenable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/timeoutManager.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
var QueryObserver = class extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$subscribable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Subscribable"] {
    constructor(client, options){
        super();
        this.options = options;
        this.#client = client;
        this.#selectError = null;
        this.#currentThenable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$thenable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pendingThenable"])();
        this.bindMethods();
        this.setOptions(options);
    }
    #client;
    #currentQuery = void 0;
    #currentQueryInitialState = void 0;
    #currentResult = void 0;
    #currentResultState;
    #currentResultOptions;
    #currentThenable;
    #selectError;
    #selectFn;
    #selectResult;
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    #lastQueryWithDefinedData;
    #staleTimeoutId;
    #refetchIntervalId;
    #currentRefetchInterval;
    #trackedProps = /* @__PURE__ */ new Set();
    bindMethods() {
        this.refetch = this.refetch.bind(this);
    }
    onSubscribe() {
        if (this.listeners.size === 1) {
            this.#currentQuery.addObserver(this);
            if (shouldFetchOnMount(this.#currentQuery, this.options)) {
                this.#executeFetch();
            } else {
                this.updateResult();
            }
            this.#updateTimers();
        }
    }
    onUnsubscribe() {
        if (!this.hasListeners()) {
            this.destroy();
        }
    }
    shouldFetchOnReconnect() {
        return shouldFetchOn(this.#currentQuery, this.options, this.options.refetchOnReconnect);
    }
    shouldFetchOnWindowFocus() {
        return shouldFetchOn(this.#currentQuery, this.options, this.options.refetchOnWindowFocus);
    }
    destroy() {
        this.listeners = /* @__PURE__ */ new Set();
        this.#clearStaleTimeout();
        this.#clearRefetchInterval();
        this.#currentQuery.removeObserver(this);
    }
    setOptions(options) {
        const prevOptions = this.options;
        const prevQuery = this.#currentQuery;
        this.options = this.#client.defaultQueryOptions(options);
        if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(this.options.enabled, this.#currentQuery) !== "boolean") {
            throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");
        }
        this.#updateQuery();
        this.#currentQuery.setOptions(this.options);
        if (prevOptions._defaulted && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shallowEqualObjects"])(this.options, prevOptions)) {
            this.#client.getQueryCache().notify({
                type: "observerOptionsUpdated",
                query: this.#currentQuery,
                observer: this
            });
        }
        const mounted = this.hasListeners();
        if (mounted && shouldFetchOptionally(this.#currentQuery, prevQuery, this.options, prevOptions)) {
            this.#executeFetch();
        }
        this.updateResult();
        if (mounted && (this.#currentQuery !== prevQuery || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(this.options.enabled, this.#currentQuery) !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(prevOptions.enabled, this.#currentQuery) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(this.options.staleTime, this.#currentQuery) !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(prevOptions.staleTime, this.#currentQuery))) {
            this.#updateStaleTimeout();
        }
        const nextRefetchInterval = this.#computeRefetchInterval();
        if (mounted && (this.#currentQuery !== prevQuery || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(this.options.enabled, this.#currentQuery) !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(prevOptions.enabled, this.#currentQuery) || nextRefetchInterval !== this.#currentRefetchInterval)) {
            this.#updateRefetchInterval(nextRefetchInterval);
        }
    }
    getOptimisticResult(options) {
        const query = this.#client.getQueryCache().build(this.#client, options);
        const result = this.createResult(query, options);
        if (shouldAssignObserverCurrentProperties(this, result)) {
            this.#currentResult = result;
            this.#currentResultOptions = this.options;
            this.#currentResultState = this.#currentQuery.state;
        }
        return result;
    }
    getCurrentResult() {
        return this.#currentResult;
    }
    trackResult(result, onPropTracked) {
        return new Proxy(result, {
            get: (target, key)=>{
                this.trackProp(key);
                onPropTracked?.(key);
                if (key === "promise") {
                    this.trackProp("data");
                    if (!this.options.experimental_prefetchInRender && this.#currentThenable.status === "pending") {
                        this.#currentThenable.reject(new Error("experimental_prefetchInRender feature flag is not enabled"));
                    }
                }
                return Reflect.get(target, key);
            }
        });
    }
    trackProp(key) {
        this.#trackedProps.add(key);
    }
    getCurrentQuery() {
        return this.#currentQuery;
    }
    refetch({ ...options } = {}) {
        return this.fetch({
            ...options
        });
    }
    fetchOptimistic(options) {
        const defaultedOptions = this.#client.defaultQueryOptions(options);
        const query = this.#client.getQueryCache().build(this.#client, defaultedOptions);
        return query.fetch().then(()=>this.createResult(query, defaultedOptions));
    }
    fetch(fetchOptions) {
        return this.#executeFetch({
            ...fetchOptions,
            cancelRefetch: fetchOptions.cancelRefetch ?? true
        }).then(()=>{
            this.updateResult();
            return this.#currentResult;
        });
    }
    #executeFetch(fetchOptions) {
        this.#updateQuery();
        let promise = this.#currentQuery.fetch(this.options, fetchOptions);
        if (!fetchOptions?.throwOnError) {
            promise = promise.catch(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"]);
        }
        return promise;
    }
    #updateStaleTimeout() {
        this.#clearStaleTimeout();
        const staleTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(this.options.staleTime, this.#currentQuery);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isServer"] || this.#currentResult.isStale || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidTimeout"])(staleTime)) {
            return;
        }
        const time = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeUntilStale"])(this.#currentResult.dataUpdatedAt, staleTime);
        const timeout = time + 1;
        this.#staleTimeoutId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeoutManager"].setTimeout(()=>{
            if (!this.#currentResult.isStale) {
                this.updateResult();
            }
        }, timeout);
    }
    #computeRefetchInterval() {
        return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(this.#currentQuery) : this.options.refetchInterval) ?? false;
    }
    #updateRefetchInterval(nextInterval) {
        this.#clearRefetchInterval();
        this.#currentRefetchInterval = nextInterval;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isServer"] || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(this.options.enabled, this.#currentQuery) === false || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidTimeout"])(this.#currentRefetchInterval) || this.#currentRefetchInterval === 0) {
            return;
        }
        this.#refetchIntervalId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeoutManager"].setInterval(()=>{
            if (this.options.refetchIntervalInBackground || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$focusManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["focusManager"].isFocused()) {
                this.#executeFetch();
            }
        }, this.#currentRefetchInterval);
    }
    #updateTimers() {
        this.#updateStaleTimeout();
        this.#updateRefetchInterval(this.#computeRefetchInterval());
    }
    #clearStaleTimeout() {
        if (this.#staleTimeoutId) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeoutManager"].clearTimeout(this.#staleTimeoutId);
            this.#staleTimeoutId = void 0;
        }
    }
    #clearRefetchInterval() {
        if (this.#refetchIntervalId) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$timeoutManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeoutManager"].clearInterval(this.#refetchIntervalId);
            this.#refetchIntervalId = void 0;
        }
    }
    createResult(query, options) {
        const prevQuery = this.#currentQuery;
        const prevOptions = this.options;
        const prevResult = this.#currentResult;
        const prevResultState = this.#currentResultState;
        const prevResultOptions = this.#currentResultOptions;
        const queryChange = query !== prevQuery;
        const queryInitialState = queryChange ? query.state : this.#currentQueryInitialState;
        const { state } = query;
        let newState = {
            ...state
        };
        let isPlaceholderData = false;
        let data;
        if (options._optimisticResults) {
            const mounted = this.hasListeners();
            const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
            const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
            if (fetchOnMount || fetchOptionally) {
                newState = {
                    ...newState,
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$query$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchState"])(state.data, query.options)
                };
            }
            if (options._optimisticResults === "isRestoring") {
                newState.fetchStatus = "idle";
            }
        }
        let { error, errorUpdatedAt, status } = newState;
        data = newState.data;
        let skipSelect = false;
        if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
            let placeholderData;
            if (prevResult?.isPlaceholderData && options.placeholderData === prevResultOptions?.placeholderData) {
                placeholderData = prevResult.data;
                skipSelect = true;
            } else {
                placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(this.#lastQueryWithDefinedData?.state.data, this.#lastQueryWithDefinedData) : options.placeholderData;
            }
            if (placeholderData !== void 0) {
                status = "success";
                data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replaceData"])(prevResult?.data, placeholderData, options);
                isPlaceholderData = true;
            }
        }
        if (options.select && data !== void 0 && !skipSelect) {
            if (prevResult && data === prevResultState?.data && options.select === this.#selectFn) {
                data = this.#selectResult;
            } else {
                try {
                    this.#selectFn = options.select;
                    data = options.select(data);
                    data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replaceData"])(prevResult?.data, data, options);
                    this.#selectResult = data;
                    this.#selectError = null;
                } catch (selectError) {
                    this.#selectError = selectError;
                }
            }
        }
        if (this.#selectError) {
            error = this.#selectError;
            data = this.#selectResult;
            errorUpdatedAt = Date.now();
            status = "error";
        }
        const isFetching = newState.fetchStatus === "fetching";
        const isPending = status === "pending";
        const isError = status === "error";
        const isLoading = isPending && isFetching;
        const hasData = data !== void 0;
        const result = {
            status,
            fetchStatus: newState.fetchStatus,
            isPending,
            isSuccess: status === "success",
            isError,
            isInitialLoading: isLoading,
            isLoading,
            data,
            dataUpdatedAt: newState.dataUpdatedAt,
            error,
            errorUpdatedAt,
            failureCount: newState.fetchFailureCount,
            failureReason: newState.fetchFailureReason,
            errorUpdateCount: newState.errorUpdateCount,
            isFetched: newState.dataUpdateCount > 0 || newState.errorUpdateCount > 0,
            isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
            isFetching,
            isRefetching: isFetching && !isPending,
            isLoadingError: isError && !hasData,
            isPaused: newState.fetchStatus === "paused",
            isPlaceholderData,
            isRefetchError: isError && hasData,
            isStale: isStale(query, options),
            refetch: this.refetch,
            promise: this.#currentThenable,
            isEnabled: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(options.enabled, query) !== false
        };
        const nextResult = result;
        if (this.options.experimental_prefetchInRender) {
            const finalizeThenableIfPossible = (thenable)=>{
                if (nextResult.status === "error") {
                    thenable.reject(nextResult.error);
                } else if (nextResult.data !== void 0) {
                    thenable.resolve(nextResult.data);
                }
            };
            const recreateThenable = ()=>{
                const pending = this.#currentThenable = nextResult.promise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$thenable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pendingThenable"])();
                finalizeThenableIfPossible(pending);
            };
            const prevThenable = this.#currentThenable;
            switch(prevThenable.status){
                case "pending":
                    if (query.queryHash === prevQuery.queryHash) {
                        finalizeThenableIfPossible(prevThenable);
                    }
                    break;
                case "fulfilled":
                    if (nextResult.status === "error" || nextResult.data !== prevThenable.value) {
                        recreateThenable();
                    }
                    break;
                case "rejected":
                    if (nextResult.status !== "error" || nextResult.error !== prevThenable.reason) {
                        recreateThenable();
                    }
                    break;
            }
        }
        return nextResult;
    }
    updateResult() {
        const prevResult = this.#currentResult;
        const nextResult = this.createResult(this.#currentQuery, this.options);
        this.#currentResultState = this.#currentQuery.state;
        this.#currentResultOptions = this.options;
        if (this.#currentResultState.data !== void 0) {
            this.#lastQueryWithDefinedData = this.#currentQuery;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shallowEqualObjects"])(nextResult, prevResult)) {
            return;
        }
        this.#currentResult = nextResult;
        const shouldNotifyListeners = ()=>{
            if (!prevResult) {
                return true;
            }
            const { notifyOnChangeProps } = this.options;
            const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
            if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !this.#trackedProps.size) {
                return true;
            }
            const includedProps = new Set(notifyOnChangePropsValue ?? this.#trackedProps);
            if (this.options.throwOnError) {
                includedProps.add("error");
            }
            return Object.keys(this.#currentResult).some((key)=>{
                const typedKey = key;
                const changed = this.#currentResult[typedKey] !== prevResult[typedKey];
                return changed && includedProps.has(typedKey);
            });
        };
        this.#notify({
            listeners: shouldNotifyListeners()
        });
    }
    #updateQuery() {
        const query = this.#client.getQueryCache().build(this.#client, this.options);
        if (query === this.#currentQuery) {
            return;
        }
        const prevQuery = this.#currentQuery;
        this.#currentQuery = query;
        this.#currentQueryInitialState = query.state;
        if (this.hasListeners()) {
            prevQuery?.removeObserver(this);
            query.addObserver(this);
        }
    }
    onQueryUpdate() {
        this.updateResult();
        if (this.hasListeners()) {
            this.#updateTimers();
        }
    }
    #notify(notifyOptions) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifyManager"].batch(()=>{
            if (notifyOptions.listeners) {
                this.listeners.forEach((listener)=>{
                    listener(this.#currentResult);
                });
            }
            this.#client.getQueryCache().notify({
                query: this.#currentQuery,
                type: "observerResultsUpdated"
            });
        });
    }
};
function shouldLoadOnMount(query, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
    return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(options.enabled, query) !== false && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(options.staleTime, query) !== "static") {
        const value = typeof field === "function" ? field(query) : field;
        return value === "always" || value !== false && isStale(query, options);
    }
    return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
    return (query !== prevQuery || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(options.enabled, query) !== false && query.isStaleByTime((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shallowEqualObjects"])(observer.getCurrentResult(), optimisticResult)) {
        return true;
    }
    return false;
}
;
}),
"[project]/node_modules/@tanstack/query-core/build/modern/mutationObserver.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MutationObserver",
    ()=>MutationObserver
]);
// src/mutationObserver.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$mutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/mutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/notifyManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$subscribable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/subscribable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/utils.js [app-client] (ecmascript)");
;
;
;
;
var MutationObserver = class extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$subscribable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Subscribable"] {
    #client;
    #currentResult = void 0;
    #currentMutation;
    #mutateOptions;
    constructor(client, options){
        super();
        this.#client = client;
        this.setOptions(options);
        this.bindMethods();
        this.#updateResult();
    }
    bindMethods() {
        this.mutate = this.mutate.bind(this);
        this.reset = this.reset.bind(this);
    }
    setOptions(options) {
        const prevOptions = this.options;
        this.options = this.#client.defaultMutationOptions(options);
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shallowEqualObjects"])(this.options, prevOptions)) {
            this.#client.getMutationCache().notify({
                type: "observerOptionsUpdated",
                mutation: this.#currentMutation,
                observer: this
            });
        }
        if (prevOptions?.mutationKey && this.options.mutationKey && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashKey"])(prevOptions.mutationKey) !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashKey"])(this.options.mutationKey)) {
            this.reset();
        } else if (this.#currentMutation?.state.status === "pending") {
            this.#currentMutation.setOptions(this.options);
        }
    }
    onUnsubscribe() {
        if (!this.hasListeners()) {
            this.#currentMutation?.removeObserver(this);
        }
    }
    onMutationUpdate(action) {
        this.#updateResult();
        this.#notify(action);
    }
    getCurrentResult() {
        return this.#currentResult;
    }
    reset() {
        this.#currentMutation?.removeObserver(this);
        this.#currentMutation = void 0;
        this.#updateResult();
        this.#notify();
    }
    mutate(variables, options) {
        this.#mutateOptions = options;
        this.#currentMutation?.removeObserver(this);
        this.#currentMutation = this.#client.getMutationCache().build(this.#client, this.options);
        this.#currentMutation.addObserver(this);
        return this.#currentMutation.execute(variables);
    }
    #updateResult() {
        const state = this.#currentMutation?.state ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$mutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultState"])();
        this.#currentResult = {
            ...state,
            isPending: state.status === "pending",
            isSuccess: state.status === "success",
            isError: state.status === "error",
            isIdle: state.status === "idle",
            mutate: this.mutate,
            reset: this.reset
        };
    }
    #notify(action) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifyManager"].batch(()=>{
            if (this.#mutateOptions && this.hasListeners()) {
                const variables = this.#currentResult.variables;
                const onMutateResult = this.#currentResult.context;
                const context = {
                    client: this.#client,
                    meta: this.options.meta,
                    mutationKey: this.options.mutationKey
                };
                if (action?.type === "success") {
                    this.#mutateOptions.onSuccess?.(action.data, variables, onMutateResult, context);
                    this.#mutateOptions.onSettled?.(action.data, null, variables, onMutateResult, context);
                } else if (action?.type === "error") {
                    this.#mutateOptions.onError?.(action.error, variables, onMutateResult, context);
                    this.#mutateOptions.onSettled?.(void 0, action.error, variables, onMutateResult, context);
                }
            }
            this.listeners.forEach((listener)=>{
                listener(this.#currentResult);
            });
        });
    }
};
;
}),
"[project]/node_modules/@tanstack/query-core/build/modern/queriesObserver.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueriesObserver",
    ()=>QueriesObserver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// src/queriesObserver.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/notifyManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queryObserver.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$subscribable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/subscribable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/utils.js [app-client] (ecmascript)");
;
;
;
;
function difference(array1, array2) {
    const excludeSet = new Set(array2);
    return array1.filter((x)=>!excludeSet.has(x));
}
function replaceAt(array, index, value) {
    const copy = array.slice(0);
    copy[index] = value;
    return copy;
}
var QueriesObserver = class extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$subscribable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Subscribable"] {
    #client;
    #result;
    #queries;
    #options;
    #observers;
    #combinedResult;
    #lastCombine;
    #lastResult;
    #observerMatches = [];
    constructor(client, queries, options){
        super();
        this.#client = client;
        this.#options = options;
        this.#queries = [];
        this.#observers = [];
        this.#result = [];
        this.setQueries(queries);
    }
    onSubscribe() {
        if (this.listeners.size === 1) {
            this.#observers.forEach((observer)=>{
                observer.subscribe((result)=>{
                    this.#onUpdate(observer, result);
                });
            });
        }
    }
    onUnsubscribe() {
        if (!this.listeners.size) {
            this.destroy();
        }
    }
    destroy() {
        this.listeners = /* @__PURE__ */ new Set();
        this.#observers.forEach((observer)=>{
            observer.destroy();
        });
    }
    setQueries(queries, options) {
        this.#queries = queries;
        this.#options = options;
        if ("TURBOPACK compile-time truthy", 1) {
            const queryHashes = queries.map((query)=>this.#client.defaultQueryOptions(query).queryHash);
            if (new Set(queryHashes).size !== queryHashes.length) {
                console.warn("[QueriesObserver]: Duplicate Queries found. This might result in unexpected behavior.");
            }
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifyManager"].batch(()=>{
            const prevObservers = this.#observers;
            const newObserverMatches = this.#findMatchingObservers(this.#queries);
            this.#observerMatches = newObserverMatches;
            newObserverMatches.forEach((match)=>match.observer.setOptions(match.defaultedQueryOptions));
            const newObservers = newObserverMatches.map((match)=>match.observer);
            const newResult = newObservers.map((observer)=>observer.getCurrentResult());
            const hasLengthChange = prevObservers.length !== newObservers.length;
            const hasIndexChange = newObservers.some((observer, index)=>observer !== prevObservers[index]);
            const hasStructuralChange = hasLengthChange || hasIndexChange;
            const hasResultChange = hasStructuralChange ? true : newResult.some((result, index)=>{
                const prev = this.#result[index];
                return !prev || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shallowEqualObjects"])(result, prev);
            });
            if (!hasStructuralChange && !hasResultChange) return;
            if (hasStructuralChange) {
                this.#observers = newObservers;
            }
            this.#result = newResult;
            if (!this.hasListeners()) return;
            if (hasStructuralChange) {
                difference(prevObservers, newObservers).forEach((observer)=>{
                    observer.destroy();
                });
                difference(newObservers, prevObservers).forEach((observer)=>{
                    observer.subscribe((result)=>{
                        this.#onUpdate(observer, result);
                    });
                });
            }
            this.#notify();
        });
    }
    getCurrentResult() {
        return this.#result;
    }
    getQueries() {
        return this.#observers.map((observer)=>observer.getCurrentQuery());
    }
    getObservers() {
        return this.#observers;
    }
    getOptimisticResult(queries, combine) {
        const matches = this.#findMatchingObservers(queries);
        const result = matches.map((match)=>match.observer.getOptimisticResult(match.defaultedQueryOptions));
        return [
            result,
            (r)=>{
                return this.#combineResult(r ?? result, combine);
            },
            ()=>{
                return this.#trackResult(result, matches);
            }
        ];
    }
    #trackResult(result, matches) {
        return matches.map((match, index)=>{
            const observerResult = result[index];
            return !match.defaultedQueryOptions.notifyOnChangeProps ? match.observer.trackResult(observerResult, (accessedProp)=>{
                matches.forEach((m)=>{
                    m.observer.trackProp(accessedProp);
                });
            }) : observerResult;
        });
    }
    #combineResult(input, combine) {
        if (combine) {
            if (!this.#combinedResult || this.#result !== this.#lastResult || combine !== this.#lastCombine) {
                this.#lastCombine = combine;
                this.#lastResult = this.#result;
                this.#combinedResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replaceEqualDeep"])(this.#combinedResult, combine(input));
            }
            return this.#combinedResult;
        }
        return input;
    }
    #findMatchingObservers(queries) {
        const prevObserversMap = /* @__PURE__ */ new Map();
        this.#observers.forEach((observer)=>{
            const key = observer.options.queryHash;
            if (!key) return;
            const previousObservers = prevObserversMap.get(key);
            if (previousObservers) {
                previousObservers.push(observer);
            } else {
                prevObserversMap.set(key, [
                    observer
                ]);
            }
        });
        const observers = [];
        queries.forEach((options)=>{
            const defaultedOptions = this.#client.defaultQueryOptions(options);
            const match = prevObserversMap.get(defaultedOptions.queryHash)?.shift();
            const observer = match ?? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryObserver"](this.#client, defaultedOptions);
            observers.push({
                defaultedQueryOptions: defaultedOptions,
                observer
            });
        });
        return observers;
    }
    #onUpdate(observer, result) {
        const index = this.#observers.indexOf(observer);
        if (index !== -1) {
            this.#result = replaceAt(this.#result, index, result);
            this.#notify();
        }
    }
    #notify() {
        if (this.hasListeners()) {
            const previousResult = this.#combinedResult;
            const newTracked = this.#trackResult(this.#result, this.#observerMatches);
            const newResult = this.#combineResult(newTracked, this.#options?.combine);
            if (previousResult !== newResult) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifyManager"].batch(()=>{
                    this.listeners.forEach((listener)=>{
                        listener(this.#result);
                    });
                });
            }
        }
    }
};
;
}),
"[project]/node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueryErrorResetBoundary",
    ()=>QueryErrorResetBoundary,
    "useQueryErrorResetBoundary",
    ()=>useQueryErrorResetBoundary
]);
// src/QueryErrorResetBoundary.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
"use client";
;
;
function createValue() {
    let isReset = false;
    return {
        clearReset: ()=>{
            isReset = false;
        },
        reset: ()=>{
            isReset = true;
        },
        isReset: ()=>{
            return isReset;
        }
    };
}
var QueryErrorResetBoundaryContext = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](createValue());
var useQueryErrorResetBoundary = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](QueryErrorResetBoundaryContext);
var QueryErrorResetBoundary = ({ children })=>{
    const [value] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "QueryErrorResetBoundary.useState": ()=>createValue()
    }["QueryErrorResetBoundary.useState"]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(QueryErrorResetBoundaryContext.Provider, {
        value,
        children: typeof children === "function" ? children(value) : children
    });
};
;
}),
"[project]/node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ensurePreventErrorBoundaryRetry",
    ()=>ensurePreventErrorBoundaryRetry,
    "getHasError",
    ()=>getHasError,
    "useClearResetErrorBoundary",
    ()=>useClearResetErrorBoundary
]);
// src/errorBoundaryUtils.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/utils.js [app-client] (ecmascript)");
"use client";
;
;
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary)=>{
    if (options.suspense || options.throwOnError || options.experimental_prefetchInRender) {
        if (!errorResetBoundary.isReset()) {
            options.retryOnMount = false;
        }
    }
};
var useClearResetErrorBoundary = (errorResetBoundary)=>{
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useClearResetErrorBoundary.useEffect": ()=>{
            errorResetBoundary.clearReset();
        }
    }["useClearResetErrorBoundary.useEffect"], [
        errorResetBoundary
    ]);
};
var getHasError = ({ result, errorResetBoundary, throwOnError, query, suspense })=>{
    return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldThrowError"])(throwOnError, [
        result.error,
        query
    ]));
};
;
}),
"[project]/node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IsRestoringProvider",
    ()=>IsRestoringProvider,
    "useIsRestoring",
    ()=>useIsRestoring
]);
// src/IsRestoringProvider.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
var IsRestoringContext = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](false);
var useIsRestoring = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](IsRestoringContext);
var IsRestoringProvider = IsRestoringContext.Provider;
;
}),
"[project]/node_modules/@tanstack/react-query/build/modern/suspense.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultThrowOnError",
    ()=>defaultThrowOnError,
    "ensureSuspenseTimers",
    ()=>ensureSuspenseTimers,
    "fetchOptimistic",
    ()=>fetchOptimistic,
    "shouldSuspend",
    ()=>shouldSuspend,
    "willFetch",
    ()=>willFetch
]);
// src/suspense.ts
var defaultThrowOnError = (_error, query)=>query.state.data === void 0;
var ensureSuspenseTimers = (defaultedOptions)=>{
    if (defaultedOptions.suspense) {
        const MIN_SUSPENSE_TIME_MS = 1e3;
        const clamp = (value)=>value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
        const originalStaleTime = defaultedOptions.staleTime;
        defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args)=>clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
        if (typeof defaultedOptions.gcTime === "number") {
            defaultedOptions.gcTime = Math.max(defaultedOptions.gcTime, MIN_SUSPENSE_TIME_MS);
        }
    }
};
var willFetch = (result, isRestoring)=>result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result)=>defaultedOptions?.suspense && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary)=>observer.fetchOptimistic(defaultedOptions).catch(()=>{
        errorResetBoundary.clearReset();
    });
;
}),
"[project]/node_modules/@tanstack/react-query/build/modern/useBaseQuery.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBaseQuery",
    ()=>useBaseQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// src/useBaseQuery.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/notifyManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryErrorResetBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$IsRestoringProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/suspense.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function useBaseQuery(options, Observer, queryClient) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (typeof options !== "object" || Array.isArray(options)) {
            throw new Error('Bad argument type. Starting with v5, only the "Object" form is allowed when calling query related functions. Please use the error stack to find the culprit call. More info here: https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5#supports-a-single-signature-one-object');
        }
    }
    const isRestoring = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$IsRestoringProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsRestoring"])();
    const errorResetBoundary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryErrorResetBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryErrorResetBoundary"])();
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])(queryClient);
    const defaultedOptions = client.defaultQueryOptions(options);
    client.getDefaultOptions().queries?._experimental_beforeQuery?.(defaultedOptions);
    if ("TURBOPACK compile-time truthy", 1) {
        if (!defaultedOptions.queryFn) {
            console.error(`[${defaultedOptions.queryHash}]: No queryFn was passed as an option, and no default queryFn was found. The queryFn parameter is only optional when using a default queryFn. More info here: https://tanstack.com/query/latest/docs/framework/react/guides/default-query-function`);
        }
    }
    defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensureSuspenseTimers"])(defaultedOptions);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensurePreventErrorBoundaryRetry"])(defaultedOptions, errorResetBoundary);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClearResetErrorBoundary"])(errorResetBoundary);
    const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
    const [observer] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "useBaseQuery.useState": ()=>new Observer(client, defaultedOptions)
    }["useBaseQuery.useState"]);
    const result = observer.getOptimisticResult(defaultedOptions);
    const shouldSubscribe = !isRestoring && options.subscribed !== false;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useBaseQuery.useSyncExternalStore.useCallback": (onStoreChange)=>{
            const unsubscribe = shouldSubscribe ? observer.subscribe(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifyManager"].batchCalls(onStoreChange)) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"];
            observer.updateResult();
            return unsubscribe;
        }
    }["useBaseQuery.useSyncExternalStore.useCallback"], [
        observer,
        shouldSubscribe
    ]), {
        "useBaseQuery.useSyncExternalStore": ()=>observer.getCurrentResult()
    }["useBaseQuery.useSyncExternalStore"], {
        "useBaseQuery.useSyncExternalStore": ()=>observer.getCurrentResult()
    }["useBaseQuery.useSyncExternalStore"]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useBaseQuery.useEffect": ()=>{
            observer.setOptions(defaultedOptions);
        }
    }["useBaseQuery.useEffect"], [
        defaultedOptions,
        observer
    ]);
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldSuspend"])(defaultedOptions, result)) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchOptimistic"])(defaultedOptions, observer, errorResetBoundary);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHasError"])({
        result,
        errorResetBoundary,
        throwOnError: defaultedOptions.throwOnError,
        query: client.getQueryCache().get(defaultedOptions.queryHash),
        suspense: defaultedOptions.suspense
    })) {
        throw result.error;
    }
    ;
    client.getDefaultOptions().queries?._experimental_afterQuery?.(defaultedOptions, result);
    if (defaultedOptions.experimental_prefetchInRender && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isServer"] && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["willFetch"])(result, isRestoring)) {
        const promise = isNewCacheEntry ? // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchOptimistic"])(defaultedOptions, observer, errorResetBoundary) : // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
        client.getQueryCache().get(defaultedOptions.queryHash)?.promise;
        promise?.catch(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"]).finally(()=>{
            observer.updateResult();
        });
    }
    return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
;
}),
"[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useQuery",
    ()=>useQuery
]);
// src/useQuery.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queryObserver.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useBaseQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useBaseQuery.js [app-client] (ecmascript)");
"use client";
;
;
function useQuery(options, queryClient) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useBaseQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseQuery"])(options, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryObserver"], queryClient);
}
;
}),
"[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMutation",
    ()=>useMutation
]);
// src/useMutation.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$mutationObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/mutationObserver.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/notifyManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
"use client";
;
;
;
function useMutation(options, queryClient) {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])(queryClient);
    const [observer] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "useMutation.useState": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$mutationObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MutationObserver"](client, options)
    }["useMutation.useState"]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useMutation.useEffect": ()=>{
            observer.setOptions(options);
        }
    }["useMutation.useEffect"], [
        observer,
        options
    ]);
    const result = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useMutation.useSyncExternalStore[result]": (onStoreChange)=>observer.subscribe(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifyManager"].batchCalls(onStoreChange))
    }["useMutation.useSyncExternalStore[result]"], [
        observer
    ]), {
        "useMutation.useSyncExternalStore[result]": ()=>observer.getCurrentResult()
    }["useMutation.useSyncExternalStore[result]"], {
        "useMutation.useSyncExternalStore[result]": ()=>observer.getCurrentResult()
    }["useMutation.useSyncExternalStore[result]"]);
    const mutate = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useMutation.useCallback[mutate]": (variables, mutateOptions)=>{
            observer.mutate(variables, mutateOptions).catch(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"]);
        }
    }["useMutation.useCallback[mutate]"], [
        observer
    ]);
    if (result.error && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldThrowError"])(observer.options.throwOnError, [
        result.error
    ])) {
        throw result.error;
    }
    return {
        ...result,
        mutate,
        mutateAsync: result.mutate
    };
}
;
}),
"[project]/node_modules/@tanstack/react-query/build/modern/useQueries.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useQueries",
    ()=>useQueries
]);
// src/useQueries.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queriesObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queriesObserver.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queryObserver.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/notifyManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$IsRestoringProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryErrorResetBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/suspense.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function useQueries({ queries, ...options }, queryClient) {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])(queryClient);
    const isRestoring = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$IsRestoringProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsRestoring"])();
    const errorResetBoundary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryErrorResetBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryErrorResetBoundary"])();
    const defaultedQueries = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useQueries.useMemo[defaultedQueries]": ()=>queries.map({
                "useQueries.useMemo[defaultedQueries]": (opts)=>{
                    const defaultedOptions = client.defaultQueryOptions(opts);
                    defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
                    return defaultedOptions;
                }
            }["useQueries.useMemo[defaultedQueries]"])
    }["useQueries.useMemo[defaultedQueries]"], [
        queries,
        client,
        isRestoring
    ]);
    defaultedQueries.forEach((query)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensureSuspenseTimers"])(query);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensurePreventErrorBoundaryRetry"])(query, errorResetBoundary);
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClearResetErrorBoundary"])(errorResetBoundary);
    const [observer] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "useQueries.useState": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queriesObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueriesObserver"](client, defaultedQueries, options)
    }["useQueries.useState"]);
    const [optimisticResult, getCombinedResult, trackResult] = observer.getOptimisticResult(defaultedQueries, options.combine);
    const shouldSubscribe = !isRestoring && options.subscribed !== false;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useQueries.useSyncExternalStore.useCallback": (onStoreChange)=>shouldSubscribe ? observer.subscribe(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifyManager"].batchCalls(onStoreChange)) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"]
    }["useQueries.useSyncExternalStore.useCallback"], [
        observer,
        shouldSubscribe
    ]), {
        "useQueries.useSyncExternalStore": ()=>observer.getCurrentResult()
    }["useQueries.useSyncExternalStore"], {
        "useQueries.useSyncExternalStore": ()=>observer.getCurrentResult()
    }["useQueries.useSyncExternalStore"]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useQueries.useEffect": ()=>{
            observer.setQueries(defaultedQueries, options);
        }
    }["useQueries.useEffect"], [
        defaultedQueries,
        options,
        observer
    ]);
    const shouldAtLeastOneSuspend = optimisticResult.some((result, index)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldSuspend"])(defaultedQueries[index], result));
    const suspensePromises = shouldAtLeastOneSuspend ? optimisticResult.flatMap((result, index)=>{
        const opts = defaultedQueries[index];
        if (opts) {
            const queryObserver = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryObserver"](client, opts);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldSuspend"])(opts, result)) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchOptimistic"])(opts, queryObserver, errorResetBoundary);
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["willFetch"])(result, isRestoring)) {
                void (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchOptimistic"])(opts, queryObserver, errorResetBoundary);
            }
        }
        return [];
    }) : [];
    if (suspensePromises.length > 0) {
        throw Promise.all(suspensePromises);
    }
    const firstSingleResultWhichShouldThrow = optimisticResult.find((result, index)=>{
        const query = defaultedQueries[index];
        return query && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHasError"])({
            result,
            errorResetBoundary,
            throwOnError: query.throwOnError,
            query: client.getQueryCache().get(query.queryHash),
            suspense: query.suspense
        });
    });
    if (firstSingleResultWhichShouldThrow?.error) {
        throw firstSingleResultWhichShouldThrow.error;
    }
    return getCombinedResult(trackResult());
}
;
}),
"[project]/node_modules/@tanstack/react-query/build/modern/useSuspenseQuery.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSuspenseQuery",
    ()=>useSuspenseQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// src/useSuspenseQuery.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queryObserver.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useBaseQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useBaseQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/suspense.js [app-client] (ecmascript)");
"use client";
;
;
;
function useSuspenseQuery(options, queryClient) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (options.queryFn === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["skipToken"]) {
            console.error("skipToken is not allowed for useSuspenseQuery");
        }
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useBaseQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseQuery"])({
        ...options,
        enabled: true,
        suspense: true,
        throwOnError: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultThrowOnError"],
        placeholderData: void 0
    }, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryObserver"], queryClient);
}
;
}),
"[project]/node_modules/@tanstack/store/dist/esm/alien.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReactiveFlags",
    ()=>ReactiveFlags,
    "createReactiveSystem",
    ()=>createReactiveSystem,
    "endBatch",
    ()=>endBatch,
    "getBatchDepth",
    ()=>getBatchDepth,
    "startBatch",
    ()=>startBatch
]);
var ReactiveFlags = /* @__PURE__ */ ((ReactiveFlags2)=>{
    ReactiveFlags2[ReactiveFlags2["None"] = 0] = "None";
    ReactiveFlags2[ReactiveFlags2["Mutable"] = 1] = "Mutable";
    ReactiveFlags2[ReactiveFlags2["Watching"] = 2] = "Watching";
    ReactiveFlags2[ReactiveFlags2["RecursedCheck"] = 4] = "RecursedCheck";
    ReactiveFlags2[ReactiveFlags2["Recursed"] = 8] = "Recursed";
    ReactiveFlags2[ReactiveFlags2["Dirty"] = 16] = "Dirty";
    ReactiveFlags2[ReactiveFlags2["Pending"] = 32] = "Pending";
    return ReactiveFlags2;
})(ReactiveFlags || {});
function createReactiveSystem({ update, notify, unwatched }) {
    return {
        link: link2,
        unlink: unlink2,
        propagate: propagate2,
        checkDirty: checkDirty2,
        shallowPropagate: shallowPropagate2
    };
    //TURBOPACK unreachable
    ;
    function link2(dep, sub, version) {
        const prevDep = sub.depsTail;
        if (prevDep !== void 0 && prevDep.dep === dep) {
            return;
        }
        const nextDep = prevDep !== void 0 ? prevDep.nextDep : sub.deps;
        if (nextDep !== void 0 && nextDep.dep === dep) {
            nextDep.version = version;
            sub.depsTail = nextDep;
            return;
        }
        const prevSub = dep.subsTail;
        if (prevSub !== void 0 && prevSub.version === version && prevSub.sub === sub) {
            return;
        }
        const newLink = sub.depsTail = dep.subsTail = {
            version,
            dep,
            sub,
            prevDep,
            nextDep,
            prevSub,
            nextSub: void 0
        };
        if (nextDep !== void 0) {
            nextDep.prevDep = newLink;
        }
        if (prevDep !== void 0) {
            prevDep.nextDep = newLink;
        } else {
            sub.deps = newLink;
        }
        if (prevSub !== void 0) {
            prevSub.nextSub = newLink;
        } else {
            dep.subs = newLink;
        }
    }
    function unlink2(link3, sub = link3.sub) {
        const dep = link3.dep;
        const prevDep = link3.prevDep;
        const nextDep = link3.nextDep;
        const nextSub = link3.nextSub;
        const prevSub = link3.prevSub;
        if (nextDep !== void 0) {
            nextDep.prevDep = prevDep;
        } else {
            sub.depsTail = prevDep;
        }
        if (prevDep !== void 0) {
            prevDep.nextDep = nextDep;
        } else {
            sub.deps = nextDep;
        }
        if (nextSub !== void 0) {
            nextSub.prevSub = prevSub;
        } else {
            dep.subsTail = prevSub;
        }
        if (prevSub !== void 0) {
            prevSub.nextSub = nextSub;
        } else if ((dep.subs = nextSub) === void 0) {
            unwatched(dep);
        }
        return nextDep;
    }
    function propagate2(link3) {
        let next = link3.nextSub;
        let stack;
        top: do {
            const sub = link3.sub;
            let flags = sub.flags;
            if (!(flags & (4 | 8 | 16 | 32))) {
                sub.flags = flags | 32;
            } else if (!(flags & (4 | 8))) {
                flags = 0;
            } else if (!(flags & 4)) {
                sub.flags = flags & -9 | 32;
            } else if (!(flags & (16 | 32)) && isValidLink(link3, sub)) {
                sub.flags = flags | (8 | 32);
                flags &= 1;
            } else {
                flags = 0;
            }
            if (flags & 2) {
                notify(sub);
            }
            if (flags & 1) {
                const subSubs = sub.subs;
                if (subSubs !== void 0) {
                    const nextSub = (link3 = subSubs).nextSub;
                    if (nextSub !== void 0) {
                        stack = {
                            value: next,
                            prev: stack
                        };
                        next = nextSub;
                    }
                    continue;
                }
            }
            if ((link3 = next) !== void 0) {
                next = link3.nextSub;
                continue;
            }
            while(stack !== void 0){
                link3 = stack.value;
                stack = stack.prev;
                if (link3 !== void 0) {
                    next = link3.nextSub;
                    continue top;
                }
            }
            break;
        }while (true)
    }
    function checkDirty2(link3, sub) {
        let stack;
        let checkDepth = 0;
        let dirty = false;
        top: do {
            const dep = link3.dep;
            const flags = dep.flags;
            if (sub.flags & 16) {
                dirty = true;
            } else if ((flags & (1 | 16)) === (1 | 16)) {
                if (update(dep)) {
                    const subs = dep.subs;
                    if (subs.nextSub !== void 0) {
                        shallowPropagate2(subs);
                    }
                    dirty = true;
                }
            } else if ((flags & (1 | 32)) === (1 | 32)) {
                if (link3.nextSub !== void 0 || link3.prevSub !== void 0) {
                    stack = {
                        value: link3,
                        prev: stack
                    };
                }
                link3 = dep.deps;
                sub = dep;
                ++checkDepth;
                continue;
            }
            if (!dirty) {
                const nextDep = link3.nextDep;
                if (nextDep !== void 0) {
                    link3 = nextDep;
                    continue;
                }
            }
            while(checkDepth--){
                const firstSub = sub.subs;
                const hasMultipleSubs = firstSub.nextSub !== void 0;
                if (hasMultipleSubs) {
                    link3 = stack.value;
                    stack = stack.prev;
                } else {
                    link3 = firstSub;
                }
                if (dirty) {
                    if (update(sub)) {
                        if (hasMultipleSubs) {
                            shallowPropagate2(firstSub);
                        }
                        sub = link3.sub;
                        continue;
                    }
                    dirty = false;
                } else {
                    sub.flags &= -33;
                }
                sub = link3.sub;
                const nextDep = link3.nextDep;
                if (nextDep !== void 0) {
                    link3 = nextDep;
                    continue top;
                }
            }
            return dirty;
        }while (true)
    }
    function shallowPropagate2(link3) {
        do {
            const sub = link3.sub;
            const flags = sub.flags;
            if ((flags & (32 | 16)) === 32) {
                sub.flags = flags | 16;
                if ((flags & (2 | 4)) === 2) {
                    notify(sub);
                }
            }
        }while ((link3 = link3.nextSub) !== void 0)
    }
    function isValidLink(checkLink, sub) {
        let link3 = sub.depsTail;
        while(link3 !== void 0){
            if (link3 === checkLink) {
                return true;
            }
            link3 = link3.prevDep;
        }
        return false;
    }
}
let batchDepth = 0;
let notifyIndex = 0;
let queuedLength = 0;
const queued = [];
const { link, unlink, propagate, checkDirty, shallowPropagate } = createReactiveSystem({
    update (node) {
        if (node.depsTail !== void 0) {
            return updateComputed(node);
        } else {
            return updateSignal(node);
        }
    },
    notify (effect2) {
        let insertIndex = queuedLength;
        let firstInsertedIndex = insertIndex;
        do {
            queued[insertIndex++] = effect2;
            effect2.flags &= -3;
            effect2 = effect2.subs?.sub;
            if (effect2 === void 0 || !(effect2.flags & 2)) {
                break;
            }
        }while (true)
        queuedLength = insertIndex;
        while(firstInsertedIndex < --insertIndex){
            const left = queued[firstInsertedIndex];
            queued[firstInsertedIndex++] = queued[insertIndex];
            queued[insertIndex] = left;
        }
    },
    unwatched (node) {
        if (!(node.flags & 1)) {
            effectScopeOper.call(node);
        } else if (node.depsTail !== void 0) {
            node.depsTail = void 0;
            node.flags = 1 | 16;
            purgeDeps(node);
        }
    }
});
function getBatchDepth() {
    return batchDepth;
}
function startBatch() {
    ++batchDepth;
}
function endBatch() {
    if (!--batchDepth) {
        flush();
    }
}
function updateComputed(c) {
    c.depsTail = void 0;
    c.flags = 1 | 4;
    try {
        const oldValue = c.value;
        return oldValue !== (c.value = c.getter(oldValue));
    } finally{
        c.flags &= -5;
        purgeDeps(c);
    }
}
function updateSignal(s) {
    s.flags = 1;
    return s.currentValue !== (s.currentValue = s.pendingValue);
}
function run(e) {
    const flags = e.flags;
    if (flags & 16 || flags & 32 && checkDirty(e.deps, e)) {
        e.depsTail = void 0;
        e.flags = 2 | 4;
        try {
            ;
            e.fn();
        } finally{
            e.flags &= -5;
            purgeDeps(e);
        }
    } else {
        e.flags = 2;
    }
}
function flush() {
    try {
        while(notifyIndex < queuedLength){
            const effect2 = queued[notifyIndex];
            queued[notifyIndex++] = void 0;
            run(effect2);
        }
    } finally{
        while(notifyIndex < queuedLength){
            const effect2 = queued[notifyIndex];
            queued[notifyIndex++] = void 0;
            effect2.flags |= 2 | 8;
        }
        notifyIndex = 0;
        queuedLength = 0;
    }
}
function effectScopeOper() {
    this.depsTail = void 0;
    this.flags = 0;
    purgeDeps(this);
    const sub = this.subs;
    if (sub !== void 0) {
        unlink(sub);
    }
}
function purgeDeps(sub) {
    const depsTail = sub.depsTail;
    let dep = depsTail !== void 0 ? depsTail.nextDep : sub.deps;
    while(dep !== void 0){
        dep = unlink(dep, sub);
    }
}
;
}),
"[project]/node_modules/@tanstack/store/dist/esm/atom.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAsyncAtom",
    ()=>createAsyncAtom,
    "createAtom",
    ()=>createAtom,
    "flush",
    ()=>flush,
    "toObserver",
    ()=>toObserver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/store/dist/esm/alien.js [app-client] (ecmascript)");
;
function toObserver(nextHandler, errorHandler, completionHandler) {
    const isObserver = typeof nextHandler === "object";
    const self = isObserver ? nextHandler : void 0;
    return {
        next: (isObserver ? nextHandler.next : nextHandler)?.bind(self),
        error: (isObserver ? nextHandler.error : errorHandler)?.bind(self),
        complete: (isObserver ? nextHandler.complete : completionHandler)?.bind(self)
    };
}
const queuedEffects = [];
let cycle = 0;
const { link, unlink, propagate, checkDirty, shallowPropagate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createReactiveSystem"])({
    update (atom) {
        return atom._update();
    },
    // eslint-disable-next-line no-shadow
    notify (effect2) {
        queuedEffects[queuedEffectsLength++] = effect2;
        effect2.flags &= ~__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveFlags"].Watching;
    },
    unwatched (atom) {
        if (atom.depsTail !== void 0) {
            atom.depsTail = void 0;
            atom.flags = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveFlags"].Mutable | __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveFlags"].Dirty;
            purgeDeps(atom);
        }
    }
});
let notifyIndex = 0;
let queuedEffectsLength = 0;
let activeSub;
function purgeDeps(sub) {
    const depsTail = sub.depsTail;
    let dep = depsTail !== void 0 ? depsTail.nextDep : sub.deps;
    while(dep !== void 0){
        dep = unlink(dep, sub);
    }
}
function flush() {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBatchDepth"])() > 0) {
        return;
    }
    while(notifyIndex < queuedEffectsLength){
        const effect2 = queuedEffects[notifyIndex];
        queuedEffects[notifyIndex++] = void 0;
        effect2.notify();
    }
    notifyIndex = 0;
    queuedEffectsLength = 0;
}
function createAsyncAtom(getValue, options) {
    const ref = {};
    const atom = createAtom(()=>{
        getValue().then((data)=>{
            const internalAtom = ref.current;
            if (internalAtom._update({
                status: "done",
                data
            })) {
                const subs = internalAtom.subs;
                if (subs !== void 0) {
                    propagate(subs);
                    shallowPropagate(subs);
                    flush();
                }
            }
        }, (error)=>{
            const internalAtom = ref.current;
            if (internalAtom._update({
                status: "error",
                error
            })) {
                const subs = internalAtom.subs;
                if (subs !== void 0) {
                    propagate(subs);
                    shallowPropagate(subs);
                    flush();
                }
            }
        });
        return {
            status: "pending"
        };
    }, options);
    ref.current = atom;
    return atom;
}
function createAtom(valueOrFn, options) {
    const isComputed = typeof valueOrFn === "function";
    const getter = valueOrFn;
    const atom = {
        _snapshot: isComputed ? void 0 : valueOrFn,
        subs: void 0,
        subsTail: void 0,
        deps: void 0,
        depsTail: void 0,
        flags: isComputed ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveFlags"].None : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveFlags"].Mutable,
        get () {
            if (activeSub !== void 0) {
                link(atom, activeSub, cycle);
            }
            return atom._snapshot;
        },
        subscribe (observerOrFn) {
            const obs = toObserver(observerOrFn);
            const observed = {
                current: false
            };
            const e = effect(()=>{
                atom.get();
                if (!observed.current) {
                    observed.current = true;
                } else {
                    obs.next?.(atom._snapshot);
                }
            });
            return {
                unsubscribe: ()=>{
                    e.stop();
                }
            };
        },
        _update (getValue) {
            const prevSub = activeSub;
            const compare = options?.compare ?? Object.is;
            if (isComputed) {
                activeSub = atom;
                ++cycle;
                atom.depsTail = void 0;
            } else if (getValue === void 0) {
                return false;
            }
            if (isComputed) {
                atom.flags = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveFlags"].Mutable | __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveFlags"].RecursedCheck;
            }
            try {
                const oldValue = atom._snapshot;
                const newValue = typeof getValue === "function" ? getValue(oldValue) : getValue === void 0 && isComputed ? getter(oldValue) : getValue;
                if (oldValue === void 0 || !compare(oldValue, newValue)) {
                    atom._snapshot = newValue;
                    return true;
                }
                return false;
            } finally{
                activeSub = prevSub;
                if (isComputed) {
                    atom.flags &= ~__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveFlags"].RecursedCheck;
                }
                purgeDeps(atom);
            }
        }
    };
    if (isComputed) {
        atom.flags = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveFlags"].Mutable | __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveFlags"].Dirty;
        atom.get = function() {
            const flags = atom.flags;
            if (flags & __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveFlags"].Dirty || flags & __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveFlags"].Pending && checkDirty(atom.deps, atom)) {
                if (atom._update()) {
                    const subs = atom.subs;
                    if (subs !== void 0) {
                        shallowPropagate(subs);
                    }
                }
            } else if (flags & __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveFlags"].Pending) {
                atom.flags = flags & ~__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveFlags"].Pending;
            }
            if (activeSub !== void 0) {
                link(atom, activeSub, cycle);
            }
            return atom._snapshot;
        };
    } else {
        atom.set = function(valueOrFn2) {
            if (atom._update(valueOrFn2)) {
                const subs = atom.subs;
                if (subs !== void 0) {
                    propagate(subs);
                    shallowPropagate(subs);
                    flush();
                }
            }
        };
    }
    return atom;
}
function effect(fn) {
    const run = ()=>{
        const prevSub = activeSub;
        activeSub = effectObj;
        ++cycle;
        effectObj.depsTail = void 0;
        effectObj.flags = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveFlags"].Watching | __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveFlags"].RecursedCheck;
        try {
            return fn();
        } finally{
            activeSub = prevSub;
            effectObj.flags &= ~__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveFlags"].RecursedCheck;
            purgeDeps(effectObj);
        }
    };
    const effectObj = {
        deps: void 0,
        depsTail: void 0,
        subs: void 0,
        subsTail: void 0,
        flags: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveFlags"].Watching | __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveFlags"].RecursedCheck,
        notify () {
            const flags = this.flags;
            if (flags & __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveFlags"].Dirty || flags & __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveFlags"].Pending && checkDirty(this.deps, this)) {
                run();
            } else {
                this.flags = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveFlags"].Watching;
            }
        },
        stop () {
            this.flags = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactiveFlags"].None;
            this.depsTail = void 0;
            purgeDeps(this);
        }
    };
    run();
    return effectObj;
}
;
}),
"[project]/node_modules/@tanstack/store/dist/esm/batch.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "batch",
    ()=>batch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/store/dist/esm/alien.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$atom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/store/dist/esm/atom.js [app-client] (ecmascript)");
;
;
function batch(fn) {
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startBatch"])();
        fn();
    } finally{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$alien$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endBatch"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$atom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flush"])();
    }
}
;
}),
"[project]/node_modules/@tanstack/store/dist/esm/store.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReadonlyStore",
    ()=>ReadonlyStore,
    "Store",
    ()=>Store,
    "createStore",
    ()=>createStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$atom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/store/dist/esm/atom.js [app-client] (ecmascript)");
;
class Store {
    constructor(valueOrFn){
        this.atom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$atom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAtom"])(valueOrFn);
    }
    setState(updater) {
        this.atom.set(updater);
    }
    get state() {
        return this.atom.get();
    }
    get() {
        return this.state;
    }
    subscribe(observerOrFn) {
        return this.atom.subscribe((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$atom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toObserver"])(observerOrFn));
    }
}
class ReadonlyStore {
    constructor(valueOrFn){
        this.atom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$atom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAtom"])(valueOrFn);
    }
    get state() {
        return this.atom.get();
    }
    get() {
        return this.state;
    }
    subscribe(observerOrFn) {
        return this.atom.subscribe((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$atom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toObserver"])(observerOrFn));
    }
}
function createStore(valueOrFn) {
    if (typeof valueOrFn === "function") {
        return new ReadonlyStore(valueOrFn);
    }
    return new Store(valueOrFn);
}
;
}),
"[project]/node_modules/@tanstack/pacer-lite/dist/lite-throttler.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LiteThrottler",
    ()=>LiteThrottler,
    "liteThrottle",
    ()=>liteThrottle
]);
//#region src/lite-throttler.ts
/**
* A lightweight class that creates a throttled function.
*
* This is an alternative to the Throttler in the core @tanstack/pacer package, but is more
* suitable for libraries and npm packages that need minimal overhead. Unlike the core Throttler,
* this version does not use TanStack Store for state management, has no devtools integration,
* and provides only essential throttling functionality.
*
* Throttling ensures a function is called at most once within a specified time window.
* Unlike debouncing which waits for a pause in calls, throttling guarantees consistent
* execution timing regardless of call frequency.
*
* Supports both leading and trailing edge execution:
* - Leading: Execute immediately on first call (default: true)
* - Trailing: Execute after wait period if called during throttle (default: true)
*
* Features:
* - Zero dependencies - no external libraries required
* - Minimal API surface - only essential methods (maybeExecute, flush, cancel)
* - Simple state management - uses basic private properties instead of reactive stores
* - Callback support for monitoring execution events
* - Lightweight - designed for use in npm packages where bundle size matters
*
* @example
* ```ts
* const throttler = new LiteThrottler((scrollY: number) => {
*   updateScrollPosition(scrollY);
* }, {
*   wait: 100,
*   onExecute: (args, throttler) => {
*     console.log('Updated scroll position:', args[0]);
*   }
* });
*
* // Will execute at most once per 100ms
* window.addEventListener('scroll', () => {
*   throttler.maybeExecute(window.scrollY);
* });
* ```
*/ var LiteThrottler = class {
    constructor(fn, options){
        this.fn = fn;
        this.options = options;
        this.lastExecutionTime = 0;
        this.isPending = false;
        this.maybeExecute = (...args)=>{
            const timeSinceLastExecution = Date.now() - this.lastExecutionTime;
            if (this.options.leading && timeSinceLastExecution >= this.options.wait) this.execute(...args);
            else {
                this.lastArgs = args;
                if (!this.timeoutId && this.options.trailing) {
                    const timeoutDuration = this.options.wait - timeSinceLastExecution;
                    this.isPending = true;
                    this.timeoutId = setTimeout(()=>{
                        if (this.lastArgs !== void 0) this.execute(...this.lastArgs);
                    }, timeoutDuration);
                }
            }
        };
        this.execute = (...args)=>{
            this.fn(...args);
            this.options.onExecute?.(args, this);
            this.lastExecutionTime = Date.now();
            this.clearTimeout();
            this.lastArgs = void 0;
            this.isPending = false;
        };
        this.flush = ()=>{
            if (this.isPending && this.lastArgs) this.execute(...this.lastArgs);
        };
        this.cancel = ()=>{
            this.clearTimeout();
            this.lastArgs = void 0;
            this.isPending = false;
        };
        this.clearTimeout = ()=>{
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
                this.timeoutId = void 0;
            }
        };
        if (this.options.leading === void 0 && this.options.trailing === void 0) {
            this.options.leading = true;
            this.options.trailing = true;
        }
    }
};
/**
* Creates a lightweight throttled function that limits how often the provided function can execute.
*
* This is an alternative to the throttle function in the core @tanstack/pacer package, but is more
* suitable for libraries and npm packages that need minimal overhead. Unlike the core version,
* this function creates a throttler with no external dependencies, devtools integration, or reactive state.
*
* Throttling ensures a function executes at most once within a specified time window,
* regardless of how many times it is called. This is useful for rate-limiting
* expensive operations or UI updates.
*
* @example
* ```ts
* const throttledScroll = liteThrottle(() => {
*   updateScrollIndicator();
* }, { wait: 100 });
*
* // Will execute at most once per 100ms
* window.addEventListener('scroll', throttledScroll);
* ```
*
* @example
* ```ts
* // Leading edge execution - fires immediately then throttles
* const throttledResize = liteThrottle(() => {
*   recalculateLayout();
* }, { wait: 250, leading: true, trailing: false });
* ```
*/ function liteThrottle(fn, options) {
    return new LiteThrottler(fn, options).maybeExecute;
}
;
}),
"[project]/node_modules/@tanstack/devtools-event-client/dist/esm/plugin.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EventClient",
    ()=>EventClient
]);
class EventClient {
    #enabled = true;
    #pluginId;
    #eventTarget;
    #debug;
    #queuedEvents;
    #connected;
    #connectIntervalId;
    #connectEveryMs;
    #retryCount = 0;
    #maxRetries = 5;
    #connecting = false;
    #failedToConnect = false;
    #internalEventTarget = null;
    #onConnected = ()=>{
        this.debugLog("Connected to event bus");
        this.#connected = true;
        this.#connecting = false;
        this.debugLog("Emitting queued events", this.#queuedEvents);
        this.#queuedEvents.forEach((event)=>this.emitEventToBus(event));
        this.#queuedEvents = [];
        this.stopConnectLoop();
        this.#eventTarget().removeEventListener("tanstack-connect-success", this.#onConnected);
    };
    // fired off right away and then at intervals
    #retryConnection = ()=>{
        if (this.#retryCount < this.#maxRetries) {
            this.#retryCount++;
            this.dispatchCustomEvent("tanstack-connect", {});
            return;
        }
        this.#eventTarget().removeEventListener("tanstack-connect", this.#retryConnection);
        this.#failedToConnect = true;
        this.debugLog("Max retries reached, giving up on connection");
        this.stopConnectLoop();
    };
    // This is run to register connection handlers on first emit attempt
    #connectFunction = ()=>{
        if (this.#connecting) return;
        this.#connecting = true;
        this.#eventTarget().addEventListener("tanstack-connect-success", this.#onConnected);
        this.#retryConnection();
    };
    constructor({ pluginId, debug = false, enabled = true, reconnectEveryMs = 300 }){
        this.#pluginId = pluginId;
        this.#enabled = enabled;
        this.#eventTarget = this.getGlobalTarget;
        this.#debug = debug;
        this.debugLog(" Initializing event subscription for plugin", this.#pluginId);
        this.#queuedEvents = [];
        this.#connected = false;
        this.#failedToConnect = false;
        this.#connectIntervalId = null;
        this.#connectEveryMs = reconnectEveryMs;
    }
    startConnectLoop() {
        if (this.#connectIntervalId !== null || this.#connected) return;
        this.debugLog(`Starting connect loop (every ${this.#connectEveryMs}ms)`);
        this.#connectIntervalId = setInterval(this.#retryConnection, this.#connectEveryMs);
    }
    stopConnectLoop() {
        this.#connecting = false;
        if (this.#connectIntervalId === null) {
            return;
        }
        clearInterval(this.#connectIntervalId);
        this.#connectIntervalId = null;
        this.#queuedEvents = [];
        this.debugLog("Stopped connect loop");
    }
    debugLog(...args) {
        if (this.#debug) {
            console.log(`🌴 [tanstack-devtools:${this.#pluginId}-plugin]`, ...args);
        }
    }
    getGlobalTarget() {
        if (typeof globalThis !== "undefined" && globalThis.__TANSTACK_EVENT_TARGET__) {
            this.debugLog("Using global event target");
            return globalThis.__TANSTACK_EVENT_TARGET__;
        }
        if (typeof window !== "undefined" && typeof window.addEventListener !== "undefined") {
            this.debugLog("Using window as event target");
            return window;
        }
        const eventTarget = typeof EventTarget !== "undefined" ? new EventTarget() : void 0;
        if (typeof eventTarget === "undefined" || typeof eventTarget.addEventListener === "undefined") {
            this.debugLog("No event mechanism available, running in non-web environment");
            return {
                addEventListener: ()=>{},
                removeEventListener: ()=>{},
                dispatchEvent: ()=>false
            };
        }
        this.debugLog("Using new EventTarget as fallback");
        return eventTarget;
    }
    getPluginId() {
        return this.#pluginId;
    }
    dispatchCustomEventShim(eventName, detail) {
        try {
            const event = new Event(eventName, {
                detail
            });
            this.#eventTarget().dispatchEvent(event);
        } catch (e) {
            this.debugLog("Failed to dispatch shim event");
        }
    }
    dispatchCustomEvent(eventName, detail) {
        try {
            this.#eventTarget().dispatchEvent(new CustomEvent(eventName, {
                detail
            }));
        } catch (e) {
            this.dispatchCustomEventShim(eventName, detail);
        }
    }
    emitEventToBus(event) {
        this.debugLog("Emitting event to client bus", event);
        this.dispatchCustomEvent("tanstack-dispatch-event", event);
    }
    createEventPayload(eventSuffix, payload) {
        return {
            type: `${this.#pluginId}:${eventSuffix}`,
            payload,
            pluginId: this.#pluginId
        };
    }
    emit(eventSuffix, payload) {
        if (!this.#enabled) {
            this.debugLog("Event bus client is disabled, not emitting event", eventSuffix, payload);
            return;
        }
        if (this.#internalEventTarget) {
            this.debugLog("Emitting event to internal event target", eventSuffix, payload);
            this.#internalEventTarget.dispatchEvent(new CustomEvent(`${this.#pluginId}:${eventSuffix}`, {
                detail: this.createEventPayload(eventSuffix, payload)
            }));
        }
        if (this.#failedToConnect) {
            this.debugLog("Previously failed to connect, not emitting to bus");
            return;
        }
        if (!this.#connected) {
            this.debugLog("Bus not available, will be pushed as soon as connected");
            this.#queuedEvents.push(this.createEventPayload(eventSuffix, payload));
            if (typeof CustomEvent !== "undefined" && !this.#connecting) {
                this.#connectFunction();
                this.startConnectLoop();
            }
            return;
        }
        return this.emitEventToBus(this.createEventPayload(eventSuffix, payload));
    }
    on(eventSuffix, cb, options) {
        const withEventTarget = options?.withEventTarget ?? false;
        const eventName = `${this.#pluginId}:${eventSuffix}`;
        if (withEventTarget) {
            if (!this.#internalEventTarget) {
                this.#internalEventTarget = new EventTarget();
            }
            this.#internalEventTarget.addEventListener(eventName, (e)=>{
                cb(e.detail);
            });
        }
        if (!this.#enabled) {
            this.debugLog("Event bus client is disabled, not registering event", eventName);
            return ()=>{};
        }
        const handler = (e)=>{
            this.debugLog("Received event from bus", e.detail);
            cb(e.detail);
        };
        this.#eventTarget().addEventListener(eventName, handler);
        this.debugLog("Registered event to bus", eventName);
        return ()=>{
            if (withEventTarget) {
                this.#internalEventTarget?.removeEventListener(eventName, handler);
            }
            this.#eventTarget().removeEventListener(eventName, handler);
        };
    }
    onAll(cb) {
        if (!this.#enabled) {
            this.debugLog("Event bus client is disabled, not registering event");
            return ()=>{};
        }
        const handler = (e)=>{
            const event = e.detail;
            cb(event);
        };
        this.#eventTarget().addEventListener("tanstack-devtools-global", handler);
        return ()=>this.#eventTarget().removeEventListener("tanstack-devtools-global", handler);
    }
    onAllPluginEvents(cb) {
        if (!this.#enabled) {
            this.debugLog("Event bus client is disabled, not registering event");
            return ()=>{};
        }
        const handler = (e)=>{
            const event = e.detail;
            if (this.#pluginId && event.pluginId !== this.#pluginId) {
                return;
            }
            cb(event);
        };
        this.#eventTarget().addEventListener("tanstack-devtools-global", handler);
        return ()=>this.#eventTarget().removeEventListener("tanstack-devtools-global", handler);
    }
}
;
}),
"[project]/node_modules/@tanstack/form-core/dist/esm/EventClient.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formEventClient",
    ()=>formEventClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$devtools$2d$event$2d$client$2f$dist$2f$esm$2f$plugin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/devtools-event-client/dist/esm/plugin.js [app-client] (ecmascript)");
;
class FormEventClient extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$devtools$2d$event$2d$client$2f$dist$2f$esm$2f$plugin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventClient"] {
    constructor(){
        super({
            pluginId: "form-devtools",
            reconnectEveryMs: 1e3
        });
    }
}
const formEventClient = new FormEventClient();
;
}),
"[project]/node_modules/@tanstack/form-core/dist/esm/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "concatenatePaths",
    ()=>concatenatePaths,
    "createFieldMap",
    ()=>createFieldMap,
    "deepCopy",
    ()=>deepCopy,
    "deleteBy",
    ()=>deleteBy,
    "determineFieldLevelErrorSourceAndValue",
    ()=>determineFieldLevelErrorSourceAndValue,
    "determineFormLevelErrorSourceAndValue",
    ()=>determineFormLevelErrorSourceAndValue,
    "evaluate",
    ()=>evaluate,
    "functionalUpdate",
    ()=>functionalUpdate,
    "getAsyncValidatorArray",
    ()=>getAsyncValidatorArray,
    "getBy",
    ()=>getBy,
    "getSyncValidatorArray",
    ()=>getSyncValidatorArray,
    "isGlobalFormValidationError",
    ()=>isGlobalFormValidationError,
    "isNonEmptyArray",
    ()=>isNonEmptyArray,
    "makePathArray",
    ()=>makePathArray,
    "mergeOpts",
    ()=>mergeOpts,
    "setBy",
    ()=>setBy,
    "throttleFormState",
    ()=>throttleFormState,
    "uuid",
    ()=>uuid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$pacer$2d$lite$2f$dist$2f$lite$2d$throttler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/pacer-lite/dist/lite-throttler.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$EventClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/form-core/dist/esm/EventClient.js [app-client] (ecmascript)");
;
;
function functionalUpdate(updater, input) {
    return typeof updater === "function" ? updater(input) : updater;
}
function getBy(obj, path) {
    const pathObj = makePathArray(path);
    return pathObj.reduce((current, pathPart)=>{
        if (current === null) return null;
        if (typeof current !== "undefined") {
            return current[pathPart];
        }
        return void 0;
    }, obj);
}
function setBy(obj, _path, updater) {
    const path = makePathArray(_path);
    function doSet(parent) {
        if (!path.length) {
            return functionalUpdate(updater, parent);
        }
        const key = path.shift();
        if (typeof key === "string" || typeof key === "number" && !Array.isArray(parent)) {
            if (typeof parent === "object") {
                if (parent === null) {
                    parent = {};
                }
                return {
                    ...parent,
                    [key]: doSet(parent[key])
                };
            }
            return {
                [key]: doSet()
            };
        }
        if (Array.isArray(parent) && typeof key === "number") {
            const prefix = parent.slice(0, key);
            return [
                ...prefix.length ? prefix : new Array(key),
                doSet(parent[key]),
                ...parent.slice(key + 1)
            ];
        }
        return [
            ...new Array(key),
            doSet()
        ];
    }
    return doSet(obj);
}
function deleteBy(obj, _path) {
    const path = makePathArray(_path);
    function doDelete(parent) {
        if (!parent) return;
        if (path.length === 1) {
            const finalPath = path[0];
            if (Array.isArray(parent) && typeof finalPath === "number") {
                return parent.filter((_, i)=>i !== finalPath);
            }
            const { [finalPath]: remove, ...rest } = parent;
            return rest;
        }
        const key = path.shift();
        if (typeof key === "string" || typeof key === "number" && !Array.isArray(parent)) {
            if (typeof parent === "object") {
                return {
                    ...parent,
                    [key]: doDelete(parent[key])
                };
            }
        }
        if (typeof key === "number") {
            if (Array.isArray(parent)) {
                if (key >= parent.length) {
                    return parent;
                }
                const prefix = parent.slice(0, key);
                return [
                    ...prefix.length ? prefix : new Array(key),
                    doDelete(parent[key]),
                    ...parent.slice(key + 1)
                ];
            }
        }
        throw new Error("It seems we have created an infinite loop in deleteBy. ");
    }
    return doDelete(obj);
}
const reLineOfOnlyDigits = /^(\d+)$/gm;
const reDigitsBetweenDots = /\.(\d+)(?=\.)/gm;
const reStartWithDigitThenDot = /^(\d+)\./gm;
const reDotWithDigitsToEnd = /\.(\d+$)/gm;
const reMultipleDots = /\.{2,}/gm;
const intPrefix = "__int__";
const intReplace = `${intPrefix}$1`;
function makePathArray(str) {
    if (Array.isArray(str)) {
        return [
            ...str
        ];
    }
    if (typeof str !== "string") {
        throw new Error("Path must be a string.");
    }
    return str.replace(/(^\[)|]/gm, "").replace(/\[/g, ".").replace(reLineOfOnlyDigits, intReplace).replace(reDigitsBetweenDots, `.${intReplace}.`).replace(reStartWithDigitThenDot, `${intReplace}.`).replace(reDotWithDigitsToEnd, `.${intReplace}`).replace(reMultipleDots, ".").split(".").map((d)=>{
        if (d.startsWith(intPrefix)) {
            const numStr = d.substring(intPrefix.length);
            const num = parseInt(numStr, 10);
            if (String(num) === numStr) {
                return num;
            }
            return numStr;
        }
        return d;
    });
}
function concatenatePaths(path1, path2) {
    if (path1.length === 0) return path2;
    if (path2.length === 0) return path1;
    if (path2.startsWith("[")) {
        return path1 + path2;
    }
    if (path2.startsWith(".")) {
        return path1 + path2;
    }
    return `${path1}.${path2}`;
}
function isNonEmptyArray(obj) {
    return !(Array.isArray(obj) && obj.length === 0);
}
function getSyncValidatorArray(cause, options) {
    const runValidation = (props)=>{
        return props.validators.filter(Boolean).map((validator)=>{
            return {
                cause: validator.cause,
                validate: validator.fn
            };
        });
    };
    return options.validationLogic({
        form: options.form,
        validators: options.validators,
        event: {
            type: cause,
            async: false
        },
        runValidation
    });
}
function getAsyncValidatorArray(cause, options) {
    const { asyncDebounceMs } = options;
    const { onBlurAsyncDebounceMs, onChangeAsyncDebounceMs, onDynamicAsyncDebounceMs } = options.validators || {};
    const defaultDebounceMs = asyncDebounceMs ?? 0;
    const runValidation = (props)=>{
        return props.validators.filter(Boolean).map((validator)=>{
            const validatorCause = validator?.cause || cause;
            let debounceMs = defaultDebounceMs;
            switch(validatorCause){
                case "change":
                    debounceMs = onChangeAsyncDebounceMs ?? defaultDebounceMs;
                    break;
                case "blur":
                    debounceMs = onBlurAsyncDebounceMs ?? defaultDebounceMs;
                    break;
                case "dynamic":
                    debounceMs = onDynamicAsyncDebounceMs ?? defaultDebounceMs;
                    break;
                case "submit":
                    debounceMs = 0;
                    break;
            }
            if (cause === "submit") {
                debounceMs = 0;
            }
            return {
                cause: validatorCause,
                validate: validator.fn,
                debounceMs
            };
        });
    };
    return options.validationLogic({
        form: options.form,
        validators: options.validators,
        event: {
            type: cause,
            async: true
        },
        runValidation
    });
}
const isGlobalFormValidationError = (error)=>{
    return !!error && typeof error === "object" && "fields" in error;
};
function evaluate(objA, objB) {
    if (Object.is(objA, objB)) {
        return true;
    }
    if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
        return false;
    }
    if (objA instanceof Date && objB instanceof Date) {
        return objA.getTime() === objB.getTime();
    }
    if (objA instanceof Map && objB instanceof Map) {
        if (objA.size !== objB.size) return false;
        for (const [k, v] of objA){
            if (!objB.has(k) || !Object.is(v, objB.get(k))) return false;
        }
        return true;
    }
    if (objA instanceof Set && objB instanceof Set) {
        if (objA.size !== objB.size) return false;
        for (const v of objA){
            if (!objB.has(v)) return false;
        }
        return true;
    }
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) {
        return false;
    }
    for (const key of keysA){
        if (!keysB.includes(key) || !evaluate(objA[key], objB[key])) {
            return false;
        }
    }
    return true;
}
const determineFormLevelErrorSourceAndValue = ({ newFormValidatorError, isPreviousErrorFromFormValidator, previousErrorValue })=>{
    if (newFormValidatorError) {
        return {
            newErrorValue: newFormValidatorError,
            newSource: "form"
        };
    }
    if (isPreviousErrorFromFormValidator) {
        return {
            newErrorValue: void 0,
            newSource: void 0
        };
    }
    if (previousErrorValue) {
        return {
            newErrorValue: previousErrorValue,
            newSource: "field"
        };
    }
    return {
        newErrorValue: void 0,
        newSource: void 0
    };
};
const determineFieldLevelErrorSourceAndValue = ({ formLevelError, fieldLevelError })=>{
    if (fieldLevelError) {
        return {
            newErrorValue: fieldLevelError,
            newSource: "field"
        };
    }
    if (formLevelError) {
        return {
            newErrorValue: formLevelError,
            newSource: "form"
        };
    }
    return {
        newErrorValue: void 0,
        newSource: void 0
    };
};
function createFieldMap(values) {
    const output = {};
    for(const key in values){
        output[key] = key;
    }
    return output;
}
function mergeOpts(originalOpts, overrides) {
    if (originalOpts === void 0 || originalOpts === null) {
        return overrides;
    }
    return {
        ...originalOpts,
        ...overrides
    };
}
let IDX = 256;
const HEX = [];
let BUFFER;
while(IDX--){
    HEX[IDX] = (IDX + 256).toString(16).substring(1);
}
function uuid() {
    let i = 0;
    let num;
    let out = "";
    if (!BUFFER || IDX + 16 > 256) {
        BUFFER = new Array(256);
        i = 256;
        while(i--){
            BUFFER[i] = 256 * Math.random() | 0;
        }
        i = 0;
        IDX = 0;
    }
    for(; i < 16; i++){
        num = BUFFER[IDX + i];
        if (i === 6) out += HEX[num & 15 | 64];
        else if (i === 8) out += HEX[num & 63 | 128];
        else out += HEX[num];
        if (i & 1 && i > 1 && i < 11) out += "-";
    }
    IDX++;
    return out;
}
const throttleFormState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$pacer$2d$lite$2f$dist$2f$lite$2d$throttler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["liteThrottle"])((form)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$EventClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formEventClient"].emit("form-state", {
        id: form.formId,
        state: form.store.state
    }), {
    wait: 300
});
function deepCopy(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    if (Array.isArray(obj)) {
        const arrCopy = [];
        for(let i = 0; i < obj.length; i++){
            arrCopy[i] = deepCopy(obj[i]);
        }
        return arrCopy;
    }
    if (obj instanceof Map) {
        const mapCopy = /* @__PURE__ */ new Map();
        obj.forEach((value, key)=>{
            mapCopy.set(key, deepCopy(value));
        });
        return mapCopy;
    }
    if (obj instanceof Set) {
        const setCopy = /* @__PURE__ */ new Set();
        obj.forEach((value)=>{
            setCopy.add(deepCopy(value));
        });
        return setCopy;
    }
    const copy = {};
    for(const key in obj){
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            copy[key] = deepCopy(obj[key]);
        }
    }
    return copy;
}
;
}),
"[project]/node_modules/@tanstack/form-core/dist/esm/ValidationLogic.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultValidationLogic",
    ()=>defaultValidationLogic,
    "revalidateLogic",
    ()=>revalidateLogic
]);
const revalidateLogic = ({ mode = "submit", modeAfterSubmission = "change" } = {})=>(props)=>{
        const validatorNames = Object.keys(props.validators ?? {});
        if (validatorNames.length === 0) {
            return props.runValidation({
                validators: [],
                form: props.form
            });
        }
        const dynamicValidator = {
            fn: props.event.async ? props.validators["onDynamicAsync"] : props.validators["onDynamic"],
            cause: "dynamic"
        };
        const validatorsToAdd = [];
        const modeToWatch = props.form.state.submissionAttempts === 0 ? mode : modeAfterSubmission;
        if ([
            modeToWatch,
            "submit"
        ].includes(props.event.type)) {
            validatorsToAdd.push(dynamicValidator);
        }
        let defaultValidators = [];
        defaultValidationLogic({
            ...props,
            runValidation: (vProps)=>{
                defaultValidators = vProps.validators;
            }
        });
        if (validatorsToAdd.length === 0) {
            return props.runValidation({
                validators: defaultValidators,
                form: props.form
            });
        }
        return props.runValidation({
            validators: [
                ...defaultValidators,
                ...validatorsToAdd
            ],
            form: props.form
        });
    };
const defaultValidationLogic = (props)=>{
    if (!props.validators) {
        return props.runValidation({
            validators: [],
            form: props.form
        });
    }
    const isAsync = props.event.async;
    const onMountValidator = isAsync ? void 0 : {
        fn: props.validators.onMount,
        cause: "mount"
    };
    const onChangeValidator = {
        fn: isAsync ? props.validators.onChangeAsync : props.validators.onChange,
        cause: "change"
    };
    const onBlurValidator = {
        fn: isAsync ? props.validators.onBlurAsync : props.validators.onBlur,
        cause: "blur"
    };
    const onSubmitValidator = {
        fn: isAsync ? props.validators.onSubmitAsync : props.validators.onSubmit,
        cause: "submit"
    };
    const onServerValidator = isAsync ? void 0 : {
        fn: ()=>void 0,
        cause: "server"
    };
    switch(props.event.type){
        case "mount":
            {
                return props.runValidation({
                    validators: [
                        onMountValidator
                    ],
                    form: props.form
                });
            }
        case "submit":
            {
                return props.runValidation({
                    validators: [
                        onChangeValidator,
                        onBlurValidator,
                        onSubmitValidator,
                        onServerValidator
                    ],
                    form: props.form
                });
            }
        case "server":
            {
                return props.runValidation({
                    validators: [],
                    form: props.form
                });
            }
        case "blur":
            {
                return props.runValidation({
                    validators: [
                        onBlurValidator,
                        onServerValidator
                    ],
                    form: props.form
                });
            }
        case "change":
            {
                return props.runValidation({
                    validators: [
                        onChangeValidator,
                        onServerValidator
                    ],
                    form: props.form
                });
            }
        default:
            {
                throw new Error(`Unknown validation event type: ${props.event.type}`);
            }
    }
};
;
}),
"[project]/node_modules/@tanstack/form-core/dist/esm/standardSchemaValidator.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isStandardSchemaValidator",
    ()=>isStandardSchemaValidator,
    "standardSchemaValidators",
    ()=>standardSchemaValidators
]);
function prefixSchemaToErrors(issues, formValue) {
    const schema = /* @__PURE__ */ new Map();
    for (const issue of issues){
        const issuePath = issue.path ?? [];
        let currentFormValue = formValue;
        let path = "";
        for(let i = 0; i < issuePath.length; i++){
            const pathSegment = issuePath[i];
            if (pathSegment === void 0) continue;
            const segment = typeof pathSegment === "object" ? pathSegment.key : pathSegment;
            const segmentAsNumber = Number(segment);
            if (Array.isArray(currentFormValue) && !Number.isNaN(segmentAsNumber)) {
                path += `[${segmentAsNumber}]`;
            } else {
                path += (i > 0 ? "." : "") + String(segment);
            }
            if (typeof currentFormValue === "object" && currentFormValue !== null) {
                currentFormValue = currentFormValue[segment];
            } else {
                currentFormValue = void 0;
            }
        }
        schema.set(path, (schema.get(path) ?? []).concat(issue));
    }
    return Object.fromEntries(schema);
}
const transformFormIssues = (issues, formValue)=>{
    const schemaErrors = prefixSchemaToErrors(issues, formValue);
    return {
        form: schemaErrors,
        fields: schemaErrors
    };
};
const standardSchemaValidators = {
    validate ({ value, validationSource }, schema) {
        const result = schema["~standard"].validate(value);
        if (result instanceof Promise) {
            throw new Error("async function passed to sync validator");
        }
        if (!result.issues) return;
        if (validationSource === "field") return result.issues;
        return transformFormIssues(result.issues, value);
    },
    async validateAsync ({ value, validationSource }, schema) {
        const result = await schema["~standard"].validate(value);
        if (!result.issues) return;
        if (validationSource === "field") return result.issues;
        return transformFormIssues(result.issues, value);
    }
};
const isStandardSchemaValidator = (validator)=>!!validator && "~standard" in validator;
;
}),
"[project]/node_modules/@tanstack/form-core/dist/esm/metaHelper.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultFieldMeta",
    ()=>defaultFieldMeta,
    "metaHelper",
    ()=>metaHelper
]);
const defaultFieldMeta = {
    isValidating: false,
    isTouched: false,
    isBlurred: false,
    isDirty: false,
    isPristine: true,
    isValid: true,
    isDefaultValue: true,
    errors: [],
    errorMap: {},
    errorSourceMap: {}
};
function metaHelper(formApi) {
    function handleArrayMove(field, fromIndex, toIndex) {
        const affectedFields = getAffectedFields(field, fromIndex, "move", toIndex);
        const startIndex = Math.min(fromIndex, toIndex);
        const endIndex = Math.max(fromIndex, toIndex);
        for(let i = startIndex; i <= endIndex; i++){
            affectedFields.push(getFieldPath(field, i));
        }
        const fromFields = Object.keys(formApi.fieldInfo).reduce((fieldMap, fieldKey)=>{
            if (fieldKey.startsWith(getFieldPath(field, fromIndex))) {
                fieldMap.set(fieldKey, formApi.getFieldMeta(fieldKey));
            }
            return fieldMap;
        }, /* @__PURE__ */ new Map());
        shiftMeta(affectedFields, fromIndex < toIndex ? "up" : "down");
        Object.keys(formApi.fieldInfo).filter((fieldKey)=>fieldKey.startsWith(getFieldPath(field, toIndex))).forEach((fieldKey)=>{
            const fromKey = fieldKey.replace(getFieldPath(field, toIndex), getFieldPath(field, fromIndex));
            const fromMeta = fromFields.get(fromKey);
            if (fromMeta) {
                formApi.setFieldMeta(fieldKey, fromMeta);
            }
        });
    }
    function handleArrayRemove(field, index) {
        const affectedFields = getAffectedFields(field, index, "remove");
        shiftMeta(affectedFields, "up");
    }
    function handleArraySwap(field, index, secondIndex) {
        const affectedFields = getAffectedFields(field, index, "swap", secondIndex);
        affectedFields.forEach((fieldKey)=>{
            if (!fieldKey.toString().startsWith(getFieldPath(field, index))) {
                return;
            }
            const swappedKey = fieldKey.toString().replace(getFieldPath(field, index), getFieldPath(field, secondIndex));
            const [meta1, meta2] = [
                formApi.getFieldMeta(fieldKey),
                formApi.getFieldMeta(swappedKey)
            ];
            if (meta1) formApi.setFieldMeta(swappedKey, meta1);
            if (meta2) formApi.setFieldMeta(fieldKey, meta2);
        });
    }
    function handleArrayInsert(field, insertIndex) {
        const affectedFields = getAffectedFields(field, insertIndex, "insert");
        shiftMeta(affectedFields, "down");
        affectedFields.forEach((fieldKey)=>{
            if (fieldKey.toString().startsWith(getFieldPath(field, insertIndex))) {
                formApi.setFieldMeta(fieldKey, getEmptyFieldMeta());
            }
        });
    }
    function getFieldPath(field, index) {
        return `${field}[${index}]`;
    }
    function getAffectedFields(field, index, mode, secondIndex) {
        const affectedFieldKeys = [
            getFieldPath(field, index)
        ];
        switch(mode){
            case "swap":
                affectedFieldKeys.push(getFieldPath(field, secondIndex));
                break;
            case "move":
                {
                    const [startIndex, endIndex] = [
                        Math.min(index, secondIndex),
                        Math.max(index, secondIndex)
                    ];
                    for(let i = startIndex; i <= endIndex; i++){
                        affectedFieldKeys.push(getFieldPath(field, i));
                    }
                    break;
                }
            default:
                {
                    const currentValue = formApi.getFieldValue(field);
                    const fieldItems = Array.isArray(currentValue) ? currentValue.length : 0;
                    for(let i = index + 1; i < fieldItems; i++){
                        affectedFieldKeys.push(getFieldPath(field, i));
                    }
                    break;
                }
        }
        return Object.keys(formApi.fieldInfo).filter((fieldKey)=>affectedFieldKeys.some((key)=>fieldKey.startsWith(key)));
    }
    function updateIndex(fieldKey, direction) {
        return fieldKey.replace(/\[(\d+)\]/, (_, num)=>{
            const currIndex = parseInt(num, 10);
            const newIndex = direction === "up" ? currIndex + 1 : Math.max(0, currIndex - 1);
            return `[${newIndex}]`;
        });
    }
    function shiftMeta(fields, direction) {
        const sortedFields = direction === "up" ? fields : [
            ...fields
        ].reverse();
        sortedFields.forEach((fieldKey)=>{
            const nextFieldKey = updateIndex(fieldKey.toString(), direction);
            const nextFieldMeta = formApi.getFieldMeta(nextFieldKey);
            if (nextFieldMeta) {
                formApi.setFieldMeta(fieldKey, nextFieldMeta);
            } else {
                formApi.setFieldMeta(fieldKey, getEmptyFieldMeta());
            }
        });
    }
    const getEmptyFieldMeta = ()=>defaultFieldMeta;
    return {
        handleArrayMove,
        handleArrayRemove,
        handleArraySwap,
        handleArrayInsert
    };
}
;
}),
"[project]/node_modules/@tanstack/form-core/dist/esm/FormApi.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FormApi",
    ()=>FormApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$batch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/store/dist/esm/batch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/store/dist/esm/store.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/form-core/dist/esm/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$ValidationLogic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/form-core/dist/esm/ValidationLogic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$standardSchemaValidator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/form-core/dist/esm/standardSchemaValidator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$metaHelper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/form-core/dist/esm/metaHelper.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$EventClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/form-core/dist/esm/EventClient.js [app-client] (ecmascript)");
;
;
;
;
;
;
function getDefaultFormState(defaultState) {
    return {
        values: defaultState.values ?? {},
        errorMap: defaultState.errorMap ?? {},
        fieldMetaBase: defaultState.fieldMetaBase ?? {},
        isSubmitted: defaultState.isSubmitted ?? false,
        isSubmitting: defaultState.isSubmitting ?? false,
        isValidating: defaultState.isValidating ?? false,
        submissionAttempts: defaultState.submissionAttempts ?? 0,
        isSubmitSuccessful: defaultState.isSubmitSuccessful ?? false,
        validationMetaMap: defaultState.validationMetaMap ?? {
            onChange: void 0,
            onBlur: void 0,
            onSubmit: void 0,
            onMount: void 0,
            onServer: void 0,
            onDynamic: void 0
        }
    };
}
class FormApi {
    /**
   * Constructs a new `FormApi` instance with the given form options.
   */ constructor(opts){
        this.options = {};
        this.fieldInfo = {};
        this.mount = ()=>{
            const cleanupDevtoolBroadcast = this.store.subscribe(()=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["throttleFormState"])(this);
            });
            const cleanupFormStateListener = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$EventClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formEventClient"].on("request-form-state", (e)=>{
                if (e.payload.id === this._formId) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$EventClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formEventClient"].emit("form-api", {
                        id: this._formId,
                        state: this.store.state,
                        options: this.options
                    });
                }
            });
            const cleanupFormResetListener = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$EventClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formEventClient"].on("request-form-reset", (e)=>{
                if (e.payload.id === this._formId) {
                    this.reset();
                }
            });
            const cleanupFormForceSubmitListener = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$EventClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formEventClient"].on("request-form-force-submit", (e)=>{
                if (e.payload.id === this._formId) {
                    this._devtoolsSubmissionOverride = true;
                    this.handleSubmit();
                    this._devtoolsSubmissionOverride = false;
                }
            });
            const cleanup = ()=>{
                cleanupFormForceSubmitListener();
                cleanupFormResetListener();
                cleanupFormStateListener();
                cleanupDevtoolBroadcast.unsubscribe();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$EventClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formEventClient"].emit("form-unmounted", {
                    id: this._formId
                });
            };
            this.options.listeners?.onMount?.({
                formApi: this
            });
            const { onMount } = this.options.validators || {};
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$EventClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formEventClient"].emit("form-api", {
                id: this._formId,
                state: this.store.state,
                options: this.options
            });
            if (!onMount) return cleanup;
            this.validateSync("mount");
            return cleanup;
        };
        this.update = (options)=>{
            if (!options) return;
            const oldOptions = this.options;
            this.options = options;
            const shouldUpdateValues = options.defaultValues && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluate"])(options.defaultValues, oldOptions.defaultValues) && !this.state.isTouched;
            const shouldUpdateState = !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluate"])(options.defaultState, oldOptions.defaultState) && !this.state.isTouched;
            if (!shouldUpdateValues && !shouldUpdateState) return;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$batch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["batch"])(()=>{
                this.baseStore.setState(()=>getDefaultFormState(Object.assign({}, this.state, shouldUpdateState ? options.defaultState : {}, shouldUpdateValues ? {
                        values: options.defaultValues
                    } : {})));
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$EventClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formEventClient"].emit("form-api", {
                id: this._formId,
                state: this.store.state,
                options: this.options
            });
        };
        this.reset = (values, opts2)=>{
            const { fieldMeta: currentFieldMeta } = this.state;
            const fieldMetaBase = this.resetFieldMeta(currentFieldMeta);
            if (values && !opts2?.keepDefaultValues) {
                this.options = {
                    ...this.options,
                    defaultValues: values
                };
            }
            this.baseStore.setState(()=>getDefaultFormState({
                    ...this.options.defaultState,
                    values: values ?? this.options.defaultValues ?? this.options.defaultState?.values,
                    fieldMetaBase
                }));
        };
        this.validateAllFields = async (cause)=>{
            const fieldValidationPromises = [];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$batch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["batch"])(()=>{
                void Object.values(this.fieldInfo).forEach((field)=>{
                    if (!field.instance) return;
                    const fieldInstance = field.instance;
                    fieldValidationPromises.push(// Remember, `validate` is either a sync operation or a promise
                    Promise.resolve().then(()=>fieldInstance.validate(cause, {
                            skipFormValidation: true
                        })));
                    if (!field.instance.state.meta.isTouched) {
                        field.instance.setMeta((prev)=>({
                                ...prev,
                                isTouched: true
                            }));
                    }
                });
            });
            const fieldErrorMapMap = await Promise.all(fieldValidationPromises);
            return fieldErrorMapMap.flat();
        };
        this.validateArrayFieldsStartingFrom = async (field, index, cause)=>{
            const currentValue = this.getFieldValue(field);
            const lastIndex = Array.isArray(currentValue) ? Math.max(currentValue.length - 1, 0) : null;
            const fieldKeysToValidate = [
                `${field}[${index}]`
            ];
            for(let i = index + 1; i <= (lastIndex ?? 0); i++){
                fieldKeysToValidate.push(`${field}[${i}]`);
            }
            const fieldsToValidate = Object.keys(this.fieldInfo).filter((fieldKey)=>fieldKeysToValidate.some((key)=>fieldKey.startsWith(key)));
            const fieldValidationPromises = [];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$batch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["batch"])(()=>{
                fieldsToValidate.forEach((nestedField)=>{
                    fieldValidationPromises.push(Promise.resolve().then(()=>this.validateField(nestedField, cause)));
                });
            });
            const fieldErrorMapMap = await Promise.all(fieldValidationPromises);
            return fieldErrorMapMap.flat();
        };
        this.validateField = (field, cause)=>{
            const fieldInstance = this.fieldInfo[field]?.instance;
            if (!fieldInstance) {
                const { hasErrored } = this.validateSync(cause);
                if (hasErrored && !this.options.asyncAlways) {
                    return this.getFieldMeta(field)?.errors ?? [];
                }
                return this.validateAsync(cause).then(()=>{
                    return this.getFieldMeta(field)?.errors ?? [];
                });
            }
            if (!fieldInstance.state.meta.isTouched) {
                fieldInstance.setMeta((prev)=>({
                        ...prev,
                        isTouched: true
                    }));
            }
            return fieldInstance.validate(cause);
        };
        this.validateSync = (cause)=>{
            const validates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSyncValidatorArray"])(cause, {
                ...this.options,
                form: this,
                validationLogic: this.options.validationLogic || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$ValidationLogic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultValidationLogic"]
            });
            let hasErrored = false;
            const currentValidationErrorMap = {};
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$batch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["batch"])(()=>{
                for (const validateObj of validates){
                    if (!validateObj.validate) continue;
                    const rawError = this.runValidator({
                        validate: validateObj.validate,
                        value: {
                            value: this.state.values,
                            formApi: this,
                            validationSource: "form"
                        },
                        type: "validate"
                    });
                    const { formError, fieldErrors } = normalizeError(rawError);
                    const errorMapKey = getErrorMapKey(validateObj.cause);
                    const allFieldsToProcess = /* @__PURE__ */ new Set([
                        ...Object.keys(this.state.fieldMeta),
                        ...Object.keys(fieldErrors || {})
                    ]);
                    for (const field of allFieldsToProcess){
                        if (this.baseStore.state.fieldMetaBase[field] === void 0 && !fieldErrors?.[field]) {
                            continue;
                        }
                        const fieldMeta = this.getFieldMeta(field) ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$metaHelper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultFieldMeta"];
                        const { errorMap: currentErrorMap, errorSourceMap: currentErrorMapSource } = fieldMeta;
                        const newFormValidatorError = fieldErrors?.[field];
                        const { newErrorValue, newSource } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["determineFormLevelErrorSourceAndValue"])({
                            newFormValidatorError,
                            isPreviousErrorFromFormValidator: // These conditional checks are required, otherwise we get runtime errors.
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                            currentErrorMapSource?.[errorMapKey] === "form",
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                            previousErrorValue: currentErrorMap?.[errorMapKey]
                        });
                        if (newSource === "form") {
                            currentValidationErrorMap[field] = {
                                ...currentValidationErrorMap[field],
                                [errorMapKey]: newFormValidatorError
                            };
                        }
                        if (currentErrorMap?.[errorMapKey] !== newErrorValue) {
                            this.setFieldMeta(field, (prev = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$metaHelper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultFieldMeta"])=>({
                                    ...prev,
                                    errorMap: {
                                        ...prev.errorMap,
                                        [errorMapKey]: newErrorValue
                                    },
                                    errorSourceMap: {
                                        ...prev.errorSourceMap,
                                        [errorMapKey]: newSource
                                    }
                                }));
                        }
                    }
                    if (this.state.errorMap?.[errorMapKey] !== formError) {
                        this.baseStore.setState((prev)=>({
                                ...prev,
                                errorMap: {
                                    ...prev.errorMap,
                                    [errorMapKey]: formError
                                }
                            }));
                    }
                    if (formError || fieldErrors) {
                        hasErrored = true;
                    }
                }
                const submitErrKey = getErrorMapKey("submit");
                if (// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                this.state.errorMap?.[submitErrKey] && cause !== "submit" && !hasErrored) {
                    this.baseStore.setState((prev)=>({
                            ...prev,
                            errorMap: {
                                ...prev.errorMap,
                                [submitErrKey]: void 0
                            }
                        }));
                }
                const serverErrKey = getErrorMapKey("server");
                if (// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                this.state.errorMap?.[serverErrKey] && cause !== "server" && !hasErrored) {
                    this.baseStore.setState((prev)=>({
                            ...prev,
                            errorMap: {
                                ...prev.errorMap,
                                [serverErrKey]: void 0
                            }
                        }));
                }
            });
            return {
                hasErrored,
                fieldsErrorMap: currentValidationErrorMap
            };
        };
        this.validateAsync = async (cause)=>{
            const validates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAsyncValidatorArray"])(cause, {
                ...this.options,
                form: this,
                validationLogic: this.options.validationLogic || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$ValidationLogic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultValidationLogic"]
            });
            if (!this.state.isFormValidating) {
                this.baseStore.setState((prev)=>({
                        ...prev,
                        isFormValidating: true
                    }));
            }
            const promises = [];
            let fieldErrorsFromFormValidators;
            for (const validateObj of validates){
                if (!validateObj.validate) continue;
                const key = getErrorMapKey(validateObj.cause);
                const fieldValidatorMeta = this.state.validationMetaMap[key];
                fieldValidatorMeta?.lastAbortController.abort();
                const controller = new AbortController();
                this.state.validationMetaMap[key] = {
                    lastAbortController: controller
                };
                promises.push(new Promise(async (resolve)=>{
                    let rawError;
                    try {
                        rawError = await new Promise((rawResolve, rawReject)=>{
                            setTimeout(async ()=>{
                                if (controller.signal.aborted) return rawResolve(void 0);
                                try {
                                    rawResolve(await this.runValidator({
                                        validate: validateObj.validate,
                                        value: {
                                            value: this.state.values,
                                            formApi: this,
                                            validationSource: "form",
                                            signal: controller.signal
                                        },
                                        type: "validateAsync"
                                    }));
                                } catch (e) {
                                    rawReject(e);
                                }
                            }, validateObj.debounceMs);
                        });
                    } catch (e) {
                        rawError = e;
                    }
                    const { formError, fieldErrors: fieldErrorsFromNormalizeError } = normalizeError(rawError);
                    if (fieldErrorsFromNormalizeError) {
                        fieldErrorsFromFormValidators = fieldErrorsFromFormValidators ? {
                            ...fieldErrorsFromFormValidators,
                            ...fieldErrorsFromNormalizeError
                        } : fieldErrorsFromNormalizeError;
                    }
                    const errorMapKey = getErrorMapKey(validateObj.cause);
                    for (const field of Object.keys(this.state.fieldMeta)){
                        if (this.baseStore.state.fieldMetaBase[field] === void 0) {
                            continue;
                        }
                        const fieldMeta = this.getFieldMeta(field);
                        if (!fieldMeta) continue;
                        const { errorMap: currentErrorMap, errorSourceMap: currentErrorMapSource } = fieldMeta;
                        const newFormValidatorError = fieldErrorsFromFormValidators?.[field];
                        const { newErrorValue, newSource } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["determineFormLevelErrorSourceAndValue"])({
                            newFormValidatorError,
                            isPreviousErrorFromFormValidator: // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                            currentErrorMapSource?.[errorMapKey] === "form",
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                            previousErrorValue: currentErrorMap?.[errorMapKey]
                        });
                        if (// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                        currentErrorMap?.[errorMapKey] !== newErrorValue) {
                            this.setFieldMeta(field, (prev)=>({
                                    ...prev,
                                    errorMap: {
                                        ...prev.errorMap,
                                        [errorMapKey]: newErrorValue
                                    },
                                    errorSourceMap: {
                                        ...prev.errorSourceMap,
                                        [errorMapKey]: newSource
                                    }
                                }));
                        }
                    }
                    this.baseStore.setState((prev)=>({
                            ...prev,
                            errorMap: {
                                ...prev.errorMap,
                                [errorMapKey]: formError
                            }
                        }));
                    resolve(fieldErrorsFromFormValidators ? {
                        fieldErrors: fieldErrorsFromFormValidators,
                        errorMapKey
                    } : void 0);
                }));
            }
            let results = [];
            const fieldsErrorMap = {};
            if (promises.length) {
                results = await Promise.all(promises);
                for (const fieldValidationResult of results){
                    if (fieldValidationResult?.fieldErrors) {
                        const { errorMapKey } = fieldValidationResult;
                        for (const [field, fieldError] of Object.entries(fieldValidationResult.fieldErrors)){
                            const oldErrorMap = fieldsErrorMap[field] || {};
                            const newErrorMap = {
                                ...oldErrorMap,
                                [errorMapKey]: fieldError
                            };
                            fieldsErrorMap[field] = newErrorMap;
                        }
                    }
                }
            }
            this.baseStore.setState((prev)=>({
                    ...prev,
                    isFormValidating: false
                }));
            return fieldsErrorMap;
        };
        this.validate = (cause)=>{
            const { hasErrored, fieldsErrorMap } = this.validateSync(cause);
            if (hasErrored && !this.options.asyncAlways) {
                return fieldsErrorMap;
            }
            return this.validateAsync(cause);
        };
        this._handleSubmit = async (submitMeta)=>{
            this.baseStore.setState((old)=>({
                    ...old,
                    // Submission attempts mark the form as not submitted
                    isSubmitted: false,
                    // Count submission attempts
                    submissionAttempts: old.submissionAttempts + 1,
                    isSubmitSuccessful: false
                }));
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$batch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["batch"])(()=>{
                void Object.values(this.fieldInfo).forEach((field)=>{
                    if (!field.instance) return;
                    if (!field.instance.state.meta.isTouched) {
                        field.instance.setMeta((prev)=>({
                                ...prev,
                                isTouched: true
                            }));
                    }
                });
            });
            const submitMetaArg = submitMeta ?? this.options.onSubmitMeta;
            if (!this.state.canSubmit && !this._devtoolsSubmissionOverride) {
                this.options.onSubmitInvalid?.({
                    value: this.state.values,
                    formApi: this,
                    meta: submitMetaArg
                });
                return;
            }
            this.baseStore.setState((d)=>({
                    ...d,
                    isSubmitting: true
                }));
            const done = ()=>{
                this.baseStore.setState((prev)=>({
                        ...prev,
                        isSubmitting: false
                    }));
            };
            await this.validateAllFields("submit");
            if (!this.state.isFieldsValid) {
                done();
                this.options.onSubmitInvalid?.({
                    value: this.state.values,
                    formApi: this,
                    meta: submitMetaArg
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$EventClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formEventClient"].emit("form-submission", {
                    id: this._formId,
                    submissionAttempt: this.state.submissionAttempts,
                    successful: false,
                    stage: "validateAllFields",
                    errors: Object.values(this.state.fieldMeta).map((meta)=>meta.errors).flat()
                });
                return;
            }
            await this.validate("submit");
            if (!this.state.isValid) {
                done();
                this.options.onSubmitInvalid?.({
                    value: this.state.values,
                    formApi: this,
                    meta: submitMetaArg
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$EventClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formEventClient"].emit("form-submission", {
                    id: this._formId,
                    submissionAttempt: this.state.submissionAttempts,
                    successful: false,
                    stage: "validate",
                    errors: this.state.errors
                });
                return;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$batch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["batch"])(()=>{
                void Object.values(this.fieldInfo).forEach((field)=>{
                    field.instance?.options.listeners?.onSubmit?.({
                        value: field.instance.state.value,
                        fieldApi: field.instance
                    });
                });
            });
            this.options.listeners?.onSubmit?.({
                formApi: this,
                meta: submitMetaArg
            });
            try {
                await this.options.onSubmit?.({
                    value: this.state.values,
                    formApi: this,
                    meta: submitMetaArg
                });
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$batch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["batch"])(()=>{
                    this.baseStore.setState((prev)=>({
                            ...prev,
                            isSubmitted: true,
                            isSubmitSuccessful: true
                        }));
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$EventClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formEventClient"].emit("form-submission", {
                        id: this._formId,
                        submissionAttempt: this.state.submissionAttempts,
                        successful: true
                    });
                    done();
                });
            } catch (err) {
                this.baseStore.setState((prev)=>({
                        ...prev,
                        isSubmitSuccessful: false
                    }));
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$EventClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formEventClient"].emit("form-submission", {
                    id: this._formId,
                    submissionAttempt: this.state.submissionAttempts,
                    successful: false,
                    stage: "inflight",
                    onError: err
                });
                done();
                throw err;
            }
        };
        this.getFieldValue = (field)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBy"])(this.state.values, field);
        this.getFieldMeta = (field)=>{
            return this.state.fieldMeta[field];
        };
        this.getFieldInfo = (field)=>{
            return this.fieldInfo[field] ||= {
                instance: null,
                validationMetaMap: {
                    onChange: void 0,
                    onBlur: void 0,
                    onSubmit: void 0,
                    onMount: void 0,
                    onServer: void 0,
                    onDynamic: void 0
                }
            };
        };
        this.setFieldMeta = (field, updater)=>{
            this.baseStore.setState((prev)=>{
                return {
                    ...prev,
                    fieldMetaBase: {
                        ...prev.fieldMetaBase,
                        [field]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functionalUpdate"])(updater, prev.fieldMetaBase[field])
                    }
                };
            });
        };
        this.resetFieldMeta = (fieldMeta)=>{
            return Object.keys(fieldMeta).reduce((acc, key)=>{
                const fieldKey = key;
                acc[fieldKey] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$metaHelper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultFieldMeta"];
                return acc;
            }, {});
        };
        this.setFieldValue = (field, updater, opts2)=>{
            const dontUpdateMeta = opts2?.dontUpdateMeta ?? false;
            const dontRunListeners = opts2?.dontRunListeners ?? false;
            const dontValidate = opts2?.dontValidate ?? false;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$batch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["batch"])(()=>{
                if (!dontUpdateMeta) {
                    this.setFieldMeta(field, (prev)=>({
                            ...prev,
                            isTouched: true,
                            isDirty: true,
                            errorMap: {
                                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                                ...prev?.errorMap,
                                onMount: void 0
                            }
                        }));
                }
                this.baseStore.setState((prev)=>{
                    return {
                        ...prev,
                        values: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setBy"])(prev.values, field, updater)
                    };
                });
            });
            if (!dontRunListeners) {
                this.getFieldInfo(field).instance?.triggerOnChangeListener();
            }
            if (!dontValidate) {
                this.validateField(field, "change");
            }
        };
        this.deleteField = (field)=>{
            const subFieldsToDelete = Object.keys(this.fieldInfo).filter((f)=>{
                const fieldStr = field.toString();
                return f !== fieldStr && f.startsWith(fieldStr);
            });
            const fieldsToDelete = [
                ...subFieldsToDelete,
                field
            ];
            this.baseStore.setState((prev)=>{
                const newState = {
                    ...prev
                };
                fieldsToDelete.forEach((f)=>{
                    newState.values = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteBy"])(newState.values, f);
                    delete this.fieldInfo[f];
                    delete newState.fieldMetaBase[f];
                });
                return newState;
            });
        };
        this.pushFieldValue = (field, value, options)=>{
            this.setFieldValue(field, (prev)=>[
                    ...Array.isArray(prev) ? prev : [],
                    value
                ], options);
        };
        this.insertFieldValue = async (field, index, value, options)=>{
            this.setFieldValue(field, (prev)=>{
                return [
                    ...prev.slice(0, index),
                    value,
                    ...prev.slice(index)
                ];
            }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeOpts"])(options, {
                dontValidate: true
            }));
            const dontValidate = options?.dontValidate ?? false;
            if (!dontValidate) {
                await this.validateField(field, "change");
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$metaHelper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metaHelper"])(this).handleArrayInsert(field, index);
            if (!dontValidate) {
                await this.validateArrayFieldsStartingFrom(field, index, "change");
            }
        };
        this.replaceFieldValue = async (field, index, value, options)=>{
            this.setFieldValue(field, (prev)=>{
                return prev.map((d, i)=>i === index ? value : d);
            }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeOpts"])(options, {
                dontValidate: true
            }));
            const dontValidate = options?.dontValidate ?? false;
            if (!dontValidate) {
                await this.validateField(field, "change");
                await this.validateArrayFieldsStartingFrom(field, index, "change");
            }
        };
        this.removeFieldValue = async (field, index, options)=>{
            const fieldValue = this.getFieldValue(field);
            const lastIndex = Array.isArray(fieldValue) ? Math.max(fieldValue.length - 1, 0) : null;
            this.setFieldValue(field, (prev)=>{
                return prev.filter((_d, i)=>i !== index);
            }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeOpts"])(options, {
                dontValidate: true
            }));
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$metaHelper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metaHelper"])(this).handleArrayRemove(field, index);
            if (lastIndex !== null) {
                const start = `${field}[${lastIndex}]`;
                this.deleteField(start);
            }
            const dontValidate = options?.dontValidate ?? false;
            if (!dontValidate) {
                await this.validateField(field, "change");
                await this.validateArrayFieldsStartingFrom(field, index, "change");
            }
        };
        this.swapFieldValues = (field, index1, index2, options)=>{
            this.setFieldValue(field, (prev)=>{
                const prev1 = prev[index1];
                const prev2 = prev[index2];
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setBy"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setBy"])(prev, `${index1}`, prev2), `${index2}`, prev1);
            }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeOpts"])(options, {
                dontValidate: true
            }));
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$metaHelper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metaHelper"])(this).handleArraySwap(field, index1, index2);
            const dontValidate = options?.dontValidate ?? false;
            if (!dontValidate) {
                this.validateField(field, "change");
                this.validateField(`${field}[${index1}]`, "change");
                this.validateField(`${field}[${index2}]`, "change");
            }
        };
        this.moveFieldValues = (field, index1, index2, options)=>{
            this.setFieldValue(field, (prev)=>{
                const next = [
                    ...prev
                ];
                next.splice(index2, 0, next.splice(index1, 1)[0]);
                return next;
            }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeOpts"])(options, {
                dontValidate: true
            }));
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$metaHelper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metaHelper"])(this).handleArrayMove(field, index1, index2);
            const dontValidate = options?.dontValidate ?? false;
            if (!dontValidate) {
                this.validateField(field, "change");
                this.validateField(`${field}[${index1}]`, "change");
                this.validateField(`${field}[${index2}]`, "change");
            }
        };
        this.clearFieldValues = (field, options)=>{
            const fieldValue = this.getFieldValue(field);
            const lastIndex = Array.isArray(fieldValue) ? Math.max(fieldValue.length - 1, 0) : null;
            this.setFieldValue(field, [], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeOpts"])(options, {
                dontValidate: true
            }));
            if (lastIndex !== null) {
                for(let i = 0; i <= lastIndex; i++){
                    const fieldKey = `${field}[${i}]`;
                    this.deleteField(fieldKey);
                }
            }
            const dontValidate = options?.dontValidate ?? false;
            if (!dontValidate) {
                this.validateField(field, "change");
            }
        };
        this.resetField = (field)=>{
            this.baseStore.setState((prev)=>{
                return {
                    ...prev,
                    fieldMetaBase: {
                        ...prev.fieldMetaBase,
                        [field]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$metaHelper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultFieldMeta"]
                    },
                    values: this.options.defaultValues ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setBy"])(prev.values, field, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBy"])(this.options.defaultValues, field)) : prev.values
                };
            });
        };
        this.setErrorMap = (errorMap)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$batch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["batch"])(()=>{
                Object.entries(errorMap).forEach(([key, value])=>{
                    const errorMapKey = key;
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isGlobalFormValidationError"])(value)) {
                        const { formError, fieldErrors } = normalizeError(value);
                        for (const fieldName of Object.keys(this.fieldInfo)){
                            const fieldMeta = this.getFieldMeta(fieldName);
                            if (!fieldMeta) continue;
                            this.setFieldMeta(fieldName, (prev)=>({
                                    ...prev,
                                    errorMap: {
                                        ...prev.errorMap,
                                        [errorMapKey]: fieldErrors?.[fieldName]
                                    },
                                    errorSourceMap: {
                                        ...prev.errorSourceMap,
                                        [errorMapKey]: "form"
                                    }
                                }));
                        }
                        this.baseStore.setState((prev)=>({
                                ...prev,
                                errorMap: {
                                    ...prev.errorMap,
                                    [errorMapKey]: formError
                                }
                            }));
                    } else {
                        this.baseStore.setState((prev)=>({
                                ...prev,
                                errorMap: {
                                    ...prev.errorMap,
                                    [errorMapKey]: value
                                }
                            }));
                    }
                });
            });
        };
        this.getAllErrors = ()=>{
            return {
                form: {
                    errors: this.state.errors,
                    errorMap: this.state.errorMap
                },
                fields: Object.entries(this.state.fieldMeta).reduce((acc, [fieldName, fieldMeta])=>{
                    if (Object.keys(fieldMeta).length && fieldMeta.errors.length) {
                        acc[fieldName] = {
                            errors: fieldMeta.errors,
                            errorMap: fieldMeta.errorMap
                        };
                    }
                    return acc;
                }, {})
            };
        };
        this.parseValuesWithSchema = (schema)=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$standardSchemaValidator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["standardSchemaValidators"].validate({
                value: this.state.values,
                validationSource: "form"
            }, schema);
        };
        this.parseValuesWithSchemaAsync = (schema)=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$standardSchemaValidator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["standardSchemaValidators"].validateAsync({
                value: this.state.values,
                validationSource: "form"
            }, schema);
        };
        this.timeoutIds = {
            validations: {},
            listeners: {},
            formListeners: {}
        };
        this._formId = opts?.formId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uuid"])();
        this._devtoolsSubmissionOverride = false;
        let baseStoreVal = getDefaultFormState({
            ...opts?.defaultState,
            values: opts?.defaultValues ?? opts?.defaultState?.values
        });
        if (opts?.transform) {
            baseStoreVal = opts.transform({
                state: baseStoreVal
            }).state;
            for (const errKey of Object.keys(baseStoreVal.errorMap)){
                const errKeyMap = baseStoreVal.errorMap[errKey];
                if (errKeyMap === void 0 || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isGlobalFormValidationError"])(errKeyMap)) {
                    continue;
                }
                for (const fieldName of Object.keys(errKeyMap.fields)){
                    const fieldErr = errKeyMap.fields[fieldName];
                    if (fieldErr === void 0) {
                        continue;
                    }
                    const existingFieldMeta = baseStoreVal.fieldMetaBase[fieldName];
                    baseStoreVal.fieldMetaBase[fieldName] = {
                        isTouched: false,
                        isValidating: false,
                        isBlurred: false,
                        isDirty: false,
                        ...existingFieldMeta ?? {},
                        errorSourceMap: {
                            ...existingFieldMeta?.["errorSourceMap"] ?? {},
                            onChange: "form"
                        },
                        errorMap: {
                            ...existingFieldMeta?.["errorMap"] ?? {},
                            [errKey]: fieldErr
                        }
                    };
                }
            }
        }
        this.baseStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStore"])(baseStoreVal);
        let prevBaseStore = void 0;
        this.fieldMetaDerived = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStore"])((prevVal)=>{
            const currBaseStore = this.baseStore.get();
            let originalMetaCount = 0;
            const fieldMeta = {};
            for (const fieldName of Object.keys(currBaseStore.fieldMetaBase)){
                const currBaseMeta = currBaseStore.fieldMetaBase[fieldName];
                const prevBaseMeta = prevBaseStore?.fieldMetaBase[fieldName];
                const prevFieldInfo = prevVal?.[fieldName];
                const curFieldVal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBy"])(currBaseStore.values, fieldName);
                let fieldErrors = prevFieldInfo?.errors;
                if (!prevBaseMeta || currBaseMeta.errorMap !== prevBaseMeta.errorMap) {
                    fieldErrors = Object.values(currBaseMeta.errorMap ?? {}).filter((val)=>val !== void 0);
                    const fieldInstance = this.getFieldInfo(fieldName)?.instance;
                    if (!fieldInstance || !fieldInstance.options.disableErrorFlat) {
                        fieldErrors = fieldErrors.flat(1);
                    }
                }
                const isFieldValid = !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNonEmptyArray"])(fieldErrors);
                const isFieldPristine = !currBaseMeta.isDirty;
                const isDefaultValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluate"])(curFieldVal, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBy"])(this.options.defaultValues, fieldName)) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluate"])(curFieldVal, // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                this.getFieldInfo(fieldName)?.instance?.options.defaultValue);
                if (prevFieldInfo && prevFieldInfo.isPristine === isFieldPristine && prevFieldInfo.isValid === isFieldValid && prevFieldInfo.isDefaultValue === isDefaultValue && prevFieldInfo.errors === fieldErrors && currBaseMeta === prevBaseMeta) {
                    fieldMeta[fieldName] = prevFieldInfo;
                    originalMetaCount++;
                    continue;
                }
                fieldMeta[fieldName] = {
                    ...currBaseMeta,
                    errors: fieldErrors ?? [],
                    isPristine: isFieldPristine,
                    isValid: isFieldValid,
                    isDefaultValue
                };
            }
            if (!Object.keys(currBaseStore.fieldMetaBase).length) return fieldMeta;
            if (prevVal && originalMetaCount === Object.keys(currBaseStore.fieldMetaBase).length) {
                return prevVal;
            }
            prevBaseStore = this.baseStore.get();
            return fieldMeta;
        });
        let prevBaseStoreForStore = void 0;
        this.store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStore"])((prevVal)=>{
            const currBaseStore = this.baseStore.get();
            const currFieldMeta = this.fieldMetaDerived.get();
            const fieldMetaValues = Object.values(currFieldMeta).filter(Boolean);
            const isFieldsValidating = fieldMetaValues.some((field)=>field.isValidating);
            const isFieldsValid = fieldMetaValues.every((field)=>field.isValid);
            const isTouched = fieldMetaValues.some((field)=>field.isTouched);
            const isBlurred = fieldMetaValues.some((field)=>field.isBlurred);
            const isDefaultValue = fieldMetaValues.every((field)=>field.isDefaultValue);
            const shouldInvalidateOnMount = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            isTouched && currBaseStore.errorMap?.onMount;
            const isDirty = fieldMetaValues.some((field)=>field.isDirty);
            const isPristine = !isDirty;
            const hasOnMountError = Boolean(// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            currBaseStore.errorMap?.onMount || // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            fieldMetaValues.some((f)=>f?.errorMap?.onMount));
            const isValidating = !!isFieldsValidating;
            let errors = prevVal?.errors ?? [];
            if (!prevBaseStoreForStore || currBaseStore.errorMap !== prevBaseStoreForStore.errorMap) {
                errors = Object.values(currBaseStore.errorMap).reduce((prev, curr)=>{
                    if (curr === void 0) return prev;
                    if (curr && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isGlobalFormValidationError"])(curr)) {
                        prev.push(curr.form);
                        return prev;
                    }
                    prev.push(curr);
                    return prev;
                }, []);
            }
            const isFormValid = errors.length === 0;
            const isValid = isFieldsValid && isFormValid;
            const submitInvalid = this.options.canSubmitWhenInvalid ?? false;
            const canSubmit = currBaseStore.submissionAttempts === 0 && !isTouched && !hasOnMountError || !isValidating && !currBaseStore.isSubmitting && isValid || submitInvalid;
            let errorMap = currBaseStore.errorMap;
            if (shouldInvalidateOnMount) {
                errors = errors.filter((err)=>err !== currBaseStore.errorMap.onMount);
                errorMap = Object.assign(errorMap, {
                    onMount: void 0
                });
            }
            if (prevVal && prevBaseStoreForStore && prevVal.errorMap === errorMap && prevVal.fieldMeta === this.fieldMetaDerived.state && prevVal.errors === errors && prevVal.isFieldsValidating === isFieldsValidating && prevVal.isFieldsValid === isFieldsValid && prevVal.isFormValid === isFormValid && prevVal.isValid === isValid && prevVal.canSubmit === canSubmit && prevVal.isTouched === isTouched && prevVal.isBlurred === isBlurred && prevVal.isPristine === isPristine && prevVal.isDefaultValue === isDefaultValue && prevVal.isDirty === isDirty && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluate"])(prevBaseStoreForStore, currBaseStore)) {
                return prevVal;
            }
            const state = {
                ...currBaseStore,
                errorMap,
                fieldMeta: this.fieldMetaDerived.state,
                errors,
                isFieldsValidating,
                isFieldsValid,
                isFormValid,
                isValid,
                canSubmit,
                isTouched,
                isBlurred,
                isPristine,
                isDefaultValue,
                isDirty
            };
            prevBaseStoreForStore = this.baseStore.get();
            return state;
        });
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update(opts || {});
    }
    get state() {
        return this.store.state;
    }
    get formId() {
        return this._formId;
    }
    /**
   * @private
   */ runValidator(props) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$standardSchemaValidator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isStandardSchemaValidator"])(props.validate)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$standardSchemaValidator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["standardSchemaValidators"][props.type](props.value, props.validate);
        }
        return props.validate(props.value);
    }
    handleSubmit(submitMeta) {
        return this._handleSubmit(submitMeta);
    }
}
function normalizeError(rawError) {
    if (rawError) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isGlobalFormValidationError"])(rawError)) {
            const formError = normalizeError(rawError.form).formError;
            const fieldErrors = rawError.fields;
            return {
                formError,
                fieldErrors
            };
        }
        return {
            formError: rawError
        };
    }
    return {
        formError: void 0
    };
}
function getErrorMapKey(cause) {
    switch(cause){
        case "submit":
            return "onSubmit";
        case "blur":
            return "onBlur";
        case "mount":
            return "onMount";
        case "server":
            return "onServer";
        case "dynamic":
            return "onDynamic";
        case "change":
        default:
            return "onChange";
    }
}
;
}),
"[project]/node_modules/@tanstack/form-core/dist/esm/transform.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mergeAndUpdate",
    ()=>mergeAndUpdate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$batch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/store/dist/esm/batch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/form-core/dist/esm/utils.js [app-client] (ecmascript)");
;
;
function mergeAndUpdate(form, fn) {
    if (!fn) return;
    const newObj = Object.assign({}, form, {
        state: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepCopy"])(form.state)
    });
    fn(newObj);
    if (newObj.fieldInfo !== form.fieldInfo) {
        form.fieldInfo = newObj.fieldInfo;
    }
    if (newObj.options !== form.options) {
        form.options = newObj.options;
    }
    const baseFormKeys = Object.keys({
        values: null,
        validationMetaMap: null,
        fieldMetaBase: null,
        isSubmitting: null,
        isSubmitted: null,
        isValidating: null,
        submissionAttempts: null,
        isSubmitSuccessful: null,
        _force_re_eval: null
    });
    const diffedObject = baseFormKeys.reduce((prev, key)=>{
        if (form.state[key] !== newObj.state[key]) {
            prev[key] = newObj.state[key];
        }
        return prev;
    }, {});
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$batch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["batch"])(()=>{
        if (Object.keys(diffedObject).length) {
            form.baseStore.setState((prev)=>({
                    ...prev,
                    ...diffedObject
                }));
        }
        if (newObj.state.errorMap !== form.state.errorMap) {
            form.setErrorMap(newObj.state.errorMap);
        }
    });
    return newObj;
}
;
}),
"[project]/node_modules/@tanstack/form-core/dist/esm/FieldApi.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldApi",
    ()=>FieldApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$batch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/store/dist/esm/batch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/store/dist/esm/store.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$standardSchemaValidator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/form-core/dist/esm/standardSchemaValidator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$metaHelper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/form-core/dist/esm/metaHelper.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/form-core/dist/esm/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$ValidationLogic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/form-core/dist/esm/ValidationLogic.js [app-client] (ecmascript)");
;
;
;
;
;
class FieldApi {
    /**
   * Initializes a new `FieldApi` instance.
   */ constructor(opts){
        this.options = {};
        this.mount = ()=>{
            if (this.options.defaultValue !== void 0 && !this.getMeta().isTouched) {
                this.form.setFieldValue(this.name, this.options.defaultValue, {
                    dontUpdateMeta: true
                });
            }
            const info = this.getInfo();
            info.instance = this;
            this.update(this.options);
            const { onMount } = this.options.validators || {};
            if (onMount) {
                const error = this.runValidator({
                    validate: onMount,
                    value: {
                        value: this.state.value,
                        fieldApi: this,
                        validationSource: "field"
                    },
                    type: "validate"
                });
                if (error) {
                    this.setMeta((prev)=>({
                            ...prev,
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                            errorMap: {
                                ...prev?.errorMap,
                                onMount: error
                            },
                            errorSourceMap: {
                                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                                ...prev?.errorSourceMap,
                                onMount: "field"
                            }
                        }));
                }
            }
            this.options.listeners?.onMount?.({
                value: this.state.value,
                fieldApi: this
            });
            return ()=>{};
        };
        this.update = (opts2)=>{
            this.options = opts2;
            this.name = opts2.name;
            if (!this.state.meta.isTouched && this.options.defaultValue !== void 0) {
                const formField = this.form.getFieldValue(this.name);
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluate"])(formField, opts2.defaultValue)) {
                    this.form.setFieldValue(this.name, opts2.defaultValue, {
                        dontUpdateMeta: true,
                        dontValidate: true,
                        dontRunListeners: true
                    });
                }
            }
            if (!this.form.getFieldMeta(this.name)) {
                this.form.setFieldMeta(this.name, this.state.meta);
            }
        };
        this.getValue = ()=>{
            return this.form.getFieldValue(this.name);
        };
        this.setValue = (updater, options)=>{
            this.form.setFieldValue(this.name, updater, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeOpts"])(options, {
                dontRunListeners: true,
                dontValidate: true
            }));
            if (!options?.dontRunListeners) {
                this.triggerOnChangeListener();
            }
            if (!options?.dontValidate) {
                this.validate("change");
            }
        };
        this.getMeta = ()=>this.store.state.meta;
        this.setMeta = (updater)=>this.form.setFieldMeta(this.name, updater);
        this.getInfo = ()=>this.form.getFieldInfo(this.name);
        this.pushValue = (value, options)=>{
            this.form.pushFieldValue(this.name, value, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeOpts"])(options, {
                dontRunListeners: true
            }));
            if (!options?.dontRunListeners) {
                this.triggerOnChangeListener();
            }
        };
        this.insertValue = (index, value, options)=>{
            this.form.insertFieldValue(this.name, index, value, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeOpts"])(options, {
                dontRunListeners: true
            }));
            if (!options?.dontRunListeners) {
                this.triggerOnChangeListener();
            }
        };
        this.replaceValue = (index, value, options)=>{
            this.form.replaceFieldValue(this.name, index, value, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeOpts"])(options, {
                dontRunListeners: true
            }));
            if (!options?.dontRunListeners) {
                this.triggerOnChangeListener();
            }
        };
        this.removeValue = (index, options)=>{
            this.form.removeFieldValue(this.name, index, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeOpts"])(options, {
                dontRunListeners: true
            }));
            if (!options?.dontRunListeners) {
                this.triggerOnChangeListener();
            }
        };
        this.swapValues = (aIndex, bIndex, options)=>{
            this.form.swapFieldValues(this.name, aIndex, bIndex, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeOpts"])(options, {
                dontRunListeners: true
            }));
            if (!options?.dontRunListeners) {
                this.triggerOnChangeListener();
            }
        };
        this.moveValue = (aIndex, bIndex, options)=>{
            this.form.moveFieldValues(this.name, aIndex, bIndex, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeOpts"])(options, {
                dontRunListeners: true
            }));
            if (!options?.dontRunListeners) {
                this.triggerOnChangeListener();
            }
        };
        this.clearValues = (options)=>{
            this.form.clearFieldValues(this.name, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeOpts"])(options, {
                dontRunListeners: true
            }));
            if (!options?.dontRunListeners) {
                this.triggerOnChangeListener();
            }
        };
        this.getLinkedFields = (cause)=>{
            const fields = Object.values(this.form.fieldInfo);
            const linkedFields = [];
            for (const field of fields){
                if (!field.instance) continue;
                const { onChangeListenTo, onBlurListenTo } = field.instance.options.validators || {};
                if (cause === "change" && onChangeListenTo?.includes(this.name)) {
                    linkedFields.push(field.instance);
                }
                if (cause === "blur" && onBlurListenTo?.includes(this.name)) {
                    linkedFields.push(field.instance);
                }
            }
            return linkedFields;
        };
        this.validateSync = (cause, errorFromForm)=>{
            const validates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSyncValidatorArray"])(cause, {
                ...this.options,
                form: this.form,
                validationLogic: this.form.options.validationLogic || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$ValidationLogic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultValidationLogic"]
            });
            const linkedFields = this.getLinkedFields(cause);
            const linkedFieldValidates = linkedFields.reduce((acc, field)=>{
                const fieldValidates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSyncValidatorArray"])(cause, {
                    ...field.options,
                    form: field.form,
                    validationLogic: field.form.options.validationLogic || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$ValidationLogic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultValidationLogic"]
                });
                fieldValidates.forEach((validate)=>{
                    validate.field = field;
                });
                return acc.concat(fieldValidates);
            }, []);
            let hasErrored = false;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$batch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["batch"])(()=>{
                const validateFieldFn = (field, validateObj)=>{
                    const errorMapKey = getErrorMapKey(validateObj.cause);
                    const fieldLevelError = validateObj.validate ? normalizeError(field.runValidator({
                        validate: validateObj.validate,
                        value: {
                            value: field.store.state.value,
                            validationSource: "field",
                            fieldApi: field
                        },
                        type: "validate"
                    })) : void 0;
                    const formLevelError = errorFromForm[errorMapKey];
                    const { newErrorValue, newSource } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["determineFieldLevelErrorSourceAndValue"])({
                        formLevelError,
                        fieldLevelError
                    });
                    if (field.state.meta.errorMap?.[errorMapKey] !== newErrorValue) {
                        field.setMeta((prev)=>({
                                ...prev,
                                errorMap: {
                                    ...prev.errorMap,
                                    [errorMapKey]: newErrorValue
                                },
                                errorSourceMap: {
                                    ...prev.errorSourceMap,
                                    [errorMapKey]: newSource
                                }
                            }));
                    }
                    if (newErrorValue) {
                        hasErrored = true;
                    }
                };
                for (const validateObj of validates){
                    validateFieldFn(this, validateObj);
                }
                for (const fieldValitateObj of linkedFieldValidates){
                    if (!fieldValitateObj.validate) continue;
                    validateFieldFn(fieldValitateObj.field, fieldValitateObj);
                }
            });
            const submitErrKey = getErrorMapKey("submit");
            if (// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            this.state.meta.errorMap?.[submitErrKey] && cause !== "submit" && !hasErrored) {
                this.setMeta((prev)=>({
                        ...prev,
                        errorMap: {
                            ...prev.errorMap,
                            [submitErrKey]: void 0
                        },
                        errorSourceMap: {
                            ...prev.errorSourceMap,
                            [submitErrKey]: void 0
                        }
                    }));
            }
            return {
                hasErrored
            };
        };
        this.validateAsync = async (cause, formValidationResultPromise)=>{
            const validates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAsyncValidatorArray"])(cause, {
                ...this.options,
                form: this.form,
                validationLogic: this.form.options.validationLogic || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$ValidationLogic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultValidationLogic"]
            });
            const asyncFormValidationResults = await formValidationResultPromise;
            const linkedFields = this.getLinkedFields(cause);
            const linkedFieldValidates = linkedFields.reduce((acc, field)=>{
                const fieldValidates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAsyncValidatorArray"])(cause, {
                    ...field.options,
                    form: field.form,
                    validationLogic: field.form.options.validationLogic || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$ValidationLogic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultValidationLogic"]
                });
                fieldValidates.forEach((validate)=>{
                    validate.field = field;
                });
                return acc.concat(fieldValidates);
            }, []);
            const validatesPromises = [];
            const linkedPromises = [];
            const hasAsyncValidators = validates.some((v)=>v.validate) || linkedFieldValidates.some((v)=>v.validate);
            if (hasAsyncValidators) {
                if (!this.state.meta.isValidating) {
                    this.setMeta((prev)=>({
                            ...prev,
                            isValidating: true
                        }));
                }
                for (const linkedField of linkedFields){
                    linkedField.setMeta((prev)=>({
                            ...prev,
                            isValidating: true
                        }));
                }
            }
            const validateFieldAsyncFn = (field, validateObj, promises)=>{
                const errorMapKey = getErrorMapKey(validateObj.cause);
                const fieldValidatorMeta = field.getInfo().validationMetaMap[errorMapKey];
                fieldValidatorMeta?.lastAbortController.abort();
                const controller = new AbortController();
                this.getInfo().validationMetaMap[errorMapKey] = {
                    lastAbortController: controller
                };
                promises.push(new Promise(async (resolve)=>{
                    let rawError;
                    try {
                        rawError = await new Promise((rawResolve, rawReject)=>{
                            if (this.timeoutIds.validations[validateObj.cause]) {
                                clearTimeout(this.timeoutIds.validations[validateObj.cause]);
                            }
                            this.timeoutIds.validations[validateObj.cause] = setTimeout(async ()=>{
                                if (controller.signal.aborted) return rawResolve(void 0);
                                try {
                                    rawResolve(await this.runValidator({
                                        validate: validateObj.validate,
                                        value: {
                                            value: field.store.state.value,
                                            fieldApi: field,
                                            signal: controller.signal,
                                            validationSource: "field"
                                        },
                                        type: "validateAsync"
                                    }));
                                } catch (e) {
                                    rawReject(e);
                                }
                            }, validateObj.debounceMs);
                        });
                    } catch (e) {
                        rawError = e;
                    }
                    if (controller.signal.aborted) return resolve(void 0);
                    const fieldLevelError = normalizeError(rawError);
                    const formLevelError = asyncFormValidationResults[this.name]?.[errorMapKey];
                    const { newErrorValue, newSource } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["determineFieldLevelErrorSourceAndValue"])({
                        formLevelError,
                        fieldLevelError
                    });
                    field.setMeta((prev)=>{
                        return {
                            ...prev,
                            errorMap: {
                                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                                ...prev?.errorMap,
                                [errorMapKey]: newErrorValue
                            },
                            errorSourceMap: {
                                ...prev.errorSourceMap,
                                [errorMapKey]: newSource
                            }
                        };
                    });
                    resolve(newErrorValue);
                }));
            };
            for (const validateObj of validates){
                if (!validateObj.validate) continue;
                validateFieldAsyncFn(this, validateObj, validatesPromises);
            }
            for (const fieldValitateObj of linkedFieldValidates){
                if (!fieldValitateObj.validate) continue;
                validateFieldAsyncFn(fieldValitateObj.field, fieldValitateObj, linkedPromises);
            }
            let results = [];
            if (validatesPromises.length || linkedPromises.length) {
                results = await Promise.all(validatesPromises);
                await Promise.all(linkedPromises);
            }
            if (hasAsyncValidators) {
                this.setMeta((prev)=>({
                        ...prev,
                        isValidating: false
                    }));
                for (const linkedField of linkedFields){
                    linkedField.setMeta((prev)=>({
                            ...prev,
                            isValidating: false
                        }));
                }
            }
            return results.filter(Boolean);
        };
        this.validate = (cause, opts2)=>{
            if (!this.state.meta.isTouched) return [];
            const { fieldsErrorMap } = opts2?.skipFormValidation ? {
                fieldsErrorMap: {}
            } : this.form.validateSync(cause);
            const { hasErrored } = this.validateSync(cause, fieldsErrorMap[this.name] ?? {});
            if (hasErrored && !this.options.asyncAlways) {
                this.getInfo().validationMetaMap[getErrorMapKey(cause)]?.lastAbortController.abort();
                return this.state.meta.errors;
            }
            const formValidationResultPromise = opts2?.skipFormValidation ? Promise.resolve({}) : this.form.validateAsync(cause);
            return this.validateAsync(cause, formValidationResultPromise);
        };
        this.handleChange = (updater)=>{
            this.setValue(updater);
        };
        this.handleBlur = ()=>{
            const prevTouched = this.state.meta.isTouched;
            if (!prevTouched) {
                this.setMeta((prev)=>({
                        ...prev,
                        isTouched: true
                    }));
            }
            if (!this.state.meta.isBlurred) {
                this.setMeta((prev)=>({
                        ...prev,
                        isBlurred: true
                    }));
            }
            this.validate("blur");
            this.triggerOnBlurListener();
        };
        this.setErrorMap = (errorMap)=>{
            this.setMeta((prev)=>({
                    ...prev,
                    errorMap: {
                        ...prev.errorMap,
                        ...errorMap
                    }
                }));
        };
        this.parseValueWithSchema = (schema)=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$standardSchemaValidator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["standardSchemaValidators"].validate({
                value: this.state.value,
                validationSource: "field"
            }, schema);
        };
        this.parseValueWithSchemaAsync = (schema)=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$standardSchemaValidator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["standardSchemaValidators"].validateAsync({
                value: this.state.value,
                validationSource: "field"
            }, schema);
        };
        this.triggerOnChangeListener = ()=>{
            const formDebounceMs = this.form.options.listeners?.onChangeDebounceMs;
            if (formDebounceMs && formDebounceMs > 0) {
                if (this.timeoutIds.formListeners.change) {
                    clearTimeout(this.timeoutIds.formListeners.change);
                }
                this.timeoutIds.formListeners.change = setTimeout(()=>{
                    this.form.options.listeners?.onChange?.({
                        formApi: this.form,
                        fieldApi: this
                    });
                }, formDebounceMs);
            } else {
                this.form.options.listeners?.onChange?.({
                    formApi: this.form,
                    fieldApi: this
                });
            }
            const fieldDebounceMs = this.options.listeners?.onChangeDebounceMs;
            if (fieldDebounceMs && fieldDebounceMs > 0) {
                if (this.timeoutIds.listeners.change) {
                    clearTimeout(this.timeoutIds.listeners.change);
                }
                this.timeoutIds.listeners.change = setTimeout(()=>{
                    this.options.listeners?.onChange?.({
                        value: this.state.value,
                        fieldApi: this
                    });
                }, fieldDebounceMs);
            } else {
                this.options.listeners?.onChange?.({
                    value: this.state.value,
                    fieldApi: this
                });
            }
        };
        this.form = opts.form;
        this.name = opts.name;
        this.options = opts;
        this.timeoutIds = {
            validations: {},
            listeners: {},
            formListeners: {}
        };
        this.store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$store$2f$dist$2f$esm$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStore"])((prevVal)=>{
            this.form.store.get();
            const meta = this.form.getFieldMeta(this.name) ?? {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$metaHelper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultFieldMeta"],
                ...opts.defaultMeta
            };
            let value = this.form.getFieldValue(this.name);
            if (!meta.isTouched && value === void 0 && this.options.defaultValue !== void 0 && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluate"])(value, this.options.defaultValue)) {
                value = this.options.defaultValue;
            }
            if (prevVal && prevVal.value === value && prevVal.meta === meta) {
                return prevVal;
            }
            return {
                value,
                meta
            };
        });
    }
    /**
   * The current field state.
   */ get state() {
        return this.store.state;
    }
    /**
   * @private
   */ runValidator(props) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$standardSchemaValidator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isStandardSchemaValidator"])(props.validate)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$standardSchemaValidator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["standardSchemaValidators"][props.type](props.value, props.validate);
        }
        return props.validate(props.value);
    }
    triggerOnBlurListener() {
        const formDebounceMs = this.form.options.listeners?.onBlurDebounceMs;
        if (formDebounceMs && formDebounceMs > 0) {
            if (this.timeoutIds.formListeners.blur) {
                clearTimeout(this.timeoutIds.formListeners.blur);
            }
            this.timeoutIds.formListeners.blur = setTimeout(()=>{
                this.form.options.listeners?.onBlur?.({
                    formApi: this.form,
                    fieldApi: this
                });
            }, formDebounceMs);
        } else {
            this.form.options.listeners?.onBlur?.({
                formApi: this.form,
                fieldApi: this
            });
        }
        const fieldDebounceMs = this.options.listeners?.onBlurDebounceMs;
        if (fieldDebounceMs && fieldDebounceMs > 0) {
            if (this.timeoutIds.listeners.blur) {
                clearTimeout(this.timeoutIds.listeners.blur);
            }
            this.timeoutIds.listeners.blur = setTimeout(()=>{
                this.options.listeners?.onBlur?.({
                    value: this.state.value,
                    fieldApi: this
                });
            }, fieldDebounceMs);
        } else {
            this.options.listeners?.onBlur?.({
                value: this.state.value,
                fieldApi: this
            });
        }
    }
}
function normalizeError(rawError) {
    if (rawError) {
        return rawError;
    }
    return void 0;
}
function getErrorMapKey(cause) {
    switch(cause){
        case "submit":
            return "onSubmit";
        case "blur":
            return "onBlur";
        case "mount":
            return "onMount";
        case "server":
            return "onServer";
        case "dynamic":
            return "onDynamic";
        case "change":
        default:
            return "onChange";
    }
}
;
}),
"[project]/node_modules/@tanstack/react-store/dist/esm/useStore.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$sync$2d$external$2d$store$2f$shim$2f$with$2d$selector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/use-sync-external-store/shim/with-selector.js [app-client] (ecmascript)");
;
;
function defaultCompare(a, b) {
    return a === b;
}
function useStore(atom, selector, compare = defaultCompare) {
    const subscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useStore.useCallback[subscribe]": (handleStoreChange)=>{
            if (!atom) {
                return ({
                    "useStore.useCallback[subscribe]": ()=>{}
                })["useStore.useCallback[subscribe]"];
            }
            const { unsubscribe } = atom.subscribe(handleStoreChange);
            return unsubscribe;
        }
    }["useStore.useCallback[subscribe]"], [
        atom
    ]);
    const boundGetSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useStore.useCallback[boundGetSnapshot]": ()=>atom?.get()
    }["useStore.useCallback[boundGetSnapshot]"], [
        atom
    ]);
    const selectedSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$sync$2d$external$2d$store$2f$shim$2f$with$2d$selector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStoreWithSelector"])(subscribe, boundGetSnapshot, boundGetSnapshot, selector, compare);
    return selectedSnapshot;
}
;
}),
"[project]/node_modules/@tanstack/react-form/dist/esm/useIsomorphicLayoutEffect.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsomorphicLayoutEffect",
    ()=>useIsomorphicLayoutEffect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"];
;
}),
"[project]/node_modules/@tanstack/react-form/dist/esm/useField.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Field",
    ()=>Field,
    "useField",
    ()=>useField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$store$2f$dist$2f$esm$2f$useStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-store/dist/esm/useStore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$FieldApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/form-core/dist/esm/FieldApi.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/form-core/dist/esm/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$form$2f$dist$2f$esm$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-form/dist/esm/useIsomorphicLayoutEffect.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function useField(opts) {
    const [prevOptions, setPrevOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useField.useState": ()=>({
                form: opts.form,
                name: opts.name
            })
    }["useField.useState"]);
    const [fieldApi, setFieldApi] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useField.useState": ()=>{
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$FieldApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldApi"]({
                ...opts
            });
        }
    }["useField.useState"]);
    if (prevOptions.form !== opts.form || prevOptions.name !== opts.name) {
        setFieldApi(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$FieldApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldApi"]({
            ...opts
        }));
        setPrevOptions({
            form: opts.form,
            name: opts.name
        });
    }
    const reactiveStateValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$store$2f$dist$2f$esm$2f$useStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])(fieldApi.store, opts.mode === "array" ? ({
        "useField.useStore[reactiveStateValue]": (state)=>Object.keys(state.value ?? []).length
    })["useField.useStore[reactiveStateValue]"] : ({
        "useField.useStore[reactiveStateValue]": (state)=>state.value
    })["useField.useStore[reactiveStateValue]"]);
    const reactiveMetaIsTouched = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$store$2f$dist$2f$esm$2f$useStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])(fieldApi.store, {
        "useField.useStore[reactiveMetaIsTouched]": (state)=>state.meta.isTouched
    }["useField.useStore[reactiveMetaIsTouched]"]);
    const reactiveMetaIsBlurred = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$store$2f$dist$2f$esm$2f$useStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])(fieldApi.store, {
        "useField.useStore[reactiveMetaIsBlurred]": (state)=>state.meta.isBlurred
    }["useField.useStore[reactiveMetaIsBlurred]"]);
    const reactiveMetaIsDirty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$store$2f$dist$2f$esm$2f$useStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])(fieldApi.store, {
        "useField.useStore[reactiveMetaIsDirty]": (state)=>state.meta.isDirty
    }["useField.useStore[reactiveMetaIsDirty]"]);
    const reactiveMetaErrorMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$store$2f$dist$2f$esm$2f$useStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])(fieldApi.store, {
        "useField.useStore[reactiveMetaErrorMap]": (state)=>state.meta.errorMap
    }["useField.useStore[reactiveMetaErrorMap]"]);
    const reactiveMetaErrorSourceMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$store$2f$dist$2f$esm$2f$useStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])(fieldApi.store, {
        "useField.useStore[reactiveMetaErrorSourceMap]": (state)=>state.meta.errorSourceMap
    }["useField.useStore[reactiveMetaErrorSourceMap]"]);
    const reactiveMetaIsValidating = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$store$2f$dist$2f$esm$2f$useStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])(fieldApi.store, {
        "useField.useStore[reactiveMetaIsValidating]": (state)=>state.meta.isValidating
    }["useField.useStore[reactiveMetaIsValidating]"]);
    const extendedFieldApi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useField.useMemo[extendedFieldApi]": ()=>{
            const reactiveFieldApi = {
                ...fieldApi,
                get state () {
                    return {
                        // For array mode, reactiveStateValue is the length (for reactivity tracking),
                        // so we need to get the actual value from fieldApi
                        value: opts.mode === "array" ? fieldApi.state.value : reactiveStateValue,
                        get meta () {
                            return {
                                ...fieldApi.state.meta,
                                isTouched: reactiveMetaIsTouched,
                                isBlurred: reactiveMetaIsBlurred,
                                isDirty: reactiveMetaIsDirty,
                                errorMap: reactiveMetaErrorMap,
                                errorSourceMap: reactiveMetaErrorSourceMap,
                                isValidating: reactiveMetaIsValidating
                            };
                        }
                    };
                }
            };
            const extendedApi = reactiveFieldApi;
            extendedApi.Field = Field;
            return extendedApi;
        }
    }["useField.useMemo[extendedFieldApi]"], [
        fieldApi,
        opts.mode,
        reactiveStateValue,
        reactiveMetaIsTouched,
        reactiveMetaIsBlurred,
        reactiveMetaIsDirty,
        reactiveMetaErrorMap,
        reactiveMetaErrorSourceMap,
        reactiveMetaIsValidating
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$form$2f$dist$2f$esm$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(fieldApi.mount, [
        fieldApi
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$form$2f$dist$2f$esm$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])({
        "useField.useIsomorphicLayoutEffect": ()=>{
            fieldApi.update(opts);
        }
    }["useField.useIsomorphicLayoutEffect"]);
    return extendedFieldApi;
}
const Field = ({ children, ...fieldOptions })=>{
    const fieldApi = useField(fieldOptions);
    const jsxToDisplay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useMemo[jsxToDisplay]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functionalUpdate"])(children, fieldApi)
    }["useMemo[jsxToDisplay]"], [
        children,
        fieldApi
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: jsxToDisplay
    });
};
;
}),
"[project]/node_modules/@tanstack/react-form/dist/esm/useUUID.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUUID",
    ()=>useUUID
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/form-core/dist/esm/utils.js [app-client] (ecmascript)");
;
;
function useUUID() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useUUID.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uuid"])()
    }["useUUID.useState"])[0];
}
;
}),
"[project]/node_modules/@tanstack/react-form/dist/esm/useFormId.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFormId",
    ()=>useFormId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$form$2f$dist$2f$esm$2f$useUUID$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-form/dist/esm/useUUID.js [app-client] (ecmascript)");
;
;
const _React = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__;
const useFormId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.version.split(".")[0] === "17" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$form$2f$dist$2f$esm$2f$useUUID$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUUID"] : _React.useId;
;
}),
"[project]/node_modules/@tanstack/react-form/dist/esm/useForm.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useForm",
    ()=>useForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$FormApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/form-core/dist/esm/FormApi.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$transform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/form-core/dist/esm/transform.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/form-core/dist/esm/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$store$2f$dist$2f$esm$2f$useStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-store/dist/esm/useStore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$form$2f$dist$2f$esm$2f$useField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-form/dist/esm/useField.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$form$2f$dist$2f$esm$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-form/dist/esm/useIsomorphicLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$form$2f$dist$2f$esm$2f$useFormId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-form/dist/esm/useFormId.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function LocalSubscribe({ form, selector = (state)=>state, children }) {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$store$2f$dist$2f$esm$2f$useStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])(form.store, selector);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functionalUpdate"])(children, data)
    });
}
function useForm(opts) {
    const fallbackFormId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$form$2f$dist$2f$esm$2f$useFormId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormId"])();
    const [prevFormId, setPrevFormId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(opts?.formId);
    const [formApi, setFormApi] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useForm.useState": ()=>{
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$FormApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormApi"]({
                ...opts,
                formId: opts?.formId ?? fallbackFormId
            });
        }
    }["useForm.useState"]);
    if (prevFormId !== opts?.formId) {
        const formId = opts?.formId ?? fallbackFormId;
        setFormApi(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$FormApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormApi"]({
            ...opts,
            formId
        }));
        setPrevFormId(formId);
    }
    const extendedFormApi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useForm.useMemo[extendedFormApi]": ()=>{
            const extendedApi = {
                ...formApi,
                handleSubmit: {
                    "useForm.useMemo[extendedFormApi]": (...props)=>{
                        return formApi._handleSubmit(...props);
                    }
                }["useForm.useMemo[extendedFormApi]"],
                // We must add all `get`ters from `core`'s `FormApi` here, as otherwise the spread operator won't catch those
                get formId () {
                    return formApi._formId;
                },
                get state () {
                    return formApi.store.state;
                }
            };
            extendedApi.Field = function APIField(props) {
                return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$form$2f$dist$2f$esm$2f$useField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                    ...props,
                    form: formApi
                });
            };
            extendedApi.Subscribe = function Subscribe(props) {
                return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(LocalSubscribe, {
                    form: formApi,
                    selector: props.selector,
                    children: props.children
                });
            };
            return extendedApi;
        }
    }["useForm.useMemo[extendedFormApi]"], [
        formApi
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$form$2f$dist$2f$esm$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(formApi.mount, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$form$2f$dist$2f$esm$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])({
        "useForm.useIsomorphicLayoutEffect": ()=>{
            formApi.update(opts);
        }
    }["useForm.useIsomorphicLayoutEffect"]);
    const hasRan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$form$2f$dist$2f$esm$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])({
        "useForm.useIsomorphicLayoutEffect": ()=>{
            if (!hasRan.current) return;
            if (!opts?.transform) return;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$form$2d$core$2f$dist$2f$esm$2f$transform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeAndUpdate"])(formApi, opts.transform);
        }
    }["useForm.useIsomorphicLayoutEffect"], [
        formApi,
        opts?.transform
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$form$2f$dist$2f$esm$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])({
        "useForm.useIsomorphicLayoutEffect": ()=>{
            hasRan.current = true;
        }
    }["useForm.useIsomorphicLayoutEffect"]);
    return extendedFormApi;
}
;
}),
]);

//# sourceMappingURL=node_modules_%40tanstack_0bj1drf._.js.map