# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Setup & Dependencies
```bash
# Install dependencies and generate protobuf types
npm install && npm run install-idl && npm run generate:idl
```

### Development
```bash
# Run development server (with pretty logging)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Testing
```bash
# Run all tests (unit + type tests)
npm test

# Run only unit tests
npm run test:unit

# Run browser tests only
npm run test:unit:browser

# Run node tests only
npm run test:unit:node

# Run type tests only
npm run test:types
```

### Code Quality
```bash
# Run ESLint
npm run lint

# Run TypeScript type checking
npm run typecheck
```

### Protobuf Generation
```bash
# Download IDL files (required before build/dev)
npm run install-idl

# Generate TypeScript types from proto files
npm run generate:idl
```

## Architecture Overview

This is a **Next.js 14** web application for the Cadence distributed workflow orchestration platform. The codebase follows a modular architecture with clear separation of concerns.

### Key Architectural Patterns

**Next.js App Router Structure**: Uses the new App Router with nested layouts and route groups in `src/app/`. Route groups like `(Home)`, `(Domain)`, `(Workflow)` organize related pages without affecting URL structure.

**Component-Based Architecture**: Reusable UI components in `src/components/` follow a consistent pattern with co-located `.tsx`, `.styles.ts`, `.types.ts`, and `__tests__/` files.

**View Components**: Page-level components in `src/views/` handle specific application pages (domain pages, workflow pages, etc.) and contain their own sub-components and business logic.

**Route Handlers**: API endpoints in `src/route-handlers/` handle backend communication with Cadence services. Each handler includes validation schemas, types, and tests.

**Dynamic Configuration System**: Feature flags and environment-based configuration managed through `src/config/dynamic/` with resolvers that can evaluate at server start or per-request.

**gRPC Integration**: Communicates with Cadence backend services via gRPC using generated TypeScript types from protobuf definitions.

### Key Dependencies & Technologies

- **UI Framework**: React 18 with Next.js 14 App Router
- **Styling**: Styletron (CSS-in-JS) via BaseUI design system
- **State Management**: TanStack Query (React Query) for server state
- **Backend Communication**: gRPC via @grpc/grpc-js
- **Schema Validation**: Zod for API request/response validation
- **Testing**: Jest with separate browser/node test configurations
- **Type Generation**: Proto-loader for gRPC TypeScript types

### Environment Variables

Configure these environment variables for development:

- `CADENCE_GRPC_PEERS`: gRPC endpoints (default: 127.0.0.1:7833)
- `CADENCE_GRPC_SERVICES_NAMES`: Service names (default: cadence-frontend)
- `CADENCE_CLUSTERS_NAMES`: Cluster names (default: cluster0)
- `CADENCE_WEB_PORT`: HTTP port (default: 8088)
- Feature flags: `CADENCE_EXTENDED_DOMAIN_INFO_METADATA_ENABLED`, `CADENCE_WORKFLOW_DIAGNOSTICS_ENABLED`, `CADENCE_ARCHIVAL_DEFAULT_SEARCH_ENABLED`

### Code Organization Patterns

**Co-location**: Components, styles, types, and tests are kept together in the same directory.

**Barrel Exports**: Utility modules use index files to export clean APIs.

**TypeScript Strict Mode**: Full TypeScript strict mode enabled with path aliases (`@/*` maps to `src/*`).

**Testing Strategy**: Separate Jest configurations for browser (jsdom) and Node.js environments with 85% coverage threshold.

### Development Workflow

1. Always run `npm run install-idl && npm run generate:idl` after dependency changes
2. Use `npm run dev` for development with hot reloading and pretty logging
3. Run `npm run lint && npm run typecheck` before committing
4. Test coverage must maintain 85% threshold across all metrics
5. Follow existing component patterns with co-located files