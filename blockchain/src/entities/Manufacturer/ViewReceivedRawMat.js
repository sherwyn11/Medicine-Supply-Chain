import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loader from '../../components/Loader';
import RawMaterial from '../../build/RawMaterial.json';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function ViewReceivedRawMat(props) {
  const classes = useStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(12),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const [account] = useState(props.account);
  const [web3, setWeb3] = useState(props.web3);
  const [supplyChain] = useState(props.supplyChain);
  const [loading, isLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [rawMatAddress, setRawMatAddress] = useState("");

  const handleInputChange= (e) =>{
    if(e.target.id == rawMatAddress){
      setRawMatAddress(e.target.value);
    }
  }
  const handleSubmit= (e)=> {
    e.preventDefault();
    var rawMaterialAddress =  supplyChain.methods.manufacturerReceivedRawMaterials(rawMatAddress).call({from: account});
    console.log(rawMaterialAddress);
    console.log("Please Work");
    var components = rawMaterialAddress.map((addr) => {
      return <div><ul><li>
        <Link to={{pathname: `/manufacturer/view-received-raw-materials/${addr}`, query: {address: addr, account: account, web3: web3, supplyChain: supplyChain}}}>{addr}</Link>
      </li></ul></div>;
    });
    setAddress(components);
    isLoading(true);
  }

  if (loading) { 
    return (
      <div>
        <h4>Received Raw Material</h4>
        { address }
      </div>
    );
  } else{
    // handleSubmit();
    console.log("Okay");
    return (
      <div className={classes.paper}>
         <h2>Enter Information</h2> 
         <Grid container style={{ backgroundColor: "white", display: "center", alignItems: "center", maxWidth: 400, justify: "center"}}>
          <form className={classes.form} noValidate>
            <Grid item xs={12}>
                <TextField variant="outlined" onChange={ handleInputChange } required fullWidth  id="rawMatAddress" label="Raw Material Address" name="rawMatAddress"/>
            </Grid>
          </form>
        </Grid>
        <Button
              type="submit"  variant="contained" color="primary"className={classes.submit} onClick={ handleSubmit } >
              Submit
            </Button>
      </div>    
    );
  }
} 