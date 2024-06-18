const http = require('http');
const express = require('express');
const path = require('path');

const app = express();

// Middleware para redirecionar HTTPS para HTTP
app.use((req, res, next) => {
  if (req.secure) {
    // Redirecionar para HTTP
    return res.redirect(`http://${req.headers.host}${req.url}`);
  }
  next();
});

// Servir os arquivos estáticos da pasta dist
const appPath = path.join(__dirname, 'dist');
app.use(express.static(appPath));

// Redirecionar todas as requisições para o index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(appPath, 'index.html'));
});

// Definir a porta e iniciar o servidor HTTP
const PORT = process.env.PORT || 3000;
http.createServer(app).listen(PORT, () => {
  console.log(`Servidor HTTP rodando na porta ${PORT}`);
});