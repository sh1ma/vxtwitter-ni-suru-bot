import { startBot } from "https://deno.land/x/discordeno@11.2.0/mod.ts"

const tweetLinkPattern =
  /https:\/\/(twitter|x).com\/[a-zA-Z0-9_]+\/status\/[0-9]+/g

export const fixTweetLinkInText = (text: string) => {
  const tweets = text.match(tweetLinkPattern)
  if (!tweets) return undefined
  return tweets.map((tweet) => {
    const splitted = tweet.split("/")
    const tweetId = splitted.pop()
    splitted.pop() // remove status
    const username = splitted.pop()
    return `https://vxtwitter.com/${username}/status/${tweetId}`
  })
}

if (import.meta.main) {
  startBot({
    token: Deno.env.get("TOKEN") || "",
    intents: ["Guilds", "GuildMessages"],
    eventHandlers: {
      ready() {
        console.log("Successfully connected to gateway")
      },
      messageCreate(message) {
        if (message.isBot) return
        const fixed = fixTweetLinkInText(message.content)
        if (!fixed) return
        message.reply(fixed.join("\n"))
      },
    },
  })
}
