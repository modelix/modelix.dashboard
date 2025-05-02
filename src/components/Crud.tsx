import {Component, ReactElement, ReactNode} from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

interface CrudProps<E> {
  title?: string,
  initialData: E[],
  onChange: (data: E[]) => void,
  itemSummary: (element: E) => ReactNode,
  itemDetails: (element: E) => ReactNode,
  itemFactory: () => E
}

export class Crud<E> extends Component<CrudProps<E>, {
  modifiedData: E[] | null,
  expandedItem: number | null,
}> {

  constructor(props: CrudProps<E>) {
    super(props);
    this.state = {
      modifiedData: null,
      expandedItem: null,
    };
  }

  render() {
    const list = this.state?.modifiedData ?? this.props.initialData;

    return <Box>
      { this.props.title !== undefined && <Typography variant="h5">{this.props.title}</Typography> }
      {list.map((element, index) =>
          <Box key={index}>
            {this.props.itemSummary(element)}
            <Collapse in={this.state?.expandedItem === index} timeout="auto" unmountOnExit>
              {this.props.itemDetails(element)}
            </Collapse>
          </Box>
      )}
    </Box>;
  }
}
