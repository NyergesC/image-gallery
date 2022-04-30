const express = require("express");
const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload')


const app = express();

app.use(fileUpload())

app.get('/', (req,resp,next)=>{   
    resp.sendFile(path.join(`${__dirname}/../frontend/index.html`));
})

app.use('/pub', express.static(`${__dirname}/../frontend/public`));

const dataLocation = path.join(`${__dirname}/../frontend/`)

app.get("/image-list", (req,res)=>{
    res.sendFile(`${dataLocation}/data.json`);
})

//POST METHOD
    let jsonData = []
    try {
        let data = fs.readFileSync(`${dataLocation}data.json`, (err) =>{
                if(err){
                    console.log(err);
                }

        })

      jsonData = JSON.parse(data) 
        
    } catch (err) {
        console.log(err);        
    }

 app.post('/', (req, res) => {
    const picture = req.files.picture;
    const formData = req.body
    formData.filename = picture.name
    jsonData.push(formData)

    fs.writeFile(`${dataLocation}data.json`, JSON.stringify(jsonData), (err) => {
        if (err) {
            console.log(err);
        }
    })

    const uploads = path.join(`${__dirname}/../frontend/public/img/`);
    if(picture) {
        console.log(uploads + picture.name);
        picture.mv(uploads + picture.name)
    }

    res.send(formData)

    console.log(formData);

app.delete("/delete/:id", (req,res) => {
     res.send('delete request')
})


}); 



/* let jsonData = []

app.post('/', (req, res) =>{
    const formData = req.body

    jsonData.push(formData)
    console.log(formData);

     fs.writeFile(`${dataLocation}profile.json`, JSON.stringify(jsonData), (error)=>{
         if(error){
             console.log('igy jartal')
         }
     })      
})
 */


const port = 9000;

app.listen(port, ()=>{
    console.log(`http://127.0.0.1:${port}`);
})
