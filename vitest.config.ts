import { defineConfig } from 'vitest/config';

// Vitest 3.2 replaced the standalone `vitest.workspace.*` file with the
// `test.projects` option on the root config (the workspace file is removed in
// Vitest 4). Projects live at `<category>/<project>/`, so the globs are scoped
// to that depth — a bare `**/` would also match this root config and make it
// reference itself, running every spec without each project's own settings.
export default defineConfig({
  test: {
    projects: [
      '*/*/vite.config.{mjs,js,ts,mts}',
      '*/*/vitest.config.{mjs,js,ts,mts}',
    ],
  },
});
