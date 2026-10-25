#!/usr/bin/env node
import { pathToFileURL } from 'node:url'

const MINIMUM = Object.freeze([24, 22, 1])

export function nodeSatisfiesMinimum(version, minimum = MINIMUM) {
  const [major = Number.NaN, minor = Number.NaN, patch = Number.NaN] = String(version)
    .replace(/^v/, '')
    .split('.')
    .map((part) => Number.parseInt(part, 10))
  const [minMajor, minMinor, minPatch] = minimum
  if (![major, minor, patch].every(Number.isInteger)) return false
  if (major !== minMajor) return major > minMajor
  if (minor !== minMinor) return minor > minMinor
  return patch >= minPatch
}

export function assertNodeEngine() {
  const current = process.versions.node
  if (nodeSatisfiesMinimum(current)) return
  console.error(
    `Build bloqué : Node.js v${current} ne satisfait pas >=24.22.1 (CVE-2026-111497).`,
  )
  process.exit(1)
}

const invokedDirectly =
  Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1]).href

if (invokedDirectly) assertNodeEngine()
