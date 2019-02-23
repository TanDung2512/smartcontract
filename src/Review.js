import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
const styles = theme => ({
    root: {
        margin : "auto",
        marginTop : theme.spacing.unit * 10,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        width : "400px"
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
                            <Tooltip title={this.printInfo(value)}>
                            <ListItem key ={value} button>
                               <ListItemText primary={value.type } />
                            </ListItem>
                            </Tooltip>
                        ))}
                    </List>
                </Paper>
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(Review);