export const imports = {
  'src/components/Doc/Dynamic.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-doc-dynamic" */ 'src/components/Doc/Dynamic.mdx'),
}
