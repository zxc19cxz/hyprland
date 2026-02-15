#!/usr/bin/env python3

import datetime as _dt
import os
import subprocess
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable


@dataclass(frozen=True)
class GitInfo:
    head_sha: str
    head_summary: str
    latest_tag: str
    commit_count_7d: int


def _run(cmd: list[str]) -> str:
    return subprocess.check_output(cmd, text=True).strip()


def _try_run(cmd: list[str], default: str = "") -> str:
    try:
        return _run(cmd)
    except Exception:
        return default


def _git_info(now_utc: _dt.datetime) -> GitInfo:
    head_sha = _try_run(["git", "rev-parse", "HEAD"], default="")
    head_summary = _try_run(["git", "show", "-s", "--format=%s", "HEAD"], default="")
    latest_tag = _try_run(["git", "describe", "--tags", "--abbrev=0"], default="")

    since_dt = _dt.datetime.combine(
        (now_utc.date() - _dt.timedelta(days=7)),
        _dt.time(0, 0, 0),
        tzinfo=_dt.timezone.utc,
    )
    since = since_dt.strftime("%Y-%m-%dT%H:%M:%SZ")
    commit_count_raw = _try_run(["git", "rev-list", "--count", f"--since={since}", "HEAD"], default="0")
    try:
        commit_count_7d = int(commit_count_raw)
    except ValueError:
        commit_count_7d = 0

    return GitInfo(
        head_sha=head_sha,
        head_summary=head_summary,
        latest_tag=latest_tag,
        commit_count_7d=commit_count_7d,
    )


def _iter_files(root: Path) -> Iterable[Path]:
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [
            d
            for d in dirnames
            if d not in {".git", "build", "result", "node_modules"}
        ]
        for name in filenames:
            yield Path(dirpath) / name


def _count_by_extension(root: Path) -> dict[str, int]:
    counts: dict[str, int] = {}
    for p in _iter_files(root):
        ext = p.suffix.lower() if p.suffix else "(none)"
        counts[ext] = counts.get(ext, 0) + 1
    return dict(sorted(counts.items(), key=lambda kv: (-kv[1], kv[0])))


def _render_report(now_utc: _dt.datetime, git: GitInfo, counts: dict[str, int]) -> str:
    now_str = now_utc.strftime("%Y-%m-%d")

    lines: list[str] = []
    lines.append("# Weekly repo report")
    lines.append("")
    lines.append(f"Generated: `{now_str}`")
    lines.append("")

    lines.append("## Git")
    lines.append("")
    lines.append(f"- HEAD: `{git.head_sha}`")
    if git.head_summary:
        lines.append(f"- HEAD summary: {git.head_summary}")
    if git.latest_tag:
        lines.append(f"- Latest tag: `{git.latest_tag}`")
    lines.append(f"- Commits in last 7 days: `{git.commit_count_7d}`")
    lines.append("")

    lines.append("## File counts by extension")
    lines.append("")
    lines.append("| Extension | Files |")
    lines.append("|---|---:|")
    for ext, n in list(counts.items())[:30]:
        lines.append(f"| `{ext}` | {n} |")
    lines.append("")

    return "\n".join(lines)


def main() -> int:
    repo_root = Path(__file__).resolve().parents[2]
    reports_dir = repo_root / "reports"
    reports_dir.mkdir(parents=True, exist_ok=True)

    now_utc = _dt.datetime.now(tz=_dt.timezone.utc)

    git = _git_info(now_utc)
    counts = _count_by_extension(repo_root)

    report_path = reports_dir / "weekly.md"
    new_content = _render_report(now_utc, git, counts)

    old_content = ""
    if report_path.exists():
        old_content = report_path.read_text(encoding="utf-8")

    if old_content != new_content:
        report_path.write_text(new_content, encoding="utf-8")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
