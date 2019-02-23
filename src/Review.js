import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Tooltip from '@material-ui/core/Tooltip';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        margin : "auto",
        marginTop : theme.spacing.unit * 10,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        width : "80%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

class Review extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            checked : "",
        }
    }
    // handleToggle = value => () => {
    //     const currentIndex = this.state.checked.indexOf(value);
    //     const newChecked = [...this.state.checked];
    //     if (currentIndex === -1 ) {
    //         newChecked.push(value);
    //     }
    //     else {
    //         newChecked.splice(currentIndex,1);
    //     }
    //     this.setState({checked : newChecked});
    // };

    printInfo = (value) => {
        return value.senderAddress + " " +
            value.receiverAddress + " " +
            value.amount + " ";
    };
    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Paper className = {classes.root}>
                    <List dense >
                        {this.props.sendList !== [] && this.props.sendList.map(value => (
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.heading}>{value.type}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                        {this.props.stateAccountList.map(account => {
                                            if (account.addressAccount !== "none"){
                                            return (
                                            <Typography variant="h5" gutterBottom>
                                                {account.addressAccount + " " + account.ether + " " + account.Token.name + " " +account.Token.amount + " | "}
                                            </Typography>
                                        )}})}
                                </ExpansionPanelDetails>
                            </ExpansionPanel>

                        ))}
                    </List>
                </Paper>
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(Review);