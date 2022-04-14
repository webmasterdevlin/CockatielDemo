import axios from "axios";
import { FastifyPluginAsync } from "fastify";
import { retryWithBreaker } from "../../policies";

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
      const { data } = await retryWithBreaker.execute(async (context: any) => {
        console.log(`--> Retry Attempt ${context.attempt}`);
        return await axios.get(
          `http://127.0.0.1:5006/api/todos/${request.params.id}`
        );
      });
      if (data) {
        console.log("--> FacadeApi RECEIVED a SUCCESS");
        return reply.code(200).send(data);
      } else {
        console.log("--> FacadeApi RECEIVED a FAILURE");
        return reply.serviceUnavailable();
      }
    }
  );
};

export default getAllTodoFacade;
