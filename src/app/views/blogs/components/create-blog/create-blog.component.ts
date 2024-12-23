import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.scss'
})
export class CreateBlogComponent {
  blogForm: FormGroup;

  constructor(private fb: FormBuilder, private blogService: BlogService) {
    this.blogForm = this.fb.group({
      name: [''],
      description: [''],
      image: [''],
      bio: [''],
      contactMessage: [''],
      email: [''],
      phone: [''],
      github: [''],
      project: [''],
      website: [''],
      resumeDownload: [''],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['']
      }),
      social: this.fb.array([])
    });
  }

  get social(): FormArray {
    return this.blogForm.get('social') as FormArray;
  }

  addSocial() {
    const socialGroup = this.fb.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      className: ['']
    });

    this.social.push(socialGroup);
  }

  removeSocial(index: number) {
    this.social.removeAt(index);
  }

  saveBlog() {
    const blogData = this.blogForm.value;
    this.blogService.saveBlog(blogData).subscribe(
      response => {
        alert('Blog created successfully!');
        this.blogForm.reset();
      },
      error => {
        console.error('Error creating blog:', error);
      }
    );
  }

}
