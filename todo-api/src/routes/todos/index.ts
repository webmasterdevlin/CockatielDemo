import { FastifyPluginAsync } from "fastify";

const getTodoById: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
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
      const id = request.params.id
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      if (randomNumber >= id) {
        console.log("--> TodoService Returned 500 ERROR");
        return reply.serviceUnavailable();
      }
      console.log("--> TodoService Returned 200 OK");
      return reply.send({id, activity:"eat"});
    }
  );
};

export default getTodoById;
