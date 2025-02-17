# Shoble.io - Shopify B2B Leads

## Installation

### Prerequisites

- Shopify CLI
- Prisma CLI

### Steps

1. Create your own Shopify app in the Shopify Partner Dashboard and remember the API key and secret.
2. Copy the `shopify.app.development.toml` file to `shopify.app.toml` and fill in the required values for your own local development application. Each developer has its own app configuration.
3. Copy the `template.env` file to `.env` and fill in the required values: `cp template.env .env`.
4. Install the dependencies: `npm ci`.
5. Generate the Prisma client: `prisma generate --sql`.

## Run the Application

1. Start the database: `docker compose up -d db`.
2. Run the development application against the development store: `shopify app dev`.
