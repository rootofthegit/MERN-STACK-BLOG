import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from "react-redux";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function CustomizedSnackbars(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className={classes.root}>
            {/*<Button variant="outlined" onClick={handleClick}>
                Open success snackbar
            </Button>*/}
            <Snackbar open={true} onClose={handleClose}>
                <Alert onClose={handleClose} severity={props.alert.severity}>
                    {props.alert.text}
                </Alert>
            </Snackbar>
            {/*<Alert severity="error">This is an error message!</Alert>
            <Alert severity="warning">This is a warning message!</Alert>
            <Alert severity="info">This is an information message!</Alert>
            <Alert severity="success">This is a success message!</Alert>*/}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        alert: state.app.alert
    }
}

export default connect(mapStateToProps)(CustomizedSnackbars)

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Alert from '@material-ui/lab/Alert';
//
// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     '& > * + *': {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));
//
// export default function AlertComponent(props) {
//   const classes = useStyles();
//
//   return (
//       <div className={classes.root}>
//         <Alert variant="filled" severity="info">
//           {props.text}
//         </Alert>
//       </div>
//   );
// }
