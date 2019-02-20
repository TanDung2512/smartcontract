import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const styles = theme =>( {
    root: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
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
});

const ranges = [
    {
        value : 'send-Ether',
        label : 'send Ether',
    },
    {
        value : 'send-Token',
        label : 'send Token',
    }
];


class mainPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            weightRange : '',
            amount : 0,
            token : "",
            ABISM : "",
            sender : "",
            receiver : "",
        }
    }


    handleChange = prop => event => {
        this.setState({[prop] : event.target.value})
    };

    render(){
        const{classes} = this.props;

        return(
            <React.Fragment>

                <Paper className={classes.root}>
                <Typography component="h2" variant="h1" gutterBottom>
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
                        id="address sender"
                        label="address sender"
                        value = {this.state.sender}
                        onChange={this.handleChange('sender')}

                        className={classes.textField}
                        margin = "normal"
                        variant ="outlined"
                    />
                    <TextField
                        id="address receiver"
                        label="address receiver"
                        value = {this.state.receiver}
                        onChange={this.handleChange('receiver')}
                        className={classes.textField}
                        margin = "normal"
                        variant ="outlined"
                    />
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
                        { this.state.weightRange !== "" ?  this.state.weightRange === "send-Ether" ? (
                            <form>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Disabled"
                                defaultValue="Sender"
                                className={classes.textField}
                                value = {this.state.sender}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Disabled"
                                defaultValue="Receiver"
                                value = {this.state.receiver}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
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
                        </form>) : (
                            <form>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    label="Disabled"
                                    defaultValue="Sender"
                                    value = {this.state.sender}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    label="Disabled"
                                    defaultValue="Receiver"
                                    value = {this.state.receiver}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                />
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
                        <Button variant="contained" color="primary" className={classes.button}>
                            Send
                        </Button>
                    </Paper>
                </Paper>


            </React.Fragment>
        );
    }
}
mainPage.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(mainPage);