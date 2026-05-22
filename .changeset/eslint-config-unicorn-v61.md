---
'@wellmade/eslint-config': patch
---

Bump `eslint-plugin-unicorn` to `^61.0.0`. The previous `^56.0.1` range
did not include `unicorn/prefer-import-meta-properties`, which the
config references — fresh installs failed with `Could not find
"prefer-import-meta-properties" in plugin "unicorn"`.
