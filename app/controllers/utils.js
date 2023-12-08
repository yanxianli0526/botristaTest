import uuidValidate from "uuid-validate";

export const isValidUUID = (value) => {
  try {
    const isValidUUID = uuidValidate(value, 4); 
    return true;
  } catch (error) {
    return false;
  }
};
