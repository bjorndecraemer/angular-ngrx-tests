import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CoursesState} from "./course.reducers";

export const selectCoursesState = createFeatureSelector<CoursesState>("courses");

export const selectCourseById = (courseId : number) => createSelector(
  selectCoursesState,
  coursesState => coursesState.entities[courseId]
)
