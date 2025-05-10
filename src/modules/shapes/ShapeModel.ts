import { BaseModel } from "../../core/BaseModel";
import { ShapeView } from "./ShapeView";
import { Container } from "pixi.js";

export class ShapeModel extends BaseModel {
    public shapes: ShapeView[] = [];

    constructor(private viewContainer?: Container) {
        super();
    }

    setView(container: Container) {
        this.viewContainer = container;
    }

    add(shape: ShapeView): void {
        this.shapes.push(shape);
        this.viewContainer?.addChild(shape);
    }

    remove(shape: ShapeView): void {
        const index = this.shapes.indexOf(shape);
        if (index !== -1) {
            this.shapes.splice(index, 1);
            this.viewContainer?.removeChild(shape);
        }
    }

    spawnRandomShape(x: number, y: number): void {
        const shape = new ShapeView();

        shape.id = crypto.randomUUID();

        const types = ["triangle", "rectangle", "pentagon", "hexagon", "circle", "ellipse", "random"];
        const type = types[Math.floor(Math.random() * types.length)];
        const color = Math.random() * 0xffffff;

        shape.init(type, color);
        shape.x = x;
        shape.y = y;
        shape.eventMode = "static";
        shape.cursor = "pointer";
        shape.once("pointerdown", (e) => {
            e.stopPropagation();
            window.events.emit("SHAPE_CLICKED", { id: shape.id, shape });
        });

        this.add(shape);
    }

    updateFalling(gravity: number): void {
        for (const shape of [...this.shapes]) {
            shape.y += gravity;
            if (shape.y > 700) {
                this.remove(shape);
            }
        }
    }

    removeById(id: string): void {
        const shape = this.shapes.find(s => s.id === id);
        if (shape) {
            this.remove(shape);
        }
    }
}
