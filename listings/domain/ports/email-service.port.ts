export interface EmailServicePort {
  sendEmail(email: string, message: string): Promise<void>;
}
