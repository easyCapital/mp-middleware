ifeq (,$(wildcard ./makefiles/*.mk))
  $(error The project use submodules use : `git submodule init` and `git submodule update` to retrieve them)
endif

include makefiles/makefile.help.mk
include makefiles/makefile.dotenv.mk
