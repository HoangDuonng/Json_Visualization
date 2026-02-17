# Workflows Reference

Practical development workflows for JSON Visualization.

## Add a new converter

Converters live under `src/layout/ConverterLayout/` with routes in `src/pages/converter/`.

Checklist:

1. Add a route page in `src/pages/converter/[from]-to-[to].tsx`.
2. Use `ConverterLayout/ToolPage.tsx` for consistent UI.
3. Ensure format detection uses `FileFormat` in `src/enums/FileFormat.ts`.
4. Convert data using `contentToJson` and `jsonToContent` from `src/lib/utils/jsonAdapter.ts`.
5. Update any navigation links in `src/layout/ConverterLayout/PageLinks.tsx`.

Minimal route example:

```tsx
import React from "react";
import { FileFormat } from "src/enums/FileFormat";
import ToolPage from "src/layout/ConverterLayout/ToolPage";

const Page = () => <ToolPage inputFormat={FileFormat.JSON} outputFormat={FileFormat.YAML} />;

export default Page;
```

## Add a new type generator

Type generators live under `src/layout/TypeLayout/` with routes in `src/pages/type/`.

Checklist:

1. Add a route in `src/pages/type/[format]-to-[language].tsx`.
2. Use `TypeLayout/TypegenWrapper.tsx` for consistent UI.
3. Update `src/layout/TypeLayout/PageLinks.tsx` for navigation.
4. Implement generation logic in `src/lib/utils/generateType.ts` or add a new helper if needed.

Minimal route example:

```tsx
import React from "react";
import { FileFormat } from "src/enums/FileFormat";
import TypegenWrapper from "src/layout/TypeLayout/TypegenWrapper";

const Page = () => <TypegenWrapper inputFormat={FileFormat.JSON} outputLanguage="typescript" />;

export default Page;
```

## Add a new modal

Modals are managed by `src/features/modals/ModalController.tsx` and `src/store/useModal.ts`.

Checklist:

1. Create a modal component in `src/features/modals/`.
2. Add a new modal type in `src/store/useModal.ts`.
3. Register it in `ModalController.tsx`.
4. Wire the trigger (toolbar or button).

Basic pattern:

```tsx
const opened = useModal(state => state[modalKey]);
<ModalComponent opened={opened} onClose={() => setVisible(modalKey, false)} />;
```

## Modify graph rendering

Graph rendering is handled in `src/features/editor/views/GraphView/`.

Checklist:

1. Update node shapes in `CustomNode/` (ObjectNode/TextNode).
2. Update edges in `CustomEdge/index.tsx`.
3. Adjust parsing in `lib/jsonParser.ts` if node data needs changes.
4. Keep `propsAreEqual` logic in nodes to avoid unnecessary re-renders.

## Update JsonDraw view

JsonDraw view renders graph data on a drawable canvas.

Checklist:

1. Update conversion in `src/features/editor/views/JsonDrawView/jsonToJsonDraw.ts`.
2. Render/view logic lives in `src/features/editor/views/JsonDrawView/index.tsx`.
3. View selection uses `ViewMode.JsonDraw` in `src/enums/viewMode.enum.ts`.
4. Ensure `LiveEditor` and `Toolbar/ViewMenu` include the view option.
5. Keep autosave key `jsondraw-autosave` stable for restore behavior.

## Add a new reusable component

Components follow `src/components/ComponentName/ComponentName.tsx` + `index.ts`.

Checklist:

1. Create folder and component file.
2. Add a barrel export in `index.ts`.
3. Use styled-components in the same file.
4. Use `import type` for type-only imports.
5. Keep import order consistent with `AGENTS.md`.

Example structure:

```
src/components/MyComponent/
├── MyComponent.tsx
└── index.ts
```
