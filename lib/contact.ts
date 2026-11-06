export type ContactData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};
export function validateContact(
  input: unknown,
): { data: ContactData; error?: never } | { error: string; data?: never } {
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { error: "Invalid message." };
  const body = input as Record<string, unknown>;
  for (const key of ["name", "email", "message"])
    if (typeof body[key] !== "string")
      return { error: "Name, email and message are required." };
  for (const key of ["subject", "website"])
    if (body[key] !== undefined && typeof body[key] !== "string")
      return { error: "Invalid field type." };
  const data = {
    name: (body.name as string).trim(),
    email: (body.email as string).trim(),
    message: (body.message as string).trim(),
    subject: ((body.subject || "") as string).trim(),
    website: ((body.website || "") as string).trim(),
  };
  if (!data.name || data.name.length > 100)
    return { error: "Please enter a name up to 100 characters." };
  if (
    data.email.length > 254 ||
    !/^[^\s<>"@]+@[^\s<>"@]+\.[^\s<>"@]+$/.test(data.email)
  )
    return { error: "Please enter a valid email address." };
  if (data.message.length < 10 || data.message.length > 5000)
    return { error: "Your message must be between 10 and 5,000 characters." };
  if (data.subject.length > 160 || /[\r\n]/.test(data.subject + data.name))
    return { error: "Please use a short, single-line name and subject." };
  return { data };
}
export function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
}
