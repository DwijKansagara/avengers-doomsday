"""Package and deploy this Next.js app with the signed-in Antideploy account."""

import io
import json
from pathlib import Path
import tarfile
import time
import urllib.error
import urllib.request
import uuid


ROOT = Path(__file__).resolve().parents[1]
API = "https://antideploy.com"
SKIP_DIRS = {".git", ".next", "node_modules", "out", "dist"}
MAX_FILE = 5 * 1024 * 1024
MAX_ARCHIVE = 28 * 1024 * 1024


def main() -> None:
    credential_file = Path.home() / ".antideploy" / "config.json"
    if not credential_file.exists():
        raise SystemExit("Sign in first: https://antideploy.com/docs/api/terminal-login")

    token = json.loads(credential_file.read_text(encoding="utf-8-sig"))["token"]
    application = json.loads((ROOT / ".antideploy.json").read_text(encoding="utf-8-sig"))["applicationId"]
    archive = io.BytesIO()
    file_count = 0

    with tarfile.open(fileobj=archive, mode="w:gz") as tar:
        for file in sorted(ROOT.rglob("*")):
            relative = file.relative_to(ROOT)
            if not file.is_file() or any(part in SKIP_DIRS for part in relative.parts):
                continue
            if file.is_symlink():
                raise SystemExit(f"Refusing symlink: {relative}")
            if file.stat().st_size > MAX_FILE:
                raise SystemExit(f"File exceeds Antideploy's 5 MB upload limit: {relative}")
            tar.add(file, arcname=relative.as_posix())
            file_count += 1

    if archive.tell() > MAX_ARCHIVE:
        raise SystemExit("Compressed project exceeds Antideploy's 28 MB upload limit.")

    boundary = "doomsday-" + uuid.uuid4().hex
    body = (
        f'--{boundary}\r\nContent-Disposition: form-data; name="archive"; filename="source.tar.gz"\r\n'
        "Content-Type: application/gzip\r\n\r\n"
    ).encode() + archive.getvalue() + f"\r\n--{boundary}--\r\n".encode()

    def call(path: str, data: bytes | None = None, content_type: str | None = None):
        headers = {"Authorization": f"Bearer {token}"}
        if content_type:
            headers["Content-Type"] = content_type
        request = urllib.request.Request(API + path, data=data, headers=headers)
        try:
            with urllib.request.urlopen(request, timeout=120) as response:
                return json.load(response)
        except urllib.error.HTTPError as exc:
            detail = exc.read().decode(errors="replace").replace(token, "[REDACTED]")
            raise SystemExit(f"Antideploy HTTP {exc.code}: {detail}") from None

    print(f"Uploading {file_count} files ({archive.tell() / 1024 / 1024:.1f} MB compressed)...", flush=True)
    result = call(
        f"/api/v1/deploy?applicationId={application}",
        body,
        f"multipart/form-data; boundary={boundary}",
    )
    if result.get("status") == "unchanged":
        print("Source is unchanged; the current deployment remains live.")
        return

    task = result["taskId"]
    print(f"Deployment queued: {task}", flush=True)
    previous = None
    deadline = time.monotonic() + 900
    while time.monotonic() < deadline:
        result = call(f"/api/v1/deployments/{task}")
        status = result.get("status")
        if status != previous:
            print(f"Status: {status}", flush=True)
            previous = status
        if status in {"succeeded", "failed"}:
            if status == "failed":
                print(json.dumps(result, indent=2).replace(token, "[REDACTED]"))
                raise SystemExit(1)
            print(result.get("url") or "Deployment succeeded.")
            return
        time.sleep(5)

    raise SystemExit(f"Deployment is still running. Inspect task {task} before retrying.")


if __name__ == "__main__":
    main()
