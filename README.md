# Node Rest API + JWT in Typescript
- This project is a basic user login and registration API with authentication and authorization
- Json Web Token (JWT) Protected Routes
- Manually Done Authentication
- I intend to improve in terms of practicality and security in the API, but as I'm starting, I see this project as an improvement, take the opportunity to criticize or give tips!

# Installation
- Clone the repository

    `git clone https://github.com/B4PH0/algoro-api`

- Install dependencies

    `cd algoro-api`\
    `npm install`

- Run project

    `npm run dev`


(alternatively you can configure the MongoDB database being it local or in the cloud, I preferred in the cloud, but the choice is yours)

# Getting started
## Step 1: Register a user
Send a POST request to `http://localhost:${API_PORT}/api/users/signup` with following payload:


```
{
    "name": "userName",
    "email": "yourEmail",
    "password_hash": "yourPassword"
}
```
If there isn't some internal error or missing parameters, it will return something like this:

```
{
    "status": 201,
    "message": "User created"
}
```

## Step 2: Log in user
Send a POST request to `http://localhost:${API_PORT}/api/users/login`:

```
{
    "email": "E-mail logged",
    "password_hash": "Email password"
}
```
If all goes well, it will have returned a response like this:

```
{
    "status": 200,
    "message": "Authorization made"
}
```
and the token will be generated and set in the user's cookies, the expiration will be one hour

## Step 3 (opcional): Private Route for Authenticated User
Send a GET request to `http://localhost:${API_PORT}/private`

If everything is OK, the answer should look like this:
```
{
     "message": "Welcome ${req.body.name} to your private route!"
}
```
