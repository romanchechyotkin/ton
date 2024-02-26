import { FirstLesson } from '../wrappers/FirstLesson';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const firstLesson = provider.open(await FirstLesson.fromInit(1234n));

    const counter = await firstLesson.getCounter();
    const id = await firstLesson.getId();
    console.log(`counter ${counter}; id ${id}`);
}
