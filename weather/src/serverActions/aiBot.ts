'use server'

import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { TavilySearch } from "@langchain/tavily";
import { HumanMessage } from "@langchain/core/messages";
 
export default async function aiBotAction({userPrompt}) {


  const agentModel = new ChatOpenAI({apiKey:process.env.OPENAI_API_KEY, temperature: 0 });
  
  const agentTools = [new TavilySearch({ maxResults: 3 ,tavilyApiKey:process.env.TAVILY_SEARCH_API_KEY})];
  
  const agent = createReactAgent({
  llm: agentModel,
  tools: agentTools
});
 
const agentFinalState = await agent.invoke(
  { messages: [new HumanMessage(userPrompt)] },
);
 
console.log(
  agentFinalState.messages[agentFinalState.messages.length - 1].content,
);
return agentFinalState.messages[agentFinalState.messages.length - 1].content
}