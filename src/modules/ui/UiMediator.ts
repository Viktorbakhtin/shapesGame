import { BaseMediator } from "../../core/BaseMediator";
import { DataRegistry } from "../../core/DataRegistry";

export class UiMediator extends BaseMediator<HTMLDivElement> {
    private shapeCountEl!: HTMLElement;
    private areaEl!: HTMLElement;
    private rateEl!: HTMLElement;
    private gravityEl!: HTMLElement;

    register(): void {
        this.shapeCountEl = this.view.querySelector("#shapeCount")!;
        this.areaEl = this.view.querySelector("#area")!;
        this.rateEl = this.view.querySelector("#shapeRate")!;
        this.gravityEl = this.view.querySelector("#gravity")!;

        this.setupStepperButton("plusRate", "spawnRate", +1, 1, this.rateEl, 0);
        this.setupStepperButton("minusRate", "spawnRate", -1, 1, this.rateEl, 0);

        this.setupStepperButton("plusGravity", "gravity", +0.1, 0.1, this.gravityEl, 1);
        this.setupStepperButton("minusGravity", "gravity", -0.1, 0.1, this.gravityEl, 1);

        this.updateStats();
    }

    unregister(): void {}

    private updateStats = () => {
        const model = DataRegistry.instance.resolve<any>('ShapeModel');
        this.shapeCountEl.textContent = model.shapes.length.toString();
        const area = model.shapes.reduce((sum: number, s: any) => sum + s.area, 0);
        this.areaEl.textContent = Math.floor(area).toString();

        requestAnimationFrame(this.updateStats);
    }

    private setupStepperButton(buttonId: string, key: string, delta: number, min: number, displayTarget: HTMLElement, fractionDigits: number): void {
        this.view.querySelector(`#${buttonId}`)?.addEventListener("click", () => {
            const current = DataRegistry.instance.resolve<number>(key);
            let updated = current + delta;
            if (updated < min) updated = min;
            DataRegistry.instance.register(key, updated);
            displayTarget.textContent = updated.toFixed(fractionDigits);
        });
    }

}
