build:
	@make install
	@component build --dev
	@component build --standalone sgApplyScope --name sgApplyScope --out test
	@uglifyjs test/sgApplyScope.js > test/sgApplyScope.min.js --mangle

install:
	@component install --dev > /dev/null

.PHONY: build install