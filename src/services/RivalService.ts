import { ColRowData } from "@/interfaces/ColRowData.ts";
import { ShotData } from "@/interfaces/ShotData.ts";
import { gameConfig } from "@/app.config.ts";
import { getEcho } from "@/helpers/socket.ts";

export default class RivalService {

  private readonly gameId: number;
  private _destroyedShipsCount: number = 0;

  public constructor(gameId: number | null) {
    this.gameId = gameId || 0;
  }

  public async sendShot(cellData: ColRowData): Promise<boolean> {
    getEcho()
      .join(`games.${this.gameId}`)
      .whisper('game.move.data', cellData);
    return true;
  }

  public async sendResult(shotData: ShotData): Promise<boolean> {
    getEcho()
      .join(`games.${this.gameId}`)
      .whisper('game.move.result', shotData);
    return true;
  }

  /**
   * Увеличить количество уничтоженных кораблей.
   */
  public addDestroyedShip(): void {
    this._destroyedShipsCount++;
  }

  get isAllDestroyed(): boolean {
    return this._destroyedShipsCount === gameConfig.countShips;
  }
}