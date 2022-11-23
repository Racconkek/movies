import { computed, makeObservable, observable } from 'mobx';

export enum MediaQuery {
  Mobile = 'Mobile',
  TabletV = 'TabletV',
  TabletH = 'TabletH',
  Desktop = 'Desktop',
}

export const XS_BREAKPOINT = '(max-width: 360px)';
export const SMALL_BREAKPOINT = '(max-width: 767px)';
export const MEDIUM_BREAKPOINT = '(min-width: 768px) and (max-width: 1023px)';
export const LARGE_BREAKPOINT = '(min-width: 1024px) and (max-width: 1279px)';
export const XLARGE_BREAKPOINT = '(min-width: 1280px)';

export class LayoutService {
  constructor() {
    makeObservable(this);
    this.state = this.getCurrentLayout();
  }

  @observable
  protected state: MediaQuery;

  @observable
  protected started = false;

  public async start() {
    this.started = true;
    window.addEventListener('resize', this.windowSizeListener);
  }

  @computed
  get layoutState() {
    return this.state;
  }

  @computed
  get isStarted(): boolean {
    return this.started;
  }

  public async stop() {
    window.removeEventListener('resize', this.windowSizeListener);
    this.started = false;
  }

  private windowSizeListener = () => {
    const past = this.state;
    const current = this.getCurrentLayout();
    if (past !== current) {
      this.state = current;
    }
  };

  private getCurrentLayout() {
    if (typeof window === 'undefined') {
      return;
    }
    let current = MediaQuery.Desktop;
    if (LARGE_BREAKPOINT && window.matchMedia(LARGE_BREAKPOINT).matches) {
      current = MediaQuery.TabletH;
    }
    if (MEDIUM_BREAKPOINT && window.matchMedia(MEDIUM_BREAKPOINT).matches) {
      current = MediaQuery.TabletV;
    }
    if (SMALL_BREAKPOINT && window.matchMedia(SMALL_BREAKPOINT).matches) {
      current = MediaQuery.Mobile;
    }
    return current;
  }

  public get isDesktop() {
    return this.layoutGuard(MediaQuery.Desktop);
  }

  public get isTabletH() {
    return this.layoutGuard(MediaQuery.TabletH);
  }

  public get isTabletV() {
    return this.layoutGuard(MediaQuery.TabletV);
  }

  public get isMobile() {
    return this.layoutGuard(MediaQuery.Mobile);
  }

  private layoutGuard(matchLayout: MediaQuery) {
    return this.state === matchLayout;
  }
}
