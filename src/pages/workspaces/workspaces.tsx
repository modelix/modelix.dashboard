import {
  GitRepository,
  useDeleteWorkspaceMutation,
  useListWorkspacesQuery,
  useUpdateWorkspaceMutation,
  WorkspaceConfig,
} from "../../api/workspacesApi.ts";
import Typography from "@mui/material/Typography";
import { Fragment, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { Select } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Collapse from "@mui/material/Collapse";
import MenuItem from "@mui/material/MenuItem";
import CancelIcon from "@mui/icons-material/Cancel";
import Divider from "@mui/material/Divider";

export default function WorkspacesList() {
  const workspaceListQuery = useListWorkspacesQuery(undefined, {
    pollingInterval: 5000,
  });

  if (workspaceListQuery.isLoading) return "Loading...";
  if (workspaceListQuery.isError) {
    return (
      "An error has occurred: " +
      JSON.stringify(workspaceListQuery.error, null, 2)
    );
  }

  return (
    <WorkspacesTable workspaces={workspaceListQuery.data?.workspaces ?? []} />
  );
}

function WorkspacesTable({ workspaces }: { workspaces: WorkspaceConfig[] }) {
  return (
    <Grid container spacing={2} columns={{ xs: 4, sm: 8, lg: 12 }}>
      {workspaces?.map((workspace, index) => {
        return <WorkspaceCard key={workspace.id} workspace={workspace} />;
      })}
    </Grid>
  );
}

function WorkspaceCard({ workspace }: { workspace: WorkspaceConfig }) {
  const [expanded, setExpanded] = useState(false);
  const [modifiedData, setModifiedData] = useState<WorkspaceConfig | null>(
    null,
  );
  const [sendUpdate, mutationResult] = useUpdateWorkspaceMutation();
  const [deleteWorkspace, deletionResult] = useDeleteWorkspaceMutation();
  const editingMode = modifiedData !== null;
  const dataToShow = modifiedData ?? workspace;

  function handleDelete() {
    if (workspace) {
      deleteWorkspace({ workspaceId: workspace.id });
    }
  }
  function save() {
    if (modifiedData !== null) {
      sendUpdate({
        workspaceId: modifiedData.id,
        workspaceConfig: modifiedData,
      }).then(() => setModifiedData(null));
    }
  }

  const reposWithNewOne: GitRepository[] = dataToShow.gitRepositories.concat({
    url: "",
  });

  return (
    <Grid size="auto">
      <Card>
        <CardHeader
          title={workspace.name}
          action={
            <>
              {mutationResult.isLoading ? (
                <IconButton disabled>
                  <HourglassEmptyIcon />
                </IconButton>
              ) : editingMode ? (
                <IconButton onClick={save}>
                  <CheckIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => setModifiedData(workspace)}>
                  <EditIcon />
                </IconButton>
              )}
              {deletionResult.isLoading ? (
                <IconButton disabled>
                  <HourglassEmptyIcon />
                </IconButton>
              ) : (
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              )}
              {editingMode ? (
                <IconButton onClick={() => setModifiedData(null)}>
                  <CancelIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => setExpanded(!expanded)}>
                  {expanded || editingMode ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </IconButton>
              )}
            </>
          }
        />
        <CardContent>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "max-content 1fr",
              columnGap: 3,
              rowGap: 1,
              alignItems: "center",
            }}
          >
            <Typography color="textSecondary" sx={{ gridColumnStart: 1 }}>
              ID
            </Typography>
            <Typography>{workspace.id}</Typography>
            <Typography color="textSecondary" sx={{ gridColumnStart: 1 }}>
              MPS Version
            </Typography>
            <Typography>{workspace.mpsVersion}</Typography>
            {workspace.gitRepositories.map((repo) => (
              <Fragment key={repo.url}>
                <Typography color="textSecondary" sx={{ gridColumnStart: 1 }}>
                  Git
                </Typography>
                <Typography>{repo.url}</Typography>
              </Fragment>
            ))}
          </Box>
        </CardContent>
        <Collapse in={expanded || editingMode} timeout="auto" unmountOnExit>
          <Divider />
          <CardContent>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "max-content 200px 200px",
                columnGap: 3,
                rowGap: 1,
              }}
            >
              <Typography color="textSecondary" sx={{ gridColumnStart: 1 }}>
                Name
              </Typography>
              <TextField
                value={dataToShow.name}
                onChange={(e) =>
                  setModifiedData({ ...dataToShow, name: e.target.value ?? "" })
                }
              />
              <Typography color="textSecondary" sx={{ gridColumnStart: 1 }}>
                MPS Version
              </Typography>
              <Select
                value={dataToShow.mpsVersion}
                onChange={(e) =>
                  setModifiedData({
                    ...dataToShow,
                    mpsVersion: e.target.value ?? "",
                  })
                }
              >
                {[
                  "2024.1",
                  "2023.3",
                  "2023.2",
                  "2022.3",
                  "2021.3",
                  "2021.2",
                  "2021.1",
                  "2020.3",
                ].map((v) => (
                  <MenuItem key={v} value={v}>
                    {v}
                  </MenuItem>
                ))}
              </Select>
              <Typography color="textSecondary" sx={{ gridColumnStart: 1 }}>
                Git Repositories
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr max-content",
                  columnGap: 1,
                  rowGap: 1,
                  alignItems: "center",
                  gridColumnStart: 2,
                  gridColumnEnd: "end",
                }}
              >
                {reposWithNewOne.map((repo, index) => (
                  <>
                    <TextField
                      key={index}
                      sx={{ gridColumnStart: 1 }}
                      label={
                        index === reposWithNewOne.length - 1
                          ? "Add Repository"
                          : undefined
                      }
                      value={repo.url}
                      onChange={(e) =>
                        setModifiedData({
                          ...dataToShow,
                          gitRepositories: (index === reposWithNewOne.length - 1
                            ? reposWithNewOne
                            : dataToShow.gitRepositories
                          ).map((r, i) =>
                            i === index ? { ...r, url: e.target.value } : r,
                          ),
                        })
                      }
                    />
                    {index < reposWithNewOne.length - 1 && (
                      <IconButton
                        onClick={() =>
                          setModifiedData({
                            ...dataToShow,
                            gitRepositories: dataToShow.gitRepositories.filter(
                              (_, i) => i !== index,
                            ),
                          })
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </>
                ))}
              </Box>
              <Typography color="textSecondary" sx={{ gridColumnStart: 1 }}>
                Memory Limit
              </Typography>
              <TextField
                value={dataToShow.memoryLimit}
                onChange={(e) =>
                  setModifiedData({
                    ...dataToShow,
                    memoryLimit: e.target.value ?? "",
                  })
                }
              />
            </Box>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
