import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent {
  // Configuración del escritorio
  wallpaper = 'assets/wallpapers/default.jpg';
  currentTime = new Date();
  
  // Control de ventanas
  openWindows: string[] = [];
  zIndexes: {[key: string]: number} = {};
  maxZIndex = 10;
  
  // Iconos del escritorio
  desktopIcons = [
    { name: 'Mi CV', icon: 'cv-icon.png', windowName: 'cv' },
    { name: 'Proyectos', icon: 'projects-icon.png', windowName: 'projects' }
  ];
  
  // Menú de inicio
  showStartMenu = false;
  startMenuItems = [
    { name: 'Documentos', icon: 'docs-icon.png', action: 'openFolder' },
    { name: 'Configuración', icon: 'settings-icon.png', action: 'openSettings' }
  ];
  
  // Icono seleccionado
  selectedIcon: string | null = null;

  constructor() {
    // Actualizar reloj cada minuto
    setInterval(() => {
      this.currentTime = new Date();
    }, 60000);
  }

  // Control de ventanas
  openWindow(windowName: string) {
    if (!this.isWindowOpen(windowName)) {
      this.openWindows.push(windowName);
      this.bringToFront(windowName);
    } else {
      this.bringToFront(windowName);
    }
  }

  closeWindow(windowName: string) {
    this.openWindows = this.openWindows.filter(w => w !== windowName);
  }

  isWindowOpen(windowName: string): boolean {
    return this.openWindows.includes(windowName);
  }

  bringToFront(windowName: string) {
    this.maxZIndex++;
    this.zIndexes[windowName] = this.maxZIndex;
  }

  getZIndex(windowName: string): number {
    return this.zIndexes[windowName] || this.maxZIndex;
  }

  // Control del menú de inicio
  toggleStartMenu() {
    this.showStartMenu = !this.showStartMenu;
  }

  handleMenuItem(item: any) {
    this.showStartMenu = false;
    // Implementa acciones según item.action
  }

  // Selección de iconos
  selectIcon(iconName: string) {
    this.selectedIcon = iconName;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.icon')) {
      this.selectedIcon = null;
    }
  }

  // Helpers
  getWindowName(windowId: string): string {
    return this.desktopIcons.find(i => i.windowName === windowId)?.name || windowId;
  }

  focusWindow(windowName: string) {
    this.bringToFront(windowName);
  }
}