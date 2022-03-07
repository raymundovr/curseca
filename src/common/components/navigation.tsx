import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import List from '@mui/icons-material/ListRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Navigation = () => {
  const [value, setValue] = React.useState(0);

  return (
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Catálogo" icon={<List />} />
        <BottomNavigationAction label="Mis Cursos" icon={<FavoriteIcon />} />
      </BottomNavigation>
  );
};

export default Navigation;
