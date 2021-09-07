// static configs

namespace Config {
  export const DOM_PARENT_ID = 'game';

  // game full area (GWxGSH =~ 19x9 for iPhone X, because need browser top panel height compensation)
  export let GW = 1600;
  export let GH = 1200;

  // game safe area (GSWxGH = 4x3 for iPad)
  export let GSW = 1600;
  export let GSH = 1200;

  export const FPS = 12;

  export const START_PRODUCTS_CNT = 5;

  // orientation config
  export const isLockOrientation = false;
  export const lockOrientationMobileOnly = false;
  export const lockOrientationLand = false;

}