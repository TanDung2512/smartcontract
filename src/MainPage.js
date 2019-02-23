import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Review from './Review.js';
import Icon from '@material-ui/core/Icon';

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

const ranges = [
    {
        value : 'send Ether',
        label : 'send Ether',
    },
    {
        value : 'send Token',
        label : 'send Token',
    }
];


class mainPage extends Component{
    constructor(props){
        super(props);
        this.historyState = [];
        this.state = {
            stateAccountList : [{
                addressAccount: "none",
                ether : 0 ,
                Token : {
                    name : "none",
                    amount : 0,
                }
            }
            ],
            addressAccount : "",
            weightRange : '',
            amount : 0,
            token : "",
            ABISM : "",
            sender : "None",
            receiver : "None",
            sendList : [],
            //type : "send Ether" || "send Token"
            //senderAddress : ""
            //receiveAddres : ""
            //nameToken : ""
            //amount : 1
        }
    }
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

    handleAdd = prop => () => {
        if (prop === "add" && this.state.addressAccount !== "") {
            this.setState(state => {
                const listAccount = state.stateAccountList.push(
                    {
                        addressAccount: this.state.addressAccount,
                        ether: 100,
                        Token: {
                            name: "BKHCM",
                            amount: 100,
                        },
                    }
                );
                return {
                    listAccount
                }
            });
            this.setState({addressAccount : ""}) ;
        }
    };

    deleteTransaction = () => {

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
                        id="address"
                        label="address"
                        value = {this.state.addressAccount}
                        onChange={this.handleChange('addressAccount')}
                        className={classes.textField}
                        margin = "normal"
                        variant ="outlined"
                    />
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleAdd("add")}>
                        <Icon className={classes.rightIcon}>+</Icon>
                    </Button>
                </form>
                    <TextField
                        select
                        label="Type of transaction"
                        className ={classNames(classes.margin,classes.textField)}
                        value={this.state.weightRange}
                        onChange = {this.handleChange('weightRange')}
                    >
                        {
                            ranges.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                    <Paper className={classNames(classes.layoutTransaction)}>
                        { this.state.weightRange !== "" ?  this.state.weightRange === "send Ether" ? (
                            <form>

                                <TextField
                                    id="sender input"
                                    select
                                    className={classes.textField}
                                    value={this.state.sender}
                                    onChange={this.handleChange('sender')}
                                    SelectProps={{
                                        native: true,
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    helperText="Choose sender's address "
                                    margin="normal"
                                >
                                    {this.state.stateAccountList.map(option => (
                                        <option key={option.addressAccount} value={option.addressAccount}>
                                            {option.addressAccount}
                                        </option>
                                    ))}
                                </TextField>

                                <TextField
                                    id="receiver input"
                                    select
                                    className={classes.textField}
                                    value={this.state.receiver}
                                    onChange={this.handleChange('receiver')}
                                    SelectProps={{
                                        native: true,
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    helperText="Choose receiver's address"
                                    margin="normal"
                                >
                                    {this.state.stateAccountList.map(option => (
                                        <option key={option.addressAccount} value={option.addressAccount}>
                                            {option.addressAccount}
                                        </option>
                                    ))}
                                </TextField>


                            <TextField
                                id="outlined-number"
                                label="amount"
                                value={this.state.amount}
                                onChange={this.handleChange('amount')}
                                type="number"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                                variant="outlined"
                            />
                        </form>) : (
                            <form>
                                <TextField
                                    id="sender input"
                                    select
                                    className={classes.textField}
                                    value={this.state.sender}
                                    onChange={this.handleChange('sender')}
                                    SelectProps={{
                                        native: true,
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    helperText="Choose sender's address "
                                    margin="normal"
                                >
                                    {this.state.stateAccountList.map(option => (
                                        <option key={option.addressAccount} value={option.addressAccount}>
                                            {option.addressAccount}
                                        </option>
                                    ))}
                                </TextField>

                                <TextField
                                    id="receiver input"
                                    select
                                    className={classes.textField}
                                    value={this.state.receiver}
                                    onChange={this.handleChange('receiver')}
                                    SelectProps={{
                                        native: true,
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    helperText="Choose receiver's address"
                                    margin="normal"
                                >
                                    {this.state.stateAccountList.map(option => (
                                        <option key={option.addressAccount} value={option.addressAccount}>
                                            {option.addressAccount}
                                        </option>
                                    ))}
                                </TextField>

                                <TextField
                                    id="Token"
                                    label="Token"
                                    value ={this.state.token}
                                    className={classes.textField}
                                    onChange={this.handleChange('token')}
                                    margin = "normal"
                                    variant ="outlined"
                                />
                                <TextField
                                    id="outlined-number"
                                    label="amount"
                                    value={this.state.amount}
                                    onChange={this.handleChange('amount')}
                                    type="number"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                    variant="outlined"
                                />

                            </form>
                        ) : <div/>}
                        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleChange("send")}>
                            commit
                        </Button>


                    </Paper >
                    <Review stateAccountList = {this.state.stateAccountList} sendList= {this.state.sendList} deleteTransaction = {this.deleteTransaction}/>
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleChange("send")}>
                        Send
                    </Button>
                </Paper>


            </React.Fragment>
        );
    }


}
mainPage.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(mainPage);