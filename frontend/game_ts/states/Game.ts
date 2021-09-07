module PhaserGame.Client {


  export class Game extends Phaser.State {
    private dummyGame: Phaser.Sprite;
    private dummyFinal: Phaser.Sprite;

    private prodBtns: MyBtn[] = [];
    private gameTimer: Phaser.Text;
    private gameInfo: Phaser.Text;

    private result: Phaser.Text;
    private wrongAnswers = 0;

    private isGameProcess = false;
    private gameProductsCnt = 0;
    // current products
    private allProductsCnt = 0;
    private currProductsInGame: number[] = [];
    private doneProducts: number[] = [];
    private prevTimerSec = -1;
    private timer = 0;

    private foodShuffleInterval = 0;
    private shuffleTimer = 0;
    private prevShuffleId = -1;


    private answersArray: any = [];


    onStopGame(): any {
      this.isGameProcess = false;
      this.timer = 0;
      this.wrongAnswers = 0;
      this.doneProducts = []
    }

    create() {
      GAME_API.onGameStartSignal.add(this.onGameStart, this);
      GAME_API.onPickProductSignal.add(this.onPickProduct, this);
      GAME_API.onPickRandomSignal.add(this.onPickRandomProduct, this);
      GAME_API.onStopGameSignal.add(this.onStopGame, this);

      // create test gui
      this.dummyGame = new Phaser.Sprite(this.game, 0, 0);
      this.dummyGame.visible = false;
      this.add.existing(this.dummyGame);
      this.dummyFinal = new Phaser.Sprite(this.game, 0, 0);
      this.dummyFinal.visible = false;
      this.add.existing(this.dummyFinal);

      this.gameTimer = new Phaser.Text(this.game, 10, 10, 'time: ');
      this.gameTimer.addColor('#AAAAAA', 0);
      this.dummyGame.addChild(this.gameTimer);

      this.gameInfo = new Phaser.Text(this.game, 10, 40, 'Info: ');
      this.gameInfo.addColor('#AAAAAA', 0);
      this.dummyGame.addChild(this.gameInfo);

      this.result = new Phaser.Text(this.game, Config.GW / 2, Config.GH / 2, 'res: ');
      this.result.addColor('#AAAAAA', 0);
      this.dummyFinal.addChild(this.result);

      // @ts-ignore
      apiGetLanguageJSON(DB.getLanguage());
    }

    onGameStart() {
      let infoText = 'Info: box id = ' + Params.lanchbag_id + '; right answers: ';
      let foodForLB = DB.getFoodForLanchbag(Params.lanchbag_id);
      for (let i = 0; i < foodForLB.length; i++) {
        const f = foodForLB[i];
        infoText += String(f) + ' ';
      }
      this.gameInfo.text = infoText;

      this.wrongAnswers = 0;

      this.timer = DB.gameCountdownFrom / 1000;
      this.foodShuffleInterval = this.shuffleTimer = DB.gameFoodShuffelInterval / 1000;
      this.gameProductsCnt = Config.START_PRODUCTS_CNT;
      this.allProductsCnt = DB.foodList.length;
      this.currProductsInGame = [];
      this.doneProducts = [];
      if (this.allProductsCnt <= this.gameProductsCnt) {
        LogMng.warn('products count <= ' + this.gameProductsCnt);
      }
      let limit = Math.min(this.gameProductsCnt, this.allProductsCnt - 1);
      for (let i = 0; i < limit; i++) {
        this.currProductsInGame.push(i);
      }
      // 1st shuffle
      for (let i = 0; i < this.currProductsInGame.length * 3; i++) {
        let id1 = MyMath.randomIntInRange(0, this.currProductsInGame.length - 1);
        let id2 = MyMath.randomIntInRange(0, this.currProductsInGame.length - 1);
        const elem = this.currProductsInGame[id1];
        this.currProductsInGame[id1] = this.currProductsInGame[id2];
        this.currProductsInGame[id2] = elem;
      }
      this.sendItems();

      this.prodBtns = [];
      this.updateGameGui();

      this.dummyGame.visible = true;


      this.isGameProcess = true;

      this.answersArray = [];


      apiGetTimeForClock(DB.getGameCountdownFrom());
    }

    private sendItems() {

      let mas = [];

      for (let i = 0; i < this.currProductsInGame.length; i++) {
        let prod_id = this.currProductsInGame[i];

        if(DB.getProductFullInfo(prod_id) === undefined) {
          mas.push('fake_element')
        } else {
            DB.getProductFullInfo(prod_id).id = prod_id;
            mas.push(DB.getProductFullInfo(prod_id));
        }
      }
      apiOnItemsUpdate(mas);
    }

    private updateGameGui() {
      for (let i = 0; i < this.currProductsInGame.length; i++) {
        const prod_id = this.currProductsInGame[i];
        let btn = this.prodBtns[i];
        if (btn) {
          if (prod_id == -1) {
            LogMng.debug('kill btn ' + i);
            btn.hideAndKill();
            this.prodBtns[i] = null;
          }
          else {
            if (btn.prod_id != prod_id) {
              //btn.prod_id = prod_id;
              btn.shuffle(prod_id, 200);
            }
          }
        }
        else {
          if (prod_id >= 0) {
            btn = new MyBtn(this.game, 160 + i * 300, 200, String(prod_id));
            btn.setProdId(prod_id);
            btn.onDownSignal.add(this.onGameBtnDown, this);
            this.dummyGame.addChild(btn);
            this.prodBtns[i] = btn;
          }
        }

      }
    }

    private onGameBtnDown(aBtn: MyBtn) {
      let id = aBtn.prod_id;
      if (!DB.isFoodInLaunchbox(id, Params.lanchbag_id)) {
        aBtn.redSignal();
      }
      else {
        aBtn.greenSignal();
      }
      this.onPickProduct(aBtn.prod_id);
    }

    private onPickProduct(id: number) {
      if (!DB.isFoodInLaunchbox(id, Params.lanchbag_id)) {
        LogMng.debug('onPickProduct: food_id=' + id + ' is not for this lanchbox');
        this.wrongAnswers++;
        apiOnWrongProductClick(id, this.wrongAnswers);
        return;
      }
      if (this.doneProducts.indexOf(id) >= 0) return;
      this.doneProducts.push(id);

      let id_in_game = this.currProductsInGame.indexOf(id);
      this.currProductsInGame[id_in_game] = -1;

      LogMng.debug('onPickProduct: food_id=' + id + ' put into lanchbox');

      let array =  [].concat(this.currProductsInGame)
      this.answersArray.push(array);

      this.updateGameGui();

      apiOnRightProductClick(id, this.doneProducts.length);

      // check to win
      let winProds = DB.getFoodForLanchbag(Params.lanchbag_id);
      if (winProds.length == this.doneProducts.length) {
        this.isGameProcess = false;
        apiOnAllDone(this.doneProducts.length, this.wrongAnswers, this.answersArray);

        // gui
        this.guiDoGameOver();
      }
    }

    private onPickRandomProduct() {
      let p_id = MyMath.randomIntInRange(0, this.currProductsInGame.length - 1);
      let id = this.currProductsInGame[p_id];
      if (this.doneProducts.indexOf(id) >= 0) return;
      this.currProductsInGame[p_id] = -1;
      LogMng.debug('onPickRandomProduct: ' + id);
      this.doneProducts.push(id);
      let winProds = DB.getFoodForLanchbag(Params.lanchbag_id);
      if (winProds.length == this.doneProducts.length) {
        this.isGameProcess = false;
        apiOnAllDone(this.doneProducts.length, this.wrongAnswers, this.answersArray);
      }
    }

    private updateTimer() {
      let currTime = Math.floor(this.timer) + 1;
      if (currTime < 0) currTime = 0;
      if (currTime != this.prevTimerSec) {
        this.prevTimerSec = currTime;
        apiOnTimerUpdate(currTime);
      }

      this.gameTimer.text = 'timer: ' + currTime;

      if (currTime <= 0) {
        this.doTimeOut();

        // gui
        this.guiDoGameOver();
      }
    }

    private guiDoGameOver() {
      // gui
      this.result.text = 'res: ' + this.doneProducts.length + '; wrong clicks: ' + this.wrongAnswers;
      this.dummyGame.visible = false;
      this.dummyFinal.visible = true;
    }

    private getNotInGame():number[]{
      let notInGame: number[] = [];
      for (let i = 0; i < this.allProductsCnt; i++) {
        if (this.currProductsInGame.indexOf(i) < 0 && this.doneProducts.indexOf(i) < 0)
          notInGame.push(i);
      }
      return notInGame;
    }

    private addProductToGame(to_id: number): boolean {
      let notInGame = this.getNotInGame();
      if (notInGame.length <= 0) {
        return false;
      }

      let newId = notInGame[MyMath.randomIntInRange(0, notInGame.length - 1)];

      //this.currProductsInGame[to_id] = newId;
      this.currProductsInGame[to_id] = this.checkForNoCorrectProducts(newId);
      return true;
    }

    private shuffleFood() {
      while (this.currProductsInGame.indexOf(-1) >= 0) {
        if (!this.addProductToGame(this.currProductsInGame.indexOf(-1))) break;
      }

      let notInGame = this.getNotInGame();

      if (notInGame.length <= 0) {
        LogMng.warn('notInGame.length <= 0');
        // return;
      }

      let newId = notInGame[MyMath.randomIntInRange(0, notInGame.length - 1)];
      let replaceId = MyMath.randomIntInRange(0, this.currProductsInGame.length - 1);
      if (this.currProductsInGame.length > 1) {
        while (replaceId == this.prevShuffleId) {
          replaceId = MyMath.randomIntInRange(0, this.currProductsInGame.length - 1);
        }
      }

      if (this.currProductsInGame[replaceId] === undefined) {
        const existsProducts = this.currProductsInGame.filter(el => !!el)
        const randomExistsElement = existsProducts[MyMath.randomIntInRange(0, existsProducts.length - 1)]
        const index = this.currProductsInGame.indexOf(randomExistsElement)
        this.currProductsInGame[index] = undefined
      }

      this.prevShuffleId = replaceId;

      this.currProductsInGame[replaceId] = newId;
      this.sendItems();
    }

    private checkForNoCorrectProducts(newId:number){
      let noCorrectProducts = true;
      for(let i=0; i<this.currProductsInGame.length;i++){
        let prod = this.currProductsInGame[i];
        if(prod==-1) continue;
        if(DB.isFoodInLaunchbox(prod, Params.lanchbag_id)){
            noCorrectProducts = false;
            break;
        }
      }

      if(noCorrectProducts){
        let correctAvailable = DB.getFoodForLanchbag(Params.lanchbag_id);
        for(let i=0; i<this.doneProducts.length;i++){
          let ind = correctAvailable.indexOf(this.doneProducts[i]);
          if(ind>=0) correctAvailable.splice(ind, 1)
        }

        return correctAvailable[MyMath.randomIntInRange(0,correctAvailable.length-1)];
      }
      return newId;
    }

    private doTimeOut() {
      this.isGameProcess = false;
      apiOnTimeOut(this.doneProducts.length, this.wrongAnswers, this.answersArray);
    }

		update() {
      let dt = this.game.time.elapsed * 0.001;

      if (!this.isGameProcess) return;

      this.timer -= dt;
      this.updateTimer();

      this.shuffleTimer -= dt;
      if (this.shuffleTimer <= 0) {
        this.shuffleTimer = this.foodShuffleInterval;
        this.shuffleFood();
        // TEST
        //this.onPickRandomProduct();
        this.updateGameGui();
      }

    }

	}

}
