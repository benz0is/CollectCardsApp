
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
