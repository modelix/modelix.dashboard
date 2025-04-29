import {useAuth} from "react-oidc-context";
import * as modelixApi from "@modelix/api-client-ts-axios";

export default function useWorkspacesService() {
  const auth = useAuth();
  const apiConfig = new modelixApi.Configuration({
    basePath: "http://localhost",
    accessToken: auth.user?.access_token
  })
  return modelixApi.MavenConnectorApiFactory(apiConfig)
}
