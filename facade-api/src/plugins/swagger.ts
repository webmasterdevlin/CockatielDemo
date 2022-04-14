import fp from "fastify-plugin";

export default fp(async (fastify, opts) => {
  fastify.register(require("fastify-swagger"), {
    routePrefix: "/documentation",
    swagger: {
      info: {
        title: "Facade API swagger",
        description: "With Cockatiel package for resiliency",
        version: "0.1.0",
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here",
      },
      host: "localhost:5005",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
    staticCSP: true,
    transformStaticCSP: (header: any) => header,
    exposeRoute: true,
  });
});
