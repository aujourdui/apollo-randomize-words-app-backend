import { ApolloServer } from "apollo-server";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import { join } from "path";

const words = [
  {
    word: "Hello",
    type: "greeting",
  },
  {
    word: "Sun",
    type: "nature",
  },
  {
    word: "Chocolate",
    type: "food",
  },
  {
    word: "Pokemon",
    type: "culture",
  },
  {
    word: "Business",
    type: "business",
  },
  {
    word: "Art",
    type: "culture",
  },
  {
    word: "Stereo",
    type: "culture",
  },
  {
    word: "Frog",
    type: "adverb",
  },
  {
    word: "Mountain",
    type: "nature",
  },
  {
    word: "KFC",
    type: "business",
  },
  {
    word: "Heaven",
    type: "adjective",
  },
  {
    word: "Dice",
    type: "entertainment",
  },
];

const schema = loadSchemaSync(join(__dirname, "../schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const resolvers = {
  Query: {
    words: () => words,
  },
};

const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

const server = new ApolloServer({ schema: schemaWithResolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
