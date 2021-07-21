// IMPORTS 
const { GraphQLClient } = require('graphql-request')

// API ENDPOINT
const endpoint = 'http://localhost:4000/gql'

// GQL CLIENT
const gql_client = new GraphQLClient(endpoint, {
    headers: {
        authorization: 'COOL AUTH TOKEN',
    },
})

// SEND GQL REQUEST
async function request(query, variables) {

    // BIND & SEND REQUEST
    try {
        const response =  await gql_client.request(query, variables)
        console.log(response)

    // CATCH ANY ERRORS
    } catch(error) {
        console.log(error)
    }
}

// FETCH ALL BOOKS
function books() {

    // QUERY STRING
    const query = `
        {
            books {
                name
                genre
            }
        }
    `

    // SEND REQUEST
    request(query)
}

// ADD BOOK
function add_book(variables) {

    // QUERY STRING
    const query = `
        mutation(
            $name: String!,
            $genre: String!,
            $author_id: ID!
        ) {
            add_book(
                name: $name,
                genre: $genre,
                author_id: $author_id
            ) {
                id
            }
        }
    `

    // SEND REQUEST
    request(query, variables)
}

// FIND SPECIFIC BOOK
function find_book(variables) {

    // QUERY STRING
    const query = `
        query book($id: ID!) {
            book(id: $id) {
                name
                genre
                id
            }
        }
    `

    // SEND REQUEST
    request(query, variables)
}

books()
add_book({
    name: 'foo',
    genre: 'bar',
    author_id: 'biz'
})
find_book({
    id: 2
})