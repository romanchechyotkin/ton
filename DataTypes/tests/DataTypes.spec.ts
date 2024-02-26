import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { DataTypes } from '../wrappers/DataTypes';
import '@ton/test-utils';

describe('DataTypes', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let dataTypes: SandboxContract<DataTypes>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        dataTypes = blockchain.openContract(await DataTypes.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await dataTypes.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: dataTypes.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and dataTypes are ready to use
    });
});
