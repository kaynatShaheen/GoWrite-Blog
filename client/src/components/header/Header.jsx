import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import Profile from '../profile/Profile';

const Component = styled(AppBar)`
    background: #D9D2D2;
    color: #000;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
    }
`


const Header = () => {
    return (
        <Component>
            <Container>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/profile'>PROFILE</Link>
                <Link to='/login'>LOGOUT</Link>
            </Container>
        </Component>
    )
}

export default Header;