Dependencies

## System requirements

1. **Node.js**: 20+
2. **npm**: 9+
3. Docker Desktop
4. **Docker**: Docker Compose version v2.x.x
5. **Git**
6. **k6**: brew install k6 on mac or install based on platform

### install all dependencies, build and run test from root directory

### root dir: unified-framework-ace-platform and run the commands below in your terminal

```git clone <repo>
cd unified-framework-ace-plaform
npm run install:all
```

### Run all tests and performance test as well as generates report as markdown locally

```
npm run ci

```

### After the docker service is running test with the curl command

```
curl http://localhost:3001/guardian/validate \
  -H "Content-Type: application/json" \
  -d '{"zone_id":"DC","recommended_setpoints":{"supply_air_temp":23},"constraints":{"max_supply_air_temp":24,"min_supply_air_temp":18,"max_rack_inlet_temp":27},"digital_twin_prediction":{"predicted_max_rack_inlet_temp":26}}'

  And output should be
  {"approved":true,"violations":[]}
```

### Reports location

```
reports/summary-report.md
```

## Project structure

```unified-framework-ace-plaform
├── README.md
├── docker-compose.yml
├── eslint.config.mjs
├── guardian-service
├── package-lock.json
├── package.json
├── reports
├── scripts
├── tests-api
├── tests-bdd
├── tests-federated
├── tests-pact
├── tests-performance
├── tests-ui
└── tsconfig.base.json
```
