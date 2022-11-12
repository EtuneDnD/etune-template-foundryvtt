from fastapi import Request, FastAPI
import uvicorn
import sys
import json
from subprocess import check_output
from fastapi.logger import logger
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(debug=True)

origins = [
    "http://localhost:443"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/clean")
async def create_db():
    print("primero")
    open('../etune-shared-compendium-db/actors.db', 'w').close()

@app.post("/write")
async def create_item(request: Request):
    print("segundo")
    actor = await request.json()
    write_actor(actor)
    return actor["_id"]

@app.get("/push")
async def push():
    print("tercero")
    output = check_output('cd .. && cd etune-shared-compendium-db && git add . && git commit -m "Inserting" && git pull && git push origin main', shell=True)
    print(output.decode(sys.stdout.encoding))
    return {"message": output}


def write_actor(actor):
    with open("../etune-shared-compendium-db/actors.db", "a") as myfile:
        myfile.write(json.dumps(actor) + "\n")

if __name__ == "__main__":
    log_config = uvicorn.config.LOGGING_CONFIG
    log_config["formatters"]["access"]["fmt"] = "%(asctime)s - %(levelname)s - %(message)s"
    log_config["formatters"]["default"]["fmt"] = "%(asctime)s - %(levelname)s - %(message)s"
    uvicorn.run(app, host="localhost", port=8000, debug=True, log_config=log_config)