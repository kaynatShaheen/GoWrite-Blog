import { useState, useContext, Fragment } from 'react';
import { Box, styled } from "@mui/material";
import { DataContext } from '../../context/DataProvider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { API } from '../../service/api';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    padding: 40px;
`;

const HComponent = styled(Typography)`
    margin-bottom: 10px;
    font-weight: 600;
`;

const FormButton = styled(Button)`
    margin-top: 20px
`;

const Image = styled('img')`
    margin-top: -10vh;
`;

const Profile = () => {
    const { account, setAccount } = useContext(DataContext);
    const [name, setName] = useState(account.name || '');
    const [address, setAddress] = useState(account.address || '');
    const [phoneNumber, setPhoneNumber] = useState(account.phoneNumber || '');
    const [birthDate, setBirthDate] = useState(account.birthDate || '');
    const [showingSnackBar, setShowingSnackBar] = useState();

    const handleClose = () => {
        setShowingSnackBar(false);
    }

    const action = (
        <Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Fragment>
      );

    const submitForm = async () => {
        try {
            await API.updateUser({username: account.username, name, address, phoneNumber, birthDate});
            setAccount(prev => {
                console.log({...prev, name, address, phoneNumber, birthDate})
                return {...prev, name, address, phoneNumber, birthDate}
            });
            setShowingSnackBar(true);
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <Container>
            
            <Image src="data:image/png;base64,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" alt="" />

            <HComponent variant="h3">
                Edit your Info
            </HComponent>
            <TextField
                margin="normal"
                required
                placeholder='Enter new name' 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                id="name" 
                label="Name" 
                variant="outlined" 
            />

            <TextField
                margin="normal"
                placeholder='Enter new address' 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                id="address" 
                label="Address" 
                variant="outlined" 
            />

            <TextField
                margin="normal"
                placeholder='Enter your phone number'
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
                id="phoneNumber" 
                label="Phone Number" 
                variant="outlined" 
            />

            <TextField
                margin="normal"
                placeholder='Enter your birth date'
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)} 
                id="birthDate" 
                label="Birth Date" 
                variant="outlined" 
            />

            <FormButton onClick={submitForm} variant="outlined">Submit</FormButton>
            <Snackbar
                open={showingSnackBar}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Profile updated successfully"
                action={action}
            />
        </Container>
    )
}

export default Profile;