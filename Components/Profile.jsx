import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Image from "next/image";

// INTERNAL IMPORT
import images from "../Images/index";

export default ({
    openProfile,
    setOpenProfile,
    currentUser,
    getShipmentsCount,
}) => {
    const [count, setCount] = useState();
    const [chainId, setChainId] = useState(null);
    const [hexChainId, setHexChainId] = useState("");
    const [numericChainId, setNumericChainId] = useState(0);
    const [accountBalance, setAccountBalance] = useState(0);

    useEffect(() => {
        const getShipmentsData = getShipmentsCount();

        return async () => {
            const allData = await getShipmentsData;
            setCount(allData);
        };
    }, []);

    useEffect(() => {
        if (window.ethereum) {
            console.log("MetaMask detected");
            window.ethereum
                .request({ method: 'eth_chainId' })
                .then(chainId => {
                    console.log("Chain ID:", chainId);
                    setChainId(chainId);

                    // Set hexadecimal chain ID directly
                    setHexChainId(chainId);

                    // Convert the chain ID to numeric format
                    const numericId = parseInt(chainId, 16);
                    setNumericChainId(numericId);

                    // Fetch account balance
                    fetchAccountBalance();
                })
                .catch(error => {
                    console.error("Error fetching chain ID:", error);
                });
        } else {
            console.error("MetaMask not detected");
        }
    }, []);

    // Function to fetch the account balance
    const fetchAccountBalance = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const accounts = await provider.send("eth_requestAccounts", []);
                const balanceInWei = await provider.getBalance(accounts[0]);
                const balanceInEth = ethers.utils.formatEther(balanceInWei);
                const formattedBalance = parseFloat(balanceInEth).toFixed(2) + " ETH";
                setAccountBalance(formattedBalance);
                console.log("Account Balance:", formattedBalance);
            } else {
                console.error("MetaMask not detected or not connected");
            }
        } catch (error) {
            console.error("Error fetching account balance:", error);
        }
    };
    


    return openProfile ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setOpenProfile(false)}></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    <div className="flex justify-end">
                        <button className="p-2 text-gray-400 rounded-md hover:bg-gray-100" onClick={() => setOpenProfile(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div className="max-w-sm mx-auto py-3 space-y-3 text-left">
                        <div className="flex flex-col items-center pb-10">
                            <Image className="w-24 h-24 mb-3 rounded-full shadow-lg" src={images.avatar} alt="Bonnie image" />
                            <h4 className="mb-1 text-xl font-medium dark:text-gray-1000 Idark:text-white">
                                Welcome Trader 
                            </h4>
                            <p>
                                <span className="text-sm text-gray-500 dark:text-gray-800 font-bold">Account: </span>
                                <span className="text-sm text-gray-500 dark:text-gray-800">{currentUser}</span><br />

                                <span className="text-sm text-gray-500 dark:text-gray-800 font-bold">Chain ID (Hex): </span>
                                <span className="text-sm text-gray-500 dark:text-gray-800">{hexChainId}</span><br />

                                <span className="text-sm text-gray-500 dark:text-gray-800 font-bold">Chain ID (Numeric): </span>
                                <span className="text-sm text-gray-500 dark:text-gray-800">{numericChainId}</span><br />
                            </p>

                            <div className="flex mt-4 space-x-3 md:mt-5">
                                <a className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black rounded-lg border-2">
                                    Balance: {accountBalance}
                                </a>
                                <a className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black rounded-lg border-2">
                                    Total Shipment: {count}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};
