import React, { useState, useEffect } from "react";
import Image from "next/image";

// INTERNAL IMPORT
import images from "../Images/index";

const YourComponent = ({ setCreateShipmentModel, allShipmentsdata }) => {
    const [copiedId, setCopiedId] = useState(null);

    const converTime = (time) => {
        const newTime = new Date(time);
        const dataTime = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(newTime);

        return dataTime;
    };

    const copyToClipboard = (id) => {
        navigator.clipboard.writeText(id);
        setCopiedId(id);
        setTimeout(() => {
            setCopiedId(null);
        }, 2000); // Reset copied state after 2 seconds
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                <div className="min-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Create Tracking
                    </h3>
                    <p className="text-gray-600 mt-2">
                        In here click the "Add Tracking button" for creating the tracking of your product and connect with the Meta Mask then your product are in the list. 
                        Then you have to look your product and know my product is in the pending state or completed state and if your state in pending so first complete the payment then transaction will be completed.
                        After that your Shipment will be start to process and delivered your product.
                    </p>
                </div>
                <div className="mt-3 md:mt-0">
                    <button
                        onClick={() => setCreateShipmentModel(true)}
                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 hover:bg-gray-600 active:bg-gray-900 md:text-sm rounded-lg md:inline-flex"
                    >
                        Add Tracking
                    </button>
                </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            {/* <th className="py-3 px-6">Id</th> */}
                            <th className="py-3 px-6">Sender</th>
                            <th className="py-3 px-6">Receiver</th>
                            <th className="py-3 px-6">PickupTime</th>
                            <th className="py-3 px-6">Distance</th>
                            <th className="py-3 px-6">Price</th>
                            <th className="py-3 px-6">Delivery Time</th>
                            <th className="py-3 px-6">Paid</th>
                            <th className="py-3 px-6">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {allShipmentsdata?.map((shipment, idx) => (
                            <tr key={idx}>
                                {/* <td className="px-6 py-4 whitespace-nowrap">{idx}</td> */}
                                <td className="px-6 py-4 whitespace-nowrap relative">
                                    <span className="group" onMouseEnter={() => setCopiedId(null)}>
                                        {shipment.sender.slice(0, 15)}......
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 absolute right-7 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 16 16" id="copy" onClick={() => copyToClipboard(shipment.sender)}>
                                            <path fill="#212121" d="M4.00029246,4.08524952 L4,10.5 C4,11.8254834 5.03153594,12.9100387 6.33562431,12.9946823 L6.5,13 L10.9143985,13.000703 C10.7082819,13.5829319 10.1528467,14 9.5,14 L6,14 C4.34314575,14 3,12.6568542 3,11 L3,5.5 C3,4.84678131 3.41754351,4.29108512 4.00029246,4.08524952 Z M11.5,2 C12.3284271,2 13,2.67157288 13,3.5 L13,10.5 C13,11.3284271 12.3284271,12 11.5,12 L6.5,12 C5.67157288,12 5,11.3284271 5,10.5 L5,3.5 C5,2.67157288 5.67157288,2 6.5,2 L11.5,2 Z" />
                                        </svg>
                                        {copiedId === shipment.sender && <span className="text-green-500 ml-2">(Copied!)</span>}
                                    </span>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap relative">
                                    <span className="group" onMouseEnter={() => setCopiedId(null)}>
                                        {shipment.receiver.slice(0, 15)}......
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 absolute right-7 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 16 16" id="copy" onClick={() => copyToClipboard(shipment.receiver)}>
                                            <path fill="#212121" d="M4.00029246,4.08524952 L4,10.5 C4,11.8254834 5.03153594,12.9100387 6.33562431,12.9946823 L6.5,13 L10.9143985,13.000703 C10.7082819,13.5829319 10.1528467,14 9.5,14 L6,14 C4.34314575,14 3,12.6568542 3,11 L3,5.5 C3,4.84678131 3.41754351,4.29108512 4.00029246,4.08524952 Z M11.5,2 C12.3284271,2 13,2.67157288 13,3.5 L13,10.5 C13,11.3284271 12.3284271,12 11.5,12 L6.5,12 C5.67157288,12 5,11.3284271 5,10.5 L5,3.5 C5,2.67157288 5.67157288,2 6.5,2 L11.5,2 Z" />     
                                        </svg>
                                        {copiedId === shipment.receiver && <span className="text-green-500 ml-2">(Copied!)</span>}
                                    </span>
                                </td>
                                
                                <td className="px-6 py-4 whitespace-nowrap">{converTime(shipment.pickupTime)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{shipment.distance} Km</td>
                                <td className="px-6 py-4 whitespace-nowrap">{shipment.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{shipment.deliveryTime}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{shipment.isPaid ? "Completed" : "Not Complete"}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {shipment.status === 0
                                        ? "Pending"
                                        : shipment.status === 1
                                        ? "IN_TRANSIT"
                                        : "Delivered"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default YourComponent;
