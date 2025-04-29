import {AuthContextProps, useAuth} from "react-oidc-context";
import * as WSApi from "../../../modelix.workspaces/workspace-manager-openapi/build/generate/typescript-fetch/index.ts";

class MyMiddleware implements WSApi.Middleware {
  constructor(private auth: AuthContextProps) {
  }
  async pre(context: WSApi.RequestContext): Promise<WSApi.FetchParams | void> {
    return {
      url: context.url,
      init: {
        ...context.init,
        headers: {
          ...context.init.headers,
          Authorization: `Bearer ${this.auth.user?.access_token}`,
        }
      }
    }
  }
}

export * as WSApi from "../../../modelix.workspaces/workspace-manager-openapi/build/generate/typescript-fetch/index.ts";

export default function useWorkspacesService() {
  const auth = useAuth();
  const apiConfig = new WSApi.Configuration({
    basePath: "http://localhost/modelix/workspaces",
    middleware: [new MyMiddleware(auth)]
  });
  return new WSApi.DefaultApi(apiConfig);
}
