import {
  App,
  ChildEvent,
  Frame,
  Leafer,
  PropertyEvent,
  ResizeEvent,
  surfaceType,
} from 'leafer-ui';
import {
  ICanvasContext2D,
  ILeafer,
  IPointData,
  IUI,
  IUIInputData,
} from '@leafer-ui/interface';
import '@leafer-in/editor';
import { Ruler } from 'leafer-x-ruler';
import { v4 as uuidv4 } from 'uuid';
export interface Page {
  name?: string;
  id?: number;
  cover?: string;
  height?: number;
  hittable?: undefined;
  pixelRatio?: number;
  tag?: string;
  width?: number;
  scale?: number;
  json?: any;
  children: any;
}

type ObjectType =
  // 官方元素tag
  | 'UI'
  | 'App'
  | 'Leafer'
  | 'Frame'
  | 'Group'
  | 'Box'
  | 'Rect'
  | 'Image'
  | 'SVG'
  | 'Canvas'
  | 'Text'
  | 'Pen'
  | 'HTMLText';
export class LeaferCanvas {
  // 主应用
  private _app?: App;
  // 内容层
  private _contentLayer?: ILeafer;
  // 内容画板
  private _contentFrame: Frame;
  // 画布元素
  public wrapperEl: any;
  // 当前页面ID
  public pageId?: string;

  // 多页面
  private readonly pages: Map<string, Page> = new Map();

  // 标尺
  public ruler: Ruler;

  constructor({ width, height }: { width: number; height: number }) {
    const app = new App({
      width: width,
      height: height,
      editor: {},
    });
    this.wrapperEl = app.canvas.view;
    const contentLayer = app.tree;
    contentLayer.fill = 'transparent';
    this._contentLayer = contentLayer;
    this._app = app;
    this.ruler = new Ruler(app, {
      enabled: true,
      theme: 'light',
    });
    this.initPageEditor();
  }
  initPageEditor() {
    const frame = new Frame({
      id: uuidv4(),
      name: 'workspace',
      width: this.contentLayer.width,
      height: this.contentLayer.height,
    });
    this.contentLayer.add(frame);
    this.contentFrame = frame;
  }

  public objectIsTypes(object: any, ...types: ObjectType[]) {
    return types.includes(<ObjectType>object?.tag);
  }

  /**
   * 添加元素
   * @param child 元素
   * @param index 层级
   */
  public add(child: IUI, index?: number) {
    this.contentFrame.add(child, index);

    // 选中提添加的元素
    this.setActiveObjects([child]);
  }
  /**
   * 选中元素
   * @param objects
   */
  public setActiveObjects(objects: IUI[] | undefined) {
    if (objects) {
      this.app.editor.target = objects;
    }
  }
  /**
   * 取消选中元素
   */
  public discardActiveObject() {
    this.app.editor.target = null;
  }
  /**
   * 导入JSON到当前页中
   * @param json json
   * @param clearHistory 是否清除历史画布数据
   */
  public importJsonToCurrentPage(json: any, clearHistory?: boolean) {
    if (clearHistory) {
      this.contentFrame.clear();
    }
    if (json) {
      this.contentFrame.set(json);
    }
  }
  get app(): App {
    return <App>this._app;
  }

  set app(value: App) {
    this._app = value;
  }
  get contentLayer(): Leafer {
    return <Leafer>this._contentLayer;
  }

  set contentLayer(value: Leafer) {
    this._contentLayer = value;
  }
  get contentFrame(): Frame {
    return this._contentFrame;
  }

  set contentFrame(value: Frame) {
    this._contentFrame = value;
  }
}
