import { Link } from 'react-router-dom';
import ButtonBase from '@mui/material/ButtonBase';
import Logo from './LogoMain';
import LogoIcon from './LogoIcon';
import { APP_DEFAULT_PATH } from '../../config';
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {Path} from "react-router";

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection({ reverse, isIcon, sx, to }: { reverse: boolean; isIcon: boolean; sx: SxProps<Theme>; to: string | Partial<Path> }) {
  return (
    <ButtonBase disableRipple component={Link} to={to || APP_DEFAULT_PATH} sx={sx}>
      {isIcon ? <LogoIcon /> : <Logo reverse={reverse} />}
    </ButtonBase>
  );
}
