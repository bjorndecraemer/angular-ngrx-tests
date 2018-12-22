


import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Course} from "../model/course";
import {Observable} from "rxjs";
import {CoursesService} from "./courses.service";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../reducers";
import {selectCourseById} from "../course.selectors";
import {filter, first, tap} from "rxjs/operators";
import {CourseRequested} from "../courses.actions";



@Injectable()
export class CourseResolver implements Resolve<Course> {

    constructor(private coursesService:CoursesService, private store : Store<AppState>) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
        const courseId = route.params['id'];
       return this.store.pipe(
         select(selectCourseById(courseId)),
         tap(course => {
           if(!course){
             this.store.dispatch(new CourseRequested({courseId}));
           }
         }),
         filter(course => !!course),
         first()
       )
    }

}

