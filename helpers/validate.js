import validator from "validator";

export const validateArticle = ({ title, content }) => {
  let validate_title =
    !validator.isEmpty(title) && validator.isLength(title, { min: 5, max: 25 });
  let validate_content = !validator.isEmpty(content);
  if (!validate_title || !validate_content) {
    return false;
  }
  return true;
};
