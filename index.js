import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import _db from "./_db.js";

const resolvers = {
  Query: {
    games() {
      return _db.games;
    },
    reviews() {
      return _db.reviews;
    },
    authors() {
      return _db.authors;
    },
    review(_, args) {
      return _db.reviews.find((review) => review.id === args.id);
    },
    game(_, args) {
      return _db.games.find((game) => game.id === args.id);
    },
    author(_, args) {
      return _db.authors.find((author) => author.id === args.id);
    },
  },
  Games: {
    reviews(parent) {
      return _db.reviews.filter((x) => x.game_id === parent.id);
    },
  },
  Authors: {
    reviews(parent) {
      return _db.reviews.filter((x) => x.author_id === parent.id);
    },
  },
  Reviews: {
    author(parent) {
      return _db.authors.find((x) => x.id === parent.author_id);
    },
    game(parent) {
      return _db.games.find((x) => x.id === parent.game_id);
    },
  },
  Mutation: {
    deleteGame(_, args) {
      _db.games = _db.games.filter((x) => x.id !== args.id);
      return _db.games;
    },
    addGame(_, args) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      _db.games.push(game);
      return game;
    },
    updateGame(_, args) {
      _db.games = _db.games.map((g) => {
        if (g.id === args.id) {
          return { ...g, ...args.edits };
        }

        return g;
      });

      return _db.games.find((g) => g.id === args.id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("server rdy at port", 4000);
