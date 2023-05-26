# Exchequer
An API that simulates Fintech processes for educational purposes.

Developed initially to advance my understanding of Node.js, Express, and MongoDB, it is now freely accessible for anybody to build their own front-end applications (web or mobile).

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

This API is public and hosted by Heroku for education purposes. So if you are interested in testing it without cloning and running locally, it is also hosted online, feel free to play around referring to the Documentation.
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

#### Sign Up

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

#### Verify  account

```javascript
- URL: '/user/verifyOtp',
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
- URL: '/user/resendOtp',
- HTTP Method: POST,
- Params: None,
- Headers: None,
- Body: {
    email: "
    verificationMethod : Enum('email', 'phone'),
}
```

```javascript
// ResponseresendOtp
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

#### Create account tag

```javascript
- URL: '/user/getTag'
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
      User Object
    },
}
```

#### Get Account Details

```javascript
- URL: '/user/getAccountDetails'
- HTTP Method: GET
- Params: None
- Headers: {
    Authorization: 'Bearer <token>'
}
```

```javascript
    // Response
    {
        "status": "success",
        data: {
          User Object
        },
    }
```

### Bank Queries

#### Requests

| Methods |Rotas|Admin|Action|Expected response|Status Code|
|:----------:|:-----:|:----:|:---:|:-----:|:----:|
|GET         |/account/getBalance||Get Account Balance|Bank account Balance|200|
|GET         |/account/getMyTransactions||Get all transactions from your account|Array of transactions|200|
|GET         |account/getMyTransactions/:id||Get a specific transaction from your account|Transaction object|200|
|POST|      /account/deposit||Deposit a value to the account informed| Transcation Details |200|
|POST|     /account/withdraw ||Withdraw a value of an account informed| Transcation Details|200|
|PUT|      /account/transfer||Transfer a value between accounts informed| Transcation Details |200|
|GET|    /account/getAllTransactions|✔️|Get all transactions from all accounts|Array of transactions|200|
|DELETE      |/bank/delete|✔️|Delete an bank account| Bank Account deleted |202|


## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- CONTACT -->
## Contact

Emmanuel Oreoluwa - [@oreoluwadnd](https://twitter.com/oreoluwadnd) - awuloero13@gmail.com
# ExchequerX
