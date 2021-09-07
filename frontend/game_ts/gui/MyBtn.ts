module PhaserGame.Client {

  const BTN_COLOR = 0xff00ff;

  export class MyBtn extends Phaser.Sprite {
    private bg: Phaser.Graphics;
    private text: Phaser.Text;
    private _prod_id = -1;

    onDownSignal = new Phaser.Signal();

    constructor(game : any, x : any, y : any, aText: string, aProdId: number = -1) {
      super(game, x, y);

      this.bg = new Phaser.Graphics(game, 0, 0);
      this.drawBtnBack();
      this.bg.inputEnabled = true;
      this.bg.input.useHandCursor = true;
      this.bg.events.onInputDown.add(this.onDown, this);
      this.addChild(this.bg);

      this.text = new Phaser.Text(game, 0, 0, aText);
      this.text.anchor.set(0.5);
      this.addChild(this.text);

    }

    private drawBtnBack() {
      this.bg.clear();
      this.bg.beginFill(BTN_COLOR, 1);
      this.bg.drawRect(-140, -30, 280, 60);
      this.bg.endFill();
    }

    private getTextByProd(id: number): string {
      let info = DB.getProductFullInfo(id);
      if (!info) return '';
      return String(id) + ' (' + info.name + ')';
    }

    private onDown() {
      this.onDownSignal.dispatch(this);
    }
    

    public setProdId(v: number) {
      this._prod_id = v;
      this.text.text = this.getTextByProd(this._prod_id);
    }


    public get prod_id(): number {
      return this._prod_id;
    }

    redSignal() {
      this.bg.clear();
      this.bg.beginFill(0xAA0000, 1);
      this.bg.drawRect(-140, -30, 280, 60);
      this.bg.endFill();
      this.game.time.events.add(600, this.drawBtnBack, this);
    }

    greenSignal() {
      this.bg.clear();
      this.bg.beginFill(0x00AA00, 1);
      this.bg.drawRect(-140, -30, 280, 60);
      this.bg.endFill();
    }

    shuffle(newProdId: number, aPosY: number) {
      let tw1 = this.game.add.tween(this).to({ alpha: 0, y: aPosY - 100 }, 200, Phaser.Easing.Sinusoidal.InOut);
      tw1.onComplete.addOnce(() => {
        this.setProdId(newProdId);
      }, this);
      let tw2 = this.game.add.tween(this).to({ alpha: 1, y: aPosY }, 200, Phaser.Easing.Sinusoidal.InOut);
      tw1.chain(tw2);
      tw1.start();
    }

    hideAndKill() {
      let tw = this.game.add.tween(this).to({ alpha: 0, y: this.y + 200 }, 200, Phaser.Easing.Sinusoidal.InOut);
      tw.onComplete.addOnce(() => { this.kill(); }, this);
      tw.start();
    }

  }

}