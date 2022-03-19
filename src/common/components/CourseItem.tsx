import { School } from '@mui/icons-material';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import React from 'react';
import { Course } from '../types';

interface OwnProps {
    course: Course;
}

const CourseItem = ({ course }: OwnProps) => (<ListItem
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
</ListItem>);

export default CourseItem;
