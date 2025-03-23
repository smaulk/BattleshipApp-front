import headerLogo from '@/assets/images/header-logo.svg';
import userAvatar from '@/assets/images/user/user-avatar.png'
import game_config_json from '../game.config.json';

//Общее количество кораблей
const countShips =
  game_config_json.countShipsOfSize1 + game_config_json.countShipsOfSize2
  + game_config_json.countShipsOfSize3 + game_config_json.countShipsOfSize4;
const gameConfig = { ...game_config_json, countShips };

export {
  gameConfig,
  headerLogo,
  userAvatar,
}
