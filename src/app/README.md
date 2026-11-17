# src/app structure

- `core/`: services and configuration used across the application. Keep feature-specific logic in its feature.
- `shared/`: UI components reused by more than one feature. The bottom navigation lives in `shared/components/bottom-navigation/`.
- `features/<name>/pages/`: routed screens.
- `features/<name>/components/`: UI components specific to one feature. Keep this folder focused; extract components when they are reused or have independent behavior.
- `features/<name>/data/`: static display data and fixtures, kept separate from page behavior.
- `features/auth/utils/`: authentication form validation and other auth-only helpers.

Do not add empty placeholder code. The component folders may stay empty until a component is extracted from a page.
