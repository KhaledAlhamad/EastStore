# East Store	



# Quick Compo

<img src="/Users/enriquecoscarelli/Downloads/minilogo.png" alt="minilogo" style="zoom:75%;" />

## Description

***e-commerce*** an online store for buying different variant of products.

***dataBASE*** used MongoDB.

## User Stories

- **Signup:** As a user I can sign up in the platform so that I can start playing into competition
- **Login:** As a user I can login to the platform so that I can log my exit points
- **Logout:** As a user I can logout from the platform so no one else can use it
- **Add product to cart** As a user I can add product to cart
- **remove product from cart** As a user I can remove product from cart
- **update product quantity** As a user I can update product quantity
- **View Products** As a user I want to see the products in the store
- **Edit User** As a user I can edit my profile, add or substract exit points





                                      |

## Components

- HomePage
- LoginPage
- ProfilePage
- SignupPage
- Navbar



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



## Backend routes

| HTTP Method | URL            | Request Body                                                 | Success status | Error Status | Description                                                  |
| ----------- | -------------- | ------------------------------------------------------------ | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/me`     |                                                              | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/user/signup` | {username, email, password}                                  | 201            | 400          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/user/login`  | {email, password}                                            | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |


## Links

### Trello

[Link to your trello board](https://trello.com/b/cPFH5Quv) 


