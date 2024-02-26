import { toNano } from '@ton/core';
import { DataTypes } from '../wrappers/DataTypes';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const dataTypes = provider.open(await DataTypes.fromInit());

    await dataTypes.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(dataTypes.address);

    // run methods on `dataTypes`
}
