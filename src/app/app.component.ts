import { Component, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [DragDropModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  windows = [
    { 
      id: 1, 
      title: 'Mi CV', 
      type: 'pdf',
      content: 'assets/docs/mi-cv.pdf',
      visible: false,
      x: 100,
      y: 100,
      width: 800,
      height: 600,
      icon: 'cv-icon.png',
      isMinimized: false,
      isMaximized: false,
      previousState: { x: 0, y: 0, width: 0, height: 0 }
    },
    { 
      id: 2, 
      title: 'Proyectos', 
      type: 'text',
      content: 'Lista de proyectos...',
      visible: false,
      x: 200,
      y: 200,
      width: 600,
      height: 400,
      icon: 'projects-icon.png',
      isMinimized: false,
      isMaximized: false,
      previousState: { x: 0, y: 0, width: 0, height: 0 }
    }
  ];

  showStartMenu = false;
  currentTime = new Date();
  activeWindowId: number | null = null;

  // Variables para redimensionamiento
  private resizingWindow: any = null;
  private resizeStartX = 0;
  private resizeStartY = 0;
  private resizeStartWidth = 0;
  private resizeStartHeight = 0;

  constructor(private sanitizer: DomSanitizer) {
    setInterval(() => this.currentTime = new Date(), 60000);
  }

  // Seguridad para URLs
  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // Control de ventanas
  openWindow(id: number) {
    const window = this.windows.find(w => w.id === id);
    if (window) {
      window.visible = true;
      window.isMinimized = false;
      this.bringToFront(id);
    }
  }

  closeWindow(id: number) {
    const window = this.windows.find(w => w.id === id);
    if (window) {
      window.visible = false;
      if (this.activeWindowId === id) this.activeWindowId = null;
    }
  }

  minimizeWindow(id: number) {
    const window = this.windows.find(w => w.id === id);
    if (window) {
      window.isMinimized = !window.isMinimized;
      if (window.isMinimized) {
        this.activeWindowId = null;
      } else {
        this.bringToFront(id);
      }
    }
  }

  toggleMaximize(window: any) {
    if (window.isMaximized) {
      // Restaurar estado anterior
      window.x = window.previousState.x;
      window.y = window.previousState.y;
      window.width = window.previousState.width;
      window.height = window.previousState.height;
    } else {
      // Guardar estado actual
      window.previousState = {
        x: window.x,
        y: window.y,
        width: window.width,
        height: window.height
      };
      // Maximizar
      window.x = 0;
      window.y = 0;
      window.width = window.innerWidth;
      window.height = window.innerHeight - 40; // Ajuste para barra de tareas
    }
    window.isMaximized = !window.isMaximized;
  }

  bringToFront(id: number) {
    this.activeWindowId = id;
  }

  getWindowStyle(window: any) {
    return {
      'left.px': window.x,
      'top.px': window.y,
      'width.px': window.width,
      'height.px': window.height,
      'z-index': this.activeWindowId === window.id ? 100 : 10,
      'display': window.isMinimized ? 'none' : 'flex'
    };
  }

  // Redimensionamiento
  startResize(event: MouseEvent, window: any) {
    this.resizingWindow = window;
    this.resizeStartX = event.clientX;
    this.resizeStartY = event.clientY;
    this.resizeStartWidth = window.width;
    this.resizeStartHeight = window.height;
    
    document.addEventListener('mousemove', this.doResize);
    document.addEventListener('mouseup', this.stopResize);
    event.preventDefault();
  }

  private doResize = (event: MouseEvent) => {
    if (!this.resizingWindow) return;
    
    this.resizingWindow.width = Math.max(
      300, 
      this.resizeStartWidth + (event.clientX - this.resizeStartX)
    );
    this.resizingWindow.height = Math.max(
      200, 
      this.resizeStartHeight + (event.clientY - this.resizeStartY)
    );
  };

  private stopResize = () => {
    this.resizingWindow = null;
    document.removeEventListener('mousemove', this.doResize);
    document.removeEventListener('mouseup', this.stopResize);
  };

  // Menú de inicio
  toggleStartMenu() {
    this.showStartMenu = !this.showStartMenu;
  }

  ngAfterViewInit() {
    // Inicialización adicional si es necesaria
  }

  toggleWindow(id: number) {
    const window = this.windows.find(w => w.id === id);
    if (!window) return;
    
    if (window.isMinimized) {
      // Si está minimizada, restaurar
      window.isMinimized = false;
      this.bringToFront(id);
    } else if (!window.visible) {
      // Si está cerrada, abrir
      this.openWindow(id);
    } else {
      // Si está abierta y visible, minimizar
      this.minimizeWindow(id);
    }
  }
}