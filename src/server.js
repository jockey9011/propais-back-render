
const app = require('./app');
const sequelize = require('./utils/connection');
const cors = require('cors');

const PORT = process.env.PORT || 8080;

const main = async () => {
    try {
        await sequelize.sync();
        console.log("DB connected");
        
        // Configuración de CORS
        app.use(cors({
            origin: 'https://il30-propais.netlify.app',
            credentials: true,
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }));
        
        app.listen(PORT);
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.log(error);
    }
}

main();
