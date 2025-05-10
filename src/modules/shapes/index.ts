import {Container} from 'pixi.js';
import {ShapeMediator} from './ShapeMediator';
import {ShapeModel} from './ShapeModel';
import {Facade} from '../../core/Facade';
import {Rectangle} from 'pixi.js';
import {DataRegistry} from "../../core/DataRegistry";

export function registerShapeModule() {
    const container = new Container();

    container.hitArea = new Rectangle(0, 0, 800, 600);

    window.app.stage.addChild(container);

    const model = new ShapeModel();

    Facade.instance.registerModel('ShapeModel', model);
    Facade.instance.registerMediator('ShapeMediator', new ShapeMediator(container));

    DataRegistry.instance.register('ShapeModel', model);
}
