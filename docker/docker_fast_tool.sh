#!/bin/bash
#
# Docker Compose Helper for Dify
# Simplifies common operations: build, redeploy, and log viewing.
#
# Examples:
#   ./docker_fast_tool.sh -b          # Build images
#   ./docker_fast_tool.sh -b -c       # Clean build (no cache)
#   ./docker_fast_tool.sh -r          # Redeploy (down + up)
#   ./docker_fast_tool.sh -b -r -l    # Build, redeploy, then follow logs
#   ./docker_fast_tool.sh -p myapp -r # Use custom project name
#
set -e

# ------------------------------------------------------------------------------
# Configuration
# ------------------------------------------------------------------------------
PROJECT="${DIFY_COMPOSE_PROJECT_NAME:-dify}"

# ------------------------------------------------------------------------------
# Flags (set by command-line arguments)
# ------------------------------------------------------------------------------
BUILD=false
CLEAN=false
REDEPLOY=false
LOG=false

# ------------------------------------------------------------------------------
# Usage
# ------------------------------------------------------------------------------
usage() {
    cat >&2 <<EOF
Usage: $0 [-p NAME] [-b] [-c] [-r] [-l]

Options:
  -p, --project NAME   Compose project name (default: \$DIFY_COMPOSE_PROJECT_NAME or "dify")
  -b, --build          Build images with full output
  -c, --clean          Clean build (--no-cache), requires -b
  -r, --redeploy       Stop and restart services (down + up -d)
  -l, --log            Follow container logs

Environment:
  DIFY_COMPOSE_PROJECT_NAME   Default project name if -p not specified
EOF
    exit 1
}

# ------------------------------------------------------------------------------
# Parse Arguments
# ------------------------------------------------------------------------------
while [ $# -gt 0 ]; do
    case "$1" in
        -b|--build)       BUILD=true;   shift ;;
        -c|--clean)       CLEAN=true;   shift ;;
        -r|--redeploy)    REDEPLOY=true; shift ;;
        -l|--log)         LOG=true;     shift ;;
        -p|--project)     PROJECT="${2:?Missing project name}"; shift 2 ;;
        -p=*|--project=*) PROJECT="${1#*=}"; shift ;;
        *)                echo "Unknown option: $1" >&2; usage ;;
    esac
done

# ------------------------------------------------------------------------------
# Validation
# ------------------------------------------------------------------------------
# Ensure project name is not empty
[ -n "$PROJECT" ] || PROJECT="dify"

# -c (clean) only makes sense with -b (build)
$CLEAN && ! $BUILD && { echo "Error: -c/--clean requires -b/--build" >&2; exit 1; }

# At least one action required
! $BUILD && ! $REDEPLOY && ! $LOG && usage

# ------------------------------------------------------------------------------
# Helper: Run command with logging
# ------------------------------------------------------------------------------
run() {
    echo ">> $*"
    "$@" || { echo "Error: '$1' failed" >&2; exit 1; }
}

# ------------------------------------------------------------------------------
# Docker Compose Command
# ------------------------------------------------------------------------------
DC="docker compose -p $PROJECT"

# ------------------------------------------------------------------------------
# Actions (executed in order: build -> redeploy -> log)
# ------------------------------------------------------------------------------

# Build images (--progress=plain shows full build output)
if $BUILD; then
    if $CLEAN; then
        run $DC --progress=plain build --no-cache
    else
        run $DC --progress=plain build
    fi
fi

# Redeploy: stop then start
if $REDEPLOY; then
    run $DC down
    run $DC up -d
fi

# Follow logs
if $LOG; then
    run $DC logs -f
fi
