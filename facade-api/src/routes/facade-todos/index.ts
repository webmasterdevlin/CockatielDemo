import axios from "axios";
import { FastifyPluginAsync } from "fastify";

const getAllTodoFacade: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
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
      const { data } = await axios.get(
        `http://127.0.0.1:5006/api/todos/${request.params.id}`
      );
      return data;
    }
  );
};

export default getAllTodoFacade;
