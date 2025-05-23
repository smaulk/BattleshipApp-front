import { GameStatus } from "@/enums/GameStatus.ts";
import GameDisplayService from "@/services/GameDisplayService.ts";
import BotService from "@/services/BotService.ts";
import { gameConfig } from "@/app.config.ts";
import { getColRowData, getRandomInt } from "@/helpers/game.ts";
import ShotService from "@/services/ShotService.ts";
import { ShotData } from "@/interfaces/ShotData.ts";
import { ShotStatus } from "@/enums/ShotStatus.ts";

/**
 * Переключатель игры, отвечает за ходы.
 */
export class BotGameHandlerService {
  //Флаг, для проверки, может ли нажимать на клетку пользователь
  private isCanClick: boolean = true;

  constructor(
    private gameDisplayService: GameDisplayService,
    private userController: ShotService,
    private botController: BotService,
  ) {
  }

  /**
   * Ожидает ход пользователя и запускает ходы бота.
   * @param cellElement HTML элемент клетки
   * @return Promise GameStatus игры либо null
   */
  public async shot(cellElement: HTMLDivElement): Promise<GameStatus | null> {
    if (!this.isCanClick) return null;

      const userShot: boolean | null = this.takeShotUser(cellElement);
      if (userShot === null) return null;
      if (userShot) return this.getGameStatus();

      return await this.takeShotBot();
  }

  /**
   * Ход пользователя
   * @param cellElem HTML элемент клетки
   * @return boolean Говорит, попал ли пользователь, или нет
   * @return null Говорит, что пользователь не может стрелять в данную клетку
   */
  private takeShotUser(cellElem: HTMLDivElement): boolean | null {
    const cellData = getColRowData(cellElem);
    //Проверка, что клетка не существует или пользователь уже кликал на клетку
    if (!cellData || !this.gameDisplayService.checkCellIsCanShot(cellData)) return null;

    const shotData: ShotData = this.botController.shot(cellData);
    this.gameDisplayService.shotOnRivalCell(cellData, shotData);

    return shotData.status !== ShotStatus.MISS;
  }

  /**
   * Ход бота.
   */
  private async takeShotBot(): Promise<GameStatus> {
    this.toggleClicks(false);
    await this.delay(this.getBotWaitTime());

    const cellData = this.botController.getCellToShot();
    const shotData: ShotData = this.userController.shot(cellData);
    this.botController.setBotShotData(cellData, shotData);
    this.gameDisplayService.shotOnUserCell(cellData, shotData);
    //Если бот попал
    if (shotData.status !== ShotStatus.MISS) {
      const gameStatus = this.getGameStatus();
      if (gameStatus !== GameStatus.IN_PROGRESS) return gameStatus;

      return this.takeShotBot();
    } else {
      this.toggleClicks(true);
      return GameStatus.IN_PROGRESS;
    }
  }

  /**
   * Задержка выполнения
   * @param ms number - время задержки в миллисекундах.
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Случайное время ожидания бота.
   */
  private getBotWaitTime(): number {
    return gameConfig.minBotWaitTimeMS + getRandomInt(gameConfig.maxBotWaitTimeMS - gameConfig.minBotWaitTimeMS);
  }

  /**
   * Переключает возможность клика.
   * @param isCanClick boolean - Флаг, указывающий возможность клика.
   */
  private toggleClicks(isCanClick: boolean): void {
    this.isCanClick = isCanClick;
  }

  /**
   * Получение статуса игры.
   */
  private getGameStatus(): GameStatus {
    //Если все корабли противника уничтожены
    if (this.botController.isAllDestroyed) {
      this.toggleClicks(false)
      return GameStatus.WIN;
    }
    //Если все корабли пользователя уничтожены.
    if (this.userController.isAllDestroyed) {
      this.toggleClicks(false)
      return GameStatus.LOSE;
    }

    return GameStatus.IN_PROGRESS;
  }
}