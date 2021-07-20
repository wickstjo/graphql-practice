// IMPORT GQL
const gql = require('graphql')
const data = require('./data.json')

// DESTRUCTURE GQL STUFF
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema
} = gql

// BOOK SCHEMA
const book_type = new GraphQLObjectType({
    name: 'book',
    fields: () => ({
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})

// BOOK ROOT QUERY
const root_query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: book_type,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                console.log(parent, args)
                return data[args.id]
            }
        }
    }
})

// EXPORT
module.exports = new GraphQLSchema({
    query: root_query
})