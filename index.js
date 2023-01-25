//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


const { Configuration, OpenAIApi } =require("openai");
const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')


const configuration = new Configuration({
    organization: "org-o3jVP6bQ9Wxm3ZN44WPaEbk5",
    apiKey: "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",

    

});
const openai = new OpenAIApi(configuration);

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 3080


app.post('/',async(req,res)=>{
    const {message}=req.body
    console.log(message);
   const response = await openai.createCompletion({
       model:"text-davinci-003",
       prompt:`${message}`,
       max_tokens:100,
       temperature:0.5,
})

res.json({

    message:response.data.choices[0].text
})
})
app.listen(port,()=>{
    console.log(`lisining to ${port}`);
})

