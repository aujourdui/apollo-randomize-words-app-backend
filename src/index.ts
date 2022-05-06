import { ApolloServer } from "apollo-server";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import { join } from "path";

import { words } from "./query/words";

const schema = loadSchemaSync(join(__dirname, "../schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const sentences = [{ sentence: "This is first idea" }];

const resolvers = {
  Query: {
    words: () => words,
    sentences: () => sentences,
  },
};

const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

const server = new ApolloServer({ schema: schemaWithResolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(
    `🚀  Server ready at ${url} 📭 Query at https://studio.apollographql.com/dev`
  );
});
