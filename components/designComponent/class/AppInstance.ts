import { LeaferCanvas } from './LeaferCanvas';
export class AppInstance {
  public leafCanvas: LeaferCanvas;
  constructor(leafCanvas: LeaferCanvas) {
    this.leafCanvas = leafCanvas;
  }
}
