import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {Student} from './student';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class StudentService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getAllStudents(): Observable<Student[]>{
        return this.http.get<Student[]>(`${this.apiServerUrl}/studentapp/v1/students`);
    }

    public addStudent(student: Student): Observable<Student>{
        return this.http.post<Student>(`${this.apiServerUrl}/studentapp/v1/addstudent`, student);
    }

    public updateStudent(student: Student): Observable<Student>{
        return this.http.put<Student>(`${this.apiServerUrl}/studentapp/v1//update`, student);
    }

    public deleteStudent(studentId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/studentapp/v1/delete/${studentId}`);
    }
}