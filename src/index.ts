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
// const sentences = [{ id: "1", sentence: "This is first idea" }];

const resolvers = {
  Query: {
    words: () => words,
    sentences: () => sentences,
  },
  Mutation: {
    addSentence: (_parent, args, _context, _info) => {
      return sentences.push({
        // id: Date.now().toString(),
        sentence: args.sentence,
      });
    },
  },
};

const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

const server = new ApolloServer({ schema: schemaWithResolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(
    `🚀  Server ready at ${url} 📭 Query at https://studio.apollographql.com/dev`
  );
});
