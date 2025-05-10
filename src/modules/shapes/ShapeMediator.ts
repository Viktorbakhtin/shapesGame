import { BaseMediator } from "../../core/BaseMediator";
import { Container } from "pixi.js";
import { ShapeModel } from "./ShapeModel";
import { inject } from "../../core/inject";
import { Facade } from "../../core/Facade";
import { PIXI } from "../../main";

export class ShapeMediator extends BaseMediator<Container> {
    private model!: ShapeModel;

    register(): void {
        this.model = Facade.instance.getModel<ShapeModel>("ShapeModel");
        this.model.setView(this.view); // привязываем контейнер

        this.view.eventMode = "static";
        this.view.on("pointerdown", (e) => {
            const pos = e.global;
            window.events.emit("SPAWN_SHAPE", { x: pos.x, y: pos.y });
        });

        window.events.on("SPAWN_SHAPE", this.onSpawn, this);
        window.events.on("SHAPE_CLICKED", this.onRemoveById, this);

        inject<PIXI.Application>("app").ticker.add(this.onTick, this);
    }

    unregister(): void {
        window.events.off("SPAWN_SHAPE", this.onSpawn, this);
        window.events.off("SHAPE_CLICKED", this.onRemoveById, this);

        inject<PIXI.Application>("app").ticker.remove(this.onTick, this);
    }

    private onSpawn(data: { x: number; y: number }): void {
        this.model.spawnRandomShape(data.x, data.y);
    }

    private onRemoveById(data: { id: string }): void {
        this.model.removeById(data.id);
    }

    private onTick = (): void => {
        const gravity = inject<number>("gravity");
        this.model.updateFalling(gravity);
    };
}
