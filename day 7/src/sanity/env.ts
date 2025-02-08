export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-17'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
  "skVk4A8qTAXXQ4fTXywmeaqXB8XHpbKV5zRAdEz9WBAEHwxuhdHIBmKrL7TM8StjFIIX648T64bXy23HKfXDGvjZZd1wqOOTzG35lJrPYQkKRWb8w68p5NlE8LEDS2ZBp0HeBCmmQ9AitasXO2vxgCNvi4KAWzmBIDO2eU6UraPzQAAfa80O",
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
