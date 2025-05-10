import { BaseModel } from "../../core/BaseModel";
import { DataRegistry } from "../../core/DataRegistry";

export class SpawnControllerModel extends BaseModel {
    private lastSpawnTime = performance.now();

    update(): void {
        const now = performance.now();
        const spawnRate = DataRegistry.instance.resolve<number>("spawnRate");
        const interval = 1000 / spawnRate;

        if (now - this.lastSpawnTime >= interval) {
            const width = 800;
            const maxHalfWidth = 80;

            const x = Math.random() * (width - maxHalfWidth * 2) + maxHalfWidth;

            window.events.emit("SPAWN_SHAPE", { x, y: -100 });

            this.lastSpawnTime = now;
        }
    }
}
