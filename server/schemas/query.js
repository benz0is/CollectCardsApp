const { UserType } = require("./types");
const db = require("../db");
const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  description: "Root Query",
  fields: () => ({
    user: {
      type: new GraphQLList(UserType),
      //   args: {
      //     username: { type: GraphQLString },
      //   },
      resolve: async (parent, args) => {
        const response = await db.query("SELECT * FROM users");
        return response.rows;
      },
    },
  }),
});

exports.RootQuery = RootQuery;
