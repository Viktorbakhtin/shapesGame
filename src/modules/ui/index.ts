import { UiMediator } from './UiMediator';
import { Facade } from '../../core/Facade';

export function registerUiModule() {
    const uiRoot = document.getElementById('layout') as HTMLDivElement;

    Facade.instance.registerMediator('UiMediator', new UiMediator(uiRoot));
}
