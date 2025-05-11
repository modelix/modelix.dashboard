import {BranchNode, buildBranchTree} from "./BranchTree.ts";
import {useState} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {GitBranchStatusData, useGetGitRepositoryStatusQuery} from "../../../api/gitConnectorApi.ts";

export function BranchesTable({repositoryId}: { repositoryId: string }) {
  const statusQuery = useGetGitRepositoryStatusQuery(
      {repositoryId: repositoryId},
      {pollingInterval: 5000},
  );

  if (statusQuery.isLoading) return "Loading...";
  if (statusQuery.isError) return "Error: " + JSON.stringify(statusQuery.error);

  const branchTree = buildBranchTree(statusQuery.data?.branches ?? []);

  return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Hash</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(branchTree.children ?? []).map((child) => (
              <BranchGroup key={child.namePart} node={child}/>
          ))}
        </TableBody>
      </Table>
  );
}

function BranchGroup({node}: { node: BranchNode }) {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
      <>
        <TableRow key={node.namePart}>
          <TableCell onClick={() => setExpanded(!expanded)}>
            <Box sx={{paddingLeft: node.depth * 2}}>
              {node.children.length > 0 ? (
                  <IconButton>
                    {expanded ? <ArrowDropDownIcon/> : <ArrowRightIcon/>}
                  </IconButton>
              ) : (
                  <Box sx={{display: "inline-flex", width: "36px"}}/>
              )}
              {node.namePart}
            </Box>
          </TableCell>
          <TableCell>{node.branchData?.gitCommitHash?.substring(0, 7)}</TableCell>
        </TableRow>
        {expanded &&
            node.children.map((child, index) => (
                <BranchGroup key={node.namePart} node={child}/>
            ))}
      </>
  );
}

function BranchRow({branch}: { branch: GitBranchStatusData }) {
  return (
      <TableRow key={branch.name}>
        <TableCell>{branch.name}</TableCell>
        <TableCell>{branch.gitCommitHash?.substring(0, 7)}</TableCell>
      </TableRow>
  );
}