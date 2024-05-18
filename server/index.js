//UMA API QUE SE CONECTA A API DO ML

// /PARA GERAR UM NOVO CODE. ELE SE EXPERA.     https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=7085994933657810&redirect_uri=https://www.google.com.br
const express = require('express')
const app = express();
const path = require('path')
const fetch = require('node-fetch')

const cors = require('cors');

app.use(cors());




//arquivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//rota do teste'
app.post('/test', async (req, res) => {

    //variaveis que precisam ser enviadas para o mercado livre
    const app_id =  "7085994933657810"
    const client_secret =  "7dqgdo9At4j3e8oehYXuPiAydtWUM8J3"
    const code =  "TG-6648fef777070300017c9c05-405601391"
    const redirect_uri =  "https://www.google.com.br"
   
    //url principal da api do ML - obtem o token 
    const url_principal = "https://api.mercadolibre.com/oauth/token"

    //informações que vão ser enviadas juntos a URL principal da requisição
    const headers = {
        "accept": "application/json",
        "content-type": "application/x-www-form-urlencoded"
    }

    const dados = `grant_type=authorization_code&client_id=${app_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${redirect_uri}`;

    const resposta = await fetch(url_principal, {
        method: 'POST',
        headers: headers,
        body: dados
    })

    const resposta_json = await resposta.json();

    console.log(resposta_json)

    res.send("OK")


});

app.post('/getAccessToken', async (req, res) => {
    const app_id =  "7085994933657810"
    const client_secret =  "7dqgdo9At4j3e8oehYXuPiAydtWUM8J3"
    const refresh_token = "TG-6648fed83c7d3100011f37d9-405601391"

        //url principal da api do ML - obtem o token 
        const url_principal = "https://api.mercadolibre.com/oauth/token"

        const headers = {
            "accept": "application/json",
            "content-type": "application/x-www-form-urlencoded"
        }
    
        const dados = `grant_type=refresh_token&client_id=${app_id}&client_secret=${client_secret}&refresh_token=${refresh_token}`;


        const resposta = await fetch(url_principal, {
            method: 'POST',
            headers: headers,
            body: dados
        })

        const resposta_json = await resposta.json();

        console.log(resposta_json)
    
        res.send("OK")
    
})


app.get('/products', async (req, res) => {
    const access_token = "APP_USR-7085994933657810-051815-ac19f50546c429fe32fe3bdc0c13e423-405601391"

    const headers = {
        "Authorization": `Bearer ${access_token}`
    }

    const url = `https://api.mercadolibre.com/sites/MLB/search?category=MLB1051`

    try {
        const resposta = await fetch(url , {
            method: 'GET',
            headers: headers
        })

        const resposta_json = await resposta.json();
        console.log(resposta_json)

        res.send(resposta_json)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while fetching products');
    }
})




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ativo na porta ${PORT} - http://localhost:${PORT}`);
})