import { Application } from "pixi.js";
import { DataRegistry } from "./core/DataRegistry";
import { registerUiModule } from "./modules/ui";
import { registerShapeModule } from "./modules/shapes";
import { EventEmitter } from "@pixi/utils";
import { registerSpawnControllerModule } from "./modules/spawn-controller";

export * as PIXI from "pixi.js";

declare global {
    interface Window {
        app: Application;
        events: EventEmitter;
    }
}

(async () => {
    const app = new Application();

    window.app = app;
    window.events = new EventEmitter();

    await app.init({ width: 800, height: 600, background: "#f0f0f0" });

    document.getElementById("pixi-container")?.appendChild(app.canvas);

    DataRegistry.instance.register("gravity", 1.0);
    DataRegistry.instance.register("spawnRate", 1);
    DataRegistry.instance.register("app", app);

    registerShapeModule();
    registerUiModule();
    registerSpawnControllerModule();
})();