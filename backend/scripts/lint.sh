#!/usr/bin/env bash

# TODO: turn off errors for now
# set -e
set -x

mypy app
ruff app
ruff format app --check
