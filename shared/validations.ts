import * as yup from "yup";

export const validateOne =
  (schema: yup.AnySchema, key: string) =>
  (value: any): undefined | string => {
    try {
      schema.validateSyncAt(key, { [key]: value });
    } catch (error) {
      return error.message;
    }
  };

export const projectSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  image: yup.string().optional(),
});

export const userSchema = yup.object().shape({
  name: yup.string().required(),
  bio: yup.string().optional(),
  image: yup.string().optional(),
});
