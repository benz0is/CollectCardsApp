const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  type: "Query",
  description: "User info",
  fields: () => ({
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    picture: { type: GraphQLString },
    balance: { type: GraphQLString },
  }),
});

const UsersInfoType = new GraphQLObjectType({
  name: "UsersInfo",
  type: "Query",
  description: "All info about users",
  fields: () => ({
    id: { type: GraphQLInt },
    ref_id: { type: GraphQLString },
    username: { type: GraphQLString },
    post: { type: GraphQLString },
    cards: { type: GraphQLString },
    picture: { type: GraphQLString },
    date: { type: GraphQLString },
  }),
});

exports.UserType = UserType;
exports.UsersInfoType = UsersInfoType;
