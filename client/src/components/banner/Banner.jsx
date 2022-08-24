

import { Box, Typography, styled } from '@mui/material';

const Image = styled(Box)`
    background: url(https://images.pexels.com/photos/4665064/pexels-photo-4665064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1) center/53% repeat-x #000;
    width: 100%;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    color: #edd3d3;
    line-height: 1

`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    color: #ffffff;
    background: #8c7d7d;
`

const Banner = () => {
    return (
        <Image>
            <Heading>GoWrite</Heading>
            <SubHeading>Explore different frames of mind</SubHeading>
        </Image>
    )
}

export default Banner;