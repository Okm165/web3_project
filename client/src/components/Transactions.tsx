import { Component, useContext } from 'solid-js';

import { TransactionContext } from '../context/TransactionContext';
import { shortenAddress } from '../utils/shortenAddress';

import { Loader } from './';

interface TransactionCardInterface {
    key?: number,
    id?: number;
    url?: string;
    message?: string;
    timestamp?: string;
    addressFrom?: string;
    amount?: string;
    addressTo?: string;
}

const TransactionCard: Component<TransactionCardInterface> = ({key, addressTo, addressFrom, timestamp, message, amount, url}) => {
    return (
        <div class="bg-[#181918] m-4 flex flex-1
        2xl:min-w-[450px] sm:min-w-[270px] 
        2xl:max-w-[500px] sm:max-w-[300px]
        flex-col p-3 rounded-md hover:shadow-2xl
        ">
            <div class="flex flex-col items-center w-full mt-3">
                <div class="w-full mb-6 p-2">
                    <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
                        <p class="text-white text-base">From: {shortenAddress(addressFrom)}</p>
                    </a>
                    <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
                        <p class="text-white text-base">To: {shortenAddress(addressTo)}</p>
                    </a>
                    <p class="text-white text-base">Amount: {amount}</p>

                    {message && (
                        <>
                            <br />
                            <p class="text-white text-base">Message: {message}</p>
                        </>
                    )}

                    <div class="bg-black p-3 px-5 w-max rounded-3xl shadow-2xl">
                        <p class="text-[#37c7da] font-bold">{timestamp}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Transactions: Component = () => {

    const { currentAccount, transactions, isLoading} = useContext(TransactionContext);

    return (
        <div class="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div class="flex flex-col md:p-12 py-12 px-4">
                {currentAccount()
                    ? (<h3 class=" text-white text-3xl text-center my-2">
                        latest transactions
                    </h3>)
                    : (<h3 class=" text-white text-3xl text-center my-2">
                        connect your account to see latest transactions
                    </h3>)}

                <div class="flex flex-wrap justify-center items-center mt-10">
                    {transactions() 
                    ? (transactions().reverse().map((transaction, i) => (
                        <TransactionCard key={i} {...transaction} />
                    )))
                    :(<Loader />)}
                </div>
            </div>
        </div>
    );
}

export default Transactions
