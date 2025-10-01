import { z } from "zod";

export default (schema, source = "body") => {
  return (req, res, next) => {
    let data = req[source];

    let parsed = schema.safeParse(data);
    if (!parsed.success) {
      let errors = parsed.error.issues.map((e) => e.message);
      return res.status(400).json({ error: errors });
    }
    const targetKey = {
      body: "validatedBody",
      params: "validatedParams",
      query: "validatedQuery",
    }[source];

    if (!targetKey) {
      console.log("Unknown validation source:", source);
      return res
        .status(500)
        .json({ error: "Internal validation middleware error" });
    }

    req[targetKey] = parsed.data; // req.validatedParams = parsed.data

    next();
  };
};
