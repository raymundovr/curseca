import React, { useEffect, useState } from "react";
import {
    Box,
    CircularProgress,
    Divider,
    List,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    courses,
    fetchCatalogue,
    hasError,
    isLoading,
} from "../state/features/catalogue/reducers";
import { addCourseToCurriculum, fetchCurriculum, curriculumIsLoading, curriculumCourses } from "../state/features/curriculum/reducers";
import CourseItem from "../common/components/CourseItem";

const Catalogue = () => {
    const isCatalogueLoading = useSelector(isLoading);
    const coursesInCatalogue = useSelector(courses);
    const hasErrorFetching = useSelector(hasError);
    const isCurriculumLoading = useSelector(curriculumIsLoading);
    const myCourses = useSelector(curriculumCourses);
    const dispatch = useDispatch();
    const [showCatalogue, setShowCatalogue] = useState(false);

    useEffect(() => {
        dispatch(fetchCatalogue());
        dispatch(fetchCurriculum());
    }, []);

    const addCourseToMyCurriculum = (id: string) => {
        dispatch(addCourseToCurriculum(id));
    };

    useEffect(() => {
        setShowCatalogue(!isCatalogueLoading && !isCurriculumLoading);
    }, [isCatalogueLoading, isCurriculumLoading]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <h1>Catálogo de Cursos</h1>
            {!showCatalogue && <CircularProgress role="loading" />}

            {showCatalogue && (
                <div className="div__catalogue" role="main">
                    {hasErrorFetching && (
                        <p role="alert">
                            Ha habido un error al cargar el catálogo
                        </p>
                    )}
                    {!hasErrorFetching && coursesInCatalogue.length === 0 && (
                        <p>No hay cursos disponibles</p>
                    )}
                    {!hasErrorFetching && coursesInCatalogue.length > 0 && (
                        <List
                            className="ul__courses-list"
                            sx={{ maxWidth: 600 }}
                        >
                            {coursesInCatalogue.map((course) => (
                                <React.Fragment key={course.id}>
                                    <CourseItem
                                        alreadyInMyCurriculum={ !!myCourses.find(c => c.id === course.id) }
                                        course={course}
                                        handleAddAction={addCourseToMyCurriculum}
                                    />
                                    <Divider variant="inset" component="li" />
                                </React.Fragment>
                            ))}
                        </List>
                    )}
                </div>
            )}
        </Box>
    );
};

export default Catalogue;
