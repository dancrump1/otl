.PHONY: build dev up install

setup: 
	ddev config
	if [ ! "$$(ddev describe | grep OK)" ]; then \
		ddev start; \
		ddev exec composer install; \
		ddev exec npm install; \
    fi
	ddev exec php craft setup/app-id \
		$(filter-out $@,$(MAKECMDGOALS))
	ddev exec php craft setup/security-key \
		$(filter-out $@,$(MAKECMDGOALS))
	ddev exec php craft install \
		$(filter-out $@,$(MAKECMDGOALS))
%:
	@:
# ref: https://stackoverflow.com/questions/6273608/how-to-pass-argument-to-makefile-from-command-line