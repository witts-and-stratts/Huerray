"use client";

import { SuperField } from "@/components/dashboard-ui/super-field";
import { SelectItem } from "@/components/dashboard-ui/select";
import { useState } from "react";

/**
 * Example usage of SuperField with select type
 * This file demonstrates how to use the select variant of SuperField
 */
export function SuperFieldSelectExample() {
  const [country, setCountry] = useState<string>("");
  const [language, setLanguage] = useState<string>("");

  return (
    <div className="space-y-4 max-w-md">
      {/* Basic select with options array (strings) */}
      <SuperField
        type="select"
        label="Country"
        placeholder="Select a country"
        value={country}
        onValueChange={(value) => setCountry(value || "")}
        description="Choose your country of residence"
        options={["United States", "United Kingdom", "Canada", "Australia", "Germany"]}
      />

      {/* Select with options array (objects with label/value) */}
      <SuperField
        type="select"
        label="Language"
        placeholder="Select a language"
        value={language}
        onValueChange={(value) => setLanguage(value || "")}
        options={[
          { label: "English", value: "en" },
          { label: "Spanish", value: "es" },
          { label: "French", value: "fr" },
          { label: "German", value: "de" },
          { label: "Japanese (disabled)", value: "jp", disabled: true },
        ]}
      />

      {/* Select with error using options */}
      <SuperField
        type="select"
        label="Currency"
        placeholder="Select currency"
        required
        error="Please select a currency"
        options={[
          { label: "USD - US Dollar", value: "usd" },
          { label: "EUR - Euro", value: "eur" },
          { label: "GBP - British Pound", value: "gbp" },
          { label: "JPY - Japanese Yen", value: "jpy" },
        ]}
      />

      {/* Select with prefix and options */}
      <SuperField
        type="select"
        label="Priority"
        placeholder="Select priority"
        prefix="🚨"
        options={["Low", "Medium", "High", "Critical"]}
      />

      {/* Disabled select with options */}
      <SuperField
        type="select"
        label="Status"
        placeholder="Select status"
        disabled
        defaultValue="active"
        options={[
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
          { label: "Pending", value: "pending" },
        ]}
      />

      {/* Select using children (traditional approach still works) */}
      <SuperField
        type="select"
        label="Theme"
        placeholder="Select theme"
        description="You can still use children instead of options"
      >
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SuperField>
    </div>
  );
}
