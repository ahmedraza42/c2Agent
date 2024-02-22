export const AllowNumbers = /^(\s*|\d+)$/;
export const SmallLetters = /\w*[a-z]\w*/;
export const CapitalLetter = /\w*[A-Z]\w*/;
export const AllowNumber = /\d/;
export const SpecialCharacter = /[!@#$%^&*()\-_"=+{}; :,<.>]/;

export const URLRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
