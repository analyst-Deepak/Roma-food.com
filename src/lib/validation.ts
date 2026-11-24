/**
 * Input validation utilities for security hardening.
 * Validates and sanitizes user inputs to prevent XSS, injection attacks.
 */

const MAX_INPUT_LENGTH = 500;
const MAX_TEXTAREA_LENGTH = 2000;
const MAX_URL_LENGTH = 2000;

/** Validate email format */
export const isValidEmail = (email: string): boolean => {
  if (!email || email.length > MAX_INPUT_LENGTH) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/** Validate phone number (Indian format) */
export const isValidPhone = (phone: string): boolean => {
  if (!phone || phone.length > 20) return false;
  // Allow +91, 91, 0, or just 10 digits
  const phoneRegex = /^(\+91|91|0)?[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/** Validate name (alphanumeric with common special chars) */
export const isValidName = (name: string): boolean => {
  if (!name || name.length < 2 || name.length > MAX_INPUT_LENGTH) return false;
  const nameRegex = /^[a-zA-Z\s\-'.]+$/;
  return nameRegex.test(name);
};

/** Validate URL format */
export const isValidUrl = (url: string): boolean => {
  if (!url || url.length > MAX_URL_LENGTH) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/** Validate textarea content (allow more characters) */
export const isValidTextarea = (text: string): boolean => {
  return text.length <= MAX_TEXTAREA_LENGTH;
};

/** Sanitize string input to prevent XSS */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  return input
    .trim()
    .slice(0, MAX_INPUT_LENGTH)
    .replace(/[<>"/]/g, ''); // Remove dangerous characters
};

/** Sanitize textarea input */
export const sanitizeTextarea = (input: string): string => {
  if (!input) return '';
  return input
    .trim()
    .slice(0, MAX_TEXTAREA_LENGTH)
    .replace(/[<>]/g, ''); // Allow quotes for readability
};

/** Validate form submission */
export interface FormValidation {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateCareerForm = (formData: {
  name: string;
  email: string;
  phone: string;
  position?: string;
  message?: string;
}): FormValidation => {
  const errors: Record<string, string> = {};

  if (!formData.name.trim() || !isValidName(formData.name)) {
    errors.name = 'Please enter a valid name';
  }

  if (!formData.email.trim() || !isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.phone.trim() || !isValidPhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (formData.message && !isValidTextarea(formData.message)) {
    errors.message = 'Message is too long (max 2000 characters)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
