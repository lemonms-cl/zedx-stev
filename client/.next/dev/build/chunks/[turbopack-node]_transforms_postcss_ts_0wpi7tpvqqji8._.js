module.exports = [
"[turbopack-node]/transforms/postcss.ts?config=[project]/client/postcss.config.cjs { CONFIG => \"[project]/client/postcss.config.cjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "chunks/097k_1pwlx4ga8m_ow._.js",
  "chunks/[root-of-the-server]__1gzwd2wgapsxw._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts?config=[project]/client/postcss.config.cjs { CONFIG => \"[project]/client/postcss.config.cjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];