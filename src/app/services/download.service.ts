import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable()
export class DownloadService {
  download(response: any, nomeArquivo: string) {
    const dataType = response.type;
    const binaryData = [];
    binaryData.push(response);
    const blob = new Blob(binaryData, {type: dataType});
    saveAs(blob, nomeArquivo);
  }
}
