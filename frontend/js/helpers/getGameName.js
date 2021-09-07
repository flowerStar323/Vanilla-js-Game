import s from '../state';
export default function getGameName() {
  const gameType = s.get('gameType');
  const jsonConfig = s.get('json');
  const language = s.get('language');
  const gameInfo = jsonConfig.gameTypes.find(v => v.id == gameType);
  if (!gameInfo || !gameInfo.name || !gameInfo.name[language]) return ''
  return gameInfo.name[language];
}