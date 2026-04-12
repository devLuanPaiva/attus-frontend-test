import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface PaginationVm {
  page: number;
  total: number;
  totalPages: number;
  pageSize: number;
}

@Component({
  selector: 'app-user-paginator',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './user-paginator.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPaginatorComponent {
  vm = input.required<PaginationVm>();
  pageChange = output<number>();

  readonly visiblePages = computed<number[]>(() => {
    const { page, totalPages } = this.vm();
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: number[] = [1];

    if (page > 3) pages.push(-1); 

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (page < totalPages - 2) pages.push(-1); 

    pages.push(totalPages);
    return pages;
  });

  readonly startItem = computed(() => {
    const { page, pageSize, total } = this.vm();
    if (total === 0) return 0;
    return (page - 1) * pageSize + 1;
  });

  readonly endItem = computed(() => {
    const { page, pageSize, total } = this.vm();
    return Math.min(page * pageSize, total);
  });

  goTo(page: number): void {
    const { page: current, totalPages } = this.vm();
    if (page === current || page < 1 || page > totalPages) return;
    this.pageChange.emit(page);
  }
}