# Supplier Relationship Management System

AI-native Supplier Relationship Management Co-pilot for procurement professionals.

## Project Structure

This is a monorepo containing both backend and frontend applications:

```
ManVsMachine_Team21/
├── apps/
│   ├── backend/
│   │   └── supplier-relationship-management/     # NestJS microservice
│   └── frontend/                                  # Future React/Next.js app (placeholder)
├── packages/
│   └── shared/                    # Shared types and utilities
├── docs/
│   └── common/                    # Product and technical documentation
├── docker-compose.yml
├── package.json
└── README.md
```

## Features

### Current (MVP)
- ✅ RESTful API for supplier management
- ✅ CRUD operations for suppliers
- ✅ SQLite database with TypeORM
- ✅ Swagger API documentation
- ✅ Docker containerization
- ✅ Search and filtering capabilities

### Planned
- 🔄 Slack bot integration
- 🔄 LLM integration (Anthropic/Gemini)
- 🔄 Data enrichment agent
- 🔄 Automated reminders
- 🔄 Email automation

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)

### Run with Docker (Recommended)

1. **Clone and navigate to the project:**
   ```bash
   git clone <repository-url>
   cd ManVsMachine_Team21
   ```

2. **Start the services:**
   ```bash
   # Production mode
   docker-compose up
   
   # Development mode with hot reloading
   npm run docker:dev
   ```

3. **Access the application:**
   - API: http://localhost:3000/api/v1/suppliers
   - Swagger Docs: http://localhost:3000/api/docs

4. **Stop the services:**
   ```bash
   docker-compose down
   ```

### Local Development

1. **Install dependencies:**
   ```bash
   cd apps/backend/supplier-relationship-management
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env
   ```

3. **Run the application:**
   ```bash
   npm run start:dev
   ```

## API Usage Examples

### Create a Supplier
```bash
curl -X POST http://localhost:3000/api/v1/suppliers \
  -H "Content-Type: application/json" \
  -d '{
    "supplierName": "Test Supplier Co",
    "status": "Researching",
    "primaryContact": "John Doe",
    "contactEmail": "john@testsupplier.com",
    "procurementNeed": "Custom microchips",
    "tags": "electronics, hardware, microchips",
    "notes": "Initial contact made via LinkedIn"
  }'
```

### Get All Suppliers
```bash
curl http://localhost:3000/api/v1/suppliers
```

### Search Suppliers
```bash
curl "http://localhost:3000/api/v1/suppliers?search=microchips"
```

### Filter by Status
```bash
curl "http://localhost:3000/api/v1/suppliers?status=Researching"
```

### Get Specific Supplier
```bash
curl http://localhost:3000/api/v1/suppliers/Test%20Supplier%20Co
```

### Update Supplier
```bash
curl -X PATCH http://localhost:3000/api/v1/suppliers/Test%20Supplier%20Co \
  -H "Content-Type: application/json" \
  -d '{"status": "Contacted", "notes": "Follow-up email sent"}'
```

## Database Schema

### Suppliers Table
| Field | Type | Description |
|-------|------|-------------|
| supplierName | String (Primary Key) | Unique supplier identifier |
| status | Enum | Researching, Contacted, In Negotiation, On Hold, Active |
| primaryContact | String | Main contact person |
| contactEmail | Email | Contact email address |
| procurementNeed | Text | Description of procurement requirements |
| tags | String | Comma-separated classification tags |
| nextFollowUpDate | Date | Scheduled follow-up date |
| notes | Text | Additional notes |
| createdAt | DateTime | Record creation timestamp |
| updatedAt | DateTime | Last update timestamp |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| NODE_ENV | development | Application environment |
| PORT | 3000 | Server port |
| DATABASE_PATH | suppliers.db | SQLite database file path |
| DATABASE_SYNC | true | Auto-sync database schema |
| CORS_ORIGIN | http://localhost:3001 | Frontend origin for CORS |

## Technology Stack

### Backend
- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** SQLite with TypeORM
- **Documentation:** Swagger/OpenAPI
- **Security:** Helmet, CORS
- **Validation:** class-validator, class-transformer

### DevOps
- **Containerization:** Docker & Docker Compose
- **Process Management:** dumb-init
- **Health Checks:** Built-in HTTP health monitoring

## Development Commands

### Backend (supplier-relationship-management)
```bash
# Development
npm run start:dev

# Build
npm run build

# Production
npm run start:prod

# Testing
npm run test
npm run test:watch
npm run test:e2e

# Linting
npm run lint
npm run format
```

### Docker

#### Development (with hot reloading)
```bash
# Start development environment
npm run docker:dev

# Build and start development environment
npm run docker:dev:build

# Stop development environment
npm run docker:dev:down
```

#### Production
```bash
# Build containers
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Remove volumes
docker-compose down -v
```

## Health Monitoring

The application includes built-in health checks:
- Container health check every 30 seconds
- HTTP endpoint monitoring
- Automatic restart on failure

## Next Steps

1. **Frontend Development:** Set up React/Next.js application in `apps/frontend`
2. **Slack Integration:** Implement webhook endpoints for Slack bot
3. **LLM Integration:** Add Anthropic/Gemini API integration
4. **Authentication:** Implement proper auth system
5. **Testing:** Add comprehensive test suite
6. **CI/CD:** Set up GitHub Actions workflows

## Contributing

1. Follow the existing code structure and patterns
2. Add tests for new features
3. Update documentation as needed
4. Use conventional commit messages

## Support

For questions and issues, refer to the documentation in `docs/common/` or create an issue in the repository.
