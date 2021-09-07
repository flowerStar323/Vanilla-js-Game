// local API
declare function apiOnLoadComplete() : any;
declare function apiOnTimerUpdate(aTimeSec: number) : any;
declare function apiOnItemsUpdate(aItems: any[]) : any;
declare function apiOnWrongProductClick(prod_id: number, totalWrong: number) : any;
declare function apiOnRightProductClick(prod_id: number, totalRight: number) : any;
declare function apiOnTimeOut(aResult: number, aWrongRes: number, answers: any[]) : any;
declare function apiOnAllDone(aResult: number, aWrongRes: number, answers: any[]) : any;
declare function apiGetTimeForClock(time: number) : any;
declare function apiGetLanguageJSON(dataJson: any) : any;
declare const dataFilePath: string;
declare function onJsonLoaded(json: any) : any;