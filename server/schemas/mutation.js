const { UserType, UsersInfoType } = require("./types");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");
const db = require("../db");

const RootQueryMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Mutates Root",
  fields: () => ({
    AddUser: {
      type: UserType,
      description: "Add a user",
      args: {
        id: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        picture: { type: GraphQLString },
        balance: { type: GraphQLInt },
      },
      resolve: async (parent, args) => {
        const response = await db.query(
          "INSERT INTO users(id,username,password,balance,picture)values($1,$2,$3,$4,$5)",
          [args.id, args.username, args.password, args.balance, args.picture]
        );
        return response.rows;
      },
    },
    AddPost: {
      type: UsersInfoType,
      description: "Insert Post and insert cards",
      args: {
        ref_id: { type: GraphQLString },
        username: { type: GraphQLString },
        post: { type: GraphQLString },
        cards: { type: GraphQLString },
        picture: { type: GraphQLString },
        date: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const response = await db.query(
          "INSERT INTO users_info(ref_id,username,picture,post,cards,date) values($1,$2,$3,$4,$5,$6) RETURNING *",
          [
            args.ref_id,
            args.username,
            args.picture,
            args.post,
            args.cards,
            args.date,
          ]
        );
        return response.rows;
      },
    },
    AddPicture: {
      type: UsersInfoType,
      description: "Change user picture",
      args: {
        ref_id: { type: GraphQLString },
        picture: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const response = await db.query(
          "UPDATE users_info SET picture = $1 WHERE ref_id = $2 ",
          [args.picture, args.ref_id]
        );
        return response;
      },
    },
    UpdatePassword: {
      type: UserType,
      description: "Update password",
      args: { password: { type: GraphQLString }, id: { type: GraphQLString } },
      resolve: async (parent, args) => {
        const response = await db.query(
          "UPDATE users SET password = $1 WHERE id = $2",
          [args.password, args.id]
        );
      },
    },
    UpdateBalance: {
      type: UserType,
      description: "Update users balance",
      args: { id: { type: GraphQLString }, balance: { type: GraphQLString } },
      resolve: async (parent, args) => {
        const response = await db.query(
          "UPDATE users SET balance = $1 WHERE id = $2",
          [args.balance, args.id]
        );
      },
    },
    AddPictureToUser: {
      type: UserType,
      description: "Change user picture",
      args: {
        id: { type: GraphQLString },
        picture: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const response = await db.query(
          "UPDATE users SET picture = $1 WHERE id = $2 ",
          [args.picture, args.id]
        );
        return response;
      },
    },
  }),
});

exports.RootQueryMutation = RootQueryMutation;
