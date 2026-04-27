import os
import re
from pathlib import Path

import anthropic

BASE_DIR = Path(__file__).parent.parent
INPUTS_DIR = BASE_DIR / "inputs"
OUTPUTS_DIR = BASE_DIR / "outputs"

MODEL = "claude-opus-4-7"


def get_client() -> anthropic.Anthropic:
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise SystemExit(
            "Error: ANTHROPIC_API_KEY environment variable is not set.\n"
            "Run: export ANTHROPIC_API_KEY=sk-ant-..."
        )
    return anthropic.Anthropic(api_key=api_key)


def read_input(filename: str) -> str:
    path = INPUTS_DIR / filename
    if not path.exists():
        raise FileNotFoundError(
            f"Required input file not found: inputs/{filename}\n"
            f"See inputs/README.md for instructions."
        )
    content = path.read_text(encoding="utf-8").strip()
    if not content or content.startswith("<!-- "):
        raise ValueError(
            f"Input file inputs/{filename} is empty or still contains placeholder text.\n"
            f"Please fill it in before running this agent."
        )
    return content


def read_input_optional(filename: str) -> str | None:
    path = INPUTS_DIR / filename
    if not path.exists():
        return None
    content = path.read_text(encoding="utf-8").strip()
    if not content or content.startswith("<!-- "):
        return None
    return content


def read_output(filename: str) -> str:
    path = OUTPUTS_DIR / filename
    if not path.exists():
        raise FileNotFoundError(
            f"Required output not found: outputs/{filename}\n"
            f"Run the Market Positioning agent first: python main.py --agent positioning"
        )
    return path.read_text(encoding="utf-8")


def write_output(filename: str, content: str) -> None:
    OUTPUTS_DIR.mkdir(exist_ok=True)
    path = OUTPUTS_DIR / filename
    path.write_text(content, encoding="utf-8")
    print(f"  Written: outputs/{filename}")


def parse_sections(text: str) -> dict[str, str]:
    """Parse ===BEGIN filename=== ... ===END filename=== blocks from a response."""
    sections: dict[str, str] = {}
    pattern = r"===BEGIN (.+?)===\n(.*?)===END \1==="
    for match in re.finditer(pattern, text, re.DOTALL):
        filename = match.group(1).strip()
        content = match.group(2).strip()
        sections[filename] = content
    return sections


def stream_and_collect(client: anthropic.Anthropic, system: str, user: str) -> str:
    """Stream a response, printing text in real-time, and return the full text."""
    full_text = ""
    with client.messages.stream(
        model=MODEL,
        max_tokens=16000,
        thinking={"type": "adaptive"},
        system=[
            {
                "type": "text",
                "text": system,
                "cache_control": {"type": "ephemeral"},
            }
        ],
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": user,
                        "cache_control": {"type": "ephemeral"},
                    }
                ],
            }
        ],
    ) as stream:
        for text in stream.text_stream:
            print(text, end="", flush=True)
            full_text += text
    print()  # newline after stream ends
    return full_text
