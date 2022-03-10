import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { courses, fetchCatalogue, hasError } from "../state/features/catalogue/reducers";

const Catalogue = () => {
    const coursesInCatalogue = useSelector(courses);
    const hasErrorFetching = useSelector(hasError);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchCatalogue());
    }, []);

    return (
        <Box>
            <h1>Catálogo</h1>
            { hasErrorFetching && <p role="alert">Ha habido un error al cargar el catálogo</p> }
            { coursesInCatalogue.length === 0 && (
                <p>No hay cursos disponibles</p>
            )}
            { coursesInCatalogue.length > 0 && (
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
