import React, { useEffect } from "react";
import {
    Avatar,
    Box,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCurriculum,
    curriculumIsLoading,
    curriculumCourses,
    curriculumHasError,
} from "../state/features/curriculum/reducers";
import { CheckBoxRounded } from "@mui/icons-material";

const Curriculum = () => {
    const isCurriculumLoading = useSelector(curriculumIsLoading);
    const errorLoadingCurriculum = useSelector(curriculumHasError);
    const myCourses = useSelector(curriculumCourses);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurriculum());
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <h1>Mis Cursos</h1>
            {isCurriculumLoading && <CircularProgress role="loading" />}

            {!isCurriculumLoading && (
                <div className="div__curriculum" role="main">
                    {errorLoadingCurriculum && (
                        <p role="alert">
                            Ha habido un error al cargar los cursos
                        </p>
                    )}
                    {!errorLoadingCurriculum && myCourses.length === 0 && (
                        <p>No hay cursos disponibles</p>
                    )}
                    {!errorLoadingCurriculum && myCourses.length > 0 && (
                        <List
                            className="ul__courses-list"
                            sx={{ maxWidth: 600 }}
                        >
                            {myCourses.map((course) => (
                                <React.Fragment key={course.id}>
                                    <ListItem
                                        data-testid={`course-${course.id}`}
                                    >
                                        <ListItemText primary={course.name} />
                                    </ListItem>
                                </React.Fragment>
                            ))}
                        </List>
                    )}
                </div>
            )}
        </Box>
    );
};

export default Curriculum;
