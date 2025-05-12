import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {
  DraftConfig,
  useListDraftsInRepositoryQuery,
} from "../../../api/gitConnectorApi.ts";
import IconButton from "@mui/material/IconButton";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

export function DraftsTable({ repositoryId }: { repositoryId: string }) {
  const draftsQuery = useListDraftsInRepositoryQuery(
    { repositoryId: repositoryId },
    { pollingInterval: 3000 },
  );

  if (draftsQuery.isLoading) return "Loading...";
  if (draftsQuery.isError) return "Error: " + JSON.stringify(draftsQuery.error);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Branch</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {(draftsQuery.data?.drafts ?? []).map((draft) => (
          <DraftRow key={draft.id} draft={draft} />
        ))}
      </TableBody>
    </Table>
  );
}

function DraftRow({ draft }: { draft: DraftConfig }) {
  return (
    <TableRow>
      <TableCell>{draft.id}</TableCell>
      <TableCell>{draft.gitBranchName}</TableCell>
    </TableRow>
  );
}
