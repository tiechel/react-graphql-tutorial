const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

// mock data
const books = [
  {
    title: "Harry Potter and the Sorcerer's store",
    author: "J.K. Rowling",
    price: 2000,
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
    price: 3000,
  }
];

// GraphQLのスキーマ情報
const typeDefs = gql`
  type Query { books: [Book] }
  type Book { title: String, author: String, price: Int }
`;

// resolverの設定（データ処理）
// DBからデータを取得したり、APIを呼び出したりする処理もここに記述
const resolvers = {
  Query: {books: () => books }
};

// GraphQLのSchema設定
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// Expressの初期化
const app = express();

// Cross-origin resource sharing(CORS)の設定
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSucessStatus: 200
};

// GraphQLのエンドポイント追加
// app.use(
//   "/graphql",
//   bodyParser.json(),
//   cors(corsOptions),
//   graphqlExpress({ schema })
// );

// サーバー起動
app.listen(4000, () => {
  console.log(`Go to http://locahost:4000/graphiql${server.graphqlPath} to run queries!`);
});

server.applyMiddleware({
  app,
  cors: corsOptions
})
