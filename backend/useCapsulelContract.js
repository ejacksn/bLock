import { useSigner } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import  abi from "@/backend/CapsuleInterfaceABI.json"; //import abi
 
const contractAddress = "0x7cd36Acaa868dCCf26059130Fb90F224e451888C"
; //deployed contract address

export function useCapsuleContract() {
    const signer = useSigner(); //get signer from thirdweb
    if (!signer) {
        return null; //if no signer, return null
    }
    const contract = new ethers.Contract(contractAddress, abi, signer); //create contract instance with address, abi and signer
    
    return contract; //return contract instance
    }

