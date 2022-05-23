import { createContext, useContext, Component, JSX, createEffect, createSignal, Accessor, Setter } from "solid-js";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { contractAddress, contractABI } from "../utils/constants";
import { ExternalProvider } from "@ethersproject/providers";

declare global {
    interface Window {
        ethereum?: MetaMaskInpageProvider
    }
}

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

interface fromDataInterface {
    addressTo: string,
    amount: string,
    keyword: string,
    message: string,
}

export const TransactionContext = createContext<{
    connectWallet: () => void,
    currentAccount: Accessor<string>
    formData: Accessor<fromDataInterface>,
    setFormData: Setter<fromDataInterface>,
    handleChange: (e: Event, name: string) => void,
    sendTransaction: () => void,
    setIsLoading: Setter<boolean>,
    isLoading: Accessor<boolean>,
    transactions: Accessor<TransactionCardInterface[]>
}>({
    connectWallet: null,
    currentAccount: null,
    formData: null,
    setFormData: null,
    handleChange: null,
    sendTransaction: null,
    setIsLoading: null,
    isLoading: null,
    transactions: null,
});

const { ethereum } = window;

const getEtheriumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum as ExternalProvider);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionContract;
}

export function TransactionProvider(props: { children: JSX.Element }) {

    const [currentAccount, setCurrentAccount] = createSignal<string>("");
    const [formData, setFormData] = createSignal<fromDataInterface>();
    const [isLoading, setIsLoading] = createSignal<boolean>(false);
    const [transactions, setTransactions] = createSignal<TransactionCardInterface[]>();

    const handleChange = (e: Event, name: string) => {
        const dom_object = e.target as HTMLInputElement;
        setFormData((prevstate: fromDataInterface) => ({ ...prevstate, [name]: dom_object.value }))
    }

    const getAllTransactions = async () => {
        try {
            if (!ethereum) return alert("Install Metamask!");
            const transactionContract = getEtheriumContract();
            const availableTransactions = await transactionContract.getAllTransactions();

            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10**18),
            }))

            setTransactions(structuredTransactions);
            console.log(structuredTransactions)
        } catch (error) {
            console.log(error);
        }
    }

    const checkIfWalletIsConnected = async () => {
        if (!ethereum) return alert("Install Metamask!");
        const accounts = await ethereum.request<string[]>({ method: 'eth_accounts' });
        if (accounts.length) {
            setCurrentAccount(accounts[0]);
            getAllTransactions();
        } else {
            console.log("no accounts found");
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Install Metamask!");
            const accounts = await ethereum.request<string[]>({ method: 'eth_requestAccounts' });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransactions();

            } else {
                console.log("no accounts found");
            }

        } catch (error) {
            console.log(error);
            throw new Error("no etherium obj")
        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Install Metamask!");

            const { addressTo, amount, keyword, message } = formData();
            const transactionContract = getEtheriumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount(),
                    to: addressTo,
                    value: parsedAmount._hex,
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            setIsLoading(true);
            console.log(`loading - ${transactionHash.hash}`)
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`success - ${transactionHash.hash}`)

        } catch (error) {
            console.log(error);
            throw new Error("no etherium obj")
        }
    }

    createEffect(() => {
        checkIfWalletIsConnected();
    })

    return (
        <TransactionContext.Provider value={{
            connectWallet,
            currentAccount,
            formData,
            setFormData,
            handleChange,
            sendTransaction,
            setIsLoading,
            isLoading,
            transactions,
        }}>
            {props.children}
        </TransactionContext.Provider>
    )
}