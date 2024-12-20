const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://ecommerchweb-3c6ce.web.app',
    'https://ecommerchweb-3c6ce.firebaseapp.com',
    
   
  ],
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

// middleware


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://ecommerchWeb:oOr9gMXTqqq98ZRA@cluster0.edfearx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
   // await client.connect();

    const userCollection = client.db("ecommerchWeb").collection("users");
    const productsCollection = client.db("ecommerchWeb").collection("products");
    const cartsCollection = client.db("ecommerchWeb").collection("carts");
    const favouritesCollection = client.db("ecommerchWeb").collection("favourites");
    const paymentsCollection = client.db("ecommerchWeb").collection("payments");
    const ordersCollection = client.db("ecommerchWeb").collection("orders");

    app.get('/favourites', async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await favouritesCollection.find(query).toArray();
      res.send(result);
    });

    app.post('/favourites', async (req, res) => {
      const cartItem = req.body;
      const result = await favouritesCollection.insertOne(cartItem);
      res.send(result);
    });

    app.delete('/favourites/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await favouritesCollection.deleteOne(query);
      res.send(result);
    })

    // jwt related api
    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      res.send({ token });
    });

// Middleware to verify JWT token
/*const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
      return res.status(401).send({ message: 'Unauthorized access' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
          return res.status(403).send({ message: 'Forbidden access' });
      }
      req.decoded = decoded;
      next();
  });
};*/
    // admin verification middleware (no token verification here)
    const verifyAdmin = async (req, res, next) => {
      const email = req.body.email; // Get email from request body or however it's sent
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === 'admin';
      if (!isAdmin) {
        return res.status(403).send({ message: 'Forbidden access' });
      }
      next();
    };

    // users related api without token verification
    app.get('/users', async (req, res) => {
      try {
        const result = await userCollection.find().toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Server error', error });
      }
    });
  // save a user data in db
  app.put('/users', async (req, res) => {
    const user = req.body

    const query = { email: user?.email }
    // check if user already exists in db
    const isExist = await userCollection.findOne(query)
    if (isExist) {
      if (user.status === 'Requested') {
        // if existing user try to change his role
        const result = await userCollection.updateOne(query, {
          $set: { status: user?.status },
        })
        return res.send(result)
      } else {
        // if existing user login again
        return res.send(isExist)
      }
    }
  })
    /*app.get('/users/admin/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === 'admin';
      }
      res.send({ admin });
    });*/

    app.post('/users', async (req, res) => {
      const user = req.body;
      // Check if the user already exists
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: 'User already exists', insertedId: null });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });


    // Promote user to admin without token verification
    app.patch('/users/admin/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
          $set: {
            role: 'admin'
          }
        };
        const result = await userCollection.updateOne(filter, updatedDoc);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Server error', error });
      }
    });
    app.get('/users/admin/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      console.log('User role check for email:', email, 'Result:', user); // <-- Add log here
      let admin = false;
      if (user) {
        admin = user?.role === 'admin';
      }
      res.send({ admin });
    });
    
    
         // menu related apis
         app.get('/products', async (req, res) => {
          const result = await productsCollection.find().toArray();
          res.send(result);
        });
    
        app.get('/products/:id', async (req, res) => {
          const id = req.params.id;
          const query = { _id: new ObjectId(id) }
          const result = await productsCollection.findOne(query);
          res.send(result);
        })
    
        app.post('/products',  async (req, res) => {
          const products= req.body;
          console.log(products);
          const result = await productsCollection.insertOne(products);
          res.send(result);
        });
      
    
        app.patch('/products/:id', async (req, res) => {
          const product = req.body;
          const id = req.params.id;
          const filter = { _id: new ObjectId(id) }
          const updatedDoc = {
            $set: {
              name: product.name,
              category: product.category,
              price: product.price,
              description: product.description,
              brand:product.brand,

              image: product.image
            }
          }
    
          const result = await productsCollection.updateOne(filter, updatedDoc)
          res.send(result);
        })
    
        app.delete('/products/:id', async (req, res) => {
          const id = req.params.id;
          const query = { _id: new ObjectId(id) }
          const result = await productsCollection.deleteOne(query);
          res.send(result);
        })
        

        app.get('/carts', async (req, res) => {
          const email = req.query.email;
          const query = { email: email };
          const result = await cartsCollection.find(query).toArray();
          res.send(result);
        });
    
        app.post('/carts', async (req, res) => {
          const cartItem = req.body;
          const result = await cartsCollection.insertOne(cartItem);
          res.send(result);
        });
    
        app.delete('/carts/:id', async (req, res) => {
          const id = req.params.id;
          const query = { _id: new ObjectId(id) }
          const result = await cartsCollection.deleteOne(query);
          res.send(result);
        })
        app.get('/carts', async (req, res) => {
          const email = req.query.email;
          const query = { email: email };
          const result = await cartsCollection.find(query).toArray();
          res.send(result);
        });
    
        app.post('/carts', async (req, res) => {
          const cartItem = req.body;
          const result = await cartsCollection.insertOne(cartItem);
          res.send(result);
        });
    
        app.delete('/carts/:id', async (req, res) => {loca
          const id = req.params.id;
          const query = { _id: new ObjectId(id) }
          const result = await cartsCollection.deleteOne(query);
          res.send(result);
        })
// New endpoint for fetching all orders with user details for the admin

app.get('/orderList',  async (req, res) => {
  try {
    const orders = await paymentsCollection.aggregate([
      {
        $lookup: {
          from: "users", // Assuming 'users' collection stores user details
          localField: "email", // Payment email
          foreignField: "email", // User email
          as: "userDetails" // Merged user details with payments
        }
      },
      {
        $unwind: "$userDetails" // Flatten the result to access user details
      },
      {
        $project: {
          _id: 0, // Exclude the MongoDB document ID
          userName: "$userDetails.name", // Assuming user collection has "name"
          transactionId: "$transactionId", // Assuming 'payments' has 'transactionId'
          email: "$email",
          price: "$price",
          date: "$date", // Assuming 'payments' has 'date' or you can add a date field during payment creation
        }
      }
    ]).toArray();

    res.send(orders);
  } catch (error) {
    console.error('Error fetching order list:', error);
    res.status(500).send({ message: 'Server error while fetching order list' });
  }
});






     // Get all jobs data from db for pagination
     app.get('/all-products', async (req, res) => {
      const size = parseInt(req.query.size)
      const page = parseInt(req.query.page) - 1
      const filter = req.query.filter
      const sort = req.query.sort
      const search = req.query.search
      console.log(size, page)

      let query = {
        name: { $regex: search, $options: 'i' },
      }
      if (filter) query.category = filter
      let options = {}
      if (sort) options = { sort: { price: sort === 'asc' ? 1 : -1 } }
      const result = await productsCollection
        .find(query, options)
        .skip(page * size)
        .limit(size)
        .toArray()

      res.send(result)
    })

    // Get all jobs data count from db
    app.get('/products-count', async (req, res) => {
      const filter = req.query.filter
      const search = req.query.search
      let query = {
        name: { $regex: search, $options: 'i' },
      }
      if (filter) query.category = filter
      const count = await productsCollection.countDocuments(query)

      res.send({ count })
    })
// Fetch related products by category
app.get('/products/related/:category', async (req, res) => {
  const category = req.params.category;
  const query = { category };
  const result = await productsCollection.find(query).toArray();
  res.send(result);
});

app.post('/create-payment-intent', async (req, res) => {
  const { price } = req.body;
  const amount = parseInt(price * 100);
  console.log(amount, 'amount inside the intent')

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    payment_method_types: ['card']
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  })
});


/*app.get('/payments/:email',  async (req, res) => {
  const query = { email: req.params.email }
  if (req.params.email !== req.email) {
    return res.status(403).send({ message: 'forbidden access' });
  }
  const result = await paymentsCollection.find(query).toArray();
  res.send(result);
})*/
app.get('/payments', async (req, res) => {
  const email = req.query.email;
  const payments = await paymentsCollection.find({ email }).toArray();
  res.send(payments);
});

app.post('/payments', async (req, res) => {
  const payment= req.body;
  const paymentResult = await paymentsCollection.insertOne(payment);

     //  carefully delete each item from the cart
     console.log('payment info', payment);
     const query = {
       _id: {
         $in: payment.cartIds.map(id => new ObjectId(id))
       }
     };

     const deleteResult = await cartsCollection.deleteMany(query);

     res.send({ paymentResult, deleteResult });
   })


       // stats or analytics
app.get('/admin-stats',  verifyAdmin, async (req, res) => {
  const users = await userCollection.estimatedDocumentCount();
  const menuItems = await  productsCollection.estimatedDocumentCount();
  const orders = await paymentsCollection.estimatedDocumentCount();

  // this is not the best way
  // const payments = await paymentCollection.find().toArray();
  // const revenue = payments.reduce((total, payment) => total + payment.price, 0);

  const result = await paymentsCollection.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: '$price'
        }
      }
    }
  ]).toArray();

  const revenue = result.length > 0 ? result[0].totalRevenue : 0;

  res.send({
    users,
    menuItems,
    orders,
    revenue
  })
})
app.get('/order-stats',  verifyAdmin, async(req, res) =>{
  const result = await paymentsCollection.aggregate([
    {
      $unwind: '$menuItemIds'
    },
    {
      $lookup: {
        from: 'menu',
        localField: 'menuItemIds',
        foreignField: '_id',
        as: 'menuItems'
      }
    },
    {
      $unwind: '$menuItems'
    },
    {
      $group: {
        _id: '$menuItems.category',
        quantity:{ $sum: 1 },
        revenue: { $sum: '$menuItems.price'} 
      }
    },
    {
      $project: {
        _id: 0,
        category: '$_id',
        quantity: '$quantity',
        revenue: '$revenue'
      }
    }
  ]).toArray();

  res.send(result);

})


    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });
   // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Server is sitting');
});

app.listen(port, () => {
  console.log(`Server is sitting on port ${port}`);
});
