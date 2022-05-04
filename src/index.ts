import { ApolloServer, AuthenticationError } from "apollo-server";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import { join } from "path";
import { Resolvers } from "./types/generated/graphql";
import { Context } from "./types/context";

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
    words: (_parent, _args, _context) => {
      return words;
    },
  },
};

const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

const getUser = (token?: string): Context["user"] => {
  if (token === undefined) {
    throw new AuthenticationError(
      "認証されていないユーザーはリソースにアクセスできません"
    );
  }

  return {
    name: "dummy name",
    email: "dummy@example.com",
    token,
  };
};

const server = new ApolloServer({
  schema: schemaWithResolvers,
  context: ({ req }) =>
    ({
      user: getUser(req.headers.authorization),
    } as Context),
  debug: false,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
