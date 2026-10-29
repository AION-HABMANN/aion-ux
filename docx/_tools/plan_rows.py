import re
import sys
import io


def rows(day):
    t = open(f"G:/claude code/AION-HABMANN/aion-ux/trainer-only/plan/day{day}.txt", encoding="utf-8").read()
    parts = re.split(r"^=== ROW (\d+) :: ", t, flags=re.M)
    return {int(parts[i]): parts[i + 1] for i in range(1, len(parts), 2)}


def pick(day, kw):
    r = rows(day)
    n = next(k for k, v in r.items() if kw in v.split("\n", 1)[0])
    return re.sub(r"\n\s*\n", "\n", r[n]).split("\n", 1)[1].replace("•", "-").strip()


if __name__ == "__main__":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
    for d in map(int, sys.argv[1:]):
        print(f"##### DAY {d}")
        print("-- coaching\n" + pick(d, "Coaching"))
        print("-- feedback\n" + pick(d, "Feedback"))
