---
name: funnel-documenter
description: |
  Analyzes the current funnel structure in the Baxhen project and generates
  comprehensive documentation: steps, interactions, component usage, audio
  assets, flow diagram. Used for analysis, improvement, and onboarding new
  funnel developers.

  Triggers when the user asks to "document the funnel", "analyze funnel
  structure", "generate funnel docs", "funnel architecture", "funnel
  documentation", or mentions documenting/analyzing funnels.
user-invocable: true
---

# Funnel Documenter

## When to Activate

- User asks to document or analyze a funnel
- User asks about funnel flow, steps, or interaction types
- User mentions "funnel architecture" or "funnel documentation"
- After adding a new funnel, variant, or step
- User asks "what funnels exist?" or "what components are used in funnel X?"

## How It Works

1. Read `lib/registry/funnel-registry.ts` to discover all funnel manifests
2. For each funnel:
   a. Read its `funnel.ts` definition
   b. Trace each step: read the page file, its ViewModel hook, and its component
   c. Extract interaction types used, audio assets, component dependencies
   d. Build a flow diagram (Mermaid)
3. Read `lib/registry/component-registry.ts` for all component manifests
4. Read `lib/registry/hook-registry.ts` for all hook manifests
5. Read `lib/registry/interaction-registry.ts` for all interaction types
6. Output structured documentation as markdown

## Output Format

Generate a document with these sections:

### Funnel Overview
- Name, ID, description
- Total steps, variants, interaction types, audio assets

### Flow Diagram
Mermaid diagram showing step-by-step flow for each variant

### Step Details
For each step:
- Route, ViewModel hook, rendering component
- Interaction types used
- Audio assets loaded
- Transition behavior (user-triggered, auto-advance, timeout-based)

### Component Usage Matrix
Table: which components are used in which steps

### Interaction Type Inventory
Which interaction types are used, and by which steps/hooks

### Audio Asset Manifest
All audio files listed by step, with paths and format

## Examples

**User:** "Document the invisibility investigation funnel"
→ Reads all registries, traces the funnel flow, generates a complete markdown report with Mermaid diagram, component matrix, and audio manifest.

**User:** "What interaction types does the hijacked call step use?"
→ Reads the funnel manifest for that step, reports: `call-screen` interaction type, rendered by `iphone-call-screen` component, driven by `useHijackedCall` hook.

**User:** "Generate funnel documentation"
→ Full analysis of all registered funnels, outputs comprehensive documentation.
