import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { FirstLesson } from '../wrappers/FirstLesson';
import '@ton/test-utils';
import { log } from 'console';

describe('FirstLesson', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let firstLesson: SandboxContract<FirstLesson>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        firstLesson = blockchain.openContract(await FirstLesson.fromInit(1n));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await firstLesson.send(
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
            to: firstLesson.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and firstLesson are ready to use
    });

    it("should increase", async () => {
        let counterBefore = await firstLesson.getCounter();
        console.log("counterBefore ", counterBefore);

        await firstLesson.send(deployer.getSender(), {
            value: toNano('0.05'),
        },
            "increment" 
        );

        let counterAfter = await firstLesson.getCounter();
        console.log("counterAfter ", counterAfter);

        expect(counterAfter).toBeGreaterThan(counterBefore);
    })

    it("should decrease", async () => {
        let counterBefore = await firstLesson.getCounter();
        console.log("counterBefore ", counterBefore);

        await firstLesson.send(deployer.getSender(), {
            value: toNano('0.05'),
        }, 
            "decrement"
        );

        let counterAfter = await firstLesson.getCounter();
        console.log("counterAfter ", counterAfter);

        expect(counterAfter).toEqual(counterBefore);
    })

    it("increase w/ amount", async () => {
        let counterBefore = await firstLesson.getCounter();
        console.log("counterBefore ", counterBefore);

        await firstLesson.send(deployer.getSender(), {
            value: toNano('0.05'),
        },
        {
            $$type: "Add",
            amount: 5n,
        }    
        );

        let counterAfter = await firstLesson.getCounter();
        console.log("counterAfter ", counterAfter);

        expect(counterAfter).toEqual(5n);
    })

    it("dencrease w/ amount", async () => {
        let counterBefore = await firstLesson.getCounter();
        console.log("counterBefore ", counterBefore);

        await firstLesson.send(deployer.getSender(), {
            value: toNano('0.05'),
        }, 
        {
            $$type: "Subtraction",
            amount: 5n,
        }
        );

        let counterAfter = await firstLesson.getCounter();
        console.log("counterAfter ", counterAfter);

        expect(counterAfter).toEqual(counterBefore);
    })
});
