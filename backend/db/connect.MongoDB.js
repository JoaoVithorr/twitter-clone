import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log(`Connection to database successful: ${connection.connection.host}`)
    } catch (error) {
        console.error(
            `Error connecting to database:
            ${error.message}`
        ) 
        process.exit(1)
    }
}

export default connectMongoDB;