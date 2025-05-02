import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: "../modelix.openapi/redocly/build/joined.yaml",
  apiFile: "./src/api/emptyApi.ts",
  apiImport: "emptySplitApi",
  outputFile: "./src/api/workspacesApi.ts",
  exportName: "workspacesApi",
  hooks: true,
  tag: true,
}

export default config
