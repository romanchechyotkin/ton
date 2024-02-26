import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, WalletContractV4, fromNano, internal } from "ton";
import {mnemonicToWalletKey} from "ton-crypto"

async function main() {
    const mnemonic = "pepper bicycle report alien dignity gravity pilot energy tuition vapor copy cycle impact ginger old scale treat mean ketchup siege sweet struggle transfer bulb";
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

    const endpoint = await getHttpEndpoint({network: "testnet"});
    const client = new TonClient({endpoint});

    if (!await client.isContractDeployed(wallet.address)) {
        console.log("Contract not deployed");
    }

    const balance = await client.getBalance(wallet.address); 
    console.log(fromNano(balance));

    // EQBujQpZvdbLYHTzdGGj71Yf9x-8qfZ52ZD3Hor8zVY_On19

    const walletContract = client.open(wallet);
    const seqno = await walletContract.getSeqno();

    await walletContract.sendTransfer({
        secretKey: key.secretKey,
        seqno: seqno,
        messages: [
            internal({
                to: "EQBujQpZvdbLYHTzdGGj71Yf9x-8qfZ52ZD3Hor8zVY_On19",
                value: "0.5",
                body: "HELLO",
                bounce: false,
            })
        ]
    })

    let currSeqno = seqno
    while (currSeqno == seqno) {
        console.log("Waiting...");
        await sleep(1000);
        currSeqno = await walletContract.getSeqno();
    }

    console.log("Success");
}

main()

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}