(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
(()=>{"use strict";return[
"[project]/client/src/app/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/client/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$chain$2f$defineChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/viem/_esm/utils/chain/defineChain.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$ConfigContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/context/ConfigContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$wallet$2f$WalletContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/wallet/WalletContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$FavoritesContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/context/FavoritesContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$MarketsStreamContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/context/MarketsStreamContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$PaperTradeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/context/PaperTradeContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
// Startup screen — shown once per browser session
const STARTUP_SHOWN_KEY = "zedx_startup_shown";
const STARTUP_STEPS = [
    {
        text: "Connecting to Polygon network...",
        duration: 2000
    },
    {
        text: "Verifying smart contracts...",
        duration: 2500
    },
    {
        text: "Loading market data...",
        duration: 2000
    },
    {
        text: "Syncing price feeds...",
        duration: 2000
    },
    {
        text: "Almost there...",
        duration: 1500
    }
];
function StartupScreen({ onDone }) {
    _s();
    const [stepIdx, setStepIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StartupScreen.useEffect": ()=>{
            let elapsed = 0;
            const total = STARTUP_STEPS.reduce({
                "StartupScreen.useEffect.total": (s, x)=>s + x.duration
            }["StartupScreen.useEffect.total"], 0);
            let stepStart = 0;
            const runStep = {
                "StartupScreen.useEffect.runStep": (idx)=>{
                    if (idx >= STARTUP_STEPS.length) {
                        setProgress(100);
                        setTimeout({
                            "StartupScreen.useEffect.runStep": ()=>onDone()
                        }["StartupScreen.useEffect.runStep"], 300);
                        return;
                    }
                    setStepIdx(idx);
                    const step = STARTUP_STEPS[idx];
                    const interval = setInterval({
                        "StartupScreen.useEffect.runStep.interval": ()=>{
                            elapsed += 50;
                            setProgress(Math.min(elapsed / total * 100, 100));
                        }
                    }["StartupScreen.useEffect.runStep.interval"], 50);
                    setTimeout({
                        "StartupScreen.useEffect.runStep": ()=>{
                            clearInterval(interval);
                            stepStart += step.duration;
                            runStep(idx + 1);
                        }
                    }["StartupScreen.useEffect.runStep"], step.duration);
                }
            }["StartupScreen.useEffect.runStep"];
            runStep(0);
        }
    }["StartupScreen.useEffect"], []); // eslint-disable-line react-hooks/exhaustive-deps
    const currentText = STARTUP_STEPS[stepIdx]?.text ?? "Almost there...";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[9999] flex flex-col items-center justify-center",
        style: {
            background: "#060c18"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0",
                style: {
                    background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(61,255,160,0.08) 0%, transparent 70%)"
                }
            }, void 0, false, {
                fileName: "[project]/client/src/app/providers.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex flex-col items-center gap-8 px-8 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/logo.png",
                                alt: "ZedX",
                                className: "h-12 w-12 rounded-2xl object-contain",
                                style: {
                                    filter: "drop-shadow(0 0 16px rgba(61,255,160,0.5))"
                                }
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/providers.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl font-black tracking-wider",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "#3dffa0"
                                                },
                                                children: "ZED"
                                            }, void 0, false, {
                                                fileName: "[project]/client/src/app/providers.tsx",
                                                lineNumber: 66,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white",
                                                children: "X"
                                            }, void 0, false, {
                                                fileName: "[project]/client/src/app/providers.tsx",
                                                lineNumber: 67,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/client/src/app/providers.tsx",
                                        lineNumber: 65,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[10px] uppercase tracking-[0.25em] font-medium",
                                        style: {
                                            color: "rgba(255,255,255,0.3)"
                                        },
                                        children: "DeFi Platform"
                                    }, void 0, false, {
                                        fileName: "[project]/client/src/app/providers.tsx",
                                        lineNumber: 69,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/client/src/app/providers.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/src/app/providers.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium transition-all duration-500",
                                style: {
                                    color: "#3dffa0"
                                },
                                children: currentText
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/providers.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs",
                                style: {
                                    color: "rgba(255,255,255,0.3)"
                                },
                                children: "Polygon Mainnet"
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/providers.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/src/app/providers.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-64 overflow-hidden rounded-full",
                        style: {
                            height: 3,
                            background: "rgba(255,255,255,0.08)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full rounded-full transition-all duration-300 ease-out",
                            style: {
                                width: `${progress}%`,
                                background: "linear-gradient(90deg, #3dffa0, #38bdf8)",
                                boxShadow: "0 0 8px rgba(61,255,160,0.6)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/client/src/app/providers.tsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/client/src/app/providers.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            0,
                            1,
                            2
                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-1.5 w-1.5 rounded-full",
                                style: {
                                    background: "#3dffa0",
                                    animation: `dotPulse 1.2s ease-in-out ${i * 0.2}s infinite`
                                }
                            }, i, false, {
                                fileName: "[project]/client/src/app/providers.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/client/src/app/providers.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/src/app/providers.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client/src/app/providers.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_s(StartupScreen, "bzW8yrEZoUG+pauWIxwyKwqichA=");
_c = StartupScreen;
async function loadConfig() {
    const base = (__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
    const url = base ? `${base}/api/v1/config` : "/api/v1/config";
    const res = await fetch(url);
    if (!res.ok) throw new Error(`config ${res.status}`);
    return res.json();
}
function Providers({ children }) {
    _s1();
    const [cfg, setCfg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadError, setLoadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showStartup, setShowStartup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null); // null = deciding
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Providers.useEffect": ()=>{
            const shown = sessionStorage.getItem(STARTUP_SHOWN_KEY) === "1";
            loadConfig().then({
                "Providers.useEffect": (config)=>{
                    setCfg(config);
                    setShowStartup(!shown);
                }
            }["Providers.useEffect"]).catch({
                "Providers.useEffect": ()=>{
                    setLoadError("Could not load API config. Make sure the server is running on port 5000.");
                    setShowStartup(false);
                }
            }["Providers.useEffect"]);
        }
    }["Providers.useEffect"], []);
    // Waiting for config
    if (showStartup === null) return null;
    if (showStartup) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StartupScreen, {
            onDone: ()=>{
                sessionStorage.setItem(STARTUP_SHOWN_KEY, "1");
                setShowStartup(false);
            }
        }, void 0, false, {
            fileName: "[project]/client/src/app/providers.tsx",
            lineNumber: 126,
            columnNumber: 7
        }, this);
    }
    if (loadError) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex min-h-screen items-center justify-center p-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-sm rounded-xl border border-white/[0.06] bg-[rgba(12,14,24,0.7)] p-8 text-center backdrop-blur-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mb-2 text-base font-semibold",
                        children: "Configuration error"
                    }, void 0, false, {
                        fileName: "[project]/client/src/app/providers.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "m-0 text-sm leading-relaxed text-white/55",
                        children: loadError
                    }, void 0, false, {
                        fileName: "[project]/client/src/app/providers.tsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/src/app/providers.tsx",
                lineNumber: 136,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/client/src/app/providers.tsx",
            lineNumber: 135,
            columnNumber: 7
        }, this);
    }
    if (!cfg) return null;
    const chain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$chain$2f$defineChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])({
        id: cfg.chain_id,
        name: cfg.chain_id === 137 ? "Polygon" : cfg.chain_id === 80002 ? "Polygon Amoy" : "ZedX Network",
        nativeCurrency: cfg.chain_id === 137 || cfg.chain_id === 80002 ? {
            name: "POL",
            symbol: "POL",
            decimals: 18
        } : {
            name: "Ether",
            symbol: "ETH",
            decimals: 18
        },
        rpcUrls: {
            default: {
                http: [
                    cfg.rpc_url
                ]
            }
        },
        blockExplorers: cfg.chain_id === 137 ? {
            default: {
                name: "Polygonscan",
                url: "https://polygonscan.com"
            }
        } : cfg.chain_id === 80002 ? {
            default: {
                name: "Amoy Polygonscan",
                url: "https://amoy.polygonscan.com"
            }
        } : undefined
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$ConfigContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfigProvider"], {
        value: cfg,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$wallet$2f$WalletContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletProvider"], {
            chain: chain,
            rpcUrl: cfg.rpc_url,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$FavoritesContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FavoritesProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$MarketsStreamContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarketsStreamProvider"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$context$2f$PaperTradeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PaperTradeProvider"], {
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/client/src/app/providers.tsx",
                        lineNumber: 165,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/client/src/app/providers.tsx",
                    lineNumber: 164,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/client/src/app/providers.tsx",
                lineNumber: 163,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/client/src/app/providers.tsx",
            lineNumber: 162,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client/src/app/providers.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}
_s1(Providers, "bKHTvPskzz3S6ZcB9LM4yektTVE=");
_c1 = Providers;
var _c, _c1;
__turbopack_context__.k.register(_c, "StartupScreen");
__turbopack_context__.k.register(_c1, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/components/WalletConnectModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletConnectModal",
    ()=>WalletConnectModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$wallet$2f$WalletContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/wallet/WalletContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$wallet$2f$walletCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/wallet/walletCatalog.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$wallet$2f$walletBrandIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/wallet/walletBrandIcons.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function WalletConnectModal() {
    _s();
    const { connectModalOpen, closeConnectModal, connectWalletId, connectEip6963Provider, eip6963Announced, connectError, connectingId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$wallet$2f$WalletContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWallet"])();
    const [q, setQ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const filteredCatalog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WalletConnectModal.useMemo[filteredCatalog]": ()=>{
            const s = q.trim().toLowerCase();
            return s ? __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$wallet$2f$walletCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WALLET_CATALOG"].filter({
                "WalletConnectModal.useMemo[filteredCatalog]": (w)=>w.name.toLowerCase().includes(s)
            }["WalletConnectModal.useMemo[filteredCatalog]"]) : __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$wallet$2f$walletCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WALLET_CATALOG"];
        }
    }["WalletConnectModal.useMemo[filteredCatalog]"], [
        q
    ]);
    const filtered6963 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WalletConnectModal.useMemo[filtered6963]": ()=>{
            const s = q.trim().toLowerCase();
            return s ? eip6963Announced.filter({
                "WalletConnectModal.useMemo[filtered6963]": (e)=>e.info.name.toLowerCase().includes(s)
            }["WalletConnectModal.useMemo[filtered6963]"]) : eip6963Announced;
        }
    }["WalletConnectModal.useMemo[filtered6963]"], [
        eip6963Announced,
        q
    ]);
    if (!connectModalOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md",
        role: "presentation",
        onClick: closeConnectModal,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex w-full max-w-[420px] flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-[#0c0e12] shadow-[0_24px_80px_rgba(0,0,0,0.65)]",
            style: {
                maxHeight: "min(90vh,640px)"
            },
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "wc-title",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between border-b border-white/[0.06] px-5 py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            id: "wc-title",
                            className: "m-0 text-base font-semibold tracking-tight",
                            children: "Connect wallet"
                        }, void 0, false, {
                            fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: closeConnectModal,
                            "aria-label": "Close",
                            className: "rounded px-2 py-0.5 text-2xl leading-none text-white/45 hover:bg-white/[0.06] hover:text-white",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-5 mt-3 flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.04] px-3 py-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-white/45",
                            children: "⌕"
                        }, void 0, false, {
                            fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "search",
                            placeholder: "Search wallets…",
                            value: q,
                            onChange: (e)=>setQ(e.target.value),
                            autoComplete: "off",
                            className: "flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                        }, void 0, false, {
                            fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this),
                connectError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-5 mt-3 rounded-md bg-red-400/10 px-3 py-2 text-xs text-red-300",
                    children: connectError
                }, void 0, false, {
                    fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                    lineNumber: 44,
                    columnNumber: 26
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-h-0 flex-1 overflow-y-auto",
                    children: [
                        filtered6963.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-5 pt-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-2 text-[10px] uppercase tracking-widest text-white/45",
                                    children: "Detected in browser"
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                                    lineNumber: 49,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "m-0 list-none p-0",
                                    children: filtered6963.map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                disabled: connectingId !== null,
                                                onClick: ()=>void connectEip6963Provider(e),
                                                className: "mb-1.5 flex w-full items-center gap-3 rounded-lg border border-transparent bg-white/[0.03] px-3 py-2.5 text-left text-white transition-colors hover:border-[rgba(0,217,192,0.25)] hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-45",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: e.info.icon,
                                                        alt: "",
                                                        width: 32,
                                                        height: 32,
                                                        className: "rounded-lg object-contain"
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                                                        lineNumber: 57,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium",
                                                        children: e.info.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                                                        lineNumber: 58,
                                                        columnNumber: 23
                                                    }, this),
                                                    connectingId === `eip6963:${e.info.uuid}` && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-auto text-[#00d9c0] font-bold",
                                                        children: "…"
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                                                        lineNumber: 59,
                                                        columnNumber: 69
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                                                lineNumber: 53,
                                                columnNumber: 21
                                            }, this)
                                        }, e.info.uuid, false, {
                                            fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                                            lineNumber: 52,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                                    lineNumber: 50,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                            lineNumber: 48,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-5 pt-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-2 text-[10px] uppercase tracking-widest text-white/45",
                                    children: "Popular wallets"
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "m-0 list-none p-0",
                                    children: filteredCatalog.map((w)=>{
                                        const busy = connectingId === w.id;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                disabled: connectingId !== null && !busy,
                                                onClick: ()=>void connectWalletId(w.id),
                                                className: "mb-1.5 flex w-full items-center gap-3 rounded-lg border border-transparent bg-white/[0.03] px-3 py-2.5 text-left text-white transition-colors hover:border-[rgba(0,217,192,0.25)] hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-45",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$wallet$2f$walletBrandIcons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletBrandIcon"], {
                                                        id: w.id
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                                                        lineNumber: 76,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium",
                                                        children: w.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                                                        lineNumber: 77,
                                                        columnNumber: 23
                                                    }, this),
                                                    busy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-auto text-[#00d9c0] font-bold",
                                                        children: "…"
                                                    }, void 0, false, {
                                                        fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                                                        lineNumber: 78,
                                                        columnNumber: 32
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                                                lineNumber: 73,
                                                columnNumber: 21
                                            }, this)
                                        }, w.id, false, {
                                            fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                                            lineNumber: 72,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mx-5 mb-4 mt-3 text-center text-[10px] text-white/35",
                    children: [
                        "By connecting you agree to our",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "",
                            target: "_blank",
                            rel: "noreferrer",
                            className: "text-[#00d9c0] hover:underline",
                            children: "Terms"
                        }, void 0, false, {
                            fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this),
                        " ",
                        "&",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "",
                            target: "_blank",
                            rel: "noreferrer",
                            className: "text-[#00d9c0] hover:underline",
                            children: "Privacy"
                        }, void 0, false, {
                            fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/client/src/components/WalletConnectModal.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/client/src/components/WalletConnectModal.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client/src/components/WalletConnectModal.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(WalletConnectModal, "SXJPj8oIJ9VdfpHrOEKP3zpSNpw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$wallet$2f$WalletContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWallet"]
    ];
});
_c = WalletConnectModal;
var _c;
__turbopack_context__.k.register(_c, "WalletConnectModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/context/ConfigContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConfigProvider",
    ()=>ConfigProvider,
    "useConfig",
    ()=>useConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const fallbackConfig = {};
const Ctx = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function ConfigProvider({ value, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Ctx.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/client/src/context/ConfigContext.tsx",
        lineNumber: 11,
        columnNumber: 10
    }, this);
}
_c = ConfigProvider;
function useConfig() {
    _s();
    const v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(Ctx);
    // Return the fallback configuration if the provider is missing during static export/prerendering
    if (!v) {
        return fallbackConfig;
    }
    return v;
}
_s(useConfig, "vseRKStixtRCAgA7lJDFgCF8qLI=");
var _c;
__turbopack_context__.k.register(_c, "ConfigProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/context/FavoritesContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FavoritesProvider",
    ()=>FavoritesProvider,
    "useFavorites",
    ()=>useFavorites
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const FAV_KEY = "zedx_trade_favs";
const Ctx = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function FavoritesProvider({ children }) {
    _s();
    const [favs, setFavs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "FavoritesProvider.useState": ()=>{
            try {
                return new Set(JSON.parse(localStorage.getItem(FAV_KEY) || "[]"));
            } catch  {
                return new Set();
            }
        }
    }["FavoritesProvider.useState"]);
    const toggleFav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FavoritesProvider.useCallback[toggleFav]": (id)=>{
            setFavs({
                "FavoritesProvider.useCallback[toggleFav]": (prev)=>{
                    const next = new Set(prev);
                    if (next.has(id)) next.delete(id);
                    else next.add(id);
                    localStorage.setItem(FAV_KEY, JSON.stringify([
                        ...next
                    ]));
                    return next;
                }
            }["FavoritesProvider.useCallback[toggleFav]"]);
        }
    }["FavoritesProvider.useCallback[toggleFav]"], []);
    const isFav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FavoritesProvider.useCallback[isFav]": (id)=>favs.has(id)
    }["FavoritesProvider.useCallback[isFav]"], [
        favs
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FavoritesProvider.useMemo[value]": ()=>({
                favs,
                toggleFav,
                isFav
            })
    }["FavoritesProvider.useMemo[value]"], [
        favs,
        toggleFav,
        isFav
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Ctx.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/client/src/context/FavoritesContext.tsx",
        lineNumber: 32,
        columnNumber: 10
    }, this);
}
_s(FavoritesProvider, "BOnOHu9UBGv/X1odDEYjpb6SpQ8=");
_c = FavoritesProvider;
function useFavorites() {
    _s1();
    const v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(Ctx);
    if (!v) throw new Error("FavoritesProvider missing");
    return v;
}
_s1(useFavorites, "vseRKStixtRCAgA7lJDFgCF8qLI=");
var _c;
__turbopack_context__.k.register(_c, "FavoritesProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/context/MarketsStreamContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MarketsStreamProvider",
    ()=>MarketsStreamProvider,
    "useMarketsStream",
    ()=>useMarketsStream
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/client/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const StreamCtx = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    overview: null,
    connected: false
});
function wsUrl() {
    const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
    const backendHost = __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_WS_URL || '127.0.0.1:5000';
    return `${proto}//${backendHost}/ws/markets`;
}
function MarketsStreamProvider({ children }) {
    _s();
    const [overview, setOverview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [connected, setConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const alive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    const retryCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MarketsStreamProvider.useEffect": ()=>{
            alive.current = true;
            let ws = null;
            let retry;
            function connect() {
                try {
                    ws = new WebSocket(wsUrl());
                } catch  {
                    const delay = Math.min(2000 * Math.pow(2, retryCount.current), 10000);
                    retryCount.current++;
                    retry = setTimeout(connect, delay);
                    return;
                }
                ws.onopen = ({
                    "MarketsStreamProvider.useEffect.connect": ()=>{
                        if (alive.current) {
                            setConnected(true);
                            retryCount.current = 0;
                        }
                    }
                })["MarketsStreamProvider.useEffect.connect"];
                ws.onclose = ({
                    "MarketsStreamProvider.useEffect.connect": ()=>{
                        if (alive.current) {
                            setConnected(false);
                            const delay = Math.min(2000 * Math.pow(2, retryCount.current), 10000);
                            retryCount.current++;
                            retry = setTimeout(connect, delay);
                        }
                    }
                })["MarketsStreamProvider.useEffect.connect"];
                ws.onerror = ({
                    "MarketsStreamProvider.useEffect.connect": ()=>ws?.close()
                })["MarketsStreamProvider.useEffect.connect"];
                ws.onmessage = ({
                    "MarketsStreamProvider.useEffect.connect": (ev)=>{
                        try {
                            const msg = JSON.parse(ev.data);
                            if (msg.type === "snapshot" || msg.type === "tick") setOverview(msg.overview);
                        } catch  {}
                    }
                })["MarketsStreamProvider.useEffect.connect"];
            }
            connect();
            return ({
                "MarketsStreamProvider.useEffect": ()=>{
                    alive.current = false;
                    if (retry) clearTimeout(retry);
                    ws?.close();
                }
            })["MarketsStreamProvider.useEffect"];
        }
    }["MarketsStreamProvider.useEffect"], []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MarketsStreamProvider.useMemo[value]": ()=>({
                overview,
                connected
            })
    }["MarketsStreamProvider.useMemo[value]"], [
        overview,
        connected
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StreamCtx.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/client/src/context/MarketsStreamContext.tsx",
        lineNumber: 61,
        columnNumber: 10
    }, this);
}
_s(MarketsStreamProvider, "00rCnbzUuMLOwsX89QWPopn6T9s=");
_c = MarketsStreamProvider;
function useMarketsStream() {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(StreamCtx);
}
_s1(useMarketsStream, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "MarketsStreamProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/context/PaperTradeContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PaperTradeProvider",
    ()=>PaperTradeProvider,
    "usePaperTrade",
    ()=>usePaperTrade
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const LS_KEY = "zedx_paper_v1";
function load() {
    try {
        const raw = localStorage.getItem(LS_KEY);
        if (!raw) return {
            positions: [],
            orders: []
        };
        const j = JSON.parse(raw);
        return {
            positions: j.positions ?? [],
            orders: j.orders ?? []
        };
    } catch  {
        return {
            positions: [],
            orders: []
        };
    }
}
const PaperCtx = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function PaperTradeProvider({ children }) {
    _s();
    const [{ positions, orders }, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(load);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PaperTradeProvider.useEffect": ()=>{
            localStorage.setItem(LS_KEY, JSON.stringify({
                positions,
                orders
            }));
        }
    }["PaperTradeProvider.useEffect"], [
        positions,
        orders
    ]);
    const openOrders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PaperTradeProvider.useMemo[openOrders]": ()=>orders.filter({
                "PaperTradeProvider.useMemo[openOrders]": (o)=>o.status === "open"
            }["PaperTradeProvider.useMemo[openOrders]"])
    }["PaperTradeProvider.useMemo[openOrders]"], [
        orders
    ]);
    const placeMarket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PaperTradeProvider.useCallback[placeMarket]": (args)=>{
            if (!(args.sizeBase > 0) || !Number.isFinite(args.sizeBase)) return {
                error: "Invalid size"
            };
            const slip = args.side === "buy" ? 1.00025 : 0.99975;
            const fillPrice = args.markPrice * slip;
            const notional = fillPrice * args.sizeBase;
            const fee = notional * 0.0004;
            const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `p-${Date.now()}`;
            setState({
                "PaperTradeProvider.useCallback[placeMarket]": (s)=>({
                        ...s,
                        positions: [
                            ...s.positions,
                            {
                                id,
                                marketId: args.marketId,
                                pair: args.pair,
                                side: args.side === "buy" ? "long" : "short",
                                sizeBase: args.sizeBase,
                                entryPrice: fillPrice,
                                marginQuote: notional * 0.1 + fee,
                                openedAt: Date.now()
                            }
                        ]
                    })
            }["PaperTradeProvider.useCallback[placeMarket]"]);
            return {
                fillPrice,
                fee
            };
        }
    }["PaperTradeProvider.useCallback[placeMarket]"], []);
    const placeLimit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PaperTradeProvider.useCallback[placeLimit]": (args)=>{
            const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `o-${Date.now()}`;
            setState({
                "PaperTradeProvider.useCallback[placeLimit]": (s)=>({
                        ...s,
                        orders: [
                            ...s.orders,
                            {
                                id,
                                marketId: args.marketId,
                                pair: args.pair,
                                side: args.side,
                                orderType: "limit",
                                sizeBase: args.sizeBase,
                                limitPrice: args.limitPrice,
                                status: "open",
                                createdAt: Date.now()
                            }
                        ]
                    })
            }["PaperTradeProvider.useCallback[placeLimit]"]);
        }
    }["PaperTradeProvider.useCallback[placeLimit]"], []);
    const cancelOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PaperTradeProvider.useCallback[cancelOrder]": (id)=>{
            setState({
                "PaperTradeProvider.useCallback[cancelOrder]": (s)=>({
                        ...s,
                        orders: s.orders.map({
                            "PaperTradeProvider.useCallback[cancelOrder]": (o)=>o.id === id ? {
                                    ...o,
                                    status: "cancelled"
                                } : o
                        }["PaperTradeProvider.useCallback[cancelOrder]"])
                    })
            }["PaperTradeProvider.useCallback[cancelOrder]"]);
        }
    }["PaperTradeProvider.useCallback[cancelOrder]"], []);
    const closePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PaperTradeProvider.useCallback[closePosition]": (id, markPrice)=>{
            setState({
                "PaperTradeProvider.useCallback[closePosition]": (s)=>({
                        ...s,
                        positions: s.positions.filter({
                            "PaperTradeProvider.useCallback[closePosition]": (p)=>p.id !== id
                        }["PaperTradeProvider.useCallback[closePosition]"])
                    })
            }["PaperTradeProvider.useCallback[closePosition]"]);
            void markPrice;
        }
    }["PaperTradeProvider.useCallback[closePosition]"], []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PaperTradeProvider.useMemo[value]": ()=>({
                positions,
                openOrders,
                placeMarket,
                placeLimit,
                cancelOrder,
                closePosition
            })
    }["PaperTradeProvider.useMemo[value]"], [
        positions,
        openOrders,
        placeMarket,
        placeLimit,
        cancelOrder,
        closePosition
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PaperCtx.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/client/src/context/PaperTradeContext.tsx",
        lineNumber: 78,
        columnNumber: 10
    }, this);
}
_s(PaperTradeProvider, "193ZhVP8gBFygLgzzYTzKh5SMKk=");
_c = PaperTradeProvider;
function usePaperTrade() {
    _s1();
    const v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(PaperCtx);
    if (!v) throw new Error("PaperTradeProvider missing");
    return v;
}
_s1(usePaperTrade, "vseRKStixtRCAgA7lJDFgCF8qLI=");
var _c;
__turbopack_context__.k.register(_c, "PaperTradeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/wallet/WalletContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletProvider",
    ()=>WalletProvider,
    "useWallet",
    ()=>useWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/viem/_esm/clients/createPublicClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/viem/_esm/clients/createWalletClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$custom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/viem/_esm/clients/transports/custom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/viem/_esm/clients/transports/http.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$WalletConnectModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/components/WalletConnectModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$wallet$2f$walletCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/wallet/walletCatalog.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const Ctx = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
async function readChainId(eth) {
    try {
        return Number.parseInt(await eth.request({
            method: "eth_chainId"
        }), 16);
    } catch  {
        return undefined;
    }
}
function WalletProvider({ chain, rpcUrl, children }) {
    _s();
    const [eip1193Provider, setEip1193Provider] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [connectorLabel, setConnectorLabel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [address, setAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [walletChainId, setWalletChainId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [connectModalOpen, setConnectModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [connectError, setConnectError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [connectingId, setConnectingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [eip6963Announced, setEip6963Announced] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const publicClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WalletProvider.useMemo[publicClient]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createPublicClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPublicClient"])({
                chain,
                transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])(rpcUrl)
            })
    }["WalletProvider.useMemo[publicClient]"], [
        chain,
        rpcUrl
    ]);
    const walletClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WalletProvider.useMemo[walletClient]": ()=>{
            if (!eip1193Provider) return undefined;
            try {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$createWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createWalletClient"])({
                    chain,
                    transport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$custom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["custom"])(eip1193Provider)
                });
            } catch  {
                return undefined;
            }
        }
    }["WalletProvider.useMemo[walletClient]"], [
        chain,
        eip1193Provider
    ]);
    const refreshAccounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WalletProvider.useCallback[refreshAccounts]": async (provider)=>{
            const eth = provider;
            if (!eth?.request) {
                setAddress(undefined);
                setWalletChainId(undefined);
                return;
            }
            try {
                const acc = await eth.request({
                    method: "eth_accounts"
                });
                setAddress(acc[0]);
                setWalletChainId(await readChainId(eth));
            } catch  {
                setAddress(undefined);
                setWalletChainId(undefined);
            }
        }
    }["WalletProvider.useCallback[refreshAccounts]"], []);
    const eip6963MapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WalletProvider.useEffect": ()=>{
            const onAnn = {
                "WalletProvider.useEffect.onAnn": (ev)=>{
                    const d = ev.detail;
                    if (d?.info?.rdns) eip6963MapRef.current.set(d.info.rdns, d);
                    setEip6963Announced(Array.from(eip6963MapRef.current.values()));
                }
            }["WalletProvider.useEffect.onAnn"];
            window.addEventListener("eip6963:announceProvider", onAnn);
            window.dispatchEvent(new Event("eip6963:requestProvider"));
            return ({
                "WalletProvider.useEffect": ()=>window.removeEventListener("eip6963:announceProvider", onAnn)
            })["WalletProvider.useEffect"];
        }
    }["WalletProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WalletProvider.useEffect": ()=>{
            if (!eip1193Provider) return;
            const eth = eip1193Provider;
            const onAccounts = {
                "WalletProvider.useEffect.onAccounts": ()=>void refreshAccounts(eip1193Provider)
            }["WalletProvider.useEffect.onAccounts"];
            const onChain = {
                "WalletProvider.useEffect.onChain": ()=>void readChainId(eth).then(setWalletChainId)
            }["WalletProvider.useEffect.onChain"];
            eth.on?.("accountsChanged", onAccounts);
            eth.on?.("chainChanged", onChain);
            eth.on?.("disconnect", onAccounts);
            return ({
                "WalletProvider.useEffect": ()=>{
                    eth.removeListener?.("accountsChanged", onAccounts);
                    eth.removeListener?.("chainChanged", onChain);
                    eth.removeListener?.("disconnect", onAccounts);
                }
            })["WalletProvider.useEffect"];
        }
    }["WalletProvider.useEffect"], [
        eip1193Provider,
        refreshAccounts
    ]);
    const connectWithInjected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WalletProvider.useCallback[connectWithInjected]": async (provider, label, busyKey)=>{
            setConnectError(undefined);
            setError(undefined);
            setConnectingId(busyKey);
            const eth = provider;
            if (!eth?.request) {
                setConnectError("Wallet provider not available.");
                setConnectingId(null);
                return;
            }
            try {
                await eth.request({
                    method: "wallet_requestPermissions",
                    params: [
                        {
                            eth_accounts: {}
                        }
                    ]
                });
                const acc = await eth.request({
                    method: "eth_accounts"
                });
                setEip1193Provider(provider);
                setConnectorLabel(label);
                setAddress(acc[0]);
                setWalletChainId(await readChainId(eth));
                setConnectModalOpen(false);
            } catch (e) {
                setConnectError(e instanceof Error ? e.message : "Connection failed");
            } finally{
                setConnectingId(null);
            }
        }
    }["WalletProvider.useCallback[connectWithInjected]"], []);
    const connectWalletId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WalletProvider.useCallback[connectWalletId]": async (id)=>{
            const row = __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$wallet$2f$walletCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WALLET_CATALOG"].find({
                "WalletProvider.useCallback[connectWalletId].row": (w)=>w.id === id
            }["WalletProvider.useCallback[connectWalletId].row"]);
            const from6963 = row?.rdns ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$wallet$2f$walletCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findByRdns"])(row.rdns, eip6963Announced) : undefined;
            if (from6963) {
                await connectWithInjected(from6963, row?.name ?? id, id);
                return;
            }
            const injected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$wallet$2f$walletCatalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findInjectedForWalletId"])(id);
            if (injected) {
                await connectWithInjected(injected, row?.name ?? id, id);
                return;
            }
            setConnectError(`${row?.name ?? id} not detected. Install the browser extension to connect.`);
            if (row?.installUrl) window.open(row.installUrl, "_blank", "noopener,noreferrer");
        }
    }["WalletProvider.useCallback[connectWalletId]"], [
        connectWithInjected,
        eip6963Announced
    ]);
    const connectEip6963Provider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WalletProvider.useCallback[connectEip6963Provider]": async (entry)=>{
            await connectWithInjected(entry.provider, entry.info.name, `eip6963:${entry.info.uuid}`);
        }
    }["WalletProvider.useCallback[connectEip6963Provider]"], [
        connectWithInjected
    ]);
    const openConnectModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WalletProvider.useCallback[openConnectModal]": ()=>{
            setConnectError(undefined);
            setConnectModalOpen(true);
        }
    }["WalletProvider.useCallback[openConnectModal]"], []);
    const closeConnectModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WalletProvider.useCallback[closeConnectModal]": ()=>{
            setConnectModalOpen(false);
            setConnectError(undefined);
        }
    }["WalletProvider.useCallback[closeConnectModal]"], []);
    const disconnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WalletProvider.useCallback[disconnect]": ()=>{
            setEip1193Provider(undefined);
            setConnectorLabel(null);
            setAddress(undefined);
            setWalletChainId(undefined);
            setError(undefined);
        }
    }["WalletProvider.useCallback[disconnect]"], []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WalletProvider.useMemo[value]": ()=>({
                chain,
                rpcUrl,
                address,
                walletChainId,
                eip1193Provider,
                connectorLabel,
                connectModalOpen,
                openConnectModal,
                closeConnectModal,
                requestConnect: openConnectModal,
                connectWalletId,
                connectEip6963Provider,
                eip6963Announced,
                connectError,
                connectingId,
                disconnect,
                publicClient,
                walletClient,
                error
            })
    }["WalletProvider.useMemo[value]"], [
        chain,
        rpcUrl,
        address,
        walletChainId,
        eip1193Provider,
        connectorLabel,
        connectModalOpen,
        openConnectModal,
        closeConnectModal,
        connectWalletId,
        connectEip6963Provider,
        eip6963Announced,
        connectError,
        connectingId,
        disconnect,
        publicClient,
        walletClient,
        error
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Ctx.Provider, {
        value: value,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$WalletConnectModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletConnectModal"], {}, void 0, false, {
                fileName: "[project]/client/src/wallet/WalletContext.tsx",
                lineNumber: 126,
                columnNumber: 48
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client/src/wallet/WalletContext.tsx",
        lineNumber: 126,
        columnNumber: 10
    }, this);
}
_s(WalletProvider, "I0SHTOAYLp5yzXBbNaPEk9vRttc=");
_c = WalletProvider;
function useWallet() {
    _s1();
    const v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(Ctx);
    if (!v) throw new Error("WalletProvider missing");
    return v;
}
_s1(useWallet, "vseRKStixtRCAgA7lJDFgCF8qLI=");
var _c;
__turbopack_context__.k.register(_c, "WalletProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/wallet/walletBrandIcons.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletBrandIcon",
    ()=>WalletBrandIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
// In Next.js, public assets are served from /public — no BASE_URL needed
const WALLET_SRC = {
    metamask: "/wallets/metamask.svg",
    coinbase: "/wallets/coinbase.png",
    trust: "/wallets/trust.png",
    rainbow: "/wallets/rainbow.png",
    phantom: "/wallets/phantom.png",
    exodus: "/wallets/exodus.png",
    binance: "/wallets/binance.svg",
    safepal: "/wallets/safepal.png"
};
function WalletBrandIcon({ id }) {
    // eslint-disable-next-line @next/next/no-img-element
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
        src: WALLET_SRC[id],
        alt: "",
        width: 32,
        height: 32,
        className: "wc-brand-img",
        loading: "lazy",
        decoding: "async"
    }, void 0, false, {
        fileName: "[project]/client/src/wallet/walletBrandIcons.tsx",
        lineNumber: 19,
        columnNumber: 10
    }, this);
}
_c = WalletBrandIcon;
var _c;
__turbopack_context__.k.register(_c, "WalletBrandIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/wallet/walletCatalog.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WALLET_CATALOG",
    ()=>WALLET_CATALOG,
    "findBinance",
    ()=>findBinance,
    "findByRdns",
    ()=>findByRdns,
    "findCoinbase",
    ()=>findCoinbase,
    "findExodus",
    ()=>findExodus,
    "findInjectedForWalletId",
    ()=>findInjectedForWalletId,
    "findMetaMask",
    ()=>findMetaMask,
    "findPhantomEvm",
    ()=>findPhantomEvm,
    "findRainbow",
    ()=>findRainbow,
    "findSafePal",
    ()=>findSafePal,
    "findTrust",
    ()=>findTrust
]);
const WALLET_CATALOG = [
    {
        id: "metamask",
        name: "MetaMask",
        rdns: "io.metamask",
        installUrl: "https://metamask.io/download/"
    },
    {
        id: "coinbase",
        name: "Coinbase Wallet",
        rdns: "com.coinbase.wallet",
        installUrl: "https://www.coinbase.com/wallet"
    },
    {
        id: "trust",
        name: "Trust Wallet",
        rdns: "com.trustwallet.app",
        installUrl: "https://trustwallet.com/browser-extension"
    },
    {
        id: "rainbow",
        name: "Rainbow",
        rdns: "me.rainbow",
        installUrl: "https://rainbow.me/download"
    },
    {
        id: "phantom",
        name: "Phantom",
        rdns: "app.phantom",
        installUrl: "https://phantom.app/download"
    },
    {
        id: "exodus",
        name: "Exodus",
        installUrl: "https://www.exodus.com/browser-extension/"
    },
    {
        id: "binance",
        name: "Binance Wallet",
        installUrl: "https://www.binance.com/en/web3wallet"
    },
    {
        id: "safepal",
        name: "SafePal",
        installUrl: "https://www.safepal.com/download"
    }
];
function multiProviders() {
    const eth = ("TURBOPACK compile-time truthy", 1) ? window.ethereum : "TURBOPACK unreachable";
    if (!eth) return [];
    if (Array.isArray(eth.providers) && eth.providers.length > 0) return eth.providers;
    return [
        eth
    ];
}
const findMetaMask = ()=>multiProviders().find((p)=>p.isMetaMask === true);
const findCoinbase = ()=>multiProviders().find((p)=>p.isCoinbaseWallet === true);
const findTrust = ()=>multiProviders().find((p)=>p.isTrust === true || p.isTrustWallet === true);
const findRainbow = ()=>multiProviders().find((p)=>p.isRainbow === true);
const findPhantomEvm = ()=>window.phantom?.ethereum;
const findExodus = ()=>window.exodus?.ethereum;
const findBinance = ()=>multiProviders().find((p)=>p.isBinance === true);
const findSafePal = ()=>multiProviders().find((p)=>p.isSafePal === true);
function findInjectedForWalletId(id) {
    switch(id){
        case "metamask":
            return findMetaMask();
        case "coinbase":
            return findCoinbase();
        case "trust":
            return findTrust();
        case "rainbow":
            return findRainbow();
        case "phantom":
            return findPhantomEvm();
        case "exodus":
            return findExodus();
        case "binance":
            return findBinance();
        case "safepal":
            return findSafePal();
        default:
            return undefined;
    }
}
function findByRdns(rdns, entries) {
    return entries.find((e)=>e.info.rdns === rdns)?.provider;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]})(),
"[project]/client/src/app/providers.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/client/src/app/providers.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=client_src_0-k9kh66t9mt_._.js.map