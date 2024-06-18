const express = require('express');
const path = require('path');

const app = express();

// Servir os arquivos estáticos da pasta dist
const appPath = path.join(__dirname, 'dist');
app.use(express.static(appPath));

// Redirecionar todas as requisições para o index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(appPath, 'index.html'));
});

// Definir a porta e iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});