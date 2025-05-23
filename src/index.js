import express from 'express'; 

const server = express();

const PORT = process.env.PORT || 3000;

server.get('/', (req, res) => {
    res.status(200).send('Primeira Rota do Backend');
});

server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})