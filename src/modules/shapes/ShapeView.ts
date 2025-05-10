import { Graphics } from "pixi.js";
import { BaseView } from "../../core/BaseView";

export class ShapeView extends BaseView {
    public graphics!: Graphics;
    public area: number = 0;
    public id: string = "";

    init(shapeType: string, color: number): void {
        this.graphics = new Graphics();
        this.graphics.fill(color);

        switch (shapeType) {
            case "triangle":
                this.graphics.poly([0, 0, 40, 80, -40, 80]);
                this.area = this.calculatePolygonArea([0, 0, 40, 80, -40, 80]);
                break;

            case "rectangle":
                this.graphics.rect(-40, -40, 80, 80);
                this.area = 80 * 80;
                break;

            case "pentagon":
                this.area = this.drawRegularPolygon(5);
                break;

            case "hexagon":
                this.area = this.drawRegularPolygon(6);
                break;

            case "circle":
                const r = 40;
                this.graphics.circle(0, 0, r);
                this.area = Math.PI * r * r;
                break;

            case "ellipse":
                const rx = 60, ry = 40;
                this.graphics.ellipse(0, 0, rx, ry);
                this.area = Math.PI * rx * ry;
                break;

            case "random":
                this.area = this.drawIrregularPolygon(3 + Math.floor(Math.random() * 8)); // от 3 до 10
                break;
        }

        this.graphics.fill();
        this.addChild(this.graphics);
    }

    private drawRegularPolygon(sides: number, radius: number = 40): number {
        const points: number[] = [];
        for (let i = 0; i < sides; i++) {
            const angle = (2 * Math.PI * i) / sides;
            points.push(radius * Math.cos(angle), radius * Math.sin(angle));
        }
        this.graphics.poly(points);

        return this.calculatePolygonArea(points);
    }

    private calculatePolygonArea(points: number[]): number {
        let area = 0;
        const n = points.length / 2;

        for (let i = 0; i < n; i++) {
            const x1 = points[(i * 2) % points.length];
            const y1 = points[(i * 2 + 1) % points.length];
            const x2 = points[((i + 1) * 2) % points.length];
            const y2 = points[((i + 1) * 2 + 1) % points.length];
            area += x1 * y2 - x2 * y1;
        }

        return Math.abs(area / 2);
    }

    private drawIrregularPolygon(sides: number): number {
        const scaleFactor = 0.7 + Math.random() * 0.6; // 0.7 – 1.3
        const baseRadius = 40 * scaleFactor;
        const points: number[] = [];

        const spikey = Math.random() < 0.5;
        const doubleSides = spikey ? sides * 2 : sides;

        for (let i = 0; i < doubleSides; i++) {
            const angle = (2 * Math.PI * i) / doubleSides;

            let radius = baseRadius;

            if (spikey) {
                const isOuter = i % 2 === 0;
                const jitter = isOuter ? 10 : -10;
                radius += jitter + Math.random() * 10;
            } else {
                radius += Math.random() * 20 - 10;
            }

            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            points.push(x, y);
        }

        this.graphics.poly(points);
        return this.calculatePolygonArea(points);
    }

}
