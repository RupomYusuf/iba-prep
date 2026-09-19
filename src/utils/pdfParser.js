// PDF parsing — extracts text with pdf.js, then detectTopics() (questionEngine)
// maps the content to the app's topic taxonomy.

import { detectTopics } from './questionEngine'

// pdf.js is large; load it lazily on first use so the app boots fast
let pdfjsPromise = null
async function loadPdfjs() {
  if (!pdfjsPromise) {
    pdfjsPromise = (async () => {
      const pdfjsLib = await import('pdfjs-dist')
      const worker = await import('pdfjs-dist/build/pdf.worker.min.mjs?url')
      pdfjsLib.GlobalWorkerOptions.workerSrc = worker.default
      return pdfjsLib
    })()
  }
  return pdfjsPromise
}

const MAX_PAGES = 60

export async function extractPdfText(file, onProgress) {
  const pdfjsLib = await loadPdfjs()
  const buffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise

  const pages = Math.min(pdf.numPages, MAX_PAGES)
  const parts = []
  for (let i = 1; i <= pages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    parts.push(content.items.map((item) => item.str).join(' '))
    if (onProgress) onProgress(i, pages)
  }

  const text = parts.join('\n').replace(/\s+/g, ' ').trim()
  return { text, numPages: pdf.numPages, scannedPages: pages }
}

export async function analyzePdf(file, onProgress) {
  const { text, numPages, scannedPages } = await extractPdfText(file, onProgress)
  const detected = detectTopics(text)

  if (text.length < 200) {
    return {
      ok: false,
      error:
        'Very little text could be extracted. The PDF may be scanned images (not OCR-able in the browser) or empty.',
      numPages,
      textLength: text.length,
      detected: [],
    }
  }

  return {
    ok: true,
    fileName: file.name,
    numPages,
    scannedPages,
    textLength: text.length,
    preview: text.slice(0, 600),
    detected,
  }
}
