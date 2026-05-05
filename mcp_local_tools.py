import json
import sys
import os

# Configuration for the Second Brain
NOTION_PAGE_ID = "3432a664-0b86-81a8-9827-e5d411449754"

def log(msg):
    sys.stderr.write(f"LOG: {msg}\n")
    sys.stderr.flush()

def send_response(response):
    sys.stdout.write(json.dumps(response) + "\n")
    sys.stdout.flush()

def handle_request(request):
    req_id = request.get("id")
    method = request.get("method")
    params = request.get("params", {})

    if method == "initialize":
        send_response({
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "protocolVersion": "2024-11-05",
                "capabilities": {},
                "serverInfo": {"name": "augustuna-local-tools", "version": "1.0.0"}
            }
        })
    elif method == "listTools":
        send_response({
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "tools": [
                    {
                        "name": "wrapup",
                        "description": "Gera um resumo da sessao e envia para o Notion Second Brain.",
                        "inputSchema": {
                            "type": "object",
                            "properties": {
                                "summary": {"type": "string", "description": "O resumo formatado da conversa."}
                            },
                            "required": ["summary"]
                        }
                    }
                ]
            }
        })
    elif method == "callTool":
        tool_name = params.get("name")
        tool_args = params.get("arguments", {})
        
        if tool_name == "wrapup":
            # Here we tell the agent (me) how to actually finish the task.
            # Since this is a "proxy" tool, the actual magic happens via the agent's Notion tools.
            # But the UI will see this tool in the menu!
            send_response({
                "jsonrpc": "2.0",
                "id": req_id,
                "result": {
                    "content": [{"type": "text", "text": f"O resumo foi preparado. Por favor, usa a ferramenta 'patch_block_children' do Notion MCP para adicionar este conteudo na pagina {NOTION_PAGE_ID}:\n\n{tool_args.get('summary')}"}]
                }
            })
    else:
        # Generic success for notifications or other methods
        if req_id is not None:
            send_response({"jsonrpc": "2.0", "id": req_id, "result": {}})

def main():
    while True:
        line = sys.stdin.readline()
        if not line:
            break
        try:
            request = json.loads(line)
            handle_request(request)
        except Exception as e:
            log(f"Error: {e}")

if __name__ == "__main__":
    main()
