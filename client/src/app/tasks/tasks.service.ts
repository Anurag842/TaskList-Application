import { Injectable } from "@angular/core";
import {HttpClient,HttpParams, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";

import {Task} from "./task";
import {HttpErrorHandler, HandleError} from "../http-error-handler.service";

@Injectable()
export class TasksService{
    private handleError: HandleError;
    constructor(private http:HttpClient, httpErrorHandler: HttpErrorHandler){
        this.handleError = httpErrorHandler.createHandleError("TaskService");
    }
    getTasks(): Observable<Task[]>{
        return this.http
        .get<Task[]>("http://127.0.0.1:3000/api/tasks")
        .pipe(catchError(this.handleError("getTasks",[])));
    }

    addTask(task: Task): Observable<Task> {
        return this.http
        .post<Task>("http://127.0.0.1:3000/api/tasks",task)
        .pipe(catchError(this.handleError("addTasks",task)));
    }
    
    deleteTask(id:number) : Observable <{}>{
        const url =`http://127.0.0.1:3000/api/task/${id}`;
        return this.http
        .delete(url)
        .pipe(catchError(this.handleError("deleteTask")));
    }

    updateTask(task : Task) : Observable<Task>{
        return this.http
        .put<Task>(`http://127.0.0.1:3000/api/task/${task._id}`,task)
        .pipe(catchError(this.handleError("updateTask", task)));
    }
}