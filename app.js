const express = require('express')
const app = express();
const path = require('path');
const fs = require('fs');
const hbs = require('hbs');


app.use(express.static(path.join(__dirname, './data')));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'./templates/views'))


const loadData = () => {
    const bufferedString = fs.readFileSync(__dirname + '/data/data.json');
    const JsonString = bufferedString.toString();
    return JsonString;
}

app.get('/laptop', (req, res) => {
    try {
        if (req.query.id) {
            const data =  JSON.parse(loadData());
            const laptop = data.find(curr => curr.id ===req.query.id)
            res.render('template-laptop.hbs',{
                PRODUCTNAME: laptop.productName,
                IMAGE: laptop.image,
                CPU: laptop.cpu,
                RAM: laptop.ram,
                STORAGE: laptop.storage,
                SCREEN: laptop.screen,
                PRICE: laptop.price,
                DESCRIPTION: laptop.description
            })
        }
    } catch (e) {
        console.log(e)
    }
})

app.get('/products',async(req,res) =>{
    const data = JSON.parse(loadData());
    console.log(data.length)
    res.render('template-overview.hbs',{data})
})

app.listen(3000, () => {
    console.log('Started')
})