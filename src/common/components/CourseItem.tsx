import React, { useState } from "react";
import { AddBoxRounded, Check } from "@mui/icons-material";
import {
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";
import { Course } from "../types";

interface OwnProps {
    alreadyInMyCurriculum: boolean;
    course: Course;
    handleAddAction: (id: string) => void;
}

const CourseItem = ({
    alreadyInMyCurriculum,
    course,
    handleAddAction,
}: OwnProps) => {
    const [isDisabled, setIsDisabled] = useState(false);

    return (
        <ListItem data-testid={`course-${course.id}`} key={course.id}>
            <ListItemText
                primary={course.name}
                secondary={course.description}
            />
            <ListItemAvatar>
                {alreadyInMyCurriculum && <Check data-testid={`added-course-${course.id}`} />}
                {!alreadyInMyCurriculum && (
                    <IconButton
                        color="primary"
                        aria-label="add course"
                        data-testid={`add-course-${course.id}`}
                        disabled={isDisabled}
                        onClick={() => {
                            setIsDisabled(true);
                            handleAddAction(course.id);
                        }}
                    >
                        <AddBoxRounded />
                    </IconButton>
                )}
            </ListItemAvatar>
        </ListItem>
    );
};

export default CourseItem;
