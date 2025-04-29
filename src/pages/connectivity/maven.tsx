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
import {useMutation, useQuery} from "@tanstack/react-query";
import useWorkspacesService from "../../api/workspaces.ts";
import { WSApi } from "../../api/workspaces.ts";
import {useAuth} from "react-oidc-context";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import {useState} from "react";
import TextField from "@mui/material/TextField";

export default function MavenConnectivityPage() {
  const auth = useAuth();
  if (auth.isAuthenticated) {
    return <MavenConnectivityPageWhenAuthenticated/>;
  } else {
    return "Login required";
  }
}

function MavenConnectivityPageWhenAuthenticated() {
  const workspacesService = useWorkspacesService();
  const { isPending, error, data } = useQuery({
    queryKey: ["maven-repositories"],
    queryFn: () => workspacesService.getMavenConnectorConfig(),
  });

  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message
  
  return (
    <Stack spacing={4}>
      <Paper>
        <Toolbar sx={{pl: 3, pr: 3}}>
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
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.repositories?.map((repo, index) => {
                return <RepositoryRow key={repo.id} repo={repo} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper>
        <Toolbar sx={{pl: 3, pr: 3}}>
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
              {data?.artifacts?.map((artifact, index) => {
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

function RepositoryRow({ repo }: { repo: WSApi.MavenRepository }) {
  const [editing, updateEditing] = useState(false);
  const [editedUrl, updateUrl] = useState(repo.url);
  const workspacesService = useWorkspacesService();
  const sendUpdate = useMutation({
    mutationFn: () => {
      return workspacesService.updateMavenRepository({
        repositoryId: repo.id!,
        mavenRepository: {
          ...repo,
          url: editedUrl
        }
      })
    }
  })

  function handleDelete() {}
  function save() {
    updateEditing(false);
    sendUpdate.mutate();
  }

  return (
    <TableRow key={repo.id}>
      <TableCell>{repo.id}</TableCell>
      <TableCell>{
        editing
            ? <TextField fullWidth value={editedUrl} onChange={(e) => updateUrl(e.target.value)}/>
            : repo.url
      }</TableCell>
      <TableCell align="right">
        {
          editing
              ? <IconButton onClick={save}>
                  <CheckIcon/>
                </IconButton>
              : <IconButton onClick={() => updateEditing(true)}>
                  <EditIcon />
                </IconButton>
        }
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}