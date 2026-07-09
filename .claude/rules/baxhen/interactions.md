# Baxhen Interaction Type Conventions

## What Are Interaction Types

Interaction types are the building blocks of funnel experiences. Each type represents
a distinct user interaction: a text message, an audio bubble, a call screen, a PDF viewer, etc.

They are formalized in `interaction-types/` with one file per type.

## Interaction Type Rules

1. Every interaction type is defined in `interaction-types/{name}.ts` as a `InteractionTypeDefinition`
2. The definition declares:
   - `id`: kebab-case unique identifier
   - `fields`: what data a message needs to render this type
   - `defaultRendererComponentId`: which component renders it by default
   - `compatibleComponentIds`: all components that CAN render it
   - `icon`: lucide-react icon name for tooling UI
3. New interaction types MUST be registered in `lib/registry/interaction-registry.ts`
4. Components declare which interaction types they support in their `componentManifest.interactionTypes`
5. Hooks declare which interaction types they produce in their `hookManifest.interactionTypes`

## Adding a New Interaction Type

1. Create `interaction-types/{name}.ts` with the type definition
2. Register in `lib/registry/interaction-registry.ts`
3. Create or update the component(s) that render this type
4. Update any hooks that produce this type
5. If the type changes with existing data, update existing funnel scripts

## Current Interaction Types

| ID            | Component              | Description                              |
|---------------|------------------------|------------------------------------------|
| text          | whatsapp-screen        | Standard WhatsApp-style text bubble      |
| audio         | whatsapp-screen        | Playable audio message bubble            |
| pdf-document   | whatsapp-screen, pdf-viewer | PDF document preview + viewer overlay |
| case-file     | whatsapp-screen, pdf-viewer | Rich media case file card            |
| call-screen   | iphone-call-screen     | iOS-style incoming/active/ended call     |
| cta-button    | whatsapp-screen        | Call-to-action button for navigation     |
