// const express = require("express");
// const app = express();
// const {
//   GraphQLSchema,
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLList,
//   GraphQLInt,
//   GraphQLNonNull,
// } = require("graphql");
// const { graphqlHTTP } = require("express-graphql");

// const authors = [
//   { id: 1, name: "J. K. Rowling" },
//   { id: 2, name: "J. R. R. Tolkien" },
//   { id: 3, name: "Brent Weeks" },
// ];

// const books = [
//   { id: 1, name: "Harry Potter and the Chamber of Secrets", authorId: 1 },
//   { id: 2, name: "Harry Potter and the Prisoner of Azkaban", authorId: 1 },
//   { id: 3, name: "Harry Potter and the Goblet of Fire", authorId: 1 },
//   { id: 4, name: "The Fellowship of the Ring", authorId: 2 },
//   { id: 5, name: "The Two Towers", authorId: 2 },
//   { id: 6, name: "The Return of the King", authorId: 2 },
//   { id: 7, name: "The Way of Shadows", authorId: 3 },
//   { id: 8, name: "Beyond the Shadows", authorId: 3 },
// ];

// const BookType = new GraphQLObjectType({
//   name: "Book",
//   description: "This represents a book",
//   fields: () => ({
//     id: { type: GraphQLNonNull(GraphQLInt) },
//     name: { type: GraphQLNonNull(GraphQLString) },
//     authorId: { type: GraphQLNonNull(GraphQLInt) },
//     author: {
//       type: AuthorType,
//       resolve: (book) => {
//         return authors.find((author) => author.id === book.authorId);
//       },
//     },
//   }),
// });

// const AuthorType = new GraphQLObjectType({
//   name: "Author",
//   description: "This represents an author",
//   fields: () => ({
//     id: { type: GraphQLNonNull(GraphQLInt) },
//     name: { type: GraphQLNonNull(GraphQLString) },
//     books: {
//       type: new GraphQLList(BookType),
//       resolve: (author) => {
//         return books.filter((book) => book.authorId === author.id);
//       },
//     },
//   }),
// });

// const RootQueryType = new GraphQLObjectType({
//   name: "Query",
//   description: "Root Query",
//   fields: () => ({
//     book: {
//       type: BookType,
//       description: "A single book",
//       args: { id: { type: GraphQLInt } },
//       resolve: (parent, args) => books.find((book) => book.id === args.id),
//     },
//     books: {
//       type: new GraphQLList(BookType),
//       description: "List of All Books",
//       resolve: () => books,
//     },
//     authors: {
//       type: new GraphQLList(AuthorType),
//       description: "List of All Authors",
//       resolve: () => authors,
//     },
//     author: {
//       type: AuthorType,
//       description: "List of a single Author",
//       args: { id: { type: GraphQLInt } },
//       resolve: (parent, args) =>
//         authors.find((author) => author.id === args.id),
//     },
//   }),
// });

// const RootMutationType = new GraphQLObjectType({
//   name: "Mutation",
//   description: "root mutation",
//   fields: () => ({
//     addBook: {
//       type: BookType,
//       description: "Add a book",
//       args: {
//         name: { type: GraphQLNonNull(GraphQLString) },
//         authorId: { type: GraphQLNonNull(GraphQLInt) },
//       },
//       resolve: (parent, args) => {
//         const book = {
//           id: books.length + 1,
//           name: args.name,
//           authorId: args.authorId,
//         };
//         books.push(book);
//         return book;
//       },
//     },
//     addAuthor: {
//       type: AuthorType,
//       description: "Add a author",
//       args: {
//         id: { type: GraphQLInt },
//         name: { type: GraphQLNonNull(GraphQLString) },
//       },
//       resolve: (parent, args) => {
//         const author = {
//           id: authors.length + 1,
//           name: args.name,
//         };
//         authors.push(author);
//         return author;
//       },
//     },
//   }),
// });

// const schema = new GraphQLSchema({
//   query: RootQueryType,
//   mutation: RootMutationType,
// });

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema: schema,
//     graphiql: true,
//   })
// );

// const PORT = 5000;
// app.listen(PORT, () => console.log("server is running on", PORT));
const express = require("express");
const app = express();
const db = require("./db");
const { GraphQLSchema } = require("graphql");
const { RootQuery } = require("./schemas/query");
const { graphqlHTTP } = require("express-graphql");
const { RootQueryMutation } = require("./schemas/mutation");
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Methods",
    "PATCH, PUT, POST, GET, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootQueryMutation,
});

app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const PORT = 3001;
app.listen(PORT, () => {
  console.log("app is listening on port:", PORT);
});
