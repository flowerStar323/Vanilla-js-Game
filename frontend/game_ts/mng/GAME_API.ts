namespace GAME_API {
  
  export let onGameStartSignal = new Phaser.Signal();
  export let onPickProductSignal = new Phaser.Signal();
  export let onPickRandomSignal = new Phaser.Signal();
  export let onStopGameSignal = new Phaser.Signal();

  export function setLanguage(aLangType: string) {
    LogMng.debug('setLanguage: ' + aLangType);
    Params.lang = aLangType;
    apiGetLanguageJSON(DB.getLanguage());
    
  }

  export function getLanguage(): string {
    LogMng.debug('getLanguage...');
    return Params.lang;
  }

  export function setLanchbagId(aLanchbagId: number) {
    LogMng.debug('setLanchbagId: ' + aLanchbagId);
    Params.lanchbag_id = aLanchbagId;
  }

  export function getLanchbagId(): number {
    return Params.lanchbag_id;
  }

  export function startGame() {
    onGameStartSignal.dispatch();
  }

  export function pickProduct(id: number) {
    onPickProductSignal.dispatch(id);
  }

  
  export function isProductRight(id: number): boolean {
    return DB.isFoodInLaunchbox(id, Params.lanchbag_id);
  }
  
  export function stopGame() {
    onStopGameSignal.dispatch();
  }

}