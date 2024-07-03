const copyButtonEl = qs("[data-copy-btn]")
const passwordLengthTextEl = qs("[data-password-length-text]")
const rangeSliderEl = qs("[data-range-slider]")
const generatePasswordBtn = qs("[data-password-generate-btn]")
const passwordEl = qs("[data-password]")
const passwordStrengthEl = qs("[data-strength-wrapper]")
const passwordStrengthText = qs("[data-strength-text]")

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZÇĞİÖŞÜ"
const lowerCase = "abcdefghijklmnopqrstuvwxyzçğıöşü"
const numbers = "0123456789"
const symbols = "!@#$%^&*()_+~`|}{[]\\:;?><,./-="

function calculatePasswordStrength(password) {
  let strengthScore = 0

  for (let i = 0; i < password.length; i++) {
    const char = password.charAt(i)

    switch (true) {
      case /[A-Z]/.test(char):
        strengthScore += 2
        break
      case /[a-z]/.test(char):
        strengthScore += 1
        break
      case /[0-9]/.test(char):
        strengthScore += 2
        break
      case /[!@#$%^&*()_+{}|:"<>?`\-=[\];',./~]/.test(char):
        strengthScore += 4
        break
    }
  }

  return strengthScore
}

function generatePassword(options) {
  let password = ""
  let characters = ""

  if (options.upperCase) {
    password += upperCase.charAt(Math.floor(Math.random() * upperCase.length))
    characters += upperCase
  }

  if (options.lowerCase) {
    password += lowerCase.charAt(Math.floor(Math.random() * lowerCase.length))
    characters += lowerCase
  }

  if (options.numbers) {
    password += numbers.charAt(Math.floor(Math.random() * numbers.length))
    characters += numbers
  }

  if (options.symbols) {
    password += symbols.charAt(Math.floor(Math.random() * symbols.length))
    characters += symbols
  }

  if (characters.length === 0) {
    characters = upperCase + lowerCase + numbers + symbols
  }

  const length = options.length - password.length

  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return password
}

function handleGeneratePassword() {
  const options = {
    upperCase: false,
    lowerCase: false,
    numbers: false,
    symbols: false,
    length: 6,
  }

  qsa(".generator-options input").forEach((element) => {
    options[element.dataset.generateOption] = element.checked
  })

  options.length = Number(rangeSliderEl.value)

  const password = generatePassword(options)
  passwordEl.value = password

  isPasswordStrong(password)
}

function isPasswordStrong(password) {
  const passwordStrengthScore = calculatePasswordStrength(password)

  if (passwordStrengthScore >= 24) {
    passwordStrengthEl.dataset.strengthMessage = "strong"
    passwordStrengthText.textContent = "Strong"
  } else if (passwordStrengthScore >= 16) {
    passwordStrengthEl.dataset.strengthMessage = "medium"
    passwordStrengthText.textContent = "Medium"
  } else if (passwordStrengthScore >= 8) {
    passwordStrengthEl.dataset.strengthMessage = "weak"
    passwordStrengthText.textContent = "Weak"
  } else {
    passwordStrengthEl.dataset.strengthMessage = "too-weak"
    passwordStrengthText.textContent = "Too Weak"
  }
}

function handleCopyButton() {
  const text = passwordEl.value

  navigator.clipboard.writeText(text).then(
    () => {
      copyButtonEl.dataset.copiedMessage = "Copied!"
      setTimeout(() => {
        copyButtonEl.dataset.copiedMessage = ""
      }, 2000)
    },
    (err) => {
      copyButtonEl.dataset.copiedMessage = "Failed!"
    }
  )
}

function handleRangeSlider(e) {
  passwordLengthTextEl.textContent = e.target.value
  const progress = ((e.target.value - 6) / 10) * 100

  rangeSliderEl.style.background = `linear-gradient(to right, #A4FFAF ${progress}%, #ccc ${progress}%)`
}

generatePasswordBtn.addEventListener("click", handleGeneratePassword)
copyButtonEl.addEventListener("click", handleCopyButton)
rangeSliderEl.addEventListener("input", handleRangeSlider)
