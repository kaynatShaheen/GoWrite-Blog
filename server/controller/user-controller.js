import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from "../model/user.js";
import Token from "../model/token.js";

dotenv.config();

export const signupUser = async (request, response) => {
    try {
       // const salt = await bcrypt.genSalt();
       const hashedPassword = await bcrypt.hash(request.body.password, 10);
       const user = { username: request.body.username, name: request.body.name, password: hashedPassword };
       
       const newUser = new User(user);
       await newUser.save();
        
        return response.status(200).json({ msg: 'signup successfull' })
    } catch (error) {
        return response.status(500).json({ msg: 'error while signing up the user' })
    }
}

export const userUpdate = async (request, response) => {
    try {
        let userDoc = await User.findOne({ username: request.body.username });
        
        const oldUser = {
            name: userDoc.name, 
            username: userDoc.username, 
            address: userDoc.address, 
            phoneNumber: userDoc.phoneNumber, 
            birthDate: userDoc.birthDate
        }
        
        
        if (!userDoc) {
            return response.status(400).json({ msg: 'Username does not match' });
        }
        
        const newUserDoc = await User.updateOne(
            {username: request.body.username}, 
            {...oldUser, ...request.body},
        );

        return response.status(200).json({ msg: 'user updated successfully' })
    } catch (error) {
        return response.status(500).json({ msg: 'error while updating the user' })
    }
}

export const loginUser = async (request, response) => {
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
        return response.status(400).json({ msg: 'Username does not match' });
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new Token({ token: refreshToken })
            await newToken.save();
            

            return response.status(200).json({ 
                accessToken: accessToken, 
                refreshToken: refreshToken, 
                name: user.name,
                username: user.username,
                address: user.address,
                birthDate: user.birthDate,
                phoneNumber: user.phoneNumber
            })

        } else {
            response.status(400).json({ msg: 'Password does not match' });
        }
    } catch (error) {
        return response.status(500).json({ msg: 'Error while logging in the user' })
    }
}