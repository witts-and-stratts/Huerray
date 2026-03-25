.PHONY: add-dashboard add-marketing add-animate translate

# Add a component to the Dashboard UI (Vega style)
# Usage: make add-dashboard c=component-name
add-dashboard:
	@if [ -z "$(c)" ]; then \
		echo "Error: Please specify a component using c=component-name. Example: make add-dashboard c=button"; \
		exit 1; \
	fi
	@echo "Switching to Dashboard configuration..."
	@if [ -f components.json ]; then mv components.json components-marketing.json; fi
	@if [ -f components-dashboard.json ]; then mv components-dashboard.json components.json; fi
	@echo "Installing $(c)..."
	@npx shadcn@latest add $(c) --overwrite || ( \
		echo "Installation failed. Restoring configurations..."; \
		mv components.json components-dashboard.json; \
		mv components-marketing.json components.json; \
		exit 1 \
	)
	@echo "Restoring configurations..."
	@mv components.json components-dashboard.json
	@mv components-marketing.json components.json
	@echo "Successfully added $(c) to Dashboard UI."

add-animate:
	@if [ -z "$(c)" ]; then \
		echo "Error: Please specify a component using c=component-name. Example: make add-dashboard c=button"; \
		exit 1; \
	fi
	@echo "Switching to Dashboard configuration..."
	@if [ -f components.json ]; then mv components.json components-marketing.json; fi
	@if [ -f components-dashboard.json ]; then mv components-dashboard.json components.json; fi
	@echo "Installing $(c)..."
	@npx shadcn@latest add @animate-ui/$(c) --overwrite || ( \
		echo "Installation failed. Restoring configurations..."; \
		mv components.json components-dashboard.json; \
		mv components-marketing.json components.json; \
		exit 1 \
	)
	@echo "Restoring configurations..."
	@mv components.json components-dashboard.json
	@mv components-marketing.json components.json
	@echo "Successfully added $(c) to Dashboard UI."

# Add a component to the Marketing UI (Default style)
# Usage: make add-marketing c=component-name
add-marketing:
	@if [ -z "$(c)" ]; then \
		echo "Error: Please specify a component using c=component-name. Example: make add-marketing c=button"; \
		exit 1; \
	fi
	@echo "Installing $(c) to Marketing UI..."
	@npx shadcn@latest add $(c)

# Translate language files using the backend API
translate:
	@echo "Translating language files..."
	@node scripts/translate.js
