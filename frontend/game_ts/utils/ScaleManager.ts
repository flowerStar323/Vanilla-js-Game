class ScaleManager {
  private static game: Phaser.Game;
  private static dom_id: string = '';
  private static dom: HTMLElement;
  private static isDesktop = false;
  // game maximum size
  private static game_w: number;
  private static game_h: number;
  // game save area size
  private static game_sw: number;
  private static game_sh: number;

  // delta values container position from left and top of the page
  public static dtx: number = 0;
  public static dty: number = 0;

  // true current game view size
  public static gameViewW = 0;
  public static gameViewH = 0;

  // true current game scale
  public static gameScale = 1;

  // orientation
  public static isPortrait: boolean;
  public static onOrientationChange: Phaser.Signal = new Phaser.Signal(); // orientation change event

  public static init(aGame: Phaser.Game, aDomId: string, GW: number, GH: number, GSW: number, GSH: number) {
    this.game = aGame;
    this.dom_id = aDomId;
    this.dom = document.getElementById(this.dom_id);

    this.game_w = GW;
    this.game_h = GH;
    this.game_sw = GSW;
    this.game_sh = GSH;

    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

    this.isDesktop = this.game.device.desktop;
    // for test
    //this.isDesktop = false;

    ScaleManager.SizeCalculation();

    window.onresize = () => {
      ScaleManager.SizeCalculation();
    };
  }

  private static doEventOriChange() {
    this.onOrientationChange.dispatch(this.isPortrait);
  }

  public static SizeCalculation() {
    if (this.game.scale.isFullScreen) {
      return;
    }

    var wnd = {
      w: window.innerWidth,
      h: window.innerHeight
    };

    // orientation
    var oldOri = this.isPortrait;
    this.isPortrait = wnd.h > wnd.w;

    // determine game size
    var g = {
      w: ScaleManager.game_w,
      h: ScaleManager.game_h,
      sw: ScaleManager.game_sw,
      sh: ScaleManager.game_sh
    }

    var gw: number;
    var gh: number;

    if (g.h / g.w > wnd.h / wnd.w) {
      // game compressed by HEIGHT, black borders on the LEFT and the RIGHT
      if (g.sh / g.w > wnd.h / wnd.w) {
        // A
        gh = wnd.h * g.h / g.sh;
        gw = gh * g.w / g.h;
      } else {
        // B
        gw = wnd.w;
        gh = gw * g.h / g.w;
      }
    } else {
      // game compressed by WIDTH, black borders on the TOP and the BOT
      if (g.h / g.sw > wnd.h / wnd.w) {
        // C
        gh = wnd.h;
        gw = gh * g.w / g.h;
      } else {
        // D
        gw = wnd.w * g.w / g.sw;
        gh = gw * g.h / g.w;
      }
    }

    // game scale
    var scale_x = gw / g.w;
    var scale_y = gh / g.h;
    this.gameScale = Math.min(scale_x, scale_y);
    ScaleManager.game.scale.setUserScale(this.gameScale, this.gameScale, 0, 0);

    // game dt xy
    this.dtx = (wnd.w - gw) / 2;
    this.dty = (wnd.h - gh) / 2;

    this.gameViewW = this.game_w + 2 * this.dtx / this.gameScale;
    if (this.gameViewW > this.game_w) this.gameViewW = this.game_w;

    this.gameViewH = this.game_h + 2 * this.dty / this.gameScale;
    if (this.gameViewH > this.game_h) this.gameViewH = this.game_h;

    // game div position
    //this.dom.style.marginLeft = Math.round(this.dtx).toString() + 'px';

    this.dom.style.maxWidth = String(gw) + 'px';
    this.dom.style.maxHeight = String(gh) + 'px';

    ScaleManager.game.scale.refresh();

    if (this.isPortrait != oldOri) {
      this.doEventOriChange();
    }
  }

}

