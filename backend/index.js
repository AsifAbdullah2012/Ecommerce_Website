const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");
require("dotenv").config();
const path = require("path");

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || "";
      if (token) {
        try {
          const user = jwt.verify(token, "your-secret-key");
          return { user };
        } catch (err) {
          console.error("Invalid token");
        }
      }
      return {};
    },
  });
  await server.start();
  server.applyMiddleware({ app });

  // Serve static files from the "uploads" folder
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
