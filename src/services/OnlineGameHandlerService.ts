import RivalService from "@/services/RivalService.ts";
import ShotService from "@/services/ShotService.ts";
import GameDisplayService from "@/services/GameDisplayService.ts";
import { getColRowData } from "@/helpers/game.ts";
import { ShotData } from "@/interfaces/ShotData.ts";
import { ColRowData } from "@/interfaces/ColRowData.ts";
import { ShotStatus } from "@/enums/ShotStatus.ts";
import { GameStatus } from "@/enums/GameStatus.ts";


export class OnlineGameHandlerService {
  //Флаг, для проверки, может ли нажимать на клетку пользователь
  private isUserMove: boolean = true;
  private lastCellData: ColRowData | null = null;


  constructor(
    private gameDisplayService: GameDisplayService,
    private userController: ShotService,
    private rivalController: RivalService,
  ) {
  }

  public async sendShot(cellElement: HTMLDivElement) {
    if (!this.isUserMove) return false;

    const cellData = getColRowData(cellElement);
    //Проверка, что клетка не существует или пользователь уже кликал на клетку
    if (!cellData || !this.gameDisplayService.checkCellIsCanShot(cellData)) return false;
    this.lastCellData = cellData;

    const result =  await this.rivalController.sendShot(cellData);
    this.isUserMove = !result;

    return result;
  }

  public async setResult(shotData: ShotData): Promise<GameStatus | null> {
    if(!this.lastCellData) return null;

    this.gameDisplayService.shotOnRivalCell(this.lastCellData, shotData);

    if(shotData.status === ShotStatus.DESTROYED) {
      this.rivalController.addDestroyedShip();
    }

    this.isUserMove = shotData.status !== ShotStatus.MISS;

    return this.getGameStatus();
  }


  public async setShot(cellData: ColRowData): Promise<GameStatus | null> {
    if(this.isUserMove) return null;

    const shotData = this.userController.shot(cellData);
    this.gameDisplayService.shotOnUserCell(cellData, shotData);
    this.isUserMove = shotData.status === ShotStatus.MISS;

    await this.rivalController.sendResult(shotData);

    return this.getGameStatus();
  }


  /**
   * Получение статуса игры.
   */
  private getGameStatus(): GameStatus {
    //Если все корабли противника уничтожены
    if (this.rivalController.isAllDestroyed) {
      this.isUserMove = false;
      return GameStatus.WIN;
    }
    //Если все корабли пользователя уничтожены.
    if (this.userController.isAllDestroyed) {
      this.isUserMove = false;
      return GameStatus.LOSE;
    }

    return GameStatus.IN_PROGRESS;
  }

  public setIsUserMove(isUserMove: boolean) {
    this.isUserMove = isUserMove;
    this.gameDisplayService.setBattlefieldWait(!isUserMove);
  }
}