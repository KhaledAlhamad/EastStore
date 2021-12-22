# ShoeWear	


<img url="https://www.freepnglogos.com/uploads/running/running-icon-transparent-running-images-vector-8.png" alt="minilogo" style="zoom:75%;" />

## Description

***e-commerce*** an online store for buying Sport Shoes.

## User Stories

- **Signup:** As a user I can sign up in the website so that I can use the features of the website 
- **Login:** As a user I can login to the website and be able to use the features of the website 
- **Logout:** As a user I can logout from the platform so no one else can use it
- **Add product to cart** As a user I can add product to cart 
- **remove product from cart** As a user I can remove product from cart
- **update product quantity** As a user I can update product quantity
- **Checkout** As a user I can complete purchase and buy products from the store
- **View Products** As a user I want to see the products in the store

- **Add Products** As an admin I want to be able to add products to the store

- **update Products** As an admin I want to be able to update products in the store

- **delete Products** As an admin I want to be able to delete products from the store

  

# Client / Frontend

## React Router Routes (React App)

| Path                  | Component          | Permissions                | Behavior                                                     |
| --------------------- | ------------------ | -------------------------- | ------------------------------------------------------------ |
| `/`                   | SplashPage         | public `<Route>`           | Home page                                                    |
| `/signup`             | SignupPage         | anon only `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`              | LoginPage          | anon only `<AnonRoute>`    | Login form, link to signup, navigate to homepage after login |
| `/products`           | ProductsListPage   | public `<Route>`           | Shows all Products                                           |
| `/products/:category` | ProductsListPage   | public `<Route>`           | Shows all Products based on category                         |
| `/product/:id`        | ProductDetailsPage | public `<Route>`           | Details of a single product                                  |
| `/Cart`               | Cart               | user only `<PrivateRoute>` | Shows users shopping cart                                    |
|                       |                    |                            |                                                              |
|                       |                    |                            |                                                              |
|                       |                    |                            |                                                              |
|                       |                    |                            |                                                              |
|                       |                    |                            |                                                              |
|                       |                    |                            |                                                              |
|                       |                    |                            |                                                              |


​    

## Components

- HomePage
- LoginPage
- ProfilePage
- SignupPage
- Navbar
- Footer
- Catalouge
- Products
- Cart




# Server / Backend

## Models

User model

```
{
   username:{
        type: String,
        required: [true, 'username should be provided'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email should be provided'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'email is invalid']
    },
    password: {
        type: String,
        required: [true, 'password should be provided'],
        minlength: [6, 'pass should contain 6 or more characters']
    }
    isAdmin: {
    type: boolean
    }
}
```

Product model

```
 {
    name:{
        type: String,
        required: [true, 'product name should be provided'],
    },
    image:{
        type: String,
        required: [true, 'product image should be provided'],
    },
    quantity: {
        type: Number,
        required: [true, 'quantity should be provided'],
    },
    category: {
        type: String
    },
    color: {
       type: String
    }
   
 }

```

Cart model

```
 {
     userId:{
        type: String,
        required:true,
    },
    products: [{
    productId:{
        type: String
    },
    quantity:{
        type:Number,
        default:1
    }
    }]
   
 }

```

Order model

```
 {
   userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true},
    address:{type: Object, required: true},
    status: {type: String, default: "pending"}

   
 }

```





## Backend routes

| HTTP Method | URL            | Request Body                                                 | Success status | Error Status | Description                                                  |
| ----------- | -------------- | ------------------------------------------------------------ | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/me`     |                                                              | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup` | {username, email, password}                                  | 201            | 400          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`  | {email, password}                                            | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/cart`  |                                             | 200            | 401          | Checks user verfied, create new cart, and return cart |
| GET        | `/cart/:id`  |                                             | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| GET        | `/cart/`  |                                             | 200            | 401          | Checks admin verfied, Checks if carts exists (404), and return all carts |
| DELETE        | `/cart/:id`  |                                             | 200            | 401          | Checks user verfied, Checks if cart exists (404), and delete cart |
| PUT        | `/cart/:id`  |                                             | 200            | 401          | Checks user verfied, Checks if cart exists (404), and update cart |
| GET        | `/product/:id`  |                                             | 200            | 401          | Checks if product exists , and return specific product |
| GET        | `/product` | {latest, category}                                  | 201            | 400          | Checks if filters are provided; if so, return filtered products, else return all products, then create user with encrypted password, and store user in session |
| DELETE        | `/product/:id` |                                  | 201            | 400          | Checks admin verfied, Checks if product exists (404), and delete product  |
| PUT        | `/product/:id` |    {req.body}                               | 201            | 400          | Checks admin verfied, Checks if product exists (404), and update product  |
| POST        | `/product/` |    {req.body}                               | 201            | 400          | Checks admin verfied, and create new product  |



## Links

### Trello

[trello board](https://trello.com/b/cPFH5Quv) 



### Slides

[Slides](https://docs.google.com/presentation/d/1xSh3vdzGxOESDL1CjfU9KdL69iVPcaKk/edit?usp=sharing&ouid=116316947232788051273&rtpof=true&sd=true)

