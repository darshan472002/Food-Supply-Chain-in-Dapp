import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
// import 'bootstrap/dist/css/bootstrap.min.css';

// INTERNAL IMPORT
import tracking from "@/Conetxt/Tracking.json";
const ContractAddress = "0x47685ca6bA561FE6323E03CbCAF455EE7b96D949";
const ContractABI = tracking.abi;

// ---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
    new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
    // STATE VARIABLE
    const DappName = "Product Tracking Dapp";
    const [currentUser, setCurrentUser] = useState("");

    const createShipment = async (items) => {
        console.log(items);
        const { receiver, pickupTime, distance, price } = items;

        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const createItem = await contract.createShipment(
                receiver,
                new Date(pickupTime).getTime(),
                distance,
                ethers.utils.parseUnits(price, 18),
                {
                    value: ethers.utils.parseUnits(price, 18),
                }
            );
            await createItem.wait();
            window.location.reload();
        } catch (error) {
            console.log("Some want wrong", error);
        }
    };

    const getAllShipment = async () => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const shipments = await contract.getAllTransactions();
            const allShipments = shipments.map((shipment) => ({
                sender: shipment.sender,
                receiver: shipment.receiver,
                price: ethers.utils.formatEther(shipment.price.toString()),
                pickupTime: shipment.pickupTime.toNumber(),
                deliveryTime: shipment.deliveryTime.toNumber(),
                distance: shipment.distance.toNumber(),
                isPaid: shipment.isPaid,
                status: shipment.status,
            }));

            return allShipments;
        } catch (error) {
            console.log("error want, getting shipment");
        }
    };

    const getShipmentsCount = async () => {
        try {
            if (!window.ethereum) return "Install MetaMask";

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const shipmentsCount = await contract.getShipmentsCount(accounts[0]);
            return shipmentsCount.toNumber();
        } catch (error) {
            console.log("error want, count the getting shipment");
        }
    };

    const completeShipment = async (completeShip) => {
        console.log(completeShip);

        const { receiver, index } = completeShip;
        try {
            if (!window.ethereum) return "Install MetaMask";

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const transaction = await contract.completeShipment(
                accounts[0],
                receiver,
                index,
                {
                    gasLimit: 300000,
                }
            );

            transaction.wait();
            window.location.reload();
        } catch (error) {
            console.log("wrong completeShipment", error);
        }
    };

    const getShipment = async (index) => {
        try {
            if (!window.ethereum) return "Install MetaMask";

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const shipment = await contract.getShipment(accounts[0], index);

            const SingleShiplent = {
                sender: shipment[0],
                receiver: shipment[1],
                pickupTime: shipment[2].toNumber(),
                deliveryTime: shipment[3].toNumber(),
                distance: shipment[4].toNumber(),
                price: ethers.utils.formatEther(shipment[5].toString()),
                status: shipment[6],
                isPaid: shipment[7],
            };

            return SingleShiplent;
        } catch (error) {
            console.log("Sorry no Shipment");
        }
    };

    const startShipment = async (getProduct) => {
        const { receiver, index } = getProduct;

        try {
            if (!window.ethereum) return "Install MetaMask";

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            console.log(accounts[0],receiver,index)
            const shipment = await contract.startShipment(
                accounts[0],
                receiver,
                index
            );

            shipment.wait();
            window.location.reload();
            console.log(shipment);
        } catch (error) {
            console.log("Sorry no Shipment", error);
        }
    };

// ---CONNECT WALLET FUNCTION
const connectWallet = async () => {
    try {
        if (!window.ethereum) {
            const result = window.confirm("MetaMask is not installed. Do you want to download it?");
            if (result) {
                window.open("https://metamask.io/download.html", "_blank");
            }
        } else {
            window.alert("MetaMask is installed")
        }
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        setCurrentUser(accounts[0]);
    } catch (error) {
        window.alert("Error connecting MetaMask: " + error.message);
    }
};

    return (
        <TrackingContext.Provider
            value={{
                connectWallet,
                createShipment,
                getAllShipment,
                completeShipment,
                getShipment,
                startShipment,
                getShipmentsCount,
                DappName,
                currentUser,
            }}
        >
            {children}
        </TrackingContext.Provider>
    );
};