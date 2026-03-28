# AGENTS.md

## Purpose
- This repository should stay easy for humans and agents to navigate.
- Prefer small, focused changes that solve the requested problem at the root cause.

## Workflow
- Read nearby files before editing so changes match existing patterns.
- Keep edits minimal and avoid unrelated refactors.
- Update documentation when behavior, setup, or developer workflow changes.
- Before finalizing changes, ensure dependencies are installed if the task required adding or changing them.

## Code Style
- Follow the style already used in the surrounding codebase.
- Prefer clear names over short or clever ones.
- Do not add inline comments unless they are necessary to explain non-obvious behavior.
- Avoid introducing new dependencies unless they are clearly justified.

## Validation
- Run the most targeted validation available for the changed area first.
- If relevant tooling exists, use tests, linting, or build checks to verify the change.
- Do not fix unrelated failing tests or formatting issues unless the user asks.

## Agent Guidance
- Check for more specific `AGENTS.md` files in subdirectories before editing files there.
- When a task matches an available skill, load only the needed `SKILL.md` and follow it.
- Prefer fast search tools such as `rg` for code and file discovery.
- Never commit or create branches unless the user explicitly asks.
