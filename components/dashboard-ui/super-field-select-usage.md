# SuperField Select Usage Guide

## Overview

The `SuperField` component now supports select fields with a convenient `options` property that can accept either an array of strings or an array of objects with `label`, `value`, and optional `disabled` properties.

## API

### SelectOption Type

```typescript
type SelectOption =
  | string
  | { label: React.ReactNode; value: string; disabled?: boolean };
```

### SuperField Select Props

```typescript
interface SelectFieldProps {
  type: "select";
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | null) => void;

  // Either use options prop OR children
  options?: SelectOption[];
  children?: React.ReactNode;

  // InputGroup support
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;

  name?: string;
  id?: string;
  className?: string;
  fieldClassName?: string;
}
```

## Usage Examples

### 1. Simple String Array

```tsx
<SuperField
  type="select"
  label="Country"
  placeholder="Select a country"
  options={["United States", "United Kingdom", "Canada"]}
/>
```

### 2. Object Array with Label/Value

```tsx
<SuperField
  type="select"
  label="Language"
  placeholder="Select a language"
  options={[
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
  ]}
/>
```

### 3. With Disabled Options

```tsx
<SuperField
  type="select"
  label="Language"
  options={[
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French (Coming Soon)", value: "fr", disabled: true },
  ]}
/>
```

### 4. With State Management

```tsx
const [country, setCountry] = useState<string>("");

<SuperField
  type="select"
  label="Country"
  placeholder="Select a country"
  value={country}
  onValueChange={(value) => setCountry(value || "")}
  options={["USA", "UK", "Canada"]}
/>
```

### 5. With Error and Validation

```tsx
<SuperField
  type="select"
  label="Currency"
  placeholder="Select currency"
  required
  error="Please select a currency"
  options={[
    { label: "USD - US Dollar", value: "usd" },
    { label: "EUR - Euro", value: "eur" },
  ]}
/>
```

### 6. With Prefix/Suffix (InputGroup)

```tsx
<SuperField
  type="select"
  label="Priority"
  placeholder="Select priority"
  prefix="🚨"
  options={["Low", "Medium", "High", "Critical"]}
/>
```

### 7. Disabled Select

```tsx
<SuperField
  type="select"
  label="Status"
  placeholder="Select status"
  disabled
  defaultValue="active"
  options={[
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ]}
/>
```

### 8. Using Children (Traditional Approach)

You can still use children instead of the `options` prop if you need more control:

```tsx
import { SelectItem } from "@/components/dashboard-ui/select";

<SuperField
  type="select"
  label="Theme"
  placeholder="Select theme"
>
  <SelectItem value="light">Light</SelectItem>
  <SelectItem value="dark">Dark</SelectItem>
  <SelectItem value="system">System</SelectItem>
</SuperField>
```

### 9. Complex Labels with React Nodes

```tsx
<SuperField
  type="select"
  label="User"
  options={[
    {
      label: (
        <div className="flex items-center gap-2">
          <Avatar src="/user1.jpg" />
          <span>John Doe</span>
        </div>
      ),
      value: "user1"
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <Avatar src="/user2.jpg" />
          <span>Jane Smith</span>
        </div>
      ),
      value: "user2"
    },
  ]}
/>
```

## Benefits of Using `options` Prop

1. **Cleaner JSX**: No need to manually map over arrays to create `SelectItem` components
2. **Type Safety**: Full TypeScript support with discriminated union types
3. **Flexibility**: Supports both simple strings and complex objects
4. **Consistency**: Matches the pattern used by other form libraries
5. **Backward Compatible**: The children approach still works if needed

## When to Use `options` vs `children`

### Use `options` when:
- You have a simple list of choices
- Data comes from an array (API, constant, etc.)
- You want cleaner, more declarative code
- You need to disable specific options

### Use `children` when:
- You need complex custom rendering for each item
- You want to use `SelectGroup` or `SelectLabel` for categorization
- You need fine-grained control over each `SelectItem`

## Complete Example

```tsx
"use client";

import { SuperField } from "@/components/dashboard-ui/super-field";
import { useState } from "react";

export function UserForm() {
  const [formData, setFormData] = useState({
    country: "",
    language: "",
    currency: "",
  });

  return (
    <form className="space-y-4 max-w-md">
      <SuperField
        type="select"
        label="Country"
        placeholder="Select your country"
        value={formData.country}
        onValueChange={(value) =>
          setFormData({ ...formData, country: value || "" })
        }
        required
        options={[
          "United States",
          "United Kingdom",
          "Canada",
          "Australia",
        ]}
      />

      <SuperField
        type="select"
        label="Language"
        placeholder="Select your language"
        value={formData.language}
        onValueChange={(value) =>
          setFormData({ ...formData, language: value || "" })
        }
        options={[
          { label: "English", value: "en" },
          { label: "Spanish", value: "es" },
          { label: "French", value: "fr" },
          { label: "German", value: "de" },
        ]}
      />

      <SuperField
        type="select"
        label="Currency"
        placeholder="Select currency"
        prefix="💰"
        value={formData.currency}
        onValueChange={(value) =>
          setFormData({ ...formData, currency: value || "" })
        }
        options={[
          { label: "USD - US Dollar", value: "usd" },
          { label: "EUR - Euro", value: "eur" },
          { label: "GBP - British Pound", value: "gbp" },
        ]}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```
