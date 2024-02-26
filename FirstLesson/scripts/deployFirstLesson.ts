import { toNano } from '@ton/core';
import { FirstLesson } from '../wrappers/FirstLesson';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const firstLesson = provider.open(await FirstLesson.fromInit(1234n));

    await firstLesson.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(firstLesson.address);

    // run methods on `firstLesson`
}
