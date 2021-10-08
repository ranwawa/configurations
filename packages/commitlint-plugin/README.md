```
type(scope?): subject
body?
footer?
```

|                      | type                                                         | scope                       | subject           | header             | body              | Footer          |
| -------------------- | ------------------------------------------------------------ | --------------------------- | ----------------- | ------------------ | ----------------- | --------------- |
| enum: type枚举值     | [2, 'always', ['feat', 'fix', 'refactor', 'docs', 'style', 'test', 'revert', 'ci']] | [0, 'alwys', []]            |                   |                    |                   |                 |
| case: 大小写         | [2, 'always', 'lower-case']                                  | [2, 'always', 'lower-case'] | [0, 'always', []] | [0, 'always', []]  | [0, 'always', []] |                 |
| empty: 空            | [2, 'never']                                                 | [0, 'never']                | [2, 'never']      |                    | [0, 'never']      | [0, 'never']    |
| max-length: 最大长度 | [0, 'never', 0]                                              | [0, 'never', 0]             | [0, 'never', 0]   | [2, 'always', 200] | [0, 'never', 0]   | [0, 'never', 0] |
| min-length: 最小长度 | [0, 'never', 0]                                              | [0, 'never', 0]             | [0, 'never', 0]   | [0, 'never', 0]    | [0, 'never', 0]   | [0, 'never', 0] |
| full-stop: 结束符号  |                                                              |                             | [0, 'never', '.'] | [0, 'never', '.']  | [0, 'never', '.'] |                 |
| blank: 起始换行      |                                                              |                             |                   |                    | [2, 'always']     |                 |
| max-line-length      |                                                              |                             |                   |                    | [0, 'never', 0]   | [0, 'never', 0] |
| leading-blank        |                                                              |                             |                   |                    | [2, 'always']     | [2, 'always']   |

