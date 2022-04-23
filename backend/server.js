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

 app.post('/', (req, res) => {
    const picture = req.files.picture;
    const answer = {}
   /*  const file = JSON.stringify(req.body, null, 2); */
/*     const uploadPath = __dirname + '/../backend/data/' + `data.json`; */
    
    const uploads = path.join(`${__dirname}/../frontend/public/img`);
    if(picture) {
        picture.mv(uploads + picture.name)
    }
    answer.pictureName = picture.name
    res.send(answer)

    let jsonData = []

    const formData = req.body
    jsonData.push(formData)

    fs.writeFile(`${dataLocation}data.json`, JSON.stringify(jsonData), (err) => {
        if (err) {
            console.log(err);
        }
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
    console.log(`htttp://127.0.0.1:${port}`);
})
