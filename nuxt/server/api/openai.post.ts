import OpenAI from 'openai'
import { encode } from 'gpt-3-encoder'
import { useDrizzle, tables } from '~/server/utils/drizzle'
import { eq, sql } from 'drizzle-orm'

function countTokens(text: string) {
  return encode(text).length;
}

export default eventHandler(async (event) => {
  setResponseHeader(event, 'Content-Type', 'text/html')
  setResponseHeader(event, 'Cache-Control', 'no-cache')
  setResponseHeader(event, 'Transfer-Encoding', 'chunked')
  setResponseHeader(event, 'Connection', 'keep-alive')

  try {
    userOnly(event)

    const { openaiKey} = useRuntimeConfig(event)
    if (event.context.user?.tokensUsed! >= event.context.user?.maxTokens!) throw new Error(`Token limit of ${event.context.user?.maxTokens!} reached! Please contact admin.`)

    const ai = new OpenAI({ apiKey: openaiKey })

    const { prompt, prevAnswer } = await readBody(event)
  
    const model = 'gpt-3.5-turbo'
    const max_tokens = 1000
    let tokens = 0
  
    let messages = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: prompt }
    ]
  
    if (prevAnswer) {
      messages.splice(1, 0, { role: 'assistant', content: prevAnswer });
    }
  
    const r = await ai.chat.completions.create({
      model,
      messages,
      max_tokens,
      stream: true,
      format: 'html'
    });
  
    for await (const chunk of r) {
      const msg: any = chunk.choices[0]?.delta?.content || ''
      tokens += countTokens(msg)
      event.node.res.write(msg);
    }
  
    const { users } = tables
    await useDrizzle()
      .update(users)
      .set({
        tokensUsed: sql`${users.tokensUsed} + ${tokens}`
      })
      .where(eq(users.id, event.context.user?.id!))
  
    const updt = useDrizzle().select().from(users).where(eq(users.id, event.context.user?.id!)).get()
    const data = { tokens, tokensUsed: updt?.tokensUsed, error: null }
  
    event.node.res.write(`<[EOS]>${JSON.stringify(data)}`);
  } catch (err: any) {
    const data = { error: err.message }
    event.node.res.write(`<[EOS]>${JSON.stringify(data)}`);
  } finally {
    event.node.res.end()
  }
})