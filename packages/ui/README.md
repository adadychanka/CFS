## Generating shadcn/ui Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for generating and managing UI components in a monorepo setup with Turborepo.

### Requirements

- Each workspace (e.g., `apps/web`, `packages/ui`) must have a `components.json` file with correct aliases and configuration.
- The `components.json` files should have matching `style`, `iconLibrary`, and `baseColor` values.
- For Tailwind CSS v4, leave the `tailwind` config path empty in `components.json`.

### Adding Components

To add a new shadcn/ui component to your app, run the following command **from your app directory** (e.g., `apps/web`):

```sh
cd apps/web
pnpm dlx shadcn@canary add [COMPONENT]
```

Replace `[COMPONENT]` with the name of the component you want to add (e.g., `button`, `card`, etc.).

The CLI will automatically install the component in the correct location (usually under `packages/ui/src/components`) and update import paths as needed.

#### Example

```sh
cd apps/web
pnpm dlx shadcn@canary add button
```

### Importing Components

After generating a component, import it in your app like this:

```tsx
import { Button } from "@repo/ui/components/button";
```

You can also import hooks and utilities:

```tsx
import { useTheme } from "@repo/ui/hooks/use-theme";
import { cn } from "@repo/ui/lib/utils";
```
