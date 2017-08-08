install:
	sh "./scripts/check-dependencies.sh"
	yarn install

test:
	yarn run lint
	yarn run test

.PHONY: test clean
