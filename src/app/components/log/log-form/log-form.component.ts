import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-log-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.scss']
})
export class LogFormComponent {
  readonly separatorKeysCodes = [ENTER, COMMA] as const
  readonly addOnBlur = true;

  logForm: FormGroup;
  categories = ['Bug', 'Feature', 'Improvement', 'Task'];
  tags: string[] = ['Call', 'Documentação', 'Azure', 'Deploy'];

  constructor(private fb: FormBuilder) {
    this.logForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      tags: [[]],
      projectId: ['', Validators.required],
      attachments: this.fb.array([])
    });
  }

  get attachments(): FormArray {
    return this.logForm.get('attachments') as FormArray;
  }

  addAttachment() {
    this.attachments.push(
      this.fb.group({
        fileName: ['', Validators.required],
        url: ['', Validators.required]
      })
    );
  }

  removeAttachment(index: number) {
    this.attachments.removeAt(index);
  }

  addTag(event: any) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
      this.logForm.get('tags')?.setValue(this.tags);
    }

    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string) {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.logForm.get('tags')?.setValue(this.tags);
    }
  }

  onSubmit() {
    if (this.logForm.valid) {
      console.log('Form Value:', this.logForm.value);
    }
  }
}
