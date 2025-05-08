import ScrollTop from "./components/ScrollTop";

import ThemeCustomization from "./themes";
import { BrowserRouter, Route, Routes, useParams } from "react-router";
import MavenConnectivityPage from "./pages/connectivity/maven.tsx";
import DashboardLayout from "./layout/Dashboard";
import GitConnectivityPage from "./pages/connectivity/git.tsx";
import UploadsConnectivityPage from "./pages/connectivity/uploads.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Typography from "@mui/material/Typography";
import { useAuth } from "react-oidc-context";
import WorkspacesList from "./pages/workspaces/workspaces.tsx";

const queryClient = new QueryClient();

export default function App() {
  const auth = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeCustomization>
        <ScrollTop>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
              <Route path="/" element={<DashboardLayout />}>
                <Route index element={<div>Home</div>} />
                <Route path="connectivity">
                  <Route path="maven" element={<MavenConnectivityPage />} />
                  <Route path="git" element={<GitConnectivityPage />} />
                  <Route path="uploads" element={<UploadsConnectivityPage />} />
                </Route>
                <Route path="workspaces">
                  <Route path="workspaces" element={<WorkspacesList />} />
                  <Route path="instances">
                    <Route path=":instanceId">
                      <Route path="mps">
                        <Route index element={<InstanceMpsUI />} />
                      </Route>
                    </Route>
                  </Route>
                </Route>
                <Route
                  path="jwt"
                  element={
                    <Typography>
                      {auth.user?.access_token ?? auth.user?.id_token}
                    </Typography>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </ScrollTop>
      </ThemeCustomization>
    </QueryClientProvider>
  );
}

function InstanceMpsUI() {
  const { instanceId } = useParams();
  return <iframe src="https://modelix.org/"></iframe>;
}
