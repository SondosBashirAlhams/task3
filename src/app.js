// express // Frame  nodejs 

// (crud operations)
// create  =>  post
// read    =>  get
// Update  =>  patch
// delete  =>  delete 

// Local host 
// D // www.amazon.com 

// localhost :  port  3000  5000   

////////////////////////////////////////////////////////////////////////////////

    const express = require('express')
    const app = express()

    const port = process.env.PORT || 3000

    
    const path = require ("path")
    const publicDirectory =  path.join(__dirname , '../public')
    app.use (express.static (publicDirectory))


    // app.get('/', (req, res) => {
    //     res.send('Hello World!')
    //    })

    // app.get('/about', (req, res) => {
    //     res.send('This is data in about Page ')
    //    })

    //    app.get('/service', (req, res) => {
    //     res.send('This is data in SERVICE PAGE ')
    //    })

    //    app.get('/team', (req, res) => {
    //     res.send('<h2> Islam Mohamed </h2>  <button> Send </button>')
    //    })

    //    app.get('/data1', (req, res) => {
    //     res.send({
    //         name : "ahmed",
    //         age : 20,
    //         city : "Cairo"
    //     })
    //    })

    //    app.get('/data2', (req, res) => {
    //     res.send({
    //         name : "Islam",
    //         age : 26,
    //         city : "Mansoura"
    //     })
    //    })

/////////////////////////////////////////////////////////////////////////////////
     
    // Static 
    // path 

    // modules :  
                
    // const path = require ("path")
    // const x =  path.join(__dirname , '../public')
    // app.use (express.static (x))

    // console.log(__dirname)
    // C:\Users\DELL\Desktop\Lec-5-node\src

    //C:\Users\DELL\Desktop\Lec-5-node\
    // console.log(path.join(__dirname , '../public')) // C:\Users\DELL\Desktop\Lec-5-node\public

//////////////////////////////////////////////////////////////////////////////////


app.set('view engine', 'hbs');

 const viewsDirectory = path.join (__dirname , '../temp1/views')
 app.set('views', viewsDirectory);

 // to read partials : 
 var hbs = require('hbs');
const partialsPath = path.join(__dirname , "../Temp1/partials")
hbs.registerPartials(partialsPath)

 
app.get ('/' , (req,res) => {
    res.render('index' , {
        title : "HOME",
        desc : "This is home page"
    })
})

app.get ('/service' , (req,res) => {
    res.render('service' , {
        title : "SERVICE",
        name: "Mohamed",
        city:"Cairo",
        age: 40,
        img1: "images/trainer-3.jpg"
    })
})


app.get ('/team' , (req,res) => {
    res.render('team' , {
        title : "TEAM",
        name: "reem",
        city:"mansoura",
        age: 25,
        img2: "images/trainer-2.jpg"
    })
})
////////////////////////////////////////////////////////////////////////////////////77777777

// app.get('/products', (req,res)=>{
//     console.log(req.query)
//     console.log(req.query.model)
//     res.send({
//         product : 'bmw 520i'
//     })
// })
/////////////////////////////////////////////////////////////////////////////
// task : 
// app.get('/weather' ,(req, res) => {
//     if(!req.query.address){
//         return res.send({
//             error : 'you must provide address'
//         })
//     }
//     res.send({
//             location :req.query.address,
//             forecast : 'Cold'
//     })
// })
////////////////////////////////////////////////////////////////////////////
const geocode = require('./tools/geocode');
const forecast = require('./tools/forecast');

app.get('/weather', async (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    });
  }

  try {
    const address = req.query.address;
    const location = await geocode(address);

    const { latitude, longitude } = location;

    const weatherData = await forecast(latitude, longitude);

    res.send({
      forecast: weatherData.description,
      location: address,
      latitude: latitude,
      longitude: longitude
    });
  } catch (error) {
    res.send({
      error: error.message
    });
  }
});



/////////////////////////////////////////////////////////////////////////////

  app.get('*' , (req , res)=> {
     res.send('404 Page Not Founded')
  })


///////////////////////////////////////////////////////////////////////////
  

    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    })
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////


