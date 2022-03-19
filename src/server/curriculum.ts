import { Course } from "../common/types";

export const curriculum: Course[] = [];

export const addCourse = (course: Course) => {
    curriculum.push(course);
    return curriculum;
};