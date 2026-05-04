// Check if the email belongs to a professional domain
export function isProfessionalEmail(email: string): boolean {
    const forbiddenDomains = ['test.com', 'dummy.it', 'spam.org'];
    const domain = email.split('@')[1];
    return !forbiddenDomains.includes(domain);
  }