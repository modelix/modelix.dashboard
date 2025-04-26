import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";

interface MavenRepository {
  id: string;
  url: string;
}

interface MavenArtifact {
  groupId: string;
  artifactId: string;
  version?: string;
}

interface MavenConfig {
  repositories: MavenRepository[];
  artifacts: MavenArtifact[];
}

export default function MavenConnectivityPage() {
  const auth = useAuth();
  const query = useQuery({
    queryKey: ["maven-repositories"],
    queryFn: () =>
      fetch("http://localhost/modelix/workspaces/connectivity/maven", {
        headers: {
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      }).then((res) => res.json() as Promise<MavenConfig>),
  });
  const { isPending, error, data } = query;

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  if (data === undefined) return "No data received"

  return (
    <Stack spacing={4}>
      <Paper>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <Typography sx={{ flex: "1 1 100%" }} component="div" variant="h5">
            Repositories
          </Typography>
          <Tooltip title="Add New Repository">
            <Button variant="contained" startIcon={<AddIcon />}>
              Add
            </Button>
          </Tooltip>
        </Toolbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>URL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { data.repositories.map((repo, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{repo.id}</TableCell>
                    <TableCell>{repo.url}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <Typography sx={{ flex: "1 1 100%" }} component="div" variant="h5">
            Artifacts
          </Typography>
          <Tooltip title="Add New Artifact">
            <Button variant="contained" startIcon={<AddIcon />}>
              Add
            </Button>
          </Tooltip>
        </Toolbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Group</TableCell>
                <TableCell>Artifact</TableCell>
                <TableCell>Version</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.artifacts.map((artifact, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{artifact.groupId}</TableCell>
                    <TableCell>{artifact.artifactId}</TableCell>
                    <TableCell>{artifact.version}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Stack>
  );
}