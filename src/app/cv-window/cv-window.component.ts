import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cv-window',
  templateUrl: './cv-windows.component.html',
  styleUrls: ['./cv-windows.component.css']
})
export class CvWindowsComponent {
  @ViewChild('pdfViewer') pdfViewer!: ElementRef;
  
  isVisible = true;
  isMaximized = false;
  showAlternative = false;
  pdfInfo = '';
  
  windowPosition = { x: 100, y: 100 };
  originalPosition = { x: 0, y: 0, width: 0, height: 0 };

  toggleMaximize() {
    if (!this.isMaximized) {
      this.originalPosition = {
        x: this.windowPosition.x,
        y: this.windowPosition.y,
        width: this.pdfViewer.nativeElement.offsetWidth,
        height: this.pdfViewer.nativeElement.offsetHeight
      };
      this.windowPosition = { x: 0, y: 0 };
    } else {
      this.windowPosition = this.originalPosition;
    }
    this.isMaximized = !this.isMaximized;
  }

  minimize() {
    this.isVisible = false;
    // Aquí puedes implementar lógica para mostrar en la barra de tareas
  }

  close() {
    // Lógica para cerrar la ventana
  }

  onPdfLoad() {
    this.pdfInfo = 'Documento cargado correctamente';
    this.showAlternative = false;
  }

  onPdfError() {
    this.showAlternative = true;
    this.pdfInfo = 'Error al cargar el documento';
  }
}