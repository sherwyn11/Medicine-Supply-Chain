import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loader from '../../components/Loader';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function ViewUser(props) {
  const classes = useStyles();
  const [account] = useState(props.account);
  const [web3, setWeb3] = useState(props.web3);
  const [address, setAddress] = useState("");
  const [supplyChain] = useState(props.supplyChain);
  const [loading, isLoading] = useState(false);
  const [name, setName] = useState("");
  const [locationx, setLocationX] = useState("");
  const [locationy, setLocationY] = useState("");
  const [role, setRole] = useState("");

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  }

  async function handleSubmit() {
    var test = await supplyChain.methods.userInfo(address).call();
    setName(test.name);
    setRole(test.role);
    isLoading(true);
  }

  if (loading) return (
    <div>
      <p>{ address }</p>
      <p>{ web3.utils.toAscii(name) }</p>
      <p>{ role }</p>
    </div>
  );
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="address" label="Address" variant="outlined" onChange={ handleInputChange }/><br></br>
      <Button variant="contained" color="primary" onClick={ handleSubmit } >
        Submit
      </Button>   
    </form>
  );
} 