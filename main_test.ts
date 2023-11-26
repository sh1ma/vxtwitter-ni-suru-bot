import { assertEquals } from "https://deno.land/std@0.204.0/assert/mod.ts"
import { fixTweetLinkInText } from "./main.ts"

Deno.test(function FixTweetLinkInTextTest() {
  const textInTweet = `
  aaa
  https://twitter.com/username/status/123456789
  bbb
  https://x.com/username/status/123456789
  `

  const expected = [
    "https://twitter.com/username/status/123456789",
    "https://twitter.com/username/status/123456789",
  ]

  const actual = fixTweetLinkInText(textInTweet)

  assertEquals(actual, expected)
})
