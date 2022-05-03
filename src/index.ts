import { ApolloServer, gql } from "apollo-server";

// GraphQLスキーマの定義
const typeDefs = gql`
  type Word {
    word: String
    type: String
  }
  type Query {
    words: [Word!]!
  }
`;

// サンプルデータの定義
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

// リゾルバーの定義
const resolvers = {
  Query: {
    words: () => words,
  },
};

// サーバーの起動
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
