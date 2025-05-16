export enum GameType {
  CREATED = 1, // Игра создана
  ABANDONED = 2, // Игра прервана
  WIN = 3, // Победа
  LOSE = 4, // Поражение
}

export const GameTypeRU = {
  [GameType.CREATED]: 'Игра создана',
  [GameType.ABANDONED]: 'Игра прервана',
  [GameType.WIN]: 'Победа',
  [GameType.LOSE]: 'Поражение',
};