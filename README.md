# Exchequer

An API that simulates Fintech processes for educational purposes.
Originally developed to advance my understanding of Node.js, Express, and MongoDB, it is now freely accessible for use by anybody to build their own front-end applications (web or mobile).

#### Requirements

- Git
- Node.js
- MongoDB
- SendGrid account (for email notifications)
- Twilio account (for SMS notifications)

## Installation

If you want to test it locally, you can follow the following steps to install and run it successfully.

1. Clone the repository
```git clone https://github.com/oredotjs/Exchequer```

2. Install the dependencies
```npm install```

3. Run the server
```npm start```

4. Test the API using Postman or any other API testing tool

## Usage

This API is public and hosted by Heroku for education purposes. So if you are interest to test it without clone and run locally, feel free to play around consulting this Documentation.
The API is a RESTful API that allows you to perform the following operations:

1. Create a new account
2. Create a new account for a user
3. Get unique account tag
4. Withdraw from an account
5. Transfer from one account to another
6. Get all transactions for a user
7. Get all transactions for an account
8. Get all transactions for a user's account
9. Deposit to an account

## API Endpoints

- BASE_URL: <http://localhost:3000/api/v1>

### Home

```javascript
- URL: '/'
- HTTP Method: GET
- Params: None
- Headers: None
```

### USER

#### Create a new account

```javascript
- URL: '/user/signUp',
- HTTP Method: POST,
- Params: None,
- Headers: None,
- Body: {
    email: "test@gmail.com",
    phone: "1234567890",
    password: "test",                  
    passwordConfirm: "test",
    verificationMethod : Enum('email', 'phone'),
    firstName : "Oreoluwa",
    lastName : "Oreoluwa",
}
```

```javascript
// Response
{
    "status": "success",
    data: {
      user: "test@gmail.com",
      message: `Please check your Email / Phone for your OTP`,
    },
}
```

#### Verify a new account

```javascript
- URL: '/user/verify',
- HTTP Method: POST,
- Params: None,
- Headers: None,
- Body: {
    email: "test@gmail.com", || phone: "1234567890",
    verificationCode: "123456",
    verificationMethod : Enum('email', 'phone'),
}
```

```javascript
// Response
{
    "status": "success",
    data: {
      message: 'Account Verified! Pls Login',
    },
}
```

#### Resend Verification Code

```javascript
- URL: '/user/resendVerificationCode',
- HTTP Method: POST,
- Params: None,
- Headers: None,
- Body: {
    email: "
    verificationMethod : Enum('email', 'phone'),
}
```

```javascript
// Response
{
    "status": "success",
   data: {
      user: "test@gmail.com",
      message: `Please check your Email / Phone for your OTP`,
    },
}
```

#### Login to an account

```javascript
- URL: '/user/login'
- HTTP Method: POST
- Params: None
- Headers: None
- Body: {
    email: "test@gmail.com",
    password: "test"",                  
}
```

```javascript
 // Response
{
        "status": "success",
        data: {
          user: "test@gmail.com",
            message: `Login Successful`,
        },
}
```

#### Get tags for a user

```javascript
- URL: '/user/tags'
- HTTP Method: GET
- Params: None
- Headers: {
    Authorization: 'Bearer <token>'
}
- Body: {
    tag: "test",
}
```


```javascript
// Response
{
    "status": "success",
    data: {
      Object
    },
}
``` 
