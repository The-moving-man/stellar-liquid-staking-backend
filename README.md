# stellar-liquid-staking-backend

NestJS backend + Soroban event indexer for the Stellar liquid staking protocol.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/v1/staking/position/:address | Staking position |
| GET | /api/v1/staking/tvl | Total staked |
| GET | /api/v1/validators | Active validators |
| GET | /api/v1/withdrawals/:address | Withdrawal requests |
| GET | /api/v1/rewards/estimate | Reward estimator |
| GET | /api/v1/analytics/stats | Protocol stats |
| GET | /api/v1/analytics/history | Historical metrics |
| POST | /api/v1/admin/login | Admin JWT |

Swagger docs: `http://localhost:3002/api/docs`

## Quick Start

```bash
cp .env.example .env
npm install
npm run start:dev
```

## Docker

```bash
docker-compose up -d
```
