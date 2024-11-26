import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import {Store} from '@subsquid/typeorm-store'
import * as erc20 from './abi/erc20'

export const CONTRACT_ADDRESS = '0xF5A8061bB2C5D9Dc9bC9c5C633D870DAC7bD351e'.toLowerCase()

export const processor = new EvmBatchProcessor()
    .setGateway('https://v2.archive.subsquid.io/network/monad-testnet')
    .setFields({
        log: {
            topics: true,
            data: true,
            address: true,
            transactionHash: true
        },
        transaction: {
            hash: true,
            gas: true,
            gasPrice: true,
            maxFeePerGas: true,
            maxPriorityFeePerGas: true,
            input: true,
            nonce: true,
            value: true,
            v: true,
            r: true,
            s: true,
            yParity: true,
            chainId: true,
            gasUsed: true,
            cumulativeGasUsed: true,
            effectiveGasPrice: true,
            contractAddress: true,
            type: true,
            status: true,
            sighash: true
        },
        block: {

            nonce: true,
            sha3Uncles: true,
            logsBloom: true,
            transactionsRoot: true,
            stateRoot: true,
            receiptsRoot: true,
            mixHash: true,
            miner: true,
            difficulty: true,
            totalDifficulty: true,
            extraData: true,
            size: true,
            gasLimit: true,
            gasUsed: true,
            baseFeePerGas: true
        }
    })
    .addLog({
        range: { from: 2094583 },
//        range: { from: 2812781, to: 2812781 },
        address: [CONTRACT_ADDRESS],
        topic0: [erc20.events.Transfer.topic],
        transaction: true,
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Context = DataHandlerContext<Store, Fields>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
