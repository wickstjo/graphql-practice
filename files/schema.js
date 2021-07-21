// IMPORT GQL
const gql = require('graphql')

// IMPORT MOCK DATA
const { books, authors } = require('./data.json')

// DESTRUCTURE GQL STUFF
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull
} = gql

// BOOK SCHEMA
const book_type = new GraphQLObjectType({
    name: 'book',
    fields: () => ({

        // PRIMARY
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        
        // SECONDARY
        author: {
            type: author_type,
            resolve(parent, args) {
                return authors.find(
                    entry => entry.id == parent.author_id
                )
            }
        }
    })
})

// AUTHOR SCHEMA
const author_type = new GraphQLObjectType({
    name: 'author',
    fields: () => ({

        // PRIMARY
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },

        // SECONDARY
        books: {
            type: GraphQLList(book_type),
            resolve(parent, args) {
                return books.filter(
                    entry => entry.author_id == parent.id
                )
            }
        }
    })
})

// ROOT QUERIES
const root_query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        // ALL BOOKS QUERY
        books: {
            type: new GraphQLList(book_type),
            resolve(parent, args) {
                return books
            }
        },

        // SPECIFIC BOOK QUERY
        book: {
            type: book_type,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return books.find(
                    entry => entry.id == args.id
                )
            }
        },

        // ALL AUTHORS QUERY
        authors: {
            type: new GraphQLList(author_type),
            resolve(parent, args) {
                return authors
            }
        },

        // SPECIFIC AUTHOR QUERY
        author: {
            type: author_type,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return authors.find(
                    entry => entry.id == args.id
                )
            }
        },
    }
})

// MUTATIONS AKA. ACTIONS
const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {

        // ADD BOOK ACTION
        add_book: {
            type: book_type,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                genre: { type: GraphQLNonNull(GraphQLString) },
                author_id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {

                // BOOK OBJECT
                block = {
                    ...args,
                    id: books.length +1
                }

                // PUSH & RETURN IT
                books.push(block)
                return block
            }
        },

        // ADD AUTHOR ACTION
        add_author: {
            type: author_type,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {

                // AUTHOR OBJECT
                block = {
                    ...args,
                    id: authors.length +1
                }

                // PUSH & RETURN IT
                authors.push(block)
                return block
            }
        },
    }
})

// EXPORT SCHEMA
module.exports = new GraphQLSchema({
    query: root_query,
    mutation
})