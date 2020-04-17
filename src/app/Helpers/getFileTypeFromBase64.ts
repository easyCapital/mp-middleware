function getFileTypeFromBase64(file: string): [string | undefined, string | undefined] {
  if (file.charAt(0) === '/') {
    return ['image/jpeg', '.jpeg'];
  }

  if (file.charAt(0) === 'R') {
    return ['image/gif', '.gif'];
  }

  if (file.charAt(0) === 'i') {
    return ['image/png', '.png'];
  }

  if (file.charAt(0) === 'J') {
    return ['application/pdf', '.pdf'];
  }

  return [undefined, undefined];
}

export default getFileTypeFromBase64;
