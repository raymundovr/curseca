// API Calls
import axios from "axios";
import { Course } from "../common/types";

export async function get<T>(url: string): Promise<T> {
    const response = await axios.get(url);
    return response.data as unknown as T;
};

export async function post<T>(url: string, data?: any): Promise<T> {
    const response = await axios.post(url, data);
    return response.data as unknown as T;
};

export const getCatalogue = () => get<Course[]>('/courses');
export const getMyCourses = () => get<Course[]>('/curriculum');
export const addToMyCourses = (courseId: string) => post<Course>(`/curriculum/${courseId}`);
