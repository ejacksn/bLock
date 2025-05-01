// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

contract CapsuleInterface{

   address[] addresses;

   struct Capsule{
      address owner;
      uint amount;
      uint unlockTime;
      bool withdrawn; 

   }
   uint nextMaxID = 0; //int for managing capsules mapping
   mapping(uint => Capsule) capsules; // mapping to retrieve capsule by capsule id 
   mapping(address => uint[]) userCapsules; //mapping to find capsule ids based off user address

   event CapsuleCreated(uint256 id, address owner, uint256 unlockTime, uint256 amount);
   event CapsuleWithdrawn(uint256 id, address owner, uint256 amount);

   function createCapsule(uint _unlockTime) public payable{
      //create capsule object
      capsules[nextMaxID]=Capsule({
         owner: msg.sender,
         amount: msg.value,
         unlockTime: _unlockTime,
         withdrawn: false



      });
      
      userCapsules[msg.sender].push(nextMaxID); //make it so that the capsule is added to the list of capsules owned by the user
      emit CapsuleCreated(nextMaxID, msg.sender,_unlockTime, msg.value); //emit for frontend
      nextMaxID++; //increment id of next created capsule
      
   }

   function withdraw(uint _id) public {
      Capsule storage currentCapsule = capsules[_id];
      require (currentCapsule.withdrawn==false, "Contents of this capsule have already been withdrawn.");
      require (currentCapsule.owner == msg.sender, "Only owner can withdraw"); // only user can withdraw from their capsule
      require(currentCapsule.unlockTime<=block.timestamp, "Too early to withdraw from this capsule."); //unlock time has passed
      payable(currentCapsule.owner).transfer(currentCapsule.amount); //give money from capsule back to user
      currentCapsule.withdrawn=true; //mark withdrawn
      emit CapsuleWithdrawn(_id, msg.sender, currentCapsule.amount);
   }

   function getUserCapsuleIDs() external view returns (uint[] memory){
      return userCapsules[msg.sender]; //return all ids corresponding to user

   }

   function getCapsuleByID(uint _id) external view returns (Capsule memory){
      return(capsules[_id]);
   }

   function getCurrentTimestamp() public view returns (uint){
      return block.timestamp;
   }



 



}