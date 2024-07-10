// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Voting {
    // Structure to hold candidate details
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Mapping of candidate ID to Candidate struct
    mapping(uint => Candidate) public candidates;

    // Store addresses that have voted
    mapping(address => bool) public voters;

    // Number of candidates
    uint public candidatesCount;

    // Constructor to initialize candidates
    constructor() {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    // Function to add a candidate
    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    // Function to vote for a candidate
    function vote(uint _candidateId) public {
        // Check if the voter has not voted before
        require(!voters[msg.sender], "You have already voted.");

        // Check if the candidate ID is valid
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID.");

        // Record that the voter has voted
        voters[msg.sender] = true;

        // Increment the vote count for the candidate
        candidates[_candidateId].voteCount++;
    }
}
