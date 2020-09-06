const { UserType, UsersInfoType } = require("./types");
const db = require("../db");
const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  description: "Root Query",
  fields: () => ({
    user: {
      type: new GraphQLList(UserType),
      description: "users info",
      resolve: async (parent, args) => {
        const response = await db.query("SELECT * FROM users");
        return response.rows;
      },
    },
    userBalance: {
      type: new GraphQLList(UserType),
      description: "users balance",
      args: { id: { type: GraphQLString } },
      resolve: async (parent, args) => {
        const response = await db.query(
          "SELECT balance FROM users WHERE id = $1",
          [args.id]
        );
        return response.rows;
      },
    },
    userInfo: {
      type: new GraphQLList(UsersInfoType),
      description: "all users info",
      resolve: async (parent, args) => {
        const response = await db.query("SELECT * FROM users_info");
        return response.rows;
      },
    },
    returnCards: {
      type: new GraphQLList(UsersInfoType),
      args: { ref_id: { type: GraphQLString } },
      description: " List of all cards",
      resolve: async (parent, args) => {
        const response = await db.query(
          "SELECT cards,id FROM users_info WHERE ref_id = $1",
          [args.ref_id]
        );
        return response.rows;
      },
    },
    accountPosts: {
      type: new GraphQLList(UsersInfoType),
      description: "Returns all accounts posts",
      args: { ref_id: { type: GraphQLString } },
      resolve: async (parent, args) => {
        const response = await db.query(
          "SELECT post,id,date FROM users_info WHERE ref_id = $1",
          [args.ref_id]
        );
        return response.rows;
      },
    },
  }),
});

exports.RootQuery = RootQuery;
