import mongoose from "mongoose"




const Connection = async (username, password) => {
    const URL = `mongodb://${username}:${password}@ac-l37jbgs-shard-00-00.cn9w1oc.mongodb.net:27017,ac-l37jbgs-shard-00-01.cn9w1oc.mongodb.net:27017,ac-l37jbgs-shard-00-02.cn9w1oc.mongodb.net:27017/?ssl=true&replicaSet=atlas-12ppqn-shard-0&authSource=admin&retryWrites=true&w=majority`;

    try {
        await mongoose.connect(URL, { useNewUrlParser: true });
        console.log('Database connected successfully! ');

    } catch (error) {
        console.log('Error while connecting with the database', error);
    }
}

export default Connection;