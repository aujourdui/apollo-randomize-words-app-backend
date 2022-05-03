import { ApolloServer } from "apollo-server";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import { join } from "path";

const words = [
  {
    word: "hello",
    type: "noun",
  },
  {
    word: "come",
    type: "verb",
  },
  {
    word: "active",
    type: "adjective",
  },
  {
    word: "possibly",
    type: "adverb",
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
