export function validateTicket(data) {
  const errors = {};

  if (!data.type) {
    errors.type = "The reason is required";
  }

  if (!data.issue) {
    errors.issue = "The issue details is required";
  }

  if (Object.keys(errors).length) {
    return errors;
  }
}
