'use strict';

const STORAGE_KEY = 'digitalWellbeingUsers';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showFieldError(input, message) {
  const error = document.getElementById(`${input.id}-error`);
  if (error) error.textContent = message;
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function showFormMessage(element, message, type) {
  element.textContent = message;
  element.className = `auth-message ${type}`;
}

function getStoredUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(user => user && typeof user.email === 'string' && typeof user.fullName === 'string');
  } catch (error) {
    console.error('Could not read saved users:', error);
    return [];
  }
}

function saveStoredUsers(users) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Could not save users:', error);
    return false;
  }
}

function calculateAge(birthdayValue) {
  const birthday = new Date(`${birthdayValue}T00:00:00`);
  if (!birthdayValue || Number.isNaN(birthday.getTime())) return -1;
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const birthdayHasNotOccurred = today.getMonth() < birthday.getMonth() ||
    (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate());
  if (birthdayHasNotOccurred) age--;
  return birthday > today ? -1 : age;
}

function validateRegistrationField(input) {
  const value = input.type === 'checkbox' ? input.checked : input.value.trim();
  let error = '';
  if (input.required && !value) error = input.type === 'checkbox' ? 'Please accept the terms to continue.' : 'This field is required.';
  else if (input.id === 'reg-email' && !EMAIL_PATTERN.test(value)) error = 'Enter a valid email address.';
  else if (input.id === 'birthday') {
    const age = calculateAge(value);
    if (age < 0) error = 'Enter a valid birthday that is not in the future.';
    else if (age < 13) error = 'You must be at least 13 years old to register.';
  } else if (input.id === 'reg-password' && !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/).test(input.value)) {
    error = 'Use 8+ characters with uppercase, lowercase and a number.';
  } else if (input.id === 'confirm-password' && input.value !== document.getElementById('reg-password').value) {
    error = 'Passwords do not match.';
  }
  showFieldError(input, error);
  return error === '';
}

function validateLoginField(input) {
  const value = input.value.trim();
  let error = '';
  if (!value) error = 'This field is required.';
  else if (input.id === 'login-email' && !EMAIL_PATTERN.test(value)) error = 'Enter a valid email address.';
  showFieldError(input, error);
  return error === '';
}

function setupRegistration() {
  const form = document.getElementById('registration-form');
  if (!form) return;
  const fields = Array.from(form.querySelectorAll('input[required], select[required]'));
  for (const field of fields) {
    field.addEventListener('input', () => {
      validateRegistrationField(field);
      if (field.id === 'reg-password') validateRegistrationField(document.getElementById('confirm-password'));
    });
    field.addEventListener('change', () => validateRegistrationField(field));
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    let isValid = true;
    for (const field of fields) if (!validateRegistrationField(field)) isValid = false;
    const message = document.getElementById('registration-message');
    if (!isValid) {
      showFormMessage(message, 'Please correct the highlighted fields.', 'failure');
      return;
    }
    const email = document.getElementById('reg-email').value.trim().toLowerCase();
    const users = getStoredUsers();
    if (users.some(user => user.email === email)) {
      showFieldError(document.getElementById('reg-email'), 'An account with this email already exists.');
      showFormMessage(message, 'Registration was not completed.', 'failure');
      return;
    }
    const user = {
      fullName: document.getElementById('full-name').value.trim(),
      email,
      birthday: document.getElementById('birthday').value,
      dailyGoal: document.getElementById('daily-goal').value,
      createdAt: new Date().toISOString()
    };
    // Never store the password or its confirmation in localStorage.
    users.push(user);
    if (!saveStoredUsers(users)) {
      showFormMessage(message, 'Could not save this demo account. Check browser storage settings.', 'failure');
      return;
    }
    showFormMessage(message, 'Registration successful (demo). You can now log in, but passwords are not stored, so login cannot verify them.', 'success');
    form.reset();
    for (const field of fields) showFieldError(field, '');
  });
}

function setupLogin() {
  const form = document.getElementById('login-form');
  if (!form) return;
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  for (const field of [emailInput, passwordInput]) {
    field.addEventListener('input', () => validateLoginField(field));
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    const emailValid = validateLoginField(emailInput);
    const passwordValid = validateLoginField(passwordInput);
    const message = document.getElementById('login-message');
    if (!emailValid || !passwordValid) {
      showFormMessage(message, 'Please enter a valid email and password.', 'failure');
      return;
    }
    const users = getStoredUsers();
    const userExists = users.some(user => user.email === emailInput.value.trim().toLowerCase());
    if (userExists) {
      showFormMessage(message, 'The demo account exists, but password verification requires a backend. No password is stored in this demo.', 'success');
    } else {
      showFormMessage(message, 'No demo account was found for this email. Please register first.', 'failure');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupRegistration();
  setupLogin();
});
