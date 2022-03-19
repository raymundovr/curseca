import React from "react";
import { AddBoxRounded } from "@mui/icons-material";
import {
    Avatar,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";
import { Course } from "../types";

interface OwnProps {
    course: Course;
}

const CourseItem = ({ course }: OwnProps) => (
    <ListItem data-testid={`course-${course.id}`} key={course.id}>
        <ListItemText primary={course.name} secondary={course.description} />
        <ListItemAvatar>
            <IconButton
                color="primary"
                aria-label="add course"
                data-testid={`add-course-${course.id}`}
            >
                <AddBoxRounded />
            </IconButton>
        </ListItemAvatar>
    </ListItem>
);

export default CourseItem;
