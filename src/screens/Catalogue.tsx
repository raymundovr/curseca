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
    courses,
    fetchCatalogue,
    hasError,
    isLoading,
} from "../state/features/catalogue/reducers";
import { School } from "@mui/icons-material";

const Catalogue = () => {
    const isCatalogueLoading = useSelector(isLoading);
    const coursesInCatalogue = useSelector(courses);
    const hasErrorFetching = useSelector(hasError);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCatalogue());
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <h1>Catálogo de Cursos</h1>
            {isCatalogueLoading && <CircularProgress role="loading" />}

            {!isCatalogueLoading && (
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
                            data-testid="courses-list"
                            sx={{ maxWidth: 600 }}
                        >
                            {coursesInCatalogue.map((course) => (
                                <React.Fragment key={course.id}>
                                    <ListItem
                                        data-testid={`course-${course.id}`}
                                        key={course.id}
                                    >
                                        <ListItemAvatar>
                                            <Avatar>
                                                <School color="primary" />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={course.name}
                                            secondary={course.description}
                                        />
                                    </ListItem>
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
