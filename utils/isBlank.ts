export default function (...fields: string[]) {
  return fields.every(field => field.trim().length <= 0);
}
