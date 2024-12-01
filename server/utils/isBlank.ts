export default function (...fields: string[]) {
  return fields.every(field => typeof field !== "string" || field.trim().length <= 0);
}
