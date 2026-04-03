export const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (!result.success) {
    const error = new Error('Validation failed');
    error.statusCode = 400;
    error.details = result.error.flatten();
    next(error);
    return;
  }

  req.validated = result.data;
  next();
};
