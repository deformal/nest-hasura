import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './hasura/metadata/actions.graphql',
  generates: {
    './libs/db-actions-sdk/src/lib/actions.ts': {
      plugins: ['typescript'],
    },
  },
};

export default config;
