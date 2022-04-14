import { FastifyPluginAsync } from "fastify";

const getTodos: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/:id",
    {
      schema: {
        params: {
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "number" },
          },
        },
      },
    },
    async function (request: any, reply) {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      if (randomNumber >= request.params.id) {
        console.log("--> TodoService Returned 500 ERROR");
        reply.serviceUnavailable();
      }
      console.log("--> TodoService Returned 200 OK");
      reply.code(204).send();
    }
  );
};

export default getTodos;
