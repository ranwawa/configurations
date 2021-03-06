module.exports = {
  disableEmoji: false,
  format: '{type}{scope}: {emoji}{subject}',
  list: ['feat', 'fix', 'test', 'refactor', 'style', 'docs', 'build'],
  maxMessageLength: 80,
  minMessageLength: 0,
  questions: [
    'type',
    'scope',
    'subject',
    'body',
    'breaking',
    'issues',
    'lerna',
  ],
  scopes: [],
  types: {
    feat: {
      description: 'æ°åè½',
      emoji: 'ð¸',
      value: 'feat',
    },
    fix: {
      description: 'bugä¿®å¤',
      emoji: 'ð',
      value: 'fix',
    },
    test: {
      description: 'å¢å æµè¯ç¨ä¾',
      emoji: 'ð',
      value: 'test',
    },
    refactor: {
      description: 'éæä»£ç (æ¢ä¸æ¯æ°å¢åè½ä¹ä¸æ¯ä¿®å¤bug)',
      emoji: 'ð¡',
      value: 'refactor',
    },
    style: {
      description: 'ç©ºæ ¼,æ ¼å¼å,åå·,æå­éè¯¯ç­ä¸å½±ååè½çä¿®æ¹',
      emoji: 'ð',
      value: 'style',
    },
    docs: {
      description: 'æ³¨é,ææ¡£ç­æ å³ä»£ç çä¿®æ¹',
      emoji: 'ï¸ð',
      value: 'docs',
    },
    build: {
      description: 'æå»º/æç»­éæç¸å³çä¿®æ¹',
      emoji: 'ð¡',
      value: 'build',
    },
  },
};
