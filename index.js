const express = require('express')

const mongoose = require('mongoose')

const Person = require('./models/Person')

const app = express()

const dotenv = require("dotenv")

dotenv.config()



app.use(
    express.urlencoded({
        extended: true,

    }),
)




app.use(express.json())





mongoose
 .connect(`mongodb+srv://Barbantti:${encodeURIComponent(process.env.MONGO_PASSWORD)}@restfulapibanco.1guqohw.mongodb.net/?retryWrites=true&w=majority`)




 .then(() => {

    console.log('Conectou ao banco!')
    
    app.listen(3000)


 })


 .catch((err) => console.log(err))


 app.get("/", (req, res) => {

    res.json({ message: "Oi Express!" });

});


 app.post('/person', async (req, res) => {

    const { name, salary, approved } = req.body



    const person = {

        name,

        salary,

        approved,

    }




    try {

        const addPerson = await Person.create(person)



        res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' }) 
        
        //status 201: algo foi criado no lado do servidor (inserimos o registro)

    } catch (error) {

        res.status(500).json({ erro: error })

        //status 500: erro da aplicação, não relacionado a requisição

    }
    
 })

 app.get('/person', async (req, res) => {

    try {
        const people = await Person.find() 

        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({ erro: error})
    }
 })