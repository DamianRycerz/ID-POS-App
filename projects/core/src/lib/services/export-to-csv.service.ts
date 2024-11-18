import { saveAs } from 'file-saver';
import { Injectable } from '@angular/core';

@Injectable()
export class ExportToCsvService {
  exportToCsv(headers: string[], data: (string | number)[][], fileName: string) {
    const csvContent: string = [headers.join(','), ...data.map((row: (string | number)[]) => row.join(','))].join('\n');
    const blob: Blob = new Blob([csvContent], { type: 'text/csv' });

    return saveAs(blob, fileName);
  }
}
