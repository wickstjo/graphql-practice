// IMPORTS
const express = require('express')
const cors = require('cors')
const gql_http = require('express-graphql').graphqlHTTP
const schema = require('./schema.js')

// INITIALIZE THE EXPRESS SERVER
const app = express()

// ALLOW CROSS ORIGIN
app.use(cors())

// CREATE A GRAPHQL ENDPOINT FOR THE API
app.use('/gql', gql_http({
    schema: schema,

    // ENABLE INTERFACE AT localhost:4000/gql
    graphiql: true
}))

// START LISTENING ON PORT 4000
app.listen(4000, () => {
    console.log('NOW LISTENING ON PORT 4000...')
})