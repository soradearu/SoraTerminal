import time
from collections import defaultdict, deque


# Temporary request history.
# We do NOT persist this information.
request_history = defaultdict(deque)


SCANNER_PATHS = {
    "/wp-admin/",
    "/wp-login.php",
    "/phpmyadmin",
    "/.env",
    "/config.php",
    "/admin",
}


def analyze_request(path: str):

    now = time.time()

    # For the MVP we use the request stream
    # to calculate short-term request frequency.
    #
    # This data is temporary and is not saved
    # to the database.

    key = "request-stream"

    history = request_history[key]

    # Keep only the previous 10 seconds.

    while history and now - history[0] > 10:
        history.popleft()

    history.append(now)

    request_count = len(history)

    score = 0
    reasons = []

    # High request frequency

    if request_count >= 10:

        score += 30

        reasons.append(
            "high request frequency"
        )

    if request_count >= 20:

        score += 40

        reasons.append(
            "request burst"
        )

    # Scanner-like paths

    if path.lower() in SCANNER_PATHS:

        score += 40

        reasons.append(
            "scanner-like path"
        )

    # Classification

    if score >= 70:

        classification = "SUSPECTED_BOT"

    elif score >= 30:

        classification = "SUSPICIOUS"

    else:

        classification = "NORMAL"

    return {
        "classification": classification,
        "score": score,
        "reasons": reasons,
        "request_count": request_count,
    }