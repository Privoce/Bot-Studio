export function getSuffix(id: string | null) {
  if (id === null) return '';
  const s = id.split(':');
  if (s.length !== 3) return '';
  // -2023-03-08-16-20-39 = 20 chars
  return s[2].substring(0, s[2].length - 20);
}

export function getMime(filename: string) {
  if (filename.endsWith('.csv')) return 'text/csv';
  if (filename.endsWith('.jsonl')) return 'application/jsonl+json';
  return '';
}

// ref: https://github.com/kennethjiang/js-file-download/blob/master/file-download.js
export function download(data: string, filename: string) {
  const mime = getMime(filename);
  const blob = new Blob([data], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.style.display = 'none';
  link.setAttribute('download', filename);

  // Safari thinks _blank anchor are popups. We only want to set _blank
  // target if the browser does not support the HTML5 download attribute.
  // This allows you to download files in desktop safari if pop up blocking
  // is enabled.
  if (typeof link.download === 'undefined') {
    link.setAttribute('target', '_blank');
  }
  document.body.append(link);
  link.click();

  window.setTimeout(() => {
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }, 200);
}
