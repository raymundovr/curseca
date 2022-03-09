import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { courses, fetchCatalogue } from "../state/features/catalogue/reducers";

const Catalogue = () => {
    const coursesInCatalogue = useSelector(courses);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchCatalogue());
    }, []);

    return (
        <Box>
            <h1>Catálogo</h1>
            {coursesInCatalogue.length === 0 && (
                <p>No hay cursos disponibles</p>
            )}
            {coursesInCatalogue.length > 0 && (
                <ul
                    className="ul__courses-list"
                    data-testid="courses-list"
                >
                    { coursesInCatalogue.map(course => <li data-testid={course.id}>{course.name}</li>) }
                </ul>
            )}
        </Box>
    );
};

export default Catalogue;
