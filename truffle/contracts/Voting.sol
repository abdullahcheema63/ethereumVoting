pragma solidity ^0.5.0;

contract Voting {
    address public creater;
    string[] public candidates;
    mapping(string => uint) public votes;
    constructor() public {
        creater = msg.sender;
    }
    function addCandidate(string memory name) public {
        votes[name] = 0;
        candidates.push(name);
    }
    function castVote(string memory name) public{
        votes[name]++;
    }
    function getCandidateCount() public view returns(uint) {
        return candidates.length;
    }
}
