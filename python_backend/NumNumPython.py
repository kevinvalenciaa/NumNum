import os
import logging
from dotenv import load_dotenv
import google.generativeai as genai

def main():
    print("NumNum Chatbot")

    os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
    os.environ["GRPC_VERBOSITY"] = "NONE"
    os.environ["GRPC_TRACE"] = ""
    os.environ["GRPC_ENABLE_FORK_SUPPORT"] = "1"

    logging.getLogger("google").setLevel(logging.ERROR)
    logging.getLogger("absl").setLevel(logging.ERROR)
    logging.getLogger("grpc").setLevel(logging.ERROR)

    # Load environment variables from .env file
    load_dotenv()

    # Retrieve API key
    api_key = os.getenv("API_KEY_HERE")
    if not api_key:
        raise ValueError("API key is not set. Please check your .env file.")

    # Configure the API with the retrieved key
    genai.configure(api_key=api_key)

    # Define model configuration
    generation_config = {
        "temperature": 1.0,
        "top_p": 0.95,
        "top_k": 40,
        "max_output_tokens": 8192,
    }

    # Use a valid model name
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
    )

    # Function to read file content
    def read_file(file_path):
        with open(file_path, "r") as file:
            return file.read()

    file_path = "Num_Data.txt"
    file_content = read_file(file_path)

    chat_history = []

    context = (f"Hey! You are an AI assistant named Num. Here is the content from Num_Data:\n{file_content}.\n"
               "Assume the user's location is Queen's University. You can access chat history from the history list. "
               "If the user says hi or introduces themself, just introduce yourself without using the information "
               "from the data set. If the user asks a question related to the dataset, do not say hi again. "
               "Just answer the question.")

    options = ("If the user decides that they want to go to one of the restaurants, provide 3 options for them to choose: "
               "1. Book reservation, 2. Show routes to get there, 3. Show recommended dishes on the menu")

    while True:
        user_input = input("You: ").strip()
        if user_input.lower() in ["exit", "quit"]:
            print("Exiting chat. Goodbye!")
            break

        # Format chat history
        formatted_history = [
            {"role": "user", "parts": [{"text": chat["user"]}]} for chat in chat_history
        ] + [
            {"role": "assistant", "parts": [{"text": chat["ai"]}]} for chat in chat_history
        ]

        # Start a chat session with history
        chat_session = model.start_chat(history=formatted_history)
        response = chat_session.send_message(f"{context} {options} {user_input}")

        # Update chat history
        ai_response = response.text if hasattr(response, 'text') else response
        chat_history.append({"user": user_input, "ai": ai_response})

        print(f"Num: {ai_response}")

if __name__ == "__main__":
    main()