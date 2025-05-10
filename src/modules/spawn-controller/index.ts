import { Facade } from '../../core/Facade';
import { SpawnControllerModel } from './SpawnControllerModel';
import { inject } from '../../core/inject';
import { PIXI } from '../../main';

export function registerSpawnControllerModule(): void {
    const model = new SpawnControllerModel();
    Facade.instance.registerModel('SpawnControllerModel', model);

    const app = inject<PIXI.Application>('app');

    app.ticker.add(() => {
        model.update();
    });
}