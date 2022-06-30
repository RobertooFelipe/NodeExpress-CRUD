const http = require("http"); //import biblioteca http

http.createServer((req, res) => { // método de request e response da conexão
    res.writeHead(200, { 'Content-Type': 'application/json' }); //tipo de retorno

    if (req.url === '/jogos') {
        res.end(JSON.stringify({ //enviando response em JSON
            message: "Rota de jogos"
        }));
    };

    if (req.url === '/users') {
        res.end(JSON.stringify({ //enviando response em JSON
            message: "Rota de users"
        }));
    };

    if (req.url === '/outra') {
        res.end(JSON.stringify({ //enviando response em JSON
            message: "Outra rota"
        }));
    };
}).listen(4001, () => console.log("O Servidor está rodando na porta 4001!")) //Define porta
