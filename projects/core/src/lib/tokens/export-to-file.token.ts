import { inject, InjectionToken } from '@angular/core';
import { ExportToCsvService } from '../services';

export const EXPORT_TO_FILE: InjectionToken<ExportToFileProvider> = new InjectionToken<ExportToFileProvider>(
  'EXPORT_TO_FILE',
  {
    factory: (): ExportToFileProvider => {
      const exportToCsvService: ExportToCsvService = inject(ExportToCsvService);

      return {
        exportToCSV(headers: string[], data: (string | number)[][], fileName: string) {
          return exportToCsvService.exportToCsv(headers, data, fileName);
        }
      };
    }
  }
);

export interface ExportToFileProvider {
  exportToCSV(headers: string[], data: (string | number)[][], fileName: string): void;
}
