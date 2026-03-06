Dependencies

## System requirements

1. **Node.js**: 20+
2. **npm**: 9+
3. Docker Desktop
4. **Docker**: Docker Compose version v2.x.x
5. **Git**
6. **k6**: brew install k6 on mac or install based on platform

### clone project install all dependencies from the root folder

```
git clone git@github.com:jimihunter2002/qa-unified-automation-framework.git
cd unified-framework-ace-plaform
npm run install:all
```

### build, start and run tests against guardian engine docker service locally or on CI

```
npm run test:ci --> for ci on github

npn run test:local --> on local machine

```

### After the docker service is running test with the curl command

```
curl http://localhost:3001/guardian/validate \
  -H "Content-Type: application/json" \
  -d '{"zone_id":"DC","recommended_setpoints":{"supply_air_temp":23},"constraints":{"max_supply_air_temp":24,"min_supply_air_temp":18,"max_rack_inlet_temp":27},"digital_twin_prediction":{"predicted_max_rack_inlet_temp":26}}'

  And output should be
  {"approved":true,"violations":[]}
```

### Reports location on Local machine

```
reports/summary-report.md
```

### Result on Github:

[Guardian Service Report] (https://github.com/jimihunter2002/qa-unified-automation-framework/actions/runs/22765301262)

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
