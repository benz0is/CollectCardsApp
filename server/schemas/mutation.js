const { UserType } = require("./types");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");
const db = require("../db");

const RootQueryMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Mutates Root",
  fields: () => ({
    AddUser: {
      type: UserType,
      description: "Add a user",
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const response = await db.query(
          "INSERT INTO users(username,password)values($1,$2)",
          [args.username, args.password]
        );
        return response.rows;
      },
    },
    // DeleteUser: {
    //   type: UserType,
    //   description: "Delete a User",
    //   args: {
    //     username: { type: GraphQLNonNull(Graphqlstring) },
    //     password: { type: GraphQLNonNull(Graphqlstring) },
    //   },
    //   resolve: async (parent, args) => {
    //     const response = await db.query("");
    //   },
    // },
  }),
});

exports.RootQueryMutation = RootQueryMutation;
