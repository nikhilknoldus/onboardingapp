import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Student } from '../_models/students'

@Injectable()
export class StudentService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Student[]>(`${environment.apiUrl}/student-list`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/student-onboard/` + id);
    }

    register(student: Student) {
        return this.http.post(`${environment.apiUrl}/student-onboard`, student);
    }

    update(student: Student) {
        return this.http.put(`${environment.apiUrl}/student-onboard/${student.id}`, student);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/student-list/` + id);
    }
}