import {Component} from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

interface MavenRepository {
  id: string,
  url: string
}

interface MavenArtifact {
  groupId: string
  artifactId: string
  version: string
}

export default class MavenConnectivityPage extends Component<{}, {
  repositories: MavenRepository[],
  artifacts: MavenArtifact[]
}> {

  constructor(props: {}) {
    super(props);
    this.state = {
      repositories: [
        {id: "itemis", url: "https://artifacts.itemis.cloud/"}
      ],
      artifacts: [
        {groupId: "com.jetbrains", artifactId: "mps", version: "2024.1.1"}
      ],
    };
  }

  render() {
    return (
      <Stack spacing={4}>
        <Paper>
          <Toolbar sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}>
            <Typography sx={{ flex: '1 1 100%' }} component="div" variant="h5">Repositories</Typography>
            <Tooltip title="Add New Repository">
              <Button variant="contained" startIcon={<AddIcon/>}>
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
                {
                  this.state.repositories.map(repo => {
                    return <TableRow>
                      <TableCell>{repo.id}</TableCell>
                      <TableCell>{repo.url}</TableCell>
                    </TableRow>
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Paper>
          <Toolbar sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}>
            <Typography sx={{ flex: '1 1 100%' }} component="div" variant="h5">Artifacts</Typography>
            <Tooltip title="Add New Artifact">
              <Button variant="contained" startIcon={<AddIcon/>}>
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
                {
                  this.state.artifacts.map(artifact => {
                    return <TableRow>
                      <TableCell>{artifact.groupId}</TableCell>
                      <TableCell>{artifact.artifactId}</TableCell>
                      <TableCell>{artifact.version}</TableCell>
                    </TableRow>
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Stack>
    );
  }
}