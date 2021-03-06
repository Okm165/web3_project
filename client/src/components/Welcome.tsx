import { Component, useContext } from 'solid-js';
import { SiEthereum } from "solid-icons/si"
import { BsInfoCircle } from "solid-icons/bs"

import { Loader } from "./"
import { TransactionContext } from '../context/TransactionContext';
import { shortenAddress } from '../utils/shortenAddress';

const commonStyles: string = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

interface InputInterface {
    placeholder?: string
    name?: string
    type?: string
    value?: string
    handleChange?: (e: Event, name: string) => unknown
}

const Input: Component<InputInterface> = ({ placeholder, name, type, value, handleChange }) => {
    return (
        <input
            placeholder={placeholder}
            type={type}
            step="0.0001"
            value={value ? value : null}
            onChange={(e: Event) => handleChange(e, name)}
            class="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        />
    );
}

const Welcome: Component = () => {
    const { 
        connectWallet, 
        currentAccount, 
        formData, 
        handleChange, 
        sendTransaction,
        isLoading,
    } = useContext(TransactionContext);

    const handleSubmit = (e: Event) => {
        const { addressTo, amount, keyword, message } = formData();
        e.preventDefault();

        if (!addressTo || !amount || !keyword || !message) return;
        sendTransaction();
    }

    return (
        <div class="flex w-full justify-center items-center">
            <div class="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div class="flex flex-1 justify-start flex-col mf:mr-10">
                    <h1 class="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Send Cryoto <br /> across the world
                    </h1>
                    <p class="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Explore the crypto world. Buy and sell cryptocurrencies on KRYPT
                    </p>
                    {!currentAccount() && (<button
                        type='button'
                        onClick={connectWallet}
                        class="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd] outline-none"
                    >
                        <p class="text-white text-base font-semibold">Connect Wallet</p>
                    </button>)}
                    <div class="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div class={`rounded-tl-2xl ${commonStyles}`}>
                            Reliability
                        </div>
                        <div class={`${commonStyles}`}>
                            Security
                        </div>
                        <div class={`rounded-tr-2xl ${commonStyles}`}>
                            Etherium
                        </div>
                        <div class={`rounded-bl-2xl ${commonStyles}`}>
                            Web 3.0
                        </div>
                        <div class={`${commonStyles}`}>
                            Low fees
                        </div>
                        <div class={`rounded-br-2xl ${commonStyles}`}>
                            Blockchain
                        </div>
                    </div>
                </div>

                <div class="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <div class="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorpism">
                        <div class="flex justify-between flex-col w-full h-full">
                            <div class="flex justify-between items-start">
                                <div class="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum size={21} color="#fff" />
                                </div>
                                <BsInfoCircle size={17} color="#fff" />
                            </div>
                            <div>
                                <p class="text-white font-light text-sm">
                                    {shortenAddress(currentAccount())}
                                </p>
                                <p class="text-white font-semibold text-lg mt-1">
                                    Etherium
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
                        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
                        <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
                        <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />

                        <div class="h-[1px] w-full bg-gray-400" />

                        {isLoading()
                            ? (<Loader />)
                            : (<button
                                type="button"
                                onClick={handleSubmit}
                                class="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                            >Send Now</button>)}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Welcome
