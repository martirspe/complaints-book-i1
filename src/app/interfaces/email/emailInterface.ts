export interface EmailInterface {
  from: string,
  to: string,
  bcc: string,
  subject: string,
  html: string,
  attachments?: File,
}
