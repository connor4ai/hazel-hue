import os, base64, json
from flask import Flask, request, jsonify
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")
assert openai.api_key, "OPENAI_API_KEY missing"

ALLOWED = {
    "True Winter","Bright Winter","Dark Winter",
    "True Summer","Light Summer","Soft Summer",
    "True Spring","Bright Spring","Light Spring",
    "True Autumn","Dark Autumn","Soft Autumn"
}

PROMPT_SYS = (
    "You are an expert personal-color analyst. "
    "Classify the person shown in the images into EXACTLY one of these 12 seasons:\n"
    + ", ".join(sorted(ALLOWED)) + ". "
    "Return **only** this JSON schema:\n"
    '{ "season":"<one of the 12 names>", "confidence":<0-100> }'
)

def to_b64(file_storage):
    return base64.b64encode(file_storage.read()).decode()

def call_gpt(img_b64_list):
    # Format messages with images for GPT-4o Vision
    user_content = [
        {"type": "text", "text": "Determine the best season for the same person across all images."}
    ]
    
    # Add each image
    for b64 in img_b64_list:
        user_content.append({
            "type": "image_url",
            "image_url": {"url": f"data:image/jpeg;base64,{b64}"}
        })
    
    messages = [
        {"role": "system", "content": PROMPT_SYS},
        {"role": "user", "content": user_content}
    ]
    
    resp = openai.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        temperature=0,
        top_p=0,
        # deterministic
    )
    
    content = resp.choices[0].message.content
    if content is None or content.strip() == "":
        raise ValueError("OpenAI returned no content")
    
    print(f"Raw OpenAI response: {content}")
    
    try:
        result = json.loads(content)
        return result
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        print(f"Content was: {repr(content)}")
        raise ValueError(f"OpenAI returned invalid JSON: {content}")

app = Flask(__name__)

@app.route("/analyze", methods=["POST"])
def analyze():
    # require exactly 3 files named photo1, photo2, photo3
    try:
        files = [request.files[f"photo{i}"] for i in (1,2,3)]
    except KeyError:
        return jsonify({"error":"POST three files named photo1, photo2, photo3"}), 400

    b64s = [to_b64(f) for f in files]
    try:
        result = call_gpt(b64s)
    except Exception as e:
        return jsonify({"error":str(e)}), 500

    if result["season"] not in ALLOWED:
        return jsonify({"error":"Model returned invalid season", "raw":result}), 500
    return jsonify(result)

if __name__ == "__main__":
    # Replit sets $PORT; local dev defaults to 5000
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))