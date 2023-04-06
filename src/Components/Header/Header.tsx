import * as Styled from './styles';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  return (
    <Styled.Header justify="space-between">
      <MenuIcon sx={{ fontSize: 30, color: 'white', cursor: 'pointer' }} />
      <Styled.Title>CineGuessr</Styled.Title>
      <SettingsIcon sx={{ fontSize: 30, color: 'white', cursor: 'pointer' }} />
    </Styled.Header>
  );
};

export default Header;
