# Code Style and Conventions

## TypeScript/React Conventions
- **Component Style:** Functional components with hooks
- **File Naming:** PascalCase for components (Hero.tsx, SocialMedia.tsx)
- **Function Declarations:** Standard function declarations for components
- **Export Style:** Default exports for components

## Code Patterns
- Framer Motion for animations with `initial`, `animate`, `transition` props
- Tailwind CSS for styling with utility classes
- Responsive design: mobile-first with `sm:` prefix for larger screens

## Formatting
- 2-space indentation (inferred from existing code)
- Double quotes for JSX attributes
- No semicolons preference (existing code doesn't use them consistently)

## Component Structure
```tsx
import statements
function ComponentName() {
    return (
        JSX content
    );
}
export default ComponentName;
```

## ESLint Configuration
- TypeScript ESLint parser and plugin
- React hooks plugin
- React refresh plugin
- Max warnings: 0
