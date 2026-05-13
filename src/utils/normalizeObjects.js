export const normalizeStripeObject = (item) => {
  const normalized = {};

  Object.keys(item).forEach((key) => {
    const value = item[key];

    // Null / undefined
    if (value === null || value === undefined) {
      normalized[key] = "-";
    }

    // Arrays
    else if (Array.isArray(value)) {
      normalized[key] = value.length === 0 ? "-" : `[${value.length} items]`;
    }

    // Nested Objects
    else if (typeof value === "object") {
      // Empty object
      if (Object.keys(value).length === 0) {
        normalized[key] = "-";
      }
      // Common Stripe shortcuts
      else if (value.email) {
        normalized[key] = value.email;
      } else if (value.id) {
        normalized[key] = value.id;
      } else if (value.object) {
        normalized[key] = `[${value.object}]`;
      }
      // Address: stitch non-null parts together
      else if ("city" in value || "country" in value || "line1" in value) {
        const parts = [value.line1, value.city, value.state, value.postal_code, value.country]
          .filter(Boolean);
        normalized[key] = parts.length > 0 ? parts.join(", ") : "-";
      }
      // invoice_settings: pull out the most useful field
      else if ("default_payment_method" in value) {
        normalized[key] = value.default_payment_method ?? "-";
      }
      // Fallback: JSON so data isn't silently lost
      else {
        normalized[key] = JSON.stringify(value);
      }
    }

    // Timestamps (unix seconds → readable)
    else if (
      (key === "created" || key.endsWith("_at") || key.endsWith("_date")) &&
      typeof value === "number"
    ) {
      normalized[key] = new Date(value * 1000).toLocaleString();
    }

    // Amount fields (cents → dollars)
    else if (
      (key === "amount" || key.startsWith("amount_") || key === "balance") &&
      typeof value === "number"
    ) {
      normalized[key] = `$${(value / 100).toFixed(2)}`;
    }

    // Primitive values
    else {
      normalized[key] = value;
    }
  });

  return normalized;
};