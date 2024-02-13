import joi from "joi";

const SchemaValidator = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body); ///Mongo Model Object
  console.log("BOOOOOOODY REQUEST - SchemaValidator");
  console.log(req.body);
  if (error == null) {
    //valido
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(", ");
    console.log("SchemaValidator Error:");
    console.log(message);
    res.status(422);
    throw new Error("SchemaValidator Error");
  }
};

function validatorHandlerBodyProperty(schema, property) {
  return (req, res, next) => {
    console.log("BOOOOOOODY REQUEST - validatorHandlerBodyProperty");
    const { error } = schema.validate(req[property]); ///Mongo Model Object

    if (error) {
      const { details } = error;
      const message = details.map((i) => i.message).join(", ");
      console.log("SchemaValidator Error:");
      console.log(message);
      res.status(422);
      throw new Error("validatorHandlerBodyProperty Error");
    }
    next();
  };
}

export { SchemaValidator, validatorHandlerBodyProperty };
