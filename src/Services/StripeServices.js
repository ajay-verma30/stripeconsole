import axios from "axios";

// Stripe object ID prefixes that can be retrieved directly
const STRIPE_ID_PREFIXES = [
  "cus_",
  "ch_",
  "pi_",
  "in_",
  "sub_",
  "pm_",
  "card_",
  "txn_",
  "re_",
  "pout_",
  "evt_",
  "price_",
  "prod_",
];

const isStripeId = (str) =>
  STRIPE_ID_PREFIXES.some((prefix) => str.startsWith(prefix));

export const fetchStripeData = async ({
  resource,
  restrictedKey,
  limit = 10,
  startDate,
  endDate,
  searchQuery,
}) => {
  try {
    if (!resource || !restrictedKey) {
      throw new Error("Resource and Restricted Key are required");
    }

    const headers = { Authorization: `Bearer ${restrictedKey}` };
    const trimmedQuery = searchQuery?.trim();

    // --- CASE 1: Direct ID lookup → GET /v1/{resource}/{id}
    if (trimmedQuery && isStripeId(trimmedQuery)) {
      const url = `https://api.stripe.com/v1/${resource}/${trimmedQuery}`;
      const response = await axios.get(url, { headers });
      // Wrap single object in an array so DataTable stays consistent
      return { data: [response.data] };
    }

    // --- CASE 2: Structured search query → GET /v1/{resource}/search
    if (trimmedQuery) {
      const url = `https://api.stripe.com/v1/${resource}/search`;
      const response = await axios.get(url, {
        headers,
        params: { query: trimmedQuery, limit },
      });
      return response.data;
    }

    // --- CASE 3: Plain list with optional date filters
    const url = `https://api.stripe.com/v1/${resource}`;
    const params = { limit };

    const created = {};
    if (startDate)
      created.gte = Math.floor(new Date(startDate).getTime() / 1000);
    if (endDate) created.lte = Math.floor(new Date(endDate).getTime() / 1000);
    if (Object.keys(created).length > 0) params.created = created;

    const response = await axios.get(url, { headers, params });
    return response.data;
  } catch (err) {
    console.error("Stripe Fetch Error:", err.response?.data || err.message);
    throw err;
  }
};
