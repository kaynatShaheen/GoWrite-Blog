import { useEffect, useState, useContext } from 'react';

import { Box, Typography, styled } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

//components
import Comments from './comments/Comments';


const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 3.5px solid #37876a;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 3.5px solid #cc3d27;
    border-radius: 10px;
    cursor: pointer;
`;

const Author = styled(Box)`
    color: #9c3658;
    margin: 20px 0;
    display: flex;
`;

const Description = styled(Typography)`
    word-break: break-word;
`;

const Heading = styled(Typography)`
    font-size: 32px;
    font-weight: 600;
    text-align: center;
    margin: 40px 0 0 0;
    word-break: break-word;
`;

const DetailView = () => {

    const [post, setPost] = useState({});

    const { id } = useParams();
    const { account } = useContext(DataContext);

    const navigate = useNavigate();

    const url = post.picture ? post.picture : 'https://images.pexels.com/photos/9976156/pexels-photo-9976156.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'

    useEffect(() => {
        const fetchData = async() => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, [])

    const deleteBlog = async () => {
        let response = await API.deletePost(post._id);
        if (response.isSuccess) {
            navigate('/');
        }
    }

    return (
        <Container>
            <Image src={url} alt="blog" />

            <Box style={{ float: 'right' }}>
                {
                    account.username === post.username &&
                    <>
                        <Link to={`/update/${post._id}`}><EditIcon /></Link>
                        <DeleteIcon onClick={() => deleteBlog()}/>
                    </>
                }

            </Box>

            <Heading>{post.title}</Heading>

            <Author>
                <Typography>Author: <Box component="span" style={{ fontWeight: 600 }}>{post.username}</Box></Typography>
                <Typography style={{ marginLeft: 'auto' }}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>

            <Description>{post.description}</Description>
            <Comments post={post} />
        </Container>
    )
}

export default DetailView;