from openai import OpenAI
from typing import List, Dict, Any

class OpenAIClient:
    def __init__(self):
        self.client = OpenAI()
        self.model = "gpt-4o-mini"

    def create_chat_completion(
        self,
        messages: List[Dict[str, str]],
        temperature: float = 1,
        max_tokens: int = 256,
        top_p: float = 1,
        frequency_penalty: float = 0,
        presence_penalty: float = 0,
        response_format: Dict = None
    ) -> Any:
        kwargs = {
            "model": self.model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
            "top_p": top_p,
            "frequency_penalty": frequency_penalty,
            "presence_penalty": presence_penalty
        }
        
        if response_format:
            kwargs["response_format"] = response_format

        response = self.client.chat.completions.create(**kwargs)

        return response
    
    def create_chat_completion_stream(self, messages: List[Dict[str, str]], **kwargs) -> Any:
        return self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            stream=True,
            **kwargs
        )