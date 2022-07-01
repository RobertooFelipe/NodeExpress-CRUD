const express = require("express"); //import "Express" at this project.
const { randomUUID } = require("crypto"); //import "Crypto" (Random UUID) at this project.
const fs = require("fs"); //import "FS" - File System at this projct.


const app = express(); //Starting a const with Express
app.use(express.json()); // specific datatype to work 

let login = []; //Creating a array to save data (But in this project has implemented the FS to manegement data with a JSON file).

fs.readFile("accounts.json", "utf-8", (err, data) => { //Reading the files saved in FS Json to method "utf-8", in this case we have 2 returns error or data saved.
    if (err) {
        console.log(err); //Error
    } else {
        login = JSON.parse(data);//Posting data read in json file at array.
    }
})

//POST
app.post("/login", (req, res) => { //Creating a POST method.
    const { name, email, user, password } = req.body; //Setting a values to manegent with all methods (CRUD).

    const account = { //Reading values and creating a random id to insert in json file.
        name,
        email,
        user,
        password,
        id: randomUUID() //"crypto" - { randomUUID } - Give a random id like = 07d24967-fcdd-496a-afc6-84df3096c73c.
    };

    login.push(account); //Insert data in array (and Json file).

    listAccounts(); //Calling a listAccounts function to write data.

    return res.json(account); //Returning a insert data saved in "account".
});
/////////////////////////////////////////////


//GET
app.get("/login", (req, res) => { //Using a GET method to list all data saved.
    return res.json(login); //Return all responses of GET method.
})
/////////////////////////////////////////////


//GET with ID
app.get("/login/:id", (req, res) => { //Using a GET method with id "Params" to take a specific value.
    const { id } = req.params; //Setting a return in const id.
    const account = login.find((account) => account.id === id); //"account" was recive the function find() to search a specific id sended in params url. 
    return res.json(account); //Returning a response obtained in "account".
})
/////////////////////////////////////////////


//PUT
app.put("/login/:id", (req, res) => { //Using a PUT method with id "Params" to take a specific value.
    const { id } = req.params; //Setting a return in const id.
    const { name, email, user, password } = req.body; //Subscribe all values obtained in requisition.

    const loginIndex = login.findIndex(account => account.id === id); //Looking for a specificed id with findIndex() in all values saved in array.
    login[loginIndex] = { //Accesing a login with id obtained in loginIndex.
        ...login[loginIndex], //We can use the 3 dots in Javascript function calls to convert an array into a set of arguments for a function.
        name, //Subscribe all values 
        email, //Subscribe all values 
        user, //Subscribe all values 
        password //Subscribe all values 
    };

    listAccounts(); //Calling a listAccounts function to write data.

    return res.json({ message: "Login alterado com sucesso!" }) //Return a json menssage 
})
/////////////////////////////////////////////


// DELETE
app.delete("/login/:id", (req, res) => { //Using a DELETE method with id "Params" to take a specific value.
    const { id } = req.params; //Setting a return in const id.
    const loginIndex = login.findIndex(account => account.id === id); //Looking for a specificed id with findIndex() in all values saved in array.

    login.splice(loginIndex, 1); //Using a splice() to remove a specific id value of array

    listAccounts(); //Calling a listAccounts function to write data.

    return res.json({ message: "Usuário apagado com sucesso!" }) //Return a json menssage 
})
/////////////////////////////////////////////

app.listen(4002, () => console.log("A aplicação em express está rdando na porta 4002!")); //Listen the port where we usage to run this aplication.


function listAccounts() { //function listAccounts.
    fs.writeFile("accounts.json", JSON.stringify(login), (err) => { //Write data in json file "accounts.json" with JSON method, and return error or success console.log.
        if (err) {
            console.log(err) //Error.
        } else {
            console.log("Login inserido!") //Success.
        }
    })
}

/**
 * POST
 * Body -> Sempre que eu quiser enviar dados para a aplicação
 * Params -> /accounts/u12389172191212
 * Query -> /accounts?id=1321311346&email=187319314714221041
 */