export const imports = {
  'src/components/Doc/Dynamic.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-doc-dynamic" */ 'src/components/Doc/Dynamic.mdx'),
  'src/components/Doc/OriginSearch.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-doc-origin-search" */ 'src/components/Doc/OriginSearch.mdx'),
  'src/components/Doc/index.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-doc-index" */ 'src/components/Doc/index.mdx'),
}
