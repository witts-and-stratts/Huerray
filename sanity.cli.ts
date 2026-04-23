/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

const projectId = normalizeEnvValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
const dataset = normalizeEnvValue(process.env.NEXT_PUBLIC_SANITY_DATASET)

export default defineCliConfig({ api: { projectId, dataset } })

function normalizeEnvValue(value: string | undefined) {
  if (typeof value !== 'string') {
    return value
  }

  const trimmed = value.trim()

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }

  return trimmed
}
