module DB {

  let data = {};
  export let gameTypes : any = [];
  export let foodList : any = [];
  export let gameCountdownFrom = 10000; // timer in sec
  export let gameFoodShuffelInterval = 2000; // timer in sec
  export let language : any = {};
  export let countdownFrom : any;
  export let video : any;
  // export let isChristmasEdition : any;

  export function setData(aData: any) {
    data = aData['DATA'];
    gameCountdownFrom = aData['DATA'].gameCountdownFrom;
    gameFoodShuffelInterval = aData['DATA'].gameFoodShuffelInterval;
    gameTypes = aData['DATA'].gameTypes;
    foodList = aData['DATA'].foodList;
    //test language
    language = aData['DATA'].language;
    countdownFrom = aData['DATA'].gameCountdownFrom;
    video = aData['DATA'].video;
    // isChristmasEdition = aData['DATA'].isChristmasEdition;
  }

  export function getFoodForLanchbag(lb_id: number): number[]  {
    let res: number[] = [];
    for (let i = 0; i < foodList.length; i++) {
      const food = foodList[i];
      let gtypes: number[] = food['belongToGameTypes'];
      if (gtypes.indexOf(lb_id) >= 0) res.push(i);
    }
    return res;
  }

  export function isFoodInLaunchbox(product_id: number, lanchbag_id: number): boolean {
    try {
      let boxes: number[] = foodList[product_id].belongToGameTypes;
      return boxes.indexOf(lanchbag_id) >= 0;
    } catch (error) {
      LogMng.error('isFoodInLaunchbox: product_id = ' + product_id);
      return false;
    }

  }

  export function getProductFullInfo(aProdId: number): any {
    return foodList[aProdId];
  }

  export function getLanguage(): any {
    return language;
  }

  export function getGameCountdownFrom(): any {
    return countdownFrom;
  }

  export function getVideo(): any {
    return video;
  }

  export function getGameInfo(lb_id: number) : any{
    return gameTypes.find((item:any)=>item.id === lb_id);
  }
}
