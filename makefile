install:
	sh "./scripts/check-dependencies.sh"
	yarn install

start:
	yarn start

test:
	yarn run lint
	yarn run test

.PHONY: test clean
