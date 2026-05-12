import axios from "axios";

export const fetchStripeData =
  async ({
    resource,
    restrictedKey,
    limit = 10,
    startDate,
    endDate,
  }) => {
    try {
      if (!resource || !restrictedKey) {
        throw new Error(
          "Resource and Restricted Key are required"
        );
      }

      const created = {};

      if (startDate) {
        created.gte = Math.floor(
          new Date(startDate).getTime() /
            1000
        );
      }

      if (endDate) {
        created.lte = Math.floor(
          new Date(endDate).getTime() /
            1000
        );
      }

      const response = await axios.get(
        `https://api.stripe.com/v1/${resource}`,
        {
          headers: {
            Authorization: `Bearer ${restrictedKey}`,
          },

          params: {
            limit,

            ...(Object.keys(created)
              .length > 0 && {
              created,
            }),
          },
        }
      );

      return response.data;
    } catch (err) {
      console.log(
        "Stripe Fetch Error:",
        err.response?.data ||
          err.message
      );

      throw err;
    }
  };