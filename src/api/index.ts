// API Calls

import { Course } from "../common/types";

export async function get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return response.json() as unknown as T;
};

export const getCatalogue = () => get<Course[]>('/course');
