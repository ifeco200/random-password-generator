const inputEl = document.querySelector('#input');
const btnEl = document.getElementById('gen');
const copyEl = document.querySelector('.fa-copy');
const alertEl = document.querySelector('.alert_message');

const chars =
  '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+?{}[];:';
const passwordLength = 14;

btnEl.addEventListener('click', createPassword);

function createPassword() {
  // crypto gives secure random numbers (Math.random is not safe for passwords)
  const randomValues = new Uint32Array(passwordLength);
  crypto.getRandomValues(randomValues);

  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    password += chars[randomValues[i] % chars.length];
  }
  inputEl.value = password;
}

copyEl.addEventListener('click', async () => {
  if (!inputEl.value) return;

  try {
    await navigator.clipboard.writeText(inputEl.value);
  } catch (err) {
    // fallback for when the Clipboard API is blocked (e.g. not https/localhost)
    inputEl.select();
    inputEl.setSelectionRange(0, 99999);
    if (!document.execCommand('copy')) return;
  }

  // 'active' hides the alert in the CSS, so remove it to show the alert
  alertEl.classList.remove('active');
  setTimeout(() => {
    alertEl.classList.add('active');
  }, 2000);
});