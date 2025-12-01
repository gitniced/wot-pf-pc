#!/bin/bash
export SENTRY_LOG_LEVEL=debug

source ./scripts/sentry-bash.sh

# oss
URL_PREFIX="~/dev/fe_user_pc/"
# 环境
ENV="test"

# 上传 sourcemap
uploadSourcemap $URL_PREFIX $ENV