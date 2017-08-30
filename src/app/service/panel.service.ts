import { Injectable, ViewContainerRef, ComponentFactoryResolver, ReflectiveInjector, ComponentRef, } from "@angular/core";
import { UIPanelComponent } from '../component/ui-panel/ui-panel.component';

declare var Type: FunctionConstructor;
interface Type<T> extends Function {
  new (...args: any[]): T;
}

export interface PanelOption {
  title?: string;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
}

@Injectable()
export class PanelService {
  //private context: PanelContext = null;
  private count = 0;

  /* Todo */
  static defaultParentViewContainerRef: ViewContainerRef;
  static UIPanelComponentClass: { new (...args: any[]): any } = null;

  private panelComponentRef: ComponentRef<any>
  title: string = '無名のパネル';
  left: number = 0;
  top: number = 0;
  width: number = 100;
  height: number = 100;

  scrollablePanel: HTMLDivElement = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  get isShow(): boolean {
    return this.panelComponentRef ? true : false;
  }

  open<T>(childComponent: Type<T>, option?: PanelOption, parentViewContainerRef?: ViewContainerRef): T {
    if (!parentViewContainerRef) {
      parentViewContainerRef = PanelService.defaultParentViewContainerRef;
      console.log('Panel Open', parentViewContainerRef);
    }
    let panelComponentRef: ComponentRef<any>;

    //const childPanelService: PanelService = new PanelService(this.componentFactoryResolver);
    //childPanelService.context = new PanelContext();

    /*
    const providers = ReflectiveInjector.resolve([
      { provide: PanelService, useValue: childPanelService }
    ]);
    */

    //const parentInjector = parentViewContainerRef.injector;
    const injector = parentViewContainerRef.injector;//ReflectiveInjector.fromResolvedProviders(providers, parentInjector);

    const panelComponentFactory = this.componentFactoryResolver.resolveComponentFactory(PanelService.UIPanelComponentClass);
    const bodyComponentFactory = this.componentFactoryResolver.resolveComponentFactory(childComponent);

    panelComponentRef = parentViewContainerRef.createComponent(panelComponentFactory, parentViewContainerRef.length, injector);
    let bodyComponentRef: ComponentRef<any> = panelComponentRef.instance.content.createComponent(bodyComponentFactory);

    const childPanelService: PanelService = panelComponentRef.injector.get(PanelService);

    childPanelService.panelComponentRef = panelComponentRef;
    if (option) {
      if (option.title) childPanelService.title = option.title;
      if (option.top) childPanelService.top = option.top;
      if (option.left) childPanelService.left = option.left;
      if (option.width) childPanelService.width = option.width;
      if (option.height) childPanelService.height = option.height;
    }
    panelComponentRef.onDestroy(() => {
      childPanelService.panelComponentRef = null;
    });

    //childPanelService.context.panelComponentRef = panelComponentRef;


    //panelComponentRef.instance.panelService = childPanelService;
    return <T>bodyComponentRef.instance;
  }

  close() {
    if (this.panelComponentRef) {
      this.panelComponentRef.destroy();
      this.panelComponentRef = null;
    }
  }
}