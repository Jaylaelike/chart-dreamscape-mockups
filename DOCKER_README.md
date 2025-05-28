# Docker Setup for Chart Dreamscape Mockups

This project includes Docker configuration for both development and production environments.

## Files Created

- `Dockerfile` - Production-ready multi-stage build
- `Dockerfile.dev` - Development environment
- `docker-compose.yml` - Orchestration for both environments
- `.dockerignore` - Build optimization

## Quick Start

### Production Build

```bash
# Build and run production container
docker-compose up --build

# Or build and run manually
docker build -t chart-dreamscape .
docker run -p 8080:8080 -p 5300:5300 chart-dreamscape
```

### Development Environment

```bash
# Run development environment with hot reload
docker-compose --profile dev up app-dev

# Or run manually
docker build -f Dockerfile.dev -t chart-dreamscape-dev .
docker run -p 8081:8080 -p 5301:5300 -v $(pwd)/src:/app/src chart-dreamscape-dev
```

## Services

### Production (`app`)
- **Frontend**: React/Vite application served on port 8080
- **Backend**: Node.js/Express API server on port 5300
- **Database**: SQLite with Prisma ORM
- **Features**: 
  - Multi-stage build for smaller image size
  - Health checks
  - Non-root user for security
  - Automatic database migrations

### Development (`app-dev`)
- **Frontend**: Vite dev server with hot reload on port 8081
- **Backend**: Nodemon for auto-restart on port 5301
- **Database**: Shared SQLite database
- **Features**:
  - Volume mounts for live code updates
  - Development dependencies included

## Environment Variables

- `NODE_ENV` - Environment (development/production)
- `DATABASE_URL` - Database connection string
- `PORT` - Backend server port (default: 5300)

## Database

The application uses SQLite with Prisma ORM. The database file is automatically created and migrations are applied on container startup.

### Database Persistence

For production, mount the database file as a volume:

```bash
docker run -v ./prisma/dev.db:/app/prisma/dev.db chart-dreamscape
```

## Health Checks

The production container includes health checks that verify the API is responding correctly:

```bash
# Check container health
docker ps
# Look for "healthy" status
```

## Building for Different Architectures

```bash
# Build for multiple platforms
docker buildx build --platform linux/amd64,linux/arm64 -t chart-dreamscape .
```

## Troubleshooting

### Container won't start
- Check if ports 8080 and 5300 are available
- Verify database permissions
- Check logs: `docker logs <container-id>`

### Database issues
- Ensure proper file permissions for SQLite
- Check Prisma migrations: `docker exec <container> npx prisma migrate status`

### Development hot reload not working
- Verify volume mounts are correct
- Check file permissions on mounted directories

## Production Deployment

For production deployment, consider:

1. **Use environment-specific database**:
   ```yaml
   environment:
     - DATABASE_URL=postgresql://user:pass@db:5432/mydb
   ```

2. **Add reverse proxy** (nginx, traefik):
   ```yaml
   labels:
     - "traefik.http.routers.app.rule=Host(`yourdomain.com`)"
   ```

3. **Add SSL/TLS termination**

4. **Configure logging**:
   ```yaml
   logging:
     driver: "json-file"
     options:
       max-size: "10m"
       max-file: "3"
   ```

## Security Considerations

- Container runs as non-root user
- No sensitive files in build context (see .dockerignore)
- Health checks for monitoring
- Minimal base image (Alpine Linux)

## API Endpoints

After starting the containers:

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5300
- **Health Check**: http://localhost:5300/api/sla-metrics

## Commands Summary

```bash
# Production
docker-compose up --build

# Development
docker-compose --profile dev up app-dev

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Execute commands in container
docker-compose exec app sh
```
