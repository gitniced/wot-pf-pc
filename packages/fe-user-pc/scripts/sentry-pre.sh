#!/bin/bash
export SENTRY_LOG_LEVEL=debug

source ./scripts/sentry-bash.sh

# oss
URL_PREFIX="~/pre/fe_user_pc/"
# 环境
ENV="pre"

# 上传 sourcemap
uploadSourcemap $URL_PREFIX $ENV