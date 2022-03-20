import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import List from "@mui/icons-material/ListRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { curriculumCoursesCount } from "../../state/features/curriculum/reducers";

const Navigation = () => {
    const [value, setValue] = useState(0);
    const myCoursesCount = useSelector(curriculumCoursesCount);

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
                icon={
                    <Badge badgeContent={myCoursesCount} color="primary" data-testid="mycourses-badge">
                    <FavoriteIcon />
                    </Badge>
                }
                component={Link}
                to='/mis-cursos'
            />
        </BottomNavigation>
    );
};

export default Navigation;
