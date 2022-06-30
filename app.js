const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");


const app = express();
app.use(express.json());

let login = [];

fs.readFile("accounts.json", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        login = JSON.parse(data);
    }
})

//POST
app.post("/login", (req, res) => {
    const { name, email, user, password } = req.body;

    const account = {
        name,
        email,
        user,
        password,
        id: randomUUID()
    };

    login.push(account);

    listAccounts();

    return res.json(account);
});
/////////////////////////////////////////////


//GET
app.get("/login", (req, res) => {
    return res.json(login);
})
/////////////////////////////////////////////


//GET with ID
app.get("/login/:id", (req, res) => {
    const { id } = req.params;
    const account = login.find((account) => account.id === id);
    return res.json(account);
})
/////////////////////////////////////////////


//PUT
app.put("/login/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, user, password } = req.body;

    const loginIndex = login.findIndex(account => account.id === id)
    login[loginIndex] = {
        ...login[loginIndex],
        name,
        email,
        user,
        password
    };

    listAccounts();

    return res.json({ message: "Login alterado com sucesso!" })
})
/////////////////////////////////////////////


// DELETE
app.delete("/login/:id", (req, res) => {
    const { id } = req.params;
    const loginIndex = login.findIndex(account => account.id === id)

    login.splice(loginIndex, 1);

    listAccounts();

    return res.json({ message: "Usuário apagado com sucesso!" })
})
/////////////////////////////////////////////

app.listen(4002, () => console.log("A aplicação em express está rdando na porta 4002!"));


function listAccounts() {
    fs.writeFile("accounts.json", JSON.stringify(login), (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Login inserido!")
        }
    })
}

/**
 * POST
 * Body -> Sempre que eu quiser enviar dados para a aplicação
 * Params -> /accounts/u12389172191212
 * Query -> /accounts?id=1321311346&email=187319314714221041
 */