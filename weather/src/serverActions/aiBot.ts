'use server'

import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { TavilySearch } from "@langchain/tavily";
import { HumanMessage } from "@langchain/core/messages";

interface AiBotActionInput {
  userPrompt: string;
}

export async function aiBotAction({ userPrompt }: AiBotActionInput): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }
  
  if (!process.env.TAVILY_SEARCH_API_KEY) {
    throw new Error('TAVILY_SEARCH_API_KEY is not configured');
  }

  const agentModel = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0
  });
  
  const agentTools = [new TavilySearch({
    maxResults: 3,
    tavilyApiKey: process.env.TAVILY_SEARCH_API_KEY
  })];
  
  const agent = createReactAgent({
    llm: agentModel,
    tools: agentTools
  });
 
  try {
    const agentFinalState = await agent.invoke(
      { messages: [new HumanMessage(userPrompt)] },
    );
   
    const lastMessage = agentFinalState.messages[agentFinalState.messages.length - 1].content;
    const response = typeof lastMessage === 'string' ? lastMessage : JSON.stringify(lastMessage);
    
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error in aiBotAction:', error);
    throw new Error('Failed to get response from AI. Please try again later.');
  }
}