import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import List from "@mui/icons-material/ListRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";

const Navigation = () => {
    const [value, setValue] = useState(0);

    return (
        <BottomNavigation
            showLabels
            value={value}
            onChange={(_, value) => {
                setValue(value);
            }}
        >
            <BottomNavigationAction
                label="Catálogo"
                icon={<List />}
                component={Link}
                to='/'
            />
            <BottomNavigationAction
                label="Mis Cursos"
                icon={<FavoriteIcon />}
                component={Link}
                to='/mis-cursos'
            />
        </BottomNavigation>
    );
};

export default Navigation;
