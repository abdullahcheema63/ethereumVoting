import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Web3 from 'web3';
import './App.css';
import {VOTING} from "./contract_sources/Voting";
import {brown} from "@material-ui/core/colors";

class App extends Component {

    constructor() {
        super();
        this.state = {candidates: []}
        this.castVote = this.castVote.bind(this);

    }

    async loadBlockchainData() {
        this.setState({candidates: []});

        await Web3.givenProvider.enable();
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        const accounts = await web3.eth.getAccounts();
        const voting_contract = new web3.eth.Contract(VOTING.abi, VOTING.address);
        // const new_candidate = await voting_contract.methods.addCandidate("candidate1").send({from: "0x96f39A6F4743590bAf91f9f06675346fF2ad9452"});
        const candidate_count = await voting_contract.methods.getCandidateCount().call();

        let indexes = Array.from(Array(parseInt(candidate_count)).keys());
        console.log(indexes);
        indexes.forEach(index => {
            // console.log(index);
            voting_contract.methods.candidates(index).call().then((candidate) => {
                // console.log(candidate);
                this.setState({candidates: this.state.candidates.concat(candidate)});
            });

        });


        // console.log(value);
        // this.setState({value:value});
        // console.log(web3)
        // const accounts = await web3.eth.getAccounts();
        // .then((result) => {
        //     console.log(result)
        //     console.log("result")
        //
        //
        // });
        // this.setState({account: accounts[0]})
        // console.log(this.state);
    }

    async castVote(candidate) {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        const voting_contract = new web3.eth.Contract(VOTING.abi, VOTING.address);
        const value = await voting_contract.methods.castVote(candidate).send({from: "0x96f39A6F4743590bAf91f9f06675346fF2ad9452"});
        this.loadBlockchainData();
        console.log(value);
    }

    componentDidMount() {
        this.loadBlockchainData()
    }


    render() {

        const candidates_view = this.state.candidates.map(candidate =>
            <Button variant='contained' component="span" size="large" color="primary"
                    onClick={() => this.castVote(candidate)} key={candidate}>Vote {candidate}</Button>
        );
        return (
            <div className="App">
                <header className="App-header">
                    {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                    {/*<p>*/}
                    {/*    Edit <code>src/App.js</code> and save to reload.*/}
                    {/*</p>*/}
                    {/*<Button variant="contained" size="large" color="primary" onClick={this.castVote}>Vote</Button>*/}
                    {candidates_view}
                    {/*<h1>{this.state.value}</h1>*/}
                </header>
            </div>
        );
    }
}

export default App;
