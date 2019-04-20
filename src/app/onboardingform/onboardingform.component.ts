import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, StudentService } from '../_services';

@Component({
  selector: "app-onboardingform",
  templateUrl: "./onboardingform.component.html",
  styleUrls: ["./onboardingform.component.css"]
})
export class OnboardingformComponent implements OnInit {
 
  onboardingForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private studentService: StudentService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.onboardingForm = this.formBuilder.group({
      studentName: ["", Validators.required],
      category: ["", Validators.required],
      // documents: ["", Validators.required],
      dob: Date,
      fathersName: ["", Validators.required],
      mothersName: ["", Validators.required],
      lastClassScore: ["", Validators.required],
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.onboardingForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.onboardingForm.invalid) {
      return;
    }
    this.loading = true;
    this.studentService
      .register(this.onboardingForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success("Successfully Onboarded", true);
          this.router.navigate(["/student-list"]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
