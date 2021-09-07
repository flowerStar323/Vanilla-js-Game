module PhaserGame.Client {

  export class Boot extends Phaser.State {

    preload() {
      console.log('Loading data file from: ', dataFilePath);
      this.load.json('data', dataFilePath);
    }

    create() {
      this.input.maxPointers = 1;
      this.stage.disableVisibilityChange = true;

      let anc = window.location.hash.replace("#", "");
      Params.isDebugMode = (anc === "debug");

      // LogMng settings
      Params.isDebugMode ? LogMng.setMode(LogMng.MODE_DEBUG) : LogMng.setMode(LogMng.MODE_RELEASE);
      LogMng.system('current log mode: ' + LogMng.getMode());

      // SCALE MNG
      ScaleManager.init(this.game, Config.DOM_PARENT_ID, Config.GW, Config.GH, Config.GSW, Config.GSH);

      let dataFile = this.game.cache.getJSON('data');
      if (!dataFile) {
        throw new Error('Data file not found');
      }
      onJsonLoaded(dataFile.DATA);
      DB.setData(dataFile);

      this.game.state.start(States.GAME, true, false);
    }

  }

}