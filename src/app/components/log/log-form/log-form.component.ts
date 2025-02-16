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
import { EditorModule } from '@tinymce/tinymce-angular';
import { Log, LogService } from '../services/log.service';
import { NotifyService } from '../../shared/services/notify.service';
import { Router } from '@angular/router';

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
    MatIconModule,
    EditorModule
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

  constructor(private fb: FormBuilder, private logService: LogService, private notifyService: NotifyService, private router: Router) {
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
      const log = this.logForm.value as Log;
      this.logService.createLog(log).subscribe(
        {
          next: (v) => {
            this.notifyService.success({ "msg": "Salvo com sucesso!" });
            this.logForm.reset();
            this.router.navigateByUrl('/log/log-table')
          },
          error: (e) => this.notifyService.alert({ "msg": "Ops! Algo deu errado. Tente novamente!" })
        })

    }
  }
}