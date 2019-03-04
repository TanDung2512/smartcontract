import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Review from './Review.js';
import axios from 'axios';
const styles = theme =>( {
    root: {
        margin : "auto",
        marginTop : theme.spacing.unit * 10,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        width : "1000px"
    },
    container: {
        display: 'inline',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "70%"
    },
    layoutTransaction : {

        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        marginTop : theme.spacing.unit*3,
        marginBottom : theme.spacing.unit*3,
        marginLeft : "20%",
        marginRight : "20%",

    },
    button: {
        margin: theme.spacing.unit,
    },
    fab: {
        margin: theme.spacing.unit*2,
    },
    rightIcon: {
        margin: theme.spacing.unit,
    },

});


class mainPage extends Component{
    constructor(props){
        super(props);
        this.historyState = [];
        this.state = {
            contextTransactions : '',
            responseState : [],
        }

    };
    handleChange = prop => event => {
        if (prop === "send"){
            this.setState(state  => {
                if (this.state.weightRange === "send Ether") {
                    const list = state.sendList.push(
                        {
                            type: this.state.weightRange,
                            senderAddress: this.state.sender,
                            receiverAddress: this.state.receiver,
                            amount : this.state.amount,
                        });

                    this.setState(state => {
                        for (var i=0; i<state.stateAccountList.length ; i++){
                            if (state.stateAccountList[i].addressAccount === this.state.sender ){
                                state.stateAccountList[i].ether -= parseInt(this.state.amount);
                            }
                        }

                        for (var i=0; i<state.stateAccountList.length ; i++){
                            if (state.stateAccountList[i].addressAccount === this.state.receiver ){
                                state.stateAccountList[i].ether += parseInt(this.state.amount);
                            }
                        }

                        const listState = state.stateAccountList;
                        return {
                            listState
                        };
                    });
                    return {
                      list
                    };
                }
                else if (this.state.weightRange === "send Token"){
                    const list = state.sendList.push(
                        {
                            type: this.state.weightRange,
                            senderAddress: this.state.sender,
                            receiverAddress: this.state.receiver,
                            token : this.state.token,
                            amount : this.state.amount,
                        });
                    this.setState(state => {
                        for (var i=0; i<state.stateAccountList.length ; i++){
                            if (state.stateAccountList[i].addressAccount === this.state.sender ){
                                state.stateAccountList[i].Token.amount -= parseInt(this.state.amount);
                            }
                        }

                        for (var i=0; i<state.stateAccountList.length ; i++){
                            if (state.stateAccountList[i].addressAccount === this.state.receiver ){
                                state.stateAccountList[i].Token.amount += parseInt(this.state.amount);
                            }
                        }

                        const listState = state.stateAccountList;
                        return {
                            listState
                        };
                    });
                    return {
                        list
                    };
                }
                this.historyState.push(
                    this.state.stateAccountList
                )

            })



        }
        else {
            this.setState({[prop] : event.target.value})
        }
        console.log(this.state);
    };

    callAjax = () => {
        if (this.state.contextTransactions !== ""){
            axios.get('http://172.16.10.86:3001/input',{
                params: {
                    contextTransactions : this.state.contextTransactions
                }
            }).then(res => {
                console.log(res.data[0]);
                this.setState({"responseState" : res.data});
            })
        }

    };
    render(){
        const{classes} = this.props;

        return(
            <React.Fragment>

                <Paper className={classes.root}>
                <Typography component="h3" variant="h3" gutterBottom>
                    Smart contract
                </Typography>
                <form className={classes.container}>
                    <TextField
                        id="smartContractABI"
                        label="ABI smart contract"
                        className={classes.textField}
                        value = {this.state.ABISM}
                        onChange={this.handleChange('ABISM')}

                        margin = "normal"
                        variant ="outlined"
                    />
                    <TextField
                        id="Transaction"
                        label="Transaction"
                        value = {this.state.contextTransactions}
                        onChange={this.handleChange('contextTransactions')}

                        multiline = "true"

                        className={classes.textField}
                        margin = "normal"
                        variant ="outlined"
                    />
                    <br/>
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.callAjax}>
                    Send
                    </Button>
                </form>
                    <Review responseState = {this.state.responseState} />

                </Paper>



            </React.Fragment>
        );
    }


}
mainPage.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(mainPage);