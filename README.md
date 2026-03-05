Dependencies

## System requirements

1. **Node.js**: 20+
2. **npm**: 9+
3. Docker Desktop
4. **Docker**: Docker Compose version v2.x.x
5. **Git**
6. **k6**: brew install k6 on mac or install based on platform

### install all dependencies, build and run test from root directory

### root dir: unified-framework-ace-platform

```git clone <repo>
cd unified-framework-ace-plaform
npm install
npm run install:all
cd guardian-service
npm run build
cd ..
npm run start
```

### After the docker service is running test with the curl command

```
curl http://localhost:3001/guardian/validate \
  -H "Content-Type: application/json" \
  -d '{"zone_id":"DC","recommended_setpoints":{"supply_air_temp":23},"constraints":{"max_supply_air_temp":24,"min_supply_air_temp":18,"max_rack_inlet_temp":27},"digital_twin_prediction":{"predicted_max_rack_inlet_temp":26}}'

  And output should be
  {"approved":true,"violations":[]}
```

### Run all tests and performance test

```
npm run test:all
k6 run tests-performance/guardian-load.js
```

## Project structure

```unified-framework-ace-plaform
├── README.md
├── guardian-service
│   ├── package.json
│   └── tsconfig.json
├── package-lock.json
├── package.json
├── reports
├── scripts
├── tests-api
│   ├── package.json
│   └── tsconfig.json
├── tests-bdd
│   ├── package.json
│   └── tsconfig.json
├── tests-federated
│   ├── package.json
│   └── tsconfig.json
├── tests-pact
│   ├── package.json
│   └── tsconfig.json
├── tests-performance
└── tests-ui
    └── package.json
```

### Reports location

```
/reports
```
